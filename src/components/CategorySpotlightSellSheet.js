/**
 * CategorySpotlightSellSheet — standalone category / system-solution sell sheet.
 * Layout id: category-spotlight-sell-sheet-v6d1-1
 * Not wired into App.js yet.
 */

import React from "react";

export const CATEGORY_SPOTLIGHT_SELL_SHEET_LAYOUT_ID = "category-spotlight-sell-sheet-v6f2";

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
    "Structure hydraulic conversations around ISO VG discipline, pump tags, and contamination control before any tier upgrade. Position Klondike as a system program—not a single-SKU swap.",
  categoryImageUrl: "",
  productImages: [],
  keyBenefits: [
    {
      iconKey: "expansion",
      label: "Market Expansion",
      sub: "Grow category share where construction, ag, and industrial hours are climbing.",
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
    "Anchor upgrades to documented circuit evidence—not shelf habit or brand loyalty alone.",
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

/** Guided wizard Step 3 keys (`App.js` SE_GUIDED_STEP3_CATEGORY_LABELS) → ladder preset id. */
const WIZARD_CATEGORY_TO_LADDER_KEY = {
  hydraulic: "hydraulic",
  agrimax: "agrimax",
  environmental_eal: "environmental",
  food_grade: "foodGrade",
  grease: "grease",
  hd_engine_oil: "hdEngine",
  gear_oil: "hydraulic",
  industrial_specialty: "hydraulic",
  coolant: "hydraulic",
  transmission: "hydraulic",
  other: "hydraulic",
};

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
        positioning: "Specialty trans-hydraulic, wet brake, and circulating depth",
        products: ["Wet Brake Lubricant", "Full Synthetic Gear & Circulating Oils"],
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
    tiers: [
      {
        tier: "good",
        label: "CORE",
        positioning: "Anchor trans-drive hydraulic programs for ag equipment",
        products: [
          "AGRIMAX Trans Drive Hydraulic Fluid",
          "Universal tractor / trans-hydraulic fluids (see PDS equipment guidance)",
        ],
      },
      {
        tier: "better",
        label: "SPECIALTY",
        positioning: "Zinc-free and line-specific trans-hydraulic options",
        products: [
          "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
          "Wet brake & transmission-fluid positioning (verify tags on PDS)",
        ],
      },
      {
        tier: "best",
        label: "SEVERE DUTY",
        positioning: "Heavy farm engine and high-hour seasonal protection",
        products: [
          "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil",
          "AGRIMAX Poly Tac / multipurpose grease programs",
        ],
      },
      {
        tier: "ultimate",
        label: "COMPLIANCE",
        positioning: "Coolant and companion programs that protect the ag account",
        products: [
          "AGRIMAX Extended Life Coolant programs",
          "RED TAC / field grease companions (confirm spec on PDS)",
        ],
      },
    ],
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
    tiers: [
      {
        tier: "good",
        label: "CORE",
        positioning: "Inherently biodegradable AW programs for entry EAL conversations",
        products: ["ENVIRO Inherently Biodegradable AW Hydraulic Fluids"],
      },
      {
        tier: "better",
        label: "SPECIALTY",
        positioning: "BIO-labeled biodegradable hydraulics and HEES options",
        products: ["BIO Biodegradable AW Hydraulic Fluids", "BIO Hees Hydraulic Fluids"],
      },
      {
        tier: "best",
        label: "SEVERE DUTY",
        positioning: "Synthetic-blend EAL hydraulics for demanding eco-sensitive duty",
        products: [
          "BIO-Synthetic EAL Hydraulic Oils",
          "BIO Biodegradable Synthetic Blend Hydraulic Fluids",
        ],
      },
      {
        tier: "ultimate",
        label: "COMPLIANCE",
        positioning: "HFDU and specialty environmentally acceptable positioning",
        products: ["Bio HFDU Hydraulic Fluids", "BIO Biodegradable Rock Drill Oil"],
      },
    ],
  },
  foodGrade: {
    categoryKey: "foodGrade",
    ladderStyle: "program",
    emphasis: [
      "NSF H1 registration — confirm on each PDS",
      "Food plant audit readiness",
      "Separate food-grade inventory discipline",
      "Hydraulic, grease, and gear program breadth",
      "Compressor & industrial H1 where applicable",
      "No implied OEM or registration beyond PDS",
    ],
    tiers: [
      {
        tier: "good",
        label: "CORE",
        positioning: "Foundation H1 hydraulic programs for food plants",
        products: ["FOOD-GRADE Hydraulic Oils"],
      },
      {
        tier: "better",
        label: "SPECIALTY",
        positioning: "EP grease and general food-processing lubrication",
        products: ["FOOD-GRADE EP-2 Grease", "FOOD-GRADE multipurpose grease programs"],
      },
      {
        tier: "best",
        label: "SEVERE DUTY",
        positioning: "Gear and drivetrain H1 depth for processing equipment",
        products: ["FOOD-GRADE Gear Oils", "FOOD-GRADE industrial gear programs"],
      },
      {
        tier: "ultimate",
        label: "COMPLIANCE",
        positioning: "Compressor, chain, and specialty H1 where PDS supports plant duty",
        products: [
          "FOOD-GRADE compressor & circulating oils",
          "FOOD-GRADE chain / conveyor lubricants (confirm H1 on PDS)",
        ],
      },
    ],
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
        positioning: "Severe-duty, natural gas, and specialty HD strategies",
        products: [
          "Low-ash natural gas engine oils",
          "Railroad & severe-service HD programs (confirm category on PDS)",
        ],
      },
    ],
  },
};

/** Category-first program copy — headline and depth never come from a single resolved product. */
const CATEGORY_PROGRAM_COPY = {
  hydraulic: {
    categoryTitle: "KLONDIKE Hydraulic Fluids",
    categorySubtitle: "Full-line hydraulic programs for mixed fleets, plants, and mobile equipment.",
    opportunitySummary:
      "Lead with ISO VG discipline, contamination control, and bulk vs packaged behavior—then walk the GOOD · BETTER · BEST · ULTIMATE ladder. Position Klondike as the hydraulic system partner, not a one-SKU swap.",
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
      "Use the ladder to structure margin—AW and professional programs first, synthetic and specialty where duty proves it.",
      "Separate hydraulic, wet-brake, and circulating conversations—confirm each fill point on PDS.",
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
      "Wet-brake and hydraulic fills are separate conversations—verify reservoir labels.",
    ],
    recommendedNextStep:
      "Standardize the yard on one hydraulic ladder: document ISO VG by asset group, align bulk and packaged behavior, and bundle filtration with tier upgrades.",
    sellingStrategy: {
      positioning: [
        "Sell the hydraulic system program—ladder depth, not a single drum swap.",
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
        "Grease → chassis and pin programs on the same equipment",
        "Gear & circulating oils → plant and drivetrain depth",
        "HD engine oils → mixed highway / off-highway fleets",
        "Environmental / food-grade → only where site rules require (separate programs)",
      ],
    },
  },
  agrimax: {
    categoryTitle: "AGRIMAX Full Line",
    categorySubtitle: "Farm and ag-dealer program depth across trans-hydraulics, engines, grease, and coolant.",
    opportunitySummary:
      "Position AGRIMAX as the full-line ag account strategy—CORE through COMPLIANCE tiers for trans-drive, zinc-free options, CK-4 engine oil, grease, and coolant companions. Confirm equipment tags on every PDS; do not lead with a single companion SKU.",
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
      "Open with equipment tags and reservoir labels—trans-drive vs engine vs wet brake—before any product name.",
      "Walk the AGRIMAX CORE → COMPLIANCE ladder so the dealer sees program depth, not one green or red SKU.",
      "Pair seasonal bulk strategy with packaged top-off behavior on the busiest farm accounts.",
      "Use PDS equipment guidance for line-specific options—do not imply OEM approval beyond what PDS states.",
    ],
    discoveryQuestions: [
      "Which reservoirs are you standardizing this season—trans-hydraulic, engine, wet brake, coolant?",
      "Are green-line and zinc-free programs split by equipment type or mixed on the shelf?",
      "What CK-4 and grease companions are already on the farm account?",
      "Where is a single companion SKU (coolant or grease) carrying the whole story incorrectly?",
    ],
    cautions: [
      "Confirm equipment and fluid-type guidance on each AGRIMAX PDS before recommending a line color or chemistry.",
      "Do not imply OEM or specification approval beyond what the PDS documents.",
      "Trans-hydraulic, engine, wet-brake, and coolant fills require separate confirmation.",
    ],
    recommendedNextStep:
      "Build the AGRIMAX full-line plan: anchor trans-drive and zinc-free tiers, add CK-4 and grease companions, and align coolant with seasonal bulk—documented by equipment tag on PDS.",
    sellingStrategy: {
      positioning: [
        "Sell AGRIMAX as the ag dealer’s full program—not a coolant, grease, or trans-drive SKU in isolation.",
        "Lead with reservoir discipline and seasonal strategy, then place ladder tiers.",
        "Keep John Deere / CNH / wet-brake language tied to PDS equipment guidance only.",
      ],
      problemsSolved: [
        "Single-SKU ag stories (coolant-only or grease-only) shrinking margin",
        "Line-color confusion on the shelf",
        "Missed CK-4 and trans-drive consolidation",
        "Seasonal stock-outs on the wrong tier",
      ],
      opportunitySignals: [
        "Dealers leading with 50/50 coolant or Poly Tac instead of the program",
        "Farms with multiple reservoir types on one invoice",
        "Ag accounts still split across competitors by fill type",
      ],
      crossSellPath: [
        "Trans-drive anchor → zinc-free specialty where tags support it",
        "CK-4 engine oil → high-hour seasonal engine program",
        "Poly Tac / RED TAC → grease depth on the same dealer",
        "ELC coolant → compliance tier when cooling is part of the ag plan",
      ],
    },
  },
  environmental: {
    categoryTitle: "KLONDIKE Environmental / EAL Lubricants",
    categorySubtitle: "Enviro, BIO, and EAL programs for sensitive sites—claims always tied to PDS.",
    opportunitySummary:
      "Structure sensitive-site conversations around CORE → COMPLIANCE tiers: ENVIRO AW entry, BIO and HEES depth, BIO-Synthetic EAL, and HFDU / specialty options. Pair chemistry with spill response and containment—never overstate environmental claims.",
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
      { title: "Grease", desc: "Chassis programs—confirm environmental claims on PDS", iconKey: "grease" },
      { title: "Gear oils", desc: "Drivetrain fills where site rules allow", iconKey: "gear" },
    ],
    repTalkTrack: [
      "Confirm site rules, spill plans, and equipment tags before recommending any EAL tier.",
      "Use ENVIRO and BIO labels exactly as PDS describes—no stronger environmental claims.",
      "Walk CORE → COMPLIANCE so the account sees depth beyond one biodegradable AW drum.",
      "Separate mobile hydraulic, rock drill, and HFDU conversations by application.",
    ],
    discoveryQuestions: [
      "What environmental standard or customer spec drives fluid selection on this site?",
      "Which equipment groups are already on ENVIRO, BIO, or EAL—and which are not?",
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
        "Sell regulated-site readiness—a tiered EAL program, not a single BIO SKU.",
        "Lead with site rules and PDS claims, then place CORE → COMPLIANCE depth.",
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
        "ENVIRO AW → BIO / HEES upgrade where duty increases",
        "BIO-Synthetic EAL → severe mobile hydraulic programs",
        "HFDU / rock drill → compliance tier on specialty assets",
      ],
    },
  },
  foodGrade: {
    categoryTitle: "KLONDIKE Food Grade Lubricants",
    categorySubtitle: "NSF H1 food-plant programs—hydraulic, grease, gear, and specialty fills confirmed on PDS.",
    opportunitySummary:
      "Position food-grade as a plant-wide H1 strategy: CORE hydraulics through COMPLIANCE compressor and chain programs. Every registration and application claim must match the PDS—no implied NSF or OEM approval beyond documentation.",
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
      { title: "Environmental / EAL", desc: "Outdoor or sensitive sites—not food plants", iconKey: "eal" },
      { title: "Industrial hydraulics", desc: "Non-H1 plant areas only where allowed", iconKey: "hydraulic" },
      { title: "Grease (standard)", desc: "Non-processing equipment outside H1 scope", iconKey: "grease" },
      { title: "Coolants", desc: "Cooling systems—confirm food-plant suitability on PDS", iconKey: "coolant" },
    ],
    repTalkTrack: [
      "Confirm NSF H1 registration on the PDS for every fill point discussed.",
      "Separate processing vs non-processing equipment before recommending any SKU.",
      "Walk CORE → COMPLIANCE so the plant sees breadth beyond one hydraulic drum.",
      "Never imply registration or OEM approval beyond what the PDS states.",
    ],
    discoveryQuestions: [
      "Which zones require H1 vs general industrial fluids?",
      "When is the next customer audit—and what fill points are in scope?",
      "Are grease, hydraulic, and compressor lines on one supplier program today?",
      "Where are non-H1 SKUs still on the shelf in processing areas?",
    ],
    cautions: [
      "Confirm NSF H1 status and application scope on each PDS before quoting.",
      "Do not use environmental/EAL fluids where H1 registration is required.",
      "Keep food-grade inventory segregated and labeled per plant rules.",
    ],
    recommendedNextStep:
      "Document every processing fill point, align CORE → COMPLIANCE H1 tiers on PDS, and consolidate grease, gear, and compressor lines under one plant program.",
    sellingStrategy: {
      positioning: [
        "Sell audit-ready plant programs—not a single food-grade hydraulic SKU.",
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
        "FOOD-GRADE hydraulic → EP-2 grease on processing lines",
        "Gear H1 → reducers and mixers",
        "Compressor / chain H1 → compliance tier specialties",
      ],
    },
  },
  grease: {
    categoryTitle: "KLONDIKE Grease Program",
    categorySubtitle: "Full grease ladder from multipurpose EP through flagship nano programs.",
    opportunitySummary:
      "Lead with the GOOD · BETTER · BEST · ULTIMATE grease ladder—RED TAC and HD TAC through MOLY TAC, ULTRA TAC, and nano sulfonate / lithium complex synthetics. Sell relube strategy and application severity, not one Poly Tac drum.",
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
      "Use the ladder—RED TAC / HD TAC base, MOLY TAC and ULTRA TAC upgrades, nano where severe duty proves it.",
      "Do not let one multipurpose SKU (e.g. Poly Tac alone) stand in for the whole grease program.",
      "Pair centralized system discipline with the right NLGI and EP chemistry.",
    ],
    discoveryQuestions: [
      "Which joints fail first—washout, pound-out, or heat?",
      "What relube interval are you actually achieving vs planning?",
      "Are moly and synthetic-blend tiers specified on severe assets only?",
      "Where is one grease SKU doing work that should be split by severity?",
    ],
    cautions: [
      "Confirm NLGI, EP, and compatibility with prior grease on PDS before switching.",
      "Do not mix incompatible thickeners without flush guidance.",
      "Centralized systems require product and viscosity discipline—verify on PDS.",
    ],
    recommendedNextStep:
      "Map grease points by severity, standardize the ladder on the fleet chart, and upgrade moly and nano tiers only where inspection data supports it.",
    sellingStrategy: {
      positioning: [
        "Sell the grease ladder and relube strategy—not a single multipurpose product.",
        "Anchor upgrades to joint severity, water, and interval evidence.",
      ],
      problemsSolved: [
        "One-SKU grease habits (Poly Tac–only stories)",
        "Premature pin and bushing wear",
        "Missed nano and synthetic-blend margin",
      ],
      opportunitySignals: [
        "Fleets on one RED TAC or Poly Tac for every point",
        "Mining / forestry / construction with shock load",
        "Centralized systems without tier discipline",
      ],
      crossSellPath: [
        "RED TAC / HD TAC → MOLY TAC on loaded outdoor joints",
        "ULTRA TAC → longer intervals and heat",
        "nano programs → flagship severe-duty conversions",
        "Hydraulics & engines → same account system sell",
      ],
    },
  },
  hdEngine: {
    categoryTitle: "KLONDIKE Heavy Duty Engine Oils",
    categorySubtitle: "CK-4 / FA-4 and synthetic tier progression for on- and off-highway fleets.",
    opportunitySummary:
      "Walk the GOOD · BETTER · BEST · ULTIMATE HD engine ladder—conventional and professional formulas through synthetic blend, full synthetic CK-4, and specialty natural gas / severe service. Align API category and drain strategy to PDS; do not imply OEM approval beyond documentation.",
    keyBenefits: [
      { iconKey: "consolidation", label: "Fleet program", sub: "One HD story from conventional through full synthetic CK-4." },
      { iconKey: "uptime", label: "Protection & drains", sub: "Match tier to duty cycle and emissions hardware—per PDS." },
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
      "Tie full synthetic CK-4 to measurable duty and emissions hardware needs—not habit alone.",
      "Reference PDS for natural gas and specialty lines—no implied OEM approvals.",
    ],
    discoveryQuestions: [
      "What API category and viscosity are on the bulk tank vs over-the-road units?",
      "Which units are candidates for synthetic blend vs full synthetic CK-4?",
      "How are drain intervals set today—hours, fuel, or calendar?",
      "Are natural gas or specialty engines on a separate program today?",
    ],
    cautions: [
      "Confirm API category, viscosity, and compatibility on each PDS before changing engine oil.",
      "Do not imply OEM approval unless the PDS documents it.",
      "FA-4 and CK-4 apply to different hardware—verify fleet eligibility.",
    ],
    recommendedNextStep:
      "Chart fleet units by duty and API need, standardize the HD ladder on bulk and packaged tanks, and phase synthetic upgrades with documented drain strategy.",
    sellingStrategy: {
      positioning: [
        "Sell fleet engine programs and the HD ladder—not a single CK-4 SKU.",
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
        "Commercial / professional → synthetic blend upgrade path",
        "Full synthetic CK-4 → premium highway and severe duty",
        "Coolants & greases → same fleet card",
        "AGRIMAX CK-4 → ag accounts only (separate program)",
      ],
    },
  },
};

function pickList(value, fallback) {
  if (!Array.isArray(value)) return fallback;
  const list = value.filter((item) => {
    if (item == null || item === false) return false;
    if (typeof item === "object") {
      return Boolean(String(item.label ?? item.sub ?? item.title ?? item.name ?? "").trim());
    }
    return Boolean(String(item).trim());
  });
  return list.length ? list : fallback;
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
  for (const item of Array.isArray(repTalkRaw) ? repTalkRaw : []) {
    const line = String(item ?? "").trim();
    if (!line) continue;
    if (looksLikeQuestion(line)) questionCandidates.push(line);
    else repCandidates.push(line);
  }
  for (const item of Array.isArray(questionsRaw) ? questionsRaw : []) {
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
  if (!Array.isArray(value)) return fallback.slice(0, 6);
  const out = [];
  for (const item of value) {
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
      const dash = line.match(/^([^:—–-]{1,60})\s*[:—–-]\s*(.+)$/);
      out.push({
        iconKey: "",
        label: String(dash ? dash[1] : line).trim(),
        sub: String(dash ? dash[2] : "").trim(),
      });
    }
    if (out.length >= 6) break;
  }
  return out.length ? out : fallback.slice(0, 6);
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

function normalizeCrossSellItems(value, fallback) {
  const raw = Array.isArray(value) ? value : fallback;
  const out = [];
  for (const item of raw) {
    if (item && typeof item === "object") {
      const title = sanitizeLabel(item) || String(item.title ?? item.name ?? "").trim();
      const desc = String(item.desc ?? item.sub ?? item.role ?? "").trim();
      const iconKey = String(item.iconKey || "").trim();
      if (!title) continue;
      out.push({ title, desc, iconKey });
    } else {
      const title = sanitizeLabel(item) || String(item ?? "").trim();
      if (!title) continue;
      out.push({ title, desc: crossSellDescriptor(title), iconKey: crossSellIconKey(title) });
    }
    if (out.length >= 6) break;
  }
  if (!out.length && value !== fallback) {
    return normalizeCrossSellItems(fallback, fallback);
  }
  return out;
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
  const raw = Array.isArray(products) ? products : [];
  const images = Array.isArray(productImages) ? productImages : [];
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
    out.push({ name, role, imageUrl });
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
  if (/engine oil|ck-4|ck4|fa-4|fa4|heavy duty engine|hd engine|motor oil|crankcase/.test(blob)) {
    return "hdEngine";
  }
  if (
    /hydraulic|iso vg|iso turbine|tractor fluid|wet brake|circulating|xvi synthetic|aw fluid|professional hydraulic/.test(
      blob
    ) &&
    !/\bagrimax\b/.test(blob)
  ) {
    return "hydraulic";
  }
  if (/gear oil|gear lubricant|drivetrain/.test(blob)) return "hydraulic";
  return "hydraulic";
}

function ladderSectionHeading(ladder) {
  if (ladder?.ladderStyle === "program") {
    return "CORE · SPECIALTY · SEVERE DUTY · COMPLIANCE";
  }
  return "GOOD · BETTER · BEST · ULTIMATE";
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
  for (const line of Array.isArray(primary) ? primary : []) push(line);
  for (const line of Array.isArray(secondary) ? secondary : []) {
    if (out.length >= max) break;
    push(line);
  }
  return out.length ? out : Array.isArray(primary) ? primary.slice(0, max) : [];
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
    out.push({
      name,
      role: String(item?.role ?? item?.sub ?? "").trim(),
      imageUrl: String(item?.imageUrl ?? "").trim(),
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
  const ladderFeatured = featuredProductsFromLadderPreset(presetKey);

  if (!categoryFirst) {
    return {
      categoryTitle: pickText(props.categoryTitle, program.categoryTitle),
      categorySubtitle: pickText(props.categorySubtitle, program.categorySubtitle),
      opportunitySummary: pickText(props.opportunitySummary, program.opportunitySummary),
      keyBenefits: normalizeValueCards(props.keyBenefits, program.keyBenefits),
      idealCustomers: pickList(props.idealCustomers, program.idealCustomers),
      applications: pickList(props.applications, program.applications),
      featuredProducts: normalizeFeaturedProducts(
        props.featuredProducts,
        props.productImages ?? []
      ).length
        ? normalizeFeaturedProducts(props.featuredProducts, props.productImages ?? [])
        : mergeFeaturedProductsSupplement(ladderFeatured, props.featuredProductsSupplement),
      crossSell: normalizeCrossSellItems(props.crossSell, program.crossSell),
      repTalkTrack: pickList(props.repTalkTrack, program.repTalkTrack),
      discoveryQuestions: pickList(props.discoveryQuestions, program.discoveryQuestions),
      cautions: pickList(props.cautions, program.cautions),
      recommendedNextStep: pickText(props.recommendedNextStep, program.recommendedNextStep),
      sellingStrategy: props.sellingStrategy || program.sellingStrategy,
      presetKey,
    };
  }

  const featuredProducts = mergeFeaturedProductsSupplement(
    ladderFeatured,
    props.featuredProductsSupplement,
    14
  );

  return {
    categoryTitle: program.categoryTitle,
    categorySubtitle: program.categorySubtitle,
    opportunitySummary: program.opportunitySummary,
    keyBenefits: program.keyBenefits,
    idealCustomers: mergeUniqueStrings(program.idealCustomers, props.idealCustomers, 8),
    applications: mergeUniqueStrings(program.applications, props.applications, 8),
    featuredProducts,
    crossSell: normalizeCrossSellItems(program.crossSell, program.crossSell),
    repTalkTrack: mergeUniqueStrings(program.repTalkTrack, props.repTalkTrack, 6),
    discoveryQuestions: mergeUniqueStrings(program.discoveryQuestions, props.discoveryQuestions, 6),
    cautions: mergeUniqueStrings(program.cautions, props.cautions, 6),
    recommendedNextStep: program.recommendedNextStep,
    sellingStrategy: program.sellingStrategy,
    presetKey,
  };
}

function normalizeLadderTier(item, fallbackLabel) {
  if (!item || typeof item !== "object") {
    return {
      tier: fallbackLabel.toLowerCase(),
      label: fallbackLabel,
      positioning: "",
      products: [],
    };
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
  return { tier, label, positioning, products: products.slice(0, 4) };
}

function normalizeProductLadder(value, presetKey) {
  const key = CATEGORY_LADDER_PRESETS[presetKey] ? presetKey : "hydraulic";
  const preset = CATEGORY_LADDER_PRESETS[key];
  if (!value || typeof value !== "object") {
    return {
      categoryKey: preset.categoryKey,
      ladderStyle: preset.ladderStyle || "performance",
      emphasis: [...preset.emphasis],
      tiers: preset.tiers.map((t) => ({ ...t, products: [...t.products] })),
    };
  }
  const emphasis = pickList(value.emphasis ?? value.highlights, preset.emphasis).slice(0, 6);
  const tiersIn = Array.isArray(value.tiers) ? value.tiers : [];
  const tiers = LADDER_TIER_ORDER.map((tierId, i) => {
    const fallback = preset.tiers[i] || preset.tiers[0];
    const match =
      tiersIn.find((t) => String(t?.tier || t?.label || "").toLowerCase() === tierId) ||
      tiersIn[i];
    const normalized = normalizeLadderTier(match, fallback.label);
    if (!normalized.products.length) normalized.products = [...fallback.products];
    if (!normalized.positioning) normalized.positioning = fallback.positioning;
    return normalized;
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
    { bg: "#f8fafc", border: "rgba(30, 58, 138, 0.2)", accent: BRAND.slate },
    { bg: "#fff7ed", border: "rgba(234, 88, 12, 0.35)", accent: BRAND.orange },
    { bg: "linear-gradient(160deg, #eff6ff 0%, #fff 100%)", border: "rgba(30, 64, 175, 0.35)", accent: BRAND.navyMid },
    {
      bg: `linear-gradient(160deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 100%)`,
      border: BRAND.orange,
      accent: BRAND.orangeLight,
      lightText: true,
    },
  ];
  return palettes[Math.min(tierIndex, 3)];
}

function LadderTierColumn({ tier, tierIndex }) {
  const visual = ladderTierVisual(tierIndex);
  const isUltimate = tierIndex === 3;
  return (
    <article
      style={{
        padding: "20px 16px 22px",
        borderRadius: 12,
        background: visual.bg,
        border: `2px solid ${visual.border}`,
        boxShadow: isUltimate ? "0 16px 36px rgba(15, 23, 42, 0.2)" : "0 8px 20px rgba(15, 23, 42, 0.06)",
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        transform: isUltimate ? "translateY(-4px)" : "none",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: isUltimate
            ? "rgba(255,255,255,0.12)"
            : `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
          border: `2px solid ${isUltimate ? BRAND.orangeLight : "rgba(234, 88, 12, 0.45)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
        aria-hidden
      >
        <LadderTierIcon tier={tier.tier} />
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          fontWeight: 900,
          letterSpacing: "0.12em",
          color: isUltimate ? BRAND.orangeLight : visual.accent,
        }}
      >
        {tier.label}
      </p>
      {tier.positioning ? (
        <p
          style={{
            margin: "8px 0 14px",
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 1.45,
            color: isUltimate ? "rgba(255,255,255,0.88)" : "#64748b",
          }}
        >
          {tier.positioning}
        </p>
      ) : null}
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8, flex: 1 }}>
        {tier.products.map((name) => (
          <li
            key={name}
            style={{
              fontSize: 12,
              fontWeight: 800,
              lineHeight: 1.35,
              color: isUltimate ? BRAND.white : BRAND.headerNavy,
              padding: "8px 10px",
              borderRadius: 8,
              background: isUltimate ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.85)",
              border: isUltimate ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(30, 58, 138, 0.12)",
            }}
          >
            {name}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CategoryPerformanceLadderSection({ ladder }) {
  if (!ladder?.tiers?.length) return null;
  return (
    <section
      style={{
        padding: "36px 44px 40px",
        background: BRAND.white,
        borderBottom: "1px solid rgba(226,232,240,0.95)",
      }}
    >
      <div style={{ marginBottom: 22 }}>
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
          Category performance ladder
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.15 }}>
          {ladderSectionHeading(ladder)}
        </p>
        <p style={{ margin: "10px 0 0", fontSize: 14, fontWeight: 600, color: "#64748b", lineHeight: 1.5, maxWidth: 720 }}>
          Use the ladder to structure line depth, margin expansion, and upsell conversations—not a single-SKU pitch.
        </p>
      </div>
      {ladder.emphasis?.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
          {ladder.emphasis.slice(0, 6).map((line) => (
            <span
              key={line}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 800,
                color: BRAND.navy,
                background: "#f1f5f9",
                border: "1px solid rgba(30, 58, 138, 0.14)",
              }}
            >
              {line}
            </span>
          ))}
        </div>
      ) : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        {ladder.tiers.slice(0, 4).map((tier, i) => (
          <LadderTierColumn key={tier.tier} tier={tier} tierIndex={i} />
        ))}
      </div>
    </section>
  );
}

function FeaturedProductCard({ product, index }) {
  const hasImage = Boolean(String(product.imageUrl || "").trim());
  const lineLabel = productLineIndexLabel(index);
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
      <div
        style={{
          height: 132,
          background: hasImage
            ? "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)"
            : `linear-gradient(145deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 70%, #1e40af 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: hasImage ? 12 : 18,
        }}
      >
        {hasImage ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            decoding="async"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        ) : (
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 800,
              color: "rgba(255,255,255,0.92)",
              textAlign: "center",
              lineHeight: 1.35,
              padding: "0 8px",
            }}
          >
            {product.name}
          </p>
        )}
      </div>
      <div
        style={{
          padding: "16px 16px 18px",
          flex: 1,
          background: "#f8fafc",
          borderTop: `3px solid ${BRAND.orange}`,
        }}
      >
        <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.3 }}>
          {product.name}
        </p>
        {product.role ? (
          <p style={{ margin: "8px 0 0", fontSize: 12, fontWeight: 600, color: "#64748b", lineHeight: 1.45 }}>
            {product.role}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function ProductLineupSection({ products }) {
  const lineup = products.slice(0, 6);
  if (!lineup.length) return null;
  const cols = lineup.length <= 3 ? lineup.length : lineup.length <= 4 ? 2 : 3;
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
          Pair these with the performance ladder for GOOD → ULTIMATE upsell and category penetration.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 18 }}>
        {lineup.map((p, i) => (
          <FeaturedProductCard key={p.name} product={p} index={i} />
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
        {productCount} products · application coverage · companion categories
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

function SystemSolutionHub({ items, max = 6 }) {
  const list = items.slice(0, max);
  if (list.length < 2) return null;
  const cols = list.length <= 3 ? list.length : list.length === 4 ? 2 : 3;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 14 }}>
      {list.map((item) => (
        <article
          key={item.title}
          style={{
            padding: "18px 16px",
            borderRadius: 12,
            background: BRAND.white,
            border: "1px solid rgba(30, 58, 138, 0.18)",
            borderLeft: `4px solid ${BRAND.orange}`,
            boxShadow: "0 8px 22px rgba(15, 23, 42, 0.08)",
            display: "grid",
            gridTemplateColumns: "44px 1fr",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden
          >
            <SystemSolutionIconSvg iconKey={item.iconKey || crossSellIconKey(item.title)} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.25 }}>
              {item.title}
            </p>
            {item.desc ? (
              <p style={{ margin: "6px 0 0", fontSize: 11, fontWeight: 600, color: "#64748b", lineHeight: 1.4 }}>
                {item.desc}
              </p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function CategorySellingStrategySection({ strategy }) {
  if (!strategy || typeof strategy !== "object") return null;
  const blocks = [
    { title: "How reps position the category", items: strategy.positioning, color: BRAND.navyMid },
    { title: "Customer problems this solves", items: strategy.problemsSolved, color: "#047857" },
    { title: "Where to look for opportunity", items: strategy.opportunitySignals, color: "#c2410c" },
    { title: "Cross-sell path", items: strategy.crossSellPath, color: "#5b21b6" },
  ].filter((b) => Array.isArray(b.items) && b.items.length > 0);
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
          Grow the program—not a single SKU
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
                  {line}
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
  const featuredProducts = normalizeFeaturedProducts(
    programFields.featuredProducts,
    props.productImages ?? DEMO_DEFAULTS.productImages
  );
  const { repTalkTrack, discoveryQuestions } = resolveRepTalkAndQuestions(
    programFields.repTalkTrack,
    programFields.discoveryQuestions,
    DEMO_DEFAULTS.repTalkTrack,
    DEMO_DEFAULTS.discoveryQuestions
  );
  const systemSolutionItems = normalizeCrossSellItems(programFields.crossSell, DEMO_DEFAULTS.crossSell);
  const cautions = pickList(programFields.cautions, DEMO_DEFAULTS.cautions);
  const recommendedNextStep = pickText(programFields.recommendedNextStep, DEMO_DEFAULTS.recommendedNextStep);
  const sellingStrategy = programFields.sellingStrategy;
  const pdsLinks = normalizePdsLinks(props.pdsLinks ?? DEMO_DEFAULTS.pdsLinks);

  const stripCount = Math.min(Math.max(valueCards.length, 4), 6);
  const stripCards = valueCards.slice(0, stripCount);
  const ladderPresetKey = programFields.presetKey;
  const productLadder = normalizeProductLadder(
    props.productLadder ?? DEMO_DEFAULTS.productLadder,
    ladderPresetKey
  );
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

      <CategoryPerformanceLadderSection ladder={productLadder} />

      <CategorySellingStrategySection strategy={sellingStrategy} />

      <ProductLineupSection products={featuredProducts} />

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
            <SystemSolutionHub items={systemSolutionItems} max={6} />
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
                STRATEGIC NEXT STEP · CATEGORY GROWTH
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