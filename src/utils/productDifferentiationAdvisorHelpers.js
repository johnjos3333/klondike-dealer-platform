/**
 * Deterministic product differentiation coaching for reps (flagship narratives + PDS map index).
 * Plain JavaScript only; not wired to UI yet.
 *
 * Flagship “product intelligence” is sourced from `flagshipNarratives.js` + narrative lookup.
 */

import { SALES_ENABLEMENT_FLAGSHIP_NARRATIVES } from "../data/salesEnablement/flagshipNarratives.js";
import {
  getSalesEnablementFlagshipNarrativeByProductName,
  normalizeSalesEnablementFlagshipProductNameLabel,
} from "../data/salesEnablement/salesEnablementFlagshipNarrativeLookup.js";
import { PDS_MAP } from "../data/pdsMap.js";
import { normalizeProductQuery, searchKlondikeProducts } from "./klondikeProductRetrievalHelpers.js";
import { buildAdvisorProductExplanation, buildProductNarrative } from "./productNarrativeComposer.js";
import {
  isNanoEp2FlagshipId,
  NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE,
} from "../data/flagshipProductIntelligence.js";

const DETECTION_MIN_SCORE = 16;

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
 * @param {{ id?: string, body?: string, items?: string[] } | null | undefined} sec
 */
function pickSectionStrings(sec) {
  if (!sec) return [];
  const items = Array.isArray(sec.items) ? sec.items.map((x) => String(x).trim()).filter(Boolean) : [];
  const b = sec.body ? [String(sec.body).trim()].filter(Boolean) : [];
  return uniqStrings([...b, ...items]);
}

/**
 * @param {{ body?: string, items?: string[] } | null | undefined} sec
 */
function pickItemsOnly(sec) {
  if (!sec) return [];
  return Array.isArray(sec.items) ? sec.items.map((x) => String(x).trim()).filter(Boolean) : [];
}

/**
 * @param {string} id
 * @param {string} title
 * @param {string} [body]
 * @param {string[]} [items]
 */
function section(id, title, body, items) {
  return { id, title, ...(body ? { body } : {}), ...(items?.length ? { items } : {}) };
}

/**
 * Map composer narrative sections (whatItIs / pdsBackedProof / …) into differentiation section ids.
 * @param {Array<{ id: string, title: string, body?: string, items?: string[] }>} narrativeSections
 */
function mapNarrativeSectionsToDifferentiationSections(narrativeSections) {
  const list = Array.isArray(narrativeSections) ? narrativeSections : [];
  const byId = Object.fromEntries(list.map((s) => [s.id, s]));

  const whatItIs = byId.whatItIs;
  const whyItWins = byId.whyItWins;
  const opCon = byId.operationalConsequences;
  const pdsBacked = byId.pdsBackedProof;
  const where = byId.whereItFits;
  const upgrade = byId.upgradeStory;
  const rep = byId.repTalkTrack;
  const questions = byId.questionsToAsk;
  const confirm = byId.confirmBeforeUse;

  const wmidItems = uniqStrings([...pickSectionStrings(whatItIs), ...pickSectionStrings(whyItWins)]).slice(0, 14);

  const whyBody = [String(whyItWins?.body ?? "").trim(), String(opCon?.body ?? "").trim()].filter(Boolean).join(" ").trim();
  const whyItems = pickSectionStrings(opCon);

  /** @type {Array<{ id: string, title: string, body?: string, items?: string[] }>} */
  const out = [];

  if (wmidItems.length) {
    out.push(section("whatMakesItDifferent", "What Makes It Different", "", wmidItems));
  }
  if (whyBody || whyItems.length) {
    out.push(section("whyItMatters", "Why It Matters", whyBody, whyItems));
  }
  if (pdsBacked) {
    const pdsBody =
      String(pdsBacked.body ?? "").trim() ||
      "Below are narrative proof points that reference indexed PDS language—repeat only what is printed and current for the customer’s revision.";
    const pdsItems = uniqStrings([...pickItemsOnly(pdsBacked), ...pickSectionStrings(pdsBacked)]).filter((line) => line && line !== pdsBody);
    out.push(section("pdsSpecProof", "PDS / Spec Proof", pdsBody, pdsItems));
  }
  if (where && (where.body || (where.items && where.items.length))) {
    out.push(section("whereItFits", "Where It Fits", String(where.body ?? "").trim(), pickItemsOnly(where)));
  }
  if (upgrade && (upgrade.body || (upgrade.items && upgrade.items.length))) {
    out.push(section("upgradeStory", "Upgrade Story", String(upgrade.body ?? "").trim(), pickItemsOnly(upgrade)));
  }
  if (rep && (rep.body || (rep.items && rep.items.length))) {
    out.push(section("repTalkTrack", "Rep Talk Track", String(rep.body ?? "").trim(), pickItemsOnly(rep)));
  }
  if (questions && (questions.body || (questions.items && questions.items.length))) {
    out.push(section("questionsToAsk", "Questions to Ask", String(questions.body ?? "").trim(), pickItemsOnly(questions)));
  }
  if (confirm && (confirm.body || (confirm.items && confirm.items.length))) {
    out.push(section("confirmBeforeUse", "Confirm Before Use", String(confirm.body ?? "").trim(), pickItemsOnly(confirm)));
  }

  return out.filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {{ ok?: boolean, directAnswer?: string, sections?: unknown[] }} r
 */
function isComposerResultUsable(r) {
  if (!r || r.ok !== true) return false;
  const da = String(r.directAnswer ?? "").trim();
  if (da.length >= 24) return true;
  const secs = Array.isArray(r.sections) ? r.sections : [];
  return secs.some((s) => {
    if (!s || typeof s !== "object") return false;
    const body = String(/** @type {{ body?: string }} */ (s).body ?? "").trim();
    const items = /** @type {{ items?: string[] }} */ (s).items;
    return Boolean(body) || (Array.isArray(items) && items.some((x) => String(x ?? "").trim()));
  });
}

/**
 * @param {string} question
 * @param {{
 *   source: "flagship" | "pds" | "search" | "none",
 *   label: string,
 *   flagship: import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative | null,
 *   productKey: string | null,
 * }} resolved
 * @param {string[]} cautionNotes
 * @param {string[]} followUpQuestions
 */
function tryDifferentiationFromComposer(question, resolved, cautionNotes, followUpQuestions) {
  /** @type {{ ok?: boolean, title?: string, directAnswer?: string, sections?: unknown[], followUpQuestions?: string[], sourceBadges?: string[], cautionNotes?: string[], message?: string } | null} */
  let composed = null;
  try {
    composed = buildAdvisorProductExplanation(question);
  } catch {
    composed = null;
  }
  if (!isComposerResultUsable(composed)) {
    try {
      composed = buildProductNarrative(question);
    } catch {
      composed = null;
    }
  }
  if (!isComposerResultUsable(composed) || !composed) return null;

  const sections = mapNarrativeSectionsToDifferentiationSections(
    /** @type {Array<{ id: string, title: string, body?: string, items?: string[] }>} */ (composed.sections || [])
  );
  if (!sections.length && !String(composed.directAnswer ?? "").trim()) return null;

  const titleBase = resolved.label || String(composed.title ?? "").replace(/^Advisor — /, "").trim() || "Product";
  const directAnswer =
    String(composed.directAnswer ?? "").trim() ||
    "Use the sections below and keep proof points tied to indexed PDS language and internal narrative text only.";

  const mergedFollowUps = uniqStrings([
    ...(Array.isArray(composed.followUpQuestions) ? composed.followUpQuestions.map(String) : []),
    ...followUpQuestions,
  ]).slice(0, 12);

  const mergedCautions = uniqStrings([...cautionNotes, ...(Array.isArray(composed.cautionNotes) ? composed.cautionNotes.map(String) : [])]);

  const resolutionMsg =
    resolved.source === "flagship" && resolved.flagship
      ? `Anchored on flagship profile: ${resolved.flagship.id}.`
      : `Anchored on PDS map row: ${resolved.productKey || resolved.label}.`;

  const sourceBadges = uniqStrings([
    ...(Array.isArray(composed.sourceBadges) ? composed.sourceBadges.map(String) : []),
    "Product differentiation",
    resolved.source === "flagship" ? "Flagship product intelligence" : "",
    resolved.source === "search" || resolved.source === "pds" ? "PDS map index" : "",
    resolved.source === "search" ? "Retrieval-assisted match" : "",
  ]).filter(Boolean);

  return {
    ok: true,
    title: `${titleBase} — differentiation`,
    directAnswer,
    sections,
    followUpQuestions: mergedFollowUps.length ? mergedFollowUps : followUpQuestions,
    sourceBadges: sourceBadges.length ? sourceBadges : ["Product differentiation", "Deterministic coaching"],
    cautionNotes: mergedCautions,
    message: `${resolutionMsg} ${String(composed.message ?? "").trim()}`.trim(),
  };
}

/**
 * Normalize common shorthand so flagship / PDS substring checks still hit.
 * @param {string} n
 */
function relaxNormalizedProductQuery(n) {
  return String(n ?? "")
    .replace(/\bnano ep2\b/g, "nano ep 2")
    .replace(/\bep2\b/g, "ep 2");
}

/** @returns {import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative[]} */
function listFlagships() {
  const list = SALES_ENABLEMENT_FLAGSHIP_NARRATIVES?.flagships;
  return Array.isArray(list) ? list : [];
}

/**
 * Strip common differentiation question boilerplate for name lookup.
 * @param {string} raw
 */
function stripDifferentiationCues(raw) {
  let s = String(raw ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (!s) return "";

  const stripLead = [
    /^what\s*'?\s*s\s+different\s+about\s+/i,
    /^whats\s+different\s+about\s+/i,
    /^what\s+is\s+different\s+about\s+/i,
    /^what\s+makes\s+/i,
    /^what\s*'?\s*s\s+special\s+about\s+/i,
    /^whats\s+special\s+about\s+/i,
    /^what\s+is\s+special\s+about\s+/i,
    /^why\s+sell\s+/i,
    /^why\s+recommend\s+/i,
    /^why\s+use\s+/i,
    /^why\s+choose\s+/i,
    /^what\s+sets\s+/i,
    /^how\s+is\s+/i,
  ];
  for (const rx of stripLead) {
    s = s.replace(rx, " ").trim();
  }

  s = s.replace(/\bdifferent\s*$/i, "").replace(/\bdifferent\s+\?$/i, "").trim();
  s = s.replace(/\bapart\s*$/i, "").trim();
  s = s.replace(/\bklondike\s+/gi, " ").replace(/\s+/g, " ").trim();
  s = s.replace(/[?.!]+$/g, "").trim();

  return s;
}

/**
 * Resolve flagship narrative, PDS row key, or retrieval top hit.
 * @param {string} question
 * @returns {{
 *   source: "flagship" | "pds" | "search" | "none",
 *   label: string,
 *   flagship: import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative | null,
 *   productKey: string | null,
 * }}
 */
function resolveDifferentiationProduct(question) {
  const normQ = normalizeProductQuery(question);
  if (!normQ) return { source: "none", label: "", flagship: null, productKey: null };
  const normQr = relaxNormalizedProductQuery(normQ);

  /** @type {import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative | null} */
  let bestFlagship = null;
  let bestFlagshipLen = 0;
  for (const f of listFlagships()) {
    if (!f || typeof f !== "object") continue;
    const pn = normalizeSalesEnablementFlagshipProductNameLabel(f.productName);
    if (pn.length < 6) continue;
    if (normQr.includes(pn) && pn.length > bestFlagshipLen) {
      bestFlagship = f;
      bestFlagshipLen = pn.length;
    }
  }
  if (bestFlagship) {
    return {
      source: "flagship",
      label: bestFlagship.productName,
      flagship: bestFlagship,
      productKey: null,
    };
  }

  const stripped = stripDifferentiationCues(question);
  if (stripped.length >= 3) {
    const byName = getSalesEnablementFlagshipNarrativeByProductName(stripped);
    if (byName) {
      return { source: "flagship", label: byName.productName, flagship: byName, productKey: null };
    }
    const strippedNorm = normalizeProductQuery(stripped);
    if (strippedNorm === "nano ep2" || strippedNorm === "nano ep 2") {
      const nano = getSalesEnablementFlagshipNarrativeByProductName("Nano EP 2 Grease");
      if (nano) return { source: "flagship", label: nano.productName, flagship: nano, productKey: null };
    }
  }

  const search = searchKlondikeProducts(question);
  const top = search.matches?.[0];
  if (top && top.score >= 12) {
    return { source: "search", label: top.productKey, flagship: null, productKey: top.productKey };
  }

  const pdsKeys = Object.keys(PDS_MAP).sort((a, b) => b.length - a.length);
  for (const key of pdsKeys) {
    const nk = normalizeProductQuery(key);
    if (nk.length < 5) continue;
    if (normQr.includes(nk)) {
      return { source: "pds", label: key, flagship: null, productKey: key };
    }
  }

  if (top?.productKey) {
    return { source: "search", label: top.productKey, flagship: null, productKey: top.productKey };
  }

  return { source: "none", label: "", flagship: null, productKey: null };
}

/**
 * Score differentiation intent from normalized query text.
 * @param {string} normQ
 */
function scoreDifferentiationCues(normQ) {
  let score = 0;
  if (normQ.includes("different about")) score = Math.max(score, 22);
  if (normQ.includes("what makes")) score = Math.max(score, 18);
  if (normQ.includes("what s special about") || normQ.includes("whats special about")) {
    score = Math.max(score, 20);
  }
  if (normQ.includes("special about")) score = Math.max(score, 14);
  if (normQ.includes("why sell")) score = Math.max(score, 18);
  if (normQ.includes("why recommend")) score = Math.max(score, 18);
  if (normQ.includes("why use")) score = Math.max(score, 15);
  if (normQ.includes("why choose")) score = Math.max(score, 16);
  if (normQ.includes("what sets") && normQ.includes("apart")) score = Math.max(score, 20);
  if (normQ.includes("what sets")) score = Math.max(score, 12);
  if (normQ.includes("how is") && normQ.includes("different")) score = Math.max(score, 18);
  return score;
}

/**
 * @param {unknown} inputText
 * @returns {Array<{ id: string, score: number }>}
 */
export function detectProductDifferentiationIntent(inputText) {
  const question = String(inputText ?? "").trim();
  if (!question) return [];

  const normQ = normalizeProductQuery(question);
  const cueScore = scoreDifferentiationCues(normQ);
  if (cueScore < 12) return [];

  const resolved = resolveDifferentiationProduct(question);
  let score = cueScore;
  if (resolved.source !== "none") score += 14;
  if (score < DETECTION_MIN_SCORE) return [];

  return [{ id: "product_differentiation", score: Math.min(72, score) }];
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
 *   message?: string,
 * }}
 */
export function buildProductDifferentiationResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const empty = {
    ok: false,
    title: "",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: ["Product differentiation", "Deterministic coaching"],
    cautionNotes: [],
    message: "",
  };

  if (!detectProductDifferentiationIntent(question).length) {
    return {
      ...empty,
      message: "No product differentiation cue detected.",
      directAnswer:
        "Try asking what makes a specific KLONDIKE product different, why to recommend it, or how it compares—using the product name from the catalog or PDS index.",
    };
  }

  const resolved = resolveDifferentiationProduct(question);
  if (resolved.source === "none") {
    return {
      ...empty,
      message: "Could not anchor to a flagship profile or indexed PDS row.",
      title: "Product differentiation",
      directAnswer:
        "The question reads like a differentiation ask, but no flagship profile or PDS map row name matched clearly. Name the KLONDIKE product as printed on the PDS or price sheet, then ask again.",
      followUpQuestions: [
        "What is the exact product name on the PDS title block?",
        "Is this a flagship spotlight product or a standard catalog row?",
      ],
      cautionNotes: [
        "Do not invent positioning—anchor to flagship narratives or indexed PDS fields only.",
      ],
    };
  }

  const cautionNotes = [
    "Keep claims inside the current PDS revision and internal flagship narrative text—no new approvals or lab results.",
    "When stakes are high, have technical validate before you quote OEM or warranty language.",
  ];

  const followUpQuestions = [
    "What equipment, duty cycle, and fluid drain interval are they running today?",
    "What does their incumbent product claim on the data sheet—and where does ours win on paper?",
    "What proof does the buyer need for their file (PDS, trial, OEM letter)?",
  ];

  const fromComposer = tryDifferentiationFromComposer(question, resolved, cautionNotes, followUpQuestions);
  if (fromComposer) return fromComposer;

  if (resolved.source === "flagship" && resolved.flagship) {
    const f = resolved.flagship;
    const nanoIntel = isNanoEp2FlagshipId(f.id) ? NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE : null;
    const whatDifferent = nanoIntel
      ? [...nanoIntel.keyDifferentiators]
      : [...(f.whatMakesThisDifferent || []), ...(f.keyDifferentiators || [])].filter(Boolean).slice(0, 12);
    const whyMattersBody = nanoIntel
      ? nanoIntel.whyItWins
      : [f.whyItWins, f.flagshipPositioning].filter(Boolean).join(" ");
    const proofItems = nanoIntel
      ? [...nanoIntel.premiumProofPoints]
      : [...(f.premiumProofPoints || [])].filter(Boolean).slice(0, 10);
    const whereItems = nanoIntel
      ? [...nanoIntel.severeDutyUseCases]
      : [...(f.severeDutyUseCases || []), ...(f.operationalConsequences || [])].filter(Boolean).slice(0, 10);
    const repItems = nanoIntel
      ? [...nanoIntel.repTalkTrack]
      : [...(f.repTalkTrack || [])].filter(Boolean).slice(0, 8);
    const confirmItems = nanoIntel
      ? [...nanoIntel.confirmBeforeUse, ...nanoIntel.doNotSay, ...cautionNotes]
      : [...(f.doNotSay || []), ...cautionNotes].filter(Boolean);
    const nanoFollowUps = nanoIntel ? [...nanoIntel.questionsToAsk] : followUpQuestions;

    const sections = [
      section("whatMakesItDifferent", "What Makes It Different", nanoIntel?.whatItIsIntro || "", whatDifferent),
      section(
        "whyItMatters",
        "Why It Matters",
        whyMattersBody,
        nanoIntel
          ? []
          : [...(f.operationalWins || []), ...(f.customerPainSignals || [])].filter(Boolean).slice(0, 10)
      ),
      section(
        "pdsSpecProof",
        "PDS / Spec Proof",
        "Below are narrative proof points that reference indexed PDS language—repeat only what is printed and current for the customer’s revision.",
        proofItems
      ),
      section("whereItFits", "Where It Fits", "", whereItems),
      section(
        "upgradeStory",
        "Upgrade Story",
        "",
        nanoIntel
          ? []
          : [...(f.emotionalSalesAngles || []), ...(f.dealerTalkingPoints || [])].filter(Boolean).slice(0, 10)
      ),
      section("repTalkTrack", "Rep Talk Track", "", repItems),
      section("questionsToAsk", "Questions to Ask", "", nanoFollowUps),
      section("confirmBeforeUse", "Confirm Before Use", "", confirmItems),
    ].filter((s) => s.body || (s.items && s.items.length > 0));

    return {
      ok: true,
      title: `${f.productName} — differentiation`,
      directAnswer: nanoIntel
        ? nanoIntel.whyItWins
        : f.whyItWins ||
          (f.whatMakesThisDifferent && f.whatMakesThisDifferent[0]) ||
          f.flagshipNarrativeParagraph ||
          f.flagshipPositioning ||
          `Use the flagship narrative for ${f.productName} and keep proof points tied to indexed PDS language.`,
      sections,
      followUpQuestions: nanoFollowUps,
      sourceBadges: nanoIntel
        ? ["Flagship product intelligence", "Nano EP 2 canonical intelligence", "PDS-indexed narrative"]
        : ["Flagship product intelligence", "PDS-indexed narrative"],
      cautionNotes: nanoIntel ? [...nanoIntel.confirmBeforeUse] : cautionNotes,
      message: nanoIntel
        ? `Anchored on flagship profile: ${f.id} (canonical Nano EP 2 intelligence).`
        : `Anchored on flagship profile: ${f.id}.`,
    };
  }

  const key = resolved.productKey;
  const row = key && PDS_MAP[key] ? PDS_MAP[key] : null;
  if (!row || typeof row !== "object") {
    return {
      ...empty,
      message: "PDS row missing after resolution.",
      title: "Product differentiation",
      directAnswer: "Resolved a product label but the PDS map entry was not found. Confirm the catalog name and retry.",
    };
  }

  const why = String(row.why || "").trim();
  const specs = Array.isArray(row.specs) ? row.specs.map((s) => String(s)).filter(Boolean) : [];
  const url = String(row.url || "").trim();

  const sections = [
    section(
      "whatMakesItDifferent",
      "What Makes It Different",
      why ||
        "Differentiation is limited to what is summarized in the indexed PDS map row—open the PDS PDF for the full positioning story.",
      []
    ),
    section(
      "whyItMatters",
      "Why It Matters",
      "Use indexed summary lines to explain operating value; avoid extrapolating beyond what the map and PDS print.",
      why ? [why.slice(0, 280)] : []
    ),
    section("pdsSpecProof", "PDS / Spec Proof", url ? `PDS path: ${url}` : "Open the current PDS PDF for the authoritative spec table.", specs.slice(0, 8)),
    section(
      "whereItFits",
      "Where It Fits",
      "Map this row to the customer’s equipment class and duty from the PDS application language—do not assume OEM approval without the printed line.",
      []
    ),
    section(
      "upgradeStory",
      "Upgrade Story",
      "Without a flagship narrative match, sell the upgrade using verifiable index fields (spec bullets, fluid family, duty language) and a disciplined trial plan.",
      []
    ),
    section(
      "repTalkTrack",
      "Rep Talk Track",
      "",
      [
        `Lead with the row title “${key}” and one concrete spec line the buyer can verify on the PDS.`,
        "Ask what fluid name and OEM spec string they run today, then compare only printed claims.",
      ]
    ),
    section("questionsToAsk", "Questions to Ask", "", followUpQuestions),
    section(
      "confirmBeforeUse",
      "Confirm Before Use",
      "",
      [
        ...cautionNotes,
        "No flagship spotlight narrative was matched—differentiation detail may be thinner until technical maps the full PDS.",
      ]
    ),
  ].filter((s) => s.body || (s.items && s.items.length > 0));

  return {
    ok: true,
    title: `${key} — differentiation`,
    directAnswer:
      why ||
      (specs[0] ? `Indexed PDS map highlights: ${specs[0]}` : `Differentiation for ${key} is anchored on the indexed PDS map entry—confirm details on the live PDS.`),
    sections,
    followUpQuestions,
    sourceBadges:
      resolved.source === "search"
        ? ["PDS map index", "Retrieval-assisted match"]
        : ["PDS map index"],
    cautionNotes,
    message: `Anchored on PDS map row: ${key}.`,
  };
}
