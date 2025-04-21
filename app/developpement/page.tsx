import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DeveloppementPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Espace Développement</h1>
            <p className="text-gray-600">Accès aux modules en cours de développement</p>
          </div>
          <Link href="/">
            <Button variant="outline">Retour à l'accueil</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques Avancées</CardTitle>
              <CardDescription>Analyse de données</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Module d'analyse avancée avec filtres, comparaisons et export PDF.</p>
            </CardContent>
            <CardFooter>
              <Link href="/statistiques" className="w-full">
                <Button className="w-full" variant="outline">
                  En développement
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des Alertes</CardTitle>
              <CardDescription>Système de notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Configuration et gestion des alertes pour votre établissement.</p>
            </CardContent>
            <CardFooter>
              <Link href="/alertes" className="w-full">
                <Button className="w-full" variant="outline">
                  En développement
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
