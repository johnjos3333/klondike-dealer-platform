/**
 * Industry lubrication knowledge — deterministic profiles for advisor intelligence.
 * Not wired to UI yet.
 */

export const industryLubricationKnowledge = {
  mining: {
    id: "mining",
    industry: "Mining",
    aliases: ["mine", "mines", "open pit", "underground mining", "hard rock mining"],
    opportunityLevel: "high",
    answerSummary:
      "Mining is a high-volume lubricant category. Haul trucks, shovels, drills, conveyors, and processing plants run greases, engine oils, hydraulics, and gear lubricants under dust, shock load, water, and long duty cycles.",
    commonEquipment: [
      "Haul trucks and loaders",
      "Hydraulic shovels and excavators",
      "Drills and bolters",
      "Conveyors, crushers, and mills",
    ],
    lubricantUseAreas: [
      {
        system: "Pins, bushings, and chassis greases",
        equipmentExamples: ["Shovels", "Haul trucks", "Dozers"],
        likelyProductCategories: ["grease"],
        operatingConditions: ["Dust", "Water spray", "Shock load", "Remote sites"],
        commonPainPoints: ["Washout", "Pin wear", "Missed regrease intervals"],
        discoveryQuestions: [
          "Which joints see the most water and shock—loader pins or truck chassis?",
          "Auto-lube or manual gun program?",
        ],
        salesAngle:
          "Position severe-duty grease with water resistance and EP protection for wet, high-load pins—confirm NLGI and thickener compatibility first.",
      },
      {
        system: "Diesel engine and drivetrain",
        equipmentExamples: ["Haul trucks", "Support generators"],
        likelyProductCategories: ["engine_oil", "gear_oil", "coolant"],
        operatingConditions: ["Heavy load", "Dust ingestion", "Extended idle"],
        commonPainPoints: ["Soot loading", "Filter plugging", "Drain interval pressure"],
        discoveryQuestions: ["Mixed fleet or single OEM?", "On-site oil analysis program?"],
        salesAngle:
          "Lead with CK-4 / severe-duty engine oil and documented approvals; pair with contamination control story.",
      },
    ],
    commonPainSignals: ["Pin wear in wet pits", "Dust contamination", "Remote delivery and bulk storage needs"],
    recommendedOpeningQuestions: [
      "What mobile fleet and fixed plant assets dominate your site?",
      "Where do you see the most grease consumption or joint failures?",
    ],
    repTalkTrack:
      "Mining runs hard on grease and diesel fluids—especially pins, hydraulics, and haul-truck engines in dusty, wet conditions. Let's map your highest-failure joints and bulk volumes before we narrow KLONDIKE SKUs.",
    spotlightAngles: ["Severe-duty grease", "Water and shock load", "Bulk supply reliability"],
    cautionNotes: ["Verify OEM specs on mobile fleet before quoting.", "Thickener compatibility matters on auto-lube systems."],
    keywords: ["mining", "mine", "haul truck", "shovel", "open pit"],
  },

  aggregateQuarry: {
    id: "aggregateQuarry",
    industry: "Aggregate / Quarry",
    aliases: ["quarry", "aggregate", "crusher plant", "sand and gravel", "stone plant"],
    opportunityLevel: "high",
    answerSummary:
      "Quarries and aggregate plants are strong lubricant accounts—mobile loaders and haul units plus fixed crushers, screens, and conveyors use grease, hydraulics, gear oils, and industrial lubricants daily.",
    commonEquipment: ["Wheel loaders", "Haul trucks", "Jaw and cone crushers", "Screens and conveyors"],
    lubricantUseAreas: [
      {
        system: "Mobile equipment greases and hydraulics",
        equipmentExamples: ["Loaders", "Excavators", "Haul trucks"],
        likelyProductCategories: ["grease", "hydraulic_fluid", "engine_oil"],
        operatingConditions: ["Dust", "Vibration", "Continuous shifts"],
        commonPainPoints: ["Grease washout on pins", "Hydraulic heat", "Dusty top-offs"],
        discoveryQuestions: ["Which shift pattern and regrease route?", "Bulk or packaged delivery on site?"],
        salesAngle: "Bundle mobile grease and hydraulic spec alignment with contamination discipline for dusty sites.",
      },
      {
        system: "Crusher and conveyor lubrication",
        equipmentExamples: ["Jaw crushers", "Cone crushers", "Bearing housings"],
        likelyProductCategories: ["grease", "gear_oil", "bearing_oil"],
        operatingConditions: ["High vibration", "Contamination", "Remote bearing lines"],
        commonPainPoints: ["Bearing failures", "Over- or under-greasing"],
        discoveryQuestions: ["Centralized lube system or manual points?", "Bearing temperature monitoring?"],
        salesAngle: "Focus on bearing reliability and NLGI selection for vibrating equipment.",
      },
    ],
    commonPainSignals: ["Dust ingress", "Production uptime pressure", "Seasonal volume swings"],
    recommendedOpeningQuestions: [
      "What tonnage and shift model are you running?",
      "Where do unplanned stops usually start—mobile fleet or fixed plant?",
    ],
    repTalkTrack:
      "A quarry is both a mobile fleet and a fixed plant. The best KLONDIKE conversation starts with which side bleeds more downtime—loader pins and hydraulics, or crusher bearings and gearboxes.",
    spotlightAngles: ["Dust and vibration", "Uptime", "Loader pin protection"],
    cautionNotes: ["Confirm hydraulic and engine OEM specs on mixed fleets."],
    keywords: ["quarry", "aggregate", "crusher", "gravel", "stone plant"],
  },

  constructionExcavation: {
    id: "constructionExcavation",
    industry: "Construction / Excavation",
    aliases: ["construction", "excavation", "earthmoving", "civil contractor", "site contractor"],
    opportunityLevel: "high",
    answerSummary:
      "Construction and excavation contractors lubricate excavators, dozers, loaders, cranes, and support trucks with grease, hydraulic fluid, engine oil, and gear lubricants across dirty, variable job sites.",
    commonEquipment: ["Excavators", "Dozers", "Skid steers", "Cranes", "Service trucks"],
    lubricantUseAreas: [
      {
        system: "Hydraulics and pins",
        equipmentExamples: ["Excavators", "Skid steers", "Backhoes"],
        likelyProductCategories: ["hydraulic_fluid", "grease"],
        operatingConditions: ["Dirt", "Cold starts", "Long hydraulic cycles"],
        commonPainPoints: ["Slow hydraulics in cold", "Pin wear", "Leaks and top-off discipline"],
        discoveryQuestions: ["Ambient range on site?", "OEM hydraulic spec in service?"],
        salesAngle: "Match hydraulic viscosity to season and OEM spec; pair with pin grease for oscillating joints.",
      },
    ],
    commonPainSignals: ["Job-site contamination", "Seasonal viscosity needs", "Mixed rental and owned fleet"],
    recommendedOpeningQuestions: [
      "What equipment mix owns most of your lube spend?",
      "Any seasonal cold-start or slow hydraulic complaints?",
    ],
    repTalkTrack:
      "Contractors win on uptime per job. Let's identify which machines drive grease and hydraulic volume, then align KLONDIKE products to OEM specs and the site's dirt and temperature reality.",
    spotlightAngles: ["Job-site uptime", "Seasonal hydraulics", "Pin protection"],
    cautionNotes: ["Rental fleets may have strict OEM fluid requirements."],
    keywords: ["construction", "excavation", "excavator", "earthmoving", "contractor"],
  },

  agricultureDairy: {
    id: "agricultureDairy",
    industry: "Agriculture / Dairy",
    aliases: ["ag", "farm", "dairy", "dairy farm", "livestock farm", "mixed farm"],
    opportunityLevel: "high",
    answerSummary:
      "Farms and dairies use tractor hydraulic UTF fluids, engine oils, greases, chain oils, and coolants across tractors, harvest equipment, milking systems support equipment, and utility vehicles.",
    commonEquipment: ["Tractors", "Combines", "Bale handlers", "Feed mixers", "Utility ATVs"],
    lubricantUseAreas: [
      {
        system: "Tractor transmission / wet brake hydraulics",
        equipmentExamples: ["Row-crop tractors", "Utility tractors"],
        likelyProductCategories: ["tractor_hydraulic", "utf"],
        operatingConditions: ["Seasonal peaks", "Wet brake systems", "Field dust"],
        commonPainPoints: ["Wet brake chatter", "Wrong top-off fluid", "Seasonal storage"],
        discoveryQuestions: ["OEM UTF or JDM requirement?", "Any recent fluid mix complaints?"],
        salesAngle: "Spec-first UTF conversation before any product recommendation—chatter and warranty risk are real.",
      },
      {
        system: "Grease and implement lubrication",
        equipmentExamples: ["Balers", "Mowers", "Loader mounts"],
        likelyProductCategories: ["grease", "gear_oil"],
        operatingConditions: ["Field moisture", "Seasonal use", "Outdoor storage"],
        commonPainPoints: ["Washout on PTO and implement joints", "Seasonal startup wear"],
        discoveryQuestions: ["Which implements see the most moisture?", "NLGI preference from dealer or OEM?"],
        salesAngle: "Seasonal implement grease program tied to haying and harvest windows.",
      },
    ],
    commonPainSignals: ["Seasonal buying", "Dealer co-op programs", "UTF spec confusion"],
    recommendedOpeningQuestions: [
      "What tractor brands and model years dominate the yard?",
      "Peak season for haying, harvest, or daily dairy chores?",
    ],
    repTalkTrack:
      "Dairy and mixed farms need correct UTF in tractors first, then grease discipline on implements. Let's confirm wet-brake fluid specs before we talk seasonal bundles.",
    spotlightAngles: ["UTF compliance", "Seasonal implement care", "Dealer partnership"],
    cautionNotes: ["Never substitute generic AW hydraulic for UTF without OEM approval."],
    keywords: ["dairy", "farm", "agriculture", "tractor", "ag", "livestock"],
  },

  truckingFleet: {
    id: "truckingFleet",
    industry: "Trucking / Fleet",
    aliases: ["trucking", "fleet", "transport", "linehaul", "mixed fleet diesel"],
    opportunityLevel: "high",
    answerSummary:
      "Trucking fleets consume heavy-duty engine oils, drivetrain lubricants, coolants, and greases across Class 8 trucks, trailers, and yard equipment with drain-interval and approval-driven buying.",
    commonEquipment: ["Class 8 tractors", "Trailers", "Yard trucks", "Reefer units"],
    lubricantUseAreas: [
      {
        system: "Heavy-duty engine oil",
        equipmentExamples: ["Linehaul tractors", "Regional delivery trucks"],
        likelyProductCategories: ["engine_oil"],
        operatingConditions: ["Long idle", "EGR/DPF", "Mixed OEM fleet"],
        commonPainPoints: ["Drain interval targets", "Soot", "Fuel economy positioning"],
        discoveryQuestions: ["Target CK-4 drain interval?", "OEM approvals required—Cummins, Detroit, Volvo?"],
        salesAngle: "Lead with documented OEM approvals and interval discipline; support with analysis if extended drains are claimed.",
      },
    ],
    commonPainSignals: ["Approval-driven purchasing", "Fuel economy narratives", "National account pricing"],
    recommendedOpeningQuestions: [
      "What OEM engines dominate the fleet?",
      "Shop drain interval target vs OEM severe service?",
    ],
    repTalkTrack:
      "Fleet accounts buy on approvals and proof. Let's list engine OEM requirements and actual drain practice, then align KLONDIKE CK-4 options with a defensible interval story.",
    spotlightAngles: ["OEM approvals", "Drain interval discipline", "Mixed-fleet simplification"],
    cautionNotes: ["Extended drain claims require analysis and OEM program alignment."],
    keywords: ["trucking", "fleet", "linehaul", "class 8", "diesel fleet", "transport"],
  },

  municipalities: {
    id: "municipalities",
    industry: "Municipalities",
    aliases: ["municipality", "city fleet", "municipal fleet", "public works", "town fleet"],
    opportunityLevel: "medium",
    answerSummary:
      "Municipal fleets use engine oils, hydraulics, greases, and specialty fluids across snowplows, refuse trucks, fire apparatus support units, parks equipment, and water utility vehicles—often with bid and spec compliance requirements.",
    commonEquipment: ["Snowplow trucks", "Street sweepers", "Utility pickups", "Small excavators", "Generators"],
    lubricantUseAreas: [
      {
        system: "Mixed diesel and gasoline fleet fluids",
        equipmentExamples: ["Plow trucks", "SUVs", "Small diesels"],
        likelyProductCategories: ["engine_oil", "grease", "hydraulic_fluid"],
        operatingConditions: ["Seasonal spikes", "Idle-heavy routes", "Public bid cycles"],
        commonPainPoints: ["Lowest-bid pressure", "Seasonal prep windows", "Spec compliance"],
        discoveryQuestions: ["Bid cycle timing?", "Written spec or brand-equal language?"],
        salesAngle: "Help shops prep seasonal volumes with spec documentation and consolidated SKU lists.",
      },
    ],
    commonPainSignals: ["Procurement cycles", "Seasonal pre-winter stocking", "Documentation for council approval"],
    recommendedOpeningQuestions: [
      "What seasonal surge hits first—winter or street maintenance?",
      "Are fluids on contract bid or shop discretion?",
    ],
    repTalkTrack:
      "Municipal business is timing plus paperwork. Let's align KLONDIKE specs to your written bid language and build a seasonal stocking plan before the council deadline.",
    spotlightAngles: ["Bid-ready documentation", "Seasonal readiness", "Fleet simplification"],
    cautionNotes: ["Respect contract bid specs—do not swap products on locked contracts without approval."],
    keywords: ["municipality", "municipal", "city fleet", "public works", "town"],
  },

  forestryLogging: {
    id: "forestryLogging",
    industry: "Forestry / Logging",
    aliases: ["forestry", "logging", "timber", "wood harvesting", "skidder"],
    opportunityLevel: "high",
    answerSummary:
      "Logging operations stress hydraulics, greases, and engine oils on skidders, feller bunchers, processors, and forwarders in mud, steep terrain, and high hydraulic heat environments.",
    commonEquipment: ["Skidders", "Feller bunchers", "Harvesters", "Forwarders", "Chainsaw support units"],
    lubricantUseAreas: [
      {
        system: "High-pressure hydraulics",
        equipmentExamples: ["Harvesters", "Processors"],
        likelyProductCategories: ["hydraulic_fluid"],
        operatingConditions: ["Cold starts", "High heat", "Water and mud"],
        commonPainPoints: ["Slow morning hydraulics", "Pump wear", "Contaminated top-offs"],
        discoveryQuestions: ["OEM hydraulic spec?", "On-board oil analysis?"],
        salesAngle: "Hydraulic spec and cleanliness program for high-cycle forestry machines.",
      },
    ],
    commonPainSignals: ["Remote locations", "Hydraulic heat", "Pin and bushing wear in mud"],
    recommendedOpeningQuestions: ["Which machines drive hydraulic volume?", "Cold-start complaints in shoulder season?"],
    repTalkTrack:
      "Forestry is hydraulic hours and dirty top-offs. Confirm OEM spec and storage discipline, then position KLONDIKE fluids that match pump and climate needs.",
    spotlightAngles: ["Hydraulic uptime", "Mud and moisture", "Cold-start performance"],
    cautionNotes: ["Biodegradable requirements may apply near sensitive watersheds—confirm regulations."],
    keywords: ["forestry", "logging", "skidder", "harvester", "timber"],
  },

  pavingAsphalt: {
    id: "pavingAsphalt",
    industry: "Paving / Asphalt",
    aliases: ["paving", "asphalt", "road construction", "paver", "hot mix"],
    opportunityLevel: "medium",
    answerSummary:
      "Paving contractors lubricate pavers, rollers, milling machines, and support trucks with hydraulics, greases, and engine oils—often in heat, dust, and seasonal production windows.",
    commonEquipment: ["Asphalt pavers", "Rollers", "Milling machines", "Dump trucks"],
    lubricantUseAreas: [
      {
        system: "Hydraulics and conveyor lubrication",
        equipmentExamples: ["Pavers", "Material transfer vehicles"],
        likelyProductCategories: ["hydraulic_fluid", "grease", "chain_oil"],
        operatingConditions: ["Heat", "Dust", "Long production days"],
        commonPainPoints: ["Hydraulic heat", "Chain and conveyor wear", "Seasonal startup"],
        discoveryQuestions: ["Production hours per day in peak season?", "Heat-related hydraulic complaints?"],
        salesAngle: "Seasonal hydraulic and grease program aligned to hot, dusty paving shifts.",
      },
    ],
    commonPainSignals: ["Short intense season", "Heat and dust", "Rental and owned mix"],
    recommendedOpeningQuestions: ["Peak paving months and fleet size?", "Which machines sit highest heat?"],
    repTalkTrack:
      "Paving season is compressed—downtime is expensive. Let's stock the hydraulic and grease SKUs that match your paver OEM specs before the first hot mix day.",
    spotlightAngles: ["Seasonal uptime", "Heat resistance", "Production reliability"],
    cautionNotes: ["Asphalt cement dust is abrasive—emphasize contamination control, not just product swaps."],
    keywords: ["paving", "asphalt", "paver", "roller", "road construction"],
  },

  foodProcessing: {
    id: "foodProcessing",
    industry: "Food Processing",
    aliases: ["food plant", "food grade", "beverage plant", "meat processing", "dairy processing plant"],
    opportunityLevel: "specialty",
    answerSummary:
      "Food processing plants use specialty food-grade lubricants where incidental contact risk exists, plus conventional industrial lubricants on utility equipment—governed by HACCP, audit, and registration requirements.",
    commonEquipment: ["Conveyors", "Mixers", "Packaging lines", "Compressors", "Utilities boilers and air"],
    lubricantUseAreas: [
      {
        system: "Food-grade registered lubricants",
        equipmentExamples: ["Conveyor bearings near product", "Bottle fillers"],
        likelyProductCategories: ["food_grade_lubricant"],
        operatingConditions: ["Wash-down", "Audit scrutiny", "NSF registration requirements"],
        commonPainPoints: ["Audit failures", "Wrong lubricant in food zone", "Wash-down washout"],
        discoveryQuestions: ["H1 vs H2 registration needs?", "Current NSF registrations on file?"],
        salesAngle: "Registration and documentation first—only recommend KLONDIKE food-grade where catalog and NSF status support the zone.",
      },
    ],
    commonPainSignals: ["Audit-driven buying", "Registration documentation", "Wash-down exposure"],
    recommendedOpeningQuestions: [
      "Which lines have incidental contact risk vs non-food utility areas?",
      "Upcoming audit or customer certification deadline?",
    ],
    repTalkTrack:
      "Food plants buy proof, not stories. Let's map H1/H2 zones and required registrations before any SKU recommendation—utility equipment may differ from food-zone lines.",
    spotlightAngles: ["Audit readiness", "Registration documentation", "Wash-down durability"],
    cautionNotes: [
      "Do not recommend non-food-grade products in food-contact zones.",
      "Verify NSF registration and customer HACCP plan before quoting.",
    ],
    keywords: ["food processing", "food grade", "food plant", "haccp", "nsf", "beverage"],
  },

  manufacturingIndustrialPlant: {
    id: "manufacturingIndustrialPlant",
    industry: "Manufacturing / Industrial Plant",
    aliases: ["manufacturing", "industrial plant", "factory", "mro", "production plant"],
    opportunityLevel: "high",
    answerSummary:
      "Manufacturing plants consume hydraulic fluids, spindle and bearing oils, greases, gear oils, and compressor lubricants across production lines, utilities, and material handling with reliability and cleanliness focus.",
    commonEquipment: ["Hydraulic presses", "CNC machines", "Conveyors", "Air compressors", "Forklifts"],
    lubricantUseAreas: [
      {
        system: "Hydraulics and circulating oils",
        equipmentExamples: ["Presses", "Injection molding", "Lift systems"],
        likelyProductCategories: ["hydraulic_fluid", "bearing_oil", "grease"],
        operatingConditions: ["Continuous run", "Heat", "ISO cleanliness targets"],
        commonPainPoints: ["Valve stiction", "Contamination", "Wrong viscosity"],
        discoveryQuestions: ["ISO cleanliness target?", "Oil analysis program in place?"],
        salesAngle: "Reliability and contamination control narrative with spec-matched KLONDIKE fluids.",
      },
    ],
    commonPainSignals: ["MRO consolidation", "Oil analysis culture", "Unplanned line stops"],
    recommendedOpeningQuestions: ["Which line drives the most lubricant spend?", "Analysis or filter cart program today?"],
    repTalkTrack:
      "Industrial plants reward reliability metrics. Start with the asset that stops the line—hydraulic press, compressor, or spindle—and build a spec plus cleanliness plan around it.",
    spotlightAngles: ["Uptime", "Contamination control", "MRO consolidation"],
    cautionNotes: ["Some OEM machine tools require specific spindle oil chemistry—confirm before switching."],
    keywords: ["manufacturing", "industrial", "factory", "plant", "mro", "production"],
  },

  steelMill: {
    id: "steelMill",
    industry: "Steel Mill",
    aliases: ["steel", "steel plant", "mill", "foundry support", "metal production"],
    opportunityLevel: "specialty",
    answerSummary:
      "Steel mills use heavy-duty gear oils, bearing lubricants, hydraulics, and specialty fluids on rolling mills, cranes, and material handling in extreme heat, load, and contamination environments.",
    commonEquipment: ["Rolling mills", "Overhead cranes", "Converters support equipment", "Hydraulic systems"],
    lubricantUseAreas: [
      {
        system: "Heavy-duty gears and bearings",
        equipmentExamples: ["Mill stands", "Cranes", "Conveyors"],
        likelyProductCategories: ["gear_oil", "bearing_oil", "grease"],
        operatingConditions: ["High load", "Heat", "Water and scale dust"],
        commonPainPoints: ["Gear wear", "Water ingress", "Centralized lube system failures"],
        discoveryQuestions: ["Centralized lube system OEM requirements?", "Water contamination history?"],
        salesAngle: "Heavy-load gear and bearing program with water separation and filtration emphasis.",
      },
    ],
    commonPainSignals: ["Extreme duty", "Centralized lubrication systems", "Water and scale contamination"],
    recommendedOpeningQuestions: ["Which mill area drives lubricant volume—rolling or material handling?", "Oil analysis on gear sumps?"],
    repTalkTrack:
      "Steel mills are specialty heavy-load accounts. We need centralized system specs and contamination history before positioning KLONDIKE gear or bearing products.",
    spotlightAngles: ["Heavy load", "Water contamination", "Centralized systems"],
    cautionNotes: ["Many systems are OEM-engineered—do not swap viscosity without engineering approval."],
    keywords: ["steel mill", "steel", "rolling mill", "foundry", "metal plant"],
  },

  paperMill: {
    id: "paperMill",
    industry: "Paper Mill",
    aliases: ["paper", "pulp mill", "paper plant", "pulp and paper"],
    opportunityLevel: "specialty",
    answerSummary:
      "Paper and pulp mills use hydraulics, greases, gear oils, and circulating bearing lubricants on paper machines, dryers, and wood handling equipment in wet, hot, and chemically aggressive environments.",
    commonEquipment: ["Paper machines", "Dryers", "Pulp digesters support", "Conveyors"],
    lubricantUseAreas: [
      {
        system: "Wet-end and dryer bearing lubrication",
        equipmentExamples: ["Paper machine rolls", "Dryer sections"],
        likelyProductCategories: ["bearing_oil", "grease", "gear_oil"],
        operatingConditions: ["Heat", "Moisture", "Continuous run"],
        commonPainPoints: ["Water ingress", "Bearing overheating", "Long drain intervals on large sumps"],
        discoveryQuestions: ["Machine section with highest bearing failures?", "Sump capacity and drain practice?"],
        salesAngle: "Moisture-resistant bearing and gear program with analysis support on large sumps.",
      },
    ],
    commonPainSignals: ["Moisture contamination", "Continuous production", "Large sump volumes"],
    recommendedOpeningQuestions: ["Which machine section loses the most bearings?", "Sump sampling frequency?"],
    repTalkTrack:
      "Paper mills run wet and hot—water ingress often matters more than brand loyalty. Let's review bearing sections with repeat failures and sump analysis trends first.",
    spotlightAngles: ["Moisture resistance", "Bearing reliability", "Continuous run"],
    cautionNotes: ["Some areas may require supplier-approved lists—confirm procurement rules."],
    keywords: ["paper mill", "pulp", "paper", "paper machine"],
  },

  marine: {
    id: "marine",
    industry: "Marine",
    aliases: ["marine", "vessel", "boat", "ship", "fishing fleet", "harbor"],
    opportunityLevel: "specialty",
    answerSummary:
      "Marine operations use engine oils, gear lubricants, greases, and hydraulic fluids on propulsion, winches, and deck equipment with water exposure, corrosion, and environmental regulation considerations.",
    commonEquipment: ["Propulsion engines", "Winches", "Hydraulic cranes", "Stern tubes", "Generators"],
    lubricantUseAreas: [
      {
        system: "Propulsion and gear lubrication",
        equipmentExamples: ["Main engines", "Gearboxes", "Thrusters"],
        likelyProductCategories: ["engine_oil", "gear_oil"],
        operatingConditions: ["Salt water exposure", "Load variation", "Emission regulations"],
        commonPainPoints: ["Corrosion", "Water contamination", "Regulatory fluid disposal"],
        discoveryQuestions: ["Engine OEM and sulfur limits?", "Water ingress on gear sumps?"],
        salesAngle: "Corrosion and water-handling narrative with strict OEM approval alignment.",
      },
    ],
    commonPainSignals: ["Salt exposure", "Regulatory compliance", "Seasonal vessel layup"],
    recommendedOpeningQuestions: ["Inland or saltwater operation?", "OEM approval list for propulsion?"],
    repTalkTrack:
      "Marine is spec and environment first. Confirm engine and gear OEM requirements, then address water contamination and corrosion with the right KLONDIKE category—not a generic substitute.",
    spotlightAngles: ["Corrosion protection", "Water contamination", "OEM compliance"],
    cautionNotes: ["Environmental regulations may restrict certain products near water—confirm local rules."],
    keywords: ["marine", "vessel", "boat", "ship", "fishing", "harbor"],
  },

  wasteManagement: {
    id: "wasteManagement",
    industry: "Waste Management",
    aliases: ["waste", "garbage truck", "refuse", "recycling fleet", "sanitation"],
    opportunityLevel: "medium",
    answerSummary:
      "Waste haulers lubricate collection trucks, compactors, and transfer station equipment with engine oils, hydraulics, and greases under stop-and-go duty, contamination, and municipal contract cycles.",
    commonEquipment: ["Front loaders", "Side loaders", "Roll-off trucks", "Compactors"],
    lubricantUseAreas: [
      {
        system: "Diesel engine and hydraulic packer systems",
        equipmentExamples: ["Refuse trucks", "Transfer compactors"],
        likelyProductCategories: ["engine_oil", "hydraulic_fluid", "grease"],
        operatingConditions: ["Stop-and-go", "Hydraulic cycling", "Contamination"],
        commonPainPoints: ["Soot", "Hydraulic heat", "Chassis grease washout"],
        discoveryQuestions: ["Route density and idle time?", "Hydraulic complaints on packer cycle?"],
        salesAngle: "Severe-duty engine oil plus hydraulic spec alignment for high-cycle refuse bodies.",
      },
    ],
    commonPainSignals: ["Stop-and-go soot", "Municipal contract alignment", "Hydraulic packer wear"],
    recommendedOpeningQuestions: ["Private hauler or municipal contract?", "Which body OEM hydraulic spec?"],
    repTalkTrack:
      "Refuse trucks are engine hours plus hydraulic cycles in dirty alleys. Let's map body OEM hydraulic spec and engine approval needs before bundling KLONDIKE products.",
    spotlightAngles: ["Stop-and-go protection", "Hydraulic cycle durability", "Fleet standardization"],
    cautionNotes: ["Body OEM hydraulic spec may differ from chassis OEM—confirm both."],
    keywords: ["waste", "garbage", "refuse", "sanitation", "recycling fleet"],
  },

  snowRemovalWinter: {
    id: "snowRemovalWinter",
    industry: "Snow Removal / Winter Operations",
    aliases: ["snow removal", "winter ops", "snowplow", "de-icing", "winter fleet"],
    opportunityLevel: "medium",
    answerSummary:
      "Winter operations fleets need cold-temperature engine oils, hydraulics, greases, and fluids for plows, spreaders, loaders, and support trucks during short, intense seasonal peaks.",
    commonEquipment: ["Snowplow trucks", "Wheel loaders", "Salt spreaders", "Skid steers"],
    lubricantUseAreas: [
      {
        system: "Cold-temperature engine and hydraulic performance",
        equipmentExamples: ["Plow trucks", "Loaders for snow stockpiles"],
        likelyProductCategories: ["engine_oil", "hydraulic_fluid", "grease"],
        operatingConditions: ["Extreme cold", "Frequent idle", "Salt corrosion"],
        commonPainPoints: ["Slow hydraulics", "Hard starting", "Corrosion on chassis joints"],
        discoveryQuestions: ["Typical coldest ambient on route?", "Pre-season fluid change routine?"],
        salesAngle: "Pre-winter stocking with viscosity and pumpability matched to local cold extremes.",
      },
    ],
    commonPainSignals: ["Seasonal surge ordering", "Cold-start complaints", "Salt corrosion on greased joints"],
    recommendedOpeningQuestions: ["When does the fleet pre-stage for first snow?", "Coldest route temperatures?"],
    repTalkTrack:
      "Winter fleets buy on timing. Let's build a pre-season KLONDIKE package for engine, hydraulic, and chassis grease before the first storm—not after slow plow hydraulics show up.",
    spotlightAngles: ["Cold-start readiness", "Pre-season stocking", "Salt and corrosion"],
    cautionNotes: ["Verify arctic or cold-service OEM limits—do not guess viscosity for plow hydraulics."],
    keywords: ["snow removal", "snowplow", "winter", "plow truck", "de-icing"],
  },
};
