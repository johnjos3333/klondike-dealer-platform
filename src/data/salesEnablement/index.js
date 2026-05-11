/**
 * Phase 73.3 / 73.5 / 73.13 — Sales Enablement knowledge foundation index (data + pure lookups).
 * Re-exports canonical datasets; helpers are defensive and side-effect free.
 * Not wired to UI or sends.
 */

import { SALES_ENABLEMENT_KNOWLEDGE } from "./salesEnablementKnowledge";
import { SALES_ENABLEMENT_LFBB_BLOCKS } from "./lfbbBlocks";
import { SALES_ENABLEMENT_CUSTOMER_PROFILES } from "./customerProfiles";
import { SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS } from "./productSpotlightOverlays";
import { SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS } from "./categorySpotlightOverlays";

export { SALES_ENABLEMENT_KNOWLEDGE } from "./salesEnablementKnowledge";
export { SALES_ENABLEMENT_LFBB_BLOCKS } from "./lfbbBlocks";
export { SALES_ENABLEMENT_CUSTOMER_PROFILES } from "./customerProfiles";
export { SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS } from "./productSpotlightOverlays";
export { SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS } from "./categorySpotlightOverlays";

/** @param {unknown} id */
function normId(id) {
  if (id === null || id === undefined) return "";
  const s = String(id).trim();
  return s;
}

/** @returns {import("./productSpotlightOverlays").SalesEnablementProductSpotlightOverlay[]} */
function getProductSpotlightOverlaysList() {
  const root = SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS;
  return root && Array.isArray(root.overlays) ? root.overlays : [];
}

/**
 * @param {unknown} overlayId
 * @returns {import("./productSpotlightOverlays").SalesEnablementProductSpotlightOverlay | null}
 */
export function getSalesEnablementProductOverlayById(overlayId) {
  const key = normId(overlayId);
  if (!key) return null;
  const list = getProductSpotlightOverlaysList();
  const found = list.find((o) => o && typeof o === "object" && o.id === key);
  return found || null;
}

/**
 * @param {unknown} categoryId
 * @returns {import("./productSpotlightOverlays").SalesEnablementProductSpotlightOverlay[]}
 */
export function getSalesEnablementProductOverlaysForCategory(categoryId) {
  const key = normId(categoryId);
  if (!key) return [];
  return getProductSpotlightOverlaysList().filter(
    (o) => o && typeof o === "object" && o.categoryId === key
  );
}

/**
 * @param {unknown} profileId
 * @returns {import("./productSpotlightOverlays").SalesEnablementProductSpotlightOverlay[]}
 */
export function getSalesEnablementProductOverlaysForProfile(profileId) {
  const key = normId(profileId);
  if (!key) return [];
  return getProductSpotlightOverlaysList().filter((o) => {
    if (!o || typeof o !== "object") return false;
    const ids = Array.isArray(o.recommendedCustomerProfileIds) ? o.recommendedCustomerProfileIds : [];
    return ids.some((raw) => normId(raw) === key);
  });
}

/**
 * @param {unknown} blockId
 * @returns {import("./productSpotlightOverlays").SalesEnablementProductSpotlightOverlay[]}
 */
export function getSalesEnablementProductOverlaysForLfbbBlock(blockId) {
  const key = normId(blockId);
  if (!key) return [];
  return getProductSpotlightOverlaysList().filter((o) => {
    if (!o || typeof o !== "object") return false;
    const ids = Array.isArray(o.recommendedLfbbBlockIds) ? o.recommendedLfbbBlockIds : [];
    return ids.some((raw) => normId(raw) === key);
  });
}

/** @returns {import("./categorySpotlightOverlays").SalesEnablementCategorySpotlightOverlay[]} */
function getCategorySpotlightOverlaysList() {
  const root = SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS;
  return root && Array.isArray(root.overlays) ? root.overlays : [];
}

/**
 * @param {unknown} overlayId
 * @returns {import("./categorySpotlightOverlays").SalesEnablementCategorySpotlightOverlay | null}
 */
export function getSalesEnablementCategoryOverlayById(overlayId) {
  const key = normId(overlayId);
  if (!key) return null;
  const list = getCategorySpotlightOverlaysList();
  const found = list.find((o) => o && typeof o === "object" && o.id === key);
  return found || null;
}

/**
 * Knowledge-base category id (e.g. `grease`) — not to be confused with category spotlight overlay id.
 * @param {unknown} categoryId
 * @returns {import("./categorySpotlightOverlays").SalesEnablementCategorySpotlightOverlay[]}
 */
export function getSalesEnablementCategoryOverlaysForCategory(categoryId) {
  const key = normId(categoryId);
  if (!key) return [];
  return getCategorySpotlightOverlaysList().filter(
    (o) => o && typeof o === "object" && o.categoryId === key
  );
}

/**
 * @param {unknown} profileId
 * @returns {import("./categorySpotlightOverlays").SalesEnablementCategorySpotlightOverlay[]}
 */
export function getSalesEnablementCategoryOverlaysForProfile(profileId) {
  const key = normId(profileId);
  if (!key) return [];
  return getCategorySpotlightOverlaysList().filter((o) => {
    if (!o || typeof o !== "object") return false;
    const ids = Array.isArray(o.recommendedCustomerProfileIds) ? o.recommendedCustomerProfileIds : [];
    return ids.some((raw) => normId(raw) === key);
  });
}

/**
 * @param {unknown} blockId
 * @returns {import("./categorySpotlightOverlays").SalesEnablementCategorySpotlightOverlay[]}
 */
export function getSalesEnablementCategoryOverlaysForLfbbBlock(blockId) {
  const key = normId(blockId);
  if (!key) return [];
  return getCategorySpotlightOverlaysList().filter((o) => {
    if (!o || typeof o !== "object") return false;
    const ids = Array.isArray(o.recommendedLfbbBlockIds) ? o.recommendedLfbbBlockIds : [];
    return ids.some((raw) => normId(raw) === key);
  });
}

/**
 * @param {unknown} categoryId
 * @returns {import("./salesEnablementKnowledge").SalesEnablementCategoryKnowledge | null}
 */
export function getSalesEnablementCategoryById(categoryId) {
  const key = normId(categoryId);
  if (!key) return null;
  const root = SALES_ENABLEMENT_KNOWLEDGE;
  const cats = root && Array.isArray(root.categories) ? root.categories : null;
  if (!cats) return null;
  const found = cats.find((c) => c && typeof c === "object" && c.id === key);
  return found || null;
}

/**
 * @param {unknown} profileId
 * @returns {import("./customerProfiles").SalesEnablementCustomerProfile | null}
 */
export function getSalesEnablementCustomerProfileById(profileId) {
  const key = normId(profileId);
  if (!key) return null;
  const root = SALES_ENABLEMENT_CUSTOMER_PROFILES;
  const profiles = root && Array.isArray(root.profiles) ? root.profiles : null;
  if (!profiles) return null;
  const found = profiles.find((p) => p && typeof p === "object" && p.id === key);
  return found || null;
}

/**
 * @param {unknown} blockId
 * @returns {import("./lfbbBlocks").SalesEnablementLfbbBlock | null}
 */
export function getSalesEnablementLfbbBlockById(blockId) {
  const key = normId(blockId);
  if (!key) return null;
  const root = SALES_ENABLEMENT_LFBB_BLOCKS;
  const blocks = root && Array.isArray(root.blocks) ? root.blocks : null;
  if (!blocks) return null;
  const found = blocks.find((b) => b && typeof b === "object" && b.id === key);
  return found || null;
}

/**
 * LFBB blocks for a product category id (e.g. `grease`, `hydraulic_fluids`).
 * @param {unknown} categoryId
 * @returns {import("./lfbbBlocks").SalesEnablementLfbbBlock[]}
 */
export function getSalesEnablementLfbbBlocksForCategory(categoryId) {
  const key = normId(categoryId);
  if (!key) return [];
  const root = SALES_ENABLEMENT_LFBB_BLOCKS;
  const blocks = root && Array.isArray(root.blocks) ? root.blocks : null;
  if (!blocks) return [];
  return blocks.filter((b) => b && typeof b === "object" && b.categoryId === key);
}

/**
 * LFBB blocks referenced by a customer profile’s `recommendedLfbbBlockIds` (resolved in list order; unknown ids skipped).
 * @param {unknown} profileId
 * @returns {import("./lfbbBlocks").SalesEnablementLfbbBlock[]}
 */
export function getSalesEnablementLfbbBlocksForProfile(profileId) {
  const profile = getSalesEnablementCustomerProfileById(profileId);
  if (!profile) return [];
  const ids = Array.isArray(profile.recommendedLfbbBlockIds) ? profile.recommendedLfbbBlockIds : [];
  /** @type {import("./lfbbBlocks").SalesEnablementLfbbBlock[]} */
  const out = [];
  const seen = new Set();
  for (const raw of ids) {
    const id = normId(raw);
    if (!id || seen.has(id)) continue;
    const block = getSalesEnablementLfbbBlockById(id);
    if (block) {
      seen.add(id);
      out.push(block);
    }
  }
  return out;
}
