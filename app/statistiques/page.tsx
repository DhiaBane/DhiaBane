"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Download, Filter, RefreshCw, TrendingUp, DollarSign, Users } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Overview } from "@/components/overview"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Composant pour les graphiques de comparaison
const ComparisonChart = () => {
  return (
    <div className="h-[300px] w-full flex items-center justify-center bg-gray-100 rounded-md">
      <div className="text-center">
        <TrendingUp className="h-12 w-12 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">Graphique de comparaison</p>
      </div>
    </div>
  )
}

// Composant pour les tableaux de données
const DataTable = () => {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-5 bg-muted p-3 text-sm font-medium">
        <div>Période</div>
        <div>Chiffre d'affaires</div>
        <div>Clients</div>
        <div>Panier moyen</div>
        <div>Croissance</div>
      </div>
      {[
        { period: "Janvier 2025", revenue: "45,231 €", customers: "1,245", average: "36.33 €", growth: "+12.5%" },
        { period: "Février 2025", revenue: "52,845 €", customers: "1,389", average: "38.05 €", growth: "+16.8%" },
        { period: "Mars 2025", revenue: "48,932 €", customers: "1,302", average: "37.58 €", growth: "-7.4%" },
        { period: "Avril 2025", revenue: "51,678 €", customers: "1,356", average: "38.11 €", growth: "+5.6%" },
      ].map((row, index) => (
        <div key={index} className="grid grid-cols-5 border-t p-3 text-sm">
          <div className="font-medium">{row.period}</div>
          <div>{row.revenue}</div>
          <div>{row.customers}</div>
          <div>{row.average}</div>
          <div>
            <Badge
              className={`${row.growth.startsWith("+") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {row.growth}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

// Composant pour les KPIs
const KPICard = ({
  title,
  value,
  change,
  icon,
}: { title: string; value: string; change: string; icon: React.ReactNode }) => {
  const isPositive = change.startsWith("+")
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>{change}</p>
      </CardContent>
    </Card>
  )
}

// Composant pour les alertes
const AlertCard = ({
  title,
  description,
  level,
}: { title: string; description: string; level: "info" | "warning" | "critical" }) => {
  const bgColor = level === "info" ? "bg-blue-50" : level === "warning" ? "bg-amber-50" : "bg-red-50"
  const textColor = level === "info" ? "text-blue-800" : level === "warning" ? "text-amber-800" : "text-red-800"

  return (
    <div className={`p-4 rounded-md ${bgColor} ${textColor} mb-4`}>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm mt-1">{description}</p>
    </div>
  )
}

export default function StatistiquesPage() {
  const [exportFormat, setExportFormat] = useState<string>("pdf")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleExport = () => {
    setIsLoading(true)
    // Simuler un export
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
          <h2 className="text-3xl font-bold tracking-tight">Statistiques avancées</h2>
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
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Retour au tableau de bord
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Chiffre d'affaires"
            value="51,678 €"
            change="+5.6% par rapport au mois dernier"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <KPICard
            title="Clients"
            value="1,356"
            change="+4.1% par rapport au mois dernier"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <KPICard
            title="Panier moyen"
            value="38.11 €"
            change="+1.4% par rapport au mois dernier"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <KPICard
            title="Taux de conversion"
            value="24.5%"
            change="+2.3% par rapport au mois dernier"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="space-y-4">
          <AlertCard
            title="Alerte de performance"
            description="Le chiffre d'affaires du mardi soir est en baisse de 12% par rapport à la moyenne des 3 derniers mois."
            level="warning"
          />
        </div>

        <Tabs defaultValue="apercu" className="space-y-4">
          <TabsList>
            <TabsTrigger value="apercu">Aperçu</TabsTrigger>
            <TabsTrigger value="ventes">Ventes</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="produits">Produits</TabsTrigger>
            <TabsTrigger value="comparaisons">Comparaisons</TabsTrigger>
          </TabsList>

          <TabsContent value="apercu" className="space-y-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Vue d'ensemble</CardTitle>
                <CardDescription>Évolution du chiffre d'affaires sur les 12 derniers mois</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Données mensuelles</CardTitle>
                  <CardDescription>Comparaison des performances sur les 4 derniers mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Répartition des ventes</CardTitle>
                  <CardDescription>Par catégorie de produits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Plats principaux", value: 45, amount: "23,255 €" },
                      { category: "Entrées", value: 25, amount: "12,920 €" },
                      { category: "Desserts", value: 15, amount: "7,752 €" },
                      { category: "Boissons", value: 15, amount: "7,752 €" },
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
            </div>
          </TabsContent>

          <TabsContent value="ventes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyse des ventes</CardTitle>
                <CardDescription>Détail des ventes par période et par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Select defaultValue="daily">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Journalier</SelectItem>
                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        <SelectItem value="monthly">Mensuel</SelectItem>
                        <SelectItem value="yearly">Annuel</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrer
                    </Button>
                  </div>
                  <DataTable />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes par heure</CardTitle>
                  <CardDescription>Répartition horaire des ventes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ComparisonChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ventes par jour</CardTitle>
                  <CardDescription>Répartition des ventes par jour de la semaine</CardDescription>
                </CardHeader>
                <CardContent>
                  <ComparisonChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyse des clients</CardTitle>
                <CardDescription>Segmentation et comportement des clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Segmentation des clients</h3>
                    <div className="space-y-4">
                      {[
                        { segment: "Clients réguliers", value: 35, count: 475 },
                        { segment: "Clients occasionnels", value: 45, count: 610 },
                        { segment: "Nouveaux clients", value: 20, count: 271 },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="font-medium">{item.segment}</div>
                              <div className="text-sm text-muted-foreground">({item.count})</div>
                            </div>
                            <div className="text-sm font-medium">{item.value}%</div>
                          </div>
                          <Progress value={item.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Fidélité des clients</h3>
                    <div className="space-y-4">
                      {[
                        { metric: "Taux de rétention", value: "68%", change: "+3.5%" },
                        { metric: "Fréquence de visite", value: "2.3 / mois", change: "+0.2" },
                        { metric: "Durée moyenne", value: "1h25", change: "+5 min" },
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
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comportement des clients</CardTitle>
                <CardDescription>Analyse des habitudes de consommation</CardDescription>
              </CardHeader>
              <CardContent>
                <ComparisonChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="produits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance des produits</CardTitle>
                <CardDescription>Analyse des ventes et de la rentabilité par produit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
                    <div>Produit</div>
                    <div>Catégorie</div>
                    <div>Quantité vendue</div>
                    <div>Chiffre d'affaires</div>
                    <div>Marge</div>
                    <div>Tendance</div>
                  </div>
                  {[
                    {
                      product: "Steak frites",
                      category: "Plats",
                      quantity: 342,
                      revenue: "8,550 €",
                      margin: "42%",
                      trend: "+12.5%",
                    },
                    {
                      product: "Salade César",
                      category: "Entrées",
                      quantity: 287,
                      revenue: "3,587 €",
                      margin: "65%",
                      trend: "+8.3%",
                    },
                    {
                      product: "Tiramisu",
                      category: "Desserts",
                      quantity: 198,
                      revenue: "1,683 €",
                      margin: "70%",
                      trend: "+5.2%",
                    },
                    {
                      product: "Risotto aux champignons",
                      category: "Plats",
                      quantity: 156,
                      revenue: "2,808 €",
                      margin: "38%",
                      trend: "-3.1%",
                    },
                    {
                      product: "Vin rouge (bouteille)",
                      category: "Boissons",
                      quantity: 124,
                      revenue: "3,720 €",
                      margin: "55%",
                      trend: "+15.7%",
                    },
                  ].map((row, index) => (
                    <div key={index} className="grid grid-cols-6 border-t p-3 text-sm">
                      <div className="font-medium">{row.product}</div>
                      <div>{row.category}</div>
                      <div>{row.quantity}</div>
                      <div>{row.revenue}</div>
                      <div>{row.margin}</div>
                      <div>
                        <Badge
                          className={`${
                            row.trend.startsWith("+") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {row.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
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
                      { product: "Steak frites", value: 100, quantity: 342 },
                      { product: "Salade César", value: 84, quantity: 287 },
                      { product: "Tiramisu", value: 58, quantity: 198 },
                      { product: "Risotto aux champignons", value: 46, quantity: 156 },
                      { product: "Vin rouge (bouteille)", value: 36, quantity: 124 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{item.product}</div>
                          <div className="text-sm text-muted-foreground">{item.quantity} vendus</div>
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
                      { product: "Tiramisu", value: 100, margin: "70%" },
                      { product: "Salade César", value: 93, margin: "65%" },
                      { product: "Vin rouge (bouteille)", value: 79, margin: "55%" },
                      { product: "Steak frites", value: 60, margin: "42%" },
                      { product: "Risotto aux champignons", value: 54, margin: "38%" },
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

          <TabsContent value="comparaisons" className="space-y-4">
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
                            <div className="text-2xl font-bold">51,678 €</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Mois précédent</div>
                            <div className="text-2xl font-bold">48,932 €</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Variation</div>
                            <div className="text-2xl font-bold text-green-500">+5.6%</div>
                          </div>
                        </div>
                        <ComparisonChart />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Nombre de clients</CardTitle>
                      <CardDescription>Comparaison du nombre de clients</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-muted-foreground">Mois en cours</div>
                            <div className="text-2xl font-bold">1,356</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Mois précédent</div>
                            <div className="text-2xl font-bold">1,302</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Variation</div>
                            <div className="text-2xl font-bold text-green-500">+4.1%</div>
                          </div>
                        </div>
                        <ComparisonChart />
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
