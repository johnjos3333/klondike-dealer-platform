/**
 * Lubricant compatibility knowledge — deterministic profiles for advisor intelligence.
 * Not wired to UI yet.
 */

export const lubricantCompatibilityKnowledge = {
  greaseCompatibility: {
    id: "greaseCompatibility",
    title: "Grease Compatibility",
    aliases: [
      "grease compatibility",
      "mixing grease",
      "can i mix greases",
      "grease thickener compatibility",
      "compatible greases",
    ],
    questionExamples: [
      "Can I mix different greases?",
      "Are lithium and calcium sulfonate greases compatible?",
      "What happens if I mix greases?",
    ],
    directAnswer:
      "Grease compatibility depends primarily on thickener chemistry, base oil type, and additive package—not colour or NLGI grade alone. Some thickeners soften, harden, or separate when mixed; centralized lube systems are especially sensitive. Treat unverified mixing as a risk until compatibility is confirmed.",
    compatibilitySummary:
      "Thickener families (lithium, lithium complex, calcium sulfonate, polyurea, aluminum complex, clay) react differently when combined. Same-thickener products from different suppliers may still be incompatible if base oil or additive chemistry diverges. Field practice: match thickener type, confirm with supplier chart or OEM, and flush when history is unknown.",
    risks: [
      "Softening or hardening of mixed grease structure",
      "Oil bleed or grease collapse in fittings",
      "Blocked auto-lube lines from inconsistent consistency",
      "Loss of EP or corrosion protection when additives conflict",
    ],
    operationalConsequences: [
      "Pin and bearing wear from inadequate film",
      "Pump starvation in centralized systems",
      "Unplanned downtime during flush and refill",
    ],
    safePractices: [
      "Identify thickener type on current and proposed product PDS",
      "Use supplier compatibility charts for planned conversions",
      "Purge lines and fittings when changing thickener families",
      "Pilot one machine before fleet-wide bulk change",
    ],
    whenToAvoidMixing: [
      "Unknown grease history in auto-lube reservoirs",
      "Polyurea with lithium or calcium sulfonate without chart approval",
      "Food-grade points with non-food grease",
      "High-temp steel mill or kiln applications without OEM sign-off",
    ],
    troubleshootingSignals: [
      "Grease runs, becomes grainy, or changes texture after top-off",
      "Increased line pressure or blocked fittings",
      "Rust after previously adequate protection",
      "Abnormal odour or rapid oil separation from grease",
    ],
    relatedApplications: [
      "Fleet chassis programs",
      "Mining and construction auto-lube",
      "Bearing regrease routes",
    ],
    relatedFailureModes: [
      "Incompatibility softening",
      "Bearing starvation",
      "Corrosion after washout",
    ],
    questionsToAsk: [
      "What grease name and thickener is in service now?",
      "Manual, gun, or centralized application?",
      "Any recent change in grease colour or texture?",
      "OEM or auto-lube supplier restrictions?",
    ],
    repTalkTrack:
      "Grease compatibility is a thickener conversation, not a colour match. Ask what's in the line today and how they apply it. If history is unclear, the safe answer is flush and refill—not blend and hope. Use supplier compatibility guidance before any bulk conversion.",
    cautionNotes: [
      "Do not guarantee compatibility without supplier or OEM confirmation.",
      "Exact product pairs require PDS and compatibility chart review.",
    ],
    keywords: ["grease", "mixing", "thickener", "compatibility", "nlgi"],
  },

  lithiumVsCalciumSulfonate: {
    id: "lithiumVsCalciumSulfonate",
    title: "Lithium vs Calcium Sulfonate Compatibility",
    aliases: [
      "lithium vs calcium sulfonate",
      "lithium calcium sulfonate compatibility",
      "mix lithium and calcium sulfonate",
      "calcium sulfonate lithium mix",
    ],
    questionExamples: [
      "Can I mix lithium and calcium sulfonate grease?",
      "Is lithium compatible with calcium sulfonate?",
      "Switching from lithium to calcium sulfonate—do I need a flush?",
    ],
    directAnswer:
      "Lithium and calcium sulfonate greases are not automatically compatible. Some combinations soften significantly or separate; others may coexist short term but should not be relied on in auto-lube or high-moisture pins without a compatibility check and often a full purge.",
    compatibilitySummary:
      "Lithium and lithium-complex greases are common fleet defaults. Calcium sulfonate greases offer strong water and corrosion performance but may destabilize when mixed with certain lithium soaps. Conversion programs typically require cleaning fittings, purging lines, and monitoring texture during the first regrease cycles.",
    risks: [
      "Softening and oil bleed of mixed product",
      "Reduced stay-put performance on vertical pins",
      "Auto-lube blockage from inconsistent consistency",
    ],
    operationalConsequences: [
      "Pin wear in wet service during transition",
      "Line failures on centralized systems",
      "Warranty exposure if OEM mandated a specific thickener",
    ],
    safePractices: [
      "Obtain thickener compatibility chart from grease supplier",
      "Purge old grease from lines before calcium sulfonate fill",
      "Regrease manually on critical pins during transition window",
      "Document conversion on fleet maintenance records",
    ],
    whenToAvoidMixing: [
      "Centralized lube without flush capacity",
      "Unknown in-service grease on wet mining pins",
      "OEM-mandated lithium-only auto-lube programs",
    ],
    troubleshootingSignals: [
      "Grease becomes soupy after top-off",
      "Oil puddling below pins that previously held grease",
      "Increased regrease volume without improved protection",
    ],
    relatedApplications: [
      "Loader pins in wet pits",
      "Truck chassis fittings",
      "Quarry auto-lube fleets",
    ],
    relatedFailureModes: [
      "Thickener incompatibility softening",
      "Washout on pins",
      "Line blockage",
    ],
    questionsToAsk: [
      "Current grease product name and supplier?",
      "Reason for change—water, load, or cost?",
      "Auto-lube or manual program?",
    ],
    repTalkTrack:
      "Lithium to calcium sulfonate is a planned conversion, not a top-off experiment. If they want calcium sulfonate for wet pins, sell the flush and pilot path. KLONDIKE SKU selection comes after thickener compatibility is cleared on the PDS.",
    cautionNotes: [
      "Never state universal compatibility between lithium and calcium sulfonate.",
      "Confirm specific product pairs with supplier compatibility data.",
    ],
    keywords: ["lithium", "calcium sulfonate", "grease", "mix", "thickener"],
  },

  lithiumComplexVsPolyurea: {
    id: "lithiumComplexVsPolyurea",
    title: "Lithium Complex vs Polyurea Compatibility",
    aliases: [
      "lithium complex vs polyurea",
      "polyurea grease compatibility",
      "mix polyurea and lithium",
      "polyurea lithium complex",
    ],
    questionExamples: [
      "Can I mix polyurea and lithium complex grease?",
      "Is polyurea compatible with lithium grease?",
      "Polyurea vs lithium complex on electric motor bearings?",
    ],
    directAnswer:
      "Polyurea and lithium-complex greases are often considered incompatible or high-risk to mix; combined products may soften, harden, or lose consistency. Electric motor bearing programs and long-life sealed units are especially sensitive—conversion requires purge and OEM guidance.",
    compatibilitySummary:
      "Polyurea thickeners are common in electric motor and long-life bearing applications for oxidation stability. Lithium complex is a broad industrial default. Mixing without approval risks texture change and shortened bearing life. Many OEM motor greases specify polyurea-only refill.",
    risks: [
      "Consistency collapse or stiffening in bearing cavities",
      "Overheating from inadequate grease transport",
      "Loss of long-life oxidation benefit in motor bearings",
    ],
    operationalConsequences: [
      "Motor bearing failures on production lines",
      "Unplanned flush of large centralized reservoirs",
      "Downtime on fan and pump bearings",
    ],
    safePractices: [
      "Confirm motor OEM grease thickener requirement",
      "Purge thoroughly before polyurea fill",
      "Label polyurea-only points in plant lube routes",
      "Segregate bulk storage to prevent cross-fill",
    ],
    whenToAvoidMixing: [
      "Sealed-for-life motor bearings",
      "High-temp fan bearings with OEM polyurea spec",
      "Any unknown historical top-off",
    ],
    troubleshootingSignals: [
      "Grease liquefies or hardens in bearing inspection",
      "Elevated motor bearing temperature after grease change",
      "Discolouration or phase separation in grease sample",
    ],
    relatedApplications: [
      "Electric motor bearings",
      "Fan and blower bearings",
      "Long-interval industrial bearings",
    ],
    relatedFailureModes: [
      "Bearing overheating",
      "Grease channeling",
      "Premature oxidation in mixed product",
    ],
    questionsToAsk: [
      "Motor OEM grease specification?",
      "Sealed-for-life or regrease interval?",
      "Current grease thickener on PDS?",
    ],
    repTalkTrack:
      "Polyurea motor programs are not lithium-complex top-off jobs. Get the nameplate grease spec, plan a purge, and quote KLONDIKE only where thickener and OEM align on the PDS.",
    cautionNotes: [
      "Do not recommend mixing polyurea with lithium families without chart approval.",
      "Electric motor applications require OEM confirmation.",
    ],
    keywords: ["polyurea", "lithium complex", "motor bearing", "grease"],
  },

  syntheticVsConventionalMixing: {
    id: "syntheticVsConventionalMixing",
    title: "Synthetic vs Conventional Oil Mixing",
    aliases: [
      "synthetic vs conventional mixing",
      "mix synthetic and conventional oil",
      "can i mix synthetic oil",
      "blend synthetic and mineral oil",
      "semi synthetic mixing",
    ],
    questionExamples: [
      "Can I mix synthetic and conventional engine oil?",
      "What happens if I top off with conventional on synthetic?",
      "Is it OK to mix different brands of oil?",
    ],
    directAnswer:
      "Mixing synthetic and conventional engine or industrial oils is common in emergencies but dilutes the performance margin of the higher-tier fluid. Short-term top-off to reach a safe level may be acceptable per OEM; performance claims, drain intervals, and warranty coverage should be reset to the lower-tier fluid unless analysis says otherwise.",
    compatibilitySummary:
      "Chemically, many synthetic and mineral oils are blendable at a base-stock level, but additive packages differ. Mixing changes oxidation reserve, shear stability, and OEM compliance. Marketing categories (synthetic blend, full synthetic) reflect formulation targets—not permission to ignore spec after ad-hoc mixing.",
    risks: [
      "Reduced drain interval versus full synthetic program",
      "Diluted low-temperature or high-temp performance",
      "Additive clash causing foaming or filter plugging in rare cases",
      "Warranty questions after unapproved top-off",
    ],
    operationalConsequences: [
      "Shortened oil life and varnish if oxidation reserve drops",
      "Cold-start protection loss in northern fleets",
      "Confused fleet standardization and record-keeping",
    ],
    safePractices: [
      "Top off with same brand and spec where possible",
      "Return to single-spec fill at next drain",
      "Document emergency top-off in maintenance log",
      "Run oil analysis if large-volume mix occurred",
    ],
    whenToAvoidMixing: [
      "Large-volume mix changing OEM compliance class",
      "Wet brake or UTF sumps with friction-sensitive fluid",
      "Food-grade systems with non-food fluid",
      "Refrigeration or specialty synthetic-only systems",
    ],
    troubleshootingSignals: [
      "Foam, haze, or filter delta spike after top-off",
      "Odor change or rapid darkening",
      "Customer cites lost extended-drain performance",
    ],
    relatedApplications: [
      "Fleet engine oil programs",
      "Hydraulic top-off in remote sites",
      "Gear sump emergency fills",
    ],
    relatedFailureModes: [
      "Accelerated oxidation",
      "Viscosity shear drift",
      "Frictional issues in specialty sumps",
    ],
    questionsToAsk: [
      "How much volume was mixed and with what product?",
      "OEM spec required for warranty?",
      "Emergency top-off or planned blend?",
    ],
    repTalkTrack:
      "Mixing is a recovery move, not a program. If they topped conventional into synthetic, treat the sump as conventional until the next scheduled drain and confirm spec on the PDS. Don't promise extended drain on a mixed sump.",
    cautionNotes: [
      "Do not guarantee performance of mixed fluids.",
      "UTF, ATF, and food-grade systems have stricter rules than engine oil.",
    ],
    keywords: ["synthetic", "conventional", "mixing", "top off", "blend"],
  },

  hydraulicFluidCompatibility: {
    id: "hydraulicFluidCompatibility",
    title: "Hydraulic Fluid Compatibility",
    aliases: [
      "hydraulic fluid compatibility",
      "mixing hydraulic oils",
      "hydraulic oil compatibility",
      "can i mix aw hydraulic",
      "hydraulic top off compatibility",
    ],
    questionExamples: [
      "Can I mix different hydraulic fluids?",
      "Is zinc AW compatible with ashless hydraulic?",
      "What hydraulic oils can I mix?",
    ],
    directAnswer:
      "Hydraulic fluid compatibility requires matching OEM spec class, viscosity grade, and chemistry (AW zinc, ashless, R&O, UTF). Small emergency top-offs with the same spec may be tolerated; chemistry changes or viscosity shifts need flush planning and seal compatibility review.",
    compatibilitySummary:
      "AW mobile hydraulic fluids, industrial R&O, zinc-free ashless, and UTF/friction-modified tractor fluids serve different hardware. Mixing across classes risks seal shrinkage, filter plugging, demulsibility loss, and pump wear. Viscosity grade changes alter heat balance and leakage.",
    risks: [
      "Seal and hose shrinkage or swelling",
      "Demulsibility loss and stable emulsions",
      "Filter plugging from additive reaction",
      "Pump wear from wrong AW protection level",
    ],
    operationalConsequences: [
      "Slow or erratic hydraulics",
      "Overheating and varnish on valves",
      "Costly flush and seal replacement",
    ],
    safePractices: [
      "Match OEM spec and ISO VG on top-off",
      "Label bulk tanks and transfer equipment",
      "Drain and flush when changing chemistry class",
      "Verify seal and paint compatibility on conversions",
    ],
    whenToAvoidMixing: [
      "UTF sumps with AW hydraulic top-off",
      "Zinc to ashless bulk change without flush",
      "Different viscosity grades in precision systems without OEM OK",
    ],
    troubleshootingSignals: [
      "Milky fluid or persistent foam",
      "Seal weep after fluid change",
      "Slow response and valve stiction",
    ],
    relatedApplications: [
      "Mobile construction hydraulics",
      "Industrial presses",
      "Logging and mining fleets",
    ],
    relatedFailureModes: [
      "Emulsion formation",
      "Cavitation",
      "Seal failure",
    ],
    questionsToAsk: [
      "Current fluid name and OEM spec on tag?",
      "Top-off volume versus sump size?",
      "Any seal leaks after last change?",
    ],
    repTalkTrack:
      "Hydraulic compatibility is spec class first. AW is not UTF. Zinc is not ashless by default. Read the tag, match the PDS, and plan a flush when chemistry changes—not a gradual mix.",
    cautionNotes: [
      "Never guarantee cross-brand compatibility without spec alignment.",
      "Critical systems require OEM and PDS confirmation.",
    ],
    keywords: ["hydraulic", "aw", "ashless", "mixing", "zinc", "utf"],
  },

  zincVsAshlessHydraulic: {
    id: "zincVsAshlessHydraulic",
    title: "Zinc vs Ashless Hydraulic Fluids",
    aliases: [
      "zinc vs ashless hydraulic",
      "zinc free hydraulic compatibility",
      "ashless hydraulic mixing",
      "mix zinc and ashless hydraulic",
    ],
    questionExamples: [
      "Can I mix zinc AW and ashless hydraulic oil?",
      "Is zinc-free hydraulic compatible with zinc AW?",
      "Switching to ashless hydraulic—do I need a flush?",
    ],
    directAnswer:
      "Zinc-containing AW and ashless hydraulic fluids are different chemistry classes. Partial mixing may occur in the field but is not a reliable operating strategy—conversion should include flush, filter change, and OEM confirmation for seals, paints, and pump types.",
    compatibilitySummary:
      "Zinc AW fluids are common in mobile equipment. Ashless fluids target industrial systems with deposit-sensitive valves or OEM restrictions on certain metals. Mixing dilutes AW protection or ash characteristics unpredictably. Bulk tank conversions without flush leave chemistry pockets that cause foaming or deposit swings.",
    risks: [
      "Unpredictable wear protection during transition",
      "Deposit formation on industrial valves",
      "Filter loading from additive imbalance",
    ],
    operationalConsequences: [
      "Pump scoring in high-pressure systems",
      "Valve varnish in ash-sensitive circuits",
      "Extended downtime for flush",
    ],
    safePractices: [
      "Confirm pump OEM chemistry requirement",
      "Flush tank, lines, and cylinders on class change",
      "Change filters after flush and again at shortened interval",
      "Monitor particle counts post-conversion",
    ],
    whenToAvoidMixing: [
      "Industrial OEM mandating ashless only",
      "Mobile fleet AW programs with zinc requirement",
      "Large residual volume without flush capacity",
    ],
    troubleshootingSignals: [
      "Rapid filter darkening after change",
      "Valve stiction in industrial circuits",
      "Pump noise increase weeks after conversion",
    ],
    relatedApplications: [
      "Mobile AW fleets",
      "Industrial zinc-free circuits",
      "OEM-sensitive paint and seal systems",
    ],
    relatedFailureModes: [
      "Pump wear",
      "Valve deposit",
      "Filter plugging",
    ],
    questionsToAsk: [
      "OEM sheet: zinc AW or ashless?",
      "Bulk tank residual volume?",
      "Recent filter and varnish history?",
    ],
    repTalkTrack:
      "Zinc versus ashless is not a 50/50 bulk experiment. If the OEM sheet says ashless, flush the zinc out. Quote KLONDIKE only where the PDS matches that chemistry class.",
    cautionNotes: [
      "Do not state that zinc and ashless are universally mixable.",
      "Exact conversion protocol requires OEM and PDS review.",
    ],
    keywords: ["zinc", "ashless", "hydraulic", "zinc free", "aw"],
  },

  coolantCompatibility: {
    id: "coolantCompatibility",
    title: "Coolant Compatibility",
    aliases: [
      "coolant compatibility",
      "mixing coolant",
      "mix antifreeze",
      "oat coolant compatibility",
      "can i mix coolants",
    ],
    questionExamples: [
      "Can I mix different coolants?",
      "Is OAT compatible with conventional coolant?",
      "What happens if I mix red and green coolant?",
    ],
    directAnswer:
      "Coolant compatibility is defined by chemistry family (conventional, OAT, HOAT, nitrite-free programs)—not colour alone. Mixing incompatible technologies can gel, drop pH protection, and damage seals and pumps. Flush per OEM protocol when chemistry is unknown or mixed.",
    compatibilitySummary:
      "Each coolant technology uses distinct inhibitor packages. OAT and hybrid programs are not freely mixable with conventional silicate/nitrite fluids. Even within OAT, OEM captive fills may differ. Dilution with water only is also a compatibility issue when mineral content is high.",
    risks: [
      "Gelation and filter plugging",
      "Corrosion surge from inhibitor clash",
      "Water pump seal failure",
      "Cylinder liner cavitation if protection collapses",
    ],
    operationalConsequences: [
      "Overheating and boil-over",
      "Expensive cooling system flush",
      "Warranty denial on engine cooling components",
    ],
    safePractices: [
      "Use refractometer and OEM spec to identify technology",
      "Flush when history is unknown",
      "Premix with appropriate water quality",
      "Label fleet bulk to prevent cross-fill",
    ],
    whenToAvoidMixing: [
      "Unknown coolant colour without spec verification",
      "OAT with conventional nitrite programs",
      "Adding SCA to OAT systems",
    ],
    troubleshootingSignals: [
      "Brown sludge in overflow tank",
      "Floating gel particles",
      "Rising iron in coolant analysis",
    ],
    relatedApplications: [
      "Highway diesel fleets",
      "Off-highway diesel and gas engines",
      "Stationary power units",
    ],
    relatedFailureModes: [
      "Water pump leak",
      "Liner pitting",
      "Heat exchanger blockage",
    ],
    questionsToAsk: [
      "OEM factory fill and current brand?",
      "Any top-off with other colours or water only?",
      "Freeze protection target and climate?",
    ],
    repTalkTrack:
      "Coolant is chemistry, not colour. Ask for the OEM bulletin before they pour jugs together. KLONDIKE coolants are quoted on spec match per PDS—mixed systems need a flush story first.",
    cautionNotes: [
      "Never guarantee compatibility between coolant technologies without OEM chart.",
      "Mixed systems should be tested or flushed before long operation.",
    ],
    keywords: ["coolant", "antifreeze", "oat", "mixing", "gel"],
  },

  atfCompatibility: {
    id: "atfCompatibility",
    title: "ATF Compatibility",
    aliases: [
      "atf compatibility",
      "mixing transmission fluid",
      "dexron mercon compatibility",
      "can i mix atf",
      "automatic transmission fluid mixing",
    ],
    questionExamples: [
      "Can I mix different ATF types?",
      "Is Dexron VI compatible with Mercon LV?",
      "What if I mix ATF by mistake?",
    ],
    directAnswer:
      "ATF compatibility is approval-specific—Dexron, Mercon, Allison TES, and OEM captive fluids are not interchangeable by marketing label. Emergency top-off should use the closest approved fluid; mixed sumps may require drain, flush, and refill per OEM to restore friction performance.",
    compatibilitySummary:
      "Friction modifiers, viscosity, and seal conditioners are tuned per ATF generation. Dual-labeled fluids exist but still must list the required approval for the transmission. Mixing generations can cause shudder, slip, or overheating even when colours look similar.",
    risks: [
      "Clutch shudder and slip",
      "Overheating and varnish on valve body",
      "Warranty void on transmission",
    ],
    operationalConsequences: [
      "Roadside failure on vocational trucks",
      "Expensive transmission flush or rebuild",
      "Fleet downtime during spec audit",
    ],
    safePractices: [
      "Read dipstick or manual approval before top-off",
      "Carry correct ATF grade on service trucks",
      "Drain and refill if wrong fluid added in large volume",
      "Document ATF type per unit in fleet system",
    ],
    whenToAvoidMixing: [
      "CVT or DCT units requiring captive fluid",
      "Allison TES-295 vs TES 668 substitution",
      "Unknown ATF in vocational fleet bulk tank",
    ],
    troubleshootingSignals: [
      "Shudder on engagement",
      "Burnt smell and dark fluid shortly after service",
      "Harsh or delayed shifts",
    ],
    relatedApplications: [
      "Pickup and van automatics",
      "Allison vocational transmissions",
      "Transit and refuse fleets",
    ],
    relatedFailureModes: [
      "Clutch material distress",
      "Valve body varnish",
      "Torque converter overheat",
    ],
    questionsToAsk: [
      "Transmission model and required approval?",
      "Volume of incorrect fluid added?",
      "Recent shift quality changes?",
    ],
    repTalkTrack:
      "ATF is approval-first. Dual-label on the pail still has to list their TES or Dexron generation. Wrong mix means drain-and-fill—not drive it and see. KLONDIKE only where the PDS line matches the cap.",
    cautionNotes: [
      "Do not claim universal ATF compatibility.",
      "Captive OEM fluids may prohibit substitutes.",
    ],
    keywords: ["atf", "dexron", "mercon", "allison", "transmission", "mix"],
  },

  sealCompatibility: {
    id: "sealCompatibility",
    title: "Seal Compatibility",
    aliases: [
      "seal compatibility",
      "elastomer compatibility",
      "seal swell",
      "hose compatibility",
      "o ring compatibility lubricant",
    ],
    questionExamples: [
      "Will this hydraulic oil damage seals?",
      "Seal compatibility with synthetic oil?",
      "Why are my seals leaking after oil change?",
    ],
    directAnswer:
      "Seal and hose compatibility depends on elastomer type, fluid base stock, additive chemistry, and temperature. Some fluids cause shrinkage, swell, or hardening of NBR, FKM, or EPDM seals. Fluid changes without OEM elastomer guidance can trigger weep or sudden leaks even when viscosity is correct.",
    compatibilitySummary:
      "Compatibility is not universal across mineral, PAO, ester, and additive packages. Industrial conversions often require OEM seal material confirmation. Shrink-swell behaviour may appear hours to weeks after fill. Paint compatibility on reservoirs is a related concern in some mobile OEM programs.",
    risks: [
      "Seal shrinkage and leak paths",
      "Excessive swell blocking movement",
      "Hose inner liner delamination",
    ],
    operationalConsequences: [
      "Environmental spill and downtime",
      "Contamination ingress through failed seals",
      "Warranty disputes after fluid conversion",
    ],
    safePractices: [
      "Confirm OEM elastomer and fluid approval together",
      "Pilot one machine on conversions",
      "Inspect seals and hose ends after first heat cycle",
      "Keep absorbents ready during first 48 hours post-change",
    ],
    whenToAvoidMixing: [
      "Large chemistry change without OEM elastomer note",
      "Ester or bio-fluid into mineral-only seal sets without approval",
      "Unknown seal age combined with aggressive solvent flush",
    ],
    troubleshootingSignals: [
      "Weep at rod seals after fluid change",
      "Hose blistering or softening",
      "Sudden leak at cooler O-rings",
    ],
    relatedApplications: [
      "Hydraulic cylinder fleets",
      "Industrial gearboxes with lip seals",
      "Compressor seal systems",
    ],
    relatedFailureModes: [
      "Seal extrusion",
      "Hose failure",
      "Contamination ingress",
    ],
    questionsToAsk: [
      "OEM fluid and seal material notes?",
      "Leak onset timing after last change?",
      "Any flush solvent used before refill?",
    ],
    repTalkTrack:
      "Right viscosity with wrong seal chemistry still leaks. Ask when leaks started and what changed. If converting fluid class, sell a pilot and inspection plan—not a same-day fleet-wide swap.",
    cautionNotes: [
      "Seal response varies by elastomer; no blanket guarantees.",
      "OEM elastomer bulletins override general marketing claims.",
    ],
    keywords: ["seal", "elastomer", "hose", "swell", "leak", "o ring"],
  },

  mixingViscosityGrades: {
    id: "mixingViscosityGrades",
    title: "Mixing Different Viscosity Grades",
    aliases: [
      "mixing viscosity grades",
      "mix 10w30 and 15w40",
      "mix hydraulic iso vg",
      "blend viscosity grades",
      "can i mix oil weights",
    ],
    questionExamples: [
      "Can I mix 10W-30 and 15W-40?",
      "What happens if I mix ISO VG 46 and 68?",
      "Is mixing oil weights OK?",
    ],
    directAnswer:
      "Mixing viscosity grades produces an intermediate viscosity that may or may not meet OEM operating targets. Small emergency top-offs are common; sustained operation on unapproved blended viscosity can increase wear, heat, or leakage without meeting the intended spec band.",
    compatibilitySummary:
      "Blending is mathematically predictable in bulk but uncertain in partial sumps with temperature variation. Engine oils, hydraulic ISO VG, and gear grades each have OEM windows for operating viscosity. Multi-grade oils are themselves blends—adding another grade changes HTHS and shear behaviour.",
    risks: [
      "Operating below minimum film thickness when too thin",
      "Cold-start cavitation when too thick for climate",
      "Fuel economy loss and heat when too thick at operating temp",
    ],
    operationalConsequences: [
      "Pump wear or overheating",
      "Cold-start damage in winter",
      "Confused maintenance records",
    ],
    safePractices: [
      "Return to single OEM grade at next service",
      "Estimate blend ratio and compare to OEM window cautiously",
      "Use oil analysis to verify in-service viscosity",
      "Avoid blending across chemistry classes simultaneously",
    ],
    whenToAvoidMixing: [
      "FA-4 with CK-4 viscosity experiments without OEM",
      "Hydraulic VG change on precision servo systems",
      "Gear grade changes without flush on critical reducers",
    ],
    troubleshootingSignals: [
      "Slow hydraulics after winter top-off with thicker grade",
      "Increased fuel use after thinning blend",
      "Analysis shows viscosity out of grade",
    ],
    relatedApplications: [
      "Fleet engine oil top-off",
      "Hydraulic emergency fills",
      "Seasonal grade changes",
    ],
    relatedFailureModes: [
      "Cavitation",
      "Internal leakage",
      "Wear from thin film",
    ],
    questionsToAsk: [
      "OEM approved viscosity grade?",
      "Blend ratio and sump size?",
      "Climate and operating temperature?",
    ],
    repTalkTrack:
      "Mixing weights is a bridge, not a spec. If they blended 10W-30 into 15W-40, treat the sump as unknown until analysis or the next drain. Quote the OEM grade on the PDS—not the average of what's on the shelf.",
    cautionNotes: [
      "Blended viscosity may not meet OEM HTHS or ISO VG targets.",
      "Confirm with analysis on critical assets.",
    ],
    keywords: ["viscosity", "grade", "10w30", "15w40", "iso vg", "mix"],
  },

  foodGradeVsNonFood: {
    id: "foodGradeVsNonFood",
    title: "Food Grade vs Non-Food Grade Lubricants",
    aliases: [
      "food grade compatibility",
      "mix food grade lubricant",
      "h1 h2 compatibility",
      "food plant lubricant mixing",
      "nsf food grade mixing",
    ],
    questionExamples: [
      "Can I use regular hydraulic oil in a food plant?",
      "What if non-food grease got into an H1 point?",
      "Is food grade compatible with regular oil?",
    ],
    directAnswer:
      "Food-grade and non-food lubricants must be segregated by program design—mixing violates audit requirements and can create incidental food-contact risk. H1, H2, and 3H categories are not interchangeable; contamination of H1 zones requires flush, documentation, and quality review.",
    compatibilitySummary:
      "Food plants rely on NSF registration and zone controls. Non-food fluids may contain additives unacceptable near product contact. Even trace cross-contamination can fail audit and trigger product hold. Dedicated pumps, hoses, and labeling are part of compatibility practice.",
    risks: [
      "Audit failure and production hold",
      "Product recall exposure",
      "Bearing failure if wrong H1 viscosity used",
    ],
    operationalConsequences: [
      "Shutdown for flush and inspection",
      "Loss of customer certification",
      "Emergency relube with approved H1 only",
    ],
    safePractices: [
      "Segregate storage and transfer equipment",
      "Label H1 points clearly",
      "Train maintenance on zone rules",
      "Maintain NSF registration records for quoted SKUs",
    ],
    whenToAvoidMixing: [
      "Any non-food top-off at H1 incidental contact points",
      "Using H2 where H1 is required",
      "Shared bulk tanks between plant and fleet yard",
    ],
    troubleshootingSignals: [
      "Audit finding of wrong lubricant at line",
      "Colour or odour mismatch at regrease point",
      "Missing NSF documentation for in-service fluid",
    ],
    relatedApplications: [
      "Food and beverage conveyors",
      "Bottling equipment",
      "Pharmaceutical packaging",
    ],
    relatedFailureModes: [
      "Regulatory non-compliance",
      "Bearing wear from wrong H1 viscosity",
    ],
    questionsToAsk: [
      "H1, H2, or 3H requirement for the point?",
      "Customer audit standard?",
      "How did cross-contamination occur?",
    ],
    repTalkTrack:
      "Food grade is a compliance boundary, not a performance tweak. If non-food entered an H1 zone, stop and run the plant quality playbook—flush, document, re-fill with NSF H1 on the PDS. Never suggest 'just a little' conventional oil.",
    cautionNotes: [
      "Do not approve non-food fluids in food-contact zones.",
      "Exact H1 SKU requires NSF registration on PDS.",
    ],
    keywords: ["food grade", "h1", "h2", "nsf", "contamination", "audit"],
  },

  waterContaminationConcerns: {
    id: "waterContaminationConcerns",
    title: "Water Contamination Compatibility Concerns",
    aliases: [
      "water in oil",
      "water contamination",
      "milky hydraulic oil",
      "water and lubricant compatibility",
      "emulsified hydraulic fluid",
    ],
    questionExamples: [
      "What does water do to hydraulic oil?",
      "Is milky oil still OK to use?",
      "Can I mix water contaminated oil with fresh oil?",
    ],
    directAnswer:
      "Water is not a compatible diluent—it reacts with lubricants by emulsifying, reducing film strength, and accelerating oxidation and rust. Topping off with fresh oil over heavily water-contaminated fluid does not restore protection; water must be removed or the fluid changed per OEM limits.",
    compatibilitySummary:
      "Demulsifying hydraulic fluids are designed to shed free water for drain; emulsified water is more dangerous. Grease contaminated with water loses consistency and corrosion protection. Coolant ingress into engine oil is a severe incompatibility event. Water tolerance limits are ppm-level for many systems—visual 'clear enough' is not a standard.",
    risks: [
      "Rust and micropitting",
      "Accelerated oxidation and acid formation",
      "Filter plugging from emulsion-stable fines",
      "Loss of EP and AW film strength",
    ],
    operationalConsequences: [
      "Pump and bearing failure",
      "Valve stiction from varnish precursors",
      "Unplanned fluid disposal cost",
    ],
    safePractices: [
      "Drain free water from sump bottoms routinely",
      "Fix ingress points before refill",
      "Use desiccant breathers and sealed caps outdoors",
      "Run water content analysis on critical assets",
    ],
    whenToAvoidMixing: [
      "Topping fresh fluid onto milky emulsified sump without correction",
      "Ignoring coolant or process water ingress",
      "Using water as compressor cooling top-off in oil systems",
    ],
    troubleshootingSignals: [
      "Hazy or milky appearance",
      "Rust on tank walls and rods",
      "Frequent filter changes with dark sludge",
      "Acid smell or rising TAN on analysis",
    ],
    relatedApplications: [
      "Outdoor mobile hydraulics",
      "Paper and wash-down plants",
      "Mining and quarry water spray sites",
    ],
    relatedFailureModes: [
      "Rust and corrosion",
      "Emulsion-stable contamination",
      "Oxidation acceleration",
    ],
    questionsToAsk: [
      "Fog, rain, wash-down, or heat exchanger leak source?",
      "Free water drain schedule?",
      "Water ppm from last analysis?",
    ],
    repTalkTrack:
      "Water is the enemy of the sump—not something you blend away. If it's milky, find the ingress, drain water, and change or dehydrate per OEM limits. Fresh KLONDIKE fill only after the water story is fixed.",
    cautionNotes: [
      "Do not assure continued use of visibly contaminated fluid.",
      "OEM water limits and corrective action require confirmation.",
    ],
    keywords: ["water", "milky", "emulsion", "contamination", "rust", "demuls"],
  },
};
