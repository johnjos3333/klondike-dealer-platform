/**
 * Phase 73.1 — Link / Feature / Bridge / Benefit block library (data only).
 *
 * Reusable LFBB rows keyed to Sales Enablement category + pain point or operational theme.
 * Aligns with `salesEnablementKnowledge.js` category ids and customer profile ids.
 * Not wired to UI or sends — extend with additional blocks and product joins incrementally.
 */

/**
 * @typedef {{
 *   id: string,
 *   categoryId: string,
 *   painPointId?: string,
 *   themeId?: string,
 *   link: string,
 *   feature: string,
 *   bridge: string,
 *   benefit: string,
 *   recommendedCustomerProfiles: string[],
 * }} SalesEnablementLfbbBlock */

/** @type {SalesEnablementLfbbBlock[]} */
const LFBB_BLOCKS = [
  {
    id: "lfbb-grease-water-ingress-v1",
    categoryId: "grease",
    painPointId: "water_ingress",
    link:
      "Wash-down, rain, and hub moisture pull contamination toward bearings—when water rides along with grease, failures look like a “bad batch” instead of a sealing and compatibility problem.",
    feature:
      "Water-handling and thickener chemistry designed for pins, bushings, and slow-speed bearings where OEM regrease guidance still rules the application.",
    bridge:
      "Move the conversation from “which tub is cheapest” to documented compatibility, fitting discipline, and whether the current thickener matches what is already in the joint.",
    benefit:
      "Fewer repeat comeback jobs tied to wash-off or incompatibility when spec, quantity, and sealing are reviewed alongside product choice.",
    recommendedCustomerProfiles: [
      "fleet_maintenance_manager",
      "industrial_plant_reliability",
      "ag_dealer_parts_counter",
    ],
  },
  {
    id: "lfbb-grease-shock-loading-v1",
    categoryId: "grease",
    painPointId: "shock_loading",
    link:
      "Shock loads and pivot slap concentrate stress on EP films—when grease softens or channels, metal contact shows up as noise before telemetry catches it.",
    feature:
      "EP / load-carrying positioning appropriate to the application class, with language grounded in spec fit—not unverifiable “strongest grease” claims.",
    bridge:
      "Shift buyers from single-number habit to NLGI, thickener family, and re-grease interval alignment with how the machine actually works the pin.",
    benefit:
      "More predictable pivot life when load, speed, and contamination controls match the grease tier the OEM context allows.",
    recommendedCustomerProfiles: [
      "fleet_maintenance_manager",
      "industrial_plant_reliability",
      "ag_dealer_parts_counter",
    ],
  },
  {
    id: "lfbb-hydraulic-oxidation-v1",
    categoryId: "hydraulic_fluids",
    themeId: "oxidation_control",
    link:
      "Long-residence hydraulic circuits run hot, breathe moisture, and oxidize quietly—varnish and acid rise show up as sticky valves and filter trips, not a sudden leak.",
    feature:
      "Oxidation and thermal stability framing tied to ISO grade, filter strategy, and OEM reservoir hygiene—not a promise of infinite life without analysis.",
    bridge:
      "Connect fluid tier to how the system is operated: idle hours, top-off discipline, and whether the correct AW category stays in the tank year-round.",
    benefit:
      "Cleaner shift behavior and fewer unplanned valve or servo interventions when fluid choice matches duty and housekeeping.",
    recommendedCustomerProfiles: [
      "metal_fab_hydraulic_lead",
      "mobile_equipment_superintendent",
      "forestry_or_marine_ops",
    ],
  },
  {
    id: "lfbb-hydraulic-uptime-v1",
    categoryId: "hydraulic_fluids",
    themeId: "equipment_uptime",
    link:
      "Cycle time and lift confidence are the product—when hydraulics hesitate, the whole job queue backs up and the operator blames the machine, not the first quart that topped the tank.",
    feature:
      "Correct ISO viscosity and AW category for the pump and climate envelope the OEM expects, including cold-start pumpability where seasonal swings apply.",
    bridge:
      "Tie the sale to documented grade on the nameplate and measured cycle behavior after a clean, single-fluid top-off—not to generic “heavy duty” language.",
    benefit:
      "Less chatter and fewer heat-related slow cycles when viscosity, filtration, and contamination control stay aligned through the season.",
    recommendedCustomerProfiles: [
      "mobile_equipment_superintendent",
      "metal_fab_hydraulic_lead",
      "forestry_or_marine_ops",
    ],
  },
  {
    id: "lfbb-hd-severe-duty-v1",
    categoryId: "hd_engine_oils",
    painPointId: "severe_duty",
    link:
      "Severe idle, PTO hours, and fuel quality stress sump fluid faster than highway miles—soot and fuel dilution move the conversation off the sticker interval and onto analysis and OEM category.",
    feature:
      "API category and viscosity fit for documented HD duty, including aftertreatment and SAPS context where the OEM manual is the authority.",
    bridge:
      "Replace brand habit with nameplate category, sampling cadence, and a bulk program that prevents accidental cross-grade top-off.",
    benefit:
      "Lower warranty gray-area risk and more predictable drain decisions when the right CK-4 / FA-4 story matches how the fleet actually runs.",
    recommendedCustomerProfiles: [
      "fleet_compliance_manager",
      "vocational_shop_foreman",
      "dealer_bulk_program_owner",
    ],
  },
  {
    id: "lfbb-synthetics-upgrade-v1",
    categoryId: "synthetics",
    themeId: "upgrade_opportunity",
    link:
      "Customers already pay for premium maintenance windows—when the upgrade is framed as documented approvals and real cold-flow / reserve properties, skepticism drops.",
    feature:
      "Full synthetic and synthetic blend options positioned against OEM approval codes and PDS language the counter can repeat without overpromising mileage.",
    bridge:
      "Move from “better oil” slogans to driving pattern, turbo load, and whether the sump sees fuel dilution or short-trip oxidation.",
    benefit:
      "Cleaner upsell conversations that protect the dealer when approvals and intervals stay honest to the nameplate.",
    recommendedCustomerProfiles: [
      "premium_automotive_service_advisor",
      "mixed_fleet_owner_operator",
      "industrial_plant_lubrication_engineer",
    ],
  },
  {
    id: "lfbb-tractor-wet-brake-chatter-v1",
    categoryId: "tractor_fluids",
    painPointId: "wet_brake_chatter",
    link:
      "Wet brake and common-sump tractors need the right friction chemistry—when a generic hydraulic fluid lands in the case, chatter and comeback jobs follow fast.",
    feature:
      "UTTO / THF category alignment and OEM-appropriate friction messaging for shared hydraulic–transmission–brake systems.",
    bridge:
      "Train the yard to read the tractor case cap and dealer bulletin before grabbing the AW hydraulic jug for an emergency top-off.",
    benefit:
      "Fewer noise and engagement complaints after fluid service when spec-backed tractor fluid stays in the system end to end.",
    recommendedCustomerProfiles: [
      "ag_dealer_service_manager",
      "large_crop_producer",
      "municipal_parks_grounds",
    ],
  },
];

/** @param {SalesEnablementLfbbBlock[]} blocks */
function buildLfbbIndexes(blocks) {
  /** @type {Record<string, string[]>} */
  const byCategoryId = {};
  /** @type {Record<string, string[]>} */
  const byPainPointId = {};
  /** @type {Record<string, string[]>} */
  const byThemeId = {};

  for (const b of blocks) {
    if (!byCategoryId[b.categoryId]) byCategoryId[b.categoryId] = [];
    byCategoryId[b.categoryId].push(b.id);

    if (b.painPointId) {
      if (!byPainPointId[b.painPointId]) byPainPointId[b.painPointId] = [];
      byPainPointId[b.painPointId].push(b.id);
    }
    if (b.themeId) {
      if (!byThemeId[b.themeId]) byThemeId[b.themeId] = [];
      byThemeId[b.themeId].push(b.id);
    }
  }

  return { byCategoryId, byPainPointId, byThemeId };
}

const { byCategoryId, byPainPointId, byThemeId } = buildLfbbIndexes(LFBB_BLOCKS);

/**
 * LFBB library root: flat `blocks` plus indexes by category, pain point, and operational theme.
 * @type {{
 *   version: number,
 *   blocks: SalesEnablementLfbbBlock[],
 *   byCategoryId: Record<string, string[]>,
 *   byPainPointId: Record<string, string[]>,
 *   byThemeId: Record<string, string[]>,
 * }}
 */
export const SALES_ENABLEMENT_LFBB_BLOCKS = {
  version: 1,
  blocks: LFBB_BLOCKS,
  byCategoryId,
  byPainPointId,
  byThemeId,
};
