# 06: Troubleshooting

Common problems and what to do about them. If your problem is not here, ask the presenter and include the exact message on the screen.

## The login page shows "Log in is not connected yet" or "Registration is not connected yet"

The sign-in code has not been written yet. This is expected in the current version of the app. See the status note in [01: Register and log in](01-register-and-log-in.md).

## I forgot my password

Password reset is not part of this app (see [ADR 0003](../arch/0003-supabase-auth-for-sessions.md)). Register a new account with a different email address.

## The dashboard is empty, but I made links before

Check that you are logged in with the same email address you used before. Each account sees only its own links.

## A short link says "This short link doesn't exist"

- The code may be mistyped. Copy the link again.
- The link may have been deleted by its owner.

## A copied link goes to the wrong place

Open the link in the dashboard and check the original address. A short link always sends to the address it was created with. If the address is wrong, delete the link and create a new one.

## The button says Copy but nothing is on my clipboard

Your browser may block clipboard access. Use the text box that the app shows instead, select the link, and copy it yourself.

## The app shows an error and a Retry button

Click **Retry**. If it fails again, check your internet connection and wait a minute. The database service may be down or still starting.

## Running the app on my own computer does not work

- Check that `.env.local` is in the project root and has both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- After you change `.env.local`, stop the dev server and run `npm run dev` again.
- Run `npm install` again if you see "module not found."
