import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { SofiaAIChatClient } from "./client"

export default function SofiaAIPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/restaurateur">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Retour à l'application Restaurateur
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">🤖 Sofia AI - Assistant intelligent</h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            Sofia est votre assistant intelligent privé, réservé uniquement aux administrateurs de restaurants. Elle
            vous aide à analyser vos données, générer des rapports personnalisés et détecter des anomalies pour
            améliorer la rentabilité de votre établissement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Exemples de questions à poser à Sofia :</h2>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                "Bonjour Sofia, peux-tu me faire un rapport journalier de notre activité ?"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                "Quels plats ont généré le moins de marge cette semaine ?"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                "As-tu détecté une baisse de performance ou une anomalie ?"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                "Quelles sont les tendances de fréquentation ce mois-ci ?"
              </li>
            </ul>
          </div>

          <SofiaAIChatClient />
        </div>
      </div>
    </div>
  )
}
