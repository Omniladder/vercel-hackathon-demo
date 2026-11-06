# 05: Future ideas (parked)

These ideas came up during planning. None of them are in the current scope (see [ADR 0008](../arch/0008-scope-limited-to-core-crud.md)). They are listed so the group can discuss them without building them.

Each idea is a candidate for a workshop exercise or a later version. If one is picked up, it needs its own ADR first.

## Features

| Idea | What it would add | Teaching value | Cost |
|------|-------------------|----------------|------|
| Click count | A counter on each link, updated on redirect | Shows writes from an anonymous visitor, which raises access control questions | Medium: needs a safe way to increment without exposing data |
| Custom alias | User picks the short code, such as `/r/my-talk` | Shows unique constraint errors in the UI | Low |
| Expiration date | Links stop working after a date | Shows a server-side check versus a client-side check | Medium |
| Edit destination | Change the original URL of an existing link | Shows an UPDATE policy in RLS | Low |
| Copy history | Log of copied links per user | Adds a second table and a foreign key | Medium |
| QR code | Show a QR code for each short link | A client-side library with no backend change | Low |

## Platform and process

| Idea | Note |
|------|------|
| Preview deployments per pull request | Vercel does this already. A session could show how to open one. |
| Supabase local development | Run Supabase on a laptop with the CLI. Useful for offline workshops, but adds setup time. |
| Automated tests for RLS | A script that signs in as two users and checks that each sees only their rows. Good teaching tool for security. |
| Email password reset | Requires email configuration in Supabase. Adds time to setup. |

## Why these are parked

- The workshop is short, and each feature adds code and a new concept.
- Several of them (click count, expiration) need a security decision that deserves its own ADR.
- The core flows in [02-user-flows.md](02-user-flows.md) must work before any of these are considered.
