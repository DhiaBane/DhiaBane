import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ComposedChart,
  Treemap,
  Sankey,
  Rectangle,
  Label,
} from "recharts"
import { mockFinancialData } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Download, Filter, Share2 } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Données mockées pour les analyses
const salesByHour = [
  { hour: "10:00", sales: 120 },
  { hour: "11:00", sales: 180 },
  { hour: "12:00", sales: 450 },
  { hour: "13:00", sales: 520 },
  { hour: "14:00", sales: 380 },
  { hour: "15:00", sales: 240 },
  { hour: "16:00", sales: 180 },
  { hour: "17:00", sales: 220 },
  { hour: "18:00", sales: 340 },
  { hour: "19:00", sales: 580 },
  { hour: "20:00", sales: 620 },
  { hour: "21:00", sales: 450 },
  { hour: "22:00", sales: 280 },
]

const salesByCategory = [
  { name: "Entrées", value: 8200 },
  { name: "Plats", value: 12500 },
  { name: "Desserts", value: 5300 },
  { name: "Boissons", value: 9800 },
  { name: "Vins", value: 7600 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const customerRetention = [
  { month: "Jan", nouveaux: 120, fidèles: 0 },
  { month: "Fév", nouveaux: 140, fidèles: 80 },
  { month: "Mar", nouveaux: 130, fidèles: 110 },
  { month: "Avr", nouveaux: 170, fidèles: 140 },
  { month: "Mai", nouveaux: 190, fidèles: 160 },
  { month: "Juin", nouveaux: 210, fidèles: 180 },
  { month: "Juil", nouveaux: 250, fidèles: 220 },
  { month: "Août", nouveaux: 280, fidèles: 250 },
  { month: "Sep", nouveaux: 220, fidèles: 270 },
  { month: "Oct", nouveaux: 190, fidèles: 290 },
  { month: "Nov", nouveaux: 180, fidèles: 300 },
  { month: "Déc", nouveaux: 220, fidèles: 320 },
]

const topSellingItems = [
  { name: "Steak Frites", sales: 320, revenue: 7840 },
  { name: "Pasta Carbonara", sales: 280, revenue: 5292 },
  { name: "Crème Brûlée", sales: 210, revenue: 1785 },
  { name: "Salade Niçoise", sales: 190, revenue: 3211 },
  { name: "Tiramisu", sales: 180, revenue: 1422 },
  { name: "Vin Rouge (Bouteille)", sales: 150, revenue: 4500 },
  { name: "Burger Gourmet", sales: 140, revenue: 2520 },
  { name: "Cocktail Maison", sales: 130, revenue: 1690 },
  { name: "Plateau de Fromages", sales: 120, revenue: 1800 },
  { name: "Café Gourmand", sales: 110, revenue: 880 },
]

const staffPerformance = [
  { name: "Jean Dupont", orders: 450, rating: 4.8, tips: 1200 },
  { name: "Marie Martin", orders: 380, rating: 4.9, tips: 1350 },
  { name: "Pierre Lefebvre", orders: 420, rating: 4.7, tips: 1150 },
  { name: "Sophie Bernard", orders: 390, rating: 4.6, tips: 1050 },
  { name: "Thomas Petit", orders: 410, rating: 4.8, tips: 1250 },
]

const predictedRevenue = [
  { date: "2025-04-15", actual: null, predicted: 1650 },
  { date: "2025-04-16", actual: null, predicted: 1720 },
  { date: "2025-04-17", actual: null, predicted: 1850 },
  { date: "2025-04-18", actual: null, predicted: 2400 },
  { date: "2025-04-19", actual: null, predicted: 2850 },
  { date: "2025-04-20", actual: null, predicted: 2100 },
  { date: "2025-04-21", actual: null, predicted: 1700 },
]

const historicalRevenue = [
  ...mockFinancialData.dailyRevenue,
  ...predictedRevenue.map((item) => ({ date: item.date, revenue: item.actual, predicted: item.predicted })),
]

export default function AnalyticsPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Analyses avancées</h1>
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

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="sales">Ventes</TabsTrigger>
            <TabsTrigger value="customers">Clients</TabsTrigger>
            <TabsTrigger value="predictions">Prédictions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Chiffre d'affaires (30 derniers jours)</CardTitle>
                  <CardDescription>Évolution du chiffre d'affaires quotidien</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Chiffre d'affaires",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockFinancialData.dailyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
                          }}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          name="Chiffre d'affaires (€)"
                          stroke="var(--color-revenue)"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition des ventes</CardTitle>
                  <CardDescription>Par catégorie de produits</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {salesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} €`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes par heure</CardTitle>
                  <CardDescription>Répartition horaire du chiffre d'affaires</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      sales: {
                        label: "Ventes",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesByHour}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="sales" name="Ventes (€)" fill="var(--color-sales)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Acquisition et rétention clients</CardTitle>
                  <CardDescription>Nouveaux clients vs clients fidèles</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      nouveaux: {
                        label: "Nouveaux clients",
                        color: "hsl(var(--chart-3))",
                      },
                      fidèles: {
                        label: "Clients fidèles",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={customerRetention}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="nouveaux"
                          stackId="1"
                          stroke="var(--color-nouveaux)"
                          fill="var(--color-nouveaux)"
                        />
                        <Area
                          type="monotone"
                          dataKey="fidèles"
                          stackId="1"
                          stroke="var(--color-fidèles)"
                          fill="var(--color-fidèles)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Top produits vendus</CardTitle>
                    <CardDescription>Classement par nombre de ventes et chiffre d'affaires</CardDescription>
                  </div>
                  <Select defaultValue="sales">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Nombre de ventes</SelectItem>
                      <SelectItem value="revenue">Chiffre d'affaires</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {topSellingItems.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <div className="ml-4 space-y-1 flex-1">
                          <p className="text-sm font-medium leading-none">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.sales} vendus · {item.revenue.toFixed(2)} €
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          {(
                            (item.revenue / topSellingItems.reduce((acc, curr) => acc + curr.revenue, 0)) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance du personnel</CardTitle>
                  <CardDescription>Évaluation des serveurs par commandes et pourboires</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      orders: {
                        label: "Commandes",
                        color: "hsl(var(--chart-1))",
                      },
                      tips: {
                        label: "Pourboires",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={staffPerformance} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="orders" name="Commandes" fill="var(--color-orders)" />
                        <Bar dataKey="tips" name="Pourboires (€)" fill="var(--color-tips)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analyse des ventes croisées</CardTitle>
                  <CardDescription>Produits fréquemment achetés ensemble</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      force: {
                        label: "Force de l'association",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <Treemap
                        data={{
                          nodes: [
                            {
                              name: "Associations",
                              children: [
                                { name: "Plat principal", size: 3500, value: 3500 },
                                { name: "Poisson + Vin blanc", size: 2800, value: 2800 },
                                { name: "Burger + Frites", size: 2300, value: 2300 },
                                { name: "Pâtes + Pain", size: 1800, value: 1800 },
                              ],
                            },
                            {
                              name: "Entrée",
                              children: [
                                { name: "Salade + Vin", size: 1600, value: 1600 },
                                { name: "Soupe + Pain", size: 1400, value: 1400 },
                              ],
                            },
                            {
                              name: "Dessert",
                              children: [
                                { name: "Café + Dessert", size: 2700, value: 2700 },
                                { name: "Glace + Liqueur", size: 1500, value: 1500 },
                              ],
                            },
                            {
                              name: "Boissons",
                              children: [
                                { name: "Apéritif + Entrée", size: 2100, value: 2100 },
                                { name: "Digestif + Café", size: 1900, value: 1900 },
                              ],
                            },
                          ],
                        }}
                        dataKey="value"
                        stroke="#fff"
                        fill="var(--color-force)"
                      >
                        <Tooltip
                          formatter={(value, name) => [`${value} commandes`, name]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "none",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                          }}
                        />
                      </Treemap>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Segmentation clients</CardTitle>
                <CardDescription>Répartition des clients par fréquence et valeur</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {" "}
                <ChartContainer
                  config={{
                    nouveaux: {
                      label: "Nouveaux clients",
                      color: "hsl(var(--chart-1))",
                    },
                    occasionnels: {
                      label: "Clients occasionnels",
                      color: "hsl(var(--chart-2))",
                    },
                    réguliers: {
                      label: "Clients réguliers",
                      color: "hsl(var(--chart-3))",
                    },
                    fidèles: {
                      label: "Clients fidèles",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      <CartesianGrid />
                      <XAxis
                        type="number"
                        dataKey="valeur"
                        name="Valeur moyenne (€)"
                        domain={[0, 200]}
                        label={{ value: "Valeur moyenne (€)", position: "bottom", offset: 0 }}
                      />
                      <YAxis
                        type="number"
                        dataKey="fréquence"
                        name="Fréquence (visites/mois)"
                        domain={[0, 10]}
                        label={{ value: "Fréquence (visites/mois)", angle: -90, position: "left" }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Scatter
                        name="Nouveaux clients"
                        data={[
                          { valeur: 35, fréquence: 1, count: 120 },
                          { valeur: 42, fréquence: 0.8, count: 85 },
                          { valeur: 28, fréquence: 0.5, count: 65 },
                        ]}
                        fill="var(--color-nouveaux)"
                      />
                      <Scatter
                        name="Clients occasionnels"
                        data={[
                          { valeur: 55, fréquence: 1.2, count: 95 },
                          { valeur: 67, fréquence: 1.5, count: 110 },
                          { valeur: 48, fréquence: 1.8, count: 75 },
                        ]}
                        fill="var(--color-occasionnels)"
                      />
                      <Scatter
                        name="Clients réguliers"
                        data={[
                          { valeur: 85, fréquence: 3.2, count: 65 },
                          { valeur: 92, fréquence: 2.8, count: 85 },
                          { valeur: 78, fréquence: 3.5, count: 55 },
                        ]}
                        fill="var(--color-réguliers)"
                      />
                      <Scatter
                        name="Clients fidèles"
                        data={[
                          { valeur: 125, fréquence: 5.5, count: 45 },
                          { valeur: 145, fréquence: 6.2, count: 35 },
                          { valeur: 165, fréquence: 7.8, count: 25 },
                        ]}
                        fill="var(--color-fidèles)"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taux de satisfaction</CardTitle>
                <CardDescription>Évaluation de l'expérience client</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">4.7</span>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="stroke-muted-foreground stroke-[8] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        pathLength="100"
                      />
                      <circle
                        className="stroke-primary stroke-[8] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        pathLength="100"
                        strokeDasharray="100"
                        strokeDashoffset="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Basé sur 1,245 avis clients</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse du programme de fidélité</CardTitle>
                  <CardDescription>Performance et engagement des clients fidèles</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      points: {
                        label: "Points accumulés",
                        color: "hsl(var(--chart-1))",
                      },
                      récompenses: {
                        label: "Récompenses utilisées",
                        color: "hsl(var(--chart-2))",
                      },
                      taux: {
                        label: "Taux d'utilisation",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={[
                          { mois: "Jan", points: 12500, récompenses: 3800, taux: 30.4 },
                          { mois: "Fév", points: 14200, récompenses: 4500, taux: 31.7 },
                          { mois: "Mar", points: 15800, récompenses: 5200, taux: 32.9 },
                          { mois: "Avr", points: 16900, récompenses: 5800, taux: 34.3 },
                          { mois: "Mai", points: 18500, récompenses: 6700, taux: 36.2 },
                          { mois: "Juin", points: 21000, récompenses: 7900, taux: 37.6 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mois" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="points" name="Points accumulés" fill="var(--color-points)" />
                        <Bar
                          yAxisId="left"
                          dataKey="récompenses"
                          name="Récompenses utilisées"
                          fill="var(--color-récompenses)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="taux"
                          name="Taux d'utilisation (%)"
                          stroke="var(--color-taux)"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parcours client</CardTitle>
                  <CardDescription>Analyse des interactions et points de contact</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <Sankey
                        data={{
                          nodes: [
                            { name: "Réservation" },
                            { name: "Arrivée" },
                            { name: "Commande" },
                            { name: "Plat principal" },
                            { name: "Dessert" },
                            { name: "Paiement" },
                            { name: "Départ" },
                            { name: "Avis" },
                            { name: "Retour" },
                          ],
                          links: [
                            { source: 0, target: 1, value: 950 },
                            { source: 1, target: 2, value: 890 },
                            { source: 2, target: 3, value: 880 },
                            { source: 3, target: 4, value: 700 },
                            { source: 3, target: 5, value: 180 },
                            { source: 4, target: 5, value: 700 },
                            { source: 5, target: 6, value: 880 },
                            { source: 6, target: 7, value: 350 },
                            { source: 7, target: 8, value: 280 },
                            { source: 6, target: 8, value: 220 },
                          ],
                        }}
                        nodeWidth={20}
                        nodePadding={10}
                        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                      >
                        <defs>
                          <linearGradient id="colorFlow" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
                          </linearGradient>
                        </defs>
                        <Tooltip />
                        <Rectangle fill="url(#colorFlow)" />
                        <Label position="insideTopLeft" />
                      </Sankey>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prévisions de chiffre d'affaires</CardTitle>
                <CardDescription>Projection sur les 7 prochains jours basée sur l'IA</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Chiffre d'affaires réel",
                      color: "hsl(var(--chart-1))",
                    },
                    predicted: {
                      label: "Chiffre d'affaires prévu",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
                        }}
                      />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        name="Chiffre d'affaires réel (€)"
                        stroke="var(--color-revenue)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        name="Chiffre d'affaires prévu (€)"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Prévision des besoins en personnel</CardTitle>
                  <CardDescription>Recommandations basées sur l'affluence prévue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Vendredi 18 avril</p>
                        <p className="text-xs text-muted-foreground">Affluence prévue: Très élevée</p>
                      </div>
                      <div className="text-sm font-medium">6 serveurs</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Samedi 19 avril</p>
                        <p className="text-xs text-muted-foreground">Affluence prévue: Très élevée</p>
                      </div>
                      <div className="text-sm font-medium">7 serveurs</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Dimanche 20 avril</p>
                        <p className="text-xs text-muted-foreground">Affluence prévue: Élevée</p>
                      </div>
                      <div className="text-sm font-medium">5 serveurs</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Lundi 21 avril</p>
                        <p className="text-xs text-muted-foreground">Affluence prévue: Modérée</p>
                      </div>
                      <div className="text-sm font-medium">3 serveurs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prévision des stocks</CardTitle>
                  <CardDescription>Recommandations de réapprovisionnement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Entrecôte</p>
                        <p className="text-xs text-muted-foreground">Stock actuel: 8 kg</p>
                      </div>
                      <div className="text-sm font-medium text-destructive">Commander 15 kg</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Vin Rouge (Bordeaux)</p>
                        <p className="text-xs text-muted-foreground">Stock actuel: 6 bouteilles</p>
                      </div>
                      <div className="text-sm font-medium text-destructive">Commander 12 bouteilles</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Pommes de terre</p>
                        <p className="text-xs text-muted-foreground">Stock actuel: 18 kg</p>
                      </div>
                      <div className="text-sm font-medium text-amber-500">Commander 10 kg</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Crème fraîche</p>
                        <p className="text-xs text-muted-foreground">Stock actuel: 4 L</p>
                      </div>
                      <div className="text-sm font-medium text-amber-500">Commander 5 L</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommandations marketing</CardTitle>
                  <CardDescription>Suggestions basées sur l'analyse des données</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Promotion "Happy Hour"</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Proposer une réduction de 20% sur les cocktails entre 17h et 19h pour augmenter la fréquentation
                        en début de soirée.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Menu dégustation</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Créer un menu dégustation incluant les 3 plats les plus populaires pour augmenter le panier
                        moyen.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Campagne email</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Envoyer une offre spéciale aux clients inactifs depuis plus de 2 mois pour les faire revenir.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
