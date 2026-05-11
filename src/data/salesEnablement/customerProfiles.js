/**
 * Phase 73.2 — Customer profile library for Sales Enablement (data only).
 *
 * Industry archetypes for recommendations, spotlight targeting, and dealer enablement.
 * `recommendedLfbbBlockIds` reference `SALES_ENABLEMENT_LFBB_BLOCKS.blocks[].id` in lfbbBlocks.js.
 * Not wired to UI or sends.
 */

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   operatingConditions: string[],
 *   commonPainPoints: string[],
 *   priorityProductCategories: string[],
 *   buyingTriggers: string[],
 *   recommendedMessagingAngles: string[],
 *   relevantEquipmentTypes: string[],
 *   recommendedLfbbBlockIds: string[],
 * }} SalesEnablementCustomerProfile */

/** @type {{ version: number, profiles: SalesEnablementCustomerProfile[] }} */
export const SALES_ENABLEMENT_CUSTOMER_PROFILES = {
  version: 1,
  profiles: [
    {
      id: "construction",
      title: "Construction — general contractor & earthmoving",
      operatingConditions: [
        "High dust, shock loading on pins and couplers, and wide ambient swings between mobilization and mid-summer heat.",
        "Mixed OEM iron on one yard—shared service trucks and emergency top-offs raise compatibility risk.",
      ],
      commonPainPoints: [
        "Grease wash-off or incompatibility after pressure washing or wrong thickener in auto-lube carts.",
        "Hydraulic sluggishness, heat, and filter trips when ISO grade or AW category drifts across the fleet.",
        "Warranty gray area when nameplate fluid specs are bypassed for convenience.",
      ],
      priorityProductCategories: ["grease", "hydraulic_fluids", "hd_engine_oils"],
      buyingTriggers: [
        "New site startup, fleet expansion, or seasonal mobilization before peak dig season.",
        "Comeback jobs tied to noise, chatter, or slow cycles after fluid or grease changes.",
      ],
      recommendedMessagingAngles: [
        "Spec-first: NLGI / thickener and ISO VG tied to OEM caps—not shelf talk.",
        "Uptime story: cycle confidence, filter life, and clean single-fluid discipline on shared hydraulics.",
      ],
      relevantEquipmentTypes: [
        "Hydraulic excavators and wheel loaders",
        "Dozers and motor graders",
        "Rough-terrain cranes and compact equipment",
      ],
      recommendedLfbbBlockIds: [
        "lfbb-grease-shock-loading-v1",
        "lfbb-grease-water-ingress-v1",
        "lfbb-hydraulic-uptime-v1",
        "lfbb-hydraulic-oxidation-v1",
      ],
    },
    {
      id: "mining_aggregate",
      title: "Mining & aggregate — pits, crushers, conveyors",
      operatingConditions: [
        "Continuous-duty circuits, heavy shock, and abrasive dust near crushing and conveying lines.",
        "Long hydraulic residence times and heat pockets on stackers, loaders, and haul tools.",
      ],
      commonPainPoints: [
        "Premature wear on pivot and conveyor bearings when EP fit or regrease discipline slips.",
        "Oxidation, varnish, and particulate loading that show up as valve stickiness—not always as a leak.",
        "Wash-down and process water increasing contamination exposure on outdoor circuits.",
      ],
      priorityProductCategories: ["grease", "hydraulic_fluids", "hd_engine_oils"],
      buyingTriggers: [
        "Shutdown planning, oil analysis trending oxidation or particulate spikes.",
        "Capital refresh on mobile crushing or load-out fleets.",
      ],
      recommendedMessagingAngles: [
        "Reliability engineering tone: fluid tier matched to analysis and OEM category.",
        "Load and contamination honesty—avoid miracle claims; anchor to documented fit.",
      ],
      relevantEquipmentTypes: [
        "Face shovels, wheel loaders, and haul trucks",
        "Crushers, screens, and stackers",
        "Support pickups and on-site lube service units",
      ],
      recommendedLfbbBlockIds: [
        "lfbb-hydraulic-oxidation-v1",
        "lfbb-hydraulic-uptime-v1",
        "lfbb-grease-shock-loading-v1",
        "lfbb-grease-water-ingress-v1",
      ],
    },
    {
      id: "agriculture",
      title: "Agriculture — dealer, large producer, and seasonal peak",
      operatingConditions: [
        "Field moisture, dust, and temperature swings around planting and harvest windows.",
        "Shared tractor sumps where wet brake / PTO chemistry must match OEM tractor fluid categories.",
      ],
      commonPainPoints: [
        "Wet brake chatter or engagement noise after wrong universal hydraulic fluid in the common sump.",
        "Grease incompatibility or wash-off on implements and PTO-driven equipment.",
        "Counter confusion between engine oil and transmission-hydraulic cases on compact tractors.",
      ],
      priorityProductCategories: ["tractor_fluids", "grease", "hd_engine_oils"],
      buyingTriggers: [
        "Pre-season bulk fills, warranty PDI standards, and spring rush at the parts counter.",
        "Operator noise complaints after customer self-service fluid adds.",
      ],
      recommendedMessagingAngles: [
        "Case-cap and OEM category discipline for UTTO / THF—train the yard before the emergency jug.",
        "Implement and PTO messaging tied to moisture and shock, not generic HD slogans.",
      ],
      relevantEquipmentTypes: [
        "Row-crop and utility tractors",
        "Combines, sprayers, and forage equipment",
        "Mowers, balers, and grain handling",
      ],
      recommendedLfbbBlockIds: [
        "lfbb-tractor-wet-brake-chatter-v1",
        "lfbb-grease-water-ingress-v1",
        "lfbb-grease-shock-loading-v1",
      ],
    },
    {
      id: "trucking_fleet",
      title: "Trucking & fleet — Class 8 and mixed vocational",
      operatingConditions: [
        "High annual miles alongside severe idle, PTO, and regeneration profiles depending on duty segment.",
        "Bulk and tote programs where accidental cross-grade top-off can void the story on the nameplate.",
      ],
      commonPainPoints: [
        "Soot loading, fuel dilution, and interval creep without sampling—especially on vocational segments.",
        "Aftertreatment sensitivity when SAPS or category mismatch is introduced at the bulk gun.",
        "Light-duty units in the same account asking for synthetic upgrades without approval discipline.",
      ],
      priorityProductCategories: ["hd_engine_oils", "synthetics", "grease"],
      buyingTriggers: [
        "Deregulation of a single bulk tier, new OEM bulletin, or compliance audit on bulk labeling.",
        "Winter viscosity changeouts and cold-start complaints on northern lanes.",
      ],
      recommendedMessagingAngles: [
        "API category and viscosity anchored to VIN and OEM manual language.",
        "Honest synthetic framing: approvals and driving pattern before mileage promises.",
      ],
      relevantEquipmentTypes: [
        "Class 8 tractors and vocational straight trucks",
        "Pickup and van pools tied to the same fleet account",
        "Yard hostlers and terminal tractors",
      ],
      recommendedLfbbBlockIds: [
        "lfbb-hd-severe-duty-v1",
        "lfbb-synthetics-upgrade-v1",
        "lfbb-grease-shock-loading-v1",
      ],
    },
    {
      id: "municipal_fleet",
      title: "Municipal fleet — streets, refuse, parks, and utilities",
      operatingConditions: [
        "Stop-go cycles, plow seasons, and mixed iron from refuse packers to grounds tractors on one bid.",
        "Public scrutiny on spend—decisions favor documented spec paths and repeatable PM programs.",
      ],
      commonPainPoints: [
        "Hydraulic heat and slow cycles on refuse and loader routes when grades drift or reservoirs run dirty.",
        "Snow-season fluid choices colliding with summer spec cards if bulk is not relabeled.",
        "Parks and grounds equipment seeing wrong fluid in shared municipal stores.",
      ],
      priorityProductCategories: ["hd_engine_oils", "hydraulic_fluids", "tractor_fluids", "grease"],
      buyingTriggers: [
        "RFP renewal, cooperative purchasing alignment, or council-mandated standardization.",
        "Noise or chatter callbacks on small tractors and mowers after in-house service.",
      ],
      recommendedMessagingAngles: [
        "Transparency: spec binders, tank stickers, and seasonal grade maps for multiple departments.",
        "Risk reduction—fewer emergency cross-grades when one approved program is posted.",
      ],
      relevantEquipmentTypes: [
        "Refuse packers and rear-load collection",
        "Street sweepers, loaders, and snowfighting equipment",
        "Parks tractors, mowers, and utility pickups",
      ],
      recommendedLfbbBlockIds: [
        "lfbb-hd-severe-duty-v1",
        "lfbb-hydraulic-uptime-v1",
        "lfbb-hydraulic-oxidation-v1",
        "lfbb-tractor-wet-brake-chatter-v1",
      ],
    },
    {
      id: "manufacturing",
      title: "Manufacturing — metal forming, presses, and MRO reliability",
      operatingConditions: [
        "High-cycle hydraulics, linear and rotating assets on shared lube routes, and indoor heat profiles year-round.",
        "Quality and safety audits that reward documented fluid programs over ad hoc top-offs.",
      ],
      commonPainPoints: [
        "Varnish and oxidation symptoms on long-life circuits before failure codes appear.",
        "Grease channeling or incompatibility on presses, robots, and conveyor lines under shock.",
        "MRO stores stocking industrial AW hydraulic fluid that is not appropriate for every green-iron spillover account.",
      ],
      priorityProductCategories: ["hydraulic_fluids", "grease", "synthetics"],
      buyingTriggers: [
        "Oil analysis program expansion or new reliability initiative from engineering.",
        "OEM line upgrades on presses or automation cells.",
      ],
      recommendedMessagingAngles: [
        "Plant reliability: ISO grade, reservoir hygiene, and filtration paired to fluid tier.",
        "Synthetic upgrade only where approvals and ROI analysis support it—not blanket premium pushes.",
      ],
      relevantEquipmentTypes: [
        "Hydraulic presses, brakes, and stamping lines",
        "CNC and machine-tool sumps where applicable",
        "Conveyors, robots, and air compressors on shared MRO contracts",
      ],
      recommendedLfbbBlockIds: [
        "lfbb-hydraulic-oxidation-v1",
        "lfbb-hydraulic-uptime-v1",
        "lfbb-grease-shock-loading-v1",
        "lfbb-synthetics-upgrade-v1",
      ],
    },
  ],
};
