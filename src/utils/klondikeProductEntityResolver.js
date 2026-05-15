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
      if (normQ.includes("xvi") && normQ.includes("hydraulic")) return 46;
      if (/\bxvi\b/.test(normQ)) return 40;
      if (normQ.includes("xvi all season")) return 44;
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
      if (normQ.includes("utf") && normQ.includes("full synthetic")) return 44;
      if (normQ.includes("universal tractor fluid") && normQ.includes("full synthetic")) return 46;
      if (normQ === "utf" || normQ.includes(" klondike utf")) return 28;
      if (normQ.includes("universal tractor fluid") && !normQ.includes("synthetic")) return 24;
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
      if (normQ.includes("wet brake")) return 42;
      if (normQ.includes("wet brake fluid")) return 46;
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
    .replace(/\b5w40\b/g, "5w 40");
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
  const hits = [...detectGreaseCanonicalProductEntities(normQ)];

  const strongGreaseCanonical = hits.length > 0 && hits[0].score >= ENTITY_EXACT_MIN_SCORE;

  for (const entity of PRODUCT_ENTITY_REGISTRY) {
    const score = entity.scoreQuery(normQ);
    if (score >= ENTITY_DETECT_MIN_SCORE) {
      const existing = hits.find((h) => h.id === entity.id);
      if (existing) existing.score = Math.max(existing.score, score);
      else hits.push({ id: entity.id, score, label: entity.label });
    }
  }

  if (!strongGreaseCanonical) {
    const retrieval = searchKlondikeProducts(String(inputText ?? ""));
    const top = retrieval.matches?.[0];
    if (top?.productKey && top.score >= 14) {
      const key = String(top.productKey);
      if (isNanoGreaseQuery(normQ) && /moly/i.test(key)) {
        /* skip retrieval mis-route to Moly Tac on nano grease asks */
      } else if (isMolyGreaseQuery(normQ) && !isNanoGreaseQuery(normQ) && /nano/i.test(key) && !/moly/i.test(key)) {
        /* skip */
      } else {
        const greaseFromKey = getGreaseCanonicalProductIntelligenceByPdsKey(key);
        if (greaseFromKey) {
          const registryId = GREASE_CANONICAL_REGISTRY_ENTITY_ID[greaseFromKey.id] || greaseFromKey.id;
          const existing = hits.find((h) => h.id === registryId);
          const boost = Math.min(72, top.score + 6);
          if (existing) existing.score = Math.max(existing.score, boost);
          else hits.push({ id: registryId, score: boost, label: greaseFromKey.productName });
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
  const entity = PRODUCT_ENTITY_REGISTRY.find((e) => e.id === top.id);
  if (!entity && !greaseCanonical) return empty;

  let pdsKey = greaseCanonical?.pdsMapKey ?? entity?.pickPdsKey(normQ) ?? null;
  if (!pdsKey && entity?.pdsKeys.length === 1) pdsKey = entity.pdsKeys[0];
  if (pdsKey && !PDS_MAP[pdsKey]) {
    pdsKey = entity?.pdsKeys.find((k) => PDS_MAP[k]) || (greaseCanonical?.pdsMapKey && PDS_MAP[greaseCanonical.pdsMapKey] ? greaseCanonical.pdsMapKey : null);
  }

  const label = greaseCanonical?.productName ?? entity?.label ?? top.label;
  const flagshipId =
    (greaseCanonical && GREASE_CANONICAL_FLAGSHIP_BY_ID[greaseCanonical.id]) ||
    entity?.flagshipId ||
    null;

  const gap = second ? top.score - second.score : top.score;
  let confidence = /** @type {"exact" | "likely" | "ambiguous" | "none"} */ ("none");
  if (top.score >= ENTITY_EXACT_MIN_SCORE && gap >= ENTITY_AMBIGUOUS_GAP) confidence = "exact";
  else if (top.score >= ENTITY_DETECT_MIN_SCORE && gap >= ENTITY_AMBIGUOUS_GAP) confidence = "likely";
  else if (detected.length > 1 && gap < ENTITY_AMBIGUOUS_GAP) confidence = "ambiguous";
  else if (top.score >= ENTITY_DETECT_MIN_SCORE) confidence = "likely";

  if (confidence === "ambiguous" && !pdsKey) {
    const likelyMatches = detected.slice(0, 5).map((d) => {
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
      const def = PRODUCT_ENTITY_REGISTRY.find((e) => e.id === d.id);
      return {
        entityId: d.id,
        pdsKey: def?.pickPdsKey(normQ) || def?.pdsKeys[0] || null,
        label: d.label,
        score: d.score,
      };
    });
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
  const likelyMatches = detected.slice(0, 5).map((d) => {
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
    const def = PRODUCT_ENTITY_REGISTRY.find((e) => e.id === d.id);
    const key = def?.pickPdsKey(normQ) || def?.pdsKeys[0] || null;
    return {
      entityId: d.id,
      pdsKey: key && PDS_MAP[key] ? key : null,
      label: d.label,
      score: d.score,
    };
  });

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

  if (!flagship && !pdsRow && !greaseCanonical) {
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
    !greaseCanonical && flagship && isNanoEp2FlagshipId(flagship.id) ? NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE : null;
  const titleLabel =
    greaseCanonical?.productName ||
    nanoIntel?.canonicalProductLabel ||
    flagship?.productName ||
    pdsKey ||
    resolved.label;

  const directAnswer = greaseCanonical
    ? greaseCanonical.whyItWins
    : nanoIntel
      ? nanoIntel.whyItWins
      : flagship?.whyItWins ||
        (pdsRow?.why ? String(pdsRow.why) : "") ||
        `Product-first coaching for ${titleLabel}—ground claims on the indexed PDS map row and live PDS revision.`;

  const sections = greaseCanonical
    ? buildEntitySectionsFromGreaseCanonical(greaseCanonical)
    : buildEntitySectionsFromSources(flagship, pdsKey, pdsRow);
  const followUpQuestions = sections.find((s) => s.id === "questionsToAsk")?.items || [];
  const cautionNotes =
    greaseCanonical?.cautionNotes?.length
      ? uniqStrings([...greaseCanonical.cautionNotes, ...(sections.find((s) => s.id === "confirmBeforeUse")?.items || [])])
      : sections.find((s) => s.id === "confirmBeforeUse")?.items || empty.cautionNotes;

  /** @type {string[]} */
  const sourceBadges = ["Product entity resolver", "PDS map index"];
  if (greaseCanonical) sourceBadges.push("Grease canonical product intelligence");
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
