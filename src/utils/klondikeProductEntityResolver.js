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
import { normalizeProductQuery, searchKlondikeProducts } from "./klondikeProductRetrievalHelpers.js";

const ENTITY_EXACT_MIN_SCORE = 34;
const ENTITY_DETECT_MIN_SCORE = 14;
const ENTITY_AMBIGUOUS_GAP = 6;

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
    .replace(/\b75w90\b/g, "75w 90");
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
function scoreGreaseCanonicalProduct(grease, normQ) {
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
  if (!gold && cool.id === "coolant-canonical-gold-nf-oat-elc") return 0;
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
 * @param {unknown} inputText
 * @returns {Array<{ id: string, score: number, label: string }>}
 */
export function detectKlondikeProductEntity(inputText) {
  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(inputText));
  if (!normQ) return [];

  /** @type {Array<{ id: string, score: number, label: string }>} */
  const hits = [
    ...detectGreaseCanonicalProductEntities(normQ),
    ...detectHydraulicCanonicalProductEntities(normQ),
    ...detectHdEngineOilCanonicalProductEntities(normQ),
    ...detectTransmissionCanonicalProductEntities(normQ),
    ...detectCoolantCanonicalProductEntities(normQ),
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
      } else {
        const greaseFromKey = getGreaseCanonicalProductIntelligenceByPdsKey(key);
        const hydrFromKey = getHydraulicCanonicalProductIntelligenceByPdsKey(key);
        const hdFromKey = getHdEngineOilCanonicalProductIntelligenceByPdsKey(key);
        const txFromKey = getTransmissionCanonicalProductIntelligenceByPdsKey(key);
        const coolFromKey = getCoolantCanonicalProductIntelligenceByPdsKey(key);
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

  hits.sort((a, b) => b.score - a.score);
  return hits;
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
  const entity = PRODUCT_ENTITY_REGISTRY.find((e) => e.id === top.id);
  if (!entity && !greaseCanonical && !hydraulicCanonical && !hdCanonical && !transmissionCanonical && !coolantCanonical) {
    return empty;
  }

  let pdsKey =
    greaseCanonical?.pdsMapKey ??
    hydraulicCanonical?.pdsMapKey ??
    hdCanonical?.pdsMapKey ??
    transmissionCanonical?.pdsMapKey ??
    coolantCanonical?.pdsMapKey ??
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
      (coolantCanonical?.pdsMapKey && PDS_MAP[coolantCanonical.pdsMapKey] ? coolantCanonical.pdsMapKey : null);
  }

  const label =
    greaseCanonical?.productName ??
    hydraulicCanonical?.productName ??
    hdCanonical?.productName ??
    transmissionCanonical?.productName ??
    coolantCanonical?.productName ??
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

  if (!flagship && !pdsRow && !greaseCanonical && !hydraulicCanonical && !hdCanonical && !transmissionCanonical && !coolantCanonical) {
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
              : sections.find((s) => s.id === "confirmBeforeUse")?.items || empty.cautionNotes;

  /** @type {string[]} */
  const sourceBadges = ["Product entity resolver", "PDS map index"];
  if (greaseCanonical) sourceBadges.push("Grease canonical product intelligence");
  if (hydraulicCanonical) sourceBadges.push("Hydraulic canonical product intelligence");
  if (hdCanonical) sourceBadges.push("HD engine oil canonical product intelligence");
  if (transmissionCanonical) sourceBadges.push("Transmission canonical product intelligence");
  if (coolantCanonical) sourceBadges.push("Coolant canonical product intelligence");
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
