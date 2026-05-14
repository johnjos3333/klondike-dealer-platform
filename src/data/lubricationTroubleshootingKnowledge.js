/**
 * Deterministic lubrication troubleshooting knowledge — data only.
 * Not wired to UI yet.
 */

export const lubricationTroubleshootingKnowledge = {
  bearingFailure: {
    id: "bearingFailure",
    issue: "Bearing failure / premature bearing wear",
    symptoms: [
      "Unusual noise, heat, or vibration at the bearing housing",
      "Discolored or spalled rolling elements visible during inspection",
      "Metal particles in grease or used oil samples",
      "Increased power draw or shaft play",
    ],
    likelyCauses: [
      "Incorrect lubricant type, viscosity, or grease thickener for speed and load",
      "Under- or over-lubrication and contaminated relube practices",
      "Moisture, dirt, or process contamination breaching seals",
      "Misalignment, improper fit, or operating beyond design envelope",
    ],
    operationalConsequences: [
      "Unplanned downtime and costly bearing and shaft repairs",
      "Collateral damage to housings, seals, and driven equipment",
      "Safety risk if failure occurs on rotating production or mobile assets",
    ],
    questionsToAsk: [
      "What bearing type, speed, load, and operating temperature are you seeing?",
      "How often is the bearing relubricated and with what product?",
      "Any recent seal damage, wash-down exposure, or process contamination?",
      "Is there oil analysis or grease sample history for this asset?",
    ],
    relatedConcepts: ["epAdditives", "contamination", "nlgiGrade"],
    relatedApplications: [
      "Electric motor bearings",
      "Conveyor and fan shafts",
      "Mobile equipment pivot and idler bearings",
    ],
    possibleLubricantCategories: ["grease", "bearing_oil"],
    repTalkTrack:
      "Before we talk product, let's confirm the bearing application class, relube interval, and contamination exposure. Many bearing failures are maintenance or misapplication issues—not simply 'bad grease.' Once we validate load, speed, and environment, we can align a KLONDIKE option to the correct thickener, NLGI grade, and EP needs.",
    cautionNotes: [
      "Do not recommend a product change until bearing type, speed, and OEM lubrication guidance are confirmed.",
      "Over-greasing can cause churning and overheating—quantity and frequency matter.",
    ],
    keywords: [
      "bearing failure",
      "bearing noise",
      "bearing wear",
      "spalling",
      "premature bearing",
      "bearing heat",
    ],
  },

  greaseWashout: {
    id: "greaseWashout",
    issue: "Grease washout / grease not staying on the joint",
    symptoms: [
      "Grease disappears quickly from pins, bushings, or fittings after rain or wash-down",
      "Rust staining or water ingress at the joint",
      "Squeak, binding, or accelerated pin wear in wet environments",
      "Grease runs off or fails to hold on vertical or overhead fittings",
    ],
    likelyCauses: [
      "Grease not matched to water spray, submersion, or high-moisture duty",
      "Infrequent regrease intervals for severe outdoor exposure",
      "Wrong NLGI grade or pumpability for the application method",
      "Damaged boots, missing zerk caps, or pressure washing directly into fittings",
    ],
    operationalConsequences: [
      "Accelerated pin and bushing wear on loaders, excavators, and ag implements",
      "Higher maintenance labor chasing joints that won't hold protection",
      "Field failures during peak season when equipment cannot be sidelined",
    ],
    questionsToAsk: [
      "Is the exposure rain, submersion, pressure wash, or process spray?",
      "What regrease interval and method are used—manual gun or auto-lube?",
      "What product is in service today and how long has it been used?",
      "Are boots, seals, and zerk caps intact on the affected joints?",
    ],
    relatedConcepts: ["waterWashout", "epAdditives", "nlgiGrade"],
    relatedApplications: [
      "Wet pins and bushings on mining and construction equipment",
      "Loader linkages and bucket pivot points",
      "Ag implements exposed to field moisture",
    ],
    possibleLubricantCategories: ["grease"],
    repTalkTrack:
      "Washout is usually an application story first. Let's confirm how wet the joint gets and how often you're regreasing. If the duty is severe and water is constant, we should look at a grease family with strong water resistance and EP protection—then verify NLGI grade and OEM compatibility before quoting.",
    cautionNotes: [
      "Verify thickener compatibility before switching from a legacy grease in bulk systems.",
      "Claims must be supported by PDS data for the specific KLONDIKE SKU.",
    ],
    keywords: [
      "grease washout",
      "washout",
      "water washout",
      "wet pins",
      "grease washing off",
      "rust on pins",
    ],
  },

  hydraulicSluggishness: {
    id: "hydraulicSluggishness",
    issue: "Hydraulic sluggishness / slow or weak response",
    symptoms: [
      "Cylinders move slowly or feel weak under normal load",
      "Implement response lags compared to baseline performance",
      "Pump noise changes or system pressure reads low at the gauge",
      "Intermittent stiction or jerky movement",
    ],
    likelyCauses: [
      "Wrong fluid viscosity for ambient temperature or pump type",
      "Fluid oxidation, varnish, or contamination raising effective viscosity",
      "Air ingestion, low reservoir level, or restricted suction line",
      "Worn pump or valve components unrelated to fluid brand",
    ],
    operationalConsequences: [
      "Cycle time loss and operator frustration in production or field work",
      "Heat buildup that accelerates fluid degradation",
      "Potential pump damage if run long-term under aeration or starvation",
    ],
    questionsToAsk: [
      "When did sluggishness start—after a top-off, filter change, or seasonal temperature shift?",
      "What hydraulic fluid spec or product is in the reservoir today?",
      "Any foaming, milky appearance, or recent hose or seal leaks?",
      "What ambient temperatures and pump type (gear, piston, vane) are involved?",
    ],
    relatedConcepts: ["viscosityIndex", "contamination", "cavitation"],
    relatedApplications: [
      "Mobile construction hydraulics",
      "Industrial press and injection systems",
      "Forestry and material handling equipment",
    ],
    possibleLubricantCategories: ["hydraulic_fluid"],
    repTalkTrack:
      "Sluggish hydraulics can be viscosity, contamination, or mechanical. Let's confirm the in-service fluid spec, reservoir condition, and whether this started after a top-off. If the fluid is oxidized or contaminated, a flush and correct-spec refill may be needed—not just a higher-viscosity guess.",
    cautionNotes: [
      "Never recommend AW hydraulic fluid where UTF or OEM-specific tractor fluid is required.",
      "Confirm OEM viscosity grade and system temperature before changing products.",
    ],
    keywords: [
      "hydraulic sluggish",
      "slow hydraulics",
      "weak hydraulics",
      "slow cylinder",
      "sluggish response",
      "low hydraulic pressure",
    ],
  },

  wetBrakeChatter: {
    id: "wetBrakeChatter",
    issue: "Wet brake chatter / noise in UTF systems",
    symptoms: [
      "Chatter, squeal, or vibration when brakes are applied on tractors or UTF equipment",
      "Inconsistent braking feel or rising brake temperature",
      "Noise that appeared after a fluid top-off or product change",
      "Complaints after using generic hydraulic oil instead of UTF",
    ],
    likelyCauses: [
      "Incorrect fluid category for wet brake / transmission sump",
      "Fluid degradation, water contamination, or wrong additive chemistry",
      "Worn friction materials or mechanical brake issues",
      "Mixing incompatible fluids in the common sump",
    ],
    operationalConsequences: [
      "Operator safety concerns and reduced confidence in braking",
      "Potential damage to friction discs and OEM warranty exposure",
      "Downtime while dealer or OEM diagnoses spec compliance",
    ],
    questionsToAsk: [
      "What equipment make, model, and OEM fluid specification is required?",
      "Was any non-UTF fluid added recently—including engine oil or AW hydraulic?",
      "Fluid age, color, and whether water or dirt contamination is present?",
      "Does chatter occur hot, cold, or after long idle periods?",
    ],
    relatedConcepts: ["wetBrakeChatter", "contamination"],
    relatedApplications: [
      "Ag tractors with combined transmission and wet brake sump",
      "Construction equipment specifying UTF or JDM-type fluids",
    ],
    possibleLubricantCategories: ["tractor_hydraulic", "utf"],
    repTalkTrack:
      "Wet brake chatter is rarely solved by guessing. We need the exact OEM UTF or JDM requirement first, then fluid history—especially any top-off with the wrong category. Once spec is confirmed, we can align a KLONDIKE UTF option and talk about contamination control if the sump was mixed.",
    cautionNotes: [
      "Do not recommend a product until OEM wet brake / UTF specification is verified.",
      "Mixing fluids may require OEM-guided drain and refill procedures.",
    ],
    keywords: [
      "wet brake chatter",
      "wet brake noise",
      "brake chatter",
      "utf chatter",
      "tractor brake squeal",
    ],
  },

  cavitation: {
    id: "cavitation",
    issue: "Cavitation / pump damage from vapor collapse",
    symptoms: [
      "Marble-like or gravel pump noise, especially at inlet side",
      "Erratic actuator response and foaming in the reservoir",
      "Pitted pump housings or gears on teardown",
      "Whine that increases with pump speed or cold start",
    ],
    likelyCauses: [
      "Restricted suction line, clogged breather, or low fluid level",
      "Fluid viscosity too high for cold start or pump inlet conditions",
      "Air leaks on suction side or return line agitation",
      "Operating pump above recommended speed or with undersized reservoir",
    ],
    operationalConsequences: [
      "Irreversible pump pitting and costly component replacement",
      "Progressive loss of system efficiency and heat generation",
      "Repeated failures if root suction or viscosity issues are not corrected",
    ],
    questionsToAsk: [
      "Where is the noise—pump inlet, outlet, or throughout the system?",
      "Recent changes to hoses, filters, fluid type, or reservoir level?",
      "Operating temperature range and cold-start behavior?",
      "Any foaming, milky fluid, or recent top-off with a different product?",
    ],
    relatedConcepts: ["cavitation", "contamination"],
    relatedApplications: [
      "Mobile hydraulic systems with piston or gear pumps",
      "High-speed industrial hydraulic loops",
    ],
    possibleLubricantCategories: ["hydraulic_fluid", "gear_oil"],
    repTalkTrack:
      "Cavitation is often a system problem before it's a brand problem. Let's check suction restriction, fluid level, and whether viscosity is too high for cold starts. If the fluid is correct but aeration persists, mechanical inlet leaks or reservoir design may be the root cause.",
    cautionNotes: [
      "Changing fluid alone will not fix suction starvation or air leaks.",
      "Confirm OEM viscosity and anti-foam requirements before recommending a swap.",
    ],
    keywords: [
      "cavitation",
      "pump cavitation",
      "pump noise",
      "pump pitting",
      "gravel noise",
      "hydraulic whine",
    ],
  },

  overheating: {
    id: "overheating",
    issue: "Lubricant or equipment overheating",
    symptoms: [
      "Sump, reservoir, or bearing housing hotter than normal baseline",
      "Darkened or thinned fluid sooner than expected drain interval",
      "Thermal shutdowns, odor, or varnish on sight glass or dipstick",
      "Grease bleeding excessively from seals under heat",
    ],
    likelyCauses: [
      "Wrong viscosity or insufficient oxidation stability for duty cycle",
      "Overloading, restricted cooling, or extended idle under load",
      "Contamination or wrong fluid raising friction and heat",
      "Over-lubrication in grease applications causing churning heat",
    ],
    operationalConsequences: [
      "Accelerated oxidation and shortened fluid life",
      "Seal hardening, leaks, and additive depletion",
      "Unplanned stops and potential warranty disputes",
    ],
    questionsToAsk: [
      "What normal operating temperature and duty cycle does this asset see?",
      "When was the fluid last changed and has viscosity been verified?",
      "Any cooling system issues, overload conditions, or ambient heat spikes?",
      "Oil analysis or filter cut inspection available?",
    ],
    relatedConcepts: ["oxidationStability", "viscosityIndex", "contamination"],
    relatedApplications: [
      "Heavy-duty diesel engines under severe duty",
      "Hydraulic systems on continuous-run industrial lines",
      "High-speed bearings and compressors",
    ],
    possibleLubricantCategories: ["engine_oil", "hydraulic_fluid", "compressor_oil", "grease"],
    repTalkTrack:
      "Heat is a symptom—let's separate mechanical overload from fluid mismatch. Confirm duty cycle, cooling, and in-service viscosity before positioning a higher-oxidation-stability or synthetic option. If contamination is present, a flush and maintenance correction may be required first.",
    cautionNotes: [
      "Do not upsell synthetic without confirming OEM approvals and root heat source.",
      "Over-greasing can mimic lubricant failure—verify quantity and method.",
    ],
    keywords: [
      "overheating",
      "running hot",
      "high temperature",
      "thermal breakdown",
      "hot sump",
      "oil running hot",
    ],
  },

  oxidationSludge: {
    id: "oxidationSludge",
    issue: "Oxidation, varnish, and sludge formation",
    symptoms: [
      "Dark, tacky deposits on dipstick, sight glass, or valve bodies",
      "Sludge in sump, filter plugging, or sticky varnish on hot surfaces",
      "Rising TAN or degraded oil analysis trends",
      "Loss of response in hydraulic or engine systems with sticky varnish",
    ],
    likelyCauses: [
      "Drain interval exceeded or severe heat and idle time",
      "Wrong fluid category for emission-era aftertreatment compatibility (engines)",
      "Water, fuel dilution, or coolant ingress accelerating degradation",
      "Low-quality base oil or depleted additive package",
    ],
    operationalConsequences: [
      "Restricted oil galleries and valve stiction",
      "Bearing starvation from plugged passages or filters",
      "Costly cleanup, flush, and component inspection",
    ],
    questionsToAsk: [
      "Actual drain interval vs OEM recommendation?",
      "Duty cycle: idle time, turbo heat, stop-and-go, or EGR/DPF exposure?",
      "Any coolant, fuel, or water contamination on recent analysis?",
      "Has the customer extended drains without analysis support?",
    ],
    relatedConcepts: ["oxidationStability", "contamination"],
    relatedApplications: [
      "Mixed-fleet diesel engines",
      "Industrial hydraulics on long drain programs",
      "Compressors and turbines on extended service",
    ],
    possibleLubricantCategories: ["engine_oil", "hydraulic_fluid", "compressor_oil"],
    repTalkTrack:
      "Sludge usually points to time, heat, or contamination in service—not just shelf price. Let's review drain interval discipline, duty severity, and any coolant or fuel ingress before recommending a higher-tier KLONDIKE fluid with stronger oxidation control.",
    cautionNotes: [
      "Severe sludge may require OEM-guided cleanup—not only an oil change.",
      "Confirm API CK-4 / OEM approvals for diesel engines before switching.",
    ],
    keywords: [
      "oxidation",
      "sludge",
      "varnish",
      "deposit",
      "dark oil",
      "tacky oil",
      "plugged filter",
    ],
  },

  contamination: {
    id: "contamination",
    issue: "Fluid contamination / dirty oil or grease",
    symptoms: [
      "Visible dirt, water, or milky emulsion in reservoir or grease",
      "Rapid filter plugging or abnormal wear metals on analysis",
      "Cross-contamination odor or color after wrong top-off",
      "Component scoring despite apparently correct product on paper",
    ],
    likelyCauses: [
      "Poor storage, open drums, or dirty transfer containers",
      "Breather and seal failures allowing ingress",
      "Wrong top-off fluid mixed into the system",
      "Environment: dust, process chemicals, or wash-down water",
    ],
    operationalConsequences: [
      "Accelerated wear across pumps, bearings, and engines",
      "False diagnosis of 'wrong lubricant' when practice is the root issue",
      "Repeat failures until ingress path is closed",
    ],
    questionsToAsk: [
      "How is bulk oil or grease stored and transferred on site?",
      "Recent top-offs, hose failures, or seal leaks?",
      "Oil analysis trends for water, dirt, or wear metals?",
      "Color-coding and single-fluid discipline for technicians?",
    ],
    relatedConcepts: ["contamination"],
    relatedApplications: [
      "Plant-wide MRO and bulk storage programs",
      "Mobile service trucks and field top-off practices",
      "Any asset with open reservoirs or frequent hose changes",
    ],
    possibleLubricantCategories: ["engine_oil", "hydraulic_fluid", "grease", "gear_oil"],
    repTalkTrack:
      "Contamination control is often the fastest win. Before we change SKU, let's walk storage, breather condition, and top-off discipline. If ingress is controlled, the right KLONDIKE spec will last dramatically longer in service.",
    cautionNotes: [
      "Identify and stop the contamination source before recommending premium fluid alone.",
      "Water or coolant ingress may require mechanical repair—not just a drain and fill.",
    ],
    keywords: [
      "contamination",
      "dirty oil",
      "water in oil",
      "milky oil",
      "dirt ingress",
      "wrong top off",
    ],
  },

  shortenedDrainIntervals: {
    id: "shortenedDrainIntervals",
    issue: "Shortened drain intervals / oil life dropping",
    symptoms: [
      "Oil darkens or loses viscosity faster than historical baseline",
      "Customer draining sooner than OEM or fleet program target",
      "Rising consumption or frequent top-offs between drains",
      "Oil analysis flags oxidation, soot, or contamination earlier than expected",
    ],
    likelyCauses: [
      "Severe duty, idle time, or emission-system stress not matched to fluid tier",
      "Fuel dilution, coolant leak, or water shortening life",
      "Underspecified fluid for extended drain ambition",
      "Filter or bypass issues allowing soot or dirt recirculation",
    ],
    operationalConsequences: [
      "Higher lubricant spend and labor on unplanned drains",
      "Increased downtime on assets scheduled for long intervals",
      "Hidden wear if drains are extended without analysis while fluid is degraded",
    ],
    questionsToAsk: [
      "Target drain interval vs what is actually achieved today?",
      "Duty cycle, idle percentage, and fuel quality?",
      "Recent oil analysis for soot, fuel, water, or metals?",
      "OEM extended drain program requirements and filter strategy?",
    ],
    relatedConcepts: ["oxidationStability", "contamination", "viscosityIndex"],
    relatedApplications: [
      "Fleet diesel programs targeting CK-4 extended service",
      "Industrial hydraulics with long-life ambitions",
    ],
    possibleLubricantCategories: ["engine_oil", "hydraulic_fluid"],
    repTalkTrack:
      "When drain life drops, we should look at duty, contamination, and whether the current fluid tier matches the interval goal. If analysis supports it, a higher-oxidation-stability KLONDIKE option may help—but only with OEM approval and a realistic sampling plan.",
    cautionNotes: [
      "Never promise extended drains without oil analysis and OEM program alignment.",
      "Fuel or coolant ingress must be corrected before interval extension.",
    ],
    keywords: [
      "short drain",
      "shortened drain",
      "drain interval",
      "oil life",
      "oil darkens fast",
      "frequent oil change",
    ],
  },

  foamAeration: {
    id: "foamAeration",
    issue: "Foam and aeration in lubricants",
    symptoms: [
      "Persistent foam on reservoir surface or dipstick",
      "Milky or aerated fluid appearance",
      "Erratic hydraulic pressure and spongy actuator feel",
      "Pump noise similar to cavitation with foam visible",
    ],
    likelyCauses: [
      "Wrong anti-foam additive balance or overfilled reservoir",
      "Air ingestion from suction leaks or return line splash",
      "Contamination with detergents or wrong fluid mix",
      "Viscosity or temperature mismatch increasing entrained air",
    ],
    operationalConsequences: [
      "Reduced lubrication film and compressible fluid column",
      "Pump and bearing damage from air release failure",
      "False low-pressure readings and heat buildup",
    ],
    questionsToAsk: [
      "Is foam stable or does it break quickly after shutdown?",
      "Return line submerged in reservoir or splashing above fluid level?",
      "Recent fluid change, detergent wash, or wrong top-off?",
      "Reservoir level, breather condition, and suction hose integrity?",
    ],
    relatedConcepts: ["cavitation", "contamination"],
    relatedApplications: [
      "Hydraulic reservoirs with high return flow",
      "Engine crankcases with blow-by and idle-heavy duty",
      "Compressors and circulating systems",
    ],
    possibleLubricantCategories: ["hydraulic_fluid", "engine_oil", "compressor_oil"],
    repTalkTrack:
      "Foam is often mechanical first—return line depth, overfill, and suction leaks. Let's confirm those before swapping fluid. If the system is clean and spec-correct, we can review KLONDIKE options with appropriate air-release and anti-foam performance for the OEM category.",
    cautionNotes: [
      "Anti-foam additives can be disrupted by wrong fluid mixes—avoid ad-hoc top-offs.",
      "Stable foam with water present may indicate emulsification—check for ingress.",
    ],
    keywords: [
      "foam",
      "foaming",
      "aeration",
      "air in oil",
      "milky hydraulic",
      "spongy hydraulics",
    ],
  },
};
