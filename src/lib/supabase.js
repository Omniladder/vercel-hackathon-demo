import { createClient } from '@supabase/supabase-js';

/**
 * The one Supabase client for the app. Services import it from here.
 *
 * The URL and anon key come from `.env.local` (see `.env.example`).
 * Vite exposes only variables that start with `VITE_`.
 */
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
