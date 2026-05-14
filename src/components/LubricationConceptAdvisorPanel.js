/**
 * Lubricant Advisor panel — deterministic orchestrated responses.
 */

import React from "react";
import { buildLubricationAdvisorResponse } from "../utils/lubricationAdvisorOrchestrator";

const QUICK_PROMPTS = [
  "Allison",
  "Cummins CES 20086",
  "Does a quarry use lubricants?",
  "What lubricants does an excavator use?",
  "Explain viscosity index",
  "Wet brake chatter",
];

const BADGE_STYLES = {
  "PDS-backed": { bg: "#eff6ff", color: "#1e40af", border: "rgba(59,130,246,0.35)" },
  "PDS library match": { bg: "#eff6ff", color: "#1e40af", border: "rgba(59,130,246,0.35)" },
  "Product intelligence match": { bg: "#ecfdf5", color: "#047857", border: "rgba(16,185,129,0.35)" },
  "Training guidance": { bg: "#f5f3ff", color: "#5b21b6", border: "rgba(167,139,250,0.35)" },
  "Troubleshooting guidance": { bg: "#fff7ed", color: "#c2410c", border: "rgba(251,146,60,0.35)" },
  "Industry profile": { bg: "#ecfeff", color: "#0e7490", border: "rgba(34,211,238,0.35)" },
  "Equipment profile": { bg: "#f0fdf4", color: "#15803d", border: "rgba(34,197,94,0.35)" },
  "OEM/spec profile": { bg: "#eff6ff", color: "#1e40af", border: "rgba(59,130,246,0.35)" },
  "Needs technical confirmation": { bg: "#fff7ed", color: "#c2410c", border: "rgba(251,146,60,0.35)" },
};

const INTENT_STYLES = {
  troubleshooting: { bg: "#fff7ed", color: "#c2410c", label: "Troubleshooting" },
  equipment: { bg: "#f0fdf4", color: "#15803d", label: "Equipment" },
  industry: { bg: "#ecfeff", color: "#0e7490", label: "Industry" },
  oem_spec: { bg: "#eff6ff", color: "#1e40af", label: "OEM / Spec" },
  concept: { bg: "#f5f3ff", color: "#5b21b6", label: "Concept" },
  general: { bg: "#f8fafc", color: "#64748b", label: "General" },
};

function ResponseSection({ section }) {
  if (!section) return null;
  const hasBody = !!section.body;
  const hasItems = Array.isArray(section.items) && section.items.length > 0;
  if (!hasBody && !hasItems) return null;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#1e3a8a" }}>
        {String(section.title || "").toUpperCase()}
      </div>
      {hasBody ? (
        <div style={{ fontSize: 14, lineHeight: 1.6, color: "#334155", fontWeight: 600 }}>{section.body}</div>
      ) : null}
      {hasItems ? (
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.55, color: "#334155" }}>
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

  const handleQuickPrompt = (prompt) => {
    setQuestion(prompt);
    setResponse(buildLubricationAdvisorResponse(prompt));
  };

  const intentStyle = response ? INTENT_STYLES[response.intent] || INTENT_STYLES.general : null;

  return (
    <div
      style={{
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: 20,
          width: "100%",
          padding: "22px 20px",
          borderRadius: 14,
          border: "1px solid #e5e7eb",
          background: "#ffffff",
          boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            style={{
              minHeight: 48,
              borderRadius: 10,
              border: "1px solid #cbd5e1",
              padding: "12px 14px",
              fontSize: 14,
              fontWeight: 600,
              color: "#0f172a",
              background: "#ffffff",
              width: "100%",
              boxSizing: "border-box",
            }}
            placeholder="Ask me about a spec, industry, equipment, or lubrication issue…"
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
              width: "100%",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(180deg, #f6a531 0%, #d87400 100%)",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: 15,
              cursor: "pointer",
              letterSpacing: 0.4,
              boxShadow: "0 8px 20px rgba(246, 165, 49, 0.25)",
            }}
          >
            Ask
          </button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleQuickPrompt(prompt)}
              style={{
                cursor: "pointer",
                border: "1px solid #e2e8f0",
                borderRadius: 999,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 700,
                color: "#334155",
                background: "#f8fafc",
                lineHeight: 1.35,
                textAlign: "left",
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {response ? (
          <div
            style={{
              display: "grid",
              gap: 18,
              paddingTop: 16,
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
              <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", lineHeight: 1.3 }}>
                {response.title}
              </div>
            ) : null}

            {response.directAnswer ? (
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#1e3a8a" }}>
                  DIRECT ANSWER
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: "#334155", fontWeight: 600 }}>
                  {response.directAnswer}
                </div>
              </div>
            ) : null}

            <div style={{ display: "grid", gap: 16 }}>
              {(response.sections || []).map((sec) => (
                <ResponseSection key={sec.id} section={sec} />
              ))}
            </div>

            {(response.cautionNotes || []).length > 0 ? (
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "#fff7ed",
                  border: "1px dashed rgba(251,146,60,0.5)",
                  fontSize: 12,
                  lineHeight: 1.55,
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
              <div style={{ display: "grid", gap: 10 }}>
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
                      onClick={() => handleQuickPrompt(item)}
                      style={{
                        cursor: "pointer",
                        textAlign: "left",
                        border: "1px dashed #cbd5e1",
                        borderRadius: 8,
                        padding: "10px 12px",
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
