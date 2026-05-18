/**
 * ProductSpotlightSellSheet — locked manufacturer-style one-page sell sheet.
 * Layout id: product-spotlight-sell-sheet-v5k4 (SVG value icons, click-to-upload, PDS CTA).
 */

import React from "react";

export const PRODUCT_SPOTLIGHT_SELL_SHEET_LAYOUT_ID = "product-spotlight-sell-sheet-v5k4";

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
  slateLight: "#e2e8f0",
  white: "#ffffff",
};

const DEFAULT_VALUE_CARDS = [
  {
    iconKey: "protection",
    label: "Protection",
    sub: "Supports severe-duty loads and helps protect metal surfaces under pressure.",
  },
  {
    iconKey: "water",
    label: "Water Resistance",
    sub: "Formulation chemistry helps resist washout in wet and outdoor duty.",
  },
  {
    iconKey: "thermal",
    label: "Thermal Stability",
    sub: "Match grade and temperature range to OEM and field conditions.",
  },
  {
    iconKey: "uptime",
    label: "Uptime",
    sub: "Target longer maintenance intervals and fewer unplanned stops.",
  },
];

const DEFAULT_CROSS_SELL = [
  "Hydraulic Fluids",
  "Gear Oils",
  "Heavy Duty Engine Oils",
  "Industrial Lubricants",
];

const NANO_DIFFERENTIATOR_CALLOUT = {
  heading: "What makes Nano different?",
  body:
    "Proprietary tungsten disulfide nanotechnology helps reduce friction, cushion shock load, and protect metal surfaces under extreme pressure.",
};

const NANO_DEMO_DEFAULTS = {
  title: "KLONDIKE nano Calcium Sulfonate EP Grease",
  subtitle: "Nano Technology. Severe-Duty Protection.",
  summary:
    "Calcium sulfonate complex (CaS) EP grease for wet, high-load, and shock-load duty. Proprietary tungsten disulfide nanotechnology helps reduce friction and wear while supporting a protective film under extreme pressure—built to extend maintenance intervals in severe service.",
  productImageUrl: "",
  backgroundImageUrl: "",
  keySpecs: [
    "NLGI Grade 2",
    "4-Ball Weld Load: 800 kg",
    "Water Spray-Off: <1.0% (ASTM D1264)",
    "Dropping Point: 316°C (600°F)",
    "Timken OK Load: 65+ lbs",
    "4-Ball Wear Scar: 0.4 mm",
    "Operating Range: -30°C to 200°C (-22°F to 392°F)",
  ],
  benefits: [
    {
      iconKey: "protection",
      label: "Extreme Pressure Protection",
      sub: "800 kg 4-ball weld load supports heavily loaded pins, bushings, and slow-speed bearings.",
    },
    {
      iconKey: "nano",
      label: "Nano Friction Control",
      sub: "Tungsten disulfide nanotechnology helps reduce friction and protect metal under load.",
    },
    {
      iconKey: "water",
      label: "Water & Washout Resistance",
      sub: "CaS complex chemistry and low spray-off help resist washout in wet duty.",
    },
    {
      iconKey: "uptime",
      label: "Uptime",
      sub: "Built to extend maintenance intervals and reduce unplanned stops in severe service.",
    },
  ],
  applications: [
    "Mining",
    "Agriculture",
    "Construction",
    "Industrial Equipment",
    "Pins & Bushings",
    "Material Handling",
  ],
  whyThisProduct: [
    "Calcium sulfonate complex (CaS) with proprietary tungsten disulfide nanotechnology.",
    "NLGI 2 grease positioned for severe-duty, wet, and high-load environments.",
    "800 kg 4-ball weld load and 65+ lb Timken OK load for credible EP conversations.",
    "Water spray-off under 1.0% supports wet yards, wash-down, and outdoor fleets.",
    "Helps target reduced wear, longer intervals, and fewer unplanned stops.",
  ],
  repTalkTrack: [
    "Lead with Nano: calcium sulfonate complex plus proprietary tungsten disulfide nanotechnology.",
    "Position for wet duty, shock load, and the worst pins on the equipment map.",
    "Pilot on high-load, water-exposed, or high-vibration assets—not every fitting.",
    "Use weld load, Timken OK, and spray-off values to compare against shelf greases.",
  ],
  crossSell: [
    "Commercial Gear Oils",
    "AW Hydraulic Fluids",
    "Heavy Duty Engine Oils",
    "Industrial EP Gear Lubricants",
  ],
  questions: [
    "Where do shock load and vibration beat up pins, bushings, or slow-speed bearings?",
    "Is water or wash-down exposure stripping grease from your current EP program?",
    "Can your team cite 4-ball weld, Timken OK, and spray-off on the grease in service?",
    "Are you comparing commodity EP greases without a nano severe-duty story?",
    "What would reduced wear and fewer unplanned stops be worth on your costliest lines?",
  ],
  cautions: [
    "For professional / industrial use. Follow OEM and equipment builder recommendations.",
    "Store sealed; keep containers closed to avoid contamination.",
    "Do not mix with incompatible thickeners without flushing and consultation.",
    "See product data sheet and SDS for full details.",
  ],
  recommendedNextStep:
    "Review NLGI grade, tungsten disulfide nanotechnology, and EP/water values together—then pilot on the wettest, highest-load pins.",
};

function pickList(value, fallback) {
  if (!Array.isArray(value)) return fallback;
  const list = value.filter((item) => {
    if (item == null || item === false) return false;
    if (typeof item === "object") {
      return Boolean(String(item.label ?? item.sub ?? item.title ?? "").trim());
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

function normalizeBenefitTiles(value, fallback) {
  if (!Array.isArray(value)) return fallback;
  const tiles = [];
  for (const item of value) {
    if (item && typeof item === "object") {
      const label = String(item.label ?? "").trim();
      const sub = String(item.sub ?? "").trim();
      if (!label && !sub) continue;
      tiles.push({
        iconKey: String(item.iconKey || item.icon || "").trim(),
        label: label || sub.slice(0, 32),
        sub: sub || label,
      });
    } else {
      const line = String(item ?? "").trim();
      if (!line) continue;
      const dash = line.match(/^([^:—–-]{1,42})\s*[:—–-]\s*(.+)$/);
      tiles.push({
        icon: "•",
        label: String(dash ? dash[1] : line).slice(0, 32).trim(),
        sub: String(dash ? dash[2] : line).slice(0, 120).trim(),
      });
    }
    if (tiles.length >= 4) break;
  }
  return tiles.length ? tiles : fallback;
}

function resolveBenefitIconKey(tile, index) {
  const preset = String(tile?.iconKey || "").trim().toLowerCase();
  if (preset && ["protection", "water", "thermal", "uptime", "nano", "shock"].includes(preset)) {
    return preset;
  }
  const label = `${tile?.label || ""} ${tile?.sub || ""}`.toLowerCase();
  if (/nano|tungsten|friction|wear|surface/.test(label)) return "nano";
  if (/shock|impact|vibrat/.test(label)) return "shock";
  if (/water|wash|wet|spray|h2o|h₂o/.test(label)) return "water";
  if (/temp|therm|heat|cold|stabil|grade|nlgi|fit|spec/.test(label)) return "thermal";
  if (/uptime|interval|stop|maintain|downtime|service|life/.test(label)) return "uptime";
  if (/protect|shield|ep|pressure|metal/.test(label)) return "protection";
  return ["protection", "water", "thermal", "uptime"][index % 4];
}

function ensureFourValueCards(value, fallback) {
  const base = normalizeBenefitTiles(value, fallback);
  const out = base.map((t, i) => ({
    ...t,
    iconKey: resolveBenefitIconKey(t, i),
  }));
  for (let i = out.length; i < 4; i++) {
    out.push({ ...DEFAULT_VALUE_CARDS[i] });
  }
  return out.slice(0, 4);
}

function sanitizeCrossSellLabel(item) {
  if (item == null) return "";
  let s = "";
  if (typeof item === "object") {
    s = String(item.label ?? item.name ?? item.title ?? item.category ?? "").trim();
  } else {
    s = String(item).trim();
  }
  if (!s) return "";
  if (/^(overlay-|product-|canonical-|pds-|se-|pkg-)/i.test(s)) return "";
  if (/^[a-z0-9_-]{14,}$/i.test(s) && !/\s/.test(s)) return "";
  return s.replace(/_/g, " ");
}

function resolveCrossSellItems(items) {
  const cleaned = [];
  const raw = Array.isArray(items) ? items : [];
  for (const item of raw) {
    const s = sanitizeCrossSellLabel(item);
    if (s && !cleaned.some((x) => x.toLowerCase() === s.toLowerCase())) cleaned.push(s);
    if (cleaned.length >= 4) break;
  }
  if (cleaned.length >= 2) return cleaned.slice(0, 4);
  return [...DEFAULT_CROSS_SELL];
}

function pickPdsUrl(value) {
  const u = String(value ?? "").trim();
  if (!u) return "";
  if (u.startsWith("/pds/")) return u;
  if (/^https?:\/\//i.test(u)) {
    try {
      const path = new URL(u).pathname;
      return path.startsWith("/pds/") ? path : "";
    } catch {
      return "";
    }
  }
  return "";
}

function summaryLines(summary, max = 3) {
  const raw = String(summary || "").trim();
  if (!raw) return [];
  return raw
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, max);
}

function appIcon(label) {
  const t = String(label).toLowerCase();
  if (/mining/.test(t)) return "⛏️";
  if (/agri|farm/.test(t)) return "🚜";
  if (/construct/.test(t)) return "🏗️";
  if (/steel|paper|mill/.test(t)) return "🏭";
  if (/truck|fleet/.test(t)) return "🚛";
  if (/pin|bush/.test(t)) return "⚙️";
  if (/material|handling/.test(t)) return "📦";
  return "🔧";
}

function CardHeader({ title }) {
  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
        padding: "14px 18px",
        fontSize: 12,
        fontWeight: 900,
        letterSpacing: "0.14em",
        color: BRAND.white,
        textTransform: "uppercase",
        borderRadius: "10px 10px 0 0",
      }}
    >
      {title}
    </div>
  );
}

function FlyerCard({ title, children }) {
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
      <CardHeader title={title} />
      <div style={{ padding: "20px 20px 22px", flex: 1 }}>{children}</div>
    </section>
  );
}

function CheckBullets({ items, max = 5, cautionStyle = false }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 11 }}>
      {list.map((line, i) => (
        <li
          key={`chk-${i}`}
          style={{
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            fontSize: 14,
            lineHeight: 1.45,
            color: "#334155",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              color: cautionStyle && i === 0 ? "#dc2626" : BRAND.orange,
              fontWeight: 900,
              fontSize: cautionStyle && i === 0 ? 14 : 15,
              flexShrink: 0,
              lineHeight: 1.35,
            }}
            aria-hidden
          >
            {cautionStyle && i === 0 ? "!" : "✓"}
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function SpecBullets({ items, max = 6, large = false }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: large ? 12 : 9 }}>
      {list.map((line, i) => (
        <li
          key={`spec-${i}`}
          style={{
            display: "flex",
            gap: large ? 10 : 8,
            fontSize: large ? 14 : 12,
            lineHeight: large ? 1.45 : 1.38,
            color: "#e2e8f0",
            fontWeight: large ? 800 : 700,
          }}
        >
          <span
            style={{
              color: BRAND.orange,
              fontWeight: 900,
              flexShrink: 0,
              fontSize: large ? 16 : 14,
            }}
            aria-hidden
          >
            ✓
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function AppTiles({ items, max = 6 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  const cols = list.length <= 4 ? 2 : 3;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: 10,
      }}
    >
      {list.map((line, i) => (
        <article
          key={`app-${i}`}
          style={{
            padding: "12px 10px",
            borderRadius: 10,
            background: "linear-gradient(160deg, #f8fafc 0%, #ffffff 100%)",
            border: "1px solid rgba(30, 58, 138, 0.14)",
            textAlign: "center",
            fontSize: 12,
            fontWeight: 800,
            color: BRAND.navy,
            lineHeight: 1.35,
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              margin: "0 auto 8px",
              borderRadius: 999,
              background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
              fontSize: 20,
            }}
            aria-hidden
          >
            {appIcon(line)}
          </span>
          {line}
        </article>
      ))}
    </div>
  );
}

function QuestionList({ items, max = 5 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 11 }}>
      {list.map((line, i) => (
        <li
          key={`q-${i}`}
          style={{
            display: "flex",
            gap: 10,
            fontSize: 13,
            lineHeight: 1.45,
            color: "#334155",
            fontWeight: 600,
          }}
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

function crossSellIcon(label) {
  const t = String(label).toLowerCase();
  if (/hydraulic/.test(t)) return "🔩";
  if (/gear/.test(t)) return "⚙️";
  if (/engine|diesel|hd/.test(t)) return "🚛";
  if (/industrial|plant/.test(t)) return "🏭";
  if (/grease/.test(t)) return "🧴";
  return "🛢️";
}

function CrossSellTiles({ items, max = 4 }) {
  const list = resolveCrossSellItems(items).slice(0, max);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 10,
      }}
    >
      {list.map((line, i) => (
        <article
          key={`xs-${i}-${line}`}
          style={{
            padding: "16px 12px",
            borderRadius: 10,
            background: `linear-gradient(155deg, #ffffff 0%, #f1f5f9 100%)`,
            border: `1px solid rgba(30, 58, 138, 0.22)`,
            borderTop: `3px solid ${BRAND.orange}`,
            fontSize: 13,
            fontWeight: 800,
            color: BRAND.navy,
            lineHeight: 1.35,
            textAlign: "center",
            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.06)",
            minHeight: 88,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              marginBottom: 8,
              borderRadius: 999,
              background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
              fontSize: 22,
            }}
            aria-hidden
          >
            {crossSellIcon(line)}
          </span>
          {line}
        </article>
      ))}
    </div>
  );
}

function HeroNanoCallout() {
  return (
    <article
      style={{
        marginTop: 4,
        padding: "18px 20px",
        borderRadius: 12,
        background: "rgba(255, 255, 255, 0.07)",
        border: "1px solid rgba(251, 146, 60, 0.45)",
        borderLeft: `5px solid ${BRAND.orange}`,
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.22)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: BRAND.orangeLight,
        }}
      >
        {NANO_DIFFERENTIATOR_CALLOUT.heading}
      </p>
      <p
        style={{
          margin: "10px 0 0",
          fontSize: 16,
          lineHeight: 1.55,
          color: "rgba(255, 255, 255, 0.94)",
          fontWeight: 600,
        }}
      >
        {NANO_DIFFERENTIATOR_CALLOUT.body}
      </p>
    </article>
  );
}

function NanoDifferentiatorCallout() {
  return (
    <article
      style={{
        marginBottom: 16,
        padding: "14px 16px",
        borderRadius: 10,
        background: "#f8fafc",
        border: "1px solid rgba(203, 213, 225, 0.85)",
        borderLeft: `4px solid ${BRAND.orange}`,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: BRAND.headerNavy,
        }}
      >
        {NANO_DIFFERENTIATOR_CALLOUT.heading}
      </p>
      <p
        style={{
          margin: "10px 0 0",
          fontSize: 14,
          lineHeight: 1.5,
          color: "#334155",
          fontWeight: 600,
        }}
      >
        {NANO_DIFFERENTIATOR_CALLOUT.body}
      </p>
    </article>
  );
}

function ValueStoryIconSvg({ iconKey }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.22)";
  const key = String(iconKey || "protection").toLowerCase();

  if (key === "water") {
    return (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <path
          d="M22 6c-6 8-10 13-10 18a10 10 0 1 0 20 0c0-5-4-10-10-18z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
        />
        <path d="M10 32c3 2 7 3 12 3s9-1 12-3" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (key === "thermal") {
    return (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <rect x="18" y="8" width="8" height="24" rx="4" fill={fill} stroke={stroke} strokeWidth="2" />
        <circle cx="22" cy="34" r="5" fill={fill} stroke={stroke} strokeWidth="2" />
        <path d="M22 14v12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <path d="M20 18h4M20 22h4M20 26h4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (key === "uptime") {
    return (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <circle cx="22" cy="22" r="14" fill={fill} stroke={stroke} strokeWidth="2" />
        <path d="M22 12v10l7 5" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="6" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <path d="M30 32h4M32 30v4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (key === "nano") {
    return (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <circle cx="14" cy="22" r="4" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <circle cx="30" cy="14" r="3" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <circle cx="30" cy="30" r="3" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <path d="M17 20l10-4M17 24l10 4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 34h28" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      </svg>
    );
  }
  if (key === "shock") {
    return (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <path
          d="M10 28h8l-2 8 18-20h-9l3-10-8 22z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
      <path
        d="M22 6l10 4v10c0 8-5 14-10 16-5-2-10-8-10-16V10l10-4z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M16 22l4 4 8-9" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 30h20" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function ValueStoryIcon({ iconKey }) {
  return (
    <div
      style={{
        width: 84,
        height: 84,
        margin: "0 auto",
        borderRadius: 999,
        background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
        border: "3px solid rgba(234, 88, 12, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.28)",
      }}
      aria-hidden
    >
      <ValueStoryIconSvg iconKey={iconKey} />
    </div>
  );
}

function ProductImageCard({
  title,
  productImageUrl,
  onProductImageClick,
  productImageUploadLabel,
}) {
  const clickable = typeof onProductImageClick === "function";
  const uploadHint =
    String(productImageUploadLabel || "").trim() || "Click to upload product image";
  const replaceAriaLabel = "Replace product image";

  const cardStyle = {
    position: "relative",
    width: productImageUrl ? "min(100%, 460px)" : "min(100%, 420px)",
    marginLeft: "auto",
    borderRadius: 18,
    background: BRAND.white,
    border: clickable
      ? `2px dashed rgba(234, 88, 12, 0.55)`
      : "1px solid rgba(226, 232, 240, 0.98)",
    boxShadow: productImageUrl
      ? "0 28px 64px rgba(15, 23, 42, 0.42), 0 0 0 1px rgba(255,255,255,0.12)"
      : "0 24px 56px rgba(15, 23, 42, 0.32)",
    cursor: clickable ? "pointer" : "default",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  };

  const inner = productImageUrl ? (
    <>
      <img
        src={productImageUrl}
        alt={title}
        decoding="async"
        style={{
          width: "100%",
          minHeight: 280,
          maxHeight: 420,
          objectFit: "contain",
          display: "block",
          margin: "0 auto",
          pointerEvents: "none",
        }}
      />
    </>
  ) : (
    <div
      style={{
        minHeight: 300,
        padding: "48px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          margin: "0 auto 18px",
          borderRadius: 16,
          background: "linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%)",
          border: "2px dashed rgba(148, 163, 184, 0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="6" y="10" width="28" height="22" rx="4" stroke={BRAND.slate} strokeWidth="2" />
          <circle cx="14" cy="18" r="3" fill={BRAND.orangeMuted} stroke={BRAND.orange} strokeWidth="1.5" />
          <path d="M6 28l8-7 6 5 8-9 6 6" stroke={BRAND.navyMid} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          fontWeight: 900,
          color: BRAND.headerNavy,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Product photo
      </p>
      <p
        style={{
          margin: "10px 0 0",
          fontSize: 13,
          fontWeight: 600,
          color: "#64748b",
          lineHeight: 1.45,
          maxWidth: 280,
        }}
      >
        {uploadHint}
      </p>
    </div>
  );

  if (!clickable) {
    return (
      <div style={{ ...cardStyle, padding: productImageUrl ? "26px 28px" : 0 }}>{inner}</div>
    );
  }

  return (
    <button
      type="button"
      onClick={onProductImageClick}
      style={{
        ...cardStyle,
        padding: productImageUrl ? "26px 28px" : 0,
        display: "block",
        textAlign: "inherit",
        font: "inherit",
      }}
      aria-label={productImageUrl ? replaceAriaLabel : uploadHint}
    >
      {inner}
    </button>
  );
}

export default function ProductSpotlightSellSheet(props) {
  const title = pickText(props.title, NANO_DEMO_DEFAULTS.title);
  const subtitle = pickText(props.subtitle, NANO_DEMO_DEFAULTS.subtitle);
  const summary = pickText(props.summary, NANO_DEMO_DEFAULTS.summary);
  const productImageUrl = pickText(props.productImageUrl, NANO_DEMO_DEFAULTS.productImageUrl);
  const keySpecs = pickList(props.keySpecs, NANO_DEMO_DEFAULTS.keySpecs);
  const benefits = ensureFourValueCards(props.benefits, NANO_DEMO_DEFAULTS.benefits);
  const applications = pickList(props.applications, NANO_DEMO_DEFAULTS.applications);
  const whyThisProduct = pickList(props.whyThisProduct, NANO_DEMO_DEFAULTS.whyThisProduct);
  const repTalkTrack = pickList(props.repTalkTrack, NANO_DEMO_DEFAULTS.repTalkTrack);
  const crossSell = resolveCrossSellItems(props.crossSell);
  const questions = pickList(props.questions, NANO_DEMO_DEFAULTS.questions);
  const cautions = pickList(props.cautions, NANO_DEMO_DEFAULTS.cautions);
  const recommendedNextStep = pickText(
    props.recommendedNextStep,
    NANO_DEMO_DEFAULTS.recommendedNextStep
  );
  const pdsUrl = pickPdsUrl(props.pdsUrl);
  const onProductImageClick =
    typeof props.onProductImageClick === "function" ? props.onProductImageClick : null;
  const productImageUploadLabel = String(props.productImageUploadLabel || "").trim();

  const showNanoDifferentiator =
    !Array.isArray(props.whyThisProduct) || props.whyThisProduct.filter(Boolean).length === 0;

  const heroSummaryLines = summaryLines(summary, 4);

  return (
    <article
      data-layout={PRODUCT_SPOTLIGHT_SELL_SHEET_LAYOUT_ID}
      data-sell-sheet-title={title.slice(0, 80)}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        background: BRAND.white,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 28px 70px rgba(15, 23, 42, 0.16), 0 1px 0 rgba(15, 23, 42, 0.06)",
        border: "1px solid rgba(203, 213, 225, 0.85)",
        fontFamily:
          '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
      }}
      aria-label="Product spotlight sell sheet"
    >
      <header
        style={{
          padding: "26px 40px 20px",
          background: BRAND.white,
          minHeight: 118,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.35fr) minmax(0, 1fr)",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div style={{ justifySelf: "start", minWidth: 0 }}>
            <img
              src={KLONDIKE_HEADER_LOGO_SRC}
              alt="Klondike Performance Lubricants"
              decoding="async"
              style={{
                height: 96,
                width: "auto",
                maxWidth: "min(100%, 380px)",
                objectFit: "contain",
                objectPosition: "left center",
                display: "block",
              }}
            />
          </div>
          <p
            data-braving-tagline="true"
            style={{
              margin: 0,
              fontSize: "clamp(13px, 1.35vw, 17px)",
              fontWeight: 900,
              letterSpacing: "0.12em",
              lineHeight: 1.25,
              color: BRAND.headerNavy,
              textTransform: "uppercase",
              textAlign: "center",
              justifySelf: "center",
              padding: "0 8px",
            }}
          >
            BRAVING THE FORCE OF MOVEMENT
          </p>
          <div style={{ justifySelf: "end", textAlign: "right", minWidth: 0, paddingLeft: 8 }}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(20px, 2.1vw, 26px)",
                fontWeight: 900,
                letterSpacing: "0.07em",
                lineHeight: 1.12,
                color: BRAND.orange,
                textTransform: "uppercase",
              }}
            >
              WE GROW
            </p>
            <p
              style={{
                margin: "5px 0 0",
                fontSize: "clamp(13px, 1.4vw, 17px)",
                fontWeight: 900,
                letterSpacing: "0.09em",
                lineHeight: 1.2,
                color: BRAND.headerNavy,
                textTransform: "uppercase",
              }}
            >
              INDEPENDENT BUSINESS
            </p>
          </div>
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
          gridTemplateColumns: "minmax(0, 1.12fr) minmax(380px, 1fr)",
          minHeight: 560,
          overflow: "hidden",
          borderBottom: "1px solid rgba(226, 232, 240, 0.95)",
          background: `linear-gradient(125deg, ${BRAND.headerNavy} 0%, ${BRAND.navy} 38%, ${BRAND.navyMid} 72%, #1d4ed8 100%)`,
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 18,
            alignContent: "center",
            padding: "48px 44px 52px",
            zIndex: 2,
          }}
        >
          <span
            style={{
              justifySelf: "start",
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.18em",
              padding: "6px 12px",
              borderRadius: 999,
              color: "#fff",
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            PRODUCT SPOTLIGHT
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(34px, 4.2vw, 52px)",
              fontWeight: 900,
              color: BRAND.white,
              letterSpacing: "-0.035em",
              lineHeight: 1.04,
              textShadow: "0 4px 24px rgba(0,0,0,0.25)",
            }}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              style={{
                margin: 0,
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 900,
                color: BRAND.orange,
                lineHeight: 1.22,
                letterSpacing: "-0.01em",
              }}
            >
              {subtitle}
            </p>
          ) : null}
          {heroSummaryLines.length ? (
            <p
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 600,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.62,
                maxWidth: 540,
              }}
            >
              {heroSummaryLines.join(" ")}
            </p>
          ) : null}
          <HeroNanoCallout />
        </div>

        <div
          style={{
            position: "relative",
            minHeight: 560,
            overflow: "hidden",
            display: "grid",
            gridTemplateRows: "1fr auto",
            alignItems: "stretch",
            padding: "36px 36px 40px 28px",
            gap: 22,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background: `
                radial-gradient(ellipse 80% 70% at 72% 40%, rgba(234, 88, 12, 0.12) 0%, transparent 55%),
                radial-gradient(ellipse 70% 80% at 50% 50%, rgba(30,58,138,0.2) 0%, transparent 70%),
                linear-gradient(90deg, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.08) 45%, rgba(15,23,42,0.2) 100%)
              `,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 0,
              flex: 1,
            }}
          >
          <ProductImageCard
            title={title}
            productImageUrl={productImageUrl}
            onProductImageClick={onProductImageClick}
            productImageUploadLabel={productImageUploadLabel}
          />
          </div>
          {keySpecs.length ? (
            <article
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                maxWidth: 460,
                marginLeft: "auto",
                padding: "22px 20px 24px",
                borderRadius: 14,
                background: `linear-gradient(165deg, ${BRAND.navyDeep} 0%, ${BRAND.navy} 100%)`,
                border: "1px solid rgba(251, 146, 60, 0.5)",
                boxShadow: "0 18px 44px rgba(0,0,0,0.45)",
              }}
            >
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.16em",
                  color: BRAND.orange,
                  textTransform: "uppercase",
                }}
              >
                Key specifications
              </p>
              <SpecBullets items={keySpecs} max={6} large />
            </article>
          ) : null}
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          borderBottom: "1px solid rgba(226, 232, 240, 0.95)",
          background: BRAND.white,
        }}
      >
        {benefits.map((t, i) => (
            <article
              key={`ben-${i}-${t.label || i}`}
              style={{
                padding: "34px 20px 38px",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(226, 232, 240, 0.95)" : undefined,
              }}
            >
              <ValueStoryIcon iconKey={t.iconKey} />
              <p
                style={{
                  margin: "16px 0 0",
                  fontSize: 13,
                  fontWeight: 900,
                  color: BRAND.orange,
                  letterSpacing: "0.06em",
                  lineHeight: 1.28,
                  textTransform: "uppercase",
                }}
              >
                {t.label || t}
              </p>
              {t.sub ? (
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#475569",
                    lineHeight: 1.45,
                    maxWidth: 240,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {t.sub}
                </p>
              ) : null}
            </article>
          ))}
      </section>

      <section style={{ padding: "32px 44px 32px", display: "grid", gap: 24, background: BRAND.white }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {applications.length ? (
            <FlyerCard title="Best-fit applications">
              <AppTiles items={applications} max={6} />
            </FlyerCard>
          ) : null}
          {whyThisProduct.length ? (
            <FlyerCard title="Why this product?">
              {showNanoDifferentiator ? <NanoDifferentiatorCallout /> : null}
              <CheckBullets items={whyThisProduct} max={5} />
            </FlyerCard>
          ) : null}
          {repTalkTrack.length ? (
            <FlyerCard title="Rep talk track">
              <CheckBullets items={repTalkTrack} max={4} />
            </FlyerCard>
          ) : null}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          <FlyerCard title="Cross-sell & system solutions">
            <CrossSellTiles items={crossSell} max={4} />
          </FlyerCard>
          {questions.length ? (
            <FlyerCard title="Questions to ask your customer">
              <QuestionList items={questions} max={5} />
            </FlyerCard>
          ) : null}
          {cautions.length ? (
            <FlyerCard title="Use / handling / cautions">
              <CheckBullets items={cautions} max={4} cautionStyle />
            </FlyerCard>
          ) : null}
        </section>

        {recommendedNextStep ? (
          <section
            style={{
              borderRadius: 12,
              overflow: "hidden",
              background: `linear-gradient(98deg, ${BRAND.orange} 0%, #c2410c 42%, ${BRAND.navyMid} 100%)`,
              boxShadow: "0 14px 36px rgba(194, 65, 12, 0.28)",
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              color: BRAND.white,
            }}
          >
            <div style={{ display: "flex", gap: 18, alignItems: "center", flex: "1 1 280px", minWidth: 0 }}>
              <span
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.16)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}
                aria-hidden
              >
                →
              </span>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: "0.14em",
                    opacity: 0.92,
                  }}
                >
                  RECOMMENDED NEXT STEP
                </p>
                <p style={{ margin: "8px 0 0", fontSize: 17, fontWeight: 900, lineHeight: 1.32 }}>
                  {recommendedNextStep}
                </p>
              </div>
            </div>
            {pdsUrl ? (
              <a
                href={pdsUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 22px",
                  borderRadius: 10,
                  background: BRAND.white,
                  color: BRAND.navy,
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 8px 20px rgba(15, 23, 42, 0.2)",
                  border: `2px solid ${BRAND.orangeLight}`,
                }}
              >
                Open PDS
              </a>
            ) : null}
          </section>
        ) : null}
      </section>

      <section
        style={{
          padding: "8px 20px 0",
          background: "#f8fafc",
          borderTop: "1px solid rgba(226, 232, 240, 0.95)",
        }}
      >
        <img
          src="/products.png"
          alt="Klondike lubricants product lineup"
          decoding="async"
          style={{
            width: "100%",
            height: "auto",
            minHeight: 280,
            maxHeight: 340,
            objectFit: "contain",
            objectPosition: "center bottom",
            display: "block",
            margin: "0 auto",
          }}
        />
      </section>

      <footer
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 16,
          padding: "20px 44px",
          background: BRAND.navy,
          borderTop: `4px solid ${BRAND.orange}`,
          color: BRAND.white,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifySelf: "start" }}>
          <img
            src="/favicon.png"
            alt="Klondike"
            decoding="async"
            style={{ width: 24, height: 24, flexShrink: 0, display: "block" }}
          />
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          DEPENDABLE PRODUCTS. REAL SOLUTIONS.
        </span>
        <a
          href="https://klondikelubricants.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: BRAND.orangeLight,
            textDecoration: "none",
            justifySelf: "end",
          }}
        >
          klondikelubricants.com
        </a>
      </footer>
    </article>
  );
}

export { NANO_DEMO_DEFAULTS, BRAND };
