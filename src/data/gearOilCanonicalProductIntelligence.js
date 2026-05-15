/**
 * Canonical KLONDIKE gear oil / gear lubricant intelligence (deterministic source text).
 * Grounded on indexed `pdsMap.js` rows and Gear Oils / Gear Lubricants PDS PDFs — confirm lines on live PDS before quoting.
 * Not wired to resolver or UI in this module.
 */

/** @type {number} */
export const GEAR_OIL_CANONICAL_PRODUCT_INTELLIGENCE_VERSION = 1;

/**
 * Hierarchy branches for gear oil programs.
 * @type {Readonly<Record<string, { branch: string, tier: string, description: string }>>}
 */
export const GEAR_OIL_CANONICAL_HIERARCHY_REF = Object.freeze({
  commercialGl5Gear: Object.freeze({
    branch: "commercial_gl5_gear",
    tier: "commercial",
    description:
      "KLONDIKE Commercial Gear Lubricant SAE 80W-90 — separate indexed row from premium GL-5 80W-90; API GL-5 hypoid/differential column.",
  }),
  premiumGl5Gear: Object.freeze({
    branch: "premium_gl5_gear",
    tier: "premium",
    description: "KLONDIKE GL-5 Gear Lubricants SAE 80W-90 and 85W-140 — API GL-5/MT-1 with broader OEM lists than Commercial 80W-90.",
  }),
  fullSyntheticGl5LimitedSlip: Object.freeze({
    branch: "full_synthetic_gl5_limited_slip",
    tier: "full_synthetic",
    description:
      "KLONDIKE Full Synthetic GL-5 Gear Lubricants SAE 75W-90 and 75W-140 — friction-modified limited-slip GL-5/MT-1; not for GL-4-only applications.",
  }),
  industrialEpGear: Object.freeze({
    branch: "industrial_ep_gear",
    tier: "industrial_ep",
    description:
      "KLONDIKE Industrial EP Gear Lubricants ISO VG grades — enclosed industrial gear, AGMA/DIN/ISO CKC; not default hypoid axle GL-5 answer.",
  }),
  fullSyntheticIndustrialEpGear: Object.freeze({
    branch: "full_synthetic_industrial_ep_gear",
    tier: "full_synthetic_industrial",
    description:
      "KLONDIKE Full Synthetic Industrial EP Gear Lubricants ISO VG grades — severe enclosed gear with documented FZG/micropitting data on PDS.",
  }),
});

/** @type {readonly string[]} */
const SHARED_GEAR_ROUTING_KEYWORDS = Object.freeze([
  "gear oil",
  "gear lube",
  "gear lubricant",
  "gl-5",
  "gl5",
  "mt-1",
  "mt1",
  "hypoid",
  "differential",
  "diff oil",
  "axle oil",
  "final drive",
  "pto",
  "power take off",
  "limited slip",
  "lsd",
  "posi",
  "synthetic gear oil",
  "industrial gear oil",
  "ep gear oil",
  "enclosed gear",
  "reducer",
  "gearbox",
  "worm gear",
  "spur gear",
  "bevel gear",
  "herringbone",
  "planetary",
  "agma",
  "steel mill",
  "water contamination",
  "micropitting",
  "fzg",
  "timken",
]);

/**
 * @typedef {Record<string, string | number>} GearOilTechnicalProperties
 */

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   productFamily: string,
 *   category: string,
 *   marketSegment: string,
 *   hierarchyBranch: string,
 *   viscosityGrade: string,
 *   isoGrade: string | null,
 *   saeGrade: string | null,
 *   formulation: string,
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
 *   technicalProperties: GearOilTechnicalProperties,
 *   productNumbers: string[],
 *   salesPositioning: string,
 *   sourceNotes: string[],
 * }} GearOilCanonicalProductIntelligence
 */

/** @param {GearOilCanonicalProductIntelligence} row */
function freezeGearOilRow(row) {
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
 * @param {Partial<GearOilCanonicalProductIntelligence> & Pick<GearOilCanonicalProductIntelligence, "id" | "productName">} row
 */
function gearOilRow(row) {
  return freezeGearOilRow({
    productFamily: "",
    category: "gear_oils",
    marketSegment: "",
    hierarchyBranch: "",
    viscosityGrade: "",
    isoGrade: null,
    saeGrade: null,
    formulation: "",
    pdsMapKey: null,
    pdsFileName: "",
    aliases: [],
    routingKeywords: [],
    applications: [],
    specifications: [],
    approvals: [],
    differentiators: [],
    cautions: [],
    bestFit: [],
    notBestFit: [],
    technicalProperties: Object.freeze({}),
    productNumbers: [],
    salesPositioning: "",
    sourceNotes: [],
    ...row,
    routingKeywords: Object.freeze([
      ...SHARED_GEAR_ROUTING_KEYWORDS,
      ...(row.routingKeywords || []),
    ]),
  });
}

/** @type {readonly string[]} */
const MOBILE_GL5_APPLICATIONS = Object.freeze([
  "Hypoid differentials, gear boxes, and axle lubrication.",
  "Spiral, bevel, or hypoid gear sets; manual transmissions, PTOs, and final drives where specified.",
  "Passenger cars, trucks, off-highway vehicles, construction, farm, forestry, and mining.",
  "Mobile gear applications exposed to extreme loads and high temperatures.",
]);

/** @type {readonly string[]} */
const INDUSTRIAL_EP_APPLICATIONS = Object.freeze([
  "Heavily loaded enclosed gear drives and reducers.",
  "Spur, bevel, herringbone, planetary, and worm gear designs.",
  "Bath, splash, circulating, and spray-type lubrication systems.",
  "Steel mills where gear cases are near red-hot steel.",
  "Circulating systems where water contamination is a hazard.",
  "Industrial and mobile equipment; gear systems, chain drives, sprockets, plain and anti-friction bearings, slide guides, flexible coupling joints.",
  "Transmission gear cases in open pit and underground mining machinery.",
]);

/** @type {readonly string[]} */
const SYNTHETIC_INDUSTRIAL_EP_APPLICATIONS = Object.freeze([
  ...INDUSTRIAL_EP_APPLICATIONS,
  "Continuously running gearboxes in extreme temperatures or sustained severe service, heavy loads, or low speeds.",
]);

/** @type {readonly string[]} */
const INDUSTRIAL_MATERIAL_COMPATIBILITY = Object.freeze([
  "Non-corrosive to gear and bearing materials such as steel, copper, bronze, Babbitt, and cadmium-nickel per indexed PDS language.",
]);

/** @type {readonly string[]} */
const SYNTHETIC_INDUSTRIAL_SHARED_PERFORMANCE = Object.freeze([
  "Micropitting Load Stage @ 90°C FVA 54: >10 (all listed grades on PDS).",
  "Micropitting GFT Classification: High (all listed grades on PDS).",
  "FZG Failure Stage A/8.3/90: >12 (all listed grades on PDS).",
  "FZG Failure Stage A/16.6/90: >12 (all listed grades on PDS).",
  "FAG FE-8 test DIN 51589-3: Pass (all listed grades on PDS).",
  "Four Ball EP Weld Load kg minimum: 250 (all listed grades on PDS).",
  "Timken OK Load lbs: >90 (all listed grades on PDS).",
]);

/** @type {GearOilCanonicalProductIntelligence[]} */
const GEAR_OIL_CANONICAL_PRODUCT_ROWS = [
  gearOilRow({
    id: "gear-oil-canonical-commercial-gear-lubricant-80w90",
    productName: "KLONDIKE Commercial Gear Lubricant SAE 80W-90 Commercial",
    productFamily: "commercial_gl5_gear",
    marketSegment: "mobile_differential_axle",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.commercialGl5Gear.branch,
    viscosityGrade: "SAE 80W-90",
    saeGrade: "80W-90",
    formulation: "Premium base stocks with advanced additive chemistry — not synthetic per PDS positioning.",
    pdsMapKey: "80W-90 Commercial Gear",
    pdsFileName: "KLONDIKE Commercial Gear Lubricants.pdf",
    aliases: [
      "commercial gear lubricant 80w90",
      "commercial 80w-90 gear",
      "klondike commercial gear 80w90",
      "sae 80w-90 gl-5 professional formula gear lubricant",
    ],
    routingKeywords: ["80w-90", "80w90", "commercial gear", "commercial 80w90"],
    applications: [...MOBILE_GL5_APPLICATIONS],
    specifications: ["API Service GL-5"],
    approvals: ["API Service GL-5"],
    differentiators: [
      "Long gear life.",
      "All-weather protection.",
      "Metal protection.",
      "Seal protection.",
    ],
    cautions: [
      "Consult owner's manual for type and grade needed.",
      "Separate product from KLONDIKE GL-5 Gear Lubricants SAE 80W-90 — do not collapse Commercial and regular GL-5 80W-90.",
      "Not the primary answer for ISO/AGMA enclosed industrial gear — use Industrial EP Gear Lubricants rows.",
      "Open Gear Grease and Open Gear Lubricant remain grease canonical territory.",
    ],
    bestFit: [
      "Mobile hypoid differentials and axles where API GL-5 Commercial 80W-90 is specified.",
      "Fleet bulk programs that call for the Commercial Gear Lubricant row on the PDS index.",
    ],
    notBestFit: [
      "Requests for premium GL-5 80W-90 with MT-1 and extended OEM lists — use GL-5 Gear Lubricants 80W-90.",
      "Limited-slip or full synthetic 75W-90/75W-140 — use Full Synthetic GL-5 rows.",
      "ISO 68–460 enclosed industrial reducers — use Industrial EP Gear Lubricants.",
      "GL-4-only manual transmission or synchromesh — transmission canonical territory.",
    ],
    technicalProperties: Object.freeze({
      gravityApi15_6C: 28.2,
      kinematicViscosity40C_cSt: 144,
      kinematicViscosity100C_cSt: 15,
      brookfieldViscosity: "80,000 @ -26°C",
      viscosityIndex: 105,
      pourPointC: -30,
    }),
    productNumbers: [
      "Pail 18.9 L / 5 GAL: KL-GL0880",
      "Drum 208 L / 55 GAL: KL-GL0890",
      "Tote 1040 L / 275 GAL: KL-GL0895",
    ],
    salesPositioning:
      "Commercial GL-5 80W-90 column for hypoid and mobile gear duty — indexed separately from premium GL-5 Gear Lubricants 80W-90.",
    sourceNotes: [
      "pdsMapKey: 80W-90 Commercial Gear — Gear Lubricants PDS folder on index.",
      "Do not invent yellow-metal cautions beyond indexed industrial EP compatibility language on other rows.",
    ],
  }),

  gearOilRow({
    id: "gear-oil-canonical-gl5-gear-lubricant-80w90",
    productName: "KLONDIKE GL-5 Gear Lubricants SAE 80W-90",
    productFamily: "premium_gl5_gear",
    marketSegment: "mobile_differential_axle",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.premiumGl5Gear.branch,
    viscosityGrade: "SAE 80W-90",
    saeGrade: "80W-90",
    formulation: "Premium base stocks with advanced additive chemistry — not synthetic per PDS positioning.",
    pdsMapKey: "80W-90 GL-5 Gear",
    pdsFileName: "KLONDIKE Gear Lubricants PDS.pdf",
    aliases: [
      "gl-5 gear lubricant 80w90",
      "gl5 80w-90",
      "sae 80w-90 gl-5 advanced formula gear lubricant",
      "premium gl5 80w90",
    ],
    routingKeywords: ["80w-90", "80w90", "gl-5 80w90", "85w-140"],
    applications: [
      ...MOBILE_GL5_APPLICATIONS,
      "Oil-lubricated wheel bearings where specified on PDS.",
    ],
    specifications: [
      "API Service GL-5/MT-1",
      "SAE J2360 (formerly MIL-PRF-2105E)",
    ],
    approvals: [
      "API Service GL-5/MT-1",
      "Mack GO-J PLUS, GO-J, GO-H, GO-G",
      "SAE J2360 formerly MIL-PRF-2105E",
      "ArvinMeritor 0-76-D",
      "ArvinMeritor TP-9539",
      "MAN 342 Type M2",
      "ZF TE-ML 12 A/B/C/E",
    ],
    differentiators: [
      "Long gear life.",
      "All-weather protection.",
      "Metal protection.",
      "Long lubricant life.",
      "Seal protection.",
    ],
    cautions: [
      "Consult owner's manual for type and grade needed.",
      "Do not collapse with KLONDIKE Commercial Gear Lubricant SAE 80W-90 Commercial.",
      "Not for GL-4-only applications — confirm API category on nameplate.",
    ],
    bestFit: [
      "Hypoid differentials and mobile gear boxes requiring API GL-5/MT-1 80W-90 with listed OEM approvals.",
      "Manual transmissions and PTOs where GL-5/MT-1 gear oil is specified.",
    ],
    notBestFit: [
      "Commercial Gear Lubricant 80W-90 bulk when customer PDS/index row is Commercial, not GL-5 Gear Lubricants.",
      "Limited-slip synthetic 75W-90/75W-140 programs.",
      "ISO VG enclosed industrial reducers.",
    ],
    technicalProperties: Object.freeze({
      gravityApi15_6C: 28.2,
      kinematicViscosity40C_cSt: 134,
      kinematicViscosity100C_cSt: 14,
      brookfieldViscosity: "73,500 @ -26°C",
      viscosityIndex: 101,
      pourPointC: -33,
      timkenOkLoadLbs: 75,
    }),
    productNumbers: [
      "Bottle 946 mL: KL-GL1040",
      "Jug 4.73 L / 1.25 GAL: KL-GL1060",
      "Pail 18.9 L / 5 GAL: KL-GL1080",
      "Keg 60 L / 16 GAL: KL-GL1085",
      "Drum 208 L / 55 GAL: KL-GL1090",
      "Tote 1040 L / 275 GAL: KL-GL1095",
      "Bulk: KL-GL1099",
    ],
    salesPositioning:
      "Premium GL-5/MT-1 80W-90 with broader OEM coverage than Commercial 80W-90 — default mobile GL-5 80W-90 when not specifying Commercial row.",
    sourceNotes: [
      "pdsMapKey: 80W-90 GL-5 Gear — shared PDF with 85W-140 on KLONDIKE Gear Lubricants PDS.",
    ],
  }),

  gearOilRow({
    id: "gear-oil-canonical-gl5-gear-lubricant-85w140",
    productName: "KLONDIKE GL-5 Gear Lubricants SAE 85W-140",
    productFamily: "premium_gl5_gear",
    marketSegment: "mobile_differential_axle",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.premiumGl5Gear.branch,
    viscosityGrade: "SAE 85W-140",
    saeGrade: "85W-140",
    formulation: "Premium base stocks with advanced additive chemistry — not synthetic per PDS positioning.",
    pdsMapKey: "85W-140 GL-5 Gear",
    pdsFileName: "KLONDIKE Gear Lubricants PDS.pdf",
    aliases: [
      "gl-5 gear lubricant 85w140",
      "gl5 85w-140",
      "sae 85w-140 gl-5 advanced formula gear lubricant",
      "heavy duty gl5 85w140",
    ],
    routingKeywords: ["85w-140", "85w140"],
    applications: [...MOBILE_GL5_APPLICATIONS, "Oil-lubricated wheel bearings where specified on PDS."],
    specifications: [
      "API Service GL-5/MT-1",
      "SAE J2360 (formerly MIL-PRF-2105E)",
    ],
    approvals: [
      "API Service GL-5/MT-1",
      "Mack GO-J PLUS, GO-J, GO-H, GO-G",
      "SAE J2360 formerly MIL-PRF-2105E",
      "ArvinMeritor 0-76-A",
      "ArvinMeritor TP-9539",
      "MAN 342 Type M2",
      "ZF TE-ML 12 A/B/C/E",
    ],
    differentiators: [
      "Long gear life.",
      "All-weather protection.",
      "Metal protection.",
      "Long lubricant life.",
      "Seal protection.",
    ],
    cautions: [
      "Consult owner's manual for type and grade needed.",
      "Heavier SAE 85W-140 grade — confirm nameplate viscosity before bulk change.",
    ],
    bestFit: [
      "Heavy-duty hypoid and mobile gear applications specifying SAE 85W-140 GL-5/MT-1.",
      "High-temperature and extreme-load mobile gear per PDS applications list.",
    ],
    notBestFit: [
      "80W-90 grade requests.",
      "Full synthetic 75W-140 limited-slip programs.",
      "Industrial ISO VG enclosed gear drives.",
    ],
    technicalProperties: Object.freeze({
      gravityApi15_6C: 26.3,
      kinematicViscosity40C_cSt: 340,
      kinematicViscosity100C_cSt: 26.0,
      brookfieldViscosity: "55,000 @ -12°C",
      viscosityIndex: 100,
      pourPointC: -20,
      timkenOkLoadLbs: 75,
    }),
    productNumbers: [
      "Pail 18.9 L / 5 GAL: KL-GL1380",
      "Drum 208 L / 55 GAL: KL-GL1390",
      "Tote 1040 L / 275 GAL: KL-GL1395",
      "Bulk: KL-GL1399",
    ],
    salesPositioning: "Heavy-duty GL-5/MT-1 85W-140 for extreme load mobile gear — paired PDF with 80W-90 GL-5 Gear Lubricants.",
    sourceNotes: ["pdsMapKey: 85W-140 GL-5 Gear — ArvinMeritor 0-76-A applies to 85W-140 per PDS (0-76-D for 80W-90)."],
  }),

  gearOilRow({
    id: "gear-oil-canonical-full-synthetic-gl5-gear-lubricant-75w90",
    productName: "KLONDIKE Full Synthetic GL-5 Gear Lubricants SAE 75W-90",
    productFamily: "full_synthetic_gl5_limited_slip",
    marketSegment: "mobile_differential_axle",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.fullSyntheticGl5LimitedSlip.branch,
    viscosityGrade: "SAE 75W-90",
    saeGrade: "75W-90",
    formulation: "Full synthetic.",
    pdsMapKey: "75W-90 Full Synthetic Gear",
    pdsFileName: "KLONDIKE Full Synthetic Gear Lubricants PDS.pdf",
    aliases: [
      "full synthetic gl5 75w90",
      "synthetic gl-5 75w-90",
      "sae 75w-90 gl-5 full synthetic limited slip gear lubricant",
      "limited slip 75w90",
    ],
    routingKeywords: ["75w-90", "75w90", "full synthetic gl5", "limited slip"],
    applications: [
      "Rear axle and differential lubricants.",
      "On-road and off-road vehicles in severe conditions and extreme climatic environments.",
      "Light and heavy-duty trucks, buses, vans; construction, mining, quarrying, agricultural equipment.",
      "Winch reduction gears and crawler vehicle propulsion gear drives exposed to severe low temperatures.",
      "Manual transmissions, gear boxes, and steering mechanisms where API GL-5/MT-1 fluids are specified.",
    ],
    specifications: [
      "API Service Categories GL-5 and MT-1",
      "Both viscosity grades on PDS meet performance requirements of limited slip differentials",
      "CEC L-45-A-99 20 hour shear",
    ],
    approvals: [
      "ArvinMeritor 076-E, O-76N Extended Drain",
      "SAE J2360, MIL-2105E/F",
      "Eaton Roadranger E500/SHAES 256 Rev C",
      "International TMS-6816",
      "Mack GO-J Plus, GO-J and previous",
      "STEMCO PPS+ and PPS wheel end systems",
      "Scania STO 1:0",
      "AIST/US Steel 224",
      "AGMA 9005-E02, 250.03, 250.04, 251.02, No. 4",
      "MAN 342 Type M2",
    ],
    differentiators: [
      "Extended drain capabilities.",
      "Excellent thermal and oxidation stability.",
      "High viscosity index and low pour point.",
      "Extreme pressure performance.",
      "Compatibility with conventional mineral oil based and other synthetic GL-5 gear lubricants.",
      "Friction modified chemistry for limited slip — in most cases additional limited slip additive is not required.",
    ],
    cautions: [
      "Not for use in applications specifying GL-4 type lubricants only.",
      "Consult owner's manual for type and grade needed.",
      "Limited slip performance requirements vary; some applications may require additional additive per PDS.",
    ],
    bestFit: [
      "Severe-service differentials and mobile gear requiring full synthetic GL-5/MT-1 75W-90 with limited-slip compatibility.",
      "Cold-climate and extended-drain programs where indexed OEM lists apply.",
    ],
    notBestFit: [
      "GL-4-only manual transmission (synchromesh, yellow-metal programs) — transmission canonical.",
      "Non-synthetic 80W-90 or 85W-140 GL-5 bulk.",
      "Industrial ISO VG enclosed reducers.",
    ],
    technicalProperties: Object.freeze({
      gravityApi: 31.25,
      specificGravity15_6C: 0.869,
      kinematicViscosity40C_cSt: 110.0,
      kinematicViscosity100C_cSt: 16.45,
      viscosityIndex: 162,
      colourAstmd1500: 1.0,
      pourPointC: -50,
      brookfieldViscosityMinus40C_cP: 92000,
    }),
    productNumbers: [
      "Bottle 946 mL: KL-GL2040",
      "Pail 18.9 L / 5 GAL: KL-GL2080",
      "Keg 60 L / 16 GAL: KL-GL2085",
      "Drum 208 L / 55 GAL: KL-GL2090",
      "Tote 1040 L / 275 GAL: KL-GL2095",
      "Bulk: KL-GL2099",
    ],
    salesPositioning:
      "Full synthetic friction-modified GL-5/MT-1 75W-90 — limited-slip differential column; not interchangeable with GL-4-only specs.",
    sourceNotes: [
      "pdsMapKey: 75W-90 Full Synthetic Gear — shared PDF with 75W-140.",
      "Do not route ATF, CVT, DCT, TDTO, or synchromesh questions here without GL-5/MT-1 gear oil on the tag.",
    ],
  }),

  gearOilRow({
    id: "gear-oil-canonical-full-synthetic-gl5-gear-lubricant-75w140",
    productName: "KLONDIKE Full Synthetic GL-5 Gear Lubricants SAE 75W-140",
    productFamily: "full_synthetic_gl5_limited_slip",
    marketSegment: "mobile_differential_axle",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.fullSyntheticGl5LimitedSlip.branch,
    viscosityGrade: "SAE 75W-140",
    saeGrade: "75W-140",
    formulation: "Full synthetic.",
    pdsMapKey: "75W-140 Full Synthetic Gear",
    pdsFileName: "KLONDIKE Full Synthetic Gear Lubricants PDS.pdf",
    aliases: [
      "full synthetic gl5 75w140",
      "synthetic gl-5 75w-140",
      "sae 75w-140 gl-5 full synthetic limited slip gear lubricant",
    ],
    routingKeywords: ["75w-140", "75w140"],
    applications: [
      "Rear axle and differential lubricants.",
      "On-road and off-road vehicles in severe conditions and extreme climatic environments.",
      "Light and heavy-duty trucks, buses, vans; construction, mining, quarrying, agricultural equipment.",
      "Winch reduction gears and crawler vehicle propulsion gear drives exposed to severe low temperatures.",
      "Manual transmissions, gear boxes, and steering mechanisms where API GL-5/MT-1 fluids are specified.",
    ],
    specifications: [
      "API Service Categories GL-5 and MT-1",
      "Limited slip differential performance per PDS",
    ],
    approvals: [
      "ArvinMeritor O-76N Extended Drain",
      "Eaton Roadranger E500/SHAES256 Rev C",
      "International TMS-6816",
      "Mack GO-J Plus, GO-J, TO-A Plus",
      "SAE J2360",
    ],
    differentiators: [
      "Extended drain capabilities.",
      "Excellent thermal and oxidation stability.",
      "High viscosity index and low pour point.",
      "Extreme pressure performance.",
      "Compatibility with conventional mineral oil based and other synthetic GL-5 gear lubricants.",
      "Friction modified chemistry for limited slip — in most cases additional limited slip additive is not required.",
    ],
    cautions: [
      "Not for use in applications specifying GL-4 type lubricants only.",
      "Consult owner's manual for type and grade needed.",
      "Limited slip performance requirements vary; some applications may require additional additive per PDS.",
    ],
    bestFit: [
      "Heavy-duty full synthetic GL-5/MT-1 75W-140 with limited-slip and high-load mobile gear requirements.",
    ],
    notBestFit: [
      "75W-90 grade when nameplate specifies 75W-90.",
      "Premium mineral GL-5 85W-140.",
      "Industrial ISO enclosed gear.",
    ],
    technicalProperties: Object.freeze({
      gravityApi: 34.3,
      specificGravity15_6C: 0.8564,
      kinematicViscosity40C_cSt: 171.8,
      kinematicViscosity100C_cSt: 27.75,
      viscosityIndex: 200,
      colourAstmd1500: 1.5,
      pourPointC: -46,
      brookfieldViscosityMinus40C_cP: 120000,
    }),
    productNumbers: [
      "Bottle 946 mL: KL-GL2440",
      "Pail 18.9 L / 5 GAL: KL-GL2480",
      "Keg 60 L / 16 GAL: KL-GL2485",
      "Drum 208 L / 55 GAL: KL-GL2490",
      "Tote 1040 L / 275 GAL: KL-GL2495",
      "Bulk: KL-GL2499",
    ],
    salesPositioning: "Full synthetic GL-5/MT-1 75W-140 for maximum load and temperature severe mobile gear with limited-slip chemistry.",
    sourceNotes: ["pdsMapKey: 75W-140 Full Synthetic Gear"],
  }),

  gearOilRow({
    id: "gear-oil-canonical-industrial-ep-gear-lubricant-iso68",
    productName: "KLONDIKE Industrial EP Gear Lubricant ISO 68",
    productFamily: "industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.industrialEpGear.branch,
    viscosityGrade: "ISO VG 68",
    isoGrade: "68",
    formulation: "Premium base oils with advanced additive technology — not synthetic per PDS positioning.",
    pdsMapKey: "Industrial EP Gear",
    pdsFileName: "KLONDIKE Industrial EP Gear Lubricants PDS.pdf",
    aliases: ["industrial ep gear iso 68", "iso 68 ep gear oil", "iso 68 ep advanced formula gear lubricant", "agma 2 ep"],
    routingKeywords: ["iso 68", "iso68", "industrial ep", "enclosed gear"],
    applications: [...INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "AGMA 9005 D-24, 250.04, 251.02",
      "US Steel 224",
      "DIN 51517 Part 3",
      "ISO 12925-1 type CKC",
      "API Service GL-2",
    ],
    approvals: ["Cincinnati Machine/Milacron per PDS", "AGMA Grade 2 EP"],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: [
      "Route industrial ISO/AGMA/enclosed gear questions to the correct ISO VG row on this PDS.",
      "Do not use as the primary answer for API GL-5 hypoid axle/differential questions.",
      "Indexed pdsMapKey Industrial EP Gear covers ISO 68–460 — confirm grade on label and PDS table.",
    ],
    bestFit: [
      "Enclosed industrial gear drives and reducers specifying ISO VG 68 EP / AGMA 2 EP.",
      "Splash, bath, or circulating systems in steel, mining, and mobile industrial gear cases per PDS.",
    ],
    notBestFit: [
      "Automotive hypoid differential GL-5 80W-90 or 75W-90 requests.",
      "Full synthetic industrial EP ISO 150+ severe programs — use Full Synthetic Industrial EP rows.",
    ],
    technicalProperties: Object.freeze({
      agmaGrade: "2 EP",
      apiGravity: 31.0,
      kinematicViscosity40C_cSt: 68,
      kinematicViscosity100C_cSt: 9.3,
      viscosityIndex: 110,
      flashPointC: 220,
      pourPointC: -33,
    }),
    productNumbers: [
      "Pail: KL-GL3680",
      "Drum: KL-GL3690",
      "Tote: KL-GL3695",
      "Bulk: KL-GL3699",
    ],
    salesPositioning: "Industrial EP ISO 68 for enclosed heavily loaded gear — mineral EP column, not mobile GL-5 default.",
    sourceNotes: [
      "pdsMapKey: Industrial EP Gear (shared index row for ISO 68, 100, 150, 220, 320, 460).",
      "Disambiguate by isoGrade and product number suffix — KL-GL36xx series for ISO 68.",
    ],
  }),

  gearOilRow({
    id: "gear-oil-canonical-industrial-ep-gear-lubricant-iso100",
    productName: "KLONDIKE Industrial EP Gear Lubricant ISO 100",
    productFamily: "industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.industrialEpGear.branch,
    viscosityGrade: "ISO VG 100",
    isoGrade: "100",
    formulation: "Premium base oils with advanced additive technology — not synthetic per PDS positioning.",
    pdsMapKey: "Industrial EP Gear",
    pdsFileName: "KLONDIKE Industrial EP Gear Lubricants PDS.pdf",
    aliases: ["industrial ep gear iso 100", "iso 100 ep gear oil", "iso 100 ep advanced formula gear lubricant", "agma 3 ep"],
    routingKeywords: ["iso 100", "iso100"],
    applications: [...INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "AGMA 9005 D-24, 250.04, 251.02",
      "US Steel 224",
      "DIN 51517 Part 3",
      "ISO 12925-1 type CKC",
      "API Service GL-2",
    ],
    approvals: ["Cincinnati Machine/Milacron per PDS", "AGMA Grade 3 EP"],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: [
      "Do not use as the primary answer for API GL-5 hypoid axle/differential questions.",
      "Confirm ISO VG 100 on gearbox nameplate — shared Industrial EP Gear pdsMapKey.",
    ],
    bestFit: ["Enclosed industrial gear specifying ISO VG 100 EP / AGMA 3 EP."],
    notBestFit: ["Mobile GL-5 differential service.", "ISO 68 or ISO 150 when nameplate specifies another VG."],
    technicalProperties: Object.freeze({
      agmaGrade: "3 EP",
      apiGravity: 28.8,
      kinematicViscosity40C_cSt: 100,
      kinematicViscosity100C_cSt: 11.6,
      viscosityIndex: 104,
      flashPointC: 220,
      pourPointC: -30,
    }),
    productNumbers: [
      "Pail: KL-GL3880",
      "Drum: KL-GL3890",
      "Tote: KL-GL3895",
      "Bulk: KL-GL3899",
    ],
    salesPositioning: "Industrial EP ISO 100 — mineral enclosed-gear column.",
    sourceNotes: ["pdsMapKey: Industrial EP Gear — KL-GL38xx product number family for ISO 100."],
  }),

  gearOilRow({
    id: "gear-oil-canonical-industrial-ep-gear-lubricant-iso150",
    productName: "KLONDIKE Industrial EP Gear Lubricant ISO 150",
    productFamily: "industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.industrialEpGear.branch,
    viscosityGrade: "ISO VG 150",
    isoGrade: "150",
    formulation: "Premium base oils with advanced additive technology — not synthetic per PDS positioning.",
    pdsMapKey: "Industrial EP Gear",
    pdsFileName: "KLONDIKE Industrial EP Gear Lubricants PDS.pdf",
    aliases: ["industrial ep gear iso 150", "iso 150 ep gear oil", "iso 150 ep advanced formula gear lubricant", "agma 4 ep"],
    routingKeywords: ["iso 150", "iso150"],
    applications: [...INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "AGMA 9005 D-24, 250.04, 251.02",
      "US Steel 224",
      "DIN 51517 Part 3",
      "ISO 12925-1 type CKC",
      "API Service GL-2",
    ],
    approvals: ["Cincinnati Machine/Milacron per PDS", "AGMA Grade 4 EP"],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: [
      "Do not use as the primary answer for API GL-5 hypoid axle/differential questions.",
      "Not the same row as Full Synthetic Industrial EP ISO 150 — confirm synthetic vs mineral on index.",
    ],
    bestFit: ["Enclosed industrial gear specifying ISO VG 150 EP / AGMA 4 EP."],
    notBestFit: [
      "Full Synthetic Industrial EP ISO 150 when OEM calls for synthetic severe-service row.",
      "Hypoid axle GL-5.",
    ],
    technicalProperties: Object.freeze({
      agmaGrade: "4 EP",
      apiGravity: 28.8,
      kinematicViscosity40C_cSt: 150,
      kinematicViscosity100C_cSt: 15.3,
      viscosityIndex: 103,
      flashPointC: 272,
      pourPointC: -27,
    }),
    productNumbers: [
      "Pail: KL-GL4080",
      "Drum: KL-GL4090",
      "Tote: KL-GL4095",
      "Bulk: KL-GL4099",
    ],
    salesPositioning: "Industrial EP ISO 150 — common enclosed reducer grade on mineral EP PDS.",
    sourceNotes: ["pdsMapKey: Industrial EP Gear — KL-GL40xx for ISO 150."],
  }),

  gearOilRow({
    id: "gear-oil-canonical-industrial-ep-gear-lubricant-iso220",
    productName: "KLONDIKE Industrial EP Gear Lubricant ISO 220",
    productFamily: "industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.industrialEpGear.branch,
    viscosityGrade: "ISO VG 220",
    isoGrade: "220",
    formulation: "Premium base oils with advanced additive technology — not synthetic per PDS positioning.",
    pdsMapKey: "Industrial EP Gear",
    pdsFileName: "KLONDIKE Industrial EP Gear Lubricants PDS.pdf",
    aliases: ["industrial ep gear iso 220", "iso 220 ep gear oil", "iso 220 ep advanced formula gear lubricant", "agma 5 ep"],
    routingKeywords: ["iso 220", "iso220"],
    applications: [...INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "AGMA 9005 D-24, 250.04, 251.02",
      "US Steel 224",
      "DIN 51517 Part 3",
      "ISO 12925-1 type CKC",
      "API Service GL-2",
    ],
    approvals: ["Cincinnati Machine/Milacron per PDS", "AGMA Grade 5 EP"],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: ["Do not use as the primary answer for API GL-5 hypoid axle/differential questions."],
    bestFit: ["Enclosed industrial gear specifying ISO VG 220 EP / AGMA 5 EP."],
    notBestFit: ["Joy TO-SMEP / synthetic industrial ISO 220 when synthetic row is specified."],
    technicalProperties: Object.freeze({
      agmaGrade: "5 EP",
      apiGravity: 27.8,
      kinematicViscosity40C_cSt: 220,
      kinematicViscosity100C_cSt: 19.5,
      viscosityIndex: 100,
      flashPointC: 280,
      pourPointC: -24,
    }),
    productNumbers: [
      "Pail: KL-GL4280",
      "Drum: KL-GL4290",
      "Tote: KL-GL4295",
      "Bulk: KL-GL4299",
    ],
    salesPositioning: "Industrial EP ISO 220 for heavily loaded enclosed drives.",
    sourceNotes: ["pdsMapKey: Industrial EP Gear — KL-GL42xx for ISO 220."],
  }),

  gearOilRow({
    id: "gear-oil-canonical-industrial-ep-gear-lubricant-iso320",
    productName: "KLONDIKE Industrial EP Gear Lubricant ISO 320",
    productFamily: "industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.industrialEpGear.branch,
    viscosityGrade: "ISO VG 320",
    isoGrade: "320",
    formulation: "Premium base oils with advanced additive technology — not synthetic per PDS positioning.",
    pdsMapKey: "Industrial EP Gear",
    pdsFileName: "KLONDIKE Industrial EP Gear Lubricants PDS.pdf",
    aliases: ["industrial ep gear iso 320", "iso 320 ep gear oil", "iso 320 ep advanced formula gear lubricant", "agma 6 ep"],
    routingKeywords: ["iso 320", "iso320"],
    applications: [...INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "AGMA 9005 D-24, 250.04, 251.02",
      "US Steel 224",
      "DIN 51517 Part 3",
      "ISO 12925-1 type CKC",
      "API Service GL-2",
    ],
    approvals: ["Cincinnati Machine/Milacron per PDS", "AGMA Grade 6 EP"],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: ["Do not use as the primary answer for API GL-5 hypoid axle/differential questions."],
    bestFit: ["Enclosed industrial gear specifying ISO VG 320 EP / AGMA 6 EP."],
    notBestFit: ["Synthetic industrial ISO 320 when full synthetic severe row is required."],
    technicalProperties: Object.freeze({
      agmaGrade: "6 EP",
      apiGravity: 27.1,
      kinematicViscosity40C_cSt: 320,
      kinematicViscosity100C_cSt: 25.5,
      viscosityIndex: 103,
      flashPointC: 280,
      pourPointC: -16,
    }),
    productNumbers: [
      "Pail: KL-GL4480",
      "Drum: KL-GL4490",
      "Tote: KL-GL4495",
      "Bulk: KL-GL4499",
    ],
    salesPositioning: "Industrial EP ISO 320 for large enclosed gear sets.",
    sourceNotes: ["pdsMapKey: Industrial EP Gear — KL-GL44xx for ISO 320."],
  }),

  gearOilRow({
    id: "gear-oil-canonical-industrial-ep-gear-lubricant-iso460",
    productName: "KLONDIKE Industrial EP Gear Lubricant ISO 460",
    productFamily: "industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.industrialEpGear.branch,
    viscosityGrade: "ISO VG 460",
    isoGrade: "460",
    formulation: "Premium base oils with advanced additive technology — not synthetic per PDS positioning.",
    pdsMapKey: "Industrial EP Gear",
    pdsFileName: "KLONDIKE Industrial EP Gear Lubricants PDS.pdf",
    aliases: ["industrial ep gear iso 460", "iso 460 ep gear oil", "iso 460 ep advanced formula gear lubricant", "agma 7 ep"],
    routingKeywords: ["iso 460", "iso460"],
    applications: [...INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "AGMA 9005 D-24, 250.04, 251.02",
      "US Steel 224",
      "DIN 51517 Part 3",
      "ISO 12925-1 type CKC",
      "API Service GL-2",
    ],
    approvals: ["Cincinnati Machine/Milacron per PDS", "AGMA Grade 7 EP"],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: ["Do not use as the primary answer for API GL-5 hypoid axle/differential questions."],
    bestFit: ["Enclosed industrial gear specifying ISO VG 460 EP / AGMA 7 EP."],
    notBestFit: ["Full Synthetic Industrial EP ISO 460 when synthetic MAG P-35 or severe FZG programs apply."],
    technicalProperties: Object.freeze({
      agmaGrade: "7 EP",
      apiGravity: 26.5,
      kinematicViscosity40C_cSt: 460,
      kinematicViscosity100C_cSt: 32.0,
      viscosityIndex: 100,
      flashPointC: 290,
      pourPointC: -15,
    }),
    productNumbers: [
      "Pail: KL-GL4680",
      "Drum: KL-GL4690",
      "Tote: KL-GL4695",
      "Bulk: KL-GL4699",
    ],
    salesPositioning: "Industrial EP ISO 460 — heaviest mineral industrial EP grade on indexed PDS.",
    sourceNotes: ["pdsMapKey: Industrial EP Gear — KL-GL46xx for ISO 460."],
  }),

  gearOilRow({
    id: "gear-oil-canonical-full-synthetic-industrial-ep-gear-lubricant-iso150",
    productName: "KLONDIKE Full Synthetic Industrial EP Gear Lubricant ISO 150",
    productFamily: "full_synthetic_industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.fullSyntheticIndustrialEpGear.branch,
    viscosityGrade: "ISO VG 150",
    isoGrade: "150",
    formulation: "Full synthetic.",
    pdsMapKey: "Synthetic Industrial EP Gear",
    pdsFileName: "KLONDIKE Full Synthetic Industrial EP Gear Lubricants PDS.pdf",
    aliases: [
      "full synthetic industrial ep iso 150",
      "iso 150 ep full synthetic gear lubricant",
      "synthetic industrial ep 150",
    ],
    routingKeywords: ["iso 150", "synthetic industrial ep", "full synthetic industrial"],
    applications: [...SYNTHETIC_INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "ANSI/AGMA 9005-E02 EP",
      "AIST 224 formerly US Steel 224 (ISO 150 through ISO 460 per PDS)",
      "DIN 51517 Part 3",
      "David Brown S1.53.101 Type E",
      "ISO 12925 Type 1 CKC",
      ...SYNTHETIC_INDUSTRIAL_SHARED_PERFORMANCE,
    ],
    approvals: [
      "MAG IAS formerly Cincinnati Machine P-77 ISO 150",
      "Siemens Industrial Gear Revision 13",
    ],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      "Outstanding low temperature fluidity.",
      "Low coefficient of friction.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: [
      "Route synthetic ISO/AGMA/enclosed gear/severe industrial gear questions to the matching ISO VG row.",
      "Do not use as the primary answer for API GL-5 hypoid axle/differential questions.",
      "Shared pdsMapKey Synthetic Industrial EP Gear — disambiguate by ISO grade and KL-GL60xx vs mineral KL-GL40xx families.",
    ],
    bestFit: [
      "Severe enclosed industrial gear requiring full synthetic ISO VG 150 EP with documented FZG/micropitting data on PDS.",
    ],
    notBestFit: [
      "Mineral Industrial EP ISO 150 when non-synthetic is acceptable.",
      "Mobile GL-5 axle differentials.",
    ],
    technicalProperties: Object.freeze({
      agmaGrade: "4 EP",
      apiGravity: 28.6,
      kinematicViscosity40C_cSt: 150,
      kinematicViscosity100C_cSt: 21.2,
      viscosityIndex: 166,
      flashPointC: 240,
      pourPointC: -48,
      loadWearIndexKg: 54,
      falexBFailureLbf: 3250,
    }),
    productNumbers: [
      "Pail: KL-GL6080",
      "Drum: KL-GL6090",
      "Tote: KL-GL6095",
      "Bulk: KL-GL6099",
    ],
    salesPositioning: "Full synthetic industrial EP ISO 150 for extreme-temperature or sustained severe enclosed gear service.",
    sourceNotes: ["pdsMapKey: Synthetic Industrial EP Gear — KL-GL60xx for ISO 150."],
  }),

  gearOilRow({
    id: "gear-oil-canonical-full-synthetic-industrial-ep-gear-lubricant-iso220",
    productName: "KLONDIKE Full Synthetic Industrial EP Gear Lubricant ISO 220",
    productFamily: "full_synthetic_industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.fullSyntheticIndustrialEpGear.branch,
    viscosityGrade: "ISO VG 220",
    isoGrade: "220",
    formulation: "Full synthetic.",
    pdsMapKey: "Synthetic Industrial EP Gear",
    pdsFileName: "KLONDIKE Full Synthetic Industrial EP Gear Lubricants PDS.pdf",
    aliases: [
      "full synthetic industrial ep iso 220",
      "iso 220 ep full synthetic gear lubricant",
      "joy to-smep iso 220",
    ],
    routingKeywords: ["iso 220", "to-smep"],
    applications: [...SYNTHETIC_INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "ANSI/AGMA 9005-E02 EP",
      "DIN 51517 Part 3",
      "ISO 12925 Type 1 CKC",
      "Joy TO-SMEP ISO 220",
      ...SYNTHETIC_INDUSTRIAL_SHARED_PERFORMANCE,
    ],
    approvals: [
      "MAG IAS formerly Cincinnati Machine P-74 ISO 220",
      "Joy TO-SMEP ISO 220",
      "Siemens Industrial Gear Revision 13",
    ],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      "Outstanding low temperature fluidity.",
      "Low coefficient of friction.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: [
      "Do not use as the primary answer for API GL-5 hypoid axle/differential questions.",
      "Joy TO-SHEP ISO 320 is a separate grade row — do not interchange without OEM confirmation.",
    ],
    bestFit: [
      "Mining and severe industrial enclosed gear specifying ISO VG 220 full synthetic EP including Joy TO-SMEP programs on PDS.",
    ],
    notBestFit: ["Mineral Industrial EP ISO 220.", "ISO 320 Joy TO-SHEP when that grade is named."],
    technicalProperties: Object.freeze({
      agmaGrade: "5 EP",
      apiGravity: 29.3,
      kinematicViscosity40C_cSt: 220,
      kinematicViscosity100C_cSt: 28.6,
      viscosityIndex: 168,
      flashPointC: 242,
      pourPointC: -42,
      loadWearIndexKg: 55,
      falexBFailureLbf: 3250,
    }),
    productNumbers: [
      "Pail: KL-GL6280",
      "Drum: KL-GL6290",
      "Tote: KL-GL6295",
      "Bulk: KL-GL6299",
    ],
    salesPositioning: "Full synthetic industrial EP ISO 220 — mining and continuous-duty enclosed gear column.",
    sourceNotes: ["pdsMapKey: Synthetic Industrial EP Gear — Joy TO-SMEP ISO 220 on PDS approvals list."],
  }),

  gearOilRow({
    id: "gear-oil-canonical-full-synthetic-industrial-ep-gear-lubricant-iso320",
    productName: "KLONDIKE Full Synthetic Industrial EP Gear Lubricant ISO 320",
    productFamily: "full_synthetic_industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.fullSyntheticIndustrialEpGear.branch,
    viscosityGrade: "ISO VG 320",
    isoGrade: "320",
    formulation: "Full synthetic.",
    pdsMapKey: "Synthetic Industrial EP Gear",
    pdsFileName: "KLONDIKE Full Synthetic Industrial EP Gear Lubricants PDS.pdf",
    aliases: [
      "full synthetic industrial ep iso 320",
      "iso 320 ep full synthetic gear lubricant",
      "joy to-shep iso 320",
    ],
    routingKeywords: ["iso 320", "to-shep"],
    applications: [...SYNTHETIC_INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "ANSI/AGMA 9005-E02 EP",
      "DIN 51517 Part 3",
      "ISO 12925 Type 1 CKC",
      "Joy TO-SHEP ISO 320",
      ...SYNTHETIC_INDUSTRIAL_SHARED_PERFORMANCE,
    ],
    approvals: [
      "MAG IAS formerly Cincinnati Machine P-59 ISO 320",
      "Joy TO-SHEP ISO 320",
      "Siemens Industrial Gear Revision 13",
    ],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      "Outstanding low temperature fluidity.",
      "Low coefficient of friction.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: [
      "Do not use as the primary answer for API GL-5 hypoid axle/differential questions.",
      "Joy TO-SMEP ISO 220 is a separate grade — match OEM bulletin to ISO VG.",
    ],
    bestFit: ["Severe enclosed gear specifying ISO VG 320 full synthetic EP including Joy TO-SHEP on PDS."],
    notBestFit: ["Mineral Industrial EP ISO 320.", "ISO 220 when TO-SMEP 220 is specified."],
    technicalProperties: Object.freeze({
      agmaGrade: "6 EP",
      apiGravity: 28.0,
      kinematicViscosity40C_cSt: 320,
      kinematicViscosity100C_cSt: 39.2,
      viscosityIndex: 174,
      flashPointC: 242,
      pourPointC: -40,
      loadWearIndexKg: 58,
      falexBFailureLbf: 3250,
    }),
    productNumbers: [
      "Pail: KL-GL6480",
      "Drum: KL-GL6490",
      "Tote: KL-GL6495",
      "Bulk: KL-GL6499",
    ],
    salesPositioning: "Full synthetic industrial EP ISO 320 for heavy enclosed drives with Joy TO-SHEP positioning on PDS.",
    sourceNotes: ["pdsMapKey: Synthetic Industrial EP Gear"],
  }),

  gearOilRow({
    id: "gear-oil-canonical-full-synthetic-industrial-ep-gear-lubricant-iso460",
    productName: "KLONDIKE Full Synthetic Industrial EP Gear Lubricant ISO 460",
    productFamily: "full_synthetic_industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.fullSyntheticIndustrialEpGear.branch,
    viscosityGrade: "ISO VG 460",
    isoGrade: "460",
    formulation: "Full synthetic.",
    pdsMapKey: "Synthetic Industrial EP Gear",
    pdsFileName: "KLONDIKE Full Synthetic Industrial EP Gear Lubricants PDS.pdf",
    aliases: [
      "full synthetic industrial ep iso 460",
      "iso 460 ep full synthetic gear lubricant",
      "mag p-35 iso 460",
    ],
    routingKeywords: ["iso 460"],
    applications: [...SYNTHETIC_INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "ANSI/AGMA 9005-E02 EP",
      "AIST 224 formerly US Steel 224 (ISO 150 through ISO 460 per PDS)",
      "DIN 51517 Part 3",
      "ISO 12925 Type 1 CKC",
      ...SYNTHETIC_INDUSTRIAL_SHARED_PERFORMANCE,
    ],
    approvals: [
      "MAG IAS formerly Cincinnati Machine P-35 ISO 460",
      "Siemens Industrial Gear Revision 13",
    ],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      "Outstanding low temperature fluidity.",
      "Low coefficient of friction.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: ["Do not use as the primary answer for API GL-5 hypoid axle/differential questions."],
    bestFit: ["Severe enclosed industrial gear specifying ISO VG 460 full synthetic EP with MAG P-35 positioning on PDS."],
    notBestFit: ["Mineral Industrial EP ISO 460.", "ISO 680 when nameplate requires highest VG on synthetic PDS."],
    technicalProperties: Object.freeze({
      agmaGrade: "7 EP",
      apiGravity: 26.2,
      kinematicViscosity40C_cSt: 460,
      kinematicViscosity100C_cSt: 53.1,
      viscosityIndex: 180,
      flashPointC: 245,
      pourPointC: -38,
      loadWearIndexKg: 58,
      falexBFailureLbf: 3750,
    }),
    productNumbers: [
      "Pail: KL-GL6680",
      "Drum: KL-GL6690",
      "Tote: KL-GL6695",
      "Bulk: KL-GL6699",
    ],
    salesPositioning: "Full synthetic industrial EP ISO 460 for largest severe enclosed gear on synthetic PDS table.",
    sourceNotes: ["pdsMapKey: Synthetic Industrial EP Gear — KL-GL66xx for ISO 460."],
  }),

  gearOilRow({
    id: "gear-oil-canonical-full-synthetic-industrial-ep-gear-lubricant-iso680",
    productName: "KLONDIKE Full Synthetic Industrial EP Gear Lubricant ISO 680",
    productFamily: "full_synthetic_industrial_ep_gear",
    marketSegment: "industrial_enclosed_gear",
    hierarchyBranch: GEAR_OIL_CANONICAL_HIERARCHY_REF.fullSyntheticIndustrialEpGear.branch,
    viscosityGrade: "ISO VG 680",
    isoGrade: "680",
    formulation: "Full synthetic.",
    pdsMapKey: "Synthetic Industrial EP Gear",
    pdsFileName: "KLONDIKE Full Synthetic Industrial EP Gear Lubricants PDS.pdf",
    aliases: [
      "full synthetic industrial ep iso 680",
      "iso 680 ep full synthetic gear lubricant",
      "agma 8 ep synthetic",
    ],
    routingKeywords: ["iso 680", "iso680"],
    applications: [...SYNTHETIC_INDUSTRIAL_EP_APPLICATIONS],
    specifications: [
      "ANSI/AGMA 9005-E02 EP",
      "DIN 51517 Part 3",
      "ISO 12925 Type 1 CKC",
      ...SYNTHETIC_INDUSTRIAL_SHARED_PERFORMANCE,
    ],
    approvals: ["Siemens Industrial Gear Revision 13", "AGMA Grade 8 EP"],
    differentiators: [
      "Long service life.",
      "Excellent thermal and oxidation stability.",
      "Corrosion protection.",
      "Water separation.",
      "Low foam.",
      "Outstanding low temperature fluidity.",
      "Low coefficient of friction.",
      ...INDUSTRIAL_MATERIAL_COMPATIBILITY,
    ],
    cautions: [
      "Do not use as the primary answer for API GL-5 hypoid axle/differential questions.",
      "Highest ISO VG on Full Synthetic Industrial EP PDS — confirm nameplate before quoting.",
    ],
    bestFit: [
      "Continuous severe enclosed gearboxes requiring ISO VG 680 full synthetic EP per PDS table.",
    ],
    notBestFit: ["Lower ISO VG when nameplate specifies 460 or below.", "Mobile GL-5 programs."],
    technicalProperties: Object.freeze({
      agmaGrade: "8 EP",
      apiGravity: 25.2,
      kinematicViscosity40C_cSt: 680,
      kinematicViscosity100C_cSt: 72.2,
      viscosityIndex: 184,
      flashPointC: 252,
      pourPointC: -36,
      loadWearIndexKg: 55,
      falexBFailureLbf: 3750,
    }),
    productNumbers: [
      "Pail: KL-GL6880",
      "Drum: KL-GL6890",
      "Tote: KL-GL6895",
      "Bulk: KL-GL6899",
    ],
    salesPositioning: "Full synthetic industrial EP ISO 680 — top VG on indexed synthetic industrial EP PDS.",
    sourceNotes: [
      "pdsMapKey: Synthetic Industrial EP Gear — ISO 680 listed in pdsMap alias bundle; confirm live PDS grade table.",
    ],
  }),
];

/** @type {Readonly<Record<string, GearOilCanonicalProductIntelligence>>} */
const GEAR_OIL_CANONICAL_BY_ID = Object.freeze(
  Object.fromEntries(GEAR_OIL_CANONICAL_PRODUCT_ROWS.map((p) => [p.id, p]))
);

/** @type {Readonly<{ version: number, category: "gear_oils", products: readonly GearOilCanonicalProductIntelligence[] }>} */
export const GEAR_OIL_CANONICAL_PRODUCT_INTELLIGENCE = Object.freeze({
  version: GEAR_OIL_CANONICAL_PRODUCT_INTELLIGENCE_VERSION,
  category: "gear_oils",
  products: Object.freeze(GEAR_OIL_CANONICAL_PRODUCT_ROWS),
});

/** @returns {readonly GearOilCanonicalProductIntelligence[]} */
export function listGearOilCanonicalProductIntelligence() {
  return GEAR_OIL_CANONICAL_PRODUCT_INTELLIGENCE.products;
}

/**
 * @param {unknown} id
 * @returns {GearOilCanonicalProductIntelligence | null}
 */
export function getGearOilCanonicalProductIntelligenceById(id) {
  const key = String(id ?? "").trim();
  if (!key) return null;
  return GEAR_OIL_CANONICAL_BY_ID[key] || null;
}

/**
 * @param {unknown} pdsMapKey
 * @returns {GearOilCanonicalProductIntelligence | null}
 */
export function getGearOilCanonicalProductIntelligenceByPdsKey(pdsMapKey) {
  const key = String(pdsMapKey ?? "").trim();
  if (!key) return null;
  return GEAR_OIL_CANONICAL_PRODUCT_INTELLIGENCE.products.find((p) => p.pdsMapKey === key) || null;
}
