/**
 * Phase 75.0 — Node smoke tests for HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP (products + category spotlights).
 * Run: npm run test:hd-engine-oil-pds-spotlights
 */

import { HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP } from "./hdEngineOilPdsSpotlightMap.js";

/** @param {unknown} s */
function nonEmpty(s) {
  return typeof s === "string" && s.trim().length > 0;
}

/**
 * @param {unknown} arr
 * @param {string} label
 * @returns {string | null}
 */
function requireStringArrayMinOne(arr, label) {
  if (!Array.isArray(arr) || arr.length < 1) {
    return `${label} must be a non-empty array (at least one item)`;
  }
  const hasContent = arr.some((x) => nonEmpty(x));
  if (!hasContent) {
    return `${label} must contain at least one non-empty string`;
  }
  return null;
}

/**
 * @param {unknown} p
 * @param {number} index
 * @returns {string[]}
 */
function verifyProduct(p, index) {
  const failures = [];
  const loc = `HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.products[${index}]`;
  if (!p || typeof p !== "object") {
    failures.push(`${loc} is not an object`);
    return failures;
  }
  const pid = String(p.id ?? "").trim();
  if (!nonEmpty(p.id)) failures.push(`${loc} missing non-empty id`);
  if (!nonEmpty(p.productName)) failures.push(`${loc} (${pid || "?"}) missing non-empty productName`);
  if (String(p.categoryId ?? "").trim() !== "hd_engine_oils") {
    failures.push(`${loc} (${pid || "?"}) categoryId must be "hd_engine_oils"`);
  }
  if (!nonEmpty(p.positioningTier)) failures.push(`${loc} (${pid || "?"}) missing non-empty positioningTier`);
  if (!nonEmpty(p.pdsFileHint)) failures.push(`${loc} (${pid || "?"}) missing non-empty pdsFileHint`);

  const pa = requireStringArrayMinOne(p.primaryApplications, "primaryApplications");
  if (pa) failures.push(`${loc}: ${pa}`);
  const oc = requireStringArrayMinOne(p.operatingConditions, "operatingConditions");
  if (oc) failures.push(`${loc}: ${oc}`);
  const pain = requireStringArrayMinOne(p.painPoints, "painPoints");
  if (pain) failures.push(`${loc}: ${pain}`);

  const ind = requireStringArrayMinOne(p.industries, "industries");
  if (ind) failures.push(`${loc}: ${ind}`);
  const eq = requireStringArrayMinOne(p.equipmentTargets, "equipmentTargets");
  if (eq) failures.push(`${loc}: ${eq}`);
  const tp = requireStringArrayMinOne(p.technicalProofPoints, "technicalProofPoints");
  if (tp) failures.push(`${loc}: ${tp}`);

  const lfbb = p.lfbb && typeof p.lfbb === "object" ? p.lfbb : null;
  if (!lfbb) failures.push(`${loc} (${pid || "?"}) missing lfbb object`);
  else {
    for (const key of ["link", "feature", "bridge", "benefit"]) {
      if (!nonEmpty(lfbb[key])) failures.push(`${loc} (${pid || "?"}) missing non-empty lfbb.${key}`);
    }
  }

  if (!nonEmpty(p.recommendedCta)) failures.push(`${loc} (${pid || "?"}) missing non-empty recommendedCta`);

  const custRefs = Array.isArray(p.recommendedCustomerProfileIds) ? p.recommendedCustomerProfileIds : [];
  for (const raw of custRefs) {
    const key = String(raw ?? "").trim();
    if (!key) failures.push(`${loc} (${pid || "?"}) empty recommendedCustomerProfileIds entry`);
  }

  return failures;
}

/**
 * @param {unknown} c
 * @param {number} index
 * @param {Set<string>} productIds
 * @returns {string[]}
 */
function verifyCategorySpotlight(c, index, productIds) {
  const failures = [];
  const loc = `HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.categorySpotlights[${index}]`;
  if (!c || typeof c !== "object") {
    failures.push(`${loc} is not an object`);
    return failures;
  }
  const cid = String(c.id ?? "").trim();
  if (!nonEmpty(c.id)) failures.push(`${loc} missing non-empty id`);
  if (!nonEmpty(c.title)) failures.push(`${loc} (${cid || "?"}) missing non-empty title`);
  if (!nonEmpty(c.positioningTier)) failures.push(`${loc} (${cid || "?"}) missing non-empty positioningTier`);

  const rp = Array.isArray(c.recommendedProducts) ? c.recommendedProducts : [];
  if (rp.length < 1) failures.push(`${loc} (${cid || "?"}) recommendedProducts must have at least one id`);
  for (const raw of rp) {
    const key = String(raw ?? "").trim();
    if (!key) failures.push(`${loc} (${cid || "?"}) empty recommendedProducts entry`);
    else if (productIds.size > 0 && !productIds.has(key)) {
      failures.push(`${loc} (${cid || "?"}) unknown recommendedProduct id "${key}"`);
    }
  }

  const ind = requireStringArrayMinOne(c.industries, "industries");
  if (ind) failures.push(`${loc}: ${ind}`);
  const cp = Array.isArray(c.customerProfiles) ? c.customerProfiles : [];
  if (cp.filter((x) => nonEmpty(x)).length < 1) {
    failures.push(`${loc} (${cid || "?"}) customerProfiles must have at least one non-empty id`);
  }

  const oc = requireStringArrayMinOne(c.operatingConditions, "operatingConditions");
  if (oc) failures.push(`${loc}: ${oc}`);
  const pp = requireStringArrayMinOne(c.painPoints, "painPoints");
  if (pp) failures.push(`${loc}: ${pp}`);
  const tp = requireStringArrayMinOne(c.technicalProofPoints, "technicalProofPoints");
  if (tp) failures.push(`${loc}: ${tp}`);

  const lfbb = c.lfbb && typeof c.lfbb === "object" ? c.lfbb : null;
  if (!lfbb) failures.push(`${loc} (${cid || "?"}) missing lfbb object`);
  else {
    for (const key of ["link", "feature", "bridge", "benefit"]) {
      if (!nonEmpty(lfbb[key])) failures.push(`${loc} (${cid || "?"}) missing non-empty lfbb.${key}`);
    }
  }

  if (!nonEmpty(c.recommendedCta)) failures.push(`${loc} (${cid || "?"}) missing non-empty recommendedCta`);
  if (!Array.isArray(c.pdsSafeNotes)) failures.push(`${loc} (${cid || "?"}) pdsSafeNotes must be an array`);

  return failures;
}

const products = Array.isArray(HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP?.products) ? HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.products : [];
const categorySpotlights = Array.isArray(HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP?.categorySpotlights)
  ? HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.categorySpotlights
  : [];

const productIds = new Set(products.filter((p) => p && p.id).map((p) => String(p.id).trim()));

/** @type {{ label: string; failures: string[] }[]} */
const results = [];

if (products.length === 0) {
  results.push({ label: "(no products)", failures: ["HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.products empty"] });
}
for (let i = 0; i < products.length; i++) {
  const p = products[i];
  const pid = p && typeof p === "object" && nonEmpty(p.id) ? String(p.id) : `index-${i}`;
  const name = p && typeof p === "object" && nonEmpty(p.productName) ? String(p.productName) : "(no name)";
  results.push({ label: `PRODUCT ${pid} — ${name}`, failures: verifyProduct(p, i) });
}

if (categorySpotlights.length === 0) {
  results.push({ label: "(no category spotlights)", failures: ["categorySpotlights empty"] });
}
for (let i = 0; i < categorySpotlights.length; i++) {
  const c = categorySpotlights[i];
  const cid = c && typeof c === "object" && nonEmpty(c.id) ? String(c.id) : `index-${i}`;
  const title = c && typeof c === "object" && nonEmpty(c.title) ? String(c.title) : "(no title)";
  results.push({ label: `CATEGORY ${cid} — ${title}`, failures: verifyCategorySpotlight(c, i, productIds) });
}

let passCount = 0;
let failCount = 0;

console.log("\nHD_ENGINE_OIL_PDS_SPOTLIGHT_MAP smoke tests\n" + "=".repeat(56));

for (const r of results) {
  if (r.failures.length === 0) {
    passCount += 1;
    console.log(`PASS  ${r.label}`);
  } else {
    failCount += 1;
    console.log(`FAIL  ${r.label}`);
    for (const f of r.failures) console.log(`      - ${f}`);
  }
}

console.log("=".repeat(56));
console.log(`Summary: ${passCount} passed, ${failCount} failed (of ${results.length})\n`);

if (failCount > 0) {
  const detail = results
    .filter((r) => r.failures.length)
    .map((r) => `${r.label}: ${r.failures.join(" | ")}`)
    .join("\n");
  throw new Error(`HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP smoke tests failed:\n${detail}`);
}
