/**
 * Phase 6G — Equipment manufacturer opportunity profile foundation (data only).
 *
 * Deterministic opportunity profiles for common lubrication conversations on named
 * equipment fleets. Not OEM endorsement sheets—verify requirements on equipment tags,
 * manuals, and current PDS before recommending chemistry. No implied partnership or
 * approval unless documented on the PDS for the SKU discussed.
 *
 * Not wired to App.js, sell sheets, or send behavior yet.
 */

export const EQUIPMENT_OPPORTUNITY_PROFILE_VERSION = 1;

export const EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER =
  "Opportunity profile for field enablement only—not an OEM endorsement. Verify OEM requirements using equipment tags, manuals, and current PDS before recommending chemistry.";

/**
 * @typedef {{
 *   category: string,
 *   role: string,
 * }} TypicalFluidCategoryRef
 */

/**
 * @typedef {{
 *   name: string,
 *   positioning: string,
 * }} RecommendedProductAnchor
 */

/**
 * @typedef {{
 *   key: string,
 *   label: string,
 *   profileTitle: string,
 *   profileSubtitle: string,
 *   opportunitySummary: string,
 *   commonLubricationConversations: string[],
 *   equipmentTypes: string[],
 *   typicalFluidCategories: TypicalFluidCategoryRef[],
 *   opportunitySignals: string[],
 *   recommendedRepTalkingPoints: string[],
 *   discoveryFocus: string[],
 *   crossSellFocus: string[],
 *   cautions: string[],
 *   recommendedProductAnchors: RecommendedProductAnchor[],
 *   recommendedNextStep: string,
 * }} EquipmentOpportunityProfile
 */

/** @type {EquipmentOpportunityProfile[]} */
const EQUIPMENT_OPPORTUNITY_PROFILE_LIST = [
  {
    key: "cat",
    label: "CAT Equipment",
    profileTitle: "CAT Equipment — Opportunity Profile",
    profileSubtitle: "Common lubrication conversations for excavators, loaders, and haul trucks.",
    opportunitySummary:
      "Earthmoving fleets running Caterpillar-badged iron often center on hydraulic reliability, final drives, severe-duty grease, and mixed-fleet HD engine programs. Use common lubrication conversations tied to compartment tags and current PDS—do not imply Caterpillar partnership, endorsement, or approval.",
    commonLubricationConversations: [
      "Hydraulic heat, foam, and slow response on large excavator and loader circuits under load and contamination.",
      "Final drive, pin, and bushing wear when regrease discipline or thickener choice drifts on wet shifts.",
      "Production-hour loss when bulk ISO VG labeling and compartment separation slip on busy sites.",
      "Mixed-fleet CK-4 and coolant programs on haul trucks and support diesels adjacent to yellow iron.",
    ],
    equipmentTypes: [
      "Hydraulic excavators",
      "Wheel loaders",
      "Off-highway haul trucks",
      "Dozers and motor graders",
      "Support equipment",
    ],
    typicalFluidCategories: [
      { category: "AW / MV hydraulic fluids", role: "ISO VG-matched pump protection and seasonal coverage per tag" },
      { category: "Severe-duty grease", role: "Pins, bushings, and final drives—moly and nano tiers only where PDS supports" },
      { category: "Final drive and gear oils", role: "Drivetrain fills per compartment tag" },
      { category: "CK-4 HD engine oils", role: "Mixed-fleet diesel programs on support and haul assets" },
      { category: "HD coolant programs", role: "NOAT / nitrite-free discipline separate from automotive bays" },
    ],
    opportunitySignals: [
      "Hydraulic slow response or foam at shift start on excavators",
      "Repeat pin and bushing regreases after wet shifts",
      "Final drive complaints or metal in drain samples",
      "Mixed bulk tanks without ISO VG labeling discipline",
    ],
    recommendedRepTalkingPoints: [
      "Open with production hours and worst circuits—hydraulics, final drives, or pins—not brand habit.",
      "Use common lubrication conversations tied to tags and PDS; do not imply Caterpillar partnership or approval.",
      "Position Klondike as a system program across hydraulics, grease, gear, engine, and coolant only where documented.",
    ],
    discoveryFocus: [
      "Which machine classes drive worst downtime—excavators, loaders, or haul trucks?",
      "What ISO VG and compartment tags are on the hydraulics needed this week?",
      "Where are pins, final drives, or bushings failing after wash-down or shock load?",
      "How are bulk hydraulics, grease, and engine oil separated on site?",
    ],
    crossSellFocus: [
      "Filtration and breathers",
      "Coolant programs",
      "Industrial gear and open gear",
      "ENVIRO / EAL on sensitive sites",
    ],
    cautions: [
      EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER,
      "Do not claim Caterpillar approval unless the exact wording appears on the PDS for that SKU.",
      "Separate hydraulic, final drive, grease, and engine compartments—confirm each fill on tags.",
    ],
    recommendedProductAnchors: [
      {
        name: "XVI Synthetic Hydraulic Fluids",
        positioning: "Premium hydraulic conversation where analysis and duty support synthetic per PDS.",
      },
      {
        name: "MOLY TAC / ULTRA TAC grease programs",
        positioning: "Shock-loaded pins and implements on severe earthmoving duty where PDS lists the application.",
      },
      {
        name: "Full Synthetic Gear Lubricants",
        positioning: "Final drive and reducer protection under sustained load when tags allow.",
      },
      {
        name: "CK-4 Full Synthetic Heavy Duty Engine Oils",
        positioning: "Haul truck and support diesel programs with documented API category on PDS.",
      },
    ],
    recommendedNextStep:
      "Map excavator, loader, and haul-truck reservoirs; align ISO VG, grease points, and CK-4 programs to current PDS.",
  },
  {
    key: "kubota",
    label: "Kubota Equipment",
    profileTitle: "Kubota Equipment — Opportunity Profile",
    profileSubtitle: "Compact tractors, utility equipment, and seasonal PM conversations.",
    opportunitySummary:
      "Compact and utility Kubota fleets often mix transmission, hydraulic, and wet-brake reservoirs with seasonal PM kits. Anchor trans/hydraulic and tractor-fluid discipline on tags and PDS—do not imply Kubota partnership, endorsement, or approval.",
    commonLubricationConversations: [
      "Trans/hydraulic confusion when one-fluid habits span transmission, hydraulic, and wet-brake sumps.",
      "Seasonal uptime before planting and harvest windows for dealers and owner-operators.",
      "Implement grease neglect on small equipment still seeing shock load and outdoor exposure.",
    ],
    equipmentTypes: [
      "Compact tractors",
      "Utility vehicles",
      "Ride-on mowers",
      "Compact excavators",
      "Generators",
    ],
    typicalFluidCategories: [
      { category: "Universal Red Tractor Fluid", role: "Tractor hydraulic/transmission baseline where tags allow" },
      { category: "AGRIMAX trans-drive programs", role: "Ag-adjacent trans-hydraulic and zinc-free options per PDS" },
      { category: "AW hydraulic fluids", role: "Standalone hydraulic circuits on utility equipment" },
      { category: "Multipurpose grease", role: "Chassis and implement points on compact fleets" },
    ],
    opportunitySignals: [
      "Wet brake chatter on compact tractors",
      "Seasonal fluid changes bundled with filters",
      "Dealer PM kit standardization opportunities",
    ],
    recommendedRepTalkingPoints: [
      "Lead with reservoir map and seasonal PM—trans-drive, hydraulic, engine, and grease—not a single red fluid drum.",
      "Common lubrication conversations for compact duty; verify Kubota fluid guidance on tags and PDS only.",
    ],
    discoveryFocus: [
      "Which models are on the lot this season—tractors, mowers, or compact excavators?",
      "Are transmission, hydraulic, and wet-brake fills documented separately?",
      "What PM kits are sold today—and where is fluid still an afterthought?",
    ],
    crossSellFocus: ["Coolant", "Small engine oils", "Hydraulic AW for standalone circuits", "Filter PM bundles"],
    cautions: [
      EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER,
      "Do not imply Kubota OEM approval beyond PDS application statements.",
    ],
    recommendedProductAnchors: [
      {
        name: "Universal Red Tractor Fluid",
        positioning: "Entry trans/hydraulic conversation—verify wet-brake compatibility on tag and PDS.",
      },
      {
        name: "AGRIMAX Trans Drive Hydraulic Fluid",
        positioning: "Program depth for ag-adjacent Kubota accounts where PDS supports the duty.",
      },
      {
        name: "RED TAC / MOLY TAC grease",
        positioning: "Seasonal PM and chassis protection on compact fleets per PDS.",
      },
    ],
    recommendedNextStep:
      "Standardize seasonal PM: trans/hydraulic, grease, coolant, and engine companions per equipment tag.",
  },
  {
    key: "john_deere_ag",
    label: "John Deere Ag",
    profileTitle: "John Deere Ag — Opportunity Profile",
    profileSubtitle: "Wet brake, trans-drive, harvest PM, and AGRIMAX program opportunities.",
    opportunitySummary:
      "Brand-loyal ag customers running John Deere equipment often need wet-brake, trans-drive, and harvest PM discipline. Use spec-aligned AGRIMAX conversations only where PDS and tags support the duty—never imply Deere partnership, endorsement, or approval.",
    commonLubricationConversations: [
      "Wet brake chatter that may trace to fluid compatibility—not brake hardware alone.",
      "Harvest uptime on combines and tractors during peak-hour reliability windows.",
      "Premium OEM-fluid habits without documented spec match on the tag or PDS.",
    ],
    equipmentTypes: ["Tractors", "Combines", "Sprayers", "Planters", "Grain carts", "Support trucks"],
    typicalFluidCategories: [
      { category: "AGRIMAX trans-drive / zinc-free", role: "UTHF programs where PDS lists relevant ag duty" },
      { category: "CK-4 engine oils", role: "Seasonal diesel engine protection" },
      { category: "Grease programs", role: "Field and chassis PM beyond a single grease habit" },
      { category: "Coolant", role: "ELC discipline on ag fleets" },
    ],
    opportunitySignals: [
      "Wet brake noise after fluid service",
      "Dealer quoting one OEM fluid for every reservoir",
      "Harvest prep fluid bundles incomplete",
    ],
    recommendedRepTalkingPoints: [
      "Talk wet brake chatter, trans-drive compatibility, and harvest PM—not OEM branding.",
      "AGRIMAX is a spec conversation category: verify John Deere fluid guidance on tags and PDS only.",
      "Never imply Deere partnership, endorsement, or approval beyond documented PDS language.",
    ],
    discoveryFocus: [
      "Which reservoirs are being standardized this season?",
      "Where is wet brake chatter showing up after fluid changes?",
      "What does the harvest PM bundle include beyond engine oil?",
    ],
    crossSellFocus: ["Coolant ELC", "Hydraulic AW on supporting assets", "Grease upgrades on high-load pins"],
    cautions: [
      EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER,
      "JD/CNH positioning only where PDS and equipment tags support—no implied OEM endorsement.",
    ],
    recommendedProductAnchors: [
      {
        name: "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
        positioning: "Zinc-free trans-drive where equipment tags and PDS require it.",
      },
      {
        name: "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend",
        positioning: "Engine program on high-hour seasonal diesel per PDS.",
      },
      {
        name: "AGRIMAX Poly Tac / RED TAC companions",
        positioning: "Seasonal PM story elements where PDS lists the application.",
      },
    ],
    recommendedNextStep:
      "Map AGRIMAX line by reservoir; bundle engine, trans-drive, grease, and coolant on seasonal PM.",
  },
  {
    key: "volvo_ce",
    label: "Volvo CE",
    profileTitle: "Volvo CE — Opportunity Profile",
    profileSubtitle: "Wheel loaders, excavators, and severe-duty service programs.",
    opportunitySummary:
      "Construction yards with Volvo CE loaders and excavators often need hydraulic reliability, severe-duty grease, and drivetrain program discipline. Tie common lubrication conversations to tags and PDS—do not imply Volvo CE partnership, endorsement, or approval.",
    commonLubricationConversations: [
      "Hydraulic reliability on load-sensing systems sensitive to viscosity and contamination.",
      "Pin and bushing wear on loaders and excavators under shock and outdoor exposure.",
      "Fleet availability pressure on municipal and contractor mixed-brand yards.",
    ],
    equipmentTypes: [
      "Wheel loaders",
      "Excavators",
      "Articulated haulers",
      "Compaction equipment",
    ],
    typicalFluidCategories: [
      { category: "AW / MV hydraulics", role: "ISO VG discipline on mobile circuits" },
      { category: "Severe-duty grease", role: "Loader pins and implement joints" },
      { category: "Gear oils", role: "Drivetrain and axle programs" },
      { category: "CK-4 engine oils", role: "Highway and off-road support diesels" },
    ],
    opportunitySignals: [
      "Hydraulic varnishing or heat on loaders",
      "Grease washout on wet municipal routes",
      "Mixed Volvo and other-brand fleets on one yard",
    ],
    recommendedRepTalkingPoints: [
      "Lead with hydraulic reliability and pin life on loaders and excavators.",
      "Do not imply Volvo CE approval—verify requirements on tags and PDS.",
    ],
    discoveryFocus: [
      "Which Volvo classes dominate hours—loaders, excavators, or haulers?",
      "What hydraulic ISO VG tags are on the worst-performing circuits?",
      "Where is grease failure showing up after wash-down?",
    ],
    crossSellFocus: ["Coolant", "Coolant flush chemicals", "Industrial specialty for plant yards"],
    cautions: [EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER],
    recommendedProductAnchors: [
      {
        name: "Multi-Viscosity AW Hydraulic Fluids",
        positioning: "Seasonal and temperature swing on mixed construction fleets per PDS.",
      },
      {
        name: "MOLY TAC HD 5% / ULTRA TAC",
        positioning: "Severe-duty grease on pins and loaders where PDS supports the duty.",
      },
      {
        name: "Full Synthetic Gear Lubricants",
        positioning: "Drivetrain step-up where tags and PDS support synthetic.",
      },
    ],
    recommendedNextStep:
      "Document ISO VG, grease map, and drivetrain fills per Volvo class; align to current PDS.",
  },
  {
    key: "international",
    label: "International Truck",
    profileTitle: "International Truck — Opportunity Profile",
    profileSubtitle: "CK-4 / FA-4, coolant programs, driveline, and service bay opportunities.",
    opportunitySummary:
      "Highway and vocational International fleets need API category discipline, coolant program separation, and driveline conversations in the service bay. Verify Navistar/International requirements on tags and PDS—no implied OEM partnership or approval.",
    commonLubricationConversations: [
      "Over-the-road uptime tied to drain intervals and emissions-hardware-compatible engine oils.",
      "Coolant top-off chaos when OAT/NOAT habits mix in shared bays.",
      "Driveline wear when trans, differential, and PTO fills are treated as interchangeable.",
    ],
    equipmentTypes: [
      "Class 8 highway tractors",
      "Vocational trucks",
      "Medium-duty delivery",
      "Fleet service bays",
    ],
    typicalFluidCategories: [
      { category: "CK-4 / FA-4 engine oils", role: "API category matched to OEM and emissions generation" },
      { category: "HD NOAT / nitrite-free coolant", role: "Cooling program standardization" },
      { category: "Transmission and driveline fluids", role: "Spec-correct ATF and gear programs" },
      { category: "Chassis grease", role: "Fifth wheel and vocational chassis" },
    ],
    opportunitySignals: [
      "CK-4 vs FA-4 confusion on newer tractors",
      "Coolant compatibility failures after roadside top-off",
      "Incomplete service lane chemical bundles",
    ],
    recommendedRepTalkingPoints: [
      "Open with API category, coolant inhibitor family, and driveline spec—not brand default.",
      "International common lubrication conversations; verify requirements on tags and PDS.",
    ],
    discoveryFocus: [
      "What engine families and model years are on the fleet card?",
      "How are coolant bulk tanks labeled for HD vs automotive?",
      "Which transmissions and differentials need spec verification this quarter?",
    ],
    crossSellFocus: ["Power steering and brake fluids", "Shop chemicals", "Grease programs"],
    cautions: [
      EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER,
      "Do not imply Navistar/International OEM approval without PDS proof.",
    ],
    recommendedProductAnchors: [
      {
        name: "Synthetic Blend / Full Synthetic CK-4",
        positioning: "Fleet engine upgrade path with analysis discipline per PDS.",
      },
      {
        name: "Red Heavy Duty NOAT ELC / Gold OAT ELC",
        positioning: "Coolant programs by fleet type—match inhibitor family to PDS and tag.",
      },
      {
        name: "Commercial Gear Lubricants",
        positioning: "Driveline and differential baselines where PDS lists the application.",
      },
    ],
    recommendedNextStep:
      "Segment CK-4/FA-4, coolant chemistry, and driveline SKUs on the International fleet card.",
  },
  {
    key: "western_star",
    label: "Western Star",
    profileTitle: "Western Star — Opportunity Profile",
    profileSubtitle: "Severe-duty vocational highway programs and service bay depth.",
    opportunitySummary:
      "Western Star vocational and logging fleets mirror Class 8 fluid discipline: CK-4 programs, HD coolant, driveline, and chassis grease in the service bay. Verify Western Star fluid guidance on tags and PDS—no implied OEM partnership or approval.",
    commonLubricationConversations: [
      "Severe vocational duty on logging, dump, and heavy-haul routes stressing engines and drivetrains.",
      "PTO and hoist circuits topped with main-tank AW instead of tag-correct hydraulics.",
      "Roadside reliability when coolant and engine PO discipline slips before winter haul.",
    ],
    equipmentTypes: ["Western Star tractors", "Logging trucks", "Dump and vocational chassis"],
    typicalFluidCategories: [
      { category: "CK-4 full synthetic", role: "Severe-duty drain and soot management per PDS" },
      { category: "HD coolant programs", role: "NOAT ELC for diesel wet sleeve where specified" },
      { category: "Gear and trans fluids", role: "Driveline spec correctness" },
      { category: "HD chassis grease", role: "Fifth wheel and vocational joints" },
    ],
    opportunitySignals: [
      "Short drain intervals on logging haul",
      "Coolant top-off with universal green",
      "PTO hydraulic using wrong AW grade",
    ],
    recommendedRepTalkingPoints: [
      "Position severe-duty CK-4 and HD coolant as a vocational system—not single-SKU price plays.",
      "Verify Western Star fluid guidance on tags; no implied OEM partnership.",
    ],
    discoveryFocus: [
      "What vocational applications dominate—logging, dump, or long haul?",
      "Where are coolant and engine bulk tanks shared with light-duty?",
      "Which PTO and hoist circuits need ISO VG review?",
    ],
    crossSellFocus: ["Brake and steering fluids", "Hydraulic AW for PTO", "Gear oil depth"],
    cautions: [EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER],
    recommendedProductAnchors: [
      {
        name: "SAE 5W-40 Full Synthetic CK-4",
        positioning: "Premium severe-duty engine positioning where PDS supports the duty.",
      },
      {
        name: "Commercial HD NOAT ELC Coolant",
        positioning: "HD cooling baseline for diesel programs per PDS.",
      },
      {
        name: "MOLY TAC / HD TAC grease",
        positioning: "Vocational chassis and fifth wheel where PDS lists the application.",
      },
    ],
    recommendedNextStep:
      "Build vocational bay map: engine, coolant, trans/driveline, PTO hydraulics, chassis grease.",
  },
  {
    key: "case_ih_ag",
    label: "Case IH Ag",
    profileTitle: "Case IH Ag — Opportunity Profile",
    profileSubtitle: "Trans-drive, seasonal PM, and full-line AGRIMAX opportunities.",
    opportunitySummary:
      "Case IH ag accounts often need trans-drive discipline, zinc-free options where required, and dealer PM bundling. Use spec conversations only where PDS supports CNH/Case IH duty—do not imply Case IH or CNH partnership, endorsement, or approval.",
    commonLubricationConversations: [
      "Multi-reservoir confusion when transmission, hydraulic, and brake packs share shelf space.",
      "OEM-fluid premium habits without documented spec match on tags.",
      "Seasonal peaks compressing planting and harvest service capacity.",
    ],
    equipmentTypes: ["Case IH tractors", "Combines", "Sprayers", "Magnum / Maxxum lines"],
    typicalFluidCategories: [
      { category: "AGRIMAX trans-drive", role: "UTHF programs per PDS application lists" },
      { category: "Zinc-free trans-drive", role: "Where tags require zinc-free chemistry" },
      { category: "CK-4 engine", role: "Seasonal diesel protection" },
      { category: "Grease and coolant", role: "PM bundle completion" },
    ],
    opportunitySignals: [
      "One red tractor fluid quoted for every compartment",
      "Incomplete dealer PM SKUs",
      "Wet brake issues after generic UTHF",
    ],
    recommendedRepTalkingPoints: [
      "Map Case IH reservoirs before quoting; use AGRIMAX as program depth, not a single SKU.",
      "CNH/Case IH spec language only where PDS documents support—no OEM endorsement implied.",
    ],
    discoveryFocus: [
      "Which Case IH models drive seasonal PM volume?",
      "Are zinc-free and standard trans-drive SKUs separated on the shelf?",
      "What is missing from harvest and planting fluid bundles?",
    ],
    crossSellFocus: ["Grease upgrades", "HD engine on support trucks", "Hydraulic AW on grain carts"],
    cautions: [
      EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER,
      "Do not claim Case IH/CNH approval unless on the PDS for that product.",
    ],
    recommendedProductAnchors: [
      {
        name: "AGRIMAX Trans Drive Hydraulic Fluid",
        positioning: "Anchor trans-hydraulic program conversation where PDS supports the duty.",
      },
      {
        name: "AGRIMAX Zinc Free Trans Drive",
        positioning: "Spec upgrade where tags require zinc-free per PDS.",
      },
      {
        name: "AGRIMAX Extended Life Coolant programs",
        positioning: "Cooling companion on seasonal PM per PDS.",
      },
    ],
    recommendedNextStep: "Standardize AGRIMAX by reservoir on Case IH dealer PM visits.",
  },
  {
    key: "new_holland_ag",
    label: "New Holland Ag",
    profileTitle: "New Holland Ag — Opportunity Profile",
    profileSubtitle: "Utility tractors, hay and forage, and trans-fluid program opportunities.",
    opportunitySummary:
      "New Holland ag and hay operations need trans/hydraulic clarity, seasonal grease PM, and engine/coolant companions. Verify CNH/New Holland duty on tags and PDS—no implied partnership, endorsement, or approval.",
    commonLubricationConversations: [
      "Trans-hydraulic habits on utility and hay fleets mixing fluids across compartments.",
      "Baler and forage wear when grease PM slips on high-hour hay equipment.",
      "Short seasonal windows when hay and forage downtime hits peak weather.",
    ],
    equipmentTypes: ["Utility tractors", "Balers", "Forage harvesters", "Telehandlers", "Skid steers"],
    typicalFluidCategories: [
      { category: "Tractor / UTHF fluids", role: "Wet brake and trans-hydraulic discipline" },
      { category: "AW hydraulics", role: "Loader and telehandler circuits" },
      { category: "Multipurpose grease", role: "Field and baler PM" },
      { category: "CK-4 diesel", role: "Supporting diesel assets" },
    ],
    opportunitySignals: [
      "Telehandler hydraulics on wrong AW grade",
      "Baler bearing failures after marginal grease",
      "Seasonal PM not bundled across fluids",
    ],
    recommendedRepTalkingPoints: [
      "Lead with hay season PM and trans-fluid map—common lubrication conversations, not OEM branding.",
      "Verify New Holland fluid types on equipment tags; PDS governs every recommendation.",
    ],
    discoveryFocus: [
      "What mix of tractors, balers, and telehandlers is on the account?",
      "Where are wet brake or hydraulic complaints showing up?",
      "How complete is the spring and hay-season PM bundle?",
    ],
    crossSellFocus: ["Coolant", "Skid-steer hydraulic AW", "Gear oil on telehandlers"],
    cautions: [EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER],
    recommendedProductAnchors: [
      {
        name: "Universal Red Tractor Fluid",
        positioning: "Baseline tractor conversation with tag and PDS verification.",
      },
      {
        name: "AGRIMAX Trans Drive Hydraulic Fluid",
        positioning: "Program depth on New Holland ag accounts where PDS supports the duty.",
      },
      {
        name: "RED TAC / MOLY TAC",
        positioning: "Field grease and implement PM per PDS.",
      },
    ],
    recommendedNextStep:
      "Bundle trans-drive, grease, engine, and coolant for New Holland seasonal PM.",
  },
];

/** @type {Readonly<Record<string, EquipmentOpportunityProfile>>} */
export const EQUIPMENT_OPPORTUNITY_PROFILE_MAP = Object.freeze(
  EQUIPMENT_OPPORTUNITY_PROFILE_LIST.reduce((acc, entry) => {
    acc[entry.key] = entry;
    return acc;
  }, /** @type {Record<string, EquipmentOpportunityProfile>} */ ({}))
);

export const EQUIPMENT_OPPORTUNITY_PROFILES = Object.freeze([...EQUIPMENT_OPPORTUNITY_PROFILE_LIST]);

const KEY_ALIASES = Object.freeze({
  cat: "cat",
  caterpillar: "cat",
  cat_equipment: "cat",
  kubota: "kubota",
  kubota_equipment: "kubota",
  john_deere_ag: "john_deere_ag",
  john_deere: "john_deere_ag",
  deere: "john_deere_ag",
  deere_ag: "john_deere_ag",
  jd_ag: "john_deere_ag",
  volvo_ce: "volvo_ce",
  volvo: "volvo_ce",
  international: "international",
  international_truck: "international",
  navistar: "international",
  western_star: "western_star",
  westernstar: "western_star",
  case_ih_ag: "case_ih_ag",
  case_ih: "case_ih_ag",
  caseih: "case_ih_ag",
  new_holland_ag: "new_holland_ag",
  new_holland: "new_holland_ag",
  newholland: "new_holland_ag",
});

/**
 * @param {unknown} input
 * @returns {string}
 */
export function normalizeEquipmentProfileKey(input) {
  if (input === null || input === undefined) return "";
  const compact = String(input).trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (!compact) return "";
  return KEY_ALIASES[compact] || compact;
}

/**
 * @param {unknown} key
 * @returns {EquipmentOpportunityProfile | null}
 */
export function getEquipmentOpportunityProfile(key) {
  const normalized = normalizeEquipmentProfileKey(key);
  if (!normalized) return null;
  return EQUIPMENT_OPPORTUNITY_PROFILE_MAP[normalized] || null;
}

/**
 * @returns {EquipmentOpportunityProfile[]}
 */
export function listEquipmentOpportunityProfiles() {
  return [...EQUIPMENT_OPPORTUNITY_PROFILES];
}
