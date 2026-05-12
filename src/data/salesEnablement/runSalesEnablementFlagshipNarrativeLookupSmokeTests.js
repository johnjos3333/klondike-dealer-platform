/**
 * Phase 76.3 — Smoke tests for flagship narrative lookup helpers.
 * Run: npm run test:flagship-narrative-lookup
 */

import {
  getSalesEnablementFlagshipNarrativeById,
  getSalesEnablementFlagshipNarrativeByProductName,
  normalizeSalesEnablementFlagshipProductNameLabel,
} from "./salesEnablementFlagshipNarrativeLookup.js";

/** @param {unknown} cond */
function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}

const n1 = getSalesEnablementFlagshipNarrativeByProductName("Nano EP 2 Grease");
assert(n1 && n1.id === "flagship-nano-ep-2-grease", "Nano EP 2 Grease should resolve");

const n2 = getSalesEnablementFlagshipNarrativeByProductName("KLONDIKE nano Calcium Sulfonate EP Grease");
assert(n2 && n2.id === "flagship-nano-ep-2-grease", "Official nano calcium name should resolve via alias");

const n3 = getSalesEnablementFlagshipNarrativeByProductName("15W-40 CK-4 Full Synthetic HD Engine Oil");
assert(n3 && n3.id === "flagship-15w40-ck4-full-synthetic-hd", "CK-4 full synthetic label should resolve");

const n4 = getSalesEnablementFlagshipNarrativeByProductName("KLONDIKE SAE 15W-40 Full Synthetic Heavy Duty Engine Oil");
assert(n4 && n4.id === "flagship-15w40-ck4-full-synthetic-hd", "KLONDIKE SAE 15W-40 Full Synthetic HD should resolve via alias");

const n5 = getSalesEnablementFlagshipNarrativeByProductName("Random Unknown SKU 99999");
assert(n5 === null, "Unknown product should not match");

const byId = getSalesEnablementFlagshipNarrativeById("flagship-moly-tac-ep2-grease");
assert(byId && String(byId.productName || "").includes("Moly"), "getById should return Moly Tac row");

assert(
  normalizeSalesEnablementFlagshipProductNameLabel("  KLONDIKE   AW  ") === "klondike aw",
  "normalize should collapse spacing and lower-case"
);

console.log("PASS  salesEnablementFlagshipNarrativeLookup smoke tests");
