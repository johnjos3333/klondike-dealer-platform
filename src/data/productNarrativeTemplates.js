/**
 * Deterministic narrative composition templates (KL Admin Sales Enablement + Dealer Rep Lubricant Advisor).
 * Data only — no runtime I/O. Pair with `productNarrativeComposer.js`.
 */

/** @type {number} */
export const PRODUCT_NARRATIVE_COMPOSITION_VERSION = 1;

/**
 * Canonical section order and titles for composed narratives.
 * @type {ReadonlyArray<{ id: string, title: string }>}
 */
export const NARRATIVE_SECTION_BLUEPRINT = Object.freeze([
  { id: "whatItIs", title: "What It Is" },
  { id: "whyItWins", title: "Why It Wins" },
  { id: "operationalConsequences", title: "Operational Consequences" },
  { id: "pdsBackedProof", title: "PDS-Backed Proof" },
  { id: "whereItFits", title: "Where It Fits" },
  { id: "upgradeStory", title: "Upgrade Story" },
  { id: "repTalkTrack", title: "Rep Talk Track" },
  { id: "questionsToAsk", title: "Questions to Ask" },
  { id: "confirmBeforeUse", title: "Confirm Before Use" },
]);

/**
 * Allowed `type` values for `buildSalesEnablementSpotlightNarrative`.
 * @type {ReadonlyArray<string>}
 */
export const SALES_ENABLEMENT_SPOTLIGHT_TYPES = Object.freeze([
  "product_spotlight",
  "category_spotlight",
  "customer_profile",
  "advisor_product_explanation",
  "product_differentiation",
  "rep_talk_track",
]);

/**
 * Always-on operational cautions (appended; do not duplicate verbatim claims from PDS).
 * @type {ReadonlyArray<string>}
 */
export const CONFIRM_BEFORE_USE_DEFAULTS = Object.freeze([
  "Verify every customer-facing claim on the live PDS revision and with KLONDIKE technical when liability or OEM warranty is in play.",
  "Do not extrapolate approvals, test results, or interchange beyond what the indexed data explicitly states.",
]);

/**
 * When a section has no grounded lines, use these field-tone placeholders (deterministic).
 * @type {Readonly<Record<string, string>>}
 */
export const EMPTY_NARRATIVE_HINTS = Object.freeze({
  whatItIs:
    "No grounded “what it is” line was available from flagship or PDS index—name the product exactly as indexed, then recompose.",
  whyItWins:
    "No differentiated win statement was indexed for this anchor—sell from printed spec bullets and trial discipline, not generic claims.",
  operationalConsequences:
    "Link downtime, contamination, or drain-interval pressure to the customer’s duty class once you confirm equipment and sump fluid.",
  pdsBackedProof:
    "Open the PDS PDF and quote only printed spec rows; the map index is a pointer, not the legal spec sheet.",
  whereItFits:
    "Map the product to OEM class, duty cycle, and sump fluid after you confirm nameplate and operating band.",
  upgradeStory:
    "Build the upgrade story from verified headroom (temperature, shear, wear, cleanliness) versus the incumbent data sheet.",
  repTalkTrack:
    "Lead with one proof point from the PDS index, one discovery question on duty, and one disciplined trial boundary.",
  questionsToAsk:
    "Capture OEM spec string, operating temperatures, drain interval, and contamination history before recommending.",
  confirmBeforeUse: "Escalate to technical when the account file cannot be supported from indexed data alone.",
});

/**
 * Short labels for `sourceBadges` on composed responses.
 * @type {Readonly<Record<string, string>>}
 */
export const NARRATIVE_SOURCE_BADGE_LABELS = Object.freeze({
  flagship: "Flagship product intelligence",
  pdsMap: "PDS map index",
  retrieval: "Product retrieval index",
  productAttribute: "Product attribute knowledge",
  industry: "Industry lubrication knowledge",
  equipment: "Equipment lubrication knowledge",
  roleSales: "Role-based sales translation",
  troubleshooting: "Troubleshooting knowledge",
  templates: "Narrative composition templates",
});
