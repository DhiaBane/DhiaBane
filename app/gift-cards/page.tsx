import type { Metadata } from "next"
import GiftCardDashboard from "@/components/gift-cards/gift-card-dashboard"

export const metadata: Metadata = {
  title: "Cartes Cadeaux | RestoPilote",
  description: "Envoyez et gérez vos cartes cadeaux RestoPilote",
}

export default function GiftCardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cartes Cadeaux</h1>
      <GiftCardDashboard />
    </div>
  )
}
