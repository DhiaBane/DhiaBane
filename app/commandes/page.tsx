"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Filter, Plus } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  table: string
  server: string
  items: number
  total: number
  status: "en cours" | "prêt" | "servi" | "payé" | "annulé"
  time: string
}

export default function CommandesPage() {
  const orders: Order[] = [
    {
      id: "CMD-001",
      table: "Table 5",
      server: "Marie L.",
      items: 4,
      total: 78.5,
      status: "en cours",
      time: "19:30",
    },
    {
      id: "CMD-002",
      table: "Table 12",
      server: "Jean D.",
      items: 3,
      total: 45.0,
      status: "prêt",
      time: "19:45",
    },
    {
      id: "CMD-003",
      table: "Table 8",
      server: "Sophie M.",
      items: 6,
      total: 124.75,
      status: "servi",
      time: "20:00",
    },
    {
      id: "CMD-004",
      table: "Table 3",
      server: "Pierre B.",
      items: 2,
      total: 32.5,
      status: "payé",
      time: "20:15",
    },
    {
      id: "CMD-005",
      table: "Table 10",
      server: "Marie L.",
      items: 5,
      total: 95.25,
      status: "en cours",
      time: "20:30",
    },
  ]

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "en cours":
        return "bg-blue-100 text-blue-800"
      case "prêt":
        return "bg-amber-100 text-amber-800"
      case "servi":
        return "bg-green-100 text-green-800"
      case "payé":
        return "bg-purple-100 text-purple-800"
      case "annulé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Gestion des commandes</h2>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle commande
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="default" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Retour au tableau de bord
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="actives" className="space-y-4">
          <TabsList>
            <TabsTrigger value="actives">Commandes actives</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="actives" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Commandes en cours</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-muted p-3 text-sm font-medium">
                    <div>ID</div>
                    <div>Table</div>
                    <div>Serveur</div>
                    <div>Articles</div>
                    <div>Total</div>
                    <div>Statut</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {orders.map((order) => (
                    <div key={order.id} className="grid grid-cols-7 border-t p-3 text-sm">
                      <div className="font-medium">{order.id}</div>
                      <div>{order.table}</div>
                      <div>{order.server}</div>
                      <div>{order.items}</div>
                      <div>{order.total.toFixed(2)} €</div>
                      <div>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historique" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  L'historique des commandes sera disponible prochainement.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistiques" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Les statistiques des commandes seront disponibles prochainement.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
