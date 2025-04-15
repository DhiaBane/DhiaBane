import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PhotosLoading({ params }: { params?: { restaurantId: string } }) {
  const restaurantId = params?.restaurantId || "1"

  return (
    <DashboardShell
      title="Gestion des Photos"
      description="Gérez les photos de votre restaurant pour votre site web et vos menus"
      restaurantId={restaurantId}
    >
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">Toutes les photos</TabsTrigger>
            <TabsTrigger value="interior">Intérieur</TabsTrigger>
            <TabsTrigger value="dishes">Plats</TabsTrigger>
            <TabsTrigger value="exterior">Extérieur</TabsTrigger>
          </TabsList>
          <Skeleton className="h-10 w-40" />
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Bibliothèque de photos</CardTitle>
              <CardDescription>Gérez toutes les photos de votre restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="h-40 w-full" />
                      <div className="p-2">
                        <Skeleton className="h-5 w-3/4 mb-1" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
