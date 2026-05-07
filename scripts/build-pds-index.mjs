import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "pds");

function walk(d, rel) {
  const out = [];
  for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, ent.name);
    const r = rel ? `${rel}/${ent.name}` : ent.name;
    if (ent.isDirectory()) out.push(...walk(p, r));
    else if (ent.name.toLowerCase().endsWith(".pdf"))
      out.push(r.replace(/\\/g, "/"));
  }
  return out;
}

const files = walk(root, "").sort();
const rows = files.map((f) => {
  const parts = f.split("/");
  const cat = parts.length > 1 ? parts.slice(0, -1).join("/") : "(root)";
  const base = parts[parts.length - 1];
  const seg = f.split("/").map((s) => encodeURIComponent(s)).join("/");
  const url = `/pds/${seg}`;
  const disp = base
    .replace(/\.pdf$/i, "")
    .replace(/^KLONDIKE[_ ]?/i, "")
    .replace(/_/g, " ")
    .trim();
  return {
    category: cat,
    displayName: disp || base,
    fileName: base,
    path: f,
    url,
  };
});

const outPath = path.join(__dirname, "..", "src", "data", "pdsLibraryIndex.js");
const banner = `/* Auto-built from public/pds — run: node scripts/build-pds-index.mjs */\n`;
const body = `${banner}export const PDS_LIBRARY_INDEX = ${JSON.stringify(rows, null, 2)};\n`;
fs.writeFileSync(outPath, body, "utf8");
console.log(`Wrote ${rows.length} entries to ${outPath}`);
