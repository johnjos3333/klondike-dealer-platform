import { callOpenAiSalesCopy, DEFAULT_AI_SALES_COPY_MODEL } from "./callOpenAiSalesCopy.js";
import { loadCanonicalFactsForSalesCopy } from "./loadCanonicalFacts.js";
import { AI_SALES_COPY_GENERATOR_VERSION } from "./types.js";

/**
 * Generate sell-sheet-ready sales copy from canonical/PDS facts via OpenAI.
 *
 * @param {{
 *   productId: string,
 *   packageType?: string,
 *   audience?: string,
 *   context?: string,
 *   audienceContext?: string,
 * }} input
 * @param {{
 *   apiKey?: string,
 *   model?: string,
 *   fetchImpl?: typeof fetch,
 *   skipOpenAi?: boolean,
 * }} [options]
 */
export async function generateAiSalesCopy(input = {}, options = {}) {
  const productId = String(input?.productId || "").trim();
  const packageType = String(input?.packageType || "product_spotlight").trim() || "product_spotlight";

  const factsResult = loadCanonicalFactsForSalesCopy({
    productId,
    packageType,
    audience: input?.audience,
    context: input?.context,
    audienceContext: input?.audienceContext,
  });

  if (!factsResult.ok) {
    return {
      ok: false,
      version: AI_SALES_COPY_GENERATOR_VERSION,
      productId: productId || null,
      packageType,
      error: factsResult.error,
      message: factsResult.message,
      hints: factsResult.hints,
    };
  }

  if (options.skipOpenAi) {
    return {
      ok: true,
      version: AI_SALES_COPY_GENERATOR_VERSION,
      productId: factsResult.productId,
      packageType: factsResult.packageType,
      audience: factsResult.audience,
      audienceContext: factsResult.audienceContext,
      approvedFacts: factsResult.approvedFacts,
      assemblyMeta: factsResult.assemblyMeta,
      copy: null,
      source: "canonical_only",
    };
  }

  const apiKey = String(options.apiKey || "").trim();
  if (!apiKey) {
    return {
      ok: false,
      version: AI_SALES_COPY_GENERATOR_VERSION,
      productId: factsResult.productId,
      packageType: factsResult.packageType,
      error: "missing_openai_api_key",
      message: "OPENAI_API_KEY is required for AI copy generation",
      approvedFacts: factsResult.approvedFacts,
    };
  }

  const aiResult = await callOpenAiSalesCopy({
    approvedFacts: factsResult.approvedFacts,
    audience: factsResult.audience,
    audienceContext: factsResult.audienceContext,
    apiKey,
    model: options.model || DEFAULT_AI_SALES_COPY_MODEL,
    fetchImpl: options.fetchImpl,
  });

  if (!aiResult.ok) {
    return {
      ok: false,
      version: AI_SALES_COPY_GENERATOR_VERSION,
      productId: factsResult.productId,
      packageType: factsResult.packageType,
      error: aiResult.error,
      status: aiResult.status,
      detail: aiResult.detail,
      approvedFacts: factsResult.approvedFacts,
      partialCopy: aiResult.copy || null,
    };
  }

  return {
    ok: true,
    version: AI_SALES_COPY_GENERATOR_VERSION,
    productId: factsResult.productId,
    packageType: factsResult.packageType,
    audience: factsResult.audience,
    audienceContext: factsResult.audienceContext,
    model: aiResult.model || DEFAULT_AI_SALES_COPY_MODEL,
    source: aiResult.source,
    approvedFacts: factsResult.approvedFacts,
    assemblyMeta: factsResult.assemblyMeta,
    copy: aiResult.copy,
  };
}
