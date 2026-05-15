/**
 * Smoke tests for transmission / drivetrain canonical product entity resolution.
 * Run: node src/data/salesEnablement/runTransmissionCanonicalSmokeTests.js
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
    containsPhrase((response.sourceBadges || []).join(" "), "transmission canonical"),
    "expected transmission canonical source badge"
  );
}

/**
 * @param {string} label
 * @param {string} query
 * @param {string | RegExp | Array<string | RegExp>} expectedInResolve
 * @param {{
 *   allowAmbiguous?: boolean,
 *   requireOk?: boolean,
 *   expectedTopPdsKey?: string,
 *   forbiddenTopPdsKey?: string[],
 *   forbiddenInResponse?: RegExp[],
 * }} [opts]
 */
function runTxCase(label, query, expectedInResolve, opts = {}) {
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

console.log("\ntransmission canonical resolver smoke tests\n" + "=".repeat(56));

let passed = 0;

try {
  runTxCase("CVT fluid", "What is CVT fluid?", [/cvt/, /cvt full synthetic/i], {
    expectedTopPdsKey: "CVT Full Synthetic",
    forbiddenTopPdsKey: ["Dual Clutch Full Synthetic", "Universal Full Synthetic ATF"],
  });
  console.log("PASS  What is CVT fluid?");
  passed += 1;

  runTxCase("DCT fluid", "What is DCT fluid?", [/dct/, /dual clutch/i], {
    expectedTopPdsKey: "Dual Clutch Full Synthetic",
    forbiddenTopPdsKey: ["CVT Full Synthetic", "Universal Full Synthetic ATF"],
  });
  console.log("PASS  What is DCT fluid?");
  passed += 1;

  runTxCase("ULV ATF", "What is ULV ATF?", [/ulv/, /ultra low viscosity/i], {
    expectedTopPdsKey: "ULV Full Synthetic ATF",
    forbiddenTopPdsKey: ["Universal Full Synthetic ATF", "Dexron VI / Mercon LV Full Synthetic"],
  });
  console.log("PASS  What is ULV ATF?");
  passed += 1;

  runTxCase("Dexron VI Mercon LV", "What is Dexron VI Mercon LV?", [/dexron/, /mercon/, /vi|lv/], {
    expectedTopPdsKey: "Dexron VI / Mercon LV Full Synthetic",
    forbiddenTopPdsKey: ["Universal Full Synthetic ATF", "ULV Full Synthetic ATF"],
  });
  console.log("PASS  What is Dexron VI Mercon LV?");
  passed += 1;

  runTxCase("Universal Full Synthetic ATF", "What is Universal Full Synthetic ATF?", [/universal/, /atf/], {
    expectedTopPdsKey: "Universal Full Synthetic ATF",
    forbiddenTopPdsKey: ["ULV Full Synthetic ATF", "CVT Full Synthetic", "Dual Clutch Full Synthetic"],
  });
  console.log("PASS  What is Universal Full Synthetic ATF?");
  passed += 1;

  runTxCase("HD SYN DRIVE", "What is HD SYN DRIVE?", [/syn drive/, /tes[\s-]?668|668/], {
    expectedTopPdsKey: "HD SYN DRIVE TES 668",
    forbiddenTopPdsKey: ["HD Full Synthetic ATF"],
  });
  console.log("PASS  What is HD SYN DRIVE?");
  passed += 1;

  runTxCase("TES-295 ATF", "What is TES-295 ATF?", [/tes[\s-]?295|295/, /hd full synthetic atf/i], {
    expectedTopPdsKey: "HD Full Synthetic ATF",
    forbiddenTopPdsKey: ["HD SYN DRIVE TES 668"],
  });
  console.log("PASS  What is TES-295 ATF?");
  passed += 1;

  runTxCase("TDTO-4 Arctic", "What is TDTO-4 Arctic?", [/tdto/, /arctic/], {
    expectedTopPdsKey: "TDTO-4 Arctic Full Synthetic",
    forbiddenTopPdsKey: ["TDTO-4 All Season Syn Blend", "TDTO-4 SAE Grades"],
  });
  console.log("PASS  What is TDTO-4 Arctic?");
  passed += 1;

  runTxCase("TDTO-4 All Season", "What is TDTO-4 All Season?", [/tdto/, /all season/], {
    expectedTopPdsKey: "TDTO-4 All Season Syn Blend",
    forbiddenTopPdsKey: ["TDTO-4 Arctic Full Synthetic", "TDTO-4 SAE Grades"],
  });
  console.log("PASS  What is TDTO-4 All Season?");
  passed += 1;

  runTxCase("straight grade TDTO-4", "What is straight grade TDTO-4?", [/tdto/, /sae 10w|sae 30|sae 50|straight grade|sae grades/i], {
    expectedTopPdsKey: "TDTO-4 SAE Grades",
    forbiddenTopPdsKey: ["TDTO-4 Arctic Full Synthetic", "TDTO-4 All Season Syn Blend", "TDTO-4 Synthetic Multigrade"],
  });
  console.log("PASS  What is straight grade TDTO-4?");
  passed += 1;

  runTxCase("75W-80 Synchromesh", "What is 75W-80 Synchromesh?", [/synchromesh/, /75w[\s-]?80/], {
    expectedTopPdsKey: "75W-80 Synchromesh",
    forbiddenTopPdsKey: ["SAE 50 Manual Transmission"],
    forbiddenInResponse: [/sae 50 full synthetic manual transmission lubricant — product entity/i],
  });
  console.log("PASS  What is 75W-80 Synchromesh?");
  passed += 1;

  runTxCase("Type F transmission fluid", "What is Type F transmission fluid?", [/type f/], {
    expectedTopPdsKey: "Type F ATF",
    forbiddenTopPdsKey: ["MD3 ATF", "Universal Full Synthetic ATF"],
  });
  console.log("PASS  What is Type F transmission fluid?");
  passed += 1;

  runTxCase("MD3 ATF", "What is MD3 ATF?", [/md3/, /dexron iii|dexron 3/i], {
    expectedTopPdsKey: "MD3 ATF",
    forbiddenTopPdsKey: ["Type F ATF", "Dexron VI / Mercon LV Full Synthetic", "ULV Full Synthetic ATF"],
  });
  console.log("PASS  What is MD3 ATF?");
  passed += 1;

  console.log("=".repeat(56));
  console.log(`All ${passed} transmission canonical smoke tests passed.\n`);
} catch (e) {
  console.log(`FAIL  ${e instanceof Error ? e.message : e}`);
  process.exitCode = 1;
}
