/**
 * Deterministic narrative composition templates (KL Admin Sales Enablement + Dealer Rep Lubricant Advisor).
 * Data only — no runtime I/O. Pair with `productNarrativeComposer.js`.
 *
 * Flagship “product intelligence” is provided by `salesEnablement/flagshipNarratives.js` (indexed narratives + PDS-backed proof lines).
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
 * Reusable narrative kinds (spotlight / advisor surfaces). Values are stable ids for routing and analytics.
 * @type {Readonly<Record<string, { label: string, description: string }>>}
 */
export const NARRATIVE_KIND_REGISTRY = Object.freeze({
  product_spotlight: {
    label: "Product spotlight",
    description: "Full-stack story for a named SKU or flagship row—proof-first, duty-aware.",
  },
  category_spotlight: {
    label: "Category spotlight",
    description: "Attribute-knowledge narrative when the question is category-class, not a single PDS row.",
  },
  customer_profile: {
    label: "Customer profile",
    description: "Industry-first account framing with optional role and equipment overlays.",
  },
  advisor_product_explanation: {
    label: "Advisor product explanation",
    description: "Shorter lists for in-flow advisor answers—same sources, tighter bullets.",
  },
  product_differentiation: {
    label: "Product differentiation",
    description: "Anchors on differentiation intelligence when the rep asks how/why a product is different.",
  },
  rep_talk_track: {
    label: "Rep talk track",
    description: "Role-weighted talk tracks with flagship or PDS anchors and bounded trial language.",
  },
});

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
 * Section body copy for PDS-backed proof when translated (flagship) lines exist vs raw map specs only.
 */
export const PDS_BACKED_PROOF_INTRO = Object.freeze({
  translatedFirst:
    "Prefer flagship “translated proof” lines (indexed narrative tied to PDS language). Add at most a couple of verbatim indexed spec strings only when they sharpen a claim already supported above.",
  rawOnly:
    "No flagship translated proof was available—use verbatim indexed spec lines from the map and the PDS PDF for customer-facing claims.",
  unanchored: "No flagship or PDS row anchored—proof must wait on a named SKU and its PDS.",
});

/** Intro line for upgrade story when operational-win reasoning is present. */
export const UPGRADE_REASONING_INTRO = Object.freeze({
  withOperationalWins:
    "Upgrade reasoning ties indexed operating wins to how crews experience fewer surprises in service—not generic marketing claims.",
  default:
    "Build the upgrade from verified headroom versus the incumbent data sheet once duty, OEM class, and sump fluid are confirmed.",
});

/**
 * When a section has no grounded lines, use these field-tone placeholders (deterministic).
 * @type {Readonly<Record<string, string>>}
 */
export const EMPTY_NARRATIVE_HINTS = Object.freeze({
  whatItIs:
    "No grounded “what it is” line was available from flagship or PDS index—name the product exactly as indexed, then recompose.",
  whyItWins:
    "No differentiated win statement was indexed for this anchor—sell from translated proof or verbatim indexed spec lines with trial discipline.",
  operationalConsequences:
    "Link downtime, contamination, or drain-interval pressure to the customer’s duty class once you confirm equipment and sump fluid.",
  pdsBackedProof:
    "Open the PDS PDF and quote only printed spec rows; the map index is a pointer, not the legal spec sheet.",
  whereItFits:
    "Map the product to OEM class, duty cycle, and sump fluid after you confirm nameplate and operating band.",
  upgradeStory:
    "Ground upgrade reasoning in operational wins and dealer talking points from indexed narratives—compare honestly to incumbent sheets.",
  repTalkTrack:
    "Lead with one translated proof line, one discovery question on duty, and one disciplined trial boundary.",
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
  differentiation: "Product differentiation intelligence",
  templates: "Narrative composition templates",
});

/**
 * Expected `context` shape (all optional). Aliases in composer: `roleKey`/`roleQuery`, `industryKey`, `equipmentKey`/`equipmentQuery`, `troubleshootingKey`.
 * @typedef {{
 *   role?: string,
 *   industry?: string,
 *   equipment?: string,
 *   troubleshooting?: string,
 *   operatingConditions?: string[],
 * }} ProductNarrativeCompositionContext
 */
