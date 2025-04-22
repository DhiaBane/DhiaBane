import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div className="rounded-full bg-red-100 p-3">
          <Shield className="h-8 w-8 text-red-600" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Accès Non Autorisé</h1>
          <p className="text-sm text-gray-500">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page. Veuillez contacter un administrateur
            si vous pensez qu'il s'agit d'une erreur.
          </p>
        </div>
        <Button asChild className="w-full">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  )
}
