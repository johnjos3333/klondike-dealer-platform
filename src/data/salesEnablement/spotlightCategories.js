/**
 * Sales Enablement — spotlight category taxonomy (foundation).
 * Used for filters and tagging; not tied to PDS catalog IDs.
 */

/** Declared before other exports so same-module / re-export init cannot hit TDZ on this binding. */
export const SPOTLIGHT_CATEGORY_ALL = "all";

export const SPOTLIGHT_CATEGORIES = [
  "HD Engine Oils",
  "Hydraulic Fluids",
  "Grease",
  "Gear Oils",
  "Transmission Fluids",
  "Coolants / Chemicals",
  "Construction Equipment",
  "Agriculture",
  "Synthetic Conversion",
  "Fleet Opportunity",
];
