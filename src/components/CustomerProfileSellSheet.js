/**
 * CustomerProfileSellSheet — standalone customer / industry playbook sell sheet.
 * Layout id: customer-profile-sell-sheet-v6b1
 * Not wired into App.js yet.
 */

import React from "react";

export const CUSTOMER_PROFILE_SELL_SHEET_LAYOUT_ID = "customer-profile-sell-sheet-v6b1";

const KLONDIKE_HEADER_LOGO_SRC = "/klondike-horizontal-logo.png";

const BRAND = {
  navy: "#0f172a",
  headerNavy: "#0E1B33",
  navyMid: "#1e3a8a",
  navyDeep: "#172554",
  orange: "#ea580c",
  orangeLight: "#fb923c",
  orangeMuted: "#fdba74",
  slate: "#64748b",
  white: "#ffffff",
};

const DEMO_DEFAULTS = {
  profileTitle: "Mining & Aggregate Customer Profile",
  profileSubtitle: "Severe-duty lubrication opportunities in high-load, dirty, wet, and abrasive environments.",
  profileSummary:
    "Use this playbook to align field conversations with what mining and aggregate operators actually fight: shock load, contamination, washout, and unplanned downtime—not SKU lists alone.",
  industryImageUrl: "",
  customerPainPoints: [
    { iconKey: "shock", label: "Shock load", sub: "Pins, bushings, and slow-speed bearings see impact before steady wear." },
    { iconKey: "contamination", label: "Contamination", sub: "Dust, fines, and water ingress challenge every circuit and lube point." },
    { iconKey: "washout", label: "Washout", sub: "Outdoor duty and wash-down strip commodity chemistry off critical joints." },
    { iconKey: "bearing", label: "Bearing failure", sub: "Repeat failures on conveyors and screen plants erode PM confidence." },
    { iconKey: "hydraulic", label: "Hydraulic reliability", sub: "Heat, foam, and slow response show up before filters trend bad." },
    { iconKey: "downtime", label: "Downtime", sub: "Every hour off-peak costs production targets and dealer trust." },
  ],
  equipmentTypes: [
    "Crushers",
    "Conveyors",
    "Loaders",
    "Haul trucks",
    "Excavators",
    "Screen plants",
  ],
  likelyLubricantNeeds: [
    { category: "Calcium sulfonate grease", role: "EP protection for wet, shock-loaded pins and bushings" },
    { category: "Hydraulic fluids", role: "Circuit reliability across temperature and contamination" },
    { category: "Gear oils", role: "Drivetrain and reducer protection under load" },
    { category: "Heavy duty engine oils", role: "Haul truck and mobile power unit programs" },
    { category: "Coolants", role: "Fleet cooling system discipline in dusty duty" },
    { category: "Open gear / industrial lubricants", role: "Large open gearing and specialty plant assets" },
  ],
  recommendedProducts: [
    {
      name: "KLONDIKE nano Calcium Sulfonate EP Grease",
      why: "Upgrade path when commodity grease washes out on pins, bushings, and slow-speed bearings.",
    },
    {
      name: "AW & MV Hydraulic Fluids",
      why: "Anchor mixed-fleet hydraulic conversations to ISO VG discipline and circuit evidence.",
    },
    {
      name: "Industrial EP Gear Lubricants",
      why: "Support crushers, conveyors, and reducers under sustained load.",
    },
    {
      name: "CK-4 Heavy Duty Engine Oils",
      why: "Protect haul trucks and support equipment power units in severe service.",
    },
  ],
  opportunitySignals: [
    "Unplanned stops on conveyors or screen plants",
    "Grease failure after wash-down or blast exposure",
    "Hydraulic heat or slow response at shift start",
    "Mixed bulk and packaged top-off behavior in the yard",
  ],
  repTalkTrack: [
    "Lead with downtime and contamination before discussing product tier or brand swap.",
    "Position grease and hydraulic upgrades where washout and shock load are documented—not assumed.",
    "Tie recommendations to equipment type and relube discipline, not shelf habit.",
    "Frame Klondike as a system program across grease, hydraulics, gears, and engines.",
  ],
  discoveryQuestions: [
    "Which assets drive your worst unplanned downtime this quarter?",
    "Where are you seeing grease washout, bearing heat, or repeat pin failures?",
    "What hydraulic circuits show foam, heat, or slow response first thing in the morning?",
    "How are bulk tanks and packaged top-offs aligned across the site?",
    "Who signs off on chemistry changes for centralized lube systems?",
  ],
  crossSell: [
    "Filtration & breathers",
    "Gear oils",
    "Heavy duty engine oils",
    "Coolants",
    "Industrial circulating oils",
  ],
  cautions: [
    "Confirm OEM and component builder guidance before changing viscosity or chemistry.",
    "Do not mix incompatible greases or fluids without flush and consultation.",
    "Match food-grade or EAL requirements only where the application demands it.",
    "See product data sheets for each SKU discussed in the field.",
  ],
  recommendedNextStep:
    "Build a field conversation around downtime, washout, hydraulic reliability, and component protection.",
};

function pickList(value, fallback) {
  if (!Array.isArray(value)) return fallback;
  const list = value.filter((item) => {
    if (item == null || item === false) return false;
    if (typeof item === "object") {
      return Boolean(
        String(item.label ?? item.sub ?? item.title ?? item.name ?? item.category ?? "").trim()
      );
    }
    return Boolean(String(item).trim());
  });
  return list.length ? list : fallback;
}

function pickText(value, fallback) {
  if (value === undefined || value === null) return fallback;
  const t = String(value).trim();
  return t || fallback;
}

function sanitizeLabel(item) {
  if (item == null) return "";
  const s =
    typeof item === "object"
      ? String(item.label ?? item.name ?? item.title ?? item.category ?? "").trim()
      : String(item).trim();
  if (!s) return "";
  if (/^(overlay-|canonical-|pds-|se-|pkg-)/i.test(s)) return "";
  if (/^[a-z0-9_-]{14,}$/i.test(s) && !/\s/.test(s)) return "";
  return s;
}

function normalizeRepLineKey(line) {
  return String(line || "")
    .trim()
    .toLowerCase()
    .replace(/[?.,!;:]+$/g, "")
    .replace(/\s+/g, " ");
}

function looksLikeQuestion(line) {
  const t = String(line || "").trim();
  if (!t) return false;
  if (/\?\s*$/.test(t)) return true;
  return /^(where|what|which|who|when|why|how|are you|do you|does your|is your|can you)\b/i.test(t);
}

function looksLikeRepStatement(line) {
  const t = String(line || "").trim();
  if (!t || looksLikeQuestion(t)) return false;
  return t.length >= 12;
}

function coerceQuestion(line) {
  const t = String(line || "").trim();
  if (!t) return "";
  if (/\?\s*$/.test(t)) return t;
  return `${t.replace(/[.!]+$/, "")}?`;
}

function resolveRepTalkAndQuestions(repTalkRaw, questionsRaw, repFallback, questionsFallback) {
  const repCandidates = [];
  const questionCandidates = [];
  for (const item of Array.isArray(repTalkRaw) ? repTalkRaw : []) {
    const line = String(item ?? "").trim();
    if (!line) continue;
    if (looksLikeQuestion(line)) questionCandidates.push(line);
    else repCandidates.push(line);
  }
  for (const item of Array.isArray(questionsRaw) ? questionsRaw : []) {
    const line = String(item ?? "").trim();
    if (!line) continue;
    if (looksLikeQuestion(line)) questionCandidates.push(line);
    else if (looksLikeRepStatement(line)) repCandidates.push(line);
  }
  const repSeen = new Set();
  const qSeen = new Set();
  const repOut = [];
  const qOut = [];
  const pushRep = (line) => {
    const text = String(line || "").trim();
    if (!looksLikeRepStatement(text)) return;
    const key = normalizeRepLineKey(text);
    if (!key || repSeen.has(key) || qSeen.has(key)) return;
    repSeen.add(key);
    repOut.push(text);
  };
  const pushQuestion = (line) => {
    const text = coerceQuestion(line);
    if (!text) return;
    const key = normalizeRepLineKey(text);
    if (!key || qSeen.has(key) || repSeen.has(key)) return;
    qSeen.add(key);
    qOut.push(text);
  };
  repCandidates.forEach(pushRep);
  questionCandidates.forEach(pushQuestion);
  for (const line of repFallback) {
    if (repOut.length >= 4) break;
    pushRep(line);
  }
  for (const line of questionsFallback) {
    if (qOut.length >= 5) break;
    pushQuestion(line);
  }
  return { repTalkTrack: repOut.slice(0, 4), discoveryQuestions: qOut.slice(0, 5) };
}

function painIconKey(tile, index) {
  const preset = String(tile?.iconKey || "").toLowerCase();
  if (["shock", "contamination", "washout", "bearing", "hydraulic", "downtime", "heat", "pm"].includes(preset)) {
    return preset;
  }
  const blob = `${tile?.label || ""} ${tile?.sub || ""}`.toLowerCase();
  if (/shock|impact|load/.test(blob)) return "shock";
  if (/contamin|dust|dirt|fines/.test(blob)) return "contamination";
  if (/washout|wash-out|wet/.test(blob)) return "washout";
  if (/bearing|pin|bush/.test(blob)) return "bearing";
  if (/hydraulic|circuit|pump/.test(blob)) return "hydraulic";
  if (/downtime|uptime|stop/.test(blob)) return "downtime";
  if (/heat|thermal|temp/.test(blob)) return "heat";
  if (/pm|prevent|maintenance/.test(blob)) return "pm";
  return ["shock", "contamination", "washout", "bearing", "hydraulic", "downtime"][index % 6];
}

function normalizePainTiles(value, fallback) {
  if (!Array.isArray(value)) return fallback.slice(0, 6);
  const out = [];
  for (const item of value) {
    if (item && typeof item === "object") {
      const label = String(item.label ?? item.title ?? item.name ?? "").trim();
      const sub = String(item.sub ?? item.desc ?? "").trim();
      if (!label && !sub) continue;
      out.push({
        iconKey: String(item.iconKey || "").trim(),
        label: label || sub.slice(0, 48),
        sub: sub || "",
      });
    } else {
      const line = String(item ?? "").trim();
      if (!line) continue;
      const dash = line.match(/^([^:—–-]{1,60})\s*[:—–-]\s*(.+)$/);
      out.push({
        iconKey: "",
        label: String(dash ? dash[1] : line).trim(),
        sub: String(dash ? dash[2] : "").trim(),
      });
    }
    if (out.length >= 6) break;
  }
  return out.length ? out : fallback.slice(0, 6);
}

function normalizeLubricantNeeds(value, fallback) {
  if (!Array.isArray(value)) return fallback.slice(0, 6);
  const out = [];
  for (const item of value) {
    if (item && typeof item === "object") {
      const category = String(item.category ?? item.name ?? item.title ?? item.label ?? "").trim();
      const role = String(item.role ?? item.sub ?? item.desc ?? item.why ?? "").trim();
      if (!category) continue;
      out.push({ category, role });
    } else {
      const line = String(item ?? "").trim();
      if (!line) continue;
      const dash = line.match(/^([^:—–-]{1,80})\s*[:—–-]\s*(.+)$/);
      out.push({
        category: String(dash ? dash[1] : line).trim(),
        role: String(dash ? dash[2] : "").trim(),
      });
    }
    if (out.length >= 6) break;
  }
  return out.length ? out : fallback.slice(0, 6);
}

function normalizeRecommendedProducts(value, fallback) {
  if (!Array.isArray(value)) return fallback.slice(0, 6);
  const out = [];
  for (const item of value) {
    if (item && typeof item === "object") {
      const name = String(item.name ?? item.title ?? item.productName ?? item.category ?? "").trim();
      const why = String(item.why ?? item.role ?? item.sub ?? item.desc ?? item.fit ?? "").trim();
      if (!name) continue;
      out.push({ name, why });
    } else {
      const line = String(item ?? "").trim();
      if (!line) continue;
      const dash = line.match(/^([^:—–-]{1,80})\s*[:—–-]\s*(.+)$/);
      out.push({
        name: String(dash ? dash[1] : line).trim(),
        why: String(dash ? dash[2] : "").trim(),
      });
    }
    if (out.length >= 6) break;
  }
  return out.length ? out : fallback.slice(0, 6);
}

function normalizeEquipmentList(value, fallback) {
  const raw = pickList(value, fallback);
  return raw.map((item) => sanitizeLabel(item) || String(item).trim()).filter(Boolean).slice(0, 8);
}

function normalizeSignals(value, fallback) {
  const raw = pickList(value, fallback);
  return raw.map((item) => sanitizeLabel(item) || String(item).trim()).filter(Boolean).slice(0, 5);
}

function BravingTagline() {
  return (
    <p
      data-braving-tagline="true"
      style={{
        margin: 0,
        width: "100%",
        fontSize: "clamp(18px, 2.35vw, 30px)",
        fontWeight: 900,
        letterSpacing: "0.14em",
        lineHeight: 1.18,
        textTransform: "uppercase",
        textAlign: "center",
        background: `linear-gradient(92deg, ${BRAND.headerNavy} 0%, ${BRAND.navyMid} 38%, ${BRAND.orange} 78%, #c2410c 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      BRAVING THE FORCE OF MOVEMENT
    </p>
  );
}

function CardHeader({ title, subtitle }) {
  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
        padding: subtitle ? "12px 18px 14px" : "14px 18px",
        borderRadius: "10px 10px 0 0",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: "0.14em",
          color: BRAND.white,
          textTransform: "uppercase",
        }}
      >
        {title}
      </p>
      {subtitle ? (
        <p
          style={{
            margin: "6px 0 0",
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.88)",
            textTransform: "none",
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function FlyerCard({ title, subtitle, children }) {
  return (
    <section
      style={{
        minWidth: 0,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(203, 213, 225, 0.9)",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.09)",
        background: BRAND.white,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader title={title} subtitle={subtitle} />
      <div style={{ padding: "20px 20px 22px", flex: 1 }}>{children}</div>
    </section>
  );
}

function CheckBullets({ items, max = 5, cautionStyle = false }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
      {list.map((line, i) => (
        <li
          key={`chk-${i}`}
          style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.45, color: "#334155", fontWeight: 600 }}
        >
          <span
            style={{
              color: cautionStyle && i === 0 ? "#dc2626" : BRAND.orange,
              fontWeight: 900,
              flexShrink: 0,
            }}
            aria-hidden
          >
            {cautionStyle && i === 0 ? "!" : "\u2713"}
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function QuestionList({ items, max = 5 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
      {list.map((line, i) => (
        <li
          key={`q-${i}`}
          style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.45, color: "#334155", fontWeight: 600 }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: BRAND.navy,
              color: BRAND.white,
              fontSize: 12,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            aria-hidden
          >
            ?
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function PainIconSvg({ iconKey }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.28)";
  const k = String(iconKey || "shock");
  const s = 36;
  if (k === "contamination") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="14" cy="16" r="4" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <circle cx="26" cy="22" r="5" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <circle cx="18" cy="28" r="3" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "washout") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M10 26c4-8 8-12 12-12s8 4 12 12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <path d="M14 30h12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "bearing") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="10" stroke={stroke} strokeWidth="2" />
        <circle cx="20" cy="20" r="3" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "hydraulic") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="12" y="10" width="16" height="20" rx="3" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <path d="M16 18h8M16 24h6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "downtime") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="22" r="10" stroke={stroke} strokeWidth="2" />
        <path d="M20 14v8l5 3" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "heat") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M20 8v24M16 14h8M14 22h12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "pm") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M10 28h20M12 22h16M14 16h12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M12 28l8-14 4 8 8-12 6 10" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PainPointTile({ tile }) {
  return (
    <article
      style={{
        padding: "18px 14px 20px",
        borderRadius: 10,
        background: "linear-gradient(160deg, #f8fafc 0%, #ffffff 100%)",
        border: "1px solid rgba(30, 58, 138, 0.16)",
        borderTop: `3px solid ${BRAND.orange}`,
        textAlign: "center",
        minHeight: 140,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          margin: "0 auto",
          borderRadius: 999,
          background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
          border: "2px solid rgba(234, 88, 12, 0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden
      >
        <PainIconSvg iconKey={tile.iconKey} />
      </div>
      <p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.25 }}>
        {tile.label}
      </p>
      {tile.sub ? (
        <p style={{ margin: "6px 0 0", fontSize: 11, fontWeight: 600, color: "#64748b", lineHeight: 1.4 }}>
          {tile.sub}
        </p>
      ) : null}
    </article>
  );
}

function EquipmentIconSvg({ label }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.22)";
  const blob = String(label || "").toLowerCase();
  const s = 32;
  if (/conveyor|screen/.test(blob)) {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M8 24h24M8 20h24" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="24" r="3" fill={fill} stroke={stroke} strokeWidth="1.4" />
        <circle cx="28" cy="24" r="3" fill={fill} stroke={stroke} strokeWidth="1.4" />
      </svg>
    );
  }
  if (/loader|excavator|truck|haul/.test(blob)) {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="8" y="18" width="22" height="10" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <circle cx="14" cy="30" r="3" stroke={stroke} strokeWidth="1.6" />
        <circle cx="26" cy="30" r="3" stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (/crusher/.test(blob)) {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M12 12h16v8H12z" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <path d="M10 28h20" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="10" y="14" width="20" height="14" rx="3" fill={fill} stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

function EquipmentGrid({ items }) {
  const list = items.slice(0, 8);
  if (!list.length) return null;
  const cols = list.length <= 4 ? 2 : 3;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
      {list.map((label) => (
        <article
          key={label}
          style={{
            padding: "14px 10px",
            borderRadius: 10,
            background: BRAND.white,
            border: "1px solid rgba(30, 58, 138, 0.14)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              margin: "0 auto",
              borderRadius: 10,
              background: `linear-gradient(145deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden
          >
            <EquipmentIconSvg label={label} />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 800, color: BRAND.navy, lineHeight: 1.3 }}>
            {label}
          </p>
        </article>
      ))}
    </div>
  );
}

function LubricantNeedCard({ item }) {
  return (
    <article
      style={{
        padding: "14px 16px",
        borderRadius: 10,
        borderLeft: `4px solid ${BRAND.orange}`,
        background: "linear-gradient(155deg, #fff 0%, #f1f5f9 100%)",
        border: "1px solid rgba(30, 58, 138, 0.18)",
        borderLeftWidth: 4,
        borderLeftColor: BRAND.orange,
      }}
    >
      <p style={{ margin: 0, fontSize: 13, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.3 }}>
        {item.category}
      </p>
      {item.role ? (
        <p style={{ margin: "6px 0 0", fontSize: 12, fontWeight: 600, color: "#64748b", lineHeight: 1.4 }}>
          {item.role}
        </p>
      ) : null}
    </article>
  );
}

function RecommendedOpportunityCard({ item }) {
  return (
    <article
      style={{
        padding: "18px 18px 20px",
        borderRadius: 12,
        background: BRAND.white,
        border: "1px solid rgba(30, 58, 138, 0.2)",
        boxShadow: "0 8px 22px rgba(15, 23, 42, 0.07)",
        minHeight: 120,
      }}
    >
      <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.35 }}>
        {item.name}
      </p>
      {item.why ? (
        <p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 600, color: "#475569", lineHeight: 1.45 }}>
          {item.why}
        </p>
      ) : null}
    </article>
  );
}

function CrossSellGrid({ items, max = 5 }) {
  const list = [];
  for (const item of Array.isArray(items) ? items : []) {
    const s = sanitizeLabel(item);
    if (s && !list.some((x) => x.toLowerCase() === s.toLowerCase())) list.push(s);
    if (list.length >= max) break;
  }
  if (list.length < 2) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
      {list.map((title) => (
        <article
          key={title}
          style={{
            padding: "14px",
            borderRadius: 10,
            borderTop: `3px solid ${BRAND.orange}`,
            background: "linear-gradient(155deg, #fff 0%, #f1f5f9 100%)",
            border: "1px solid rgba(30, 58, 138, 0.2)",
            fontSize: 13,
            fontWeight: 900,
            color: BRAND.navy,
            textAlign: "center",
          }}
        >
          {title}
        </article>
      ))}
    </div>
  );
}

function SignalPills({ items }) {
  const list = items.slice(0, 5);
  if (!list.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {list.map((line, i) => (
        <span
          key={`sig-${i}`}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800,
            color: BRAND.navy,
            background: "#fff7ed",
            border: `1px solid ${BRAND.orangeMuted}`,
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}

function IndustryHeroVisual({ industryImageUrl }) {
  const img = String(industryImageUrl || "").trim();
  if (img) {
    return (
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(251, 146, 60, 0.45)",
          boxShadow: "0 20px 48px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src={img}
          alt="Industry"
          decoding="async"
          style={{ width: "100%", maxHeight: 300, objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        borderRadius: 16,
        padding: "44px 28px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(251, 146, 60, 0.4)",
        textAlign: "center",
      }}
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden style={{ margin: "0 auto 18px" }}>
        <path
          d="M14 52h44M18 44l8-16 10 12 8-14 10 18"
          stroke={BRAND.orangeLight}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="54" cy="18" r="5" fill={BRAND.orangeMuted} />
      </svg>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 900, letterSpacing: "0.12em", color: BRAND.orangeLight }}>
        INDUSTRY PLAYBOOK
      </p>
      <p style={{ margin: "10px 0 0", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.88)", lineHeight: 1.45 }}>
        Strategic customer profile for severe-duty sites and mixed equipment fleets.
      </p>
    </div>
  );
}

export default function CustomerProfileSellSheet(props) {
  const profileTitle = pickText(props.profileTitle, DEMO_DEFAULTS.profileTitle);
  const profileSubtitle = pickText(props.profileSubtitle, DEMO_DEFAULTS.profileSubtitle);
  const profileSummary = pickText(props.profileSummary, DEMO_DEFAULTS.profileSummary);
  const industryImageUrl = pickText(props.industryImageUrl, DEMO_DEFAULTS.industryImageUrl);
  const painTiles = normalizePainTiles(props.customerPainPoints, DEMO_DEFAULTS.customerPainPoints).map(
    (tile, i) => ({ ...tile, iconKey: painIconKey(tile, i) })
  );
  const equipmentTypes = normalizeEquipmentList(props.equipmentTypes, DEMO_DEFAULTS.equipmentTypes);
  const lubricantNeeds = normalizeLubricantNeeds(props.likelyLubricantNeeds, DEMO_DEFAULTS.likelyLubricantNeeds);
  const recommendedProducts = normalizeRecommendedProducts(
    props.recommendedProducts,
    DEMO_DEFAULTS.recommendedProducts
  );
  const opportunitySignals = normalizeSignals(
    props.opportunitySignals,
    DEMO_DEFAULTS.opportunitySignals
  );
  const { repTalkTrack, discoveryQuestions } = resolveRepTalkAndQuestions(
    props.repTalkTrack,
    props.discoveryQuestions,
    DEMO_DEFAULTS.repTalkTrack,
    DEMO_DEFAULTS.discoveryQuestions
  );
  const crossSell = pickList(props.crossSell, DEMO_DEFAULTS.crossSell);
  const cautions = pickList(props.cautions, DEMO_DEFAULTS.cautions);
  const recommendedNextStep = pickText(props.recommendedNextStep, DEMO_DEFAULTS.recommendedNextStep);

  const painCount = Math.min(Math.max(painTiles.length, 4), 6);
  const painGrid = painTiles.slice(0, painCount);
  const painCols = painCount <= 4 ? 2 : 3;

  return (
    <article
      data-layout={CUSTOMER_PROFILE_SELL_SHEET_LAYOUT_ID}
      data-sell-sheet-title={profileTitle.slice(0, 80)}
      style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        background: BRAND.white,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 28px 70px rgba(15, 23, 42, 0.16)",
        border: "1px solid rgba(203, 213, 225, 0.85)",
        fontFamily: '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
      }}
      aria-label="Customer profile sell sheet"
    >
      <header style={{ padding: "26px 40px 20px", background: BRAND.white }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(160px, 0.9fr) minmax(0, 2.4fr)",
            alignItems: "center",
            gap: 28,
          }}
        >
          <img
            src={KLONDIKE_HEADER_LOGO_SRC}
            alt="Klondike Performance Lubricants"
            decoding="async"
            style={{ height: 88, width: "auto", maxWidth: 340, objectFit: "contain" }}
          />
          <BravingTagline />
        </div>
        <div
          style={{
            marginTop: 20,
            height: 5,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${BRAND.orange} 0%, ${BRAND.orangeLight} 58%, rgba(30,58,138,0.4) 100%)`,
          }}
          aria-hidden
        />
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, 1fr)",
          minHeight: 480,
          background: `linear-gradient(125deg, ${BRAND.headerNavy} 0%, ${BRAND.navy} 42%, ${BRAND.navyMid} 100%)`,
          borderBottom: "1px solid rgba(226,232,240,0.95)",
        }}
      >
        <div style={{ padding: "44px 44px 48px", display: "grid", gap: 16, alignContent: "center" }}>
          <span
            style={{
              justifySelf: "start",
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.18em",
              padding: "6px 12px",
              borderRadius: 999,
              color: "#fff",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            CUSTOMER PROFILE
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px, 3.6vw, 46px)",
              fontWeight: 900,
              color: BRAND.white,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            {profileTitle}
          </h1>
          {profileSubtitle ? (
            <p
              style={{
                margin: 0,
                fontSize: "clamp(17px, 2.1vw, 24px)",
                fontWeight: 900,
                color: BRAND.orange,
                lineHeight: 1.25,
              }}
            >
              {profileSubtitle}
            </p>
          ) : null}
          {profileSummary ? (
            <p
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.6,
                maxWidth: 520,
              }}
            >
              {profileSummary}
            </p>
          ) : null}
        </div>
        <div style={{ padding: "36px 28px 40px 20px", display: "flex", alignItems: "center" }}>
          <IndustryHeroVisual industryImageUrl={industryImageUrl} />
        </div>
      </section>

      {painGrid.length ? (
        <section style={{ padding: "32px 44px 28px", background: "#f8fafc" }}>
          <p
            style={{
              margin: "0 0 18px",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "0.14em",
              color: BRAND.headerNavy,
              textTransform: "uppercase",
            }}
          >
            Customer reality and pain points
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${painCols}, minmax(0, 1fr))`,
              gap: 12,
            }}
          >
            {painGrid.map((tile) => (
              <PainPointTile key={tile.label} tile={tile} />
            ))}
          </div>
          {opportunitySignals.length ? (
            <div style={{ marginTop: 20 }}>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  color: BRAND.orange,
                  textTransform: "uppercase",
                }}
              >
                Opportunity signals to listen for
              </p>
              <SignalPills items={opportunitySignals} />
            </div>
          ) : null}
        </section>
      ) : null}

      <section style={{ padding: "28px 44px 36px", display: "grid", gap: 22, background: BRAND.white }}>
        <section style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {equipmentTypes.length ? (
            <FlyerCard title="Equipment and application map" subtitle="What runs on this site">
              <EquipmentGrid items={equipmentTypes} />
            </FlyerCard>
          ) : null}
          {lubricantNeeds.length ? (
            <FlyerCard title="Likely lubricant needs" subtitle="Category priorities for this profile">
              <div style={{ display: "grid", gap: 10 }}>
                {lubricantNeeds.slice(0, 6).map((item) => (
                  <LubricantNeedCard key={item.category} item={item} />
                ))}
              </div>
            </FlyerCard>
          ) : null}
        </section>

        {recommendedProducts.length ? (
          <section>
            <p
              style={{
                margin: "0 0 16px",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: "0.14em",
                color: BRAND.headerNavy,
                textTransform: "uppercase",
              }}
            >
              Recommended product opportunities
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(recommendedProducts.length, 2)}, minmax(0, 1fr))`,
                gap: 14,
              }}
            >
              {recommendedProducts.slice(0, 6).map((item) => (
                <RecommendedOpportunityCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ) : null}

        <section style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {repTalkTrack.length ? (
            <FlyerCard title="Rep talk track" subtitle="What the rep can say">
              <CheckBullets items={repTalkTrack} max={4} />
            </FlyerCard>
          ) : null}
          {discoveryQuestions.length ? (
            <FlyerCard title="Discovery questions" subtitle="What the rep should ask">
              <QuestionList items={discoveryQuestions} max={5} />
            </FlyerCard>
          ) : null}
        </section>

        {crossSell.length >= 2 ? (
          <FlyerCard title="Cross-sell and system strategy" subtitle="Grow the full lubrication program">
            <CrossSellGrid items={crossSell} max={5} />
          </FlyerCard>
        ) : null}

        {cautions.length ? (
          <FlyerCard title="Cautions and watchouts">
            <CheckBullets items={cautions} max={4} cautionStyle />
          </FlyerCard>
        ) : null}

        {recommendedNextStep ? (
          <section
            style={{
              borderRadius: 12,
              padding: "20px 24px",
              background: `linear-gradient(98deg, ${BRAND.orange} 0%, #c2410c 45%, ${BRAND.navyMid} 100%)`,
              color: BRAND.white,
            }}
          >
            <p style={{ margin: 0, fontSize: 10, fontWeight: 900, letterSpacing: "0.14em" }}>RECOMMENDED NEXT STEP</p>
            <p style={{ margin: "8px 0 0", fontSize: 17, fontWeight: 900, lineHeight: 1.32 }}>{recommendedNextStep}</p>
          </section>
        ) : null}
      </section>

      <section style={{ padding: "8px 20px 0", background: "#f8fafc", borderTop: "1px solid rgba(226,232,240,0.95)" }}>
        <img
          src="/products.png"
          alt="Klondike lubricants product lineup"
          decoding="async"
          style={{ width: "100%", minHeight: 260, maxHeight: 320, objectFit: "contain", display: "block", margin: "0 auto" }}
        />
      </section>

      <footer
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "20px 44px",
          background: BRAND.navy,
          borderTop: `4px solid ${BRAND.orange}`,
          color: BRAND.white,
        }}
      >
        <img src="/favicon.png" alt="" decoding="async" style={{ width: 24, height: 24, justifySelf: "start" }} />
        <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          DEPENDABLE PRODUCTS. REAL SOLUTIONS.
        </span>
        <a
          href="https://klondikelubricants.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 12, fontWeight: 800, color: BRAND.orangeLight, textDecoration: "none", justifySelf: "end" }}
        >
          klondikelubricants.com
        </a>
      </footer>
    </article>
  );
}

export { DEMO_DEFAULTS, BRAND };
