"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ChevronRight,
  CalendarDays,
  ListFilter,
} from "lucide-react"

import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// Types
type EventStatus = "upcoming" | "in_progress" | "completed" | "cancelled"
type EventType = "private_party" | "corporate" | "wedding" | "birthday" | "promotion" | "holiday" | "other"

type EventStaff = {
  id: string
  name: string
  role: string
  avatar?: string
}

type EventMenu = {
  id: string
  name: string
  price: number
  items: string[]
}

type Event = {
  id: string
  title: string
  type: EventType
  status: EventStatus
  date: string
  startTime: string
  endTime: string
  location: string
  capacity: number
  guestCount: number
  description: string
  contactName: string
  contactEmail: string
  contactPhone: string
  staff: EventStaff[]
  menu?: EventMenu
  deposit?: number
  totalAmount: number
  paidAmount: number
  notes?: string
  createdAt: string
  updatedAt: string
}

// Mock data
const mockEvents: Event[] = [
  {
    id: "evt-001",
    title: "Anniversaire de Marie",
    type: "birthday",
    status: "upcoming",
    date: "2025-05-15",
    startTime: "19:00",
    endTime: "23:00",
    location: "Salle principale",
    capacity: 30,
    guestCount: 25,
    description: "Fête d'anniversaire pour les 30 ans de Marie",
    contactName: "Marie Dupont",
    contactEmail: "marie.dupont@example.com",
    contactPhone: "+33 6 12 34 56 78",
    staff: [
      {
        id: "staff-001",
        name: "Jean Martin",
        role: "Serveur",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-002",
        name: "Sophie Lefebvre",
        role: "Serveuse",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-003",
        name: "Thomas Bernard",
        role: "Chef",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    menu: {
      id: "menu-001",
      name: "Menu Anniversaire",
      price: 35.0,
      items: [
        "Salade de chèvre chaud",
        "Suprême de volaille aux champignons",
        "Assiette de fromages",
        "Gâteau d'anniversaire",
      ],
    },
    deposit: 300.0,
    totalAmount: 875.0,
    paidAmount: 300.0,
    notes: "Prévoir une décoration spéciale et un gâteau avec bougies",
    createdAt: "2025-03-10T14:30:00Z",
    updatedAt: "2025-03-15T10:15:00Z",
  },
  {
    id: "evt-002",
    title: "Séminaire Entreprise XYZ",
    type: "corporate",
    status: "upcoming",
    date: "2025-05-20",
    startTime: "09:00",
    endTime: "17:00",
    location: "Salle de conférence",
    capacity: 50,
    guestCount: 40,
    description: "Séminaire annuel de l'entreprise XYZ",
    contactName: "Pierre Moreau",
    contactEmail: "pierre.moreau@xyz.com",
    contactPhone: "+33 6 23 45 67 89",
    staff: [
      {
        id: "staff-004",
        name: "Lucie Dubois",
        role: "Responsable événement",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-005",
        name: "Marc Petit",
        role: "Chef",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-006",
        name: "Julie Lambert",
        role: "Serveuse",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-007",
        name: "Antoine Rousseau",
        role: "Serveur",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    menu: {
      id: "menu-002",
      name: "Menu Business",
      price: 45.0,
      items: [
        "Velouté de potiron",
        "Dos de cabillaud, purée de céleri",
        "Tarte fine aux pommes",
        "Café et mignardises",
      ],
    },
    deposit: 900.0,
    totalAmount: 1800.0,
    paidAmount: 900.0,
    notes: "Prévoir équipement audiovisuel et pause café matin et après-midi",
    createdAt: "2025-03-05T09:45:00Z",
    updatedAt: "2025-03-12T16:20:00Z",
  },
  {
    id: "evt-003",
    title: "Mariage Silva-Martin",
    type: "wedding",
    status: "upcoming",
    date: "2025-06-12",
    startTime: "16:00",
    endTime: "02:00",
    location: "Grande salle + terrasse",
    capacity: 120,
    guestCount: 110,
    description: "Réception de mariage pour Camille et Thomas",
    contactName: "Camille Silva",
    contactEmail: "camille.silva@example.com",
    contactPhone: "+33 6 34 56 78 90",
    staff: [
      {
        id: "staff-008",
        name: "Philippe Durand",
        role: "Maître d'hôtel",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-009",
        name: "Émilie Leroy",
        role: "Chef",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-010",
        name: "Nicolas Fournier",
        role: "Barman",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-011",
        name: "Aurélie Mercier",
        role: "Serveuse",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-012",
        name: "David Roux",
        role: "Serveur",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-013",
        name: "Céline Blanc",
        role: "Serveuse",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    menu: {
      id: "menu-003",
      name: "Menu Prestige Mariage",
      price: 85.0,
      items: [
        "Amuse-bouches variés",
        "Foie gras maison et son chutney",
        "Filet de bœuf Wellington",
        "Assiette de fromages affinés",
        "Pièce montée et mignardises",
        "Champagne et vins",
      ],
    },
    deposit: 3000.0,
    totalAmount: 9350.0,
    paidAmount: 5000.0,
    notes: "Décoration florale, plan de table fourni, DJ prévu par les mariés",
    createdAt: "2025-01-15T11:30:00Z",
    updatedAt: "2025-03-20T14:45:00Z",
  },
  {
    id: "evt-004",
    title: "Soirée Saint-Valentin",
    type: "holiday",
    status: "completed",
    date: "2025-02-14",
    startTime: "19:00",
    endTime: "23:30",
    location: "Restaurant entier",
    capacity: 60,
    guestCount: 58,
    description: "Soirée spéciale Saint-Valentin avec menu dégustation",
    contactName: "Direction du restaurant",
    contactEmail: "contact@restaurant.com",
    contactPhone: "+33 1 23 45 67 89",
    staff: [
      {
        id: "staff-014",
        name: "Laurent Girard",
        role: "Maître d'hôtel",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-015",
        name: "Nathalie Morel",
        role: "Chef",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-016",
        name: "Sébastien Faure",
        role: "Sommelier",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-017",
        name: "Caroline Legrand",
        role: "Serveuse",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-018",
        name: "Julien Perrin",
        role: "Serveur",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    menu: {
      id: "menu-004",
      name: "Menu Saint-Valentin",
      price: 75.0,
      items: [
        "Huîtres et champagne",
        "Risotto aux Saint-Jacques",
        "Tournedos Rossini",
        "Assiette gourmande à partager",
      ],
    },
    totalAmount: 4350.0,
    paidAmount: 4350.0,
    notes: "Décoration romantique, rose pour chaque table, musique d'ambiance",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-02-15T09:30:00Z",
  },
  {
    id: "evt-005",
    title: "Lancement Produit Tech Co",
    type: "corporate",
    status: "cancelled",
    date: "2025-04-05",
    startTime: "18:00",
    endTime: "22:00",
    location: "Terrasse et bar",
    capacity: 80,
    guestCount: 70,
    description: "Soirée de lancement du nouveau produit de Tech Co",
    contactName: "Alexandre Dupuis",
    contactEmail: "alexandre.dupuis@techco.com",
    contactPhone: "+33 6 45 67 89 01",
    staff: [
      {
        id: "staff-019",
        name: "Mathieu Simon",
        role: "Responsable événement",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-020",
        name: "Élodie Bertrand",
        role: "Chef",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-021",
        name: "Romain Garnier",
        role: "Barman",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    deposit: 1500.0,
    totalAmount: 5250.0,
    paidAmount: 0.0,
    notes: "Annulé par le client pour raisons internes. Remboursement du dépôt en attente.",
    createdAt: "2025-02-20T15:45:00Z",
    updatedAt: "2025-03-25T11:20:00Z",
  },
  {
    id: "evt-006",
    title: "Dégustation Vins et Fromages",
    type: "promotion",
    status: "in_progress",
    date: "2025-04-14",
    startTime: "18:30",
    endTime: "21:30",
    location: "Cave à vin",
    capacity: 25,
    guestCount: 22,
    description: "Soirée dégustation de vins et fromages régionaux",
    contactName: "Direction du restaurant",
    contactEmail: "contact@restaurant.com",
    contactPhone: "+33 1 23 45 67 89",
    staff: [
      {
        id: "staff-022",
        name: "Vincent Lemoine",
        role: "Sommelier",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-023",
        name: "Isabelle Renaud",
        role: "Fromagère",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "staff-024",
        name: "Benoît Marchand",
        role: "Serveur",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    menu: {
      id: "menu-005",
      name: "Dégustation Vins et Fromages",
      price: 45.0,
      items: ["Sélection de 6 vins régionaux", "Plateau de fromages affinés", "Pain artisanal et condiments"],
    },
    totalAmount: 990.0,
    paidAmount: 990.0,
    notes: "Événement récurrent mensuel, prévoir documentation sur les vins et fromages",
    createdAt: "2025-03-01T16:30:00Z",
    updatedAt: "2025-04-14T17:00:00Z",
  },
]

// Helper functions
const getStatusColor = (status: EventStatus) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-500"
    case "in_progress":
      return "bg-green-500"
    case "completed":
      return "bg-gray-500"
    case "cancelled":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusText = (status: EventStatus) => {
  switch (status) {
    case "upcoming":
      return "À venir"
    case "in_progress":
      return "En cours"
    case "completed":
      return "Terminé"
    case "cancelled":
      return "Annulé"
    default:
      return "Inconnu"
  }
}

const getEventTypeText = (type: EventType) => {
  switch (type) {
    case "private_party":
      return "Fête privée"
    case "corporate":
      return "Entreprise"
    case "wedding":
      return "Mariage"
    case "birthday":
      return "Anniversaire"
    case "promotion":
      return "Promotion"
    case "holiday":
      return "Jour férié"
    case "other":
      return "Autre"
    default:
      return "Inconnu"
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

export default function EventsPage() {
  const params = useParams<{ restaurantId: string }>()
  const { restaurantId } = params

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false)
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [isEditEventOpen, setIsEditEventOpen] = useState(false)
  const [isDeleteEventOpen, setIsDeleteEventOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  // Form state for create/edit
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    type: "private_party",
    date: new Date().toISOString().split("T")[0],
    startTime: "18:00",
    endTime: "22:00",
    location: "",
    capacity: 0,
    guestCount: 0,
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    totalAmount: 0,
    paidAmount: 0,
  })

  useEffect(() => {
    // Simulate API call
    const fetchEvents = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/restaurants/${restaurantId}/events`)
        // const data = await response.json()

        // Using mock data for now
        setTimeout(() => {
          setEvents(mockEvents)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [restaurantId])

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesType = typeFilter === "all" || event.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewEventDetails = (event: Event) => {
    setSelectedEvent(event)
    setIsEventDetailsOpen(true)
  }

  const handleCreateEvent = () => {
    // Reset form data
    setFormData({
      title: "",
      type: "private_party",
      date: new Date().toISOString().split("T")[0],
      startTime: "18:00",
      endTime: "22:00",
      location: "",
      capacity: 0,
      guestCount: 0,
      description: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      totalAmount: 0,
      paidAmount: 0,
    })
    setIsCreateEventOpen(true)
  }

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event)
    setFormData({
      ...event,
    })
    setIsEditEventOpen(true)
  }

  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event)
    setIsDeleteEventOpen(true)
  }

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitCreate = () => {
    // In a real app, this would be an API call
    const newEvent: Event = {
      id: `evt-${Math.floor(Math.random() * 1000)}`,
      ...(formData as any),
      status: "upcoming",
      staff: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setEvents([...events, newEvent])
    setIsCreateEventOpen(false)
  }

  const handleSubmitEdit = () => {
    if (!selectedEvent) return

    // In a real app, this would be an API call
    const updatedEvent: Event = {
      ...selectedEvent,
      ...(formData as any),
      updatedAt: new Date().toISOString(),
    }

    setEvents(events.map((event) => (event.id === selectedEvent.id ? updatedEvent : event)))
    setIsEditEventOpen(false)
  }

  const handleConfirmDelete = () => {
    if (!selectedEvent) return

    // In a real app, this would be an API call
    setEvents(events.filter((event) => event.id !== selectedEvent.id))
    setIsDeleteEventOpen(false)
  }

  const getUpcomingEventsCount = () => {
    return events.filter((event) => event.status === "upcoming").length
  }

  const getInProgressEventsCount = () => {
    return events.filter((event) => event.status === "in_progress").length
  }

  const getCompletedEventsCount = () => {
    return events.filter((event) => event.status === "completed").length
  }

  const getCancelledEventsCount = () => {
    return events.filter((event) => event.status === "cancelled").length
  }

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Événements</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Événements</h1>
          <p className="text-muted-foreground">Gérez les événements spéciaux et réservations de groupe</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}>
            {viewMode === "list" ? (
              <>
                <CalendarDays className="mr-2 h-4 w-4" />
                Vue calendrier
              </>
            ) : (
              <>
                <ListFilter className="mr-2 h-4 w-4" />
                Vue liste
              </>
            )}
          </Button>
          <Button variant="default" size="sm" onClick={handleCreateEvent}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel événement
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">À venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getUpcomingEventsCount()}</div>
            <p className="text-xs text-muted-foreground">Événements planifiés</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getInProgressEventsCount()}</div>
            <p className="text-xs text-muted-foreground">Événements en cours aujourd'hui</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Terminés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getCompletedEventsCount()}</div>
            <p className="text-xs text-muted-foreground">Événements passés</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annulés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getCancelledEventsCount()}</div>
            <p className="text-xs text-muted-foreground">Événements annulés</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par titre, contact ou description..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="upcoming">À venir</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="completed">Terminés</SelectItem>
                <SelectItem value="cancelled">Annulés</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="private_party">Fête privée</SelectItem>
                <SelectItem value="corporate">Entreprise</SelectItem>
                <SelectItem value="wedding">Mariage</SelectItem>
                <SelectItem value="birthday">Anniversaire</SelectItem>
                <SelectItem value="promotion">Promotion</SelectItem>
                <SelectItem value="holiday">Jour férié</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>
        </div>

        {viewMode === "list" ? (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="in_progress">En cours</TabsTrigger>
              <TabsTrigger value="completed">Terminés</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className={`w-full md:w-2 ${getStatusColor(event.status)}`}></div>
                          <div className="p-4 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                              <div>
                                <h3 className="text-lg font-semibold">{event.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={getStatusColor(event.status)}>{getStatusText(event.status)}</Badge>
                                  <Badge variant="outline">{getEventTypeText(event.type)}</Badge>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">{formatDate(event.date)}</div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="flex items-center">
                                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                                    {event.date}
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                    {event.startTime} - {event.endTime}
                                  </span>
                                  <span className="flex items-center">
                                    <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                                    {event.location}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {event.guestCount} / {event.capacity} invités
                                  </span>
                                </div>

                                <div className="text-sm">
                                  <span className="text-muted-foreground">Contact: </span>
                                  <span>{event.contactName}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditEvent(event)
                                  }}
                                >
                                  <Edit className="mr-1 h-4 w-4" />
                                  Modifier
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleViewEventDetails(event)}>
                                  <span className="sr-only md:not-sr-only md:inline-flex">Détails</span>
                                  <ChevronRight className="h-4 w-4 md:ml-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucun événement ne correspond à vos critères</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-4">
              <div className="space-y-4">
                {filteredEvents.filter((event) => event.status === "upcoming").length > 0 ? (
                  filteredEvents
                    .filter((event) => event.status === "upcoming")
                    .map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className={`w-full md:w-2 ${getStatusColor(event.status)}`}></div>
                            <div className="p-4 flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold">{event.title}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className={getStatusColor(event.status)}>
                                      {getStatusText(event.status)}
                                    </Badge>
                                    <Badge variant="outline">{getEventTypeText(event.type)}</Badge>
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground">{formatDate(event.date)}</div>
                              </div>

                              <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className="flex items-center">
                                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                                      {event.date}
                                    </span>
                                    <span className="flex items-center">
                                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                      {event.startTime} - {event.endTime}
                                    </span>
                                    <span className="flex items-center">
                                      <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                                      {event.location}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-sm">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {event.guestCount} / {event.capacity} invités
                                    </span>
                                  </div>

                                  <div className="text-sm">
                                    <span className="text-muted-foreground">Contact: </span>
                                    <span>{event.contactName}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleEditEvent(event)
                                    }}
                                  >
                                    <Edit className="mr-1 h-4 w-4" />
                                    Modifier
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleViewEventDetails(event)}>
                                    <span className="sr-only md:not-sr-only md:inline-flex">Détails</span>
                                    <ChevronRight className="h-4 w-4 md:ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucun événement à venir</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="in_progress" className="mt-4">
              <div className="space-y-4">
                {filteredEvents.filter((event) => event.status === "in_progress").length > 0 ? (
                  filteredEvents
                    .filter((event) => event.status === "in_progress")
                    .map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className={`w-full md:w-2 ${getStatusColor(event.status)}`}></div>
                            <div className="p-4 flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold">{event.title}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className={getStatusColor(event.status)}>
                                      {getStatusText(event.status)}
                                    </Badge>
                                    <Badge variant="outline">{getEventTypeText(event.type)}</Badge>
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground">{formatDate(event.date)}</div>
                              </div>

                              <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className="flex items-center">
                                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                                      {event.date}
                                    </span>
                                    <span className="flex items-center">
                                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                      {event.startTime} - {event.endTime}
                                    </span>
                                    <span className="flex items-center">
                                      <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                                      {event.location}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-sm">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {event.guestCount} / {event.capacity} invités
                                    </span>
                                  </div>

                                  <div className="text-sm">
                                    <span className="text-muted-foreground">Contact: </span>
                                    <span>{event.contactName}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleEditEvent(event)
                                    }}
                                  >
                                    <Edit className="mr-1 h-4 w-4" />
                                    Modifier
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleViewEventDetails(event)}>
                                    <span className="sr-only md:not-sr-only md:inline-flex">Détails</span>
                                    <ChevronRight className="h-4 w-4 md:ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucun événement en cours</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                {filteredEvents.filter((event) => event.status === "completed").length > 0 ? (
                  filteredEvents
                    .filter((event) => event.status === "completed")
                    .map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className={`w-full md:w-2 ${getStatusColor(event.status)}`}></div>
                            <div className="p-4 flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold">{event.title}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className={getStatusColor(event.status)}>
                                      {getStatusText(event.status)}
                                    </Badge>
                                    <Badge variant="outline">{getEventTypeText(event.type)}</Badge>
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground">{formatDate(event.date)}</div>
                              </div>

                              <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className="flex items-center">
                                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                                      {event.date}
                                    </span>
                                    <span className="flex items-center">
                                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                      {event.startTime} - {event.endTime}
                                    </span>
                                    <span className="flex items-center">
                                      <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                                      {event.location}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-sm">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {event.guestCount} / {event.capacity} invités
                                    </span>
                                  </div>

                                  <div className="text-sm">
                                    <span className="text-muted-foreground">Contact: </span>
                                    <span>{event.contactName}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => handleViewEventDetails(event)}>
                                    <span className="sr-only md:not-sr-only md:inline-flex">Détails</span>
                                    <ChevronRight className="h-4 w-4 md:ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucun événement terminé</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="text-center py-20">
                <p className="text-muted-foreground">Vue calendrier en cours de développement</p>
                <p className="text-sm text-muted-foreground mt-2">Cette fonctionnalité sera disponible prochainement</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog pour les détails de l'événement */}
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(selectedEvent.status)}>
                      {getStatusText(selectedEvent.status)}
                    </Badge>
                    <Badge variant="outline">{getEventTypeText(selectedEvent.type)}</Badge>
                  </div>
                </div>
                <DialogDescription>
                  {formatDate(selectedEvent.date)} • {selectedEvent.startTime} - {selectedEvent.endTime}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Informations générales</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {selectedEvent.guestCount} / {selectedEvent.capacity} invités
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Description:</p>
                        <p className="text-sm">{selectedEvent.description}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contact</h3>
                    <div className="space-y-2">
                      <p>
                        <span className="text-muted-foreground">Nom:</span> {selectedEvent.contactName}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email:</span> {selectedEvent.contactEmail}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Téléphone:</span> {selectedEvent.contactPhone}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Personnel assigné</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.staff.map((staff) => (
                      <div key={staff.id} className="flex items-center gap-2 p-2 border rounded-md">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={staff.avatar || ""} alt={staff.name} />
                          <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{staff.name}</p>
                          <p className="text-xs text-muted-foreground">{staff.role}</p>
                        </div>
                      </div>
                    ))}
                    {selectedEvent.staff.length === 0 && (
                      <p className="text-sm text-muted-foreground">Aucun personnel assigné</p>
                    )}
                  </div>
                </div>

                {selectedEvent.menu && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Menu</h3>
                      <div className="space-y-2">
                        <p className="font-medium">{selectedEvent.menu.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(selectedEvent.menu.price)} par personne
                        </p>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground mb-1">Plats:</p>
                          <ul className="text-sm list-disc pl-5">
                            {selectedEvent.menu.items.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Informations financières</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Montant total:</p>
                      <p className="font-medium">{formatCurrency(selectedEvent.totalAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Montant payé:</p>
                      <p className="font-medium">{formatCurrency(selectedEvent.paidAmount)}</p>
                    </div>
                    {selectedEvent.deposit && (
                      <div>
                        <p className="text-sm text-muted-foreground">Acompte:</p>
                        <p className="font-medium">{formatCurrency(selectedEvent.deposit)}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Reste à payer:</p>
                      <p className="font-medium">
                        {formatCurrency(selectedEvent.totalAmount - selectedEvent.paidAmount)}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedEvent.notes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Notes</h3>
                      <p className="text-sm">{selectedEvent.notes}</p>
                    </div>
                  </>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="sm:w-auto w-full" onClick={() => setIsEventDetailsOpen(false)}>
                  Fermer
                </Button>
                <Button
                  variant="outline"
                  className="sm:w-auto w-full"
                  onClick={() => {
                    setIsEventDetailsOpen(false)
                    handleEditEvent(selectedEvent)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  className="sm:w-auto w-full"
                  onClick={() => {
                    setIsEventDetailsOpen(false)
                    handleDeleteEvent(selectedEvent)
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

      {/* Dialog pour créer un événement */}
      <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Créer un nouvel événement</DialogTitle>
            <DialogDescription>Remplissez les informations pour créer un nouvel événement</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input id="title" value={formData.title} onChange={(e) => handleFormChange("title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleFormChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private_party">Fête privée</SelectItem>
                    <SelectItem value="corporate">Entreprise</SelectItem>
                    <SelectItem value="wedding">Mariage</SelectItem>
                    <SelectItem value="birthday">Anniversaire</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="holiday">Jour férié</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleFormChange("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Heure de début</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleFormChange("startTime", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Heure de fin</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleFormChange("endTime", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lieu</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleFormChange("location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacité</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleFormChange("capacity", Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guestCount">Nombre d'invités</Label>
                <Input
                  id="guestCount"
                  type="number"
                  value={formData.guestCount}
                  onChange={(e) => handleFormChange("guestCount", Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleFormChange("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Nom du contact</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleFormChange("contactName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email du contact</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleFormChange("contactEmail", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Téléphone du contact</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleFormChange("contactPhone", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalAmount">Montant total</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => handleFormChange("totalAmount", Number.parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paidAmount">Montant payé</Label>
                <Input
                  id="paidAmount"
                  type="number"
                  value={formData.paidAmount}
                  onChange={(e) => handleFormChange("paidAmount", Number.parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmitCreate}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier un événement */}
      <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier l'événement</DialogTitle>
            <DialogDescription>Modifiez les informations de l'événement</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Titre</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleFormChange("type", value)}>
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private_party">Fête privée</SelectItem>
                    <SelectItem value="corporate">Entreprise</SelectItem>
                    <SelectItem value="wedding">Mariage</SelectItem>
                    <SelectItem value="birthday">Anniversaire</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="holiday">Jour férié</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleFormChange("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-startTime">Heure de début</Label>
                <Input
                  id="edit-startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleFormChange("startTime", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endTime">Heure de fin</Label>
                <Input
                  id="edit-endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleFormChange("endTime", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-location">Lieu</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => handleFormChange("location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-capacity">Capacité</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleFormChange("capacity", Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-guestCount">Nombre d'invités</Label>
                <Input
                  id="edit-guestCount"
                  type="number"
                  value={formData.guestCount}
                  onChange={(e) => handleFormChange("guestCount", Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => handleFormChange("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-contactName">Nom du contact</Label>
                <Input
                  id="edit-contactName"
                  value={formData.contactName}
                  onChange={(e) => handleFormChange("contactName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contactEmail">Email du contact</Label>
                <Input
                  id="edit-contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleFormChange("contactEmail", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contactPhone">Téléphone du contact</Label>
                <Input
                  id="edit-contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleFormChange("contactPhone", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-totalAmount">Montant total</Label>
                <Input
                  id="edit-totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => handleFormChange("totalAmount", Number.parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-paidAmount">Montant payé</Label>
                <Input
                  id="edit-paidAmount"
                  type="number"
                  value={formData.paidAmount}
                  onChange={(e) => handleFormChange("paidAmount", Number.parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">Statut</Label>
              <Select value={formData.status} onValueChange={(value) => handleFormChange("status", value)}>
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">À venir</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditEventOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmitEdit}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour supprimer un événement */}
      <Dialog open={isDeleteEventOpen} onOpenChange={setIsDeleteEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Supprimer l'événement</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="py-4">
              <p className="font-medium">{selectedEvent.title}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(selectedEvent.date)} • {selectedEvent.startTime} - {selectedEvent.endTime}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteEventOpen(false)}>
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
