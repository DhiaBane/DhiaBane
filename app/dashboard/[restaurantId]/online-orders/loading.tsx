import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function OnlineOrdersLoading({ params }: { params?: { restaurantId: string } }) {
  // Utiliser une valeur par défaut si params est undefined ou si restaurantId n'existe pas
  const restaurantId = params?.restaurantId || "default"

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commandes en ligne</h1>
          <Skeleton className="h-5 w-[250px] mt-1" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[140px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-[100px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[50px] mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </div>

        <Skeleton className="h-10 w-[300px]" />

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <div className="flex">
                  <Skeleton className="h-[150px] w-2" />
                  <div className="p-4 flex-1">
                    <div className="flex justify-between mb-4">
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-[100px]" />
                        <Skeleton className="h-6 w-[80px]" />
                        <Skeleton className="h-6 w-[80px]" />
                      </div>
                      <Skeleton className="h-5 w-[120px]" />
                    </div>
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div>
                            <Skeleton className="h-5 w-[120px]" />
                            <Skeleton className="h-4 w-[100px] mt-1" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-9 w-[80px]" />
                        <Skeleton className="h-9 w-[80px]" />
                        <Skeleton className="h-9 w-[40px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
