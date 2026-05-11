/**
 * Phase 73.9 — Development demo: composeSalesEnablementSpotlight with starter overlays + profiles.
 * Run: npm run demo:sales-enablement-composer
 */

import { composeSalesEnablementSpotlight } from "./composeSalesEnablementSpotlight.js";

const EXAMPLES = [
  { label: "Nano EP 2 Grease · mining", overlayId: "overlay-nano-ep2-grease", customerProfileId: "mining_aggregate" },
  { label: "AW Hydraulic Fluids · construction", overlayId: "overlay-aw-hydraulic-fluids", customerProfileId: "construction" },
  { label: "Full Synthetic 15W-40 · trucking", overlayId: "overlay-full-synthetic-15w40-hd", customerProfileId: "trucking_fleet" },
  { label: "Universal Tractor Fluid · agriculture", overlayId: "overlay-universal-tractor-fluid", customerProfileId: "agriculture" },
  { label: "HD Full Synthetic ATF · municipal", overlayId: "overlay-hd-full-synthetic-atf", customerProfileId: "municipal_fleet" },
];

function printLfbb(lfbb) {
  console.log("  Link:    ", lfbb?.link || "(empty)");
  console.log("  Feature: ", lfbb?.feature || "(empty)");
  console.log("  Bridge:  ", lfbb?.bridge || "(empty)");
  console.log("  Benefit: ", lfbb?.benefit || "(empty)");
}

function printBullets(title, items) {
  console.log(title);
  const list = Array.isArray(items) ? items : [];
  if (list.length === 0) {
    console.log("  (none)");
    return;
  }
  for (const line of list) console.log(`  - ${line}`);
}

for (const ex of EXAMPLES) {
  console.log("\n" + "=".repeat(72));
  console.log(ex.label);
  console.log("=".repeat(72));

  const { ok, errors, spotlight } = composeSalesEnablementSpotlight({
    overlayId: ex.overlayId,
    customerProfileId: ex.customerProfileId,
  });

  console.log("Status:", ok ? "OK" : "FAILED");
  if (errors.length) {
    console.log("Errors:");
    for (const e of errors) console.log("  -", e);
  }

  console.log("\nProduct name:       ", spotlight.productName || "(empty)");
  console.log("Category:           ", spotlight.categoryTitle || "(empty)");
  console.log("Customer profile:   ", spotlight.customerProfileTitle || "(empty)");

  console.log("\nLFBB:");
  printLfbb(spotlight.lfbb);

  printBullets("\nProof points:", spotlight.technicalProofPoints);
  printBullets("\nSales angles:", spotlight.salesAngles);
  printBullets("\nApplication targets:", spotlight.applicationTargets);
  console.log("\nCTA:");
  console.log(" ", spotlight.suggestedCta || "(empty)");
}

console.log("\n" + "=".repeat(72));
console.log("Done —", EXAMPLES.length, "examples");
console.log("=".repeat(72) + "\n");
