/**
 * Phase 74.4 — Node smoke tests for GREASE_PDS_SPOTLIGHT_MAP (every product row).
 * Run: npm run test:grease-pds-spotlights
 */

import { GREASE_PDS_SPOTLIGHT_MAP } from "./greasePdsSpotlightMap.js";

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
  /** @type {string[]} */
  const failures = [];
  const loc = `products[${index}]`;

  if (!p || typeof p !== "object") {
    failures.push(`${loc} is not an object`);
    return failures;
  }

  if (!nonEmpty(p.id)) failures.push(`${loc}: id missing or empty`);
  if (!nonEmpty(p.productName)) failures.push(`${loc}: productName missing or empty`);
  if (String(p.categoryId ?? "").trim() !== "grease") {
    failures.push(`${loc}: categoryId must be "grease", got ${JSON.stringify(p.categoryId)}`);
  }
  if (!nonEmpty(p.pdsFileHint)) failures.push(`${loc}: pdsFileHint missing or empty`);

  const ind = requireStringArrayMinOne(p.industries, "industries");
  if (ind) failures.push(`${loc}: ${ind}`);

  const eq = requireStringArrayMinOne(p.equipmentTargets, "equipmentTargets");
  if (eq) failures.push(`${loc}: ${eq}`);

  const tp = requireStringArrayMinOne(p.technicalProofPoints, "technicalProofPoints");
  if (tp) failures.push(`${loc}: ${tp}`);

  const lfbb = p.lfbb && typeof p.lfbb === "object" ? p.lfbb : null;
  if (!lfbb) {
    failures.push(`${loc}: lfbb missing or not an object`);
  } else {
    if (!nonEmpty(lfbb.link)) failures.push(`${loc}: lfbb.link missing or empty`);
    if (!nonEmpty(lfbb.feature)) failures.push(`${loc}: lfbb.feature missing or empty`);
    if (!nonEmpty(lfbb.bridge)) failures.push(`${loc}: lfbb.bridge missing or empty`);
    if (!nonEmpty(lfbb.benefit)) failures.push(`${loc}: lfbb.benefit missing or empty`);
  }

  if (!nonEmpty(p.recommendedCta)) failures.push(`${loc}: recommendedCta missing or empty`);

  return failures;
}

const products = Array.isArray(GREASE_PDS_SPOTLIGHT_MAP?.products) ? GREASE_PDS_SPOTLIGHT_MAP.products : [];

/** @type {{ label: string, failures: string[] }[]} */
const results = [];

if (products.length === 0) {
  results.push({ label: "(map has no products)", failures: ["GREASE_PDS_SPOTLIGHT_MAP.products is missing or empty"] });
}

for (let i = 0; i < products.length; i++) {
  const p = products[i];
  const idPart = p && typeof p === "object" && nonEmpty(p.id) ? String(p.id) : `index-${i}`;
  const namePart = p && typeof p === "object" && nonEmpty(p.productName) ? String(p.productName) : "(no name)";
  const label = `${idPart} — ${namePart}`;
  results.push({ label, failures: verifyProduct(p, i) });
}

let passCount = 0;
let failCount = 0;

console.log("\nGREASE_PDS_SPOTLIGHT_MAP smoke tests\n" + "=".repeat(56));

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
  throw new Error(`GREASE_PDS_SPOTLIGHT_MAP smoke tests failed:\n${detail}`);
}
