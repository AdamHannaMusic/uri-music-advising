/* ============================================================
   URI Music Advising — New Advisor Training
   Content data. Grounded in the URI Music Advising Procedures
   and Training Manual (role-based edition, Oct 2026) and the
   Gmail Template Library (T01–T56).
   ============================================================ */

/* ---------- The six rules for safe advising ---------- */
const SIX_RULES = [
  {
    t: "Start with the student's requirement term.",
    d: "Confirm the degree, program, concentration or track, and controlling catalog before giving any course plan. Do not default to the newest worksheet."
  },
  {
    t: "Read both the APR and the transcript.",
    d: "The Academic Requirements Report shows how the system is applying courses; the transcript shows the complete record. Neither works alone."
  },
  {
    t: "Protect the Music sequence first.",
    d: "Applied study, ensembles, convocation, theory and musicianship, history, keyboard/piano proficiency, methods, clinical work, recitals, and internships often depend on order and annual availability."
  },
  {
    t: "Separate advice from authority.",
    d: "An advisor explains and recommends. The Department Chair, UCAS, College, Dean's Office, Enrollment Services, or an instructor may have to approve."
  },
  {
    t: "Do not solve a record problem by guessing.",
    d: "Document the discrepancy, identify the controlling requirement, route the correction, and keep the plan conservative until the answer is in writing."
  },
  {
    t: "Close the loop.",
    d: "Record the decision, owner, due date, and next check. After a form or exception posts, verify that the APR changed as expected."
  }
];

/* ---------- Source-of-truth order ---------- */
const SOURCE_ORDER = [
  "Student's controlling catalog / requirement term and the approved curriculum for that term",
  "Academic Requirements Report (APR) read together with the unofficial transcript",
  "Approved petitions and Curriculum Modification forms",
  "Catalog-year Music Education worksheet (matching the student's requirement term)",
  "Current Schedule of Courses and department course rotation",
  "Prior practice / email precedent — only after confirming it still applies"
];

/* ---------- Reference: who does what (routing) ---------- */
const ROUTING = [
  ["Music degree requirements and semester plan", "Assigned Music advisor", "Review, plan, document, and follow through."],
  ["General Education or College-wide degree rule", "University College advisor or College / Dean's Office", "Identify the issue and coordinate; do not override the College."],
  ["Course capacity, staffing, or offering commitment", "Department Chair or delegated Associate Chair", "Explain the need; do not promise a seat or future offering."],
  ["Applied level, jury, recital, or disciplinary milestone", "Applied faculty or program head", "Integrate the written milestone decision into the degree plan."],
  ["Substantive Music exception", "UCAS and Department Chair", "Prepare the record, recommend, and track the written outcome."],
  ["Official degree audit, program exception, or College form", "Dean, Associate Dean, or Assistant Dean", "Submit complete documentation and verify processing."],
  ["Registration record or posted transaction", "Enrollment Services / Registration and Records", "Use the current form or workflow; keep proof of submission."]
];

/* ---------- Reference: advisor portfolios ---------- */
const PORTFOLIOS = [
  ["Advisor 1", "B.M. Composition; B.M. Orchestral Instrument; B.M. Jazz Performance; B.M. Vocal Performance; B.M. Piano Performance; B.A. Music History; B.A. Music; B.A. Jazz"],
  ["Advisor 2", "B.M. Music Therapy and all Music minors"],
  ["Advisor 3", "B.M. Music Education"]
];

/* ---------- Reference: forms quick reference ---------- */
const FORMS_REF = [
  ["Start the graduation audit", "A&S Intent to Graduate + Music supplemental sheet", "CASForms@uri.edu after Music review / signature"],
  ["Change expected graduation term", "A&S Change of Graduation Date", "CASForms@uri.edu"],
  ["Add / drop / change a major", "A&S Declaration of Major", "Advisor signature, then CASForms@uri.edu"],
  ["Declare a Music minor", "A&S Minor form + approved minor plan", "Music minor / Chair review, then College / CASForms@uri.edu"],
  ["Modify one major requirement", "A&S Curriculum Modification", "Dept. Chair and Dean / Assistant Dean; CASForms@uri.edu. UCAS first if substantive"],
  ["Petition General Education", "A&S General Education Petition", "Required department / college approvals; CASForms@uri.edu"],
  ["Reevaluate external credit", "A&S Transfer Credit Reevaluation", "Department evaluator / Chair, then CASForms@uri.edu"],
  ["Take external work", "Prior Approval for Off-Campus Study", "Equivalent-course department, then academic dean; official transcript after"],
  ["Request a Music exception", "Appropriate Music UCAS petition", "Advisor → current UCAS intake → Dept. Chair → written outcome"],
  ["Count eligible zero-credit ensemble", "Music Zero Credit petition", "Advisor → UCAS → Dept. Chair; College coding if needed"],
  ["Perform an extra recital", "Music Recital petition", "Applied support → advisor → UCAS → Dept. Chair"],
  ["Plan a required recital", "Music Recital Worksheet", "Music administrative assistant after student / applied-instructor completion"],
  ["Arrange independent study", "Music Independent Study approval", "Project advisor → Dept. Chair in prior semester → Music office"],
  ["Add / drop / change credits late", "Registration Add/Drop Appeal", "Instructor → student's academic dean → Enrollment Services if approved"],
  ["Change catalog year", "Current online requirement-term workflow", "Advisor(s) and academic dean; both colleges if applicable"]
];

/* ---------- Reference: curriculum snapshot ---------- */
const CURRICULA = [
  ["B.M. Composition", "Advisor 1", "~120 cr", "Composition sequence; recital timeline; applied/ensemble semesters; piano proficiency; annual offerings"],
  ["B.M. Orchestral Instrument", "Advisor 1", "~120–124 cr", "Applied level; juries; major/chamber ensemble; convocation; recital; correct instrument & studio section"],
  ["B.M. Jazz Performance", "Advisor 1", "~120 cr", "Jazz sequence & ensemble placement; applied level; juries; recital; track-specific credits"],
  ["B.M. Vocal Performance", "Advisor 1", "~120 cr", "Language sequence; applied level; ensemble/convocation; recital; diction / track requirements"],
  ["B.M. Piano Performance", "Advisor 1", "~120 cr", "Applied piano; accompanying/chamber; recital; correct variable-credit registration"],
  ["B.M. Music Therapy", "Advisor 2", "~139 cr (5-yr)", "Clinical sequence; prerequisite gates; internship timing; certification/licensure pathway"],
  ["B.M. Music Education", "Advisor 3", "~120 cr", "Admission/progression rules; piano proficiency & gates before internship; methods sequence; licensure steps"],
  ["B.A. Music", "Advisor 1", "~120 cr", "42 cr at 300+ for the B.A.; Music core; applied/ensemble/convocation; ≥30 non-Music credits; double-major integration"],
  ["B.A. Music History", "Advisor 1", "~120 cr", "History sequence; research/writing; language; 42 upper-level cr; applied/ensemble/convocation"],
  ["B.A. Jazz", "Advisor 1", "~120 cr", "Jazz sequence; six applied semesters; ensemble & convocation; junior recital; 42 upper-level cr"],
  ["Music minors", "Advisor 2", "18–21 cr", "Jazz Studies, Music, Music Performance, Individual Music Study, Voice Performance for Theatre; audition may be required"]
];

/* ---------- Reference: approved upper-level courses ---------- */
const APPROVED_COURSES = {
  history: ["MUS 301", "MUS 407", "MUS 408", "MUS 422", "MUS 423", "MUS 426", "MUS 427"],
  theory: ["MUS 318G", "MUS 324", "MUS 416", "MUS 417", "MUS 420", "MUS 424", "MUS 516", "MUS 517"]
};

/* ---------- Academic calendar 2026-2027 ----------
   Source: URI Enrollment Services official 2026-27 academic calendar
   (web.uri.edu/academic-calendars/2026-27). Dates change — always
   confirm against the live calendar before advising a deadline.
   date = ISO yyyy-mm-dd (first day for ranges); end = optional range end.
   kind: 'reg' registration/advising, 'deadline' drop/add deadlines,
         'grad' graduation, 'holiday' closures, 'term' term markers. */
const CALENDAR_SOURCE = "https://web.uri.edu/academic-calendars/2026-27";
const CALENDAR_UPDATED = "Reflects the official 2026-27 calendar as of Nov 2026.";

const CALENDAR = [
  // Fall 2026 (winding down)
  { date: "2026-11-11", term: "Fall 2026", kind: "holiday", label: "Veteran's Day — classes do not meet, offices closed" },
  { date: "2026-11-16", term: "Fall 2026", kind: "term", label: "Veteran's Day make-up day — Wednesday classes meet" },
  { date: "2026-11-25", end: "2026-11-29", term: "Fall 2026", kind: "holiday", label: "Thanksgiving Recess — classes do not meet" },
  { date: "2026-12-14", term: "Fall 2026", kind: "term", label: "Last day of classes (late add/drop & credit-change forms not accepted after this day)" },
  { date: "2026-12-15", term: "Fall 2026", kind: "term", label: "Reading day" },
  { date: "2026-12-16", end: "2026-12-22", term: "Fall 2026", kind: "term", label: "Final examinations (Dec 16–18, 21–22)" },
  { date: "2026-12-28", term: "Fall 2026", kind: "grad", label: "Fall final grades due in e-Campus by 12:00 PM" },
  { date: "2026-12-31", term: "Fall 2026", kind: "grad", label: "December degree conferral" },

  // Winter J-Term 2027
  { date: "2026-10-06", term: "J-Term 2027", kind: "reg", label: "Winter J-Term pre-registration begins" },
  { date: "2027-01-04", term: "J-Term 2027", kind: "term", label: "J-Term classes begin (also last day to add / drop with 100% refund)" },
  { date: "2027-01-22", term: "J-Term 2027", kind: "term", label: "J-Term last day of classes" },

  // Spring 2027
  { date: "2027-01-25", term: "Spring 2027", kind: "reg", label: "Advising Day (last day to drop with 100% refund)" },
  { date: "2027-01-26", term: "Spring 2027", kind: "term", label: "Spring classes begin" },
  { date: "2027-01-26", end: "2027-02-01", term: "Spring 2027", kind: "deadline", label: "e-Campus Open Add Period" },
  { date: "2027-02-02", end: "2027-02-08", term: "Spring 2027", kind: "deadline", label: "e-Campus Permission Number Late Add Period (permission number required)" },
  { date: "2027-02-08", term: "Spring 2027", kind: "deadline", label: "Last day to add Pass/Fail option" },
  { date: "2027-02-17", term: "Spring 2027", kind: "deadline", label: "Courses dropped on/after this date receive a \"W\" on the transcript" },
  { date: "2027-03-09", term: "Spring 2027", kind: "deadline", label: "Last day to drop in e-Campus (late drop form required after this date)" },
  { date: "2027-03-17", term: "Spring 2027", kind: "term", label: "Mid-semester; last day to change from Pass/Fail option" },
  { date: "2027-03-22", end: "2027-03-28", term: "Spring 2027", kind: "holiday", label: "Spring Break — classes do not meet" },
  { date: "2027-05-03", term: "Spring 2027", kind: "term", label: "Spring last day of classes" },
  { date: "2027-05-21", end: "2027-05-23", term: "Spring 2027", kind: "grad", label: "Commencement ceremonies" },

  // Graduation / ITG deadlines (College of Arts & Sciences — verify current form)
  { date: "2027-02-01", term: "Graduation", kind: "grad", label: "Intent to Graduate deadline for August graduates (verify current form)" },
  { date: "2027-03-01", term: "Graduation", kind: "grad", label: "Intent to Graduate deadline for December graduates (verify current form)" },
  { date: "2026-10-01", term: "Graduation", kind: "grad", label: "Intent to Graduate deadline for May graduates (verify current form)" }
];

/* Staggered class-standing registration windows for spring are set by
   Enrollment Services close to the term and are NOT yet published on the
   official 2026-27 calendar page. Shown as TBA so no one invents a date. */
const REG_WINDOWS_NOTE = [
  "Early registration (Combat Veterans / DAI, then Honors / NCAA / Club Sports)",
  "Seniors (90+ credits) begin",
  "Juniors (60–89 credits) begin",
  "Sophomores (30–59 credits) begin",
  "Freshmen (0–29 credits) begin"
];

/* ---------- Current 2026-2027 program worksheets (PDF) ----------
   These live in worksheets/2026-2027/ inside the app so they travel
   with the deployed site. Match the worksheet to the student's
   requirement term — do not automatically use the newest. */
const WORKSHEETS_2627 = [
  { prog: "B.M. Classical Guitar", advisor: "Advisor 1", file: "Music Classical Guitar BOM 2026.pdf" },
  { prog: "B.M. Composition", advisor: "Advisor 1", file: "Music Composition BOM 2026.pdf" },
  { prog: "B.M. Music Education", advisor: "Advisor 3", file: "Music Education BOM 2026.pdf" },
  { prog: "B.M. Jazz Performance", advisor: "Advisor 1", file: "Music Jazz Performance BOM 2026.pdf" },
  { prog: "B.M. Orchestral Performance", advisor: "Advisor 1", file: "Music Orchestral Performance BOM 2026.pdf" },
  { prog: "B.M. Piano Performance", advisor: "Advisor 1", file: "Music Piano Performance BOM 2026.pdf" },
  { prog: "B.M. Music Therapy", advisor: "Advisor 2", file: "Music Therapy BOM 2026.pdf" },
  { prog: "B.M. Voice Performance", advisor: "Advisor 1", file: "Music Voice Performance BOM 2026.pdf" },
  { prog: "B.A. Music History and Literature", advisor: "Advisor 1", file: "Music- History and Lit BA 2026.pdf" },
  { prog: "B.A. Jazz Studies", advisor: "Advisor 1", file: "Music-Jazz Studies BA 2026.pdf" },
  { prog: "B.A. Music (Music Option)", advisor: "Advisor 1", file: "Music-Music Option BA 2026.pdf" }
];
const WORKSHEET_DIR = "worksheets/2026-2027/";

/* ---------- Files in the Starter Pack ---------- */
const FILES = [
  { group: "00 — Start here", items: [
    { name: "Quick Start Reference (PDF / DOCX)", path: "Advisor Starter Pack - Ready to Share/00 - START HERE/" },
    { name: "README - Start Here.txt", path: "Advisor Starter Pack - Ready to Share/00 - START HERE/README - Start Here.txt" }
  ]},
  { group: "01 — Starter Pack Music Education maps (.xlsx)", items: [
    { name: "Curriculum Map — Music Education w/ Residency", path: "Advisor Starter Pack - Ready to Share/01 - Current 2026-2027 Worksheets/" },
    { name: "TRANSFER STUDENT Curriculum Map — Music Ed w/ Residency", path: "Advisor Starter Pack - Ready to Share/01 - Current 2026-2027 Worksheets/" }
  ]},
  { group: "02 — Prior catalog-year worksheets", items: [
    { name: "2021-2022 through 2025-2026 Music Education maps", path: "Advisor Starter Pack - Ready to Share/02 - Prior Catalog-Year Worksheets/" },
    { name: "ANNOTATED 2024-2025 map (reference aid only)", path: "Advisor Starter Pack - Ready to Share/02 - Prior Catalog-Year Worksheets/" }
  ]},
  { group: "03 — Forms and petitions", items: [
    { name: "Arts & Sciences forms (Declaration of Major, Minor, Gen Ed Petition, etc.)", path: "Advisor Starter Pack - Ready to Share/03 - Forms and Petitions/Arts and Sciences Forms/" },
    { name: "Music Department forms (Independent Study, Recital, UCAS petitions)", path: "Advisor Starter Pack - Ready to Share/03 - Forms and Petitions/Music Department Forms/" }
  ]},
  { group: "04 — Graduation audit resources", items: [
    { name: "A&S Intent to Graduate + instructions", path: "Advisor Starter Pack - Ready to Share/04 - Graduation Audit Resources/" },
    { name: "Music ITG Supplemental Sheet", path: "Advisor Starter Pack - Ready to Share/04 - Graduation Audit Resources/" },
    { name: "Graduation Audit Letter Template (.docx)", path: "Advisor Starter Pack - Ready to Share/04 - Graduation Audit Resources/" }
  ]},
  { group: "05 — UCAS & curriculum precedent", items: [
    { name: "Pro Forma UCAS Decisions (verify URI 119/MUS 119 labeling before filing)", path: "Advisor Starter Pack - Ready to Share/05 - UCAS and Curriculum Precedent/" }
  ]},
  { group: "Full manuals (parent folder)", items: [
    { name: "URI Music Advising Procedures and Training Manual (PDF / DOCX)", path: "URI_Music_Advising_Procedures_and_Training_Manual.pdf" },
    { name: "Gmail Template Library T01–T56 (DOCX)", path: "URI Music Advising – Gmail Template Library (T01–T56).docx" }
  ]}
];

/* ============================================================
   TRAINING MODULES
   ============================================================ */
const MODULES = [
  {
    id: "m1",
    num: 1,
    title: "Authority, sources, and privacy",
    summary: "Where advising authority comes from, how to resolve conflicting sources, and the FERPA line you never cross.",
    sections: [
      { h: "Three kinds of guidance", html: `
        <p>Everything you rely on falls into one of three buckets. Know which one you are holding.</p>
        <ul class="clean">
          <li><strong>Official rule</strong> — University Manual, controlling catalog, academic calendar, approved curriculum, or written office instruction. <em>Follow it.</em> If two official sources conflict, ask the office that owns the rule for written direction.</li>
          <li><strong>Department procedure</strong> — an adopted, current workflow. Follow it unless a controlling rule or written decision says otherwise.</li>
          <li><strong>Department precedent</strong> — a repeated approach from prior cases or email history. Use it to frame the question, not to create authority. Confirm it still applies before relying on it.</li>
        </ul>` },
      { h: "The source-of-truth order", html: `
        <p>When you need to know what is true for a student, work down this list in order. A lower source never overrides a higher one.</p>
        <ol class="clean" id="sourceOrderList"></ol>
        <div class="callout"><strong>Advise, don't guess.</strong> If sources disagree, write the question in one sentence, capture the student's exact degree / program / track / requirement term, save the controlling language, and send it to the role with authority to decide. Tell the student what is confirmed, what is pending, and when the next update comes.</div>` },
      { h: "FERPA and data minimization", html: `
        <p>Use the minimum student information needed to do the task. An advising note should make the academic work understandable to another authorized advisor without becoming a copy of the student's private life.</p>
        <ul class="clean">
          <li><strong>Appropriate:</strong> program, requirement term, courses reviewed, academic finding, decision, referral, owner, deadline.</li>
          <li><strong>Usually unnecessary:</strong> home address, personal phone, personal email, full student identifier, unrelated grades, diagnoses, family details, pasted medical documents.</li>
          <li><strong>Screenshots:</strong> only when needed, stored in an approved location, with identifying detail removed from training materials.</li>
          <li><strong>Access is role-based.</strong> Never use another person's credentials. Passwords, recovery codes, and private links never belong in a shared folder.</li>
        </ul>` }
    ],
    quiz: [
      {
        q: "A 2019 email thread shows an exception that was granted to a former student. A current student asks for the same thing. What is the correct read?",
        options: [
          "The email is precedent — grant it the same way.",
          "Use the email to frame the question, but confirm the controlling rule and route for a current written decision.",
          "Ignore the email entirely; old cases are irrelevant.",
          "Forward the old approval to the Dean as proof."
        ],
        answer: 1,
        explain: "Precedent frames the question; it does not create authority. Confirm the current controlling source and get a written decision before relying on it."
      },
      {
        q: "Which item does NOT belong in a Starfish advising note?",
        options: [
          "The student's requirement term",
          "The courses reviewed and the academic finding",
          "The student's medical diagnosis and home address",
          "The owner and deadline for the next step"
        ],
        answer: 2,
        explain: "Data minimization: record the academic work, not the student's private life. Diagnoses and personal contact details are unnecessary."
      },
      {
        q: "The APR and the printed worksheet disagree about a requirement. What do you do?",
        options: [
          "Trust the newest worksheet since it's most recent.",
          "Trust the APR because the system is authoritative.",
          "Stop and verify against the controlling catalog / approved curriculum before advising.",
          "Average the two and advise the middle path."
        ],
        answer: 2,
        explain: "When a worksheet conflicts with the catalog, APR, or approved curriculum, stop and verify. The controlling requirement term governs."
      }
    ]
  },
  {
    id: "m2",
    num: 2,
    title: "Reading the student record",
    summary: "Transcript vs. APR, the What-If report, and the holds you may (and may not) release.",
    sections: [
      { h: "Transcript and APR together", html: `
        <p>Never use one alone. The <strong>transcript</strong> shows the complete record — every attempt, grade, repeat, incomplete, transfer posting, and earned-credit total. The <strong>Academic Requirements Report (APR)</strong> shows how the system is <em>applying</em> those courses to the degree.</p>
        <p>Current e-Campus path for the transcript: <code>Self Service → Advisor Center → My Advisees → View Student Details → Transcript: View Unofficial → double-arrow control</code>.</p>
        <p>Current path for the APR: <code>Self Service → Advisor Center → My Advisees → Academic Requirements → double-arrow control</code>. Screens change — use the current Registration and Records instructions if labels differ.</p>
        <div class="callout warn"><strong>Two traps:</strong> (1) A transfer course posting as credit does <em>not</em> mean it satisfies a specific Music requirement. (2) An in-progress course may temporarily satisfy an APR area — verify completion before certifying anything.</div>` },
      { h: "What-If before you recommend a change", html: `
        <p>Run a <strong>What-If Report</strong> before recommending any change of degree, major, concentration, or catalog year. Confirm career, college, degree, major, track/concentration, and requirement term before reading any report.</p>
        <ul class="clean">
          <li>Expand unsatisfied sections and inspect which course the system actually used.</li>
          <li>Minors may not appear in the APR — review the transcript separately and keep a current signed minor plan.</li>
          <li>A double-major report may display Gen Ed more than once even though it's completed once. Confirm with the College rather than assuming an error.</li>
        </ul>` },
      { h: "Holds", html: `
        <p>Release only an advising hold that is within your authorized role, and only after the required advising contact is complete. <strong>Do not remove another office's hold.</strong> Send the student to the office that placed it.</p>` }
    ],
    quiz: [
      {
        q: "A transfer course shows posted credit on the transcript. The student says it covers MUS theory. How do you treat it?",
        options: [
          "Posted credit = requirement satisfied. Clear it.",
          "Posted credit is not equivalency — route a Transfer Credit Reevaluation and plan as if the requirement is still open.",
          "Tell the student to retake the URI course immediately.",
          "Ignore it since transfer credit never counts for Music."
        ],
        answer: 1,
        explain: "Credit acceptance, course equivalency, and degree applicability are three separate decisions. Posting credit does not establish equivalency."
      },
      {
        q: "You want to recommend a catalog-year change. What should you run first?",
        options: ["A fresh transcript only", "A What-If report", "Nothing — just submit the form", "The graduation audit letter"],
        answer: 1,
        explain: "Run a What-If before recommending a change of degree, major, concentration, or catalog year so you can see the resulting audit."
      },
      {
        q: "A hold placed by Student Financial Services is blocking registration. What is your move?",
        options: [
          "Release it yourself from Advisor Center.",
          "You can't release another office's hold — direct the student to the office that placed it.",
          "Override it with a permission number.",
          "File a Curriculum Modification."
        ],
        answer: 1,
        explain: "Only release advising holds within your authorized role. Other offices own their own holds."
      }
    ]
  },
  {
    id: "m3",
    num: 3,
    title: "Building a Music schedule",
    summary: "The ten-step planning order that protects sequences, gates, and once-a-year offerings.",
    sections: [
      { h: "Plan in this order", html: `
        <ol class="clean">
          <li><strong>Confirm the correct curriculum</strong> — start with the controlling requirement term, not the newest web page.</li>
          <li><strong>Place gates and once-per-year courses</strong> — prerequisites, alternate-year offerings, proficiency gates, auditions, methods, clinical work, student teaching/internship, recital timing.</li>
          <li><strong>Place the Music sequence</strong> — theory, musicianship, history, applied study, ensemble, convocation, keyboard/piano, conducting/methods, program milestones.</li>
          <li><strong>Check the actual Schedule of Courses</strong> — a program sheet shows what's required, not when it's offered.</li>
          <li><strong>Add the rest</strong> — Gen Ed, language, professional education, supporting study, second major, minor, electives.</li>
          <li><strong>Check constraints</strong> — prerequisites, co-reqs, section restrictions, permissions, time conflicts, variable credits, total load.</li>
          <li><strong>Test graduation math</strong> — total credits, residency, major residency, upper-level credits, GPA, remaining terms.</li>
          <li><strong>Build an alternative</strong> — label any course that depends on audition, permission, petition, capacity, transfer review, or a future offering.</li>
          <li><strong>Project one term ahead</strong> — so the student doesn't create a future sequence conflict.</li>
          <li><strong>Document</strong> — the plan and every unresolved item, each with an owner and due date.</li>
        </ol>` },
      { h: "Music-specific load check", html: `
        <p>Count contact hours and rehearsal/performance demands, not only credits. A low-credit schedule can still be a heavy week.</p>
        <ul class="clean">
          <li>Keep applied study, required ensembles, and convocation in the same review.</li>
          <li>Confirm the correct applied/ensemble section, instructor, and credit amount before calling registration complete.</li>
          <li>Put recital prep, jury deadlines, clinical work, field placements, and portfolio work on the student's calendar.</li>
          <li><strong>Do not add piano or any course just to fix a display mismatch</strong> — first verify whether the controlling curriculum actually requires the course, a proficiency, or a record correction.</li>
        </ul>` }
    ],
    quiz: [
      {
        q: "A required methods course is only offered in the fall and the student wants to defer it. What should you do first?",
        options: [
          "Defer it — one semester won't matter.",
          "Treat it as a gate: place once-per-year and sequenced courses before flexible requirements.",
          "Replace it with an elective.",
          "Tell the student to petition UCAS."
        ],
        answer: 1,
        explain: "Gates and once-per-year courses are placed early (step 2). Deferring an annual course can break the whole downstream sequence."
      },
      {
        q: "The APR shows a red line on a piano requirement. The fastest fix is to...",
        options: [
          "Add a piano course so the red line disappears.",
          "First verify whether the curriculum requires the course, a proficiency, or just a record correction.",
          "File a zero-credit petition.",
          "Tell the student to retake the proficiency exam."
        ],
        answer: 1,
        explain: "Never add a course solely to clear a display mismatch. Verify what the controlling curriculum actually requires first."
      },
      {
        q: "Why project at least one term beyond the registration term?",
        options: [
          "To fill the student's whole degree plan now.",
          "So the student doesn't create a future sequence conflict.",
          "Because the APR requires it.",
          "To lock in future course offerings."
        ],
        answer: 1,
        explain: "Projecting ahead prevents a next-term choice from blocking a sequenced or once-a-year course later."
      }
    ]
  },
  {
    id: "m4",
    num: 4,
    title: "Registration, holds, and permission numbers",
    summary: "Triage registration errors, issue only Music permissions you're authorized for, and know the deadline rules.",
    sections: [
      { h: "Registration triage", html: `
        <ul class="clean">
          <li>Read the exact error and record the course, section, credits, and term.</li>
          <li>Check holds, appointment time, prerequisites, co-reqs, repeat status, section restrictions, capacity, time conflict, and variable-credit settings.</li>
          <li>Identify who owns the barrier: advisor, instructor, department, College, or Enrollment Services.</li>
          <li>Use the least exceptional valid path. A permission number does not replace a petition or appeal that policy requires.</li>
        </ul>` },
      { h: "Permission-number standard", html: `
        <p>Issue only <strong>Music</strong> permissions that fall within written authorization. Never issue permission for another subject on that department's behalf.</p>
        <p>Path: <code>Records and Enrollment → Term Processing → Class Permissions → Class Permissions</code>. Confirm institution, term, course, section, and expiration. Generate the code, save, record it using the approved method, and treat it as a one-time credential.</p>
        <div class="callout warn"><strong>A generated code is not enrollment.</strong> Tell the student to register promptly and confirm the completed transaction themselves.</div>` },
      { h: "Deadline and appeal rule", html: `
        <ul class="clean">
          <li><strong>Before the deadline:</strong> use the current registration mechanism, approval, or permission that fits the error.</li>
          <li><strong>After the deadline:</strong> a permission number alone is not enough — use the current Add/Drop Appeal process (instructor + academic-dean review, Enrollment Services processing).</li>
          <li><strong>While an appeal is pending:</strong> never tell the student approval is guaranteed. Follow the form's instruction about attendance and deadlines.</li>
        </ul>` }
    ],
    quiz: [
      {
        q: "A student emails that eCampus won't let them add a course. Your first response should ask for...",
        options: [
          "Their home address and phone number.",
          "The exact course/section and the exact error text or screenshot, plus any active holds.",
          "A completed Curriculum Modification.",
          "Nothing — just issue a permission number."
        ],
        answer: 1,
        explain: "Triage starts with the exact error, course/section, and holds so you can route the real cause instead of guessing (see template T11)."
      },
      {
        q: "The add deadline passed. A student needs a course added. A permission number will...",
        options: [
          "Solve it instantly.",
          "Not be enough on its own — this now needs the Add/Drop Appeal process.",
          "Be issued by Enrollment Services only.",
          "Require a UCAS petition."
        ],
        answer: 1,
        explain: "After the standard deadline, a permission number alone won't work. Use the Add/Drop Appeal with instructor and dean review."
      },
      {
        q: "A colleague asks you to issue a permission number for a THEATRE course. You should...",
        options: [
          "Issue it to be helpful.",
          "Decline — issue only Music permissions within your written authorization.",
          "Issue it but note it in Starfish.",
          "Ask the Dean to issue it."
        ],
        answer: 1,
        explain: "Departments own permissions for their own courses. Never issue permission for another subject."
      }
    ]
  },
  {
    id: "m5",
    num: 5,
    title: "Forms and routing",
    summary: "Which form, in what order, to whom — Arts & Sciences, Music, and Registration & Records.",
    sections: [
      { h: "Universal form standard", html: `
        <ul class="clean">
          <li>Use the <strong>current</strong> form from the official URI page, not an old attachment.</li>
          <li>The student completes and signs student fields — never manufacture a student statement or fill personal identifiers from email history.</li>
          <li>Use the exact degree/program title and exact semesters or requirements affected.</li>
          <li>Attach the controlling requirement and evidence when the reviewer needs it.</li>
          <li>Obtain signatures in the order the current form requires, keep proof of submission, and verify the posted result.</li>
        </ul>` },
      { h: "The routing you'll use most", html: `
        <p>Most Arts & Sciences forms end at <code>CASForms@uri.edu</code>. Music exceptions generally run <strong>Advisor → current UCAS intake → Department Chair → written outcome</strong>, with a College form only if something must be coded in the audit.</p>
        <div class="callout"><strong>Curriculum Modification vs. UCAS.</strong> A CM documents how an <em>already approved</em> requirement is applied — it does not create credit or substitute for UCAS review. A substantive exception goes to UCAS <em>first</em>, then a CM codes the decision.</div>
        <p>See the full <a href="#/reference">Forms quick reference</a> for the one-line answer to "which form, where."</p>` }
    ],
    quiz: [
      {
        q: "A student needs one approved requirement applied differently in the audit — it's already approved, nothing substantive. Which form?",
        options: [
          "A Music UCAS petition.",
          "A Curriculum Modification (one per form), routed through Dept. Chair and Dean / Assistant Dean.",
          "A General Education Petition.",
          "No form — just email Enrollment Services."
        ],
        answer: 1,
        explain: "A CM codes an already-approved decision. Substantive exceptions go to UCAS first; routine coding uses the CM workflow."
      },
      {
        q: "You found the old PDF of the Declaration of Major in the Starter Pack. Can you use it?",
        options: [
          "Yes, the Starter Pack is official.",
          "Compare it against the live official URI forms page first — forms and routing change.",
          "No, never use any PDF.",
          "Only if the student signs it twice."
        ],
        answer: 1,
        explain: "Always compare a bundled copy with the current official page. The Starter Pack explicitly says forms and routing can change."
      },
      {
        q: "Where does a completed Arts & Sciences Intent to Graduate packet go?",
        options: [
          "Directly to the Registrar.",
          "CASForms@uri.edu, after Music review/signature and with the Music supplemental sheet attached.",
          "To UCAS.",
          "To the student's instructor."
        ],
        answer: 1,
        explain: "The ITG packet (with the Music supplemental sheet) is emailed to CASForms@uri.edu after the Music review."
      }
    ]
  },
  {
    id: "m6",
    num: 6,
    title: "Graduation review and Intent to Graduate",
    summary: "The line-by-line audit, the ITG packet workflow, and the stop conditions that pause certification.",
    sections: [
      { h: "Start early", html: `
        <p>Run a complete graduation review <strong>two or three terms before</strong> the expected completion term, and again when the ITG packet is prepared. The current College form lists <strong>Oct 1 for May</strong>, <strong>Feb 1 for August</strong>, and <strong>Mar 1 for December</strong> graduation — verify the current form before advising a deadline.</p>` },
      { h: "Line-by-line audit", html: `
        <p>Read transcript and APR side by side. Open every unsatisfied or in-progress area — an in-progress course is not a completed requirement. Verify:</p>
        <ul class="clean">
          <li>Degree, all majors, track/concentration, minors, requirement term, graduation term, and legal/record name.</li>
          <li>Total degree credits, cumulative and major GPA, University and major residency, any B.A. upper-level requirement.</li>
          <li>Gen Ed and catalog-specific University requirements.</li>
          <li>Every Music category and semester count: theory/musicianship, history, applied, ensemble, convocation, keyboard/piano, methods/clinical, juries, recitals, portfolio, proficiency, internship/student teaching.</li>
          <li>Every transfer course, repeat, incomplete, substitution, waiver, zero-credit registration, and approved petition — and that approved exceptions are visible in the audit.</li>
        </ul>` },
      { h: "Stop conditions", html: `
        <p>Pause certification and escalate when any of these is unresolved:</p>
        <ul class="clean">
          <li>Wrong or mixed requirement terms, or a missing/incorrect major or degree in the record.</li>
          <li>Unposted transfer work or a generic placeholder needed for a specific requirement.</li>
          <li>An incomplete, repeat, low grade, or duplicate-credit issue affecting completion.</li>
          <li>Missing residency, total-credit, B.A. upper-level, GPA, Gen Ed, or major requirement.</li>
          <li>A petition or exception without a written decision, or an approved exception not reflected in the audit.</li>
          <li>A planned final-term course that is not actually offered, registered, or permitted.</li>
        </ul>` }
    ],
    quiz: [
      {
        q: "When should the first full graduation review happen?",
        options: [
          "The term the student graduates.",
          "Two or three terms before the expected completion term.",
          "Only after the ITG is submitted.",
          "During the student's first year."
        ],
        answer: 1,
        explain: "Start the full review two or three terms out, then review again when the ITG packet is prepared."
      },
      {
        q: "A final-term plan depends on a course that isn't actually on the schedule yet. This is...",
        options: [
          "Fine — it will be offered.",
          "A graduation stop condition — pause certification and resolve it.",
          "A reason to file a zero-credit petition.",
          "Only a problem if the student is a transfer."
        ],
        answer: 1,
        explain: "A planned final-term course that isn't offered, registered, or permitted is an explicit stop condition."
      },
      {
        q: "An in-progress course currently satisfies an APR area. For certification you should...",
        options: [
          "Treat it as complete.",
          "Remember an in-progress course is not a completed requirement — verify completion before certifying.",
          "Remove it from the plan.",
          "Petition to waive it."
        ],
        answer: 1,
        explain: "In-progress is not complete. Monitor final grades and confirm the requirement actually posts."
      }
    ]
  },
  {
    id: "m7",
    num: 7,
    title: "Transfer, double majors, and escalation",
    summary: "Keep the three transfer decisions separate, split double-major work cleanly, and escalate the right cases fast.",
    sections: [
      { h: "Three separate transfer decisions", html: `
        <div class="table-wrap"><table>
          <thead><tr><th>Decision</th><th>Question</th><th>Owner</th></tr></thead>
          <tbody>
            <tr><td>Credit acceptance / posting</td><td>Will URI accept and post the credit?</td><td>University transfer process / College / Enrollment Services</td></tr>
            <tr><td>Course equivalency</td><td>Is it equivalent to a specific URI course?</td><td>Music evaluator / Dept. Chair, using syllabus evidence</td></tr>
            <tr><td>Degree applicability</td><td>How does posted credit satisfy this curriculum?</td><td>Assigned Music advisor, with College coding / exception if needed</td></tr>
          </tbody>
        </table></div>
        <p>If credit posted as generic MUS elective and a specific equivalency is needed, collect the syllabus, description, contact hours, level, and assessment, then route a Transfer Credit Reevaluation. Don't tell a student to repeat a course until the evaluation is settled.</p>` },
      { h: "Double majors vs. two degrees", html: `
        <ul class="clean">
          <li><strong>Double major:</strong> two majors within one bachelor's degree, usually one diploma.</li>
          <li><strong>Two degrees:</strong> different bachelor's degrees, both requirement sets, usually two diplomas.</li>
          <li>Confirm from the official record — never infer from the student's description. Confirm a single controlling requirement term; a student generally may not mix favorable requirements from different catalogs.</li>
          <li>Each advisor validates only their program side; the College confirms the integrated graduation path. Count Gen Ed once even if an audit display repeats it.</li>
        </ul>` },
      { h: "Escalate immediately when", html: `
        <ul class="clean">
          <li>The answer could delay graduation, internship, student teaching, licensure, aid, or visa status.</li>
          <li>Two official sources conflict, or the curriculum approval record can't be found.</li>
          <li>A student is being asked to repeat work because equivalency/audit application is unresolved.</li>
          <li>An action would waive or substitute a requirement without written authority.</li>
          <li>Capacity or staffing affects multiple students, a late action needs an appeal, a record looks like a data error, or you lack the access/authority for the next step.</li>
        </ul>
        <div class="callout"><strong>Escalation memo:</strong> one-sentence question · minimal student context · facts · authority reviewed · requested owner · interim plan · named follow-up + date.</div>` }
    ],
    quiz: [
      {
        q: "Posted MUS elective credit needs to count for a specific requirement. The correct next step is...",
        options: [
          "Tell the student it already counts.",
          "Collect the syllabus/description and route a Transfer Credit Reevaluation; plan as if the requirement is still open.",
          "File a Curriculum Modification immediately.",
          "Have the student retake the URI course."
        ],
        answer: 1,
        explain: "Equivalency is its own decision. Gather course evidence and route a reevaluation before assuming it applies."
      },
      {
        q: "A student describes themselves as 'double majoring.' Before planning you must...",
        options: [
          "Trust the description and plan from two sheets.",
          "Confirm from the official record whether it's a double major or two degrees, and confirm one controlling requirement term.",
          "Assume two degrees to be safe.",
          "Count Gen Ed twice."
        ],
        answer: 1,
        explain: "Never infer the structure from the student's words. Confirm the record and the single controlling requirement term."
      },
      {
        q: "Which situation requires immediate escalation?",
        options: [
          "A student wants to swap two open elective sections.",
          "An unresolved equivalency question is causing a student to be told to repeat a course.",
          "A student asks what convocation is.",
          "A student wants a template emailed to them."
        ],
        answer: 1,
        explain: "Being asked to repeat work because equivalency/audit application is unresolved is an explicit escalate-now trigger."
      }
    ]
  }
];


/* ============================================================
   EMAIL TEMPLATES (T01-T56)
   ============================================================ */
const TEMPLATES = [
  {
    "id": "T01",
    "title": "New advisee welcome / intake",
    "category": "Intake & planning",
    "internal": false,
    "body": "Hi [First name],\n\nWelcome to URI Music. I’m your academic advisor for [program/option].\n\nBefore we build or adjust your schedule, please send me:\n\n• your URI ID\n\n• your current major/option as it appears in eCampus\n\n• any courses you are already registered for\n\n• any holds or eCampus errors you are seeing\n\n• your theory/musicianship placement results, if applicable\n\n• any transfer/AP credits that may affect your plan\n\nIf you are not sure about something, just say that rather than guessing. I can check the record from there.\n\nOnce I have that, I can compare your registration with the current degree requirements and send you a proposed plan.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T02",
    "title": "Advising appointment prep",
    "category": "Intake & planning",
    "internal": false,
    "body": "Hi [First name],\n\nBefore our advising appointment, please send me your current schedule and any courses you are considering for [term]. Also let me know about any holds, registration errors, transfer-credit questions, or degree requirements you are worried about.\n\nI’ll pull your current APR before we meet so we can spend the appointment making decisions rather than trying to reconstruct your record from scratch.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T03",
    "title": "Advising by email / no immediate appointment",
    "category": "Intake & planning",
    "internal": false,
    "body": "Hi [First name],\n\nI’m booked pretty heavily right now, so the fastest way to get this moving is to handle the first part over email rather than wait for an appointment.\n\nPlease send me [current schedule / proposed courses / exact eCampus error / question], and I’ll review it against your APR and degree requirements. If there is still something that really needs a meeting after that, we can schedule one.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T04",
    "title": "Proposed semester schedule for approval",
    "category": "Intake & planning",
    "internal": false,
    "body": "Hi [First name],\n\nI went through your APR and current registration. Here is the schedule I recommend for [term]:\n\n[COURSE LIST]\n\nA few notes:\n\n[NOTES / SEQUENCING / ALTERNATIVES]\n\nPlease look this over and reply confirming that the schedule works for you before I make or recommend any registration changes. If something conflicts with work, another major, an ensemble, or another required course, tell me what the conflict is and I’ll adjust the plan.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T05",
    "title": "Advising Day / registration reminder",
    "category": "Intake & planning",
    "internal": false,
    "body": "Hi [First name],\n\nQuick reminder that Advising Day / registration for [term] is [date]. Please log into eCampus and make sure you know what you still need before your registration window opens.\n\nIf you want me to review your plan by email, send me your proposed courses plus any holds, errors, closed sections, or questions. Please do not wait until the last minute if a required course is involved.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T06",
    "title": "Unregistered student follow-up",
    "category": "Intake & planning",
    "internal": false,
    "body": "Hi [First name],\n\nOur records still show that you are not registered for [term]. If you are continuing at URI, please log into eCampus and complete your registration as soon as possible.\n\nIf something is blocking you, reply with the exact issue: a hold, closed class, permission problem, eCampus error, financial issue, leave/withdrawal plan, or something else. If you are not planning to enroll this term, please let me know that too so we are not chasing the wrong problem.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T07",
    "title": "Route student to correct Music advisor",
    "category": "Intake & planning",
    "internal": false,
    "body": "Hi [First name],\n\nI want to make sure you are working with the right Music advisor for your program.\n\nFor Music Therapy and Music Minors, the advisor is Jonathan Amon: jamon@uri.edu.\n\nFor Music Education, the advisor is Fritz Benz: fbenz@uri.edu.\n\nI advise the Performance BM programs and the Music BA programs.\n\nBased on your current program, [ADVISOR NAME] is the person who should review this with you. I’m copying / directing you there so the advising record stays with the correct advisor.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T08",
    "title": "Change of major / option / minor",
    "category": "Intake & planning",
    "internal": false,
    "body": "Hi [First name],\n\nI reviewed your request to change from [CURRENT PROGRAM] to [NEW PROGRAM/OPTION]. Before the change is submitted, we should make sure you understand what will and will not carry over and whether the change affects your expected graduation timeline.\n\nBased on the current record, the main items to watch are:\n\n[REQUIREMENTS / CREDIT DIFFERENCES / SUBPLAN]\n\nPlease confirm that [NEW PROGRAM/OPTION] is the program you want. Once the change is processed, we should rerun your APR because the official audit can look different from a What-If report.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T09",
    "title": "Double-major or complex degree planning",
    "category": "Intake & planning",
    "internal": false,
    "body": "Hi [First name],\n\nBecause you are combining [PROGRAM 1] with [PROGRAM 2 / MINOR / OTHER PROGRAM], I do not want to plan from one degree sheet in isolation.\n\nPlease send me your current schedule and your intended graduation term. I’ll compare the APRs and look for sequencing, double-counting limits, upper-level requirements, and courses that only apply to one side of the plan.\n\nFor now, please do not drop or add a required course based only on one APR without checking first. A change that helps one program can create a problem in the other.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T10",
    "title": "Summer / J-term planning",
    "category": "Intake & planning",
    "internal": false,
    "body": "Hi [First name],\n\nIf you are considering J Term or Summer coursework, send me the course(s) you are looking at and what requirement you are trying to satisfy.\n\nI’ll check whether the course actually applies to your degree, whether it affects sequencing for the following semester, and whether you are using it to catch up, get ahead, or finish graduation requirements.\n\nPlease confirm the course with me before registering if you are relying on it to satisfy a specific major or Gen Ed requirement.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T11",
    "title": "eCampus registration error",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nThanks for flagging this. Please send me the exact course and section you are trying to add, plus a screenshot or the exact text of the eCampus error.\n\nAlso let me know whether you have any active holds showing in eCampus. Once I can see whether this is a prerequisite, capacity, permission, time-conflict, credit-limit, or system issue, I can route it correctly instead of guessing.\n\nFor now, do not keep changing other parts of your schedule to work around the error unless we have confirmed that is necessary.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T12",
    "title": "Permission number issued",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nI issued a permission number for [COURSE / SECTION]:\n\n[PERMISSION NUMBER]\n\nPlease use it in eCampus as soon as possible. The number does not enroll you automatically, and it may have an expiration date.\n\nOnce you have used it, check your schedule to make sure the course actually appears as enrolled. If eCampus gives you an error, send me the exact message.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T13",
    "title": "Permission / instructor approval pending",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nI have not issued the permission yet because [instructor approval / section confirmation / prerequisite review / department approval] still needs to be resolved first.\n\nI have [contacted the instructor / sent the request / asked the department to confirm]. For now, keep your current schedule in place and do not assume the course is approved until I confirm it in writing.\n\nI’ll follow up once I have an answer.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T14",
    "title": "Closed or over-capacity course",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\n[COURSE / SECTION] is currently closed / over capacity, so I do not want you to drop another required course assuming this seat will open.\n\nYour options are:\n\n[ALTERNATE SECTION / WAIT FOR INSTRUCTOR / SUBSTITUTE COURSE / OTHER]\n\nBecause this course is [required / sequenced / needed for graduation], I’m also checking whether there is an enrollment solution on the department side.\n\nFor now, keep your current registration and I’ll update you when I know what is actually possible.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T15",
    "title": "Section reshuffle / schedule domino effect",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nThere may be a small schedule reshuffle involving [COURSES / SECTIONS] because of enrollment or room capacity.\n\nThe basic idea is that moving one course creates room for the next move, so the changes have to work together. The possible version for you is:\n\n[COURSE A: CURRENT → PROPOSED]\n\n[COURSE B: CURRENT → PROPOSED]\n\n[COURSE C: CURRENT → PROPOSED]\n\nPlease do not change anything yourself yet. First confirm that the proposed times work for you. I’ll let you know if the department actually needs the move to happen.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T16",
    "title": "Time conflict / alternate section",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nThe issue here is a direct time conflict between [COURSE A] and [COURSE B]. Since [REASON ONE COURSE HAS PRIORITY], I would keep [COURSE] in place and solve around it rather than dropping it.\n\nThe possible alternatives I see are:\n\n[ALTERNATE SECTION / OTHER COURSE / DIFFERENT TERM]\n\nPlease tell me which of those actually works with the rest of your schedule before making a change.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T17",
    "title": "Registration hold",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nYour registration appears to be blocked by a hold rather than by the course itself.\n\nPlease open eCampus and tell me the exact hold name / office listed. If you can send a screenshot, even better. Some holds can only be cleared by the office that placed them, so I do not want to send you in circles.\n\nOnce the hold is cleared, let me know and we can finish the course registration piece.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T18",
    "title": "Credit-limit / overload issue",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nYour schedule is hitting the semester credit limit, so eCampus will not let you add [COURSE] normally.\n\nBefore requesting an overload, I want to make sure the extra credits are actually necessary and that the overall schedule is realistic. Right now I have you at [X] credits, with [COURSE] bringing the total to [Y].\n\nPlease confirm that this is the schedule you intend to carry. If so, I’ll tell you the next approval step / submit the appropriate request.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T19",
    "title": "Prerequisite or placement block",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nThe registration problem appears to be a prerequisite / placement issue for [COURSE].\n\nBefore we override anything, I need to confirm [PLACEMENT SCORE / PRIOR COURSE / TRANSFER EQUIVALENT / INSTRUCTOR APPROVAL]. Please send me [WHAT IS NEEDED].\n\nIf the prerequisite has actually been satisfied and eCampus simply is not recognizing it, I can help route the correction. If it has not been satisfied, we need to choose the correct course in the sequence rather than force the registration.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T20",
    "title": "Registration correction completed",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nThis should now be fixed. [COURSE / SECTION / CREDIT VALUE] has been [added / moved / corrected] in eCampus.\n\nPlease log in and confirm that your schedule shows the same thing on your end. If anything still looks wrong, send me a screenshot before making another change.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T21",
    "title": "Ensemble / studio / applied registration mismatch",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nI noticed that your actual participation and your eCampus registration do not match for [ensemble / studio / applied lesson / chamber group]. If you are participating, you need to be registered in the correct course/section unless the instructor or department has approved a different arrangement.\n\nPlease tell me which group/instructor you are actually working with and what section currently appears in eCampus. I’ll help reconcile the registration so your record matches what you are doing.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T22",
    "title": "Required course not offered / replacement needed",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\n[REQUIRED COURSE] is not available in the term we need it, so we need to solve the requirement rather than simply leave a hole in the plan.\n\nI’m checking whether [APPROVED SUBSTITUTE / DIFFERENT TERM / INDEPENDENT STUDY / EXCEPTION] is appropriate. Please do not assume another course will substitute until that is confirmed.\n\nFor now, keep [RELATED SEQUENCED COURSE(S)] in your plan and I’ll follow up with the approved path.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T23",
    "title": "Late add / late drop / petition",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nBecause the normal add/drop deadline has passed, this is no longer a routine eCampus change. It may require a late-add/drop form, instructor approval, College approval, or another petition depending on the situation.\n\nPlease send me:\n\n• the exact course/section\n\n• what change you are requesting\n\n• why the change was not completed before the deadline\n\n• any relevant instructor email/approval\n\nI’ll help identify the correct process. Please do not assume the request is approved until you receive confirmation that the record has actually been changed.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T24",
    "title": "Course withdrawal / W decision",
    "category": "Registration & enrollment",
    "internal": false,
    "body": "Hi [First name],\n\nBefore you withdraw from [COURSE], I want to make sure you understand what it changes in your degree plan. The main issue is [prerequisite sequence / graduation timing / full-time status / another requirement].\n\nAcademically, the next step would be [RETAKE / SUBSTITUTE / MOVE SEQUENCE]. You should also check any financial-aid, athletic, visa, or other status implications with the office responsible for those areas, since I cannot certify those from the Music side.\n\nIf you still plan to withdraw, let me know and we can make sure the revised academic plan is clear.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T25",
    "title": "Theory / musicianship placement",
    "category": "Records & exceptions",
    "internal": false,
    "body": "Hi [First name],\n\nYour placement result puts you in [COURSE / LEVEL] for [theory / musicianship]. That means the next course in your sequence is [COURSE].\n\nPlease register for the section that fits your schedule. If eCampus blocks you even though the placement result supports the course, send me the exact error and I’ll help resolve it.\n\nDo not move ahead to a different level just because another section is open; the sequence matters for later Music requirements.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T26",
    "title": "Piano placement / proficiency",
    "category": "Records & exceptions",
    "internal": false,
    "body": "Hi [First name],\n\nI checked the piano requirement on your APR. Right now it is showing [REQUIREMENT / COURSE(S)] as still needed.\n\nYour next step is [MUS 171 / 172 / 271 / 272 / proficiency exam / placement review]. If you have already completed or placed out of something that the APR is still flagging, send me the documentation/result so I can help get the audit reconciled.\n\nPlease do not repeat a piano course just because the APR looks wrong until we verify the history.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T27",
    "title": "APR discrepancy / degree-audit problem",
    "category": "Records & exceptions",
    "internal": false,
    "body": "Hi [First name],\n\nI see the issue on your APR. It is currently flagging [REQUIREMENT], but your record also shows [COURSE / TRANSFER CREDIT / PRIOR APPROVAL / PLACEMENT] that may already satisfy it.\n\nI do not want you to add another course just to make the red line disappear until we know whether this is a real requirement or an audit/coding problem.\n\nI’m checking [WHAT NEEDS TO BE VERIFIED]. Keep your current schedule in place for now, and I’ll follow up once we know what the APR should actually show.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T28",
    "title": "Transfer-credit reevaluation",
    "category": "Records & exceptions",
    "internal": false,
    "body": "Hi [First name],\n\nI reviewed the transfer credit currently on your record. [TRANSFER COURSE] is coming in as [CURRENT EQUIVALENCY / ELECTIVE], but you are asking whether it can satisfy [URI REQUIREMENT].\n\nPlease send me the course syllabus from the term you took it, plus any catalog description or other material the reviewing faculty member may need. I can then route it for an equivalency / reevaluation.\n\nUntil that review is approved, plan as though the URI requirement is still outstanding so we do not create a graduation problem based on an assumption.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T29",
    "title": "Course substitution / waiver / exception",
    "category": "Records & exceptions",
    "internal": false,
    "body": "Hi [First name],\n\nYou are asking to use [COURSE / EXPERIENCE] in place of [REQUIREMENT]. That may be possible, but it needs to be approved rather than assumed.\n\nThe reason for the request is:\n\n[BRIEF RATIONALE]\n\nI’m checking with [INSTRUCTOR / PROGRAM / COLLEGE] to see whether the substitution or exception can be approved. Until that happens, the original requirement remains the official one on your degree audit.\n\nI’ll let you know when I have a decision.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T30",
    "title": "Incomplete plan and follow-up",
    "category": "Records & exceptions",
    "internal": false,
    "body": "Hi [First name],\n\nI see that [COURSE] is still carrying an Incomplete. Because that can affect later prerequisites and graduation review, I want to make sure there is a clear completion plan rather than letting it sit unresolved.\n\nPlease confirm:\n\n• what work remains\n\n• the completion deadline you and the instructor agreed to\n\n• whether anything is preventing you from finishing it\n\nIf you do not have a written plan with the instructor yet, please contact them and copy me if advising coordination is needed. Once the grade posts, we should rerun the APR to make sure the requirement updates correctly.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T31",
    "title": "Leave of absence / return from leave",
    "category": "Records & exceptions",
    "internal": false,
    "body": "Hi [First name],\n\nIf you are planning a leave from URI / returning after a leave, we should handle both the University status and the Music sequence so you know what the break changes academically.\n\nPlease tell me the term you plan to [leave / return]. I’ll review where you are in theory, musicianship, piano, applied study, ensembles, and any other sequenced requirements so we can identify the cleanest re-entry point.\n\nThe formal leave/return process is handled through the University process, so make sure that paperwork is completed in addition to the Music advising plan.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T32",
    "title": "Academic recovery / SAP / probation planning",
    "category": "Records & exceptions",
    "internal": false,
    "body": "Hi [First name],\n\nI want to separate the academic plan from any financial-aid or standing decision so we do not mix together two different processes.\n\nFrom the Music/degree side, the courses I recommend for [term] are:\n\n[COURSES]\n\nThe goal is to [repeat required course / rebuild sequence / stay full-time if appropriate / make measurable degree progress].\n\nFor SAP, financial aid, or an official academic-standing appeal, please follow the instructions from the office handling that process. I can provide or review the academic plan portion, but that office makes the final determination on eligibility/status.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T33",
    "title": "Failed / repeated course affecting sequence",
    "category": "Records & exceptions",
    "internal": false,
    "body": "Hi [First name],\n\nBecause [COURSE] was not completed with the grade needed to continue, we need to adjust the sequence rather than simply move on to [NEXT COURSE].\n\nThe revised plan is:\n\n[REPEAT COURSE]\n\n[NEXT SEQUENCED COURSE / TERM]\n\n[OTHER COURSES THAT CAN STILL PROCEED]\n\nThis may affect your original graduation timeline by [IMPACT, IF KNOWN]. I’ll keep looking for anything that can be moved around without breaking prerequisites, but I do not want to promise a completion date until the sequence is mapped out.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T34",
    "title": "Independent study / special topics / graduate-course approval",
    "category": "Records & exceptions",
    "internal": false,
    "body": "Hi [First name],\n\nUsing [COURSE / INDEPENDENT STUDY / GRADUATE COURSE] for [REQUIREMENT / ELECTIVE] needs approval before we build the degree plan around it.\n\nPlease send me:\n\n• the proposed course/topic\n\n• the faculty member who would supervise/teach it\n\n• the number of credits\n\n• what degree requirement you hope it will satisfy\n\nI’ll check the academic fit and route any instructor, department, or College approval that is needed. Do not assume it substitutes automatically just because you are allowed to register for it.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T35",
    "title": "Potential graduate / Intent to Graduate outreach",
    "category": "Graduation",
    "internal": false,
    "body": "Hi [First name],\n\nI’m reaching out because your record suggests you may be approaching graduation in [TERM]. If that is your intended completion term, please make sure you complete the College of Arts & Sciences Intent to Graduate process by the current deadline.\n\nCurrent form/link: [CURRENT INTENT TO GRADUATE LINK]\n\nDeadline: [DEADLINE]\n\nBefore I sign the form, I’ll review it against your current APR, major requirements, Gen Ed requirements, and remaining elective/credit totals. Please send the completed form back to me rather than assuming the eCampus graduation date means you are already cleared.\n\nIf you are not planning to graduate in [TERM], let me know so we can make sure your expected graduation date is accurate.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T36",
    "title": "Individual outstanding-requirements review",
    "category": "Graduation",
    "internal": false,
    "body": "Hi [First name],\n\nI pulled your current APR and went through the items that are still showing as incomplete. Right now I have:\n\n• [REQUIREMENT 1]\n\n• [REQUIREMENT 2]\n\n• [REQUIREMENT 3]\n\n• [CREDIT / GEN ED / UPPER-LEVEL TOTAL, IF APPLICABLE]\n\nYour current [TERM] registration appears to address:\n\n[ITEMS CURRENTLY IN PROGRESS]\n\nThe items I still need to verify are:\n\n[AUDIT / SUBSTITUTION / PLACEMENT / TRANSFER ISSUES]\n\nSo you look [on track / potentially on track], but I am not calling the degree certified until those remaining pieces are reconciled. Please send me your Intent to Graduate form / confirm your intended graduation term and we’ll close out the review.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T37",
    "title": "Graduation-term mismatch / change of date",
    "category": "Graduation",
    "internal": false,
    "body": "Hi [First name],\n\nYour eCampus record currently shows an expected graduation term of [CURRENT TERM], but based on what you told me, you actually plan to finish in [INTENDED TERM].\n\nThose should match. If [INTENDED TERM] is correct, please complete the current Change of Graduation Date process:\n\n[CURRENT FORM / LINK]\n\nThis matters because the College uses the expected graduation term for graduation outreach, deadlines, and registration holds. Changing the date does not itself certify that the degree requirements are complete; we still need to review the APR separately.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T38",
    "title": "Intent to Graduate form received",
    "category": "Graduation",
    "internal": false,
    "body": "Hi [First name],\n\nI received your Intent to Graduate form. I’m reviewing it against your current APR and registration before I sign it.\n\nThe things I’m checking are your major requirements, Gen Ed requirements, total/upper-level credits, and anything still showing as incomplete or in progress. If I find something that needs clarification, I’ll send you the specific item rather than asking you to redo the whole form.\n\nFor now, you do not need to send another copy unless I ask for a correction.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T39",
    "title": "Conditional graduation review / almost complete",
    "category": "Graduation",
    "internal": false,
    "body": "Hi [First name],\n\nI went through your current APR. You look very close to completing the degree, but I still have a few items that need to finish or be reconciled before I can treat the audit as complete:\n\n• [IN-PROGRESS REQUIREMENT]\n\n• [AUDIT / SUBSTITUTION ISSUE]\n\n• [CREDIT TOTAL / GEN ED / OTHER]\n\nIf you successfully complete the courses currently in progress and [ANY REQUIRED APPROVAL] is resolved as expected, the plan appears consistent with graduating in [TERM].\n\nThat is not the same as final degree certification, so please keep checking your record until the final grades and audit updates have posted.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T40",
    "title": "Graduation not currently on track / revised timeline",
    "category": "Graduation",
    "internal": false,
    "body": "Hi [First name],\n\nI went through the current APR and I do not think [ORIGINAL TERM] is realistic based on the requirements still outstanding.\n\nThe main issue is:\n\n[SEQUENCED / MISSING REQUIREMENTS]\n\nA more realistic completion plan is:\n\n[TERM]: [COURSES]\n\n[TERM]: [COURSES]\n\n[FINAL TERM]: [COURSES]\n\nI know that is not the timeline you were hoping for, so I looked for anything that could be moved into J Term, Summer, or another term without breaking prerequisites. [RESULT]\n\nLet’s use this revised plan as the working version, and we can adjust it if course offerings or approved substitutions change.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T41",
    "title": "Commencement vs actual graduation term",
    "category": "Graduation",
    "internal": false,
    "body": "Hi [First name],\n\nOne important distinction: participating in the May commencement ceremony is not necessarily the same thing as having May as your official graduation term.\n\nIf you will finish your degree requirements in [AUGUST / DECEMBER / OTHER TERM], your Intent to Graduate and official graduation term should reflect when you actually complete the requirements. Whether you may participate in a ceremony is a separate question governed by the current College/University commencement rules.\n\nSo for the academic paperwork, use [ACTUAL COMPLETION TERM]. I can help you make sure the degree plan and graduation date line up correctly.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T42",
    "title": "Student has not replied",
    "category": "Follow-up & routing",
    "internal": false,
    "body": "Hi [First name],\n\nJust following up on the message below. I still need [INFORMATION / FORM / CONFIRMATION] before I can finish your advising / registration issue.\n\nIf this is no longer something you need help with, just let me know so I can close the loop. Otherwise, please send [WHAT IS NEEDED] when you can.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T43",
    "title": "Missed advising appointment",
    "category": "Follow-up & routing",
    "internal": false,
    "body": "Hi [First name],\n\nI had you scheduled for advising at [TIME] today and we missed each other.\n\nIf you still need help, the fastest way to get started is to email me your proposed schedule and the specific questions/issues you need resolved. If a meeting is still necessary after that, we can find another time.\n\nIf this was about a deadline or registration problem, please do not wait for a rescheduled meeting before sending me the details.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T44",
    "title": "Need more information before advising",
    "category": "Follow-up & routing",
    "internal": false,
    "body": "Hi [First name],\n\nI can help with this, but I’m missing a few pieces that I need before I can give you a reliable answer.\n\nPlease send:\n\n• [ITEM 1]\n\n• [ITEM 2]\n\n• [ITEM 3]\n\nIf this involves eCampus, include the exact course/section and the exact error rather than a summary of what the system said. If it involves your degree plan, tell me the graduation term you are working toward.\n\nOnce I have those pieces, I can check the actual record instead of guessing.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T45",
    "title": "Parent / family inquiry and student privacy",
    "category": "Follow-up & routing",
    "internal": false,
    "body": "Hi [Name],\n\nThank you for reaching out. Because this concerns a student’s academic record, I need to work directly with [STUDENT NAME] unless the appropriate University authorization is in place for me to discuss their record with someone else.\n\n[Student name] is welcome to email me directly, and they can copy you if they want you included in the conversation. I’m also happy to explain general URI Music requirements or procedures without discussing the student’s private record.\n\nThanks,\n\nAdam"
  },
  {
    "id": "T46",
    "title": "Student outside my advising portfolio",
    "category": "Follow-up & routing",
    "internal": false,
    "body": "Hi [First name],\n\nI’m happy to point you in the right direction, but I’m not the assigned academic advisor for your current Music program.\n\nYour advisor is [ADVISOR NAME / EMAIL]. I’m forwarding / directing this to them because they should be the person reviewing your APR and making degree-plan decisions for your program.\n\nIf the issue is something department-wide rather than an advising question, I can still help route it to the right person.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T47",
    "title": "Instructor approval for substitution / exception",
    "category": "Internal coordination",
    "internal": true,
    "body": "Hi [Name],\n\nI’m advising [STUDENT] in [PROGRAM], and I wanted to check one degree requirement with you before I tell the student it is settled.\n\nThe APR currently requires [REQUIREMENT]. The student has [COURSE / EXPERIENCE / PROPOSED ALTERNATIVE], and I’m wondering whether you would approve that in place of the requirement.\n\nThe reason is [BRIEF RATIONALE].\n\nIf you approve it, could you reply confirming that? I’ll keep the written approval with the advising record and work with the appropriate office if the APR needs a substitution entered.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T48",
    "title": "Enrollment Services registration-error escalation",
    "category": "Internal coordination",
    "internal": true,
    "body": "Hi [Name],\n\nI’m trying to resolve an eCampus registration issue for [STUDENT, URI ID].\n\nCourse/section: [COURSE / SECTION / CLASS NUMBER]\n\nWhat the student is trying to do: [ADD / SWAP / CHANGE CREDITS]\n\nError: [EXACT ERROR]\n\nWhat we have already checked: [HOLD / PERMISSION / PREREQUISITE / CAPACITY]\n\nFrom the advising side, the student should be in this course/section. Could you take a look and let me know whether this needs an Enrollment Services correction or if there is another step I should take?\n\nThank you!\n\nAdam"
  },
  {
    "id": "T49",
    "title": "College / Dean policy clarification",
    "category": "Internal coordination",
    "internal": true,
    "body": "Hi [Name],\n\nI have an advising case where I want to make sure I’m applying the College policy correctly before I give the student a definitive answer.\n\nStudent/program: [STUDENT / PROGRAM]\n\nIssue: [POLICY QUESTION]\n\nWhat the APR/eCampus currently shows: [DETAIL]\n\nMy reading of the situation: [INTERPRETATION]\n\nCan you confirm whether [SPECIFIC QUESTION] is correct? If there is a form or different process I should be using, please point me to it and I’ll take it from there.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T50",
    "title": "Course capacity / section balancing",
    "category": "Internal coordination",
    "internal": true,
    "body": "Hi [Name],\n\nI can help with the students in my advising portfolio, but I want to separate academic advising from department-wide enrollment management.\n\nFor my advisees, I can review degree needs, identify who actually needs [COURSE], and contact them about viable section changes. For broader balancing across studios/sections or students assigned to other advisors, I think the department/instructors of record should determine the overall plan first so we are not moving students independently in ways that create new conflicts.\n\nIf you send me the specific change you want considered for my advisees, I’ll check it against their schedules and follow up with them.\n\nThanks,\n\nAdam"
  },
  {
    "id": "T51",
    "title": "Curriculum / APR coding discrepancy",
    "category": "Internal coordination",
    "internal": true,
    "body": "Hi [Name],\n\nI found what looks like a curriculum/audit mismatch for [STUDENT / PROGRAM].\n\nThe current approved requirement is: [CURRENT REQUIREMENT]\n\nThe APR is showing: [APR REQUIREMENT]\n\nThe student’s record includes: [COURSE / CREDIT / APPROVAL]\n\nCan you confirm whether the APR needs a coding/update correction or whether I’m missing a rule that explains the difference? I do not want to advise the student into an unnecessary course just to satisfy an incorrect audit line.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T52",
    "title": "Major change / subplan processing follow-up",
    "category": "Internal coordination",
    "internal": true,
    "body": "Hi [Name],\n\nI’m following up on the change of major for [STUDENT, URI ID]. The intended program is [MAJOR / DEGREE], with the [SUBPLAN / OPTION] subplan.\n\nThe change has not posted yet / was returned because [ISSUE]. Could you confirm what is still needed to get it processed?\n\nOnce the official program is in eCampus, I’ll rerun the APR and finalize the student’s remaining-course plan from the actual audit rather than the What-If report.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T53",
    "title": "Graduation audit / certification question",
    "category": "Internal coordination",
    "internal": true,
    "body": "Hi [Name],\n\nI’m reviewing [STUDENT] for [GRADUATION TERM] and want to make sure I’m handling the remaining audit issue correctly before signing/certifying anything.\n\nThe student has completed / is completing: [SUMMARY]\n\nThe APR still flags: [ITEM]\n\nMy question is: [SPECIFIC CERTIFICATION / COUNTING QUESTION]\n\nCan you confirm how this should be treated for graduation? I can send the APR or supporting approval if helpful.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T54",
    "title": "Transfer-credit / course-equivalency review",
    "category": "Internal coordination",
    "internal": true,
    "body": "Hi [Name],\n\nCould you review this transfer course for possible equivalency/substitution?\n\nStudent: [STUDENT / URI ID]\n\nTransfer institution: [INSTITUTION]\n\nTransfer course: [COURSE]\n\nURI requirement in question: [URI COURSE / REQUIREMENT]\n\nI have [syllabus / catalog description / assignments] available. Based on the material, the student is asking whether it can satisfy [REQUIREMENT].\n\nCould you let me know whether you approve the equivalency/substitution, or if you need anything else before deciding?\n\nThanks!\n\nAdam"
  },
  {
    "id": "T55",
    "title": "Advisor handoff / routing note",
    "category": "Internal coordination",
    "internal": true,
    "body": "Hi [Name],\n\nI’m handing this advising case over to you because [STUDENT] is in [PROGRAM], which falls within your advising area.\n\nThe issue is: [SUMMARY]\n\nWhat has already been done: [ACTIONS]\n\nWhat is still unresolved: [NEXT STEP]\n\nI wanted to give you the context so the student does not have to start over from scratch. I’ve told them that you are the advisor who should make the next degree-plan decision.\n\nThanks!\n\nAdam"
  },
  {
    "id": "T56",
    "title": "Written follow-up documenting advising decision",
    "category": "Internal coordination",
    "internal": true,
    "body": "Hi [Name],\n\nJust documenting the outcome of our conversation so we have the same record going forward.\n\nStudent / issue: [STUDENT / ISSUE]\n\nDecision: [DECISION]\n\nReason: [BRIEF BASIS]\n\nNext step: [WHO DOES WHAT]\n\nDeadline, if any: [DATE]\n\nI’ll advise the student based on that unless something changes. If I misunderstood any part of the decision, please let me know and I’ll correct the record.\n\nThanks,\n\nAdam"
  }
];
