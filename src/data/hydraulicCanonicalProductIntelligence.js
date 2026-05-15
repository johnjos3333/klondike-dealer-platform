/**
 * Canonical KLONDIKE hydraulic / tractor / turbine fluid intelligence (deterministic source text).
 * Grounded on indexed `pdsMap.js` rows and `hydraulicFluidPdsSpotlightMap.js` hierarchy.
 * Not wired to UI in this module.
 */

/** @type {number} */
export const HYDRAULIC_CANONICAL_PRODUCT_INTELLIGENCE_VERSION = 1;

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   aliases: string[],
 *   category: "hydraulic_fluids",
 *   hierarchyPosition: string,
 *   positioningTier: string,
 *   spotlightProductId: string,
 *   whatItIs: string,
 *   whyItWins: string,
 *   operatingConditions: string[],
 *   troubleshootingAssociations: string[],
 *   customerPainSignals: string[],
 *   applications: string[],
 *   equipmentTargets: string[],
 *   industries: string[],
 *   productSpotlightAngle: string,
 *   categorySpotlightRole: string,
 *   repTalkTrack: string[],
 *   doNotConfuseWith: string[],
 *   proofPoints: string[],
 *   oemSpecPositioning: string[],
 *   coldStartPositioning: string,
 *   chatterSuppressionPositioning: string,
 *   contaminationCavitationLogic: string[],
 *   pdsFileHint: string,
 *   pdsUrl: string,
 *   pdsMapKey: string,
 *   cautionNotes: string[],
 * }} HydraulicCanonicalProductIntelligence
 */

/** @param {HydraulicCanonicalProductIntelligence} row */
function freezeHydraulicRow(row) {
  return Object.freeze({
    ...row,
    aliases: Object.freeze([...row.aliases]),
    operatingConditions: Object.freeze([...row.operatingConditions]),
    troubleshootingAssociations: Object.freeze([...row.troubleshootingAssociations]),
    customerPainSignals: Object.freeze([...row.customerPainSignals]),
    applications: Object.freeze([...row.applications]),
    equipmentTargets: Object.freeze([...row.equipmentTargets]),
    industries: Object.freeze([...row.industries]),
    repTalkTrack: Object.freeze([...row.repTalkTrack]),
    doNotConfuseWith: Object.freeze([...row.doNotConfuseWith]),
    proofPoints: Object.freeze([...row.proofPoints]),
    oemSpecPositioning: Object.freeze([...row.oemSpecPositioning]),
    contaminationCavitationLogic: Object.freeze([...row.contaminationCavitationLogic]),
    cautionNotes: Object.freeze([...row.cautionNotes]),
  });
}

/** @type {HydraulicCanonicalProductIntelligence[]} */
const HYDRAULIC_CANONICAL_PRODUCT_ROWS = [
  freezeHydraulicRow({
    id: "hydr-canonical-commercial-aw",
    productName: "KLONDIKE Commercial AW Hydraulic Fluids",
    aliases: ["commercial aw", "klondike commercial aw", "aw commercial formula", "professional series aw"],
    category: "hydraulic_fluids",
    hierarchyPosition:
      "professional_series — entry anti-wear hydraulic (official product name includes Commercial; dealer-facing tier is Professional Series, not “commercial” as a marketing label)",
    positioningTier: "professional",
    spotlightProductId: "hydr-pds-aw-commercial",
    whatItIs:
      "Indexed HM anti-wear hydraulic fluid for industrial and mobile circuits where ASTM D6158 HM, DIN 51524 (1,2), and ISO 11158 HM apply—entry **Professional Series** AW row on the PDS map, not HVLP or tractor UTTO chemistry.",
    whyItWins:
      "Defensible entry hydraulic tier with indexed ASTM/DIN/ISO HM proof, VI ~112–116, and oxidation stability 4000+ hrs on the PDS index—honest GOOD lane when pump tags do not require Advanced AW, MV HVLP, or XVI.",
    operatingConditions: [
      "ISO 22 / 32 / 46 / 68 ladder per indexed PDS map row.",
      "VI ~112–116; oxidation stability 4000+ hrs; shear-stable HM formulation on index.",
      "High-pressure commercial formula language on PDS—match ISO VG to pump nameplate before bulk fill.",
    ],
    troubleshootingAssociations: ["hydraulicSluggishness", "contamination", "cavitation"],
    customerPainSignals: [
      "Counter staff calling the tier “commercial” instead of **Professional Series** at the rack.",
      "ISO grade drift between seasons without documenting pump tag requirements.",
      "Rush top-off with wrong VG or zinc policy versus what the circuit allows.",
    ],
    applications: [
      "Industrial and mobile HM anti-wear hydraulic systems per ASTM D6158 HM and ISO 11158 HM on PDS.",
      "Entry **Professional Series** programs where DIN 51524 (1,2) and Denison HF family are not required on the tag.",
    ],
    equipmentTargets: [
      "Standard piston and gear pumps in ISO 22–68 circuits per PDS ladder.",
      "Rental and municipal fleets needing indexed HM AW with published oxidation hours.",
    ],
    industries: ["Construction", "Municipal fleet", "Agriculture (value HM AW where OEM allows)", "Manufacturing"],
    productSpotlightAngle:
      "**Professional Series** anti-wear hydraulic with indexed ASTM/DIN/ISO HM proof—product name retains Commercial; never market “Commercial” as the customer-facing tier label.",
    categorySpotlightRole:
      "Anchor **Professional Series Hydraulic Protection** with Enviro AW and Red AW as companion zinc-free / leak-ID rows in the same category spotlight—not interchangeable chemistry.",
    repTalkTrack: [
      "Post ISO VG and **Professional Series** wording from the PDS; never use “Commercial” as the customer-facing tier label.",
      "Read the pump tag: HM AW is not UTF, wet brake, or HVLP unless OEM explicitly allows.",
      "When analysis shows oxidation margin loss at the same ISO, discuss Advanced AW on the indexed next tier—not habit.",
    ],
    doNotConfuseWith: [
      "KLONDIKE AW Advanced Formula Hydraulic Fluids (8000+ hr oxidation, broader DIN 51524 (1,2,3)) — BETTER tier.",
      "KLONDIKE Multi-Viscosity AW Hydraulic Fluids (HVLP / wide pour) — not a straight ISO substitute.",
      "Universal Tractor Fluid family — UTTO / wet brake category, not HM AW.",
    ],
    proofPoints: [
      "ASTM D6158 HM; DIN 51524 (1,2); ISO 11158 HM; ISO 22/32/46/68 on PDS index.",
      "VI ~112–116; oxidation stability 4000+ hrs; anti-wear additive system per indexed summary.",
    ],
    oemSpecPositioning: [
      "Match ASTM D6158 HM and ISO 11158 HM class to pump nameplate before quoting.",
      "Confirm Denison HF family only when tag or OEM bulletin requires it—Commercial row indexes DIN 51524 (1,2).",
    ],
    coldStartPositioning: "",
    chatterSuppressionPositioning: "",
    contaminationCavitationLogic: [
      "Treat unplanned water or dirt ingress as contamination first—HM AW does not fix mechanical inlet leaks or wrong VG.",
      "Sluggish response may be viscosity, contamination, or aeration—confirm in-service fluid and suction line before up-tiering product.",
    ],
    pdsFileHint: "Hydraulic Fluids PDS/KLONDIKE AW Commercial Formula Hydraulic Fluids PDS.pdf",
    pdsUrl: "/pds/Hydraulic Fluids PDS/KLONDIKE AW Commercial Formula Hydraulic Fluids PDS.pdf",
    pdsMapKey: "AW Hydraulic Commercial",
    cautionNotes: [
      "Official product name retains “Commercial”; marketing tier is **Professional Series** only.",
      "Not interchangeable with HVLP, tractor UTTO, or turbine ASTM D4304 rows without OEM.",
    ],
  }),
  freezeHydraulicRow({
    id: "hydr-canonical-aw-advanced",
    productName: "KLONDIKE AW Advanced Formula Hydraulic Fluids",
    aliases: ["aw advanced", "aw advanced formula", "advanced aw hydraulic", "klondike aw advanced"],
    category: "hydraulic_fluids",
    hierarchyPosition: "advanced — hydraulic reliability (BETTER tier above Professional Series Commercial AW)",
    positioningTier: "advanced",
    spotlightProductId: "hydr-pds-aw-advanced",
    whatItIs:
      "Demanding industrial and mobile anti-wear hydraulic fluid indexed to ASTM D6158, DIN 51524 (1,2,3), and Denison HF-0/1/2 with higher oxidation reserve than entry Commercial AW on the PDS map.",
    whyItWins:
      "8000+ hr oxidation stability, VI ~120–125, and water separation performance on the index—BETTER hydraulic tier when UOA, heat, or OEM severe service notes justify more reserve than Professional Series AW.",
    operatingConditions: [
      "ISO 22–100 ladder per PDS index.",
      "VI ~120–125; oxidation stability 8000+ hrs; water separation called out on index.",
      "Zinc anti-wear formulation—still not ashless Enviro AW or tractor UTTO.",
    ],
    troubleshootingAssociations: ["hydraulicSluggishness", "contamination", "cavitation"],
    customerPainSignals: [
      "Oxidation varnish before external leaks show on long-life mobile hydraulics.",
      "Water ingression without demulsibility discipline on AW programs.",
      "Running Commercial AW when analysis already shows oxidation margin loss at the same ISO VG.",
    ],
    applications: [
      "High-duty presses, excavators, and mobile rigs referencing Denison HF-0/1/2 on PDS.",
      "Fleet upgrades from **Professional Series** AW when reliability team documents oxidation or water trends.",
    ],
    equipmentTargets: [
      "High-duty mobile and industrial hydraulic systems per indexed ASTM/DIN rows.",
      "Circuits where DIN 51524 Part 3 HVLP is not required but severe AW oxidation reserve is.",
    ],
    industries: ["Construction", "Mining and aggregate", "Manufacturing", "Trucking fleet"],
    productSpotlightAngle:
      "Advanced AW with 8000+ hr oxidation and broader DIN 51524 coverage—promote from Commercial AW when PDS hours and Denison family match the tag.",
    categorySpotlightRole:
      "Lead product in **Advanced Hydraulic Reliability** with MV AW, Bio AW, and SAE 10W as companions for HVLP, bio HM, and Cat/Eaton SAE 10W programs.",
    repTalkTrack: [
      "Attach 8000+ hr oxidation line from Advanced AW PDS to the reliability justification memo.",
      "Promote from **Professional Series** when UOA or OEM severe service supports higher oxidation reserve—not brand habit alone.",
      "Zinc AW chemistry—confirm silver-bearing or food circuits separately before bulk conversion.",
    ],
    doNotConfuseWith: [
      "KLONDIKE Commercial AW Hydraulic Fluids — 4000+ hr oxidation tier; Professional Series entry.",
      "KLONDIKE ENVIRO Inherently Biodegradable AW — zinc-free ashless, not Advanced zinc AW.",
      "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid — HVLP ISO 46 extreme wide-band, not HM AW.",
    ],
    proofPoints: [
      "ASTM D6158; DIN 51524 (1,2,3); Denison HF-0/1/2; ISO 22–100 on PDS index.",
      "VI ~120–125; oxidation stability 8000+ hrs; anti-wear zinc formulation per index.",
    ],
    oemSpecPositioning: [
      "Align Denison HF-0/1/2 and DIN 51524 parts to pump OEM sheet before quoting.",
      "Use water separation and oxidation bullets from PDS when defending upgrade from Commercial AW.",
    ],
    coldStartPositioning: "",
    chatterSuppressionPositioning: "",
    contaminationCavitationLogic: [
      "Water separation on PDS supports demulsibility discipline—still requires drain of free water and fix of ingress.",
      "Do not use higher oxidation reserve to excuse particle contamination or aeration from inlet leaks.",
    ],
    pdsFileHint: "Hydraulic Fluids PDS/KLONDIKE AW Advanced Formula Hydraulic Fluids PDS.pdf",
    pdsUrl: "/pds/Hydraulic Fluids PDS/KLONDIKE AW Advanced Formula Hydraulic Fluids PDS.pdf",
    pdsMapKey: "AW Hydraulic Advanced",
    cautionNotes: [
      "Still zinc AW—confirm food-grade, UTF, and ashless requirements on separate PDS rows.",
      "HVLP approval is not automatic—read pump chart for HV vs HM class.",
    ],
  }),
  freezeHydraulicRow({
    id: "hydr-canonical-mv-aw",
    productName: "KLONDIKE Multi-Viscosity AW Hydraulic Fluids",
    aliases: ["mv aw", "multi viscosity aw", "multi-viscosity aw", "hvlp aw", "klondike mv aw"],
    category: "hydraulic_fluids",
    hierarchyPosition: "advanced — multi-viscosity HVLP wide-temperature AW (seasonal simplification tier)",
    positioningTier: "advanced",
    spotlightProductId: "hydr-pds-mv-aw",
    whatItIs:
      "Multi-viscosity anti-wear hydraulic fluid indexed as ASTM D6158 HV and DIN 51524 Part 3 HVLP for wide ambient operation—reduces seasonal ISO changes when OEM allows HVLP on the pump chart.",
    whyItWins:
      "Pour as low as −60 °C and VI ~140–150 on the PDS index with 6000+ hr oxidation—simplifies yards that juggle summer/winter ISO drums when HVLP is approved.",
    operatingConditions: [
      "ISO 15/22/36/46/68 HV grades per index.",
      "ASTM D6158 HV; DIN 51524 Part 3 HVLP; ISO 11158 HV on PDS map.",
      "Pour as low as −60 °C; oxidation stability 6000+ hrs indexed.",
    ],
    troubleshootingAssociations: ["hydraulicSluggishness", "cavitation", "contamination"],
    customerPainSignals: [
      "Double inventory summer vs winter ISO when one HVLP program could qualify per OEM.",
      "Cold-morning sluggishness when straight ISO is too thick for ambient start conditions.",
      "Assuming any AW drum covers wide temperature without HVLP on the nameplate.",
    ],
    applications: [
      "Mobile equipment with wide ambient swing on one approved HVLP ISO program.",
      "Construction and municipal fleets modeling min/max temps against MV pour columns on PDS.",
    ],
    equipmentTargets: [
      "Excavators, loaders, and municipal hydraulics where HVLP multi-viscosity is OEM-approved.",
      "Circuits referencing DIN 51524 Part 3 HVLP rather than straight HM ISO only.",
    ],
    industries: ["Construction", "Mining and aggregate", "Trucking fleet", "Municipal fleet"],
    productSpotlightAngle:
      "MV HVLP AW with extreme pour and 6000+ hr oxidation—seasonal simplification when pump tag allows HVLP, not a silent substitute for XVI extreme ISO 46.",
    categorySpotlightRole:
      "HVLP wide-temperature anchor inside **Advanced Hydraulic Reliability** alongside Advanced AW and SAE 10W.",
    repTalkTrack: [
      "Plot site temperature histogram next to MV PDS pour points before proposing HVLP conversion.",
      "Confirm HVLP shear stability meets pump OEM limits—read tag, not drum habit.",
      "Arctic companion: pair with Arctic Tractor or XVI when tractor and hydraulic loops split by category.",
    ],
    doNotConfuseWith: [
      "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid — extreme HVLP ISO 46 with VI ~210 and published operating band.",
      "KLONDIKE Commercial AW — straight HM ISO, not HVLP multi-viscosity.",
      "KLONDIKE ENVIRO MV — zinc-free biodegradable HVLP; different chemistry class.",
    ],
    proofPoints: [
      "ASTM D6158 HV; DIN 51524 Part 3 HVLP; ISO 11158 HV; ISO 15–68 on index.",
      "VI ~140–150; pour as low as −60 °C; oxidation 6000+ hrs per PDS map.",
    ],
    oemSpecPositioning: [
      "HVLP class must appear on OEM pump chart—do not infer from marketing “multi-viscosity” alone.",
      "Denison HF family and DIN Part 3 references on PDS—match to severe mobile OEM lists when cited.",
    ],
    coldStartPositioning:
      "Indexed pour as low as −60 °C supports cold-morning pumpability when HVLP is approved—compare site lows to MV pour column, not to tractor Brookfield programs.",
    chatterSuppressionPositioning: "",
    contaminationCavitationLogic: [
      "Cold-start cavitation risk if viscosity is too high for inlet design—MV pour data supports planning, not mechanical fix of restricted suction.",
      "Wide-temperature HVLP does not replace water contamination control or filter discipline.",
    ],
    pdsFileHint: "Hydraulic Fluids PDS/KLONDIKE Multi-Viscosity AW Hydraulic Fluids PDS.pdf",
    pdsUrl: "/pds/Hydraulic Fluids PDS/KLONDIKE Multi-Viscosity AW Hydraulic Fluids PDS.pdf",
    pdsMapKey: "MV AW Hydraulic",
    cautionNotes: [
      "HVLP shear stability must meet pump OEM limits—confirm on live PDS and nameplate.",
      "Not UTTO or wet-brake fluid—category separation at the counter.",
    ],
  }),
  freezeHydraulicRow({
    id: "hydr-canonical-xvi-all-season",
    productName: "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid",
    aliases: [
      "xvi",
      "xvi all season",
      "xvi hydraulic",
      "xvi all season blend extreme",
      "xvi aw synthetic technology",
    ],
    category: "hydraulic_fluids",
    hierarchyPosition: "extreme — wide-temperature HVLP ISO 46 all-season hydraulic (flagship hydraulic wide-band tier)",
    positioningTier: "extreme",
    spotlightProductId: "hydr-pds-xvi",
    whatItIs:
      "High-performance all-season blend extreme hydraulic fluid indexed as ASTM D6158 HV, DIN 51524 Part 3 HVLP, ISO 11158 HV, ISO 46—with VI ~210, pour −48 °C, and operating range −40 °C to 190 °C language on the PDS map.",
    whyItWins:
      "Extreme HVLP ISO 46 with very high VI and published wide operating band on the index—first-shift responsiveness in cold and pump confidence in heat when OEM allows HVLP, not fair-weather straight ISO habits.",
    operatingConditions: [
      "ISO 46 HVLP primary row on index.",
      "VI ~210; pour −48 °C; operating range −40 °C to 190 °C per PDS map.",
      "High shear stability called out on indexed summary.",
    ],
    troubleshootingAssociations: ["hydraulicSluggishness", "cavitation", "contamination"],
    customerPainSignals: [
      "Morning sluggish booms after cold nights, then hot afternoon circuits that punish shear.",
      "Seasonal ISO juggling that never matched site temperature histograms.",
      "Buyers who watched “all season” mineral fail under load without VI and pour on the sheet.",
    ],
    applications: [
      "Mobile mining and construction hydraulics with brutal temperature swings when HVLP ISO 46 is approved.",
      "Plant presses, stackers, and ISO 46 HV circuits needing indexed wide operating band.",
    ],
    equipmentTargets: [
      "Shovels, stackers, and presses referencing HVLP ISO 46 per pump chart.",
      "Circuits where straight mineral ISO cannot cover documented cold start and hot afternoon load.",
    ],
    industries: ["Mining and aggregate", "Construction", "Manufacturing"],
    productSpotlightAngle:
      "XVI extreme all-season HVLP: VI ~210, pour −48 °C, and PDS operating band for wide-swing duty—separate from entry AW and from tractor UTF.",
    categorySpotlightRole:
      "Lead **Extreme Temperature Hydraulic Performance** with Enviro MV, bio HEES/HFDU/EAL as environmental and fire-risk companions—not substitutes for XVI on standard mobile HVLP.",
    repTalkTrack: [
      "Lay site min/max temps on the PDS operating range and pour columns before drum count.",
      "Validate HVLP and ISO 46 on the pump nameplate—XVI is not UTF or wet-brake chemistry.",
      "Sell extreme wide-band duty, not a silent Professional Series AW substitute.",
    ],
    doNotConfuseWith: [
      "KLONDIKE Commercial AW / AW Advanced — HM AW tiers, not extreme HVLP ISO 46.",
      "KLONDIKE Multi-Viscosity AW — HVLP multi-grade ladder, not XVI VI ~210 ISO 46 extreme row.",
      "Universal Tractor Fluid family — UTTO / wet brake; different category and risk.",
    ],
    proofPoints: [
      "ASTM D6158 HV; DIN 51524 Part 3 HVLP; ISO 11158 HV; ISO 46 on PDS index.",
      "VI ~210; pour −48 °C; operating range −40 °C to 190 °C; high shear stability per map.",
    ],
    oemSpecPositioning: [
      "Match ASTM HV / DIN Part 3 HVLP and ISO 46 to pump OEM chart before quoting XVI.",
      "Use published operating band from PDS when overlaying site engineering sign-off—do not widen beyond indexed text.",
    ],
    coldStartPositioning:
      "Pour −48 °C and VI ~210 on index support first-shift hydraulic response in cold—pair with site lows; not a tractor Brookfield UTTO story.",
    chatterSuppressionPositioning: "",
    contaminationCavitationLogic: [
      "Wide temperature band does not fix aeration from inlet leaks—confirm suction and reservoir design if foaming persists.",
      "Heat-related sluggishness may still be contamination or wrong class—XVI is not permission to skip analysis.",
    ],
    pdsFileHint: "Hydraulic Fluids PDS/KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid PDS.pdf",
    pdsUrl: "/pds/Hydraulic Fluids PDS/KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid PDS.pdf",
    pdsMapKey: "XVI All Season Hydraulic",
    cautionNotes: [
      "Premium extreme tier—do not substitute for Professional Series AW without OEM HVLP / ISO 46 approval.",
      "Do not invent wider temperature spans than the current PDS publishes.",
    ],
  }),
  freezeHydraulicRow({
    id: "hydr-canonical-sae-10w-hd-hydraulic",
    productName: "KLONDIKE SAE 10W Heavy Duty Hydraulic Oil",
    aliases: ["sae 10w hydraulic", "10w hydraulic", "hdyo advanced 10", "cat hydo 10w", "klondike 10w hydraulic"],
    category: "hydraulic_fluids",
    hierarchyPosition: "advanced — SAE 10W high-zinc heavy-duty hydraulic (OEM-named viscosity class)",
    positioningTier: "advanced",
    spotlightProductId: "hydr-pds-sae-10w-hydro",
    whatItIs:
      "Heavy-duty hydraulic oil indexed to SAE 10W viscosity with high zinc anti-wear (~0.1% zinc on PDS map) for equipment specifying SAE 10W—not generic ISO VG AW substitution.",
    whyItWins:
      "Caterpillar HYDO Advanced 10 and Eaton Vickers 35VQ25 references on the PDS index keep yellow-iron and specified SAE 10W programs on-document versus ISO AW habit.",
    operatingConditions: [
      "SAE 10W; VI ~114; pour −40 °C; TBN ~10 on indexed summary.",
      "High zinc anti-wear protection per PDS map wording.",
      "All-season heavy-duty hydraulic language on index—still SAE 10W class, not UTF.",
    ],
    troubleshootingAssociations: ["hydraulicSluggishness", "contamination", "cavitation"],
    customerPainSignals: [
      "Using ISO AW where SAE 10W zinc program is mandated on the nameplate.",
      "Cold-start drag when wrong viscosity class is in the reservoir.",
      "Mixing low-zinc ashless fluid into high-zinc 10W programs without OEM review.",
    ],
    applications: [
      "Caterpillar and heavy mobile hydraulics referencing SAE 10W on OEM literature indexed on PDS.",
      "Construction and mining fleets with Eaton Vickers 35VQ25 approval paths on the sheet.",
    ],
    equipmentTargets: [
      "Cat HYDO Advanced 10 applications per PDS index.",
      "Mobile hydraulics specifying SAE 10W rather than ISO VG HM AW.",
    ],
    industries: ["Construction", "Mining and aggregate", "Municipal fleet"],
    productSpotlightAngle:
      "SAE 10W with Caterpillar HYDO Advanced 10 and Eaton Vickers lines on PDS—read nameplate for SAE 10W vs ISO VG before bulk.",
    categorySpotlightRole:
      "OEM SAE 10W specialist inside **Advanced Hydraulic Reliability**—parallel to Advanced AW and MV, not a downgrade from XVI.",
    repTalkTrack: [
      "Highlight Caterpillar HYDO Advanced 10 line from PDS on every 10W bulk delivery ticket.",
      "Read nameplate for SAE 10W vs ISO VG—generic AW is a silent mismatch on yellow iron.",
      "High zinc—not for wet silver food circuits; segregate drums and guns.",
    ],
    doNotConfuseWith: [
      "KLONDIKE AW Advanced / Commercial AW — ISO VG HM/HV programs, not SAE 10W OEM class.",
      "CK-4 or UTF products — engine or tractor sump categories.",
      "KLONDIKE ENVIRO AW — zinc-free; not SAE 10W high-zinc substitute.",
    ],
    proofPoints: [
      "Caterpillar HYDO Advanced 10; Eaton Vickers 35VQ25 on PDS index.",
      "SAE 10W; VI ~114; pour −40 °C; zinc ~0.1%; TBN ~10 per map.",
    ],
    oemSpecPositioning: [
      "OEM must call SAE 10W or list Caterpillar HYDO Advanced 10 / Eaton Vickers 35VQ25 per PDS.",
      "Do not quote ISO VG AW interchange without written OEM allowance.",
    ],
    coldStartPositioning:
      "Pour −40 °C on index supports cold-season planning for SAE 10W programs—distinct from UTF Brookfield tractor metrics.",
    chatterSuppressionPositioning: "",
    contaminationCavitationLogic: [
      "Zinc AW does not correct water contamination—drain free water and fix ingress before blaming product.",
      "Cavitation from inlet restriction still mechanical—confirm suction line and fluid level at cold start.",
    ],
    pdsFileHint: "Hydraulic Fluids PDS/KLONDIKE SAE 10W Heavy Duty Hydraulic Oil PDS.pdf",
    pdsUrl: "/pds/Hydraulic Fluids PDS/KLONDIKE SAE 10W Heavy Duty Hydraulic Oil PDS.pdf",
    pdsMapKey: "SAE 10W Hydraulic",
    cautionNotes: [
      "High zinc—not for food or silver-bearing programs without OEM.",
      "SAE 10W is not UTF or wet-brake fluid.",
    ],
  }),
  freezeHydraulicRow({
    id: "hydr-canonical-universal-tractor-fluid",
    productName: "KLONDIKE Universal Tractor Fluid",
    aliases: ["utf", "universal tractor fluid", "klondike utf", "utto"],
    category: "hydraulic_fluids",
    hierarchyPosition: "tractor_wet_brake — standard UTTO common-sump (transmission, hydraulic, wet brake)",
    positioningTier: "tractor_wet_brake",
    spotlightProductId: "hydr-pds-utf",
    whatItIs:
      "Multi-purpose universal tractor fluid (UTTO) indexed for transmission, hydraulic, and wet brake service with API GL-4, Allison C-4, and CNH MAT 3525/3505 on the PDS map—baseline common-sump row, not HM AW.",
    whyItWins:
      "Indexed wet brake compatibility, VI ~152, TBN ~8.5, and MAT listings give a defensible standard UTTO lane when OEM allows this row versus premium synthetic UTF or dedicated wet brake fluid.",
    operatingConditions: [
      "API GL-4; Allison C-4; CNH MAT 3525/3505 per PDS index.",
      "VI ~152; pour −42 °C; TBN ~8.5 on indexed summary.",
      "Wet brake compatibility language on PDS map.",
    ],
    troubleshootingAssociations: ["wetBrakeChatter", "hydraulicSluggishness", "contamination"],
    customerPainSignals: [
      "Wet brake chatter after wrong fluid category in the shared sump.",
      "CNH red vs John Deere green drum confusion on the same farm.",
      "Top-off with AW hydraulic instead of UTTO when history is unknown.",
    ],
    applications: [
      "General ag and utility tractors with common sump UTTO per OEM MAT or dealer program.",
      "Transmission, hydraulic, and wet brake systems when PDS wet brake compatibility applies.",
    ],
    equipmentTargets: [
      "Utility and agricultural tractors referencing CNH MAT 3525/3505 on PDS.",
      "Equipment where Allison C-4 and API GL-4 UTTO is approved—not dedicated wet brake-only fill.",
    ],
    industries: ["Agriculture", "Construction", "Municipal"],
    productSpotlightAngle:
      "Standard UTF with wet brake compatibility and MAT lines on PDS—chatter prevention starts with UTTO category discipline, not AW price.",
    categorySpotlightRole:
      "Baseline UTTO in **Tractor / Wet Brake Protection** with Red UTF, UTF Full Synthetic, and Wet Brake Fluid as upsell and OEM-specific paths.",
    repTalkTrack: [
      "Photo axle tag—confirm MAT vs John Deere program before bulk.",
      "Chatter complaints start at the pedal; ask fluid history and any AW top-off.",
      "Post MAT vs JD decision tree beside UTF drum stack.",
    ],
    doNotConfuseWith: [
      "KLONDIKE Universal Red Tractor Fluid — CNH MAT red-iron program; not John Deere J20C default.",
      "KLONDIKE Wet Brake Fluid Full Synthetic — dedicated wet brake / J20C/J20D row when OEM requires it.",
      "Any AW hydraulic — HM zinc AW is not UTTO wet-brake chemistry.",
    ],
    proofPoints: [
      "API GL-4; Allison C-4; CNH MAT 3525/3505; wet brake compatibility on PDS index.",
      "VI ~152; pour −42 °C; TBN ~8.5 per map.",
    ],
    oemSpecPositioning: [
      "Match CNH MAT 3525/3505 when axle tag is Case IH / CNH—do not assume John Deere J20.",
      "Allison C-4 and API GL-4 must align with OEM common-sump bulletin.",
    ],
    coldStartPositioning:
      "Pour −42 °C on index supports seasonal planning—extreme winter may require Arctic Tractor or UTF Full Synthetic per OEM seasonal bulletin.",
    chatterSuppressionPositioning:
      "Indexed wet brake compatibility supports friction stability in common sump—does not fix wrong category top-off or contaminated sump without flush per OEM.",
    contaminationCavitationLogic: [
      "Mixing AW hydraulic into UTF sump is a category error—flush and refill per OEM when history is unknown.",
      "Milky reservoir or water requires contamination workflow before blaming UTF tier.",
    ],
    pdsFileHint: "Tractor Fluids PDS/KLONDIKE Universal Tractor Fluid PDS.pdf",
    pdsUrl: "/pds/Tractor Fluids PDS/KLONDIKE Universal Tractor Fluid PDS.pdf",
    pdsMapKey: "Universal Tractor Fluid",
    cautionNotes: [
      "UTF is not CK-4 engine oil—never cross-use.",
      "Do not substitute for CNH red or JD green AgriMax rows without MAT/J20 match.",
    ],
  }),
  freezeHydraulicRow({
    id: "hydr-canonical-universal-red-tractor-fluid",
    productName: "KLONDIKE Universal Red Tractor Fluid",
    aliases: ["universal red tractor fluid", "red utf", "cnh utf", "red tractor fluid"],
    category: "hydraulic_fluids",
    hierarchyPosition: "tractor_wet_brake — CNH red UTTO (MAT 3525/3505)",
    positioningTier: "tractor_wet_brake",
    spotlightProductId: "hydr-pds-utf-red",
    whatItIs:
      "CNH-oriented universal red tractor fluid indexed with API GL-4, Allison C-4, CNH MAT 3525/3505, and wet brake compatibility on the PDS map—color-coded UTTO for red-iron programs.",
    whyItWins:
      "OEM-correct CNH MAT lines on the PDS keep red-case tractors on documented UTTO instead of green-drum habit or AW mis-fill that risks chatter and warranty exposure.",
    operatingConditions: [
      "API GL-4; Allison C-4; CNH MAT 3525/3505 per index.",
      "VI ~140; pour −42 °C; TBN ~9.6 on PDS map.",
      "Wet brake compatibility on indexed summary.",
    ],
    troubleshootingAssociations: ["wetBrakeChatter", "contamination"],
    customerPainSignals: [
      "Green drum on red iron warranty risk.",
      "Wet brake noise after non-MAT fluid top-off.",
      "Farm staff assuming all UTF colors interchange.",
    ],
    applications: [
      "Case IH / CNH tractors requiring MAT-listed UTTO per PDS.",
      "Common sump transmission, hydraulic, and wet brake when red program is specified.",
    ],
    equipmentTargets: ["CNH / Case IH tractors referencing MAT 3525/3505 on tag or bulletin"],
    industries: ["Agriculture", "Construction"],
    productSpotlightAngle:
      "Red UTTO with MAT 3525/3505 on PDS—match axle brand to drum color program before bulk.",
    categorySpotlightRole:
      "CNH red path inside **Tractor / Wet Brake Protection**—parallel to standard UTF and AgriMax zinc-free red trans-drive row.",
    repTalkTrack: [
      "Capture MAT 3525/3505 from Red UTF PDS on every CNH PDI checklist.",
      "Never position for John Deere J20C programs—use UTF Full Synthetic or AgriMax Green per PDS.",
      "Chatter triage: confirm red UTF history before suggesting fluid change.",
    ],
    doNotConfuseWith: [
      "KLONDIKE Universal Tractor Fluid — MAT-listed standard UTF; confirm same MAT family on tag.",
      "KLONDIKE AGRIMAX Zinc Free Trans Drive (CNH) — separate AgriMax red trans-hydraulic PDS with MAT 3544/3540.",
      "John Deere J20C AgriMax Green row — not CNH red program.",
    ],
    proofPoints: [
      "CNH MAT 3525/3505; API GL-4; Allison C-4; wet brake compatibility on index.",
      "VI ~140; pour −42 °C; TBN ~9.6 per PDS map.",
    ],
    oemSpecPositioning: [
      "OEM must reference CNH MAT 3525/3505 or allow indexed red UTTO per bulletin.",
      "Do not cross-post John Deere J20C approval from UTF Full Synthetic PDS onto red iron without OEM line.",
    ],
    coldStartPositioning:
      "Pour −42 °C on index—winter extremes may still require Arctic Tractor Fluid when OEM seasonal chart calls J20D arctic row.",
    chatterSuppressionPositioning:
      "Wet brake compatibility on PDS supports CNH friction packs when correct red UTTO is in service—wrong color/category still requires flush.",
    contaminationCavitationLogic: [
      "Zinc or AW top-off into MAT UTTO sump can destabilize friction—treat as contamination/category error.",
    ],
    pdsFileHint: "Tractor Fluids PDS/KLONDIKE Universal Red Tractor Fluid PDS.pdf",
    pdsUrl: "/pds/Tractor Fluids PDS/KLONDIKE Universal Red Tractor Fluid PDS.pdf",
    pdsMapKey: "Universal Red Tractor Fluid",
    cautionNotes: [
      "Do not use for John Deere J20C programs without OEM line allowing this SKU.",
      "AgriMax Green vs Red are different OEM families—never cross-post at counter.",
    ],
  }),
  freezeHydraulicRow({
    id: "hydr-canonical-arctic-tractor-fluid",
    productName: "KLONDIKE Arctic Tractor Fluid Synthetic Blend",
    aliases: ["arctic tractor fluid", "arctic utf", "j20d arctic", "klondike arctic tractor"],
    category: "hydraulic_fluids",
    hierarchyPosition: "arctic — winter UTTO synthetic blend (J20D cold-service tier)",
    positioningTier: "arctic",
    spotlightProductId: "hydr-pds-arctic-tractor",
    whatItIs:
      "Synthetic blend arctic tractor fluid indexed for extreme cold common-sump service with John Deere J20D, API GL-4, Allison C-4, and wet brake compatibility on the PDS map.",
    whyItWins:
      "Pour −54 °C and Brookfield @ −40 °C 13,000 cP on the index document winter UTTO when OEM allows Arctic variant—reduces slow PTO and pedal drag versus summer UTF left in the tank.",
    operatingConditions: [
      "Pour −54 °C; Brookfield @ −40 °C 13,000 cP; VI ~191 on PDS index.",
      "API GL-4; Allison C-4; John Deere J20D; wet brake compatibility per map.",
      "High oxidation stability language on indexed summary.",
    ],
    troubleshootingAssociations: ["wetBrakeChatter", "hydraulicSluggishness", "cavitation"],
    customerPainSignals: [
      "Summer UTF left in for northern winter planting.",
      "Slow hydraulics and PTO engagement after cold nights.",
      "Undersized cold margins on shared municipal fleets.",
    ],
    applications: [
      "Winter tractor and off-road fleets when OEM J20D arctic program is specified on PDS.",
      "Seasonal bulk switch from standard UTF when bulletin allows Arctic synthetic blend row.",
    ],
    equipmentTargets: [
      "Tractors and UTTO common-sump equipment in arctic and sub-arctic seasonal programs.",
      "Fleets logging lowest site temperature against Brookfield column on PDS.",
    ],
    industries: ["Agriculture", "Construction", "Municipal", "Mining and aggregate"],
    productSpotlightAngle:
      "Arctic UTTO with J20D and Brookfield cold data on PDS—seasonal switch calendar, not guesswork.",
    categorySpotlightRole:
      "Lead **Arctic Off-Road Performance** with UTF Full Synthetic, Wet Brake, MV AW, and XVI as companion cold-data rows for split hydraulic vs tractor loops.",
    repTalkTrack: [
      "Post J20D and Brookfield lines from Arctic Tractor PDS on the winter bulk tank.",
      "Log lowest site temperature before approving winter bulk—compare to Brookfield @ −40 °C on sheet.",
      "Arctic tractor fluid is not automatic transmission fluid—keep sump labels explicit.",
    ],
    doNotConfuseWith: [
      "KLONDIKE Universal Tractor Fluid — summer/baseline UTTO; seasonal OEM guidance required.",
      "KLONDIKE Universal Tractor Fluid Full Synthetic — J20C/J20D premium synthetic UTF row.",
      "ATF or hydraulic AW — different categories.",
    ],
    proofPoints: [
      "John Deere J20D; API GL-4; Allison C-4; wet brake compatibility on index.",
      "Pour −54 °C; Brookfield @ −40 °C 13,000 cP; VI ~191 per PDS map.",
    ],
    oemSpecPositioning: [
      "OEM must allow J20D arctic / Arctic Tractor Fluid row per seasonal bulletin.",
      "Allison C-4 and API GL-4 still required on tag alongside J20D.",
    ],
    coldStartPositioning:
      "Brookfield @ −40 °C 13,000 cP and pour −54 °C on PDS are the field cold-start proof points for winter UTTO programs.",
    chatterSuppressionPositioning:
      "Wet brake compatibility on PDS supports winter friction when correct arctic UTTO is in service—wrong summer UTF still risks chatter until flush.",
    contaminationCavitationLogic: [
      "Cold thick fluid plus aeration can mimic cavitation—confirm fluid category and level before blaming pump.",
      "Do not top-off with AW hydraulic in arctic season—category contamination path.",
    ],
    pdsFileHint: "Tractor Fluids PDS/KLONDIKE Arctic Tractor Fluid Synthetic Blend PDS.pdf",
    pdsUrl: "/pds/Tractor Fluids PDS/KLONDIKE Arctic Tractor Fluid Synthetic Blend PDS.pdf",
    pdsMapKey: "Arctic Tractor Fluid Synthetic Blend",
    cautionNotes: [
      "Not interchangeable with summer UTF without OEM seasonal guidance.",
      "Not ATF—label common sump explicitly.",
    ],
  }),
  freezeHydraulicRow({
    id: "hydr-canonical-wet-brake-fluid-full-synthetic",
    productName: "KLONDIKE Wet Brake Fluid Full Synthetic",
    aliases: [
      "wet brake fluid",
      "wet brake fluid full synthetic",
      "full synthetic wet brake lubricant",
      "klondike wet brake",
    ],
    category: "hydraulic_fluids",
    hierarchyPosition: "tractor_wet_brake — dedicated full-synthetic wet brake / J20C-J20D multi-functional",
    positioningTier: "tractor_wet_brake",
    spotlightProductId: "hydr-pds-wet-brake-fluid",
    whatItIs:
      "Full synthetic wet brake and power transmission fluid indexed with John Deere J20C/J20D, API GL-4, Allison C-4, and wet brake performance language on the PDS map—distinct SKU from general UTF when OEM calls dedicated wet brake product.",
    whyItWins:
      "VI ~167, pour −51 °C, and Brookfield @ −35 °C 11,500 cP on the index support friction control and cold engagement when OEM specifies this row instead of commodity UTF.",
    operatingConditions: [
      "API GL-4; Allison C-4; John Deere J20C/J20D per PDS index.",
      "VI ~167; pour −51 °C; Brookfield @ −35 °C 11,500 cP on map.",
      "Full synthetic formulation; wet brake performance called out on index.",
    ],
    troubleshootingAssociations: ["wetBrakeChatter", "contamination"],
    customerPainSignals: [
      "Confusion between UTF drums and wet-brake-only service.",
      "Chatter after generic hydraulic top-off in wet brake circuit.",
      "Premium iron without OEM allowance for dedicated wet brake SKU.",
    ],
    applications: [
      "Heavy wet brake systems when OEM bulletin lists dedicated wet brake / J20C/J20D fluid per PDS.",
      "Service bays separating wet brake fills from general UTF bulk when friction curve matters.",
    ],
    equipmentTargets: [
      "Tractors and off-road equipment specifying dedicated wet brake fluid on PDS J20 lines.",
      "Systems where UTF and wet brake SKUs are intentionally split by OEM.",
    ],
    industries: ["Agriculture", "Construction"],
    productSpotlightAngle:
      "Dedicated wet brake synthetic with J20C/J20D and Brookfield on PDS—friction curve is not generic UTF marketing.",
    categorySpotlightRole:
      "Targeted wet brake SKU in **Tractor / Wet Brake Protection**—pair with UTF Full Synthetic when OEM allows synthetic common sump instead.",
    repTalkTrack: [
      "File wet brake OEM bulletin next to Wet Brake Fluid PDS excerpt in the service bay.",
      "Confirm OEM calls dedicated wet brake product—not assumption from UTF drum color.",
      "Lead Brookfield @ −35 °C when operators judge first cold engagement.",
    ],
    doNotConfuseWith: [
      "KLONDIKE Universal Tractor Fluid — general UTTO; OEM may still require dedicated wet brake row.",
      "KLONDIKE Universal Tractor Fluid Full Synthetic — common-sump synthetic UTF with J20C/J20D.",
      "Hydraulic AW — never wet-brake substitute.",
    ],
    proofPoints: [
      "John Deere J20C/J20D; API GL-4; Allison C-4; wet brake performance on PDS index.",
      "VI ~167; pour −51 °C; Brookfield @ −35 °C 11,500 cP per map.",
    ],
    oemSpecPositioning: [
      "OEM must specify J20C/J20D wet brake fluid or allow indexed full synthetic wet brake row.",
      "Do not interchange with UTF without OEM line on bulletin.",
    ],
    coldStartPositioning:
      "Brookfield @ −35 °C 11,500 cP and pour −51 °C on PDS support cold-yard wet brake and transmission engagement metrics.",
    chatterSuppressionPositioning:
      "Wet brake performance and friction language on PDS supports chatter triage when correct dedicated fluid is in service—wrong category still needs flush.",
    contaminationCavitationLogic: [
      "AW or engine oil top-off in wet brake circuit is category contamination—flush per OEM before re-fill with indexed row.",
    ],
    pdsFileHint: "Tractor Fluids PDS/KLONDIKE Wet Brake Fluid PDS.pdf",
    pdsUrl: "/pds/Tractor Fluids PDS/KLONDIKE Wet Brake Fluid PDS.pdf",
    pdsMapKey: "Wet Brake Fluid Full Synthetic",
    cautionNotes: [
      "Do not assume interchangeable with UTF without OEM PDS line.",
      "Not food-grade hydraulic—segregate from H1 inventory.",
    ],
  }),
  freezeHydraulicRow({
    id: "hydr-canonical-long-life-turbine",
    productName: "KLONDIKE Long Life Turbine Oils",
    aliases: [
      "long life turbine oil",
      "long life turbine oils",
      "turbine oil",
      "astm d4304 turbine",
    ],
    category: "hydraulic_fluids",
    hierarchyPosition: "industrial_rotating — stationary turbine / long-life circulating (ASTM D4304 Type I)",
    positioningTier: "industrial_rotating",
    spotlightProductId: "hydr-pds-long-life-turbine",
    whatItIs:
      "Long-life turbine oil indexed to ASTM D4304 Type I and DIN 51515 for steam and gas turbine systems on the PDS map—stationary rotating class, not mobile AW hydraulic.",
    whyItWins:
      "10,000+ hr oxidation stability, rust pass, and water separation language on the index support long-drain turbine loops when OEM class matches—separate bulk from AW to prevent night-shift top-off errors.",
    operatingConditions: [
      "ISO 32/46/68/100/150 grades per PDS index.",
      "VI ~100–115; oxidation stability 10,000+ hrs; rust test pass on map.",
      "Water separation performance called out on indexed summary.",
    ],
    troubleshootingAssociations: ["contamination"],
    customerPainSignals: [
      "Moisture ingress without demulsibility discipline on turbine reservoirs.",
      "Hydraulic AW mistaken for turbine sump on emergency top-off.",
      "Varnish on long-drain loops without analysis.",
    ],
    applications: [
      "Steam and gas turbine systems per ASTM D4304 Type I and DIN 51515 on PDS.",
      "Industrial power and manufacturing turbine reservoirs when OEM specifies this class.",
    ],
    equipmentTargets: [
      "Industrial steam and gas turbines referencing DIN 51515 on OEM sheet.",
      "Stationary circulating systems—not mobile excavator hydraulics.",
    ],
    industries: ["Manufacturing", "Power generation", "Industrial processing"],
    productSpotlightAngle:
      "Long Life Turbine with ASTM D4304 Type I and 10,000+ hr oxidation on PDS—physically separate bulk from AW.",
    categorySpotlightRole:
      "Stationary turbine anchor in **Industrial Turbine / Compressor Reliability** with Synthetic Circulating Compressor/Turbine for combined loops.",
    repTalkTrack: [
      "Attach water separation and rust pass lines from Long Life Turbine PDS to annual turbine PM pack.",
      "Require OEM turbine class and ISO VG before quoting—never AW HM substitute.",
      "Post ASTM D4304 Type I at turbine fill port; lock AW guns away from turbine totes.",
    ],
    doNotConfuseWith: [
      "KLONDIKE Full Synthetic Circulating Compressor Turbine Oils — broader ISO 32–680 circulating/compressor-turbine row.",
      "KLONDIKE AW Advanced / Commercial AW — mobile hydraulic HM/HV, not D4304 turbine.",
      "KLONDIKE ISO 46 Full Synthetic Compressor Oil — reciprocating/rotary screw compressor row.",
    ],
    proofPoints: [
      "ASTM D4304 Type I; DIN 51515; ISO 32–150 on PDS index.",
      "Oxidation stability 10,000+ hrs; rust test pass; water separation per map.",
    ],
    oemSpecPositioning: [
      "OEM turbine sheet must specify ASTM D4304 Type I / DIN 51515 and ISO VG grade.",
      "Quote exact ISO row from PDS ladder—do not assume interchange across ISO 32–150 without OEM.",
    ],
    coldStartPositioning: "",
    chatterSuppressionPositioning: "",
    contaminationCavitationLogic: [
      "Moisture and particulate drive varnish and rust—demulsibility on PDS supports water shed discipline, not ignore analysis.",
      "Emergency AW top-off contaminates turbine chemistry class—plan flush per OEM if AW entered sump.",
    ],
    pdsFileHint: "Industrial Oils PDS/KLONDIKE Long Life Turbine Oils PDS.pdf",
    pdsUrl: "/pds/Industrial Oils PDS/KLONDIKE Long Life Turbine Oils PDS.pdf",
    pdsMapKey: "Long Life Turbine Oil",
    cautionNotes: [
      "Not for reciprocating compressor programs without OEM approval.",
      "Never interchange with mobile hydraulic AW on emergency fill.",
    ],
  }),
  freezeHydraulicRow({
    id: "hydr-canonical-syn-circulating-compressor-turbine",
    productName: "KLONDIKE Full Synthetic Circulating Compressor Turbine Oils",
    aliases: [
      "synthetic circulating compressor turbine",
      "circulating compressor turbine oil",
      "compressor turbine oil",
      "full synthetic circulating",
    ],
    category: "hydraulic_fluids",
    hierarchyPosition:
      "industrial_rotating — full synthetic circulating / compressor / turbine (ASTM D4304 Type I, wide ISO span)",
    positioningTier: "industrial_rotating",
    spotlightProductId: "hydr-pds-syn-compressor-turbine",
    whatItIs:
      "Full synthetic oil for circulating, compressor, and turbine applications indexed to ASTM D4304 Type I with ISO 32–680 span, VI 150–166, and 10,000+ hr oxidation on the PDS map.",
    whyItWins:
      "Combines circulating-system oxidation reserve and thermal stability on one indexed row when OEM allows ASTM D4304 Type I synthetic class—prevents treating the sump like AW hydraulic for emergency fills.",
    operatingConditions: [
      "ISO 32/220/460/680 grades listed on PDS index (confirm full ladder on live PDS).",
      "VI 150–166; oxidation 10,000+ hrs; flash point 260 °C; rust protection pass on map.",
      "DIN 51515/51524 references on indexed summary.",
    ],
    troubleshootingAssociations: ["contamination"],
    customerPainSignals: [
      "Treating circulating oil like AW hydraulic for emergency top-off.",
      "Foam and moisture on combined compressor/turbine loops without demulsibility discipline.",
      "Quoting wrong ISO VG from wide ladder without OEM sign-off.",
    ],
    applications: [
      "Circulating, compressor, and turbine systems per ASTM D4304 Type I on PDS.",
      "Combined compressor/turbine circulating loops when OEM class matches indexed row.",
    ],
    equipmentTargets: [
      "Industrial circulating systems and rotating equipment per ASTM D4304 on OEM sheet.",
      "Not mobile construction hydraulics or tractor UTF sumps.",
    ],
    industries: ["Manufacturing", "Power generation", "Industrial processing"],
    productSpotlightAngle:
      "Full synthetic D4304 circulating row with 10,000+ hr oxidation and wide ISO span—ASTM class at the fill port, not AW drum color.",
    categorySpotlightRole:
      "Synthetic circulating anchor in **Industrial Turbine / Compressor Reliability** alongside Long Life Turbine and ISO 46 compressor row.",
    repTalkTrack: [
      "Log ASTM D4304 Type I line from Synthetic Circulating PDS on each compressor/turbine nameplate file.",
      "Separate bulk totes from AW; post ASTM class at fill.",
      "Quote exact ISO VG from PDS—wide span requires OEM viscosity sign-off.",
    ],
    doNotConfuseWith: [
      "KLONDIKE Long Life Turbine Oils — turbine-focused ISO 32–150 row; confirm OEM preference.",
      "KLONDIKE ISO 46 Full Synthetic Compressor Oil — plant air rotary screw ISO 46 row.",
      "KLONDIKE Natural Gas Compressor Oil — ISO 260 wet gas specialty.",
      "Any AW hydraulic — chemistry class mismatch.",
    ],
    proofPoints: [
      "ASTM D4304 Type I; DIN 51515/51524; ISO 32–680 on PDS index.",
      "Oxidation 10,000+ hrs; VI 150–166; flash 260 °C; rust protection pass per map.",
    ],
    oemSpecPositioning: [
      "OEM must specify ASTM D4304 Type I circulating/compressor/turbine class and exact ISO VG.",
      "DIN 51515/51524 lines on PDS—match to stationary OEM sheet, not mobile Denison HF.",
    ],
    coldStartPositioning: "",
    chatterSuppressionPositioning: "",
    contaminationCavitationLogic: [
      "Moisture and foam drive reliability issues—use rust pass and oxidation lines from PDS in PM packs, not AW top-off.",
      "Wrong ISO VG in wide ladder affects film and heat balance—confirm with OEM before bulk change.",
    ],
    pdsFileHint: "Industrial Oils PDS/KLONDIKE Full Synthetic Circulating Compressor Turbine Oils PDS.pdf",
    pdsUrl: "/pds/Industrial Oils PDS/KLONDIKE Full Synthetic Circulating Compressor Turbine Oils PDS.pdf",
    pdsMapKey: "Synthetic Circulating Compressor Turbine",
    cautionNotes: [
      "Wide ISO span—quote exact viscosity row from live PDS for each sump.",
      "Not rotary screw ISO 46 default without OEM—see ISO 46 compressor PDS row.",
    ],
  }),
];

/** @type {Readonly<{ version: number, category: "hydraulic_fluids", products: readonly HydraulicCanonicalProductIntelligence[] }>} */
export const HYDRAULIC_CANONICAL_PRODUCT_INTELLIGENCE = Object.freeze({
  version: HYDRAULIC_CANONICAL_PRODUCT_INTELLIGENCE_VERSION,
  category: "hydraulic_fluids",
  products: Object.freeze(HYDRAULIC_CANONICAL_PRODUCT_ROWS),
});

/**
 * @returns {readonly HydraulicCanonicalProductIntelligence[]}
 */
export function listHydraulicCanonicalProductIntelligence() {
  return HYDRAULIC_CANONICAL_PRODUCT_INTELLIGENCE.products;
}

/**
 * @param {unknown} id
 * @returns {HydraulicCanonicalProductIntelligence | null}
 */
export function getHydraulicCanonicalProductIntelligenceById(id) {
  const key = String(id ?? "").trim();
  if (!key) return null;
  return HYDRAULIC_CANONICAL_PRODUCT_INTELLIGENCE.products.find((p) => p.id === key) || null;
}

/**
 * @param {unknown} pdsMapKey
 * @returns {HydraulicCanonicalProductIntelligence | null}
 */
export function getHydraulicCanonicalProductIntelligenceByPdsKey(pdsMapKey) {
  const key = String(pdsMapKey ?? "").trim();
  if (!key) return null;
  return HYDRAULIC_CANONICAL_PRODUCT_INTELLIGENCE.products.find((p) => p.pdsMapKey === key) || null;
}
