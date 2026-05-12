/**
 * Phase 75.0 — Development demo: print selected HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP rows.
 * Run: npm run demo:hd-engine-oil-pds-spotlights
 */

import { HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP } from "./hdEngineOilPdsSpotlightMap.js";

const DEMO_CATEGORY_IDS = [
  "hd-cat-advanced-mixed-fleet-program",
  "hd-cat-natural-gas-engine-reliability-program",
];

const DEMO_PRODUCT_NAMES = [
  "KLONDIKE SAE 15W-40 Advanced Formula Heavy Duty Engine Oil",
  "KLONDIKE SAE 10W-30 FA-4 Synthetic Blend Heavy Duty Engine Oil",
  "KLONDIKE SAE 40 Low Ash Natural Gas Engine Oil",
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

const cats = Array.isArray(HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP?.categorySpotlights)
  ? HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.categorySpotlights
  : [];
const products = Array.isArray(HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP?.products)
  ? HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.products
  : [];

console.log("HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP demo (Phase 75.0)");
console.log(
  `version: ${HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP?.version ?? "(none)"}  categoryId: ${HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP?.categoryId ?? "(none)"}`
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
