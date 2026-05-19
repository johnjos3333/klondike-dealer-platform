/**
 * Phase 6I — Customer profile library for Sales Enablement (field playbooks).
 *
 * Rep-ready industry archetypes: discovery, pain signals, and KLONDIKE category positioning.
 * Verify application requirements on equipment tags, manuals, and current PDS before recommending chemistry.
 * `recommendedLfbbBlockIds` reference `SALES_ENABLEMENT_LFBB_BLOCKS.blocks[].id` in lfbbBlocks.js.
 */

export const SALES_ENABLEMENT_CUSTOMER_PROFILE_VERSION = 2;

export const CUSTOMER_PROFILE_DISCLAIMER =
  "Customer profile for rep enablement—not a customer endorsement. Verify application requirements using equipment tags, operator manuals, and current PDS before any recommendation.";

const PAIN_ICON_KEYS = ["shock", "hydraulic", "contamination", "downtime", "bearing", "washout"];

const CATEGORY_LABELS = Object.freeze({
  grease: "Grease programs",
  hydraulic_fluids: "Hydraulic fluids",
  hd_engine_oils: "Heavy duty engine oils",
  gear_oils: "Gear & drivetrain oils",
  coolant: "Coolant programs",
  tractor_fluids: "Tractor / UTHF fluids",
  food_grade: "Food-grade lubricants",
  compressor_oils: "Compressor & R&O oils",
  transmission: "Transmission & driveline fluids",
  environmental_eal: "ENVIRO / EAL programs",
  industrial_specialty: "Industrial specialty fluids",
  synthetics: "Synthetic upgrade paths",
});

/**
 * @typedef {{
 *   iconKey?: string,
 *   label: string,
 *   sub?: string,
 * }} CustomerPainPointTile
 */

/**
 * @typedef {{
 *   category: string,
 *   role: string,
 * }} CustomerLubricantNeedRef
 */

/**
 * @typedef {{
 *   name: string,
 *   why: string,
 * }} CustomerRecommendedProductRef
 */

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   profileTitle: string,
 *   profileSubtitle: string,
 *   profileSummary: string,
 *   customerPainPoints: (string | CustomerPainPointTile)[],
 *   equipmentTypes: string[],
 *   likelyLubricantNeeds: CustomerLubricantNeedRef[],
 *   recommendedProducts: CustomerRecommendedProductRef[],
 *   opportunitySignals: string[],
 *   repTalkTrack: string[],
 *   discoveryQuestions: string[],
 *   crossSell: string[],
 *   cautions: string[],
 *   recommendedNextStep: string,
 *   operatingConditions: string[],
 *   commonPainPoints: string[],
 *   priorityProductCategories: string[],
 *   buyingTriggers: string[],
 *   recommendedMessagingAngles: string[],
 *   relevantEquipmentTypes: string[],
 *   recommendedLfbbBlockIds: string[],
 * }} SalesEnablementCustomerProfile
 */

/** @param {(string | CustomerPainPointTile)[]} points @param {number} max */
function painTiles(points, max = 6) {
  return (points || []).slice(0, max).map((item, index) => {
    if (item && typeof item === "object") {
      return {
        iconKey: String(item.iconKey || PAIN_ICON_KEYS[index % PAIN_ICON_KEYS.length]),
        label: String(item.label || "").trim(),
        sub: String(item.sub || "").trim(),
      };
    }
    const text = String(item || "").trim();
    const dash = text.match(/^([^:—–-]{1,80})\s*[:—–-]\s*(.+)$/);
    return {
      iconKey: PAIN_ICON_KEYS[index % PAIN_ICON_KEYS.length],
      label: dash ? dash[1].trim() : text.slice(0, 80),
      sub: dash ? dash[2].trim() : "",
    };
  });
}

/** @param {string[]} keys */
function categoryCrossSell(keys) {
  return (keys || []).map((key) => CATEGORY_LABELS[key] || String(key).replace(/_/g, " "));
}

/** @param {SalesEnablementCustomerProfile} profile @param {{ assemblyPackage?: object | null, industry?: string, focus?: string }} [opts] */
export function mapCustomerProfileToSellSheetProps(profile, opts = {}) {
  if (!profile) return {};

  const industry = String(opts.industry || "").trim();
  const focus = String(opts.focus || "").trim();
  const assemblyPkg =
    opts.assemblyPackage && typeof opts.assemblyPackage === "object" ? opts.assemblyPackage : null;

  const subtitleParts = [industry, focus].filter(Boolean);
  const profileSubtitle =
    subtitleParts.length > 0
      ? subtitleParts.join(" · ")
      : String(profile.profileSubtitle || "").trim();

  const assemblySignals = Array.isArray(assemblyPkg?.customerProfileSignals)
    ? assemblyPkg.customerProfileSignals.map((x) => String(x ?? "").trim()).filter(Boolean)
    : [];
  const opportunitySignals = [
    ...(profile.opportunitySignals || profile.buyingTriggers || []),
    ...assemblySignals,
  ]
    .map((x) => String(x || "").trim())
    .filter(Boolean)
    .slice(0, 6);

  const assemblyRep = Array.isArray(assemblyPkg?.repQuestions)
    ? assemblyPkg.repQuestions.map((x) => String(x ?? "").trim()).filter(Boolean)
    : [];
  const repTalkTrack = [...(profile.repTalkTrack || profile.recommendedMessagingAngles || []), ...assemblyRep]
    .map((x) => String(x || "").trim())
    .filter(Boolean)
    .slice(0, 6);

  const assemblyDiscovery = Array.isArray(assemblyPkg?.customerProfileQuestions)
    ? assemblyPkg.customerProfileQuestions.map((x) => String(x ?? "").trim()).filter(Boolean)
    : [];
  const discoveryQuestions = [...assemblyDiscovery, ...(profile.discoveryQuestions || [])]
    .map((x) => String(x || "").trim())
    .filter(Boolean)
    .slice(0, 6);

  const recommendedProducts = [
    ...(profile.recommendedProducts || []),
    ...(Array.isArray(assemblyPkg?.productCards) ? assemblyPkg.productCards : [])
      .slice(0, 3)
      .map((row) => ({
        name: String(row?.productName || row?.name || "").trim(),
        why: String(row?.positioningLine || row?.gradeLabel || "Spec conversation anchor—verify on current PDS").trim(),
      }))
      .filter((row) => row.name),
  ].slice(0, 6);

  return {
    profileTitle: profile.profileTitle || profile.title,
    profileSubtitle,
    profileSummary: profile.profileSummary || (profile.operatingConditions || []).join(" "),
    customerPainPoints: painTiles(profile.customerPainPoints || profile.commonPainPoints),
    equipmentTypes: profile.equipmentTypes || profile.relevantEquipmentTypes || [],
    likelyLubricantNeeds:
      profile.likelyLubricantNeeds ||
      (profile.priorityProductCategories || []).map((key) => ({
        category: CATEGORY_LABELS[key] || String(key).replace(/_/g, " "),
        role: "Priority KLONDIKE category—verify duty on tags, manuals, and current PDS",
      })),
    recommendedProducts,
    opportunitySignals,
    repTalkTrack,
    discoveryQuestions,
    crossSell: profile.crossSell || categoryCrossSell(profile.priorityProductCategories),
    cautions: profile.cautions || [CUSTOMER_PROFILE_DISCLAIMER],
    recommendedNextStep: profile.recommendedNextStep,
  };
}

/**
 * @param {unknown} profileId
 * @returns {SalesEnablementCustomerProfile | null}
 */
export function getCustomerProfileById(profileId) {
  const key = String(profileId || "").trim();
  if (!key) return null;
  return (SALES_ENABLEMENT_CUSTOMER_PROFILES.profiles || []).find((p) => p.id === key) || null;
}

/** @returns {SalesEnablementCustomerProfile[]} */
export function listCustomerProfiles() {
  return [...(SALES_ENABLEMENT_CUSTOMER_PROFILES.profiles || [])];
}

/** @type {{ version: number, profiles: SalesEnablementCustomerProfile[] }} */
export const SALES_ENABLEMENT_CUSTOMER_PROFILES = {
  version: SALES_ENABLEMENT_CUSTOMER_PROFILE_VERSION,
  profiles: [
    {
      id: "mining_aggregate",
      title: "Mining & Aggregate — Field Playbook",
      profileTitle: "Mining & Aggregate — Field Playbook",
      profileSubtitle: "Pits, crushers, conveyors, and mobile load-out fleets",
      profileSummary:
        "Severe-duty sites where shock load, abrasive dust, and wash-down discipline decide whether grease, hydraulics, and drivetrain fluids hold up. Lead with uptime and contamination control—not SKU swaps.",
      customerPainPoints: [
        { iconKey: "washout", label: "Grease washout", sub: "Pins, bushings, and slow-speed bearings lose protection after water and fines exposure" },
        { iconKey: "shock", label: "Shock load", sub: "Crushers, conveyors, and loader pivots see impact before steady wear shows up" },
        { iconKey: "hydraulic", label: "Hydraulic reliability", sub: "Heat, varnish, and slow cycles when ISO VG drifts or reservoirs run dirty" },
        { iconKey: "bearing", label: "Gearboxes & final drives", sub: "Metal and varnish trending before the line stops" },
        { iconKey: "contamination", label: "Dust & contamination", sub: "Fines and moisture challenge every circuit and lube point" },
        { iconKey: "downtime", label: "Unplanned downtime", sub: "Screen plants and load-out iron drive the cost conversation" },
      ],
      equipmentTypes: [
        "Face shovels, wheel loaders, and haul trucks",
        "Crushers, screens, and stackers",
        "Conveyor lines and transfer points",
        "Mobile crushing and screening spreads",
        "Support pickups and on-site lube units",
      ],
      likelyLubricantNeeds: [
        { category: "Grease (nano sulfonate, moly, severe-duty EP)", role: "Pins, bushings, and wet shock-loaded joints where PDS lists severe mobile duty" },
        { category: "AW / MV hydraulic fluids", role: "ISO VG discipline on long-life mobile circuits" },
        { category: "Industrial & full synthetic gear oils", role: "Crusher, conveyor, and final-drive fills per compartment tag" },
        { category: "CK-4 HD engine oils", role: "Haul trucks and support diesels—API category from tag" },
        { category: "HD coolant programs", role: "Fleet cooling discipline separate from automotive bulk" },
      ],
      recommendedProducts: [
        { name: "nano Calcium Sulfonate EP Grease", why: "Upgrade conversation when commodity grease washes out on pins and bushings—per PDS duty only" },
        { name: "Multi-Viscosity AW & Advanced Formula Hydraulics", why: "Bulk ISO VG baseline before synthetic step-up" },
        { name: "Industrial EP & Full Synthetic Gear Lubricants", why: "Enclosed reducers and final drives under sustained load" },
        { name: "CK-4 Synthetic Blend & Full Synthetic HD Engine Oils", why: "Documented API CK-4 for haul and support diesels" },
      ],
      opportunitySignals: [
        "Repeat pin failures after rain or wash-down shifts",
        "Hydraulic slow response at shift start on loaders",
        "Oil analysis showing oxidation or high particulate on mobile circuits",
        "Shutdown planning in the next 60–90 days",
        "Unlabeled bulk AW drums on site",
      ],
      repTalkTrack: [
        "Open with worst unplanned stop last quarter—conveyor, crusher, or loader—not brand habit.",
        "Position grease and hydraulics as contamination and shock-load programs verified on tags and PDS.",
        "Walk final drives and gearboxes as separate compartments before quoting one gear oil.",
        "Use analysis trends to justify tier step-ups—do not promise approvals not on the PDS.",
        "Bundle grease, hydraulics, gear, engine, and coolant only where each line is documented for the duty.",
      ],
      discoveryQuestions: [
        "Which assets drove your worst downtime last quarter—crusher, conveyor, or mobile load-out?",
        "Where are you seeing grease washout or repeat pin failures?",
        "What ISO VG tags are on the hydraulic circuits trending hot or slow?",
        "Are gearboxes and final drives on a drain-and-sample program or calendar only?",
        "How are bulk hydraulics, grease, and engine oil labeled and hose-separated?",
        "Who approves chemistry changes when proposing a new grease family or ISO VG?",
      ],
      crossSell: [
        "Grease — severe-duty and nano sulfonate programs",
        "Hydraulic fluids — ISO VG ladder and analysis discipline",
        "Gear oils — crushers, conveyors, and final drives",
        "HD engine oils — haul fleet programs",
        "Coolants — HD fleet cooling",
        "Filtration & breathers — contamination control companions",
      ],
      cautions: [
        CUSTOMER_PROFILE_DISCLAIMER,
        "Do not mix incompatible greases without flush and consultation.",
        "AW hydraulic fluid is not interchangeable with turbine, compressor R&O, or OEM-specified dry circuits.",
      ],
      recommendedNextStep:
        "Map worst downtime assets; build a spec conversation on grease, hydraulics, gear fills, CK-4, and coolant—verify every fill on tags, manuals, and current PDS.",
      operatingConditions: [
        "Continuous-duty circuits, heavy shock, and abrasive dust near crushing and conveying lines.",
        "Long hydraulic residence times and heat pockets on stackers, loaders, and haul tools.",
      ],
      commonPainPoints: [
        "Grease washout: pins, bushings, and slow-speed bearings after water and fines exposure",
        "Shock load on crushers, conveyors, and loader pivots",
        "Hydraulic heat, varnish, and slow cycles when ISO VG drifts",
        "Gearbox and final-drive wear trending in analysis",
        "Dust and fines elevating contamination on every circuit",
      ],
      priorityProductCategories: ["grease", "hydraulic_fluids", "gear_oils", "hd_engine_oils", "coolant"],
      buyingTriggers: [
        "Shutdown planning, oil analysis trending oxidation or particulate spikes",
        "Capital refresh on mobile crushing or load-out fleets",
      ],
      recommendedMessagingAngles: [
        "Reliability engineering tone: fluid tier matched to analysis and compartment tags.",
        "Load and contamination honesty—anchor to documented fit on current PDS.",
      ],
      relevantEquipmentTypes: [
        "Face shovels, wheel loaders, and haul trucks",
        "Crushers, screens, and stackers",
        "Support pickups and on-site lube service units",
      ],
      recommendedLfbbBlockIds: [
        "lfbb-hydraulic-oxidation-v1",
        "lfbb-hydraulic-uptime-v1",
        "lfbb-grease-shock-loading-v1",
        "lfbb-grease-water-ingress-v1",
      ],
    },
    {
      id: "construction",
      title: "Construction / Earthmoving — Field Playbook",
      profileTitle: "Construction / Earthmoving — Field Playbook",
      profileSubtitle: "Mixed OEM iron, hydraulics, pins, and seasonal mobilization",
      profileSummary:
        "Earthmoving and site contractors run mixed fleets, shared bulk, and emergency top-offs. Win on compartment discipline—hydraulics, pins, drivetrain, engines, and coolants mapped to tags, not drum color.",
      customerPainPoints: [
        { iconKey: "hydraulic", label: "Hydraulic leaks & failures", sub: "Slow cycles, heat, and filter trips when ISO VG or AW category drifts" },
        { iconKey: "shock", label: "Pins & bushings", sub: "Grease wash-off and thickener mistakes after pressure washing" },
        { iconKey: "contamination", label: "Mixed equipment", sub: "Yellow, orange, and rental iron sharing bulk tanks and hoses" },
        { iconKey: "bearing", label: "Driveline wear", sub: "Final drives and axles treated as interchangeable fills" },
        { iconKey: "downtime", label: "Production hours", sub: "Mobilization and peak season compress PM windows" },
        { iconKey: "washout", label: "Wash-down exposure", sub: "Outdoor duty strips commodity chemistry off critical joints" },
      ],
      equipmentTypes: [
        "Hydraulic excavators and wheel loaders",
        "Dozers, motor graders, and scrapers",
        "Rough-terrain cranes and compact equipment",
        "Off-road trucks and site support vehicles",
        "Rental and mixed-brand fleets on one yard",
      ],
      likelyLubricantNeeds: [
        { category: "AW / MV hydraulic fluids", role: "ISO VG-matched pump protection; seasonal coverage where tags allow" },
        { category: "Severe-duty grease programs", role: "Pins, bushings, and implement joints—NLGI and thickener per PDS" },
        { category: "Gear & drivetrain oils", role: "Final drives, axles, and reducers—one tag at a time" },
        { category: "CK-4 HD engine oils", role: "Support diesels and haul assets—API category from tag" },
        { category: "HD coolant programs", role: "Separate HD cooling from automotive bays" },
      ],
      recommendedProducts: [
        { name: "Professional & Advanced Formula Hydraulic Fluids", why: "Bulk fleet ISO VG baseline for mixed mobile iron" },
        { name: "MOLY TAC / ULTRA TAC Grease Programs", why: "Shock-loaded pins and wet site duty where PDS supports" },
        { name: "Commercial & Full Synthetic Gear Lubricants", why: "Drivetrain fills per compartment tag" },
        { name: "CK-4 Synthetic Blend HD Engine Oils", why: "Site support and haul diesel programs" },
      ],
      opportunitySignals: [
        "Hydraulic foam or slow response at first shift",
        "Grease incompatibility after auto-lube cart change",
        "New site startup or fleet expansion this season",
        "Comeback jobs after fluid or grease service",
        "Two bulk AW drums with no ISO VG labels",
      ],
      repTalkTrack: [
        "Start with production hours lost to hydraulics, pins, or drivetrain—not brand default.",
        "Map compartments before SKUs: main hydraulic, travel, swing, grease points, final drives, engine.",
        "Frame ISO VG as a spec conversation tied to tags and analysis.",
        "Position grease upgrades only where washout or shock load is documented.",
        "Never imply OEM approval unless the PDS states it for that SKU.",
      ],
      discoveryQuestions: [
        "Which machine classes drive worst downtime—excavator, loader, or crane?",
        "What ISO VG tags are on the worst-performing hydraulic circuit?",
        "Where did pins or bushings fail—after wash-down, shock, or wrong grease thickener?",
        "How are bulk hydraulics, grease, and engine oil separated on site?",
        "What does your mobilization PM include beyond engine oil?",
        "Who signs off on chemistry changes for shared bulk tanks?",
      ],
      crossSell: [
        "Hydraulic fluids — AW / MV / synthetic ladder",
        "Grease — severe-duty and moly programs",
        "Gear oils — final drives and axles",
        "HD engine oils — CK-4 site fleets",
        "Coolants — HD NOAT / OAT discipline",
        "ENVIRO / EAL — sensitive site companions where PDS allows",
      ],
      cautions: [CUSTOMER_PROFILE_DISCLAIMER, "Do not assume one hydraulic grade fits all pump circuits—verify each tag."],
      recommendedNextStep:
        "Build a site compartment map; run spec conversations on hydraulics, grease, gear, CK-4, and coolant—verify on equipment tags, manuals, and current PDS.",
      operatingConditions: [
        "High dust, shock loading on pins, and wide ambient swings between mobilization and peak heat.",
        "Mixed OEM iron on one yard—shared service trucks and emergency top-offs raise compatibility risk.",
      ],
      commonPainPoints: [
        "Hydraulic sluggishness, heat, and filter trips when ISO VG drifts",
        "Grease wash-off or incompatibility after pressure washing",
        "Mixed OEM fleets sharing bulk without hose discipline",
        "Driveline fills treated as interchangeable",
      ],
      priorityProductCategories: ["hydraulic_fluids", "grease", "gear_oils", "hd_engine_oils", "coolant"],
      buyingTriggers: ["New site startup, fleet expansion, or seasonal mobilization", "Comeback jobs after fluid or grease changes"],
      recommendedMessagingAngles: [
        "Spec-first: NLGI / thickener and ISO VG tied to tags—not shelf talk.",
        "Uptime: cycle confidence, filter life, and clean bulk discipline.",
      ],
      relevantEquipmentTypes: ["Hydraulic excavators and wheel loaders", "Dozers and motor graders", "Rough-terrain cranes"],
      recommendedLfbbBlockIds: [
        "lfbb-grease-shock-loading-v1",
        "lfbb-grease-water-ingress-v1",
        "lfbb-hydraulic-uptime-v1",
        "lfbb-hydraulic-oxidation-v1",
      ],
    },
    {
      id: "forestry_logging",
      title: "Forestry & Logging — Field Playbook",
      profileTitle: "Forestry & Logging — Field Playbook",
      profileSubtitle: "Harvesters, skidders, bar/chain, and steep-slope reliability",
      profileSummary:
        "Logging accounts fight moisture, pitch, shock load, and seasonal peaks. Position bar/chain, hydraulics, grease, and drivetrain programs for uptime in the bush—verify ENVIRO/EAL only where tags and PDS support sensitive sites.",
      customerPainPoints: [
        { iconKey: "contamination", label: "Pitch & sap", sub: "Bar/chain and guide wear when tack retention slips" },
        { iconKey: "hydraulic", label: "Hydraulic heat", sub: "Harvesters and forwarders under continuous swing and track load" },
        { iconKey: "shock", label: "Shock & vibration", sub: "Pins, bushings, and wheel motors in rough terrain" },
        { iconKey: "washout", label: "Water ingress", sub: "Outdoor duty and ford crossings elevate corrosion risk" },
        { iconKey: "downtime", label: "Harvest window", sub: "Short seasonal peaks when iron must stay running" },
      ],
      equipmentTypes: [
        "Feller bunchers, harvesters, and processors",
        "Skidders, forwarders, and log loaders",
        "Chainsaws and bar/chain systems (shop program)",
        "Knuckleboom loaders and grapple yards",
        "Support trucks and service pickups",
      ],
      likelyLubricantNeeds: [
        { category: "Bar & chain / tackifier programs", role: "Saw systems—use PDS-listed forestry formulations only" },
        { category: "AW / MV hydraulics", role: "Harvest and material-handling circuits" },
        { category: "Severe-duty grease", role: "Pins, booms, and undercarriage in wet duty" },
        { category: "Gear oils", role: "Drivetrain, differentials, and swing drives" },
        { category: "ENVIRO / EAL hydraulics", role: "Sensitive harvest blocks and water-adjacent duty where PDS allows" },
      ],
      recommendedProducts: [
        { name: "Industrial Specialty Bar & Chain Oils", why: "Tack and adhesion conversation for saw systems per PDS application lists" },
        { name: "AW & Multi-Viscosity Hydraulic Fluids", why: "Mobile hydraulic baseline for harvest fleets" },
        { name: "MOLY TAC / ULTRA TAC Grease", why: "Boom and pin programs in shock and moisture" },
        { name: "ENVIRO / BIO Hydraulic Fluids", why: "Sensitive-site spec conversation only where tags and PDS support" },
      ],
      opportunitySignals: [
        "Bar/chain consumption spikes without production gains",
        "Hydraulic overheating on harvesters mid-shift",
        "Grease washout on skidders after wet weeks",
        "Customer asking for biodegradable options on new cut blocks",
        "Seasonal PM rush before spring road bans lift",
      ],
      repTalkTrack: [
        "Lead with harvest uptime and bar/chain cost per cord—not generic AW pricing.",
        "Separate bar/chain, hydraulic, grease, and drivetrain conversations by compartment.",
        "Use ENVIRO/EAL only as a documented spec path for sensitive sites.",
        "Anchor tack and adhesion claims to PDS rows for forestry duty.",
        "Close with tag and manual verification before any chemistry change.",
      ],
      discoveryQuestions: [
        "What iron dominates hours—harvester, skidder, or yard loader?",
        "Where is bar/chain cost hurting margin—pitch, heat, or misapplication?",
        "Which circuits run hottest on processors or forwarders?",
        "Are any blocks requiring biodegradable or EAL chemistry on tag?",
        "How do you separate bulk tanks for hydraulics, gear, and bar oil?",
        "What does your spring PM bundle include beyond engine oil?",
      ],
      crossSell: [
        "Industrial specialty — bar/chain and tack programs",
        "Hydraulic fluids — AW / MV mobile programs",
        "Grease — severe-duty boom and pin protection",
        "Gear oils — drivetrain and differentials",
        "ENVIRO / EAL — sensitive-site hydraulics",
        "HD engine oils — support truck fleets",
      ],
      cautions: [
        CUSTOMER_PROFILE_DISCLAIMER,
        "Do not position ENVIRO/EAL without equipment tag and PDS support for that site.",
        "Bar/chain chemistry is not interchangeable with general hydraulic AW.",
      ],
      recommendedNextStep:
        "Map harvest, skid, and yard compartments; align bar/chain, hydraulics, grease, and gear programs to tags, manuals, and current PDS.",
      operatingConditions: [
        "Continuous hydraulic duty, pitch contamination, and moisture in outdoor bush operations.",
        "Seasonal peaks and mixed-brand iron on contractor yards.",
      ],
      commonPainPoints: [
        "Bar/chain wear and tack retention in pitch-heavy duty",
        "Hydraulic heat on harvest and forward systems",
        "Grease washout and pin wear in wet terrain",
      ],
      priorityProductCategories: ["industrial_specialty", "hydraulic_fluids", "grease", "gear_oils", "environmental_eal"],
      buyingTriggers: ["Spring harvest mobilization", "New sensitive-site harvest plans"],
      recommendedMessagingAngles: [
        "Uptime per machine hour in the cut block.",
        "Documented forestry formulations—not farm-store substitutes.",
      ],
      relevantEquipmentTypes: ["Harvesters and feller bunchers", "Skidders and forwarders", "Yard loaders"],
      recommendedLfbbBlockIds: ["lfbb-hydraulic-uptime-v1", "lfbb-grease-water-ingress-v1", "lfbb-grease-shock-loading-v1"],
    },
    {
      id: "food_processing",
      title: "Food Processing — Field Playbook",
      profileTitle: "Food Processing — Field Playbook",
      profileSubtitle: "Washdown, audit readiness, and food-adjacent circuits",
      profileSummary:
        "Plants need documented food-grade discipline on incidental-contact circuits, compressors, and hydraulics near packaging—not farm-store substitutes. Lead with audit readiness and NSF H1 where the PDS supports the application.",
      customerPainPoints: [
        { iconKey: "contamination", label: "Audit readiness", sub: "SQF/HACCP expects labeled H1 inventory at food-adjacent manifolds" },
        { iconKey: "washout", label: "Washdown", sub: "Heat, foam, and water separation when schedules compress PM" },
        { iconKey: "hydraulic", label: "Hydraulic reliability", sub: "Packaging and filler lines sensitive to sluggish or contaminated fluid" },
        { iconKey: "bearing", label: "Compressor deposits", sub: "Wrong R&O class mistaken for compressor chemistry" },
        { iconKey: "downtime", label: "Line stoppage", sub: "Emergency maintenance borrowing non-H1 fluid from the farm store" },
      ],
      equipmentTypes: [
        "Formers, fillers, and packaging hydraulics",
        "Conveyors and lifts in hygienic zones",
        "Rotary screw and reciprocating compressors",
        "Cold-storage lift trucks in hygienic areas",
        "CIP-adjacent utility hydraulics",
      ],
      likelyLubricantNeeds: [
        { category: "Food-grade hydraulic oils (NSF H1)", role: "Food-adjacent circuits—exact SKU and ISO VG from PDS at each manifold" },
        { category: "Food-grade grease (NSF H1)", role: "Bearings and joints near open product zones where PDS allows" },
        { category: "Compressor & R&O oils", role: "Rotary screw programs—not AW in compressor sumps" },
        { category: "AW hydraulics (non-food zones)", role: "Utility and non-product areas—clearly segregated bulk" },
      ],
      recommendedProducts: [
        { name: "FOOD-GRADE Hydraulic Oils", why: "NSF H1 spec conversation for food-adjacent hydraulics per PDS" },
        { name: "FOOD-GRADE EP-2 Grease", why: "Incidental-contact grease points where PDS lists H1 duty" },
        { name: "Long Life Turbine / Compressor Oils", why: "R&O compressor programs separate from hydraulic AW" },
      ],
      opportunitySignals: [
        "Audit finding on unlabeled or non-H1 fluid at a food-adjacent circuit",
        "Foam or sluggish hydraulics after washdown windows",
        "Compressor varnish trending in analysis",
        "Maintenance borrowed AW from industrial store during a weekend stop",
        "Plant engineering refresh on lubrication SOPs",
      ],
      repTalkTrack: [
        "Open with audit risk and line stoppage cost—not premium price per drum.",
        "Post exact NSF H1 SKU and ISO VG from the PDS at each food-adjacent manifold.",
        "Never claim H1 where the PDS does not document incidental contact for that product.",
        "Separate compressor R&O from hydraulic AW in the store and on work orders.",
        "Pair fluid tier with filtration and breathers where OEM allows.",
      ],
      discoveryQuestions: [
        "Which circuits are food-adjacent vs utility-only on your diagram?",
        "What did your last audit flag on lubrication labeling or storage?",
        "Where is foam, heat, or sluggish response showing up after washdown?",
        "What compressor chemistry is in service today—and who approves changes?",
        "How are H1 and non-H1 bulk tanks hose-separated?",
        "Who owns lubrication SOP updates before the next audit window?",
      ],
      crossSell: [
        "Food-grade hydraulics and grease — NSF H1 where PDS supports",
        "Compressor oils — R&O programs",
        "Filtration & breathers — contamination control",
        "Industrial AW — clearly segregated non-food zones",
      ],
      cautions: [
        CUSTOMER_PROFILE_DISCLAIMER,
        "NSF H1 only where the current PDS documents incidental food contact for that SKU and duty.",
        "Do not use AW hydraulic fluid in compressor or dry R&O circuits without compatibility review.",
      ],
      recommendedNextStep:
        "Walk food-adjacent manifolds; document H1 SKUs, ISO VG, and segregated bulk—verify on plant diagrams, manuals, and current PDS before the next audit.",
      operatingConditions: [
        "Wash-down schedules, allergen controls, and NSF incidental-contact expectations on adjacent hydraulics.",
        "Cold rooms and cook lines that still require reliable pump response.",
      ],
      commonPainPoints: [
        "Wrong non-H1 fluid borrowed during emergency maintenance",
        "Foam and water separation when heat loads spike",
        "Compressor chemistry confused with hydraulic AW",
      ],
      priorityProductCategories: ["food_grade", "compressor_oils", "hydraulic_fluids"],
      buyingTriggers: ["SQF / HACCP refresh requiring documented H1 inventory", "OEM audit of hydraulic cleanliness"],
      recommendedMessagingAngles: [
        "NSF H1 first: exact SKU from PDS posted at each manifold.",
        "Audit-ready labeling and segregated bulk discipline.",
      ],
      relevantEquipmentTypes: ["Formers, fillers, and conveyors", "Compressors", "Hygienic-area lift trucks"],
      recommendedLfbbBlockIds: ["lfbb-hydraulic-uptime-v1", "lfbb-hydraulic-oxidation-v1"],
    },
    {
      id: "agriculture",
      title: "Agriculture — Field Playbook",
      profileTitle: "Agriculture — Field Playbook",
      profileSubtitle: "Seasonal PM, wet brake, trans-drive, and harvest uptime",
      profileSummary:
        "Ag dealers and producers need reservoir discipline across tractor sumps, implements, and support trucks. Win on seasonal bundles—trans-drive, grease, engine, and coolant—verified on tags, not one red fluid drum for every compartment.",
      customerPainPoints: [
        { iconKey: "hydraulic", label: "Wet brake chatter", sub: "Often fluid category in the common sump—not hardware alone" },
        { iconKey: "shock", label: "Seasonal uptime", sub: "Planting and harvest windows compress shop capacity" },
        { iconKey: "contamination", label: "Field moisture & dust", sub: "Outdoor duty on PTO and implement grease points" },
        { iconKey: "downtime", label: "Counter confusion", sub: "Engine oil vs trans-hydraulic cases on compact tractors" },
        { iconKey: "bearing", label: "Implement neglect", sub: "Balers and tillage still see shock load and washout" },
      ],
      equipmentTypes: [
        "Row-crop and utility tractors",
        "Combines, sprayers, and planters",
        "Balers, mowers, and grain handling",
        "Skid steers and telehandlers on the farm",
        "Support trucks on the same account card",
      ],
      likelyLubricantNeeds: [
        { category: "Tractor / UTHF fluids", role: "Wet brake and trans-hydraulic discipline per tag" },
        { category: "AGRIMAX trans-drive programs", role: "Seasonal depth where PDS lists ag duty" },
        { category: "CK-4 HD engine oils", role: "High-hour seasonal diesel" },
        { category: "Grease programs", role: "Chassis, PTO, and implement PM" },
        { category: "Coolant (ELC)", role: "Bundled planting and harvest programs" },
      ],
      recommendedProducts: [
        { name: "Universal Red Tractor Fluid", why: "Baseline UTHF entry—verify wet-brake compatibility on tag and PDS" },
        { name: "AGRIMAX Trans Drive Hydraulic Fluid", why: "Trans-drive program depth for ag accounts" },
        { name: "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend", why: "Seasonal diesel engine program per PDS" },
        { name: "RED TAC / AGRIMAX Poly Tac Grease", why: "Field and chassis PM companions" },
      ],
      opportunitySignals: [
        "Wet brake noise after fluid service",
        "Harvest PM kit missing trans-drive or grease",
        "Customer buying one OEM jug for every reservoir",
        "Spring bulk fill before planting rush",
        "Telehandler hydraulics on wrong AW grade",
      ],
      repTalkTrack: [
        "Lead with harvest or planting uptime—which reservoir cost hours last season?",
        "Map transmission, hydraulic, wet brake, engine, and grease before quoting one SKU.",
        "Treat wet brake chatter as a spec conversation, not a bleed job default.",
        "Bundle seasonal PM with documented PDS lines per compartment.",
        "Never imply OEM tractor approval unless on the PDS for that product.",
      ],
      discoveryQuestions: [
        "Which models drive your seasonal PM volume?",
        "What fluid types do tags require in trans, hydraulic, and wet-brake sumps?",
        "Where did wet brake chatter appear after service?",
        "What is in today's planting or harvest bundle beyond engine oil?",
        "Are bulk UTHF and AW tanks separated and labeled?",
        "Who approves chemistry changes on brand-loyal accounts?",
      ],
      crossSell: [
        "Tractor / UTHF — trans-drive and wet-brake programs",
        "AGRIMAX — seasonal engine, trans-drive, grease, coolant",
        "Grease — PTO and implement PM",
        "Hydraulic AW — loaders and telehandlers",
        "CK-4 — support trucks",
      ],
      cautions: [CUSTOMER_PROFILE_DISCLAIMER, "UTHF, wet-brake, and standalone hydraulic circuits are not interchangeable."],
      recommendedNextStep:
        "Draw a reservoir map for tractors and implements; bundle trans-drive, grease, engine, and coolant for seasonal PM—verify on tags, manuals, and current PDS.",
      operatingConditions: [
        "Field moisture, dust, and temperature swings around planting and harvest.",
        "Shared tractor sumps where wet brake / PTO chemistry must match categories on tag.",
      ],
      commonPainPoints: [
        "Wet brake chatter after wrong universal fluid in the common sump",
        "Grease wash-off on implements and PTO equipment",
        "Counter confusion between engine and trans-hydraulic cases",
      ],
      priorityProductCategories: ["tractor_fluids", "grease", "hd_engine_oils", "coolant"],
      buyingTriggers: ["Pre-season bulk fills and spring counter rush", "Operator noise complaints after self-service adds"],
      recommendedMessagingAngles: [
        "Case-cap and UTHF discipline—train the yard before the emergency jug.",
        "Implement grease tied to moisture and shock, not generic HD slogans.",
      ],
      relevantEquipmentTypes: ["Row-crop and utility tractors", "Combines and sprayers", "Implements and grain handling"],
      recommendedLfbbBlockIds: [
        "lfbb-tractor-wet-brake-chatter-v1",
        "lfbb-grease-water-ingress-v1",
        "lfbb-grease-shock-loading-v1",
      ],
    },
    {
      id: "marine_dredging",
      title: "Marine / Dredging — Field Playbook",
      profileTitle: "Marine / Dredging — Field Playbook",
      profileSubtitle: "Water-adjacent duty, EAL conversations, and mobile marine hydraulics",
      profileSummary:
        "Marine and dredging contractors face water ingress, corrosion, and regulatory pressure on sensitive waterways. Lead with compartment discipline and ENVIRO/EAL spec conversations only where tags, manuals, and PDS support the application.",
      customerPainPoints: [
        { iconKey: "washout", label: "Water ingress", sub: "Corrosion and emulsion risk on deck equipment and hydraulics" },
        { iconKey: "hydraulic", label: "Hydraulic reliability", sub: "Dredge pumps, winches, and crane circuits under load" },
        { iconKey: "contamination", label: "Environmental scrutiny", sub: "Spill sensitivity on rivers, harbors, and coastal jobs" },
        { iconKey: "bearing", label: "Gear & winch wear", sub: "Slow-speed drives and open gearing exposure" },
        { iconKey: "downtime", label: "Seasonal contracts", sub: "Short windows when dredges must stay on station" },
      ],
      equipmentTypes: [
        "Hydraulic dredges and booster pumps",
        "Deck cranes, winches, and anchor systems",
        "Tug-assist and work boats on the same bid",
        "Generator and auxiliary diesel packages",
        "Shore-side support and lube barges",
      ],
      likelyLubricantNeeds: [
        { category: "ENVIRO / BIO / EAL hydraulics", role: "Sensitive waterway duty where PDS and tags require biodegradable or EAL chemistry" },
        { category: "AW / MV hydraulics", role: "Non-sensitive auxiliary circuits—still ISO VG per tag" },
        { category: "Marine & industrial gear oils", role: "Winches, reducers, and open gear where PDS lists duty" },
        { category: "CK-4 / marine diesel engine oils", role: "Main and aux engines—category from tag" },
        { category: "Grease programs", role: "Deck pins, couplers, and exposed joints" },
      ],
      recommendedProducts: [
        { name: "ENVIRO / BIO-Synthetic EAL Hydraulic Oils", why: "Sensitive-site hydraulic spec conversation per PDS" },
        { name: "BIO Biodegradable AW Hydraulic Fluids", why: "Where tags call for readily biodegradable AW duty" },
        { name: "Industrial EP Gear Lubricants", why: "Enclosed winch and reducer fills" },
        { name: "MOLY TAC Grease", why: "Exposed joints and couplers in wet salt exposure" },
      ],
      opportunitySignals: [
        "Contract spec requiring biodegradable or EAL chemistry",
        "Hydraulic emulsion or corrosion after water exposure",
        "Customer mixing industrial AW with EAL bulk on deck",
        "New dredge mobilization before seasonal window",
        "Winch or reducer failures on analysis trending metals",
      ],
      repTalkTrack: [
        "Open with contract environmental requirements and spill exposure—not generic AW price.",
        "Separate EAL, AW, gear, and grease compartments on the deck schematic.",
        "Position ENVIRO/BIO only where tags and PDS document the duty—no implied regulatory approval.",
        "Use analysis on winch and hydraulic systems to justify tier conversations.",
        "Close with manual and tag verification for every fill discussed.",
      ],
      discoveryQuestions: [
        "What waterway constraints apply to this contract or yard?",
        "Which circuits are tagged EAL vs standard AW on the dredge?",
        "Where are you seeing emulsion, corrosion, or slow hydraulics?",
        "How are deck bulk tanks labeled and hose-separated?",
        "What is on the mobilization PM checklist before launch?",
        "Who approves chemistry changes when specs tighten mid-season?",
      ],
      crossSell: [
        "ENVIRO / EAL hydraulics — sensitive-site programs",
        "AW hydraulics — auxiliary circuits",
        "Gear oils — winches and reducers",
        "Grease — deck and coupler PM",
        "HD engine oils — main and aux diesels",
      ],
      cautions: [
        CUSTOMER_PROFILE_DISCLAIMER,
        "EAL/BIO positioning only where equipment tags and current PDS support—no implied VGP or agency approval.",
        "Do not top off EAL circuits with industrial AW without flush and compatibility review.",
      ],
      recommendedNextStep:
        "Map deck and dredge compartments; align EAL, hydraulic, gear, grease, and engine programs to contract tags, manuals, and current PDS.",
      operatingConditions: [
        "Water-adjacent hydraulics with corrosion and environmental scrutiny on waterways.",
        "Seasonal contracts compressing mobilization and PM windows.",
      ],
      commonPainPoints: [
        "Water ingress and corrosion on deck hydraulics",
        "Regulatory pressure on sensitive waterways",
        "Mixing EAL and industrial AW bulk on vessels",
      ],
      priorityProductCategories: ["environmental_eal", "hydraulic_fluids", "gear_oils", "grease", "hd_engine_oils"],
      buyingTriggers: ["New dredge contract with environmental fluid specs", "Mid-season hydraulic emulsion issues"],
      recommendedMessagingAngles: [
        "Contract-driven spec conversations tied to tags and PDS.",
        "Spill-risk reduction through segregated bulk and labeled manifolds.",
      ],
      relevantEquipmentTypes: ["Hydraulic dredges", "Deck winches and cranes", "Work boats"],
      recommendedLfbbBlockIds: ["lfbb-hydraulic-uptime-v1", "lfbb-grease-water-ingress-v1"],
    },
    {
      id: "shop_fleet_maintenance",
      title: "Shop / Fleet Maintenance — Field Playbook",
      profileTitle: "Shop / Fleet Maintenance — Field Playbook",
      profileSubtitle: "Mixed fleets, bulk discipline, and PM standardization",
      profileSummary:
        "In-house shops and fleet maintenance yards juggle Class 8, vocational, ag, and municipal iron on one card. Win with lane maps: engine API category, coolant inhibitor family, hydraulics ISO VG, and grease programs posted on the bulk chart.",
      customerPainPoints: [
        { iconKey: "contamination", label: "Bulk cross-contamination", sub: "Shared hoses between AW, coolant, and hydraulics" },
        { iconKey: "downtime", label: "PM throughput", sub: "Technicians topping wrong grade under bay pressure" },
        { iconKey: "hydraulic", label: "Mixed hydraulics", sub: "Skid steers, refuse, and loaders on different ISO VG tags" },
        { iconKey: "shock", label: "Soot & drain creep", sub: "Intervals stretched without sampling on vocational units" },
        { iconKey: "bearing", label: "Coolant confusion", sub: "HD NOAT, OAT, and universal green in one building" },
      ],
      equipmentTypes: [
        "Class 8 and vocational trucks in the same bay",
        "Municipal refuse, loaders, and snow equipment",
        "Ag and grounds tractors in parks or utility fleets",
        "Skid steers and telehandlers",
        "Central bulk tanks and tote programs",
      ],
      likelyLubricantNeeds: [
        { category: "CK-4 / FA-4 HD engine oils", role: "API category and viscosity per VIN/tag—not one bulk for all diesels" },
        { category: "HD coolant programs", role: "Inhibitor family matched to wet-sleeve vs automotive units" },
        { category: "AW / MV hydraulics", role: "ISO VG chart for mixed mobile iron" },
        { category: "Grease programs", role: "Chassis, fifth wheel, and municipal joints" },
        { category: "Transmission & gear oils", role: "Driveline fills per builder tag" },
      ],
      recommendedProducts: [
        { name: "Synthetic Blend & Full Synthetic CK-4", why: "Fleet engine tiering with analysis discipline" },
        { name: "Red Heavy Duty NOAT ELC / Gold OAT ELC", why: "Coolant programs by inhibitor family per PDS" },
        { name: "Multi-Viscosity AW Hydraulic Fluids", why: "Seasonal mobile hydraulic coverage" },
        { name: "MOLY TAC / Fifth Wheel Grease", why: "Vocational chassis PM bundles" },
      ],
      opportunitySignals: [
        "Technicians unsure CK-4 vs FA-4 on newer units",
        "Coolant gel after universal green top-off",
        "Shop wants one poster for all bulk guns",
        "RFP or cooperative contract renewal",
        "Municipal parks equipment on wrong fluid from shared store",
      ],
      repTalkTrack: [
        "Lead with bay throughput and comeback reduction—not lowest bulk price.",
        "Build a bulk chart: engine API, coolant inhibitor, hydraulic ISO VG, grease NLGI.",
        "Train technicians on FA-4 vs CK-4 using VIN/tag—not model year guesses.",
        "Separate HD coolant from automotive OAT physically and on work orders.",
        "Position KLONDIKE as a program across categories where PDS supports each line.",
      ],
      discoveryQuestions: [
        "What mix of highway, vocational, ag, and municipal units share this shop?",
        "How are bulk tanks labeled today—and where do hoses cross?",
        "What comebacks hit the bay most—coolant, engine, or hydraulics?",
        "Do you run oil analysis on any fleet segment?",
        "What does your standard work order include for fluids beyond engine oil?",
        "Who owns the bulk chart when a new unit class is added?",
      ],
      crossSell: [
        "HD engine oils — CK-4 / FA-4 programs",
        "HD coolants — NOAT ELC and OAT families",
        "Hydraulic fluids — ISO VG ladder",
        "Grease — chassis and vocational joints",
        "Transmission & gear — driveline spec",
      ],
      cautions: [CUSTOMER_PROFILE_DISCLAIMER, "Never use automotive coolant shorthand for HD NOAT programs on wet-sleeve diesels."],
      recommendedNextStep:
        "Publish a shop bulk and lane map by VIN class; standardize CK-4/FA-4, coolant, hydraulic ISO VG, and grease—verify on tags, manuals, and current PDS.",
      operatingConditions: [
        "Mixed fleets sharing bulk, hoses, and technicians under one roof.",
        "Public or corporate scrutiny favoring documented PM programs.",
      ],
      commonPainPoints: [
        "Bulk cross-contamination between coolant, AW, and engine oil",
        "Technicians topping wrong grade under time pressure",
        "Coolant inhibitor families mixed in one building",
      ],
      priorityProductCategories: ["hd_engine_oils", "coolant", "hydraulic_fluids", "grease", "transmission"],
      buyingTriggers: ["RFP renewal or shop standardization initiative", "Coolant or engine comeback reduction goal"],
      recommendedMessagingAngles: [
        "Bulk chart discipline reduces comebacks.",
        "Documented programs beat ad hoc top-offs.",
      ],
      relevantEquipmentTypes: ["Class 8 tractors", "Vocational trucks", "Municipal and ag support units"],
      recommendedLfbbBlockIds: ["lfbb-hd-severe-duty-v1", "lfbb-hydraulic-uptime-v1", "lfbb-tractor-wet-brake-chatter-v1"],
    },
    {
      id: "co_ops",
      title: "Co-ops — Field Playbook",
      profileTitle: "Co-ops — Field Playbook",
      profileSubtitle: "Seasonal ag programs, bulk tanks, and member education",
      profileSummary:
        "Co-ops serve member-producers with seasonal peaks, bulk economics, and education gaps. Position reservoir discipline and AGRIMAX-style program depth—help staff explain why trans-drive, grease, and coolant belong on the seasonal bundle, verified on tags and PDS.",
      customerPainPoints: [
        { iconKey: "downtime", label: "Seasonal rush", sub: "Spring and harvest compress counter and bulk delivery capacity" },
        { iconKey: "hydraulic", label: "One-fluid habits", sub: "Members expect one red drum for every tractor compartment" },
        { iconKey: "contamination", label: "Bulk hygiene", sub: "Shared pumps between AW, UTHF, and diesel engine bulk" },
        { iconKey: "shock", label: "Member education", sub: "Staff time scarce to explain wet brake and UTHF differences" },
        { iconKey: "bearing", label: "Incomplete bundles", sub: "Filters and engine oil sold without trans-drive or grease" },
      ],
      equipmentTypes: [
        "Member row-crop and livestock operations",
        "Co-op delivery trucks and bulk wagons",
        "Seasonal applicators and sprayers",
        "Grain handling and dryer support",
        "Counter trade on mixed-brand tractors",
      ],
      likelyLubricantNeeds: [
        { category: "Tractor / UTHF & AGRIMAX trans-drive", role: "Member education on wet brake and trans-hydraulic categories" },
        { category: "CK-4 diesel programs", role: "Bulk tier for high-hour member diesels" },
        { category: "Grease programs", role: "Seasonal implement and chassis PM kits" },
        { category: "Coolant ELC", role: "Harvest and planting bundle companions" },
        { category: "AW hydraulics", role: "Loaders and grain systems—not assumed for every tractor sump" },
      ],
      recommendedProducts: [
        { name: "Universal Red Tractor Fluid", why: "Counter entry point—verify wet-brake tag before sale" },
        { name: "AGRIMAX Trans Drive Hydraulic Fluid", why: "Program depth for member seasonal PM" },
        { name: "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend", why: "Bulk diesel tier for member fleets" },
        { name: "AGRIMAX Extended Life Coolant", why: "Cooling companion on seasonal bundles" },
      ],
      opportunitySignals: [
        "Harvest prep without trans-drive on the bundle sheet",
        "Member wet brake chatter after self-service fluid purchase",
        "Bulk pump labeling confusion at the co-op rack",
        "Spring counter lines out the door with incomplete PM SKUs",
        "Board asking for documented fluid education for members",
      ],
      repTalkTrack: [
        "Help co-op staff sell reservoirs, not drums—use simple compartment maps at the counter.",
        "Bundle seasonal SKUs with documented PDS lines members can verify on their tags.",
        "Train on wet brake chatter as fluid category, not mechanical default.",
        "Keep bulk hose discipline visible at the rack—UTHF vs AW vs diesel.",
        "Position co-op programs as education plus chemistry—no implied OEM endorsement.",
      ],
      discoveryQuestions: [
        "What does your spring and harvest bundle include today?",
        "Where do members confuse engine oil, trans-drive, and hydraulic fills?",
        "How are bulk pumps labeled and separated at the rack?",
        "What member callbacks hit the counter most after fluid season?",
        "What education tools do staff need for wet brake and UTHF?",
        "Who approves new SKUs on the cooperative shelf plan?",
      ],
      crossSell: [
        "AGRIMAX — trans-drive, engine, grease, coolant",
        "Universal Red Tractor Fluid — UTHF entry",
        "Grease — implement and chassis PM",
        "CK-4 — member diesel bulk",
        "Hydraulic AW — loaders and grain gear",
      ],
      cautions: [CUSTOMER_PROFILE_DISCLAIMER, "Staff should never promise OEM-equivalent performance—refer members to tags and PDS."],
      recommendedNextStep:
        "Refresh seasonal bundle sheets and bulk rack labeling; equip staff with compartment maps and AGRIMAX program depth—verify on member equipment tags and current PDS.",
      operatingConditions: [
        "Seasonal peaks and member education gaps at the agricultural counter.",
        "Bulk economics with hose and tank discipline challenges.",
      ],
      commonPainPoints: [
        "Members buying one fluid for every compartment",
        "Incomplete seasonal PM kits at the counter",
        "Bulk cross-contamination at the rack",
      ],
      priorityProductCategories: ["tractor_fluids", "hd_engine_oils", "grease", "coolant"],
      buyingTriggers: ["Spring bulk fill programs", "Harvest prep merchandising"],
      recommendedMessagingAngles: [
        "Member education: compartments before products.",
        "Seasonal bundles tied to documented PDS lines.",
      ],
      relevantEquipmentTypes: ["Member tractors and combines", "Co-op bulk delivery", "Grain systems"],
      recommendedLfbbBlockIds: ["lfbb-tractor-wet-brake-chatter-v1", "lfbb-grease-water-ingress-v1"],
    },
    {
      id: "truck_dealers",
      title: "Truck Dealers — Field Playbook",
      profileTitle: "Truck Dealers — Field Playbook",
      profileSubtitle: "Service bay standardization, CK-4/FA-4, coolant, and driveline",
      profileSummary:
        "Truck dealerships win when the service lane runs one documented program per fluid family—CK-4/FA-4, HD coolant inhibitor type, transmission, gear, chassis grease—verified on VIN tags and current PDS, not brand-default fluids.",
      customerPainPoints: [
        { iconKey: "downtime", label: "Bay comebacks", sub: "Coolant and driveline issues after incomplete lane bundles" },
        { iconKey: "contamination", label: "CK-4 vs FA-4 confusion", sub: "Newer tractors spec FA-4 while older stock stays CK-4" },
        { iconKey: "bearing", label: "Coolant programs", sub: "HD NOAT vs OAT vs universal green in shared supply" },
        { iconKey: "shock", label: "Driveline spec", sub: "Trans and differential fills treated as 80W-90 habit" },
        { iconKey: "hydraulic", label: "PTO hydraulics", sub: "Vocational units topped from main AW bulk" },
      ],
      equipmentTypes: [
        "Class 8 highway tractors in for PM",
        "Vocational dump, mixer, and municipal chassis",
        "Medium-duty delivery and service trucks",
        "Dealer service lanes and quick-lube bays",
        "Parts counter bulk and packaged top-offs",
      ],
      likelyLubricantNeeds: [
        { category: "CK-4 & FA-4 HD engine oils", role: "VIN-driven API category—document lane chart by model year" },
        { category: "HD coolant (NOAT ELC / OAT ELC)", role: "Inhibitor family per wet-sleeve tag—no automotive shorthand" },
        { category: "Transmission & commercial gear oils", role: "ATF and axle fills per builder spec" },
        { category: "Chassis & fifth wheel grease", role: "Vocational PM completion in the lane" },
        { category: "Hydraulic AW", role: "PTO and hoist circuits—not engine bulk" },
      ],
      recommendedProducts: [
        { name: "SAE 5W-40 & 15W-40 Full Synthetic CK-4", why: "Premium lane upgrade where analysis and PDS support" },
        { name: "Synthetic Blend CK-4", why: "Volume lane baseline with documented API category" },
        { name: "Red Heavy Duty NOAT ELC / Gold OAT ELC", why: "HD coolant spec conversation by inhibitor family" },
        { name: "Commercial Gear Lubricants & ATF", why: "Driveline fills per axle and trans tags" },
        { name: "MOLY TAC / Fifth Wheel Grease", why: "Chassis lane bundle add-on" },
      ],
      opportunitySignals: [
        "Service manager unsure FA-4 eligibility on 2022+ stock",
        "Coolant warranty concern after roadside top-off",
        "Transmission comeback after gear oil in automated box",
        "Lane work order sells engine oil only—no coolant or grease line",
        "Parts wants single poster for all HD fluids",
      ],
      repTalkTrack: [
        "Open with bay comeback cost and lane throughput—not lowest packaged price.",
        "Publish VIN-year chart for CK-4 vs FA-4 with PDS references.",
        "Match coolant inhibitor family to HD tags—train parts counter on NOAT vs OAT naming.",
        "Walk trans, axle, and PTO as separate line items on the work order.",
        "Bundle lane chemistry where each SKU is documented on current PDS.",
      ],
      discoveryQuestions: [
        "What model years and engine families dominate your lane this quarter?",
        "How are FA-4-eligible units flagged on the work order?",
        "Where are coolant comebacks originating—top-off, flush, or wrong inhibitor?",
        "Which transmissions need spec verification beyond gear oil habit?",
        "What is included in your standard PM lane bundle today?",
        "How does parts counter support PTO and hoist hydraulic tags?",
      ],
      crossSell: [
        "HD engine oils — CK-4 / FA-4 synthetic programs",
        "HD coolants — NOAT and OAT families",
        "Transmission & gear — driveline spec",
        "Grease — fifth wheel and chassis",
        "Hydraulic AW — PTO and hoist",
        "Brake & steering fluids — lane completion",
      ],
      cautions: [
        CUSTOMER_PROFILE_DISCLAIMER,
        "FA-4 is not a blanket upgrade—verify engine tag, emissions generation, and PDS.",
        "Do not imply OEM dealership approval unless PDS uses that exact language.",
      ],
      recommendedNextStep:
        "Build a dealer lane fluid chart by VIN class; standardize CK-4/FA-4, coolant, trans, gear, grease, and PTO hydraulics—verify on tags, manuals, and current PDS.",
      operatingConditions: [
        "High-volume service lanes with mixed model years and vocational configurations.",
        "Parts and service sharing bulk supply under OEM dealership programs.",
      ],
      commonPainPoints: [
        "CK-4 vs FA-4 confusion on newer tractors",
        "Coolant inhibitor families mixed in supply",
        "Incomplete lane bundles beyond engine oil",
      ],
      priorityProductCategories: ["hd_engine_oils", "coolant", "transmission", "grease", "hydraulic_fluids"],
      buyingTriggers: ["New model year service bulletins", "Lane comeback reduction initiatives"],
      recommendedMessagingAngles: [
        "Lane standardization reduces comebacks.",
        "VIN-first spec conversations at parts and service.",
      ],
      relevantEquipmentTypes: ["Class 8 tractors", "Vocational trucks", "Dealer service lanes"],
      recommendedLfbbBlockIds: ["lfbb-hd-severe-duty-v1", "lfbb-synthetics-upgrade-v1"],
    },
    {
      id: "equipment_dealers",
      title: "Equipment Dealers — Field Playbook",
      profileTitle: "Equipment Dealers — Field Playbook",
      profileSubtitle: "OEM-labeled iron, seasonal PM kits, and compartment education",
      profileSummary:
        "Equipment dealers sell iron and PM—customers expect OEM-fluid habits. Help dealer parts and service staff run compartment spec conversations and KLONDIKE program depth where tags and PDS support the duty, without implying OEM endorsement.",
      customerPainPoints: [
        { iconKey: "hydraulic", label: "Reservoir confusion", sub: "Customers expect one OEM-colored drum for every compartment" },
        { iconKey: "downtime", label: "Seasonal PM gaps", sub: "Filters sold without trans-drive, grease, or coolant companions" },
        { iconKey: "shock", label: "Wet brake callbacks", sub: "Compact ag and utility tractors after wrong UTHF" },
        { iconKey: "contamination", label: "Counter pressure", sub: "Staff default to OEM jug without tag check" },
        { iconKey: "bearing", label: "Missed upsell", sub: "Parts margin left on grease and hydraulic ISO VG discipline" },
      ],
      equipmentTypes: [
        "Construction and earthmoving iron on the lot",
        "Compact ag and utility tractors",
        "Skid steers, telehandlers, and attachments",
        "Dealer PDIs and seasonal PM kits",
        "Customer mixed fleets under dealer service contracts",
      ],
      likelyLubricantNeeds: [
        { category: "AW / MV hydraulics", role: "Excavator, loader, and tool carrier circuits—ISO VG per tag" },
        { category: "Tractor / UTHF & AGRIMAX programs", role: "Ag-adjacent dealer lines—wet brake discipline" },
        { category: "Grease programs", role: "PDI and seasonal implement PM" },
        { category: "Gear & drivetrain oils", role: "Final drives and axles on mobile iron" },
        { category: "CK-4 & coolant", role: "Support trucks and diesel tools on the lot" },
      ],
      recommendedProducts: [
        { name: "Professional & Advanced Formula Hydraulics", why: "Earthmoving and compact iron ISO VG baseline" },
        { name: "AGRIMAX Trans Drive / Universal Red Tractor Fluid", why: "Ag and utility dealer PM depth per tag" },
        { name: "MOLY TAC / RED TAC Grease", why: "PDI and seasonal chassis bundles" },
        { name: "Commercial Gear Lubricants", why: "Final drive conversations on excavators and loaders" },
      ],
      opportunitySignals: [
        "PDI kits missing grease or trans-drive SKUs",
        "Customer wet brake chatter within 50 hours of delivery",
        "Lot iron using shop AW for every hydraulic fill",
        "Seasonal PM promotion without compartment map handout",
        "Parts manager wants KLONDIKE chart for ISO VG by machine class",
      ],
      repTalkTrack: [
        "Equip parts staff to ask for compartment tags before quoting one fluid.",
        "Build PDI bundles by machine class—not one-size seasonal box.",
        "Use AGRIMAX and AW programs as spec depth where PDS lists duty—no implied OEM approval.",
        "Train lot techs on separating travel, swing, and main hydraulics on excavators.",
        "Close with: verify on equipment tags, manuals, and current PDS.",
      ],
      discoveryQuestions: [
        "Which machine classes drive your PDI and seasonal PM volume?",
        "What is in today's PDI box beyond engine oil and filters?",
        "Where do customers return with wet brake or hydraulic complaints?",
        "How do parts counter staff document tag readings today?",
        "Do lot technicians share bulk between AW and UTHF?",
        "Who approves non-OEM fluid SKUs on the dealer shelf plan?",
      ],
      crossSell: [
        "Hydraulic fluids — AW / MV / synthetic ladder",
        "AGRIMAX & UTHF — ag and utility programs",
        "Grease — PDI and implement PM",
        "Gear oils — final drives and axles",
        "CK-4 & coolant — support fleets",
      ],
      cautions: [
        CUSTOMER_PROFILE_DISCLAIMER,
        "Do not claim equipment OEM approval unless the PDS states it for that exact product.",
        "Dealer programs must still respect compartment tags on each machine.",
      ],
      recommendedNextStep:
        "Publish machine-class PDI and seasonal maps for parts and lot service; align hydraulics, UTHF, grease, gear, and support-diesel programs to tags, manuals, and current PDS.",
      operatingConditions: [
        "OEM-branded iron with customer expectation of OEM fluids.",
        "Seasonal PDI and counter peaks on mixed construction and ag lines.",
      ],
      commonPainPoints: [
        "One-fluid habits across compartments",
        "Incomplete PDI kits",
        "Wet brake chatter after delivery",
      ],
      priorityProductCategories: ["hydraulic_fluids", "tractor_fluids", "grease", "gear_oils", "hd_engine_oils"],
      buyingTriggers: ["New model launch PDI standards", "Seasonal PM campaigns"],
      recommendedMessagingAngles: [
        "Compartment education at the counter beats single-SKU habit.",
        "Program depth where PDS supports—no OEM endorsement implied.",
      ],
      relevantEquipmentTypes: ["Earthmoving and compact iron", "Utility tractors", "Attachments and skid steers"],
      recommendedLfbbBlockIds: [
        "lfbb-hydraulic-uptime-v1",
        "lfbb-tractor-wet-brake-chatter-v1",
        "lfbb-grease-shock-loading-v1",
      ],
    },
    /* Legacy archetypes retained for catalog cross-references */
    {
      id: "trucking_fleet",
      title: "Trucking & Fleet — Field Playbook",
      profileTitle: "Trucking & Fleet — Field Playbook",
      profileSubtitle: "Class 8, vocational, and terminal mixed fleets",
      profileSummary:
        "Fleet operators need API category discipline, coolant separation, and analysis-backed drain intervals—not mileage myths. Position CK-4/FA-4, HD coolant, driveline, and chassis grease as a fleet card program verified on tags and PDS.",
      customerPainPoints: [
        { iconKey: "contamination", label: "Soot & fuel dilution", sub: "Intervals creep without sampling on vocational segments" },
        { iconKey: "bearing", label: "Aftertreatment sensitivity", sub: "SAPS or category mismatch at the bulk gun" },
        { iconKey: "downtime", label: "Roadside top-offs", sub: "Coolant and engine PO discipline breaks down on the road" },
        { iconKey: "hydraulic", label: "PTO circuits", sub: "Vocational hydraulics from wrong bulk source" },
      ],
      equipmentTypes: ["Class 8 tractors", "Vocational straight trucks", "Terminal tractors", "Pickup pools on the same account"],
      likelyLubricantNeeds: [
        { category: "CK-4 / FA-4 HD engine oils", role: "Fleet API category by VIN and duty" },
        { category: "HD coolant programs", role: "NOAT ELC discipline on wet-sleeve diesels" },
        { category: "Grease programs", role: "Fifth wheel and chassis" },
      ],
      recommendedProducts: [
        { name: "Full Synthetic CK-4", why: "Premium fleet upgrade with analysis per PDS" },
        { name: "Commercial HD NOAT ELC Coolant", why: "HD cooling baseline" },
        { name: "MOLY TAC Grease", why: "Chassis and fifth wheel PM" },
      ],
      opportunitySignals: ["Fleet manager reviewing bulk tiers", "Winter viscosity complaints", "Coolant failures after roadside top-off"],
      repTalkTrack: [
        "Anchor API category and viscosity to VIN and OEM manual language.",
        "Use analysis before synthetic upgrade conversations.",
        "Separate HD coolant from automotive chemistry on the bulk chart.",
      ],
      discoveryQuestions: [
        "What duty segments dominate—OTR, vocational, or mixed?",
        "Do you sample soot and fuel dilution on vocational units?",
        "How are bulk tanks labeled for HD vs automotive coolant?",
      ],
      crossSell: ["HD engine oils", "HD coolants", "Grease", "Commercial gear lubricants"],
      cautions: [CUSTOMER_PROFILE_DISCLAIMER],
      recommendedNextStep: "Segment fleet card by API category, coolant inhibitor, and driveline—verify on tags and current PDS.",
      operatingConditions: ["High miles with severe idle and PTO profiles", "Bulk programs with cross-grade top-off risk"],
      commonPainPoints: ["Soot loading without sampling", "Aftertreatment sensitivity at bulk gun", "Light-duty units on HD bulk"],
      priorityProductCategories: ["hd_engine_oils", "coolant", "grease", "transmission"],
      buyingTriggers: ["Bulk tier review", "Winter viscosity changeouts", "Coolant comeback after roadside top-off"],
      recommendedMessagingAngles: ["API category from VIN", "Honest synthetic framing with analysis"],
      relevantEquipmentTypes: ["Class 8 tractors", "Vocational trucks", "Terminal tractors"],
      recommendedLfbbBlockIds: ["lfbb-hd-severe-duty-v1", "lfbb-synthetics-upgrade-v1"],
    },
    {
      id: "municipal_fleet",
      title: "Municipal Fleet — Field Playbook",
      profileTitle: "Municipal Fleet — Field Playbook",
      profileSubtitle: "Refuse, streets, parks, and utilities on one bid",
      profileSummary:
        "Municipal fleets mix refuse, snow, streets, and parks iron under public bid rules. Win with transparent spec binders, seasonal grade maps, and posted bulk discipline across departments.",
      customerPainPoints: [
        { iconKey: "hydraulic", label: "Refuse hydraulics", sub: "Heat and slow cycles when grades drift" },
        { iconKey: "contamination", label: "Seasonal bulk confusion", sub: "Snow-season choices colliding with summer spec cards" },
        { iconKey: "downtime", label: "Multi-department stores", sub: "Parks tractors on wrong fluid from shared municipal supply" },
      ],
      equipmentTypes: ["Refuse packers", "Street sweepers and loaders", "Parks tractors and mowers", "Utility pickups"],
      likelyLubricantNeeds: [
        { category: "HD engine & hydraulic programs", role: "Department-specific ISO VG and API maps" },
        { category: "Tractor fluids", role: "Parks and grounds wet-brake discipline" },
        { category: "Grease programs", role: "Refuse and loader joints" },
      ],
      recommendedProducts: [
        { name: "Multi-Viscosity AW Hydraulics", why: "Seasonal municipal mobile circuits" },
        { name: "Universal Red Tractor Fluid", why: "Parks tractor baseline per tag" },
        { name: "CK-4 Synthetic Blend", why: "Diesel fleet baseline" },
      ],
      opportunitySignals: ["RFP renewal", "Council standardization mandate", "Parks chatter after in-house service"],
      repTalkTrack: [
        "Lead with transparency: spec binders and tank stickers per department.",
        "Map seasonal grades for snow vs summer hydraulics.",
        "Reduce emergency cross-grades with one approved program poster.",
      ],
      discoveryQuestions: [
        "Which departments share bulk storage?",
        "What does the RFP require for fluid documentation?",
        "Where do parks units differ from refuse hydraulics on tag?",
      ],
      crossSell: ["HD engine oils", "Hydraulic fluids", "Tractor fluids", "Grease"],
      cautions: [CUSTOMER_PROFILE_DISCLAIMER],
      recommendedNextStep: "Publish department fluid binders and seasonal maps—verify on tags, manuals, and current PDS.",
      operatingConditions: ["Stop-go refuse and plow cycles", "Public bid and documentation pressure"],
      commonPainPoints: ["Hydraulic heat on refuse routes", "Seasonal bulk relabel gaps", "Parks on wrong municipal store fluid"],
      priorityProductCategories: ["hd_engine_oils", "hydraulic_fluids", "tractor_fluids", "grease"],
      buyingTriggers: ["RFP renewal", "Cooperative purchasing alignment"],
      recommendedMessagingAngles: ["Transparency for public bid", "Risk reduction via posted programs"],
      relevantEquipmentTypes: ["Refuse packers", "Loaders", "Parks tractors"],
      recommendedLfbbBlockIds: ["lfbb-hd-severe-duty-v1", "lfbb-hydraulic-uptime-v1", "lfbb-tractor-wet-brake-chatter-v1"],
    },
    {
      id: "manufacturing",
      title: "Manufacturing — Field Playbook",
      profileTitle: "Manufacturing — Field Playbook",
      profileSubtitle: "Presses, hydraulics, and plant MRO reliability",
      profileSummary:
        "Plants reward documented fluid programs on hydraulics, grease, and rotating assets. Lead with ISO VG, varnish control, and MRO store discipline—synthetic upgrades only where analysis and PDS support them.",
      customerPainPoints: [
        { iconKey: "hydraulic", label: "Varnish & oxidation", sub: "Long-life circuits before failure codes appear" },
        { iconKey: "bearing", label: "Grease incompatibility", sub: "Presses and robots on mixed thickeners" },
        { iconKey: "contamination", label: "MRO store drift", sub: "Industrial AW used for every spillover account" },
      ],
      equipmentTypes: ["Hydraulic presses", "Machine tools", "Conveyors and robots", "Plant air compressors"],
      likelyLubricantNeeds: [
        { category: "AW / synthetic hydraulics", role: "Press and power unit ISO VG programs" },
        { category: "Grease programs", role: "Linear and rotating assets" },
        { category: "Compressor R&O oils", role: "Air systems—not AW substitutes" },
      ],
      recommendedProducts: [
        { name: "Advanced & XVI Synthetic Hydraulics", why: "Step-up when analysis supports synthetic AW" },
        { name: "MOLY TAC Grease", why: "Press and shock-loaded bearings" },
        { name: "Long Life Turbine Oils", why: "Compressor R&O programs" },
      ],
      opportunitySignals: ["Reliability initiative from engineering", "Oil analysis expansion", "Press OEM upgrade"],
      repTalkTrack: [
        "Plant reliability tone: ISO VG, hygiene, and filtration first.",
        "Synthetic upgrade only with analysis and PDS support.",
        "Keep compressor R&O separate from hydraulic AW in MRO.",
      ],
      discoveryQuestions: [
        "Which circuits show varnish or slow response first?",
        "Is analysis running on hydraulics or only compressors?",
        "How is MRO segregating AW, R&O, and grease families?",
      ],
      crossSell: ["Hydraulic fluids", "Grease", "Compressor oils", "Synthetics"],
      cautions: [CUSTOMER_PROFILE_DISCLAIMER, "Do not put AW in compressor or turbine sumps without review."],
      recommendedNextStep: "Map press, conveyor, and compressor compartments; align fluid tiers to analysis, tags, and current PDS.",
      operatingConditions: ["High-cycle hydraulics year-round", "Quality audits favoring documented programs"],
      commonPainPoints: ["Varnish on long-life circuits", "Grease incompatibility on presses", "MRO AW overuse"],
      priorityProductCategories: ["hydraulic_fluids", "grease", "synthetics"],
      buyingTriggers: ["Reliability initiatives", "OEM line upgrades"],
      recommendedMessagingAngles: ["ISO VG and filtration paired to tier", "Analysis-driven synthetic upgrades"],
      relevantEquipmentTypes: ["Hydraulic presses", "Conveyors", "Compressors"],
      recommendedLfbbBlockIds: ["lfbb-hydraulic-oxidation-v1", "lfbb-hydraulic-uptime-v1", "lfbb-synthetics-upgrade-v1"],
    },
    {
      id: "industrial_processing",
      title: "Industrial Processing — Field Playbook",
      profileTitle: "Industrial Processing — Field Playbook",
      profileSubtitle: "Compressors, turbines, and long-life rotating fluids",
      profileSummary:
        "Processing plants run 24/7 rotating equipment where ASTM/DIN class discipline matters. Separate hydraulic AW, compressor, and turbine chemistry—use analysis to trend varnish before trip points.",
      customerPainPoints: [
        { iconKey: "contamination", label: "Sump cross-top-off", sub: "Hydraulic AW mistaken for compressor or turbine oil" },
        { iconKey: "hydraulic", label: "Moisture carryover", sub: "Valve deposits when demulsibility does not match class" },
        { iconKey: "downtime", label: "Trip risk", sub: "Varnish precursors on long drains" },
      ],
      equipmentTypes: ["Rotary screw compressors", "Steam and gas turbines", "Large hydraulic power units"],
      likelyLubricantNeeds: [
        { category: "R&O turbine & compressor oils", role: "Rotating equipment per ASTM/DIN class on PDS" },
        { category: "AW hydraulics", role: "Power units adjacent to rotating yards" },
      ],
      recommendedProducts: [
        { name: "Long Life Turbine Oils", why: "R&O turbine programs per PDS" },
        { name: "Full Synthetic Circulating Compressor Turbine Oils", why: "Premium rotating equipment step-up where PDS supports" },
        { name: "Professional Formula Hydraulics", why: "Adjacent hydraulic power units—ISO VG per tag" },
      ],
      opportunitySignals: ["Insurance-driven documentation push", "Compressor OEM major", "Varnish trending in analysis"],
      repTalkTrack: [
        "ASTM/DIN class first—from PDS rows, not drum color.",
        "Trend varnish precursors before trips.",
        "Never top compressor sumps with AW.",
      ],
      discoveryQuestions: [
        "Which rotating assets are on R&O vs hydraulic AW today?",
        "What does analysis show on varnish precursors?",
        "Where has cross-top-off happened under downtime pressure?",
      ],
      crossSell: ["Compressor & turbine oils", "Hydraulic fluids", "Synthetics"],
      cautions: [CUSTOMER_PROFILE_DISCLAIMER, "AW is not turbine or compressor R&O without compatibility review."],
      recommendedNextStep: "Document rotating vs hydraulic compartments; align R&O and AW tiers to analysis, tags, and current PDS.",
      operatingConditions: ["24/7 rotating equipment", "Shared MRO stores with chemistry confusion"],
      commonPainPoints: ["Cross-top-off between sump types", "Moisture and valve deposits", "Varnish on long drains"],
      priorityProductCategories: ["hydraulic_fluids", "synthetics", "compressor_oils"],
      buyingTriggers: ["Reliability or insurance documentation", "OEM compressor majors"],
      recommendedMessagingAngles: ["ASTM/DIN class from PDS", "Analysis before trips"],
      relevantEquipmentTypes: ["Compressors", "Turbines", "Hydraulic power units"],
      recommendedLfbbBlockIds: ["lfbb-hydraulic-oxidation-v1", "lfbb-synthetics-upgrade-v1"],
    },
  ],
};
