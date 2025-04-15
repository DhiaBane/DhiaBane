import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CRMLoading() {
  return (
    <DashboardShell title="CRM Avancé" subtitle="Gérez vos relations clients et vos campagnes marketing">
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="customers">Clients</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-5 w-[150px] mb-2" />
                  <Skeleton className="h-4 w-[250px]" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-[100px]" />
                  <Skeleton className="h-9 w-[100px]" />
                  <Skeleton className="h-9 w-[120px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="grid gap-1.5 flex-1">
                  <Skeleton className="h-4 w-[80px] mb-1" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid gap-1.5">
                  <Skeleton className="h-4 w-[80px] mb-1" />
                  <Skeleton className="h-10 w-[180px]" />
                </div>
                <div className="grid gap-1.5">
                  <Skeleton className="h-4 w-[80px] mb-1" />
                  <Skeleton className="h-10 w-[180px]" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton className="h-20 w-full" key={i} />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <Skeleton className="h-4 w-[200px]" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-9 w-[100px]" />
                <Skeleton className="h-9 w-[100px]" />
              </div>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-[150px] mb-2" />
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div className="flex items-start gap-4" key={i}>
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex gap-2">
                          <Skeleton className="h-5 w-[80px] rounded-full" />
                          <Skeleton className="h-5 w-[80px] rounded-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-[150px] mb-2" />
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div className="flex items-start gap-4" key={i}>
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
                <Skeleton className="h-9 w-full mt-4" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
