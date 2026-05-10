/**
 * Category spotlight narratives — territory-level themes (Phase 66).
 *
 * Each record supports:
 * - marketReality: bullets on what reps see in the field.
 * - link: connects that reality to how Klondike-enabled conversations should flow.
 * - focus: optional one-line summary (legacy / quick scan); UI may show marketReality first.
 * - feature / bridge / benefit: F–B–B for the category storyline.
 *
 * Keep claims aligned with PDS/OEM; no automated outreach in this phase.
 */

export const CATEGORY_SPOTLIGHTS = [
  {
    id: "cs-hd-conversion",
    type: "category",
    category: "HD Engine Oils",
    title: "Heavy Duty Engine Oil Conversion",
    focus:
      "Conversion wins when spec clarity, inventory footprint, and service cadence align—avoid generic “better oil” claims.",
    marketReality: [
      "Fleets still carry legacy habits from older API categories; bulk tanks often predate current OEM manuals.",
      "Purchasing asks for price compression while operations inherit wear risk from wrong-category top-offs.",
    ],
    link: "Klondike HD positioning supports reps who convert conversations into documented API ladders (CK-4/FA-4 where applicable) instead of brand shootouts.",
    useWhen:
      "Dealer carries multiple HD categories or a fleet wants supplier consolidation after contract changes.",
    feature:
      "Spec-first HD narrative that respects emissions-era hardware differences without overclaiming interchange.",
    bridge:
      "Move stakeholders from brand loyalty cards to VIN-indexed category matrices pinned at the bulk desk.",
    benefit:
      "Fewer emergency substitutions and clearer training for night-shift top-offs.",
    talkingPoints: [
      "Inventory engine families by API category needs before proposing SKUs.",
      "Align bulk vs. packaged strategy with yard top-off behavior.",
      "Document seasonal viscosity moves where climate or OEM guidance demands.",
    ],
    suggestedActions: [
      "Build a one-page spec ladder for the dealer’s top 25 units.",
      "Pair coolant and transmission reviews with the same PM visit.",
    ],
    territorySignals: [
      "New fleet maintenance director",
      "Municipal or transit RFP cycles",
    ],
    salesAngle:
      "Treat conversion as a documented spec ladder exercise—not a blind brand swap; cite PDS for any product-specific statements.",
    closingLines: [
      "We’ll inventory your highest-hour units first and align categories before touching bulk tanks.",
      "If you want a poster at the pump, we’ll draft language straight from the PDS notes you approve.",
    ],
    tags: ["hd", "conversion", "fleet"],
    status: "active",
  },
  {
    id: "cs-hydraulic-opportunity",
    type: "category",
    category: "Hydraulic Fluids",
    title: "Hydraulic Fluids Opportunity",
    focus:
      "Hydraulic failures often trace to contamination, wrong viscosity, or deferred filtration—not fluid brand alone.",
    marketReality: [
      "Rental and construction rebound puts hours on circuits before filters catch up.",
      "Customers blame oil first when response slows—even when water ingress is the root cause.",
    ],
    link: "Hydraulic fluid discussions should reward reps who bring ISO VG discipline, sampling, and breathers—areas Klondike field stories can reinforce without inventing chemistry claims.",
    useWhen:
      "Territory shows construction rebound, rental growth, or hydraulic-intensive ag seasons.",
    feature:
      "Structured ISO VG and cleanliness narrative before any tier upgrade.",
    bridge:
      "Shift from repeated drain-and-fills to trending contamination and fixing entry points.",
    benefit:
      "Customers see fewer repeat failures that erode trust in the dealer’s fluid program.",
    talkingPoints: [
      "Lead with OEM tags and operating temperature bands for viscosity.",
      "Introduce filter micron and change discipline before proposing fluid upgrades.",
      "Discuss wider temperature coverage only after OEM allowance is confirmed.",
    ],
    suggestedActions: [
      "Walk reservoirs and photograph pump tags on top failure assets.",
      "Schedule sampling where hours justify trending—not everywhere at once.",
    ],
    territorySignals: [
      "Skid-steer and mini-excavator rental utilization up",
      "Foam or slow hydraulics complaints in cold morning starts",
    ],
    salesAngle:
      "Anchor on circuit evidence and contamination control before discussing fluid chemistry changes.",
    closingLines: [
      "Let’s photograph priority circuits this week and align ISO VG from the tags.",
      "If filtration is dated, we’ll stage upgrades alongside any fluid conversation.",
    ],
    tags: ["hydraulic", "construction", "filtration"],
    status: "active",
  },
  {
    id: "cs-grease-program-growth",
    type: "category",
    category: "Grease",
    title: "Grease Program Growth",
    focus:
      "Grease revenue grows when compatibility rules and relubrication discipline are clear—not when SKUs multiply blindly.",
    marketReality: [
      "Mixed thickeners in central systems still cause costly incompatibility failures.",
      "Contract shops optimize tube price without a compatibility matrix.",
    ],
    link: "Klondike grease programs help reps sell rationalized NLGI and thickener choices plus technician training—supporting stickier dealer relationships.",
    useWhen:
      "Customer wants fewer greases but fears component risk, or lube truck inventory is out of control.",
    feature:
      "Compatibility-first grease messaging tied to asset severity classes.",
    bridge:
      "From chaotic shelf to a posted matrix at the service desk and on the lube truck.",
    benefit:
      "Technicians stop guessing; purchasing sees predictable SKU counts.",
    talkingPoints: [
      "Segment assets into severity buckets before proposing consolidation.",
      "Pair auto-luber settings with chosen NLGI where installed.",
      "Highlight moly vs. non-moly needs only per OEM guidance.",
    ],
    suggestedActions: [
      "Pilot one consolidated spec on worst pin wear locations.",
      "Publish a one-pager for contract mechanics on approved greases.",
    ],
    territorySignals: [
      "Quarry or demolition activity rising",
      "Fleet adding leased yellow iron with unknown grease history",
    ],
    salesAngle:
      "Lead with failure locations and compatibility gates—not SKU counts.",
    closingLines: [
      "We’ll trial one approved spec on your three worst pins and track shots per shift.",
    ],
    tags: ["grease", "growth", "consolidation"],
    status: "active",
  },
  {
    id: "cs-synthetic-upgrade",
    type: "category",
    category: "Synthetic Conversion",
    title: "Synthetic Upgrade Focus",
    focus:
      "Synthetic tiers work best as alignment tools for climate, OEM guidance, and complexity—not blanket superiority.",
    marketReality: [
      "Customers hear inflated mileage promises; skepticism is high.",
      "Cold-start pain and idle-heavy routes are real-leverage moments when OEM allows synthetic tiers.",
    ],
    link: "Synthetic upgrade plays position Klondike as the disciplined choice—pilots, documentation, and PDS language—rather than hype.",
    useWhen:
      "Prospects mention extreme cold, extended idle, or SKU reduction at the premium tier.",
    feature:
      "Pilot-based upgrade path with agreed metrics and OEM viscosity checkpoints.",
    bridge:
      "Move from “buy the expensive pail” to “here is the pilot protocol and measurement plan.”",
    benefit:
      "Premium tier sells as risk reduction with accountable follow-up.",
    talkingPoints: [
      "Confirm OEM viscosity/API requirements remain satisfied.",
      "Discuss filters and sampling alongside fluid tier.",
      "Pilot highest-hour or harshest-duty units first.",
    ],
    suggestedActions: [
      "Create a five-unit pilot list with cold-start and drain checkpoints.",
      "Label bulk tanks after approval to prevent cross-fill.",
    ],
    territorySignals: [
      "Cold snap forecasts",
      "Idle-heavy routes expanding",
    ],
    salesAngle:
      "Qualify climate and duty before SKU; describe Klondike synthetic options as supporting OEM-approved programs where PDS aligns.",
    closingLines: [
      "Pick five pilots with agreed metrics—cold starts, planned drains, and OEM alignment.",
    ],
    tags: ["synthetic", "upgrade", "pilot"],
    status: "active",
  },
  {
    id: "cs-agriculture-fluids",
    type: "category",
    category: "Agriculture",
    title: "Agriculture Equipment Fluids",
    focus:
      "Ag rewards preseason audits and spec consolidation across tractors, implements, and seasonal peaks.",
    marketReality: [
      "Farm windows compress—mistakes show up at harvest, not at purchase.",
      "Bulk tanks and portable totes introduce contamination if discipline slips.",
    ],
    link: "Agriculture fluid narratives help reps tie preseason planning to Klondike categories without promising outcomes OEMs control.",
    useWhen:
      "Planting or harvest windows approach; dealer promotes preseason inspection offerings.",
    feature:
      "Seasonal readiness storyline combining engine, transmission/THF, and coolant discipline.",
    bridge:
      "From crisis calls during hay season to planned preseason fluid audits.",
    benefit:
      "Growers see fewer in-field surprises during peak revenue hours.",
    talkingPoints: [
      "Keep ZF / wet brake / THF conversations spec-first.",
      "Discuss bulk cleanliness before seasonal fills.",
      "Bundle coolant checks with engine programs.",
    ],
    suggestedActions: [
      "Hand out preseason checklists to counter staff.",
      "Schedule training before the seasonal rush.",
    ],
    territorySignals: [
      "Co-op bulk buys",
      "Fertilizer logistics peaks aligned with equipment hours",
    ],
    salesAngle:
      "Lead with preseason audits and technology-family clarity for transmissions and brakes.",
    closingLines: [
      "Let’s push the preseason checklist to counter staff before the seasonal rush hits.",
    ],
    tags: ["agriculture", "seasonal", "fluids"],
    status: "active",
  },
  {
    id: "cs-construction-fluids",
    type: "category",
    category: "Construction Equipment",
    title: "Construction Equipment Fluids",
    focus:
      "Construction uptime ties engine, hydraulic, axle, and grease decisions to jobsite realities and contamination control.",
    marketReality: [
      "Shared bulk tanks on moving sites invite dirt and cross-fill.",
      "Emergency repairs dominate schedules—planned PM rarely wins without a champion.",
    ],
    link: "Construction fluid bundles give reps a reason to walk sites with customers and document tanks—not just quote drums.",
    useWhen:
      "Infrastructure bids, quarry activity, or rental utilization spikes equipment hours.",
    feature:
      "Cross-system PM storytelling anchored to OEM tags and jobsite hazards.",
    bridge:
      "Move from scatter-shot emergency fills to a pinned fluid matrix in the service trailer.",
    benefit:
      "Owners reduce surprise downtime that erodes bid margins.",
    talkingPoints: [
      "Anchor recommendations to OEM manuals and visible tags.",
      "Highlight contamination controls on bulk systems.",
      "Coordinate grease NLGI with centralized lubrication systems.",
    ],
    suggestedActions: [
      "Use a site visit template: bulk storage, breathers, grease chart.",
      "Identify one anchor contractor for reference stories.",
    ],
    territorySignals: [
      "DOT letting schedules",
      "Rental yard utilization reports",
    ],
    salesAngle:
      "Bundle engine, hydraulic, and grease around uptime PM—not SKU counts alone.",
    closingLines: [
      "We’ll walk one busy site this month and document bulk storage and breathers together.",
    ],
    tags: ["construction", "uptime", "fluids"],
    status: "active",
  },
  {
    id: "cs-transmission-drivetrain",
    type: "category",
    category: "Transmission Fluids",
    title: "Transmission & Drivetrain Opportunity",
    focus:
      "Drivetrain wins come from fluid-code discipline across transmissions, axles, and off-highway units—not one universal ATF story.",
    marketReality: [
      "Mixed-generation fleets tempt single-bulk-tank shortcuts.",
      "Shift complaints arrive before shops verify fluid codes.",
    ],
    link: "Transmission narratives position Klondike as the partner for code-indexed matrices and dealer documentation—not impulse substitutions.",
    useWhen:
      "Fleet spans automatic, powershift, and hydrostatic hardware; warranty-sensitive industries push documentation.",
    feature:
      "Code-first drivetrain workflow covering ATF, TO-4-type needs, and axle fills where separate.",
    bridge:
      "Shift from visual similarity to dipstick photos and OEM tables.",
    benefit:
      "Fewer comebacks that damage dealer credibility on high-cost components.",
    talkingPoints: [
      "Build a fluid matrix indexed by asset ID or VIN prefix.",
      "Separate construction/off-highway codes from on-highway ATF bulk.",
      "Coordinate filters with fluid changes when manuals demand.",
    ],
    suggestedActions: [
      "Photograph dipstick and fill-port labels on top ten assets.",
      "Host a lunch-and-learn on code lookup tools your dealer already trusts.",
    ],
    territorySignals: [
      "Fleet adding vocational trucks alongside yellow iron",
      "Warranty audits increasing for municipal fleets",
    ],
    salesAngle:
      "Inventory codes before quoting pails; position Klondike products as supporting OEM-approved programs per PDS.",
    closingLines: [
      "Let’s build the transmission and axle matrix before the next seasonal bulk buy.",
    ],
    tags: ["transmission", "drivetrain", "fleet"],
    status: "active",
  },
  {
    id: "cs-coolant-chemical-addon",
    type: "category",
    category: "Coolants / Chemicals",
    title: "Coolant / Chemical Add-On Opportunity",
    focus:
      "Coolant and chemical attach rates climb when testing cadence and technology-family discipline precede SKU adds.",
    marketReality: [
      "Top-off emergencies repeat until fleets adopt single technology families per yard.",
      "Brake cleaner, DEF handling, and coolant chemistry intersect on the same PM calendar.",
    ],
    link: "Add-on storytelling lets reps broaden Klondike footprint responsibly—chemistry education first, SKU second.",
    useWhen:
      "Customer already buys engine or hydraulic volumes; coolant testing reveals neglect or mixing.",
    feature:
      "Technology-family clarity and testing rhythm as prerequisites to expanded chemical SKUs.",
    bridge:
      "Move from ‘grab whatever jug is closest’ to labeled bulk and jug traceability.",
    benefit:
      "Fewer repeated cooling-system repairs mistaken for unrelated faults.",
    talkingPoints: [
      "Bundle coolant tests with belt and tensioner inspections.",
      "Separate DEF hygiene messaging where fleets struggle with contamination.",
      "Introduce brake and chassis chemicals only after shop storage audit.",
    ],
    suggestedActions: [
      "Offer a coolant technology one-pager per fleet yard.",
      "Stage quarterly chemical SKU reviews tied to PM windows.",
    ],
    territorySignals: [
      "Rising cooling-system ROs",
      "Insurance or audit emphasis on documented PM",
    ],
    salesAngle:
      "Lead with test results and OEM coolant type; attach Klondike chemicals where PDS and storage practices align.",
    closingLines: [
      "We’ll align coolant technology first, then layer compatible chemical SKUs on the next PM cycle.",
    ],
    tags: ["coolant", "chemicals", "add-on"],
    status: "active",
  },
  {
    id: "cs-fleet-governance",
    type: "category",
    category: "Fleet Opportunity",
    title: "Fleet Governance & Standardization",
    focus:
      "Large fleets value documentation, fewer SKUs, and predictable supply—credibility beats slogans.",
    marketReality: [
      "Mergers mix lubricant cultures overnight.",
      "Software rollouts demand asset IDs that shops still lack on fluids.",
    ],
    link: "Governance plays position Klondike as the supplier willing to write things down and revisit cadence—not just drop drums.",
    useWhen:
      "Prospect mentions audits, insurer questionnaires, or ESG-adjacent reporting pressure.",
    feature:
      "Documentation-heavy fleet narrative with exception reporting hooks.",
    bridge:
      "Move from tribal knowledge to approved SKU lists per yard.",
    benefit:
      "Fleet leaders defend choices internally with paperwork reps helped create.",
    talkingPoints: [
      "Offer spec matrices keyed to asset IDs.",
      "Emphasize supplier consistency for warranty posture.",
      "Keep claims aligned with PDS and OEM—avoid uncited numbers.",
    ],
    suggestedActions: [
      "Propose quarterly business reviews with usage summaries.",
      "Map emergency top-off kits per yard.",
    ],
    territorySignals: [
      "Carrier mergers",
      "New maintenance software deployments",
    ],
    salesAngle:
      "Emphasize audit-ready documentation and fewer approved SKUs over anecdotal performance claims.",
    closingLines: [
      "We’ll propose a quarterly review template tied to asset IDs and exception reporting.",
    ],
    tags: ["fleet", "governance", "documentation"],
    status: "draft",
  },
];
