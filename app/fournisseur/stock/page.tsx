"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Plus, Filter, RefreshCw, AlertTriangle, SearchIcon, Download } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface StockItem {
  id: number
  name: string
  category: string
  quantity: number
  unit: string
  minStock: number
  reorderPoint: number
  location: string
  lastUpdated: string
  status: "in-stock" | "low-stock" | "out-of-stock" | "on-order"
}

export default function FournisseurStockPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isExporting, setIsExporting] = useState(false)

  const stockItems: StockItem[] = [
    {
      id: 1,
      name: "Farine de blé T55",
      category: "Ingrédients secs",
      quantity: 250,
      unit: "kg",
      minStock: 100,
      reorderPoint: 150,
      location: "Entrepôt A - Allée 3",
      lastUpdated: "15/04/2025",
      status: "in-stock",
    },
    {
      id: 2,
      name: "Sucre cristal",
      category: "Ingrédients secs",
      quantity: 180,
      unit: "kg",
      minStock: 75,
      reorderPoint: 100,
      location: "Entrepôt A - Allée 2",
      lastUpdated: "14/04/2025",
      status: "in-stock",
    },
    {
      id: 3,
      name: "Huile d'olive extra vierge",
      category: "Huiles et condiments",
      quantity: 45,
      unit: "L",
      minStock: 50,
      reorderPoint: 75,
      location: "Entrepôt B - Allée 1",
      lastUpdated: "12/04/2025",
      status: "low-stock",
    },
    {
      id: 4,
      name: "Viande de bœuf (entrecôte)",
      category: "Viandes",
      quantity: 0,
      unit: "kg",
      minStock: 25,
      reorderPoint: 40,
      location: "Chambre froide C",
      lastUpdated: "10/04/2025",
      status: "out-of-stock",
    },
    {
      id: 5,
      name: "Fromage Comté AOP",
      category: "Produits laitiers",
      quantity: 15,
      unit: "kg",
      minStock: 10,
      reorderPoint: 20,
      location: "Chambre froide B",
      lastUpdated: "13/04/2025",
      status: "in-stock",
    },
    {
      id: 6,
      name: "Tomates fraîches",
      category: "Fruits et légumes",
      quantity: 30,
      unit: "kg",
      minStock: 25,
      reorderPoint: 40,
      location: "Chambre froide A",
      lastUpdated: "15/04/2025",
      status: "low-stock",
    },
    {
      id: 7,
      name: "Vin rouge Bordeaux",
      category: "Boissons",
      quantity: 120,
      unit: "bouteilles",
      minStock: 60,
      reorderPoint: 80,
      location: "Cave - Section A",
      lastUpdated: "08/04/2025",
      status: "in-stock",
    },
    {
      id: 8,
      name: "Chocolat noir 70%",
      category: "Ingrédients secs",
      quantity: 25,
      unit: "kg",
      minStock: 20,
      reorderPoint: 30,
      location: "Entrepôt A - Allée 4",
      lastUpdated: "11/04/2025",
      status: "low-stock",
    },
    {
      id: 9,
      name: "Saumon frais",
      category: "Poissons",
      quantity: 0,
      unit: "kg",
      minStock: 15,
      reorderPoint: 25,
      location: "Chambre froide D",
      lastUpdated: "09/04/2025",
      status: "on-order",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      case "out-of-stock":
        return "bg-red-100 text-red-800"
      case "on-order":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-stock":
        return "En stock"
      case "low-stock":
        return "Stock bas"
      case "out-of-stock":
        return "Rupture"
      case "on-order":
        return "Commandé"
      default:
        return status
    }
  }

  const filteredItems = stockItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = Array.from(new Set(stockItems.map((item) => item.category)))

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      alert("Inventaire exporté avec succès")
    }, 1500)
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
          <h2 className="text-3xl font-bold tracking-tight">Gestion des stocks</h2>
          <div className="flex items-center gap-2">
            <Button onClick={handleExport} disabled={isExporting}>
              {isExporting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Exportation...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </>
              )}
            </Button>
            <Link href="/fournisseur">
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">Inventaire</TabsTrigger>
            <TabsTrigger value="movements">Mouvements</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total des produits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stockItems.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {stockItems.filter((item) => item.status === "in-stock").length} en stock
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Produits en stock bas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stockItems.filter((item) => item.status === "low-stock").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Nécessitent attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ruptures de stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stockItems.filter((item) => item.status === "out-of-stock").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Nécessitent commande</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Produits commandés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stockItems.filter((item) => item.status === "on-order").length}
                  </div>
                  <p className="text-xs text-muted-foreground">En attente de livraison</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inventaire des produits</CardTitle>
                  <CardDescription>Gérez votre stock de produits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                    <div className="relative w-full md:w-auto flex-1">
                      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher un produit..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les catégories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="in-stock">En stock</SelectItem>
                        <SelectItem value="low-stock">Stock bas</SelectItem>
                        <SelectItem value="out-of-stock">Rupture</SelectItem>
                        <SelectItem value="on-order">Commandé</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="w-full md:w-auto">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrer
                    </Button>
                    <Button className="w-full md:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un produit
                    </Button>
                  </div>

                  {filteredItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucun produit ne correspond à votre recherche
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produit</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Quantité</TableHead>
                            <TableHead>Niveau de stock</TableHead>
                            <TableHead>Emplacement</TableHead>
                            <TableHead>Dernière MAJ</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredItems.map((item) => {
                            const stockLevel = (item.quantity / item.minStock) * 100
                            let stockColor = "bg-green-500"
                            if (stockLevel < 50) stockColor = "bg-amber-500"
                            if (stockLevel < 30) stockColor = "bg-red-500"

                            return (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>
                                  {item.quantity} {item.unit}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={stockLevel > 100 ? 100 : stockLevel}
                                      className="h-2 w-[100px]"
                                      indicatorClassName={stockColor}
                                    />
                                    <span className="text-xs">{Math.round(stockLevel)}%</span>
                                  </div>
                                </TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{item.lastUpdated}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(item.status)}>{getStatusText(item.status)}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="outline" size="sm">
                                    Ajuster
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Affichage de {filteredItems.length} produits sur {stockItems.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Précédent
                    </Button>
                    <Button variant="outline" size="sm">
                      Suivant
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Alertes de stock</CardTitle>
                  <CardDescription>Produits nécessitant votre attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stockItems
                      .filter((item) => item.status === "low-stock" || item.status === "out-of-stock")
                      .map((item) => (
                        <Alert
                          key={item.id}
                          variant={item.status === "out-of-stock" ? "destructive" : "default"}
                          className={
                            item.status === "out-of-stock"
                              ? "border-red-200 bg-red-50"
                              : "border-yellow-200 bg-yellow-50"
                          }
                        >
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>{item.status === "out-of-stock" ? "Rupture de stock" : "Stock bas"}</AlertTitle>
                          <AlertDescription className="flex flex-col">
                            <span>
                              {item.name} - {item.quantity} {item.unit} restants
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Seuil de réapprovisionnement: {item.reorderPoint} {item.unit}
                            </span>
                          </AlertDescription>
                        </Alert>
                      ))}

                    {stockItems.filter((item) => item.status === "low-stock" || item.status === "out-of-stock")
                      .length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">Aucune alerte de stock</div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Commander les produits en alerte</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition par catégorie</CardTitle>
                  <CardDescription>Nombre de produits par catégorie</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const count = stockItems.filter((item) => item.category === category).length
                      const percentage = (count / stockItems.length) * 100
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{category}</span>
                            <span className="text-sm text-muted-foreground">
                              {count} produit{count > 1 ? "s" : ""}
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="movements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mouvements de stock</CardTitle>
                <CardDescription>Historique des entrées et sorties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Rechercher un mouvement..." className="pl-8" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="in">Entrées</SelectItem>
                      <SelectItem value="out">Sorties</SelectItem>
                      <SelectItem value="adjustment">Ajustements</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Produit</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Quantité</TableHead>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Référence</TableHead>
                        <TableHead>Note</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>15/04/2025 14:30</TableCell>
                        <TableCell>Farine de blé T55</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Entrée</Badge>
                        </TableCell>
                        <TableCell>+50 kg</TableCell>
                        <TableCell>Jean Dupont</TableCell>
                        <TableCell>LIV-2025-042</TableCell>
                        <TableCell>Livraison hebdomadaire</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>15/04/2025 10:15</TableCell>
                        <TableCell>Tomates fraîches</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800">Sortie</Badge>
                        </TableCell>
                        <TableCell>-15 kg</TableCell>
                        <TableCell>Marie Martin</TableCell>
                        <TableCell>CMD-2025-156</TableCell>
                        <TableCell>Commande Restaurant Le Gourmet</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>14/04/2025 16:45</TableCell>
                        <TableCell>Sucre cristal</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Entrée</Badge>
                        </TableCell>
                        <TableCell>+100 kg</TableCell>
                        <TableCell>Jean Dupont</TableCell>
                        <TableCell>LIV-2025-041</TableCell>
                        <TableCell>Réapprovisionnement mensuel</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>14/04/2025 11:20</TableCell>
                        <TableCell>Fromage Comté AOP</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">Ajustement</Badge>
                        </TableCell>
                        <TableCell>-2 kg</TableCell>
                        <TableCell>Sophie Blanc</TableCell>
                        <TableCell>INV-2025-012</TableCell>
                        <TableCell>Correction après inventaire</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>13/04/2025 09:30</TableCell>
                        <TableCell>Huile d'olive extra vierge</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800">Sortie</Badge>
                        </TableCell>
                        <TableCell>-10 L</TableCell>
                        <TableCell>Marie Martin</TableCell>
                        <TableCell>CMD-2025-155</TableCell>
                        <TableCell>Commande Bistrot du Coin</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Affichage de 5 mouvements sur 124</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Commandes de réapprovisionnement</CardTitle>
                <CardDescription>Gérez vos commandes fournisseurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Rechercher une commande..." className="pl-8" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="ordered">Commandé</SelectItem>
                        <SelectItem value="received">Reçu</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrer
                    </Button>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvelle commande
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Référence</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Fournisseur</TableHead>
                        <TableHead>Produits</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Date de livraison</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">CMD-F-2025-042</TableCell>
                        <TableCell>15/04/2025</TableCell>
                        <TableCell>Moulins Dupont</TableCell>
                        <TableCell>3 produits</TableCell>
                        <TableCell>1,245.50 €</TableCell>
                        <TableCell>20/04/2025</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">CMD-F-2025-041</TableCell>
                        <TableCell>12/04/2025</TableCell>
                        <TableCell>Primeurs Bio</TableCell>
                        <TableCell>5 produits</TableCell>
                        <TableCell>876.25 €</TableCell>
                        <TableCell>18/04/2025</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">Commandé</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">CMD-F-2025-040</TableCell>
                        <TableCell>10/04/2025</TableCell>
                        <TableCell>Viandes Premium</TableCell>
                        <TableCell>2 produits</TableCell>
                        <TableCell>1,532.75 €</TableCell>
                        <TableCell>15/04/2025</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Reçu</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">CMD-F-2025-039</TableCell>
                        <TableCell>08/04/2025</TableCell>
                        <TableCell>Poissonnerie Maritime</TableCell>
                        <TableCell>1 produit</TableCell>
                        <TableCell>945.00 €</TableCell>
                        <TableCell>12/04/2025</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800">Annulé</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Affichage de 4 commandes sur 28</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyse des stocks</CardTitle>
                <CardDescription>Visualisez les tendances et performances de votre stock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Taux de rotation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.2</div>
                      <p className="text-xs text-green-500">+0.3 par rapport au mois dernier</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Valeur du stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">45,678 €</div>
                      <p className="text-xs text-green-500">+5.2% par rapport au mois dernier</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Taux de rupture</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.4%</div>
                      <p className="text-xs text-red-500">+0.8% par rapport au mois dernier</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">Produits les plus demandés</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produit</TableHead>
                          <TableHead>Catégorie</TableHead>
                          <TableHead>Quantité vendue</TableHead>
                          <TableHead>Fréquence de commande</TableHead>
                          <TableHead>Tendance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Farine de blé T55</TableCell>
                          <TableCell>Ingrédients secs</TableCell>
                          <TableCell>450 kg</TableCell>
                          <TableCell>Hebdomadaire</TableCell>
                          <TableCell className="text-green-500">↑ 12%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Huile d'olive extra vierge</TableCell>
                          <TableCell>Huiles et condiments</TableCell>
                          <TableCell>120 L</TableCell>
                          <TableCell>Bi-mensuelle</TableCell>
                          <TableCell className="text-green-500">↑ 8%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Viande de bœuf (entrecôte)</TableCell>
                          <TableCell>Viandes</TableCell>
                          <TableCell>85 kg</TableCell>
                          <TableCell>Hebdomadaire</TableCell>
                          <TableCell className="text-red-500">↓ 3%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Tomates fraîches</TableCell>
                          <TableCell>Fruits et légumes</TableCell>
                          <TableCell>210 kg</TableCell>
                          <TableCell>Bi-hebdomadaire</TableCell>
                          <TableCell className="text-green-500">↑ 15%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Vin rouge Bordeaux</TableCell>
                          <TableCell>Boissons</TableCell>
                          <TableCell>95 bouteilles</TableCell>
                          <TableCell>Mensuelle</TableCell>
                          <TableCell className="text-green-500">↑ 5%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
