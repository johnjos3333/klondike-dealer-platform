import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function cleanEmail(value: unknown): string {
  return String(value ?? "").trim();
}

function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeHeaderName(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
}

function sanitizeUrlHref(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  try {
    const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    if (u.protocol !== "http:" && u.protocol !== "https:") return "";
    return u.href;
  } catch {
    return "";
  }
}

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
    const body = (await req.json()) as Record<string, unknown>;

    const customerEmail = cleanEmail(body.customerEmail);
    if (!isValidEmail(customerEmail)) {
      console.warn("[send-proposal-to-customer] Skipped: invalid customer email");
      return new Response(
        JSON.stringify({ ok: true, skipped: true, reason: "invalid_customer_email" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const repEmail = cleanEmail(body.repEmail);
    const repName = escapeHtml(
      String(body.repName ?? "").trim() || "Sales Representative"
    );
    const customerName = escapeHtml(
      String(body.customerName ?? body.companyName ?? "").trim() || "Customer"
    );

    const reviewLink = sanitizeUrlHref(body.reviewLink);

    const dealerNameRaw = String(body.dealerName ?? "").trim();
    const dealerNameSafe = sanitizeHeaderName(dealerNameRaw);
    const dealerDisplayName = dealerNameSafe
      ? `${dealerNameSafe} Proposal Center`
      : "";

    const fromEmail = (
      Deno.env.get("RESEND_FROM_EMAIL") ?? "proposals@klondikelubricants.com"
    ).trim();

    const resendKey = Deno.env.get("RESEND_API_KEY") ?? "";
    if (!resendKey) {
      console.warn("[send-proposal-to-customer] Skipped: RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ ok: true, skipped: true, reason: "missing_resend_key" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const from = dealerDisplayName ? `${dealerDisplayName} <${fromEmail}>` : fromEmail;

    const replyToCandidateRaw = cleanEmail(
      body.replyToEmail ?? body.replyTo ?? body.reply_to ?? repEmail
    );
    const replyToEmail =
      isValidEmail(replyToCandidateRaw) ? replyToCandidateRaw : "";

    const dealerBrandTitle = dealerNameSafe ? escapeHtml(dealerNameSafe) : escapeHtml("Klondike");

    const subject = dealerNameSafe
      ? `${dealerNameSafe} Proposal Center — Proposal ready for review`
      : "Klondike Proposal Center — Proposal ready for review";

    const html = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.5; color: #0f172a;">
  <div style="margin: 0 0 18px; padding: 14px 16px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px;">
    <div style="font-size: 20px; font-weight: 900; color: #0a2540; margin-bottom: 4px;">
      ${dealerDisplayName || "Klondike Proposal Center"}
    </div>
    <div style="font-size: 12px; color: #64748b;">
      ${dealerBrandTitle} • WE GROW INDEPENDENT BUSINESS • Klondike Lubricants
    </div>
  </div>

  <p>Hi <strong>${customerName}</strong>,</p>

  <p><strong>${repName}</strong> has prepared a lubrication proposal for you.</p>

  ${
    reviewLink
      ? `<p style="margin: 18px 0;">
           <a href="${escapeHtml(reviewLink)}"
              style="display: inline-block; background: #f6a531; color: #0a2540; text-decoration: none; font-weight: 800; padding: 12px 16px; border-radius: 10px;">
             Review Proposal
           </a>
         </p>`
      : `<p style="margin: 18px 0; color: #64748b;">
           If you cannot open the review link, please sign in to the dealer platform to view your proposal.
         </p>`
  }

  <p style="margin-top: 18px; color: #64748b; font-size: 13px;">
    This is an automated notification. If you have questions, please contact your representative.
  </p>
</body>
</html>
`.trim();

    const emailPayload: Record<string, unknown> = {
      from,
      to: [customerEmail],
      subject,
      html,
    };
    if (replyToEmail) {
      emailPayload.reply_to = replyToEmail;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const resText = await res.text();
    if (!res.ok) {
      console.error("[send-proposal-to-customer] Resend error:", res.status, resText);
      return new Response(
        JSON.stringify({ ok: false, error: "resend_failed", status: res.status }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    return new Response(
      JSON.stringify({ ok: true, sent: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  } catch (e) {
    console.error("[send-proposal-to-customer] Unexpected error:", e);
    return new Response(
      JSON.stringify({ ok: false, error: "internal_error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }
});

