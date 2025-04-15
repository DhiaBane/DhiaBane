"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  Clock,
  BadgeCheck,
  BadgeX,
  ChevronRight,
  CalendarDays,
  ListFilter,
  Plus,
  MapPin,
} from "lucide-react"

import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-range-picker"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types
type StaffRole =
  | "manager"
  | "chef"
  | "sous_chef"
  | "server"
  | "bartender"
  | "host"
  | "dishwasher"
  | "delivery"
  | "other"
type StaffStatus = "active" | "on_leave" | "terminated"

type StaffMember = {
  id: string
  firstName: string
  lastName: string
  role: StaffRole
  status: StaffStatus
  email: string
  phone: string
  avatar?: string
  hireDate: string
  address?: string
  hourlyRate: number
  hoursPerWeek: number
  schedule: {
    monday?: { start: string; end: string }
    tuesday?: { start: string; end: string }
    wednesday?: { start: string; end: string }
    thursday?: { start: string; end: string }
    friday?: { start: string; end: string }
    saturday?: { start: string; end: string }
    sunday?: { start: string; end: string }
  }
  skills: string[]
  certifications?: string[]
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
  notes?: string
  createdAt: string
  updatedAt: string
}

type Shift = {
  id: string
  staffId: string
  date: string
  startTime: string
  endTime: string
  role: StaffRole
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "missed"
  notes?: string
}

// Mock data
const mockStaffMembers: StaffMember[] = [
  {
    id: "staff-001",
    firstName: "Jean",
    lastName: "Martin",
    role: "manager",
    status: "active",
    email: "jean.martin@example.com",
    phone: "+33 6 12 34 56 78",
    avatar: "/placeholder.svg?height=40&width=40",
    hireDate: "2022-03-15",
    address: "15 Rue de la Paix, 75001 Paris",
    hourlyRate: 18.5,
    hoursPerWeek: 40,
    schedule: {
      monday: { start: "08:00", end: "17:00" },
      tuesday: { start: "08:00", end: "17:00" },
      wednesday: { start: "08:00", end: "17:00" },
      thursday: { start: "08:00", end: "17:00" },
      friday: { start: "08:00", end: "17:00" },
    },
    skills: ["Gestion d'équipe", "Service client", "Gestion des stocks"],
    certifications: ["Hygiène alimentaire", "Management"],
    emergencyContact: {
      name: "Marie Martin",
      relationship: "Épouse",
      phone: "+33 6 23 45 67 89",
    },
    notes: "Responsable principal du restaurant",
    createdAt: "2022-03-10T10:00:00Z",
    updatedAt: "2023-01-15T14:30:00Z",
  },
  {
    id: "staff-002",
    firstName: "Sophie",
    lastName: "Lefebvre",
    role: "server",
    status: "active",
    email: "sophie.lefebvre@example.com",
    phone: "+33 6 23 45 67 89",
    avatar: "/placeholder.svg?height=40&width=40",
    hireDate: "2023-01-10",
    address: "8 Avenue Montaigne, 75008 Paris",
    hourlyRate: 12.5,
    hoursPerWeek: 35,
    schedule: {
      wednesday: { start: "11:00", end: "15:00" },
      thursday: { start: "11:00", end: "15:00" },
      friday: { start: "18:00", end: "23:00" },
      saturday: { start: "18:00", end: "23:00" },
      sunday: { start: "11:00", end: "15:00" },
    },
    skills: ["Service en salle", "Prise de commande", "Gestion des plaintes"],
    certifications: ["Hygiène alimentaire"],
    emergencyContact: {
      name: "Pierre Lefebvre",
      relationship: "Père",
      phone: "+33 6 34 56 78 90",
    },
    createdAt: "2023-01-05T09:30:00Z",
    updatedAt: "2023-01-05T09:30:00Z",
  },
  {
    id: "staff-003",
    firstName: "Thomas",
    lastName: "Bernard",
    role: "chef",
    status: "active",
    email: "thomas.bernard@example.com",
    phone: "+33 6 34 56 78 90",
    avatar: "/placeholder.svg?height=40&width=40",
    hireDate: "2021-06-01",
    address: "25 Rue Saint-Honoré, 75001 Paris",
    hourlyRate: 22.0,
    hoursPerWeek: 45,
    schedule: {
      tuesday: { start: "14:00", end: "23:00" },
      wednesday: { start: "14:00", end: "23:00" },
      thursday: { start: "14:00", end: "23:00" },
      friday: { start: "14:00", end: "23:00" },
      saturday: { start: "14:00", end: "23:00" },
    },
    skills: ["Cuisine française", "Pâtisserie", "Gestion de cuisine"],
    certifications: ["CAP Cuisine", "Hygiène alimentaire", "Sécurité alimentaire"],
    emergencyContact: {
      name: "Claire Bernard",
      relationship: "Sœur",
      phone: "+33 6 45 67 89 01",
    },
    notes: "Chef principal, spécialiste en cuisine française traditionnelle",
    createdAt: "2021-05-25T11:15:00Z",
    updatedAt: "2023-02-10T16:45:00Z",
  },
  {
    id: "staff-004",
    firstName: "Lucie",
    lastName: "Dubois",
    role: "host",
    status: "active",
    email: "lucie.dubois@example.com",
    phone: "+33 6 45 67 89 01",
    avatar: "/placeholder.svg?height=40&width=40",
    hireDate: "2023-03-01",
    address: "42 Boulevard Haussmann, 75009 Paris",
    hourlyRate: 13.0,
    hoursPerWeek: 30,
    schedule: {
      wednesday: { start: "18:00", end: "23:00" },
      thursday: { start: "18:00", end: "23:00" },
      friday: { start: "18:00", end: "23:00" },
      saturday: { start: "18:00", end: "23:00" },
      sunday: { start: "11:00", end: "16:00" },
    },
    skills: ["Accueil client", "Gestion des réservations", "Service client"],
    certifications: ["Hygiène alimentaire"],
    emergencyContact: {
      name: "Marc Dubois",
      relationship: "Frère",
      phone: "+33 6 56 78 90 12",
    },
    createdAt: "2023-02-25T14:20:00Z",
    updatedAt: "2023-02-25T14:20:00Z",
  },
  {
    id: "staff-005",
    firstName: "Marc",
    lastName: "Petit",
    role: "sous_chef",
    status: "active",
    email: "marc.petit@example.com",
    phone: "+33 6 56 78 90 12",
    avatar: "/placeholder.svg?height=40&width=40",
    hireDate: "2022-01-15",
    address: "17 Rue de Passy, 75016 Paris",
    hourlyRate: 18.0,
    hoursPerWeek: 40,
    schedule: {
      tuesday: { start: "14:00", end: "23:00" },
      wednesday: { start: "14:00", end: "23:00" },
      thursday: { start: "14:00", end: "23:00" },
      friday: { start: "14:00", end: "23:00" },
      saturday: { start: "14:00", end: "23:00" },
    },
    skills: ["Cuisine française", "Préparation des plats", "Gestion des stocks"],
    certifications: ["CAP Cuisine", "Hygiène alimentaire"],
    emergencyContact: {
      name: "Julie Petit",
      relationship: "Épouse",
      phone: "+33 6 67 89 01 23",
    },
    createdAt: "2022-01-10T09:45:00Z",
    updatedAt: "2022-01-10T09:45:00Z",
  },
  {
    id: "staff-006",
    firstName: "Julie",
    lastName: "Lambert",
    role: "server",
    status: "on_leave",
    email: "julie.lambert@example.com",
    phone: "+33 6 67 89 01 23",
    avatar: "/placeholder.svg?height=40&width=40",
    hireDate: "2022-09-01",
    address: "5 Avenue Montaigne, 75008 Paris",
    hourlyRate: 12.5,
    hoursPerWeek: 35,
    schedule: {
      wednesday: { start: "11:00", end: "15:00" },
      thursday: { start: "11:00", end: "15:00" },
      friday: { start: "18:00", end: "23:00" },
      saturday: { start: "18:00", end: "23:00" },
      sunday: { start: "11:00", end: "15:00" },
    },
    skills: ["Service en salle", "Prise de commande", "Gestion des plaintes"],
    certifications: ["Hygiène alimentaire"],
    emergencyContact: {
      name: "Antoine Lambert",
      relationship: "Époux",
      phone: "+33 6 78 90 12 34",
    },
    notes: "En congé maternité jusqu'au 15 juin 2025",
    createdAt: "2022-08-25T10:30:00Z",
    updatedAt: "2025-01-15T11:20:00Z",
  },
  {
    id: "staff-007",
    firstName: "Antoine",
    lastName: "Rousseau",
    role: "bartender",
    status: "active",
    email: "antoine.rousseau@example.com",
    phone: "+33 6 78 90 12 34",
    avatar: "/placeholder.svg?height=40&width=40",
    hireDate: "2022-05-15",
    address: "28 Rue Saint-Dominique, 75007 Paris",
    hourlyRate: 14.0,
    hoursPerWeek: 35,
    schedule: {
      wednesday: { start: "17:00", end: "01:00" },
      thursday: { start: "17:00", end: "01:00" },
      friday: { start: "17:00", end: "02:00" },
      saturday: { start: "17:00", end: "02:00" },
    },
    skills: ["Mixologie", "Service au bar", "Gestion des stocks"],
    certifications: ["Hygiène alimentaire", "Formation barman"],
    emergencyContact: {
      name: "Émilie Rousseau",
      relationship: "Sœur",
      phone: "+33 6 89 01 23 45",
    },
    notes: "Responsable du service du soir",
    createdAt: "2022-05-10T15:45:00Z",
    updatedAt: "2022-05-10T15:45:00Z",
  },
  {
    id: "staff-008",
    firstName: "Philippe",
    lastName: "Durand",
    role: "manager",
    status: "active",
    email: "philippe.durand@example.com",
    phone: "+33 6 89 01 23 45",
    avatar: "/placeholder.svg?height=40&width=40",
    hireDate: "2021-02-01",
    address: "10 Rue de Rivoli, 75004 Paris",
    hourlyRate: 19.0,
    hoursPerWeek: 40,
    schedule: {
      monday: { start: "15:00", end: "23:00" },
      tuesday: { start: "15:00", end: "23:00" },
      wednesday: { start: "15:00", end: "23:00" },
      thursday: { start: "15:00", end: "23:00" },
      friday: { start: "15:00", end: "23:00" },
    },
    skills: ["Gestion d'équipe", "Service client", "Gestion des stocks"],
    certifications: ["Hygiène alimentaire", "Management"],
    emergencyContact: {
      name: "Catherine Durand",
      relationship: "Épouse",
      phone: "+33 6 90 12 34 56",
    },
    notes: "Responsable du service du soir",
    createdAt: "2021-01-25T13:10:00Z",
    updatedAt: "2023-03-10T09:30:00Z",
  },
  {
    id: "staff-009",
    firstName: "Émilie",
    lastName: "Leroy",
    role: "chef",
    status: "terminated",
    email: "emilie.leroy@example.com",
    phone: "+33 6 90 12 34 56",
    avatar: "/placeholder.svg?height=40&width=40",
    hireDate: "2020-11-01",
    address: "7 Rue Cler, 75007 Paris",
    hourlyRate: 21.0,
    hoursPerWeek: 45,
    schedule: {},
    skills: ["Cuisine française", "Pâtisserie", "Gestion de cuisine"],
    certifications: ["CAP Cuisine", "Hygiène alimentaire"],
    emergencyContact: {
      name: "Nicolas Leroy",
      relationship: "Époux",
      phone: "+33 6 01 23 45 67",
    },
    notes: "Contrat terminé le 15 mars 2025",
    createdAt: "2020-10-25T11:30:00Z",
    updatedAt: "2025-03-15T16:45:00Z",
  },
  {
    id: "staff-010",
    firstName: "Nicolas",
    lastName: "Fournier",
    role: "delivery",
    status: "active",
    email: "nicolas.fournier@example.com",
    phone: "+33 6 01 23 45 67",
    avatar: "/placeholder.svg?height=40&width=40",
    hireDate: "2023-02-01",
    address: "12 Rue du Faubourg Saint-Honoré, 75008 Paris",
    hourlyRate: 12.0,
    hoursPerWeek: 30,
    schedule: {
      wednesday: { start: "18:00", end: "23:00" },
      thursday: { start: "18:00", end: "23:00" },
      friday: { start: "18:00", end: "23:00" },
      saturday: { start: "18:00", end: "23:00" },
      sunday: { start: "11:00", end: "15:00" },
    },
    skills: ["Livraison", "Service client", "Connaissance de Paris"],
    certifications: ["Permis B"],
    emergencyContact: {
      name: "Aurélie Fournier",
      relationship: "Sœur",
      phone: "+33 6 12 34 56 78",
    },
    createdAt: "2023-01-25T14:15:00Z",
    updatedAt: "2023-01-25T14:15:00Z",
  },
]

const mockShifts: Shift[] = [
  {
    id: "shift-001",
    staffId: "staff-001",
    date: "2025-04-14",
    startTime: "08:00",
    endTime: "17:00",
    role: "manager",
    status: "in_progress",
  },
  {
    id: "shift-002",
    staffId: "staff-003",
    date: "2025-04-14",
    startTime: "14:00",
    endTime: "23:00",
    role: "chef",
    status: "in_progress",
  },
  {
    id: "shift-003",
    staffId: "staff-005",
    date: "2025-04-14",
    startTime: "14:00",
    endTime: "23:00",
    role: "sous_chef",
    status: "in_progress",
  },
  {
    id: "shift-004",
    staffId: "staff-004",
    date: "2025-04-14",
    startTime: "18:00",
    endTime: "23:00",
    role: "host",
    status: "scheduled",
  },
  {
    id: "shift-005",
    staffId: "staff-007",
    date: "2025-04-14",
    startTime: "17:00",
    endTime: "01:00",
    role: "bartender",
    status: "scheduled",
  },
  {
    id: "shift-006",
    staffId: "staff-002",
    date: "2025-04-14",
    startTime: "18:00",
    endTime: "23:00",
    role: "server",
    status: "scheduled",
  },
  {
    id: "shift-007",
    staffId: "staff-010",
    date: "2025-04-14",
    startTime: "18:00",
    endTime: "23:00",
    role: "delivery",
    status: "scheduled",
  },
  {
    id: "shift-008",
    staffId: "staff-008",
    date: "2025-04-14",
    startTime: "15:00",
    endTime: "23:00",
    role: "manager",
    status: "in_progress",
  },
  {
    id: "shift-009",
    staffId: "staff-001",
    date: "2025-04-15",
    startTime: "08:00",
    endTime: "17:00",
    role: "manager",
    status: "scheduled",
  },
  {
    id: "shift-010",
    staffId: "staff-003",
    date: "2025-04-15",
    startTime: "14:00",
    endTime: "23:00",
    role: "chef",
    status: "scheduled",
  },
]

// Helper functions
const getRoleText = (role: StaffRole) => {
  switch (role) {
    case "manager":
      return "Manager"
    case "chef":
      return "Chef"
    case "sous_chef":
      return "Sous-chef"
    case "server":
      return "Serveur/Serveuse"
    case "bartender":
      return "Barman/Barmaid"
    case "host":
      return "Hôte/Hôtesse d'accueil"
    case "dishwasher":
      return "Plongeur"
    case "delivery":
      return "Livreur"
    case "other":
      return "Autre"
    default:
      return "Inconnu"
  }
}

const getStatusText = (status: StaffStatus) => {
  switch (status) {
    case "active":
      return "Actif"
    case "on_leave":
      return "En congé"
    case "terminated":
      return "Terminé"
    default:
      return "Inconnu"
  }
}

const getStatusColor = (status: StaffStatus) => {
  switch (status) {
    case "active":
      return "bg-green-500"
    case "on_leave":
      return "bg-yellow-500"
    case "terminated":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getShiftStatusText = (status: Shift["status"]) => {
  switch (status) {
    case "scheduled":
      return "Planifié"
    case "confirmed":
      return "Confirmé"
    case "in_progress":
      return "En cours"
    case "completed":
      return "Terminé"
    case "missed":
      return "Manqué"
    default:
      return "Inconnu"
  }
}

const getShiftStatusColor = (status: Shift["status"]) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-500"
    case "confirmed":
      return "bg-green-500"
    case "in_progress":
      return "bg-purple-500"
    case "completed":
      return "bg-gray-500"
    case "missed":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export default function StaffPage() {
  const params = useParams<{ restaurantId: string }>()
  const { restaurantId } = params

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedStaffMember, setSelectedStaffMember] = useState<StaffMember | null>(null)
  const [isStaffDetailsOpen, setIsStaffDetailsOpen] = useState(false)
  const [isCreateStaffOpen, setIsCreateStaffOpen] = useState(false)
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false)
  const [isDeleteStaffOpen, setIsDeleteStaffOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"list" | "schedule">("list")

  // Form state for create/edit
  const [formData, setFormData] = useState<Partial<StaffMember>>({
    firstName: "",
    lastName: "",
    role: "server",
    status: "active",
    email: "",
    phone: "",
    hireDate: new Date().toISOString().split("T")[0],
    hourlyRate: 12.0,
    hoursPerWeek: 35,
    schedule: {},
    skills: [],
  })

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, this would be API calls
        // const staffResponse = await fetch(`/api/restaurants/${restaurantId}/staff`)
        // const shiftsResponse = await fetch(`/api/restaurants/${restaurantId}/shifts`)
        // const staffData = await staffResponse.json()
        // const shiftsData = await shiftsResponse.json()

        // Using mock data for now
        setTimeout(() => {
          setStaffMembers(mockStaffMembers)
          setShifts(mockShifts)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [restaurantId])

  const filteredStaffMembers = staffMembers.filter((staff) => {
    const fullName = `${staff.firstName} ${staff.lastName}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.phone.includes(searchQuery)

    const matchesRole = roleFilter === "all" || staff.role === roleFilter
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleViewStaffDetails = (staff: StaffMember) => {
    setSelectedStaffMember(staff)
    setIsStaffDetailsOpen(true)
  }

  const handleCreateStaff = () => {
    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      role: "server",
      status: "active",
      email: "",
      phone: "",
      hireDate: new Date().toISOString().split("T")[0],
      hourlyRate: 12.0,
      hoursPerWeek: 35,
      schedule: {},
      skills: [],
    })
    setIsCreateStaffOpen(true)
  }

  const handleEditStaff = (staff: StaffMember) => {
    setSelectedStaffMember(staff)
    setFormData({
      ...staff,
    })
    setIsEditStaffOpen(true)
  }

  const handleDeleteStaff = (staff: StaffMember) => {
    setSelectedStaffMember(staff)
    setIsDeleteStaffOpen(true)
  }

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitCreate = () => {
    // In a real app, this would be an API call
    const newStaff: StaffMember = {
      id: `staff-${Math.floor(Math.random() * 1000)}`,
      ...(formData as any),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setStaffMembers([...staffMembers, newStaff])
    setIsCreateStaffOpen(false)
  }

  const handleSubmitEdit = () => {
    if (!selectedStaffMember) return

    // In a real app, this would be an API call
    const updatedStaff: StaffMember = {
      ...selectedStaffMember,
      ...(formData as any),
      updatedAt: new Date().toISOString(),
    }

    setStaffMembers(staffMembers.map((staff) => (staff.id === selectedStaffMember.id ? updatedStaff : staff)))
    setIsEditStaffOpen(false)
  }

  const handleConfirmDelete = () => {
    if (!selectedStaffMember) return

    // In a real app, this would be an API call
    setStaffMembers(staffMembers.filter((staff) => staff.id !== selectedStaffMember.id))
    setIsDeleteStaffOpen(false)
  }

  const getActiveStaffCount = () => {
    return staffMembers.filter((staff) => staff.status === "active").length
  }

  const getOnLeaveStaffCount = () => {
    return staffMembers.filter((staff) => staff.status === "on_leave").length
  }

  const getTerminatedStaffCount = () => {
    return staffMembers.filter((staff) => staff.status === "terminated").length
  }

  const getTodayShiftsCount = () => {
    const today = new Date().toISOString().split("T")[0]
    return shifts.filter((shift) => shift.date === today).length
  }

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Personnel</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Personnel</h1>
          <p className="text-muted-foreground">Gérez votre équipe et les plannings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "list" ? "schedule" : "list")}>
            {viewMode === "list" ? (
              <>
                <CalendarDays className="mr-2 h-4 w-4" />
                Vue planning
              </>
            ) : (
              <>
                <ListFilter className="mr-2 h-4 w-4" />
                Vue liste
              </>
            )}
          </Button>
          <Button variant="default" size="sm" onClick={handleCreateStaff}>
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un employé
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Employés actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getActiveStaffCount()}</div>
            <p className="text-xs text-muted-foreground">Sur {staffMembers.length} employés au total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En congé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOnLeaveStaffCount()}</div>
            <p className="text-xs text-muted-foreground">Employés temporairement absents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contrats terminés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTerminatedStaffCount()}</div>
            <p className="text-xs text-muted-foreground">Employés ayant quitté l'entreprise</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shifts aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTodayShiftsCount()}</div>
            <p className="text-xs text-muted-foreground">Employés travaillant aujourd'hui</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou téléphone..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="chef">Chef</SelectItem>
                <SelectItem value="sous_chef">Sous-chef</SelectItem>
                <SelectItem value="server">Serveur/Serveuse</SelectItem>
                <SelectItem value="bartender">Barman/Barmaid</SelectItem>
                <SelectItem value="host">Hôte/Hôtesse d'accueil</SelectItem>
                <SelectItem value="dishwasher">Plongeur</SelectItem>
                <SelectItem value="delivery">Livreur</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="on_leave">En congé</SelectItem>
                <SelectItem value="terminated">Terminé</SelectItem>
              </SelectContent>
            </Select>
            {viewMode === "schedule" && <DatePicker date={selectedDate} setDate={setSelectedDate} />}
          </div>
        </div>

        {viewMode === "list" ? (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="active">Actifs</TabsTrigger>
              <TabsTrigger value="on_leave">En congé</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {filteredStaffMembers.length > 0 ? (
                  filteredStaffMembers.map((staff) => (
                    <Card key={staff.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={staff.avatar || ""} alt={`${staff.firstName} ${staff.lastName}`} />
                              <AvatarFallback>
                                {staff.firstName.charAt(0)}
                                {staff.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">
                                  {staff.firstName} {staff.lastName}
                                </h3>
                                <Badge className={getStatusColor(staff.status)}>{getStatusText(staff.status)}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{getRoleText(staff.role)}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center">
                                  <Mail className="mr-1 h-4 w-4" />
                                  {staff.email}
                                </span>
                                <span className="flex items-center">
                                  <Phone className="mr-1 h-4 w-4" />
                                  {staff.phone}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditStaff(staff)
                              }}
                            >
                              <Edit className="mr-1 h-4 w-4" />
                              Modifier
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleViewStaffDetails(staff)}>
                              <span className="sr-only md:not-sr-only md:inline-flex">Détails</span>
                              <ChevronRight className="h-4 w-4 md:ml-1" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleViewStaffDetails(staff)}>
                                  Voir les détails
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditStaff(staff)}>Modifier</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteStaff(staff)}>
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucun employé ne correspond à vos critères</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="active" className="mt-4">
              <div className="space-y-4">
                {filteredStaffMembers.filter((staff) => staff.status === "active").length > 0 ? (
                  filteredStaffMembers
                    .filter((staff) => staff.status === "active")
                    .map((staff) => (
                      <Card key={staff.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={staff.avatar || ""} alt={`${staff.firstName} ${staff.lastName}`} />
                                <AvatarFallback>
                                  {staff.firstName.charAt(0)}
                                  {staff.lastName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">
                                    {staff.firstName} {staff.lastName}
                                  </h3>
                                  <Badge className={getStatusColor(staff.status)}>{getStatusText(staff.status)}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{getRoleText(staff.role)}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center">
                                    <Mail className="mr-1 h-4 w-4" />
                                    {staff.email}
                                  </span>
                                  <span className="flex items-center">
                                    <Phone className="mr-1 h-4 w-4" />
                                    {staff.phone}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEditStaff(staff)
                                }}
                              >
                                <Edit className="mr-1 h-4 w-4" />
                                Modifier
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleViewStaffDetails(staff)}>
                                <span className="sr-only md:not-sr-only md:inline-flex">Détails</span>
                                <ChevronRight className="h-4 w-4 md:ml-1" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleViewStaffDetails(staff)}>
                                    Voir les détails
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEditStaff(staff)}>Modifier</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteStaff(staff)}>
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucun employé actif ne correspond à vos critères</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="on_leave" className="mt-4">
              <div className="space-y-4">
                {filteredStaffMembers.filter((staff) => staff.status === "on_leave").length > 0 ? (
                  filteredStaffMembers
                    .filter((staff) => staff.status === "on_leave")
                    .map((staff) => (
                      <Card key={staff.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={staff.avatar || ""} alt={`${staff.firstName} ${staff.lastName}`} />
                                <AvatarFallback>
                                  {staff.firstName.charAt(0)}
                                  {staff.lastName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">
                                    {staff.firstName} {staff.lastName}
                                  </h3>
                                  <Badge className={getStatusColor(staff.status)}>{getStatusText(staff.status)}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{getRoleText(staff.role)}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center">
                                    <Mail className="mr-1 h-4 w-4" />
                                    {staff.email}
                                  </span>
                                  <span className="flex items-center">
                                    <Phone className="mr-1 h-4 w-4" />
                                    {staff.phone}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEditStaff(staff)
                                }}
                              >
                                <Edit className="mr-1 h-4 w-4" />
                                Modifier
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleViewStaffDetails(staff)}>
                                <span className="sr-only md:not-sr-only md:inline-flex">Détails</span>
                                <ChevronRight className="h-4 w-4 md:ml-1" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleViewStaffDetails(staff)}>
                                    Voir les détails
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEditStaff(staff)}>Modifier</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteStaff(staff)}>
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucun employé en congé ne correspond à vos critères</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Planning du {formatDate(selectedDate.toISOString().split("T")[0])}</CardTitle>
              <CardDescription>Shifts planifiés pour cette journée</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shifts
                  .filter((shift) => shift.date === selectedDate.toISOString().split("T")[0])
                  .map((shift) => {
                    const staff = staffMembers.find((s) => s.id === shift.staffId)
                    if (!staff) return null

                    return (
                      <Card key={shift.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className={`w-full md:w-2 ${getShiftStatusColor(shift.status)}`}></div>
                            <div className="p-4 flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={staff.avatar || ""}
                                      alt={`${staff.firstName} ${staff.lastName}`}
                                    />
                                    <AvatarFallback>
                                      {staff.firstName.charAt(0)}
                                      {staff.lastName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">
                                      {staff.firstName} {staff.lastName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{getRoleText(staff.role)}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getShiftStatusColor(shift.status)}>
                                    {getShiftStatusText(shift.status)}
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                    {shift.startTime} - {shift.endTime}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  {shift.status === "scheduled" && (
                                    <>
                                      <Button variant="outline" size="sm">
                                        <BadgeCheck className="mr-1 h-4 w-4" />
                                        Confirmer
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <BadgeX className="mr-1 h-4 w-4" />
                                        Annuler
                                      </Button>
                                    </>
                                  )}
                                  <Button variant="ghost" size="sm">
                                    <span className="sr-only md:not-sr-only md:inline-flex">Détails</span>
                                    <ChevronRight className="h-4 w-4 md:ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                {shifts.filter((shift) => shift.date === selectedDate.toISOString().split("T")[0]).length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucun shift planifié pour cette date</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un shift
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* Dialog pour les détails de l'employé */}
      <Dialog open={isStaffDetailsOpen} onOpenChange={setIsStaffDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedStaffMember && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">
                    {selectedStaffMember.firstName} {selectedStaffMember.lastName}
                  </DialogTitle>
                  <Badge className={getStatusColor(selectedStaffMember.status)}>
                    {getStatusText(selectedStaffMember.status)}
                  </Badge>
                </div>
                <DialogDescription>
                  {getRoleText(selectedStaffMember.role)} • Embauché le {formatDate(selectedStaffMember.hireDate)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={selectedStaffMember.avatar || ""}
                      alt={`${selectedStaffMember.firstName} ${selectedStaffMember.lastName}`}
                    />
                    <AvatarFallback>
                      {selectedStaffMember.firstName.charAt(0)}
                      {selectedStaffMember.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedStaffMember.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedStaffMember.phone}</span>
                    </div>
                    {selectedStaffMember.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{selectedStaffMember.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Informations professionnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Taux horaire:</p>
                      <p className="font-medium">{formatCurrency(selectedStaffMember.hourlyRate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Heures par semaine:</p>
                      <p className="font-medium">{selectedStaffMember.hoursPerWeek}h</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Planning hebdomadaire</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedStaffMember.schedule).map(([day, hours]) => (
                      <div key={day}>
                        <p className="text-sm text-muted-foreground capitalize">{day}:</p>
                        <p className="font-medium">
                          {hours.start} - {hours.end}
                        </p>
                      </div>
                    ))}
                    {Object.keys(selectedStaffMember.schedule).length === 0 && (
                      <p className="text-sm text-muted-foreground">Aucun planning défini</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Compétences et certifications</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Compétences:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedStaffMember.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedStaffMember.certifications && selectedStaffMember.certifications.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground">Certifications:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedStaffMember.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedStaffMember.emergencyContact && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Contact d'urgence</h3>
                      <div className="space-y-1">
                        <p>
                          <span className="text-muted-foreground">Nom:</span>{" "}
                          {selectedStaffMember.emergencyContact.name}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Relation:</span>{" "}
                          {selectedStaffMember.emergencyContact.relationship}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Téléphone:</span>{" "}
                          {selectedStaffMember.emergencyContact.phone}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {selectedStaffMember.notes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Notes</h3>
                      <p className="text-sm">{selectedStaffMember.notes}</p>
                    </div>
                  </>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="sm:w-auto w-full" onClick={() => setIsStaffDetailsOpen(false)}>
                  Fermer
                </Button>
                <Button
                  variant="outline"
                  className="sm:w-auto w-full"
                  onClick={() => {
                    setIsStaffDetailsOpen(false)
                    handleEditStaff(selectedStaffMember)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  className="sm:w-auto w-full"
                  onClick={() => {
                    setIsStaffDetailsOpen(false)
                    handleDeleteStaff(selectedStaffMember)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog pour créer un employé */}
      <Dialog open={isCreateStaffOpen} onOpenChange={setIsCreateStaffOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel employé</DialogTitle>
            <DialogDescription>Remplissez les informations pour ajouter un nouvel employé</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleFormChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleFormChange("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select value={formData.role} onValueChange={(value) => handleFormChange("role", value)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="chef">Chef</SelectItem>
                    <SelectItem value="sous_chef">Sous-chef</SelectItem>
                    <SelectItem value="server">Serveur/Serveuse</SelectItem>
                    <SelectItem value="bartender">Barman/Barmaid</SelectItem>
                    <SelectItem value="host">Hôte/Hôtesse d'accueil</SelectItem>
                    <SelectItem value="dishwasher">Plongeur</SelectItem>
                    <SelectItem value="delivery">Livreur</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select value={formData.status} onValueChange={(value) => handleFormChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="on_leave">En congé</SelectItem>
                    <SelectItem value="terminated">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => handleFormChange("phone", e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hireDate">Date d'embauche</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => handleFormChange("hireDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Taux horaire (€)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleFormChange("hourlyRate", Number.parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek">Heures par semaine</Label>
                <Input
                  id="hoursPerWeek"
                  type="number"
                  value={formData.hoursPerWeek}
                  onChange={(e) => handleFormChange("hoursPerWeek", Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleFormChange("address", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Compétences (séparées par des virgules)</Label>
              <Input
                id="skills"
                value={formData.skills?.join(", ")}
                onChange={(e) =>
                  handleFormChange(
                    "skills",
                    e.target.value.split(",").map((skill) => skill.trim()),
                  )
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateStaffOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmitCreate}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier un employé */}
      <Dialog open={isEditStaffOpen} onOpenChange={setIsEditStaffOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier l'employé</DialogTitle>
            <DialogDescription>Modifiez les informations de l'employé</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">Prénom</Label>
                <Input
                  id="edit-firstName"
                  value={formData.firstName}
                  onChange={(e) => handleFormChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Nom</Label>
                <Input
                  id="edit-lastName"
                  value={formData.lastName}
                  onChange={(e) => handleFormChange("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-role">Rôle</Label>
                <Select value={formData.role} onValueChange={(value) => handleFormChange("role", value)}>
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="chef">Chef</SelectItem>
                    <SelectItem value="sous_chef">Sous-chef</SelectItem>
                    <SelectItem value="server">Serveur/Serveuse</SelectItem>
                    <SelectItem value="bartender">Barman/Barmaid</SelectItem>
                    <SelectItem value="host">Hôte/Hôtesse d'accueil</SelectItem>
                    <SelectItem value="dishwasher">Plongeur</SelectItem>
                    <SelectItem value="delivery">Livreur</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Statut</Label>
                <Select value={formData.status} onValueChange={(value) => handleFormChange("status", value)}>
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="on_leave">En congé</SelectItem>
                    <SelectItem value="terminated">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Téléphone</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-hireDate">Date d'embauche</Label>
                <Input
                  id="edit-hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => handleFormChange("hireDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-hourlyRate">Taux horaire (€)</Label>
                <Input
                  id="edit-hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleFormChange("hourlyRate", Number.parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-hoursPerWeek">Heures par semaine</Label>
                <Input
                  id="edit-hoursPerWeek"
                  type="number"
                  value={formData.hoursPerWeek}
                  onChange={(e) => handleFormChange("hoursPerWeek", Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-address">Adresse</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => handleFormChange("address", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-skills">Compétences (séparées par des virgules)</Label>
              <Input
                id="edit-skills"
                value={formData.skills?.join(", ")}
                onChange={(e) =>
                  handleFormChange(
                    "skills",
                    e.target.value.split(",").map((skill) => skill.trim()),
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => handleFormChange("notes", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditStaffOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmitEdit}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour supprimer un employé */}
      <Dialog open={isDeleteStaffOpen} onOpenChange={setIsDeleteStaffOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Supprimer l'employé</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet employé ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>

          {selectedStaffMember && (
            <div className="py-4">
              <p className="font-medium">
                {selectedStaffMember.firstName} {selectedStaffMember.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{getRoleText(selectedStaffMember.role)}</p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteStaffOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
