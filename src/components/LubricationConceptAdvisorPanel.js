/**
 * Isolated lubrication concept advisor panel — preview/testing only.
 * Not wired to App.js or navigation.
 */

import React from "react";
import { buildConceptExplanation } from "../utils/lubricationAdvisorCoreHelpers";

const CATEGORY_LABELS = {
  engine_oil: "Engine oil",
  hydraulic_fluid: "Hydraulic fluid",
  gear_oil: "Gear oil",
  grease: "Grease",
  compressor_oil: "Compressor oil",
  turbine_oil: "Turbine oil",
  tractor_hydraulic: "Tractor hydraulic",
  utf: "UTF / wet brake systems",
};

/**
 * @param {ReturnType<typeof buildConceptExplanation>} explanation
 * @returns {string[]}
 */
function deriveFollowUpQuestions(explanation) {
  if (!explanation?.ok) {
    return [
      "Explain viscosity index",
      "What is water washout?",
      "What causes wet brake chatter?",
      "What is hydraulic cavitation?",
    ];
  }

  /** @type {string[]} */
  const items = [];
  for (const cat of explanation.relatedCategories || []) {
    const label = CATEGORY_LABELS[cat] || String(cat).replace(/_/g, " ");
    items.push(`What KLONDIKE products apply to ${label.toLowerCase()}?`);
  }
  items.push("What OEM or equipment details should I confirm with the customer?");
  if ((explanation.applicationNotes || []).length > 0) {
    items.push("What application questions should I ask next?");
  }
  return [...new Set(items)].slice(0, 4);
}

function SectionBlock({ eyebrow, title, children }) {
  if (!children) return null;
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {eyebrow ? (
        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#1e3a8a" }}>
          {eyebrow}
        </div>
      ) : null}
      {title ? (
        <div style={{ fontSize: 14, fontWeight: 900, color: "#0f172a" }}>{title}</div>
      ) : null}
      <div style={{ fontSize: 14, lineHeight: 1.55, color: "#334155" }}>{children}</div>
    </div>
  );
}

export function LubricationConceptAdvisorPanel() {
  const [question, setQuestion] = React.useState("");
  const [response, setResponse] = React.useState(null);

  const handleAsk = () => {
    setResponse(buildConceptExplanation(question));
  };

  const followUps = deriveFollowUpQuestions(response);
  const relatedApplications = [
    ...(response?.applicationNotes || []),
    ...(response?.relatedCategories || []).map((cat) => {
      const label = CATEGORY_LABELS[cat] || String(cat).replace(/_/g, " ");
      return `Related category: ${label}`;
    }),
  ];

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
            LUBRICATION CONCEPT ADVISOR
          </div>
          <h3 style={{ margin: "6px 0 8px", fontSize: 22, fontWeight: 900, color: "#0f172a" }}>
            Concept Intelligence Preview
          </h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#475569" }}>
            Standalone panel for testing deterministic lubrication concept responses before main
            advisor integration.
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
            placeholder="e.g. Explain viscosity index"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAsk();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAsk}
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
            {response.message ? (
              <p style={{ margin: 0, fontSize: 12, color: "#64748b", fontWeight: 600 }}>
                {response.message}
                {response.confidence > 0
                  ? ` · Confidence ${Math.round(response.confidence * 100)}%`
                  : ""}
              </p>
            ) : null}

            {response.ok ? (
              <>
                <SectionBlock eyebrow="DIRECT ANSWER">{response.directAnswer}</SectionBlock>
                <SectionBlock eyebrow="WHY IT MATTERS">{response.whyItMatters}</SectionBlock>
                <SectionBlock eyebrow="SALES TRANSLATION">{response.repGuidance}</SectionBlock>

                {relatedApplications.length > 0 ? (
                  <div style={{ display: "grid", gap: 6 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: "0.1em",
                        color: "#0f766e",
                      }}
                    >
                      RELATED APPLICATIONS
                    </div>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: 18,
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: "#334155",
                      }}
                    >
                      {relatedApplications.map((item, idx) => (
                        <li key={`${item}-${idx}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {followUps.length > 0 ? (
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
                      {followUps.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setQuestion(item);
                            setResponse(buildConceptExplanation(item));
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
              </>
            ) : (
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#64748b" }}>
                {response.message}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LubricationConceptAdvisorPanel;
