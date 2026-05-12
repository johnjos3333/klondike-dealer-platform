/**
 * Phase 76.2 — Sales Enablement PDS public URL helper (data layer; no PDF I/O).
 * `pdsFileHint` values in PDS spotlight maps are relative paths under `public/pds/`.
 * Browser URLs use the `/pds/<folder>/<file>.pdf` convention (see `pdsMap.js` url field).
 */

/** Relative path under `public/pds` → same string as stored in grease/HD/hydraulic `pdsFileHint` fields. */
export const SALES_ENABLEMENT_COMPOSER_OVERLAY_PDS_FILE_HINTS = {
  "overlay-nano-ep2-grease": "Grease PDS/KLONDIKE nano Calcium Sulfonate EP Grease PDS.pdf",
  "overlay-aw-hydraulic-fluids": "Hydraulic Fluids PDS/KLONDIKE AW Commercial Formula Hydraulic Fluids PDS.pdf",
  "overlay-full-synthetic-15w40-hd": "Heavy Duty Engine Oils PDS/KLONDIKE SAE 15W-40 Full Synthetic Heavy Duty Engine Oil PDS.pdf",
  "overlay-universal-tractor-fluid": "Tractor Fluids PDS/KLONDIKE Universal Tractor Fluid PDS.pdf",
  "overlay-hd-full-synthetic-atf": "Transmission Fluids PDS/KLONDIKE HD Full Synthetic Automatic Transmission Fluid PDS.pdf",
  "cat-overlay-severe-duty-grease-program": "Grease PDS/KLONDIKE Moly Tac EP-2 Grease PDS.pdf",
  "cat-overlay-hydraulic-reliability-program": "Hydraulic Fluids PDS/KLONDIKE AW Commercial Formula Hydraulic Fluids PDS.pdf",
  "cat-overlay-hd-engine-oil-program": "Heavy Duty Engine Oils PDS/KLONDIKE SAE 15W-40 Advanced Formula Heavy Duty Engine Oil PDS.pdf",
  "cat-overlay-synthetic-conversion-program": "Heavy Duty Engine Oils PDS/KLONDIKE SAE 15W-40 Full Synthetic Heavy Duty Engine Oil PDS.pdf",
  "cat-overlay-mixed-fleet-tractor-fluids-program": "Tractor Fluids PDS/KLONDIKE Universal Tractor Fluid PDS.pdf",
};

/**
 * Optional `pdsFileHint` for library product/category spotlight rows (`productSpotlights.js` / `categorySpotlights.js`).
 * Keys are `id` values; paths align with `pdsMap.js` / PDS spotlight maps.
 */
export const LIBRARY_SPOTLIGHT_PDS_FILE_HINTS = {
  "ps-klondike-15w40-ck4-hd": "Heavy Duty Engine Oils PDS/KLONDIKE SAE 15W-40 Advanced Formula Heavy Duty Engine Oil PDS.pdf",
  "ps-klondike-5w40-fs-hd": "Heavy Duty Engine Oils PDS/KLONDIKE SAE 5W-40 Full Synthetic Heavy Duty Engine Oil PDS.pdf",
  "ps-klondike-aw-hydraulic": "Hydraulic Fluids PDS/KLONDIKE AW Commercial Formula Hydraulic Fluids PDS.pdf",
  "ps-klondike-aw-synthetic-hydraulic": "Hydraulic Fluids PDS/KLONDIKE AW Advanced Formula Hydraulic Fluids PDS.pdf",
  "ps-klondike-moly-ep-grease": "Grease PDS/KLONDIKE Moly Tac EP-2 Grease PDS.pdf",
  "ps-klondike-gear-oils": "Gear Oils PDS/KLONDIKE Gear Lubricants PDS.pdf",
  "ps-klondike-to4": "Transmission Fluids PDS/KLONDIKE TDTO-4 Synthetic Multigrade Fluids PDS.pdf",
  "ps-klondike-coolant-antifreeze": "Coolant PDS/KLONDIKE Green Universal Antifreeze Coolant PDS.pdf",
  "ps-construction-fluid-bundle": "Hydraulic Fluids PDS/KLONDIKE AW Commercial Formula Hydraulic Fluids PDS.pdf",
  "ps-agrimax-zf": "Hydraulic Fluids PDS/KLONDIKE AGRIMAX Zinc Free Trans Drive Hydraulic Fluid Red PDS.pdf",
  "ps-agrimax-15w40-ck4": "Heavy Duty Engine Oils PDS/KLONDIKE AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil Green PDS.pdf",
  "ps-hd-15w40-commercial": "Heavy Duty Engine Oils PDS/KLONDIKE_Professional_Formula_Heavy_Duty_Engine_Oil_PDS.pdf",
  "ps-hydro-aw": "Hydraulic Fluids PDS/KLONDIKE AW Commercial Formula Hydraulic Fluids PDS.pdf",
  "ps-grease-ep2": "Grease PDS/KLONDIKE Moly Tac EP-2 Grease PDS.pdf",
  "ps-gear-industrial": "Gear Oils PDS/KLONDIKE Full Synthetic Industrial EP Gear Lubricants PDS.pdf",
  "ps-atf-md3": "Transmission Fluids PDS/KLONDIKE MD3 Automatic Transmission Fluid PDS.pdf",
  "ps-coolant-oat": "Coolant PDS/KLONDIKE Gold Automotive OAT ELC Antifreeze Coolant PDS.pdf",
  "ps-syn-blend-upgrade": "Heavy Duty Engine Oils PDS/KLONDIKE SAE 10W-30 Synthetic Blend Heavy Duty Engine Oil PDS.pdf",
  "cs-hd-conversion": "Heavy Duty Engine Oils PDS/KLONDIKE SAE 15W-40 Advanced Formula Heavy Duty Engine Oil PDS.pdf",
  "cs-hydraulic-opportunity": "Hydraulic Fluids PDS/KLONDIKE AW Commercial Formula Hydraulic Fluids PDS.pdf",
  "cs-grease-program-growth": "Grease PDS/KLONDIKE Moly Tac EP-2 Grease PDS.pdf",
  "cs-synthetic-upgrade": "Heavy Duty Engine Oils PDS/KLONDIKE SAE 15W-40 Full Synthetic Heavy Duty Engine Oil PDS.pdf",
  "cs-agriculture-fluids": "Tractor Fluids PDS/KLONDIKE Universal Tractor Fluid PDS.pdf",
  "cs-construction-fluids": "Hydraulic Fluids PDS/KLONDIKE AW Commercial Formula Hydraulic Fluids PDS.pdf",
  "cs-transmission-drivetrain": "Transmission Fluids PDS/KLONDIKE TDTO-4 Transmission Drive Train Oils All Season Syn Blend PDS.pdf",
  "cs-coolant-chemical-addon": "Coolant PDS/KLONDIKE Green Universal Antifreeze Coolant PDS.pdf",
  "cs-fleet-governance": "Heavy Duty Engine Oils PDS/KLONDIKE SAE 15W-40 Advanced Formula Heavy Duty Engine Oil PDS.pdf",
};

/**
 * @param {unknown} pdsFileHint
 * @returns {string} Absolute site path `/pds/...`, normalized `pds/...`, or "".
 */
export function getSalesEnablementPdsUrl(pdsFileHint) {
  const s = String(pdsFileHint ?? "").trim();
  if (!s) return "";
  if (s.includes("..") || s.includes("\\")) return "";
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/pds/")) return s;
  if (s.startsWith("pds/")) return `/${s}`;
  if (s.startsWith("/")) return "";
  return `/pds/${s}`;
}

/**
 * @param {unknown} overlayId
 * @returns {string}
 */
export function getSalesEnablementPdsFileHintForComposerOverlay(overlayId) {
  const id = String(overlayId ?? "").trim();
  if (!id) return "";
  return String(SALES_ENABLEMENT_COMPOSER_OVERLAY_PDS_FILE_HINTS[id] ?? "").trim();
}

/**
 * @param {unknown} spotlight — row from `PRODUCT_SPOTLIGHTS` / `CATEGORY_SPOTLIGHTS`
 * @returns {string} Relative `pdsFileHint` or ""
 */
export function getSalesEnablementPdsFileHintForLibrarySpotlight(spotlight) {
  if (!spotlight || typeof spotlight !== "object") return "";
  const direct = String(spotlight.pdsFileHint ?? "").trim();
  if (direct) return direct;
  const sid = String(spotlight.id ?? "").trim();
  if (!sid) return "";
  return String(LIBRARY_SPOTLIGHT_PDS_FILE_HINTS[sid] ?? "").trim();
}
