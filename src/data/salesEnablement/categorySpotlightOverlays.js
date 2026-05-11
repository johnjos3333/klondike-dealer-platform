/**
 * Phase 73.12 — Category spotlight overlay schema (data only).
 *
 * Program-level overlays for Category Spotlights: same knowledge shape as product overlays
 * (profiles, LFBB ids, proof angles) without product SKU binding.
 * Not wired to UI or sends.
 */

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   categoryId: string,
 *   recommendedCustomerProfileIds: string[],
 *   recommendedLfbbBlockIds: string[],
 *   primaryPainPoints: string[],
 *   productLineFocus: string[],
 *   technicalProofPoints: string[],
 *   salesAngles: string[],
 *   suggestedCta: string,
 *   imageAssetHint: string,
 * }} SalesEnablementCategorySpotlightOverlay */

/** @type {{ version: number, overlays: SalesEnablementCategorySpotlightOverlay[] }} */
export const SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS = {
  version: 1,
  overlays: [
    {
      id: "cat-overlay-severe-duty-grease-program",
      title: "Severe-Duty Grease Program",
      categoryId: "grease",
      recommendedCustomerProfileIds: [
        "mining_aggregate",
        "construction",
        "agriculture",
        "municipal_fleet",
      ],
      recommendedLfbbBlockIds: ["lfbb-grease-shock-loading-v1", "lfbb-grease-water-ingress-v1"],
      primaryPainPoints: [
        "Shock and contamination stack on the same pin—noise shows up before the lube route gets rescheduled.",
        "Mixed thickener history in the shop gun makes every drum change a compatibility review, not a price fight.",
      ],
      productLineFocus: [
        "NLGI 2 EP greases and documented thickener fit for pins, bushings, and slow-speed bearings.",
        "Dealer programs that pair regrease cards with wash-down and fitting discipline—not shelf claims.",
      ],
      technicalProofPoints: [
        "Cite NLGI grade, thickener family, and load language only as printed on the current PDS for stocked SKUs.",
        "OEM and component guidance still govern approval; Klondike messaging stays on spec fit and procedure.",
      ],
      salesAngles: [
        "Bundle spec stickers for bulk and counter so seasonal staff pick the same EP story the fleet manager expects.",
        "Position severe-duty as a route discipline win: fewer comebacks when compatibility and quantity match the joint.",
      ],
      suggestedCta:
        "Offer a one-page grease compatibility checklist and a top-10 pin map for the yard’s worst comeback jobs.",
      imageAssetHint: "category/severe_duty_grease_program",
    },
    {
      id: "cat-overlay-hydraulic-reliability-program",
      title: "Hydraulic Reliability Program",
      categoryId: "hydraulic_fluids",
      recommendedCustomerProfileIds: [
        "construction",
        "mining_aggregate",
        "manufacturing",
        "municipal_fleet",
      ],
      recommendedLfbbBlockIds: ["lfbb-hydraulic-uptime-v1", "lfbb-hydraulic-oxidation-v1"],
      primaryPainPoints: [
        "Slow cycles and heat spikes read as ‘machine problems’ when ISO grade or AW category drifts at the tote.",
        "Long-residence systems oxidize quietly until valves stick—operators rarely blame the first emergency jug.",
      ],
      productLineFocus: [
        "ISO VG–correct AW hydraulic fluids aligned to pump and OEM reservoir guidance for mobile and industrial circuits.",
        "Seasonal VG maps and single-fluid discipline on shared bulk systems.",
      ],
      technicalProofPoints: [
        "Match ISO VG and AW expectations to the nameplate and current PDS; avoid generic ‘heavy duty’ shorthand in bids.",
        "Pair fluid tier with filtration, breathers, and analysis where the account already runs PM maturity.",
      ],
      salesAngles: [
        "Sell the fill-point audit: posted VG list, clean guns, and measured lift behavior after a verified top-off.",
        "Reliability tone for MRO and municipal buyers—oxidation control as a program, not a slogan.",
      ],
      suggestedCta:
        "Schedule a 20-minute walk of the three loudest hydraulic assets and post the approved ISO row at each fill.",
      imageAssetHint: "category/hydraulic_reliability_program",
    },
    {
      id: "cat-overlay-hd-engine-oil-program",
      title: "Heavy-Duty Engine Oil Program",
      categoryId: "hd_engine_oils",
      recommendedCustomerProfileIds: ["trucking_fleet", "municipal_fleet", "mining_aggregate"],
      recommendedLfbbBlockIds: ["lfbb-hd-severe-duty-v1"],
      primaryPainPoints: [
        "Severe idle and PTO hours move drains faster than sticker intervals—soot and dilution need sampling honesty.",
        "Bulk cross-grade risk afterhours when the compliance binder is not at the pump.",
      ],
      productLineFocus: [
        "API CK-4 / FA-4 category discipline and viscosity fit for documented HD duty, including aftertreatment context.",
        "Bulk labeling, winter/summer rows, and fleet spec binders dealers can defend on warranty questions.",
      ],
      technicalProofPoints: [
        "State API category and OEM claims only as written on the PDS for the exact drums in the rack.",
        "Synthetic or blend tiers still require correct SAPS and viscosity for the nameplate—premium is not a bypass.",
      ],
      salesAngles: [
        "Lead with VIN-pattern spec notes for mixed-age fleets; keep FA-4 applicability explicit where OEM allows.",
        "Tie premium tiers to bulk gun discipline and oil analysis—not to implied universal interchange.",
      ],
      suggestedCta:
        "Propose a bulk sticker refresh plus a single-page CK-4 / FA-4 applicability matrix for the fleet compliance desk.",
      imageAssetHint: "category/hd_engine_oil_program",
    },
    {
      id: "cat-overlay-synthetic-conversion-program",
      title: "Synthetic Conversion Program",
      categoryId: "synthetics",
      recommendedCustomerProfileIds: ["trucking_fleet", "manufacturing", "municipal_fleet"],
      recommendedLfbbBlockIds: ["lfbb-synthetics-upgrade-v1", "lfbb-hd-severe-duty-v1"],
      primaryPainPoints: [
        "Customers burned by vague ‘full synthetic’ claims—upsell dies without bottle codes tied to the manual.",
        "Short-trip and idle-heavy patterns still oxidize premium fluids when intervals ignore reality.",
      ],
      productLineFocus: [
        "Full synthetic and synthetic blend ladders where approvals on the PDS match how the fleet actually runs.",
        "Industrial synthetic upgrades only where analysis and OEM class justify the step—not blanket premium pushes.",
      ],
      technicalProofPoints: [
        "Quote dexron / Mercon / ACEA / OEM codes only as listed for the stocked SKU; no implied universal coverage.",
        "Conversion conversations include filters, seals, and documented drains—fluid alone is not a retrofit.",
      ],
      salesAngles: [
        "Approval-first counter training: lookup before upsell, especially on municipal and vocational mixed pools.",
        "ROI framing for plants: oxidation and foam margins tied to documented duty—not marketing superlatives.",
      ],
      suggestedCta:
        "Run a 10-VIN approval lookup clinic at the counter and file the PDS pages customers can photograph.",
      imageAssetHint: "category/synthetic_conversion_program",
    },
    {
      id: "cat-overlay-mixed-fleet-tractor-fluids-program",
      title: "Mixed Fleet / Tractor Fluids Program",
      categoryId: "tractor_fluids",
      recommendedCustomerProfileIds: ["agriculture", "municipal_fleet", "trucking_fleet"],
      recommendedLfbbBlockIds: [
        "lfbb-tractor-wet-brake-chatter-v1",
        "lfbb-grease-water-ingress-v1",
      ],
      primaryPainPoints: [
        "Common-sump tractors need UTTO / THF friction chemistry—generic AW jugs create chatter comebacks fast.",
        "Municipal and small-fleet yards mix ag iron with pickups; the wrong emergency top-off propagates across stores.",
      ],
      productLineFocus: [
        "UTTO / THF programs for shared hydraulic–transmission–brake sumps with case-cap discipline at retail.",
        "Companion grease discipline for PTO and implement pivots where moisture and shock ride together.",
      ],
      technicalProofPoints: [
        "Confirm UTTO / THF and friction requirements on the PDS before any ‘universal tractor fluid’ language.",
        "Emergency top-off policy should reference OEM case caps; Klondike dealers train with photos, not slogans.",
      ],
      salesAngles: [
        "Spring and fall campaign bundles for ag dealers; parks-and-streets standardization for municipal bids.",
        "Mixed-yard messaging: one spec-backed tractor fluid row plus a pinned grease compatibility note at the counter.",
      ],
      suggestedCta:
        "Ship a case-cap photo sheet and a UTTO reorder card with every seasonal bulk fill promotion.",
      imageAssetHint: "category/mixed_fleet_tractor_fluids_program",
    },
  ],
};
