import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const supabase = getSupabaseServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Get user's companies
  const { data: companies } = await supabase.from("companies").select("*").eq("owner_id", session.user.id)

  // Get user's role
  const { data: userRoles } = await supabase.from("user_roles").select("*").eq("user_id", session.user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to your RestauPilot dashboard" />
      <DashboardContent companies={companies || []} userRoles={userRoles || []} userId={session.user.id} />
    </DashboardShell>
  )
}
