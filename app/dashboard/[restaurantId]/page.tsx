import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { mockFinancialData, mockOrders, mockTables } from "@/lib/mock-data"

export default function DashboardPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params

  // Données pour le tableau de bord
  const dailyRevenue = mockFinancialData.dailyRevenue
  const monthlySummary = mockFinancialData.monthlySummary

  // Statistiques
  const totalTables = mockTables.filter((t) => t.restaurantId === restaurantId).length
  const availableTables = mockTables.filter((t) => t.restaurantId === restaurantId && t.status === "available").length
  const activeOrders = mockOrders.filter(
    (o) => o.restaurantId === restaurantId && ["pending", "preparing", "ready"].includes(o.status),
  ).length

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires du jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyRevenue[dailyRevenue.length - 1].revenue.toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">+2.5% par rapport à hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tables disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {availableTables} / {totalTables}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((availableTables / totalTables) * 100)}% de disponibilité
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOrders}</div>
            <p className="text-xs text-muted-foreground">
              {activeOrders > 0 ? "En cours de traitement" : "Aucune commande en attente"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlySummary.averageOrderValue.toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">+4.1% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chiffre d'affaires (7 derniers jours)</CardTitle>
              <CardDescription>Évolution du chiffre d'affaires sur la semaine</CardDescription>
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
                  <LineChart data={dailyRevenue}>
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top produits</CardTitle>
                <CardDescription>Les produits les plus vendus ce mois-ci</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlySummary.topSellingItems.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} vendus · {item.revenue.toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Résumé mensuel</CardTitle>
                <CardDescription>Performance financière du mois en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Chiffre d'affaires</p>
                      <p className="text-sm text-muted-foreground">{monthlySummary.revenue.toFixed(2)} €</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Dépenses</p>
                      <p className="text-sm text-muted-foreground">{monthlySummary.expenses.toFixed(2)} €</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Bénéfice</p>
                      <p className="text-sm text-muted-foreground">{monthlySummary.profit.toFixed(2)} €</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Répartition des revenus</CardTitle>
                <CardDescription>Répartition par catégorie de produits</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <ChartContainer
                  config={{
                    plats: {
                      label: "Plats",
                      color: "hsl(var(--chart-1))",
                    },
                    entrees: {
                      label: "Entrées",
                      color: "hsl(var(--chart-2))",
                    },
                    desserts: {
                      label: "Desserts",
                      color: "hsl(var(--chart-3))",
                    },
                    boissons: {
                      label: "Boissons",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Catégories",
                          plats: 12500,
                          entrees: 8200,
                          desserts: 5300,
                          boissons: 9800,
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="plats" name="Plats" fill="var(--color-plats)" />
                      <Bar dataKey="entrees" name="Entrées" fill="var(--color-entrees)" />
                      <Bar dataKey="desserts" name="Desserts" fill="var(--color-desserts)" />
                      <Bar dataKey="boissons" name="Boissons" fill="var(--color-boissons)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyses avancées</CardTitle>
              <CardDescription>Données analytiques détaillées pour optimiser votre activité</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cette section sera disponible dans une prochaine mise à jour.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
