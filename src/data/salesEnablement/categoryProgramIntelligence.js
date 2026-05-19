/**
 * Phase 6F.10 — Deterministic category program intelligence registry (foundation).
 * Approved positioning facts for sales enablement; AI may rewrite language but must not invent category strategy.
 * Not wired to UI, sends, or resolvers yet.
 */

import { attachCategoryOemSpecCoaching } from "./oemSpecMappings.js";

export const CATEGORY_PROGRAM_INTELLIGENCE_VERSION = 1;

/**
 * @typedef {"ladder" | "program"} CategoryProgramType
 */

/**
 * @typedef {{
 *   tier: string,
 *   label: string,
 *   positioning: string,
 *   products: string[],
 * }} PerformanceLadderTier
 */

/**
 * @typedef {{
 *   style: "performance" | "program",
 *   tiers: PerformanceLadderTier[],
 * }} PerformanceLadder
 */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   role: string,
 *   positioning: string,
 *   hdVsLd?: "hd" | "ld" | "mixed" | "na",
 * }} FlagshipProductRef
 */

/**
 * @typedef {{
 *   id: string,
 *   label: string,
 *   summary: string,
 *   examples?: string[],
 * }} CategoryFamilyRef
 */

/**
 * @typedef {{
 *   key: string,
 *   label: string,
 *   categoryType: CategoryProgramType,
 *   flagshipPositioning: string,
 *   categorySummary: string,
 *   customerProblemsSolved: string[],
 *   keySellingAngles: string[],
 *   keyTechnologyThemes: string[],
 *   recommendedRepTalkingPoints: string[],
 *   discoveryFocus: string[],
 *   crossSellFocus: string[],
 *   cautions: string[],
 *   performanceLadder: PerformanceLadder | null,
 *   chemistryGuidance: string[],
 *   specificationGuidance: string[],
 *   applicationGuidance: string[],
 *   flagshipProducts: FlagshipProductRef[],
 *   categoryFamilies: CategoryFamilyRef[],
 *   dealerNextSteps?: string[],
 * }} CategoryProgramIntelligence
 */

/** @type {CategoryProgramIntelligence[]} */
const CATEGORY_PROGRAM_INTELLIGENCE_LIST = [
  {
    key: "hydraulic",
    label: "Hydraulic Fluids",
    categoryType: "ladder",
    flagshipPositioning: "Keep equipment running — match ISO VG to tags, fix leaks and heat before swapping brands.",
    categorySummary:
      "Hydraulic reliability wins the counter conversation: leaks, heat, wet duty, and mixed equipment need the right ISO VG — not one AW drum for every pump.",
    customerProblemsSolved: [
      "Leaks and slow cycles when the wrong ISO VG or dirty fluid is in the tank",
      "Heat and foam on first shift in cold or wet yards",
      "Mixed equipment sharing bulk tanks without hose discipline",
      "Repeat pump failures when analysis and filtration are skipped",
    ],
    keySellingAngles: [
      "Fewer comeback calls when ISO VG matches equipment tags",
      "Bulk program margin on Professional through XVI synthetic ladder",
      "Counter staff can coach tags — not guess viscosity from drum color",
      "Hydraulic accounts pull grease, gear, and coolant on the same fleet card",
    ],
    keyTechnologyThemes: [
      "AW anti-wear hydraulic fluids (Professional, Advanced, Commercial Formula)",
      "Multi-Viscosity AW for seasonal coverage",
      "XVI synthetic hydraulic technology",
      "Universal Red Tractor Fluid / wet-brake adjacent fills",
      "R&O turbine and circulating oils",
      "ENVIRO / BIO / EAL hydraulic companions on sensitive sites",
    ],
    recommendedRepTalkingPoints: [
      "What ISO VG is on the pump tag for the unit that failed last?",
      "Where are you seeing leaks, heat, or slow response first thing in the morning?",
      "What are you using in bulk today — and how do you top off in the field?",
      "Are bulk tanks and hoses separated between AW, tractor fluid, and plant circuits?",
    ],
    discoveryFocus: [
      "Which circuits show heat, foam, or slow response first?",
      "What ISO VG tags are on the worst asset this week?",
      "Are bulk and packaged top-offs on the same program?",
    ],
    crossSellFocus: ["Gear oil — final drives and reducers", "Grease — pins and chassis", "Coolant — fleet cooling on mixed yards"],
    dealerNextSteps: [
      "Schedule a hydraulic category review with the dealer manager",
      "Run a lunch-and-learn on ISO VG tags and bulk discipline",
      "Review PM hydraulic SKUs on the seasonal bundle sheet",
      "Send this hydraulic spotlight to the outside-sales rep",
      "Assign hydraulic fundamentals training for new counter staff",
    ],
    cautions: [
      "Do not put AW hydraulic fluid in turbine, compressor R&O, or OEM-specified dry circuits without compatibility review.",
      "Tractor / UTHF / wet-brake fluids are application-specific—do not assume one red tractor fluid fits every compartment.",
      "Do not promise OEM approvals not documented on the PDS.",
    ],
    performanceLadder: {
      style: "performance",
      tiers: [
        {
          tier: "good",
          label: "GOOD",
          positioning: "Commercial bulk and value AW coverage",
          products: ["Professional Formula Hydraulic Fluids", "Advanced Formula Hydraulic Fluids"],
        },
        {
          tier: "better",
          label: "BETTER",
          positioning: "Seasonal and multi-duty pump protection",
          products: ["Multi-Viscosity AW Hydraulic Fluids", "Universal Red Tractor Fluid"],
        },
        {
          tier: "best",
          label: "BEST",
          positioning: "Premium synthetic and plant rotating equipment",
          products: ["XVI Synthetic Hydraulic Fluids", "Long Life Turbine Oils"],
        },
        {
          tier: "ultimate",
          label: "ULTIMATE",
          positioning: "Top synthetic plus environmentally acceptable options where PDS supports",
          products: ["XVI Synthetic Hydraulic Fluids", "BIO-Synthetic EAL Hydraulic Oils"],
        },
      ],
    },
    chemistryGuidance: ["Match AW vs R&O vs tractor fluid to the reservoir label and PDS — not habit."],
    specificationGuidance: ["Lead with ISO VG on tags before quoting a tier move."],
    applicationGuidance: [],
    flagshipProducts: [
      {
        id: "xvi-synthetic-hydraulic",
        name: "XVI Synthetic Hydraulic Fluids",
        role: "flagship_premium",
        positioning: "Premium synthetic AW for severe-duty and high-value pump life programs.",
        hdVsLd: "mixed",
      },
      {
        id: "advanced-formula-aw",
        name: "Advanced Formula AW Hydraulic Fluids",
        role: "step_up_bulk",
        positioning: "Step-up from Professional for fleets ready to standardize better oxidation stability.",
        hdVsLd: "mixed",
      },
      {
        id: "professional-formula-aw",
        name: "Professional Formula Hydraulic Fluids",
        role: "volume_entry",
        positioning: "Value bulk AW baseline—pair with analysis and ISO VG discipline.",
        hdVsLd: "mixed",
      },
    ],
    categoryFamilies: [
      {
        id: "aw_mobile_industrial",
        label: "AW mobile & industrial",
        summary: "Professional, Advanced, Commercial, and Red AW programs for conventional hydraulic power units.",
        examples: ["Professional Formula AW", "Advanced Formula AW", "Commercial Formula AW", "Red AW Hydraulic Fluids"],
      },
      {
        id: "multi_viscosity_aw",
        label: "Multi-Viscosity AW",
        summary: "Seasonal and wide-temperature AW programs.",
        examples: ["Multi-Viscosity AW Hydraulic Fluids"],
      },
      {
        id: "tractor_uthf",
        label: "Tractor / UTHF",
        summary: "Universal tractor and trans-hydraulic fills where wet-brake compatibility is documented.",
        examples: ["Universal Red Tractor Fluid", "Arctic Tractor Fluid Synthetic Blend"],
      },
      {
        id: "turbine_circulating",
        label: "Turbine & circulating",
        summary: "R&O and long-life turbine oils for rotating plant equipment—not AW substitutes.",
        examples: ["Long Life Turbine Oils", "Full Synthetic Circulating Compressor Turbine Oils"],
      },
    ],
  },
  {
    key: "grease",
    label: "Grease",
    categoryType: "ladder",
    flagshipPositioning: "Stop pin and bushing comebacks — match grease tier to washout, shock load, and relube interval.",
    categorySummary:
      "Grease wins when reps map joints first: washout, shock load, centralized systems, and relube intervals — then walk RED TAC through nano on the ladder.",
    customerProblemsSolved: [
      "Grease washout on pins and bushings after rain or pressure washing",
      "Shock load pounding out commodity EP-2 on loaders and implements",
      "Wrong NLGI or thickener in centralized lube systems",
      "Relube intervals stretched with the wrong grease family on the chart",
    ],
    keySellingAngles: [
      "Fewer pin and bearing comebacks on seasonal PM routes",
      "Ladder margin from RED TAC through moly and nano tiers",
      "Counter can explain NLGI by joint severity — not one Poly Tac for every zerk",
      "Grease pulls hydraulic and gear on the same equipment card",
    ],
    keyTechnologyThemes: [
      "Lithium and lithium complex thickeners",
      "Moly-fortified EP (3% and 5% moly programs)",
      "Synthetic blend and full synthetic EP greases",
      "Calcium sulfonate complex (nano) for shock, water, and load",
      "Bentone and specialty high-temp greases where PDS supports",
    ],
    recommendedRepTalkingPoints: [
      "Do customers complain about washout on pins or bushings?",
      "Which joints fail first — wet booms, chassis, or centralized lube lines?",
      "What relube interval are you actually hitting vs planning?",
      "Are you on one grease SKU for every point on the fleet chart?",
    ],
    discoveryFocus: [
      "Where is grease washing out or pounding out?",
      "What NLGI does the OEM chart show for your worst asset?",
    ],
    crossSellFocus: ["Hydraulic fluids", "Gear oil", "Coolant"],
    dealerNextSteps: [
      "Review PM grease SKUs on the fleet chart with the dealer manager",
      "Run a lunch-and-learn on NLGI and the grease ladder",
      "Send this grease spotlight to the outside-sales rep",
      "Prepare a business review on grease depth vs one-SKU habits",
    ],
    cautions: [
      "Do not substitute nano or moly greases into central systems without compatibility review.",
      "Do not promise NLGI or thickener crossover not on the OEM chart.",
      "ULTIMATE nano tiers are severe-duty premium—not default every zerk on price-led accounts.",
    ],
    performanceLadder: {
      style: "performance",
      tiers: [
        {
          tier: "good",
          label: "GOOD",
          positioning: "Multipurpose and HD chassis baselines",
          products: ["RED TAC", "HD TAC"],
        },
        {
          tier: "better",
          label: "BETTER",
          positioning: "Moly-fortified EP for shock and implements",
          products: ["MOLY TAC 3%"],
        },
        {
          tier: "best",
          label: "BEST",
          positioning: "Synthetic blend and high-moly severe duty",
          products: ["ULTRA TAC", "MOLY TAC HD 5%"],
        },
        {
          tier: "ultimate",
          label: "ULTIMATE",
          positioning: "nano sulfonate and nano lithium complex synthetic EP",
          products: ["nano Calcium Sulfonate EP Grease", "nano Lithium Complex Synthetic EP Grease"],
        },
      ],
    },
    chemistryGuidance: ["Confirm NLGI and thickener on the PDS before switching grease families."],
    specificationGuidance: ["Match joint severity to ladder tier — verify on OEM chart."],
    applicationGuidance: [],
    flagshipProducts: [
      {
        id: "nano-calcium-sulfonate",
        name: "nano Calcium Sulfonate EP Grease",
        role: "flagship_ultimate",
        positioning: "ULTIMATE severe-duty sulfonate complex with published EP and washout proof points.",
        hdVsLd: "hd",
      },
      {
        id: "moly-tac-3",
        name: "MOLY TAC 3%",
        role: "better_tier_anchor",
        positioning: "BETTER moly EP-2 for implements and shock—name 3% moly before price.",
        hdVsLd: "mixed",
      },
      {
        id: "red-tac",
        name: "RED TAC",
        role: "good_tier_anchor",
        positioning: "GOOD multipurpose baseline—pair with joint map discipline.",
        hdVsLd: "mixed",
      },
    ],
    categoryFamilies: [
      {
        id: "multipurpose_hd",
        label: "Multipurpose & HD",
        summary: "GOOD tier multipurpose greases for chassis and general EP.",
        examples: ["RED TAC", "HD TAC", "Multi-Purpose Grease"],
      },
      {
        id: "moly_ep",
        label: "Moly EP",
        summary: "BETTER and BEST moly-fortified programs.",
        examples: ["MOLY TAC 3%", "MOLY TAC HD 5%"],
      },
      {
        id: "synthetic_ep",
        label: "Synthetic EP",
        summary: "Synthetic blend and full synthetic EP greases.",
        examples: ["ULTRA TAC", "Syn Tac Synthetic EP Greases"],
      },
      {
        id: "nano_ultimate",
        label: "nano ULTIMATE",
        summary: "Premium nano sulfonate and lithium complex synthetic EP.",
        examples: ["nano Calcium Sulfonate EP Grease", "nano Lithium Complex Synthetic EP Grease"],
      },
    ],
  },
  {
    key: "hd_engine_oil",
    label: "HD Engine Oils",
    categoryType: "ladder",
    flagshipPositioning: "CK-4 / FA-4 discipline on the fleet card — severe duty, emissions hardware, and coolant on the same lane.",
    categorySummary:
      "HD engine oil is a fleet program conversation: CK-4 vs FA-4, mixed fleet bulk discipline, severe-duty drains, and coolant support — verified on VIN tags and PDS.",
    customerProblemsSolved: [
      "CK-4 vs FA-4 confusion on newer tractors and vocational units",
      "Short drains from soot and fuel dilution without oil analysis",
      "One 15W-40 bulk tank for every diesel regardless of emissions generation",
      "Engine-only lane bundles missing HD coolant and chassis grease",
    ],
    keySellingAngles: [
      "Lane revenue when engine, coolant, grease, and gear ship together",
      "Analysis-backed synthetic upgrade — not mileage myths",
      "Counter staff can read API category from VIN — not habit",
      "Fewer aftertreatment comebacks when bulk matches tag",
    ],
    keyTechnologyThemes: [
      "CK-4 heavy-duty diesel (conventional, synthetic blend, full synthetic)",
      "FA-4 fuel-economy HDEO where OEM approved",
      "Low ash and natural gas engine oils",
      "10W-30 FA-4 and 5W-40 full synthetic premium programs",
      "Professional and Advanced Formula naming for fleet baselines",
    ],
    recommendedRepTalkingPoints: [
      "What API category and viscosity are on your bulk tank today?",
      "Which units are FA-4 candidates vs CK-4 — who made the last bulk decision?",
      "Do you stock coolant on the same fleet program as engine oil?",
      "Are you sampling soot and fuel dilution on vocational segments?",
    ],
    discoveryFocus: [
      "What model years are on the fleet card?",
      "How are HD vs automotive bulk tanks labeled?",
    ],
    crossSellFocus: ["Coolant", "Grease", "Gear oil"],
    dealerNextSteps: [
      "Review fleet bulk chart (CK-4/FA-4 and viscosity) with the dealer manager",
      "Run a lunch-and-learn on API category from VIN tags",
      "Send this HD engine spotlight to the outside-sales rep",
      "Prepare a business review on lane bundle completeness",
    ],
    cautions: [
      "Do not recommend FA-4 where OEM requires CK-4 or mixed unknowns without verification.",
      "Do not promise OEM approvals or drain extension beyond PDS and OEM guides.",
      "Natural gas and low-ash oils are specialty programs—not default 15W-40 CK-4 substitutes.",
    ],
    performanceLadder: {
      style: "performance",
      tiers: [
        {
          tier: "good",
          label: "GOOD",
          positioning: "Conventional HD fleet baselines",
          products: ["Commercial Formula Heavy Duty Engine Oils"],
        },
        {
          tier: "better",
          label: "BETTER",
          positioning: "Synthetic blend CK-4 / FA-4 step-up",
          products: ["Synthetic Blend Heavy Duty Engine Oils", "SAE 10W-30 FA-4 Synthetic Blend Heavy Duty Engine Oil"],
        },
        {
          tier: "best",
          label: "BEST",
          positioning: "Full synthetic CK-4 premium",
          products: ["Full Synthetic CK-4 Heavy Duty Engine Oils", "SAE 15W-40 Full Synthetic Heavy Duty Engine Oil"],
        },
        {
          tier: "ultimate",
          label: "ULTIMATE",
          positioning: "Extended-drain and severe-duty full synthetic",
          products: ["SAE 5W-40 Full Synthetic Heavy Duty Engine Oils"],
        },
      ],
    },
    chemistryGuidance: [
      "CK-4: primary mixed-fleet diesel category for 2017+ highway and most off-highway diesels unless OEM specifies otherwise.",
      "FA-4: lower HTHS fuel-economy category—only where OEM allows; not a universal bulk substitute for CK-4.",
      "Conventional vs synthetic blend vs full synthetic: oxidation and soot handling step-up—confirm with analysis.",
      "Low ash / natural gas: dedicated programs—do not assume CK-4 sulfur and ash are acceptable.",
    ],
    specificationGuidance: [
      "API CK-4 / FA-4 and OEM DFS / CES categories as documented on PDS.",
      "Viscometrics (15W-40, 10W-30 FA-4, 5W-40 synthetic) matched to climate and OEM.",
      "Emissions hardware (DPF, SCR) compatibility via API category and OEM lists only.",
    ],
    applicationGuidance: [
      "Highway Class 8: CK-4 bulk; FA-4 only on approved subsets; full synthetic for premium drains.",
      "Vocational and municipal: CK-4 synthetic blend common step-up from conventional.",
      "Mixed fleet yards: segment bulk tanks—do not merge FA-4 and CK-4 without labels.",
      "Natural gas engines: low-ash programs per PDS—not highway diesel habit.",
    ],
    flagshipProducts: [
      {
        id: "ck4-full-synthetic",
        name: "Full Synthetic CK-4 Heavy Duty Engine Oils",
        role: "flagship_premium",
        positioning: "BEST/ULTIMATE synthetic CK-4 for premium fleet and severe-duty programs.",
        hdVsLd: "hd",
      },
      {
        id: "ck4-synthetic-blend",
        name: "Synthetic Blend Heavy Duty Engine Oils",
        role: "better_tier_anchor",
        positioning: "BETTER step-up from conventional with CK-4 credentials on PDS.",
        hdVsLd: "hd",
      },
      {
        id: "commercial-formula-hdeo",
        name: "Commercial Formula Heavy Duty Engine Oils",
        role: "volume_entry",
        positioning: "GOOD conventional baseline—pair with analysis and API discipline.",
        hdVsLd: "hd",
      },
    ],
    categoryFamilies: [
      {
        id: "ck4_programs",
        label: "CK-4 programs",
        summary: "Primary diesel category—conventional through full synthetic.",
        examples: ["Commercial Formula", "Synthetic Blend", "15W-40 Full Synthetic CK-4"],
      },
      {
        id: "fa4_programs",
        label: "FA-4 programs",
        summary: "Fuel-economy HDEO where OEM permits—segment from CK-4 bulk.",
        examples: ["SAE 10W-30 FA-4 Synthetic Blend Heavy Duty Engine Oil"],
      },
      {
        id: "natural_gas_low_ash",
        label: "Natural gas & low ash",
        summary: "Specialty ash and sulfur programs for gas engines.",
        examples: ["Low Ash Natural Gas Engine Oils", "Mid Ash Sour Natural Gas Engine Oils"],
      },
    ],
  },
  {
    key: "gear_oil",
    label: "Gear Oils",
    categoryType: "ladder",
    flagshipPositioning: "Final drives and reducers need the right viscosity and EP — not 80W-90 habit.",
    categorySummary:
      "Gear oil is a compartment conversation: differentials, final drives, and enclosed reducers each get GL-5 or industrial EP per tag — walk the ladder on mobile and plant accounts.",
    customerProblemsSolved: [
      "Final drive wear when 80W-90 is used without reading the tag",
      "Foam and heat in enclosed reducers on the wrong EP level",
      "Gearbox failures trending before drains are scheduled",
      "Industrial boxes running automotive gear habits below required load",
    ],
    keySellingAngles: [
      "Pair gear with hydraulic quotes on the same mobile iron",
      "Ladder margin from commercial through full synthetic industrial EP",
      "Fewer reducer comebacks when viscosity matches tag",
      "Plant accounts discover specialty fills beyond AW bulk",
    ],
    keyTechnologyThemes: [
      "API GL-5 automotive and commercial gear",
      "Industrial EP enclosed gear lubricants",
      "Full synthetic gear and industrial EP synthetics",
      "Viscosity grade (75W-90, 80W-90, 85W-140, ISO VG industrial)",
    ],
    recommendedRepTalkingPoints: [
      "Are you seeing gearbox failures on mobile or plant iron?",
      "Is this a differential, final drive, or enclosed reducer?",
      "What viscosity and EP level are on the compartment tag?",
    ],
    discoveryFocus: [
      "Which compartment failed last — axle, final drive, or reducer?",
      "What viscosity is on the tag?",
    ],
    crossSellFocus: ["Hydraulic fluids", "Grease", "HD engine oil"],
    dealerNextSteps: [
      "Walk one final-drive tag on yard iron with the dealer manager",
      "Send this gear oil spotlight to the outside-sales rep",
      "Review gear SKUs on the mobile equipment PM sheet",
    ],
    cautions: [
      "Do not use industrial EP in yellow-metal or OEM-restricted applications without PDS review.",
      "GL-5 and MT-1 / non-EP specialties are not interchangeable—confirm application.",
    ],
    performanceLadder: {
      style: "performance",
      tiers: [
        {
          tier: "good",
          label: "GOOD",
          positioning: "Commercial differentials and standard final drives",
          products: ["Commercial Gear Lubricants"],
        },
        {
          tier: "better",
          label: "BETTER",
          positioning: "Industrial enclosed gear EP",
          products: ["Industrial EP Gear Lubricants"],
        },
        {
          tier: "best",
          label: "BEST",
          positioning: "Full synthetic gear programs",
          products: ["Full Synthetic Gear Lubricants"],
        },
        {
          tier: "ultimate",
          label: "ULTIMATE",
          positioning: "Full synthetic industrial EP severe duty",
          products: ["Full Synthetic Industrial EP Gear Lubricants"],
        },
      ],
    },
    chemistryGuidance: ["Match GL-5 vs industrial EP to the compartment tag and PDS."],
    specificationGuidance: ["Confirm viscosity grade on the tag before quoting."],
    applicationGuidance: [],
    flagshipProducts: [
      {
        id: "fs-industrial-ep-gear",
        name: "Full Synthetic Industrial EP Gear Lubricants",
        role: "flagship_ultimate",
        positioning: "ULTIMATE industrial reducer and severe-duty synthetic EP.",
        hdVsLd: "hd",
      },
      {
        id: "full-synthetic-gear",
        name: "Full Synthetic Gear Lubricants",
        role: "best_tier_anchor",
        positioning: "BEST synthetic for temperature swing and premium differentials.",
        hdVsLd: "mixed",
      },
      {
        id: "commercial-gear",
        name: "Commercial Gear Lubricants",
        role: "good_tier_anchor",
        positioning: "GOOD baseline commercial gear coverage.",
        hdVsLd: "mixed",
      },
    ],
    categoryFamilies: [
      {
        id: "automotive_commercial_gear",
        label: "Automotive & commercial gear",
        summary: "GL-5 commercial and full synthetic gear for differentials and drives.",
        examples: ["Commercial Gear Lubricants", "Full Synthetic Gear Lubricants"],
      },
      {
        id: "industrial_ep_gear",
        label: "Industrial EP gear",
        summary: "Enclosed industrial gear and reducer programs.",
        examples: ["Industrial EP Gear Lubricants", "Full Synthetic Industrial EP Gear Lubricants"],
      },
    ],
  },
  {
    key: "transmission",
    label: "Transmission & Driveline Fluids",
    categoryType: "program",
    flagshipPositioning: "Read the reservoir label first — transmission, wet brake, and driveline are not one red fluid.",
    categorySummary:
      "Stop one-size-fits-all tractor fluid habits: UTTO, wet brake, ATF, and driveline each get their own conversation — verified on tags and PDS.",
    customerProblemsSolved: [
      "Wet brake chatter after wrong fluid in a shared sump",
      "Shift complaints when ATF spec does not match the tag",
      "Powershift or tractor sumps filled with generic AW from bulk",
      "Driveline neglected on ag and vocational PM bundles",
    ],
    keySellingAngles: [
      "Fewer wet-brake and trans comebacks for the service lane",
      "Ag dealer PM bundles include trans-drive, not engine oil alone",
      "Counter staff coach compartments — not drum color",
      "Transmission discipline pulls grease, engine, and gear on the card",
    ],
    keyTechnologyThemes: [
      "Universal Transmission Fluid",
      "ATF (DEXRON / MERCON / OEM spec)",
      "Allison / TES approvals where PDS documents",
      "UTHF / wet brake / trans-drive",
      "Powershift transmission fluids",
      "Tractor hydraulic/transmission fluids",
    ],
    recommendedRepTalkingPoints: [
      "Which compartment are we filling — transmission, wet brake, hydraulic, or driveline?",
      "Are wet brakes noisy after the last fluid change?",
      "What ATF or builder spec letters are on the highway units?",
      "Are you stocking only universal red tractor fluid for every sump?",
    ],
    discoveryFocus: [
      "How many reservoir types are on the equipment tag?",
      "Where did wet brake noise show up last?",
    ],
    crossSellFocus: ["AGRIMAX trans-drive (ag)", "Gear oil (driveline)", "Grease", "Hydraulic AW (standalone circuits)"],
    dealerNextSteps: [
      "Run a lunch-and-learn on wet brake vs trans-drive",
      "Review ag seasonal PM bundle with the dealer manager",
      "Send this transmission spotlight to the outside-sales rep",
      "Assign transmission & wet brake fundamentals training",
    ],
    cautions: [
      "Do not claim Allison/TES approval unless the exact phrase appears on the PDS for that SKU.",
      "Do not put ATF in wet brake / UTHF reservoirs or vice versa without compatibility proof.",
      "Universal Transmission Fluid is not universal to every OEM compartment.",
    ],
    performanceLadder: {
      style: "program",
      tiers: [
        {
          tier: "awareness",
          label: "PROGRAM AWARENESS",
          positioning: "Teach fluid classes and compartment discipline",
          products: ["Universal Transmission Fluid", "Universal Red Tractor Fluid"],
        },
        {
          tier: "fit",
          label: "WHERE IT FITS",
          positioning: "Match wet brake, UTHF, and tractor programs",
          products: ["AGRIMAX Trans Drive Hydraulic Fluid", "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid"],
        },
        {
          tier: "opportunity",
          label: "REP OPPORTUNITY",
          positioning: "Correct misfills and spec upgrades",
          products: ["Arctic Tractor Fluid Synthetic Blend", "Multi-Viscosity AW Hydraulic Fluids"],
        },
        {
          tier: "cross_sell",
          label: "CROSS-SELL PATH",
          positioning: "Expand to grease, engine, gear on same card",
          products: ["RED TAC / MOLY TAC grease programs", "Commercial Gear Lubricants"],
        },
      ],
    },
    chemistryGuidance: [
      "ATF friction modifiers and spec families (DEXRON, MERCON, OEM) are not interchangeable.",
      "UTHF / wet brake fluids include friction modifiers for brake packs—AW hydraulics are not substitutes.",
      "Powershift fluids use different friction and anti-wear balance than highway ATF.",
      "Tractor fluids may combine hydraulic, transmission, and wet-brake duty—confirm on PDS.",
    ],
    specificationGuidance: [
      "OEM spec letters and Allison/TES only as documented on the PDS for that product.",
      "Do not extrapolate TES numbers across SKUs without PDS proof.",
      "Application lists on PDS override color and legacy brand habits.",
    ],
    applicationGuidance: [
      "Highway automatic transmissions: ATF to spec; Allison/TES conversations only with PDS support.",
      "Ag tractors and combines: UTHF / trans-drive / zinc-free where tags require.",
      "Wet brake systems: dedicated wet brake / UTHF chemistry—not generic AW.",
      "Powershift and heavy equipment transmissions: powershift-rated fluids per PDS.",
      "Driveline: gear oil programs separate from transmission compartment fills.",
    ],
    flagshipProducts: [
      {
        id: "universal-transmission-fluid",
        name: "Universal Transmission Fluid",
        role: "program_entry",
        positioning: "Entry only where PDS application chart supports—not every compartment.",
        hdVsLd: "mixed",
      },
      {
        id: "agrimax-trans-drive",
        name: "AGRIMAX Trans Drive Hydraulic Fluid",
        role: "ag_flagship",
        positioning: "Ag trans-drive / UTHF anchor where PDS lists tractor hydraulic and transmission duty.",
        hdVsLd: "mixed",
      },
      {
        id: "universal-red-tractor",
        name: "Universal Red Tractor Fluid",
        role: "tractor_anchor",
        positioning: "Tractor hydraulic/transmission baseline—verify wet-brake compatibility on tag.",
        hdVsLd: "mixed",
      },
    ],
    categoryFamilies: [
      {
        id: "atf_highway",
        label: "ATF / highway automatic",
        summary: "Automatic transmission fluids to OEM and Allison/TES where PDS supports.",
        examples: ["Universal Transmission Fluid"],
      },
      {
        id: "uthf_wet_brake",
        label: "UTHF / wet brake / trans-drive",
        summary: "Combined ag and off-highway compartments.",
        examples: ["AGRIMAX Trans Drive Hydraulic Fluid", "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid"],
      },
      {
        id: "tractor_hydraulic_trans",
        label: "Tractor hydraulic / transmission",
        summary: "Tractor fluids and seasonal arctic programs.",
        examples: ["Universal Red Tractor Fluid", "Arctic Tractor Fluid Synthetic Blend"],
      },
      {
        id: "powershift_driveline",
        label: "Powershift & driveline",
        summary: "Heavy-duty trans and companion gear programs.",
        examples: ["Multi-Viscosity AW Hydraulic Fluids", "Commercial Gear Lubricants"],
      },
    ],
  },
  {
    key: "coolant",
    label: "Coolants & Cooling System Chemistry",
    categoryType: "program",
    flagshipPositioning: "Too many coolants create confusion — one simple inhibitor strategy per bulk tank.",
    categorySummary:
      "Mixed fleets usually need a simple coolant strategy: OAT, NOAT, nitrite-free Gold, or universal — with top-off and contamination discipline, not drum color.",
    customerProblemsSolved: [
      "Top-off confusion after partial drains or roadside emergencies",
      "Universal green in HD diesel radiators without NOAT verification",
      "Mixed-chemistry hoses between automotive OAT and HD NOAT bulk",
      "Premix ratio and water quality mistakes at the bulk blender",
    ],
    keySellingAngles: [
      "Fewer gel and comeback calls when inhibitor families are separated",
      "PM revenue on flush, test strips, and seasonal coolant bundles",
      "Counter can explain OAT vs NOAT vs nitrite-free — not color",
      "Coolant completes HD engine lane programs",
    ],
    keyTechnologyThemes: [
      "OAT (organic acid technology) automotive and ELC",
      "NOAT (nitrite organic acid technology) heavy-duty diesel",
      "Nitrite-free OAT (Gold) for mixed fleet / all-engines per PDS",
      "Universal / conventional entry programs",
      "Extended-life coolant program management",
      "HOAT / Commercial HD programs where PDS lists them",
    ],
    recommendedRepTalkingPoints: [
      "Do you stock coolant on the same program as HD engine oil?",
      "What inhibitor family is in each bulk tank today?",
      "What top-off chemistry was used after the last partial drain?",
      "Are automotive OAT and HD NOAT hoses separated at the rack?",
    ],
    discoveryFocus: [
      "Which bulk tanks serve HD vs light-duty?",
      "What caused the last coolant comeback?",
    ],
    crossSellFocus: ["HD engine oil", "Grease", "Chemicals (brake, steering, flush)"],
    dealerNextSteps: [
      "Post bulk-tank labels by inhibitor family with the dealer manager",
      "Run a lunch-and-learn on top-off and flush discipline",
      "Review seasonal coolant PM SKUs",
      "Send this coolant spotlight to the outside-sales rep",
      "Prepare a business review on mixed-fleet coolant strategy",
    ],
    cautions: [
      "NEVER label Gold OAT ELC as light-duty only—PDS positions nitrite-free all-engines / mixed fleet.",
      "Do not top off NOAT with OAT or universal without flush and compatibility procedure.",
      "Do not promise OEM approvals not on the PDS.",
      "Do not assume one green drum fits every radiator.",
    ],
    performanceLadder: {
      style: "program",
      tiers: [
        {
          tier: "awareness",
          label: "PROGRAM AWARENESS",
          positioning: "Teach inhibitor families and fleet separation",
          products: ["Green Universal Antifreeze Coolant", "Commercial HD NOAT ELC Antifreeze Coolant"],
        },
        {
          tier: "fit",
          label: "WHERE IT FITS",
          positioning: "OAT automotive and nitrite-free mixed fleet",
          products: ["Yellow Automotive OAT ELC Antifreeze Coolant", "Gold Automotive OAT ELC Antifreeze Coolant"],
        },
        {
          tier: "opportunity",
          label: "REP OPPORTUNITY",
          positioning: "HD NOAT ELC and program standardization",
          products: ["Red Heavy Duty NOAT ELC Antifreeze Coolant"],
        },
        {
          tier: "cross_sell",
          label: "CROSS-SELL PATH",
          positioning: "Service lane companions",
          products: ["Power Steering Fluid", "Universal DOT 5.1 Synthetic Brake Fluid"],
        },
      ],
    },
    chemistryGuidance: ["Match inhibitor family to equipment tag — verify on PDS before top-off."],
    specificationGuidance: ["Separate bulk tanks by OAT, NOAT, nitrite-free Gold, and universal."],
    applicationGuidance: [],
    flagshipProducts: [
      {
        id: "gold-oat-elc",
        name: "Gold Automotive OAT ELC Antifreeze Coolant",
        role: "flagship_nitrite_free",
        positioning: "Flagship nitrite-free OAT ELC for mixed fleet / all-engines—never light-duty only labeling.",
        hdVsLd: "hd",
      },
      {
        id: "red-noat-elc",
        name: "Red Heavy Duty NOAT ELC Antifreeze Coolant",
        role: "hd_noat_anchor",
        positioning: "Classic HD diesel NOAT ELC with nitrite for liner protection where specified.",
        hdVsLd: "hd",
      },
      {
        id: "commercial-hd-noat",
        name: "Commercial HD NOAT ELC Antifreeze Coolant",
        role: "hd_program_bulk",
        positioning: "Commercial HD NOAT bulk program baseline.",
        hdVsLd: "hd",
      },
    ],
    categoryFamilies: [
      {
        id: "oat_automotive",
        label: "OAT automotive",
        summary: "Light-duty automotive OAT ELC programs.",
        examples: ["Yellow Automotive OAT ELC Antifreeze Coolant"],
      },
      {
        id: "nitrite_free_oat",
        label: "Nitrite-free OAT (Gold)",
        summary: "Flagship nitrite-free extended-life for mixed fleet / all-engines per PDS.",
        examples: ["Gold Automotive OAT ELC Antifreeze Coolant"],
      },
      {
        id: "noat_hd",
        label: "NOAT heavy-duty",
        summary: "HD diesel NOAT ELC programs with nitrite where specified.",
        examples: ["Red Heavy Duty NOAT ELC Antifreeze Coolant", "Commercial HD NOAT ELC Antifreeze Coolant"],
      },
      {
        id: "universal_conventional",
        label: "Universal / conventional",
        summary: "Entry universal programs—upgrade with compatibility discipline.",
        examples: ["Green Universal Antifreeze Coolant"],
      },
    ],
  },
  {
    key: "agrimax",
    label: "AGRIMAX",
    categoryType: "program",
    flagshipPositioning:
      "John Deere / Case IH equipment — same spec, same protection, save money where PDS supports (not OEM endorsement).",
    categorySummary:
      "AGRIMAX helps ag dealers sell seasonal PM: wet brake discipline, trans-drive, and spec conversations only where tags and PDS support — not one red drum for every sump.",
    customerProblemsSolved: [
      "Wet brake chatter after the wrong fluid in a shared sump",
      "One red tractor fluid quoted for every compartment",
      "Seasonal PM kits missing trans-drive, grease, or coolant",
      "Customers paying OEM premium without tag proof",
    ],
    keySellingAngles: [
      "Counter margin on full-line PM bundles vs single-SKU habits",
      "Fewer wet-brake callbacks after service season",
      "Staff can explain spec match — not imply OEM endorsement",
      "Seasonal bulk revenue on planting and harvest windows",
    ],
    keyTechnologyThemes: [
      "AGRIMAX Trans Drive Hydraulic Fluid",
      "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
      "AGRIMAX CK-4 synthetic blend engine oils",
      "AGRIMAX grease and coolant companions",
      "OEM spec alignment (JD/CNH where PDS supports)",
    ],
    recommendedRepTalkingPoints: [
      "What are customers using today in the trans-hydraulic sump?",
      "Are customers asking for OEM-branded fluids?",
      "Are wet brakes noisy after the last fluid change?",
      "What's in today's harvest bundle beyond engine oil and filters?",
      "Which John Deere / Case IH models drive your seasonal PM volume?",
    ],
    discoveryFocus: [
      "Are wet brakes noisy?",
      "What fluid types do equipment tags require?",
      "What is missing from spring or harvest PM kits?",
    ],
    crossSellFocus: [
      "Gear oil — loaders and support iron",
      "Bar & chain / drip oil — shop programs where PDS lists forestry duty",
      "Grease — field and chassis PM",
      "Coolant — seasonal flush companions",
    ],
    dealerNextSteps: [
      "Run a lunch-and-learn on reservoir maps for counter staff",
      "Review seasonal PM SKU list with the dealer manager",
      "Send this AGRIMAX spotlight to the outside-sales rep",
      "Prepare a business review on ag line depth vs competitor single-SKU habits",
      "Assign transmission & wet brake training before planting rush",
    ],
    cautions: [
      "Do not claim JD/CNH approval without exact PDS/OEM documentation.",
      "Do not assume red tractor fluid fits every compartment.",
      "Wet brake issues require fluid class review before parts replacement narrative.",
    ],
    performanceLadder: {
      style: "program",
      tiers: [
        {
          tier: "awareness",
          label: "PROGRAM AWARENESS",
          positioning: "Introduce AGRIMAX line and reservoir map",
          products: ["AGRIMAX Trans Drive Hydraulic Fluid", "Universal tractor / trans-hydraulic fluids"],
        },
        {
          tier: "fit",
          label: "WHERE IT FITS",
          positioning: "Zinc-free and spec-correct trans-drive",
          products: ["AGRIMAX Zinc Free Trans Drive Hydraulic Fluid"],
        },
        {
          tier: "opportunity",
          label: "REP OPPORTUNITY",
          positioning: "Engine, grease, and seasonal PM",
          products: [
            "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil",
            "AGRIMAX Poly Tac / multipurpose grease programs",
          ],
        },
        {
          tier: "cross_sell",
          label: "CROSS-SELL PATH",
          positioning: "Coolant and field grease companions",
          products: ["AGRIMAX Extended Life Coolant programs", "RED TAC / field grease companions"],
        },
      ],
    },
    chemistryGuidance: ["Verify wet-brake and trans-drive chemistry on PDS before recommending any SKU."],
    specificationGuidance: ["OEM spec language only where the current PDS documents it."],
    applicationGuidance: [],
    flagshipProducts: [
      {
        id: "agrimax-trans-drive",
        name: "AGRIMAX Trans Drive Hydraulic Fluid",
        role: "flagship_program",
        positioning: "Primary ag trans-drive / UTHF anchor per PDS application lists.",
        hdVsLd: "mixed",
      },
      {
        id: "agrimax-zinc-free-trans-drive",
        name: "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
        role: "spec_upgrade",
        positioning: "Zinc-free trans-drive where tags and PDS require.",
        hdVsLd: "mixed",
      },
      {
        id: "agrimax-ck4-engine",
        name: "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil",
        role: "engine_companion",
        positioning: "Seasonal CK-4 engine protection on ag diesel programs.",
        hdVsLd: "hd",
      },
    ],
    categoryFamilies: [
      {
        id: "trans_drive_uthf",
        label: "Trans-drive / UTHF",
        summary: "Combined transmission, hydraulic, and wet-brake duty where PDS supports.",
        examples: ["AGRIMAX Trans Drive Hydraulic Fluid", "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid"],
      },
      {
        id: "engine_ck4",
        label: "Engine CK-4",
        summary: "Ag diesel engine programs.",
        examples: ["AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil"],
      },
      {
        id: "grease_coolant_companions",
        label: "Grease & coolant companions",
        summary: "Seasonal PM completion products.",
        examples: ["AGRIMAX Poly Tac Grease", "AGRIMAX Extended Life Coolant programs"],
      },
    ],
  },
  {
    key: "food_grade",
    label: "Food-Grade Lubricants",
    categoryType: "program",
    flagshipPositioning: "Audit-ready H1 programs — map zones before quoting any SKU.",
    categorySummary:
      "Food plants need simple H1 discipline: which zones require registration, what is on the shelf, and washdown-ready greases and hydraulics per PDS.",
    customerProblemsSolved: [
      "Non-H1 fluid in food-adjacent manifolds before an audit",
      "Washdown stripping grease off bearings and conveyors",
      "Shelf labels that do not match NSF registration on the PDS",
      "Maintenance borrowing industrial AW during a weekend stop",
    ],
    keySellingAngles: [
      "Pass audits with labeled H1 inventory at each manifold",
      "Plant-wide program beyond one hydraulic drum",
      "Counter staff quote registration numbers from the PDS",
      "Keep the account off farm-store substitutes in food zones",
    ],
    keyTechnologyThemes: [
      "NSF H1 registration (where PDS supports)",
      "Food-grade hydraulic, grease, and gear",
      "Food-grade compressor and circulating oils",
      "Food-grade chain and conveyor lubricants",
      "Washdown and wet environment performance",
    ],
    recommendedRepTalkingPoints: [
      "Which zones require H1 vs general plant fluids?",
      "What did your last audit flag on lubrication?",
      "Are H1 and non-H1 bulk tanks hose-separated?",
      "What compressor and chain fills are in scope for the next audit?",
    ],
    discoveryFocus: [
      "When is the next customer audit?",
      "Which circuits are food-adjacent on your diagram?",
    ],
    crossSellFocus: ["H1 grease", "H1 gear & compressor", "H1 chain / conveyor (where PDS supports)"],
    dealerNextSteps: [
      "Post H1 SKU labels at food-adjacent manifolds",
      "Schedule a plant zone walk with the dealer manager",
      "Send this food-grade spotlight to the outside-sales rep",
      "Assign food-grade basics training before the audit window",
    ],
    cautions: [
      "Do not claim NSF H1 without registration documentation on the PDS for that product.",
      "H1 is not interchangeable with H2 or general industrial oils in regulated zones.",
      "Do not promise FDA approval beyond what PDS states.",
    ],
    performanceLadder: {
      style: "program",
      tiers: [
        {
          tier: "awareness",
          label: "PROGRAM AWARENESS",
          positioning: "Introduce H1 plant mapping",
          products: ["FOOD-GRADE Hydraulic Oils"],
        },
        {
          tier: "fit",
          label: "WHERE IT FITS",
          positioning: "H1 grease and bearing programs",
          products: ["FOOD-GRADE EP-2 Grease", "FOOD-GRADE multipurpose grease programs"],
        },
        {
          tier: "opportunity",
          label: "REP OPPORTUNITY",
          positioning: "Gear and circulating expansion",
          products: ["FOOD-GRADE Gear Oils", "FOOD-GRADE industrial gear programs"],
        },
        {
          tier: "cross_sell",
          label: "CROSS-SELL PATH",
          positioning: "Compressor and chain specialties",
          products: ["FOOD-GRADE compressor & circulating oils", "FOOD-GRADE chain / conveyor lubricants"],
        },
      ],
    },
    chemistryGuidance: ["Quote NSF H1 only when registration appears on the PDS for that SKU."],
    specificationGuidance: ["Document SKU-to-zone mapping before the audit."],
    applicationGuidance: [],
    flagshipProducts: [
      {
        id: "food-grade-hydraulic",
        name: "FOOD-GRADE Hydraulic Oils",
        role: "flagship_program",
        positioning: "H1 hydraulic anchor where PDS registers H1.",
        hdVsLd: "na",
      },
      {
        id: "food-grade-ep2-grease",
        name: "FOOD-GRADE EP-2 Grease",
        role: "grease_anchor",
        positioning: "H1 EP grease for bearings and washdown environments.",
        hdVsLd: "na",
      },
      {
        id: "food-grade-chain",
        name: "FOOD-GRADE chain / conveyor lubricants",
        role: "specialty_companion",
        positioning: "H1 chain and conveyor programs where PDS supports.",
        hdVsLd: "na",
      },
    ],
    categoryFamilies: [
      {
        id: "h1_hydraulic",
        label: "H1 hydraulic",
        summary: "Registered H1 hydraulic programs for food plants.",
        examples: ["FOOD-GRADE Hydraulic Oils"],
      },
      {
        id: "h1_grease",
        label: "H1 grease",
        summary: "H1 greases for bearings and chassis in food facilities.",
        examples: ["FOOD-GRADE EP-2 Grease"],
      },
      {
        id: "h1_gear_compressor_chain",
        label: "H1 gear, compressor & chain",
        summary: "Complete plant H1 coverage beyond hydraulics.",
        examples: ["FOOD-GRADE Gear Oils", "FOOD-GRADE compressor & circulating oils", "FOOD-GRADE chain lubricants"],
      },
    ],
  },
  {
    key: "environmental_eal",
    label: "Environmental / EAL Lubricants",
    categoryType: "program",
    flagshipPositioning: "Sensitive sites need documented ENVIRO / BIO / EAL programs — not marketing greenwash.",
    categorySummary:
      "When spills, contracts, or watershed rules apply, match ENVIRO entry through BIO-Synthetic EAL per PDS — pair with containment, not vague eco claims.",
    customerProblemsSolved: [
      "Spill risk on forestry roads, parks, and waterways",
      "Customer bid language requiring biodegradable or EAL proof",
      "Generic AW quoted where regulations require documentation",
      "Marine and municipal accounts without a mapped Klondike EAL program",
    ],
    keySellingAngles: [
      "Win sensitive-site bids with PDS environmental language",
      "Step-up margin from ENVIRO through BIO-Synthetic EAL",
      "Pair with forestry and marine customer profiles",
      "Keep standard AW on non-sensitive iron on the same contractor card",
    ],
    keyTechnologyThemes: [
      "ENVIRO inherently biodegradable hydraulic fluids",
      "BIO biodegradable AW and synthetic blend hydraulics",
      "BIO-Synthetic EAL hydraulic oils",
      "HEES and HFDU specialty fluids",
      "Biodegradable rock drill and niche applications",
    ],
    recommendedRepTalkingPoints: [
      "What site, spill, or contract language triggers biodegradable review?",
      "What are you using in hydraulics on sensitive blocks today?",
      "Do you need documentation for a bid or regulator?",
      "Which equipment stays on standard AW vs EAL duty?",
    ],
    discoveryFocus: [
      "Where is the next job near water or parkland?",
      "What does the customer spec sheet require?",
    ],
    crossSellFocus: ["Standard hydraulic AW (non-sensitive iron)", "Grease", "Industrial specialty (plant)"],
    dealerNextSteps: [
      "Review ENVIRO / BIO ladder with the dealer manager",
      "Send this environmental spotlight for the next forestry or marine bid",
      "Assign fundamentals training on PDS environmental claims",
    ],
    cautions: [
      "Do not claim biodegradable or EAL performance beyond PDS environmental statements.",
      "Do not substitute EAL in all hydraulics without OEM and regulation review.",
      "'Environmentally friendly' is not a spec—use PDS terminology only.",
    ],
    performanceLadder: {
      style: "program",
      tiers: [
        {
          tier: "awareness",
          label: "PROGRAM AWARENESS",
          positioning: "Introduce ENVIRO sensitive-site baseline",
          products: ["ENVIRO Inherently Biodegradable AW Hydraulic Fluids"],
        },
        {
          tier: "fit",
          label: "WHERE IT FITS",
          positioning: "BIO AW and HEES programs",
          products: ["BIO Biodegradable AW Hydraulic Fluids", "BIO Hees Hydraulic Fluids"],
        },
        {
          tier: "opportunity",
          label: "REP OPPORTUNITY",
          positioning: "Premium EAL and synthetic blend biodegradability",
          products: ["BIO-Synthetic EAL Hydraulic Oils", "BIO Biodegradable Synthetic Blend Hydraulic Fluids"],
        },
        {
          tier: "cross_sell",
          label: "CROSS-SELL PATH",
          positioning: "Niche drill and HFDU specialties",
          products: ["Bio HFDU Hydraulic Fluids", "BIO Biodegradable Rock Drill Oil"],
        },
      ],
    },
    chemistryGuidance: [
      "Inherently biodegradable vs readily biodegradable claims—use exact PDS language.",
      "EAL (environmentally acceptable lubricant) positioning per PDS and application—not generic 'bio' labels.",
      "HEES and HFDU are specialty chemistries with specific equipment lists on PDS.",
    ],
    specificationGuidance: [
      "Environmental classifications and test references only as printed on PDS.",
      "Customer and regulatory spec sheets override rep assumptions.",
      "Marine and forestry OEM lists where PDS documents them.",
    ],
    applicationGuidance: [
      "Forestry and logging mobile hydraulics: ENVIRO/BIO ladder per site risk.",
      "Marine and dredging: EAL hydraulic and companion programs per PDS.",
      "Municipal parks and watershed contractors: ENVIRO baseline with documentation.",
      "Rock drill and specialty equipment: BIO rock drill oil where PDS lists application.",
    ],
    flagshipProducts: [
      {
        id: "bio-synthetic-eal",
        name: "BIO-Synthetic EAL Hydraulic Oils",
        role: "flagship_eal",
        positioning: "Premium EAL hydraulic positioning where PDS supports environmentally acceptable claims.",
        hdVsLd: "mixed",
      },
      {
        id: "enviro-biodegradable-aw",
        name: "ENVIRO Inherently Biodegradable AW Hydraulic Fluids",
        role: "sensitive_site_entry",
        positioning: "ENVIRO entry for sensitive-site and regulatory conversations.",
        hdVsLd: "mixed",
      },
      {
        id: "bio-biodegradable-aw",
        name: "BIO Biodegradable AW Hydraulic Fluids",
        role: "program_step_up",
        positioning: "BIO step-up biodegradable AW programs.",
        hdVsLd: "mixed",
      },
    ],
    categoryFamilies: [
      {
        id: "enviro_entry",
        label: "ENVIRO",
        summary: "Inherently biodegradable AW/MV baselines.",
        examples: ["ENVIRO Inherently Biodegradable AW Hydraulic Fluids", "ENVIRO Inherently Biodegradable MV Hydraulic Fluids"],
      },
      {
        id: "bio_programs",
        label: "BIO",
        summary: "Biodegradable AW, synthetic blend, and HEES programs.",
        examples: ["BIO Biodegradable AW Hydraulic Fluids", "BIO Hees Hydraulic Fluids"],
      },
      {
        id: "eal_premium",
        label: "EAL premium",
        summary: "BIO-Synthetic EAL and HFDU specialties.",
        examples: ["BIO-Synthetic EAL Hydraulic Oils", "Bio HFDU Hydraulic Fluids"],
      },
    ],
  },
  {
    key: "industrial_specialty",
    label: "Industrial Specialty Oils",
    categoryType: "program",
    flagshipPositioning: "Plant walk first — turbine, compressor, and reducer fills are not mobile AW.",
    categorySummary:
      "Ask what is in each sump before quoting: turbine R&O, compressor fluid, industrial gear, and mobile AW are separate programs per PDS.",
    customerProblemsSolved: [
      "AW mistakenly used in turbine or compressor sumps",
      "Compressor varnish when the wrong oil class is in service",
      "Reducers on automotive gear habits below plant load",
      "Plant buyers who only know mobile hydraulic SKUs",
    ],
    keySellingAngles: [
      "Discover turbine and compressor lines the dealer did not know we carry",
      "Plant program margin beyond one AW bulk tank",
      "Pair specialty fills with mobile AW on material-handling iron",
      "ENVIRO / BIO where plant contracts require sensitive-site fluids",
    ],
    keyTechnologyThemes: [
      "R&O turbine and circulating oils",
      "Compressor and air system fluids",
      "Industrial EP gear lubricants",
      "Rock drill and specialty industrial fluids",
      "Crossover to ENVIRO/BIO where plant specs require",
    ],
    recommendedRepTalkingPoints: [
      "Is this reservoir turbine, compressor, gear, or hydraulic?",
      "What oil class is in the compressor today?",
      "Are you seeing varnish or moisture on rotating equipment?",
      "What specialty fills are still sourced outside Klondike?",
    ],
    discoveryFocus: [
      "Which rotating assets have the longest drain intervals?",
      "Are compressor and turbine on the same supplier program as hydraulics?",
    ],
    crossSellFocus: ["Mobile hydraulic AW", "Food-grade (food zones only)", "Grease"],
    dealerNextSteps: [
      "Schedule a plant fill-point walk with the dealer manager",
      "Send this industrial specialty spotlight to the rep",
      "Review turbine and compressor SKUs on the plant list",
    ],
    cautions: [
      "Do not use AW hydraulic fluid in turbine, R&O, or compressor applications without PDS approval.",
      "Industrial EP gear is not for every yellow-metal application—check PDS.",
    ],
    performanceLadder: {
      style: "program",
      tiers: [
        {
          tier: "awareness",
          label: "PROGRAM AWARENESS",
          positioning: "Teach turbine vs hydraulic separation",
          products: ["Long Life Turbine Oils", "Full Synthetic Circulating Compressor Turbine Oils"],
        },
        {
          tier: "fit",
          label: "WHERE IT FITS",
          positioning: "Industrial gear and plant reducers",
          products: ["Industrial EP Gear Lubricants"],
        },
        {
          tier: "opportunity",
          label: "REP OPPORTUNITY",
          positioning: "Environmental and drill specialties",
          products: ["BIO Biodegradable Rock Drill Oil", "ENVIRO Inherently Biodegradable MV Hydraulic Fluids"],
        },
        {
          tier: "cross_sell",
          label: "CROSS-SELL PATH",
          positioning: "Plant mobile hydraulics and grease",
          products: ["Professional Hydraulic Fluids", "Multi-Purpose Grease"],
        },
      ],
    },
    chemistryGuidance: ["Turbine R&O and compressor fluids are not AW — verify on PDS."],
    specificationGuidance: ["Match oil class to reservoir label before quoting."],
    applicationGuidance: [],
    flagshipProducts: [
      {
        id: "long-life-turbine",
        name: "Long Life Turbine Oils",
        role: "flagship_turbine",
        positioning: "Turbine and circulating R&O anchor for plant programs.",
        hdVsLd: "na",
      },
      {
        id: "fs-circulating-compressor",
        name: "Full Synthetic Circulating Compressor Turbine Oils",
        role: "premium_circulating",
        positioning: "Premium synthetic circulating and compressor-turbine duty per PDS.",
        hdVsLd: "na",
      },
      {
        id: "industrial-ep-gear",
        name: "Industrial EP Gear Lubricants",
        role: "gear_anchor",
        positioning: "Industrial enclosed gear programs in plant accounts.",
        hdVsLd: "na",
      },
    ],
    categoryFamilies: [
      {
        id: "turbine_circulating",
        label: "Turbine & circulating",
        summary: "R&O programs for rotating plant equipment.",
        examples: ["Long Life Turbine Oils", "Full Synthetic Circulating Compressor Turbine Oils"],
      },
      {
        id: "industrial_gear",
        label: "Industrial gear",
        summary: "Enclosed reducer and industrial gear programs.",
        examples: ["Industrial EP Gear Lubricants", "Full Synthetic Industrial EP Gear Lubricants"],
      },
      {
        id: "specialty_enviro",
        label: "Specialty & environmental",
        summary: "Rock drill and ENVIRO/BIO crossover in plant specs.",
        examples: ["BIO Biodegradable Rock Drill Oil", "ENVIRO Inherently Biodegradable MV Hydraulic Fluids"],
      },
    ],
  },
];

/** @type {Readonly<Record<string, CategoryProgramIntelligence>>} */
export const CATEGORY_PROGRAM_INTELLIGENCE_MAP = Object.freeze(
  CATEGORY_PROGRAM_INTELLIGENCE_LIST.reduce((acc, entry) => {
    const enriched = attachCategoryOemSpecCoaching(entry);
    acc[enriched.key] = enriched;
    return acc;
  }, /** @type {Record<string, CategoryProgramIntelligence>} */ ({}))
);

export const CATEGORY_PROGRAM_INTELLIGENCE = Object.freeze(
  CATEGORY_PROGRAM_INTELLIGENCE_LIST.map((entry) => attachCategoryOemSpecCoaching(entry))
);

const KEY_ALIASES = Object.freeze({
  hydraulic: "hydraulic",
  grease: "grease",
  hd_engine_oil: "hd_engine_oil",
  hdengine: "hd_engine_oil",
  hd_engine: "hd_engine_oil",
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
 * @param {unknown} rawKey
 * @returns {string}
 */
function normalizeCategoryProgramKey(rawKey) {
  if (rawKey === null || rawKey === undefined) return "";
  const compact = String(rawKey).trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (!compact) return "";
  return KEY_ALIASES[compact] || compact;
}

/**
 * @param {unknown} key
 * @returns {CategoryProgramIntelligence | null}
 */
export function getCategoryProgramIntelligence(key) {
  const normalized = normalizeCategoryProgramKey(key);
  if (!normalized) return null;
  return CATEGORY_PROGRAM_INTELLIGENCE_MAP[normalized] || null;
}

/**
 * @returns {CategoryProgramIntelligence[]}
 */
export function listCategoryProgramIntelligence() {
  return [...CATEGORY_PROGRAM_INTELLIGENCE];
}
