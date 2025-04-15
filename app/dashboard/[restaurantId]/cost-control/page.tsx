import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Calculator,
  Calendar,
  Download,
  FileText,
  Filter,
  LineChart,
  Percent,
  PieChart,
  Search,
  Settings,
} from "lucide-react"

export default function CostControlPage({ params }: { params: { restaurantId: string } }) {
  const restaurantId = params.restaurantId

  // Données fictives pour les coûts
  const costCategories = [
    {
      id: 1,
      name: "Nourriture",
      currentCost: 12500,
      previousCost: 13200,
      budget: 12000,
      percentageOfSales: 28.5,
      trend: "down",
    },
    {
      id: 2,
      name: "Boissons",
      currentCost: 5800,
      previousCost: 5500,
      budget: 6000,
      percentageOfSales: 13.2,
      trend: "up",
    },
    {
      id: 3,
      name: "Personnel",
      currentCost: 18500,
      previousCost: 17800,
      budget: 18000,
      percentageOfSales: 42.1,
      trend: "up",
    },
    {
      id: 4,
      name: "Énergie",
      currentCost: 2800,
      previousCost: 2600,
      budget: 2500,
      percentageOfSales: 6.4,
      trend: "up",
    },
    {
      id: 5,
      name: "Maintenance",
      currentCost: 1200,
      previousCost: 1350,
      budget: 1500,
      percentageOfSales: 2.7,
      trend: "down",
    },
  ]

  // Données fictives pour les plats
  const dishCosts = [
    {
      id: 1,
      name: "Risotto aux champignons",
      ingredients: 3.75,
      labor: 2.25,
      overhead: 1.0,
      totalCost: 7.0,
      sellingPrice: 18.5,
      margin: 62.2,
      popularity: "high",
    },
    {
      id: 2,
      name: "Entrecôte grillée",
      ingredients: 9.5,
      labor: 2.5,
      overhead: 1.2,
      totalCost: 13.2,
      sellingPrice: 28.0,
      margin: 52.9,
      popularity: "high",
    },
    {
      id: 3,
      name: "Salade César",
      ingredients: 4.5,
      labor: 1.75,
      overhead: 0.8,
      totalCost: 7.05,
      sellingPrice: 14.5,
      margin: 51.4,
      popularity: "medium",
    },
    {
      id: 4,
      name: "Tiramisu",
      ingredients: 2.25,
      labor: 1.5,
      overhead: 0.75,
      totalCost: 4.5,
      sellingPrice: 9.0,
      margin: 50.0,
      popularity: "high",
    },
    {
      id: 5,
      name: "Soupe à l'oignon",
      ingredients: 1.8,
      labor: 1.2,
      overhead: 0.6,
      totalCost: 3.6,
      sellingPrice: 8.5,
      margin: 57.6,
      popularity: "low",
    },
  ]

  // Fonction pour formater les montants en euros
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  // Fonction pour calculer la variation en pourcentage
  const calculatePercentageChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return change.toFixed(1)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contrôle des coûts</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Coût total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(40800)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +3.2% par rapport au mois dernier
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ratio coût/vente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowDown className="mr-1 h-3 w-3" />
                -0.8% par rapport au mois dernier
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Marge brute</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67.6%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +0.8% par rapport au mois dernier
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Écart budgétaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{formatCurrency(800)}</div>
            <p className="text-xs text-muted-foreground">2.0% au-dessus du budget</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="categories">Catégories de coûts</TabsTrigger>
          <TabsTrigger value="dishes">Coûts par plat</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Évolution des coûts</CardTitle>
                <CardDescription>Évolution des coûts sur les 6 derniers mois</CardDescription>
                <div className="flex items-center gap-2">
                  <Select defaultValue="6months">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">30 derniers jours</SelectItem>
                      <SelectItem value="3months">3 derniers mois</SelectItem>
                      <SelectItem value="6months">6 derniers mois</SelectItem>
                      <SelectItem value="1year">Année en cours</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Graphique d'évolution des coûts</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition des coûts</CardTitle>
                <CardDescription>Répartition par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Graphique de répartition</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé par catégorie</CardTitle>
                <CardDescription>Aperçu des coûts par catégorie pour le mois en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Coût actuel</TableHead>
                      <TableHead>Mois précédent</TableHead>
                      <TableHead>Variation</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Écart budgétaire</TableHead>
                      <TableHead>% des ventes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {costCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{formatCurrency(category.currentCost)}</TableCell>
                        <TableCell>{formatCurrency(category.previousCost)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {category.trend === "up" ? (
                              <ArrowUp className="mr-1 h-3 w-3 text-red-500" />
                            ) : (
                              <ArrowDown className="mr-1 h-3 w-3 text-green-500" />
                            )}
                            {Math.abs(Number(calculatePercentageChange(category.currentCost, category.previousCost)))}%
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(category.budget)}</TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center ${category.currentCost > category.budget ? "text-red-500" : "text-green-500"}`}
                          >
                            {category.currentCost > category.budget ? (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 h-3 w-3" />
                            )}
                            {formatCurrency(Math.abs(category.currentCost - category.budget))}
                          </div>
                        </TableCell>
                        <TableCell>{category.percentageOfSales}%</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold">
                      <TableCell>Total</TableCell>
                      <TableCell>
                        {formatCurrency(costCategories.reduce((sum, cat) => sum + cat.currentCost, 0))}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(costCategories.reduce((sum, cat) => sum + cat.previousCost, 0))}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>{formatCurrency(costCategories.reduce((sum, cat) => sum + cat.budget, 0))}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>100%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Catégories de coûts</CardTitle>
              <CardDescription>Analyse détaillée par catégorie de coûts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sélectionnez "Vue d'ensemble" pour voir le contenu complet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dishes">
          <Card>
            <CardHeader>
              <CardTitle>Coûts par plat</CardTitle>
              <CardDescription>Analyse des coûts et des marges par plat</CardDescription>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Rechercher un plat..." className="pl-8 w-[250px]" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plat</TableHead>
                    <TableHead>Coût ingrédients</TableHead>
                    <TableHead>Coût main d'œuvre</TableHead>
                    <TableHead>Frais généraux</TableHead>
                    <TableHead>Coût total</TableHead>
                    <TableHead>Prix de vente</TableHead>
                    <TableHead>Marge</TableHead>
                    <TableHead>Popularité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dishCosts.map((dish) => (
                    <TableRow key={dish.id}>
                      <TableCell className="font-medium">{dish.name}</TableCell>
                      <TableCell>{formatCurrency(dish.ingredients)}</TableCell>
                      <TableCell>{formatCurrency(dish.labor)}</TableCell>
                      <TableCell>{formatCurrency(dish.overhead)}</TableCell>
                      <TableCell>{formatCurrency(dish.totalCost)}</TableCell>
                      <TableCell>{formatCurrency(dish.sellingPrice)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Percent className="mr-1 h-3 w-3" />
                          {dish.margin}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            dish.popularity === "high"
                              ? "default"
                              : dish.popularity === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {dish.popularity === "high" ? "Élevée" : dish.popularity === "medium" ? "Moyenne" : "Faible"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Affichage de 1 à {dishCosts.length} sur {dishCosts.length} plats
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
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Rapports</CardTitle>
              <CardDescription>Générez des rapports détaillés sur les coûts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
                      Rapport mensuel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">Rapport détaillé des coûts pour le mois en cours</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Générer
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calculator className="mr-2 h-5 w-5 text-green-500" />
                      Analyse des marges
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Analyse détaillée des marges par catégorie et par plat
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Générer
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-purple-500" />
                      Comparaison annuelle
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">Comparaison des coûts avec l'année précédente</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Générer
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 p-4 border rounded-lg bg-amber-50 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800">Recommandations</h3>
          <p className="text-sm text-amber-700">
            Les coûts d'énergie sont en hausse de 7.7% par rapport au mois précédent. Envisagez de revoir votre
            consommation énergétique et d'optimiser l'utilisation des équipements.
          </p>
        </div>
      </div>
    </div>
  )
}
