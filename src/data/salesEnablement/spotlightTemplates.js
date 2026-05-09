/**
 * Spotlight schema / template anchors for future phases (no automation here).
 * Deterministic keys only — delivery channels will be defined later.
 */

export const SPOTLIGHT_SCHEMA_VERSION = "1.0";

export const PRODUCT_SPOTLIGHT_FIELD_KEYS = [
  "id",
  "type",
  "title",
  "productLine",
  "category",
  "targetMarkets",
  "relatedProducts",
  "relatedSpecs",
  "competitors",
  "useWhen",
  "feature",
  "bridge",
  "benefit",
  "expandedOpportunity",
  "salesAngle",
  "closingLines",
  "tags",
  "status",
];

export const CATEGORY_SPOTLIGHT_FIELD_KEYS = [
  "id",
  "type",
  "category",
  "title",
  "focus",
  "useWhen",
  "talkingPoints",
  "suggestedActions",
  "territorySignals",
  "salesAngle",
  "closingLines",
  "tags",
  "status",
];

/** Placeholder stages for future editorial workflow (not implemented). */
export const FUTURE_EDITORIAL_STAGES = ["draft", "review", "published"];

/** Reserved for future templated outbound snippets — structure only. */
export const PLACEHOLDER_MESSAGE_SHELL = {
  subjectLine: "",
  previewHook: "",
  bodySections: ["context", "spec_alignment", "next_step"],
  complianceNote:
    "All claims must reference current PDS and applicable OEM guidance before external use.",
};
