import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Download, Edit, Filter, Plus, Printer, Search, Share2, Star, Trash2, Upload } from "lucide-react"

export default function RecipesPage({ params }: { params: { restaurantId: string } }) {
  const restaurantId = params.restaurantId

  // Données fictives pour les recettes
  const recipes = [
    {
      id: 1,
      name: "Risotto aux champignons",
      category: "Plats principaux",
      prepTime: 15,
      cookTime: 25,
      yield: "4 portions",
      costPerServing: 3.75,
      rating: 4.8,
      lastUpdated: "2025-03-15",
    },
    {
      id: 2,
      name: "Tarte au citron meringuée",
      category: "Desserts",
      prepTime: 30,
      cookTime: 45,
      yield: "8 portions",
      costPerServing: 2.25,
      rating: 4.9,
      lastUpdated: "2025-04-02",
    },
    {
      id: 3,
      name: "Salade César",
      category: "Entrées",
      prepTime: 20,
      cookTime: 0,
      yield: "2 portions",
      costPerServing: 4.5,
      rating: 4.5,
      lastUpdated: "2025-03-28",
    },
    {
      id: 4,
      name: "Bœuf Bourguignon",
      category: "Plats principaux",
      prepTime: 30,
      cookTime: 180,
      yield: "6 portions",
      costPerServing: 6.25,
      rating: 4.7,
      lastUpdated: "2025-04-10",
    },
    {
      id: 5,
      name: "Crème brûlée",
      category: "Desserts",
      prepTime: 15,
      cookTime: 45,
      yield: "6 portions",
      costPerServing: 1.8,
      rating: 4.6,
      lastUpdated: "2025-03-20",
    },
  ]

  // Données fictives pour les ingrédients d'une recette
  const recipeIngredients = [
    { id: 1, name: "Riz arborio", quantity: 300, unit: "g", cost: 1.2 },
    { id: 2, name: "Champignons de Paris", quantity: 250, unit: "g", cost: 2.5 },
    { id: 3, name: "Oignon", quantity: 1, unit: "pièce", cost: 0.3 },
    { id: 4, name: "Vin blanc sec", quantity: 100, unit: "ml", cost: 1.0 },
    { id: 5, name: "Bouillon de légumes", quantity: 1, unit: "L", cost: 0.8 },
    { id: 6, name: "Parmesan râpé", quantity: 50, unit: "g", cost: 1.5 },
    { id: 7, name: "Beurre", quantity: 30, unit: "g", cost: 0.4 },
    { id: 8, name: "Huile d'olive", quantity: 2, unit: "c. à soupe", cost: 0.3 },
    { id: 9, name: "Sel et poivre", quantity: 1, unit: "pincée", cost: 0.05 },
  ]

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des recettes</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle recette
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Toutes les recettes</TabsTrigger>
          <TabsTrigger value="starters">Entrées</TabsTrigger>
          <TabsTrigger value="mains">Plats principaux</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
          <TabsTrigger value="drinks">Boissons</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Toutes les recettes</CardTitle>
                  <CardDescription>Gérez toutes vos recettes standardisées</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Rechercher une recette..." className="pl-8 w-full sm:w-[250px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Temps de préparation</TableHead>
                    <TableHead>Rendement</TableHead>
                    <TableHead>Coût par portion</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Dernière mise à jour</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipes.map((recipe) => (
                    <TableRow key={recipe.id}>
                      <TableCell className="font-medium">{recipe.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{recipe.category}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                          {recipe.prepTime + recipe.cookTime} min
                        </div>
                      </TableCell>
                      <TableCell>{recipe.yield}</TableCell>
                      <TableCell>{recipe.costPerServing.toFixed(2)} €</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {recipe.rating}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(recipe.lastUpdated)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Printer className="h-4 w-4" />
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
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Affichage de 1 à {recipes.length} sur {recipes.length} recettes
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Précédent
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Suivant
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Détail de la recette</CardTitle>
              <CardDescription>Risotto aux champignons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Informations générales</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Catégorie</Label>
                        <p>Plats principaux</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Rendement</Label>
                        <p>4 portions</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Temps de préparation</Label>
                        <p>15 minutes</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Temps de cuisson</Label>
                        <p>25 minutes</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Coût total</Label>
                        <p>15.00 €</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Coût par portion</Label>
                        <p>3.75 €</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Ingrédients</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ingrédient</TableHead>
                          <TableHead>Quantité</TableHead>
                          <TableHead>Unité</TableHead>
                          <TableHead className="text-right">Coût</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recipeIngredients.map((ingredient) => (
                          <TableRow key={ingredient.id}>
                            <TableCell>{ingredient.name}</TableCell>
                            <TableCell>{ingredient.quantity}</TableCell>
                            <TableCell>{ingredient.unit}</TableCell>
                            <TableCell className="text-right">{ingredient.cost.toFixed(2)} €</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Instructions</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Éplucher et émincer finement l'oignon.</li>
                      <li>Nettoyer et couper les champignons en lamelles.</li>
                      <li>Dans une casserole, faire chauffer l'huile d'olive et le beurre.</li>
                      <li>Faire revenir l'oignon jusqu'à ce qu'il devienne translucide.</li>
                      <li>Ajouter le riz et le faire revenir pendant 2 minutes en remuant constamment.</li>
                      <li>Verser le vin blanc et laisser réduire.</li>
                      <li>Ajouter le bouillon chaud petit à petit, en remuant régulièrement.</li>
                      <li>À mi-cuisson, ajouter les champignons.</li>
                      <li>
                        Continuer à ajouter du bouillon jusqu'à ce que le riz soit cuit mais encore légèrement ferme.
                      </li>
                      <li>Retirer du feu, ajouter le parmesan râpé et mélanger.</li>
                      <li>Assaisonner avec du sel et du poivre selon votre goût.</li>
                      <li>Servir immédiatement, garni de quelques copeaux de parmesan.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Notes</h3>
                    <Textarea
                      readOnly
                      value="Pour une version plus riche, vous pouvez ajouter une cuillère à soupe de crème fraîche à la fin de la cuisson. Vous pouvez également varier les champignons selon la saison et les disponibilités."
                      className="h-24"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Allergènes</h3>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline">Lactose</Badge>
                      <Badge variant="outline">Gluten</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimer
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </Button>
              </div>
              <Button size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="starters">
          <Card>
            <CardHeader>
              <CardTitle>Entrées</CardTitle>
              <CardDescription>Gérez vos recettes d'entrées</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sélectionnez "Toutes les recettes" pour voir le contenu complet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mains">
          <Card>
            <CardHeader>
              <CardTitle>Plats principaux</CardTitle>
              <CardDescription>Gérez vos recettes de plats principaux</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sélectionnez "Toutes les recettes" pour voir le contenu complet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="desserts">
          <Card>
            <CardHeader>
              <CardTitle>Desserts</CardTitle>
              <CardDescription>Gérez vos recettes de desserts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sélectionnez "Toutes les recettes" pour voir le contenu complet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drinks">
          <Card>
            <CardHeader>
              <CardTitle>Boissons</CardTitle>
              <CardDescription>Gérez vos recettes de boissons</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sélectionnez "Toutes les recettes" pour voir le contenu complet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
