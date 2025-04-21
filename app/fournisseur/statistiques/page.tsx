"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Download, Filter, RefreshCw, TrendingUp, DollarSign, Users, Package } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Composant pour les graphiques de statistiques
const StatisticsChart = () => {
  return (
    <div className="h-[300px] w-full flex items-center justify-center bg-gray-100 rounded-md">
      <div className="text-center">
        <TrendingUp className="h-12 w-12 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">Graphique statistique</p>
      </div>
    </div>
  )
}

export default function FournisseurStatistiquesPage() {
  const [exportFormat, setExportFormat] = useState<string>("pdf")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [timeRange, setTimeRange] = useState<string>("month")

  const handleExport = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert(`Rapport exporté en format ${exportFormat.toUpperCase()}`)
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
          <h2 className="text-3xl font-bold tracking-tight">Statistiques</h2>
          <div className="flex items-center gap-2">
            <CalendarDateRangePicker />
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} disabled={isLoading}>
              {isLoading ? (
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125,430 €</div>
              <p className="text-xs text-green-500">+12.5% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-green-500">+3 par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits vendus</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,543</div>
              <p className="text-xs text-green-500">+15.2% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245 €</div>
              <p className="text-xs text-red-500">-2.3% par rapport au mois dernier</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="sales">Ventes</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="comparison">Comparaisons</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Évolution du chiffre d'affaires</CardTitle>
                    <CardDescription>Suivi mensuel des ventes</CardDescription>
                  </div>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Cette semaine</SelectItem>
                      <SelectItem value="month">Ce mois</SelectItem>
                      <SelectItem value="quarter">Ce trimestre</SelectItem>
                      <SelectItem value="year">Cette année</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <StatisticsChart />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Répartition des ventes</CardTitle>
                  <CardDescription>Par catégorie de produits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Ingrédients secs", value: 35, amount: "43,900 €" },
                      { category: "Huiles et condiments", value: 15, amount: "18,815 €" },
                      { category: "Viandes", value: 25, amount: "31,358 €" },
                      { category: "Produits laitiers", value: 10, amount: "12,543 €" },
                      { category: "Fruits et légumes", value: 10, amount: "12,543 €" },
                      { category: "Boissons", value: 5, amount: "6,271 €" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{item.category}</div>
                            <div className="text-sm text-muted-foreground">{item.amount}</div>
                          </div>
                          <div className="text-sm font-medium">{item.value}%</div>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Top clients</CardTitle>
                  <CardDescription>Par volume d'achat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Restaurant Le Gourmet", value: 30, amount: "37,629 €" },
                      { name: "Bistrot du Coin", value: 25, amount: "31,358 €" },
                      { name: "La Brasserie", value: 20, amount: "25,086 €" },
                      { name: "Le Petit Café", value: 15, amount: "18,815 €" },
                      { name: "Restaurant L'Étoile", value: 10, amount: "12,543 €" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.amount}</div>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Analyse des ventes</CardTitle>
                    <CardDescription>Détail des ventes par période</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="monthly">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Journalier</SelectItem>
                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        <SelectItem value="monthly">Mensuel</SelectItem>
                        <SelectItem value="quarterly">Trimestriel</SelectItem>
                        <SelectItem value="yearly">Annuel</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrer
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Période</TableHead>
                        <TableHead>Chiffre d'affaires</TableHead>
                        <TableHead>Commandes</TableHead>
                        <TableHead>Panier moyen</TableHead>
                        <TableHead>Marge</TableHead>
                        <TableHead>Croissance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Avril 2025</TableCell>
                        <TableCell>125,430 €</TableCell>
                        <TableCell>98</TableCell>
                        <TableCell>1,280 €</TableCell>
                        <TableCell>42%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">+12.5%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Mars 2025</TableCell>
                        <TableCell>111,500 €</TableCell>
                        <TableCell>92</TableCell>
                        <TableCell>1,212 €</TableCell>
                        <TableCell>40%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">+8.3%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Février 2025</TableCell>
                        <TableCell>103,000 €</TableCell>
                        <TableCell>85</TableCell>
                        <TableCell>1,212 €</TableCell>
                        <TableCell>39%</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800">-2.1%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Janvier 2025</TableCell>
                        <TableCell>105,200 €</TableCell>
                        <TableCell>90</TableCell>
                        <TableCell>1,169 €</TableCell>
                        <TableCell>38%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">+5.2%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Décembre 2024</TableCell>
                        <TableCell>100,000 €</TableCell>
                        <TableCell>82</TableCell>
                        <TableCell>1,220 €</TableCell>
                        <TableCell>41%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">+15.3%</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes par jour de la semaine</CardTitle>
                  <CardDescription>Répartition des ventes sur la semaine</CardDescription>
                </CardHeader>
                <CardContent>
                  <StatisticsChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ventes par heure</CardTitle>
                  <CardDescription>Répartition horaire des ventes</CardDescription>
                </CardHeader>
                <CardContent>
                  <StatisticsChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Performance des produits</CardTitle>
                    <CardDescription>Analyse des ventes par produit</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les catégories</SelectItem>
                        <SelectItem value="ingredients">Ingrédients secs</SelectItem>
                        <SelectItem value="oils">Huiles et condiments</SelectItem>
                        <SelectItem value="meat">Viandes</SelectItem>
                        <SelectItem value="dairy">Produits laitiers</SelectItem>
                        <SelectItem value="vegetables">Fruits et légumes</SelectItem>
                        <SelectItem value="beverages">Boissons</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrer
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Quantité vendue</TableHead>
                        <TableHead>Chiffre d'affaires</TableHead>
                        <TableHead>Marge</TableHead>
                        <TableHead>Tendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Farine de blé T55</TableCell>
                        <TableCell>Ingrédients secs</TableCell>
                        <TableCell>1,250 kg</TableCell>
                        <TableCell>1,562.50 €</TableCell>
                        <TableCell>45%</TableCell>
                        <TableCell className="text-green-500">↑ 12%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Huile d'olive extra vierge</TableCell>
                        <TableCell>Huiles et condiments</TableCell>
                        <TableCell>320 L</TableCell>
                        <TableCell>2,720.00 €</TableCell>
                        <TableCell>50%</TableCell>
                        <TableCell className="text-green-500">↑ 8%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Viande de bœuf (entrecôte)</TableCell>
                        <TableCell>Viandes</TableCell>
                        <TableCell>450 kg</TableCell>
                        <TableCell>11,205.00 €</TableCell>
                        <TableCell>35%</TableCell>
                        <TableCell className="text-red-500">↓ 3%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fromage Comté AOP</TableCell>
                        <TableCell>Produits laitiers</TableCell>
                        <TableCell>180 kg</TableCell>
                        <TableCell>3,375.00 €</TableCell>
                        <TableCell>40%</TableCell>
                        <TableCell className="text-green-500">↑ 5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Tomates fraîches</TableCell>
                        <TableCell>Fruits et légumes</TableCell>
                        <TableCell>850 kg</TableCell>
                        <TableCell>2,975.00 €</TableCell>
                        <TableCell>55%</TableCell>
                        <TableCell className="text-green-500">↑ 15%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Produits les plus vendus</CardTitle>
                  <CardDescription>Top 5 des produits par quantité</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { product: "Farine de blé T55", value: 100, quantity: "1,250 kg" },
                      { product: "Tomates fraîches", value: 68, quantity: "850 kg" },
                      { product: "Viande de bœuf (entrecôte)", value: 36, quantity: "450 kg" },
                      { product: "Huile d'olive extra vierge", value: 26, quantity: "320 L" },
                      { product: "Fromage Comté AOP", value: 14, quantity: "180 kg" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{item.product}</div>
                          <div className="text-sm text-muted-foreground">{item.quantity}</div>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Produits les plus rentables</CardTitle>
                  <CardDescription>Top 5 des produits par marge</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { product: "Tomates fraîches", value: 100, margin: "55%" },
                      { product: "Huile d'olive extra vierge", value: 91, margin: "50%" },
                      { product: "Farine de blé T55", value: 82, margin: "45%" },
                      { product: "Fromage Comté AOP", value: 73, margin: "40%" },
                      { product: "Viande de bœuf (entrecôte)", value: 64, margin: "35%" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{item.product}</div>
                          <div className="text-sm text-muted-foreground">Marge: {item.margin}</div>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Analyse des clients</CardTitle>
                    <CardDescription>Performance par client</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Rechercher un client..." className="w-[250px]" />
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrer
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Commandes</TableHead>
                        <TableHead>Chiffre d'affaires</TableHead>
                        <TableHead>Panier moyen</TableHead>
                        <TableHead>Fréquence</TableHead>
                        <TableHead>Tendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Restaurant Le Gourmet</TableCell>
                        <TableCell>32</TableCell>
                        <TableCell>37,629 €</TableCell>
                        <TableCell>1,176 €</TableCell>
                        <TableCell>Hebdomadaire</TableCell>
                        <TableCell className="text-green-500">↑ 15%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bistrot du Coin</TableCell>
                        <TableCell>25</TableCell>
                        <TableCell>31,358 €</TableCell>
                        <TableCell>1,254 €</TableCell>
                        <TableCell>Hebdomadaire</TableCell>
                        <TableCell className="text-green-500">↑ 8%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">La Brasserie</TableCell>
                        <TableCell>18</TableCell>
                        <TableCell>25,086 €</TableCell>
                        <TableCell>1,394 €</TableCell>
                        <TableCell>Bi-mensuelle</TableCell>
                        <TableCell className="text-red-500">↓ 3%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Le Petit Café</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>18,815 €</TableCell>
                        <TableCell>1,254 €</TableCell>
                        <TableCell>Bi-mensuelle</TableCell>
                        <TableCell className="text-green-500">↑ 12%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Restaurant L'Étoile</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>12,543 €</TableCell>
                        <TableCell>1,568 €</TableCell>
                        <TableCell>Mensuelle</TableCell>
                        <TableCell className="text-green-500">↑ 5%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Segmentation des clients</CardTitle>
                  <CardDescription>Par volume d'achat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { segment: "Grands comptes (>30K€)", value: 25, count: 3 },
                      { segment: "Comptes moyens (10K€-30K€)", value: 35, count: 8 },
                      { segment: "Petits comptes (<10K€)", value: 40, count: 31 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{item.segment}</div>
                            <div className="text-sm text-muted-foreground">({item.count} clients)</div>
                          </div>
                          <div className="text-sm font-medium">{item.value}%</div>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Fidélité des clients</CardTitle>
                  <CardDescription>Analyse de la rétention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: "Taux de rétention", value: "85%", change: "+3.5%" },
                      { metric: "Durée moyenne relation", value: "2.3 ans", change: "+0.2" },
                      { metric: "Fréquence d'achat", value: "2.5 / mois", change: "+0.3" },
                      { metric: "Taux de croissance clients", value: "12%", change: "+2%" },
                      { metric: "Taux d'acquisition", value: "8 / mois", change: "+1" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div className="font-medium">{item.metric}</div>
                        <div className="text-right">
                          <div className="font-bold">{item.value}</div>
                          <div className="text-xs text-green-500">{item.change}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comparaisons</CardTitle>
                <CardDescription>Comparez vos performances avec des périodes précédentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Période actuelle</label>
                      <Select defaultValue="current-month">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une période" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="current-month">Mois en cours</SelectItem>
                          <SelectItem value="current-quarter">Trimestre en cours</SelectItem>
                          <SelectItem value="current-year">Année en cours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Période de comparaison</label>
                      <Select defaultValue="previous-month">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une période" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="previous-month">Mois précédent</SelectItem>
                          <SelectItem value="previous-quarter">Trimestre précédent</SelectItem>
                          <SelectItem value="previous-year">Année précédente</SelectItem>
                          <SelectItem value="same-period-last-year">Même période l'an dernier</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Comparer
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chiffre d'affaires</CardTitle>
                      <CardDescription>Comparaison du chiffre d'affaires</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-muted-foreground">Mois en cours</div>
                            <div className="text-2xl font-bold">125,430 €</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Mois précédent</div>
                            <div className="text-2xl font-bold">111,500 €</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Variation</div>
                            <div className="text-2xl font-bold text-green-500">+12.5%</div>
                          </div>
                        </div>
                        <StatisticsChart />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Nombre de commandes</CardTitle>
                      <CardDescription>Comparaison du nombre de commandes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-muted-foreground">Mois en cours</div>
                            <div className="text-2xl font-bold">98</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Mois précédent</div>
                            <div className="text-2xl font-bold">92</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Variation</div>
                            <div className="text-2xl font-bold text-green-500">+6.5%</div>
                          </div>
                        </div>
                        <StatisticsChart />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
