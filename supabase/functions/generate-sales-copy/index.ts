import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { generateAiSalesCopy } from "../../../src/server/aiSalesCopyGenerator/generateAiSalesCopy.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const productId = String(body?.productId || "").trim();
    const packageType = String(body?.packageType || "product_spotlight").trim();
    const audience = String(body?.audience || "rep").trim();
    const context = String(body?.context || body?.audienceContext || "").trim();

    if (!productId) {
      return jsonResponse(
        { ok: false, error: "missing_product_id", message: "productId is required" },
        400
      );
    }

    const openAiApiKey = Deno.env.get("OPENAI_API_KEY") || "";
    const result = await generateAiSalesCopy(
      {
        productId,
        packageType: packageType || "product_spotlight",
        audience: audience || "rep",
        context,
      },
      { apiKey: openAiApiKey }
    );

    const status = result.ok ? 200 : result.error === "missing_openai_api_key" ? 503 : 422;

    return jsonResponse(result, status);
  } catch (err) {
    return jsonResponse(
      {
        ok: false,
        error: "server_error",
        message: err instanceof Error ? err.message : "Unexpected error",
      },
      500
    );
  }
});
