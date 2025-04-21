"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Plus, Filter, RefreshCw, Download, FileText, CreditCard, DollarSign } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"
import { Separator } from "@/components/ui/separator"

interface Invoice {
  id: string
  date: string
  dueDate: string
  client: string
  amount: string
  status: "paid" | "pending" | "overdue" | "draft" | "cancelled"
  items: number
}

export default function FournisseurFacturationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [isExporting, setIsExporting] = useState(false)

  const invoices: Invoice[] = [
    {
      id: "FACT-2025-042",
      date: "15/04/2025",
      dueDate: "15/05/2025",
      client: "Restaurant Le Gourmet",
      amount: "1,245.50 €",
      status: "pending",
      items: 8,
    },
    {
      id: "FACT-2025-041",
      date: "10/04/2025",
      dueDate: "10/05/2025",
      client: "Bistrot du Coin",
      amount: "876.25 €",
      status: "paid",
      items: 5,
    },
    {
      id: "FACT-2025-040",
      date: "05/04/2025",
      dueDate: "05/05/2025",
      client: "La Brasserie",
      amount: "1,532.75 €",
      status: "pending",
      items: 12,
    },
    {
      id: "FACT-2025-039",
      date: "01/04/2025",
      dueDate: "01/05/2025",
      client: "Restaurant Le Gourmet",
      amount: "945.00 €",
      status: "paid",
      items: 6,
    },
    {
      id: "FACT-2025-038",
      date: "28/03/2025",
      dueDate: "28/04/2025",
      client: "Bistrot du Coin",
      amount: "1,123.50 €",
      status: "overdue",
      items: 9,
    },
    {
      id: "FACT-2025-037",
      date: "25/03/2025",
      dueDate: "25/04/2025",
      client: "La Brasserie",
      amount: "789.25 €",
      status: "paid",
      items: 4,
    },
    {
      id: "FACT-2025-036",
      date: "20/03/2025",
      dueDate: "20/04/2025",
      client: "Restaurant Le Gourmet",
      amount: "1,567.00 €",
      status: "overdue",
      items: 11,
    },
    {
      id: "FACT-2025-035",
      date: "15/03/2025",
      dueDate: "15/04/2025",
      client: "Bistrot du Coin",
      amount: "678.50 €",
      status: "paid",
      items: 3,
    },
    {
      id: "FACT-2025-034",
      date: "10/03/2025",
      dueDate: "10/04/2025",
      client: "La Brasserie",
      amount: "1,234.75 €",
      status: "paid",
      items: 7,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Payée"
      case "pending":
        return "En attente"
      case "overdue":
        return "En retard"
      case "draft":
        return "Brouillon"
      case "cancelled":
        return "Annulée"
      default:
        return status
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      alert("Factures exportées avec succès")
    }, 1500)
  }

  // Calculate financial metrics
  const totalInvoiced = invoices.reduce((sum, invoice) => {
    return sum + Number.parseFloat(invoice.amount.replace(/[^\d.-]/g, "").replace(",", "."))
  }, 0)

  const totalPaid = invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => {
      return sum + Number.parseFloat(invoice.amount.replace(/[^\d.-]/g, "").replace(",", "."))
    }, 0)

  const totalPending = invoices
    .filter((invoice) => invoice.status === "pending")
    .reduce((sum, invoice) => {
      return sum + Number.parseFloat(invoice.amount.replace(/[^\d.-]/g, "").replace(",", "."))
    }, 0)

  const totalOverdue = invoices
    .filter((invoice) => invoice.status === "overdue")
    .reduce((sum, invoice) => {
      return sum + Number.parseFloat(invoice.amount.replace(/[^\d.-]/g, "").replace(",", "."))
    }, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Facturation</h2>
          <div className="flex items-center gap-2">
            <Button onClick={handleExport} disabled={isExporting}>
              {isExporting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Exportation...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </>
              )}
            </Button>
            <Link href="/fournisseur">
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total facturé</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInvoiced.toLocaleString("fr-FR")} €</div>
              <p className="text-xs text-muted-foreground">Sur les 30 derniers jours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Montant payé</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPaid.toLocaleString("fr-FR")} €</div>
              <p className="text-xs text-green-500">
                {((totalPaid / totalInvoiced) * 100).toFixed(1)}% du total facturé
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPending.toLocaleString("fr-FR")} €</div>
              <p className="text-xs text-yellow-500">
                {((totalPending / totalInvoiced) * 100).toFixed(1)}% du total facturé
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En retard</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOverdue.toLocaleString("fr-FR")} €</div>
              <p className="text-xs text-red-500">
                {((totalOverdue / totalInvoiced) * 100).toFixed(1)}% du total facturé
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="invoices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="invoices">Factures</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Factures</CardTitle>
                <CardDescription>Gérez vos factures clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                  <div className="relative w-full md:w-auto flex-1">
                    <Input
                      placeholder="Rechercher une facture..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="paid">Payées</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="overdue">En retard</SelectItem>
                      <SelectItem value="draft">Brouillons</SelectItem>
                      <SelectItem value="cancelled">Annulées</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les périodes</SelectItem>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Cette semaine</SelectItem>
                      <SelectItem value="month">Ce mois</SelectItem>
                      <SelectItem value="quarter">Ce trimestre</SelectItem>
                      <SelectItem value="year">Cette année</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvelle facture
                  </Button>
                </div>

                {filteredInvoices.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucune facture ne correspond à votre recherche
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Numéro</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Échéance</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Articles</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInvoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.dueDate}</TableCell>
                            <TableCell>{invoice.client}</TableCell>
                            <TableCell>{invoice.amount}</TableCell>
                            <TableCell>{invoice.items}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(invoice.status)}>{getStatusText(invoice.status)}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                Voir
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Affichage de {filteredInvoices.length} factures sur {invoices.length}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Factures par statut</CardTitle>
                  <CardDescription>Répartition des factures selon leur statut</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor("paid")}>Payées</Badge>
                        <span className="font-medium">
                          {invoices.filter((invoice) => invoice.status === "paid").length} factures
                        </span>
                      </div>
                      <div className="font-bold">
                        {totalPaid.toLocaleString("fr-FR")} € ({((totalPaid / totalInvoiced) * 100).toFixed(1)}%)
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor("pending")}>En attente</Badge>
                        <span className="font-medium">
                          {invoices.filter((invoice) => invoice.status === "pending").length} factures
                        </span>
                      </div>
                      <div className="font-bold">
                        {totalPending.toLocaleString("fr-FR")} € ({((totalPending / totalInvoiced) * 100).toFixed(1)}%)
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor("overdue")}>En retard</Badge>
                        <span className="font-medium">
                          {invoices.filter((invoice) => invoice.status === "overdue").length} factures
                        </span>
                      </div>
                      <div className="font-bold">
                        {totalOverdue.toLocaleString("fr-FR")} € ({((totalOverdue / totalInvoiced) * 100).toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Factures par client</CardTitle>
                  <CardDescription>Répartition des factures par client</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from(new Set(invoices.map((invoice) => invoice.client))).map((client) => {
                      const clientInvoices = invoices.filter((invoice) => invoice.client === client)
                      const clientTotal = clientInvoices.reduce((sum, invoice) => {
                        return sum + Number.parseFloat(invoice.amount.replace(/[^\d.-]/g, "").replace(",", "."))
                      }, 0)
                      return (
                        <div key={client} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div className="font-medium">{client}</div>
                          <div className="text-right">
                            <div className="font-bold">{clientTotal.toLocaleString("fr-FR")} €</div>
                            <div className="text-xs text-muted-foreground">
                              {clientInvoices.length} facture{clientInvoices.length > 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Clients</CardTitle>
                <CardDescription>Gérez vos clients et leurs informations de facturation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Input placeholder="Rechercher un client..." />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau client
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Adresse</TableHead>
                        <TableHead>Factures</TableHead>
                        <TableHead>Montant total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Restaurant Le Gourmet</TableCell>
                        <TableCell>Jean Dupont</TableCell>
                        <TableCell>contact@legourmet.fr</TableCell>
                        <TableCell>01 23 45 67 89</TableCell>
                        <TableCell>15 rue de la Gastronomie, Paris</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>12,450.75 €</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bistrot du Coin</TableCell>
                        <TableCell>Marie Martin</TableCell>
                        <TableCell>contact@bistrotducoin.fr</TableCell>
                        <TableCell>01 98 76 54 32</TableCell>
                        <TableCell>8 place du Marché, Lyon</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>8,765.50 €</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">La Brasserie</TableCell>
                        <TableCell>Pierre Blanc</TableCell>
                        <TableCell>contact@labrasserie.fr</TableCell>
                        <TableCell>04 56 78 90 12</TableCell>
                        <TableCell>25 avenue des Champs, Marseille</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>10,234.25 €</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Affichage de 3 clients sur 3</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Suivant
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Produits facturables</CardTitle>
                <CardDescription>Gérez vos produits et leurs tarifs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Input placeholder="Rechercher un produit..." />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      <SelectItem value="ingredients">Ingrédients secs</SelectItem>
                      <SelectItem value="oils">Huiles et condiments</SelectItem>
                      <SelectItem value="meat">Viandes</SelectItem>
                      <SelectItem value="dairy">Produits laitiers</SelectItem>
                      <SelectItem value="vegetables">Fruits et légumes</SelectItem>
                      <SelectItem value="beverages">Boissons</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau produit
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Référence</TableHead>
                        <TableHead>Prix unitaire</TableHead>
                        <TableHead>Unité</TableHead>
                        <TableHead>TVA</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Farine de blé T55</TableCell>
                        <TableCell>Ingrédients secs</TableCell>
                        <TableCell>PROD-001</TableCell>
                        <TableCell>1.25 €</TableCell>
                        <TableCell>kg</TableCell>
                        <TableCell>5.5%</TableCell>
                        <TableCell>250 kg</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Huile d'olive extra vierge</TableCell>
                        <TableCell>Huiles et condiments</TableCell>
                        <TableCell>PROD-002</TableCell>
                        <TableCell>8.50 €</TableCell>
                        <TableCell>L</TableCell>
                        <TableCell>5.5%</TableCell>
                        <TableCell>45 L</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Viande de bœuf (entrecôte)</TableCell>
                        <TableCell>Viandes</TableCell>
                        <TableCell>PROD-003</TableCell>
                        <TableCell>24.90 €</TableCell>
                        <TableCell>kg</TableCell>
                        <TableCell>5.5%</TableCell>
                        <TableCell>0 kg</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fromage Comté AOP</TableCell>
                        <TableCell>Produits laitiers</TableCell>
                        <TableCell>PROD-004</TableCell>
                        <TableCell>18.75 €</TableCell>
                        <TableCell>kg</TableCell>
                        <TableCell>5.5%</TableCell>
                        <TableCell>15 kg</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Tomates fraîches</TableCell>
                        <TableCell>Fruits et légumes</TableCell>
                        <TableCell>PROD-005</TableCell>
                        <TableCell>3.50 €</TableCell>
                        <TableCell>kg</TableCell>
                        <TableCell>5.5%</TableCell>
                        <TableCell>30 kg</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Affichage de 5 produits sur 25</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de facturation</CardTitle>
                <CardDescription>Configurez vos préférences de facturation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Informations de l'entreprise</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nom de l'entreprise</label>
                        <Input defaultValue="FournisseurPro SAS" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Numéro SIRET</label>
                        <Input defaultValue="123 456 789 00012" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Numéro de TVA</label>
                        <Input defaultValue="FR 12 345678900" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Adresse</label>
                        <Input defaultValue="123 rue des Fournisseurs" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Code postal</label>
                        <Input defaultValue="75001" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ville</label>
                        <Input defaultValue="Paris" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Téléphone</label>
                        <Input defaultValue="01 23 45 67 89" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input defaultValue="contact@fournisseurpro.fr" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Paramètres des factures</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Préfixe des factures</label>
                        <Input defaultValue="FACT-" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Prochain numéro de facture</label>
                        <Input defaultValue="2025-043" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Délai de paiement par défaut (jours)</label>
                        <Input type="number" defaultValue="30" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Devise</label>
                        <Select defaultValue="eur">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une devise" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eur">Euro (€)</SelectItem>
                            <SelectItem value="usd">Dollar américain ($)</SelectItem>
                            <SelectItem value="gbp">Livre sterling (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Taux de TVA par défaut</label>
                        <Select defaultValue="5.5">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un taux" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="5.5">5.5%</SelectItem>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="20">20%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Coordonnées bancaires</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Titulaire du compte</label>
                        <Input defaultValue="FournisseurPro SAS" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Banque</label>
                        <Input defaultValue="Banque Nationale" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">IBAN</label>
                        <Input defaultValue="FR76 1234 5678 9012 3456 7890 123" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">BIC</label>
                        <Input defaultValue="BNPAFRPPXXX" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Enregistrer les modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
