/**
 * CategorySpotlightSellSheet — standalone category / system-solution sell sheet.
 * Layout id: category-spotlight-sell-sheet-v6a1
 * Not wired into App.js yet.
 */

import React from "react";

export const CATEGORY_SPOTLIGHT_SELL_SHEET_LAYOUT_ID = "category-spotlight-sell-sheet-v6a1";

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
  categoryTitle: "KLONDIKE Hydraulic Fluids",
  categorySubtitle: "Reliable fluid power protection for mixed fleets and demanding equipment.",
  opportunitySummary:
    "Structure hydraulic conversations around ISO VG discipline, pump tags, and contamination control before any tier upgrade. Position Klondike as a system program—not a single-SKU swap.",
  categoryImageUrl: "",
  productImages: [],
  keyBenefits: [
    {
      iconKey: "opportunity",
      label: "Market Opportunity",
      sub: "Construction rebound and rental utilization put hours on circuits before filters catch up.",
    },
    {
      iconKey: "margin",
      label: "Margin Expansion",
      sub: "Bundle AW, MV, and specialty hydraulics with filtration and sampling discipline.",
    },
    {
      iconKey: "mix",
      label: "Product Mix Growth",
      sub: "Rationalize ISO VG ladders across bulk and packaged top-off behavior.",
    },
    {
      iconKey: "retention",
      label: "Customer Retention",
      sub: "Fewer repeat failures that erode trust in the dealer fluid program.",
    },
    {
      iconKey: "coverage",
      label: "Application Coverage",
      sub: "Match temperature band and OEM tags across mixed fleets and yards.",
    },
    {
      iconKey: "confidence",
      label: "Rep Confidence",
      sub: "Field-ready talk tracks tied to circuit evidence—not shelf color.",
    },
  ],
  idealCustomers: [
    "Construction & rental fleets",
    "Agriculture dealers",
    "Industrial plants",
    "Municipal / transit shops",
    "Mobile equipment yards",
    "Mixed-fleet distributors",
  ],
  applications: [
    "Skid-steer hydraulics",
    "Excavator circuits",
    "Press & lift systems",
    "Cold-morning response",
    "Bulk tank programs",
    "Outdoor wash-down duty",
  ],
  featuredProducts: [
    { name: "AW Hydraulic Fluid", role: "Core mixed-fleet anti-wear program" },
    { name: "MV Hydraulic Fluid", role: "Multi-viscosity seasonal coverage" },
    { name: "Arctic Blue Hydraulic Fluid", role: "Cold-start and low-temp yards" },
    { name: "Bio-Synthetic EAL Hydraulic Fluid", role: "Sensitive-site options where applicable" },
  ],
  crossSell: ["Grease", "Gear Oils", "Heavy Duty Engine Oils", "Coolants"],
  repTalkTrack: [
    "Lead with OEM tags and operating temperature bands before discussing fluid tier.",
    "Position filtration and breathers ahead of chemistry swaps on repeat-failure circuits.",
    "Anchor upgrades to documented circuit evidence—not shelf habit or brand loyalty alone.",
    "Pair bulk and packaged strategy with how the yard actually tops off.",
  ],
  discoveryQuestions: [
    "Which circuits show foam, heat, or slow response first thing in the morning?",
    "When did filters, breathers, or sampling last trend on your worst assets?",
    "What ISO VG and OEM tags are on the pumps you need running this week?",
    "Are bulk tanks and packaged top-offs aligned to the same category ladder?",
  ],
  cautions: [
    "Confirm OEM and component guidance before changing viscosity grade or chemistry.",
    "Do not mix incompatible fluids without flush and consultation.",
    "See product data sheets for each SKU discussed.",
  ],
  recommendedNextStep:
    "Photograph priority circuits, align ISO VG from pump tags, and stage filtration upgrades alongside any fluid conversation.",
  pdsLinks: [],
};

function pickList(value, fallback) {
  if (!Array.isArray(value)) return fallback;
  const list = value.filter((item) => {
    if (item == null || item === false) return false;
    if (typeof item === "object") {
      return Boolean(String(item.label ?? item.sub ?? item.title ?? item.name ?? "").trim());
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

function isPublicPdsPdfHref(value) {
  const href = String(value ?? "").trim();
  if (!href) return false;
  if (/^https?:\/\//i.test(href) || /localhost/i.test(href)) return false;
  return href.startsWith("/pds/") && /\.pdf$/i.test(href);
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

function normalizeValueCards(value, fallback) {
  if (!Array.isArray(value)) return fallback.slice(0, 6);
  const out = [];
  for (const item of value) {
    if (item && typeof item === "object") {
      const label = String(item.label ?? item.title ?? "").trim();
      const sub = String(item.sub ?? item.desc ?? "").trim();
      if (!label && !sub) continue;
      out.push({
        iconKey: String(item.iconKey || "").trim(),
        label: label || sub.slice(0, 40),
        sub: sub || label,
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

function valueIconKey(tile, index) {
  const preset = String(tile?.iconKey || "").toLowerCase();
  if (["opportunity", "margin", "mix", "retention", "coverage", "confidence"].includes(preset)) {
    return preset;
  }
  const blob = `${tile?.label || ""} ${tile?.sub || ""}`.toLowerCase();
  if (/margin|profit|revenue/.test(blob)) return "margin";
  if (/mix|sku|portfolio/.test(blob)) return "mix";
  if (/retention|loyal|stick/.test(blob)) return "retention";
  if (/coverage|application|fit/.test(blob)) return "coverage";
  if (/confidence|rep|enable/.test(blob)) return "confidence";
  if (/opportunity|market|growth/.test(blob)) return "opportunity";
  return ["opportunity", "margin", "mix", "retention", "coverage", "confidence"][index % 6];
}

function normalizeFeaturedProducts(products, productImages) {
  const raw = Array.isArray(products) ? products : [];
  const images = Array.isArray(productImages) ? productImages : [];
  const out = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    let name = "";
    let role = "";
    let imageUrl = "";
    if (item && typeof item === "object") {
      name = String(item.name ?? item.title ?? item.productName ?? "").trim();
      role = String(item.role ?? item.sub ?? item.desc ?? "").trim();
      imageUrl = String(item.imageUrl ?? item.url ?? item.src ?? "").trim();
    } else {
      name = String(item ?? "").trim();
    }
    if (!name) continue;
    if (!imageUrl && images[i]) {
      imageUrl =
        typeof images[i] === "object"
          ? String(images[i].url ?? images[i].src ?? images[i].imageUrl ?? "").trim()
          : String(images[i]).trim();
    }
    out.push({ name, role, imageUrl });
    if (out.length >= 6) break;
  }
  return out;
}

function normalizePdsLinks(value) {
  const out = [];
  for (const item of Array.isArray(value) ? value : []) {
    if (item && typeof item === "object") {
      const href = String(item.href ?? item.url ?? "").trim();
      const label = String(item.label ?? item.title ?? item.name ?? "Open PDS").trim();
      if (isPublicPdsPdfHref(href)) out.push({ href, label });
    } else {
      const href = String(item ?? "").trim();
      if (isPublicPdsPdfHref(href)) out.push({ href, label: "Open PDS" });
    }
    if (out.length >= 4) break;
  }
  return out;
}

function sanitizeLabel(item) {
  if (item == null) return "";
  const s =
    typeof item === "object"
      ? String(item.label ?? item.name ?? item.title ?? "").trim()
      : String(item).trim();
  if (!s) return "";
  if (/^(overlay-|canonical-|pds-|se-|pkg-)/i.test(s)) return "";
  if (/^[a-z0-9_-]{14,}$/i.test(s) && !/\s/.test(s)) return "";
  return s;
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

function OpportunityIconSvg({ iconKey }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.28)";
  const k = String(iconKey || "opportunity");
  const s = 40;
  if (k === "margin") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M8 28h24M8 22h16" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <path d="M28 10v18M32 14h-8" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "mix") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="8" y="10" width="10" height="10" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <rect x="22" y="10" width="10" height="10" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <rect x="15" y="24" width="10" height="10" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "retention") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path
          d="M20 8l12 5v10c0 7-5 12-12 14-7-2-12-7-12-14V13l12-5z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.8"
        />
        <path d="M15 20l3 3 7-8" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "coverage") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="12" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <path d="M12 20h16M20 12v16" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (k === "confidence") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="14" r="6" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <path d="M10 32c0-6 4-10 10-10s10 4 10 10" stroke={stroke} strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M8 28l8-12 6 8 10-14 8 10" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OpportunityValueCard({ tile }) {
  return (
    <article
      style={{
        padding: "22px 14px 24px",
        textAlign: "center",
        borderRight: "1px solid rgba(226, 232, 240, 0.95)",
        background: BRAND.white,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          margin: "0 auto",
          borderRadius: 999,
          background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
          border: "2px solid rgba(234, 88, 12, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden
      >
        <OpportunityIconSvg iconKey={tile.iconKey} />
      </div>
      <p
        style={{
          margin: "12px 0 0",
          fontSize: 11,
          fontWeight: 900,
          color: BRAND.orange,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          lineHeight: 1.25,
        }}
      >
        {tile.label}
      </p>
      {tile.sub ? (
        <p style={{ margin: "8px 0 0", fontSize: 12, fontWeight: 600, color: "#475569", lineHeight: 1.4 }}>
          {tile.sub}
        </p>
      ) : null}
    </article>
  );
}

function FeaturedProductCard({ product }) {
  const hasImage = Boolean(String(product.imageUrl || "").trim());
  return (
    <article
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: BRAND.white,
        border: "1px solid rgba(30, 58, 138, 0.2)",
        boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
        display: "flex",
        flexDirection: "column",
        minHeight: 200,
      }}
    >
      <div
        style={{
          height: 120,
          background: hasImage
            ? BRAND.white
            : `linear-gradient(145deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: hasImage ? 8 : 16,
        }}
      >
        {hasImage ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            decoding="async"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        ) : (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
            <rect x="10" y="14" width="28" height="22" rx="4" stroke={BRAND.orangeLight} strokeWidth="2" />
            <path d="M16 24h16M16 30h10" stroke={BRAND.orangeLight} strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <div style={{ padding: "14px 14px 16px", flex: 1, background: "#f8fafc" }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.3 }}>
          {product.name}
        </p>
        {product.role ? (
          <p style={{ margin: "8px 0 0", fontSize: 12, fontWeight: 600, color: "#64748b", lineHeight: 1.4 }}>
            {product.role}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function HeroVisualPanel({ categoryImageUrl, featuredProducts }) {
  const categoryImg = String(categoryImageUrl || "").trim();
  const products = featuredProducts.slice(0, 4);
  const withImages = products.filter((p) => String(p.imageUrl || "").trim());

  if (categoryImg) {
    return (
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(251, 146, 60, 0.45)",
          boxShadow: "0 20px 48px rgba(0,0,0,0.35)",
          background: BRAND.white,
        }}
      >
        <img
          src={categoryImg}
          alt="Category"
          decoding="async"
          style={{ width: "100%", maxHeight: 280, objectFit: "cover", display: "block" }}
        />
        {withImages.length ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(withImages.length, 4)}, 1fr)`,
              gap: 8,
              padding: 10,
              background: BRAND.navyDeep,
            }}
          >
            {withImages.map((p) => (
              <img
                key={p.name}
                src={p.imageUrl}
                alt={p.name}
                decoding="async"
                style={{ width: "100%", height: 56, objectFit: "contain", background: "#fff", borderRadius: 6 }}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (withImages.length >= 2) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}
      >
        {withImages.slice(0, 4).map((p) => (
          <div
            key={p.name}
            style={{
              borderRadius: 12,
              padding: 12,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              textAlign: "center",
            }}
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              decoding="async"
              style={{
                width: "100%",
                height: 88,
                objectFit: "contain",
                background: "#fff",
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
            <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.9)", lineHeight: 1.25 }}>
              {p.name}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: 16,
        padding: "40px 28px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(251, 146, 60, 0.4)",
        textAlign: "center",
      }}
    >
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden style={{ margin: "0 auto 16px" }}>
        <rect x="12" y="18" width="40" height="28" rx="6" stroke={BRAND.orangeLight} strokeWidth="2.5" />
        <path d="M20 32h24M20 40h14" stroke={BRAND.orangeLight} strokeWidth="2" strokeLinecap="round" />
        <circle cx="48" cy="16" r="4" fill={BRAND.orangeMuted} />
      </svg>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 900, letterSpacing: "0.1em", color: BRAND.orangeLight }}>
        SYSTEM SOLUTION
      </p>
      <p style={{ margin: "10px 0 0", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.45 }}>
        Multi-product category program for mixed fleets and demanding equipment.
      </p>
    </div>
  );
}

function PillGrid({ items, max = 8 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {list.map((line, i) => (
        <span
          key={`pill-${i}`}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 800,
            color: BRAND.navy,
            background: "linear-gradient(160deg, #f8fafc 0%, #ffffff 100%)",
            border: "1px solid rgba(30, 58, 138, 0.18)",
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}

function CustomerFitTiles({ items, max = 6 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  const cols = list.length <= 4 ? 2 : 3;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
      {list.map((line, i) => (
        <article
          key={`cust-${i}`}
          style={{
            padding: "14px 12px",
            borderRadius: 10,
            background: "linear-gradient(160deg, #f8fafc 0%, #fff 100%)",
            border: "1px solid rgba(30, 58, 138, 0.14)",
            fontSize: 13,
            fontWeight: 800,
            color: BRAND.navy,
            textAlign: "center",
            lineHeight: 1.35,
          }}
        >
          {line}
        </article>
      ))}
    </div>
  );
}

function CrossSellGrid({ items, max = 4 }) {
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

export default function CategorySpotlightSellSheet(props) {
  const categoryTitle = pickText(props.categoryTitle, DEMO_DEFAULTS.categoryTitle);
  const categorySubtitle = pickText(props.categorySubtitle, DEMO_DEFAULTS.categorySubtitle);
  const opportunitySummary = pickText(props.opportunitySummary, DEMO_DEFAULTS.opportunitySummary);
  const categoryImageUrl = pickText(props.categoryImageUrl, DEMO_DEFAULTS.categoryImageUrl);
  const valueCards = normalizeValueCards(props.keyBenefits, DEMO_DEFAULTS.keyBenefits);
  const idealCustomers = pickList(props.idealCustomers, DEMO_DEFAULTS.idealCustomers);
  const applications = pickList(props.applications, DEMO_DEFAULTS.applications);
  const featuredProducts = normalizeFeaturedProducts(
    props.featuredProducts,
    props.productImages ?? DEMO_DEFAULTS.productImages
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
  const pdsLinks = normalizePdsLinks(props.pdsLinks ?? DEMO_DEFAULTS.pdsLinks);

  const stripCount = Math.min(Math.max(valueCards.length, 4), 6);
  const stripCards = valueCards.slice(0, stripCount);

  return (
    <article
      data-layout={CATEGORY_SPOTLIGHT_SELL_SHEET_LAYOUT_ID}
      data-sell-sheet-title={categoryTitle.slice(0, 80)}
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
      aria-label="Category spotlight sell sheet"
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
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(340px, 1fr)",
          minHeight: 520,
          background: `linear-gradient(125deg, ${BRAND.headerNavy} 0%, ${BRAND.navy} 40%, ${BRAND.navyMid} 100%)`,
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
            CATEGORY SPOTLIGHT
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(30px, 3.8vw, 48px)",
              fontWeight: 900,
              color: BRAND.white,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {categoryTitle}
          </h1>
          {categorySubtitle ? (
            <p style={{ margin: 0, fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 900, color: BRAND.orange, lineHeight: 1.25 }}>
              {categorySubtitle}
            </p>
          ) : null}
          {opportunitySummary ? (
            <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, maxWidth: 540 }}>
              {opportunitySummary}
            </p>
          ) : null}
        </div>
        <div style={{ padding: "36px 28px 40px 20px", display: "flex", alignItems: "center" }}>
          <HeroVisualPanel categoryImageUrl={categoryImageUrl} featuredProducts={featuredProducts} />
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${stripCount}, minmax(0, 1fr))`,
          borderBottom: "1px solid rgba(226,232,240,0.95)",
        }}
      >
        {stripCards.map((tile, i) => (
          <OpportunityValueCard key={`opp-${i}-${tile.label}`} tile={{ ...tile, iconKey: valueIconKey(tile, i) }} />
        ))}
      </section>

      {featuredProducts.length ? (
        <section style={{ padding: "32px 44px 8px", background: BRAND.white }}>
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
            Featured products in this program
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(featuredProducts.length, 3)}, minmax(0, 1fr))`,
              gap: 16,
            }}
          >
            {featuredProducts.slice(0, 6).map((p) => (
              <FeaturedProductCard key={p.name} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      <section style={{ padding: "28px 44px 36px", display: "grid", gap: 22, background: BRAND.white }}>
        <section style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {idealCustomers.length ? (
            <FlyerCard title="Best customer fits" subtitle="Who this program wins with">
              <CustomerFitTiles items={idealCustomers} max={6} />
            </FlyerCard>
          ) : null}
          {applications.length ? (
            <FlyerCard title="Applications" subtitle="Where the category delivers">
              <PillGrid items={applications} max={8} />
            </FlyerCard>
          ) : null}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {repTalkTrack.length ? (
            <FlyerCard title="Rep talk track" subtitle="What the rep can say">
              <CheckBullets items={repTalkTrack} max={4} />
            </FlyerCard>
          ) : null}
          {discoveryQuestions.length ? (
            <FlyerCard title="Questions to ask your customer" subtitle="What the rep should ask">
              <QuestionList items={discoveryQuestions} max={5} />
            </FlyerCard>
          ) : null}
        </section>

        {crossSell.length >= 2 ? (
          <FlyerCard title="Cross-sell and system solutions" subtitle="Grow the lubrication system">
            <CrossSellGrid items={crossSell} max={4} />
          </FlyerCard>
        ) : null}

        {cautions.length ? (
          <FlyerCard title="Cautions and notes">
            <CheckBullets items={cautions} max={4} cautionStyle />
          </FlyerCard>
        ) : null}

        {recommendedNextStep ? (
          <section
            style={{
              borderRadius: 12,
              padding: "20px 24px",
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
              background: `linear-gradient(98deg, ${BRAND.orange} 0%, #c2410c 45%, ${BRAND.navyMid} 100%)`,
              color: BRAND.white,
            }}
          >
            <div style={{ flex: "1 1 260px" }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 900, letterSpacing: "0.14em" }}>RECOMMENDED NEXT STEP</p>
              <p style={{ margin: "8px 0 0", fontSize: 17, fontWeight: 900, lineHeight: 1.32 }}>{recommendedNextStep}</p>
            </div>
            {pdsLinks.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {pdsLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: "10px 18px",
                      borderRadius: 8,
                      background: BRAND.white,
                      color: BRAND.headerNavy,
                      fontSize: 12,
                      fontWeight: 900,
                      textDecoration: "none",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
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