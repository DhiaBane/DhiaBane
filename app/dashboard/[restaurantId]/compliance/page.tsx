"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import {
  ShieldCheckIcon,
  FileTextIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  CalendarIcon,
  ClipboardCheckIcon,
  UserIcon,
  ClockIcon,
  SearchIcon,
} from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

// Types pour la conformité
type ComplianceStatus = "conforme" | "non-conforme" | "en attente" | "non applicable"
type ComplianceCategory = "hygiène" | "sécurité" | "accessibilité" | "environnement" | "emploi" | "fiscal" | "autre"
type CompliancePriority = "critique" | "haute" | "moyenne" | "basse"

interface ComplianceRequirement {
  id: string
  name: string
  description: string
  category: ComplianceCategory
  status: ComplianceStatus
  priority: CompliancePriority
  dueDate?: Date
  lastChecked?: Date
  assignedTo?: string
  notes?: string
  documents?: string[]
}

interface ComplianceAudit {
  id: string
  name: string
  date: Date
  auditor: string
  status: "planifié" | "en cours" | "terminé"
  score?: number
  findings: {
    conformes: number
    nonConformes: number
    enAttente: number
  }
  notes?: string
}

// Données fictives pour la démo
const complianceRequirements: ComplianceRequirement[] = [
  {
    id: "c1",
    name: "Affichage des allergènes",
    description: "Affichage obligatoire des allergènes sur les menus et cartes",
    category: "hygiène",
    status: "conforme",
    priority: "haute",
    lastChecked: new Date(2025, 3, 10),
    assignedTo: "Marie Dupont",
    notes: "Vérification complète effectuée, tous les menus sont à jour",
  },
  {
    id: "c2",
    name: "Formation HACCP",
    description: "Formation obligatoire du personnel aux normes HACCP",
    category: "hygiène",
    status: "en attente",
    priority: "critique",
    dueDate: new Date(2025, 4, 15),
    assignedTo: "Jean Martin",
    notes: "Formation planifiée pour le 15/05/2025",
  },
  {
    id: "c3",
    name: "Accessibilité PMR",
    description: "Conformité aux normes d'accessibilité pour les personnes à mobilité réduite",
    category: "accessibilité",
    status: "non-conforme",
    priority: "haute",
    dueDate: new Date(2025, 6, 1),
    assignedTo: "Pierre Leroy",
    notes: "Travaux nécessaires pour la rampe d'accès",
  },
  {
    id: "c4",
    name: "Extincteurs",
    description: "Vérification annuelle des extincteurs",
    category: "sécurité",
    status: "conforme",
    priority: "critique",
    lastChecked: new Date(2025, 2, 5),
    dueDate: new Date(2026, 2, 5),
    assignedTo: "Sophie Dubois",
    notes: "Tous les extincteurs sont conformes et à jour",
  },
  {
    id: "c5",
    name: "Déclaration fiscale trimestrielle",
    description: "Déclaration de TVA du premier trimestre",
    category: "fiscal",
    status: "en attente",
    priority: "haute",
    dueDate: new Date(2025, 3, 30),
    assignedTo: "Marc Petit",
    notes: "À soumettre avant la fin du mois",
  },
]

const complianceAudits: ComplianceAudit[] = [
  {
    id: "a1",
    name: "Audit hygiène annuel",
    date: new Date(2025, 3, 5),
    auditor: "Inspecteur Sanitaire Régional",
    status: "terminé",
    score: 92,
    findings: {
      conformes: 45,
      nonConformes: 3,
      enAttente: 2,
    },
    notes: "Excellente performance globale. Points à améliorer: stockage des produits frais et nettoyage des hottes.",
  },
  {
    id: "a2",
    name: "Audit sécurité incendie",
    date: new Date(2025, 2, 15),
    auditor: "Bureau Veritas",
    status: "terminé",
    score: 88,
    findings: {
      conformes: 28,
      nonConformes: 4,
      enAttente: 0,
    },
    notes: "Mise à jour nécessaire de la signalétique d'évacuation et formation du personnel à renouveler.",
  },
  {
    id: "a3",
    name: "Audit accessibilité",
    date: new Date(2025, 5, 10),
    auditor: "Cabinet AccessConsult",
    status: "planifié",
    findings: {
      conformes: 0,
      nonConformes: 0,
      enAttente: 0,
    },
  },
  {
    id: "a4",
    name: "Contrôle fiscal",
    date: new Date(2025, 7, 20),
    auditor: "Direction Générale des Finances Publiques",
    status: "planifié",
    findings: {
      conformes: 0,
      nonConformes: 0,
      enAttente: 0,
    },
  },
]

// Fonction pour obtenir la couleur du statut de conformité
function getComplianceStatusColor(status: ComplianceStatus): string {
  switch (status) {
    case "conforme":
      return "bg-green-500"
    case "non-conforme":
      return "bg-red-500"
    case "en attente":
      return "bg-yellow-500"
    case "non applicable":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

// Fonction pour obtenir la couleur de la catégorie
function getCategoryColor(category: ComplianceCategory): string {
  switch (category) {
    case "hygiène":
      return "bg-blue-500"
    case "sécurité":
      return "bg-red-500"
    case "accessibilité":
      return "bg-purple-500"
    case "environnement":
      return "bg-green-500"
    case "emploi":
      return "bg-yellow-500"
    case "fiscal":
      return "bg-orange-500"
    case "autre":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

// Fonction pour obtenir la couleur de la priorité
function getPriorityColor(priority: CompliancePriority): string {
  switch (priority) {
    case "critique":
      return "bg-red-500"
    case "haute":
      return "bg-orange-500"
    case "moyenne":
      return "bg-yellow-500"
    case "basse":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

export default function CompliancePage() {
  const params = useParams()
  const restaurantId = params?.restaurantId as string
  const [activeTab, setActiveTab] = useState("exigences")
  const [showNewRequirementDialog, setShowNewRequirementDialog] = useState(false)
  const [showNewAuditDialog, setShowNewAuditDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrer les exigences en fonction du terme de recherche
  const filteredRequirements = complianceRequirements.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Conformité</h1>
        <div className="flex gap-2">
          <Dialog open={showNewRequirementDialog} onOpenChange={setShowNewRequirementDialog}>
            <DialogTrigger asChild>
              <Button>
                <ShieldCheckIcon className="mr-2 h-4 w-4" />
                Nouvelle exigence
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Ajouter une exigence de conformité</DialogTitle>
                <DialogDescription>Enregistrez une nouvelle exigence réglementaire à suivre.</DialogDescription>
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
                  <Textarea id="description" className="col-span-3" />
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
                      <SelectItem value="hygiène">Hygiène</SelectItem>
                      <SelectItem value="sécurité">Sécurité</SelectItem>
                      <SelectItem value="accessibilité">Accessibilité</SelectItem>
                      <SelectItem value="environnement">Environnement</SelectItem>
                      <SelectItem value="emploi">Emploi</SelectItem>
                      <SelectItem value="fiscal">Fiscal</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
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
                      <SelectItem value="critique">Critique</SelectItem>
                      <SelectItem value="haute">Haute</SelectItem>
                      <SelectItem value="moyenne">Moyenne</SelectItem>
                      <SelectItem value="basse">Basse</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="conforme">Conforme</SelectItem>
                      <SelectItem value="non-conforme">Non conforme</SelectItem>
                      <SelectItem value="en attente">En attente</SelectItem>
                      <SelectItem value="non applicable">Non applicable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Date d'échéance
                  </Label>
                  <div className="col-span-3">
                    <DatePicker />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assignedTo" className="text-right">
                    Assigné à
                  </Label>
                  <Input id="assignedTo" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewRequirementDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setShowNewRequirementDialog(false)}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showNewAuditDialog} onOpenChange={setShowNewAuditDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ClipboardCheckIcon className="mr-2 h-4 w-4" />
                Nouvel audit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Planifier un nouvel audit</DialogTitle>
                <DialogDescription>Programmez un nouvel audit de conformité.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <div className="col-span-3">
                    <DatePicker />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="auditor" className="text-right">
                    Auditeur
                  </Label>
                  <Input id="auditor" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewAuditDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setShowNewAuditDialog(false)}>Planifier</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exigences">Exigences réglementaires</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
        </TabsList>

        <TabsContent value="exigences" className="mt-6">
          <div className="mb-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Rechercher une exigence..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRequirements.map((requirement) => (
              <Card key={requirement.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{requirement.name}</CardTitle>
                    <Badge className={`${getPriorityColor(requirement.priority)}`}>{requirement.priority}</Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge className={`${getCategoryColor(requirement.category)}`}>{requirement.category}</Badge>
                    <Badge className={`${getComplianceStatusColor(requirement.status)}`}>{requirement.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500 mb-3">{requirement.description}</p>
                  <div className="flex flex-col gap-1">
                    {requirement.dueDate && (
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Échéance: {requirement.dueDate.toLocaleDateString("fr-FR")}</span>
                      </div>
                    )}
                    {requirement.lastChecked && (
                      <div className="flex items-center text-sm">
                        <ClockIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Dernière vérification: {requirement.lastChecked.toLocaleDateString("fr-FR")}</span>
                      </div>
                    )}
                    {requirement.assignedTo && (
                      <div className="flex items-center text-sm">
                        <UserIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Responsable: {requirement.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex justify-between w-full">
                    <Button variant="ghost" size="sm">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Documents
                    </Button>
                    <Button variant="outline" size="sm">
                      Mettre à jour
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audits" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceAudits.map((audit) => (
              <Card key={audit.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{audit.name}</CardTitle>
                    <Badge
                      className={`${
                        audit.status === "terminé"
                          ? "bg-green-500"
                          : audit.status === "en cours"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    >
                      {audit.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {audit.date.toLocaleDateString("fr-FR")} - {audit.auditor}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {audit.status === "terminé" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Score global</span>
                        <span className="text-sm font-medium">{audit.score}%</span>
                      </div>
                      <Progress
                        value={audit.score}
                        className={`h-2 ${
                          audit.score >= 90 ? "bg-green-500" : audit.score >= 75 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                      />

                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="flex flex-col items-center p-2 bg-green-100 rounded-md">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mb-1" />
                          <span className="text-lg font-bold">{audit.findings.conformes}</span>
                          <span className="text-xs text-gray-500">Conformes</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-red-100 rounded-md">
                          <AlertTriangleIcon className="h-5 w-5 text-red-500 mb-1" />
                          <span className="text-lg font-bold">{audit.findings.nonConformes}</span>
                          <span className="text-xs text-gray-500">Non conformes</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-yellow-100 rounded-md">
                          <ClockIcon className="h-5 w-5 text-yellow-500 mb-1" />
                          <span className="text-lg font-bold">{audit.findings.enAttente}</span>
                          <span className="text-xs text-gray-500">En attente</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {audit.status !== "terminé" && (
                    <div className="flex flex-col items-center justify-center py-6">
                      <CalendarIcon className="h-12 w-12 text-gray-300 mb-2" />
                      <p className="text-gray-500">
                        {audit.status === "planifié"
                          ? "Audit planifié, en attente d'exécution"
                          : "Audit en cours de réalisation"}
                      </p>
                    </div>
                  )}

                  {audit.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700">{audit.notes}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    {audit.status === "terminé" ? (
                      <>
                        <Button variant="outline" size="sm">
                          <FileTextIcon className="mr-2 h-4 w-4" />
                          Rapport
                        </Button>
                        <Button size="sm">Plan d'action</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Reprogrammer
                        </Button>
                        {audit.status === "planifié" ? (
                          <Button size="sm">Démarrer</Button>
                        ) : (
                          <Button size="sm">Finaliser</Button>
                        )}
                      </>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
