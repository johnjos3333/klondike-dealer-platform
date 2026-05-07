import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const errorResponse = {
  text: "",
  brand: "",
  productName: "",
  viscosity: "",
  application: "",
  specs: [] as string[],
  confidence: "low",
  source: "openai-vision",
  error: "Unable to extract label text",
};

function cleanText(value: unknown) {
  return String(value || "").trim();
}

function normalizeVisionPayload(parsed: Record<string, unknown>) {
  const brand = cleanText(parsed.brand);
  const productName = cleanText(parsed.productName);
  const viscosity = cleanText(parsed.viscosity);
  const application = cleanText(parsed.application);
  const specs = Array.isArray(parsed.specs)
    ? parsed.specs.map((x) => cleanText(x)).filter(Boolean)
    : [];

  const confidenceRaw = cleanText(parsed.confidence).toLowerCase();
  const confidence =
    confidenceRaw === "high" || confidenceRaw === "medium" || confidenceRaw === "low"
      ? confidenceRaw
      : "low";

  const textParts = [brand, productName, viscosity, application].filter(Boolean);
  const providedText = cleanText(parsed.text);
  const text = providedText || textParts.join(" ");

  return {
    text,
    brand,
    productName,
    viscosity,
    application,
    specs,
    confidence,
    source: "openai-vision",
  };
}

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
    console.log("OCR request payload:", {
      hasImage: imageBase64.length > 0,
      imageBase64Length: imageBase64.length,
      contentType,
      filename: body?.filename || null,
    });

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
        JSON.stringify(errorResponse),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const prompt =
      "You extract lubricant product information from product label images.\n" +
      "Return JSON only.\n" +
      "Do not recommend replacement products.\n" +
      "Do not choose Klondike products.\n" +
      "Only extract what is visible or strongly implied from the label.\n" +
      "If unsure, leave fields blank and set confidence to low.\n\n" +
      "Extract:\n" +
      "- brand\n" +
      "- productName\n" +
      "- viscosity\n" +
      "- application\n" +
      "- visible specifications\n" +
      "- confidence\n\n" +
      "The `text` field should be a clean searchable phrase combining the extracted values.\n" +
      "Output strict JSON with keys: text, brand, productName, viscosity, application, specs, confidence.";

    console.log("About to call OpenAI Vision");
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
              "You are an OCR extraction assistant for lubricant product labels. Output JSON only.",
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
    console.log("OpenAI response status:", visionResponse.status);
    console.log("OpenAI response ok:", visionResponse.ok);

    if (!visionResponse.ok) {
      const errorText = await visionResponse.text();
      console.log("OpenAI error body:", errorText);
      throw new Error(`OpenAI request failed: ${visionResponse.status}`);
    }

    const visionJson = await visionResponse.json();
    console.log("OpenAI raw response:", visionJson);
    const rawContent = visionJson?.choices?.[0]?.message?.content;
    if (!rawContent) {
      throw new Error("OpenAI response missing content");
    }

    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(String(rawContent));
    } catch {
      throw new Error("OpenAI returned non-JSON content");
    }
    console.log("OpenAI parsed JSON:", parsed);

    const normalizedResponse = normalizeVisionPayload(parsed);
    console.log("OCR final payload:", normalizedResponse);

    return new Response(
      JSON.stringify(normalizedResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (err) {
    console.error("OCR Edge Function caught error:", err);
    return new Response(
      JSON.stringify(errorResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
