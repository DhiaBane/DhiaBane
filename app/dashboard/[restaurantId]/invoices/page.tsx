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
import { Download, Search, Filter, Plus, AlertCircle, ArrowUpDown, Printer, Mail, CreditCard } from "lucide-react"
import { orderApi } from "@/lib/api"
import type { Order } from "@/lib/mock-data"

// Types pour les factures
type Invoice = {
  id: string
  orderId: string
  paymentId: string
  number: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  customerAddress?: string
  customerVatNumber?: string
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
  paymentMethod?: string
  restaurantId: string
}

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
    paymentMethod: "card",
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
    paymentMethod: "cash",
    restaurantId: "1",
  },
  {
    id: "3",
    orderId: "3",
    paymentId: "3",
    number: "INV-2025-003",
    customerName: "Entreprise ABC",
    customerEmail: "comptabilite@entrepriseabc.com",
    customerPhone: "+33 1 23 45 67 89",
    customerAddress: "123 Rue des Affaires, 75008 Paris",
    customerVatNumber: "FR12345678901",
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
    paymentMethod: "bank_transfer",
    restaurantId: "2",
  },
  {
    id: "4",
    orderId: "4",
    paymentId: "4",
    number: "INV-2025-004",
    customerName: "Société XYZ",
    customerEmail: "finance@xyz.com",
    customerPhone: "+33 1 98 76 54 32",
    customerAddress: "456 Avenue des Entreprises, 75016 Paris",
    customerVatNumber: "FR98765432109",
    items: [
      {
        name: "Menu Dégustation",
        quantity: 4,
        unitPrice: 65.0,
        totalPrice: 260.0,
        taxRate: 10,
      },
      {
        name: "Bouteille de vin",
        quantity: 2,
        unitPrice: 45.0,
        totalPrice: 90.0,
        taxRate: 20,
      },
    ],
    subtotal: 350.0,
    taxAmount: 44.0,
    total: 394.0,
    createdAt: "2025-04-10T19:30:00Z",
    dueDate: "2025-04-24T19:30:00Z",
    status: "overdue",
    notes: "Repas d'affaires",
    paymentMethod: "bank_transfer",
    restaurantId: "1",
  },
]

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

  delete: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return true
  },
}

export default function InvoicesPage() {
  const params = useParams<{ restaurantId: string }>()
  const { restaurantId } = params

  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [emailRecipient, setEmailRecipient] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invoicesData, ordersData] = await Promise.all([
          invoiceApi.getAll(restaurantId),
          orderApi.getAll(restaurantId),
        ])

        setInvoices(invoicesData)
        setOrders(ordersData)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [restaurantId])

  const handleUpdateInvoice = async (updatedData: Partial<Invoice>) => {
    if (!selectedInvoice) return

    try {
      const updatedInvoice = await invoiceApi.update(selectedInvoice.id, updatedData)
      if (updatedInvoice) {
        setInvoices(invoices.map((i) => (i.id === selectedInvoice.id ? updatedInvoice : i)))
      }
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la facture:", error)
    }
  }

  const handleDeleteInvoice = async () => {
    if (!selectedInvoice) return

    try {
      await invoiceApi.delete(selectedInvoice.id)
      setInvoices(invoices.filter((i) => i.id !== selectedInvoice.id))
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error("Erreur lors de la suppression de la facture:", error)
    }
  }

  const handleSendEmail = async () => {
    if (!selectedInvoice) return

    // Simuler l'envoi d'un email
    console.log(`Email envoyé à ${emailRecipient} avec le sujet: ${emailSubject}`)
    setIsEmailDialogOpen(false)
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
    })
  }

  const filteredInvoices = invoices
    .filter((invoice) => {
      const matchesSearch =
        invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (invoice.customerName && invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (invoice.customerEmail && invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()))

      if (filterValue === "all") return matchesSearch
      if (filterValue === "paid" && invoice.status === "paid") return matchesSearch
      if (filterValue === "unpaid" && invoice.status === "unpaid") return matchesSearch
      if (filterValue === "overdue" && invoice.status === "overdue") return matchesSearch
      if (filterValue === "cancelled" && invoice.status === "cancelled") return matchesSearch

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
        <h1 className="text-3xl font-bold tracking-tight">Gestion des factures</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nouvelle facture
        </Button>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">Toutes les factures</TabsTrigger>
          <TabsTrigger value="paid">Payées</TabsTrigger>
          <TabsTrigger value="unpaid">Non payées</TabsTrigger>
          <TabsTrigger value="overdue">En retard</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Liste des factures</CardTitle>
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
                        <SelectItem value="cancelled">Annulées</SelectItem>
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
                        <TableHead>Échéance</TableHead>
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
                          <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                          <TableCell>{getInvoiceStatusBadge(invoice.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedInvoice(invoice)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                Voir
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setSelectedInvoice(invoice)
                                  setEmailRecipient(invoice.customerEmail || "")
                                  setEmailSubject(`Facture ${invoice.number}`)
                                  setEmailMessage(
                                    `Cher client,\n\nVeuillez trouver ci-joint votre facture ${invoice.number} d'un montant de ${invoice.total.toFixed(2)} €.\n\nCordialement,\nLe Bistrot Parisien`,
                                  )
                                  setIsEmailDialogOpen(true)
                                }}
                              >
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

        <TabsContent value="paid" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Numéro</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Date de paiement</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices
                      .filter((invoice) => invoice.status === "paid")
                      .map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.number}</TableCell>
                          <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                          <TableCell>{invoice.customerName || "Client sur place"}</TableCell>
                          <TableCell>{invoice.total.toFixed(2)} €</TableCell>
                          <TableCell>{invoice.paidDate ? formatDate(invoice.paidDate) : "-"}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedInvoice(invoice)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                Voir
                              </Button>
                              <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unpaid" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Numéro</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices
                      .filter((invoice) => invoice.status === "unpaid")
                      .map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.number}</TableCell>
                          <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                          <TableCell>{invoice.customerName || "Client sur place"}</TableCell>
                          <TableCell>{invoice.total.toFixed(2)} €</TableCell>
                          <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedInvoice(invoice)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                Voir
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedInvoice(invoice)
                                  handleUpdateInvoice({ status: "paid", paidDate: new Date().toISOString() })
                                }}
                              >
                                Marquer payée
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Numéro</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead>Retard</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices
                      .filter((invoice) => invoice.status === "overdue")
                      .map((invoice) => {
                        const dueDate = new Date(invoice.dueDate)
                        const today = new Date()
                        const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))

                        return (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.number}</TableCell>
                            <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                            <TableCell>{invoice.customerName || "Client sur place"}</TableCell>
                            <TableCell>{invoice.total.toFixed(2)} €</TableCell>
                            <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                            <TableCell className="text-red-500">{daysOverdue} jours</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedInvoice(invoice)
                                    setIsViewDialogOpen(true)
                                  }}
                                >
                                  Voir
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedInvoice(invoice)
                                    setEmailRecipient(invoice.customerEmail || "")
                                    setEmailSubject(`Rappel: Facture ${invoice.number} en retard`)
                                    setEmailMessage(
                                      `Cher client,\n\nNous vous rappelons que votre facture ${
                                        invoice.number
                                      } d'un montant de ${invoice.total.toFixed(
                                        2,
                                      )} € est en retard de paiement de ${daysOverdue} jours.\n\nMerci de bien vouloir procéder au règlement dans les plus brefs délais.\n\nCordialement,\nLe Bistrot Parisien`,
                                    )
                                    setIsEmailDialogOpen(true)
                                  }}
                                >
                                  Envoyer rappel
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogue de visualisation de facture */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
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
                  <p>SIRET: 123 456 789 00012</p>
                  <p>TVA: FR12345678900</p>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Client</h4>
                  <p>{selectedInvoice.customerName || "Client sur place"}</p>
                  {selectedInvoice.customerEmail && <p>{selectedInvoice.customerEmail}</p>}
                  {selectedInvoice.customerPhone && <p>{selectedInvoice.customerPhone}</p>}
                  {selectedInvoice.customerAddress && <p>{selectedInvoice.customerAddress}</p>}
                  {selectedInvoice.customerVatNumber && <p>TVA: {selectedInvoice.customerVatNumber}</p>}
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

              {selectedInvoice.paymentMethod && (
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Paiement</h4>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <p>Méthode: {selectedInvoice.paymentMethod}</p>
                  </div>
                  {selectedInvoice.paidDate && (
                    <p className="mt-1">Date de paiement: {formatDate(selectedInvoice.paidDate)}</p>
                  )}
                </div>
              )}

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
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'envoi d'email */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Envoyer la facture par email</DialogTitle>
            <DialogDescription>Envoyez la facture au client par email.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Destinataire</Label>
              <Input
                id="recipient"
                type="email"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input id="subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="attach-pdf" className="rounded border-gray-300" checked />
              <Label htmlFor="attach-pdf">Joindre la facture en PDF</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendEmail}>Envoyer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
