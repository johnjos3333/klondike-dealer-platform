/**
 * Deterministic Klondike product entity resolver — explicit product names beat generic advisor routing.
 * Plain JavaScript only; not wired to UI yet.
 */

import { PDS_MAP } from "../data/pdsMap.js";
import {
  NANO_EP_2_FLAGSHIP_PRODUCT_ID,
  NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE,
  isNanoEp2FlagshipId,
  isNanoEp2ProductQuery,
} from "../data/flagshipProductIntelligence.js";
import { getSalesEnablementFlagshipNarrativeById } from "../data/salesEnablement/salesEnablementFlagshipNarrativeLookup.js";
import {
  GREASE_CANONICAL_PRODUCT_INTELLIGENCE,
  getGreaseCanonicalProductIntelligenceById,
  getGreaseCanonicalProductIntelligenceByPdsKey,
  listGreaseCanonicalProductIntelligence,
} from "../data/greaseCanonicalProductIntelligence.js";
import {
  HYDRAULIC_CANONICAL_PRODUCT_INTELLIGENCE,
  getHydraulicCanonicalProductIntelligenceById,
  getHydraulicCanonicalProductIntelligenceByPdsKey,
  listHydraulicCanonicalProductIntelligence,
} from "../data/hydraulicCanonicalProductIntelligence.js";
import {
  HD_ENGINE_OIL_CANONICAL_PRODUCT_INTELLIGENCE,
  getHdEngineOilCanonicalProductIntelligenceById,
  getHdEngineOilCanonicalProductIntelligenceByPdsKey,
  listHdEngineOilCanonicalProductIntelligence,
} from "../data/heavyDutyEngineOilCanonicalIntelligence.js";
import {
  TRANSMISSION_CANONICAL_PRODUCT_INTELLIGENCE,
  getTransmissionCanonicalProductIntelligenceById,
  getTransmissionCanonicalProductIntelligenceByPdsKey,
  listTransmissionCanonicalProductIntelligence,
} from "../data/transmissionCanonicalProductIntelligence.js";
import {
  COOLANT_CANONICAL_PRODUCT_INTELLIGENCE,
  getCoolantCanonicalProductIntelligenceById,
  getCoolantCanonicalProductIntelligenceByPdsKey,
  listCoolantCanonicalProductIntelligence,
} from "../data/coolantCanonicalProductIntelligence.js";
import {
  GEAR_OIL_CANONICAL_PRODUCT_INTELLIGENCE,
  getGearOilCanonicalProductIntelligenceById,
  listGearOilCanonicalProductIntelligence,
} from "../data/gearOilCanonicalProductIntelligence.js";
import {
  INDUSTRIAL_SPECIALTY_OIL_CANONICAL_PRODUCT_INTELLIGENCE,
  getIndustrialSpecialtyOilCanonicalProductIntelligenceById,
  listIndustrialSpecialtyOilCanonicalProductIntelligence,
} from "../data/industrialSpecialtyOilCanonicalProductIntelligence.js";
import {
  AGRI_OEM_CANONICAL_PRODUCT_INTELLIGENCE,
  getAgriOemCanonicalProductIntelligenceById,
  listAgriOemCanonicalProductIntelligence,
} from "../data/agriOemCanonicalProductIntelligence.js";
import {
  COMPLIANCE_SPECIALTY_CANONICAL_PRODUCT_INTELLIGENCE,
  getComplianceSpecialtyCanonicalProductIntelligenceById,
  listComplianceSpecialtyCanonicalProductIntelligence,
} from "../data/complianceSpecialtyCanonicalProductIntelligence.js";
import { normalizeProductQuery, searchKlondikeProducts } from "./klondikeProductRetrievalHelpers.js";

const ENTITY_EXACT_MIN_SCORE = 34;
const ENTITY_DETECT_MIN_SCORE = 14;
const ENTITY_AMBIGUOUS_GAP = 6;
/** Exact KL-GL#### gear-oil SKU match outranks all other canonical families. */
const GEAR_OIL_EXACT_PRODUCT_NUMBER_SCORE = 100;
/** Exact KL-IO#### industrial/specialty oil SKU match outranks other canonical families. */
const INDUSTRIAL_SPECIALTY_OIL_EXACT_PRODUCT_NUMBER_SCORE = 100;
/** Exact KL-AG#### / KL-GR#### Ag OEM SKU match outranks other canonical families. */
const AGRI_OEM_EXACT_PRODUCT_NUMBER_SCORE = 100;
/** Exact KL-FG#### / KL-BL#### compliance specialty SKU match outranks other canonical families. */
const COMPLIANCE_SPECIALTY_EXACT_PRODUCT_NUMBER_SCORE = 100;

/** @type {Readonly<Record<string, string>>} */
const GREASE_CANONICAL_FLAGSHIP_BY_ID = Object.freeze({
  "grease-canonical-nano-calcium-sulfonate-ep": NANO_EP_2_FLAGSHIP_PRODUCT_ID,
  "grease-canonical-moly-tac-ep-2": "flagship-moly-tac-ep2-grease",
  "grease-canonical-moly-tac-ep-1": "flagship-moly-tac-ep2-grease",
  "grease-canonical-moly-tac-arctic-ep-0": "flagship-moly-tac-ep2-grease",
  "grease-canonical-moly-tac-bentone-ep-2": "flagship-moly-tac-ep2-grease",
});

/** Registry entity id when grease canonical row maps to an existing entity bucket. */
/** @type {Readonly<Record<string, string>>} */
const GREASE_CANONICAL_REGISTRY_ENTITY_ID = Object.freeze({
  "grease-canonical-nano-calcium-sulfonate-ep": "entity-nano-ep-2",
  "grease-canonical-moly-tac-ep-2": "entity-moly-tac-ep-2",
  "grease-canonical-moly-tac-ep-1": "entity-moly-tac-ep-2",
  "grease-canonical-moly-tac-arctic-ep-0": "entity-moly-tac-ep-2",
  "grease-canonical-moly-tac-bentone-ep-2": "entity-moly-tac-ep-2",
});

/** @type {Readonly<Record<string, string>>} */
const HYDRAULIC_CANONICAL_FLAGSHIP_BY_ID = Object.freeze({
  "hydr-canonical-xvi-all-season": "flagship-xvi-all-season-extreme-hydraulic",
});

/** Registry entity id when hydraulic canonical row maps to an existing entity bucket. */
/** @type {Readonly<Record<string, string>>} */
const HYDRAULIC_CANONICAL_REGISTRY_ENTITY_ID = Object.freeze({
  "hydr-canonical-xvi-all-season": "entity-xvi-hydraulic",
  "hydr-canonical-wet-brake-fluid-full-synthetic": "entity-wet-brake-fluid",
});

/** @type {Readonly<Record<string, string>>} */
const HD_CANONICAL_FLAGSHIP_BY_ID = Object.freeze({
  "hd-canonical-full-synthetic-15w40": "flagship-15w40-ck4-full-synthetic-hd",
});

/** Registry entity id when HD canonical row maps to an existing entity bucket. */
/** @type {Readonly<Record<string, string>>} */
const HD_CANONICAL_REGISTRY_ENTITY_ID = Object.freeze({
  "hd-canonical-full-synthetic-15w40": "entity-full-synthetic-15w-40",
});

/** Registry entity id when transmission canonical row maps to an existing entity bucket. */
/** @type {Readonly<Record<string, string>>} */
const TRANSMISSION_CANONICAL_REGISTRY_ENTITY_ID = Object.freeze({
  "tx-canonical-wet-brake-fluid": "entity-wet-brake-fluid",
});

/**
 * @typedef {{
 *   id: string,
 *   label: string,
 *   flagshipId: string | null,
 *   pdsKeys: string[],
 *   scoreQuery: (normQ: string) => number,
 *   pickPdsKey: (normQ: string) => string | null,
 * }} ProductEntityDefinition
 */

/** @type {ProductEntityDefinition[]} */
const PRODUCT_ENTITY_REGISTRY = [
  {
    id: "entity-nano-ep-2",
    label: "Nano EP 2 Grease",
    flagshipId: NANO_EP_2_FLAGSHIP_PRODUCT_ID,
    pdsKeys: ["Nano Calcium Sulfonate EP"],
    scoreQuery(normQ) {
      if (isNanoEp2ProductQuery(normQ)) return 48;
      if (normQ.includes("nano calcium sulfonate")) return 44;
      if (normQ.includes("nano grease") && !normQ.includes("full synthetic")) return 38;
      if (/\bnano\b/.test(normQ) && /\bep\s*2\b/.test(normQ)) return 40;
      if (normQ === "nano" || normQ === "klondike nano") return 22;
      return 0;
    },
    pickPdsKey: () => "Nano Calcium Sulfonate EP",
  },
  {
    id: "entity-full-synthetic-15w-40",
    label: "15W-40 Full Synthetic HD Engine Oil",
    flagshipId: "flagship-15w40-ck4-full-synthetic-hd",
    pdsKeys: ["15W-40 Full Synthetic"],
    scoreQuery(normQ) {
      if (normQ.includes("full synthetic 15w 40") || normQ.includes("15w 40 full synthetic")) return 46;
      if (normQ.includes("15w 40") && normQ.includes("full synthetic")) return 42;
      if (normQ.includes("ck 4") && normQ.includes("15w 40") && normQ.includes("synthetic")) return 40;
      return 0;
    },
    pickPdsKey: () => "15W-40 Full Synthetic",
  },
  {
    id: "entity-xvi-hydraulic",
    label: "XVI All Season Extreme Hydraulic Fluid",
    flagshipId: "flagship-xvi-all-season-extreme-hydraulic",
    pdsKeys: ["XVI All Season Hydraulic"],
    scoreQuery(normQ) {
      if (/\bxvi\b/.test(normQ)) return 0;
      if (normQ.includes("xvi") && normQ.includes("hydraulic")) return 0;
      if (normQ.includes("xvi all season")) return 0;
      return 0;
    },
    pickPdsKey: () => "XVI All Season Hydraulic",
  },
  {
    id: "entity-utf-full-synthetic",
    label: "Universal Tractor Fluid Full Synthetic",
    flagshipId: "flagship-utf-full-synthetic-tractor",
    pdsKeys: ["Universal Tractor Fluid Full Synthetic", "Universal Tractor Fluid"],
    scoreQuery(normQ) {
      if (normQ.includes("utf") && normQ.includes("full synthetic")) return 46;
      if (normQ.includes("universal tractor fluid") && normQ.includes("full synthetic")) return 46;
      if (normQ === "utf" || normQ.includes(" klondike utf")) return 0;
      if (normQ.includes("universal tractor fluid") && !normQ.includes("synthetic")) return 0;
      return 0;
    },
    pickPdsKey(normQ) {
      if (normQ.includes("full synthetic") || normQ.includes("synthetic utf")) {
        return "Universal Tractor Fluid Full Synthetic";
      }
      return "Universal Tractor Fluid Full Synthetic";
    },
  },
  {
    id: "entity-wet-brake-fluid",
    label: "Wet Brake Fluid Full Synthetic",
    flagshipId: null,
    pdsKeys: ["Wet Brake Fluid Full Synthetic"],
    scoreQuery(normQ) {
      if (normQ.includes("wet brake")) return 0;
      if (normQ.includes("wet brake fluid")) return 0;
      return 0;
    },
    pickPdsKey: () => "Wet Brake Fluid Full Synthetic",
  },
  {
    id: "entity-moly-tac-ep-2",
    label: "Moly Tac EP-2 Grease",
    flagshipId: "flagship-moly-tac-ep2-grease",
    pdsKeys: ["Moly Tac EP-2", "Moly Tac EP-1", "Moly Tac Bentone EP-2", "Moly Tac Arctic EP-0"],
    scoreQuery(normQ) {
      if (hasStrongAgriPolyTacCue(normQ)) return 0;
      if (isNanoEp2ProductQuery(normQ) || (/\bnano\b/.test(normQ) && !normQ.includes("full synthetic"))) {
        return 0;
      }
      if (normQ.includes("moly tac")) {
        if (normQ.includes("ep 1") || normQ.includes("ep1")) return 38;
        if (normQ.includes("bentone")) return 38;
        if (normQ.includes("arctic")) return 38;
        return 44;
      }
      if (normQ.includes("moly tac ep 2") || normQ.includes("moly tac ep2")) return 46;
      if (/\bmoly\b/.test(normQ) || normQ.includes("molybdenum")) return 36;
      return 0;
    },
    pickPdsKey(normQ) {
      if (normQ.includes("ep 1") || normQ.includes("ep1")) return "Moly Tac EP-1";
      if (normQ.includes("bentone")) return "Moly Tac Bentone EP-2";
      if (normQ.includes("arctic")) return "Moly Tac Arctic EP-0";
      return "Moly Tac EP-2";
    },
  },
  {
    id: "entity-open-gear",
    label: "Open Gear (Grease or Lubricant)",
    flagshipId: null,
    pdsKeys: ["Open Gear Grease", "Open Gear Lubricant"],
    scoreQuery() {
      return 0;
    },
    pickPdsKey() {
      return null;
    },
  },
  {
    id: "entity-enviro-hydraulic",
    label: "ENVIRO Hydraulic Fluid",
    flagshipId: null,
    pdsKeys: ["Enviro AW Hydraulic", "Enviro MV Hydraulic"],
    scoreQuery(normQ) {
      if (!normQ.includes("enviro")) return 0;
      if (normQ.includes("enviro mv") || (normQ.includes("mv") && normQ.includes("enviro"))) return 44;
      if (normQ.includes("enviro aw") || (normQ.includes("aw") && normQ.includes("enviro"))) return 42;
      return 36;
    },
    pickPdsKey(normQ) {
      if (normQ.includes("mv")) return "Enviro MV Hydraulic";
      if (normQ.includes("aw")) return "Enviro AW Hydraulic";
      return null;
    },
  },
  {
    id: "entity-bio-aw-hydraulic",
    label: "Bio AW Hydraulic",
    flagshipId: null,
    pdsKeys: ["Bio AW Hydraulic"],
    scoreQuery(normQ) {
      if (normQ.includes("bio aw")) return 44;
      if (normQ.includes("bio") && normQ.includes("aw") && normQ.includes("hydraulic")) return 40;
      return 0;
    },
    pickPdsKey: () => "Bio AW Hydraulic",
  },
  {
    id: "entity-euro-engine-oil",
    label: "Euro engine oil (indexed PDS row)",
    flagshipId: null,
    pdsKeys: [
      "0W-20 Euro Full Synthetic",
      "0W-30 Euro Low SAPS",
      "5W-30 Euro Low SAPS",
      "5W-30 Euro Mid SAPS",
      "5W-40 Euro Mid SAPS",
      "5W-40 SN/CF Euro Full Synthetic",
    ],
    scoreQuery(normQ) {
      if (!normQ.includes("euro")) return 0;
      let score = 32;
      if (/\b0w\s*20\b/.test(normQ)) score += 12;
      if (/\b0w\s*30\b/.test(normQ)) score += 12;
      if (/\b5w\s*30\b/.test(normQ)) score += 12;
      if (/\b5w\s*40\b/.test(normQ)) score += 12;
      if (normQ.includes("low saps")) score += 10;
      if (normQ.includes("mid saps")) score += 10;
      if (normQ.includes("sn cf") || normQ.includes("sn/cf")) score += 10;
      return score;
    },
    pickPdsKey(normQ) {
      if (/\b0w\s*20\b/.test(normQ)) return "0W-20 Euro Full Synthetic";
      if (/\b0w\s*30\b/.test(normQ) && normQ.includes("low saps")) return "0W-30 Euro Low SAPS";
      if (/\b5w\s*30\b/.test(normQ) && normQ.includes("low saps")) return "5W-30 Euro Low SAPS";
      if (/\b5w\s*30\b/.test(normQ) && normQ.includes("mid saps")) return "5W-30 Euro Mid SAPS";
      if (/\b5w\s*40\b/.test(normQ) && normQ.includes("mid saps")) return "5W-40 Euro Mid SAPS";
      if (/\b5w\s*40\b/.test(normQ)) return "5W-40 SN/CF Euro Full Synthetic";
      if (normQ.includes("low saps")) return "5W-30 Euro Low SAPS";
      if (normQ.includes("mid saps")) return "5W-40 Euro Mid SAPS";
      return null;
    },
  },
  {
    id: "entity-deep-well-pump-oil",
    label: "Deep Well Pump Oil",
    flagshipId: null,
    pdsKeys: [],
    scoreQuery(normQ) {
      if (normQ.includes("deep well") || normQ.includes("deepwell")) return 38;
      if (normQ.includes("pump oil") && normQ.includes("well")) return 34;
      return 0;
    },
    pickPdsKey: () => null,
  },
];

/**
 * @param {string} n
 */
function relaxNormalizedProductQuery(n) {
  return String(n ?? "")
    .replace(/\bnano ep2\b/g, "nano ep 2")
    .replace(/\bep2\b/g, "ep 2")
    .replace(/\b15w40\b/g, "15w 40")
    .replace(/\b0w20\b/g, "0w 20")
    .replace(/\b0w30\b/g, "0w 30")
    .replace(/\b5w30\b/g, "5w 30")
    .replace(/\b5w40\b/g, "5w 40")
    .replace(/\b10w30\b/g, "10w 30")
    .replace(/\b10w40\b/g, "10w 40")
    .replace(/\b15w30\b/g, "15w 30")
    .replace(/\b0w30\b/g, "0w 30")
    .replace(/\b0w40\b/g, "0w 40")
    .replace(/\b75w80\b/g, "75w 80")
    .replace(/\b75w90\b/g, "75w 90")
    .replace(/\b75w140\b/g, "75w 140")
    .replace(/\b80w90\b/g, "80w 90")
    .replace(/\b85w140\b/g, "85w 140")
    .replace(/\bgl5\b/g, "gl 5")
    .replace(/\bmt1\b/g, "mt 1")
    .replace(/\biso(22|32|46|68|90|100|150|220|260|320|460|680)\b/g, "iso $1")
    .replace(/\bchainsaw\b/g, "chain saw")
    .replace(/\bhi[\s-]?tack\b/g, "hi tack")
    .replace(/\bnon[\s-]?detergent\b/g, "non detergent")
    .replace(/\bnd30\b/g, "nd 30")
    .replace(/\bagrimax\b/g, "agrimax")
    .replace(/\bagri\s+max\b/g, "agrimax")
    .replace(/\bcoolgard\b/g, "cool gard")
    .replace(/\bcool[\s-]?gard\b/g, "cool gard")
    .replace(/\bplus50\b/g, "plus 50")
    .replace(/\bplus[\s-]?50\b/g, "plus 50")
    .replace(/\bj20c\b/g, "j20c")
    .replace(/\bj[\s-]?20c\b/g, "j20c")
    .replace(/\bjdm\s+j[\s-]?20c\b/g, "jdm j20c")
    .replace(/\bmat3724\b/g, "mat 3724")
    .replace(/\bmat\s*3724\b/g, "mat 3724")
    .replace(/\bmat3624\b/g, "mat 3624")
    .replace(/\bmat\s*3624\b/g, "mat 3624")
    .replace(/\bmat3572\b/g, "mat 3572")
    .replace(/\bmat\s*3572\b/g, "mat 3572")
    .replace(/\bmat3544\b/g, "mat 3544")
    .replace(/\bmat\s*3544\b/g, "mat 3544")
    .replace(/\bmat3540\b/g, "mat 3540")
    .replace(/\bmat\s*3540\b/g, "mat 3540")
    .replace(/\bcaseih\b/g, "case ih")
    .replace(/\bcase[\s-]?ih\b/g, "case ih")
    .replace(/\b15w40\b/g, "15w 40")
    .replace(/\bzf\b/g, "zf")
    .replace(/\bzinc[\s-]?free\b/g, "zinc free")
    .replace(/\bfoodgrade\b/g, "food grade")
    .replace(/\bnsfh1\b/g, "nsf h1")
    .replace(/\b21cfr1783570\b/g, "21 cfr 178.3570")
    .replace(/\bfda\s*21\s*cfr\b/g, "fda 21 cfr")
    .replace(/\bbio[\s-]?degradable\b/g, "biodegradable")
    .replace(/\benvironmentally\s+acceptable\s+lubricant\b/g, "eal")
    .replace(/\bvessel\s+general\s+permit\b/g, "vgp")
    .replace(/\boecd301b\b/g, "oecd 301b")
    .replace(/\boecd203\b/g, "oecd 203")
    .replace(/\bbio[\s-]?synthetic\b/g, "bio synthetic")
    .replace(/\bbiosynthetic\b/g, "bio synthetic")
    .replace(/\benviro\s+aw\b/g, "enviro aw")
    .replace(/\benviro\s+mv\b/g, "enviro mv")
    .replace(/\bbio\s+aw\b/g, "bio aw")
    .replace(/\bbio\s+rock\s+drill\b/g, "bio rock drill")
    .replace(/\bkl[\s-]?fg\s*(\d{4})\b/g, "kl fg $1")
    .replace(/\bkl[\s-]?bl\s*(\d{4})\b/g, "kl bl $1");
}

/**
 * @param {string} id
 * @param {string} title
 * @param {string} [body]
 * @param {string[]} [items]
 */
function narrativeSection(id, title, body, items) {
  return { id, title, ...(body ? { body } : {}), ...(items?.length ? { items } : {}) };
}

/** @param {string[]} arr */
function uniqStrings(arr) {
  const out = [];
  const seen = new Set();
  for (const s of arr) {
    const t = String(s ?? "").trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

/**
 * @param {string} normQ
 */
function isMolyGreaseQuery(normQ) {
  return /\bmoly\b/.test(normQ) || normQ.includes("molybdenum") || normQ.includes("moly tac");
}

/**
 * @param {string} normQ
 */
function isNanoGreaseQuery(normQ) {
  if (isNanoEp2ProductQuery(normQ)) return true;
  if (normQ.includes("nano calcium sulfonate")) return true;
  if (normQ.includes("nano grease") && !normQ.includes("full synthetic")) return true;
  if (/\bnano\b/.test(normQ) && !normQ.includes("full synthetic") && !isMolyGreaseQuery(normQ)) return true;
  return false;
}

/**
 * @param {import("../data/greaseCanonicalProductIntelligence.js").GreaseCanonicalProductIntelligence} grease
 * @param {string} normQ
 */
function hasStrongAgriPolyTacCue(normQ) {
  return (
    normQ.includes("poly tac") ||
    normQ.includes("agrimax poly") ||
    (normQ.includes("gc-lb") && normQ.includes("polyurea")) ||
    (normQ.includes("green ag") && normQ.includes("grease") && normQ.includes("polyurea")) ||
    normQ.includes("jdm grease")
  );
}

function scoreGreaseCanonicalProduct(grease, normQ) {
  if (
    queryHasFoodGradeComplianceCue(normQ) &&
    (normQ.includes("grease") || normQ.includes("ep 2") || normQ.includes("food safe grease"))
  ) {
    return 0;
  }
  if (hasStrongAgriPolyTacCue(normQ) && grease.id.includes("moly-tac")) return 0;
  if (isNanoGreaseQuery(normQ)) {
    if (grease.id.includes("moly-tac") && !isMolyGreaseQuery(normQ)) return 0;
    if (grease.id === "grease-canonical-nano-full-synthetic-ep-1-5") return 0;
  }
  if (isMolyGreaseQuery(normQ) && !isNanoGreaseQuery(normQ)) {
    if (grease.id.includes("nano")) return 0;
  }
  if (normQ.includes("open gear")) {
    if (normQ.includes("lubricant") && !normQ.includes("grease")) {
      if (grease.pdsMapKey !== "Open Gear Lubricant") return 0;
    } else if (normQ.includes("grease") && !normQ.includes("lubricant")) {
      if (grease.pdsMapKey !== "Open Gear Grease") return 0;
    }
  }

  let score = 0;
  const productNorm = normalizeProductQuery(grease.productName);
  if (productNorm.length >= 8 && normQ.includes(productNorm)) {
    score = Math.max(score, 42);
  }
  const mapKeyNorm = normalizeProductQuery(grease.pdsMapKey);
  if (mapKeyNorm.length >= 6 && normQ.includes(mapKeyNorm)) {
    score = Math.max(score, 40);
  }

  for (const alias of grease.aliases) {
    const a = normalizeProductQuery(alias);
    if (a.length < 3) continue;
    if (normQ === a) score = Math.max(score, 48);
    else if (a.length >= 10 && normQ.includes(a)) score = Math.max(score, 40 + Math.min(12, a.length - 8));
    else if (normQ.includes(a)) score = Math.max(score, 30 + Math.min(14, a.length));
  }

  if (grease.id === "grease-canonical-nano-calcium-sulfonate-ep" && isNanoGreaseQuery(normQ)) {
    score = Math.max(score, 50);
  }
  if (grease.id.startsWith("grease-canonical-moly-tac") && isMolyGreaseQuery(normQ) && !isNanoGreaseQuery(normQ)) {
    if (grease.id === "grease-canonical-moly-tac-ep-2" && !normQ.includes("ep 1") && !normQ.includes("bentone") && !normQ.includes("arctic")) {
      score = Math.max(score, 46);
    } else if (normQ.includes("ep 1") && grease.id === "grease-canonical-moly-tac-ep-1") {
      score = Math.max(score, 46);
    } else if (normQ.includes("bentone") && grease.id === "grease-canonical-moly-tac-bentone-ep-2") {
      score = Math.max(score, 46);
    } else if (normQ.includes("arctic") && grease.id === "grease-canonical-moly-tac-arctic-ep-0") {
      score = Math.max(score, 46);
    }
  }
  if (grease.id === "grease-canonical-open-gear-grease" && normQ.includes("open gear") && normQ.includes("grease") && !normQ.includes("lubricant")) {
    score = Math.max(score, 44);
  }
  if (grease.id === "grease-canonical-open-gear-lubricant" && normQ.includes("open gear") && normQ.includes("lubricant")) {
    score = Math.max(score, 44);
  }

  return score;
}

/**
 * @param {string} normQ
 */
function isGreaseOnlyProductQuery(normQ) {
  if (normQ.includes("grease") && !normQ.includes("hydraulic") && !normQ.includes("utf") && !normQ.includes("tractor fluid")) {
    return true;
  }
  if (isNanoGreaseQuery(normQ) || isMolyGreaseQuery(normQ)) return true;
  return false;
}

/**
 * @param {string} normQ
 */
function isXviHydraulicQuery(normQ) {
  if (/\bxvi\b/.test(normQ)) return true;
  if (normQ.includes("xvi all season")) return true;
  if (normQ.includes("extreme") && normQ.includes("hydraulic") && !normQ.includes("grease")) return true;
  if (normQ.includes("all season blend extreme") && normQ.includes("hydraulic")) return true;
  return false;
}

/**
 * @param {string} normQ
 */
function isWetBrakeOrChatterQuery(normQ) {
  if (normQ.includes("wet brake")) return true;
  if (normQ.includes("chatter") && (normQ.includes("brake") || normQ.includes("utf") || normQ.includes("tractor"))) {
    return true;
  }
  return false;
}

/**
 * @param {string} normQ
 */
function isArcticTractorFluidQuery(normQ) {
  if (normQ.includes("moly tac") && normQ.includes("arctic")) return false;
  if (normQ.includes("arctic tractor")) return true;
  if (normQ.includes("arctic utf")) return true;
  if (normQ.includes("j20d") && normQ.includes("arctic")) return true;
  if (normQ.includes("arctic") && (normQ.includes("tractor fluid") || normQ.includes("utto"))) return true;
  return false;
}

/**
 * @param {string} normQ
 */
function isPlainUtfQuery(normQ) {
  if (normQ.includes("full synthetic") && (normQ.includes("utf") || normQ.includes("universal tractor"))) return false;
  if (normQ.includes("red") && normQ.includes("tractor")) return false;
  if (isArcticTractorFluidQuery(normQ)) return false;
  if (normQ === "utf" || normQ.includes(" klondike utf")) return true;
  if (normQ.includes("universal tractor fluid") && !normQ.includes("synthetic")) return true;
  if (normQ.includes("utto") && !normQ.includes("synthetic") && !normQ.includes("red")) return true;
  return false;
}

/**
 * @param {string} normQ
 */
function isRedUtfQuery(normQ) {
  return (
    normQ.includes("red") &&
    (normQ.includes("tractor fluid") || normQ.includes("utf") || normQ.includes("cnh"))
  );
}

/**
 * @param {import("../data/hydraulicCanonicalProductIntelligence.js").HydraulicCanonicalProductIntelligence} hydr
 * @param {string} normQ
 */
function scoreHydraulicCanonicalProduct(hydr, normQ) {
  if (shouldSuppressBaseHydraulicForCompliance(normQ)) return 0;
  if (isGreaseOnlyProductQuery(normQ) && !isXviHydraulicQuery(normQ) && !isWetBrakeOrChatterQuery(normQ)) {
    if (!normQ.includes("hydraulic") && !normQ.includes("utf") && !normQ.includes("tractor")) return 0;
  }

  let score = 0;
  const productNorm = normalizeProductQuery(hydr.productName);
  if (productNorm.length >= 8 && normQ.includes(productNorm)) {
    score = Math.max(score, 42);
  }
  const mapKeyNorm = normalizeProductQuery(hydr.pdsMapKey);
  if (mapKeyNorm.length >= 6 && normQ.includes(mapKeyNorm)) {
    score = Math.max(score, 40);
  }

  for (const alias of hydr.aliases) {
    const a = normalizeProductQuery(alias);
    if (a.length < 3) continue;
    if (normQ === a) score = Math.max(score, 48);
    else if (a.length >= 10 && normQ.includes(a)) score = Math.max(score, 40 + Math.min(12, a.length - 8));
    else if (normQ.includes(a)) score = Math.max(score, 30 + Math.min(14, a.length));
  }

  if (hydr.id === "hydr-canonical-xvi-all-season" && isXviHydraulicQuery(normQ)) {
    score = Math.max(score, 50);
  }
  if (hydr.id === "hydr-canonical-wet-brake-fluid-full-synthetic" && isWetBrakeOrChatterQuery(normQ)) {
    score = Math.max(score, normQ.includes("chatter") ? 48 : 50);
  }
  if (hydr.id === "hydr-canonical-universal-tractor-fluid" && isPlainUtfQuery(normQ)) {
    score = Math.max(score, 48);
  }
  if (hydr.id === "hydr-canonical-universal-red-tractor-fluid" && isRedUtfQuery(normQ)) {
    score = Math.max(score, 46);
  }
  if (hydr.id === "hydr-canonical-arctic-tractor-fluid" && isArcticTractorFluidQuery(normQ)) {
    score = Math.max(score, 48);
  }
  if (hydr.id === "hydr-canonical-commercial-aw") {
    if (normQ.includes("commercial aw") || (normQ.includes("commercial") && normQ.includes("aw"))) {
      score = Math.max(score, 46);
    } else if (normQ.includes("professional series") && normQ.includes("aw")) {
      score = Math.max(score, 42);
    }
  }
  if (hydr.id === "hydr-canonical-aw-advanced") {
    if (normQ.includes("aw advanced") || normQ.includes("advanced aw")) score = Math.max(score, 46);
    else if (normQ.includes("advanced formula") && normQ.includes("aw") && !normQ.includes("enviro")) {
      score = Math.max(score, 42);
    }
  }
  if (hydr.id === "hydr-canonical-mv-aw") {
    if (normQ.includes("mv aw") || normQ.includes("multi viscosity aw") || normQ.includes("multi-viscosity aw")) {
      score = Math.max(score, 46);
    } else if (normQ.includes("hvlp") && normQ.includes("aw") && !normQ.includes("enviro")) {
      score = Math.max(score, 38);
    }
  }
  if (hydr.id === "hydr-canonical-sae-10w-hd-hydraulic") {
    if (normQ.includes("sae 10w") && normQ.includes("hydraulic")) score = Math.max(score, 46);
    else if (normQ.includes("hydo advanced 10") || normQ.includes("cat hydo")) score = Math.max(score, 44);
  }
  if (hydr.id === "hydr-canonical-long-life-turbine") {
    if (normQ.includes("long life turbine")) score = Math.max(score, 48);
    else if (normQ.includes("turbine oil") && !normQ.includes("compressor") && !normQ.includes("circulating")) {
      score = Math.max(score, 42);
    }
  }
  if (hydr.id === "hydr-canonical-syn-circulating-compressor-turbine") {
    if (normQ.includes("circulating compressor") || normQ.includes("circulating turbine")) {
      score = Math.max(score, 48);
    } else if (normQ.includes("synthetic circulating") && (normQ.includes("compressor") || normQ.includes("turbine"))) {
      score = Math.max(score, 50);
    } else if (normQ.includes("compressor turbine oil") && normQ.includes("synthetic")) {
      score = Math.max(score, 44);
    }
  }

  return score;
}

/**
 * @param {string} normQ
 */
function isHdEngineOilProductQuery(normQ) {
  if (normQ.includes("engine oil") || normQ.includes("hd oil") || normQ.includes("heavy duty engine")) return true;
  if (normQ.includes("professional formula") || normQ.includes("advanced formula")) return true;
  if (normQ.includes("ck4") || normQ.includes("ck 4") || normQ.includes("fa4") || normQ.includes("fa 4")) return true;
  if (normQ.includes("natural gas") && (normQ.includes("oil") || normQ.includes("engine") || normQ.includes("ash"))) {
    return true;
  }
  if (normQ.includes("sour gas") || normQ.includes("sour natural gas")) return true;
  if (normQ.includes("railroad") || normQ.includes("9tbn") || normQ.includes("9 tbn")) return true;
  if (normQ.includes("single grade diesel") || normQ.includes("cf2 diesel")) return true;
  if (
    /\b(0w|5w|10w|15w)\s*\d{2}\b/.test(normQ) &&
    !normQ.includes("grease") &&
    !normQ.includes("hydraulic") &&
    !normQ.includes("utf") &&
    !normQ.includes("tractor fluid") &&
    !normQ.includes("euro")
  ) {
    if (
      normQ.includes("diesel") ||
      normQ.includes("ck") ||
      normQ.includes("fa") ||
      normQ.includes("synthetic") ||
      normQ.includes("professional") ||
      normQ.includes("advanced") ||
      normQ.includes("arctic") ||
      normQ.includes("natural gas") ||
      normQ.includes("railroad") ||
      normQ.includes("blend")
    ) {
      return true;
    }
  }
  return false;
}

/**
 * @param {string} normQ
 */
function isFa4EngineOilQuery(normQ) {
  return normQ.includes("fa4") || normQ.includes("fa 4") || normQ.includes("fa-4");
}

/**
 * @param {string} normQ
 */
function isCk4EngineOilQuery(normQ) {
  return normQ.includes("ck4") || normQ.includes("ck 4") || normQ.includes("ck-4");
}

/**
 * @param {string} normQ
 */
function isNaturalGasEngineOilQuery(normQ) {
  if (normQ.includes("sour gas") || normQ.includes("sour natural gas")) return true;
  if (normQ.includes("mid ash sour") || normQ.includes("low ash sour")) return true;
  if (normQ.includes("pipeline gas") || normQ.includes("low ash natural gas")) return true;
  if (normQ.includes("natural gas") && (normQ.includes("engine") || normQ.includes("oil") || normQ.includes("ash"))) {
    return true;
  }
  if ((normQ.includes(" ng ") || normQ.startsWith("ng ")) && normQ.includes("oil")) return true;
  if (normQ.includes("ces 20074") || normQ.includes("pgos 93k216")) return true;
  return false;
}

/**
 * @param {string} normQ
 */
function isRailroadEngineOilQuery(normQ) {
  return (
    normQ.includes("railroad") ||
    normQ.includes("9tbn") ||
    normQ.includes("9 tbn") ||
    normQ.includes("zinc free") ||
    normQ.includes("zinc-free") ||
    normQ.includes("lmao")
  );
}

/**
 * @param {string} normQ
 */
function isProfessionalFormulaHdQuery(normQ) {
  return (
    normQ.includes("professional formula") ||
    normQ.includes("15w40 professional") ||
    normQ.includes("professional 15w40") ||
    normQ.includes("professional 10w30") ||
    normQ.includes("10w30 professional") ||
    normQ.includes("klondike professional formula")
  );
}

/**
 * @param {string} normQ
 */
function isAdvancedFormulaHdQuery(normQ) {
  return normQ.includes("advanced formula") || normQ.includes("15w40 advanced") || normQ.includes("advanced 15w40");
}

/**
 * @param {string} normQ
 */
function isFullSynthetic15w40HdQuery(normQ) {
  return (normQ.includes("15w 40") || normQ.includes("15w40")) && normQ.includes("full synthetic");
}

/**
 * @param {string} normQ
 */
function has15w40InQuery(normQ) {
  return normQ.includes("15w 40") || normQ.includes("15w40");
}

/**
 * @param {import("../data/heavyDutyEngineOilCanonicalIntelligence.js").HdEngineOilCanonicalProductIntelligence} hd
 * @param {string} normQ
 */
function scoreHdEngineOilCanonicalProduct(hd, normQ) {
  if (isGreaseOnlyProductQuery(normQ) && !isHdEngineOilProductQuery(normQ)) return 0;
  if (isXviHydraulicQuery(normQ) && !normQ.includes("engine oil")) return 0;
  if (isPlainUtfQuery(normQ) || isArcticTractorFluidQuery(normQ)) return 0;
  if (normQ.includes("euro") && !isHdEngineOilProductQuery(normQ)) return 0;

  const has10w30 = normQ.includes("10w 30") || normQ.includes("10w30");
  const has15w40 = normQ.includes("15w 40") || normQ.includes("15w40");
  const fa4 = isFa4EngineOilQuery(normQ);
  const ck4 = isCk4EngineOilQuery(normQ);
  const ng = isNaturalGasEngineOilQuery(normQ);
  const railroad = isRailroadEngineOilQuery(normQ);
  const professional = isProfessionalFormulaHdQuery(normQ);
  const advanced = isAdvancedFormulaHdQuery(normQ);
  const fullSyn15w40 = isFullSynthetic15w40HdQuery(normQ);

  if (ng && !hd.hierarchyBranch.includes("natural_gas") && !hd.hierarchyBranch.includes("sour")) return 0;
  if (railroad && hd.id !== "hd-canonical-9tbn-railroad") return 0;
  if (!ng && !railroad && (hd.hierarchyBranch.includes("natural_gas") || hd.hierarchyBranch.includes("sour"))) {
    if (!isHdEngineOilProductQuery(normQ)) return 0;
    if (!ng) return 0;
  }
  if (!railroad && hd.id === "hd-canonical-9tbn-railroad" && !isHdEngineOilProductQuery(normQ)) return 0;

  if (fa4 && hd.id !== "hd-canonical-10w30-fa4") {
    if (has10w30) return 0;
  }
  if (!fa4 && hd.id === "hd-canonical-10w30-fa4") return 0;

  if (has10w30 && ck4 && !fa4) {
    if (hd.id === "hd-canonical-10w30-fa4") return 0;
  }

  if (advanced && hd.id !== "hd-canonical-advanced-15w40") {
    if (has15w40 && (hd.id === "hd-canonical-professional-15w40" || hd.id === "hd-canonical-full-synthetic-15w40")) {
      return 0;
    }
  }
  if (fullSyn15w40 && hd.id !== "hd-canonical-full-synthetic-15w40") {
    if (has15w40 && (hd.id === "hd-canonical-advanced-15w40" || hd.id === "hd-canonical-professional-15w40")) {
      return 0;
    }
  }
  if (professional && has15w40 && hd.id === "hd-canonical-advanced-15w40") return 0;
  if (professional && has15w40 && hd.id === "hd-canonical-full-synthetic-15w40") return 0;
  if (advanced && hd.id === "hd-canonical-professional-15w40") return 0;
  if (fullSyn15w40 && hd.id === "hd-canonical-advanced-15w40") return 0;

  if (has10w30 && professional && !fa4) {
    if (hd.id === "hd-canonical-10w30-synthetic-blend-ck4" && !normQ.includes("synthetic blend") && !normQ.includes("blend ck4")) {
      return 0;
    }
    if (hd.id === "hd-canonical-10w30-fa4") return 0;
  }
  if (has10w30 && normQ.includes("synthetic blend") && ck4 && !fa4) {
    if (hd.id === "hd-canonical-professional-10w30" && !professional) {
      /* allow blend row */
    } else if (hd.id === "hd-canonical-professional-10w30" && !normQ.includes("professional")) {
      return 0;
    }
  }

  if (ng) {
    if (normQ.includes("mid ash") && normQ.includes("sour") && hd.id !== "hd-canonical-40-mid-ash-sour-ng") return 0;
    if (normQ.includes("low ash") && normQ.includes("sour") && hd.id !== "hd-canonical-40-low-ash-sour-ng") return 0;
    if (normQ.includes("low ash") && normQ.includes("sour") && hd.id === "hd-canonical-40-mid-ash-sour-ng") return 0;
    if (normQ.includes("mid ash") && normQ.includes("sour") && hd.id === "hd-canonical-40-low-ash-sour-ng") return 0;
  }

  let score = 0;
  const productNorm = normalizeProductQuery(hd.productName);
  if (productNorm.length >= 8 && normQ.includes(productNorm)) {
    score = Math.max(score, 42);
  }
  const mapKeyNorm = normalizeProductQuery(hd.pdsMapKey);
  if (mapKeyNorm.length >= 6 && normQ.includes(mapKeyNorm)) {
    score = Math.max(score, 40);
  }

  for (const alias of hd.aliases) {
    const a = normalizeProductQuery(alias);
    if (a.length < 3) continue;
    if (normQ === a) score = Math.max(score, 48);
    else if (a.length >= 10 && normQ.includes(a)) score = Math.max(score, 40 + Math.min(12, a.length - 8));
    else if (normQ.includes(a)) score = Math.max(score, 30 + Math.min(14, a.length));
  }

  if (hd.id === "hd-canonical-professional-15w40" && professional && has15w40) {
    score = Math.max(score, 50);
  }
  if (hd.id === "hd-canonical-professional-10w30" && has10w30 && (professional || normQ.includes("commercial formula 10w30")) && !fa4) {
    score = Math.max(score, 50);
  }
  if (hd.id === "hd-canonical-advanced-15w40" && advanced && has15w40) {
    score = Math.max(score, 50);
  }
  if (hd.id === "hd-canonical-full-synthetic-15w40" && fullSyn15w40) {
    score = Math.max(score, 50);
  }
  if (hd.id === "hd-canonical-10w30-fa4" && fa4 && has10w30) {
    score = Math.max(score, 50);
  }
  if (hd.id === "hd-canonical-10w30-synthetic-blend-ck4" && has10w30 && normQ.includes("synthetic blend") && ck4 && !fa4) {
    score = Math.max(score, 48);
  }
  if (hd.id === "hd-canonical-40-mid-ash-sour-ng" && ng && normQ.includes("mid ash")) {
    score = Math.max(score, 50);
  }
  if (hd.id === "hd-canonical-40-low-ash-sour-ng" && ng && normQ.includes("low ash") && normQ.includes("sour")) {
    score = Math.max(score, 50);
  }
  if (hd.id === "hd-canonical-9tbn-railroad" && railroad) {
    score = Math.max(score, 50);
  }
  if (hd.id === "hd-canonical-15w40-low-ash-ng" && ng && has15w40 && normQ.includes("natural gas")) {
    score = Math.max(score, 48);
  }
  if (hd.id === "hd-canonical-10w40-low-ash-ng" && ng && (normQ.includes("10w 40") || normQ.includes("10w40")) && normQ.includes("natural gas")) {
    score = Math.max(score, 48);
  }

  return score;
}

/**
 * @param {string} normQ
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectHdEngineOilCanonicalProductEntities(normQ) {
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const hd of listHdEngineOilCanonicalProductIntelligence()) {
    const score = scoreHdEngineOilCanonicalProduct(hd, normQ);
    if (score < ENTITY_DETECT_MIN_SCORE) continue;
    const registryId = HD_CANONICAL_REGISTRY_ENTITY_ID[hd.id] || hd.id;
    hits.push({ id: registryId, score, label: hd.productName });
  }
  return hits;
}

/**
 * @param {string} normQ
 * @param {string} detectId
 */
function resolveHdEngineOilCanonicalFromDetectId(normQ, detectId) {
  const id = String(detectId ?? "").trim();
  if (!id) return null;

  /** @type {import("../data/heavyDutyEngineOilCanonicalIntelligence.js").HdEngineOilCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const hd of HD_ENGINE_OIL_CANONICAL_PRODUCT_INTELLIGENCE.products) {
    const registryId = HD_CANONICAL_REGISTRY_ENTITY_ID[hd.id] || hd.id;
    if (registryId !== id && hd.id !== id) continue;
    const score = scoreHdEngineOilCanonicalProduct(hd, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = hd;
    }
  }
  if (best) return best;
  if (id.startsWith("hd-canonical-")) {
    return getHdEngineOilCanonicalProductIntelligenceById(id);
  }
  return null;
}

/**
 * @param {string} normQ
 */
function isTransmissionDrivetrainProductQuery(normQ) {
  if (normQ.includes("transmission") || normQ.includes("atf") || normQ.includes("tdto") || normQ.includes("to 4") || normQ.includes("to-4")) {
    return true;
  }
  if (normQ.includes("cvt") || normQ.includes("dct") || normQ.includes("dual clutch")) return true;
  if (normQ.includes("dexron") || normQ.includes("mercon") || normQ.includes("allison tes") || normQ.includes("tes 295") || normQ.includes("tes 668")) {
    return true;
  }
  if (normQ.includes("synchromesh") || normQ.includes("type f") || normQ.includes("md3")) return true;
  if (normQ.includes("ulv atf") || (normQ.includes("ulv") && normQ.includes("atf"))) return true;
  if (normQ.includes("syn drive") || normQ.includes("hd syn drive")) return true;
  if (normQ.includes("powershift") || normQ.includes("drivetrain")) return true;
  if (normQ.includes("wet brake fluid") && !normQ.includes("utf") && !normQ.includes("tractor fluid")) return true;
  return false;
}

/**
 * @param {string} normQ
 */
function isCvtTransmissionQuery(normQ) {
  return /\bcvt\b/.test(normQ) || normQ.includes("continuously variable");
}

/**
 * @param {string} normQ
 */
function isDctTransmissionQuery(normQ) {
  return /\bdct\b/.test(normQ) || normQ.includes("dual clutch") || normQ.includes("dsg");
}

/**
 * @param {string} normQ
 */
function isUlvAtfQuery(normQ) {
  return (
    normQ.includes("ulv") ||
    normQ.includes("ultra low viscosity") ||
    normQ.includes("dexron ulv") ||
    normQ.includes("mercon ulv")
  );
}

/**
 * @param {string} normQ
 */
function isDexronViMerconLvQuery(normQ) {
  return (
    normQ.includes("dexron vi") ||
    normQ.includes("mercon lv") ||
    (normQ.includes("dexron") && normQ.includes("vi")) ||
    (normQ.includes("mercon") && normQ.includes("lv") && !normQ.includes("ulv"))
  );
}

/**
 * @param {string} normQ
 */
function isUniversalAtfQuery(normQ) {
  return normQ.includes("universal") && (normQ.includes("atf") || normQ.includes("transmission fluid"));
}

/**
 * @param {string} normQ
 */
function isTes668Query(normQ) {
  return normQ.includes("tes 668") || normQ.includes("tes-668") || normQ.includes("tes668") || normQ.includes("syn drive");
}

/**
 * @param {string} normQ
 */
function isTes295HdAtfQuery(normQ) {
  return (
    normQ.includes("tes 295") ||
    normQ.includes("tes-295") ||
    normQ.includes("tes295") ||
    (normQ.includes("hd") && normQ.includes("full synthetic") && normQ.includes("atf")) ||
    (normQ.includes("allison") && normQ.includes("atf") && !isTes668Query(normQ))
  );
}

/**
 * @param {string} normQ
 */
function isTdtoArcticQuery(normQ) {
  return normQ.includes("tdto") && normQ.includes("arctic");
}

/**
 * @param {string} normQ
 */
function isTdtoAllSeasonQuery(normQ) {
  return normQ.includes("tdto") && (normQ.includes("all season") || normQ.includes("all-season"));
}

/**
 * @param {string} normQ
 */
function isTdtoStraightGradeQuery(normQ) {
  if (!normQ.includes("tdto") && !normQ.includes("to 4") && !normQ.includes("to-4")) return false;
  if (isTdtoArcticQuery(normQ) || isTdtoAllSeasonQuery(normQ)) return false;
  if (normQ.includes("multigrade") || normQ.includes("multi grade") || normQ.includes("synthetic multigrade")) {
    return false;
  }
  return (
    normQ.includes("sae 10w") ||
    normQ.includes("sae 30") ||
    normQ.includes("sae 50") ||
    normQ.includes("straight grade") ||
    (normQ.includes("tdto") && !normQ.includes("all season") && !normQ.includes("arctic") && !normQ.includes("syn blend"))
  );
}

/**
 * @param {string} normQ
 */
function isTdtoSyntheticMultigradeQuery(normQ) {
  return normQ.includes("tdto") && (normQ.includes("synthetic multigrade") || normQ.includes("multigrade"));
}

/**
 * @param {string} normQ
 */
function isSynchromeshQuery(normQ) {
  return normQ.includes("synchromesh") || normQ.includes("75w 80") || normQ.includes("75w80");
}

/**
 * @param {string} normQ
 */
function isTypeFAtfQuery(normQ) {
  return normQ.includes("type f") || normQ.includes("type-f") || normQ.includes("m2c33");
}

/**
 * @param {string} normQ
 */
function isMd3AtfQuery(normQ) {
  return /\bmd3\b/.test(normQ) || normQ.includes("dexron iii") || (normQ.includes("mercon") && !isDexronViMerconLvQuery(normQ) && !isUlvAtfQuery(normQ));
}

/**
 * @param {string} normQ
 */
function isSae40EsManualQuery(normQ) {
  return (normQ.includes("sae 40") || normQ.includes("40 es")) && normQ.includes("transmission") && !isSynchromeshQuery(normQ);
}

/**
 * @param {string} normQ
 */
function isSae50ManualQuery(normQ) {
  return (normQ.includes("sae 50") || normQ.includes("mt 1") || normQ.includes("mt-1")) && normQ.includes("manual") && !isSynchromeshQuery(normQ);
}

/**
 * @param {import("../data/transmissionCanonicalProductIntelligence.js").TransmissionCanonicalProductIntelligence} tx
 * @param {string} normQ
 */
function scoreTransmissionCanonicalProduct(tx, normQ) {
  if (shouldSuppressTransmissionForAgriOemMatTransDrive(normQ)) return 0;
  if (isGreaseOnlyProductQuery(normQ) && !isTransmissionDrivetrainProductQuery(normQ)) return 0;
  if (isXviHydraulicQuery(normQ) && !isTransmissionDrivetrainProductQuery(normQ)) return 0;
  if (isPlainUtfQuery(normQ) || isArcticTractorFluidQuery(normQ)) return 0;
  if (isHdEngineOilProductQuery(normQ) && !isTransmissionDrivetrainProductQuery(normQ)) return 0;
  if (isProfessionalFormulaHdQuery(normQ) && !isTransmissionDrivetrainProductQuery(normQ)) return 0;
  if (isFullSynthetic15w40HdQuery(normQ) && !normQ.includes("atf") && !normQ.includes("transmission")) return 0;

  const cvt = isCvtTransmissionQuery(normQ);
  const dct = isDctTransmissionQuery(normQ);
  const ulv = isUlvAtfQuery(normQ);
  const dexViLv = isDexronViMerconLvQuery(normQ);
  const universal = isUniversalAtfQuery(normQ);
  const tes668 = isTes668Query(normQ);
  const tes295 = isTes295HdAtfQuery(normQ);
  const tdtoArctic = isTdtoArcticQuery(normQ);
  const tdtoAllSeason = isTdtoAllSeasonQuery(normQ);
  const tdtoStraight = isTdtoStraightGradeQuery(normQ);
  const tdtoMulti = isTdtoSyntheticMultigradeQuery(normQ);
  const synchromesh = isSynchromeshQuery(normQ);
  const typeF = isTypeFAtfQuery(normQ);
  const md3 = isMd3AtfQuery(normQ);
  const sae40es = isSae40EsManualQuery(normQ);
  const sae50manual = isSae50ManualQuery(normQ);

  if (cvt && tx.id !== "tx-canonical-cvt") return 0;
  if (!cvt && tx.id === "tx-canonical-cvt" && (normQ.includes("cvt") || normQ.includes("atf"))) return 0;

  if (dct && tx.id !== "tx-canonical-dct") return 0;
  if (!dct && tx.id === "tx-canonical-dct") return 0;

  if (ulv && tx.id !== "tx-canonical-ulv-atf") {
    if (normQ.includes("atf") || normQ.includes("ulv")) return 0;
  }
  if (!ulv && tx.id === "tx-canonical-ulv-atf") return 0;

  if (dexViLv && tx.id !== "tx-canonical-dexron-vi-mercon-lv") {
    if (normQ.includes("dexron") || normQ.includes("mercon")) return 0;
  }
  if (!dexViLv && tx.id === "tx-canonical-dexron-vi-mercon-lv") return 0;

  if (universal && tx.id !== "tx-canonical-universal-atf") {
    if (normQ.includes("universal") && normQ.includes("atf")) return 0;
  }
  if (!universal && tx.id === "tx-canonical-universal-atf" && !md3 && !typeF) {
    if (normQ.includes("atf") && normQ.includes("full synthetic") && !cvt && !dct && !ulv && !dexViLv && !tes295 && !tes668) {
      /* allow weak universal scoring below */
    } else if (normQ.includes("universal atf")) {
      return 0;
    }
  }

  if (ulv && (tx.id === "tx-canonical-universal-atf" || tx.id === "tx-canonical-dexron-vi-mercon-lv")) return 0;
  if (dexViLv && (tx.id === "tx-canonical-universal-atf" || tx.id === "tx-canonical-ulv-atf")) return 0;
  if (cvt && tx.id !== "tx-canonical-cvt") return 0;
  if (dct && tx.id !== "tx-canonical-dct") return 0;

  if (tes668 && tx.id !== "tx-canonical-hd-syn-drive-tes668") return 0;
  if (!tes668 && tx.id === "tx-canonical-hd-syn-drive-tes668") return 0;

  if (tes295 && tx.id !== "tx-canonical-hd-atf-tes295") {
    if (normQ.includes("tes 295") || normQ.includes("allison")) return 0;
  }
  if (!tes295 && tx.id === "tx-canonical-hd-atf-tes295" && tes668) return 0;

  if (tdtoArctic && tx.id !== "tx-canonical-tdto-arctic") return 0;
  if (!tdtoArctic && tx.id === "tx-canonical-tdto-arctic") return 0;

  if (tdtoAllSeason && tx.id !== "tx-canonical-tdto-all-season") return 0;
  if (!tdtoAllSeason && tx.id === "tx-canonical-tdto-all-season") return 0;

  if (tdtoStraight && tx.id !== "tx-canonical-tdto-sae-grades") return 0;
  if (tdtoMulti && tx.id !== "tx-canonical-tdto-synthetic-multigrade") return 0;
  if (!tdtoStraight && !tdtoMulti && !tdtoAllSeason && !tdtoArctic && tx.id.startsWith("tx-canonical-tdto")) {
    if (normQ.includes("tdto") || normQ.includes("to 4")) return 0;
  }

  if (synchromesh && tx.id !== "tx-canonical-75w80-synchromesh") {
    if (normQ.includes("synchromesh") || normQ.includes("75w 80")) return 0;
  }
  if (!synchromesh && tx.id === "tx-canonical-75w80-synchromesh") return 0;
  if (synchromesh && (tx.id === "tx-canonical-sae-40-es" || tx.id === "tx-canonical-sae-50-manual")) return 0;

  if (sae40es && tx.id !== "tx-canonical-sae-40-es") return 0;
  if (sae50manual && tx.id !== "tx-canonical-sae-50-manual") return 0;
  if (!sae40es && tx.id === "tx-canonical-sae-40-es" && normQ.includes("manual")) return 0;
  if (!sae50manual && tx.id === "tx-canonical-sae-50-manual") return 0;

  if (typeF && tx.id !== "tx-canonical-type-f-atf") return 0;
  if (!typeF && tx.id === "tx-canonical-type-f-atf") return 0;

  if (md3 && tx.id !== "tx-canonical-md3-atf") return 0;
  if (!md3 && tx.id === "tx-canonical-md3-atf") return 0;

  if (tx.id === "tx-canonical-wet-brake-fluid") {
    /* Same PDS row as hydraulic wet-brake canonical — avoid score tie with hydr-canonical-wet-brake. */
    return 0;
  }

  if (normQ.includes("gear oil") && !synchromesh && tx.hierarchyBranch === "synchromesh") return 0;
  if (normQ.includes("hypoid") && tx.id === "tx-canonical-75w80-synchromesh") return 0;

  let score = 0;
  const productNorm = normalizeProductQuery(tx.productName);
  if (productNorm.length >= 8 && normQ.includes(productNorm)) {
    score = Math.max(score, 42);
  }
  const mapKeyNorm = normalizeProductQuery(tx.pdsMapKey);
  if (mapKeyNorm.length >= 6 && normQ.includes(mapKeyNorm)) {
    score = Math.max(score, 40);
  }

  for (const alias of tx.aliases) {
    const a = normalizeProductQuery(alias);
    if (a.length < 3) continue;
    if (normQ === a) score = Math.max(score, 48);
    else if (a.length >= 10 && normQ.includes(a)) score = Math.max(score, 40 + Math.min(12, a.length - 8));
    else if (normQ.includes(a)) score = Math.max(score, 30 + Math.min(14, a.length));
  }

  if (tx.id === "tx-canonical-cvt" && cvt) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-dct" && dct) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-ulv-atf" && ulv) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-dexron-vi-mercon-lv" && dexViLv) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-universal-atf" && universal) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-hd-syn-drive-tes668" && tes668) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-hd-atf-tes295" && tes295) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-tdto-arctic" && tdtoArctic) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-tdto-all-season" && tdtoAllSeason) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-tdto-sae-grades" && tdtoStraight) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-tdto-synthetic-multigrade" && tdtoMulti) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-75w80-synchromesh" && synchromesh) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-sae-40-es" && sae40es) score = Math.max(score, 48);
  if (tx.id === "tx-canonical-sae-50-manual" && sae50manual) score = Math.max(score, 48);
  if (tx.id === "tx-canonical-type-f-atf" && typeF) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-md3-atf" && md3) score = Math.max(score, 50);
  if (tx.id === "tx-canonical-wet-brake-fluid" && normQ.includes("wet brake fluid")) {
    score = Math.max(score, 48);
  }

  return score;
}

/**
 * @param {string} normQ
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectTransmissionCanonicalProductEntities(normQ) {
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const tx of listTransmissionCanonicalProductIntelligence()) {
    const score = scoreTransmissionCanonicalProduct(tx, normQ);
    if (score < ENTITY_DETECT_MIN_SCORE) continue;
    const registryId = TRANSMISSION_CANONICAL_REGISTRY_ENTITY_ID[tx.id] || tx.id;
    hits.push({ id: registryId, score, label: tx.productName });
  }
  return hits;
}

/**
 * @param {string} normQ
 * @param {string} detectId
 */
function resolveTransmissionCanonicalFromDetectId(normQ, detectId) {
  const id = String(detectId ?? "").trim();
  if (!id) return null;

  /** @type {import("../data/transmissionCanonicalProductIntelligence.js").TransmissionCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const tx of TRANSMISSION_CANONICAL_PRODUCT_INTELLIGENCE.products) {
    const registryId = TRANSMISSION_CANONICAL_REGISTRY_ENTITY_ID[tx.id] || tx.id;
    if (registryId !== id && tx.id !== id) continue;
    const score = scoreTransmissionCanonicalProduct(tx, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = tx;
    }
  }
  if (best) return best;
  if (id.startsWith("tx-canonical-")) {
    return getTransmissionCanonicalProductIntelligenceById(id);
  }
  return null;
}

/**
 * @param {string} normQ
 */
function isOpenGearGreaseOrLubricantQuery(normQ) {
  if (!normQ.includes("open gear")) return false;
  return (
    normQ.includes("open gear grease") ||
    normQ.includes("open gear lubricant") ||
    normQ.includes("open gear lube") ||
    normQ.includes("open gear compound") ||
    (normQ.includes("grease") && !normQ.includes("gear oil") && !normQ.includes("gear lubricant")) ||
    (normQ.includes("lubricant") && !normQ.includes("gear oil") && !normQ.includes("gear lubricant"))
  );
}

/**
 * @param {string} normQ
 */
function hasStrongGearOilIntent(normQ) {
  if (isOpenGearGreaseOrLubricantQuery(normQ)) return false;
  if (
    normQ.includes("gear oil") ||
    normQ.includes("gear lube") ||
    normQ.includes("gear lubricant") ||
    normQ.includes("hypoid") ||
    normQ.includes("differential") ||
    normQ.includes("diff oil") ||
    normQ.includes("axle oil") ||
    normQ.includes("final drive") ||
    normQ.includes("limited slip") ||
    /\blsd\b/.test(normQ) ||
    normQ.includes("posi")
  ) {
    return true;
  }
  if (normQ.includes("gl 5") || normQ.includes("gl-5") || normQ.includes("mt 1") || normQ.includes("mt-1")) {
    return true;
  }
  if (normQ.includes("synthetic gear")) return true;
  if (normQ.includes("industrial gear") || normQ.includes("ep gear")) return true;
  if (normQ.includes("enclosed gear") || normQ.includes("gearbox") || normQ.includes("reducer")) return true;
  if (
    normQ.includes("worm gear") ||
    normQ.includes("spur gear") ||
    normQ.includes("bevel gear") ||
    normQ.includes("herringbone") ||
    normQ.includes("planetary gear")
  ) {
    return true;
  }
  if (normQ.includes("micropitting") || normQ.includes("fzg") || (normQ.includes("timken") && normQ.includes("gear"))) {
    return true;
  }
  if (normQ.includes("steel mill") || (normQ.includes("water contamination") && normQ.includes("gear"))) {
    return true;
  }
  if (/\b(75w|80w|85w)\s*(90|140)\b/.test(normQ) && (normQ.includes("gear") || normQ.includes("gl"))) return true;
  if (/\biso\s*(68|100|150|220|320|460|680)\b/.test(normQ) && normQ.includes("gear")) return true;
  if (normQ.includes("agma") && normQ.includes("gear")) return true;
  if (normQ.includes("pto") || normQ.includes("power take off")) return true;
  return false;
}

/**
 * @param {string} normQ
 */
function isGearOilProductQuery(normQ) {
  if (isOpenGearGreaseOrLubricantQuery(normQ)) return false;
  if (isGreaseOnlyProductQuery(normQ) && !hasStrongGearOilIntent(normQ)) return false;
  if (isCoolantAntifreezeProductQuery(normQ) && !hasStrongGearOilIntent(normQ)) return false;
  if (isHdEngineOilProductQuery(normQ) && !hasStrongGearOilIntent(normQ)) return false;
  return hasStrongGearOilIntent(normQ);
}

/**
 * @param {string} normQ
 */
function isClearTransmissionFluidOnlyQuery(normQ) {
  if (hasStrongGearOilIntent(normQ)) return false;
  if (isCvtTransmissionQuery(normQ) || isDctTransmissionQuery(normQ)) return true;
  if (isUlvAtfQuery(normQ) || isDexronViMerconLvQuery(normQ) || isUniversalAtfQuery(normQ)) return true;
  if (isTes668Query(normQ) || isTes295HdAtfQuery(normQ)) return true;
  if (isTdtoArcticQuery(normQ) || isTdtoAllSeasonQuery(normQ) || isTdtoStraightGradeQuery(normQ) || isTdtoSyntheticMultigradeQuery(normQ)) {
    return true;
  }
  if (isSynchromeshQuery(normQ) || isTypeFAtfQuery(normQ) || isMd3AtfQuery(normQ)) return true;
  if (isSae50ManualQuery(normQ) || isSae40EsManualQuery(normQ)) return true;
  if (/\batf\b/.test(normQ) || normQ.includes("automatic transmission fluid")) return true;
  if (normQ.includes("cvt") || normQ.includes("dct") || normQ.includes("dexron") || normQ.includes("mercon")) return true;
  if (normQ.includes("tdto") || normQ.includes("to 4") || normQ.includes("to-4")) return true;
  if (normQ.includes("synchromesh") || normQ.includes("75w 80")) return true;
  if (normQ.includes("type f")) return true;
  if (normQ.includes("manual transmission") && !normQ.includes("gl 5") && !normQ.includes("gear oil") && !normQ.includes("gear lubricant")) {
    return true;
  }
  if (normQ.includes("transmission fluid") && !normQ.includes("gear")) return true;
  return false;
}

/**
 * @param {string} normQ
 */
function isManualTransmissionGearOilQuery(normQ) {
  return (
    normQ.includes("manual transmission") &&
    (normQ.includes("gl 5") ||
      normQ.includes("gl-5") ||
      normQ.includes("mt 1") ||
      normQ.includes("mt-1") ||
      normQ.includes("gear oil") ||
      normQ.includes("gear lubricant"))
  );
}

/**
 * @param {string} normQ
 */
function isGl4OnlyApplicationQuery(normQ) {
  return (
    (normQ.includes("gl 4") || normQ.includes("gl-4") || normQ.includes("gl4")) &&
    !normQ.includes("gl 5") &&
    !normQ.includes("gl-5")
  );
}

/**
 * @param {string} normQ
 * @returns {string | null}
 */
function parseIsoGradeFromNormQ(normQ) {
  const m = normQ.match(/\biso\s*(68|100|150|220|320|460|680)\b/);
  return m ? m[1] : null;
}

/**
 * @param {string} normQ
 */
function queryWantsSyntheticGear(normQ) {
  return normQ.includes("full synthetic") || (normQ.includes("synthetic") && normQ.includes("gear"));
}

/**
 * @param {string} normQ
 */
function queryWantsCommercial80w90(normQ) {
  return (
    normQ.includes("commercial") &&
    (normQ.includes("80w 90") || normQ.includes("80w-90")) &&
    (normQ.includes("gear") || normQ.includes("gl"))
  );
}

/**
 * @param {string} normQ
 */
function queryHasLimitedSlipCue(normQ) {
  return normQ.includes("limited slip") || /\blsd\b/.test(normQ) || normQ.includes("posi");
}

/**
 * @param {string} normQ
 */
function queryHasMobileGl5Cue(normQ) {
  return (
    normQ.includes("hypoid") ||
    normQ.includes("differential") ||
    normQ.includes("diff oil") ||
    normQ.includes("axle") ||
    normQ.includes("final drive") ||
    normQ.includes("pto") ||
    normQ.includes("power take off")
  );
}

/**
 * @param {string} normQ
 */
function queryHasIndustrialGearCue(normQ) {
  return (
    normQ.includes("industrial gear") ||
    normQ.includes("enclosed gear") ||
    normQ.includes("reducer") ||
    normQ.includes("gearbox") ||
    normQ.includes("worm gear") ||
    normQ.includes("agma") ||
    normQ.includes("steel mill") ||
    normQ.includes("micropitting") ||
    normQ.includes("fzg") ||
    (parseIsoGradeFromNormQ(normQ) !== null && normQ.includes("gear"))
  );
}

/**
 * @param {string} normQ
 */
function queryHasSae80w90(normQ) {
  return normQ.includes("80w 90") || normQ.includes("80w-90");
}

/**
 * @param {string} normQ
 */
function queryHasSae85w140(normQ) {
  return normQ.includes("85w 140") || normQ.includes("85w-140");
}

/**
 * @param {string} normQ
 */
function queryHasSae75w90(normQ) {
  return normQ.includes("75w 90") || normQ.includes("75w-90");
}

/**
 * @param {string} normQ
 */
function queryHasSae75w140(normQ) {
  return normQ.includes("75w 140") || normQ.includes("75w-140");
}

/**
 * @param {string} gearId
 */
function gearIsoGradeFromCanonicalId(gearId) {
  const m = gearId.match(/iso(\d{2,3})$/);
  return m ? m[1] : null;
}

/**
 * @param {unknown} text
 * @returns {Set<string>}
 */
function extractGearProductNumberKeysFromText(text) {
  /** @type {Set<string>} */
  const keys = new Set();
  const raw = String(text ?? "");
  if (!raw.trim()) return keys;
  const upper = raw.toUpperCase();
  const patterns = [/\bKL\s*[-]?\s*GL\s*(\d{4})\b/g, /\bKLGL(\d{4})\b/g];
  for (const re of patterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(upper))) {
      keys.add(`KLGL${m[1]}`);
    }
  }
  return keys;
}

/**
 * @param {string} normQ
 * @returns {Set<string>}
 */
function extractGearProductNumberKeysFromNormQ(normQ) {
  /** @type {Set<string>} */
  const keys = new Set();
  const spaced = /\bkl\s+gl\s*(\d{4})\b/g;
  let m;
  while ((m = spaced.exec(normQ))) {
    keys.add(`KLGL${m[1]}`);
  }
  const compact = normQ.replace(/\s+/g, "");
  const cm = compact.match(/\bklgl(\d{4})\b/);
  if (cm) keys.add(`KLGL${cm[1]}`);
  return keys;
}

/**
 * @param {unknown} productNumbers
 * @returns {Set<string>}
 */
function collectGearOilProductNumberKeys(productNumbers) {
  /** @type {Set<string>} */
  const keys = new Set();
  /** @param {unknown} val */
  const visit = (val) => {
    if (val == null) return;
    if (typeof val === "string") {
      extractGearProductNumberKeysFromText(val).forEach((k) => keys.add(k));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(visit);
      return;
    }
    if (typeof val === "object") {
      Object.values(val).forEach(visit);
    }
  };
  visit(productNumbers);
  return keys;
}

/** @type {Map<string, import("../data/gearOilCanonicalProductIntelligence.js").GearOilCanonicalProductIntelligence> | null} */
let gearOilProductNumberIndex = null;

/**
 * @returns {Map<string, import("../data/gearOilCanonicalProductIntelligence.js").GearOilCanonicalProductIntelligence>}
 */
function getGearOilProductNumberIndex() {
  if (gearOilProductNumberIndex) return gearOilProductNumberIndex;
  gearOilProductNumberIndex = new Map();
  for (const gear of listGearOilCanonicalProductIntelligence()) {
    for (const key of collectGearOilProductNumberKeys(gear.productNumbers)) {
      if (!gearOilProductNumberIndex.has(key)) {
        gearOilProductNumberIndex.set(key, gear);
      }
    }
  }
  return gearOilProductNumberIndex;
}

/**
 * @param {unknown} inputText
 * @returns {{ keys: Set<string>, normQ: string }}
 */
function gatherGearProductNumberKeysFromQuery(inputText) {
  const raw = String(inputText ?? "");
  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(raw));
  /** @type {Set<string>} */
  const keys = new Set([
    ...extractGearProductNumberKeysFromText(raw),
    ...extractGearProductNumberKeysFromNormQ(normQ),
  ]);
  return { keys, normQ };
}

/**
 * @param {unknown} inputText
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectExactGearOilProductNumberMatch(inputText) {
  const { keys } = gatherGearProductNumberKeysFromQuery(inputText);
  if (keys.size === 0) return [];

  const index = getGearOilProductNumberIndex();
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const key of keys) {
    const gear = index.get(key);
    if (gear) {
      hits.push({ id: gear.id, score: GEAR_OIL_EXACT_PRODUCT_NUMBER_SCORE, label: gear.productName });
    }
  }
  return hits;
}

/**
 * @param {import("../data/gearOilCanonicalProductIntelligence.js").GearOilCanonicalProductIntelligence} gear
 * @param {unknown} inputText
 */
function scoreExactGearOilProductNumberForRow(gear, inputText) {
  const { keys } = gatherGearProductNumberKeysFromQuery(inputText);
  if (keys.size === 0) return 0;
  const index = getGearOilProductNumberIndex();
  for (const key of keys) {
    const match = index.get(key);
    if (match && match.id === gear.id) return GEAR_OIL_EXACT_PRODUCT_NUMBER_SCORE;
  }
  return 0;
}

/**
 * @param {import("../data/gearOilCanonicalProductIntelligence.js").GearOilCanonicalProductIntelligence} gear
 * @param {string} normQ
 */
function scoreGearOilCanonicalProduct(gear, normQ) {
  if (scoreExactGearOilProductNumberForRow(gear, normQ) >= GEAR_OIL_EXACT_PRODUCT_NUMBER_SCORE) {
    return GEAR_OIL_EXACT_PRODUCT_NUMBER_SCORE;
  }
  if (!isGearOilProductQuery(normQ)) return 0;
  if (isOpenGearGreaseOrLubricantQuery(normQ)) return 0;
  if (isClearTransmissionFluidOnlyQuery(normQ)) return 0;
  if (isTransmissionDrivetrainProductQuery(normQ) && !hasStrongGearOilIntent(normQ) && !isManualTransmissionGearOilQuery(normQ)) {
    return 0;
  }

  const isoGrade = parseIsoGradeFromNormQ(normQ);
  const wantsSynthetic = queryWantsSyntheticGear(normQ);
  const wantsCommercial = queryWantsCommercial80w90(normQ);
  const limitedSlip = queryHasLimitedSlipCue(normQ);
  const mobileCue = queryHasMobileGl5Cue(normQ);
  const industrialCue = queryHasIndustrialGearCue(normQ);
  const has80w90 = queryHasSae80w90(normQ);
  const has85w140 = queryHasSae85w140(normQ);
  const has75w90 = queryHasSae75w90(normQ);
  const has75w140 = queryHasSae75w140(normQ);
  const gl4Only = isGl4OnlyApplicationQuery(normQ);

  const isCommercial = gear.id === "gear-oil-canonical-commercial-gear-lubricant-80w90";
  const isGl580 = gear.id === "gear-oil-canonical-gl5-gear-lubricant-80w90";
  const isGl585 = gear.id === "gear-oil-canonical-gl5-gear-lubricant-85w140";
  const isFs75w90 = gear.id === "gear-oil-canonical-full-synthetic-gl5-gear-lubricant-75w90";
  const isFs75w140 = gear.id === "gear-oil-canonical-full-synthetic-gl5-gear-lubricant-75w140";
  const isIndustrial = gear.productFamily === "industrial_ep_gear";
  const isSynthIndustrial = gear.productFamily === "full_synthetic_industrial_ep_gear";
  const gearIso = gear.isoGrade || gearIsoGradeFromCanonicalId(gear.id);

  if (wantsCommercial && !isCommercial) {
    if (isGl580 && normQ.includes("commercial")) return 0;
  }
  if (wantsCommercial && !isCommercial && has80w90 && !normQ.includes("gl 5 gear")) {
    if (isGl580) return 0;
  }
  if (has80w90 && wantsCommercial && !isCommercial) return 0;
  if (has80w90 && !wantsCommercial && isCommercial && (normQ.includes("gl 5") || normQ.includes("gl5"))) return 0;
  if (has80w90 && !has85w140 && isGl585) return 0;
  if (has80w90 && !has75w90 && (isFs75w90 || isFs75w140)) return 0;
  if (has85w140 && !isGl585) return 0;
  if (has75w90 && !isFs75w90) return 0;
  if (has75w140 && !isFs75w140) return 0;
  if (limitedSlip && !(isFs75w90 || isFs75w140)) return 0;
  if (isoGrade && gearIso && gearIso !== isoGrade) return 0;
  if (isoGrade && !gearIso) return 0;
  if (!isoGrade && gearIso && industrialCue && !mobileCue && !has80w90 && !has85w140 && !has75w90 && !has75w140) {
    return 0;
  }
  if (wantsSynthetic && isIndustrial && !isSynthIndustrial) return 0;
  if (!wantsSynthetic && isSynthIndustrial && industrialCue && isoGrade && isoGrade !== "680") return 0;
  if (!wantsSynthetic && isSynthIndustrial && !industrialCue && (mobileCue || limitedSlip || has75w90 || has75w140)) return 0;
  if (mobileCue && !industrialCue && (isIndustrial || isSynthIndustrial) && !isoGrade) return 0;
  if (industrialCue && !mobileCue && (isCommercial || isGl580 || isGl585 || isFs75w90 || isFs75w140) && !isoGrade) {
    if (!(has80w90 || has85w140 || has75w90 || has75w140)) return 0;
  }
  if (isoGrade === "680" && !isSynthIndustrial) return 0;
  if (gl4Only && (isFs75w90 || isFs75w140) && !normQ.includes("full synthetic gl")) {
    /* allow named-product coaching with caution via lower cap below */
  }

  let score = 0;

  if (gear.id && normQ.includes(gear.id.replace(/^gear-oil-canonical-/, "").replace(/-/g, " "))) {
    score = Math.max(score, 46);
  }

  const productNorm = normalizeProductQuery(gear.productName);
  if (productNorm.length >= 12 && normQ.includes(productNorm)) {
    score = Math.max(score, 44);
  }

  if (gear.pdsMapKey) {
    const mapKeyNorm = normalizeProductQuery(gear.pdsMapKey);
    if (mapKeyNorm.length >= 6 && normQ.includes(mapKeyNorm)) {
      score = Math.max(score, 36);
    }
  }

  for (const alias of gear.aliases) {
    const a = normalizeProductQuery(alias);
    if (a.length < 4) continue;
    if (normQ === a) score = Math.max(score, 48);
    else if (a.length >= 12 && normQ.includes(a)) score = Math.max(score, 42);
    else if (normQ.includes(a)) score = Math.max(score, 32 + Math.min(12, a.length));
  }

  for (const kw of gear.routingKeywords) {
    const k = normalizeProductQuery(kw);
    if (k.length < 4) continue;
    if (normQ.includes(k)) score = Math.max(score, 22 + Math.min(10, k.length));
  }

  const queryGearSkuKeys = gatherGearProductNumberKeysFromQuery(normQ).keys;
  for (const pn of gear.productNumbers) {
    for (const key of collectGearOilProductNumberKeys(pn)) {
      if (queryGearSkuKeys.has(key)) score = Math.max(score, 52);
    }
  }

  if (gear.saeGrade) {
    const saeNorm = normalizeProductQuery(gear.saeGrade);
    if (saeNorm.length >= 5 && normQ.includes(saeNorm)) score = Math.max(score, 40);
  }
  if (gear.isoGrade && isoGrade === gear.isoGrade) score = Math.max(score, 44);

  if (isCommercial && wantsCommercial) score = Math.max(score, 52);
  if (isCommercial && has80w90 && normQ.includes("commercial")) score = Math.max(score, 54);
  if (isGl580 && has80w90 && !wantsCommercial) score = Math.max(score, 50);
  if (isGl585 && has85w140) score = Math.max(score, 50);
  if (isFs75w90 && has75w90) score = Math.max(score, 50);
  if (isFs75w140 && has75w140) score = Math.max(score, 50);
  if (limitedSlip && (isFs75w90 || isFs75w140)) score = Math.max(score, 48);
  if (isFs75w90 && limitedSlip && !has75w140 && !has75w90) score = Math.max(score, 42);
  if (isFs75w140 && limitedSlip && !has75w140 && !has75w90) score = Math.max(score, 42);

  if (isIndustrial && industrialCue && isoGrade && gearIso === isoGrade && !wantsSynthetic) {
    score = Math.max(score, 50);
  }
  if (isSynthIndustrial && industrialCue && isoGrade && gearIso === isoGrade && wantsSynthetic) {
    score = Math.max(score, 52);
  }
  if (isSynthIndustrial && industrialCue && !isoGrade && wantsSynthetic) {
    score = Math.max(score, 38);
  }
  if (
    isSynthIndustrial &&
    (normQ.includes("micropitting") || normQ.includes("fzg") || normQ.includes("severe industrial") || normQ.includes("water contamination"))
  ) {
    score = Math.max(score, 40);
  }
  if (isoGrade === "680" && isSynthIndustrial) score = Math.max(score, 50);

  if (mobileCue && (isCommercial || isGl580 || isGl585 || isFs75w90 || isFs75w140) && !industrialCue) {
    score = Math.max(score, score + 4);
  }

  if (isManualTransmissionGearOilQuery(normQ) && isGl580 && has80w90) {
    score = Math.max(score, 54);
  } else if (isManualTransmissionGearOilQuery(normQ) && (isGl580 || isGl585 || isFs75w90 || isFs75w140)) {
    score = Math.max(score, 48);
  }

  if (gl4Only && (isFs75w90 || isFs75w140) && score >= ENTITY_EXACT_MIN_SCORE) {
    score = Math.min(score, 32);
  }

  return score;
}

/**
 * @param {string} normQ
 * @param {string} key
 */
function has80w90GearRetrievalSkip(normQ, key) {
  if (!queryHasSae80w90(normQ)) return false;
  if (queryWantsCommercial80w90(normQ) && !/commercial gear/i.test(key)) return true;
  if (!queryWantsCommercial80w90(normQ) && /commercial gear/i.test(key)) return true;
  return false;
}

/**
 * @param {string} normQ
 * @param {string} key
 * @returns {import("../data/gearOilCanonicalProductIntelligence.js").GearOilCanonicalProductIntelligence | null}
 */
function resolveGearOilFromPdsRetrievalKey(normQ, key) {
  if (!isGearOilProductQuery(normQ)) return null;
  /** @type {import("../data/gearOilCanonicalProductIntelligence.js").GearOilCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const gear of listGearOilCanonicalProductIntelligence()) {
    if (gear.pdsMapKey !== key) continue;
    const score = scoreGearOilCanonicalProduct(gear, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = gear;
    }
  }
  return best && bestScore >= ENTITY_DETECT_MIN_SCORE ? best : null;
}

/**
 * @param {string} normQ
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectGearOilCanonicalProductEntities(normQ) {
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const gear of listGearOilCanonicalProductIntelligence()) {
    const score = scoreGearOilCanonicalProduct(gear, normQ);
    if (score < ENTITY_DETECT_MIN_SCORE) continue;
    hits.push({ id: gear.id, score, label: gear.productName });
  }
  return hits;
}

/**
 * @param {string} normQ
 * @param {string} detectId
 */
function resolveGearOilCanonicalFromDetectId(normQ, detectId) {
  const id = String(detectId ?? "").trim();
  if (!id) return null;

  /** @type {import("../data/gearOilCanonicalProductIntelligence.js").GearOilCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const gear of GEAR_OIL_CANONICAL_PRODUCT_INTELLIGENCE.products) {
    if (gear.id !== id) continue;
    const score = scoreGearOilCanonicalProduct(gear, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = gear;
    }
  }
  if (best) return best;
  if (id.startsWith("gear-oil-canonical-")) {
    return getGearOilCanonicalProductIntelligenceById(id);
  }
  return null;
}

/**
 * @param {unknown} text
 * @returns {Set<string>}
 */
function extractIndustrialSpecialtyProductNumberKeysFromText(text) {
  /** @type {Set<string>} */
  const keys = new Set();
  const raw = String(text ?? "");
  if (!raw.trim()) return keys;
  const upper = raw.toUpperCase();
  const patterns = [/\bKL\s*[-]?\s*IO\s*(\d{4})\b/g, /\bKLIO(\d{4})\b/g];
  for (const re of patterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(upper))) {
      keys.add(`KLIO${m[1]}`);
    }
  }
  return keys;
}

/**
 * @param {string} normQ
 * @returns {Set<string>}
 */
function extractIndustrialSpecialtyProductNumberKeysFromNormQ(normQ) {
  /** @type {Set<string>} */
  const keys = new Set();
  const spaced = /\bkl\s+io\s*(\d{4})\b/g;
  let m;
  while ((m = spaced.exec(normQ))) {
    keys.add(`KLIO${m[1]}`);
  }
  const compact = normQ.replace(/\s+/g, "");
  const cm = compact.match(/\bklio(\d{4})\b/);
  if (cm) keys.add(`KLIO${cm[1]}`);
  return keys;
}

/**
 * @param {unknown} productNumbers
 * @returns {Set<string>}
 */
function collectIndustrialSpecialtyProductNumberKeys(productNumbers) {
  /** @type {Set<string>} */
  const keys = new Set();
  /** @param {unknown} val */
  const visit = (val) => {
    if (val == null) return;
    if (typeof val === "string") {
      extractIndustrialSpecialtyProductNumberKeysFromText(val).forEach((k) => keys.add(k));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(visit);
      return;
    }
    if (typeof val === "object") {
      Object.values(val).forEach(visit);
    }
  };
  visit(productNumbers);
  return keys;
}

/** @type {Map<string, import("../data/industrialSpecialtyOilCanonicalProductIntelligence.js").IndustrialSpecialtyOilCanonicalProductIntelligence> | null} */
let industrialSpecialtyProductNumberIndex = null;

/**
 * @returns {Map<string, import("../data/industrialSpecialtyOilCanonicalProductIntelligence.js").IndustrialSpecialtyOilCanonicalProductIntelligence>}
 */
function getIndustrialSpecialtyProductNumberIndex() {
  if (industrialSpecialtyProductNumberIndex) return industrialSpecialtyProductNumberIndex;
  industrialSpecialtyProductNumberIndex = new Map();
  for (const product of listIndustrialSpecialtyOilCanonicalProductIntelligence()) {
    for (const key of collectIndustrialSpecialtyProductNumberKeys(product.productNumbers)) {
      if (!industrialSpecialtyProductNumberIndex.has(key)) {
        industrialSpecialtyProductNumberIndex.set(key, product);
      }
    }
  }
  return industrialSpecialtyProductNumberIndex;
}

/**
 * @param {unknown} inputText
 * @returns {{ keys: Set<string>, normQ: string }}
 */
function gatherIndustrialSpecialtyProductNumberKeysFromQuery(inputText) {
  const raw = String(inputText ?? "");
  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(raw));
  /** @type {Set<string>} */
  const keys = new Set([
    ...extractIndustrialSpecialtyProductNumberKeysFromText(raw),
    ...extractIndustrialSpecialtyProductNumberKeysFromNormQ(normQ),
  ]);
  return { keys, normQ };
}

/**
 * @param {unknown} inputText
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectExactIndustrialSpecialtyOilProductNumberMatch(inputText) {
  const { keys } = gatherIndustrialSpecialtyProductNumberKeysFromQuery(inputText);
  if (keys.size === 0) return [];

  const index = getIndustrialSpecialtyProductNumberIndex();
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const key of keys) {
    const product = index.get(key);
    if (product) {
      hits.push({
        id: product.id,
        score: INDUSTRIAL_SPECIALTY_OIL_EXACT_PRODUCT_NUMBER_SCORE,
        label: product.productName,
      });
    }
  }
  return hits;
}

/**
 * @param {import("../data/industrialSpecialtyOilCanonicalProductIntelligence.js").IndustrialSpecialtyOilCanonicalProductIntelligence} product
 * @param {unknown} inputText
 */
function scoreExactIndustrialSpecialtyOilProductNumberForRow(product, inputText) {
  const { keys } = gatherIndustrialSpecialtyProductNumberKeysFromQuery(inputText);
  if (keys.size === 0) return 0;
  const index = getIndustrialSpecialtyProductNumberIndex();
  for (const key of keys) {
    const match = index.get(key);
    if (match && match.id === product.id) return INDUSTRIAL_SPECIALTY_OIL_EXACT_PRODUCT_NUMBER_SCORE;
  }
  return 0;
}

/**
 * @param {string} normQ
 */
function hasBarChainOrForestryBarOilCue(normQ) {
  return (
    normQ.includes("bar and chain") ||
    normQ.includes("bar & chain") ||
    normQ.includes("bar oil") ||
    normQ.includes("chain oil") ||
    normQ.includes("chain saw") ||
    normQ.includes("chainsaw") ||
    normQ.includes("saw chain") ||
    normQ.includes("hi tack") ||
    normQ.includes("clear bar") ||
    normQ.includes("tacky chain") ||
    normQ.includes("non drip chain") ||
    normQ.includes("winter bar oil") ||
    normQ.includes("summer bar oil") ||
    normQ.includes("all season bar") ||
    normQ.includes("harvesting head") ||
    normQ.includes("processor head") ||
    normQ.includes("forestry") ||
    normQ.includes("logging") ||
    normQ.includes("commercial bar") ||
    normQ.includes("red bar oil") ||
    normQ.includes("value bar chain") ||
    (normQ.includes("open gear") && (normQ.includes("bar") || normQ.includes("chain")))
  );
}

/**
 * @param {string} normQ
 */
function hasSawGuideCue(normQ) {
  return (
    normQ.includes("saw guide") ||
    normQ.includes("gang saw") ||
    normQ.includes("edger") ||
    normQ.includes("thin kerf") ||
    normQ.includes("sawmill") ||
    normQ.includes("tacky saw")
  );
}

/**
 * @param {string} normQ
 */
function hasRockDrillCue(normQ) {
  return (
    normQ.includes("rock drill") ||
    normQ.includes("pneumatic drill") ||
    normQ.includes("jackhammer") ||
    normQ.includes("pavement breaker") ||
    normQ.includes("tunneling") ||
    normQ.includes("mining drill")
  );
}

/**
 * @param {string} normQ
 */
function specialtyOverridesGearOilTerritory(normQ) {
  return hasBarChainOrForestryBarOilCue(normQ) || hasSawGuideCue(normQ) || hasRockDrillCue(normQ);
}

/**
 * @param {string} normQ
 */
function isGearOilTerritoryBlockingSpecialty(normQ) {
  if (specialtyOverridesGearOilTerritory(normQ)) return false;
  if (normQ.includes("gl 5") || normQ.includes("gl5") || normQ.includes("mt 1") || normQ.includes("mt1")) return true;
  if (
    normQ.includes("hypoid") ||
    normQ.includes("differential") ||
    normQ.includes("axle oil") ||
    normQ.includes("final drive")
  ) {
    return true;
  }
  if (normQ.includes("industrial ep gear")) return true;
  if (normQ.includes("enclosed gear") && normQ.includes("agma")) return true;
  if (normQ.includes("agma") && normQ.includes("gear") && !hasBarChainOrForestryBarOilCue(normQ)) return true;
  if (normQ.includes("gear oil") && /\biso\s*220\b/.test(normQ) && !hasRockDrillCue(normQ)) return true;
  if (hasStrongGearOilIntent(normQ)) return true;
  return false;
}

/**
 * @param {string} normQ
 */
function isOpenGearGreaseBlockingSpecialty(normQ) {
  if (!isOpenGearGreaseOrLubricantQuery(normQ)) return false;
  return !hasBarChainOrForestryBarOilCue(normQ);
}

/**
 * @param {string} normQ
 */
function isTwoCycleSmallEngineQuery(normQ) {
  return (
    normQ.includes("tc-w3") ||
    normQ.includes("tc w3") ||
    normQ.includes("2 cycle") ||
    normQ.includes("2-cycle") ||
    normQ.includes("2 stroke") ||
    normQ.includes("snowmobile oil") ||
    normQ.includes("marine 2 cycle") ||
    normQ.includes("outboard oil")
  );
}

/**
 * @param {string} normQ
 */
function isClearHydraulicFluidQuery(normQ) {
  if (
    (normQ.includes("non detergent") || normQ.includes("nd 30")) &&
    normQ.includes("hydraulic")
  ) {
    return false;
  }
  if (hasRockDrillCue(normQ) || hasBarChainOrForestryBarOilCue(normQ) || hasSawGuideCue(normQ)) return false;
  if (normQ.includes("way oil") || normQ.includes("way lube") || normQ.includes("slideway")) return false;
  if (normQ.includes("compressor oil") || normQ.includes("rotary screw")) return false;
  return (
    normQ.includes("aw hydraulic") ||
    normQ.includes("hydraulic oil") ||
    normQ.includes("tractor fluid") ||
    normQ.includes("wet brake") ||
    isPlainUtfQuery(normQ) ||
    normQ.includes("j20c") ||
    normQ.includes("j20d") ||
    (normQ.includes("hydraulic") && normQ.includes("utf") && !normQ.includes("rock drill"))
  );
}

/**
 * @param {string} normQ
 */
function isAutomotiveGasolineEngineQuery(normQ) {
  return (
    normQ.includes("automotive gasoline") ||
    (normQ.includes("gasoline engine") && !normQ.includes("non detergent") && !normQ.includes("nd 30"))
  );
}

/**
 * @param {string} normQ
 * @returns {string | null}
 */
function parseSpecialtyIsoGradeFromNormQ(normQ) {
  const m = normQ.match(/\biso\s*(22|32|46|68|90|100|150|220|260)\b/);
  return m ? m[1] : null;
}

/**
 * @param {string} normQ
 */
function isIndustrialSpecialtyOilProductQuery(normQ) {
  if (isTwoCycleSmallEngineQuery(normQ)) return false;
  if (gatherIndustrialSpecialtyProductNumberKeysFromQuery(normQ).keys.size > 0) return true;
  if (hasBarChainOrForestryBarOilCue(normQ) || hasSawGuideCue(normQ) || hasRockDrillCue(normQ)) return true;
  const intentTerms = [
    "industrial oil",
    "specialty oil",
    "compressor oil",
    "synthetic compressor oil",
    "rotary screw compressor",
    "air compressor",
    "inert gas compressor",
    "natural gas compressor",
    "wet gas compressor",
    "gas compressor oil",
    "way oil",
    "way lube",
    "slideway",
    "machine tool",
    "milling machine",
    "grinder",
    "planer",
    "shaper",
    "honing machine",
    "stick slip",
    "soluble cutting oil",
    "cutting oil",
    "machining fluid",
    "metalworking fluid",
    "coolant for machining",
    "grinding fluid",
    "drilling fluid",
    "form release",
    "concrete form oil",
    "concrete release",
    "precast",
    "dust suppressant",
    "dust suppression",
    "cattle oil",
    "cattle oiler",
    "riding arena dust",
    "grain handling dust",
    "non detergent oil",
    "non detergent",
    "nd 30",
    "sae 30 non detergent",
    "shop lubricant",
    "exposed chain drive",
  ];
  for (const term of intentTerms) {
    if (normQ.includes(term)) return true;
  }
  return false;
}

/**
 * @param {import("../data/industrialSpecialtyOilCanonicalProductIntelligence.js").IndustrialSpecialtyOilCanonicalProductIntelligence} product
 * @param {string} normQ
 */
function scoreIndustrialSpecialtyOilCanonicalProduct(product, normQ) {
  if (
    scoreExactIndustrialSpecialtyOilProductNumberForRow(product, normQ) >=
    INDUSTRIAL_SPECIALTY_OIL_EXACT_PRODUCT_NUMBER_SCORE
  ) {
    return INDUSTRIAL_SPECIALTY_OIL_EXACT_PRODUCT_NUMBER_SCORE;
  }
  if (isTwoCycleSmallEngineQuery(normQ)) return 0;
  if (isOpenGearGreaseBlockingSpecialty(normQ)) return 0;
  if (isGearOilTerritoryBlockingSpecialty(normQ)) return 0;
  if (isClearHydraulicFluidQuery(normQ) && !isIndustrialSpecialtyOilProductQuery(normQ)) return 0;
  if (isClearTransmissionFluidOnlyQuery(normQ) && !isIndustrialSpecialtyOilProductQuery(normQ)) return 0;
  if (
    isHdEngineOilProductQuery(normQ) &&
    product.id !== "industrial-specialty-canonical-non-detergent-30-lubricating-oil" &&
    !isIndustrialSpecialtyOilProductQuery(normQ)
  ) {
    return 0;
  }
  if (!isIndustrialSpecialtyOilProductQuery(normQ)) return 0;
  if (isComplianceBioRockDrillQuery(normQ) && product.productFamily === "rock_drill_pneumatic") return 0;

  const isoGrade = parseSpecialtyIsoGradeFromNormQ(normQ);
  const productIso = product.isoGrade || null;
  const isRockDrill = product.productFamily === "rock_drill_pneumatic";
  const isBarChain = product.productFamily === "forestry_bar_chain" || product.hierarchyBranch === "forestry_bar_chain";
  const isSawGuide = product.productFamily === "saw_guide_mill" || product.hierarchyBranch === "saw_guide_mill";
  const isCompressor46 = product.id === "industrial-specialty-canonical-full-synthetic-compressor-iso46";
  const isCompressor260 = product.id === "industrial-specialty-canonical-natural-gas-compressor-iso260";
  const isNd30 = product.id === "industrial-specialty-canonical-non-detergent-30-lubricating-oil";

  if (isoGrade && productIso && productIso !== isoGrade) return 0;
  if (isoGrade && isRockDrill && !productIso) return 0;
  if (isoGrade && isSawGuide && productIso && productIso !== isoGrade) return 0;

  if (isNd30 && isHdEngineOilProductQuery(normQ) && !normQ.includes("non detergent") && !normQ.includes("nd 30")) {
    return 0;
  }

  let score = 0;

  if (product.id && normQ.includes(product.id.replace(/^industrial-specialty-canonical-/, "").replace(/-/g, " "))) {
    score = Math.max(score, 46);
  }

  const productNorm = normalizeProductQuery(product.productName);
  if (productNorm.length >= 12 && normQ.includes(productNorm)) {
    score = Math.max(score, 44);
  }

  if (product.pdsMapKey) {
    const mapKeyNorm = normalizeProductQuery(product.pdsMapKey);
    if (mapKeyNorm.length >= 6 && normQ.includes(mapKeyNorm)) {
      score = Math.max(score, 34);
    }
  }

  for (const alias of product.aliases) {
    const a = normalizeProductQuery(alias);
    if (a.length < 4) continue;
    if (normQ === a) score = Math.max(score, 48);
    else if (a.length >= 12 && normQ.includes(a)) score = Math.max(score, 42);
    else if (normQ.includes(a)) score = Math.max(score, 30 + Math.min(12, a.length));
  }

  for (const kw of product.routingKeywords) {
    const k = normalizeProductQuery(kw);
    if (k.length < 4) continue;
    if (normQ.includes(k)) score = Math.max(score, 22 + Math.min(10, k.length));
  }

  const querySkuKeys = gatherIndustrialSpecialtyProductNumberKeysFromQuery(normQ).keys;
  for (const pn of product.productNumbers) {
    for (const key of collectIndustrialSpecialtyProductNumberKeys(pn)) {
      if (querySkuKeys.has(key)) score = Math.max(score, 52);
    }
  }

  if (product.saeGrade) {
    const saeNorm = normalizeProductQuery(String(product.saeGrade));
    if (saeNorm.length >= 2 && normQ.includes(saeNorm)) score = Math.max(score, 38);
  }
  if (productIso && isoGrade === productIso) score = Math.max(score, 44);

  if (product.id === "industrial-specialty-canonical-bar-chain-commercial-oil") {
    if (normQ.includes("commercial bar") || normQ.includes("red bar oil") || normQ.includes("value bar chain")) {
      score = Math.max(score, 52);
    }
    if (hasBarChainOrForestryBarOilCue(normQ) && normQ.includes("commercial")) score = Math.max(score, 48);
  }

  if (product.id === "industrial-specialty-canonical-clear-bar-chain-oil") {
    if (normQ.includes("clear bar") || normQ.includes("clear bar chain") || normQ.includes("all season clear")) {
      score = Math.max(score, 52);
    }
  }

  if (product.id === "industrial-specialty-canonical-hi-tack-bar-chain-iso90-winter") {
    if (normQ.includes("winter bar") || (normQ.includes("hi tack") && isoGrade === "90")) score = Math.max(score, 52);
    if (normQ.includes("cold weather") && hasBarChainOrForestryBarOilCue(normQ)) score = Math.max(score, 48);
  }

  if (product.id === "industrial-specialty-canonical-hi-tack-bar-chain-iso150-all-season") {
    if (normQ.includes("all season hi tack") || (normQ.includes("hi tack") && isoGrade === "150")) {
      score = Math.max(score, 52);
    }
  }

  if (product.id === "industrial-specialty-canonical-hi-tack-bar-chain-iso220-summer") {
    if (normQ.includes("summer bar") || (normQ.includes("high heat") && normQ.includes("forestry"))) {
      score = Math.max(score, 52);
    }
    if (normQ.includes("hi tack") && isoGrade === "220") score = Math.max(score, 52);
  }

  if (isSawGuide && hasSawGuideCue(normQ)) {
    score = Math.max(score, isoGrade ? 50 : 42);
  }

  if (isCompressor46) {
    if (normQ.includes("natural gas") || normQ.includes("wet gas")) return 0;
    if (
      normQ.includes("rotary screw") ||
      normQ.includes("air compressor") ||
      normQ.includes("inert gas compressor") ||
      (normQ.includes("compressor") && isoGrade === "46" && !normQ.includes("natural gas"))
    ) {
      score = Math.max(score, 52);
    }
    if (
      normQ.includes("oxygen") ||
      normQ.includes("chlorine") ||
      normQ.includes("hydrogen chloride") ||
      normQ.includes("chemically active gas")
    ) {
      score = Math.max(score, 40);
    }
    if (normQ.includes("pag") || normQ.includes("silicone")) {
      score = Math.max(score, 36);
    }
  }

  if (isCompressor260) {
    if (normQ.includes("rotary screw") || normQ.includes("inert gas compressor")) return 0;
    if (
      normQ.includes("natural gas") ||
      normQ.includes("wet gas") ||
      normQ.includes("gas compressor") ||
      normQ.includes("reciprocating natural gas") ||
      isoGrade === "260"
    ) {
      score = Math.max(score, 52);
    }
  }

  if (product.id === "industrial-specialty-canonical-way-oil-iso68") {
    if (
      normQ.includes("way oil") ||
      normQ.includes("way lube") ||
      normQ.includes("slideway") ||
      normQ.includes("stick slip") ||
      normQ.includes("machine tool")
    ) {
      score = Math.max(score, 50);
    }
  }

  if (product.id === "industrial-specialty-canonical-soluble-cutting-oil") {
    if (
      normQ.includes("soluble cutting") ||
      normQ.includes("water mix cutting") ||
      normQ.includes("emulsifiable machining")
    ) {
      score = Math.max(score, 52);
    }
    if (normQ.includes("straight cutting oil") && normQ.includes("soluble")) score = Math.max(score, 44);
  }

  if (isRockDrill && hasRockDrillCue(normQ)) {
    score = Math.max(score, isoGrade ? 50 : 40);
  }

  if (product.id === "industrial-specialty-canonical-enhanced-form-release-oil") {
    if (normQ.includes("enhanced form release")) score = Math.max(score, 52);
  }

  if (product.id === "industrial-specialty-canonical-form-release-dust-suppressant-oil") {
    if (normQ.includes("dust suppressant") || normQ.includes("form release and dust")) {
      score = Math.max(score, 52);
    }
  }

  if (product.id === "industrial-specialty-canonical-light-form-oil") {
    if (normQ.includes("light form oil")) score = Math.max(score, 52);
  }

  if (product.id === "industrial-specialty-canonical-multi-use-industrial-cattle-oil") {
    if (
      normQ.includes("cattle oil") ||
      normQ.includes("cattle oiler") ||
      normQ.includes("riding arena dust") ||
      normQ.includes("grain handling dust")
    ) {
      score = Math.max(score, 52);
    }
  }

  if (isNd30) {
    if (normQ.includes("non detergent") || normQ.includes("nd 30") || normQ.includes("sae 30 non detergent")) {
      score = Math.max(score, 50);
    }
    if (normQ.includes("shop lubricant")) score = Math.max(score, 46);
    if (isAutomotiveGasolineEngineQuery(normQ)) score = Math.max(score, 38);
  }

  if (hasBarChainOrForestryBarOilCue(normQ) && isBarChain && !isoGrade) {
    score = Math.max(score, 36);
  }

  if (normQ.includes("straight cutting oil") && product.id === "industrial-specialty-canonical-soluble-cutting-oil") {
    score = Math.min(score, 44);
  }

  return score;
}

/**
 * @param {string} normQ
 * @param {string} key
 */
function resolveIndustrialSpecialtyOilFromPdsRetrievalKey(normQ, key) {
  /** @type {import("../data/industrialSpecialtyOilCanonicalProductIntelligence.js").IndustrialSpecialtyOilCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const product of listIndustrialSpecialtyOilCanonicalProductIntelligence()) {
    if (product.pdsMapKey !== key) continue;
    const score = scoreIndustrialSpecialtyOilCanonicalProduct(product, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = product;
    }
  }
  return best && bestScore >= ENTITY_DETECT_MIN_SCORE ? best : null;
}

/**
 * @param {string} normQ
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectIndustrialSpecialtyOilCanonicalProductEntities(normQ) {
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const product of listIndustrialSpecialtyOilCanonicalProductIntelligence()) {
    const score = scoreIndustrialSpecialtyOilCanonicalProduct(product, normQ);
    if (score < ENTITY_DETECT_MIN_SCORE) continue;
    hits.push({ id: product.id, score, label: product.productName });
  }
  return hits;
}

/**
 * @param {string} normQ
 * @param {string} detectId
 */
function resolveIndustrialSpecialtyOilCanonicalFromDetectId(normQ, detectId) {
  const id = String(detectId ?? "").trim();
  if (!id) return null;

  /** @type {import("../data/industrialSpecialtyOilCanonicalProductIntelligence.js").IndustrialSpecialtyOilCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const product of INDUSTRIAL_SPECIALTY_OIL_CANONICAL_PRODUCT_INTELLIGENCE.products) {
    if (product.id !== id) continue;
    const score = scoreIndustrialSpecialtyOilCanonicalProduct(product, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = product;
    }
  }
  if (best) return best;
  if (id.startsWith("industrial-specialty-canonical-")) {
    return getIndustrialSpecialtyOilCanonicalProductIntelligenceById(id);
  }
  return null;
}

/**
 * @param {import("../data/industrialSpecialtyOilCanonicalProductIntelligence.js").IndustrialSpecialtyOilCanonicalProductIntelligence} product
 */
function buildEntitySectionsFromIndustrialSpecialtyOilCanonical(product) {
  const gradeLabel = product.saeGrade
    ? `SAE ${product.saeGrade}`
    : product.isoGrade
      ? `ISO VG ${product.isoGrade}`
      : product.viscosityGrade;
  const whatItIs = uniqStrings([
    product.productName,
    product.salesPositioning,
    product.formulation,
    product.category ? String(product.category) : "",
    product.marketSegment ? `Market segment: ${product.marketSegment}` : "",
    product.applicationSegment ? `Application segment: ${product.applicationSegment}` : "",
    gradeLabel ? `${gradeLabel} — ${product.productFamily}` : product.productFamily,
  ]);
  const whyItWins = uniqStrings([
    product.salesPositioning,
    ...product.differentiators,
    ...product.salesEnablementAngles,
  ]);
  const proof = uniqStrings([...product.specifications, ...product.approvals]);
  const whereFits = uniqStrings([
    ...product.applications,
    ...product.bestFit,
    ...product.crossSellSignals,
  ]);
  const repTalk = uniqStrings([product.salesPositioning, ...product.productSpotlightAngles.slice(0, 3)]);
  const questions = uniqStrings([
    ...product.customerProfileQuestions,
    ...product.customerProfileSignals.map((s) => `Customer profile signal: ${s}`),
    "What ISO VG or SAE grade does the equipment tag require?",
    "What product number is on the drum or purchase order?",
  ]);
  const techLines = Object.entries(product.technicalProperties || {}).map(([k, v]) => `${k}: ${v}`);
  const confirm = uniqStrings([
    ...product.cautions,
    ...product.notBestFit.map((n) => `Not best fit: ${n}`),
    ...product.sourceNotes,
    ...product.operationalPainPoints.map((p) => `Operational pain point: ${p}`),
    product.pdsMapKey ? `Confirm the indexed row “${product.pdsMapKey}” matches the drum label before quoting.` : "",
    product.pdsFileName ? `PDS file: ${product.pdsFileName}` : "",
    ...(product.productNumbers.length ? [`Product numbers: ${product.productNumbers.join("; ")}`] : []),
    ...techLines.slice(0, 10),
  ]);

  const proofIntro = proof.length
    ? "Use indexed PDS map lines and the live PDS PDF—quote only printed spec rows."
    : "Open the current PDS PDF for authoritative proof; the map index is a pointer only.";

  return [
    narrativeSection("whatItIs", "What It Is", product.category ? String(product.category) : "", whatItIs),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : []),
    narrativeSection("pdsBackedProof", "PDS-Backed Proof", proofIntro, proof.length ? proof.slice(0, 10) : []),
    narrativeSection(
      "whereItFits",
      "Where It Fits",
      product.categorySpotlightAngles?.[0] ? String(product.categorySpotlightAngles[0]) : gradeLabel || "",
      whereFits
    ),
    narrativeSection("repTalkTrack", "Rep Talk Track", "", repTalk),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions),
    narrativeSection("confirmBeforeUse", "Confirm Before Use", "", confirm),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {unknown} text
 * @returns {Set<string>}
 */
function extractAgriOemProductNumberKeysFromText(text) {
  /** @type {Set<string>} */
  const keys = new Set();
  const raw = String(text ?? "");
  if (!raw.trim()) return keys;
  const upper = raw.toUpperCase();
  for (const re of [/\bKL\s*[-]?\s*AG\s*(\d{4})\b/g, /\bKLAG(\d{4})\b/g]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(upper))) {
      keys.add(`KLAG${m[1]}`);
    }
  }
  for (const re of [/\bKL\s*[-]?\s*GR\s*(\d{4})\b/g, /\bKLGR(\d{4})\b/g]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(upper))) {
      keys.add(`KLGR${m[1]}`);
    }
  }
  return keys;
}

/**
 * @param {string} normQ
 * @returns {Set<string>}
 */
function extractAgriOemProductNumberKeysFromNormQ(normQ) {
  /** @type {Set<string>} */
  const keys = new Set();
  const agSpaced = /\bkl\s+ag\s*(\d{4})\b/g;
  let m;
  while ((m = agSpaced.exec(normQ))) {
    keys.add(`KLAG${m[1]}`);
  }
  const grSpaced = /\bkl\s+gr\s*(\d{4})\b/g;
  while ((m = grSpaced.exec(normQ))) {
    keys.add(`KLGR${m[1]}`);
  }
  const compact = normQ.replace(/\s+/g, "");
  const agCm = compact.match(/\bklag(\d{4})\b/);
  if (agCm) keys.add(`KLAG${agCm[1]}`);
  const grCm = compact.match(/\bklgr(\d{4})\b/);
  if (grCm) keys.add(`KLGR${grCm[1]}`);
  return keys;
}

/**
 * @param {unknown} productNumbers
 * @returns {Set<string>}
 */
function collectAgriOemProductNumberKeys(productNumbers) {
  /** @type {Set<string>} */
  const keys = new Set();
  /** @param {unknown} val */
  const visit = (val) => {
    if (val == null) return;
    if (typeof val === "string") {
      extractAgriOemProductNumberKeysFromText(val).forEach((k) => keys.add(k));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(visit);
      return;
    }
    if (typeof val === "object") {
      Object.values(val).forEach(visit);
    }
  };
  visit(productNumbers);
  return keys;
}

/** @type {Map<string, import("../data/agriOemCanonicalProductIntelligence.js").AgriOemCanonicalProductIntelligence> | null} */
let agriOemProductNumberIndex = null;

/**
 * @returns {Map<string, import("../data/agriOemCanonicalProductIntelligence.js").AgriOemCanonicalProductIntelligence>}
 */
function getAgriOemProductNumberIndex() {
  if (agriOemProductNumberIndex) return agriOemProductNumberIndex;
  agriOemProductNumberIndex = new Map();
  for (const product of listAgriOemCanonicalProductIntelligence()) {
    for (const key of collectAgriOemProductNumberKeys(product.productNumbers)) {
      if (!agriOemProductNumberIndex.has(key)) {
        agriOemProductNumberIndex.set(key, product);
      }
    }
  }
  return agriOemProductNumberIndex;
}

/**
 * @param {unknown} inputText
 * @returns {{ keys: Set<string>, normQ: string }}
 */
function gatherAgriOemProductNumberKeysFromQuery(inputText) {
  const raw = String(inputText ?? "");
  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(raw));
  /** @type {Set<string>} */
  const keys = new Set([
    ...extractAgriOemProductNumberKeysFromText(raw),
    ...extractAgriOemProductNumberKeysFromNormQ(normQ),
  ]);
  return { keys, normQ };
}

/**
 * @param {unknown} inputText
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectExactAgriOemProductNumberMatch(inputText) {
  const { keys } = gatherAgriOemProductNumberKeysFromQuery(inputText);
  if (keys.size === 0) return [];

  const index = getAgriOemProductNumberIndex();
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const key of keys) {
    const product = index.get(key);
    if (product) {
      hits.push({ id: product.id, score: AGRI_OEM_EXACT_PRODUCT_NUMBER_SCORE, label: product.productName });
    }
  }
  return hits;
}

/**
 * @param {import("../data/agriOemCanonicalProductIntelligence.js").AgriOemCanonicalProductIntelligence} product
 * @param {unknown} inputText
 */
function scoreExactAgriOemProductNumberForRow(product, inputText) {
  const { keys } = gatherAgriOemProductNumberKeysFromQuery(inputText);
  if (keys.size === 0) return 0;
  const index = getAgriOemProductNumberIndex();
  for (const key of keys) {
    const match = index.get(key);
    if (match && match.id === product.id) return AGRI_OEM_EXACT_PRODUCT_NUMBER_SCORE;
  }
  return 0;
}

/**
 * @param {string} normQ
 */
function queryHasJohnDeereAgCue(normQ) {
  return (
    normQ.includes("john deere") ||
    /\bdeere\b/.test(normQ) ||
    normQ.includes("cool gard") ||
    normQ.includes("plus 50") ||
    normQ.includes("j20c") ||
    normQ.includes("jdm j20c")
  );
}

/**
 * @param {string} normQ
 */
function queryHasCnhAgCue(normQ) {
  return (
    normQ.includes("cnh") ||
    normQ.includes("case ih") ||
    /\bmat\s*(3724|3624|3572|3544|3540)\b/.test(normQ) ||
    normQ.includes("zinc free trans drive") ||
    normQ.includes("zf trans drive")
  );
}

/** @param {string} normQ */
const AGRI_OEM_CNH_RED_TRANS_DRIVE_ID =
  "agri-oem-canonical-agrimax-cnh-case-ih-zinc-free-trans-drive-hydraulic-red";

/**
 * CNH / Case IH MAT trans-drive / UTTO context (hydraulic+transmission language without "trans drive").
 * @param {string} normQ
 */
function hasCnhAgTransDriveContext(normQ) {
  return (
    normQ.includes("trans drive") ||
    normQ.includes("zinc free trans drive") ||
    normQ.includes("zf trans drive") ||
    normQ.includes("hydraulic transmission fluid") ||
    normQ.includes("transmission hydraulic fluid") ||
    normQ.includes("drivetrain hydraulic") ||
    normQ.includes("wet brake") ||
    normQ.includes("pto") ||
    /\bcvt\b/.test(normQ) ||
    /\bivt\b/.test(normQ)
  );
}

/**
 * Strong CNH Ag OEM trans-drive intent — MAT 3540/3544 alone, or CNH/Case IH + UTTO/trans-hydraulic cues.
 * @param {string} normQ
 */
function hasStrongCnhAgTransDriveCue(normQ) {
  if (/\bmat\s*(3540|3544)\b/.test(normQ)) return true;
  const hasCnh = normQ.includes("cnh") || normQ.includes("case ih");
  if (!hasCnh) return false;
  return hasCnhAgTransDriveContext(normQ);
}

/**
 * @param {string} normQ
 */
function shouldSuppressTransmissionForAgriOemMatTransDrive(normQ) {
  return hasStrongAgriOemIntent(normQ) && hasStrongCnhAgTransDriveCue(normQ);
}

/**
 * Prepend high-confidence Ag OEM MAT trans-drive hits (before transmission canonical in merge order).
 * @param {unknown} inputText
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectStrongAgriOemMatTransDriveEntityHits(inputText) {
  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(inputText));
  if (!normQ || !hasStrongCnhAgTransDriveCue(normQ)) return [];

  const product = getAgriOemCanonicalProductIntelligenceById(AGRI_OEM_CNH_RED_TRANS_DRIVE_ID);
  if (!product) return [];

  const score = scoreAgriOemCanonicalProduct(product, normQ, inputText);
  if (score < ENTITY_DETECT_MIN_SCORE) {
    return [{ id: product.id, score: 60, label: product.productName }];
  }
  return [{ id: product.id, score: Math.max(score, 60), label: product.productName }];
}

/**
 * @param {string} normQ
 */
function hasStrongAgriOemIntent(normQ) {
  if (normQ.includes("agrimax") || normQ.includes("agri max")) return true;
  if (normQ.includes("agriculture oem") || normQ.includes("ag oem")) return true;
  if (queryHasJohnDeereAgCue(normQ) || queryHasCnhAgCue(normQ)) return true;
  if (normQ.includes("poly tac") || normQ.includes("agrimax poly")) return true;
  if (normQ.includes("gc-lb") && (normQ.includes("poly tac") || normQ.includes("polyurea"))) return true;
  if (normQ.includes("green ag") && normQ.includes("grease") && normQ.includes("polyurea")) return true;
  if (normQ.includes("jdm grease")) return true;
  if (gatherAgriOemProductNumberKeysFromQuery(normQ).keys.size > 0) return true;
  return false;
}

/**
 * @param {string} normQ
 */
function isAgriOemProductQuery(normQ) {
  if (!hasStrongAgriOemIntent(normQ)) return false;
  if (isGearOilTerritoryBlockingSpecialty(normQ) && !normQ.includes("agrimax")) return false;
  if (isIndustrialSpecialtyOilProductQuery(normQ) && !normQ.includes("agrimax")) return false;
  if (isTwoCycleSmallEngineQuery(normQ)) return false;

  const hasAgriBrand = normQ.includes("agrimax") || gatherAgriOemProductNumberKeysFromQuery(normQ).keys.size > 0;
  const hasOemCue = queryHasJohnDeereAgCue(normQ) || queryHasCnhAgCue(normQ);
  const hasPolyTacAgCue =
    normQ.includes("poly tac") ||
    normQ.includes("gc-lb") ||
    normQ.includes("jdm grease") ||
    (normQ.includes("green ag") && normQ.includes("grease"));

  if (!hasAgriBrand && !hasOemCue && !hasPolyTacAgCue) return false;

  if (!normQ.includes("agrimax") && gatherAgriOemProductNumberKeysFromQuery(normQ).keys.size === 0) {
    if (isHdEngineOilProductQuery(normQ) && !hasOemCue) return false;
    if (isCoolantAntifreezeProductQuery(normQ) && !hasOemCue) return false;
    if (
      (isPlainUtfQuery(normQ) || (normQ.includes("wet brake") && normQ.includes("hydraulic"))) &&
      !normQ.includes("trans drive") &&
      !normQ.includes("j20c") &&
      !normQ.includes("agrimax")
    ) {
      return false;
    }
    if (
      normQ.includes("polyurea") &&
      !normQ.includes("poly tac") &&
      !normQ.includes("agrimax") &&
      !normQ.includes("jdm grease") &&
      !hasPolyTacAgCue
    ) {
      return false;
    }
  }

  if (
    isClearTransmissionFluidOnlyQuery(normQ) &&
    !normQ.includes("trans drive") &&
    !normQ.includes("j20c") &&
    !hasStrongCnhAgTransDriveCue(normQ)
  ) {
    return false;
  }

  return true;
}

/**
 * @param {import("../data/agriOemCanonicalProductIntelligence.js").AgriOemCanonicalProductIntelligence} product
 * @param {string} normQ
 * @param {unknown} inputText
 */
function scoreAgriOemCanonicalProduct(product, normQ, inputText) {
  if (scoreExactAgriOemProductNumberForRow(product, inputText) >= AGRI_OEM_EXACT_PRODUCT_NUMBER_SCORE) {
    return AGRI_OEM_EXACT_PRODUCT_NUMBER_SCORE;
  }
  if (!isAgriOemProductQuery(normQ)) return 0;

  const isJd = product.oemAlignment === "John Deere";
  const isCnh = product.oemAlignment === "CNH / Case IH";
  const isElc = product.productFamily === "agrimax_elc_premix";
  const isHd = product.productFamily === "agrimax_hd_engine_oil";
  const isTrans = product.productFamily === "agrimax_trans_drive_hydraulic";
  const isPoly = product.id === "agri-oem-canonical-agrimax-poly-tac-ep2-polyurea-grease";

  if (isJd && queryHasCnhAgCue(normQ) && !queryHasJohnDeereAgCue(normQ)) return 0;
  if (isCnh && queryHasJohnDeereAgCue(normQ) && !queryHasCnhAgCue(normQ)) return 0;

  let score = 0;

  if (product.id && normQ.includes(product.id.replace(/^agri-oem-canonical-agrimax-/, "").replace(/-/g, " "))) {
    score = Math.max(score, 46);
  }

  const productNorm = normalizeProductQuery(product.productName);
  if (productNorm.length >= 12 && normQ.includes(productNorm)) {
    score = Math.max(score, 44);
  }

  if (product.pdsMapKey) {
    const mapKeyNorm = normalizeProductQuery(product.pdsMapKey);
    if (mapKeyNorm.length >= 6 && normQ.includes(mapKeyNorm)) {
      score = Math.max(score, 34);
    }
  }

  for (const alias of product.aliases) {
    const a = normalizeProductQuery(alias);
    if (a.length < 4) continue;
    if (normQ === a) score = Math.max(score, 48);
    else if (a.length >= 12 && normQ.includes(a)) score = Math.max(score, 42);
    else if (normQ.includes(a)) score = Math.max(score, 30 + Math.min(12, a.length));
  }

  for (const kw of product.routingKeywords) {
    const k = normalizeProductQuery(kw);
    if (k.length < 4) continue;
    if (normQ.includes(k)) score = Math.max(score, 22 + Math.min(10, k.length));
  }

  const querySkuKeys = gatherAgriOemProductNumberKeysFromQuery(inputText).keys;
  for (const pn of product.productNumbers) {
    for (const key of collectAgriOemProductNumberKeys(pn)) {
      if (querySkuKeys.has(key)) score = Math.max(score, 52);
    }
  }

  if (isElc && isJd) {
    if (normQ.includes("cool gard") || (normQ.includes("agrimax") && normQ.includes("coolant") && normQ.includes("green"))) {
      score = Math.max(score, 52);
    }
    if (queryHasJohnDeereAgCue(normQ) && (normQ.includes("coolant") || normQ.includes("antifreeze") || normQ.includes("elc"))) {
      score = Math.max(score, 50);
    }
    if (normQ.includes("agrimax") && normQ.includes("coolant") && !queryHasCnhAgCue(normQ) && !/\bred\b/.test(normQ)) {
      score = Math.max(score, 42);
    }
  }

  if (isElc && isCnh) {
    if (/\bmat\s*(3724|3624)\b/.test(normQ) || (normQ.includes("agrimax") && normQ.includes("coolant") && normQ.includes("red"))) {
      score = Math.max(score, 52);
    }
    if (queryHasCnhAgCue(normQ) && (normQ.includes("coolant") || normQ.includes("antifreeze") || normQ.includes("elc"))) {
      score = Math.max(score, 50);
    }
    if (normQ.includes("agrimax") && normQ.includes("coolant") && !queryHasJohnDeereAgCue(normQ) && !normQ.includes("green")) {
      score = Math.max(score, 42);
    }
  }

  if (isHd && isJd) {
    if (normQ.includes("plus 50") || (normQ.includes("agrimax") && normQ.includes("15w 40") && normQ.includes("green"))) {
      score = Math.max(score, 52);
    }
    if (queryHasJohnDeereAgCue(normQ) && normQ.includes("15w 40") && normQ.includes("ck-4")) {
      score = Math.max(score, 50);
    }
    if (normQ.includes("agrimax") && normQ.includes("15w 40") && !queryHasCnhAgCue(normQ) && !/\bred\b/.test(normQ)) {
      score = Math.max(score, 42);
    }
  }

  if (isHd && isCnh) {
    if (/\bmat\s*3572\b/.test(normQ) || (normQ.includes("agrimax") && normQ.includes("15w 40") && normQ.includes("red"))) {
      score = Math.max(score, 52);
    }
    if (queryHasCnhAgCue(normQ) && normQ.includes("15w 40") && normQ.includes("ck-4")) {
      score = Math.max(score, 50);
    }
    if (normQ.includes("agrimax") && normQ.includes("15w 40") && !queryHasJohnDeereAgCue(normQ) && !normQ.includes("green")) {
      score = Math.max(score, 42);
    }
  }

  if (isTrans && isJd) {
    if (normQ.includes("j20c") || normQ.includes("jdm j20c") || (normQ.includes("agrimax") && normQ.includes("trans drive") && normQ.includes("green"))) {
      score = Math.max(score, 52);
    }
    if (queryHasJohnDeereAgCue(normQ) && normQ.includes("trans drive")) {
      score = Math.max(score, 50);
    }
    if (normQ.includes("agrimax") && normQ.includes("trans drive") && !queryHasCnhAgCue(normQ) && !/\bred\b/.test(normQ)) {
      score = Math.max(score, 42);
    }
  }

  if (isTrans && isCnh) {
    if (
      /\bmat\s*(3544|3540)\b/.test(normQ) ||
      normQ.includes("zinc free trans drive") ||
      normQ.includes("zf trans drive") ||
      (normQ.includes("agrimax") && normQ.includes("trans drive") && normQ.includes("red"))
    ) {
      score = Math.max(score, 52);
    }
    if (queryHasCnhAgCue(normQ) && normQ.includes("trans drive")) {
      score = Math.max(score, 50);
    }
    if (normQ.includes("agrimax") && normQ.includes("trans drive") && !queryHasJohnDeereAgCue(normQ) && !normQ.includes("green")) {
      score = Math.max(score, 42);
    }
    if (product.id === AGRI_OEM_CNH_RED_TRANS_DRIVE_ID && hasStrongCnhAgTransDriveCue(normQ)) {
      score = Math.max(score, 62);
    }
    if (
      product.id === AGRI_OEM_CNH_RED_TRANS_DRIVE_ID &&
      (normQ.includes("hydraulic transmission fluid") || normQ.includes("transmission hydraulic fluid")) &&
      queryHasCnhAgCue(normQ)
    ) {
      score = Math.max(score, 58);
    }
  }

  if (isPoly) {
    const polyCue =
      normQ.includes("poly tac") ||
      normQ.includes("agrimax poly") ||
      normQ.includes("jdm grease") ||
      normQ.includes("gc-lb") ||
      (normQ.includes("agrimax") && normQ.includes("grease"));
    if (polyCue) score = Math.max(score, 50);
    if (hasStrongAgriPolyTacCue(normQ)) {
      score = Math.max(score, 58);
    }
    if (normQ.includes("polyurea") && !normQ.includes("agrimax") && !normQ.includes("poly tac")) {
      if (!(normQ.includes("gc-lb") || normQ.includes("green ag") || normQ.includes("jdm grease"))) {
        return 0;
      }
    }
  }

  if (normQ.includes("agrimax") && !queryHasJohnDeereAgCue(normQ) && !queryHasCnhAgCue(normQ)) {
    if (isElc || isHd || isTrans) {
      score = Math.max(score, 40);
    }
  }

  return score;
}

/**
 * @param {string} normQ
 * @param {string} key
 */
function resolveAgriOemFromPdsRetrievalKey(normQ, key) {
  /** @type {import("../data/agriOemCanonicalProductIntelligence.js").AgriOemCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const product of listAgriOemCanonicalProductIntelligence()) {
    if (product.pdsMapKey !== key) continue;
    const score = scoreAgriOemCanonicalProduct(product, normQ, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = product;
    }
  }
  return best && bestScore >= ENTITY_DETECT_MIN_SCORE ? best : null;
}

/**
 * @param {unknown} inputText
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectAgriOemCanonicalProductEntities(inputText) {
  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(inputText));
  if (!normQ) return [];

  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const product of listAgriOemCanonicalProductIntelligence()) {
    const score = scoreAgriOemCanonicalProduct(product, normQ, inputText);
    if (score < ENTITY_DETECT_MIN_SCORE) continue;
    hits.push({ id: product.id, score, label: product.productName });
  }
  return hits;
}

/**
 * @param {string} normQ
 * @param {string} detectId
 */
function resolveAgriOemCanonicalFromDetectId(normQ, detectId) {
  const id = String(detectId ?? "").trim();
  if (!id) return null;

  /** @type {import("../data/agriOemCanonicalProductIntelligence.js").AgriOemCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const product of AGRI_OEM_CANONICAL_PRODUCT_INTELLIGENCE.products) {
    if (product.id !== id) continue;
    const score = scoreAgriOemCanonicalProduct(product, normQ, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = product;
    }
  }
  if (best) return best;
  if (id.startsWith("agri-oem-canonical-")) {
    return getAgriOemCanonicalProductIntelligenceById(id);
  }
  return null;
}

/**
 * @param {import("../data/agriOemCanonicalProductIntelligence.js").AgriOemCanonicalProductIntelligence} product
 */
function buildEntitySectionsFromAgriOemCanonical(product) {
  const gradeLabel = product.saeGrade
    ? `SAE ${product.saeGrade}`
    : product.isoGrade
      ? `ISO VG ${product.isoGrade}`
      : product.nlgiGrade
        ? `NLGI ${product.nlgiGrade}`
        : product.viscosityGrade;
  const whatItIs = uniqStrings([
    product.productName,
    product.salesPositioning,
    product.formulation,
    product.oemAlignment ? `OEM alignment: ${product.oemAlignment}` : "",
    product.oemColorIdentity ? `Color identity: ${product.oemColorIdentity}` : "",
    product.equipmentSegment ? `Equipment segment: ${product.equipmentSegment}` : "",
    product.applicationSegment ? `Application segment: ${product.applicationSegment}` : "",
    product.coolantChemistry ? `Coolant chemistry: ${product.coolantChemistry}` : "",
    product.thickenerType ? `Thickener: ${product.thickenerType}` : "",
    gradeLabel ? `${gradeLabel} — ${product.productFamily}` : product.productFamily,
  ]);
  const whyItWins = uniqStrings([
    product.salesPositioning,
    ...product.differentiators,
    ...product.salesEnablementAngles,
  ]);
  const proof = uniqStrings([...product.specifications, ...product.approvals]);
  const whereFits = uniqStrings([
    ...product.applications,
    ...product.bestFit,
    ...product.crossSellSignals,
  ]);
  const repTalk = uniqStrings([product.salesPositioning, ...product.productSpotlightAngles.slice(0, 3)]);
  const questions = uniqStrings([
    ...product.customerProfileQuestions,
    ...product.customerProfileSignals.map((s) => `Customer profile signal: ${s}`),
    ...product.oemConquestSignals.map((s) => `OEM conquest signal: ${s}`),
    "Is this account primarily John Deere, CNH/Case IH, or mixed fleet?",
    "What product number is on the drum or purchase order?",
  ]);
  const techLines = Object.entries(product.technicalProperties || {}).map(([k, v]) => `${k}: ${v}`);
  const confirm = uniqStrings([
    ...product.cautions,
    ...product.notBestFit.map((n) => `Not best fit: ${n}`),
    ...product.sourceNotes,
    ...product.operationalPainPoints.map((p) => `Operational pain point: ${p}`),
    ...product.accountSegmentationSignals.map((s) => `Account segmentation: ${s}`),
    product.pdsMapKey ? `Confirm the indexed row “${product.pdsMapKey}” matches the drum label before quoting.` : "",
    product.pdsFileName ? `PDS file: ${product.pdsFileName}` : "",
    ...(product.productNumbers.length ? [`Product numbers: ${product.productNumbers.join("; ")}`] : []),
    ...techLines.slice(0, 10),
  ]);

  const proofIntro = proof.length
    ? "Use indexed PDS map lines and the live PDS PDF—quote only printed spec rows."
    : "Open the current PDS PDF for authoritative proof; the map index is a pointer only.";

  return [
    narrativeSection("whatItIs", "What It Is", product.category ? String(product.category) : "", whatItIs),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : []),
    narrativeSection("pdsBackedProof", "PDS-Backed Proof", proofIntro, proof.length ? proof.slice(0, 10) : []),
    narrativeSection(
      "whereItFits",
      "Where It Fits",
      product.categorySpotlightAngles?.[0] ? String(product.categorySpotlightAngles[0]) : gradeLabel || "",
      whereFits
    ),
    narrativeSection("repTalkTrack", "Rep Talk Track", "", repTalk),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions),
    narrativeSection("confirmBeforeUse", "Confirm Before Use", "", confirm),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {string} text
 * @returns {Set<string>}
 */
function extractComplianceSpecialtyProductNumberKeysFromText(text) {
  /** @type {Set<string>} */
  const keys = new Set();
  const raw = String(text ?? "");
  if (!raw.trim()) return keys;
  const upper = raw.toUpperCase();
  for (const re of [/\bKL\s*[-]?\s*FG\s*(\d{4})\b/g, /\bKLFG(\d{4})\b/g]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(upper))) {
      keys.add(`KLFG${m[1]}`);
    }
  }
  for (const re of [/\bKL\s*[-]?\s*BL\s*(\d{4})\b/g, /\bKLBL(\d{4})\b/g]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(upper))) {
      keys.add(`KLBL${m[1]}`);
    }
  }
  return keys;
}

/**
 * @param {string} normQ
 * @returns {Set<string>}
 */
function extractComplianceSpecialtyProductNumberKeysFromNormQ(normQ) {
  /** @type {Set<string>} */
  const keys = new Set();
  const fgSpaced = /\bkl\s+fg\s*(\d{4})\b/g;
  let m;
  while ((m = fgSpaced.exec(normQ))) {
    keys.add(`KLFG${m[1]}`);
  }
  const blSpaced = /\bkl\s+bl\s*(\d{4})\b/g;
  while ((m = blSpaced.exec(normQ))) {
    keys.add(`KLBL${m[1]}`);
  }
  const compact = normQ.replace(/\s+/g, "");
  const fgCm = compact.match(/\bklfg(\d{4})\b/);
  if (fgCm) keys.add(`KLFG${fgCm[1]}`);
  const blCm = compact.match(/\bklbl(\d{4})\b/);
  if (blCm) keys.add(`KLBL${blCm[1]}`);
  return keys;
}

/**
 * @param {unknown} productNumbers
 * @returns {Set<string>}
 */
function collectComplianceSpecialtyProductNumberKeys(productNumbers) {
  /** @type {Set<string>} */
  const keys = new Set();
  /** @param {unknown} val */
  const visit = (val) => {
    if (val == null) return;
    if (typeof val === "string") {
      extractComplianceSpecialtyProductNumberKeysFromText(val).forEach((k) => keys.add(k));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(visit);
      return;
    }
    if (typeof val === "object") {
      Object.values(val).forEach(visit);
    }
  };
  visit(productNumbers);
  return keys;
}

/** @type {Map<string, import("../data/complianceSpecialtyCanonicalProductIntelligence.js").ComplianceSpecialtyCanonicalProductIntelligence[]> | null} */
let complianceSpecialtyProductNumberIndex = null;

/**
 * @returns {Map<string, import("../data/complianceSpecialtyCanonicalProductIntelligence.js").ComplianceSpecialtyCanonicalProductIntelligence[]>}
 */
function getComplianceSpecialtyProductNumberIndex() {
  if (complianceSpecialtyProductNumberIndex) return complianceSpecialtyProductNumberIndex;
  complianceSpecialtyProductNumberIndex = new Map();
  for (const product of listComplianceSpecialtyCanonicalProductIntelligence()) {
    for (const key of collectComplianceSpecialtyProductNumberKeys(product.productNumbers)) {
      const existing = complianceSpecialtyProductNumberIndex.get(key);
      if (existing) {
        if (!existing.some((p) => p.id === product.id)) existing.push(product);
      } else {
        complianceSpecialtyProductNumberIndex.set(key, [product]);
      }
    }
  }
  return complianceSpecialtyProductNumberIndex;
}

/**
 * @param {unknown} inputText
 * @returns {{ keys: Set<string>, normQ: string }}
 */
function gatherComplianceSpecialtyProductNumberKeysFromQuery(inputText) {
  const raw = String(inputText ?? "");
  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(raw));
  /** @type {Set<string>} */
  const keys = new Set([
    ...extractComplianceSpecialtyProductNumberKeysFromText(raw),
    ...extractComplianceSpecialtyProductNumberKeysFromNormQ(normQ),
  ]);
  return { keys, normQ };
}

/**
 * @param {unknown} inputText
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectExactComplianceSpecialtyProductNumberMatch(inputText) {
  const { keys, normQ } = gatherComplianceSpecialtyProductNumberKeysFromQuery(inputText);
  if (keys.size === 0) return [];

  const wantsHees = queryWantsHeesCompliance(normQ);
  const wantsHfdu = queryWantsHfduCompliance(normQ);
  const index = getComplianceSpecialtyProductNumberIndex();
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  /** @type {Set<string>} */
  const seen = new Set();
  for (const key of keys) {
    const products = index.get(key);
    if (!products) continue;
    for (const product of products) {
      if (product.id.includes("bio-hees") && wantsHfdu && !wantsHees) continue;
      if (product.id.includes("bio-hfdu") && wantsHees && !wantsHfdu) continue;
      if (seen.has(product.id)) continue;
      seen.add(product.id);
      hits.push({
        id: product.id,
        score: COMPLIANCE_SPECIALTY_EXACT_PRODUCT_NUMBER_SCORE,
        label: product.productName,
      });
    }
  }
  return hits;
}

/**
 * @param {import("../data/complianceSpecialtyCanonicalProductIntelligence.js").ComplianceSpecialtyCanonicalProductIntelligence} product
 * @param {unknown} inputText
 */
function scoreExactComplianceSpecialtyProductNumberForRow(product, inputText) {
  const { keys } = gatherComplianceSpecialtyProductNumberKeysFromQuery(inputText);
  if (keys.size === 0) return 0;
  const index = getComplianceSpecialtyProductNumberIndex();
  for (const key of keys) {
    const matches = index.get(key);
    if (matches?.some((p) => p.id === product.id)) {
      return COMPLIANCE_SPECIALTY_EXACT_PRODUCT_NUMBER_SCORE;
    }
  }
  return 0;
}

/**
 * @param {string} normQ
 * @returns {string | null}
 */
function parseComplianceIsoGradeFromNormQ(normQ) {
  const m = normQ.match(/\biso\s*(22|32|46|68|100|150)\b/);
  return m ? m[1] : null;
}

/**
 * @param {string} normQ
 */
function queryHasFoodGradeComplianceCue(normQ) {
  return (
    normQ.includes("food grade") ||
    normQ.includes("nsf h1") ||
    normQ.includes("fda incidental food contact") ||
    normQ.includes("fda 21 cfr") ||
    normQ.includes("21 cfr 178.3570") ||
    normQ.includes("incidental food contact") ||
    normQ.includes("food processing") ||
    normQ.includes("food safe") ||
    normQ.includes("bakery") ||
    normQ.includes("brewery") ||
    normQ.includes("cannery") ||
    normQ.includes("beverage packaging") ||
    normQ.includes("meat packing") ||
    (normQ.includes("washdown") && (normQ.includes("grease") || normQ.includes("hydraulic")))
  );
}

/**
 * @param {string} normQ
 */
function queryHasBioEalComplianceCue(normQ) {
  return (
    normQ.includes("readily biodegradable") ||
    normQ.includes("biodegradable") ||
    normQ.includes("bio aw") ||
    normQ.includes("bio hydraulic") ||
    normQ.includes("bio synthetic") ||
    normQ.includes("synthetic blend") ||
    normQ.includes("hees") ||
    normQ.includes("hfdu") ||
    normQ.includes("eal") ||
    normQ.includes("vgp") ||
    normQ.includes("vessel general permit") ||
    normQ.includes("oecd 301b") ||
    normQ.includes("oecd 203") ||
    normQ.includes("environmentally acceptable lubricant") ||
    normQ.includes("bio rock drill") ||
    normQ.includes("biodegradable rock drill") ||
    normQ.includes("fire resistant hydraulic") ||
    normQ.includes("water glycol") ||
    normQ.includes("low toxicity") ||
    normQ.includes("aquatic toxicity") ||
    normQ.includes("non-bioaccumulative") ||
    normQ.includes("non-toxic") ||
    normQ.includes("environmentally sensitive") ||
    normQ.includes("hydraulic leak risk")
  );
}

/**
 * @param {string} normQ
 */
function queryHasEnviroComplianceCue(normQ) {
  return (
    normQ.includes("enviro aw") ||
    normQ.includes("enviro mv") ||
    normQ.includes("inherently biodegradable") ||
    normQ.includes("static sheen") ||
    normQ.includes("epa static sheen") ||
    normQ.includes("silver bearing") ||
    (normQ.includes("zinc free") && normQ.includes("hydraulic") && !normQ.includes("trans drive")) ||
    (normQ.includes("ashless hydraulic") && (normQ.includes("enviro") || normQ.includes("biodegradable")))
  );
}

/**
 * @param {string} normQ
 */
function queryWantsHeesCompliance(normQ) {
  return normQ.includes("hees") || normQ.includes("iso 15380");
}

/**
 * @param {string} normQ
 */
function queryWantsHfduCompliance(normQ) {
  return (
    normQ.includes("hfdu") ||
    normQ.includes("fire resistant hydraulic") ||
    normQ.includes("steel mill") ||
    normQ.includes("foundry") ||
    normQ.includes("tunnel boring") ||
    normQ.includes("welding operations") ||
    normQ.includes("incineration")
  );
}

/**
 * @param {string} normQ
 */
function isComplianceBioRockDrillQuery(normQ) {
  const hasDrillCue =
    hasRockDrillCue(normQ) ||
    normQ.includes("jackhammer") ||
    normQ.includes("pneumatic drill") ||
    normQ.includes("pavement breaker");
  if (!hasDrillCue) return false;
  return (
    normQ.includes("biodegradable") ||
    normQ.includes("bio rock") ||
    normQ.includes("readily biodegradable") ||
    normQ.includes("oecd 301b") ||
    normQ.includes("bio rock drill") ||
    normQ.includes("biodegradable rock drill") ||
    normQ.includes("jackhammer biodegradable") ||
    normQ.includes("pneumatic drill biodegradable")
  );
}

/**
 * @param {string} normQ
 */
function hasStrongComplianceSpecialtyIntent(normQ) {
  if (queryHasFoodGradeComplianceCue(normQ)) return true;
  if (queryHasBioEalComplianceCue(normQ)) return true;
  if (queryHasEnviroComplianceCue(normQ)) return true;
  if (isComplianceBioRockDrillQuery(normQ)) return true;
  return gatherComplianceSpecialtyProductNumberKeysFromQuery(normQ).keys.size > 0;
}

/**
 * @param {string} normQ
 */
function queryHasComplianceOverlayForAgri(normQ) {
  return (
    queryHasFoodGradeComplianceCue(normQ) ||
    queryHasBioEalComplianceCue(normQ) ||
    queryHasEnviroComplianceCue(normQ)
  );
}

/**
 * @param {string} normQ
 * @param {unknown} [inputText]
 */
function isComplianceSpecialtyProductQuery(normQ, inputText) {
  const skuKeys = gatherComplianceSpecialtyProductNumberKeysFromQuery(inputText ?? normQ).keys;
  if (skuKeys.size > 0) return true;
  if (!hasStrongComplianceSpecialtyIntent(normQ)) return false;

  if (hasStrongAgriOemIntent(normQ) && !queryHasComplianceOverlayForAgri(normQ)) return false;
  if (isClearTransmissionFluidOnlyQuery(normQ) && !queryHasFoodGradeComplianceCue(normQ)) return false;
  if (isGearOilProductQuery(normQ) && !queryHasFoodGradeComplianceCue(normQ)) return false;

  if (
    isClearHydraulicFluidQuery(normQ) &&
    !queryHasBioEalComplianceCue(normQ) &&
    !queryHasEnviroComplianceCue(normQ) &&
    !queryHasFoodGradeComplianceCue(normQ)
  ) {
    return false;
  }

  if (
    normQ.includes("grease") &&
    (normQ.includes("ep 2") || normQ.includes("ep-2")) &&
    !queryHasFoodGradeComplianceCue(normQ) &&
    !normQ.includes("food grade")
  ) {
    return false;
  }

  if (hasRockDrillCue(normQ) && !isComplianceBioRockDrillQuery(normQ)) return false;

  return true;
}

/**
 * @param {string} normQ
 */
function shouldSuppressBaseHydraulicForCompliance(normQ) {
  return (
    isComplianceSpecialtyProductQuery(normQ, normQ) &&
    (normQ.includes("hydraulic") || normQ.includes(" aw") || isClearHydraulicFluidQuery(normQ)) &&
    (queryHasBioEalComplianceCue(normQ) ||
      queryHasEnviroComplianceCue(normQ) ||
      queryHasFoodGradeComplianceCue(normQ))
  );
}

/**
 * @param {import("../data/complianceSpecialtyCanonicalProductIntelligence.js").ComplianceSpecialtyCanonicalProductIntelligence} product
 * @param {string} normQ
 * @param {unknown} inputText
 */
function scoreComplianceSpecialtyCanonicalProduct(product, normQ, inputText) {
  const exact = scoreExactComplianceSpecialtyProductNumberForRow(product, inputText);
  if (exact >= COMPLIANCE_SPECIALTY_EXACT_PRODUCT_NUMBER_SCORE) {
    if (product.id.includes("bio-hees") && queryWantsHfduCompliance(normQ) && !queryWantsHeesCompliance(normQ)) {
      return 0;
    }
    if (product.id.includes("bio-hfdu") && queryWantsHeesCompliance(normQ) && !queryWantsHfduCompliance(normQ)) {
      return 0;
    }
    return exact;
  }

  if (!isComplianceSpecialtyProductQuery(normQ, inputText)) return 0;

  const family = product.productFamily || "";
  const isoGrade = parseComplianceIsoGradeFromNormQ(normQ);
  const productIso = product.isoGrade || null;

  if (product.id.includes("bio-hees") && queryWantsHfduCompliance(normQ) && !queryWantsHeesCompliance(normQ)) {
    return 0;
  }
  if (product.id.includes("bio-hfdu") && queryWantsHeesCompliance(normQ) && !queryWantsHfduCompliance(normQ)) {
    return 0;
  }

  if (isoGrade && productIso && productIso !== isoGrade) return 0;

  let score = 0;

  const productNorm = normalizeProductQuery(product.productName);
  if (productNorm.length >= 12 && normQ.includes(productNorm)) {
    score = Math.max(score, 44);
  }

  if (product.pdsMapKey) {
    const mapKeyNorm = normalizeProductQuery(product.pdsMapKey);
    if (mapKeyNorm.length >= 6 && normQ.includes(mapKeyNorm)) {
      score = Math.max(score, 34);
    }
  }

  for (const alias of product.aliases) {
    const a = normalizeProductQuery(alias);
    if (a.length < 4) continue;
    if (normQ === a) score = Math.max(score, 48);
    else if (a.length >= 12 && normQ.includes(a)) score = Math.max(score, 42);
    else if (normQ.includes(a)) score = Math.max(score, 30 + Math.min(12, a.length));
  }

  for (const kw of product.routingKeywords) {
    const k = normalizeProductQuery(kw);
    if (k.length < 4) continue;
    if (normQ.includes(k)) score = Math.max(score, 22 + Math.min(10, k.length));
  }

  if (family === "food_grade_ep2_grease") {
    if (
      queryHasFoodGradeComplianceCue(normQ) &&
      (normQ.includes("grease") || normQ.includes("ep 2") || normQ.includes("food safe grease"))
    ) {
      score = Math.max(score, 52);
    }
  }

  if (family.startsWith("food_grade_hydraulic_oil_iso")) {
    if (
      queryHasFoodGradeComplianceCue(normQ) &&
      (normQ.includes("hydraulic") || normQ.includes("food grade") || normQ.includes("food safe hydraulic"))
    ) {
      if (productIso && isoGrade === productIso) score = Math.max(score, 54);
      else if (!isoGrade) score = Math.max(score, 46);
    }
  }

  if (family.startsWith("bio_aw_hydraulic_iso")) {
    if (
      (normQ.includes("bio aw") ||
        normQ.includes("readily biodegradable") ||
        normQ.includes("oecd 301b") ||
        normQ.includes("biodegradable aw")) &&
      normQ.includes("hydraulic")
    ) {
      if (productIso && isoGrade === productIso) score = Math.max(score, 54);
      else if (!isoGrade) score = Math.max(score, 46);
    }
  }

  if (family === "bio_synthetic_blend_hydraulic_aw46") {
    if (
      normQ.includes("synthetic blend") ||
      normQ.includes("bio aw46") ||
      (normQ.includes("biodegradable") && normQ.includes("aw46")) ||
      (normQ.includes("bio synthetic") && normQ.includes("blend"))
    ) {
      score = Math.max(score, 52);
    }
  }

  if (family === "bio_hees_hydraulic_iso46") {
    if (queryWantsHeesCompliance(normQ) || (normQ.includes("eal") && normQ.includes("full synthetic"))) {
      score = Math.max(score, 52);
    }
  }

  if (family === "bio_hfdu_hydraulic_iso46") {
    if (queryWantsHfduCompliance(normQ)) {
      score = Math.max(score, 52);
    }
  }

  if (family.startsWith("bio_synthetic_eal_hydraulic_iso")) {
    if (
      normQ.includes("bio synthetic eal") ||
      normQ.includes("biosynthetic") ||
      normQ.includes("bio-synthetic") ||
      (normQ.includes("eal") && normQ.includes("hydraulic")) ||
      normQ.includes("vgp")
    ) {
      if (productIso && isoGrade === productIso) score = Math.max(score, 54);
      else if (!isoGrade) score = Math.max(score, 46);
    }
  }

  if (family.startsWith("enviro_aw_hydraulic_iso")) {
    if (
      queryHasEnviroComplianceCue(normQ) &&
      (normQ.includes("enviro aw") ||
        normQ.includes("inherently biodegradable") ||
        normQ.includes("static sheen") ||
        normQ.includes("silver bearing") ||
        (normQ.includes("zinc free") && normQ.includes("hydraulic")))
    ) {
      if (productIso && isoGrade === productIso) score = Math.max(score, 54);
      else if (!isoGrade) score = Math.max(score, 46);
    }
  }

  if (family.startsWith("enviro_mv_hydraulic_iso")) {
    if (
      queryHasEnviroComplianceCue(normQ) &&
      (normQ.includes("enviro mv") ||
        normQ.includes("multi-viscosity") ||
        normQ.includes("hvlp") ||
        normQ.includes("komatsu hm46") ||
        normQ.includes("john deere hitachi"))
    ) {
      if (productIso && isoGrade === productIso) score = Math.max(score, 54);
      else if (!isoGrade) score = Math.max(score, 46);
    }
  }

  if (family.startsWith("bio_rock_drill_oil_iso")) {
    if (isComplianceBioRockDrillQuery(normQ)) {
      if (productIso && isoGrade === productIso) score = Math.max(score, 54);
      else if (!isoGrade) score = Math.max(score, 46);
    }
  }

  if (productIso && isoGrade === productIso) score = Math.max(score, 44);

  return score;
}

/**
 * @param {string} normQ
 * @param {string} key
 */
function resolveComplianceSpecialtyFromPdsRetrievalKey(normQ, key) {
  /** @type {import("../data/complianceSpecialtyCanonicalProductIntelligence.js").ComplianceSpecialtyCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const product of listComplianceSpecialtyCanonicalProductIntelligence()) {
    if (product.pdsMapKey !== key) continue;
    const score = scoreComplianceSpecialtyCanonicalProduct(product, normQ, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = product;
    }
  }
  return best;
}

/**
 * @param {unknown} inputText
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectComplianceSpecialtyCanonicalProductEntities(inputText) {
  const { normQ } = gatherComplianceSpecialtyProductNumberKeysFromQuery(inputText);
  if (!isComplianceSpecialtyProductQuery(normQ, inputText)) return [];

  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const product of listComplianceSpecialtyCanonicalProductIntelligence()) {
    const score = scoreComplianceSpecialtyCanonicalProduct(product, normQ, inputText);
    if (score >= ENTITY_DETECT_MIN_SCORE) {
      hits.push({ id: product.id, score, label: product.productName });
    }
  }
  return hits;
}

/**
 * @param {string} normQ
 * @param {string} detectId
 */
function resolveComplianceSpecialtyCanonicalFromDetectId(normQ, detectId) {
  const id = String(detectId ?? "").trim();
  if (!id) return null;

  /** @type {import("../data/complianceSpecialtyCanonicalProductIntelligence.js").ComplianceSpecialtyCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const product of COMPLIANCE_SPECIALTY_CANONICAL_PRODUCT_INTELLIGENCE.products) {
    if (product.id !== id) continue;
    const score = scoreComplianceSpecialtyCanonicalProduct(product, normQ, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = product;
    }
  }
  if (best) return best;
  if (id.startsWith("compliance-specialty-canonical-")) {
    return getComplianceSpecialtyCanonicalProductIntelligenceById(id);
  }
  return null;
}

/**
 * @param {import("../data/complianceSpecialtyCanonicalProductIntelligence.js").ComplianceSpecialtyCanonicalProductIntelligence} product
 */
function buildEntitySectionsFromComplianceSpecialtyCanonical(product) {
  const gradeLabel = product.isoGrade
    ? `ISO VG ${product.isoGrade}`
    : product.nlgiGrade
      ? `NLGI ${product.nlgiGrade}`
      : product.viscosityGrade;
  const whatItIs = uniqStrings([
    product.productName,
    product.salesPositioning,
    product.formulation,
    product.complianceSegment ? `Compliance segment: ${product.complianceSegment}` : "",
    product.environmentalSegment ? `Environmental segment: ${product.environmentalSegment}` : "",
    product.foodGradeStatus ? `Food grade: ${product.foodGradeStatus}` : "",
    product.biodegradableStatus ? `Biodegradable: ${product.biodegradableStatus}` : "",
    product.ealStatus ? `EAL: ${product.ealStatus}` : "",
    product.fireResistantStatus ? `Fire resistant: ${product.fireResistantStatus}` : "",
    product.thickenerType ? `Thickener: ${product.thickenerType}` : "",
    product.baseOilType ? `Base oil: ${product.baseOilType}` : "",
    gradeLabel ? `${gradeLabel} — ${product.productFamily}` : product.productFamily,
  ]);
  const whyItWins = uniqStrings([
    product.salesPositioning,
    ...product.differentiators,
    ...product.salesEnablementAngles,
  ]);
  const proof = uniqStrings([
    ...product.specifications,
    ...product.approvals,
    ...product.registrations,
  ]);
  const whereFits = uniqStrings([
    ...product.applications,
    ...product.bestFit,
    ...product.crossSellSignals,
  ]);
  const repTalk = uniqStrings([product.salesPositioning, ...product.productSpotlightAngles.slice(0, 3)]);
  const questions = uniqStrings([
    ...product.customerProfileQuestions,
    ...product.customerProfileSignals.map((s) => `Customer profile signal: ${s}`),
    ...product.complianceTriggers.map((s) => `Compliance trigger: ${s}`),
    ...product.environmentalRiskSignals.map((s) => `Environmental risk signal: ${s}`),
    "What product number is on the drum or purchase order?",
  ]);
  const techLines = Object.entries(product.technicalProperties || {}).map(([k, v]) => `${k}: ${v}`);
  const confirm = uniqStrings([
    ...product.cautions,
    ...product.notBestFit.map((n) => `Not best fit: ${n}`),
    ...product.sourceNotes,
    ...product.operationalPainPoints.map((p) => `Operational pain point: ${p}`),
    product.pdsMapKey ? `Confirm the indexed row “${product.pdsMapKey}” matches the drum label before quoting.` : "",
    product.pdsFileName ? `PDS file: ${product.pdsFileName}` : "",
    ...(product.productNumbers.length ? [`Product numbers: ${product.productNumbers.join("; ")}`] : []),
    ...techLines.slice(0, 10),
  ]);

  const proofIntro = proof.length
    ? "Use indexed PDS map lines and the live PDS PDF—quote only printed spec rows."
    : "Open the current PDS PDF for authoritative proof; the map index is a pointer only.";

  return [
    narrativeSection("whatItIs", "What It Is", product.category ? String(product.category) : "", whatItIs),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : []),
    narrativeSection("pdsBackedProof", "PDS-Backed Proof", proofIntro, proof.length ? proof.slice(0, 10) : []),
    narrativeSection(
      "whereItFits",
      "Where It Fits",
      product.categorySpotlightAngles?.[0] ? String(product.categorySpotlightAngles[0]) : gradeLabel || "",
      whereFits
    ),
    narrativeSection("repTalkTrack", "Rep Talk Track", "", repTalk),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions),
    narrativeSection("confirmBeforeUse", "Confirm Before Use", "", confirm),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {string} normQ
 */
function isCoolantAntifreezeProductQuery(normQ) {
  if (normQ.includes("antifreeze") || normQ.includes("coolant")) return true;
  if (normQ.includes("dex-cool") || normQ.includes("dex cool")) return true;
  if (normQ.includes("noat") && (normQ.includes("elc") || normQ.includes("coolant") || normQ.includes("antifreeze"))) {
    return true;
  }
  if (normQ.includes("hoat") && (normQ.includes("elc") || normQ.includes("coolant") || normQ.includes("antifreeze"))) {
    return true;
  }
  if (
    normQ.includes("oat") &&
    (normQ.includes("elc") || normQ.includes("coolant") || normQ.includes("antifreeze")) &&
    !isTransmissionDrivetrainProductQuery(normQ)
  ) {
    return true;
  }
  return false;
}

/**
 * @param {string} normQ
 */
function isGreenConventionalCoolantQuery(normQ) {
  if (normQ.includes("conventional coolant") || (normQ.includes("sca") && normQ.includes("coolant"))) return true;
  if (normQ.includes("green universal") || normQ.includes("klondike green coolant")) return true;
  if (normQ.includes("green") && (normQ.includes("coolant") || normQ.includes("antifreeze"))) {
    if (normQ.includes("yellow") || normQ.includes("gold") || normQ.includes("red")) return false;
    if (normQ.includes("noat") || normQ.includes("hoat")) return false;
    if (normQ.includes("extended life") && normQ.includes("elc")) return false;
    return true;
  }
  return false;
}

/**
 * @param {string} normQ
 */
function isYellowAutomotiveOatCoolantQuery(normQ) {
  return (
    normQ.includes("yellow") &&
    (normQ.includes("oat") ||
      normQ.includes("elc") ||
      normQ.includes("automotive") ||
      normQ.includes("dex-cool") ||
      normQ.includes("coolant") ||
      normQ.includes("antifreeze"))
  );
}

/**
 * @param {string} normQ
 */
function isGoldNfOatCoolantQuery(normQ) {
  return (
    normQ.includes("all engines nf") ||
    (normQ.includes("gold") &&
      (normQ.includes("oat") || normQ.includes("elc") || normQ.includes("nf") || normQ.includes("coolant"))) ||
    (normQ.includes("nitrite free") &&
      (normQ.includes("oat") || normQ.includes("coolant") || normQ.includes("antifreeze") || normQ.includes("elc")))
  );
}

/**
 * @param {string} normQ
 */
function isRedNoatCoolantQuery(normQ) {
  return (
    (normQ.includes("red") &&
      (normQ.includes("noat") || normQ.includes("heavy duty") || normQ.includes("coolant") || normQ.includes("elc"))) ||
    (normQ.includes("noat") &&
      (normQ.includes("coolant") || normQ.includes("antifreeze") || normQ.includes("elc")) &&
      !normQ.includes("hoat") &&
      !isGoldNfOatCoolantQuery(normQ))
  );
}

/**
 * @param {string} normQ
 */
function isHoatCommercialHdCoolantQuery(normQ) {
  return (
    normQ.includes("hoat") ||
    (normQ.includes("commercial") &&
      normQ.includes("hd") &&
      (normQ.includes("coolant") || normQ.includes("antifreeze") || normQ.includes("elc")))
  );
}

/**
 * @param {string} normQ
 */
function isSpecificNamedCoolantProductQuery(normQ) {
  return (
    isGreenConventionalCoolantQuery(normQ) ||
    isYellowAutomotiveOatCoolantQuery(normQ) ||
    isGoldNfOatCoolantQuery(normQ) ||
    isRedNoatCoolantQuery(normQ) ||
    isHoatCommercialHdCoolantQuery(normQ)
  );
}

/**
 * @param {string} normQ
 */
function isCoolantCatalogQuery(normQ) {
  if (!isCoolantAntifreezeProductQuery(normQ)) return false;
  if (isSpecificNamedCoolantProductQuery(normQ)) return false;
  if (normQ.includes("what") && (normQ.includes("coolant") || normQ.includes("antifreeze"))) return true;
  if (normQ.includes("does klondike") && (normQ.includes("coolant") || normQ.includes("antifreeze"))) return true;
  if (normQ.includes("klondike carry") && (normQ.includes("coolant") || normQ.includes("antifreeze"))) return true;
  return false;
}

/**
 * @param {import("../data/coolantCanonicalProductIntelligence.js").CoolantCanonicalProductIntelligence} cool
 * @param {string} normQ
 */
function scoreCoolantCanonicalProduct(cool, normQ) {
  if (isGreaseOnlyProductQuery(normQ) && !isCoolantAntifreezeProductQuery(normQ)) return 0;
  if (isTransmissionDrivetrainProductQuery(normQ) && !isCoolantAntifreezeProductQuery(normQ)) return 0;
  if (isHdEngineOilProductQuery(normQ) && !isCoolantAntifreezeProductQuery(normQ)) return 0;
  if (!isCoolantAntifreezeProductQuery(normQ)) return 0;

  const green = isGreenConventionalCoolantQuery(normQ);
  const yellow = isYellowAutomotiveOatCoolantQuery(normQ);
  const gold = isGoldNfOatCoolantQuery(normQ);
  const red = isRedNoatCoolantQuery(normQ);
  const hoat = isHoatCommercialHdCoolantQuery(normQ);

  if (green && cool.id !== "coolant-canonical-green-universal") {
    if (cool.hierarchyBranch.includes("oat") || cool.hierarchyBranch.includes("noat") || cool.hierarchyBranch.includes("hoat")) {
      return 0;
    }
  }
  if (yellow && cool.id !== "coolant-canonical-yellow-oat-elc") return 0;
  if (gold && cool.id !== "coolant-canonical-gold-nf-oat-elc") return 0;
  if (red && cool.id !== "coolant-canonical-red-noat-elc") return 0;
  if (hoat && cool.id !== "coolant-canonical-commercial-hd-hoat-elc") return 0;

  if (!green && cool.id === "coolant-canonical-green-universal") {
    if (normQ.includes("green") && (normQ.includes("oat") || normQ.includes("elc") || normQ.includes("noat"))) return 0;
  }
  if (!yellow && cool.id === "coolant-canonical-yellow-oat-elc") return 0;
  if (!gold && cool.id === "coolant-canonical-gold-nf-oat-elc") {
    const genericExtendedLifeCoolant =
      normQ.includes("extended life") &&
      normQ.includes("coolant") &&
      !normQ.includes("gold") &&
      !normQ.includes("yellow") &&
      !normQ.includes("red") &&
      !normQ.includes("green") &&
      !hasStrongAgriOemIntent(normQ) &&
      !queryHasJohnDeereAgCue(normQ) &&
      !queryHasCnhAgCue(normQ);
    if (!genericExtendedLifeCoolant) return 0;
  }
  if (!red && cool.id === "coolant-canonical-red-noat-elc") return 0;
  if (!hoat && cool.id === "coolant-canonical-commercial-hd-hoat-elc") return 0;

  if (gold && (cool.id === "coolant-canonical-red-noat-elc" || cool.id === "coolant-canonical-yellow-oat-elc")) return 0;
  if (red && (cool.id === "coolant-canonical-gold-nf-oat-elc" || cool.id === "coolant-canonical-green-universal")) {
    if (normQ.includes("noat") || normQ.includes("red")) return 0;
  }
  if (hoat && cool.id === "coolant-canonical-red-noat-elc") return 0;
  if (red && cool.id === "coolant-canonical-commercial-hd-hoat-elc") return 0;

  let score = 0;
  const productNorm = normalizeProductQuery(cool.productName);
  if (productNorm.length >= 8 && normQ.includes(productNorm)) {
    score = Math.max(score, 42);
  }
  const mapKeyNorm = normalizeProductQuery(cool.pdsMapKey);
  if (mapKeyNorm.length >= 6 && normQ.includes(mapKeyNorm)) {
    score = Math.max(score, 40);
  }

  for (const alias of cool.aliases) {
    const a = normalizeProductQuery(alias);
    if (a.length < 3) continue;
    if (normQ === a) score = Math.max(score, 48);
    else if (a.length >= 10 && normQ.includes(a)) score = Math.max(score, 40 + Math.min(12, a.length - 8));
    else if (normQ.includes(a)) score = Math.max(score, 30 + Math.min(14, a.length));
  }

  if (cool.id === "coolant-canonical-green-universal" && green) score = Math.max(score, 50);
  if (cool.id === "coolant-canonical-yellow-oat-elc" && yellow) score = Math.max(score, 50);
  if (cool.id === "coolant-canonical-gold-nf-oat-elc" && gold) score = Math.max(score, 50);
  if (cool.id === "coolant-canonical-red-noat-elc" && red) score = Math.max(score, 50);
  if (cool.id === "coolant-canonical-commercial-hd-hoat-elc" && hoat) score = Math.max(score, 50);

  if (isCoolantCatalogQuery(normQ)) {
    if (cool.hierarchyBranch.includes("noat") || cool.hierarchyBranch.includes("hoat")) {
      score = Math.max(score, normQ.includes("hd") ? 40 : 36);
    } else if (cool.hierarchyBranch.includes("automotive")) {
      score = Math.max(score, 36);
    } else {
      score = Math.max(score, 34);
    }
  }

  if (
    normQ.includes("extended life") &&
    normQ.includes("coolant") &&
    !isSpecificNamedCoolantProductQuery(normQ) &&
    !hasStrongAgriOemIntent(normQ) &&
    !queryHasJohnDeereAgCue(normQ) &&
    !queryHasCnhAgCue(normQ)
  ) {
    if (cool.id === "coolant-canonical-gold-nf-oat-elc") {
      score = Math.max(score, 42);
    } else if (cool.hierarchyBranch.includes("oat") || cool.hierarchyBranch.includes("elc")) {
      score = Math.max(score, 32);
    }
  }

  return score;
}

/**
 * @param {string} normQ
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectCoolantCanonicalProductEntities(normQ) {
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const cool of listCoolantCanonicalProductIntelligence()) {
    const score = scoreCoolantCanonicalProduct(cool, normQ);
    if (score < ENTITY_DETECT_MIN_SCORE) continue;
    hits.push({ id: cool.id, score, label: cool.productName });
  }
  return hits;
}

/**
 * @param {string} normQ
 * @param {string} detectId
 */
function resolveCoolantCanonicalFromDetectId(normQ, detectId) {
  const id = String(detectId ?? "").trim();
  if (!id) return null;

  /** @type {import("../data/coolantCanonicalProductIntelligence.js").CoolantCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const cool of COOLANT_CANONICAL_PRODUCT_INTELLIGENCE.products) {
    if (cool.id !== id) continue;
    const score = scoreCoolantCanonicalProduct(cool, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = cool;
    }
  }
  if (best) return best;
  if (id.startsWith("coolant-canonical-")) {
    return getCoolantCanonicalProductIntelligenceById(id);
  }
  return null;
}

/**
 * @param {string} normQ
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectHydraulicCanonicalProductEntities(normQ) {
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const hydr of listHydraulicCanonicalProductIntelligence()) {
    const score = scoreHydraulicCanonicalProduct(hydr, normQ);
    if (score < ENTITY_DETECT_MIN_SCORE) continue;
    const registryId = HYDRAULIC_CANONICAL_REGISTRY_ENTITY_ID[hydr.id] || hydr.id;
    hits.push({ id: registryId, score, label: hydr.productName });
  }
  return hits;
}

/**
 * @param {string} normQ
 * @param {string} detectId
 */
function resolveHydraulicCanonicalFromDetectId(normQ, detectId) {
  const id = String(detectId ?? "").trim();
  if (!id) return null;

  /** @type {import("../data/hydraulicCanonicalProductIntelligence.js").HydraulicCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const hydr of HYDRAULIC_CANONICAL_PRODUCT_INTELLIGENCE.products) {
    const registryId = HYDRAULIC_CANONICAL_REGISTRY_ENTITY_ID[hydr.id] || hydr.id;
    if (registryId !== id && hydr.id !== id) continue;
    const score = scoreHydraulicCanonicalProduct(hydr, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = hydr;
    }
  }
  if (best) return best;
  if (id.startsWith("hydr-canonical-")) {
    return getHydraulicCanonicalProductIntelligenceById(id);
  }
  return null;
}

/**
 * @param {string} normQ
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function detectGreaseCanonicalProductEntities(normQ) {
  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [];
  for (const grease of listGreaseCanonicalProductIntelligence()) {
    const score = scoreGreaseCanonicalProduct(grease, normQ);
    if (score < ENTITY_DETECT_MIN_SCORE) continue;
    const registryId = GREASE_CANONICAL_REGISTRY_ENTITY_ID[grease.id] || grease.id;
    hits.push({ id: registryId, score, label: grease.productName });
  }
  return hits;
}

/**
 * @param {string} normQ
 * @param {string} detectId
 */
function resolveGreaseCanonicalFromDetectId(normQ, detectId) {
  const id = String(detectId ?? "").trim();
  if (!id) return null;

  /** @type {import("../data/greaseCanonicalProductIntelligence.js").GreaseCanonicalProductIntelligence | null} */
  let best = null;
  let bestScore = 0;
  for (const grease of GREASE_CANONICAL_PRODUCT_INTELLIGENCE.products) {
    const registryId = GREASE_CANONICAL_REGISTRY_ENTITY_ID[grease.id] || grease.id;
    if (registryId !== id && grease.id !== id) continue;
    const score = scoreGreaseCanonicalProduct(grease, normQ);
    if (score > bestScore) {
      bestScore = score;
      best = grease;
    }
  }
  if (best) return best;
  if (id.startsWith("grease-canonical-")) {
    return getGreaseCanonicalProductIntelligenceById(id);
  }
  return null;
}

/**
 * @param {Array<{ id: string, score: number, label: string }>} hits
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
function mergeEntityDetectionHits(hits) {
  /** @type {Map<string, { id: string, score: number, label: string }>} */
  const byId = new Map();
  for (const h of hits) {
    const prev = byId.get(h.id);
    if (!prev || h.score > prev.score) byId.set(h.id, h);
  }
  return [...byId.values()].sort((a, b) => b.score - a.score);
}

/**
 * @param {unknown} inputText
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
export function detectKlondikeProductEntity(inputText) {
  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(inputText));
  if (!normQ) return [];

  const exactGearSkuHits = detectExactGearOilProductNumberMatch(inputText);
  const exactSpecialtySkuHits = detectExactIndustrialSpecialtyOilProductNumberMatch(inputText);
  const exactAgriOemSkuHits = detectExactAgriOemProductNumberMatch(inputText);
  const exactComplianceSkuHits = detectExactComplianceSpecialtyProductNumberMatch(inputText);
  const strongAgriMatTransDriveHits = detectStrongAgriOemMatTransDriveEntityHits(inputText);

  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [
    ...exactGearSkuHits,
    ...exactSpecialtySkuHits,
    ...exactAgriOemSkuHits,
    ...exactComplianceSkuHits,
    ...strongAgriMatTransDriveHits,
    ...detectGreaseCanonicalProductEntities(normQ),
    ...detectHydraulicCanonicalProductEntities(normQ),
    ...detectHdEngineOilCanonicalProductEntities(normQ),
    ...detectTransmissionCanonicalProductEntities(normQ),
    ...detectCoolantCanonicalProductEntities(normQ),
    ...detectGearOilCanonicalProductEntities(normQ),
    ...detectIndustrialSpecialtyOilCanonicalProductEntities(normQ),
    ...detectAgriOemCanonicalProductEntities(inputText),
    ...detectComplianceSpecialtyCanonicalProductEntities(inputText),
  ];

  hits.sort((a, b) => b.score - a.score);

  const strongCanonical = hits.length > 0 && hits[0].score >= ENTITY_EXACT_MIN_SCORE;

  for (const entity of PRODUCT_ENTITY_REGISTRY) {
    const score = entity.scoreQuery(normQ);
    if (score >= ENTITY_DETECT_MIN_SCORE) {
      const existing = hits.find((h) => h.id === entity.id);
      if (existing) existing.score = Math.max(existing.score, score);
      else hits.push({ id: entity.id, score, label: entity.label });
    }
  }

  if (!strongCanonical) {
    const retrieval = searchKlondikeProducts(String(inputText ?? ""));
    const top = retrieval.matches?.[0];
    if (top?.productKey && top.score >= 14) {
      const key = String(top.productKey);
      if (isNanoGreaseQuery(normQ) && /moly/i.test(key)) {
        /* skip retrieval mis-route to Moly Tac on nano grease asks */
      } else if (isMolyGreaseQuery(normQ) && !isNanoGreaseQuery(normQ) && /nano/i.test(key) && !/moly/i.test(key)) {
        /* skip */
      } else if (isXviHydraulicQuery(normQ) && !/xvi/i.test(key)) {
        /* skip non-XVI hydraulic retrieval on XVI asks */
      } else if (isPlainUtfQuery(normQ) && /full synthetic/i.test(key)) {
        /* skip UTF Full Synthetic retrieval on plain UTF asks */
      } else if (isFa4EngineOilQuery(normQ) && !/fa[\s-]?4/i.test(key) && /10w[\s-]?30/i.test(key)) {
        /* skip CK-4 10W-30 retrieval on FA-4 asks */
      } else if (isAdvancedFormulaHdQuery(normQ) && /full synthetic/i.test(key) && /15w[\s-]?40/i.test(key)) {
        /* skip Full Synthetic retrieval on Advanced 15W-40 asks */
      } else if (isProfessionalFormulaHdQuery(normQ) && has15w40InQuery(normQ) && /advanced|full synthetic/i.test(key)) {
        /* skip Advanced/FS retrieval on Professional 15W-40 asks */
      } else if (isNaturalGasEngineOilQuery(normQ) && !/natural gas|sour|railroad|9tbn/i.test(key)) {
        /* skip diesel retrieval on NG/sour/railroad asks */
      } else if (isRailroadEngineOilQuery(normQ) && !/railroad|9tbn/i.test(key)) {
        /* skip non-railroad retrieval on railroad asks */
      } else if (isCvtTransmissionQuery(normQ) && !/cvt/i.test(key)) {
        /* skip non-CVT retrieval on CVT asks */
      } else if (isDctTransmissionQuery(normQ) && !/dual clutch|dct/i.test(key)) {
        /* skip non-DCT retrieval on DCT asks */
      } else if (isUlvAtfQuery(normQ) && !/ulv/i.test(key)) {
        /* skip non-ULV retrieval on ULV asks */
      } else if (isDexronViMerconLvQuery(normQ) && !/dexron|mercon/i.test(key)) {
        /* skip non-VI/LV retrieval on DEXRON VI asks */
      } else if (isUniversalAtfQuery(normQ) && /ulv|cvt|dual clutch|dexron vi|mercon lv/i.test(key) && !/universal/i.test(key)) {
        /* skip specialized ATF retrieval on universal ATF asks */
      } else if (isTes668Query(normQ) && !/668|syn drive/i.test(key)) {
        /* skip TES-295 retrieval on TES-668 asks */
      } else if (isTes295HdAtfQuery(normQ) && !/295|hd full synthetic atf/i.test(key) && /668|syn drive/i.test(key)) {
        /* skip TES-668 retrieval on TES-295 asks */
      } else if (isTdtoArcticQuery(normQ) && !/arctic/i.test(key)) {
        /* skip non-arctic TDTO retrieval */
      } else if (isTdtoAllSeasonQuery(normQ) && !/all season/i.test(key)) {
        /* skip non-all-season TDTO retrieval */
      } else if (isTdtoStraightGradeQuery(normQ) && /all season|arctic|multigrade/i.test(key) && !/sae grades|tdto-4 sae/i.test(key)) {
        /* skip wrong TDTO variant on straight-grade asks */
      } else if (isSynchromeshQuery(normQ) && !/synchromesh|75w-80|75w 80/i.test(key)) {
        /* skip gear oil / manual MT retrieval on synchromesh asks */
      } else if (isTypeFAtfQuery(normQ) && !/type f/i.test(key)) {
        /* skip non-Type-F retrieval */
      } else if (isMd3AtfQuery(normQ) && !/md3|dexron iii/i.test(key)) {
        /* skip non-MD3 retrieval */
      } else if (isGreenConventionalCoolantQuery(normQ) && !/green universal/i.test(key) && /oat|noat|elc/i.test(key)) {
        /* skip ELC retrieval on green conventional asks */
      } else if (isYellowAutomotiveOatCoolantQuery(normQ) && !/yellow/i.test(key)) {
        /* skip non-yellow OAT coolant retrieval */
      } else if (isGoldNfOatCoolantQuery(normQ) && !/gold/i.test(key)) {
        /* skip non-gold NF OAT retrieval */
      } else if (isRedNoatCoolantQuery(normQ) && !/red|noat/i.test(key)) {
        /* skip non-red NOAT retrieval */
      } else if (isHoatCommercialHdCoolantQuery(normQ) && !/hoat/i.test(key)) {
        /* skip non-HOAT retrieval */
      } else if (isGoldNfOatCoolantQuery(normQ) && /red|noat/i.test(key) && !/gold/i.test(key)) {
        /* skip red NOAT on gold NF asks */
      } else if (isRedNoatCoolantQuery(normQ) && /gold/i.test(key) && !/red|noat/i.test(key)) {
        /* skip gold on red NOAT asks */
      } else if (isGearOilProductQuery(normQ) && /gear/i.test(key) && isClearTransmissionFluidOnlyQuery(normQ)) {
        /* skip gear PDS retrieval on ATF/CVT/TDTO-only asks */
      } else if (queryWantsCommercial80w90(normQ) && /80w-90 gl-5 gear/i.test(key) && !/commercial gear/i.test(key)) {
        /* skip premium GL-5 retrieval on Commercial 80W-90 asks */
      } else if (has80w90GearRetrievalSkip(normQ, key)) {
        /* skip wrong 80W-90 gear variant on retrieval boost */
      } else {
        const greaseFromKey = getGreaseCanonicalProductIntelligenceByPdsKey(key);
        const hydrFromKey = getHydraulicCanonicalProductIntelligenceByPdsKey(key);
        const hdFromKey = getHdEngineOilCanonicalProductIntelligenceByPdsKey(key);
        const txFromKey = getTransmissionCanonicalProductIntelligenceByPdsKey(key);
        const coolFromKey = getCoolantCanonicalProductIntelligenceByPdsKey(key);
        const gearFromKey = resolveGearOilFromPdsRetrievalKey(normQ, key);
        if (greaseFromKey) {
          const registryId = GREASE_CANONICAL_REGISTRY_ENTITY_ID[greaseFromKey.id] || greaseFromKey.id;
          const existing = hits.find((h) => h.id === registryId);
          const boost = Math.min(72, top.score + 6);
          if (existing) existing.score = Math.max(existing.score, boost);
          else hits.push({ id: registryId, score: boost, label: greaseFromKey.productName });
        } else if (hydrFromKey) {
          const registryId = HYDRAULIC_CANONICAL_REGISTRY_ENTITY_ID[hydrFromKey.id] || hydrFromKey.id;
          const existing = hits.find((h) => h.id === registryId);
          const boost = Math.min(72, top.score + 6);
          if (existing) existing.score = Math.max(existing.score, boost);
          else hits.push({ id: registryId, score: boost, label: hydrFromKey.productName });
        } else if (hdFromKey) {
          const registryId = HD_CANONICAL_REGISTRY_ENTITY_ID[hdFromKey.id] || hdFromKey.id;
          const existing = hits.find((h) => h.id === registryId);
          const boost = Math.min(72, top.score + 6);
          if (existing) existing.score = Math.max(existing.score, boost);
          else hits.push({ id: registryId, score: boost, label: hdFromKey.productName });
        } else if (txFromKey) {
          const registryId = TRANSMISSION_CANONICAL_REGISTRY_ENTITY_ID[txFromKey.id] || txFromKey.id;
          const existing = hits.find((h) => h.id === registryId);
          const boost = Math.min(72, top.score + 6);
          if (existing) existing.score = Math.max(existing.score, boost);
          else hits.push({ id: registryId, score: boost, label: txFromKey.productName });
        } else if (coolFromKey) {
          const existing = hits.find((h) => h.id === coolFromKey.id);
          const boost = Math.min(72, top.score + 6);
          if (existing) existing.score = Math.max(existing.score, boost);
          else hits.push({ id: coolFromKey.id, score: boost, label: coolFromKey.productName });
        } else if (gearFromKey) {
          const existing = hits.find((h) => h.id === gearFromKey.id);
          const boost = Math.min(72, top.score + 6);
          if (existing) existing.score = Math.max(existing.score, boost);
          else hits.push({ id: gearFromKey.id, score: boost, label: gearFromKey.productName });
        } else {
          const specialtyFromKey = resolveIndustrialSpecialtyOilFromPdsRetrievalKey(normQ, key);
          if (specialtyFromKey) {
            const existing = hits.find((h) => h.id === specialtyFromKey.id);
            const boost = Math.min(72, top.score + 6);
            if (existing) existing.score = Math.max(existing.score, boost);
            else hits.push({ id: specialtyFromKey.id, score: boost, label: specialtyFromKey.productName });
          } else {
            const agriFromKey = resolveAgriOemFromPdsRetrievalKey(normQ, key);
            if (agriFromKey) {
              const existing = hits.find((h) => h.id === agriFromKey.id);
              const boost = Math.min(72, top.score + 6);
              if (existing) existing.score = Math.max(existing.score, boost);
              else hits.push({ id: agriFromKey.id, score: boost, label: agriFromKey.productName });
            } else {
              const complianceFromKey = resolveComplianceSpecialtyFromPdsRetrievalKey(normQ, key);
              if (complianceFromKey) {
                const existing = hits.find((h) => h.id === complianceFromKey.id);
                const boost = Math.min(72, top.score + 6);
                if (existing) existing.score = Math.max(existing.score, boost);
                else hits.push({ id: complianceFromKey.id, score: boost, label: complianceFromKey.productName });
              } else {
            for (const entity of PRODUCT_ENTITY_REGISTRY) {
              if (entity.pdsKeys.includes(key)) {
                const existing = hits.find((h) => h.id === entity.id);
                if (existing) existing.score = Math.min(72, existing.score + 10);
                else hits.push({ id: entity.id, score: Math.min(72, top.score + 8), label: entity.label });
              }
            }
            }
            }
          }
        }
      }
    }
  }

  return mergeEntityDetectionHits(hits);
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   confidence: "exact" | "likely" | "ambiguous" | "none",
 *   entityId: string | null,
 *   label: string,
 *   pdsKey: string | null,
 *   flagshipId: string | null,
 *   likelyMatches: Array<{ entityId: string | null, pdsKey: string | null, label: string, score: number }>,
 *   message: string,
 * }}
 */
export function resolveKlondikeProductEntity(inputText) {
  const question = String(inputText ?? "").trim();
  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(question));
  const empty = {
    confidence: /** @type {const} */ ("none"),
    entityId: null,
    label: "",
    pdsKey: null,
    flagshipId: null,
    likelyMatches: [],
    message: "No named Klondike product entity detected.",
  };

  if (!normQ) return empty;

  const detected = detectKlondikeProductEntity(question);
  if (!detected.length) {
    const retrieval = searchKlondikeProducts(question);
    const likelyMatches = (retrieval.matches || []).slice(0, 5).map((m) => ({
      entityId: null,
      pdsKey: m.productKey,
      label: m.productKey,
      score: m.score,
    }));
    if (likelyMatches.length) {
      return {
        confidence: "ambiguous",
        entityId: null,
        label: "",
        pdsKey: null,
        flagshipId: null,
        likelyMatches,
        message: "No explicit entity cue—indexed PDS retrieval returned possible product rows to confirm.",
      };
    }
    return empty;
  }

  const top = detected[0];
  const second = detected[1];
  const greaseCanonical = resolveGreaseCanonicalFromDetectId(normQ, top.id);
  const hydraulicCanonical = resolveHydraulicCanonicalFromDetectId(normQ, top.id);
  const hdCanonical = resolveHdEngineOilCanonicalFromDetectId(normQ, top.id);
  const transmissionCanonical = resolveTransmissionCanonicalFromDetectId(normQ, top.id);
  const coolantCanonical = resolveCoolantCanonicalFromDetectId(normQ, top.id);
  const gearOilCanonical = resolveGearOilCanonicalFromDetectId(normQ, top.id);
  const industrialSpecialtyCanonical = resolveIndustrialSpecialtyOilCanonicalFromDetectId(normQ, top.id);
  const agriOemCanonical = resolveAgriOemCanonicalFromDetectId(normQ, top.id);
  const complianceSpecialtyCanonical = resolveComplianceSpecialtyCanonicalFromDetectId(normQ, top.id);
  const entity = PRODUCT_ENTITY_REGISTRY.find((e) => e.id === top.id);
  if (
    !entity &&
    !greaseCanonical &&
    !hydraulicCanonical &&
    !hdCanonical &&
    !transmissionCanonical &&
    !coolantCanonical &&
    !gearOilCanonical &&
    !industrialSpecialtyCanonical &&
    !agriOemCanonical &&
    !complianceSpecialtyCanonical
  ) {
    return empty;
  }

  let pdsKey =
    greaseCanonical?.pdsMapKey ??
    hydraulicCanonical?.pdsMapKey ??
    hdCanonical?.pdsMapKey ??
    transmissionCanonical?.pdsMapKey ??
    coolantCanonical?.pdsMapKey ??
    gearOilCanonical?.pdsMapKey ??
    industrialSpecialtyCanonical?.pdsMapKey ??
    agriOemCanonical?.pdsMapKey ??
    complianceSpecialtyCanonical?.pdsMapKey ??
    entity?.pickPdsKey(normQ) ??
    null;
  if (!pdsKey && entity?.pdsKeys.length === 1) pdsKey = entity.pdsKeys[0];
  if (pdsKey && !PDS_MAP[pdsKey]) {
    pdsKey =
      entity?.pdsKeys.find((k) => PDS_MAP[k]) ||
      (greaseCanonical?.pdsMapKey && PDS_MAP[greaseCanonical.pdsMapKey] ? greaseCanonical.pdsMapKey : null) ||
      (hydraulicCanonical?.pdsMapKey && PDS_MAP[hydraulicCanonical.pdsMapKey]
        ? hydraulicCanonical.pdsMapKey
        : null) ||
      (hdCanonical?.pdsMapKey && PDS_MAP[hdCanonical.pdsMapKey] ? hdCanonical.pdsMapKey : null) ||
      (transmissionCanonical?.pdsMapKey && PDS_MAP[transmissionCanonical.pdsMapKey]
        ? transmissionCanonical.pdsMapKey
        : null) ||
      (coolantCanonical?.pdsMapKey && PDS_MAP[coolantCanonical.pdsMapKey] ? coolantCanonical.pdsMapKey : null) ||
      (gearOilCanonical?.pdsMapKey && PDS_MAP[gearOilCanonical.pdsMapKey] ? gearOilCanonical.pdsMapKey : null) ||
      (industrialSpecialtyCanonical?.pdsMapKey && PDS_MAP[industrialSpecialtyCanonical.pdsMapKey]
        ? industrialSpecialtyCanonical.pdsMapKey
        : null) ||
      (agriOemCanonical?.pdsMapKey && PDS_MAP[agriOemCanonical.pdsMapKey] ? agriOemCanonical.pdsMapKey : null) ||
      (complianceSpecialtyCanonical?.pdsMapKey && PDS_MAP[complianceSpecialtyCanonical.pdsMapKey]
        ? complianceSpecialtyCanonical.pdsMapKey
        : null);
  }

  const label =
    greaseCanonical?.productName ??
    hydraulicCanonical?.productName ??
    hdCanonical?.productName ??
    transmissionCanonical?.productName ??
    coolantCanonical?.productName ??
    gearOilCanonical?.productName ??
    industrialSpecialtyCanonical?.productName ??
    agriOemCanonical?.productName ??
    complianceSpecialtyCanonical?.productName ??
    entity?.label ??
    top.label;
  const flagshipId =
    (greaseCanonical && GREASE_CANONICAL_FLAGSHIP_BY_ID[greaseCanonical.id]) ||
    (hydraulicCanonical && HYDRAULIC_CANONICAL_FLAGSHIP_BY_ID[hydraulicCanonical.id]) ||
    (hdCanonical && HD_CANONICAL_FLAGSHIP_BY_ID[hdCanonical.id]) ||
    entity?.flagshipId ||
    null;

  const gap = second ? top.score - second.score : top.score;
  let confidence = /** @type {"exact" | "likely" | "ambiguous" | "none"} */ ("none");
  if (top.score >= ENTITY_EXACT_MIN_SCORE && gap >= ENTITY_AMBIGUOUS_GAP) confidence = "exact";
  else if (top.score >= ENTITY_DETECT_MIN_SCORE && gap >= ENTITY_AMBIGUOUS_GAP) confidence = "likely";
  else if (detected.length > 1 && gap < ENTITY_AMBIGUOUS_GAP) confidence = "ambiguous";
  else if (top.score >= ENTITY_DETECT_MIN_SCORE) confidence = "likely";

  if (confidence === "ambiguous" && !pdsKey) {
    const likelyMatches = mapDetectedToLikelyMatches(detected, normQ);
    return {
      confidence: "ambiguous",
      entityId: top.id,
      label,
      pdsKey: null,
      flagshipId,
      likelyMatches,
      message: "Multiple product entities or SKUs match—confirm the exact name on the PDS title block.",
    };
  }

  /** @type {Array<{ entityId: string | null, pdsKey: string | null, label: string, score: number }>} */
  const likelyMatches = mapDetectedToLikelyMatches(detected, normQ);

  return {
    confidence,
    entityId: top.id,
    label,
    pdsKey,
    flagshipId,
    likelyMatches,
    message:
      confidence === "exact"
        ? `Resolved product entity: ${label}.`
        : `Likely product entity: ${label}—confirm SKU on the PDS before customer-facing claims.`,
  };
}

/**
 * @param {Array<{ id: string, score: number, label: string }>} detected
 * @param {string} normQ
 */
function mapDetectedToLikelyMatches(detected, normQ) {
  return detected.slice(0, 5).map((d) => {
    const grease = resolveGreaseCanonicalFromDetectId(normQ, d.id);
    if (grease) {
      const key = grease.pdsMapKey;
      return {
        entityId: d.id,
        pdsKey: key && PDS_MAP[key] ? key : null,
        label: grease.productName,
        score: d.score,
      };
    }
    const hydr = resolveHydraulicCanonicalFromDetectId(normQ, d.id);
    if (hydr) {
      const key = hydr.pdsMapKey;
      return {
        entityId: d.id,
        pdsKey: key && PDS_MAP[key] ? key : null,
        label: hydr.productName,
        score: d.score,
      };
    }
    const hd = resolveHdEngineOilCanonicalFromDetectId(normQ, d.id);
    if (hd) {
      const key = hd.pdsMapKey;
      return {
        entityId: d.id,
        pdsKey: key && PDS_MAP[key] ? key : null,
        label: hd.productName,
        score: d.score,
      };
    }
    const tx = resolveTransmissionCanonicalFromDetectId(normQ, d.id);
    if (tx) {
      const key = tx.pdsMapKey;
      return {
        entityId: d.id,
        pdsKey: key && PDS_MAP[key] ? key : null,
        label: tx.productName,
        score: d.score,
      };
    }
    const cool = resolveCoolantCanonicalFromDetectId(normQ, d.id);
    if (cool) {
      const key = cool.pdsMapKey;
      return {
        entityId: d.id,
        pdsKey: key && PDS_MAP[key] ? key : null,
        label: cool.productName,
        score: d.score,
      };
    }
    const gear = resolveGearOilCanonicalFromDetectId(normQ, d.id);
    if (gear) {
      const key = gear.pdsMapKey;
      return {
        entityId: d.id,
        pdsKey: key && PDS_MAP[key] ? key : null,
        label: gear.productName,
        score: d.score,
      };
    }
    const specialty = resolveIndustrialSpecialtyOilCanonicalFromDetectId(normQ, d.id);
    if (specialty) {
      const key = specialty.pdsMapKey;
      return {
        entityId: d.id,
        pdsKey: key && PDS_MAP[key] ? key : null,
        label: specialty.productName,
        score: d.score,
      };
    }
    const agri = resolveAgriOemCanonicalFromDetectId(normQ, d.id);
    if (agri) {
      const key = agri.pdsMapKey;
      return {
        entityId: d.id,
        pdsKey: key && PDS_MAP[key] ? key : null,
        label: agri.productName,
        score: d.score,
      };
    }
    const compliance = resolveComplianceSpecialtyCanonicalFromDetectId(normQ, d.id);
    if (compliance) {
      const key = compliance.pdsMapKey;
      return {
        entityId: d.id,
        pdsKey: key && PDS_MAP[key] ? key : null,
        label: compliance.productName,
        score: d.score,
      };
    }
    const def = PRODUCT_ENTITY_REGISTRY.find((e) => e.id === d.id);
    const key = def?.pickPdsKey(normQ) || def?.pdsKeys[0] || null;
    return {
      entityId: d.id,
      pdsKey: key && PDS_MAP[key] ? key : null,
      label: d.label,
      score: d.score,
    };
  });
}

/**
 * @param {import("../data/hydraulicCanonicalProductIntelligence.js").HydraulicCanonicalProductIntelligence} hydr
 */
function buildEntitySectionsFromHydraulicCanonical(hydr) {
  const whatItIs = uniqStrings([hydr.whatItIs, hydr.hierarchyPosition]);
  const whyItWins = uniqStrings([hydr.whyItWins]);
  const proof = [...hydr.proofPoints, ...hydr.oemSpecPositioning];
  const whereFits = uniqStrings([
    ...hydr.applications,
    ...hydr.equipmentTargets,
    ...hydr.operatingConditions,
  ]);
  const repTalk = [...hydr.repTalkTrack];
  const questions = uniqStrings([
    ...hydr.customerPainSignals.map((p) => `Customer pain to probe: ${p}`),
    ...hydr.troubleshootingAssociations.map((t) => `Related troubleshooting topic: ${t}`),
    "What OEM spec string and fluid class does the equipment tag require?",
    "What duty cycle, temperature band, and drain or regrease interval apply?",
  ]);
  const confirm = uniqStrings([
    ...hydr.cautionNotes,
    ...hydr.doNotConfuseWith.map((name) => `Do not confuse with ${name}—confirm the PDS title block.`),
    hydr.pdsMapKey ? `Confirm the indexed row “${hydr.pdsMapKey}” matches the drum label before quoting.` : "",
  ]);
  if (hydr.coldStartPositioning) {
    confirm.push(hydr.coldStartPositioning);
  }
  if (hydr.chatterSuppressionPositioning) {
    confirm.push(hydr.chatterSuppressionPositioning);
  }
  confirm.push(...hydr.contaminationCavitationLogic);

  const proofIntro = proof.length
    ? "Use indexed PDS map lines and the live PDS PDF—quote only printed spec rows."
    : "Open the current PDS PDF for authoritative proof; the map index is a pointer only.";

  return [
    narrativeSection("whatItIs", "What It Is", "", whatItIs.length ? whatItIs : ["Name the product exactly as on the PDS title block, then recompose."]),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : ["Anchor wins to indexed hydraulic canonical intelligence only."]),
    narrativeSection("pdsBackedProof", "PDS-Backed Proof", proofIntro, proof.length ? proof.slice(0, 10) : []),
    narrativeSection(
      "whereItFits",
      "Where It Fits",
      hydr.categorySpotlightRole ? String(hydr.categorySpotlightRole) : "",
      whereFits
    ),
    narrativeSection("repTalkTrack", "Rep Talk Track", "", repTalk.length ? repTalk.slice(0, 8) : []),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions),
    narrativeSection("confirmBeforeUse", "Confirm Before Use", "", confirm),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {import("../data/heavyDutyEngineOilCanonicalIntelligence.js").HdEngineOilCanonicalProductIntelligence} hd
 */
function buildEntitySectionsFromHdCanonical(hd) {
  const whatItIs = uniqStrings([hd.whatItIs, hd.productPositioning, hd.viscosityPositioning]);
  const whyItWins = uniqStrings([hd.whyItWins]);
  const proof = [
    ...hd.proofPoints,
    hd.emissionsPositioning,
    hd.TBNStrategy,
    hd.OEMPositioning,
  ].filter(Boolean);
  const whereFits = uniqStrings([
    ...hd.applications,
    ...hd.industries,
    hd.severeDutyPositioning,
    hd.naturalGasPositioning,
    hd.railroadPositioning,
    hd.coldStartPositioning,
    hd.fuelEconomyPositioning,
  ]);
  const repTalk = [...hd.repTalkTrack];
  const questions = uniqStrings([
    ...hd.customerPainSignals.map((p) => `Customer pain to probe: ${p}`),
    ...hd.troubleshootingAssociations.map((t) => `Related troubleshooting topic: ${t}`),
    "What API category and SAE grade does the engine nameplate require?",
    "Is this CK-4 diesel, FA-4, natural gas, railroad zinc-free, or legacy CF family?",
  ]);
  const confirm = uniqStrings([
    ...hd.cautionNotes,
    ...hd.doNotConfuseWith.map((name) => `Do not confuse with ${name}—confirm the PDS title block.`),
    hd.pdsMapKey ? `Confirm the indexed row “${hd.pdsMapKey}” matches the drum label before quoting.` : "",
    hd.catalystCompatibility,
  ]);

  const proofIntro = proof.length
    ? "Use indexed PDS map lines and the live PDS PDF—quote only printed spec rows."
    : "Open the current PDS PDF for authoritative proof; the map index is a pointer only.";

  return [
    narrativeSection("whatItIs", "What It Is", "", whatItIs.length ? whatItIs : ["Name the product exactly as on the PDS title block, then recompose."]),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : ["Anchor wins to indexed HD engine oil canonical intelligence only."]),
    narrativeSection("pdsBackedProof", "PDS-Backed Proof", proofIntro, proof.length ? proof.slice(0, 10) : []),
    narrativeSection(
      "whereItFits",
      "Where It Fits",
      hd.categorySpotlightRole ? String(hd.categorySpotlightRole) : "",
      whereFits
    ),
    narrativeSection("repTalkTrack", "Rep Talk Track", "", repTalk.length ? repTalk.slice(0, 8) : []),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions),
    narrativeSection("confirmBeforeUse", "Confirm Before Use", "", confirm),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {import("../data/gearOilCanonicalProductIntelligence.js").GearOilCanonicalProductIntelligence} gear
 */
function buildEntitySectionsFromGearOilCanonical(gear) {
  const gradeLabel = gear.saeGrade
    ? `SAE ${gear.saeGrade}`
    : gear.isoGrade
      ? `ISO VG ${gear.isoGrade}`
      : gear.viscosityGrade;
  const whatItIs = uniqStrings([
    gear.productName,
    gear.salesPositioning,
    gear.formulation,
    gradeLabel ? `${gradeLabel} — ${gear.productFamily}` : gear.productFamily,
    gear.marketSegment ? `Market segment: ${gear.marketSegment}` : "",
  ]);
  const whyItWins = uniqStrings([gear.salesPositioning, ...gear.differentiators]);
  const proof = uniqStrings([...gear.specifications, ...gear.approvals]);
  const whereFits = uniqStrings([...gear.applications, ...gear.bestFit]);
  const repTalk = gear.salesPositioning ? [gear.salesPositioning] : [];
  const questions = uniqStrings([
    "What SAE or ISO VG grade does the nameplate require?",
    "Is this hypoid axle/differential GL-5/MT-1 or enclosed industrial EP gear service?",
    "Is limited-slip chemistry required, and is the system GL-4-only?",
    "What product number is on the drum or purchase order?",
  ]);
  const techLines = Object.entries(gear.technicalProperties || {}).map(([k, v]) => `${k}: ${v}`);
  const confirm = uniqStrings([
    ...gear.cautions,
    ...gear.notBestFit.map((n) => `Not best fit: ${n}`),
    ...gear.sourceNotes,
    gear.pdsMapKey ? `Confirm the indexed row “${gear.pdsMapKey}” matches the drum label before quoting.` : "",
    ...(gear.productNumbers.length ? [`Product numbers: ${gear.productNumbers.join("; ")}`] : []),
    ...techLines.slice(0, 8),
  ]);

  const proofIntro = proof.length
    ? "Use indexed PDS map lines and the live PDS PDF—quote only printed spec rows."
    : "Open the current PDS PDF for authoritative proof; the map index is a pointer only.";

  return [
    narrativeSection("whatItIs", "What It Is", gear.category ? String(gear.category) : "", whatItIs.length ? whatItIs : []),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : ["Anchor wins to indexed gear oil canonical intelligence only."]),
    narrativeSection("pdsBackedProof", "PDS-Backed Proof", proofIntro, proof.length ? proof.slice(0, 10) : []),
    narrativeSection("whereItFits", "Where It Fits", gradeLabel || "", whereFits),
    narrativeSection("repTalkTrack", "Rep Talk Track", "", repTalk),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions),
    narrativeSection("confirmBeforeUse", "Confirm Before Use", "", confirm),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {import("../data/coolantCanonicalProductIntelligence.js").CoolantCanonicalProductIntelligence} cool
 */
function buildEntitySectionsFromCoolantCanonical(cool) {
  const whatItIs = uniqStrings([cool.whatItIs, cool.productPositioning, cool.coolantTechnology]);
  const whyItWins = uniqStrings([cool.whyItWins]);
  const proof = [
    ...cool.proofPoints,
    cool.OEMPositioning,
    cool.nitriteStrategy,
    cool.SCARequirement,
  ].filter(Boolean);
  const whereFits = uniqStrings([
    ...cool.applications,
    ...cool.industries,
    cool.extendedLifePositioning,
    cool.mixedFleetPositioning,
    cool.cavitationProtection,
  ]);
  const repTalk = [...cool.repTalkTrack];
  const questions = uniqStrings([
    ...cool.customerPainSignals.map((p) => `Customer pain to probe: ${p}`),
    ...cool.troubleshootingAssociations.map((t) => `Related troubleshooting topic: ${t}`),
    "What OEM coolant chemistry does the radiator tag require (OAT, NOAT, HOAT, conventional)?",
    "Is nitrite required for wet-sleeve cavitation, or is nitrite-free OAT allowed?",
    "What colour and brand are in the system today before top-off or flush?",
  ]);
  const confirm = uniqStrings([
    ...cool.cautionNotes,
    ...cool.doNotConfuseWith.map((name) => `Do not confuse with ${name}—confirm the PDS title block.`),
    cool.pdsMapKey ? `Confirm the indexed row “${cool.pdsMapKey}” matches the drum label before quoting.` : "",
    cool.topOffCompatibility,
    cool.maintenanceStrategy,
  ]);

  const proofIntro = proof.length
    ? "Use indexed PDS map lines and the live PDS PDF—quote only printed spec rows."
    : "Open the current PDS PDF for authoritative proof; the map index is a pointer only.";

  return [
    narrativeSection("whatItIs", "What It Is", "", whatItIs.length ? whatItIs : ["Name the product exactly as on the PDS title block, then recompose."]),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : ["Anchor wins to indexed coolant canonical intelligence only."]),
    narrativeSection("pdsBackedProof", "PDS-Backed Proof", proofIntro, proof.length ? proof.slice(0, 10) : []),
    narrativeSection(
      "whereItFits",
      "Where It Fits",
      cool.categorySpotlightRole ? String(cool.categorySpotlightRole) : "",
      whereFits
    ),
    narrativeSection("repTalkTrack", "Rep Talk Track", "", repTalk.length ? repTalk.slice(0, 8) : []),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions),
    narrativeSection("confirmBeforeUse", "Confirm Before Use", "", confirm),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {import("../data/transmissionCanonicalProductIntelligence.js").TransmissionCanonicalProductIntelligence} tx
 */
function buildEntitySectionsFromTransmissionCanonical(tx) {
  const whatItIs = uniqStrings([tx.whatItIs, tx.productPositioning, tx.transmissionType]);
  const whyItWins = uniqStrings([tx.whyItWins]);
  const proof = [
    ...tx.proofPoints,
    tx.frictionStrategy,
    tx.OEMPositioning,
  ].filter(Boolean);
  const whereFits = uniqStrings([
    ...tx.applications,
    ...tx.industries,
    tx.severeDutyPositioning,
    tx.fuelEconomyPositioning,
    tx.coldTemperaturePositioning,
    tx.wetBrakePositioning,
    tx.powershiftPositioning,
  ]);
  const repTalk = [...tx.repTalkTrack];
  const questions = uniqStrings([
    ...tx.customerPainSignals.map((p) => `Customer pain to probe: ${p}`),
    ...tx.troubleshootingAssociations.map((t) => `Related troubleshooting topic: ${t}`),
    "What OEM spec string does the transmission or drivetrain tag require?",
    "Is this stepped ATF, CVT, DCT, ULV, TO-4 TDTO, or manual/synchromesh chemistry?",
  ]);
  const confirm = uniqStrings([
    ...tx.cautionNotes,
    ...tx.doNotConfuseWith.map((name) => `Do not confuse with ${name}—confirm the PDS title block.`),
    tx.pdsMapKey ? `Confirm the indexed row “${tx.pdsMapKey}” matches the drum label before quoting.` : "",
    tx.antiShudderPositioning,
  ]);

  const proofIntro = proof.length
    ? "Use indexed PDS map lines and the live PDS PDF—quote only printed spec rows."
    : "Open the current PDS PDF for authoritative proof; the map index is a pointer only.";

  return [
    narrativeSection("whatItIs", "What It Is", "", whatItIs.length ? whatItIs : ["Name the product exactly as on the PDS title block, then recompose."]),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : ["Anchor wins to indexed transmission canonical intelligence only."]),
    narrativeSection("pdsBackedProof", "PDS-Backed Proof", proofIntro, proof.length ? proof.slice(0, 10) : []),
    narrativeSection(
      "whereItFits",
      "Where It Fits",
      tx.categorySpotlightRole ? String(tx.categorySpotlightRole) : "",
      whereFits
    ),
    narrativeSection("repTalkTrack", "Rep Talk Track", "", repTalk.length ? repTalk.slice(0, 8) : []),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions),
    narrativeSection("confirmBeforeUse", "Confirm Before Use", "", confirm),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {import("../data/greaseCanonicalProductIntelligence.js").GreaseCanonicalProductIntelligence} grease
 */
function buildEntitySectionsFromGreaseCanonical(grease) {
  const whatItIs = uniqStrings([grease.whatItIs, grease.productPositioning]);
  const whyItWins = uniqStrings([grease.whyItWins]);
  const proof = [...grease.pdsProofPoints];
  const whereFits = uniqStrings([
    ...grease.applications,
    ...grease.equipmentTargets,
    ...grease.operatingConditions,
  ]);
  const repTalk = [...grease.repTalkTrack];
  const questions = uniqStrings([
    ...grease.customerPainSignals.map((p) => `Customer pain to probe: ${p}`),
    "What NLGI grade and thickener class does the OEM chart require?",
    "What duty cycle, temperature band, and regrease interval apply?",
  ]);
  const confirm = uniqStrings([
    ...grease.cautionNotes,
    ...grease.doNotConfuseWith.map((name) => `Do not confuse with ${name}—confirm the PDS title block.`),
    grease.pdsMapKey ? `Confirm the indexed row “${grease.pdsMapKey}” matches the drum label before quoting.` : "",
  ]);
  const proofIntro = proof.length
    ? "Use indexed PDS map lines and the live PDS PDF—quote only printed spec rows."
    : "Open the current PDS PDF for authoritative proof; the map index is a pointer only.";

  return [
    narrativeSection("whatItIs", "What It Is", "", whatItIs.length ? whatItIs : ["Name the product exactly as on the PDS title block, then recompose."]),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : ["Anchor wins to indexed PDS grease intelligence only."]),
    narrativeSection("pdsBackedProof", "PDS-Backed Proof", proofIntro, proof.length ? proof.slice(0, 10) : []),
    narrativeSection("whereItFits", "Where It Fits", grease.greaseFamily ? String(grease.greaseFamily) : "", whereFits),
    narrativeSection("repTalkTrack", "Rep Talk Track", "", repTalk.length ? repTalk.slice(0, 8) : []),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions),
    narrativeSection("confirmBeforeUse", "Confirm Before Use", "", confirm),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative | null} flagship
 * @param {string | null} pdsKey
 * @param {Record<string, unknown> | null} pdsRow
 */
function buildEntitySectionsFromSources(flagship, pdsKey, pdsRow) {
  const nanoIntel = flagship && isNanoEp2FlagshipId(flagship.id) ? NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE : null;

  const whatItIs = nanoIntel
    ? uniqStrings([nanoIntel.whatItIsIntro, ...nanoIntel.whatItIsDetails])
    : uniqStrings([
        flagship?.fieldIdentity,
        flagship?.flagshipPositioning,
        pdsRow?.why ? String(pdsRow.why) : "",
      ]).filter(Boolean);

  const whyItWins = nanoIntel
    ? uniqStrings([nanoIntel.whyItWins, ...nanoIntel.keyDifferentiators])
    : uniqStrings([
        flagship?.whyItWins,
        ...(flagship?.whatMakesThisDifferent || []).map(String),
        ...(flagship?.keyDifferentiators || []).map(String),
      ]).filter(Boolean);

  const proof = nanoIntel
    ? [...nanoIntel.premiumProofPoints]
    : uniqStrings([...(flagship?.premiumProofPoints || []).map(String), ...(Array.isArray(pdsRow?.specs) ? pdsRow.specs.map(String) : [])]);

  const whereFits = nanoIntel
    ? [...nanoIntel.severeDutyUseCases]
    : uniqStrings([...(flagship?.severeDutyUseCases || []).map(String)]);

  const repTalk = nanoIntel
    ? [...nanoIntel.repTalkTrack]
    : uniqStrings([...(flagship?.repTalkTrack || []).map(String)]);

  const questions = nanoIntel
    ? [...nanoIntel.questionsToAsk]
    : uniqStrings([
        "What OEM spec string and equipment nameplate fluid class are they running today?",
        "What duty cycle, temperature band, and drain or regrease interval apply?",
      ]);

  const confirm = nanoIntel
    ? uniqStrings([...nanoIntel.confirmBeforeUse, ...nanoIntel.doNotSay])
    : uniqStrings([
        ...(flagship?.doNotSay || []).map(String),
        "Verify every customer-facing claim on the live PDS revision.",
        pdsKey ? `Confirm the indexed row “${pdsKey}” matches the drum label before quoting.` : "",
      ]);

  const proofIntro = proof.length
    ? "Use indexed PDS map lines and the live PDS PDF—quote only printed spec rows."
    : "Open the current PDS PDF for authoritative proof; the map index is a pointer only.";

  return [
    narrativeSection("whatItIs", "What It Is", "", whatItIs.length ? whatItIs : ["Name the product exactly as on the PDS title block, then recompose."]),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : ["Anchor wins to indexed PDS and flagship narrative fields only."]),
    narrativeSection("pdsBackedProof", "PDS-Backed Proof", proofIntro, proof.length ? proof.slice(0, 10) : []),
    narrativeSection("whereItFits", "Where It Fits", flagship?.fieldIdentity ? String(flagship.fieldIdentity) : "", whereFits),
    narrativeSection("repTalkTrack", "Rep Talk Track", "", repTalk.length ? repTalk.slice(0, 8) : []),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions),
    narrativeSection("confirmBeforeUse", "Confirm Before Use", "", confirm),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   title: string,
 *   directAnswer: string,
 *   sections: Array<{ id: string, title: string, body?: string, items?: string[] }>,
 *   followUpQuestions: string[],
 *   sourceBadges: string[],
 *   cautionNotes: string[],
 *   matchedProducts: Array<{ productKey: string, label: string, score: number, source: string }>,
 *   message?: string,
 * }}
 */
export function buildProductEntityAdvisorResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const empty = {
    ok: false,
    title: "Klondike product",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: ["Product entity resolver", "PDS map index"],
    cautionNotes: ["Do not quote specs or positioning beyond indexed PDS map rows and flagship narrative text."],
    matchedProducts: [],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      directAnswer: "Ask using a KLONDIKE product name or counter shorthand (e.g. Nano EP 2, XVI hydraulic, UTF, Moly Tac EP-2).",
      message: "Empty query.",
    };
  }

  const resolved = resolveKlondikeProductEntity(question);

  if (resolved.confidence === "none" || resolved.confidence === "ambiguous") {
    const retrieval = searchKlondikeProducts(question);
    const matchedProducts = (retrieval.matches || []).slice(0, 8).map((m) => ({
      productKey: m.productKey,
      label: m.productKey,
      score: m.score,
      source: "pds_map_retrieval",
    }));

    const names = matchedProducts.map((m) => m.label).filter(Boolean);
    return {
      ...empty,
      title: "Klondike product — confirm name",
      directAnswer:
        resolved.message ||
        (names.length
          ? `Several indexed products may apply (${names.slice(0, 4).join("; ")}). Confirm the exact PDS product title before routing to category logic.`
          : "Could not anchor a named product—try the full name as printed on the PDS or price sheet."),
      followUpQuestions: [
        "What is the exact product name on the PDS title block?",
        "Is this the flagship spotlight SKU or a standard catalog row?",
        ...(resolved.likelyMatches.length
          ? resolved.likelyMatches.slice(0, 3).map((m) => `Did you mean ${m.label}?`)
          : []),
      ],
      matchedProducts,
      message: resolved.message || "ambiguous_or_none",
    };
  }

  const flagship = resolved.flagshipId ? getSalesEnablementFlagshipNarrativeById(resolved.flagshipId) : null;
  const pdsKey = resolved.pdsKey;
  const pdsRow = pdsKey && PDS_MAP[pdsKey] ? PDS_MAP[pdsKey] : null;
  const greaseCanonical = pdsKey ? getGreaseCanonicalProductIntelligenceByPdsKey(pdsKey) : null;
  const hydraulicCanonical = pdsKey ? getHydraulicCanonicalProductIntelligenceByPdsKey(pdsKey) : null;
  const hdCanonical = pdsKey ? getHdEngineOilCanonicalProductIntelligenceByPdsKey(pdsKey) : null;
  const transmissionCanonical = pdsKey ? getTransmissionCanonicalProductIntelligenceByPdsKey(pdsKey) : null;
  const coolantCanonical = pdsKey ? getCoolantCanonicalProductIntelligenceByPdsKey(pdsKey) : null;
  const gearOilCanonical = resolveGearOilCanonicalFromDetectId(
    relaxNormalizedProductQuery(normalizeProductQuery(question)),
    resolved.entityId || ""
  );
  const industrialSpecialtyCanonical = resolveIndustrialSpecialtyOilCanonicalFromDetectId(
    relaxNormalizedProductQuery(normalizeProductQuery(question)),
    resolved.entityId || ""
  );
  const agriOemCanonical = resolveAgriOemCanonicalFromDetectId(
    relaxNormalizedProductQuery(normalizeProductQuery(question)),
    resolved.entityId || ""
  );
  const complianceSpecialtyCanonical = resolveComplianceSpecialtyCanonicalFromDetectId(
    relaxNormalizedProductQuery(normalizeProductQuery(question)),
    resolved.entityId || ""
  );

  if (resolved.entityId === "entity-deep-well-pump-oil") {
    const matchedProducts = (searchKlondikeProducts(question).matches || []).slice(0, 6).map((m) => ({
      productKey: m.productKey,
      label: m.productKey,
      score: m.score,
      source: "pds_map_retrieval",
    }));
    return {
      ok: true,
      title: "Deep Well Pump Oil — confirm indexed row",
      directAnswer:
        "Deep Well Pump Oil is a named application in KLONDIKE field vocabulary, but no dedicated PDS map row was found in the current index. Confirm whether the customer means well or pump-jack service versus a general drip-feed lubricator, then match an indexed SKU from retrieval or technical.",
      sections: [
        narrativeSection(
          "whatItIs",
          "What It Is",
          "Application-specific drip-feed or vertical turbine / pump-jack lubrication—not a single ASTM class without the equipment tag.",
          []
        ),
        narrativeSection(
          "confirmBeforeUse",
          "Confirm Before Use",
          "",
          [
            "Confirm OEM viscosity and service type before recommending any indexed oil row.",
            "Do not assume Deep Well Pump Oil interchange with hydraulic AW or general bearing oils.",
          ]
        ),
      ],
      followUpQuestions: [
        "Is this well / pump-jack service or an industrial drip-feed lubricator?",
        "What viscosity and OEM spec string does the equipment tag show?",
      ],
      sourceBadges: ["Product entity resolver", "Field vocabulary", "PDS map retrieval"],
      cautionNotes: ["No dedicated Deep Well Pump Oil PDS row in the current map index—confirm SKU with technical."],
      matchedProducts,
      message: "deep_well_unindexed",
    };
  }

  if (
    !flagship &&
    !pdsRow &&
    !greaseCanonical &&
    !hydraulicCanonical &&
    !hdCanonical &&
    !transmissionCanonical &&
    !coolantCanonical &&
    !gearOilCanonical &&
    !industrialSpecialtyCanonical &&
    !agriOemCanonical &&
    !complianceSpecialtyCanonical
  ) {
    return {
      ...empty,
      title: resolved.label || "Klondike product",
      directAnswer: `Detected “${resolved.label}” but neither flagship narrative nor PDS map row resolved. ${resolved.message}`,
      matchedProducts: resolved.likelyMatches
        .filter((m) => m.pdsKey)
        .map((m) => ({
          productKey: String(m.pdsKey),
          label: String(m.label),
          score: m.score,
          source: "entity_resolver",
        })),
      message: "entity_without_anchor",
    };
  }

  const nanoIntel =
    !greaseCanonical &&
    !hydraulicCanonical &&
    !hdCanonical &&
    !transmissionCanonical &&
    !coolantCanonical &&
    !gearOilCanonical &&
    !industrialSpecialtyCanonical &&
    !agriOemCanonical &&
    !complianceSpecialtyCanonical &&
    flagship &&
    isNanoEp2FlagshipId(flagship.id)
      ? NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE
      : null;
  const titleLabel =
    greaseCanonical?.productName ||
    hydraulicCanonical?.productName ||
    hdCanonical?.productName ||
    transmissionCanonical?.productName ||
    coolantCanonical?.productName ||
    gearOilCanonical?.productName ||
    industrialSpecialtyCanonical?.productName ||
    agriOemCanonical?.productName ||
    complianceSpecialtyCanonical?.productName ||
    nanoIntel?.canonicalProductLabel ||
    flagship?.productName ||
    pdsKey ||
    resolved.label;

  const directAnswer = greaseCanonical
    ? greaseCanonical.whyItWins
    : hydraulicCanonical
      ? hydraulicCanonical.whyItWins
      : hdCanonical
        ? hdCanonical.whyItWins
        : transmissionCanonical
          ? transmissionCanonical.whyItWins
          : coolantCanonical
            ? coolantCanonical.whyItWins
            : gearOilCanonical
              ? gearOilCanonical.salesPositioning
              : industrialSpecialtyCanonical
                ? industrialSpecialtyCanonical.salesPositioning
                : agriOemCanonical
                  ? agriOemCanonical.salesPositioning
                  : complianceSpecialtyCanonical
                    ? complianceSpecialtyCanonical.salesPositioning
                    : nanoIntel
                      ? nanoIntel.whyItWins
                      : flagship?.whyItWins ||
                        (pdsRow?.why ? String(pdsRow.why) : "") ||
                        `Product-first coaching for ${titleLabel}—ground claims on the indexed PDS map row and live PDS revision.`;

  const sections = greaseCanonical
    ? buildEntitySectionsFromGreaseCanonical(greaseCanonical)
    : hydraulicCanonical
      ? buildEntitySectionsFromHydraulicCanonical(hydraulicCanonical)
      : hdCanonical
        ? buildEntitySectionsFromHdCanonical(hdCanonical)
        : transmissionCanonical
          ? buildEntitySectionsFromTransmissionCanonical(transmissionCanonical)
          : coolantCanonical
            ? buildEntitySectionsFromCoolantCanonical(coolantCanonical)
            : gearOilCanonical
              ? buildEntitySectionsFromGearOilCanonical(gearOilCanonical)
              : industrialSpecialtyCanonical
                ? buildEntitySectionsFromIndustrialSpecialtyOilCanonical(industrialSpecialtyCanonical)
                : agriOemCanonical
                  ? buildEntitySectionsFromAgriOemCanonical(agriOemCanonical)
                  : complianceSpecialtyCanonical
                    ? buildEntitySectionsFromComplianceSpecialtyCanonical(complianceSpecialtyCanonical)
                    : buildEntitySectionsFromSources(flagship, pdsKey, pdsRow);
  const followUpQuestions = sections.find((s) => s.id === "questionsToAsk")?.items || [];
  const cautionNotes =
    greaseCanonical?.cautionNotes?.length
      ? uniqStrings([...greaseCanonical.cautionNotes, ...(sections.find((s) => s.id === "confirmBeforeUse")?.items || [])])
      : hydraulicCanonical?.cautionNotes?.length
        ? uniqStrings([
            ...hydraulicCanonical.cautionNotes,
            ...(sections.find((s) => s.id === "confirmBeforeUse")?.items || []),
          ])
        : hdCanonical?.cautionNotes?.length
          ? uniqStrings([
              ...hdCanonical.cautionNotes,
              ...(sections.find((s) => s.id === "confirmBeforeUse")?.items || []),
            ])
          : transmissionCanonical?.cautionNotes?.length
            ? uniqStrings([
                ...transmissionCanonical.cautionNotes,
                ...(sections.find((s) => s.id === "confirmBeforeUse")?.items || []),
              ])
            : coolantCanonical?.cautionNotes?.length
              ? uniqStrings([
                  ...coolantCanonical.cautionNotes,
                  ...(sections.find((s) => s.id === "confirmBeforeUse")?.items || []),
                ])
              : gearOilCanonical?.cautions?.length
                ? uniqStrings([
                    ...gearOilCanonical.cautions,
                    ...(sections.find((s) => s.id === "confirmBeforeUse")?.items || []),
                  ])
                : industrialSpecialtyCanonical?.cautions?.length
                  ? uniqStrings([
                      ...industrialSpecialtyCanonical.cautions,
                      ...(sections.find((s) => s.id === "confirmBeforeUse")?.items || []),
                    ])
                  : agriOemCanonical?.cautions?.length
                    ? uniqStrings([
                        ...agriOemCanonical.cautions,
                        ...(sections.find((s) => s.id === "confirmBeforeUse")?.items || []),
                      ])
                    : complianceSpecialtyCanonical?.cautions?.length
                      ? uniqStrings([
                          ...complianceSpecialtyCanonical.cautions,
                          ...(sections.find((s) => s.id === "confirmBeforeUse")?.items || []),
                        ])
                      : sections.find((s) => s.id === "confirmBeforeUse")?.items || empty.cautionNotes;

  /** @type {string[]} */
  const sourceBadges = ["Product entity resolver", "PDS map index"];
  if (greaseCanonical) sourceBadges.push("Grease canonical product intelligence");
  if (hydraulicCanonical) sourceBadges.push("Hydraulic canonical product intelligence");
  if (hdCanonical) sourceBadges.push("HD engine oil canonical product intelligence");
  if (transmissionCanonical) sourceBadges.push("Transmission canonical product intelligence");
  if (coolantCanonical) sourceBadges.push("Coolant canonical product intelligence");
  if (gearOilCanonical) sourceBadges.push("Gear oil canonical product intelligence");
  if (industrialSpecialtyCanonical) {
    sourceBadges.push("Industrial specialty oil canonical product intelligence");
  }
  if (agriOemCanonical) {
    sourceBadges.push("Ag OEM canonical product intelligence");
  }
  if (complianceSpecialtyCanonical) {
    sourceBadges.push("Compliance specialty canonical product intelligence");
  }
  if (flagship) sourceBadges.push("Flagship product intelligence");
  if (nanoIntel) sourceBadges.push("Nano EP 2 canonical intelligence");

  const matchedProducts = [
    ...(pdsKey
      ? [{ productKey: pdsKey, label: pdsKey, score: resolved.likelyMatches[0]?.score || 40, source: "pds_map" }]
      : []),
    ...(flagship
      ? [
          {
            productKey: flagship.id,
            label: flagship.productName,
            score: resolved.likelyMatches[0]?.score || 40,
            source: "flagship_narrative",
          },
        ]
      : []),
  ];

  return {
    ok: true,
    title: `${titleLabel} — product entity`,
    directAnswer: String(directAnswer).slice(0, 1200),
    sections,
    followUpQuestions: Array.isArray(followUpQuestions) ? followUpQuestions.map(String) : [],
    sourceBadges: uniqStrings(sourceBadges),
    cautionNotes: Array.isArray(cautionNotes) ? cautionNotes.map(String) : [],
    matchedProducts,
    message: resolved.message,
  };
}
