import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const fallbackResponse = {
  text: "Shell Rotella T6 15W-40 Heavy Duty Engine Oil",
  brand: "Shell",
  productName: "Rotella T6",
  viscosity: "15W-40",
  application: "Heavy Duty Engine Oil",
  specs: [] as string[],
  confidence: "low",
  source: "stub",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(
      JSON.stringify({ ok: true }),
      {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const body = await req.json();
    const imageBase64 = String(body?.imageBase64 || "");
    const contentType = String(body?.contentType || "image/jpeg");

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "Missing imageBase64 payload" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const openAiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAiApiKey) {
      return new Response(
        JSON.stringify(fallbackResponse),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const prompt =
      "Extract product label data from this lubricant image. Return strict JSON only with keys: text, brand, productName, viscosity, application, specs, confidence. " +
      "Rules: text should be normalized concise product text; specs must be an array of readable spec strings; confidence must be one of high, medium, low.";

    const visionResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are an OCR extraction assistant for lubricant labels. Output JSON only.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:${contentType};base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!visionResponse.ok) {
      throw new Error(`OpenAI request failed with status ${visionResponse.status}`);
    }

    const visionJson = await visionResponse.json();
    const rawContent = visionJson?.choices?.[0]?.message?.content;
    if (!rawContent) {
      throw new Error("OpenAI response missing content");
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(String(rawContent));
    } catch {
      throw new Error("OpenAI returned non-JSON content");
    }

    const confidenceRaw = String(parsed.confidence || "").toLowerCase();
    const confidence =
      confidenceRaw === "high" || confidenceRaw === "medium" || confidenceRaw === "low"
        ? confidenceRaw
        : "low";

    const normalizedResponse = {
      text: String(parsed.text || fallbackResponse.text),
      brand: String(parsed.brand || ""),
      productName: String(parsed.productName || ""),
      viscosity: String(parsed.viscosity || ""),
      application: String(parsed.application || ""),
      specs: Array.isArray(parsed.specs)
        ? parsed.specs.map((x) => String(x)).filter(Boolean)
        : [],
      confidence,
      source: "openai-vision",
    };

    return new Response(
      JSON.stringify(normalizedResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (_err) {
    return new Response(
      JSON.stringify(fallbackResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
