"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Plus, SearchIcon } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"
import { Progress } from "@/components/ui/progress"

interface InventoryItem {
  id: number
  name: string
  category: string
  quantity: number
  unit: string
  minStock: number
  supplier: string
}

export default function InventairePage() {
  const inventoryItems: InventoryItem[] = [
    {
      id: 1,
      name: "Farine",
      category: "Ingrédients secs",
      quantity: 25,
      unit: "kg",
      minStock: 10,
      supplier: "Moulins Dupont",
    },
    {
      id: 2,
      name: "Sucre",
      category: "Ingrédients secs",
      quantity: 15,
      unit: "kg",
      minStock: 5,
      supplier: "Sucreries Martin",
    },
    {
      id: 3,
      name: "Beurre",
      category: "Produits laitiers",
      quantity: 8,
      unit: "kg",
      minStock: 5,
      supplier: "Ferme Duval",
    },
    {
      id: 4,
      name: "Lait",
      category: "Produits laitiers",
      quantity: 12,
      unit: "L",
      minStock: 10,
      supplier: "Ferme Duval",
    },
    {
      id: 5,
      name: "Tomates",
      category: "Légumes",
      quantity: 3,
      unit: "kg",
      minStock: 5,
      supplier: "Primeurs Bio",
    },
    {
      id: 6,
      name: "Pommes de terre",
      category: "Légumes",
      quantity: 20,
      unit: "kg",
      minStock: 15,
      supplier: "Primeurs Bio",
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
          <h2 className="text-3xl font-bold tracking-tight">Gestion des stocks</h2>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un produit
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="default" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Retour au tableau de bord
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Rechercher un produit..." className="pl-8" />
                </div>
                <Button variant="outline">Filtrer</Button>
                <Button variant="outline">Exporter</Button>
              </div>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted p-3 text-sm font-medium">
                  <div className="col-span-3">Produit</div>
                  <div className="col-span-2">Catégorie</div>
                  <div className="col-span-1">Quantité</div>
                  <div className="col-span-1">Unité</div>
                  <div className="col-span-2">Niveau de stock</div>
                  <div className="col-span-2">Fournisseur</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                {inventoryItems.map((item) => {
                  const stockLevel = (item.quantity / item.minStock) * 100
                  let stockColor = "bg-green-500"
                  if (stockLevel < 50) stockColor = "bg-amber-500"
                  if (stockLevel < 30) stockColor = "bg-red-500"

                  return (
                    <div key={item.id} className="grid grid-cols-12 border-t p-3 text-sm">
                      <div className="col-span-3 font-medium">{item.name}</div>
                      <div className="col-span-2">{item.category}</div>
                      <div className="col-span-1">{item.quantity}</div>
                      <div className="col-span-1">{item.unit}</div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Progress value={stockLevel} className="h-2" indicatorClassName={stockColor} />
                          <span className="text-xs">{Math.round(stockLevel)}%</span>
                        </div>
                      </div>
                      <div className="col-span-2">{item.supplier}</div>
                      <div className="col-span-1 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Ajuster
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
