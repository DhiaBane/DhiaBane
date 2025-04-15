import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SchedulingLoading() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[250px]" />
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="weekly" disabled>
            Planning hebdomadaire
          </TabsTrigger>
          <TabsTrigger value="daily" disabled>
            Planning journalier
          </TabsTrigger>
          <TabsTrigger value="templates" disabled>
            Modèles
          </TabsTrigger>
          <TabsTrigger value="ai" disabled>
            Optimisation IA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[300px]" />
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
