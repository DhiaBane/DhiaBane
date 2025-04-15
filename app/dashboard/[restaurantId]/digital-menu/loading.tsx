import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function DigitalMenuLoading({ params }: { params?: { restaurantId: string } }) {
  const restaurantId = params?.restaurantId || "1" // Valeur par défaut si params est undefined

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[300px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="grid gap-6 mt-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-[200px]" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
              </div>
            </div>
            <Skeleton className="h-4 w-[300px] mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-[150px]" />
                  <Skeleton className="h-9 w-[150px]" />
                </div>

                <div className="space-y-4">
                  <div className="border rounded-md">
                    <div className="flex items-center justify-between p-4 border-b">
                      <div>
                        <Skeleton className="h-5 w-[150px]" />
                        <Skeleton className="h-4 w-[200px] mt-2" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded-md">
                            <div className="flex items-center gap-3">
                              <Skeleton className="h-6 w-6" />
                              <div>
                                <Skeleton className="h-5 w-[150px]" />
                                <Skeleton className="h-4 w-[200px] mt-1" />
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <Skeleton className="h-5 w-[60px]" />
                              <div className="flex gap-1">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Skeleton className="h-9 w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
