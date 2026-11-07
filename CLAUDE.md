# CLAUDE.md: Project guide

This is the URL Shortener, a small full-stack app for an introductory cloud computing workshop. Users register, log in, create short links, and visit `/r/:code` to be redirected.

The project is meant to teach how a browser, a frontend, managed authentication, an API, and a database work together. Keep code readable and simple. Scope limits are in [ADR 0008](docs/arch/0008-scope-limited-to-core-crud.md).

## Stack

- HTML, CSS, and vanilla JavaScript (ES modules) for the frontend
- Vite for the dev server and build (`npm run dev`, `npm run build`)
- Supabase for Auth, PostgreSQL, and the API
- Vercel for hosting, deployed from GitHub

## File structure

Planned layout. Items marked **(exists)** are in the repo now.

```
hackathon-demo/
├── CLAUDE.md              This file
├── README.md              Setup and run instructions (exists, empty)
├── index.html             Vite entry page (exists)
├── package.json           Scripts and dependencies (exists)
├── package-lock.json      Locked dependency versions
├── vite.config.js         Vite configuration
├── vercel.json            Vercel build and rewrite rules (exists, empty)
├── .gitignore             Ignores node_modules, dist, env files
├── public/
│   └── favicon.ico        Static files served as-is
├── src/
│   ├── index.css          Global styles
│   ├── lib/
│   │   └── supabase.js    Creates the one Supabase client
│   ├── pages/
│   │   ├── login.js       Behavior for the login page (index.html)
│   │   ├── dashboard.js   Behavior for /dashboard
│   │   ├── create.js      Behavior for /create
│   │   └── redirect.js    Behavior for /r/:code
│   └── services/
│       ├── auth.js        Register, log in, log out, get session
│       └── urls.js        Create, list, delete, and look up links
├── supabase/
│   └── migrations/        Database changes, one file each, run in order
└── docs/
    ├── arch/              Architecture Decision Records (see docs/arch/CLAUDE.md)
    └── ideation/          Planning notes and parked ideas (see docs/ideation/CLAUDE.md)
```

### Layer rules

- **Pages** (`src/pages/`) hold each page's behavior. They render HTML and handle user events. They may call services or the Supabase client directly (see [ADR 0014](docs/arch/0014-page-scripts-in-pages-folder.md)).
- **Services** (`src/services/`) hold the calls to the Supabase API. Each function does one thing and returns data or throws an error.
- **`src/lib/supabase.js`** is the only place the Supabase client is created.
- **Router** decides which page to show and redirects based on the session.
- **`supabase/migrations/`** is the source of truth for the database. Each change is a new migration file, run with `supabase db push`. Changes to tables or policies go here, not only in the Supabase dashboard.

## Docs

- Architecture decisions go in `docs/arch/` as ADRs. Read the relevant ADR before changing code it covers. Details in `docs/arch/CLAUDE.md`.
- Ideas, flows, and workshop plans go in `docs/ideation/`. Details in `docs/ideation/CLAUDE.md`.
- If code contradicts an accepted ADR, write a new ADR rather than changing the code silently.

## Commands

```
npm install        Install dependencies
npm run dev        Start the local dev server
npm run build      Build to dist/ (what Vercel runs)
```

## Conventions

- Environment values for Supabase use the `VITE_` prefix (for example `VITE_SUPABASE_URL`). Never commit real keys. Keep them in `.env.local`, which must be in `.gitignore`.
- Keep files small and named after what they do. This is a teaching codebase, so favor clear code over clever code.
- Match the style of the code around your change.
