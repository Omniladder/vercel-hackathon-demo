# 03: Auth service (`src/services/auth.js`)

`src/services/auth.js` is the only code that signs users in. The login page does not call Supabase itself. It calls the one function in this file.

## The function

### `logInOrRegister(email, password)`

Logs the user in. If no account exists for the email, it creates one and logs in.

Supabase gives the same "Invalid login credentials" message for a wrong password and for an email with no account. So the function works in three steps:

1. It tries to log in. If that works, it stops.
2. If the error is anything other than "Invalid login credentials", it shows that error. For example, "Email not confirmed".
3. Otherwise it tries to register the email. If the email already has an account, the password was wrong, so it shows "That password is wrong for this email."

If the account is created but no session starts, the email needs confirming first. The function shows "Check your email to confirm your account, then log in."

Whether a session starts right away depends on the Supabase project's email confirmation setting. See [ADR 0003](../arch/0003-supabase-auth-for-sessions.md).

## Related

- [01: Entry point](01-entry-point.md), which passes this function to the login page.
- [02: Login page](02-login-page.md), which shows the messages in its red box.
