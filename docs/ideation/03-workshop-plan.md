# 03: Workshop plan

This maps each learning objective to a part of the app the attendee can see or read, and suggests an order for the session.

## Learning objectives and where they appear

| # | Objective | Where it shows up in the app | Demo idea |
|---|-----------|------------------------------|-----------|
| 1 | How browsers load websites | `index.html` loads `main.js`, which loads the router and page modules | Open DevTools, show the Network tab on first load |
| 2 | How frontend and backend communicate | Every call in `src/services/` goes from the browser to the Supabase API | Show one request and its JSON response in the Network tab |
| 3 | What cloud hosting does | Vercel serves `dist/` from a CDN | Show the Vercel deployment page after a push |
| 4 | What managed databases provide | The `urls` table in the Supabase dashboard | Insert a row by hand, then see it on the dashboard |
| 5 | How authentication and sessions work | `services/auth.js` and the router check | Log in, close the tab, reopen it, and stay logged in |
| 6 | How APIs interact with databases | `services/urls.js` calls the table through the API | Compare a query in the code with the same query in the Supabase SQL editor |
| 7 | How HTTP redirects work | `/r/:code` returns the browser to the original URL | Open DevTools and show the redirect status and the `Location` header if the presenter adds it |
| 8 | How GitHub and Vercel enable automated deployments | Push to `main` triggers a build | Make a small text change and push it live during the session |

## Suggested session order (about 90 minutes)

1. **Introduction (10 min):** show the finished app, then the architecture diagram from the project brief.
2. **Frontend and browser (15 min):** objectives 1 and 2. Walk through `index.html` and one page module.
3. **Authentication (15 min):** objective 5. Register, log in, and show the session in the browser storage.
4. **Database and API (20 min):** objectives 4 and 6. Read the migration in `supabase/migrations/`, then create a link and find it in the table.
5. **Redirects (10 min):** objective 7. Open a short link in a new tab and explain each step.
6. **Deployment (15 min):** objective 3 and 8. Connect the repository to Vercel and push a change.
7. **Questions and exercises (5 min):** attendees try one exercise from [05-future-ideas.md](05-future-ideas.md).

## Prerequisites for attendees

- A GitHub account.
- A Supabase account (free tier is enough).
- A Vercel account linked to GitHub.
- Node.js LTS and npm installed.

## Presenter checklist

- A Supabase project with the migrations in `supabase/migrations/` already pushed, so the table and policies exist.
- Email confirmation setting decided in advance (see [ADR 0003](../arch/0003-supabase-auth-for-sessions.md)).
- A backup Supabase project or a recorded demo, in case of network problems.
