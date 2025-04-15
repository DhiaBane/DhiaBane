import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function StaffLoading() {
  // Nous ne pouvons pas accéder aux paramètres de route dans un composant loading
  // Utilisons une valeur par défaut ou récupérons l'ID d'une autre manière
  const restaurantId = "1" // Valeur par défaut ou placeholder

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Personnel</h1>
          <Skeleton className="h-5 w-[250px] mt-1" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-[120px]" />
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
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-[150px] mb-1" />
                      <Skeleton className="h-4 w-[100px] mb-1" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-[100px]" />
                    <Skeleton className="h-9 w-[40px]" />
                    <Skeleton className="h-9 w-[40px]" />
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
