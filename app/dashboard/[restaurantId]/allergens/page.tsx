import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Edit, Plus, Search, Trash2, Upload } from "lucide-react"

export default function AllergensPage({ params }: { params: { restaurantId: string } }) {
  const restaurantId = params.restaurantId

  // Données fictives pour les allergènes
  const allergens = [
    { id: 1, name: "Gluten", description: "Blé, orge, seigle, avoine", color: "#F59E0B", active: true },
    { id: 2, name: "Lactose", description: "Lait et produits laitiers", color: "#3B82F6", active: true },
    { id: 3, name: "Fruits à coque", description: "Amandes, noisettes, noix, etc.", color: "#10B981", active: true },
    { id: 4, name: "Œufs", description: "Œufs et produits à base d'œufs", color: "#EC4899", active: true },
    { id: 5, name: "Poisson", description: "Poissons et produits à base de poissons", color: "#6366F1", active: true },
    { id: 6, name: "Crustacés", description: "Crevettes, crabes, homards, etc.", color: "#EF4444", active: true },
    { id: 7, name: "Soja", description: "Soja et produits à base de soja", color: "#8B5CF6", active: true },
    {
      id: 8,
      name: "Arachides",
      description: "Arachides et produits à base d'arachides",
      color: "#F97316",
      active: true,
    },
  ]

  // Données fictives pour les plats avec allergènes
  const dishes = [
    {
      id: 1,
      name: "Risotto aux champignons",
      category: "Plats principaux",
      allergens: [
        { id: 1, name: "Gluten" },
        { id: 2, name: "Lactose" },
      ],
    },
    {
      id: 2,
      name: "Salade César",
      category: "Entrées",
      allergens: [
        { id: 1, name: "Gluten" },
        { id: 4, name: "Œufs" },
      ],
    },
    {
      id: 3,
      name: "Tiramisu",
      category: "Desserts",
      allergens: [
        { id: 1, name: "Gluten" },
        { id: 2, name: "Lactose" },
        { id: 4, name: "Œufs" },
      ],
    },
    {
      id: 4,
      name: "Tarte aux noix",
      category: "Desserts",
      allergens: [
        { id: 1, name: "Gluten" },
        { id: 2, name: "Lactose" },
        { id: 3, name: "Fruits à coque" },
        { id: 4, name: "Œufs" },
      ],
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des allergènes</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel allergène
          </Button>
        </div>
      </div>

      <Tabs defaultValue="allergens" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="allergens">Liste des allergènes</TabsTrigger>
          <TabsTrigger value="dishes">Plats avec allergènes</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="allergens">
          <Card>
            <CardHeader>
              <CardTitle>Allergènes enregistrés</CardTitle>
              <CardDescription>Gérez la liste des allergènes pour votre restaurant</CardDescription>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Rechercher un allergène..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Couleur</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allergens.map((allergen) => (
                    <TableRow key={allergen.id}>
                      <TableCell className="font-medium">{allergen.name}</TableCell>
                      <TableCell>{allergen.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: allergen.color }} />
                          {allergen.color}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={allergen.active ? "default" : "outline"}>
                          {allergen.active ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dishes">
          <Card>
            <CardHeader>
              <CardTitle>Plats avec allergènes</CardTitle>
              <CardDescription>Consultez et gérez les allergènes associés à vos plats</CardDescription>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Rechercher un plat..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du plat</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Allergènes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dishes.map((dish) => (
                    <TableRow key={dish.id}>
                      <TableCell className="font-medium">{dish.name}</TableCell>
                      <TableCell>{dish.category}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {dish.allergens.map((allergen) => (
                            <Badge key={allergen.id} variant="outline">
                              {allergen.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des allergènes</CardTitle>
              <CardDescription>
                Configurez les options d'affichage et de notification pour les allergènes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Affichage</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-allergens-menu">Afficher les allergènes sur le menu</Label>
                    <p className="text-sm text-muted-foreground">
                      Les allergènes seront visibles sur les menus imprimés et digitaux
                    </p>
                  </div>
                  <Switch id="show-allergens-menu" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-allergens-online">Afficher les allergènes en ligne</Label>
                    <p className="text-sm text-muted-foreground">
                      Les allergènes seront visibles sur le site web et les applications de commande
                    </p>
                  </div>
                  <Switch id="show-allergens-online" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-staff">Notifier le personnel</Label>
                    <p className="text-sm text-muted-foreground">
                      Le personnel sera notifié des allergènes lors de la prise de commande
                    </p>
                  </div>
                  <Switch id="notify-staff" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-kitchen">Notifier la cuisine</Label>
                    <p className="text-sm text-muted-foreground">
                      La cuisine sera notifiée des allergènes sur les bons de commande
                    </p>
                  </div>
                  <Switch id="notify-kitchen" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Conformité</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="eu-regulation" defaultChecked />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="eu-regulation">Conformité avec la réglementation européenne</Label>
                      <p className="text-sm text-muted-foreground">
                        Respecte le règlement UE n°1169/2011 concernant l'information des consommateurs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="local-regulation" defaultChecked />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="local-regulation">Conformité avec la réglementation locale</Label>
                      <p className="text-sm text-muted-foreground">
                        Respecte les réglementations locales concernant l'affichage des allergènes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Annuler</Button>
              <Button>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 p-4 border rounded-lg bg-amber-50 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800">Information importante</h3>
          <p className="text-sm text-amber-700">
            La gestion des allergènes est cruciale pour la sécurité alimentaire. Assurez-vous que toutes les
            informations sont à jour et que votre personnel est formé pour répondre aux questions concernant les
            allergènes.
          </p>
        </div>
      </div>
    </div>
  )
}
