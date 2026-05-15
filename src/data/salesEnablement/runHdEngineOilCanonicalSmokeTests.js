/**
 * Smoke tests for HD engine oil canonical product entity resolution.
 * Run: node src/data/salesEnablement/runHdEngineOilCanonicalSmokeTests.js
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
  assert(
    containsPhrase((response.sourceBadges || []).join(" "), "hd engine oil canonical"),
    "expected HD engine oil canonical source badge"
  );
}

/**
 * @param {string} label
 * @param {string} query
 * @param {string | RegExp | Array<string | RegExp>} expectedInResolve
 * @param {{ allowAmbiguous?: boolean, requireOk?: boolean, forbiddenTopPdsKey?: string[], forbiddenInResponse?: RegExp[] }} [opts]
 */
function runHdCase(label, query, expectedInResolve, opts = {}) {
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: opts.allowAmbiguous });

  const resolveHaystack = resolvedTextBundle(resolved);
  assert(
    containsPhrase(resolveHaystack, expectedInResolve),
    `${label}: expected phrase in resolve output. Got label="${resolved.label}" pdsKey="${resolved.pdsKey}" confidence=${resolved.confidence}`
  );

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
  });

  const responseHaystack = responseTextBundle(response);
  assert(
    containsPhrase(responseHaystack, expectedInResolve),
    `${label}: expected phrase in advisor response. Got title="${response.title}"`
  );

  for (const re of opts.forbiddenInResponse || []) {
    const primaryHaystack = primaryResponseText(response);
    assert(!re.test(primaryHaystack), `${label}: forbidden wording matched ${re} in primary response`);
  }
}

console.log("\nHD engine oil canonical resolver smoke tests\n" + "=".repeat(56));

let passed = 0;

try {
  runHdCase("Professional Formula 15W-40", "What is Professional Formula 15W-40?", [
    "professional",
    "15w-40 professional",
    /15w[\s-]?40 professional/,
  ], {
    forbiddenTopPdsKey: ["15W-40 Advanced", "15W-40 Full Synthetic", "15W-40 Low Ash Natural Gas"],
  });
  console.log("PASS  What is Professional Formula 15W-40?");
  passed += 1;

  runHdCase("15W-40 Advanced Formula", "What is 15W-40 Advanced Formula?", ["advanced", /15w[\s-]?40 advanced/], {
    forbiddenTopPdsKey: ["15W-40 Full Synthetic", "15W-40 Professional"],
    forbiddenInResponse: [/full synthetic heavy duty engine oil/i],
  });
  console.log("PASS  What is 15W-40 Advanced Formula?");
  passed += 1;

  runHdCase("15W-40 Full Synthetic", "What is 15W-40 Full Synthetic?", ["full synthetic", /15w[\s-]?40 full synthetic/], {
    forbiddenTopPdsKey: ["15W-40 Advanced", "15W-40 Professional"],
    forbiddenInResponse: [/advanced formula heavy duty/i],
  });
  console.log("PASS  What is 15W-40 Full Synthetic?");
  passed += 1;

  runHdCase("10W-30 CK-4", "What is 10W-30 CK-4?", [/10w[\s-]?30/, /ck[\s-]?4|ck4/], {
    forbiddenTopPdsKey: ["10W-30 FA-4"],
    forbiddenInResponse: [/\bfa[\s-]?4\b.*synthetic blend heavy duty/i, /api fa-4 10w-30/i],
  });
  console.log("PASS  What is 10W-30 CK-4?");
  passed += 1;

  runHdCase("10W-30 FA-4", "What is 10W-30 FA-4?", [/10w[\s-]?30/, /fa[\s-]?4|fa4/], {
    forbiddenTopPdsKey: ["Professional 10W-30 CK-4", "10W-30 Synthetic Blend"],
    forbiddenInResponse: [/professional formula sae 10w-30/i, /\bck-4\b.*professional formula/i],
  });
  console.log("PASS  What is 10W-30 FA-4?");
  passed += 1;

  runHdCase(
    "Natural gas engine oils catalog",
    "What natural gas engine oils does Klondike have?",
    [/natural gas/, /low ash|sour|mid ash/],
    {
      allowAmbiguous: true,
      requireOk: false,
      forbiddenTopPdsKey: ["15W-40 Professional", "15W-40 Advanced", "15W-40 Full Synthetic"],
      forbiddenInResponse: [/professional formula sae 15w-40 heavy duty/i],
    }
  );
  console.log("PASS  What natural gas engine oils does Klondike have?");
  passed += 1;

  runHdCase("Railroad Engine Oil", "What is Railroad Engine Oil?", [/railroad/, /9tbn|zinc[\s-]?free/], {
    forbiddenTopPdsKey: ["15W-40 Professional", "15W-40 Full Synthetic"],
    forbiddenInResponse: [/api ck-4 mixed fleet/i],
  });
  console.log("PASS  What is Railroad Engine Oil?");
  passed += 1;

  console.log("=".repeat(56));
  console.log(`All ${passed} HD engine oil canonical smoke tests passed.\n`);
} catch (e) {
  console.log(`FAIL  ${e instanceof Error ? e.message : e}`);
  process.exitCode = 1;
}
