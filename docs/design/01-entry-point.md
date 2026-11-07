# 01: Entry point (`src/pages/login.js`)

`src/pages/login.js` is the first script the browser runs on the login page. It finds the login form in `index.html`, connects the form to the auth service, and sends signed-in users to the dashboard.

## What happens when the app loads

1. The browser loads `index.html`, which includes `src/pages/login.js` as a module.
2. `src/pages/login.js` loads the stylesheet.
3. `src/pages/login.js` checks for a session. If the user is already logged in, it sends them to the dashboard.
4. `src/pages/login.js` attaches a submit handler to the form. The handler calls `logInOrRegister` from `src/services/auth.js`.

## The functions

See [02: Login page](02-login-page.md) for `showError`, `setBusy`, and the submit handler. The other functions in this file are:

### `redirectIfLoggedIn()`

Sends the user to `/dashboard.html` when a session exists, so the login form is skipped. It does nothing for `/r/` addresses, which belong to the redirect page.

### `logInOrRegister` (called by the submit handler)

Defined in `src/services/auth.js`. It logs in when the email already has an account, and creates the account when it does not. See [03: Auth service](03-auth-service.md).

## Related

- [02: Login page](02-login-page.md), which describes the form behavior in this file.
