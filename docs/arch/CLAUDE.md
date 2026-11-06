# docs/arch: Architecture Decision Records

This folder holds Architecture Decision Records (ADRs). Each ADR records one decision about how the app is built, why it was chosen, and what it costs.

## When to write an ADR

Write a new ADR when a change:

- picks a technology, service, or library the app will depend on (for example, a new Supabase feature or a UI framework),
- changes the database schema, access rules (RLS policies), or who can see what,
- changes how the app is deployed, routed, or configured,
- adds or removes a feature listed in [ADR 0008](0008-scope-limited-to-core-crud.md), or
- reverses an earlier ADR.

Do not write an ADR for:

- bug fixes, styling changes, or copy edits,
- ideas that are not yet decided (put those in `docs/ideation/`),
- how to run or set up the project (put those in `README.md`).

## When to read ADRs

Read the relevant ADR before changing code it covers. For example:

- Before editing `supabase/schema.sql` or any RLS policy, read [ADR 0004](0004-single-urls-table-with-row-level-security.md) and [ADR 0006](0006-public-redirect-lookup-without-private-data.md).
- Before editing `src/services/auth.js` or the router's session checks, read [ADR 0003](0003-supabase-auth-for-sessions.md).
- Before editing `vercel.json` or the build setup, read [ADR 0007](0007-vercel-hosting-with-spa-rewrites.md).

If new code contradicts an accepted ADR, stop and write a new ADR that supersedes it. Do not silently change the code.

## File naming

- Use a four-digit number, then a short kebab-case title: `0009-short-title.md`.
- Numbers only go up. Never reuse or renumber an ADR.
- Copy the format of an existing ADR: title, Status, Date, Context, Decision, Consequences.

## Status values

- **Proposed:** written but not yet built or tested.
- **Accepted:** the decision is in effect.
- **Superseded by NNNN:** replaced by a later ADR. Keep the file and link to the new one.

When an ADR is superseded, change only its Status line. Do not delete it.
