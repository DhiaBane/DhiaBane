"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  Droplets,
  Trash2,
  Plus,
  Search,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle2,
  Truck,
  Lightbulb,
  Recycle,
  ThermometerSun,
  Wind,
  Award,
  Download,
} from "lucide-react"
import { DateRangePicker } from "@/components/ui/date-range-picker"

// Types pour les données
interface SustainabilityMetric {
  id: string
  name: string
  value: number
  unit: string
  change: number
  target: number
  status: "good" | "warning" | "critical"
}

interface WasteItem {
  id: string
  category: string
  amount: number
  unit: string
  trend: number
  recyclable: boolean
  compostable: boolean
}

interface SupplierSustainability {
  id: string
  name: string
  score: number
  distance: number
  certifications: string[]
  carbonFootprint: number
}

interface EnergyConsumption {
  month: string
  electricity: number
  gas: number
  water: number
}

// Données fictives
const sustainabilityMetrics: SustainabilityMetric[] = [
  {
    id: "1",
    name: "Empreinte carbone",
    value: 12.5,
    unit: "tonnes CO2e",
    change: -8.5,
    target: 10,
    status: "warning",
  },
  {
    id: "2",
    name: "Consommation d'eau",
    value: 450,
    unit: "m³",
    change: -12.3,
    target: 400,
    status: "warning",
  },
  {
    id: "3",
    name: "Déchets alimentaires",
    value: 85,
    unit: "kg",
    change: -15.2,
    target: 75,
    status: "warning",
  },
  {
    id: "4",
    name: "Énergie renouvelable",
    value: 35,
    unit: "%",
    change: 10.5,
    target: 50,
    status: "warning",
  },
  {
    id: "5",
    name: "Produits locaux",
    value: 68,
    unit: "%",
    change: 5.2,
    target: 75,
    status: "warning",
  },
  {
    id: "6",
    name: "Emballages recyclables",
    value: 82,
    unit: "%",
    change: 7.8,
    target: 90,
    status: "warning",
  },
]

const wasteItems: WasteItem[] = [
  {
    id: "1",
    category: "Restes alimentaires",
    amount: 45.2,
    unit: "kg",
    trend: -5.3,
    recyclable: false,
    compostable: true,
  },
  {
    id: "2",
    category: "Emballages plastiques",
    amount: 12.8,
    unit: "kg",
    trend: -8.7,
    recyclable: true,
    compostable: false,
  },
  {
    id: "3",
    category: "Papier et carton",
    amount: 18.5,
    unit: "kg",
    trend: -2.1,
    recyclable: true,
    compostable: true,
  },
  {
    id: "4",
    category: "Verre",
    amount: 22.3,
    unit: "kg",
    trend: 0.5,
    recyclable: true,
    compostable: false,
  },
  {
    id: "5",
    category: "Huiles usagées",
    amount: 8.7,
    unit: "L",
    trend: -12.4,
    recyclable: true,
    compostable: false,
  },
]

const suppliers: SupplierSustainability[] = [
  {
    id: "1",
    name: "Ferme Bio Locale",
    score: 92,
    distance: 15,
    certifications: ["Bio", "Local", "Éthique"],
    carbonFootprint: 0.8,
  },
  {
    id: "2",
    name: "Primeurs Régionaux",
    score: 85,
    distance: 35,
    certifications: ["Local", "Agriculture raisonnée"],
    carbonFootprint: 1.2,
  },
  {
    id: "3",
    name: "Viandes & Volailles Durables",
    score: 78,
    distance: 45,
    certifications: ["Bien-être animal", "Sans antibiotiques"],
    carbonFootprint: 2.5,
  },
  {
    id: "4",
    name: "Épicerie Vrac Éco",
    score: 95,
    distance: 8,
    certifications: ["Zéro déchet", "Bio", "Commerce équitable"],
    carbonFootprint: 0.5,
  },
  {
    id: "5",
    name: "Boissons Artisanales",
    score: 82,
    distance: 25,
    certifications: ["Artisanal", "Circuit court"],
    carbonFootprint: 1.1,
  },
]

const energyData: EnergyConsumption[] = [
  { month: "Jan", electricity: 1250, gas: 850, water: 320 },
  { month: "Fév", electricity: 1180, gas: 920, water: 310 },
  { month: "Mar", electricity: 1100, gas: 780, water: 290 },
  { month: "Avr", electricity: 980, gas: 650, water: 280 },
  { month: "Mai", electricity: 920, gas: 520, water: 300 },
  { month: "Juin", electricity: 950, gas: 480, water: 350 },
]

export default function SustainabilityPage({ params }: { params?: { restaurantId: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filtrer les éléments en fonction de la recherche
  const filteredWaste = wasteItems.filter((item) => item.category.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculer les totaux
  const totalWaste = wasteItems.reduce((sum, item) => sum + item.amount, 0)
  const averageSupplierScore = suppliers.reduce((sum, supplier) => sum + supplier.score, 0) / suppliers.length
  const totalCarbonFootprint = suppliers.reduce((sum, supplier) => sum + supplier.carbonFootprint, 0)

  // Fonction pour afficher le statut
  const getStatusBadge = (status: SustainabilityMetric["status"]) => {
    switch (status) {
      case "good":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Bon
          </Badge>
        )
      case "warning":
        return (
          <Badge className="bg-yellow-500">
            <AlertTriangle className="mr-1 h-3 w-3" /> À améliorer
          </Badge>
        )
      case "critical":
        return (
          <Badge className="bg-red-500">
            <AlertTriangle className="mr-1 h-3 w-3" /> Critique
          </Badge>
        )
    }
  }

  return (
    <DashboardShell restaurantId={params?.restaurantId}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Leaf className="mr-2 h-8 w-8 text-green-500" />
              Outils de Durabilité
            </h1>
            <p className="text-muted-foreground">Suivez et améliorez l'impact environnemental de votre établissement</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsLoading((prev) => !prev)} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Actualisation..." : "Actualiser"}
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Rapport ESG
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
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
              <Leaf className="mr-2 h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="waste">
              <Trash2 className="mr-2 h-4 w-4" />
              Gestion des déchets
            </TabsTrigger>
            <TabsTrigger value="suppliers">
              <Truck className="mr-2 h-4 w-4" />
              Fournisseurs durables
            </TabsTrigger>
            <TabsTrigger value="energy">
              <Lightbulb className="mr-2 h-4 w-4" />
              Énergie & Eau
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Score de durabilité global</CardTitle>
                  <Award className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78/100</div>
                  <Progress value={78} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">+5.2% par rapport au trimestre dernier</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Déchets totaux</CardTitle>
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalWaste.toFixed(1)} kg</div>
                  <p className="text-xs text-green-500 flex items-center">
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                    8.1% par rapport au mois dernier
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Empreinte carbone</CardTitle>
                  <ThermometerSun className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.5 tonnes CO2e</div>
                  <p className="text-xs text-green-500 flex items-center">
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                    3.2% par rapport au mois dernier
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Métriques de durabilité</CardTitle>
                <CardDescription>Suivi des indicateurs clés de performance environnementale</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sustainabilityMetrics.map((metric) => (
                    <div key={metric.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {metric.name === "Empreinte carbone" && (
                            <ThermometerSun className="h-4 w-4 text-orange-500" />
                          )}
                          {metric.name === "Consommation d'eau" && <Droplets className="h-4 w-4 text-blue-500" />}
                          {metric.name === "Déchets alimentaires" && <Trash2 className="h-4 w-4 text-red-500" />}
                          {metric.name === "Énergie renouvelable" && <Wind className="h-4 w-4 text-green-500" />}
                          {metric.name === "Produits locaux" && <Truck className="h-4 w-4 text-green-500" />}
                          {metric.name === "Emballages recyclables" && <Recycle className="h-4 w-4 text-green-500" />}
                          <p className="font-medium">{metric.name}</p>
                        </div>
                        {getStatusBadge(metric.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold">
                            {metric.value} {metric.unit}
                          </p>
                          <p
                            className={`text-xs flex items-center ${metric.change < 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {metric.change < 0 ? (
                              <ArrowDownRight className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowUpRight className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(metric.change)}% vs trimestre précédent
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            Objectif: {metric.target} {metric.unit}
                          </p>
                          <Progress
                            value={(metric.value / metric.target) * 100}
                            className={`h-2 mt-1 w-32 ${
                              (metric.value / metric.target) * 100 > 100 ? "bg-red-200" : "bg-gray-200"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Définir de nouveaux objectifs
                </Button>
              </CardFooter>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Initiatives en cours</CardTitle>
                  <CardDescription>Projets de durabilité actifs dans votre établissement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg space-y-1">
                      <div className="flex items-center">
                        <Recycle className="h-4 w-4 text-green-500 mr-2" />
                        <p className="font-medium">Programme de compostage</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Réduction des déchets alimentaires de 25% grâce au compostage sur site.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">Progression</p>
                        <p className="text-xs font-medium">65%</p>
                      </div>
                      <Progress value={65} className="h-2 mt-1" />
                    </div>
                    <div className="p-3 border rounded-lg space-y-1">
                      <div className="flex items-center">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
                        <p className="font-medium">Transition énergétique</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Installation de panneaux solaires pour atteindre 50% d'énergie renouvelable.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">Progression</p>
                        <p className="text-xs font-medium">35%</p>
                      </div>
                      <Progress value={35} className="h-2 mt-1" />
                    </div>
                    <div className="p-3 border rounded-lg space-y-1">
                      <div className="flex items-center">
                        <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                        <p className="font-medium">Économie d'eau</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Installation de systèmes à faible débit et récupération des eaux de pluie.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">Progression</p>
                        <p className="text-xs font-medium">80%</p>
                      </div>
                      <Progress value={80} className="h-2 mt-1" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvelle initiative
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Reconnaissances</CardTitle>
                  <CardDescription>Labels et distinctions environnementales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg space-y-1 bg-green-50">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="font-medium">Certification Éco-Restaurant</p>
                          <p className="text-xs text-green-600">Obtenue le 15/03/2025</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Reconnaissance des pratiques durables dans la restauration.
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg space-y-1 bg-blue-50">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <p className="font-medium">Label Économie d'Eau</p>
                          <p className="text-xs text-blue-600">Obtenue le 22/01/2025</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Réduction significative de la consommation d'eau.
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg space-y-1">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="font-medium">Certification Carbone Neutre</p>
                          <p className="text-xs text-gray-500">En cours d'obtention</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Compensation de l'empreinte carbone de l'établissement.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">Progression</p>
                        <p className="text-xs font-medium">45%</p>
                      </div>
                      <Progress value={45} className="h-2 mt-1" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir toutes les certifications
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Reste du composant... */}
        </Tabs>
      </div>
    </DashboardShell>
  )
}
