import { supabase } from '../lib/supabase.js';

/**
 * Logs the user in. If no account exists for this email, creates one and logs in.
 *
 * Supabase gives the same "Invalid login credentials" message for a wrong
 * password and for an email that has no account. So the function tries to log
 * in first, and only registers when that message comes back. If the email
 * already has an account, sign-up tells us the password was wrong.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @throws {Error} If the password is wrong, the account needs email confirmation, or Supabase returns another error.
 */
export async function logInOrRegister(email, password) {
  const { error: logInError } = await supabase.auth.signInWithPassword({ email, password });
  if (!logInError) return;
  if (logInError.message !== 'Invalid login credentials') throw logInError;

  const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
  const emailIsTaken = signUpError?.message.includes('already registered') || data?.user?.identities?.length === 0;
  if (emailIsTaken) throw new Error('That password is wrong for this email.');
  if (signUpError) throw signUpError;

  // With email confirmation on, sign-up creates the account but no session yet.
  if (!data.session) throw new Error('Check your email to confirm your account, then log in.');
}

/**
 * Returns the current session, or `null` when nobody is logged in in this browser.
 *
 * @returns {Promise<object | null>} The session, or `null`.
 * @throws {Error} If Supabase returns an error.
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/**
 * Logs the user out of this browser. Supabase deletes the session it stored here.
 * Sessions on other devices stay active.
 *
 * @throws {Error} If Supabase returns an error.
 */
export async function logOut() {
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) throw error;
}
