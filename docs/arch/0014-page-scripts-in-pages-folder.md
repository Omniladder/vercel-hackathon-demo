# ADR 0014: Put each page's script in `src/pages/`, named after the page

- **Status:** Accepted
- **Date:** 2026-11-07

## Context

[ADR 0013](0013-merge-page-logic-into-entry-scripts.md) merged each page's behavior into one script and kept those scripts at the top of `src/`. Their names had a `-main` suffix, such as `login-main.js`. That suffix made the files look like something other than page code, and the scripts sat beside the `services/` and `lib/` folders with no grouping.

## Decision

- Each page's script lives in `src/pages/`, named after the page:
  - `src/pages/login.js` for `index.html`
  - `src/pages/dashboard.js` for `dashboard.html`
  - `src/pages/create.js` for `create.html`
  - `src/pages/redirect.js` for `redirect.html`
- Each script holds the page's behavior, as ADR 0013 decided. The scripts may call the functions in `src/services/` or the Supabase client directly.
- `src/services/`, `src/lib/supabase.js`, and `src/index.css` stay where they are.

This ADR supersedes [ADR 0013](0013-merge-page-logic-into-entry-scripts.md) for the file locations and names. The merge itself is restated here and is unchanged.

## Consequences

- Each page's script sits in one folder, and its name matches the HTML page it belongs to.
- Scripts in `src/pages/` import shared code with `../`, such as `../services/auth.js`.
- The `<script>` tag in each HTML file points to `/src/pages/<name>.js`.
- `src/pages/` no longer has a file named `login.js` next to the `src/login.js` that [ADR 0013](0013-merge-page-logic-into-entry-scripts.md) used, so there is no name clash to avoid.
