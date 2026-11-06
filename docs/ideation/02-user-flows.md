# 02: User flows

Each flow lists what the user does, what the app does, and what the user sees. Error and loading states are part of each flow, not an afterthought.

## Flow 1: Register and log in

1. User opens `/login` and enters an email and password.
2. User chooses **Register** or **Log in**.
3. App calls Supabase Auth.
4. On success, the app opens `/dashboard`.
5. On failure, the app shows the error message from Supabase next to the form.

**Loading:** the submit button is disabled and shows a spinner while the request runs.

**Returning visitor:** if a session already exists, `/login` redirects straight to `/dashboard`.

## Flow 2: See my links

1. User opens `/dashboard`.
2. App loads the user's rows from `urls`, newest first.
3. Each row shows the original URL, the short URL, and the creation date.

**Loading:** a skeleton row or "Loading your links..." message.
**Empty:** "You have no short links yet" with a button to add one.
**Error:** a message with a retry button.

## Flow 3: Create a short link

1. User clicks **Add URL** and opens `/create`.
2. User enters a URL. The app checks that it starts with `http://` or `https://`.
3. App generates a short code and inserts the row (see [ADR 0005](../arch/0005-random-short-codes-with-unique-constraint.md)).
4. App shows the new short URL with a **Copy** button.
5. User clicks **Back to dashboard**.

**Loading:** the button is disabled while saving.
**Error:** invalid URL is shown inline. A failed save shows a message and keeps the typed URL.

## Flow 4: Copy a short link

1. User clicks **Copy** on a row in the dashboard, or on the success screen.
2. App writes the short URL to the clipboard.
3. Button text changes to **Copied** for a short time, then returns to **Copy**.

**Error:** if the clipboard is blocked, the short URL is shown in a text box the user can select.

## Flow 5: Delete a link

1. User clicks **Delete** on a row.
2. App asks for confirmation.
3. On confirm, the app deletes the row. RLS ensures only the owner's row can be removed.
4. The row disappears from the list.

## Flow 6: Visit a short link

1. Anyone opens `/r/:code`, signed in or not.
2. App calls the restricted lookup (see [ADR 0006](../arch/0006-public-redirect-lookup-without-private-data.md)).
3. If found, the browser is sent to the original URL.
4. If not found, the page shows "This short link doesn't exist" and a link to the home page.

**Loading:** a short "Redirecting..." message.

## Flow 7: Log out

1. User clicks **Log out** in the header.
2. App ends the Supabase session.
3. User lands on `/login`.
4. Pressing Back does not show the dashboard again, because the router checks the session.
