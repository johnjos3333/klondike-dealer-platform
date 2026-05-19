/**
 * Phase 6G — Equipment manufacturer opportunity profile foundation (data only).
 *
 * Deterministic opportunity profiles for common lubrication conversations on named
 * equipment fleets. Not OEM endorsement sheets—verify requirements on equipment tags,
 * manuals, and current PDS before recommending chemistry. No implied partnership or
 * approval unless documented on the PDS for the SKU discussed.
 *
 * Not wired to App.js, sell sheets, or send behavior yet.
 */

export const EQUIPMENT_OPPORTUNITY_PROFILE_VERSION = 2;

export const EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER =
  "OEM opportunity profile for rep enablement only—not an OEM endorsement, partnership, or approval. Verify all requirements using equipment tags, operator manuals, and the current PDS before any spec conversation or recommendation.";

/**
 * @typedef {{
 *   category: string,
 *   role: string,
 * }} TypicalFluidCategoryRef
 */

/**
 * @typedef {{
 *   name: string,
 *   positioning: string,
 * }} RecommendedProductAnchor
 */

/**
 * @typedef {{
 *   key: string,
 *   label: string,
 *   profileTitle: string,
 *   profileSubtitle: string,
 *   opportunitySummary: string,
 *   commonLubricationConversations: string[],
 *   equipmentTypes: string[],
 *   typicalFluidCategories: TypicalFluidCategoryRef[],
 *   opportunitySignals: string[],
 *   recommendedRepTalkingPoints: string[],
 *   discoveryFocus: string[],
 *   crossSellFocus: string[],
 *   cautions: string[],
 *   recommendedProductAnchors: RecommendedProductAnchor[],
 *   recommendedNextStep: string,
 * }} EquipmentOpportunityProfile
 */

/** @type {EquipmentOpportunityProfile[]} */
const EQUIPMENT_OPPORTUNITY_PROFILE_LIST = [
  {
    key: "cat",
    label: "CAT Equipment",
    profileTitle: "CAT Earthmoving Fleet — Lubrication Opportunity Playbook",
    profileSubtitle:
      "Production-hour spec conversations for excavators, loaders, haul trucks, and site support iron",
    opportunitySummary:
      "Rep playbook for Caterpillar-badged earthmoving fleets: lead with lost production hours, compartment-by-compartment spec discipline, and KLONDIKE category depth where equipment tags, manuals, and the current PDS support the duty. This is a spec conversation guide—not a Caterpillar endorsement.",
    commonLubricationConversations: [
      "Hydraulic circuits: heat, foam, and slow response when ISO VG drifts or bulk top-off crosses mobile AW tanks",
      "Undercarriage & implements: pin, bushing, and final-drive wear when grease thickener or regrease intervals slip on wet shifts",
      "Bulk discipline: unlabeled ISO VG drums and shared hoses between hydraulic, swing, and travel compartments",
      "Mixed iron: haul-truck and support-diesel CK-4 and HD coolant programs running beside yellow machines on one yard",
      "Sensitive sites: ENVIRO / EAL hydraulic conversations only where tags, manuals, and PDS list the application",
    ],
    equipmentTypes: [
      "Large hydraulic excavators — main, travel, and swing pump circuits",
      "Wheel loaders — lift and steering hydraulics; axle and final drives",
      "Off-highway haul trucks — engine, differential, and hoist hydraulics",
      "Dozers & motor graders — undercarriage pins, circle drives, and blade hydraulics",
      "Motor scrapers & compactors — shared-yard bulk and seasonal viscosity swings",
      "Site support — pickups, water trucks, and lube service units on the same card",
    ],
    typicalFluidCategories: [
      {
        category: "Hydraulic fluids (AW / MV / XVI Synthetic)",
        role: "ISO VG-matched pump protection; ladder Professional → Advanced → MV → XVI per tag and analysis",
      },
      {
        category: "Grease (MOLY TAC, ULTRA TAC, nano Calcium Sulfonate EP)",
        role: "Pins, bushings, and slow-speed joints—spec conversation only where PDS lists severe earthmoving duty",
      },
      {
        category: "Gear oils (Commercial & Full Synthetic EP)",
        role: "Final drives, reducers, and axles—one compartment tag at a time",
      },
      {
        category: "HD engine oils (CK-4 synthetic blend & full synthetic)",
        role: "Haul trucks and support diesels—API category and viscosity from tag, not bulk habit",
      },
      {
        category: "HD coolant (NOAT ELC & nitrite-free programs)",
        role: "Separate HD cooling chemistry from automotive bays; verify inhibitor family on PDS",
      },
      {
        category: "ENVIRO / BIO / EAL hydraulics",
        role: "Forestry, marine-adjacent, and sensitive-site circuits when application charts allow",
      },
    ],
    opportunitySignals: [
      "Excavator hydraulics slow or foamy at first shift after overnight cold",
      "Loader pins regreased twice a week with no improvement after rain events",
      "Metal or varnish trending on final-drive drain samples",
      "Two bulk AW drums on site with no ISO VG labels",
      "Customer asking for “the yellow-fluid equivalent” without a tag review",
    ],
    recommendedRepTalkingPoints: [
      "Start with production hours lost last month—which machine class paid the biggest penalty?",
      "Walk compartments before SKUs: main hydraulic, travel, swing, final drive, grease points, engine, coolant—verify each on tags and manuals.",
      "Frame hydraulics as an ISO VG spec conversation backed by analysis, not drum color or fleet habit.",
      "Position grease upgrades only where washout, shock load, or repeat pin failure is documented on the job.",
      "Bundle KLONDIKE hydraulics, grease, gear, engine, and coolant as a system program only where the current PDS supports each fill.",
      "Close every recommendation with: verify requirements on equipment tags, manuals, and current PDS—no implied Caterpillar partnership or approval.",
    ],
    discoveryFocus: [
      "Which three machine classes drive 80% of unplanned downtime this quarter—excavator, loader, or haul truck?",
      "What ISO VG, pump, and compartment tags are on the worst hydraulic circuit right now?",
      "Where did pins, bushings, or final drives fail last—after wash-down, shock load, or wrong grease thickener?",
      "How are bulk hydraulics, grease, gear, engine, and coolant tanks labeled and hose-separated on site?",
      "Is fluid analysis running on hydraulics and final drives—or only engine oil?",
      "Who approves chemistry changes when a new viscosity or grease family is proposed for auto-lube or bulk?",
    ],
    crossSellFocus: [
      "Hydraulic fluids — ISO VG ladder and XVI synthetic step-up",
      "Grease — severe-duty and nano sulfonate programs for pins and final drives",
      "Gear oils — final drive and reducer protection under load",
      "HD engine oils — CK-4 programs on haul and support diesels",
      "Coolants — HD NOAT ELC discipline separate from automotive",
      "ENVIRO / EAL — sensitive-site hydraulic companions",
    ],
    cautions: [
      EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER,
      "Do not state Caterpillar approval unless the exact wording appears on the current PDS for that SKU.",
      "Never assume one hydraulic grade fits main, travel, swing, and auxiliary circuits—verify each compartment tag.",
      "Do not mix incompatible greases or flush chemistry without consultation and tag review.",
    ],
    recommendedProductAnchors: [
      {
        name: "XVI Synthetic Hydraulic Fluids",
        positioning:
          "Premium hydraulic spec conversation when analysis, pump tags, and current PDS support synthetic AW duty.",
      },
      {
        name: "Multi-Viscosity AW & Advanced Formula Hydraulic Fluids",
        positioning: "Seasonal and bulk-fleet ISO VG discipline before synthetic step-up.",
      },
      {
        name: "MOLY TAC / ULTRA TAC / nano Calcium Sulfonate EP Grease",
        positioning: "Shock-loaded pins, bushings, and implements where PDS lists severe mobile duty.",
      },
      {
        name: "Full Synthetic Gear Lubricants",
        positioning: "Final drive and reducer spec conversation when tags and PDS support synthetic EP.",
      },
      {
        name: "CK-4 Full Synthetic & Synthetic Blend Heavy Duty Engine Oils",
        positioning: "Documented API CK-4 category for haul trucks and support diesels per tag and PDS.",
      },
    ],
    recommendedNextStep:
      "Build a compartment map for excavators, loaders, and haul trucks; run a spec conversation on ISO VG, grease points, gear fills, CK-4, and coolant—verify every line against equipment tags, manuals, and current PDS.",
  },
  {
    key: "kubota",
    label: "Kubota Equipment",
    profileTitle: "Kubota Equipment — Opportunity Profile",
    profileSubtitle: "Compact tractors, utility equipment, and seasonal PM conversations.",
    opportunitySummary:
      "Compact and utility Kubota fleets often mix transmission, hydraulic, and wet-brake reservoirs with seasonal PM kits. Anchor trans/hydraulic and tractor-fluid discipline on tags and PDS—do not imply Kubota partnership, endorsement, or approval.",
    commonLubricationConversations: [
      "Trans/hydraulic confusion when one-fluid habits span transmission, hydraulic, and wet-brake sumps.",
      "Seasonal uptime before planting and harvest windows for dealers and owner-operators.",
      "Implement grease neglect on small equipment still seeing shock load and outdoor exposure.",
    ],
    equipmentTypes: [
      "Compact tractors",
      "Utility vehicles",
      "Ride-on mowers",
      "Compact excavators",
      "Generators",
    ],
    typicalFluidCategories: [
      { category: "Universal Red Tractor Fluid", role: "Tractor hydraulic/transmission baseline where tags allow" },
      { category: "AGRIMAX trans-drive programs", role: "Ag-adjacent trans-hydraulic and zinc-free options per PDS" },
      { category: "AW hydraulic fluids", role: "Standalone hydraulic circuits on utility equipment" },
      { category: "Multipurpose grease", role: "Chassis and implement points on compact fleets" },
    ],
    opportunitySignals: [
      "Wet brake chatter on compact tractors",
      "Seasonal fluid changes bundled with filters",
      "Dealer PM kit standardization opportunities",
    ],
    recommendedRepTalkingPoints: [
      "Lead with reservoir map and seasonal PM—trans-drive, hydraulic, engine, and grease—not a single red fluid drum.",
      "Common lubrication conversations for compact duty; verify Kubota fluid guidance on tags and PDS only.",
    ],
    discoveryFocus: [
      "Which models are on the lot this season—tractors, mowers, or compact excavators?",
      "Are transmission, hydraulic, and wet-brake fills documented separately?",
      "What PM kits are sold today—and where is fluid still an afterthought?",
    ],
    crossSellFocus: ["Coolant", "Small engine oils", "Hydraulic AW for standalone circuits", "Filter PM bundles"],
    cautions: [
      EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER,
      "Do not imply Kubota OEM approval beyond PDS application statements.",
    ],
    recommendedProductAnchors: [
      {
        name: "Universal Red Tractor Fluid",
        positioning: "Entry trans/hydraulic conversation—verify wet-brake compatibility on tag and PDS.",
      },
      {
        name: "AGRIMAX Trans Drive Hydraulic Fluid",
        positioning: "Program depth for ag-adjacent Kubota accounts where PDS supports the duty.",
      },
      {
        name: "RED TAC / MOLY TAC grease",
        positioning: "Seasonal PM and chassis protection on compact fleets per PDS.",
      },
    ],
    recommendedNextStep:
      "Standardize seasonal PM: trans/hydraulic, grease, coolant, and engine companions per equipment tag.",
  },
  {
    key: "john_deere_ag",
    label: "John Deere Ag",
    profileTitle: "John Deere Ag Fleet — Seasonal Lubrication Playbook",
    profileSubtitle:
      "Harvest-ready spec conversations: wet brake, trans-drive, engine, grease, and coolant",
    opportunitySummary:
      "Rep playbook for John Deere ag customers: win on reservoir discipline, seasonal PM bundles, and AGRIMAX program depth—always as a spec conversation verified on equipment tags, operator manuals, and the current PDS. Not a Deere endorsement or approval sheet.",
    commonLubricationConversations: [
      "Wet brake chatter: often fluid compatibility in the common sump—not brake hardware alone",
      "Trans-drive confusion: one green or red drum quoted for transmission, hydraulic, and wet-brake compartments",
      "Harvest uptime: combine and tractor reliability when peak-hour fluid PO slips before season",
      "Engine & DEF era: CK-4 category and viscosity discipline on high-hour seasonal diesel",
      "Field grease neglect: PTO, implement, and loader pins still on commodity NLGI habits",
    ],
    equipmentTypes: [
      "Row-crop & utility tractors — trans/hydraulic, wet brake, engine, front axle",
      "Combines & headers — engine, hydrostatic/trans, grain handling auxiliaries",
      "Sprayers & planters — seasonal PM and tank-support hydraulics",
      "Grain carts & wagons — axle, PTO, and support grease points",
      "Skid steers & telehandlers on the farm — standalone AW hydraulic circuits",
      "Support trucks & service pickups — CK-4 and coolant on the same account card",
    ],
    typicalFluidCategories: [
      {
        category: "AGRIMAX trans-drive & zinc-free UTHF",
        role: "Spec conversation for wet-brake and trans-hydraulic sumps—verify tag and PDS before quoting",
      },
      {
        category: "Universal Red Tractor Fluid",
        role: "Baseline UTHF entry where equipment tags and current PDS list compatible duty",
      },
      {
        category: "CK-4 HD engine oils (AGRIMAX synthetic blend & full synthetic)",
        role: "Seasonal diesel protection—API category from tag, not shelf habit",
      },
      {
        category: "Grease (AGRIMAX Poly Tac, RED TAC, MOLY TAC)",
        role: "Chassis, PTO, and implement PM beyond a single dealer grease SKU",
      },
      {
        category: "Coolant (AGRIMAX ELC premix programs)",
        role: "Cooling system discipline bundled with spring and harvest PM",
      },
      {
        category: "AW hydraulic fluids",
        role: "Loaders, telehandlers, and standalone circuits—not assumed for every tractor sump",
      },
    ],
    opportunitySignals: [
      "Wet brake noise or chatter within 50 hours of a fluid change",
      "Dealer PM kit sells filters and engine oil but not trans-drive or grease",
      "Customer paying OEM-fluid premium without tag proof of required spec",
      "Harvest prep starts in two weeks and coolant has not been tested",
      "Grain-cart and wagon bearings failing on the same grease used for chassis",
    ],
    recommendedRepTalkingPoints: [
      "Open with harvest or planting uptime—which reservoir cost them hours last season?",
      "Map every sump before AGRIMAX: transmission, hydraulic, wet brake, engine, axle, coolant—verify on tags and manuals.",
      "Treat wet brake chatter as a spec conversation: fluid category and compatibility, not a brake-bleed default.",
      "Position AGRIMAX as program depth across trans-drive, engine, grease, and coolant—not a single SKU swap.",
      "Bundle seasonal PM with documented PDS lines for each compartment; never imply Deere partnership or approval.",
      "Close with: verify John Deere fluid requirements on equipment tags, manuals, and current PDS for every fill discussed.",
    ],
    discoveryFocus: [
      "Which John Deere models drive your seasonal PM volume—tractor, combine, or sprayer?",
      "What fluid types do tags call for in transmission, hydraulic, and wet-brake compartments on your worst chatter unit?",
      "Where did wet brake noise show up—after dealer service, customer top-off, or bulk change?",
      "What is in today’s harvest PM bundle beyond engine oil and filters?",
      "Are zinc-free and standard trans-drive SKUs separated on the shelf and work orders?",
      "Who signs off when chemistry changes on a brand-loyal account still buying OEM jugs?",
    ],
    crossSellFocus: [
      "AGRIMAX trans-drive — UTHF and zinc-free spec conversations",
      "AGRIMAX engine oils — CK-4 seasonal diesel programs",
      "AGRIMAX grease — field, PTO, and chassis PM completion",
      "AGRIMAX coolant — ELC premix with harvest and planting bundles",
      "Hydraulic AW — loaders, telehandlers, and support iron",
      "Universal Red Tractor Fluid — entry UTHF where tags and PDS allow",
    ],
    cautions: [
      EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER,
      "Do not claim John Deere or CNH approval unless the current PDS states it for that exact product.",
      "UTHF, wet-brake, and standalone hydraulic circuits are not interchangeable—verify each tag.",
      "Do not promise OEM-equivalent performance—run a spec conversation against tags, manuals, and PDS only.",
    ],
    recommendedProductAnchors: [
      {
        name: "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
        positioning:
          "Zinc-free trans-drive spec conversation when tags, manuals, and current PDS require zinc-free chemistry.",
      },
      {
        name: "AGRIMAX Trans Drive Hydraulic Fluid",
        positioning: "Program anchor for trans-hydraulic sumps where PDS lists compatible ag duty.",
      },
      {
        name: "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend",
        positioning: "High-hour seasonal diesel engine program with documented API CK-4 on PDS.",
      },
      {
        name: "AGRIMAX Poly Tac / RED TAC / MOLY TAC",
        positioning: "Seasonal grease PM for chassis, PTO, and implements per PDS application lists.",
      },
      {
        name: "AGRIMAX Extended Life Coolant (premix programs)",
        positioning: "Cooling companion on planting and harvest bundles where PDS supports ELC duty.",
      },
    ],
    recommendedNextStep:
      "Draw a reservoir map for tractors and combines; run AGRIMAX spec conversations compartment by compartment—verify every recommendation on equipment tags, manuals, and current PDS before harvest.",
  },
  {
    key: "volvo_ce",
    label: "Volvo CE",
    profileTitle: "Volvo CE — Opportunity Profile",
    profileSubtitle: "Wheel loaders, excavators, and severe-duty service programs.",
    opportunitySummary:
      "Construction yards with Volvo CE loaders and excavators often need hydraulic reliability, severe-duty grease, and drivetrain program discipline. Tie common lubrication conversations to tags and PDS—do not imply Volvo CE partnership, endorsement, or approval.",
    commonLubricationConversations: [
      "Hydraulic reliability on load-sensing systems sensitive to viscosity and contamination.",
      "Pin and bushing wear on loaders and excavators under shock and outdoor exposure.",
      "Fleet availability pressure on municipal and contractor mixed-brand yards.",
    ],
    equipmentTypes: [
      "Wheel loaders",
      "Excavators",
      "Articulated haulers",
      "Compaction equipment",
    ],
    typicalFluidCategories: [
      { category: "AW / MV hydraulics", role: "ISO VG discipline on mobile circuits" },
      { category: "Severe-duty grease", role: "Loader pins and implement joints" },
      { category: "Gear oils", role: "Drivetrain and axle programs" },
      { category: "CK-4 engine oils", role: "Highway and off-road support diesels" },
    ],
    opportunitySignals: [
      "Hydraulic varnishing or heat on loaders",
      "Grease washout on wet municipal routes",
      "Mixed Volvo and other-brand fleets on one yard",
    ],
    recommendedRepTalkingPoints: [
      "Lead with hydraulic reliability and pin life on loaders and excavators.",
      "Do not imply Volvo CE approval—verify requirements on tags and PDS.",
    ],
    discoveryFocus: [
      "Which Volvo classes dominate hours—loaders, excavators, or haulers?",
      "What hydraulic ISO VG tags are on the worst-performing circuits?",
      "Where is grease failure showing up after wash-down?",
    ],
    crossSellFocus: ["Coolant", "Coolant flush chemicals", "Industrial specialty for plant yards"],
    cautions: [EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER],
    recommendedProductAnchors: [
      {
        name: "Multi-Viscosity AW Hydraulic Fluids",
        positioning: "Seasonal and temperature swing on mixed construction fleets per PDS.",
      },
      {
        name: "MOLY TAC HD 5% / ULTRA TAC",
        positioning: "Severe-duty grease on pins and loaders where PDS supports the duty.",
      },
      {
        name: "Full Synthetic Gear Lubricants",
        positioning: "Drivetrain step-up where tags and PDS support synthetic.",
      },
    ],
    recommendedNextStep:
      "Document ISO VG, grease map, and drivetrain fills per Volvo class; align to current PDS.",
  },
  {
    key: "international",
    label: "International Truck",
    profileTitle: "International Truck Fleet — Service Bay Playbook",
    profileSubtitle:
      "CK-4 / FA-4, HD coolant, driveline, and vocational spec conversations for highway and fleet bays",
    opportunitySummary:
      "Rep playbook for International and Navistar-badged highway and vocational fleets: lead with API category discipline, HD coolant separation, and driveline spec conversations in the service lane—verified on VIN tags, operator manuals, and the current PDS. Not an International endorsement or approval sheet.",
    commonLubricationConversations: [
      "Engine programs: CK-4 vs FA-4 confusion on newer tractors and emissions-sensitive drain intervals",
      "Coolant chaos: HD NOAT ELC, OAT, and universal green top-offs sharing hoses in the same bay",
      "Driveline: transmission, differential, and PTO reservoirs treated as interchangeable 80W-90 habits",
      "Vocational hydraulics: PTO and hoist circuits filled from the main AW bulk tank",
      "Chassis & fifth wheel: grease programs skipped when the lane sells engine oil only",
    ],
    equipmentTypes: [
      "Class 8 LT / RH highway tractors — engine, aftertreatment, coolant, trans, drives",
      "HV / HX vocational — dump, mixer, and municipal chassis with PTO hydraulics",
      "MV medium-duty — delivery and service routes with shared shop bulk",
      "Fleet service bays — bulk CK-4, coolant, ATF, and gear drums on one lane card",
      "Trailers & dollies on the account — hub oil and fifth-wheel grease discipline",
      "Owner-operator pickups tied to the fleet — avoid light-duty chemistry in HD bulk",
    ],
    typicalFluidCategories: [
      {
        category: "CK-4 & FA-4 HD engine oils (synthetic blend & full synthetic)",
        role: "API category and viscosity from VIN/tag—spec conversation before premium upgrade",
      },
      {
        category: "HD coolant (Red Heavy Duty NOAT ELC, Gold OAT ELC, Commercial HD NOAT)",
        role: "Match inhibitor family to wet-sleeve tag—Gold OAT ELC is nitrite-free mixed-fleet per PDS; Red NOAT ELC for classic HD NOAT diesel programs",
      },
      {
        category: "Transmission & driveline (ATF, Commercial Gear Lubricants)",
        role: "Spec-correct trans and axle fills—verify builder tag per compartment",
      },
      {
        category: "Chassis grease (MOLY TAC, Fifth Wheel Grease, HD TAC)",
        role: "Fifth wheel, kingpin, and vocational joint PM in the lane bundle",
      },
      {
        category: "Hydraulic AW fluids",
        role: "PTO, hoist, and vocational aux circuits—not assumed from engine bulk",
      },
      {
        category: "Power steering, brake & shop fluids",
        role: "Complete lane chemistry where PDS lists DOT and steering applications",
      },
    ],
    opportunitySignals: [
      "Fleet manager unsure whether 2022+ tractors should be FA-4 or CK-4",
      "Coolant gel or inhibitor fallout after roadside universal green top-off",
      "Transmission comeback after “standard gear oil” in an automated box",
      "PTO hoist slow after AW from the wrong bulk drum",
      "Service lane sells CK-4 but not HD coolant or chassis grease on the work order",
    ],
    recommendedRepTalkingPoints: [
      "Start with fleet card and worst comeback—engine, coolant, trans, or PTO—not brand default fluid.",
      "Run CK-4 / FA-4 as an API spec conversation: model year, emissions hardware, and tag language first.",
      "Separate HD coolant inhibitor families on the bulk chart—verify on tags, manuals, and current PDS.",
      "Walk driveline compartments individually: transmission, inter-axle, differential, PTO—no interchangeable fills.",
      "Bundle KLONDIKE engine, coolant, driveline, grease, and vocational hydraulics as a lane program where PDS supports each line.",
      "Close every recommendation with: verify International / Navistar requirements on equipment tags, manuals, and current PDS—no implied OEM approval.",
    ],
    discoveryFocus: [
      "What International model years and engine families are on the fleet card today?",
      "Which units are FA-4 candidates vs CK-4—and who made the last bulk decision?",
      "How are HD coolant bulk tanks labeled versus automotive OAT in the same building?",
      "What transmission and axle tags are on the unit that failed last month?",
      "Where do PTO and hoist circuits get fluid today—the AW bulk or a tagged auxiliary fill?",
      "What is missing from the standard service lane bundle—coolant, grease, ATF, or brake fluid?",
    ],
    crossSellFocus: [
      "HD engine oils — CK-4 / FA-4 synthetic blend and full synthetic programs",
      "HD coolant — NOAT ELC and OAT programs by inhibitor family",
      "Transmission & gear — Commercial Gear and spec ATF conversations",
      "Grease — fifth wheel, chassis, and vocational joint PM",
      "Hydraulic AW — PTO and hoist circuits on vocational units",
      "Brake & steering fluids — DOT and power steering completion in the lane",
    ],
    cautions: [
      EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER,
      "Do not state Navistar or International approval unless the current PDS uses that exact language for the SKU.",
      "FA-4 is not a blanket upgrade—verify engine tag, emissions generation, and PDS before recommending.",
      "Never use automotive coolant shorthand for HD NOAT programs—match inhibitor family to tag and PDS.",
    ],
    recommendedProductAnchors: [
      {
        name: "SAE 5W-40 & 15W-40 Full Synthetic CK-4",
        positioning:
          "Premium fleet engine spec conversation when analysis, drain interval, and PDS support synthetic CK-4.",
      },
      {
        name: "Synthetic Blend CK-4 Heavy Duty Engine Oils",
        positioning: "Lane baseline and upgrade path with documented API category on PDS.",
      },
      {
        name: "Red Heavy Duty NOAT ELC & Gold OAT ELC",
        positioning: "HD coolant spec conversation—match inhibitor family to wet-sleeve tag and current PDS.",
      },
      {
        name: "Commercial Gear Lubricants & Transmission Fluids",
        positioning: "Driveline fills per axle and trans builder tag where PDS lists the application.",
      },
      {
        name: "MOLY TAC / Fifth Wheel Grease",
        positioning: "Chassis and fifth-wheel PM bundled with engine and coolant lane programs.",
      },
    ],
    recommendedNextStep:
      "Build an International fleet lane map: engine API category, coolant inhibitor family, transmission, differentials, PTO hydraulics, and chassis grease—verify each line on equipment tags, manuals, and current PDS before the next PM wave.",
  },
  {
    key: "western_star",
    label: "Western Star",
    profileTitle: "Western Star — Opportunity Profile",
    profileSubtitle: "Severe-duty vocational highway programs and service bay depth.",
    opportunitySummary:
      "Western Star vocational and logging fleets mirror Class 8 fluid discipline: CK-4 programs, HD coolant, driveline, and chassis grease in the service bay. Verify Western Star fluid guidance on tags and PDS—no implied OEM partnership or approval.",
    commonLubricationConversations: [
      "Severe vocational duty on logging, dump, and heavy-haul routes stressing engines and drivetrains.",
      "PTO and hoist circuits topped with main-tank AW instead of tag-correct hydraulics.",
      "Roadside reliability when coolant and engine PO discipline slips before winter haul.",
    ],
    equipmentTypes: ["Western Star tractors", "Logging trucks", "Dump and vocational chassis"],
    typicalFluidCategories: [
      { category: "CK-4 full synthetic", role: "Severe-duty drain and soot management per PDS" },
      { category: "HD coolant programs", role: "NOAT ELC for diesel wet sleeve where specified" },
      { category: "Gear and trans fluids", role: "Driveline spec correctness" },
      { category: "HD chassis grease", role: "Fifth wheel and vocational joints" },
    ],
    opportunitySignals: [
      "Short drain intervals on logging haul",
      "Coolant top-off with universal green",
      "PTO hydraulic using wrong AW grade",
    ],
    recommendedRepTalkingPoints: [
      "Start with worst vocational comeback—engine, coolant gel, trans, or PTO hoist—not brand-default fluid.",
      "Position severe-duty CK-4 and HD coolant as a lane system with driveline and chassis grease—not single-SKU price plays.",
      "Walk PTO and hoist circuits separately from engine bulk—ISO VG and AW category from tag and PDS.",
      "Verify Western Star fluid guidance on tags and manuals; no implied OEM partnership or approval.",
    ],
    discoveryFocus: [
      "What vocational applications dominate—logging, dump, or long haul?",
      "Where are coolant and engine bulk tanks shared with light-duty?",
      "Which PTO and hoist circuits need ISO VG review?",
    ],
    crossSellFocus: ["Brake and steering fluids", "Hydraulic AW for PTO", "Gear oil depth"],
    cautions: [EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER],
    recommendedProductAnchors: [
      {
        name: "SAE 5W-40 Full Synthetic CK-4",
        positioning: "Premium severe-duty engine positioning where PDS supports the duty.",
      },
      {
        name: "Commercial HD NOAT ELC Coolant",
        positioning: "HD cooling baseline for diesel programs per PDS.",
      },
      {
        name: "MOLY TAC / HD TAC grease",
        positioning: "Vocational chassis and fifth wheel where PDS lists the application.",
      },
    ],
    recommendedNextStep:
      "Build vocational bay map: engine, coolant, trans/driveline, PTO hydraulics, chassis grease.",
  },
  {
    key: "case_ih_ag",
    label: "Case IH Ag",
    profileTitle: "Case IH Ag — Opportunity Profile",
    profileSubtitle: "Trans-drive, seasonal PM, and full-line AGRIMAX opportunities.",
    opportunitySummary:
      "Case IH ag accounts often need trans-drive discipline, zinc-free options where required, and dealer PM bundling. Use spec conversations only where PDS supports CNH/Case IH duty—do not imply Case IH or CNH partnership, endorsement, or approval.",
    commonLubricationConversations: [
      "Multi-reservoir confusion when transmission, hydraulic, and brake packs share shelf space.",
      "OEM-fluid premium habits without documented spec match on tags.",
      "Seasonal peaks compressing planting and harvest service capacity.",
    ],
    equipmentTypes: ["Case IH tractors", "Combines", "Sprayers", "Magnum / Maxxum lines"],
    typicalFluidCategories: [
      { category: "AGRIMAX trans-drive", role: "UTHF programs per PDS application lists" },
      { category: "Zinc-free trans-drive", role: "Where tags require zinc-free chemistry" },
      { category: "CK-4 engine", role: "Seasonal diesel protection" },
      { category: "Grease and coolant", role: "PM bundle completion" },
    ],
    opportunitySignals: [
      "One red tractor fluid quoted for every compartment",
      "Incomplete dealer PM SKUs",
      "Wet brake issues after generic UTHF",
    ],
    recommendedRepTalkingPoints: [
      "Map Case IH reservoirs before quoting; use AGRIMAX as program depth, not a single SKU.",
      "CNH/Case IH spec language only where PDS documents support—no OEM endorsement implied.",
    ],
    discoveryFocus: [
      "Which Case IH models drive seasonal PM volume?",
      "Are zinc-free and standard trans-drive SKUs separated on the shelf?",
      "What is missing from harvest and planting fluid bundles?",
    ],
    crossSellFocus: ["Grease upgrades", "HD engine on support trucks", "Hydraulic AW on grain carts"],
    cautions: [
      EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER,
      "Do not claim Case IH/CNH approval unless on the PDS for that product.",
    ],
    recommendedProductAnchors: [
      {
        name: "AGRIMAX Trans Drive Hydraulic Fluid",
        positioning: "Anchor trans-hydraulic program conversation where PDS supports the duty.",
      },
      {
        name: "AGRIMAX Zinc Free Trans Drive",
        positioning: "Spec upgrade where tags require zinc-free per PDS.",
      },
      {
        name: "AGRIMAX Extended Life Coolant programs",
        positioning: "Cooling companion on seasonal PM per PDS.",
      },
    ],
    recommendedNextStep: "Standardize AGRIMAX by reservoir on Case IH dealer PM visits.",
  },
  {
    key: "new_holland_ag",
    label: "New Holland Ag",
    profileTitle: "New Holland Ag — Opportunity Profile",
    profileSubtitle: "Utility tractors, hay and forage, and trans-fluid program opportunities.",
    opportunitySummary:
      "New Holland ag and hay operations need trans/hydraulic clarity, seasonal grease PM, and engine/coolant companions. Verify CNH/New Holland duty on tags and PDS—no implied partnership, endorsement, or approval.",
    commonLubricationConversations: [
      "Trans-hydraulic habits on utility and hay fleets mixing fluids across compartments.",
      "Baler and forage wear when grease PM slips on high-hour hay equipment.",
      "Short seasonal windows when hay and forage downtime hits peak weather.",
    ],
    equipmentTypes: ["Utility tractors", "Balers", "Forage harvesters", "Telehandlers", "Skid steers"],
    typicalFluidCategories: [
      { category: "Tractor / UTHF fluids", role: "Wet brake and trans-hydraulic discipline" },
      { category: "AW hydraulics", role: "Loader and telehandler circuits" },
      { category: "Multipurpose grease", role: "Field and baler PM" },
      { category: "CK-4 diesel", role: "Supporting diesel assets" },
    ],
    opportunitySignals: [
      "Telehandler hydraulics on wrong AW grade",
      "Baler bearing failures after marginal grease",
      "Seasonal PM not bundled across fluids",
    ],
    recommendedRepTalkingPoints: [
      "Lead with hay season PM and trans-fluid map—common lubrication conversations, not OEM branding.",
      "Verify New Holland fluid types on equipment tags; PDS governs every recommendation.",
    ],
    discoveryFocus: [
      "What mix of tractors, balers, and telehandlers is on the account?",
      "Where are wet brake or hydraulic complaints showing up?",
      "How complete is the spring and hay-season PM bundle?",
    ],
    crossSellFocus: ["Coolant", "Skid-steer hydraulic AW", "Gear oil on telehandlers"],
    cautions: [EQUIPMENT_OPPORTUNITY_PROFILE_DISCLAIMER],
    recommendedProductAnchors: [
      {
        name: "Universal Red Tractor Fluid",
        positioning: "Baseline tractor conversation with tag and PDS verification.",
      },
      {
        name: "AGRIMAX Trans Drive Hydraulic Fluid",
        positioning: "Program depth on New Holland ag accounts where PDS supports the duty.",
      },
      {
        name: "RED TAC / MOLY TAC",
        positioning: "Field grease and implement PM per PDS.",
      },
    ],
    recommendedNextStep:
      "Bundle trans-drive, grease, engine, and coolant for New Holland seasonal PM.",
  },
];

/** @type {Readonly<Record<string, EquipmentOpportunityProfile>>} */
export const EQUIPMENT_OPPORTUNITY_PROFILE_MAP = Object.freeze(
  EQUIPMENT_OPPORTUNITY_PROFILE_LIST.reduce((acc, entry) => {
    acc[entry.key] = entry;
    return acc;
  }, /** @type {Record<string, EquipmentOpportunityProfile>} */ ({}))
);

export const EQUIPMENT_OPPORTUNITY_PROFILES = Object.freeze([...EQUIPMENT_OPPORTUNITY_PROFILE_LIST]);

const KEY_ALIASES = Object.freeze({
  cat: "cat",
  caterpillar: "cat",
  cat_equipment: "cat",
  kubota: "kubota",
  kubota_equipment: "kubota",
  john_deere_ag: "john_deere_ag",
  john_deere: "john_deere_ag",
  deere: "john_deere_ag",
  deere_ag: "john_deere_ag",
  jd_ag: "john_deere_ag",
  volvo_ce: "volvo_ce",
  volvo: "volvo_ce",
  international: "international",
  international_truck: "international",
  navistar: "international",
  western_star: "western_star",
  westernstar: "western_star",
  case_ih_ag: "case_ih_ag",
  case_ih: "case_ih_ag",
  caseih: "case_ih_ag",
  new_holland_ag: "new_holland_ag",
  new_holland: "new_holland_ag",
  newholland: "new_holland_ag",
});

/**
 * @param {unknown} input
 * @returns {string}
 */
export function normalizeEquipmentProfileKey(input) {
  if (input === null || input === undefined) return "";
  const compact = String(input).trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (!compact) return "";
  return KEY_ALIASES[compact] || compact;
}

/**
 * @param {unknown} key
 * @returns {EquipmentOpportunityProfile | null}
 */
export function getEquipmentOpportunityProfile(key) {
  const normalized = normalizeEquipmentProfileKey(key);
  if (!normalized) return null;
  return EQUIPMENT_OPPORTUNITY_PROFILE_MAP[normalized] || null;
}

/**
 * @returns {EquipmentOpportunityProfile[]}
 */
export function listEquipmentOpportunityProfiles() {
  return [...EQUIPMENT_OPPORTUNITY_PROFILES];
}
