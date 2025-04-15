"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { CalendarIcon, ClockIcon, WrenchIcon, HistoryIcon } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/ui/date-range-picker"

// Types pour la maintenance
type MaintenanceStatus = "planifiée" | "en cours" | "terminée" | "annulée" | "reportée"
type MaintenancePriority = "basse" | "moyenne" | "haute" | "critique"
type MaintenanceType = "préventive" | "corrective" | "prédictive" | "réglementaire"

interface MaintenanceTask {
  id: string
  title: string
  description: string
  status: MaintenanceStatus
  priority: MaintenancePriority
  type: MaintenanceType
  assignedTo: string
  equipment: string
  scheduledDate: Date
  completedDate?: Date
  notes?: string
  cost?: number
}

interface Equipment {
  id: string
  name: string
  type: string
  location: string
  lastMaintenance?: Date
  nextMaintenance?: Date
  status: "opérationnel" | "en maintenance" | "hors service"
}

// Données fictives pour la démo
const maintenanceTasks: MaintenanceTask[] = [
  {
    id: "m1",
    title: "Entretien du four principal",
    description: "Nettoyage complet et vérification des éléments chauffants",
    status: "planifiée",
    priority: "haute",
    type: "préventive",
    assignedTo: "Jean Dupont",
    equipment: "Four Rational SCC 201",
    scheduledDate: new Date(2025, 3, 20),
  },
  {
    id: "m2",
    title: "Réparation lave-vaisselle",
    description: "Remplacement de la pompe de vidange",
    status: "en cours",
    priority: "critique",
    type: "corrective",
    assignedTo: "Marie Martin",
    equipment: "Lave-vaisselle Hobart AM15",
    scheduledDate: new Date(2025, 3, 15),
  },
  {
    id: "m3",
    title: "Inspection des hottes",
    description: "Vérification des filtres et nettoyage des conduits",
    status: "terminée",
    priority: "moyenne",
    type: "réglementaire",
    assignedTo: "Pierre Leroy",
    equipment: "Système de ventilation cuisine",
    scheduledDate: new Date(2025, 3, 10),
    completedDate: new Date(2025, 3, 11),
    notes: "Filtres remplacés, système en bon état",
    cost: 350,
  },
  {
    id: "m4",
    title: "Calibration des thermomètres",
    description: "Vérification et calibration de tous les thermomètres",
    status: "planifiée",
    priority: "basse",
    type: "préventive",
    assignedTo: "Sophie Dubois",
    equipment: "Thermomètres de cuisine",
    scheduledDate: new Date(2025, 3, 25),
  },
  {
    id: "m5",
    title: "Maintenance chambre froide",
    description: "Vérification du compresseur et des joints d'étanchéité",
    status: "reportée",
    priority: "haute",
    type: "prédictive",
    assignedTo: "Jean Dupont",
    equipment: "Chambre froide positive",
    scheduledDate: new Date(2025, 3, 18),
    notes: "Reportée en raison d'un événement spécial",
  },
]

const equipments: Equipment[] = [
  {
    id: "e1",
    name: "Four Rational SCC 201",
    type: "Four",
    location: "Cuisine principale",
    lastMaintenance: new Date(2025, 2, 15),
    nextMaintenance: new Date(2025, 3, 20),
    status: "opérationnel",
  },
  {
    id: "e2",
    name: "Lave-vaisselle Hobart AM15",
    type: "Lave-vaisselle",
    location: "Zone plonge",
    lastMaintenance: new Date(2025, 1, 10),
    nextMaintenance: new Date(2025, 3, 15),
    status: "en maintenance",
  },
  {
    id: "e3",
    name: "Système de ventilation cuisine",
    type: "Ventilation",
    location: "Cuisine principale",
    lastMaintenance: new Date(2025, 3, 11),
    nextMaintenance: new Date(2025, 6, 11),
    status: "opérationnel",
  },
  {
    id: "e4",
    name: "Chambre froide positive",
    type: "Réfrigération",
    location: "Réserve",
    lastMaintenance: new Date(2025, 2, 5),
    nextMaintenance: new Date(2025, 3, 18),
    status: "opérationnel",
  },
  {
    id: "e5",
    name: "Chambre froide négative",
    type: "Congélation",
    location: "Réserve",
    lastMaintenance: new Date(2025, 2, 5),
    nextMaintenance: new Date(2025, 5, 5),
    status: "opérationnel",
  },
]

// Fonction pour obtenir la couleur de la priorité
function getPriorityColor(priority: MaintenancePriority): string {
  switch (priority) {
    case "basse":
      return "bg-blue-500"
    case "moyenne":
      return "bg-yellow-500"
    case "haute":
      return "bg-orange-500"
    case "critique":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

// Fonction pour obtenir la couleur du statut
function getStatusColor(status: MaintenanceStatus): string {
  switch (status) {
    case "planifiée":
      return "bg-blue-500"
    case "en cours":
      return "bg-yellow-500"
    case "terminée":
      return "bg-green-500"
    case "annulée":
      return "bg-red-500"
    case "reportée":
      return "bg-purple-500"
    default:
      return "bg-gray-500"
  }
}

// Fonction pour obtenir la couleur du statut d'équipement
function getEquipmentStatusColor(status: Equipment["status"]): string {
  switch (status) {
    case "opérationnel":
      return "bg-green-500"
    case "en maintenance":
      return "bg-yellow-500"
    case "hors service":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export default function MaintenancePage() {
  const params = useParams()
  const restaurantId = params?.restaurantId as string
  const [activeTab, setActiveTab] = useState("tâches")
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false)
  const [showNewEquipmentDialog, setShowNewEquipmentDialog] = useState(false)

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Maintenance</h1>
        <div className="flex gap-2">
          <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
            <DialogTrigger asChild>
              <Button>
                <WrenchIcon className="mr-2 h-4 w-4" />
                Nouvelle tâche
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle tâche de maintenance</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour planifier une nouvelle tâche de maintenance.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Titre
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="equipment" className="text-right">
                    Équipement
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un équipement" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipments.map((equipment) => (
                        <SelectItem key={equipment.id} value={equipment.id}>
                          {equipment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="préventive">Préventive</SelectItem>
                      <SelectItem value="corrective">Corrective</SelectItem>
                      <SelectItem value="prédictive">Prédictive</SelectItem>
                      <SelectItem value="réglementaire">Réglementaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priorité
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basse">Basse</SelectItem>
                      <SelectItem value="moyenne">Moyenne</SelectItem>
                      <SelectItem value="haute">Haute</SelectItem>
                      <SelectItem value="critique">Critique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assignedTo" className="text-right">
                    Assigné à
                  </Label>
                  <Input id="assignedTo" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date prévue
                  </Label>
                  <div className="col-span-3">
                    <DatePicker />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewTaskDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setShowNewTaskDialog(false)}>Créer la tâche</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showNewEquipmentDialog} onOpenChange={setShowNewEquipmentDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ClockIcon className="mr-2 h-4 w-4" />
                Nouvel équipement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel équipement</DialogTitle>
                <DialogDescription>Enregistrez un nouvel équipement pour le suivi de maintenance.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Input id="type" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Emplacement
                  </Label>
                  <Input id="location" className="col-span-3" />
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
                      <SelectItem value="opérationnel">Opérationnel</SelectItem>
                      <SelectItem value="en maintenance">En maintenance</SelectItem>
                      <SelectItem value="hors service">Hors service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nextMaintenance" className="text-right">
                    Prochaine maintenance
                  </Label>
                  <div className="col-span-3">
                    <DatePicker />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewEquipmentDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setShowNewEquipmentDialog(false)}>Ajouter l'équipement</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tâches">Tâches de maintenance</TabsTrigger>
          <TabsTrigger value="équipements">Équipements</TabsTrigger>
          <TabsTrigger value="historique">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="tâches" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {maintenanceTasks.map((task) => (
              <Card key={task.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <Badge className={`${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
                  </div>
                  <CardDescription>{task.equipment}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500 mb-2">{task.description}</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                      <span>
                        {task.scheduledDate.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <WrenchIcon className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{task.type}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Badge className={`mt-2 ${getStatusColor(task.status)}`}>{task.status}</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex justify-between w-full">
                    <span className="text-sm text-gray-500">Assigné à: {task.assignedTo}</span>
                    <Button variant="ghost" size="sm">
                      Détails
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="équipements" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipments.map((equipment) => (
              <Card key={equipment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{equipment.name}</CardTitle>
                    <Badge className={`${getEquipmentStatusColor(equipment.status)}`}>{equipment.status}</Badge>
                  </div>
                  <CardDescription>{equipment.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-sm">
                      <span className="font-medium mr-2">Emplacement:</span>
                      <span>{equipment.location}</span>
                    </div>
                    {equipment.lastMaintenance && (
                      <div className="flex items-center text-sm">
                        <HistoryIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Dernière maintenance: {equipment.lastMaintenance.toLocaleDateString("fr-FR")}</span>
                      </div>
                    )}
                    {equipment.nextMaintenance && (
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Prochaine maintenance: {equipment.nextMaintenance.toLocaleDateString("fr-FR")}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Historique
                    </Button>
                    <Button size="sm">Planifier maintenance</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historique" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historique des maintenances</CardTitle>
              <CardDescription>Consultez l'historique complet des maintenances effectuées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Équipement</th>
                      <th className="py-3 px-4 text-left font-medium">Type</th>
                      <th className="py-3 px-4 text-left font-medium">Technicien</th>
                      <th className="py-3 px-4 text-left font-medium">Coût</th>
                      <th className="py-3 px-4 text-left font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">11/04/2025</td>
                      <td className="py-3 px-4">Système de ventilation cuisine</td>
                      <td className="py-3 px-4">Réglementaire</td>
                      <td className="py-3 px-4">Pierre Leroy</td>
                      <td className="py-3 px-4">350 €</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-500">Terminée</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">15/03/2025</td>
                      <td className="py-3 px-4">Four Rational SCC 201</td>
                      <td className="py-3 px-4">Préventive</td>
                      <td className="py-3 px-4">Jean Dupont</td>
                      <td className="py-3 px-4">280 €</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-500">Terminée</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">10/02/2025</td>
                      <td className="py-3 px-4">Lave-vaisselle Hobart AM15</td>
                      <td className="py-3 px-4">Préventive</td>
                      <td className="py-3 px-4">Marie Martin</td>
                      <td className="py-3 px-4">150 €</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-500">Terminée</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">05/02/2025</td>
                      <td className="py-3 px-4">Chambre froide positive</td>
                      <td className="py-3 px-4">Corrective</td>
                      <td className="py-3 px-4">Jean Dupont</td>
                      <td className="py-3 px-4">520 €</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-500">Terminée</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">05/02/2025</td>
                      <td className="py-3 px-4">Chambre froide négative</td>
                      <td className="py-3 px-4">Préventive</td>
                      <td className="py-3 px-4">Jean Dupont</td>
                      <td className="py-3 px-4">320 €</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-500">Terminée</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
