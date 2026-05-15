/**
 * Canonical KLONDIKE AGRIMAX / agricultural OEM alignment intelligence (deterministic source text).
 * Grounded on indexed `pdsMap.js` rows and AGRIMAX PDS PDFs — confirm lines on live PDS before quoting.
 * Not wired to resolver or UI in this module.
 */

/** @type {number} */
export const AGRI_OEM_CANONICAL_PRODUCT_INTELLIGENCE_VERSION = 1;

/**
 * @type {Readonly<Record<string, { branch: string, segment: string, description: string }>>}
 */
export const AGRI_OEM_CANONICAL_HIERARCHY_REF = Object.freeze({
  johnDeereElc: Object.freeze({
    branch: "john_deere_elc_premix",
    segment: "ag_oem_coolant_john_deere",
    description:
      "AGRIMAX Green ELC premix — John Deere COOL GARD II aligned nitrite-free OAT coolant; not CNH MAT coolant rows.",
  }),
  cnhElc: Object.freeze({
    branch: "cnh_case_ih_elc_premix",
    segment: "ag_oem_coolant_cnh",
    description:
      "AGRIMAX Red ELC premix — CNH MAT 3724 / 3624 aligned nitrite-free OAT coolant; not John Deere COOL GARD II rows.",
  }),
  johnDeereHd: Object.freeze({
    branch: "john_deere_hd_ck4_15w40",
    segment: "ag_oem_hd_engine_oil_john_deere",
    description:
      "AGRIMAX Green 15W-40 CK-4 synthetic blend — John Deere PLUS 50 II aligned; not CNH MAT 3572 row.",
  }),
  cnhHd: Object.freeze({
    branch: "cnh_case_ih_hd_ck4_15w40",
    segment: "ag_oem_hd_engine_oil_cnh",
    description:
      "AGRIMAX Red 15W-40 CK-4 synthetic blend — CNH MAT 3572 aligned; not John Deere PLUS 50 II row.",
  }),
  johnDeereTransDrive: Object.freeze({
    branch: "john_deere_trans_drive_hydraulic",
    segment: "ag_oem_trans_hydraulic_john_deere",
    description:
      "AGRIMAX Green Trans Drive — John Deere JDM J-20C aligned common oil; not CNH zinc-free MAT 3544/3540 row.",
  }),
  cnhTransDrive: Object.freeze({
    branch: "cnh_case_ih_zinc_free_trans_drive",
    segment: "ag_oem_trans_hydraulic_cnh",
    description:
      "AGRIMAX Red zinc-free Trans Drive — CNH MAT 3544 / MAT 3540 aligned; not John Deere JDM J-20C row.",
  }),
  polyTacGrease: Object.freeze({
    branch: "agrimax_poly_tac_ep2",
    segment: "ag_oem_polyurea_grease",
    description:
      "KLONDIKE POLY TAC EP-2 polyurea severe-duty grease (AGRIMAX-branded PDS file); not lithium or moly grease canonical rows.",
  }),
});

/** @type {readonly string[]} */
const SHARED_AGRI_ROUTING_KEYWORDS = Object.freeze([
  "agrimax",
  "agri max",
  "agriculture oem",
  "ag oem",
  "klondike agrimax",
  "farm equipment",
  "agricultural equipment",
  "tractor",
  "combine",
]);

/** @type {readonly string[]} */
const DISAMBIGUATION_CAUTIONS = Object.freeze([
  "AGRIMAX / Ag OEM intelligence supplements — does not replace coolant, hydraulic, HD engine oil, or grease canonical category files.",
  "Green AGRIMAX records are John Deere-aligned; Red AGRIMAX records are CNH / Case IH-aligned — do not collapse by chemistry alone.",
  "Long Life Turbine Oils remain in hydraulic canonical intelligence — not this module.",
  "RED TAC and non-AGRIMAX grease rows remain in grease canonical intelligence.",
]);

/**
 * @typedef {Record<string, string | number>} AgriOemTechnicalProperties
 */

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   productFamily: string,
 *   category: string,
 *   marketSegment: string,
 *   oemAlignment: string,
 *   oemColorIdentity: string,
 *   equipmentSegment: string,
 *   applicationSegment: string,
 *   formulation: string,
 *   viscosityGrade: string,
 *   saeGrade: string | null,
 *   isoGrade: string | null,
 *   nlgiGrade: string | null,
 *   thickenerType: string | null,
 *   coolantChemistry: string | null,
 *   pdsMapKey: string | null,
 *   pdsFileName: string,
 *   aliases: string[],
 *   routingKeywords: string[],
 *   applications: string[],
 *   specifications: string[],
 *   approvals: string[],
 *   differentiators: string[],
 *   cautions: string[],
 *   bestFit: string[],
 *   notBestFit: string[],
 *   technicalProperties: AgriOemTechnicalProperties,
 *   productNumbers: string[],
 *   salesPositioning: string,
 *   customerProfileSignals: string[],
 *   customerProfileQuestions: string[],
 *   salesEnablementAngles: string[],
 *   productSpotlightAngles: string[],
 *   categorySpotlightAngles: string[],
 *   crossSellSignals: string[],
 *   operationalPainPoints: string[],
 *   oemConquestSignals: string[],
 *   accountSegmentationSignals: string[],
 *   sourceNotes: string[],
 * }} AgriOemCanonicalProductIntelligence
 */

/** @param {AgriOemCanonicalProductIntelligence} row */
function freezeAgriOemRow(row) {
  const listKeys = [
    "aliases",
    "routingKeywords",
    "applications",
    "specifications",
    "approvals",
    "differentiators",
    "cautions",
    "bestFit",
    "notBestFit",
    "productNumbers",
    "customerProfileSignals",
    "customerProfileQuestions",
    "salesEnablementAngles",
    "productSpotlightAngles",
    "categorySpotlightAngles",
    "crossSellSignals",
    "operationalPainPoints",
    "oemConquestSignals",
    "accountSegmentationSignals",
    "sourceNotes",
  ];
  /** @type {Record<string, unknown>} */
  const frozen = { ...row };
  for (const key of listKeys) {
    const val = row[key];
    frozen[key] = Object.freeze([...(Array.isArray(val) ? val : [])]);
  }
  return Object.freeze(frozen);
}

/**
 * @param {Partial<AgriOemCanonicalProductIntelligence> &
 *   Pick<AgriOemCanonicalProductIntelligence, "id" | "productName">} row
 */
function agriOemRow(row) {
  return freezeAgriOemRow({
    productFamily: "",
    category: "agri_oem",
    marketSegment: "",
    oemAlignment: "",
    oemColorIdentity: "",
    equipmentSegment: "",
    applicationSegment: "",
    formulation: "",
    viscosityGrade: "",
    saeGrade: null,
    isoGrade: null,
    nlgiGrade: null,
    thickenerType: null,
    coolantChemistry: null,
    pdsMapKey: null,
    pdsFileName: "",
    aliases: [],
    routingKeywords: [],
    applications: [],
    specifications: [],
    approvals: [],
    differentiators: [],
    cautions: [...DISAMBIGUATION_CAUTIONS],
    bestFit: [],
    notBestFit: [],
    technicalProperties: Object.freeze({}),
    productNumbers: [],
    salesPositioning: "",
    customerProfileSignals: [],
    customerProfileQuestions: [],
    salesEnablementAngles: [],
    productSpotlightAngles: [],
    categorySpotlightAngles: [],
    crossSellSignals: [],
    operationalPainPoints: [],
    oemConquestSignals: [],
    accountSegmentationSignals: [],
    sourceNotes: [],
    ...row,
    routingKeywords: Object.freeze([...SHARED_AGRI_ROUTING_KEYWORDS, ...(row.routingKeywords || [])]),
    cautions: Object.freeze([...DISAMBIGUATION_CAUTIONS, ...(row.cautions || [])]),
  });
}

/** @type {AgriOemCanonicalProductIntelligence[]} */
const AGRI_OEM_CANONICAL_PRODUCT_ROWS = [
  agriOemRow({
    id: "agri-oem-canonical-agrimax-john-deere-elc-premix-green",
    productName: "AGRIMAX Extended Life Coolant Premix 50/50",
    productFamily: "agrimax_elc_premix",
    marketSegment: "agricultural_forestry_construction",
    oemAlignment: "John Deere",
    oemColorIdentity: "Green (AGRIMAX Green); PDS technical color: Gold",
    equipmentSegment: "john_deere_heavy_duty_diesel",
    applicationSegment: "extended_life_coolant_premix",
    hierarchyBranch: AGRI_OEM_CANONICAL_HIERARCHY_REF.johnDeereElc.branch,
    viscosityGrade: "50/50 premix",
    formulation: "Virgin ethylene glycol based engine coolant; nitrite-free OAT inhibitor technology.",
    coolantChemistry:
      "Proven non 2-EH; NAPS free; nitrite-free; OAT inhibitor technology; ethylene glycol premix 50/50.",
    pdsMapKey: "Extended Life Coolant 50/50 JD",
    pdsFileName: "KLONDIKE AGRIMAX Extended Life Coolant Premix Antifreeze Coolant Green PDS.pdf",
    aliases: [
      "agrimax extended life coolant premix 50/50 green",
      "agrimax elc green",
      "agrimax coolant green",
      "cool gard ii agrimax",
      "john deere agrimax coolant",
    ],
    routingKeywords: [
      "john deere",
      "deere",
      "jdm",
      "cool gard ii",
      "cool-gard ii",
      "agrimax coolant",
      "extended life coolant",
      "nitrite free coolant",
      "oat coolant",
      "tier iv",
      "forestry equipment",
      "construction equipment",
    ],
    applications: [
      "John Deere heavy duty agricultural, forestry, and construction equipment.",
      "Heavy-duty engines where OEM recommends or specifies nitrite-free extended life coolant.",
      "Mixed fleets of heavy and light-duty vehicles/equipment on all fuel types where one coolant is preferred.",
      "Stationary engine applications requiring minimum maintenance and maximum reliability.",
    ],
    specifications: [
      "John Deere COOL GARD II",
      "ASTM D6210",
      "ASTM D3306",
    ],
    approvals: ["John Deere COOL GARD II", "ASTM D6210", "ASTM D3306"],
    differentiators: [
      "Nitrite-free extended life coolant.",
      "Long service life.",
      "Minimum maintenance — no supplemental coolant additives required per PDS positioning.",
      "Compatible with major brands of OAT-based ELC coolants per PDS.",
      "6 years or 6,000 hours when used per OE-mandated service and maintenance guidelines per PDS.",
    ],
    cautions: [
      "Compatible with other nitrite-free OAT coolants per PDS.",
      "Dilution with other coolant chemistry may affect performance and expected service life.",
      "Always follow OEM antifreeze/coolant recommendations.",
      "Contains bittering agent.",
      "KLONDIKE is not affiliated with or endorsed by Deere & Company.",
    ],
    bestFit: [
      "John Deere-aligned dealer or fleet programs specifying COOL GARD II class nitrite-free OAT ELC premix.",
      "Agricultural, forestry, and construction mixed fleets standardizing on one nitrite-free OAT premix per PDS.",
    ],
    notBestFit: [
      "CNH / Case IH MAT 3724 / 3624 primary coolant programs — use AGRIMAX Red ELC CNH row.",
      "Non-OAT or nitrite-required coolant specifications.",
    ],
    technicalProperties: Object.freeze({
      specificGravityAstmd1122: "1.110–1.125",
      boilingPoint50PctAstmd1120: "107°C / 226°F min",
      freezePoint50PctAstmd1177: "-36.7°C / -34°F min",
      ph50PctAstmd1287: 8.6,
      foamingAstmd1881: "150 ml volume max, 5 sec break max",
      effectOnNonMetals: "No adverse effect",
      effectOnVehicleFinish: "No adverse effect",
      color: "Gold",
    }),
    productNumbers: ["Jug 3.78 L / 1 GAL: KL-AG9650", "Drum 208 L / 55 GAL: KL-AG9690"],
    salesPositioning:
      "Virgin ethylene glycol nitrite-free OAT ELC premix 50/50 purpose-engineered for John Deere heavy duty diesel equipment in agricultural, forestry, and construction service.",
    customerProfileSignals: [
      "Dealer or fleet appears John Deere-aligned",
      "Uses COOL GARD II coolant",
      "Tier IV agricultural diesel engines",
      "Mixed agricultural/construction fleet",
    ],
    customerProfileQuestions: [
      "Is this account primarily John Deere, CNH/Case IH, or mixed fleet?",
      "Are they currently buying OEM-branded COOL GARD II / CNH MAT coolant?",
      "Do they want an OEM-aligned bundle across coolant, engine oil, trans/hydraulic, and grease?",
    ],
    salesEnablementAngles: [
      "Anchor nitrite-free OAT ELC premix to John Deere COOL GARD II alignment on indexed PDS map row.",
      "Position 6 years / 6,000 hours service interval language only as printed on PDS.",
    ],
    productSpotlightAngles: ["AGRIMAX Green ELC premix — John Deere COOL GARD II indexed row."],
    categorySpotlightAngles: ["Ag OEM coolant column — Green vs Red OEM alignment disambiguation."],
    crossSellSignals: [
      "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Green — John Deere PLUS 50 II",
      "AGRIMAX Trans Drive Hydraulic Fluid Green — JDM J-20C",
      "KLONDIKE POLY TAC EP-2 polyurea grease",
    ],
    operationalPainPoints: [
      "Coolant chemistry top-off compatibility",
      "Extended drain interval maintenance planning",
    ],
    oemConquestSignals: [
      "Account buys John Deere COOL GARD II or dealer-branded equivalent",
      "John Deere tractor/combine service bay stocking Green AGRIMAX",
    ],
    accountSegmentationSignals: ["John Deere primary", "Agricultural dealer Green column", "Forestry/construction Deere fleet"],
    sourceNotes: ["pdsMapKey: Extended Life Coolant 50/50 JD", "PDS product title: AGRIMAX Extended Life Coolant Premix 50/50"],
  }),

  agriOemRow({
    id: "agri-oem-canonical-agrimax-cnh-case-ih-elc-premix-red",
    productName: "AGRIMAX Extended Life Coolant Premix 50/50",
    productFamily: "agrimax_elc_premix",
    marketSegment: "agricultural_forestry_construction",
    oemAlignment: "CNH / Case IH",
    oemColorIdentity: "Red",
    equipmentSegment: "cnh_case_ih_heavy_duty_diesel",
    applicationSegment: "extended_life_coolant_premix",
    hierarchyBranch: AGRI_OEM_CANONICAL_HIERARCHY_REF.cnhElc.branch,
    viscosityGrade: "50/50 premix",
    formulation: "Virgin ethylene glycol based engine coolant; advanced OAT organic acid technology.",
    coolantChemistry:
      "Advanced OAT organic acid technology; non-2-EH; nitrite-free; phosphate-free; silicate-free; borate-free; amine-free; ethylene glycol premix 50/50.",
    pdsMapKey: "Extended Life Coolant 50/50 CNH",
    pdsFileName: "KLONDIKE AGRIMAX Extended Life Coolant Premix Antifreeze Coolant Red PDS.pdf",
    aliases: [
      "agrimax extended life coolant premix 50/50 red",
      "agrimax elc red",
      "agrimax coolant red",
      "cnh mat 3724 agrimax",
      "case ih agrimax coolant",
    ],
    routingKeywords: [
      "case ih",
      "cnh",
      "cnh mat",
      "mat 3724",
      "mat 3624",
      "agrimax coolant",
      "extended life coolant",
      "nitrite free coolant",
      "oat coolant",
      "tier iv",
      "forestry equipment",
      "construction equipment",
    ],
    applications: [
      "CNH and Case IH heavy duty agricultural, forestry, and construction equipment.",
      "Heavy-duty engines where OEM recommends nitrite-free extended life coolant.",
      "Mixed fleets of heavy and light-duty vehicles/equipment on all fuel types.",
      "Stationary engine applications requiring minimum maintenance and maximum reliability.",
    ],
    specifications: ["CNH MAT 3724", "CNH MAT 3624", "ASTM D6210", "ASTM D3306"],
    approvals: ["CNH MAT 3724", "CNH MAT 3624", "ASTM D6210", "ASTM D3306"],
    differentiators: [
      "Nitrite-free extended life coolant.",
      "Long service life.",
      "Minimum maintenance — no supplemental coolant additives required per PDS positioning.",
      "Compatible with major brands of OAT-based ELC coolants per PDS.",
      "6 years or 6,000 hours when used per OE-mandated service and maintenance guidelines per PDS.",
    ],
    cautions: [
      "Compatible with other nitrite-free OAT coolants per PDS.",
      "Dilution with other coolant chemistry may affect performance and expected service life.",
      "Always follow OEM antifreeze/coolant recommendations.",
      "Contains bittering agent.",
      "KLONDIKE is not affiliated with or endorsed by CNH Industrial America LLC.",
    ],
    bestFit: [
      "CNH / Case IH-aligned dealer or fleet programs specifying MAT 3724 / 3624 class nitrite-free OAT ELC premix.",
    ],
    notBestFit: [
      "John Deere COOL GARD II primary coolant programs — use AGRIMAX Green ELC John Deere row.",
    ],
    technicalProperties: Object.freeze({
      specificGravityAstmd1122: "1.110–1.125",
      boilingPoint50PctAstmd1120: "107°C / 226°F min",
      freezePoint50PctAstmd1177: "-36.7°C / -34°F min",
      ph50PctAstmd1287: 8.6,
      foamingAstmd1881: "150 ml volume max, 5 sec break max",
      effectOnNonMetals: "No adverse effect",
      effectOnVehicleFinish: "No adverse effect",
      color: "Red",
    }),
    productNumbers: ["Jug 3.78 L / 1 GAL: KL-AG9850", "Drum 208 L / 55 GAL: KL-AG9890"],
    salesPositioning:
      "Virgin ethylene glycol nitrite-free OAT ELC premix 50/50 purpose-engineered for CNH and Case IH heavy duty diesel equipment in agricultural, forestry, and construction service.",
    customerProfileSignals: [
      "Dealer or fleet appears CNH / Case IH-aligned",
      "Uses CNH MAT 3724 coolant",
      "Tier IV agricultural diesel engines",
      "Mixed agricultural/construction fleet",
    ],
    customerProfileQuestions: [
      "Is this account primarily John Deere, CNH/Case IH, or mixed fleet?",
      "Are they currently buying OEM-branded COOL GARD II / CNH MAT coolant?",
      "Do they want an OEM-aligned bundle across coolant, engine oil, trans/hydraulic, and grease?",
    ],
    salesEnablementAngles: [
      "Anchor nitrite-free OAT ELC premix to CNH MAT 3724 / 3624 alignment on indexed PDS map row.",
    ],
    productSpotlightAngles: ["AGRIMAX Red ELC premix — CNH MAT 3724 / 3624 indexed row."],
    categorySpotlightAngles: ["Ag OEM coolant column — Red CNH vs Green John Deere alignment."],
    crossSellSignals: [
      "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Red — CNH MAT 3572",
      "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid Red — MAT 3544 / 3540",
      "KLONDIKE POLY TAC EP-2 polyurea grease",
    ],
    operationalPainPoints: ["Coolant chemistry top-off compatibility", "Fleet standardization across CNH brands"],
    oemConquestSignals: [
      "Account buys CNH MAT 3724 / 3624 or Case IH branded coolant",
      "CNH dealer Red AGRIMAX column opportunity",
    ],
    accountSegmentationSignals: ["CNH / Case IH primary", "Agricultural dealer Red column"],
    sourceNotes: ["pdsMapKey: Extended Life Coolant 50/50 CNH"],
  }),

  agriOemRow({
    id: "agri-oem-canonical-agrimax-john-deere-15w40-ck4-synthetic-blend-green",
    productName: "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil",
    productFamily: "agrimax_hd_engine_oil",
    marketSegment: "agricultural_construction_off_highway",
    oemAlignment: "John Deere",
    oemColorIdentity: "Green",
    equipmentSegment: "john_deere_tier_iv_and_legacy_diesel",
    applicationSegment: "hd_diesel_engine_oil_ck4",
    hierarchyBranch: AGRI_OEM_CANONICAL_HIERARCHY_REF.johnDeereHd.branch,
    viscosityGrade: "SAE 15W-40",
    saeGrade: "15W-40",
    formulation: "Synthetic blend heavy duty engine oil; premium base oil per PDS.",
    pdsMapKey: "15W-40 CK-4 Synthetic Blend JD",
    pdsFileName:
      "KLONDIKE AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil Green PDS.pdf",
    aliases: [
      "agrimax 15w40 green",
      "agrimax 15w-40 ck-4 green",
      "plus 50 ii agrimax",
      "john deere agrimax 15w40",
    ],
    routingKeywords: [
      "john deere",
      "deere",
      "plus 50 ii",
      "agrimax 15w40",
      "ck-4",
      "tier iv",
      "tractor",
      "combine",
      "agricultural equipment",
      "construction equipment",
    ],
    applications: [
      "John Deere agricultural, forestry, and construction equipment with modern Tier IV or prior legacy engine platforms.",
      "Heavy-duty off-road diesel engine platforms where API CK-4 engine oil is required by OEM.",
    ],
    specifications: ["John Deere PLUS 50 II Heavy Duty Engine Oil", "API CK-4 licensed"],
    approvals: ["John Deere PLUS 50 II Heavy Duty Engine Oil", "API CK-4 licensed"],
    differentiators: [
      "Premium base oil per PDS.",
      "Engine efficiency / clean internal engine components / reduced oil consumption per PDS.",
      "Outstanding anti-wear per PDS.",
      "Emission compliant / modern emission control equipment / DPF life per PDS.",
      "Extended service life / high initial TBN / synthetic shear stability improvers per PDS.",
    ],
    cautions: [
      "Always follow OEM fluid viscosity and API service category.",
      "KLONDIKE takes no responsibility for misuse/misapplication.",
      "KLONDIKE is not affiliated with or endorsed by Deere & Company.",
    ],
    bestFit: [
      "John Deere Tier IV and prior-generation diesel platforms requiring API CK-4 15W-40 per OEM.",
    ],
    notBestFit: [
      "CNH MAT 3572 primary 15W-40 programs — use AGRIMAX Red 15W-40 CNH row.",
      "FA-4-only specifications.",
    ],
    technicalProperties: Object.freeze({
      apiGravity: 32.5,
      specificGravityAt15_6C: 0.876,
      viscosity40C: 118,
      viscosity100C: 15.7,
      viscosityIndex: 140,
      flashPointC: 225,
      pourPointC: -37,
      ccsAtMinus20C: 5250,
      hthsAt150C: 4.2,
      sulfatedAshWtPct: 0.99,
      pumpingViscosityAtMinus25C: 20000,
      tbnMgKohG: 10,
    }),
    productNumbers: [
      "Jug 4.73 L / 1.25 GAL: KL-AG1560",
      "Pail 18.9 L / 5 GAL: KL-AG1580",
      "Drum 208 L / 55 GAL: KL-AG1590",
      "Tote 1040 L / 275 GAL: KL-AG1595",
    ],
    salesPositioning:
      "High-performance SAE 15W-40 CK-4 synthetic blend engine oil purpose-engineered for John Deere Tier IV and prior-generation diesel engines in agricultural and construction equipment.",
    customerProfileSignals: [
      "Dealer or fleet appears John Deere-aligned",
      "Uses PLUS 50 II-style 15W-40 CK-4",
      "Tier IV agricultural diesel engines",
    ],
    customerProfileQuestions: [
      "Are they servicing Tier IV diesel engines that require API CK-4?",
      "Is this account primarily John Deere, CNH/Case IH, or mixed fleet?",
      "Do they want an OEM-aligned bundle across coolant, engine oil, trans/hydraulic, and grease?",
    ],
    salesEnablementAngles: [
      "Position API CK-4 licensed 15W-40 with John Deere PLUS 50 II alignment per indexed PDS.",
      "Quote TBN and HTHS only from printed PDS property table.",
    ],
    productSpotlightAngles: ["AGRIMAX Green 15W-40 CK-4 — John Deere PLUS 50 II indexed row."],
    categorySpotlightAngles: ["Ag OEM HD engine oil — Green John Deere vs Red CNH MAT 3572."],
    crossSellSignals: [
      "AGRIMAX Extended Life Coolant Premix Green",
      "AGRIMAX Trans Drive Hydraulic Fluid Green",
      "KLONDIKE POLY TAC EP-2 polyurea grease",
    ],
    operationalPainPoints: ["DPF and emission system compatibility", "Drain interval vs TBN"],
    oemConquestSignals: ["John Deere PLUS 50 II bulk or packaged purchases", "Deere dealer engine oil column"],
    accountSegmentationSignals: ["John Deere primary", "CK-4 15W-40 ag/construction"],
    sourceNotes: ["pdsMapKey: 15W-40 CK-4 Synthetic Blend JD"],
  }),

  agriOemRow({
    id: "agri-oem-canonical-agrimax-cnh-case-ih-15w40-ck4-synthetic-blend-red",
    productName: "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil",
    productFamily: "agrimax_hd_engine_oil",
    marketSegment: "agricultural_construction_off_highway",
    oemAlignment: "CNH / Case IH",
    oemColorIdentity: "Red",
    equipmentSegment: "cnh_case_ih_tier_iv_and_legacy_diesel",
    applicationSegment: "hd_diesel_engine_oil_ck4",
    hierarchyBranch: AGRI_OEM_CANONICAL_HIERARCHY_REF.cnhHd.branch,
    viscosityGrade: "SAE 15W-40",
    saeGrade: "15W-40",
    formulation: "Synthetic blend heavy duty engine oil; premium base oil per PDS.",
    pdsMapKey: "15W-40 CK-4 Synthetic Blend CNH",
    pdsFileName:
      "KLONDIKE AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil Red PDS.pdf",
    aliases: [
      "agrimax 15w40 red",
      "agrimax 15w-40 ck-4 red",
      "cnh mat 3572 agrimax",
      "case ih agrimax 15w40",
    ],
    routingKeywords: [
      "case ih",
      "cnh",
      "cnh mat",
      "mat 3572",
      "agrimax 15w40",
      "ck-4",
      "tier iv",
      "tractor",
      "combine",
    ],
    applications: [
      "Case IH and CNH agricultural, forestry, and construction equipment with modern Tier IV or prior generation diesel engines.",
      "Heavy-duty off-road diesel engine platforms where API CK-4 engine oil is required by OEM.",
    ],
    specifications: ["CNH MAT 3572 Heavy Duty Engine Oil", "API CK-4 licensed"],
    approvals: ["CNH MAT 3572 Heavy Duty Engine Oil", "API CK-4 licensed"],
    differentiators: [
      "Premium base oil per PDS.",
      "Engine efficiency / clean internal engine components / reduced oil consumption per PDS.",
      "Outstanding anti-wear per PDS.",
      "Emission compliant / modern emission control equipment / DPF life per PDS.",
      "Extended service life / high initial TBN / synthetic shear stability improvers per PDS.",
    ],
    cautions: [
      "Always follow OEM fluid viscosity and API service category.",
      "KLONDIKE takes no responsibility for misuse/misapplication.",
      "KLONDIKE is not affiliated with or endorsed by CNH Industrial America LLC.",
    ],
    bestFit: ["CNH / Case IH Tier IV and prior-generation diesel platforms requiring API CK-4 15W-40 per OEM."],
    notBestFit: ["John Deere PLUS 50 II primary programs — use AGRIMAX Green 15W-40 John Deere row."],
    technicalProperties: Object.freeze({
      apiGravity: 32.5,
      specificGravityAt15_6C: 0.876,
      viscosity40C: 118,
      viscosity100C: 15.7,
      viscosityIndex: 140,
      flashPointC: 225,
      pourPointC: -37,
      ccsAtMinus20C: 5250,
      hthsAt150C: 4.2,
      sulfatedAshWtPct: 0.99,
      pumpingViscosityAtMinus25C: 20000,
      tbnMgKohG: 10,
    }),
    productNumbers: [
      "Jug 4.73 L / 1.25 GAL: KL-AG1660",
      "Pail 18.9 L / 5 GAL: KL-AG1680",
      "Drum 208 L / 55 GAL: KL-AG1690",
      "Tote 1040 L / 275 GAL: KL-AG1695",
    ],
    salesPositioning:
      "High-performance SAE 15W-40 CK-4 synthetic blend engine oil purpose-engineered for Case IH and CNH Tier IV and prior-generation diesel engines in heavy duty agricultural and construction equipment.",
    customerProfileSignals: [
      "Dealer or fleet appears CNH / Case IH-aligned",
      "Uses CNH MAT 3572-style 15W-40 CK-4",
      "Tier IV agricultural diesel engines",
    ],
    customerProfileQuestions: [
      "Are they servicing Tier IV diesel engines that require API CK-4?",
      "Is this account primarily John Deere, CNH/Case IH, or mixed fleet?",
    ],
    salesEnablementAngles: ["Position API CK-4 licensed 15W-40 with CNH MAT 3572 alignment per indexed PDS."],
    productSpotlightAngles: ["AGRIMAX Red 15W-40 CK-4 — CNH MAT 3572 indexed row."],
    categorySpotlightAngles: ["Ag OEM HD engine oil — Red CNH vs Green John Deere."],
    crossSellSignals: [
      "AGRIMAX Extended Life Coolant Premix Red",
      "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid Red",
      "KLONDIKE POLY TAC EP-2 polyurea grease",
    ],
    operationalPainPoints: ["DPF service intervals", "Shear stability in severe duty"],
    oemConquestSignals: ["CNH MAT 3572 bulk programs", "Case IH dealer engine oil shelf"],
    accountSegmentationSignals: ["CNH / Case IH primary", "CK-4 15W-40 ag/construction"],
    sourceNotes: ["pdsMapKey: 15W-40 CK-4 Synthetic Blend CNH"],
  }),

  agriOemRow({
    id: "agri-oem-canonical-agrimax-john-deere-trans-drive-hydraulic-green",
    productName: "AGRIMAX Trans Drive Hydraulic Fluid",
    productFamily: "agrimax_trans_drive_hydraulic",
    marketSegment: "agricultural_construction_off_highway",
    oemAlignment: "John Deere",
    oemColorIdentity: "Green",
    equipmentSegment: "john_deere_transmission_hydraulic_common_oil",
    applicationSegment: "transmission_drivetrain_hydraulic_utto",
    hierarchyBranch: AGRI_OEM_CANONICAL_HIERARCHY_REF.johnDeereTransDrive.branch,
    viscosityGrade: "SAE 80W",
    saeGrade: "80W",
    formulation: "Advanced purpose-engineered lubricant for transmission, drivetrain, and hydraulic systems.",
    pdsMapKey: "Trans Drive Hydraulic JD",
    pdsFileName: "KLONDIKE AGRIMAX Trans Drive Hydraulic Fluid Green PDS.pdf",
    aliases: [
      "agrimax trans drive green",
      "agrimax trans drive hydraulic",
      "jdm j20c agrimax",
      "john deere trans drive",
    ],
    routingKeywords: [
      "john deere",
      "deere",
      "jdm",
      "j20c",
      "jdm j-20c",
      "trans drive hydraulic",
      "trans drive",
      "wet brake",
      "pto",
      "cvt",
      "ivt",
      "hydrostatic",
      "zf trans drive",
    ],
    applications: [
      "Complete transmission, drivetrain, and hydraulic fluid in John Deere agricultural, forestry, and construction equipment.",
      "Other off-highway machinery per PDS.",
      "Common-oil systems supplying transmission, drivetrain, PTO, wet brakes, power steering, hydrostatic, and hydraulic systems.",
      "Where John Deere JDM J-20C is recommended.",
      "Other major-brand ag/off-road equipment where transmission, drivetrain, or hydraulic fluid aligned with John Deere JDM J-20C is recommended.",
      "SAE 80W API GL-4 gear applications per PDS.",
      "Allison C4 off-road transmission specs per PDS.",
      "Hydraulic pump manufacturer performance requirements per PDS.",
    ],
    specifications: ["John Deere JDM J-20C"],
    approvals: ["John Deere JDM J-20C"],
    differentiators: [
      "Friction material compatibility per PDS.",
      "Wet brake chatter suppression per PDS.",
      "High oxidation stability per PDS.",
      "Outstanding anti-wear per PDS.",
      "Increased efficiency per PDS.",
      "Optimal oil service life per PDS.",
    ],
    cautions: [
      "Always follow OEM fluid type and viscosity profile.",
      "KLONDIKE takes no responsibility for misuse/misapplication.",
      "KLONDIKE is not affiliated with or endorsed by Deere & Company.",
    ],
    bestFit: [
      "John Deere common-oil systems specifying JDM J-20C transmission/drivetrain/hydraulic service.",
    ],
    notBestFit: [
      "CNH MAT 3544 / MAT 3540 zinc-free programs — use AGRIMAX Red zinc-free Trans Drive row.",
      "Plain AW hydraulic-only systems without UTTO/common-oil requirement.",
    ],
    technicalProperties: Object.freeze({
      specificGravityAt15_6C: 0.863,
      viscosity40C: 60.0,
      viscosity100C: 9.6,
      viscosityIndex: 140,
      flashPointC: 220,
      pourPointC: -40,
      brookfieldAtMinus20C: 5000,
      brookfieldAtMinus35C: 60000,
    }),
    productNumbers: [
      "Jug 4.73 L / 1.25 GAL: KL-AG8075",
      "Pail 18.9 L / 5 GAL: KL-AG8080",
      "Drum 208 L / 55 GAL: KL-AG8090",
      "Tote 1040 L / 275 GAL: KL-AG8095",
    ],
    salesPositioning:
      "Advanced AGRIMAX Trans Drive lubricant for John Deere transmission, drivetrain, PTO, wet brake, and hydraulic common-oil systems where JDM J-20C is recommended.",
    customerProfileSignals: [
      "Uses JDM J20C trans/hydraulic fluid",
      "Wet brake chatter concern",
      "Dealer or fleet appears John Deere-aligned",
    ],
    customerProfileQuestions: [
      "Are their tractors or combines using JDM J20C or CNH MAT 3544/3540 transmission-hydraulic fluid?",
      "Do they have wet brake chatter, PTO, CVT, IVT, or hydrostatic performance concerns?",
    ],
    salesEnablementAngles: [
      "Position common-oil UTTO value for transmission, wet brake, PTO, and hydraulic systems per PDS.",
      "Do not interchange with CNH zinc-free MAT 3544/3540 row.",
    ],
    productSpotlightAngles: ["AGRIMAX Green Trans Drive — John Deere JDM J-20C indexed row."],
    categorySpotlightAngles: ["Ag UTTO / trans-hydraulic — Green J-20C vs Red zinc-free CNH."],
    crossSellSignals: [
      "AGRIMAX Extended Life Coolant Premix Green",
      "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Green",
      "KLONDIKE POLY TAC EP-2 polyurea grease",
    ],
    operationalPainPoints: ["Wet brake chatter", "Common sump complexity", "Cold-temperature Brookfield limits"],
    oemConquestSignals: ["John Deere J-20C bulk tank programs", "Deere dealer UTTO column"],
    accountSegmentationSignals: ["John Deere primary", "UTTO / wet brake service"],
    sourceNotes: ["pdsMapKey: Trans Drive Hydraulic JD"],
  }),

  agriOemRow({
    id: "agri-oem-canonical-agrimax-cnh-case-ih-zinc-free-trans-drive-hydraulic-red",
    productName: "AGRIMAX Zinc Free Trans Drive Hydraulic Fluid",
    productFamily: "agrimax_trans_drive_hydraulic",
    marketSegment: "agricultural_construction_off_highway",
    oemAlignment: "CNH / Case IH",
    oemColorIdentity: "Red",
    equipmentSegment: "cnh_case_ih_transmission_hydraulic_common_oil",
    applicationSegment: "transmission_drivetrain_hydraulic_utto_zinc_free",
    hierarchyBranch: AGRI_OEM_CANONICAL_HIERARCHY_REF.cnhTransDrive.branch,
    viscosityGrade: "SAE 80W",
    saeGrade: "80W",
    formulation: "Zinc-free advanced lubricant for transmission, drivetrain, and hydraulic systems.",
    pdsMapKey: "Trans Drive Hydraulic ZF",
    pdsFileName: "KLONDIKE AGRIMAX Zinc Free Trans Drive Hydraulic Fluid Red PDS.pdf",
    aliases: [
      "agrimax zinc free trans drive",
      "agrimax zf trans drive",
      "cnh mat 3544 agrimax",
      "cnh mat 3540 agrimax",
      "case ih trans drive",
    ],
    routingKeywords: [
      "case ih",
      "cnh",
      "cnh mat",
      "mat 3544",
      "mat 3540",
      "zinc free trans drive",
      "zf trans drive",
      "trans drive hydraulic",
      "wet brake",
      "pto",
      "cvt",
      "ivt",
    ],
    applications: [
      "Complete transmission, drivetrain, and hydraulic fluid in Case IH and CNH agricultural, forestry, and construction equipment.",
      "Other off-highway machinery per PDS.",
      "Common-oil systems supplying transmission, drivetrain, PTO, wet brakes, power steering, hydrostatic, and hydraulic systems.",
      "Where CNH MAT 3544 and/or MAT 3540 is recommended.",
      "Other major-brand ag/off-road equipment where transmission, drivetrain, or hydraulic fluid aligned with CNH MAT 3544 and/or MAT 3540 is recommended.",
      "SAE 80W API GL-4 gear applications per PDS.",
      "Allison C4 off-road transmission specs per PDS.",
      "Hydraulic pump manufacturer performance requirements per PDS.",
    ],
    specifications: ["CNH MAT 3544", "CNH MAT 3540"],
    approvals: ["CNH MAT 3544", "CNH MAT 3540"],
    differentiators: [
      "Zinc-free formulation aligned with OE fluid composition per PDS.",
      "Friction material compatibility per PDS.",
      "Wet brake chatter suppression per PDS.",
      "High oxidation stability per PDS.",
      "Outstanding anti-wear per PDS.",
      "Increased efficiency per PDS.",
      "Optimal oil service life per PDS.",
    ],
    cautions: [
      "Always follow OEM fluid type and viscosity profile.",
      "KLONDIKE takes no responsibility for misuse/misapplication.",
      "KLONDIKE is not affiliated with or endorsed by CNH Industrial LLC.",
    ],
    bestFit: [
      "CNH / Case IH common-oil systems specifying MAT 3544 / MAT 3540 zinc-free transmission-hydraulic service.",
    ],
    notBestFit: [
      "John Deere JDM J-20C programs — use AGRIMAX Green Trans Drive row.",
    ],
    technicalProperties: Object.freeze({
      specificGravityAt15_6C: 0.863,
      viscosity40C: 60.0,
      viscosity100C: 9.6,
      viscosityIndex: 145,
      flashPointC: 230,
      pourPointC: -42,
      brookfieldAtMinus20C: 3500,
      brookfieldAtMinus35C: 20000,
      brookfieldAtMinus40C: 40000,
    }),
    productNumbers: [
      "Pail 18.9 L / 5 GAL: KL-AG8480",
      "Drum 208 L / 55 GAL: KL-AG8490",
      "Tote 1040 L / 275 GAL: KL-AG8495",
    ],
    salesPositioning:
      "Zinc-free AGRIMAX Trans Drive lubricant for Case IH and CNH transmission, drivetrain, PTO, wet brake, and hydraulic common-oil systems where MAT 3544 / MAT 3540 is recommended.",
    customerProfileSignals: [
      "Uses CNH MAT 3544 / MAT 3540 zinc-free trans/hydraulic fluid",
      "Wet brake chatter concern",
      "Dealer or fleet appears CNH / Case IH-aligned",
    ],
    customerProfileQuestions: [
      "Are their tractors or combines using JDM J20C or CNH MAT 3544/3540 transmission-hydraulic fluid?",
      "Do they have wet brake chatter, PTO, CVT, IVT, or hydrostatic performance concerns?",
    ],
    salesEnablementAngles: [
      "Emphasize zinc-free OE alignment for CNH friction systems per PDS — not John Deere J-20C chemistry.",
    ],
    productSpotlightAngles: ["AGRIMAX Red zinc-free Trans Drive — CNH MAT 3544 / 3540 indexed row."],
    categorySpotlightAngles: ["Ag UTTO — Red zinc-free CNH vs Green J-20C John Deere."],
    crossSellSignals: [
      "AGRIMAX Extended Life Coolant Premix Red",
      "AGRIMAX SAE 15W-40 CK-4 Synthetic Blend Red",
      "KLONDIKE POLY TAC EP-2 polyurea grease",
    ],
    operationalPainPoints: ["Wet brake chatter", "Zinc-free friction compatibility", "Cold Brookfield performance"],
    oemConquestSignals: ["CNH MAT 3544/3540 bulk programs", "Case IH dealer UTTO column"],
    accountSegmentationSignals: ["CNH / Case IH primary", "Zinc-free UTTO"],
    sourceNotes: ["pdsMapKey: Trans Drive Hydraulic ZF", "PDS title: AGRIMAX Zinc Free Trans Drive Hydraulic Fluid"],
  }),

  agriOemRow({
    id: "agri-oem-canonical-agrimax-poly-tac-ep2-polyurea-grease",
    productName: "KLONDIKE POLY TAC EP-2 Polyurea Severe Duty",
    productFamily: "agrimax_poly_tac_grease",
    marketSegment: "agricultural_industrial_severe_duty",
    oemAlignment: "Agricultural / JDM grease specifications (per PDS)",
    oemColorIdentity: "Green",
    equipmentSegment: "ag_off_highway_severe_duty_bearings",
    applicationSegment: "polyurea_ep_grease_nlgi_2",
    hierarchyBranch: AGRI_OEM_CANONICAL_HIERARCHY_REF.polyTacGrease.branch,
    viscosityGrade: "NLGI 2",
    nlgiGrade: "2",
    thickenerType: "Polyurea",
    formulation:
      "Polyurea thickener; mineral paraffinic base oil; anti-wear additives; extreme pressure agents; tackiness additives; rust and oxidation inhibitors; smooth, tacky texture.",
    pdsMapKey: "Poly Tac EP-2 Grease",
    pdsFileName: "KLONDIKE AGRIMAX Poly Tac Grease PDS.pdf",
    aliases: [
      "agrimax poly tac",
      "agrimax poly tac ep-2",
      "klondike poly tac ep-2",
      "poly tac ep-2 severe duty",
      "polyurea grease green",
    ],
    routingKeywords: [
      "poly tac",
      "polytac",
      "polyurea grease",
      "green ag grease",
      "jdm grease",
      "gc-lb",
      "jdm j13e1",
      "jdm j134e4",
      "jdm j13e5",
      "jdm j25c",
      "agrimax grease",
      "severe duty grease",
    ],
    applications: [
      "Heavily loaded plain and rolling element bearings.",
      "On-road/off-road/agricultural/heavy equipment and industrial applications.",
      "Forestry, mining, agricultural equipment, marine use per PDS.",
      "Wet and corrosive environments.",
      "Agriculture, construction, logging, trucking, mining severe service.",
      "Rock crushers, screeners, oil field equipment, off drilling equipment, marine deck equipment per PDS.",
      "Plain, anti-friction, and rolling bearings.",
      "Motorcycle suspension and linkage components per PDS.",
    ],
    specifications: ["JDM J13E1", "JDM J134E4", "JDM J13E5", "JDM J25C", "NLGI GC-LB performance"],
    approvals: ["JDM J13E1", "JDM J134E4", "JDM J13E5", "JDM J25C", "NLGI GC-LB performance"],
    differentiators: [
      "Extended service protection per PDS.",
      "High load carrying capacity per PDS.",
      "Corrosion/wear protection per PDS.",
      "Excellent water resistance per PDS.",
      "Excellent high temperature stability per PDS.",
      "Wide temperature range per PDS.",
    ],
    cautions: [
      "Typical ambient operating temperature range: -30°C to 200°C per PDS.",
      "Polyurea thickener — do not describe as lithium or moly grease.",
      "PDS product title: KLONDIKE POLY TAC EP-2 Polyurea Severe Duty; AGRIMAX appears in indexed file naming context.",
    ],
    bestFit: [
      "Severe-duty ag/construction bearings in wet, corrosive, high-load, or high-temperature service per PDS.",
    ],
    notBestFit: [
      "Lithium complex general-purpose chassis grease default — use appropriate grease canonical row.",
      "Moly EP chassis programs — not this polyurea chemistry.",
    ],
    technicalProperties: Object.freeze({
      thickener: "Polyurea",
      color: "Green",
      texture: "Smooth, tacky",
      workedPenetration60Astmd217: 280,
      droppingPointAstmd2265: ">270°C",
      baseOil: "Mineral paraffinic",
      viscosity40C: 150,
      viscosityIndexMin: 100,
      oxidationStability99C100hrAstmd942: "10 kPa",
      rustPrevention52C48hrAstmd1743: "PASS",
      waterWashOut79CAstmd1264: "<3%",
      fourBallEpOkLoadAstmd2596: "620 kgf",
      fourBallEpLoadWearIndexAstmd2596: "40 kgf",
      fourBallWearScarAstmd2266: "0.50 mm",
      timkenOkLoadAstmd2509: "50 lbs",
    }),
    productNumbers: ["Tube 397 g / 14 oz: KL-GR5830"],
    salesPositioning:
      "NLGI 2 polyurea severe-duty grease with tackiness and EP protection for heavily loaded bearings in agricultural, industrial, and off-highway severe service per PDS.",
    customerProfileSignals: [
      "Grease failures in wet, corrosive, high-load, or high-temperature ag applications",
      "Opportunity to bundle coolant + engine oil + trans drive + grease for OEM-aligned ag customer",
    ],
    customerProfileQuestions: [
      "Are grease failures occurring in wet, corrosive, high-load, or high-temperature ag applications?",
      "Do they want an OEM-aligned bundle across coolant, engine oil, trans/hydraulic, and grease?",
    ],
    salesEnablementAngles: [
      "Preserve polyurea thickener identity — not lithium, not moly.",
      "Quote 4-ball, Timken, and washout data only from PDS property table.",
    ],
    productSpotlightAngles: [
      "POLY TAC EP-2 — polyurea severe duty; PDS title KLONDIKE POLY TAC EP-2; AGRIMAX PDS file name.",
    ],
    categorySpotlightAngles: ["Ag severe-duty grease — polyurea vs lithium/moly canonical families."],
    crossSellSignals: [
      "AGRIMAX Extended Life Coolant Premix (Green or Red by OEM)",
      "AGRIMAX 15W-40 CK-4 Synthetic Blend (Green or Red by OEM)",
      "AGRIMAX Trans Drive (Green J-20C or Red zinc-free by OEM)",
    ],
    operationalPainPoints: [
      "Water washout in wet environments",
      "High-temperature bearing failure",
      "Load carrying in severe ag/industrial service",
    ],
    oemConquestSignals: ["JDM grease spec callouts on equipment", "Ag dealer severe-duty grease shelf"],
    accountSegmentationSignals: ["Severe-duty grease upsell", "Ag bundle attach"],
    sourceNotes: [
      "pdsMapKey: Poly Tac EP-2 Grease",
      "PDS file: KLONDIKE AGRIMAX Poly Tac Grease PDS.pdf",
      "PDS product title: KLONDIKE POLY TAC EP-2 Polyurea Severe Duty",
    ],
  }),
];

/** @type {Readonly<Record<string, AgriOemCanonicalProductIntelligence>>} */
const AGRI_OEM_CANONICAL_BY_ID = Object.freeze(
  Object.fromEntries(AGRI_OEM_CANONICAL_PRODUCT_ROWS.map((p) => [p.id, p]))
);

/** @type {Readonly<{ version: number, category: "agri_oem", products: readonly AgriOemCanonicalProductIntelligence[] }>} */
export const AGRI_OEM_CANONICAL_PRODUCT_INTELLIGENCE = Object.freeze({
  version: AGRI_OEM_CANONICAL_PRODUCT_INTELLIGENCE_VERSION,
  category: "agri_oem",
  products: Object.freeze(AGRI_OEM_CANONICAL_PRODUCT_ROWS),
});

/** @returns {readonly AgriOemCanonicalProductIntelligence[]} */
export function listAgriOemCanonicalProductIntelligence() {
  return AGRI_OEM_CANONICAL_PRODUCT_INTELLIGENCE.products;
}

/**
 * @param {unknown} id
 * @returns {AgriOemCanonicalProductIntelligence | null}
 */
export function getAgriOemCanonicalProductIntelligenceById(id) {
  const key = String(id ?? "").trim();
  if (!key) return null;
  return AGRI_OEM_CANONICAL_BY_ID[key] || null;
}

/**
 * @param {unknown} pdsMapKey
 * @returns {AgriOemCanonicalProductIntelligence | null}
 */
export function getAgriOemCanonicalProductIntelligenceByPdsKey(pdsMapKey) {
  const key = String(pdsMapKey ?? "").trim();
  if (!key) return null;
  return AGRI_OEM_CANONICAL_PRODUCT_INTELLIGENCE.products.find((p) => p.pdsMapKey === key) || null;
}
