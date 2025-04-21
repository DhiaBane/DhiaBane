"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Plus, Filter, Percent, Calendar, Tag, Users } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Promotion {
  id: string
  name: string
  description: string
  type: "percentage" | "fixed" | "buy_x_get_y" | "bundle"
  value: string
  startDate: string
  endDate: string | null
  minPurchase: string | null
  applicableProducts: string[]
  eligibleClients: string
  status: "active" | "scheduled" | "expired" | "draft"
  usageCount: number
}

export default function FournisseurPromotionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreatingPromotion, setIsCreatingPromotion] = useState(false)

  const promotions: Promotion[] = [
    {
      id: "PROMO-2025-001",
      name: "Printemps 2025",
      description: "Offre spéciale de printemps sur tous les produits frais",
      type: "percentage",
      value: "15%",
      startDate: "01/04/2025",
      endDate: "30/04/2025",
      minPurchase: "500 €",
      applicableProducts: ["Fruits et légumes", "Produits laitiers"],
      eligibleClients: "Tous les clients",
      status: "active",
      usageCount: 12,
    },
    {
      id: "PROMO-2025-002",
      name: "Nouveaux clients",
      description: "Offre de bienvenue pour les nouveaux clients",
      type: "percentage",
      value: "10%",
      startDate: "01/01/2025",
      endDate: null,
      minPurchase: null,
      applicableProducts: ["Tous les produits"],
      eligibleClients: "Nouveaux clients",
      status: "active",
      usageCount: 8,
    },
    {
      id: "PROMO-2025-003",
      name: "Achetez 10kg, obtenez 2kg gratuits",
      description: "Promotion sur la farine de blé T55",
      type: "buy_x_get_y",
      value: "Achetez 10kg, obtenez 2kg gratuits",
      startDate: "15/03/2025",
      endDate: "15/05/2025",
      minPurchase: null,
      applicableProducts: ["Farine de blé T55"],
      eligibleClients: "Tous les clients",
      status: "active",
      usageCount: 5,
    },
    {
      id: "PROMO-2025-004",
      name: "Remise été 2025",
      description: "Promotion estivale sur les boissons",
      type: "fixed",
      value: "50 €",
      startDate: "01/06/2025",
      endDate: "31/08/2025",
      minPurchase: "300 €",
      applicableProducts: ["Boissons"],
      eligibleClients: "Tous les clients",
      status: "scheduled",
      usageCount: 0,
    },
    {
      id: "PROMO-2025-005",
      name: "Pack dégustation",
      description: "Offre spéciale sur le pack dégustation de vins",
      type: "bundle",
      value: "15% sur le pack",
      startDate: "01/03/2025",
      endDate: "31/03/2025",
      minPurchase: null,
      applicableProducts: ["Vins"],
      eligibleClients: "Clients premium",
      status: "expired",
      usageCount: 15,
    },
    {
      id: "PROMO-2025-006",
      name: "Offre fidélité",
      description: "Remise pour les clients fidèles",
      type: "percentage",
      value: "5%",
      startDate: "01/01/2025",
      endDate: "31/12/2025",
      minPurchase: "1000 €",
      applicableProducts: ["Tous les produits"],
      eligibleClients: "Clients existants",
      status: "active",
      usageCount: 25,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "scheduled":
        return "Planifiée"
      case "expired":
        return "Expirée"
      case "draft":
        return "Brouillon"
      default:
        return status
    }
  }

  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || promotion.status === statusFilter
    const matchesType = typeFilter === "all" || promotion.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

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
          <h2 className="text-3xl font-bold tracking-tight">Promotions</h2>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsCreatingPromotion(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle promotion
            </Button>
            <Link href="/fournisseur">
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promotions actives</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{promotions.filter((promo) => promo.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">Sur {promotions.length} promotions au total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisation totale</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{promotions.reduce((sum, promo) => sum + promo.usageCount, 0)}</div>
              <p className="text-xs text-green-500">+15% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remise moyenne</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
              <p className="text-xs text-muted-foreground">Sur les promotions en pourcentage</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promotions à venir</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {promotions.filter((promo) => promo.status === "scheduled").length}
              </div>
              <p className="text-xs text-muted-foreground">Planifiées pour les prochains mois</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Toutes les promotions</TabsTrigger>
            <TabsTrigger value="active">Actives</TabsTrigger>
            <TabsTrigger value="scheduled">Planifiées</TabsTrigger>
            <TabsTrigger value="expired">Expirées</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des promotions</CardTitle>
                <CardDescription>Créez et gérez vos offres promotionnelles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                  <div className="relative w-full md:w-auto flex-1">
                    <Input
                      placeholder="Rechercher une promotion..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actives</SelectItem>
                      <SelectItem value="scheduled">Planifiées</SelectItem>
                      <SelectItem value="expired">Expirées</SelectItem>
                      <SelectItem value="draft">Brouillons</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="percentage">Pourcentage</SelectItem>
                      <SelectItem value="fixed">Montant fixe</SelectItem>
                      <SelectItem value="buy_x_get_y">Achetez X, obtenez Y</SelectItem>
                      <SelectItem value="bundle">Pack/Bundle</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                </div>

                {filteredPromotions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucune promotion ne correspond à votre recherche
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Valeur</TableHead>
                          <TableHead>Période</TableHead>
                          <TableHead>Produits</TableHead>
                          <TableHead>Utilisations</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPromotions.map((promotion) => (
                          <TableRow key={promotion.id}>
                            <TableCell className="font-medium">
                              <div>{promotion.name}</div>
                              <div className="text-sm text-muted-foreground">{promotion.description}</div>
                            </TableCell>
                            <TableCell>
                              {promotion.type === "percentage"
                                ? "Pourcentage"
                                : promotion.type === "fixed"
                                  ? "Montant fixe"
                                  : promotion.type === "buy_x_get_y"
                                    ? "Achetez X, obtenez Y"
                                    : "Pack/Bundle"}
                            </TableCell>
                            <TableCell>{promotion.value}</TableCell>
                            <TableCell>
                              <div>{promotion.startDate}</div>
                              {promotion.endDate && (
                                <div className="text-sm text-muted-foreground">au {promotion.endDate}</div>
                              )}
                              {!promotion.endDate && <div className="text-sm text-muted-foreground">Permanent</div>}
                            </TableCell>
                            <TableCell>
                              {promotion.applicableProducts.map((product, index) => (
                                <Badge key={index} variant="outline" className="mr-1 mb-1">
                                  {product}
                                </Badge>
                              ))}
                            </TableCell>
                            <TableCell>{promotion.usageCount}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(promotion.status)}>
                                {getStatusText(promotion.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                Modifier
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Affichage de {filteredPromotions.length} promotions sur {promotions.length}
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
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Promotions actives</CardTitle>
                <CardDescription>Promotions actuellement en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promotions
                    .filter((promo) => promo.status === "active")
                    .map((promotion) => (
                      <Card key={promotion.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>{promotion.name}</CardTitle>
                            <Badge className={getStatusColor(promotion.status)}>
                              {getStatusText(promotion.status)}
                            </Badge>
                          </div>
                          <CardDescription>{promotion.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Type</div>
                              <div className="font-medium">
                                {promotion.type === "percentage"
                                  ? "Pourcentage"
                                  : promotion.type === "fixed"
                                    ? "Montant fixe"
                                    : promotion.type === "buy_x_get_y"
                                      ? "Achetez X, obtenez Y"
                                      : "Pack/Bundle"}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Valeur</div>
                              <div className="font-medium">{promotion.value}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Période</div>
                              <div className="font-medium">
                                {promotion.startDate}
                                {promotion.endDate ? ` au ${promotion.endDate}` : " (Permanent)"}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Achat minimum</div>
                              <div className="font-medium">{promotion.minPurchase || "Aucun"}</div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-sm text-muted-foreground mb-1">Produits applicables</div>
                            <div className="flex flex-wrap gap-1">
                              {promotion.applicableProducts.map((product, index) => (
                                <Badge key={index} variant="outline">
                                  {product}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-sm text-muted-foreground mb-1">Clients éligibles</div>
                            <div className="font-medium">{promotion.eligibleClients}</div>
                          </div>
                          <div className="mt-4">
                            <div className="text-sm text-muted-foreground mb-1">Utilisations</div>
                            <div className="font-medium">{promotion.usageCount} utilisations</div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Désactiver
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                  {promotions.filter((promo) => promo.status === "active").length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">Aucune promotion active pour le moment</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Promotions planifiées</CardTitle>
                <CardDescription>Promotions à venir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promotions
                    .filter((promo) => promo.status === "scheduled")
                    .map((promotion) => (
                      <Card key={promotion.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>{promotion.name}</CardTitle>
                            <Badge className={getStatusColor(promotion.status)}>
                              {getStatusText(promotion.status)}
                            </Badge>
                          </div>
                          <CardDescription>{promotion.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Type</div>
                              <div className="font-medium">
                                {promotion.type === "percentage"
                                  ? "Pourcentage"
                                  : promotion.type === "fixed"
                                    ? "Montant fixe"
                                    : promotion.type === "buy_x_get_y"
                                      ? "Achetez X, obtenez Y"
                                      : "Pack/Bundle"}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Valeur</div>
                              <div className="font-medium">{promotion.value}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Période</div>
                              <div className="font-medium">
                                {promotion.startDate}
                                {promotion.endDate ? ` au ${promotion.endDate}` : " (Permanent)"}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Achat minimum</div>
                              <div className="font-medium">{promotion.minPurchase || "Aucun"}</div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-sm text-muted-foreground mb-1">Produits applicables</div>
                            <div className="flex flex-wrap gap-1">
                              {promotion.applicableProducts.map((product, index) => (
                                <Badge key={index} variant="outline">
                                  {product}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-sm text-muted-foreground mb-1">Clients éligibles</div>
                            <div className="font-medium">{promotion.eligibleClients}</div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Annuler
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                  {promotions.filter((promo) => promo.status === "scheduled").length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucune promotion planifiée pour le moment
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expired" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Promotions expirées</CardTitle>
                <CardDescription>Historique des promotions terminées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Valeur</TableHead>
                        <TableHead>Période</TableHead>
                        <TableHead>Utilisations</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {promotions
                        .filter((promo) => promo.status === "expired")
                        .map((promotion) => (
                          <TableRow key={promotion.id}>
                            <TableCell className="font-medium">
                              <div>{promotion.name}</div>
                              <div className="text-sm text-muted-foreground">{promotion.description}</div>
                            </TableCell>
                            <TableCell>
                              {promotion.type === "percentage"
                                ? "Pourcentage"
                                : promotion.type === "fixed"
                                  ? "Montant fixe"
                                  : promotion.type === "buy_x_get_y"
                                    ? "Achetez X, obtenez Y"
                                    : "Pack/Bundle"}
                            </TableCell>
                            <TableCell>{promotion.value}</TableCell>
                            <TableCell>
                              <div>{promotion.startDate}</div>
                              {promotion.endDate && (
                                <div className="text-sm text-muted-foreground">au {promotion.endDate}</div>
                              )}
                            </TableCell>
                            <TableCell>{promotion.usageCount}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                Réactiver
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>

                {promotions.filter((promo) => promo.status === "expired").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">Aucune promotion expirée pour le moment</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyse des promotions</CardTitle>
                <CardDescription>Performance et impact des promotions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center bg-gray-100 rounded-md mb-6">
                  <div className="text-center">
                    <Percent className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Graphique d'analyse des promotions</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24.5%</div>
                      <p className="text-xs text-green-500">+3.2% par rapport au mois dernier</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Valeur moyenne des commandes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,450 €</div>
                      <p className="text-xs text-green-500">+8.5% par rapport au mois dernier</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">ROI des promotions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">320%</div>
                      <p className="text-xs text-green-500">+15% par rapport au mois dernier</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Promotions les plus performantes</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Promotion</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Utilisations</TableHead>
                          <TableHead>Chiffre d'affaires généré</TableHead>
                          <TableHead>Coût</TableHead>
                          <TableHead>ROI</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Offre fidélité</TableCell>
                          <TableCell>Pourcentage (5%)</TableCell>
                          <TableCell>25</TableCell>
                          <TableCell>25,000 €</TableCell>
                          <TableCell>1,250 €</TableCell>
                          <TableCell className="text-green-500">2000%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Printemps 2025</TableCell>
                          <TableCell>Pourcentage (15%)</TableCell>
                          <TableCell>12</TableCell>
                          <TableCell>15,000 €</TableCell>
                          <TableCell>2,250 €</TableCell>
                          <TableCell className="text-green-500">667%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pack dégustation</TableCell>
                          <TableCell>Bundle (15%)</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell>12,000 €</TableCell>
                          <TableCell>1,800 €</TableCell>
                          <TableCell className="text-green-500">667%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {isCreatingPromotion && (
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle promotion</CardTitle>
              <CardDescription>Définissez les détails de votre offre promotionnelle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="promo-name">Nom de la promotion</Label>
                    <Input id="promo-name" placeholder="Ex: Offre de printemps 2025" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-type">Type de promotion</Label>
                    <Select defaultValue="percentage">
                      <SelectTrigger id="promo-type">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Pourcentage</SelectItem>
                        <SelectItem value="fixed">Montant fixe</SelectItem>
                        <SelectItem value="buy_x_get_y">Achetez X, obtenez Y</SelectItem>
                        <SelectItem value="bundle">Pack/Bundle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-value">Valeur</Label>
                    <Input id="promo-value" placeholder="Ex: 15%" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-min-purchase">Achat minimum (optionnel)</Label>
                    <Input id="promo-min-purchase" placeholder="Ex: 500 €" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-start-date">Date de début</Label>
                    <Input id="promo-start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-end-date">Date de fin (optionnel)</Label>
                    <Input id="promo-end-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promo-description">Description</Label>
                  <Textarea
                    id="promo-description"
                    placeholder="Décrivez votre promotion en quelques mots..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Produits applicables</Label>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="all-products" />
                      <label
                        htmlFor="all-products"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tous les produits
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ingredients" />
                      <label
                        htmlFor="ingredients"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Ingrédients secs
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="oils" />
                      <label
                        htmlFor="oils"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Huiles et condiments
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="meat" />
                      <label
                        htmlFor="meat"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Viandes
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dairy" />
                      <label
                        htmlFor="dairy"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Produits laitiers
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vegetables" />
                      <label
                        htmlFor="vegetables"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Fruits et légumes
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="beverages" />
                      <label
                        htmlFor="beverages"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Boissons
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Clients éligibles</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="all-clients" defaultChecked />
                      <label
                        htmlFor="all-clients"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tous les clients
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="new-clients" />
                      <label
                        htmlFor="new-clients"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Nouveaux clients uniquement
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="existing-clients" />
                      <label
                        htmlFor="existing-clients"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Clients existants uniquement
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium-clients" />
                      <label
                        htmlFor="premium-clients"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Clients premium uniquement
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="active-status">Activer immédiatement</Label>
                    <Switch id="active-status" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsCreatingPromotion(false)}>
                Annuler
              </Button>
              <Button>Créer la promotion</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
