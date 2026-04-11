import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_PROJECT_URL;
const supabaseKey = process.env.NEXT_PUBLIC_KEY

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
  );