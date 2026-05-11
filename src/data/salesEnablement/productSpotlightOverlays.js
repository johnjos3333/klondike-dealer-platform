/**
 * Phase 73.4 — Product spotlight overlay schema (data only).
 *
 * Optional enrichment layer: maps PDS-backed product lines to LFBB blocks, customer profiles,
 * category knowledge ids, and dealer-safe proof angles. Merge at runtime with static spotlight rows.
 * Not wired to UI or Supabase.
 */

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   categoryId: string,
 *   recommendedCustomerProfileIds: string[],
 *   recommendedLfbbBlockIds: string[],
 *   primaryPainPoints: string[],
 *   applicationTargets: string[],
 *   technicalProofPoints: string[],
 *   salesAngles: string[],
 *   suggestedCta: string,
 *   imageAssetHint: string,
 * }} SalesEnablementProductSpotlightOverlay */

/** @type {{ version: number, overlays: SalesEnablementProductSpotlightOverlay[] }} */
export const SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS = {
  version: 1,
  overlays: [
    {
      id: "overlay-nano-ep2-grease",
      productName: "Nano EP 2 Grease",
      categoryId: "grease",
      recommendedCustomerProfileIds: [
        "construction",
        "mining_aggregate",
        "agriculture",
        "municipal_fleet",
      ],
      recommendedLfbbBlockIds: [
        "lfbb-grease-shock-loading-v1",
        "lfbb-grease-water-ingress-v1",
      ],
      primaryPainPoints: [
        "Shock-loaded pins and bushings where the wrong EP tier or thickener invites early wear.",
        "Moisture and wash-down exposure leading to compatibility questions at the zerk.",
      ],
      applicationTargets: [
        "Slow-speed bearings, chassis points, and implement pivots where NLGI 2 and documented EP fit apply.",
        "Dealer routes standardizing one EP-2 story across mixed OEM iron when PDS allows.",
      ],
      technicalProofPoints: [
        "Confirm NLGI grade, thickener family, and load claims on the current PDS for the exact SKU.",
        "Verify OEM or component supplier guidance before any \"meets or exceeds\" counter language.",
      ],
      salesAngles: [
        "Category and compatibility first—pair regrease intervals with contamination control, not hype.",
        "Use spec cards at the bulk and counter so mixed fleets reduce accidental thickener cross-over.",
      ],
      suggestedCta:
        "Offer a one-page NLGI / thickener note for the shop board and a short compatibility checklist before drum changes.",
      imageAssetHint: "product/nano_ep2_grease",
    },
    {
      id: "overlay-aw-hydraulic-fluids",
      productName: "AW Hydraulic Fluids",
      categoryId: "hydraulic_fluids",
      recommendedCustomerProfileIds: [
        "construction",
        "mining_aggregate",
        "manufacturing",
        "municipal_fleet",
      ],
      recommendedLfbbBlockIds: [
        "lfbb-hydraulic-uptime-v1",
        "lfbb-hydraulic-oxidation-v1",
      ],
      primaryPainPoints: [
        "Slow cycles, heat, and filter issues when ISO VG or AW category drifts from the nameplate.",
        "Long-residence systems trending oxidation or varnish before obvious external leaks.",
      ],
      applicationTargets: [
        "Mobile hydraulics and industrial circuits calling for anti-wear hydraulic oils in the documented ISO grade.",
        "Seasonal yards that need cold-flow vs summer grade discipline on the same account.",
      ],
      technicalProofPoints: [
        "Match ISO VG and AW expectations to pump and OEM reservoir guidance on the current PDS.",
        "Oil analysis and filtration strategy—not fluid slogan—determines oxidation and particulate control.",
      ],
      salesAngles: [
        "Single approved AW tier per viscosity family reduces emergency cross-grade risk at the tote.",
        "Tie bulk gun labels and winter/summer maps to measured cycle behavior after clean top-off.",
      ],
      suggestedCta:
        "Schedule a walk-through of ISO labels on the top three machines and post the approved VG list at the fill point.",
      imageAssetHint: "product/aw_hydraulic_fluids",
    },
    {
      id: "overlay-full-synthetic-15w40-hd",
      productName: "Full Synthetic 15W-40 (Heavy Duty)",
      categoryId: "hd_engine_oils",
      recommendedCustomerProfileIds: ["trucking_fleet", "municipal_fleet", "mining_aggregate"],
      recommendedLfbbBlockIds: ["lfbb-hd-severe-duty-v1", "lfbb-synthetics-upgrade-v1"],
      primaryPainPoints: [
        "Severe idle and PTO profiles accelerating soot and fuel dilution without sampling discipline.",
        "Aftertreatment and SAPS sensitivity when bulk programs blur CK-4 / FA-4 or viscosity choices.",
      ],
      applicationTargets: [
        "Class 8 and vocational diesel where OEM allows 15W-40 synthetic and API category is documented on the PDS.",
        "Fleets consolidating premium tiers when nameplate and bulk labeling stay aligned.",
      ],
      technicalProofPoints: [
        "State API category and OEM claims only as written on the PDS for the stocked SKU.",
        "Synthetic does not remove the need for correct viscosity, intervals, and oil analysis on severe duty.",
      ],
      salesAngles: [
        "Lead with nameplate category and bulk gun discipline—premium chemistry supports a documented program.",
        "Pair with winter grade planning for northern accounts without implying universal year-round interchange.",
      ],
      suggestedCta:
        "Propose a bulk sticker pack plus a single-page CK-4 / FA-4 applicability note for the fleet compliance contact.",
      imageAssetHint: "product/hd_full_synthetic_15w40",
    },
    {
      id: "overlay-universal-tractor-fluid",
      productName: "Universal Tractor Fluid",
      categoryId: "tractor_fluids",
      recommendedCustomerProfileIds: ["agriculture", "municipal_fleet"],
      recommendedLfbbBlockIds: ["lfbb-tractor-wet-brake-chatter-v1"],
      primaryPainPoints: [
        "Wet brake chatter or engagement noise after non-UTTO hydraulic fluid enters the common sump.",
        "Seasonal rush top-offs using the wrong jug from the municipal or ag store shelf.",
      ],
      applicationTargets: [
        "Shared hydraulic–transmission–brake systems where OEM UTTO / THF category language applies.",
        "Dealer PDI and bulk programs for tractors and utility implements under one spec-backed fluid line.",
      ],
      technicalProofPoints: [
        "Confirm UTTO / THF and OEM friction requirements on the PDS before any universal claim at retail.",
        "Emergency top-off policy should reference case-cap markings, not generic AW hydraulic language alone.",
      ],
      salesAngles: [
        "Train the counter on case-cap photos and OEM category—not on one-fluid myths across every brand.",
        "Bundle spring fill checklists for producers and parks crews with limited shop depth.",
      ],
      suggestedCta:
        "Leave a case-cap reference card at the counter and add UTTO to the municipal/ag seasonal reorder list.",
      imageAssetHint: "product/universal_tractor_fluid",
    },
    {
      id: "overlay-hd-full-synthetic-atf",
      productName: "HD Full Synthetic ATF",
      categoryId: "synthetics",
      recommendedCustomerProfileIds: ["trucking_fleet", "municipal_fleet", "manufacturing"],
      recommendedLfbbBlockIds: ["lfbb-synthetics-upgrade-v1", "lfbb-hydraulic-uptime-v1"],
      primaryPainPoints: [
        "Warranty noise when dexron / Mercon / OEM bottle codes do not match what went in the sump.",
        "Operators expecting \"synthetic\" to fix shudder or slip without addressing filter and OEM service limits.",
      ],
      applicationTargets: [
        "Automatic and powershift applications where the PDS lists approved OEM or industry specs for the stocked grade.",
        "Mixed municipal and vocational pools that need approval discipline on the transmission side.",
      ],
      technicalProofPoints: [
        "Quote only approvals and performance language printed on the current PDS for the exact ATF SKU.",
        "Verify compatibility with seals, friction materials, and OEM service fill procedures before cross-selling.",
      ],
      salesAngles: [
        "Approval-first upsell: match bottle codes to owner manuals before discussing full synthetic benefits.",
        "Position as part of a documented PM path with filters and correct fill—not a standalone miracle fluid.",
      ],
      suggestedCta:
        "Offer a transmission spec lookup step on the three most common units in the yard and file the PDS page with the bid.",
      imageAssetHint: "product/hd_full_synthetic_atf",
    },
  ],
};
