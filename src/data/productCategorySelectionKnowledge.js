/**
 * Product category selection knowledge — deterministic profiles for advisor intelligence.
 * Not wired to UI yet.
 */

export const productCategorySelectionKnowledge = {
  hydraulicFluid: {
    id: "hydraulicFluid",
    category: "Hydraulic Fluid",
    aliases: [
      "hydraulic fluid",
      "hydraulic oil",
      "aw hydraulic",
      "anti wear hydraulic",
      "mobile hydraulic",
      "industrial hydraulic",
    ],
    questionExamples: [
      "How do I choose hydraulic fluid?",
      "What hydraulic oil should I recommend?",
      "What matters when selecting hydraulic fluid?",
    ],
    directAnswer:
      "Hydraulic fluid selection starts with OEM viscosity grade and spec class (AW, R&O, zinc-free, or specialty), then matches operating temperature, contamination exposure, and water risk. Viscosity at operating temperature, shear stability, oxidation life, and water separation usually matter more than brand once the spec gate is cleared.",
    selectionFactors: [
      "OEM pump and system specification",
      "ISO viscosity grade at operating temperature",
      "AW vs R&O vs zinc-free chemistry class",
      "Shear stability and VI for seasonal swings",
      "Water separation and demulsibility in outdoor service",
      "Filter compatibility and cleanliness targets",
    ],
    criticalSpecsToConfirm: [
      "Pump OEM fluid sheet",
      "ISO VG grade",
      "AW zinc content or ashless requirement",
      "Seal and paint compatibility notes",
    ],
    operatingConditionsToAskAbout: [
      "Ambient and sump temperature range",
      "Water spray, dust, or fines contamination",
      "Duty cycle and continuous pressure",
      "Reservoir size and air release exposure",
    ],
    commonMistakes: [
      "Using UTF or trans-hydraulic fluid in a plain AW system—or vice versa",
      "Bulk-changing viscosity without OEM approval",
      "Topping off with used or wrong chemistry after a leak",
      "Ignoring milky fluid instead of addressing water ingress",
    ],
    failureRisks: [
      "Pump cavitation and wear",
      "Valve varnish and slow cycle times",
      "Rust and emulsion-stable contamination",
    ],
    relatedEquipment: [
      "Excavators and loaders",
      "Presses and injection molding machines",
      "Logging skidders and material handlers",
    ],
    relatedIndustries: ["construction", "mining", "forestry", "manufacturing"],
    klondikeProductCategories: [
      "KLONDIKE AW hydraulic oils",
      "Zinc-free and high-VI industrial hydraulic lines",
      "Specialty fluids only where PDS explicitly matches OEM sheet",
    ],
    upgradeOpportunities: [
      "High-VI multigrade for seasonal fleets",
      "Premium oxidation package for extended drain trials with analysis",
      "Contamination control program pairing filtration upgrades",
    ],
    repTalkTrack:
      "Hydraulic is a spec-first category. Get the pump sheet and a photo of the tag before you quote. KLONDIKE has breadth across mobile AW and industrial lines—narrow with the PDS, not the aisle colour.",
    questionsToAsk: [
      "What OEM spec is on the reservoir tag?",
      "Typical operating temperature and climate?",
      "Water exposure or recurring haze in the tank?",
      "Current drain interval and filter micron rating?",
    ],
    cautionNotes: [
      "Exact SKU requires PDS and OEM confirmation.",
      "UTF/wet-brake fluids are not generic AW hydraulic oils.",
    ],
    keywords: ["hydraulic", "aw", "pump", "viscosity", "iso vg"],
  },

  grease: {
    id: "grease",
    category: "Grease",
    aliases: [
      "grease",
      "bearing grease",
      "chassis grease",
      "nlgi",
      "lithium grease",
      "calcium sulfonate grease",
    ],
    questionExamples: [
      "How do I pick the right grease?",
      "What grease should I use on pins?",
      "What matters when selecting grease?",
    ],
    directAnswer:
      "Grease selection combines thickener type, NLGI grade, base oil viscosity, EP needs, and application method (manual, auto-lube, or sealed-for-life). Thickener compatibility and water exposure often decide success as much as the NLGI number on the gun.",
    selectionFactors: [
      "Thickener chemistry and compatibility with in-service grease",
      "NLGI grade for pumpability and retention",
      "Base oil viscosity for load and speed",
      "EP and solid additive needs for shock load",
      "Water washout and corrosion exposure",
      "Centralized system OEM approval",
    ],
    criticalSpecsToConfirm: [
      "OEM thickener and NLGI requirement",
      "Auto-lube system pump pressure and line size",
      "Temperature range at the contact zone",
      "Food or incidental contact restrictions",
    ],
    operatingConditionsToAskAbout: [
      "Wet vs dry joints",
      "Shock load and oscillation",
      "Regrease interval and method",
      "Dust, wash-down, or chemical exposure",
    ],
    commonMistakes: [
      "Mixing incompatible thickeners in centralized systems",
      "Using #2 chassis grease on fine auto-lube lines without approval",
      "Chasing colour instead of thickener and NLGI",
      "Under-greasing high-temp bearings after switching to stiffer grease",
    ],
    failureRisks: [
      "Pin and bushing wear",
      "Bearing starvation and overheating",
      "Line blockages in auto-lube networks",
    ],
    relatedEquipment: [
      "Loader pins and bushings",
      "Truck chassis fittings",
      "Conveyor and crusher bearings",
    ],
    relatedIndustries: ["construction", "mining", "agriculture", "fleet"],
    klondikeProductCategories: [
      "KLONDIKE lithium-complex and calcium-sulfonate greases",
      "Polyurea and severe-duty greases where PDS supports the application",
      "Food-grade greases only with NSF documentation on the PDS",
    ],
    upgradeOpportunities: [
      "Calcium sulfonate for wet severe-duty pins",
      "Tacky severe-duty products for open exposed joints where PDS allows",
      "Auto-lube program standardization with compatibility review",
    ],
    repTalkTrack:
      "Grease is thickener plus NLGI plus how they apply it. Ask about water, shock, and what's already in the line. Quote a KLONDIKE SKU only after thickener and NLGI match the PDS and OEM.",
    questionsToAsk: [
      "Manual gun, auto-lube, or sealed-for-life?",
      "Current grease name and colour in service?",
      "Water spray or shock load on the joint?",
    ],
    cautionNotes: [
      "Thickener incompatibility can ruin centralized systems.",
      "Exact product fit requires PDS and OEM confirmation.",
    ],
    keywords: ["grease", "nlgi", "thickener", "pins", "bearing"],
  },

  heavyDutyEngineOil: {
    id: "heavyDutyEngineOil",
    category: "Heavy Duty Engine Oil",
    aliases: [
      "heavy duty engine oil",
      "diesel engine oil",
      "fleet engine oil",
      "ck-4",
      "cj-4",
      "15w-40",
      "10w-30 diesel",
    ],
    questionExamples: [
      "How do I choose heavy duty engine oil?",
      "What diesel oil should I recommend?",
      "CK-4 vs synthetic blend for our fleet?",
    ],
    directAnswer:
      "Heavy-duty engine oil selection is OEM approval first—API category (CK-4/FA-4), viscosity grade, and OEM sheets (Cummins CES, Detroit 93K, Volvo VDS, Mack EOS)—then duty cycle, climate, and drain interval strategy.",
    selectionFactors: [
      "OEM API category and viscosity grade",
      "OEM performance sheets (CES, 93K, VDS, EOS)",
      "Duty cycle, idle percentage, and turbo heat",
      "Drain interval standard vs extended with analysis",
      "Climate and cold-start needs",
      "Aftertreatment and low-ash requirements where applicable",
    ],
    criticalSpecsToConfirm: [
      "Engine OEM oil specification",
      "API CK-4 vs FA-4 eligibility",
      "Approved viscosity grade",
      "Low-ash or SAPS limits if equipped with DPF",
    ],
    operatingConditionsToAskAbout: [
      "On-highway vs severe off-highway mix",
      "Fuel quality and biodiesel blend",
      "Oil analysis program or reactive maintenance",
      "Typical ambient temperature range",
    ],
    commonMistakes: [
      "Quoting CK-4 without verifying OEM sheet line on PDS",
      "Mixing FA-4 into CK-4-only fleets",
      "Extending drains without analysis or OEM blessing",
      "Using gasoline oils in diesel hardware",
    ],
    failureRisks: [
      "Soot-related wear and viscosity growth",
      "DPF ash loading from wrong SAPS class",
      "Cold-start wear with wrong winter grade",
    ],
    relatedEquipment: [
      "Class 8 highway tractors",
      "Off-highway haul trucks",
      "Diesel generators and vocational trucks",
    ],
    relatedIndustries: ["trucking", "mining", "construction", "municipal fleet"],
    klondikeProductCategories: [
      "KLONDIKE CK-4 conventional, synthetic blend, and full synthetic heavy-duty engine oils",
      "Match CES / 93K / VDS / EOS lines explicitly on the PDS before quoting",
    ],
    upgradeOpportunities: [
      "Synthetic blend or full synthetic for extended drain pilots",
      "10W-30 CK-4 for fuel economy programs where OEM allows",
      "Oil analysis onboarding with premium tier fluid",
    ],
    repTalkTrack:
      "Diesel engine oil is a compliance sale. Lead with the CES or 93K number on their cap, then map to a KLONDIKE SKU that lists it on the PDS. Premium is a drain-interval and cold-start story—not a colour story.",
    questionsToAsk: [
      "Which OEM spec is on the fill cap?",
      "Target drain interval and analysis history?",
      "Mixed fleet standardization goals?",
    ],
    cautionNotes: [
      "CK-4 and FA-4 are not interchangeable without OEM approval.",
      "Exact product recommendation requires PDS line-by-line confirmation.",
    ],
    keywords: ["diesel", "ck-4", "engine oil", "fleet", "ces", "93k"],
  },

  gearOil: {
    id: "gearOil",
    category: "Gear Oil",
    aliases: [
      "gear oil",
      "industrial gear oil",
      "ep gear oil",
      "gl-4",
      "gl-5",
      "differential oil",
    ],
    questionExamples: [
      "How do I select gear oil?",
      "What gear oil for our industrial gearbox?",
      "GL-4 vs GL-5—what should I recommend?",
    ],
    directAnswer:
      "Gear oil selection hinges on OEM GL rating, viscosity grade, EP needs, and whether the contact is hypoid, worm, or yellow-metal sensitive. Industrial enclosed gears add oxidation, foam, and demulsibility requirements beyond automotive GL labels.",
    selectionFactors: [
      "OEM GL rating and viscosity grade",
      "EP level vs yellow metal sensitivity",
      "Enclosed vs open gear configuration",
      "Operating temperature and load",
      "Synthetic vs mineral for cold or long life",
      "Foam and water separation in wet plants",
    ],
    criticalSpecsToConfirm: [
      "Manufacturer gear oil specification",
      "GL-4, GL-5, or industrial R&O EP sheet",
      "Viscosity grade at operating temperature",
      "Yellow metal or worm gear restrictions",
    ],
    operatingConditionsToAskAbout: [
      "Shock load and reversing duty",
      "Ambient temperature and startup conditions",
      "Water or process steam exposure",
      "Seal compatibility and paint systems",
    ],
    commonMistakes: [
      "Using GL-5 where GL-4 or yellow-metal-safe fluid is required",
      "Underfilling after viscosity change",
      "Treating industrial worm drives like automotive differentials",
      "Ignoring foam in high-agitation sumps",
    ],
    failureRisks: [
      "Micropitting and scuffing on gear teeth",
      "Worm gear wear from wrong EP chemistry",
      "Overheating from excessive viscosity",
    ],
    relatedEquipment: [
      "Final drives and differentials",
      "Industrial reducers and mixers",
      "Open pit conveyor drives",
    ],
    relatedIndustries: ["mining", "manufacturing", "construction", "fleet"],
    klondikeProductCategories: [
      "KLONDIKE automotive and industrial gear oils",
      "EP and synthetic gear products per PDS GL and viscosity claims",
    ],
    upgradeOpportunities: [
      "Synthetic gear oil for cold climate or long-life sumps",
      "Premium oxidation package with oil analysis",
      "Foam-resistant industrial grades in wet plants",
    ],
    repTalkTrack:
      "Gear oil is GL rating plus viscosity plus metal chemistry. Ask what's in the box—hypoid truck axle, worm reducer, or steel mill gearbox—and match the PDS exactly. Do not swap GL ratings on faith.",
    questionsToAsk: [
      "OEM tag on reducer or axle?",
      "Yellow metals or worm gears in the train?",
      "Operating sump temperature?",
    ],
    cautionNotes: [
      "GL-5 sulfur chemistry can harm some yellow metal applications.",
      "Exact SKU requires OEM and PDS confirmation.",
    ],
    keywords: ["gear", "gl-5", "gl-4", "ep", "differential", "reducer"],
  },

  transmissionFluidAtf: {
    id: "transmissionFluidAtf",
    category: "Transmission Fluid / ATF",
    aliases: [
      "atf",
      "automatic transmission fluid",
      "transmission fluid",
      "dexron",
      "mercon",
      "cvt fluid",
    ],
    questionExamples: [
      "How do I choose transmission fluid?",
      "What ATF should I recommend?",
      "Dexron or Mercon for this fleet?",
    ],
    directAnswer:
      "ATF selection is approval-driven: Dexron, Mercon, Allison TES, OEM captive specs, and CVT/ DCT fluids are not interchangeable. Match the dipstick or owner manual approval, then consider duty cycle, drain interval, and heat history.",
    selectionFactors: [
      "OEM ATF approval on cap or manual",
      "Friction modifier requirements for clutch packs",
      "Allison TES or OEM captive spec for vocational trucks",
      "Synthetic vs conventional for heat and drain",
      "Compatibility with seals and elastomers",
    ],
    criticalSpecsToConfirm: [
      "Dexron / Mercon generation or OEM captive code",
      "Allison TES number for vocational automatics",
      "CVT or DCT-specific fluid prohibition on generic ATF",
    ],
    operatingConditionsToAskAbout: [
      "P&D, refuse, transit, or light-duty mix",
      "Fluid colour and burn smell at drain",
      "Auxiliary cooler presence",
      "Flush vs drain-and-fill history",
    ],
    commonMistakes: [
      "Using universal ATF where captive OEM fluid is mandated",
      "Mixing Dexron generations without OEM chart guidance",
      "Confusing power steering fluid with ATF",
      "Ignoring TES-295 vs TES 668 differences on Allison units",
    ],
    failureRisks: [
      "Shudder and clutch slip",
      "Harsh shifts and overheating",
      "Warranty void from unapproved fluid",
    ],
    relatedEquipment: [
      "Pickup and van automatics",
      "Transit and refuse trucks",
      "Allison-equipped vocational chassis",
    ],
    relatedIndustries: ["fleet", "municipal", "transit", "light commercial"],
    klondikeProductCategories: [
      "KLONDIKE Dexron/Mercon and Allison-documented ATF products",
      "Confirm generation and TES lines on the PDS before quoting",
    ],
    upgradeOpportunities: [
      "Full synthetic ATF for severe heat fleets",
      "Allison TES-295 premium tier for extended drain where OEM allows",
      "Fleet bulk program with spec verification per unit type",
    ],
    repTalkTrack:
      "ATF is the most expensive guess in the shop. Read the cap—Dexron VI, Mercon LV, TES-295—and map to a KLONDIKE fluid that lists that approval on the PDS. No approval line means needs confirmation.",
    questionsToAsk: [
      "Dipstick or manual ATF specification?",
      "Allison transmission model and TES requirement?",
      "Severe service or standard drain interval?",
    ],
    cautionNotes: [
      "ATF generations are not freely interchangeable.",
      "Exact product fit requires PDS approval confirmation.",
    ],
    keywords: ["atf", "transmission", "dexron", "mercon", "allison", "automatic"],
  },

  tractorHydraulicFluidUtf: {
    id: "tractorHydraulicFluidUtf",
    category: "Tractor Hydraulic Fluid / UTF",
    aliases: [
      "utf",
      "universal tractor fluid",
      "tractor hydraulic fluid",
      "trans-hydraulic fluid",
      "j20c",
      "wet brake fluid",
    ],
    questionExamples: [
      "What is UTF tractor fluid?",
      "Can I use AW hydraulic in a tractor?",
      "What fluid for wet brakes and hydraulics?",
    ],
    directAnswer:
      "Universal tractor fluid (UTF) serves combined transmission, hydraulic, and wet brake systems in ag and some construction equipment. It is not interchangeable with generic AW hydraulic oil—friction, chatter control, and OEM JDM/J20 sheets define the category.",
    selectionFactors: [
      "OEM UTF or JDM specification (e.g., J20C)",
      "Wet brake chatter and friction requirements",
      "Viscosity grade for climate",
      "Compatibility with yellow metals and seals",
      "Shared sump with transmission gears",
    ],
    criticalSpecsToConfirm: [
      "John Deere, CNH, or other OEM UTF sheet",
      "Wet brake and PTO compatibility notes",
      "Prohibition on engine oil or generic AW top-off",
    ],
    operatingConditionsToAskAbout: [
      "Ag seasonal temperature swings",
      "PTO and implement hydraulic load",
      "Chatter history after last fluid change",
      "Mixed brand equipment on one farm",
    ],
    commonMistakes: [
      "Topping UTF sumps with engine oil or AW hydraulic",
      "Assuming all 'universal' fluids meet the same friction test",
      "Ignoring OEM colour or sheet for CNH vs JD programs",
    ],
    failureRisks: [
      "Wet brake chatter and plate wear",
      "Transmission clutch slip",
      "Pump wear from wrong viscosity",
    ],
    relatedEquipment: [
      "Agricultural tractors",
      "Utility tractors with wet brakes",
      "Some compact construction units",
    ],
    relatedIndustries: ["agriculture", "municipal grounds", "compact construction"],
    klondikeProductCategories: [
      "KLONDIKE AGRIMAX trans-drive and UTF-type fluids",
      "Match JDM/J20 and OEM colour programs on the PDS per equipment brand",
    ],
    upgradeOpportunities: [
      "Seasonal UTF program with bulk storage best practices",
      "Premium synthetic UTF only where OEM and PDS explicitly allow",
    ],
    repTalkTrack:
      "UTF is a friction spec, not just hydraulic viscosity. If they mention wet brake noise, stop and get the JDM sheet. KLONDIKE AGRIMAX lines cover major OEM programs—prove it on the PDS before the farm bulk tank changes.",
    questionsToAsk: [
      "Tractor brand and model year?",
      "OEM fluid code on cap?",
      "Any chatter after the last fill?",
    ],
    cautionNotes: [
      "Never substitute generic AW hydraulic for UTF without written OEM approval.",
      "Exact SKU requires PDS and OEM confirmation.",
    ],
    keywords: ["utf", "tractor", "j20", "wet brake", "trans drive", "agrimax"],
  },

  compressorOil: {
    id: "compressorOil",
    category: "Compressor Oil",
    aliases: [
      "compressor oil",
      "air compressor oil",
      "rotary screw compressor oil",
      "pao compressor",
      "recip compressor oil",
    ],
    questionExamples: [
      "How do I choose compressor oil?",
      "What oil for rotary screw compressor?",
      "Does compressor oil matter for varnish?",
    ],
    directAnswer:
      "Compressor oil must match compressor type (recip, rotary screw, vane), gas composition, discharge temperature, and OEM drain interval. Oxidation stability, varnish control, and moisture handling separate industrial compressor fluids from general R&O oils.",
    selectionFactors: [
      "Recip vs rotary screw vs vane design",
      "Discharge temperature and duty cycle",
      "Mineral vs PAO/synthetic for life and varnish",
      "Air quality, moisture, and filtration",
      "Food or breathing-air restrictions if applicable",
    ],
    criticalSpecsToConfirm: [
      "Compressor OEM lubricant specification",
      "Synthetic vs mineral mandate",
      "Drain interval hours and warranty terms",
      "Separator and filter compatibility",
    ],
    operatingConditionsToAskAbout: [
      "Hours per year and load percentage",
      "Discharge temperature trends",
      "Varnish or foaming history",
      "Ambient dust and intake location",
    ],
    commonMistakes: [
      "Using motor oil or hydraulic fluid in screw compressors",
      "Extending drains beyond OEM without analysis",
      "Ignoring varnish until separator failure",
      "Mixing PAO and mineral without flush guidance",
    ],
    failureRisks: [
      "Varnish on rotors and separators",
      "Overheating and high amp draw",
      "Coalescer failure and oil carryover",
    ],
    relatedEquipment: [
      "Rotary screw shop compressors",
      "Plant air systems",
      "Quarry and mine air packages",
    ],
    relatedIndustries: ["manufacturing", "mining", "automotive service", "food processing"],
    klondikeProductCategories: [
      "KLONDIKE compressor oils where PDS lists screw or recip suitability",
      "Confirm synthetic PAO claims per SKU on the PDS",
    ],
    upgradeOpportunities: [
      "Synthetic PAO for high-temp screw service",
      "Oil analysis and varnish monitoring program",
      "Separator and filter upgrade with fluid change",
    ],
    repTalkTrack:
      "Compressor oil is hours and temperature math. Ask for the OEM book, discharge temp, and varnish history. Quote KLONDIKE only where the PDS names screw or recip service—otherwise needs confirmation.",
    questionsToAsk: [
      "Recip or rotary screw?",
      "OEM drain hour interval?",
      "Discharge temperature at full load?",
    ],
    cautionNotes: [
      "Breathing-air systems may require food-grade or specialty fluids.",
      "Exact product requires PDS and OEM confirmation.",
    ],
    keywords: ["compressor", "screw", "recip", "varnish", "pao", "air"],
  },

  coolantAntifreeze: {
    id: "coolantAntifreeze",
    category: "Coolant / Antifreeze",
    aliases: [
      "coolant",
      "antifreeze",
      "extended life coolant",
      "oat coolant",
      "hd coolant",
      "egw",
    ],
    questionExamples: [
      "How do I choose coolant?",
      "What antifreeze for our fleet?",
      "OAT vs conventional coolant?",
    ],
    directAnswer:
      "Coolant selection requires chemical compatibility with the engine and hardware OEM—conventional, OAT, HOAT, or nitrite-free programs are not mix-and-match. Freeze/boil protection, water quality, dilution ratio, and service interval matter as much as colour.",
    selectionFactors: [
      "OEM coolant specification and colour program",
      "OAT vs nitrite vs hybrid chemistry",
      "Dilution ratio and water hardness",
      "Aluminum and liner compatibility",
      "Fleet standardization vs captive OEM fill",
    ],
    criticalSpecsToConfirm: [
      "Engine OEM coolant bulletin",
      "Pre-mixed vs concentrate requirement",
      "Prohibition on SCAs or supplemental additives",
      "Mixed chemistry in system—flush requirement",
    ],
    operatingConditionsToAskAbout: [
      "Climate freeze protection target",
      "Idle and load cycle affecting boil-over",
      "Top-off practices with water only",
      "Contamination with other chemistry",
    ],
    commonMistakes: [
      "Mixing incompatible coolant technologies",
      "Topping off with water only repeatedly",
      "Using colour as the only selection guide",
      "Adding aftermarket SCA to OAT systems",
    ],
    failureRisks: [
      "Cavitation erosion on wet liners",
      "Gelation and pump seal failure",
      "Overheating from scaled heat transfer",
    ],
    relatedEquipment: [
      "Highway diesel engines",
      "Off-highway diesel and gas engines",
      "Stationary power units",
    ],
    relatedIndustries: ["trucking", "construction", "agriculture", "power generation"],
    klondikeProductCategories: [
      "KLONDIKE heavy-duty and equipment coolants",
      "Match OEM MAT or specification lines on the PDS",
    ],
    upgradeOpportunities: [
      "Extended-life OAT program with standardized dilution",
      "Coolant analysis and refractometer training for fleets",
      "Premix delivery to reduce water quality issues",
    ],
    repTalkTrack:
      "Coolant is chemistry compatibility—not colour matching. Ask what factory fill was and whether they've mixed products. KLONDIKE coolants are sold on OEM sheet alignment per PDS; no guess topping.",
    questionsToAsk: [
      "OEM coolant spec on overflow bottle?",
      "Any top-off with other brands or water?",
      "Target freeze protection and climate?",
    ],
    cautionNotes: [
      "Never mix incompatible coolant technologies without flush protocol.",
      "Exact product requires PDS and OEM confirmation.",
    ],
    keywords: ["coolant", "antifreeze", "oat", "freeze", "overheat", "egw"],
  },

  foodGradeLubricant: {
    id: "foodGradeLubricant",
    category: "Food Grade Lubricant",
    aliases: [
      "food grade lubricant",
      "food grade oil",
      "food grade grease",
      "nsf h1",
      "h1 lubricant",
      "incidental contact",
    ],
    questionExamples: [
      "What food grade lubricant do I need?",
      "NSF H1 grease for our plant?",
      "Can I use regular hydraulic oil in food plant?",
    ],
    directAnswer:
      "Food-grade lubricants are selected by NSF registration category (H1 incidental contact, H2 non-contact, 3H direct contact where applicable), equipment OEM requirement, and audit standards—not by marketing claims alone. Documentation and category correctness are mandatory.",
    selectionFactors: [
      "NSF H1/H2/3H category for the contact scenario",
      "Equipment OEM food plant specification",
      "Wash-down and water exposure",
      "Temperature and load at the contact point",
      "Audit and customer approval lists",
    ],
    criticalSpecsToConfirm: [
      "NSF registration number and category",
      "Plant audit standard (e.g., customer HACCP requirements)",
      "OEM mandate for PAO vs mineral food-grade",
      "Prohibition on non-H1 fluids in zone",
    ],
    operatingConditionsToAskAbout: [
      "Incidental vs non-contact lubrication points",
      "Wash-down frequency and chemistry",
      "Temperature at bearing or chain",
      "Allergen or kosher/halal plant constraints",
    ],
    commonMistakes: [
      "Using H2 where H1 incidental contact is required",
      "Missing NSF documentation during audit",
      "Top-off with non-food fluid during breakdown",
      "Assuming white oil colour equals H1 compliance",
    ],
    failureRisks: [
      "Audit failure and production shutdown",
      "Contamination recall exposure",
      "Bearing failure from wrong viscosity H1 product",
    ],
    relatedEquipment: [
      "Food conveyor bearings",
      "Bottling and packaging lines",
      "Hydraulics near wash zones",
    ],
    relatedIndustries: ["food processing", "beverage", "pharmaceutical packaging"],
    klondikeProductCategories: [
      "KLONDIKE food-grade oils and greases with NSF H1 documentation on the PDS",
      "Confirm registration category and SKU per audit package",
    ],
    upgradeOpportunities: [
      "Plant-wide H1 standardization with documented register",
      "Synthetic H1 for high-temp chains where PDS supports",
      "Training on segregation from non-food bulk storage",
    ],
    repTalkTrack:
      "Food grade is paperwork plus chemistry. Ask for the audit standard and whether contact is incidental. Only quote KLONDIKE SKUs with NSF H1 on the PDS—and bring the registration documentation to the meeting.",
    questionsToAsk: [
      "H1 incidental or H2 non-contact?",
      "Customer audit requirements?",
      "Wash-down exposure on the lube point?",
    ],
    cautionNotes: [
      "Non-food fluids in food zones create recall and audit risk.",
      "Exact SKU and NSF registration must be confirmed on the PDS.",
    ],
    keywords: ["food grade", "h1", "nsf", "plant", "incidental contact"],
  },

  openGearLubricant: {
    id: "openGearLubricant",
    category: "Open Gear Lubricant",
    aliases: [
      "open gear lubricant",
      "open gear grease",
      "wire rope lubricant",
      "adhesive gear compound",
      "spray gear lube",
    ],
    questionExamples: [
      "What lube for open gears on a ball mill?",
      "Open gear lubricant selection?",
      "Spray grease for girth gear?",
    ],
    directAnswer:
      "Open gear lubricants prioritize adhesion, film thickness, and contamination tolerance on exposed slow-speed gears where enclosed gear oil cannot stay. Selection follows OEM or inspector method (spray, dip, idler lube), pitch line velocity, and whether asphaltic, synthetic, or semi-fluid products are specified.",
    selectionFactors: [
      "OEM or inspector lubrication method",
      "Pitch line velocity and load",
      "Adhesion and tack requirement",
      "Dust and water exposure",
      "Compatibility with spray systems and pumps",
      "Environmental and site HSE constraints",
    ],
    criticalSpecsToConfirm: [
      "OEM open gear lubricant specification",
      "Spray system nozzle and pump compatibility",
      "Inspection interval and film thickness targets",
      "Prohibition on asphaltic products on some sites",
    ],
    operatingConditionsToAskAbout: [
      "Dust fines and water spray on gear face",
      "Manual vs automatic spray system",
      "Historical scoring or spalling",
      "Temperature at tooth contact",
    ],
    commonMistakes: [
      "Using enclosed gear oil on open girth gears",
      "Under-application causing dry contact",
      "Mixing incompatible open gear compounds",
      "Choosing high NLGI chassis grease instead of open gear product",
    ],
    failureRisks: [
      "Scoring and spalling on girth gears",
      "Spray nozzle plugging from wrong consistency",
      "Contamination packing accelerating wear",
    ],
    relatedEquipment: [
      "Ball mill girth gears",
      "Dragline and shovel open gears",
      "Kiln and dryer ring gears",
    ],
    relatedIndustries: ["mining", "cement", "steel", "bulk processing"],
    klondikeProductCategories: [
      "KLONDIKE open gear and specialty adhesive lubricants where PDS documents spray or open gear service",
    ],
    upgradeOpportunities: [
      "Automated spray program with premium adhesive synthetic",
      "Inspection-aligned application training",
      "Contamination shields paired with correct open gear chemistry",
    ],
    repTalkTrack:
      "Open gear is adhesion and application method—not GL rating from a truck axle. Ask how they spray, how dusty it is, and what the last inspector said. Quote KLONDIKE only where the PDS names open gear service.",
    questionsToAsk: [
      "Spray, dip, or manual brush application?",
      "OEM or inspector specification sheet?",
      "Dust and water exposure on gear face?",
    ],
    cautionNotes: [
      "Enclosed gear oil specifications do not apply to open gears.",
      "Exact product requires PDS and OEM/inspector confirmation.",
    ],
    keywords: ["open gear", "girth gear", "spray", "adhesive", "mill", "kiln"],
  },
};
