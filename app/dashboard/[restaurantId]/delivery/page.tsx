"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  User,
  Package,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  RefreshCw,
  ChevronRight,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DatePicker } from "@/components/ui/date-range-picker"

// Types
type DeliveryStatus = "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "failed"

type DeliveryDriver = {
  id: string
  name: string
  phone: string
  email: string
  avatar?: string
  status: "available" | "busy" | "offline"
  currentDeliveries: number
  totalDeliveries: number
  rating: number
  vehicle: {
    type: "car" | "motorcycle" | "bicycle"
    licensePlate?: string
  }
}

type Delivery = {
  id: string
  deliveryNumber: string
  status: DeliveryStatus
  orderId: string
  orderNumber: string
  customer: {
    name: string
    phone: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  restaurant: {
    name: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  driver?: DeliveryDriver
  items: {
    quantity: number
    description: string
  }[]
  distance: number
  estimatedTime: number
  scheduledTime: string
  actualPickupTime?: string
  actualDeliveryTime?: string
  specialInstructions?: string
  paymentMethod: string
  paymentStatus: "paid" | "cash_on_delivery"
  total: number
  deliveryFee: number
  tip?: number
  createdAt: string
  updatedAt: string
}

// Mock data
const mockDrivers: DeliveryDriver[] = [
  {
    id: "driver-001",
    name: "Alexandre Dupont",
    phone: "+33 6 12 34 56 78",
    email: "alexandre.dupont@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "available",
    currentDeliveries: 0,
    totalDeliveries: 156,
    rating: 4.8,
    vehicle: {
      type: "motorcycle",
      licensePlate: "AB-123-CD",
    },
  },
  {
    id: "driver-002",
    name: "Marie Laurent",
    phone: "+33 6 23 45 67 89",
    email: "marie.laurent@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "busy",
    currentDeliveries: 1,
    totalDeliveries: 89,
    rating: 4.6,
    vehicle: {
      type: "car",
      licensePlate: "EF-456-GH",
    },
  },
  {
    id: "driver-003",
    name: "Thomas Bernard",
    phone: "+33 6 34 56 78 90",
    email: "thomas.bernard@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "available",
    currentDeliveries: 0,
    totalDeliveries: 212,
    rating: 4.9,
    vehicle: {
      type: "motorcycle",
      licensePlate: "IJ-789-KL",
    },
  },
  {
    id: "driver-004",
    name: "Sophie Martin",
    phone: "+33 6 45 67 89 01",
    email: "sophie.martin@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    currentDeliveries: 0,
    totalDeliveries: 67,
    rating: 4.5,
    vehicle: {
      type: "bicycle",
    },
  },
  {
    id: "driver-005",
    name: "Lucas Petit",
    phone: "+33 6 56 78 90 12",
    email: "lucas.petit@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "busy",
    currentDeliveries: 2,
    totalDeliveries: 134,
    rating: 4.7,
    vehicle: {
      type: "car",
      licensePlate: "MN-012-OP",
    },
  },
]

const mockDeliveries: Delivery[] = [
  {
    id: "del-001",
    deliveryNumber: "DEL-2025-0001",
    status: "pending",
    orderId: "ord-002",
    orderNumber: "ORD-2025-0002",
    customer: {
      name: "Sophie Dubois",
      phone: "+33 6 98 76 54 32",
      address: "15 Rue des Fleurs, 75001 Paris",
    },
    restaurant: {
      name: "Le Bistrot Parisien",
      address: "8 Rue de Rivoli, 75001 Paris",
    },
    items: [
      {
        quantity: 1,
        description: "Pizza Margherita",
      },
      {
        quantity: 1,
        description: "Salade César",
      },
      {
        quantity: 2,
        description: "Tiramisu",
      },
    ],
    distance: 2.3,
    estimatedTime: 25,
    scheduledTime: "2025-04-14T12:00:00Z",
    specialInstructions: "Code d'entrée: 1234. 3ème étage, porte de droite.",
    paymentMethod: "PayPal",
    paymentStatus: "paid",
    total: 49.75,
    deliveryFee: 4.99,
    tip: 3.0,
    createdAt: "2025-04-14T11:15:00Z",
    updatedAt: "2025-04-14T11:15:00Z",
  },
  {
    id: "del-002",
    deliveryNumber: "DEL-2025-0002",
    status: "assigned",
    orderId: "ord-005",
    orderNumber: "ORD-2025-0005",
    customer: {
      name: "Pierre Moreau",
      phone: "+33 6 45 67 89 01",
      address: "8 Avenue Victor Hugo, 75016 Paris",
    },
    restaurant: {
      name: "Le Bistrot Parisien",
      address: "8 Rue de Rivoli, 75001 Paris",
    },
    driver: mockDrivers[1], // Marie Laurent
    items: [
      {
        quantity: 1,
        description: "Poulet Rôti",
      },
      {
        quantity: 1,
        description: "Pommes de terre sautées",
      },
      {
        quantity: 1,
        description: "Légumes grillés",
      },
      {
        quantity: 2,
        description: "Mousse au chocolat",
      },
    ],
    distance: 5.7,
    estimatedTime: 35,
    scheduledTime: "2025-04-14T14:15:00Z",
    specialInstructions: "Appeler à l'arrivée.",
    paymentMethod: "Carte bancaire",
    paymentStatus: "paid",
    total: 58.34,
    deliveryFee: 4.99,
    tip: 5.0,
    createdAt: "2025-04-14T13:30:00Z",
    updatedAt: "2025-04-14T13:45:00Z",
  },
  {
    id: "del-003",
    deliveryNumber: "DEL-2025-0003",
    status: "picked_up",
    orderId: "ord-007",
    orderNumber: "ORD-2025-0007",
    customer: {
      name: "Jean Lefevre",
      phone: "+33 6 78 90 12 34",
      address: "42 Boulevard Haussmann, 75009 Paris",
    },
    restaurant: {
      name: "Le Bistrot Parisien",
      address: "8 Rue de Rivoli, 75001 Paris",
    },
    driver: mockDrivers[4], // Lucas Petit
    items: [
      {
        quantity: 2,
        description: "Burger Gourmet",
      },
      {
        quantity: 2,
        description: "Frites Maison",
      },
      {
        quantity: 2,
        description: "Coca-Cola",
      },
    ],
    distance: 3.8,
    estimatedTime: 30,
    scheduledTime: "2025-04-14T13:30:00Z",
    actualPickupTime: "2025-04-14T13:35:00Z",
    paymentMethod: "Carte bancaire",
    paymentStatus: "paid",
    total: 45.8,
    deliveryFee: 4.99,
    createdAt: "2025-04-14T13:00:00Z",
    updatedAt: "2025-04-14T13:35:00Z",
  },
  {
    id: "del-004",
    deliveryNumber: "DEL-2025-0004",
    status: "in_transit",
    orderId: "ord-008",
    orderNumber: "ORD-2025-0008",
    customer: {
      name: "Camille Rousseau",
      phone: "+33 6 12 34 56 78",
      address: "17 Rue de Passy, 75016 Paris",
    },
    restaurant: {
      name: "Le Bistrot Parisien",
      address: "8 Rue de Rivoli, 75001 Paris",
    },
    driver: mockDrivers[4], // Lucas Petit
    items: [
      {
        quantity: 1,
        description: "Plateau de sushis (24 pièces)",
      },
      {
        quantity: 2,
        description: "Soupe miso",
      },
      {
        quantity: 1,
        description: "Salade de chou",
      },
    ],
    distance: 6.2,
    estimatedTime: 40,
    scheduledTime: "2025-04-14T13:45:00Z",
    actualPickupTime: "2025-04-14T13:50:00Z",
    paymentMethod: "Apple Pay",
    paymentStatus: "paid",
    total: 52.9,
    deliveryFee: 5.99,
    tip: 4.0,
    createdAt: "2025-04-14T13:15:00Z",
    updatedAt: "2025-04-14T13:50:00Z",
  },
  {
    id: "del-005",
    deliveryNumber: "DEL-2025-0005",
    status: "delivered",
    orderId: "ord-009",
    orderNumber: "ORD-2025-0009",
    customer: {
      name: "Antoine Mercier",
      phone: "+33 6 23 45 67 89",
      address: "5 Avenue Montaigne, 75008 Paris",
    },
    restaurant: {
      name: "Le Bistrot Parisien",
      address: "8 Rue de Rivoli, 75001 Paris",
    },
    driver: mockDrivers[0], // Alexandre Dupont
    items: [
      {
        quantity: 2,
        description: "Pâtes Carbonara",
      },
      {
        quantity: 1,
        description: "Salade verte",
      },
      {
        quantity: 1,
        description: "Tiramisu",
      },
    ],
    distance: 4.1,
    estimatedTime: 30,
    scheduledTime: "2025-04-14T12:30:00Z",
    actualPickupTime: "2025-04-14T12:35:00Z",
    actualDeliveryTime: "2025-04-14T13:00:00Z",
    paymentMethod: "Carte bancaire",
    paymentStatus: "paid",
    total: 42.5,
    deliveryFee: 4.99,
    tip: 3.5,
    createdAt: "2025-04-14T12:00:00Z",
    updatedAt: "2025-04-14T13:00:00Z",
  },
  {
    id: "del-006",
    deliveryNumber: "DEL-2025-0006",
    status: "failed",
    orderId: "ord-010",
    orderNumber: "ORD-2025-0010",
    customer: {
      name: "Émilie Dubois",
      phone: "+33 6 34 56 78 90",
      address: "28 Rue Saint-Dominique, 75007 Paris",
    },
    restaurant: {
      name: "Le Bistrot Parisien",
      address: "8 Rue de Rivoli, 75001 Paris",
    },
    driver: mockDrivers[2], // Thomas Bernard
    items: [
      {
        quantity: 1,
        description: "Salade Niçoise",
      },
      {
        quantity: 1,
        description: "Quiche Lorraine",
      },
      {
        quantity: 2,
        description: "Éclair au chocolat",
      },
    ],
    distance: 3.5,
    estimatedTime: 25,
    scheduledTime: "2025-04-14T12:15:00Z",
    actualPickupTime: "2025-04-14T12:20:00Z",
    specialInstructions: "Échec de livraison: client absent, ne répond pas au téléphone.",
    paymentMethod: "Carte bancaire",
    paymentStatus: "paid",
    total: 36.75,
    deliveryFee: 4.99,
    createdAt: "2025-04-14T11:45:00Z",
    updatedAt: "2025-04-14T12:45:00Z",
  },
]

// Helper functions
const getStatusColor = (status: DeliveryStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500"
    case "assigned":
      return "bg-blue-500"
    case "picked_up":
      return "bg-purple-500"
    case "in_transit":
      return "bg-indigo-500"
    case "delivered":
      return "bg-green-500"
    case "failed":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusText = (status: DeliveryStatus) => {
  switch (status) {
    case "pending":
      return "En attente"
    case "assigned":
      return "Assignée"
    case "picked_up":
      return "Récupérée"
    case "in_transit":
      return "En cours"
    case "delivered":
      return "Livrée"
    case "failed":
      return "Échouée"
    default:
      return "Inconnu"
  }
}

const getDriverStatusColor = (status: DeliveryDriver["status"]) => {
  switch (status) {
    case "available":
      return "bg-green-500"
    case "busy":
      return "bg-yellow-500"
    case "offline":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

const getDriverStatusText = (status: DeliveryDriver["status"]) => {
  switch (status) {
    case "available":
      return "Disponible"
    case "busy":
      return "Occupé"
    case "offline":
      return "Hors ligne"
    default:
      return "Inconnu"
  }
}

const getVehicleTypeText = (type: DeliveryDriver["vehicle"]["type"]) => {
  switch (type) {
    case "car":
      return "Voiture"
    case "motorcycle":
      return "Moto"
    case "bicycle":
      return "Vélo"
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
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default function DeliveryPage() {
  const params = useParams<{ restaurantId: string }>()
  const { restaurantId } = params

  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [drivers, setDrivers] = useState<DeliveryDriver[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)
  const [isDeliveryDetailsOpen, setIsDeliveryDetailsOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<DeliveryDriver | null>(null)
  const [isAssignDriverOpen, setIsAssignDriverOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, this would be API calls
        // const deliveriesResponse = await fetch(`/api/restaurants/${restaurantId}/deliveries`)
        // const driversResponse = await fetch(`/api/restaurants/${restaurantId}/drivers`)
        // const deliveriesData = await deliveriesResponse.json()
        // const driversData = await driversResponse.json()

        // Using mock data for now
        setTimeout(() => {
          setDeliveries(mockDeliveries)
          setDrivers(mockDrivers)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [restaurantId])

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.deliveryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customer.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewDeliveryDetails = (delivery: Delivery) => {
    setSelectedDelivery(delivery)
    setIsDeliveryDetailsOpen(true)
  }

  const handleAssignDriver = (delivery: Delivery) => {
    setSelectedDelivery(delivery)
    setIsAssignDriverOpen(true)
  }

  const handleConfirmAssignDriver = () => {
    if (!selectedDelivery || !selectedDriver) return

    const updatedDelivery: Delivery = {
      ...selectedDelivery,
      status: "assigned",
      driver: selectedDriver,
      updatedAt: new Date().toISOString(),
    }

    setDeliveries(deliveries.map((d) => (d.id === selectedDelivery.id ? updatedDelivery : d)))

    // Update driver status
    setDrivers(
      drivers.map((d) =>
        d.id === selectedDriver.id ? { ...d, status: "busy", currentDeliveries: d.currentDeliveries + 1 } : d,
      ),
    )

    setIsAssignDriverOpen(false)
    setSelectedDriver(null)
  }

  const handleUpdateDeliveryStatus = (deliveryId: string, newStatus: DeliveryStatus) => {
    const delivery = deliveries.find((d) => d.id === deliveryId)
    if (!delivery) return

    const updatedDelivery: Delivery = {
      ...delivery,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    }

    if (newStatus === "picked_up") {
      updatedDelivery.actualPickupTime = new Date().toISOString()
    } else if (newStatus === "delivered") {
      updatedDelivery.actualDeliveryTime = new Date().toISOString()

      // Free up the driver
      if (updatedDelivery.driver) {
        const driverId = updatedDelivery.driver.id
        setDrivers(
          drivers.map((d) =>
            d.id === driverId
              ? {
                  ...d,
                  currentDeliveries: Math.max(0, d.currentDeliveries - 1),
                  totalDeliveries: d.totalDeliveries + 1,
                  status: d.currentDeliveries <= 1 ? "available" : "busy",
                }
              : d,
          ),
        )
      }
    }

    setDeliveries(deliveries.map((d) => (d.id === deliveryId ? updatedDelivery : d)))

    if (selectedDelivery && selectedDelivery.id === deliveryId) {
      setSelectedDelivery(updatedDelivery)
    }
  }

  const handleRefreshData = () => {
    setLoading(true)
    // In a real app, this would refetch the data
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const getNextStatus = (currentStatus: DeliveryStatus): DeliveryStatus | null => {
    switch (currentStatus) {
      case "pending":
        return "assigned"
      case "assigned":
        return "picked_up"
      case "picked_up":
        return "in_transit"
      case "in_transit":
        return "delivered"
      default:
        return null
    }
  }

  const getPendingDeliveriesCount = () => {
    return deliveries.filter((delivery) => delivery.status === "pending").length
  }

  const getActiveDeliveriesCount = () => {
    return deliveries.filter((delivery) => ["assigned", "picked_up", "in_transit"].includes(delivery.status)).length
  }

  const getCompletedDeliveriesCount = () => {
    return deliveries.filter((delivery) => delivery.status === "delivered").length
  }

  const getFailedDeliveriesCount = () => {
    return deliveries.filter((delivery) => delivery.status === "failed").length
  }

  const getAvailableDriversCount = () => {
    return drivers.filter((driver) => driver.status === "available").length
  }

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des livraisons</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des livraisons</h1>
          <p className="text-muted-foreground">Suivez et gérez les livraisons de vos commandes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
          <DatePicker date={selectedDate} setDate={setSelectedDate} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getPendingDeliveriesCount()}</div>
            <p className="text-xs text-muted-foreground">Livraisons à assigner</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getActiveDeliveriesCount()}</div>
            <p className="text-xs text-muted-foreground">Livraisons en préparation ou en route</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Livrées aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getCompletedDeliveriesCount()}</div>
            <p className="text-xs text-muted-foreground">Livraisons terminées avec succès</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Livreurs disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAvailableDriversCount()}</div>
            <p className="text-xs text-muted-foreground">Sur {drivers.length} livreurs au total</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par numéro, client ou adresse..."
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
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="assigned">Assignées</SelectItem>
                <SelectItem value="picked_up">Récupérées</SelectItem>
                <SelectItem value="in_transit">En cours</SelectItem>
                <SelectItem value="delivered">Livrées</SelectItem>
                <SelectItem value="failed">Échouées</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="active">En cours</TabsTrigger>
            <TabsTrigger value="completed">Livrées</TabsTrigger>
            <TabsTrigger value="drivers">Livreurs</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className={`w-full md:w-2 ${getStatusColor(delivery.status)}`}></div>
                        <div className="p-4 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono">
                                {delivery.deliveryNumber}
                              </Badge>
                              <Badge className={getStatusColor(delivery.status)}>
                                {getStatusText(delivery.status)}
                              </Badge>
                              <Badge variant="secondary">{delivery.orderNumber}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">{formatDate(delivery.createdAt)}</div>
                          </div>

                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="font-medium">{delivery.customer.name}</p>
                                  <p className="text-sm text-muted-foreground">{delivery.customer.address}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center">
                                  <Package className="mr-1 h-4 w-4 text-muted-foreground" />
                                  {delivery.items.length} articles
                                </span>
                                <span className="flex items-center">
                                  <Truck className="mr-1 h-4 w-4 text-muted-foreground" />
                                  {delivery.distance} km
                                </span>
                                <span className="flex items-center">
                                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                  {delivery.estimatedTime} min
                                </span>
                              </div>

                              {delivery.driver && (
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={delivery.driver.avatar || ""} alt={delivery.driver.name} />
                                    <AvatarFallback>{delivery.driver.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{delivery.driver.name}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {delivery.status === "pending" && (
                                <Button variant="default" size="sm" onClick={() => handleAssignDriver(delivery)}>
                                  Assigner un livreur
                                </Button>
                              )}

                              {["assigned", "picked_up", "in_transit"].includes(delivery.status) && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => {
                                    const nextStatus = getNextStatus(delivery.status)
                                    if (nextStatus) {
                                      handleUpdateDeliveryStatus(delivery.id, nextStatus)
                                    }
                                  }}
                                >
                                  {delivery.status === "assigned" && "Marquer comme récupérée"}
                                  {delivery.status === "picked_up" && "Marquer en transit"}
                                  {delivery.status === "in_transit" && "Marquer comme livrée"}
                                </Button>
                              )}

                              <Button variant="ghost" size="sm" onClick={() => handleViewDeliveryDetails(delivery)}>
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
                  <p className="text-muted-foreground">Aucune livraison ne correspond à vos critères</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            <div className="space-y-4">
              {filteredDeliveries.filter((delivery) =>
                ["pending", "assigned", "picked_up", "in_transit"].includes(delivery.status),
              ).length > 0 ? (
                filteredDeliveries
                  .filter((delivery) => ["pending", "assigned", "picked_up", "in_transit"].includes(delivery.status))
                  .map((delivery) => (
                    <Card key={delivery.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className={`w-full md:w-2 ${getStatusColor(delivery.status)}`}></div>
                          <div className="p-4 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {delivery.deliveryNumber}
                                </Badge>
                                <Badge className={getStatusColor(delivery.status)}>
                                  {getStatusText(delivery.status)}
                                </Badge>
                                <Badge variant="secondary">{delivery.orderNumber}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">{formatDate(delivery.createdAt)}</div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                  <div>
                                    <p className="font-medium">{delivery.customer.name}</p>
                                    <p className="text-sm text-muted-foreground">{delivery.customer.address}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                  <span className="flex items-center">
                                    <Package className="mr-1 h-4 w-4 text-muted-foreground" />
                                    {delivery.items.length} articles
                                  </span>
                                  <span className="flex items-center">
                                    <Truck className="mr-1 h-4 w-4 text-muted-foreground" />
                                    {delivery.distance} km
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                    {delivery.estimatedTime} min
                                  </span>
                                </div>

                                {delivery.driver && (
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={delivery.driver.avatar || ""} alt={delivery.driver.name} />
                                      <AvatarFallback>{delivery.driver.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{delivery.driver.name}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {delivery.status === "pending" && (
                                  <Button variant="default" size="sm" onClick={() => handleAssignDriver(delivery)}>
                                    Assigner un livreur
                                  </Button>
                                )}

                                {["assigned", "picked_up", "in_transit"].includes(delivery.status) && (
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => {
                                      const nextStatus = getNextStatus(delivery.status)
                                      if (nextStatus) {
                                        handleUpdateDeliveryStatus(delivery.id, nextStatus)
                                      }
                                    }}
                                  >
                                    {delivery.status === "assigned" && "Marquer comme récupérée"}
                                    {delivery.status === "picked_up" && "Marquer en transit"}
                                    {delivery.status === "in_transit" && "Marquer comme livrée"}
                                  </Button>
                                )}

                                <Button variant="ghost" size="sm" onClick={() => handleViewDeliveryDetails(delivery)}>
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
                  <p className="text-muted-foreground">Aucune livraison active</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <div className="space-y-4">
              {filteredDeliveries.filter((delivery) => ["delivered", "failed"].includes(delivery.status)).length > 0 ? (
                filteredDeliveries
                  .filter((delivery) => ["delivered", "failed"].includes(delivery.status))
                  .map((delivery) => (
                    <Card key={delivery.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className={`w-full md:w-2 ${getStatusColor(delivery.status)}`}></div>
                          <div className="p-4 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {delivery.deliveryNumber}
                                </Badge>
                                <Badge className={getStatusColor(delivery.status)}>
                                  {getStatusText(delivery.status)}
                                </Badge>
                                <Badge variant="secondary">{delivery.orderNumber}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">{formatDate(delivery.createdAt)}</div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                  <div>
                                    <p className="font-medium">{delivery.customer.name}</p>
                                    <p className="text-sm text-muted-foreground">{delivery.customer.address}</p>
                                  </div>
                                </div>

                                {delivery.actualDeliveryTime && (
                                  <div className="flex items-center text-sm">
                                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                    <span>Livré à {formatTime(delivery.actualDeliveryTime)}</span>
                                  </div>
                                )}

                                {delivery.driver && (
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={delivery.driver.avatar || ""} alt={delivery.driver.name} />
                                      <AvatarFallback>{delivery.driver.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{delivery.driver.name}</span>
                                  </div>
                                )}

                                {delivery.status === "failed" && delivery.specialInstructions && (
                                  <div className="flex items-center text-sm">
                                    <AlertTriangle className="mr-1 h-4 w-4 text-red-500" />
                                    <span className="text-red-500">{delivery.specialInstructions}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleViewDeliveryDetails(delivery)}>
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
                  <p className="text-muted-foreground">Aucune livraison terminée</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="drivers" className="mt-4">
            <div className="space-y-4">
              {drivers.map((driver) => (
                <Card key={driver.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={driver.avatar || ""} alt={driver.name} />
                          <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{driver.name}</h3>
                            <Badge className={getDriverStatusColor(driver.status)}>
                              {getDriverStatusText(driver.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Phone className="mr-1 h-4 w-4" />
                              {driver.phone}
                            </span>
                            <span className="flex items-center">
                              <Truck className="mr-1 h-4 w-4" />
                              {getVehicleTypeText(driver.vehicle.type)}
                              {driver.vehicle.licensePlate && ` (${driver.vehicle.licensePlate})`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Livraisons en cours:</span>
                            <span className="ml-1 font-medium">{driver.currentDeliveries}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total:</span>
                            <span className="ml-1 font-medium">{driver.totalDeliveries}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Note:</span>
                            <span className="ml-1 font-medium">{driver.rating}/5</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog pour les détails de la livraison */}
      <Dialog open={isDeliveryDetailsOpen} onOpenChange={setIsDeliveryDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedDelivery && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>Livraison {selectedDelivery.deliveryNumber}</DialogTitle>
                  <Badge className={getStatusColor(selectedDelivery.status)}>
                    {getStatusText(selectedDelivery.status)}
                  </Badge>
                </div>
                <DialogDescription>
                  {formatDate(selectedDelivery.createdAt)} • Commande {selectedDelivery.orderNumber}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Client</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDelivery.customer.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDelivery.customer.phone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{selectedDelivery.customer.address}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Restaurant</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDelivery.restaurant.name}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{selectedDelivery.restaurant.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedDelivery.driver && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Livreur</h3>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedDelivery.driver.avatar || ""} alt={selectedDelivery.driver.name} />
                          <AvatarFallback>{selectedDelivery.driver.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedDelivery.driver.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Phone className="mr-1 h-4 w-4" />
                              {selectedDelivery.driver.phone}
                            </span>
                            <span className="flex items-center">
                              <Truck className="mr-1 h-4 w-4" />
                              {getVehicleTypeText(selectedDelivery.driver.vehicle.type)}
                              {selectedDelivery.driver.vehicle.licensePlate &&
                                ` (${selectedDelivery.driver.vehicle.licensePlate})`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Articles</h3>
                  <ScrollArea className="h-[150px]">
                    <div className="space-y-2">
                      {selectedDelivery.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span>
                            {item.quantity}x {item.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Informations de livraison</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="ml-1">{selectedDelivery.distance} km</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Temps estimé:</span>
                      <span className="ml-1">{selectedDelivery.estimatedTime} min</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Heure prévue:</span>
                      <span className="ml-1">{formatTime(selectedDelivery.scheduledTime)}</span>
                    </div>
                    {selectedDelivery.actualPickupTime && (
                      <div>
                        <span className="text-muted-foreground">Heure de récupération:</span>
                        <span className="ml-1">{formatTime(selectedDelivery.actualPickupTime)}</span>
                      </div>
                    )}
                    {selectedDelivery.actualDeliveryTime && (
                      <div>
                        <span className="text-muted-foreground">Heure de livraison:</span>
                        <span className="ml-1">{formatTime(selectedDelivery.actualDeliveryTime)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Paiement</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total:</span>
                      <span className="ml-1 font-medium">{formatCurrency(selectedDelivery.total)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frais de livraison:</span>
                      <span className="ml-1">{formatCurrency(selectedDelivery.deliveryFee)}</span>
                    </div>
                    {selectedDelivery.tip && (
                      <div>
                        <span className="text-muted-foreground">Pourboire:</span>
                        <span className="ml-1">{formatCurrency(selectedDelivery.tip)}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Méthode:</span>
                      <span className="ml-1">{selectedDelivery.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Statut:</span>
                      <span className={`ml-1 ${selectedDelivery.paymentStatus === "paid" ? "text-green-600" : ""}`}>
                        {selectedDelivery.paymentStatus === "paid" ? "Payé" : "À payer à la livraison"}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedDelivery.specialInstructions && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Instructions spéciales</h3>
                      <p className="text-sm">{selectedDelivery.specialInstructions}</p>
                    </div>
                  </>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="sm:w-auto w-full" onClick={() => setIsDeliveryDetailsOpen(false)}>
                  Fermer
                </Button>

                {selectedDelivery.status === "pending" && (
                  <Button className="sm:w-auto w-full" onClick={() => handleAssignDriver(selectedDelivery)}>
                    Assigner un livreur
                  </Button>
                )}

                {["assigned", "picked_up", "in_transit"].includes(selectedDelivery.status) && (
                  <Button
                    className="sm:w-auto w-full"
                    onClick={() => {
                      const nextStatus = getNextStatus(selectedDelivery.status)
                      if (nextStatus) {
                        handleUpdateDeliveryStatus(selectedDelivery.id, nextStatus)
                      }
                    }}
                  >
                    {selectedDelivery.status === "assigned" && "Marquer comme récupérée"}
                    {selectedDelivery.status === "picked_up" && "Marquer en transit"}
                    {selectedDelivery.status === "in_transit" && "Marquer comme livrée"}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog pour assigner un livreur */}
      <Dialog open={isAssignDriverOpen} onOpenChange={setIsAssignDriverOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assigner un livreur</DialogTitle>
            <DialogDescription>Sélectionnez un livreur disponible pour cette livraison</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            {drivers
              .filter((driver) => driver.status === "available")
              .map((driver) => (
                <div
                  key={driver.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedDriver?.id === driver.id ? "border-primary bg-primary/10" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedDriver(driver)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={driver.avatar || ""} alt={driver.name} />
                      <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{driver.name}</p>
                        <Badge variant="secondary">{getVehicleTypeText(driver.vehicle.type)}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{driver.phone}</span>
                        <span>{driver.rating}/5 ★</span>
                      </div>
                    </div>
                    {selectedDriver?.id === driver.id && <CheckCircle className="h-5 w-5 text-primary" />}
                  </div>
                </div>
              ))}

            {drivers.filter((driver) => driver.status === "available").length === 0 && (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Aucun livreur disponible actuellement</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDriverOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleConfirmAssignDriver} disabled={!selectedDriver}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
