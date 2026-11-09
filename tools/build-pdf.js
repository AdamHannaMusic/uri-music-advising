#!/usr/bin/env node
/* Builds URI-Music-Advising-Training.pdf from the content in data.js.
 *
 * Usage:  node tools/build-pdf.js
 * Needs:  Node 14+ and Google Chrome (or Chromium). Set CHROME_PATH to override.
 *
 * Re-run this after editing data.js so the downloadable PDF stays current.
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT_PDF = path.join(ROOT, "URI-Music-Advising-Training.pdf");

/* ---------- load data.js (top-level consts are not exported, so append an export) ---------- */
const src = fs.readFileSync(path.join(ROOT, "data.js"), "utf8") +
  "\n;__out = { SIX_RULES, SOURCE_ORDER, ROUTING, PORTFOLIOS, FORMS_REF, CURRICULA, APPROVED_COURSES," +
  " CALENDAR_SOURCE, CALENDAR_UPDATED, CALENDAR, PLANNER_URL, DEGREE_PATHS, MUSIC_MINORS," +
  " WORKSHEETS_2627, FILES, MODULES, TEMPLATES };";
const sandbox = { __out: null };
vm.runInNewContext(src, sandbox);
const D = sandbox.__out;

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const table = (headers, rows) => `<table>
  <thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
  <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
</table>`;

const parseISO = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const fmtDate = iso => parseISO(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtRange = i => i.end ? `${fmtDate(i.date)} – ${fmtDate(i.end)}` : fmtDate(i.date);
const KIND = { reg: "Registration", deadline: "Deadline", grad: "Graduation", holiday: "Closure", term: "Term" };
const LETTERS = "ABCDEFGH";

/* ---------- sections ---------- */
const parts = [];

parts.push(`
<section class="cover">
  <p class="eyebrow">URI Department of Music</p>
  <h1>New Advisor Training</h1>
  <p class="lead">Music Advising Procedures: rules, training modules, degree paths, calendar,
  quick reference, email templates, and files.</p>
  <p class="small">Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
  from the online training site. The student's controlling catalog, University Manual, academic calendar,
  approved curriculum, and written office instructions always control over this document.
  Verify every form against the live official URI pages before use.</p>
</section>`);

parts.push(`
<section>
  <h1>The six rules for safe advising</h1>
  <ol class="rules">${D.SIX_RULES.map(r => `<li><strong>${esc(r.t)}</strong><br>${esc(r.d)}</li>`).join("")}</ol>
  <h2>Source-of-truth order</h2>
  <p>When you need to know what is true for a student, work down this list. A lower source never overrides a higher one.</p>
  <ol>${D.SOURCE_ORDER.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
</section>`);

D.MODULES.forEach(m => {
  const sections = m.sections.map(s => {
    let html = s.html.replace(/(<ol[^>]*id="sourceOrderList"[^>]*>)(<\/ol>)/,
      `$1${D.SOURCE_ORDER.map(x => `<li>${esc(x)}</li>`).join("")}$2`);
    return `<h2>${esc(s.h)}</h2>${html}`;
  }).join("");
  const quiz = m.quiz.map((q, qi) => `
    <div class="q">
      <p><strong>${qi + 1}. ${esc(q.q)}</strong></p>
      <ul class="opts">${q.options.map((o, oi) =>
        `<li class="${oi === q.answer ? "ans" : ""}">${LETTERS[oi]}. ${esc(o)}${oi === q.answer ? " &nbsp;✓ correct" : ""}</li>`).join("")}</ul>
      <p class="explain">${esc(q.explain)}</p>
    </div>`).join("");
  parts.push(`
<section>
  <p class="eyebrow">Module ${m.num} of ${D.MODULES.length}</p>
  <h1>${esc(m.title)}</h1>
  <p class="lead">${esc(m.summary)}</p>
  ${sections}
  <h2>Quick check</h2>
  ${quiz}
</section>`);
});

parts.push(`
<section>
  <p class="eyebrow">URI Music degrees</p>
  <h1>Degree paths</h1>
  ${[...new Set(D.DEGREE_PATHS.map(d => d.family))].map(fam => `
    <h2>${esc(fam)}</h2>
    ${D.DEGREE_PATHS.filter(d => d.family === fam).map(d => `
      <div class="degree">
        <h3>${esc(d.name)} <span class="chip">${esc(d.advisor)}</span> <span class="chip">${esc(d.credits)}</span></h3>
        <p><strong>Published structure.</strong> ${esc(d.structure)}</p>
        <p><strong>Advising watchpoints</strong></p>
        <ul>${d.watch.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
        <p class="small">Official requirements: ${esc(d.catalog)}${d.worksheet ? `<br>2026–2027 worksheet: ${esc(d.worksheet)}` : ""}</p>
      </div>`).join("")}`).join("")}
  <h2>Music minors</h2>
  <p>Advised by ${esc(D.MUSIC_MINORS.advisor)}. Published minors (${esc(D.MUSIC_MINORS.credits)}):</p>
  <ul>${D.MUSIC_MINORS.list.map(m => `<li>${esc(m)}</li>`).join("")}</ul>
  <p><strong>Rules to remember</strong></p>
  <ul>${D.MUSIC_MINORS.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>
  <p class="small">Interactive course planner: ${esc(D.PLANNER_URL)}</p>
</section>`);

const calTerms = [];
const calGroups = {};
[...D.CALENDAR].sort((a, b) => parseISO(a.date) - parseISO(b.date)).forEach(i => {
  if (!calGroups[i.term]) { calGroups[i.term] = []; calTerms.push(i.term); }
  calGroups[i.term].push(i);
});
parts.push(`
<section>
  <h1>Academic calendar</h1>
  <p class="callout">Always verify before advising a deadline. ${esc(D.CALENDAR_UPDATED)}
  Confirm against the official calendar: ${esc(D.CALENDAR_SOURCE)}</p>
  ${calTerms.map(t => `<h2>${esc(t)}</h2>${table(["Date", "Item", "Type"],
    calGroups[t].map(i => [fmtRange(i), i.label, KIND[i.kind] || i.kind]))}`).join("")}
</section>`);

parts.push(`
<section>
  <h1>Quick reference</h1>
  <h2>Quick routing: who owns the question</h2>
  ${table(["Question", "Primary owner", "Your role"], D.ROUTING)}
  <h2>Advisor portfolios</h2>
  ${table(["Advisor", "Programs"], D.PORTFOLIOS)}
  <p class="callout">Unlisted programs are never assigned by analogy. The Department Chair assigns them in writing and the systems are updated before a handoff is complete.</p>
  <h2>Forms quick reference</h2>
  ${table(["If the student needs to…", "Use…", "Send / route to…"], D.FORMS_REF)}
  <h2>Curriculum snapshot</h2>
  <p class="small">Orientation only. Use the student's controlling catalog and approved curriculum sheet for an actual audit.</p>
  ${table(["Program", "Advisor", "~Credits", "Watchpoints"], D.CURRICULA)}
  <h2>Approved upper-level Music courses</h2>
  <p><strong>Music History:</strong> ${D.APPROVED_COURSES.history.map(esc).join(", ")}</p>
  <p><strong>Music Theory:</strong> ${D.APPROVED_COURSES.theory.map(esc).join(", ")}</p>
  <h2>Graduation deadlines (verify the current form)</h2>
  ${table(["Graduation term", "Intent to Graduate deadline"], [["May", "October 1"], ["August", "February 1"], ["December", "March 1"]])}
</section>`);

parts.push(`
<section>
  <h1>Email templates</h1>
  <p class="lead">T01–T46 are student-facing; T47–T56 are internal. Replace the [bracketed] text for the student or case.</p>
  ${D.TEMPLATES.map(t => `
    <div class="tmpl">
      <h3>${esc(t.id)}: ${esc(t.title)}${t.internal ? " (internal)" : ""} <span class="chip">${esc(t.category)}</span></h3>
      <pre>${esc(t.body)}</pre>
    </div>`).join("")}
</section>`);

parts.push(`
<section>
  <h1>Files &amp; forms</h1>
  <h2>2026–2027 program worksheets</h2>
  ${table(["Program", "Advisor", "Worksheet file"], D.WORKSHEETS_2627.map(w => [w.prog, w.advisor, w.file]))}
  ${D.FILES.map(g => `
    <h2>${esc(g.group)}</h2>
    <ul>${g.items.map(it => `<li>${esc(it.name)}<br><code>${esc(it.path)}</code></li>`).join("")}</ul>`).join("")}
</section>`);

/* ---------- document ---------- */
const css = `
@page { size: Letter; margin: 0.7in 0.75in; }
* { box-sizing: border-box; }
body { font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; color: #1d2733; font-size: 10.5pt; line-height: 1.45; margin: 0; }
section { page-break-before: always; }
section.cover { page-break-before: avoid; padding-top: 2.2in; }
h1 { color: #002147; font-size: 22pt; margin: 0 0 8pt; border-bottom: 3px solid #c8a95a; padding-bottom: 6pt; }
section.cover h1 { font-size: 34pt; border: 0; }
h2 { color: #002147; font-size: 14pt; margin: 18pt 0 6pt; page-break-after: avoid; }
h3 { color: #1b3a5e; font-size: 11.5pt; margin: 12pt 0 4pt; page-break-after: avoid; }
h4 { margin: 8pt 0 3pt; }
.eyebrow { color: #9a6a00; text-transform: uppercase; letter-spacing: .08em; font-size: 9pt; font-weight: 700; margin: 0 0 4pt; }
.lead { font-size: 12pt; color: #3a4654; }
.small { font-size: 9pt; color: #5b6876; }
.chip { font-size: 8.5pt; font-weight: 600; background: #e8f0fa; color: #002147; border-radius: 9px; padding: 1pt 7pt; margin-left: 4pt; }
table { width: 100%; border-collapse: collapse; margin: 6pt 0 10pt; font-size: 9.5pt; }
th { background: #002147; color: #fff; text-align: left; padding: 4pt 6pt; }
td { border-bottom: 1px solid #d5dbe2; padding: 4pt 6pt; vertical-align: top; }
tr { page-break-inside: avoid; }
ul, ol { padding-left: 18pt; }
li { margin-bottom: 3pt; }
.callout, div.callout { background: #fdf3e0; border-left: 4px solid #c8a95a; padding: 7pt 10pt; margin: 8pt 0; }
.callout.good { background: #e5f4ec; border-left-color: #1a7f4b; }
.callout.warn { background: #fdf3e0; }
.q { margin: 8pt 0; page-break-inside: avoid; }
.q p { margin: 2pt 0; }
.opts { list-style: none; padding-left: 12pt; margin: 3pt 0; }
.opts li.ans { font-weight: 700; color: #1a7f4b; }
.explain { font-size: 9.5pt; color: #5b6876; font-style: italic; }
.degree, .tmpl { page-break-inside: avoid; margin-bottom: 8pt; }
pre { white-space: pre-wrap; word-wrap: break-word; font-family: inherit; font-size: 9.5pt; background: #f5f7fa; border: 1px solid #e2e7ec; border-radius: 4px; padding: 7pt 9pt; margin: 3pt 0; }
code { font-size: 8.5pt; color: #5b6876; word-break: break-all; }
.card { border: 1px solid #e2e7ec; border-radius: 6px; padding: 6pt 10pt; margin: 6pt 0; }
.pill-row { display: flex; flex-wrap: wrap; gap: 4pt; }
.pill { background: #e8f0fa; padding: 1pt 7pt; border-radius: 9px; font-size: 9pt; }
.grid { display: block; }
a { color: #0a66c2; text-decoration: none; }
`;
const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<title>URI Music Advising: New Advisor Training</title><style>${css}</style></head>
<body>${parts.join("\n")}</body></html>`;

/* ---------- print with headless Chrome ---------- */
function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser"
  ].filter(Boolean);
  const found = candidates.find(p => fs.existsSync(p));
  if (!found) throw new Error("Chrome/Chromium not found. Set CHROME_PATH.");
  return found;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "uri-pdf-"));
const tmpHtml = path.join(tmp, "training.html");
fs.writeFileSync(tmpHtml, html);
try {
  execFileSync(findChrome(), [
    "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
    `--user-data-dir=${path.join(tmp, "profile")}`,
    `--print-to-pdf=${OUT_PDF}`,
    "file://" + tmpHtml
  ], { stdio: "pipe" });
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
console.log("Wrote " + OUT_PDF + " (" + Math.round(fs.statSync(OUT_PDF).size / 1024) + " KB)");
