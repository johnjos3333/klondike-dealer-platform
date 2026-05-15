/**
 * Smoke tests for canonical grease/hydraulic product entity resolution.
 * Run: node src/data/salesEnablement/runCanonicalResolverSmokeTests.js
 */

import {
  buildProductEntityAdvisorResponse,
  resolveKlondikeProductEntity,
} from "../../utils/klondikeProductEntityResolver.js";

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
    ...(resolved.likelyMatches || []).map((m) => [m.label, m.pdsKey].filter(Boolean).join(" ")),
  ];
  return parts.join(" ");
}

/**
 * @param {ReturnType<typeof buildProductEntityAdvisorResponse>} response
 * @param {{ excludeConfirmBeforeUse?: boolean }} [opts]
 */
function responseTextBundle(response, opts = {}) {
  const sections = response.sections || [];
  const sectionText = sections
    .filter((s) => !(opts.excludeConfirmBeforeUse && s?.id === "confirmBeforeUse"))
    .flatMap((s) => [s?.title, s?.body, ...(s?.items || [])])
    .join(" ");
  const matched = (response.matchedProducts || []).map((m) => `${m.label} ${m.productKey}`).join(" ");
  return [response.title, response.directAnswer, sectionText, matched, (response.followUpQuestions || []).join(" ")].join(
    " "
  );
}

/** Primary positioning text for Nano — excludes differentiation disclaimers in confirmBeforeUse. */
function nanoPrimaryResponseText(response) {
  return responseTextBundle(response, { excludeConfirmBeforeUse: true });
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
 * @param {{ requireSections?: boolean, requireOk?: boolean }} [opts]
 */
function assertAdvisorResponse(response, opts = {}) {
  const { requireSections = true, requireOk = true } = opts;
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
}

/** @param {unknown} s */
function nonEmptyString(s) {
  return typeof s === "string" && s.trim().length > 0;
}

/**
 * @param {string} label
 * @param {string} query
 * @param {string | RegExp | Array<string | RegExp>} expectedInTitle
 * @param {{ allowAmbiguous?: boolean, responseOpts?: { requireSections?: boolean, requireOk?: boolean }, forbidden?: RegExp[], forbiddenHaystack?: "nanoPrimary" }} [opts]
 */
function runCanonicalCase(label, query, expectedInTitle, opts = {}) {
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: opts.allowAmbiguous });

  const resolveHaystack = resolvedTextBundle(resolved);
  assert(
    containsPhrase(resolveHaystack, expectedInTitle),
    `${label}: expected phrase in resolve output. Got label="${resolved.label}" pdsKey="${resolved.pdsKey}"`
  );

  const response = buildProductEntityAdvisorResponse(query);
  assertAdvisorResponse(response, opts.responseOpts);

  const responseHaystack = responseTextBundle(response);
  assert(
    containsPhrase(responseHaystack, expectedInTitle),
    `${label}: expected phrase in advisor response title/body. Got title="${response.title}"`
  );

  for (const re of opts.forbidden || []) {
    const haystack = opts.forbiddenHaystack === "nanoPrimary" ? nanoPrimaryResponseText(response) : responseHaystack;
    assert(!re.test(haystack), `${label}: forbidden wording matched ${re}`);
  }
}

console.log("\ncanonical product entity resolver smoke tests\n" + "=".repeat(56));

const FORBIDDEN_NANO = [/\bmoly\b/i, /\blithium\b/i];

try {
  runCanonicalCase("Nano grease", "What is Nano grease?", ["nano", "calcium sulfonate"], {
    forbidden: FORBIDDEN_NANO,
    forbiddenHaystack: "nanoPrimary",
  });
  console.log("PASS  What is Nano grease? => Nano Calcium Sulfonate");

  runCanonicalCase("Nano EP2", "Explain Nano EP2", ["nano", "calcium sulfonate"], {
    forbidden: FORBIDDEN_NANO,
    forbiddenHaystack: "nanoPrimary",
  });
  console.log("PASS  Explain Nano EP2 => Nano Calcium Sulfonate");

  runCanonicalCase("Moly Tac EP-2", "What is Moly Tac EP-2?", ["moly tac"]);
  console.log("PASS  What is Moly Tac EP-2? => Moly Tac");

  runCanonicalCase("Open Gear Lubricant", "What is Open Gear Lubricant?", ["open gear lubricant"]);
  console.log("PASS  What is Open Gear Lubricant? => Open Gear Lubricant");

  runCanonicalCase("XVI hydraulic", "What is XVI hydraulic?", ["xvi"]);
  console.log("PASS  What is XVI hydraulic? => XVI");

  runCanonicalCase("Wet Brake Fluid", "What is Wet Brake Fluid?", ["wet brake"]);
  console.log("PASS  What is Wet Brake Fluid? => Wet Brake");

  runCanonicalCase("UTF Klondike", "What UTF does Klondike have?", ["universal tractor fluid"]);
  console.log("PASS  What UTF does Klondike have? => Universal Tractor Fluid");

  runCanonicalCase("Arctic Tractor Fluid", "What is Arctic Tractor Fluid?", ["arctic tractor"]);
  console.log("PASS  What is Arctic Tractor Fluid? => Arctic Tractor");

  runCanonicalCase(
    "Turbine oils catalog",
    "What turbine oils does Klondike carry?",
    [/long life turbine/, /circulating compressor turbine/, /synthetic circulating/],
    {
      allowAmbiguous: true,
      responseOpts: { requireSections: false, requireOk: false },
    }
  );
  console.log("PASS  What turbine oils does Klondike carry? => turbine industrial rows");

  console.log("=".repeat(56));
  console.log("All canonical resolver smoke tests passed.\n");
} catch (e) {
  console.log(`FAIL  ${e instanceof Error ? e.message : e}`);
  process.exitCode = 1;
}
