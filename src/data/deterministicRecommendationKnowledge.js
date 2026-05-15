/**
 * Deterministic KLONDIKE lubrication recommendation intelligence (data only).
 * Grounded on indexed PDS map rows and canonical product hierarchy — not wired to UI.
 */

/** @type {number} */
export const DETERMINISTIC_RECOMMENDATION_KNOWLEDGE_VERSION = 1;

/**
 * Canonical product anchors for recommendation profiles (indexed PDS map keys).
 * @type {Readonly<Record<string, { pdsMapKey: string, category: string }>>}
 */
export const CANONICAL_RECOMMENDATION_PRODUCT_REF = Object.freeze({
  nano: Object.freeze({ pdsMapKey: "Nano Calcium Sulfonate EP", category: "grease" }),
  molyTac: Object.freeze({ pdsMapKey: "Moly Tac EP-2", category: "grease" }),
  openGear: Object.freeze({ pdsMapKey: "Open Gear Lubricant", category: "grease" }),
  openGearGrease: Object.freeze({ pdsMapKey: "Open Gear Grease", category: "grease" }),
  commercialAW: Object.freeze({ pdsMapKey: "AW Hydraulic Commercial", category: "hydraulic" }),
  awAdvanced: Object.freeze({ pdsMapKey: "AW Hydraulic Advanced", category: "hydraulic" }),
  mvAW: Object.freeze({ pdsMapKey: "MV AW Hydraulic", category: "hydraulic" }),
  xvi: Object.freeze({ pdsMapKey: "XVI All Season Hydraulic", category: "hydraulic" }),
  sae10w: Object.freeze({ pdsMapKey: "SAE 10W Hydraulic", category: "hydraulic" }),
  utf: Object.freeze({ pdsMapKey: "Universal Tractor Fluid", category: "tractor_utto" }),
  arcticTractor: Object.freeze({ pdsMapKey: "Arctic Tractor Fluid Synthetic Blend", category: "tractor_utto" }),
  wetBrake: Object.freeze({ pdsMapKey: "Wet Brake Fluid Full Synthetic", category: "tractor_wet_brake" }),
  longLifeTurbine: Object.freeze({ pdsMapKey: "Long Life Turbine Oil", category: "industrial_rotating" }),
  synCirculatingTurbine: Object.freeze({
    pdsMapKey: "Synthetic Circulating Compressor Turbine",
    category: "industrial_rotating",
  }),
  iso46Compressor: Object.freeze({ pdsMapKey: "ISO 46 Synthetic Compressor", category: "compressor" }),
  enviroAW: Object.freeze({ pdsMapKey: "Enviro AW Hydraulic", category: "hydraulic_biodegradable" }),
  enviroMV: Object.freeze({ pdsMapKey: "Enviro MV Hydraulic", category: "hydraulic_biodegradable" }),
  bioAW: Object.freeze({ pdsMapKey: "Bio AW Hydraulic", category: "hydraulic_biodegradable" }),
  foodGradeHydraulic: Object.freeze({ pdsMapKey: "Food Grade Hydraulic", category: "food_grade" }),
  foodGradeGrease: Object.freeze({ pdsMapKey: "Food Grade EP-2 Grease", category: "food_grade" }),
});

/**
 * @typedef {{
 *   refKey: string,
 *   productName: string,
 *   pdsMapKey: string,
 *   role: string,
 * }} KlondikeProductRecommendation
 *
 * @typedef {{
 *   id: string,
 *   operatingScenario: string,
 *   typicalProblems: string[],
 *   recommendedProductDirection: string[],
 *   flagshipRecommendations: string[],
 *   whyThisDirectionWorks: string[],
 *   upgradeStory: string[],
 *   possibleKlondikeProducts: KlondikeProductRecommendation[],
 *   discoveryQuestions: string[],
 *   repTalkTrack: string[],
 *   cautionNotes: string[],
 * }} DeterministicRecommendationProfile
 */

/** @param {DeterministicRecommendationProfile} row */
function freezeRecommendation(row) {
  return Object.freeze({
    ...row,
    typicalProblems: Object.freeze([...row.typicalProblems]),
    recommendedProductDirection: Object.freeze([...row.recommendedProductDirection]),
    flagshipRecommendations: Object.freeze([...row.flagshipRecommendations]),
    whyThisDirectionWorks: Object.freeze([...row.whyThisDirectionWorks]),
    upgradeStory: Object.freeze([...row.upgradeStory]),
    possibleKlondikeProducts: Object.freeze(row.possibleKlondikeProducts.map((p) => Object.freeze({ ...p }))),
    discoveryQuestions: Object.freeze([...row.discoveryQuestions]),
    repTalkTrack: Object.freeze([...row.repTalkTrack]),
    cautionNotes: Object.freeze([...row.cautionNotes]),
  });
}

/**
 * @param {keyof typeof CANONICAL_RECOMMENDATION_PRODUCT_REF} refKey
 * @param {string} productName
 * @param {string} role
 */
function product(refKey, productName, role) {
  const ref = CANONICAL_RECOMMENDATION_PRODUCT_REF[refKey];
  return { refKey, productName, pdsMapKey: ref.pdsMapKey, role };
}

/** @type {DeterministicRecommendationProfile[]} */
const DETERMINISTIC_RECOMMENDATION_PROFILE_ROWS = [
  freezeRecommendation({
    id: "severeColdHydraulics",
    operatingScenario:
      "Mobile or industrial hydraulics in severe cold—first-shift sluggishness, inlet starvation risk, and seasonal ISO juggling on sites with wide ambient lows.",
    typicalProblems: [
      "Slow cylinder response on cold mornings",
      "Cavitation whine at startup",
      "Operators stocking separate summer/winter ISO drums without OEM sign-off",
    ],
    recommendedProductDirection: [
      "Confirm pump nameplate for HM vs HVLP and exact ISO VG before any bulk program.",
      "When OEM allows HVLP wide-temperature: position MV AW or XVI extreme ISO 46—not straight ISO habit alone.",
      "When OEM mandates SAE 10W zinc class: use indexed SAE 10W row, not generic ISO AW substitute.",
    ],
    flagshipRecommendations: [
      "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid — extreme HVLP ISO 46 wide-band when pump chart allows DIN 51524 Part 3 HVLP.",
      "KLONDIKE Multi-Viscosity AW Hydraulic Fluids — HVLP seasonal simplification when OEM approves multi-viscosity AW ladder.",
    ],
    whyThisDirectionWorks: [
      "Indexed pour and VI data on XVI and MV PDS rows support cold-flow planning versus guessing with straight HM ISO.",
      "Wide-temperature HVLP reduces wrong-season viscosity when OEM explicitly allows the class—reasoning stays on the tag, not counter habit.",
    ],
    upgradeStory: [
      "Entry **Professional Series** Commercial AW may remain correct if OEM requires straight HM ISO—upgrade path is MV AW or XVI only after HVLP approval is documented.",
      "From MV AW to XVI when duty is extreme ISO 46 HVLP with brutal min/max site temperatures on the histogram.",
    ],
    possibleKlondikeProducts: [
      product("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Flagship extreme HVLP ISO 46 wide-band"),
      product("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "HVLP wide-temperature AW ladder"),
      product("sae10w", "KLONDIKE SAE 10W Heavy Duty Hydraulic Oil", "OEM SAE 10W programs (e.g. Caterpillar HYDO Advanced 10 class on index)"),
      product("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "Baseline HM AW when tag requires straight ISO only"),
    ],
    discoveryQuestions: [
      "What are site overnight lows and afternoon highs for the worst month?",
      "Does the pump chart list HVLP, HM AW, or SAE 10W?",
      "Any cold-start noise, foam, or sluggishness after the last seasonal drum swap?",
    ],
    repTalkTrack: [
      "Plot your coldest morning against the PDS pour column before we pick between MV AW and XVI.",
      "I will not put XVI in the tank without HVLP and ISO 46 on the nameplate—show me the tag.",
    ],
    cautionNotes: [
      "Confirm OEM viscosity class and HM vs HVLP approval before bulk change.",
      "Higher VI does not fix restricted suction lines or low reservoir level.",
    ],
  }),

  freezeRecommendation({
    id: "wetEnvironmentGrease",
    operatingScenario:
      "Pins, bushings, and joints exposed to water spray, wash-down, fording, or constant outdoor moisture on construction, mining, or ag iron.",
    typicalProblems: [
      "Grease washout and rust staining on pins",
      "Metal loss when commodity EP grease lacks spray-off or weld proof on the sheet",
      "Wrong thickener family mixed in auto-lube lines",
    ],
    recommendedProductDirection: [
      "Match severe wet/shock duty to calcium sulfonate complex EP (Nano) when OEM allows—not commodity lithium EP by color.",
      "Use lithium complex + 3% moly (Moly Tac) when shock and EP are primary and NLGI 2 lithium complex is on the chart.",
      "Confirm NLGI grade, thickener compatibility, and regrease interval before bulk conversion.",
    ],
    flagshipRecommendations: [
      "KLONDIKE nano Calcium Sulfonate EP Grease — flagship severe wet/shock EP with indexed weld and spray-off language on PDS map.",
      "KLONDIKE Moly Tac EP-2 Grease — lithium complex + 3% moly for shock-load EP when chart calls moly EP-2.",
    ],
    whyThisDirectionWorks: [
      "Nano row documents calcium sulfonate complex chemistry and severe-duty EP proof points on the index—positioned for water + shock, not tube-color habit.",
      "Moly Tac row documents 3% molybdenum disulfide and Timken/4-ball language for shock—different soap story than Nano; OEM chart picks the family.",
    ],
    upgradeStory: [
      "From Multi-Purpose lithium NLGI 2 to Nano when washout and shock metrics justify severe-duty calcium sulfonate EP per OEM.",
      "From Nano to Moly Tac only when OEM requires lithium complex + moly—not interchangeable by habit.",
    ],
    possibleKlondikeProducts: [
      product("nano", "KLONDIKE nano Calcium Sulfonate EP Grease", "Flagship wet/shock calcium sulfonate EP"),
      product("molyTac", "KLONDIKE Moly Tac EP-2 Grease", "Shock-load lithium complex + 3% moly EP-2"),
    ],
    discoveryQuestions: [
      "Is exposure rain, pressure wash, submersion, or process spray?",
      "What NLGI and thickener does the OEM zerk chart require?",
      "Centralized lube or manual gun—and any unknown in-service grease history?",
    ],
    repTalkTrack: [
      "Water plus shock is a duty conversation first—then we match Nano or Moly Tac to the chart, not the red tube habit.",
    ],
    cautionNotes: [
      "Thickener compatibility review required before auto-lube or bulk conversion.",
      "Quote only PDS-backed EP and washout lines for the specific SKU.",
    ],
  }),

  freezeRecommendation({
    id: "crusherShockLoad",
    operatingScenario:
      "Crushers, hammers, and high-shock mobile joints with impact load, vibration, and regrease intervals stretched by production pressure.",
    typicalProblems: [
      "Pin and bushing wear on shock points",
      "EP grease treated as interchangeable by NLGI color",
      "Grease pumping issues when wrong NLGI selected for central systems",
    ],
    recommendedProductDirection: [
      "Severe shock + EP: Nano calcium sulfonate complex when indexed severe-duty row is OEM-allowed.",
      "Lithium complex + moly EP-2 (Moly Tac) when nameplate calls 3% moly and NLGI 2 lithium complex.",
      "Open gear points are a separate category—do not use tube grease on open gear teeth without OEM open-gear product.",
    ],
    flagshipRecommendations: [
      "KLONDIKE nano Calcium Sulfonate EP Grease — flagship shock/wet severe EP narrative on indexed PDS.",
      "KLONDIKE Moly Tac EP-2 Grease — standard shock EP lithium complex + moly when chart specifies.",
    ],
    whyThisDirectionWorks: [
      "Nano and Moly Tac are different thickener and solid-lubricant stories—recommendation reasoning separates duty (wash/shock sulfonate vs moly lithium EP) per OEM, not brand habit.",
      "Indexed Timken, 4-ball, and weld language on respective PDS rows supports proof-based positioning after chart confirmation.",
    ],
    upgradeStory: [
      "Commodity multipurpose lithium → Moly Tac when shock EP is required on chart.",
      "Moly Tac → Nano when calcium sulfonate severe-duty is approved and water/shock proof points match duty.",
    ],
    possibleKlondikeProducts: [
      product("nano", "KLONDIKE nano Calcium Sulfonate EP Grease", "Severe shock/wet calcium sulfonate flagship"),
      product("molyTac", "KLONDIKE Moly Tac EP-2 Grease", "Shock EP lithium + moly flagship"),
      product("openGear", "KLONDIKE Open Gear Lubricant", "Open gear teeth/splines—separate from zerk EP grease"),
    ],
    discoveryQuestions: [
      "Which joints see worst shock and slow-speed load?",
      "NLGI 1 vs 2 and any central lube OEM limits?",
      "Any open gear lubrication separate from pin grease?",
    ],
    repTalkTrack: [
      "Crushers punish pins—let's read the zerk chart, then pick Nano or Moly Tac with PDS proof in hand.",
    ],
    cautionNotes: [
      "Do not confuse Nano, Moly Tac, and Open Gear categories.",
      "Confirm NLGI and thickener on OEM chart before quoting.",
    ],
  }),

  freezeRecommendation({
    id: "commonSumpWetBrake",
    operatingScenario:
      "Agricultural and utility tractors with common sump serving transmission, hydraulics, and wet brakes—UTF category discipline is the baseline.",
    typicalProblems: [
      "Wet brake chatter after AW hydraulic top-off",
      "CNH red vs John Deere green program confusion",
      "Friction instability when wrong UTTO tier is in service",
    ],
    recommendedProductDirection: [
      "Baseline: Universal Tractor Fluid when MAT/C-4 common sump applies on indexed PDS.",
      "Upgrade friction/cold: Wet Brake Fluid Full Synthetic when OEM bulletin requires dedicated J20C/J20D wet brake row.",
      "Winter seasonal: Arctic Tractor Fluid when J20D arctic program is on OEM seasonal chart.",
    ],
    flagshipRecommendations: [
      "KLONDIKE Universal Tractor Fluid — standard UTTO with wet brake compatibility language on index.",
      "KLONDIKE Wet Brake Fluid Full Synthetic — dedicated wet brake / J20 synthetic when OEM splits friction fluid from general UTF.",
    ],
    whyThisDirectionWorks: [
      "UTF rows include API GL-4, Allison C-4, and CNH MAT lines on PDS—category-correct common sump chemistry versus HM zinc AW.",
      "Wet Brake Fluid row documents J20C/J20D and Brookfield cold data for friction-specific programs—positioned when OEM calls that SKU, not assumed from UTF drum.",
    ],
    upgradeStory: [
      "Standard UTF → Wet Brake Fluid when chatter persists and OEM allows dedicated friction SKU.",
      "Summer UTF → Arctic Tractor for documented winter J20D arctic bulk when bulletin allows seasonal switch.",
    ],
    possibleKlondikeProducts: [
      product("utf", "KLONDIKE Universal Tractor Fluid", "Baseline UTTO common sump"),
      product("wetBrake", "KLONDIKE Wet Brake Fluid Full Synthetic", "Dedicated wet brake / J20 friction program"),
      product("arcticTractor", "KLONDIKE Arctic Tractor Fluid Synthetic Blend", "Winter J20D arctic UTTO"),
    ],
    discoveryQuestions: [
      "Make, model, and axle tag—MAT 3525/3505 vs J20?",
      "Chatter after any non-UTF top-off?",
      "Dedicated wet brake service or single common sump?",
    ],
    repTalkTrack: [
      "Photo the axle tag—UTF category first, then we decide standard UTF, Wet Brake, or Arctic seasonal row.",
    ],
    cautionNotes: [
      "Never recommend AW hydraulic for UTF/wet brake sump without OEM.",
      "Do not interchange red UTF, green AgriMax, and Wet Brake without bulletin lines.",
    ],
  }),

  freezeRecommendation({
    id: "seasonalFluidReduction",
    operatingScenario:
      "Fleets trying to reduce seasonal ISO drum inventory on mobile hydraulics or tractor loops when OEM allows wide-temperature or seasonal UTTO programs.",
    typicalProblems: [
      "Two ISO drums per unit with wrong season still in tank",
      "Cold sluggishness with summer grade installed",
      "Counter staff guessing viscosity without temperature histogram",
    ],
    recommendedProductDirection: [
      "Mobile HM/HVLP: MV AW or single-program XVI when HVLP ISO 46 is OEM-approved for the site swing.",
      "Tractor: Arctic Tractor seasonal switch vs year-round UTF per OEM seasonal bulletin—not AW.",
      "Document min/max temps on work order before recommending consolidation.",
    ],
    flagshipRecommendations: [
      "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid — one extreme HVLP ISO 46 band when chart allows.",
      "KLONDIKE Multi-Viscosity AW Hydraulic Fluids — HVLP ladder alternative when ISO 46 XVI is not the right fit but HVLP is approved.",
    ],
    whyThisDirectionWorks: [
      "Indexed VI and pour columns on MV/XVI PDS support planning versus maintaining duplicate straight ISO stocks without OEM approval.",
      "Arctic Tractor addresses UTTO winter lows with J20D/Brookfield on index—separate category from hydraulic XVI.",
    ],
    upgradeStory: [
      "Commercial AW straight ISO → MV AW when HVLP approved and seasonal changeover is the pain.",
      "MV AW → XVI when duty justifies extreme ISO 46 HVLP wide-band on one approved program.",
    ],
    possibleKlondikeProducts: [
      product("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Single extreme HVLP ISO 46 program"),
      product("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "HVLP multi-grade ladder"),
      product("arcticTractor", "KLONDIKE Arctic Tractor Fluid Synthetic Blend", "Winter UTTO seasonal companion"),
      product("utf", "KLONDIKE Universal Tractor Fluid", "Summer/baseline UTTO when split from arctic"),
    ],
    discoveryQuestions: [
      "What ISO or UTTO is in the tank today and what does the tag require?",
      "Lowest and highest ambient last season?",
      "Does OEM allow HVLP or J20D arctic on bulletin?",
    ],
    repTalkTrack: [
      "Seasonal reduction starts with the tag and a temperature log—not fewer drums by guesswork.",
    ],
    cautionNotes: [
      "XVI is not UTF; do not consolidate tractor and industrial loops without OEM.",
      "Flush per OEM when changing category or unknown mix history.",
    ],
  }),

  freezeRecommendation({
    id: "highTemperatureHydraulics",
    operatingScenario:
      "High-heat hydraulic duty—continuous press work, mining hydraulics, or afternoon ambient plus load heat stressing oxidation reserve.",
    typicalProblems: [
      "Dark fluid and varnish before external leaks",
      "Seal weep accelerated by oxidized fluid",
      "Running entry Commercial AW when analysis shows oxidation margin loss",
    ],
    recommendedProductDirection: [
      "Stay in correct HM ISO VG; increase oxidation reserve to AW Advanced when tag remains HM AW and analysis/OEM severe service supports.",
      "HVLP wide-band (XVI) only when pump chart allows HVLP—not as heat fix for wrong ISO class.",
      "Cooler and contamination discipline first—fluid tier second.",
    ],
    flagshipRecommendations: [
      "KLONDIKE AW Advanced Formula Hydraulic Fluids — 8000+ hr oxidation indexed tier above Professional Series Commercial AW.",
      "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid — when HVLP ISO 46 extreme band is approved for hot/cold swing, not only heat.",
    ],
    whyThisDirectionWorks: [
      "Advanced AW PDS indexes higher oxidation stability and broader DIN 51524 coverage than Commercial AW—upgrade story is documented reserve on same HM class.",
      "XVI addresses wide temperature when HVLP is approved—heat reasoning must include OEM class, not silent ISO substitution.",
    ],
    upgradeStory: [
      "Commercial AW → AW Advanced when UOA or reliability team documents oxidation at correct ISO VG.",
      "AW Advanced → XVI only when OEM approves HVLP ISO 46 extreme program for the asset.",
    ],
    possibleKlondikeProducts: [
      product("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "Higher oxidation HM AW tier"),
      product("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Extreme HVLP when class allows"),
      product("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "Entry HM AW after flush on approved ISO"),
    ],
    discoveryQuestions: [
      "Typical operating fluid temperature and duty cycle?",
      "Last analysis TAN/oxidation and hours on fluid?",
      "Pump tag ISO VG and HM vs HVLP class?",
    ],
    repTalkTrack: [
      "Heat plus hours drives oxidation tier—show me analysis before we move from Commercial to Advanced AW.",
    ],
    cautionNotes: [
      "Advanced AW does not fix cooler fouling or particle contamination.",
      "Confirm zinc/ashless and UTF requirements separately—different categories.",
    ],
  }),

  freezeRecommendation({
    id: "contaminationControl",
    operatingScenario:
      "Plants and fleets prioritizing cleanliness—particle and water ingression control on hydraulics, UTF, or turbine loops with reliability targets.",
    typicalProblems: [
      "Short filter life and valve stiction",
      "Water emulsion and rust in reservoir",
      "Emergency AW top-off into turbine or UTF sumps",
    ],
    recommendedProductDirection: [
      "Fix ingression and filtration first; refill correct indexed class after flush.",
      "HM AW: AW Advanced when water separation and oxidation reserve support same class after cleanup.",
      "Turbine/compressor: ASTM D4304 Type I rows—never AW substitute on emergency fill.",
    ],
    flagshipRecommendations: [
      "KLONDIKE AW Advanced Formula Hydraulic Fluids — demulsibility and oxidation language on severe HM programs.",
      "KLONDIKE Long Life Turbine Oils — stationary turbine water separation and 10,000+ hr oxidation on index.",
    ],
    whyThisDirectionWorks: [
      "Fluid tier supports demulsibility discipline—it does not replace drain of free water or filter strategy.",
      "Category separation (AW vs UTF vs D4304 turbine) prevents cross-contamination that defeats contamination programs.",
    ],
    upgradeStory: [
      "Commercial AW → Advanced AW after root-cause cleanup when HM class unchanged.",
      "Long Life Turbine vs Synthetic Circulating per OEM stationary sheet for turbine/combined loops.",
    ],
    possibleKlondikeProducts: [
      product("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "HM AW with indexed water separation"),
      product("commercialAW", "KLONDIKE Commercial AW Hydraulic Fluids", "Baseline HM refill post-flush"),
      product("longLifeTurbine", "KLONDIKE Long Life Turbine Oils", "ASTM D4304 Type I turbine row"),
      product("utf", "KLONDIKE Universal Tractor Fluid", "UTTO refill after AW mis-fill flush on ag iron"),
    ],
    discoveryQuestions: [
      "Target ISO cleanliness code and filter micron rating?",
      "Water ppm or particle count history?",
      "Any cross-top-off between AW, UTF, and turbine totes?",
    ],
    repTalkTrack: [
      "Contamination is breather, filter, and water source first—then we pick the right indexed class for refill.",
    ],
    cautionNotes: [
      "Flush procedures are OEM-specific when category mix occurred.",
      "Do not upsize filter micron without OEM approval.",
    ],
  }),

  freezeRecommendation({
    id: "quarryFleet",
    operatingScenario:
      "Quarry and aggregate fleets—dust, shock load, wet drills, mobile hydraulics, and mixed grease points on loaders and crushers.",
    typicalProblems: [
      "Pin wear and grease washout",
      "Hydraulic sluggishness and heat on long shift",
      "Dust ingression into breathers and grease fittings",
    ],
    recommendedProductDirection: [
      "Pins: Nano for severe wet/shock calcium sulfonate EP; Moly Tac for chart-specified moly EP-2.",
      "Hydraulics: MV AW or XVI when HVLP approved; SAE 10W on yellow-iron tags requiring that class.",
      "Open gear: Open Gear Lubricant for teeth—not zerk EP grease.",
    ],
    flagshipRecommendations: [
      "KLONDIKE nano Calcium Sulfonate EP Grease — quarry pin flagship when OEM allows severe-duty sulfonate EP.",
      "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid — wide ambient mobile hydraulics when HVLP ISO 46 approved.",
    ],
    whyThisDirectionWorks: [
      "Quarry duty stacks shock, water, and heat—recommendations split grease vs hydraulic category per point, each tied to indexed PDS rows.",
      "XVI and MV provide wide-temperature hydraulic planning when straight ISO seasonal juggling fails on site histogram.",
    ],
    upgradeStory: [
      "Multipurpose grease → Nano/Moly Tac on critical pins after OEM chart review.",
      "Commercial AW → Advanced AW or MV/XVI on hydraulics when analysis and HVLP approval support.",
    ],
    possibleKlondikeProducts: [
      product("nano", "KLONDIKE nano Calcium Sulfonate EP Grease", "Severe pin EP flagship"),
      product("molyTac", "KLONDIKE Moly Tac EP-2 Grease", "Shock EP alternative per chart"),
      product("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Mobile HVLP wide-band"),
      product("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "HVLP seasonal mobile hydraulics"),
      product("openGear", "KLONDIKE Open Gear Lubricant", "Gears and splines"),
    ],
    discoveryQuestions: [
      "Which assets drive downtime—pins, hydraulics, or open gear?",
      "Wash-down and dust control practices?",
      "OEM charts for each machine family?",
    ],
    repTalkTrack: [
      "Quarry wins are duty-matched SKUs per point—pins, hydraulics, and open gear are three conversations, three tags.",
    ],
    cautionNotes: [
      "Confirm each OEM point before bulk programs.",
      "Keep turbine/compressor fluids away from mobile hydraulic totes.",
    ],
  }),

  freezeRecommendation({
    id: "forestryEquipment",
    operatingScenario:
      "Forestry skidders, harvesters, and off-road hydraulics—cold mornings, moisture, shock pins, and long idle periods in bush operations.",
    typicalProblems: [
      "Cold sluggish hydraulics at first shift",
      "Pin wear in mud and water",
      "Seasonal fluid left in from wrong inventory",
    ],
    recommendedProductDirection: [
      "Hydraulics: MV AW or XVI when HVLP approved; SAE 10W where OEM requires.",
      "Pins: Nano or Moly Tac per zerk chart; not interchangeable.",
      "UTF only on true tractor/common-sump iron—not on dedicated industrial closed loops.",
    ],
    flagshipRecommendations: [
      "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid — wide-band HVLP for brutal bush temperature swing when ISO 46 HVLP is on chart.",
      "KLONDIKE nano Calcium Sulfonate EP Grease — wet pin severe EP flagship.",
    ],
    whyThisDirectionWorks: [
      "Forestry combines cold-start hydraulic pain with wet pin duty—recommendations address each system with correct category and indexed cold/EP data.",
    ],
    upgradeStory: [
      "Straight ISO AW → MV AW/XVI after HVLP approval and temperature logging.",
      "Commodity pin grease → Nano when severe washout/shock metrics justify upgrade on OEM chart.",
    ],
    possibleKlondikeProducts: [
      product("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Extreme HVLP mobile hydraulics"),
      product("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "HVLP alternative"),
      product("nano", "KLONDIKE nano Calcium Sulfonate EP Grease", "Wet/severe pin EP"),
      product("molyTac", "KLONDIKE Moly Tac EP-2 Grease", "Shock moly EP per chart"),
    ],
    discoveryQuestions: [
      "Overnight lows in bush camps and afternoon highs under load?",
      "Pin exposure—mud, river fording, or pressure wash?",
      "Separate hydraulic reservoir vs tractor sump?",
    ],
    repTalkTrack: [
      "Forestry is cold hydraulics plus wet pins—tag first, then XVI/MV on one side and Nano/Moly on the other.",
    ],
    cautionNotes: [
      "Do not use UTF on non-tractor hydraulic systems without OEM.",
      "Seasonal bulk switches require OEM flush guidance when fluids mixed.",
    ],
  }),

  freezeRecommendation({
    id: "miningEquipment",
    operatingScenario:
      "Mining shovels, haul trucks, and support equipment—high load, shock, heat, contamination, and 24/7 duty on hydraulics and grease.",
    typicalProblems: [
      "Hydraulic heat and oxidation",
      "Shock pin wear and washout",
      "Dust and water contamination",
      "Wrong fluid category on emergency top-off",
    ],
    recommendedProductDirection: [
      "Hydraulics: AW Advanced for severe HM oxidation; XVI when HVLP ISO 46 extreme band approved; SAE 10W on Cat-class tags.",
      "Pins: Nano flagship for severe sulfonate EP; Moly Tac when moly lithium EP-2 specified.",
      "Open gear: Open Gear Lubricant for slow-speed gear mesh per OEM.",
    ],
    flagshipRecommendations: [
      "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid — mining mobile HVLP flagship when chart allows ISO 46 extreme.",
      "KLONDIKE nano Calcium Sulfonate EP Grease — severe-duty pin flagship.",
      "KLONDIKE AW Advanced Formula Hydraulic Fluids — oxidation upgrade on HM programs.",
    ],
    whyThisDirectionWorks: [
      "Mining stacks heat, shock, and contamination—tiered hydraulic upgrade (Commercial → Advanced → XVI) follows OEM class gates with indexed oxidation and VI proof.",
      "Grease recommendations stay thickener-specific per chart to avoid central-system compatibility failures.",
    ],
    upgradeStory: [
      "Commercial AW → Advanced AW on analysis at same ISO VG.",
      "Advanced/MV → XVI when OEM approves single extreme HVLP ISO 46 program.",
      "Multipurpose → Nano on pins when severe metrics and OEM allow sulfonate EP.",
    ],
    possibleKlondikeProducts: [
      product("xvi", "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid", "Extreme mobile HVLP"),
      product("awAdvanced", "KLONDIKE AW Advanced Formula Hydraulic Fluids", "Severe HM oxidation tier"),
      product("nano", "KLONDIKE nano Calcium Sulfonate EP Grease", "Severe pin EP"),
      product("molyTac", "KLONDIKE Moly Tac EP-2 Grease", "Moly shock EP"),
      product("sae10w", "KLONDIKE SAE 10W Heavy Duty Hydraulic Oil", "OEM SAE 10W programs"),
      product("openGear", "KLONDIKE Open Gear Lubricant", "Open gear service"),
    ],
    discoveryQuestions: [
      "Which circuits drive unplanned downtime?",
      "Fluid analysis program and last UOA results?",
      "HVLP vs HM vs SAE 10W on each machine tag?",
    ],
    repTalkTrack: [
      "Mining reliability is class discipline plus tier—show me tags and analysis, then we place Advanced, XVI, and Nano where OEM allows.",
    ],
    cautionNotes: [
      "Emergency top-off must match category—AW is not UTF or turbine oil.",
      "Confirm ISO VG on each unit before fleet bulk.",
    ],
  }),

  freezeRecommendation({
    id: "agriculturalEquipment",
    operatingScenario:
      "Farm tractors and ag equipment—common sump UTF, seasonal cold, PTO hydraulics, and wet brake friction requirements.",
    typicalProblems: [
      "Wet brake chatter after wrong top-off",
      "Slow PTO/hydraulics on cold mornings",
      "Red vs green UTTO program confusion",
    ],
    recommendedProductDirection: [
      "Baseline UTF for MAT/C-4 common sump when tag allows indexed Universal Tractor Fluid.",
      "Winter: Arctic Tractor when J20D arctic seasonal bulletin applies.",
      "Chatter: Wet Brake Fluid when OEM requires dedicated J20 friction SKU.",
      "Separate industrial AW only on dedicated hydraulic systems per OEM—not common sump.",
    ],
    flagshipRecommendations: [
      "KLONDIKE Universal Tractor Fluid — baseline UTTO with wet brake compatibility on index.",
      "KLONDIKE Arctic Tractor Fluid Synthetic Blend — winter J20D arctic UTTO with Brookfield data on PDS.",
    ],
    whyThisDirectionWorks: [
      "Ag recommendation anchors UTTO category with MAT/J20 lines on PDS—prevents AW hydraulic mis-fill that causes chatter and warranty risk.",
      "Arctic row documents pour and Brookfield for seasonal switch decisions versus leaving summer UTF in northern planting windows.",
    ],
    upgradeStory: [
      "Standard UTF → Arctic Tractor for OEM-approved winter bulk.",
      "UTF → Wet Brake Fluid when friction bulletin requires dedicated wet brake synthetic.",
    ],
    possibleKlondikeProducts: [
      product("utf", "KLONDIKE Universal Tractor Fluid", "Baseline UTTO"),
      product("arcticTractor", "KLONDIKE Arctic Tractor Fluid Synthetic Blend", "Winter arctic UTTO"),
      product("wetBrake", "KLONDIKE Wet Brake Fluid Full Synthetic", "Dedicated wet brake program"),
    ],
    discoveryQuestions: [
      "Axle tag—CNH MAT vs John Deere J20?",
      "Common sump or split wet brake circuit?",
      "Lowest temperature during planting/harvest window?",
    ],
    repTalkTrack: [
      "Ag starts with a photo of the axle tag—UTF family first, never AW in the shared sump.",
    ],
    cautionNotes: [
      "UTF is not engine CK-4 oil.",
      "Confirm red vs green OEM programs before drum color habit.",
    ],
  }),

  freezeRecommendation({
    id: "compressorReliability",
    operatingScenario:
      "Plant air compressors—rotary screw and reciprocating service where varnish, moisture, and wrong fluid category drive downtime.",
    typicalProblems: [
      "Varnish on screw compressors",
      "Hydraulic AW mistaken for compressor sump",
      "Wrong ISO VG from habit",
    ],
    recommendedProductDirection: [
      "Match compressor type and OEM sheet—ISO 46 Full Synthetic Compressor row for typical plant screw programs on index.",
      "Do not use mobile AW hydraulic as compressor substitute.",
      "Biodegradable/enviro only when OEM or site policy requires that chemistry class.",
    ],
    flagshipRecommendations: [
      "KLONDIKE ISO 46 Full Synthetic Compressor Oil — indexed rotary screw ISO 46 row on PDS map.",
    ],
    whyThisDirectionWorks: [
      "Compressor recommendation separates industrial compressor ISO 46 row from hydraulic AW and from turbine D4304 classes—reasoning is chemistry class at the fill port.",
    ],
    upgradeStory: [
      "Generic R&O or hydraulic habit → OEM-matched ISO 46 compressor row after confirming screw OEM list.",
    ],
    possibleKlondikeProducts: [
      product("iso46Compressor", "KLONDIKE ISO 46 Full Synthetic Compressor Oil", "Plant air screw ISO 46 flagship"),
    ],
    discoveryQuestions: [
      "Recip vs rotary screw vs vane?",
      "Discharge temperature and OEM drain interval?",
      "Any hydraulic fluid history in the sump?",
    ],
    repTalkTrack: [
      "Compressor sumps get compressor PDS rows—what does the OEM nameplate say for ISO and chemistry class?",
    ],
    cautionNotes: [
      "Confirm exact compressor OEM approval on live PDS before bulk.",
      "Not interchangeable with turbine D4304 without OEM line.",
    ],
  }),

  freezeRecommendation({
    id: "turbineReliability",
    operatingScenario:
      "Stationary steam/gas turbines and long-life circulating systems—oxidation reserve, water separation, and ASTM D4304 discipline.",
    typicalProblems: [
      "Moisture ingress without demulsibility discipline",
      "AW emergency top-off into turbine reservoir",
      "Varnish on long drain intervals",
    ],
    recommendedProductDirection: [
      "ASTM D4304 Type I: Long Life Turbine for turbine-focused ISO ladder on index.",
      "Combined compressor/turbine circulating loops: Synthetic Circulating Compressor Turbine when OEM specifies that row.",
      "Lock AW bulk away from turbine fill ports—category separation.",
    ],
    flagshipRecommendations: [
      "KLONDIKE Long Life Turbine Oils — 10,000+ hr oxidation and water separation language on indexed turbine row.",
      "KLONDIKE Full Synthetic Circulating Compressor Turbine Oils — synthetic D4304 wide ISO span when OEM allows combined loop class.",
    ],
    whyThisDirectionWorks: [
      "Turbine recommendations use D4304/DIN 51515 positioning from PDS index—not mobile Denison HF AW language.",
      "Water separation and oxidation bullets support reliability PM packs after OEM ISO VG is confirmed.",
    ],
    upgradeStory: [
      "Mineral turbine row → Synthetic Circulating when OEM approves full synthetic D4304 class and ISO VG sign-off.",
    ],
    possibleKlondikeProducts: [
      product("longLifeTurbine", "KLONDIKE Long Life Turbine Oils", "ASTM D4304 Type I turbine flagship"),
      product("synCirculatingTurbine", "KLONDIKE Full Synthetic Circulating Compressor Turbine Oils", "Synthetic circulating D4304"),
    ],
    discoveryQuestions: [
      "Turbine OEM sheet and required ISO VG?",
      "Moisture control and analysis program?",
      "Any history of AW top-off in turbine sump?",
    ],
    repTalkTrack: [
      "Turbine reliability is ASTM class at the fill port—log D4304 from the PDS and keep AW guns away from the tote.",
    ],
    cautionNotes: [
      "Quote exact ISO grade from PDS ladder—do not assume interchange across ISO 32–150.",
      "Never interchange with mobile hydraulic AW on emergency fill without OEM flush protocol.",
    ],
  }),

  freezeRecommendation({
    id: "severeDutyPinsBushings",
    operatingScenario:
      "Severe-duty pins and bushings on loaders, excavators, and mobile equipment—shock, slow speed, and regrease discipline under load.",
    typicalProblems: [
      "EP-2 treated as interchangeable",
      "Under-regreasing on severe intervals",
      "Wrong thickener in centralized systems",
    ],
    recommendedProductDirection: [
      "Nano calcium sulfonate complex EP for severe shock/wet duty when OEM allows indexed Nano row.",
      "Moly Tac EP-2 when lithium complex + 3% moly is on zerk chart.",
      "Match NLGI 1 vs 2 to OEM—not habit.",
    ],
    flagshipRecommendations: [
      "KLONDIKE nano Calcium Sulfonate EP Grease — flagship severe pin/bushing EP.",
      "KLONDIKE Moly Tac EP-2 Grease — moly shock EP when chart specifies.",
    ],
    whyThisDirectionWorks: [
      "Severe pin recommendation explains thickener and EP chemistry choice with PDS-backed proof—not red tube convention.",
    ],
    upgradeStory: [
      "Multi-Purpose lithium → Moly Tac or Nano after OEM chart and duty review.",
    ],
    possibleKlondikeProducts: [
      product("nano", "KLONDIKE nano Calcium Sulfonate EP Grease", "Severe sulfonate EP flagship"),
      product("molyTac", "KLONDIKE Moly Tac EP-2 Grease", "Moly lithium EP flagship"),
    ],
    discoveryQuestions: [
      "Regrease interval and method—gun vs auto-lube?",
      "Worst shock and water exposure points?",
      "OEM thickener and NLGI requirements?",
    ],
    repTalkTrack: [
      "Severe pins need chart-backed EP—Nano and Moly Tac are different families; let's read the zerk sheet.",
    ],
    cautionNotes: [
      "Thickener compatibility before centralized conversion.",
      "Do not mix Nano and Moly Tac in same auto-lube line without purge plan.",
    ],
  }),

  freezeRecommendation({
    id: "autoLubeColdWeather",
    operatingScenario:
      "Centralized auto-lube systems in cold climates—pumpability, thickener compatibility, and NLGI selection for long feed lines.",
    typicalProblems: [
      "Greases too stiff for feeders in winter",
      "Cross-thickener blockage after product change",
      "Wrong NLGI for pump type",
    ],
    recommendedProductDirection: [
      "Confirm feeder OEM NLGI and thickener limits before recommending Nano or Moly Tac.",
      "Moly Tac EP-1 or arctic moly SKUs when NLGI 1 or EP-0 pumpability is on chart (separate PDS rows).",
      "Hydraulic side: MV AW or arctic UTTO for machine loops—separate from grease feeder spec.",
    ],
    flagshipRecommendations: [
      "KLONDIKE Moly Tac EP-2 Grease — when NLGI 2 lithium+moly is approved for system.",
      "KLONDIKE nano Calcium Sulfonate EP Grease — when OEM allows sulfonate EP and feeder tolerates NLGI 2.",
    ],
    whyThisDirectionWorks: [
      "Auto-lube adds pumpability and compatibility constraints—recommendation requires feeder OEM sign-off, not only joint duty.",
    ],
    upgradeStory: [
      "After compatibility review, standardize on one thickener family per auto-lube circuit.",
    ],
    possibleKlondikeProducts: [
      product("molyTac", "KLONDIKE Moly Tac EP-2 Grease", "NLGI 2 moly EP for approved feeders"),
      product("nano", "KLONDIKE nano Calcium Sulfonate EP Grease", "Sulfonate EP after compatibility sign-off"),
      product("mvAW", "KLONDIKE Multi-Viscosity AW Hydraulic Fluids", "Machine hydraulic cold-flow companion"),
    ],
    discoveryQuestions: [
      "Feeder manufacturer and max NLGI/stiffness rating?",
      "Current in-service grease thickener?",
      "Lowest line temperature at feeder?",
    ],
    repTalkTrack: [
      "Auto-lube is compatibility first—feeder OEM paper, then we talk Nano or Moly Tac for the joints.",
    ],
    cautionNotes: [
      "Incompatible thickeners require purge—do not casual top-off.",
      "Confirm PDS NLGI for each SKU—EP-1 and EP-0 are separate rows from EP-2.",
    ],
  }),

  freezeRecommendation({
    id: "highLoadMolyApplications",
    operatingScenario:
      "High-load, shock-heavy joints where OEM charts call lithium complex grease with molybdenum disulfide EP—loaders, draglines, and pivot lines.",
    typicalProblems: [
      "Using multipurpose lithium without moly EP proof",
      "Confusing moly lithium with calcium sulfonate Nano",
      "NLGI 2 assumed for all points",
    ],
    recommendedProductDirection: [
      "KLONDIKE Moly Tac EP-2 when NLGI 2 and 3% moly EP-2 are on chart.",
      "Moly Tac EP-1 row when NLGI 1 pumpability required—confirm on live PDS.",
      "Nano only when OEM calls calcium sulfonate severe-duty—not as moly substitute.",
    ],
    flagshipRecommendations: [
      "KLONDIKE Moly Tac EP-2 Grease — flagship 3% moly lithium complex EP-2 on index.",
    ],
    whyThisDirectionWorks: [
      "Moly Tac recommendation ties shock EP to indexed 3% moly and Timken/4-ball language—distinct from Nano sulfonate chemistry.",
    ],
    upgradeStory: [
      "Multipurpose lithium → Moly Tac EP-2 when chart requires moly EP.",
    ],
    possibleKlondikeProducts: [
      product("molyTac", "KLONDIKE Moly Tac EP-2 Grease", "Primary moly EP-2 flagship"),
    ],
    discoveryQuestions: [
      "Does OEM specify 3% moly EP-2?",
      "NLGI 1 or 2 on chart?",
      "Any centralized lube constraints?",
    ],
    repTalkTrack: [
      "When the chart says moly EP-2, Moly Tac is the story—3% moly on the PDS, not generic red grease.",
    ],
    cautionNotes: [
      "Do not position Moly Tac where Nano sulfonate is required—or vice versa—without OEM.",
      "Open gear needs Open Gear product, not Moly Tac tube grease.",
    ],
  }),

  freezeRecommendation({
    id: "foodGradePlant",
    operatingScenario:
      "Food and beverage plants requiring NSF H1 registered lubricants for incidental contact risk on hydraulics and grease points.",
    typicalProblems: [
      "Non-H1 shop oil near processing lines",
      "Confusion between food-grade hydraulic and standard AW",
      "EP grease without H1 registration on guards and conveyors",
    ],
    recommendedProductDirection: [
      "Food Grade Hydraulic for H1 hydraulic circuits per indexed PDS map row.",
      "Food Grade EP-2 Grease for H1 grease points requiring EP protection.",
      "Never substitute standard Commercial AW or Nano without H1 registration on the PDS title block.",
    ],
    flagshipRecommendations: [
      "KLONDIKE Food Grade Hydraulic — NSF H1 registered hydraulic row on PDS index.",
      "KLONDIKE Food Grade EP-2 Grease — NSF H1 registered grease row on PDS index.",
    ],
    whyThisDirectionWorks: [
      "Food plant recommendations anchor on NSF H1 registration language indexed on PDS—category is compliance-first, not performance tier marketing.",
    ],
    upgradeStory: [
      "Audit plant lube list → replace non-H1 SKUs with indexed Food Grade rows where HACCP plan requires.",
    ],
    possibleKlondikeProducts: [
      product("foodGradeHydraulic", "KLONDIKE Food Grade Hydraulic", "H1 hydraulic circuits"),
      product("foodGradeGrease", "KLONDIKE Food Grade EP-2 Grease", "H1 EP grease points"),
    ],
    discoveryQuestions: [
      "HACCP lube control plan and H1 requirement per point?",
      "Hydraulic vs gearbox vs grease point list?",
      "Any silver or process fluid restrictions beyond H1?",
    ],
    repTalkTrack: [
      "Food plants start with H1 on the PDS title block—show me your lube audit list before we map hydraulic and grease rows.",
    ],
    cautionNotes: [
      "H1 is not H2—confirm registration class for each point.",
      "OEM and plant sanitation procedures still govern changeovers.",
    ],
  }),

  freezeRecommendation({
    id: "biodegradableHydraulics",
    operatingScenario:
      "Sites requiring environmentally acceptable hydraulic fluids—spill-sensitive ground, municipal contracts, or OEM EAL/biodegradable specifications.",
    typicalProblems: [
      "Standard zinc AW used where policy requires biodegradable class",
      "Mixing bio and mineral without flush",
      "Assuming all 'green' drums are interchangeable",
    ],
    recommendedProductDirection: [
      "Confirm OEM requires inherently biodegradable AW, synthetic EAL, HEES, or HFDU class on bulletin.",
      "Indexed rows: Enviro AW, Enviro MV (zinc-free HVLP), Bio AW, Bio Synthetic EAL, Bio HEES per separate PDS map keys.",
      "Never substitute mineral Commercial AW where regulatory or OEM mandate specifies bio/enviro chemistry.",
    ],
    flagshipRecommendations: [
      "KLONDIKE ENVIRO Inherently Biodegradable AW — ashless zinc-free AW row when policy calls enviro AW class on index.",
      "KLONDIKE BIO Biodegradable AW Advanced Formula — biodegradable AW row on indexed bio PDS family.",
    ],
    whyThisDirectionWorks: [
      "Biodegradable recommendation separates enviro/bio chemistry classes from mineral AW and from UTF—reasoning follows OEM/policy gate, not green marketing.",
    ],
    upgradeStory: [
      "Document OEM/policy requirement → select matching indexed enviro or bio PDS row → flush per OEM when converting from mineral.",
    ],
    possibleKlondikeProducts: [
      product("enviroAW", "KLONDIKE ENVIRO Inherently Biodegradable AW", "Zinc-free biodegradable AW class"),
      product("enviroMV", "KLONDIKE ENVIRO MV Hydraulic", "Zinc-free biodegradable HVLP class"),
      product("bioAW", "KLONDIKE BIO Biodegradable AW Hydraulic", "Bio AW family on indexed PDS map"),
    ],
    discoveryQuestions: [
      "Written OEM, lease, or municipal spec for fluid chemistry class?",
      "Spill sensitivity and disposal requirements?",
      "Current fluid in reservoir and any mix history?",
    ],
    repTalkTrack: [
      "Biodegradable is a spec class conversation—show me the contract or OEM line, then we pick the indexed Enviro or Bio PDS row.",
    ],
    cautionNotes: [
      "Bio/enviro rows are not UTF, turbine, or food-grade substitutes.",
      "Flush and compatibility per OEM when converting from mineral AW.",
      "Confirm exact SKU and registration on live PDS before bulk.",
    ],
  }),
];

/** @type {Readonly<Record<string, DeterministicRecommendationProfile>>} */
const DETERMINISTIC_RECOMMENDATION_BY_ID = Object.freeze(
  Object.fromEntries(DETERMINISTIC_RECOMMENDATION_PROFILE_ROWS.map((p) => [p.id, p]))
);

/** @type {Readonly<{ version: number, profiles: readonly DeterministicRecommendationProfile[] }>} */
export const DETERMINISTIC_RECOMMENDATION_KNOWLEDGE = Object.freeze({
  version: DETERMINISTIC_RECOMMENDATION_KNOWLEDGE_VERSION,
  profiles: Object.freeze(DETERMINISTIC_RECOMMENDATION_PROFILE_ROWS),
});

/** @returns {readonly DeterministicRecommendationProfile[]} */
export function listDeterministicRecommendationProfiles() {
  return DETERMINISTIC_RECOMMENDATION_KNOWLEDGE.profiles;
}

/**
 * @param {unknown} id
 * @returns {DeterministicRecommendationProfile | null}
 */
export function getDeterministicRecommendationProfileById(id) {
  const key = String(id ?? "").trim();
  if (!key) return null;
  return DETERMINISTIC_RECOMMENDATION_BY_ID[key] || null;
}
