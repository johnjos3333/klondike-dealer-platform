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
    .replace(/"/g, "&quot;");
}

function cleanEmail(value: unknown): string {
  return String(value ?? "").trim();
}

function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  // Practical RFC-like check without being overly strict
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function pickCount(body: Record<string, unknown>, key: string, fallbackLen: number): number {
  const raw = body[key];
  if (typeof raw === "number" && Number.isFinite(raw) && raw >= 0) {
    return Math.floor(raw);
  }
  return fallbackLen;
}

function sanitizeHeaderName(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
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
    const repEmail = cleanEmail(body.repEmail);
    const dealerNameRaw = String(body.dealerName ?? "").trim();
    const dealerNameSafe = sanitizeHeaderName(dealerNameRaw);
    const dealerDisplayName = dealerNameSafe
      ? `${dealerNameSafe} via Klondike`
      : "";

    const replyToEmailRaw = cleanEmail(body.replyToEmail ?? body.replyTo);
    const replyToEmail = isValidEmail(replyToEmailRaw)
      ? replyToEmailRaw
      : "";

    if (!isValidEmail(repEmail)) {
      console.warn(
        "[send-proposal-reviewed-email] Skipped: no safe rep email",
      );
      return new Response(
        JSON.stringify({
          ok: true,
          skipped: true,
          reason: "no_rep_email",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    const approvedArr = Array.isArray(body.approved) ? body.approved : [];
    const declinedArr = Array.isArray(body.declined) ? body.declined : [];

    const approvedCount = pickCount(body, "approvedCount", approvedArr.length);
    const declinedCount = pickCount(body, "declinedCount", declinedArr.length);

    const repName = escapeHtml(
      String(body.repName ?? "").trim() || "Sales Representative",
    );
    const customerName = escapeHtml(String(body.customerName ?? "").trim() || "Customer");
    const customerEmail = escapeHtml(String(body.customerEmail ?? "").trim());

    const quoteIdRaw = String(body.quoteId ?? "").trim();
    const quoteReference = quoteIdRaw
      ? escapeHtml(quoteIdRaw)
      : escapeHtml(String(body.quoteReference ?? "").trim());

    const platformOriginRaw = String(
      body.platformOrigin ?? body.platformUrl ?? "",
    ).trim();
    let platformHref = "";
    let platformLabel = "";
    if (platformOriginRaw) {
      try {
        const u = new URL(
          platformOriginRaw.startsWith("http")
            ? platformOriginRaw
            : `https://${platformOriginRaw}`,
        );
        if (u.protocol === "http:" || u.protocol === "https:") {
          platformHref = u.origin;
          platformLabel = escapeHtml(platformHref);
        }
      } catch {
        // ignore invalid URLs
      }
    }

    const resendKey = Deno.env.get("RESEND_API_KEY") ?? "";
    const fromEmail = (
      Deno.env.get("RESEND_FROM_EMAIL") ?? "proposals@klondikelubricants.com"
    ).trim();

    if (!resendKey) {
      console.warn(
        "[send-proposal-reviewed-email] Skipped: RESEND_API_KEY not configured",
      );
      return new Response(
        JSON.stringify({
          ok: true,
          skipped: true,
          reason: "missing_resend_key",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    const subjectCustomer = String(body.customerName ?? "").trim() || "A customer";
    const subject = dealerNameSafe
      ? `${dealerNameSafe} proposal for ${subjectCustomer}`
      : `Klondike proposal for ${subjectCustomer}`;

    const refLine = quoteReference
      ? `<p><strong>Reference:</strong> ${quoteReference}</p>`
      : "";

    const loginBlock = platformHref
      ? `<p>Review details in the dealer platform: <a href="${platformHref.replace(/"/g, "&quot;")}">${platformLabel}</a></p>`
      : `<p>Sign in to the Klondike Dealer Growth Platform to review full details.</p>`;

    const dealerBrandTitle = dealerNameSafe
      ? escapeHtml(dealerDisplayName)
      : escapeHtml("Klondike Proposal Center");
    const dealerNameLine = dealerNameSafe
      ? escapeHtml(dealerNameSafe)
      : escapeHtml("Klondike");

    const html = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.5; color: #0f172a;">
  <div style="margin: 0 0 18px; padding: 14px 16px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px;">
    <div style="font-size: 20px; font-weight: 900; color: #0a2540; margin-bottom: 4px;">${dealerBrandTitle}</div>
    <div style="font-size: 12px; color: #64748b;">Klondike Lubricants • WE GROW INDEPENDENT BUSINESS</div>
  </div>

  <p>Hi ${repName},</p>
  <p><strong>${customerName}</strong> submitted decisions on a proposal from <strong>${dealerNameLine}</strong>.</p>
  ${customerEmail ? `<p><strong>Contact email:</strong> ${customerEmail}</p>` : ""}
  <p><strong>Approved:</strong> ${approvedCount} &nbsp;|&nbsp; <strong>Declined:</strong> ${declinedCount}</p>
  ${refLine}
  ${loginBlock}
  <p style="color:#64748b;font-size:13px;">This is an automated notification.</p>
</body>
</html>
`.trim();

    const emailBody: Record<string, unknown> = {
      from: dealerDisplayName ? `${dealerDisplayName} <${fromEmail}>` : fromEmail,
      to: [repEmail],
      subject,
      html,
    };

    if (replyToEmail) {
      emailBody.reply_to = replyToEmail;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    });

    const resText = await res.text();
    if (!res.ok) {
      console.error(
        "[send-proposal-reviewed-email] Resend error:",
        res.status,
        resText,
      );
      return new Response(
        JSON.stringify({
          ok: false,
          error: "resend_failed",
          status: res.status,
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    return new Response(
      JSON.stringify({ ok: true, sent: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  } catch (e) {
    console.error("[send-proposal-reviewed-email] Unexpected error:", e);
    return new Response(
      JSON.stringify({ ok: false, error: "internal_error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
});
