import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your .env.local file
// You'll get these values from your Supabase project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a Supabase client for use in the browser
export const createBrowserClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};


export { createClient };
// For server components, import these directly in the server component file:
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
//
// Then use:
// const supabase = createServerComponentClient({ cookies });