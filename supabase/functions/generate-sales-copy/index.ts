import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { generateAiSalesCopy } from "../../../src/server/aiSalesCopyGenerator/generateAiSalesCopy.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const body = await req.json();
    const productId = String(body?.productId || "").trim();
    const packageType = String(body?.packageType || "product_spotlight").trim();
    const audience = String(body?.audience || "rep").trim();
    const context = String(body?.context || body?.audienceContext || "").trim();

    if (!productId) {
      return new Response(
        JSON.stringify({ ok: false, error: "missing_product_id", message: "productId is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
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

    return new Response(JSON.stringify(result), {
      status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "server_error",
        message: err instanceof Error ? err.message : "Unexpected error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
