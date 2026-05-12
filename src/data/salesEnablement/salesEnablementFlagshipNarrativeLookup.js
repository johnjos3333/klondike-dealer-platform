/**
 * Phase 76.3 — Resolve flagship dealer narratives by product name or id (data layer; preview-oriented).
 */

import { SALES_ENABLEMENT_FLAGSHIP_NARRATIVES } from "./flagshipNarratives.js";

/**
 * @param {unknown} raw
 * @returns {string}
 */
export function normalizeSalesEnablementFlagshipProductNameLabel(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalized alias → flagship `id` (see `flagshipNarratives.js`).
 * Covers counter shorthand vs official PDS product titles.
 */
export const SALES_ENABLEMENT_FLAGSHIP_PRODUCT_NAME_ALIASES_NORMALIZED = {
  "nano ep 2 grease": "flagship-nano-ep-2-grease",
  "klondike nano calcium sulfonate ep grease": "flagship-nano-ep-2-grease",
  "nano calcium sulfonate ep grease": "flagship-nano-ep-2-grease",
  "15w 40 ck 4 full synthetic hd engine oil": "flagship-15w40-ck4-full-synthetic-hd",
  "15w 40 full synthetic hd engine oil": "flagship-15w40-ck4-full-synthetic-hd",
  "klondike sae 15w 40 full synthetic heavy duty engine oil": "flagship-15w40-ck4-full-synthetic-hd",
  "sae 15w 40 full synthetic heavy duty engine oil": "flagship-15w40-ck4-full-synthetic-hd",
  "full synthetic 15w 40 heavy duty": "flagship-15w40-ck4-full-synthetic-hd",
  "klondike full synthetic 15w 40 heavy duty engine oil": "flagship-15w40-ck4-full-synthetic-hd",
  "xvi all season syn blend extreme hydraulic fluid": "flagship-xvi-all-season-extreme-hydraulic",
  "klondike xvi all season blend extreme hydraulic fluid": "flagship-xvi-all-season-extreme-hydraulic",
  "xvi all season blend extreme hydraulic fluid": "flagship-xvi-all-season-extreme-hydraulic",
  "universal tractor fluid full synthetic": "flagship-utf-full-synthetic-tractor",
  "klondike universal tractor fluid full synthetic": "flagship-utf-full-synthetic-tractor",
  "moly tac ep 2 grease": "flagship-moly-tac-ep2-grease",
  "klondike moly tac ep 2 grease": "flagship-moly-tac-ep2-grease",
};

/** @returns {import("./flagshipNarratives.js").SalesEnablementFlagshipNarrative[]} */
function listFlagships() {
  const list = SALES_ENABLEMENT_FLAGSHIP_NARRATIVES?.flagships;
  return Array.isArray(list) ? list : [];
}

/**
 * @param {unknown} id
 * @returns {import("./flagshipNarratives.js").SalesEnablementFlagshipNarrative | null}
 */
export function getSalesEnablementFlagshipNarrativeById(id) {
  const key = String(id ?? "").trim();
  if (!key) return null;
  return listFlagships().find((f) => f && typeof f === "object" && String(f.id || "").trim() === key) || null;
}

/**
 * @param {unknown} productName
 * @returns {import("./flagshipNarratives.js").SalesEnablementFlagshipNarrative | null}
 */
export function getSalesEnablementFlagshipNarrativeByProductName(productName) {
  const n = normalizeSalesEnablementFlagshipProductNameLabel(productName);
  if (!n) return null;
  const aliasId = SALES_ENABLEMENT_FLAGSHIP_PRODUCT_NAME_ALIASES_NORMALIZED[n];
  if (aliasId) {
    const byAlias = getSalesEnablementFlagshipNarrativeById(aliasId);
    if (byAlias) return byAlias;
  }
  for (const f of listFlagships()) {
    if (!f || typeof f !== "object") continue;
    if (normalizeSalesEnablementFlagshipProductNameLabel(f.productName) === n) return f;
  }
  return null;
}
