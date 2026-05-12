/**
 * Phase 77.0 — AI-Guided Spotlight Builder (deterministic keyword recommendations; data layer).
 * No external AI. Matches query tokens against flagship narratives, customer profiles,
 * PDS spotlight maps, library spotlights, and category overlays.
 */

import { SALES_ENABLEMENT_FLAGSHIP_NARRATIVES } from "./flagshipNarratives.js";
import { SALES_ENABLEMENT_CUSTOMER_PROFILES } from "./customerProfiles.js";
import { PRODUCT_SPOTLIGHTS } from "./productSpotlights.js";
import { CATEGORY_SPOTLIGHTS } from "./categorySpotlights.js";
import { GREASE_PDS_SPOTLIGHT_MAP } from "./greasePdsSpotlightMap.js";
import { HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP } from "./hdEngineOilPdsSpotlightMap.js";
import { HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP } from "./hydraulicFluidPdsSpotlightMap.js";
import { SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS } from "./categorySpotlightOverlays.js";
import { SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS } from "./productSpotlightOverlays.js";
import {
  getSalesEnablementFlagshipNarrativeByProductName,
  getSalesEnablementFlagshipNarrativeById,
} from "./salesEnablementFlagshipNarrativeLookup.js";
import {
  getSalesEnablementPdsFileHintForLibrarySpotlight,
  getSalesEnablementPdsUrl,
} from "./salesEnablementPdsUrl.js";

/** @param {unknown} raw */
function normalize(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenize(query) {
  const n = normalize(query);
  if (!n) return [];
  const parts = n.split(" ").filter((t) => t.length >= 2);
  return [...new Set(parts)].slice(0, 24);
}

/** @param {string} haystackNorm @param {string[]} tokens */
function scoreTokens(haystackNorm, tokens) {
  let score = 0;
  const matched = [];
  for (const t of tokens) {
    if (!t) continue;
    if (haystackNorm.includes(t)) {
      score += 3 + Math.min(t.length, 12);
      matched.push(t);
    }
  }
  return { score, matchedTerms: [...new Set(matched)] };
}

/** @param {Record<string, unknown> | null | undefined} row @param {string[]} extra */
function joinRowText(row, extra = []) {
  if (!row || typeof row !== "object") return "";
  const parts = [];
  const push = (v) => {
    if (v == null) return;
    if (typeof v === "string") {
      const t = v.trim();
      if (t) parts.push(t);
      return;
    }
    if (typeof v === "number" || typeof v === "boolean") parts.push(String(v));
  };
  push(row.id);
  push(row.title);
  push(row.productName);
  push(row.category);
  push(row.productLine);
  push(row.focus);
  push(row.link);
  push(row.feature);
  push(row.bridge);
  push(row.benefit);
  push(row.useWhen);
  push(row.positioningTier);
  if (Array.isArray(row.tags)) row.tags.forEach((x) => push(x));
  if (Array.isArray(row.marketReality)) row.marketReality.forEach((x) => push(x));
  if (Array.isArray(row.relatedSpecs)) row.relatedSpecs.forEach((x) => push(x));
  if (Array.isArray(row.talkingPoints)) row.talkingPoints.forEach((x) => push(x));
  if (Array.isArray(row.primaryApplications)) row.primaryApplications.forEach((x) => push(x));
  if (Array.isArray(row.industries)) row.industries.forEach((x) => push(x));
  if (Array.isArray(row.equipmentTargets)) row.equipmentTargets.forEach((x) => push(x));
  if (Array.isArray(row.operatingConditions)) row.operatingConditions.forEach((x) => push(x));
  if (Array.isArray(row.technicalProofPoints)) row.technicalProofPoints.forEach((x) => push(x));
  if (Array.isArray(row.painPoints)) row.painPoints.forEach((x) => push(x));
  if (Array.isArray(row.primaryPainPoints)) row.primaryPainPoints.forEach((x) => push(x));
  if (Array.isArray(row.productLineFocus)) row.productLineFocus.forEach((x) => push(x));
  if (Array.isArray(row.salesAngles)) row.salesAngles.forEach((x) => push(x));
  if (Array.isArray(row.customerProfiles)) row.customerProfiles.forEach((x) => push(x));
  if (typeof row.lfbb === "object" && row.lfbb) {
    push(row.lfbb.link);
    push(row.lfbb.feature);
    push(row.lfbb.bridge);
    push(row.lfbb.benefit);
  }
  extra.forEach((e) => push(e));
  return normalize(parts.join(" "));
}

/** Grease / HD / hydraulic PDS rows → library product spotlight id (preview selection). */
const PDS_PRODUCT_ID_TO_LIBRARY_PRODUCT_ID = {
  "grease-pds-nano-calcium-sulfonate-ep": "ps-grease-ep2",
  "grease-pds-moly-tac-ep2": "ps-klondike-moly-ep-grease",
  "hd-pds-15w40-full-synthetic": "ps-klondike-15w40-ck4-hd",
  "hydr-pds-xvi": "ps-klondike-aw-synthetic-hydraulic",
  "hydr-pds-utf-full-synthetic": "ps-agrimax-zf",
  "hydr-pds-aw-commercial": "ps-klondike-aw-hydraulic",
  "hydr-pds-food-grade-hydraulic": "ps-hydro-aw",
};

const CATEGORY_KEYWORD_HINTS = [
  { keys: ["hydraulic", "iso", "circuit", "varnish", "slow cycle", "fluid program"], id: "cs-hydraulic-opportunity" },
  { keys: ["grease program", "severe", "nlgi", "pin", "shock", "wash"], id: "cs-grease-program-growth" },
  { keys: ["synthetic", "conversion", "upgrade", "ck", "drain"], id: "cs-synthetic-upgrade" },
  { keys: ["hd", "engine", "fleet", "diesel program", "api"], id: "cs-hd-conversion" },
  { keys: ["agriculture", "tractor", "wet brake", "utf", "seasonal"], id: "cs-agriculture-fluids" },
  { keys: ["construction", "fluid bundle", "site"], id: "cs-construction-fluids" },
];

const FLAGSHIP_ID_TO_LIBRARY_PRODUCT_ID = {
  "flagship-nano-ep-2-grease": "ps-grease-ep2",
  "flagship-moly-tac-ep2-grease": "ps-klondike-moly-ep-grease",
  "flagship-15w40-ck4-full-synthetic-hd": "ps-klondike-15w40-ck4-hd",
  "flagship-xvi-all-season-extreme-hydraulic": "ps-klondike-aw-synthetic-hydraulic",
  "flagship-utf-full-synthetic-tractor": "ps-agrimax-zf",
};

/**
 * @param {{ query: unknown, messageKind: unknown }} args
 * @returns {{
 *   match: null | {
 *     resultType: "product" | "category" | "customer_profile",
 *     spotlightId: string,
 *     spotlightTitle: string,
 *     flagshipId: string,
 *     whyItWins: string,
 *     proofPoints: string[],
 *     painSignals: string[],
 *     repTalkPreview: string[],
 *     cta: string,
 *     pdsUrl: string,
 *     score: number,
 *     matchedTerms: string[],
 *     suggestedProfileId: string,
 *   },
 * }}
 */
export function getGuidedSpotlightBuilderRecommendation(args) {
  const messageKind = String(args?.messageKind ?? "").trim();
  const tokens = tokenize(args?.query);
  if (!messageKind || tokens.length === 0) {
    return { match: null };
  }

  const mergeMatched = (a, b) => [...new Set([...(a || []), ...(b || [])])];

  if (messageKind === "customer_profile") {
    const profiles = Array.isArray(SALES_ENABLEMENT_CUSTOMER_PROFILES?.profiles)
      ? SALES_ENABLEMENT_CUSTOMER_PROFILES.profiles
      : [];
    let best = /** @type {null | { profile: object, score: number, matched: string[] }} */ (null);
    for (const p of profiles) {
      if (!p || typeof p !== "object") continue;
      const hay = joinRowText(p, [
        ...(Array.isArray(p.operatingConditions) ? p.operatingConditions : []),
        ...(Array.isArray(p.commonPainPoints) ? p.commonPainPoints : []),
        ...(Array.isArray(p.priorityProductCategories) ? p.priorityProductCategories : []),
        ...(Array.isArray(p.buyingTriggers) ? p.buyingTriggers : []),
        ...(Array.isArray(p.recommendedMessagingAngles) ? p.recommendedMessagingAngles : []),
        ...(Array.isArray(p.relevantEquipmentTypes) ? p.relevantEquipmentTypes : []),
      ]);
      const { score, matchedTerms } = scoreTokens(hay, tokens);
      if (!best || score > best.score) best = { profile: p, score, matched: matchedTerms };
    }
    if (!best || best.score < 4) return { match: null };
    const p = best.profile;
    const pid = String(p.id || "").trim();
    const title = String(p.title || pid).trim();
    const pain = Array.isArray(p.commonPainPoints) ? p.commonPainPoints.map((x) => String(x || "").trim()).filter(Boolean) : [];
    const angles = Array.isArray(p.recommendedMessagingAngles)
      ? p.recommendedMessagingAngles.map((x) => String(x || "").trim()).filter(Boolean)
      : [];
    const cats = Array.isArray(p.priorityProductCategories)
      ? p.priorityProductCategories.map((x) => String(x || "").trim()).filter(Boolean)
      : [];
    let suggestedProduct = /** @type {typeof PRODUCT_SPOTLIGHTS[number] | null} */ (null);
    let sugScore = 0;
    for (const pr of PRODUCT_SPOTLIGHTS) {
      if (!pr || pr.status === "draft") continue;
      const cat = String(pr.category || "").toLowerCase();
      const matchCat = cats.some((c) => c && (cat.includes(c.replace(/_/g, " ")) || normalize(pr.title).includes(c)));
      const { score: ps } = scoreTokens(joinRowText(pr), tokens);
      const bonus = matchCat ? 6 : 0;
      const t = ps + bonus;
      if (t > sugScore) {
        sugScore = t;
        suggestedProduct = pr;
      }
    }
    const flagship = suggestedProduct
      ? getSalesEnablementFlagshipNarrativeByProductName(suggestedProduct.title)
      : null;
    const why = flagship?.whyItWins || angles[0] || pain[0] || title;
    const proof = flagship
      ? [...(flagship.premiumProofPoints || []).slice(0, 3).map((x) => String(x || "").trim())].filter(Boolean)
      : angles.slice(0, 3);
    const rep = flagship ? (flagship.repTalkTrack || []).slice(0, 2).map((x) => String(x || "").trim()).filter(Boolean) : [];
    const cta = flagship
      ? String((flagship.dealerTalkingPoints && flagship.dealerTalkingPoints[0]) || "").trim() || angles[1] || angles[0] || ""
      : angles[1] || angles[0] || "";
    const pdsHint = suggestedProduct ? getSalesEnablementPdsFileHintForLibrarySpotlight(suggestedProduct) : "";
    return {
      match: {
        resultType: "customer_profile",
        spotlightId: pid,
        spotlightTitle: title,
        flagshipId: flagship ? String(flagship.id || "").trim() : "",
        whyItWins: why,
        proofPoints: proof.length ? proof : ["Use profile pain points with a library spotlight row in Step 3."],
        painSignals: pain.slice(0, 3),
        repTalkPreview: rep,
        cta: cta || "Pair this profile with a library spotlight—then confirm PDS wording before delivery.",
        pdsUrl: getSalesEnablementPdsUrl(pdsHint),
        score: best.score,
        matchedTerms: best.matched,
        suggestedProfileId: pid,
        /** When set, "Use" also selects this product for preview. */
        pairedProductSpotlightId: suggestedProduct && sugScore >= 4 ? String(suggestedProduct.id || "").trim() : "",
      },
    };
  }

  if (messageKind === "category") {
    const cats = Array.isArray(CATEGORY_SPOTLIGHTS) ? CATEGORY_SPOTLIGHTS.filter((c) => c && c.status !== "draft") : [];
    const overlays = Array.isArray(SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS?.overlays)
      ? SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS.overlays
      : [];
    const OVERLAY_CAT_TO_CS = {
      grease: "cs-grease-program-growth",
      hydraulic_fluids: "cs-hydraulic-opportunity",
      hd_engine_oils: "cs-hd-conversion",
    };
    let best = /** @type {null | { id: string, title: string, score: number, matched: string[] }} */ (null);

    for (const c of cats) {
      const { score, matchedTerms } = scoreTokens(joinRowText(c), tokens);
      if (!best || score > best.score) {
        best = { id: String(c.id), title: String(c.title || c.id), score, matched: matchedTerms };
      }
    }

    for (const hint of CATEGORY_KEYWORD_HINTS) {
      const hit = hint.keys.some((k) =>
        tokens.some((t) => {
          const nk = normalize(k);
          return nk.length >= 3 && (nk.includes(t) || t.includes(nk.slice(0, Math.min(6, nk.length))));
        })
      );
      if (!hit) continue;
      const row = cats.find((c) => c.id === hint.id);
      if (!row) continue;
      const { score, matchedTerms } = scoreTokens(joinRowText(row), tokens);
      const bump = 12;
      if (!best || score + bump > best.score) {
        best = {
          id: hint.id,
          title: String(row.title || hint.id),
          score: score + bump,
          matched: mergeMatched(matchedTerms, [hint.keys[0]]),
        };
      }
    }

    for (const ov of overlays) {
      const { score, matchedTerms } = scoreTokens(joinRowText(ov), tokens);
      if (score < 6) continue;
      const cid = OVERLAY_CAT_TO_CS[String(ov.categoryId || "")];
      if (!cid) continue;
      const row = cats.find((c) => c.id === cid);
      if (!row) continue;
      const bump = 7;
      if (!best || score + bump > best.score) {
        best = {
          id: cid,
          title: String(row.title || cid),
          score: score + bump,
          matched: mergeMatched(matchedTerms, [String(ov.title || "overlay").slice(0, 24)]),
        };
      }
    }

    if (!best || best.score < 5) return { match: null };

    const row = cats.find((c) => c.id === best.id) || null;
    if (!row) return { match: null };
    const title = String(row.title || best.id);
    const ov =
      overlays.find((o) => OVERLAY_CAT_TO_CS[String(o.categoryId || "")] === best.id) ||
      overlays.find((o) => normalize(String(o.title || "")).includes(normalize(title).slice(0, 14))) ||
      null;
    const flagship = getSalesEnablementFlagshipNarrativeByProductName(title);
    const why = flagship?.whyItWins || String(row?.link || row?.feature || title).trim();
    const proof = flagship
      ? (flagship.premiumProofPoints || []).slice(0, 3).map((x) => String(x || "").trim()).filter(Boolean)
      : (row?.talkingPoints || []).slice(0, 3).map((x) => String(x || "").trim()).filter(Boolean);
    const pain = flagship
      ? (flagship.customerPainSignals || []).slice(0, 3).map((x) => String(x || "").trim()).filter(Boolean)
      : (row?.marketReality || []).slice(0, 3).map((x) => String(x || "").trim()).filter(Boolean);
    const rep = flagship ? (flagship.repTalkTrack || []).slice(0, 2).map((x) => String(x || "").trim()).filter(Boolean) : [];
    const cta = (ov && String(ov.suggestedCta || "").trim()) || (row?.closingLines && String(row.closingLines[0] || "").trim()) || "";
    const pdsHint = row ? getSalesEnablementPdsFileHintForLibrarySpotlight(row) : "";
    return {
      match: {
        resultType: "category",
        spotlightId: best.id,
        spotlightTitle: title,
        flagshipId: flagship ? String(flagship.id || "").trim() : "",
        whyItWins: why,
        proofPoints: proof.length ? proof : ["Anchor category claims to PDS rows the dealer stocks."],
        painSignals: pain,
        repTalkPreview: rep,
        cta: cta || "Confirm OEM and PDS language before quoting.",
        pdsUrl: getSalesEnablementPdsUrl(pdsHint),
        score: best.score,
        matchedTerms: best.matched,
        suggestedProfileId: "",
        pairedProductSpotlightId: "",
      },
    };
  }

  /* product (default) */
  const products = Array.isArray(PRODUCT_SPOTLIGHTS) ? PRODUCT_SPOTLIGHTS.filter((p) => p && p.status !== "draft") : [];
  const scores = /** @type {Map<string, { score: number, matched: string[] }>} */ (new Map());

  const addScore = (id, delta, matched) => {
    if (!id) return;
    const cur = scores.get(id) || { score: 0, matched: [] };
    cur.score += delta;
    cur.matched = mergeMatched(cur.matched, matched);
    scores.set(id, cur);
  };

  for (const pr of products) {
    const hay = joinRowText(pr);
    const { score, matchedTerms } = scoreTokens(hay, tokens);
    if (score > 0) addScore(String(pr.id), score, matchedTerms);
  }

  const greaseProducts = Array.isArray(GREASE_PDS_SPOTLIGHT_MAP?.products) ? GREASE_PDS_SPOTLIGHT_MAP.products : [];
  const hdProducts = Array.isArray(HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP?.products) ? HD_ENGINE_OIL_PDS_SPOTLIGHT_MAP.products : [];
  const hydrProducts = Array.isArray(HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP?.products) ? HYDRAULIC_FLUID_PDS_SPOTLIGHT_MAP.products : [];

  for (const gp of [...greaseProducts, ...hdProducts, ...hydrProducts]) {
    const hay = joinRowText(gp);
    const { score, matchedTerms } = scoreTokens(hay, tokens);
    if (score < 3) continue;
    const lib = PDS_PRODUCT_ID_TO_LIBRARY_PRODUCT_ID[String(gp.id || "")];
    if (lib) addScore(lib, Math.min(score, 22), matchedTerms);
  }

  const flagships = Array.isArray(SALES_ENABLEMENT_FLAGSHIP_NARRATIVES?.flagships)
    ? SALES_ENABLEMENT_FLAGSHIP_NARRATIVES.flagships
    : [];
  for (const f of flagships) {
    if (!f || typeof f !== "object") continue;
    const hay = joinRowText(f, [
      String(f.flagshipNarrativeParagraph || ""),
      ...(Array.isArray(f.keyDifferentiators) ? f.keyDifferentiators : []),
      ...(Array.isArray(f.severeDutyUseCases) ? f.severeDutyUseCases : []),
    ]);
    const { score, matchedTerms } = scoreTokens(hay, tokens);
    if (score < 4) continue;
    const lib = FLAGSHIP_ID_TO_LIBRARY_PRODUCT_ID[String(f.id || "")];
    if (lib) addScore(lib, Math.min(score + 6, 36), matchedTerms);
  }

  for (const ov of Array.isArray(SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS?.overlays)
    ? SALES_ENABLEMENT_PRODUCT_SPOTLIGHT_OVERLAYS.overlays
    : []) {
    const { score, matchedTerms } = scoreTokens(joinRowText(ov), tokens);
    if (score < 5) continue;
    const on = normalize(ov.productName);
    const prHit = products.find((p) => normalize(p.title) === on);
    if (prHit) addScore(String(prHit.id), Math.min(score + 5, 24), matchedTerms);
  }

  for (const ov of Array.isArray(SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS?.overlays)
    ? SALES_ENABLEMENT_CATEGORY_SPOTLIGHT_OVERLAYS.overlays
    : []) {
    const { score, matchedTerms } = scoreTokens(joinRowText(ov), tokens);
    if (score < 6) continue;
    if (normalize(ov.categoryId || "").includes("grease")) addScore("ps-grease-ep2", 6, matchedTerms);
    if (normalize(ov.categoryId || "").includes("hydraulic")) addScore("ps-klondike-aw-hydraulic", 6, matchedTerms);
    if (normalize(ov.categoryId || "").includes("hd")) addScore("ps-klondike-15w40-ck4-hd", 5, matchedTerms);
  }

  let bestId = "";
  let bestScore = -1;
  let bestMatched = /** @type {string[]} */ ([]);
  for (const [id, v] of scores.entries()) {
    if (v.score > bestScore) {
      bestScore = v.score;
      bestId = id;
      bestMatched = v.matched;
    }
  }

  if (!bestId || bestScore < 5) return { match: null };

  const pr = products.find((p) => p.id === bestId) || null;
  if (!pr) return { match: null };

  const flagship =
    getSalesEnablementFlagshipNarrativeByProductName(pr.title) ||
    (() => {
      const fid = Object.entries(FLAGSHIP_ID_TO_LIBRARY_PRODUCT_ID).find(([, lid]) => lid === bestId)?.[0];
      return fid ? getSalesEnablementFlagshipNarrativeById(fid) : null;
    })();

  const why = flagship?.whyItWins || String(pr.useWhen || pr.link || pr.title).trim();
  const proof = flagship
    ? (flagship.premiumProofPoints || []).slice(0, 4).map((x) => String(x || "").trim()).filter(Boolean)
    : (pr.relatedSpecs || []).concat(pr.marketReality || []).slice(0, 4).map((x) => String(x || "").trim()).filter(Boolean);
  const pain = flagship
    ? (flagship.customerPainSignals || []).slice(0, 4).map((x) => String(x || "").trim()).filter(Boolean)
    : (pr.marketReality || []).slice(0, 4).map((x) => String(x || "").trim()).filter(Boolean);
  const rep = flagship ? (flagship.repTalkTrack || []).slice(0, 3).map((x) => String(x || "").trim()).filter(Boolean) : [];
  const cta =
    (flagship && String((flagship.dealerTalkingPoints && flagship.dealerTalkingPoints[0]) || "").trim()) ||
    (pr.closingLines && String(pr.closingLines[0] || "").trim()) ||
    "";
  const pdsHint = getSalesEnablementPdsFileHintForLibrarySpotlight(pr);

  return {
    match: {
      resultType: "product",
      spotlightId: bestId,
      spotlightTitle: String(pr.title || bestId),
      flagshipId: flagship ? String(flagship.id || "").trim() : "",
      whyItWins: why,
      proofPoints: proof.length ? proof : ["Confirm proof language on the current PDS for the stocked SKU."],
      painSignals: pain,
      repTalkPreview: rep,
      cta: cta || "Align counter language to the PDS before the next customer walk-in.",
      pdsUrl: getSalesEnablementPdsUrl(pdsHint),
      score: bestScore,
      matchedTerms: bestMatched,
      suggestedProfileId: "",
      pairedProductSpotlightId: "",
    },
  };
}
