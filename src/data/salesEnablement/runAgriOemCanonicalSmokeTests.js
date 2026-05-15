/**
 * Smoke tests for AGRIMAX / Ag OEM canonical product intelligence and entity resolution.
 * Run: node src/data/salesEnablement/runAgriOemCanonicalSmokeTests.js
 */

import {
  buildProductEntityAdvisorResponse,
  detectKlondikeProductEntity,
  resolveKlondikeProductEntity,
} from "../../utils/klondikeProductEntityResolver.js";
import {
  getAgriOemCanonicalProductIntelligenceById,
  listAgriOemCanonicalProductIntelligence,
} from "../agriOemCanonicalProductIntelligence.js";

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
 * Logical id suffix => full agri-oem-canonical id.
 * @param {string} logicalId
 */
function agriCanonicalId(logicalId) {
  return `agri-oem-canonical-${String(logicalId).replace(/_/g, "-")}`;
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
function haystackMatchesAgriLogicalId(haystack, logicalId) {
  const fullId = agriCanonicalId(logicalId);
  const product = getAgriOemCanonicalProductIntelligenceById(fullId);
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
  const fullId = agriCanonicalId(logicalId);
  const haystack = resolvedTextBundle(resolved);
  const topOk = norm(resolved.entityId) === norm(fullId) || haystackMatchesAgriLogicalId(haystack, logicalId);
  const likelyOk = getLikelyMatchIds(resolved).some((id) => norm(id) === norm(fullId));
  assert(
    topOk || likelyOk,
    `${label}: expected Ag OEM id "${logicalId}" (${fullId}). Got entityId="${resolved.entityId}" pdsKey="${resolved.pdsKey}" label="${resolved.label}" likely=${getLikelyMatchIds(resolved).join(",")}`
  );
}

/**
 * @param {string} query
 * @param {string} label
 */
function assertNotAgriOemCanonical(query, label) {
  const resolved = resolveKlondikeProductEntity(query);
  const resolveHaystack = resolvedTextBundle(resolved);
  assert(
    !norm(resolved.entityId).startsWith("agri-oem-canonical-"),
    `${label}: entityId must not be Ag OEM canonical, got "${resolved.entityId}"`
  );
  assert(
    !getLikelyMatchIds(resolved).some((id) => id.startsWith("agri-oem-canonical-")),
    `${label}: likelyMatches must not include Ag OEM canonical ids`
  );

  const response = buildProductEntityAdvisorResponse(query);
  const responseHaystack = responseTextBundle(response);
  assert(
    !containsPhrase((response.sourceBadges || []).join(" "), "ag oem canonical"),
    `${label}: advisor source badges must not include Ag OEM canonical intelligence`
  );
  assert(
    !containsPhrase(responseHaystack, "ag oem canonical product intelligence"),
    `${label}: advisor response must not indicate Ag OEM canonical intelligence`
  );
  assert(
    !containsPhrase(resolveHaystack, "ag oem canonical"),
    `${label}: resolve output must not indicate Ag OEM canonical routing`
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
    const fullId = agriCanonicalId(logicalId);
    const inLikely = likelyIds.includes(fullId);
    const inDetected = detected.includes(fullId);
    const inHaystack = haystackMatchesAgriLogicalId(haystack, logicalId);
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
function assertAgriOemCanonicalWins(query, label) {
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: true });
  const detected = detectKlondikeProductEntity(query).map((h) => h.id);
  const likelyIds = getLikelyMatchIds(resolved);
  const haystack = resolvedTextBundle(resolved);
  const agriSignal =
    norm(resolved.entityId).startsWith("agri-oem-canonical-") ||
    likelyIds.some((id) => id.startsWith("agri-oem-canonical-")) ||
    detected.some((id) => id.startsWith("agri-oem-canonical-")) ||
    containsPhrase(haystack, "agri-oem-canonical-");
  assert(
    agriSignal,
    `${label}: expected Ag OEM canonical to win. entityId="${resolved.entityId}" likely=${likelyIds.join(",")} detected=${detected.join(",")}`
  );
}

/**
 * @param {string} query
 * @param {string} label
 * @param {string | RegExp | Array<string | RegExp>} familyNeedle
 */
function assertGuardStaysInFamily(query, label, familyNeedle) {
  assertNotAgriOemCanonical(query, label);
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

const REQUIRED_LOGICAL_IDS = [
  "agrimax_john_deere_elc_premix_green",
  "agrimax_cnh_case_ih_elc_premix_red",
  "agrimax_john_deere_15w40_ck4_synthetic_blend_green",
  "agrimax_cnh_case_ih_15w40_ck4_synthetic_blend_red",
  "agrimax_john_deere_trans_drive_hydraulic_green",
  "agrimax_cnh_case_ih_zinc_free_trans_drive_hydraulic_red",
  "agrimax_poly_tac_ep2_polyurea_grease",
];

const REQUIRED_PDS_MAP_KEYS = [
  "Extended Life Coolant 50/50 JD",
  "Extended Life Coolant 50/50 CNH",
  "15W-40 CK-4 Synthetic Blend JD",
  "15W-40 CK-4 Synthetic Blend CNH",
  "Trans Drive Hydraulic JD",
  "Trans Drive Hydraulic ZF",
  "Poly Tac EP-2 Grease",
];

const GREEN_COOLANT = "agrimax_john_deere_elc_premix_green";
const RED_COOLANT = "agrimax_cnh_case_ih_elc_premix_red";
const GREEN_HD = "agrimax_john_deere_15w40_ck4_synthetic_blend_green";
const RED_HD = "agrimax_cnh_case_ih_15w40_ck4_synthetic_blend_red";
const GREEN_TRANS = "agrimax_john_deere_trans_drive_hydraulic_green";
const RED_TRANS = "agrimax_cnh_case_ih_zinc_free_trans_drive_hydraulic_red";
const POLY_TAC = "agrimax_poly_tac_ep2_polyurea_grease";

/**
 * @param {string} label
 * @param {string} query
 * @param {string} logicalId
 * @param {{
 *   expectedPdsKey?: string | null,
 *   allowAmbiguous?: boolean,
 *   likelyAlso?: string[],
 *   resolveOnly?: boolean,
 *   requireAgriBadge?: boolean,
 *   requiredInCombined?: RegExp[],
 *   forbiddenInCombined?: RegExp[],
 * }} [opts]
 */
function runAgriCase(label, query, logicalId, opts = {}) {
  assertDetectedId(query, logicalId, label, { allowAmbiguous: opts.allowAmbiguous });
  const resolved = resolveKlondikeProductEntity(query);
  assertResolverResult(resolved, { allowAmbiguous: opts.allowAmbiguous });
  const product = getAgriOemCanonicalProductIntelligenceById(agriCanonicalId(logicalId));

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

  if (opts.requireAgriBadge !== false) {
    const hasBadge =
      containsPhrase((response.sourceBadges || []).join(" "), "ag oem canonical") ||
      norm(resolved.entityId).startsWith("agri-oem-canonical-");
    assert(hasBadge, `${label}: expected Ag OEM canonical source badge or routing`);
  }

  if (response.ok === true) {
    assert(
      haystackMatchesAgriLogicalId(combinedHaystack, logicalId),
      `${label}: expected Ag OEM product in advisor/resolve output for "${logicalId}"`
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
 * @param {RegExp} disclaimerPattern
 * @param {string} label
 */
function assertDataHasDisclaimer(logicalId, disclaimerPattern, label) {
  const product = getAgriOemCanonicalProductIntelligenceById(agriCanonicalId(logicalId));
  assert(product, `${label}: missing canonical row`);
  const dataText = [
    ...(product.cautions || []),
    ...(product.sourceNotes || []),
    product.salesPositioning,
  ].join(" ");
  assert(
    disclaimerPattern.test(dataText),
    `${label}: expected disclaimer in canonical cautions/sourceNotes for "${logicalId}"`
  );
}

function runDataShapeTests() {
  const products = listAgriOemCanonicalProductIntelligence();
  assert(products.length === 7, `expected 7 Ag OEM records, got ${products.length}`);

  for (const logicalId of REQUIRED_LOGICAL_IDS) {
    const fullId = agriCanonicalId(logicalId);
    const row = getAgriOemCanonicalProductIntelligenceById(fullId);
    assert(row, `missing canonical id: ${logicalId} (${fullId})`);
  }

  for (const key of REQUIRED_PDS_MAP_KEYS) {
    const count = products.filter((p) => p.pdsMapKey === key).length;
    assert(count === 1, `expected exactly one record with pdsMapKey "${key}", got ${count}`);
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
  assert(hasNonEmpty((p) => p.oemConquestSignals), "expected non-empty oemConquestSignals on at least one record");
  assert(hasNonEmpty((p) => p.accountSegmentationSignals), "expected non-empty accountSegmentationSignals on at least one record");

  const polyTac = getAgriOemCanonicalProductIntelligenceById(agriCanonicalId(POLY_TAC));
  assert(polyTac, "poly tac record required");
  assert(norm(polyTac.thickenerType) === "polyurea", "Poly Tac thickenerType must be Polyurea");
  const polyFormulation = norm(polyTac.formulation || "");
  assert(
    !/\blithium\b/.test(polyFormulation) && !/\bmoly\b/.test(polyFormulation),
    "Poly Tac formulation must not identify as lithium or moly grease"
  );
  assert(
    containsPhrase((polyTac.cautions || []).join(" "), "polyurea"),
    "Poly Tac cautions should reference polyurea identity"
  );

  assertDataHasDisclaimer(GREEN_COOLANT, /not affiliated.*deere|not endorsed.*deere/i, "John Deere ELC data disclaimer");
  assertDataHasDisclaimer(RED_TRANS, /not affiliated.*cnh|not endorsed.*cnh/i, "CNH trans drive data disclaimer");
}

console.log("\nAg OEM / AGRIMAX canonical resolver smoke tests\n" + "=".repeat(56));

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
  pass("canonical data shape (7 products, ids, pdsMapKeys, fields, Poly Tac, disclaimers)");

  runAgriCase("KL-AG9650", "KL-AG9650", GREEN_COOLANT, { resolveOnly: true });
  pass("KL-AG9650");

  runAgriCase("KL AG 9850", "KL AG 9850", RED_COOLANT, { resolveOnly: true });
  pass("KL AG 9850");

  runAgriCase("KLAG1580", "KLAG1580", GREEN_HD, { resolveOnly: true });
  pass("KLAG1580");

  runAgriCase("KL-AG1680", "KL-AG1680", RED_HD, { resolveOnly: true });
  pass("KL-AG1680");

  runAgriCase("KL-AG8080", "KL-AG8080", GREEN_TRANS, { resolveOnly: true });
  pass("KL-AG8080");

  runAgriCase("KL-AG8480", "KL-AG8480", RED_TRANS, { resolveOnly: true });
  pass("KL-AG8480");

  runAgriCase("KL-GR5830", "KL-GR5830", POLY_TAC, { resolveOnly: true });
  pass("KL-GR5830");

  runAgriCase(
    "AGRIMAX coolant John Deere COOL GARD II",
    "AGRIMAX coolant for John Deere COOL GARD II",
    GREEN_COOLANT
  );
  pass("AGRIMAX coolant for John Deere COOL GARD II");

  runAgriCase("Deere COOL GARD II ELC", "Deere COOL GARD II extended life coolant", GREEN_COOLANT);
  pass("Deere COOL GARD II extended life coolant");

  runAgriCase("AGRIMAX 15W-40 PLUS 50 II", "AGRIMAX 15W-40 for John Deere PLUS 50 II", GREEN_HD);
  pass("AGRIMAX 15W-40 for John Deere PLUS 50 II");

  runAgriCase("John Deere JDM J20C trans drive", "John Deere JDM J20C trans drive hydraulic fluid", GREEN_TRANS);
  pass("John Deere JDM J20C trans drive hydraulic fluid");

  runAgriCase("AGRIMAX coolant CNH MAT 3724", "AGRIMAX coolant for CNH MAT 3724", RED_COOLANT);
  pass("AGRIMAX coolant for CNH MAT 3724");

  runAgriCase("Case IH coolant MAT 3624", "Case IH coolant MAT 3624", RED_COOLANT);
  pass("Case IH coolant MAT 3624");

  runAgriCase("CNH MAT 3572 15W-40 CK-4", "CNH MAT 3572 15W-40 CK-4", RED_HD);
  pass("CNH MAT 3572 15W-40 CK-4");

  runAgriCase("CNH MAT 3544 zinc free trans drive", "CNH MAT 3544 zinc free trans drive", RED_TRANS, {
    allowAmbiguous: true,
  });
  pass("CNH MAT 3544 zinc free trans drive");

  runAgriCase("Case IH MAT 3540 hydraulic transmission", "Case IH MAT 3540 hydraulic transmission fluid", RED_TRANS, {
    allowAmbiguous: true,
  });
  pass("Case IH MAT 3540 hydraulic transmission fluid");

  runAgriCase("AGRIMAX Poly Tac EP-2", "AGRIMAX Poly Tac EP-2 polyurea grease", POLY_TAC, {
    requiredInCombined: [/polyurea/i],
  });
  pass("AGRIMAX Poly Tac EP-2 polyurea grease");

  runAgriCase("green ag polyurea GC-LB", "green ag polyurea grease GC-LB", POLY_TAC, {
    requiredInCombined: [/polyurea/i],
  });
  pass("green ag polyurea grease GC-LB");

  runAgriCase("Is Poly Tac lithium or moly?", "Is Poly Tac lithium or moly?", POLY_TAC, {
    requiredInCombined: [/polyurea/i],
    forbiddenInCombined: [
      /\bis\s+(a\s+)?lithium(\s+complex)?\s+grease\b/i,
      /\bis\s+(a\s+)?moly(\s+ep)?\s+grease\b/i,
      /\bthickener\s+is\s+lithium\b/i,
      /\bthickener\s+is\s+moly\b/i,
    ],
  });
  pass("Is Poly Tac lithium or moly?");

  assertAgriOemCanonicalWins("AGRIMAX coolant", "AGRIMAX coolant ambiguous");
  assertLikelyIncludes("AGRIMAX coolant", [GREEN_COOLANT, RED_COOLANT], "AGRIMAX coolant both colors");
  pass("AGRIMAX coolant");

  assertAgriOemCanonicalWins("AGRIMAX 15W-40", "AGRIMAX 15W-40 ambiguous");
  assertLikelyIncludes("AGRIMAX 15W-40", [GREEN_HD, RED_HD], "AGRIMAX 15W-40 both colors");
  pass("AGRIMAX 15W-40");

  assertAgriOemCanonicalWins("AGRIMAX Trans Drive", "AGRIMAX Trans Drive ambiguous");
  assertLikelyIncludes("AGRIMAX Trans Drive", [GREEN_TRANS, RED_TRANS], "AGRIMAX Trans Drive both OEM rows");
  pass("AGRIMAX Trans Drive");

  assertGuardStaysInFamily("15W-40 CK-4 engine oil", "15W-40 CK-4 engine oil guard", ["hd-canonical-", "hd engine oil canonical"]);
  pass("15W-40 CK-4 engine oil");

  assertGuardStaysInFamily("extended life coolant", "extended life coolant guard", [
    "coolant-canonical-",
    "coolant canonical",
  ]);
  pass("extended life coolant");

  assertGuardStaysInFamily("wet brake hydraulic fluid", "wet brake hydraulic fluid guard", [
    "hydr-canonical-",
    "hydraulic canonical",
    "tx-canonical-",
    "transmission canonical",
  ]);
  pass("wet brake hydraulic fluid");

  assertNotAgriOemCanonical("polyurea grease", "polyurea grease guard");
  pass("polyurea grease");

  assertGuardStaysInFamily("GL-5 differential gear oil", "GL-5 differential guard", [
    "gear-oil-canonical-",
    "gear oil canonical",
  ]);
  pass("GL-5 differential gear oil");

  assertGuardStaysInFamily("bar and chain oil", "bar and chain oil guard", [
    "industrial-specialty-canonical-",
    "industrial specialty oil canonical",
    "bar",
    "chain",
  ]);
  pass("bar and chain oil");

  assertGuardStaysInFamily("Dexron VI ATF", "Dexron VI ATF guard", ["tx-canonical-", "transmission canonical"]);
  pass("Dexron VI ATF");

  runAgriCase("AGRIMAX John Deere coolant disclaimer", "AGRIMAX John Deere coolant", GREEN_COOLANT);
  {
    const resolved = resolveKlondikeProductEntity("AGRIMAX John Deere coolant");
    const response = buildProductEntityAdvisorResponse("AGRIMAX John Deere coolant");
    const combined = `${resolvedTextBundle(resolved)} ${responseTextBundle(response)}`;
    const surfaced =
      /not affiliated|not endorsed/i.test(combined) && /deere/i.test(combined);
    assert(
      surfaced || /not affiliated.*deere|not endorsed.*deere/i.test(
        [
          ...(getAgriOemCanonicalProductIntelligenceById(agriCanonicalId(GREEN_COOLANT))?.cautions || []),
          ...(getAgriOemCanonicalProductIntelligenceById(agriCanonicalId(GREEN_COOLANT))?.sourceNotes || []),
        ].join(" ")
      ),
      "AGRIMAX John Deere coolant: expected Deere non-affiliation in advisor output or canonical cautions"
    );
  }
  pass("AGRIMAX John Deere coolant");

  {
    const query = "AGRIMAX CNH trans drive";
    assertDetectedId(query, RED_TRANS, "AGRIMAX CNH trans drive", { allowAmbiguous: true });
    const resolved = resolveKlondikeProductEntity(query);
    const response = buildProductEntityAdvisorResponse(query);
    const combined = `${resolvedTextBundle(resolved)} ${responseTextBundle(response)}`;
    const surfaced =
      /not affiliated|not endorsed/i.test(combined) && /cnh/i.test(combined);
    assert(
      surfaced || /not affiliated.*cnh|not endorsed.*cnh/i.test(
        [
          ...(getAgriOemCanonicalProductIntelligenceById(agriCanonicalId(RED_TRANS))?.cautions || []),
          ...(getAgriOemCanonicalProductIntelligenceById(agriCanonicalId(RED_TRANS))?.sourceNotes || []),
        ].join(" ")
      ),
      "AGRIMAX CNH trans drive: expected CNH non-affiliation in advisor output or canonical cautions"
    );
  }
  pass("AGRIMAX CNH trans drive");

  skip(
    "What AGRIMAX products does Klondike carry? (catalog routing covered by runAdvisorRoutingPrecedenceSmokeTests.js)"
  );

  console.log("=".repeat(56));
  console.log(`Ag OEM canonical smoke tests: ${passed}/${runnable} PASS\n`);
  if (passed !== runnable) {
    throw new Error(`expected all runnable tests to pass (${passed}/${runnable})`);
  }
} catch (e) {
  console.log(`FAIL  ${e instanceof Error ? e.message : e}`);
  console.log("=".repeat(56));
  console.log(`Ag OEM canonical smoke tests: ${passed}/${runnable} PASS (with failures)\n`);
  process.exitCode = 1;
}
