import { IDatabase } from "@/models/database";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient<IDatabase>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
