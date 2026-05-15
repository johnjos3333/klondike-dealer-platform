/**
 * Canonical KLONDIKE grease product intelligence (deterministic source text).
 * Grounded on indexed `pdsMap.js` grease rows and `greasePdsSpotlightMap.js` summaries.
 * Covers every product PDF in `public/pds/Greases PDS` (build: `Greases PDS`).
 * Not wired to UI in this module.
 */

import { NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE } from "./flagshipProductIntelligence.js";

/** @type {number} */
export const GREASE_CANONICAL_PRODUCT_INTELLIGENCE_VERSION = 1;

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   aliases: string[],
 *   category: "greases",
 *   greaseFamily: string,
 *   thickenerType: string,
 *   baseOilType: string,
 *   solidLubricants: string[],
 *   nlgiGrades: string[],
 *   productPositioning: string,
 *   whatItIs: string,
 *   whyItWins: string,
 *   pdsProofPoints: string[],
 *   applications: string[],
 *   industries: string[],
 *   equipmentTargets: string[],
 *   operatingConditions: string[],
 *   customerPainSignals: string[],
 *   repTalkTrack: string[],
 *   productSpotlightAngle: string,
 *   categorySpotlightRole: string,
 *   customerProfileMatches: string[],
 *   doNotConfuseWith: string[],
 *   pdsFileHint: string,
 *   pdsUrl: string,
 *   pdsMapKey: string,
 *   productNumbers: string[],
 *   cautionNotes: string[],
 * }} GreaseCanonicalProductIntelligence
 */

/** @param {GreaseCanonicalProductIntelligence} row */
function freezeGreaseRow(row) {
  return Object.freeze({
    ...row,
    aliases: Object.freeze([...row.aliases]),
    solidLubricants: Object.freeze([...row.solidLubricants]),
    nlgiGrades: Object.freeze([...row.nlgiGrades]),
    pdsProofPoints: Object.freeze([...row.pdsProofPoints]),
    applications: Object.freeze([...row.applications]),
    industries: Object.freeze([...row.industries]),
    equipmentTargets: Object.freeze([...row.equipmentTargets]),
    operatingConditions: Object.freeze([...row.operatingConditions]),
    customerPainSignals: Object.freeze([...row.customerPainSignals]),
    repTalkTrack: Object.freeze([...row.repTalkTrack]),
    customerProfileMatches: Object.freeze([...row.customerProfileMatches]),
    doNotConfuseWith: Object.freeze([...row.doNotConfuseWith]),
    productNumbers: Object.freeze([...row.productNumbers]),
    cautionNotes: Object.freeze([...row.cautionNotes]),
  });
}

const NANO = NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE;

/** @type {GreaseCanonicalProductIntelligence[]} */
const GREASE_CANONICAL_PRODUCT_ROWS = [
  freezeGreaseRow({
    id: "grease-canonical-nano-calcium-sulfonate-ep",
    productName: "KLONDIKE nano Calcium Sulfonate EP Grease",
    aliases: [
      "nano ep 2",
      "nano ep2",
      "nano ep 2 grease",
      "nano calcium sulfonate",
      "nano calcium sulfonate ep",
      "nano grease",
      "klondike nano",
    ],
    category: "greases",
    greaseFamily: "nano severe-duty EP",
    thickenerType: "calcium sulfonate complex",
    baseOilType: "mineral (per PDS index)",
    solidLubricants: ["proprietary tungsten disulfide nanotechnology (PDS wording)"],
    nlgiGrades: ["NLGI 1", "NLGI 2"],
    productPositioning:
      "Premium severe-duty calcium sulfonate complex EP grease with proprietary tungsten disulfide nanotechnology for shock, wet pins, and washout—not commodity EP grease.",
    whatItIs: NANO.whatItIsIntro,
    whyItWins: NANO.whyItWins,
    pdsProofPoints: [
      "NLGI 1 / 2; calcium sulfonate complex thickener on indexed PDS map.",
      "4-ball weld load 800 kg; Timken OK load 65+ lbs (indexed summary).",
      "Water spray-off <1%; dropping point 300°C+ class on index (EP2 near 316 °C class—confirm grade on live PDS).",
      "Proprietary tungsten disulfide nanotechnology for EP/wear—customer-facing wording must match printed PDS lines.",
    ],
    applications: [
      "High-load, high-temperature, and wet-environment pins and bushings when calcium sulfonate complex EP is allowed.",
      "Crushers, hammers, and loader implements with shock load and wash-down exposure.",
    ],
    industries: ["Mining and aggregate", "Heavy construction", "Agriculture severe-duty implements", "Industrial wash-down maintenance"],
    equipmentTargets: [
      "Slow-speed bearings, pins, and bushings under shock and load",
      "Mobile equipment pivot lines where calcium sulfonate EP is an approved class",
    ],
    operatingConditions: [
      "Shock-load and wet-service duty with documented spray-off and weld metrics.",
      "NLGI 1 vs 2 must follow OEM chart—not habit.",
    ],
    customerPainSignals: [
      "Washout and metal loss on wet shifts when commodity EP grease cannot show spray-off or weld numbers.",
      "“EP-2 is EP-2” assumptions on million-dollar mobile iron.",
    ],
    repTalkTrack: [...NANO.repTalkTrack],
    productSpotlightAngle:
      "Severe-duty calcium sulfonate complex with 800 kg weld and sub-1% spray-off—proprietary tungsten disulfide nanotechnology exactly as printed.",
    categorySpotlightRole: "Flagship severe-duty grease tier for wet, shock-loaded mobile pins—not general chassis default.",
    customerProfileMatches: ["mining_aggregate", "construction", "agriculture", "manufacturing"],
    doNotConfuseWith: [
      "NOT lithium or lithium complex grease—calcium sulfonate complex chemistry.",
      "NOT Moly Tac (lithium complex + 3% molybdenum)—different soap and solid lubricant story.",
      "NOT nano Full Synthetic EP-1.5 (PAO synthetic NLGI 1.5)—separate SKU and PDS.",
      "NOT Multi-Purpose lithium NLGI 2—lower severe-duty proof package.",
    ],
    pdsFileHint: "Greases PDS/KLONDIKE nano Calcium Sulfonate EP Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE nano Calcium Sulfonate EP Grease PDS.pdf",
    pdsMapKey: "Nano Calcium Sulfonate EP",
    productNumbers: [],
    cautionNotes: [...NANO.confirmBeforeUse],
  }),
  freezeGreaseRow({
    id: "grease-canonical-nano-full-synthetic-ep-1-5",
    productName: "KLONDIKE nano Full Synthetic EP-1.5 Grease",
    aliases: ["nano full synthetic ep 1.5", "nano ep 1.5", "nano synthetic grease", "klondike nano full synthetic"],
    category: "greases",
    greaseFamily: "nano full synthetic EP",
    thickenerType: "lithium complex (per PDS index)",
    baseOilType: "full synthetic PAO",
    solidLubricants: ["nano tungsten disulfide (PDS wording)"],
    nlgiGrades: ["NLGI 1.5"],
    productPositioning:
      "Premium full-synthetic NLGI 1.5 EP grease with PAO base oil and nano tungsten disulfide for high load, speed, and temperature when OEM allows this NLGI band.",
    whatItIs:
      "KLONDIKE nano Full Synthetic EP-1.5 is a full synthetic PAO NLGI 1.5 EP grease with nano tungsten disulfide additive positioning on the PDS for wear and EP—distinct from nano Calcium Sulfonate EP chemistry.",
    whyItWins:
      "Indexed 800 kg 4-ball weld, Timken OK 80 lbs, and wear scar 0.33 mm support premium severe-duty conversations when NLGI 1.5 is on the OEM chart—not a substitute for calcium sulfonate nano EP pins.",
    pdsProofPoints: [
      "NLGI 1.5; full synthetic PAO base oil; nano tungsten disulfide on indexed summary.",
      "4-ball weld load 800 kg; Timken OK 80 lbs; wear scar 0.33 mm; dropping point 260°C (confirm revision).",
    ],
    applications: [
      "Premium synthetic EP service where NLGI 1.5 is specified for load, speed, or temperature.",
      "Severe-duty bearings and pivots when OEM allows synthetic NLGI 1.5—not general zerk default.",
    ],
    industries: ["Mining and aggregate mobile fleets", "Construction high-shock implements", "Manufacturing OEM assembly cells"],
    equipmentTargets: ["Severe-duty bearings and pivots in NLGI 1.5 band", "Equipment where Timken and wear scar are decision criteria"],
    operatingConditions: ["High load and temperature windows per PDS; channeling and feed limits for NLGI 1.5 are OEM-critical."],
    customerPainSignals: [
      "Confusion between “nano” SKUs at the counter.",
      "Under-buying EP capability for true severe duty.",
    ],
    repTalkTrack: [
      "Confirm NLGI 1.5 on the nameplate before quoting—this is not NLGI 2 nano calcium sulfonate.",
      "Lead with weld, Timken, and wear scar lines from the PDS; keep nano additive language inside printed statements.",
    ],
    productSpotlightAngle: "Full synthetic PAO NLGI 1.5 with indexed weld/Timken/scar—separate from nano calcium sulfonate EP.",
    categorySpotlightRole: "Premium synthetic nano EP tier for approved NLGI 1.5 points only.",
    customerProfileMatches: ["mining_aggregate", "construction", "manufacturing", "trucking_fleet"],
    doNotConfuseWith: [
      "NOT nano Calcium Sulfonate EP (calcium sulfonate complex)—different thickener and duty story.",
      "NOT Syn Tac or Ultra Tac families—confirm PAO nano EP-1.5 row on PDS.",
    ],
    pdsFileHint: "Greases PDS/KLONDIKE nano Full Synthetic EP-1.5 Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE nano Full Synthetic EP-1.5 Grease PDS.pdf",
    pdsMapKey: "Nano Synthetic EP-1.5",
    productNumbers: [],
    cautionNotes: [
      "Do not interchange with nano Calcium Sulfonate EP grease.",
      "Verify central system shear and feed compatibility for NLGI 1.5.",
      "Keep nano claims inside published PDS wording.",
    ],
  }),
  freezeGreaseRow({
    id: "grease-canonical-hd-hammer",
    productName: "KLONDIKE HD Hammer Grease",
    aliases: ["hd hammer grease", "hammer grease", "breaker grease", "hydraulic hammer grease"],
    category: "greases",
    greaseFamily: "hammer / impact tool",
    thickenerType: "calcium sulfonate complex",
    baseOilType: "heavy mineral (460 cSt @40°C indexed)",
    solidLubricants: ["copper and graphite fortification (PDS positioning—confirm wording on live sheet)"],
    nlgiGrades: ["NLGI 2"],
    productPositioning:
      "Hammer-specific calcium sulfonate complex grease with solid lubricant fortification for hydraulic breakers and impact tools under high shock—not chassis multipurpose.",
    whatItIs:
      "KLONDIKE HD Hammer Grease is NLGI 2 calcium sulfonate complex grease formulated for hydraulic hammers and impact tools with copper/graphite fortification and high EP metrics on the indexed PDS.",
    whyItWins:
      "Indexed 800 kg 4-ball weld, dropping point >275°C, and wear scar <0.5 mm support hammer-duty film strength when the tool manual calls for this product class—not a red multipurpose tube.",
    pdsProofPoints: [
      "NLGI 2; calcium sulfonate complex thickener.",
      "4-ball weld load 800 kg; dropping point >275°C; wear scar <0.5 mm; base oil viscosity 460 cSt @40°C.",
      "Solid lubricant fortified; high shock load protection (indexed summary).",
    ],
    applications: [
      "Hydraulic breaker and hammer tool lubrication per OEM/tool manual.",
      "High-shock reciprocating tool points requiring EP and solid lubricant fortification.",
    ],
    industries: ["Construction and demolition", "Mining and quarry", "Aggregate processing with breakers"],
    equipmentTargets: ["Hydraulic hammers and impact tools", "Breaker attachments on excavators"],
    operatingConditions: ["Severe shock loading; high dropping point and heavy base oil per PDS index."],
    customerPainSignals: [
      "Tool wear or noise after general-purpose chassis grease was used on hammer points.",
      "Grease breakdown when impact energy exceeds the prior product’s indexed envelope.",
    ],
    repTalkTrack: [
      "Pull the hammer OEM lube note—match NLGI 2 and hammer grease class to the HD Hammer PDS.",
      "Quote weld and dropping point from the sheet; do not assume interchange with nano EP or Moly Tac.",
    ],
    productSpotlightAngle: "Calcium sulfonate complex hammer grease with 800 kg weld and solid lubricant fortification.",
    categorySpotlightRole: "Specialty hammer/breaker tier—excludes general plant multipurpose routes.",
    customerProfileMatches: ["construction", "mining_aggregate", "municipal_fleet"],
    doNotConfuseWith: [
      "NOT nano Calcium Sulfonate EP for general pins—hammer SKU is tool-specific.",
      "NOT Moly Tac lithium complex + moly—different chemistry.",
      "NOT Multi-Purpose lithium NLGI 2.",
    ],
    pdsFileHint: "Greases PDS/KLONDIKE HD Hammer Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE HD Hammer Grease PDS.pdf",
    pdsMapKey: "HD Hammer Grease",
    productNumbers: [],
    cautionNotes: [
      "Do not infer interchange with other calcium sulfonate or moly greases without compatibility review.",
      "Confirm copper/graphite claims on the live PDS revision.",
    ],
  }),
  freezeGreaseRow({
    id: "grease-canonical-drill-rod",
    productName: "KLONDIKE Drill Rod Grease",
    aliases: ["drill rod grease", "rod grease", "underground drill grease", "tacky rod grease"],
    category: "greases",
    greaseFamily: "drill rod / exploration",
    thickenerType: "barium complex",
    baseOilType: "mineral (150 cSt @40°C indexed)",
    solidLubricants: [],
    nlgiGrades: ["NLGI 3"],
    productPositioning:
      "Fibrous, tacky NLGI 3 barium-complex grease for drill rod and coupling service with adhesion and controlled washout per PDS limits.",
    whatItIs:
      "KLONDIKE Drill Rod Grease is heavy-duty tacky NLGI 3 barium complex grease for drill rod lubrication in wet underground and surface drilling with fibrous structure for collar adhesion.",
    whyItWins:
      "Water washout ≤5%, rust protection pass, and tacky NLGI 3 structure on the index support rod-thread programs when barium NLGI 3 is the documented fit.",
    pdsProofPoints: [
      "NLGI 3; barium complex thickener; fibrous tacky structure.",
      "Water washout ≤5%; dropping point 200°C; base oil viscosity 150 cSt; rust protection pass.",
    ],
    applications: ["Drill rod and coupling lubrication", "Wet drilling cycles needing adhesion and washout control"],
    industries: ["Underground and surface mining exploration", "Aggregate and quarry drilling", "Geotechnical drilling"],
    equipmentTargets: ["Top-hammer and DTH rod strings and couplings"],
    operatingConditions: ["High adhesion; water exposure; NLGI 3 feed and handling per OEM"],
    customerPainSignals: ["Rod galling when grease lacks tack or washes off threads", "Lost meters per shift from friction and contamination"],
    repTalkTrack: [
      "Confirm barium thickener acceptance with drill OEM before bulk change.",
      "Post washout and adhesion bullets from the Drill Rod PDS at the rod rack.",
    ],
    productSpotlightAngle: "Tacky NLGI 3 barium complex for rod threads—not chassis EP-2.",
    categorySpotlightRole: "Drilling-only tacky tier within grease category spotlights.",
    customerProfileMatches: ["mining_aggregate", "construction"],
    doNotConfuseWith: [
      "NOT lithium or polyurea chassis greases.",
      "NOT Fifth Wheel barium/moly plate lube—different duty.",
      "NOT nano or Moly Tac EP families.",
    ],
    pdsFileHint: "Greases PDS/KLONDIKE Drill Rod Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Drill Rod Grease PDS.pdf",
    pdsMapKey: "Drill Rod Grease",
    productNumbers: [],
    cautionNotes: [
      "Barium complex not interchangeable with lithium or polyurea without compatibility review.",
      "Site HSE and ventilation rules are customer-specific.",
    ],
  }),
  freezeGreaseRow({
    id: "grease-canonical-moly-tac-ep-2",
    productName: "KLONDIKE Moly Tac EP-2 Grease",
    aliases: ["moly tac ep 2", "moly tac ep2", "moly ep 2", "klondike moly tac"],
    category: "greases",
    greaseFamily: "Moly Tac EP",
    thickenerType: "lithium complex",
    baseOilType: "mineral",
    solidLubricants: ["3% molybdenum disulfide"],
    nlgiGrades: ["NLGI 2"],
    productPositioning:
      "Heavy-duty lithium complex NLGI 2 grease with 3% molybdenum disulfide for EP, shock, and adhesion where moly EP-2 is specified.",
    whatItIs:
      "KLONDIKE Moly Tac EP-2 is lithium complex NLGI 2 grease with 3% molybdenum disulfide for extreme pressure and shock loading—documented Timken, 4-ball, and washout on the indexed PDS.",
    whyItWins:
      "3% moly and lithium complex are printed on the PDS—reps can match OEM moly EP-2 charts with Timken OK 70 lbs and 500 kg 4-ball EP load instead of “any red EP-2.”",
    pdsProofPoints: [
      "NLGI 2; lithium complex; 3% molybdenum.",
      "Dropping point 260°C; 4-ball EP load 500 kg; Timken OK 70 lbs; water washout 1%.",
    ],
    applications: [
      "Pins, bushings, and chassis zerks calling for moly-fortified EP-2",
      "Loader and excavator implements when moly EP-2 is on the cap sheet",
    ],
    industries: ["Construction", "Mining mobile fleets", "Agriculture implements", "Trucking vocational chassis"],
    equipmentTargets: ["High-shock pins and implements", "Centralized systems only when thickener compatibility is approved"],
    operatingConditions: ["Shock-loaded joints; moly percent and soap family are compatibility-critical"],
    customerPainSignals: [
      "Pin spalling when moly-spec joints received non-moly EP-2",
      "Central lube contamination from wrong thickener crossover",
    ],
    repTalkTrack: [
      "Read the zerk chart: moly EP-2, lithium complex, 3% moly—from the Moly Tac EP-2 PDS.",
      "Do not offer nano calcium sulfonate as a silent substitute for moly-spec pins.",
    ],
    productSpotlightAngle: "Documented 3% moly lithium complex EP-2 with Timken and washout on the PDS.",
    categorySpotlightRole: "Primary moly EP-2 reference SKU in the grease lineup.",
    customerProfileMatches: ["construction", "mining_aggregate", "agriculture", "trucking_fleet", "municipal_fleet"],
    doNotConfuseWith: [
      "NOT nano Calcium Sulfonate EP (no 3% moly; calcium sulfonate complex).",
      "NOT Moly Tac EP-1 (NLGI 1) or Bentone/Arctic SKUs without reading that PDS row.",
      "NOT Multi-Purpose lithium without moly.",
    ],
    pdsFileHint: "Greases PDS/KLONDIKE Moly Tac EP-2 Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Moly Tac EP-2 Grease PDS.pdf",
    pdsMapKey: "Moly Tac EP-2",
    productNumbers: [],
    cautionNotes: [
      "Lithium complex per PDS—do not assume calcium sulfonate chemistry.",
      "Confirm central system and OEM restrictions before bulk moly conversion.",
    ],
  }),
  freezeGreaseRow({
    id: "grease-canonical-moly-tac-ep-1",
    productName: "KLONDIKE Moly Tac EP-1 Grease",
    aliases: ["moly tac ep 1", "moly tac ep1", "moly ep 1"],
    category: "greases",
    greaseFamily: "Moly Tac EP",
    thickenerType: "lithium complex",
    baseOilType: "mineral",
    solidLubricants: ["3% molybdenum disulfide"],
    nlgiGrades: ["NLGI 1"],
    productPositioning: "Lithium complex NLGI 1 moly EP grease for feed-sensitive circuits and OEM NLGI 1 moly charts.",
    whatItIs:
      "KLONDIKE Moly Tac EP-1 is lithium complex NLGI 1 grease with 3% molybdenum for heavy-duty EP and shock service when NLGI 1 is required for pumpability or central feed.",
    whyItWins:
      "Same 3% moly family as EP-2 with NLGI 1 feed advantages—400 kg 4-ball EP, Timken OK 70 lbs, and 4% washout on the indexed summary.",
    pdsProofPoints: [
      "NLGI 1; lithium complex; 3% molybdenum; dropping point 260°C.",
      "4-ball EP load 400 kg; Timken OK 70 lbs; water washout 4%.",
    ],
    applications: ["NLGI 1 moly EP pins and bushings", "Central feed where NLGI 2 is too stiff"],
    industries: ["Construction", "Mining", "Agriculture"],
    equipmentTargets: ["Pins and bushings on OEM NLGI 1 moly EP charts"],
    operatingConditions: ["Wide temperature performance per PDS; ambient and line length drive NLGI choice"],
    customerPainSignals: ["Feed issues when NLGI 2 is used on NLGI 1 circuits", "Wear when moly percent does not match chart"],
    repTalkTrack: [
      "Tag NLGI 1 zerks separately—do not default the fleet to EP-2.",
      "Match 3% moly language on the EP-1 PDS to the OEM cap.",
    ],
    productSpotlightAngle: "NLGI 1 moly EP with indexed EP/Timken—pair with EP-2 only per chart.",
    categorySpotlightRole: "NLGI 1 counterpart within Moly Tac family spotlights.",
    customerProfileMatches: ["construction", "mining_aggregate", "agriculture", "trucking_fleet"],
    doNotConfuseWith: ["NOT Moly Tac EP-2 where NLGI 2 is required", "NOT nano or multipurpose lithium"],
    pdsFileHint: "Greases PDS/KLONDIKE Moly Tac EP-1 Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Moly Tac EP-1 Grease PDS.pdf",
    pdsMapKey: "Moly Tac EP-1",
    productNumbers: [],
    cautionNotes: ["Not interchangeable with EP-2 for NLGI 2-mandated joints", "Confirm moly allowance on food-adjacent equipment separately"],
  }),
  freezeGreaseRow({
    id: "grease-canonical-moly-tac-arctic-ep-0",
    productName: "KLONDIKE Moly Tac Arctic Extreme EP-0 Grease",
    aliases: ["moly tac arctic", "moly tac ep 0", "arctic ep-0 grease"],
    category: "greases",
    greaseFamily: "Moly Tac EP",
    thickenerType: "lithium complex (synthetic blend base per index)",
    baseOilType: "synthetic blend",
    solidLubricants: ["5% solid lubricant (indexed)"],
    nlgiGrades: ["NLGI 0"],
    productPositioning: "Arctic NLGI 0 synthetic-blend grease with solid lubricants for −45°C to 20°C service and pumpability.",
    whatItIs:
      "KLONDIKE Moly Tac Arctic Extreme EP-0 is NLGI 0 grease with synthetic blend base oil and 5% solid lubricant for sub-zero pumpability and EP protection per indexed operating band.",
    whyItWins:
      "Operating range −45°C to 20°C and 400 kg 4-ball EP on the index support cold-climate programs when NLGI 0 is approved—not summer EP-2 in the cart.",
    pdsProofPoints: [
      "NLGI 0; synthetic blend; 5% solid lubricant; operating range −45°C to 20°C.",
      "4-ball EP load 400 kg; dropping point 180°C; rust protection pass; low-temperature pumpability.",
    ],
    applications: ["Sub-zero chassis and implement points", "Cold-climate central lube when NLGI 0 is specified"],
    industries: ["Northern trucking", "Municipal snow", "Mining and construction winter ops"],
    equipmentTargets: ["Chassis points requiring NLGI 0 in cold service"],
    operatingConditions: ["Tight upper temperature bound on index—do not extrapolate to hot kiln duty without OEM"],
    customerPainSignals: ["Dry pins on first −20°C morning after summer grease remained in service"],
    repTalkTrack: [
      "Log coldest week and hardware—align −45°C language on the Arctic EP-0 PDS.",
      "Separate from Syn Tac EP-00 PAO programs when OEM distinguishes.",
    ],
    productSpotlightAngle: "Cold-band NLGI 0 with solid lubricants and indexed pumpability.",
    categorySpotlightRole: "Winter moly EP-0 lane—not default EP-2.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet", "construction", "mining_aggregate"],
    doNotConfuseWith: ["NOT Moly Tac EP-2 for general duty", "NOT Syn Tac EP-00 unless OEM allows PAO 00"],
    pdsFileHint: "Greases PDS/KLONDIKE Moly Tac Arctic Extreme Synthetic EP-0 Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Moly Tac Arctic Extreme Synthetic EP-0 Grease PDS.pdf",
    pdsMapKey: "Moly Tac Arctic EP-0",
    productNumbers: [],
    cautionNotes: ["Upper band 20°C on index—confirm hot-duty limits", "Central systems need NLGI 0 OEM approval"],
  }),
  freezeGreaseRow({
    id: "grease-canonical-moly-tac-bentone-ep-2",
    productName: "KLONDIKE Moly Tac Bentone High Temp EP-2 Grease",
    aliases: ["moly tac bentone", "bentone ep-2", "clay grease moly tac"],
    category: "greases",
    greaseFamily: "Moly Tac specialty",
    thickenerType: "bentonite (clay)",
    baseOilType: "mineral (14 cSt @40°C indexed)",
    solidLubricants: ["molybdenum disulfide"],
    nlgiGrades: ["NLGI 2"],
    productPositioning: "High-temperature bentonite-thickened NLGI 2 grease with moly for furnace/kiln-adjacent duty—not general chassis EP-2.",
    whatItIs:
      "KLONDIKE Moly Tac Bentone High Temp EP-2 uses clay (Bentone) thickener with molybdenum disulfide for high-heat industrial points where soap greases fail—penetration 270–290 on index.",
    whyItWins:
      "Clay thickener with no conventional dropping point on index supports heat-zone conversations when OEM specifies bentone+moly EP-2.",
    pdsProofPoints: [
      "NLGI 2; clay (Bentone) thickener; molybdenum disulfide.",
      "Penetration 270–290; base oil viscosity 14 cSt; high temperature stability; water and vibration resistance.",
    ],
    applications: ["High-temperature industrial bearings and mechanisms", "Furnace/kiln vicinity equipment per OEM"],
    industries: ["Cement and lime", "Primary metals", "Mining process heat zones"],
    equipmentTargets: ["Slow-speed bearings in high-heat environments"],
    operatingConditions: ["High skin temperatures—OEM clay grease approval required"],
    customerPainSignals: ["Bearing failures when general lithium EP-2 exceeded temperature envelope"],
    repTalkTrack: [
      "Capture max housing temperature—walk Bentone+moly lines on the PDS with engineering.",
      "Plan purge/compatibility before thickener changeover.",
    ],
    productSpotlightAngle: "Clay + moly EP-2 for approved high-heat assets.",
    categorySpotlightRole: "Heat-specialty grease within Moly Tac family.",
    customerProfileMatches: ["manufacturing", "mining_aggregate", "municipal_fleet"],
    doNotConfuseWith: ["NOT lithium Moly Tac EP-2", "NOT open-gear high-viscosity products"],
    pdsFileHint: "Greases PDS/KLONDIKE Moly Tac Bentone High Temp EP-2 Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Moly Tac Bentone High Temp EP-2 Grease PDS.pdf",
    pdsMapKey: "Moly Tac Bentone EP-2",
    productNumbers: [],
    cautionNotes: ["Clay incompatible with many soap greases—follow OEM purge", "Low base oil viscosity—wrong for open-gear film duty"],
  }),
  freezeGreaseRow({
    id: "grease-canonical-multi-purpose",
    productName: "KLONDIKE Multi-Purpose Grease",
    aliases: ["multi purpose grease", "multipurpose grease", "klondike red grease mp"],
    category: "greases",
    greaseFamily: "multipurpose",
    thickenerType: "lithium",
    baseOilType: "mineral (200 cSt @40°C indexed)",
    solidLubricants: [],
    nlgiGrades: ["NLGI 2"],
    productPositioning: "Versatile NLGI 2 lithium multipurpose grease for moderate duty—not severe moly, nano, or specialty joints.",
    whatItIs:
      "KLONDIKE Multi-Purpose Grease is NLGI 2 lithium grease for general industrial and mobile lubrication with indexed 315 kg weld, Timken OK 45 lbs, and water resistance.",
    whyItWins:
      "Documented multipurpose metrics give shops a baseline NLGI 2 lithium standard—without overselling versus 800 kg weld severe lines.",
    pdsProofPoints: [
      "NLGI 2; lithium thickener; dropping point 200°C; base oil 200 cSt.",
      "4-ball weld 315 kg; Timken OK 45 lbs; water resistant; multipurpose application.",
    ],
    applications: ["General plant and yard zerks where NLGI 2 lithium multipurpose is OEM-approved"],
    industries: ["Manufacturing MRO", "Municipal shops", "Construction yards"],
    equipmentTargets: ["Bearings and bushings on general charts—not hammers, fifth wheels, or open gears"],
    operatingConditions: ["Moderate to heavy-duty general service per OEM"],
    customerPainSignals: ["Specialty joint failures when multipurpose was used off-chart", "SKU sprawl without a posted standard"],
    repTalkTrack: [
      "Audit zerks for specialty exclusions before quoting multipurpose.",
      "Quote Timken 45 and weld 315 as moderate tier—not nano or moly numbers.",
    ],
    productSpotlightAngle: "Baseline NLGI 2 lithium multipurpose with indexed EP metrics.",
    categorySpotlightRole: "Default multipurpose tier when OEM allows—routes specialty elsewhere.",
    customerProfileMatches: ["manufacturing", "municipal_fleet", "construction", "trucking_fleet"],
    doNotConfuseWith: [
      "NOT nano Calcium Sulfonate EP severe-duty program.",
      "NOT Moly Tac 3% moly lithium complex.",
      "NOT Ultra Tac GC-LB premium chassis when chart requires GC-LB.",
    ],
    pdsFileHint: "Greases PDS/KLONDIKE Multi-Purpose Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Multi-Purpose Grease PDS.pdf",
    pdsMapKey: "Multi-Purpose Grease",
    productNumbers: [],
    cautionNotes: ["Does not replace moly, clay, barium, or open-gear products", "Moderate Timken vs severe-duty families"],
  }),
  freezeGreaseRow({
    id: "grease-canonical-open-gear-grease",
    productName: "KLONDIKE Open Gear Grease",
    aliases: ["open gear grease", "girth gear grease", "kiln gear grease", "shovel open gear"],
    category: "greases",
    greaseFamily: "open gear (NLGI)",
    thickenerType: "lithium (indexed)",
    baseOilType: "very high viscosity mineral (4100 cSt @40°C indexed)",
    solidLubricants: [],
    nlgiGrades: ["NLGI 0", "NLGI 1"],
    productPositioning:
      "Heavy-adhesion NLGI open gear grease for extreme load exposed gearing—1000 kg weld on index; confirm Caterpillar SD 4713 / Komatsu and similar OEM lines on live PDS.",
    whatItIs:
      "KLONDIKE Open Gear Grease is heavy-duty open gear grease for mining shovels, kilns, and exposed gearing with very high base viscosity and extreme load metrics on the indexed PDS—not enclosed gear oil.",
    whyItWins:
      "4-ball weld load 1000 kg, viscosity @40°C 4100 cSt, and high adhesion support open-mesh film conversations when OEM allows this NLGI open-gear product.",
    pdsProofPoints: [
      "NLGI 0/1; lithium thickener (indexed).",
      "4-ball weld load 1000 kg; viscosity @40°C 4100 cSt; wear scar 0.7 mm; rust protection pass.",
      "Confirm Caterpillar SD 4713, Komatsu, and other OEM open-gear references on the current PDS revision.",
    ],
    applications: [
      "Open girth gears, kiln drives, and mining shovel open gear trains",
      "Extreme-load exposed gearing with spray/idler methods per OEM",
    ],
    industries: ["Mining", "Cement and lime", "Heavy industrial exposed gearing"],
    equipmentTargets: ["Open girth gears and shovel open gear systems", "Kiln and mill open drives"],
    operatingConditions: ["Slow-turn, high load, contamination and wash exposure", "NLGI 0 vs 1 per OEM"],
    customerPainSignals: ["Mesh wear when film was too thin", "Wrong product family vs Open Gear Lubricant semi-fluid"],
    repTalkTrack: [
      "Separate Open Gear Grease from Open Gear Lubricant on the lube board.",
      "Use tooth photos and PDS weld/viscosity lines—not multipurpose or moly chassis grease.",
    ],
    productSpotlightAngle: "1000 kg weld open-gear grease with extreme viscosity for mesh film.",
    categorySpotlightRole: "NLGI open-gear brick/semi-solid tier in grease category.",
    customerProfileMatches: ["mining_aggregate", "manufacturing"],
    doNotConfuseWith: [
      "NOT Open Gear Lubricant (non-asphaltic semi-fluid)—different PDS and application class.",
      "NOT enclosed industrial gear oils.",
      "NOT nano or Moly Tac chassis greases.",
    ],
    pdsFileHint: "Greases PDS/KLONDIKE Open Gear Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Open Gear Grease PDS.pdf",
    pdsMapKey: "Open Gear Grease",
    productNumbers: [],
    cautionNotes: [
      "Application method and HSE per OEM/site",
      "Confirm OEM open-gear spec including Caterpillar/Komatsu rows on live PDS",
    ],
  }),
  freezeGreaseRow({
    id: "grease-canonical-open-gear-lubricant",
    productName: "KLONDIKE Open Gear Lubricant",
    aliases: ["open gear lubricant", "open gear lube", "kiln open gear fluid", "non asphaltic open gear"],
    category: "greases",
    greaseFamily: "open gear (semi-fluid lubricant)",
    thickenerType: "non-asphaltic open gear lubricant (per PDS)",
    baseOilType: "high viscosity film (indexed)",
    solidLubricants: [],
    nlgiGrades: ["semi-fluid open gear product—not NLGI brick"],
    productPositioning:
      "Non-asphaltic open gear lubricant for exposed gears on kilns and ball mills—resists hardening; confirm FL Smidth, Falk, Metso and similar OEM approvals on live PDS.",
    whatItIs:
      "KLONDIKE Open Gear Lubricant is a non-asphaltic open gear lubricant for extreme-load exposed gearing with weld >800 kg and resists-hardening positioning on the indexed PDS—separate from NLGI Open Gear Grease.",
    whyItWins:
      "Wear scar 0.45 mm, >800 kg weld, and non-hardening film language support inspection-friendly open-gear programs where semi-fluid product is specified.",
    pdsProofPoints: [
      "Non-asphaltic formulation; 4-ball weld load >800 kg; wear scar 0.45 mm.",
      "Flash point 175°C; copper corrosion 1B; extreme pressure protection; resists hardening.",
      "Confirm FL Smidth, Falk, Metso and related OEM lists on the current PDS.",
    ],
    applications: [
      "Exposed open gear drives where non-asphaltic lubricant is specified",
      "Kilns, ball mills, and similar with spray/idler application per OEM",
    ],
    industries: ["Mining", "Cement", "Manufacturing reliability programs"],
    equipmentTargets: ["Girth gears and open drives requiring semi-fluid open gear lubricant"],
    operatingConditions: ["Extreme load; visual inspection programs; environmental exposure"],
    customerPainSignals: [
      "Flaking/hardening when asphaltic or wrong family was used",
      "Confusion between Open Gear Grease and Open Gear Lubricant SKUs",
    ],
    repTalkTrack: [
      "Ask for OEM film type and spray method—match Open Gear Lubricant PDS, not NLGI grease brick.",
      "Quote weld and wear scar from the sheet for reliability files.",
    ],
    productSpotlightAngle: "Non-asphaltic semi-fluid open gear lube with >800 kg weld and resists hardening.",
    categorySpotlightRole: "Semi-fluid open-gear tier paired against Open Gear Grease in spotlights.",
    customerProfileMatches: ["mining_aggregate", "manufacturing"],
    doNotConfuseWith: [
      "NOT Open Gear Grease NLGI 0/1 high-viscosity grease",
      "NOT enclosed gear oils or multipurpose greases",
    ],
    pdsFileHint: "Greases PDS/KLONDIKE Open Gear Lubricant PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Open Gear Lubricant PDS.pdf",
    pdsMapKey: "Open Gear Lubricant",
    productNumbers: [],
    cautionNotes: ["Spray consumption and HSE are site-specific", "Confirm heavy-metal and environmental wording on live PDS"],
  }),
  freezeGreaseRow({
    id: "grease-canonical-fifth-wheel",
    productName: "KLONDIKE Fifth Wheel Grease",
    aliases: ["fifth wheel grease", "5th wheel grease", "kingpin grease tacky"],
    category: "greases",
    greaseFamily: "fifth wheel / sliding load",
    thickenerType: "barium complex",
    baseOilType: "mineral (100 cSt @40°C indexed)",
    solidLubricants: ["moly fortified (indexed)"],
    nlgiGrades: ["NLGI 2"],
    productPositioning: "Tacky, moly-fortified NLGI 2 barium complex grease for fifth wheel plates and sliding hitch interfaces.",
    whatItIs:
      "KLONDIKE Fifth Wheel Grease is tacky NLGI 2 barium complex grease with moly fortification for fifth wheel plates, with load wear index 65 and water-resistant adhesion per indexed PDS.",
    whyItWins:
      "Purpose-built sliding-load tack and moly fortification beat multipurpose lithium on plates exposed to weather and articulation cycles.",
    pdsProofPoints: [
      "NLGI 2; barium complex; moly fortified; base oil 100 cSt.",
      "Dropping point 165°C; load wear index 65; water resistant; high adhesion.",
    ],
    applications: ["Fifth wheel top plates and kingpin sliding interfaces", "Outdoor Class 8 PM where tacky moly NLGI 2 is specified"],
    industries: ["Trucking fleets", "Municipal vocational fleets", "Dealer lube bays"],
    equipmentTargets: ["Tractor fifth wheels and sliding hitches"],
    operatingConditions: ["Rain, road spray, and heavy sliding loads"],
    customerPainSignals: ["Plate wear when non-tacky chassis grease washed off", "Steering feel complaints after wrong product"],
    repTalkTrack: [
      "Photograph OEM fifth wheel lube note—match barium/moly NLGI 2 on the PDS.",
      "Do not use GC-LB chassis grease as a silent fifth wheel substitute.",
    ],
    productSpotlightAngle: "Tacky barium complex moly-fortified fifth wheel specialist.",
    categorySpotlightRole: "Chassis-adjacent specialty—not general multipurpose route.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet", "construction"],
    doNotConfuseWith: [
      "NOT Moly Tac lithium complex EP-2 for pins unless OEM allows on plate",
      "NOT nano or multipurpose for fifth wheel duty",
    ],
    pdsFileHint: "Greases PDS/KLONDIKE Fifth Wheel Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Fifth Wheel Grease PDS.pdf",
    pdsMapKey: "Fifth Wheel Grease",
    productNumbers: [],
    cautionNotes: [
      "Barium not interchangeable with lithium/polyurea without review",
      "GC-LB chassis approval does not come from this row alone",
    ],
  }),
  freezeGreaseRow({
    id: "grease-canonical-syn-tac-ep00",
    productName: "KLONDIKE Syn Tac Synthetic EP-00 Grease",
    aliases: ["syn tac ep 00", "syn tac ep00", "synthetic ep 00 grease"],
    category: "greases",
    greaseFamily: "Syn Tac synthetic EP",
    thickenerType: "lithium complex",
    baseOilType: "synthetic PAO",
    solidLubricants: [],
    nlgiGrades: ["NLGI 00"],
    productPositioning: "Semi-fluid PAO lithium complex NLGI 00 for autolube and extreme cold pumpability (−45°C to 120°C indexed).",
    whatItIs:
      "KLONDIKE Syn Tac Synthetic EP-00 is semi-fluid NLGI 00 PAO lithium complex grease for centralized systems and cold climates with EP protection per PDS operating range.",
    whyItWins:
      "Broader high-temperature headroom than arctic EP-0 row on index when OEM specifies PAO 00—dropping point 260°C and 440 cSt base oil listed.",
    pdsProofPoints: [
      "NLGI 00; lithium complex; synthetic PAO; operating range −45°C to 120°C.",
      "Dropping point 260°C; base oil viscosity 440 cSt; EP protection; low-temperature pumpability.",
    ],
    applications: ["Centralized lube and autolube reservoirs requiring NLGI 00 synthetic EP"],
    industries: ["Northern trucking", "Mining/construction central lube", "Manufacturing distributors"],
    equipmentTargets: ["Autolube systems approved for NLGI 00 synthetic EP"],
    operatingConditions: ["Sub-zero pumpability; reservoir compatibility critical"],
    customerPainSignals: ["Line starvation when NLGI 2 left in 00 systems", "Cross-grade top-offs plugging headers"],
    repTalkTrack: [
      "Walk autolube schematic with OEM NLGI 00 callout.",
      "Separate from Ultra Tac synthetic blend 00 when OEM distinguishes PAO vs blend.",
    ],
    productSpotlightAngle: "PAO NLGI 00 synthetic EP for cold autolube programs.",
    categorySpotlightRole: "Full synthetic semi-fluid tier in Syn Tac family.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet", "mining_aggregate", "manufacturing"],
    doNotConfuseWith: ["NOT Moly Tac Arctic EP-0 unless OEM equates", "NOT zerk NLGI 2 products"],
    pdsFileHint: "Greases PDS/KLONDIKE Syn Tac Synthetic EP-00 PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Syn Tac Synthetic EP-00 PDS.pdf",
    pdsMapKey: "Syn Tac EP-00",
    productNumbers: [],
    cautionNotes: ["NLGI 00 only for approved circuits", "Thickener compatibility before reservoir change"],
  }),
  freezeGreaseRow({
    id: "grease-canonical-syn-tac-ep1",
    productName: "KLONDIKE Syn Tac Synthetic EP-1 Grease",
    aliases: ["syn tac ep 1", "syn tac synthetic ep-1", "synthetic gc-lb ep-1"],
    category: "greases",
    greaseFamily: "Syn Tac synthetic EP",
    thickenerType: "lithium complex",
    baseOilType: "synthetic PAO",
    solidLubricants: [],
    nlgiGrades: ["NLGI 1"],
    productPositioning: "Full synthetic PAO NLGI 1 lithium complex EP grease with GC-LB and wide −40°C to 180°C indexed band.",
    whatItIs:
      "KLONDIKE Syn Tac Synthetic EP-1 is full synthetic PAO NLGI 1 grease for chassis and bearing duty with GC-LB performance and Timken OK 65 lbs on the indexed summary.",
    whyItWins:
      "GC-LB plus 300°C dropping point and wide operating band support fleet synthetic chassis upgrades when OEM allows full synthetic NLGI 1.",
    pdsProofPoints: [
      "NLGI 1; lithium complex; synthetic PAO; operating range −40°C to 180°C.",
      "Dropping point 300°C; Timken OK 65 lbs; GC-LB performance noted on index.",
    ],
    applications: ["Chassis and wheel-end points requiring GC-LB NLGI 1 synthetic EP"],
    industries: ["Trucking", "Construction", "Agriculture", "Municipal fleets"],
    equipmentTargets: ["GC-LB chassis points per OEM chart"],
    operatingConditions: ["Wide ambient swing; synthetic allowance required on OEM"],
    customerPainSignals: ["Interval creep without OEM synthetic approval", "GC-LB missing on nameplate joints"],
    repTalkTrack: [
      "Capture GC-LB and NLGI 1 from OEM chart before upsell.",
      "Contrast with Ultra Tac synthetic blend—not identical base oil type.",
    ],
    productSpotlightAngle: "Full synthetic PAO GC-LB NLGI 1 EP.",
    categorySpotlightRole: "Premium synthetic chassis tier in Syn Tac lineup.",
    customerProfileMatches: ["trucking_fleet", "construction", "agriculture", "municipal_fleet"],
    doNotConfuseWith: ["NOT Ultra Tac synthetic blend family", "NOT multipurpose lithium NLGI 2"],
    pdsFileHint: "Greases PDS/KLONDIKE Syn Tac Synthetic EP-1 Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Syn Tac Synthetic EP-1 Grease PDS.pdf",
    pdsMapKey: "Syn Tac EP-1",
    productNumbers: [],
    cautionNotes: ["GC-LB applies to tested chassis categories on PDS", "Compatibility review before bulk swap"],
  }),
  freezeGreaseRow({
    id: "grease-canonical-ultra-tac-ep2",
    productName: "KLONDIKE Ultra Tac EP-2 Grease",
    aliases: ["ultra tac ep 2", "ultra tac ep grease", "ultra tac gc-lb"],
    category: "greases",
    greaseFamily: "Ultra Tac EP",
    thickenerType: "lithium complex",
    baseOilType: "mineral",
    solidLubricants: [],
    nlgiGrades: ["NLGI 2"],
    productPositioning: "Premium NLGI 2 lithium complex EP grease with NLGI GC-LB for wheel bearings and severe chassis duty.",
    whatItIs:
      "KLONDIKE Ultra Tac EP-2 (Ultra Tac EP Greases family) is NLGI 2 lithium complex EP grease with GC-LB, 300°C dropping point, and indexed EP/Timken/washout for premium chassis programs.",
    whyItWins:
      "GC-LB with 400 kg 4-ball EP and Timken OK 60 lbs supports premium fleet PM when chart requires GC-LB NLGI 2—not multipurpose Timken 45 tier.",
    pdsProofPoints: [
      "NLGI 2; lithium complex; NLGI GC-LB; dropping point 300°C.",
      "4-ball EP load 400 kg; Timken OK 60 lbs; water washout 3.8%.",
    ],
    applications: ["Wheel bearings and chassis points requiring GC-LB NLGI 2 EP"],
    industries: ["Class 8 trucking", "Construction", "Municipal severe chassis"],
    equipmentTargets: ["Wheel ends and chassis zerks on GC-LB charts"],
    operatingConditions: ["High load fleet PM; water exposure per indexed washout"],
    customerPainSignals: ["Hub noise when non-GC-LB product used on GC-LB chart", "Price-only comparisons ignoring Timken"],
    repTalkTrack: [
      "Post GC-LB NLGI 2 beside bulk gun—quote Ultra Tac EP-2 row on family PDS.",
      "Not for fifth wheel, open gear, or hammer points.",
    ],
    productSpotlightAngle: "GC-LB NLGI 2 premium lithium complex EP chassis grease.",
    categorySpotlightRole: "Premium chassis/wheel-end tier vs multipurpose baseline.",
    customerProfileMatches: ["trucking_fleet", "construction", "municipal_fleet", "mining_aggregate"],
    doNotConfuseWith: [
      "NOT Syn Tac full synthetic PAO unless OEM specifies synthetic",
      "NOT nano Calcium Sulfonate EP pin program",
      "NOT Moly Tac 3% moly unless chart calls moly",
    ],
    pdsFileHint: "Greases PDS/KLONDIKE Ultra Tac EP Greases PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Ultra Tac EP Greases PDS.pdf",
    pdsMapKey: "Ultra Tac EP-2",
    productNumbers: [],
    cautionNotes: ["Family PDS—confirm exact NLGI 2 SKU row on live sheet", "GC-LB does not authorize specialty joints"],
  }),
  freezeGreaseRow({
    id: "grease-canonical-ultra-tac-synthetic-blend-ep1",
    productName: "KLONDIKE Ultra Tac Synthetic Blend EP-1 Grease",
    aliases: ["ultra tac synthetic blend ep 1", "ultra tac blend ep-1"],
    category: "greases",
    greaseFamily: "Ultra Tac synthetic blend EP",
    thickenerType: "lithium complex",
    baseOilType: "synthetic blend",
    solidLubricants: [],
    nlgiGrades: ["NLGI 1"],
    productPositioning: "Synthetic blend NLGI 1 lithium complex GC-LB EP for cold-weather and heavy-duty chassis when OEM selects this family row.",
    whatItIs:
      "KLONDIKE Ultra Tac Synthetic Blend EP-1 is NLGI 1 lithium complex synthetic blend grease with GC-LB and indexed EP/Timken from the Ultra Tac Synthetic Blend EP Greases family PDS.",
    whyItWins:
      "Synthetic blend (not full PAO) with GC-LB supports seasonal fleet programs with 400 kg EP and Timken OK 60 lbs on representative index row.",
    pdsProofPoints: [
      "NLGI 1; lithium complex; synthetic blend; NLGI GC-LB.",
      "Dropping point 265°C; 4-ball EP 400 kg; Timken OK 60 lbs; cold temperature performance on index.",
    ],
    applications: ["Chassis points allowing synthetic blend NLGI 1 GC-LB from family PDS"],
    industries: ["Northern trucking", "Construction", "Agriculture", "Municipal"],
    equipmentTargets: ["GC-LB NLGI 1 points per OEM"],
    operatingConditions: ["Cold start and summer load—confirm NLGI row on family table"],
    customerPainSignals: ["Seasonal swaps without GC-LB discipline", "Confusion with Syn Tac full synthetic"],
    repTalkTrack: [
      "Open family PDS table—highlight customer’s NLGI 1 row before drums.",
      "Label bulk tank with blend vs PAO Syn Tac per OEM.",
    ],
    productSpotlightAngle: "Synthetic blend GC-LB NLGI 1 EP from Ultra Tac blend family.",
    categorySpotlightRole: "Blend chassis tier between multipurpose and full synthetic Syn Tac.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet", "construction", "agriculture"],
    doNotConfuseWith: ["NOT Syn Tac full synthetic PAO", "NOT nano products", "NOT Moly Tac moly EP unless chart says moly"],
    pdsFileHint: "Greases PDS/KLONDIKE Ultra Tac Synthetic Blend EP Greases PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Ultra Tac Synthetic Blend EP Greases PDS.pdf",
    pdsMapKey: "Ultra Tac Synthetic Blend EP-1",
    productNumbers: [],
    cautionNotes: ["Plural family PDS—quote exact NLGI row", "Synthetic blend is not full synthetic"],
  }),
  freezeGreaseRow({
    id: "grease-canonical-ultra-tac-synthetic-blend-ep00",
    productName: "KLONDIKE Ultra Tac Synthetic Blend EP-00 Grease",
    aliases: ["ultra tac synthetic blend ep 00", "ultra tac ep-00 blend"],
    category: "greases",
    greaseFamily: "Ultra Tac synthetic blend EP",
    thickenerType: "lithium complex",
    baseOilType: "synthetic blend",
    solidLubricants: [],
    nlgiGrades: ["NLGI 00"],
    productPositioning: "Semi-fluid NLGI 00 synthetic blend EP for central lube in extreme cold (−45°C to 20°C indexed).",
    whatItIs:
      "KLONDIKE Ultra Tac Synthetic Blend EP-00 is NLGI 00 lithium complex synthetic blend grease for centralized systems with pumpability-first cold band per PDS.",
    whyItWins:
      "Indexed −45°C to 20°C operating range and 160 cSt base oil support winter autolube when NLGI 00 blend is OEM-approved—not NLGI 2 summer carryover.",
    pdsProofPoints: [
      "NLGI 00; lithium complex; synthetic blend; operating range −45°C to 20°C.",
      "Dropping point 218°C; base oil 160 cSt; EP protection; low-temperature pumpability.",
    ],
    applications: ["Centralized lubrication requiring NLGI 00 synthetic blend EP"],
    industries: ["Northern trucking autolube", "Municipal snow fleets", "Mining cold central lube"],
    equipmentTargets: ["NLGI 00 reservoirs and pumps per OEM"],
    operatingConditions: ["Tight 20°C upper band on index—confirm hot-season SKU"],
    customerPainSignals: ["Autolube alarms after deep freeze with wrong NLGI in header"],
    repTalkTrack: [
      "Compare −45°C band to Syn Tac EP-00 PAO when OEM allows either.",
      "Do not post NLGI 00 at general zerks.",
    ],
    productSpotlightAngle: "Synthetic blend NLGI 00 for cold central lube.",
    categorySpotlightRole: "Blend semi-fluid autolube tier vs Syn Tac PAO 00.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet", "mining_aggregate"],
    doNotConfuseWith: ["NOT Syn Tac EP-00 PAO without OEM review", "NOT NLGI 2 chassis greases"],
    pdsFileHint: "Greases PDS/KLONDIKE Ultra Tac Synthetic Blend EP-00 Grease PDS.pdf",
    pdsUrl: "/pds/Grease PDS/KLONDIKE Ultra Tac Synthetic Blend EP-00 Grease PDS.pdf",
    pdsMapKey: "Ultra Tac Synthetic Blend EP-00",
    productNumbers: [],
    cautionNotes: ["Upper temperature cap 20°C on index", "Reservoir purge per OEM before thickener change"],
  }),
];

/** @type {Readonly<{ version: number, category: "greases", products: readonly GreaseCanonicalProductIntelligence[] }>} */
export const GREASE_CANONICAL_PRODUCT_INTELLIGENCE = Object.freeze({
  version: GREASE_CANONICAL_PRODUCT_INTELLIGENCE_VERSION,
  category: "greases",
  products: Object.freeze(GREASE_CANONICAL_PRODUCT_ROWS),
});

/**
 * @returns {readonly GreaseCanonicalProductIntelligence[]}
 */
export function listGreaseCanonicalProductIntelligence() {
  return GREASE_CANONICAL_PRODUCT_INTELLIGENCE.products;
}

/**
 * @param {unknown} id
 * @returns {GreaseCanonicalProductIntelligence | null}
 */
export function getGreaseCanonicalProductIntelligenceById(id) {
  const key = String(id ?? "").trim();
  if (!key) return null;
  return GREASE_CANONICAL_PRODUCT_INTELLIGENCE.products.find((p) => p.id === key) || null;
}

/**
 * @param {unknown} pdsMapKey
 * @returns {GreaseCanonicalProductIntelligence | null}
 */
export function getGreaseCanonicalProductIntelligenceByPdsKey(pdsMapKey) {
  const key = String(pdsMapKey ?? "").trim();
  if (!key) return null;
  return GREASE_CANONICAL_PRODUCT_INTELLIGENCE.products.find((p) => p.pdsMapKey === key) || null;
}
