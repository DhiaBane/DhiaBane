import type { Metadata } from "next"
import ProfileDashboard from "@/components/profile/profile-dashboard"

export const metadata: Metadata = {
  title: "Profil | RestoPilote",
  description: "Gérez votre profil et vos préférences",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profil</h1>
      <ProfileDashboard />
    </div>
  )
}
