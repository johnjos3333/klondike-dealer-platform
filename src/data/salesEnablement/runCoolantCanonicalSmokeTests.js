/**
 * Smoke tests for coolant / antifreeze canonical product entity resolution.
 * Run: node src/data/salesEnablement/runCoolantCanonicalSmokeTests.js
 */

import {
  buildProductEntityAdvisorResponse,
  resolveKlondikeProductEntity,
} from "../../utils/klondikeProductEntityResolver.js";
import { buildLubricationAdvisorResponse } from "../../utils/lubricationAdvisorOrchestrator.js";
import { searchKlondikeProducts } from "../../utils/klondikeProductRetrievalHelpers.js";

/** @param {unknown} cond @param {string} [msg] */
function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}

/** @param {unknown} s */
function norm(s) {
  return String(s ?? "").toLowerCase();
}

/**
 * @param {string} haystack
 * @param {string | RegExp | Array<string | RegExp>} needles
 */
function containsPhrase(haystack, needles) {
  const text = norm(haystack);
  const list = Array.isArray(needles) ? needles : [needles];
  return list.some((n) => {
    if (n instanceof RegExp) return n.test(text);
    return text.includes(norm(n));
  });
}

/**
 * @param {ReturnType<typeof resolveKlondikeProductEntity>} resolved
 */
function resolvedTextBundle(resolved) {
  const parts = [
    resolved.label,
    resolved.pdsKey,
    resolved.message,
    ...(resolved.likelyMatches || []).map((m) => [m.label, m.pdsKey, m.entityId].filter(Boolean).join(" ")),
  ];
  return parts.join(" ");
}

/**
 * @param {ReturnType<typeof buildProductEntityAdvisorResponse>} response
 */
function responseTextBundle(response) {
  const sections = response.sections || [];
  const sectionText = sections
    .flatMap((s) => [s?.title, s?.body, ...(s?.items || [])])
    .join(" ");
  const matched = (response.matchedProducts || []).map((m) => `${m.label} ${m.productKey}`).join(" ");
  return [
    response.title,
    response.directAnswer,
    sectionText,
    matched,
    (response.followUpQuestions || []).join(" "),
    (response.sourceBadges || []).join(" "),
    (response.cautionNotes || []).join(" "),
  ].join(" ");
}

/** Title, directAnswer, and non-disclaimer sections — for branch disambiguation checks. */
function primaryResponseText(response) {
  const sections = response.sections || [];
  const sectionText = sections
    .filter((s) => s?.id !== "confirmBeforeUse")
    .flatMap((s) => [s?.title, s?.body, ...(s?.items || [])])
    .join(" ");
  const matched = (response.matchedProducts || []).map((m) => `${m.label} ${m.productKey}`).join(" ");
  return [response.title, response.directAnswer, sectionText, matched].join(" ");
}

/** @param {unknown} s */
function nonEmptyString(s) {
  return typeof s === "string" && s.trim().length > 0;
}

/**
 * @param {ReturnType<typeof resolveKlondikeProductEntity>} resolved
 * @param {{ allowAmbiguous?: boolean }} [opts]
 */
function assertResolverResult(resolved, opts = {}) {
  assert(resolved && typeof resolved === "object", "expected resolve object");
  assert(resolved.confidence !== "none", `expected confidence other than none, got ${resolved.confidence}`);
  if (!opts.allowAmbiguous) {
    assert(
      resolved.confidence === "exact" || resolved.confidence === "likely",
      `expected exact or likely confidence, got ${resolved.confidence}`
    );
  }
  assert(nonEmptyString(resolved.label) || (resolved.likelyMatches?.length ?? 0) > 0, "expected label or likelyMatches");
}

/**
 * @param {ReturnType<typeof buildProductEntityAdvisorResponse>} response
 * @param {{ requireSections?: boolean, requireOk?: boolean, requireCoolantBadge?: boolean }} [opts]
 */
function assertAdvisorResponse(response, opts = {}) {
  const { requireSections = true, requireOk = true, requireCoolantBadge = true } = opts;
  assert(response && typeof response === "object", "expected response object");
  if (requireOk) {
    assert(response.ok === true, `expected ok true, got ${response.ok} message=${response.message}`);
  }
  assert(nonEmptyString(response.title), "expected non-empty title");
  assert(nonEmptyString(response.directAnswer), "expected non-empty directAnswer");
  assert(Array.isArray(response.sections), "expected sections array");
  if (requireSections) {
    assert(response.sections.length > 0, "expected non-empty sections");
  }
  assert(Array.isArray(response.sourceBadges) && response.sourceBadges.length > 0, "expected sourceBadges");
  assert(Array.isArray(response.cautionNotes) && response.cautionNotes.length > 0, "expected cautionNotes");
  if (requireCoolantBadge) {
    assert(
      containsPhrase((response.sourceBadges || []).join(" "), "coolant canonical"),
      "expected coolant canonical source badge"
    );
  }
}

const ELC_PDS_KEYS = ["Yellow OAT ELC", "Gold OAT ELC", "Red NOAT ELC", "HOAT ELC 50/50"];

/**
 * @param {string} label
 * @param {string} query
 * @param {string | RegExp | Array<string | RegExp>} expectedInResolve
 * @param {{
 *   allowAmbiguous?: boolean,
 *   requireOk?: boolean,
 *   requireCoolantBadge?: boolean,
 *   expectedTopPdsKey?: string,
 *   forbiddenTopPdsKey?: string[],
 *   forbiddenInResponse?: RegExp[],
 *   requiredInResponse?: RegExp[],
 * }} [opts]
 */
function runCoolantCase(label, query, expectedInResolve, opts = {}) {
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: opts.allowAmbiguous });

  const resolveHaystack = resolvedTextBundle(resolved);
  assert(
    containsPhrase(resolveHaystack, expectedInResolve),
    `${label}: expected phrase in resolve output. Got label="${resolved.label}" pdsKey="${resolved.pdsKey}" confidence=${resolved.confidence}`
  );

  if (opts.expectedTopPdsKey) {
    assert(
      norm(resolved.pdsKey) === norm(opts.expectedTopPdsKey),
      `${label}: expected top pdsKey "${opts.expectedTopPdsKey}", got "${resolved.pdsKey}"`
    );
  }

  for (const forbiddenKey of opts.forbiddenTopPdsKey || []) {
    assert(
      norm(resolved.pdsKey) !== norm(forbiddenKey),
      `${label}: top pdsKey must not be "${forbiddenKey}", got "${resolved.pdsKey}"`
    );
  }

  const response = buildProductEntityAdvisorResponse(query);
  assertAdvisorResponse(response, {
    requireOk: opts.requireOk !== false,
    requireSections: opts.requireOk !== false,
    requireCoolantBadge: opts.requireCoolantBadge !== false,
  });

  const responseHaystack = responseTextBundle(response);
  assert(
    containsPhrase(responseHaystack, expectedInResolve),
    `${label}: expected phrase in advisor response. Got title="${response.title}"`
  );

  for (const re of opts.requiredInResponse || []) {
    const primaryHaystack = primaryResponseText(response);
    assert(re.test(primaryHaystack), `${label}: required wording missing ${re} in primary response`);
  }

  for (const re of opts.forbiddenInResponse || []) {
    const primaryHaystack = primaryResponseText(response);
    assert(!re.test(primaryHaystack), `${label}: forbidden wording matched ${re} in primary response`);
  }
}

/**
 * HD coolant catalog — ambiguous canonical set, product_retrieval, or indexed PDS search
 * must surface Red NOAT and/or Commercial HD HOAT rows.
 * @param {string} query
 */
function runHdCoolantCatalogCase(query) {
  const resolved = resolveKlondikeProductEntity(query);
  const resolveHaystack = resolvedTextBundle(resolved);
  const hasHdCoolantInResolve =
    containsPhrase(resolveHaystack, [/red/, /noat/]) ||
    containsPhrase(resolveHaystack, [/hoat/, /commercial hd/]);

  const search = searchKlondikeProducts(query);
  const searchHaystack = (search.matches || [])
    .slice(0, 10)
    .map((m) => `${m.productKey} ${m.label || ""}`)
    .join(" ");
  const hasHdCoolantInSearch =
    containsPhrase(searchHaystack, ["Red NOAT ELC", "HOAT ELC 50/50"]) ||
    (containsPhrase(searchHaystack, /red/) && containsPhrase(searchHaystack, /noat|hoat/i));

  assert(
    hasHdCoolantInResolve || hasHdCoolantInSearch,
    `HD catalog: expected Red NOAT and/or HOAT in resolver or PDS search. resolve confidence=${resolved.confidence} pdsKey="${resolved.pdsKey}"`
  );

  if (resolved.confidence !== "none") {
    assertResolverResult(resolved, { allowAmbiguous: true });
  }

  const orch = buildLubricationAdvisorResponse(query);
  const orchHaystack = [
    orch.title,
    orch.directAnswer,
    (orch.sections || []).flatMap((s) => [s?.title, s?.body, ...(s?.items || [])]).join(" "),
    (orch.matchedProducts || []).map((m) => `${m.label} ${m.productKey}`).join(" "),
  ].join(" ");

  const orchHasHdCoolant =
    containsPhrase(orchHaystack, [/red/, /noat/, /hoat/, /commercial hd/]) &&
    containsPhrase(orchHaystack, /coolant|antifreeze|elc/);

  const allowedIntents = ["product_retrieval", "product_entity"];
  const orchestratorCatalogOk = allowedIntents.includes(orch.intent) && orchHasHdCoolant;

  assert(
    orchestratorCatalogOk || hasHdCoolantInResolve || hasHdCoolantInSearch,
    `HD catalog: expected product_retrieval/product_entity with HD coolant content, or resolver/search HD coolant branches. intent=${orch.intent}`
  );

  assert(nonEmptyString(orch.title), "HD catalog: expected non-empty orchestrator title");
  assert(nonEmptyString(orch.directAnswer), "HD catalog: expected non-empty orchestrator directAnswer");
  assert(Array.isArray(orch.sections) && orch.sections.length > 0, "HD catalog: expected orchestrator sections");

  if (orch.intent === "product_entity") {
    const entityResponse = buildProductEntityAdvisorResponse(query);
    assertAdvisorResponse(entityResponse, { requireCoolantBadge: true });
  }
}

console.log("\ncoolant canonical resolver smoke tests\n" + "=".repeat(56));

let passed = 0;

try {
  runCoolantCase("Green Universal", "What is Green Universal coolant?", [/green/, /green universal|conventional/], {
    expectedTopPdsKey: "Green Universal Coolant",
    forbiddenTopPdsKey: ELC_PDS_KEYS,
    forbiddenInResponse: [
      /yellow automotive oat elc/i,
      /gold all engines nf oat/i,
      /red heavy duty noat elc/i,
      /commercial hd hoat elc/i,
    ],
  });
  console.log("PASS  What is Green Universal coolant?");
  passed += 1;

  runCoolantCase("Yellow OAT", "What is Yellow OAT coolant?", [/yellow/, /oat|automotive/], {
    expectedTopPdsKey: "Yellow OAT ELC",
    forbiddenTopPdsKey: ["Red NOAT ELC", "Gold OAT ELC", "Green Universal Coolant", "HOAT ELC 50/50"],
    forbiddenInResponse: [
      /red heavy duty noat elc antifreeze/i,
      /gold all engines nf oat elc antifreeze/i,
    ],
  });
  console.log("PASS  What is Yellow OAT coolant?");
  passed += 1;

  runCoolantCase("Gold OAT", "What is Gold OAT coolant?", [/gold/, /oat|nf|all engines/], {
    expectedTopPdsKey: "Gold OAT ELC",
    forbiddenTopPdsKey: ["Red NOAT ELC", "Yellow OAT ELC", "Green Universal Coolant"],
    requiredInResponse: [/nitrite[\s-]?free/i, /all engines|mixed fleet/i],
    forbiddenInResponse: [/red heavy duty noat elc antifreeze/i],
  });
  console.log("PASS  What is Gold OAT coolant?");
  passed += 1;

  runCoolantCase("Red NOAT", "What is Red NOAT coolant?", [/red/, /noat|nitrit/], {
    expectedTopPdsKey: "Red NOAT ELC",
    forbiddenTopPdsKey: ["Gold OAT ELC", "Green Universal Coolant", "HOAT ELC 50/50"],
    requiredInResponse: [/heavy duty|nitrit|noat/i],
    forbiddenInResponse: [/gold all engines nf oat elc antifreeze/i],
  });
  console.log("PASS  What is Red NOAT coolant?");
  passed += 1;

  runCoolantCase("Commercial HD HOAT", "What is Commercial HD HOAT coolant?", [/hoat/, /commercial|hd/], {
    expectedTopPdsKey: "HOAT ELC 50/50",
    forbiddenTopPdsKey: ["Red NOAT ELC", "Gold OAT ELC", "Green Universal Coolant", "Yellow OAT ELC"],
    requiredInResponse: [/commercial hd hoat|hoat elc/i],
    forbiddenInResponse: [/red heavy duty noat elc/i, /green universal antifreeze/i],
  });
  console.log("PASS  What is Commercial HD HOAT coolant?");
  passed += 1;

  runCoolantCase("Nitrite-free coolant", "What is nitrite-free coolant?", [/nitrite[\s-]?free/, /gold|all engines/], {
    expectedTopPdsKey: "Gold OAT ELC",
    forbiddenTopPdsKey: ["Red NOAT ELC", "Yellow OAT ELC", "Green Universal Coolant"],
    requiredInResponse: [/nitrite[\s-]?free/i],
    forbiddenInResponse: [/red heavy duty noat elc antifreeze/i],
  });
  console.log("PASS  What is nitrite-free coolant?");
  passed += 1;

  runHdCoolantCatalogCase("What heavy duty coolants does Klondike carry?");
  console.log("PASS  What heavy duty coolants does Klondike carry?");
  passed += 1;

  console.log("=".repeat(56));
  console.log(`All ${passed} coolant canonical smoke tests passed.\n`);
} catch (e) {
  console.log(`FAIL  ${e instanceof Error ? e.message : e}`);
  process.exitCode = 1;
}
