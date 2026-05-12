/**
 * Phase 76.0 — Development demo: print selected HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP rows.
 * Run: npm run demo:hydraulic-fluid-pds-spotlights
 */

import { HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP } from "./hydraulicFluidPdsSpotlightMap.js";

const DEMO_CATEGORY_IDS = [
  "hydr-cat-professional-series-hydraulic-protection",
  "hydr-cat-tractor-wet-brake-protection",
];

const DEMO_PRODUCT_NAMES = [
  "KLONDIKE Commercial AW Hydraulic Fluids",
  "KLONDIKE FOOD-GRADE Hydraulic Oils",
];

function printBullets(label, items) {
  console.log(label);
  const list = Array.isArray(items) ? items : [];
  if (list.length === 0) {
    console.log("  (none)");
    return;
  }
  for (const line of list) console.log(`  - ${line}`);
}

function printLfbb(prefix, lfbb) {
  console.log(`${prefix}LFBB`);
  if (!lfbb || typeof lfbb !== "object") {
    console.log("  (missing)");
    return;
  }
  console.log(`  link:    ${lfbb.link || "(empty)"}`);
  console.log(`  feature: ${lfbb.feature || "(empty)"}`);
  console.log(`  bridge:  ${lfbb.bridge || "(empty)"}`);
  console.log(`  benefit: ${lfbb.benefit || "(empty)"}`);
}

const cats = Array.isArray(HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP?.categorySpotlights)
  ? HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP.categorySpotlights
  : [];
const products = Array.isArray(HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP?.products)
  ? HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP.products
  : [];

console.log("HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP demo (Phase 76.0)");
console.log(
  `version: ${HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP?.version ?? "(none)"}  categoryId: ${HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP?.categoryId ?? "(none)"}`
);
console.log(`categorySpotlights: ${cats.length}  products: ${products.length}`);

for (const cid of DEMO_CATEGORY_IDS) {
  const c = cats.find((x) => x && typeof x === "object" && String(x.id) === cid);
  console.log("\n" + "=".repeat(72));
  console.log(`CATEGORY · ${cid}`);
  console.log("=".repeat(72));
  if (!c) {
    console.log("(not found)");
    continue;
  }
  console.log(`title: ${c.title}`);
  console.log(`positioningTier: ${c.positioningTier}`);
  printBullets("recommendedProducts", c.recommendedProducts);
  printBullets("industries", c.industries);
  printBullets("customerProfiles", c.customerProfiles);
  printLfbb("", c.lfbb);
  console.log("recommended CTA");
  console.log(`  ${c.recommendedCta || "(empty)"}`);
}

for (const productName of DEMO_PRODUCT_NAMES) {
  const p = products.find((x) => x && typeof x === "object" && String(x.productName) === productName);
  console.log("\n" + "=".repeat(72));
  console.log(`PRODUCT · ${productName}`);
  console.log("=".repeat(72));
  if (!p) {
    console.log("(not found)");
    continue;
  }
  console.log(`positioningTier: ${p.positioningTier}`);
  printBullets("industries", p.industries);
  printBullets("technicalProofPoints", p.technicalProofPoints);
  printLfbb("", p.lfbb);
  console.log("recommended CTA");
  console.log(`  ${p.recommendedCta || "(empty)"}`);
}

console.log("\n" + "=".repeat(72));
console.log("Done.");
console.log("=".repeat(72));
