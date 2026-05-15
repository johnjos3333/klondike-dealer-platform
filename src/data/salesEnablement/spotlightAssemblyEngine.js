/**
 * Deterministic Sales Enablement Spotlight Assembly Engine.
 * Assembles field-ready packages from canonical product intelligence only — no invented specs or claims.
 * Not wired to UI; no network/AI dependencies.
 */

import { listAgriOemCanonicalProductIntelligence } from "../agriOemCanonicalProductIntelligence.js";
import { listComplianceSpecialtyCanonicalProductIntelligence } from "../complianceSpecialtyCanonicalProductIntelligence.js";
import { listIndustrialSpecialtyOilCanonicalProductIntelligence } from "../industrialSpecialtyOilCanonicalProductIntelligence.js";
import { listGearOilCanonicalProductIntelligence } from "../gearOilCanonicalProductIntelligence.js";
import { listCoolantCanonicalProductIntelligence } from "../coolantCanonicalProductIntelligence.js";
import { listTransmissionCanonicalProductIntelligence } from "../transmissionCanonicalProductIntelligence.js";
import { listHydraulicCanonicalProductIntelligence } from "../hydraulicCanonicalProductIntelligence.js";
import { listGreaseCanonicalProductIntelligence } from "../greaseCanonicalProductIntelligence.js";
import { listHdEngineOilCanonicalProductIntelligence } from "../heavyDutyEngineOilCanonicalIntelligence.js";

/** @type {number} */
export const SPOTLIGHT_ASSEMBLY_ENGINE_VERSION = 1;

/** @type {Readonly<string[]>} */
export const SPOTLIGHT_ACTION_TYPES = Object.freeze([
  "send_product_spotlight",
  "send_category_spotlight",
  "generate_customer_profile",
  "schedule_field_ride",
  "schedule_in_person_training",
  "assign_klondike_university_course",
  "coach_rep",
  "review_product_mix",
]);

/** @type {Readonly<string[]>} */
export const SPOTLIGHT_AUDIENCES = Object.freeze([
  "kl_admin",
  "dealer_admin",
  "manager",
  "rep",
  "customer",
]);

/** @type {Readonly<string[]>} */
export const SPOTLIGHT_PACKAGE_TYPES = Object.freeze([
  "product_spotlight",
  "category_spotlight",
  "customer_profile",
  "rep_coaching",
  "training_recommendation",
  "field_ride_recommendation",
]);

/** @type {Readonly<Record<string, { list: () => readonly unknown[], label: string }>>} */
const CANONICAL_FAMILY_REGISTRY = Object.freeze({
  agri_oem: Object.freeze({
    list: listAgriOemCanonicalProductIntelligence,
    label: "Ag OEM canonical product intelligence",
  }),
  compliance_specialty: Object.freeze({
    list: listComplianceSpecialtyCanonicalProductIntelligence,
    label: "Compliance specialty canonical product intelligence",
  }),
  industrial_specialty_oil: Object.freeze({
    list: listIndustrialSpecialtyOilCanonicalProductIntelligence,
    label: "Industrial specialty oil canonical product intelligence",
  }),
  gear_oil: Object.freeze({
    list: listGearOilCanonicalProductIntelligence,
    label: "Gear oil canonical product intelligence",
  }),
  coolant: Object.freeze({
    list: listCoolantCanonicalProductIntelligence,
    label: "Coolant canonical product intelligence",
  }),
  transmission: Object.freeze({
    list: listTransmissionCanonicalProductIntelligence,
    label: "Transmission canonical product intelligence",
  }),
  hydraulic: Object.freeze({
    list: listHydraulicCanonicalProductIntelligence,
    label: "Hydraulic canonical product intelligence",
  }),
  grease: Object.freeze({
    list: listGreaseCanonicalProductIntelligence,
    label: "Grease canonical product intelligence",
  }),
  hd_engine_oil: Object.freeze({
    list: listHdEngineOilCanonicalProductIntelligence,
    label: "HD engine oil canonical product intelligence",
  }),
});

const DEFAULT_GUARDRAILS = Object.freeze([
  "Assemble only from indexed canonical intelligence — confirm live PDS title block before customer-facing claims.",
  "Do not invent specifications, approvals, registrations, or applications.",
  "Use likely / potential / recommended to ask when inferring customer fit.",
  "Preserve product cautions and not-best-fit notes from canonical records.",
]);

/**
 * @typedef {import("../agriOemCanonicalProductIntelligence.js").AgriOemCanonicalProductIntelligence} AgriRow
 * @typedef {import("../complianceSpecialtyCanonicalProductIntelligence.js").ComplianceSpecialtyCanonicalProductIntelligence} ComplianceRow
 * @typedef {import("../greaseCanonicalProductIntelligence.js").GreaseCanonicalProductIntelligence} GreaseRow
 * @typedef {import("../hydraulicCanonicalProductIntelligence.js").HydraulicCanonicalProductIntelligence} HydrRow
 */

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   productFamily: string,
 *   category: string,
 *   pdsMapKey: string,
 *   canonicalFamily: string,
 *   aliases: string[],
 *   routingKeywords: string[],
 *   applications: string[],
 *   specifications: string[],
 *   approvals: string[],
 *   registrations: string[],
 *   differentiators: string[],
 *   cautions: string[],
 *   bestFit: string[],
 *   notBestFit: string[],
 *   customerProfileSignals: string[],
 *   customerProfileQuestions: string[],
 *   salesEnablementAngles: string[],
 *   productSpotlightAngles: string[],
 *   categorySpotlightAngles: string[],
 *   crossSellSignals: string[],
 *   operationalPainPoints: string[],
 *   complianceTriggers: string[],
 *   environmentalRiskSignals: string[],
 *   oemAlignment: string,
 *   oemConquestSignals: string[],
 *   salesPositioning: string,
 *   sourceNotes: string[],
 *   repTalkTrack: string[],
 *   proofPoints: string[],
 *   isoGrade: string | null,
 *   saeGrade: string | null,
 *   nlgiGrade: string | null,
 *   formulation: string,
 *   thickenerType: string,
 *   foodGradeStatus: string,
 *   biodegradableStatus: string,
 *   raw: unknown,
 * }} NormalizedCanonicalProduct
 */

/**
 * @typedef {{
 *   packageType?: string,
 *   products?: unknown[],
 *   productIds?: string[],
 *   pdsMapKeys?: string[],
 *   category?: string,
 *   customerProfileSignals?: string[],
 *   accountContext?: Record<string, unknown>,
 *   performanceContext?: Record<string, unknown>,
 *   audience?: string,
 *   tone?: string,
 *   query?: string,
 * }} SpotlightAssemblyInput
 */

/**
 * @param {unknown} value
 */
function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function asArray(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value.map((v) => String(v ?? "").trim()).filter(Boolean);
  const s = String(value).trim();
  return s ? [s] : [];
}

/**
 * @param {string[]} items
 */
function uniqueCompact(items) {
  /** @type {string[]} */
  const out = [];
  /** @type {Set<string>} */
  const seen = new Set();
  for (const item of items) {
    const t = String(item ?? "").trim();
    if (!t) continue;
    const key = normalizeText(t);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
  }
  return out;
}

/**
 * @param {unknown} id
 */
function inferCanonicalFamily(id) {
  const s = String(id ?? "");
  if (s.startsWith("agri-oem-canonical-")) return "agri_oem";
  if (s.startsWith("compliance-specialty-canonical-")) return "compliance_specialty";
  if (s.startsWith("industrial-specialty-canonical-")) return "industrial_specialty_oil";
  if (s.startsWith("gear-oil-canonical-")) return "gear_oil";
  if (s.startsWith("coolant-canonical-")) return "coolant";
  if (s.startsWith("tx-canonical-")) return "transmission";
  if (s.startsWith("hydr-canonical-")) return "hydraulic";
  if (s.startsWith("grease-canonical-")) return "grease";
  if (s.startsWith("hd-canonical-")) return "hd_engine_oil";
  return "";
}

/**
 * @param {unknown} product
 * @param {string} canonicalFamily
 * @returns {NormalizedCanonicalProduct}
 */
function normalizeCanonicalRecord(product, canonicalFamily) {
  /** @type {Record<string, unknown>} */
  const p = product && typeof product === "object" ? /** @type {Record<string, unknown>} */ (product) : {};

  const productSpotlightAngles = uniqueCompact([
    ...asArray(p.productSpotlightAngles),
    ...asArray(p.productSpotlightAngle),
  ]);
  const categorySpotlightAngles = uniqueCompact([
    ...asArray(p.categorySpotlightAngles),
    ...asArray(p.categorySpotlightRole),
  ]);

  return {
    id: String(p.id ?? ""),
    productName: String(p.productName ?? ""),
    productFamily: String(
      p.productFamily ?? p.greaseFamily ?? p.hierarchyBranch ?? p.hierarchyPosition ?? ""
    ),
    category: String(p.category ?? ""),
    pdsMapKey: String(p.pdsMapKey ?? ""),
    canonicalFamily,
    aliases: asArray(p.aliases),
    routingKeywords: asArray(p.routingKeywords),
    applications: asArray(p.applications),
    specifications: asArray(p.specifications),
    approvals: asArray(p.approvals),
    registrations: asArray(p.registrations),
    differentiators: asArray(p.differentiators),
    cautions: uniqueCompact([...asArray(p.cautions), ...asArray(p.cautionNotes)]),
    bestFit: asArray(p.bestFit),
    notBestFit: asArray(p.notBestFit),
    customerProfileSignals: uniqueCompact([
      ...asArray(p.customerProfileSignals),
      ...asArray(p.customerProfileMatches),
      ...asArray(p.customerPainSignals),
    ]),
    customerProfileQuestions: asArray(p.customerProfileQuestions),
    salesEnablementAngles: asArray(p.salesEnablementAngles),
    productSpotlightAngles,
    categorySpotlightAngles,
    crossSellSignals: asArray(p.crossSellSignals),
    operationalPainPoints: uniqueCompact([
      ...asArray(p.operationalPainPoints),
      ...asArray(p.operationalPainSignals),
    ]),
    complianceTriggers: asArray(p.complianceTriggers),
    environmentalRiskSignals: asArray(p.environmentalRiskSignals),
    oemAlignment: String(p.oemAlignment ?? ""),
    oemConquestSignals: asArray(p.oemConquestSignals),
    salesPositioning: String(
      p.salesPositioning ?? p.whyItWins ?? p.whatItIs ?? p.productPositioning ?? ""
    ),
    sourceNotes: asArray(p.sourceNotes),
    repTalkTrack: asArray(p.repTalkTrack),
    proofPoints: uniqueCompact([
      ...asArray(p.pdsProofPoints),
      ...asArray(p.proofPoints),
      ...asArray(p.oemSpecPositioning),
    ]),
    isoGrade: p.isoGrade != null ? String(p.isoGrade) : null,
    saeGrade: p.saeGrade != null ? String(p.saeGrade) : null,
    nlgiGrade: p.nlgiGrade != null ? String(p.nlgiGrade) : null,
    formulation: String(p.formulation ?? ""),
    thickenerType: String(p.thickenerType ?? ""),
    foodGradeStatus: String(p.foodGradeStatus ?? ""),
    biodegradableStatus: String(p.biodegradableStatus ?? ""),
    raw: product,
  };
}

/** @type {NormalizedCanonicalProduct[] | null} */
let cachedCatalog = null;

/**
 * @returns {NormalizedCanonicalProduct[]}
 */
function getFullCatalog() {
  if (cachedCatalog) return cachedCatalog;
  /** @type {NormalizedCanonicalProduct[]} */
  const all = [];
  for (const [family, meta] of Object.entries(CANONICAL_FAMILY_REGISTRY)) {
    for (const row of meta.list()) {
      all.push(normalizeCanonicalRecord(row, family));
    }
  }
  cachedCatalog = all;
  return all;
}

/**
 * @param {NormalizedCanonicalProduct} product
 */
function buildProductCard(product) {
  const gradeBits = uniqueCompact([
    product.saeGrade ? `SAE ${product.saeGrade}` : "",
    product.isoGrade ? `ISO VG ${product.isoGrade}` : "",
    product.nlgiGrade ? `NLGI ${product.nlgiGrade}` : "",
  ]);
  return {
    id: product.id,
    productName: product.productName,
    productFamily: product.productFamily,
    category: product.category,
    pdsMapKey: product.pdsMapKey,
    canonicalFamily: product.canonicalFamily,
    headline: product.productSpotlightAngles[0] || product.salesPositioning || product.productName,
    gradeLabel: gradeBits.join(" · "),
    applications: product.applications.slice(0, 6),
    specsSummary: extractSpecsAndApprovals(product).slice(0, 6),
    cautions: product.cautions.slice(0, 4),
    crossSell: product.crossSellSignals.slice(0, 3),
  };
}

/**
 * @param {NormalizedCanonicalProduct} product
 */
function extractSpecsAndApprovals(product) {
  return uniqueCompact([
    ...product.specifications,
    ...product.approvals,
    ...product.registrations,
    ...product.proofPoints,
  ]);
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 */
function extractCustomerSignals(products) {
  return uniqueCompact(products.flatMap((p) => p.customerProfileSignals));
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 */
function extractRepQuestions(products) {
  return uniqueCompact([
    ...products.flatMap((p) => p.customerProfileQuestions),
    "What product number is on the drum or purchase order?",
    "What OEM spec string or fluid class does the equipment tag require?",
    "What duty cycle, temperature band, and drain or regrease interval apply?",
  ]);
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 */
function extractCrossSellSignals(products) {
  return uniqueCompact(products.flatMap((p) => p.crossSellSignals));
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 */
function extractPainPoints(products) {
  return uniqueCompact(products.flatMap((p) => [...p.operationalPainPoints, ...p.complianceTriggers]));
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 */
function extractSalesAngles(products) {
  return uniqueCompact([
    ...products.flatMap((p) => p.salesEnablementAngles),
    ...products.flatMap((p) => p.productSpotlightAngles),
    ...products.flatMap((p) => p.differentiators),
    ...products.map((p) => p.salesPositioning).filter(Boolean),
  ]);
}

/**
 * @param {string[]} signals
 * @param {NormalizedCanonicalProduct} product
 */
function scoreProductForSignals(signals, product) {
  if (!signals.length) return 0;
  const haystack = normalizeText(
    [
      product.productName,
      product.productFamily,
      product.category,
      product.pdsMapKey,
      product.oemAlignment,
      ...product.aliases,
      ...product.routingKeywords,
      ...product.customerProfileSignals,
      ...product.complianceTriggers,
      ...product.environmentalRiskSignals,
    ].join(" ")
  );
  let score = 0;
  for (const signal of signals) {
    const n = normalizeText(signal);
    if (!n || n.length < 3) continue;
    if (haystack.includes(n)) score += 12 + Math.min(8, n.length);
    for (const alias of product.aliases) {
      if (normalizeText(alias).includes(n) || n.includes(normalizeText(alias))) score += 6;
    }
  }
  return score;
}

/**
 * @param {SpotlightAssemblyInput} input
 * @returns {NormalizedCanonicalProduct[]}
 */
function resolveProductsFromInput(input) {
  const catalog = getFullCatalog();
  /** @type {Map<string, NormalizedCanonicalProduct>} */
  const byId = new Map(catalog.map((p) => [p.id, p]));
  /** @type {Map<string, NormalizedCanonicalProduct[]>} */
  const byPds = new Map();
  for (const p of catalog) {
    const key = normalizeText(p.pdsMapKey);
    if (!key) continue;
    if (!byPds.has(key)) byPds.set(key, []);
    byPds.get(key).push(p);
  }

  /** @type {NormalizedCanonicalProduct[]} */
  const resolved = [];
  /** @type {Set<string>} */
  const seen = new Set();

  /** @param {NormalizedCanonicalProduct} p */
  const add = (p) => {
    if (!p?.id || seen.has(p.id)) return;
    seen.add(p.id);
    resolved.push(p);
  };

  for (const raw of asArray(input?.products)) {
    if (raw && typeof raw === "object" && "id" in /** @type {object} */ (raw)) {
      const id = String(/** @type {{ id?: string }} */ (raw).id ?? "");
      const fam = inferCanonicalFamily(id) || String(/** @type {{ canonicalFamily?: string }} */ (raw).canonicalFamily ?? "");
      add(normalizeCanonicalRecord(raw, fam || "unknown"));
      continue;
    }
    const id = String(raw);
    if (byId.has(id)) add(byId.get(id));
  }

  for (const id of asArray(input?.productIds)) {
    if (byId.has(id)) add(byId.get(id));
  }

  for (const key of asArray(input?.pdsMapKeys)) {
    const matches = byPds.get(normalizeText(key)) || [];
    matches.forEach(add);
  }

  const category = normalizeText(input?.category);
  if (category) {
    for (const p of catalog) {
      if (normalizeText(p.category).includes(category) || normalizeText(p.productFamily).includes(category)) {
        add(p);
      }
    }
  }

  const profileSignals = uniqueCompact([
    ...asArray(input?.customerProfileSignals),
    ...asArray(/** @type {Record<string, unknown>} */ (input?.accountContext || {}).industries),
    ...asArray(/** @type {Record<string, unknown>} */ (input?.accountContext || {}).opportunitySignals),
    ...asArray(/** @type {Record<string, unknown>} */ (input?.accountContext || {}).performanceSignals),
  ]);

  if (profileSignals.length && resolved.length === 0) {
    const ranked = catalog
      .map((p) => ({ p, score: scoreProductForSignals(profileSignals, p) }))
      .filter((r) => r.score >= 14)
      .sort((a, b) => b.score - a.score);
    ranked.slice(0, 8).forEach(({ p }) => add(p));
  }

  if (resolved.length === 0 && input?.query) {
    findCanonicalProductsForEnablement(input.query)
      .slice(0, 8)
      .forEach((m) => {
        const p = byId.get(m.id);
        if (p) add(p);
      });
  }

  return resolved;
}

/**
 * @param {string} audience
 */
function normalizeAudience(audience) {
  const a = normalizeText(audience);
  return SPOTLIGHT_AUDIENCES.includes(a) ? a : "rep";
}

/**
 * @param {string} tone
 */
function toneLabel(tone) {
  const t = normalizeText(tone);
  if (t === "executive") return "Executive summary";
  if (t === "training") return "Training-ready";
  if (t === "coaching") return "Coaching brief";
  return "Field-ready";
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 * @param {SpotlightAssemblyInput} input
 */
function basePackageMeta(products, input) {
  const packageType = String(input?.packageType ?? "product_spotlight");
  const audience = normalizeAudience(input?.audience);
  const families = uniqueCompact(products.map((p) => p.canonicalFamily));
  return {
    packageType,
    audience,
    sourceProducts: products.map((p) => p.id),
    sourceCanonicalFamilies: families,
    sourceNotes: uniqueCompact(products.flatMap((p) => p.sourceNotes)),
    guardrails: [...DEFAULT_GUARDRAILS],
  };
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 * @param {SpotlightAssemblyInput} input
 */
function assembleProductSpotlightPackage(input, products) {
  const meta = basePackageMeta(products, input);
  const primary = products[0];
  const title = primary?.productName || "Product spotlight";
  const summary =
    primary?.salesPositioning ||
    primary?.productSpotlightAngles[0] ||
    "Canonical product spotlight assembled from indexed intelligence — confirm live PDS before quoting.";

  return {
    ok: true,
    ...meta,
    title,
    subtitle: primary?.pdsMapKey ? `Indexed PDS row: ${primary.pdsMapKey}` : toneLabel(input?.tone),
    priority: products.length > 1 ? "medium" : "high",
    summary,
    recommendedAction: "Send product spotlight and confirm drum label / PDS title block with the customer.",
    primaryCTA: "Open live PDS and verify product number",
    supportingCTAs: uniqueCompact([
      "Pair with related category spotlight",
      "Schedule rep coaching on cautions",
      products.length > 1 ? "Compare grade variants in likely-match list" : "",
    ]),
    sections: [
      {
        title: "What this product is",
        bullets: uniqueCompact([
          primary?.salesPositioning,
          primary?.formulation,
          primary?.thickenerType ? `Thickener: ${primary.thickenerType}` : "",
          ...primary?.productSpotlightAngles,
        ]),
      },
      {
        title: "Why it matters",
        bullets: uniqueCompact([
          ...products.flatMap((p) => p.differentiators),
          ...products.flatMap((p) => p.bestFit),
        ]),
      },
      {
        title: "Best-fit applications",
        bullets: uniqueCompact(products.flatMap((p) => p.applications)),
      },
      {
        title: "Specs, approvals, and registrations (canonical only)",
        bullets: extractSpecsAndApprovals(primary || products[0]),
      },
      {
        title: "Pain points this can address",
        bullets: extractPainPoints(products),
      },
      {
        title: "Questions reps should ask",
        bullets: extractRepQuestions(products),
      },
      {
        title: "Cross-sell opportunities",
        bullets: extractCrossSellSignals(products),
      },
      {
        title: "Customer profile signals",
        bullets: extractCustomerSignals(products),
      },
      {
        title: "Cautions — preserve on every call",
        bullets: uniqueCompact(products.flatMap((p) => p.cautions)),
      },
    ],
    productCards: products.map(buildProductCard),
    customerProfileSignals: extractCustomerSignals(products),
    customerProfileQuestions: extractRepQuestions(products),
    repQuestions: extractRepQuestions(products),
    salesAngles: extractSalesAngles(products),
    operationalPainPoints: extractPainPoints(products),
    crossSellOpportunities: extractCrossSellSignals(products),
    trainingRecommendations: [],
    fieldRideRecommendations: [],
    suggestedSpotlightType: "product_spotlight",
  };
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 * @param {SpotlightAssemblyInput} input
 */
function assembleCategorySpotlightPackage(input, products) {
  const meta = basePackageMeta(products, input);
  const categoryLabel =
    String(input?.category ?? "").trim() ||
    uniqueCompact(products.map((p) => p.category))[0] ||
    "Lubricant category";

  return {
    ok: true,
    ...meta,
    title: `${categoryLabel.replace(/_/g, " ")} — category spotlight`,
    subtitle: `${products.length} canonical product${products.length === 1 ? "" : "s"} in scope`,
    priority: "medium",
    summary:
      "Category opportunity assembled from canonical product families — use to coach reps on mix, cross-sell, and discovery questions.",
    recommendedAction: "Send category spotlight and review product mix gaps with the dealer.",
    primaryCTA: "Review category product cards",
    supportingCTAs: ["Generate customer profile for top segment", "Assign Klondike University category module"],
    sections: [
      {
        title: "Category opportunity",
        bullets: uniqueCompact(products.flatMap((p) => p.categorySpotlightAngles)),
      },
      {
        title: "Product family options in scope",
        bullets: uniqueCompact(
          products.map((p) => `${p.productName}${p.pdsMapKey ? ` (${p.pdsMapKey})` : ""}`)
        ),
      },
      {
        title: "Customer profiles that fit",
        bullets: extractCustomerSignals(products),
      },
      {
        title: "What reps should listen for",
        bullets: uniqueCompact([
          ...products.flatMap((p) => p.routingKeywords),
          ...products.flatMap((p) => p.complianceTriggers),
          ...products.flatMap((p) => p.environmentalRiskSignals),
          ...products.flatMap((p) => p.oemConquestSignals),
        ]),
      },
      {
        title: "Common pain points",
        bullets: extractPainPoints(products),
      },
      {
        title: "Product mix / cross-sell prompts",
        bullets: extractCrossSellSignals(products),
      },
      {
        title: "Training recommendation",
        bullets: [
          "Recommended to assign a Klondike University category fundamentals module for this family.",
          "Consider in-person product training when dealer quotes this category narrowly.",
        ],
      },
    ],
    productCards: products.map(buildProductCard),
    customerProfileSignals: extractCustomerSignals(products),
    customerProfileQuestions: extractRepQuestions(products),
    repQuestions: extractRepQuestions(products),
    salesAngles: extractSalesAngles(products),
    operationalPainPoints: extractPainPoints(products),
    crossSellOpportunities: extractCrossSellSignals(products),
    trainingRecommendations: [
      "Klondike University — category fundamentals (placeholder course id to be assigned)",
    ],
    fieldRideRecommendations: [],
    suggestedSpotlightType: "category_spotlight",
  };
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 * @param {SpotlightAssemblyInput} input
 */
function assembleCustomerProfilePackage(input, products) {
  const meta = basePackageMeta(products, input);
  const ctx = /** @type {Record<string, unknown>} */ (input?.accountContext || {});
  const customerType = String(ctx.customerType ?? "").trim();
  const industries = asArray(ctx.industries);

  return {
    ok: true,
    ...meta,
    title: customerType
      ? `Customer profile — ${customerType}`
      : industries[0]
        ? `Customer profile — ${industries[0]}`
        : "Customer profile package",
    subtitle: "Discovery-led — potential fit from canonical signals only",
    priority: "high",
    summary:
      "Profile assembled from canonical customer signals and account context. Likely needs and questions are recommended to validate — not stated as facts.",
    recommendedAction: "Generate customer profile briefing and pair with targeted product or category spotlights.",
    primaryCTA: "Validate profile with discovery questions",
    supportingCTAs: ["Send matching product spotlight", "Schedule field ride for on-site observation"],
    sections: [
      {
        title: "Industry / customer type (from input)",
        bullets: uniqueCompact([customerType, ...industries, ...asArray(ctx.knownProductLines)]),
      },
      {
        title: "Likely equipment / applications",
        bullets: uniqueCompact(products.flatMap((p) => p.applications)),
      },
      {
        title: "Likely product needs (canonical-backed)",
        bullets: uniqueCompact(
          products.map((p) => p.productName),
          products.flatMap((p) => p.bestFit)
        ),
      },
      {
        title: "Compliance / OEM / environmental triggers to probe",
        bullets: uniqueCompact([
          ...products.flatMap((p) => p.complianceTriggers),
          ...products.flatMap((p) => p.environmentalRiskSignals),
          ...products.map((p) => p.oemAlignment).filter(Boolean),
        ]),
      },
      {
        title: "Discovery questions",
        bullets: extractRepQuestions(products),
      },
      {
        title: "Recommended spotlights",
        bullets: uniqueCompact(
          products.map((p) => `Product spotlight: ${p.productName}`),
          products[0]?.category ? [`Category spotlight: ${products[0].category}`] : []
        ),
      },
      {
        title: "Field ride targets",
        bullets: [
          "Observe fluid labels, drum colors, and bulk storage practices on site.",
          "Listen for OEM spec strings, environmental compliance, and narrow product mix habits.",
        ],
      },
      {
        title: "Training recommendations",
        bullets: [
          "Assign category training where rep repeatedly quotes a single SKU in this profile.",
        ],
      },
    ],
    productCards: products.map(buildProductCard),
    customerProfileSignals: uniqueCompact([
      ...extractCustomerSignals(products),
      ...asArray(input?.customerProfileSignals),
    ]),
    customerProfileQuestions: extractRepQuestions(products),
    repQuestions: extractRepQuestions(products),
    salesAngles: extractSalesAngles(products),
    operationalPainPoints: extractPainPoints(products),
    crossSellOpportunities: extractCrossSellSignals(products),
    trainingRecommendations: ["Klondike University — customer segment discovery (placeholder)"],
    fieldRideRecommendations: [
      "Field ride recommended to validate equipment tags, fluid colors, and compliance requirements on site.",
    ],
    suggestedSpotlightType: "customer_profile",
  };
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 * @param {SpotlightAssemblyInput} input
 */
function assembleRepCoachingBrief(input, products) {
  const meta = basePackageMeta(products, input);
  const primary = products[0];

  return {
    ok: true,
    ...meta,
    title: primary ? `Rep coaching — ${primary.productName}` : "Rep coaching brief",
    subtitle: toneLabel(input?.tone),
    priority: "high",
    summary: "Simplified talking points and discovery coaching from canonical intelligence — cautions are mandatory.",
    recommendedAction: "Coach rep on discovery questions and cautions before customer visit.",
    primaryCTA: "Practice discovery questions",
    supportingCTAs: ["Review cautions aloud", "Send product spotlight follow-up"],
    sections: [
      {
        title: "What the rep needs to know",
        bullets: uniqueCompact([
          primary?.salesPositioning,
          ...products.flatMap((p) => p.repTalkTrack),
        ]),
      },
      {
        title: "Simplified talking points",
        bullets: extractSalesAngles(products).slice(0, 8),
      },
      {
        title: "Common customer pain (listen for)",
        bullets: extractPainPoints(products),
      },
      {
        title: "Questions to ask",
        bullets: extractRepQuestions(products),
      },
      {
        title: "What not to say / cautions",
        bullets: uniqueCompact([
          ...products.flatMap((p) => p.cautions),
          ...products.flatMap((p) => p.notBestFit).map((n) => `Not best fit: ${n}`),
        ]),
      },
      {
        title: "Suggested follow-up",
        bullets: [
          "Confirm PDS title block and product number after the call.",
          "Send product spotlight if customer needs written proof points.",
        ],
      },
    ],
    productCards: products.map(buildProductCard),
    customerProfileSignals: extractCustomerSignals(products),
    customerProfileQuestions: extractRepQuestions(products),
    repQuestions: extractRepQuestions(products),
    salesAngles: extractSalesAngles(products),
    operationalPainPoints: extractPainPoints(products),
    crossSellOpportunities: extractCrossSellSignals(products),
    trainingRecommendations: [],
    fieldRideRecommendations: [],
    suggestedSpotlightType: "rep_coaching",
  };
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 * @param {SpotlightAssemblyInput} input
 */
function assembleTrainingRecommendationPackage(input, products) {
  const meta = basePackageMeta(products, input);
  const families = uniqueCompact(products.map((p) => p.canonicalFamily));

  return {
    ok: true,
    ...meta,
    title: "Training recommendation",
    subtitle: families.length ? `Families: ${families.join(", ")}` : "Canonical product training",
    priority: "medium",
    summary:
      "Training topic recommended based on product/category scope and performance context — use Klondike University placeholder until course id is mapped.",
    recommendedAction: "Assign Klondike University course and optionally schedule in-person product training.",
    primaryCTA: "Assign Klondike University course (placeholder)",
    supportingCTAs: ["Schedule in-person product training", "Send category spotlight pre-read"],
    sections: [
      {
        title: "Recommended training topic",
        bullets: uniqueCompact(
          products.map((p) => p.categorySpotlightAngles[0] || p.productFamily || p.category),
          [`${meta.audience} audience — ${toneLabel(input?.tone)} delivery`]
        ),
      },
      {
        title: "Why training is needed",
        bullets: uniqueCompact([
          ...asArray(/** @type {Record<string, unknown>} */ (input?.performanceContext || {}).productLineTrend),
          "Rep may be quoting a narrow SKU mix without category context.",
          "Canonical cautions and spec proof require structured reinforcement.",
        ]),
      },
      {
        title: "Target audience",
        bullets: [normalizeAudience(input?.audience), "Dealer counter staff", "Outside sales reps"],
      },
      {
        title: "Products / categories covered",
        bullets: uniqueCompact(products.map((p) => p.productName)),
      },
      {
        title: "Klondike University (placeholder)",
        bullets: [
          "KU-CANONICAL-FUNDAMENTALS — assign when course catalog mapping is available.",
          "Pair with product PDS review exercise using indexed map rows only.",
        ],
      },
      {
        title: "In-person training suggestion",
        bullets: [
          "Schedule hands-on training when dealer has environmental, OEM, or compliance-heavy accounts in scope.",
          "Practice discovery questions and caution delivery on live drum labels.",
        ],
      },
    ],
    productCards: products.map(buildProductCard),
    customerProfileSignals: extractCustomerSignals(products),
    customerProfileQuestions: extractRepQuestions(products),
    repQuestions: extractRepQuestions(products),
    salesAngles: extractSalesAngles(products),
    operationalPainPoints: extractPainPoints(products),
    crossSellOpportunities: extractCrossSellSignals(products),
    trainingRecommendations: [
      "Klondike University — canonical fundamentals (placeholder)",
      "In-person product training — recommended when compliance or OEM alignment is in scope",
    ],
    fieldRideRecommendations: [],
    suggestedSpotlightType: "training_recommendation",
  };
}

/**
 * @param {NormalizedCanonicalProduct[]} products
 * @param {SpotlightAssemblyInput} input
 */
function assembleFieldRideRecommendationPackage(input, products) {
  const meta = basePackageMeta(products, input);
  const ctx = /** @type {Record<string, unknown>} */ (input?.accountContext || {});
  const dealerName = String(ctx.dealerName ?? "").trim();

  return {
    ok: true,
    ...meta,
    title: dealerName ? `Field ride — ${dealerName}` : "Field ride recommendation",
    subtitle: "KL Admin coaching visit",
    priority: "high",
    summary:
      "Field ride recommended to observe quoting habits, fluid storage, and category gaps — outcomes should be validated on site.",
    recommendedAction: "Schedule field ride with discovery question checklist and category coaching plan.",
    primaryCTA: "Schedule field ride",
    supportingCTAs: ["Generate customer profile pre-visit", "Assign post-visit training module"],
    sections: [
      {
        title: "Why a field ride is recommended",
        bullets: uniqueCompact([
          ...asArray(/** @type {Record<string, unknown>} */ (input?.performanceContext || {}).revenueTrend),
          ...asArray(ctx.opportunitySignals),
          "Declining activity or narrow product mix may benefit from on-site coaching.",
        ]),
      },
      {
        title: "Target account / customer profile",
        bullets: uniqueCompact([
          dealerName,
          String(ctx.territoryName ?? ""),
          ...asArray(ctx.industries),
          ...extractCustomerSignals(products),
        ]),
      },
      {
        title: "What KL Admin should observe",
        bullets: [
          "Drum labels vs quoted SKUs — confirm PDS title alignment.",
          "Bulk storage, fluid colors, and cross-contamination risks.",
          "Counter quoting patterns — single-category vs full mix.",
        ],
      },
      {
        title: "Products / categories to coach",
        bullets: uniqueCompact(products.map((p) => `${p.productName} (${p.canonicalFamily})`)),
      },
      {
        title: "Discovery questions to practice",
        bullets: extractRepQuestions(products),
      },
      {
        title: "Expected outcome",
        bullets: [
          "Rep can articulate canonical proof points without inventing specs.",
          "Dealer agrees on next spotlight or training action with dated follow-up.",
        ],
      },
    ],
    productCards: products.map(buildProductCard),
    customerProfileSignals: extractCustomerSignals(products),
    customerProfileQuestions: extractRepQuestions(products),
    repQuestions: extractRepQuestions(products),
    salesAngles: extractSalesAngles(products),
    operationalPainPoints: extractPainPoints(products),
    crossSellOpportunities: extractCrossSellSignals(products),
    trainingRecommendations: ["Follow-up: Klondike University module for weakest category quoted"],
    fieldRideRecommendations: [
      "On-site field ride with product mix review and discovery coaching.",
    ],
    suggestedSpotlightType: "field_ride_recommendation",
  };
}

/**
 * @param {string} signalHaystack
 * @param {string[]} needles
 */
function haystackHas(signalHaystack, needles) {
  const h = normalizeText(signalHaystack);
  return needles.some((n) => {
    const needle = normalizeText(n);
    return needle.length >= 3 && h.includes(needle);
  });
}

/**
 * @param {string[]} knownLines
 * @param {string[]} requiredFamilies
 */
function missingFamily(knownLines, requiredFamilies) {
  const hay = normalizeText(knownLines.join(" "));
  return requiredFamilies.filter((f) => !hay.includes(normalizeText(f)));
}

/**
 * @param {SpotlightAssemblyInput} input
 */
function rankRecommendedActions(input) {
  const ctx = /** @type {Record<string, unknown>} */ (input?.accountContext || {});
  const perf = /** @type {Record<string, unknown>} */ (input?.performanceContext || {});
  const signals = uniqueCompact([
    ...asArray(input?.customerProfileSignals),
    ...asArray(ctx.industries),
    ...asArray(ctx.opportunitySignals),
    ...asArray(ctx.performanceSignals),
    ...asArray(ctx.missingProductLines),
    ...asArray(perf.missingCategories),
  ]);
  const signalHaystack = signals.join(" ");
  const knownLines = uniqueCompact([
    ...asArray(ctx.knownProductLines),
    ...asArray(perf.topProducts),
  ]);
  const perfHay = normalizeText(
    [
      perf.revenueTrend,
      perf.quoteTrend,
      perf.conversionTrend,
      perf.productLineTrend,
      ...asArray(perf.decliningProducts),
    ].join(" ")
  );

  /** @type {Array<{ action: string, priority: number, reason: string, packageType?: string, productIds?: string[] }>} */
  const actions = [];

  /** @param {string} action @param {number} priority @param {string} reason @param {object} [extra] */
  const push = (action, priority, reason, extra = {}) => {
    actions.push({ action, priority, reason, ...extra });
  };

  if (
    haystackHas(signalHaystack, ["food grade", "nsf h1", "food processing", "incidental food contact"]) &&
    missingFamily(knownLines, ["food grade", "compliance", "kl-fg"]).length
  ) {
    push(
      "send_product_spotlight",
      92,
      "Food-processing / NSF H1 signal present but food-grade product line not evident in known mix.",
      { packageType: "product_spotlight", productIds: ["compliance-specialty-canonical-food-grade-ep2-grease"] }
    );
  }

  if (
    haystackHas(signalHaystack, ["forestry", "logging", "bar chain", "saw guide", "harvesting"]) &&
    missingFamily(knownLines, ["bar chain", "industrial", "kl-io"]).length
  ) {
    push(
      "send_category_spotlight",
      88,
      "Forestry / bar-and-chain signal with no industrial specialty mix detected.",
      { packageType: "category_spotlight", category: "industrial_specialty" }
    );
  }

  if (
    haystackHas(signalHaystack, [
      "john deere",
      "deere",
      "cool gard",
      "plus 50",
      "j20c",
      "jdm",
    ])
  ) {
    push(
      "generate_customer_profile",
      90,
      "John Deere / COOL GARD / PLUS 50 / J20C alignment signal — AGRIMAX Deere customer profile.",
      { packageType: "customer_profile", customerProfileSignals: ["john deere", "agrimax"] }
    );
    push("send_product_spotlight", 85, "Support AGRIMAX Green program with product spotlight.", {
      packageType: "product_spotlight",
    });
  }

  if (
    haystackHas(signalHaystack, ["cnh", "case ih", "mat 3544", "mat 3540", "mat 3724", "mat 3572"])
  ) {
    push(
      "generate_customer_profile",
      90,
      "CNH / Case IH MAT signal — AGRIMAX CNH customer profile.",
      { packageType: "customer_profile", customerProfileSignals: ["cnh", "case ih", "agrimax"] }
    );
  }

  if (
    haystackHas(signalHaystack, [
      "eal",
      "vgp",
      "biodegradable",
      "environmentally sensitive",
      "near water",
      "marine",
      "readily biodegradable",
    ])
  ) {
    push(
      "send_category_spotlight",
      87,
      "EAL / VGP / environmental hydraulic signal — biodegradable & ENVIRO compliance spotlight.",
      { packageType: "category_spotlight", category: "compliance_specialty" }
    );
    push("send_product_spotlight", 84, "Lead with compliance specialty hydraulic spotlight.", {
      packageType: "product_spotlight",
    });
  }

  if (
    haystackHas(signalHaystack, ["hydraulic"]) &&
    missingFamily(knownLines, ["grease", "coolant", "gear"]).length >= 2
  ) {
    push(
      "review_product_mix",
      80,
      "Hydraulic activity present but supporting grease / gear / coolant lines appear missing.",
      { packageType: "category_spotlight" }
    );
  }

  if (perfHay.includes("declin") || perfHay.includes("down") || perfHay.includes("drop")) {
    push(
      "schedule_field_ride",
      86,
      "Declining revenue or activity trend — on-site field ride recommended.",
      { packageType: "field_ride_recommendation" }
    );
  }

  if (perfHay.includes("narrow") || perfHay.includes("low activity") || perfHay.includes("weak")) {
    push(
      "assign_klondike_university_course",
      78,
      "Low rep activity or narrow quoting — assign training module.",
      { packageType: "training_recommendation" }
    );
    push("schedule_in_person_training", 76, "Reinforce with in-person product training.", {
      packageType: "training_recommendation",
    });
  }

  if (perfHay.includes("grow") || perfHay.includes("up") || perfHay.includes("gain")) {
    push("send_product_spotlight", 74, "Growing product line — accelerate adoption with spotlight.", {
      packageType: "product_spotlight",
    });
  }

  if (haystackHas(signalHaystack, ["quote"]) && haystackHas(signalHaystack, ["hydraulic"])) {
    push("coach_rep", 72, "Quote activity on hydraulic — coach rep on ISO discipline and cross-sell.", {
      packageType: "rep_coaching",
    });
  }

  actions.sort((a, b) => b.priority - a.priority);

  const seen = new Set();
  return actions.filter((a) => {
    const key = `${a.action}:${a.packageType || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * @param {SpotlightAssemblyInput} input
 */
export function buildRecommendedEnablementActions(input = {}) {
  return rankRecommendedActions(input);
}

/**
 * @param {unknown} queryOrFilters
 * @returns {Array<{ id: string, productName: string, score: number, canonicalFamily: string, pdsMapKey: string, category: string }>}
 */
export function findCanonicalProductsForEnablement(queryOrFilters) {
  const catalog = getFullCatalog();

  let queryText = "";
  /** @type {string[]} */
  let filterSignals = [];

  if (typeof queryOrFilters === "string") {
    queryText = queryOrFilters;
  } else if (queryOrFilters && typeof queryOrFilters === "object") {
    const o = /** @type {Record<string, unknown>} */ (queryOrFilters);
    queryText = String(o.query ?? o.q ?? "");
    filterSignals = uniqueCompact([
      ...asArray(o.customerProfileSignals),
      ...asArray(o.signals),
      String(o.category ?? ""),
      String(o.canonicalFamily ?? ""),
    ]);
  }

  const q = normalizeText(queryText);

  /** @type {Array<{ id: string, productName: string, score: number, canonicalFamily: string, pdsMapKey: string, category: string }>} */
  const results = [];

  for (const product of catalog) {
    let score = scoreProductForSignals(filterSignals, product);
    const searchable = normalizeText(
      [
        product.id,
        product.productName,
        product.pdsMapKey,
        product.category,
        product.productFamily,
        product.oemAlignment,
        ...product.aliases,
        ...product.routingKeywords,
        ...product.specifications,
        ...product.customerProfileSignals,
        ...product.complianceTriggers,
        ...product.environmentalRiskSignals,
      ].join(" ")
    );

    if (q) {
      if (searchable.includes(q)) score += 40;
      const tokens = q.split(" ").filter((t) => t.length >= 2);
      for (const token of tokens) {
        if (searchable.includes(token)) score += 8;
      }
      if (normalizeText(product.id) === q) score += 50;
      if (normalizeText(product.pdsMapKey) === q) score += 45;
    }

    if (score > 0) {
      results.push({
        id: product.id,
        productName: product.productName,
        score,
        canonicalFamily: product.canonicalFamily,
        pdsMapKey: product.pdsMapKey,
        category: product.category,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

/**
 * @returns {Array<{
 *   id: string,
 *   productName: string,
 *   productFamily: string,
 *   category: string,
 *   pdsMapKey: string,
 *   canonicalFamily: string,
 *   aliases: string[],
 *   routingKeywords: string[],
 *   customerProfileSignals: string[],
 *   productSpotlightAngles: string[],
 *   categorySpotlightAngles: string[],
 * }>}
 */
export function listAvailableCanonicalProducts() {
  return getFullCatalog().map((p) => ({
    id: p.id,
    productName: p.productName,
    productFamily: p.productFamily,
    category: p.category,
    pdsMapKey: p.pdsMapKey,
    canonicalFamily: p.canonicalFamily,
    aliases: p.aliases,
    routingKeywords: p.routingKeywords,
    customerProfileSignals: p.customerProfileSignals,
    productSpotlightAngles: p.productSpotlightAngles,
    categorySpotlightAngles: p.categorySpotlightAngles,
  }));
}

/**
 * @param {SpotlightAssemblyInput} input
 */
function emptyPackageResponse(input, suggestions) {
  return {
    ok: false,
    reason: "No matching canonical products found",
    suggestions: uniqueCompact(suggestions),
    packageType: String(input?.packageType ?? ""),
    title: "",
    subtitle: "",
    priority: "low",
    audience: normalizeAudience(input?.audience),
    summary: "",
    recommendedAction: "",
    primaryCTA: "",
    supportingCTAs: [],
    sections: [],
    productCards: [],
    customerProfileSignals: asArray(input?.customerProfileSignals),
    customerProfileQuestions: [],
    repQuestions: [],
    salesAngles: [],
    operationalPainPoints: [],
    crossSellOpportunities: [],
    trainingRecommendations: [],
    fieldRideRecommendations: [],
    suggestedSpotlightType: String(input?.packageType ?? ""),
    sourceProducts: [],
    sourceCanonicalFamilies: [],
    sourceNotes: [],
    guardrails: [...DEFAULT_GUARDRAILS],
  };
}

/**
 * @param {SpotlightAssemblyInput} input
 */
export function buildProductSpotlightPackage(input = {}) {
  const products = resolveProductsFromInput({ ...input, packageType: "product_spotlight" });
  if (!products.length) {
    return emptyPackageResponse(input, [
      "Provide productIds, pdsMapKeys, or customerProfileSignals",
      "Try findCanonicalProductsForEnablement(query) to discover ids",
    ]);
  }
  return assembleProductSpotlightPackage(input, products);
}

/**
 * @param {SpotlightAssemblyInput} input
 */
export function buildCategorySpotlightPackage(input = {}) {
  const products = resolveProductsFromInput({ ...input, packageType: "category_spotlight" });
  if (!products.length) {
    return emptyPackageResponse(input, [
      "Provide category, productIds, or profile signals for the category scope",
      "Example category: compliance_specialty, grease, hydraulic_fluids",
    ]);
  }
  return assembleCategorySpotlightPackage(input, products);
}

/**
 * @param {SpotlightAssemblyInput} input
 */
export function buildCustomerProfilePackage(input = {}) {
  const products = resolveProductsFromInput({ ...input, packageType: "customer_profile" });
  if (!products.length) {
    return emptyPackageResponse(input, [
      "Add customerProfileSignals (e.g. food processing, john deere, forestry)",
      "Or pass accountContext.industries / opportunitySignals",
    ]);
  }
  return assembleCustomerProfilePackage(input, products);
}

/**
 * @param {SpotlightAssemblyInput} input
 */
export function buildRepCoachingBrief(input = {}) {
  const products = resolveProductsFromInput({ ...input, packageType: "rep_coaching" });
  if (!products.length) {
    return emptyPackageResponse(input, ["Provide at least one productId or pdsMapKey for coaching scope"]);
  }
  return assembleRepCoachingBrief(input, products);
}

/**
 * @param {SpotlightAssemblyInput} input
 */
export function buildTrainingRecommendationPackage(input = {}) {
  const products = resolveProductsFromInput({ ...input, packageType: "training_recommendation" });
  if (!products.length) {
    return emptyPackageResponse(input, [
      "Scope training to productIds or a category with canonical coverage",
    ]);
  }
  return assembleTrainingRecommendationPackage(input, products);
}

/**
 * @param {SpotlightAssemblyInput} input
 */
export function buildFieldRideRecommendationPackage(input = {}) {
  const products = resolveProductsFromInput({ ...input, packageType: "field_ride_recommendation" });
  if (!products.length) {
    return emptyPackageResponse(input, [
      "Add accountContext and performanceContext, or productIds for visit coaching scope",
    ]);
  }
  return assembleFieldRideRecommendationPackage(input, products);
}

/**
 * @param {SpotlightAssemblyInput} input
 */
export function buildSalesEnablementPackage(input = {}) {
  const packageType = normalizeText(input?.packageType) || "product_spotlight";
  const normalized = { ...input, packageType };

  switch (packageType) {
    case "category_spotlight":
      return buildCategorySpotlightPackage(normalized);
    case "customer_profile":
      return buildCustomerProfilePackage(normalized);
    case "rep_coaching":
      return buildRepCoachingBrief(normalized);
    case "training_recommendation":
      return buildTrainingRecommendationPackage(normalized);
    case "field_ride_recommendation":
      return buildFieldRideRecommendationPackage(normalized);
    case "product_spotlight":
    default:
      return buildProductSpotlightPackage(normalized);
  }
}
