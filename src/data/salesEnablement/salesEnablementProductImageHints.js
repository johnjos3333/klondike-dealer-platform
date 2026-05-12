/**
 * Phase 78.1 — Static preview-only product image hints for Guided Step 4.
 * Uses existing CRA public URLs only (no uploads). Safe for preview; not wired to send payloads.
 */

/** @typedef {{ imageSrc: string | null, alt: string }} SalesEnablementProductImageHint */

const DEFAULT_ALT = "Klondike product preview";

/** Product spotlight id → public asset under /public */
const PRODUCT_SPOTLIGHT_IMAGE_SRC = {
  "ps-grease-ep2": "/products.png",
  "ps-klondike-moly-ep-grease": "/products.png",
  "ps-klondike-aw-hydraulic": "/products.png",
  "ps-klondike-aw-synthetic-hydraulic": "/products.png",
  "ps-agrimax-zf": "/products.png",
  "ps-klondike-15w40-ck4-hd": "/products.png",
  "ps-klondike-coolant-antifreeze": "/products.png",
};

/**
 * @param {{ spotlightId?: unknown, spotlightMode?: unknown, mockImageId?: unknown }} params
 * @returns {SalesEnablementProductImageHint}
 */
export function getSalesEnablementProductImageHint(params) {
  const id = String(params?.spotlightId ?? "").trim();
  const mode = String(params?.spotlightMode ?? "product").trim();
  if (mode !== "product" || !id) {
    return { imageSrc: null, alt: DEFAULT_ALT };
  }
  const src = PRODUCT_SPOTLIGHT_IMAGE_SRC[id] || null;
  return { imageSrc: src, alt: DEFAULT_ALT };
}
