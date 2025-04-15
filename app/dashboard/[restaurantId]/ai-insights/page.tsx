"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area } from "recharts"
import { Brain, TrendingUp, ShoppingCart, Users, AlertTriangle, Lightbulb, RefreshCw } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Données mockées pour les prévisions
const salesForecast = [
  { date: "2025-04-15", actual: 1580, predicted: 1650, lower: 1520, upper: 1780 },
  { date: "2025-04-16", actual: 1690, predicted: 1720, lower: 1590, upper: 1850 },
  { date: "2025-04-17", actual: 1820, predicted: 1850, lower: 1720, upper: 1980 },
  { date: "2025-04-18", actual: 2350, predicted: 2400, lower: 2250, upper: 2550 },
  { date: "2025-04-19", actual: 2780, predicted: 2850, lower: 2700, upper: 3000 },
  { date: "2025-04-20", actual: 2050, predicted: 2100, lower: 1950, upper: 2250 },
  { date: "2025-04-21", actual: 1650, predicted: 1700, lower: 1550, upper: 1850 },
  { date: "2025-04-22", actual: null, predicted: 1750, lower: 1600, upper: 1900 },
  { date: "2025-04-23", actual: null, predicted: 1800, lower: 1650, upper: 1950 },
  { date: "2025-04-24", actual: null, predicted: 1900, lower: 1750, upper: 2050 },
  { date: "2025-04-25", actual: null, predicted: 2500, lower: 2350, upper: 2650 },
  { date: "2025-04-26", actual: null, predicted: 2900, lower: 2750, upper: 3050 },
  { date: "2025-04-27", actual: null, predicted: 2200, lower: 2050, upper: 2350 },
  { date: "2025-04-28", actual: null, predicted: 1800, lower: 1650, upper: 1950 },
]

const inventoryPredictions = [
  { name: "Entrecôte", current: 8, predicted: 22, reorder: true, confidence: 92 },
  { name: "Saumon", current: 12, predicted: 18, reorder: true, confidence: 88 },
  { name: "Vin Rouge (Bordeaux)", current: 6, predicted: 15, reorder: true, confidence: 94 },
  { name: "Pommes de terre", current: 18, predicted: 25, reorder: true, confidence: 86 },
  { name: "Crème fraîche", current: 4, predicted: 8, reorder: true, confidence: 90 },
  { name: "Champignons", current: 3, predicted: 6, reorder: true, confidence: 85 },
  { name: "Huile d'olive", current: 5, predicted: 4, reorder: false, confidence: 82 },
  { name: "Beurre", current: 10, predicted: 12, reorder: true, confidence: 89 },
  { name: "Chocolat", current: 7, predicted: 5, reorder: false, confidence: 84 },
  { name: "Café", current: 15, predicted: 10, reorder: false, confidence: 91 },
]

const staffingPredictions = [
  { day: "Lundi", date: "2025-04-22", lunch: 3, dinner: 4, confidence: 88 },
  { day: "Mardi", date: "2025-04-23", lunch: 3, dinner: 4, confidence: 86 },
  { day: "Mercredi", date: "2025-04-24", lunch: 4, dinner: 5, confidence: 90 },
  { day: "Jeudi", date: "2025-04-25", lunch: 4, dinner: 6, confidence: 92 },
  { day: "Vendredi", date: "2025-04-26", lunch: 5, dinner: 7, confidence: 94 },
  { day: "Samedi", date: "2025-04-27", lunch: 6, dinner: 8, confidence: 95 },
  { day: "Dimanche", date: "2025-04-28", lunch: 5, dinner: 6, confidence: 91 },
]

const customerSegments = [
  { name: "Fidèles réguliers", percentage: 35, growth: 5, avgSpend: 48, visits: 3.2 },
  { name: "Occasionnels", percentage: 25, growth: 2, avgSpend: 62, visits: 1.5 },
  { name: "Nouveaux clients", percentage: 20, growth: 8, avgSpend: 55, visits: 1.0 },
  { name: "Clients événements", percentage: 12, growth: 10, avgSpend: 85, visits: 1.2 },
  { name: "Clients affaires", percentage: 8, growth: -2, avgSpend: 95, visits: 2.1 },
]

const menuOptimizationData = [
  { name: "Steak Frites", popularity: 92, profit: 85, recommendation: "Maintenir" },
  { name: "Salade Niçoise", popularity: 65, profit: 90, recommendation: "Augmenter prix" },
  { name: "Pasta Carbonara", popularity: 88, profit: 75, recommendation: "Maintenir" },
  { name: "Burger Gourmet", popularity: 78, profit: 82, recommendation: "Maintenir" },
  { name: "Risotto aux Champignons", popularity: 45, profit: 70, recommendation: "Repositionner" },
  { name: "Tartare de Saumon", popularity: 55, profit: 88, recommendation: "Promouvoir" },
  { name: "Poulet Rôti", popularity: 72, profit: 65, recommendation: "Optimiser coûts" },
  { name: "Crème Brûlée", popularity: 82, profit: 92, recommendation: "Star" },
  { name: "Tiramisu", popularity: 75, profit: 88, recommendation: "Star" },
  { name: "Mousse au Chocolat", popularity: 60, profit: 85, recommendation: "Promouvoir" },
]

const anomalyDetection = [
  {
    date: "2025-04-10",
    type: "Ventes",
    description: "Baisse soudaine des ventes (-35%) entre 19h et 21h",
    impact: "Moyen",
    suggestion: "Vérifier s'il y avait un événement local ou un problème de service",
  },
  {
    date: "2025-04-12",
    type: "Inventaire",
    description: "Consommation anormale de vin blanc (+60% vs prévision)",
    impact: "Faible",
    suggestion: "Vérifier si promotion spéciale ou erreur de saisie",
  },
  {
    date: "2025-04-15",
    type: "Personnel",
    description: "Temps de service 40% plus long que la moyenne",
    impact: "Élevé",
    suggestion: "Vérifier la formation du personnel ou les processus en cuisine",
  },
  {
    date: "2025-04-18",
    type: "Clients",
    description: "Taux d'annulation des réservations anormalement élevé (28%)",
    impact: "Élevé",
    suggestion: "Vérifier les conditions météo ou événements concurrents",
  },
]

export default function AIInsightsPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const refreshInsights = () => {
    setIsLoading(true)
    // Simuler un chargement
    setTimeout(() => {
      setIsLoading(false)
      setLastUpdate(new Date())
    }, 2000)
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Brain className="mr-2 h-8 w-8 text-primary" />
              Intelligence Artificielle
            </h1>
            <p className="text-muted-foreground">
              Prévisions et recommandations basées sur l'IA pour optimiser votre restaurant
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Dernière mise à jour: {lastUpdate.toLocaleString("fr-FR")}
            </div>
            <Button onClick={refreshInsights} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Actualisation..." : "Actualiser"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="forecasting" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="forecasting">
              <TrendingUp className="mr-2 h-4 w-4" />
              Prévisions
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Inventaire
            </TabsTrigger>
            <TabsTrigger value="customers">
              <Users className="mr-2 h-4 w-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="menu">
              <Lightbulb className="mr-2 h-4 w-4" />
              Optimisation
            </TabsTrigger>
            <TabsTrigger value="anomalies">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Anomalies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forecasting" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Prévisions de ventes et de personnel</h2>
              <div className="flex items-center gap-2">
                <DatePickerWithRange className="w-auto" />
                <Select defaultValue="daily">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Granularité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Par heure</SelectItem>
                    <SelectItem value="daily">Par jour</SelectItem>
                    <SelectItem value="weekly">Par semaine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Prévisions de chiffre d'affaires</CardTitle>
                <CardDescription>
                  Prévisions sur 14 jours avec intervalle de confiance (précision historique: 92%)
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ChartContainer
                  config={{
                    actual: {
                      label: "CA réel",
                      color: "hsl(var(--chart-1))",
                    },
                    predicted: {
                      label: "CA prévu",
                      color: "hsl(var(--chart-2))",
                    },
                    lower: {
                      label: "Borne inférieure",
                      color: "hsl(var(--chart-3))",
                    },
                    upper: {
                      label: "Borne supérieure",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
                        }}
                      />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        name="CA réel (€)"
                        stroke="var(--color-actual)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        name="CA prévu (€)"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="lower"
                        name="Borne inférieure (€)"
                        stroke="transparent"
                        fill="var(--color-lower)"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="upper"
                        name="Borne supérieure (€)"
                        stroke="transparent"
                        fill="var(--color-upper)"
                        fillOpacity={0.2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Prévision des besoins en personnel</CardTitle>
                  <CardDescription>Recommandations basées sur l'affluence prévue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <div>Jour</div>
                      <div>Service midi</div>
                      <div>Service soir</div>
                      <div>Confiance</div>
                    </div>
                    {staffingPredictions.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{day.day}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(day.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}
                          </p>
                        </div>
                        <div className="text-sm font-medium">{day.lunch} serveurs</div>
                        <div className="text-sm font-medium">{day.dinner} serveurs</div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">{day.confidence}%</span>
                          <Progress value={day.confidence} className="w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Basé sur les données historiques et les réservations actuelles
                  </p>
                  <Button variant="outline" size="sm">
                    Exporter
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Facteurs d'influence</CardTitle>
                  <CardDescription>Éléments impactant les prévisions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Météo</h3>
                        <Badge>Impact élevé</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Prévisions de temps ensoleillé pour le weekend (+15% sur terrasse)
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Événements locaux</h3>
                        <Badge>Impact moyen</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Concert au théâtre municipal vendredi et samedi soir
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Saisonnalité</h3>
                        <Badge>Impact élevé</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Début de saison touristique, augmentation des clients de passage
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Campagne marketing</h3>
                        <Badge>Impact moyen</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Promotion en cours sur les réseaux sociaux (+8% de réservations)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gestion intelligente des stocks</h2>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    <SelectItem value="meat">Viandes</SelectItem>
                    <SelectItem value="fish">Poissons</SelectItem>
                    <SelectItem value="vegetables">Légumes</SelectItem>
                    <SelectItem value="drinks">Boissons</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Filtrer</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Prévisions de consommation et recommandations</CardTitle>
                <CardDescription>
                  Basées sur les ventes prévues, les recettes et l'historique de consommation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium border-b pb-2">
                    <div className="w-1/4">Produit</div>
                    <div className="w-1/6 text-center">Stock actuel</div>
                    <div className="w-1/6 text-center">Besoin prévu</div>
                    <div className="w-1/6 text-center">Confiance</div>
                    <div className="w-1/4 text-right">Recommandation</div>
                  </div>
                  {inventoryPredictions.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="w-1/4 font-medium">{item.name}</div>
                      <div className="w-1/6 text-center">{item.current} unités</div>
                      <div className="w-1/6 text-center">{item.predicted} unités</div>
                      <div className="w-1/6 text-center flex items-center justify-center">
                        <span className="text-sm mr-2">{item.confidence}%</span>
                        <Progress value={item.confidence} className="w-16" />
                      </div>
                      <div className="w-1/4 text-right">
                        {item.reorder ? (
                          <Badge className="bg-amber-500">Commander {item.predicted - item.current} unités</Badge>
                        ) : (
                          <Badge className="bg-green-500">Stock suffisant</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">Mise à jour: {lastUpdate.toLocaleString("fr-FR")}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Exporter
                  </Button>
                  <Button size="sm">Générer bon de commande</Button>
                </div>
              </CardFooter>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Optimisation des coûts</CardTitle>
                  <CardDescription>Recommandations pour réduire le gaspillage et les coûts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Réduction du gaspillage</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Potentiel d'économie de 8% en ajustant les portions de garnitures
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Optimisation des fournisseurs</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Regrouper les commandes de produits laitiers pourrait économiser 5% sur les frais de livraison
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Substitution d'ingrédients</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Utiliser des légumes de saison pourrait réduire les coûts de 12% sur certains plats
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tendances de consommation</CardTitle>
                  <CardDescription>Évolution de la consommation des ingrédients clés</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      viandes: {
                        label: "Viandes",
                        color: "hsl(var(--chart-1))",
                      },
                      poissons: {
                        label: "Poissons",
                        color: "hsl(var(--chart-2))",
                      },
                      legumes: {
                        label: "Légumes",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { mois: "Jan", viandes: 120, poissons: 80, legumes: 100 },
                          { mois: "Fév", viandes: 125, poissons: 85, legumes: 105 },
                          { mois: "Mar", viandes: 130, poissons: 90, legumes: 110 },
                          { mois: "Avr", viandes: 135, poissons: 95, legumes: 115 },
                          { mois: "Mai", viandes: 140, poissons: 100, legumes: 120 },
                          { mois: "Juin", viandes: 145, poissons: 105, legumes: 125 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mois" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="viandes"
                          stackId="1"
                          stroke="var(--color-viandes)"
                          fill="var(--color-viandes)"
                        />
                        <Area
                          type="monotone"
                          dataKey="poissons"
                          stackId="1"
                          stroke="var(--color-poissons)"
                          fill="var(--color-poissons)"
                        />
                        <Area
                          type="monotone"
                          dataKey="legumes"
                          stackId="1"
                          stroke="var(--color-legumes)"
                          fill="var(--color-legumes)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Analyse et segmentation clients</h2>
              <div className="flex items-center gap-2">
                <DatePickerWithRange className="w-auto" />
                <Button variant="outline">Filtrer</Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Segmentation clients</CardTitle>
                  <CardDescription>Répartition et évolution des segments clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerSegments.map((segment, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{segment.name}</p>
                          <p className="text-xs text-muted-foreground">{segment.percentage}% des clients</p>
                        </div>
                        <div className="space-y-0.5 text-right">
                          <div className="flex items-center">
                            <span
                              className={`text-sm font-medium ${
                                segment.growth > 0 ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {segment.growth > 0 ? "+" : ""}
                              {segment.growth}%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {segment.avgSpend}€ / {segment.visits} visites par mois
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Voir analyse détaillée
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prédiction de comportement</CardTitle>
                  <CardDescription>Analyse prédictive des comportements clients</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      retention: {
                        label: "Taux de rétention",
                        color: "hsl(var(--chart-1))",
                      },
                      frequency: {
                        label: "Fréquence de visite",
                        color: "hsl(var(--chart-2))",
                      },
                      spend: {
                        label: "Panier moyen",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { mois: "Jan", retention: 65, frequency: 1.8, spend: 42 },
                          { mois: "Fév", retention: 68, frequency: 1.9, spend: 45 },
                          { mois: "Mar", retention: 72, frequency: 2.1, spend: 48 },
                          { mois: "Avr", retention: 75, frequency: 2.2, spend: 52 },
                          { mois: "Mai", retention: 78, frequency: 2.3, spend: 55 },
                          { mois: "Juin", retention: 80, frequency: 2.4, spend: 58 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mois" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="retention"
                          name="Taux de rétention (%)"
                          stroke="var(--color-retention)"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="frequency"
                          name="Fréquence (visites/mois)"
                          stroke="var(--color-frequency)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="spend"
                          name="Panier moyen (€)"
                          stroke="var(--color-spend)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommandations personnalisées</CardTitle>
                <CardDescription>Actions suggérées pour améliorer l'engagement client</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Clients à risque d'attrition</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      42 clients fidèles n'ont pas visité le restaurant depuis plus de 2 mois
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Envoyer offre spéciale
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Clients à fort potentiel</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      78 clients occasionnels montrent des signes d'intérêt croissant
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Programme de fidélisation
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Anniversaires à venir</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      15 clients fidèles fêtent leur anniversaire dans les 2 prochaines semaines
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Envoyer offre anniversaire
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Optimisation du menu</h2>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    <SelectItem value="starters">Entrées</SelectItem>
                    <SelectItem value="mains">Plats</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
                    <SelectItem value="drinks">Boissons</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Filtrer</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Analyse de performance des plats</CardTitle>
                <CardDescription>Matrice popularité/rentabilité et recommandations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium border-b pb-2">
                    <div className="w-1/4">Plat</div>
                    <div className="w-1/5 text-center">Popularité</div>
                    <div className="w-1/5 text-center">Rentabilité</div>
                    <div className="w-1/3 text-right">Recommandation</div>
                  </div>
                  {menuOptimizationData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="w-1/4 font-medium">{item.name}</div>
                      <div className="w-1/5 text-center">
                        <div className="flex items-center justify-center">
                          <span className="text-sm mr-2">{item.popularity}%</span>
                          <Progress value={item.popularity} className="w-16" />
                        </div>
                      </div>
                      <div className="w-1/5 text-center">
                        <div className="flex items-center justify-center">
                          <span className="text-sm mr-2">{item.profit}%</span>
                          <Progress value={item.profit} className="w-16" />
                        </div>
                      </div>
                      <div className="w-1/3 text-right">
                        <Badge
                          className={
                            item.recommendation === "Star"
                              ? "bg-green-500"
                              : item.recommendation === "Promouvoir"
                                ? "bg-blue-500"
                                : item.recommendation === "Maintenir"
                                  ? "bg-gray-500"
                                  : item.recommendation === "Augmenter prix"
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                          }
                        >
                          {item.recommendation}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Basé sur les ventes des 3 derniers mois et l'analyse des coûts
                </p>
                <Button variant="outline" size="sm">
                  Voir rapport détaillé
                </Button>
              </CardFooter>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Suggestions de nouveaux plats</CardTitle>
                  <CardDescription>Basées sur les tendances et les préférences clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Risotto aux asperges</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Les plats végétariens sont en hausse de 18%. Ce plat de saison pourrait combler un manque dans
                        votre offre actuelle.
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">
                          Voir recette
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Tataki de thon</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Les plats fusion asiatiques sont tendance. Ce plat pourrait attirer une clientèle plus jeune.
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">
                          Voir recette
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Dessert sans gluten</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        15% de vos clients recherchent des options sans gluten. Cette option pourrait augmenter les
                        ventes de desserts.
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">
                          Voir recette
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimisation des prix</CardTitle>
                  <CardDescription>Recommandations basées sur l'élasticité-prix</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Salade Niçoise</h3>
                        <Badge className="bg-green-500">+15%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Forte demande et faible élasticité-prix. Augmentation recommandée de 15%.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Risotto aux Champignons</h3>
                        <Badge className="bg-red-500">-10%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Faible rotation. Une réduction de prix pourrait augmenter le volume de ventes.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Vins au verre</h3>
                        <Badge className="bg-green-500">+8%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Marge actuelle inférieure aux standards du marché. Augmentation recommandée.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Menu enfant</h3>
                        <Badge className="bg-amber-500">Maintenir</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Prix compétitif qui attire les familles. Maintenir le prix actuel.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Détection d'anomalies</h2>
              <div className="flex items-center gap-2">
                <DatePickerWithRange className="w-auto" />
                <Button variant="outline">Filtrer</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Anomalies détectées</CardTitle>
                <CardDescription>Écarts significatifs par rapport aux tendances habituelles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {anomalyDetection.map((anomaly, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                          <h3 className="font-medium">{anomaly.type}</h3>
                        </div>
                        <div className="flex items-center">
                          <Badge
                            className={
                              anomaly.impact === "Élevé"
                                ? "bg-red-500"
                                : anomaly.impact === "Moyen"
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                            }
                          >
                            Impact: {anomaly.impact}
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-2">
                            {new Date(anomaly.date).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{anomaly.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Lightbulb className="h-4 w-4 mr-1" />
                        Suggestion: {anomaly.suggestion}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  L'IA surveille en permanence plus de 50 indicateurs pour détecter les anomalies
                </p>
                <Button variant="outline" size="sm">
                  Configurer les alertes
                </Button>
              </CardFooter>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Surveillance en temps réel</CardTitle>
                  <CardDescription>Indicateurs clés sous surveillance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Temps d'attente moyen</p>
                        <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">12 min</span>
                        <Badge className="bg-green-500">Normal</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Taux d'annulation</p>
                        <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">8%</span>
                        <Badge className="bg-green-500">Normal</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Panier moyen</p>
                        <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">42€</span>
                        <Badge className="bg-amber-500">-5%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Satisfaction client</p>
                        <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">4.7/5</span>
                        <Badge className="bg-green-500">Normal</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuration des alertes</CardTitle>
                  <CardDescription>Personnaliser les seuils de détection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Alertes ventes</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Notification si les ventes baissent de plus de 15% par rapport à la moyenne
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">
                          Configurer
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Alertes stocks</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Notification si un ingrédient clé passe sous le seuil critique
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">
                          Configurer
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Alertes satisfaction</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Notification si la note moyenne passe sous 4.2/5
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">
                          Configurer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
