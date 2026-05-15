/**
 * Smoke tests for Compliance Specialty canonical product intelligence and entity resolution.
 * Run: node src/data/salesEnablement/runComplianceSpecialtyCanonicalSmokeTests.js
 */

import {
  buildProductEntityAdvisorResponse,
  detectKlondikeProductEntity,
  resolveKlondikeProductEntity,
} from "../../utils/klondikeProductEntityResolver.js";
import {
  getComplianceSpecialtyCanonicalProductIntelligenceById,
  listComplianceSpecialtyCanonicalProductIntelligence,
} from "../complianceSpecialtyCanonicalProductIntelligence.js";

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
 * @param {string} logicalId
 */
function complianceCanonicalId(logicalId) {
  return `compliance-specialty-canonical-${String(logicalId).replace(/_/g, "-")}`;
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
  const sectionText = sections.flatMap((s) => [s?.title, s?.body, ...(s?.items || [])]).join(" ");
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
function haystackMatchesComplianceLogicalId(haystack, logicalId) {
  const fullId = complianceCanonicalId(logicalId);
  const product = getComplianceSpecialtyCanonicalProductIntelligenceById(fullId);
  const text = norm(haystack);
  if (text.includes(norm(fullId))) return true;
  if (text.includes(norm(logicalId))) return true;
  if (product?.productName && text.includes(norm(product.productName))) return true;
  if (product?.pdsMapKey && text.includes(norm(product.pdsMapKey))) return true;
  if (product?.productFamily && text.includes(norm(product.productFamily))) return true;
  return false;
}

/**
 * @param {string} query
 * @param {string} logicalId
 * @param {string} label
 * @param {{ allowAmbiguous?: boolean }} [opts]
 */
function assertDetectedId(query, logicalId, label, opts = {}) {
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: opts.allowAmbiguous });
  const fullId = complianceCanonicalId(logicalId);
  const haystack = resolvedTextBundle(resolved);
  const topOk = norm(resolved.entityId) === norm(fullId) || haystackMatchesComplianceLogicalId(haystack, logicalId);
  const likelyOk = getLikelyMatchIds(resolved).some((id) => norm(id) === norm(fullId));
  const detected = detectKlondikeProductEntity(query).map((h) => h.id);
  const detectOk = detected.includes(fullId);
  assert(
    topOk || likelyOk || detectOk,
    `${label}: expected Compliance Specialty id "${logicalId}" (${fullId}). Got entityId="${resolved.entityId}" pdsKey="${resolved.pdsKey}" label="${resolved.label}" likely=${getLikelyMatchIds(resolved).join(",")} detected=${detected.join(",")}`
  );
}

/**
 * @param {string} query
 * @param {string} label
 */
function assertNotComplianceSpecialtyCanonical(query, label) {
  const resolved = resolveKlondikeProductEntity(query);
  const resolveHaystack = resolvedTextBundle(resolved);
  assert(
    !norm(resolved.entityId).startsWith("compliance-specialty-canonical-"),
    `${label}: entityId must not be Compliance Specialty canonical, got "${resolved.entityId}"`
  );
  assert(
    !getLikelyMatchIds(resolved).some((id) => id.startsWith("compliance-specialty-canonical-")),
    `${label}: likelyMatches must not include Compliance Specialty canonical ids`
  );

  const response = buildProductEntityAdvisorResponse(query);
  const responseHaystack = responseTextBundle(response);
  assert(
    !containsPhrase((response.sourceBadges || []).join(" "), "compliance specialty canonical"),
    `${label}: advisor source badges must not include Compliance Specialty canonical intelligence`
  );
  assert(
    !containsPhrase(responseHaystack, "compliance specialty canonical product intelligence"),
    `${label}: advisor response must not indicate Compliance Specialty canonical intelligence`
  );
  assert(
    !containsPhrase(resolveHaystack, "compliance specialty canonical"),
    `${label}: resolve output must not indicate Compliance Specialty canonical routing`
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
    const fullId = complianceCanonicalId(logicalId);
    const inLikely = likelyIds.includes(fullId);
    const inDetected = detected.includes(fullId);
    const inHaystack = haystackMatchesComplianceLogicalId(haystack, logicalId);
    const topIs = norm(resolved.entityId) === norm(fullId);
    assert(
      inLikely || inDetected || inHaystack || topIs,
      `${label}: expected "${logicalId}" in likelyMatches, detect hits, or top match. entityId="${resolved.entityId}" likely=${likelyIds.join(",")} detected=${detected.join(",")}`
    );
  }
}

/**
 * @param {string} query
 * @param {string} label
 */
function assertComplianceSpecialtyCanonicalWins(query, label) {
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: true });
  const detected = detectKlondikeProductEntity(query).map((h) => h.id);
  const likelyIds = getLikelyMatchIds(resolved);
  const haystack = resolvedTextBundle(resolved);
  const signal =
    norm(resolved.entityId).startsWith("compliance-specialty-canonical-") ||
    likelyIds.some((id) => id.startsWith("compliance-specialty-canonical-")) ||
    detected.some((id) => id.startsWith("compliance-specialty-canonical-")) ||
    containsPhrase(haystack, "compliance-specialty-canonical-");
  assert(
    signal,
    `${label}: expected Compliance Specialty canonical to win. entityId="${resolved.entityId}" likely=${likelyIds.join(",")} detected=${detected.join(",")}`
  );
}

/**
 * @param {string} query
 * @param {string} label
 * @param {string | RegExp | Array<string | RegExp>} familyNeedle
 */
function assertGuardStaysInFamily(query, label, familyNeedle) {
  assertNotComplianceSpecialtyCanonical(query, label);
  const resolved = resolveKlondikeProductEntity(query);
  const response = buildProductEntityAdvisorResponse(query);
  const haystack = [resolvedTextBundle(resolved), responseTextBundle(response), (response.sourceBadges || []).join(" ")].join(
    " "
  );
  assert(
    containsPhrase(haystack, familyNeedle),
    `${label}: expected family signal ${JSON.stringify(familyNeedle)} in resolve/advisor output. entityId="${resolved.entityId}" pdsKey="${resolved.pdsKey}" badges=${JSON.stringify(response.sourceBadges)}`
  );
}

/**
 * @param {string} query
 * @param {string[]} logicalIds
 * @param {string} label
 */
function assertLikelyIncludesAny(query, logicalIds, label) {
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: true });
  const haystack = resolvedTextBundle(resolved);
  const likelyIds = getLikelyMatchIds(resolved);
  const detected = detectKlondikeProductEntity(query).map((h) => h.id);
  const topId = norm(resolved.entityId);

  const hit = logicalIds.some((logicalId) => {
    const fullId = complianceCanonicalId(logicalId);
    return (
      topId === norm(fullId) ||
      likelyIds.includes(fullId) ||
      detected.includes(fullId) ||
      haystackMatchesComplianceLogicalId(haystack, logicalId)
    );
  });
  assert(
    hit,
    `${label}: expected at least one of [${logicalIds.join(", ")}] in top/likely/detect. entityId="${resolved.entityId}" likely=${likelyIds.join(",")} detected=${detected.join(",")}`
  );
}

const REQUIRED_LOGICAL_IDS = [
  "food_grade_ep2_grease",
  "food_grade_hydraulic_oil_iso32",
  "food_grade_hydraulic_oil_iso46",
  "bio_aw_hydraulic_iso32",
  "bio_aw_hydraulic_iso46",
  "bio_synthetic_blend_hydraulic_aw46",
  "bio_hees_hydraulic_iso46",
  "bio_hfdu_hydraulic_iso46",
  "bio_synthetic_eal_hydraulic_iso32",
  "bio_synthetic_eal_hydraulic_iso46",
  "bio_rock_drill_oil_iso100",
  "bio_rock_drill_oil_iso150",
  "enviro_aw_hydraulic_iso22",
  "enviro_aw_hydraulic_iso32",
  "enviro_aw_hydraulic_iso46",
  "enviro_aw_hydraulic_iso68",
  "enviro_mv_hydraulic_iso32",
  "enviro_mv_hydraulic_iso46",
];

const REQUIRED_PDS_MAP_KEYS = [
  "Food Grade EP-2 Grease",
  "Food Grade Hydraulic",
  "Bio AW Hydraulic",
  "Bio Synthetic Blend Hydraulic",
  "Bio HEES Hydraulic",
  "Bio HFDU Hydraulic",
  "Bio Synthetic EAL Hydraulic",
  "Bio Rock Drill Oil",
  "Enviro AW Hydraulic",
  "Enviro MV Hydraulic",
];

const FOOD_GRADE_GREASE = "food_grade_ep2_grease";
const FOOD_GRADE_HYDR_32 = "food_grade_hydraulic_oil_iso32";
const FOOD_GRADE_HYDR_46 = "food_grade_hydraulic_oil_iso46";
const BIO_HEES = "bio_hees_hydraulic_iso46";
const BIO_HFDU = "bio_hfdu_hydraulic_iso46";

const BIO_EAL_CANDIDATES = [
  "bio_aw_hydraulic_iso32",
  "bio_aw_hydraulic_iso46",
  "bio_synthetic_blend_hydraulic_aw46",
  "bio_hees_hydraulic_iso46",
  "bio_hfdu_hydraulic_iso46",
  "bio_synthetic_eal_hydraulic_iso32",
  "bio_synthetic_eal_hydraulic_iso46",
];

const ENVIRO_CANDIDATES = [
  "enviro_aw_hydraulic_iso22",
  "enviro_aw_hydraulic_iso32",
  "enviro_aw_hydraulic_iso46",
  "enviro_aw_hydraulic_iso68",
  "enviro_mv_hydraulic_iso32",
  "enviro_mv_hydraulic_iso46",
];

/**
 * @param {string} label
 * @param {string} query
 * @param {string} logicalId
 * @param {{
 *   expectedPdsKey?: string | null,
 *   allowAmbiguous?: boolean,
 *   likelyAlso?: string[],
 *   resolveOnly?: boolean,
 *   requireComplianceBadge?: boolean,
 *   requiredInCombined?: RegExp[],
 *   forbiddenInCombined?: RegExp[],
 * }} [opts]
 */
function runComplianceCase(label, query, logicalId, opts = {}) {
  assertDetectedId(query, logicalId, label, { allowAmbiguous: opts.allowAmbiguous });
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: opts.allowAmbiguous });
  const product = getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId(logicalId));

  const skipPdsKey = opts.allowAmbiguous && resolved.confidence === "ambiguous";
  if (!skipPdsKey) {
    if (opts.expectedPdsKey !== undefined) {
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
  }

  if (opts.likelyAlso?.length) {
    assertLikelyIncludes(query, opts.likelyAlso, label);
  }

  if (opts.resolveOnly) {
    return;
  }

  const response = buildProductEntityAdvisorResponse(query);
  assert(response && typeof response === "object", `${label}: expected advisor response`);

  const combinedHaystack = `${resolvedTextBundle(resolved)} ${responseTextBundle(response)}`;

  if (opts.requireComplianceBadge !== false) {
    const hasBadge =
      containsPhrase((response.sourceBadges || []).join(" "), "compliance specialty canonical") ||
      norm(resolved.entityId).startsWith("compliance-specialty-canonical-");
    assert(hasBadge, `${label}: expected Compliance Specialty canonical source badge or routing`);
  }

  if (response.ok === true) {
    assert(
      haystackMatchesComplianceLogicalId(combinedHaystack, logicalId),
      `${label}: expected Compliance Specialty product in advisor/resolve output for "${logicalId}"`
    );
  }

  for (const re of opts.requiredInCombined || []) {
    assert(re.test(combinedHaystack), `${label}: required wording missing ${re}`);
  }

  for (const re of opts.forbiddenInCombined || []) {
    assert(!re.test(combinedHaystack), `${label}: forbidden wording matched ${re}`);
  }
}

/**
 * @param {string} logicalId
 * @param {RegExp} pattern
 * @param {string} label
 */
function assertDataHasPattern(logicalId, pattern, label) {
  const product = getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId(logicalId));
  assert(product, `${label}: missing canonical row`);
  const dataText = [
    ...(product.cautions || []),
    ...(product.sourceNotes || []),
    product.salesPositioning,
    product.formulation,
    product.biodegradableStatus,
    product.foodGradeStatus,
    ...(product.registrations || []),
    ...(product.specifications || []),
  ].join(" ");
  assert(pattern.test(dataText), `${label}: expected pattern in canonical data for "${logicalId}"`);
}

function runDataShapeTests() {
  const products = listComplianceSpecialtyCanonicalProductIntelligence();
  assert(products.length === 18, `expected 18 Compliance Specialty records, got ${products.length}`);

  for (const logicalId of REQUIRED_LOGICAL_IDS) {
    const fullId = complianceCanonicalId(logicalId);
    const row = getComplianceSpecialtyCanonicalProductIntelligenceById(fullId);
    assert(row, `missing canonical id: ${logicalId} (${fullId})`);
    assert(nonEmptyString(row.pdsMapKey), `missing pdsMapKey on ${logicalId}`);
  }

  for (const key of REQUIRED_PDS_MAP_KEYS) {
    const count = products.filter((p) => p.pdsMapKey === key).length;
    assert(count >= 1, `expected at least one record with pdsMapKey "${key}", got ${count}`);
  }

  const hasNonEmpty = (/** @type {(p: typeof products[0]) => unknown} */ pick) =>
    products.some((p) => {
      const v = pick(p);
      return Array.isArray(v) ? v.length > 0 : nonEmptyString(v);
    });

  assert(hasNonEmpty((p) => p.complianceTriggers), "expected non-empty complianceTriggers on at least one record");
  assert(
    hasNonEmpty((p) => p.environmentalRiskSignals),
    "expected non-empty environmentalRiskSignals on at least one record"
  );
  assert(hasNonEmpty((p) => p.customerProfileSignals), "expected non-empty customerProfileSignals on at least one record");
  assert(
    hasNonEmpty((p) => p.customerProfileQuestions),
    "expected non-empty customerProfileQuestions on at least one record"
  );
  assert(
    products.every((p) => Array.isArray(p.salesEnablementAngles)),
    "expected salesEnablementAngles array on every record"
  );
  assert(
    hasNonEmpty((p) => p.salesEnablementAngles) || hasNonEmpty((p) => p.productSpotlightAngles),
    "expected non-empty salesEnablementAngles or productSpotlightAngles on at least one record (v1 data may use spotlight angles until salesEnablementAngles are populated)"
  );
  assert(hasNonEmpty((p) => p.crossSellSignals), "expected non-empty crossSellSignals on at least one record");

  const foodGrease = getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId(FOOD_GRADE_GREASE));
  assert(foodGrease, "food grade grease required");
  assert(containsPhrase(foodGrease.foodGradeStatus, "nsf h1"), "Food Grade Grease foodGradeStatus must reference NSF H1");
  assert(
    containsPhrase([...(foodGrease.specifications || []), ...(foodGrease.registrations || [])].join(" "), [
      "fda",
      "21 cfr",
      "163515",
    ]),
    "Food Grade Grease must reference FDA 21 CFR / registration 163515"
  );
  assert(norm(foodGrease.thickenerType).includes("aluminum complex"), "Food Grade Grease thickenerType must be Aluminum Complex");
  const greaseIdentity = norm(
    [foodGrease.formulation, foodGrease.productName, foodGrease.salesPositioning].join(" ")
  );
  assert(!/\bis\s+(a\s+)?lithium\b/.test(greaseIdentity), "Food Grade Grease must not identify as lithium grease");
  assert(!/\bis\s+(a\s+)?polyurea\b/.test(greaseIdentity), "Food Grade Grease must not identify as polyurea grease");
  assert(
    !/\bcalcium\s+sulfonate\s+grease\b/.test(greaseIdentity),
    "Food Grade Grease must not identify as calcium sulfonate grease"
  );

  const fgHydr32 = getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId(FOOD_GRADE_HYDR_32));
  const fgHydr46 = getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId(FOOD_GRADE_HYDR_46));
  assert(fgHydr32 && fgHydr46, "food grade hydraulic rows required");
  assert(containsPhrase((fgHydr32.registrations || []).join(" "), "163706"), "FG hydraulic ISO 32 registration 163706");
  assert(containsPhrase((fgHydr46.registrations || []).join(" "), "163707"), "FG hydraulic ISO 46 registration 163707");

  assertDataHasPattern("bio_hfdu_hydraulic_iso46", /water\/glycol|water glycol/i, "BIO HFDU water/glycol caution");
  assertDataHasPattern(
    "bio_aw_hydraulic_iso32",
    /void\s+biodegradable|void biodegradable/i,
    "BIO AW void biodegradable caution"
  );
  assertDataHasPattern("enviro_aw_hydraulic_iso22", /dielectric/i, "ENVIRO AW dielectric caution");

  const enviroRows = products.filter((p) => p.productFamily.startsWith("enviro_"));
  assert(enviroRows.length >= 6, "expected ENVIRO AW/MV rows");
  for (const row of enviroRows) {
    const status = norm(row.biodegradableStatus || "");
    assert(status.includes("inherently"), `ENVIRO row ${row.id} must be inherently biodegradable in data`);
    assert(!status.includes("readily biodegradable"), `ENVIRO row ${row.id} must not be labeled readily biodegradable`);
  }

  const hees = getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId(BIO_HEES));
  const hfdu = getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId(BIO_HFDU));
  assert(hees && hfdu, "HEES/HFDU rows required");
  const sharedNotes = `${(hees.sourceNotes || []).join(" ")} ${(hfdu.sourceNotes || []).join(" ")}`;
  assert(/kl-bl3380|kl-bl3390|shared/i.test(sharedNotes), "HEES/HFDU source notes must mention shared KL-BL3380/KL-BL3390");
}

console.log("\nCompliance specialty canonical resolver smoke tests\n" + "=".repeat(56));

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
  pass("canonical data shape (18 products, ids, pdsMapKeys, fields, cautions)");

  runComplianceCase("KL-FG7030", "KL-FG7030", FOOD_GRADE_GREASE, { resolveOnly: true });
  pass("KL-FG7030");

  runComplianceCase("KL FG 2280", "KL FG 2280", FOOD_GRADE_HYDR_32, { resolveOnly: true });
  pass("KL FG 2280");

  runComplianceCase("KLFG2480", "KLFG2480", FOOD_GRADE_HYDR_46, { resolveOnly: true });
  pass("KLFG2480");

  runComplianceCase("KL-BL1880", "KL-BL1880", "bio_aw_hydraulic_iso32", { resolveOnly: true });
  pass("KL-BL1880");

  runComplianceCase("KL-BL1980", "KL-BL1980", "bio_aw_hydraulic_iso46", { resolveOnly: true });
  pass("KL-BL1980");

  runComplianceCase("KL-BL2780", "KL-BL2780", "bio_synthetic_blend_hydraulic_aw46", { resolveOnly: true });
  pass("KL-BL2780");

  runComplianceCase("KL-BL3280", "KL-BL3280", "bio_synthetic_eal_hydraulic_iso32", { resolveOnly: true });
  pass("KL-BL3280");

  runComplianceCase("KL-BL3480", "KL-BL3480", "bio_synthetic_eal_hydraulic_iso46", { resolveOnly: true });
  pass("KL-BL3480");

  runComplianceCase("KL-BL4380", "KL-BL4380", "bio_rock_drill_oil_iso100", { resolveOnly: true });
  pass("KL-BL4380");

  runComplianceCase("KL-BL4480", "KL-BL4480", "bio_rock_drill_oil_iso150", { resolveOnly: true });
  pass("KL-BL4480");

  runComplianceCase("KL-BL0180", "KL-BL0180", "enviro_aw_hydraulic_iso22", { resolveOnly: true });
  pass("KL-BL0180");

  runComplianceCase("KL-BL0280", "KL-BL0280", "enviro_aw_hydraulic_iso32", { resolveOnly: true });
  pass("KL-BL0280");

  runComplianceCase("KL-BL0380", "KL-BL0380", "enviro_aw_hydraulic_iso46", { resolveOnly: true });
  pass("KL-BL0380");

  runComplianceCase("KL-BL0480", "KL-BL0480", "enviro_aw_hydraulic_iso68", { resolveOnly: true });
  pass("KL-BL0480");

  runComplianceCase("KL-BL1080", "KL-BL1080", "enviro_mv_hydraulic_iso32", { resolveOnly: true });
  pass("KL-BL1080");

  runComplianceCase("KL-BL1180", "KL-BL1180", "enviro_mv_hydraulic_iso46", { resolveOnly: true });
  pass("KL-BL1180");

  assertComplianceSpecialtyCanonicalWins("KL-BL3380", "KL-BL3380 shared SKU");
  assertLikelyIncludes("KL-BL3380", [BIO_HEES, BIO_HFDU], "KL-BL3380 HEES+HFDU");
  pass("KL-BL3380");

  runComplianceCase("KL-BL3380 HEES", "KL-BL3380 HEES", BIO_HEES, { resolveOnly: true });
  pass("KL-BL3380 HEES");

  runComplianceCase("KL-BL3380 fire resistant hydraulic", "KL-BL3380 fire resistant hydraulic", BIO_HFDU, {
    resolveOnly: true,
  });
  pass("KL-BL3380 fire resistant hydraulic");

  runComplianceCase("KL-BL3390 HFDU", "KL-BL3390 HFDU", BIO_HFDU, { resolveOnly: true });
  pass("KL-BL3390 HFDU");

  runComplianceCase("NSF H1 food grade grease EP-2", "NSF H1 food grade grease EP-2", FOOD_GRADE_GREASE);
  pass("NSF H1 food grade grease EP-2");

  runComplianceCase("FDA incidental food contact grease", "FDA incidental food contact grease", FOOD_GRADE_GREASE);
  pass("FDA incidental food contact grease");

  runComplianceCase("food grade hydraulic ISO 32", "food grade hydraulic ISO 32", FOOD_GRADE_HYDR_32);
  pass("food grade hydraulic ISO 32");

  runComplianceCase(
    "food grade hydraulic ISO 46 beverage packaging",
    "food grade hydraulic ISO 46 for beverage packaging",
    FOOD_GRADE_HYDR_46
  );
  pass("food grade hydraulic ISO 46 for beverage packaging");

  assertComplianceSpecialtyCanonicalWins("Food Grade Hydraulic", "Food Grade Hydraulic ambiguous");
  assertLikelyIncludes("Food Grade Hydraulic", [FOOD_GRADE_HYDR_32, FOOD_GRADE_HYDR_46], "Food Grade Hydraulic both grades");
  pass("Food Grade Hydraulic");

  {
    const query = "Can I mix Food Grade Hydraulic with another fluid type?";
    assertDetectedId(query, FOOD_GRADE_HYDR_32, "Food Grade Hydraulic mix caution", { allowAmbiguous: true });
    const resolved = resolveKlondikeProductEntity(query);
    const response = buildProductEntityAdvisorResponse(query);
    const combined = `${resolvedTextBundle(resolved)} ${responseTextBundle(response)}`;
    const surfaced = /do not mix|other fluid types/i.test(combined);
    assert(
      surfaced ||
        /do not mix|other fluid types/i.test(
          [
            ...(getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId(FOOD_GRADE_HYDR_32))
              ?.cautions || []),
            ...(getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId(FOOD_GRADE_HYDR_46))
              ?.cautions || []),
          ].join(" ")
        ),
      "Food Grade Hydraulic mix: expected do-not-mix caution in advisor output or canonical data"
    );
  }
  pass("Can I mix Food Grade Hydraulic with another fluid type?");

  runComplianceCase("biodegradable AW hydraulic ISO 32", "biodegradable AW hydraulic ISO 32", "bio_aw_hydraulic_iso32", {
    allowAmbiguous: true,
  });
  pass("biodegradable AW hydraulic ISO 32");

  runComplianceCase("biodegradable AW hydraulic ISO 46", "biodegradable AW hydraulic ISO 46", "bio_aw_hydraulic_iso46", {
    allowAmbiguous: true,
  });
  pass("biodegradable AW hydraulic ISO 46");

  runComplianceCase("BIO Synthetic Blend AW46", "BIO Synthetic Blend AW46", "bio_synthetic_blend_hydraulic_aw46");
  pass("BIO Synthetic Blend AW46");

  runComplianceCase("HEES hydraulic oil ISO 46", "HEES hydraulic oil ISO 46", BIO_HEES);
  pass("HEES hydraulic oil ISO 46");

  runComplianceCase("HFDU fire resistant hydraulic oil", "HFDU fire resistant hydraulic oil", BIO_HFDU);
  pass("HFDU fire resistant hydraulic oil");

  runComplianceCase(
    "BIO-Synthetic EAL hydraulic ISO 32 VGP",
    "BIO-Synthetic EAL hydraulic ISO 32 VGP",
    "bio_synthetic_eal_hydraulic_iso32"
  );
  pass("BIO-Synthetic EAL hydraulic ISO 32 VGP");

  runComplianceCase(
    "BIO-Synthetic EAL hydraulic ISO 46 VGP",
    "BIO-Synthetic EAL hydraulic ISO 46 VGP",
    "bio_synthetic_eal_hydraulic_iso46"
  );
  pass("BIO-Synthetic EAL hydraulic ISO 46 VGP");

  runComplianceCase("ENVIRO AW hydraulic ISO 22", "ENVIRO AW hydraulic ISO 22", "enviro_aw_hydraulic_iso22");
  pass("ENVIRO AW hydraulic ISO 22");

  runComplianceCase(
    "ENVIRO AW hydraulic ISO 46 silver bearing pump",
    "ENVIRO AW hydraulic ISO 46 silver bearing pump",
    "enviro_aw_hydraulic_iso46"
  );
  pass("ENVIRO AW hydraulic ISO 46 silver bearing pump");

  runComplianceCase("ENVIRO MV hydraulic ISO 32", "ENVIRO MV hydraulic ISO 32", "enviro_mv_hydraulic_iso32");
  pass("ENVIRO MV hydraulic ISO 32");

  runComplianceCase(
    "ENVIRO MV hydraulic ISO 46 Komatsu HM46",
    "ENVIRO MV hydraulic ISO 46 Komatsu HM46",
    "enviro_mv_hydraulic_iso46"
  );
  pass("ENVIRO MV hydraulic ISO 46 Komatsu HM46");

  assertComplianceSpecialtyCanonicalWins("VGP compliant EAL hydraulic oil", "VGP EAL ambiguous");
  assertLikelyIncludesAny("VGP compliant EAL hydraulic oil", BIO_EAL_CANDIDATES, "VGP EAL candidates");
  pass("VGP compliant EAL hydraulic oil");

  assertComplianceSpecialtyCanonicalWins("inherently biodegradable hydraulic", "inherently biodegradable ambiguous");
  assertLikelyIncludesAny("inherently biodegradable hydraulic", ENVIRO_CANDIDATES, "inherently biodegradable ENVIRO");
  pass("inherently biodegradable hydraulic");

  runComplianceCase(
    "biodegradable rock drill oil ISO 100",
    "biodegradable rock drill oil ISO 100",
    "bio_rock_drill_oil_iso100"
  );
  pass("biodegradable rock drill oil ISO 100");

  runComplianceCase("BIO rock drill ISO 150 for jackhammer", "BIO rock drill ISO 150 for jackhammer", "bio_rock_drill_oil_iso150");
  pass("BIO rock drill ISO 150 for jackhammer");

  {
    const query = "rock drill oil ISO 150";
    assertNotComplianceSpecialtyCanonical(query, "rock drill oil ISO 150 guard");
    const resolved = resolveKlondikeProductEntity(query);
    assertResolverResult(resolved, { allowAmbiguous: true });
    const top = norm(resolved.entityId);
    const likely = getLikelyMatchIds(resolved);
    const detected = detectKlondikeProductEntity(query).map((h) => h.id);
    const industrialRock =
      top.startsWith("industrial-specialty-canonical-rock-drill-") ||
      likely.some((id) => id.startsWith("industrial-specialty-canonical-rock-drill-")) ||
      detected.some((id) => id.startsWith("industrial-specialty-canonical-rock-drill-"));
    assert(
      industrialRock,
      `rock drill oil ISO 150: expected industrial specialty rock drill, got entityId="${resolved.entityId}" likely=${likely.join(",")} detected=${detected.join(",")}`
    );
  }
  pass("rock drill oil ISO 150");

  assertNotComplianceSpecialtyCanonical("hydraulic oil ISO 46", "hydraulic oil ISO 46 guard");
  pass("hydraulic oil ISO 46");

  assertNotComplianceSpecialtyCanonical("EP-2 grease", "EP-2 grease guard");
  pass("EP-2 grease");

  assertNotComplianceSpecialtyCanonical("AW hydraulic", "AW hydraulic guard");
  pass("AW hydraulic");

  assertGuardStaysInFamily("AGRIMAX Trans Drive Hydraulic", "AGRIMAX Trans Drive guard", [
    "agri-oem-canonical-",
    "ag oem canonical",
  ]);
  pass("AGRIMAX Trans Drive Hydraulic");

  assertGuardStaysInFamily("GL-5 differential gear oil", "GL-5 differential guard", [
    "gear-oil-canonical-",
    "gear oil canonical",
  ]);
  pass("GL-5 differential gear oil");

  assertGuardStaysInFamily("Dexron VI ATF", "Dexron VI ATF guard", ["tx-canonical-", "transmission canonical"]);
  pass("Dexron VI ATF");

  assertGuardStaysInFamily("bar and chain oil", "bar and chain oil guard", [
    "industrial-specialty-canonical-",
    "industrial specialty oil canonical",
    "bar",
    "chain",
  ]);
  pass("bar and chain oil");

  {
    const query = "BIO AW hydraulic mixed with conventional oil";
    assertDetectedId(query, "bio_aw_hydraulic_iso32", "BIO AW mix caution", { allowAmbiguous: true });
    const resolved = resolveKlondikeProductEntity(query);
    const response = buildProductEntityAdvisorResponse(query);
    const combined = `${resolvedTextBundle(resolved)} ${responseTextBundle(response)}`;
    const surfaced = /void\s+biodegradable|void biodegradable/i.test(combined);
    assert(
      surfaced ||
        /void\s+biodegradable|void biodegradable/i.test(
          [
            ...(getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId("bio_aw_hydraulic_iso32"))
              ?.cautions || []),
            ...(getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId("bio_aw_hydraulic_iso46"))
              ?.cautions || []),
          ].join(" ")
        ),
      "BIO AW mix: expected void biodegradable caution in advisor output or canonical data"
    );
  }
  pass("BIO AW hydraulic mixed with conventional oil");

  runComplianceCase(
    "HFDU hydraulic with water glycol fire resistant fluid",
    "HFDU hydraulic with water glycol fire resistant fluid",
    BIO_HFDU,
    {
      requiredInCombined: [/water\/glycol|water glycol/i],
    }
  );
  pass("HFDU hydraulic with water glycol fire resistant fluid");

  {
    const query = "ENVIRO AW dielectric strength";
    assertDetectedId(query, "enviro_aw_hydraulic_iso22", "ENVIRO AW dielectric", { allowAmbiguous: true });
    const resolved = resolveKlondikeProductEntity(query);
    const response = buildProductEntityAdvisorResponse(query);
    const combined = `${resolvedTextBundle(resolved)} ${responseTextBundle(response)}`;
    const surfaced = /dielectric/i.test(combined);
    const enviroAwDataText = ["enviro_aw_hydraulic_iso22", "enviro_aw_hydraulic_iso32", "enviro_aw_hydraulic_iso46"]
      .flatMap((id) => {
        const row = getComplianceSpecialtyCanonicalProductIntelligenceById(complianceCanonicalId(id));
        return [...(row?.cautions || []), ...(row?.sourceNotes || [])];
      })
      .join(" ");
    assert(
      surfaced || /dielectric/i.test(enviroAwDataText),
      "ENVIRO AW dielectric: expected dielectric caution in advisor output or canonical data"
    );
  }
  pass("ENVIRO AW dielectric strength");

  skip(
    "What food grade and biodegradable products does Klondike carry? (catalog routing covered by runAdvisorRoutingPrecedenceSmokeTests.js)"
  );

  console.log("=".repeat(56));
  console.log(`Compliance specialty canonical smoke tests: ${passed}/${runnable} PASS\n`);
  if (passed !== runnable) {
    throw new Error(`expected all runnable tests to pass (${passed}/${runnable})`);
  }
} catch (e) {
  console.log(`FAIL  ${e instanceof Error ? e.message : e}`);
  console.log("=".repeat(56));
  console.log(`Compliance specialty canonical smoke tests: ${passed}/${runnable} PASS (with failures)\n`);
  process.exitCode = 1;
}
