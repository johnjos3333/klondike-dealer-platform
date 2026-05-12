/**
 * Phase 74.3 — Development demo: print selected GREASE_PDS_SPOTLIGHT_MAP rows for copy review.
 * Run: npm run demo:grease-pds-spotlights
 */

import { GREASE_PDS_SPOTLIGHT_MAP } from "./greasePdsSpotlightMap.js";

const DEMO_PRODUCT_NAMES = [
  "KLONDIKE HD Hammer Grease",
  "KLONDIKE nano Calcium Sulfonate EP Grease",
  "KLONDIKE Moly Tac EP-2 Grease",
  "KLONDIKE Open Gear Grease",
  "KLONDIKE Ultra Tac Synthetic Blend EP Greases",
];

function printBullets(label, items) {
  console.log(label);
  const list = Array.isArray(items) ? items : [];
  if (list.length === 0) {
    console.log("  (none)");
    return;
  }
  for (const line of list) {
    console.log(`  - ${line}`);
  }
}

function printLfbb(lfbb) {
  if (!lfbb || typeof lfbb !== "object") {
    console.log("LFBB");
    console.log("  (missing)");
    return;
  }
  console.log("LFBB");
  console.log(`  link:    ${lfbb.link || "(empty)"}`);
  console.log(`  feature: ${lfbb.feature || "(empty)"}`);
  console.log(`  bridge:  ${lfbb.bridge || "(empty)"}`);
  console.log(`  benefit: ${lfbb.benefit || "(empty)"}`);
}

const products = Array.isArray(GREASE_PDS_SPOTLIGHT_MAP?.products) ? GREASE_PDS_SPOTLIGHT_MAP.products : [];

console.log("GREASE_PDS_SPOTLIGHT_MAP demo (Phase 74.3)");
console.log(`Map version: ${GREASE_PDS_SPOTLIGHT_MAP?.version ?? "(none)"}  categoryId: ${GREASE_PDS_SPOTLIGHT_MAP?.categoryId ?? "(none)"}`);
console.log(`Total products in map: ${products.length}`);

for (const productName of DEMO_PRODUCT_NAMES) {
  const p = products.find((x) => x && typeof x === "object" && String(x.productName) === productName);
  console.log("\n" + "=".repeat(72));
  console.log(productName);
  console.log("=".repeat(72));

  if (!p) {
    console.log("(not found in GREASE_PDS_SPOTLIGHT_MAP.products — check productName spelling)");
    continue;
  }

  console.log(`productName: ${p.productName}`);
  console.log(`id: ${p.id || "(none)"}`);
  printBullets("industries", p.industries);
  printBullets("equipmentTargets", p.equipmentTargets);
  printBullets("painPoints", p.painPoints);
  printLfbb(p.lfbb);
  printBullets("technicalProofPoints", p.technicalProofPoints);
  console.log("recommended CTA");
  console.log(`  ${p.recommendedCta || "(empty)"}`);
}

console.log("\n" + "=".repeat(72));
console.log("Done.");
console.log("=".repeat(72));
