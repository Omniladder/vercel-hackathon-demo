# 01: Entry point (`src/main.js`)

`src/main.js` is the first script the browser runs. Its job is to start the app: it finds the login form in `index.html` and connects its buttons to the auth service.

## What happens when the app loads

1. The browser loads `index.html`, which includes `main.js` as a module.
2. `main.js` loads the stylesheet, then the login page code.
3. `main.js` calls `setUpLoginPage` and hands it `logInOrRegister` for both buttons.

## The functions

### `logInOrRegister` (used for `onLogIn` and `onRegister`)

Both buttons on the login page pass in the same function: `logInOrRegister` from `src/services/auth.js`. It logs in when the email already has an account, and creates the account when it does not. See [03: Auth service](03-auth-service.md).

See also: [02: Login page](02-login-page.md), which calls these functions.
