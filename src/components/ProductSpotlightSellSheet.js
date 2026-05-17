/**
 * ProductSpotlightSellSheet — locked manufacturer-style one-page sell sheet.
 * Layout id: product-spotlight-sell-sheet-v5k1 (BRAVING header, no hero vehicle backdrop).
 */

import React from "react";

export const PRODUCT_SPOTLIGHT_SELL_SHEET_LAYOUT_ID = "product-spotlight-sell-sheet-v5k1";

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
      icon: "EP",
      label: "Extreme Pressure Protection",
      sub: "800 kg 4-ball weld load supports heavily loaded pins, bushings, and slow-speed bearings.",
    },
    {
      icon: "WS₂",
      label: "Nano Friction Control",
      sub: "Tungsten disulfide nanotechnology helps reduce friction and protect metal under load.",
    },
    {
      icon: "SD",
      label: "Shock-Load Ready",
      sub: "Mechanical stability for vibration, impact, and severe-duty cycles.",
    },
    {
      icon: "H₂O",
      label: "Water & Uptime",
      sub: "CaS complex chemistry and low spray-off help resist washout in wet duty.",
    },
  ],
  applications: [
    "Trucking & Fleet",
    "Mining",
    "Agriculture",
    "Construction",
    "Industrial Equipment",
    "Pins & Bushings",
    "Steel & Paper Mills",
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
        icon: String(item.icon || "•").trim() || "•",
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

function AppTiles({ items, max = 8 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
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
          key={`app-${i}`}
          style={{
            padding: "10px 8px",
            borderRadius: 8,
            background: "#f8fafc",
            border: "1px solid rgba(203, 213, 225, 0.85)",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 700,
            color: BRAND.navy,
            lineHeight: 1.35,
          }}
        >
          <span style={{ display: "block", fontSize: 18, marginBottom: 4 }} aria-hidden>
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

function CrossSellTiles({ items, max = 4 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
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
          key={`xs-${i}`}
          style={{
            padding: "14px 12px",
            borderRadius: 8,
            background: "linear-gradient(145deg, #f8fafc 0%, #fff 100%)",
            border: "1px solid rgba(30, 58, 138, 0.18)",
            fontSize: 13,
            fontWeight: 700,
            color: BRAND.navy,
            lineHeight: 1.35,
            textAlign: "center",
          }}
        >
          <span style={{ display: "block", fontSize: 22, marginBottom: 6 }} aria-hidden>
            🛢️
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

function BenefitIcon({ icon }) {
  const label = String(icon || "✓").trim();
  const isShort = label.length <= 3;
  return (
    <div
      style={{
        width: 76,
        height: 76,
        margin: "0 auto",
        borderRadius: 999,
        background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
        border: "3px solid rgba(234, 88, 12, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isShort ? 15 : 28,
        fontWeight: isShort ? 900 : 400,
        letterSpacing: isShort ? "0.04em" : 0,
        color: isShort ? BRAND.orangeLight : undefined,
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.28)",
      }}
      aria-hidden
    >
      {label}
    </div>
  );
}

export default function ProductSpotlightSellSheet(props) {
  const title = pickText(props.title, NANO_DEMO_DEFAULTS.title);
  const subtitle = pickText(props.subtitle, NANO_DEMO_DEFAULTS.subtitle);
  const summary = pickText(props.summary, NANO_DEMO_DEFAULTS.summary);
  const productImageUrl = pickText(props.productImageUrl, NANO_DEMO_DEFAULTS.productImageUrl);
  const keySpecs = pickList(props.keySpecs, NANO_DEMO_DEFAULTS.keySpecs);
  const benefits = normalizeBenefitTiles(props.benefits, NANO_DEMO_DEFAULTS.benefits);
  const applications = pickList(props.applications, NANO_DEMO_DEFAULTS.applications);
  const whyThisProduct = pickList(props.whyThisProduct, NANO_DEMO_DEFAULTS.whyThisProduct);
  const repTalkTrack = pickList(props.repTalkTrack, NANO_DEMO_DEFAULTS.repTalkTrack);
  const crossSell = pickList(props.crossSell, NANO_DEMO_DEFAULTS.crossSell);
  const questions = pickList(props.questions, NANO_DEMO_DEFAULTS.questions);
  const cautions = pickList(props.cautions, NANO_DEMO_DEFAULTS.cautions);
  const recommendedNextStep = pickText(
    props.recommendedNextStep,
    NANO_DEMO_DEFAULTS.recommendedNextStep
  );

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
          padding: "18px 36px 14px",
          background: BRAND.white,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(140px, 1.15fr) minmax(200px, 1.5fr) minmax(140px, 1fr)",
            alignItems: "center",
            gap: 20,
          }}
        >
          <img
            src="/klondike-full-logo.png"
            alt="Klondike Performance Lubricants"
            decoding="async"
            style={{
              height: 80,
              width: "auto",
              maxWidth: 340,
              objectFit: "contain",
              display: "block",
              justifySelf: "start",
            }}
          />
          <p
            data-braving-tagline="true"
            style={{
              margin: 0,
              fontSize: "clamp(14px, 1.5vw, 18px)",
              fontWeight: 900,
              letterSpacing: "0.14em",
              lineHeight: 1.2,
              color: BRAND.headerNavy,
              textTransform: "uppercase",
              textAlign: "center",
              justifySelf: "center",
            }}
          >
            BRAVING THE FORCE OF MOVEMENT
          </p>
          <div style={{ justifySelf: "end", textAlign: "right" }}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                fontWeight: 900,
                letterSpacing: "0.08em",
                lineHeight: 1.1,
                color: BRAND.orange,
                textTransform: "uppercase",
              }}
            >
              WE GROW
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: "clamp(16px, 1.8vw, 22px)",
                fontWeight: 900,
                letterSpacing: "0.1em",
                lineHeight: 1.15,
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
            marginTop: 18,
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
          {productImageUrl ? (
            <div
              style={{
                position: "relative",
                width: "min(100%, 460px)",
                padding: "26px 28px",
                borderRadius: 18,
                marginLeft: "auto",
                background: BRAND.white,
                border: "1px solid rgba(226, 232, 240, 0.98)",
                boxShadow:
                  "0 28px 64px rgba(15, 23, 42, 0.42), 0 0 0 1px rgba(255,255,255,0.12)",
              }}
            >
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
                }}
              />
            </div>
          ) : (
            <div
              style={{
                position: "relative",
                width: "min(100%, 420px)",
                minHeight: 300,
                padding: "48px 32px",
                borderRadius: 18,
                background: "rgba(255,255,255,0.98)",
                border: "1px solid rgba(226, 232, 240, 0.95)",
                textAlign: "center",
                boxShadow: "0 24px 56px rgba(15, 23, 42, 0.32)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "auto",
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
                  fontSize: 42,
                  color: BRAND.slate,
                }}
                aria-hidden
              >
                🛢️
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
                Upload or supply an image for this spotlight
              </p>
            </div>
          )}
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

      {benefits.length ? (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            borderBottom: "1px solid rgba(226, 232, 240, 0.95)",
            background: BRAND.white,
          }}
        >
          {benefits.slice(0, 4).map((t, i) => (
            <article
              key={`ben-${i}-${t.label || i}`}
              style={{
                padding: "38px 22px 42px",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(226, 232, 240, 0.95)" : undefined,
              }}
            >
              <BenefitIcon icon={t.icon} />
              <p
                style={{
                  margin: "18px 0 0",
                  fontSize: 14,
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
                    margin: "12px 0 0",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#475569",
                    lineHeight: 1.5,
                    maxWidth: 260,
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
      ) : null}

      <section style={{ padding: "40px 48px 36px", display: "grid", gap: 32, background: BRAND.white }}>
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
              <AppTiles items={applications} max={8} />
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
          {crossSell.length ? (
            <FlyerCard title="Cross-sell & system solutions">
              <CrossSellTiles items={crossSell} max={4} />
            </FlyerCard>
          ) : null}
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
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 18,
              alignItems: "center",
              padding: "20px 24px",
              color: BRAND.white,
            }}
          >
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
              }}
              aria-hidden
            >
              →
            </span>
            <div>
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
