# Short Links

A small URL shortener built for an introductory cloud computing workshop. You sign in, paste a long web address, and get a short link you can copy and share. Anyone who opens the short link is sent to the original address.

The project is meant to show how a browser, a frontend, managed authentication, an API, and a database work together. The code is written to be read line by line.

## Where to find things

- **User guides:** step-by-step instructions for using the app. Start at [docs/guides/README.md](docs/guides/README.md).
- **Architecture decisions:** why the app is built the way it is. See [docs/arch/](docs/arch/).
- **Ideas and workshop plans:** [docs/ideation/](docs/ideation/).

## Current status

The app is being built in stages. Right now:

| Part | Status |
|------|--------|
| Login page (email, password, Log in, Register) | Built. Buttons show a "not connected yet" message until the auth service exists. |
| Register and log in with Supabase | Not built yet |
| Dashboard (list, copy, delete links) | Not built yet |
| Create a short link | Not built yet |
| Redirect from `/r/:code` | Not built yet |

The [user guides](docs/guides/README.md) describe the finished app. Each guide shows its status at the top.

## What you need

- [Node.js](https://nodejs.org/) (version 20 or newer)
- A [Supabase](https://supabase.com/) project, with its URL and anon key
- A [GitHub](https://github.com/) account and a [Vercel](https://vercel.com/) account if you want to deploy

## Set up the project

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a file named `.env.local` in the project root. Add your Supabase values:

   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

   Never commit this file or paste its keys into code. `.env.local` is already in `.gitignore`.

3. Set up the database. The table, policies, and lookup function are in [supabase/migrations](supabase/migrations). Run `npx supabase db push` after linking the project (see the setup guide).


## Run the app

Start the local development server:

```bash
npm run dev
```

Open the address it prints, usually <http://localhost:5173>. The page reloads when you save a file.

To build the app for hosting:

```bash
npm run build
```

The output goes to `dist/`. Vercel runs this same command when you deploy.

## Use the app

These are the basic steps. Each one has a full guide in [docs/guides/](docs/guides/README.md).

1. **Register** with an email and password, or **log in** if you already have an account.
2. On the **dashboard**, see every short link you have created.
3. Click **Add URL**, paste a web address that starts with `http://` or `https://`, and save it.
4. Click **Copy** to copy the short link.
5. Open the short link in a new tab. It sends you to the original address.
6. Click **Delete** to remove a link you no longer need.
7. Click **Log out** when you are finished.

## Deploy

The app is hosted on Vercel and deployed from GitHub. Each push to the main branch builds and publishes the site. The file [vercel.json](vercel.json) tells Vercel to send every address to `index.html`, so `/dashboard` and `/r/:code` work when opened directly.

Add the same two `VITE_` values from `.env.local` in the Vercel project settings under **Environment Variables**.

## Project layout

```
index.html        Page the app loads
src/              App code: pages, services, router, styles
docs/             Architecture decisions, ideas, and user guides
supabase/         Database migrations, run with the Supabase CLI
```

For a fuller layout and the rules for each folder, see [CLAUDE.md](CLAUDE.md).
