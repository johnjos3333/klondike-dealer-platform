/**
 * Canonical KLONDIKE hydraulic troubleshooting intelligence (deterministic, data only).
 * Grounded on indexed hydraulic hierarchy and field troubleshooting logic — not wired to UI.
 */

/** @type {number} */
export const HYDRAULIC_TROUBLESHOOTING_KNOWLEDGE_VERSION = 1;

/**
 * Canonical hydraulic hierarchy product anchors (aligns with hydraulicCanonicalProductIntelligence.js).
 * @type {Readonly<Record<string, { canonicalId: string, pdsMapKey: string, tier: string }>>}
 */
export const HYDRAULIC_CANONICAL_HIERARCHY_REF = Object.freeze({
  commercialAW: Object.freeze({
    canonicalId: "hydr-canonical-commercial-aw",
    pdsMapKey: "AW Hydraulic Commercial",
    tier: "professional_series",
  }),
  awAdvanced: Object.freeze({
    canonicalId: "hydr-canonical-aw-advanced",
    pdsMapKey: "AW Hydraulic Advanced",
    tier: "advanced",
  }),
  mvAW: Object.freeze({
    canonicalId: "hydr-canonical-mv-aw",
    pdsMapKey: "MV AW Hydraulic",
    tier: "advanced_hvlp",
  }),
  xvi: Object.freeze({
    canonicalId: "hydr-canonical-xvi-all-season",
    pdsMapKey: "XVI All Season Hydraulic",
    tier: "extreme_hvlp",
  }),
  wetBrake: Object.freeze({
    canonicalId: "hydr-canonical-wet-brake-fluid-full-synthetic",
    pdsMapKey: "Wet Brake Fluid Full Synthetic",
    tier: "tractor_wet_brake",
  }),
  utf: Object.freeze({
    canonicalId: "hydr-canonical-universal-tractor-fluid",
    pdsMapKey: "Universal Tractor Fluid",
    tier: "tractor_utto",
  }),
  arcticTractor: Object.freeze({
    canonicalId: "hydr-canonical-arctic-tractor-fluid",
    pdsMapKey: "Arctic Tractor Fluid Synthetic Blend",
    tier: "arctic_utto",
  }),
  sae10w: Object.freeze({
    canonicalId: "hydr-canonical-sae-10w-hd-hydraulic",
    pdsMapKey: "SAE 10W Hydraulic",
    tier: "oem_sae_10w",
  }),
  longLifeTurbine: Object.freeze({
    canonicalId: "hydr-canonical-long-life-turbine",
    pdsMapKey: "Long Life Turbine Oil",
    tier: "industrial_turbine",
  }),
  synCirculatingTurbine: Object.freeze({
    canonicalId: "hydr-canonical-syn-circulating-compressor-turbine",
    pdsMapKey: "Synthetic Circulating Compressor Turbine",
    tier: "industrial_circulating",
  }),
});

/**
 * @typedef {{
 *   canonicalId: string,
 *   pdsMapKey: string,
 *   productName: string,
 *   directionNote: string,
 * }} HydraulicProductDirection
 *
 * @typedef {{
 *   id: string,
 *   symptom: string,
 *   whatItUsuallyMeans: string,
 *   likelyRootCauses: string[],
 *   questionsToAsk: string[],
 *   fieldInspectionSteps: string[],
 *   fluidRelatedCauses: string[],
 *   contaminationIndicators: string[],
 *   operationalConsequences: string[],
 *   recommendedFluidDirection: string[],
 *   possibleKlondikeProducts: HydraulicProductDirection[],
 *   escalationTriggers: string[],
 *   repTalkTrack: string[],
 *   cautionNotes: string[],
 * }} HydraulicTroubleshootingProfile
 */

/** @param {HydraulicTroubleshootingProfile} row */
function freezeProfile(row) {
  return Object.freeze({
    ...row,
    likelyRootCauses: Object.freeze([...row.likelyRootCauses]),
    questionsToAsk: Object.freeze([...row.questionsToAsk]),
    fieldInspectionSteps: Object.freeze([...row.fieldInspectionSteps]),
    fluidRelatedCauses: Object.freeze([...row.fluidRelatedCauses]),
    contaminationIndicators: Object.freeze([...row.contaminationIndicators]),
    operationalConsequences: Object.freeze([...row.operationalConsequences]),
    recommendedFluidDirection: Object.freeze([...row.recommendedFluidDirection]),
    possibleKlondikeProducts: Object.freeze(row.possibleKlondikeProducts.map((p) => Object.freeze({ ...p }))),
    escalationTriggers: Object.freeze([...row.escalationTriggers]),
    repTalkTrack: Object.freeze([...row.repTalkTrack]),
    cautionNotes: Object.freeze([...row.cautionNotes]),
  });
}

/** @param {keyof typeof HYDRAULIC_CANONICAL_HIERARCHY_REF} key @param {string} productName @param {string} directionNote */
function productDir(key, productName, directionNote) {
  const ref = HYDRAULIC_CANONICAL_HIERARCHY_REF[key];
  return { canonicalId: ref.canonicalId, pdsMapKey: ref.pdsMapKey, productName, directionNote };
}

/** @type {HydraulicTroubleshootingProfile[]} */
const HYDRAULIC_TROUBLESHOOTING_PROFILE_ROWS = [
  freezeProfile({
    id: "cavitation",
    symptom: "Cavitation noise, erratic pressure, or pump damage symptoms",
    whatItUsuallyMeans:
      "The pump is ingesting air or the fluid cannot fill the inlet fast enough at current temperature and viscosity—cavitation is a suction-side and fluid-condition problem before it is a brand problem.",
    likelyRootCauses: [
      "Reservoir level low or return vortex pulling air into the suction line",
      "Restricted or collapsed suction hose, clogged strainer, or poor inlet geometry",
      "Fluid too viscous for cold-start conditions relative to pump inlet design",
      "Air entrainment from leaks, worn shaft seals, or agitated return flow",
      "Wrong fluid category (e.g., AW in UTF sump) changing effective viscosity and aeration behavior",
    ],
    questionsToAsk: [
      "When does noise appear—first start of the day, under load, or continuously?",
      "What ISO VG or OEM fluid class is in the reservoir and was anything topped off recently?",
      "Reservoir level, breather condition, and any recent hose or filter work?",
      "Ambient low temperature at the site and pump type (gear, piston, vane)?",
      "Any foaming, milky fluid, or pressure gauge hunting?",
    ],
    fieldInspectionSteps: [
      "Verify reservoir level mid-stroke and sight-glass clarity; check breather and fill cap seal.",
      "Inspect suction hose routing, clamps, and strainer—look for collapse, pinches, and inlet leaks.",
      "Sample fluid appearance; note foam, milkiness, or dark varnish on the stick.",
      "Compare ambient low to fluid pour/cold-flow expectations on the indexed PDS row.",
      "Log pump inlet vacuum or manufacturer diagnostic steps if available before changing fluid grade.",
    ],
    fluidRelatedCauses: [
      "ISO VG too heavy for cold morning inlet conditions on straight HM AW",
      "Seasonal straight ISO swap without plotting site lows against pour data",
      "Oxidized or contaminated fluid raising effective viscosity and air release time",
      "Mixing incompatible fluids that foam and slow air release",
    ],
    contaminationIndicators: [
      "Milky or cloudy reservoir (water or severe aeration)",
      "Dark fluid with varnish on stick or filter media",
      "Foam that does not dissipate within normal dwell time",
      "Particle counts or water ppm out of spec on analysis",
    ],
    operationalConsequences: [
      "Pump scoring, shortened pump life, and intermittent actuator response",
      "Heat generation that accelerates oxidation and seal stress",
      "Unplanned downtime when cavitation is mistaken for pump failure only",
    ],
    recommendedFluidDirection: [
      "Confirm OEM viscosity class and HM vs HVLP approval before any grade change.",
      "If cold-start cavitation is documented on straight ISO AW, evaluate MV AW or XVI when OEM allows HVLP wide-temperature programs.",
      "For tractor common sump, use UTF/Arctic UTTO—not AW—for category-correct cold flow and wet brake chemistry.",
      "Fix mechanical inlet and contamination paths first; fluid upgrades do not cure restricted suction.",
    ],
    possibleKlondikeProducts: [
      productDir("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "HVLP wide-temperature AW when pump chart allows DIN 51524 Part 3—indexed pour supports cold planning."),
      productDir("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Extreme HVLP ISO 46 wide-band when OEM approves HVLP ISO 46 for brutal ambient swing."),
      productDir("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "Baseline HM AW when tag requires straight ISO and mechanical issues are ruled out."),
      productDir("arcticTractor", "KLONDIKE Arctic Tractor Fluid Synthetic Blend", "Winter UTTO when OEM allows J20D arctic program—not AW in tractor sump."),
    ],
    escalationTriggers: [
      "Metallic debris on filter or loud pump damage after sustained cavitation",
      "Repeated failure after correct fluid and inlet correction—OEM pump service required",
      "Unknown fluid history with category mix (AW + UTF)—flush per OEM before refill",
    ],
    repTalkTrack: [
      "Cavitation is usually inlet, level, or viscosity at temperature—let's walk the suction side before we swap drums.",
      "Read the pump tag for HM vs HVLP and ISO VG; I'll only point to MV AW or XVI when that class is already allowed.",
      "If this is a tractor sump, AW is the wrong category—UTF or Arctic Tractor is the conversation after we confirm MAT/J20.",
    ],
    cautionNotes: [
      "Do not up-tier fluid without OEM class approval on the nameplate.",
      "Higher VI does not fix restricted suction lines or low reservoir level.",
      "Never use turbine or compressor oil in mobile AW circuits—or AW in turbine sumps.",
    ],
  }),

  freezeProfile({
    id: "wetBrakeChatter",
    symptom: "Wet brake chatter, squeal, or grabby pedal on tractor or UTTO equipment",
    whatItUsuallyMeans:
      "Friction instability in a wet brake pack—often wrong fluid category, contaminated sump, or degraded UTTO/wet-brake chemistry—not simply low fluid level.",
    likelyRootCauses: [
      "AW hydraulic or engine oil top-off in common sump instead of UTF or OEM wet-brake fluid",
      "Wrong color/program UTF (CNH red vs John Deere green) for the axle tag",
      "Water or dirt contamination changing friction curve",
      "Worn friction discs, glazed plates, or mechanical adjustment issues",
      "Summer UTF left in service during severe cold engagement cycles",
    ],
    questionsToAsk: [
      "Equipment make, model, and axle tag fluid specification (MAT, J20C, J20D)?",
      "Any recent top-off with non-UTF product or unknown drum?",
      "Chatter hot, cold, or after long idle—first pedal of the day?",
      "Fluid color, smell, water test, and last change interval?",
      "Is sump dedicated wet brake only or transmission/hydraulic/wet brake common?",
    ],
    fieldInspectionSteps: [
      "Photograph axle and transmission tags; compare to indexed PDS OEM lines.",
      "Check fluid level and condition on dipstick—water droplets, milkiness, or metallic glitter.",
      "Confirm drum color/program matches iron brand before quoting bulk.",
      "Test pedal feel and listen for chatter at slow roll vs loaded stop.",
      "Review service history for AW hydraulic guns used on tractor fills.",
    ],
    fluidRelatedCauses: [
      "Category error: HM zinc AW in UTTO wet brake sump",
      "Friction chemistry mismatch between UTF tiers or brands",
      "Water ingress reducing wet brake compatibility performance",
      "Oxidized UTTO with depleted friction stabilizers",
    ],
    contaminationIndicators: [
      "Milky sump or emulsified appearance after wash-down or fording",
      "Dark, burnt odor fluid after AW mis-fill",
      "Debris on magnetic plug or filter bypass indicator",
    ],
    operationalConsequences: [
      "Operator safety and confidence loss in braking",
      "Friction pack damage and OEM warranty exposure",
      "Field downtime during planting/harvest when brakes are critical",
    ],
    recommendedFluidDirection: [
      "Restore OEM UTTO or dedicated wet brake fluid class per bulletin before debating premium tier.",
      "When MAT/J20 allows, position UTF baseline, Wet Brake Fluid Full Synthetic for dedicated friction programs, or Arctic Tractor for winter J20D.",
      "Flush contaminated sumps per OEM when AW or wrong-color UTF was added—do not thin-top-off.",
    ],
    possibleKlondikeProducts: [
      productDir("wetBrake", "KLONDIKE Wet Brake Fluid Full Synthetic", "Dedicated J20C/J20D wet brake row when OEM calls friction-specific fluid—not assumed from UTF drum."),
      productDir("utf", "KLONDIKE Universal Tractor Fluid", "Standard UTTO with indexed wet brake compatibility when MAT/C-4 common sump applies."),
      productDir("arcticTractor", "KLONDIKE Arctic Tractor Fluid Synthetic Blend", "Winter UTTO with J20D and Brookfield data when seasonal bulletin allows arctic row."),
    ],
    escalationTriggers: [
      "Chatter persists after documented flush with correct OEM fluid",
      "Smoked friction packs or metal in sump",
      "Brake failure or unsafe stopping distance—stop use and involve dealer/OEM",
    ],
    repTalkTrack: [
      "Chatter starts at the pedal and the tag—what fluid went in last and does the axle call MAT or J20?",
      "AW hydraulic is never the fix for wet brakes; let's confirm category before SKU.",
      "I'll match red UTF, standard UTF, or Wet Brake Fluid to the bulletin—not drum color habit.",
    ],
    cautionNotes: [
      "Confirm OEM wet brake and UTF requirements before bulk change.",
      "Do not interchange UTF Full Synthetic, Red UTF, and Wet Brake Fluid without PDS/OEM line.",
      "Fluid cannot fix glazed discs—mechanical inspection may be required.",
    ],
  }),

  freezeProfile({
    id: "hydraulicWhine",
    symptom: "Hydraulic whine, scream, or high-pitched pump noise",
    whatItUsuallyMeans:
      "Often aeration, cavitation, or relief-valve/regulator scream under load—sometimes normal at cold start until viscosity drops; distinguish from bearing wear.",
    likelyRootCauses: [
      "Air in fluid from low level, leaks, or foaming additive response",
      "Cavitation at inlet from viscosity or restriction",
      "Relief valve hunting or incorrect pressure setting",
      "Worn pump or coupling misalignment",
      "Wrong fluid viscosity causing high shear noise at temperature extreme",
    ],
    questionsToAsk: [
      "Constant whine or only when spooling cylinders / at high flow?",
      "New noise after fluid change, filter change, or hose repair?",
      "Foaming visible in reservoir?",
      "Fluid type and ISO grade in service?",
      "Operating temperature band on the gauge or IR gun reading?",
    ],
    fieldInspectionSteps: [
      "Observe reservoir for foam and return-line agitation.",
      "Check level, breather, suction strainer, and relief settings per manual.",
      "Compare noise cold vs hot idle.",
      "Inspect coupling alignment and pump mount bolts.",
      "Capture fluid sample if color or smell changed recently.",
    ],
    fluidRelatedCauses: [
      "Air release failure from contamination or wrong category mix",
      "Too heavy ISO at cold causing inlet whine until warm",
      "Too light ISO at hot causing internal slip noise and heat",
      "Foam from water or incompatible additive systems",
    ],
    contaminationIndicators: [
      "Persistent foam layer on reservoir surface",
      "Milky appearance or free water in bottom sample",
      "Varnish flakes increasing filter loading",
    ],
    operationalConsequences: [
      "Operator alarm and misdiagnosis as imminent pump failure",
      "Accelerated pump wear if aeration/cavitation continues",
      "Heat load that drives oxidation cycle faster",
    ],
    recommendedFluidDirection: [
      "Correct category first (AW vs UTF vs turbine ASTM D4304).",
      "If viscosity band is wrong for site histogram, discuss MV AW, XVI, SAE 10W, or Arctic UTTO per OEM—not habit.",
      "Advanced AW when analysis shows oxidation margin loss on otherwise correct ISO HM program.",
    ],
    possibleKlondikeProducts: [
      productDir("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "When HM HVLP is approved and cold whine tracks to straight ISO being thick at inlet."),
      productDir("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "HVLP ISO 46 extreme band when OEM allows wide-swing mobile HVLP."),
      productDir("sae10w", "KLONDIKE SAE 10W Heavy Duty Hydraulic Oil", "When nameplate requires SAE 10W zinc program—not ISO AW substitute."),
      productDir("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "Higher oxidation reserve on severe HM AW when fluid is degrading but viscosity class is correct."),
    ],
    escalationTriggers: [
      "Metallic noise change to knock or grind",
      "Pressure failure to reach spec",
      "Pump case drain flow excessive—OEM service",
    ],
    repTalkTrack: [
      "Let's separate air, viscosity, and mechanical whine with the reservoir sight glass and tag in hand.",
      "I'll only move you to MV AW or XVI if HVLP is already on the chart.",
      "Turbine sumps get D4304 rows—whine on a turbine is not an AW conversation.",
    ],
    cautionNotes: [
      "Do not raise ISO VG without OEM approval—can worsen cold whine or hot thinning.",
      "UTF and AW are different categories on tractors.",
    ],
  }),

  freezeProfile({
    id: "hydraulicOverheating",
    symptom: "Hydraulic fluid overheating, hot reservoir, or heat shutdown",
    whatItUsuallyMeans:
      "System heat exceeds fluid and cooling design—could be overwork, cooler fouling, internal leakage, wrong viscosity, or oxidized fluid with poor heat transfer and varnish formation.",
    likelyRootCauses: [
      "Continuous high load beyond cooler capacity",
      "Relief valve stuck or metering causing constant bypass heating",
      "Wrong viscosity (too light or too heavy) for duty cycle",
      "Oxidized fluid with varnish insulating heat transfer",
      "Contamination causing valve stiction and energy loss",
    ],
    questionsToAsk: [
      "What is normal operating temp vs today—any new duty or attachment?",
      "Cooler fins clean? Fan and thermostat functional?",
      "Fluid age, hours, and last analysis TAN/oxidation?",
      "Recent change in ISO grade or product category?",
      "Any internal leakage signs (case drain flow, warm hose sections)?",
    ],
    fieldInspectionSteps: [
      "Measure reservoir and return-line temps vs OEM limits.",
      "Inspect cooler, fan drive, and ambient airflow.",
      "Check relief and standby pressure settings.",
      "Sample fluid for color, odor, and analysis if available.",
      "Review filter bypass and suction restrictions increasing heat.",
    ],
    fluidRelatedCauses: [
      "Oxidation stability exhausted on entry Commercial AW when duty is severe",
      "VI breakdown or shear on wrong multi-grade assumption",
      "Water contamination lowering film strength and increasing friction heat",
      "ISO too light causing internal leakage and slip heat",
    ],
    contaminationIndicators: [
      "Dark, burnt odor fluid",
      "Varnish on stick, valves sticking",
      "Water ppm high on analysis",
      "High particle count on patch test",
    ],
    operationalConsequences: [
      "Seal hardening and leak acceleration",
      "Additive depletion and sludge formation",
      "Pump and valve failure cascades",
      "Production loss on presses and mobile iron",
    ],
    recommendedFluidDirection: [
      "Confirm cooler and mechanical leakage before fluid marketing.",
      "On approved HM AW, step oxidation reserve to AW Advanced when analysis supports—not random synthetic guess.",
      "HVLP wide-band (MV AW, XVI) when OEM allows and duty is wide-temperature with documented VI need.",
      "Turbine loops: Long Life Turbine or Synthetic Circulating per ASTM D4304—never AW top-off.",
    ],
    possibleKlondikeProducts: [
      productDir("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "8000+ hr oxidation indexed tier when HM AW is correct class but heat oxidizes fluid."),
      productDir("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Extreme HVLP ISO 46 when OEM approves for hot afternoon and cold morning on one ISO 46 program."),
      productDir("longLifeTurbine", "KLONDIKE Long Life Turbine Oils", "Stationary turbine ASTM D4304 Type I—oxidation and water separation discipline on index."),
      productDir("synCirculatingTurbine", "KLONDIKE Full Synthetic Circulating Compressor Turbine Oils", "Combined circulating loops per ASTM D4304 Type I synthetic row when OEM specifies."),
    ],
    escalationTriggers: [
      "Shutdown alarms or smoke from reservoir",
      "Acute seal failure rate after overheat event",
      "Metal in sample—flush and OEM inspection",
    ],
    repTalkTrack: [
      "Heat is a symptom—cooler, relief, and duty first; then we'll read analysis against Commercial vs Advanced AW on the tag.",
      "I won't put XVI in the tank without HVLP ISO 46 on the nameplate.",
      "Turbine bulk stays away from AW guns—different ASTM class entirely.",
    ],
    cautionNotes: [
      "Higher oxidation tier does not fix cooler fouling or stuck relief valves.",
      "Confirm ISO VG with OEM before any change.",
    ],
  }),

  freezeProfile({
    id: "foaming",
    symptom: "Hydraulic foaming—persistent foam in reservoir or aerated actuators",
    whatItUsuallyMeans:
      "Air stabilized in the fluid from ingestion, contamination, wrong additives, or return-line agitation—foam is both a fluid condition and a mechanical return-path issue.",
    likelyRootCauses: [
      "Low reservoir level or return plunging below fluid surface",
      "Leaking suction side or worn pump shaft seals",
      "Water contamination or incompatible fluid mix",
      "Overfilled reservoir causing churning",
      "Wrong fluid category with poor air release for the system design",
    ],
    questionsToAsk: [
      "When did foam start—after top-off, wash-down, or hose work?",
      "Does foam clear after idle or persist for hours?",
      "Any pressure washing into breather or fill port?",
      "Fluid type and any known mix in history?",
      "Return line height and diffuser installed per OEM?",
    ],
    fieldInspectionSteps: [
      "Check level at correct temperature mark; inspect breather and fill cap.",
      "Trace suction leaks with clean oil around fittings.",
      "Water crackle test or lab water ppm if available.",
      "Review return line routing into reservoir.",
      "Note foam stability time after shutdown.",
    ],
    fluidRelatedCauses: [
      "Water emulsification from ingress",
      "Incompatible top-off (AW into UTF, detergent mix, etc.)",
      "Severely oxidized fluid with altered air release",
      "Wrong viscosity increasing agitation at return",
    ],
    contaminationIndicators: [
      "Milky layer or chocolate mousse appearance",
      "Rapid darkening and burnt odor",
      "Filter media loaded with varnish or sludge",
    ],
    operationalConsequences: [
      "Spongy controls and inaccurate positioning",
      "Cavitation damage from compressible fluid column",
      "Pump and bearing lubrication failure in worst cases",
    ],
    recommendedFluidDirection: [
      "Eliminate water and category mix; flush per OEM if history unknown.",
      "Refill with correct indexed class—UTF for tractor sump, HM/HVLP AW for industrial mobile per tag.",
      "Turbine/compressor rows for stationary foam issues on D4304 systems—not AW.",
    ],
    possibleKlondikeProducts: [
      productDir("utf", "KLONDIKE Universal Tractor Fluid", "Restore UTTO category on common sump after AW mis-fill caused foam."),
      productDir("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "Baseline HM AW refill when tag requires and sump is flushed clean."),
      productDir("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "Indexed water separation performance on severe AW when HM class stays."),
      productDir("longLifeTurbine", "KLONDIKE Long Life Turbine Oils", "Turbine reservoir foam—ASTM D4304 demulsibility discipline, not AW."),
    ],
    escalationTriggers: [
      "Foam with confirmed water after flood or pressure wash—full flush",
      "Pump damage noise with foam—stop and service",
    ],
    repTalkTrack: [
      "Foam means air or water—show me the sight glass and the last top-off drum label.",
      "We'll restore category before we talk premium tier.",
    ],
    cautionNotes: [
      "Anti-foam additives from untested products are not recommended—use OEM-approved class.",
      "Do not run equipment with severe aeration until level and leaks are corrected.",
    ],
  }),

  freezeProfile({
    id: "airEntrapment",
    symptom: "Air entrainment—spongy hydraulics, cloudy fluid, or compressible feel",
    whatItUsuallyMeans:
      "Free air is entering or trapped in the circuit and not releasing before the pump inlet—distinct from foam but often co-occurring.",
    likelyRootCauses: [
      "Suction leaks, loose fittings, or worn pump shaft seal",
      "Low fluid level and vortexing at return",
      "Cylinder rod seals pulling air on double-acting circuits",
      "Contamination increasing air retention time",
      "Aftermarket hose routing without proper fill/bleed procedure",
    ],
    questionsToAsk: [
      "Spongy at startup only or all day?",
      "Recent cylinder seal or hose replacement?",
      "Bleed procedure performed after service?",
      "Fluid clarity and level history?",
    ],
    fieldInspectionSteps: [
      "Pressurize suction side inspection where safe; check inlet fitting torque.",
      "Bleed high points per OEM after service.",
      "Run return low-agitation test—redirect return if plunging.",
      "Sample for water and particles.",
    ],
    fluidRelatedCauses: [
      "Fluid with poor air release due to oxidation or water",
      "Wrong category changing foam stability",
      "Viscosity too high at cold slowing bubble rise",
    ],
    contaminationIndicators: [
      "Cloudy fluid with micro-bubbles",
      "Intermittent milky appearance after idle",
      "High water on analysis",
    ],
    operationalConsequences: [
      "Precision loss in presses and load-holding drift",
      "Cavitation pitting on pump inlet side",
      "False low-pressure diagnostics",
    ],
    recommendedFluidDirection: [
      "Mechanical air removal first; then confirm fluid class on tag.",
      "MV AW / XVI / Arctic UTTO when cold retention of bubbles ties to documented viscosity issue and OEM allows.",
    ],
    possibleKlondikeProducts: [
      productDir("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "HVLP when approved to improve cold flow and reduce inlet air draw time."),
      productDir("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Wide-band HVLP ISO 46 for mobile systems with OEM HVLP approval."),
      productDir("arcticTractor", "KLONDIKE Arctic Tractor Fluid Synthetic Blend", "Cold UTTO programs when air release at Brookfield extremes is the seasonal issue."),
    ],
    escalationTriggers: [
      "Cannot purge air after bleed—internal leak or pump wear",
      "Safety-critical load holding failure",
    ],
    repTalkTrack: [
      "Air entrainment is plumbing and level before product—then we confirm the tag class.",
    ],
    cautionNotes: [
      "Do not continue high-duty work with spongy brakes or load-holding circuits.",
    ],
  }),

  freezeProfile({
    id: "sluggishColdStartup",
    symptom: "Sluggish hydraulics or slow PTO/brake engagement on cold start",
    whatItUsuallyMeans:
      "Fluid is too viscous for ambient temperature, pump inlet cannot fill, or UTTO/wet-brake program lacks cold Brookfield margin—often seasonal fluid mismatch.",
    likelyRootCauses: [
      "Summer ISO or UTF left in for winter lows",
      "Straight HM AW too thick at morning ambient for inlet design",
      "Water thickening or emulsion raising effective viscosity",
      "Mechanical issues masked until fluid warms (sticky valves, weak pump)",
    ],
    questionsToAsk: [
      "Lowest overnight temp at site and time until normal response?",
      "Fluid on tag vs fluid on invoice?",
      "Tractor common sump or separate hydraulic loop?",
      "Brookfield or pour data ever compared to OEM seasonal chart?",
    ],
    fieldInspectionSteps: [
      "Log ambient at key-on vs response time.",
      "Read dipstick fluid clarity when cold.",
      "Confirm no AW top-off on UTF iron.",
      "Compare axle tag seasonal bulletin for arctic row.",
    ],
    fluidRelatedCauses: [
      "Wrong seasonal ISO on straight AW",
      "UTF without arctic approval at sub-zero farm starts",
      "Category error raising viscosity and pedal drag",
    ],
    contaminationIndicators: [
      "Gel-like or waxy appearance at extreme cold (check for wrong product)",
      "Water ice crystals in sample jar test",
    ],
    operationalConsequences: [
      "Lost production hours waiting for warm-up",
      "Cavitation damage from cold starts under load",
      "Wet brake chatter on first pedal when friction fluid is too stiff",
    ],
    recommendedFluidDirection: [
      "Plot site lows against indexed pour/Brookfield on PDS before SKU change.",
      "MV AW or XVI for mobile HM/HVLP when OEM allows wide-temperature programs.",
      "Arctic Tractor Fluid for J20D winter UTTO; Wet Brake Fluid when dedicated cold friction program applies.",
      "SAE 10W when nameplate requires that class on yellow iron.",
    ],
    possibleKlondikeProducts: [
      productDir("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "HVLP seasonal simplification when DIN Part 3 is on the chart."),
      productDir("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Extreme ISO 46 HVLP for wide mobile swing per indexed operating band."),
      productDir("arcticTractor", "KLONDIKE Arctic Tractor Fluid Synthetic Blend", "Winter UTTO with J20D and Brookfield @ −40 °C on index."),
      productDir("wetBrake", "KLONDIKE Wet Brake Fluid Full Synthetic", "Dedicated wet brake cold engagement when OEM splits friction fluid from UTF."),
    ],
    escalationTriggers: [
      "No improvement after OEM seasonal fluid and warm-up procedure",
      "Pump damage noise on cold start under load",
    ],
    repTalkTrack: [
      "Cold sluggish is a temperature histogram problem—what was the overnight low and what's on the tag?",
      "Arctic Tractor and XVI are different categories—tractor vs industrial HVLP.",
    ],
    cautionNotes: [
      "Do not thin with solvents or unapproved diluents.",
      "Confirm OEM seasonal fluid bulletin before arctic bulk switch.",
    ],
  }),

  freezeProfile({
    id: "oxidationVarnish",
    symptom: "Oxidation, varnish, sludge, or dark sticky hydraulic fluid",
    whatItUsuallyMeans:
      "Fluid life exceeded or heat/air/water accelerated oxidation—varnish sticks valves and raises effective viscosity; this is analysis and maintenance discipline, not a single additive fix.",
    likelyRootCauses: [
      "Extended drain interval beyond fluid oxidation reserve for duty",
      "High continuous heat without cooler margin",
      "Water and particulate catalyzing oxidation",
      "Wrong fluid class with insufficient oxidation stability for application",
      "Turbine/compressor loop run on AW accidentally",
    ],
    questionsToAsk: [
      "Hours/months since last change and any analysis history?",
      "Operating temperature profile and duty cycle?",
      "Water ingress sources?",
      "Was fluid ever topped off with different category?",
    ],
    fieldInspectionSteps: [
      "Inspect stick for lacquer and smell for burnt odor.",
      "Check filter varnish loading and valve stiction.",
      "Pull analysis sample if program exists.",
      "Verify cooler performance and case drains.",
    ],
    fluidRelatedCauses: [
      "Commercial AW oxidation margin exhausted on severe duty",
      "Wrong ISO causing excess heat",
      "Water reducing oxidation inhibitor effectiveness",
      "AW mis-fill in turbine sump destroying class stability",
    ],
    contaminationIndicators: [
      "TAN rise on analysis",
      "Dark color with suspended sludge",
      "Sticking spools and slow response after hot soak",
    ],
    operationalConsequences: [
      "Valve failure and unplanned flush downtime",
      "Seal leakage from varnish and heat",
      "Warranty disputes on new components run on varnished fluid",
    ],
    recommendedFluidDirection: [
      "Flush per OEM when varnish is confirmed; refill correct class and ISO.",
      "Step HM AW from Commercial to Advanced when tag stays HM and analysis justifies reserve.",
      "Turbine: Long Life Turbine or Synthetic Circulating with ASTM D4304 discipline.",
      "XVI/MV AW only when HVLP class is approved—not as varnish solvent.",
    ],
    possibleKlondikeProducts: [
      productDir("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "Higher indexed oxidation hours on HM AW severe mobile/industrial."),
      productDir("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "Baseline refill after flush when HM ISO ladder matches tag."),
      productDir("longLifeTurbine", "KLONDIKE Long Life Turbine Oils", "10,000+ hr oxidation language on D4304 turbine row."),
      productDir("synCirculatingTurbine", "KLONDIKE Full Synthetic Circulating Compressor Turbine Oils", "Synthetic D4304 circulating when OEM specifies wide industrial loop."),
    ],
    escalationTriggers: [
      "Stuck proportional valves after varnish—contamination control service",
      "AW found in turbine sump—OEM flush protocol",
    ],
    repTalkTrack: [
      "Varnish means life and heat—show me analysis or hours, then we'll match oxidation tier on the PDS index.",
      "Flush first; premium fluid second with OEM sign-off.",
    ],
    cautionNotes: [
      "New fluid does not dissolve heavy varnish without proper flush procedure.",
      "Do not switch ASTM class without OEM.",
    ],
  }),

  freezeProfile({
    id: "contamination",
    symptom: "General hydraulic contamination—dirty fluid, valve wear, shortened filter life",
    whatItUsuallyMeans:
      "Particulate, water, or wrong chemistry in the loop—contamination control precedes product tier marketing.",
    likelyRootCauses: [
      "Breather ingesting dust; open reservoir during service",
      "Failed hoses shedding rubber or metal wear particles",
      "Water from seals, coolers, or wash-down",
      "Wrong top-off drum or cross-contamination between categories",
      "Inadequate filtration for ISO cleanliness target",
    ],
    questionsToAsk: [
      "Target cleanliness ISO code for the system?",
      "Filter change interval and last element cut-open?",
      "Any water events or pressure wash near breather?",
      "Bulk storage and transfer practices?",
    ],
    fieldInspectionSteps: [
      "Patch test or particle count if available.",
      "Inspect breather, fill port, and sample port hygiene.",
      "Review filter bypass indicators and suction screens.",
      "Check for milky water and metal glitter.",
    ],
    fluidRelatedCauses: [
      "Fluid cannot fix ingression—only carries particles until filtered",
      "Demulsibility helps water shed on AW/turbine rows when water is present—drain still required",
      "Category mix creating sludge mistaken for dirt",
    ],
    contaminationIndicators: [
      "Rapid filter delta-P increase",
      "Visible particles on magnet plugs",
      "Milky water emulsion",
      "Acid rise and odor on analysis",
    ],
    operationalConsequences: [
      "Abrasive wear on pumps and valves",
      "Stiction and erratic control",
      "Shortened fluid and component life",
    ],
    recommendedFluidDirection: [
      "Fix ingression, upgrade filtration, flush per OEM.",
      "Refill with correct indexed class; Advanced AW or turbine rows for oxidation/water separation when analysis supports same class.",
    ],
    possibleKlondikeProducts: [
      productDir("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "Water separation and oxidation reserve when HM AW class remains after cleanup."),
      productDir("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "Standard HM refill after flush on entry programs."),
      productDir("longLifeTurbine", "KLONDIKE Long Life Turbine Oils", "Turbine water separation and rust pass discipline on index."),
      productDir("utf", "KLONDIKE Universal Tractor Fluid", "UTTO refill after sump contamination flush on ag iron."),
    ],
    escalationTriggers: [
      "Metal failure cascade or pump scoring",
      "Water ppm above OEM limit after drain attempt",
    ],
    repTalkTrack: [
      "Contamination is a maintenance story—breathers, filters, and water sources before drum color.",
    ],
    cautionNotes: [
      "Do not recommend higher tier without confirming same OEM class.",
      "Flush procedures are OEM-specific.",
    ],
  }),

  freezeProfile({
    id: "waterIngress",
    symptom: "Water contamination—milky fluid, rust, or emulsion in hydraulic or UTF sump",
    whatItUsuallyMeans:
      "Free or emulsified water entered through breathers, coolers, seals, or wash-down—water separation performance on fluid helps only after ingress is stopped and water removed.",
    likelyRootCauses: [
      "Heat exchanger internal leak",
      "Rod seal or cover seal ingress",
      "Open fill cap, pressure wash into breather",
      "Condensation in seasonal temperature cycling",
      "Submerged cylinder or fording events on mobile equipment",
    ],
    questionsToAsk: [
      "Milky all the time or after specific events?",
      "Cooler type and any engine-coolant cross-check?",
      "Storage indoors vs outdoor bulk?",
      "Crackle test result or lab water ppm?",
    ],
    fieldInspectionSteps: [
      "Sample bottom drain for free water.",
      "Inspect cooler and cylinder rod seals.",
      "Check breather location and cap seal.",
      "Review wash-down SOP near fill points.",
    ],
    fluidRelatedCauses: [
      "Demulsibility exceeded—fluid cannot hold infinite water",
      "Wrong category reducing water separation behavior",
      "Neglected drain of free water after separation",
    ],
    contaminationIndicators: [
      "Milky appearance, rust on stick",
      "Failed water ppm on analysis",
      "Filter media swelling or collapse",
    ],
    operationalConsequences: [
      "Rust, oxidation acceleration, and bearing/pump wear",
      "Wet brake friction instability on UTF",
      "Filter plugging and acid formation",
    ],
    recommendedFluidDirection: [
      "Stop ingress, drain free water, filter circulate per OEM.",
      "Refill correct class; Advanced AW or turbine indexed rows when water separation is part of severe duty defense.",
      "UTF/Wet Brake after flush on tractor—never AW substitute.",
    ],
    possibleKlondikeProducts: [
      productDir("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "Indexed water separation on HM AW when class unchanged."),
      productDir("longLifeTurbine", "KLONDIKE Long Life Turbine Oils", "Turbine demulsibility discipline—ASTM D4304 program."),
      productDir("utf", "KLONDIKE Universal Tractor Fluid", "UTTO refill after water removal on common sump."),
      productDir("wetBrake", "KLONDIKE Wet Brake Fluid Full Synthetic", "When wet brake circuit had water—OEM flush then dedicated row."),
    ],
    escalationTriggers: [
      "Coolant confirmed in hydraulic sample",
      "Runaway rust and pump noise after flood event",
    ],
    repTalkTrack: [
      "Water is ingress first—where did it enter, and has free water been drained?",
      "I'll match AW Advanced or turbine row only after we confirm ASTM/class on the tag.",
    ],
    cautionNotes: [
      "Water separation on PDS is not permission to ignore drain and fix leaks.",
      "Wet brakes with water need OEM friction inspection.",
    ],
  }),

  freezeProfile({
    id: "filterPlugging",
    symptom: "Filter plugging, frequent element changes, or high delta-P",
    whatItUsuallyMeans:
      "Filters are doing their job—or fluid is varnished, water-emulsified, or contaminated beyond baseline; sudden plugging after fluid change may indicate incompatibility or unsettled sludge.",
    likelyRootCauses: [
      "Particle ingression above filter rating",
      "Oxidation sludge and varnish release",
      "Water gel and microbial growth in rare cases",
      "Incompatible mix generating precipitate",
      "Wrong filter rating or bypass stuck open previously",
    ],
    questionsToAsk: [
      "Sudden or gradual delta-P increase?",
      "Hours since fluid change or flush?",
      "Filter micron rating vs OEM spec?",
      "Any additive or solvent introduced?",
    ],
    fieldInspectionSteps: [
      "Cut open last element—metal, fiber, varnish, or gel?",
      "Check bypass indicator and suction screens.",
      "Sample fluid for water and particle count.",
      "Verify filter part number matches OEM.",
    ],
    fluidRelatedCauses: [
      "Varinish sludge from oxidized AW",
      "Water emulsion blocking media",
      "Category mix sludge after mis-fill",
      "Turbine fluid wrong ISO causing deposit pattern (confirm analysis)",
    ],
    contaminationIndicators: [
      "Dark paste on filter media",
      "Metallic sheen or rubber crumbs",
      "Milky gel layers",
    ],
    operationalConsequences: [
      "Bypass opening and unfiltered flow—wear event",
      "Starvation if element collapsed",
      "Downtime on element changes",
    ],
    recommendedFluidDirection: [
      "Source control and flush; then correct indexed fluid.",
      "Advanced AW when HM class stays and oxidation drove sludge.",
      "Filterability is OEM and filter-vendor spec—fluid tier alone does not replace element strategy.",
    ],
    possibleKlondikeProducts: [
      productDir("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "After flush on severe HM when oxidation was root cause."),
      productDir("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "OEM-correct HM refill post-cleanup on entry programs."),
      productDir("synCirculatingTurbine", "KLONDIKE Full Synthetic Circulating Compressor Turbine Oils", "Circulating industrial loops per D4304 after contamination protocol."),
    ],
    escalationTriggers: [
      "Metal in filter media with pump noise",
      "Repeated plug in <50 hours after certified flush",
    ],
    repTalkTrack: [
      "Let's read the filter element like a lab report—then fix ingression before we talk oxidation tier.",
    ],
    cautionNotes: [
      "Do not upsize micron without OEM approval.",
      "Flush may require two element changes—plan downtime.",
    ],
  }),

  freezeProfile({
    id: "sealShrinkage",
    symptom: "Seal leakage, shrinkage, or weeping after fluid change",
    whatItUsuallyMeans:
      "Seal elastomer incompatible with fluid chemistry or rapid switch without flush—also normal weep vs catastrophic leak must be distinguished.",
    likelyRootCauses: [
      "Category change (mineral to synthetic, AW to UTF, etc.) without flush",
      "Wrong additive chemistry for seal material age",
      "Heat and oxidation hardening seals (fluid secondary)",
      "Physical damage or misaligned rod",
    ],
    questionsToAsk: [
      "Leaks started when after fluid switch?",
      "Previous and current fluid chemistry class?",
      "Seal age and recent cylinder service?",
      "Temperature when leaking worst?",
    ],
    fieldInspectionSteps: [
      "Identify leak points—rod, port, pump seal.",
      "Compare fluid category to OEM seal compatibility bulletin.",
      "Check for overheating signs.",
      "Document flush procedure used.",
    ],
    fluidRelatedCauses: [
      "Rapid chemistry change on aged seals",
      "Wrong zinc level for seal pack (SAE 10W vs ashless)",
      "UTTO vs AW category swap",
    ],
    contaminationIndicators: [
      "Often none—mechanical/chemistry mismatch",
      "Burnt fluid accelerating seal hardening",
    ],
    operationalConsequences: [
      "Environmental spill risk and fluid loss",
      "Air ingestion at leak points",
      "Downtime for seal kits",
    ],
    recommendedFluidDirection: [
      "Return to OEM-approved class; staged flush per bulletin before new chemistry.",
      "SAE 10W high-zinc only when nameplate requires—do not substitute ashless AW.",
      "UTF/Wet Brake for tractor seals—not AW.",
    ],
    possibleKlondikeProducts: [
      productDir("utf", "KLONDIKE Universal Tractor Fluid", "Restore UTTO after AW mis-fill caused seal swell/shrink cycle."),
      productDir("sae10w", "KLONDIKE SAE 10W Heavy Duty Hydraulic Oil", "When OEM mandates SAE 10W zinc program for seal and pump compatibility."),
      productDir("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "HM AW return after flush when tag requires mineral/zinc HM."),
    ],
    escalationTriggers: [
      "Multiple seal failures post one bulk delivery—batch verification",
      "Safety-critical cylinder drift with leak",
    ],
    repTalkTrack: [
      "Seal leaks after a fluid change are a compatibility audit—what was in it and what's on the tag now?",
    ],
    cautionNotes: [
      "Do not blend categories to 'transition' without OEM flush guidance.",
      "Seal kits may be required regardless of fluid correction.",
    ],
  }),

  freezeProfile({
    id: "cylinderDrift",
    symptom: "Cylinder drift, load drop, or inability to hold position",
    whatItUsuallyMeans:
      "Internal valve leakage, cylinder seal bypass, or contaminated fluid causing spool stiction—not usually solved by fluid brand alone.",
    likelyRootCauses: [
      "Worn piston seals or barrel scoring",
      "Counterbalance or load-holding valve leak",
      "Contamination causing sticky spools",
      "Varnish on valves after overheat",
      "Air in cylinder causing spongy hold",
    ],
    questionsToAsk: [
      "Drift under load static or only during motion?",
      "Single cylinder or all functions?",
      "Fluid cleanliness and temperature?",
      "Recent seal service or crash damage?",
    ],
    fieldInspectionSteps: [
      "Isolate cylinder electrically/hydraulically per manual.",
      "Check load-holding valves and line relief settings.",
      "Inspect rod for scoring and fluid at weep.",
      "Test fluid for varnish and particles.",
    ],
    fluidRelatedCauses: [
      "Varnish/stiction from oxidized fluid",
      "Water causing rust and abrasive wear",
      "Wrong viscosity affecting leakage paths marginally",
    ],
    contaminationIndicators: [
      "Sticky spools when hot",
      "Particles in return filter",
      "Dark varnish on stick",
    ],
    operationalConsequences: [
      "Safety risk on elevated loads",
      "Quality issues in press and injection applications",
      "Unplanned cylinder rebuilds",
    ],
    recommendedFluidDirection: [
      "Mechanical diagnosis first; flush if contamination/varnish confirmed.",
      "Refill OEM class—Commercial/Advanced AW, XVI, UTF per tag—not viscosity guess.",
    ],
    possibleKlondikeProducts: [
      productDir("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "Correct HM ISO after flush on standard mobile/industrial."),
      productDir("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "When HM class remains and fluid oxidation contributed to varnish stiction."),
      productDir("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Only if HVLP ISO 46 already approved—drift is rarely viscosity marketing."),
    ],
    escalationTriggers: [
      "Load-holding failure on personnel lifts or cranes—stop use",
      "Confirmed internal cylinder bypass—rebuild",
    ],
    repTalkTrack: [
      "Drift is valves and seals—fluid is secondary unless varnish or dirt is obvious in the sample.",
    ],
    cautionNotes: [
      "Do not raise pressure to compensate for drift—safety hazard.",
    ],
  }),

  freezeProfile({
    id: "erraticHydraulics",
    symptom: "Erratic hydraulics—jerky motion, pressure swings, or hunting controls",
    whatItUsuallyMeans:
      "Intermittent flow or pressure from air, contamination stiction, electronic control issues, or pump wear—fluid is one variable in a systems diagnosis.",
    likelyRootCauses: [
      "Air entrainment or foam",
      "Contaminated proportional valves",
      "Pressure compensator instability",
      "Worn pump or erratic supply flow",
      "Water causing valve stick-slip",
    ],
    questionsToAsk: [
      "Electronic fault codes present?",
      "Pattern tied to temperature or load?",
      "Recent fluid or filter service?",
      "All functions or one circuit?",
    ],
    fieldInspectionSteps: [
      "Log pressure traces at test ports if available.",
      "Check for air and water in reservoir.",
      "Inspect electrical connections to valves.",
      "Swap test where OEM allows to isolate circuit.",
    ],
    fluidRelatedCauses: [
      "Stick-slip from varnish",
      "Water/rust on valve spools",
      "Foam causing compressibility",
      "Category mix altering friction in UTTO/brake circuits",
    ],
    contaminationIndicators: [
      "Intermittent milky appearance",
      "Filter delta-P swings",
      "Analysis trending water or particles",
    ],
    operationalConsequences: [
      "Quality scrap and unsafe machine motion",
      "Operator fatigue and mis-adjustment",
    ],
    recommendedFluidDirection: [
      "Stabilize fluid class and cleanliness; flush if history unknown.",
      "MV AW / XVI when viscosity swing at temperature causes documented flow issues and OEM allows HVLP.",
      "UTF/Wet Brake for tractor brake/transmission erratic feel—not AW.",
    ],
    possibleKlondikeProducts: [
      productDir("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "Temperature-stable HVLP when tag allows."),
      productDir("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Wide-band mobile HVLP ISO 46 when approved."),
      productDir("utf", "KLONDIKE Universal Tractor Fluid", "Restore UTTO friction stability on common sump."),
      productDir("wetBrake", "KLONDIKE Wet Brake Fluid Full Synthetic", "Dedicated friction program when erratic is brake-specific."),
    ],
    escalationTriggers: [
      "Safety interlock trips or uncommanded motion",
      "Electronic control fault persistent",
    ],
    repTalkTrack: [
      "Erratic is air, dirt, or electronics—I'll confirm fluid class matches the tag before suggesting MV AW or UTF.",
    ],
    cautionNotes: [
      "Do not disable safety valves to 'smooth' motion.",
    ],
  }),

  freezeProfile({
    id: "pumpWear",
    symptom: "Pump wear, low flow, or rising case drain",
    whatItUsuallyMeans:
      "Mechanical wear accelerated by contamination, cavitation, or wrong viscosity—fluid quality affects rate of wear but worn pumps need service.",
    likelyRootCauses: [
      "Particle contamination abrasive wear",
      "Cavitation pitting at inlet",
      "Wrong viscosity thinning film at temperature",
      "Run dry or low level events",
      "Water rust and corrosion products",
    ],
    questionsToAsk: [
      "Case drain flow trend vs baseline?",
      "Noise history before flow loss?",
      "Fluid analysis metals trend?",
      "Hours on pump?",
    ],
    fieldInspectionSteps: [
      "Measure case drain per OEM.",
      "Inspect suction strainer and fluid cleanliness.",
      "Check inlet for cavitation damage signs.",
      "Metal analysis on fluid sample if available.",
    ],
    fluidRelatedCauses: [
      "Inadequate filtration for duty",
      "Water and oxidation byproducts",
      "Cold start cavitation on wrong ISO",
    ],
    contaminationIndicators: [
      "High iron/copper on analysis",
      "Glitter on magnets",
      "Dark fluid with sludge",
    ],
    operationalConsequences: [
      "Progressive slowdown and heat",
      "Expensive pump replacement",
      "Downstream valve damage",
    ],
    recommendedFluidDirection: [
      "Correct contamination and cavitation root causes on refill.",
      "Advanced AW when HM class correct and oxidation/contamination control needed.",
      "SAE 10W or MV AW/XVI per nameplate—not generic upgrade.",
    ],
    possibleKlondikeProducts: [
      productDir("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "Severe HM programs after cleanup when tag matches."),
      productDir("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "OEM HM refill with improved filtration discipline."),
      productDir("sae10w", "KLONDIKE SAE 10W Heavy Duty Hydraulic Oil", "Cat/Eaton SAE 10W programs per indexed OEM lines."),
    ],
    escalationTriggers: [
      "Case drain exceeds OEM limit—replace pump",
      "Metal failure in <500 hours post flush",
    ],
    repTalkTrack: [
      "Pump wear is metals and case drain—fluid tier helps only after filtration and inlet fixes.",
    ],
    cautionNotes: [
      "Replacing fluid without fixing contamination repeats failure.",
    ],
  }),

  freezeProfile({
    id: "viscosityTooHeavy",
    symptom: "Fluid too heavy—slow response when cold, high energy use, cavitation at inlet",
    whatItUsuallyMeans:
      "Effective viscosity above what pump and ambient require—straight ISO too high for winter or wrong grade in reservoir.",
    likelyRootCauses: [
      "ISO VG one grade high for ambient",
      "Summer grade left in for winter",
      "Oxidized fluid thickening",
      "Wrong product category with higher base viscosity",
    ],
    questionsToAsk: [
      "Current ISO VG and ambient lows?",
      "OEM allowable HVLP multi-grade?",
      "Tractor UTTO seasonal chart?",
    ],
    fieldInspectionSteps: [
      "Compare tag ISO to drum label.",
      "Log cold response vs warm.",
      "Check analysis viscosity at 40/100C if available.",
    ],
    fluidRelatedCauses: [
      "Straight HM AW when HVLP wide-temp approved",
      "Summer UTF without arctic row",
      "Using turbine ISO in mobile pump (category error)",
    ],
    contaminationIndicators: [
      "Oxidation thickening on analysis",
      "Water emulsion increasing apparent viscosity",
    ],
    operationalConsequences: [
      "Cavitation and pump wear at cold",
      "Fuel/energy loss on mobile",
      "Slow cycle times",
    ],
    recommendedFluidDirection: [
      "Move to correct ISO per OEM—not arbitrary thin down.",
      "MV AW or XVI when HVLP approved for wide temperature.",
      "Arctic Tractor for winter UTTO; SAE 10W when nameplate requires.",
    ],
    possibleKlondikeProducts: [
      productDir("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "HVLP wide-temp when DIN Part 3 on chart."),
      productDir("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Extreme HVLP ISO 46 wide-band mobile."),
      productDir("arcticTractor", "KLONDIKE Arctic Tractor Fluid Synthetic Blend", "Winter UTTO Brookfield program."),
      productDir("sae10w", "KLONDIKE SAE 10W Heavy Duty Hydraulic Oil", "SAE 10W class when OEM specifies vs thicker ISO habit."),
    ],
    escalationTriggers: [
      "Cannot achieve OEM cold start procedure",
      "Pump damage confirmed from cold cavitation",
    ],
    repTalkTrack: [
      "Too heavy is a grade and season problem—tag and thermometer before drum swap.",
    ],
    cautionNotes: [
      "Never thin with unapproved solvents.",
      "Do not drop ISO below OEM minimum.",
    ],
  }),

  freezeProfile({
    id: "viscosityTooLight",
    symptom: "Fluid too light—internal leakage, overheating, noise when hot",
    whatItUsuallyMeans:
      "Effective viscosity below film needs at operating temperature—wrong ISO, fuel dilution, or severe shear on wrong product assumption.",
    likelyRootCauses: [
      "ISO VG too low for hot ambient and load",
      "Wrong winter grade left in for summer",
      "Fuel or solvent contamination thinning",
      "Excessive shear on wrong multi-grade outside OEM approval",
    ],
    questionsToAsk: [
      "Hot ambient highs and duty load?",
      "Any fuel smell or recent top-off from wrong tank?",
      "OEM minimum ISO VG?",
    ],
    fieldInspectionSteps: [
      "Verify drum ISO and tag.",
      "Hot oil analysis viscosity if available.",
      "Inspect for fuel dilution odor.",
    ],
    fluidRelatedCauses: [
      "Winter arctic UTF left for summer heat",
      "ISO 32 in system requiring 46/68",
      "Misapplied HVLP without OEM approval leading to shear concerns",
    ],
    contaminationIndicators: [
      "Fuel dilution on analysis",
      "Very thin stick film when hot",
    ],
    operationalConsequences: [
      "Internal pump and valve leakage",
      "Overheating and accelerated oxidation",
      "Metal contact wear",
    ],
    recommendedFluidDirection: [
      "Increase to OEM ISO VG or approved seasonal grade.",
      "Advanced AW for oxidation if heat is from thin-film slip, after correcting grade.",
      "Do not use UTF in pure industrial AW circuits.",
    ],
    possibleKlondikeProducts: [
      productDir("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "Correct ISO ladder 22–68 on HM programs."),
      productDir("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "Higher oxidation when correct heavier ISO installed."),
      productDir("utf", "KLONDIKE Universal Tractor Fluid", "Return to proper UTTO viscosity program—not AW in sump."),
    ],
    escalationTriggers: [
      "Metal analysis spike after hot season on light fluid",
      "Pump failure with confirmed thin film",
    ],
    repTalkTrack: [
      "Too light shows up hot—confirm ISO high side on the tag before summer bulk.",
    ],
    cautionNotes: [
      "Fuel dilution requires source fix—not just fluid change.",
    ],
  }),

  freezeProfile({
    id: "seasonalFluidMismatch",
    symptom: "Seasonal fluid mismatch—wrong grade for current weather or OEM seasonal bulletin",
    whatItUsuallyMeans:
      "Inventory habit left the wrong seasonal SKU in service—straight ISO vs HVLP wide-band, summer UTF vs arctic, or industrial AW used where tractor seasonal chart applies.",
    likelyRootCauses: [
      "No seasonal change calendar per OEM",
      "One drum used for entire fleet regardless of tag",
      "Counter confusion between MV AW, XVI, and straight Commercial AW",
      "Arctic UTF not installed when J20D winter program required",
      "Turbine summer/winter ISO confusion on stationary equipment",
    ],
    questionsToAsk: [
      "What is the site temperature histogram year-round?",
      "Does OEM publish seasonal fluid bulletin?",
      "Last bulk fill date and product SKU?",
      "Separate hydraulic loop vs tractor sump?",
    ],
    fieldInspectionSteps: [
      "Plot monthly lows/highs against indexed pour/Brookfield on PDS.",
      "Audit bulk tanks and transfer guns for mislabeling.",
      "Photo all tags on problem units.",
      "Compare in-service fluid to seasonal chart.",
    ],
    fluidRelatedCauses: [
      "Straight ISO AW in winter without HVLP approval path",
      "Summer UTF in arctic planting window",
      "Missing XVI when OEM allows single ISO 46 HVLP year-round",
      "AW used instead of UTF on color-coded tractor programs",
    ],
    contaminationIndicators: [
      "Often none—seasonal mismatch is planning error",
      "Secondary contamination if cross-top-offs occurred",
    ],
    operationalConsequences: [
      "Cold sluggishness or hot thinning by season",
      "Wet brake chatter at season change",
      "Double inventory cost if not planned— or single wrong drum cost higher",
    ],
    recommendedFluidDirection: [
      "Build OEM-approved seasonal calendar—MV AW/XVI for mobile HVLP; Arctic Tractor for UTTO winter; return to Commercial/Advanced AW when straight ISO is mandated.",
      "XVI as year-round HVLP ISO 46 when OEM approves one extreme wide-band program.",
      "Turbine ISO change only per stationary OEM sheet—Long Life vs Synthetic Circulating unchanged class discipline.",
    ],
    possibleKlondikeProducts: [
      productDir("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Single extreme HVLP ISO 46 when OEM allows all-season mobile program."),
      productDir("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "HVLP ladder to reduce dual ISO drums when approved."),
      productDir("arcticTractor", "KLONDIKE Arctic Tractor Fluid Synthetic Blend", "Winter UTTO per J20D when bulletin requires."),
      productDir("utf", "KLONDIKE Universal Tractor Fluid", "Summer/baseline UTTO when returning from wrong arctic/summer mix."),
    ],
    escalationTriggers: [
      "Fleet-wide damage after one incorrect seasonal bulk delivery",
      "OEM warranty audit on fluid non-compliance",
    ],
    repTalkTrack: [
      "Seasonal mismatch is planning—let's map site temps to the PDS pour column and the axle bulletin before next bulk.",
      "XVI and Arctic Tractor solve different problems—industrial HVLP vs tractor UTTO.",
    ],
    cautionNotes: [
      "Do not swap seasons without OEM flush guidance when categories mixed.",
      "XVI is not UTF—category separation at the counter.",
    ],
  }),
];

/** @type {Readonly<Record<string, HydraulicTroubleshootingProfile>>} */
const HYDRAULIC_TROUBLESHOOTING_BY_ID = Object.freeze(
  Object.fromEntries(HYDRAULIC_TROUBLESHOOTING_PROFILE_ROWS.map((p) => [p.id, p]))
);

/** @type {Readonly<{ version: number, profiles: readonly HydraulicTroubleshootingProfile[] }>} */
export const HYDRAULIC_TROUBLESHOOTING_KNOWLEDGE = Object.freeze({
  version: HYDRAULIC_TROUBLESHOOTING_KNOWLEDGE_VERSION,
  profiles: Object.freeze(HYDRAULIC_TROUBLESHOOTING_PROFILE_ROWS),
});

/** @returns {readonly HydraulicTroubleshootingProfile[]} */
export function listHydraulicTroubleshootingProfiles() {
  return HYDRAULIC_TROUBLESHOOTING_KNOWLEDGE.profiles;
}

/**
 * @param {unknown} id
 * @returns {HydraulicTroubleshootingProfile | null}
 */
export function getHydraulicTroubleshootingProfileById(id) {
  const key = String(id ?? "").trim();
  if (!key) return null;
  return HYDRAULIC_TROUBLESHOOTING_BY_ID[key] || null;
}
