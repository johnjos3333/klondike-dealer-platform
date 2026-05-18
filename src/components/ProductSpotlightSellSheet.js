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
  {
    title: "Hydraulic Fluids",
    desc: "Pump, cylinder, and mobile-hydraulic reliability for mixed fleets.",
    iconKey: "hydraulic",
  },
  {
    title: "Gear Oils",
    desc: "Drivetrain protection for axles, differentials, and gearboxes.",
    iconKey: "gear",
  },
  {
    title: "Heavy Duty Engine Oils",
    desc: "CK-4 and severe-duty engine programs for on- and off-highway.",
    iconKey: "engine",
  },
  {
    title: "Industrial Lubricants",
    desc: "Plant-wide oils, circulating, and specialty industrial programs.",
    iconKey: "industrial",
  },
];

const CROSS_SELL_CATALOG = [
  ...DEFAULT_CROSS_SELL,
  {
    title: "Commercial Gear Oils",
    desc: "Fleet and industrial gear protection across viscosity grades.",
    iconKey: "gear",
  },
  {
    title: "AW Hydraulic Fluids",
    desc: "Anti-wear hydraulic programs for construction and agriculture.",
    iconKey: "hydraulic",
  },
  {
    title: "Industrial EP Gear Lubricants",
    desc: "High-load industrial gearbox and reducer protection.",
    iconKey: "gear",
  },
  {
    title: "Greases",
    desc: "EP, synthetic, and specialty grease programs for pins and bearings.",
    iconKey: "grease",
  },
];

const DIFFERENTIATOR_HEADING = "What makes it different?";

const EMPHASIS_PHRASES = [
  "ENVIRONMENTALLY ACCEPTABLE",
  "CALCIUM SULFONATE",
  "NITRITE FREE",
  "NITRITE-FREE",
  "EXTENDED LIFE",
  "FOOD GRADE",
  "FOOD-GRADE",
  "FULL SYNTHETIC",
  "HEAVY DUTY",
  "HEAVY-DUTY",
  "WET BRAKE",
  "ZINC FREE",
  "ZINC-FREE",
  "NSF H1",
  "NSF H-1",
  "CK-4",
  "CK4",
  "FA-4",
  "AGRIMAX",
  "BIODEGRADABLE",
  "SYNTHETIC BLEND",
];

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

function crossSellIconKeyForTitle(title) {
  const t = String(title || "").toLowerCase();
  if (/hydraulic|aw fluid|tractor fluid/.test(t)) return "hydraulic";
  if (/gear|drivetrain|transmission/.test(t)) return "gear";
  if (/engine|diesel|hd oil|ck-4|ck4|motor oil/.test(t)) return "engine";
  if (/grease|tac|sulfonate/.test(t)) return "grease";
  if (/industrial|plant|compressor|turbine/.test(t)) return "industrial";
  if (/coolant|antifreeze|brake|chemical/.test(t)) return "chemical";
  return "industrial";
}

function lookupCrossSellMeta(title) {
  const label = String(title || "").trim();
  if (!label) return null;
  const hit = CROSS_SELL_CATALOG.find((x) => x.title.toLowerCase() === label.toLowerCase());
  if (hit) return { ...hit };
  return {
    title: label,
    desc: "Expand the lubrication program with a matched KLONDIKE category.",
    iconKey: crossSellIconKeyForTitle(label),
  };
}

function resolveCrossSellItems(items) {
  const cleaned = [];
  const raw = Array.isArray(items) ? items : [];
  for (const item of raw) {
    const s = sanitizeCrossSellLabel(item);
    if (s && !cleaned.some((x) => x.toLowerCase() === s.toLowerCase())) cleaned.push(s);
    if (cleaned.length >= 4) break;
  }
  if (cleaned.length >= 2) return cleaned.map((title) => lookupCrossSellMeta(title)).slice(0, 4);
  return DEFAULT_CROSS_SELL.map((x) => ({ ...x }));
}

function isPublicPdsPdfHref(value) {
  const href = String(value ?? "").trim();
  if (!href) return false;
  if (/^https?:\/\//i.test(href) || /localhost/i.test(href)) return false;
  return href.startsWith("/pds/") && /\.pdf$/i.test(href);
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

function phrasePatternForEmphasis(phrase) {
  return String(phrase || "")
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\s+/g, "\\s+")
    .replace(/-/g, "[-\\s]?");
}

function splitByEmphasisPhrases(text) {
  const raw = String(text ?? "");
  if (!raw.trim()) return [{ text: raw, emphasized: false }];
  const pattern = EMPHASIS_PHRASES.map(phrasePatternForEmphasis)
    .sort((a, b) => b.length - a.length)
    .join("|");
  if (!pattern) return [{ text: raw, emphasized: false }];
  const re = new RegExp(`(${pattern})`, "gi");
  const parts = [];
  let last = 0;
  let match = re.exec(raw);
  while (match) {
    if (match.index > last) {
      parts.push({ text: raw.slice(last, match.index), emphasized: false });
    }
    parts.push({ text: match[0], emphasized: true });
    last = match.index + match[0].length;
    match = re.exec(raw);
  }
  if (last < raw.length) parts.push({ text: raw.slice(last), emphasized: false });
  return parts.length ? parts : [{ text: raw, emphasized: false }];
}

function EmphasizedText({ text, as: Tag = "span", style, emphasisStyle }) {
  const parts = splitByEmphasisPhrases(text);
  const baseStyle = style || {};
  const emphStyle = {
    fontWeight: 900,
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    ...(emphasisStyle || {}),
  };
  return (
    <Tag style={baseStyle}>
      {parts.map((part, i) =>
        part.emphasized ? (
          <span key={`em-${i}`} style={emphStyle}>
            {part.text}
          </span>
        ) : (
          <React.Fragment key={`tx-${i}`}>{part.text}</React.Fragment>
        )
      )}
    </Tag>
  );
}

function normalizeDifferentiator(value) {
  if (value == null) return null;
  if (typeof value === "string") {
    const body = String(value).trim();
    if (!body) return null;
    return { heading: DIFFERENTIATOR_HEADING, body };
  }
  if (typeof value === "object") {
    const body = String(value.body ?? value.text ?? value.summary ?? "").trim();
    if (!body) return null;
    const heading = String(value.heading ?? value.title ?? DIFFERENTIATOR_HEADING).trim();
    return { heading: heading || DIFFERENTIATOR_HEADING, body };
  }
  return null;
}

function deriveProductDifferentiator({
  title,
  subtitle,
  summary,
  keySpecs,
  applications,
  whyThisProduct,
}) {
  const blob = [
    title,
    subtitle,
    summary,
    ...(Array.isArray(keySpecs) ? keySpecs : []),
    ...(Array.isArray(applications) ? applications : []),
    ...(Array.isArray(whyThisProduct) ? whyThisProduct : []),
  ]
    .map((x) => String(x ?? "").trim())
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/nano|tungsten|ws[\s₂2]|calcium sulfonate/.test(blob)) {
    return {
      heading: DIFFERENTIATOR_HEADING,
      body:
        "Proprietary tungsten disulfide nanotechnology helps reduce friction, cushion shock load, and protect metal surfaces under extreme pressure.",
    };
  }
  if (/nitrite[- ]?free|noat|oat elc|extended[- ]life coolant|gold (hd|automotive)|yellow automotive oat/.test(blob)) {
    return {
      heading: DIFFERENTIATOR_HEADING,
      body:
        "Nitrite-free extended-life coolant chemistry for modern heavy-duty and mixed-metal cooling systems.",
    };
  }
  if (/food[- ]?grade|nsf\s*h[- ]?1|h1 registration|incidental food/.test(blob)) {
    return {
      heading: DIFFERENTIATOR_HEADING,
      body: "NSF H1 food-safe lubrication for equipment where incidental food contact is possible.",
    };
  }
  if (/\beal\b|biodegradable|enviro|vgp|hees|environmentally acceptable/.test(blob)) {
    return {
      heading: DIFFERENTIATOR_HEADING,
      body:
        "Environmentally acceptable, biodegradable lubrication for sensitive sites and regulatory-sensitive duty.",
    };
  }
  if (/agrimax|wet brake|universal tractor|j20|jdm|cnh fluid/.test(blob)) {
    return {
      heading: DIFFERENTIATOR_HEADING,
      body:
        "Wet brake and transmission compatibility for agriculture and mixed tractor-hydraulic duty.",
    };
  }
  if (/ck-4|ck4|fa-4|heavy[- ]duty engine|15w-40|10w-30/.test(blob)) {
    return {
      heading: DIFFERENTIATOR_HEADING,
      body:
        "Heavy-duty engine oil chemistry aligned to OEM drain intervals, soot control, and fleet severe-duty programs.",
    };
  }
  if (/aw hydraulic|anti[- ]wear hydraulic|hydraulic fluid/.test(blob)) {
    return {
      heading: DIFFERENTIATOR_HEADING,
      body:
        "Anti-wear hydraulic protection for pumps, cylinders, and mobile equipment operating under load and heat.",
    };
  }
  if (/gear oil|hypoid|gl-5|drivetrain|industrial ep gear/.test(blob)) {
    return {
      heading: DIFFERENTIATOR_HEADING,
      body: "Gear and drivetrain protection for loaded axles, differentials, and industrial gearboxes.",
    };
  }
  if (/moly tac|ep[- ]?2|ep grease|grease/.test(blob)) {
    return {
      heading: DIFFERENTIATOR_HEADING,
      body: "EP grease chemistry for pins, bushings, and severe-duty joints where load and contamination meet.",
    };
  }

  const firstWhy = Array.isArray(whyThisProduct)
    ? String(whyThisProduct.find(Boolean) ?? "").trim()
    : "";
  if (firstWhy) return { heading: DIFFERENTIATOR_HEADING, body: firstWhy };

  const summaryLine = summaryLines(summary, 1)[0];
  if (summaryLine) return { heading: DIFFERENTIATOR_HEADING, body: summaryLine };

  const firstSpec = Array.isArray(keySpecs) ? String(keySpecs[0] ?? "").trim() : "";
  if (firstSpec) {
    return {
      heading: DIFFERENTIATOR_HEADING,
      body: `Built around ${firstSpec} for the applications you service most.`,
    };
  }

  return null;
}

function resolveProductDifferentiator(props) {
  const fromProp = normalizeDifferentiator(props.whatMakesItDifferent);
  if (fromProp) return fromProp;
  return deriveProductDifferentiator({
    title: props.title,
    subtitle: props.subtitle,
    summary: props.summary,
    keySpecs: props.keySpecs,
    applications: props.applications,
    whyThisProduct: props.whyThisProduct,
  });
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

function CrossSellIconSvg({ iconKey }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.28)";
  const key = String(iconKey || "industrial").toLowerCase();

  if (key === "hydraulic") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
        <rect x="5" y="11" width="24" height="12" rx="3" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <path d="M9 17h6M19 17h6" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="17" r="2.5" fill={fill} stroke={stroke} strokeWidth="1.4" />
        <circle cx="25" cy="17" r="2.5" fill={fill} stroke={stroke} strokeWidth="1.4" />
        <path d="M17 5v6M14 8h6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (key === "gear") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
        <circle cx="17" cy="17" r="9" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <path
          d="M17 8v3M17 23v3M8 17h3M23 17h3M11.5 11.5l2 2M20.5 20.5l2 2M22.5 11.5l-2 2M13.5 20.5l-2 2"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="17" cy="17" r="3.5" fill={fill} stroke={stroke} strokeWidth="1.4" />
      </svg>
    );
  }
  if (key === "engine") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
        <rect x="6" y="12" width="22" height="12" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <path d="M10 16h14M10 20h10" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6 17H4M30 17h-2" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 8v4M22 8v4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (key === "grease") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
        <path
          d="M12 8h10l3 5v13H9V13l3-5z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M12 16h10M12 21h7" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="24" cy="10" r="2" fill={fill} stroke={stroke} strokeWidth="1.3" />
      </svg>
    );
  }
  if (key === "chemical") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
        <path d="M11 10h12v16H11V10z" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <path d="M13 14h8M13 18h8M13 22h5" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M14 10V7h6v3" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
      <rect x="7" y="9" width="20" height="16" rx="2" fill={fill} stroke={stroke} strokeWidth="1.8" />
      <path d="M11 14h12M11 18h8M11 22h10" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 26h20" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

function CrossSellTiles({ items, max = 4 }) {
  const list = resolveCrossSellItems(items).slice(0, max);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 12,
      }}
    >
      {list.map((item, i) => (
        <article
          key={`xs-${i}-${item.title}`}
          style={{
            padding: "14px 12px 16px",
            borderRadius: 12,
            background: `linear-gradient(155deg, #ffffff 0%, #f1f5f9 100%)`,
            border: `1px solid rgba(30, 58, 138, 0.22)`,
            borderTop: `3px solid ${BRAND.orange}`,
            boxShadow: "0 8px 20px rgba(15, 23, 42, 0.07)",
            minHeight: 112,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              marginBottom: 10,
              borderRadius: 999,
              background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
              border: "2px solid rgba(234, 88, 12, 0.45)",
              boxShadow: "0 6px 14px rgba(15, 23, 42, 0.2)",
            }}
            aria-hidden
          >
            <CrossSellIconSvg iconKey={item.iconKey} />
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 900,
              color: BRAND.navy,
              lineHeight: 1.3,
              letterSpacing: "0.02em",
            }}
          >
            {item.title}
          </p>
          {item.desc ? (
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 11,
                fontWeight: 600,
                color: "#64748b",
                lineHeight: 1.4,
                maxWidth: 200,
              }}
            >
              {item.desc}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
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

function ProductDifferentiatorCallout({ differentiator, variant = "hero" }) {
  if (!differentiator?.body) return null;
  const isHero = variant === "hero";
  return (
    <article
      style={{
        marginTop: isHero ? 4 : 0,
        marginBottom: isHero ? 0 : 16,
        padding: isHero ? "18px 20px" : "14px 16px",
        borderRadius: isHero ? 12 : 10,
        background: isHero ? "rgba(255, 255, 255, 0.07)" : "#f8fafc",
        border: isHero
          ? "1px solid rgba(251, 146, 60, 0.45)"
          : "1px solid rgba(203, 213, 225, 0.85)",
        borderLeft: `${isHero ? 5 : 4}px solid ${BRAND.orange}`,
        boxShadow: isHero ? "0 12px 32px rgba(0, 0, 0, 0.22)" : undefined,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: isHero ? 12 : 11,
          fontWeight: 900,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: isHero ? BRAND.orangeLight : BRAND.headerNavy,
        }}
      >
        {differentiator.heading || DIFFERENTIATOR_HEADING}
      </p>
      <p
        style={{
          margin: "10px 0 0",
          fontSize: isHero ? 16 : 14,
          lineHeight: 1.55,
          color: isHero ? "rgba(255, 255, 255, 0.94)" : "#334155",
          fontWeight: 600,
        }}
      >
        <EmphasizedText text={differentiator.body} />
      </p>
    </article>
  );
}

function ValueStoryIconSvg({ iconKey }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.28)";
  const accent = BRAND.orangeMuted;
  const key = String(iconKey || "protection").toLowerCase();
  const size = 52;

  if (key === "water") {
    return (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden>
        <path
          d="M28 8c-8 10-13 16-13 22a13 13 0 1 0 26 0c0-6-5-12-13-22z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2.2"
        />
        <path
          d="M10 38c4 3 9 4 18 4s14-1 18-4M14 42c3 2 7 3 14 3s11-1 14-3"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="38" cy="20" r="2.5" fill={accent} opacity="0.9" />
      </svg>
    );
  }
  if (key === "thermal") {
    return (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden>
        <rect x="23" y="10" width="10" height="28" rx="5" fill={fill} stroke={stroke} strokeWidth="2.2" />
        <circle cx="28" cy="42" r="6" fill={fill} stroke={stroke} strokeWidth="2.2" />
        <path d="M28 16v18" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M25 20h6M25 26h6M25 32h6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M40 14c2 3 3 6 3 9M16 18c-2 3-3 6-3 9"
          stroke={accent}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    );
  }
  if (key === "uptime") {
    return (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden>
        <circle cx="26" cy="28" r="14" fill={fill} stroke={stroke} strokeWidth="2.2" />
        <path d="M26 18v10l8 6" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="40" r="9" fill={fill} stroke={stroke} strokeWidth="2" />
        <path
          d="M36 12l4 4-4 4M40 16h-8"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="40" cy="40" r="2.5" fill={accent} />
      </svg>
    );
  }
  if (key === "nano") {
    return (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden>
        <path d="M10 40h36" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
        <circle cx="16" cy="28" r="5" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <circle cx="30" cy="18" r="4" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <circle cx="40" cy="30" r="4" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <circle cx="24" cy="36" r="3" fill={accent} stroke={stroke} strokeWidth="1.4" />
        <path d="M20 26l8-6M21 30l16 2" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 22c6-4 12-4 18 0" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      </svg>
    );
  }
  if (key === "shock") {
    return (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden>
        <path
          d="M12 34h10l-3 10 22-24h-11l4-12-12 26z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M8 44h40" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden>
      <path
        d="M28 7l12 5v12c0 10-6 17-12 19-6-2-12-9-12-19V12l12-5z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M20 28h16" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M28 20v16" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M18 38h20" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <path d="M22 24l4 4 8-10" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ValueStoryIcon({ iconKey }) {
  return (
    <div
      style={{
        width: 96,
        height: 96,
        margin: "0 auto",
        borderRadius: 999,
        background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
        border: "3px solid rgba(234, 88, 12, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.3)",
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
  const pdsUrl = isPublicPdsPdfHref(props.pdsUrl) ? String(props.pdsUrl).trim() : "";
  const onProductImageClick =
    typeof props.onProductImageClick === "function" ? props.onProductImageClick : null;
  const productImageUploadLabel = String(props.productImageUploadLabel || "").trim();

  const productDifferentiator = resolveProductDifferentiator({
    whatMakesItDifferent: props.whatMakesItDifferent,
    title,
    subtitle,
    summary,
    keySpecs,
    applications,
    whyThisProduct,
  });

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
            gridTemplateColumns: "minmax(160px, 0.9fr) minmax(0, 2.4fr)",
            alignItems: "center",
            gap: 28,
          }}
        >
          <div style={{ justifySelf: "start", minWidth: 0 }}>
            <img
              src={KLONDIKE_HEADER_LOGO_SRC}
              alt="Klondike Performance Lubricants"
              decoding="async"
              style={{
                height: 88,
                width: "auto",
                maxWidth: "min(100%, 340px)",
                objectFit: "contain",
                objectPosition: "left center",
                display: "block",
              }}
            />
          </div>
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
            <EmphasizedText text={title} />
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
              <EmphasizedText text={subtitle} />
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
          <ProductDifferentiatorCallout differentiator={productDifferentiator} variant="hero" />
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
                padding: "30px 18px 34px",
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
                <EmphasizedText text={t.label || t} />
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
                  padding: "12px 22px",
                  borderRadius: 8,
                  background: BRAND.white,
                  color: BRAND.headerNavy,
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 8px 20px rgba(15, 23, 42, 0.18)",
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
