/**
 * CustomerProfileSellSheet — standalone customer / industry playbook sell sheet.
 * Layout id: customer-profile-sell-sheet-v6b1
 * Not wired into App.js yet.
 */

import React from "react";
import {
  getCustomerProfileById,
  mapCustomerProfileToSellSheetProps,
} from "../data/salesEnablement/customerProfiles";
import { getEquipmentOpportunityProfile } from "../data/salesEnablement/equipmentOpportunityProfiles.js";
import { OEM_SPEC_VERIFY_LINE } from "../data/salesEnablement/oemSpecMappings.js";
import { KLONDIKE_GUARANTEE_LINES } from "../data/salesEnablement/categoryProgramIntelligence.js";
import CustomerProfileEquipmentInfographic, {
  resolveInfographicProfileKey,
} from "./customerProfileVisuals/CustomerProfileEquipmentInfographic.js";

export const CUSTOMER_PROFILE_SELL_SHEET_LAYOUT_ID = "customer-profile-sell-sheet-v7f14";
export const OEM_OPPORTUNITY_PROFILE_VERSION = 1;

const OEM_PROFILE_DISCLAIMER =
  "OEM opportunity profile for rep enablement only—not an OEM endorsement, partnership, or approval. Verify all requirements using equipment tags, operator manuals, and the current PDS before any spec conversation or recommendation.";

const OEM_SELL_SHEET_BADGE = "OEM OPPORTUNITY PROFILE";

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
  profileTitle: "Mining & Aggregate Customer Profile",
  profileSubtitle: "Severe-duty lubrication opportunities in high-load, dirty, wet, and abrasive environments.",
  profileSummary:
    "Use this playbook to align field conversations with what mining and aggregate operators actually fight: shock load, contamination, washout, and unplanned downtime—not SKU lists alone.",
  industryImageUrl: "",
  customerPainPoints: [
    { iconKey: "shock", label: "Shock load", sub: "Pins, bushings, and slow-speed bearings see impact before steady wear." },
    { iconKey: "contamination", label: "Contamination", sub: "Dust, fines, and water ingress challenge every circuit and lube point." },
    { iconKey: "washout", label: "Washout", sub: "Outdoor duty and wash-down strip commodity chemistry off critical joints." },
    { iconKey: "bearing", label: "Bearing failure", sub: "Repeat failures on conveyors and screen plants erode PM confidence." },
    { iconKey: "hydraulic", label: "Hydraulic reliability", sub: "Heat, foam, and slow response show up before filters trend bad." },
    { iconKey: "downtime", label: "Downtime", sub: "Every hour off-peak costs production targets and dealer trust." },
  ],
  equipmentTypes: [
    "Crushers",
    "Conveyors",
    "Loaders",
    "Haul trucks",
    "Excavators",
    "Screen plants",
  ],
  likelyLubricantNeeds: [
    { category: "Calcium sulfonate grease", role: "EP protection for wet, shock-loaded pins and bushings" },
    { category: "Hydraulic fluids", role: "Circuit reliability across temperature and contamination" },
    { category: "Gear oils", role: "Drivetrain and reducer protection under load" },
    { category: "Heavy duty engine oils", role: "Haul truck and mobile power unit programs" },
    { category: "Coolants", role: "Fleet cooling system discipline in dusty duty" },
    { category: "Open gear / industrial lubricants", role: "Large open gearing and specialty plant assets" },
  ],
  recommendedProducts: [
    {
      name: "KLONDIKE nano Calcium Sulfonate EP Grease",
      why: "Upgrade path when commodity grease washes out on pins, bushings, and slow-speed bearings.",
    },
    {
      name: "AW & MV Hydraulic Fluids",
      why: "Anchor mixed-fleet hydraulic conversations to ISO VG discipline and circuit evidence.",
    },
    {
      name: "Industrial EP Gear Lubricants",
      why: "Support crushers, conveyors, and reducers under sustained load.",
    },
    {
      name: "CK-4 Heavy Duty Engine Oils",
      why: "Protect haul trucks and support equipment power units in severe service.",
    },
  ],
  opportunitySignals: [
    "Unplanned stops on conveyors or screen plants",
    "Grease failure after wash-down or blast exposure",
    "Hydraulic heat or slow response at shift start",
    "Mixed bulk and packaged top-off behavior in the yard",
  ],
  repTalkTrack: [
    "Lead with downtime and contamination before discussing product tier or brand swap.",
    "Position grease and hydraulic upgrades where washout and shock load are documented—not assumed.",
    "Tie recommendations to equipment type and relube discipline, not shelf habit.",
    "Frame Klondike as a system program across grease, hydraulics, gears, and engines.",
  ],
  discoveryQuestions: [
    "Which assets drive your worst unplanned downtime this quarter?",
    "Where are you seeing grease washout, bearing heat, or repeat pin failures?",
    "What hydraulic circuits show foam, heat, or slow response first thing in the morning?",
    "How are bulk tanks and packaged top-offs aligned across the site?",
    "Who signs off on chemistry changes for centralized lube systems?",
  ],
  crossSell: [
    "Filtration & breathers",
    "Gear oils",
    "Heavy duty engine oils",
    "Coolants",
    "Industrial circulating oils",
  ],
  cautions: [
    "Confirm OEM and component builder guidance before changing viscosity or chemistry.",
    "Do not mix incompatible greases or fluids without flush and consultation.",
    "Match food-grade or EAL requirements only where the application demands it.",
    "See product data sheets for each SKU discussed in the field.",
  ],
  recommendedNextStep:
    "Build a field conversation around downtime, washout, hydraulic reliability, and component protection.",
};

/** Temporary OEM/equipment opportunity profile presets (preview / enablement; not OEM endorsement). */
export const OEM_OPPORTUNITY_PROFILE_PRESETS = {
  cat: {
    key: "cat",
    label: "CAT Equipment",
    profileTitle: "CAT Equipment — Opportunity Profile",
    profileSubtitle: "Common lubrication conversations for excavators, loaders, and haul trucks.",
    profileSummary: `${OEM_PROFILE_DISCLAIMER} Focus on hydraulic reliability, final drives, severe-duty grease, and mixed-fleet HD engine programs where PDS supports the duty.`,
    customerPainPoints: [
      { iconKey: "hydraulic", label: "Hydraulic heat & slow response", sub: "Large excavator and loader circuits under load and contamination pressure." },
      { iconKey: "shock", label: "Final drive & pin wear", sub: "High-load undercarriage and implement joints need disciplined grease programs." },
      { iconKey: "downtime", label: "Production hour loss", sub: "Unplanned stops on loaders and haul trucks drive premium fluid conversations." },
      { iconKey: "contamination", label: "Dust and fines", sub: "Bulk and packaged top-off discipline on busy earthmoving sites." },
    ],
    equipmentTypes: ["Hydraulic excavators", "Wheel loaders", "Off-highway haul trucks", "Dozers", "Motor graders", "Support equipment"],
    likelyLubricantNeeds: [
      { category: "AW / MV hydraulic fluids", role: "ISO VG-matched pump protection and seasonal coverage" },
      { category: "Severe-duty grease", role: "Pins, bushings, and final drives—moly and nano tiers where PDS supports" },
      { category: "Final drive & gear oils", role: "Drivetrain fills per tag and compartment" },
      { category: "CK-4 HD engine oils", role: "Mixed-fleet diesel programs on support and haul assets" },
      { category: "Coolants", role: "HD NOAT / nitrite-free programs separate from automotive bays" },
    ],
    recommendedProducts: [
      { name: "XVI Synthetic Hydraulic Fluids", why: "Premium hydraulic upgrade where analysis and duty support synthetic." },
      { name: "MOLY TAC / ULTRA TAC grease programs", why: "Shock-loaded pins and implements on severe earthmoving duty." },
      { name: "Full Synthetic Gear Lubricants", why: "Final drive and reducer protection under sustained load." },
      { name: "CK-4 Full Synthetic Heavy Duty Engine Oils", why: "Haul truck and support diesel programs with documented API category." },
    ],
    opportunitySignals: [
      "Hydraulic slow response or foam at shift start on excavators",
      "Repeat pin and bushing regreases after wet shifts",
      "Final drive complaints or metal in drain samples",
      "Mixed bulk tanks without ISO VG labeling discipline",
    ],
    repTalkTrack: [
      "Open with production hours and worst circuits—hydraulics, final drives, or pins—not brand habit.",
      "Use common lubrication conversations tied to tags and PDS; do not imply Caterpillar partnership or approval.",
      "Position Klondike as a system program across hydraulics, grease, gear, engine, and coolant where documented.",
    ],
    discoveryQuestions: [
      "Which machine classes drive your worst downtime—excavators, loaders, or haul trucks?",
      "What ISO VG and compartment tags are on the hydraulics you need running this week?",
      "Where are pins, final drives, or bushings failing after wash-down or shock load?",
      "How are bulk hydraulics, grease, and engine oil separated on site?",
    ],
    crossSell: ["Filtration & breathers", "Coolant programs", "Industrial gear & open gear", "ENVIRO / EAL on sensitive sites"],
    cautions: [
      OEM_PROFILE_DISCLAIMER,
      "Do not claim Caterpillar approval unless the exact wording appears on the PDS for that SKU.",
      "Separate hydraulic, final drive, grease, and engine compartments—confirm each fill on tags.",
    ],
    recommendedNextStep:
      "Map excavator, loader, and haul-truck reservoirs; align ISO VG, grease points, and CK-4 programs to current PDS.",
  },
  kubota: {
    key: "kubota",
    label: "Kubota Equipment",
    profileTitle: "Kubota Equipment — Opportunity Profile",
    profileSubtitle: "Compact tractors, utility equipment, and seasonal PM conversations.",
    profileSummary: `${OEM_PROFILE_DISCLAIMER} Anchor trans/hydraulic and tractor fluid discipline on compact and utility equipment—PM kits and seasonal maintenance drive category depth.`,
    customerPainPoints: [
      { iconKey: "hydraulic", label: "Trans/hydraulic confusion", sub: "One-fluid habits across transmission, hydraulic, and wet-brake reservoirs." },
      { iconKey: "downtime", label: "Seasonal uptime", sub: "Dealers and owners need reliable programs before planting and harvest windows." },
      { iconKey: "bearing", label: "Implement grease neglect", sub: "Small equipment still sees shock load and outdoor exposure." },
    ],
    equipmentTypes: ["Compact tractors", "Utility vehicles", "Ride-on mowers", "Compact excavators", "Generators"],
    likelyLubricantNeeds: [
      { category: "Universal Red Tractor Fluid", role: "Tractor hydraulic/transmission baseline where tags allow" },
      { category: "AGRIMAX trans-drive programs", role: "Ag-adjacent trans-hydraulic and zinc-free options per PDS" },
      { category: "AW hydraulic fluids", role: "Standalone hydraulic circuits on utility equipment" },
      { category: "Multipurpose grease", role: "Chassis and implement points on compact fleets" },
    ],
    recommendedProducts: [
      { name: "Universal Red Tractor Fluid", why: "Entry trans/hydraulic conversation—verify wet-brake compatibility on tag." },
      { name: "AGRIMAX Trans Drive Hydraulic Fluid", why: "Program depth for ag-adjacent Kubota accounts." },
      { name: "RED TAC / MOLY TAC grease", why: "Seasonal PM and chassis protection on compact fleets." },
    ],
    opportunitySignals: ["Wet brake chatter on compact tractors", "Seasonal fluid changes bundled with filters", "Dealer PM kit standardization opportunities"],
    repTalkTrack: [
      "Lead with reservoir map and seasonal PM—trans-drive, hydraulic, engine, and grease—not a single red fluid drum.",
      "Common lubrication conversations for compact duty; verify Kubota fluid guidance on tags and PDS only.",
    ],
    discoveryQuestions: [
      "Which models are on the lot this season—tractors, mowers, or compact excavators?",
      "Are transmission, hydraulic, and wet-brake fills documented separately?",
      "What PM kits do you sell today—and where is fluid still an afterthought?",
    ],
    crossSell: ["Coolant", "Small engine oils", "Hydraulic AW for standalone circuits", "Filter PM bundles"],
    cautions: [OEM_PROFILE_DISCLAIMER, "Do not imply Kubota OEM approval beyond PDS application statements."],
    recommendedNextStep: "Standardize seasonal PM: trans/hydraulic, grease, coolant, and engine companions per equipment tag.",
  },
  john_deere_ag: {
    key: "john_deere_ag",
    label: "John Deere Ag",
    profileTitle: "John Deere Ag — Opportunity Profile",
    profileSubtitle: "Wet brake, trans-drive, harvest PM, and AGRIMAX program opportunities.",
    profileSummary: `${OEM_PROFILE_DISCLAIMER} Use spec-aligned AGRIMAX and trans-drive conversations for brand-loyal ag customers—wet brake chatter, seasonal uptime, and harvest PM are the opening hooks.`,
    customerPainPoints: [
      { iconKey: "shock", label: "Wet brake chatter", sub: "Often fluid compatibility—not brake hardware alone." },
      { iconKey: "downtime", label: "Harvest uptime", sub: "Peak-hour reliability on combines and tractors." },
      { iconKey: "retention", label: "Brand loyalty premium", sub: "Customers paying OEM fluid prices without spec proof." },
    ],
    equipmentTypes: ["Tractors", "Combines", "Sprayers", "Planters", "Grain carts", "Support trucks"],
    likelyLubricantNeeds: [
      { category: "AGRIMAX trans-drive / zinc-free", role: "UTHF programs where PDS lists Deere-relevant duty" },
      { category: "CK-4 engine oils", role: "Seasonal diesel engine protection" },
      { category: "Grease programs", role: "Field and chassis PM beyond a single Poly Tac habit" },
      { category: "Coolant", role: "ELC discipline on ag fleets" },
    ],
    recommendedProducts: [
      { name: "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid", why: "Zinc-free trans-drive where equipment tags require it." },
      { name: "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend", why: "Engine program on high-hour seasonal diesel." },
      { name: "AGRIMAX Poly Tac / RED TAC companions", why: "Complete seasonal PM story." },
    ],
    opportunitySignals: ["Wet brake noise after fluid service", "Dealer still quoting one OEM green fluid for every reservoir", "Harvest prep fluid bundles incomplete"],
    repTalkTrack: [
      "Talk wet brake chatter, trans-drive compatibility, and harvest PM—not OEM branding.",
      "AGRIMAX is a spec conversation category: verify John Deere fluid guidance on tags and PDS only.",
      "Never imply Deere partnership, endorsement, or approval beyond documented PDS language.",
    ],
    discoveryQuestions: [
      "Which reservoirs are you standardizing this season?",
      "Where is wet brake chatter showing up after fluid changes?",
      "What does your harvest PM bundle include beyond engine oil?",
    ],
    crossSell: ["Coolant ELC", "Hydraulic AW on supporting assets", "Grease upgrades on high-load pins"],
    cautions: [OEM_PROFILE_DISCLAIMER, "JD/CNH positioning only where PDS and equipment tags support—no implied OEM endorsement."],
    recommendedNextStep: "Map AGRIMAX line by reservoir; bundle engine, trans-drive, grease, and coolant on seasonal PM.",
  },
  volvo_ce: {
    key: "volvo_ce",
    label: "Volvo CE",
    profileTitle: "Volvo CE — Opportunity Profile",
    profileSubtitle: "Wheel loaders, excavators, and severe-duty service programs.",
    profileSummary: `${OEM_PROFILE_DISCLAIMER} Position hydraulic reliability, severe-duty grease, and drivetrain programs for construction equipment yards—common lubrication conversations tied to tags, not color habits.`,
    customerPainPoints: [
      { iconKey: "hydraulic", label: "Hydraulic reliability", sub: "Load-sensing systems sensitive to viscosity and contamination." },
      { iconKey: "shock", label: "Pin and bushing wear", sub: "Loaders and excavators under shock and outdoor exposure." },
      { iconKey: "downtime", label: "Fleet availability", sub: "Municipal and contractor fleets need predictable PM." },
    ],
    equipmentTypes: ["Wheel loaders", "Excavators", "Articulated haulers", "Compaction equipment"],
    likelyLubricantNeeds: [
      { category: "AW / MV hydraulics", role: "ISO VG discipline on mobile circuits" },
      { category: "Severe-duty grease", role: "Loader pins and implement joints" },
      { category: "Gear oils", role: "Drivetrain and axle programs" },
      { category: "CK-4 engine oils", role: "Highway and off-road support diesels" },
    ],
    recommendedProducts: [
      { name: "Multi-Viscosity AW Hydraulic Fluids", why: "Seasonal and temperature swing on mixed construction fleets." },
      { name: "MOLY TAC HD 5% / ULTRA TAC", why: "Severe-duty grease on pins and loaders." },
      { name: "Full Synthetic Gear Lubricants", why: "Drivetrain step-up where tags support synthetic." },
    ],
    opportunitySignals: ["Hydraulic varnishing or heat on loaders", "Grease washout on wet municipal routes", "Mixed Volvo and mixed-brand fleets on one yard"],
    repTalkTrack: [
      "Lead with hydraulic reliability and pin life on loaders and excavators.",
      "Do not imply Volvo CE approval—verify requirements on tags and PDS.",
    ],
    discoveryQuestions: [
      "Which Volvo classes dominate hours—loaders, excavators, or haulers?",
      "What hydraulic ISO VG tags are on the worst-performing circuits?",
      "Where is grease failure showing up after wash-down?",
    ],
    crossSell: ["Coolant", "Coolant flush chemicals", "Industrial specialty for plant yards"],
    cautions: [OEM_PROFILE_DISCLAIMER],
    recommendedNextStep: "Document ISO VG, grease map, and drivetrain fills per Volvo class; align to PDS.",
  },
  international: {
    key: "international",
    label: "International Truck",
    profileTitle: "International Truck — Opportunity Profile",
    profileSubtitle: "CK-4 / FA-4, coolant programs, driveline, and service bay opportunities.",
    profileSummary: `${OEM_PROFILE_DISCLAIMER} Highway and vocational International fleets need CK-4/FA-4 discipline, HD coolant inhibitor families (NOAT vs nitrite-free Gold), and separate driveline/PTO conversations—service lane bundling verified on VIN tags and PDS.`,
    customerPainPoints: [
      { iconKey: "downtime", label: "Over-the-road uptime", sub: "Drain intervals and emissions hardware compatibility." },
      { iconKey: "contamination", label: "Coolant top-off chaos", sub: "Mixed OAT/NOAT habits in shared bays." },
      { iconKey: "bearing", label: "Driveline wear", sub: "Trans, differential, and PTO fills treated as interchangeable." },
    ],
    equipmentTypes: ["Class 8 highway tractors", "Vocational trucks", "Medium-duty delivery", "Fleet service bays"],
    likelyLubricantNeeds: [
      { category: "CK-4 / FA-4 engine oils", role: "API category matched to OEM and emissions generation" },
      { category: "HD NOAT / nitrite-free coolant", role: "Cooling program standardization" },
      { category: "Transmission & driveline fluids", role: "Spec-correct ATF and gear programs" },
      { category: "Chassis grease", role: "Fifth wheel and vocational chassis" },
    ],
    recommendedProducts: [
      { name: "Synthetic Blend / Full Synthetic CK-4", why: "Fleet engine upgrade path with analysis discipline." },
      { name: "Red Heavy Duty NOAT ELC / Gold OAT ELC", why: "Coolant programs by fleet type—never light-duty shorthand for Gold." },
      { name: "Commercial Gear Lubricants", why: "Driveline and differential baselines." },
    ],
    opportunitySignals: ["CK-4 vs FA-4 confusion on newer tractors", "Coolant compatibility failures after roadside top-off", "Incomplete service lane chemical bundles"],
    repTalkTrack: [
      "Open with API category, coolant inhibitor family, and driveline spec—not brand default.",
      "International common lubrication conversations; verify requirements on tags and PDS.",
    ],
    discoveryQuestions: [
      "What engine families and model years are on the fleet card?",
      "How are coolant bulk tanks labeled for HD vs automotive?",
      "Which transmissions and differentials need spec verification this quarter?",
    ],
    crossSell: ["Power steering & brake fluids", "DEF-adjacent shop chemicals", "Grease programs"],
    cautions: [OEM_PROFILE_DISCLAIMER, "Do not imply Navistar/International OEM approval without PDS proof."],
    recommendedNextStep: "Segment CK-4/FA-4, coolant chemistry, and driveline SKUs on the International fleet card.",
  },
  western_star: {
    key: "western_star",
    label: "Western Star",
    profileTitle: "Western Star — Opportunity Profile",
    profileSubtitle: "Severe-duty vocational highway programs and service bay depth.",
    profileSummary: `${OEM_PROFILE_DISCLAIMER} Western Star vocational and logging fleets mirror Class 8 discipline: CK-4 programs, HD coolant, driveline, and chassis grease bundled in the service bay.`,
    customerPainPoints: [
      { iconKey: "shock", label: "Severe vocational duty", sub: "Logging, dump, and heavy haul stress engines and drivetrains." },
      { iconKey: "hydraulic", label: "Pto & hoist circuits", sub: "Auxiliary hydraulics treated as main-tank AW." },
      { iconKey: "downtime", label: "Roadside reliability", sub: "Coolant and engine PO discipline before winter and harvest haul." },
    ],
    equipmentTypes: ["Western Star tractors", "Logging trucks", "Dump and vocational chassis"],
    likelyLubricantNeeds: [
      { category: "CK-4 full synthetic", role: "Severe-duty drain and soot management" },
      { category: "HD coolant programs", role: "NOAT ELC for diesel wet sleeve where specified" },
      { category: "Gear & trans fluids", role: "Driveline spec correctness" },
      { category: "HD chassis grease", role: "Fifth wheel and vocational joints" },
    ],
    recommendedProducts: [
      { name: "SAE 5W-40 Full Synthetic CK-4", why: "Premium severe-duty engine positioning." },
      { name: "Commercial HD NOAT ELC Coolant", why: "HD cooling baseline for diesel programs." },
      { name: "MOLY TAC / HD TAC grease", why: "Vocational chassis and fifth wheel." },
    ],
    opportunitySignals: ["Short drain intervals on logging haul", "Coolant top-off with universal green", "Pto hydraulic using wrong AW grade"],
    repTalkTrack: [
      "Position severe-duty CK-4 and HD coolant as a vocational system—not single-SKU price plays.",
      "Verify Western Star fluid guidance on tags; no implied OEM partnership.",
    ],
    discoveryQuestions: [
      "What vocational applications dominate—logging, dump, or long haul?",
      "Where are coolant and engine bulk tanks shared with light-duty?",
      "Which Pto and hoist circuits need ISO VG review?",
    ],
    crossSell: ["Brake & steering fluids", "Hydraulic AW for Pto", "Gear oil depth"],
    cautions: [OEM_PROFILE_DISCLAIMER],
    recommendedNextStep: "Build vocational bay map: engine, coolant, trans/driveline, Pto hydraulics, chassis grease.",
  },
  case_ih_ag: {
    key: "case_ih_ag",
    label: "Case IH Ag",
    profileTitle: "Case IH Ag — Opportunity Profile",
    profileSubtitle: "Trans-drive, seasonal PM, and full-line AGRIMAX opportunities.",
    profileSummary: `${OEM_PROFILE_DISCLAIMER} Case IH ag accounts benefit from trans-drive discipline, zinc-free options where required, and dealer PM bundling—spec conversations only where PDS supports CNH/Case IH duty.`,
    customerPainPoints: [
      { iconKey: "hydraulic", label: "Multi-reservoir confusion", sub: "Transmission, hydraulic, and brake packs share shelf space." },
      { iconKey: "retention", label: "OEM fluid premium", sub: "Brand-loyal customers without documented spec match." },
      { iconKey: "downtime", label: "Seasonal peaks", sub: "Planting and harvest windows compress service capacity." },
    ],
    equipmentTypes: ["Case IH tractors", "Combines", "Sprayers", "Magnum / Maxxum lines"],
    likelyLubricantNeeds: [
      { category: "AGRIMAX trans-drive", role: "UTHF programs per PDS application lists" },
      { category: "Zinc-free trans-drive", role: "Where tags require zinc-free chemistry" },
      { category: "CK-4 engine", role: "Seasonal diesel protection" },
      { category: "Grease & coolant", role: "PM bundle completion" },
    ],
    recommendedProducts: [
      { name: "AGRIMAX Trans Drive Hydraulic Fluid", why: "Anchor trans-hydraulic program conversation." },
      { name: "AGRIMAX Zinc Free Trans Drive", why: "Spec upgrade where tags require zinc-free." },
      { name: "AGRIMAX Extended Life Coolant programs", why: "Cooling companion on seasonal PM." },
    ],
    opportunitySignals: ["One red tractor fluid for every compartment", "Incomplete dealer PM SKUs", "Wet brake issues after generic UTHF"],
    repTalkTrack: [
      "Map Case IH reservoirs before quoting; use AGRIMAX as program depth, not a single SKU.",
      "CNH/Case IH spec language only where PDS documents support—no OEM endorsement implied.",
    ],
    discoveryQuestions: [
      "Which Case IH models drive your seasonal PM volume?",
      "Are zinc-free and standard trans-drive SKUs separated on the shelf?",
      "What is missing from your harvest and planting fluid bundles?",
    ],
    crossSell: ["Grease upgrades", "HD engine on support trucks", "Hydraulic AW on grain carts"],
    cautions: [OEM_PROFILE_DISCLAIMER, "Do not claim Case IH/CNH approval unless on the PDS for that product."],
    recommendedNextStep: "Standardize AGRIMAX by reservoir on Case IH dealer PM visits.",
  },
  new_holland_ag: {
    key: "new_holland_ag",
    label: "New Holland Ag",
    profileTitle: "New Holland Ag — Opportunity Profile",
    profileSubtitle: "Utility tractors, hay & forage, and trans-fluid program opportunities.",
    profileSummary: `${OEM_PROFILE_DISCLAIMER} New Holland ag and hay operations need trans/hydraulic clarity, seasonal grease PM, and engine/coolant companions—verify CNH/New Holland duty on tags and PDS.`,
    customerPainPoints: [
      { iconKey: "hydraulic", label: "Trans-hydraulic habits", sub: "Utility and hay fleets mixing fluids across compartments." },
      { iconKey: "bearing", label: "Balers & forage wear", sub: "Grease neglect on high-hour hay equipment." },
      { iconKey: "downtime", label: "Short seasonal windows", sub: "Hay and forage downtime is costly in peak weather." },
    ],
    equipmentTypes: ["Utility tractors", "Balers", "Forage harvesters", "Telehandlers", "Skid steers"],
    likelyLubricantNeeds: [
      { category: "Tractor / UTHF fluids", role: "Wet brake and trans-hydraulic discipline" },
      { category: "AW hydraulics", role: "Loader and telehandler circuits" },
      { category: "Multipurpose grease", role: "Field and baler PM" },
      { category: "CK-4 diesel", role: "Supporting diesel assets" },
    ],
    recommendedProducts: [
      { name: "Universal Red Tractor Fluid", why: "Baseline tractor conversation with tag verification." },
      { name: "AGRIMAX Trans Drive Hydraulic Fluid", why: "Program depth on New Holland ag accounts." },
      { name: "RED TAC / MOLY TAC", why: "Field grease and implement PM." },
    ],
    opportunitySignals: ["Telehandler hydraulics on wrong AW grade", "Baler bearing failures after marginal grease", "Seasonal PM not bundled across fluids"],
    repTalkTrack: [
      "Lead with hay season PM and trans-fluid map—common lubrication conversations, not OEM branding.",
      "Verify New Holland fluid types on equipment tags; PDS governs every recommendation.",
    ],
    discoveryQuestions: [
      "What mix of tractors, balers, and telehandlers is on the account?",
      "Where are wet brake or hydraulic complaints showing up?",
      "How complete is your spring and hay-season PM bundle?",
    ],
    crossSell: ["Coolant", "Skid-steer hydraulic AW", "Gear oil on telehandlers"],
    cautions: [OEM_PROFILE_DISCLAIMER],
    recommendedNextStep: "Bundle trans-drive, grease, engine, and coolant for New Holland seasonal PM.",
  },
};

export const OEM_OPPORTUNITY_PROFILE_MAP = Object.freeze(
  Object.fromEntries(Object.values(OEM_OPPORTUNITY_PROFILE_PRESETS).map((p) => [p.key, p]))
);

export function getOemOpportunityProfile(key) {
  const raw = String(key || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
  return OEM_OPPORTUNITY_PROFILE_MAP[raw] || null;
}

export function listOemOpportunityProfiles() {
  return Object.values(OEM_OPPORTUNITY_PROFILE_PRESETS);
}

/**
 * Map enriched equipment registry profile to sell-sheet OEM preset shape.
 * @param {import("../data/salesEnablement/equipmentOpportunityProfiles.js").EquipmentOpportunityProfile} profile
 */
function mapEquipmentRegistryToOemPreset(profile) {
  if (!profile) return null;
  const painFromConversations = (profile.commonLubricationConversations || []).slice(0, 4).map((line, i) => {
    const text = String(line || "").trim();
    const dash = text.match(/^([^:—–-]{1,72})\s*[:—–-]\s*(.+)$/);
    const iconKeys = ["hydraulic", "shock", "downtime", "contamination"];
    return {
      iconKey: iconKeys[i] || "hydraulic",
      label: dash ? dash[1].trim() : text.slice(0, 56),
      sub: dash ? dash[2].trim() : "",
    };
  });
  return {
    key: profile.key,
    label: profile.label,
    profileTitle: profile.profileTitle,
    profileSubtitle: profile.profileSubtitle,
    profileSummary: profile.opportunitySummary,
    customerPainPoints: painFromConversations.length ? painFromConversations : undefined,
    equipmentTypes: profile.equipmentTypes,
    likelyLubricantNeeds: (profile.typicalFluidCategories || []).map(({ category, role }) => ({
      category,
      role,
    })),
    recommendedProducts: (profile.recommendedProductAnchors || []).map(({ name, positioning }) => ({
      name,
      why: positioning,
    })),
    opportunitySignals: profile.opportunitySignals,
    repTalkTrack: profile.recommendedRepTalkingPoints,
    discoveryQuestions: profile.discoveryFocus,
    crossSell: profile.crossSellFocus,
    cautions: profile.cautions,
    recommendedNextStep: profile.recommendedNextStep,
    likelySpecConversations: profile.likelySpecConversations || [],
    specWhatToAsk: profile.specWhatToAsk || [],
    howKlondikeWins: profile.howKlondikeWins || [],
    whyDealersCare: profile.whyDealersCare || [],
    accountGrowthPath: profile.accountGrowthPath || "",
    klondikeGuarantee: profile.klondikeGuarantee || [],
  };
}

function mergeProfileList(primary, supplement, max = 8) {
  const out = [];
  const seen = new Set();
  const push = (item) => {
    const text = typeof item === "object" ? JSON.stringify(item) : String(item || "").trim();
    if (!text) return;
    const key = text.toLowerCase().slice(0, 80);
    if (seen.has(key)) return;
    seen.add(key);
    out.push(item);
  };
  for (const item of Array.isArray(primary) ? primary : []) {
    push(item);
    if (out.length >= max) return out;
  }
  for (const item of Array.isArray(supplement) ? supplement : []) {
    push(item);
    if (out.length >= max) break;
  }
  return out;
}

function resolveCustomerProfileFields(props) {
  const oemKey = props.oemProfileKey || props.oemOpportunityProfileKey;
  const registryProfile = oemKey ? getEquipmentOpportunityProfile(oemKey) : null;
  const registryPreset = registryProfile ? mapEquipmentRegistryToOemPreset(registryProfile) : null;
  const legacyPreset = getOemOpportunityProfile(oemKey);
  const preset = registryPreset || legacyPreset;
  const isOem = Boolean(preset) || props.profileKind === "oem" || props.profileType === "oem";

  const customerProfileId =
    props.customerProfileId || props.customerProfileKey || props.customerProfileRefId;
  const customerRegistryRow =
    !isOem && customerProfileId ? getCustomerProfileById(customerProfileId) : null;
  const customerRegistryMapped = customerRegistryRow
    ? mapCustomerProfileToSellSheetProps(customerRegistryRow, {
        assemblyPackage: props.assemblyPackage,
        industry: props.industryContext || props.industry,
        focus: props.focusContext || props.focus,
      })
    : null;

  const base = preset || customerRegistryMapped || {};
  const fallback = DEMO_DEFAULTS;
  const useRegistryPrimary = Boolean(customerRegistryMapped) && !preset;
  const textPrimary = (propVal, baseVal, fbVal) =>
    preset || useRegistryPrimary
      ? pickText(baseVal, pickText(propVal, fbVal))
      : pickText(propVal, pickText(baseVal, fbVal));
  return {
    isOem,
    profileBadge: isOem ? OEM_SELL_SHEET_BADGE : "CUSTOMER PROFILE",
    profileTitle: textPrimary(props.profileTitle, base.profileTitle, fallback.profileTitle),
    profileSubtitle: textPrimary(props.profileSubtitle, base.profileSubtitle, fallback.profileSubtitle),
    profileSummary: textPrimary(props.profileSummary, base.profileSummary, fallback.profileSummary),
    industryImageUrl: pickText(props.industryImageUrl, fallback.industryImageUrl),
    customerPainPoints: normalizePainTiles(
      mergeProfileList(base.customerPainPoints, props.customerPainPoints || fallback.customerPainPoints, 6),
      fallback.customerPainPoints
    ),
    equipmentTypes: mergeProfileList(base.equipmentTypes, props.equipmentTypes || fallback.equipmentTypes, 8).map(
      (item) => (typeof item === "string" ? item : String(item))
    ),
    likelyLubricantNeeds: normalizeLubricantNeeds(
      mergeProfileList(base.likelyLubricantNeeds, props.likelyLubricantNeeds || fallback.likelyLubricantNeeds, 8),
      fallback.likelyLubricantNeeds
    ),
    recommendedProducts: normalizeRecommendedProducts(
      mergeProfileList(base.recommendedProducts, props.recommendedProducts || fallback.recommendedProducts, 6),
      fallback.recommendedProducts
    ),
    opportunitySignals: normalizeSignals(
      mergeProfileList(base.opportunitySignals, props.opportunitySignals || fallback.opportunitySignals, 6),
      fallback.opportunitySignals
    ),
    repTalkTrack: mergeProfileList(base.repTalkTrack, props.repTalkTrack, 6).length
      ? mergeProfileList(base.repTalkTrack, props.repTalkTrack, 6)
      : fallback.repTalkTrack,
    discoveryQuestions: mergeProfileList(base.discoveryQuestions, props.discoveryQuestions, 6).length
      ? mergeProfileList(base.discoveryQuestions, props.discoveryQuestions, 6)
      : fallback.discoveryQuestions,
    crossSell: mergeProfileList(base.crossSell, props.crossSell, 6).length
      ? mergeProfileList(base.crossSell, props.crossSell, 6)
      : fallback.crossSell,
    cautions: mergeProfileList(base.cautions, props.cautions, 6).length
      ? mergeProfileList(base.cautions, props.cautions, 6)
      : fallback.cautions,
    recommendedNextStep: textPrimary(props.recommendedNextStep, base.recommendedNextStep, fallback.recommendedNextStep),
    likelySpecConversations: Array.isArray(base.likelySpecConversations) ? base.likelySpecConversations : [],
    specWhatToAsk: mergeProfileList(base.specWhatToAsk, props.specWhatToAsk, 6),
    howKlondikeWins: mergeProfileList(base.howKlondikeWins, props.howKlondikeWins, 6),
    whyDealersCare: mergeProfileList(base.whyDealersCare, props.whyDealersCare, 6),
    accountGrowthPath: textPrimary(props.accountGrowthPath, base.accountGrowthPath, ""),
    klondikeGuarantee: mergeProfileList(
      base.klondikeGuarantee,
      props.klondikeGuarantee || (preset || useRegistryPrimary ? KLONDIKE_GUARANTEE_LINES : []),
      3
    ),
    oemSpecVerifyLine: preset ? OEM_SPEC_VERIFY_LINE : null,
  };
}

function pickList(value, fallback) {
  if (!Array.isArray(value)) return fallback;
  const list = value.filter((item) => {
    if (item == null || item === false) return false;
    if (typeof item === "object") {
      return Boolean(
        String(item.label ?? item.sub ?? item.title ?? item.name ?? item.category ?? "").trim()
      );
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

function sanitizeLabel(item) {
  if (item == null) return "";
  const s =
    typeof item === "object"
      ? String(item.label ?? item.name ?? item.title ?? item.category ?? "").trim()
      : String(item).trim();
  if (!s) return "";
  if (/^(overlay-|canonical-|pds-|se-|pkg-)/i.test(s)) return "";
  if (/^[a-z0-9_-]{14,}$/i.test(s) && !/\s/.test(s)) return "";
  return s;
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

function painIconKey(tile, index) {
  const preset = String(tile?.iconKey || "").toLowerCase();
  if (["shock", "contamination", "washout", "bearing", "hydraulic", "downtime", "heat", "pm"].includes(preset)) {
    return preset;
  }
  const blob = `${tile?.label || ""} ${tile?.sub || ""}`.toLowerCase();
  if (/shock|impact|load/.test(blob)) return "shock";
  if (/contamin|dust|dirt|fines/.test(blob)) return "contamination";
  if (/washout|wash-out|wet/.test(blob)) return "washout";
  if (/bearing|pin|bush/.test(blob)) return "bearing";
  if (/hydraulic|circuit|pump/.test(blob)) return "hydraulic";
  if (/downtime|uptime|stop/.test(blob)) return "downtime";
  if (/heat|thermal|temp/.test(blob)) return "heat";
  if (/pm|prevent|maintenance/.test(blob)) return "pm";
  return ["shock", "contamination", "washout", "bearing", "hydraulic", "downtime"][index % 6];
}

function normalizePainTiles(value, fallback) {
  if (!Array.isArray(value)) return fallback.slice(0, 6);
  const out = [];
  for (const item of value) {
    if (item && typeof item === "object") {
      const label = String(item.label ?? item.title ?? item.name ?? "").trim();
      const sub = String(item.sub ?? item.desc ?? "").trim();
      if (!label && !sub) continue;
      out.push({
        iconKey: String(item.iconKey || "").trim(),
        label: label || sub.slice(0, 48),
        sub: sub || "",
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

function normalizeLubricantNeeds(value, fallback) {
  if (!Array.isArray(value)) return fallback.slice(0, 6);
  const out = [];
  for (const item of value) {
    if (item && typeof item === "object") {
      const category = String(item.category ?? item.name ?? item.title ?? item.label ?? "").trim();
      const role = String(item.role ?? item.sub ?? item.desc ?? item.why ?? "").trim();
      if (!category) continue;
      out.push({ category, role });
    } else {
      const line = String(item ?? "").trim();
      if (!line) continue;
      const dash = line.match(/^([^:—–-]{1,80})\s*[:—–-]\s*(.+)$/);
      out.push({
        category: String(dash ? dash[1] : line).trim(),
        role: String(dash ? dash[2] : "").trim(),
      });
    }
    if (out.length >= 6) break;
  }
  return out.length ? out : fallback.slice(0, 6);
}

function normalizeRecommendedProducts(value, fallback) {
  if (!Array.isArray(value)) return fallback.slice(0, 6);
  const out = [];
  for (const item of value) {
    if (item && typeof item === "object") {
      const name = String(item.name ?? item.title ?? item.productName ?? item.category ?? "").trim();
      const why = String(item.why ?? item.role ?? item.sub ?? item.desc ?? item.fit ?? "").trim();
      if (!name) continue;
      out.push({ name, why });
    } else {
      const line = String(item ?? "").trim();
      if (!line) continue;
      const dash = line.match(/^([^:—–-]{1,80})\s*[:—–-]\s*(.+)$/);
      out.push({
        name: String(dash ? dash[1] : line).trim(),
        why: String(dash ? dash[2] : "").trim(),
      });
    }
    if (out.length >= 6) break;
  }
  return out.length ? out : fallback.slice(0, 6);
}

function normalizeEquipmentList(value, fallback) {
  const raw = pickList(value, fallback);
  return raw.map((item) => sanitizeLabel(item) || String(item).trim()).filter(Boolean).slice(0, 8);
}

function normalizeSignals(value, fallback) {
  const raw = pickList(value, fallback);
  return raw.map((item) => sanitizeLabel(item) || String(item).trim()).filter(Boolean).slice(0, 5);
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

function OemHeroDisclaimer({ text }) {
  const copy = String(text || OEM_PROFILE_DISCLAIMER).trim();
  if (!copy) return null;
  return (
    <div
      role="note"
      style={{
        marginTop: 4,
        padding: "14px 16px",
        borderRadius: 10,
        background: "rgba(15, 23, 42, 0.42)",
        border: "1px solid rgba(251, 146, 60, 0.55)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
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
        Verify before you recommend
      </p>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, lineHeight: 1.55, color: "rgba(255,255,255,0.94)" }}>
        {copy}
      </p>
    </div>
  );
}

function OemCompliancePanel({ items }) {
  const list = pickList(items, []).slice(0, 6);
  if (!list.length) return null;
  return (
    <section
      role="note"
      aria-label="OEM opportunity profile compliance"
      style={{
        borderRadius: 12,
        padding: "20px 22px",
        background: "linear-gradient(180deg, #fff7ed 0%, #ffffff 100%)",
        border: `2px solid ${BRAND.orange}`,
        boxShadow: "0 12px 32px rgba(234, 88, 12, 0.12)",
      }}
    >
      <p
        style={{
          margin: "0 0 4px",
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: "0.16em",
          color: BRAND.orange,
          textTransform: "uppercase",
        }}
      >
        Spec conversation guardrails
      </p>
      <p
        style={{
          margin: "0 0 14px",
          fontSize: 15,
          fontWeight: 900,
          color: BRAND.headerNavy,
          lineHeight: 1.35,
        }}
      >
        Not an OEM endorsement — verify on tags, manuals, and current PDS
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
        {list.map((line, i) => (
          <li
            key={`oem-caution-${i}`}
            style={{
              display: "flex",
              gap: 12,
              fontSize: 14,
              lineHeight: 1.5,
              color: i === 0 ? BRAND.headerNavy : "#475569",
              fontWeight: i === 0 ? 800 : 600,
              padding: i === 0 ? "12px 14px" : "0 2px",
              borderRadius: i === 0 ? 8 : 0,
              background: i === 0 ? "rgba(234, 88, 12, 0.08)" : "transparent",
              border: i === 0 ? "1px solid rgba(234, 88, 12, 0.25)" : "none",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 22,
                height: 22,
                borderRadius: 6,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 900,
                color: BRAND.white,
                background: i === 0 ? BRAND.orange : BRAND.navyMid,
              }}
              aria-hidden
            >
              {i === 0 ? "!" : "\u2713"}
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
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

function PainIconSvg({ iconKey }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.28)";
  const k = String(iconKey || "shock");
  const s = 36;
  if (k === "contamination") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="14" cy="16" r="4" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <circle cx="26" cy="22" r="5" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <circle cx="18" cy="28" r="3" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "washout") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M10 26c4-8 8-12 12-12s8 4 12 12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <path d="M14 30h12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "bearing") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="10" stroke={stroke} strokeWidth="2" />
        <circle cx="20" cy="20" r="3" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "hydraulic") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="12" y="10" width="16" height="20" rx="3" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <path d="M16 18h8M16 24h6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "downtime") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="22" r="10" stroke={stroke} strokeWidth="2" />
        <path d="M20 14v8l5 3" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "heat") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M20 8v24M16 14h8M14 22h12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "pm") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M10 28h20M12 22h16M14 16h12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M12 28l8-14 4 8 8-12 6 10" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PainPointTile({ tile }) {
  return (
    <article
      style={{
        padding: "18px 14px 20px",
        borderRadius: 10,
        background: "linear-gradient(160deg, #f8fafc 0%, #ffffff 100%)",
        border: "1px solid rgba(30, 58, 138, 0.16)",
        borderTop: `3px solid ${BRAND.orange}`,
        textAlign: "center",
        minHeight: 140,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          margin: "0 auto",
          borderRadius: 999,
          background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
          border: "2px solid rgba(234, 88, 12, 0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden
      >
        <PainIconSvg iconKey={tile.iconKey} />
      </div>
      <p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.25 }}>
        {tile.label}
      </p>
      {tile.sub ? (
        <p style={{ margin: "6px 0 0", fontSize: 11, fontWeight: 600, color: "#64748b", lineHeight: 1.4 }}>
          {tile.sub}
        </p>
      ) : null}
    </article>
  );
}

function EquipmentIconSvg({ label }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.22)";
  const blob = String(label || "").toLowerCase();
  const s = 32;
  if (/conveyor|screen/.test(blob)) {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M8 24h24M8 20h24" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="24" r="3" fill={fill} stroke={stroke} strokeWidth="1.4" />
        <circle cx="28" cy="24" r="3" fill={fill} stroke={stroke} strokeWidth="1.4" />
      </svg>
    );
  }
  if (/loader|excavator|truck|haul/.test(blob)) {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="8" y="18" width="22" height="10" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <circle cx="14" cy="30" r="3" stroke={stroke} strokeWidth="1.6" />
        <circle cx="26" cy="30" r="3" stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (/crusher/.test(blob)) {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M12 12h16v8H12z" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <path d="M10 28h20" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="10" y="14" width="20" height="14" rx="3" fill={fill} stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

function EquipmentGrid({ items }) {
  const list = items.slice(0, 8);
  if (!list.length) return null;
  const cols = list.length <= 4 ? 2 : 3;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
      {list.map((label) => (
        <article
          key={label}
          style={{
            padding: "14px 10px",
            borderRadius: 10,
            background: BRAND.white,
            border: "1px solid rgba(30, 58, 138, 0.14)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              margin: "0 auto",
              borderRadius: 10,
              background: `linear-gradient(145deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden
          >
            <EquipmentIconSvg label={label} />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 800, color: BRAND.navy, lineHeight: 1.3 }}>
            {label}
          </p>
        </article>
      ))}
    </div>
  );
}

function LubricantNeedCard({ item }) {
  return (
    <article
      style={{
        padding: "14px 16px",
        borderRadius: 10,
        borderLeft: `4px solid ${BRAND.orange}`,
        background: "linear-gradient(155deg, #fff 0%, #f1f5f9 100%)",
        border: "1px solid rgba(30, 58, 138, 0.18)",
        borderLeftWidth: 4,
        borderLeftColor: BRAND.orange,
      }}
    >
      <p style={{ margin: 0, fontSize: 13, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.3 }}>
        {item.category}
      </p>
      {item.role ? (
        <p style={{ margin: "6px 0 0", fontSize: 12, fontWeight: 600, color: "#64748b", lineHeight: 1.4 }}>
          {item.role}
        </p>
      ) : null}
    </article>
  );
}

function RecommendedOpportunityCard({ item }) {
  return (
    <article
      style={{
        padding: "18px 18px 20px",
        borderRadius: 12,
        background: BRAND.white,
        border: "1px solid rgba(30, 58, 138, 0.2)",
        boxShadow: "0 8px 22px rgba(15, 23, 42, 0.07)",
        minHeight: 120,
      }}
    >
      <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.35 }}>
        {item.name}
      </p>
      {item.why ? (
        <p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 600, color: "#475569", lineHeight: 1.45 }}>
          {item.why}
        </p>
      ) : null}
    </article>
  );
}

function PlaybookBulletList({ items, max = 5 }) {
  const list = (items || []).filter(Boolean).slice(0, max);
  if (!list.length) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
      {list.map((line, i) => (
        <li
          key={`pb-${i}`}
          style={{
            display: "flex",
            gap: 8,
            fontSize: 13,
            lineHeight: 1.45,
            color: "rgba(255,255,255,0.92)",
            fontWeight: 600,
          }}
        >
          <span style={{ color: BRAND.orangeLight, fontWeight: 900, flexShrink: 0 }} aria-hidden>
            {"\u2713"}
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function DealerWinPlaybookPanel({ howKlondikeWins, whyDealersCare, accountGrowthPath, guaranteeLines }) {
  const wins = (howKlondikeWins || []).filter(Boolean).slice(0, 5);
  const dealer = (whyDealersCare || []).filter(Boolean).slice(0, 4);
  const growth = String(accountGrowthPath || "").trim();
  const guarantee = (guaranteeLines || []).filter(Boolean).slice(0, 2);
  if (!wins.length && !dealer.length && !growth && !guarantee.length) return null;
  return (
    <section
      data-dealer-win-playbook="true"
      style={{
        padding: "22px 24px",
        borderRadius: 12,
        background: `linear-gradient(135deg, ${BRAND.headerNavy} 0%, ${BRAND.navyMid} 100%)`,
        color: BRAND.white,
        display: "grid",
        gap: 16,
      }}
    >
      {guarantee.length ? (
        <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: BRAND.orangeLight, lineHeight: 1.4 }}>
          {guarantee[0]}
        </p>
      ) : null}
      {wins.length ? (
        <div>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: BRAND.orangeMuted,
            }}
          >
            How KLONDIKE wins
          </p>
          <PlaybookBulletList items={wins} max={5} />
        </div>
      ) : null}
      {dealer.length ? (
        <div>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: BRAND.orangeMuted,
            }}
          >
            Why dealers should care
          </p>
          <PlaybookBulletList items={dealer} max={4} />
        </div>
      ) : null}
      {growth ? (
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, lineHeight: 1.45, color: "rgba(255,255,255,0.92)" }}>
          {growth}
        </p>
      ) : null}
    </section>
  );
}

function OemSpecConversationPanel({ rows, whatToAsk, verifyLine }) {
  const specRows = Array.isArray(rows) ? rows.slice(0, 5) : [];
  const askLines = Array.isArray(whatToAsk) ? whatToAsk.slice(0, 5) : [];
  if (!specRows.length && !askLines.length) return null;
  return (
    <section
      data-oem-spec-conversations="true"
      style={{
        padding: "20px 22px",
        borderRadius: 12,
        background: "linear-gradient(155deg, #f8fafc 0%, #fff 100%)",
        border: "1px solid rgba(30, 58, 138, 0.18)",
        display: "grid",
        gap: 16,
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: BRAND.headerNavy,
            textTransform: "uppercase",
          }}
        >
          Likely OEM / spec conversations
        </p>
        <p style={{ margin: "6px 0 0", fontSize: 12, fontWeight: 600, color: "#64748b", lineHeight: 1.45 }}>
          PDS-supported topics only—not OEM endorsement or approval.
        </p>
      </div>
      {specRows.length ? (
        <div style={{ display: "grid", gap: 10 }}>
          {specRows.map((row) => (
            <article
              key={row.specLabel}
              style={{
                padding: "14px 16px",
                borderRadius: 10,
                background: BRAND.white,
                border: "1px solid rgba(203, 213, 225, 0.9)",
                borderLeft: `4px solid ${BRAND.orange}`,
              }}
            >
              <p style={{ margin: 0, fontSize: 13, fontWeight: 900, color: BRAND.headerNavy }}>{row.specLabel}</p>
              <p style={{ margin: "4px 0 0", fontSize: 11, fontWeight: 800, color: BRAND.orange, letterSpacing: "0.04em" }}>
                {row.fluidCategory}
              </p>
              <p style={{ margin: "8px 0 0", fontSize: 12, fontWeight: 700, color: "#334155", lineHeight: 1.4 }}>
                {(row.klondikeProducts || []).join(" · ")}
              </p>
              {row.positioning ? (
                <p style={{ margin: "8px 0 0", fontSize: 11, fontWeight: 600, color: "#64748b", lineHeight: 1.45 }}>
                  {row.positioning}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
      {askLines.length ? (
        <div>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.08em",
              color: BRAND.headerNavy,
              textTransform: "uppercase",
            }}
          >
            What to ask before quoting
          </p>
          <QuestionList items={askLines} max={5} />
        </div>
      ) : null}
      {verifyLine ? (
        <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#64748b", lineHeight: 1.45 }}>{verifyLine}</p>
      ) : null}
    </section>
  );
}

function CrossSellGrid({ items, max = 5 }) {
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

function SignalPills({ items }) {
  const list = items.slice(0, 5);
  if (!list.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {list.map((line, i) => (
        <span
          key={`sig-${i}`}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800,
            color: BRAND.navy,
            background: "#fff7ed",
            border: `1px solid ${BRAND.orangeMuted}`,
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}

function IndustryHeroVisual({ industryImageUrl }) {
  const img = String(industryImageUrl || "").trim();
  if (img) {
    return (
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(251, 146, 60, 0.45)",
          boxShadow: "0 20px 48px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src={img}
          alt="Industry"
          decoding="async"
          style={{ width: "100%", maxHeight: 300, objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        borderRadius: 16,
        padding: "44px 28px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(251, 146, 60, 0.4)",
        textAlign: "center",
      }}
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden style={{ margin: "0 auto 18px" }}>
        <path
          d="M14 52h44M18 44l8-16 10 12 8-14 10 18"
          stroke={BRAND.orangeLight}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="54" cy="18" r="5" fill={BRAND.orangeMuted} />
      </svg>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 900, letterSpacing: "0.12em", color: BRAND.orangeLight }}>
        INDUSTRY PLAYBOOK
      </p>
      <p style={{ margin: "10px 0 0", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.88)", lineHeight: 1.45 }}>
        Strategic customer profile for severe-duty sites and mixed equipment fleets.
      </p>
    </div>
  );
}

export default function CustomerProfileSellSheet(props) {
  const profile = resolveCustomerProfileFields(props);
  const customerProfileId =
    props.customerProfileId || props.customerProfileKey || props.customerProfileRefId || "";
  const isOemProfile = profile.isOem;
  const profileTitle = profile.profileTitle;
  const profileSubtitle = profile.profileSubtitle;
  const profileSummary = profile.profileSummary;
  const industryImageUrl = profile.industryImageUrl;
  const profileBadge = profile.profileBadge;
  const oemHeroDisclaimer =
    (Array.isArray(profile.cautions) && profile.cautions[0]) || OEM_PROFILE_DISCLAIMER;
  const painTiles = profile.customerPainPoints.map((tile, i) => ({ ...tile, iconKey: painIconKey(tile, i) }));
  const equipmentTypes = normalizeEquipmentList(profile.equipmentTypes, DEMO_DEFAULTS.equipmentTypes);
  const lubricantNeeds = profile.likelyLubricantNeeds;
  const recommendedProducts = profile.recommendedProducts;
  const opportunitySignals = profile.opportunitySignals;
  const { repTalkTrack, discoveryQuestions } = resolveRepTalkAndQuestions(
    profile.repTalkTrack,
    profile.discoveryQuestions,
    DEMO_DEFAULTS.repTalkTrack,
    DEMO_DEFAULTS.discoveryQuestions
  );
  const crossSell = pickList(profile.crossSell, DEMO_DEFAULTS.crossSell);
  const cautions = pickList(profile.cautions, DEMO_DEFAULTS.cautions);
  const recommendedNextStep = profile.recommendedNextStep;
  const likelySpecConversations = profile.likelySpecConversations;
  const specWhatToAsk = profile.specWhatToAsk;
  const oemSpecVerifyLine = profile.oemSpecVerifyLine;
  const howKlondikeWins = profile.howKlondikeWins;
  const whyDealersCare = profile.whyDealersCare;
  const accountGrowthPath = profile.accountGrowthPath;
  const klondikeGuarantee = profile.klondikeGuarantee;

  const painCount = Math.min(Math.max(painTiles.length, 4), 6);
  const painGrid = painTiles.slice(0, painCount);
  const painCols = painCount <= 4 ? 2 : 3;
  const infographicKey = !isOemProfile
    ? resolveInfographicProfileKey(customerProfileId, profileTitle)
    : null;

  return (
    <article
      data-layout={CUSTOMER_PROFILE_SELL_SHEET_LAYOUT_ID}
      data-sell-sheet-title={profileTitle.slice(0, 80)}
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
      aria-label="Customer profile sell sheet"
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
          gridTemplateColumns: infographicKey ? "1fr" : "minmax(0, 1.1fr) minmax(320px, 1fr)",
          minHeight: infographicKey ? undefined : 480,
          background: `linear-gradient(125deg, ${BRAND.headerNavy} 0%, ${BRAND.navy} 42%, ${BRAND.navyMid} 100%)`,
          borderBottom: infographicKey ? "none" : "1px solid rgba(226,232,240,0.95)",
        }}
      >
        <div
          style={{
            padding: infographicKey ? "36px 44px 32px" : "44px 44px 48px",
            display: "grid",
            gap: 16,
            alignContent: "center",
          }}
        >
          <span
            style={{
              justifySelf: "start",
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.18em",
              padding: "6px 12px",
              borderRadius: 999,
              color: "#fff",
              background: isOemProfile ? "rgba(234, 88, 12, 0.35)" : "rgba(255,255,255,0.12)",
              border: isOemProfile ? "1px solid rgba(251, 146, 60, 0.75)" : "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {profileBadge}
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px, 3.6vw, 46px)",
              fontWeight: 900,
              color: BRAND.white,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            {profileTitle}
          </h1>
          {profileSubtitle ? (
            <p
              style={{
                margin: 0,
                fontSize: "clamp(17px, 2.1vw, 24px)",
                fontWeight: 900,
                color: BRAND.orange,
                lineHeight: 1.25,
              }}
            >
              {profileSubtitle}
            </p>
          ) : null}
          {profileSummary ? (
            <p
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.6,
                maxWidth: 520,
              }}
            >
              {profileSummary}
            </p>
          ) : null}
          {isOemProfile ? <OemHeroDisclaimer text={oemHeroDisclaimer} /> : null}
        </div>
        {!infographicKey ? (
          <div style={{ padding: "36px 28px 40px 20px", display: "flex", alignItems: "center" }}>
            <IndustryHeroVisual industryImageUrl={industryImageUrl} />
          </div>
        ) : null}
      </section>

      {infographicKey ? (
        <section
          style={{
            padding: "28px 44px 32px",
            background: `linear-gradient(180deg, ${BRAND.headerNavy} 0%, #0f172a 100%)`,
            borderBottom: "1px solid rgba(226,232,240,0.95)",
          }}
        >
          <CustomerProfileEquipmentInfographic profileKey={infographicKey} />
        </section>
      ) : null}

      {painGrid.length ? (
        <section style={{ padding: "32px 44px 28px", background: "#f8fafc" }}>
          <p
            style={{
              margin: "0 0 18px",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "0.14em",
              color: BRAND.headerNavy,
              textTransform: "uppercase",
            }}
          >
            {isOemProfile ? "Field signals and lubrication pressure points" : "Customer reality and pain points"}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${painCols}, minmax(0, 1fr))`,
              gap: 12,
            }}
          >
            {painGrid.map((tile) => (
              <PainPointTile key={tile.label} tile={tile} />
            ))}
          </div>
          {opportunitySignals.length ? (
            <div style={{ marginTop: 20 }}>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  color: BRAND.orange,
                  textTransform: "uppercase",
                }}
              >
                Opportunity signals to listen for
              </p>
              <SignalPills items={opportunitySignals} />
            </div>
          ) : null}
        </section>
      ) : null}

      <section style={{ padding: "28px 44px 36px", display: "grid", gap: 22, background: BRAND.white }}>
        <DealerWinPlaybookPanel
          howKlondikeWins={howKlondikeWins}
          whyDealersCare={whyDealersCare}
          accountGrowthPath={accountGrowthPath}
          guaranteeLines={klondikeGuarantee}
        />
        {isOemProfile ? (
          <OemSpecConversationPanel
            rows={likelySpecConversations}
            whatToAsk={specWhatToAsk}
            verifyLine={oemSpecVerifyLine}
          />
        ) : null}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {equipmentTypes.length ? (
            <FlyerCard
              title={isOemProfile ? "Equipment and compartment map" : "Equipment and application map"}
              subtitle={
                isOemProfile
                  ? "Assets and reservoirs to verify before the spec conversation"
                  : "What runs on this site"
              }
            >
              <EquipmentGrid items={equipmentTypes} />
            </FlyerCard>
          ) : null}
          {lubricantNeeds.length ? (
            <FlyerCard
              title={isOemProfile ? "KLONDIKE category opportunities" : "Likely lubricant needs"}
              subtitle={
                isOemProfile
                  ? "Spec conversations by fluid category — verify on tags, manuals, and PDS"
                  : "Category priorities for this profile"
              }
            >
              <div style={{ display: "grid", gap: 10 }}>
                {lubricantNeeds.slice(0, 6).map((item) => (
                  <LubricantNeedCard key={item.category} item={item} />
                ))}
              </div>
            </FlyerCard>
          ) : null}
        </section>

        {recommendedProducts.length ? (
          <section>
            <p
              style={{
                margin: "0 0 16px",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: "0.14em",
                color: BRAND.headerNavy,
                textTransform: "uppercase",
              }}
            >
              {isOemProfile ? "Recommended KLONDIKE product anchors" : "Recommended product opportunities"}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(recommendedProducts.length, 2)}, minmax(0, 1fr))`,
                gap: 14,
              }}
            >
              {recommendedProducts.slice(0, 6).map((item) => (
                <RecommendedOpportunityCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ) : null}

        <section style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {repTalkTrack.length ? (
            <FlyerCard
              title={isOemProfile ? "Rep playbook — talk track" : "Rep talk track"}
              subtitle={isOemProfile ? "Spec conversation openers" : "What the rep can say"}
            >
              <CheckBullets items={repTalkTrack} max={4} />
            </FlyerCard>
          ) : null}
          {discoveryQuestions.length ? (
            <FlyerCard
              title="Discovery questions"
              subtitle={isOemProfile ? "Verify requirements before recommending" : "What the rep should ask"}
            >
              <QuestionList items={discoveryQuestions} max={5} />
            </FlyerCard>
          ) : null}
        </section>

        {crossSell.length >= 2 ? (
          <FlyerCard
            title={isOemProfile ? "KLONDIKE program cross-sell" : "Cross-sell and system strategy"}
            subtitle={
              isOemProfile ? "Category depth for the full spec conversation" : "Grow the full lubrication program"
            }
          >
            <CrossSellGrid items={crossSell} max={5} />
          </FlyerCard>
        ) : null}

        {cautions.length ? (
          isOemProfile ? (
            <OemCompliancePanel items={cautions} />
          ) : (
            <FlyerCard title="Cautions and watchouts">
              <CheckBullets items={cautions} max={4} cautionStyle />
            </FlyerCard>
          )
        ) : null}

        {recommendedNextStep ? (
          <section
            style={{
              borderRadius: 12,
              padding: "20px 24px",
              background: `linear-gradient(98deg, ${BRAND.orange} 0%, #c2410c 45%, ${BRAND.navyMid} 100%)`,
              color: BRAND.white,
            }}
          >
            <p style={{ margin: 0, fontSize: 10, fontWeight: 900, letterSpacing: "0.14em" }}>RECOMMENDED NEXT STEP</p>
            <p style={{ margin: "8px 0 0", fontSize: 17, fontWeight: 900, lineHeight: 1.32 }}>{recommendedNextStep}</p>
          </section>
        ) : null}
      </section>

      <section style={{ padding: "8px 20px 0", background: "#f8fafc", borderTop: "1px solid rgba(226,232,240,0.95)" }}>
        <img
          src="/products.png"
          alt="Klondike lubricants product lineup"
          decoding="async"
          style={{ width: "100%", minHeight: 260, maxHeight: 320, objectFit: "contain", display: "block", margin: "0 auto" }}
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
