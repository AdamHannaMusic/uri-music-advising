/* ============================================================
   URI Music Advising Training — app logic
   Vanilla JS, no dependencies. Hash-based routing.
   ============================================================ */

const STORE_KEY = "uri-music-advising-progress-v1";

/* ---------- progress state ---------- */
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || { done: {} };
  } catch (e) {
    return { done: {} };
  }
}
function saveProgress(p) {
  localStorage.setItem(STORE_KEY, JSON.stringify(p));
}
let progress = loadProgress();

function moduleDone(id) { return !!progress.done[id]; }
function markDone(id) { progress.done[id] = true; saveProgress(progress); updateProgressUI(); }

function completionPercent() {
  const total = MODULES.length;
  const done = MODULES.filter(m => moduleDone(m.id)).length;
  return total ? Math.round((done / total) * 100) : 0;
}

/* ---------- small helpers ---------- */
const $ = sel => document.querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 1900);
}

function table(headers, rows) {
  return `<div class="table-wrap"><table>
    <thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}

/* ---------- sidebar module nav ---------- */
function buildModuleNav() {
  const nav = $("#moduleNav");
  nav.innerHTML = MODULES.map(m =>
    `<a href="#/module/${m.id}" class="nav-link" data-route="module/${m.id}">
       <span class="check">${moduleDone(m.id) ? "✓" : ""}</span>Module ${m.num}: ${esc(m.title)}
     </a>`
  ).join("");
}

function updateProgressUI() {
  const pct = completionPercent();
  $("#progressText").textContent = pct + "% complete";
  buildModuleNav();
  // re-highlight active link after rebuild
  highlightActive();
}

function highlightActive() {
  const route = (location.hash || "#/home").replace(/^#\//, "");
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.getAttribute("data-route") === route);
  });
}

/* ============================================================
   VIEWS
   ============================================================ */

function viewHome() {
  const pct = completionPercent();
  const tiles = [
    ["#/rules", "📐", "The six rules", "The core discipline behind every safe advising decision."],
    ["#/module/m1", "🎓", "Start the training", `7 short modules with a quick check after each. You're ${pct}% through.`],
    ["#/calendar", "📅", "Academic calendar", "Registration, drop/add, and graduation deadlines for 2026–2027."],
    ["#/reference", "📋", "Quick reference", "Forms routing, portfolios, curriculum snapshot, approved courses."],
    ["#/templates", "✉️", "Email templates", "All 56 Gmail templates (T01–T56), searchable and copy-ready."],
    ["#/files", "📁", "Files & forms", "Where the worksheets, forms, and manuals live in the Starter Pack."]
  ];
  return `
    <p class="eyebrow">URI Department of Music</p>
    <h1>New Advisor Training</h1>
    <p class="lead">A click-through onboarding course for new Music advisors. Work through the modules in order,
    then keep the reference tables and email templates handy during real advising. Everything here is grounded in the
    department's Advising Procedures and Training Manual.</p>

    <div class="card">
      <strong>Your progress</strong>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <p style="margin:6px 0 0;color:var(--muted);font-size:14px;">${MODULES.filter(m=>moduleDone(m.id)).length} of ${MODULES.length} modules complete · progress saves automatically in this browser.</p>
    </div>

    <h2>Where to go</h2>
    <div class="grid grid-3">
      ${tiles.map(([href, icon, title, sub]) =>
        `<a class="tile" href="${href}"><span class="tile-icon">${icon}</span>
          <strong>${title}</strong><span>${sub}</span></a>`).join("")}
    </div>

    <div class="callout warn" style="margin-top:26px;">
      <strong>One rule above all:</strong> the student's controlling catalog, University Manual, academic calendar,
      approved curriculum, and written office instructions always control over this app. When something here conflicts
      with an official source, stop and verify.
    </div>`;
}

function viewRules() {
  return `
    <p class="eyebrow">Quick start</p>
    <h1>The six rules for safe advising</h1>
    <p class="lead">Every appointment, email, and audit comes back to these. Learn them first.</p>
    <div class="card">
      ${SIX_RULES.map((r, i) => `
        <div class="rule">
          <div class="rule-num">${i + 1}</div>
          <div class="rule-body"><strong>${esc(r.t)}</strong><br>${esc(r.d)}</div>
        </div>`).join("")}
    </div>

    <h2>Source-of-truth order</h2>
    <p>When you need to know what's true for a student, work down this list. A lower source never overrides a higher one.</p>
    <div class="card">
      <ol class="clean">${SOURCE_ORDER.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    </div>

    <div class="module-footer">
      <span></span>
      <a class="btn" href="#/module/m1">Start Module 1 →</a>
    </div>`;
}

function viewModule(id) {
  const m = MODULES.find(x => x.id === id);
  if (!m) return `<h1>Module not found</h1><p><a href="#/home">Back to welcome</a></p>`;
  const idx = MODULES.findIndex(x => x.id === id);
  const prev = MODULES[idx - 1];
  const next = MODULES[idx + 1];

  const sectionsHtml = m.sections.map(s =>
    `<h2>${esc(s.h)}</h2>${s.html}`).join("");

  const quizHtml = `
    <h2>Quick check</h2>
    <p>Answer all ${m.quiz.length} to mark this module complete. You can retry as many times as you like.</p>
    <div class="quiz" id="quiz">
      ${m.quiz.map((q, qi) => `
        <div class="question" data-answer="${q.answer}" data-qi="${qi}">
          <div class="q-text">${qi + 1}. ${esc(q.q)}</div>
          ${q.options.map((opt, oi) => `
            <label class="option" data-oi="${oi}">
              <input type="radio" name="q${qi}" value="${oi}"> ${esc(opt)}
            </label>`).join("")}
          <div class="explain">${esc(q.explain)}</div>
        </div>`).join("")}
    </div>
    <div class="quiz-result" id="quizResult"></div>
    <div class="module-footer">
      <div>
        ${prev ? `<a class="btn secondary" href="#/module/${prev.id}">← Module ${prev.num}</a>` : `<a class="btn secondary" href="#/rules">← The six rules</a>`}
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn" id="checkBtn">Check answers</button>
        ${next ? `<a class="btn secondary" id="nextBtn" href="#/module/${next.id}">Module ${next.num} →</a>`
               : `<a class="btn secondary" href="#/reference">Reference →</a>`}
      </div>
    </div>`;

  return `
    <div class="module-head">
      <span class="module-badge">Module ${m.num} of ${MODULES.length}</span>
      ${moduleDone(m.id) ? `<span class="done-badge">✓ Completed</span>` : ""}
    </div>
    <h1>${esc(m.title)}</h1>
    <p class="lead">${esc(m.summary)}</p>
    ${sectionsHtml}
    ${quizHtml}`;
}

function wireModule(id) {
  // inject source order list if present (module 1)
  const list = $("#sourceOrderList");
  if (list) list.innerHTML = SOURCE_ORDER.map(s => `<li>${esc(s)}</li>`).join("");

  const checkBtn = $("#checkBtn");
  if (!checkBtn) return;

  checkBtn.addEventListener("click", () => {
    const m = MODULES.find(x => x.id === id);
    const questions = document.querySelectorAll(".question");
    let correct = 0, answered = 0;

    questions.forEach(qEl => {
      const ans = Number(qEl.dataset.answer);
      const picked = qEl.querySelector("input:checked");
      const explain = qEl.querySelector(".explain");
      // reset styles
      qEl.querySelectorAll(".option").forEach(o => o.classList.remove("correct", "incorrect"));

      if (picked) {
        answered++;
        const oi = Number(picked.value);
        const chosenLabel = qEl.querySelector(`.option[data-oi="${oi}"]`);
        if (oi === ans) {
          correct++;
          chosenLabel.classList.add("correct");
        } else {
          chosenLabel.classList.add("incorrect");
          qEl.querySelector(`.option[data-oi="${ans}"]`).classList.add("correct");
        }
      }
      if (explain) explain.classList.add("show");
    });

    const result = $("#quizResult");
    result.classList.add("show");

    if (answered < questions.length) {
      result.className = "quiz-result show fail";
      result.textContent = `Answer all ${questions.length} questions — you've answered ${answered}.`;
      return;
    }
    if (correct === questions.length) {
      result.className = "quiz-result show pass";
      result.textContent = `All ${correct} correct. Module ${m.num} complete! ✓`;
      if (!moduleDone(id)) { markDone(id); }
      else { updateProgressUI(); }
    } else {
      result.className = "quiz-result show fail";
      result.textContent = `${correct} of ${questions.length} correct. Review the highlighted answers and try again.`;
    }
  });
}

function viewReference() {
  return `
    <p class="eyebrow">Keep this open while advising</p>
    <h1>Quick reference</h1>

    <h2>Quick routing — who owns the question</h2>
    ${table(["Question", "Primary owner", "Your role"], ROUTING.map(r => r.map(esc)))}

    <h2>Advisor portfolios</h2>
    ${table(["Advisor", "Programs"], PORTFOLIOS.map(r => r.map(esc)))}
    <div class="callout">Unlisted programs are never assigned by analogy. The Department Chair assigns them in writing and the systems are updated before a handoff is complete.</div>

    <h2>Forms quick reference</h2>
    ${table(["If the student needs to…", "Use…", "Send / route to…"], FORMS_REF.map(r => r.map(esc)))}

    <h2>Curriculum snapshot</h2>
    <p style="color:var(--muted);font-size:14px;">Orientation only — use the student's controlling catalog and approved curriculum sheet for an actual audit.</p>
    ${table(["Program", "Advisor", "~Credits", "Watchpoints"], CURRICULA.map(r => r.map(esc)))}

    <h2>Approved upper-level Music courses</h2>
    <div class="grid grid-2">
      <div class="card"><strong>Music History</strong>
        <div class="pill-row" style="margin-top:8px;">${APPROVED_COURSES.history.map(c => `<span class="pill">${c}</span>`).join("")}</div>
      </div>
      <div class="card"><strong>Music Theory</strong>
        <div class="pill-row" style="margin-top:8px;">${APPROVED_COURSES.theory.map(c => `<span class="pill">${c}</span>`).join("")}</div>
      </div>
    </div>

    <h2>Graduation deadlines (verify the current form)</h2>
    ${table(["Graduation term", "Intent to Graduate deadline"], [["May", "October 1"], ["August", "February 1"], ["December", "March 1"]])}`;
}

function viewTemplates() {
  const cats = [...new Set(TEMPLATES.map(t => t.category))];
  return `
    <p class="eyebrow">Gmail Template Library · T01–T56</p>
    <h1>Email templates</h1>
    <p class="lead">Working URI Music advising emails. Replace the [bracketed] text for the student or case.
    T01–T46 are student-facing; T47–T56 are internal. Click a template to expand and copy.</p>
    <div class="search-bar">
      <input type="text" id="tmplSearch" placeholder="Search by number, title, or text…" aria-label="Search templates">
      <select id="tmplCat" aria-label="Filter by category">
        <option value="">All categories</option>
        ${cats.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join("")}
      </select>
    </div>
    <div id="tmplList"></div>`;
}

function renderTemplateList() {
  const q = ($("#tmplSearch")?.value || "").toLowerCase().trim();
  const cat = $("#tmplCat")?.value || "";
  const list = $("#tmplList");
  const filtered = TEMPLATES.filter(t => {
    if (cat && t.category !== cat) return false;
    if (!q) return true;
    return (t.id + " " + t.title + " " + t.body + " " + t.category).toLowerCase().includes(q);
  });
  if (!filtered.length) {
    list.innerHTML = `<p style="color:var(--muted);">No templates match "${esc(q)}".</p>`;
    return;
  }
  list.innerHTML = filtered.map(t => `
    <div class="tmpl" data-id="${t.id}">
      <div class="tmpl-head">
        <span class="tmpl-id ${t.internal ? "internal" : ""}">${t.id}</span>
        <span class="tmpl-title">${esc(t.title)}${t.internal ? ' <span class="tmpl-cat">· internal</span>' : ""}</span>
        <span class="tmpl-cat">${esc(t.category)}</span>
        <span class="tmpl-toggle">+</span>
      </div>
      <div class="tmpl-body">
        <pre>${esc(t.body)}</pre>
        <button class="btn secondary copyBtn" data-id="${t.id}">Copy to clipboard</button>
      </div>
    </div>`).join("");

  list.querySelectorAll(".tmpl-head").forEach(h => {
    h.addEventListener("click", () => h.parentElement.classList.toggle("open"));
  });
  list.querySelectorAll(".copyBtn").forEach(b => {
    b.addEventListener("click", e => {
      e.stopPropagation();
      const t = TEMPLATES.find(x => x.id === b.dataset.id);
      copyText(t.body, `${t.id} copied`);
    });
  });
}

function copyText(text, msg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => toast(msg)).catch(() => fallbackCopy(text, msg));
  } else {
    fallbackCopy(text, msg);
  }
}
function fallbackCopy(text, msg) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); toast(msg); } catch (e) { toast("Copy failed — select manually"); }
  document.body.removeChild(ta);
}

/* ---------- calendar helpers ---------- */
function today() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function parseISO(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function fmtDate(iso) {
  const d = parseISO(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function fmtRange(item) {
  if (!item.end) return fmtDate(item.date);
  const a = parseISO(item.date), b = parseISO(item.end);
  const opts = { month: "short", day: "numeric" };
  const sameMonth = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  const start = a.toLocaleDateString("en-US", opts);
  const end = (sameMonth ? b.getDate() : b.toLocaleDateString("en-US", opts)) + ", " + b.getFullYear();
  return start + "–" + end;
}
// effective end date (for past/upcoming comparison)
function effEnd(item) { return parseISO(item.end || item.date); }

// Upcoming items: those whose end date is today or later, sorted by start.
function upcomingItems() {
  const t = today();
  return CALENDAR
    .filter(i => effEnd(i) >= t)
    .sort((a, b) => parseISO(a.date) - parseISO(b.date));
}

const KIND_LABEL = { reg: "Registration", deadline: "Deadline", grad: "Graduation", holiday: "Closure", term: "Term" };

/* ---------- banner ---------- */
const BANNER_KEY = "uri-music-advising-banner-dismissed-v1";

function buildBanner() {
  const banner = document.getElementById("banner");
  const upcoming = upcomingItems();
  // dates within the next 45 days get called out
  const t = today();
  const soon = upcoming.filter(i => {
    const days = (parseISO(i.date) - t) / 86400000;
    return days <= 45;
  }).slice(0, 3);

  const list = (soon.length ? soon : upcoming.slice(0, 2));
  if (!list.length) { banner.hidden = true; return; }

  // dismissal is keyed to the first upcoming item's date, so a NEW
  // upcoming date re-shows the banner even after a prior dismissal.
  const sig = list.map(i => i.date + i.label).join("|");
  if (localStorage.getItem(BANNER_KEY) === sig) { banner.hidden = true; return; }
  banner._sig = sig;

  const parts = list.map(i => `<strong>${esc(fmtRange(i))}</strong> — ${esc(i.label)}`);
  document.getElementById("bannerText").innerHTML =
    `Dear advisors: keep these upcoming dates in mind — ` + parts.join(" · ") + `.`;
  banner.hidden = false;
}

function viewCalendar() {
  const t = today();
  const sorted = [...CALENDAR].sort((a, b) => parseISO(a.date) - parseISO(b.date));
  const upcoming = upcomingItems();
  const nextDate = upcoming.length ? upcoming[0].date : null;

  // group by term, preserving chronological order of terms as they appear
  const order = [];
  const groups = {};
  sorted.forEach(i => {
    if (!groups[i.term]) { groups[i.term] = []; order.push(i.term); }
    groups[i.term].push(i);
  });

  const rowHtml = i => {
    const past = effEnd(i) < t;
    const isNext = i.date === nextDate && !past;
    return `<div class="cal-item ${past ? "past" : ""} ${isNext ? "next" : ""}">
      <span class="cal-date">${esc(fmtRange(i))}</span>
      <span class="cal-label">${esc(i.label)}${isNext ? '<span class="next-flag">NEXT UP</span>' : ""}</span>
      <span class="cal-tag ${i.kind}">${esc(KIND_LABEL[i.kind] || i.kind)}</span>
    </div>`;
  };

  return `
    <p class="eyebrow">Academic calendar &amp; registration deadlines</p>
    <h1>Academic calendar</h1>
    <p class="lead">Key advising, registration, and graduation dates for 2026–2027. Dates are shaded out once they pass,
    and the next upcoming item is flagged.</p>

    <div class="callout warn"><strong>Always verify before advising a deadline.</strong> ${esc(CALENDAR_UPDATED)}
    Dates change — confirm against the <a href="${CALENDAR_SOURCE}" target="_blank" rel="noopener">official URI Enrollment Services calendar</a>
    and the current College forms. Enrollment Services posts exact deadlines each term.</div>

    ${order.map(term => `
      <h2>${esc(term)}</h2>
      <div class="card cal-group" style="padding:6px 10px;">
        ${groups[term].map(rowHtml).join("")}
      </div>`).join("")}

    <div class="card">
      <p style="margin-bottom:0;"><strong>How staggered registration works.</strong> Enrollment appointments open in stages by earned
      credits — early-registration groups first, then seniors, juniors, sophomores, and freshmen (see the Fall 2026 dates above).
      Spring 2027 windows are set by Enrollment Services closer to that term; confirm each student's exact appointment in
      <strong>e-Campus</strong> rather than quoting a date. Remember advising holds are placed on students below a credit
      threshold and must be cleared through the required advising contact before their window opens.</p>
    </div>`;
}

function viewFiles() {
  return `
    <p class="eyebrow">Advisor Starter Pack</p>
    <h1>Files &amp; forms</h1>
    <p class="lead">The worksheets, forms, and full manuals that back this training. The 2026–2027 program worksheets
    below open right in your browser. The remaining items are a map of the Starter Pack — open those from your file browser.</p>
    <div class="callout warn"><strong>Always verify currency.</strong> Compare any bundled worksheet or form against the live
    official URI pages before use. Use the worksheet matching the student's requirement term — not automatically the newest.</div>

    <h2>2026–2027 program worksheets</h2>
    <p>One worksheet per degree program. Click to open the PDF.</p>
    ${table(["Program", "Advisor", "Worksheet"], WORKSHEETS_2627.map(w => [
      esc(w.prog),
      esc(w.advisor),
      `<a href="${encodeURI(WORKSHEET_DIR + w.file)}" target="_blank" rel="noopener">Open PDF ↗</a>`
    ]))}

    ${FILES.map(g => `
      <h2>${esc(g.group)}</h2>
      <div class="card">
        ${g.items.map(it => `
          <div class="file-row">
            <span class="file-icon">📄</span>
            <span class="file-name">${esc(it.name)}<br><code>${esc(it.path)}</code></span>
          </div>`).join("")}
      </div>`).join("")}`;
}

/* ============================================================
   ROUTER
   ============================================================ */
function render() {
  const hash = location.hash || "#/home";
  const parts = hash.replace(/^#\//, "").split("/");
  const view = $("#view");

  let html, after = null;
  if (parts[0] === "module" && parts[1]) {
    html = viewModule(parts[1]);
    after = () => wireModule(parts[1]);
  } else {
    switch (parts[0]) {
      case "rules": html = viewRules(); break;
      case "calendar": html = viewCalendar(); break;
      case "reference": html = viewReference(); break;
      case "templates": html = viewTemplates(); after = () => {
        $("#tmplSearch").addEventListener("input", renderTemplateList);
        $("#tmplCat").addEventListener("change", renderTemplateList);
        renderTemplateList();
      }; break;
      case "files": html = viewFiles(); break;
      case "home":
      default: html = viewHome(); break;
    }
  }

  view.innerHTML = html;
  if (after) after();
  highlightActive();
  $("#main").scrollIntoView({ block: "start" });
  window.scrollTo(0, 0);
  // close mobile nav on navigation
  $("#sidebar").classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
}

/* ---------- boot ---------- */
function boot() {
  buildModuleNav();
  updateProgressUI();
  buildBanner();

  const bannerClose = document.getElementById("bannerClose");
  if (bannerClose) {
    bannerClose.addEventListener("click", () => {
      const banner = document.getElementById("banner");
      if (banner._sig) localStorage.setItem(BANNER_KEY, banner._sig);
      banner.hidden = true;
    });
  }

  window.addEventListener("hashchange", render);
  render();

  $("#menuToggle").addEventListener("click", () => {
    const open = $("#sidebar").classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded", open ? "true" : "false");
  });

  $("#resetProgress").addEventListener("click", () => {
    if (confirm("Reset all training progress in this browser?")) {
      progress = { done: {} };
      saveProgress(progress);
      updateProgressUI();
      toast("Progress reset");
      if ((location.hash || "").startsWith("#/module")) render();
    }
  });
}

document.addEventListener("DOMContentLoaded", boot);
