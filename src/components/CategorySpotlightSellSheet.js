/**
 * CategorySpotlightSellSheet ? standalone category / system-solution sell sheet.
 * Layout id: category-spotlight-sell-sheet-v6d1-1
 * Not wired into App.js yet.
 */

import React from "react";
import { getCategoryProgramIntelligence } from "../data/salesEnablement/categoryProgramIntelligence.js";
import {
  getCategoryOemSpecCoaching,
  OEM_SPEC_VERIFY_LINE,
} from "../data/salesEnablement/oemSpecMappings.js";
import { KLONDIKE_GUARANTEE_LINES } from "../data/salesEnablement/categoryProgramIntelligence.js";

export const CATEGORY_SPOTLIGHT_SELL_SHEET_LAYOUT_ID = "category-spotlight-sell-sheet-v6f11";

/** Application/spec-driven categories use intelligence playbooks, not performance ladders. */
const CATEGORY_INTELLIGENCE_PRESET_KEYS = [
  "agrimax",
  "coolant",
  "foodGrade",
  "environmental",
  "industrialSpecialty",
  "transmission",
];

const KLONDIKE_HEADER_LOGO_SRC = "/klondike-horizontal-logo.png";

const BRAND = {
  navy: "#0f172a",
  headerNavy: "#0E1B33",
  navyMid: "#1e3a8a",
  navyDeep: "#172554",
  orange: "#ea580c",
  orangeLight: "#fb923c",
  orangeMuted: "#fdba74",
  slate: "#64748b",
  white: "#ffffff",
};

const DEMO_DEFAULTS = {
  categoryTitle: "KLONDIKE Hydraulic Fluids",
  categorySubtitle: "Reliable fluid power protection for mixed fleets and demanding equipment.",
  opportunitySummary:
    "Structure hydraulic conversations around ISO VG discipline, pump tags, and contamination control before any tier upgrade. Position Klondike as a system program ? not a single-SKU swap.",
  categoryImageUrl: "",
  productImages: [],
  keyBenefits: [
    {
      iconKey: "expansion",
      label: "Program depth",
      sub: "Grow ISO VG discipline and ladder tier where construction, ag, and industrial hours are climbing.",
    },
    {
      iconKey: "mix",
      label: "Product Mix Growth",
      sub: "Rationalize AW, MV, and specialty hydraulics across bulk and packaged behavior.",
    },
    {
      iconKey: "consolidation",
      label: "Supplier Consolidation",
      sub: "Standardize the yard on one hydraulic program instead of fragmented SKUs.",
    },
    {
      iconKey: "uptime",
      label: "Equipment Uptime",
      sub: "Fewer heat, foam, and slow-response events that pull assets offline.",
    },
    {
      iconKey: "retention",
      label: "Customer Retention",
      sub: "Protect dealer trust when repeat circuit failures threaten the fluid account.",
    },
    {
      iconKey: "downtime",
      label: "Reduced Downtime",
      sub: "Align filtration, breathers, and fluid tier before failures cascade.",
    },
  ],
  idealCustomers: [
    "Construction & rental fleets",
    "Agriculture dealers",
    "Industrial plants",
    "Municipal / transit shops",
    "Mobile equipment yards",
    "Mixed-fleet distributors",
  ],
  applications: [
    "Skid-steer hydraulics",
    "Excavator circuits",
    "Press & lift systems",
    "Cold-morning response",
    "Bulk tank programs",
    "Outdoor wash-down duty",
  ],
  featuredProducts: [
    { name: "AW Hydraulic Fluid", role: "Core mixed-fleet anti-wear program" },
    { name: "MV Hydraulic Fluid", role: "Multi-viscosity seasonal coverage" },
    { name: "Arctic Blue Hydraulic Fluid", role: "Cold-start and low-temp yards" },
    { name: "Bio-Synthetic EAL Hydraulic Fluid", role: "Sensitive-site options where applicable" },
  ],
  crossSell: [
    { title: "Grease", desc: "Pins, bearings, and chassis protection across the yard", iconKey: "grease" },
    { title: "Gear Oils", desc: "Drivetrain and reducer programs for mobile equipment", iconKey: "gear" },
    { title: "Heavy Duty Engine Oils", desc: "On- and off-highway engine coverage for mixed fleets", iconKey: "engine" },
    { title: "Coolants", desc: "Fleet cooling discipline tied to hydraulic accounts", iconKey: "coolant" },
  ],
  repTalkTrack: [
    "Lead with OEM tags and operating temperature bands before discussing fluid tier.",
    "Position filtration and breathers ahead of chemistry swaps on repeat-failure circuits.",
    "Anchor upgrades to documented circuit evidence ? not shelf habit or brand loyalty alone.",
    "Pair bulk and packaged strategy with how the yard actually tops off.",
  ],
  discoveryQuestions: [
    "Which circuits show foam, heat, or slow response first thing in the morning?",
    "When did filters, breathers, or sampling last trend on your worst assets?",
    "What ISO VG and OEM tags are on the pumps you need running this week?",
    "Are bulk tanks and packaged top-offs aligned to the same category ladder?",
  ],
  cautions: [
    "Confirm OEM and component guidance before changing viscosity grade or chemistry.",
    "Do not mix incompatible fluids without flush and consultation.",
    "See product data sheets for each SKU discussed.",
  ],
  recommendedNextStep:
    "Expand hydraulic penetration: standardize ISO VG ladders, consolidate suppliers, and bundle filtration with the category program to reduce downtime across equipment groups.",
  pdsLinks: [],
  productLadder: null,
};

const LADDER_TIER_ORDER = ["good", "better", "best", "ultimate"];

/** Bottom product lineup strip only ? never used inside ladder tier slots. */
const LADDER_PRODUCTS_LINEUP_SRC = "/products.png";

/** HD engine specialty lines ? program reference lineup, not GOOD/BETTER/BEST/ULTIMATE ladder. */
const HD_ENGINE_PROGRAM_ANCHORS = [
  { name: "Low-ash natural gas engine oils", role: "Specialty / natural gas (confirm PDS)" },
  { name: "Railroad & severe-service HD programs", role: "Specialty / railroad (confirm category on PDS)" },
];

const SPECIALTY_LADDER_PRODUCT_RE =
  /\b(railroad|rock drill|natural gas|compressor|circulating|turbine|wet brake|way oil|saw guide|heat transfer|non-detergent|specialty industrial|severe-service|utm)\b/i;

function isLadderLineupStripImage(url) {
  const u = String(url || "").trim();
  return !u || u === LADDER_PRODUCTS_LINEUP_SRC || /\/products\.png$/i.test(u);
}

function cleanCategoryDisplayText(text) {
  if (text == null) return "";
  let t = String(text);
  if (!t) return "";
  t = t.replace(/\uFFFD/g, "\u00b7");
  t = t.replace(/GOOD \? BETTER \? BEST \? ULTIMATE/gi, "GOOD \u00b7 BETTER \u00b7 BEST \u00b7 ULTIMATE");
  t = t.replace(
    /PROGRAM AWARENESS \? WHERE IT FITS \? REP OPPORTUNITY \? CROSS-SELL PATH/gi,
    "PROGRAM AWARENESS \u00b7 WHERE IT FITS \u00b7 REP OPPORTUNITY \u00b7 CROSS-SELL PATH"
  );
  t = t.replace(/CORE \? SPECIALTY \? SEVERE DUTY \? COMPLIANCE/gi, "PROGRAM AWARENESS \u00b7 WHERE IT FITS \u00b7 REP OPPORTUNITY \u00b7 CROSS-SELL PATH");
  t = t.replace(/CORE \? COMPLIANCE/gi, "PROGRAM AWARENESS \u00b7 CROSS-SELL PATH");
  t = t.replace(/GOOD \? ULTIMATE/gi, "GOOD \u00b7 ULTIMATE");
  t = t.replace(/\?not/gi, " \u2014 not");
  t = t.replace(/\?only/gi, "-only");
  t = t.replace(/\?then/gi, " \u2014 then");
  t = t.replace(/\?confirm/gi, " \u2014 confirm");
  t = t.replace(/\?verify/gi, " \u2014 verify");
  t = t.replace(/\?per\b/gi, " \u2014 per");
  t = t.replace(/\?and\b/gi, " \u2014 and");
  t = t.replace(/\?no\b/gi, " \u2014 no");
  t = t.replace(/ \? /g, " \u2014 ");
  t = t.replace(/\? /g, "\u2014 ");
  t = t.replace(/ \?/g, "");
  return t.trim();
}

function isSpecialtyLadderProduct(name, label = "") {
  const blob = `${name} ${label}`.toLowerCase();
  if (/\b(nano|full synthetic ck-4|xvi synthetic|calcium sulfonate|lithium complex)\b/.test(blob)) {
    return false;
  }
  return SPECIALTY_LADDER_PRODUCT_RE.test(blob);
}

function applyLadderPresetTierRules(preset, presetKey) {
  const base = {
    ...preset,
    emphasis: (preset.emphasis || []).map((line) => cleanCategoryDisplayText(line)),
    tiers: (preset.tiers || []).map((tier) => ({
      ...tier,
      label: cleanCategoryDisplayText(tier.label),
      positioning: cleanCategoryDisplayText(tier.positioning),
      products: (tier.products || []).map((p) => cleanCategoryDisplayText(p)),
    })),
  };

  if (presetKey === "hdEngine") {
    return {
      ...base,
      tiers: [
        {
          tier: "good",
          label: "GOOD",
          positioning: "Conventional heavy duty engine oils for cost-sensitive fleets",
          products: ["Commercial Formula Heavy Duty Engine Oils"],
        },
        {
          tier: "better",
          label: "BETTER",
          positioning: "Synthetic blend upgrade path for improved protection",
          products: ["Synthetic Blend Heavy Duty Engine Oils"],
        },
        {
          tier: "best",
          label: "BEST",
          positioning: "Full synthetic CK-4 for premium highway and severe highway duty",
          products: ["Full Synthetic CK-4 Heavy Duty Engine Oils"],
        },
        {
          tier: "ultimate",
          label: "ULTIMATE",
          positioning: "Severe-duty extended-drain full synthetic programs (confirm PDS)",
          products: ["SAE 5W-40 Full Synthetic Heavy Duty Engine Oils"],
        },
      ],
    };
  }

  if (presetKey === "hydraulic") {
    const tiers = base.tiers.map((tier) => ({ ...tier, products: [...tier.products] }));
    const ultimate = tiers.find((t) => t.tier === "ultimate");
    if (ultimate) {
      ultimate.positioning = "Flagship synthetic hydraulics and top-tier severe-duty protection";
      ultimate.products = ultimate.products.filter((p) => !isSpecialtyLadderProduct(p));
      if (!ultimate.products.length) {
        ultimate.products = ["XVI Synthetic Hydraulic Fluids", "Bio-Synthetic EAL Hydraulic Fluid"];
      }
    }
    return { ...base, tiers };
  }

  if (presetKey === "environmental" && base.ladderStyle === "program") {
    const tiers = base.tiers.map((tier) => ({ ...tier, products: [...tier.products] }));
    const ultimate = tiers.find((t) => t.tier === "ultimate");
    const specialty = tiers.find((t) => t.tier === "better");
    if (ultimate && specialty) {
      const keep = [];
      for (const p of ultimate.products) {
        if (/rock drill/i.test(p)) {
          if (!specialty.products.some((x) => /rock drill/i.test(x))) specialty.products.push(p);
        } else {
          keep.push(p);
        }
      }
      ultimate.products = keep;
    }
    return { ...base, tiers };
  }

  if (presetKey === "foodGrade" && base.ladderStyle === "program") {
    const tiers = base.tiers.map((tier) => ({ ...tier, products: [...tier.products] }));
    const ultimate = tiers.find((t) => t.tier === "ultimate");
    const specialty = tiers.find((t) => t.tier === "better");
    if (ultimate && specialty) {
      const keep = [];
      for (const p of ultimate.products) {
        if (/compressor|chain|conveyor/i.test(p)) {
          if (!specialty.products.some((x) => x.toLowerCase() === p.toLowerCase())) specialty.products.push(p);
        } else {
          keep.push(p);
        }
      }
      ultimate.positioning = "Compliance-tier H1 specialties where PDS supports plant duty";
      ultimate.products = keep.length ? keep : ultimate.products;
    }
    return { ...base, tiers };
  }

  const tiers = base.tiers.map((tier) => {
    if (tier.tier !== "ultimate") return tier;
    const products = tier.products.filter((p) => !isSpecialtyLadderProduct(p));
    return { ...tier, products: products.length ? products : tier.products };
  });
  return { ...base, tiers };
}

/**
 * Per-category tier product visuals (1?3 per column).
 * imageUrl optional; variant drives clean drum / grease-tube silhouettes (no equipment art).
 */
const LADDER_TIER_PRODUCT_IMAGE_SPECS = {
  hydraulic: {
    good: [
      { name: "Professional Hydraulic Fluids", variant: "drum" },
      { name: "Advanced Hydraulic Fluids", variant: "drum" },
    ],
    better: [
      { name: "Multi-Viscosity Hydraulic Fluids", label: "MV Advanced", variant: "drum-mv" },
      { name: "Tractor Fluids", variant: "drum-tractor" },
    ],
    best: [
      { name: "XVI Synthetic Hydraulic Fluids", variant: "drum-premium" },
      { name: "ISO Turbine Oils", variant: "drum-turbine" },
    ],
    ultimate: [
      { name: "XVI Synthetic Hydraulic Fluids", variant: "drum-premium" },
      { name: "Bio-Synthetic EAL Hydraulic Fluid", label: "EAL / sensitive site", variant: "drum-eco" },
    ],
  },
  grease: {
    good: [
      { name: "RED TAC", variant: "grease-tube" },
      { name: "HD TAC", variant: "grease-tube" },
    ],
    better: [
      { name: "MOLY TAC 3%", variant: "grease-tube-moly" },
    ],
    best: [
      { name: "ULTRA TAC", variant: "grease-tube-premium" },
      { name: "MOLY TAC HD 5%", variant: "grease-tube-moly" },
    ],
    ultimate: [
      { name: "nano Calcium Sulfonate", variant: "grease-nano" },
      { name: "nano Lithium Complex Synthetic", variant: "grease-nano" },
    ],
  },
  hdEngine: {
    good: [{ name: "Commercial Formula Heavy Duty Engine Oils", label: "Conventional", variant: "engine-pail" }],
    better: [
      { name: "Synthetic Blend Heavy Duty Engine Oils", label: "Synthetic blend", variant: "engine-pail-blend" },
    ],
    best: [
      { name: "Full Synthetic CK-4 Heavy Duty Engine Oils", label: "CK-4 full synthetic", variant: "engine-pail-premium" },
    ],
    ultimate: [
      {
        name: "SAE 5W-40 Full Synthetic Heavy Duty Engine Oils",
        label: "Extended-drain / severe duty",
        variant: "engine-pail-premium",
      },
    ],
  },
  foodGrade: {
    good: [{ name: "FOOD-GRADE Hydraulic Oils", label: "H1 hydraulic", variant: "drum-food" }],
    better: [
      { name: "FOOD-GRADE EP-2 Grease", variant: "grease-tube-food" },
      { name: "FOOD-GRADE multipurpose grease programs", variant: "grease-tube-food" },
    ],
    best: [
      { name: "FOOD-GRADE Gear Oils", variant: "drum-food" },
      { name: "FOOD-GRADE industrial gear programs", variant: "drum-food" },
    ],
    ultimate: [
      { name: "FOOD-GRADE compressor & circulating oils", variant: "drum-food" },
      { name: "FOOD-GRADE chain / conveyor lubricants", label: "H1 specialty", variant: "drum-food" },
    ],
  },
  environmental: {
    good: [{ name: "ENVIRO Inherently Biodegradable AW Hydraulic Fluids", label: "ENVIRO", variant: "drum-eco" }],
    better: [
      { name: "BIO Biodegradable AW Hydraulic Fluids", label: "BIO", variant: "drum-eco" },
      { name: "BIO Hees Hydraulic Fluids", label: "HEES", variant: "drum-eco" },
    ],
    best: [
      { name: "BIO-Synthetic EAL Hydraulic Oils", label: "EAL", variant: "drum-eco-premium" },
      { name: "BIO Biodegradable Synthetic Blend Hydraulic Fluids", variant: "drum-eco" },
    ],
    ultimate: [
      { name: "Bio HFDU Hydraulic Fluids", label: "HFDU", variant: "drum-eco" },
      { name: "BIO Biodegradable Rock Drill Oil", variant: "drum-eco" },
    ],
  },
  agrimax: {
    good: [
      { name: "AGRIMAX Trans Drive Hydraulic Fluid", variant: "drum-agri" },
      { name: "Universal tractor / trans-hydraulic fluids", label: "UTHF", variant: "drum-tractor" },
    ],
    better: [
      { name: "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid", variant: "drum-agri-zf" },
    ],
    best: [
      { name: "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil", label: "CK-4", variant: "engine-pail-agri" },
      { name: "AGRIMAX Poly Tac / multipurpose grease programs", variant: "grease-tube" },
    ],
    ultimate: [
      { name: "AGRIMAX Extended Life Coolant programs", variant: "drum-coolant" },
      { name: "RED TAC / field grease companions", variant: "grease-tube" },
    ],
  },
  gearOil: {
    good: [{ name: "Commercial Gear Lubricants", variant: "drum" }],
    better: [{ name: "Industrial EP Gear Lubricants", variant: "drum-premium" }],
    best: [{ name: "Full Synthetic Gear Lubricants", variant: "drum-premium" }],
    ultimate: [{ name: "Full Synthetic Industrial EP Gear Lubricants", variant: "drum-premium" }],
  },
  coolant: {
    good: [
      { name: "Green Universal Antifreeze Coolant", variant: "drum-coolant" },
      { name: "Commercial HD NOAT ELC Antifreeze Coolant", variant: "drum-coolant" },
    ],
    better: [
      { name: "Gold Automotive OAT ELC Antifreeze Coolant", variant: "drum-coolant" },
      { name: "Yellow Automotive OAT ELC Antifreeze Coolant", variant: "drum-coolant" },
    ],
    best: [
      { name: "Red Heavy Duty NOAT ELC Antifreeze Coolant", variant: "drum-coolant" },
    ],
    ultimate: [
      { name: "Power Steering Fluid", variant: "drum" },
      { name: "Universal DOT 5.1 Synthetic Brake Fluid", variant: "drum" },
    ],
  },
  transmission: {
    good: [
      { name: "Universal Red Tractor Fluid", variant: "drum-tractor" },
      { name: "Arctic Tractor Fluid Synthetic Blend", variant: "drum-tractor" },
    ],
    better: [
      { name: "AGRIMAX Trans Drive Hydraulic Fluid", variant: "drum-agri" },
      { name: "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid", variant: "drum-agri-zf" },
    ],
    best: [{ name: "Multi-Viscosity AW Hydraulic Fluids", variant: "drum-mv" }],
    ultimate: [{ name: "RED TAC / MOLY TAC grease programs", variant: "grease-tube" }],
  },
  industrialSpecialty: {
    good: [
      { name: "Long Life Turbine Oils", variant: "drum-turbine" },
      { name: "Full Synthetic Circulating Compressor Turbine Oils", variant: "drum-turbine" },
    ],
    better: [{ name: "Industrial EP Gear Lubricants", variant: "drum-circulating" }],
    best: [
      { name: "BIO Biodegradable Rock Drill Oil", variant: "drum-eco" },
      { name: "ENVIRO Inherently Biodegradable MV Hydraulic Fluids", variant: "drum-eco" },
    ],
    ultimate: [
      { name: "Professional Hydraulic Fluids", variant: "drum" },
      { name: "Multi-Purpose Grease", variant: "grease-tube" },
    ],
  },
};

/** Guided wizard Step 3 keys (`App.js` SE_GUIDED_STEP3_CATEGORY_LABELS) ? ladder preset id. */
const WIZARD_CATEGORY_TO_LADDER_KEY = {
  hydraulic: "hydraulic",
  agrimax: "agrimax",
  environmental_eal: "environmental",
  food_grade: "foodGrade",
  grease: "grease",
  hd_engine_oil: "hdEngine",
  gear_oil: "gearOil",
  industrial_specialty: "industrialSpecialty",
  coolant: "coolant",
  transmission: "transmission",
  other: "hydraulic",
};

const PROGRAM_LADDER_TIER_LABELS = [
  "PROGRAM AWARENESS",
  "WHERE IT FITS",
  "REP OPPORTUNITY",
  "CROSS-SELL PATH",
];

const PROGRAM_LADDER_TIER_IDS = ["good", "better", "best", "ultimate"];

function buildProgramOpportunityTiers(columns) {
  return PROGRAM_LADDER_TIER_IDS.map((tier, index) => ({
    tier,
    label: PROGRAM_LADDER_TIER_LABELS[index],
    positioning: String(columns[index]?.positioning || "").trim(),
    products: Array.isArray(columns[index]?.products) ? columns[index].products : [],
  }));
}

const CATEGORY_LADDER_PRESETS = {
  hydraulic: {
    categoryKey: "hydraulic",
    ladderStyle: "performance",
    emphasis: [
      "ISO VG discipline & pump tags",
      "Bulk vs packaged top-off behavior",
      "Contamination control first",
      "Seasonal multi-viscosity coverage",
      "Turbine & circulating programs",
      "Tractor & wet-brake adjacent fills",
    ],
    tiers: [
      {
        tier: "good",
        label: "GOOD",
        positioning: "Core commercial and professional anti-wear programs",
        products: ["Professional Hydraulic Fluids", "Advanced Hydraulic Fluids"],
      },
      {
        tier: "better",
        label: "BETTER",
        positioning: "Broader temperature bands and mixed-fleet flexibility",
        products: ["Multi-Viscosity Hydraulic Fluids", "Tractor Fluids"],
      },
      {
        tier: "best",
        label: "BEST",
        positioning: "Premium synthetic hydraulics and plant rotating equipment",
        products: ["XVI Synthetic Hydraulic Fluids", "ISO Turbine Oils"],
      },
      {
        tier: "ultimate",
        label: "ULTIMATE",
        positioning: "Flagship synthetic hydraulics and top-tier severe-duty protection",
        products: ["XVI Synthetic Hydraulic Fluids", "Bio-Synthetic EAL Hydraulic Fluid"],
      },
    ],
  },
  agrimax: {
    categoryKey: "agrimax",
    ladderStyle: "program",
    emphasis: [
      "Farm & ag dealer program depth",
      "Trans-hydraulic / UTHF conversations",
      "Wet brake & multi-reservoir discipline",
      "Confirm equipment tags on PDS",
      "Seasonal bulk and packaged strategy",
      "Full-line consolidation (fluids, grease, coolant)",
    ],
    tiers: buildProgramOpportunityTiers([
      {
        positioning: "Anchor trans-drive hydraulic programs for ag equipment",
        products: [
          "AGRIMAX Trans Drive Hydraulic Fluid",
          "Universal tractor / trans-hydraulic fluids (see PDS equipment guidance)",
        ],
      },
      {
        positioning: "Zinc-free and line-specific trans-hydraulic options",
        products: [
          "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
          "Wet brake & transmission-fluid positioning (verify tags on PDS)",
        ],
      },
      {
        positioning: "Heavy farm engine and high-hour seasonal protection",
        products: [
          "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil",
          "AGRIMAX Poly Tac / multipurpose grease programs",
        ],
      },
      {
        positioning: "Coolant and companion programs that protect the ag account",
        products: [
          "AGRIMAX Extended Life Coolant programs",
          "RED TAC / field grease companions (confirm spec on PDS)",
        ],
      },
    ]),
  },
  environmental: {
    categoryKey: "environmental",
    ladderStyle: "program",
    emphasis: [
      "Sensitive-site and spill-response planning",
      "Biodegradability / EAL language from PDS",
      "Hydraulic + rock drill + specialty depth",
      "Do not overstate environmental claims",
      "Pair chemistry with containment discipline",
      "Cross-sell only where site rules require",
    ],
    tiers: buildProgramOpportunityTiers([
      {
        positioning: "Inherently biodegradable AW programs for entry EAL conversations",
        products: ["ENVIRO Inherently Biodegradable AW Hydraulic Fluids"],
      },
      {
        positioning: "BIO-labeled biodegradable hydraulics and HEES options",
        products: ["BIO Biodegradable AW Hydraulic Fluids", "BIO Hees Hydraulic Fluids"],
      },
      {
        positioning: "Synthetic-blend EAL hydraulics for demanding eco-sensitive duty",
        products: [
          "BIO-Synthetic EAL Hydraulic Oils",
          "BIO Biodegradable Synthetic Blend Hydraulic Fluids",
        ],
      },
      {
        positioning: "HFDU and specialty environmentally acceptable positioning",
        products: ["Bio HFDU Hydraulic Fluids", "BIO Biodegradable Rock Drill Oil"],
      },
    ]),
  },
  foodGrade: {
    categoryKey: "foodGrade",
    ladderStyle: "program",
    emphasis: [
      "NSF H1 registration ? confirm on each PDS",
      "Food plant audit readiness",
      "Separate food-grade inventory discipline",
      "Hydraulic, grease, and gear program breadth",
      "Compressor & industrial H1 where applicable",
      "No implied OEM or registration beyond PDS",
    ],
    tiers: buildProgramOpportunityTiers([
      {
        positioning: "Foundation H1 hydraulic programs for food plants",
        products: ["FOOD-GRADE Hydraulic Oils"],
      },
      {
        positioning: "EP grease and general food-processing lubrication",
        products: ["FOOD-GRADE EP-2 Grease", "FOOD-GRADE multipurpose grease programs"],
      },
      {
        positioning: "Gear and drivetrain H1 depth for processing equipment",
        products: ["FOOD-GRADE Gear Oils", "FOOD-GRADE industrial gear programs"],
      },
      {
        positioning: "Compressor, chain, and specialty H1 where PDS supports plant duty",
        products: [
          "FOOD-GRADE compressor & circulating oils",
          "FOOD-GRADE chain / conveyor lubricants (confirm H1 on PDS)",
        ],
      },
    ]),
  },
  grease: {
    categoryKey: "grease",
    ladderStyle: "performance",
    emphasis: [
      "Severe-duty pins & bushings",
      "Shock load & vibration",
      "Washout resistance",
      "Relube interval strategy",
      "Centralized systems",
      "Wet outdoor environments",
    ],
    tiers: [
      {
        tier: "good",
        label: "GOOD",
        positioning: "Reliable multipurpose EP for general fleet grease points",
        products: ["RED TAC", "HD TAC"],
      },
      {
        tier: "better",
        label: "BETTER",
        positioning: "Moly-fortified upgrade for load and outdoor duty",
        products: ["MOLY TAC 3%"],
      },
      {
        tier: "best",
        label: "BEST",
        positioning: "Synthetic-blend EP for longer intervals and heat",
        products: ["ULTRA TAC", "MOLY TAC HD 5%"],
      },
      {
        tier: "ultimate",
        label: "ULTIMATE",
        positioning: "Flagship programs for the toughest grease applications",
        products: ["nano Calcium Sulfonate", "nano Lithium Complex Synthetic"],
      },
    ],
  },
  hdEngine: {
    categoryKey: "hdEngine",
    ladderStyle: "performance",
    emphasis: [
      "API CK-4 / FA-4 category alignment",
      "Synthetic tier progression",
      "Mixed on- & off-highway fleets",
      "Emissions-system compatibility (confirm on PDS)",
      "Drain-interval strategy",
      "Natural gas & specialty engine lines where quoted",
    ],
    tiers: [
      {
        tier: "good",
        label: "GOOD",
        positioning: "Conventional HD programs for cost-sensitive fleets",
        products: ["Commercial Formula Heavy Duty Engine Oils", "Professional Formula Heavy Duty Engine Oils"],
      },
      {
        tier: "better",
        label: "BETTER",
        positioning: "Synthetic blend for improved protection and flexibility",
        products: ["Synthetic Blend Heavy Duty Engine Oils", "Advanced Formula Heavy Duty Engine Oils"],
      },
      {
        tier: "best",
        label: "BEST",
        positioning: "Full synthetic CK-4 for premium fleet programs",
        products: ["Full Synthetic CK-4 Heavy Duty Engine Oils", "SAE 5W-40 Full Synthetic Heavy Duty Engine Oils"],
      },
      {
        tier: "ultimate",
        label: "ULTIMATE",
        positioning: "Severe-duty extended-drain full synthetic programs (confirm PDS)",
        products: ["SAE 5W-40 Full Synthetic Heavy Duty Engine Oils"],
      },
    ],
  },
  gearOil: {
    categoryKey: "gearOil",
    ladderStyle: "performance",
    emphasis: [
      "ISO VG and OEM spec discipline",
      "Industrial vs automotive gear conversations",
      "EP vs R&O positioning",
      "Bulk vs packaged top-offs",
      "Synthetic upgrade paths",
      "Confirm PDS for severe-duty claims",
    ],
    tiers: [
      {
        tier: "good",
        label: "GOOD",
        positioning: "Commercial gear programs for standard drivetrain duty",
        products: ["Commercial Gear Lubricants", "Gear Lubricants (mineral EP)"],
      },
      {
        tier: "better",
        label: "BETTER",
        positioning: "Industrial EP depth for plant reducers and mobile axles",
        products: ["Industrial EP Gear Lubricants", "Commercial EP Gear Lubricants"],
      },
      {
        tier: "best",
        label: "BEST",
        positioning: "Full synthetic gear protection for premium fleets and plants",
        products: ["Full Synthetic Gear Lubricants", "Full Synthetic Industrial EP Gear Lubricants"],
      },
      {
        tier: "ultimate",
        label: "ULTIMATE",
        positioning: "Flagship synthetic EP for the toughest shock-load and temperature duty",
        products: ["Full Synthetic Industrial EP Gear Lubricants"],
      },
    ],
  },
  coolant: {
    categoryKey: "coolant",
    ladderStyle: "program",
    emphasis: [
      "Fleet coolant consolidation",
      "OAT / NOAT / conventional language from PDS",
      "Premix vs concentrate bulk behavior",
      "Seasonal flush and top-off discipline",
      "Pair with HD engine account",
      "Do not mix chemistries across systems",
    ],
    tiers: buildProgramOpportunityTiers([
      {
        positioning: "Universal and conventional programs reps can lead with today",
        products: ["Green Universal Antifreeze Coolant", "Commercial HD NOAT ELC Antifreeze Coolant"],
      },
      {
        positioning: "Automotive OAT programs for mixed fleets and light-duty bays",
        products: ["Gold Automotive OAT ELC Antifreeze Coolant", "Yellow Automotive OAT ELC Antifreeze Coolant"],
      },
      {
        positioning: "Heavy-duty extended-life programs for highway and off-highway fleets",
        products: ["Red Heavy Duty NOAT ELC Antifreeze Coolant", "AGRIMAX Extended Life Coolant programs"],
      },
      {
        positioning: "Chemical companions that complete the maintenance bay story",
        products: ["Power Steering Fluid", "Universal DOT 5.1 Synthetic Brake Fluid", "Brake Blast Brake Parts Cleaner"],
      },
    ]),
  },
  transmission: {
    categoryKey: "transmission",
    ladderStyle: "program",
    emphasis: [
      "UTTO / tractor reservoir discipline",
      "Wet brake compatibility checks",
      "Fleet ATF spec verification",
      "Bulk vs packaged top-offs",
      "Cross-reservoir consolidation",
      "Confirm equipment tags on every PDS",
    ],
    tiers: buildProgramOpportunityTiers([
      {
        positioning: "Universal tractor and trans-hydraulic programs customers already know",
        products: ["Universal Red Tractor Fluid", "Arctic Tractor Fluid Synthetic Blend"],
      },
      {
        positioning: "Line-specific trans-drive and zinc-free options for ag and mixed fleets",
        products: ["AGRIMAX Trans Drive Hydraulic Fluid", "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid"],
      },
      {
        positioning: "Severe-duty and specialty driveline fills where spec supports upgrade",
        products: ["Multi-Viscosity AW Hydraulic Fluids", "Tractor Fluids (confirm wet-brake guidance on PDS)"],
      },
      {
        positioning: "Hydraulic, grease, and engine companions on the same equipment card",
        products: ["Professional Hydraulic Fluids", "RED TAC / MOLY TAC grease programs", "Synthetic Blend Heavy Duty Engine Oils"],
      },
    ]),
  },
  industrialSpecialty: {
    categoryKey: "industrialSpecialty",
    ladderStyle: "program",
    emphasis: [
      "Plant fill-point discovery",
      "Turbine vs circulating vs way-lube discipline",
      "Compressor and heat-transfer programs",
      "Non-detergent and specialty industrial lines",
      "Confirm viscosity and OEM notes on PDS",
      "Pair with hydraulic AW where the plant also runs mobile equipment",
    ],
    tiers: buildProgramOpportunityTiers([
      {
        positioning: "Rotating equipment and circulating programs reps should ask about first",
        products: ["Long Life Turbine Oils", "Full Synthetic Circulating Compressor Turbine Oils"],
      },
      {
        positioning: "Way lube, heat transfer, and industrial specialty fills by application",
        products: ["Industrial EP Gear Lubricants", "Parts Washer Solvent (shop companion)"],
      },
      {
        positioning: "Compressor, rock drill, and severe industrial specialty opportunities",
        products: ["BIO Biodegradable Rock Drill Oil", "ENVIRO Inherently Biodegradable MV Hydraulic Fluids"],
      },
      {
        positioning: "Hydraulic and grease programs that often sit beside specialty plant fills",
        products: ["Professional Hydraulic Fluids", "Multi-Purpose Grease", "Commercial Gear Lubricants"],
      },
    ]),
  },
};

/** Category-first program copy ? headline and depth never come from a single resolved product. */
const CATEGORY_PROGRAM_COPY = {
  hydraulic: {
    categoryTitle: "KLONDIKE Hydraulic Fluids",
    categorySubtitle: "Keep equipment running — leaks, heat, and ISO VG discipline on mixed fleets.",
    opportunitySummary:
      "Practical hydraulic playbook: fix leaks and heat, match ISO VG to tags, then walk the ladder — not a one-drum AW swap.",
    keyBenefits: [
      { iconKey: "consolidation", label: "Program consolidation", sub: "One hydraulic story from AW through turbine, tractor, and circulating oils." },
      { iconKey: "uptime", label: "Circuit reliability", sub: "Fewer heat, foam, and slow-response events on first-shift startups." },
      { iconKey: "mix", label: "Line depth & margin", sub: "Professional through XVI synthetic and specialty wet-brake fills." },
      { iconKey: "expansion", label: "Account expansion", sub: "Grow share on construction, ag-adjacent, and industrial hydraulic hours." },
    ],
    idealCustomers: [
      "Construction & rental fleets",
      "Industrial plants & presses",
      "Municipal / mobile equipment yards",
      "Mixed-fleet distributors",
      "Bulk tank programs",
    ],
    applications: [
      "Skid-steer & excavator hydraulics",
      "Press, lift & power units",
      "Turbine & circulating systems",
      "Tractor & mobile hydraulics",
      "Wet brake reservoirs (confirm PDS)",
      "Seasonal multi-viscosity yards",
    ],
    crossSell: [
      { title: "Grease", desc: "Pins, bushings, and chassis points on the same fleet", iconKey: "grease" },
      { title: "Gear oils", desc: "Drivetrain and reducer programs adjacent to hydraulics", iconKey: "gear" },
      { title: "Heavy duty engine oils", desc: "Engine programs for on- and off-highway mixed fleets", iconKey: "engine" },
      { title: "Coolants", desc: "Cooling discipline bundled with fluid power accounts", iconKey: "coolant" },
    ],
    repTalkTrack: [
      "Start with pump tags, ISO VG, and how the yard tops off before recommending a tier move.",
      "Position filtration and breathers ahead of chemistry changes on repeat-failure circuits.",
      "Use the ladder to structure margin ? AW and professional programs first, synthetic and specialty where duty proves it.",
      "Separate hydraulic, wet-brake, and circulating conversations ? confirm each fill point on PDS.",
    ],
    discoveryQuestions: [
      "Which circuits show foam, heat, or slow response on cold starts?",
      "What ISO VG and component tags are on the pumps you need running this week?",
      "Are bulk tanks and packaged top-offs on the same program ladder?",
      "Where do wet-brake or circulating systems pull from a different SKU habit?",
    ],
    cautions: [
      "Confirm component and viscosity guidance on each PDS before changing grade or chemistry.",
      "Do not mix incompatible fluids without flush and consultation.",
      "Wet-brake and hydraulic fills are separate conversations ? verify reservoir labels.",
    ],
    recommendedNextStep:
      "Schedule a category review; run a lunch-and-learn on ISO VG tags; send this spotlight; assign hydraulic fundamentals training.",
    sellingStrategy: {
      positioning: [
        "Sell the hydraulic system program ? ladder depth, not a single drum swap.",
        "Anchor every recommendation to pump tags, temperature band, and contamination history.",
        "Use Professional and Advanced as the volume base; grow MV, XVI synthetic, and turbine as proof points mature.",
      ],
      problemsSolved: [
        "Fragmented SKUs across AW, MV, and specialty fills",
        "Repeat heat, foam, and slow-response failures",
        "Bulk vs packaged misalignment",
        "Missed margin on synthetic and turbine opportunities",
      ],
      opportunitySignals: [
        "Mixed fleets adding hours or new equipment groups",
        "Plants with turbine or circulating assets outside the AW contract",
        "Dealers still quoting competitor AW only on price",
        "Yards with wet-brake or tractor-fluid confusion",
      ],
      crossSellPath: [
        "Grease ? chassis and pin programs on the same equipment",
        "Gear & circulating oils ? plant and drivetrain depth",
        "HD engine oils ? mixed highway / off-highway fleets",
        "Environmental / food-grade ? only where site rules require (separate programs)",
      ],
    },
  },
  agrimax: {
    categoryTitle: "AGRIMAX Full Line",
    categorySubtitle: "John Deere / Case IH equipment — same spec, same protection, save money (where PDS supports).",
    opportunitySummary:
      "Dealer sales playbook for ag: wet brake chatter, seasonal PM, trans-drive, and OEM-spec conversations only with PDS proof — not one red drum for every sump.",
    keyBenefits: [
      { iconKey: "retention", label: "Dealer stickiness", sub: "Keep the ag account on one Klondike program story across reservoirs." },
      { iconKey: "consolidation", label: "Full-line consolidation", sub: "Fluids, grease, and coolant under one seasonal conversation." },
      { iconKey: "uptime", label: "Seasonal uptime", sub: "Right trans-hydraulic and engine tier before peak field hours." },
      { iconKey: "expansion", label: "Program expansion", sub: "Grow from trans-drive anchor into engine, grease, and coolant depth." },
    ],
    idealCustomers: [
      "Agriculture dealers & farm stores",
      "Mixed ag / construction yards",
      "Seasonal bulk and packaged ag accounts",
      "Equipment dealers supporting field service",
    ],
    applications: [
      "Tractor trans-hydraulic systems",
      "Wet brake & multi-reservoir ag equipment",
      "Seasonal CK-4 engine programs",
      "Field grease and fifth-wheel points",
      "Coolant maintenance on ag fleets",
    ],
    crossSell: [
      { title: "HD engine oils", desc: "Non-ag highway fleets on the same dealer card", iconKey: "engine" },
      { title: "Hydraulic fluids", desc: "Non-ag industrial hydraulics where AGRIMAX is not the fit", iconKey: "hydraulic" },
      { title: "Grease program", desc: "RED TAC and severe-duty upgrades beyond Poly Tac", iconKey: "grease" },
      { title: "Coolants", desc: "OAT / NOAT discipline outside ag line where applicable", iconKey: "coolant" },
    ],
    repTalkTrack: [
      "What are customers using today in the trans-hydraulic sump?",
      "Are customers asking for OEM-branded fluids?",
      "Are wet brakes noisy after the last fluid change?",
      "Map reservoirs before naming any product — trans-drive, engine, wet brake, grease, coolant.",
    ],
    discoveryQuestions: [
      "Are wet brakes noisy?",
      "What fluid types do equipment tags require?",
      "What's in today's harvest bundle beyond engine oil?",
      "Which John Deere / Case IH models drive seasonal PM volume?",
    ],
    cautions: [
      "Confirm equipment and fluid-type guidance on each AGRIMAX PDS before recommending a line color or chemistry.",
      "Do not imply OEM or specification approval beyond what the PDS documents.",
      "Trans-hydraulic, engine, wet-brake, and coolant fills require separate confirmation.",
    ],
    recommendedNextStep:
      "Run a lunch-and-learn on reservoir maps; refresh seasonal PM SKUs; send this spotlight to the rep; prepare a business review on ag line depth.",
    sellingStrategy: {
      positioning: [
        "Same spec, same protection, save money — where PDS supports.",
        "Seasonal PM bundles beat single-SKU counter habits.",
        "No implied John Deere / Case IH endorsement.",
      ],
      problemsSolved: [
        "Wet brake chatter after wrong fluid",
        "One red drum for every compartment",
        "Incomplete harvest / planting PM kits",
      ],
      opportunitySignals: [
        "Wet brake noise within 50 hours of service",
        "PM kit sells filters and engine oil only",
        "Customer buying OEM jugs without tag proof",
      ],
      crossSellPath: ["Gear oil", "Bar & chain / drip oil", "Grease", "Coolant"],
    },
  },
  environmental: {
    categoryTitle: "KLONDIKE Environmental / EAL Lubricants",
    categorySubtitle: "Sensitive sites — documented ENVIRO / BIO / EAL per PDS.",
    opportunitySummary:
      "When spills, bids, or watershed rules apply: match ENVIRO through BIO-Synthetic EAL per PDS — not vague green marketing.",
    keyBenefits: [
      { iconKey: "consolidation", label: "Site-ready programs", sub: "One environmentally acceptable story from entry AW through HFDU." },
      { iconKey: "uptime", label: "Duty-appropriate tiers", sub: "Match biodegradability and fluid type to equipment and regulations." },
      { iconKey: "retention", label: "Specification trust", sub: "Keep sensitive accounts on documented PDS language, not marketing shorthand." },
      { iconKey: "expansion", label: "Category growth", sub: "Expand from hydraulic EAL into rock drill and specialty plant needs." },
    ],
    idealCustomers: [
      "Forestry & sensitive land operations",
      "Municipal / park / water-adjacent sites",
      "Construction near waterways",
      "Quarries and regulated industrial sites",
    ],
    applications: [
      "Mobile hydraulic systems on sensitive sites",
      "Rock drill and outdoor equipment",
      "Plant hydraulics where EAL is specified",
      "Spill-sensitive bulk programs",
    ],
    crossSell: [
      { title: "Standard hydraulics", desc: "Non-regulated assets on the same fleet", iconKey: "hydraulic" },
      { title: "Food-grade", desc: "Food plants where H1 is required instead of EAL", iconKey: "food" },
      { title: "Grease", desc: "Chassis programs ? confirm environmental claims on PDS", iconKey: "grease" },
      { title: "Gear oils", desc: "Drivetrain fills where site rules allow", iconKey: "gear" },
    ],
    repTalkTrack: [
      "Confirm site rules, spill plans, and equipment tags before recommending any EAL tier.",
      "Use ENVIRO and BIO labels exactly as PDS describes ? no stronger environmental claims.",
      "Walk CORE ? COMPLIANCE so the account sees depth beyond one biodegradable AW drum.",
      "Separate mobile hydraulic, rock drill, and HFDU conversations by application.",
    ],
    discoveryQuestions: [
      "What environmental standard or customer spec drives fluid selection on this site?",
      "Which equipment groups are already on ENVIRO, BIO, or EAL ? and which are not?",
      "When did spill response or containment last change on the account?",
      "Are rock drill, hydraulic, and HFDU needs bundled or quoted separately?",
    ],
    cautions: [
      "Use only biodegradability and environmental language documented on each PDS.",
      "Do not substitute EAL for food-grade H1 where NSF registration is required.",
      "Confirm compatibility and flush requirements before changing chemistry.",
    ],
    recommendedNextStep:
      "Map sensitive-site equipment to the environmental ladder, document PDS claims per asset group, and bundle containment discipline with tier upgrades.",
    sellingStrategy: {
      positioning: [
        "Sell regulated-site readiness ? a tiered EAL program, not a single BIO SKU.",
        "Lead with site rules and PDS claims, then place CORE ? COMPLIANCE depth.",
      ],
      problemsSolved: [
        "Over-claiming environmental performance vs PDS",
        "One-SKU EAL quotes on multi-equipment sites",
        "Mixing food-grade and EAL incorrectly",
      ],
      opportunitySignals: [
        "New municipal or forestry contracts with fluid specs",
        "Accounts quoted only ENVIRO AW without HEES or EAL depth",
        "Spill incidents driving fluid reviews",
      ],
      crossSellPath: [
        "ENVIRO AW ? BIO / HEES upgrade where duty increases",
        "BIO-Synthetic EAL ? severe mobile hydraulic programs",
        "HFDU / rock drill ? compliance tier on specialty assets",
      ],
    },
  },
  foodGrade: {
    categoryTitle: "KLONDIKE Food Grade Lubricants",
    categorySubtitle: "NSF H1 food-plant programs ? hydraulic, grease, gear, and specialty fills confirmed on PDS.",
    opportunitySummary:
      "Position food-grade as a plant-wide H1 strategy: CORE hydraulics through COMPLIANCE compressor and chain programs. Every registration and application claim must match the PDS ? no implied NSF or OEM approval beyond documentation.",
    keyBenefits: [
      { iconKey: "consolidation", label: "Plant program", sub: "One H1 story across hydraulics, grease, gear, and specialty lines." },
      { iconKey: "uptime", label: "Audit readiness", sub: "Inventory and labeling discipline that survives customer audits." },
      { iconKey: "retention", label: "Account protection", sub: "Keep food plants from fragmenting across non-H1 habits." },
      { iconKey: "mix", label: "Line depth", sub: "Grow from hydraulic base into EP-2, gear, and compressor H1." },
    ],
    idealCustomers: [
      "Food & beverage processors",
      "Bottling & packaging plants",
      "Meat, dairy, and bakery operations",
      "Pharma-adjacent manufacturing with H1 requirements",
    ],
    applications: [
      "Hydraulic units in processing areas",
      "Bearings, chains, and conveyors",
      "Food-grade gear and reducer fills",
      "Compressor and circulating H1 (confirm PDS)",
    ],
    crossSell: [
      { title: "Environmental / EAL", desc: "Outdoor or sensitive sites ? not food plants", iconKey: "eal" },
      { title: "Industrial hydraulics", desc: "Non-H1 plant areas only where allowed", iconKey: "hydraulic" },
      { title: "Grease (standard)", desc: "Non-processing equipment outside H1 scope", iconKey: "grease" },
      { title: "Coolants", desc: "Cooling systems ? confirm food-plant suitability on PDS", iconKey: "coolant" },
    ],
    repTalkTrack: [
      "Confirm NSF H1 registration on the PDS for every fill point discussed.",
      "Separate processing vs non-processing equipment before recommending any SKU.",
      "Walk CORE ? COMPLIANCE so the plant sees breadth beyond one hydraulic drum.",
      "Never imply registration or OEM approval beyond what the PDS states.",
    ],
    discoveryQuestions: [
      "Which zones require H1 vs general industrial fluids?",
      "When is the next customer audit ? and what fill points are in scope?",
      "Are grease, hydraulic, and compressor lines on one supplier program today?",
      "Where are non-H1 SKUs still on the shelf in processing areas?",
    ],
    cautions: [
      "Confirm NSF H1 status and application scope on each PDS before quoting.",
      "Do not use environmental/EAL fluids where H1 registration is required.",
      "Keep food-grade inventory segregated and labeled per plant rules.",
    ],
    recommendedNextStep:
      "Document every processing fill point, align CORE ? COMPLIANCE H1 tiers on PDS, and consolidate grease, gear, and compressor lines under one plant program.",
    sellingStrategy: {
      positioning: [
        "Sell audit-ready plant programs ? not a single food-grade hydraulic SKU.",
        "Lead with zone mapping and PDS registrations, then expand the H1 ladder.",
      ],
      problemsSolved: [
        "H1 gaps in grease or compressor fills",
        "Audit failures from mislabeled inventory",
        "Single-product food-grade quotes",
      ],
      opportunitySignals: [
        "Plants quoting only food-grade hydraulic",
        "Upcoming customer or third-party audits",
        "New processing lines without H1 plan",
      ],
      crossSellPath: [
        "FOOD-GRADE hydraulic ? EP-2 grease on processing lines",
        "Gear H1 ? reducers and mixers",
        "Compressor / chain H1 ? compliance tier specialties",
      ],
    },
  },
  grease: {
    categoryTitle: "KLONDIKE Grease Program",
    categorySubtitle: "Washout, shock load, and relube discipline — walk the grease ladder.",
    opportunitySummary:
      "Map joints first: washout, shock load, centralized systems, and relube intervals — then place RED TAC through nano, not one Poly Tac for every zerk.",
    keyBenefits: [
      { iconKey: "uptime", label: "Bearing protection", sub: "Match NLGI and EP chemistry to load, water, and relube intervals." },
      { iconKey: "mix", label: "Ladder margin", sub: "Grow from multipurpose into moly, synthetic-blend, and nano tiers." },
      { iconKey: "consolidation", label: "Point consolidation", sub: "One grease story across pins, bushings, and centralized systems." },
      { iconKey: "downtime", label: "Fewer relubes", sub: "Upgrade tiers where washout and shock load justify it." },
    ],
    idealCustomers: [
      "Construction & mining fleets",
      "Forestry & logging",
      "Agriculture & equipment dealers",
      "Municipal fleets",
      "Industrial plants with centralized lube",
    ],
    applications: [
      "Pins, bushings, and chassis points",
      "Centralized lube systems",
      "Wet, dirty outdoor environments",
      "High-load and shock-load joints",
      "Extended relube intervals",
    ],
    crossSell: [
      { title: "Hydraulic fluids", desc: "Fluid power on the same mobile equipment", iconKey: "hydraulic" },
      { title: "HD engine oils", desc: "Engine programs on mixed fleets", iconKey: "engine" },
      { title: "Gear oils", desc: "Drivetrain fills adjacent to chassis grease", iconKey: "gear" },
      { title: "AGRIMAX", desc: "Ag grease companions where farm program applies", iconKey: "program" },
    ],
    repTalkTrack: [
      "Qualify load, water, temperature, and relube interval before naming a grease tier.",
      "Use the ladder ? RED TAC / HD TAC base, MOLY TAC and ULTRA TAC upgrades, nano where severe duty proves it.",
      "Do not let one multipurpose SKU (e.g. Poly Tac alone) stand in for the whole grease program.",
      "Pair centralized system discipline with the right NLGI and EP chemistry.",
    ],
    discoveryQuestions: [
      "Which joints fail first?washout, pound-out, or heat?",
      "What relube interval are you actually achieving vs planning?",
      "Are moly and synthetic-blend tiers specified on severe assets only?",
      "Where is one grease SKU doing work that should be split by severity?",
    ],
    cautions: [
      "Confirm NLGI, EP, and compatibility with prior grease on PDS before switching.",
      "Do not mix incompatible thickeners without flush guidance.",
      "Centralized systems require product and viscosity discipline ? verify on PDS.",
    ],
    recommendedNextStep:
      "Review PM grease SKUs on the fleet chart; run a lunch-and-learn on NLGI; send this spotlight to the rep.",
    sellingStrategy: {
      positioning: [
        "Sell the grease ladder and relube strategy ? not a single multipurpose product.",
        "Anchor upgrades to joint severity, water, and interval evidence.",
      ],
      problemsSolved: [
        "One-SKU grease habits (Poly Tac-only stories)",
        "Premature pin and bushing wear",
        "Missed nano and synthetic-blend margin",
      ],
      opportunitySignals: [
        "Fleets on one RED TAC or Poly Tac for every point",
        "Mining / forestry / construction with shock load",
        "Centralized systems without tier discipline",
      ],
      crossSellPath: [
        "RED TAC / HD TAC ? MOLY TAC on loaded outdoor joints",
        "ULTRA TAC ? longer intervals and heat",
        "nano programs ? flagship severe-duty conversions",
        "Hydraulics & engines ? same account system sell",
      ],
    },
  },
  hdEngine: {
    categoryTitle: "KLONDIKE Heavy Duty Engine Oils",
    categorySubtitle: "CK-4 / FA-4 and synthetic tier progression for on- and off-highway fleets.",
    opportunitySummary:
      "Walk the GOOD ? BETTER ? BEST ? ULTIMATE HD engine ladder ? conventional and professional formulas through synthetic blend, full synthetic CK-4, and specialty natural gas / severe service. Align API category and drain strategy to PDS; do not imply OEM approval beyond documentation.",
    keyBenefits: [
      { iconKey: "consolidation", label: "Fleet program", sub: "One HD story from conventional through full synthetic CK-4." },
      { iconKey: "uptime", label: "Protection & drains", sub: "Match tier to duty cycle and emissions hardware ? per PDS." },
      { iconKey: "mix", label: "Synthetic growth", sub: "Expand synthetic blend and full synthetic penetration." },
      { iconKey: "expansion", label: "Account depth", sub: "Add natural gas and severe-service where specifications support." },
    ],
    idealCustomers: [
      "Class 8 and regional haul fleets",
      "Mixed on- / off-highway operations",
      "Construction & vocational diesel",
      "Natural gas and specialty engine users",
    ],
    applications: [
      "Class 8 linehaul and regional haul",
      "Vocational and vocational diesel",
      "Off-highway construction fleets",
      "Natural gas engines (confirm PDS)",
      "Railroad & severe service (confirm PDS)",
    ],
    crossSell: [
      { title: "Coolants", desc: "Cooling program aligned to engine account", iconKey: "coolant" },
      { title: "Hydraulic fluids", desc: "Off-highway hydraulics on the same yard", iconKey: "hydraulic" },
      { title: "Grease", desc: "Chassis and U-joint programs", iconKey: "grease" },
      { title: "Transmission fluids", desc: "Driveline fills where spec supports", iconKey: "program" },
    ],
    repTalkTrack: [
      "Confirm API category (CK-4 / FA-4 where applicable), viscosity, and drain interval from tags and PDS.",
      "Use the ladder to place conventional and professional formulas before synthetic upgrades.",
      "Tie full synthetic CK-4 to measurable duty and emissions hardware needs ? not habit alone.",
      "Reference PDS for natural gas and specialty lines ? no implied OEM approvals.",
    ],
    discoveryQuestions: [
      "What API category and viscosity are on the bulk tank vs over-the-road units?",
      "Which units are candidates for synthetic blend vs full synthetic CK-4?",
      "How are drain intervals set today?hours, fuel, or calendar?",
      "Are natural gas or specialty engines on a separate program today?",
    ],
    cautions: [
      "Confirm API category, viscosity, and compatibility on each PDS before changing engine oil.",
      "Do not imply OEM approval unless the PDS documents it.",
      "FA-4 and CK-4 apply to different hardware ? verify fleet eligibility.",
    ],
    recommendedNextStep:
      "Chart fleet units by duty and API need, standardize the HD ladder on bulk and packaged tanks, and phase synthetic upgrades with documented drain strategy.",
    sellingStrategy: {
      positioning: [
        "Sell fleet engine programs and the HD ladder ? not a single CK-4 SKU.",
        "Lead with API category, viscosity, and drain strategy from PDS.",
      ],
      problemsSolved: [
        "Price-only conventional quotes",
        "Synthetic under-penetration",
        "Mixed API categories on one bulk tank",
      ],
      opportunitySignals: [
        "Fleets due for CK-4 education or FA-4 eligibility review",
        "Accounts on one commercial formula for every duty",
        "Natural gas or severe-service units off-program",
      ],
      crossSellPath: [
        "Commercial / professional ? synthetic blend upgrade path",
        "Full synthetic CK-4 ? premium highway and severe duty",
        "Coolants & greases ? same fleet card",
        "AGRIMAX CK-4 ? ag accounts only (separate program)",
      ],
    },
  },
  gearOil: {
    categoryTitle: "KLONDIKE Gear Lubricants",
    categorySubtitle: "Commercial, industrial EP, and full synthetic gear programs for fleets and plants.",
    opportunitySummary:
      "Help reps discover gear-oil depth beyond a single commercial pail ? walk GOOD through ULTIMATE for drivetrain upgrades, plant reducers, and synthetic EP conversions.",
    keyBenefits: [
      { iconKey: "consolidation", label: "Spec discipline", sub: "Match ISO VG and OEM notes before quoting upgrades." },
      { iconKey: "mix", label: "Portfolio depth", sub: "Mineral EP through full synthetic industrial programs." },
      { iconKey: "uptime", label: "Shock-load protection", sub: "Position EP and synthetic tiers where temperature and load demand it." },
      { iconKey: "expansion", label: "Account expansion", sub: "Industrial and mobile gear fills on one Klondike story." },
    ],
    idealCustomers: ["Mixed fleets", "Industrial plants", "Mining & construction", "Mobile equipment dealers"],
    applications: ["Axles & differentials", "Industrial reducers", "Final drives", "Gearboxes", "Mobile drivetrain"],
    repTalkTrack: [
      "Walk the gear ladder ? commercial mineral programs through industrial EP and full synthetic flagship options.",
      "Confirm viscosity, EP level, and prior fluid compatibility on the PDS before switching chemistry.",
    ],
    discoveryQuestions: [
      "Which gearboxes run hottest or see the most shock load?",
      "Are industrial reducers on the same supplier program as fleet axles?",
      "Where is a single commercial gear oil doing work that should split by severity?",
    ],
    cautions: ["Do not interchange R&O and EP chemistry without flush guidance.", "Verify OEM and viscosity on every fill tag."],
    recommendedNextStep:
      "Map gear fills by severity, standardize the ladder on the account chart, and quote synthetic EP only where inspection supports it.",
    sellingStrategy: {
      positioning: ["Sell gear program depth ? not one commercial pail for every box."],
      problemsSolved: ["One-SKU gear habits", "Premature bearing wear in reducers"],
      opportunitySignals: ["Plants on one mineral EP for every reducer", "Fleets due for synthetic gear upgrade"],
      crossSellPath: [
        "Hydraulic AW ? same mobile equipment card",
        "Grease ? bearing and U-joint companions",
        "HD engine ? fleet accounts with shared maintenance bay",
      ],
    },
  },
  coolant: {
    categoryTitle: "KLONDIKE Coolants & Cooling Programs",
    categorySubtitle: "OAT, NOAT, nitrite-free Gold, universal, and HD diesel programs for mixed bays.",
    opportunitySummary:
      "Coach inhibitor-family discipline first: OAT automotive, NOAT HD diesel, nitrite-free Gold for mixed fleet, universal entry, and top-off/flush rules after partial drains—not drum color or one green universal for every radiator.",
    keyBenefits: [
      { iconKey: "consolidation", label: "Bay consolidation", sub: "Separate LD OAT, HD NOAT, nitrite-free Gold, and universal bulk with labeled hoses." },
      { iconKey: "retention", label: "Fleet stickiness", sub: "Pair coolants with HD engine and service-lane chemical companions." },
      { iconKey: "mix", label: "Program breadth", sub: "Yellow OAT, Red NOAT, Gold nitrite-free, and Commercial HD on one dealer card." },
      { iconKey: "uptime", label: "Contamination control", sub: "Premix ratio, water quality, and documented top-off after roadside adds." },
    ],
    idealCustomers: ["Fleet maintenance bays", "Ag dealers", "Independent repair shops", "HD truck fleets"],
    applications: ["HD NOAT ELC diesel fleets", "Nitrite-free Gold mixed fleet", "Automotive OAT service", "Universal entry bays", "Seasonal flush programs"],
    repTalkTrack: [
      "Ask bulk-tank labels and top-off habits before recommending chemistry—never assume color equals inhibitor family.",
      "Position Gold OAT ELC as nitrite-free mixed-fleet flagship per PDS—not light-duty-only shorthand.",
      "Document flush and compatibility when changing OAT, NOAT, or universal programs.",
      "Bundle power steering, brake, and flush chemicals only where PDS lists the application.",
    ],
    discoveryQuestions: [
      "Which inhibitor families are in your HD vs light-duty bulk tanks today?",
      "What top-off chemistry was used after the last partial drain or roadside emergency?",
      "Are premix ratio and water quality documented on the bulk chart?",
      "What brake and steering fluids ship with the coolant program on this account?",
    ],
    cautions: ["Never mix incompatible coolant technologies without flush procedure.", "Confirm NOAT/OAT language on PDS."],
    recommendedNextStep:
      "Standardize coolant tiers by bay type, attach HD ELC where highway duty applies, and bundle chemical companions on the same PO.",
    sellingStrategy: {
      positioning: ["Sell cooling program depth ? not one universal drum for every radiator."],
      problemsSolved: ["Mixed-chemistry top-offs", "Missed HD ELC and OAT margin"],
      opportunitySignals: ["Shops on one green universal for every account", "HD fleets without NOAT ELC program"],
      crossSellPath: ["Power steering & brake fluids", "HD engine oil ? same fleet card", "Grease ? chassis service lane"],
    },
  },
  transmission: {
    categoryTitle: "KLONDIKE Transmission & Tractor Fluids",
    categorySubtitle: "UTTF, wet brake, ATF, powershift, and driveline—application-first, not one red fluid.",
    opportunitySummary:
      "Teach compartment discipline: Universal Transmission Fluid only where PDS supports; UTTO/wet brake and AGRIMAX trans-drive for ag; ATF to DEXRON/MERCON/OEM spec; Allison/TES only with documented PDS language—never interchange ATF, UTTO, and AW hydraulic fills.",
    keyBenefits: [
      { iconKey: "consolidation", label: "Reservoir discipline", sub: "Map transmission, wet brake, hydraulic, and driveline before quoting one SKU." },
      { iconKey: "mix", label: "Ag + mixed fleet", sub: "AGRIMAX trans-drive, Universal Red Tractor Fluid, and highway ATF on one dealer card." },
      { iconKey: "uptime", label: "Seasonal coverage", sub: "Arctic tractor fluid and MV options where tags allow temperature swing." },
      { iconKey: "retention", label: "Dealer depth", sub: "Stop one-size-fits-all red-fluid habits on multi-reservoir equipment." },
    ],
    idealCustomers: ["Ag equipment dealers", "Mixed fleets", "Construction & municipal yards", "Forestry contractors"],
    applications: ["Tractor UTTO / trans-hydraulic", "Wet brake systems", "Highway ATF (spec-driven)", "Powershift & vocational trans", "Driveline gear (separate compartment)"],
    repTalkTrack: [
      "Ask which compartment is being filled—transmission, wet brake, hydraulic, or driveline—before naming a product.",
      "Use AGRIMAX and zinc-free trans-drive only where tags and PDS align; do not imply Allison/TES without PDS proof.",
      "Pair transmission discipline with grease, engine, and gear on the same seasonal PM card.",
    ],
    discoveryQuestions: [
      "How many reservoir types are on the equipment tag—and which failed last?",
      "Is zinc-free trans-drive required on any line or wet-brake complaint unit?",
      "What ATF or builder spec letters are on highway automatics in this account?",
      "Which grease and engine programs belong on the same equipment PM bundle?",
    ],
    cautions: ["Wet brake compatibility must match PDS ? do not assume one fluid fits all compartments."],
    recommendedNextStep:
      "Document reservoir types per equipment group, align Program Awareness tiers on PDS, and attach grease and engine companions.",
    sellingStrategy: {
      positioning: ["Sell transmission program discovery ? not one UTTO drum for every tractor."],
      problemsSolved: ["Single-SKU tractor fluid habits", "Missed zinc-free and AGRIMAX depth"],
      opportunitySignals: ["Dealers stocking only universal red tractor fluid", "Mixed fleets without zinc-free option"],
      crossSellPath: ["Hydraulic AW ? supporting mobile equipment", "Grease ? pins and U-joints", "HD / AGRIMAX engine ? seasonal engine program"],
    },
  },
  industrialSpecialty: {
    categoryTitle: "KLONDIKE Industrial Specialty Fluids",
    categorySubtitle: "Turbine, compressor, and plant fills — not AW in every sump.",
    opportunitySummary:
      "Plant walk playbook: ask what is in the turbine, compressor, and reducer before quoting mobile AW — map specialty fills per PDS.",
    keyBenefits: [
      { iconKey: "expansion", label: "Plant discovery", sub: "Map fill points beyond AW hydraulic tanks." },
      { iconKey: "consolidation", label: "Specialty breadth", sub: "Turbine, circulating, and compressor lines on one Klondike story." },
      { iconKey: "uptime", label: "Rotating equipment", sub: "Long-life turbine and circulating programs." },
      { iconKey: "mix", label: "Cross-category", sub: "Pair specialty fills with hydraulic and grease where the plant allows." },
    ],
    idealCustomers: ["Industrial plants", "Power generation", "Mining & forestry", "Manufacturing facilities"],
    applications: ["Turbines", "Circulating systems", "Compressors", "Rock drills", "Heat transfer & way lube"],
    repTalkTrack: [
      "Walk Program Awareness through Cross-Sell Path to uncover turbine, circulating, and compressor opportunities.",
      "Confirm viscosity, R&O vs EP, and application claims on each PDS ? specialty fills are never one-size-fits-all.",
    ],
    discoveryQuestions: [
      "Which rotating equipment assets have the longest drain intervals?",
      "Are compressor and rock drill fills on the same supplier program as hydraulics?",
      "Where is heat transfer or way lube still sourced separately?",
    ],
    cautions: ["Specialty industrial fluids require application-specific PDS review.", "Do not substitute turbine or circulating oils without OEM guidance."],
    recommendedNextStep:
      "Survey plant fill points, place specialty tiers on the account map, and bundle hydraulic and grease companions where appropriate.",
    sellingStrategy: {
      positioning: ["Sell industrial specialty discovery ? not only AW hydraulic tanks."],
      problemsSolved: ["Unknown turbine/compressor lines", "Fragmented specialty suppliers"],
      opportunitySignals: ["Plants with unnamed compressor or circulating fills", "Mining sites with rock drill oil off-program"],
      crossSellPath: [
        "Professional hydraulic AW ? mobile equipment at the same site",
        "Industrial EP gear ? reducer programs",
        "Grease ? bearing and bushing companions",
      ],
    },
  },
};

/** Coerce API/wizard values into a safe array (never throws on objects/null). */
function coerceToIterableList(value, fallback = []) {
  const fb = Array.isArray(fallback) ? fallback : [];
  if (value == null) return fb;
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    const t = value.trim();
    if (!t) return fb;
    if (t.includes("\n")) {
      return t
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean);
    }
    return [t];
  }
  if (typeof value === "object") {
    if (Array.isArray(value.items)) return value.items;
    if (Array.isArray(value.list)) return value.list;
    if (Array.isArray(value.crossSellPath)) return value.crossSellPath;
    if (Array.isArray(value.positioning)) return value.positioning;
    const vals = Object.values(value);
    if (vals.length && vals.every((v) => typeof v === "string" || (v && typeof v === "object"))) {
      return vals;
    }
    return fb;
  }
  return fb;
}

function coerceStringLines(value, fallback = [], max = 8) {
  const out = [];
  for (const item of coerceToIterableList(value, fallback)) {
    if (item == null || item === false) continue;
    let line = "";
    if (typeof item === "string") line = item.trim();
    else if (typeof item === "object") {
      line = String(item.text ?? item.label ?? item.title ?? item.desc ?? item.name ?? "").trim();
    } else line = String(item).trim();
    line = cleanCategoryDisplayText(line);
    if (!line) continue;
    out.push(line);
    if (out.length >= max) break;
  }
  return out;
}

function pickList(value, fallback) {
  const fb = coerceToIterableList(fallback, []);
  const list = coerceToIterableList(value, fb).filter((item) => {
    if (item == null || item === false) return false;
    if (typeof item === "object") {
      return Boolean(String(item.label ?? item.sub ?? item.title ?? item.name ?? "").trim());
    }
    return Boolean(String(item).trim());
  });
  return list.length ? list : fb;
}

function pickText(value, fallback) {
  if (value === undefined || value === null) return fallback;
  const t = String(value).trim();
  return t || fallback;
}

function isPublicPdsPdfHref(value) {
  const href = String(value ?? "").trim();
  if (!href) return false;
  if (/^https?:\/\//i.test(href) || /localhost/i.test(href)) return false;
  return href.startsWith("/pds/") && /\.pdf$/i.test(href);
}

function normalizeRepLineKey(line) {
  return String(line || "")
    .trim()
    .toLowerCase()
    .replace(/[?.,!;:]+$/g, "")
    .replace(/\s+/g, " ");
}

function looksLikeQuestion(line) {
  const t = String(line || "").trim();
  if (!t) return false;
  if (/\?\s*$/.test(t)) return true;
  return /^(where|what|which|who|when|why|how|are you|do you|does your|is your|can you)\b/i.test(t);
}

function looksLikeRepStatement(line) {
  const t = String(line || "").trim();
  if (!t || looksLikeQuestion(t)) return false;
  return t.length >= 12;
}

function coerceQuestion(line) {
  const t = String(line || "").trim();
  if (!t) return "";
  if (/\?\s*$/.test(t)) return t;
  return `${t.replace(/[.!]+$/, "")}?`;
}

function resolveRepTalkAndQuestions(repTalkRaw, questionsRaw, repFallback, questionsFallback) {
  const repCandidates = [];
  const questionCandidates = [];
  for (const item of coerceToIterableList(repTalkRaw, [])) {
    const line = String(item ?? "").trim();
    if (!line) continue;
    if (looksLikeQuestion(line)) questionCandidates.push(line);
    else repCandidates.push(line);
  }
  for (const item of coerceToIterableList(questionsRaw, [])) {
    const line = String(item ?? "").trim();
    if (!line) continue;
    if (looksLikeQuestion(line)) questionCandidates.push(line);
    else if (looksLikeRepStatement(line)) repCandidates.push(line);
  }
  const repSeen = new Set();
  const qSeen = new Set();
  const repOut = [];
  const qOut = [];
  const pushRep = (line) => {
    const text = String(line || "").trim();
    if (!looksLikeRepStatement(text)) return;
    const key = normalizeRepLineKey(text);
    if (!key || repSeen.has(key) || qSeen.has(key)) return;
    repSeen.add(key);
    repOut.push(text);
  };
  const pushQuestion = (line) => {
    const text = coerceQuestion(line);
    if (!text) return;
    const key = normalizeRepLineKey(text);
    if (!key || qSeen.has(key) || repSeen.has(key)) return;
    qSeen.add(key);
    qOut.push(text);
  };
  repCandidates.forEach(pushRep);
  questionCandidates.forEach(pushQuestion);
  for (const line of repFallback) {
    if (repOut.length >= 4) break;
    pushRep(line);
  }
  for (const line of questionsFallback) {
    if (qOut.length >= 5) break;
    pushQuestion(line);
  }
  return { repTalkTrack: repOut.slice(0, 4), discoveryQuestions: qOut.slice(0, 5) };
}

function normalizeValueCards(value, fallback) {
  const fb = coerceToIterableList(fallback, []).slice(0, 6);
  const out = [];
  for (const item of coerceToIterableList(value, fb)) {
    if (item && typeof item === "object") {
      const label = String(item.label ?? item.title ?? "").trim();
      const sub = String(item.sub ?? item.desc ?? "").trim();
      if (!label && !sub) continue;
      out.push({
        iconKey: String(item.iconKey || "").trim(),
        label: label || sub.slice(0, 40),
        sub: sub || label,
      });
    } else {
      const line = String(item ?? "").trim();
      if (!line) continue;
      const dash = line.match(/^([^:??-]{1,60})\s*[:??-]\s*(.+)$/);
      out.push({
        iconKey: "",
        label: String(dash ? dash[1] : line).trim(),
        sub: String(dash ? dash[2] : "").trim(),
      });
    }
    if (out.length >= 6) break;
  }
  return out.length ? out : fb;
}

function valueIconKey(tile, index) {
  const preset = String(tile?.iconKey || "").toLowerCase();
  if (
    ["expansion", "mix", "consolidation", "uptime", "retention", "downtime", "opportunity", "margin", "coverage"].includes(
      preset
    )
  ) {
    return preset;
  }
  const blob = `${tile?.label || ""} ${tile?.sub || ""}`.toLowerCase();
  if (/consolidat|standardiz|supplier/.test(blob)) return "consolidation";
  if (/uptime|reliab/.test(blob)) return "uptime";
  if (/downtime|reduce.*stop|unplanned/.test(blob)) return "downtime";
  if (/retention|loyal|stick/.test(blob)) return "retention";
  if (/mix|sku|portfolio|growth/.test(blob)) return "mix";
  if (/expansion|market|opportunity/.test(blob)) return "expansion";
  if (/margin|profit|revenue/.test(blob)) return "expansion";
  return ["expansion", "mix", "consolidation", "uptime", "retention", "downtime"][index % 6];
}

function crossSellItemsFromStringPaths(paths) {
  return coerceStringLines(paths, [], 6).map((title) => ({
    title,
    desc: crossSellDescriptor(title),
    iconKey: crossSellIconKey(title),
  }));
}

function normalizeCrossSellItems(value, fallback) {
  const fb = coerceToIterableList(fallback, []);
  const raw = coerceToIterableList(value, fb);
  const out = [];
  for (const item of raw) {
    if (item && typeof item === "object") {
      const title = sanitizeLabel(item) || String(item.title ?? item.name ?? "").trim();
      const desc = cleanCategoryDisplayText(String(item.desc ?? item.sub ?? item.role ?? "").trim());
      const iconKey = String(item.iconKey || "").trim();
      if (!title) continue;
      out.push({ title: cleanCategoryDisplayText(title), desc, iconKey });
    } else {
      const title = sanitizeLabel(item) || String(item ?? "").trim();
      if (!title) continue;
      out.push({
        title: cleanCategoryDisplayText(title),
        desc: crossSellDescriptor(title),
        iconKey: crossSellIconKey(title),
      });
    }
    if (out.length >= 6) break;
  }
  if (!out.length && fb.length) {
    return normalizeCrossSellItems(fb, []);
  }
  return out;
}

function normalizeSellingStrategy(strategy) {
  if (!strategy || typeof strategy !== "object") return null;
  return {
    positioning: coerceStringLines(strategy.positioning, [], 6),
    problemsSolved: coerceStringLines(strategy.problemsSolved, [], 6),
    opportunitySignals: coerceStringLines(strategy.opportunitySignals, [], 6),
    crossSellPath: coerceStringLines(strategy.crossSellPath, [], 6),
  };
}

function sellingStrategyToRepOpportunity(strategy) {
  const normalized = normalizeSellingStrategy(strategy);
  if (!normalized) return null;
  return {
    whereToPosition: normalized.positioning,
    customerPainPoint: normalized.problemsSolved,
    repSellingAngle: normalized.opportunitySignals,
    crossSellPath: normalized.crossSellPath,
  };
}

const CATEGORY_INTELLIGENCE_PLAYBOOKS = {
  coolant: {
    playbookTitle: "Coolant category intelligence",
    playbookIntro:
      "Coolant is a specification- and chemistry-driven category. Reps win by teaching program discipline, not by color-matching drums on the shelf.",
    sections: [
      {
        id: "howItWorks",
        title: "How this category works",
        items: [
          "Coolant transfers heat, prevents freeze/boil-over, and protects cooling-system metals and seals ? chemistry must match system design.",
          "OAT (organic acid technology): common in automotive and many fleet OAT/ELC programs ? long-life organic inhibitors.",
          "NOAT (nitrite organic acid technology): heavy-duty diesel and commercial programs ? nitrite plus organic acids for liner protection.",
          "Universal / conventional programs: entry conversations where PDS supports broad fleet coverage ? not a substitute for HD NOAT without verification.",
          "Nitrite-free formulations: used where nitrite is restricted or mixed metallurgy requires alternate inhibitor packages ? confirm on PDS.",
          "Extended-life coolant: drain-interval strategy tied to inhibitor depletion, not color alone.",
          "Heavy-duty diesel coolant: NOAT ELC and HD programs for highway, off-highway, and equipment with large wet-sleeve engines.",
          "Mixed-fleet discipline: separate light-duty OAT bays from HD NOAT bulk tanks ? never assume one green drum fits all radiators.",
        ],
      },
      {
        id: "confusion",
        title: "Common customer confusion",
        items: [
          "Topping off incompatible chemistries after a partial drain or roadside emergency.",
          "Believing universal green coolant is acceptable in every HD diesel radiator.",
          "Confusing OAT automotive color habits with HD NOAT program requirements.",
          "Premix vs concentrate ratio errors and uncontrolled water quality in bulk blends.",
          "Ignoring flush procedure when switching inhibitor technology families.",
        ],
      },
      {
        id: "upgradePaths",
        title: "Upgrade paths",
        items: [
          "Universal / conventional ? automotive OAT ELC where light-duty and mixed passenger fleets dominate.",
          "Conventional ? extended-life NOAT ELC on HD fleets ready for longer drain intervals.",
          "Single-SKU bay habits ? standardized coolant ladder by account type (HD, automotive, ag).",
          "Coolant-only PO ? bundled brake, steering, and flush chemical companions in the service lane.",
        ],
      },
      {
        id: "specTalk",
        title: "Spec & application conversations",
        items: [
          "Ask what equipment types, bulk tanks, and top-off practices exist before quoting chemistry.",
          "Match OAT, NOAT, nitrite-free, and conventional language to the PDS ? not to drum color.",
          "Confirm ASTM / OEM / TMC references only where the PDS documents them.",
          "Document flush and compatibility steps when migrating inhibitor technology.",
        ],
      },
      {
        id: "hiddenOpportunities",
        title: "Opportunities reps may miss",
        items: [
          "HD NOAT ELC programs on fleets still buying universal coolant by price only.",
          "Automotive OAT programs in mixed passenger / light commercial bays.",
          "Ag and off-highway cooling tied to seasonal bulk and PM visits.",
          "Power steering fluid, brake fluid, and cooling-system cleaners on the same maintenance PO.",
        ],
      },
    ],
    repStrategy: {
      whereToPosition: [
        "Fleet and bay coolant program standardization ? universal entry through HD NOAT ELC where PDS supports.",
        "Extended-life, nitrite-free, and mixed-fleet cooling conversations tied to documented chemistry.",
        "Seasonal flush and top-off discipline on highway, ag, and municipal accounts.",
      ],
      customerPainPoint: [
        "Mixed-chemistry top-offs and wrong coolant in the wrong radiator.",
        "Heavy-duty equipment downtime from cooling neglect or compatibility failures.",
        "Shops quoting one universal green drum for every account type.",
      ],
      repSellingAngle: [
        "Lead with contamination and top-off discipline before chemistry upgrades.",
        "Match OAT / NOAT / conventional language to PDS ? never assume one coolant fits all.",
        "Bundle brake, steering, and flush chemicals when the bay is already in a cooling conversation.",
      ],
      crossSellPath: [
        "HD engine oil on the same fleet card",
        "Power steering and brake fluids in the service lane",
        "Grease and chassis programs on mixed fleets",
      ],
    },
  },
  agrimax: {
    playbookTitle: "AGRIMAX category intelligence",
    playbookIntro:
      "AGRIMAX is ag-dealer enablement: teach spec-correct fluid conversations across trans-hydraulic, wet-brake, engine, grease, and coolant reservoirs.",
    sections: [
      {
        id: "howItWorks",
        title: "How this category works",
        items: [
          "Ag equipment may share fluid across transmission, hydraulic, and wet-brake circuits ? one wrong fluid can affect multiple systems.",
          "Trans-drive / UTHF programs anchor the ag conversation where PDS lists tractor hydraulic and transmission duty.",
          "Zinc-free options matter on equipment and lines where OEM tags call for zinc-free chemistry.",
          "CK-4 engine programs support high-hour seasonal engine protection on farms and contractors.",
          "Grease and coolant companions complete the seasonal PM story ? not standalone upsells.",
        ],
      },
      {
        id: "confusion",
        title: "Common customer confusion",
        items: [
          "Using one red tractor fluid for every compartment without reading the equipment tag.",
          "Assuming green vs red line color equals interchangeable chemistry.",
          "Wet brake chatter blamed on brakes when fluid compatibility is the root issue.",
          "Brand-loyal customers believing only OEM-branded fluids can meet spec.",
        ],
      },
      {
        id: "upgradePaths",
        title: "Upgrade paths",
        items: [
          "Single companion SKU (coolant or grease only) ? full-line AGRIMAX program mapped by reservoir.",
          "Universal tractor fluid habit ? zinc-free or line-specific trans-drive where tags require it.",
          "Seasonal price-only quotes ? dealer PM and bulk programs with documented tier placement.",
        ],
      },
      {
        id: "specTalk",
        title: "Spec & application conversations",
        items: [
          "Meets key tractor hydraulic, transmission, and wet-brake specification conversations where supported by PDS.",
          "Use as an alternative against OEM-branded fluids when customers are brand-loyal but cost-sensitive ? verify manual/tag and PDS.",
          "John Deere / Case IH spec language only where PDS supports those specifications.",
          "Never imply OEM endorsement, partnership, or approval beyond PDS documentation.",
        ],
      },
      {
        id: "hiddenOpportunities",
        title: "Opportunities reps may miss",
        items: [
          "Wet brake chatter and multi-reservoir audits on busy ag dealers.",
          "Seasonal CK-4 and grease upgrades on the same farm account card.",
          "Coolant / ELC when cooling is part of the ag maintenance plan.",
          "Dealers still leading with 50/50 coolant or Poly Tac instead of program depth.",
        ],
      },
    ],
    repStrategy: {
      whereToPosition: [
        "Meets key tractor hydraulic, transmission, and wet-brake specification conversations where supported by PDS.",
        "Use as an alternative conversation against OEM-branded fluids when customers are brand-loyal but cost-sensitive.",
        "Position around John Deere / Case IH spec conversations only where PDS supports those specifications.",
      ],
      customerPainPoint: [
        "Wet brake chatter, reservoir confusion, and seasonal uptime pressure on ag dealers and farm accounts.",
        "Brand-loyal customers paying OEM premiums without a documented spec-matched alternative.",
        "Dealers stuck on one companion SKU (coolant, grease, or trans-drive) instead of a full-line ag program.",
      ],
      repSellingAngle: [
        "Talk wet brake chatter, transmission/hydraulic compatibility, seasonal uptime, and dealer PM programs.",
        "Save customers money without asking them to abandon OEM discipline ? verify spec requirements against equipment manual/tag and PDS.",
        "Never imply OEM endorsement, partnership, or approval beyond what the PDS documents.",
      ],
      crossSellPath: [
        "CK-4 and seasonal engine programs on the same farm account",
        "Grease depth beyond a single Poly Tac or RED TAC habit",
        "ELC / coolant programs when cooling is part of the ag maintenance plan",
        "Standard hydraulic AW only where AGRIMAX is not the fit (separate conversation)",
      ],
    },
  },
  foodGrade: {
    playbookTitle: "Food-grade category intelligence",
    playbookIntro:
      "Food-grade selling is compliance and fill-point discovery ? NSF H1 duty, audit readiness, and PDS-accurate claims drive every conversation.",
    sections: [
      {
        id: "howItWorks",
        title: "How this category works",
        items: [
          "NSF H1 lubricants are for incidental food contact where registration and duty match the processing environment.",
          "Hydraulic, grease, gear, compressor, and chain fills may all require H1 in the same plant ? each with separate PDS verification.",
          "Sanitation and washdown environments demand inventory separation and labeling discipline.",
          "Audit readiness means documented fill points, not a single drum at the maintenance crib.",
        ],
      },
      {
        id: "confusion",
        title: "Common customer confusion",
        items: [
          "Believing any white oil or generic hydraulic is acceptable in a processing zone.",
          "Mixing H1 and non-H1 inventory without segregation and labeling.",
          "Assuming food-grade means food-safe for direct product contact without reading PDS duty.",
          "Treating compressor and chain fills as general industrial when they are part of the H1 map.",
        ],
      },
      {
        id: "upgradePaths",
        title: "Upgrade paths",
        items: [
          "Single H1 hydraulic drum ? plant-wide H1 map across grease, gear, and specialty fills.",
          "Fragmented suppliers ? one Klondike H1 program story with PDS-backed registrations.",
          "Reactive audit fixes ? proactive fill-point documentation and relube discipline.",
        ],
      },
      {
        id: "specTalk",
        title: "Spec & application conversations",
        items: [
          "NSF H1 registration and category of duty must match the PDS ? no implied approvals.",
          "Separate food-contact zones from utility hydraulics outside the processing line.",
          "Confirm EP, viscosity, and base oil needs for gear and compressor circuits on PDS.",
        ],
      },
      {
        id: "hiddenOpportunities",
        title: "Opportunities reps may miss",
        items: [
          "H1 compressor and chain / conveyor programs in beverage and packaging plants.",
          "EP-2 grease upgrades on bearings adjacent to washdown areas.",
          "Gear oils on processing equipment reducers still on general industrial chemistry.",
        ],
      },
    ],
    repStrategy: {
      whereToPosition: [
        "NSF H1 and food-plant compliance conversations where PDS supports registration and duty.",
        "Sanitation, washdown, and incidental-contact programs across hydraulic, grease, and gear fills.",
        "Audit-ready plant programs ? not a single food-grade hydraulic drum in isolation.",
      ],
      customerPainPoint: [
        "Audit anxiety and fear of wrong fluid in a processing zone.",
        "Fragmented H1 suppliers across hydraulic, grease, gear, and compressor fills.",
        "Maintenance teams unclear which fill points require H1 vs general industrial chemistry.",
      ],
      repSellingAngle: [
        "Document every processing fill point before recommending chemistry.",
        "Every NSF H1 claim must match the PDS ? no implied registration beyond documentation.",
        "Consolidate grease, gear, compressor, and chain opportunities under one plant program story.",
      ],
      crossSellPath: [
        "H1 grease and gear depth on the same plant map",
        "Compressor and chain / conveyor H1 where PDS supports",
        "Standard hydraulic AW only outside food-contact zones (separate program)",
      ],
    },
  },
  environmental: {
    playbookTitle: "Environmental / EAL category intelligence",
    playbookIntro:
      "Environmental lubricants are site- and claim-driven: biodegradable, environmentally acceptable, and EAL programs must match PDS language and customer risk profile.",
    sections: [
      {
        id: "howItWorks",
        title: "How this category works",
        items: [
          "EAL and biodegradable lines address spill sensitivity and regulatory expectations on sensitive sites.",
          "Entry programs often start with inherently biodegradable AW for mobile hydraulics.",
          "HEES, BIO-Synthetic EAL, and synthetic-blend EAL tiers scale with duty severity and temperature.",
          "HFDU and specialty lines (e.g. rock drill) serve niche environmentally acceptable duty where PDS supports.",
          "Marine, dredging, forestry, and municipal sites each open different discovery questions.",
        ],
      },
      {
        id: "confusion",
        title: "Common customer confusion",
        items: [
          "Using the word biodegradable without matching the claim level on the PDS.",
          "Assuming any BIO-labeled drum satisfies a customer's environmental procurement rule.",
          "Ignoring spill containment while only switching fluid chemistry.",
          "Placing general AW in equipment that requires documented EAL chemistry.",
        ],
      },
      {
        id: "upgradePaths",
        title: "Upgrade paths",
        items: [
          "Generic AW on sensitive site ? ENVIRO / BIO entry AW programs.",
          "Entry AW ? BIO-Synthetic EAL or synthetic-blend EAL for severe mobile hydraulics.",
          "Single SKU habit ? tiered EAL program with rock drill and HFDU where applicable.",
        ],
      },
      {
        id: "specTalk",
        title: "Spec & application conversations",
        items: [
          "Ask about spill history, site rules, and procurement environmental clauses before quoting.",
          "Match biodegradability, HEES, and EAL claims exactly to PDS wording.",
          "Pair fluid programs with containment, response plans, and sampling where appropriate.",
        ],
      },
      {
        id: "hiddenOpportunities",
        title: "Opportunities reps may miss",
        items: [
          "Marine and dredging accounts still on legacy EAL suppliers.",
          "Forestry and municipal mobile fleets with unaddressed hydraulic spill exposure.",
          "Rock drill and specialty industrial lines on mining sites.",
          "HEES and HFDU depth beyond one BIO AW drum.",
        ],
      },
    ],
    repStrategy: {
      whereToPosition: [
        "Biodegradable, environmentally acceptable, and EAL conversations where PDS supports claims.",
        "Marine, dredging, forestry, municipal, and spill-sensitive site opportunities.",
        "Sensitive-site hydraulic programs from entry AW through HFDU and specialty lines.",
      ],
      customerPainPoint: [
        "Spill exposure, regulatory scrutiny, and environmental risk on sensitive jobsites.",
        "Customers over-paying for generic AW where an EAL program is required.",
        "Reps unaware of rock drill, HEES, and HFDU depth beyond one BIO SKU.",
      ],
      repSellingAngle: [
        "Pair chemistry with containment, spill response, and site rules ? not fear-based selling.",
        "Never overstate biodegradability or environmental claims beyond PDS language.",
        "Use site type (marine, forestry, municipal) to open discovery ? then place tiered EAL depth.",
      ],
      crossSellPath: [
        "BIO-Synthetic EAL for severe mobile hydraulics",
        "Rock drill and specialty industrial lines on mining / forestry accounts",
        "Grease and gear only where site rules require (separate conversation)",
      ],
    },
  },
  industrialSpecialty: {
    playbookTitle: "Industrial specialty category intelligence",
    playbookIntro:
      "Industrial specialty is a discovery category ? reps win by walking the plant and naming fills customers forgot to quote.",
    sections: [
      {
        id: "howItWorks",
        title: "How this category works",
        items: [
          "Beyond AW hydraulics: turbines, circulating systems, compressors, way lube, heat transfer, and rock drill each have distinct chemistry.",
          "R&O vs EP, viscosity grade, and base stock selection depend on equipment builder and duty ? always PDS-led.",
          "Maintenance-room breadth builds trust when reps ask about air systems and rotating equipment first.",
          "Specialty fills often sit on separate POs from the hydraulic bulk tank ? consolidate where duty allows.",
        ],
      },
      {
        id: "confusion",
        title: "Common customer confusion",
        items: [
          "Treating turbine oil like hydraulic AW because both are in a drum.",
          "Using gear EP in a circulating system that requires R&O chemistry.",
          "Assuming one compressor oil works on every air system without viscosity check.",
          "Never documenting way lube, heat transfer, or saw-guide fills on the plant map.",
        ],
      },
      {
        id: "upgradePaths",
        title: "Upgrade paths",
        items: [
          "Hydraulic-only supplier ? full maintenance-room discovery walk-through.",
          "Legacy turbine supplier ? long-life turbine and circulating programs on PDS.",
          "Ad hoc specialty buys ? standardized specialty ladder by asset class.",
        ],
      },
      {
        id: "specTalk",
        title: "Spec & application conversations",
        items: [
          "Survey fill points: turbines, compressors, way systems, heat transfer loops, rock drills, saws.",
          "Confirm ISO VG, R&O/EP, and OEM notes on each PDS before switching.",
          "Separate mobile AW from stationary specialty circuits in the quote.",
        ],
      },
      {
        id: "hiddenOpportunities",
        title: "Opportunities reps may miss",
        items: [
          "Compressor oils in plants that only buy hydraulic AW from you today.",
          "Rock drill oil on mining and construction accounts.",
          "Circulating and turbine oils on paper, power, and manufacturing sites.",
          "Way lube, heat transfer fluid, and saw-guide programs in fabrication shops.",
        ],
      },
    ],
    repStrategy: {
      whereToPosition: [
        "Maintenance-room discovery ? compressors, turbines, circulating oils, rock drill, saw guide, heat transfer, and way oils.",
        "Plant fills reps may not know Klondike carries ? open with rotating equipment and air systems.",
        "Specialty industrial programs adjacent to, not instead of, documented hydraulic AW duty.",
      ],
      customerPainPoint: [
        "Unnamed compressor, turbine, or circulating fills still sourced from legacy suppliers.",
        "Plants treating specialty reservoirs as afterthoughts on the hydraulic PO only.",
        "Missed margin on rock drill, heat transfer, and way-lube lines the rep never asked about.",
      ],
      repSellingAngle: [
        "Survey fill points before quoting ? specialty fluids are never one-size-fits-all.",
        "Confirm R&O vs EP, viscosity, and application claims on each PDS.",
        "Position Klondike as breadth for the maintenance room, not only the hydraulic bulk tank.",
      ],
      crossSellPath: [
        "Professional hydraulic AW for mobile equipment at the same site",
        "Industrial EP gear on reducers and drives",
        "Grease on bearings and bushings tied to the same plant walk-through",
      ],
    },
  },
  transmission: {
    playbookTitle: "Transmission & driveline category intelligence",
    playbookIntro:
      "Transmission fluids are application-first: ATF, tractor/trans-hydraulic, wet-brake, and driveline fills each require tag and PDS verification before quoting.",
    sections: [
      {
        id: "howItWorks",
        title: "How this category works",
        items: [
          "ATF programs serve automatic transmission and specified driveline duty where PDS lists ATF performance.",
          "Tractor / UTTO / trans-hydraulic fluids may share circuits with hydraulics and wet brakes on ag equipment.",
          "Wet brake compatibility is a separate check ? fluid that works in hydraulics may not be correct for wet brakes.",
          "Driveline and axle conversations tie to gear oil programs on the same equipment card.",
          "Arctic and multi-viscosity options address seasonal temperature swings in mixed fleets.",
        ],
      },
      {
        id: "confusion",
        title: "Common customer confusion",
        items: [
          "One universal red tractor fluid stocked for every compartment.",
          "Wet brake noise diagnosed as mechanical when fluid is wrong.",
          "Mixing zinc and zinc-free programs without equipment-tag review.",
          "Assuming highway ATF belongs in ag trans-hydraulic reservoirs.",
        ],
      },
      {
        id: "upgradePaths",
        title: "Upgrade paths",
        items: [
          "Universal tractor fluid only ? AGRIMAX trans-drive or zinc-free where tags require.",
          "Single-pail quotes ? seasonal bulk and dealer PM programs by reservoir map.",
          "Transmission-only PO ? grease and engine companions on the same equipment.",
        ],
      },
      {
        id: "specTalk",
        title: "Spec & application conversations",
        items: [
          "Read equipment tags: trans-hydraulic, wet brake, hydraulic, and driveline may differ.",
          "Application correctness and OEM/spec language only where PDS supports it.",
          "Confirm CVT, UTTO, and arctic needs on PDS before recommending viscosity.",
        ],
      },
      {
        id: "hiddenOpportunities",
        title: "Opportunities reps may miss",
        items: [
          "AGRIMAX zinc-free trans-drive on brand-sensitive ag lines.",
          "Arctic tractor fluid on seasonal equipment dealers.",
          "Grease and CK-4 engine programs on the same mixed fleet account.",
          "Hydraulic AW on supporting mobile assets outside the transmission conversation.",
        ],
      },
    ],
    repStrategy: {
      whereToPosition: [
        "ATF, tractor / UTTO, wet-brake, and driveline conversations with spec verification first.",
        "Ag dealer and mixed-equipment bays where reservoir labels are often misunderstood.",
        "Service-lane opportunities beyond a single universal tractor fluid SKU.",
      ],
      customerPainPoint: [
        "Wet brake chatter and trans-hydraulic compatibility failures from wrong fluid habits.",
        "Equipment tags listing multiple reservoir types but the bay stocks one red fluid.",
        "Missed AGRIMAX trans-drive and zinc-free options on brand-sensitive ag accounts.",
      ],
      repSellingAngle: [
        "Separate wet brake, trans-hydraulic, and driveline conversations ? confirm each on PDS.",
        "Application correctness and OEM/spec language only where PDS supports it.",
        "Dealer PM and seasonal bulk programs beat single-pail quotes when reservoirs are mapped.",
      ],
      crossSellPath: [
        "AGRIMAX trans-drive on ag accounts (separate from highway ATF)",
        "Grease and engine programs on the same equipment card",
        "Hydraulic AW for supporting mobile assets",
      ],
    },
  },
};

const PERFORMANCE_LADDER_ENABLEMENT = {
  hydraulic: {
    title: "Hydraulic category intelligence",
    intro: "Teach ISO VG discipline, contamination control, and tier progression before recommending chemistry changes.",
    bullets: [
      "Start with pump tags, bulk vs packaged top-off behavior, and filtration ? not brand habit.",
      "Upgrade path: commercial AW ? multi-viscosity / tractor ? synthetic / turbine where duty proves it.",
      "Separate wet-brake, circulating, and hydraulic reservoirs ? confirm each on PDS.",
    ],
  },
  grease: {
    title: "Grease category intelligence",
    intro: "Grease is relube-strategy selling: severity, water, shock load, and NLGI drive the ladder ? not one multipurpose SKU.",
    bullets: [
      "Map grease points by severity before quoting RED TAC, MOLY TAC, ULTRA TAC, or nano tiers.",
      "Upgrade path: multipurpose EP ? moly-fortified ? synthetic-blend ? nano sulfonate / lithium complex.",
      "Centralized systems need NLGI and thickener compatibility confirmed on PDS.",
    ],
  },
  hdEngine: {
    title: "HD engine oil category intelligence",
    intro: "HD engine selling is API category, viscosity, emissions hardware, and drain-interval discipline.",
    bullets: [
      "Align CK-4 / FA-4 and fleet duty before discussing synthetic upgrade.",
      "Upgrade path: conventional ? synthetic blend ? full synthetic CK-4 ? severe-duty extended drain where PDS supports.",
      "Railroad, natural gas, and specialty engine lines belong in program reference ? not the performance ladder top tier.",
    ],
  },
  gearOil: {
    title: "Gear oil category intelligence",
    intro: "Gear programs require GL/spec verification, shock-load duty, and industrial vs mobile drivetrain context.",
    bullets: [
      "Confirm GL-4 / GL-5, EP level, and viscosity on the fill tag before quoting.",
      "Upgrade path: commercial mineral ? industrial EP ? full synthetic ? flagship synthetic EP.",
      "Differential, axle, reducer, and industrial gearbox fills may need different products on the same account.",
    ],
  },
};


const REP_OPPORTUNITY_STRATEGY_BY_PRESET = {
  agrimax: {
    whereToPosition: [
      "Meets key tractor hydraulic, transmission, and wet-brake specification conversations where supported by PDS.",
      "Use as an alternative conversation against OEM-branded fluids when customers are brand-loyal but cost-sensitive.",
      "Position around John Deere / Case IH spec conversations only where PDS supports those specifications.",
    ],
    customerPainPoint: [
      "Wet brake chatter, reservoir confusion, and seasonal uptime pressure on ag dealers and farm accounts.",
      "Brand-loyal customers paying OEM premiums without a documented spec-matched alternative.",
      "Dealers stuck on one companion SKU (coolant, grease, or trans-drive) instead of a full-line ag program.",
    ],
    repSellingAngle: [
      "Talk wet brake chatter, transmission/hydraulic compatibility, seasonal uptime, and dealer PM programs.",
      "Save customers money without asking them to abandon OEM discipline ? verify spec requirements against equipment manual/tag and PDS.",
      "Never imply OEM endorsement, partnership, or approval beyond what the PDS documents.",
    ],
    crossSellPath: [
      "CK-4 and seasonal engine programs on the same farm account",
      "Grease depth beyond a single Poly Tac or RED TAC habit",
      "ELC / coolant programs when cooling is part of the ag maintenance plan",
      "Standard hydraulic AW only where AGRIMAX is not the fit (separate conversation)",
    ],
  },
  coolant: {
    whereToPosition: [
      "Fleet and bay coolant program standardization ? universal entry through HD NOAT ELC where PDS supports.",
      "Extended-life, nitrite-free, and mixed-fleet cooling conversations tied to documented chemistry.",
      "Seasonal flush and top-off discipline on highway, ag, and municipal accounts.",
    ],
    customerPainPoint: [
      "Mixed-chemistry top-offs and wrong coolant in the wrong radiator.",
      "Heavy-duty equipment downtime from cooling neglect or compatibility failures.",
      "Shops quoting one universal green drum for every account type.",
    ],
    repSellingAngle: [
      "Lead with contamination and top-off discipline before chemistry upgrades.",
      "Match OAT / NOAT / conventional language to PDS ? never assume one coolant fits all.",
      "Bundle brake, steering, and flush chemicals when the bay is already in a cooling conversation.",
    ],
    crossSellPath: [
      "HD engine oil on the same fleet card",
      "Power steering and brake fluids in the service lane",
      "Grease and chassis programs on mixed fleets",
    ],
  },
  foodGrade: {
    whereToPosition: [
      "NSF H1 and food-plant compliance conversations where PDS supports registration and duty.",
      "Sanitation, washdown, and incidental-contact programs across hydraulic, grease, and gear fills.",
      "Audit-ready plant programs ? not a single food-grade hydraulic drum in isolation.",
    ],
    customerPainPoint: [
      "Audit anxiety and fear of wrong fluid in a processing zone.",
      "Fragmented H1 suppliers across hydraulic, grease, gear, and compressor fills.",
      "Maintenance teams unclear which fill points require H1 vs general industrial chemistry.",
    ],
    repSellingAngle: [
      "Document every processing fill point before recommending chemistry.",
      "Every NSF H1 claim must match the PDS ? no implied registration beyond documentation.",
      "Consolidate grease, gear, compressor, and chain opportunities under one plant program story.",
    ],
    crossSellPath: [
      "H1 grease and gear depth on the same plant map",
      "Compressor and chain / conveyor H1 where PDS supports",
      "Standard hydraulic AW only outside food-contact zones (separate program)",
    ],
  },
  environmental: {
    whereToPosition: [
      "Biodegradable, environmentally acceptable, and EAL conversations where PDS supports claims.",
      "Marine, dredging, forestry, municipal, and spill-sensitive site opportunities.",
      "Sensitive-site hydraulic programs from entry AW through HFDU and specialty lines.",
    ],
    customerPainPoint: [
      "Spill exposure, regulatory scrutiny, and environmental risk on sensitive jobsites.",
      "Customers over-paying for generic AW where an EAL program is required.",
      "Reps unaware of rock drill, HEES, and HFDU depth beyond one BIO SKU.",
    ],
    repSellingAngle: [
      "Pair chemistry with containment, spill response, and site rules ? not fear-based selling.",
      "Never overstate biodegradability or environmental claims beyond PDS language.",
      "Use site type (marine, forestry, municipal) to open discovery ? then place tiered EAL depth.",
    ],
    crossSellPath: [
      "BIO-Synthetic EAL for severe mobile hydraulics",
      "Rock drill and specialty industrial lines on mining / forestry accounts",
      "Grease and gear only where site rules require (separate conversation)",
    ],
  },
  industrialSpecialty: {
    whereToPosition: [
      "Maintenance-room discovery ? compressors, turbines, circulating oils, rock drill, saw guide, heat transfer, and way oils.",
      "Plant fills reps may not know Klondike carries ? open with rotating equipment and air systems.",
      "Specialty industrial programs adjacent to, not instead of, documented hydraulic AW duty.",
    ],
    customerPainPoint: [
      "Unnamed compressor, turbine, or circulating fills still sourced from legacy suppliers.",
      "Plants treating specialty reservoirs as afterthoughts on the hydraulic PO only.",
      "Missed margin on rock drill, heat transfer, and way-lube lines the rep never asked about.",
    ],
    repSellingAngle: [
      "Survey fill points before quoting ? specialty fluids are never one-size-fits-all.",
      "Confirm R&O vs EP, viscosity, and application claims on each PDS.",
      "Position Klondike as breadth for the maintenance room, not only the hydraulic bulk tank.",
    ],
    crossSellPath: [
      "Professional hydraulic AW for mobile equipment at the same site",
      "Industrial EP gear on reducers and drives",
      "Grease on bearings and bushings tied to the same plant walk-through",
    ],
  },
  transmission: {
    whereToPosition: [
      "ATF, tractor / UTTO, wet-brake, and driveline conversations with spec verification first.",
      "Ag dealer and mixed-equipment bays where reservoir labels are often misunderstood.",
      "Service-lane opportunities beyond a single universal tractor fluid SKU.",
    ],
    customerPainPoint: [
      "Wet brake chatter and trans-hydraulic compatibility failures from wrong fluid habits.",
      "Equipment tags listing multiple reservoir types but the bay stocks one red fluid.",
      "Missed AGRIMAX trans-drive and zinc-free options on brand-sensitive ag accounts.",
    ],
    repSellingAngle: [
      "Separate wet brake, trans-hydraulic, and driveline conversations ? confirm each on PDS.",
      "Application correctness and OEM/spec language only where PDS supports it.",
      "Dealer PM and seasonal bulk programs beat single-pail quotes when reservoirs are mapped.",
    ],
    crossSellPath: [
      "AGRIMAX trans-drive on ag accounts (separate from highway ATF)",
      "Grease and engine programs on the same equipment card",
      "Hydraulic AW for supporting mobile assets",
    ],
  },
};

/** Ladder preset id (camelCase) ? deterministic registry key (snake_case). */
const PRESET_KEY_TO_REGISTRY_KEY = {
  hydraulic: "hydraulic",
  grease: "grease",
  hdEngine: "hd_engine_oil",
  gearOil: "gear_oil",
  transmission: "transmission",
  coolant: "coolant",
  agrimax: "agrimax",
  foodGrade: "food_grade",
  environmental: "environmental_eal",
  industrialSpecialty: "industrial_specialty",
};

const REGISTRY_PROGRAM_TIER_TO_LADDER = {
  awareness: "good",
  fit: "better",
  opportunity: "best",
  cross_sell: "ultimate",
};

function resolveRegistryProgramIntelligence(presetKey, wizardKey) {
  const fromWizard = getCategoryProgramIntelligence(wizardKey);
  if (fromWizard) return fromWizard;
  const registryKey = PRESET_KEY_TO_REGISTRY_KEY[presetKey] || presetKey;
  return getCategoryProgramIntelligence(registryKey);
}

function filterRegistrySupplementLines(presetKey, lines) {
  const list = coerceStringLines(lines, [], 12);
  if (presetKey !== "coolant") return list;
  return list.filter((line) => {
    const lower = String(line).toLowerCase();
    if (/gold.*light[- ]?duty/.test(lower)) return false;
    if (/gold automotive oat.*light[- ]?duty/.test(lower)) return false;
    if (/automotive oat programs for mixed fleets and light-duty/.test(lower)) return false;
    return true;
  });
}

function keyBenefitsFromRegistry(registry) {
  const icons = ["consolidation", "uptime", "mix", "expansion", "retention", "downtime"];
  const angles = coerceStringLines(registry.keySellingAngles, [], 6);
  if (!angles.length) return [];
  return angles.slice(0, 6).map((line, i) => {
    const dash = line.match(/^([^:??-]{1,52})\s*[:??-]\s*(.+)$/);
    return {
      iconKey: icons[i % icons.length],
      label: cleanCategoryDisplayText(dash ? dash[1] : line.slice(0, 52)),
      sub: cleanCategoryDisplayText(dash ? dash[2] : registry.customerProblemsSolved[i] || line),
    };
  });
}

function idealCustomersFromRegistry(registry, programFallback) {
  const fromFamilies = (registry.categoryFamilies || [])
    .map((f) => String(f.label || "").trim())
    .filter(Boolean);
  return mergeUniqueStrings(fromFamilies, programFallback, 8);
}

function featuredProductsFromRegistry(registry, presetKey) {
  const out = [];
  const seen = new Set();
  const push = (name, role) => {
    const n = String(name || "").trim();
    if (!n) return;
    if (presetKey === "hydraulic" && /\bagrimax\b/i.test(n)) return;
    if (presetKey === "foodGrade" && /\b(enviro|bio|eal)\b/i.test(n) && !/food[- ]?grade|nsf|h1/i.test(n)) return;
    if (presetKey === "environmental" && /\bfood[- ]?grade|nsf h1\b/i.test(n)) return;
    const key = n.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ name: cleanCategoryDisplayText(n), role: cleanCategoryDisplayText(role || "") });
  };
  for (const fp of registry.flagshipProducts || []) {
    push(fp.name, fp.positioning || fp.role || "");
  }
  for (const tier of registry.performanceLadder?.tiers || []) {
    const role = String(tier.positioning || tier.label || "").trim();
    for (const name of tier.products || []) push(name, role);
  }
  return out;
}

function ladderPresetFromRegistry(registry, fallbackPreset, presetKey) {
  if (!registry?.performanceLadder?.tiers?.length || !fallbackPreset) return fallbackPreset;
  const style = registry.performanceLadder.style === "program" ? "program" : "performance";
  const programLabels = PROGRAM_LADDER_TIER_LABELS;
  const performanceLabels = ["GOOD", "BETTER", "BEST", "ULTIMATE"];
  const tiers = registry.performanceLadder.tiers.slice(0, 4).map((tier, i) => {
    const fallback = fallbackPreset.tiers[i] || fallbackPreset.tiers[0];
    const rawTier = String(tier.tier || "").toLowerCase();
    const tierId = REGISTRY_PROGRAM_TIER_TO_LADDER[rawTier] || rawTier || LADDER_TIER_ORDER[i];
    const label =
      style === "program"
        ? programLabels[i] || tier.label || fallback.label
        : tier.label || performanceLabels[i] || fallback.label;
    const products = coerceStringLines(tier.products, fallback.products || [], 6);
    return {
      tier: LADDER_TIER_ORDER.includes(tierId) ? tierId : LADDER_TIER_ORDER[i],
      label,
      positioning: cleanCategoryDisplayText(tier.positioning || fallback.positioning),
      products: products.length ? products : [...(fallback.products || [])],
    };
  });
  const emphasis = mergeUniqueStrings(
    registry.keyTechnologyThemes,
    fallbackPreset.emphasis,
    6
  );
  return {
    ...fallbackPreset,
    categoryKey: registry.key || fallbackPreset.categoryKey,
    ladderStyle: style,
    emphasis: emphasis.length ? emphasis : fallbackPreset.emphasis,
    tiers,
  };
}

function performanceEnablementFromRegistry(registry) {
  if (!registry) return null;
  const bullets = mergeUniqueStrings(registry.keySellingAngles, registry.customerProblemsSolved, 4);
  if (!bullets.length) return null;
  return {
    title: `${registry.label} — quick dealer coaching`,
    intro: cleanCategoryDisplayText(registry.categorySummary),
    bullets: bullets.map(cleanCategoryDisplayText),
  };
}

function buildCategoryIntelligencePlaybookFromRegistry(registry) {
  const whatToSay = mergeUniqueStrings(
    registry.recommendedRepTalkingPoints,
    registry.discoveryFocus,
    10
  );
  const nextSteps = coerceStringLines(
    registry.dealerNextSteps || registry.applicationGuidance,
    [],
    6
  );
  const howKlondikeWins = mergeUniqueStrings(
    registry.howKlondikeWins,
    registry.competitorBeatAngles,
    8
  );
  const guaranteeLines = coerceStringLines(
    registry.klondikeGuarantee,
    KLONDIKE_GUARANTEE_LINES,
    3
  );
  const oemCoaching = registry.oemSpecCoaching || getCategoryOemSpecCoaching(registry.key);
  const sectionDefs = [
    { id: "customersCare", title: "What customers care about", items: registry.customerProblemsSolved },
    { id: "klondikeWins", title: "How KLONDIKE wins", items: howKlondikeWins },
    { id: "dealersCare", title: "Why dealers should care", items: registry.keySellingAngles },
    { id: "whatToSay", title: "What to say", items: whatToSay },
    { id: "crossSell", title: "What to cross-sell", items: registry.crossSellFocus },
    { id: "nextSteps", title: "What to do next", items: nextSteps },
  ];
  if (oemCoaching?.whatToAsk?.length) {
    sectionDefs.splice(3, 0, {
      id: "oemWhatToAsk",
      title: "What to ask (OEM / spec)",
      items: oemCoaching.whatToAsk,
    });
  }
  if (oemCoaching?.specCallouts?.length) {
    const insertAt = sectionDefs.findIndex((s) => s.id === "crossSell");
    sectionDefs.splice(insertAt >= 0 ? insertAt : sectionDefs.length, 0, {
      id: "oemSpecCallouts",
      title: "Likely spec conversations (verify on PDS)",
      items: oemCoaching.specCallouts,
    });
  }
  const sections = sectionDefs
    .map((section) => ({
      id: section.id,
      title: cleanCategoryDisplayText(section.title),
      items: coerceStringLines(section.items, [], 8).map(cleanCategoryDisplayText),
    }))
    .filter((section) => section.items.length);

  return {
    playbookTitle: cleanCategoryDisplayText(`${registry.label} — dealer winning playbook`),
    playbookIntro: cleanCategoryDisplayText(registry.flagshipPositioning || registry.categorySummary),
    sections,
    klondikeGuarantee: guaranteeLines.map(cleanCategoryDisplayText),
    oemSpecVerifyLine: oemCoaching ? OEM_SPEC_VERIFY_LINE : null,
    repStrategy: {
      customerPainPoint: coerceStringLines(registry.customerProblemsSolved, [], 6).map(cleanCategoryDisplayText),
      whereToPosition: coerceStringLines(registry.keySellingAngles, [], 6).map(cleanCategoryDisplayText),
      repSellingAngle: whatToSay.map(cleanCategoryDisplayText),
      crossSellPath: coerceStringLines(registry.crossSellFocus, [], 6).map(cleanCategoryDisplayText),
    },
  };
}

function resolveRepOpportunityStrategyRegistryFirst(program, presetKey, repStrategySeed) {
  const presetDefault =
    repStrategySeed || CATEGORY_INTELLIGENCE_PLAYBOOKS[presetKey]?.repStrategy || REP_OPPORTUNITY_STRATEGY_BY_PRESET[presetKey];
  const fromProgram = program?.repOpportunityStrategy;
  const fromSelling = sellingStrategyToRepOpportunity(program?.sellingStrategy);
  const mergeLines = (key) =>
    filterRegistrySupplementLines(
      presetKey,
      mergeUniqueStrings(
        presetDefault?.[key],
        mergeUniqueStrings(fromProgram?.[key], fromSelling?.[key], 6),
        6
      )
    );
  return {
    whereToPosition: mergeLines("whereToPosition"),
    customerPainPoint: mergeLines("customerPainPoint"),
    repSellingAngle: mergeLines("repSellingAngle"),
    crossSellPath: mergeLines("crossSellPath"),
  };
}

function resolveRepOpportunityStrategy(program, presetKey, repStrategySeed) {
  const presetDefault =
    repStrategySeed || CATEGORY_INTELLIGENCE_PLAYBOOKS[presetKey]?.repStrategy || REP_OPPORTUNITY_STRATEGY_BY_PRESET[presetKey];
  const fromProgram = program?.repOpportunityStrategy;
  const fromSelling = sellingStrategyToRepOpportunity(program?.sellingStrategy);
  const mergeLines = (key) =>
    coerceStringLines(
      fromProgram?.[key],
      coerceStringLines(fromSelling?.[key], coerceStringLines(presetDefault?.[key], [], 6), 6),
      6
    );
  return {
    whereToPosition: mergeLines("whereToPosition"),
    customerPainPoint: mergeLines("customerPainPoint"),
    repSellingAngle: mergeLines("repSellingAngle"),
    crossSellPath: mergeLines("crossSellPath"),
  };
}

function resolveCategoryIntelligencePlaybook(program, presetKey, registry) {
  if (registry) {
    const base = buildCategoryIntelligencePlaybookFromRegistry(registry);
    return {
      ...base,
      repStrategy: resolveRepOpportunityStrategyRegistryFirst(program, presetKey, base.repStrategy),
    };
  }
  const legacy = CATEGORY_INTELLIGENCE_PLAYBOOKS[presetKey];
  if (!legacy) return null;
  const override = program?.categoryIntelligence;
  const sections = (legacy.sections || [])
    .map((section) => ({
      id: section.id,
      title: cleanCategoryDisplayText(section.title),
      items: coerceStringLines(override?.[section.id] ?? section.items, section.items, 8),
    }))
    .filter((s) => s.items.length);
  return {
    playbookTitle: cleanCategoryDisplayText(legacy.playbookTitle),
    playbookIntro: cleanCategoryDisplayText(legacy.playbookIntro),
    sections,
    repStrategy: resolveRepOpportunityStrategy(program, presetKey, legacy.repStrategy),
  };
}

function sellingStrategyFromRegistry(registry, program) {
  const base = normalizeSellingStrategy(program?.sellingStrategy);
  return {
    positioning: mergeUniqueStrings(registry.keySellingAngles, base?.positioning, 6).map(cleanCategoryDisplayText),
    problemsSolved: mergeUniqueStrings(registry.customerProblemsSolved, base?.problemsSolved, 6).map(
      cleanCategoryDisplayText
    ),
    opportunitySignals: mergeUniqueStrings(registry.discoveryFocus, base?.opportunitySignals, 6).map(
      cleanCategoryDisplayText
    ),
    crossSellPath: mergeUniqueStrings(registry.crossSellFocus, base?.crossSellPath, 6).map(cleanCategoryDisplayText),
  };
}

function crossSellFallbackForProgram(program) {
  if (Array.isArray(program?.crossSell) && program.crossSell.length) return program.crossSell;
  return crossSellItemsFromStringPaths(program?.sellingStrategy?.crossSellPath);
}

function crossSellIconKey(title) {
  const t = String(title || "").toLowerCase();
  if (/grease|tac/.test(t)) return "grease";
  if (/gear/.test(t)) return "gear";
  if (/engine|ck-4|hd/.test(t)) return "engine";
  if (/coolant|antifreeze/.test(t)) return "coolant";
  if (/hydraulic/.test(t)) return "hydraulic";
  if (/food/.test(t)) return "food";
  if (/compressor/.test(t)) return "compressor";
  if (/chain/.test(t)) return "chain";
  if (/eal|bio|enviro/.test(t)) return "eal";
  return "program";
}

function crossSellDescriptor(title) {
  const t = String(title || "").toLowerCase();
  if (/grease/.test(t)) return "Pin, bearing, and chassis protection";
  if (/gear/.test(t)) return "Drivetrain and reducer coverage";
  if (/engine/.test(t)) return "Fleet engine program expansion";
  if (/coolant/.test(t)) return "Cooling system discipline";
  if (/food/.test(t)) return "NSF H1 programs where required";
  if (/compressor/.test(t)) return "Plant air and compressor circuits";
  if (/chain/.test(t)) return "Food-grade chain and conveyor lube";
  return "Companion category in the lubrication system";
}

function normalizeFeaturedProducts(products, productImages) {
  const raw = coerceToIterableList(products, []);
  const images = coerceToIterableList(productImages, []);
  const out = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    let name = "";
    let role = "";
    let imageUrl = "";
    if (item && typeof item === "object") {
      name = String(item.name ?? item.title ?? item.productName ?? "").trim();
      role = String(item.role ?? item.sub ?? item.desc ?? "").trim();
      imageUrl = String(item.imageUrl ?? item.url ?? item.src ?? "").trim();
    } else {
      name = String(item ?? "").trim();
    }
    if (!name) continue;
    if (!imageUrl && images[i]) {
      imageUrl =
        typeof images[i] === "object"
          ? String(images[i].url ?? images[i].src ?? images[i].imageUrl ?? "").trim()
          : String(images[i]).trim();
    }
    if (isLadderLineupStripImage(imageUrl)) imageUrl = "";
    out.push({
      name: cleanCategoryDisplayText(name),
      role: cleanCategoryDisplayText(role),
      imageUrl,
    });
    if (out.length >= 6) break;
  }
  return out;
}

function resolveExplicitLadderKey(explicitKey) {
  const raw = String(explicitKey || "").trim();
  if (!raw) return "";
  if (CATEGORY_LADDER_PRESETS[raw]) return raw;
  const fromWizard = WIZARD_CATEGORY_TO_LADDER_KEY[raw];
  if (fromWizard && CATEGORY_LADDER_PRESETS[fromWizard]) return fromWizard;
  return "";
}

function inferCategoryLadderKey(categoryTitle, categorySubtitle, applications, explicitCategoryKey) {
  const fromExplicit = resolveExplicitLadderKey(explicitCategoryKey);
  if (fromExplicit) return fromExplicit;

  const blob = [
    categoryTitle,
    categorySubtitle,
    ...(Array.isArray(applications) ? applications : []),
  ]
    .join(" ")
    .toLowerCase();

  if (/\bagrimax\b|agri[- ]max|agri_oem|zinc.?free trans.?drive/.test(blob)) return "agrimax";
  if (
    /\bfood[- ]?grade\b|\bnsf\s*h1\b|\bh1\s*food\b|food[- ]processing|food plant/.test(blob) &&
    !/\bagrimax\b/.test(blob)
  ) {
    return "foodGrade";
  }
  if (
    /\b(enviro|bio[- ]|eal|biodegradable|environmentally acceptable|hees|hfdu)\b/.test(blob) &&
    !/\bagrimax\b/.test(blob)
  ) {
    return "environmental";
  }
  if (/grease|nlgi|red tac|moly tac|ultra tac|syn tac|nano/.test(blob) && !/\bhydraulic\b/.test(blob)) {
    return "grease";
  }
  if (/gear oil|gear lubricant|industrial ep gear|drivetrain gear/.test(blob) && !/\bengine\b/.test(blob)) {
    return "gearOil";
  }
  if (/\bcoolant\b|\bantifreeze\b|\belc\b|\bnoat\b|\boat\b/.test(blob) && !/\bengine oil\b/.test(blob)) {
    return "coolant";
  }
  if (/\btransmission\b|\btrans fluid\b|\butto\b|\btractor fluid\b|\bcvt\b|\btrans-hydraulic\b/.test(blob)) {
    return "transmission";
  }
  if (
    /\bindustrial specialty\b|\bturbine\b|\bcirculating\b|\bway oil\b|\bheat transfer\b|\bcompressor oil\b|\brock drill\b/.test(
      blob
    )
  ) {
    return "industrialSpecialty";
  }
  if (/engine oil|ck-4|ck4|fa-4|fa4|heavy duty engine|hd engine|motor oil|crankcase/.test(blob)) {
    return "hdEngine";
  }
  if (
    /hydraulic|iso vg|xvi synthetic|aw fluid|professional hydraulic/.test(blob) &&
    !/\bagrimax\b/.test(blob) &&
    !/\bturbine\b/.test(blob)
  ) {
    return "hydraulic";
  }
  return "hydraulic";
}

function ladderHeadlineTitle(ladder) {
  if (ladder?.ladderStyle === "program") {
    return "CATEGORY INTELLIGENCE";
  }
  return "PRODUCT LINE DEPTH";
}

function ladderTierLabelLine(ladder) {
  if (ladder?.ladderStyle === "program") {
    return "PROGRAM AWARENESS \u00b7 WHERE IT FITS \u00b7 REP OPPORTUNITY \u00b7 CROSS-SELL PATH";
  }
  return "GOOD \u00b7 BETTER \u00b7 BEST \u00b7 ULTIMATE";
}

function ladderSectionEyebrow(ladder) {
  return ladder?.ladderStyle === "program" ? "Category intelligence / program strategy" : "Category performance ladder";
}

function ladderSectionDescription(ladder) {
  if (ladder?.ladderStyle === "program") {
    return cleanCategoryDisplayText(
      "Use this map to surface category breadth, uncover SKUs the customer may not know we carry, and guide cross-sell conversations."
    );
  }
  return cleanCategoryDisplayText(
    "Use the ladder to guide upgrade conversations, product consolidation, and premium conversion opportunities."
  );
}

const CATEGORY_PRODUCT_IMAGE_BUCKETS = ["good", "better", "best", "ultimate", "featured", "ecosystem"];

function normalizeUploadBucket(raw, maxSlots = 6) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const imageUrl = String(item?.imageUrl ?? item?.url ?? item?.src ?? "").trim();
      const label = String(item?.label ?? item?.name ?? "").trim();
      if (!imageUrl || isLadderLineupStripImage(imageUrl)) return null;
      return { imageUrl, label };
    })
    .filter(Boolean)
    .slice(0, maxSlots);
}

function normalizeUploadedCategoryProductImages(value) {
  const empty = { good: [], better: [], best: [], ultimate: [], featured: [], ecosystem: [] };
  if (!value || typeof value !== "object") return empty;
  const out = { ...empty };
  for (const bucketId of CATEGORY_PRODUCT_IMAGE_BUCKETS) {
    out[bucketId] = normalizeUploadBucket(value[bucketId], bucketId === "featured" || bucketId === "ecosystem" ? 6 : 3);
  }
  return out;
}

function resolveCategoryProductImageUploadHandler(props) {
  const unified = props.onCategoryProductImageUploadRequest;
  const legacy = props.onLadderTierProductImageUploadRequest;
  if (typeof unified === "function") return unified;
  if (typeof legacy === "function") {
    return (bucket, slotIndex) => legacy(bucket, slotIndex);
  }
  return undefined;
}

function applyFeaturedLineupUploads(products, uploads) {
  const list = Array.isArray(products) ? products : [];
  const featured = normalizeUploadBucket(uploads?.featured, 6);
  if (!featured.length) return list;
  return list.map((product, index) => {
    const upload = featured[index];
    if (!upload?.imageUrl) return product;
    return {
      ...product,
      imageUrl: upload.imageUrl,
      name: cleanCategoryDisplayText(upload.label || product.name),
    };
  });
}

function applyEcosystemCardUploads(items, uploads) {
  const list = Array.isArray(items) ? items : [];
  const ecosystem = normalizeUploadBucket(uploads?.ecosystem, 6);
  if (!ecosystem.length) return list;
  return list.map((item, index) => {
    const upload = ecosystem[index];
    if (!upload?.imageUrl) return item;
    return {
      ...item,
      imageUrl: upload.imageUrl,
      title: cleanCategoryDisplayText(upload.label || item.title),
    };
  });
}

function mergeUploadIntoTierProductImages(tierImages, uploads, tierId) {
  const uploaded = Array.isArray(uploads?.[tierId]) ? uploads[tierId] : [];
  const preset = (Array.isArray(tierImages) ? tierImages : []).map((entry) => ({
    ...entry,
    imageUrl: isLadderLineupStripImage(entry?.imageUrl) ? "" : String(entry?.imageUrl || "").trim(),
  }));
  const hasUpload = uploaded.some((u) => u?.imageUrl && !isLadderLineupStripImage(u.imageUrl));
  if (!hasUpload) return preset.slice(0, 3);
  const slotCount = Math.max(preset.length, uploaded.length, 1);
  const out = [];
  for (let i = 0; i < slotCount && out.length < 3; i++) {
    const u = uploaded[i];
    const p = preset[i];
    const uploadUrl =
      u?.imageUrl && !isLadderLineupStripImage(u.imageUrl) ? String(u.imageUrl).trim() : "";
    if (uploadUrl) {
      out.push({
        name: cleanCategoryDisplayText(u.label || p?.name || `Line item ${i + 1}`),
        label: cleanCategoryDisplayText(u.label || p?.label || ""),
        imageUrl: uploadUrl,
        imageFocus: p?.imageFocus || "50% 42%",
        variant: p?.variant || inferLadderProductVariant(u.label || p?.name),
      });
    } else if (p) {
      out.push(p);
    }
  }
  return out.slice(0, 3);
}

function applyUploadedCategoryProductImages(ladder, uploadedRaw) {
  if (!ladder?.tiers?.length) return ladder;
  const uploads = normalizeUploadedCategoryProductImages(uploadedRaw);
  const hasAny = LADDER_TIER_ORDER.some((id) => (uploads[id] || []).length > 0);
  if (!hasAny) return ladder;
  return {
    ...ladder,
    tiers: ladder.tiers.map((tier) => {
      const tierId = String(tier.tier || "").toLowerCase();
      return {
        ...tier,
        productImages: mergeUploadIntoTierProductImages(tier.productImages, uploads, tierId),
      };
    }),
  };
}

function mergeUniqueStrings(primary, secondary, max = 12) {
  const out = [];
  const seen = new Set();
  const push = (raw) => {
    const t = String(raw ?? "").trim();
    if (!t) return;
    const key = t.toLowerCase().slice(0, 96);
    if (seen.has(key)) return;
    seen.add(key);
    out.push(t);
  };
  for (const line of coerceToIterableList(primary, [])) push(line);
  for (const line of coerceToIterableList(secondary, [])) {
    if (out.length >= max) break;
    push(line);
  }
  const fb = coerceToIterableList(primary, []);
  return out.length ? out : fb.slice(0, max);
}

function featuredProductsFromLadderPreset(presetKey) {
  const preset = CATEGORY_LADDER_PRESETS[presetKey];
  if (!preset) return [];
  const out = [];
  const seen = new Set();
  for (const tier of preset.tiers || []) {
    const role = String(tier.positioning || tier.label || "").trim();
    for (const name of tier.products || []) {
      const n = String(name).trim();
      if (!n) continue;
      const key = n.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ name: n, role });
    }
  }
  return out;
}

function mergeFeaturedProductsSupplement(presetList, supplement, max = 12) {
  const out = [];
  const seen = new Set();
  const push = (item) => {
    const name = String(item?.name ?? item ?? "").trim();
    if (!name) return;
    const key = name.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    let imageUrl = String(item?.imageUrl ?? "").trim();
    if (isLadderLineupStripImage(imageUrl)) imageUrl = "";
    out.push({
      name,
      role: String(item?.role ?? item?.sub ?? "").trim(),
      imageUrl,
    });
  };
  for (const item of presetList) push(item);
  for (const item of Array.isArray(supplement) ? supplement : []) {
    if (out.length >= max) break;
    push(item);
  }
  return out;
}

function resolveCategoryProgramContent(props) {
  const wizardKey = String(props.categoryLadderKey || "").trim();
  const categoryFirst = Boolean(wizardKey);
  const presetKey = inferCategoryLadderKey(
    props.categoryTitle,
    props.categorySubtitle,
    props.applications,
    wizardKey
  );
  const program = CATEGORY_PROGRAM_COPY[presetKey] || CATEGORY_PROGRAM_COPY.hydraulic;
  const registry = resolveRegistryProgramIntelligence(presetKey, wizardKey);
  const baseLadderPreset = CATEGORY_LADDER_PRESETS[presetKey] || CATEGORY_LADDER_PRESETS.hydraulic;
  const ladderPreset = registry
    ? ladderPresetFromRegistry(registry, baseLadderPreset, presetKey)
    : baseLadderPreset;
  const ladderFeatured = featuredProductsFromLadderPreset(presetKey);
  const registryFeatured = registry ? featuredProductsFromRegistry(registry, presetKey) : [];
  const crossSellFallback = registry
    ? crossSellItemsFromStringPaths(registry.crossSellFocus)
    : crossSellFallbackForProgram(program);
  const categoryIntelligence = resolveCategoryIntelligencePlaybook(program, presetKey, registry);
  const repOpportunityStrategy =
    categoryIntelligence?.repStrategy ||
    (registry
      ? resolveRepOpportunityStrategyRegistryFirst(program, presetKey)
      : resolveRepOpportunityStrategy(program, presetKey));
  const sellingStrategy = registry
    ? sellingStrategyFromRegistry(registry, { ...program, sellingStrategy: props.sellingStrategy || program.sellingStrategy })
    : normalizeSellingStrategy(props.sellingStrategy || program.sellingStrategy);
  const ladderEnablement = registry
    ? performanceEnablementFromRegistry(registry) || PERFORMANCE_LADDER_ENABLEMENT[presetKey]
    : PERFORMANCE_LADDER_ENABLEMENT[presetKey];

  const registryTitle = registry
    ? cleanCategoryDisplayText(
        registry.label.startsWith("KLONDIKE") || registry.label.startsWith("AGRIMAX")
          ? registry.label
          : `KLONDIKE ${registry.label}`
      )
    : "";
  const registrySubtitle = registry ? cleanCategoryDisplayText(registry.flagshipPositioning) : "";
  const registrySummary = registry ? cleanCategoryDisplayText(registry.categorySummary) : "";
  const registryKeyBenefits = registry ? keyBenefitsFromRegistry(registry) : [];
  const registryRepTalk = registry
    ? filterRegistrySupplementLines(presetKey, registry.recommendedRepTalkingPoints)
    : [];
  const registryDiscovery = registry ? filterRegistrySupplementLines(presetKey, registry.discoveryFocus) : [];
  const registryCautions = registry ? coerceStringLines(registry.cautions, [], 6).map(cleanCategoryDisplayText) : [];
  const registryApplications = registry
    ? mergeUniqueStrings(registry.applicationGuidance, [], 8).map(cleanCategoryDisplayText)
    : [];

  if (!categoryFirst) {
    const featuredFromProps = normalizeFeaturedProducts(props.featuredProducts, props.productImages ?? []);
    const featuredBase = registryFeatured.length
      ? registryFeatured
      : mergeFeaturedProductsSupplement(ladderFeatured, props.featuredProductsSupplement);
    return {
      categoryTitle: registryTitle || pickText(props.categoryTitle, program.categoryTitle),
      categorySubtitle: registrySubtitle || pickText(props.categorySubtitle, program.categorySubtitle),
      opportunitySummary: registrySummary || pickText(props.opportunitySummary, program.opportunitySummary),
      keyBenefits: registryKeyBenefits.length
        ? registryKeyBenefits
        : normalizeValueCards(props.keyBenefits, program.keyBenefits),
      idealCustomers: registry
        ? idealCustomersFromRegistry(registry, pickList(props.idealCustomers, program.idealCustomers))
        : pickList(props.idealCustomers, program.idealCustomers),
      applications: registryApplications.length
        ? mergeUniqueStrings(registryApplications, pickList(props.applications, program.applications), 8)
        : pickList(props.applications, program.applications),
      featuredProducts: featuredFromProps.length
        ? mergeFeaturedProductsSupplement(featuredFromProps, featuredBase, 14)
        : mergeFeaturedProductsSupplement(featuredBase, props.featuredProductsSupplement, 14),
      crossSell: normalizeCrossSellItems(
        registry ? crossSellFallback : props.crossSell,
        registry ? props.crossSell : crossSellFallback
      ),
      repTalkTrack: registryRepTalk.length
        ? mergeUniqueStrings(registryRepTalk, filterRegistrySupplementLines(presetKey, props.repTalkTrack), 6).map(
            cleanCategoryDisplayText
          )
        : pickList(props.repTalkTrack, program.repTalkTrack),
      discoveryQuestions: registryDiscovery.length
        ? mergeUniqueStrings(registryDiscovery, filterRegistrySupplementLines(presetKey, props.discoveryQuestions), 6)
        : pickList(props.discoveryQuestions, program.discoveryQuestions),
      cautions: registryCautions.length
        ? mergeUniqueStrings(registryCautions, pickList(props.cautions, program.cautions), 6).map(cleanCategoryDisplayText)
        : pickList(props.cautions, program.cautions),
      recommendedNextStep: pickText(props.recommendedNextStep, program.recommendedNextStep),
      sellingStrategy,
      repOpportunityStrategy,
      categoryIntelligence,
      ladderPreset,
      ladderEnablement,
      ladderStyle: ladderPreset.ladderStyle || "performance",
      presetKey,
      registryKey: registry?.key || "",
    };
  }

  const featuredProducts = mergeFeaturedProductsSupplement(
    mergeFeaturedProductsSupplement(
      registryFeatured.length ? registryFeatured : ladderFeatured,
      presetKey === "hdEngine" ? HD_ENGINE_PROGRAM_ANCHORS : [],
      14
    ),
    props.featuredProductsSupplement,
    14
  );

  return {
    categoryTitle: registryTitle || cleanCategoryDisplayText(program.categoryTitle),
    categorySubtitle: registrySubtitle || cleanCategoryDisplayText(program.categorySubtitle),
    opportunitySummary: registrySummary || cleanCategoryDisplayText(program.opportunitySummary),
    keyBenefits: registryKeyBenefits.length ? registryKeyBenefits : program.keyBenefits,
    idealCustomers: registry
      ? idealCustomersFromRegistry(registry, mergeUniqueStrings(program.idealCustomers, props.idealCustomers, 8))
      : mergeUniqueStrings(program.idealCustomers, props.idealCustomers, 8),
    applications: registryApplications.length
      ? mergeUniqueStrings(registryApplications, mergeUniqueStrings(program.applications, props.applications, 8), 8)
      : mergeUniqueStrings(program.applications, props.applications, 8),
    featuredProducts,
    crossSell: normalizeCrossSellItems(
      registry ? crossSellFallback : props.crossSell,
      registry ? props.crossSell : crossSellFallback
    ),
    repTalkTrack: mergeUniqueStrings(registryRepTalk, filterRegistrySupplementLines(presetKey, props.repTalkTrack), 6).map(
      cleanCategoryDisplayText
    ),
    discoveryQuestions: mergeUniqueStrings(
      registryDiscovery,
      filterRegistrySupplementLines(presetKey, props.discoveryQuestions),
      6
    ),
    cautions: mergeUniqueStrings(registryCautions, mergeUniqueStrings(program.cautions, props.cautions, 6), 6).map(
      cleanCategoryDisplayText
    ),
    recommendedNextStep: cleanCategoryDisplayText(program.recommendedNextStep),
    sellingStrategy,
    repOpportunityStrategy,
    categoryIntelligence,
    ladderPreset,
    ladderEnablement,
    ladderStyle: ladderPreset.ladderStyle || "performance",
    presetKey,
    registryKey: registry?.key || "",
  };
}

function inferLadderProductVariant(name) {
  const n = String(name || "").toLowerCase();
  if (/nano|calcium sulfonate|lithium complex/.test(n)) return "grease-nano";
  if (/moly tac|ultra tac|red tac|hd tac|grease|poly tac/.test(n)) return "grease-tube";
  if (/food[- ]?grade|nsf|h1/.test(n)) return "drum-food";
  if (/enviro|bio|eal|biodegradable|hees|hfdu/.test(n)) return "drum-eco";
  if (/agrimax|trans.?drive|zinc.?free/.test(n)) return "drum-agri";
  if (/coolant|antifreeze/.test(n)) return "drum-coolant";
  if (/engine|ck-4|ck4|fa-4|motor oil|15w-40|5w-40/.test(n)) return "engine-pail";
  if (/turbine|circulating|gear/.test(n)) return "drum-circulating";
  if (/wet brake|tractor/.test(n)) return "drum-tractor";
  if (/xvi|synthetic/.test(n)) return "drum-premium";
  if (/multi.?viscosity|mv /.test(n)) return "drum-mv";
  return "drum";
}

function normalizeTierProductImageEntry(item, fallbackName) {
  if (typeof item === "string") {
    const name = item.trim() || fallbackName;
    return name ? { name, label: "", imageUrl: "", imageFocus: "50% 42%", variant: inferLadderProductVariant(name) } : null;
  }
  if (!item || typeof item !== "object") return null;
  const name = String(item.name ?? item.title ?? fallbackName ?? "").trim();
  if (!name) return null;
  let imageUrl = String(item.imageUrl ?? item.url ?? item.src ?? "").trim();
  if (isLadderLineupStripImage(imageUrl)) imageUrl = "";
  return {
    name: cleanCategoryDisplayText(name),
    label: cleanCategoryDisplayText(String(item.label ?? "").trim()),
    imageUrl,
    imageFocus: String(item.imageFocus ?? item.objectPosition ?? "50% 42%").trim(),
    variant: String(item.variant || inferLadderProductVariant(name)).trim() || "drum",
  };
}

function normalizeTierProductImages(rawImages, productNames, specList) {
  const out = [];
  const spec = Array.isArray(specList) ? specList : [];
  const raw = Array.isArray(rawImages) && rawImages.length ? rawImages : spec;
  for (let i = 0; i < raw.length && out.length < 3; i++) {
    const entry = normalizeTierProductImageEntry(raw[i], productNames[i]);
    if (entry) out.push(entry);
  }
  if (!out.length) {
    for (let i = 0; i < productNames.length && out.length < 3; i++) {
      const name = String(productNames[i] || "").trim();
      if (!name) continue;
      const specHit = spec.find((s) => String(s?.name || "").toLowerCase() === name.toLowerCase());
      const entry = normalizeTierProductImageEntry(specHit || { name }, name);
      if (entry) out.push(entry);
    }
  }
  return out;
}

function enrichTierWithProductImages(tier, presetKey, fallbackTier) {
  const tierId = String(tier.tier || "").toLowerCase();
  const specList = LADDER_TIER_PRODUCT_IMAGE_SPECS[presetKey]?.[tierId] || [];
  const products = Array.isArray(tier.products) && tier.products.length ? [...tier.products] : [...(fallbackTier?.products || [])];
  const productImages = normalizeTierProductImages(
    tier.productImages ?? fallbackTier?.productImages,
    products,
    specList
  );
  return {
    ...tier,
    products,
    productImages,
  };
}

function normalizeLadderTier(item, fallbackLabel, fallbackTier, presetKey) {
  if (!item || typeof item !== "object") {
    const base = {
      tier: fallbackLabel.toLowerCase(),
      label: fallbackLabel,
      positioning: "",
      products: [],
      productImages: [],
    };
    return presetKey ? enrichTierWithProductImages(base, presetKey, fallbackTier) : base;
  }
  const tier = String(item.tier || fallbackLabel).toLowerCase();
  const label = String(item.label ?? fallbackLabel).trim().toUpperCase() || fallbackLabel;
  const positioning = String(item.positioning ?? item.sub ?? item.desc ?? "").trim();
  const products = [];
  const rawProducts = item.products ?? item.skus ?? item.items;
  if (Array.isArray(rawProducts)) {
    for (const p of rawProducts) {
      const name = typeof p === "object" ? String(p.name ?? p.title ?? "").trim() : String(p ?? "").trim();
      if (name) products.push(name);
    }
  }
  const partial = {
    tier,
    label,
    positioning,
    products: products.slice(0, 4),
    productImages: item.productImages,
  };
  if (!partial.products.length && fallbackTier?.products?.length) {
    partial.products = [...fallbackTier.products];
  }
  if (!partial.positioning && fallbackTier?.positioning) {
    partial.positioning = fallbackTier.positioning;
  }
  return presetKey ? enrichTierWithProductImages(partial, presetKey, fallbackTier) : partial;
}

function normalizeProductLadder(value, presetKey, ladderPresetOverride) {
  const key = CATEGORY_LADDER_PRESETS[presetKey] ? presetKey : "hydraulic";
  const basePreset = ladderPresetOverride || CATEGORY_LADDER_PRESETS[key];
  const preset = applyLadderPresetTierRules(basePreset, key);
  const mapPresetTier = (t) => enrichTierWithProductImages({ ...t, products: [...t.products] }, key, t);
  if (!value || typeof value !== "object") {
    return {
      categoryKey: preset.categoryKey,
      ladderStyle: preset.ladderStyle || "performance",
      emphasis: [...preset.emphasis],
      tiers: preset.tiers.map(mapPresetTier),
    };
  }
  const emphasis = pickList(value.emphasis ?? value.highlights, preset.emphasis).slice(0, 6);
  const tiersIn = Array.isArray(value.tiers) ? value.tiers : [];
  const tiers = LADDER_TIER_ORDER.map((tierId, i) => {
    const fallback = preset.tiers[i] || preset.tiers[0];
    const match =
      tiersIn.find((t) => String(t?.tier || t?.label || "").toLowerCase() === tierId) ||
      tiersIn[i];
    return normalizeLadderTier(match, fallback.label, fallback, key);
  });
  return {
    categoryKey: String(value.categoryKey || preset.categoryKey || key),
    ladderStyle: String(value.ladderStyle || preset.ladderStyle || "performance"),
    emphasis: emphasis.length ? emphasis : preset.emphasis,
    tiers,
  };
}

function normalizePdsLinks(value) {
  const out = [];
  for (const item of Array.isArray(value) ? value : []) {
    if (item && typeof item === "object") {
      const href = String(item.href ?? item.url ?? "").trim();
      const label = String(item.label ?? item.title ?? item.name ?? "Open PDS").trim();
      if (isPublicPdsPdfHref(href)) out.push({ href, label });
    } else {
      const href = String(item ?? "").trim();
      if (isPublicPdsPdfHref(href)) out.push({ href, label: "Open PDS" });
    }
    if (out.length >= 4) break;
  }
  return out;
}

function sanitizeLabel(item) {
  if (item == null) return "";
  const s =
    typeof item === "object"
      ? String(item.label ?? item.name ?? item.title ?? "").trim()
      : String(item).trim();
  if (!s) return "";
  if (/^(overlay-|canonical-|pds-|se-|pkg-)/i.test(s)) return "";
  if (/^[a-z0-9_-]{14,}$/i.test(s) && !/\s/.test(s)) return "";
  return s;
}

function BravingTagline() {
  return (
    <p
      data-braving-tagline="true"
      style={{
        margin: 0,
        width: "100%",
        fontSize: "clamp(18px, 2.35vw, 30px)",
        fontWeight: 900,
        letterSpacing: "0.14em",
        lineHeight: 1.18,
        textTransform: "uppercase",
        textAlign: "center",
        background: `linear-gradient(92deg, ${BRAND.headerNavy} 0%, ${BRAND.navyMid} 38%, ${BRAND.orange} 78%, #c2410c 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      BRAVING THE FORCE OF MOVEMENT
    </p>
  );
}

function CardHeader({ title, subtitle }) {
  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
        padding: subtitle ? "12px 18px 14px" : "14px 18px",
        borderRadius: "10px 10px 0 0",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: "0.14em",
          color: BRAND.white,
          textTransform: "uppercase",
        }}
      >
        {title}
      </p>
      {subtitle ? (
        <p
          style={{
            margin: "6px 0 0",
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.88)",
            textTransform: "none",
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function FlyerCard({ title, subtitle, children }) {
  return (
    <section
      style={{
        minWidth: 0,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(203, 213, 225, 0.9)",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.09)",
        background: BRAND.white,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader title={title} subtitle={subtitle} />
      <div style={{ padding: "20px 20px 22px", flex: 1 }}>{children}</div>
    </section>
  );
}

function CheckBullets({ items, max = 5, cautionStyle = false }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
      {list.map((line, i) => (
        <li
          key={`chk-${i}`}
          style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.45, color: "#334155", fontWeight: 600 }}
        >
          <span
            style={{
              color: cautionStyle && i === 0 ? "#dc2626" : BRAND.orange,
              fontWeight: 900,
              flexShrink: 0,
            }}
            aria-hidden
          >
            {cautionStyle && i === 0 ? "!" : "\u2713"}
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function QuestionList({ items, max = 5 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
      {list.map((line, i) => (
        <li
          key={`q-${i}`}
          style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.45, color: "#334155", fontWeight: 600 }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: BRAND.navy,
              color: BRAND.white,
              fontSize: 12,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            aria-hidden
          >
            ?
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function OpportunityIconSvg({ iconKey }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.32)";
  const k = String(iconKey || "expansion");
  const s = 44;
  if (k === "consolidation") {
    return (
      <svg width={s} height={s} viewBox="0 0 44 44" fill="none" aria-hidden>
        <path d="M10 30h24M14 22h16M18 14h8" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="32" cy="12" r="4" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "uptime") {
    return (
      <svg width={s} height={s} viewBox="0 0 44 44" fill="none" aria-hidden>
        <path d="M10 32l8-14 6 9 10-16 8 13" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (k === "downtime") {
    return (
      <svg width={s} height={s} viewBox="0 0 44 44" fill="none" aria-hidden>
        <circle cx="22" cy="24" r="11" stroke={stroke} strokeWidth="2" />
        <path d="M22 14v10l7 5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "mix") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="8" y="10" width="10" height="10" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <rect x="22" y="10" width="10" height="10" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <rect x="15" y="24" width="10" height="10" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "retention") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path
          d="M20 8l12 5v10c0 7-5 12-12 14-7-2-12-7-12-14V13l12-5z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.8"
        />
        <path d="M15 20l3 3 7-8" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 44 44" fill="none" aria-hidden>
      <circle cx="22" cy="22" r="13" fill={fill} stroke={stroke} strokeWidth="1.8" />
      <path d="M14 26l6-10 4 7 8-12 6 9" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OpportunityValueCard({ tile, isLast }) {
  return (
    <article
      style={{
        padding: "26px 16px 28px",
        textAlign: "center",
        borderRight: isLast ? "none" : "1px solid rgba(226, 232, 240, 0.95)",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          margin: "0 auto",
          borderRadius: 16,
          background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 55%, #1e40af 100%)`,
          border: "2px solid rgba(234, 88, 12, 0.55)",
          boxShadow: "0 12px 28px rgba(15, 23, 42, 0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden
      >
        <OpportunityIconSvg iconKey={tile.iconKey} />
      </div>
      <p
        style={{
          margin: "14px 0 0",
          fontSize: 12,
          fontWeight: 900,
          color: BRAND.headerNavy,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1.2,
        }}
      >
        {tile.label}
      </p>
      {tile.sub ? (
        <p style={{ margin: "8px 0 0", fontSize: 11, fontWeight: 600, color: "#64748b", lineHeight: 1.45 }}>
          {tile.sub}
        </p>
      ) : null}
    </article>
  );
}

function productLineIndexLabel(index) {
  return String(index + 1).padStart(2, "0");
}

function LadderTierIcon({ tier }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.28)";
  const s = 36;
  const t = String(tier || "good").toLowerCase();
  if (t === "better") {
    return (
      <svg width={s} height={s} viewBox="0 0 36 36" fill="none" aria-hidden>
        <path d="M8 24l6-10 4 7 8-12 6 9" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (t === "best") {
    return (
      <svg width={s} height={s} viewBox="0 0 36 36" fill="none" aria-hidden>
        <path
          d="M18 6l4 8h9l-7 6 3 9-9-6-9 6 3-7-6h9l4-8z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (t === "ultimate") {
    return (
      <svg width={s} height={s} viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="10" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <path d="M12 18h12M18 12v12" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 36 36" fill="none" aria-hidden>
      <rect x="8" y="12" width="20" height="12" rx="3" fill={fill} stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

function ladderTierVisual(tierIndex) {
  const palettes = [
    {
      bg: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      border: "rgba(148, 163, 184, 0.45)",
      accent: BRAND.slate,
      imageMaxH: 52,
      imageScale: 0.88,
      columnMinH: 280,
      boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
      slotBg: "rgba(255,255,255,0.95)",
    },
    {
      bg: "linear-gradient(180deg, #fffbeb 0%, #fff7ed 100%)",
      border: "rgba(234, 88, 12, 0.42)",
      accent: BRAND.orange,
      imageMaxH: 62,
      imageScale: 0.94,
      columnMinH: 296,
      boxShadow: "0 8px 22px rgba(234, 88, 12, 0.12)",
      slotBg: "rgba(255,255,255,0.92)",
    },
    {
      bg: "linear-gradient(165deg, #eff6ff 0%, #ffffff 55%)",
      border: "rgba(30, 64, 175, 0.45)",
      accent: BRAND.navyMid,
      imageMaxH: 74,
      imageScale: 1,
      columnMinH: 312,
      boxShadow: "0 12px 28px rgba(30, 58, 138, 0.14)",
      slotBg: "rgba(255,255,255,0.94)",
    },
    {
      bg: `linear-gradient(165deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 55%, #1e3a8a 100%)`,
      border: BRAND.orange,
      accent: BRAND.orangeLight,
      lightText: true,
      imageMaxH: 96,
      imageScale: 1.05,
      columnMinH: 352,
      boxShadow: "0 22px 48px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(251, 146, 60, 0.35)",
      slotBg: "rgba(255,255,255,0.08)",
    },
  ];
  return palettes[Math.min(tierIndex, 3)];
}

function LadderProductSilhouette({ variant, size = 48, premium = false, light = false }) {
  const stroke = light ? "rgba(255,255,255,0.55)" : "rgba(30, 58, 138, 0.35)";
  const fill = light ? "rgba(255,255,255,0.14)" : premium ? "rgba(234, 88, 12, 0.12)" : "rgba(241, 245, 249, 0.95)";
  const accent = premium ? BRAND.orange : light ? BRAND.orangeLight : BRAND.navyMid;
  const isGrease = /grease/.test(variant);
  const isEngine = /engine/.test(variant);
  const isEco = /eco|food|agri|coolant/.test(variant);
  if (isGrease) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
        <rect x="14" y="8" width="20" height="32" rx="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <rect x="17" y="4" width="14" height="8" rx="2" fill={accent} opacity={premium ? 0.9 : 0.55} />
        <ellipse cx="24" cy="38" rx="8" ry="3" fill={accent} opacity="0.25" />
      </svg>
    );
  }
  if (isEngine) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M12 14h24l4 8v16H8V22l4-8z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect x="16" y="10" width="16" height="6" rx="2" fill={accent} opacity={premium ? 0.85 : 0.5} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <ellipse cx="24" cy="40" rx="14" ry="4" fill={accent} opacity="0.18" />
      <path
        d="M14 12h20c2 0 4 2 4 4v22c0 2-2 4-4 4H14c-2 0-4-2-4-4V16c0-2 2-4 4-4z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <rect x="17" y="8" width="14" height="6" rx="2" fill={accent} opacity={premium ? 0.9 : 0.55} />
      {isEco ? (
        <circle cx="36" cy="14" r="5" fill="#059669" opacity="0.75" stroke={light ? "#fff" : "#ecfdf5"} strokeWidth="1" />
      ) : null}
    </svg>
  );
}

function LadderTierProductSlot({ entry, tierIndex, lightText, tierId, slotIndex, onUploadRequest }) {
  const visual = ladderTierVisual(tierIndex);
  const isUltimate = tierIndex === 3;
  const [imgFailed, setImgFailed] = React.useState(false);
  const imageUrl = String(entry?.imageUrl || "").trim();
  const showPhoto = imageUrl && !imgFailed && !isLadderLineupStripImage(imageUrl);
  const siloSize = Math.round(visual.imageMaxH * 0.55);
  const uploadEnabled = typeof onUploadRequest === "function";
  const displayName = cleanCategoryDisplayText(entry?.name);
  const displayLabel = cleanCategoryDisplayText(entry?.label);
  return (
    <div style={{ borderRadius: 10,
        overflow: "hidden",
        background: visual.slotBg,
        border: lightText ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(30, 58, 138, 0.14)",
        boxShadow: isUltimate ? "0 6px 16px rgba(0,0,0,0.2)" : "0 2px 8px rgba(15, 23, 42, 0.06)",
      }}
    >
      {uploadEnabled ? (
        <button
          type="button"
          aria-label="Upload product image"
          onClick={() => onUploadRequest(tierId, slotIndex)}
          style={{
            height: visual.imageMaxH,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            width: "100%",
            background: lightText
              ? "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)"
              : "linear-gradient(180deg, #f1f5f9 0%, #ffffff 100%)",
            padding: "6px 8px 4px",
            transform: `scale(${visual.imageScale})`,
            transformOrigin: "bottom center",
            border: "none",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          {showPhoto ? (
            <img
              src={imageUrl}
              alt=""
              decoding="async"
              onError={() => setImgFailed(true)}
              style={{
                maxHeight: visual.imageMaxH - 8,
                maxWidth: "100%",
                width: "auto",
                objectFit: "contain",
                objectPosition: entry.imageFocus || "50% 42%",
                filter: isUltimate
                  ? "drop-shadow(0 8px 14px rgba(0,0,0,0.35))"
                  : "drop-shadow(0 4px 8px rgba(15,23,42,0.12))",
              }}
            />
          ) : (
            <>
              <LadderProductSilhouette
                variant={entry.variant || "drum"}
                size={siloSize}
                premium={tierIndex >= 2}
                light={lightText}
              />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: lightText ? "rgba(255,255,255,0.75)" : "#64748b",
                  border: lightText ? "1px dashed rgba(255,255,255,0.35)" : "1px dashed rgba(234, 88, 12, 0.45)",
                  borderRadius: 6,
                  padding: "4px 8px",
                  background: lightText ? "rgba(255,255,255,0.06)" : "rgba(255, 247, 237, 0.65)",
                }}
              >
                Upload product image
              </span>
            </>
          )}
        </button>
      ) : (
        <div
          style={{
            height: visual.imageMaxH,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            background: lightText
              ? "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)"
              : "linear-gradient(180deg, #f1f5f9 0%, #ffffff 100%)",
            padding: "6px 8px 4px",
            transform: `scale(${visual.imageScale})`,
            transformOrigin: "bottom center",
          }}
        >
          {showPhoto ? (
            <img
              src={imageUrl}
              alt=""
              decoding="async"
              onError={() => setImgFailed(true)}
              style={{
                maxHeight: visual.imageMaxH - 8,
                maxWidth: "100%",
                width: "auto",
                objectFit: "contain",
                objectPosition: entry.imageFocus || "50% 42%",
                filter: isUltimate
                  ? "drop-shadow(0 8px 14px rgba(0,0,0,0.35))"
                  : "drop-shadow(0 4px 8px rgba(15,23,42,0.12))",
              }}
            />
          ) : (
            <LadderProductSilhouette
              variant={entry.variant || "drum"}
              size={siloSize}
              premium={tierIndex >= 2}
              light={lightText}
            />
          )}
        </div>
      )}
      <div style={{ padding: "8px 10px 10px" }}>
        {displayLabel ? (
          <p
            style={{
              margin: "0 0 4px",
              fontSize: 9,
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: lightText ? BRAND.orangeLight : BRAND.orange,
            }}
          >
            {displayLabel}
          </p>
        ) : null}
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 800,
            lineHeight: 1.35,
            color: lightText ? BRAND.white : BRAND.headerNavy,
          }}
        >
          {displayName}
        </p>
      </div>
    </div>
  );
}

function LadderTierProductGallery({ productImages, tierIndex, lightText, tierId, onUploadRequest }) {
  const items = Array.isArray(productImages) ? productImages.slice(0, 3) : [];
  if (!items.length) return null;
  return (
    <div style={{ display: "grid", gap: 10, marginBottom: 4 }}>
      {items.map((entry, slotIndex) => (
        <LadderTierProductSlot
          key={`${tierId}-${entry.name}-${slotIndex}`}
          entry={entry}
          tierIndex={tierIndex}
          lightText={lightText}
          tierId={tierId}
          slotIndex={slotIndex}
          onUploadRequest={onUploadRequest}
        />
      ))}
    </div>
  );
}

function LadderTierColumn({ tier, tierIndex, onLadderTierProductImageUploadRequest }) {
  const visual = ladderTierVisual(tierIndex);
  const isUltimate = tierIndex === 3;
  const productImages =
    Array.isArray(tier.productImages) && tier.productImages.length
      ? tier.productImages
      : tier.products.map((name) => ({ name, variant: inferLadderProductVariant(name) }));
  return (
    <article
      data-ladder-tier={tier.tier}
      style={{
        padding: isUltimate ? "22px 14px 20px" : "18px 12px 16px",
        borderRadius: 14,
        background: visual.bg,
        border: `2px solid ${visual.border}`,
        boxShadow: visual.boxShadow,
        minHeight: visual.columnMinH,
        display: "flex",
        flexDirection: "column",
        transform: isUltimate ? "translateY(-8px) scale(1.02)" : tierIndex === 2 ? "translateY(-2px)" : "none",
        zIndex: isUltimate ? 2 : tierIndex === 2 ? 1 : 0,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: isUltimate
              ? "rgba(255,255,255,0.12)"
              : `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
            border: `2px solid ${isUltimate ? BRAND.orangeLight : "rgba(234, 88, 12, 0.45)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          aria-hidden
        >
          <LadderTierIcon tier={tier.tier} />
        </span>
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: isUltimate ? 14 : 12,
              fontWeight: 900,
              letterSpacing: "0.14em",
              color: isUltimate ? BRAND.orangeLight : visual.accent,
            }}
          >
            {cleanCategoryDisplayText(tier.label)}
          </p>
          {tier.positioning ? (
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 10,
                fontWeight: 600,
                lineHeight: 1.4,
                color: isUltimate ? "rgba(255,255,255,0.85)" : "#64748b",
              }}
            >
              {cleanCategoryDisplayText(tier.positioning)}
            </p>
          ) : null}
        </div>
      </div>
      <LadderTierProductGallery
        productImages={productImages}
        tierIndex={tierIndex}
        lightText={visual.lightText}
        tierId={tier.tier}
        onUploadRequest={onLadderTierProductImageUploadRequest}
      />
    </article>
  );
}

function IntelligenceBulletList({ items, accentColor }) {
  if (!items?.length) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
      {items.map((line) => (
        <li
          key={line}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#475569",
            lineHeight: 1.45,
            paddingLeft: 12,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 8,
              width: 5,
              height: 5,
              borderRadius: 999,
              background: accentColor,
            }}
            aria-hidden
          />
          {line}
        </li>
      ))}
    </ul>
  );
}

function CategoryIntelligencePlaybookSection({ playbook }) {
  if (!playbook || typeof playbook !== "object") return null;
  const intelSections = Array.isArray(playbook.sections) ? playbook.sections : [];
  if (!intelSections.length) return null;
  const intelColors = [BRAND.navyMid, "#0369a1", "#047857", "#c2410c", "#5b21b6"];
  return (
    <section
      data-category-intelligence-playbook="true"
      style={{
        padding: "32px 40px 36px",
        background: `linear-gradient(180deg, #f1f5f9 0%, ${BRAND.white} 42%)`,
        borderBottom: "1px solid rgba(226,232,240,0.95)",
        display: "grid",
        gap: 22,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
        <p
          style={{
            margin: 0,
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: "0.2em",
            color: BRAND.orange,
            textTransform: "uppercase",
          }}
        >
          Dealer winning playbook
        </p>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: "clamp(22px, 2.8vw, 30px)",
            fontWeight: 900,
            color: BRAND.headerNavy,
            lineHeight: 1.12,
          }}
        >
          {playbook.playbookTitle || "DEALER WINNING PLAYBOOK"}
        </p>
        {Array.isArray(playbook.klondikeGuarantee) && playbook.klondikeGuarantee.length ? (
          <p
            style={{
              margin: "12px auto 0",
              fontSize: 13,
              fontWeight: 800,
              color: BRAND.orange,
              lineHeight: 1.4,
              maxWidth: 640,
            }}
          >
            {playbook.klondikeGuarantee[0]}
          </p>
        ) : null}
        {playbook.playbookIntro ? (
          <p
            style={{
              margin: "10px auto 0",
              fontSize: 15,
              fontWeight: 700,
              color: "#475569",
              lineHeight: 1.45,
              maxWidth: 640,
            }}
          >
            {playbook.playbookIntro}
          </p>
        ) : null}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 14,
        }}
      >
        {intelSections.map((section, index) => (
          <article
            key={section.id || section.title}
            style={{
              padding: "18px 18px 16px",
              borderRadius: 12,
              background: BRAND.white,
              border: "1px solid rgba(30, 58, 138, 0.14)",
              borderLeft: `4px solid ${intelColors[index % intelColors.length]}`,
              boxShadow: "0 8px 22px rgba(15, 23, 42, 0.06)",
              gridColumn:
                section.id === "whatToSay" ||
                section.id === "klondikeWins" ||
                section.id === "oemWhatToAsk" ||
                section.id === "oemSpecCallouts"
                  ? "1 / -1"
                  : undefined,
            }}
          >
            <p
              style={{
                margin: "0 0 12px",
                fontSize: 12,
                fontWeight: 900,
                color: BRAND.headerNavy,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {section.title}
            </p>
            <IntelligenceBulletList items={section.items} accentColor={intelColors[index % intelColors.length]} />
          </article>
        ))}
      </div>
      {playbook.oemSpecVerifyLine ? (
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 700,
            color: "#64748b",
            lineHeight: 1.45,
            textAlign: "center",
            maxWidth: 720,
            marginInline: "auto",
          }}
        >
          {playbook.oemSpecVerifyLine}
        </p>
      ) : null}
    </section>
  );
}

function CategoryPerformanceLadderEnablementSection({ presetKey, enablement }) {
  const block = enablement || PERFORMANCE_LADDER_ENABLEMENT[presetKey];
  if (!block) return null;
  const bullets = coerceStringLines(block.bullets, [], 5);
  if (!bullets.length) return null;
  return (
    <section
      data-category-ladder-enablement="true"
      style={{
        padding: "24px 40px 0",
        background: `linear-gradient(180deg, #f8fafc 0%, ${BRAND.white} 100%)`,
      }}
    >
      <article
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "18px 22px",
          borderRadius: 12,
          background: BRAND.white,
          border: "1px solid rgba(30, 58, 138, 0.14)",
          borderLeft: `4px solid ${BRAND.orange}`,
          boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 900, color: BRAND.headerNavy }}>{block.title}</p>
        {block.intro ? (
          <p style={{ margin: "8px 0 0", fontSize: 12, fontWeight: 600, color: "#64748b", lineHeight: 1.45 }}>{block.intro}</p>
        ) : null}
        <div style={{ marginTop: 12 }}>
          <IntelligenceBulletList items={bullets} accentColor={BRAND.orange} />
        </div>
      </article>
    </section>
  );
}


function CategoryPerformanceLadderSection({ ladder, onLadderTierProductImageUploadRequest }) {
  if (!ladder?.tiers?.length || ladder?.ladderStyle === "program") return null;
  return (
    <section
      data-category-ladder-visual="true"
      style={{
        padding: "32px 40px 36px",
        background: `linear-gradient(180deg, #f1f5f9 0%, ${BRAND.white} 42%)`,
        borderBottom: "1px solid rgba(226,232,240,0.95)",
      }}
    >
      <div style={{ marginBottom: 20, textAlign: "center", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
        <p
          style={{
            margin: 0,
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: "0.2em",
            color: BRAND.orange,
            textTransform: "uppercase",
          }}
        >
          {ladderSectionEyebrow(ladder)}
        </p>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: "clamp(22px, 2.8vw, 30px)",
            fontWeight: 900,
            color: BRAND.headerNavy,
            lineHeight: 1.12,
          }}
        >
          {ladderHeadlineTitle(ladder)}
        </p>
        <p
          style={{
            margin: "6px 0 0",
            fontSize: "clamp(14px, 1.8vw, 18px)",
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: BRAND.navyMid,
          }}
        >
          {ladderTierLabelLine(ladder)}
        </p>
        <p
          style={{
            margin: "10px auto 0",
            fontSize: 14,
            fontWeight: 600,
            color: "#475569",
            lineHeight: 1.5,
            maxWidth: 580,
          }}
        >
          {ladderSectionDescription(ladder)}
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 12,
          alignItems: "end",
        }}
      >
        {ladder.tiers.slice(0, 4).map((tier, i) => (
          <LadderTierColumn
            key={tier.tier}
            tier={tier}
            tierIndex={i}
            onLadderTierProductImageUploadRequest={onLadderTierProductImageUploadRequest}
          />
        ))}
      </div>
    </section>
  );
}

function FeaturedProductCard({ product, index, onUploadRequest }) {
  const [imgFailed, setImgFailed] = React.useState(false);
  const imageUrl = String(product.imageUrl || "").trim();
  const hasImage = Boolean(imageUrl) && !imgFailed && !isLadderLineupStripImage(imageUrl);
  const uploadEnabled = typeof onUploadRequest === "function";
  const lineLabel = productLineIndexLabel(index);
  const displayName = cleanCategoryDisplayText(product.name);
  const displayRole = cleanCategoryDisplayText(product.role);
  const mediaShellStyle = {
    height: 132,
    width: "100%",
    background: hasImage
      ? "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)"
      : `linear-gradient(145deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 70%, #1e40af 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: hasImage ? 12 : 18,
  };
  const mediaInner = hasImage ? (
    <img
      src={imageUrl}
      alt={displayName}
      decoding="async"
      onError={() => setImgFailed(true)}
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
    />
  ) : (
    <div style={{ display: "grid", gap: 8, justifyItems: "center", padding: "0 8px" }}>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          fontWeight: 800,
          color: "rgba(255,255,255,0.92)",
          textAlign: "center",
          lineHeight: 1.35,
        }}
      >
        {displayName}
      </p>
      {uploadEnabled ? (
        <span
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.8)",
            border: "1px dashed rgba(255,255,255,0.35)",
            borderRadius: 6,
            padding: "4px 8px",
          }}
        >
          Upload product image
        </span>
      ) : null}
    </div>
  );
  return (
    <article
      style={{
        borderRadius: 14,
        overflow: "hidden",
        background: BRAND.white,
        border: "1px solid rgba(30, 58, 138, 0.22)",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.1)",
        display: "flex",
        flexDirection: "column",
        minHeight: 220,
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 2,
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: "0.12em",
          color: BRAND.orangeLight,
          background: "rgba(15, 23, 42, 0.72)",
          padding: "4px 8px",
          borderRadius: 6,
        }}
        aria-hidden
      >
        {lineLabel}
      </span>
      {uploadEnabled ? (
        <button
          type="button"
          aria-label="Upload product image"
          onClick={() => onUploadRequest("featured", index)}
          style={{ ...mediaShellStyle, border: "none", cursor: "pointer", font: "inherit" }}
        >
          {mediaInner}
        </button>
      ) : (
        <div style={mediaShellStyle}>{mediaInner}</div>
      )}
      <div
        style={{
          padding: "16px 16px 18px",
          flex: 1,
          background: "#f8fafc",
          borderTop: `3px solid ${BRAND.orange}`,
        }}
      >
        <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.3 }}>
          {displayName}
        </p>
        {displayRole ? (
          <p style={{ margin: "8px 0 0", fontSize: 12, fontWeight: 600, color: "#64748b", lineHeight: 1.45 }}>
            {displayRole}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function ProductLineupSection({ products, onProductImageUploadRequest }) {
  const lineup = products.slice(0, 6);
  if (!lineup.length) return null;
  const cols = lineup.length <= 3 ? lineup.length : lineup.length <= 4 ? 2 : 3;
  const onFeaturedUpload =
    typeof onProductImageUploadRequest === "function"
      ? (slotIndex) => onProductImageUploadRequest("featured", slotIndex)
      : undefined;
  return (
    <section
      style={{
        padding: "36px 44px 40px",
        background: "linear-gradient(180deg, #f1f5f9 0%, #ffffff 55%)",
        borderTop: "1px solid rgba(226,232,240,0.95)",
        borderBottom: "1px solid rgba(226,232,240,0.95)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 22,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.16em",
              color: BRAND.orange,
              textTransform: "uppercase",
            }}
          >
            Program reference lineup
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 20, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.2 }}>
            Ecosystem SKUs & progression anchors
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#64748b", maxWidth: 340, lineHeight: 1.45 }}>
          {cleanCategoryDisplayText("Pair these with the performance ladder for GOOD ? BETTER ? BEST ? ULTIMATE upsell and category penetration.")}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 18 }}>
        {lineup.map((p, i) => (
          <FeaturedProductCard key={p.name} product={p} index={i} onUploadRequest={onFeaturedUpload} />
        ))}
      </div>
    </section>
  );
}

function HeroVisualPanel({ categoryImageUrl, featuredProducts, productCount }) {
  const categoryImg = String(categoryImageUrl || "").trim();
  const products = featuredProducts.slice(0, 6);
  const withImages = products.filter((p) => String(p.imageUrl || "").trim());

  if (categoryImg) {
    return (
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(251, 146, 60, 0.45)",
          boxShadow: "0 20px 48px rgba(0,0,0,0.35)",
          background: BRAND.white,
        }}
      >
        <img
          src={categoryImg}
          alt="Category"
          decoding="async"
          style={{ width: "100%", maxHeight: 280, objectFit: "cover", display: "block" }}
        />
        {withImages.length ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(withImages.length, 4)}, 1fr)`,
              gap: 8,
              padding: 10,
              background: BRAND.navyDeep,
            }}
          >
            {withImages.map((p) => (
              <img
                key={p.name}
                src={p.imageUrl}
                alt={p.name}
                decoding="async"
                style={{ width: "100%", height: 56, objectFit: "contain", background: "#fff", borderRadius: 6 }}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (withImages.length >= 2) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}
      >
        {withImages.slice(0, 4).map((p) => (
          <div
            key={p.name}
            style={{
              borderRadius: 12,
              padding: 12,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              textAlign: "center",
            }}
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              decoding="async"
              style={{
                width: "100%",
                height: 88,
                objectFit: "contain",
                background: "#fff",
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
            <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.9)", lineHeight: 1.25 }}>
              {p.name}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: 16,
        padding: "22px 20px 24px",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(251, 146, 60, 0.45)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: "0.16em",
          color: BRAND.orangeLight,
          textTransform: "uppercase",
        }}
      >
        System solution ecosystem
      </p>
      <p style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 800, color: "rgba(255,255,255,0.95)", lineHeight: 1.35 }}>
        {productCount} products ? application coverage ? companion categories
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: products.length <= 2 ? "1fr" : "repeat(2, 1fr)",
          gap: 10,
        }}
      >
        {products.map((p, i) => {
          const img = String(p.imageUrl || "").trim();
          return (
            <div
              key={p.name}
              style={{
                borderRadius: 10,
                padding: img ? 8 : "12px 10px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                minHeight: img ? 72 : 0,
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt={p.name}
                  decoding="async"
                  style={{
                    width: "100%",
                    height: 52,
                    objectFit: "contain",
                    background: "#fff",
                    borderRadius: 6,
                    marginBottom: 6,
                  }}
                />
              ) : null}
              <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.92)", lineHeight: 1.3 }}>
                <span style={{ color: BRAND.orangeMuted, marginRight: 6 }}>{productLineIndexLabel(i)}</span>
                {p.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PillGrid({ items, max = 8 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {list.map((line, i) => (
        <span
          key={`pill-${i}`}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 800,
            color: BRAND.navy,
            background: "linear-gradient(160deg, #f8fafc 0%, #ffffff 100%)",
            border: "1px solid rgba(30, 58, 138, 0.18)",
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}

function CustomerFitIconSvg({ label }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.24)";
  const t = String(label || "").toLowerCase();
  const s = 28;
  if (/mining|aggregate/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M6 24h20M10 18l4-8 4 6 6-10 4 8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (/agri|farm/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="14" r="5" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <path d="M8 26c2-6 6-8 8-8s6 2 8 8" stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (/construct|rental|earth/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="8" y="14" width="16" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <path d="M12 22v4h8v-4" stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (/fleet|municipal|transit|truck|yard|distributor/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="6" y="12" width="20" height="8" rx="2" stroke={stroke} strokeWidth="1.6" />
        <circle cx="11" cy="22" r="2.5" stroke={stroke} strokeWidth="1.4" />
        <circle cx="21" cy="22" r="2.5" stroke={stroke} strokeWidth="1.4" />
      </svg>
    );
  }
  if (/food/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M10 10h12v12H10z" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <path d="M14 14h4M14 18h4" stroke={stroke} strokeWidth="1.4" />
      </svg>
    );
  }
  if (/industrial|plant/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M8 24V14l6-4 4 3 6-5v16" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="9" fill={fill} stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

function CustomerFitTiles({ items, max = 6 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  const cols = list.length <= 4 ? 2 : 3;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
      {list.map((line, i) => (
        <article
          key={`cust-${i}`}
          style={{
            padding: "16px 12px",
            borderRadius: 12,
            background: BRAND.white,
            border: "1px solid rgba(30, 58, 138, 0.16)",
            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.06)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              margin: "0 auto",
              borderRadius: 12,
              background: `linear-gradient(145deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden
          >
            <CustomerFitIconSvg label={line} />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 900, color: BRAND.navy, lineHeight: 1.35 }}>
            {line}
          </p>
        </article>
      ))}
    </div>
  );
}

function SystemSolutionIconSvg({ iconKey }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.28)";
  const k = String(iconKey || "program");
  const s = 32;
  if (k === "grease") {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="8" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "gear") {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="7" stroke={stroke} strokeWidth="1.8" />
        <circle cx="16" cy="16" r="2.5" fill={fill} />
      </svg>
    );
  }
  if (k === "engine") {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="8" y="10" width="16" height="12" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "coolant") {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 6v20M12 10h8M12 22h8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M8 22h16M10 16h12M12 10h8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SystemSolutionCard({ item, index, onUploadRequest }) {
  const [imgFailed, setImgFailed] = React.useState(false);
  const imageUrl = String(item.imageUrl || "").trim();
  const hasImage = Boolean(imageUrl) && !imgFailed && !isLadderLineupStripImage(imageUrl);
  const uploadEnabled = typeof onUploadRequest === "function";
  return (
    <article
      style={{
        padding: "18px 16px",
        borderRadius: 12,
        background: BRAND.white,
        border: "1px solid rgba(30, 58, 138, 0.18)",
        borderLeft: `4px solid ${BRAND.orange}`,
        boxShadow: "0 8px 22px rgba(15, 23, 42, 0.08)",
        display: "grid",
        gridTemplateColumns: hasImage ? "72px 1fr" : "44px 1fr",
        gap: 12,
        alignItems: "center",
      }}
    >
      {uploadEnabled ? (
        <button
          type="button"
          aria-label="Upload program card image"
          onClick={() => onUploadRequest("ecosystem", index)}
          style={{
            width: hasImage ? 72 : 44,
            height: hasImage ? 72 : 44,
            borderRadius: 10,
            background: hasImage
              ? "#ffffff"
              : `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: hasImage ? "1px solid rgba(30, 58, 138, 0.14)" : "none",
            cursor: "pointer",
            padding: hasImage ? 4 : 0,
            font: "inherit",
          }}
        >
          {hasImage ? (
            <img
              src={imageUrl}
              alt=""
              decoding="async"
              onError={() => setImgFailed(true)}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          ) : (
            <SystemSolutionIconSvg iconKey={item.iconKey || crossSellIconKey(item.title)} />
          )}
        </button>
      ) : (
        <div
          style={{
            width: hasImage ? 72 : 44,
            height: hasImage ? 72 : 44,
            borderRadius: 10,
            background: hasImage
              ? "#ffffff"
              : `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: hasImage ? "1px solid rgba(30, 58, 138, 0.14)" : "none",
            padding: hasImage ? 4 : 0,
          }}
          aria-hidden
        >
          {hasImage ? (
            <img
              src={imageUrl}
              alt=""
              decoding="async"
              onError={() => setImgFailed(true)}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          ) : (
            <SystemSolutionIconSvg iconKey={item.iconKey || crossSellIconKey(item.title)} />
          )}
        </div>
      )}
      <div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.25 }}>
          {item.title}
        </p>
        {item.desc ? (
          <p style={{ margin: "6px 0 0", fontSize: 11, fontWeight: 600, color: "#64748b", lineHeight: 1.4 }}>
            {item.desc}
          </p>
        ) : null}
        {uploadEnabled && !hasImage ? (
          <p
            style={{
              margin: "8px 0 0",
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: BRAND.orange,
            }}
          >
            Upload product image
          </p>
        ) : null}
      </div>
    </article>
  );
}

function SystemSolutionHub({ items, max = 6, onProductImageUploadRequest }) {
  const list = items.slice(0, max);
  if (list.length < 2) return null;
  const cols = list.length <= 3 ? list.length : list.length === 4 ? 2 : 3;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 14 }}>
      {list.map((item, index) => (
        <SystemSolutionCard
          key={item.title}
          item={item}
          index={index}
          onUploadRequest={onProductImageUploadRequest}
        />
      ))}
    </div>
  );
}

function CategorySellingStrategySection({ strategy }) {
  const normalized = normalizeSellingStrategy(strategy);
  if (!normalized) return null;
  const blocks = [
    { title: "How reps position the category", items: normalized.positioning, color: BRAND.navyMid },
    { title: "Customer problems this solves", items: normalized.problemsSolved, color: "#047857" },
    { title: "Where to look for opportunity", items: normalized.opportunitySignals, color: "#c2410c" },
    { title: "Cross-sell path", items: normalized.crossSellPath, color: "#5b21b6" },
  ].filter((b) => b.items.length > 0);
  if (!blocks.length) return null;
  return (
    <section
      style={{
        padding: "28px 44px 32px",
        background: "#f8fafc",
        borderBottom: "1px solid rgba(226,232,240,0.95)",
        display: "grid",
        gap: 18,
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.16em",
            color: BRAND.orange,
            textTransform: "uppercase",
          }}
        >
          Category selling strategy
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 22, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.2 }}>
          {cleanCategoryDisplayText("Grow the program ? not a single SKU.")}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        {blocks.map((block) => (
          <article
            key={block.title}
            style={{
              padding: "16px 18px",
              borderRadius: 12,
              background: BRAND.white,
              border: "1px solid rgba(30, 58, 138, 0.14)",
              borderLeft: `4px solid ${block.color}`,
            }}
          >
            <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 900, color: BRAND.headerNavy }}>{block.title}</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
              {block.items.slice(0, 4).map((line) => (
                <li
                  key={line}
                  style={{ fontSize: 12, fontWeight: 600, color: "#475569", lineHeight: 1.45, paddingLeft: 12, position: "relative" }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 8,
                      width: 5,
                      height: 5,
                      borderRadius: 999,
                      background: block.color,
                    }}
                    aria-hidden
                  />
                  {cleanCategoryDisplayText(line)}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function CrossSellGrid({ items, max = 4 }) {
  const list = [];
  for (const item of Array.isArray(items) ? items : []) {
    const s = sanitizeLabel(item);
    if (s && !list.some((x) => x.toLowerCase() === s.toLowerCase())) list.push(s);
    if (list.length >= max) break;
  }
  if (list.length < 2) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
      {list.map((title) => (
        <article
          key={title}
          style={{
            padding: "14px",
            borderRadius: 10,
            borderTop: `3px solid ${BRAND.orange}`,
            background: "linear-gradient(155deg, #fff 0%, #f1f5f9 100%)",
            border: "1px solid rgba(30, 58, 138, 0.2)",
            fontSize: 13,
            fontWeight: 900,
            color: BRAND.navy,
            textAlign: "center",
          }}
        >
          {title}
        </article>
      ))}
    </div>
  );
}

export default function CategorySpotlightSellSheet(props) {
  const programFields = resolveCategoryProgramContent(props);
  const categoryTitle = programFields.categoryTitle;
  const categorySubtitle = programFields.categorySubtitle;
  const opportunitySummary = programFields.opportunitySummary;
  const categoryImageUrl = pickText(props.categoryImageUrl, DEMO_DEFAULTS.categoryImageUrl);
  const valueCards = normalizeValueCards(programFields.keyBenefits, DEMO_DEFAULTS.keyBenefits);
  const idealCustomers = pickList(programFields.idealCustomers, DEMO_DEFAULTS.idealCustomers);
  const applications = pickList(programFields.applications, DEMO_DEFAULTS.applications);
  const categoryUploads = normalizeUploadedCategoryProductImages(props.uploadedCategoryProductImages);
  const onCategoryProductImageUploadRequest = resolveCategoryProductImageUploadHandler(props);
  const featuredProducts = applyFeaturedLineupUploads(
    normalizeFeaturedProducts(programFields.featuredProducts, props.productImages ?? DEMO_DEFAULTS.productImages),
    categoryUploads
  );
  const { repTalkTrack, discoveryQuestions } = resolveRepTalkAndQuestions(
    programFields.repTalkTrack,
    programFields.discoveryQuestions,
    DEMO_DEFAULTS.repTalkTrack,
    DEMO_DEFAULTS.discoveryQuestions
  );
  const systemSolutionItems = applyEcosystemCardUploads(
    normalizeCrossSellItems(programFields.crossSell, DEMO_DEFAULTS.crossSell),
    categoryUploads
  );
  const cautions = pickList(programFields.cautions, DEMO_DEFAULTS.cautions);
  const recommendedNextStep = pickText(programFields.recommendedNextStep, DEMO_DEFAULTS.recommendedNextStep);
  const sellingStrategy = programFields.sellingStrategy;
  const categoryIntelligence = programFields.categoryIntelligence;
  const pdsLinks = normalizePdsLinks(props.pdsLinks ?? DEMO_DEFAULTS.pdsLinks);

  const stripCount = Math.min(Math.max(valueCards.length, 4), 6);
  const stripCards = valueCards.slice(0, stripCount);
  const ladderPresetKey = programFields.presetKey;
  const productLadder = applyUploadedCategoryProductImages(
    {
      ...normalizeProductLadder(
        props.productLadder ?? DEMO_DEFAULTS.productLadder,
        ladderPresetKey,
        programFields.ladderPreset
      ),
      ladderStyle: programFields.ladderStyle,
    },
    categoryUploads
  );
  const isProgramCategory = productLadder.ladderStyle === "program";
  const programProductCount = Math.max(
    featuredProducts.length,
    productLadder.tiers.reduce((n, t) => n + (t.products?.length || 0), 0),
    4
  );

  return (
    <article
      data-layout={CATEGORY_SPOTLIGHT_SELL_SHEET_LAYOUT_ID}
      data-category-ladder={productLadder.categoryKey}
      data-sell-sheet-title={categoryTitle.slice(0, 80)}
      style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        background: BRAND.white,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 28px 70px rgba(15, 23, 42, 0.16)",
        border: "1px solid rgba(203, 213, 225, 0.85)",
        fontFamily: '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
      }}
      aria-label="Category spotlight sell sheet"
    >
      <header style={{ padding: "26px 40px 20px", background: BRAND.white }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(160px, 0.9fr) minmax(0, 2.4fr)",
            alignItems: "center",
            gap: 28,
          }}
        >
          <img
            src={KLONDIKE_HEADER_LOGO_SRC}
            alt="Klondike Performance Lubricants"
            decoding="async"
            style={{ height: 88, width: "auto", maxWidth: 340, objectFit: "contain" }}
          />
          <BravingTagline />
        </div>
        <div
          style={{
            marginTop: 20,
            height: 5,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${BRAND.orange} 0%, ${BRAND.orangeLight} 58%, rgba(30,58,138,0.4) 100%)`,
          }}
          aria-hidden
        />
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(340px, 1fr)",
          minHeight: 520,
          background: `linear-gradient(125deg, ${BRAND.headerNavy} 0%, ${BRAND.navy} 40%, ${BRAND.navyMid} 100%)`,
          borderBottom: "1px solid rgba(226,232,240,0.95)",
        }}
      >
        <div style={{ padding: "40px 44px 44px", display: "grid", gap: 14, alignContent: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: "0.18em",
                padding: "6px 12px",
                borderRadius: 999,
                color: "#fff",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              CATEGORY PROGRAM
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.1em",
                padding: "6px 10px",
                borderRadius: 999,
                color: BRAND.orangeLight,
                background: "rgba(234, 88, 12, 0.2)",
                border: "1px solid rgba(251, 146, 60, 0.45)",
              }}
            >
              {programProductCount} SKU LINEUP
            </span>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 4.2vw, 52px)",
              fontWeight: 900,
              color: BRAND.white,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {categoryTitle}
          </h1>
          {categorySubtitle ? (
            <p style={{ margin: 0, fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 900, color: BRAND.orange, lineHeight: 1.25 }}>
              {categorySubtitle}
            </p>
          ) : null}
          {opportunitySummary ? (
            <p
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 600,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.62,
                maxWidth: 560,
              }}
            >
              {opportunitySummary}
            </p>
          ) : null}
        </div>
        <div style={{ padding: "32px 28px 36px 16px", display: "flex", alignItems: "center" }}>
          <HeroVisualPanel
            categoryImageUrl={categoryImageUrl}
            featuredProducts={featuredProducts}
            productCount={programProductCount}
          />
        </div>
      </section>

      <section style={{ background: BRAND.headerNavy, padding: "14px 44px 16px" }}>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.14em",
            color: BRAND.orangeLight,
            textTransform: "uppercase",
          }}
        >
          Category growth opportunity
        </p>
      </section>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${stripCount}, minmax(0, 1fr))`,
          borderBottom: "1px solid rgba(226,232,240,0.95)",
        }}
      >
        {stripCards.map((tile, i) => (
          <OpportunityValueCard
            key={`opp-${i}-${tile.label}`}
            tile={{ ...tile, iconKey: valueIconKey(tile, i) }}
            isLast={i === stripCards.length - 1}
          />
        ))}
      </section>

      {isProgramCategory ? (
        <CategoryIntelligencePlaybookSection playbook={categoryIntelligence} />
      ) : (
        <>
          <CategoryPerformanceLadderEnablementSection
            presetKey={ladderPresetKey}
            enablement={programFields.ladderEnablement}
          />
          <CategoryPerformanceLadderSection
            ladder={productLadder}
            onLadderTierProductImageUploadRequest={onCategoryProductImageUploadRequest}
          />
        </>
      )}

      {!isProgramCategory ? <CategorySellingStrategySection strategy={sellingStrategy} /> : null}

      <ProductLineupSection
        products={featuredProducts}
        onProductImageUploadRequest={onCategoryProductImageUploadRequest}
      />

      <section style={{ padding: "28px 44px 36px", display: "grid", gap: 22, background: BRAND.white }}>
        <section style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {idealCustomers.length ? (
            <FlyerCard title="Best customer fits" subtitle="Who this program wins with">
              <CustomerFitTiles items={idealCustomers} max={6} />
            </FlyerCard>
          ) : null}
          {applications.length ? (
            <FlyerCard title="Applications" subtitle="Where the category delivers">
              <PillGrid items={applications} max={8} />
            </FlyerCard>
          ) : null}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {repTalkTrack.length ? (
            <FlyerCard title="Rep talk track" subtitle="What the rep can say">
              <CheckBullets items={repTalkTrack} max={4} />
            </FlyerCard>
          ) : null}
          {discoveryQuestions.length ? (
            <FlyerCard title="Questions to ask your customer" subtitle="What the rep should ask">
              <QuestionList items={discoveryQuestions} max={5} />
            </FlyerCard>
          ) : null}
        </section>

        {systemSolutionItems.length >= 2 ? (
          <section
            style={{
              padding: "28px 28px 30px",
              borderRadius: 12,
              background: `linear-gradient(135deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 100%)`,
              border: "1px solid rgba(251, 146, 60, 0.35)",
            }}
          >
            <p
              style={{
                margin: "0 0 6px",
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.14em",
                color: BRAND.orangeLight,
                textTransform: "uppercase",
              }}
            >
              System-selling expansion
            </p>
            <p style={{ margin: "0 0 18px", fontSize: 20, fontWeight: 900, color: BRAND.white, lineHeight: 1.25 }}>
              Grow the full lubrication program
            </p>
            <SystemSolutionHub
              items={systemSolutionItems}
              max={6}
              onProductImageUploadRequest={onCategoryProductImageUploadRequest}
            />
          </section>
        ) : null}

        {cautions.length ? (
          <FlyerCard title="Cautions and notes">
            <CheckBullets items={cautions} max={4} cautionStyle />
          </FlyerCard>
        ) : null}

        {recommendedNextStep ? (
          <section
            style={{
              borderRadius: 12,
              padding: "24px 28px",
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
              background: `linear-gradient(98deg, ${BRAND.orange} 0%, #c2410c 42%, ${BRAND.navyMid} 100%)`,
              color: BRAND.white,
              boxShadow: "0 16px 40px rgba(234, 88, 12, 0.25)",
            }}
          >
            <div style={{ flex: "1 1 280px" }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 900, letterSpacing: "0.16em" }}>
                STRATEGIC NEXT STEP ? CATEGORY GROWTH
              </p>
              <p style={{ margin: "10px 0 0", fontSize: 18, fontWeight: 900, lineHeight: 1.35 }}>{recommendedNextStep}</p>
            </div>
            {pdsLinks.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {pdsLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: "10px 18px",
                      borderRadius: 8,
                      background: BRAND.white,
                      color: BRAND.headerNavy,
                      fontSize: 12,
                      fontWeight: 900,
                      textDecoration: "none",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}
      </section>

      <section style={{ padding: "8px 20px 0", background: "#f8fafc", borderTop: "1px solid rgba(226,232,240,0.95)" }}>
        <img
          src="/products.png"
          alt="Klondike lubricants product lineup"
          decoding="async"
          style={{ width: "100%", minHeight: 300, maxHeight: 360, objectFit: "contain", display: "block", margin: "0 auto" }}
        />
      </section>

      <footer
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "20px 44px",
          background: BRAND.navy,
          borderTop: `4px solid ${BRAND.orange}`,
          color: BRAND.white,
        }}
      >
        <img src="/favicon.png" alt="" decoding="async" style={{ width: 24, height: 24, justifySelf: "start" }} />
        <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          DEPENDABLE PRODUCTS. REAL SOLUTIONS.
        </span>
        <a
          href="https://klondikelubricants.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 12, fontWeight: 800, color: BRAND.orangeLight, textDecoration: "none", justifySelf: "end" }}
        >
          klondikelubricants.com
        </a>
      </footer>
    </article>
  );
}

export { DEMO_DEFAULTS, BRAND };