import { createClient } from "@supabase/supabase-js"

// For client-side usage (CSR)
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (supabaseClient) return supabaseClient

  supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  return supabaseClient
}

// For server components (SSR) - App Router only
export const createServerSupabaseClient = async () => {
  // Dynamically import cookies only when this function is called
  // This prevents the import from being evaluated at module level
  // which would cause errors in the pages/ directory
  try {
    const { cookies } = await import("next/headers")
    const cookieStore = cookies()

    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          cookie: cookieStore.toString(),
        },
      },
    })
  } catch (error) {
    // Fallback for pages/ directory or when cookies() is not available
    console.error("Error creating server Supabase client:", error)
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  }
}
