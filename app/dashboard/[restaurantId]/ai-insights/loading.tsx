import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function AIInsightsLoading({ params }: { params?: { restaurantId: string } }) {
  // Utiliser une valeur par défaut si params est undefined ou si restaurantId n'existe pas
  const restaurantId = params?.restaurantId || "1"

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[350px]" />
          </div>
          <Skeleton className="h-10 w-[150px]" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />

          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-[250px]" />
              <Skeleton className="h-4 w-[350px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[400px] w-full" />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="space-y-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="space-y-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
