import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Filter, Share2, FileText, Mail, Printer } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockFinancialData } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Données mockées pour les rapports
const financialReports = [
  {
    id: "1",
    name: "Rapport mensuel - Mars 2025",
    type: "Mensuel",
    date: "2025-04-01",
    status: "Finalisé",
  },
  {
    id: "2",
    name: "Rapport trimestriel - Q1 2025",
    type: "Trimestriel",
    date: "2025-04-05",
    status: "Finalisé",
  },
  {
    id: "3",
    name: "Rapport fiscal - 2024",
    type: "Annuel",
    date: "2025-03-15",
    status: "Finalisé",
  },
  {
    id: "4",
    name: "Rapport mensuel - Avril 2025",
    type: "Mensuel",
    date: "2025-05-01",
    status: "En préparation",
  },
]

const taxReports = [
  {
    id: "1",
    name: "Déclaration TVA - Q1 2025",
    period: "Jan-Mar 2025",
    dueDate: "2025-04-20",
    status: "À soumettre",
    amount: 4250.75,
  },
  {
    id: "2",
    name: "Déclaration TVA - Q4 2024",
    period: "Oct-Déc 2024",
    dueDate: "2025-01-20",
    status: "Soumis",
    amount: 3890.5,
  },
  {
    id: "3",
    name: "Impôt sur les sociétés - Acompte 1",
    period: "2025",
    dueDate: "2025-03-15",
    status: "Payé",
    amount: 2500.0,
  },
  {
    id: "4",
    name: "Taxe d'apprentissage",
    period: "2024",
    dueDate: "2025-02-28",
    status: "Payé",
    amount: 1200.0,
  },
]

const salesReports = [
  {
    category: "Entrées",
    quantity: 1250,
    revenue: 21125.5,
    averagePrice: 16.9,
    percentageOfTotal: 15.8,
  },
  {
    category: "Plats",
    quantity: 1850,
    revenue: 45325.0,
    averagePrice: 24.5,
    percentageOfTotal: 33.9,
  },
  {
    category: "Desserts",
    quantity: 1420,
    revenue: 12070.0,
    averagePrice: 8.5,
    percentageOfTotal: 9.0,
  },
  {
    category: "Boissons non-alcoolisées",
    quantity: 2100,
    revenue: 10500.0,
    averagePrice: 5.0,
    percentageOfTotal: 7.9,
  },
  {
    category: "Vins",
    quantity: 980,
    revenue: 29400.0,
    averagePrice: 30.0,
    percentageOfTotal: 22.0,
  },
  {
    category: "Autres alcools",
    quantity: 850,
    revenue: 15300.0,
    averagePrice: 18.0,
    percentageOfTotal: 11.4,
  },
]

const expenseReports = [
  {
    category: "Matières premières",
    amount: 28500.75,
    percentageOfTotal: 35.2,
    previousPeriod: 27800.5,
    change: 2.5,
  },
  {
    category: "Salaires",
    amount: 32450.0,
    percentageOfTotal: 40.1,
    previousPeriod: 31900.0,
    change: 1.7,
  },
  {
    category: "Loyer",
    amount: 8500.0,
    percentageOfTotal: 10.5,
    previousPeriod: 8500.0,
    change: 0.0,
  },
  {
    category: "Énergie",
    amount: 3200.5,
    percentageOfTotal: 4.0,
    previousPeriod: 2950.25,
    change: 8.5,
  },
  {
    category: "Marketing",
    amount: 2500.0,
    percentageOfTotal: 3.1,
    previousPeriod: 2200.0,
    change: 13.6,
  },
  {
    category: "Autres dépenses",
    amount: 5800.25,
    percentageOfTotal: 7.1,
    previousPeriod: 5650.75,
    change: 2.6,
  },
]

// Composant HeatMap personnalisé pour remplacer @mui/x-charts/HeatMap
const HeatMap = ({ data, xAxis, yAxis, series, height, margin }) => {
  return (
    <div
      style={{
        height: height || 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: margin || { top: 10, right: 10, bottom: 10, left: 10 },
      }}
    >
      <p className="text-muted-foreground">Graphique de répartition des ventes par période</p>
    </div>
  )
}

export default function ReportsPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Rapports</h1>
          <div className="flex items-center gap-2">
            <DatePickerWithRange className="w-auto" />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="financial" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="financial">Financiers</TabsTrigger>
            <TabsTrigger value="sales">Ventes</TabsTrigger>
            <TabsTrigger value="expenses">Dépenses</TabsTrigger>
            <TabsTrigger value="tax">Fiscalité</TabsTrigger>
          </TabsList>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Rapports financiers</CardTitle>
                  <CardDescription>Consultez et générez des rapports financiers</CardDescription>
                </div>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Nouveau rapport
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du rapport</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>
                          {new Date(report.date).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              report.status === "Finalisé"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {report.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Résumé financier</CardTitle>
                <CardDescription>Aperçu des performances financières</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Chiffre d'affaires (mois en cours)</p>
                    <p className="text-2xl font-bold">
                      {mockFinancialData.monthlySummary.revenue.toLocaleString("fr-FR")} €
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+4.3%</span> vs mois précédent
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Dépenses (mois en cours)</p>
                    <p className="text-2xl font-bold">
                      {mockFinancialData.monthlySummary.expenses.toLocaleString("fr-FR")} €
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-red-500">+2.1%</span> vs mois précédent
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Bénéfice (mois en cours)</p>
                    <p className="text-2xl font-bold">
                      {mockFinancialData.monthlySummary.profit.toLocaleString("fr-FR")} €
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+8.7%</span> vs mois précédent
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Marge bénéficiaire</p>
                    <p className="text-2xl font-bold">
                      {(
                        (mockFinancialData.monthlySummary.profit / mockFinancialData.monthlySummary.revenue) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+1.2%</span> vs mois précédent
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Rapport des ventes par catégorie</CardTitle>
                  <CardDescription>Analyse détaillée des ventes par catégorie de produits</CardDescription>
                </div>
                <Select defaultValue="month">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="quarter">Ce trimestre</SelectItem>
                    <SelectItem value="year">Cette année</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Catégorie</TableHead>
                      <TableHead className="text-right">Quantité</TableHead>
                      <TableHead className="text-right">Chiffre d'affaires</TableHead>
                      <TableHead className="text-right">Prix moyen</TableHead>
                      <TableHead className="text-right">% du total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesReports.map((item) => (
                      <TableRow key={item.category}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">{item.revenue.toLocaleString("fr-FR")} €</TableCell>
                        <TableCell className="text-right">{item.averagePrice.toFixed(2)} €</TableCell>
                        <TableCell className="text-right">{item.percentageOfTotal.toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-medium">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">
                        {salesReports.reduce((acc, item) => acc + item.quantity, 0)}
                      </TableCell>
                      <TableCell className="text-right">
                        {salesReports.reduce((acc, item) => acc + item.revenue, 0).toLocaleString("fr-FR")} €
                      </TableCell>
                      <TableCell className="text-right">
                        {(
                          salesReports.reduce((acc, item) => acc + item.revenue, 0) /
                          salesReports.reduce((acc, item) => acc + item.quantity, 0)
                        ).toFixed(2)}{" "}
                        €
                      </TableCell>
                      <TableCell className="text-right">100%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes par serveur</CardTitle>
                  <CardDescription>Performance des ventes par membre du personnel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Sophie M.", ventes: 12580, objectif: 12000, pourboires: 1580 },
                          { name: "Thomas L.", ventes: 10850, objectif: 11000, pourboires: 1350 },
                          { name: "Julie D.", ventes: 9750, objectif: 10000, pourboires: 1250 },
                          { name: "Marc B.", ventes: 8900, objectif: 9000, pourboires: 980 },
                          { name: "Emma R.", ventes: 7650, objectif: 8000, pourboires: 850 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => {
                            return [
                              `${value.toLocaleString("fr-FR")} €`,
                              name === "ventes" ? "Ventes" : name === "objectif" ? "Objectif" : "Pourboires",
                            ]
                          }}
                        />
                        <Legend
                          formatter={(value) =>
                            value === "ventes" ? "Ventes" : value === "objectif" ? "Objectif" : "Pourboires"
                          }
                        />
                        <Bar dataKey="ventes" fill="#8884d8" />
                        <Bar dataKey="pourboires" fill="#82ca9d" />
                        <ReferenceLine y={10000} stroke="red" strokeDasharray="3 3" label="Objectif moyen" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Meilleur vendeur:</span>
                      <span>Sophie M. (12 580 €)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Moyenne des ventes:</span>
                      <span>9 946 € par serveur</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Total des pourboires:</span>
                      <span>6 010 €</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ventes par période</CardTitle>
                  <CardDescription>Analyse des ventes par jour et heure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <HeatMap
                      data={[
                        { jour: "Lundi", "11h-14h": 1250, "14h-17h": 580, "17h-20h": 950, "20h-23h": 1850 },
                        { jour: "Mardi", "11h-14h": 1180, "14h-17h": 620, "17h-20h": 880, "20h-23h": 1750 },
                        { jour: "Mercredi", "11h-14h": 1350, "14h-17h": 650, "17h-20h": 920, "20h-23h": 1950 },
                        { jour: "Jeudi", "11h-14h": 1450, "14h-17h": 700, "17h-20h": 1050, "20h-23h": 2150 },
                        { jour: "Vendredi", "11h-14h": 1550, "14h-17h": 750, "17h-20h": 1250, "20h-23h": 2850 },
                        { jour: "Samedi", "11h-14h": 1850, "14h-17h": 950, "17h-20h": 1450, "20h-23h": 3250 },
                        { jour: "Dimanche", "11h-14h": 2050, "14h-17h": 850, "17h-20h": 1350, "20h-23h": 2450 },
                      ]}
                      xAxis={[{ scaleType: "band", dataKey: "jour" }]}
                      yAxis={[{ scaleType: "band", dataKey: "heure" }]}
                      series={[
                        {
                          type: "heatmap",
                          dataKey: "11h-14h",
                          name: "Déjeuner",
                          valueLabel: { formatter: (v) => `${v}€` },
                        },
                        {
                          type: "heatmap",
                          dataKey: "14h-17h",
                          name: "Après-midi",
                          valueLabel: { formatter: (v) => `${v}€` },
                        },
                        {
                          type: "heatmap",
                          dataKey: "17h-20h",
                          name: "Début de soirée",
                          valueLabel: { formatter: (v) => `${v}€` },
                        },
                        {
                          type: "heatmap",
                          dataKey: "20h-23h",
                          name: "Dîner",
                          valueLabel: { formatter: (v) => `${v}€` },
                        },
                      ]}
                      height={300}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Période la plus rentable:</span>
                      <span>Samedi 20h-23h (3 250 €)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Période la moins rentable:</span>
                      <span>Lundi 14h-17h (580 €)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Recommandation:</span>
                      <span className="text-green-600">Augmenter le personnel le samedi soir</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Rapport des dépenses par catégorie</CardTitle>
                  <CardDescription>Analyse détaillée des dépenses par catégorie</CardDescription>
                </div>
                <Select defaultValue="month">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="quarter">Ce trimestre</SelectItem>
                    <SelectItem value="year">Cette année</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Catégorie</TableHead>
                      <TableHead className="text-right">Montant</TableHead>
                      <TableHead className="text-right">% du total</TableHead>
                      <TableHead className="text-right">Période précédente</TableHead>
                      <TableHead className="text-right">Variation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseReports.map((item) => (
                      <TableRow key={item.category}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell className="text-right">{item.amount.toLocaleString("fr-FR")} €</TableCell>
                        <TableCell className="text-right">{item.percentageOfTotal.toFixed(1)}%</TableCell>
                        <TableCell className="text-right">{item.previousPeriod.toLocaleString("fr-FR")} €</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.change > 0 ? "text-red-500" : item.change < 0 ? "text-green-500" : "text-gray-500"
                            }
                          >
                            {item.change > 0 ? "+" : ""}
                            {item.change.toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-medium">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">
                        {expenseReports.reduce((acc, item) => acc + item.amount, 0).toLocaleString("fr-FR")} €
                      </TableCell>
                      <TableCell className="text-right">100%</TableCell>
                      <TableCell className="text-right">
                        {expenseReports.reduce((acc, item) => acc + item.previousPeriod, 0).toLocaleString("fr-FR")} €
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            (expenseReports.reduce((acc, item) => acc + item.amount, 0) /
                              expenseReports.reduce((acc, item) => acc + item.previousPeriod, 0) -
                              1) *
                              100 >
                            0
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          {(
                            (expenseReports.reduce((acc, item) => acc + item.amount, 0) /
                              expenseReports.reduce((acc, item) => acc + item.previousPeriod, 0) -
                              1) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évolution des dépenses</CardTitle>
                <CardDescription>Tendance des dépenses sur les 12 derniers mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        {
                          mois: "Avr 2024",
                          matières: 26800,
                          salaires: 30500,
                          loyer: 8500,
                          énergie: 3100,
                          marketing: 2200,
                          autres: 5500,
                        },
                        {
                          mois: "Mai 2024",
                          matières: 27200,
                          salaires: 30800,
                          loyer: 8500,
                          énergie: 3000,
                          marketing: 2300,
                          autres: 5600,
                        },
                        {
                          mois: "Juin 2024",
                          matières: 28100,
                          salaires: 31200,
                          loyer: 8500,
                          énergie: 3200,
                          marketing: 2400,
                          autres: 5700,
                        },
                        {
                          mois: "Juil 2024",
                          matières: 29500,
                          salaires: 31800,
                          loyer: 8500,
                          énergie: 3400,
                          marketing: 2500,
                          autres: 5800,
                        },
                        {
                          mois: "Août 2024",
                          matières: 30200,
                          salaires: 32100,
                          loyer: 8500,
                          énergie: 3500,
                          marketing: 2600,
                          autres: 5900,
                        },
                        {
                          mois: "Sept 2024",
                          matières: 29800,
                          salaires: 31900,
                          loyer: 8500,
                          énergie: 3300,
                          marketing: 2500,
                          autres: 5850,
                        },
                        {
                          mois: "Oct 2024",
                          matières: 28900,
                          salaires: 31500,
                          loyer: 8500,
                          énergie: 3200,
                          marketing: 2400,
                          autres: 5750,
                        },
                        {
                          mois: "Nov 2024",
                          matières: 28200,
                          salaires: 31200,
                          loyer: 8500,
                          énergie: 3100,
                          marketing: 2300,
                          autres: 5700,
                        },
                        {
                          mois: "Déc 2024",
                          matières: 29500,
                          salaires: 31800,
                          loyer: 8500,
                          énergie: 3300,
                          marketing: 2500,
                          autres: 5800,
                        },
                        {
                          mois: "Jan 2025",
                          matières: 27800,
                          salaires: 31000,
                          loyer: 8500,
                          énergie: 3000,
                          marketing: 2200,
                          autres: 5650,
                        },
                        {
                          mois: "Fév 2025",
                          matières: 28100,
                          salaires: 31200,
                          loyer: 8500,
                          énergie: 3100,
                          marketing: 2300,
                          autres: 5700,
                        },
                        {
                          mois: "Mar 2025",
                          matières: 28500,
                          salaires: 31500,
                          loyer: 8500,
                          énergie: 3200,
                          marketing: 2500,
                          autres: 5800,
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => {
                          const labels = {
                            matières: "Matières premières",
                            salaires: "Salaires",
                            loyer: "Loyer",
                            énergie: "Énergie",
                            marketing: "Marketing",
                            autres: "Autres dépenses",
                          }
                          return [`${value.toLocaleString("fr-FR")} €`, labels[name]]
                        }}
                      />
                      <Legend
                        formatter={(value) => {
                          const labels = {
                            matières: "Matières premières",
                            salaires: "Salaires",
                            loyer: "Loyer",
                            énergie: "Énergie",
                            marketing: "Marketing",
                            autres: "Autres dépenses",
                          }
                          return labels[value]
                        }}
                      />
                      <Line type="monotone" dataKey="matières" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="salaires" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="loyer" stroke="#ffc658" />
                      <Line type="monotone" dataKey="énergie" stroke="#ff8042" />
                      <Line type="monotone" dataKey="marketing" stroke="#0088fe" />
                      <Line type="monotone" dataKey="autres" stroke="#00C49F" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Tendance générale:</span>
                    <span className="text-amber-600">Légère augmentation (+2.8% sur 12 mois)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Poste en plus forte hausse:</span>
                    <span className="text-red-600">Matières premières (+6.3%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Poste stable:</span>
                    <span>Loyer (0%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimisation des coûts</CardTitle>
                <CardDescription>Recommandations pour réduire les dépenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Réduction du gaspillage alimentaire</h3>
                      <Badge className="bg-green-600">Priorité haute</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Potentiel d'économie estimé: 1,200 € / mois</p>
                    <div className="mt-2">
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Actions recommandées:</p>
                      <ul className="list-disc pl-5 space-y-1 mt-1">
                        <li>Mettre en place un système de suivi des déchets alimentaires</li>
                        <li>Optimiser les portions en fonction des retours clients</li>
                        <li>Former le personnel à la gestion des stocks</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Optimisation des horaires du personnel</h3>
                      <Badge className="bg-green-600">Priorité haute</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Potentiel d'économie estimé: 850 € / mois</p>
                    <div className="mt-2">
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Actions recommandées:</p>
                      <ul className="list-disc pl-5 space-y-1 mt-1">
                        <li>Ajuster les plannings en fonction de l'analyse des ventes par période</li>
                        <li>Réduire les heures creuses avec un système de rotation</li>
                        <li>Mettre en place un système de primes basé sur l'efficacité</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Renégociation des contrats fournisseurs</h3>
                      <Badge className="bg-amber-600">Priorité moyenne</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Potentiel d'économie estimé: 650 € / mois</p>
                    <div className="mt-2">
                      <Progress value={40} className="h-2" />
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Actions recommandées:</p>
                      <ul className="list-disc pl-5 space-y-1 mt-1">
                        <li>Analyser les prix des 5 principaux fournisseurs vs concurrence</li>
                        <li>Négocier des remises sur volume avec engagement</li>
                        <li>Explorer les options de groupement d'achat avec d'autres restaurants</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Optimisation énergétique</h3>
                      <Badge className="bg-amber-600">Priorité moyenne</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Potentiel d'économie estimé: 350 € / mois</p>
                    <div className="mt-2">
                      <Progress value={30} className="h-2" />
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Actions recommandées:</p>
                      <ul className="list-disc pl-5 space-y-1 mt-1">
                        <li>Installer des capteurs de présence pour l'éclairage</li>
                        <li>Programmer les thermostats selon l'occupation</li>
                        <li>Remplacer les équipements énergivores</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Obligations fiscales</CardTitle>
                  <CardDescription>Suivi des déclarations et paiements fiscaux</CardDescription>
                </div>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Nouvelle déclaration
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Déclaration</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Date limite</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>
                          {new Date(report.dueDate).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>{report.amount.toLocaleString("fr-FR")} €</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              report.status === "Payé"
                                ? "bg-green-100 text-green-800"
                                : report.status === "Soumis"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {report.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendrier fiscal</CardTitle>
                <CardDescription>Échéances fiscales à venir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">Déclaration TVA - Q1 2025</h3>
                      <p className="text-sm text-muted-foreground">Échéance: 20 avril 2025</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Dans 6 jours
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">Acompte impôt sur les sociétés</h3>
                      <p className="text-sm text-muted-foreground">Échéance: 15 juin 2025</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      Dans 62 jours
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">Cotisation foncière des entreprises</h3>
                      <p className="text-sm text-muted-foreground">Échéance: 15 décembre 2025</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      Dans 245 jours
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
