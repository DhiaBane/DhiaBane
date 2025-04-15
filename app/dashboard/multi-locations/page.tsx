"use client"

import { Switch } from "@/components/ui/switch"

import { useState } from "react"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Map,
  BarChart3,
  Settings,
  Plus,
  Search,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  DollarSign,
  Utensils,
} from "lucide-react"
import { DateRangePicker } from "@/components/ui/date-range-picker"

// Types pour les données
interface Location {
  id: string
  name: string
  address: string
  status: "online" | "issue" | "offline"
  revenue: number
  revenueChange: number
  customers: number
  customersChange: number
  staffCount: number
  openSince: string
}

interface PerformanceMetric {
  location: string
  revenue: number
  customers: number
  avgTicket: number
  staffUtilization: number
}

// Données fictives
const locations: Location[] = [
  {
    id: "1",
    name: "Le Central Paris",
    address: "15 Rue de Rivoli, 75001 Paris",
    status: "online",
    revenue: 12450,
    revenueChange: 8.5,
    customers: 345,
    customersChange: 12.3,
    staffCount: 18,
    openSince: "2018",
  },
  {
    id: "2",
    name: "Bistro Lyon",
    address: "22 Rue Mercière, 69002 Lyon",
    status: "issue",
    revenue: 8750,
    revenueChange: -2.1,
    customers: 278,
    customersChange: 5.7,
    staffCount: 12,
    openSince: "2019",
  },
  {
    id: "3",
    name: "Côte Marseille",
    address: "45 Quai des Belges, 13001 Marseille",
    status: "online",
    revenue: 9850,
    revenueChange: 15.2,
    customers: 312,
    customersChange: 18.5,
    staffCount: 14,
    openSince: "2020",
  },
  {
    id: "4",
    name: "Terrasse Bordeaux",
    address: "8 Place de la Bourse, 33000 Bordeaux",
    status: "online",
    revenue: 7650,
    revenueChange: 6.8,
    customers: 245,
    customersChange: 3.2,
    staffCount: 10,
    openSince: "2021",
  },
  {
    id: "5",
    name: "Alpin Chamonix",
    address: "120 Rue des Moulins, 74400 Chamonix",
    status: "offline",
    revenue: 0,
    revenueChange: -100,
    customers: 0,
    customersChange: -100,
    staffCount: 8,
    openSince: "2022",
  },
]

const performanceData: PerformanceMetric[] = [
  { location: "Le Central Paris", revenue: 12450, customers: 345, avgTicket: 36.1, staffUtilization: 92 },
  { location: "Bistro Lyon", revenue: 8750, customers: 278, avgTicket: 31.5, staffUtilization: 78 },
  { location: "Côte Marseille", revenue: 9850, customers: 312, avgTicket: 31.6, staffUtilization: 85 },
  { location: "Terrasse Bordeaux", revenue: 7650, customers: 245, avgTicket: 31.2, staffUtilization: 82 },
  { location: "Alpin Chamonix", revenue: 0, customers: 0, avgTicket: 0, staffUtilization: 0 },
]

export default function MultiLocationsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filtrer les établissements en fonction de la recherche
  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculer les totaux
  const totalRevenue = locations.reduce((sum, location) => sum + location.revenue, 0)
  const totalCustomers = locations.reduce((sum, location) => sum + location.customers, 0)
  const totalStaff = locations.reduce((sum, location) => sum + location.staffCount, 0)
  const onlineLocations = locations.filter((location) => location.status === "online").length

  // Fonction pour afficher le statut
  const getStatusBadge = (status: Location["status"]) => {
    switch (status) {
      case "online":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" /> En ligne
          </Badge>
        )
      case "issue":
        return (
          <Badge className="bg-yellow-500">
            <AlertTriangle className="mr-1 h-3 w-3" /> Problème
          </Badge>
        )
      case "offline":
        return (
          <Badge className="bg-red-500">
            <Clock className="mr-1 h-3 w-3" /> Fermé
          </Badge>
        )
    }
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Building2 className="mr-2 h-8 w-8 text-primary" />
              Tableau Multi-Établissements
            </h1>
            <p className="text-muted-foreground">
              Gérez et analysez tous vos établissements depuis une interface centralisée
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsLoading((prev) => !prev)} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Actualisation..." : "Actualiser"}
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un établissement
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un établissement..."
              className="pl-8 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DateRangePicker />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              <BarChart3 className="mr-2 h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="locations">
              <Map className="mr-2 h-4 w-4" />
              Établissements
            </TabsTrigger>
            <TabsTrigger value="performance">
              <BarChart3 className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Chiffre d'affaires total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} €</div>
                  <p className="text-xs text-muted-foreground">+5.2% par rapport au mois dernier</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clients servis</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8.1% par rapport au mois dernier</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Personnel total</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStaff}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalStaff / locations.length} employés par établissement en moyenne
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Statut des établissements</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {onlineLocations}/{locations.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((onlineLocations / locations.length) * 100)}% des établissements en ligne
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Établissements</CardTitle>
                <CardDescription>Vue d'ensemble de tous vos établissements et leur performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLocations.map((location) => (
                    <div key={location.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-muted-foreground">{location.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(location.status)}
                        <div className="text-right">
                          <p className="font-medium">{location.revenue.toLocaleString()} €</p>
                          <p
                            className={`text-sm flex items-center ${location.revenueChange >= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {location.revenueChange >= 0 ? (
                              <ArrowUpRight className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(location.revenueChange)}%
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Voir tous les établissements
                </Button>
              </CardFooter>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Alertes récentes</CardTitle>
                  <CardDescription>Problèmes et notifications importantes des établissements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg space-y-1">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        <p className="font-medium">Bistro Lyon - Problème de stock</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Niveau critique pour 5 ingrédients. Commande automatique déclenchée.
                      </p>
                      <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                    </div>
                    <div className="p-3 border rounded-lg space-y-1">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        <p className="font-medium">Alpin Chamonix - Fermeture temporaire</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Établissement fermé pour rénovation jusqu'au 15/06/2025.
                      </p>
                      <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                    </div>
                    <div className="p-3 border rounded-lg space-y-1">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        <p className="font-medium">Bistro Lyon - Pic de réservations</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        +45% de réservations pour ce weekend. Personnel supplémentaire recommandé.
                      </p>
                      <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir toutes les alertes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performances comparées</CardTitle>
                  <CardDescription>Comparaison des performances entre établissements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Chiffre d'affaires</p>
                        <p className="text-sm font-medium">Le Central Paris (+15%)</p>
                      </div>
                      <div className="space-y-1">
                        {locations
                          .filter((l) => l.status !== "offline")
                          .map((location) => (
                            <div key={`revenue-${location.id}`} className="flex items-center gap-2">
                              <p className="text-sm w-32 truncate">{location.name}</p>
                              <div className="w-full bg-secondary h-2 rounded-full">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{
                                    width: `${(location.revenue / Math.max(...locations.map((l) => l.revenue))) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Clients</p>
                        <p className="text-sm font-medium">Le Central Paris (+10%)</p>
                      </div>
                      <div className="space-y-1">
                        {locations
                          .filter((l) => l.status !== "offline")
                          .map((location) => (
                            <div key={`customers-${location.id}`} className="flex items-center gap-2">
                              <p className="text-sm w-32 truncate">{location.name}</p>
                              <div className="w-full bg-secondary h-2 rounded-full">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{
                                    width: `${(location.customers / Math.max(...locations.map((l) => l.customers))) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Ticket moyen</p>
                        <p className="text-sm font-medium">Le Central Paris (36.1€)</p>
                      </div>
                      <div className="space-y-1">
                        {performanceData
                          .filter((l) => l.avgTicket > 0)
                          .map((data) => (
                            <div key={`ticket-${data.location}`} className="flex items-center gap-2">
                              <p className="text-sm w-32 truncate">{data.location}</p>
                              <div className="w-full bg-secondary h-2 rounded-full">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{
                                    width: `${(data.avgTicket / Math.max(...performanceData.map((d) => d.avgTicket))) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir l'analyse complète
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des établissements</CardTitle>
                <CardDescription>Gérez tous vos établissements et leurs paramètres spécifiques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLocations.map((location) => (
                    <div key={location.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{location.name}</p>
                            <p className="text-sm text-muted-foreground">{location.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(location.status)}
                          <p className="text-sm text-muted-foreground">Ouvert depuis {location.openSince}</p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="p-3 border rounded-lg space-y-1">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                            <p className="text-sm font-medium">Chiffre d'affaires</p>
                          </div>
                          <p className="text-lg font-bold">{location.revenue.toLocaleString()} €</p>
                          <p
                            className={`text-xs flex items-center ${location.revenueChange >= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {location.revenueChange >= 0 ? (
                              <ArrowUpRight className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(location.revenueChange)}% vs mois dernier
                          </p>
                        </div>

                        <div className="p-3 border rounded-lg space-y-1">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-muted-foreground mr-2" />
                            <p className="text-sm font-medium">Clients</p>
                          </div>
                          <p className="text-lg font-bold">{location.customers}</p>
                          <p
                            className={`text-xs flex items-center ${location.customersChange >= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {location.customersChange >= 0 ? (
                              <ArrowUpRight className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(location.customersChange)}% vs mois dernier
                          </p>
                        </div>

                        <div className="p-3 border rounded-lg space-y-1">
                          <div className="flex items-center">
                            <Utensils className="h-4 w-4 text-muted-foreground mr-2" />
                            <p className="text-sm font-medium">Ticket moyen</p>
                          </div>
                          <p className="text-lg font-bold">
                            {location.customers > 0 ? (location.revenue / location.customers).toFixed(2) : "0.00"} €
                          </p>
                          <p className="text-xs text-muted-foreground">Par client</p>
                        </div>

                        <div className="p-3 border rounded-lg space-y-1">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-muted-foreground mr-2" />
                            <p className="text-sm font-medium">Personnel</p>
                          </div>
                          <p className="text-lg font-bold">{location.staffCount}</p>
                          <p className="text-xs text-muted-foreground">Employés</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Paramètres
                        </Button>
                        <Button variant="outline" size="sm">
                          Inventaire
                        </Button>
                        <Button variant="outline" size="sm">
                          Personnel
                        </Button>
                        <Button size="sm">Tableau de bord</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Affichage de {filteredLocations.length} établissements sur {locations.length}
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un établissement
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyse comparative des performances</CardTitle>
                <CardDescription>
                  Comparez les performances de vos établissements sur différentes métriques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="w-full md:w-[250px]">
                      <Label>Métrique à comparer</Label>
                      <Select defaultValue="revenue">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une métrique" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revenue">Chiffre d'affaires</SelectItem>
                          <SelectItem value="customers">Nombre de clients</SelectItem>
                          <SelectItem value="avgTicket">Ticket moyen</SelectItem>
                          <SelectItem value="staffUtilization">Utilisation du personnel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full md:w-[250px]">
                      <Label>Période</Label>
                      <Select defaultValue="month">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une période" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Cette semaine</SelectItem>
                          <SelectItem value="month">Ce mois</SelectItem>
                          <SelectItem value="quarter">Ce trimestre</SelectItem>
                          <SelectItem value="year">Cette année</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline">Appliquer les filtres</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Chiffre d'affaires par établissement</h3>
                    <div className="space-y-3">
                      {performanceData
                        .filter((d) => d.revenue > 0)
                        .map((data) => (
                          <div key={`perf-${data.location}`} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{data.location}</p>
                              <p className="text-sm font-medium">{data.revenue.toLocaleString()} €</p>
                            </div>
                            <div className="w-full bg-secondary h-3 rounded-full">
                              <div
                                className="bg-primary h-3 rounded-full"
                                style={{
                                  width: `${(data.revenue / Math.max(...performanceData.map((d) => d.revenue))) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-medium">Nombre de clients</h3>
                      <div className="space-y-2">
                        {performanceData
                          .filter((d) => d.customers > 0)
                          .map((data) => (
                            <div key={`cust-${data.location}`} className="flex items-center justify-between">
                              <p className="text-sm">{data.location}</p>
                              <p className="text-sm font-medium">{data.customers}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Ticket moyen</h3>
                      <div className="space-y-2">
                        {performanceData
                          .filter((d) => d.avgTicket > 0)
                          .map((data) => (
                            <div key={`ticket-${data.location}`} className="flex items-center justify-between">
                              <p className="text-sm">{data.location}</p>
                              <p className="text-sm font-medium">{data.avgTicket.toFixed(2)} €</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Utilisation du personnel</h3>
                    <div className="space-y-2">
                      {performanceData
                        .filter((d) => d.staffUtilization > 0)
                        .map((data) => (
                          <div key={`staff-${data.location}`} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm">{data.location}</p>
                              <p className="text-sm font-medium">{data.staffUtilization}%</p>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full">
                              <div
                                className={`h-2 rounded-full ${
                                  data.staffUtilization > 90
                                    ? "bg-red-500"
                                    : data.staffUtilization > 80
                                      ? "bg-green-500"
                                      : "bg-yellow-500"
                                }`}
                                style={{ width: `${data.staffUtilization}%` }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">Dernière mise à jour: Aujourd'hui à 10:45</p>
                <Button>Télécharger le rapport</Button>
              </CardFooter>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tendances mensuelles</CardTitle>
                  <CardDescription>Évolution des performances sur les 6 derniers mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-lg">
                    <p className="text-muted-foreground">Graphique des tendances mensuelles</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir les détails
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition des ventes</CardTitle>
                  <CardDescription>Répartition des ventes par catégorie et établissement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-lg">
                    <p className="text-muted-foreground">Graphique de répartition des ventes</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir les détails
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres multi-établissements</CardTitle>
                <CardDescription>Configurez les paramètres globaux pour tous vos établissements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Synchronisation des données</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Fréquence de synchronisation</Label>
                        <Select defaultValue="15">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une fréquence" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">Toutes les 5 minutes</SelectItem>
                            <SelectItem value="15">Toutes les 15 minutes</SelectItem>
                            <SelectItem value="30">Toutes les 30 minutes</SelectItem>
                            <SelectItem value="60">Toutes les heures</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Priorité des données</Label>
                        <Select defaultValue="central">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une priorité" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="central">Serveur central prioritaire</SelectItem>
                            <SelectItem value="local">Serveurs locaux prioritaires</SelectItem>
                            <SelectItem value="timestamp">Selon horodatage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Gestion des menus</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Menu central</p>
                          <p className="text-sm text-muted-foreground">
                            Utiliser un menu central pour tous les établissements
                          </p>
                        </div>
                        <Switch id="central-menu" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Variations locales</p>
                          <p className="text-sm text-muted-foreground">
                            Autoriser des variations de prix et d'ingrédients par établissement
                          </p>
                        </div>
                        <Switch id="local-variations" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Approbation des changements</p>
                          <p className="text-sm text-muted-foreground">
                            Exiger une approbation centrale pour les changements de menu
                          </p>
                        </div>
                        <Switch id="menu-approval" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Gestion des fournisseurs</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Fournisseurs centralisés</p>
                          <p className="text-sm text-muted-foreground">
                            Utiliser des fournisseurs centralisés pour tous les établissements
                          </p>
                        </div>
                        <Switch id="central-suppliers" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Fournisseurs locaux</p>
                          <p className="text-sm text-muted-foreground">
                            Autoriser l'ajout de fournisseurs locaux par établissement
                          </p>
                        </div>
                        <Switch id="local-suppliers" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Commandes groupées</p>
                          <p className="text-sm text-muted-foreground">
                            Regrouper les commandes de plusieurs établissements
                          </p>
                        </div>
                        <Switch id="grouped-orders" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Rapports et analyses</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Rapports consolidés</p>
                          <p className="text-sm text-muted-foreground">
                            Générer des rapports consolidés pour tous les établissements
                          </p>
                        </div>
                        <Switch id="consolidated-reports" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Alertes de performance</p>
                          <p className="text-sm text-muted-foreground">
                            Recevoir des alertes en cas d'écart de performance significatif
                          </p>
                        </div>
                        <Switch id="performance-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Benchmarking automatique</p>
                          <p className="text-sm text-muted-foreground">
                            Comparer automatiquement les performances entre établissements
                          </p>
                        </div>
                        <Switch id="auto-benchmarking" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Réinitialiser</Button>
                <Button>Enregistrer les paramètres</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
