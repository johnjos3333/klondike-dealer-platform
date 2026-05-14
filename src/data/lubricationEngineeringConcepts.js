/**
 * Advanced lubrication engineering concepts — structured data for advisor intelligence.
 * Not wired to UI yet.
 */

export const lubricationEngineeringConcepts = {
  lithiumGreaseVsCalciumSulfonateGrease: {
    id: "lithiumGreaseVsCalciumSulfonateGrease",
    title: "Lithium Grease vs Calcium Sulfonate Grease",
    aliases: [
      "lithium vs calcium sulfonate",
      "lithium grease vs calcium sulfonate",
      "lithium complex vs calcium sulfonate",
      "calcium sulfonate grease comparison",
    ],
    questionExamples: [
      "What's the difference between lithium and calcium sulfonate grease?",
      "Should I use lithium or calcium sulfonate on wet pins?",
      "Is calcium sulfonate better than lithium grease?",
    ],
    directAnswer:
      "Lithium and lithium-complex greases are versatile general-purpose choices with good mechanical stability and broad pumpability. Calcium sulfonate greases often deliver stronger inherent corrosion protection, higher dropping point potential, and better tolerance to water contamination in severe outdoor service—but thickener chemistry is not interchangeable without OEM and compatibility checks.",
    technicalExplanation:
      "Lithium soap thickeners (including lithium complex) build a grease structure that handles moderate water, vibration, and temperature swings well. Calcium sulfonate thickeners combine sulfonate chemistry with calcium soap, frequently offering excellent rust protection, high load-carrying characteristics, and strong performance in wet, dusty, or marine-adjacent environments. Neither thickener alone defines EP level, base oil viscosity, or OEM approval; those come from the full formulation.",
    whyItMatters:
      "Reps hear 'just give me #2 grease' on fleets where water, shock load, or corrosion actually dictate thickener choice. Mis-matched grease can soften, bleed, harden, or fail to protect when the wrong thickener meets water, high heat, or mixed-product top-off.",
    operationalConsequences: [
      "Accelerated pin and bushing wear when EP or water resistance is inadequate",
      "Grease incompatibility causing softening, oil bleed, or blocked lines on auto-lube systems",
      "Corrosion on exposed joints in wet quarry, ag, or municipal fleets",
    ],
    relatedApplications: [
      "Loader and excavator pins",
      "Truck chassis and fifth-wheel fittings",
      "Conveyor and crusher bearings in wet plants",
    ],
    relatedFailureModes: [
      "Washout and rust on pins",
      "Grease incompatibility in centralized systems",
      "Bearing starvation from wrong NLGI or stiffening",
    ],
    relatedProductCategories: ["grease"],
    klondikeProductTieIns: [
      "KLONDIKE polyurea, lithium-complex, and calcium-sulfonate greases across AGRIMAX and industrial lines—confirm exact SKU and PDS for the application",
      "Severe-duty greases with water-spray and shock-load positioning where PDS documents EP and corrosion performance",
    ],
    repTalkTrack:
      "Start with where the grease lives—wet pins, dry chassis, or a centralized system. Lithium-complex is a strong default for mixed fleets, but calcium sulfonate earns its place when water, corrosion, and heavy load stack up. Pull the PDS for thickener type, NLGI, and OEM notes before you quote a swap.",
    questionsToAsk: [
      "Manual gun, auto-lube, or sealed-for-life?",
      "How much water, dust, or wash-down does the joint see?",
      "What grease is in service now, and has mixing already happened?",
      "Any OEM or auto-lube supplier thickener restrictions?",
    ],
    cautionNotes: [
      "Thickener incompatibility can ruin centralized systems—confirm before bulk conversion.",
      "Exact product selection requires PDS and OEM confirmation; do not assume all calcium sulfonate greases are identical.",
    ],
  },

  syntheticBlendVsFullSynthetic: {
    id: "syntheticBlendVsFullSynthetic",
    title: "Synthetic Blend vs Full Synthetic",
    aliases: [
      "synthetic blend vs full synthetic",
      "semi synthetic vs full synthetic",
      "syn blend vs full syn",
      "partial synthetic vs full synthetic oil",
    ],
    questionExamples: [
      "What's the difference between synthetic blend and full synthetic?",
      "Is full synthetic worth it for our fleet?",
      "When should I recommend synthetic blend instead of full synthetic?",
    ],
    directAnswer:
      "Synthetic blend oils combine conventional and synthetic base stocks to improve oxidation and low-temperature performance versus conventional-only fluids at a mid-tier price point. Full synthetic oils use a higher synthetic base stock slate for stronger VI, oxidation control, and temperature stability—best when drains are extended, loads are severe, or cold-start protection is critical.",
    technicalExplanation:
      "The performance gap depends on base stock quality (Group II, III, PAO), additive package, and OEM spec—not the marketing word 'synthetic' alone. Blends trade some high-temperature and drain-interval headroom for cost efficiency. Full synthetics typically offer wider operating windows and better shear stability, but only where the PDS and OEM approvals match the hardware.",
    whyItMatters:
      "Customers compare price per litre without separating drain interval, fuel economy potential, and downtime cost. Reps who explain the trade-off can right-size the fluid instead of over- or under-selling.",
    operationalConsequences: [
      "Shortened drain intervals when a blend is used where full synthetic headroom is needed",
      "Paying for full synthetic where a certified blend would meet OEM and duty cycle",
      "Viscosity loss or deposit formation when spec or shear stability is marginal",
    ],
    relatedApplications: [
      "Mixed diesel fleets",
      "High-hour off-highway equipment",
      "Passenger and light-duty synthetic motor oil programs",
    ],
    relatedFailureModes: [
      "Soot-related thickening and valve train wear in diesel engines",
      "Cold-start wear in northern fleets",
      "Shear down in high-temp hydraulics when VI improvers are stressed",
    ],
    relatedProductCategories: [
      "engine_oil",
      "hydraulic_fluid",
      "gear_oil",
    ],
    klondikeProductTieIns: [
      "KLONDIKE CK-4 synthetic blend and full synthetic heavy-duty engine oils—match CES / 93K / VDS lines on the PDS",
      "Full synthetic and synthetic blend hydraulic and driveline fluids where published VI and shear stability data support the story",
    ],
    repTalkTrack:
      "Ask about drain interval, climate, and whether they are spec-driven or cost-driven. Synthetic blend is the value lane when OEM allows it and hours are moderate. Full synthetic wins on cold starts, turbo heat, and extended drains—but prove it with the approval line on the PDS, not the label colour.",
    questionsToAsk: [
      "OEM drain interval target or in-house extended drain trial?",
      "Typical cold-start temperature and idle percentage?",
      "Mixed fleet standardization or equipment-specific tanks?",
    ],
    cautionNotes: [
      "Marketing terms vary by region—always anchor on OEM approval and PDS data.",
      "Do not promise drain extension beyond OEM without oil analysis and approval.",
    ],
  },

  groupIiVsGroupIiiBaseOil: {
    id: "groupIiVsGroupIiiBaseOil",
    title: "Group II vs Group III Base Oil",
    aliases: [
      "group ii vs group iii",
      "group 2 vs group 3 base oil",
      "group ii group iii difference",
      "api base oil groups",
    ],
    questionExamples: [
      "What is the difference between Group II and Group III base oil?",
      "Does Group III base oil matter for hydraulic fluid?",
      "Is Group III the same as synthetic?",
    ],
    directAnswer:
      "Group II and Group III are both API-defined mineral-derived base oil categories. Group III is more severely refined, giving higher saturates, lower sulfur, and typically better oxidation stability and viscosity index than Group II. Group III is often called synthetic in North America marketing, but performance still depends on the full formulation and OEM spec.",
    technicalExplanation:
      "Base oil group sets the starting point for volatility, oxidation life, and low-temperature flow. Group III stocks support longer fluid life and tighter viscosity control across temperature, which helps hydraulic, engine, and gear formulations. Group II remains common in cost-sensitive applications where OEM intervals are conservative. Additives and shear stability modifiers still define field performance.",
    whyItMatters:
      "Sophisticated buyers ask about 'true synthetic' versus hydrocracked mineral oil. Reps who understand base oil groups can explain premium pricing without overclaiming PAO content.",
    operationalConsequences: [
      "Faster oxidation and varnish in Group II fluids when drains are stretched beyond design",
      "Better seasonal consistency when Group III or PAO-blended stocks are used appropriately",
      "Misaligned expectations when customers assume all 'synthetic' fluids contain PAO",
    ],
    relatedApplications: [
      "Premium hydraulic programs",
      "Long-life engine oil drains",
      "Industrial gear and compressor systems",
    ],
    relatedFailureModes: [
      "Varnish and deposit formation",
      "Viscosity drift across seasons",
      "Premature additive depletion when base stock margin is thin",
    ],
    relatedProductCategories: ["engine_oil", "hydraulic_fluid", "gear_oil", "compressor_oil"],
    klondikeProductTieIns: [
      "KLONDIKE premium engine and hydraulic products where PDS cites synthetic, Group III, or high-VI positioning—verify exact wording per SKU",
    ],
    repTalkTrack:
      "Group III is a better starting crude slate, not a magic spec. Pair base stock talk with VI, oxidation stability, and the OEM approval line your customer actually needs. If the PDS does not spell out base stock, stay formulation-neutral and spec-led.",
    questionsToAsk: [
      "Are they comparing on price, drain interval, or varnish history?",
      "Any oil analysis showing oxidation or viscosity creep?",
      "OEM minimum requirements for the sump in question?",
    ],
    cautionNotes: [
      "Base oil group alone does not equal OEM approval.",
      "Confirm PDS language before claiming Group III or PAO content.",
    ],
  },

  hydraulicFluidSelectionPriorities: {
    id: "hydraulicFluidSelectionPriorities",
    title: "What Matters Most in Hydraulic Fluid Selection",
    aliases: [
      "hydraulic fluid selection",
      "how to pick hydraulic oil",
      "what matters in hydraulic fluid",
      "choosing hydraulic fluid",
      "hydraulic oil selection criteria",
    ],
    questionExamples: [
      "What matters most when choosing hydraulic fluid?",
      "How do I pick the right hydraulic oil?",
      "What should I look for in a hydraulic fluid?",
    ],
    directAnswer:
      "Start with OEM viscosity grade and spec (AW, R&O, anti-wear type, pump OEM sheet), then match operating temperature, contamination control, and water exposure. Viscosity at operating temperature, shear stability, oxidation life, air release, and filter compatibility usually matter more than brand colour once the spec gate is cleared.",
    technicalExplanation:
      "Hydraulic systems convert fluid viscosity into lubricated film and heat transfer. Too thin a fluid at operating temperature increases internal leakage and wear; too thick increases heat and cavitation risk at cold start. AW chemistry protects pumps and valves in mobile equipment; R&O fluids suit many industrial circulating systems. Water separation, foam control, and cleanliness determine how long the fluid survives in the field—not just the sticker price.",
    whyItMatters:
      "Hydraulic failures are expensive and often blamed on the oil when the root cause is wrong viscosity, contaminated top-off, or a spec mismatch. Reps who lead with a selection checklist sound like engineers, not catalogues.",
    operationalConsequences: [
      "Pump wear and valve sticking from wrong viscosity or degraded fluid",
      "Overheating and slow cycle times when viscosity is too high",
      "Emulsified fluid and rust when water separation is poor",
    ],
    relatedApplications: [
      "Mobile construction hydraulics",
      "Industrial presses and injection molding",
      "Logging, mining, and material-handling fleets",
    ],
    relatedFailureModes: [
      "Cavitation and aeration",
      "Varnish on valves",
      "Seal swell or shrink from wrong fluid chemistry",
    ],
    relatedProductCategories: ["hydraulic_fluid", "transmission_hydraulic_fluid"],
    klondikeProductTieIns: [
      "KLONDIKE AW hydraulic oils, zinc-free and high-VI lines, and UTF/trans-drive fluids—each SKU must match OEM sheet on the PDS",
    ],
    repTalkTrack:
      "Walk the customer through spec, viscosity, temperature, and water in that order. If they cannot quote the OEM sheet, your job is to get the tag photo before recommending a change. KLONDIKE has breadth across mobile and industrial hydraulics—narrow with the PDS, not the aisle.",
    questionsToAsk: [
      "Pump or equipment OEM fluid specification?",
      "Operating temperature range and typical ambient?",
      "Water exposure, dust, or high-fines contamination?",
      "Current fluid condition—clear, cloudy, or milky?",
      "Filter micron rating and bypass history?",
    ],
    cautionNotes: [
      "UTF/wet-brake fluids are not generic AW hydraulic oils—verify equipment category.",
      "Exact product fit requires OEM and PDS confirmation.",
    ],
  },

  dielectricNonConductiveHydraulicFluid: {
    id: "dielectricNonConductiveHydraulicFluid",
    title: "Non-Conductive / Dielectric Hydraulic Fluid",
    aliases: [
      "dielectric hydraulic fluid",
      "non conductive hydraulic oil",
      "insulating hydraulic fluid",
      "electrical utility hydraulic fluid",
      "high dielectric strength hydraulic",
    ],
    questionExamples: [
      "What is dielectric hydraulic fluid?",
      "Do you have non-conductive hydraulic oil for bucket trucks?",
      "When is insulating hydraulic fluid required?",
    ],
    directAnswer:
      "Dielectric or non-conductive hydraulic fluids are formulated for applications where fluid may contact energized electrical equipment—such as utility aerial devices—so conductivity and moisture control must stay within OEM limits. They are specialty fluids, not substitutes for standard AW hydraulic oil in general mobile equipment.",
    technicalExplanation:
      "Dielectric strength measures how well a fluid resists electrical breakdown. Contamination with water, particulate, or wrong top-off fluid collapses dielectric performance quickly. These fluids still must lubricate pumps and seals while meeting electrical safety requirements defined by equipment OEMs and applicable standards. Shelf life, dehydration, and testing intervals are part of the program—not just the initial fill.",
    whyItMatters:
      "Utility and telecom fleets face safety audits and liability exposure. Reps must never guess on insulating fluid; a wrong recommendation is a personnel and equipment risk.",
    operationalConsequences: [
      "Electrical flashover risk when dielectric strength is compromised",
      "Pump wear if viscosity or lubricity is neglected while focusing only on conductivity",
      "Costly fluid disposal and outage when water contamination is ignored",
    ],
    relatedApplications: [
      "Aerial lifts and bucket trucks",
      "Switchgear-adjacent hydraulic systems",
      "Specialty utility maintenance fleets",
    ],
    relatedFailureModes: [
      "Moisture ingress lowering dielectric strength",
      "Cross-contamination with standard hydraulic oil",
      "Seal failure from incompatible base stocks",
    ],
    relatedProductCategories: ["hydraulic_fluid", "specialty_fluid"],
    klondikeProductTieIns: [
      "Confirm whether a KLONDIKE SKU is listed for dielectric utility service on the current PDS before quoting—many standard AW products are not suitable",
    ],
    repTalkTrack:
      "This is a safety-critical spec. Get the utility OEM bulletin, dielectric test interval, and current fluid name before you propose anything. If our PDS does not explicitly support the application, the answer is needs confirmation—not the closest AW hydraulic on the truck.",
    questionsToAsk: [
      "Equipment OEM and model of aerial device?",
      "Required dielectric test frequency and last test result?",
      "Any history of water ingress or mixed top-off?",
      "Regional utility cooperative fluid approval list?",
    ],
    cautionNotes: [
      "Never substitute standard hydraulic fluid for dielectric service without written OEM approval.",
      "Exact product fit requires PDS and utility specification confirmation.",
    ],
  },

  awVsEpAdditives: {
    id: "awVsEpAdditives",
    title: "AW vs EP Additives",
    aliases: [
      "aw vs ep",
      "anti wear vs extreme pressure",
      "aw hydraulic vs ep gear",
      "difference between aw and ep additives",
    ],
    questionExamples: [
      "What's the difference between AW and EP additives?",
      "Is EP hydraulic oil the same as AW?",
      "When do I need EP instead of AW?",
    ],
    directAnswer:
      "Anti-wear (AW) additives—often zinc/phosphorus chemistry—protect pumps, bearings, and sliding contacts under moderate load in hydraulic and circulating systems. Extreme pressure (EP) additives activate under high load and slow-speed boundary contact, common in gear oils and greases. AW and EP solve different contact regimes; they are not drop-in substitutes.",
    technicalExplanation:
      "AW chemistry forms protective films under mixed and boundary lubrication in pumps and valves without heavily reacting at moderate temperatures. EP chemistry (sulfur-phosphorus, active sulfur systems) is tuned for gear tooth and heavy shock loading where contact pressures are higher. Using EP gear chemistry in sensitive hydraulic systems—or AW hydraulic fluid in heavy EP gear boxes—can cause corrosion, foaming, or OEM violations.",
    whyItMatters:
      "Customers use 'EP' as a generic durability buzzword. Reps who separate AW hydraulic protection from EP gear protection avoid dangerous cross-application.",
    operationalConsequences: [
      "Yellow metal corrosion when EP chemistry is used where OEM forbids active sulfur",
      "Gear pitting when AW-only fluid is used in EP-rated gear boxes",
      "Valve stiction and deposit formation from wrong additive class",
    ],
    relatedApplications: [
      "Mobile AW hydraulic systems",
      "Industrial enclosed gears",
      "Pin and bushing greases with EP solids or chemistries",
    ],
    relatedFailureModes: [
      "Micropitting on gear teeth",
      "Pump cam wear",
      "Copper alloy staining in hydraulics",
    ],
    relatedProductCategories: ["hydraulic_fluid", "gear_oil", "grease"],
    klondikeProductTieIns: [
      "KLONDIKE AW hydraulic fluids for mobile equipment per PDS",
      "Industrial and automotive gear oils with documented EP performance where OEM specifies EP GL ratings",
    ],
    repTalkTrack:
      "AW protects pumps and valves every day; EP protects gears and pins under shock. Ask what component they are actually trying to protect, then map to the OEM spec class—GL-4, GL-5, AW hydraulic, or grease EP label—not whichever word sounds tougher.",
    questionsToAsk: [
      "Hydraulic pump, gearbox, or grease fitting?",
      "Any yellow metals or sensitive servo valves in the system?",
      "OEM spec sheet or GL rating on the tag?",
    ],
    cautionNotes: [
      "EP gear oils are not universal hydraulic fluids.",
      "Confirm OEM limits on sulfur and phosphorus in hydraulic systems.",
    ],
  },

  oxidationStability: {
    id: "oxidationStability",
    title: "Oxidation Stability",
    aliases: [
      "oxidation stability",
      "oxidation resistance",
      "thermal oxidation",
      "oil oxidation life",
      "resistance to oxidation",
    ],
    questionExamples: [
      "What is oxidation stability?",
      "Why does oxidation stability matter for drain intervals?",
      "How do I explain oxidation to a fleet customer?",
    ],
    directAnswer:
      "Oxidation stability is how well a lubricant resists reacting with oxygen at temperature over time. Poor oxidation control produces acids, varnish, sludge, and viscosity drift that end protection before the additive package is intentionally spent.",
    technicalExplanation:
      "Heat, air entrainment, catalyst metals, and water accelerate oxidation. Base stock saturates and VI influence how fast oxidation starts; antioxidants and detergents manage the rate once the fluid is in service. Turbocharged engines, high-pressure hydraulics, and compressors with thin films are especially sensitive. Oil analysis markers such as TAN rise, viscosity creep, and pentane insolubles track oxidation in the field.",
    whyItMatters:
      "Extended drain and uptime programs fail when oxidation reserve is exhausted silently. Reps can tie premium fluids and filtration discipline to measurable life extension.",
    operationalConsequences: [
      "Varnish on hydraulic valves and compressor discharge lines",
      "Sludge plugging filters and heat exchangers",
      "Acidic oil attacking bearings and seals",
    ],
    relatedApplications: [
      "Turbo diesel highway fleets",
      "High-temp mobile hydraulics",
      "Rotary screw compressors",
    ],
    relatedFailureModes: [
      "Deposit-related valve failure",
      "Filter plugging",
      "Bearing corrosion from acidic blow-by carryover",
    ],
    relatedProductCategories: ["engine_oil", "hydraulic_fluid", "compressor_oil", "turbine_oil"],
    klondikeProductTieIns: [
      "KLONDIKE CK-4 and premium hydraulic products positioned for oxidation control—cite PDS language and OEM drain guidance, not generic claims",
    ],
    repTalkTrack:
      "Oxidation is the clock on fluid life after you manage dirt and water. If they run hot, idle long, or stretch drains, ask about analysis and filter quality before you sell a premium tier. Match the PDS oxidation story to their actual sump temperature.",
    questionsToAsk: [
      "Typical sump or hydraulic temperature?",
      "Current drain interval vs OEM baseline?",
      "Oil analysis history—TAN, viscosity, insolubles?",
    ],
    cautionNotes: [
      "Oxidation control does not replace filtration or water removal.",
      "Drain extension requires OEM and analysis support.",
    ],
  },

  shearStability: {
    id: "shearStability",
    title: "Shear Stability",
    aliases: [
      "shear stability",
      "shear stable",
      "viscosity shear loss",
      "mechanical shear",
      "ht hs shear",
    ],
    questionExamples: [
      "What is shear stability?",
      "Why do multigrade oils lose viscosity?",
      "Does shear stability matter in hydraulic fluid?",
    ],
    directAnswer:
      "Shear stability is a fluid's ability to maintain viscosity when mechanical forces break down viscosity index improvers or polymer structures—common in engines, hydraulics, and multi-grade gear oils under high load and temperature.",
    technicalExplanation:
      "Permanent shear loss thins the fluid below design viscosity, reducing film thickness and inviting wear. Temporary shear loss recovers when load drops. Formulations with shear-stable VI improvers, quality base stocks, and OEM-tested HTHS performance resist thinning in high-shear zones such as pump clearances, gear mesh, and piston ring areas.",
    whyItMatters:
      "Customers blame 'bad oil' when the real issue is shear down after long service or wrong multi-grade choice. Reps who explain shear connect premium formulations to measurable viscosity retention.",
    operationalConsequences: [
      "Increased wear when operating viscosity falls below OEM minimum",
      "Fuel economy loss when viscosity rises from soot if shear and oxidation interact",
      "Hydraulic overheating when thinned fluid leaks internally",
    ],
    relatedApplications: [
      "Multi-grade diesel engines",
      "High-pressure piston pump hydraulics",
      "Synthetic multi-grade gear oils",
    ],
    relatedFailureModes: [
      "Cam and pump wear",
      "Gear scuffing",
      "Erratic hydraulic response",
    ],
    relatedProductCategories: ["engine_oil", "hydraulic_fluid", "gear_oil"],
    klondikeProductTieIns: [
      "KLONDIKE multi-grade engine and hydraulic products citing shear stability or HTHS on the PDS—verify per SKU",
    ],
    repTalkTrack:
      "Shear is why two 15W-40s are not always equal in a hard-working fleet. If they run high load or long drains, pair shear stability talk with oil analysis viscosity at operating temperature—not just the bottle grade.",
    questionsToAsk: [
      "High-load duty cycle or towing/off-highway mix?",
      "Any oil analysis showing viscosity below grade?",
      "OEM HTHS or shear test requirements?",
    ],
    cautionNotes: [
      "Shear stability claims must be supported by PDS or OEM test references.",
      "Do not confuse temporary shear with permanent polymer breakdown.",
    ],
  },

  foamResistance: {
    id: "foamResistance",
    title: "Foam Resistance",
    aliases: [
      "foam resistance",
      "anti foam",
      "foaming hydraulic oil",
      "air entrainment",
      "foam control",
    ],
    questionExamples: [
      "Why is my hydraulic oil foaming?",
      "What is foam resistance in hydraulic fluid?",
      "Does anti-foam additive matter?",
    ],
    directAnswer:
      "Foam resistance is how well a fluid releases entrained air and resists stable foam that can cause spongy hydraulics, cavitation, and inadequate lubrication. Anti-foam agents help, but root causes are often contamination, wrong level, or suction leaks—not just additive level.",
    technicalExplanation:
      "Air bubbles increase compressibility, slow response, and accelerate oxidation at bubble collapse zones. Foam tendency and air release are distinct properties tested in lab protocols. Over-agitation, detergent carryover, water, and degraded additives all increase foam. Mobile equipment with small reservoirs and high return flow is especially sensitive.",
    whyItMatters:
      "Foaming complaints are urgent on job sites. Reps who separate fluid quality from tank design and maintenance sound credible and reduce trial-and-error fluid swaps.",
    operationalConsequences: [
      "Cavitation damage in pumps",
      "Erratic actuator movement",
      "Overflow and false low-level readings",
    ],
    relatedApplications: [
      "Mobile hydraulics with small tanks",
      "High-cycle industrial presses",
      "Equipment with return lines above fluid level",
    ],
    relatedFailureModes: [
      "Pump cavitation pitting",
      "Oxidation acceleration at foam collapse",
      "False low-level shutdowns",
    ],
    relatedProductCategories: ["hydraulic_fluid", "gear_oil", "compressor_oil"],
    klondikeProductTieIns: [
      "KLONDIKE hydraulic fluids with documented foam and air-release performance on the PDS—confirm before blaming fluid on a system issue",
    ],
    repTalkTrack:
      "Foam is half fluid chemistry and half system hygiene. Ask about suction line leaks, return line submergence, and recent top-off before you swap grades. If the PDS shows strong air release and foam still persists, the story is mechanical.",
    questionsToAsk: [
      "When did foaming start—after top-off or maintenance?",
      "Reservoir level and return line depth?",
      "Water contamination or detergent wash in the tank?",
    ],
    cautionNotes: [
      "Over-treating with aftermarket anti-foam can destabilize the fluid.",
      "Fix mechanical air ingestion before repeated fluid changes.",
    ],
  },

  demulsibilityWaterSeparation: {
    id: "demulsibilityWaterSeparation",
    title: "Demulsibility / Water Separation",
    aliases: [
      "demulsibility",
      "water separation",
      "demulsifying hydraulic oil",
      "water shedding",
      "separates from water",
    ],
    questionExamples: [
      "What is demulsibility in hydraulic oil?",
      "Should hydraulic fluid separate from water?",
      "Milky hydraulic oil—what does demulsibility mean?",
    ],
    directAnswer:
      "Demulsibility is a fluid's ability to separate from water rather than forming a stable emulsion. Strong water separation helps operators drain free water, protect rust inhibitors, and restore clarity—critical in humid, outdoor, or wash-down environments.",
    technicalExplanation:
      "AW hydraulic fluids are often designed to shed water quickly so free water can be drained from the bottom of the reservoir. Emulsified fluid can look milky, reduce lubricity, and overwhelm rust inhibitors. Water separation is time- and temperature-dependent; severe contamination still requires dewatering equipment or change-out regardless of demulsibility rating.",
    whyItMatters:
      "Water is the most common hydraulic fluid killer in the field. Reps who explain demulsibility tie premium fluids and maintenance discipline to rust and valve reliability.",
    operationalConsequences: [
      "Rust on tanks and components",
      "Accelerated oxidation and acid formation",
      "Valve sticking and filter plugging from emulsion-stable fines",
    ],
    relatedApplications: [
      "Outdoor mobile hydraulics",
      "Paper and process plants with steam exposure",
      "Mining and quarry wash-down sites",
    ],
    relatedFailureModes: [
      "Rust and pitting",
      "Emulsion-stable milkiness",
      "Pump wear from lubricity loss",
    ],
    relatedProductCategories: ["hydraulic_fluid", "gear_oil", "turbine_oil"],
    klondikeProductTieIns: [
      "KLONDIKE AW and industrial hydraulic fluids where PDS notes water separation or demulsibility—verify SKU-specific data",
    ],
    repTalkTrack:
      "Clear hydraulic oil is not vanity—it is how you know water is not living in the sump. If they see haze, ask how water gets in and whether they drain settling tanks. Match demulsibility talk to a fluid that documents water separation on the PDS.",
    questionsToAsk: [
      "Fog, rain, pressure wash, or process steam exposure?",
      "Do they drain sump bottoms on a schedule?",
      "How fast did clarity return after a dry period?",
    ],
    cautionNotes: [
      "Heavy water contamination requires mechanical removal—not just top-off.",
      "Some OEM fluids are designed to emulsify slightly—confirm spec before judging clarity.",
    ],
  },

  zincVsAshlessHydraulicFluids: {
    id: "zincVsAshlessHydraulicFluids",
    title: "Zinc vs Ashless Hydraulic Fluids",
    aliases: [
      "zinc vs ashless hydraulic",
      "zinc free hydraulic oil",
      "ashless hydraulic fluid",
      "zinc aw hydraulic",
      "low zinc hydraulic",
    ],
    questionExamples: [
      "What is the difference between zinc and ashless hydraulic fluid?",
      "When should I use zinc-free hydraulic oil?",
      "Is ashless hydraulic better?",
    ],
    directAnswer:
      "Zinc-containing AW hydraulic fluids use zinc dialkyldithiophosphate chemistry for anti-wear protection in many mobile systems. Ashless (often zinc-free) fluids rely on alternate chemistries suited to industrial systems, sensitive coatings, or OEM sheets that limit ash and certain metals.",
    technicalExplanation:
      "Zinc AW fluids are common in construction and forestry mobile hydraulics where OEMs expect ZDDP-style protection. Ashless formulations reduce ash-related deposit tendencies in some industrial circuits and meet environmental or OEM restrictions on certain metals. Neither is universally superior—compatibility with seals, filters, paints, and OEM additive limits determines fit.",
    whyItMatters:
      "Mixed-fleet shops sometimes standardize on one hydraulic fluid and create deposit or wear issues on equipment expecting the other chemistry class.",
    operationalConsequences: [
      "Wear on high-pressure pumps when AW protection is inadequate",
      "Deposit formation on valves in ash-sensitive industrial systems",
      "Seal and paint compatibility issues on wrong chemistry",
    ],
    relatedApplications: [
      "Mobile AW hydraulic fleets",
      "Industrial R&O and ashless circuits",
      "Zinc-free mandated OEM equipment",
    ],
    relatedFailureModes: [
      "Pump scoring",
      "Valve varnish",
      "Filter plugging from reaction products",
    ],
    relatedProductCategories: ["hydraulic_fluid"],
    klondikeProductTieIns: [
      "KLONDIKE AW hydraulic fluids and zinc-free industrial hydraulic lines—match OEM sheet on the PDS before converting bulk tanks",
    ],
    repTalkTrack:
      "Ask for the pump OEM sheet first. Zinc AW is the mobile default in many fleets, but ashless zinc-free is not optional where the OEM forbids zinc. Do not bulk-change until you confirm every machine in the loop.",
    questionsToAsk: [
      "Pump or equipment OEM fluid requirement?",
      "Mixed mobile and industrial tanks on site?",
      "Any history of varnish or copper staining?",
    ],
    cautionNotes: [
      "Bulk conversion requires compatibility review for seals, paints, and downstream OEMs.",
      "Exact zinc content and ash limits are PDS-specific.",
    ],
  },

  calciumSulfonateVsLithiumComplex: {
    id: "calciumSulfonateVsLithiumComplex",
    title: "Calcium Sulfonate vs Lithium Complex",
    aliases: [
      "calcium sulfonate vs lithium complex",
      "lithium complex vs calcium sulfonate grease",
      "calcium sulfonate or lithium complex",
      "which grease thickener",
    ],
    questionExamples: [
      "Calcium sulfonate or lithium complex—which is better?",
      "What's the difference between lithium complex and calcium sulfonate grease?",
      "Which thickener for wet pins?",
    ],
    directAnswer:
      "Lithium complex greases offer broad temperature range, good mechanical stability, and wide availability—strong general-purpose and auto-lube choices. Calcium sulfonate greases often excel in water tolerance, corrosion protection, and high-load environments, but compatibility and pumpability must be validated for each system.",
    technicalExplanation:
      "Both are multi-purpose thickeners but with different microstructures and additive synergy. Lithium complex frequently hits a balance of drop point, pumpability, and cost. Calcium sulfonate can deliver inherent corrosion inhibition and high EP characteristics in severe outdoor service. NLGI grade, base oil viscosity, and solid content still define suitability.",
    whyItMatters:
      "Thickener wars waste time on accounts where water, load, and central lube compatibility are the real decision drivers.",
    operationalConsequences: [
      "Pin corrosion in wet service with wrong thickener",
      "Auto-lube blockages from incompatible grease change",
      "Softening or hardening when greases are mixed",
    ],
    relatedApplications: [
      "Heavy equipment pins",
      "Fleet chassis",
      "Centralized grease systems",
    ],
    relatedFailureModes: [
      "Washout and rust",
      "Incompatibility softening",
      "Pump starvation from stiff grease",
    ],
    relatedProductCategories: ["grease"],
    klondikeProductTieIns: [
      "KLONDIKE lithium-complex and calcium-sulfonate greases across severe-duty lines—confirm NLGI, thickener, and PDS EP claims per SKU",
    ],
    repTalkTrack:
      "If the joint is wet and loaded, calcium sulfonate deserves a look—if the system is auto-lube and always ran lithium complex, compatibility comes first. Pull thickener type from the PDS and confirm with the lube supplier before a fleet-wide swap.",
    questionsToAsk: [
      "Current thickener in service?",
      "Water spray, shock load, or mostly dry chassis?",
      "Centralized system OEM approval?",
    ],
    cautionNotes: [
      "Never assume thickeners mix safely—compatibility testing or OEM guidance is required.",
      "NLGI and base oil must still match the fitting and pump.",
    ],
  },

  tackifierTackiness: {
    id: "tackifierTackiness",
    title: "Tackifier / Tackiness",
    aliases: [
      "tackifier",
      "tacky grease",
      "tackiness",
      "stringy grease",
      "adhesive grease",
    ],
    questionExamples: [
      "What is tackifier in grease?",
      "When do I need tacky grease?",
      "Does tacky grease stay on pins better?",
    ],
    directAnswer:
      "Tackifiers are polymers added to grease to make it adhesive and stringy so it clings to vertical or exposed surfaces and resists fling-off. Tackiness helps retention on open gears, bushings, and some wire rope applications—but can hurt pumpability in fine clearances if overused.",
    technicalExplanation:
      "Tackiness is a rheological property separate from NLGI grade or thickener type. Polymer tackifiers increase cohesion, reducing sling and wash-off on open joints. Excessive tackifier can plug small passages, slow penetration, and attract dirt if the joint is not shielded. Open gear compounds and some mining greases use tackiness by design.",
    whyItMatters:
      "Customers ask for 'grease that stays put' on shovel pins and open gears. Reps should match tackiness to exposure and application method—not every pin needs a stringy product.",
    operationalConsequences: [
      "Better retention on vertical pins when tackiness is appropriate",
      "Blocked passages and poor grease turnover when tackiness is excessive",
      "Dirt packing on tacky surfaces in dusty pits",
    ],
    relatedApplications: [
      "Open gears and rails",
      "Vertical pins on excavators",
      "Wire rope and cable lubrication where OEM allows",
    ],
    relatedFailureModes: [
      "Fling-off leading to dry contact",
      "Contamination packing",
      "Auto-lube starvation from high tack",
    ],
    relatedProductCategories: ["grease", "open_gear_compound"],
    klondikeProductTieIns: [
      "KLONDIKE severe-duty and specialty greases where PDS notes tackifier or open-gear adhesion—confirm SKU before recommending on auto-lube",
    ],
    repTalkTrack:
      "Tacky is for staying put on exposed metal, not for every centralized system. Ask how they apply it and whether dirt or wash water is the bigger enemy. If the PDS does not show tackifier chemistry, do not promise stringiness.",
    questionsToAsk: [
      "Manual application or pump-fed?",
      "Vertical, open, or enclosed contact zone?",
      "Dust and fines level around the joint?",
    ],
    cautionNotes: [
      "High tack greases may be unsuitable for fine auto-lube lines—confirm with system OEM.",
      "Tackiness does not replace water-resistant thickener chemistry where immersion is severe.",
    ],
  },

  highViscosityIndexHydraulicFluids: {
    id: "highViscosityIndexHydraulicFluids",
    title: "High Viscosity Index Hydraulic Fluids",
    aliases: [
      "high vi hydraulic",
      "high viscosity index hydraulic",
      "multigrade hydraulic fluid",
      "hv hydraulic oil",
      "wide temperature hydraulic",
    ],
    questionExamples: [
      "What is high VI hydraulic fluid?",
      "When should I use high viscosity index hydraulic oil?",
      "Is multigrade hydraulic better for seasonal equipment?",
    ],
    directAnswer:
      "High viscosity index (VI) hydraulic fluids maintain more stable viscosity across hot and cold operating windows—useful for outdoor equipment that must start cold and run hot without changing grades seasonally.",
    technicalExplanation:
      "VI reflects how much viscosity changes with temperature. High-VI formulations use quality base stocks and VI improvers to keep pump protection at startup while avoiding excessive thickness at operating temperature. Shear stability matters because VI improvers can break down under high load. OEM viscosity grade at operating temperature remains the governing target.",
    whyItMatters:
      "Seasonal fleets hate carrying two grades. High-VI fluids can simplify inventory when OEM allows—but only when shear stability and spec approvals align.",
    operationalConsequences: [
      "Cold-start pump wear with single-grade fluid too thick at low temp",
      "Overheating and sluggish response if operating viscosity is too high",
      "Shear-related thinning if VI improvers break down in service",
    ],
    relatedApplications: [
      "Logging and construction seasonal fleets",
      "Northern mining and oilfield mobile hydraulics",
      "Equipment with wide ambient swings",
    ],
    relatedFailureModes: [
      "Cavitation on cold start",
      "Internal leakage when viscosity shears down",
      "Heat-related varnish when oxidation reserve is low",
    ],
    relatedProductCategories: ["hydraulic_fluid"],
    klondikeProductTieIns: [
      "KLONDIKE high-VI and multigrade hydraulic products—confirm VI, shear stability, and OEM viscosity grade on the PDS",
    ],
    repTalkTrack:
      "High VI is how one fluid spans a Manitoba winter and a July shift. Pair it with shear stability and the OEM's operating viscosity target—not just a wider label on the pail.",
    questionsToAsk: [
      "Coldest start and hottest operating temperature?",
      "Single-grade history or seasonal changeovers?",
      "OEM permitted multigrade hydraulic?",
    ],
    cautionNotes: [
      "High VI does not override OEM minimum HTHS or viscosity at operating temp.",
      "Monitor viscosity in service if shear loss is a risk.",
    ],
  },

  coldWeatherHydraulicPerformance: {
    id: "coldWeatherHydraulicPerformance",
    title: "Cold Weather Hydraulic Performance",
    aliases: [
      "cold weather hydraulic",
      "hydraulic oil cold start",
      "winter hydraulic fluid",
      "low temperature hydraulic",
      "arctic hydraulic performance",
    ],
    questionExamples: [
      "What hydraulic fluid is best for cold weather?",
      "Why are my hydraulics slow in winter?",
      "How do I protect pumps on cold starts?",
    ],
    directAnswer:
      "Cold weather hydraulic performance depends on fluid pour point, viscosity at startup, air release, and whether the OEM allows a lower winter grade or high-VI multigrade. Slow morning response is often viscosity-related until the system warms— but sustained cavitation noise means the grade is too thick or suction conditions are poor.",
    technicalExplanation:
      "At low temperature, wax crystal formation, high viscosity, and sluggish air release increase cavitation risk and cycle times. High-VI or arctic-formulated fluids improve flow without sacrificing operating-temperature protection when shear stable. Preheat, sheltered storage, and proper reservoir level reduce cold-start damage more than fluid alone.",
    whyItMatters:
      "Northern Klondike accounts live or die on January startups. Reps who connect fluid selection, storage, and warm-up discipline win trust with fleet managers.",
    operationalConsequences: [
      "Pump cavitation pitting on cold start",
      "Seal damage from delayed lubrication",
      "Productivity loss from slow cycle times",
    ],
    relatedApplications: [
      "Forestry and mining in sub-zero climates",
      "Municipal snow and winter construction fleets",
      "Outdoor stationary hydraulics",
    ],
    relatedFailureModes: [
      "Cavitation erosion",
      "Temporary aeration foam",
      "Misdiagnosis of worn pumps when fluid is too thick",
    ],
    relatedProductCategories: ["hydraulic_fluid", "transmission_hydraulic_fluid"],
    klondikeProductTieIns: [
      "KLONDIKE arctic-performance and high-VI hydraulic fluids where PDS documents low-temperature pumpability—confirm OEM winter grade allowance",
    ],
    repTalkTrack:
      "Winter hydraulics is pour point plus system design. Ask how they store barrels, whether they idle to warm, and what noise they hear the first five minutes of shift. If the PDS supports arctic or high-VI use, quote it—if not, needs confirmation.",
    questionsToAsk: [
      "Lowest ambient and shed storage temperature?",
      "OEM winter viscosity recommendation?",
      "Cavitation noise duration after start?",
      "Any preheat or tank insulation practices?",
    ],
    cautionNotes: [
      "Do not thin fluid below OEM minimum operating viscosity without approval.",
      "Cold-start damage may be mechanical—fluid alone cannot fix bad suction plumbing.",
    ],
  },
};
