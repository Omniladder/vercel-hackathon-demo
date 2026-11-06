import { supabase } from '../lib/supabase.js';

const CODE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CODE_LENGTH = 7;
const MAX_ATTEMPTS = 5;

// PostgreSQL's error code for a UNIQUE constraint that was broken.
const UNIQUE_VIOLATION = '23505';

/**
 * Makes a random short code from letters and digits. See docs/arch/0005.
 *
 * @returns {string} A code such as `k3Xp9aQ`.
 */
function makeShortCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(CODE_LENGTH));
  return Array.from(bytes, (byte) => CODE_CHARACTERS[byte % CODE_CHARACTERS.length]).join('');
}

/**
 * Saves a new short link for the signed-in user. The database sets `user_id`.
 *
 * If the random code is already taken, the insert fails with a unique-violation
 * error. Then a new code is made and the insert is tried again, up to five times.
 *
 * @param {string} name - The name for the link. Required.
 * @param {string} originalUrl - The address the short link redirects to.
 * @returns {Promise<object>} The new row from the `urls` table.
 * @throws {Error} If Supabase returns an error, or no unused code is found after five tries.
 */
export async function createLink(name, originalUrl) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const { data, error } = await supabase
      .from('urls')
      .insert({ name, original_url: originalUrl, short_code: makeShortCode() })
      .select()
      .single();

    if (!error) return data;
    if (error.code !== UNIQUE_VIOLATION) throw error;
  }

  throw new Error('Could not make a unique short link. Try again.');
}

/**
 * Returns the signed-in user's links, newest first. The database returns only
 * the rows that belong to the user (see the RLS policies in `supabase/migrations/`).
 *
 * @returns {Promise<object[]>} The rows, with `id`, `short_code`, and `original_url`.
 * @throws {Error} If Supabase returns an error.
 */
export async function listLinks() {
  const { data, error } = await supabase
    .from('urls')
    .select('id, name, short_code, original_url')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Deletes one of the signed-in user's links. The delete policy in the database
 * stops a user from deleting another user's link, even with the id.
 *
 * @param {string} id - The id of the link to delete, from `listLinks`.
 * @throws {Error} If Supabase returns an error.
 */
export async function deleteLink(id) {
  const { error } = await supabase.from('urls').delete().eq('id', id);
  if (error) throw error;
}

/**
 * Looks up the address a short code redirects to. Works without signing in.
 *
 * @param {string} code - The short code from the path, such as `Qw7mZ2` in `/r/Qw7mZ2`.
 * @returns {Promise<string | null>} The original URL, or `null` when no link has that code.
 * @throws {Error} If Supabase returns an error.
 */
export async function getOriginalUrl(code) {
  const { data, error } = await supabase.rpc('get_original_url', { code });
  if (error) throw error;
  return data;
}
