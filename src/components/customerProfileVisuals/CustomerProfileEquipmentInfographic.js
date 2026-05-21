import React from "react";

const BRAND = {
  navy: "#0E1B33",
  navyMid: "#1e3a8a",
  orange: "#ea580c",
  orangeLight: "#fb923c",
  white: "#ffffff",
  muted: "#64748b",
  slate: "#94a3b8",
};

const SECTION_TITLE = "Where KLONDIKE Helps";
const SECTION_SUBTITLE =
  "Use the map to spot the systems, problems, and product categories to discuss.";

/**
 * @param {string | undefined | null} customerProfileId
 * @param {string} [profileTitle]
 * @returns {"mining" | "agriculture" | "construction" | null}
 */
export function resolveInfographicProfileKey(customerProfileId, profileTitle = "") {
  const id = String(customerProfileId || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  if (id === "mining_aggregate" || id === "mining") return "mining";
  if (id === "agriculture" || id === "agricultural") return "agriculture";
  if (id === "construction" || id === "earthmoving") return "construction";

  const title = String(profileTitle || "").toLowerCase();
  if (/mining|aggregate|crusher|haul/.test(title)) return "mining";
  if (/agricult|farm|agrimax|tractor|harvest/.test(title)) return "agriculture";
  if (/construction|earthmov|excavat|loader/.test(title)) return "construction";
  return null;
}

/** @typedef {{ id: string, system: string, problem: string, category: string, side: "left" | "right", anchor: { x: number, y: number } }} InfographicCallout */

/** @type {Record<string, { label: string, renderScene: (activeId: string | null) => React.ReactNode, callouts: InfographicCallout[] }>} */
const INFOGRAPHIC_PROFILES = {
  mining: {
    label: "Mining & Aggregate",
    callouts: [
      {
        id: "grease",
        system: "Grease",
        problem: "Pins, bushings, bearings — shock load",
        category: "nano / moly / severe-duty EP grease",
        side: "left",
        anchor: { x: 28, y: 62 },
      },
      {
        id: "hydraulic",
        system: "Hydraulic",
        problem: "Cylinders, pumps — heat & slow response",
        category: "AW / MV / XVI hydraulic fluids",
        side: "left",
        anchor: { x: 22, y: 38 },
      },
      {
        id: "gear",
        system: "Gear oil",
        problem: "Final drives & gearboxes — load & varnish",
        category: "Industrial / full synthetic gear oils",
        side: "right",
        anchor: { x: 72, y: 58 },
      },
      {
        id: "coolant",
        system: "Coolant",
        problem: "Engine heat — uptime & overheat risk",
        category: "HD NOAT / fleet coolant programs",
        side: "left",
        anchor: { x: 18, y: 48 },
      },
      {
        id: "contamination",
        system: "Contamination",
        problem: "Dust fines & washout on circuits",
        category: "Filtration · breathers · grease upgrades",
        side: "right",
        anchor: { x: 78, y: 42 },
      },
    ],
    renderScene: (activeId) => <MiningSceneSvg activeId={activeId} />,
  },
  agriculture: {
    label: "Agriculture",
    callouts: [
      {
        id: "agrimax",
        system: "AGRIMAX / wet brake",
        problem: "Trans-drive & wet brake chatter",
        category: "AGRIMAX UTHF · zinc-free options",
        side: "left",
        anchor: { x: 24, y: 52 },
      },
      {
        id: "hydraulic",
        system: "Hydraulic",
        problem: "Loader & telehandler circuits",
        category: "AW / MV hydraulic fluids",
        side: "right",
        anchor: { x: 74, y: 36 },
      },
      {
        id: "grease",
        system: "Grease",
        problem: "PTO, chassis & implement joints",
        category: "RED TAC · Poly Tac · field PM",
        side: "right",
        anchor: { x: 70, y: 62 },
      },
      {
        id: "coolant",
        system: "Coolant",
        problem: "Seasonal heat & cold starts",
        category: "ELC / HD coolant programs",
        side: "left",
        anchor: { x: 20, y: 38 },
      },
      {
        id: "gear",
        system: "Gear oil",
        problem: "Differentials & PTO drives",
        category: "Gear lubricants per compartment tag",
        side: "right",
        anchor: { x: 76, y: 48 },
      },
      {
        id: "seasonal",
        system: "Seasonal PM",
        problem: "Planting & harvest windows",
        category: "Bundled trans · engine · grease · coolant",
        side: "left",
        anchor: { x: 26, y: 68 },
      },
    ],
    renderScene: (activeId) => <AgricultureSceneSvg activeId={activeId} />,
  },
  construction: {
    label: "Construction / Earthmoving",
    callouts: [
      {
        id: "hydraulic",
        system: "Hydraulic cylinders",
        problem: "Heat, leaks & slow cycles",
        category: "AW / MV / Professional hydraulics",
        side: "left",
        anchor: { x: 22, y: 40 },
      },
      {
        id: "grease",
        system: "Grease",
        problem: "Pins & bushings — washout & shock",
        category: "MOLY TAC · ULTRA TAC programs",
        side: "left",
        anchor: { x: 28, y: 62 },
      },
      {
        id: "finaldrive",
        system: "Final drives",
        problem: "Drivetrain load & metal trends",
        category: "Commercial / full synthetic gear oils",
        side: "right",
        anchor: { x: 74, y: 58 },
      },
      {
        id: "engine",
        system: "HD engine oil",
        problem: "Support diesels & site trucks",
        category: "CK-4 synthetic blend / full synthetic",
        side: "left",
        anchor: { x: 18, y: 50 },
      },
      {
        id: "coolant",
        system: "Coolant",
        problem: "Peak season overheat risk",
        category: "HD NOAT / OAT coolant discipline",
        side: "right",
        anchor: { x: 78, y: 44 },
      },
      {
        id: "dust",
        system: "Dust & heat",
        problem: "Contamination on every circuit",
        category: "ISO VG discipline · filtration",
        side: "right",
        anchor: { x: 72, y: 32 },
      },
    ],
    renderScene: (activeId) => <ConstructionSceneSvg activeId={activeId} />,
  },
};

function zoneHighlight(active, x, y, w, h) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="6"
      fill={active ? "rgba(234,88,12,0.22)" : "rgba(234,88,12,0.05)"}
      stroke={active ? "rgba(251,146,60,0.7)" : "rgba(234,88,12,0.12)"}
      strokeWidth={active ? 2 : 1}
    />
  );
}

function MiningSceneSvg({ activeId }) {
  return (
    <svg viewBox="0 0 1000 380" className="cp-infographic-svg" aria-hidden>
      <defs>
        <linearGradient id="cp-mine-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a6b7d" />
          <stop offset="100%" stopColor="#1a2332" />
        </linearGradient>
      </defs>
      <ellipse cx="500" cy="340" rx="420" ry="22" fill="rgba(0,0,0,0.35)" />
      {zoneHighlight(activeId === "grease", 120, 250, 200, 50)}
      {zoneHighlight(activeId === "hydraulic", 380, 160, 140, 90)}
      {zoneHighlight(activeId === "gear", 620, 240, 220, 70)}
      {zoneHighlight(activeId === "coolant", 90, 170, 120, 80)}
      {zoneHighlight(activeId === "contamination", 480, 120, 380, 100)}
      <g>
        <path d="M 480 155 L 860 155 L 875 278 L 465 278 Z" fill="url(#cp-mine-body)" stroke="#64748b" strokeWidth="2" />
        <path d="M 95 278 L 395 278 L 410 155 L 120 155 Z" fill="url(#cp-mine-body)" stroke="#64748b" strokeWidth="2" />
        <circle cx="220" cy="318" r="42" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        <circle cx="300" cy="318" r="42" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        <circle cx="720" cy="318" r="48" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        <circle cx="800" cy="318" r="48" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        <path d="M 520 218 L 680 120 L 700 128 L 545 258 Z" fill="#475569" opacity="0.9" />
        <rect x="140" y="200" width="280" height="24" rx="2" fill="#334155" opacity="0.6" />
        <rect x="560" y="200" width="200" height="16" rx="2" fill="#334155" opacity="0.5" />
      </g>
    </svg>
  );
}

function AgricultureSceneSvg({ activeId }) {
  return (
    <svg viewBox="0 0 1000 380" className="cp-infographic-svg" aria-hidden>
      <defs>
        <linearGradient id="cp-ag-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a6b4a" />
          <stop offset="100%" stopColor="#1a2a22" />
        </linearGradient>
      </defs>
      <ellipse cx="500" cy="340" rx="400" ry="20" fill="rgba(34,60,44,0.25)" />
      {zoneHighlight(activeId === "agrimax", 280, 200, 240, 80)}
      {zoneHighlight(activeId === "hydraulic", 520, 110, 200, 120)}
      {zoneHighlight(activeId === "grease", 160, 260, 180, 50)}
      {zoneHighlight(activeId === "coolant", 100, 180, 100, 70)}
      {zoneHighlight(activeId === "gear", 600, 250, 120, 60)}
      {zoneHighlight(activeId === "seasonal", 320, 140, 400, 60)}
      <g>
        <path d="M 280 278 L 520 278 L 535 165 L 300 165 Z" fill="url(#cp-ag-body)" stroke="#64748b" strokeWidth="2" />
        <path d="M 95 278 L 280 278 L 295 175 L 110 175 Z" fill="url(#cp-ag-body)" stroke="#64748b" strokeWidth="2" />
        <path d="M 520 248 L 680 120 L 700 128 L 545 258 Z" fill="#475569" />
        <circle cx="200" cy="318" r="38" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        <circle cx="720" cy="318" r="44" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        <circle cx="820" cy="318" r="44" fill="#0f172a" stroke="#475569" strokeWidth="3" />
      </g>
    </svg>
  );
}

function ConstructionSceneSvg({ activeId }) {
  return (
    <svg viewBox="0 0 1000 380" className="cp-infographic-svg" aria-hidden>
      <defs>
        <linearGradient id="cp-con-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a6b7d" />
          <stop offset="100%" stopColor="#253040" />
        </linearGradient>
      </defs>
      <ellipse cx="500" cy="340" rx="400" ry="20" fill="rgba(0,0,0,0.3)" />
      {zoneHighlight(activeId === "hydraulic", 420, 100, 220, 130)}
      {zoneHighlight(activeId === "grease", 200, 250, 200, 55)}
      {zoneHighlight(activeId === "finaldrive", 620, 250, 180, 65)}
      {zoneHighlight(activeId === "engine", 120, 190, 140, 75)}
      {zoneHighlight(activeId === "coolant", 130, 175, 90, 60)}
      {zoneHighlight(activeId === "dust", 350, 130, 450, 90)}
      <g>
        <path d="M 200 278 L 480 278 L 500 200 L 220 200 Z" fill="url(#cp-con-body)" stroke="#64748b" strokeWidth="2" />
        <path d="M 420 248 L 620 110 L 640 118 L 455 258 Z" fill="#475569" stroke="#64748b" strokeWidth="1.5" />
        <rect x="580" y="220" width="160" height="60" rx="4" fill="#334155" />
        <circle cx="240" cy="318" r="40" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        <circle cx="700" cy="318" r="46" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        <circle cx="780" cy="318" r="40" fill="#0f172a" stroke="#475569" strokeWidth="3" />
      </g>
    </svg>
  );
}

function ConnectorLines({ callouts, activeId, width, height }) {
  const hub = { x: width * 0.5, y: height * 0.55 };
  return (
    <svg
      className="cp-infographic-connectors"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {callouts.map((c) => {
        const active = activeId === c.id;
        const x2 = (c.anchor.x / 100) * width;
        const y2 = (c.anchor.y / 100) * height;
        return (
          <line
            key={c.id}
            x1={hub.x}
            y1={hub.y}
            x2={x2}
            y2={y2}
            stroke={active ? BRAND.orange : "rgba(148,163,184,0.25)"}
            strokeWidth={active ? 2 : 1}
            strokeDasharray={active ? undefined : "4 3"}
          />
        );
      })}
    </svg>
  );
}

function CalloutBubble({ callout, active, onHover, onLeave }) {
  const isLeft = callout.side === "left";
  return (
    <button
      type="button"
      className={`cp-infographic-callout${active ? " cp-infographic-callout--active" : ""}`}
      data-side={callout.side}
      onMouseEnter={() => onHover(callout.id)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(callout.id)}
      onBlur={onLeave}
      style={{
        textAlign: isLeft ? "right" : "left",
        alignSelf: isLeft ? "flex-end" : "flex-start",
      }}
    >
      <span className="cp-infographic-callout-system">{callout.system}</span>
      <span className="cp-infographic-callout-problem">{callout.problem}</span>
      <span className="cp-infographic-callout-category">{callout.category}</span>
    </button>
  );
}

/**
 * @param {{ profileKey: "mining" | "agriculture" | "construction", printMode?: boolean }} props
 */
export default function CustomerProfileEquipmentInfographic({ profileKey, printMode = false }) {
  const config = INFOGRAPHIC_PROFILES[profileKey];
  const [activeId, setActiveId] = React.useState(null);

  if (!config) return null;

  const leftCallouts = config.callouts.filter((c) => c.side === "left");
  const rightCallouts = config.callouts.filter((c) => c.side === "right");

  const stageStyle = {
    position: "relative",
    borderRadius: printMode ? 0 : 14,
    overflow: "hidden",
    background: `linear-gradient(180deg, ${BRAND.navy} 0%, #0f172a 55%, #06080c 100%)`,
    border: printMode ? "1px solid #cbd5e1" : `1px solid rgba(234, 88, 12, 0.35)`,
    boxShadow: printMode ? "none" : "0 24px 60px rgba(15, 23, 42, 0.35)",
    minHeight: printMode ? 320 : "clamp(340px, 42vw, 480px)",
  };

  return (
    <section
      data-customer-profile-infographic={profileKey}
      data-print-friendly="true"
      aria-label={`${config.label} lubrication intelligence map`}
      style={{ width: "100%" }}
    >
      <style>{`
        .cp-infographic-stage { display: grid; grid-template-columns: minmax(140px, 22%) 1fr minmax(140px, 22%); gap: 0; min-height: inherit; }
        .cp-infographic-rail { display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 20px 12px; z-index: 3; }
        .cp-infographic-rail--left { align-items: flex-end; border-right: 1px solid rgba(234,88,12,0.12); }
        .cp-infographic-rail--right { align-items: flex-start; border-left: 1px solid rgba(234,88,12,0.12); }
        .cp-infographic-canvas { position: relative; display: flex; align-items: center; justify-content: center; padding: 16px 8px 24px; }
        .cp-infographic-connectors { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
        .cp-infographic-svg { width: 100%; max-height: clamp(200px, 32vw, 340px); display: block; filter: drop-shadow(0 16px 32px rgba(0,0,0,0.45)); }
        .cp-infographic-callout { display: grid; gap: 3px; max-width: 168px; padding: 10px 12px; margin: 0; border: 1px solid rgba(148,163,184,0.2); border-radius: 8px; background: rgba(8,12,20,0.88); cursor: default; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; }
        .cp-infographic-callout--active, .cp-infographic-callout:hover { border-color: ${BRAND.orange}; box-shadow: 0 0 20px rgba(234,88,12,0.25); }
        .cp-infographic-callout-system { font-size: 9px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; color: ${BRAND.orangeLight}; }
        .cp-infographic-callout-problem { font-size: 11px; font-weight: 800; color: ${BRAND.white}; line-height: 1.3; }
        .cp-infographic-callout-category { font-size: 10px; font-weight: 600; color: ${BRAND.slate}; line-height: 1.35; }
        @media (max-width: 900px) {
          .cp-infographic-stage { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; }
          .cp-infographic-rail { flex-direction: row; flex-wrap: wrap; justify-content: center; border: none !important; padding: 12px; }
          .cp-infographic-rail--left { order: 2; }
          .cp-infographic-rail--right { order: 3; }
          .cp-infographic-canvas { order: 1; min-height: 260px; }
          .cp-infographic-callout { max-width: 150px; text-align: left !important; align-self: stretch !important; }
        }
        @media print {
          .cp-infographic-stage { min-height: 280px !important; }
          .cp-infographic-callout { background: #f8fafc !important; border-color: #94a3b8 !important; }
          .cp-infographic-callout-system { color: #c2410c !important; }
          .cp-infographic-callout-problem { color: #0f172a !important; }
          .cp-infographic-callout-category { color: #475569 !important; }
        }
      `}</style>

      <header style={{ marginBottom: 16 }}>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.18em",
            color: BRAND.orange,
            textTransform: "uppercase",
          }}
        >
          {SECTION_TITLE}
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 14, fontWeight: 600, color: BRAND.muted, lineHeight: 1.45 }}>
          {SECTION_SUBTITLE}
        </p>
        <p
          style={{
            margin: "6px 0 0",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: BRAND.slate,
            textTransform: "uppercase",
          }}
        >
          {config.label}
        </p>
      </header>

      <div className="cp-infographic-stage" style={stageStyle}>
        <div className="cp-infographic-rail cp-infographic-rail--left">
          {leftCallouts.map((c) => (
            <CalloutBubble
              key={c.id}
              callout={c}
              active={activeId === c.id}
              onHover={setActiveId}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </div>

        <div className="cp-infographic-canvas">
          <ConnectorLines callouts={config.callouts} activeId={activeId} width={1000} height={380} />
          {config.renderScene(activeId)}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "10% 5% 8%",
              background: "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(234,88,12,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div className="cp-infographic-rail cp-infographic-rail--right">
          {rightCallouts.map((c) => (
            <CalloutBubble
              key={c.id}
              callout={c}
              active={activeId === c.id}
              onHover={setActiveId}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
