# 01: Register and log in

> **Status:** Login page is built and connected to Supabase Auth. Log in and Register use the same action: an existing account logs in, and a new email creates an account.

Use this guide to make an account and sign in. You need an email address and a password.

## Register a new account

1. Open the app. The login page appears.
2. Type your email address in the **Email** box.
3. Type a password in the **Password** box.
4. Click **Register**. The app creates the account and logs you in. If the app asks you to confirm your email, open the message from Supabase and click the link, then come back and log in.

## Log in to an existing account

1. Open the app. The login page appears.
2. Type your email and password.
3. Click **Log in**.
4. The dashboard opens.

## When something goes wrong

- **"Enter your email and password."** One of the boxes is empty. Fill in both.
- **"That password is wrong for this email."** The email already has an account, and the password does not match it. Try the password again.
- **"Check your email to confirm your account, then log in."** The account was created, but Supabase needs you to confirm your email first. Open the message from Supabase, click the link, then log in.
- **"Email not confirmed"** (or similar text in red). The account exists but has not been confirmed yet. Confirm it using the email from Supabase, then log in.
- **Any other message in red under the form.** The message comes from the sign-in service. Read it and try again.
- **The buttons are greyed out for a moment.** The app is still working. Wait for it to finish.

## Stay signed in

The app keeps you signed in between visits on the same browser. If you open the app again later, it goes straight to the dashboard. To sign out, see [05: Log out](05-log-out.md).
