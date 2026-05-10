import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cleanEmail(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type Section = { heading?: unknown; lines?: unknown };

function sanitizeSections(raw: unknown): Array<{ heading: string; lines: string[] }> {
  if (!Array.isArray(raw)) return [];
  const out: Array<{ heading: string; lines: string[] }> = [];
  for (const row of raw.slice(0, 24)) {
    const obj = row as Section;
    const heading = escapeHtml(String(obj?.heading ?? "").trim()).slice(0, 120);
    const linesRaw = Array.isArray(obj?.lines) ? obj.lines : [];
    const lines = linesRaw
      .map((ln) => String(ln ?? "").trim())
      .filter(Boolean)
      .slice(0, 18)
      .map((ln) => escapeHtml(ln.slice(0, 2000)));
    if (heading && lines.length > 0) {
      out.push({ heading, lines });
    }
  }
  return out;
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
    const authHeader = req.headers.get("Authorization") ?? "";
    const jwt = authHeader.replace(/^Bearer\s+/i, "").trim();

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!jwt || !supabaseUrl || !anonKey) {
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });

    const {
      data: { user },
      error: userErr,
    } = await userClient.auth.getUser();

    if (userErr || !user?.id) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_session" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!serviceKey) {
      console.warn("[send-spotlight-email] Missing SUPABASE_SERVICE_ROLE_KEY");
      return new Response(
        JSON.stringify({ ok: false, error: "service_unavailable" }),
        { status: 503, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: mems, error: memErr } = await admin
      .from("organization_members")
      .select("role")
      .eq("user_id", user.id)
      .eq("is_active", true);

    if (memErr) {
      console.error("[send-spotlight-email] membership read:", memErr);
      return new Response(JSON.stringify({ ok: false, error: "membership_read_failed" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const isPlatformAdmin = (mems || []).some(
      (m) => String(m?.role || "").toLowerCase() === "platform_admin",
    );

    if (!isPlatformAdmin) {
      return new Response(JSON.stringify({ ok: false, error: "forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const body = (await req.json()) as Record<string, unknown>;
    const organizationId = String(body.organizationId ?? "").trim();
    const spotlightTitle = String(body.spotlightTitle ?? "Klondike Spotlight").trim().slice(0, 240);
    const dealerName = String(body.dealerName ?? "").trim().slice(0, 120);
    const introText = String(body.introText ?? "").trim().slice(0, 4000);
    const sections = sanitizeSections(body.sections);

    if (!organizationId) {
      return new Response(JSON.stringify({ ok: false, error: "missing_organization" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (sections.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: "missing_sections" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { data: recipients, error: recErr } = await admin
      .from("organization_members_with_emails")
      .select("email, role")
      .eq("organization_id", organizationId)
      .eq("is_active", true)
      .in("role", ["dealer_admin", "manager", "rep"]);

    if (recErr) {
      console.error("[send-spotlight-email] recipients:", recErr);
      return new Response(JSON.stringify({ ok: false, error: "recipient_query_failed" }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const emailSet = new Set<string>();
    const roleCounts = { dealer_admin: 0, manager: 0, rep: 0 };
    for (const row of recipients || []) {
      const em = cleanEmail(row?.email);
      if (!isValidEmail(em)) continue;
      if (emailSet.has(em)) continue;
      emailSet.add(em);
      const r = String(row?.role || "").toLowerCase();
      if (r === "dealer_admin") roleCounts.dealer_admin += 1;
      else if (r === "manager") roleCounts.manager += 1;
      else if (r === "rep") roleCounts.rep += 1;
    }

    const toList = Array.from(emailSet);
    if (toList.length === 0) {
      return new Response(
        JSON.stringify({ ok: false, error: "no_recipients", message: "No valid recipient emails for this dealer." }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const resendKey = Deno.env.get("RESEND_API_KEY") ?? "";
    const fromEmail = (
      Deno.env.get("RESEND_FROM_EMAIL") ?? "proposals@klondikelubricants.com"
    ).trim();

    if (!resendKey) {
      console.warn("[send-spotlight-email] RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ ok: false, error: "missing_resend", skipped: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const dealerLabel = escapeHtml(dealerName || "Dealer organization");
    const titleEsc = escapeHtml(spotlightTitle);
    const introBlock = introText
      ? `<div style="margin:16px 0;padding:14px 16px;background:#eff6ff;border-left:4px solid #2563eb;border-radius:8px;font-size:15px;line-height:1.55;color:#0f172a;">
  <div style="font-size:11px;font-weight:800;letter-spacing:0.08em;color:#1d4ed8;margin-bottom:6px;">MESSAGE FROM KLONDIKE ADMIN</div>
  ${escapeHtml(introText).replace(/\n/g, "<br/>")}
</div>`
      : "";

    const sectionHtml = sections
      .map(
        (sec) => `
  <div style="margin-top:20px;">
    <div style="font-size:13px;font-weight:800;letter-spacing:0.06em;color:#1e40af;margin-bottom:8px;">${sec.heading}</div>
    <ul style="margin:0;padding-left:18px;color:#334155;font-size:14px;line-height:1.55;">
      ${sec.lines.map((ln) => `<li style="margin-bottom:6px;">${ln}</li>`).join("")}
    </ul>
  </div>`,
      )
      .join("");

    const subject = dealerName
      ? `${dealerName} — ${spotlightTitle}`
      : `Klondike Spotlight — ${spotlightTitle}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 12px 32px rgba(15,23,42,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);padding:22px 24px;color:#ffffff;">
              <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;opacity:0.9;">KLONDIKE LUBRICANTS</div>
              <div style="font-size:22px;font-weight:900;line-height:1.25;margin-top:6px;">Sales Enablement Spotlight</div>
              <div style="font-size:13px;opacity:0.92;margin-top:8px;line-height:1.45;">${dealerLabel}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 24px 28px;color:#0f172a;">
              <div style="font-size:18px;font-weight:900;color:#0f172a;line-height:1.3;">${titleEsc}</div>
              ${introBlock}
              ${sectionHtml}
              <p style="margin:24px 0 0;font-size:12px;color:#64748b;line-height:1.45;">
                Operational enablement from the Klondike Dealer Platform — not a mass marketing campaign.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Klondike Enablement <${fromEmail}>`,
        to: toList,
        subject: subject.slice(0, 240),
        html,
      }),
    });

    const resText = await res.text();
    if (!res.ok) {
      console.error("[send-spotlight-email] Resend error:", res.status, resText);
      return new Response(
        JSON.stringify({ ok: false, error: "resend_failed", status: res.status }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        sent: true,
        recipientCount: toList.length,
        roleCounts,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  } catch (e) {
    console.error("[send-spotlight-email]", e);
    return new Response(JSON.stringify({ ok: false, error: "unexpected" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
