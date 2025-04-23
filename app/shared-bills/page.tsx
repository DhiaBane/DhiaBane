import type { Metadata } from "next"
import SharedBillsHistory from "@/components/shared-bills/shared-bills-history"

export const metadata: Metadata = {
  title: "Historique des partages | RestoPilote",
  description: "Consultez l'historique de vos additions partagées avec vos amis",
}

export default function SharedBillsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Historique des partages</h1>
      <SharedBillsHistory />
    </div>
  )
}
