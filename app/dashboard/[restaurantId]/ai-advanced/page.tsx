"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Brain, MessageSquare, ChefHat, TrendingUp, AlertTriangle, RefreshCw, Sparkles } from "lucide-react"
import { analyzeSentiment, type SentimentAnalysisResult } from "@/lib/ai/sentiment-analysis"
import { generateMenu, type MenuGenerationOptions } from "@/lib/ai/menu-generation"
import { availablePredictionModels, type PredictionModel } from "@/lib/ai/prediction-models"

export default function AIAdvancedPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [activeTab, setActiveTab] = useState("sentiment")
  const [isLoading, setIsLoading] = useState(false)

  // État pour l'analyse de sentiment
  const [reviewText, setReviewText] = useState("")
  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysisResult | null>(null)

  // État pour la génération de menu
  const [menuOptions, setMenuOptions] = useState<MenuGenerationOptions>({
    cuisine: "french",
    mealType: "dinner",
    priceRange: "moderate",
    courses: 3,
    includeWinePairings: true,
    seasonality: "summer",
    dietary: ["vegetarian"],
  })
  const [menuGenerating, setMenuGenerating] = useState(false)
  const [generatedMenu, setGeneratedMenu] = useState<any>(null)

  // État pour les modèles de prédiction
  const [selectedModel, setSelectedModel] = useState<PredictionModel | null>(null)

  // Fonction pour analyser le sentiment
  const handleSentimentAnalysis = async () => {
    if (!reviewText.trim()) return

    setIsLoading(true)
    try {
      const result = await analyzeSentiment(reviewText)
      setSentimentResult(result)
    } catch (error) {
      console.error("Erreur lors de l'analyse de sentiment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour générer un menu
  const handleMenuGeneration = async () => {
    setMenuGenerating(true)
    try {
      const menu = await generateMenu(menuOptions)
      setGeneratedMenu(menu)
    } catch (error) {
      console.error("Erreur lors de la génération du menu:", error)
    } finally {
      setMenuGenerating(false)
    }
  }

  // Fonction pour mettre à jour les options du menu
  const updateMenuOption = (key: keyof MenuGenerationOptions, value: any) => {
    setMenuOptions((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Fonction pour sélectionner un modèle
  const handleModelSelect = (modelId: string) => {
    const model = availablePredictionModels.find((m) => m.id === modelId) || null
    setSelectedModel(model)
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Sparkles className="mr-2 h-8 w-8 text-primary" />
              IA Avancée
            </h1>
            <p className="text-muted-foreground">
              Outils d'intelligence artificielle avancés pour optimiser votre restaurant
            </p>
          </div>
          <Button onClick={() => setIsLoading((prev) => !prev)} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Traitement..." : "Actualiser"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sentiment">
              <MessageSquare className="mr-2 h-4 w-4" />
              Analyse de sentiment
            </TabsTrigger>
            <TabsTrigger value="menu">
              <ChefHat className="mr-2 h-4 w-4" />
              Génération de menu
            </TabsTrigger>
            <TabsTrigger value="models">
              <Brain className="mr-2 h-4 w-4" />
              Modèles prédictifs
            </TabsTrigger>
            <TabsTrigger value="training">
              <TrendingUp className="mr-2 h-4 w-4" />
              Entraînement IA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sentiment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyse de sentiment</CardTitle>
                <CardDescription>Analysez les avis clients et les commentaires sur les réseaux sociaux</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="review-text">Texte à analyser</Label>
                    <Textarea
                      id="review-text"
                      placeholder="Entrez un avis client ou un commentaire à analyser..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={5}
                    />
                  </div>

                  <Button
                    onClick={handleSentimentAnalysis}
                    disabled={isLoading || !reviewText.trim()}
                    className="w-full"
                  >
                    {isLoading ? "Analyse en cours..." : "Analyser le sentiment"}
                  </Button>

                  {sentimentResult && (
                    <div className="space-y-4 mt-6 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Score de sentiment</h3>
                          <Badge
                            className={
                              sentimentResult.score > 0.3
                                ? "bg-green-500"
                                : sentimentResult.score > -0.3
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }
                          >
                            {sentimentResult.score > 0.3
                              ? "Positif"
                              : sentimentResult.score > -0.3
                                ? "Neutre"
                                : "Négatif"}
                          </Badge>
                        </div>
                        <Progress value={(sentimentResult.score + 1) * 50} className="h-2" />
                        <p className="text-sm text-muted-foreground text-center">
                          {sentimentResult.score.toFixed(2)} ({sentimentResult.score < 0 ? "" : "+"}
                          {Math.round(sentimentResult.score * 100)}%)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Résumé</h3>
                        <p className="text-sm">{sentimentResult.summary}</p>
                      </div>

                      {sentimentResult.entities.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="font-medium">Entités détectées</h3>
                          <div className="flex flex-wrap gap-2">
                            {sentimentResult.entities.map((entity, index) => (
                              <Badge
                                key={index}
                                className={
                                  entity.sentiment > 0.2
                                    ? "bg-green-500"
                                    : entity.sentiment > -0.2
                                      ? "bg-gray-500"
                                      : "bg-red-500"
                                }
                              >
                                {entity.name} ({entity.sentiment < 0 ? "" : "+"}
                                {Math.round(entity.sentiment * 100)}%)
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <h3 className="font-medium">Catégories</h3>
                        <div className="space-y-3">
                          {sentimentResult.categories.map((category, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{category.category}</span>
                                <span>
                                  {category.score < 0 ? "" : "+"}
                                  {Math.round(category.score * 100)}%
                                </span>
                              </div>
                              <Progress value={(category.score + 1) * 50} className="h-1.5" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Utilisez cette analyse pour comprendre le sentiment des clients et améliorer votre service
                </p>
                <Button variant="outline" size="sm">
                  Voir l'historique
                </Button>
              </CardFooter>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse automatique</CardTitle>
                  <CardDescription>Configurez l'analyse automatique des avis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analyser les avis Google</Label>
                        <p className="text-xs text-muted-foreground">Analyse quotidienne des nouveaux avis</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analyser les avis TripAdvisor</Label>
                        <p className="text-xs text-muted-foreground">Analyse quotidienne des nouveaux avis</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analyser les mentions Twitter</Label>
                        <p className="text-xs text-muted-foreground">Analyse en temps réel des mentions</p>
                      </div>
                      <Switch checked={false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analyser les commentaires Instagram</Label>
                        <p className="text-xs text-muted-foreground">Analyse quotidienne des nouveaux commentaires</p>
                      </div>
                      <Switch checked={false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Alertes sentiment négatif</Label>
                        <p className="text-xs text-muted-foreground">Notification pour les avis très négatifs</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tendances récentes</CardTitle>
                  <CardDescription>Évolution du sentiment client sur 30 jours</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">Graphique de tendance du sentiment</p>
                    <p className="text-sm text-muted-foreground">
                      (Les données seront affichées après l'analyse d'au moins 10 avis)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="menu" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Paramètres du menu</CardTitle>
                  <CardDescription>Configurez les options pour la génération de menu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cuisine">Cuisine</Label>
                      <Select value={menuOptions.cuisine} onValueChange={(value) => updateMenuOption("cuisine", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="french">Française</SelectItem>
                          <SelectItem value="italian">Italienne</SelectItem>
                          <SelectItem value="asian">Asiatique</SelectItem>
                          <SelectItem value="mediterranean">Méditerranéenne</SelectItem>
                          <SelectItem value="american">Américaine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mealType">Type de repas</Label>
                      <Select
                        value={menuOptions.mealType}
                        onValueChange={(value) => updateMenuOption("mealType", value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Petit-déjeuner</SelectItem>
                          <SelectItem value="lunch">Déjeuner</SelectItem>
                          <SelectItem value="dinner">Dîner</SelectItem>
                          <SelectItem value="brunch">Brunch</SelectItem>
                          <SelectItem value="tasting">Menu dégustation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priceRange">Gamme de prix</Label>
                      <Select
                        value={menuOptions.priceRange}
                        onValueChange={(value) => updateMenuOption("priceRange", value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une gamme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Économique</SelectItem>
                          <SelectItem value="moderate">Modéré</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="luxury">Luxe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seasonality">Saisonnalité</Label>
                      <Select
                        value={menuOptions.seasonality}
                        onValueChange={(value) => updateMenuOption("seasonality", value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une saison" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spring">Printemps</SelectItem>
                          <SelectItem value="summer">Été</SelectItem>
                          <SelectItem value="autumn">Automne</SelectItem>
                          <SelectItem value="winter">Hiver</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="courses">Nombre de plats</Label>
                        <span className="text-sm">{menuOptions.courses}</span>
                      </div>
                      <Slider
                        id="courses"
                        min={1}
                        max={5}
                        step={1}
                        value={[menuOptions.courses]}
                        onValueChange={(value) => updateMenuOption("courses", value[0])}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="wine-pairings"
                        checked={menuOptions.includeWinePairings}
                        onCheckedChange={(checked) => updateMenuOption("includeWinePairings", checked)}
                      />
                      <Label htmlFor="wine-pairings">Inclure les accords vins</Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Régimes alimentaires</Label>
                      <div className="flex flex-wrap gap-2">
                        {["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"].map((diet) => (
                          <Badge
                            key={diet}
                            variant={menuOptions.dietary?.includes(diet as any) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              const current = menuOptions.dietary || []
                              if (current.includes(diet as any)) {
                                updateMenuOption(
                                  "dietary",
                                  current.filter((d) => d !== diet),
                                )
                              } else {
                                updateMenuOption("dietary", [...current, diet])
                              }
                            }}
                          >
                            {diet === "vegetarian"
                              ? "Végétarien"
                              : diet === "vegan"
                                ? "Végétalien"
                                : diet === "gluten-free"
                                  ? "Sans gluten"
                                  : diet === "dairy-free"
                                    ? "Sans lactose"
                                    : "Sans fruits à coque"}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button onClick={handleMenuGeneration} disabled={menuGenerating} className="w-full">
                      {menuGenerating ? "Génération en cours..." : "Générer un menu"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Menu généré</CardTitle>
                  <CardDescription>
                    {generatedMenu ? generatedMenu.description : "Le menu généré apparaîtra ici"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {menuGenerating ? (
                    <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                      <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                      <p>Génération du menu en cours...</p>
                      <p className="text-sm text-muted-foreground">Cela peut prendre quelques instants</p>
                    </div>
                  ) : generatedMenu ? (
                    <div className="space-y-6">
                      <div className="text-center space-y-2 pb-4 border-b">
                        <h3 className="text-2xl font-semibold">{generatedMenu.title}</h3>
                        <p className="text-muted-foreground">{generatedMenu.description}</p>
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                          {generatedMenu.dietaryOverview.map((diet: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {diet}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        {generatedMenu.items.map((item: any, index: number) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{item.suggestedPrice.toFixed(2)} €</p>
                                {item.winePairing && (
                                  <p className="text-xs text-muted-foreground">
                                    <span className="font-medium">Vin:</span> {item.winePairing}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.allergens.map((allergen: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs bg-red-50">
                                  {allergen}
                                </Badge>
                              ))}
                              {item.dietary.map((diet: string, i: number) => (
                                <Badge key={`diet-${i}`} variant="outline" className="text-xs bg-green-50">
                                  {diet}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p>
                            <span className="font-medium">Coût moyen:</span>{" "}
                            {generatedMenu.estimatedAverageCost.toFixed(2)} €
                          </p>
                          <p>
                            <span className="font-medium">Prix moyen:</span>{" "}
                            {generatedMenu.suggestedAveragePrice.toFixed(2)} €
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-medium">Complexité:</span>{" "}
                            {generatedMenu.preparationComplexity === "simple"
                              ? "Simple"
                              : generatedMenu.preparationComplexity === "moderate"
                                ? "Modérée"
                                : "Complexe"}
                          </p>
                          <p>
                            <span className="font-medium">Disponibilité:</span> {generatedMenu.seasonalAvailability}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                      <ChefHat className="h-16 w-16 text-muted-foreground" />
                      <p className="text-muted-foreground">Configurez les options et cliquez sur "Générer un menu"</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Les menus générés peuvent être personnalisés et enregistrés
                  </p>
                  {generatedMenu && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button size="sm">Enregistrer</Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Modèles prédictifs disponibles</CardTitle>
                <CardDescription>Modèles d'IA spécialisés pour différents aspects de votre restaurant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availablePredictionModels.map((model) => (
                    <div
                      key={model.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedModel?.id === model.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => handleModelSelect(model.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{model.name}</h3>
                          <p className="text-sm text-muted-foreground">{model.description}</p>
                        </div>
                        <Badge>Précision: {(model.accuracy * 100).toFixed(0)}%</Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {model.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Dernière mise à jour: {model.lastTrained.toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedModel && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedModel.name}</CardTitle>
                  <CardDescription>{selectedModel.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Paramètres du modèle</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Période d'analyse</Label>
                          <Select defaultValue="30">
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une période" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7">7 jours</SelectItem>
                              <SelectItem value="30">30 jours</SelectItem>
                              <SelectItem value="90">90 jours</SelectItem>
                              <SelectItem value="365">1 an</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Granularité</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une granularité" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Par heure</SelectItem>
                              <SelectItem value="daily">Par jour</SelectItem>
                              <SelectItem value="weekly">Par semaine</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full mt-4">Exécuter le modèle</Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Historique des prédictions</h3>
                      <div className="text-sm text-muted-foreground">
                        <p>Aucune prédiction récente avec ce modèle</p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Automatisation</h3>
                        <Switch />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Exécuter automatiquement ce modèle chaque jour et envoyer les résultats par email
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Dernière exécution: Jamais</p>
                  <Button variant="outline" size="sm">
                    Voir la documentation
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Entraînement personnalisé</CardTitle>
                <CardDescription>
                  Entraînez l'IA avec vos propres données pour des prédictions plus précises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">État de l'entraînement</h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-yellow-500" />
                      </div>
                      <div>
                        <p className="font-medium">Données insuffisantes</p>
                        <p className="text-sm text-muted-foreground">
                          Minimum 3 mois de données requises pour un entraînement optimal
                        </p>
                      </div>
                    </div>
                    <Progress value={35} className="h-2" />
                    <p className="text-xs text-center text-muted-foreground">35% des données requises collectées</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg space-y-2">
                      <h3 className="font-medium">Sources de données</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Ventes</p>
                          <Badge variant="outline" className="bg-green-50">
                            Connecté
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Inventaire</p>
                          <Badge variant="outline" className="bg-green-50">
                            Connecté
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Réservations</p>
                          <Badge variant="outline" className="bg-green-50">
                            Connecté
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Avis clients</p>
                          <Badge variant="outline" className="bg-red-50">
                            Non connecté
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Données météo</p>
                          <Badge variant="outline" className="bg-red-50">
                            Non connecté
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg space-y-2">
                      <h3 className="font-medium">Modèles à entraîner</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="train-sales" />
                          <Label htmlFor="train-sales">Prévision des ventes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="train-inventory" />
                          <Label htmlFor="train-inventory">Optimisation d'inventaire</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="train-staff" />
                          <Label htmlFor="train-staff">Planification du personnel</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="train-menu" />
                          <Label htmlFor="train-menu">Optimisation du menu</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="train-customer" />
                          <Label htmlFor="train-customer">Segmentation client</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Paramètres d'entraînement</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Fréquence d'entraînement</Label>
                        <Select defaultValue="monthly">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une fréquence" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Hebdomadaire</SelectItem>
                            <SelectItem value="biweekly">Bi-mensuelle</SelectItem>
                            <SelectItem value="monthly">Mensuelle</SelectItem>
                            <SelectItem value="quarterly">Trimestrielle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Précision cible</Label>
                        <Select defaultValue="balanced">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une précision" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="speed">Rapide (moins précis)</SelectItem>
                            <SelectItem value="balanced">Équilibré</SelectItem>
                            <SelectItem value="accuracy">Haute précision (plus lent)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full" disabled>
                      Démarrer l'entraînement
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      L'entraînement sera disponible lorsque suffisamment de données seront collectées
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
