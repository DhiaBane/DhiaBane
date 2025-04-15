"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import {
  AlertTriangle,
  Clock,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  ThermometerIcon,
  Trash2,
  ClipboardCheck,
  ShieldAlert,
  FileCheck,
} from "lucide-react"

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { CalendarIcon, TrendingUp, AlertCircle } from "lucide-react"

// Types pour le système de qualité
type HACCPCheckStatus = "completed" | "pending" | "overdue" | "issue"
type IncidentSeverity = "low" | "medium" | "high" | "critical"

interface HACCPCheck {
  id: string
  name: string
  description: string
  frequency: string
  lastChecked: string
  nextDue: string
  status: HACCPCheckStatus
  responsible: string
  criticalLimits?: string
  correctiveActions?: string
}

interface HACCPLog {
  id: string
  checkId: string
  date: string
  time: string
  value: string
  unit: string
  status: "ok" | "warning" | "critical"
  notes?: string
  user: string
}

interface QualityIncident {
  id: string
  title: string
  description: string
  date: string
  status: "open" | "investigating" | "resolved" | "closed"
  severity: IncidentSeverity
  assignedTo: string
  reportedBy: string
  resolutionDetails?: string
  closedDate?: string
}

interface QualityDocument {
  id: string
  title: string
  category: string
  lastUpdated: string
  version: string
  fileType: string
  fileSize: string
  author: string
  description?: string
}

interface QualityTrend {
  month: string
  incidents: number
  resolved: number
  compliance: number
}

interface PredictiveAlert {
  id: string
  title: string
  description: string
  probability: number
  impact: "low" | "medium" | "high" | "critical"
  dueDate: string
}

interface ComplianceScore {
  category: string
  score: number
  maxScore: number
  status: "excellent" | "good" | "average" | "poor"
}

// Données mockées pour le système de qualité
const mockHACCPChecks: HACCPCheck[] = [
  {
    id: "1",
    name: "Température des réfrigérateurs",
    description: "Vérifier que la température des réfrigérateurs est comprise entre 0°C et 4°C",
    frequency: "Quotidien",
    lastChecked: "2025-04-14",
    nextDue: "2025-04-15",
    status: "completed",
    responsible: "Chef de cuisine",
    criticalLimits: "Min: 0°C, Max: 4°C",
    correctiveActions: "Si > 4°C, vérifier l'équipement et déplacer les aliments si nécessaire",
  },
  {
    id: "2",
    name: "Température des congélateurs",
    description: "Vérifier que la température des congélateurs est inférieure à -18°C",
    frequency: "Quotidien",
    lastChecked: "2025-04-14",
    nextDue: "2025-04-15",
    status: "completed",
    responsible: "Chef de cuisine",
    criticalLimits: "Min: -18°C, Max: -15°C",
    correctiveActions: "Si > -15°C, vérifier l'équipement et déplacer les aliments si nécessaire",
  },
  {
    id: "3",
    name: "Température de cuisson des viandes",
    description: "Vérifier que la température à cœur des viandes atteint au moins 75°C",
    frequency: "À chaque service",
    lastChecked: "2025-04-14",
    nextDue: "2025-04-14",
    status: "pending",
    responsible: "Chef de partie",
    criticalLimits: "Min: 75°C",
    correctiveActions: "Si < 75°C, poursuivre la cuisson jusqu'à atteindre la température requise",
  },
  {
    id: "4",
    name: "Contrôle des dates de péremption",
    description: "Vérifier les dates de péremption de tous les produits stockés",
    frequency: "Hebdomadaire",
    lastChecked: "2025-04-08",
    nextDue: "2025-04-15",
    status: "pending",
    responsible: "Responsable stock",
  },
  {
    id: "5",
    name: "Nettoyage des surfaces de travail",
    description: "Vérifier que toutes les surfaces de travail sont nettoyées et désinfectées",
    frequency: "Quotidien",
    lastChecked: "2025-04-13",
    nextDue: "2025-04-14",
    status: "overdue",
    responsible: "Équipe de nettoyage",
  },
  {
    id: "6",
    name: "Contrôle des allergènes",
    description: "Vérifier la séparation des allergènes et l'étiquetage des plats",
    frequency: "Quotidien",
    lastChecked: "2025-04-12",
    nextDue: "2025-04-13",
    status: "issue",
    responsible: "Chef de cuisine",
    correctiveActions: "Revoir les procédures d'étiquetage et former le personnel",
  },
]

const mockHACCPLogs: HACCPLog[] = [
  {
    id: "1",
    checkId: "1",
    date: "2025-04-14",
    time: "08:15",
    value: "2.5",
    unit: "°C",
    status: "ok",
    user: "Jean Dupont",
  },
  {
    id: "2",
    checkId: "1",
    date: "2025-04-13",
    time: "08:30",
    value: "3.2",
    unit: "°C",
    status: "ok",
    user: "Jean Dupont",
  },
  {
    id: "3",
    checkId: "2",
    date: "2025-04-14",
    time: "08:20",
    value: "-19.5",
    unit: "°C",
    status: "ok",
    user: "Jean Dupont",
  },
  {
    id: "4",
    checkId: "2",
    date: "2025-04-13",
    time: "08:35",
    value: "-17.8",
    unit: "°C",
    status: "warning",
    notes: "Température légèrement élevée, surveillance accrue",
    user: "Jean Dupont",
  },
  {
    id: "5",
    checkId: "3",
    date: "2025-04-14",
    time: "12:45",
    value: "78.2",
    unit: "°C",
    status: "ok",
    user: "Marie Martin",
  },
  {
    id: "6",
    checkId: "6",
    date: "2025-04-12",
    time: "18:30",
    value: "N/A",
    unit: "",
    status: "critical",
    notes: "Étiquetage incorrect sur 3 plats contenant des fruits à coque",
    user: "Pierre Lefebvre",
  },
]

const mockQualityIncidents: QualityIncident[] = [
  {
    id: "1",
    title: "Contamination croisée potentielle",
    description: "Possible contamination croisée entre produits crus et cuits sur la ligne de préparation",
    date: "2025-04-12",
    status: "investigating",
    severity: "medium",
    assignedTo: "Chef de cuisine",
    reportedBy: "Commis de cuisine",
  },
  {
    id: "2",
    title: "Plainte client - corps étranger",
    description: "Client a signalé un petit morceau de plastique dans sa salade",
    date: "2025-04-10",
    status: "resolved",
    severity: "high",
    assignedTo: "Directeur du restaurant",
    reportedBy: "Serveur",
    resolutionDetails:
      "Origine identifiée: emballage fournisseur. Fournisseur notifié et procédures de contrôle renforcées",
    closedDate: "2025-04-13",
  },
  {
    id: "3",
    title: "Panne de réfrigérateur",
    description: "Réfrigérateur principal en panne pendant 2 heures",
    date: "2025-04-08",
    status: "closed",
    severity: "high",
    assignedTo: "Responsable maintenance",
    reportedBy: "Chef de cuisine",
    resolutionDetails: "Réparation effectuée, températures vérifiées, produits contrôlés",
    closedDate: "2025-04-09",
  },
  {
    id: "4",
    title: "Non-respect des procédures de lavage des mains",
    description: "Observation de non-respect des procédures de lavage des mains par certains membres du personnel",
    date: "2025-04-14",
    status: "open",
    severity: "medium",
    assignedTo: "Responsable formation",
    reportedBy: "Responsable qualité",
  },
]

const mockQualityDocuments: QualityDocument[] = [
  {
    id: "1",
    title: "Manuel HACCP",
    category: "Procédures",
    lastUpdated: "2025-01-15",
    version: "3.2",
    fileType: "PDF",
    fileSize: "2.4 MB",
    author: "Responsable qualité",
    description: "Manuel complet des procédures HACCP du restaurant",
  },
  {
    id: "2",
    title: "Registre de températures",
    category: "Formulaires",
    lastUpdated: "2025-03-01",
    version: "1.5",
    fileType: "XLSX",
    fileSize: "350 KB",
    author: "Responsable qualité",
  },
  {
    id: "3",
    title: "Procédure de nettoyage",
    category: "Procédures",
    lastUpdated: "2025-02-10",
    version: "2.1",
    fileType: "PDF",
    fileSize: "1.2 MB",
    author: "Responsable hygiène",
    description: "Procédures détaillées de nettoyage pour toutes les zones du restaurant",
  },
  {
    id: "4",
    title: "Formulaire d'incident qualité",
    category: "Formulaires",
    lastUpdated: "2025-01-20",
    version: "1.3",
    fileType: "DOCX",
    fileSize: "280 KB",
    author: "Responsable qualité",
  },
  {
    id: "5",
    title: "Formation hygiène alimentaire",
    category: "Formation",
    lastUpdated: "2025-03-15",
    version: "2.0",
    fileType: "PPTX",
    fileSize: "4.5 MB",
    author: "Responsable formation",
    description: "Support de formation pour l'hygiène alimentaire destiné à tout le personnel",
  },
]

// Données mockées pour les tendances qualité
const mockQualityTrends: QualityTrend[] = [
  { month: "Jan", incidents: 5, resolved: 4, compliance: 92 },
  { month: "Fév", incidents: 7, resolved: 6, compliance: 89 },
  { month: "Mar", incidents: 4, resolved: 4, compliance: 94 },
  { month: "Avr", incidents: 6, resolved: 5, compliance: 91 },
  { month: "Mai", incidents: 3, resolved: 3, compliance: 96 },
  { month: "Juin", incidents: 5, resolved: 4, compliance: 93 },
]

// Données mockées pour les alertes prédictives
const mockPredictiveAlerts: PredictiveAlert[] = [
  {
    id: "1",
    title: "Risque de non-conformité température réfrigérateur",
    description:
      "Le réfrigérateur #2 montre des variations de température qui pourraient conduire à un dépassement des limites critiques.",
    probability: 78,
    impact: "high",
    dueDate: "2025-04-16",
  },
  {
    id: "2",
    title: "Maintenance préventive équipement de cuisson",
    description:
      "L'analyse des données de performance suggère un besoin de maintenance pour éviter une panne potentielle.",
    probability: 65,
    impact: "medium",
    dueDate: "2025-04-20",
  },
  {
    id: "3",
    title: "Risque de contamination croisée zone préparation",
    description: "Les procédures de nettoyage entre différents types d'aliments montrent des signes d'irrégularité.",
    probability: 45,
    impact: "high",
    dueDate: "2025-04-17",
  },
  {
    id: "4",
    title: "Formation HACCP à renouveler",
    description: "5 membres du personnel doivent renouveler leur certification HACCP dans les 30 prochains jours.",
    probability: 100,
    impact: "medium",
    dueDate: "2025-05-10",
  },
]

// Données mockées pour les scores de conformité
const mockComplianceScores: ComplianceScore[] = [
  { category: "Contrôle des températures", score: 92, maxScore: 100, status: "excellent" },
  { category: "Hygiène du personnel", score: 85, maxScore: 100, status: "good" },
  { category: "Nettoyage et désinfection", score: 78, maxScore: 100, status: "average" },
  { category: "Gestion des allergènes", score: 95, maxScore: 100, status: "excellent" },
  { category: "Traçabilité", score: 88, maxScore: 100, status: "good" },
  { category: "Gestion des déchets", score: 75, maxScore: 100, status: "average" },
]

// Données pour le radar chart de conformité
const radarData = [
  {
    subject: "Temp.",
    A: 92,
    fullMark: 100,
  },
  {
    subject: "Hygiène",
    A: 85,
    fullMark: 100,
  },
  {
    subject: "Nettoyage",
    A: 78,
    fullMark: 100,
  },
  {
    subject: "Allergènes",
    A: 95,
    fullMark: 100,
  },
  {
    subject: "Traçabilité",
    A: 88,
    fullMark: 100,
  },
  {
    subject: "Déchets",
    A: 75,
    fullMark: 100,
  },
]

// Composant pour le statut des contrôles HACCP
function HACCPStatusBadge({ status }: { status: HACCPCheckStatus }) {
  const statusConfig = {
    completed: { label: "Complété", className: "bg-green-100 text-green-800" },
    pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
    overdue: { label: "En retard", className: "bg-red-100 text-red-800" },
    issue: { label: "Problème", className: "bg-purple-100 text-purple-800" },
  }

  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

// Composant pour le statut des mesures HACCP
function HACCPLogStatusBadge({ status }: { status: HACCPLog["status"] }) {
  const statusConfig = {
    ok: { label: "OK", className: "bg-green-100 text-green-800" },
    warning: { label: "Attention", className: "bg-yellow-100 text-yellow-800" },
    critical: { label: "Critique", className: "bg-red-100 text-red-800" },
  }

  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

// Composant pour la sévérité des incidents
function IncidentSeverityBadge({ severity }: { severity: IncidentSeverity }) {
  const severityConfig = {
    low: { label: "Faible", className: "bg-blue-100 text-blue-800" },
    medium: { label: "Moyen", className: "bg-yellow-100 text-yellow-800" },
    high: { label: "Élevé", className: "bg-orange-100 text-orange-800" },
    critical: { label: "Critique", className: "bg-red-100 text-red-800" },
  }

  const config = severityConfig[severity]

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

// Composant pour le statut des incidents
function IncidentStatusBadge({ status }: { status: QualityIncident["status"] }) {
  const statusConfig = {
    open: { label: "Ouvert", className: "bg-blue-100 text-blue-800" },
    investigating: { label: "En cours", className: "bg-yellow-100 text-yellow-800" },
    resolved: { label: "Résolu", className: "bg-green-100 text-green-800" },
    closed: { label: "Fermé", className: "bg-gray-100 text-gray-800" },
  }

  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

// Formulaire pour ajouter/modifier un contrôle HACCP
function HACCPCheckForm({
  check,
  onSubmit,
  onCancel,
}: {
  check?: HACCPCheck
  onSubmit: (data: Partial<HACCPCheck>) => void
  onCancel: () => void
}) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom du contrôle</Label>
          <Input id="name" defaultValue={check?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="frequency">Fréquence</Label>
          <Select defaultValue={check?.frequency}>
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Quotidien">Quotidien</SelectItem>
              <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
              <SelectItem value="Mensuel">Mensuel</SelectItem>
              <SelectItem value="À chaque service">À chaque service</SelectItem>
              <SelectItem value="À chaque livraison">À chaque livraison</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" defaultValue={check?.description} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="responsible">Responsable</Label>
          <Input id="responsible" defaultValue={check?.responsible} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select defaultValue={check?.status || "pending"}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Complété</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="overdue">En retard</SelectItem>
              <SelectItem value="issue">Problème</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="criticalLimits">Limites critiques</Label>
        <Input id="criticalLimits" defaultValue={check?.criticalLimits} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="correctiveActions">Actions correctives</Label>
        <Textarea id="correctiveActions" defaultValue={check?.correctiveActions} />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSubmit({})}>Enregistrer</Button>
      </DialogFooter>
    </div>
  )
}

// Formulaire pour ajouter une mesure HACCP
function HACCPLogForm({
  log,
  checkId,
  onSubmit,
  onCancel,
}: {
  log?: HACCPLog
  checkId: string
  onSubmit: (data: Partial<HACCPLog>) => void
  onCancel: () => void
}) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" defaultValue={log?.date || new Date().toISOString().split("T")[0]} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Heure</Label>
          <Input id="time" type="time" defaultValue={log?.time || new Date().toTimeString().slice(0, 5)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="value">Valeur</Label>
          <Input id="value" defaultValue={log?.value} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unité</Label>
          <Select defaultValue={log?.unit || "°C"}>
            <SelectTrigger id="unit">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="°C">°C (Température)</SelectItem>
              <SelectItem value="%">% (Pourcentage)</SelectItem>
              <SelectItem value="pH">pH</SelectItem>
              <SelectItem value="">N/A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Statut</Label>
        <Select defaultValue={log?.status || "ok"}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ok">OK</SelectItem>
            <SelectItem value="warning">Attention</SelectItem>
            <SelectItem value="critical">Critique</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" defaultValue={log?.notes} />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSubmit({})}>Enregistrer</Button>
      </DialogFooter>
    </div>
  )
}

// Formulaire pour ajouter/modifier un incident
function IncidentForm({
  incident,
  onSubmit,
  onCancel,
}: {
  incident?: QualityIncident
  onSubmit: (data: Partial<QualityIncident>) => void
  onCancel: () => void
}) {
  return (
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input id="title" defaultValue={incident?.title} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" defaultValue={incident?.description} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" defaultValue={incident?.date || new Date().toISOString().split("T")[0]} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="severity">Sévérité</Label>
          <Select defaultValue={incident?.severity || "medium"}>
            <SelectTrigger id="severity">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Faible</SelectItem>
              <SelectItem value="medium">Moyen</SelectItem>
              <SelectItem value="high">Élevé</SelectItem>
              <SelectItem value="critical">Critique</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select defaultValue={incident?.status || "open"}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Ouvert</SelectItem>
              <SelectItem value="investigating">En cours</SelectItem>
              <SelectItem value="resolved">Résolu</SelectItem>
              <SelectItem value="closed">Fermé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assigné à</Label>
          <Input id="assignedTo" defaultValue={incident?.assignedTo} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="reportedBy">Signalé par</Label>
        <Input id="reportedBy" defaultValue={incident?.reportedBy} />
      </div>
      {(incident?.status === "resolved" || incident?.status === "closed") && (
        <div className="space-y-2">
          <Label htmlFor="resolutionDetails">Détails de la résolution</Label>
          <Textarea id="resolutionDetails" defaultValue={incident?.resolutionDetails} />
        </div>
      )}
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSubmit({})}>Enregistrer</Button>
      </DialogFooter>
    </div>
  )
}

// Composant pour les alertes prédictives
function PredictiveAlertCard({ alert }: { alert: PredictiveAlert }) {
  const impactConfig = {
    low: { label: "Faible", className: "bg-blue-100 text-blue-800" },
    medium: { label: "Moyen", className: "bg-yellow-100 text-yellow-800" },
    high: { label: "Élevé", className: "bg-orange-100 text-orange-800" },
    critical: { label: "Critique", className: "bg-red-100 text-red-800" },
  }

  const config = impactConfig[alert.impact]

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{alert.title}</CardTitle>
          <Badge variant="outline" className={config.className}>
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{alert.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Probabilité: {alert.probability}%</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Échéance: {alert.dueDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  )
}

// Composant pour le score de conformité
function ComplianceScoreCard({ score }: { score: ComplianceScore }) {
  const statusConfig = {
    excellent: { color: "text-green-600", bgColor: "bg-green-600" },
    good: { color: "text-blue-600", bgColor: "bg-blue-600" },
    average: { color: "text-yellow-600", bgColor: "bg-yellow-600" },
    poor: { color: "text-red-600", bgColor: "bg-red-600" },
  }

  const config = statusConfig[score.status]
  const percentage = Math.round((score.score / score.maxScore) * 100)

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{score.category}</span>
        <span className={`text-sm font-medium ${config.color}`}>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`${config.bgColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

export default function QualityPage() {
  const params = useParams<{ restaurantId: string }>()
  const { restaurantId } = params
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedCheck, setSelectedCheck] = useState<HACCPCheck | null>(null)
  const [isAddCheckOpen, setIsAddCheckOpen] = useState(false)
  const [isAddLogOpen, setIsAddLogOpen] = useState(false)
  const [isAddIncidentOpen, setIsAddIncidentOpen] = useState(false)

  // Filtrer les contrôles HACCP
  const filteredChecks = mockHACCPChecks.filter((check) => {
    const matchesSearch =
      searchTerm === "" ||
      check.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      check.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === null || check.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Obtenir les logs pour le contrôle sélectionné
  const checkLogs = selectedCheck ? mockHACCPLogs.filter((log) => log.checkId === selectedCheck.id) : []

  // Calculer les statistiques de conformité
  const totalChecks = mockHACCPChecks.length
  const completedChecks = mockHACCPChecks.filter((check) => check.status === "completed").length
  const pendingChecks = mockHACCPChecks.filter((check) => check.status === "pending").length
  const overdueChecks = mockHACCPChecks.filter((check) => check.status === "overdue").length
  const issueChecks = mockHACCPChecks.filter((check) => check.status === "issue").length

  const complianceRate = Math.round((completedChecks / totalChecks) * 100)

  // Données pour le graphique de conformité
  const complianceData = [
    {
      name: "Statut",
      Complétés: completedChecks,
      "En attente": pendingChecks,
      "En retard": overdueChecks,
      Problèmes: issueChecks,
    },
  ]

  // Gérer la soumission du formulaire de contrôle HACCP
  const handleCheckSubmit = (data: Partial<HACCPCheck>) => {
    console.log("Check data submitted:", data)
    setIsAddCheckOpen(false)
  }

  // Gérer la soumission du formulaire de mesure HACCP
  const handleLogSubmit = (data: Partial<HACCPLog>) => {
    console.log("Log data submitted:", data)
    setIsAddLogOpen(false)
  }

  // Gérer la soumission du formulaire d'incident
  const handleIncidentSubmit = (data: Partial<QualityIncident>) => {
    console.log("Incident data submitted:", data)
    setIsAddIncidentOpen(false)
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion de la qualité</h1>
        <div className="flex items-center gap-2">
          <Dialog open={isAddIncidentOpen} onOpenChange={setIsAddIncidentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ShieldAlert className="mr-2 h-4 w-4" /> Signaler un incident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Signaler un incident qualité</DialogTitle>
                <DialogDescription>Remplissez les informations de l'incident ci-dessous.</DialogDescription>
              </DialogHeader>
              <IncidentForm onSubmit={handleIncidentSubmit} onCancel={() => setIsAddIncidentOpen(false)} />
            </DialogContent>
          </Dialog>
          <Dialog open={isAddCheckOpen} onOpenChange={setIsAddCheckOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Ajouter un contrôle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau contrôle HACCP</DialogTitle>
                <DialogDescription>Remplissez les informations du contrôle ci-dessous.</DialogDescription>
              </DialogHeader>
              <HACCPCheckForm onSubmit={handleCheckSubmit} onCancel={() => setIsAddCheckOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de conformité</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceRate}%</div>
            <Progress value={complianceRate} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contrôles en retard</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueChecks}</div>
            <p className="text-xs text-muted-foreground">
              {overdueChecks > 0 ? "Nécessite une attention immédiate" : "Tous les contrôles sont à jour"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents ouverts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockQualityIncidents.filter((i) => i.status === "open" || i.status === "investigating").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockQualityIncidents.filter((i) => i.status === "open" || i.status === "investigating").length > 0
                ? "Incidents en cours de traitement"
                : "Aucun incident ouvert"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents qualité</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockQualityDocuments.length}</div>
            <p className="text-xs text-muted-foreground">Documents disponibles dans la bibliothèque</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="haccp" className="mt-6">
        <TabsList>
          <TabsTrigger value="haccp">Contrôles HACCP</TabsTrigger>
          <TabsTrigger value="incidents">Incidents qualité</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
          <TabsTrigger value="predictions">Prédictions</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
        </TabsList>
        <TabsContent value="haccp" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Liste des contrôles HACCP</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filtrer
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" /> Exporter
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un contrôle..."
                  className="h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Fréquence</TableHead>
                    <TableHead>Dernière vérification</TableHead>
                    <TableHead>Prochaine échéance</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChecks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Aucun contrôle trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredChecks.map((check) => (
                      <TableRow
                        key={check.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedCheck(check)}
                      >
                        <TableCell className="font-medium">{check.name}</TableCell>
                        <TableCell>{check.frequency}</TableCell>
                        <TableCell>{check.lastChecked}</TableCell>
                        <TableCell>{check.nextDue}</TableCell>
                        <TableCell>
                          <HACCPStatusBadge status={check.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Dialog open={isAddLogOpen} onOpenChange={setIsAddLogOpen}>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <ThermometerIcon className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Ajouter une mesure pour {selectedCheck?.name}</DialogTitle>
                                  <DialogDescription>
                                    Enregistrez une nouvelle mesure pour ce contrôle.
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedCheck && (
                                  <HACCPLogForm
                                    checkId={selectedCheck.id}
                                    onSubmit={handleLogSubmit}
                                    onCancel={() => setIsAddLogOpen(false)}
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedCheck && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedCheck.name}</CardTitle>
                <CardDescription>{selectedCheck.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Fréquence</h4>
                      <p className="text-sm text-muted-foreground">{selectedCheck.frequency}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Responsable</h4>
                      <p className="text-sm text-muted-foreground">{selectedCheck.responsible}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Limites critiques</h4>
                      <p className="text-sm text-muted-foreground">{selectedCheck.criticalLimits || "Non spécifié"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Actions correctives</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedCheck.correctiveActions || "Non spécifié"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Historique des mesures</h4>
                      <Button size="sm" onClick={() => setIsAddLogOpen(true)}>
                        <Plus className="mr-2 h-3 w-3" /> Ajouter une mesure
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Heure</TableHead>
                          <TableHead>Valeur</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Utilisateur</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {checkLogs.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              Aucune mesure enregistrée
                            </TableCell>
                          </TableRow>
                        ) : (
                          checkLogs.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell>{log.date}</TableCell>
                              <TableCell>{log.time}</TableCell>
                              <TableCell>
                                {log.value} {log.unit}
                              </TableCell>
                              <TableCell>
                                <HACCPLogStatusBadge status={log.status} />
                              </TableCell>
                              <TableCell>{log.user}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setSelectedCheck(null)}>
                  Fermer
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incidents qualité</CardTitle>
              <CardDescription>Liste des incidents qualité signalés</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Sévérité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Assigné à</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockQualityIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.title}</TableCell>
                      <TableCell>{incident.date}</TableCell>
                      <TableCell>
                        <IncidentSeverityBadge severity={incident.severity} />
                      </TableCell>
                      <TableCell>
                        <IncidentStatusBadge status={incident.status} />
                      </TableCell>
                      <TableCell>{incident.assignedTo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bibliothèque de documents</CardTitle>
              <CardDescription>Procédures, formulaires et registres qualité</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Dernière mise à jour</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockQualityDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="font-medium">{document.title}</TableCell>
                      <TableCell>{document.category}</TableCell>
                      <TableCell>{document.version}</TableCell>
                      <TableCell>{document.lastUpdated}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileCheck className="mr-2 h-4 w-4" /> Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tableau de bord de conformité</CardTitle>
              <CardDescription>Vue d'ensemble de la conformité HACCP</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  Complétés: {
                    label: "Complétés",
                    color: "hsl(var(--chart-1))",
                  },
                  "En attente": {
                    label: "En attente",
                    color: "hsl(var(--chart-2))",
                  },
                  "En retard": {
                    label: "En retard",
                    color: "hsl(var(--chart-3))",
                  },
                  Problèmes: {
                    label: "Problèmes",
                    color: "hsl(var(--chart-4))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="Complétés" fill="var(--color-Complétés)" />
                    <Bar dataKey="En attente" fill="var(--color-En attente)" />
                    <Bar dataKey="En retard" fill="var(--color-En retard)" />
                    <Bar dataKey="Problèmes" fill="var(--color-Problèmes)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Alertes prédictives</CardTitle>
                <CardDescription>
                  Alertes générées par notre système d'IA basées sur l'analyse des tendances et des données historiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockPredictiveAlerts.map((alert) => (
                    <PredictiveAlertCard key={alert.id} alert={alert} />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tableau de bord prédictif</CardTitle>
                <CardDescription>Prévisions de conformité HACCP pour les 30 prochains jours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Score de conformité prévu</h4>
                      <div className="text-2xl font-bold">87%</div>
                      <p className="text-xs text-muted-foreground">
                        <TrendingUp className="inline mr-1 h-3 w-3" />
                        +2% par rapport au mois dernier
                      </p>
                    </div>
                    <div className="h-24 w-24">
                      <PieChart width={100} height={100}>
                        <Pie
                          data={[
                            { name: "Conforme", value: 87 },
                            { name: "Non-conforme", value: 13 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#4ade80" />
                          <Cell fill="#f87171" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Prochains contrôles critiques</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-md">
                        <div className="flex items-center">
                          <ThermometerIcon className="mr-2 h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Température des congélateurs</span>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          Demain
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-red-50 rounded-md">
                        <div className="flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-red-600" />
                          <span className="text-sm">Contrôle des allergènes</span>
                        </div>
                        <Badge variant="outline" className="bg-red-100 text-red-800">
                          Aujourd'hui
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                        <div className="flex items-center">
                          <ClipboardCheck className="mr-2 h-4 w-4 text-blue-600" />
                          <span className="text-sm">Nettoyage des surfaces</span>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          Dans 3 jours
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Radar de conformité par catégorie</h4>
                    <div className="flex justify-center">
                      <RadarChart outerRadius={90} width={250} height={200} data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Conformité" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des tendances des incidents qualité</CardTitle>
              <CardDescription>Évolution des incidents et de la conformité sur les 6 derniers mois</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  Incidents: {
                    label: "Incidents",
                    color: "hsl(var(--chart-1))",
                  },
                  Résolus: {
                    label: "Résolus",
                    color: "hsl(var(--chart-2))",
                  },
                  Conformité: {
                    label: "Conformité (%)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockQualityTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[80, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="incidents" stroke="var(--color-Incidents)" />
                    <Line yAxisId="left" type="monotone" dataKey="resolved" stroke="var(--color-Résolus)" />
                    <Line yAxisId="right" type="monotone" dataKey="compliance" stroke="var(--color-Conformité)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Scores de conformité par catégorie</CardTitle>
                <CardDescription>Évaluation détaillée de la conformité par domaine HACCP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockComplianceScores.map((score, index) => (
                    <ComplianceScoreCard key={index} score={score} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyse des causes d'incidents</CardTitle>
                <CardDescription>Répartition des incidents par cause principale</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    "Erreur humaine": {
                      label: "Erreur humaine",
                      color: "#f87171",
                    },
                    "Défaillance équipement": {
                      label: "Défaillance équipement",
                      color: "#fb923c",
                    },
                    "Procédure inadéquate": {
                      label: "Procédure inadéquate",
                      color: "#facc15",
                    },
                    Fournisseur: {
                      label: "Fournisseur",
                      color: "#a3e635",
                    },
                    Autre: {
                      label: "Autre",
                      color: "#22d3ee",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Erreur humaine", value: 42 },
                          { name: "Défaillance équipement", value: 28 },
                          { name: "Procédure inadéquate", value: 15 },
                          { name: "Fournisseur", value: 10 },
                          { name: "Autre", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="var(--color-Erreur humaine)" />
                        <Cell fill="var(--color-Défaillance équipement)" />
                        <Cell fill="var(--color-Procédure inadéquate)" />
                        <Cell fill="var(--color-Fournisseur)" />
                        <Cell fill="var(--color-Autre)" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
