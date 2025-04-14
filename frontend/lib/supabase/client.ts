import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabase: any = null;

export const getSupabaseClient = (): ReturnType<
  typeof import("@supabase/supabase-js").createClient
> => {
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
};
