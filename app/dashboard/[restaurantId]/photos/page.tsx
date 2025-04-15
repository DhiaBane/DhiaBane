import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, Trash2, Edit2 } from "lucide-react"

// Données fictives pour les photos
const mockPhotos = [
  { id: 1, title: "Entrée du restaurant", url: "/inviting-restaurant-entry.png", category: "Intérieur" },
  { id: 2, title: "Plat signature", url: "/culinary-artistry.png", category: "Plats" },
  { id: 3, title: "Terrasse", url: "/lively-city-terrace.png", category: "Extérieur" },
  { id: 4, title: "Bar", url: "/cozy-restaurant-bar.png", category: "Intérieur" },
  { id: 5, title: "Dessert spécial", url: "/decadent-chocolate-torte.png", category: "Plats" },
  {
    id: 6,
    title: "Salle principale",
    url: "/placeholder.svg?height=200&width=300&query=restaurant dining room",
    category: "Intérieur",
  },
]

export default function PhotosPage({ params }: { params: { restaurantId: string } }) {
  return (
    <DashboardShell
      title="Gestion des Photos"
      description="Gérez les photos de votre restaurant pour votre site web et vos menus"
      restaurantId={params.restaurantId}
    >
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">Toutes les photos</TabsTrigger>
            <TabsTrigger value="interior">Intérieur</TabsTrigger>
            <TabsTrigger value="dishes">Plats</TabsTrigger>
            <TabsTrigger value="exterior">Extérieur</TabsTrigger>
          </TabsList>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Importer des photos
          </Button>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Bibliothèque de photos</CardTitle>
              <CardDescription>Gérez toutes les photos de votre restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockPhotos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden">
                    <div className="relative h-40 bg-muted">
                      <img
                        src={photo.url || "/placeholder.svg"}
                        alt={photo.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button variant="secondary" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardFooter className="p-2">
                      <div>
                        <p className="text-sm font-medium">{photo.title}</p>
                        <p className="text-xs text-muted-foreground">{photo.category}</p>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                <Card className="flex items-center justify-center h-40 border-dashed cursor-pointer hover:bg-accent/50 transition-colors">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Plus className="h-8 w-8 mb-2" />
                    <span>Ajouter une photo</span>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interior" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Photos d'intérieur</CardTitle>
              <CardDescription>Photos de l'intérieur de votre restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockPhotos
                  .filter((photo) => photo.category === "Intérieur")
                  .map((photo) => (
                    <Card key={photo.id} className="overflow-hidden">
                      <div className="relative h-40 bg-muted">
                        <img
                          src={photo.url || "/placeholder.svg"}
                          alt={photo.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button variant="secondary" size="icon" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardFooter className="p-2">
                        <div>
                          <p className="text-sm font-medium">{photo.title}</p>
                          <p className="text-xs text-muted-foreground">{photo.category}</p>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dishes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Photos de plats</CardTitle>
              <CardDescription>Photos des plats et menus de votre restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockPhotos
                  .filter((photo) => photo.category === "Plats")
                  .map((photo) => (
                    <Card key={photo.id} className="overflow-hidden">
                      <div className="relative h-40 bg-muted">
                        <img
                          src={photo.url || "/placeholder.svg"}
                          alt={photo.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button variant="secondary" size="icon" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardFooter className="p-2">
                        <div>
                          <p className="text-sm font-medium">{photo.title}</p>
                          <p className="text-xs text-muted-foreground">{photo.category}</p>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exterior" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Photos d'extérieur</CardTitle>
              <CardDescription>Photos de l'extérieur et de la terrasse de votre restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockPhotos
                  .filter((photo) => photo.category === "Extérieur")
                  .map((photo) => (
                    <Card key={photo.id} className="overflow-hidden">
                      <div className="relative h-40 bg-muted">
                        <img
                          src={photo.url || "/placeholder.svg"}
                          alt={photo.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button variant="secondary" size="icon" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardFooter className="p-2">
                        <div>
                          <p className="text-sm font-medium">{photo.title}</p>
                          <p className="text-xs text-muted-foreground">{photo.category}</p>
                        </div>
                      </CardFooter>
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
