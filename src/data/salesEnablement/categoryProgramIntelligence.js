/**
 * Phase 6F.10 — Deterministic category program intelligence registry (foundation).
 * Approved positioning facts for sales enablement; AI may rewrite language but must not invent category strategy.
 * Not wired to UI, sends, or resolvers yet.
 */

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
 * }} CategoryProgramIntelligence
 */

/** @type {CategoryProgramIntelligence[]} */
const CATEGORY_PROGRAM_INTELLIGENCE_LIST = [
  {
    key: "hydraulic",
    label: "Hydraulic Fluids",
    categoryType: "ladder",
    flagshipPositioning:
      "XVI Synthetic Hydraulic Fluids anchor premium pump protection; Professional and Advanced Formula AW tiers cover bulk fleet and industrial baselines with documented ISO VG discipline.",
    categorySummary:
      "Hydraulic is a viscosity-grade and duty-class category: match ISO VG to tags, separate bulk top-off behavior from packaged fills, and ladder from commercial AW through multi-viscosity, tractor/wet-brake, severe-duty, and turbine/circulating programs.",
    customerProblemsSolved: [
      "Pump wear and varnish from wrong ISO VG or neglected fluid analysis.",
      "Seasonal cold-start sluggishness where single-grade AW is stretched past its comfort zone.",
      "Cross-contamination when tractor, industrial, and mobile bulk tanks share hoses without discipline.",
      "Downtime on turbines and circulating systems running generic AW instead of R&O turbine oils.",
    ],
    keySellingAngles: [
      "ISO VG and pump tag discipline before price.",
      "Professional Formula for value bulk; Advanced Formula for step-up protection.",
      "Multi-Viscosity AW for seasonal fleets and temperature swing.",
      "XVI Synthetic for premium mobile and severe-duty pump life conversations.",
      "Tractor / wet-brake and universal red tractor fluid only where application charts allow.",
      "Long Life Turbine and circulating oils for plant air, compressors, and R&O circuits—not AW in a turbine reservoir.",
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
      "What ISO VG tags, bulk tanks, and top-off practices exist on this account?",
      "Where are they losing hours—cold start, pump noise, varnish, or contamination?",
      "Separate mobile AW bulk from turbine and circulating reservoirs before quoting one drum.",
      "Ladder Professional → Advanced → MV → XVI where duty and analysis support the step-up.",
    ],
    discoveryFocus: [
      "Equipment types, pump OEM tags, and ISO VG requirements",
      "Bulk vs packaged buying and hose discipline between tanks",
      "Fluid analysis history and varnish/water issues",
      "Seasonal temperature range and cold-start complaints",
      "Tractor, skid-steer, or mixed ag/industrial assets on the same card",
    ],
    crossSellFocus: [
      "Grease programs on the same mobile fleet card",
      "HD engine oil where highway and off-road assets share the yard",
      "ENVIRO / BIO / EAL hydraulics for forestry, marine, and sensitive sites",
      "Industrial specialty turbine and compressor oils in plant accounts",
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
    chemistryGuidance: [
      "AW (anti-wear) zinc chemistry is the default mobile and industrial hydraulic conversation—match additive class to OEM and PDS.",
      "Multi-viscosity AW uses polymer thickeners for broader temperature windows—confirm pump and hose compatibility on the PDS.",
      "Synthetic and synthetic-blend hydraulics (XVI) for premium oxidation stability and cold flow where documented.",
      "R&O turbine oils are not interchangeable with AW—different inhibitor and wear packages.",
    ],
    specificationGuidance: [
      "Lead with ISO VG on tags and bulk purchase orders before brand habit.",
      "Reference DIN 51524 / ISO 11158 / OEM sheets only where the PDS documents them.",
      "Fluid analysis (particle count, water, oxidation) supports upgrade conversations—not guesswork.",
    ],
    applicationGuidance: [
      "Mobile equipment, presses, and industrial power units: AW ladder by duty and analysis.",
      "Tractor and skid-steer hydraulics: confirm wet-brake and transmission compatibility before UTHF fills.",
      "Turbines, compressors, and circulating systems: turbine/R&O products per PDS—not generic AW.",
      "Severe-duty and cold climates: MV AW or XVI synthetic where tags and PDS allow.",
    ],
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
    flagshipPositioning:
      "nano Calcium Sulfonate and nano Lithium Complex Synthetic greases anchor ULTIMATE severe-duty; RED TAC and HD TAC are GOOD baselines; MOLY TAC 3% is BETTER; ULTRA TAC and MOLY TAC HD 5% are BEST.",
    categorySummary:
      "Grease is NLGI grade, thickener, and moly level discipline: ladder from multipurpose RED TAC / HD TAC through moly EP, synthetic blend EP, to nano sulfonate and nano lithium complex synthetic for shock, water, and load.",
    customerProblemsSolved: [
      "Pin and bearing failures from wrong NLGI or thickener family in auto-lube lines.",
      "Washout and water ingress on wet shifts and wash-down routes.",
      "Shock-load metal loss where commodity EP-2 is treated as interchangeable.",
      "Centralized lube systems pumping grease incompatible with OEM thickener charts.",
    ],
    keySellingAngles: [
      "RED TAC / HD TAC = GOOD multipurpose and HD chassis entry.",
      "MOLY TAC 3% = BETTER moly-fortified EP for implements and shock loads.",
      "ULTRA TAC and MOLY TAC HD 5% = BEST synthetic blend and high-moly severe duty.",
      "nano Calcium Sulfonate / nano Lithium Complex Synthetic = ULTIMATE published EP and washout story.",
      "Match NLGI and thickener to OEM charts before price on auto-lube and bulk.",
    ],
    keyTechnologyThemes: [
      "Lithium and lithium complex thickeners",
      "Moly-fortified EP (3% and 5% moly programs)",
      "Synthetic blend and full synthetic EP greases",
      "Calcium sulfonate complex (nano) for shock, water, and load",
      "Bentone and specialty high-temp greases where PDS supports",
    ],
    recommendedRepTalkingPoints: [
      "Walk the zerk map: load, water, temperature, and central lube compatibility.",
      "Name the ladder tier before SKU—GOOD/BETTER/BEST/ULTIMATE is the enablement story.",
      "Use PDS Timken, 4-ball, and washout numbers on premium tiers—not 'heavier is better.'",
      "Do not auto-lube a new thickener family without OEM confirmation.",
    ],
    discoveryFocus: [
      "NLGI grade and thickener on OEM charts and auto-lube labels",
      "Worst joints: wet booms, crushers, chassis, fifth wheel, open gear",
      "Wash-down and water exposure routines",
      "Current grease board habits and 'all EP-2 is the same' behavior",
    ],
    crossSellFocus: [
      "HD engine oil on vocational fleets sharing the grease program",
      "Hydraulic AW on mobile assets using the same yard",
      "Gear oil on drivetrain and reducer accounts",
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
    chemistryGuidance: [
      "GOOD: RED TAC / HD TAC multipurpose lithium programs for baseline chassis and bearings.",
      "BETTER: MOLY TAC 3% — lithium complex with 3% moly for shock and implement duty.",
      "BEST: ULTRA TAC synthetic blend EP; MOLY TAC HD 5% for higher moly severe service.",
      "ULTIMATE: nano calcium sulfonate and nano lithium complex synthetic—use PDS EP, Timken, and washout language only.",
    ],
    specificationGuidance: [
      "Confirm NLGI grade and thickener family on OEM charts before quoting.",
      "Reference Timken OK, 4-ball weld, and water washout only as printed on the PDS.",
      "Auto-lube and bulk systems require compatibility review for thickener changes.",
    ],
    applicationGuidance: [
      "Chassis, pins, and U-joints: ladder from RED TAC / HD TAC upward by load and water.",
      "Implements and shock loads: MOLY TAC 3% and MOLY TAC HD 5% where moly EP is approved.",
      "Crushers, hammers, and wet severe pins: nano ULTIMATE tiers where PDS supports the duty.",
    ],
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
    flagshipPositioning:
      "Full Synthetic CK-4 and SAE 5W-40 full synthetic anchor premium highway and severe-duty; Commercial Formula conventional and synthetic blend CK-4/FA-4 cover mixed fleet baselines.",
    categorySummary:
      "HD engine oil is API CK-4 / FA-4 and OEM drain-interval discipline: ladder conventional → synthetic blend → full synthetic CK-4, with FA-4 only where OEM and emissions hardware allow; mixed-fleet and natural-gas programs need ash and sulfur conversations on the PDS.",
    customerProblemsSolved: [
      "Wrong API category (CK-4 vs FA-4 vs obsolete CJ-4 habits) on newer diesels.",
      "Shortened drain intervals from soot, fuel dilution, and missed analysis.",
      "Mixed fleets buying one 15W-40 for every engine without emissions compatibility review.",
      "Natural gas and low-ash programs using highway diesel oil by habit.",
    ],
    keySellingAngles: [
      "Conventional Commercial Formula for value fleets with analysis discipline.",
      "Synthetic blend CK-4 / FA-4 for step-up oxidation and fuel economy where OEM allows FA-4.",
      "Full synthetic CK-4 for premium drain and severe-duty highway programs.",
      "OEM and API conversations only where PDS and OEM sheets align—CK-4 default for mixed unknowns.",
      "Mixed fleet: separate FA-4-capable units from CK-4 bulk where tags differ.",
    ],
    keyTechnologyThemes: [
      "CK-4 heavy-duty diesel (conventional, synthetic blend, full synthetic)",
      "FA-4 fuel-economy HDEO where OEM approved",
      "Low ash and natural gas engine oils",
      "10W-30 FA-4 and 5W-40 full synthetic premium programs",
      "Professional and Advanced Formula naming for fleet baselines",
    ],
    recommendedRepTalkingPoints: [
      "What engines, model years, and drain intervals are on the fleet card?",
      "Is FA-4 on the table per OEM, or is CK-4 the safe bulk standard?",
      "Lead with oil analysis and fuel dilution before premium synthetic upsell.",
      "Do not blend FA-4 and CK-4 bulk without fleet segmentation.",
    ],
    discoveryFocus: [
      "Engine families, emissions generation, and OEM oil category",
      "Bulk vs packaged and shop top-off habits",
      "Drain interval targets and analysis program",
      "Natural gas, sour gas, or low-ash requirements",
    ],
    crossSellFocus: [
      "Coolant programs on the same highway and vocational card",
      "Transmission and drivetrain fluids on mixed fleets",
      "Grease and chassis on vocational and municipal accounts",
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
    flagshipPositioning:
      "Full Synthetic Industrial EP Gear Lubricants anchor ULTIMATE plant and severe reducer duty; Commercial Gear Lubricants are GOOD; Industrial EP and Full Synthetic Gear are BETTER/BEST.",
    categorySummary:
      "Gear oil is GL-5 / industrial EP and viscosity grade discipline for differentials, final drives, and industrial reducers—ladder commercial → industrial EP → full synthetic → full synthetic industrial EP.",
    customerProblemsSolved: [
      "Foam, wear, and thermal breakdown from wrong viscosity or EP level in reducers.",
      "Using automotive GL-5 habits on industrial enclosed gears without EP review.",
      "Mixing synthetic and mineral in bulk without flush discipline.",
      "Downtime on industrial boxes running generic gear oil below required FZG/EP load.",
    ],
    keySellingAngles: [
      "Commercial Gear Lubricants for value differentials and standard final drives.",
      "Industrial EP for enclosed industrial gears and heavier loads.",
      "Full Synthetic Gear for temperature swing and extended service where PDS supports.",
      "Full Synthetic Industrial EP for top industrial reducer and severe-duty programs.",
    ],
    keyTechnologyThemes: [
      "API GL-5 automotive and commercial gear",
      "Industrial EP enclosed gear lubricants",
      "Full synthetic gear and industrial EP synthetics",
      "Viscosity grade (75W-90, 80W-90, 85W-140, ISO VG industrial)",
    ],
    recommendedRepTalkingPoints: [
      "Differential, final drive, or enclosed industrial reducer—three different conversation paths.",
      "Confirm viscosity and EP on tags before quoting 80W-90 out of habit.",
      "Industrial EP is not automatic substitute for every GL-5 application—read PDS.",
    ],
    discoveryFocus: [
      "Asset type: on-highway differential vs industrial enclosed gear",
      "Viscosity grade on tags and drain history",
      "Temperature, load, and foam complaints",
      "Bulk vs packaged and cross-contamination between grades",
    ],
    crossSellFocus: [
      "HD engine oil on fleets sharing the shop",
      "Hydraulic AW on mobile assets with shared maintenance bay",
      "Grease on chassis and bearing programs",
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
    chemistryGuidance: [
      "EP additives for hypoid and industrial load—match GL-5 / industrial EP class to PDS.",
      "Synthetic base stocks for oxidation and low-temperature flow on premium tiers.",
      "Do not assume sulfur EP is acceptable in all yellow-metal applications—check PDS.",
    ],
    specificationGuidance: [
      "API GL-5, MT-1, and industrial EP specifications as printed on PDS.",
      "ISO VG for industrial enclosed gears vs SAE grades for automotive differentials.",
      "OEM fill lists only where documented.",
    ],
    applicationGuidance: [
      "Highway and vocational differentials: commercial and full synthetic GL-5 per viscosity tag.",
      "Industrial reducers and enclosed gears: industrial EP ladder.",
      "Severe temperature or load: full synthetic industrial EP where PDS supports.",
    ],
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
    flagshipPositioning:
      "Application correctness first: Universal Transmission Fluid, wet brake/trans-drive, tractor hydraulic/transmission, powershift, driveline, and ATF are not interchangeable—Allison/TES conversations only where PDS supports.",
    categorySummary:
      "Transmission is a program category: teach fluid class by compartment (ATF, CVT where listed, UTHF, wet brake, powershift, driveline) and stop one-size-fits-all red-fluid habits.",
    customerProblemsSolved: [
      "Wrong fluid in wet brake / trans-hydraulic compartments causing chatter and warranty risk.",
      "ATF spec mismatch (DEXRON, MERCON, TES) leading to shift complaints.",
      "Powershift and tractor reservoirs filled with generic hydraulic AW.",
      "Driveline and PTO programs neglected on ag and vocational cards.",
    ],
    keySellingAngles: [
      "Universal Transmission Fluid only where PDS application list supports—not every compartment.",
      "Wet brake / trans-drive and AGRIMAX trans-drive for ag combined systems.",
      "Tractor hydraulic/transmission: Universal Red Tractor Fluid and Arctic Tractor Fluid where tags allow.",
      "Powershift and heavy-duty trans fluids per OEM and PDS—no AW substitutes.",
      "ATF: match spec sheet; Allison/TES only with documented approval language.",
      "Driveline GL-5 and gear programs paired with transmission discipline on same fleet.",
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
      "Which compartment are we filling—transmission, wet brake, hydraulic, or driveline?",
      "Read the tag and PDS application list before quoting universal fluid.",
      "Allison/TES is a documented-conversation-only lane—no implied approvals.",
      "Pair trans-drive discipline with grease and engine on ag seasonal PM.",
    ],
    discoveryFocus: [
      "Equipment OEM, compartment tags, and current fluid brand habits",
      "Wet brake chatter, shift quality, or PTO complaints",
      "ATF spec letters and drain intervals",
      "Ag vs highway vs vocational mix on the account",
    ],
    crossSellFocus: [
      "AGRIMAX trans-drive on ag accounts",
      "Gear oil on driveline and differentials",
      "Hydraulic AW for separate hydraulic-only circuits",
      "Grease on chassis and U-joints",
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
    flagshipPositioning:
      "Gold OAT ELC (Gold) is the flagship nitrite-free extended-life program for mixed fleet and all-engines HD conversations where PDS supports—never label Gold as light-duty automotive only. Red NOAT ELC and Commercial HD NOAT ELC anchor classic heavy-duty diesel NOAT programs.",
    categorySummary:
      "Coolant is inhibitor technology and fleet program discipline: OAT, NOAT, universal, nitrite-free, extended-life, HD diesel, and mixed-fleet separation—color is not chemistry.",
    customerProblemsSolved: [
      "Mixed-chemistry top-offs after partial drains and roadside emergencies.",
      "Universal green coolant used in HD diesel radiators without NOAT verification.",
      "Confusing automotive OAT color habits with HD NOAT program requirements.",
      "Premix ratio and water quality errors in bulk blending.",
    ],
    keySellingAngles: [
      "Gold OAT ELC: flagship nitrite-free / all-engines / mixed-fleet ELC where PDS supports—HD positioning, not light-duty dismissal.",
      "Red NOAT ELC and Commercial HD NOAT ELC: heavy-duty diesel NOAT programs with nitrite for liner protection where specified.",
      "Yellow Automotive OAT ELC: light-duty automotive OAT programs—separate from HD bulk tanks.",
      "Green Universal: conventional/universal entry—verify before HD NOAT substitution.",
      "Extended-life = drain strategy tied to inhibitor depletion, not drum color.",
      "Mixed-fleet discipline: separate LD OAT bays from HD NOAT bulk.",
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
      "What equipment types, bulk tanks, and top-off practices exist?",
      "Gold is nitrite-free mixed-fleet / all-engines flagship per PDS—never call it light-duty only.",
      "Match OAT, NOAT, nitrite-free, and universal language to PDS—not drum color.",
      "Document flush and compatibility when changing inhibitor families.",
    ],
    discoveryFocus: [
      "HD diesel vs automotive vs ag equipment mix",
      "Bulk tank labels and top-off habits",
      "Current inhibitor family and drain interval targets",
      "Water quality and premix vs concentrate process",
    ],
    crossSellFocus: [
      "HD engine oil on the same fleet card",
      "Power steering and brake fluids in the service lane",
      "Grease and chassis on mixed fleets",
      "Cooling system cleaners and flush chemicals",
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
    chemistryGuidance: [
      "OAT: organic acid inhibitors—common automotive and many ELC programs.",
      "NOAT: nitrite plus organic acids for heavy-duty wet-sleeve liner protection.",
      "Gold (Gold OAT ELC): nitrite-free OAT extended-life—flagship mixed fleet / all-engines per PDS; not light-duty shorthand.",
      "Universal / conventional: entry programs—do not substitute for HD NOAT without verification.",
      "Extended-life: inhibitor depletion and drain interval—not color.",
    ],
    specificationGuidance: [
      "ASTM, TMC, and OEM references only where PDS documents them.",
      "Separate HD NOAT, nitrite-free Gold, automotive OAT, and universal programs in bulk storage.",
      "Flush and compatibility procedures when migrating inhibitor technology.",
    ],
    applicationGuidance: [
      "Heavy-duty diesel highway and off-highway: Red NOAT ELC and Commercial HD NOAT where PDS supports.",
      "Mixed fleet and nitrite-free ELC: Gold OAT ELC per PDS—all-engines positioning.",
      "Automotive passenger and light commercial: Yellow OAT ELC where appropriate.",
      "Universal green: entry and price-led bays—upgrade path to OAT/NOAT programs by equipment.",
    ],
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
      "AGRIMAX is OEM-spec conversation enablement for ag dealers: trans-drive / UTHF, zinc-free options, CK-4 engine, grease, and coolant companions—JD/CNH positioning only where PDS and OEM sheets support.",
    categorySummary:
      "AGRIMAX teaches spec-correct fluid conversations across shared ag compartments, seasonal PM, and brand-loyal customers—not a single red tractor fluid for every reservoir.",
    customerProblemsSolved: [
      "One fluid used in transmission, hydraulic, and wet-brake circuits without reading tags.",
      "Green vs red line color mistaken for interchangeable chemistry.",
      "Wet brake chatter blamed on brakes when fluid compatibility is root cause.",
      "Brand-loyal customers believing only OEM-branded fluids meet spec.",
    ],
    keySellingAngles: [
      "Trans-drive / UTHF anchors the ag conversation where PDS lists combined duty.",
      "Zinc-free trans-drive where equipment tags and PDS require zinc-free chemistry.",
      "CK-4 synthetic blend engine oil for high-hour seasonal engine protection.",
      "Grease and coolant companions complete seasonal PM—not standalone upsells.",
      "Dealer PM programs and bulk standardization across reservoirs.",
      "JD/CNH and OEM spec language only with PDS/OEM documentation.",
    ],
    keyTechnologyThemes: [
      "AGRIMAX Trans Drive Hydraulic Fluid",
      "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
      "AGRIMAX CK-4 synthetic blend engine oils",
      "AGRIMAX grease and coolant companions",
      "OEM spec alignment (JD/CNH where PDS supports)",
    ],
    recommendedRepTalkingPoints: [
      "Map reservoirs before quoting one tractor fluid.",
      "Use zinc-free and CK-4 stories only where tags and PDS align.",
      "Seasonal PM: bundle trans-drive, engine, grease, and coolant on one dealer visit.",
      "Respect brand loyalty with spec proof from PDS—not generic discounting.",
    ],
    discoveryFocus: [
      "Equipment brands, hours, and seasonal service windows",
      "Compartment tags and current fluid habits",
      "Wet brake, PTO, and hydraulic complaints",
      "Dealer bulk tanks and private-label loyalty",
    ],
    crossSellFocus: [
      "RED TAC / field grease on the same equipment card",
      "Coolant programs for seasonal flush",
      "HD hydraulic AW for supporting construction assets",
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
    chemistryGuidance: [
      "UTHF / trans-drive fluids may include friction modifiers for wet brakes—AW is not automatic substitute.",
      "Zinc-free programs for equipment lines where tags and PDS require zinc-free chemistry.",
      "CK-4 engine oils for diesel ag engines—confirm viscosity and API on PDS.",
    ],
    specificationGuidance: [
      "JD/CNH and OEM spec references only where PDS documents them for that SKU.",
      "Equipment tag fluid types override line color and competitor habits.",
      "Seasonal change intervals per OEM and PDS—not generic highway drain assumptions.",
    ],
    applicationGuidance: [
      "Tractors, combines, and sprayers: map transmission, hydraulic, wet brake, and engine separately.",
      "Construction and ag mixed yards: segment AGRIMAX from highway bulk tanks.",
      "Dealer PM: standardize companion SKUs across seasonal visits.",
    ],
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
    flagshipPositioning:
      "NSF H1 registered food-grade programs where PDS supports—hydraulic, grease, gear, compressor, and chain/conveyor specialties for washdown, incidental contact, and audit-ready plants.",
    categorySummary:
      "Food grade is compliance and audit discipline: H1 where supported, separate H1 from H2 habits, and map hydraulic, grease, gear, and specialty circuits in washdown plants.",
    customerProblemsSolved: [
      "Non-H1 fluids in areas with incidental food contact risk.",
      "Washdown stripping marginal lubricants and increasing regrease frequency.",
      "Audit findings from poor H1 documentation and wrong product class in zones.",
      "Using general industrial gear or hydraulic oil in food-adjacent circuits.",
    ],
    keySellingAngles: [
      "NSF H1 positioning only where PDS registers H1 for that SKU.",
      "FOOD-GRADE Hydraulic Oils for H1 hydraulic circuits.",
      "FOOD-GRADE EP-2 Grease for H1 bearing and chassis points in plants.",
      "FOOD-GRADE gear, compressor, and chain programs to complete the plant map.",
      "Washdown and incidental contact discipline—not 'food plant' labeling without H1 proof.",
      "Audit readiness: PDS, registration, and zone labeling on the shelf.",
    ],
    keyTechnologyThemes: [
      "NSF H1 registration (where PDS supports)",
      "Food-grade hydraulic, grease, and gear",
      "Food-grade compressor and circulating oils",
      "Food-grade chain and conveyor lubricants",
      "Washdown and wet environment performance",
    ],
    recommendedRepTalkingPoints: [
      "Which zones require H1 vs general plant fluids—map before quoting.",
      "Repeat NSF H1 only when the PDS and registration support that SKU.",
      "Bundle hydraulic, grease, and chain on audit prep visits.",
      "Do not substitute H2 or general industrial fluids into H1 zones.",
    ],
    discoveryFocus: [
      "Plant zones, audit schedule, and sanitation intensity",
      "Current H1 documentation and shelf labeling",
      "Hydraulic, compressor, chain, and bearing circuits",
      "Washdown frequency and regrease complaints",
    ],
    crossSellFocus: [
      "Industrial specialty compressor oils in non-food circuits",
      "General hydraulic AW in non-food plant areas",
      "Coolant and chemicals only where appropriate outside food contact zones",
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
    chemistryGuidance: [
      "H1 lubricants for incidental food contact per NSF registration where PDS supports.",
      "Separate food-grade base stocks and additive packages from general industrial oils.",
      "Washdown-resistant greases and fluids per PDS performance claims only.",
    ],
    specificationGuidance: [
      "NSF H1 registration numbers and categories as printed on PDS.",
      "OEM and plant audit checklists—document SKU to zone mapping.",
      "Do not use 'food safe' language without H1 registration proof.",
    ],
    applicationGuidance: [
      "Hydraulic presses and pumps in food plants: H1 hydraulic oils.",
      "Bearings, chassis, and conveyors with incidental contact risk: H1 greases.",
      "Compressors and gearboxes in food zones: H1 gear and circulating per PDS.",
      "Chain and conveyor: H1 chain lubes where PDS lists application.",
    ],
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
    flagshipPositioning:
      "ENVIRO, BIO, and EAL programs position biodegradable and environmentally acceptable lubricants where PDS supports—marine, forestry, sensitive sites, and regulated applications.",
    categorySummary:
      "Environmental/EAL is compliance and site-risk positioning: ladder ENVIRO inherently biodegradable AW through BIO and BIO-Synthetic EAL, with HFDU and rock drill specialties for niche applications.",
    customerProblemsSolved: [
      "Spills and leaks on sensitive watersheds and forestry roads.",
      "Customer specs requiring biodegradable or EAL fluids without a mapped Klondike program.",
      "Using general AW where regulations or contracts require EAL documentation.",
      "Marine and dredging equipment needing environmentally acceptable stern tube and hydraulic programs.",
    ],
    keySellingAngles: [
      "ENVIRO Inherently Biodegradable AW/MV for sensitive site baselines where PDS supports.",
      "BIO Biodegradable AW and synthetic blend hydraulics for step-up biodegradability.",
      "BIO-Synthetic EAL Hydraulic Oils for premium EAL positioning.",
      "BIO Hees and specialty EAL fluids per application lists on PDS.",
      "Marine, forestry, and municipal sensitive-site opportunities—not generic 'green' labeling.",
    ],
    keyTechnologyThemes: [
      "ENVIRO inherently biodegradable hydraulic fluids",
      "BIO biodegradable AW and synthetic blend hydraulics",
      "BIO-Synthetic EAL hydraulic oils",
      "HEES and HFDU specialty fluids",
      "Biodegradable rock drill and niche applications",
    ],
    recommendedRepTalkingPoints: [
      "What site, spill, or contract language triggers biodegradable/EAL review?",
      "Match ENVIRO vs BIO vs EAL tiers to PDS environmental claims—not marketing greenwash.",
      "Pair with forestry, marine, and municipal account plans.",
      "Confirm local regulations and customer spec sheets before quoting.",
    ],
    discoveryFocus: [
      "Regulatory, contract, or customer EAL requirements",
      "Spill history and sensitive location (water, forest, parkland)",
      "Equipment types: mobile hydraulic, marine, drill, municipal",
      "Current 'green' products without documentation",
    ],
    crossSellFocus: [
      "Standard hydraulic AW for non-sensitive assets on same contractor",
      "Grease programs on forestry and municipal fleets",
      "Industrial specialty for plant equipment outside sensitive zones",
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
    flagshipPositioning:
      "Industrial specialty maps turbine, circulating, compressor, rock drill, and plant specialty fluids—Long Life Turbine and full synthetic circulating oils for R&O circuits, not AW substitutes.",
    categorySummary:
      "Industrial specialty is plant equipment enablement: separate turbine/circulating, compressor, industrial gear, and niche applications from mobile AW habits.",
    customerProblemsSolved: [
      "AW hydraulic oil used in turbine and circulating reservoirs.",
      "Compressor varnish and moisture issues from wrong oil class.",
      "Industrial reducers running automotive gear oil below required load.",
      "Missed ENVIRO/BIO opportunities on plant contracts with environmental clauses.",
    ],
    keySellingAngles: [
      "Long Life Turbine Oils and full synthetic circulating/compressor oils for R&O duty.",
      "Industrial EP gear for enclosed reducers—not mobile AW crossovers.",
      "BIO rock drill and ENVIRO MV for environmental niche plant and mobile accounts.",
      "Professional AW only where plant mobile hydraulics are separate from turbine circuits.",
    ],
    keyTechnologyThemes: [
      "R&O turbine and circulating oils",
      "Compressor and air system fluids",
      "Industrial EP gear lubricants",
      "Rock drill and specialty industrial fluids",
      "Crossover to ENVIRO/BIO where plant specs require",
    ],
    recommendedRepTalkingPoints: [
      "Is this reservoir turbine, compressor, gear, or hydraulic—four different programs.",
      "R&O turbine oils are not AW—read tag and PDS application.",
      "Plant walk: map circulating, compressor, gear, and mobile hydraulics separately.",
    ],
    discoveryFocus: [
      "Reservoir types and OEM recommended oil classes",
      "Varnish, moisture, and foaming complaints on turbines and compressors",
      "Industrial gear loads and viscosity grades",
      "Environmental clauses on plant contracts",
    ],
    crossSellFocus: [
      "Mobile hydraulic AW for plant material handling equipment",
      "Food-grade programs in food manufacturing zones",
      "Grease for motor bearing and auxiliary lube points",
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
    chemistryGuidance: [
      "R&O inhibitors for turbines and circulating systems vs AW zinc for hydraulics.",
      "Compressor oils manage moisture and oxidation differently than turbine R&O.",
      "Industrial EP gear sulfur-phosphorus load carrying for enclosed gears.",
    ],
    specificationGuidance: [
      "ISO VG and R&O classifications for turbines per PDS.",
      "DIN 51524 and OEM turbine oil sheets where documented.",
      "Compressor fluid specifications per PDS application lists.",
    ],
    applicationGuidance: [
      "Steam and gas turbines, circulating systems: Long Life Turbine and synthetic circulating oils.",
      "Plant air compressors: compressor-duty fluids per PDS—not AW.",
      "Enclosed industrial gears: industrial EP and full synthetic industrial EP.",
      "Rock drill and specialty: BIO rock drill where PDS lists niche application.",
    ],
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
    acc[entry.key] = entry;
    return acc;
  }, /** @type {Record<string, CategoryProgramIntelligence>} */ ({}))
);

export const CATEGORY_PROGRAM_INTELLIGENCE = Object.freeze([...CATEGORY_PROGRAM_INTELLIGENCE_LIST]);

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
