/**
 * Product spotlight library — operational sales enablement copy only.
 *
 * Schema (Phase 66):
 * - marketReality: rep-facing bullets on what the market is doing / feeling.
 * - link: ties that reality to why this Klondike story matters now.
 * - feature / bridge / benefit: classic F–B–B; keep claims PDS- and OEM-safe.
 * - targetMarkets: optional legacy / filter aid; UI prefers marketReality when set.
 *
 * No performance guarantees; align recommendations with current PDS and OEM guidance.
 */

export const PRODUCT_SPOTLIGHTS = [
  {
    id: "ps-klondike-15w40-ck4-hd",
    type: "product",
    title: "KLONDIKE 15W-40 CK-4 Heavy Duty Engine Oil",
    productLine: "Heavy Duty Engine",
    category: "HD Engine Oils",
    targetMarkets: [
      "On-highway and vocational diesel where 15W-40 CK-4 is specified or allowed",
      "Dealers standardizing a single HD tier across mixed engine ages",
    ],
    marketReality: [
      "Shops still juggle multiple HD packages; misapplication and cross-top-off happen under pressure.",
      "CK-4 is a common reference point for modern hardware—reps need a clear, documentable story before price talk.",
    ],
    link: "This line gives reps a defensible API-category anchor (CK-4) so the conversation starts at spec fit and service cadence, not brand habit.",
    relatedProducts: [
      "HD filters and drain intervals by OEM",
      "Coolant and fuel quality touchpoints on the same PM visit",
    ],
    relatedSpecs: [
      "Confirm API CK-4 and any OEM claims on the current PDS for the exact SKU you stock.",
    ],
    competitors: [
      "Compete on spec documentation, fill reliability, and training—not unverifiable performance numbers.",
    ],
    useWhen:
      "A fleet or shop is consolidating 15W-40 HD engine oil and wants a written spec path for mixed diesel units.",
    feature:
      "CK-4 category positioning for modern diesel hardware when 15W-40 is the correct viscosity for the application.",
    bridge:
      "Move the buyer from “we’ve always bought the same drum” to “here is the API category and OEM line on the nameplate.”",
    benefit:
      "Helps reduce wrong-category top-offs and gives the service manager a clear approval trail.",
    expandedOpportunity:
      "Map the same account’s transmission and axle programs so the next visit is a category review, not a single SKU fight.",
    salesAngle:
      "Open with nameplate and duty cycle; state that Klondike is designed to support programs where CK-4 15W-40 is appropriate—verify with PDS before any “meets” language.",
    closingLines: [
      "Let’s line up the top 15 VINs and the CK-4 line on the PDS so the shop can post it at the bulk tank.",
      "If you want, we’ll draft a one-page spec note your counter can hand to the next walk-in fleet.",
    ],
    tags: ["ck-4", "15w-40", "hd", "diesel"],
    status: "active",
  },
  {
    id: "ps-klondike-5w40-fs-hd",
    type: "product",
    title: "KLONDIKE Full Synthetic 5W-40 Heavy Duty Engine Oil",
    productLine: "Heavy Duty Engine",
    category: "HD Engine Oils",
    targetMarkets: [
      "Severe cold starts or extended idle profiles where OEM allows lower viscosity HD grades",
      "Operations exploring synthetic HD tiers without skipping OEM documentation",
    ],
    marketReality: [
      "Cold-start complaints and idle-heavy routes persist even when sumps are “filled.”",
      "Synthetic tiers get oversold with vague mileage promises—buyers are wary.",
    ],
    link: "Positions Klondike synthetic HD coverage as an OEM-aligned choice where 5W-40 full synthetic fits documented needs—not a blanket miracle fluid.",
    relatedProducts: [
      "Oil analysis kits where fleets already trend iron and soot",
      "Coolant and fuel additive discipline messaging where bundled",
    ],
    relatedSpecs: [
      "Verify viscosity and API category vs. engine OEM manual; use PDS language only for approvals.",
    ],
    competitors: [
      "Differentiate with pilot discipline and documented drains—not slogan comparisons.",
    ],
    useWhen:
      "Customer cites harsh winter starts, high idle, or wants fewer HD viscosity SKUs at the premium tier.",
    feature:
      "Full synthetic HD discussion framed around correct low-temperature flow expectations when the OEM permits this viscosity.",
    bridge:
      "Shift from “thick oil is always safer” to “what does the tag say about cold cranking and shear stability?”",
    benefit:
      "Supports technically honest upgrade conversations that protect warranty posture.",
    expandedOpportunity:
      "Pilot on worst-start units; pair with driver pre-trip notes on idle reduction where safety allows.",
    salesAngle:
      "Qualify the engine family and climate first; introduce the product as supporting the program the OEM describes on the PDS.",
    closingLines: [
      "We’ll pick three high-pain units, align the PDS line, and set a check-in at the next PM window.",
    ],
    tags: ["5w-40", "synthetic", "hd", "cold-start"],
    status: "active",
  },
  {
    id: "ps-klondike-aw-hydraulic",
    type: "product",
    title: "KLONDIKE AW Hydraulic Fluids",
    productLine: "Hydraulic",
    category: "Hydraulic Fluids",
    targetMarkets: [
      "AW programs for mobile and plant hydraulics where anti-wear ISO VG systems are specified",
      "Dealers who want a consistent ISO ladder on the rack",
    ],
    marketReality: [
      "Many failures are contamination- or filter-related; customers still ask for “stronger oil” first.",
      "Mixing top-off sources without ISO discipline causes mystery performance issues.",
    ],
    link: "AW products give reps a structured way to talk viscosity grade and maintenance hygiene before any discussion of brand swap.",
    relatedProducts: [
      "Filter cross-references and breather upgrades",
      "High-efficiency options when OEM allows and temperature band supports",
    ],
    relatedSpecs: [
      "Match ISO VG to pump and OEM tag; confirm anti-wear package compatibility for the system.",
    ],
    competitors: [
      "Win on filter partnership and oil cleanliness practice—not unproven wear claims.",
    ],
    useWhen:
      "Shop reports heat, slow response, or erratic pressure and is open to a circuit review—not just a fluid change.",
    feature:
      "ISO VG–first positioning for anti-wear hydraulic systems in supported applications.",
    bridge:
      "From “change the oil again” to “let’s read the tag, sample, and fix contamination entry points.”",
    benefit:
      "Focuses the customer on measurable inputs: viscosity, cleanliness, and filter strategy.",
    expandedOpportunity:
      "Introduce simple fluid sampling on the top three high-hour circuits to justify filter investments.",
    salesAngle:
      "Start with nameplate photos and operating temperature; keep claims to what the PDS supports for that SKU.",
    closingLines: [
      "We’ll stage ISO grades next to the pump tags and note seasonal temperature swings on one sheet.",
    ],
    tags: ["hydraulic", "aw", "iso"],
    status: "active",
  },
  {
    id: "ps-klondike-aw-synthetic-hydraulic",
    type: "product",
    title: "KLONDIKE AW Synthetic Hydraulic Fluids",
    productLine: "Hydraulic",
    category: "Hydraulic Fluids",
    targetMarkets: [
      "Wide temperature swing environments where synthetic formulations are chosen for shear stability",
      "Equipment dealers recommending premium hydraulic tiers for select OEM-approved circuits",
    ],
    marketReality: [
      "Customers sometimes assume “synthetic” fixes contamination—it does not replace filtration.",
      "Seasonal operations stretch viscosity choice; the wrong conversation creates warranty anxiety.",
    ],
    link: "Synthetic AW messaging stays anchored to OEM allowance and operating window—not generic superiority.",
    relatedProducts: [
      "Breathers and reservoir kidney-loop upgrades where OEM permits",
      "Compatible filter media upgrades when downtime allows",
    ],
    relatedSpecs: [
      "Confirm OEM acceptance of synthetic AW chemistry for the pump and seals in service.",
    ],
    competitors: [
      "Avoid tariff comparisons; emphasize documented approval path and field support.",
    ],
    useWhen:
      "Application has wide ambient swings or documented need for synthetic hydraulic chemistry per OEM guidance.",
    feature:
      "Synthetic AW tier for accounts that have outgrown guesswork on seasonal viscosity drift.",
    bridge:
      "Move from brand debates to “approved chemistry + ISO VG + cleanliness KPIs.”",
    benefit:
      "Helps customers rationalize premium tier spend with a checklist instead of slogans.",
    expandedOpportunity:
      "Bundle annual fluid audit with rental-season prep for construction accounts.",
    salesAngle:
      "Qualify OEM synthetic allowance first; describe Klondike as supporting those approved programs.",
    closingLines: [
      "Let’s capture three circuit tags and confirm synthetic allowance before we quote drums.",
    ],
    tags: ["hydraulic", "synthetic", "aw"],
    status: "active",
  },
  {
    id: "ps-klondike-moly-ep-grease",
    type: "product",
    title: "KLONDIKE Moly EP Grease",
    productLine: "Grease",
    category: "Grease",
    targetMarkets: [
      "High-load pins and bushings where moly EP greases are specified",
      "Construction and mining-style oscillating joints when NLGI and thickener match the system",
    ],
    marketReality: [
      "Grease incompatibility still causes costly failures when central systems mix thickener technologies.",
      "Buyers often optimize price per tube instead of compatibility and relubrication interval.",
    ],
    link: "Moly EP positioning supports reps who lead with compatibility gates and component severity—not color alone.",
    relatedProducts: [
      "NLGI alternatives for winter vs. summer kits",
      "Auto-luber calibration checks where installed",
    ],
    relatedSpecs: [
      "Confirm NLGI grade, thickener type, and OEM moly EP guidance before recommending.",
    ],
    competitors: [
      "Stay with documented spec sheets; avoid implying interchange across all moly greases.",
    ],
    useWhen:
      "Customer fights recurring pin wear or struggles with grease compatibility across mixed fleets.",
    feature:
      "EP/moly narrative suited to heavy oscillating loads when specifications align.",
    bridge:
      "From “grab another tube” to “here is the NLGI + thickener matrix for this yard.”",
    benefit:
      "Reduces misapplication between incompatible greases on shared equipment.",
    expandedOpportunity:
      "Offer a shop poster of approved greases per asset class for contract mechanics.",
    salesAngle:
      "Start at the worst actors—pins with measurable play—then qualify grease technology.",
    closingLines: [
      "We’ll trial one spec on your three worst pins and track shots per shift together.",
    ],
    tags: ["grease", "moly", "ep", "construction"],
    status: "active",
  },
  {
    id: "ps-klondike-gear-oils",
    type: "product",
    title: "KLONDIKE Gear Oils (commercial / industrial positioning)",
    productLine: "Gear",
    category: "Gear Oils",
    targetMarkets: [
      "Enclosed drives, differentials, and industrial gearboxes requiring documented EP grades",
      "Dealers supporting mixed fleets with both automotive-style and industrial gear hardware",
    ],
    marketReality: [
      "Cross-contamination between automotive and industrial EP packages still appears in small shops.",
      "Customers confuse viscosity numbers across ISO vs. SAE naming conventions.",
    ],
    link: "Klondike gear oils support structured conversations that start at the tag photo and approved EP level—not drum color.",
    relatedProducts: [
      "Breathers and magnetic plugs where OEM recommends",
      "Synthetic EP tiers where allowance and ROI justify",
    ],
    relatedSpecs: [
      "Verify EP rating, viscosity system (ISO vs. SAE), and OEM friction modifier notes for limited-slip applications.",
    ],
    competitors: [
      "Lead with fill audits and tag documentation rather than claims about extreme pressure chemistry.",
    ],
    useWhen:
      "Reliability lead wants a written map between gearbox tags and stored lubricants.",
    feature:
      "EP gear story anchored to nameplate evidence and correct viscosity family.",
    bridge:
      "From guessing weight to photographing tags and aligning one spec ladder per site.",
    benefit:
      "Lowers risk of mixing incompatible EP chemistries in top-off situations.",
    expandedOpportunity:
      "Quarterly walk-down with vibration screening partner where noise precedes failure.",
    salesAngle:
      "Lead with operating temperature and OEM fluid type; cite PDS for any friction-modifier needs.",
    closingLines: [
      "We’ll build a single-page spec ladder from your top ten gear tags this month.",
    ],
    tags: ["gear", "ep", "industrial"],
    status: "active",
  },
  {
    id: "ps-klondike-to4",
    type: "product",
    title: "KLONDIKE TO-4 Fluids (powershift / off-highway discussion)",
    productLine: "Transmission / Off-Highway",
    category: "Transmission Fluids",
    targetMarkets: [
      "Construction and agriculture equipment referencing powershift or dedicated TO-4-style programs",
      "Dealers who support wet brake / transmission fluid consolidation where OEM permits",
    ],
    marketReality: [
      "TO-4 categories are frequently misunderstood; one bulk tank for “everything yellow” still happens.",
      "Warranty risk spikes when fluid codes are assumed from color alone.",
    ],
    link: "Klondike TO-4 positioning helps reps enforce OEM fluid codes before discussing drum pricing.",
    relatedProducts: [
      "Final drive and axle oils where separate fills apply",
      "Filter kits timed with fluid changes",
    ],
    relatedSpecs: [
      "Verify OEM TO-4 / friction requirements for the specific machine model year; use PDS for exact scope.",
    ],
    competitors: [
      "Differentiate with code verification worksheets—not improvised substitutions.",
    ],
    useWhen:
      "Customer operates powershift or construction drivetrain hardware that references TO-4-type programs.",
    feature:
      "Code-first messaging for off-highway drivetrain fluids where TO-4-class products apply.",
    bridge:
      "From visual similarity to OEM code index pinned at the service desk.",
    benefit:
      "Protects shift quality, brake performance expectations, and warranty defensibility.",
    expandedOpportunity:
      "Add machine-hour stickers next to bulk tanks for dealer-managed fleets.",
    salesAngle:
      "Inventory codes from service manuals first; position Klondike as supporting approved TO-4 programs per PDS.",
    closingLines: [
      "Let’s photograph the fill ports and match codes before the next seasonal bulk buy.",
    ],
    tags: ["to-4", "transmission", "construction", "off-highway"],
    status: "active",
  },
  {
    id: "ps-klondike-coolant-antifreeze",
    type: "product",
    title: "KLONDIKE Coolants / Antifreeze",
    productLine: "Coolants",
    category: "Coolants / Chemicals",
    targetMarkets: [
      "Mixed fleets managing OAT, nitrite, and hybrid coolant technologies",
      "Dealers promoting seasonal coolant checks with PM packages",
    ],
    marketReality: [
      "Emergency top-off with incompatible chemistry creates repeat failures that look like “bad pumps.”",
      "Refractometer discipline varies widely between shops.",
    ],
    link: "Coolant/antifreeze discussions support reps who sell testing cadence and technology-family clarity before SKU switches.",
    relatedProducts: [
      "Test strips and refractometers",
      "DEF handling checks when cooling system reviews uncover operational gaps",
    ],
    relatedSpecs: [
      "Never mix incompatible coolant technologies; follow OEM and PDS for dilution and inhibitors.",
    ],
    competitors: [
      "Compete on procedure and documentation—avoid promising universal compatibility.",
    ],
    useWhen:
      "Customer sees boil-off, liner pitting noise, or frequent water pump repeats across a fleet.",
    feature:
      "Technology-family-first coolant positioning (e.g., OAT vs. conventional) for responsible top-off.",
    bridge:
      "From reactive hose jobs to annual coolant technology audit with labeled bulk and jugs.",
    benefit:
      "Helps fleets avoid chemistry clashes that mimic mechanical faults.",
    expandedOpportunity:
      "Pair with belt and tensioner inspection storytelling on the same lift visit.",
    salesAngle:
      "Lead with test results and OEM coolant type; position Klondike options as supporting the stated technology where PDS aligns.",
    closingLines: [
      "We’ll chart each yard’s bulk and jug sources and align one technology family per fleet.",
    ],
    tags: ["coolant", "antifreeze", "oat", "fleet"],
    status: "active",
  },
  {
    id: "ps-construction-fluid-bundle",
    type: "product",
    title: "Construction Equipment Fluids (cross-category starter)",
    productLine: "Mixed Construction",
    category: "Construction Equipment",
    targetMarkets: [
      "Site contractors consolidating vendors across engine, hydraulic, and drivetrain",
      "Rental yards preparing seasonal utilization spikes",
    ],
    marketReality: [
      "Job sites lean on emergency top-off; contamination entry points multiply with shared bulk tanks.",
      "Purchasing often splits fluids across counters without a master spec chart.",
    ],
    link: "This starter narrative ties jobsite realities to a disciplined tag-and-tank review Klondike reps can facilitate.",
    relatedProducts: [
      "Greases for pins under central lube systems",
      "ZF / TO-4 / AW discussions per machine class",
    ],
    relatedSpecs: [
      "Every recommendation references OEM tags; nothing implied without PDS backup.",
    ],
    competitors: [
      "Win with jobsite walk credibility and fill discipline—not generic durability claims.",
    ],
    useWhen:
      "Anchor contractor wants fewer suppliers and clearer bulk labeling across yellow iron.",
    feature:
      "Cross-category visibility for construction fleets without overpromising one fluid for all compartments.",
    bridge:
      "From reactive repairs to a documented fluid matrix pinned in the service trailer.",
    benefit:
      "Reduces emergency substitutions that void confidence with fleet owners.",
    expandedOpportunity:
      "Seasonal “startup week” bundle for fluid + filter checks before DOT lettings hit.",
    salesAngle:
      "Open with highest-hour machines and contamination risks; map Klondike categories per compartment using OEM guidance.",
    closingLines: [
      "We’ll draft a one-page site matrix after walking your loudest equipment first.",
    ],
    tags: ["construction", "bundle", "hydraulic", "engine"],
    status: "active",
  },
  {
    id: "ps-agrimax-zf",
    type: "product",
    title: "AGRIMAX ZF",
    productLine: "AGRIMAX",
    category: "Agriculture",
    targetMarkets: [
      "Agricultural tractors and implements",
      "Transmissions and systems where ZF-type fluid discussions arise",
    ],
    marketReality: [
      "Ag retailers face consolidation pressure—fluids are an easy place to cut until a repair hits.",
      "Spec language on foreign nameplates intimidates parts counter staff without a checklist.",
    ],
    link: "AGRIMAX ZF gives reps a named anchor for ag drivetrain conversations that must stay spec-first before farm price sensitivity.",
    relatedProducts: ["AGRIMAX wet brake / THF programs where separate fills apply"],
    relatedSpecs: [
      "Confirm ZF and OEM requirements against the current PDS; avoid implying coverage beyond published scope.",
    ],
    competitors: [
      "Position on service proximity and formulation fit—not unsupported comparisons.",
    ],
    useWhen:
      "Customer runs ZF-linked hydraulic/transmission systems on ag equipment and is evaluating fluid choices or consolidation.",
    feature:
      "Agricultural lubricant positioning designed to support spec-led conversations for compatible applications.",
    bridge:
      "Move from price-per-gallon battles to nameplate-led verification and seasonal PM rhythm.",
    benefit:
      "Helps reduce misapplication risk when the correct fluid family is confirmed.",
    expandedOpportunity:
      "Bundle with seasonal coolant and filter campaigns already scheduled on the farm.",
    salesAngle:
      "Lead with equipment application and OEM requirement; introduce Klondike fit after the requirement is confirmed.",
    closingLines: [
      "Let’s confirm the tag and interval, then pull the exact AGRIMAX line from PDS together.",
    ],
    tags: ["agrimax", "agriculture", "zf", "transmission"],
    status: "active",
  },
  {
    id: "ps-agrimax-15w40-ck4",
    type: "product",
    title: "AGRIMAX 15W-40 CK-4",
    productLine: "AGRIMAX",
    category: "Agriculture",
    targetMarkets: [
      "Heavy-duty diesel in agriculture and mixed fleets",
      "Equipment where CK-4 and 15W-40 align with OEM guidance",
    ],
    marketReality: [
      "Farms often run mixed diesel ages; the temptation is one drum for “everything diesel.”",
      "CK-4 awareness is high, but misalignment with FA-4 or legacy hardware still occurs.",
    ],
    link: "AGRIMAX 15W-40 CK-4 supports technicians who need a recognized API category story tied to real farm duty cycles.",
    relatedProducts: ["Heavy-duty filters", "Coolant checks when bundling preseason service"],
    relatedSpecs: [
      "Verify API CK-4 and OEM approvals for the engine family on the current PDS.",
    ],
    competitors: [
      "Differentiate with agronomic timing (planting/harvest) and fill discipline—not hype.",
    ],
    useWhen:
      "Fleet or farm is standardizing HD engine oil across diesel tractors, trucks, or compatible yellow iron.",
    feature:
      "CK-4-oriented HD diesel discussion suited to many modern agricultural diesel engines when 15W-40 is correct.",
    bridge:
      "Shift from habit buying to “does this hardware still call for CK-4 15W-40 this season?”",
    benefit:
      "Supports uptime planning tied to documented categories rather than brand inertia.",
    expandedOpportunity:
      "Cross-link hydraulic and coolant touchpoints on shared equipment during dealer preseason clinics.",
    salesAngle:
      "Open with duty cycle, emissions context if relevant, and manual requirements—then align product language to PDS.",
    closingLines: [
      "We’ll match CK-4 coverage to the inventory you want on the farm shop shelf.",
    ],
    tags: ["agrimax", "ck-4", "diesel", "agriculture"],
    status: "active",
  },
  {
    id: "ps-hd-15w40-commercial",
    type: "product",
    title: "Commercial Formula 15W-40 (HD segment)",
    productLine: "Heavy Duty Engine",
    category: "HD Engine Oils",
    targetMarkets: ["Regional trucking", "Construction haul fleets", "Mixed diesel fleets"],
    marketReality: [
      "Commercial tiers attract buyers optimizing cost per mile—without always indexing API category changes.",
      "Cross-fleet top-off from unrelated drums remains a hidden risk.",
    ],
    link: "Commercial HD framing helps reps stress category discipline and bulk tank governance for high-volume users.",
    relatedProducts: ["Extended drain programs only where OEM allows", "Fuel-efficient variants for newer hardware"],
    relatedSpecs: ["Confirm CI-4 Plus / CK-4 applicability per unit—use PDS for definitive statements."],
    competitors: ["National brands—emphasize supply continuity and spec discipline."],
    useWhen: "Customer wants predictable HD engine oil coverage across mixed diesel ages in one territory.",
    feature: "Broad fleet applicability when viscosity and API category match documented needs.",
    bridge: "From reactive purchasing to scheduled drain and spec audits.",
    benefit: "Reduces wrong-category risk during bulk purchases and driver-added top-offs.",
    expandedOpportunity: "Tie to coolant and transmission reviews during PM bay walkthroughs.",
    salesAngle: "Start with VIN/engine family and duty cycle; align category before discussing brand swap.",
    closingLines: [
      "Let’s chart the top 20 units by hour and align one spec ladder for the shop.",
    ],
    tags: ["hd", "fleet", "15w-40"],
    status: "active",
  },
  {
    id: "ps-hydro-aw",
    type: "product",
    title: "AW Hydraulic Fluids (Commercial line)",
    productLine: "Hydraulic",
    category: "Hydraulic Fluids",
    targetMarkets: ["Mobile hydraulics", "Industrial circuits calling for ISO VG alignment"],
    marketReality: [
      "Foam and heat complaints often trace to water ingress or wrong VG—not “weak AW.”",
      "Small shops still chase leaks without fixing breathers.",
    ],
    link: "Commercial AW messaging reinforces ISO VG discipline before any chemistry upgrade conversation.",
    relatedProducts: ["Filtration reviews", "HV options when OEM allows seasonal swing coverage"],
    relatedSpecs: ["ISO VG and OEM shear stability requirements—confirm with PDS."],
    competitors: ["Major fluid suppliers—lead with contamination control and filter partnership."],
    useWhen: "Shop sees foam, heat, or varnish signals and wants a structured hydraulic review.",
    feature: "ISO VG hierarchy as the structured way to compare offerings.",
    bridge: "From mystery leaks to documented viscosity grade and filter micron strategy.",
    benefit: "Focuses the customer on measurable circuit health indicators.",
    expandedOpportunity: "Offer fluid analysis introduction where high-hour circuits justify trending.",
    salesAngle: "Lead with pump OEM recommendation and operating temperature band.",
    closingLines: ["We'll stage VG grades against your critical circuits and note seasonal swings."],
    tags: ["hydraulic", "aw", "iso"],
    status: "active",
  },
  {
    id: "ps-grease-ep2",
    type: "product",
    title: "Multi-Purpose / EP-2 Grease (representative)",
    productLine: "Grease",
    category: "Grease",
    targetMarkets: ["Fleet chassis", "Ag pivots", "Construction pins and bushings"],
    marketReality: [
      "Too many greases on a lube truck invites misapplication—especially with automatic greasers.",
      "Price-per-tube shopping ignores thickener conflicts.",
    ],
    link: "Multi-purpose EP-2 discussions help reps consolidate SKUs only after compatibility rules are written.",
    relatedProducts: ["High-temp options where OEM specifies"],
    relatedSpecs: ["NLGI grade and thickener compatibility—confirm central grease systems."],
    competitors: ["Consolidation conversations vs. many SKUs on the lube truck."],
    useWhen: "Customer struggles with grease compatibility across mixed equipment.",
    feature: "NLGI and thickener compatibility as the technical gate before consolidation.",
    bridge: "From dozens of tubes to a rationalized spec sheet per site.",
    benefit: "Fewer mis-greases and clearer training for technicians.",
    expandedOpportunity: "Pair with auto-luber audits where applicable.",
    salesAngle: "Start with high-failure components, not the warehouse shelf.",
    closingLines: ["We'll trial one spec on the worst actors first, then scale."],
    tags: ["grease", "ep-2", "fleet"],
    status: "active",
  },
  {
    id: "ps-gear-industrial",
    type: "product",
    title: "Industrial EP Gear Lubricants",
    productLine: "Gear",
    category: "Gear Oils",
    targetMarkets: ["Gearboxes", "Winders", "Plant-scale reducers"],
    marketReality: [
      "Plants still reuse drips from unrelated drums when rush orders hit.",
      "Noise gets blamed on lubricant before alignment gets checked.",
    ],
    link: "Industrial EP positioning keeps reps tied to gearbox tags and inspection rhythm—not guesswork.",
    relatedProducts: ["Synthetic EP where OEM allows extended intervals"],
    relatedSpecs: ["GL ratings and EP additive compatibility—verify enclosed gear OEM guidance."],
    competitors: ["Industrial majors—win on PM documentation and fill audits."],
    useWhen: "Reliability engineer wants a written alignment between gearbox tags and stored lubricants.",
    feature: "Structured EP positioning with OEM tag photos as the proof step.",
    bridge: "From guessing viscosity to tag-led selection.",
    benefit: "Reduces cross-contamination between incompatible EP packages.",
    expandedOpportunity: "Route to vibration partner or inspection where noise precedes failure.",
    salesAngle: "Lead with nameplate photos and operating temperature.",
    closingLines: ["We'll build a one-page spec ladder per production line."],
    tags: ["gear", "ep", "industrial"],
    status: "draft",
  },
  {
    id: "ps-atf-md3",
    type: "product",
    title: "Automatic Transmission Fluid (MD3-class discussion)",
    productLine: "Transmission",
    category: "Transmission Fluids",
    targetMarkets: ["Legacy fleet ATF top-off", "Serviced transmissions with documented fluid codes"],
    marketReality: [
      "ATF bulk tanks tempt one-fluid thinking across generations of hardware.",
      "Shift complaints often precede code verification.",
    ],
    link: "MD3-class discussions train reps to pause at fluid codes before quoting drums.",
    relatedProducts: ["DEXRON-VI / OEM-specific offerings where required"],
    relatedSpecs: ["Never substitute without OEM fluid code confirmation."],
    competitors: ["Quick-lube chains—differentiate with code verification workflow."],
    useWhen: "Fleet maintenance lead wants a single ATF story but hardware spans generations.",
    feature: "Fluid-code-first workflow to prevent warranty and shift-quality issues.",
    bridge: "From one bulk tank for everything to a code-indexed matrix.",
    benefit: "Protects shift quality and warranty posture.",
    expandedOpportunity: "Coordinate with warranty-friendly documentation for dealer shops.",
    salesAngle: "Inventory the top 10 units by VIN and build the fluid matrix from there.",
    closingLines: ["We'll photograph dipstick labels and build the matrix together."],
    tags: ["atf", "fleet", "transmission"],
    status: "active",
  },
  {
    id: "ps-coolant-oat",
    type: "product",
    title: "OAT / ELC Coolant Programs",
    productLine: "Coolants",
    category: "Coolants / Chemicals",
    targetMarkets: ["HD fleets", "Ag engines with mixed coolant histories"],
    marketReality: [
      "ELC programs confuse buyers who still think “green vs. orange” is enough.",
      "Fleet buyers want fewer emergencies, not chemistry lectures—until failure strikes.",
    ],
    link: "OAT/ELC framing supports reps teaching technology family discipline before promoting top-off jugs.",
    relatedProducts: ["Coolant test strips", "DEF discipline messaging where bundled"],
    relatedSpecs: ["Do not mix incompatible technologies—follow OEM and PDS."],
    competitors: ["Bulk coolant suppliers—emphasize testing cadence and top-off discipline."],
    useWhen: "Customer sees recurring cooling-system repairs or boil-off.",
    feature: "Technology-family clarity (OAT, nitrite, hybrid) before top-off.",
    bridge: "From emergency top-off to annual coolant audit.",
    benefit: "Lowers cavitation and corrosion risk when procedures match chemistry.",
    expandedOpportunity: "Bundle with belt and thermostat inspection storytelling.",
    salesAngle: "Start with refractometer or test strip trend, not SKU.",
    closingLines: ["We'll chart top-off sources and align one technology per fleet."],
    tags: ["coolant", "oat", "elc"],
    status: "active",
  },
  {
    id: "ps-syn-blend-upgrade",
    type: "product",
    title: "Synthetic Blend Upgrade Path (discussion starter)",
    productLine: "Synthetic",
    category: "Synthetic Conversion",
    targetMarkets: ["Fleets exploring step-up from conventional", "Seasonal cold-start pain points"],
    marketReality: [
      "Blend tiers sit between price pressure and premium promises—buyers need clarity on what changes operationally.",
      "Idle-heavy duty cycles magnify fuel dilution concerns that oil alone cannot fix.",
    ],
    link: "Synthetic blend positioning helps reps discuss graduated upgrades without guaranteeing mileage miracles.",
    relatedProducts: ["Full synthetic where OEM and duty cycle justify"],
    relatedSpecs: ["Follow OEM viscosity and API categories—avoid over-promising drain extension."],
    competitors: ["National synthetics—anchor on documented cold-flow needs and inventory discipline."],
    useWhen: "Customer mentions cold starts, idle hours, or desire for simplified premium tier.",
    feature: "Graduated upgrade story without claiming universal superiority.",
    bridge: "From cheapest gallon to total cost of drain and downtime.",
    benefit: "Frames premium fluids as risk reduction, not magic mileage.",
    expandedOpportunity: "Pilot highest-hour routes first.",
    salesAngle: "Use duty cycle and climate before SKU selection.",
    closingLines: ["We'll pilot three units and compare UOA where you already sample."],
    tags: ["synthetic", "blend", "upgrade"],
    status: "active",
  },
];
