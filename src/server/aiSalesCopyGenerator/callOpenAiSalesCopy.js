import { AI_SALES_COPY_SYSTEM_PROMPT, buildSalesCopyUserPrompt } from "./buildSalesCopyPrompt.js";
import { normalizeSalesCopyResponse } from "./normalizeSalesCopyResponse.js";

export const DEFAULT_AI_SALES_COPY_MODEL = "gpt-4o-mini";

/**
 * @param {{
 *   approvedFacts: Record<string, unknown>,
 *   audience?: string,
 *   audienceContext?: string | null,
 *   apiKey: string,
 *   model?: string,
 *   fetchImpl?: typeof fetch,
 * }} params
 */
export async function callOpenAiSalesCopy(params) {
  const apiKey = String(params?.apiKey || "").trim();
  if (!apiKey) {
    return { ok: false, error: "missing_openai_api_key" };
  }

  const fetchImpl = params.fetchImpl || fetch;
  const model = String(params.model || DEFAULT_AI_SALES_COPY_MODEL).trim() || DEFAULT_AI_SALES_COPY_MODEL;
  const userPrompt = buildSalesCopyUserPrompt({
    approvedFacts: params.approvedFacts,
    audience: params.audience,
    audienceContext: params.audienceContext,
  });

  const response = await fetchImpl("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: AI_SALES_COPY_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    return {
      ok: false,
      error: "openai_request_failed",
      status: response.status,
      detail: errText.slice(0, 500),
    };
  }

  const json = await response.json();
  const rawContent = json?.choices?.[0]?.message?.content;
  if (!rawContent) {
    return { ok: false, error: "openai_empty_content" };
  }

  let parsed = null;
  try {
    parsed = JSON.parse(String(rawContent));
  } catch {
    return { ok: false, error: "openai_non_json_content" };
  }

  const normalized = normalizeSalesCopyResponse(parsed);
  if (!normalized.ok) {
    return {
      ok: false,
      error: normalized.error || "normalize_failed",
      copy: normalized.copy,
      missingFields: normalized.missingFields,
    };
  }

  return {
    ok: true,
    model,
    source: "openai",
    copy: normalized.copy,
  };
}
