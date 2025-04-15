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
} from "recharts"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Données mockées pour les analyses de promotions
const promotionPerformance = [
  { name: "Happy Hour -20%", revenue: 4250, orders: 145, averageOrder: 29.3 },
  { name: "Menu Déjeuner à 15€", revenue: 1170, orders: 78, averageOrder: 15 },
  { name: "1 Dessert Offert", revenue: 0, orders: 0, averageOrder: 0 },
  { name: "2 pour 1 sur les pizzas", revenue: 5460, orders: 210, averageOrder: 26 },
  { name: "Points fidélité x2", revenue: 3325, orders: 95, averageOrder: 35 },
]

const dailyPromotionUsage = [
  { date: "2025-04-01", "Happy Hour -20%": 5, "Menu Déjeuner à 15€": 3, "Points fidélité x2": 4 },
  { date: "2025-04-02", "Happy Hour -20%": 7, "Menu Déjeuner à 15€": 5, "Points fidélité x2": 3 },
  { date: "2025-04-03", "Happy Hour -20%": 4, "Menu Déjeuner à 15€": 6, "Points fidélité x2": 5 },
  { date: "2025-04-04", "Happy Hour -20%": 8, "Menu Déjeuner à 15€": 4, "Points fidélité x2": 6 },
  { date: "2025-04-05", "Happy Hour -20%": 10, "Menu Déjeuner à 15€": 3, "Points fidélité x2": 8 },
  { date: "2025-04-06", "Happy Hour -20%": 12, "Menu Déjeuner à 15€": 2, "Points fidélité x2": 9 },
  { date: "2025-04-07", "Happy Hour -20%": 9, "Menu Déjeuner à 15€": 4, "Points fidélité x2": 7 },
]

const promotionDistribution = [
  { name: "Happy Hour -20%", value: 145 },
  { name: "Menu Déjeuner à 15€", value: 78 },
  { name: "Points fidélité x2", value: 95 },
  { name: "2 pour 1 sur les pizzas", value: 210 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function PromotionsAnalyticsPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analyse des Promotions</h1>
        <DateRangePicker />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des promotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 actives, 1 planifiée, 1 expirée</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisations totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">528</div>
            <p className="text-xs text-muted-foreground">+12.5% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires généré</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 205 €</div>
            <p className="text-xs text-muted-foreground">+8.3% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.7%</div>
            <p className="text-xs text-muted-foreground">+2.1% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="mt-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Utilisation</TabsTrigger>
          <TabsTrigger value="comparison">Comparaison</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance des promotions</CardTitle>
              <CardDescription>Chiffre d'affaires et nombre de commandes par promotion</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Chiffre d'affaires",
                    color: "hsl(var(--chart-1))",
                  },
                  orders: {
                    label: "Commandes",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={promotionPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="var(--color-revenue)" />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-orders)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Chiffre d'affaires (€)" fill="var(--color-revenue)" />
                    <Bar yAxisId="right" dataKey="orders" name="Commandes" fill="var(--color-orders)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribution des utilisations</CardTitle>
                <CardDescription>Répartition des utilisations par promotion</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={promotionDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {promotionDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} utilisations`, "Utilisations"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Panier moyen par promotion</CardTitle>
                <CardDescription>Valeur moyenne des commandes avec promotion</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    averageOrder: {
                      label: "Panier moyen",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={promotionPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="averageOrder" name="Panier moyen (€)" fill="var(--color-averageOrder)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Utilisation quotidienne des promotions</CardTitle>
                  <CardDescription>Nombre d'utilisations par jour et par promotion</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="promotion-filter">Filtrer par promotion</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="promotion-filter" className="w-[180px]">
                        <SelectValue placeholder="Toutes les promotions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les promotions</SelectItem>
                        <SelectItem value="happy-hour">Happy Hour -20%</SelectItem>
                        <SelectItem value="menu-dejeuner">Menu Déjeuner à 15€</SelectItem>
                        <SelectItem value="points-fidelite">Points fidélité x2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  "Happy Hour -20%": {
                    label: "Happy Hour -20%",
                    color: "hsl(var(--chart-1))",
                  },
                  "Menu Déjeuner à 15€": {
                    label: "Menu Déjeuner à 15€",
                    color: "hsl(var(--chart-2))",
                  },
                  "Points fidélité x2": {
                    label: "Points fidélité x2",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyPromotionUsage}>
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
                      dataKey="Happy Hour -20%"
                      stroke="var(--color-Happy Hour -20%)"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Menu Déjeuner à 15€"
                      stroke="var(--color-Menu Déjeuner à 15€)"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Points fidélité x2"
                      stroke="var(--color-Points fidélité x2)"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparaison des promotions</CardTitle>
              <CardDescription>Analyse comparative des performances des différentes promotions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Cette section sera disponible dans une prochaine mise à jour. Elle permettra de comparer directement
                l'efficacité des différentes promotions selon plusieurs métriques clés.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Métriques disponibles prochainement :</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Taux de conversion par promotion</li>
                    <li>ROI (Retour sur investissement)</li>
                    <li>Impact sur la fréquentation</li>
                    <li>Fidélisation client</li>
                    <li>Analyse démographique</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Fonctionnalités à venir :</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Recommandations automatiques</li>
                    <li>Prévisions basées sur l'IA</li>
                    <li>Tests A/B pour les promotions</li>
                    <li>Segmentation client avancée</li>
                    <li>Rapports personnalisables</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
