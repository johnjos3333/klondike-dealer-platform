/**
 * Node smoke tests for `productNarrativeComposer.js` (deterministic narrative engine).
 * Run: node src/data/salesEnablement/runProductNarrativeComposerSmokeTests.js
 */

import {
  buildAdvisorProductExplanation,
  buildCategoryNarrative,
  buildCustomerProfileNarrative,
  buildProductNarrative,
  buildSalesEnablementSpotlightNarrative,
} from "../../utils/productNarrativeComposer.js";
import { NARRATIVE_SECTION_BLUEPRINT } from "../productNarrativeTemplates.js";

/** @param {unknown} s */
function nonEmptyString(s) {
  return typeof s === "string" && s.trim().length > 0;
}

/** @param {unknown} res */
function assertNarrativeResponse(label, res) {
  if (!res || typeof res !== "object") {
    throw new Error(`${label}: expected response object`);
  }
  if (!nonEmptyString(res.title)) {
    throw new Error(`${label}: expected non-empty title`);
  }
  if (!nonEmptyString(res.directAnswer) && !nonEmptyString(res.summary)) {
    throw new Error(`${label}: expected directAnswer or summary`);
  }
  if (!Array.isArray(res.sections)) {
    throw new Error(`${label}: expected sections array`);
  }
  const expectedTitles = NARRATIVE_SECTION_BLUEPRINT.map((b) => b.title);
  const gotTitles = res.sections.map((s) => (s && s.title ? String(s.title) : "")).filter(Boolean);
  for (const t of expectedTitles) {
    if (!gotTitles.includes(t)) {
      throw new Error(`${label}: missing narrative section title "${t}". Got: ${gotTitles.join(" | ")}`);
    }
  }
  if (!Array.isArray(res.cautionNotes) || res.cautionNotes.length === 0) {
    throw new Error(`${label}: expected non-empty cautionNotes array`);
  }
}

const CASES = [
  { label: 'buildProductNarrative("Nano EP2")', run: () => buildProductNarrative("Nano EP2") },
  {
    label: 'buildAdvisorProductExplanation("Nano EP2", { role: "maintenance manager" })',
    run: () => buildAdvisorProductExplanation("Nano EP2", { role: "maintenance manager" }),
  },
  { label: 'buildCategoryNarrative("hydraulic fluids")', run: () => buildCategoryNarrative("hydraulic fluids") },
  { label: 'buildCategoryNarrative("greases")', run: () => buildCategoryNarrative("greases") },
  { label: 'buildCustomerProfileNarrative("mining")', run: () => buildCustomerProfileNarrative("mining") },
  {
    label: 'buildSalesEnablementSpotlightNarrative("product_spotlight", "Nano EP2")',
    run: () => buildSalesEnablementSpotlightNarrative("product_spotlight", "Nano EP2"),
  },
  {
    label: 'buildSalesEnablementSpotlightNarrative("category_spotlight", "hydraulic fluids")',
    run: () => buildSalesEnablementSpotlightNarrative("category_spotlight", "hydraulic fluids"),
  },
  {
    label: 'buildSalesEnablementSpotlightNarrative("customer_profile", "quarry")',
    run: () => buildSalesEnablementSpotlightNarrative("customer_profile", "quarry"),
  },
];

console.log("\nproductNarrativeComposer smoke tests\n" + "=".repeat(56));

for (const c of CASES) {
  try {
    const res = c.run();
    assertNarrativeResponse(c.label, res);
    console.log(`PASS  ${c.label}`);
  } catch (e) {
    console.log(`FAIL  ${c.label}`);
    console.error(e instanceof Error ? e.message : e);
    throw e;
  }
}

console.log("=".repeat(56));
console.log(`All ${CASES.length} cases passed.\n`);
