/**
 * Phase 73.3 — Sales Enablement knowledge foundation index (data + pure lookups).
 * Re-exports canonical datasets; helpers are defensive and side-effect free.
 * Not wired to UI or sends.
 */

import { SALES_ENABLEMENT_KNOWLEDGE } from "./salesEnablementKnowledge";
import { SALES_ENABLEMENT_LFBB_BLOCKS } from "./lfbbBlocks";
import { SALES_ENABLEMENT_CUSTOMER_PROFILES } from "./customerProfiles";

export { SALES_ENABLEMENT_KNOWLEDGE } from "./salesEnablementKnowledge";
export { SALES_ENABLEMENT_LFBB_BLOCKS } from "./lfbbBlocks";
export { SALES_ENABLEMENT_CUSTOMER_PROFILES } from "./customerProfiles";

/** @param {unknown} id */
function normId(id) {
  if (id === null || id === undefined) return "";
  const s = String(id).trim();
  return s;
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
