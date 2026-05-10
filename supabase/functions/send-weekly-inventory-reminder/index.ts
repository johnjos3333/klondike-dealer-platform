import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function cleanEmail(value: unknown): string {
  return String(value ?? "").trim();
}

function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
      console.warn(
        "[send-weekly-inventory-reminder] Missing SUPABASE_SERVICE_ROLE_KEY; cannot verify admin.",
      );
      return new Response(
        JSON.stringify({ ok: true, skipped: true, reason: "no_service_role" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: mems, error: memErr } = await admin
      .from("organization_members")
      .select("role")
      .eq("user_id", user.id)
      .eq("is_active", true);

    if (memErr) {
      console.error("[send-weekly-inventory-reminder] membership read:", memErr);
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

    const toEmail = cleanEmail(user.email);
    if (!isValidEmail(toEmail)) {
      return new Response(JSON.stringify({ ok: true, skipped: true, reason: "no_email" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const resendKey = Deno.env.get("RESEND_API_KEY") ?? "";
    const fromEmail = (
      Deno.env.get("RESEND_FROM_EMAIL") ?? "proposals@klondikelubricants.com"
    ).trim();

    if (!resendKey) {
      console.warn("[send-weekly-inventory-reminder] RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ ok: true, skipped: true, reason: "missing_resend_key" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const subject = "Weekly Inventory Demand Review Reminder";

    const html = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.55; color: #0f172a;">
  <p><strong>Weekly inventory demand review</strong></p>
  <p>Please review <strong>approved proposal demand</strong> in the Klondike Dealer Platform this week.</p>
  <p>Communicate accelerating SKU or package-level demand to Supply Chain so operational visibility stays aligned with customer-approved decisions.</p>
  <p>Territory-level demand concentration and category mix are available under Klondike Admin → <strong>Inventory Intelligence</strong>.</p>
  <p style="color:#64748b;font-size:13px;">Demand forecasting visibility only—this is not ERP inventory, warehouse stock, or automated purchasing.</p>
  <p style="color:#64748b;font-size:12px;">Automated reminder from Klondike Dealer Platform.</p>
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
        from: `Klondike Platform <${fromEmail}>`,
        to: [toEmail],
        subject,
        html,
      }),
    });

    const resText = await res.text();
    if (!res.ok) {
      console.error("[send-weekly-inventory-reminder] Resend error:", res.status, resText);
      return new Response(
        JSON.stringify({ ok: false, error: "resend_failed", status: res.status }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    return new Response(JSON.stringify({ ok: true, sent: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    console.error("[send-weekly-inventory-reminder]", e);
    return new Response(JSON.stringify({ ok: false, error: "unexpected" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
