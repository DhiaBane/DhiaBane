import { Suspense } from "react"
import { ShoppingBag, Users, CreditCard, AlertTriangle, TrendingUp, Calendar, ArrowUpRight } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase"
import { DashboardCard } from "@/components/admin/dashboard-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

async function DashboardContent() {
  const supabase = await createServerSupabaseClient()

  // Fetch dashboard data
  const { data: usersCount } = await supabase.from("users").select("id", { count: "exact", head: true })

  // In a real app, you would fetch this data from your database
  // These are placeholder values
  const ordersCount = 1248
  const revenue = "€38,450"
  const errorsCount = 12

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Commandes Totales"
          value={ordersCount}
          description="Dernières 24 heures"
          icon={ShoppingBag}
          trend="up"
          trendValue="12%"
        />
        <DashboardCard
          title="Revenus"
          value={revenue}
          description="Mois en cours"
          icon={CreditCard}
          trend="up"
          trendValue="8.2%"
        />
        <DashboardCard
          title="Utilisateurs"
          value={usersCount?.count || 0}
          description="Utilisateurs actifs"
          icon={Users}
          trend="up"
          trendValue="5.4%"
        />
        <DashboardCard
          title="Erreurs Système"
          value={errorsCount}
          description="Dernières 24 heures"
          icon={AlertTriangle}
          trend="down"
          trendValue="3%"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aperçu des Ventes</CardTitle>
            <CardDescription>Comparaison des ventes sur les 30 derniers jours</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="h-full w-full rounded-md border border-dashed border-gray-200 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Graphique des ventes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>Dernières transactions et événements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    {i % 2 === 0 ? (
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Calendar className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{i % 2 === 0 ? "Nouvelle commande" : "Nouvel utilisateur"}</p>
                    <p className="text-xs text-gray-500">Il y a {i * 5} minutes</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Tableau de Bord</h1>
      <p className="text-muted-foreground">Bienvenue sur le tableau de bord d'administration de RestoPilote.</p>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
