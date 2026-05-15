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

const DETECTION_MIN_SCORE = 16;

/**
 * Normalize common shorthand so flagship / PDS substring checks still hit.
 * @param {string} n
 */
function relaxNormalizedProductQuery(n) {
  return String(n ?? "")
    .replace(/\bnano ep2\b/g, "nano ep 2")
    .replace(/\bep2\b/g, "ep 2");
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

  if (resolved.source === "flagship" && resolved.flagship) {
    const f = resolved.flagship;
    const sections = [
      section(
        "whatMakesItDifferent",
        "What Makes It Different",
        "",
        [...(f.whatMakesThisDifferent || []), ...(f.keyDifferentiators || [])].filter(Boolean).slice(0, 12)
      ),
      section(
        "whyItMatters",
        "Why It Matters",
        [f.whyItWins, f.flagshipPositioning].filter(Boolean).join(" "),
        [...(f.operationalWins || []), ...(f.customerPainSignals || [])].filter(Boolean).slice(0, 10)
      ),
      section(
        "pdsSpecProof",
        "PDS / Spec Proof",
        "Below are narrative proof points that reference indexed PDS language—repeat only what is printed and current for the customer’s revision.",
        [...(f.premiumProofPoints || [])].filter(Boolean).slice(0, 10)
      ),
      section(
        "whereItFits",
        "Where It Fits",
        "",
        [...(f.severeDutyUseCases || []), ...(f.operationalConsequences || [])].filter(Boolean).slice(0, 10)
      ),
      section(
        "upgradeStory",
        "Upgrade Story",
        "",
        [...(f.emotionalSalesAngles || []), ...(f.dealerTalkingPoints || [])].filter(Boolean).slice(0, 10)
      ),
      section("repTalkTrack", "Rep Talk Track", "", [...(f.repTalkTrack || [])].filter(Boolean).slice(0, 8)),
      section("questionsToAsk", "Questions to Ask", "", followUpQuestions),
      section(
        "confirmBeforeUse",
        "Confirm Before Use",
        "",
        [...(f.doNotSay || []), ...cautionNotes].filter(Boolean)
      ),
    ].filter((s) => s.body || (s.items && s.items.length > 0));

    return {
      ok: true,
      title: `${f.productName} — differentiation`,
      directAnswer:
        f.whyItWins ||
        (f.whatMakesThisDifferent && f.whatMakesThisDifferent[0]) ||
        f.flagshipNarrativeParagraph ||
        f.flagshipPositioning ||
        `Use the flagship narrative for ${f.productName} and keep proof points tied to indexed PDS language.`,
      sections,
      followUpQuestions,
      sourceBadges: ["Flagship product intelligence", "PDS-indexed narrative"],
      cautionNotes,
      message: `Anchored on flagship profile: ${f.id}.`,
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
