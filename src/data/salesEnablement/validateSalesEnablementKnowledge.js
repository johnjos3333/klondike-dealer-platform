/**
 * Phase 73.6 — Development-only integrity checks for Sales Enablement knowledge data.
 * Does not throw by default. Not wired to UI or build pipeline.
 */

import { SALES_ENABLEMENT_KNOWLEDGE } from "./salesEnablementKnowledge.js";
import { SALES_ENABLEMENT_LFBB_BLOCKS } from "./lfbbBlocks.js";
import { SALES_ENABLEMENT_CUSTOMER_PROFILES } from "./customerProfiles.js";
import { SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS } from "./productSpotlightOverlays.js";

/**
 * @returns {{ ok: boolean, errors: string[], warnings: string[] }}
 */
export function validateSalesEnablementKnowledge() {
  /** @type {string[]} */
  const errors = [];
  /** @type {string[]} */
  const warnings = [];

  const cats = Array.isArray(SALES_ENABLEMENT_KNOWLEDGE?.categories)
    ? SALES_ENABLEMENT_KNOWLEDGE.categories
    : [];
  const categoryIds = new Set(
    cats.filter((c) => c && typeof c === "object" && String(c.id || "").trim()).map((c) => String(c.id).trim())
  );
  if (categoryIds.size === 0) {
    errors.push("SALES_ENABLEMENT_KNOWLEDGE.categories is missing or empty");
  }

  const profiles = Array.isArray(SALES_ENABLEMENT_CUSTOMER_PROFILES?.profiles)
    ? SALES_ENABLEMENT_CUSTOMER_PROFILES.profiles
    : [];
  const profileIds = new Set(
    profiles
      .filter((p) => p && typeof p === "object" && String(p.id || "").trim())
      .map((p) => String(p.id).trim())
  );
  if (profileIds.size === 0) {
    errors.push("SALES_ENABLEMENT_CUSTOMER_PROFILES.profiles is missing or empty");
  }

  const lfbbBlocks = Array.isArray(SALES_ENABLEMENT_LFBB_BLOCKS?.blocks)
    ? SALES_ENABLEMENT_LFBB_BLOCKS.blocks
    : [];
  const lfbbIds = new Set(
    lfbbBlocks
      .filter((b) => b && typeof b === "object" && String(b.id || "").trim())
      .map((b) => String(b.id).trim())
  );
  if (lfbbIds.size === 0) {
    errors.push("SALES_ENABLEMENT_LFBB_BLOCKS.blocks is missing or empty");
  }

  const seenLfbbIds = new Set();
  for (const b of lfbbBlocks) {
    if (!b || typeof b !== "object") continue;
    const bid = String(b.id || "").trim();
    if (!bid) {
      errors.push("LFBB block with missing id");
      continue;
    }
    if (seenLfbbIds.has(bid)) {
      warnings.push(`Duplicate LFBB block id "${bid}"`);
    }
    seenLfbbIds.add(bid);

    const cid = String(b.categoryId || "").trim();
    if (!cid) {
      errors.push(`LFBB block "${bid}" missing categoryId`);
    } else if (categoryIds.size > 0 && !categoryIds.has(cid)) {
      errors.push(`LFBB block "${bid}" has unknown categoryId "${cid}"`);
    }

    const hasPain = String(b.painPointId || "").trim();
    const hasTheme = String(b.themeId || "").trim();
    if (!hasPain && !hasTheme) {
      warnings.push(`LFBB block "${bid}" has neither painPointId nor themeId`);
    }
  }

  const seenProfileIds = new Set();
  for (const p of profiles) {
    if (!p || typeof p !== "object") continue;
    const pid = String(p.id || "").trim();
    if (!pid) {
      errors.push("Customer profile with missing id");
      continue;
    }
    if (seenProfileIds.has(pid)) {
      warnings.push(`Duplicate customer profile id "${pid}"`);
    }
    seenProfileIds.add(pid);

    const blockRefs = Array.isArray(p.recommendedLfbbBlockIds) ? p.recommendedLfbbBlockIds : [];
    for (const raw of blockRefs) {
      const key = String(raw ?? "").trim();
      if (!key) {
        warnings.push(`Customer profile "${pid}" has empty recommendedLfbbBlockIds entry`);
        continue;
      }
      if (lfbbIds.size > 0 && !lfbbIds.has(key)) {
        errors.push(`Customer profile "${pid}" references unknown LFBB block id "${key}"`);
      }
    }
  }

  const overlays = Array.isArray(SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS?.overlays)
    ? SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS.overlays
    : [];
  const seenOverlayIds = new Set();
  for (const o of overlays) {
    if (!o || typeof o !== "object") continue;
    const oid = String(o.id || "").trim();
    if (!oid) {
      errors.push("Product spotlight overlay with missing id");
      continue;
    }
    if (seenOverlayIds.has(oid)) {
      warnings.push(`Duplicate product overlay id "${oid}"`);
    }
    seenOverlayIds.add(oid);

    const oc = String(o.categoryId || "").trim();
    if (!oc) {
      errors.push(`Product overlay "${oid}" missing categoryId`);
    } else if (categoryIds.size > 0 && !categoryIds.has(oc)) {
      errors.push(`Product overlay "${oid}" has unknown categoryId "${oc}"`);
    }

    const custRefs = Array.isArray(o.recommendedCustomerProfileIds) ? o.recommendedCustomerProfileIds : [];
    for (const raw of custRefs) {
      const key = String(raw ?? "").trim();
      if (!key) {
        warnings.push(`Product overlay "${oid}" has empty recommendedCustomerProfileIds entry`);
        continue;
      }
      if (profileIds.size > 0 && !profileIds.has(key)) {
        errors.push(`Product overlay "${oid}" references unknown customer profile id "${key}"`);
      }
    }

    const lfbbRefs = Array.isArray(o.recommendedLfbbBlockIds) ? o.recommendedLfbbBlockIds : [];
    for (const raw of lfbbRefs) {
      const key = String(raw ?? "").trim();
      if (!key) {
        warnings.push(`Product overlay "${oid}" has empty recommendedLfbbBlockIds entry`);
        continue;
      }
      if (lfbbIds.size > 0 && !lfbbIds.has(key)) {
        errors.push(`Product overlay "${oid}" references unknown LFBB block id "${key}"`);
      }
    }
  }

  if (overlays.length === 0) {
    warnings.push("SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS.overlays is empty");
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
  };
}
