import { AI_SALES_COPY_FIELD_KEYS, emptyAiSalesCopyPayload } from "./types.js";

/**
 * @param {unknown} value
 */
function cleanString(value) {
  return String(value ?? "").trim();
}

/**
 * @param {unknown} value
 * @param {number} [maxItems]
 * @returns {string[]}
 */
function cleanStringArray(value, maxItems = 12) {
  const list = Array.isArray(value) ? value : [];
  const out = [];
  const seen = new Set();
  for (const item of list) {
    const line = cleanString(item);
    if (!line) continue;
    const key = line.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(line);
    if (out.length >= maxItems) break;
  }
  return out;
}

/**
 * @param {unknown} parsed
 */
export function normalizeSalesCopyResponse(parsed) {
  const base = emptyAiSalesCopyPayload();
  if (!parsed || typeof parsed !== "object") {
    return { ok: false, error: "invalid_json_shape", copy: base };
  }

  /** @type {Record<string, unknown>} */
  const raw = parsed;

  /** @type {import("./types.js").AiSalesCopyPayload} */
  const copy = {
    title: cleanString(raw.title),
    subtitle: cleanString(raw.subtitle),
    heroSummary: cleanString(raw.heroSummary),
    keyBenefits: cleanStringArray(raw.keyBenefits),
    applications: cleanStringArray(raw.applications),
    keySpecs: cleanStringArray(raw.keySpecs),
    whyThisProduct: cleanString(raw.whyThisProduct),
    repTalkTrack: cleanStringArray(raw.repTalkTrack),
    discoveryQuestions: cleanStringArray(raw.discoveryQuestions),
    crossSell: cleanStringArray(raw.crossSell),
    cautions: cleanStringArray(raw.cautions, 16),
    recommendedNextStep: cleanString(raw.recommendedNextStep),
  };

  const missing = AI_SALES_COPY_FIELD_KEYS.filter((key) => {
    const value = copy[key];
    if (Array.isArray(value)) return value.length === 0;
    return !value;
  });

  if (!copy.title || !copy.heroSummary) {
    return {
      ok: false,
      error: "incomplete_sales_copy",
      copy,
      missingFields: missing,
    };
  }

  return { ok: true, copy };
}
