/**
 * Plain-text section payload for Sales Enablement spotlight email (Resend / Edge).
 * All strings are passed through server-side HTML escaping before email send.
 */

function asLines(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((s) => String(s || "").trim()).filter(Boolean);
}

/**
 * @param {object|null} spotlight — product or category spotlight row
 * @param {"product"|"category"} mode
 * @returns {{ title: string, sections: Array<{ heading: string, lines: string[] }> }}
 */
export function buildSalesEnablementSpotlightEmailPayload(spotlight, mode) {
  if (!spotlight) {
    return { title: "Klondike Spotlight", sections: [] };
  }
  const title = String(spotlight.title || "Klondike Spotlight").trim() || "Klondike Spotlight";
  /** @type {Array<{ heading: string, lines: string[] }>} */
  const sections = [];

  if (mode === "product") {
    const mr = Array.isArray(spotlight.marketReality) && spotlight.marketReality.length
      ? spotlight.marketReality
      : spotlight.targetMarkets || [];
    const mrLines = asLines(mr).slice(0, 8);
    if (mrLines.length) sections.push({ heading: "Market reality", lines: mrLines });

    if (String(spotlight.link || "").trim()) {
      sections.push({ heading: "Why this matters", lines: [String(spotlight.link).trim()] });
    }
    if (String(spotlight.useWhen || "").trim()) {
      sections.push({ heading: "Use when", lines: [String(spotlight.useWhen).trim()] });
    }
    const fbb = [
      spotlight.feature && `Feature: ${String(spotlight.feature).trim()}`,
      spotlight.bridge && `Bridge: ${String(spotlight.bridge).trim()}`,
      spotlight.benefit && `Benefit: ${String(spotlight.benefit).trim()}`,
    ].filter(Boolean);
    if (fbb.length) sections.push({ heading: "Talking points", lines: fbb.slice(0, 6) });

    if (String(spotlight.expandedOpportunity || "").trim()) {
      sections.push({
        heading: "Expanded opportunity",
        lines: [String(spotlight.expandedOpportunity).trim()],
      });
    }
    if (String(spotlight.salesAngle || "").trim()) {
      sections.push({ heading: "Sales angle for reps", lines: [String(spotlight.salesAngle).trim()] });
    }
    const closing = asLines(spotlight.closingLines).slice(0, 6);
    if (closing.length) sections.push({ heading: "Closing lines", lines: closing });

    const ops = [
      ...asLines(spotlight.relatedSpecs),
      ...asLines(spotlight.competitors).map((c) => `Competitive framing: ${c}`),
    ].slice(0, 8);
    if (ops.length) sections.push({ heading: "Operational notes", lines: ops });
  } else {
    const mr = asLines(spotlight.marketReality);
    if (mr.length) sections.push({ heading: "Market reality", lines: mr.slice(0, 8) });
    else if (String(spotlight.focus || "").trim()) {
      sections.push({ heading: "Focus", lines: [String(spotlight.focus).trim()] });
    }
    if (String(spotlight.link || "").trim()) {
      sections.push({ heading: "Why this matters", lines: [String(spotlight.link).trim()] });
    }
    if (String(spotlight.useWhen || "").trim()) {
      sections.push({ heading: "Use when", lines: [String(spotlight.useWhen).trim()] });
    }
    const fbb = [
      spotlight.feature && `Feature: ${String(spotlight.feature).trim()}`,
      spotlight.bridge && `Bridge: ${String(spotlight.bridge).trim()}`,
      spotlight.benefit && `Benefit: ${String(spotlight.benefit).trim()}`,
    ].filter(Boolean);
    if (fbb.length) sections.push({ heading: "Talking points", lines: fbb.slice(0, 6) });

    const tp = asLines(spotlight.talkingPoints).slice(0, 10);
    if (tp.length) sections.push({ heading: "Conversation anchors", lines: tp });

    const sa = asLines(spotlight.suggestedActions).slice(0, 8);
    if (sa.length) sections.push({ heading: "Suggested actions", lines: sa });

    const ts = asLines(spotlight.territorySignals).slice(0, 8);
    if (ts.length) sections.push({ heading: "Territory signals", lines: ts });

    if (String(spotlight.salesAngle || "").trim()) {
      sections.push({ heading: "Sales angle for reps", lines: [String(spotlight.salesAngle).trim()] });
    }
    const closing = asLines(spotlight.closingLines).slice(0, 6);
    if (closing.length) sections.push({ heading: "Closing lines", lines: closing });
  }

  return { title, sections: sections.filter((s) => s.lines && s.lines.length > 0) };
}
