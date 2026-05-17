import { buildSalesEnablementPackage, listAvailableCanonicalProducts } from "../../data/salesEnablement/spotlightAssemblyEngine.js";

const INTERNAL_PHRASE_PATTERNS = [
  /indexed pds row/i,
  /canonical only/i,
  /indexed canonical intelligence/i,
  /assembled from indexed/i,
  /confirm live pds before quoting/i,
];

/**
 * @param {string} text
 */
function cleanFactLine(text) {
  const line = String(text || "").trim();
  if (!line) return "";
  if (INTERNAL_PHRASE_PATTERNS.some((re) => re.test(line))) return "";
  return line.replace(/^Indexed PDS row:\s*/i, "").trim();
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function cleanFactList(value) {
  const list = Array.isArray(value) ? value : [];
  const out = [];
  const seen = new Set();
  for (const item of list) {
    const line = cleanFactLine(item);
    if (!line) continue;
    const key = line.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(line);
  }
  return out;
}

/**
 * @param {{ title?: string, bullets?: unknown[] }} section
 */
function sectionBullets(section) {
  return cleanFactList(section?.bullets);
}

/**
 * @param {Record<string, unknown>} assemblyPkg
 * @param {Array<{ title?: string, bullets?: unknown[] }>} sections
 */
function sectionByTitle(assemblyPkg, sections, titleNeedle) {
  const needle = String(titleNeedle || "").toLowerCase();
  const hit = sections.find((s) => String(s?.title || "").toLowerCase().includes(needle));
  return hit ? sectionBullets(hit) : [];
}

/**
 * @param {string} productId
 */
export function isKnownCanonicalProductId(productId) {
  const id = String(productId || "").trim();
  if (!id) return false;
  return listAvailableCanonicalProducts().some((p) => p.id === id);
}

/**
 * Build an approved-facts bundle from the spotlight assembly engine (PDS/canonical only).
 *
 * @param {{
 *   productId: string,
 *   packageType?: string,
 *   audience?: string,
 *   context?: string,
 *   audienceContext?: string,
 * }} input
 */
export function loadCanonicalFactsForSalesCopy(input = {}) {
  const productId = String(input?.productId || "").trim();
  const packageType = String(input?.packageType || "product_spotlight").trim() || "product_spotlight";
  const audience = String(input?.audience || "rep").trim() || "rep";
  const audienceContext = String(input?.context || input?.audienceContext || "").trim();

  if (!productId) {
    return {
      ok: false,
      error: "missing_product_id",
      message: "productId is required",
    };
  }

  if (!isKnownCanonicalProductId(productId)) {
    return {
      ok: false,
      error: "product_not_found",
      message: `No canonical product found for id: ${productId}`,
      productId,
    };
  }

  /** @type {Record<string, unknown>} */
  const assemblyInput = {
    productIds: [productId],
    packageType,
    audience,
  };
  if (audienceContext) {
    assemblyInput.customerProfileSignals = [audienceContext];
  }

  const assemblyPkg = buildSalesEnablementPackage(assemblyInput);
  if (!assemblyPkg?.ok) {
    return {
      ok: false,
      error: "canonical_load_failed",
      message: "Unable to assemble canonical product package",
      productId,
      hints: Array.isArray(assemblyPkg?.suggestions) ? assemblyPkg.suggestions : [],
    };
  }

  const sections = Array.isArray(assemblyPkg.sections) ? assemblyPkg.sections : [];
  const primaryCard = Array.isArray(assemblyPkg.productCards) ? assemblyPkg.productCards[0] : null;

  const approvedFacts = {
    productId,
    productName: String(primaryCard?.productName || assemblyPkg.title || "").trim(),
    productFamily: String(primaryCard?.productFamily || "").trim(),
    category: String(primaryCard?.category || "").trim(),
    pdsMapKey: String(primaryCard?.pdsMapKey || "").trim(),
    gradeLabel: String(primaryCard?.gradeLabel || "").trim(),
    packageType,
    audience,
    audienceContext: audienceContext || null,
    whatItIs: sectionByTitle(assemblyPkg, sections, "what this product is"),
    whyItMatters: sectionByTitle(assemblyPkg, sections, "why it matters"),
    applications: sectionByTitle(assemblyPkg, sections, "best-fit applications"),
    specsApprovalsRegistrations: sectionByTitle(
      assemblyPkg,
      sections,
      "specs, approvals, and registrations"
    ),
    painPoints: sectionByTitle(assemblyPkg, sections, "pain points"),
    discoveryQuestions: sectionByTitle(assemblyPkg, sections, "questions reps should ask"),
    crossSellOpportunities: sectionByTitle(assemblyPkg, sections, "cross-sell"),
    customerProfileSignals: sectionByTitle(assemblyPkg, sections, "customer profile signals"),
    cautions: sectionByTitle(assemblyPkg, sections, "cautions"),
    salesAngles: cleanFactList(assemblyPkg.salesAngles),
    operationalPainPoints: cleanFactList(assemblyPkg.operationalPainPoints),
    crossSellSignals: cleanFactList(assemblyPkg.crossSellOpportunities),
    repQuestions: cleanFactList(assemblyPkg.repQuestions),
    sourceProductIds: cleanFactList(assemblyPkg.sourceProducts),
    guardrails: cleanFactList(assemblyPkg.guardrails),
  };

  const hasFacts =
    approvedFacts.productName ||
    approvedFacts.whatItIs.length ||
    approvedFacts.specsApprovalsRegistrations.length;

  if (!hasFacts) {
    return {
      ok: false,
      error: "empty_canonical_facts",
      message: "Canonical package loaded but contained no usable facts",
      productId,
    };
  }

  return {
    ok: true,
    productId,
    packageType,
    audience,
    audienceContext: audienceContext || null,
    approvedFacts,
    assemblyMeta: {
      sourceCanonicalFamilies: cleanFactList(assemblyPkg.sourceCanonicalFamilies),
      sourceNotes: cleanFactList(assemblyPkg.sourceNotes),
    },
  };
}
