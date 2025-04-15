"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  CreditCard,
  Banknote,
  Wallet,
  FileText,
  Download,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpDown,
  Printer,
  Mail,
} from "lucide-react"
import { api } from "@/lib/api"
import type { Order, Table as TableType } from "@/lib/mock-data"

// Types pour le système de paiement
type PaymentMethod = "card" | "cash" | "bank_transfer" | "mobile_payment" | "voucher"

type PaymentStatus = "pending" | "completed" | "refunded" | "failed" | "partially_refunded"

type Payment = {
  id: string
  orderId: string
  amount: number
  tip: number
  method: PaymentMethod
  status: PaymentStatus
  reference?: string
  createdAt: string
  updatedAt: string
  restaurantId: string
}

type Invoice = {
  id: string
  orderId: string
  paymentId: string
  number: string
  customerName?: string
  customerEmail?: string
  customerAddress?: string
  items: {
    name: string
    quantity: number
    unitPrice: number
    totalPrice: number
    taxRate: number
  }[]
  subtotal: number
  taxAmount: number
  total: number
  createdAt: string
  dueDate: string
  paidDate?: string
  status: "paid" | "unpaid" | "overdue" | "cancelled"
  notes?: string
  restaurantId: string
}

// Données mockées pour les paiements
const mockPayments: Payment[] = [
  {
    id: "1",
    orderId: "1",
    amount: 66.0,
    tip: 6.6,
    method: "card",
    status: "completed",
    reference: "CARD-1234567",
    createdAt: "2025-04-14T14:30:00Z",
    updatedAt: "2025-04-14T14:32:00Z",
    restaurantId: "1",
  },
  {
    id: "2",
    orderId: "2",
    amount: 41.4,
    tip: 4.0,
    method: "cash",
    status: "completed",
    createdAt: "2025-04-14T13:45:00Z",
    updatedAt: "2025-04-14T13:45:00Z",
    restaurantId: "1",
  },
  {
    id: "3",
    orderId: "3",
    amount: 53.6,
    tip: 5.0,
    method: "card",
    status: "refunded",
    reference: "CARD-7654321",
    createdAt: "2025-04-14T12:30:00Z",
    updatedAt: "2025-04-14T15:20:00Z",
    restaurantId: "2",
  },
]

// Données mockées pour les factures
const mockInvoices: Invoice[] = [
  {
    id: "1",
    orderId: "1",
    paymentId: "1",
    number: "INV-2025-001",
    customerName: "Client sur place",
    items: [
      {
        name: "Steak Frites",
        quantity: 2,
        unitPrice: 24.5,
        totalPrice: 49.0,
        taxRate: 10,
      },
      {
        name: "Crème Brûlée",
        quantity: 2,
        unitPrice: 8.5,
        totalPrice: 17.0,
        taxRate: 10,
      },
    ],
    subtotal: 66.0,
    taxAmount: 6.0,
    total: 72.6,
    createdAt: "2025-04-14T14:30:00Z",
    dueDate: "2025-04-14T14:30:00Z",
    paidDate: "2025-04-14T14:32:00Z",
    status: "paid",
    restaurantId: "1",
  },
  {
    id: "2",
    orderId: "2",
    paymentId: "2",
    number: "INV-2025-002",
    customerName: "Client sur place",
    items: [
      {
        name: "Salade Niçoise",
        quantity: 1,
        unitPrice: 16.9,
        totalPrice: 16.9,
        taxRate: 10,
      },
      {
        name: "Steak Frites",
        quantity: 1,
        unitPrice: 24.5,
        totalPrice: 24.5,
        taxRate: 10,
      },
    ],
    subtotal: 41.4,
    taxAmount: 3.76,
    total: 45.4,
    createdAt: "2025-04-14T13:45:00Z",
    dueDate: "2025-04-14T13:45:00Z",
    paidDate: "2025-04-14T13:45:00Z",
    status: "paid",
    restaurantId: "1",
  },
  {
    id: "3",
    orderId: "3",
    paymentId: "3",
    number: "INV-2025-003",
    customerName: "Entreprise ABC",
    customerEmail: "comptabilite@entrepriseabc.com",
    customerAddress: "123 Rue des Affaires, 75008 Paris",
    items: [
      {
        name: "Pasta Carbonara",
        quantity: 2,
        unitPrice: 18.9,
        totalPrice: 37.8,
        taxRate: 10,
      },
      {
        name: "Tiramisu",
        quantity: 2,
        unitPrice: 7.9,
        totalPrice: 15.8,
        taxRate: 10,
      },
    ],
    subtotal: 53.6,
    taxAmount: 4.87,
    total: 58.6,
    createdAt: "2025-04-14T12:30:00Z",
    dueDate: "2025-04-21T12:30:00Z",
    status: "unpaid",
    restaurantId: "2",
  },
]

// API mockée pour les paiements
const paymentApi = {
  getAll: async (restaurantId: string): Promise<Payment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockPayments.filter((p) => p.restaurantId === restaurantId)
  },

  getById: async (id: string): Promise<Payment | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockPayments.find((p) => p.id === id) || null
  },

  create: async (payment: Omit<Payment, "id" | "createdAt" | "updatedAt">): Promise<Payment> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const now = new Date().toISOString()
    const newPayment = {
      ...payment,
      id: `payment-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    mockPayments.push(newPayment)
    return newPayment
  },

  update: async (id: string, payment: Partial<Payment>): Promise<Payment | null> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const index = mockPayments.findIndex((p) => p.id === id)
    if (index === -1) return null

    const updatedPayment = {
      ...mockPayments[index],
      ...payment,
      updatedAt: new Date().toISOString(),
    }
    mockPayments[index] = updatedPayment
    return updatedPayment
  },
}

// API mockée pour les factures
const invoiceApi = {
  getAll: async (restaurantId: string): Promise<Invoice[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockInvoices.filter((i) => i.restaurantId === restaurantId)
  },

  getById: async (id: string): Promise<Invoice | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockInvoices.find((i) => i.id === id) || null
  },

  create: async (invoice: Omit<Invoice, "id" | "createdAt">): Promise<Invoice> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newInvoice = {
      ...invoice,
      id: `invoice-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    mockInvoices.push(newInvoice)
    return newInvoice
  },

  update: async (id: string, invoice: Partial<Invoice>): Promise<Invoice | null> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const index = mockInvoices.findIndex((i) => i.id === id)
    if (index === -1) return null

    const updatedInvoice = {
      ...mockInvoices[index],
      ...invoice,
    }
    mockInvoices[index] = updatedInvoice
    return updatedInvoice
  },
}

export default function PaymentsPage() {
  const params = useParams<{ restaurantId: string }>()
  const { restaurantId } = params

  const [payments, setPayments] = useState<Payment[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [tables, setTables] = useState<TableType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const [isNewPaymentDialogOpen, setIsNewPaymentDialogOpen] = useState(false)
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false)
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false)
  const [isNewInvoiceDialogOpen, setIsNewInvoiceDialogOpen] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [tipAmount, setTipAmount] = useState("")
  const [paymentReference, setPaymentReference] = useState("")
  const [refundAmount, setRefundAmount] = useState("")
  const [refundReason, setRefundReason] = useState("")

  const [invoiceCustomerName, setInvoiceCustomerName] = useState("")
  const [invoiceCustomerEmail, setInvoiceCustomerEmail] = useState("")
  const [invoiceCustomerAddress, setInvoiceCustomerAddress] = useState("")
  const [invoiceNotes, setInvoiceNotes] = useState("")
  const [invoiceDueDate, setInvoiceDueDate] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsData, invoicesData, ordersData, tablesData] = await Promise.all([
          paymentApi.getAll(restaurantId),
          invoiceApi.getAll(restaurantId),
          api.orders.getAll(restaurantId),
          api.tables.getAll(restaurantId),
        ])

        setPayments(paymentsData)
        setInvoices(invoicesData)
        setOrders(ordersData)
        setTables(tablesData)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [restaurantId])

  const handleCreatePayment = async () => {
    if (!selectedOrder) return

    try {
      const amount = Number.parseFloat(paymentAmount) || selectedOrder.total
      const tip = Number.parseFloat(tipAmount) || 0

      const newPayment = await paymentApi.create({
        orderId: selectedOrder.id,
        amount,
        tip,
        method: paymentMethod,
        status: "completed",
        reference: paymentReference || undefined,
        restaurantId,
      })

      setPayments([...payments, newPayment])

      // Mettre à jour le statut de la commande
      await api.orders.update(selectedOrder.id, { status: "paid" })
      setOrders(orders.map((o) => (o.id === selectedOrder.id ? { ...o, status: "paid" } : o)))

      // Libérer la table
      if (selectedOrder.tableId) {
        await api.tables.update(selectedOrder.tableId, { status: "available" })
        setTables(tables.map((t) => (t.id === selectedOrder.tableId ? { ...t, status: "available" } : t)))
      }

      // Créer une facture simple
      const newInvoice = await invoiceApi.create({
        orderId: selectedOrder.id,
        paymentId: newPayment.id,
        number: `INV-${new Date().getFullYear()}-${invoices.length + 1}`.padStart(10, "0"),
        customerName: "Client sur place",
        items: selectedOrder.items.map((item) => {
          const menuItem = selectedOrder.items.find((i) => i.menuItemId === item.menuItemId)
          return {
            name: `Article ${item.menuItemId}`,
            quantity: item.quantity,
            unitPrice: amount / selectedOrder.items.length / item.quantity,
            totalPrice: amount / selectedOrder.items.length,
            taxRate: 10,
          }
        }),
        subtotal: amount,
        taxAmount: amount * 0.1,
        total: amount + tip,
        createdAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        paidDate: new Date().toISOString(),
        status: "paid",
        restaurantId,
      })

      setInvoices([...invoices, newInvoice])
      setIsNewPaymentDialogOpen(false)
      resetPaymentForm()
    } catch (error) {
      console.error("Erreur lors de la création du paiement:", error)
    }
  }

  const handleRefundPayment = async () => {
    if (!selectedPayment) return

    try {
      const refundAmountValue = Number.parseFloat(refundAmount) || selectedPayment.amount
      const isFullRefund = refundAmountValue >= selectedPayment.amount

      const updatedPayment = await paymentApi.update(selectedPayment.id, {
        status: isFullRefund ? "refunded" : "partially_refunded",
      })

      if (updatedPayment) {
        setPayments(payments.map((p) => (p.id === updatedPayment.id ? updatedPayment : p)))
      }

      // Si c'est un remboursement complet, mettre à jour le statut de la commande
      if (isFullRefund) {
        const order = orders.find((o) => o.id === selectedPayment.orderId)
        if (order) {
          await api.orders.update(order.id, { status: "cancelled" })
          setOrders(orders.map((o) => (o.id === order.id ? { ...o, status: "cancelled" } : o)))
        }
      }

      setIsRefundDialogOpen(false)
      setRefundAmount("")
      setRefundReason("")
    } catch (error) {
      console.error("Erreur lors du remboursement:", error)
    }
  }

  const handleCreateInvoice = async () => {
    if (!selectedOrder) return

    try {
      const payment = payments.find((p) => p.orderId === selectedOrder.id)
      if (!payment) {
        alert("Aucun paiement trouvé pour cette commande.")
        return
      }

      const newInvoice = await invoiceApi.create({
        orderId: selectedOrder.id,
        paymentId: payment.id,
        number: `INV-${new Date().getFullYear()}-${invoices.length + 1}`.padStart(10, "0"),
        customerName: invoiceCustomerName || "Client sur place",
        customerEmail: invoiceCustomerEmail || undefined,
        customerAddress: invoiceCustomerAddress || undefined,
        items: selectedOrder.items.map((item) => {
          const menuItem = selectedOrder.items.find((i) => i.menuItemId === item.menuItemId)
          return {
            name: `Article ${item.menuItemId}`,
            quantity: item.quantity,
            unitPrice: payment.amount / selectedOrder.items.length / item.quantity,
            totalPrice: payment.amount / selectedOrder.items.length,
            taxRate: 10,
          }
        }),
        subtotal: payment.amount,
        taxAmount: payment.amount * 0.1,
        total: payment.amount + payment.tip,
        createdAt: new Date().toISOString(),
        dueDate: invoiceDueDate || new Date().toISOString(),
        paidDate: payment.status === "completed" ? payment.updatedAt : undefined,
        status: payment.status === "completed" ? "paid" : "unpaid",
        notes: invoiceNotes || undefined,
        restaurantId,
      })

      setInvoices([...invoices, newInvoice])
      setIsNewInvoiceDialogOpen(false)
      resetInvoiceForm()
    } catch (error) {
      console.error("Erreur lors de la création de la facture:", error)
    }
  }

  const resetPaymentForm = () => {
    setSelectedOrder(null)
    setPaymentMethod("card")
    setPaymentAmount("")
    setTipAmount("")
    setPaymentReference("")
  }

  const resetInvoiceForm = () => {
    setSelectedOrder(null)
    setInvoiceCustomerName("")
    setInvoiceCustomerEmail("")
    setInvoiceCustomerAddress("")
    setInvoiceNotes("")
    setInvoiceDueDate("")
  }

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "cash":
        return <Banknote className="h-4 w-4" />
      case "bank_transfer":
        return <Wallet className="h-4 w-4" />
      case "mobile_payment":
        return <Wallet className="h-4 w-4" />
      case "voucher":
        return <FileText className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getPaymentMethodName = (method: PaymentMethod) => {
    switch (method) {
      case "card":
        return "Carte bancaire"
      case "cash":
        return "Espèces"
      case "bank_transfer":
        return "Virement bancaire"
      case "mobile_payment":
        return "Paiement mobile"
      case "voucher":
        return "Bon d'achat"
      default:
        return "Inconnu"
    }
  }

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Complété</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">En attente</Badge>
      case "refunded":
        return <Badge className="bg-red-500">Remboursé</Badge>
      case "partially_refunded":
        return <Badge className="bg-orange-500">Partiellement remboursé</Badge>
      case "failed":
        return <Badge className="bg-red-700">Échoué</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  const getInvoiceStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Payée</Badge>
      case "unpaid":
        return <Badge className="bg-yellow-500">Non payée</Badge>
      case "overdue":
        return <Badge className="bg-red-500">En retard</Badge>
      case "cancelled":
        return <Badge className="bg-gray-500">Annulée</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTableById = (id: string) => {
    return tables.find((table) => table.id === id)
  }

  const filteredPayments = payments
    .filter((payment) => {
      const matchesSearch =
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.reference && payment.reference.toLowerCase().includes(searchTerm.toLowerCase()))

      if (filterValue === "all") return matchesSearch
      if (filterValue === "completed" && payment.status === "completed") return matchesSearch
      if (filterValue === "refunded" && payment.status === "refunded") return matchesSearch
      if (filterValue === "card" && payment.method === "card") return matchesSearch
      if (filterValue === "cash" && payment.method === "cash") return matchesSearch

      return false
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  const filteredInvoices = invoices
    .filter((invoice) => {
      const matchesSearch =
        invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (invoice.customerName && invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()))

      if (filterValue === "all") return matchesSearch
      if (filterValue === "paid" && invoice.status === "paid") return matchesSearch
      if (filterValue === "unpaid" && invoice.status === "unpaid") return matchesSearch
      if (filterValue === "overdue" && invoice.status === "overdue") return matchesSearch

      return false
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des paiements</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsNewPaymentDialogOpen(true)}>Nouveau paiement</Button>
          <Button variant="outline" onClick={() => setIsNewInvoiceDialogOpen(true)}>
            Nouvelle facture
          </Button>
        </div>
      </div>

      <Tabs defaultValue="payments" className="mt-6">
        <TabsList>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="invoices">Factures</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Historique des paiements</CardTitle>
                  <CardDescription>Consultez et gérez tous les paiements du restaurant</CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-8 w-full md:w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <Select value={filterValue} onValueChange={setFilterValue}>
                      <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder="Filtrer par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="completed">Complétés</SelectItem>
                        <SelectItem value="refunded">Remboursés</SelectItem>
                        <SelectItem value="card">Carte bancaire</SelectItem>
                        <SelectItem value="cash">Espèces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p>Chargement des paiements...</p>
                </div>
              ) : filteredPayments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucun paiement trouvé</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Commande</TableHead>
                        <TableHead>Méthode</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Pourboire</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => {
                        const order = orders.find((o) => o.id === payment.orderId)
                        const table = order ? getTableById(order.tableId) : null

                        return (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id.slice(-4)}</TableCell>
                            <TableCell>{formatDate(payment.createdAt)}</TableCell>
                            <TableCell>
                              {order ? (
                                <div className="flex flex-col">
                                  <span>Commande #{order.id.slice(-4)}</span>
                                  <span className="text-xs text-muted-foreground">
                                    Table {table ? table.number : "?"}
                                  </span>
                                </div>
                              ) : (
                                "Inconnue"
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getPaymentMethodIcon(payment.method)}
                                <span>{getPaymentMethodName(payment.method)}</span>
                              </div>
                            </TableCell>
                            <TableCell>{payment.amount.toFixed(2)} €</TableCell>
                            <TableCell>{payment.tip.toFixed(2)} €</TableCell>
                            <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedPayment(payment)
                                    setIsRefundDialogOpen(true)
                                  }}
                                  disabled={payment.status === "refunded"}
                                >
                                  Rembourser
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const invoice = invoices.find((i) => i.paymentId === payment.id)
                                    if (invoice) {
                                      setSelectedInvoice(invoice)
                                      setIsInvoiceDialogOpen(true)
                                    } else {
                                      alert("Aucune facture trouvée pour ce paiement.")
                                    }
                                  }}
                                >
                                  Voir facture
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Factures</CardTitle>
                  <CardDescription>Consultez et gérez toutes les factures du restaurant</CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-8 w-full md:w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <Select value={filterValue} onValueChange={setFilterValue}>
                      <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder="Filtrer par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes</SelectItem>
                        <SelectItem value="paid">Payées</SelectItem>
                        <SelectItem value="unpaid">Non payées</SelectItem>
                        <SelectItem value="overdue">En retard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p>Chargement des factures...</p>
                </div>
              ) : filteredInvoices.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucune facture trouvée</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Numéro</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.number}</TableCell>
                          <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                          <TableCell>
                            {invoice.customerName || "Client sur place"}
                            {invoice.customerEmail && (
                              <div className="text-xs text-muted-foreground">{invoice.customerEmail}</div>
                            )}
                          </TableCell>
                          <TableCell>{invoice.total.toFixed(2)} €</TableCell>
                          <TableCell>{getInvoiceStatusBadge(invoice.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedInvoice(invoice)
                                  setIsInvoiceDialogOpen(true)
                                }}
                              >
                                Voir
                              </Button>
                              <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Chiffre d'affaires (aujourd'hui)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {payments
                    .filter(
                      (p) =>
                        new Date(p.createdAt).toDateString() === new Date().toDateString() && p.status === "completed",
                    )
                    .reduce((sum, p) => sum + p.amount, 0)
                    .toFixed(2)}{" "}
                  €
                </div>
                <p className="text-xs text-muted-foreground">
                  {
                    payments.filter(
                      (p) =>
                        new Date(p.createdAt).toDateString() === new Date().toDateString() && p.status === "completed",
                    ).length
                  }{" "}
                  transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pourboires (aujourd'hui)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {payments
                    .filter(
                      (p) =>
                        new Date(p.createdAt).toDateString() === new Date().toDateString() && p.status === "completed",
                    )
                    .reduce((sum, p) => sum + p.tip, 0)
                    .toFixed(2)}{" "}
                  €
                </div>
                <p className="text-xs text-muted-foreground">
                  {(
                    (payments
                      .filter(
                        (p) =>
                          new Date(p.createdAt).toDateString() === new Date().toDateString() &&
                          p.status === "completed",
                      )
                      .reduce((sum, p) => sum + p.tip, 0) /
                      payments
                        .filter(
                          (p) =>
                            new Date(p.createdAt).toDateString() === new Date().toDateString() &&
                            p.status === "completed",
                        )
                        .reduce((sum, p) => sum + p.amount, 0)) *
                    100
                  ).toFixed(1)}
                  % du CA
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Factures impayées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {invoices
                    .filter((i) => i.status === "unpaid" || i.status === "overdue")
                    .reduce((sum, i) => sum + i.total, 0)
                    .toFixed(2)}{" "}
                  €
                </div>
                <p className="text-xs text-muted-foreground">
                  {invoices.filter((i) => i.status === "unpaid" || i.status === "overdue").length} factures en attente
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Répartition des méthodes de paiement</CardTitle>
              <CardDescription>Analyse des méthodes de paiement utilisées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  {["card", "cash", "bank_transfer", "mobile_payment", "voucher"].map((method) => {
                    const count = payments.filter((p) => p.method === method && p.status === "completed").length
                    const amount = payments
                      .filter((p) => p.method === method && p.status === "completed")
                      .reduce((sum, p) => sum + p.amount, 0)
                    const percentage = (count / payments.filter((p) => p.status === "completed").length) * 100 || 0

                    return (
                      <div key={method} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {getPaymentMethodIcon(method as PaymentMethod)}
                            <span>{getPaymentMethodName(method as PaymentMethod)}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-medium">{count} paiements</span>
                            <span className="text-sm text-muted-foreground ml-2">({amount.toFixed(2)} €)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statut des factures</CardTitle>
              <CardDescription>Vue d'ensemble des factures par statut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <CardTitle className="text-sm font-medium">Payées</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{invoices.filter((i) => i.status === "paid").length}</div>
                      <p className="text-xs text-muted-foreground">
                        {invoices
                          .filter((i) => i.status === "paid")
                          .reduce((sum, i) => sum + i.total, 0)
                          .toFixed(2)}{" "}
                        €
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <CardTitle className="text-sm font-medium">Non payées</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{invoices.filter((i) => i.status === "unpaid").length}</div>
                      <p className="text-xs text-muted-foreground">
                        {invoices
                          .filter((i) => i.status === "unpaid")
                          .reduce((sum, i) => sum + i.total, 0)
                          .toFixed(2)}{" "}
                        €
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <CardTitle className="text-sm font-medium">En retard</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{invoices.filter((i) => i.status === "overdue").length}</div>
                      <p className="text-xs text-muted-foreground">
                        {invoices
                          .filter((i) => i.status === "overdue")
                          .reduce((sum, i) => sum + i.total, 0)
                          .toFixed(2)}{" "}
                        €
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-gray-500" />
                        <CardTitle className="text-sm font-medium">Annulées</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {invoices.filter((i) => i.status === "cancelled").length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {invoices
                          .filter((i) => i.status === "cancelled")
                          .reduce((sum, i) => sum + i.total, 0)
                          .toFixed(2)}{" "}
                        €
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogue de nouveau paiement */}
      <Dialog open={isNewPaymentDialogOpen} onOpenChange={setIsNewPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nouveau paiement</DialogTitle>
            <DialogDescription>Enregistrez un nouveau paiement pour une commande.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="order">Commande</Label>
              <Select
                onValueChange={(value) => {
                  const order = orders.find((o) => o.id === value)
                  if (order) {
                    setSelectedOrder(order)
                    setPaymentAmount(order.total.toString())
                  }
                }}
              >
                <SelectTrigger id="order">
                  <SelectValue placeholder="Sélectionner une commande" />
                </SelectTrigger>
                <SelectContent>
                  {orders
                    .filter((o) => o.status !== "paid" && o.status !== "cancelled")
                    .map((order) => {
                      const table = getTableById(order.tableId)
                      return (
                        <SelectItem key={order.id} value={order.id}>
                          Commande #{order.id.slice(-4)} - Table {table ? table.number : "?"} - {order.total.toFixed(2)}{" "}
                          €
                        </SelectItem>
                      )
                    })}
                </SelectContent>
              </Select>

              {orders.filter((o) => o.status !== "paid" && o.status !== "cancelled").length === 0 && (
                <p className="text-sm text-red-500">Aucune commande en attente de paiement.</p>
              )}
            </div>

            {selectedOrder && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Méthode de paiement</Label>
                  <RadioGroup
                    defaultValue={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" /> Carte bancaire
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center gap-2">
                        <Banknote className="h-4 w-4" /> Espèces
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                      <Label htmlFor="bank_transfer" className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" /> Virement bancaire
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mobile_payment" id="mobile_payment" />
                      <Label htmlFor="mobile_payment" className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" /> Paiement mobile
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="voucher" id="voucher" />
                      <Label htmlFor="voucher" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Bon d'achat
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Montant (€)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tip">Pourboire (€)</Label>
                    <Input
                      id="tip"
                      type="number"
                      step="0.01"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(e.target.value)}
                    />
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-2">
                    <Label htmlFor="reference">Référence de transaction</Label>
                    <Input
                      id="reference"
                      placeholder="Numéro de transaction"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                    />
                  </div>
                )}

                <div className="border rounded-md p-4 bg-muted/50">
                  <div className="flex justify-between items-center">
                    <span>Total commande:</span>
                    <span className="font-medium">{selectedOrder.total.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Pourboire:</span>
                    <span className="font-medium">{Number.parseFloat(tipAmount || "0").toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-lg font-bold">
                    <span>Total à payer:</span>
                    <span>{(selectedOrder.total + Number.parseFloat(tipAmount || "0")).toFixed(2)} €</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPaymentDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreatePayment} disabled={!selectedOrder}>
              Enregistrer le paiement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de remboursement */}
      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Rembourser un paiement</DialogTitle>
            <DialogDescription>Effectuez un remboursement total ou partiel.</DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-4 py-4">
              <div className="border rounded-md p-4 bg-muted/50">
                <div className="flex justify-between items-center">
                  <span>ID du paiement:</span>
                  <span className="font-medium">{selectedPayment.id.slice(-4)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span>Méthode:</span>
                  <span className="font-medium flex items-center gap-1">
                    {getPaymentMethodIcon(selectedPayment.method)}
                    {getPaymentMethodName(selectedPayment.method)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span>Montant original:</span>
                  <span className="font-medium">{selectedPayment.amount.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span>Date:</span>
                  <span className="font-medium">{formatDate(selectedPayment.createdAt)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refund-amount">Montant à rembourser (€)</Label>
                <Input
                  id="refund-amount"
                  type="number"
                  step="0.01"
                  max={selectedPayment.amount}
                  placeholder={selectedPayment.amount.toFixed(2)}
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Laissez vide pour un remboursement total de {selectedPayment.amount.toFixed(2)} €
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refund-reason">Raison du remboursement</Label>
                <Textarea
                  id="refund-reason"
                  placeholder="Raison du remboursement..."
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="send-confirmation" />
                <Label htmlFor="send-confirmation">Envoyer une confirmation au client</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRefundDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleRefundPayment}>
              Rembourser
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de détails de facture */}
      <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Détails de la facture</DialogTitle>
            <DialogDescription>Consultez les détails de la facture.</DialogDescription>
          </DialogHeader>

          {selectedInvoice && (
            <div className="space-y-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">Facture #{selectedInvoice.number}</h3>
                  <p className="text-sm text-muted-foreground">
                    Date d'émission: {formatDate(selectedInvoice.createdAt)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Date d'échéance: {formatDate(selectedInvoice.dueDate)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="mb-2">{getInvoiceStatusBadge(selectedInvoice.status)}</div>
                  {selectedInvoice.paidDate && (
                    <p className="text-sm text-muted-foreground">Payée le: {formatDate(selectedInvoice.paidDate)}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Restaurant</h4>
                  <p>Le Bistrot Parisien</p>
                  <p>123 Rue de Paris, 75001 Paris</p>
                  <p>contact@bistrotparisien.com</p>
                  <p>+33 1 23 45 67 89</p>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Client</h4>
                  <p>{selectedInvoice.customerName || "Client sur place"}</p>
                  {selectedInvoice.customerEmail && <p>{selectedInvoice.customerEmail}</p>}
                  {selectedInvoice.customerAddress && <p>{selectedInvoice.customerAddress}</p>}
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Quantité</TableHead>
                      <TableHead className="text-right">Prix unitaire</TableHead>
                      <TableHead className="text-right">TVA</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">{item.unitPrice.toFixed(2)} €</TableCell>
                        <TableCell className="text-right">{item.taxRate}%</TableCell>
                        <TableCell className="text-right">{item.totalPrice.toFixed(2)} €</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="flex justify-between w-64">
                  <span>Sous-total:</span>
                  <span className="font-medium">{selectedInvoice.subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between w-64">
                  <span>TVA:</span>
                  <span className="font-medium">{selectedInvoice.taxAmount.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between w-64 text-lg font-bold">
                  <span>Total:</span>
                  <span>{selectedInvoice.total.toFixed(2)} €</span>
                </div>
              </div>

              {selectedInvoice.notes && (
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-sm">{selectedInvoice.notes}</p>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Merci pour votre confiance. Pour toute question concernant cette facture, veuillez nous contacter.
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvoiceDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de nouvelle facture */}
      <Dialog open={isNewInvoiceDialogOpen} onOpenChange={setIsNewInvoiceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvelle facture</DialogTitle>
            <DialogDescription>Créez une nouvelle facture pour une commande payée.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="invoice-order">Commande</Label>
              <Select
                onValueChange={(value) => {
                  const order = orders.find((o) => o.id === value)
                  if (order) {
                    setSelectedOrder(order)
                  }
                }}
              >
                <SelectTrigger id="invoice-order">
                  <SelectValue placeholder="Sélectionner une commande" />
                </SelectTrigger>
                <SelectContent>
                  {orders
                    .filter((o) => o.status === "paid")
                    .map((order) => {
                      const table = getTableById(order.tableId)
                      return (
                        <SelectItem key={order.id} value={order.id}>
                          Commande #{order.id.slice(-4)} - Table {table ? table.number : "?"} - {order.total.toFixed(2)}{" "}
                          €
                        </SelectItem>
                      )
                    })}
                </SelectContent>
              </Select>

              {orders.filter((o) => o.status === "paid").length === 0 && (
                <p className="text-sm text-red-500">Aucune commande payée disponible pour facturation.</p>
              )}
            </div>

            {selectedOrder && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Nom du client</Label>
                  <Input
                    id="customer-name"
                    placeholder="Nom du client ou de l'entreprise"
                    value={invoiceCustomerName}
                    onChange={(e) => setInvoiceCustomerName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email du client</Label>
                  <Input
                    id="customer-email"
                    type="email"
                    placeholder="email@exemple.com"
                    value={invoiceCustomerEmail}
                    onChange={(e) => setInvoiceCustomerEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-address">Adresse du client</Label>
                  <Textarea
                    id="customer-address"
                    placeholder="Adresse complète"
                    value={invoiceCustomerAddress}
                    onChange={(e) => setInvoiceCustomerAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoice-due-date">Date d'échéance</Label>
                  <Input
                    id="invoice-due-date"
                    type="date"
                    value={invoiceDueDate}
                    onChange={(e) => setInvoiceDueDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoice-notes">Notes</Label>
                  <Textarea
                    id="invoice-notes"
                    placeholder="Notes ou conditions particulières..."
                    value={invoiceNotes}
                    onChange={(e) => setInvoiceNotes(e.target.value)}
                  />
                </div>

                <div className="border rounded-md p-4 bg-muted/50">
                  <h4 className="font-medium mb-2">Récapitulatif de la commande</h4>
                  <div className="flex justify-between items-center">
                    <span>Commande:</span>
                    <span className="font-medium">#{selectedOrder.id.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Articles:</span>
                    <span className="font-medium">{selectedOrder.items.length}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Total:</span>
                    <span className="font-medium">{selectedOrder.total.toFixed(2)} €</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewInvoiceDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateInvoice} disabled={!selectedOrder}>
              Créer la facture
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
