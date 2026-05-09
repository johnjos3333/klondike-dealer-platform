/**
 * Category spotlight narratives — territory-level themes (foundation).
 */

export const CATEGORY_SPOTLIGHTS = [
  {
    id: "cs-hydraulic-opportunity",
    type: "category",
    category: "Hydraulic Fluids",
    title: "Hydraulic Fluids Opportunity",
    focus:
      "Hydraulic failures often trace to contamination, wrong viscosity, or deferred filtration—not only fluid brand.",
    useWhen:
      "Territory shows construction rebound, rental fleet growth, or logging/ag hydraulic-intensive seasons.",
    talkingPoints: [
      "Lead with ISO VG match to OEM tags and operating temperature bands.",
      "Introduce filter micron and change discipline before proposing fluid upgrades.",
      "Where seasonal swings exist, discuss multi-viscosity options only after confirming OEM allowance.",
    ],
    suggestedActions: [
      "Offer a shop walkthrough checklist: reservoir breathers, case drains, filter alignment.",
      "Photograph pump nameplates on top failure assets.",
      "Schedule a follow-up fluid sampling conversation where hours justify trending.",
    ],
    territorySignals: [
      "Increased mini-excavator or skid-steer rental counts",
      "Customers citing foam or slow hydraulics in cold starts",
    ],
    salesAngle:
      "Anchor on circuit tags and contamination control before discussing fluid tier changes.",
    closingLines: [
      "Let's photograph the priority circuits this week and align ISO VG from the tags.",
      "If filtration is dated, we'll stage upgrades alongside any fluid conversation.",
    ],
    tags: ["hydraulic", "construction", "filtration"],
    status: "active",
  },
  {
    id: "cs-hd-conversion",
    type: "category",
    category: "HD Engine Oils",
    title: "HD Engine Oil Conversion",
    focus:
      "Conversion wins when spec clarity, inventory footprint, and service cadence align—avoid generic \"better oil\" claims.",
    useWhen:
      "Dealer carries multiple HD categories or fleet wants supplier consolidation post-contract.",
    talkingPoints: [
      "Inventory engine families by API category needs (CK-4, FA-4 where applicable) before proposing SKUs.",
      "Align bulk vs. packaged strategy with top-off behavior in the yard.",
      "Document seasonal viscosity moves where climate demands.",
    ],
    suggestedActions: [
      "Build a one-page spec ladder for the dealer's top 25 units.",
      "Align coolant and transmission touchpoints in the same PM visit.",
    ],
    territorySignals: [
      "New fleet maintenance director",
      "RFP cycles for municipal or transit fleets",
    ],
    salesAngle:
      "Treat conversion as a documented spec ladder exercise—not a blind brand swap.",
    closingLines: [
      "We'll inventory your highest-hour units first and align categories before touching bulk tanks.",
    ],
    tags: ["hd", "conversion", "fleet"],
    status: "active",
  },
  {
    id: "cs-synthetic-upgrade",
    type: "category",
    category: "Synthetic Conversion",
    title: "Synthetic Upgrade Focus",
    focus:
      "Position synthetic tiers as alignment tools for climate, OEM guidance, and operational complexity—not blanket superiority.",
    useWhen:
      "Customers mention extreme cold, extended idle, or desire to reduce SKU complexity at premium tier.",
    talkingPoints: [
      "Confirm OEM viscosity and API requirements remain satisfied.",
      "Discuss total maintenance workflow (filters, sampling) alongside fluid tier.",
      "Pilot on highest-hour or harshest-duty units first.",
    ],
    suggestedActions: [
      "Create a pilot list of 5 VINs with agreed success metrics (cold start, planned drains).",
      "Pair with training for shop staff on bulk tank labeling.",
    ],
    territorySignals: [
      "Cold snap forecasts",
      "Fleets adding remote idle-heavy routes",
    ],
    salesAngle:
      "Pilot synthetic tiers where climate or duty cycle clearly strains conventional coverage.",
    closingLines: [
      "Pick five pilots with agreed metrics—cold starts, planned drains, and OEM alignment.",
    ],
    tags: ["synthetic", "upgrade", "pilot"],
    status: "active",
  },
  {
    id: "cs-construction",
    type: "category",
    category: "Construction Equipment",
    title: "Construction Equipment Opportunity",
    focus:
      "Construction wins bundle engine, hydraulic, and grease categories around uptime narratives.",
    useWhen:
      "Regional permits, infrastructure bids, or quarry activity accelerate equipment utilization.",
    talkingPoints: [
      "Anchor recommendations to OEM manuals and visible component tags.",
      "Highlight contamination control on shared bulk tanks and remote sites.",
      "Coordinate grease NLGI and thickener messaging with central lubrication systems.",
    ],
    suggestedActions: [
      "Site visit template: bulk storage, breathers, grease compatibility chart.",
      "Identify one anchor contractor for reference storytelling.",
    ],
    territorySignals: [
      "DOT letting schedules",
      "Rental yard utilization reports",
    ],
    salesAngle:
      "Bundle engine, hydraulic, and grease around uptime PM stories—not SKU counts alone.",
    closingLines: [
      "We'll walk one busy site this month and document bulk storage and breathers together.",
    ],
    tags: ["construction", "uptime", "bundle"],
    status: "active",
  },
  {
    id: "cs-agriculture",
    type: "category",
    category: "Agriculture",
    title: "Agriculture Equipment Opportunity",
    focus:
      "Ag cycles favor pre-season fluid audits and spec consolidation across tractors, combines, and implements.",
    useWhen:
      "Planting or harvest windows approach; dealer promotes preseason inspection packages.",
    talkingPoints: [
      "ZF / wet brake / THF conversations stay spec-first.",
      "Discuss bulk tank cleanliness before seasonal fills.",
      "Bundle coolant checks with engine oil programs.",
    ],
    suggestedActions: [
      "Distribute a preseason one-pager checklist to dealer counter staff.",
      "Schedule group training before peak season rush.",
    ],
    territorySignals: [
      "Co-op bulk buys",
      "Anhydrous or fertilizer logistics peaks correlated with equipment hours",
    ],
    salesAngle:
      "Lead with preseason fluid audits and spec-first narratives for transmissions and wet brakes.",
    closingLines: [
      "Let's distribute the preseason checklist to counter staff before the seasonal rush hits.",
    ],
    tags: ["agriculture", "seasonal", "agrimax"],
    status: "active",
  },
  {
    id: "cs-fleet-governance",
    type: "category",
    category: "Fleet Opportunity",
    title: "Fleet Governance & Standardization",
    focus:
      "Large fleets value documentation, fewer SKUs, and predictable supply—technical credibility beats slogans.",
    useWhen:
      "Prospect mentions audit readiness, insurance reviews, or ESG reporting pressure.",
    talkingPoints: [
      "Offer spec matrices tied to asset IDs.",
      "Emphasize consistent supplier documentation for shops.",
      "Keep claims aligned with PDS and OEM—avoid uncited numbers.",
    ],
    suggestedActions: [
      "Propose quarterly business reviews with usage and exception reports.",
      "Map emergency top-off kits per yard.",
    ],
    territorySignals: [
      "Merger activity among regional carriers",
      "New maintenance software rollouts",
    ],
    salesAngle:
      "Emphasize audit-ready documentation and fewer approved SKUs over anecdotal performance claims.",
    closingLines: [
      "We'll propose a quarterly review template tied to asset IDs and exception reporting.",
    ],
    tags: ["fleet", "governance", "documentation"],
    status: "draft",
  },
];
