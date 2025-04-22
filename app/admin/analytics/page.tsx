import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardCard } from "@/components/admin/dashboard-card"
import { ShoppingBag, Users, CreditCard, Clock, TrendingUp, BarChart2, PieChart } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytiques</h1>
        <p className="text-muted-foreground">Statistiques et analyses de performance de la plateforme.</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Commandes Totales"
              value="12,543"
              description="Mois en cours"
              icon={ShoppingBag}
              trend="up"
              trendValue="12%"
            />
            <DashboardCard
              title="Revenus"
              value="€124,500"
              description="Mois en cours"
              icon={CreditCard}
              trend="up"
              trendValue="8.2%"
            />
            <DashboardCard
              title="Utilisateurs Actifs"
              value="1,789"
              description="Derniers 30 jours"
              icon={Users}
              trend="up"
              trendValue="5.4%"
            />
            <DashboardCard
              title="Temps Moyen"
              value="24 min"
              description="Durée de commande"
              icon={Clock}
              trend="down"
              trendValue="3%"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tendance des Ventes</CardTitle>
                <CardDescription>Comparaison des ventes sur les 30 derniers jours</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full w-full rounded-md border border-dashed border-gray-200 flex items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <BarChart2 className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Graphique des ventes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Répartition des Utilisateurs</CardTitle>
                <CardDescription>Par type d'application</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full w-full rounded-md border border-dashed border-gray-200 flex items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <PieChart className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Graphique de répartition</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques des Commandes</CardTitle>
              <CardDescription>Analyse détaillée des commandes sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="h-full w-full rounded-md border border-dashed border-gray-200 flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <ShoppingBag className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground">Graphique des commandes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques des Utilisateurs</CardTitle>
              <CardDescription>Analyse détaillée des utilisateurs sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="h-full w-full rounded-md border border-dashed border-gray-200 flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground">Graphique des utilisateurs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques des Revenus</CardTitle>
              <CardDescription>Analyse détaillée des revenus sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="h-full w-full rounded-md border border-dashed border-gray-200 flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <TrendingUp className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground">Graphique des revenus</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
