/**
 * Phase 73.8 — Pure composer: draft spotlight messaging from overlay + knowledge + profile + LFBB.
 * No UI or network dependencies.
 */

import { SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS } from "./productSpotlightOverlays.js";
import { SALES_ENABLEMENT_KNOWLEDGE } from "./salesEnablementKnowledge.js";
import { SALES_ENABLEMENT_CUSTOMER_PROFILES } from "./customerProfiles.js";
import { SALES_ENABLEMENT_LFBB_BLOCKS } from "./lfbbBlocks.js";

/** @param {unknown} s */
function norm(s) {
  if (s === null || s === undefined) return "";
  return String(s).trim();
}

function emptyLfbb() {
  return { link: "", feature: "", bridge: "", benefit: "" };
}

function buildEmptySpotlight() {
  return {
    productName: "",
    categoryTitle: "",
    customerProfileTitle: "",
    lfbb: emptyLfbb(),
    technicalProofPoints: [],
    salesAngles: [],
    suggestedCta: "",
    applicationTargets: [],
    imageAssetHint: "",
  };
}

/** @param {unknown} id */
function getOverlayById(id) {
  const key = norm(id);
  if (!key) return null;
  const list = Array.isArray(SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS?.overlays)
    ? SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS.overlays
    : [];
  const found = list.find((o) => o && typeof o === "object" && o.id === key);
  return found || null;
}

/** @param {unknown} id */
function getProfileById(id) {
  const key = norm(id);
  if (!key) return null;
  const list = Array.isArray(SALES_ENABLEMENT_CUSTOMER_PROFILES?.profiles)
    ? SALES_ENABLEMENT_CUSTOMER_PROFILES.profiles
    : [];
  const found = list.find((p) => p && typeof p === "object" && p.id === key);
  return found || null;
}

/** @param {unknown} categoryId */
function getCategoryById(categoryId) {
  const key = norm(categoryId);
  if (!key) return null;
  const cats = Array.isArray(SALES_ENABLEMENT_KNOWLEDGE?.categories)
    ? SALES_ENABLEMENT_KNOWLEDGE.categories
    : [];
  const found = cats.find((c) => c && typeof c === "object" && c.id === key);
  return found || null;
}

/** @param {unknown} blockId */
function getLfbbById(blockId) {
  const key = norm(blockId);
  if (!key) return null;
  const blocks = Array.isArray(SALES_ENABLEMENT_LFBB_BLOCKS?.blocks)
    ? SALES_ENABLEMENT_LFBB_BLOCKS.blocks
    : [];
  const found = blocks.find((b) => b && typeof b === "object" && b.id === key);
  return found || null;
}

/** @param {unknown[]} arr */
function copyStrings(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((x) => String(x ?? "").trim()).filter(Boolean);
}

/**
 * Prefer first overlay LFBB id that appears in the profile’s recommended list; else first valid overlay id;
 * else first valid profile id.
 * @param {import("./productSpotlightOverlays").SalesEnablementProductSpotlightOverlay | null} overlay
 * @param {import("./customerProfiles").SalesEnablementCustomerProfile | null} profile
 */
function selectLfbbBlock(overlay, profile) {
  if (!overlay || typeof overlay !== "object") return null;

  const overlayIds = Array.isArray(overlay.recommendedLfbbBlockIds)
    ? overlay.recommendedLfbbBlockIds.map(norm).filter(Boolean)
    : [];

  const profileIdsOrdered = Array.isArray(profile?.recommendedLfbbBlockIds)
    ? profile.recommendedLfbbBlockIds.map(norm).filter(Boolean)
    : [];
  const profileIdSet = new Set(profileIdsOrdered);

  if (profile && profileIdSet.size > 0) {
    for (const bid of overlayIds) {
      if (profileIdSet.has(bid)) {
        const b = getLfbbById(bid);
        if (b) return b;
      }
    }
  }

  for (const bid of overlayIds) {
    const b = getLfbbById(bid);
    if (b) return b;
  }

  for (const bid of profileIdsOrdered) {
    const b = getLfbbById(bid);
    if (b) return b;
  }

  return null;
}

/**
 * @param {unknown} input — `{ overlayId, customerProfileId }`
 * @returns {{
 *   ok: boolean,
 *   errors: string[],
 *   spotlight: ReturnType<typeof buildEmptySpotlight>,
 * }}
 */
export function composeSalesEnablementSpotlight(input) {
  /** @type {string[]} */
  const errors = [];
  const raw = input && typeof input === "object" ? input : {};
  const overlayId = norm(raw.overlayId);
  const customerProfileId = norm(raw.customerProfileId);

  if (!overlayId) {
    errors.push("overlayId is required");
    return { ok: false, errors, spotlight: buildEmptySpotlight() };
  }

  const overlay = getOverlayById(overlayId);
  if (!overlay) {
    errors.push(`Unknown overlay: "${overlayId}"`);
    return { ok: false, errors, spotlight: buildEmptySpotlight() };
  }

  const profile = customerProfileId ? getProfileById(customerProfileId) : null;
  if (customerProfileId && !profile) {
    errors.push(`Unknown customer profile: "${customerProfileId}"`);
  }

  const category = getCategoryById(overlay.categoryId);
  if (!category) {
    errors.push(`Unknown category for overlay: "${norm(overlay.categoryId)}"`);
  }

  const lfbbBlock = selectLfbbBlock(overlay, profile);
  if (!lfbbBlock) {
    errors.push("No LFBB block could be resolved for this composition");
  }

  const lfbb = lfbbBlock
    ? {
        link: norm(lfbbBlock.link),
        feature: norm(lfbbBlock.feature),
        bridge: norm(lfbbBlock.bridge),
        benefit: norm(lfbbBlock.benefit),
      }
    : emptyLfbb();

  const spotlight = {
    productName: norm(overlay.productName),
    categoryTitle: category ? norm(category.title) : norm(overlay.categoryId),
    customerProfileTitle: profile ? norm(profile.title) : "",
    lfbb,
    technicalProofPoints: copyStrings(overlay.technicalProofPoints),
    salesAngles: copyStrings(overlay.salesAngles),
    suggestedCta: norm(overlay.suggestedCta),
    applicationTargets: copyStrings(overlay.applicationTargets),
    imageAssetHint: norm(overlay.imageAssetHint),
  };

  return {
    ok: errors.length === 0,
    errors,
    spotlight,
  };
}
