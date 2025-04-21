"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Download, Filter, RefreshCw, FileText, Receipt, CreditCard, PieChart } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Composant pour les graphiques financiers
const FinancialChart = () => {
  return (
    <div className="h-[300px] w-full flex items-center justify-center bg-gray-100 rounded-md">
      <div className="text-center">
        <PieChart className="h-12 w-12 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">Graphique financier</p>
      </div>
    </div>
  )
}

// Composant pour les factures
const InvoiceItem = ({
  id,
  date,
  client,
  amount,
  status,
}: {
  id: string
  date: string
  client: string
  amount: string
  status: "payée" | "en attente" | "retard"
}) => {
  const statusColor =
    status === "payée"
      ? "bg-green-100 text-green-800"
      : status === "en attente"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800"

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 p-2 rounded-md">
          <FileText className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <div className="font-medium">{id}</div>
          <div className="text-sm text-muted-foreground">{date}</div>
        </div>
      </div>
      <div>{client}</div>
      <div className="font-medium">{amount}</div>
      <div>
        <Badge className={statusColor}>{status}</Badge>
      </div>
      <Button variant="outline" size="sm">
        Voir
      </Button>
    </div>
  )
}

export default function ComptabilitePage() {
  const [exportFormat, setExportFormat] = useState<string>("pdf")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleExport = () => {
    setIsLoading(true)
    // Simuler un export
    setTimeout(() => {
      setIsLoading(false)
      alert(`Rapport exporté en format ${exportFormat.toUpperCase()}`)
    }, 1500)
  }

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
          <h2 className="text-3xl font-bold tracking-tight">Comptabilité</h2>
          <div className="flex items-center gap-2">
            <CalendarDateRangePicker />
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} disabled={isLoading}>
              {isLoading ? (
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
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Retour au tableau de bord
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">51,678 €</div>
              <p className="text-xs text-green-500">+5.6% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32,456 €</div>
              <p className="text-xs text-red-500">+3.2% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bénéfice</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">19,222 €</div>
              <p className="text-xs text-green-500">+9.8% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Marge</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">37.2%</div>
              <p className="text-xs text-green-500">+1.5% par rapport au mois dernier</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="factures" className="space-y-4">
          <TabsList>
            <TabsTrigger value="factures">Factures</TabsTrigger>
            <TabsTrigger value="depenses">Dépenses</TabsTrigger>
            <TabsTrigger value="rapports">Rapports financiers</TabsTrigger>
            <TabsTrigger value="fiscalite">Fiscalité</TabsTrigger>
            <TabsTrigger value="tresorerie">Trésorerie</TabsTrigger>
          </TabsList>

          <TabsContent value="factures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Factures</CardTitle>
                <CardDescription>Gérez vos factures clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Input placeholder="Rechercher une facture..." className="max-w-sm" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="paid">Payées</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="overdue">En retard</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Nouvelle facture
                  </Button>
                </div>

                <div className="border rounded-md">
                  <div className="grid grid-cols-5 p-4 bg-muted font-medium">
                    <div>Facture</div>
                    <div>Client</div>
                    <div>Montant</div>
                    <div>Statut</div>
                    <div></div>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <InvoiceItem
                      id="FACT-2025-042"
                      date="15 avril 2025"
                      client="Restaurant Le Gourmet"
                      amount="1,245.50 €"
                      status="payée"
                    />
                    <InvoiceItem
                      id="FACT-2025-041"
                      date="10 avril 2025"
                      client="Bistrot du Coin"
                      amount="876.25 €"
                      status="payée"
                    />
                    <InvoiceItem
                      id="FACT-2025-040"
                      date="5 avril 2025"
                      client="La Brasserie"
                      amount="1,532.75 €"
                      status="en attente"
                    />
                    <InvoiceItem
                      id="FACT-2025-039"
                      date="1 avril 2025"
                      client="Restaurant Le Gourmet"
                      amount="945.00 €"
                      status="payée"
                    />
                    <InvoiceItem
                      id="FACT-2025-038"
                      date="28 mars 2025"
                      client="Bistrot du Coin"
                      amount="1,123.50 €"
                      status="retard"
                    />
                    <InvoiceItem
                      id="FACT-2025-037"
                      date="25 mars 2025"
                      client="La Brasserie"
                      amount="789.25 €"
                      status="payée"
                    />
                  </ScrollArea>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Affichage de 6 factures sur 124</div>
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

          <TabsContent value="depenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dépenses</CardTitle>
                <CardDescription>Suivez et gérez vos dépenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Input placeholder="Rechercher une dépense..." className="max-w-sm" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      <SelectItem value="food">Nourriture</SelectItem>
                      <SelectItem value="beverage">Boissons</SelectItem>
                      <SelectItem value="salary">Salaires</SelectItem>
                      <SelectItem value="rent">Loyer</SelectItem>
                      <SelectItem value="utilities">Charges</SelectItem>
                      <SelectItem value="other">Autres</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                  <Button>
                    <Receipt className="mr-2 h-4 w-4" />
                    Nouvelle dépense
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Fournisseur</TableHead>
                      <TableHead className="text-right">Montant</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>15/04/2025</TableCell>
                      <TableCell>Commande de viande</TableCell>
                      <TableCell>Nourriture</TableCell>
                      <TableCell>Boucherie Martin</TableCell>
                      <TableCell className="text-right">1,245.50 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>12/04/2025</TableCell>
                      <TableCell>Commande de boissons</TableCell>
                      <TableCell>Boissons</TableCell>
                      <TableCell>Distributeur ABC</TableCell>
                      <TableCell className="text-right">876.25 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10/04/2025</TableCell>
                      <TableCell>Salaires du personnel</TableCell>
                      <TableCell>Salaires</TableCell>
                      <TableCell>Employés</TableCell>
                      <TableCell className="text-right">8,532.75 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>05/04/2025</TableCell>
                      <TableCell>Loyer du local</TableCell>
                      <TableCell>Loyer</TableCell>
                      <TableCell>SCI Immobilier</TableCell>
                      <TableCell className="text-right">2,500.00 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>03/04/2025</TableCell>
                      <TableCell>Facture d'électricité</TableCell>
                      <TableCell>Charges</TableCell>
                      <TableCell>EDF</TableCell>
                      <TableCell className="text-right">745.30 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Affichage de 5 dépenses sur 87</div>
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

          <TabsContent value="rapports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapports financiers</CardTitle>
                <CardDescription>Consultez vos rapports financiers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compte de résultat</CardTitle>
                      <CardDescription>Revenus et dépenses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FinancialChart />
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger le rapport
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Bilan</CardTitle>
                      <CardDescription>Actifs et passifs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FinancialChart />
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger le rapport
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Flux de trésorerie</CardTitle>
                      <CardDescription>Entrées et sorties de trésorerie</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FinancialChart />
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger le rapport
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Analyse des coûts</CardTitle>
                      <CardDescription>Répartition des dépenses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FinancialChart />
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger le rapport
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fiscalite" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fiscalité</CardTitle>
                <CardDescription>Gérez vos obligations fiscales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>TVA</CardTitle>
                        <CardDescription>Déclaration de TVA</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-sm text-muted-foreground">Prochaine échéance</div>
                              <div className="font-medium">30 avril 2025</div>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800">À venir</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <div className="text-sm">TVA collectée</div>
                              <div className="font-medium">10,335.60 €</div>
                            </div>
                            <div className="flex justify-between">
                              <div className="text-sm">TVA déductible</div>
                              <div className="font-medium">6,491.20 €</div>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                              <div className="text-sm font-medium">TVA à payer</div>
                              <div className="font-bold">3,844.40 €</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Préparer la déclaration</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Impôt sur les sociétés</CardTitle>
                        <CardDescription>Déclaration annuelle</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-sm text-muted-foreground">Prochaine échéance</div>
                              <div className="font-medium">15 mai 2025</div>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800">À venir</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <div className="text-sm">Bénéfice imposable estimé</div>
                              <div className="font-medium">230,500.00 €</div>
                            </div>
                            <div className="flex justify-between">
                              <div className="text-sm">Taux d'imposition</div>
                              <div className="font-medium">25%</div>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                              <div className="text-sm font-medium">Impôt estimé</div>
                              <div className="font-bold">57,625.00 €</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Préparer la déclaration</Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Calendrier fiscal</CardTitle>
                      <CardDescription>Échéances fiscales à venir</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Montant estimé</TableHead>
                            <TableHead>Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>30/04/2025</TableCell>
                            <TableCell>TVA</TableCell>
                            <TableCell>Déclaration et paiement de la TVA (Mars 2025)</TableCell>
                            <TableCell>3,844.40 €</TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-100 text-yellow-800">À venir</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>15/05/2025</TableCell>
                            <TableCell>IS</TableCell>
                            <TableCell>Acompte d'impôt sur les sociétés (Q2 2025)</TableCell>
                            <TableCell>14,406.25 €</TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-100 text-yellow-800">À venir</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>31/05/2025</TableCell>
                            <TableCell>TVA</TableCell>
                            <TableCell>Déclaration et paiement de la TVA (Avril 2025)</TableCell>
                            <TableCell>À déterminer</TableCell>
                            <TableCell>
                              <Badge className="bg-gray-100 text-gray-800">À préparer</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>15/06/2025</TableCell>
                            <TableCell>CFE</TableCell>
                            <TableCell>Cotisation foncière des entreprises</TableCell>
                            <TableCell>2,500.00 €</TableCell>
                            <TableCell>
                              <Badge className="bg-gray-100 text-gray-800">À préparer</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tresorerie" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trésorerie</CardTitle>
                <CardDescription>Suivez votre trésorerie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Solde actuel</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">45,678.90 €</div>
                        <p className="text-sm text-green-500">+12,345.67 € ce mois-ci</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Entrées prévues</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">23,456.78 €</div>
                        <p className="text-sm text-muted-foreground">Dans les 30 prochains jours</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Sorties prévues</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">18,765.43 €</div>
                        <p className="text-sm text-muted-foreground">Dans les 30 prochains jours</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Prévisions de trésorerie</CardTitle>
                      <CardDescription>Évolution sur les 6 prochains mois</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FinancialChart />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Mouvements récents</CardTitle>
                      <CardDescription>Dernières opérations sur vos comptes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Montant</TableHead>
                            <TableHead className="text-right">Solde</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>15/04/2025</TableCell>
                            <TableCell>Paiement client - Restaurant Le Gourmet</TableCell>
                            <TableCell>Entrée</TableCell>
                            <TableCell className="text-right text-green-500">+1,245.50 €</TableCell>
                            <TableCell className="text-right">45,678.90 €</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>12/04/2025</TableCell>
                            <TableCell>Paiement fournisseur - Distributeur ABC</TableCell>
                            <TableCell>Sortie</TableCell>
                            <TableCell className="text-right text-red-500">-876.25 €</TableCell>
                            <TableCell className="text-right">44,433.40 €</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>10/04/2025</TableCell>
                            <TableCell>Salaires du personnel</TableCell>
                            <TableCell>Sortie</TableCell>
                            <TableCell className="text-right text-red-500">-8,532.75 €</TableCell>
                            <TableCell className="text-right">45,309.65 €</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>10/04/2025</TableCell>
                            <TableCell>Paiement client - Bistrot du Coin</TableCell>
                            <TableCell>Entrée</TableCell>
                            <TableCell className="text-right text-green-500">+876.25 €</TableCell>
                            <TableCell className="text-right">53,842.40 €</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>05/04/2025</TableCell>
                            <TableCell>Loyer du local</TableCell>
                            <TableCell>Sortie</TableCell>
                            <TableCell className="text-right text-red-500">-2,500.00 €</TableCell>
                            <TableCell className="text-right">52,966.15 €</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
