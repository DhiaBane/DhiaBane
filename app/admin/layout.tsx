import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import AdminSidebar from "@/components/admin/sidebar"
import AdminTopbar from "@/components/admin/topbar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Dynamically import cookies
  const { cookies } = await import("next/headers")
  const cookieStore = cookies()
  const supabaseCookie = cookieStore.get("sb-access-token")?.value

  if (!supabaseCookie) {
    redirect("/login")
  }

  // Server-side authentication check
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  })

  // Get the user
  const {
    data: { user },
  } = await supabase.auth.getUser(supabaseCookie)

  if (!user) {
    redirect("/login")
  }

  // Check if user has super_admin role
  const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

  if (userData?.role !== "super_admin") {
    redirect("/unauthorized")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminTopbar user={user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
