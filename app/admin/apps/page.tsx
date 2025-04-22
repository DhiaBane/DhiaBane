"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, ShoppingBag, Truck, Briefcase, Store, ExternalLink, Settings, BarChart2 } from "lucide-react"

// Mock apps data
const apps = [
  {
    id: "client-app",
    name: "Application Client",
    description: "Application mobile pour les clients des restaurants",
    icon: Users,
    status: "active",
    users: 1245,
    orders: 856,
    url: "/client-app",
  },
  {
    id: "restaurant-app",
    name: "Application Restaurant",
    description: "Gestion des commandes et des menus pour les restaurants",
    icon: Store,
    status: "active",
    users: 87,
    orders: 1432,
    url: "/restaurant-app",
  },
  {
    id: "supplier-app",
    name: "Application Fournisseur",
    description: "Gestion des stocks et des commandes pour les fournisseurs",
    icon: ShoppingBag,
    status: "active",
    users: 42,
    orders: 215,
    url: "/supplier-app",
  },
  {
    id: "staff-app",
    name: "Application Personnel",
    description: "Gestion des horaires et des tâches pour le personnel",
    icon: Briefcase,
    status: "inactive",
    users: 156,
    orders: 0,
    url: "/staff-app",
  },
  {
    id: "logistics-app",
    name: "Application Logistique",
    description: "Suivi des livraisons et gestion des itinéraires",
    icon: Truck,
    status: "active",
    users: 28,
    orders: 94,
    url: "/logistics-app",
  },
]

export default function AppsPage() {
  const [connectedApps, setConnectedApps] = useState(apps)

  const handleOpenApp = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Applications Connectées</h1>
        <p className="text-muted-foreground">Gérez les applications connectées à la plateforme RestoPilote.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {connectedApps.map((app) => (
          <Card key={app.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-blue-100 p-2">
                    <app.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{app.name}</CardTitle>
                </div>
                <Badge variant={app.status === "active" ? "default" : "outline"}>
                  {app.status === "active" ? "Actif" : "Inactif"}
                </Badge>
              </div>
              <CardDescription className="mt-2">{app.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-3">
                  <Users className="h-5 w-5 text-gray-500 mb-1" />
                  <span className="text-sm font-medium">{app.users}</span>
                  <span className="text-xs text-gray-500">Utilisateurs</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-3">
                  <ShoppingBag className="h-5 w-5 text-gray-500 mb-1" />
                  <span className="text-sm font-medium">{app.orders}</span>
                  <span className="text-xs text-gray-500">Commandes</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleOpenApp(`/admin/apps/${app.id}/settings`)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configurer
                </Button>
                <Button size="sm" className="flex-1" onClick={() => handleOpenApp(app.url)}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ouvrir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques Globales</CardTitle>
          <CardDescription>Aperçu des performances de toutes les applications connectées.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] rounded-md border border-dashed border-gray-200 flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <BarChart2 className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-muted-foreground">Graphique des statistiques d'utilisation</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
