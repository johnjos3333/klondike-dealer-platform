/**
 * Deterministic product narrative composition engine (KL Admin Sales Enablement + Dealer Rep Lubricant Advisor).
 * Uses indexed flagship narratives, PDS map, retrieval, and advisor knowledge layers only.
 */

import {
  CONFIRM_BEFORE_USE_DEFAULTS,
  EMPTY_NARRATIVE_HINTS,
  NARRATIVE_SECTION_BLUEPRINT,
  NARRATIVE_SOURCE_BADGE_LABELS,
  PRODUCT_NARRATIVE_COMPOSITION_VERSION,
  SALES_ENABLEMENT_SPOTLIGHT_TYPES,
} from "../data/productNarrativeTemplates.js";
import { SALES_ENABLEMENT_FLAGSHIP_NARRATIVES } from "../data/salesEnablement/flagshipNarratives.js";
import {
  getSalesEnablementFlagshipNarrativeByProductName,
  normalizeSalesEnablementFlagshipProductNameLabel,
} from "../data/salesEnablement/salesEnablementFlagshipNarrativeLookup.js";
import { PDS_MAP } from "../data/pdsMap.js";
import { productAttributeKnowledge } from "../data/productAttributeKnowledge.js";
import { industryLubricationKnowledge } from "../data/industryLubricationKnowledge.js";
import { equipmentLubricationKnowledge } from "../data/equipmentLubricationKnowledge.js";
import { roleBasedSalesTranslationKnowledge } from "../data/roleBasedSalesTranslationKnowledge.js";
import { lubricationTroubleshootingKnowledge } from "../data/lubricationTroubleshootingKnowledge.js";
import { normalizeProductQuery, searchKlondikeProducts } from "./klondikeProductRetrievalHelpers.js";

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

/** @returns {import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative[]} */
function listFlagships() {
  const list = SALES_ENABLEMENT_FLAGSHIP_NARRATIVES?.flagships;
  return Array.isArray(list) ? list : [];
}

/**
 * @param {string} n
 */
function relaxNormalizedProductQuery(n) {
  return String(n ?? "")
    .replace(/\bnano ep2\b/g, "nano ep 2")
    .replace(/\bep2\b/g, "ep 2");
}

/**
 * @param {unknown} keyOrQuery
 */
function resolveFlagshipFromQuery(keyOrQuery) {
  const raw = String(keyOrQuery ?? "").trim();
  if (!raw) return null;
  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(raw));

  let best = null;
  let bestLen = 0;
  for (const f of listFlagships()) {
    if (!f || typeof f !== "object") continue;
    const pn = normalizeSalesEnablementFlagshipProductNameLabel(f.productName);
    if (pn.length < 6) continue;
    if (normQ.includes(pn) && pn.length > bestLen) {
      best = f;
      bestLen = pn.length;
    }
  }
  if (best) return best;

  const byName = getSalesEnablementFlagshipNarrativeByProductName(raw);
  if (byName) return byName;

  const sn = normalizeProductQuery(raw.replace(/^klondike\s+/i, "").trim());
  if (sn === "nano ep2" || sn === "nano ep 2") {
    return getSalesEnablementFlagshipNarrativeByProductName("Nano EP 2 Grease");
  }
  return null;
}

/**
 * @param {unknown} keyOrQuery
 * @returns {{ key: string, row: Record<string, unknown> } | null}
 */
function resolvePdsRowFromQuery(keyOrQuery) {
  const raw = String(keyOrQuery ?? "").trim();
  if (!raw) return null;
  if (PDS_MAP[raw]) return { key: raw, row: PDS_MAP[raw] };

  const normQ = relaxNormalizedProductQuery(normalizeProductQuery(raw));
  const keys = Object.keys(PDS_MAP).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const nk = normalizeProductQuery(key);
    if (nk.length < 5) continue;
    if (normQ.includes(nk)) return { key, row: PDS_MAP[key] };
  }

  const search = searchKlondikeProducts(raw);
  const top = search.matches?.[0];
  if (top?.productKey && PDS_MAP[top.productKey]) {
    return { key: top.productKey, row: PDS_MAP[top.productKey] };
  }
  return null;
}

/**
 * @param {unknown} query
 */
function matchAttributeProfile(query) {
  const normQ = normalizeProductQuery(query);
  if (!normQ) return null;
  let best = null;
  let bestScore = 0;
  for (const profile of Object.values(productAttributeKnowledge)) {
    if (!profile || typeof profile !== "object") continue;
    let score = 0;
    const idn = normalizeProductQuery(String(profile.id || ""));
    if (idn && normQ.includes(idn)) score += 24;
    for (const kw of profile.keywords || []) {
      const kn = normalizeProductQuery(kw);
      if (kn.length >= 4 && normQ.includes(kn)) score += 10 + Math.min(kn.length, 14);
    }
    for (const al of profile.aliases || []) {
      const an = normalizeProductQuery(al);
      if (an.length >= 8 && normQ.includes(an)) score += 14 + Math.min(an.length, 20);
    }
    if (score > bestScore) {
      bestScore = score;
      best = profile;
    }
  }
  return bestScore >= 12 ? best : null;
}

/**
 * @param {unknown} query
 */
function matchIndustryProfile(query) {
  const normQ = normalizeProductQuery(query);
  if (!normQ) return null;
  let best = null;
  let bestScore = 0;
  for (const row of Object.values(industryLubricationKnowledge)) {
    if (!row || typeof row !== "object") continue;
    let score = 0;
    const idn = normalizeProductQuery(String(row.id || ""));
    if (idn && (normQ.includes(idn) || idn.includes(normQ))) score += 22;
    const ind = normalizeProductQuery(String(row.industry || ""));
    if (ind.length >= 6 && normQ.includes(ind)) score += 16;
    for (const al of row.aliases || []) {
      const an = normalizeProductQuery(al);
      if (an.length >= 4 && normQ.includes(an)) score += 8 + Math.min(an.length, 14);
    }
    for (const kw of row.keywords || []) {
      const kn = normalizeProductQuery(kw);
      if (kn.length >= 4 && normQ.includes(kn)) score += 6;
    }
    if (score > bestScore) {
      bestScore = score;
      best = row;
    }
  }
  return bestScore >= 10 ? best : null;
}

/**
 * @param {unknown} query
 */
function matchEquipmentProfile(query) {
  const normQ = normalizeProductQuery(query);
  if (!normQ) return null;
  let best = null;
  let bestScore = 0;
  for (const row of Object.values(equipmentLubricationKnowledge)) {
    if (!row || typeof row !== "object") continue;
    let score = 0;
    const idn = normalizeProductQuery(String(row.id || ""));
    if (idn && normQ.includes(idn)) score += 18;
    const eq = normalizeProductQuery(String(row.equipment || ""));
    if (eq.length >= 6 && normQ.includes(eq)) score += 14;
    for (const al of row.aliases || []) {
      const an = normalizeProductQuery(al);
      if (an.length >= 5 && normQ.includes(an)) score += 8;
    }
    for (const kw of row.keywords || []) {
      const kn = normalizeProductQuery(kw);
      if (kn.length >= 4 && normQ.includes(kn)) score += 5;
    }
    if (score > bestScore) {
      bestScore = score;
      best = row;
    }
  }
  return bestScore >= 10 ? best : null;
}

/**
 * @param {unknown} queryOrId
 */
function matchRoleProfile(queryOrId) {
  const normQ = normalizeProductQuery(queryOrId);
  if (!normQ) return null;
  for (const row of Object.values(roleBasedSalesTranslationKnowledge)) {
    if (!row || typeof row !== "object") continue;
    if (normalizeProductQuery(String(row.id || "")) === normQ) return row;
  }
  let best = null;
  let bestScore = 0;
  for (const row of Object.values(roleBasedSalesTranslationKnowledge)) {
    if (!row || typeof row !== "object") continue;
    let score = 0;
    const rn = normalizeProductQuery(String(row.role || ""));
    if (rn.length >= 6 && normQ.includes(rn)) score += 14;
    for (const al of row.aliases || []) {
      const an = normalizeProductQuery(al);
      if (an.length >= 5 && normQ.includes(an)) score += 8;
    }
    for (const kw of row.keywords || []) {
      const kn = normalizeProductQuery(kw);
      if (kn.length >= 4 && normQ.includes(kn)) score += 5;
    }
    if (score > bestScore) {
      bestScore = score;
      best = row;
    }
  }
  return bestScore >= 10 ? best : null;
}

/**
 * @param {unknown} query
 */
function matchTroubleshootingProfile(query) {
  const normQ = normalizeProductQuery(query);
  if (!normQ) return null;
  let best = null;
  let bestScore = 0;
  for (const row of Object.values(lubricationTroubleshootingKnowledge)) {
    if (!row || typeof row !== "object") continue;
    let score = 0;
    const issueN = normalizeProductQuery(String(row.issue || ""));
    if (issueN.length >= 10 && normQ.includes(issueN)) score += 22;
    for (const kw of row.keywords || []) {
      const kn = normalizeProductQuery(kw);
      if (kn.length >= 6 && normQ.includes(kn)) score += 10;
    }
    if (score > bestScore) {
      bestScore = score;
      best = row;
    }
  }
  return bestScore >= 12 ? best : null;
}

/**
 * @param {{
 *   flagship: import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative | null,
 *   pdsKey: string | null,
 *   pdsRow: Record<string, unknown> | null,
 *   attributeProfile: Record<string, unknown> | null,
 *   industryProfile: Record<string, unknown> | null,
 *   equipmentProfile: Record<string, unknown> | null,
 *   roleProfile: Record<string, unknown> | null,
 *   troubleProfile: Record<string, unknown> | null,
 *   mode: "full" | "advisor" | "differentiation" | "repTalkHeavy",
 * }} opts
 */
function composeProductNarrativeSections(opts) {
  const {
    flagship,
    pdsKey,
    pdsRow,
    attributeProfile,
    industryProfile,
    equipmentProfile,
    roleProfile,
    troubleProfile,
    mode,
  } = opts;

  const limit = mode === "advisor" ? 5 : mode === "repTalkHeavy" ? 10 : 8;
  const limitProof = mode === "advisor" ? 4 : 10;

  const sourcesUsed = [];
  if (flagship) sourcesUsed.push(NARRATIVE_SOURCE_BADGE_LABELS.flagship);
  if (pdsRow) sourcesUsed.push(NARRATIVE_SOURCE_BADGE_LABELS.pdsMap);
  if (attributeProfile) sourcesUsed.push(NARRATIVE_SOURCE_BADGE_LABELS.productAttribute);
  if (industryProfile) sourcesUsed.push(NARRATIVE_SOURCE_BADGE_LABELS.industry);
  if (equipmentProfile) sourcesUsed.push(NARRATIVE_SOURCE_BADGE_LABELS.equipment);
  if (roleProfile) sourcesUsed.push(NARRATIVE_SOURCE_BADGE_LABELS.roleSales);
  if (troubleProfile) sourcesUsed.push(NARRATIVE_SOURCE_BADGE_LABELS.troubleshooting);
  sourcesUsed.push(NARRATIVE_SOURCE_BADGE_LABELS.templates);

  /** @type {string[]} */
  const whatItIs = [];
  if (flagship?.fieldIdentity) whatItIs.push(String(flagship.fieldIdentity));
  if (flagship?.flagshipPositioning && mode !== "advisor") whatItIs.push(String(flagship.flagshipPositioning));
  if (pdsRow?.why) whatItIs.push(String(pdsRow.why));
  if (attributeProfile?.whatItMeans) whatItIs.push(String(attributeProfile.whatItMeans));

  /** @type {string[]} */
  const whyItWins = [];
  if (flagship?.whyItWins) whyItWins.push(String(flagship.whyItWins));
  if (mode === "differentiation" && flagship?.whatMakesThisDifferent?.length) {
    whyItWins.push(...flagship.whatMakesThisDifferent.map(String));
  }
  if (flagship?.keyDifferentiators?.length && mode !== "advisor") {
    whyItWins.push(...flagship.keyDifferentiators.map(String));
  }
  if (attributeProfile?.directAnswer) whyItWins.push(String(attributeProfile.directAnswer));

  /** @type {string[]} */
  const opCons = [];
  if (flagship?.operationalConsequences?.length) opCons.push(...flagship.operationalConsequences.map(String));
  if (flagship?.customerPainSignals?.length) opCons.push(...flagship.customerPainSignals.map(String));
  if (troubleProfile?.operationalConsequences?.length) {
    opCons.push(...troubleProfile.operationalConsequences.map(String));
  }
  if (industryProfile?.commonPainSignals?.length) {
    opCons.push(...industryProfile.commonPainSignals.map(String));
  }

  /** @type {string[]} */
  const proof = [];
  if (flagship?.premiumProofPoints?.length) proof.push(...flagship.premiumProofPoints.map(String));
  if (Array.isArray(pdsRow?.specs)) {
    proof.push(...pdsRow.specs.map((s) => String(s)).slice(0, limitProof));
  }
  if (attributeProfile?.confirmedKlondikeProducts?.length) {
    proof.push(...attributeProfile.confirmedKlondikeProducts.map(String).slice(0, 4));
  }

  /** @type {string[]} */
  const whereFits = [];
  if (flagship?.severeDutyUseCases?.length) whereFits.push(...flagship.severeDutyUseCases.map(String));
  if (industryProfile?.commonEquipment?.length) {
    whereFits.push(...industryProfile.commonEquipment.map(String).slice(0, 6));
  }
  if (equipmentProfile?.lubricationSystems?.length) {
    whereFits.push(...equipmentProfile.lubricationSystems.map(String).slice(0, 5));
  }
  if (Array.isArray(pdsRow?.aliases) && pdsRow.aliases.length && mode !== "advisor") {
    whereFits.push(`Indexed aliases include: ${pdsRow.aliases.slice(0, 4).map(String).join("; ")}`);
  }

  /** @type {string[]} */
  const upgrade = [];
  if (flagship?.emotionalSalesAngles?.length) upgrade.push(...flagship.emotionalSalesAngles.map(String));
  if (flagship?.dealerTalkingPoints?.length) upgrade.push(...flagship.dealerTalkingPoints.map(String));
  if (flagship?.operationalWins?.length && mode !== "repTalkHeavy") {
    upgrade.push(...flagship.operationalWins.map(String));
  }
  if (equipmentProfile?.salesOpportunities?.length) {
    upgrade.push(...equipmentProfile.salesOpportunities.map(String));
  }

  /** @type {string[]} */
  const repLines = [];
  if (flagship?.repTalkTrack?.length) repLines.push(...flagship.repTalkTrack.map(String));
  if (pdsRow && !flagship?.repTalkTrack?.length) {
    repLines.push(
      `Use the indexed row “${pdsKey || "product"}” and read the PDS aloud—lead with one spec line the buyer can verify.`
    );
  }
  if (attributeProfile?.repTalkTrack) repLines.push(String(attributeProfile.repTalkTrack));
  if (roleProfile?.exampleTalkTracks?.length) {
    repLines.push(...roleProfile.exampleTalkTracks.map(String).slice(0, 2));
  }

  /** @type {string[]} */
  const questions = [];
  if (flagship && mode === "full") {
    questions.push("What joint, circuit, or duty class is driving the change request?");
  }
  if (attributeProfile?.questionsToAsk?.length) {
    questions.push(...attributeProfile.questionsToAsk.map(String));
  }
  if (equipmentProfile?.commonQuestionsToAsk?.length) {
    questions.push(...equipmentProfile.commonQuestionsToAsk.map(String));
  }
  if (troubleProfile?.questionsToAsk?.length) {
    questions.push(...troubleProfile.questionsToAsk.map(String));
  }
  if (roleProfile?.questionsToAsk?.length) {
    questions.push(...roleProfile.questionsToAsk.map(String).slice(0, 3));
  }
  questions.push("What OEM spec string and nameplate fluid class are they running today?");

  /** @type {string[]} */
  const confirm = [...CONFIRM_BEFORE_USE_DEFAULTS];
  if (flagship?.doNotSay?.length) confirm.push(...flagship.doNotSay.map(String));
  if (pdsRow && attributeProfile?.pdsProofRequired) {
    confirm.push("This category flags extra PDS proof—do not skip the printed spec table.");
  }
  if (attributeProfile?.cautionNotes?.length) confirm.push(...attributeProfile.cautionNotes.map(String));
  if (industryProfile?.cautionNotes?.length) confirm.push(...industryProfile.cautionNotes.map(String));
  if (equipmentProfile?.cautionNotes?.length) confirm.push(...equipmentProfile.cautionNotes.map(String));
  if (roleProfile?.cautionNotes?.length) confirm.push(...roleProfile.cautionNotes.map(String));
  if (troubleProfile?.cautionNotes?.length) confirm.push(...troubleProfile.cautionNotes.map(String));

  const trim = (arr) => uniqStrings(arr).slice(0, limit);

  const sections = [
    narrativeSection(
      "whatItIs",
      "What It Is",
      "",
      trim(whatItIs).length ? trim(whatItIs) : [EMPTY_NARRATIVE_HINTS.whatItIs]
    ),
    narrativeSection(
      "whyItWins",
      "Why It Wins",
      "",
      trim(whyItWins).length ? trim(whyItWins) : [EMPTY_NARRATIVE_HINTS.whyItWins]
    ),
    narrativeSection(
      "operationalConsequences",
      "Operational Consequences",
      "",
      trim(opCons).length ? trim(opCons) : [EMPTY_NARRATIVE_HINTS.operationalConsequences]
    ),
    narrativeSection(
      "pdsBackedProof",
      "PDS-Backed Proof",
      flagship || pdsRow
        ? "Only repeat language that appears in flagship narrative or indexed PDS map lines—no new lab claims."
        : "No flagship or PDS row anchored—proof must wait on a named SKU and its PDS.",
      trim(proof).length ? trim(proof) : [EMPTY_NARRATIVE_HINTS.pdsBackedProof]
    ),
    narrativeSection(
      "whereItFits",
      "Where It Fits",
      "",
      trim(whereFits).length ? trim(whereFits) : [EMPTY_NARRATIVE_HINTS.whereItFits]
    ),
    narrativeSection(
      "upgradeStory",
      "Upgrade Story",
      "",
      trim(upgrade).length ? trim(upgrade) : [EMPTY_NARRATIVE_HINTS.upgradeStory]
    ),
    narrativeSection(
      "repTalkTrack",
      "Rep Talk Track",
      "",
      trim(repLines).length ? trim(repLines) : [EMPTY_NARRATIVE_HINTS.repTalkTrack]
    ),
    narrativeSection(
      "questionsToAsk",
      "Questions to Ask",
      "",
      trim(questions).length ? trim(questions) : [EMPTY_NARRATIVE_HINTS.questionsToAsk]
    ),
    narrativeSection(
      "confirmBeforeUse",
      "Confirm Before Use",
      "",
      uniqStrings(confirm)
    ),
  ];

  return { sections, sourcesUsed: uniqStrings(sourcesUsed) };
}

/**
 * @param {unknown} productKeyOrQuery
 * @param {Record<string, unknown>} [context]
 */
export function buildProductNarrative(productKeyOrQuery, context = {}) {
  const q = String(productKeyOrQuery ?? "").trim();
  const flagship = resolveFlagshipFromQuery(q);
  const pds = resolvePdsRowFromQuery(q);
  const attributeProfile =
    (context.attributeKey && productAttributeKnowledge[String(context.attributeKey)]) ||
    matchAttributeProfile(q) ||
    null;
  const industryProfile =
    (context.industryKey && industryLubricationKnowledge[String(context.industryKey)]) ||
    matchIndustryProfile(q) ||
    null;
  const equipmentProfile =
    (context.equipmentKey && equipmentLubricationKnowledge[String(context.equipmentKey)]) ||
    matchEquipmentProfile(q) ||
    null;
  const roleProfile =
    (context.roleKey && roleBasedSalesTranslationKnowledge[String(context.roleKey)]) ||
    (context.roleQuery ? matchRoleProfile(context.roleQuery) : null);
  const troubleProfile =
    context.troubleshootingKey && lubricationTroubleshootingKnowledge[String(context.troubleshootingKey)]
      ? lubricationTroubleshootingKnowledge[String(context.troubleshootingKey)]
      : context.includeTroubleshooting === false
        ? null
        : matchTroubleshootingProfile(q);

  if (!flagship && !pds?.row) {
    const attrOnly = attributeProfile || matchAttributeProfile(q);
    if (attrOnly) {
      return buildCategoryNarrative(String(attrOnly.id), context);
    }
    return {
      ok: false,
      version: PRODUCT_NARRATIVE_COMPOSITION_VERSION,
      title: "Product narrative",
      directAnswer:
        "No flagship profile or PDS map row could be anchored from that text. Pass a product key as indexed in PDS_MAP, a flagship product name, or a tighter query for retrieval.",
      sections: NARRATIVE_SECTION_BLUEPRINT.map(({ id, title }) =>
        narrativeSection(id, title, "", [EMPTY_NARRATIVE_HINTS[id] || "Add grounded sources and recompose."])
      ),
      followUpQuestions: [],
      sourceBadges: [NARRATIVE_SOURCE_BADGE_LABELS.templates],
      cautionNotes: [...CONFIRM_BEFORE_USE_DEFAULTS],
      sourcesUsed: [],
      message: "Unresolved product anchor.",
    };
  }

  const title = flagship?.productName || pds?.key || "Product narrative";
  const directAnswer =
    flagship?.whyItWins ||
    (pds?.row?.why ? String(pds.row.why) : "") ||
    attributeProfile?.directAnswer ||
    "Narrative is grounded on indexed flagship and PDS map fields—expand with live PDS review before customer send.";

  const { sections, sourcesUsed } = composeProductNarrativeSections({
    flagship,
    pdsKey: pds?.key || null,
    pdsRow: pds?.row || null,
    attributeProfile,
    industryProfile,
    equipmentProfile,
    roleProfile,
    troubleProfile,
    mode: "full",
  });

  return {
    ok: true,
    version: PRODUCT_NARRATIVE_COMPOSITION_VERSION,
    title,
    directAnswer: String(directAnswer).slice(0, 1200),
    sections,
    followUpQuestions: sections.find((s) => s.id === "questionsToAsk")?.items || [],
    sourceBadges: sourcesUsed,
    cautionNotes: sections.find((s) => s.id === "confirmBeforeUse")?.items || [...CONFIRM_BEFORE_USE_DEFAULTS],
    sourcesUsed,
    message: flagship ? `Flagship: ${flagship.id}` : `PDS row: ${pds?.key}`,
  };
}

/**
 * @param {unknown} categoryKeyOrQuery
 * @param {Record<string, unknown>} [context]
 */
export function buildCategoryNarrative(categoryKeyOrQuery, context = {}) {
  const raw = String(categoryKeyOrQuery ?? "").trim();
  let profile =
    (productAttributeKnowledge[raw] || null) ||
    (context.attributeKey ? productAttributeKnowledge[String(context.attributeKey)] : null) ||
    matchAttributeProfile(raw);

  if (!profile) {
    return {
      ok: false,
      version: PRODUCT_NARRATIVE_COMPOSITION_VERSION,
      title: "Category narrative",
      directAnswer: "No product-attribute category profile matched that key or query.",
      sections: NARRATIVE_SECTION_BLUEPRINT.map(({ id, title }) =>
        narrativeSection(id, title, "", [EMPTY_NARRATIVE_HINTS[id] || ""])
      ),
      followUpQuestions: [],
      sourceBadges: [NARRATIVE_SOURCE_BADGE_LABELS.productAttribute, NARRATIVE_SOURCE_BADGE_LABELS.templates],
      cautionNotes: [...CONFIRM_BEFORE_USE_DEFAULTS],
      sourcesUsed: [],
      message: "Unresolved category anchor.",
    };
  }

  const title = String(profile.attribute || profile.id || "Category narrative");
  const whatItIs = [String(profile.whatItMeans || profile.directAnswer || "")].filter(Boolean);
  const whyItWins = [String(profile.directAnswer || "")].filter(Boolean);
  const proof = uniqStrings([
    ...(profile.confirmedKlondikeProducts || []).map(String),
    ...(profile.possibleKlondikeProductsToVerify || []).map(String),
  ]).slice(0, 10);
  const questions = uniqStrings([...(profile.questionsToAsk || []).map(String)]);

  const sections = [
    narrativeSection("whatItIs", "What It Is", "", whatItIs.length ? whatItIs : [EMPTY_NARRATIVE_HINTS.whatItIs]),
    narrativeSection("whyItWins", "Why It Wins", "", whyItWins.length ? whyItWins : [EMPTY_NARRATIVE_HINTS.whyItWins]),
    narrativeSection(
      "operationalConsequences",
      "Operational Consequences",
      String(profile.whyCustomersAsk || ""),
      profile.whyCustomersAsk ? [] : [EMPTY_NARRATIVE_HINTS.operationalConsequences]
    ),
    narrativeSection(
      "pdsBackedProof",
      "PDS-Backed Proof",
      profile.pdsProofRequired
        ? "This category is flagged as PDS-proof heavy—quote only indexed rows or explicit PDS language."
        : "Use indexed KLONDIKE rows and PDS PDFs for proof—do not add claims beyond the file.",
      proof.length ? proof : [EMPTY_NARRATIVE_HINTS.pdsBackedProof]
    ),
    narrativeSection(
      "whereItFits",
      "Where It Fits",
      "",
      (profile.likelyProductCategories || []).length
        ? (profile.likelyProductCategories || []).map((c) => String(c).replace(/_/g, " "))
        : [EMPTY_NARRATIVE_HINTS.whereItFits]
    ),
    narrativeSection(
      "upgradeStory",
      "Upgrade Story",
      "Move from generic category talk to a named SKU trial once the OEM class and environmental clause are confirmed.",
      []
    ),
    narrativeSection(
      "repTalkTrack",
      "Rep Talk Track",
      "",
      profile.repTalkTrack ? [String(profile.repTalkTrack)] : [EMPTY_NARRATIVE_HINTS.repTalkTrack]
    ),
    narrativeSection("questionsToAsk", "Questions to Ask", "", questions.length ? questions : [EMPTY_NARRATIVE_HINTS.questionsToAsk]),
    narrativeSection(
      "confirmBeforeUse",
      "Confirm Before Use",
      "",
      uniqStrings([...CONFIRM_BEFORE_USE_DEFAULTS, ...(profile.cautionNotes || []).map(String)])
    ),
  ].filter((s) => s.body || (s.items && s.items.length > 0));

  return {
    ok: true,
    version: PRODUCT_NARRATIVE_COMPOSITION_VERSION,
    title,
    directAnswer: String(profile.directAnswer || "").slice(0, 1200),
    sections,
    followUpQuestions: questions,
    sourceBadges: [NARRATIVE_SOURCE_BADGE_LABELS.productAttribute, NARRATIVE_SOURCE_BADGE_LABELS.templates],
    cautionNotes: uniqStrings([...CONFIRM_BEFORE_USE_DEFAULTS, ...(profile.cautionNotes || []).map(String)]),
    sourcesUsed: [NARRATIVE_SOURCE_BADGE_LABELS.productAttribute, NARRATIVE_SOURCE_BADGE_LABELS.templates],
    message: `Category profile: ${profile.id}`,
  };
}

/**
 * @param {unknown} industryKeyOrQuery
 * @param {Record<string, unknown>} [context]
 */
export function buildCustomerProfileNarrative(industryKeyOrQuery, context = {}) {
  const raw = String(industryKeyOrQuery ?? "").trim();
  const industryProfile =
    (industryLubricationKnowledge[raw] || null) ||
    (context.industryKey ? industryLubricationKnowledge[String(context.industryKey)] : null) ||
    matchIndustryProfile(raw);

  if (!industryProfile) {
    return {
      ok: false,
      version: PRODUCT_NARRATIVE_COMPOSITION_VERSION,
      title: "Customer profile narrative",
      directAnswer: "No industry profile matched that key or query.",
      sections: NARRATIVE_SECTION_BLUEPRINT.map(({ id, title }) =>
        narrativeSection(id, title, "", [EMPTY_NARRATIVE_HINTS[id] || ""])
      ),
      followUpQuestions: [],
      sourceBadges: [NARRATIVE_SOURCE_BADGE_LABELS.industry, NARRATIVE_SOURCE_BADGE_LABELS.templates],
      cautionNotes: [...CONFIRM_BEFORE_USE_DEFAULTS],
      sourcesUsed: [],
      message: "Unresolved industry anchor.",
    };
  }

  const roleProfile =
    (context.roleKey && roleBasedSalesTranslationKnowledge[String(context.roleKey)]) ||
    (context.roleQuery ? matchRoleProfile(context.roleQuery) : null);
  const equipmentProfile =
    (context.equipmentKey && equipmentLubricationKnowledge[String(context.equipmentKey)]) ||
    (context.equipmentQuery ? matchEquipmentProfile(context.equipmentQuery) : null);

  const useAreas = (industryProfile.lubricantUseAreas || [])
    .flatMap((a) => [
      a?.system ? `${a.system}: ${a.salesAngle || ""}`.trim() : "",
      ...(a?.discoveryQuestions || []).map(String),
    ])
    .filter(Boolean);

  const painItems = (industryProfile.commonPainSignals || []).map(String).filter(Boolean);
  const whereItems = uniqStrings([
    ...(industryProfile.commonEquipment || []).map(String),
    ...(equipmentProfile?.lubricationSystems || []).map(String),
  ]).slice(0, 12);

  const sections = [
    narrativeSection(
      "whatItIs",
      "What It Is",
      String(industryProfile.answerSummary || ""),
      []
    ),
    narrativeSection(
      "whyItWins",
      "Why It Wins",
      `Opportunity level (internal index): ${String(industryProfile.opportunityLevel || "unspecified")}.`,
      (industryProfile.spotlightAngles || []).map(String)
    ),
    narrativeSection(
      "operationalConsequences",
      "Operational Consequences",
      "",
      painItems.length ? painItems : [EMPTY_NARRATIVE_HINTS.operationalConsequences]
    ),
    narrativeSection(
      "pdsBackedProof",
      "PDS-Backed Proof",
      "Industry lines are discovery and positioning guidance—not substitutes for SKU-level PDS proof. Once a KLONDIKE product is named, anchor claims to its PDS rows only.",
      uniqStrings(useAreas).slice(0, 10)
    ),
    narrativeSection(
      "whereItFits",
      "Where It Fits",
      "",
      whereItems.length ? whereItems : [EMPTY_NARRATIVE_HINTS.whereItFits]
    ),
    narrativeSection(
      "upgradeStory",
      "Upgrade Story",
      String(industryProfile.repTalkTrack || ""),
      uniqStrings([...(industryProfile.recommendedOpeningQuestions || []).map(String)]).slice(0, 6)
    ),
    narrativeSection(
      "repTalkTrack",
      "Rep Talk Track",
      "",
      uniqStrings([
        String(industryProfile.repTalkTrack || ""),
        ...(roleProfile?.exampleTalkTracks || []).map(String).slice(0, 2),
      ]).filter(Boolean)
    ),
    narrativeSection(
      "questionsToAsk",
      "Questions to Ask",
      "",
      uniqStrings([
        ...(industryProfile.recommendedOpeningQuestions || []).map(String),
        ...(roleProfile?.questionsToAsk || []).map(String).slice(0, 3),
        ...(equipmentProfile?.commonQuestionsToAsk || []).map(String).slice(0, 3),
      ])
    ),
    narrativeSection(
      "confirmBeforeUse",
      "Confirm Before Use",
      "",
      uniqStrings([
        ...CONFIRM_BEFORE_USE_DEFAULTS,
        ...(industryProfile.cautionNotes || []).map(String),
        ...(equipmentProfile?.cautionNotes || []).map(String),
        ...(roleProfile?.cautionNotes || []).map(String),
      ])
    ),
  ].filter((s) => s.body || (s.items && s.items.length > 0));

  return {
    ok: true,
    version: PRODUCT_NARRATIVE_COMPOSITION_VERSION,
    title: `${industryProfile.industry || industryProfile.id} — customer profile`,
    directAnswer: String(industryProfile.answerSummary || "").slice(0, 1200),
    sections,
    followUpQuestions: sections.find((s) => s.id === "questionsToAsk")?.items || [],
    sourceBadges: uniqStrings([
      NARRATIVE_SOURCE_BADGE_LABELS.industry,
      equipmentProfile ? NARRATIVE_SOURCE_BADGE_LABELS.equipment : "",
      roleProfile ? NARRATIVE_SOURCE_BADGE_LABELS.roleSales : "",
      NARRATIVE_SOURCE_BADGE_LABELS.templates,
    ]).filter(Boolean),
    cautionNotes: sections.find((s) => s.id === "confirmBeforeUse")?.items || [...CONFIRM_BEFORE_USE_DEFAULTS],
    sourcesUsed: uniqStrings([
      NARRATIVE_SOURCE_BADGE_LABELS.industry,
      NARRATIVE_SOURCE_BADGE_LABELS.templates,
    ]),
    message: `Industry profile: ${industryProfile.id}`,
  };
}

/**
 * @param {unknown} productKeyOrQuery
 * @param {Record<string, unknown>} [context]
 */
export function buildAdvisorProductExplanation(productKeyOrQuery, context = {}) {
  const base = buildProductNarrative(productKeyOrQuery, context);
  if (!base.ok) return base;

  const flagship = resolveFlagshipFromQuery(String(productKeyOrQuery ?? ""));
  const pds = resolvePdsRowFromQuery(String(productKeyOrQuery ?? ""));
  const attributeProfile =
    (context.attributeKey && productAttributeKnowledge[String(context.attributeKey)]) ||
    matchAttributeProfile(String(productKeyOrQuery ?? "")) ||
    null;
  const industryProfile =
    (context.industryKey && industryLubricationKnowledge[String(context.industryKey)]) ||
    matchIndustryProfile(String(productKeyOrQuery ?? "")) ||
    null;
  const equipmentProfile =
    (context.equipmentKey && equipmentLubricationKnowledge[String(context.equipmentKey)]) ||
    matchEquipmentProfile(String(productKeyOrQuery ?? "")) ||
    null;
  const roleProfile =
    (context.roleKey && roleBasedSalesTranslationKnowledge[String(context.roleKey)]) ||
    (context.roleQuery ? matchRoleProfile(context.roleQuery) : null);
  const troubleProfile =
    context.includeTroubleshooting === false
      ? null
      : matchTroubleshootingProfile(String(productKeyOrQuery ?? ""));

  const { sections, sourcesUsed } = composeProductNarrativeSections({
    flagship,
    pdsKey: pds?.key || null,
    pdsRow: pds?.row || null,
    attributeProfile,
    industryProfile,
    equipmentProfile,
    roleProfile,
    troubleProfile,
    mode: "advisor",
  });

  return {
    ...base,
    title: `Advisor — ${base.title}`,
    sections,
    followUpQuestions: sections.find((s) => s.id === "questionsToAsk")?.items || [],
    cautionNotes: sections.find((s) => s.id === "confirmBeforeUse")?.items || [...CONFIRM_BEFORE_USE_DEFAULTS],
    sourceBadges: sourcesUsed,
    sourcesUsed,
    message: "Advisor-tightened narrative (shorter lists).",
  };
}

/**
 * @param {string} type
 * @param {unknown} query
 * @param {Record<string, unknown>} [context]
 */
export function buildSalesEnablementSpotlightNarrative(type, query, context = {}) {
  const t = String(type ?? "").trim();
  if (!SALES_ENABLEMENT_SPOTLIGHT_TYPES.includes(t)) {
    return {
      ok: false,
      version: PRODUCT_NARRATIVE_COMPOSITION_VERSION,
      title: "Sales enablement spotlight",
      directAnswer: `Unknown spotlight type "${t}". Expected one of: ${SALES_ENABLEMENT_SPOTLIGHT_TYPES.join(", ")}.`,
      sections: [],
      followUpQuestions: [],
      sourceBadges: [NARRATIVE_SOURCE_BADGE_LABELS.templates],
      cautionNotes: [...CONFIRM_BEFORE_USE_DEFAULTS],
      sourcesUsed: [],
      message: "Invalid type",
    };
  }

  const q = String(query ?? "").trim();

  if (t === "product_spotlight") {
    const r = buildProductNarrative(q, context);
    return { ...r, title: `Spotlight — ${r.title}`, message: r.message || "product_spotlight" };
  }
  if (t === "category_spotlight") {
    const r = buildCategoryNarrative(q, context);
    return { ...r, title: `Spotlight — ${r.title}`, message: r.message || "category_spotlight" };
  }
  if (t === "customer_profile") {
    const r = buildCustomerProfileNarrative(q, context);
    return { ...r, title: `Spotlight — ${r.title}`, message: r.message || "customer_profile" };
  }
  if (t === "advisor_product_explanation") {
    return buildAdvisorProductExplanation(q, context);
  }
  if (t === "product_differentiation") {
    const flagship = resolveFlagshipFromQuery(q);
    const pds = resolvePdsRowFromQuery(q);
    if (!flagship && !pds?.row) {
      return buildAdvisorProductExplanation(q, { ...context, includeTroubleshooting: false });
    }
    const attributeProfile =
      (context.attributeKey && productAttributeKnowledge[String(context.attributeKey)]) ||
      matchAttributeProfile(q) ||
      null;
    const { sections, sourcesUsed } = composeProductNarrativeSections({
      flagship,
      pdsKey: pds?.key || null,
      pdsRow: pds?.row || null,
      attributeProfile,
      industryProfile: null,
      equipmentProfile: null,
      roleProfile: null,
      troubleProfile: null,
      mode: "differentiation",
    });
    const title = flagship?.productName || pds?.key || "Product differentiation";
    const directAnswer =
      (flagship?.whatMakesThisDifferent || []).join(" ") ||
      flagship?.whyItWins ||
      String(pds?.row?.why || "");
    return {
      ok: true,
      version: PRODUCT_NARRATIVE_COMPOSITION_VERSION,
      title: `Differentiation — ${title}`,
      directAnswer: String(directAnswer).slice(0, 1200),
      sections,
      followUpQuestions: sections.find((s) => s.id === "questionsToAsk")?.items || [],
      sourceBadges: sourcesUsed,
      cautionNotes: sections.find((s) => s.id === "confirmBeforeUse")?.items || [...CONFIRM_BEFORE_USE_DEFAULTS],
      sourcesUsed,
      message: "product_differentiation",
    };
  }
  if (t === "rep_talk_track") {
    const flagship = resolveFlagshipFromQuery(q);
    const pds = resolvePdsRowFromQuery(q);
    const attributeProfile =
      (context.attributeKey && productAttributeKnowledge[String(context.attributeKey)]) ||
      matchAttributeProfile(q) ||
      null;
    const roleProfile =
      (context.roleKey && roleBasedSalesTranslationKnowledge[String(context.roleKey)]) ||
      (context.roleQuery ? matchRoleProfile(context.roleQuery) : null);
    const { sections, sourcesUsed } = composeProductNarrativeSections({
      flagship,
      pdsKey: pds?.key || null,
      pdsRow: pds?.row || null,
      attributeProfile,
      industryProfile: null,
      equipmentProfile: null,
      roleProfile,
      troubleProfile: null,
      mode: "repTalkHeavy",
    });
    const title = flagship?.productName || pds?.key || "Rep talk track";
    return {
      ok: true,
      version: PRODUCT_NARRATIVE_COMPOSITION_VERSION,
      title: `Rep talk — ${title}`,
      directAnswer:
        (flagship?.repTalkTrack || []).join(" ") ||
        String(pds?.row?.why || "Lead with one verifiable proof line from the PDS index, then ask duty questions."),
      sections,
      followUpQuestions: sections.find((s) => s.id === "questionsToAsk")?.items || [],
      sourceBadges: sourcesUsed,
      cautionNotes: sections.find((s) => s.id === "confirmBeforeUse")?.items || [...CONFIRM_BEFORE_USE_DEFAULTS],
      sourcesUsed,
      message: "rep_talk_track",
    };
  }

  return {
    ok: false,
    version: PRODUCT_NARRATIVE_COMPOSITION_VERSION,
    title: "Sales enablement spotlight",
    directAnswer: "Unhandled spotlight type.",
    sections: [],
    followUpQuestions: [],
    sourceBadges: [],
    cautionNotes: [...CONFIRM_BEFORE_USE_DEFAULTS],
    sourcesUsed: [],
    message: "Unhandled",
  };
}
