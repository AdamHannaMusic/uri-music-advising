# URI Music Advising — New Advisor Training

A self-contained, browser-based training course for new University of Rhode Island
Department of Music academic advisors. No server, no build step, no dependencies —
it runs entirely in the browser.

## How to use it

Open `index.html` in any modern web browser.

## What's inside

- **The six rules** for safe advising, plus the source-of-truth order.
- **7 training modules**, each with a short knowledge check that marks the module
  complete when passed. Progress is saved in the browser (localStorage).
- **Quick reference** — routing, advisor portfolios, forms quick reference,
  curriculum snapshot, approved upper-level courses, graduation deadlines.
- **Email templates** — all 56 Gmail templates (T01–T56), searchable and copy-ready.
- **Files & forms** — the current 2026–2027 program worksheets (open directly as
  PDFs) and a map of the Advisor Starter Pack.

## Project structure

```
advisor-training-app/
├── index.html              Shell + navigation
├── styles.css              Styling (URI theme, responsive, accessible)
├── data.js                 All content: modules, reference tables, templates, worksheets
├── app.js                  Routing, quizzes, progress tracking, copy-to-clipboard
└── worksheets/2026-2027/   Current program worksheet PDFs
```

## Editing content

Almost everything lives in `data.js`:

- `MODULES` — training modules and their quiz questions.
- `TEMPLATES` — the email template library.
- `WORKSHEETS_2627` — the current program worksheets.
- `ROUTING`, `FORMS_REF`, `CURRICULA`, `PORTFOLIOS`, `APPROVED_COURSES` — reference tables.

## Source of truth

This app is a training aid. The student's controlling catalog, University Manual,
academic calendar, approved curriculum, and written office instructions always
control. Verify every form against the live official URI pages before use.
