import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  ChefHat,
  Bell,
  Package,
  Check,
  X,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

// Types pour les commandes
type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  options?: string[]
  notes?: string
}

interface Order {
  id: string
  number: string
  status: OrderStatus
  items: OrderItem[]
  total: number
  customer: {
    name: string
    phone?: string
    email?: string
    address?: string
    isVIP?: boolean
  }
  createdAt: string
  type: "dine-in" | "takeaway" | "delivery"
  table?: string
  paymentStatus: "pending" | "paid" | "refunded"
  paymentMethod?: "cash" | "card" | "online"
}

// Données fictives pour les commandes
const mockOrders: Order[] = [
  {
    id: "ord-001",
    number: "#1234",
    status: "pending",
    items: [
      { id: "item-1", name: "Burger Classique", quantity: 2, price: 12.99 },
      { id: "item-2", name: "Frites", quantity: 1, price: 4.5, options: ["Grande"] },
      { id: "item-3", name: "Coca-Cola", quantity: 2, price: 2.99 },
    ],
    total: 36.46,
    customer: {
      name: "Jean Dupont",
      phone: "06 12 34 56 78",
    },
    createdAt: "2025-04-14T10:30:00",
    type: "dine-in",
    table: "Table 5",
    paymentStatus: "pending",
  },
  {
    id: "ord-002",
    number: "#1235",
    status: "confirmed",
    items: [
      { id: "item-4", name: "Pizza Margherita", quantity: 1, price: 14.99 },
      { id: "item-5", name: "Salade César", quantity: 1, price: 8.99 },
      { id: "item-6", name: "Eau minérale", quantity: 1, price: 1.99 },
    ],
    total: 25.97,
    customer: {
      name: "Marie Martin",
      phone: "06 98 76 54 32",
      isVIP: true,
    },
    createdAt: "2025-04-14T10:15:00",
    type: "dine-in",
    table: "Table 8",
    paymentStatus: "paid",
    paymentMethod: "card",
  },
  {
    id: "ord-003",
    number: "#1236",
    status: "preparing",
    items: [
      { id: "item-7", name: "Pâtes Carbonara", quantity: 1, price: 13.99 },
      { id: "item-8", name: "Tiramisu", quantity: 1, price: 6.99 },
    ],
    total: 20.98,
    customer: {
      name: "Pierre Durand",
      phone: "06 23 45 67 89",
    },
    createdAt: "2025-04-14T10:00:00",
    type: "takeaway",
    paymentStatus: "paid",
    paymentMethod: "online",
  },
  {
    id: "ord-004",
    number: "#1237",
    status: "ready",
    items: [
      { id: "item-9", name: "Poulet Rôti", quantity: 1, price: 18.99 },
      { id: "item-10", name: "Riz Pilaf", quantity: 1, price: 4.5 },
      { id: "item-11", name: "Crème Brûlée", quantity: 2, price: 5.99 },
    ],
    total: 35.47,
    customer: {
      name: "Sophie Petit",
      phone: "06 34 56 78 90",
      address: "15 rue des Lilas, 75011 Paris",
    },
    createdAt: "2025-04-14T09:45:00",
    type: "delivery",
    paymentStatus: "paid",
    paymentMethod: "online",
  },
  {
    id: "ord-005",
    number: "#1238",
    status: "completed",
    items: [
      { id: "item-12", name: "Steak Frites", quantity: 2, price: 19.99 },
      { id: "item-13", name: "Vin Rouge (verre)", quantity: 2, price: 6.5 },
    ],
    total: 52.98,
    customer: {
      name: "Lucas Bernard",
      phone: "06 45 67 89 01",
    },
    createdAt: "2025-04-14T09:30:00",
    type: "dine-in",
    table: "Table 3",
    paymentStatus: "paid",
    paymentMethod: "card",
  },
]

// Fonction pour obtenir la couleur du badge en fonction du statut
function getStatusBadgeVariant(status: OrderStatus) {
  switch (status) {
    case "pending":
      return "secondary"
    case "confirmed":
      return "outline"
    case "preparing":
      return "default"
    case "ready":
      return "success"
    case "completed":
      return "secondary"
    case "cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

// Fonction pour obtenir l'icône en fonction du statut
function getStatusIcon(status: OrderStatus) {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />
    case "confirmed":
      return <CheckCircle className="h-4 w-4" />
    case "preparing":
      return <ChefHat className="h-4 w-4" />
    case "ready":
      return <Bell className="h-4 w-4" />
    case "completed":
      return <Package className="h-4 w-4" />
    case "cancelled":
      return <X className="h-4 w-4" />
    default:
      return null
  }
}

// Fonction pour obtenir le libellé en français du statut
function getStatusLabel(status: OrderStatus) {
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
      return status
  }
}

export default function OrdersPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commandes</h1>
          <p className="text-muted-foreground">Gérez les commandes de votre restaurant</p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Nouvelle commande
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher une commande..." className="w-full pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="date-range" className="text-sm">
            Période:
          </Label>
          <select
            id="date-range"
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            defaultValue="today"
          >
            <option value="today">Aujourd&apos;hui</option>
            <option value="yesterday">Hier</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="custom">Personnalisé</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmées</TabsTrigger>
          <TabsTrigger value="preparing">En préparation</TabsTrigger>
          <TabsTrigger value="ready">Prêtes</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="mt-4 space-y-4">
          {mockOrders
            .filter((order) => order.status === "pending")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>

        <TabsContent value="confirmed" className="mt-4 space-y-4">
          {mockOrders
            .filter((order) => order.status === "confirmed")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>

        <TabsContent value="preparing" className="mt-4 space-y-4">
          {mockOrders
            .filter((order) => order.status === "preparing")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>

        <TabsContent value="ready" className="mt-4 space-y-4">
          {mockOrders
            .filter((order) => order.status === "ready")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 space-y-4">
          {mockOrders
            .filter((order) => order.status === "completed")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

// Composant pour afficher une commande
function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{order.number}</span>
                {order.customer.isVIP && (
                  <Badge variant="outline" className="text-amber-500 border-amber-500">
                    VIP
                  </Badge>
                )}
                <Badge variant={getStatusBadgeVariant(order.status)} className="flex items-center gap-1">
                  {getStatusIcon(order.status)}
                  {getStatusLabel(order.status)}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="font-medium">{order.customer.name}</span>
              <span className="text-sm text-muted-foreground">
                {order.type === "dine-in" ? order.table : order.type === "delivery" ? "Livraison" : "À emporter"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="font-medium">{order.total.toFixed(2)} €</span>
              <Badge variant={order.paymentStatus === "paid" ? "outline" : "secondary"} className="text-xs">
                {order.paymentStatus === "paid" ? "Payé" : "En attente"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {order.status === "pending" && (
              <>
                <Button size="sm" variant="outline" className="gap-1">
                  <X className="h-4 w-4" />
                  Refuser
                </Button>
                <Button size="sm" className="gap-1">
                  <Check className="h-4 w-4" />
                  Accepter
                </Button>
              </>
            )}
            {order.status === "confirmed" && (
              <Button size="sm" className="gap-1">
                <ChefHat className="h-4 w-4" />
                En préparation
              </Button>
            )}
            {order.status === "preparing" && (
              <Button size="sm" className="gap-1">
                <Bell className="h-4 w-4" />
                Prête
              </Button>
            )}
            {order.status === "ready" && (
              <Button size="sm" className="gap-1">
                <Package className="h-4 w-4" />
                Terminée
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                <DropdownMenuItem>Imprimer</DropdownMenuItem>
                <DropdownMenuItem>Contacter le client</DropdownMenuItem>
                {order.status !== "cancelled" && order.status !== "completed" && (
                  <DropdownMenuItem className="text-destructive">Annuler</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.name}
                {item.options && item.options.length > 0 && (
                  <span className="text-muted-foreground"> ({item.options.join(", ")})</span>
                )}
              </span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
