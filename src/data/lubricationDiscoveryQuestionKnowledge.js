/**
 * Lubrication discovery-question knowledge — deterministic profiles for rep call prep.
 * Not wired to UI yet.
 */

export const lubricationDiscoveryQuestionKnowledge = {
  hydraulicFluidRecommendation: {
    id: "hydraulicFluidRecommendation",
    title: "Hydraulic Fluid Recommendation Discovery",
    aliases: [
      "hydraulic oil questions",
      "what to ask hydraulic oil",
      "hydraulic fluid recommendation questions",
      "before recommending hydraulic oil",
      "hydraulic discovery questions",
    ],
    questionExamples: [
      "What should I ask before recommending hydraulic oil?",
      "What questions should I ask about hydraulic fluid?",
      "What do I need to know before quoting hydraulic oil?",
    ],
    directAnswer:
      "Before recommending hydraulic oil, confirm OEM or pump manufacturer fluid type, viscosity grade, zinc vs ashless chemistry, operating temperature range, and whether the system shares oil with wet brakes or other circuits. Capture current product name, change interval, and any recent contamination or seal issues.",
    mustAskQuestions: [
      "What OEM, pump, or equipment manual specifies for hydraulic fluid type and viscosity?",
      "What product name and viscosity is in the reservoir today?",
      "Is this a dedicated hydraulic circuit or a common sump with wet brakes or hydrostatic drive?",
      "What are typical operating temperatures and duty cycle—continuous or intermittent?",
      "Any history of varnish, foaming, slow response, or seal leaks?",
      "Is the account zinc-sensitive (yellow metal, certain servo valves) or ashless-required?",
    ],
    helpfulFollowUps: [
      "How often do you change hydraulic oil and how do you sample?",
      "Indoor shop, outdoor mobile, or high-dust environment?",
      "Bulk tank, tote, or pail delivery preference?",
      "Are you open to extended-drain synthetics if OEM allows?",
      "Who approves fluid changes—maintenance manager or owner-operator?",
    ],
    redFlagQuestions: [
      "If they cannot name current fluid or viscosity—treat as unknown baseline; do not assume cross-grade.",
      "If wet-brake chatter or brake performance complaints exist—UTF or dedicated wet-brake fluid may be required, not generic AW.",
      "If they mixed products recently without flush—compatibility and varnish risk before any switch.",
      "If OEM mandates a specific spec (e.g. R&O, anti-wear, ashless)—generic AW may void warranty.",
    ],
    applicationDetailsToCapture: [
      "Equipment make, model, and year",
      "Reservoir capacity and number of machines on program",
      "Pump type (gear, piston, vane) if known",
      "Ambient and operating temperature extremes",
      "Filtration and breather condition",
      "Current supplier and price sensitivity",
    ],
    customerPainSignalsToListenFor: [
      "Slow hydraulic response or jerky cylinders",
      "Dark oil, sludge, or milky appearance",
      "Seal weeping or hose failures",
      "Overheating on long cycles",
      "Frequent filter changes or foaming after startup",
    ],
    decisionMakerQuestions: [
      "Who signs off on fluid specifications—fleet manager, shop foreman, or corporate procurement?",
      "Is there a corporate-approved vendor list or OEM dealer mandate?",
      "What would a successful trial look like—one machine, one site, or full fleet?",
    ],
    klondikeTieIn:
      "Match KLONDIKE hydraulic products to confirmed viscosity and chemistry (AW, R&O, ashless where required). Use PDS cross-reference for OEM mentions; position synthetics where extended drain and cold start matter. Offer bulk and tote programs for multi-unit accounts.",
    repTalkTrack:
      "Before I recommend a hydraulic oil, I want to make sure we protect the pump and any shared circuits. What spec does your manual call for, what's in the tank today, and have you seen foaming, varnish, or seal issues? That tells us whether we stay with your grade or look at a cleaner-running option KLONDIKE carries.",
    cautionNotes: [
      "Do not substitute AW for UTF or wet-brake-approved fluids without OEM confirmation.",
      "Verify zinc vs ashless requirements before quoting yellow-metal or precision hydraulic systems.",
    ],
    keywords: ["hydraulic", "hydraulic oil", "hydraulic fluid", "aw", "recommend", "before recommending"],
  },

  greaseRecommendation: {
    id: "greaseRecommendation",
    title: "Grease Recommendation Discovery",
    aliases: [
      "grease questions",
      "what to ask grease",
      "before recommending grease",
      "grease discovery questions",
      "what should i ask about grease",
    ],
    questionExamples: [
      "What should I ask before recommending grease?",
      "What questions should I ask about grease?",
      "How do I qualify a grease opportunity?",
    ],
    directAnswer:
      "Before recommending grease, identify thickener type in service, NLGI grade, application method (manual, gun, auto-lube), temperature and moisture exposure, and load/speed on the point. Unknown grease history on auto-lube systems usually means plan for compatibility review or flush—not blind top-off.",
    mustAskQuestions: [
      "What grease name, thickener, and NLGI grade is in use now?",
      "Manual regrease, battery gun, or centralized auto-lube?",
      "Operating temperature range and water exposure (wash, rain, quarry spray)?",
      "High-load pins, bearings, or chassis—any EP or moly requirement?",
      "OEM or auto-lube supplier restrictions on thickener type?",
      "Food-grade, general industrial, or fleet automotive application?",
    ],
    helpfulFollowUps: [
      "How often are points regreased and who owns the PM schedule?",
      "Any recent change in grease colour, texture, or line pressure?",
      "Seasonal programs—different product winter vs summer?",
      "Bulk pails vs cartridges vs tubes for field crews?",
    ],
    redFlagQuestions: [
      "Unknown thickener in auto-lube reservoir—mixing risk without chart or flush.",
      "Complaints of grease running off pins or blocked lines after product change.",
      "Switching thickener families (e.g. lithium to calcium sulfonate) without purge plan.",
      "Food-contact points with non-food product in service.",
    ],
    applicationDetailsToCapture: [
      "Point types: chassis, pins, bearings, electric motor, open gear",
      "NLGI and thickener on current PDS if available",
      "Number of machines and grease consumption estimate",
      "Centralized system make and line length if applicable",
      "Compatibility constraints from OEM",
    ],
    customerPainSignalsToListenFor: [
      "Pins dry or rusting despite regrease",
      "Grease inconsistency—too stiff in cold, too soft in heat",
      "Auto-lube alarms or blocked fittings",
      "Excessive consumption or wash-off in wet sites",
    ],
    decisionMakerQuestions: [
      "Who selects grease—shop, site supervisor, or national fleet spec?",
      "Is grease bundled with fuel or service contract elsewhere?",
      "Would a site trial on one shovel or truck line work?",
    ],
    klondikeTieIn:
      "Position KLONDIKE greases by thickener match and application: lithium complex for general fleet, calcium sulfonate for wet corrosion, synthetics for extreme temps where offered. Emphasize compatibility discipline and PDS documentation for fleet audits.",
    repTalkTrack:
      "Grease is a thickener and application conversation. What's in the gun or auto-lube tank today, how do you apply it, and what failures are you fighting—rust, wash-off, or line plugs? Once we know that, we can line up a KLONDIKE product that fits without a risky mix.",
    cautionNotes: [
      "Do not guarantee grease compatibility without supplier chart review.",
      "Confirm food-grade registration for food and beverage accounts.",
    ],
    keywords: ["grease", "recommend grease", "before recommending grease", "nlgi", "thickener"],
  },

  gearOilRecommendation: {
    id: "gearOilRecommendation",
    title: "Gear Oil Recommendation Discovery",
    aliases: [
      "gear oil questions",
      "what to ask gear oil",
      "before choosing gear oil",
      "gear oil discovery",
      "industrial gear oil questions",
    ],
    questionExamples: [
      "What questions should I ask before choosing gear oil?",
      "What should I ask about gear lubrication?",
      "How do I qualify a gearbox oil opportunity?",
    ],
    directAnswer:
      "Before choosing gear oil, confirm gearbox type (worm, helical, hypoid), OEM viscosity and GL rating, operating temperature, load and speed, and whether the sump is mineral or synthetic approved. Capture current product, drain interval, and any foaming, wear metals, or sludge on inspection.",
    mustAskQuestions: [
      "What does the gearbox or OEM manual specify for viscosity and performance level (e.g. GL-4, GL-5, industrial EP)?",
      "Worm, spur, helical, or hypoid—any yellow metal or bronze components?",
      "What product and viscosity is in the sump today?",
      "Typical sump temperature and duty—continuous hoist, intermittent, or shock load?",
      "Drain interval and any oil analysis program?",
      "Synthetic allowed or mineral-only per OEM?",
    ],
    helpfulFollowUps: [
      "Enclosed bath vs circulating system with filtration?",
      "Ambient extremes—cold outdoor winch or hot kiln vicinity?",
      "Bulk vs pail consumption per year?",
      "Recent seal leaks or breather moisture ingression?",
    ],
    redFlagQuestions: [
      "GL-5 in worm drives with bronze rings—may be inappropriate; confirm OEM.",
      "Wrong viscosity causing foaming or overheating—fix grade before brand switch.",
      "Water or grit ingress without addressing breather or seals first.",
      "Mixing incompatible EP chemistries after partial top-off.",
    ],
    applicationDetailsToCapture: [
      "Gearbox make, model, and sump volume",
      "Load class and speed if known",
      "Current viscosity and performance category",
      "Number of units and annual volume",
      "Maintenance access and drain practicality",
    ],
    customerPainSignalsToListenFor: [
      "Gear whine, foaming, or rapid darkening",
      "Metal on magnetic plug or analysis flags",
      "Overheating sump or frequent top-offs",
      "Seasonal stiffness on cold start",
    ],
    decisionMakerQuestions: [
      "Who owns gearbox PM—plant maintenance or contractor?",
      "Capital project vs run-rate lubricant spend?",
      "Open to extended-life synthetic if OEM permits?",
    ],
    klondikeTieIn:
      "Map KLONDIKE industrial and automotive gear oils to confirmed GL level and viscosity. Use synthetics for cold start or extended drain where spec allows. Pair with oil analysis story for quarry and plant accounts.",
    repTalkTrack:
      "Gear oil mistakes are expensive, so I start with what's in the manual—viscosity and GL rating—and what's in the box today. Tell me about temperatures, load, and whether you've seen foam or metal on the plug. Then we can match a KLONDIKE grade that fits the box without guessing.",
    cautionNotes: [
      "Worm and yellow-metal gearsets may require specific OEM-approved products—not all EP grades are interchangeable.",
      "Confirm open gear vs enclosed gearbox needs different product categories.",
    ],
    keywords: ["gear oil", "gearbox", "gl-5", "gl-4", "choosing gear oil", "industrial gear"],
  },

  engineOilRecommendation: {
    id: "engineOilRecommendation",
    title: "Engine Oil Recommendation Discovery",
    aliases: [
      "engine oil questions",
      "motor oil discovery",
      "what to ask engine oil",
      "before recommending engine oil",
      "fleet engine oil questions",
    ],
    questionExamples: [
      "What should I ask before recommending engine oil?",
      "What questions for a fleet engine oil program?",
      "How do I qualify engine oil for heavy duty?",
    ],
    directAnswer:
      "Before recommending engine oil, confirm engine OEM, model year, fuel type, required API/ACEA/OEM spec, viscosity for climate, drain interval target, and turbo/EGR/DPF aftertreatment constraints. Capture current brand, viscosity, and any consumption or soot concerns.",
    mustAskQuestions: [
      "Engine OEM and required specification (API CK-4, FA-4, OEM sheet, etc.)?",
      "On-highway, off-road, gas, diesel, or natural gas?",
      "Climate and typical cold-start temperatures for viscosity choice?",
      "OEM drain interval vs customer actual drain interval?",
      "Turbo, EGR, DPF, or low-SAPS requirement?",
      "What product and viscosity are they running now?",
    ],
    helpfulFollowUps: [
      "Oil analysis in use or interest in starting a program?",
      "Bulk tanks, shop delivery, or driver purchase?",
      "Idle time, short haul, or severe dusty duty?",
      "Warranty or dealer mandate on oil brand?",
    ],
    redFlagQuestions: [
      "Spec mismatch—older CI-4 in CK-4-required engine or wrong SAPS for DPF.",
      "Excessive consumption without checking PCV, leaks, or wrong viscosity.",
      "Mixing viscosities without understanding fleet standardization.",
      "Gas engine oil in diesel or vice versa.",
    ],
    applicationDetailsToCapture: [
      "Fleet size and engine families",
      "Target viscosity grade(s)",
      "Annual volume and delivery model",
      "Aftertreatment and warranty notes",
      "Competitive product and price benchmark",
    ],
    customerPainSignalsToListenFor: [
      "Short drain intervals due to soot or fuel dilution",
      "Turbo failures or sludge complaints",
      "Cold-start wear in northern yards",
      "DPF regen issues linked to oil ash",
    ],
    decisionMakerQuestions: [
      "Fleet manager vs owner-operator purchasing?",
      "Corporate lube spec or local shop discretion?",
      "Trial on subset of units acceptable?",
    ],
    klondikeTieIn:
      "Align KLONDIKE heavy-duty and commercial engine oils to published OEM approvals and API category. Lead with spec compliance, then value on drain interval and bulk supply for fleets.",
    repTalkTrack:
      "Engine oil starts with the spec sheet for your engines and how you actually drain—mileage, hours, or calendar. What's required, what viscosity are you in now, and any DPF or turbo issues? That frames which KLONDIKE grade belongs in the bulk tank.",
    cautionNotes: [
      "Verify OEM and API category on PDS before claiming equivalence to competitor.",
      "Low-SAPS products required where DPF/OEM mandates—do not downgrade.",
    ],
    keywords: ["engine oil", "motor oil", "ck-4", "fleet oil", "diesel oil", "recommend engine"],
  },

  transmissionFluidAtf: {
    id: "transmissionFluidAtf",
    title: "Transmission Fluid / ATF Discovery",
    aliases: [
      "atf questions",
      "transmission fluid questions",
      "what to ask atf",
      "automatic transmission fluid discovery",
      "powershift transmission questions",
    ],
    questionExamples: [
      "What should I ask before recommending ATF?",
      "What questions for transmission fluid?",
      "How do I qualify an ATF opportunity?",
    ],
    directAnswer:
      "Before recommending ATF or powershift fluid, confirm transmission OEM, required fluid specification (DEXRON, MERCON, Allison, Caterpillar TO-4, etc.), fill capacity, and whether the unit uses a separate wet brake or shared sump. Wrong ATF type is a common warranty and shift-quality failure mode.",
    mustAskQuestions: [
      "Transmission make, model, and OEM fluid specification on the dipstick or manual?",
      "On-highway automatic, powershift, or hydrostatic?",
      "Shared sump with wet brakes or dedicated brake fluid circuit?",
      "What fluid is in service now—brand and spec claim?",
      "Drain interval, filter changes, and any burn smell or slip complaints?",
      "Allison, Voith, or other OEM approval required?",
    ],
    helpfulFollowUps: [
      "Fleet size and seasonal fluid purchases?",
      "Who performs changes—in-house or dealer?",
      "Any recent flush after failure—contamination baseline?",
      "Operating environment—quarry, municipal, on-highway?",
    ],
    redFlagQuestions: [
      "Universal ATF claim without matching OEM spec—high risk.",
      "Wet brake chatter may indicate wrong fluid in shared sump—not just low level.",
      "Mixing ATF types after partial top-off—shift and friction material risk.",
      "Using engine oil or hydraulic AW in transmission.",
    ],
    applicationDetailsToCapture: [
      "Transmission family and count of units",
      "OEM spec string from manual or dipstick",
      "Sump capacity and service procedure",
      "Wet brake yes/no",
      "Current supplier and spec on label",
    ],
    customerPainSignalsToListenFor: [
      "Harsh shifts, slip, or overheating",
      "Wet brake chatter or poor braking in shared sump",
      "Dark fluid shortly after change",
      "Dealer warnings about non-OEM fluid",
    ],
    decisionMakerQuestions: [
      "Dealer service mandate vs independent shop?",
      "Warranty sensitivity on new equipment?",
      "Willingness to standardize spec across mixed fleet?",
    ],
    klondikeTieIn:
      "Use KLONDIKE ATF and transmission products where PDS lists required OEM specs. For off-highway, tie TO-4 and Allison-approved products to equipment profiles; never guess on friction-sensitive units.",
    repTalkTrack:
      "Transmission fluid is spec-critical. What's on the dipstick or in the manual, and is brake oil in the same sump? If there's chatter or slip, we need the exact approval before suggesting a KLONDIKE match.",
    cautionNotes: [
      "ATF friction modifiers vary—do not assume multi-vehicle ATF covers all OEM approvals.",
      "Wet brake performance requires correct UTF/TO-4 type where shared sump applies.",
    ],
    keywords: ["atf", "transmission fluid", "automatic transmission", "to-4", "allison", "powershift"],
  },

  tractorHydraulicUtf: {
    id: "tractorHydraulicUtf",
    title: "Tractor Hydraulic / UTF Discovery",
    aliases: [
      "utf questions",
      "tractor hydraulic fluid questions",
      "universal tractor fluid",
      "wet brake fluid questions",
      "what to ask utf",
    ],
    questionExamples: [
      "What should I ask about tractor hydraulic fluid?",
      "What questions for UTF and wet brakes?",
      "What do I need for a shared sump tractor?",
    ],
    directAnswer:
      "For tractor hydraulic and UTF applications, confirm OEM JDM or equivalent spec, shared sump with wet brakes, viscosity, and brake chatter history. Generic AW hydraulic oil is often wrong for farm tractors—UTF or J20C-type products are designed for transmission, hydraulic, and brake friction in one sump.",
    mustAskQuestions: [
      "Tractor make, model, and OEM fluid spec (J20C, 134D, etc.)?",
      "Single sump for hydro/trans/wet brake or separate circuits?",
      "Any wet brake chatter, squawk, or poor stop?",
      "What fluid brand and spec claim is in the tractor now?",
      "Seasonal temperature range for viscosity choice?",
      "Loader cycles, PTO hours, and annual service pattern?",
    ],
    helpfulFollowUps: [
      "Dealer warranty still active—fluid must match dealer list?",
      "Number of tractors and combined annual volume?",
      "Bulk tank on farm or jug purchase?",
      "Recent top-off with non-UTF product?",
    ],
    redFlagQuestions: [
      "AW hydraulic oil in shared wet-brake sump—common chatter and warranty issue.",
      "Ignoring brake performance complaints while only checking hydraulic function.",
      "Mixing UTF types without flush after wrong fill.",
    ],
    applicationDetailsToCapture: [
      "Tractor count and horsepower range",
      "OEM spec from owner's manual",
      "Sump capacity per unit",
      "Wet brake and shuttle shift behavior",
      "Current competitive product",
    ],
    customerPainSignalsToListenFor: [
      "Brake chatter on engagement",
      "Slow hydraulic lift or noisy shuttle",
      "Fluid darkening mid-season",
      "Dealer blame on aftermarket fluid",
    ],
    decisionMakerQuestions: [
      "Owner-operator vs farm manager purchasing?",
      "Dealer tied on warranty service?",
      "Co-op or seasonal bulk buy timing?",
    ],
    klondikeTieIn:
      "Match KLONDIKE UTF and tractor hydraulic products to published JDM/OEM cross-references. Lead with wet-brake protection and single-sump simplicity for ag accounts.",
    repTalkTrack:
      "On tractors it's one sump for hydraulics, transmission, and often wet brakes—so spec matters. What does your manual say, any brake chatter, and what's in there now? That's how we pick the right KLONDIKE UTF instead of a generic hydraulic.",
    cautionNotes: [
      "Do not recommend standard AW hydraulic fluid for OEM UTF/shared wet-brake systems without written OEM exception.",
    ],
    keywords: ["utf", "tractor hydraulic", "j20", "wet brake", "tractor fluid", "farm tractor"],
  },

  coolantRecommendation: {
    id: "coolantRecommendation",
    title: "Coolant Recommendation Discovery",
    aliases: [
      "coolant questions",
      "antifreeze discovery",
      "what to ask coolant",
      "before recommending coolant",
      "extended life coolant questions",
    ],
    questionExamples: [
      "What should I ask before recommending coolant?",
      "What questions for fleet antifreeze?",
      "How do I qualify a coolant program?",
    ],
    directAnswer:
      "Before recommending coolant, confirm OEM chemistry (OAT, HOAT, nitrite for heavy duty), freeze protection target, mixed fleet standardization needs, and what is in radiators today. Mixing incompatible coolants causes gelation and corrosion—capture colour, brand, and whether top-off has been with different chemistry.",
    mustAskQuestions: [
      "OEM coolant specification and chemistry type required?",
      "On-highway, off-road, stationary engine, or mixed fleet?",
      "What product is in the system now—brand and OAT/HOAT/conventional?",
      "Target freeze point and whether concentrate or pre-mix is preferred?",
      "Any recent top-off with different colour or chemistry?",
      "Water quality—deionized, tap, or on-site pretreatment?",
    ],
    helpfulFollowUps: [
      "Drain interval or test strip program in use?",
      "Bulk antifreeze vs jugs for field top-off?",
      "Aluminum vs copper/brass prevalence in fleet?",
      "Seasonal flush practice or long-life program?",
    ],
    redFlagQuestions: [
      "Unknown coolant with multiple colours in fleet—flush before standardizing.",
      "Silicate OAT mix-ups in modern car/light truck without OEM approval.",
      "Using water only in HD nitrite systems—corrosion and liner pit risk.",
      "Coolant in oil or oil in coolant—mechanical issue before fluid sale.",
    ],
    applicationDetailsToCapture: [
      "Fleet size and engine OEMs",
      "Concentrate vs prediluted preference",
      "Annual volume and delivery",
      "Current freeze point and test results if available",
      "Shop equipment for recycling or disposal",
    ],
    customerPainSignalsToListenFor: [
      "Overheating, gelled coolant, or filter plugging",
      "Rust and liner pitting complaints",
      "Frequent water pump failures",
      "Inconsistent freeze protection across yard",
    ],
    decisionMakerQuestions: [
      "Who owns coolant spec—fleet engineer or local shop?",
      "Corporate environmental rules on propylene vs ethylene?",
      "Pilot one coolant type across a region?",
    ],
    klondikeTieIn:
      "Position KLONDIKE coolants to OEM chemistry match and fleet consolidation. Emphasize testing, proper mix, and avoiding incompatible top-off—pair with greases and engine oils on full PM programs.",
    repTalkTrack:
      "Coolant is a chemistry match, not a colour match. What's in the radiator today, what does your OEM want, and have you topped off with anything different? We can line up a KLONDIKE program that protects metals without a risky mix.",
    cautionNotes: [
      "Do not mix OAT, HOAT, and conventional chemistries without flush and OEM guidance.",
      "Verify nitrite/nitrite-free needs for heavy-duty wet sleeve engines.",
    ],
    keywords: ["coolant", "antifreeze", "oat", "hoat", "recommend coolant", "freeze protection"],
  },

  compressorOilRecommendation: {
    id: "compressorOilRecommendation",
    title: "Compressor Oil Recommendation Discovery",
    aliases: [
      "compressor oil questions",
      "air compressor lubricant discovery",
      "what to ask compressor oil",
      "rotary screw compressor oil",
    ],
    questionExamples: [
      "What should I ask before recommending compressor oil?",
      "What questions for rotary screw compressor lubricant?",
      "How do I qualify compressor oil?",
    ],
    directAnswer:
      "Before recommending compressor oil, confirm compressor type (reciprocating, rotary screw, vane), OEM fluid requirement, run hours and drain interval, discharge temperature, and whether air contacts food, paint, or breathing air. Wrong oil causes varnish, separator failure, and downstream contamination.",
    mustAskQuestions: [
      "Compressor make, model, and OEM lubricant specification?",
      "Rotary screw, reciprocating, or portable job-site unit?",
      "Typical discharge temperature and duty cycle?",
      "OEM drain interval and separator change interval?",
      "What oil is in service now—synthetic or mineral?",
      "Any requirement for food-grade or low-hydrocarbon air (paint, food packaging)?",
    ],
    helpfulFollowUps: [
      "Oil analysis or pressure drop across separator tracked?",
      "Ambient dust and intake filtration condition?",
      "Number of compressors and annual volume?",
      "Interest in extended drain synthetic if OEM allows?",
    ],
    redFlagQuestions: [
      "Automotive engine oil in rotary screw—separator and varnish risk.",
      "Over-extended drain with dark varnish and high delta-P—mechanical review first.",
      "Food plant using non-food-grade without HACCP approval.",
    ],
    applicationDetailsToCapture: [
      "Compressor technology and horsepower",
      "Sump capacity and fluid consumption",
      "Separator and filter maintenance history",
      "Downstream air use (shop air, plant air, breathing)",
      "Current product and drain practice",
    ],
    customerPainSignalsToListenFor: [
      "High oil carryover or pressure drop",
      "Varnish on rotors or frequent separator swaps",
      "Overheating trip on long runs",
      "Water in oil from poor condensation control",
    ],
    decisionMakerQuestions: [
      "Plant engineer vs shop manager for spec?",
      "Production downtime cost—trial window acceptable?",
      "Bundled with service contractor?",
    ],
    klondikeTieIn:
      "Match KLONDIKE compressor fluids to OEM drain intervals and synthetic options where supported. Tie reliability story to separator life and clean air for plant accounts.",
    repTalkTrack:
      "Compressor oil has to match what the OEM calls for and how hard you run—temperature and hours matter. What machine, what spec, what's in it now, and any varnish or separator issues? Then we can place the right KLONDIKE fluid.",
    cautionNotes: [
      "Confirm food-grade registration where air contacts food or packaging.",
      "Do not substitute engine oil for OEM-specified compressor fluid.",
    ],
    keywords: ["compressor oil", "rotary screw", "air compressor", "compressor lubricant"],
  },

  foodGradeLubricant: {
    id: "foodGradeLubricant",
    title: "Food-Grade Lubricant Discovery",
    aliases: [
      "food grade lubricant questions",
      "h1 lube discovery",
      "what to ask food grade",
      "food plant lubrication questions",
      "nsf food grade questions",
    ],
    questionExamples: [
      "What should I ask before recommending food-grade lubricant?",
      "What questions for H1 grease in a food plant?",
      "How do I qualify food-grade lube?",
    ],
    directAnswer:
      "Before recommending food-grade lubricants, confirm NSF category (H1, H2, 3H where relevant), contact vs non-contact zones, allergen and audit requirements, current registration numbers, and whether equipment is washdown-heavy. Food plants require documentation—not just a marketing claim.",
    mustAskQuestions: [
      "Which zones—incidental food contact (H1), non-contact (H2), or direct (3H)?",
      "Audit standards in play—SQF, BRC, FDA expectations, customer audits?",
      "What registered products are in service now—NSF numbers?",
      "Washdown frequency, water pressure, and chemical cleaners used?",
      "Chain, gearbox, hydraulic, or compressor points in food areas?",
      "Allergen, kosher, or halal constraints from end customer?",
    ],
    helpfulFollowUps: [
      "Lubrication PM owned by plant or contractor?",
      "Colour-coding or tagging program for food vs non-food?",
      "Interest in synthetic H1 for extreme temp lines?",
      "Documentation needed for audit binders?",
    ],
    redFlagQuestions: [
      "Non-food product on conveyor bearings in contact zone—audit failure risk.",
      "Rep cannot produce NSF registration for quoted product.",
      "Mixing food and non-food greases in same auto-lube line.",
      "Using H2 where H1 incidental contact exists.",
    ],
    applicationDetailsToCapture: [
      "Plant type—beverage, meat, bakery, packaging",
      "Point list with zone classification",
      "Current NSF registrations and volumes",
      "Washdown and temperature profile",
      "Procurement and QA approval path",
    ],
    customerPainSignalsToListenFor: [
      "Audit findings on lubrication",
      "Wash-off and re-lube labour burden",
      "Bearing failures on wet lines",
      "Confusion between maintenance closet and food-area stock",
    ],
    decisionMakerQuestions: [
      "QA manager sign-off required?",
      "Corporate approved lubricant list?",
      "Trial on one line during scheduled sanitation?",
    ],
    klondikeTieIn:
      "Lead with KLONDIKE food-grade registrations, PDS, and NSF documentation for audit packets. Position H1 greases and oils for washdown lines and consolidate with plant PM where allowed.",
    repTalkTrack:
      "In food plants I need to know your audit rules and which points are incidental contact versus non-contact. What NSF-registered products are you using now, and where do washdown and bearing failures hurt you? KLONDIKE can support with registered products and paperwork for QA.",
    cautionNotes: [
      "Always verify current NSF registration and category before quoting.",
      "H1/H2/3H categories are not interchangeable—confirm zone with plant QA.",
    ],
    keywords: ["food grade", "h1", "nsf", "food plant", "food grade lubricant"],
  },

  industryProspectCall: {
    id: "industryProspectCall",
    title: "Industry Prospect Call Discovery",
    aliases: [
      "quarry customer questions",
      "what to ask quarry customer",
      "industry prospect questions",
      "discovery call industry",
      "mining customer questions",
      "construction fleet discovery",
    ],
    questionExamples: [
      "What questions should I ask a quarry customer?",
      "What should I ask on a first plant visit?",
      "How do I discovery a mining lubrication account?",
    ],
    directAnswer:
      "On an industry prospect call, map equipment mix, who owns lubrication decisions, current supplier relationships, pain on downtime and consumption, and seasonal production peaks. Listen for dust, moisture, load, and centralized lube complexity—these drive product categories and service model.",
    mustAskQuestions: [
      "What equipment families dominate the site—haul trucks, loaders, crushers, conveyors, drills?",
      "Who specifies lubricants—site maintenance, corporate engineering, or OEM dealer?",
      "Current supplier, contract terms, and satisfaction level?",
      "Top three downtime or cost pain points related to lubrication or fuel?",
      "Bulk storage, delivery access, and seasonal shutdown windows?",
      "Oil analysis, grease routes, or PM software in use?",
    ],
    helpfulFollowUps: [
      "Production peaks—when is the worst time to trial?",
      "Environmental or spill containment requirements on site?",
      "Union or contractor maintenance structure?",
      "Other Klondike categories already on account—fuel, DEF, greases?",
    ],
    redFlagQuestions: [
      "No access to decision maker—tour only without maintenance lead.",
      "Locked national contract with no local deviation—qualify path first.",
      "Safety gate requirements not scheduled—wasted visit.",
      "Expecting instant spec substitution without trial protocol.",
    ],
    applicationDetailsToCapture: [
      "Site type—quarry, mine, plant, municipal yard",
      "Fleet count and major OEMs",
      "Estimated annual lube volume by category",
      "Competitive incumbent and renewal timing",
      "Geography and delivery logistics",
    ],
    customerPainSignalsToListenFor: [
      "Dust ingress and short filter life",
      "Pin and bushing wear in wet or abrasive conditions",
      "Hydraulic overheating on crushers or shovels",
      "Grease line failures on auto-lube",
      "Fragmented products across too many suppliers",
    ],
    decisionMakerQuestions: [
      "Who can approve a trial—site manager, reliability engineer, or procurement?",
      "What KPI matters—cost per hour, availability, or audit compliance?",
      "Is there a corporate sustainability or ESG angle on synthetics or packaging?",
    ],
    klondikeTieIn:
      "Use KLONDIKE industry playbooks—quarry, construction, agriculture—to bundle hydraulic, engine, grease, and coolant. Offer bulk logistics, PDS support, and troubleshooting backup for site trials.",
    repTalkTrack:
      "On a first quarry or plant visit I'm listening for equipment mix, who owns lube spec, and what's costing you hours—pins, hydraulics, or filters. If we map that, we can see where KLONDIKE bulk and product range fits without stepping on your OEM relationships blind.",
    cautionNotes: [
      "Respect site safety orientation and PPE rules before technical discovery.",
      "Do not overpromise corporate contract override without procurement path confirmed.",
    ],
    keywords: ["quarry", "mining", "prospect", "industry", "customer questions", "first visit", "plant visit"],
  },

  troubleshootingCall: {
    id: "troubleshootingCall",
    title: "Troubleshooting Call Discovery",
    aliases: [
      "troubleshooting questions",
      "what to ask troubleshooting",
      "wet brake chatter questions",
      "failure investigation questions",
      "lube problem discovery",
    ],
    questionExamples: [
      "What should I ask about wet brake chatter?",
      "What questions on a troubleshooting call?",
      "How do I diagnose a lubrication complaint on the phone?",
    ],
    directAnswer:
      "On a troubleshooting call, timeline the symptom, recent fluid or grease changes, maintenance actions, operating conditions, and OEM spec in service. For wet brake chatter, confirm shared-sump fluid type, level, contamination, and whether AW hydraulic was used instead of UTF/TO-4-type product.",
    mustAskQuestions: [
      "When did the symptom start and what changed just before—fluid change, repair, environment?",
      "Exact product names and specs now in the affected system?",
      "Equipment make, model, hours, and application duty?",
      "For chatter/slip/noise—transmission, brake, hydraulic, or engine related?",
      "Fluid level, colour, smell, and whether water or wrong product was added?",
      "OEM or dealer already involved—any fault codes or filter findings?",
    ],
    helpfulFollowUps: [
      "Photos of dipstick, filter, or magnetic plug available?",
      "Single unit or fleet-wide after bulk delivery?",
      "Oil analysis or grease sample history?",
      "Can they safely idle-test or is unit down?",
    ],
    redFlagQuestions: [
      "Wrong fluid type in friction-sensitive sump—stop top-off and plan correct spec.",
      "Mechanical failure signs ignored—metal, coolant in oil, no oil pressure.",
      "Continuing to operate with severe chatter or slip—safety and warranty risk.",
      "Multiple unrelated symptoms—may need dealer diagnostics first.",
    ],
    applicationDetailsToCapture: [
      "Symptom description in operator terms",
      "Maintenance log entries last 30 days",
      "Sump type and capacity",
      "Environmental factors—cold, wet, dusty",
      "Urgency and downtime cost",
    ],
    customerPainSignalsToListenFor: [
      "Wet brake chatter on engagement",
      "Hydraulic foam or slow cycle after fluid change",
      "Grease run-off or blocked auto-lube",
      "Overheating after brand switch",
      "Recurring failure after short fix",
    ],
    decisionMakerQuestions: [
      "Who authorizes flush and refill—shop or site manager?",
      "Warranty still active with dealer?",
      "Budget for correct fluid vs continued trial-and-error?",
    ],
    klondikeTieIn:
      "Use KLONDIKE advisor troubleshooting profiles and compatibility guidance to frame safe next steps. Escalate to technical when spec is unclear; position correct KLONDIKE product after root cause is bounded.",
    repTalkTrack:
      "Let's time-stamp when this started and what was done last—fluid change matters. For wet brake chatter I need the exact spec in that sump and whether anything besides UTF/TO-4 went in. We'll narrow whether it's wrong fluid, low level, or mechanical before we talk product.",
    cautionNotes: [
      "Troubleshooting guidance is educational—not a remote warranty diagnosis.",
      "Recommend stopping operation when safety-critical brake or transmission symptoms are severe.",
    ],
    keywords: ["troubleshooting", "wet brake chatter", "chatter", "problem", "symptom", "failure", "diagnose"],
  },

  oemSpecConfirmationCall: {
    id: "oemSpecConfirmationCall",
    title: "OEM / Spec Confirmation Discovery",
    aliases: [
      "oem spec questions",
      "spec confirmation call",
      "what to ask oem spec",
      "before quoting oem fluid",
      "warranty lubricant spec questions",
    ],
    questionExamples: [
      "What should I ask to confirm OEM spec?",
      "What questions before claiming equivalent spec?",
      "How do I validate lubricant spec with customer?",
    ],
    directAnswer:
      "Before claiming OEM or spec equivalence, capture the exact specification string from the manual, dipstick, or dealer bulletin—not competitor label marketing. Confirm model year, aftertreatment, and whether warranty requires dealer-branded fluid. Document what the customer will accept as proof.",
    mustAskQuestions: [
      "Exact OEM spec text from manual, door sticker, or dipstick?",
      "Equipment or engine model year and serial range if spec changed?",
      "Dealer warranty active—any mandated fluid brand?",
      "Customer's definition of equivalent—OEM list, PDS claim, or oil analysis?",
      "Related systems—same spec for engine, trans, and hydraulics or separate?",
      "Who needs to sign off if spec is interpreted—customer engineer or dealer?",
    ],
    helpfulFollowUps: [
      "Photo of spec plate or maintenance manual page available?",
      "Previous approval from OEM or dealer for alternate fluid?",
      "Corporate fleet spec sheet overriding OEM?",
      "Trial agreement if equivalence is disputed?",
    ],
    redFlagQuestions: [
      "Customer only has competitor bottle label—insufficient for warranty spec.",
      "Conflicting specs across manual vs dipstick—resolve before quote.",
      "Rep pressure to skip documentation on new warranty equipment.",
      "Mixed fleet with one spec quoted for all units.",
    ],
    applicationDetailsToCapture: [
      "OEM spec strings per system",
      "PDS and approval documents to attach",
      "Warranty status and dealer contacts",
      "Customer approval workflow",
      "Competitive product they believe is equivalent",
    ],
    customerPainSignalsToListenFor: [
      "Dealer denied warranty over fluid",
      "Audit request for lubricant documentation",
      "Confusion between API, OEM, and brand marketing",
      "Corporate mandate to reduce SKUs with spec risk",
    ],
    decisionMakerQuestions: [
      "Who accepts technical equivalence—reliability, QA, or legal?",
      "Is written approval required on letterhead?",
      "Timeline for spec review before next bulk buy?",
    ],
    klondikeTieIn:
      "Use KLONDIKE PDS OEM/spec listings and advisor OEM profiles. Provide documented cross-reference; escalate gaps as needs confirmation rather than overstating match.",
    repTalkTrack:
      "To protect your warranty I need the exact spec from your manual or dipstick, not just the old bottle. If KLONDIKE lists that approval on the PDS we're in good shape; if not, we'll flag it for technical confirmation before you buy bulk.",
    cautionNotes: [
      "Never state OEM approval without current PDS or official listing.",
      "Model-year spec changes are common—confirm serial or year.",
    ],
    keywords: ["oem", "spec", "equivalent", "warranty", "approval", "confirm spec", "pds"],
  },
};
