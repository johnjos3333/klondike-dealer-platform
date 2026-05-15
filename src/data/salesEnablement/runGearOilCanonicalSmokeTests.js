/**
 * Smoke tests for gear oil canonical product intelligence and entity resolution.
 * Run: node src/data/salesEnablement/runGearOilCanonicalSmokeTests.js
 */

import {
  buildProductEntityAdvisorResponse,
  detectKlondikeProductEntity,
  resolveKlondikeProductEntity,
} from "../../utils/klondikeProductEntityResolver.js";
import {
  getGearOilCanonicalProductIntelligenceById,
  listGearOilCanonicalProductIntelligence,
} from "../gearOilCanonicalProductIntelligence.js";

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
 * Logical id suffix from spec => full gear-oil-canonical id.
 * @param {string} logicalId
 */
function gearCanonicalId(logicalId) {
  return `gear-oil-canonical-${String(logicalId).replace(/_/g, "-")}`;
}

/**
 * @param {ReturnType<typeof resolveKlondikeProductEntity>} resolved
 */
function resolvedTextBundle(resolved) {
  const parts = [
    resolved.entityId,
    resolved.label,
    resolved.pdsKey,
    resolved.message,
    ...(resolved.likelyMatches || []).map((m) => [m.entityId, m.label, m.pdsKey].filter(Boolean).join(" ")),
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

/**
 * @param {ReturnType<typeof resolveKlondikeProductEntity>} resolved
 * @returns {string[]}
 */
function getLikelyMatchIds(resolved) {
  return (resolved.likelyMatches || []).map((m) => String(m.entityId || "").trim()).filter(Boolean);
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
 * @param {string} haystack
 * @param {string} logicalId
 */
function haystackMatchesGearLogicalId(haystack, logicalId) {
  const fullId = gearCanonicalId(logicalId);
  const product = getGearOilCanonicalProductIntelligenceById(fullId);
  const text = norm(haystack);
  if (text.includes(norm(fullId))) return true;
  if (text.includes(norm(logicalId))) return true;
  if (product?.productName && text.includes(norm(product.productName))) return true;
  if (product?.pdsMapKey && text.includes(norm(product.pdsMapKey))) return true;
  return false;
}

/**
 * @param {string} query
 * @param {string} logicalId
 * @param {string} label
 */
function assertDetectedId(query, logicalId, label) {
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved);
  const fullId = gearCanonicalId(logicalId);
  const haystack = resolvedTextBundle(resolved);
  const topOk = norm(resolved.entityId) === norm(fullId) || haystackMatchesGearLogicalId(haystack, logicalId);
  const likelyOk = getLikelyMatchIds(resolved).some((id) => norm(id) === norm(fullId));
  assert(
    topOk || likelyOk,
    `${label}: expected gear canonical id "${logicalId}" (${fullId}). Got entityId="${resolved.entityId}" pdsKey="${resolved.pdsKey}" label="${resolved.label}" likely=${getLikelyMatchIds(resolved).join(",")}`
  );
}

/**
 * @param {string} query
 * @param {string} label
 */
function assertNotGearOilCanonical(query, label) {
  const resolved = resolveKlondikeProductEntity(query);
  const resolveHaystack = resolvedTextBundle(resolved);
  assert(
    !norm(resolved.entityId).startsWith("gear-oil-canonical-"),
    `${label}: entityId must not be gear oil canonical, got "${resolved.entityId}"`
  );
  assert(
    !getLikelyMatchIds(resolved).some((id) => id.startsWith("gear-oil-canonical-")),
    `${label}: likelyMatches must not include gear oil canonical ids`
  );

  const response = buildProductEntityAdvisorResponse(query);
  const responseHaystack = responseTextBundle(response);
  assert(
    !containsPhrase((response.sourceBadges || []).join(" "), "gear oil canonical"),
    `${label}: advisor source badges must not include gear oil canonical intelligence`
  );
  assert(
    !containsPhrase(responseHaystack, "gear oil canonical product intelligence"),
    `${label}: advisor response must not indicate gear oil canonical intelligence`
  );
  assert(
    !containsPhrase(resolveHaystack, "gear oil canonical"),
    `${label}: resolve output must not indicate gear oil canonical routing`
  );
}

/**
 * @param {string} query
 * @param {string} expectedBadgeSubstring
 * @param {string} label
 */
function assertDetectedSourceBadge(query, expectedBadgeSubstring, label) {
  const response = buildProductEntityAdvisorResponse(query);
  assert(
    containsPhrase((response.sourceBadges || []).join(" "), expectedBadgeSubstring),
    `${label}: expected source badge containing "${expectedBadgeSubstring}", got ${JSON.stringify(response.sourceBadges)}`
  );
}

/**
 * @param {string} query
 * @param {string[]} logicalIds
 * @param {string} label
 */
function assertLikelyIncludes(query, logicalIds, label) {
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: true });
  const haystack = resolvedTextBundle(resolved);
  const likelyIds = getLikelyMatchIds(resolved);
  const detected = detectKlondikeProductEntity(query).map((h) => h.id);

  for (const logicalId of logicalIds) {
    const fullId = gearCanonicalId(logicalId);
    const inLikely = likelyIds.includes(fullId);
    const inDetected = detected.includes(fullId);
    const inHaystack = haystackMatchesGearLogicalId(haystack, logicalId);
    const topIs = norm(resolved.entityId) === norm(fullId);
    assert(
      inLikely || inDetected || inHaystack || topIs,
      `${label}: expected "${logicalId}" in likelyMatches, detect hits, or top match. entityId="${resolved.entityId}" likely=${likelyIds.join(",")} detected=${detected.join(",")}`
    );
  }
}

const REQUIRED_LOGICAL_IDS = [
  "commercial_gear_lubricant_80w90",
  "gl5_gear_lubricant_80w90",
  "gl5_gear_lubricant_85w140",
  "full_synthetic_gl5_gear_lubricant_75w90",
  "full_synthetic_gl5_gear_lubricant_75w140",
  "industrial_ep_gear_lubricant_iso68",
  "industrial_ep_gear_lubricant_iso100",
  "industrial_ep_gear_lubricant_iso150",
  "industrial_ep_gear_lubricant_iso220",
  "industrial_ep_gear_lubricant_iso320",
  "industrial_ep_gear_lubricant_iso460",
  "full_synthetic_industrial_ep_gear_lubricant_iso150",
  "full_synthetic_industrial_ep_gear_lubricant_iso220",
  "full_synthetic_industrial_ep_gear_lubricant_iso320",
  "full_synthetic_industrial_ep_gear_lubricant_iso460",
  "full_synthetic_industrial_ep_gear_lubricant_iso680",
];

/**
 * @param {string} label
 * @param {string} query
 * @param {string} logicalId
 * @param {{
 *   expectedPdsKey?: string,
 *   forbiddenLogicalIds?: string[],
 *   requireGearBadge?: boolean,
 *   requiredInResponse?: RegExp[],
 *   allowAmbiguous?: boolean,
 *   likelyAlso?: string[],
 * }} [opts]
 */
function runGearOilCase(label, query, logicalId, opts = {}) {
  assertDetectedId(query, logicalId, label);
  const resolved = resolveKlondikeProductEntity(query);
  const product = getGearOilCanonicalProductIntelligenceById(gearCanonicalId(logicalId));

  if (opts.expectedPdsKey) {
    assert(
      norm(resolved.pdsKey) === norm(opts.expectedPdsKey),
      `${label}: expected pdsKey "${opts.expectedPdsKey}", got "${resolved.pdsKey}"`
    );
  } else if (product?.pdsMapKey) {
    assert(
      norm(resolved.pdsKey) === norm(product.pdsMapKey),
      `${label}: expected pdsKey "${product.pdsMapKey}", got "${resolved.pdsKey}"`
    );
  }

  for (const forbidden of opts.forbiddenLogicalIds || []) {
    const forbiddenId = gearCanonicalId(forbidden);
    assert(
      norm(resolved.entityId) !== norm(forbiddenId),
      `${label}: top entityId must not be "${forbidden}"`
    );
    if (product?.pdsMapKey) {
      const forbiddenProduct = getGearOilCanonicalProductIntelligenceById(forbiddenId);
      if (forbiddenProduct?.pdsMapKey && norm(resolved.pdsKey) === norm(forbiddenProduct.pdsMapKey)) {
        assert(
          norm(resolved.entityId) === norm(gearCanonicalId(logicalId)),
          `${label}: shared pdsKey but top entity must be "${logicalId}", got "${resolved.entityId}"`
        );
      }
    }
  }

  if (opts.likelyAlso?.length) {
    assertLikelyIncludes(query, opts.likelyAlso, label);
  }

  const response = buildProductEntityAdvisorResponse(query);
  assert(response && typeof response === "object", `${label}: expected advisor response`);
  assert(nonEmptyString(response.title), `${label}: expected title`);
  assert(nonEmptyString(response.directAnswer), `${label}: expected directAnswer`);

  const responseHaystack = responseTextBundle(response);
  assert(
    haystackMatchesGearLogicalId(responseHaystack, logicalId),
    `${label}: expected gear product in advisor response for "${logicalId}"`
  );

  if (opts.requireGearBadge !== false) {
    assertDetectedSourceBadge(query, "gear oil canonical", label);
  }

  for (const re of opts.requiredInResponse || []) {
    assert(re.test(responseHaystack), `${label}: required wording missing ${re}`);
  }
}

function runDataShapeTests() {
  const products = listGearOilCanonicalProductIntelligence();
  assert(products.length === 16, `expected 16 gear oil records, got ${products.length}`);

  for (const logicalId of REQUIRED_LOGICAL_IDS) {
    const fullId = gearCanonicalId(logicalId);
    const row = getGearOilCanonicalProductIntelligenceById(fullId);
    assert(row, `missing canonical id: ${logicalId} (${fullId})`);
  }

  const commercial = getGearOilCanonicalProductIntelligenceById(
    gearCanonicalId("commercial_gear_lubricant_80w90")
  );
  const gl580 = getGearOilCanonicalProductIntelligenceById(gearCanonicalId("gl5_gear_lubricant_80w90"));
  assert(commercial && gl580, "commercial and gl5 80w90 rows required");
  assert(commercial.id !== gl580.id, "commercial and gl5 80w90 must have different ids");
  assert(commercial.pdsMapKey === "80W-90 Commercial Gear", "commercial pdsMapKey");
  assert(gl580.pdsMapKey === "80W-90 GL-5 Gear", "gl5 80w90 pdsMapKey");
  assert(commercial.pdsMapKey !== gl580.pdsMapKey, "commercial and gl5 must have different pdsMapKey values");

  const industrialIso = products
    .filter((p) => p.pdsMapKey === "Industrial EP Gear")
    .map((p) => p.isoGrade)
    .filter(Boolean)
    .sort();
  assert(
    industrialIso.join(",") === "100,150,220,320,460,68",
    `Industrial EP Gear ISO grades expected 68-460, got ${industrialIso.join(",")}`
  );

  const synthIndustrialIso = products
    .filter((p) => p.pdsMapKey === "Synthetic Industrial EP Gear")
    .map((p) => p.isoGrade)
    .filter(Boolean)
    .sort();
  assert(
    synthIndustrialIso.join(",") === "150,220,320,460,680",
    `Synthetic Industrial EP Gear ISO grades expected 150,220,320,460,680, got ${synthIndustrialIso.join(",")}`
  );
}

console.log("\ngear oil canonical resolver smoke tests\n" + "=".repeat(56));

let passed = 0;
let runnable = 0;

function pass(line) {
  console.log(`PASS  ${line}`);
  passed += 1;
  runnable += 1;
}

function skip(line) {
  console.log(`SKIP  ${line}`);
}

try {
  runDataShapeTests();
  pass("canonical data shape (16 products, ids, pds keys, ISO branches)");

  runGearOilCase(
    "Commercial 80W-90",
    "What is KLONDIKE 80W-90 Commercial Gear?",
    "commercial_gear_lubricant_80w90",
    {
      expectedPdsKey: "80W-90 Commercial Gear",
      forbiddenLogicalIds: ["gl5_gear_lubricant_80w90"],
    }
  );
  pass("What is KLONDIKE 80W-90 Commercial Gear?");

  runGearOilCase(
    "GL-5 80W-90",
    "What is KLONDIKE 80W-90 GL-5 gear oil?",
    "gl5_gear_lubricant_80w90",
    {
      expectedPdsKey: "80W-90 GL-5 Gear",
      forbiddenLogicalIds: ["commercial_gear_lubricant_80w90"],
    }
  );
  pass("What is KLONDIKE 80W-90 GL-5 gear oil?");

  runGearOilCase(
    "85W-140 GL-5 differential",
    "Do we have 85W-140 GL-5 for differentials?",
    "gl5_gear_lubricant_85w140",
    { expectedPdsKey: "85W-140 GL-5 Gear" }
  );
  pass("Do we have 85W-140 GL-5 for differentials?");

  runGearOilCase(
    "Full Synthetic GL-5 75W-90",
    "What is KLONDIKE 75W-90 full synthetic GL-5 gear oil?",
    "full_synthetic_gl5_gear_lubricant_75w90",
    { expectedPdsKey: "75W-90 Full Synthetic Gear" }
  );
  pass("What is KLONDIKE 75W-90 full synthetic GL-5 gear oil?");

  runGearOilCase(
    "Full Synthetic 75W-140",
    "What is KLONDIKE 75W-140 full synthetic gear oil?",
    "full_synthetic_gl5_gear_lubricant_75w140",
    { expectedPdsKey: "75W-140 Full Synthetic Gear" }
  );
  pass("What is KLONDIKE 75W-140 full synthetic gear oil?");

  const limitedSlipQuery = "What KLONDIKE gear oil should I look at for a limited slip differential?";
  assertLikelyIncludes(
    limitedSlipQuery,
    ["full_synthetic_gl5_gear_lubricant_75w90", "full_synthetic_gl5_gear_lubricant_75w140"],
    "Limited slip differential"
  );
  const limitedResolved = resolveKlondikeProductEntity(limitedSlipQuery);
  const limitedTop = norm(limitedResolved.entityId);
  assert(
    limitedTop === gearCanonicalId("full_synthetic_gl5_gear_lubricant_75w90") ||
      limitedTop === gearCanonicalId("full_synthetic_gl5_gear_lubricant_75w140"),
    `Limited slip: top match must be 75W-90 or 75W-140 FS GL-5, got "${limitedResolved.entityId}"`
  );
  pass("What KLONDIKE gear oil should I look at for a limited slip differential?");

  runGearOilCase("KL-GL2080", "KL-GL2080", "full_synthetic_gl5_gear_lubricant_75w90", {
    expectedPdsKey: "75W-90 Full Synthetic Gear",
  });
  pass("KL-GL2080");

  runGearOilCase(
    "GL-4 only caution",
    "Can I use KLONDIKE Full Synthetic GL-5 75W-90 in a GL-4 only application?",
    "full_synthetic_gl5_gear_lubricant_75w90",
    {
      expectedPdsKey: "75W-90 Full Synthetic Gear",
      requiredInResponse: [/gl[\s-]?4[\s-]?only/i, /not for/i],
    }
  );
  pass("Can I use KLONDIKE Full Synthetic GL-5 75W-90 in a GL-4 only application?");

  runGearOilCase("Industrial ISO 220", "industrial gear oil ISO 220", "industrial_ep_gear_lubricant_iso220", {
    forbiddenLogicalIds: ["full_synthetic_industrial_ep_gear_lubricant_iso220"],
  });
  pass("industrial gear oil ISO 220");

  runGearOilCase(
    "Synthetic industrial ISO 220",
    "synthetic industrial EP gear oil ISO 220",
    "full_synthetic_industrial_ep_gear_lubricant_iso220"
  );
  pass("synthetic industrial EP gear oil ISO 220");

  runGearOilCase(
    "ISO 680 industrial",
    "ISO 680 industrial gear oil",
    "full_synthetic_industrial_ep_gear_lubricant_iso680"
  );
  pass("ISO 680 industrial gear oil");

  runGearOilCase(
    "Micropitting FZG ISO 320",
    "gearbox micropitting FZG synthetic industrial gear ISO 320",
    "full_synthetic_industrial_ep_gear_lubricant_iso320",
    {
      requiredInResponse: [/micropitting|fzg|timken|synthetic industrial/i],
    }
  );
  pass("gearbox micropitting FZG synthetic industrial gear ISO 320");

  runGearOilCase("KL-GL6480", "KL-GL6480", "full_synthetic_industrial_ep_gear_lubricant_iso320");
  pass("KL-GL6480");

  runGearOilCase("KL-GL4280", "KL-GL4280", "industrial_ep_gear_lubricant_iso220");
  pass("KL-GL4280");

  const openGearLubeQuery = "open gear lubricant";
  assertNotGearOilCanonical(openGearLubeQuery, "open gear lubricant");
  const openGearResponse = buildProductEntityAdvisorResponse(openGearLubeQuery);
  const openGearHaystack = responseTextBundle(openGearResponse);
  assert(
    containsPhrase(openGearHaystack, "open gear lubricant") ||
      containsPhrase((openGearResponse.sourceBadges || []).join(" "), "grease canonical"),
    'open gear lubricant: expected grease/open gear territory'
  );
  pass("open gear lubricant");

  assertNotGearOilCanonical("open gear grease", "open gear grease");
  pass("open gear grease");

  assertNotGearOilCanonical("75W-80 synchromesh", "75W-80 synchromesh");
  pass("75W-80 synchromesh");

  assertNotGearOilCanonical("SAE 50 manual transmission fluid", "SAE 50 manual transmission fluid");
  pass("SAE 50 manual transmission fluid");

  assertNotGearOilCanonical("Dexron VI ATF", "Dexron VI ATF");
  pass("Dexron VI ATF");

  runGearOilCase(
    "Manual transmission GL-5 gear oil",
    "manual transmission GL-5 80W-90 gear oil",
    "gl5_gear_lubricant_80w90",
    { expectedPdsKey: "80W-90 GL-5 Gear" }
  );
  pass("manual transmission GL-5 80W-90 gear oil");

  skip("What gear oils does Klondike carry? (catalog routing covered by runAdvisorRoutingPrecedenceSmokeTests.js)");

  console.log("=".repeat(56));
  console.log(`Gear oil canonical smoke tests: ${passed}/${runnable} PASS\n`);
  if (passed !== runnable) {
    throw new Error(`expected all runnable tests to pass (${passed}/${runnable})`);
  }
} catch (e) {
  console.log(`FAIL  ${e instanceof Error ? e.message : e}`);
  console.log("=".repeat(56));
  console.log(`Gear oil canonical smoke tests: ${passed}/${runnable} PASS (with failures)\n`);
  process.exitCode = 1;
}
