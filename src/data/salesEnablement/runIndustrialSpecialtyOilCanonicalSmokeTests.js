/**
 * Smoke tests for industrial / specialty oil canonical product intelligence and entity resolution.
 * Run: node src/data/salesEnablement/runIndustrialSpecialtyOilCanonicalSmokeTests.js
 */

import {
  buildProductEntityAdvisorResponse,
  detectKlondikeProductEntity,
  resolveKlondikeProductEntity,
} from "../../utils/klondikeProductEntityResolver.js";
import {
  getIndustrialSpecialtyOilCanonicalProductIntelligenceById,
  listIndustrialSpecialtyOilCanonicalProductIntelligence,
} from "../industrialSpecialtyOilCanonicalProductIntelligence.js";

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
 * Logical id suffix => full industrial-specialty-canonical id.
 * @param {string} logicalId
 */
function specialtyCanonicalId(logicalId) {
  return `industrial-specialty-canonical-${String(logicalId).replace(/_/g, "-")}`;
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
function haystackMatchesSpecialtyLogicalId(haystack, logicalId) {
  const fullId = specialtyCanonicalId(logicalId);
  const product = getIndustrialSpecialtyOilCanonicalProductIntelligenceById(fullId);
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
 * @param {{ allowAmbiguous?: boolean }} [opts]
 */
function assertDetectedId(query, logicalId, label, opts = {}) {
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: opts.allowAmbiguous });
  const fullId = specialtyCanonicalId(logicalId);
  const haystack = resolvedTextBundle(resolved);
  const topOk = norm(resolved.entityId) === norm(fullId) || haystackMatchesSpecialtyLogicalId(haystack, logicalId);
  const likelyOk = getLikelyMatchIds(resolved).some((id) => norm(id) === norm(fullId));
  assert(
    topOk || likelyOk,
    `${label}: expected industrial specialty id "${logicalId}" (${fullId}). Got entityId="${resolved.entityId}" pdsKey="${resolved.pdsKey}" label="${resolved.label}" likely=${getLikelyMatchIds(resolved).join(",")}`
  );
}

/**
 * @param {string} query
 * @param {string} label
 */
function assertNotIndustrialSpecialtyCanonical(query, label) {
  const resolved = resolveKlondikeProductEntity(query);
  const resolveHaystack = resolvedTextBundle(resolved);
  assert(
    !norm(resolved.entityId).startsWith("industrial-specialty-canonical-"),
    `${label}: entityId must not be industrial specialty canonical, got "${resolved.entityId}"`
  );
  assert(
    !getLikelyMatchIds(resolved).some((id) => id.startsWith("industrial-specialty-canonical-")),
    `${label}: likelyMatches must not include industrial specialty canonical ids`
  );

  const response = buildProductEntityAdvisorResponse(query);
  const responseHaystack = responseTextBundle(response);
  assert(
    !containsPhrase((response.sourceBadges || []).join(" "), "industrial specialty oil canonical"),
    `${label}: advisor source badges must not include industrial specialty oil canonical intelligence`
  );
  assert(
    !containsPhrase(responseHaystack, "industrial specialty oil canonical product intelligence"),
    `${label}: advisor response must not indicate industrial specialty oil canonical intelligence`
  );
  assert(
    !containsPhrase(resolveHaystack, "industrial specialty oil canonical"),
    `${label}: resolve output must not indicate industrial specialty oil canonical routing`
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
    const fullId = specialtyCanonicalId(logicalId);
    const inLikely = likelyIds.includes(fullId);
    const inDetected = detected.includes(fullId);
    const inHaystack = haystackMatchesSpecialtyLogicalId(haystack, logicalId);
    const topIs = norm(resolved.entityId) === norm(fullId);
    assert(
      inLikely || inDetected || inHaystack || topIs,
      `${label}: expected "${logicalId}" in likelyMatches, detect hits, or top match. entityId="${resolved.entityId}" likely=${likelyIds.join(",")} detected=${detected.join(",")}`
    );
  }
}

const REQUIRED_LOGICAL_IDS = [
  "bar_chain_commercial_oil",
  "clear_bar_chain_oil",
  "hi_tack_bar_chain_iso90_winter",
  "hi_tack_bar_chain_iso150_all_season",
  "hi_tack_bar_chain_iso220_summer",
  "tacky_saw_guide_iso100",
  "tacky_saw_guide_iso150",
  "full_synthetic_compressor_iso46",
  "natural_gas_compressor_iso260",
  "way_oil_iso68",
  "soluble_cutting_oil",
  "rock_drill_iso22",
  "rock_drill_iso32",
  "rock_drill_iso68",
  "rock_drill_iso100",
  "rock_drill_iso150",
  "rock_drill_iso220",
  "enhanced_form_release_oil",
  "form_release_dust_suppressant_oil",
  "light_form_oil",
  "multi_use_industrial_cattle_oil",
  "non_detergent_30_lubricating_oil",
];

const ROCK_DRILL_LOGICAL_IDS = [
  "rock_drill_iso22",
  "rock_drill_iso32",
  "rock_drill_iso68",
  "rock_drill_iso100",
  "rock_drill_iso150",
  "rock_drill_iso220",
];

/**
 * @param {string} label
 * @param {string} query
 * @param {string} logicalId
 * @param {{
 *   expectedPdsKey?: string | null,
 *   forbiddenLogicalIds?: string[],
 *   requireSpecialtyBadge?: boolean,
 *   requiredInResponse?: RegExp[],
 *   allowAmbiguous?: boolean,
 *   likelyAlso?: string[],
 *   resolveOnly?: boolean,
 * }} [opts]
 */
function runSpecialtyCase(label, query, logicalId, opts = {}) {
  assertDetectedId(query, logicalId, label, { allowAmbiguous: opts.allowAmbiguous });
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: opts.allowAmbiguous });
  const product = getIndustrialSpecialtyOilCanonicalProductIntelligenceById(specialtyCanonicalId(logicalId));

  const skipPdsKey =
    opts.skipPdsKeyCheck || (opts.allowAmbiguous && resolved.confidence === "ambiguous");
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

  for (const forbidden of opts.forbiddenLogicalIds || []) {
    const forbiddenId = specialtyCanonicalId(forbidden);
    assert(
      norm(resolved.entityId) !== norm(forbiddenId),
      `${label}: top entityId must not be "${forbidden}"`
    );
    if (product?.pdsMapKey) {
      const forbiddenProduct = getIndustrialSpecialtyOilCanonicalProductIntelligenceById(forbiddenId);
      if (forbiddenProduct?.pdsMapKey && norm(resolved.pdsKey) === norm(forbiddenProduct.pdsMapKey)) {
        assert(
          norm(resolved.entityId) === norm(specialtyCanonicalId(logicalId)),
          `${label}: shared pdsKey but top entity must be "${logicalId}", got "${resolved.entityId}"`
        );
      }
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

  const responseHaystack = responseTextBundle(response);
  const combinedHaystack = `${resolvedTextBundle(resolved)} ${responseHaystack}`;

  if (response.ok === true) {
    assert(nonEmptyString(response.title), `${label}: expected title`);
    const hasCoachText =
      nonEmptyString(response.directAnswer) ||
      (response.sections || []).some(
        (s) => nonEmptyString(s?.body) || (Array.isArray(s?.items) && s.items.length > 0)
      ) ||
      nonEmptyString(resolved.message);
    assert(
      hasCoachText,
      `${label}: expected directAnswer, section content, or resolve message when ok=true (directAnswer="${response.directAnswer}", message="${response.message}")`
    );
    assert(
      haystackMatchesSpecialtyLogicalId(combinedHaystack, logicalId),
      `${label}: expected specialty product in advisor response for "${logicalId}"`
    );
    if (opts.requireSpecialtyBadge !== false) {
      assertDetectedSourceBadge(query, "industrial specialty oil canonical", label);
    }
  } else if (opts.requireSpecialtyBadge !== false) {
    assert(
      containsPhrase(combinedHaystack, "industrial specialty oil canonical") ||
        norm(resolved.entityId).startsWith("industrial-specialty-canonical-"),
      `${label}: expected industrial specialty routing in resolve/advisor when ok=false`
    );
  }

  for (const re of opts.requiredInResponse || []) {
    assert(
      re.test(combinedHaystack),
      `${label}: required wording missing ${re} (ok=${response.ok}, entityId="${resolved.entityId}")`
    );
  }
}

/**
 * @param {string} query
 * @param {string} label
 * @param {string | RegExp | Array<string | RegExp>} familyNeedle
 */
function assertGuardStaysInFamily(query, label, familyNeedle) {
  assertNotIndustrialSpecialtyCanonical(query, label);
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

function runDataShapeTests() {
  const products = listIndustrialSpecialtyOilCanonicalProductIntelligence();
  assert(products.length === 22, `expected 22 industrial specialty oil records, got ${products.length}`);

  for (const logicalId of REQUIRED_LOGICAL_IDS) {
    const fullId = specialtyCanonicalId(logicalId);
    const row = getIndustrialSpecialtyOilCanonicalProductIntelligenceById(fullId);
    assert(row, `missing canonical id: ${logicalId} (${fullId})`);
  }

  const hasNonEmpty = (/** @type {(p: typeof products[0]) => unknown} */ pick) =>
    products.some((p) => {
      const v = pick(p);
      return Array.isArray(v) ? v.length > 0 : nonEmptyString(v);
    });

  assert(hasNonEmpty((p) => p.customerProfileSignals), "expected non-empty customerProfileSignals on at least one record");
  assert(hasNonEmpty((p) => p.customerProfileQuestions), "expected non-empty customerProfileQuestions on at least one record");
  assert(hasNonEmpty((p) => p.salesEnablementAngles), "expected non-empty salesEnablementAngles on at least one record");
  assert(hasNonEmpty((p) => p.productSpotlightAngles), "expected non-empty productSpotlightAngles on at least one record");
  assert(hasNonEmpty((p) => p.categorySpotlightAngles), "expected non-empty categorySpotlightAngles on at least one record");
  assert(hasNonEmpty((p) => p.crossSellSignals), "expected non-empty crossSellSignals on at least one record");
  assert(hasNonEmpty((p) => p.operationalPainPoints), "expected non-empty operationalPainPoints on at least one record");

  const fsCompressor = getIndustrialSpecialtyOilCanonicalProductIntelligenceById(
    specialtyCanonicalId("full_synthetic_compressor_iso46")
  );
  assert(fsCompressor, "full_synthetic_compressor_iso46 required");
  const compressorCautionText = (fsCompressor.cautions || []).join(" ");
  assert(
    containsPhrase(compressorCautionText, [/pag/i, /silicone/i]),
    "full_synthetic_compressor_iso46 cautions must mention PAG/silicone incompatibility"
  );
  assert(
    containsPhrase(compressorCautionText, [/chemically active|oxygen|chlorine|hydrogen chloride/i]),
    "full_synthetic_compressor_iso46 cautions must mention chemically active gases"
  );

  const nd30 = getIndustrialSpecialtyOilCanonicalProductIntelligenceById(
    specialtyCanonicalId("non_detergent_30_lubricating_oil")
  );
  assert(nd30, "non_detergent_30 required");
  assert(
    containsPhrase((nd30.cautions || []).join(" "), [/not for use in automotive gasoline|automotive gasoline engines/i]),
    "non_detergent_30 must caution against automotive gasoline engines"
  );

  const rock22 = getIndustrialSpecialtyOilCanonicalProductIntelligenceById(specialtyCanonicalId("rock_drill_iso22"));
  assert(rock22, "rock_drill_iso22 required");
  assert(
    Array.isArray(rock22.productNumbers) && rock22.productNumbers.length === 0,
    "rock_drill_iso22 must not have invented product numbers"
  );

  const hiTack = products.filter((p) => p.pdsMapKey === "Hi-Tack Bar & Chain");
  assert(hiTack.length === 3, `expected 3 Hi-Tack Bar & Chain grades, got ${hiTack.length}`);

  const rockDrill = products.filter((p) => p.pdsMapKey === "Rock Drill Oil");
  assert(rockDrill.length === 6, `expected 6 Rock Drill Oil grades, got ${rockDrill.length}`);
}

console.log("\nindustrial specialty oil canonical resolver smoke tests\n" + "=".repeat(56));

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
  pass("canonical data shape (22 products, ids, fields, cautions, shared pdsMapKey families)");

  runSpecialtyCase("KL-IO5180", "KL-IO5180", "full_synthetic_compressor_iso46", { resolveOnly: true });
  pass("KL-IO5180");

  runSpecialtyCase("KL IO 4490", "KL IO 4490", "natural_gas_compressor_iso260", { resolveOnly: true });
  pass("KL IO 4490");

  runSpecialtyCase("KLIO7280", "KLIO7280", "way_oil_iso68", { expectedPdsKey: null, resolveOnly: true });
  pass("KLIO7280");

  runSpecialtyCase("KL-IO7880", "KL-IO7880", "soluble_cutting_oil", { resolveOnly: true });
  pass("KL-IO7880");

  runSpecialtyCase("KL-IO3280", "KL-IO3280", "rock_drill_iso220", { resolveOnly: true });
  pass("KL-IO3280");

  runSpecialtyCase("KL-IO9790", "KL-IO9790", "enhanced_form_release_oil", { resolveOnly: true });
  pass("KL-IO9790");

  runSpecialtyCase("KL-IO9895", "KL-IO9895", "light_form_oil", { resolveOnly: true });
  pass("KL-IO9895");

  runSpecialtyCase("KL-IO9990", "KL-IO9990", "form_release_dust_suppressant_oil", { resolveOnly: true });
  pass("KL-IO9990");

  runSpecialtyCase("KL-IO9580", "KL-IO9580", "multi_use_industrial_cattle_oil", { resolveOnly: true });
  pass("KL-IO9580");

  runSpecialtyCase("KL-IO5880", "KL-IO5880", "non_detergent_30_lubricating_oil", { resolveOnly: true });
  pass("KL-IO5880");

  runSpecialtyCase(
    "Bar and Chain Commercial",
    "What is KLONDIKE Bar and Chain Commercial Oil?",
    "bar_chain_commercial_oil",
    { expectedPdsKey: "Bar & Chain Commercial" }
  );
  pass("What is KLONDIKE Bar and Chain Commercial Oil?");

  runSpecialtyCase(
    "Clear bar chain harvesting",
    "clear bar and chain oil for harvesting heads",
    "clear_bar_chain_oil",
    { expectedPdsKey: "Clear Bar & Chain" }
  );
  pass("clear bar and chain oil for harvesting heads");

  runSpecialtyCase(
    "Winter hi-tack ISO 90",
    "winter hi-tack bar chain oil ISO 90",
    "hi_tack_bar_chain_iso90_winter",
    { expectedPdsKey: "Hi-Tack Bar & Chain", forbiddenLogicalIds: ["hi_tack_bar_chain_iso150_all_season", "hi_tack_bar_chain_iso220_summer"] }
  );
  pass("winter hi-tack bar chain oil ISO 90");

  runSpecialtyCase(
    "All season hi-tack ISO 150",
    "all season hi tack bar chain ISO 150",
    "hi_tack_bar_chain_iso150_all_season",
    { expectedPdsKey: "Hi-Tack Bar & Chain", forbiddenLogicalIds: ["hi_tack_bar_chain_iso90_winter", "hi_tack_bar_chain_iso220_summer"] }
  );
  pass("all season hi tack bar chain ISO 150");

  runSpecialtyCase(
    "Summer hi-tack ISO 220",
    "summer hi-tack bar chain ISO 220",
    "hi_tack_bar_chain_iso220_summer",
    { expectedPdsKey: "Hi-Tack Bar & Chain", forbiddenLogicalIds: ["hi_tack_bar_chain_iso90_winter", "hi_tack_bar_chain_iso150_all_season"] }
  );
  pass("summer hi-tack bar chain ISO 220");

  runSpecialtyCase(
    "Tacky saw guide ISO 100",
    "tacky saw guide oil ISO 100 for gang saw",
    "tacky_saw_guide_iso100",
    { expectedPdsKey: "Tacky Saw Guide Oil", forbiddenLogicalIds: ["tacky_saw_guide_iso150"] }
  );
  pass("tacky saw guide oil ISO 100 for gang saw");

  runSpecialtyCase(
    "Saw guide ISO 150",
    "saw guide oil ISO 150 for edger blades",
    "tacky_saw_guide_iso150",
    { expectedPdsKey: "Tacky Saw Guide Oil", forbiddenLogicalIds: ["tacky_saw_guide_iso100"] }
  );
  pass("saw guide oil ISO 150 for edger blades");

  runSpecialtyCase(
    "Rotary screw ISO 46 compressor",
    "rotary screw air compressor ISO 46 synthetic compressor oil",
    "full_synthetic_compressor_iso46",
    { expectedPdsKey: "ISO 46 Synthetic Compressor", forbiddenLogicalIds: ["natural_gas_compressor_iso260"] }
  );
  pass("rotary screw air compressor ISO 46 synthetic compressor oil");

  runSpecialtyCase(
    "Natural gas wet gas compressor",
    "natural gas compressor oil for wet gas compressor",
    "natural_gas_compressor_iso260",
    { expectedPdsKey: "Natural Gas Compressor", forbiddenLogicalIds: ["full_synthetic_compressor_iso46"] }
  );
  pass("natural gas compressor oil for wet gas compressor");

  runSpecialtyCase(
    "PAG incompatibility caution",
    "Can I use KLONDIKE ISO 46 synthetic compressor oil with PAG fluid?",
    "full_synthetic_compressor_iso46",
    {
      requiredInResponse: [/pag|silicone/i],
    }
  );
  pass("Can I use KLONDIKE ISO 46 synthetic compressor oil with PAG fluid?");

  runSpecialtyCase(
    "Oxygen compressor caution",
    "ISO 46 compressor oil for oxygen compressor",
    "full_synthetic_compressor_iso46",
    {
      requiredInResponse: [/chemically active|oxygen|chlorine|hydrogen chloride/i],
    }
  );
  pass("ISO 46 compressor oil for oxygen compressor");

  runSpecialtyCase("Way oil ISO 68", "way oil ISO 68 for machine tool slideways and stick slip", "way_oil_iso68", {
    expectedPdsKey: null,
  });
  pass("way oil ISO 68 for machine tool slideways and stick slip");

  runSpecialtyCase(
    "Soluble cutting oil",
    "soluble cutting oil for milling and grinding mixed with water",
    "soluble_cutting_oil"
  );
  pass("soluble cutting oil for milling and grinding mixed with water");

  runSpecialtyCase("Rock drill ISO 32", "rock drill oil ISO 32 for jackhammer", "rock_drill_iso32", {
    expectedPdsKey: "Rock Drill Oil",
    forbiddenLogicalIds: ["rock_drill_iso220"],
  });
  pass("rock drill oil ISO 32 for jackhammer");

  runSpecialtyCase("Rock drill ISO 220 pneumatic", "rock drill oil ISO 220 for pneumatic drill", "rock_drill_iso220", {
    expectedPdsKey: "Rock Drill Oil",
    forbiddenLogicalIds: ["rock_drill_iso32"],
  });
  pass("rock drill oil ISO 220 for pneumatic drill");

  const rockDrillAmbiguousQuery = "rock drill oil for jackhammer";
  const rockResolved = resolveKlondikeProductEntity(rockDrillAmbiguousQuery);
  assertResolverResult(rockResolved, { allowAmbiguous: true });
  const rockTop = norm(rockResolved.entityId);
  assert(
    rockTop.startsWith("industrial-specialty-canonical-rock-drill-") || rockResolved.confidence === "ambiguous",
    `rock drill jackhammer: top must be rock drill family or ambiguous, got entityId="${rockResolved.entityId}" confidence=${rockResolved.confidence}`
  );
  const rockLikely = getLikelyMatchIds(rockResolved);
  const rockDetected = detectKlondikeProductEntity(rockDrillAmbiguousQuery)
    .filter((h) => h.id.startsWith("industrial-specialty-canonical-rock-drill-"))
    .map((h) => h.id);
  const rockHits = new Set([...rockLikely, ...rockDetected, rockResolved.entityId || ""].filter(Boolean));
  assert(
    rockHits.size >= 2,
    `rock drill jackhammer: expected multiple rock drill ISO grades in likely/top/detect, got ${[...rockHits].join(",")}`
  );
  assert(
    [...rockHits].some((id) => id.startsWith("industrial-specialty-canonical-rock-drill-")),
    `rock drill jackhammer: expected industrial specialty rock drill ids in hits, got ${[...rockHits].join(",")}`
  );
  pass("rock drill oil for jackhammer");

  runSpecialtyCase(
    "Enhanced form release",
    "enhanced form release oil for precast concrete forms",
    "enhanced_form_release_oil"
  );
  pass("enhanced form release oil for precast concrete forms");

  runSpecialtyCase(
    "Form release dust suppressant",
    "form release and dust suppressant oil for gravel roads",
    "form_release_dust_suppressant_oil",
    { forbiddenLogicalIds: ["light_form_oil", "enhanced_form_release_oil"] }
  );
  pass("form release and dust suppressant oil for gravel roads");

  runSpecialtyCase("Light form oil", "light form oil", "light_form_oil", {
    forbiddenLogicalIds: ["form_release_dust_suppressant_oil"],
    allowAmbiguous: true,
    resolveOnly: true,
  });
  pass("light form oil");

  runSpecialtyCase(
    "Cattle oil",
    "cattle oil for cattle oiler and riding arena dust",
    "multi_use_industrial_cattle_oil"
  );
  pass("cattle oil for cattle oiler and riding arena dust");

  runSpecialtyCase(
    "Non-detergent 30 compressor",
    "non-detergent 30 oil for air compressor",
    "non_detergent_30_lubricating_oil",
    { allowAmbiguous: true }
  );
  pass("non-detergent 30 oil for air compressor");

  runSpecialtyCase(
    "Non-detergent 30 gasoline caution",
    "Can I use Non-Detergent 30 in a gasoline engine?",
    "non_detergent_30_lubricating_oil",
    {
      requiredInResponse: [/not for use in automotive gasoline|automotive gasoline engines/i],
    }
  );
  pass("Can I use Non-Detergent 30 in a gasoline engine?");

  assertGuardStaysInFamily("80W-90 GL-5 gear oil for differential", "80W-90 GL-5 differential", [
    "gear-oil-canonical-",
    "gear oil canonical",
  ]);
  pass("80W-90 GL-5 gear oil for differential");

  assertGuardStaysInFamily("industrial EP gear oil ISO 220", "industrial EP gear ISO 220", [
    "gear-oil-canonical-",
    "gear oil canonical",
  ]);
  pass("industrial EP gear oil ISO 220");

  assertGuardStaysInFamily("open gear grease", "open gear grease", ["grease-canonical-", "grease canonical"]);
  pass("open gear grease");

  assertGuardStaysInFamily("open gear lubricant", "open gear lubricant", [
    "open gear lubricant",
    "grease-canonical-",
    "grease canonical",
  ]);
  pass("open gear lubricant");

  assertNotIndustrialSpecialtyCanonical("TC-W3 2-cycle oil", "TC-W3 2-cycle oil");
  pass("TC-W3 2-cycle oil");

  assertGuardStaysInFamily("AW 46 hydraulic oil", "AW 46 hydraulic oil", [
    "hydr-canonical-",
    "hydraulic canonical",
  ]);
  pass("AW 46 hydraulic oil");

  assertGuardStaysInFamily("Dexron VI ATF", "Dexron VI ATF", ["tx-canonical-", "transmission canonical"]);
  pass("Dexron VI ATF");

  assertGuardStaysInFamily("15W-40 diesel engine oil", "15W-40 diesel engine oil", [
    "hd-canonical-",
    "hd engine oil canonical",
  ]);
  pass("15W-40 diesel engine oil");

  runSpecialtyCase(
    "Non-detergent hydraulic exception",
    "non-detergent oil for hydraulic system",
    "non_detergent_30_lubricating_oil"
  );
  pass("non-detergent oil for hydraulic system");

  skip(
    "What industrial specialty oils does Klondike carry? (catalog routing covered by runAdvisorRoutingPrecedenceSmokeTests.js)"
  );

  console.log("=".repeat(56));
  console.log(`Industrial specialty oil canonical smoke tests: ${passed}/${runnable} PASS\n`);
  if (passed !== runnable) {
    throw new Error(`expected all runnable tests to pass (${passed}/${runnable})`);
  }
} catch (e) {
  console.log(`FAIL  ${e instanceof Error ? e.message : e}`);
  console.log("=".repeat(56));
  console.log(`Industrial specialty oil canonical smoke tests: ${passed}/${runnable} PASS (with failures)\n`);
  process.exitCode = 1;
}
