"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { TrashIcon, LeafIcon, CalendarIcon, ArrowUpIcon, ArrowDownIcon, DollarSignIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/ui/date-range-picker"
import { Progress } from "@/components/ui/progress"

// Types pour la gestion des déchets
type WasteCategory = "alimentaire" | "emballage" | "papier" | "verre" | "plastique" | "métal" | "huile" | "autre"
type WasteDisposalMethod = "recyclage" | "compostage" | "incinération" | "décharge" | "don" | "autre"

interface WasteRecord {
  id: string
  date: Date
  category: WasteCategory
  quantity: number
  unit: "kg" | "litres"
  disposalMethod: WasteDisposalMethod
  cost: number
  notes?: string
}

interface WasteReduction {
  id: string
  name: string
  description: string
  startDate: Date
  targetPercentage: number
  currentPercentage: number
  category: WasteCategory
  status: "en cours" | "terminée" | "planifiée"
}

// Données fictives pour la démo
const wasteRecords: WasteRecord[] = [
  {
    id: "w1",
    date: new Date(2025, 3, 14),
    category: "alimentaire",
    quantity: 12.5,
    unit: "kg",
    disposalMethod: "compostage",
    cost: 25,
    notes: "Principalement des restes de légumes et de pain",
  },
  {
    id: "w2",
    date: new Date(2025, 3, 14),
    category: "emballage",
    quantity: 8.2,
    unit: "kg",
    disposalMethod: "recyclage",
    cost: 15,
    notes: "Cartons et emballages plastiques des livraisons",
  },
  {
    id: "w3",
    date: new Date(2025, 3, 13),
    category: "huile",
    quantity: 5.0,
    unit: "litres",
    disposalMethod: "recyclage",
    cost: 10,
    notes: "Huile de friture usagée",
  },
  {
    id: "w4",
    date: new Date(2025, 3, 12),
    category: "verre",
    quantity: 7.8,
    unit: "kg",
    disposalMethod: "recyclage",
    cost: 5,
    notes: "Bouteilles de vin et bocaux",
  },
  {
    id: "w5",
    date: new Date(2025, 3, 11),
    category: "alimentaire",
    quantity: 9.3,
    unit: "kg",
    disposalMethod: "don",
    cost: 0,
    notes: "Aliments encore consommables donnés à une association",
  },
]

const wasteReductions: WasteReduction[] = [
  {
    id: "r1",
    name: "Réduction des déchets alimentaires",
    description: "Optimisation des portions et meilleure gestion des stocks",
    startDate: new Date(2025, 2, 1),
    targetPercentage: 30,
    currentPercentage: 22,
    category: "alimentaire",
    status: "en cours",
  },
  {
    id: "r2",
    name: "Remplacement des emballages plastiques",
    description: "Utilisation d'emballages biodégradables et réutilisables",
    startDate: new Date(2025, 3, 1),
    targetPercentage: 50,
    currentPercentage: 35,
    category: "emballage",
    status: "en cours",
  },
  {
    id: "r3",
    name: "Programme de recyclage du verre",
    description: "Mise en place d'un système de tri et recyclage du verre",
    startDate: new Date(2025, 1, 15),
    targetPercentage: 90,
    currentPercentage: 85,
    category: "verre",
    status: "en cours",
  },
  {
    id: "r4",
    name: "Compostage des déchets organiques",
    description: "Installation d'un système de compostage sur site",
    startDate: new Date(2025, 4, 1),
    targetPercentage: 80,
    currentPercentage: 0,
    category: "alimentaire",
    status: "planifiée",
  },
]

// Fonction pour obtenir la couleur de la catégorie
function getCategoryColor(category: WasteCategory): string {
  switch (category) {
    case "alimentaire":
      return "bg-green-500"
    case "emballage":
      return "bg-blue-500"
    case "papier":
      return "bg-yellow-500"
    case "verre":
      return "bg-purple-500"
    case "plastique":
      return "bg-red-500"
    case "métal":
      return "bg-gray-500"
    case "huile":
      return "bg-orange-500"
    case "autre":
      return "bg-slate-500"
    default:
      return "bg-gray-500"
  }
}

// Fonction pour obtenir la couleur de la méthode d'élimination
function getDisposalMethodColor(method: WasteDisposalMethod): string {
  switch (method) {
    case "recyclage":
      return "bg-blue-500"
    case "compostage":
      return "bg-green-500"
    case "incinération":
      return "bg-red-500"
    case "décharge":
      return "bg-gray-500"
    case "don":
      return "bg-purple-500"
    case "autre":
      return "bg-slate-500"
    default:
      return "bg-gray-500"
  }
}

// Données pour les graphiques
const wasteByCategory = [
  { category: "Alimentaire", percentage: 45 },
  { category: "Emballage", percentage: 25 },
  { category: "Verre", percentage: 15 },
  { category: "Huile", percentage: 10 },
  { category: "Autre", percentage: 5 },
]

const monthlyWaste = [
  { month: "Jan", quantity: 120 },
  { month: "Fév", quantity: 115 },
  { month: "Mar", quantity: 105 },
  { month: "Avr", quantity: 95 },
  { month: "Mai", quantity: 90 },
  { month: "Juin", quantity: 85 },
]

export default function WasteManagementPage() {
  const params = useParams()
  const restaurantId = params?.restaurantId as string
  const [activeTab, setActiveTab] = useState("enregistrements")
  const [showNewRecordDialog, setShowNewRecordDialog] = useState(false)
  const [showNewReductionDialog, setShowNewReductionDialog] = useState(false)

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des déchets</h1>
        <div className="flex gap-2">
          <Dialog open={showNewRecordDialog} onOpenChange={setShowNewRecordDialog}>
            <DialogTrigger asChild>
              <Button>
                <TrashIcon className="mr-2 h-4 w-4" />
                Nouvel enregistrement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Enregistrer des déchets</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouvel enregistrement de déchets pour le suivi et l'analyse.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <div className="col-span-3">
                    <DatePicker />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Catégorie
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alimentaire">Alimentaire</SelectItem>
                      <SelectItem value="emballage">Emballage</SelectItem>
                      <SelectItem value="papier">Papier</SelectItem>
                      <SelectItem value="verre">Verre</SelectItem>
                      <SelectItem value="plastique">Plastique</SelectItem>
                      <SelectItem value="métal">Métal</SelectItem>
                      <SelectItem value="huile">Huile</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantité
                  </Label>
                  <Input id="quantity" type="number" step="0.1" className="col-span-2" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Unité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="litres">litres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="disposal" className="text-right">
                    Méthode d'élimination
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une méthode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recyclage">Recyclage</SelectItem>
                      <SelectItem value="compostage">Compostage</SelectItem>
                      <SelectItem value="incinération">Incinération</SelectItem>
                      <SelectItem value="décharge">Décharge</SelectItem>
                      <SelectItem value="don">Don</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cost" className="text-right">
                    Coût (€)
                  </Label>
                  <Input id="cost" type="number" step="0.01" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input id="notes" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewRecordDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setShowNewRecordDialog(false)}>Enregistrer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showNewReductionDialog} onOpenChange={setShowNewReductionDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <LeafIcon className="mr-2 h-4 w-4" />
                Nouvelle initiative
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Nouvelle initiative de réduction</DialogTitle>
                <DialogDescription>Créez une nouvelle initiative pour réduire les déchets.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Catégorie
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alimentaire">Alimentaire</SelectItem>
                      <SelectItem value="emballage">Emballage</SelectItem>
                      <SelectItem value="papier">Papier</SelectItem>
                      <SelectItem value="verre">Verre</SelectItem>
                      <SelectItem value="plastique">Plastique</SelectItem>
                      <SelectItem value="métal">Métal</SelectItem>
                      <SelectItem value="huile">Huile</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">
                    Date de début
                  </Label>
                  <div className="col-span-3">
                    <DatePicker />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="target" className="text-right">
                    Objectif (%)
                  </Label>
                  <Input id="target" type="number" min="1" max="100" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Statut
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en cours">En cours</SelectItem>
                      <SelectItem value="planifiée">Planifiée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewReductionDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setShowNewReductionDialog(false)}>Créer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="enregistrements">Enregistrements</TabsTrigger>
          <TabsTrigger value="initiatives">Initiatives de réduction</TabsTrigger>
          <TabsTrigger value="analyses">Analyses</TabsTrigger>
        </TabsList>

        <TabsContent value="enregistrements" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Enregistrements récents</CardTitle>
              <CardDescription>Liste des déchets enregistrés récemment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Catégorie</th>
                      <th className="py-3 px-4 text-left font-medium">Quantité</th>
                      <th className="py-3 px-4 text-left font-medium">Méthode d'élimination</th>
                      <th className="py-3 px-4 text-left font-medium">Coût</th>
                      <th className="py-3 px-4 text-left font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wasteRecords.map((record) => (
                      <tr key={record.id} className="border-b">
                        <td className="py-3 px-4">{record.date.toLocaleDateString("fr-FR")}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${getCategoryColor(record.category)}`}>{record.category}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          {record.quantity} {record.unit}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${getDisposalMethodColor(record.disposalMethod)}`}>
                            {record.disposalMethod}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{record.cost} €</td>
                        <td className="py-3 px-4">{record.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="initiatives" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wasteReductions.map((initiative) => (
              <Card key={initiative.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{initiative.name}</CardTitle>
                    <Badge className={`${getCategoryColor(initiative.category)}`}>{initiative.category}</Badge>
                  </div>
                  <CardDescription>{initiative.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progression</span>
                      <span className="text-sm font-medium">
                        {initiative.currentPercentage}% / {initiative.targetPercentage}%
                      </span>
                    </div>
                    <Progress value={(initiative.currentPercentage / initiative.targetPercentage) * 100} />
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Début: {initiative.startDate.toLocaleDateString("fr-FR")}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Badge
                          className={`mt-2 ${
                            initiative.status === "en cours"
                              ? "bg-green-500"
                              : initiative.status === "planifiée"
                                ? "bg-blue-500"
                                : "bg-gray-500"
                          }`}
                        >
                          {initiative.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Voir les détails
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analyses" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par catégorie</CardTitle>
                <CardDescription>Pourcentage des déchets par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wasteByCategory.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                      <Progress
                        value={item.percentage}
                        className={`h-2 ${
                          item.category === "Alimentaire"
                            ? "bg-green-500"
                            : item.category === "Emballage"
                              ? "bg-blue-500"
                              : item.category === "Verre"
                                ? "bg-purple-500"
                                : item.category === "Huile"
                                  ? "bg-orange-500"
                                  : "bg-slate-500"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendance mensuelle</CardTitle>
                <CardDescription>Évolution de la quantité de déchets sur les 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between">
                  {monthlyWaste.map((item, index) => (
                    <div key={item.month} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-12 ${
                          index > 0 && item.quantity < monthlyWaste[index - 1].quantity ? "bg-green-500" : "bg-red-500"
                        }`}
                        style={{ height: `${(item.quantity / 120) * 200}px` }}
                      ></div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium">{item.month}</span>
                        <span className="text-xs text-gray-500">{item.quantity} kg</span>
                        {index > 0 && (
                          <div className="flex items-center text-xs mt-1">
                            {item.quantity < monthlyWaste[index - 1].quantity ? (
                              <>
                                <ArrowDownIcon className="h-3 w-3 text-green-500 mr-1" />
                                <span className="text-green-500">
                                  {Math.round((1 - item.quantity / monthlyWaste[index - 1].quantity) * 100)}%
                                </span>
                              </>
                            ) : (
                              <>
                                <ArrowUpIcon className="h-3 w-3 text-red-500 mr-1" />
                                <span className="text-red-500">
                                  {Math.round((item.quantity / monthlyWaste[index - 1].quantity - 1) * 100)}%
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Impact financier</CardTitle>
                <CardDescription>Coûts associés à la gestion des déchets et économies réalisées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Coût mensuel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <DollarSignIcon className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-2xl font-bold">320 €</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Coût total de la gestion des déchets ce mois-ci</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Économies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <DollarSignIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-2xl font-bold">85 €</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Économies réalisées grâce aux initiatives de réduction
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Projection annuelle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <DollarSignIcon className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="text-2xl font-bold">1 020 €</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Économies projetées sur l'année en cours</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
