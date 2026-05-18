/**
 * CategorySpotlightSellSheet — standalone category / system-solution sell sheet.
 * Layout id: category-spotlight-sell-sheet-v6d1-1
 * Not wired into App.js yet.
 */

import React from "react";

export const CATEGORY_SPOTLIGHT_SELL_SHEET_LAYOUT_ID = "category-spotlight-sell-sheet-v6d1-1";

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
      iconKey: "expansion",
      label: "Market Expansion",
      sub: "Grow category share where construction, ag, and industrial hours are climbing.",
    },
    {
      iconKey: "mix",
      label: "Product Mix Growth",
      sub: "Rationalize AW, MV, and specialty hydraulics across bulk and packaged behavior.",
    },
    {
      iconKey: "consolidation",
      label: "Supplier Consolidation",
      sub: "Standardize the yard on one hydraulic program instead of fragmented SKUs.",
    },
    {
      iconKey: "uptime",
      label: "Equipment Uptime",
      sub: "Fewer heat, foam, and slow-response events that pull assets offline.",
    },
    {
      iconKey: "retention",
      label: "Customer Retention",
      sub: "Protect dealer trust when repeat circuit failures threaten the fluid account.",
    },
    {
      iconKey: "downtime",
      label: "Reduced Downtime",
      sub: "Align filtration, breathers, and fluid tier before failures cascade.",
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
  crossSell: [
    { title: "Grease", desc: "Pins, bearings, and chassis protection across the yard", iconKey: "grease" },
    { title: "Gear Oils", desc: "Drivetrain and reducer programs for mobile equipment", iconKey: "gear" },
    { title: "Heavy Duty Engine Oils", desc: "On- and off-highway engine coverage for mixed fleets", iconKey: "engine" },
    { title: "Coolants", desc: "Fleet cooling discipline tied to hydraulic accounts", iconKey: "coolant" },
  ],
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
    "Expand hydraulic penetration: standardize ISO VG ladders, consolidate suppliers, and bundle filtration with the category program to reduce downtime across equipment groups.",
  pdsLinks: [],
  productLadder: null,
};

const LADDER_TIER_ORDER = ["good", "better", "best", "ultimate"];

const CATEGORY_LADDER_PRESETS = {
  hydraulic: {
    categoryKey: "hydraulic",
    emphasis: [
      "Standard mixed-fleet coverage",
      "Environmentally acceptable options",
      "Food-grade where required",
      "Severe-duty & high-load circuits",
      "Wet brake / trans-drive compatibility",
    ],
    tiers: [
      {
        tier: "good",
        label: "GOOD",
        positioning: "Core value programs for everyday fleet hydraulics",
        products: ["Professional Hydraulic Fluid", "Standard AW Hydraulic Fluid"],
      },
      {
        tier: "better",
        label: "BETTER",
        positioning: "Step-up protection and seasonal flexibility",
        products: ["Advanced Hydraulic Fluid", "Multi-Viscosity Hydraulic Fluid"],
      },
      {
        tier: "best",
        label: "BEST",
        positioning: "Premium synthetic performance for demanding duty",
        products: ["Full Synthetic Hydraulic Fluid", "Severe-Duty Hydraulic Fluid"],
      },
      {
        tier: "ultimate",
        label: "ULTIMATE",
        positioning: "Specialty programs for sensitive sites and extremes",
        products: [
          "Bio-Synthetic EAL Hydraulic Fluid",
          "Food Grade Hydraulic Fluid",
          "Arctic Hydraulic Fluid",
        ],
      },
    ],
  },
  grease: {
    categoryKey: "grease",
    emphasis: [
      "Severe-duty pins & bushings",
      "Shock load & vibration",
      "Washout resistance",
      "Relube interval strategy",
      "Centralized systems",
      "Wet outdoor environments",
    ],
    tiers: [
      {
        tier: "good",
        label: "GOOD",
        positioning: "Reliable multipurpose EP for general fleet grease points",
        products: ["RED TAC", "HD TAC"],
      },
      {
        tier: "better",
        label: "BETTER",
        positioning: "Moly-fortified upgrade for load and outdoor duty",
        products: ["MOLY TAC 3%"],
      },
      {
        tier: "best",
        label: "BEST",
        positioning: "Synthetic-blend EP for longer intervals and heat",
        products: ["ULTRA TAC", "MOLY TAC HD 5%"],
      },
      {
        tier: "ultimate",
        label: "ULTIMATE",
        positioning: "Flagship programs for the toughest grease applications",
        products: ["nano Calcium Sulfonate", "nano Lithium Complex Synthetic"],
      },
    ],
  },
  hdEngine: {
    categoryKey: "hdEngine",
    emphasis: [
      "OEM approval conversations",
      "CK-4 / FA-4 alignment",
      "Synthetic tier progression",
      "Mixed on- & off-highway fleets",
      "Emissions-system compatibility",
      "Drain-interval strategy",
    ],
    tiers: [
      {
        tier: "good",
        label: "GOOD",
        positioning: "Conventional HD programs for cost-sensitive fleets",
        products: ["Conventional Heavy Duty Engine Oils"],
      },
      {
        tier: "better",
        label: "BETTER",
        positioning: "Synthetic blend for improved protection and flexibility",
        products: ["Synthetic Blend Heavy Duty Engine Oils"],
      },
      {
        tier: "best",
        label: "BEST",
        positioning: "Full synthetic CK-4 for premium fleet programs",
        products: ["Full Synthetic CK-4 Heavy Duty Engine Oils"],
      },
      {
        tier: "ultimate",
        label: "ULTIMATE",
        positioning: "Severe-duty extended-drain synthetic strategies",
        products: ["Severe-Duty Extended-Drain Synthetic Programs"],
      },
    ],
  },
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
  if (
    ["expansion", "mix", "consolidation", "uptime", "retention", "downtime", "opportunity", "margin", "coverage"].includes(
      preset
    )
  ) {
    return preset;
  }
  const blob = `${tile?.label || ""} ${tile?.sub || ""}`.toLowerCase();
  if (/consolidat|standardiz|supplier/.test(blob)) return "consolidation";
  if (/uptime|reliab/.test(blob)) return "uptime";
  if (/downtime|reduce.*stop|unplanned/.test(blob)) return "downtime";
  if (/retention|loyal|stick/.test(blob)) return "retention";
  if (/mix|sku|portfolio|growth/.test(blob)) return "mix";
  if (/expansion|market|opportunity/.test(blob)) return "expansion";
  if (/margin|profit|revenue/.test(blob)) return "expansion";
  return ["expansion", "mix", "consolidation", "uptime", "retention", "downtime"][index % 6];
}

function normalizeCrossSellItems(value, fallback) {
  const raw = Array.isArray(value) ? value : fallback;
  const out = [];
  for (const item of raw) {
    if (item && typeof item === "object") {
      const title = sanitizeLabel(item) || String(item.title ?? item.name ?? "").trim();
      const desc = String(item.desc ?? item.sub ?? item.role ?? "").trim();
      const iconKey = String(item.iconKey || "").trim();
      if (!title) continue;
      out.push({ title, desc, iconKey });
    } else {
      const title = sanitizeLabel(item) || String(item ?? "").trim();
      if (!title) continue;
      out.push({ title, desc: crossSellDescriptor(title), iconKey: crossSellIconKey(title) });
    }
    if (out.length >= 6) break;
  }
  if (!out.length && value !== fallback) {
    return normalizeCrossSellItems(fallback, fallback);
  }
  return out;
}

function crossSellIconKey(title) {
  const t = String(title || "").toLowerCase();
  if (/grease|tac/.test(t)) return "grease";
  if (/gear/.test(t)) return "gear";
  if (/engine|ck-4|hd/.test(t)) return "engine";
  if (/coolant|antifreeze/.test(t)) return "coolant";
  if (/hydraulic/.test(t)) return "hydraulic";
  if (/food/.test(t)) return "food";
  if (/compressor/.test(t)) return "compressor";
  if (/chain/.test(t)) return "chain";
  if (/eal|bio|enviro/.test(t)) return "eal";
  return "program";
}

function crossSellDescriptor(title) {
  const t = String(title || "").toLowerCase();
  if (/grease/.test(t)) return "Pin, bearing, and chassis protection";
  if (/gear/.test(t)) return "Drivetrain and reducer coverage";
  if (/engine/.test(t)) return "Fleet engine program expansion";
  if (/coolant/.test(t)) return "Cooling system discipline";
  if (/food/.test(t)) return "NSF H1 programs where required";
  if (/compressor/.test(t)) return "Plant air and compressor circuits";
  if (/chain/.test(t)) return "Food-grade chain and conveyor lube";
  return "Companion category in the lubrication system";
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

function inferCategoryLadderKey(categoryTitle, categorySubtitle, applications) {
  const blob = [
    categoryTitle,
    categorySubtitle,
    ...(Array.isArray(applications) ? applications : []),
  ]
    .join(" ")
    .toLowerCase();
  if (/grease|nlgi|red tac|moly tac|ultra tac|nano/.test(blob)) return "grease";
  if (/engine oil|ck-4|ck4|fa-4|fa4|heavy duty engine|hd engine|motor oil/.test(blob)) {
    return "hdEngine";
  }
  if (/hydraulic|trans.?drive|aw fluid|iso vg|tractor fluid|wet brake/.test(blob)) {
    return "hydraulic";
  }
  if (/food.?grade/.test(blob) && /hydraulic/.test(blob)) return "hydraulic";
  if (/gear oil|gear lubricant/.test(blob)) return "hydraulic";
  return "hydraulic";
}

function normalizeLadderTier(item, fallbackLabel) {
  if (!item || typeof item !== "object") {
    return {
      tier: fallbackLabel.toLowerCase(),
      label: fallbackLabel,
      positioning: "",
      products: [],
    };
  }
  const tier = String(item.tier || fallbackLabel).toLowerCase();
  const label = String(item.label ?? fallbackLabel).trim().toUpperCase() || fallbackLabel;
  const positioning = String(item.positioning ?? item.sub ?? item.desc ?? "").trim();
  const products = [];
  const rawProducts = item.products ?? item.skus ?? item.items;
  if (Array.isArray(rawProducts)) {
    for (const p of rawProducts) {
      const name = typeof p === "object" ? String(p.name ?? p.title ?? "").trim() : String(p ?? "").trim();
      if (name) products.push(name);
    }
  }
  return { tier, label, positioning, products: products.slice(0, 4) };
}

function normalizeProductLadder(value, presetKey) {
  const key = CATEGORY_LADDER_PRESETS[presetKey] ? presetKey : "hydraulic";
  const preset = CATEGORY_LADDER_PRESETS[key];
  if (!value || typeof value !== "object") {
    return { ...preset, tiers: preset.tiers.map((t) => ({ ...t, products: [...t.products] })) };
  }
  const emphasis = pickList(value.emphasis ?? value.highlights, preset.emphasis).slice(0, 6);
  const tiersIn = Array.isArray(value.tiers) ? value.tiers : [];
  const tiers = LADDER_TIER_ORDER.map((tierId, i) => {
    const fallback = preset.tiers[i] || preset.tiers[0];
    const match =
      tiersIn.find((t) => String(t?.tier || t?.label || "").toLowerCase() === tierId) ||
      tiersIn[i];
    const normalized = normalizeLadderTier(match, fallback.label);
    if (!normalized.products.length) normalized.products = [...fallback.products];
    if (!normalized.positioning) normalized.positioning = fallback.positioning;
    return normalized;
  });
  return {
    categoryKey: String(value.categoryKey || key),
    emphasis: emphasis.length ? emphasis : preset.emphasis,
    tiers,
  };
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
  const fill = "rgba(251, 146, 60, 0.32)";
  const k = String(iconKey || "expansion");
  const s = 44;
  if (k === "consolidation") {
    return (
      <svg width={s} height={s} viewBox="0 0 44 44" fill="none" aria-hidden>
        <path d="M10 30h24M14 22h16M18 14h8" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="32" cy="12" r="4" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "uptime") {
    return (
      <svg width={s} height={s} viewBox="0 0 44 44" fill="none" aria-hidden>
        <path d="M10 32l8-14 6 9 10-16 8 13" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (k === "downtime") {
    return (
      <svg width={s} height={s} viewBox="0 0 44 44" fill="none" aria-hidden>
        <circle cx="22" cy="24" r="11" stroke={stroke} strokeWidth="2" />
        <path d="M22 14v10l7 5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
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
  return (
    <svg width={s} height={s} viewBox="0 0 44 44" fill="none" aria-hidden>
      <circle cx="22" cy="22" r="13" fill={fill} stroke={stroke} strokeWidth="1.8" />
      <path d="M14 26l6-10 4 7 8-12 6 9" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OpportunityValueCard({ tile, isLast }) {
  return (
    <article
      style={{
        padding: "26px 16px 28px",
        textAlign: "center",
        borderRight: isLast ? "none" : "1px solid rgba(226, 232, 240, 0.95)",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          margin: "0 auto",
          borderRadius: 16,
          background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 55%, #1e40af 100%)`,
          border: "2px solid rgba(234, 88, 12, 0.55)",
          boxShadow: "0 12px 28px rgba(15, 23, 42, 0.18)",
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
          margin: "14px 0 0",
          fontSize: 12,
          fontWeight: 900,
          color: BRAND.headerNavy,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1.2,
        }}
      >
        {tile.label}
      </p>
      {tile.sub ? (
        <p style={{ margin: "8px 0 0", fontSize: 11, fontWeight: 600, color: "#64748b", lineHeight: 1.45 }}>
          {tile.sub}
        </p>
      ) : null}
    </article>
  );
}

function productLineIndexLabel(index) {
  return String(index + 1).padStart(2, "0");
}

function LadderTierIcon({ tier }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.28)";
  const s = 36;
  const t = String(tier || "good").toLowerCase();
  if (t === "better") {
    return (
      <svg width={s} height={s} viewBox="0 0 36 36" fill="none" aria-hidden>
        <path d="M8 24l6-10 4 7 8-12 6 9" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (t === "best") {
    return (
      <svg width={s} height={s} viewBox="0 0 36 36" fill="none" aria-hidden>
        <path
          d="M18 6l4 8h9l-7 6 3 9-9-6-9 6 3-7-6h9l4-8z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (t === "ultimate") {
    return (
      <svg width={s} height={s} viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="10" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <path d="M12 18h12M18 12v12" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 36 36" fill="none" aria-hidden>
      <rect x="8" y="12" width="20" height="12" rx="3" fill={fill} stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

function ladderTierVisual(tierIndex) {
  const palettes = [
    { bg: "#f8fafc", border: "rgba(30, 58, 138, 0.2)", accent: BRAND.slate },
    { bg: "#fff7ed", border: "rgba(234, 88, 12, 0.35)", accent: BRAND.orange },
    { bg: "linear-gradient(160deg, #eff6ff 0%, #fff 100%)", border: "rgba(30, 64, 175, 0.35)", accent: BRAND.navyMid },
    {
      bg: `linear-gradient(160deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 100%)`,
      border: BRAND.orange,
      accent: BRAND.orangeLight,
      lightText: true,
    },
  ];
  return palettes[Math.min(tierIndex, 3)];
}

function LadderTierColumn({ tier, tierIndex }) {
  const visual = ladderTierVisual(tierIndex);
  const isUltimate = tierIndex === 3;
  return (
    <article
      style={{
        padding: "20px 16px 22px",
        borderRadius: 12,
        background: visual.bg,
        border: `2px solid ${visual.border}`,
        boxShadow: isUltimate ? "0 16px 36px rgba(15, 23, 42, 0.2)" : "0 8px 20px rgba(15, 23, 42, 0.06)",
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        transform: isUltimate ? "translateY(-4px)" : "none",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: isUltimate
            ? "rgba(255,255,255,0.12)"
            : `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
          border: `2px solid ${isUltimate ? BRAND.orangeLight : "rgba(234, 88, 12, 0.45)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
        aria-hidden
      >
        <LadderTierIcon tier={tier.tier} />
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          fontWeight: 900,
          letterSpacing: "0.12em",
          color: isUltimate ? BRAND.orangeLight : visual.accent,
        }}
      >
        {tier.label}
      </p>
      {tier.positioning ? (
        <p
          style={{
            margin: "8px 0 14px",
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 1.45,
            color: isUltimate ? "rgba(255,255,255,0.88)" : "#64748b",
          }}
        >
          {tier.positioning}
        </p>
      ) : null}
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8, flex: 1 }}>
        {tier.products.map((name) => (
          <li
            key={name}
            style={{
              fontSize: 12,
              fontWeight: 800,
              lineHeight: 1.35,
              color: isUltimate ? BRAND.white : BRAND.headerNavy,
              padding: "8px 10px",
              borderRadius: 8,
              background: isUltimate ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.85)",
              border: isUltimate ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(30, 58, 138, 0.12)",
            }}
          >
            {name}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CategoryPerformanceLadderSection({ ladder }) {
  if (!ladder?.tiers?.length) return null;
  return (
    <section
      style={{
        padding: "36px 44px 40px",
        background: BRAND.white,
        borderBottom: "1px solid rgba(226,232,240,0.95)",
      }}
    >
      <div style={{ marginBottom: 22 }}>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.16em",
            color: BRAND.orange,
            textTransform: "uppercase",
          }}
        >
          Category performance ladder
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.15 }}>
          GOOD · BETTER · BEST · ULTIMATE
        </p>
        <p style={{ margin: "10px 0 0", fontSize: 14, fontWeight: 600, color: "#64748b", lineHeight: 1.5, maxWidth: 720 }}>
          Use the ladder to structure line depth, margin expansion, and upsell conversations—not a single-SKU pitch.
        </p>
      </div>
      {ladder.emphasis?.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
          {ladder.emphasis.slice(0, 6).map((line) => (
            <span
              key={line}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 800,
                color: BRAND.navy,
                background: "#f1f5f9",
                border: "1px solid rgba(30, 58, 138, 0.14)",
              }}
            >
              {line}
            </span>
          ))}
        </div>
      ) : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        {ladder.tiers.slice(0, 4).map((tier, i) => (
          <LadderTierColumn key={tier.tier} tier={tier} tierIndex={i} />
        ))}
      </div>
    </section>
  );
}

function FeaturedProductCard({ product, index }) {
  const hasImage = Boolean(String(product.imageUrl || "").trim());
  const lineLabel = productLineIndexLabel(index);
  return (
    <article
      style={{
        borderRadius: 14,
        overflow: "hidden",
        background: BRAND.white,
        border: "1px solid rgba(30, 58, 138, 0.22)",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.1)",
        display: "flex",
        flexDirection: "column",
        minHeight: 220,
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 2,
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: "0.12em",
          color: BRAND.orangeLight,
          background: "rgba(15, 23, 42, 0.72)",
          padding: "4px 8px",
          borderRadius: 6,
        }}
        aria-hidden
      >
        {lineLabel}
      </span>
      <div
        style={{
          height: 132,
          background: hasImage
            ? "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)"
            : `linear-gradient(145deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 70%, #1e40af 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: hasImage ? 12 : 18,
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
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 800,
              color: "rgba(255,255,255,0.92)",
              textAlign: "center",
              lineHeight: 1.35,
              padding: "0 8px",
            }}
          >
            {product.name}
          </p>
        )}
      </div>
      <div
        style={{
          padding: "16px 16px 18px",
          flex: 1,
          background: "#f8fafc",
          borderTop: `3px solid ${BRAND.orange}`,
        }}
      >
        <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.3 }}>
          {product.name}
        </p>
        {product.role ? (
          <p style={{ margin: "8px 0 0", fontSize: 12, fontWeight: 600, color: "#64748b", lineHeight: 1.45 }}>
            {product.role}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function ProductLineupSection({ products }) {
  const lineup = products.slice(0, 6);
  if (!lineup.length) return null;
  const cols = lineup.length <= 3 ? lineup.length : lineup.length <= 4 ? 2 : 3;
  return (
    <section
      style={{
        padding: "36px 44px 40px",
        background: "linear-gradient(180deg, #f1f5f9 0%, #ffffff 55%)",
        borderTop: "1px solid rgba(226,232,240,0.95)",
        borderBottom: "1px solid rgba(226,232,240,0.95)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 22,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.16em",
              color: BRAND.orange,
              textTransform: "uppercase",
            }}
          >
            Program reference lineup
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 20, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.2 }}>
            Ecosystem SKUs & progression anchors
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#64748b", maxWidth: 340, lineHeight: 1.45 }}>
          Pair these with the performance ladder for GOOD → ULTIMATE upsell and category penetration.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 18 }}>
        {lineup.map((p, i) => (
          <FeaturedProductCard key={p.name} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function HeroVisualPanel({ categoryImageUrl, featuredProducts, productCount }) {
  const categoryImg = String(categoryImageUrl || "").trim();
  const products = featuredProducts.slice(0, 6);
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
        padding: "22px 20px 24px",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(251, 146, 60, 0.45)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: "0.16em",
          color: BRAND.orangeLight,
          textTransform: "uppercase",
        }}
      >
        System solution ecosystem
      </p>
      <p style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 800, color: "rgba(255,255,255,0.95)", lineHeight: 1.35 }}>
        {productCount} products · application coverage · companion categories
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: products.length <= 2 ? "1fr" : "repeat(2, 1fr)",
          gap: 10,
        }}
      >
        {products.map((p, i) => {
          const img = String(p.imageUrl || "").trim();
          return (
            <div
              key={p.name}
              style={{
                borderRadius: 10,
                padding: img ? 8 : "12px 10px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                minHeight: img ? 72 : 0,
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt={p.name}
                  decoding="async"
                  style={{
                    width: "100%",
                    height: 52,
                    objectFit: "contain",
                    background: "#fff",
                    borderRadius: 6,
                    marginBottom: 6,
                  }}
                />
              ) : null}
              <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.92)", lineHeight: 1.3 }}>
                <span style={{ color: BRAND.orangeMuted, marginRight: 6 }}>{productLineIndexLabel(i)}</span>
                {p.name}
              </p>
            </div>
          );
        })}
      </div>
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

function CustomerFitIconSvg({ label }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.24)";
  const t = String(label || "").toLowerCase();
  const s = 28;
  if (/mining|aggregate/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M6 24h20M10 18l4-8 4 6 6-10 4 8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (/agri|farm/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="14" r="5" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <path d="M8 26c2-6 6-8 8-8s6 2 8 8" stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (/construct|rental|earth/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="8" y="14" width="16" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <path d="M12 22v4h8v-4" stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (/fleet|municipal|transit|truck|yard|distributor/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="6" y="12" width="20" height="8" rx="2" stroke={stroke} strokeWidth="1.6" />
        <circle cx="11" cy="22" r="2.5" stroke={stroke} strokeWidth="1.4" />
        <circle cx="21" cy="22" r="2.5" stroke={stroke} strokeWidth="1.4" />
      </svg>
    );
  }
  if (/food/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M10 10h12v12H10z" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <path d="M14 14h4M14 18h4" stroke={stroke} strokeWidth="1.4" />
      </svg>
    );
  }
  if (/industrial|plant/.test(t)) {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M8 24V14l6-4 4 3 6-5v16" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="9" fill={fill} stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

function CustomerFitTiles({ items, max = 6 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  const cols = list.length <= 4 ? 2 : 3;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
      {list.map((line, i) => (
        <article
          key={`cust-${i}`}
          style={{
            padding: "16px 12px",
            borderRadius: 12,
            background: BRAND.white,
            border: "1px solid rgba(30, 58, 138, 0.16)",
            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.06)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              margin: "0 auto",
              borderRadius: 12,
              background: `linear-gradient(145deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden
          >
            <CustomerFitIconSvg label={line} />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 900, color: BRAND.navy, lineHeight: 1.35 }}>
            {line}
          </p>
        </article>
      ))}
    </div>
  );
}

function SystemSolutionIconSvg({ iconKey }) {
  const stroke = BRAND.orangeLight;
  const fill = "rgba(251, 146, 60, 0.28)";
  const k = String(iconKey || "program");
  const s = 32;
  if (k === "grease") {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="8" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "gear") {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="7" stroke={stroke} strokeWidth="1.8" />
        <circle cx="16" cy="16" r="2.5" fill={fill} />
      </svg>
    );
  }
  if (k === "engine") {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="8" y="10" width="16" height="12" rx="2" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (k === "coolant") {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 6v20M12 10h8M12 22h8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M8 22h16M10 16h12M12 10h8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SystemSolutionHub({ items, max = 6 }) {
  const list = items.slice(0, max);
  if (list.length < 2) return null;
  const cols = list.length <= 3 ? list.length : list.length === 4 ? 2 : 3;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 14 }}>
      {list.map((item) => (
        <article
          key={item.title}
          style={{
            padding: "18px 16px",
            borderRadius: 12,
            background: BRAND.white,
            border: "1px solid rgba(30, 58, 138, 0.18)",
            borderLeft: `4px solid ${BRAND.orange}`,
            boxShadow: "0 8px 22px rgba(15, 23, 42, 0.08)",
            display: "grid",
            gridTemplateColumns: "44px 1fr",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden
          >
            <SystemSolutionIconSvg iconKey={item.iconKey || crossSellIconKey(item.title)} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: BRAND.headerNavy, lineHeight: 1.25 }}>
              {item.title}
            </p>
            {item.desc ? (
              <p style={{ margin: "6px 0 0", fontSize: 11, fontWeight: 600, color: "#64748b", lineHeight: 1.4 }}>
                {item.desc}
              </p>
            ) : null}
          </div>
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
  const systemSolutionItems = normalizeCrossSellItems(props.crossSell, DEMO_DEFAULTS.crossSell);
  const cautions = pickList(props.cautions, DEMO_DEFAULTS.cautions);
  const recommendedNextStep = pickText(props.recommendedNextStep, DEMO_DEFAULTS.recommendedNextStep);
  const pdsLinks = normalizePdsLinks(props.pdsLinks ?? DEMO_DEFAULTS.pdsLinks);

  const stripCount = Math.min(Math.max(valueCards.length, 4), 6);
  const stripCards = valueCards.slice(0, stripCount);
  const ladderPresetKey = inferCategoryLadderKey(categoryTitle, categorySubtitle, applications);
  const productLadder = normalizeProductLadder(
    props.productLadder ?? DEMO_DEFAULTS.productLadder,
    ladderPresetKey
  );
  const programProductCount = Math.max(
    featuredProducts.length,
    productLadder.tiers.reduce((n, t) => n + (t.products?.length || 0), 0),
    4
  );

  return (
    <article
      data-layout={CATEGORY_SPOTLIGHT_SELL_SHEET_LAYOUT_ID}
      data-category-ladder={productLadder.categoryKey}
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
        <div style={{ padding: "40px 44px 44px", display: "grid", gap: 14, alignContent: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span
              style={{
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
              CATEGORY PROGRAM
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.1em",
                padding: "6px 10px",
                borderRadius: 999,
                color: BRAND.orangeLight,
                background: "rgba(234, 88, 12, 0.2)",
                border: "1px solid rgba(251, 146, 60, 0.45)",
              }}
            >
              {programProductCount} SKU LINEUP
            </span>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 4.2vw, 52px)",
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
            <p
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 600,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.62,
                maxWidth: 560,
              }}
            >
              {opportunitySummary}
            </p>
          ) : null}
        </div>
        <div style={{ padding: "32px 28px 36px 16px", display: "flex", alignItems: "center" }}>
          <HeroVisualPanel
            categoryImageUrl={categoryImageUrl}
            featuredProducts={featuredProducts}
            productCount={programProductCount}
          />
        </div>
      </section>

      <section style={{ background: BRAND.headerNavy, padding: "14px 44px 16px" }}>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.14em",
            color: BRAND.orangeLight,
            textTransform: "uppercase",
          }}
        >
          Category growth opportunity
        </p>
      </section>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${stripCount}, minmax(0, 1fr))`,
          borderBottom: "1px solid rgba(226,232,240,0.95)",
        }}
      >
        {stripCards.map((tile, i) => (
          <OpportunityValueCard
            key={`opp-${i}-${tile.label}`}
            tile={{ ...tile, iconKey: valueIconKey(tile, i) }}
            isLast={i === stripCards.length - 1}
          />
        ))}
      </section>

      <CategoryPerformanceLadderSection ladder={productLadder} />

      <ProductLineupSection products={featuredProducts} />

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

        {systemSolutionItems.length >= 2 ? (
          <section
            style={{
              padding: "28px 28px 30px",
              borderRadius: 12,
              background: `linear-gradient(135deg, ${BRAND.navyDeep} 0%, ${BRAND.navyMid} 100%)`,
              border: "1px solid rgba(251, 146, 60, 0.35)",
            }}
          >
            <p
              style={{
                margin: "0 0 6px",
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.14em",
                color: BRAND.orangeLight,
                textTransform: "uppercase",
              }}
            >
              System-selling expansion
            </p>
            <p style={{ margin: "0 0 18px", fontSize: 20, fontWeight: 900, color: BRAND.white, lineHeight: 1.25 }}>
              Grow the full lubrication program
            </p>
            <SystemSolutionHub items={systemSolutionItems} max={6} />
          </section>
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
              padding: "24px 28px",
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
              background: `linear-gradient(98deg, ${BRAND.orange} 0%, #c2410c 42%, ${BRAND.navyMid} 100%)`,
              color: BRAND.white,
              boxShadow: "0 16px 40px rgba(234, 88, 12, 0.25)",
            }}
          >
            <div style={{ flex: "1 1 280px" }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 900, letterSpacing: "0.16em" }}>
                STRATEGIC NEXT STEP · CATEGORY GROWTH
              </p>
              <p style={{ margin: "10px 0 0", fontSize: 18, fontWeight: 900, lineHeight: 1.35 }}>{recommendedNextStep}</p>
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
          style={{ width: "100%", minHeight: 300, maxHeight: 360, objectFit: "contain", display: "block", margin: "0 auto" }}
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