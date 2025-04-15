"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowUpRight,
  AlertTriangle,
  Check,
  Info,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
} from "lucide-react"

// Données mockées pour le tableau de bord de la chaîne
const mockChainData = {
  restaurants: [
    { id: "1", name: "Le Gourmet", location: "Paris", status: "active", revenue: 45800, orders: 1250, customers: 980 },
    { id: "2", name: "La Brasserie", location: "Lyon", status: "active", revenue: 38200, orders: 980, customers: 720 },
    {
      id: "3",
      name: "Le Bistrot",
      location: "Marseille",
      status: "active",
      revenue: 32500,
      orders: 850,
      customers: 650,
    },
    { id: "4", name: "La Table", location: "Bordeaux", status: "active", revenue: 28900, orders: 720, customers: 540 },
    { id: "5", name: "L'Assiette", location: "Lille", status: "maintenance", revenue: 0, orders: 0, customers: 0 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 120000 },
    { month: "Fév", revenue: 135000 },
    { month: "Mar", revenue: 128000 },
    { month: "Avr", revenue: 142000 },
    { month: "Mai", revenue: 160000 },
    { month: "Juin", revenue: 175000 },
    { month: "Juil", revenue: 190000 },
    { month: "Août", revenue: 185000 },
    { month: "Sep", revenue: 165000 },
    { month: "Oct", revenue: 155000 },
    { month: "Nov", revenue: 145000 },
    { month: "Déc", revenue: 180000 },
  ],
  categoryPerformance: [
    { category: "Entrées", revenue: 185000, growth: 5.2 },
    { category: "Plats", revenue: 420000, growth: 8.7 },
    { category: "Desserts", revenue: 150000, growth: 3.1 },
    { category: "Boissons", revenue: 245000, growth: 6.5 },
  ],
  alerts: [
    {
      id: "1",
      type: "warning",
      message: "Stock faible pour 5 produits au restaurant Le Gourmet",
      time: "Il y a 2 heures",
    },
    { id: "2", type: "error", message: "Problème de qualité signalé à La Brasserie", time: "Il y a 5 heures" },
    {
      id: "3",
      type: "info",
      message: "Mise à jour du menu effectuée pour tous les restaurants",
      time: "Il y a 1 jour",
    },
    { id: "4", type: "success", message: "Objectif de vente mensuel atteint pour Le Bistrot", time: "Il y a 2 jours" },
  ],
  topProducts: [
    { id: "1", name: "Entrecôte grillée", category: "Plats", sales: 1250, revenue: 31250 },
    { id: "2", name: "Tiramisu maison", category: "Desserts", sales: 980, revenue: 9800 },
    { id: "3", name: "Salade César", category: "Entrées", sales: 850, revenue: 12750 },
    { id: "4", name: "Vin rouge Bordeaux", category: "Boissons", sales: 720, revenue: 21600 },
    { id: "5", name: "Plateau de fromages", category: "Desserts", sales: 650, revenue: 13000 },
  ],
}

// Composant pour les alertes
function AlertItem({ alert }: { alert: (typeof mockChainData.alerts)[0] }) {
  const icons = {
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    error: <AlertTriangle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <Check className="h-5 w-5 text-green-500" />,
  }

  return (
    <div className="flex items-start space-x-4 rounded-lg border p-4">
      <div className="mt-0.5">{icons[alert.type]}</div>
      <div className="flex-1">
        <p className="text-sm font-medium">{alert.message}</p>
        <p className="text-xs text-muted-foreground">{alert.time}</p>
      </div>
    </div>
  )
}

// Composant pour le statut du restaurant
function RestaurantStatusBadge({ status }: { status: string }) {
  if (status === "active") {
    return <Badge className="bg-green-500">Actif</Badge>
  } else if (status === "maintenance") {
    return (
      <Badge variant="outline" className="border-yellow-500 text-yellow-500">
        Maintenance
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" className="border-red-500 text-red-500">
        Fermé
      </Badge>
    )
  }
}

export default function ChainDashboardPage() {
  const [period, setPeriod] = useState("month")

  // Calcul des statistiques globales
  const totalRevenue = mockChainData.restaurants.reduce((sum, restaurant) => sum + restaurant.revenue, 0)
  const totalOrders = mockChainData.restaurants.reduce((sum, restaurant) => sum + restaurant.orders, 0)
  const totalCustomers = mockChainData.restaurants.reduce((sum, restaurant) => sum + restaurant.customers, 0)
  const activeRestaurants = mockChainData.restaurants.filter((r) => r.status === "active").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord de la chaîne</h1>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button>Exporter</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} €</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+12.5% par rapport au mois précédent</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes totales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+8.2% par rapport au mois précédent</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+5.3% par rapport au mois précédent</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restaurants actifs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeRestaurants} / {mockChainData.restaurants.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeRestaurants / mockChainData.restaurants.length) * 100)}% de disponibilité
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Chiffre d'affaires mensuel</CardTitle>
                <CardDescription>Évolution du chiffre d'affaires sur l'année</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Chiffre d'affaires",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChainData.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        name="Chiffre d'affaires (€)"
                        stroke="var(--color-revenue)"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance par catégorie</CardTitle>
                <CardDescription>Chiffre d'affaires et croissance par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChainData.categoryPerformance.map((category) => (
                    <div key={category.category} className="flex items-center">
                      <div className="w-full space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category.category}</span>
                          <span className="text-sm font-medium">{category.revenue.toLocaleString()} €</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${(category.revenue / 500000) * 100}%` }}
                            />
                          </div>
                          <div className="flex items-center">
                            {category.growth > 0 ? (
                              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                            )}
                            <span className={category.growth > 0 ? "text-xs text-green-500" : "text-xs text-red-500"}>
                              {category.growth > 0 ? "+" : ""}
                              {category.growth}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Alertes récentes</CardTitle>
                <CardDescription>Notifications importantes des restaurants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChainData.alerts.slice(0, 3).map((alert) => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="restaurants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance des restaurants</CardTitle>
              <CardDescription>Comparaison des performances entre les établissements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Emplacement</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Chiffre d'affaires</TableHead>
                    <TableHead className="text-right">Commandes</TableHead>
                    <TableHead className="text-right">Clients</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockChainData.restaurants.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                      <TableCell className="font-medium">{restaurant.name}</TableCell>
                      <TableCell>{restaurant.location}</TableCell>
                      <TableCell>
                        <RestaurantStatusBadge status={restaurant.status} />
                      </TableCell>
                      <TableCell className="text-right">{restaurant.revenue.toLocaleString()} €</TableCell>
                      <TableCell className="text-right">{restaurant.orders.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{restaurant.customers.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Comparaison des revenus</CardTitle>
              <CardDescription>Chiffre d'affaires par restaurant</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Chiffre d'affaires",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockChainData.restaurants.filter((r) => r.status === "active")}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="revenue" name="Chiffre d'affaires (€)" fill="var(--color-revenue)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top produits</CardTitle>
              <CardDescription>Les produits les plus vendus dans tous les restaurants</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead className="text-right">Ventes</TableHead>
                    <TableHead className="text-right">Chiffre d'affaires</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockChainData.topProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">{product.sales.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{product.revenue.toLocaleString()} €</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Répartition des ventes par catégorie</CardTitle>
              <CardDescription>Proportion des ventes par catégorie de produits</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  Entrées: {
                    label: "Entrées",
                    color: "hsl(var(--chart-1))",
                  },
                  Plats: {
                    label: "Plats",
                    color: "hsl(var(--chart-2))",
                  },
                  Desserts: {
                    label: "Desserts",
                    color: "hsl(var(--chart-3))",
                  },
                  Boissons: {
                    label: "Boissons",
                    color: "hsl(var(--chart-4))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "Catégories",
                        Entrées: 185000,
                        Plats: 420000,
                        Desserts: 150000,
                        Boissons: 245000,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="Entrées" fill="var(--color-Entrées)" />
                    <Bar dataKey="Plats" fill="var(--color-Plats)" />
                    <Bar dataKey="Desserts" fill="var(--color-Desserts)" />
                    <Bar dataKey="Boissons" fill="var(--color-Boissons)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les alertes</CardTitle>
              <CardDescription>Notifications et alertes de tous les restaurants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockChainData.alerts.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
