import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccountingLoading() {
  return (
    <DashboardShell title="Comptabilité" subtitle="Gérez vos finances, suivez vos revenus et dépenses">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-[120px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-[100px] mb-1" />
                  <Skeleton className="h-4 w-[140px]" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <Skeleton className="h-5 w-[180px] mb-2" />
                <Skeleton className="h-4 w-[250px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <Skeleton className="h-5 w-[180px] mb-2" />
                <Skeleton className="h-4 w-[250px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div className="grid grid-cols-3 items-center gap-4" key={i}>
                      <Skeleton className="h-4 w-[80px]" />
                      <div className="col-span-1 flex items-center gap-2">
                        <Skeleton className="h-2 w-full" />
                      </div>
                      <Skeleton className="h-4 w-[60px] ml-auto" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center">
              <div>
                <Skeleton className="h-5 w-[150px] mb-2" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Skeleton className="h-9 w-[100px] ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton className="h-12 w-full" key={i} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
