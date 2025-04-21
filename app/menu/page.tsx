"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Edit, Plus, Trash2 } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  available: boolean
}

export default function MenuPage() {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Salade César",
      description: "Laitue romaine, parmesan, croûtons, sauce César maison",
      price: 12.5,
      category: "entrées",
      available: true,
    },
    {
      id: 2,
      name: "Soupe à l'oignon",
      description: "Oignons caramélisés, bouillon de bœuf, croûtons, gruyère",
      price: 9.0,
      category: "entrées",
      available: true,
    },
    {
      id: 3,
      name: "Steak frites",
      description: "Entrecôte grillée, frites maison, sauce béarnaise",
      price: 24.5,
      category: "plats",
      available: true,
    },
    {
      id: 4,
      name: "Risotto aux champignons",
      description: "Riz arborio, champignons sauvages, parmesan, huile de truffe",
      price: 18.0,
      category: "plats",
      available: true,
    },
    {
      id: 5,
      name: "Tarte au citron meringuée",
      description: "Pâte sablée, crème au citron, meringue italienne",
      price: 8.5,
      category: "desserts",
      available: true,
    },
    {
      id: 6,
      name: "Mousse au chocolat",
      description: "Chocolat noir 70%, crème fouettée, copeaux de chocolat",
      price: 7.5,
      category: "desserts",
      available: true,
    },
  ]

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
          <h2 className="text-3xl font-bold tracking-tight">Gestion des menus</h2>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un plat
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="default" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Retour au tableau de bord
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="entrées" className="space-y-4">
          <TabsList>
            <TabsTrigger value="entrées">Entrées</TabsTrigger>
            <TabsTrigger value="plats">Plats</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
            <TabsTrigger value="boissons">Boissons</TabsTrigger>
          </TabsList>

          {["entrées", "plats", "desserts", "boissons"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-muted p-3 text-sm font-medium">
                      <div className="col-span-3">Nom</div>
                      <div className="col-span-5">Description</div>
                      <div className="col-span-1">Prix</div>
                      <div className="col-span-1">Disponible</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    {menuItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <div key={item.id} className="grid grid-cols-12 border-t p-3 text-sm">
                          <div className="col-span-3 font-medium">{item.name}</div>
                          <div className="col-span-5 text-muted-foreground">{item.description}</div>
                          <div className="col-span-1">{item.price.toFixed(2)} €</div>
                          <div className="col-span-1">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.available ? "Oui" : "Non"}
                            </span>
                          </div>
                          <div className="col-span-2 flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
