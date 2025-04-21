import { createClient as createSupabaseClient } from "@supabase/supabase-js";
// Create a function that returns the Supabase client
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createSupabaseClient(supabaseUrl, supabaseKey);
};

// Create and export a singleton instance of the Supabase client
export const supabase = createClient();
