/**
 * Phase 73.15 — Development demo: composeSalesEnablementCategorySpotlight.
 * Run: npm run demo:sales-enablement-category-composer
 */

import { composeSalesEnablementCategorySpotlight } from "./composeSalesEnablementCategorySpotlight.js";

const EXAMPLES = [
  {
    label: "Severe-Duty Grease Program · mining",
    overlayId: "cat-overlay-severe-duty-grease-program",
    customerProfileId: "mining_aggregate",
  },
  {
    label: "Hydraulic Reliability Program · construction",
    overlayId: "cat-overlay-hydraulic-reliability-program",
    customerProfileId: "construction",
  },
  {
    label: "Heavy-Duty Engine Oil Program · trucking",
    overlayId: "cat-overlay-hd-engine-oil-program",
    customerProfileId: "trucking_fleet",
  },
  {
    label: "Synthetic Conversion Program · municipal",
    overlayId: "cat-overlay-synthetic-conversion-program",
    customerProfileId: "municipal_fleet",
  },
  {
    label: "Mixed Fleet / Tractor Fluids Program · agriculture",
    overlayId: "cat-overlay-mixed-fleet-tractor-fluids-program",
    customerProfileId: "agriculture",
  },
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

  const { ok, errors, spotlight } = composeSalesEnablementCategorySpotlight({
    overlayId: ex.overlayId,
    customerProfileId: ex.customerProfileId,
  });

  console.log("Status:", ok ? "OK" : "FAILED");
  if (errors.length) {
    console.log("Errors:");
    for (const e of errors) console.log("  -", e);
  }

  console.log("\nTitle:              ", spotlight.title || "(empty)");
  console.log("Category:           ", spotlight.categoryTitle || "(empty)");
  console.log("Customer profile:   ", spotlight.customerProfileTitle || "(empty)");
  console.log("LFBB block id:      ", spotlight.lfbbBlockId || "(empty)");
  console.log("LFBB selection:     ", spotlight.lfbbSelectionReason || "(empty)");

  console.log("\nLFBB:");
  printLfbb(spotlight.lfbb);

  printBullets("\nProduct line focus:", spotlight.productLineFocus);
  printBullets("\nProof points:", spotlight.technicalProofPoints);
  console.log("\nCTA:");
  console.log(" ", spotlight.suggestedCta || "(empty)");
}

console.log("\n" + "=".repeat(72));
console.log("Done —", EXAMPLES.length, "examples");
console.log("=".repeat(72) + "\n");
