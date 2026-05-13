/**
 * Phase 78.2 — Smoke tests for Sales Enablement preview image hints.
 * Run: npm run test:sales-enablement-product-images
 */

import { getSalesEnablementProductImageHint } from "./salesEnablementProductImageHints.js";

/** @param {unknown} cond */
function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}

/** @param {ReturnType<typeof getSalesEnablementProductImageHint>} h */
function assertMapped(h, msg) {
  assert(h.imageUrl === "/products.png" || h.imageUrl === "/klondike-full-logo.png", `${msg}: expected public asset`);
  assert(h.isPlaceholder === false, `${msg}: isPlaceholder`);
  assert(typeof h.alt === "string" && h.alt.length > 0, `${msg}: alt`);
  assert(typeof h.source === "string", `${msg}: source`);
}

/** @param {ReturnType<typeof getSalesEnablementProductImageHint>} h */
function assertPlaceholder(h, msg) {
  assert(h.imageUrl === null, `${msg}: imageUrl null`);
  assert(h.isPlaceholder === true, `${msg}: placeholder`);
  assert(h.source === "placeholder", `${msg}: source placeholder`);
}

const h1 = getSalesEnablementProductImageHint({
  spotlightMode: "product",
  spotlightId: "ps-grease-ep2",
  productName: "Nano EP 2 Grease",
});
assertMapped(h1, "Nano EP 2 by spotlight id");
assert(h1.source === "spotlight_id", "Nano should resolve via spotlight id");

const h2 = getSalesEnablementProductImageHint({
  spotlightMode: "product",
  spotlightId: "ps-unknown-spotlight-xyz",
  productName: "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid",
});
assertMapped(h2, "XVI by product name");
assert(h2.source === "product_name", "XVI should resolve via product name");

const h3 = getSalesEnablementProductImageHint({
  spotlightMode: "product",
  spotlightId: "",
  productName: "",
  pdsProductName: "Universal Tractor Fluid Full Synthetic",
});
assertMapped(h3, "UTF by pds product name");
assert(h3.source === "pds_product_name", "UTF via pds product name");

const h4 = getSalesEnablementProductImageHint({
  spotlightMode: "product",
  spotlightId: "",
  pdsFileHint: "Hydraulic Fluids PDS/KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid PDS.pdf",
});
assertMapped(h4, "XVI by pds file hint path");
assert(h4.source === "pds_file_hint", "XVI via hint path");

const h5 = getSalesEnablementProductImageHint({
  spotlightMode: "category",
  spotlightId: "cs-hydraulic-opportunity",
  categoryId: "cs-hydraulic-opportunity",
});
assertMapped(h5, "category hydraulic");
assert(h5.source === "category_id", "category id source");
assert(h5.imageUrl === "/products.png", "hydraulic category uses products art");

const h6 = getSalesEnablementProductImageHint({
  spotlightMode: "category",
  spotlightId: "cs-fleet-governance",
});
assertMapped(h6, "fleet governance");
assert(h6.imageUrl === "/klondike-full-logo.png", "governance category uses brand asset");

const h7 = getSalesEnablementProductImageHint({
  spotlightMode: "product",
  spotlightId: "ps-not-in-library-999",
  productName: "Totally Unknown Synthetic 999",
});
assertPlaceholder(h7, "unknown product");

const h8 = getSalesEnablementProductImageHint({
  spotlightMode: "product",
  spotlightId: "ps-klondike-moly-ep-grease",
});
assertMapped(h8, "Moly EP grease spotlight id");

const h9 = getSalesEnablementProductImageHint({
  spotlightMode: "product",
  spotlightId: "",
  productName: "15W-40 CK-4 Full Synthetic HD Engine Oil",
});
assertMapped(h9, "15W-40 CK-4 full synthetic by title");

const h10 = getSalesEnablementProductImageHint({
  spotlightMode: "product",
  spotlightId: "",
  productName: "HD Full Synthetic ATF",
});
assertMapped(h10, "HD Full Synthetic ATF");

console.log("PASS  salesEnablement product image hint smoke tests (10 cases)");
