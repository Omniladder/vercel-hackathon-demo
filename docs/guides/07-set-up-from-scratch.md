# 07: Set up the app from scratch (developers)

> **Status:** Built. These steps set up the database, run the app on your computer, and put it on the web with Vercel.

This guide is for developers who build or change the app. It sets up the project from an empty folder to a deployed app. You need a computer with Node.js, a GitHub account, a Supabase account, and a Vercel account. All of them have free plans.

## How the project is laid out

- `index.html`, `dashboard.html`, `create.html`, and `redirect.html` are the four pages. Each has its own file (see [ADR 0009](../arch/0009-one-html-file-per-page.md)).
- `src/main.js`, `src/dashboard-main.js`, `src/create-main.js`, and `src/redirect-main.js` start each page.
- `src/pages/` connects the markup to its behavior. It does not talk to the database.
- `src/services/` is the only code that calls Supabase. `auth.js` handles sign-in, and `urls.js` handles links.
- `src/lib/supabase.js` creates the one Supabase client.
- `supabase/migrations/` holds the database changes, in order. The Supabase CLI runs each one once.
- `vite.config.js` lists the pages to build. `vercel.json` lists the routes to rewrite.

The layer rules and conventions are in `CLAUDE.md` at the project root.

## What you need first

- **Node.js 20 or newer.** Check with `node --version` in a terminal. If the command is missing, install Node.js from nodejs.org.
- **Git.** Check with `git --version`.
- **The Supabase CLI.** It is not global. Step 5 in section 5 installs it into the project with `npm install --save-dev supabase`.
- **A GitHub account.** Vercel deploys the app from a GitHub repository.
- **A Supabase account.** Supabase holds the database and the sign-in system.
- **A Vercel account.** Vercel hosts the app on the web.

## 1. Get the code

1. Clone the repository, or copy the project folder to your computer.
2. Open a terminal in the project folder, the one that contains `package.json`.

```
git clone <your-repository-url> hackathon-demo
cd hackathon-demo
```

## 2. Install the dependencies

```
npm install
```

This downloads the packages listed in `package.json`, including Vite and the Supabase client. It creates a `node_modules` folder. Do not commit that folder.

## 3. Create the Supabase project

1. Sign in at supabase.com and click **New project**.
2. Choose an organization, give the project a name, set a database password, and pick the region closest to you. Save the database password somewhere safe.
3. Wait for the project to finish setting up. This takes a minute or two.

## 4. Turn off email confirmation

The app's sign-up flow expects a session right after registering. With email confirmation on, new users must click a link in an email first. For the workshop, turn it off:

1. In the Supabase dashboard, open **Authentication**, then **Sign In / Providers**, then **Email**.
2. Turn off **Confirm email**, then save.

If you leave it on, the app still works, but it shows "Check your email to confirm your account, then log in." after each new registration.

## 5. Create the database table

The database is set up with the Supabase CLI. The changes live in `supabase/migrations/`, and each file runs once.

1. Install the CLI with `npm install --save-dev supabase`, then run `npx supabase --version` to check it.
2. Sign in with `npx supabase login`. It opens a browser window.
3. Connect the project folder to your Supabase project. Find the project reference in the dashboard URL, the part after `/project/`:

```
npx supabase link --project-ref <your-project-ref>
```

4. Enter the database password from step 3 of this guide when asked.
5. Run the migrations:

```
npx supabase db push
```

The first migration creates the `urls` table, turns on Row Level Security so users see only their own links, and adds the `get_original_url` function that the redirect page uses. To change the database later, run `npx supabase migration new <name>`, write the change in the new file, and run `npx supabase db push` again. Do not edit a migration that has already run. Changes to tables or policies belong in these files, not only in the dashboard (see the project guide in `CLAUDE.md`).

## 6. Copy the Supabase keys into `.env.local`

The app reads two values from a file called `.env.local` in the project folder. The file is listed in `.gitignore`, so it stays off GitHub.

1. In the Supabase dashboard, open **Project Settings**, then **API Keys** (or **API** in older dashboards).
2. Copy the **Project URL**. It looks like `https://abcdefghijkl.supabase.co`.
3. Copy the **anon public** key. It is a long string of letters and digits.
4. In the project folder, make a copy of `.env.example` and name the copy `.env.local`.
5. Replace the two placeholder values:

```
VITE_SUPABASE_URL=https://abcdefghijkl.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Use the **anon public** key only. Never put the `service_role` key in this file or in the code.

## 7. Run the app on your computer

```
npm run dev
```

The terminal shows an address, usually `http://localhost:5173`. Open it in your browser. You should see the login page.

Try it:

1. Enter an email and password, then click **Log in**. The app creates the account the first time and logs you in.
2. The dashboard opens. It shows the welcome message, since you have no links yet.
3. Click **+ Create new**, enter a destination URL such as `https://example.com`, and click **Create short link**. The dashboard opens again and shows the new link.

Stop the server with `Ctrl+C` in the terminal.

**Note:** On the local server, the `/r/:code` redirect does not work, because the local server does not apply the Vercel rewrite rules. Test redirects after you deploy (step 9).

## 8. Check that the build works

Before you deploy, make sure the project builds without errors:

```
npm run build
```

This writes the website to a `dist` folder. Vercel runs the same command.

## 9. Deploy to Vercel

1. Push the project to a GitHub repository. Do not push `.env.local`. Check that `git status` does not list it.
2. Sign in at vercel.com and click **Add New**, then **Project**. Import the GitHub repository.
3. Vercel detects the Vite setup. Check these settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Open **Environment Variables** and add the two values from step 6:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**. When it finishes, Vercel shows the address of your app.

The routing rules are in `vercel.json`. They send `/dashboard`, `/create`, and `/r/:code` to the right pages. Vercel reads them on each deploy.

## 10. Test the deployed app

1. Open your Vercel address and log in or register.
2. Create a link, then click **Visit** on the dashboard. It should open the destination.
3. Click the short link in the table, for example `https://your-app.vercel.app/r/k3Xp9a`. You should be sent to the destination.
4. Open an unknown code, such as `/r/doesnotexist`. You should see "Link not found".

## If something goes wrong

- **The login or dashboard shows a red error with a Supabase message.** Check the two values in `.env.local` (or in Vercel's environment variables). Each value must match the project's URL and anon key exactly.
- **"Could not make a unique short link."** The random code clashed five times in a row. Try again.
- **The dashboard is empty after you create a link.** Check that the `urls` table exists and that `npx supabase db push` finished without errors (step 5).
- **`npx supabase` says the command is not found.** The CLI is not installed yet. Run `npm install --save-dev supabase` in the project folder, then try again.
- **`npx supabase link` asks for a password you don't have.** Use the database password you chose when you created the Supabase project. If you lost it, reset it in the Supabase dashboard under **Project Settings**, then **Database**.
- **`/r/...` shows the login page on Vercel.** The `vercel.json` rewrite is missing or the file was not deployed. Check that the `/r/:code` rule is in `vercel.json`.
- **Environment variables changed in Vercel.** Redeploy the project so the new values are used.

## Day-to-day commands

```
npm run dev       Start the local server with hot reload
npm run build     Build to dist/ (the same step Vercel runs)
npm run preview   Serve the built dist/ folder locally
```

When you add a page, add its file to `vite.config.js` and, for a route like `/create`, add a rewrite to `vercel.json`. When you change a table or policy, add a migration with `npx supabase migration new <name>` and run `npx supabase db push`.

## Related

- [06: Troubleshooting](06-troubleshooting.md) for problems that a user sees while using the app.
- [ADR 0003](../arch/0003-supabase-auth-for-sessions.md), [ADR 0004](../arch/0004-single-urls-table-with-row-level-security.md), and [ADR 0007](../arch/0007-vercel-hosting-with-spa-rewrites.md), which explain the choices behind these steps.
