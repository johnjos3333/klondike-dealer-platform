/**
 * Lubrication vocabulary knowledge — deterministic field slang → normalized category guidance.
 * Not wired to UI yet.
 */

export const lubricationVocabularyKnowledge = {
  dripOil: {
    id: "dripOil",
    fieldTerm: "Drip oil",
    aliases: [
      "drip oil",
      "drip feed oil",
      "gravity feed oil",
      "wick oil",
      "total loss lubrication oil",
    ],
    normalizedCategory: "Light machine / bearing oil or ISO circulating oil (application-specific)",
    explanation:
      "“Drip oil” usually describes how oil is applied—slow gravity or wick feed to plain bearings, chains, or slideways—not a single ASTM product class. The correct fluid is whatever viscosity and oxidation/corrosion package the OEM or machine tag specifies for that drip system.",
    relatedApplications: [
      "Plain bearing drip cups on older machine tools",
      "Slow-speed chains or conveyors with drip lubricators",
      "Small gearboxes fed by sight-feed oilers",
    ],
    likelyIndustries: ["manufacturing", "wood products", "general industrial", "legacy machine shops"],
    likelyKlondikeCategories: [
      "Industrial circulating / way-type ISO oils where viscosity matches tag",
      "R&O or lightly additized ISO grades per OEM—not assumed without PDS confirmation",
    ],
    commonMisunderstandings: [
      "Treating “drip oil” as interchangeable with hydraulic AW or engine oil",
      "Assuming one viscosity fits every drip sight glass",
    ],
    questionsToAsk: [
      "What ISO viscosity is stamped on the reservoir or sight feed?",
      "Plain bearing, chain, or way surface?",
      "Mineral vs synthetic requirement from OEM?",
    ],
    cautionNotes: [
      "Match viscosity and additive class to the drip system OEM—do not substitute hydraulic fluid without confirmation.",
    ],
    keywords: ["drip", "drip feed", "gravity feed", "wick", "sight feed"],
  },

  deepWellPumpOil: {
    id: "deepWellPumpOil",
    fieldTerm: "Deep well pump oil",
    aliases: [
      "deep well pump oil",
      "well pump oil",
      "submersible pump oil",
      "downhole pump oil",
    ],
    normalizedCategory: "Submersible / vertical turbine pump lubricant or motor fill (OEM-specific)",
    explanation:
      "Field crews often say “well pump oil” for vertical turbine pumps, submersible motors, or packing lubricators. The actual product may be a clean R&O, turbine-type, or OEM-named submersible fluid—not generic hydraulic AW.",
    relatedApplications: [
      "Vertical turbine line-shaft pumps",
      "Submersible motor oil cavities",
      "Water well and municipal lift stations",
    ],
    likelyIndustries: ["municipal water", "agriculture irrigation", "oil & gas water handling"],
    likelyKlondikeCategories: [
      "Clean circulating / R&O or turbine-class oils where OEM and viscosity align",
      "Dedicated OEM submersible products—confirm name on nameplate before quoting",
    ],
    commonMisunderstandings: [
      "Using hydraulic AW because it is “oil in a drum”",
      "Confusing packing drip oil with motor cavity fill oil",
    ],
    questionsToAsk: [
      "Pump OEM and model plate—what fluid name does the manual list?",
      "Motor cavity vs line-shaft vs packing lubricator?",
      "Required viscosity and cleanliness class?",
    ],
    cautionNotes: [
      "Submersible and turbine pumps are warranty-sensitive—quote only after OEM fluid name and viscosity are confirmed.",
    ],
    keywords: ["well pump", "deep well", "submersible", "turbine pump", "line shaft"],
  },

  wayLubeSlidewayOil: {
    id: "wayLubeSlidewayOil",
    fieldTerm: "Way lube / slideway oil",
    aliases: [
      "way lube",
      "way oil",
      "slideway oil",
      "machine way oil",
      "gibs oil",
    ],
    normalizedCategory: "ISO way / slideway oil (often tacky, anti-stick-slip, compatible with metalworking fluids)",
    explanation:
      "Way or slideway oils lubricate machine tool carriages and gibs. They are typically ISO VG 32–220 with friction modifiers for stick-slip control and formulation compatibility with coolants—not standard hydraulic AW unless OEM allows it.",
    relatedApplications: [
      "CNC lathes and mills—table and saddle ways",
      "Grinders and planers with heavy carriage loads",
      "Legacy manual machines with bronze or plastic way liners",
    ],
    likelyIndustries: ["metalworking", "manufacturing", "job shops"],
    likelyKlondikeCategories: [
      "Industrial way oils (e.g. ISO 68 Way Oil family in PDS library—match grade to machine tag)",
    ],
    commonMisunderstandings: [
      "Using AW hydraulic because it is the same ISO grade number",
      "Ignoring stick-slip and coolant compatibility requirements",
    ],
    questionsToAsk: [
      "Machine OEM and recommended way oil ISO grade?",
      "Synthetic vs mineral way oil policy?",
      "Water-based or neat coolant in use?",
    ],
    cautionNotes: [
      "Way oil chemistry differs from hydraulic AW with the same ISO number—confirm OEM before cross-filling.",
    ],
    keywords: ["way lube", "way oil", "slideway", "gib", "stick slip"],
  },

  chainOil: {
    id: "chainOil",
    fieldTerm: "Chain oil",
    aliases: [
      "chain oil",
      "conveyor chain oil",
      "roller chain lube",
      "bike chain oil",
      "high tack chain spray",
    ],
    normalizedCategory: "Chain lubricant (often tacky ISO oil, syn blend, or aerosol; food-grade variants exist)",
    explanation:
      "“Chain oil” in industry usually means a tacky or penetrating ISO fluid designed to stay on pins and rollers, sometimes with temp or wash-off requirements. Food plants may require H1/H2 registered products for exposed chains.",
    relatedApplications: [
      "Conveyor lines in packaging and warehousing",
      "Oven chains and kiln infeed (high-temp grades)",
      "Farm equipment roller chains",
    ],
    likelyIndustries: ["food processing", "manufacturing", "agriculture", "forestry"],
    likelyKlondikeCategories: [
      "Dedicated chain/bar-type oils where PDS lists chain duty",
      "Food-grade oils/greases where audit requires NSF registration",
    ],
    commonMisunderstandings: [
      "Using engine oil on high-speed oven chains",
      "Assuming all chain oils are the same tack level",
    ],
    questionsToAsk: [
      "Chain speed, temperature, and wash-down exposure?",
      "Manual brush, bath, or automatic drip/spray system?",
      "Food zone or industrial only?",
    ],
    cautionNotes: [
      "Match temperature and tack requirements to PDS—do not assume SKU without application review.",
    ],
    keywords: ["chain oil", "conveyor chain", "roller chain", "tacky chain"],
  },

  barOil: {
    id: "barOil",
    fieldTerm: "Bar oil",
    aliases: [
      "bar oil",
      "bar and chain oil",
      "chainsaw bar oil",
      "saw bar oil",
    ],
    normalizedCategory: "Adhesive chainsaw / bar and chain lubricant (often ISO-type tacky oil)",
    explanation:
      "Bar oil is the tacky oil carried to the cutting chain on chainsaws and some harvest equipment. It is formulated to cling to the bar under sling-off—not hydraulic fluid or engine oil unless OEM explicitly allows emergency use.",
    relatedApplications: [
      "Chainsaws and pole saws",
      "Some firewood processors and delimbers",
    ],
    likelyIndustries: ["forestry", "agriculture", "rental yards", "utilities vegetation management"],
    likelyKlondikeCategories: [
      "Bar and chain oil products in PDS library (standard and hi-tack variants—match label to season and saw OEM)",
    ],
    commonMisunderstandings: [
      "Using old engine oil as bar oil (environmental and pump issues)",
      "Confusing bar oil with two-stroke mix oil",
    ],
    questionsToAsk: [
      "Summer vs winter tack formulation preference?",
      "Biodegradable or environmental requirement on public land?",
      "Electric vs gas saw—some users prefer specific viscosities",
    ],
    cautionNotes: [
      "Follow local environmental rules for bar oil disposal and spill response.",
    ],
    keywords: ["bar oil", "bar and chain", "chainsaw", "saw chain"],
  },

  rockDrillOil: {
    id: "rockDrillOil",
    fieldTerm: "Rock drill oil",
    aliases: [
      "rock drill oil",
      "drill oil",
      "percussion drill oil",
      "jackleg oil",
    ],
    normalizedCategory: "Rock drill / pneumatic percussion tool lubricant (often ISO 100–150, EP, misting)",
    explanation:
      "Rock drill oils lubricate down-the-hole and percussion drills where oil is metered into air lines. They are typically higher ISO grades with EP and misting behavior—not general hydraulic AW unless OEM says otherwise.",
    relatedApplications: [
      "Surface and underground drilling",
      "Construction blasting holes",
      "Mining production drilling",
    ],
    likelyIndustries: ["mining", "construction", "quarry"],
    likelyKlondikeCategories: [
      "Biodegradable rock drill oils where environmental permits require OECD documentation",
      "Industrial EP oils only if OEM explicitly cross-lists—confirm before substituting",
    ],
    commonMisunderstandings: [
      "Using AW hydraulic because it is ISO 100",
      "Ignoring biodegradable permit language on site",
    ],
    questionsToAsk: [
      "Drill OEM and model?",
      "Environmental permit requiring biodegradable rock drill oil?",
      "ISO 100 vs 150 on the tag?",
    ],
    cautionNotes: [
      "Rock drill programs are safety- and compliance-critical—confirm OEM and permit before any product change.",
    ],
    keywords: ["rock drill", "drill oil", "percussion", "jackleg", "dth"],
  },

  jackhammerOil: {
    id: "jackhammerOil",
    fieldTerm: "Jackhammer oil",
    aliases: [
      "jackhammer oil",
      "pavement breaker oil",
      "demo hammer oil",
      "pneumatic tool oil",
    ],
    normalizedCategory: "Pneumatic tool / rock drill line oil (light ISO, tool OEM specified)",
    explanation:
      "“Jackhammer oil” is usually a light ISO oil injected into pneumatic breakers for air-line lubrication. It is not hydraulic tractor fluid or motor oil—tool manuals specify grade and sometimes a proprietary name.",
    relatedApplications: [
      "Handheld pavement breakers",
      "Paving crews and rental yards",
      "Utility trenching with air tools",
    ],
    likelyIndustries: ["construction", "municipal", "rental"],
    likelyKlondikeCategories: [
      "Light ISO tool oils where PDS or OEM cross-reference exists—otherwise needs technical confirmation",
    ],
    commonMisunderstandings: [
      "Pouring AW hydraulic into the airline oiler",
      "Using two-stroke oil in pneumatic tool oilers",
    ],
    questionsToAsk: [
      "Tool brand and model on the nameplate?",
      "Oil injector setting and airline CFM?",
      "Summer vs winter ambient for viscosity choice?",
    ],
    cautionNotes: [
      "Pneumatic tool failure from wrong oil is common—get OEM lubricant class before quoting.",
    ],
    keywords: ["jackhammer", "pavement breaker", "pneumatic tool", "air tool oil"],
  },

  circulatingOil: {
    id: "circulatingOil",
    fieldTerm: "Circulating oil",
    aliases: [
      "circulating oil",
      "circ oil",
      "system oil",
      "bearing circulating oil",
    ],
    normalizedCategory: "Industrial circulating / R&O or turbine-compressor class oil (ASTM/DIN per system)",
    explanation:
      "Circulating oil is a service description: oil recirculated through bearings, gears, or paper-machine loops. The real spec is ASTM D4304 turbine type, DIN 51524 hydraulic class, paper-machine R&O, or paper-machine—each is different from mobile AW.",
    relatedApplications: [
      "Paper machine wet sections and dryer bearings",
      "Large fan and motor bearing loops",
      "Some enclosed gear spray systems",
    ],
    likelyIndustries: ["pulp & paper", "manufacturing", "power generation"],
    likelyKlondikeCategories: [
      "Long-life turbine oils and synthetic circulating compressor/turbine oils where ASTM class matches OEM",
      "Industrial R&O ISO grades where loop design matches PDS",
    ],
    commonMisunderstandings: [
      "Topping circulating loops with AW hydraulic from the shop",
      "Assuming all “ISO 46” fluids are interchangeable across systems",
    ],
    questionsToAsk: [
      "OEM circulating oil class—turbine, paper machine, or gear spray?",
      "ISO viscosity and filtration micron rating?",
      "Reservoir size and target drain interval?",
    ],
    cautionNotes: [
      "Circulating systems are class-sensitive—confirm ASTM/DIN/OEM sheet before any cross-fill.",
    ],
    keywords: ["circulating", "circ oil", "system oil", "bearing loop"],
  },

  spindleOil: {
    id: "spindleOil",
    fieldTerm: "Spindle oil",
    aliases: [
      "spindle oil",
      "high speed spindle oil",
      "cnc spindle oil",
      "air oil mist spindle",
    ],
    normalizedCategory: "Low-viscosity, low-foaming precision spindle / air-oil mist lubricant",
    explanation:
      "Spindle oils are very low ISO grades (often ISO 2–22) with air-release, foaming, and oxidation control for high-speed CNC spindles or oil-mist systems. They are not hydraulic ISO 32/46 unless OEM explicitly allows it.",
    relatedApplications: [
      "CNC machining centers",
      "Grinding spindles",
      "Some textile and precision equipment",
    ],
    likelyIndustries: ["metalworking", "aerospace machining", "medical device manufacturing"],
    likelyKlondikeCategories: [
      "Precision low-viscosity industrial oils where PDS lists spindle or high-speed duty—confirm SKU with technical",
    ],
    commonMisunderstandings: [
      "Using way oil or hydraulic fluid in a mist spindle",
      "Confusing spindle ISO 10 with hydraulic ISO 10",
    ],
    questionsToAsk: [
      "Spindle OEM and recommended oil name/ISO?",
      "Mist, air-oil, or direct lube?",
      "Maximum rpm and bearing type?",
    ],
    cautionNotes: [
      "Spindle mistakes destroy bearings in hours—never guess; confirm OEM lubricant list.",
    ],
    keywords: ["spindle", "cnc spindle", "air oil mist", "high speed spindle"],
  },

  steamCylinderOil: {
    id: "steamCylinderOil",
    fieldTerm: "Steam cylinder oil",
    aliases: [
      "steam cylinder oil",
      "steam oil",
      "reciprocating steam oil",
    ],
    normalizedCategory: "Steam cylinder / compounded or synthetic steam lubricant (legacy industrial)",
    explanation:
      "Steam cylinder oils historically compounded mineral oils for reciprocating steam engines and wet steam. Modern plants may use synthetic steam-turbine compatible products or specialty grades—always follow OEM and insurance boiler codes.",
    relatedApplications: [
      "Heritage steam engines and tourist railroads",
      "Some industrial steam drives (rare)",
    ],
    likelyIndustries: ["heritage rail", "industrial museums", "limited specialty steam"],
    likelyKlondikeCategories: [
      "Specialty steam or industrial grades only where PDS explicitly lists steam cylinder service—needs technical confirmation",
    ],
    commonMisunderstandings: [
      "Using turbine oil for reciprocating steam cylinder without OEM approval",
      "Assuming any R&O is “steam oil”",
    ],
    questionsToAsk: [
      "Exact steam equipment and OEM lubricant bulletin?",
      "Wet vs superheated steam?",
      "Insurance or historical society requirements?",
    ],
    cautionNotes: [
      "Steam applications are specialty—do not substitute without written OEM and code guidance.",
    ],
    keywords: ["steam cylinder", "steam oil", "reciprocating steam"],
  },

  wormGearOil: {
    id: "wormGearOil",
    fieldTerm: "Worm gear oil",
    aliases: [
      "worm gear oil",
      "worm drive oil",
      "bronze worm gear oil",
    ],
    normalizedCategory: "Industrial worm drive gear oil (often high PAO or compounded, GL-4 class caution with bronze)",
    explanation:
      "Worm drives often use high-viscosity industrial gear oils with chemistry safe for bronze worm wheels. Field slang “worm oil” does not mean automotive GL-5—GL-5 can be harmful to bronze in many worm sets.",
    relatedApplications: [
      "Conveyor drives and packaging machinery worm reducers",
      "Elevators and screw jacks",
      "Mixers and kilns with worm stages",
    ],
    likelyIndustries: ["manufacturing", "cement", "food processing", "material handling"],
    likelyKlondikeCategories: [
      "Industrial EP gear lubricants where OEM specifies worm-safe chemistry—confirm GL level and yellow-metal note on PDS",
    ],
    commonMisunderstandings: [
      "Pouring automotive GL-5 into a bronze worm gearbox",
      "Assuming ISO VG alone defines suitability",
    ],
    questionsToAsk: [
      "Gearbox tag—OEM name and viscosity?",
      "Bronze worm wheel yes/no?",
      "Mineral vs synthetic policy?",
    ],
    cautionNotes: [
      "Worm and yellow-metal gear sets are chemistry-sensitive—verify PDS GL/OEM compatibility before quoting.",
    ],
    keywords: ["worm gear", "worm drive", "bronze worm", "worm reducer"],
  },

  wetKitOil: {
    id: "wetKitOil",
    fieldTerm: "Wet kit oil",
    aliases: [
      "wet kit oil",
      "wet line oil",
      "wet kit fluid",
      "hydraulic wet line",
    ],
    normalizedCategory: "Hydraulic fluid for wet-line PTO / mobile hydraulics (often AW HM; sometimes UTF—OEM dependent)",
    explanation:
      "“Wet kit” in trucking usually refers to a PTO-driven hydraulic system on the truck chassis. Crews may say “wet kit oil” when they mean the hydraulic reservoir for that system—typically an ISO HM AW product, but some vocational setups share fluids with other circuits; confirm OEM.",
    relatedApplications: [
      "Dump bodies, roll-offs, and walking floors",
      "Live bottom trailers",
      "Mobile cranes and boom trucks with PTO hydraulics",
    ],
    likelyIndustries: ["trucking", "construction", "waste hauling"],
    likelyKlondikeCategories: [
      "Commercial or Advanced AW hydraulic fluids matching ISO grade on tag",
      "UTF only if OEM explicitly calls for tractor-type fluid in that wet line—rare; confirm",
    ],
    commonMisunderstandings: [
      "Confusing wet kit hydraulic with engine oil or transmission fluid",
      "Using UTF in a standard ISO AW wet line without OEM approval",
    ],
    questionsToAsk: [
      "Separate wet line reservoir or tied to transmission?",
      "ISO grade on dipstick or decal?",
      "Ambient operating range for viscosity choice?",
    ],
    cautionNotes: [
      "Wet line mistakes cause PTO cavitation and cylinder scoring—confirm reservoir type before bulk fill.",
    ],
    keywords: ["wet kit", "wet line", "pto hydraulic", "wet line oil"],
  },

  vacuumPumpOil: {
    id: "vacuumPumpOil",
    fieldTerm: "Vacuum pump oil",
    aliases: [
      "vacuum pump oil",
      "vac pump oil",
      "diffusion pump oil",
    ],
    normalizedCategory: "Vacuum pump seal / lubricating oil (low vapor pressure, oxidation, demulsibility)",
    explanation:
      "Vacuum pump oils are formulated for low vapor pressure, good air release, and resistance to sludge under vacuum—not general hydraulic AW. Diffusion pumps use entirely different chemistries.",
    relatedApplications: [
      "Rotary vane and piston vacuum pumps in packaging and medical molding",
      "Industrial degassing and hold-down systems",
    ],
    likelyIndustries: ["manufacturing", "food packaging", "plastics", "wood products"],
    likelyKlondikeCategories: [
      "Dedicated vacuum pump fluids where PDS lists vacuum service—otherwise needs technical confirmation",
    ],
    commonMisunderstandings: [
      "Topping vacuum pumps with compressor or hydraulic oil",
      "Treating “vacuum oil” as one universal product",
    ],
    questionsToAsk: [
      "Pump OEM and model?",
      "Ultimate vacuum level required?",
      "Food or oxygen exposure restrictions?",
    ],
    cautionNotes: [
      "Wrong vacuum fluid can destroy ultimate vacuum and contaminate processes—confirm OEM fluid name.",
    ],
    keywords: ["vacuum pump", "vac pump", "vacuum oil"],
  },

  compressorLube: {
    id: "compressorLube",
    fieldTerm: "Compressor lube",
    aliases: [
      "compressor lube",
      "compressor oil",
      "air compressor oil",
      "rotary screw oil",
    ],
    normalizedCategory: "Compressor sump lubricant (rotary screw, reciprocating, or circulating ASTM D4304 class)",
    explanation:
      "“Compressor lube” means the oil in the compressor air end or crankcase—not hydraulic AW. Rotary screws need demulsibility, foam control, and varnish resistance per OEM class; reciprocating units may use different ISO and additive packages.",
    relatedApplications: [
      "Plant rotary screw air compressors",
      "Portable job-site compressors",
      "Natural gas engine-driven compressors (separate category from air screw)",
    ],
    likelyIndustries: ["manufacturing", "construction", "oil & gas"],
    likelyKlondikeCategories: [
      "ISO 46 Full Synthetic Compressor Oil and Full Synthetic Circulating Compressor/Turbine oils where ASTM class matches OEM",
      "Natural gas compressor rows where fuel gas service applies—separate from air screw",
    ],
    commonMisunderstandings: [
      "Emergency top-off with AW hydraulic",
      "Assuming one compressor oil covers natural gas and air screw service",
    ],
    questionsToAsk: [
      "Air screw, reciprocating, or gas compressor?",
      "OEM fluid name and drain interval?",
      "Food-grade or breathing air downstream?",
    ],
    cautionNotes: [
      "Compressor class and fuel type must match PDS—never interchange without OEM sign-off.",
    ],
    keywords: ["compressor", "air compressor", "rotary screw", "compressor lube"],
  },

  foodMachineryOil: {
    id: "foodMachineryOil",
    fieldTerm: "Food machinery oil",
    aliases: [
      "food machinery oil",
      "food grade machine oil",
      "food plant oil",
      "h1 machine oil",
    ],
    normalizedCategory: "Food-grade registered lubricant (typically NSF H1 for incidental contact zones)",
    explanation:
      "“Food machinery oil” is field shorthand for lubricants acceptable in food, beverage, or packaging plants—usually NSF H1 registered hydraulic, gear, or chain oils. Category (H1/H2) and audit documentation matter as much as chemistry.",
    relatedApplications: [
      "Hydraulic lifts and wrappers in food packaging",
      "Conveyor gearboxes in washdown environments",
      "Chain lubrication near open product",
    ],
    likelyIndustries: ["food processing", "beverage", "bakery", "meat and poultry"],
    likelyKlondikeCategories: [
      "FOOD-GRADE Hydraulic Oils and food-grade greases where NSF H1 is documented on PDS",
    ],
    commonMisunderstandings: [
      "Assuming white mineral oil is automatically H1",
      "Using H2 product in an incidental contact zone",
    ],
    questionsToAsk: [
      "H1, H2, or 3H zone per QA?",
      "Hydraulic, chain, or gearbox point?",
      "Current NSF registration numbers on file?",
    ],
    cautionNotes: [
      "Food-grade is regulatory and audit-driven—verify current NSF registration on PDS before quoting.",
    ],
    keywords: ["food machinery", "food grade", "food plant", "h1", "nsf"],
  },

  quenchOil: {
    id: "quenchOil",
    fieldTerm: "Quench oil",
    aliases: [
      "quench oil",
      "hardening oil",
      "heat treat quench",
      "martempering oil",
    ],
    normalizedCategory: "Heat-treatment quenchant (accelerated or martempering oils; specialty refinery products)",
    explanation:
      "Quench oils control cooling rate during hardening of steel parts. They are specialty heat-treat fluids with fire safety, oxidation, and residue requirements—not hydraulic or gear oils unless a heat-treat OEM explicitly cross-approves (rare).",
    relatedApplications: [
      "Commercial heat treating shops",
      "Forging and gear hardening lines",
    ],
    likelyIndustries: ["metalworking", "automotive suppliers", "industrial forging"],
    likelyKlondikeCategories: [
      "Specialty heat-treat fluids only if indexed on PDS for quench service—otherwise needs technical confirmation",
    ],
    commonMisunderstandings: [
      "Using hydraulic oil as quench medium",
      "Confusing quench oil with heat transfer fluids for temperature control loops",
    ],
    questionsToAsk: [
      "Quench severity (fast oil vs martempering)?",
      "Fire insurance and flash point requirements?",
      "OEM furnace and quench system manual fluid name?",
    ],
    cautionNotes: [
      "Quench fluids are fire- and process-critical—never substitute without metallurgical and OEM approval.",
    ],
    keywords: ["quench", "hardening", "heat treat", "martempering"],
  },

  turbineOil: {
    id: "turbineOil",
    fieldTerm: "Turbine oil",
    aliases: [
      "turbine oil",
      "steam turbine oil",
      "gas turbine oil",
    ],
    normalizedCategory: "Steam or gas turbine circulating oil (ASTM D4304 Type I / DIN 51515 class)",
    explanation:
      "Turbine oils are long-life circulating fluids for steam and gas turbines with oxidation, rust, and water-separation performance—not hydraulic AW. Field crews sometimes mislabel any light ISO 32/46 plant oil as “turbine oil.”",
    relatedApplications: [
      "Industrial steam and gas turbines",
      "Some combined-cycle lube consoles",
    ],
    likelyIndustries: ["power generation", "manufacturing", "refining"],
    likelyKlondikeCategories: [
      "Long Life Turbine Oils and Full Synthetic Circulating Compressor/Turbine Oils where ASTM class matches OEM",
    ],
    commonMisunderstandings: [
      "Topping turbine consoles with R&O hydraulic",
      "Assuming compressor and turbine oils are always interchangeable",
    ],
    questionsToAsk: [
      "Steam vs gas turbine OEM class?",
      "Required ISO viscosity?",
      "Water separation and varnish mitigation program?",
    ],
    cautionNotes: [
      "Turbine trips are high-consequence—fluid class must match OEM and ASTM/DIN rows on PDS.",
    ],
    keywords: ["turbine oil", "steam turbine", "gas turbine", "dge"],
  },

  heatTransferOil: {
    id: "heatTransferOil",
    fieldTerm: "Heat transfer oil",
    aliases: [
      "heat transfer oil",
      "thermal fluid",
      "hot oil",
      "htf",
      "thermal oil",
    ],
    normalizedCategory: "Closed-loop heat transfer fluid (not quench oil, not hydraulic AW)",
    explanation:
      "Heat transfer fluids carry heat in closed hot-oil systems for reactors, fryers, asphalt plants, and lumber kilns. They are selected for thermal stability, flash point, and max film temperature—not hydraulic pump charts.",
    relatedApplications: [
      "Plastics and chemical process temperature control units",
      "Indirect heating loops",
      "Some food fryer and oven systems (food-grade HTF variants)",
    ],
    likelyIndustries: ["chemicals", "asphalt", "food processing", "wood products"],
    likelyKlondikeCategories: [
      "Heat transfer fluid products where PDS lists thermal fluid service—confirm SKU with technical",
    ],
    commonMisunderstandings: [
      "Using hydraulic oil in a hot oil heater",
      "Confusing HTF with quench oil or engine oil",
    ],
    questionsToAsk: [
      "Maximum bulk oil temperature and heater design?",
      "Open vs closed expansion tank?",
      "Food-grade HTF requirement?",
    ],
    cautionNotes: [
      "Heat transfer systems are fire- and insurance-sensitive—never substitute without OEM heater manual alignment.",
    ],
    keywords: ["heat transfer", "thermal fluid", "hot oil", "htf"],
  },

  dielectricOil: {
    id: "dielectricOil",
    fieldTerm: "Dielectric oil",
    aliases: [
      "dielectric oil",
      "insulating oil",
      "high voltage oil",
      "transformer fluid",
    ],
    normalizedCategory: "Electrical insulating / dielectric fluid (transformer oil or specialty dielectric hydraulic—OEM specific)",
    explanation:
      "“Dielectric oil” most often means electrical insulating oil for transformers and switchgear, or a specialty dielectric hydraulic for utility aerial devices. It is not standard AW hydraulic unless PDS and OEM explicitly say so.",
    relatedApplications: [
      "Power transformers and padmount units",
      "Some high-voltage switchgear",
      "Utility aerial hydraulic dielectric programs (specialty)",
    ],
    likelyIndustries: ["utilities", "electrical contractors", "industrial plants"],
    likelyKlondikeCategories: [
      "Transformer / electrical insulating oils where PDS lists that service",
      "Dielectric hydraulic only with explicit PDS utility application—otherwise needs technical confirmation",
    ],
    commonMisunderstandings: [
      "Using AW hydraulic in transformers",
      "Assuming all clear oils are dielectric",
    ],
    questionsToAsk: [
      "Transformer nameplate kV and OEM fluid spec?",
      "Dielectric test interval and dissolved gas policy?",
      "Utility aerial vs substation transformer context?",
    ],
    cautionNotes: [
      "Electrical insulating fluids are life-safety critical—quote only from PDS-confirmed electrical grades.",
    ],
    keywords: ["dielectric", "insulating oil", "high voltage", "transformer"],
  },

  transformerOil: {
    id: "transformerOil",
    fieldTerm: "Transformer oil",
    aliases: [
      "transformer oil",
      "insulating oil",
      "naphthenic transformer oil",
    ],
    normalizedCategory: "Mineral or synthetic electrical insulating oil for transformers (IEC/IEEE class per OEM)",
    explanation:
      "Transformer oil is a refined insulating fluid with dielectric strength, oxidation stability, and gas evolution properties for electrical equipment. It is never hydraulic AW unless a specific rare OEM cross-reference exists (almost never).",
    relatedApplications: [
      "Distribution and power transformers",
      "Some load tap changers",
    ],
    likelyIndustries: ["utilities", "electrical OEMs", "large industrials"],
    likelyKlondikeCategories: [
      "Transformer oil products in PDS library where display name matches electrical insulating service",
    ],
    commonMisunderstandings: [
      "Filling new transformers with whatever clear oil is on the truck",
      "Mixing different insulating oil brands without compatibility study",
    ],
    questionsToAsk: [
      "Transformer OEM and required fluid name?",
      "New fill vs reconditioned oil acceptance?",
      "Mineral vs ester synthetic insulating fluid requirement?",
    ],
    cautionNotes: [
      "Transformer fills require lab testing and OEM acceptance—never improvise.",
    ],
    keywords: ["transformer oil", "insulating oil", "padmount", "substation"],
  },

  openGearLube: {
    id: "openGearLube",
    fieldTerm: "Open gear lube",
    aliases: [
      "open gear lube",
      "open gear grease",
      "girth gear lube",
      "kiln gear grease",
      "rope shovel open gear",
    ],
    normalizedCategory: "Open gear grease or semi-fluid open gear lubricant (high film strength, spray or brush application)",
    explanation:
      "Open gear lube refers to exposed girth gears, kilns, and large mining shovel drives. Products are typically high-viscosity greases or semi-fluid open gear compounds with weld load and adhesion language—not enclosed gearbox GL-5.",
    relatedApplications: [
      "Cement kiln girth gears",
      "Mining shovel and dragline open drives",
      "Ball mills with open gearing",
    ],
    likelyIndustries: ["cement", "mining", "aggregates"],
    likelyKlondikeCategories: [
      "Open Gear Grease and Open Gear Lubricant PDS rows—match grease vs semi-fluid per OEM method",
    ],
    commonMisunderstandings: [
      "Using multipurpose EP-2 on million-pound girth gears",
      "Confusing open gear grease with asphaltic legacy compounds without reading PDS",
    ],
    questionsToAsk: [
      "Spray, idler flood, or brush application?",
      "OEM open gear product class?",
      "Ambient and contamination environment?",
    ],
    cautionNotes: [
      "Open gear selection is OEM- and method-specific—confirm application system before quoting.",
    ],
    keywords: ["open gear", "girth gear", "kiln gear", "rope shovel"],
  },

  fifthWheelGrease: {
    id: "fifthWheelGrease",
    fieldTerm: "Fifth wheel grease",
    aliases: [
      "fifth wheel grease",
      "5th wheel grease",
      "kingpin grease",
      "slider plate grease",
    ],
    normalizedCategory: "Tacky moly-fortified NLGI 2 grease for fifth wheel plate and kingpin sliding interfaces",
    explanation:
      "Fifth wheel grease is a specialty tacky, moly-fortified NLGI 2 product for plate and kingpin wear—not general multipurpose chassis grease unless OEM allows. PDS documents barium complex thickener and adhesion language for KLONDIKE Fifth Wheel Grease.",
    relatedApplications: [
      "Class 8 tractors and vocational trucks",
      "Sliding fifth wheel plates in high-mile fleets",
    ],
    likelyIndustries: ["trucking", "heavy haul", "logging"],
    likelyKlondikeCategories: [
      "Fifth Wheel Grease (indexed grease spotlight—match OEM fifth wheel note)",
    ],
    commonMisunderstandings: [
      "Using chassis lithium EP-2 on plates that see rain and road spray wash-off",
      "Confusing fifth wheel grease with wheel bearing grease chemistry",
    ],
    questionsToAsk: [
      "OEM fifth wheel lubrication note on plate?",
      "Automatic lubrication system or manual?",
      "Winter vs summer tack preference?",
    ],
    cautionNotes: [
      "Confirm thickener and moly allowance vs OEM—GC-LB multipurpose does not authorize fifth wheel duty.",
    ],
    keywords: ["fifth wheel", "5th wheel", "kingpin", "slider plate"],
  },

  railGrease: {
    id: "railGrease",
    fieldTerm: "Rail grease",
    aliases: [
      "rail grease",
      "curve rail grease",
      "track grease",
      "wayside lubricator grease",
    ],
    normalizedCategory: "Rail friction management / track lubricating grease (specialty rail spec)",
    explanation:
      "“Rail grease” usually means grease for wayside lubricators on curves to reduce wheel squeal and wear. It is a specialty rail industry product class with carrier compatibility—not standard multipurpose EP-2 unless OEM explicitly allows.",
    relatedApplications: [
      "Class I and short-line curve lubricators",
      "Transit rail friction management",
    ],
    likelyIndustries: ["railroad", "transit", "mining rail"],
    likelyKlondikeCategories: [
      "Rail-specific greases only where PDS or product line explicitly lists rail / track lubricator service—needs technical confirmation if not indexed",
    ],
    commonMisunderstandings: [
      "Filling track lubricators with chassis grease",
      "Assuming all high-tack greases are rail-approved",
    ],
    questionsToAsk: [
      "Railroad or transit agency spec number?",
      "Lubricator pump type and delivery temperature?",
      "Curve vs top-of-rail product distinction?",
    ],
    cautionNotes: [
      "Rail programs are spec-driven—do not substitute without agency or OEM lubricator approval.",
    ],
    keywords: ["rail grease", "track grease", "curve grease", "wayside"],
  },

  cottonPickerGrease: {
    id: "cottonPickerGrease",
    fieldTerm: "Cotton picker grease",
    aliases: [
      "cotton picker grease",
      "picker bar grease",
      "spindle grease",
      "harvest unit grease",
    ],
    normalizedCategory: "Ag harvest / high-moisture spindle and picker unit grease (OEM-specific, often tacky or washout-resistant)",
    explanation:
      "Cotton picker grease is field language for greases used on picker bars, moist lint environments, and high-hour harvest units. OEM lists are strict—often tacky, washout-resistant, or specific thickener families for John Deere or Case picker programs.",
    relatedApplications: [
      "Cotton pickers and strippers",
      "Some other high-lint harvest heads",
    ],
    likelyIndustries: ["agriculture"],
    likelyKlondikeCategories: [
      "Ag greases that match OEM picker/spindle charts on PDS—confirm part number and NLGI before quoting",
    ],
    commonMisunderstandings: [
      "Using cheap multipurpose grease in lint-choked spindles",
      "Assuming one “green” grease covers every John Deere point",
    ],
    questionsToAsk: [
      "OEM picker model and lubrication chart?",
      "Spindle vs bar vs general chassis points?",
      "High-moisture or extended harvest hours?",
    ],
    cautionNotes: [
      "Picker failures during harvest are costly—match OEM zerk chart exactly; do not guess SKU.",
    ],
    keywords: ["cotton picker", "picker bar", "spindle grease", "harvest unit"],
  },
};
