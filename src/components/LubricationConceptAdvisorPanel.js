/**
 * Isolated lubrication concept advisor panel — preview/testing only.
 * Not wired to App.js or navigation.
 */

import React from "react";
import { buildLubricationAdvisorResponse } from "../utils/lubricationAdvisorOrchestrator";

const BADGE_STYLES = {
  "PDS-backed": { bg: "#eff6ff", color: "#1e40af", border: "rgba(59,130,246,0.35)" },
  "Product intelligence match": { bg: "#ecfdf5", color: "#047857", border: "rgba(16,185,129,0.35)" },
  "Training guidance": { bg: "#f5f3ff", color: "#5b21b6", border: "rgba(167,139,250,0.35)" },
  "Troubleshooting guidance": { bg: "#fff7ed", color: "#c2410c", border: "rgba(251,146,60,0.35)" },
  "Industry profile": { bg: "#ecfeff", color: "#0e7490", border: "rgba(34,211,238,0.35)" },
  "Needs technical confirmation": { bg: "#fff7ed", color: "#c2410c", border: "rgba(251,146,60,0.35)" },
};

const INTENT_STYLES = {
  troubleshooting: { bg: "#fff7ed", color: "#c2410c", label: "Troubleshooting" },
  industry: { bg: "#ecfeff", color: "#0e7490", label: "Industry" },
  concept: { bg: "#f5f3ff", color: "#5b21b6", label: "Concept" },
  general: { bg: "#f8fafc", color: "#64748b", label: "General" },
};

function ResponseSection({ section }) {
  if (!section) return null;
  const hasBody = !!section.body;
  const hasItems = Array.isArray(section.items) && section.items.length > 0;
  if (!hasBody && !hasItems) return null;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#1e3a8a" }}>
        {String(section.title || "").toUpperCase()}
      </div>
      {hasBody ? (
        <div style={{ fontSize: 14, lineHeight: 1.55, color: "#334155", fontWeight: 600 }}>{section.body}</div>
      ) : null}
      {hasItems ? (
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.5, color: "#334155" }}>
          {section.items.map((item, idx) => (
            <li key={`${section.id}-${idx}`}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function LubricationConceptAdvisorPanel() {
  const [question, setQuestion] = React.useState("");
  const [response, setResponse] = React.useState(null);

  const handleAsk = (text) => {
    setResponse(buildLubricationAdvisorResponse(text ?? question));
  };

  const intentStyle = response ? INTENT_STYLES[response.intent] || INTENT_STYLES.general : null;

  return (
    <div
      style={{
        minWidth: 0,
        maxWidth: 720,
        margin: "0 auto",
        padding: "20px 16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: 16,
          padding: "18px 16px",
          borderRadius: 14,
          border: "1px solid #e2e8f0",
          background: "#ffffff",
          boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: "#1e3a8a" }}>
            LUBRICATION ADVISOR PREVIEW
          </div>
          <h3 style={{ margin: "6px 0 8px", fontSize: 22, fontWeight: 900, color: "#0f172a" }}>
            Orchestrated Intelligence Panel
          </h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#475569" }}>
            Standalone panel for testing deterministic concept, troubleshooting, and industry responses
            before main advisor integration.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 10,
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            alignItems: "stretch",
          }}
        >
          <input
            style={{
              minHeight: 48,
              borderRadius: 10,
              border: "1px solid #cbd5e1",
              padding: "10px 12px",
              fontSize: 14,
              fontWeight: 600,
              color: "#0f172a",
              background: "#ffffff",
              width: "100%",
              boxSizing: "border-box",
            }}
            placeholder="e.g. wet brake chatter · Does a quarry use lubricants? · Explain viscosity index"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAsk(question);
              }
            }}
          />
          <button
            type="button"
            onClick={() => handleAsk(question)}
            style={{
              minHeight: 48,
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(180deg, #f6a531 0%, #d87400 100%)",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 8px 18px rgba(246,165,49,0.28)",
            }}
          >
            Ask
          </button>
        </div>

        {response ? (
          <div
            style={{
              display: "grid",
              gap: 14,
              paddingTop: 8,
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              {intentStyle ? (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: "0.06em",
                    padding: "5px 10px",
                    borderRadius: 999,
                    background: intentStyle.bg,
                    color: intentStyle.color,
                    border: `1px solid ${intentStyle.color}33`,
                  }}
                >
                  {intentStyle.label}
                </span>
              ) : null}
              {(response.sourceBadges || []).map((badge) => {
                const st = BADGE_STYLES[badge] || BADGE_STYLES["Needs technical confirmation"];
                return (
                  <span
                    key={badge}
                    style={{
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: "0.06em",
                      padding: "5px 10px",
                      borderRadius: 999,
                      background: st.bg,
                      color: st.color,
                      border: `1px solid ${st.border}`,
                    }}
                  >
                    {badge}
                  </span>
                );
              })}
              {response.confidence > 0 ? (
                <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b" }}>
                  Confidence {Math.round(response.confidence * 100)}%
                </span>
              ) : null}
            </div>

            {response.title ? (
              <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", lineHeight: 1.3 }}>
                {response.title}
              </div>
            ) : null}

            {response.directAnswer ? (
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#1e3a8a" }}>
                  DIRECT ANSWER
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: "#334155", fontWeight: 600 }}>
                  {response.directAnswer}
                </div>
              </div>
            ) : null}

            {(response.sections || []).map((sec) => (
              <ResponseSection key={sec.id} section={sec} />
            ))}

            {(response.cautionNotes || []).length > 0 ? (
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "#fff7ed",
                  border: "1px dashed rgba(251,146,60,0.5)",
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "#9a3412",
                  fontWeight: 600,
                }}
              >
                <strong>Confirm before use:</strong>
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  {response.cautionNotes.map((note, idx) => (
                    <li key={`caution-${idx}`}>{note}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {(response.followUpQuestions || []).length > 0 ? (
              <div style={{ display: "grid", gap: 8 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    color: "#94a3b8",
                  }}
                >
                  FOLLOW-UP QUESTIONS
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  {response.followUpQuestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setQuestion(item);
                        handleAsk(item);
                      }}
                      style={{
                        cursor: "pointer",
                        textAlign: "left",
                        border: "1px dashed #cbd5e1",
                        borderRadius: 8,
                        padding: "8px 10px",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#475569",
                        background: "#f8fafc",
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LubricationConceptAdvisorPanel;
