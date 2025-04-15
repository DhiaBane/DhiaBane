"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  ShoppingBag,
  Clock,
  Check,
  X,
  ChevronRight,
  Filter,
  Search,
  Printer,
  RefreshCw,
  AlertCircle,
  MapPin,
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Types
type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"

type OrderType = "pickup" | "delivery"

type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
  options?: string[]
  notes?: string
}

type Order = {
  id: string
  orderNumber: string
  status: OrderStatus
  type: OrderType
  items: OrderItem[]
  customer: {
    id: string
    name: string
    phone: string
    email?: string
    address?: string
    avatar?: string
  }
  subtotal: number
  tax: number
  deliveryFee?: number
  tip?: number
  total: number
  paymentMethod: string
  paymentStatus: "paid" | "pending" | "failed"
  createdAt: string
  estimatedReadyTime?: string
  specialInstructions?: string
}

// Mock data
const mockOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "ORD-2025-0001",
    status: "pending",
    type: "pickup",
    items: [
      {
        id: "item-001",
        name: "Burger Classique",
        quantity: 2,
        price: 12.99,
        options: ["Sans oignon", "Cuisson medium"],
      },
      {
        id: "item-002",
        name: "Frites Maison",
        quantity: 1,
        price: 4.99,
      },
      {
        id: "item-003",
        name: "Coca-Cola",
        quantity: 2,
        price: 2.99,
      },
    ],
    customer: {
      id: "cust-001",
      name: "Thomas Martin",
      phone: "+33 6 12 34 56 78",
      email: "thomas.martin@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subtotal: 36.95,
    tax: 3.7,
    total: 40.65,
    paymentMethod: "Carte bancaire",
    paymentStatus: "paid",
    createdAt: "2025-04-14T10:30:00Z",
    estimatedReadyTime: "2025-04-14T11:00:00Z",
    specialInstructions: "Merci d'ajouter des serviettes supplémentaires.",
  },
  {
    id: "ord-002",
    orderNumber: "ORD-2025-0002",
    status: "confirmed",
    type: "delivery",
    items: [
      {
        id: "item-004",
        name: "Pizza Margherita",
        quantity: 1,
        price: 14.99,
      },
      {
        id: "item-005",
        name: "Salade César",
        quantity: 1,
        price: 8.99,
      },
      {
        id: "item-006",
        name: "Tiramisu",
        quantity: 2,
        price: 6.99,
      },
    ],
    customer: {
      id: "cust-002",
      name: "Sophie Dubois",
      phone: "+33 6 98 76 54 32",
      email: "sophie.dubois@example.com",
      address: "15 Rue des Fleurs, 75001 Paris",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subtotal: 37.96,
    tax: 3.8,
    deliveryFee: 4.99,
    tip: 3.0,
    total: 49.75,
    paymentMethod: "PayPal",
    paymentStatus: "paid",
    createdAt: "2025-04-14T11:15:00Z",
    estimatedReadyTime: "2025-04-14T12:00:00Z",
  },
  {
    id: "ord-003",
    orderNumber: "ORD-2025-0003",
    status: "preparing",
    type: "pickup",
    items: [
      {
        id: "item-007",
        name: "Pâtes Carbonara",
        quantity: 3,
        price: 13.99,
      },
      {
        id: "item-008",
        name: "Pain à l'ail",
        quantity: 1,
        price: 5.99,
      },
      {
        id: "item-009",
        name: "Eau minérale",
        quantity: 3,
        price: 1.99,
      },
    ],
    customer: {
      id: "cust-003",
      name: "Jean Petit",
      phone: "+33 6 23 45 67 89",
      email: "jean.petit@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subtotal: 53.94,
    tax: 5.39,
    total: 59.33,
    paymentMethod: "Carte bancaire",
    paymentStatus: "paid",
    createdAt: "2025-04-14T12:00:00Z",
    estimatedReadyTime: "2025-04-14T12:30:00Z",
  },
  {
    id: "ord-004",
    orderNumber: "ORD-2025-0004",
    status: "ready",
    type: "pickup",
    items: [
      {
        id: "item-010",
        name: "Sushi Mix (18 pièces)",
        quantity: 1,
        price: 24.99,
      },
      {
        id: "item-011",
        name: "Soupe Miso",
        quantity: 2,
        price: 3.99,
      },
    ],
    customer: {
      id: "cust-004",
      name: "Marie Leroy",
      phone: "+33 6 34 56 78 90",
      email: "marie.leroy@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subtotal: 32.97,
    tax: 3.3,
    total: 36.27,
    paymentMethod: "Apple Pay",
    paymentStatus: "paid",
    createdAt: "2025-04-14T12:45:00Z",
    estimatedReadyTime: "2025-04-14T13:15:00Z",
  },
  {
    id: "ord-005",
    orderNumber: "ORD-2025-0005",
    status: "completed",
    type: "delivery",
    items: [
      {
        id: "item-012",
        name: "Poulet Rôti",
        quantity: 1,
        price: 18.99,
      },
      {
        id: "item-013",
        name: "Pommes de terre sautées",
        quantity: 1,
        price: 5.99,
      },
      {
        id: "item-014",
        name: "Légumes grillés",
        quantity: 1,
        price: 6.99,
      },
      {
        id: "item-015",
        name: "Mousse au chocolat",
        quantity: 2,
        price: 5.99,
      },
    ],
    customer: {
      id: "cust-005",
      name: "Pierre Moreau",
      phone: "+33 6 45 67 89 01",
      email: "pierre.moreau@example.com",
      address: "8 Avenue Victor Hugo, 75016 Paris",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subtotal: 43.95,
    tax: 4.4,
    deliveryFee: 4.99,
    tip: 5.0,
    total: 58.34,
    paymentMethod: "Carte bancaire",
    paymentStatus: "paid",
    createdAt: "2025-04-14T13:30:00Z",
    estimatedReadyTime: "2025-04-14T14:15:00Z",
  },
  {
    id: "ord-006",
    orderNumber: "ORD-2025-0006",
    status: "cancelled",
    type: "delivery",
    items: [
      {
        id: "item-016",
        name: "Salade Niçoise",
        quantity: 1,
        price: 11.99,
      },
      {
        id: "item-017",
        name: "Sandwich au poulet",
        quantity: 1,
        price: 9.99,
      },
    ],
    customer: {
      id: "cust-006",
      name: "Lucie Bernard",
      phone: "+33 6 56 78 90 12",
      email: "lucie.bernard@example.com",
      address: "25 Rue Saint-Denis, 75001 Paris",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subtotal: 21.98,
    tax: 2.2,
    deliveryFee: 4.99,
    total: 29.17,
    paymentMethod: "Carte bancaire",
    paymentStatus: "refunded",
    createdAt: "2025-04-14T14:00:00Z",
    specialInstructions: "Annulé par le client - indisponible pour la livraison",
  },
]

// Helper functions
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500"
    case "confirmed":
      return "bg-blue-500"
    case "preparing":
      return "bg-purple-500"
    case "ready":
      return "bg-green-500"
    case "completed":
      return "bg-gray-500"
    case "cancelled":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusText = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "En attente"
    case "confirmed":
      return "Confirmée"
    case "preparing":
      return "En préparation"
    case "ready":
      return "Prête"
    case "completed":
      return "Terminée"
    case "cancelled":
      return "Annulée"
    default:
      return "Inconnu"
  }
}

const getOrderTypeText = (type: OrderType) => {
  return type === "pickup" ? "À emporter" : "Livraison"
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

export default function OnlineOrdersPage() {
  const params = useParams<{ restaurantId: string }>()
  const { restaurantId } = params

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [isAutoPrintEnabled, setIsAutoPrintEnabled] = useState(false)
  const [isAutoAcceptEnabled, setIsAutoAcceptEnabled] = useState(false)

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/restaurants/${restaurantId}/online-orders`)
        // const data = await response.json()

        // Using mock data for now
        setTimeout(() => {
          setOrders(mockOrders)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching orders:", error)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [restaurantId])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesType = typeFilter === "all" || order.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsOrderDetailsOpen(true)
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const handleRefreshOrders = () => {
    setLoading(true)
    // In a real app, this would refetch the orders
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    switch (currentStatus) {
      case "pending":
        return "confirmed"
      case "confirmed":
        return "preparing"
      case "preparing":
        return "ready"
      case "ready":
        return "completed"
      default:
        return null
    }
  }

  const getPendingOrdersCount = () => {
    return orders.filter((order) => order.status === "pending").length
  }

  const getActiveOrdersCount = () => {
    return orders.filter((order) => ["confirmed", "preparing", "ready"].includes(order.status)).length
  }

  const getCompletedOrdersCount = () => {
    return orders.filter((order) => order.status === "completed").length
  }

  const getCancelledOrdersCount = () => {
    return orders.filter((order) => order.status === "cancelled").length
  }

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Commandes en ligne</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commandes en ligne</h1>
          <p className="text-muted-foreground">Gérez les commandes en ligne à emporter et en livraison</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshOrders}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
          <Button variant="default" size="sm">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Nouvelle commande
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getPendingOrdersCount()}</div>
            <p className="text-xs text-muted-foreground">Commandes nécessitant une confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getActiveOrdersCount()}</div>
            <p className="text-xs text-muted-foreground">Commandes en préparation ou prêtes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Terminées aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getCompletedOrdersCount()}</div>
            <p className="text-xs text-muted-foreground">Commandes livrées ou récupérées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annulées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getCancelledOrdersCount()}</div>
            <p className="text-xs text-muted-foreground">Commandes annulées aujourd'hui</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par numéro de commande, client ou téléphone..."
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
                <SelectItem value="confirmed">Confirmées</SelectItem>
                <SelectItem value="preparing">En préparation</SelectItem>
                <SelectItem value="ready">Prêtes</SelectItem>
                <SelectItem value="completed">Terminées</SelectItem>
                <SelectItem value="cancelled">Annulées</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="pickup">À emporter</SelectItem>
                <SelectItem value="delivery">Livraison</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="active">En cours</TabsTrigger>
            <TabsTrigger value="completed">Terminées</TabsTrigger>
            <TabsTrigger value="cancelled">Annulées</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className={`w-full md:w-2 ${getStatusColor(order.status)}`}></div>
                        <div className="p-4 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono">
                                {order.orderNumber}
                              </Badge>
                              <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                              <Badge variant="secondary">{getOrderTypeText(order.type)}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</div>
                          </div>

                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={order.customer.avatar || ""} alt={order.customer.name} />
                                  <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{order.customer.name}</p>
                                  <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                                </div>
                              </div>

                              <div className="text-sm">
                                <span className="font-medium">{order.items.length} articles</span>
                                <span className="text-muted-foreground"> • </span>
                                <span className="font-medium">{formatCurrency(order.total)}</span>
                                <span className="text-muted-foreground"> • </span>
                                <span className={order.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}>
                                  {order.paymentStatus === "paid" ? "Payé" : "Non payé"}
                                </span>
                              </div>

                              {order.estimatedReadyTime && (
                                <div className="flex items-center text-sm">
                                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                  <span>Prêt vers {formatTime(order.estimatedReadyTime)}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {order.status === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUpdateOrderStatus(order.id, "cancelled")}
                                  >
                                    <X className="mr-1 h-4 w-4" />
                                    Refuser
                                  </Button>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleUpdateOrderStatus(order.id, "confirmed")}
                                  >
                                    <Check className="mr-1 h-4 w-4" />
                                    Accepter
                                  </Button>
                                </>
                              )}

                              {["confirmed", "preparing", "ready"].includes(order.status) && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => {
                                    const nextStatus = getNextStatus(order.status)
                                    if (nextStatus) {
                                      handleUpdateOrderStatus(order.id, nextStatus)
                                    }
                                  }}
                                >
                                  {order.status === "confirmed" && "Commencer préparation"}
                                  {order.status === "preparing" && "Marquer comme prête"}
                                  {order.status === "ready" && "Marquer comme terminée"}
                                </Button>
                              )}

                              <Button variant="ghost" size="sm" onClick={() => handleViewOrderDetails(order)}>
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
                  <p className="text-muted-foreground">Aucune commande ne correspond à vos critères</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            <div className="space-y-4">
              {filteredOrders.filter((order) => ["pending", "confirmed", "preparing", "ready"].includes(order.status))
                .length > 0 ? (
                filteredOrders
                  .filter((order) => ["pending", "confirmed", "preparing", "ready"].includes(order.status))
                  .map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className={`w-full md:w-2 ${getStatusColor(order.status)}`}></div>
                          <div className="p-4 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {order.orderNumber}
                                </Badge>
                                <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                                <Badge variant="secondary">{getOrderTypeText(order.type)}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={order.customer.avatar || ""} alt={order.customer.name} />
                                    <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{order.customer.name}</p>
                                    <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                                  </div>
                                </div>

                                <div className="text-sm">
                                  <span className="font-medium">{order.items.length} articles</span>
                                  <span className="text-muted-foreground"> • </span>
                                  <span className="font-medium">{formatCurrency(order.total)}</span>
                                  <span className="text-muted-foreground"> • </span>
                                  <span className={order.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}>
                                    {order.paymentStatus === "paid" ? "Payé" : "Non payé"}
                                  </span>
                                </div>

                                {order.estimatedReadyTime && (
                                  <div className="flex items-center text-sm">
                                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                    <span>Prêt vers {formatTime(order.estimatedReadyTime)}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {order.status === "pending" && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleUpdateOrderStatus(order.id, "cancelled")}
                                    >
                                      <X className="mr-1 h-4 w-4" />
                                      Refuser
                                    </Button>
                                    <Button
                                      variant="default"
                                      size="sm"
                                      onClick={() => handleUpdateOrderStatus(order.id, "confirmed")}
                                    >
                                      <Check className="mr-1 h-4 w-4" />
                                      Accepter
                                    </Button>
                                  </>
                                )}

                                {["confirmed", "preparing", "ready"].includes(order.status) && (
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => {
                                      const nextStatus = getNextStatus(order.status)
                                      if (nextStatus) {
                                        handleUpdateOrderStatus(order.id, nextStatus)
                                      }
                                    }}
                                  >
                                    {order.status === "confirmed" && "Commencer préparation"}
                                    {order.status === "preparing" && "Marquer comme prête"}
                                    {order.status === "ready" && "Marquer comme terminée"}
                                  </Button>
                                )}

                                <Button variant="ghost" size="sm" onClick={() => handleViewOrderDetails(order)}>
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
                  <p className="text-muted-foreground">Aucune commande active</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <div className="space-y-4">
              {filteredOrders.filter((order) => order.status === "completed").length > 0 ? (
                filteredOrders
                  .filter((order) => order.status === "completed")
                  .map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className={`w-full md:w-2 ${getStatusColor(order.status)}`}></div>
                          <div className="p-4 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {order.orderNumber}
                                </Badge>
                                <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                                <Badge variant="secondary">{getOrderTypeText(order.type)}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={order.customer.avatar || ""} alt={order.customer.name} />
                                    <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{order.customer.name}</p>
                                    <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                                  </div>
                                </div>

                                <div className="text-sm">
                                  <span className="font-medium">{order.items.length} articles</span>
                                  <span className="text-muted-foreground"> • </span>
                                  <span className="font-medium">{formatCurrency(order.total)}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleViewOrderDetails(order)}>
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
                  <p className="text-muted-foreground">Aucune commande terminée</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-4">
            <div className="space-y-4">
              {filteredOrders.filter((order) => order.status === "cancelled").length > 0 ? (
                filteredOrders
                  .filter((order) => order.status === "cancelled")
                  .map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className={`w-full md:w-2 ${getStatusColor(order.status)}`}></div>
                          <div className="p-4 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {order.orderNumber}
                                </Badge>
                                <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                                <Badge variant="secondary">{getOrderTypeText(order.type)}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={order.customer.avatar || ""} alt={order.customer.name} />
                                    <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{order.customer.name}</p>
                                    <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                                  </div>
                                </div>

                                <div className="text-sm">
                                  <span className="font-medium">{order.items.length} articles</span>
                                  <span className="text-muted-foreground"> • </span>
                                  <span className="font-medium">{formatCurrency(order.total)}</span>
                                </div>

                                {order.specialInstructions && (
                                  <div className="flex items-center text-sm">
                                    <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                                    <span className="text-red-500">{order.specialInstructions}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleViewOrderDetails(order)}>
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
                  <p className="text-muted-foreground">Aucune commande annulée</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Paramètres des commandes en ligne</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-accept">Acceptation automatique</Label>
              <p className="text-sm text-muted-foreground">Accepter automatiquement les nouvelles commandes</p>
            </div>
            <Switch id="auto-accept" checked={isAutoAcceptEnabled} onCheckedChange={setIsAutoAcceptEnabled} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-print">Impression automatique</Label>
              <p className="text-sm text-muted-foreground">Imprimer automatiquement les nouvelles commandes</p>
            </div>
            <Switch id="auto-print" checked={isAutoPrintEnabled} onCheckedChange={setIsAutoPrintEnabled} />
          </div>
        </div>
      </div>

      {/* Dialog pour les détails de la commande */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedOrder && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>Commande {selectedOrder.orderNumber}</DialogTitle>
                  <Badge className={getStatusColor(selectedOrder.status)}>{getStatusText(selectedOrder.status)}</Badge>
                </div>
                <DialogDescription>
                  {formatDate(selectedOrder.createdAt)} • {getOrderTypeText(selectedOrder.type)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Client</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedOrder.customer.avatar || ""} alt={selectedOrder.customer.name} />
                        <AvatarFallback>{selectedOrder.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{selectedOrder.customer.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedOrder.customer.phone}</p>
                      </div>
                    </div>
                    {selectedOrder.customer.email && <p className="text-sm mt-1">{selectedOrder.customer.email}</p>}
                  </div>

                  {selectedOrder.type === "delivery" && selectedOrder.customer.address && (
                    <div>
                      <h3 className="font-medium">Adresse de livraison</h3>
                      <div className="flex items-start gap-2 mt-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm">{selectedOrder.customer.address}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Articles commandés</h3>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.quantity}x</span>
                              <span>{item.name}</span>
                            </div>
                            {item.options && item.options.length > 0 && (
                              <ul className="text-sm text-muted-foreground ml-6 mt-1">
                                {item.options.map((option, index) => (
                                  <li key={index}>• {option}</li>
                                ))}
                              </ul>
                            )}
                            {item.notes && (
                              <p className="text-sm text-muted-foreground ml-6 mt-1">Note: {item.notes}</p>
                            )}
                          </div>
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Résumé du paiement</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Sous-total</span>
                      <span>{formatCurrency(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TVA</span>
                      <span>{formatCurrency(selectedOrder.tax)}</span>
                    </div>
                    {selectedOrder.deliveryFee && (
                      <div className="flex justify-between text-sm">
                        <span>Frais de livraison</span>
                        <span>{formatCurrency(selectedOrder.deliveryFee)}</span>
                      </div>
                    )}
                    {selectedOrder.tip && (
                      <div className="flex justify-between text-sm">
                        <span>Pourboire</span>
                        <span>{formatCurrency(selectedOrder.tip)}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(selectedOrder.total)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Méthode de paiement</span>
                      <span>{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Statut du paiement</span>
                      <span className={selectedOrder.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}>
                        {selectedOrder.paymentStatus === "paid" ? "Payé" : "Non payé"}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedOrder.specialInstructions && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Instructions spéciales</h3>
                      <p className="text-sm">{selectedOrder.specialInstructions}</p>
                    </div>
                  </>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="sm:w-auto w-full" onClick={() => setIsOrderDetailsOpen(false)}>
                  Fermer
                </Button>
                <Button variant="outline" className="sm:w-auto w-full">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimer
                </Button>
                {selectedOrder.status !== "cancelled" && selectedOrder.status !== "completed" && (
                  <Button
                    className="sm:w-auto w-full"
                    onClick={() => {
                      const nextStatus = getNextStatus(selectedOrder.status)
                      if (nextStatus) {
                        handleUpdateOrderStatus(selectedOrder.id, nextStatus)
                      }
                    }}
                  >
                    {selectedOrder.status === "pending" && "Accepter la commande"}
                    {selectedOrder.status === "confirmed" && "Commencer la préparation"}
                    {selectedOrder.status === "preparing" && "Marquer comme prête"}
                    {selectedOrder.status === "ready" && "Marquer comme terminée"}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
