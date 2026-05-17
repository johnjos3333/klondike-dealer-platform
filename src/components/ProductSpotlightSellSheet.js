/**
 * ProductSpotlightSellSheet — locked manufacturer-style one-page sell sheet.
 * Standalone static layout; not wired into the guided enablement flow.
 */

import React from "react";

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
  const list = Array.isArray(value) ? value.filter(Boolean) : [];
  return list.length ? list : fallback;
}

function pickText(value, fallback) {
  const t = String(value ?? "").trim();
  return t || fallback;
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
        padding: "12px 16px",
        fontSize: 11,
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
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(203, 213, 225, 0.9)",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
        background: BRAND.white,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader title={title} />
      <div style={{ padding: "16px 18px 18px", flex: 1 }}>{children}</div>
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

function SpecBullets({ items, max = 7 }) {
  const list = pickList(items, []).slice(0, max);
  if (!list.length) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 9 }}>
      {list.map((line, i) => (
        <li
          key={`spec-${i}`}
          style={{
            display: "flex",
            gap: 8,
            fontSize: 12,
            lineHeight: 1.38,
            color: "#e2e8f0",
            fontWeight: 700,
          }}
        >
          <span style={{ color: BRAND.orangeLight, fontWeight: 900, flexShrink: 0 }} aria-hidden>
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

function NanoDifferentiatorCallout() {
  return (
    <article
      style={{
        marginBottom: 14,
        padding: "12px 14px",
        borderRadius: 8,
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
          margin: "8px 0 0",
          fontSize: 13,
          lineHeight: 1.45,
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
        width: 58,
        height: 58,
        margin: "0 auto",
        borderRadius: 999,
        background: `linear-gradient(145deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%)`,
        border: "2px solid rgba(234, 88, 12, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isShort ? 13 : 24,
        fontWeight: isShort ? 900 : 400,
        letterSpacing: isShort ? "0.04em" : 0,
        color: isShort ? BRAND.orangeLight : undefined,
        boxShadow: "0 6px 16px rgba(15, 23, 42, 0.2)",
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
  const backgroundImageUrl = pickText(
    props.backgroundImageUrl,
    NANO_DEMO_DEFAULTS.backgroundImageUrl
  );
  const keySpecs = pickList(props.keySpecs, NANO_DEMO_DEFAULTS.keySpecs);
  const benefits = pickList(props.benefits, NANO_DEMO_DEFAULTS.benefits);
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

  const heroSummaryLines = summaryLines(summary, 3);
  const showBackdropImage = Boolean(backgroundImageUrl) && !productImageUrl;

  return (
    <article
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
            style={{
              margin: 0,
              fontSize: "clamp(11px, 1.15vw, 13px)",
              fontWeight: 800,
              letterSpacing: "0.11em",
              lineHeight: 1.15,
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
                fontSize: "clamp(15px, 1.75vw, 19px)",
                fontWeight: 900,
                letterSpacing: "0.1em",
                lineHeight: 1.15,
                color: BRAND.orange,
                textTransform: "uppercase",
              }}
            >
              WE GROW
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "clamp(14px, 1.55vw, 17px)",
                fontWeight: 900,
                letterSpacing: "0.08em",
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
          gridTemplateColumns: "minmax(0, 1.08fr) minmax(0, 1fr) minmax(232px, 0.46fr)",
          minHeight: 400,
          overflow: "hidden",
          borderBottom: "1px solid rgba(226, 232, 240, 0.95)",
          background: BRAND.navy,
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 12,
            alignContent: "center",
            padding: "40px 36px 44px",
            background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 62%, #1e40af 100%)`,
            zIndex: 2,
          }}
        >
          <span
            style={{
              justifySelf: "start",
              fontSize: 9,
              fontWeight: 900,
              letterSpacing: "0.16em",
              padding: "5px 10px",
              borderRadius: 999,
              color: "#fff",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            PRODUCT SPOTLIGHT
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px, 3.2vw, 42px)",
              fontWeight: 900,
              color: BRAND.white,
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
            }}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              style={{
                margin: 0,
                fontSize: "clamp(17px, 2vw, 22px)",
                fontWeight: 800,
                color: BRAND.orangeLight,
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </p>
          ) : null}
          {heroSummaryLines.length ? (
            <p
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.5,
                maxWidth: 460,
              }}
            >
              {heroSummaryLines.join(" ")}
            </p>
          ) : null}
        </div>

        <div
          style={{
            position: "relative",
            minHeight: 400,
            overflow: "hidden",
            background: `linear-gradient(165deg, ${BRAND.navyDeep} 0%, ${BRAND.navy} 50%, ${BRAND.navyMid} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 28px",
          }}
        >
          {showBackdropImage ? (
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              <img
                src={backgroundImageUrl}
                alt=""
                decoding="async"
                style={{
                  position: "absolute",
                  right: "-4%",
                  bottom: "-12%",
                  width: "72%",
                  height: "72%",
                  objectFit: "contain",
                  objectPosition: "100% 100%",
                  opacity: 0.12,
                  filter: "grayscale(1) brightness(0.5)",
                }}
              />
            </div>
          ) : null}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background: `
                radial-gradient(ellipse 70% 80% at 50% 50%, rgba(30,58,138,0.25) 0%, transparent 70%),
                linear-gradient(90deg, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.15) 50%, rgba(15,23,42,0.45) 100%)
              `,
              pointerEvents: "none",
            }}
          />
          {productImageUrl ? (
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "min(92%, 400px)",
                padding: "20px 22px",
                borderRadius: 14,
                background: BRAND.white,
                border: "1px solid rgba(226, 232, 240, 0.98)",
                boxShadow: "0 20px 48px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={productImageUrl}
                alt={title}
                decoding="async"
                style={{
                  width: "100%",
                  maxHeight: 360,
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
                zIndex: 2,
                width: "min(88%, 280px)",
                padding: "36px 24px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.97)",
                border: "1px solid rgba(226, 232, 240, 0.95)",
                textAlign: "center",
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.25)",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 auto 14px",
                  borderRadius: 12,
                  background: "#f1f5f9",
                  border: "1px dashed rgba(148, 163, 184, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  color: BRAND.slate,
                }}
                aria-hidden
              >
                🛢️
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 800,
                  color: BRAND.headerNavy,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Product photo
              </p>
              <p style={{ margin: "6px 0 0", fontSize: 11, fontWeight: 600, color: "#94a3b8", lineHeight: 1.4 }}>
                Upload or supply an image for this spotlight
              </p>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "28px 20px",
            background: `linear-gradient(180deg, ${BRAND.navyDeep} 0%, ${BRAND.navy} 100%)`,
            borderLeft: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {keySpecs.length ? (
            <article
              style={{
                width: "100%",
                padding: "18px 16px",
                borderRadius: 10,
                background: "rgba(15, 23, 42, 0.96)",
                border: "1px solid rgba(251, 146, 60, 0.4)",
                boxShadow: "0 14px 36px rgba(0,0,0,0.4)",
              }}
            >
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: 9,
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  color: BRAND.orangeLight,
                  textTransform: "uppercase",
                }}
              >
                Key specifications
              </p>
              <SpecBullets items={keySpecs} />
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
                padding: "26px 18px",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(226, 232, 240, 0.95)" : undefined,
              }}
            >
              <BenefitIcon icon={t.icon} />
              <p
                style={{
                  margin: "14px 0 0",
                  fontSize: 13,
                  fontWeight: 900,
                  color: BRAND.orange,
                  letterSpacing: "0.05em",
                  lineHeight: 1.25,
                  textTransform: "uppercase",
                }}
              >
                {t.label || t}
              </p>
              {t.sub ? (
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 13,
                    fontWeight: 600,
                    color: BRAND.slate,
                    lineHeight: 1.42,
                    maxWidth: 250,
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

      <section style={{ padding: "36px 44px 32px", display: "grid", gap: 28, background: BRAND.white }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 20,
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
