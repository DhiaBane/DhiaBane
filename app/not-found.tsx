import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">Page non trouvée</h2>
      <p className="mt-2 text-gray-600 max-w-md">Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
      <div className="mt-8 space-y-4">
        <Link href="/">
          <Button>Retour à l'accueil</Button>
        </Link>
        <Link href="/route-check">
          <Button variant="outline" className="ml-4">
            Vérifier les routes
          </Button>
        </Link>
      </div>
    </div>
  )
}
