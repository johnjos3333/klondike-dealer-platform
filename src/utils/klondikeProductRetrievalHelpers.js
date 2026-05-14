/**
 * Klondike product retrieval — deterministic search over `PDS_MAP` for advisor use.
 * Plain JavaScript only; not wired to UI yet.
 */

import { PDS_MAP } from "../data/pdsMap.js";
import { KLONDIKE_PRODUCT_QUERY_EXPANSION_GROUPS } from "../data/klondikeProductRetrievalAliases.js";

const MIN_SCORE_TO_INCLUDE = 10;
const MAX_RESULTS = 22;

const STOP_WORDS = new Set([
  "does",
  "do",
  "did",
  "klondike",
  "what",
  "which",
  "where",
  "when",
  "why",
  "how",
  "the",
  "a",
  "an",
  "and",
  "or",
  "for",
  "with",
  "from",
  "into",
  "there",
  "any",
  "some",
  "all",
  "our",
  "we",
  "you",
  "can",
  "could",
  "would",
  "should",
  "carry",
  "carries",
  "carrying",
  "have",
  "has",
  "having",
  "offer",
  "offers",
  "offering",
  "sell",
  "sells",
  "list",
  "give",
  "show",
  "tell",
  "me",
  "us",
  "about",
  "products",
  "product",
  "line",
  "lines",
  "sku",
  "skus",
  "available",
  "meet",
  "meets",
  "meeting",
  "compatible",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "get",
  "gets",
  "got",
  "need",
  "needs",
  "want",
  "wants",
  "use",
  "uses",
  "using",
  "type",
  "types",
  "kind",
  "kinds",
]);

/**
 * @param {unknown} raw
 * @returns {string}
 */
export function normalizeProductQuery(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {unknown} inputText
 * @returns {{ originalTokens: string[], expandedTerms: string[], allTerms: string[], triggeredGroupIds: string[] }}
 */
export function expandProductQueryTerms(inputText) {
  const fullNorm = normalizeProductQuery(inputText);
  const rawTokens = fullNorm.split(" ").filter((t) => t.length >= 2 && !STOP_WORDS.has(t));
  const originalTokens = [...new Set(rawTokens)];

  /** @type {Set<string>} */
  const expanded = new Set();
  /** @type {string[]} */
  const triggeredGroupIds = [];

  for (const group of KLONDIKE_PRODUCT_QUERY_EXPANSION_GROUPS) {
    const hit = group.triggers.some((tr) => fullNorm.includes(normalizeProductQuery(tr)));
    if (!hit) continue;
    triggeredGroupIds.push(group.id);
    for (const term of group.expandTerms) {
      const nt = normalizeProductQuery(term);
      if (nt.length >= 2) expanded.add(nt);
    }
  }

  const expandedTerms = [...expanded].filter((t) => !originalTokens.includes(t));
  const allTerms = [...new Set([...originalTokens, ...expandedTerms])];

  return { originalTokens, expandedTerms, allTerms, triggeredGroupIds };
}

/**
 * @param {string[]} specs
 */
function normalizeSpecLines(specs) {
  if (!Array.isArray(specs)) return [];
  return specs.map((s) => normalizeProductQuery(s)).filter(Boolean);
}

/**
 * @param {string[]} originalTokens
 * @param {string[]} specsNorm
 */
function originalTokenHitsSpecs(originalTokens, specsNorm) {
  for (const t of originalTokens) {
    if (t.length < 3) continue;
    for (const line of specsNorm) {
      if (line.includes(t)) return true;
    }
  }
  return false;
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   matches: Array<{
 *     productKey: string,
 *     url: string,
 *     why: string,
 *     specs: string[],
 *     score: number,
 *     matchKind: "PDS/spec match" | "Category match" | "PDS index match",
 *     matchReasons: string[],
 *     specEvidence: string[],
 *   }>,
 *   originalTokens: string[],
 *   expandedTerms: string[],
 *   triggeredGroupIds: string[],
 * }}
 */
export function searchKlondikeProducts(inputText) {
  const { originalTokens, expandedTerms, allTerms, triggeredGroupIds } = expandProductQueryTerms(inputText);
  const originalSet = new Set(originalTokens);

  if (!allTerms.length) {
    return { matches: [], originalTokens, expandedTerms, triggeredGroupIds };
  }

  /** @type {any[]} */
  const matches = [];

  for (const [productKey, record] of Object.entries(PDS_MAP)) {
    if (!record || typeof record !== "object") continue;

    const url = String(record.url || "");
    const why = String(record.why || "");
    const specs = Array.isArray(record.specs) ? record.specs.map((s) => String(s)) : [];
    const aliases = Array.isArray(record.aliases) ? record.aliases.map((a) => String(a)) : [];

    const normKey = normalizeProductQuery(productKey);
    const normWhy = normalizeProductQuery(why);
    const normUrl = normalizeProductQuery(url);
    const normAliases = aliases.map((a) => normalizeProductQuery(a)).filter(Boolean);
    const specsNorm = normalizeSpecLines(specs);

    let score = 0;
    /** @type {string[]} */
    const matchReasons = [];
    /** @type {string[]} */
    const specEvidence = [];
    let expansionOnlyScore = 0;
    let expansionSpecHit = false;

    for (const term of allTerms) {
      if (term.length < 2) continue;
      const fromOriginal = originalSet.has(term);
      const weight = 4 + Math.min(term.length, 14);

      let hitSpecs = false;
      for (let si = 0; si < specsNorm.length; si++) {
        const line = specsNorm[si];
        if (!line.includes(term)) continue;
        hitSpecs = true;
        const pts = 18 + Math.min(term.length, 12);
        score += pts;
        if (!fromOriginal) expansionSpecHit = true;
        if (fromOriginal && specEvidence.length < 4) {
          const rawLine = specs[si] != null ? String(specs[si]) : line;
          const ev = rawLine.slice(0, 120);
          if (!specEvidence.includes(ev)) specEvidence.push(ev);
        }
        if (!fromOriginal) expansionOnlyScore += pts;
        break;
      }

      if (hitSpecs) {
        if (fromOriginal) matchReasons.push(`Spec line contains "${term}" (from your query)`);
        else matchReasons.push(`Spec line contains "${term}" (from category expansion)`);
        continue;
      }

      if (normKey.includes(term)) {
        score += 14 + weight;
        if (fromOriginal) {
          matchReasons.push(`Product name contains "${term}"`);
        } else {
          expansionOnlyScore += 14 + weight;
          matchReasons.push(`Product name contains "${term}" (expansion)`);
        }
        continue;
      }

      let aliasHit = false;
      for (let i = 0; i < normAliases.length; i++) {
        if (!normAliases[i].includes(term)) continue;
        aliasHit = true;
        score += 12 + weight;
        if (fromOriginal) {
          matchReasons.push(`Alias contains "${term}"`);
        } else {
          expansionOnlyScore += 12 + weight;
          matchReasons.push(`Alias contains "${term}" (expansion)`);
        }
        break;
      }
      if (aliasHit) continue;

      if (normUrl.includes(term)) {
        score += 9 + weight;
        if (!fromOriginal) expansionOnlyScore += 9 + weight;
        matchReasons.push(`PDS path/url contains "${term}"`);
        continue;
      }

      if (normWhy.includes(term)) {
        score += 7 + weight;
        if (!fromOriginal) expansionOnlyScore += 7 + weight;
        matchReasons.push(`Summary text contains "${term}"`);
      }
    }

    if (score < MIN_SCORE_TO_INCLUDE) continue;

    const specHitFromOriginal = originalTokenHitsSpecs(originalTokens, specsNorm);

    let matchKind = "PDS index match";
    if (specHitFromOriginal) {
      matchKind = "PDS/spec match";
    } else if (expansionSpecHit || expansionOnlyScore >= 12) {
      matchKind = "Category match";
    }

    matches.push({
      productKey,
      url,
      why,
      specs,
      score,
      matchKind,
      matchReasons: [...new Set(matchReasons)].slice(0, 8),
      specEvidence: [...new Set(specEvidence)].slice(0, 4),
    });
  }

  matches.sort((a, b) => b.score - a.score);
  return {
    matches: matches.slice(0, MAX_RESULTS),
    originalTokens,
    expandedTerms,
    triggeredGroupIds,
  };
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
 *   matchedProducts: Array<Record<string, unknown>>,
 *   message: string,
 * }}
 */
export function buildKlondikeProductRetrievalResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const { matches, originalTokens, expandedTerms, triggeredGroupIds } = searchKlondikeProducts(question);

  const empty = {
    ok: false,
    title: "",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: ["PDS map retrieval"],
    cautionNotes: [],
    matchedProducts: [],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message: "Ask which KLONDIKE products apply—e.g. HD coolant, Euro oils, biodegradable hydraulic, or Cummins CES 20086.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      title: "KLONDIKE product lookup",
      directAnswer:
        "No indexed PDS map rows scored above the match threshold for that wording. Try a spec code (e.g. CES 20086), product family (coolant, ATF, UTF), or a shorter keyword.",
      message: "No PDS_MAP matches above threshold.",
    };
  }

  const specMatches = matches.filter((m) => m.matchKind === "PDS/spec match").length;
  const catMatches = matches.filter((m) => m.matchKind === "Category match").length;

  const directAnswer = `Found ${matches.length} KLONDIKE product row(s) in the indexed PDS map${
    specMatches ? ` including ${specMatches} PDS/spec-aligned match(es)` : ""
  }${catMatches ? ` and ${catMatches} category-style match(es)` : ""}. Each line links to a PDS document—confirm exact approvals on the current sheet before quoting.`;

  const productLines = matches.map((m) => {
    const kind = m.matchKind === "Category match" ? " [category match]" : m.matchKind === "PDS/spec match" ? " [PDS/spec match]" : " [PDS index match]";
    return `${m.productKey}${kind} — score ${m.score}`;
  });

  const whyMatchedItems = matches.flatMap((m) =>
    (m.matchReasons || []).slice(0, 2).map((r) => `${m.productKey}: ${r}`)
  ).slice(0, 14);

  const specProofItems = matches.flatMap((m) =>
    (m.specEvidence || []).map((ev) => `${m.productKey}: ${ev}`)
  ).slice(0, 12);

  const sections = [
    {
      id: "matchingProducts",
      title: "Matching KLONDIKE Products",
      items: productLines,
    },
    {
      id: "whyMatched",
      title: "Why These Matched",
      body: expandedTerms.length
        ? `Expanded query tokens included: ${expandedTerms.slice(0, 12).join(", ")}${triggeredGroupIds.length ? ` (groups: ${triggeredGroupIds.join(", ")})` : ""}.`
        : "Matches used your exact query tokens against product names, aliases, specs, summaries, and PDS paths.",
      items: whyMatchedItems,
    },
    {
      id: "specsPdsProof",
      title: "Specs / PDS Proof",
      body:
        "PDS/spec matches mean a token from your original question appeared in an indexed spec line. Category matches relied more on family keywords or expansion; open the PDS PDF to verify.",
      items: specProofItems.length
        ? specProofItems
        : matches.slice(0, 6).map((m) => `${m.productKey}: ${(m.specs || [])[0] || "See PDS PDF"}`),
    },
    {
      id: "questionsToAsk",
      title: "Questions to Ask",
      items: [
        "What OEM or equipment manual fluid name must we match?",
        "Exact viscosity or grade on the tag?",
        "Any aftertreatment, food-zone, or environmental permit constraints?",
        "Bulk, tote, or packaged delivery preference?",
      ],
    },
    {
      id: "confirmBeforeUse",
      title: "Confirm Before Use",
      items: [
        "This search is deterministic text scoring over PDS_MAP; it is not a warranty or OEM approval engine.",
        "Do not infer approvals that are not printed on the current PDS revision.",
        "Category matches need human confirmation against the customer's spec sheet.",
      ],
    },
  ];

  const matchedProducts = matches.map((m) => ({
    productKey: m.productKey,
    matchKind: m.matchKind,
    score: m.score,
    url: m.url,
    matchReasons: m.matchReasons,
    specEvidence: m.specEvidence,
    topSpecs: (m.specs || []).slice(0, 4),
  }));

  return {
    ok: true,
    title: "KLONDIKE product retrieval",
    directAnswer,
    sections,
    followUpQuestions: [
      "What is the OEM fluid specification string from the manual?",
      "What viscosity and chemistry does the equipment tag require?",
      "Do you need food-grade, biodegradable, or ashless documentation for the bid file?",
    ],
    sourceBadges: ["PDS map index", "Deterministic retrieval"],
    cautionNotes: [
      "Verify every recommendation on the live PDS and with technical when stakes are high.",
    ],
    matchedProducts,
    message: `Returned ${matches.length} PDS_MAP row(s).`,
  };
}
