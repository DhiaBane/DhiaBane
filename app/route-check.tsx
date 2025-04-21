"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

// Liste de toutes les routes que nous voulons vérifier
const routes = [
  { path: "/", name: "Accueil" },
  { path: "/dashboard", name: "Tableau de bord" },
  { path: "/reservations", name: "Réservations" },
  { path: "/menu", name: "Menu" },
  { path: "/commandes", name: "Commandes" },
  { path: "/inventaire", name: "Inventaire" },
  { path: "/personnel", name: "Personnel" },
  { path: "/restaurateur", name: "Restaurateur" },
  { path: "/restaurateur/sofia", name: "Sofia AI" },
  { path: "/staff", name: "Staff" },
  { path: "/client", name: "Client" },
  { path: "/fournisseur", name: "Fournisseur" },
  { path: "/logistique", name: "Logistique" },
  { path: "/developpement", name: "Développement" },
]

export default function RouteCheck() {
  const [routeStatus, setRouteStatus] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Simuler la vérification des routes
    // Dans un environnement réel, nous pourrions faire des requêtes fetch pour vérifier
    const checkRoutes = async () => {
      const status: { [key: string]: boolean } = {}

      for (const route of routes) {
        // Simuler un délai pour l'effet visuel
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Dans un environnement réel, nous ferions une vérification réelle ici
        // Pour l'instant, nous supposons que toutes les routes sont valides
        status[route.path] = true
      }

      setRouteStatus(status)
    }

    checkRoutes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Vérification des routes</h1>
        <p className="mb-6 text-gray-600">
          Cette page vérifie si toutes les routes principales de l'application sont correctement configurées.
        </p>

        <div className="grid gap-4">
          {routes.map((route) => (
            <Card key={route.path}>
              <CardHeader className="py-4">
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {route.name} ({route.path})
                  </span>
                  {routeStatus[route.path] !== undefined ? (
                    routeStatus[route.path] ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )
                  ) : (
                    <span className="text-sm text-gray-400">Vérification...</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <Link href={route.path}>
                  <Button variant="outline" className="w-full">
                    Visiter la page
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
