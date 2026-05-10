/**
 * Deterministic spotlight suggestion wiring — maps intelligence signals to library IDs.
 * Adjust here when expanding PRODUCT_SPOTLIGHTS / CATEGORY_SPOTLIGHTS.
 */

/** @typedef {"high" | "medium" | "low"} SuggestionPriority */

export const SIGNAL_TYPES = {
  UNDERREPRESENTED_CATEGORY: "underrepresented_category",
  UNDERPERFORMING_CATEGORY: "underperforming_category",
  SYNTHETIC_DEMAND_ACCELERATION: "synthetic_demand_acceleration",
  TOTE_PACKAGE_MOMENTUM: "tote_package_momentum",
  CATEGORY_DEMAND_ACCELERATION: "category_demand_acceleration",
  OCR_COMPETITOR_CONCENTRATION: "ocr_competitor_concentration",
  PROPOSAL_RESPONSE_GAP: "proposal_response_gap",
  APPROVED_DEMAND_FOCUS: "approved_demand_focus",
  ACCELERATING_SKU: "accelerating_sku",
};

/** Mix category name → primary category spotlight id */
export const CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY = {
  "HD Engine Oils": "cs-hd-conversion",
  "Hydraulic Fluids": "cs-hydraulic-opportunity",
  Grease: "cs-grease-program-growth",
  "Gear Oils": "cs-transmission-drivetrain",
  "Transmission Fluids": "cs-transmission-drivetrain",
  "Coolants / Chemicals": "cs-coolant-chemical-addon",
  Automotive: "cs-synthetic-upgrade",
};

/** Demand rollup category (from product text) → spotlight category label for UI */
export const DEMAND_CATEGORY_LABEL = {
  "HD Engine Oils": "HD Engine Oils",
  "Hydraulic Fluids": "Hydraulic Fluids",
  Grease: "Grease",
  "Gear Oils": "Gear Oils",
  "Transmission Fluids": "Transmission Fluids",
  "Coolants / Chemicals": "Coolants / Chemicals",
  Other: "Other",
};

/** Fallback product spotlight when accelerating SKU category maps cleanly */
export const DEFAULT_PRODUCT_SPOTLIGHT_BY_DEMAND_CATEGORY = {
  "HD Engine Oils": "ps-klondike-15w40-ck4-hd",
  "Hydraulic Fluids": "ps-klondike-aw-hydraulic",
  Grease: "ps-klondike-moly-ep-grease",
  "Gear Oils": "ps-klondike-gear-oils",
  "Transmission Fluids": "ps-klondike-to4",
  "Coolants / Chemicals": "ps-klondike-coolant-antifreeze",
};

export const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };
