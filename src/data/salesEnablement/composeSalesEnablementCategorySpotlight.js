/**
 * Phase 73.14 — Pure composer: draft category spotlight messaging from category overlay + knowledge + profile + LFBB.
 * LFBB selection mirrors composeSalesEnablementSpotlight (intersection, deterministic tie-break, audited reasons).
 * No UI or network dependencies.
 */

import { SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS } from "./categorySpotlightOverlays.js";
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
    title: "",
    categoryTitle: "",
    customerProfileTitle: "",
    lfbb: emptyLfbb(),
    lfbbBlockId: "",
    lfbbSelectionReason: "",
    productLineFocus: [],
    technicalProofPoints: [],
    salesAngles: [],
    suggestedCta: "",
    primaryPainPoints: [],
    imageAssetHint: "",
  };
}

/** @param {unknown} id */
function getCategoryOverlayById(id) {
  const key = norm(id);
  if (!key) return null;
  const list = Array.isArray(SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS?.overlays)
    ? SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS.overlays
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
function getCategoryKnowledgeById(categoryId) {
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
 * Same rules as product composer: overlay.recommendedLfbbBlockIds order is canonical for intersection ties.
 * @param {import("./categorySpotlightOverlays").SalesEnablementCategorySpotlightOverlay} overlay
 * @param {import("./customerProfiles").SalesEnablementCustomerProfile | null} profile
 * @param {string} requestedProfileId
 * @param {boolean} profileLookupFailed
 */
function selectLfbbWithReason(overlay, profile, requestedProfileId, profileLookupFailed) {
  /** @type {{ block: import("./lfbbBlocks").SalesEnablementLfbbBlock | null, lfbbBlockId: string, lfbbSelectionReason: string }} */
  const none = { block: null, lfbbBlockId: "", lfbbSelectionReason: "" };

  if (!overlay || typeof overlay !== "object") {
    return {
      ...none,
      lfbbSelectionReason:
        "none: Category overlay missing; cannot evaluate LFBB lists.",
    };
  }

  const overlayIds = Array.isArray(overlay.recommendedLfbbBlockIds)
    ? overlay.recommendedLfbbBlockIds.map(norm).filter(Boolean)
    : [];

  const profileIdsOrdered = Array.isArray(profile?.recommendedLfbbBlockIds)
    ? profile.recommendedLfbbBlockIds.map(norm).filter(Boolean)
    : [];
  const profileIdSet = new Set(profileIdsOrdered);

  /** @param {string} bid @param {string} reason */
  const resolved = (bid, reason) => {
    const b = getLfbbById(bid);
    if (!b) return null;
    return { block: b, lfbbBlockId: bid, lfbbSelectionReason: reason };
  };

  const skipIntersection =
    !requestedProfileId ||
    profileLookupFailed ||
    !profile ||
    profileIdSet.size === 0;

  if (skipIntersection) {
    let prefix = "";
    if (!requestedProfileId) {
      prefix =
        "no_customer_profile_id: customerProfileId was omitted; skipped overlay/profile intersection.";
    } else if (profileLookupFailed) {
      prefix =
        "unknown_customer_profile: customerProfileId did not resolve to a profile; skipped intersection.";
    } else if (profile && profileIdSet.size === 0) {
      prefix = `profile_has_no_lfbb_refs: profile "${profile.id}" has no recommendedLfbbBlockIds; skipped intersection.`;
    } else {
      prefix = "no_profile_context: skipped intersection.";
    }

    for (const bid of overlayIds) {
      const r = resolved(
        bid,
        `${prefix} Using first resolvable id in overlay.recommendedLfbbBlockIds order: "${bid}".`
      );
      if (r) return r;
    }

    for (const bid of profileIdsOrdered) {
      const r = resolved(
        bid,
        `${prefix} No resolvable LFBB on overlay list; using first resolvable id in profile.recommendedLfbbBlockIds order: "${bid}".`
      );
      if (r) return r;
    }

    return {
      ...none,
      lfbbSelectionReason: `${prefix} No LFBB rows resolved from overlay or profile id lists.`,
    };
  }

  /** @type {string[]} */
  const intersectionResolved = [];
  for (const bid of overlayIds) {
    if (!profileIdSet.has(bid)) continue;
    if (getLfbbById(bid)) intersectionResolved.push(bid);
  }

  if (intersectionResolved.length > 0) {
    const chosen = intersectionResolved[0];
    const tieNote =
      intersectionResolved.length > 1
        ? ` Among ${intersectionResolved.length} shared id(s) that resolve in both lists, overlay.recommendedLfbbBlockIds order is the tie-break (first wins).`
        : " Single shared id between overlay and profile lists.";
    const r = resolved(
      chosen,
      `intersection_overlay_priority: Matched overlay and profile recommendations.${tieNote} Selected "${chosen}".`
    );
    if (r) return r;
  }

  for (const bid of overlayIds) {
    const r = resolved(
      bid,
      `no_intersection: Profile "${profile.id}" shares no resolvable LFBB id with overlay recommendations (or ids do not resolve). Using first resolvable id in overlay.recommendedLfbbBlockIds order: "${bid}".`
    );
    if (r) return r;
  }

  for (const bid of profileIdsOrdered) {
    const r = resolved(
      bid,
      `fallback_profile_order: No resolvable LFBB on overlay list after empty intersection; using first resolvable id in profile.recommendedLfbbBlockIds order: "${bid}".`
    );
    if (r) return r;
  }

  return {
    ...none,
    lfbbSelectionReason:
      "none: No LFBB rows resolved after intersection, overlay-order, and profile-order passes.",
  };
}

/**
 * @param {unknown} input — `{ overlayId, customerProfileId }`
 * @returns {{
 *   ok: boolean,
 *   errors: string[],
 *   spotlight: ReturnType<typeof buildEmptySpotlight>,
 * }}
 */
export function composeSalesEnablementCategorySpotlight(input) {
  /** @type {string[]} */
  const errors = [];
  const raw = input && typeof input === "object" ? input : {};
  const overlayId = norm(raw.overlayId);
  const requestedProfileId = norm(raw.customerProfileId);

  if (!overlayId) {
    errors.push("overlayId is required");
    return { ok: false, errors, spotlight: buildEmptySpotlight() };
  }

  const overlay = getCategoryOverlayById(overlayId);
  if (!overlay) {
    errors.push(`Unknown category spotlight overlay: "${overlayId}"`);
    return { ok: false, errors, spotlight: buildEmptySpotlight() };
  }

  const profile = requestedProfileId ? getProfileById(requestedProfileId) : null;
  const profileLookupFailed = Boolean(requestedProfileId) && !profile;
  if (profileLookupFailed) {
    errors.push(`Unknown customer profile: "${requestedProfileId}"`);
  }

  const category = getCategoryKnowledgeById(overlay.categoryId);
  if (!category) {
    errors.push(`Unknown category for overlay: "${norm(overlay.categoryId)}"`);
  }

  const { block: lfbbBlock, lfbbBlockId, lfbbSelectionReason } = selectLfbbWithReason(
    overlay,
    profile,
    requestedProfileId,
    profileLookupFailed
  );

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
    title: norm(overlay.title),
    categoryTitle: category ? norm(category.title) : norm(overlay.categoryId),
    customerProfileTitle: profile ? norm(profile.title) : "",
    lfbb,
    lfbbBlockId: lfbbBlock ? lfbbBlockId : "",
    lfbbSelectionReason: lfbbSelectionReason || "",
    productLineFocus: copyStrings(overlay.productLineFocus),
    technicalProofPoints: copyStrings(overlay.technicalProofPoints),
    salesAngles: copyStrings(overlay.salesAngles),
    suggestedCta: norm(overlay.suggestedCta),
    primaryPainPoints: copyStrings(overlay.primaryPainPoints),
    imageAssetHint: norm(overlay.imageAssetHint),
  };

  return {
    ok: errors.length === 0,
    errors,
    spotlight,
  };
}
