/**
 * Canonical KLONDIKE heavy duty engine oil intelligence (deterministic source text).
 * Grounded on indexed `pdsMap.js` rows and `hdEngineOilPdsSpotlightMap.js` — confirm lines on live PDS before quoting.
 * Not wired to UI in this module.
 */

/** @type {number} */
export const HD_ENGINE_OIL_CANONICAL_PRODUCT_INTELLIGENCE_VERSION = 1;

/**
 * Hierarchy branches for HD engine oil programs.
 * @type {Readonly<Record<string, { branch: string, tier: string, description: string }>>}
 */
export const HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF = Object.freeze({
  professionalFormula: Object.freeze({
    branch: "professional_formula_mixed_fleet",
    tier: "professional",
    description: "Primary value/professional mixed-fleet CK-4 tier — Professional Formula 15W-40 and indexed 10W-30 CK-4 programs.",
  }),
  advancedFormula: Object.freeze({
    branch: "advanced_formula",
    tier: "advanced",
    description: "BETTER severe-duty CK-4 with improved oxidation and soot language on PDS vs Professional row.",
  }),
  fullSynthetic: Object.freeze({
    branch: "full_synthetic",
    tier: "full_synthetic",
    description: "BEST CK-4 full synthetic severe-service programs when OEM allows.",
  }),
  fuelEconomySyntheticBlend: Object.freeze({
    branch: "fuel_economy_synthetic_blend",
    tier: "synthetic_blend",
    description: "CK-4 10W-30 / 10W-40 synthetic blend for cold flow and fuel economy potential where OEM specifies SAE grade.",
  }),
  fa4: Object.freeze({
    branch: "fa4_fuel_economy",
    tier: "fa4",
    description: "API FA-4 10W-30 on-highway programs — not backwards compatible with CK-4 hardware per PDS.",
  }),
  arcticPerformance: Object.freeze({
    branch: "arctic_performance",
    tier: "arctic",
    description: "Arctic Performance Technology full synthetic CK-4 0W-30 / 0W-40.",
  }),
  naturalGas: Object.freeze({
    branch: "natural_gas",
    tier: "natural_gas",
    description: "Low/mid ash natural gas engine oils — separate from diesel CK-4 chemistry.",
  }),
  sourGas: Object.freeze({
    branch: "sour_gas",
    tier: "natural_gas_sour",
    description: "Mid and low ash sour gas formulations for variable H2S fuel quality.",
  }),
  railroadZincFree: Object.freeze({
    branch: "railroad_zinc_free",
    tier: "specialty",
    description: "Ashless zinc-free railroad / marine / power generation specialty.",
  }),
  legacySingleGrade: Object.freeze({
    branch: "legacy_single_grade",
    tier: "legacy",
    description: "API CF-2/CF single-grade family for non-DPF legacy diesel only.",
  }),
});

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   aliases: string[],
 *   hierarchyBranch: string,
 *   productPositioning: string,
 *   viscosityPositioning: string,
 *   whatItIs: string,
 *   whyItWins: string,
 *   emissionsPositioning: string,
 *   fuelEconomyPositioning: string,
 *   coldStartPositioning: string,
 *   severeDutyPositioning: string,
 *   naturalGasPositioning: string,
 *   railroadPositioning: string,
 *   catalystCompatibility: string,
 *   TBNStrategy: string,
 *   OEMPositioning: string,
 *   applications: string[],
 *   industries: string[],
 *   customerPainSignals: string[],
 *   troubleshootingAssociations: string[],
 *   upgradeStory: string[],
 *   repTalkTrack: string[],
 *   productSpotlightAngle: string,
 *   categorySpotlightRole: string,
 *   customerProfileMatches: string[],
 *   doNotConfuseWith: string[],
 *   proofPoints: string[],
 *   pdsMapKey: string,
 *   pdsFileHint: string,
 *   cautionNotes: string[],
 * }} HdEngineOilCanonicalProductIntelligence
 */

/** @param {HdEngineOilCanonicalProductIntelligence} row */
function freezeHdEngineOilRow(row) {
  const listKeys = [
    "aliases",
    "applications",
    "industries",
    "customerPainSignals",
    "troubleshootingAssociations",
    "upgradeStory",
    "repTalkTrack",
    "customerProfileMatches",
    "doNotConfuseWith",
    "proofPoints",
    "cautionNotes",
  ];
  /** @type {Record<string, unknown>} */
  const frozen = { ...row };
  for (const key of listKeys) {
    const val = row[key];
    frozen[key] = Object.freeze([...(Array.isArray(val) ? val : [])]);
  }
  return Object.freeze(frozen);
}

/** @param {Partial<HdEngineOilCanonicalProductIntelligence> & Pick<HdEngineOilCanonicalProductIntelligence, "id" | "productName" | "pdsMapKey">} row */
function hdRow(row) {
  return freezeHdEngineOilRow({
    hierarchyBranch: "",
    productPositioning: "",
    viscosityPositioning: "",
    whatItIs: "",
    whyItWins: "",
    emissionsPositioning: "",
    fuelEconomyPositioning: "",
    coldStartPositioning: "",
    severeDutyPositioning: "",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "",
    TBNStrategy: "",
    OEMPositioning: "",
    applications: [],
    industries: [],
    customerPainSignals: [],
    troubleshootingAssociations: [],
    upgradeStory: [],
    repTalkTrack: [],
    productSpotlightAngle: "",
    categorySpotlightRole: "",
    customerProfileMatches: [],
    doNotConfuseWith: [],
    proofPoints: [],
    pdsFileHint: "",
    cautionNotes: [],
    aliases: [],
    ...row,
  });
}

/** @type {HdEngineOilCanonicalProductIntelligence[]} */
const HD_ENGINE_OIL_CANONICAL_PRODUCT_ROWS = [
  hdRow({
    id: "hd-canonical-professional-15w40",
    productName: "KLONDIKE Professional Formula SAE 15W-40 Heavy Duty Engine Oil",
    aliases: [
      "professional formula 15w40",
      "15w40 professional",
      "klondike professional formula hd",
      "sae 15w40 ck4 professional formula",
    ],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.professionalFormula.branch,
    productPositioning:
      "Primary **Professional Formula** mixed-fleet CK-4 tier for on- and off-highway severe diesel when API CK-4 SAE 15W-40 and indexed OEM lists apply.",
    viscosityPositioning: "SAE 15W-40 — default severe-duty bulk viscosity for many North American diesel fleets.",
    whatItIs:
      "Premium mixed-fleet heavy duty engine oil indexed on the Professional Formula PDS with API CK-4 (backwards compatible with CJ-4, CI-4 Plus language on PDS map) for severe on- and off-highway diesel.",
    whyItWins:
      "Defensible GOOD/Professional lane: mixed fleet consolidation, high TBN (~10) on index, and Cummins / Detroit / Volvo / Mack / MB diesel approval lines on the PDS map—not commodity drum color habit.",
    emissionsPositioning:
      "Indexed for DPF / EGR / SCR aftertreatment compatibility when API CK-4 row is OEM-approved for that engine family—confirm nameplate API before bulk.",
    fuelEconomyPositioning:
      "15W-40 is the severe-duty workhorse viscosity; pair with 10W-30 Professional or synthetic blend rows when OEM allows lower high-temperature viscosity for MPG programs.",
    coldStartPositioning: "",
    severeDutyPositioning:
      "Soot and load cycles where indexed high TBN and OEM severe-service lists support Professional tier before Advanced or Full Synthetic upgrade.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "CK-4 category for modern hardware when OEM permits—do not substitute NG or FA-4 chemistry.",
    TBNStrategy: "High TBN (~10) on PDS index for corrosion reserve in severe diesel cycles.",
    OEMPositioning:
      "Cummins CES 20086 / 20081; Detroit Diesel 93K222 / 93K218; Volvo VDS-4.5 / VDS-4; Mack EOS-4.5; MB 228.31 / 228.3 per indexed PDS summary.",
    applications: [
      "Mixed fleet diesel bulk programs referencing API CK-4 15W-40.",
      "On- and off-highway severe service when Professional Formula row matches OEM manual.",
    ],
    industries: ["trucking", "construction", "agriculture", "municipal", "mining"],
    customerPainSignals: [
      "Spec drift at bulk tanks between API categories across mixed fleet ages.",
      "Aftertreatment faults when customers chase price with non-CK-4 chemistry.",
      "Counter confusion between Professional Formula and legacy Commercial naming.",
    ],
    troubleshootingAssociations: ["oxidationVarnish", "contamination", "highTemperatureHydraulics"],
    upgradeStory: [
      "Professional 15W-40 → Advanced 15W-40 when UOA or OEM severe service documents oxidation or soot margin needs.",
      "Professional → Full Synthetic 15W-40 when OEM allows synthetic benefit at same SAE.",
    ],
    repTalkTrack: [
      "Start at the nameplate: API CK-4 and SAE 15W-40—then show Professional Formula PDS lines for Cummins, Detroit, and Volvo.",
      "Mixed fleet consolidation only when every VIN on the bulk program allows CK-4 15W-40—no FA-4 or NG shortcuts.",
    ],
    productSpotlightAngle: "Professional Protection Program anchor — GOOD tier CK-4 with OEM diesel lists on PDS.",
    categorySpotlightRole: "Lead **Professional Protection Program** bulk default before Advanced / Full Synthetic upsell.",
    customerProfileMatches: ["trucking_fleet", "construction", "agriculture", "municipal_fleet"],
    doNotConfuseWith: [
      "KLONDIKE Commercial Formula SAE 10W-30 CK-4 — separate indexed Commercial Formula PDS file; not the same SKU as 15W-40 Professional drum.",
      "KLONDIKE SAE 15W-40 Advanced Formula — BETTER oxidation tier, not interchangeable marketing.",
      "Any FA-4 or natural gas row — different API class.",
    ],
    proofPoints: [
      "API CK-4 (backwards compatible with CJ-4, CI-4 Plus) on PDS index.",
      "Cummins CES 20086 / 20081; Detroit Diesel 93K222 / 93K218; Volvo VDS-4.5 / VDS-4.",
      "Mixed fleet consolidation positioning on indexed summary.",
      "DPF / EGR / SCR emissions compatibility language when CK-4 is OEM-approved.",
      "TBN ~10 on PDS index.",
    ],
    pdsMapKey: "15W-40 Professional",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE_Professional_Formula_Heavy_Duty_Engine_Oil_PDS.pdf",
    cautionNotes: [
      "Official marketing tier is **Professional Formula** — do not market legacy “Commercial” label for 15W-40 bulk.",
      "Confirm MB and Volvo revision levels on live PDS before quoting.",
      "Drain intervals must follow OEM maximums.",
    ],
  }),

  hdRow({
    id: "hd-canonical-professional-10w30",
    productName: "KLONDIKE Professional Formula SAE 10W-30 Heavy Duty Engine Oil",
    aliases: [
      "professional formula 10w30",
      "professional 10w30 ck4",
      "sae 10w30 ck4 professional formula",
      "commercial formula 10w30",
    ],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.professionalFormula.branch,
    productPositioning:
      "Professional mixed-fleet **10W-30 CK-4** program for severe on- and off-highway diesel when OEM specifies SAE 10W-30 — indexed as Professional 10W-30 CK-4 on PDS map.",
    viscosityPositioning: "SAE 10W-30 — thinner high-temperature grade for cold flow and OEM fuel-economy-eligible hardware versus 15W-40.",
    whatItIs:
      "CK-4/CJ-4 severe-service 10W-30 heavy duty engine oil row indexed on PDS map (Professional 10W-30 CK-4) with wear protection, cleanliness, TBN retention, and aftertreatment compatibility language per index.",
    whyItWins:
      "Gives fleets a documented **Professional Formula** 10W-30 CK-4 option with Cummins CES 20086, Detroit 93K222, Mack EOS-4.5, and Volvo VDS-4.5 on index—when the tag allows 10W-30, not habit alone.",
    emissionsPositioning: "API CK-4 / CJ-4 with aftertreatment compatibility language on indexed Commercial/Professional family PDS row.",
    fuelEconomyPositioning:
      "10W-30 grade supports OEM contexts that allow lower HTHS CK-4 programs versus 15W-40—still CK-4, not FA-4, unless OEM specifies FA-4 separately.",
    coldStartPositioning: "VI ~145 on index supports cold-season cranking versus 15W-40 where OEM allows 10W-30.",
    severeDutyPositioning: "Severe on- and off-highway service per indexed CK-4/CJ-4 positioning.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "CK-4 for DPF-equipped diesel when OEM approves 10W-30 CK-4 — not NG low ash chemistry.",
    TBNStrategy: "TBN ~10 on PDS index.",
    OEMPositioning:
      "API CK-4 / CJ-4; Caterpillar ECF-3; Cummins CES 20086; Detroit 93K222; Mack EOS-4.5; Volvo VDS-4.5 per indexed summary.",
    applications: ["OEM-approved CK-4 10W-30 severe service bulk and PM programs."],
    industries: ["trucking", "construction", "municipal", "agriculture"],
    customerPainSignals: [
      "Shops stocking only 15W-40 when OEM chart lists 10W-30 for MPG or cold programs.",
      "Confusion between Professional Formula 10W-30 and synthetic blend 10W-30 CK-4 SKUs.",
    ],
    troubleshootingAssociations: ["sluggishColdStartup", "seasonalFluidMismatch"],
    upgradeStory: [
      "Professional 10W-30 → 10W-30 Synthetic Blend CK-4 when fleet wants BETTER tier oxidation/shear at same SAE.",
      "Do not upgrade to FA-4 without OEM FA-4 approval.",
    ],
    repTalkTrack: [
      "If the manual says CK-4 10W-30, Professional Formula is the indexed severe-service row—quote the PDS line, not a thinner automotive product.",
    ],
    productSpotlightAngle: "Professional Protection Program — 10W-30 CK-4 column beside 15W-40 Professional.",
    categorySpotlightRole: "GOOD tier 10W-30 anchor in **Professional Protection Program**.",
    customerProfileMatches: ["trucking_fleet", "construction", "municipal_fleet", "agriculture"],
    doNotConfuseWith: [
      "KLONDIKE SAE 10W-30 Synthetic Blend Heavy Duty Engine Oil — BETTER synthetic blend tier, different PDS.",
      "KLONDIKE SAE 10W-30 FA-4 — FA-4 class only; not backwards compatible per FA-4 PDS.",
      "KLONDIKE SAE 10W-40 Synthetic Blend Low Ash Natural Gas — NG chemistry, not diesel CK-4.",
    ],
    proofPoints: [
      "API CK-4 / CJ-4 on index.",
      "Cummins CES 20086; Detroit 93K222; Mack EOS-4.5; Volvo VDS-4.5.",
      "TBN ~10; VI ~145 per PDS map index.",
    ],
    pdsMapKey: "Professional 10W-30 CK-4",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE Commercial Formula Heavy Duty Engine Oils PDS.pdf",
    cautionNotes: [
      "PDS map indexes this SKU on Commercial Formula family PDF — marketing tier remains Professional Formula per alias index; quote exact SAE row on live PDS.",
      "CJ-4 backwards compatibility language is not permission to ignore CK-4 requirement on modern hardware.",
    ],
  }),

  hdRow({
    id: "hd-canonical-advanced-15w40",
    productName: "KLONDIKE SAE 15W-40 Advanced Formula Heavy Duty Engine Oil",
    aliases: ["advanced formula 15w40", "15w40 advanced", "ck4 advanced 15w40"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.advancedFormula.branch,
    productPositioning: "BETTER tier CK-4 15W-40 for severe mixed fleet when oxidation and soot margin need exceeds Professional row.",
    viscosityPositioning: "SAE 15W-40 CK-4 / SN.",
    whatItIs:
      "Severe-duty diesel engine oil indexed API CK-4 / SN with improved oxidation control and soot management language versus entry Professional tier on PDS map.",
    whyItWins:
      "Indexed ACEA E9/E7, high TBN (~10), shear stability, and CES 20086 / Detroit 93K222 / Volvo VDS-4.5 — upgrade story stays inside CK-4 family with PDS proof.",
    emissionsPositioning: "CK-4 / SN aftertreatment-compatible positioning when OEM approves — same API class discipline as Professional.",
    fuelEconomyPositioning: "",
    coldStartPositioning: "",
    severeDutyPositioning: "High soot and oxidation severity on linehaul, vocational, and industrial mobile diesel.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "CK-4 — not FA-4 or NG.",
    TBNStrategy: "TBN ~10 with improved oxidation reserve language on PDS versus Professional row.",
    OEMPositioning: "API CK-4 / SN; ACEA E9 / E7; Cummins CES 20086; Detroit 93K222; Volvo VDS-4.5 on index.",
    applications: ["Severe-duty mixed fleet CK-4 15W-40 when UOA supports BETTER tier."],
    industries: ["trucking", "construction", "mining", "municipal"],
    customerPainSignals: [
      "Iron and soot trends on Professional tier at correct viscosity.",
      "Fleet comparing price without oxidation context.",
    ],
    troubleshootingAssociations: ["oxidationVarnish", "contamination"],
    upgradeStory: ["Advanced 15W-40 → 15W-40 Full Synthetic when OEM allows synthetic at same SAE."],
    repTalkTrack: [
      "Show last two UOA oxidation trends against Advanced PDS bullets before moving bulk from Professional.",
    ],
    productSpotlightAngle: "Advanced Mixed Fleet Program — BETTER CK-4 15W-40.",
    categorySpotlightRole: "BETTER anchor in **Advanced Mixed Fleet Program**.",
    customerProfileMatches: ["trucking_fleet", "construction", "mining_aggregate", "municipal_fleet"],
    doNotConfuseWith: [
      "KLONDIKE Professional Formula 15W-40 — GOOD tier entry.",
      "KLONDIKE SAE 10W-30 FA-4 — different API class.",
    ],
    proofPoints: [
      "API CK-4 / SN; ACEA E9 / E7.",
      "Cummins CES 20086; Detroit 93K222; Volvo VDS-4.5.",
      "Improved oxidation and soot management language on PDS index.",
      "TBN ~10; excellent shear stability per index.",
    ],
    pdsMapKey: "15W-40 Advanced",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 15W-40 Advanced Formula Heavy Duty Engine Oil PDS.pdf",
    cautionNotes: ["Still CK-4 — not FA-4. Confirm OEM 15W-40 before bulk."],
  }),

  hdRow({
    id: "hd-canonical-full-synthetic-15w40",
    productName: "KLONDIKE SAE 15W-40 Full Synthetic Heavy Duty Engine Oil",
    aliases: ["15w40 full synthetic hd", "ck4 full synthetic 15w40"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.fullSynthetic.branch,
    productPositioning: "BEST tier full synthetic CK-4 / SN 15W-40 for premium severe diesel.",
    viscosityPositioning: "SAE 15W-40; VI ~155 indexed.",
    whatItIs:
      "Premium full synthetic CK-4 / SN heavy duty engine oil with high VI and enhanced oxidation / low-temperature language on PDS index.",
    whyItWins:
      "Maximum severe-duty protection positioning with documented VI ~155 and OEM diesel lists — synthetic upgrade at same SAE when OEM allows.",
    emissionsPositioning: "CK-4 / SN DPF-compatible positioning per PDS when OEM approves.",
    fuelEconomyPositioning: "",
    coldStartPositioning: "Improved low-temperature performance language versus mineral tiers on same SAE per index.",
    severeDutyPositioning: "High-load mining, linehaul premium, and municipal severe profiles.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "CK-4 / SN — segregate from NG and FA-4 bulk.",
    TBNStrategy: "High TBN with enhanced oxidation stability language on PDS.",
    OEMPositioning: "API CK-4 / SN; ACEA E9/E7; CES 20086; Detroit 93K222; Volvo VDS-4.5.",
    applications: ["Premium severe CK-4 15W-40 synthetic programs."],
    industries: ["trucking", "construction", "mining", "municipal"],
    customerPainSignals: [
      "Synthetic sold on mileage myths without OEM CK-4/SN evidence.",
      "Drain interval creep beyond OEM maximum.",
    ],
    troubleshootingAssociations: ["oxidationVarnish"],
    upgradeStory: ["Top CK-4 15W-40 synthetic tier — upgrade from Advanced when analysis supports."],
    repTalkTrack: [
      "Attach VI ~155 and oxidation lines from Full Synthetic PDS to severe-service upgrade worksheet.",
    ],
    productSpotlightAngle: "Full Synthetic Severe Service Program — BEST 15W-40.",
    categorySpotlightRole: "BEST anchor in **Full Synthetic Severe Service Program**.",
    customerProfileMatches: ["trucking_fleet", "mining_aggregate", "construction", "municipal_fleet"],
    doNotConfuseWith: ["KLONDIKE SAE 5W-40 Full Synthetic — different SAE grade.", "FA-4 and NG families."],
    proofPoints: [
      "API CK-4 / SN; ACEA E9/E7.",
      "VI ~155; enhanced oxidation stability on index.",
      "Cummins CES 20086; Detroit 93K222; Volvo VDS-4.5.",
    ],
    pdsMapKey: "15W-40 Full Synthetic",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 15W-40 Full Synthetic Heavy Duty Engine Oil PDS.pdf",
    cautionNotes: [
      "Synthetic capability does not authorize unbounded drain intervals.",
      "Not FA-4 or NG substitute.",
    ],
  }),

  hdRow({
    id: "hd-canonical-10w40-synthetic-blend-ck4",
    productName: "KLONDIKE SAE 10W-40 Synthetic Blend Heavy Duty Engine Oil",
    aliases: ["10w40 synthetic blend ck4", "ck4 10w40 blend"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.fuelEconomySyntheticBlend.branch,
    productPositioning: "CK-4 synthetic blend 10W-40 for diesel where OEM prefers 10W-40 over 15W-40 for cold start.",
    viscosityPositioning: "SAE 10W-40; VI ~155; TBN ~10 on index.",
    whatItIs:
      "Synthetic blend CK-4 heavy duty engine oil for diesel engines specifying SAE 10W-40 per indexed PDS summary.",
    whyItWins:
      "Cold-start and shear-stable CK-4 tier without full synthetic price — ACEA E9/E7 and major OEM diesel lists on index.",
    emissionsPositioning: "CK-4 aftertreatment compatibility language on PDS.",
    fuelEconomyPositioning: "10W-40 vs 15W-40 choice per OEM SAE chart and climate — not automatic MPG claim.",
    coldStartPositioning: "Preferred over 15W-40 where OEM and climate support 10W-40 for cranking.",
    severeDutyPositioning: "Severe diesel with API CK-4 10W-40 allowance.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "CK-4 diesel — not NG 10W-40 low ash drum.",
    TBNStrategy: "TBN ~10 on index.",
    OEMPositioning: "API CK-4; Cummins CES 20086; Detroit DFS 93K222; Mack EOS-4.5; Volvo VDS-4.5.",
    applications: ["Mixed fleets with OEM 10W-40 diesel allowance."],
    industries: ["trucking", "construction", "municipal", "agriculture"],
    customerPainSignals: [
      "Using 15W-40 in northern yards when tag allows 10W-40.",
      "NG 10W-40 low ash confused at bulk gun.",
    ],
    troubleshootingAssociations: ["sluggishColdStartup", "seasonalFluidMismatch"],
    upgradeStory: ["Synthetic blend 10W-40 → Full Synthetic 5W-40 or 15W-40 when OEM and analysis support."],
    repTalkTrack: [
      "Read the SAE row on the tag — 10W-40 CK-4 synthetic blend is not the NG low ash product.",
    ],
    productSpotlightAngle: "Advanced Mixed Fleet — 10W-40 CK-4 synthetic blend column.",
    categorySpotlightRole: "BETTER viscosity option in **Advanced Mixed Fleet Program**.",
    customerProfileMatches: ["trucking_fleet", "construction", "municipal_fleet"],
    doNotConfuseWith: [
      "KLONDIKE SAE 10W-40 Synthetic Blend Low Ash Natural Gas Heavy Duty Engine Oil.",
      "KLONDIKE SAE 10W-30 FA-4.",
    ],
    proofPoints: ["API CK-4; SAE 10W-40; VI ~155; TBN ~10.", "Cummins CES 20086; Detroit DFS 93K222."],
    pdsMapKey: "10W-40 Synthetic Blend",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 10W-40 Synthetic Blend Heavy Duty Engine Oil PDS.pdf",
    cautionNotes: ["Physically segregate from NG 10W-40 at bulk."],
  }),

  hdRow({
    id: "hd-canonical-10w30-synthetic-blend-ck4",
    productName: "KLONDIKE SAE 10W-30 Synthetic Blend Heavy Duty Engine Oil",
    aliases: ["10w30 synthetic blend ck4", "ck4 10w30 blend"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.fuelEconomySyntheticBlend.branch,
    productPositioning: "CK-4 synthetic blend 10W-30 for OEM fuel economy and cold-start programs.",
    viscosityPositioning: "SAE 10W-30; VI ~148; TBN ~10.",
    whatItIs:
      "Synthetic blend CK-4 10W-30 with wear protection, cleanliness, shear stability, and aftertreatment compatibility per PDS index.",
    whyItWins:
      "BETTER tier 10W-30 with ACEA E9/E7/E4/E2 stack and fuel economy potential language when OEM specifies 10W-30 CK-4.",
    emissionsPositioning: "CK-4 modern aftertreatment language on index.",
    fuelEconomyPositioning:
      "Designed for modern diesel where SAE 10W-30 is specified for cold start and fuel economy potential per PDS — OEM-contextual only.",
    coldStartPositioning: "10W-30 synthetic blend for approved cold programs.",
    severeDutyPositioning: "EPA-era diesel with 10W-30 on chart.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "CK-4 — not FA-4 unless OEM lists FA-4 separately.",
    TBNStrategy: "TBN ~10.",
    OEMPositioning: "API CK-4; ACEA E9/E7/E4/E2; Cummins CES 20086; Detroit 93K222; Mack; Volvo.",
    applications: ["Fleet MPG pilots with OEM 10W-30 CK-4 approval."],
    industries: ["trucking", "construction", "municipal", "agriculture"],
    customerPainSignals: [
      "Shop habit blocking OEM 10W-30 programs.",
      "Shear anxiety without citing PDS shear stability language.",
    ],
    troubleshootingAssociations: ["seasonalFluidMismatch"],
    upgradeStory: ["10W-30 blend → FA-4 only with OEM FA-4 VIN list.", "10W-30 blend → Full Synthetic 5W-40 for colder lanes."],
    repTalkTrack: [
      "MPG conversations need the OEM 10W-30 allowance first — then ACEA stack from this PDS row.",
    ],
    productSpotlightAngle: "Fuel economy / 10W-30 CK-4 synthetic blend pillar.",
    categorySpotlightRole: "**Advanced Mixed Fleet Program** — 10W-30 CK-4 column.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet", "construction"],
    doNotConfuseWith: ["KLONDIKE Professional 10W-30 CK-4 — GOOD commercial/professional tier.", "KLONDIKE 10W-30 FA-4."],
    proofPoints: [
      "API CK-4; ACEA E9/E7/E4/E2.",
      "VI ~148; TBN ~10.",
      "Cummins CES 20086; Detroit 93K222.",
    ],
    pdsMapKey: "10W-30 Synthetic Blend",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 10W-30 Synthetic Blend Heavy Duty Engine Oil PDS.pdf",
    cautionNotes: ["Avoid absolute MPG promises — fuel economy potential is OEM-contextual."],
  }),

  hdRow({
    id: "hd-canonical-10w30-fa4",
    productName: "KLONDIKE SAE 10W-30 FA-4 Synthetic Blend Heavy Duty Engine Oil",
    aliases: ["10w30 fa4", "fa-4 10w30", "api fa4"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.fa4.branch,
    productPositioning: "API FA-4 10W-30 for newer on-highway diesel where OEM specifies FA-4 — separate bulk from CK-4.",
    viscosityPositioning: "SAE 10W-30 FA-4; HTHS ~3.1 cP on index.",
    whatItIs:
      "FA-4 synthetic blend diesel engine oil for engines where SAE 10W-30 FA-4 is specified per indexed PDS — fuel economy focused formulation.",
    whyItWins:
      "Captures OEM fuel economy programs with CES 20087 and Detroit 93K223 lines when hardware is FA-4 approved — not a CK-4 upgrade path.",
    emissionsPositioning: "Aftertreatment compatibility for FA-4 approved hardware per PDS.",
    fuelEconomyPositioning: "Fuel economy focused formulation with lower HTHS ~3.1 cP on index.",
    coldStartPositioning: "10W-30 FA-4 for approved on-highway newer engines.",
    severeDutyPositioning: "On-highway Class 8 FA-4 programs only — not vocational CK-4 substitute.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "FA-4 specific — PDS states not generally backwards compatible with CK-4 hardware.",
    TBNStrategy: "TBN ~10 on index.",
    OEMPositioning: "API FA-4; Cummins CES 20087; Detroit Diesel 93K223; VI ~140 on index.",
    applications: ["VIN-gated FA-4 bulk for approved model years."],
    industries: ["trucking", "municipal"],
    customerPainSignals: [
      "FA-4 mis-fill into CK-4-only fleet.",
      "Belief FA-4 is universally better synthetic.",
    ],
    troubleshootingAssociations: [],
    upgradeStory: ["FA-4 is not an upgrade from CK-4 — parallel program with OEM gate."],
    repTalkTrack: [
      "FA-4 gets its own tote and ticket — attach CES 20087 or 93K223 from PDS per VIN.",
    ],
    productSpotlightAngle: "FA-4 fuel economy column — distinct from CK-4 poster.",
    categorySpotlightRole: "**Advanced Mixed Fleet Program** — FA-4-only list.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet"],
    doNotConfuseWith: [
      "All CK-4 products including 10W-30 synthetic blend.",
      "NG engine oils.",
    ],
    proofPoints: [
      "API FA-4; SAE 10W-30.",
      "Cummins CES 20087; Detroit 93K223.",
      "HTHS ~3.1 cP; not generally backwards compatible per index.",
    ],
    pdsMapKey: "10W-30 FA-4",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 10W-30 FA-4 Synthetic Blend Heavy Duty Engine Oil PDS.pdf",
    cautionNotes: [
      "Train bulk drivers — FA-4 is not CK-4 backwards compatible per PDS warning.",
      "Never bulk-switch CK-4 fleet without OEM FA-4 approval list.",
    ],
  }),

  hdRow({
    id: "hd-canonical-5w40-full-synthetic",
    productName: "KLONDIKE SAE 5W-40 Full Synthetic Heavy Duty Engine Oil",
    aliases: ["5w40 full synthetic hd", "ck4 5w40 full synthetic"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.fullSynthetic.branch,
    productPositioning: "Full synthetic CK-4 / SN 5W-40 for severe cold and dual API where OEM allows.",
    viscosityPositioning: "SAE 5W-40; VI ~178; pour −47°C on index.",
    whatItIs:
      "Premium full synthetic CK-4 / SN 5W-40 for mixed diesel/gasoline HD applications per OEM per PDS index.",
    whyItWins:
      "Extreme cold pour and high VI for northern severe fleets when 5W-40 is on the nameplate — CK-4/SN proof on PDS.",
    emissionsPositioning: "CK-4 / SN when OEM approves diesel aftertreatment row.",
    fuelEconomyPositioning: "",
    coldStartPositioning: "Pour −47°C and VI ~178 support arctic and northern mixed fleet cold start per index.",
    severeDutyPositioning: "Severe-duty operation with 5W-40 OEM allowance.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "CK-4 diesel programs — confirm SN leg applicability per OEM for any gasoline service.",
    TBNStrategy: "Indexed for severe diesel CK-4/SN programs.",
    OEMPositioning: "API CK-4 / SN; ACEA E9/E7/E4/E2; CES 20086; Detroit 93K222; Mack; Volvo.",
    applications: ["Northern mixed fleet 5W-40 programs."],
    industries: ["trucking", "construction", "municipal", "agriculture"],
    customerPainSignals: [
      "5W-40 sold without SN/diesel context clarity.",
      "Using 15W-40 where 5W-40 required for cold.",
    ],
    troubleshootingAssociations: ["sluggishColdStartup", "seasonalFluidMismatch"],
    upgradeStory: ["BEST 5W-40 tier when OEM tags 5W-40 CK-4/SN."],
    repTalkTrack: [
      "Pour −47°C from PDS for northern proposals — only when 5W-40 is on the tag.",
    ],
    productSpotlightAngle: "Full Synthetic Severe Service — 5W-40 BEST cold option.",
    categorySpotlightRole: "**Full Synthetic Severe Service Program**.",
    customerProfileMatches: ["trucking_fleet", "construction", "municipal_fleet"],
    doNotConfuseWith: ["0W-30/0W-40 Arctic rows — even colder SAE when OEM allows.", "PCMO products."],
    proofPoints: ["API CK-4 / SN.", "VI ~178; pour −47°C.", "ACEA E9/E7/E4/E2."],
    pdsMapKey: "5W-40 Full Synthetic",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 5W-40 Full Synthetic Heavy Duty Engine Oil PDS.pdf",
    cautionNotes: ["SN does not authorize all gasoline hardware — read OEM."],
  }),

  hdRow({
    id: "hd-canonical-0w30-arctic",
    productName: "KLONDIKE SAE 0W-30 Full Synthetic Heavy Duty Engine Oil",
    aliases: ["0w30 arctic ck4", "arctic performance 0w30", "0w30 full synthetic hd"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.arcticPerformance.branch,
    productPositioning: "Arctic Performance Technology CK-4 0W-30 for extreme low-temperature diesel starts.",
    viscosityPositioning: "SAE 0W-30; VI ~180; pour −54°C on index.",
    whatItIs:
      "Full synthetic CK-4 with Arctic Performance Technology for extreme cold severe-service diesel per shared 0W-30/0W-40 PDS family.",
    whyItWins:
      "Documentable arctic diesel tier with pour −54°C and VI ~180 on index — not automotive PCMO substitution.",
    emissionsPositioning: "CK-4 aftertreatment language on arctic family PDS.",
    fuelEconomyPositioning: "",
    coldStartPositioning:
      "Primary arctic cold-start story — oil pressure seconds after crank in extreme lows when OEM allows 0W-30.",
    severeDutyPositioning: "Severe-service diesel still requiring CK-4 in cold climates.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "CK-4 — separate from NG programs.",
    TBNStrategy: "TBN retention language on arctic family PDS.",
    OEMPositioning: "API CK-4; ACEA E9/E7/E4/E2; CES 20086; Detroit 93K222; Mack; Volvo on index.",
    applications: ["Arctic linehaul, plow, and mine cold-start programs with 0W-30 on OEM chart."],
    industries: ["trucking", "municipal", "construction", "mining"],
    customerPainSignals: [
      "Summer 15W-40 left in arctic season.",
      "0W-30 vs 0W-40 confusion on shared PDS PDF.",
    ],
    troubleshootingAssociations: ["sluggishColdStartup", "severeColdHydraulics"],
    upgradeStory: ["Seasonal switch from 15W-40 Professional to 0W-30 arctic when OEM seasonal bulletin allows."],
    repTalkTrack: [
      "Log coldest morning temperature — match to 0W-30 row pour column on Arctic PDS, not habit.",
    ],
    productSpotlightAngle: "Arctic Performance Program — 0W-30 row.",
    categorySpotlightRole: "**Arctic Performance Program** lead SAE where OEM permits 0W-30.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet", "mining_aggregate"],
    doNotConfuseWith: ["KLONDIKE SAE 0W-40 Full Synthetic HD — sibling SAE on same PDF.", "5W-40 full synthetic."],
    proofPoints: ["API CK-4; SAE 0W-30.", "VI ~180; pour −54°C.", "Arctic Performance Technology on index."],
    pdsMapKey: "0W-30 Full Synthetic",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 0W-30, SAE 0W-40 Full Synthetic Heavy Duty Engine Oils PDS.pdf",
    cautionNotes: [
      "Shared PDF with 0W-40 — quote correct SAE row per SKU.",
      "Arctic oil does not replace block heater or battery programs.",
    ],
  }),

  hdRow({
    id: "hd-canonical-0w40-arctic",
    productName: "KLONDIKE SAE 0W-40 Full Synthetic Heavy Duty Engine Oil",
    aliases: ["0w40 arctic ck4", "arctic performance 0w40"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.arcticPerformance.branch,
    productPositioning: "Arctic Performance Technology CK-4 0W-40 when OEM tags 0W-40 for arctic severe diesel.",
    viscosityPositioning: "SAE 0W-40; VI ~185; pour −51°C on index.",
    whatItIs:
      "Full synthetic CK-4 0W-40 with Arctic Performance Technology for severe cold diesel per indexed family PDS.",
    whyItWins:
      "Higher VI and 0W-40 film context when OEM specifies 0W-40 over 0W-30 in arctic duty — pour −51°C on index.",
    emissionsPositioning: "CK-4 severe-service aftertreatment positioning on family PDS.",
    fuelEconomyPositioning: "",
    coldStartPositioning: "Arctic cold-start when 0W-40 is the allowed SAE on nameplate.",
    severeDutyPositioning: "Severe arctic mobile diesel.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "CK-4 only.",
    TBNStrategy: "Per arctic family PDS index.",
    OEMPositioning: "API CK-4; CES 20086; Detroit 93K222; Mack; Volvo on shared sheet.",
    applications: ["Arctic diesel where OEM requires 0W-40 SAE."],
    industries: ["trucking", "municipal", "construction", "mining"],
    customerPainSignals: ["Mixing 0W-30 and 0W-40 top-offs.", "Assuming heavier 0W-40 is always better in cold."],
    troubleshootingAssociations: ["sluggishColdStartup"],
    upgradeStory: ["Pick 0W-40 vs 0W-30 from OEM SAE row only."],
    repTalkTrack: [
      "Dual-label bulk if both SAEs stocked — each label cites one PDS row only.",
    ],
    productSpotlightAngle: "Arctic Performance Program — 0W-40 row.",
    categorySpotlightRole: "**Arctic Performance Program** companion to 0W-30.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet", "mining_aggregate"],
    doNotConfuseWith: ["0W-30 arctic sibling on same PDF."],
    proofPoints: ["API CK-4; SAE 0W-40.", "VI ~185; pour −51°C."],
    pdsMapKey: "0W-40 Full Synthetic",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 0W-30, SAE 0W-40 Full Synthetic Heavy Duty Engine Oils PDS.pdf",
    cautionNotes: ["Inventory control critical on shared family PDS."],
  }),

  hdRow({
    id: "hd-canonical-40-mid-ash-sour-ng",
    productName: "KLONDIKE SAE 40 Mid Ash Sour Natural Gas Engine Oil",
    aliases: ["mid ash sour gas", "sae 40 mid ash sour", "sour natural gas mid ash"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.sourGas.branch,
    productPositioning: "Mid ash SAE 40 for sour or variable-quality natural gas — higher ash than low ash sour row.",
    viscosityPositioning: "SAE 40 mono-grade.",
    whatItIs:
      "Mid ash natural gas engine oil for medium/high-speed four-stroke engines on sour or variable gas per PDS index.",
    whyItWins:
      "Sulfated ash ~0.78% and TBN ~8.5 with stationary OEM classes when fuel analysis and OEM require mid ash sour strategy.",
    emissionsPositioning: "",
    fuelEconomyPositioning: "",
    coldStartPositioning: "",
    severeDutyPositioning: "Severe compression and cogeneration on sour gas.",
    naturalGasPositioning:
      "Ash and TBN strategy for sour gas — neutralize corrosive combustion by-products; not diesel CK-4.",
    railroadPositioning: "",
    catalystCompatibility: "Ash tier must match fuel H2S and catalyst limits — engineering selection between mid vs low sour rows.",
    TBNStrategy: "TBN ~8.5; sulfated ash 0.78% on index.",
    OEMPositioning:
      "API CF/CD; Caterpillar; Cummins Rio-Grande; Dresser-Rand Categories I–III; GE Jenbacher; Waukesha per index.",
    applications: ["Sour gas compression and co-gen with mid ash approval."],
    industries: ["natural gas compression", "cogeneration", "power generation", "mining"],
    customerPainSignals: [
      "Wrong ash tier for actual fuel quality.",
      "Diesel CK-4 top-off in gas sump.",
    ],
    troubleshootingAssociations: ["contamination"],
    upgradeStory: ["Select mid vs low sour vs pipeline SAE 40 from fuel analysis and OEM ash map."],
    repTalkTrack: [
      "Sour gas starts with fuel analysis — then pick mid ash SAE 40 from PDS, not diesel bulk.",
    ],
    productSpotlightAngle: "Natural Gas Reliability — mid ash sour SAE 40.",
    categorySpotlightRole: "**Natural Gas Engine Reliability Program** — sour branch.",
    customerProfileMatches: ["manufacturing", "mining_aggregate"],
    doNotConfuseWith: [
      "KLONDIKE SAE 40 Low Ash Sour Natural Gas.",
      "KLONDIKE SAE 40 Low Ash Natural Gas (pipeline).",
      "Any CK-4 diesel product.",
    ],
    proofPoints: ["API CF/CD; SAE 40.", "Sulfated ash 0.78%; TBN ~8.5.", "Stationary OEM lists on index."],
    pdsMapKey: "SAE 40 Mid Ash Sour Gas",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 40 Mid Ash Sour Natural Gas Engine Oil PDS.pdf",
    cautionNotes: ["Do not substitute low ash pipeline oil without engineering review."],
  }),

  hdRow({
    id: "hd-canonical-40-low-ash-sour-ng",
    productName: "KLONDIKE SAE 40 Low Ash Sour Natural Gas Engine Oil",
    aliases: ["low ash sour gas", "sae 40 low ash sour"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.sourGas.branch,
    productPositioning: "Low ash SAE 40 sour gas row with NSCR catalyst compatibility language on index.",
    viscosityPositioning: "SAE 40 mono-grade.",
    whatItIs:
      "Low ash SAE 40 natural gas engine oil for four-stroke engines on pipeline or sour gas under high load per PDS.",
    whyItWins:
      "Ash 0.5% and TBN ~5 with NSCR catalyst compatible positioning when OEM specifies this sour low ash tier.",
    emissionsPositioning: "",
    fuelEconomyPositioning: "",
    coldStartPositioning: "",
    severeDutyPositioning: "High-load sour gas stationary and field gas applications.",
    naturalGasPositioning: "Low ash sour strategy — catalyst and valve protection with lower ash than mid ash sour row.",
    railroadPositioning: "",
    catalystCompatibility: "NSCR catalyst compatible language on PDS index.",
    TBNStrategy: "TBN ~5; sulfated ash 0.5%.",
    OEMPositioning: "API CF/CD; Caterpillar; Cummins Rio-Grande; Dresser-Rand; Jenbacher; Waukesha on index.",
    applications: ["Sour gas with low ash OEM requirement."],
    industries: ["natural gas compression", "cogeneration", "power generation"],
    customerPainSignals: ["Mid vs low sour confusion.", "Diesel contamination."],
    troubleshootingAssociations: ["contamination"],
    upgradeStory: ["Document OEM ash tier before switching between sour rows."],
    repTalkTrack: [
      "Low ash sour is deliberate — match NSCR and ash lines on PDS to engine data plate.",
    ],
    productSpotlightAngle: "Natural Gas — low ash sour SAE 40.",
    categorySpotlightRole: "**Natural Gas Engine Reliability Program**.",
    customerProfileMatches: ["manufacturing", "mining_aggregate"],
    doNotConfuseWith: ["Mid ash sour SAE 40.", "Pipeline low ash SAE 40.", "CK-4 diesel."],
    proofPoints: ["Sulfated ash 0.5%; TBN ~5.", "NSCR catalyst compatible on index."],
    pdsMapKey: "SAE 40 Low Ash Sour Gas",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 40 Low Ash Sour Natural Gas Engine Oil PDS.pdf",
    cautionNotes: ["Confirm fuel H2S and OEM ash cap."],
  }),

  hdRow({
    id: "hd-canonical-40-low-ash-ng",
    productName: "KLONDIKE SAE 40 Low Ash Natural Gas Engine Oil",
    aliases: ["sae 40 low ash natural gas", "pipeline gas sae 40"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.naturalGas.branch,
    productPositioning: "Top-tier low ash SAE 40 for pipeline-quality natural gas engines.",
    viscosityPositioning: "SAE 40 mono-grade.",
    whatItIs:
      "Low ash SAE 40 natural gas engine oil for medium/high-speed engines on pipeline-quality gas per PDS index.",
    whyItWins:
      "Ash 0.48%; TBN ~5.1; oxidation and nitration resistance for clean gas co-gen per indexed summary.",
    emissionsPositioning: "",
    fuelEconomyPositioning: "",
    coldStartPositioning: "",
    severeDutyPositioning: "Stationary co-gen and compression clean gas duty.",
    naturalGasPositioning: "Pipeline-quality gas programs — valve cushioning and deposit control with low ash.",
    railroadPositioning: "",
    catalystCompatibility: "Low ash for catalyst protection on clean gas programs per OEM.",
    TBNStrategy: "TBN ~5.1; sulfated ash 0.48%.",
    OEMPositioning:
      "API CF; Caterpillar 3300–3600 series; Cummins Rio-Grande; Dresser-Rand; Jenbacher; Waukesha co-gen on index.",
    applications: ["Clean pipeline gas stationary engines."],
    industries: ["natural gas compression", "cogeneration", "power generation"],
    customerPainSignals: ["Nitration on lean-burn when drains slip.", "Wrong SAE 40 NG variant."],
    troubleshootingAssociations: ["oxidationVarnish"],
    upgradeStory: ["Pipeline SAE 40 vs multi-grade NG rows per OEM and cold start needs."],
    repTalkTrack: [
      "Clean gas still needs the right ash — SAE 40 low ash pipeline row on PDS, not diesel CK-4.",
    ],
    productSpotlightAngle: "Natural Gas — pipeline SAE 40 flagship.",
    categorySpotlightRole: "**Natural Gas Engine Reliability Program** — pipeline branch.",
    customerProfileMatches: ["manufacturing", "mining_aggregate"],
    doNotConfuseWith: ["Sour gas rows.", "CK-4 diesel.", "10W-40 NG multi-grade."],
    proofPoints: ["API CF; SAE 40.", "Ash 0.48%; TBN ~5.1.", "Waukesha co-gen callout on index."],
    pdsMapKey: "SAE 40 Low Ash Natural Gas",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE SAE 40 Low Ash Natural Gas Engine Oil PDS.pdf",
    cautionNotes: ["Not for sour gas without OEM approval of ash tier.", "Not diesel."],
  }),

  hdRow({
    id: "hd-canonical-10w40-low-ash-ng",
    productName: "KLONDIKE SAE 10W-40 Synthetic Blend Low Ash Natural Gas Heavy Duty Engine Oil",
    aliases: ["10w40 low ash natural gas", "ng 10w40 synthetic blend"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.naturalGas.branch,
    productPositioning: "Multi-grade low ash NG/LP 10W-40 with on-road and stationary approvals on index.",
    viscosityPositioning: "SAE 10W-40; VI ~152; pour −42°C; ash 0.53%.",
    whatItIs:
      "Synthetic blend low ash natural gas engine oil for modern four-stroke NG/LP engines per PDS index.",
    whyItWins:
      "CES 20074 and Detroit PGOS 93K216 with multi-grade cold start versus SAE 40 mono-grades — still NG chemistry, not CK-4.",
    emissionsPositioning: "",
    fuelEconomyPositioning: "",
    coldStartPositioning: "Pour −42°C for NG fleets needing multi-grade cold start per index.",
    severeDutyPositioning: "",
    naturalGasPositioning: "Low ash synthetic blend NG for modern engines and selected on-road NG programs.",
    railroadPositioning: "",
    catalystCompatibility: "Low ash 0.53% — catalyst-safe positioning per index; segregate from diesel CK-4 10W-40.",
    TBNStrategy: "Low ash strategy per NG PDS — not TBN ~10 diesel CK-4 story.",
    OEMPositioning: "CES 20074; Detroit PGOS 93K216; Waukesha Class A; Ingersoll Rand Class I/II on index.",
    applications: ["NG linehaul and modern stationary where multi-grade low ash is specified."],
    industries: ["trucking", "natural gas compression", "power generation"],
    customerPainSignals: [
      "CK-4 10W-40 diesel drum at NG bulk gun.",
      "Ash violations on catalyst engines.",
    ],
    troubleshootingAssociations: ["contamination"],
    upgradeStory: ["NG-only bulk labeling — never share gun with diesel synthetic blend 10W-40."],
    repTalkTrack: [
      "NG 10W-40 is CES 20074 chemistry — physically separate from CK-4 10W-40 diesel.",
    ],
    productSpotlightAngle: "Natural Gas — multi-grade 10W-40 low ash.",
    categorySpotlightRole: "**Natural Gas Engine Reliability Program** — on-road NG column.",
    customerProfileMatches: ["trucking_fleet", "manufacturing"],
    doNotConfuseWith: [
      "KLONDIKE SAE 10W-40 Synthetic Blend Heavy Duty Engine Oil (diesel CK-4).",
      "KLONDIKE 15W-40 Low Ash Natural Gas.",
    ],
    proofPoints: ["CES 20074; PGOS 93K216.", "Ash 0.53%; VI ~152; pour −42°C."],
    pdsMapKey: "10W-40 Low Ash Natural Gas",
    pdsFileHint:
      "Heavy Duty Engine Oils PDS/KLONDIKE SAE 10W-40 Synthetic Blend Low Ash Natural Gas Heavy Duty Engine Oil PDS.pdf",
    cautionNotes: ["Never use for API CK-4 diesel claims."],
  }),

  hdRow({
    id: "hd-canonical-15w40-low-ash-ng",
    productName: "KLONDIKE SAE 15W-40 Low Ash Natural Gas Engine Oil",
    aliases: ["15w40 low ash natural gas", "ng 15w40"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.naturalGas.branch,
    productPositioning: "Low ash 15W-40 NG/LP for on-road and selected stationary per CES 20074 / PGOS lines.",
    viscosityPositioning: "SAE 15W-40; ash 0.5%; pour −36°C; VI ~135.",
    whatItIs:
      "Low ash 15W-40 natural gas engine oil for NG/LP engines in on-road and selected stationary applications per PDS.",
    whyItWins:
      "Multi-grade convenience at 15W-40 viscosity with low ash and indexed on-road NG approvals — separate from diesel Professional 15W-40.",
    emissionsPositioning: "",
    fuelEconomyPositioning: "",
    coldStartPositioning: "Pour −36°C on index for NG 15W-40 programs.",
    severeDutyPositioning: "",
    naturalGasPositioning: "NG/LP 15W-40 low ash — not diesel CK-4 Professional Formula.",
    railroadPositioning: "",
    catalystCompatibility: "Ash 0.5% per index — NG catalyst discipline.",
    TBNStrategy: "Low ash — not diesel high-TBN CK-4 positioning.",
    OEMPositioning: "CES 20074; Detroit PGOS 93K216; Waukesha Class A; Ingersoll Rand on index.",
    applications: ["NG fleets specifying 15W-40 low ash."],
    industries: ["trucking", "natural gas compression", "power generation"],
    customerPainSignals: [
      "15W-40 word collision with diesel Professional drum.",
      "Wrong ash in NG catalyst engines.",
    ],
    troubleshootingAssociations: ["contamination"],
    upgradeStory: ["Mark NG bulk separately from diesel 15W-40 CK-4."],
    repTalkTrack: [
      "Fifteen-forty on the tag is not enough — confirm NG vs diesel on data plate before opening the valve.",
    ],
    productSpotlightAngle: "Natural Gas — 15W-40 low ash multi-grade.",
    categorySpotlightRole: "**Natural Gas Engine Reliability Program**.",
    customerProfileMatches: ["trucking_fleet", "manufacturing"],
    doNotConfuseWith: ["KLONDIKE Professional Formula 15W-40 diesel CK-4.", "SAE 40 NG mono-grades."],
    proofPoints: ["CES 20074; PGOS 93K216.", "Ash 0.5%; VI ~135; pour −36°C."],
    pdsMapKey: "15W-40 Low Ash Natural Gas",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE 15W-40 Low Ash Natural Gas Engine Oil PDS.pdf",
    cautionNotes: ["Not API CK-4 diesel — never cross-merchandise with Professional 15W-40."],
  }),

  hdRow({
    id: "hd-canonical-single-grade-diesel",
    productName: "KLONDIKE Single Grade Diesel Engine Oils",
    aliases: ["single grade diesel", "cf2 diesel", "legacy single grade"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.legacySingleGrade.branch,
    productPositioning: "Legacy API CF-2/CF single-grade family for non-DPF diesel only.",
    viscosityPositioning: "SAE 10W / 30 / 40 / 50 ladder per PDS — not CK-4 multi-grade.",
    whatItIs:
      "Heavy duty single-grade diesel engine oils for older naturally aspirated, turbocharged, and supercharged diesels per API CF-2/CF on PDS index.",
    whyItWins:
      "Honest legacy lane with CID A-A-52306, MB 228.2, MAN, and MTU categories when OEM still lists CF family — fenced from CK-4 programs.",
    emissionsPositioning: "Pre-DPF legacy service — not for modern EPA aftertreatment hardware without OEM exception.",
    fuelEconomyPositioning: "",
    coldStartPositioning: "",
    severeDutyPositioning:
      "Mining, construction, farm, forestry, marine, generator, and selected transmission applications per PDS where OEM allows.",
    naturalGasPositioning: "",
    railroadPositioning: "",
    catalystCompatibility: "Not CK-4 DPF chemistry — legacy API CF-2/CF only.",
    TBNStrategy: "TBN ~7.5 on index.",
    OEMPositioning: "API CF-2 / CF; API SG; CID A-A-52306; MB 228.2; MAN 3275-2 / 270; MTU Category 1/2.",
    applications: ["Legacy diesel and selected industrial uses per OEM chart."],
    industries: ["mining", "construction", "agriculture", "marine", "power generation"],
    customerPainSignals: [
      "Accidental CK-4 fill on legacy iron.",
      "Assuming single grade equals universal ag oil.",
    ],
    troubleshootingAssociations: ["contamination", "oxidationVarnish"],
    upgradeStory: ["Legacy iron staying on CF ladder — upgrade to CK-4 Professional only when OEM and hardware allow."],
    repTalkTrack: [
      "Fence legacy bulk: NON-DPF / CF family only — read year and emissions hardware before any CK-4 drum.",
    ],
    productSpotlightAngle: "Professional Protection Program — legacy single-grade footnote.",
    categorySpotlightRole: "Legacy niche in **Professional Protection Program** — not CK-4 substitute.",
    customerProfileMatches: ["agriculture", "construction", "mining_aggregate", "manufacturing"],
    doNotConfuseWith: ["All CK-4 products including Professional Formula.", "9TBN Railroad zinc-free."],
    proofPoints: ["API CF-2 / CF.", "SAE 10W–50 ladder.", "TBN ~7.5.", "MAN / MTU / MB legacy lines on index."],
    pdsMapKey: "Single Grade Diesel",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE Single Grade Diesel Engine Oils PDS.pdf",
    cautionNotes: [
      "Never position as CK-4 replacement.",
      "Verify OEM allows API CF family for each engine.",
    ],
  }),

  hdRow({
    id: "hd-canonical-9tbn-railroad",
    productName: "KLONDIKE 9TBN Railroad Engine Oil",
    aliases: ["9tbn railroad", "railroad engine oil", "zinc free railroad", "sae 20w40 railroad", "sae 40 railroad"],
    hierarchyBranch: HD_ENGINE_OIL_CANONICAL_HIERARCHY_REF.railroadZincFree.branch,
    productPositioning: "Ashless zinc-free specialty for railroad, marine, and power generation per API CF and OEM generations on PDS.",
    viscosityPositioning: "SAE 40 / SAE 20W-40 on index.",
    whatItIs:
      "Ashless, zinc-free railroad engine oil for large two- and four-stroke diesels in railroad, marine, and power generation per PDS index.",
    whyItWins:
      "Protects silver bearings with zinc-free chemistry, TBN ~9, and high soot dispersancy when EMD/GE generation lists on PDS match — not highway CK-4.",
    emissionsPositioning: "",
    fuelEconomyPositioning: "",
    coldStartPositioning: "",
    severeDutyPositioning: "Continuous-duty stationary and rail prime movers.",
    naturalGasPositioning: "",
    railroadPositioning:
      "Zinc-free railroad/marine/power specialty — EMD zinc-free, LMAO Gen 4–6, GE Gen 4 Long-Life language on index.",
    catalystCompatibility: "Zinc-free for silver bearing programs — CK-4 zinc AW chemistry is wrong category.",
    TBNStrategy: "TBN ~9 on index.",
    OEMPositioning: "API CF; EMD zinc-free; LMAO Generation 4/5/6; GE Generation 4 Long-Life per PDS map.",
    applications: ["Railroad, marine, and power generation diesels requiring zinc-free program per OEM."],
    industries: ["marine", "power generation", "municipal", "mining"],
    customerPainSignals: [
      "Zinc from CK-4 damaging silver bearings.",
      "Highway bulk routed into EMD programs.",
    ],
    troubleshootingAssociations: ["contamination", "pumpWear"],
    upgradeStory: ["Dedicated specialty tote — never upgrade from CK-4; parallel chemistry class."],
    repTalkTrack: [
      "Rail shops speak generation numbers — match LMAO / GE lines on 9TBN PDS before first fill.",
    ],
    productSpotlightAngle: "Advanced Mixed Fleet — 9TBN railroad/zinc-free specialty column.",
    categorySpotlightRole: "Specialty in **Advanced Mixed Fleet Program** (rail/marine/power only).",
    customerProfileMatches: ["manufacturing", "municipal_fleet", "mining_aggregate"],
    doNotConfuseWith: [
      "All CK-4 highway diesel products.",
      "Natural gas engine oils.",
    ],
    proofPoints: [
      "API CF.",
      "Zinc-free chemistry.",
      "TBN ~9.",
      "EMD zinc-free; LMAO Gen 4–6; GE Gen 4 Long-Life.",
      "Silver bearing protection language on index.",
    ],
    pdsMapKey: "9TBN Railroad",
    pdsFileHint: "Heavy Duty Engine Oils PDS/KLONDIKE 9TBN Railroad Engine Oil PDS.pdf",
    cautionNotes: [
      "Never substitute CK-4 fleet oil for EMD zinc-free programs.",
      "Marine/rail approvals are specialty — do not generalize to on-highway Class 8.",
    ],
  }),
];

/** @type {Readonly<Record<string, HdEngineOilCanonicalProductIntelligence>>} */
const HD_ENGINE_OIL_CANONICAL_BY_ID = Object.freeze(
  Object.fromEntries(HD_ENGINE_OIL_CANONICAL_PRODUCT_ROWS.map((p) => [p.id, p]))
);

/** @type {Readonly<{ version: number, category: "hd_engine_oils", products: readonly HdEngineOilCanonicalProductIntelligence[] }>} */
export const HD_ENGINE_OIL_CANONICAL_PRODUCT_INTELLIGENCE = Object.freeze({
  version: HD_ENGINE_OIL_CANONICAL_PRODUCT_INTELLIGENCE_VERSION,
  category: "hd_engine_oils",
  products: Object.freeze(HD_ENGINE_OIL_CANONICAL_PRODUCT_ROWS),
});

/** @returns {readonly HdEngineOilCanonicalProductIntelligence[]} */
export function listHdEngineOilCanonicalProductIntelligence() {
  return HD_ENGINE_OIL_CANONICAL_PRODUCT_INTELLIGENCE.products;
}

/**
 * @param {unknown} id
 * @returns {HdEngineOilCanonicalProductIntelligence | null}
 */
export function getHdEngineOilCanonicalProductIntelligenceById(id) {
  const key = String(id ?? "").trim();
  if (!key) return null;
  return HD_ENGINE_OIL_CANONICAL_BY_ID[key] || null;
}

/**
 * @param {unknown} pdsMapKey
 * @returns {HdEngineOilCanonicalProductIntelligence | null}
 */
export function getHdEngineOilCanonicalProductIntelligenceByPdsKey(pdsMapKey) {
  const key = String(pdsMapKey ?? "").trim();
  if (!key) return null;
  return HD_ENGINE_OIL_CANONICAL_PRODUCT_INTELLIGENCE.products.find((p) => p.pdsMapKey === key) || null;
}
