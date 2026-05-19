/**
 * Phase 7F.2 — Deterministic OEM / spec conversation mappings (PDS-supported only).
 * Not OEM endorsement, approval, or partnership. Reps verify tags, manuals, and current PDS.
 */

export const OEM_SPEC_MAPPING_VERSION = 1;

export const OEM_SPEC_VERIFY_LINE =
  "Verify requirements using equipment tags, operator manuals, and the current PDS before any recommendation.";

export const OEM_SPEC_POSITIONING_PREFIX =
  "Recommended where application lists and current PDS support this conversation—not OEM endorsement or approval.";

/**
 * @typedef {{
 *   specLabel: string,
 *   fluidCategory: string,
 *   klondikeProducts: string[],
 *   positioning: string,
 * }} OemSpecConversationRow
 */

/**
 * @typedef {{
 *   key: string,
 *   label: string,
 *   equipmentContext: string,
 *   likelySpecConversations: OemSpecConversationRow[],
 *   specWhatToAsk: string[],
 *   dealerCoaching: string[],
 * }} OemSpecMapping
 */

/** @type {Readonly<Record<string, OemSpecMapping>>} */
export const OEM_SPEC_MAPPINGS = Object.freeze({
  cat: {
    key: "cat",
    label: "CAT / Caterpillar",
    equipmentContext: "Earthmoving hydraulics, final drives, and site support diesels",
    likelySpecConversations: [
      {
        specLabel: "Caterpillar TO-4 / TO-4M",
        fluidCategory: "Transmission / drive train",
        klondikeProducts: [
          "KLONDIKE TDTO-4 Transmission / Drive Train Oils",
          "KLONDIKE TDTO-4 All Season Synthetic Blend",
        ],
        positioning:
          "PDS supports TO-4 / drive-train conversations for off-highway compartments—match builder tag, not bulk color.",
      },
      {
        specLabel: "Caterpillar TO-2 (legacy)",
        fluidCategory: "Transmission / drive train",
        klondikeProducts: ["KLONDIKE TDTO-4 Transmission / Drive Train Oils"],
        positioning: "Legacy TO-2 tags may still appear on older iron—confirm current tag and PDS application row.",
      },
      {
        specLabel: "CAT HYDO Advanced 10 / SAE 10W hydraulic",
        fluidCategory: "Hydraulic (SAE 10W programs)",
        klondikeProducts: [
          "KLONDIKE SAE 10W Heavy Duty Hydraulic Oil",
          "KLONDIKE Professional Formula AW Hydraulic Fluids",
          "KLONDIKE Advanced Formula AW Hydraulic Fluids",
        ],
        positioning:
          "PDS indexes SAE 10W and HYDO-style programs—ISO VG and SAE 10W are not interchangeable without tag review.",
      },
      {
        specLabel: "TDTO / powershift / wet brake compartments",
        fluidCategory: "Transmission & wet brake",
        klondikeProducts: [
          "KLONDIKE TDTO-4 Transmission / Drive Train Oils",
          "KLONDIKE Universal Transmission Fluid",
        ],
        positioning: "Separate transmission, wet brake, and hydraulic reservoirs—read compartment label before quoting.",
      },
      {
        specLabel: "Final drives & differentials",
        fluidCategory: "Gear oil",
        klondikeProducts: [
          "KLONDIKE Commercial Gear Lubricants",
          "KLONDIKE Full Synthetic Gear Lubricants",
          "KLONDIKE Industrial EP Gear Lubricants",
        ],
        positioning: "GL-5 / industrial EP per axle and final-drive tag—one compartment at a time.",
      },
    ],
    specWhatToAsk: [
      "Are customers asking for CAT HYDO or TO-4 fluids by name?",
      "What ISO VG or SAE 10W is on the hydraulic tag for the unit that ran hot?",
      "Are travel, swing, and main hydraulics topped from the same bulk drum?",
      "Which compartment failed last—final drive, transmission, or main hydraulic?",
    ],
    dealerCoaching: [
      "Walk compartments before SKUs—production hours lost beats brand habit.",
      "Frame hydraulics as ISO VG / SAE 10W discipline backed by analysis.",
      "Bundle grease and gear only where each line is on the current PDS.",
    ],
  },
  john_deere_ag: {
    key: "john_deere_ag",
    label: "John Deere Ag",
    equipmentContext: "Tractors, combines, and seasonal ag PM",
    likelySpecConversations: [
      {
        specLabel: "John Deere J20C / J20D",
        fluidCategory: "Trans-hydraulic / wet brake (UTF)",
        klondikeProducts: [
          "AGRIMAX Trans Drive Hydraulic Fluid",
          "KLONDIKE Universal Tractor Fluid Full Synthetic",
          "KLONDIKE Universal Red Tractor Fluid",
        ],
        positioning:
          "PDS supports J20C/J20D UTF conversations—map common sump vs dedicated wet-brake fills on the tag.",
      },
      {
        specLabel: "Wet brake / common sump chatter",
        fluidCategory: "Wet brake / UTHF",
        klondikeProducts: [
          "AGRIMAX Trans Drive Hydraulic Fluid",
          "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
          "KLONDIKE Wet Brake Fluid Full Synthetic",
        ],
        positioning: "Wet brake noise is often fluid category—verify tag before brake work narrative.",
      },
      {
        specLabel: "Trans-drive / UTHF",
        fluidCategory: "Transmission & hydraulic",
        klondikeProducts: [
          "AGRIMAX Trans Drive Hydraulic Fluid",
          "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
        ],
        positioning: "Seasonal PM bundles trans-drive with engine and grease—per PDS application lists.",
      },
      {
        specLabel: "CK-4 seasonal diesel",
        fluidCategory: "Engine",
        klondikeProducts: [
          "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil",
          "KLONDIKE Synthetic Blend CK-4 Heavy Duty Engine Oils",
        ],
        positioning: "API CK-4 from tag—not OEM jug color.",
      },
    ],
    specWhatToAsk: [
      "Are customers buying OEM-branded tractor fluids?",
      "Are wet brakes noisy after the last fluid change?",
      "What fluid types do tags require in trans, hydraulic, and wet-brake sumps?",
      "What's in today's harvest PM bundle beyond engine oil?",
    ],
    dealerCoaching: [
      "Same spec, same protection, save money—where PDS supports; no Deere endorsement implied.",
      "Map every sump before quoting one red drum.",
      "Bundle trans-drive, grease, coolant on seasonal visits.",
    ],
  },
  case_ih_ag: {
    key: "case_ih_ag",
    label: "Case IH Ag",
    equipmentContext: "CNH / Case IH tractors, combines, sprayers",
    likelySpecConversations: [
      {
        specLabel: "CNH Hy-Tran / MAT trans-drive style",
        fluidCategory: "Trans-hydraulic / UTHF",
        klondikeProducts: [
          "AGRIMAX Trans Drive Hydraulic Fluid",
          "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
        ],
        positioning: "Hy-Tran style conversations map to AGRIMAX trans-drive where PDS lists CNH duty—verify tag.",
      },
      {
        specLabel: "Wet brake / multi-reservoir",
        fluidCategory: "Wet brake / transmission",
        klondikeProducts: [
          "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
          "KLONDIKE Universal Red Tractor Fluid",
        ],
        positioning: "Separate zinc-free and standard programs on shelf and work orders.",
      },
      {
        specLabel: "Seasonal PM (engine, grease, coolant)",
        fluidCategory: "Full-line ag program",
        klondikeProducts: [
          "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil",
          "AGRIMAX Poly Tac Grease",
          "AGRIMAX Extended Life Coolant programs",
        ],
        positioning: "Dealer PM kits should list each compartment—filters alone shrink margin.",
      },
      {
        specLabel: "Gear & loader hydraulics",
        fluidCategory: "Gear oil & AW hydraulic",
        klondikeProducts: [
          "KLONDIKE Commercial Gear Lubricants",
          "KLONDIKE Professional Formula AW Hydraulic Fluids",
        ],
        positioning: "Loaders and grain carts may need AW—not assumed from tractor sump.",
      },
    ],
    specWhatToAsk: [
      "Which Case IH models drive your seasonal PM volume?",
      "Are zinc-free and standard trans-drive SKUs separated?",
      "Are wet brakes noisy on compact or row-crop units?",
      "What is missing from planting or harvest fluid bundles?",
    ],
    dealerCoaching: [
      "CNH/Case IH spec language only where PDS documents support.",
      "Counter map: trans-drive, engine, wet brake, grease, coolant.",
    ],
  },
  new_holland_ag: {
    key: "new_holland_ag",
    label: "New Holland Ag",
    equipmentContext: "Utility tractors, hay, forage, telehandlers",
    likelySpecConversations: [
      {
        specLabel: "CNH / New Holland UTHF & wet brake",
        fluidCategory: "Trans-hydraulic",
        klondikeProducts: [
          "AGRIMAX Trans Drive Hydraulic Fluid",
          "KLONDIKE Universal Red Tractor Fluid",
        ],
        positioning: "PDS supports trans-hydraulic duty for ag compartments—verify New Holland tag.",
      },
      {
        specLabel: "Telehandler / loader AW",
        fluidCategory: "Hydraulic AW",
        klondikeProducts: [
          "KLONDIKE Professional Formula AW Hydraulic Fluids",
          "KLONDIKE Multi-Viscosity AW Hydraulic Fluids",
        ],
        positioning: "Standalone hydraulic circuits—not tractor sump fluid.",
      },
      {
        specLabel: "Hay season grease PM",
        fluidCategory: "Grease",
        klondikeProducts: ["RED TAC", "MOLY TAC", "AGRIMAX Poly Tac Grease"],
        positioning: "Baler and implement PM—shock and washout on field duty.",
      },
    ],
    specWhatToAsk: [
      "What mix of tractors, balers, and telehandlers is on the account?",
      "Where are wet brake or hydraulic complaints showing up?",
      "How complete is the spring hay-season PM bundle?",
    ],
    dealerCoaching: [
      "Hay season PM: trans-fluid map first, then grease and engine companions.",
      "No implied New Holland partnership—tags and PDS govern every fill.",
    ],
  },
  international: {
    key: "international",
    label: "International / Navistar",
    equipmentContext: "Class 8 and vocational service lanes",
    likelySpecConversations: [
      {
        specLabel: "API CK-4 / FA-4",
        fluidCategory: "HD engine oil",
        klondikeProducts: [
          "KLONDIKE Synthetic Blend CK-4 Heavy Duty Engine Oils",
          "KLONDIKE Full Synthetic CK-4 Heavy Duty Engine Oils",
          "SAE 10W-30 FA-4 Synthetic Blend Heavy Duty Engine Oil",
        ],
        positioning: "VIN and emissions hardware drive API category—FA-4 only where OEM allows per tag and PDS.",
      },
      {
        specLabel: "HD NOAT / nitrite-free coolant",
        fluidCategory: "Coolant",
        klondikeProducts: [
          "Red Heavy Duty NOAT ELC Antifreeze Coolant",
          "Gold Automotive OAT ELC Antifreeze Coolant",
          "Commercial HD NOAT ELC Antifreeze Coolant",
        ],
        positioning: "Separate inhibitor families—no automotive OAT shorthand for HD NOAT programs.",
      },
      {
        specLabel: "Transmission & axle / PTO",
        fluidCategory: "Driveline & vocational hydraulics",
        klondikeProducts: [
          "KLONDIKE Commercial Gear Lubricants",
          "KLONDIKE Universal Transmission Fluid",
          "KLONDIKE Professional Formula AW Hydraulic Fluids",
        ],
        positioning: "PTO and hoist circuits are not engine bulk—verify ISO VG and compartment.",
      },
      {
        specLabel: "Chassis & fifth wheel",
        fluidCategory: "Grease",
        klondikeProducts: ["MOLY TAC", "Fifth Wheel Grease", "HD TAC"],
        positioning: "Lane bundle: engine, coolant, driveline, grease per PDS.",
      },
    ],
    specWhatToAsk: [
      "Which model years are FA-4 vs CK-4 on the fleet card?",
      "How are HD coolant bulk tanks labeled vs automotive OAT?",
      "What transmission and axle tags are on the last comeback unit?",
      "Where do PTO hydraulics get fluid today?",
    ],
    dealerCoaching: [
      "Service lane program: engine API category, coolant inhibitor, driveline, grease.",
      "No implied Navistar/International approval without exact PDS wording.",
    ],
  },
  western_star: {
    key: "western_star",
    label: "Western Star",
    equipmentContext: "Vocational logging, dump, severe highway",
    likelySpecConversations: [
      {
        specLabel: "CK-4 severe-duty diesel",
        fluidCategory: "Engine",
        klondikeProducts: [
          "SAE 5W-40 Full Synthetic CK-4 Heavy Duty Engine Oils",
          "KLONDIKE Synthetic Blend CK-4 Heavy Duty Engine Oils",
        ],
        positioning: "Severe vocational drains—synthetic CK-4 where analysis and PDS support.",
      },
      {
        specLabel: "HD NOAT coolant",
        fluidCategory: "Coolant",
        klondikeProducts: ["Commercial HD NOAT ELC Antifreeze Coolant"],
        positioning: "HD wet-sleeve diesel programs per tag.",
      },
      {
        specLabel: "PTO / hoist hydraulics",
        fluidCategory: "Hydraulic AW",
        klondikeProducts: ["KLONDIKE Multi-Viscosity AW Hydraulic Fluids"],
        positioning: "Separate from engine bulk—ISO VG from tag.",
      },
    ],
    specWhatToAsk: [
      "What vocational duty dominates—logging, dump, or long haul?",
      "Are coolant and engine bulk shared with light-duty?",
      "Which PTO circuits need ISO VG review?",
    ],
    dealerCoaching: [
      "Vocational system sell: engine, coolant, trans/driveline, PTO, chassis grease.",
    ],
  },
  kubota: {
    key: "kubota",
    label: "Kubota",
    equipmentContext: "Compact tractors and utility equipment",
    likelySpecConversations: [
      {
        specLabel: "Trans-hydraulic / wet brake (compact)",
        fluidCategory: "UTHF / tractor fluid",
        klondikeProducts: [
          "KLONDIKE Universal Red Tractor Fluid",
          "AGRIMAX Trans Drive Hydraulic Fluid",
        ],
        positioning: "Compact sumps need wet-brake compatibility on tag—PDS governs SKU.",
      },
      {
        specLabel: "Standalone hydraulic (loaders)",
        fluidCategory: "AW hydraulic",
        klondikeProducts: ["KLONDIKE Professional Formula AW Hydraulic Fluids"],
        positioning: "Utility loaders—not every sump gets tractor fluid.",
      },
    ],
    specWhatToAsk: [
      "Are wet brakes chattering on compact tractors?",
      "How many reservoir types are on the equipment tag?",
      "What is in the seasonal PM kit besides engine oil?",
    ],
    dealerCoaching: [
      "Seasonal PM map: trans/hydraulic, grease, coolant—no implied Kubota partnership.",
    ],
  },
  volvo_ce: {
    key: "volvo_ce",
    label: "Volvo CE",
    equipmentContext: "Construction loaders and excavators",
    likelySpecConversations: [
      {
        specLabel: "Hydraulic ISO VG programs",
        fluidCategory: "Hydraulic",
        klondikeProducts: [
          "KLONDIKE XVI Synthetic Hydraulic Fluids",
          "KLONDIKE Multi-Viscosity AW Hydraulic Fluids",
        ],
        positioning: "ISO VG discipline on excavator and loader circuits per tag and PDS.",
      },
      {
        specLabel: "Final drives & grease",
        fluidCategory: "Gear & grease",
        klondikeProducts: [
          "KLONDIKE Full Synthetic Gear Lubricants",
          "MOLY TAC / ULTRA TAC",
        ],
        positioning: "Pins and final drives are separate conversations from main hydraulic bulk.",
      },
    ],
    specWhatToAsk: [
      "What ISO VG tags are on the worst hydraulic circuit?",
      "Where did pins or final drives fail last?",
      "Are bulk tanks labeled by ISO VG?",
    ],
    dealerCoaching: [
      "Construction yard: hydraulics, grease, gear, engine per compartment tag.",
    ],
  },
});

const OEM_KEY_ALIASES = Object.freeze({
  cat: "cat",
  caterpillar: "cat",
  cat_equipment: "cat",
  john_deere_ag: "john_deere_ag",
  john_deere: "john_deere_ag",
  deere: "john_deere_ag",
  deere_ag: "john_deere_ag",
  jd_ag: "john_deere_ag",
  case_ih_ag: "case_ih_ag",
  case_ih: "case_ih_ag",
  caseih: "case_ih_ag",
  new_holland_ag: "new_holland_ag",
  new_holland: "new_holland_ag",
  newholland: "new_holland_ag",
  international: "international",
  international_truck: "international",
  navistar: "international",
  western_star: "western_star",
  westernstar: "western_star",
  kubota: "kubota",
  kubota_equipment: "kubota",
  kubota_ag: "kubota",
  volvo_ce: "volvo_ce",
  volvo: "volvo_ce",
});

const CATEGORY_KEY_ALIASES = Object.freeze({
  hydraulic: "hydraulic",
  grease: "grease",
  hd_engine_oil: "hd_engine_oil",
  hdengine: "hd_engine_oil",
  gear_oil: "gear_oil",
  gearoil: "gear_oil",
  transmission: "transmission",
  coolant: "coolant",
  agrimax: "agrimax",
  food_grade: "food_grade",
  foodgrade: "food_grade",
  environmental_eal: "environmental_eal",
  environmental: "environmental_eal",
  eal: "environmental_eal",
  industrial_specialty: "industrial_specialty",
  industrial: "industrial_specialty",
});

/**
 * @typedef {{
 *   whatToAsk: string[],
 *   specCallouts: string[],
 *   relatedOemKeys: string[],
 * }} CategoryOemSpecCoaching
 */

/** @type {Readonly<Record<string, CategoryOemSpecCoaching>>} */
export const CATEGORY_OEM_SPEC_COACHING = Object.freeze({
  hydraulic: {
    whatToAsk: [
      "Are customers asking for CAT HYDO or SAE 10W fluids?",
      "Are they matching ISO VG correctly on pump tags?",
      "Are hydraulic systems running hot or slow on first shift?",
      "Are travel, swing, and main tanks sharing one AW bulk drum?",
    ],
    specCallouts: [
      "CAT HYDO Advanced 10 / SAE 10W → KLONDIKE SAE 10W Heavy Duty Hydraulic Oil (verify tag)",
      "ISO VG AW programs → Professional / Advanced / MV / XVI per PDS",
    ],
    relatedOemKeys: ["cat", "volvo_ce"],
  },
  transmission: {
    whatToAsk: [
      "Are wet brakes noisy after fluid service?",
      "Are customers asking for OEM tractor or TO-4 fluids?",
      "Are powershift compartments sharing oil with AW bulk?",
      "Which compartment is being filled—trans, wet brake, or driveline?",
    ],
    specCallouts: [
      "CAT TO-4 / TO-4M → KLONDIKE TDTO-4 Transmission / Drive Train Oils",
      "J20C / UTF → AGRIMAX trans-drive or Universal Tractor Fluid per PDS",
    ],
    relatedOemKeys: ["cat", "john_deere_ag", "case_ih_ag"],
  },
  agrimax: {
    whatToAsk: [
      "Are customers buying OEM-branded tractor fluids?",
      "Are wet brakes noisy?",
      "Are PM kits missing gear oil, grease, or coolant?",
      "Are green vs red line fluids split by equipment type?",
    ],
    specCallouts: [
      "J20C / J20D / Hy-Tran style → AGRIMAX trans-drive programs per PDS",
      "Zinc-free tags → AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
    ],
    relatedOemKeys: ["john_deere_ag", "case_ih_ag", "new_holland_ag"],
  },
  grease: {
    whatToAsk: [
      "Do customers complain about grease washout on pins?",
      "Which joints fail first—wet booms or chassis?",
      "Are you on one grease SKU for every zerk?",
    ],
    specCallouts: ["Severe mobile duty → RED TAC through nano ladder per PDS"],
    relatedOemKeys: ["cat", "volvo_ce"],
  },
  hd_engine_oil: {
    whatToAsk: [
      "What API category is on the bulk tank—CK-4 or FA-4?",
      "Which units are emissions-sensitive for FA-4 only?",
      "Do you pair engine oil with HD coolant on the fleet card?",
    ],
    specCallouts: [
      "CK-4 / FA-4 → KLONDIKE synthetic blend and full synthetic CK-4 per VIN/tag",
    ],
    relatedOemKeys: ["international", "western_star"],
  },
  coolant: {
    whatToAsk: [
      "Do you stock coolant on the same program as HD engine?",
      "What inhibitor family is in each bulk tank?",
      "What top-off chemistry was used after the last partial drain?",
    ],
    specCallouts: [
      "HD NOAT → Red / Commercial HD NOAT ELC",
      "Nitrite-free mixed fleet → Gold OAT ELC per PDS",
    ],
    relatedOemKeys: ["international", "western_star"],
  },
  gear_oil: {
    whatToAsk: [
      "Are you seeing gearbox or final-drive failures?",
      "Is this differential, final drive, or industrial reducer?",
      "What viscosity is on the compartment tag?",
    ],
    specCallouts: [
      "Final drives → Commercial / Full Synthetic Gear per GL-5 or industrial EP tag",
    ],
    relatedOemKeys: ["cat", "international"],
  },
  food_grade: {
    whatToAsk: [
      "Which zones require H1 vs general plant fluids?",
      "What did the last audit flag?",
    ],
    specCallouts: ["NSF H1 only where PDS registers H1 for that SKU"],
    relatedOemKeys: [],
  },
  environmental_eal: {
    whatToAsk: [
      "What site or contract language triggers biodegradable review?",
      "Which equipment stays on standard AW vs EAL?",
    ],
    specCallouts: ["ENVIRO → BIO → BIO-Synthetic EAL per PDS environmental statements"],
    relatedOemKeys: ["cat"],
  },
  industrial_specialty: {
    whatToAsk: [
      "Is this reservoir turbine, compressor, or gear?",
      "What oil class is in the compressor today?",
    ],
    specCallouts: ["Turbine R&O → Long Life Turbine Oils—not AW in turbine sumps"],
    relatedOemKeys: [],
  },
});

/**
 * @param {unknown} rawKey
 * @returns {string}
 */
export function normalizeOemSpecKey(rawKey) {
  if (rawKey === null || rawKey === undefined) return "";
  const compact = String(rawKey).trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (!compact) return "";
  return OEM_KEY_ALIASES[compact] || compact;
}

/**
 * @param {unknown} rawKey
 * @returns {string}
 */
export function normalizeCategorySpecKey(rawKey) {
  if (rawKey === null || rawKey === undefined) return "";
  const compact = String(rawKey).trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (!compact) return "";
  return CATEGORY_KEY_ALIASES[compact] || compact;
}

/**
 * @param {unknown} oemKey
 * @returns {OemSpecMapping | null}
 */
export function getOemSpecMapping(oemKey) {
  const normalized = normalizeOemSpecKey(oemKey);
  if (!normalized) return null;
  return OEM_SPEC_MAPPINGS[normalized] || null;
}

/**
 * @param {unknown} categoryKey
 * @returns {CategoryOemSpecCoaching | null}
 */
export function getCategoryOemSpecCoaching(categoryKey) {
  const normalized = normalizeCategorySpecKey(categoryKey);
  if (!normalized) return null;
  return CATEGORY_OEM_SPEC_COACHING[normalized] || null;
}

/**
 * Flatten spec rows into short callout lines for sell sheets.
 * @param {OemSpecMapping | null} mapping
 * @returns {string[]}
 */
export function formatOemSpecCallouts(mapping) {
  if (!mapping?.likelySpecConversations?.length) return [];
  return mapping.likelySpecConversations.map(
    (row) =>
      `${row.specLabel} (${row.fluidCategory}) → ${row.klondikeProducts.slice(0, 2).join("; ")}. ${OEM_SPEC_POSITIONING_PREFIX}`
  );
}

/**
 * @param {import('./equipmentOpportunityProfiles.js').EquipmentOpportunityProfile} profile
 * @returns {import('./equipmentOpportunityProfiles.js').EquipmentOpportunityProfile & {
 *   oemSpecMapping: OemSpecMapping | null,
 *   likelySpecConversations: OemSpecConversationRow[],
 *   specWhatToAsk: string[],
 * }}
 */
export function enrichEquipmentOpportunityProfile(profile) {
  if (!profile) return profile;
  const mapping = getOemSpecMapping(profile.key);
  const likelySpecConversations = mapping?.likelySpecConversations || [];
  const specWhatToAsk = mapping?.specWhatToAsk || [];
  const dealerCoaching = mapping?.dealerCoaching || [];

  const specFluidCategories = likelySpecConversations.map((row) => ({
    category: `${row.specLabel} — ${row.fluidCategory}`,
    role: `${row.klondikeProducts.join(", ")}. ${OEM_SPEC_POSITIONING_PREFIX}`,
  }));

  const specProductAnchors = likelySpecConversations.flatMap((row) =>
    row.klondikeProducts.map((name) => ({
      name,
      positioning: `PDS supports ${row.specLabel} conversations for ${row.fluidCategory}. ${OEM_SPEC_VERIFY_LINE}`,
    }))
  );

  const typicalFluidCategories = mergeUniqueProfileRefs(
    profile.typicalFluidCategories,
    specFluidCategories,
    10
  );
  const recommendedProductAnchors = mergeUniqueProductAnchors(
    profile.recommendedProductAnchors,
    specProductAnchors,
    8
  );
  const discoveryFocus = mergeUniqueStrings(profile.discoveryFocus, specWhatToAsk, 8);
  const recommendedRepTalkingPoints = mergeUniqueStrings(
    profile.recommendedRepTalkingPoints,
    dealerCoaching,
    6
  );

  return {
    ...profile,
    oemSpecMapping: mapping,
    likelySpecConversations,
    specWhatToAsk,
    typicalFluidCategories,
    recommendedProductAnchors,
    discoveryFocus,
    recommendedRepTalkingPoints,
    opportunitySummary: mapping
      ? `${profile.opportunitySummary} Likely spec topics: ${mapping.likelySpecConversations
          .slice(0, 3)
          .map((r) => r.specLabel)
          .join(", ")}—${OEM_SPEC_VERIFY_LINE}`
      : profile.opportunitySummary,
  };
}

/**
 * @param {object} category
 * @returns {object}
 */
export function attachCategoryOemSpecCoaching(category) {
  if (!category?.key) return category;
  const coaching = getCategoryOemSpecCoaching(category.key);
  if (!coaching) return category;
  return {
    ...category,
    oemSpecCoaching: coaching,
  };
}

function mergeUniqueStrings(primary, supplement, max = 8) {
  const out = [];
  const seen = new Set();
  const push = (line) => {
    const s = String(line || "").trim();
    if (!s) return;
    const key = s.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(s);
  };
  for (const item of Array.isArray(primary) ? primary : []) push(item);
  for (const item of Array.isArray(supplement) ? supplement : []) {
    push(item);
    if (out.length >= max) break;
  }
  return out;
}

function mergeUniqueProfileRefs(primary, supplement, max = 10) {
  const out = [];
  const seen = new Set();
  const push = (item) => {
    const cat = String(item?.category || "").trim();
    if (!cat) return;
    const key = cat.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ category: cat, role: String(item?.role || "").trim() });
  };
  for (const item of Array.isArray(primary) ? primary : []) push(item);
  for (const item of Array.isArray(supplement) ? supplement : []) {
    push(item);
    if (out.length >= max) break;
  }
  return out;
}

function mergeUniqueProductAnchors(primary, supplement, max = 8) {
  const out = [];
  const seen = new Set();
  const push = (item) => {
    const name = String(item?.name || "").trim();
    if (!name) return;
    const key = name.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({
      name,
      positioning: String(item?.positioning || "").trim(),
    });
  };
  for (const item of Array.isArray(primary) ? primary : []) push(item);
  for (const item of Array.isArray(supplement) ? supplement : []) {
    push(item);
    if (out.length >= max) break;
  }
  return out;
}
