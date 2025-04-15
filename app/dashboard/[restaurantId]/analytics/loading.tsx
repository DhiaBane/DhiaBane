import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading({ params }: { params?: { restaurantId?: string } }) {
  // Utiliser une valeur par défaut si params ou restaurantId est undefined
  const restaurantId = params?.restaurantId || "1"

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[200px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" disabled>
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="sales" disabled>
              Ventes
            </TabsTrigger>
            <TabsTrigger value="customers" disabled>
              Clients
            </TabsTrigger>
            <TabsTrigger value="predictions" disabled>
              Prédictions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </CardHeader>
                <CardContent className="h-80">
                  <Skeleton className="h-full w-full" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-[180px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </CardHeader>
                <CardContent className="h-80">
                  <Skeleton className="h-full w-full" />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-[150px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </CardHeader>
                <CardContent className="h-80">
                  <Skeleton className="h-full w-full" />
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader>
                  <Skeleton className="h-6 w-[220px]" />
                  <Skeleton className="h-4 w-[180px]" />
                </CardHeader>
                <CardContent className="h-80">
                  <Skeleton className="h-full w-full" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
