import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function middleware(request: NextRequest) {
  // Create a response object
  const res = NextResponse.next()

  // Get the cookies from the request
  const supabaseCookie = request.cookies.get("sb-access-token")?.value
  const refreshToken = request.cookies.get("sb-refresh-token")?.value

  // If no cookie, redirect to login
  if (!supabaseCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Create a new Supabase client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

    // Set the auth cookie manually
    supabase.auth.setSession({
      access_token: supabaseCookie,
      refresh_token: refreshToken || "",
    })

    // Get the user
    const {
      data: { user },
    } = await supabase.auth.getUser(supabaseCookie)

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Check if the user has the super_admin role
    const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (userData?.role !== "super_admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    return res
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: "/admin/:path*",
}
