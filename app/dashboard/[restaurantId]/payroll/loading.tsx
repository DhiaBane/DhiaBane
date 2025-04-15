import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PayrollLoading() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[250px]" />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" disabled>
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="payslips" disabled>
            Fiches de paie
          </TabsTrigger>
          <TabsTrigger value="hours" disabled>
            Heures travaillées
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Rapports
          </TabsTrigger>
          <TabsTrigger value="declarations" disabled>
            Déclarations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-5 w-[120px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-[100px]" />
                  <Skeleton className="mt-1 h-4 w-[140px]" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[180px]" />
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-10 w-[150px]" />
              <Skeleton className="h-10 w-[150px]" />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
