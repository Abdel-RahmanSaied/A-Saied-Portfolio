#!/usr/bin/env node
// Prints /resume to the downloadable PDF with headless Chrome, so the PDF
// is the web page's own print stylesheet — the two can't drift apart.
//
//   npm run build && npm start          # in one terminal
//   npm run resume:pdf                  # in another
//
// Options: --url <page>  (default http://localhost:3000/resume)
//          --out <file>  (default public/assets/Abdelrahman_Saied_resume.pdf)
// Set CHROME_PATH if Chrome/Chromium isn't in a standard location.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const url = arg("url", "http://localhost:3000/resume");
const out = resolve(arg("out", "public/assets/Abdelrahman_Saied_resume.pdf"));

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome not found. Set CHROME_PATH to a Chrome or Chromium binary.");
  process.exit(1);
}

try {
  // Chrome logs harmless GPU/display warnings on stderr; only show them on failure.
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=5000",
      `--print-to-pdf=${out}`,
      url,
    ],
    { stdio: ["ignore", "ignore", "pipe"] }
  );
} catch (err) {
  console.error(String(err.stderr || err.message));
  process.exit(1);
}

// Sanity checks: the résumé must stay on exactly one A4 page.
const pdf = readFileSync(out).toString("latin1");
const pages = (pdf.match(/\/Type\s*\/Page(?!s)/g) || []).length;
const box = pdf.match(/\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*\]/);
const size = box ? `${Math.round(box[1])}x${Math.round(box[2])}pt` : "unknown size";
console.log(`Wrote ${out} — ${pages} page(s), ${size}`);
if (pages !== 1) {
  console.error("Expected exactly one page. Tighten the résumé content or print styles.");
  process.exit(2);
}
