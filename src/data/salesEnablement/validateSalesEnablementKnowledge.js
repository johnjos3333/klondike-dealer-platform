/**
 * Phase 73.6 / 74.1 / 75.0 — Development-only integrity checks for Sales Enablement knowledge data.
 * Does not throw by default. Not wired to UI or build pipeline.
 */

import { SALES_ENABLEMENT_KNOWLEDGE } from "./salesEnablementKnowledge.js";
import { SALES_ENABLEMENT_LFBB_BLOCKS } from "./lfbbBlocks.js";
import { SALES_ENABLEMENT_CUSTOMER_PROFILES } from "./customerProfiles.js";
import { SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS } from "./productSpotlightOverlays.js";
import { GREASE_PDS_SPOTLIGHT_MAP } from "./greasePdsSpotlightMap.js";
import { HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP } from "./hdEngineOilPdsSpotlightMap.js";

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

  // --- Phase 74.1 — GREASE_PDS_SPOTLIGHT_MAP (validation tooling only; not App.js) ---
  const greaseMap = GREASE_PDS_SPOTLIGHT_MAP;
  if (!greaseMap || typeof greaseMap !== "object") {
    errors.push("GREASE_PDS_SPOTLIGHT_MAP is missing or not an object");
  } else {
    if (greaseMap.version === undefined || greaseMap.version === null) {
      errors.push("GREASE_PDS_SPOTLIGHT_MAP.version is missing");
    }
    const gCat = String(greaseMap.categoryId ?? "").trim();
    if (gCat !== "grease") {
      errors.push(`GREASE_PDS_SPOTLIGHT_MAP.categoryId must be "grease", got "${gCat || "(empty)"}"`);
    }
    const gProducts = Array.isArray(greaseMap.products) ? greaseMap.products : null;
    if (!gProducts || gProducts.length === 0) {
      errors.push("GREASE_PDS_SPOTLIGHT_MAP.products is missing or empty");
    } else {
      const seenGreaseProductIds = new Set();
      for (let i = 0; i < gProducts.length; i++) {
        const pr = gProducts[i];
        const loc = `GREASE_PDS_SPOTLIGHT_MAP.products[${i}]`;
        if (!pr || typeof pr !== "object") {
          errors.push(`${loc} is not an object`);
          continue;
        }
        const gid = String(pr.id ?? "").trim();
        const gname = String(pr.productName ?? "").trim();
        const pcCat = String(pr.categoryId ?? "").trim();
        const pdsHint = String(pr.pdsFileHint ?? "").trim();
        if (!gid) {
          errors.push(`${loc} missing non-empty id`);
        } else {
          if (seenGreaseProductIds.has(gid)) {
            warnings.push(`Duplicate GREASE_PDS_SPOTLIGHT_MAP product id "${gid}"`);
          }
          seenGreaseProductIds.add(gid);
        }
        if (!gname) {
          errors.push(`${loc} (${gid || "?"}) missing non-empty productName`);
        }
        if (!pcCat) {
          errors.push(`${loc} (${gid || "?"}) missing non-empty categoryId`);
        } else if (pcCat !== "grease") {
          errors.push(`${loc} (${gid || "?"}) categoryId must be "grease", got "${pcCat}"`);
        }
        if (!pdsHint) {
          errors.push(`${loc} (${gid || "?"}) missing non-empty pdsFileHint`);
        }

        const lfbb = pr.lfbb && typeof pr.lfbb === "object" ? pr.lfbb : null;
        if (!lfbb) {
          errors.push(`${loc} (${gid || "?"}) missing lfbb object`);
        } else {
          for (const key of ["link", "feature", "bridge", "benefit"]) {
            const v = String(lfbb[key] ?? "").trim();
            if (!v) {
              errors.push(`${loc} (${gid || "?"}) missing non-empty lfbb.${key}`);
            }
          }
        }

        const custRefs = Array.isArray(pr.recommendedCustomerProfileIds) ? pr.recommendedCustomerProfileIds : [];
        for (const raw of custRefs) {
          const key = String(raw ?? "").trim();
          if (!key) {
            warnings.push(`${loc} (${gid || "?"}) has empty recommendedCustomerProfileIds entry`);
            continue;
          }
          if (profileIds.size > 0 && !profileIds.has(key)) {
            errors.push(`${loc} (${gid || "?"}) references unknown customer profile id "${key}"`);
          }
        }
      }
    }
  }

  // --- Phase 75.0 — HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP (validation tooling only; not App.js) ---
  const hdMap = HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP;
  if (!hdMap || typeof hdMap !== "object") {
    errors.push("HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP is missing or not an object");
  } else {
    if (hdMap.version === undefined || hdMap.version === null) {
      errors.push("HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.version is missing");
    }
    const hCat = String(hdMap.categoryId ?? "").trim();
    if (hCat !== "hd_engine_oils") {
      errors.push(`HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.categoryId must be "hd_engine_oils", got "${hCat || "(empty)"}"`);
    }

    const hdProducts = Array.isArray(hdMap.products) ? hdMap.products : null;
    if (!hdProducts || hdProducts.length === 0) {
      errors.push("HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.products is missing or empty");
    }

    const hdProductIds = new Set();
    if (hdProducts && hdProducts.length > 0) {
      const seenHdProductIds = new Set();
      for (let i = 0; i < hdProducts.length; i++) {
        const pr = hdProducts[i];
        const loc = `HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.products[${i}]`;
        if (!pr || typeof pr !== "object") {
          errors.push(`${loc} is not an object`);
          continue;
        }
        const pid = String(pr.id ?? "").trim();
        const pname = String(pr.productName ?? "").trim();
        const pcCat = String(pr.categoryId ?? "").trim();
        const pdsHint = String(pr.pdsFileHint ?? "").trim();
        const pos = String(pr.positioningTier ?? "").trim();
        if (!pid) {
          errors.push(`${loc} missing non-empty id`);
        } else {
          if (seenHdProductIds.has(pid)) {
            warnings.push(`Duplicate HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP product id "${pid}"`);
          }
          seenHdProductIds.add(pid);
          hdProductIds.add(pid);
        }
        if (!pname) errors.push(`${loc} (${pid || "?"}) missing non-empty productName`);
        if (!pcCat) {
          errors.push(`${loc} (${pid || "?"}) missing non-empty categoryId`);
        } else if (pcCat !== "hd_engine_oils") {
          errors.push(`${loc} (${pid || "?"}) categoryId must be "hd_engine_oils", got "${pcCat}"`);
        }
        if (!pdsHint) errors.push(`${loc} (${pid || "?"}) missing non-empty pdsFileHint`);
        if (!pos) errors.push(`${loc} (${pid || "?"}) missing non-empty positioningTier`);

        const lfbb = pr.lfbb && typeof pr.lfbb === "object" ? pr.lfbb : null;
        if (!lfbb) {
          errors.push(`${loc} (${pid || "?"}) missing lfbb object`);
        } else {
          for (const key of ["link", "feature", "bridge", "benefit"]) {
            const v = String(lfbb[key] ?? "").trim();
            if (!v) errors.push(`${loc} (${pid || "?"}) missing non-empty lfbb.${key}`);
          }
        }

        const custRefs = Array.isArray(pr.recommendedCustomerProfileIds) ? pr.recommendedCustomerProfileIds : [];
        for (const raw of custRefs) {
          const key = String(raw ?? "").trim();
          if (!key) {
            warnings.push(`${loc} (${pid || "?"}) has empty recommendedCustomerProfileIds entry`);
            continue;
          }
          if (profileIds.size > 0 && !profileIds.has(key)) {
            errors.push(`${loc} (${pid || "?"}) references unknown customer profile id "${key}"`);
          }
        }
      }
    }

    const hdCats = Array.isArray(hdMap.categorySpotlights) ? hdMap.categorySpotlights : null;
    if (!hdCats || hdCats.length === 0) {
      errors.push("HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.categorySpotlights is missing or empty");
    } else {
      const seenCatSpotIds = new Set();
      for (let i = 0; i < hdCats.length; i++) {
        const cs = hdCats[i];
        const loc = `HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.categorySpotlights[${i}]`;
        if (!cs || typeof cs !== "object") {
          errors.push(`${loc} is not an object`);
          continue;
        }
        const cid = String(cs.id ?? "").trim();
        const ctitle = String(cs.title ?? "").trim();
        const ctier = String(cs.positioningTier ?? "").trim();
        if (!cid) {
          errors.push(`${loc} missing non-empty id`);
        } else if (seenCatSpotIds.has(cid)) {
          warnings.push(`Duplicate HD category spotlight id "${cid}"`);
        } else {
          seenCatSpotIds.add(cid);
        }
        if (!ctitle) errors.push(`${loc} (${cid || "?"}) missing non-empty title`);
        if (!ctier) errors.push(`${loc} (${cid || "?"}) missing non-empty positioningTier`);

        const rp = Array.isArray(cs.recommendedProducts) ? cs.recommendedProducts : [];
        if (rp.length === 0) {
          errors.push(`${loc} (${cid || "?"}) recommendedProducts must be non-empty`);
        } else {
          for (const raw of rp) {
            const key = String(raw ?? "").trim();
            if (!key) {
              warnings.push(`${loc} (${cid || "?"}) has empty recommendedProducts entry`);
              continue;
            }
            if (hdProductIds.size > 0 && !hdProductIds.has(key)) {
              errors.push(`${loc} (${cid || "?"}) recommendedProducts references unknown product id "${key}"`);
            }
          }
        }

        const inds = Array.isArray(cs.industries) ? cs.industries : [];
        if (inds.length < 1) errors.push(`${loc} (${cid || "?"}) industries must have at least one item`);

        const cprof = Array.isArray(cs.customerProfiles) ? cs.customerProfiles : [];
        const cprofNonEmpty = cprof.map((x) => String(x ?? "").trim()).filter(Boolean);
        if (cprofNonEmpty.length < 1) {
          errors.push(`${loc} (${cid || "?"}) customerProfiles must have at least one non-empty id`);
        }
        for (const raw of cprof) {
          const key = String(raw ?? "").trim();
          if (!key) {
            warnings.push(`${loc} (${cid || "?"}) has empty customerProfiles entry`);
            continue;
          }
          if (profileIds.size > 0 && !profileIds.has(key)) {
            errors.push(`${loc} (${cid || "?"}) customerProfiles references unknown profile id "${key}"`);
          }
        }

        const oc = Array.isArray(cs.operatingConditions) ? cs.operatingConditions : [];
        if (oc.length < 1) errors.push(`${loc} (${cid || "?"}) operatingConditions must have at least one item`);

        const pp = Array.isArray(cs.painPoints) ? cs.painPoints : [];
        if (pp.length < 1) errors.push(`${loc} (${cid || "?"}) painPoints must have at least one item`);

        const tp = Array.isArray(cs.technicalProofPoints) ? cs.technicalProofPoints : [];
        if (tp.length < 1) errors.push(`${loc} (${cid || "?"}) technicalProofPoints must have at least one item`);

        const clfbb = cs.lfbb && typeof cs.lfbb === "object" ? cs.lfbb : null;
        if (!clfbb) {
          errors.push(`${loc} (${cid || "?"}) missing lfbb object`);
        } else {
          for (const key of ["link", "feature", "bridge", "benefit"]) {
            const v = String(clfbb[key] ?? "").trim();
            if (!v) errors.push(`${loc} (${cid || "?"}) missing non-empty lfbb.${key}`);
          }
        }

        if (!String(cs.recommendedCta ?? "").trim()) {
          errors.push(`${loc} (${cid || "?"}) missing non-empty recommendedCta`);
        }
        if (!Array.isArray(cs.pdsSafeNotes)) {
          errors.push(`${loc} (${cid || "?"}) pdsSafeNotes must be an array`);
        }
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
  };
}
