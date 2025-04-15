"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Star, Check, Settings, ExternalLink, MessageSquare } from "lucide-react"

// Utilisons les mêmes types et données fictives que dans la page principale
interface Extension {
  id: string
  name: string
  developer: string
  description: string
  longDescription?: string
  icon: string
  category: string
  price: number | "Gratuit"
  rating: number
  reviews: number
  installed?: boolean
  featured?: boolean
  new?: boolean
  popular?: boolean
  tags: string[]
  lastUpdated: string
  version: string
  compatibility: string
  screenshots?: string[]
}

// Données fictives pour la démo - nous utiliserons seulement quelques extensions
const extensions: Extension[] = [
  {
    id: "qr-menu",
    name: "Menu QR Code",
    developer: "RestauTech",
    description: "Générez des QR codes pour vos menus numériques",
    longDescription:
      "Permettez à vos clients de consulter votre menu directement sur leur smartphone en scannant un simple QR code. Cette extension génère automatiquement des QR codes personnalisés pour chacun de vos menus, que vous pouvez imprimer ou afficher sur vos tables. Suivez les statistiques de scan et optimisez l'expérience client.",
    icon: "/abstract-qr-code.png",
    category: "Menu",
    price: "Gratuit",
    rating: 4.8,
    reviews: 156,
    installed: true,
    featured: true,
    tags: ["menu", "digital", "sans contact"],
    lastUpdated: "15/03/2025",
    version: "2.3.1",
    compatibility: "RestauPilot v3.0+",
    screenshots: ["/qr-code-menu-example.png", "/qr-code-growth.png"],
  },
  {
    id: "analytics-ai",
    name: "Analytics AI",
    developer: "DataDish",
    description: "Analyses prédictives et insights basés sur l'IA",
    longDescription:
      "Exploitez la puissance de l'intelligence artificielle pour analyser vos données et obtenir des insights précieux. Prédisez les tendances de vente, identifiez les opportunités d'upselling, optimisez vos prix et horaires d'ouverture. Recevez des recommandations personnalisées pour augmenter votre rentabilité et améliorer l'expérience client.",
    icon: "/placeholder.svg?height=80&width=80&query=AI",
    category: "Analytique",
    price: 79.99,
    rating: 4.9,
    reviews: 42,
    featured: true,
    tags: ["IA", "prédictions", "insights"],
    lastUpdated: "05/04/2025",
    version: "2.1.0",
    compatibility: "RestauPilot v3.0+",
    screenshots: [
      "/placeholder.svg?height=300&width=500&query=AI%20Analytics%20Dashboard",
      "/placeholder.svg?height=300&width=500&query=AI%20Prediction%20Graph",
      "/placeholder.svg?height=300&width=500&query=AI%20Recommendation%20Engine",
    ],
  },
  {
    id: "payment-split",
    name: "Payment Splitter",
    developer: "PayEase",
    description: "Permettez aux clients de diviser facilement l'addition",
    longDescription:
      "Offrez à vos clients la possibilité de diviser facilement l'addition de différentes façons : parts égales, articles spécifiques, ou montants personnalisés. Compatible avec tous les principaux systèmes de paiement, cette extension simplifie le processus de règlement pour les groupes et améliore l'expérience client tout en réduisant le temps de traitement pour votre personnel.",
    icon: "/placeholder.svg?height=80&width=80&query=Split",
    category: "Paiement",
    price: 29.99,
    rating: 4.7,
    reviews: 112,
    popular: true,
    tags: ["paiement", "addition", "groupes"],
    lastUpdated: "08/04/2025",
    version: "2.0.1",
    compatibility: "RestauPilot v3.0+",
  },
]

// Fonction pour formater le prix
const formatPrice = (price: number | "Gratuit"): string => {
  if (price === "Gratuit") return "Gratuit"
  return `${price.toFixed(2)} €`
}

// Fonction pour afficher les étoiles de notation
const renderRatingStars = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
  }

  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star className="h-4 w-4 text-yellow-400" />
        <Star
          className="absolute top-0 left-0 h-4 w-4 fill-yellow-400 text-yellow-400 overflow-hidden"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      </div>,
    )
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
  }

  return <div className="flex">{stars}</div>
}

export default function ExtensionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params?.restaurantId as string
  const extensionId = params?.extensionId as string

  const [extension, setExtension] = useState<Extension | null>(null)
  const [installProgress, setInstallProgress] = useState(0)
  const [installing, setInstalling] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Simuler le chargement de l'extension
  useEffect(() => {
    const foundExtension = extensions.find((ext) => ext.id === extensionId)
    if (foundExtension) {
      setExtension(foundExtension)
    } else {
      // Rediriger vers la page des extensions si l'extension n'est pas trouvée
      router.push(`/dashboard/${restaurantId}/extensions`)
    }
  }, [extensionId, restaurantId, router])

  // Fonction pour simuler l'installation d'une extension
  const installExtension = () => {
    if (!extension) return

    setInstalling(true)
    setInstallProgress(0)

    const interval = setInterval(() => {
      setInstallProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setInstalling(false)
            // Marquer l'extension comme installée
            setExtension((prev) => (prev ? { ...prev, installed: true } : null))
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // Fonction pour désinstaller une extension
  const uninstallExtension = () => {
    if (!extension) return

    if (confirm(`Êtes-vous sûr de vouloir désinstaller l'extension "${extension.name}" ?`)) {
      // Marquer l'extension comme non installée
      setExtension((prev) => (prev ? { ...prev, installed: false } : null))
    }
  }

  if (!extension) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={() => router.push(`/dashboard/${restaurantId}/extensions`)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Chargement...</h1>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2"
          onClick={() => router.push(`/dashboard/${restaurantId}/extensions`)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{extension.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={extension.icon || "/placeholder.svg"}
                    alt={`${extension.name} icon`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{extension.name}</h2>
                      <p className="text-muted-foreground">Par {extension.developer}</p>
                    </div>
                    <div className="text-xl font-bold">{formatPrice(extension.price)}</div>
                  </div>
                  <div className="flex items-center mt-2">
                    {renderRatingStars(extension.rating)}
                    <span className="ml-2 text-sm font-medium">{extension.rating.toFixed(1)}</span>
                    <span className="ml-1 text-sm text-muted-foreground">({extension.reviews} avis)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {extension.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Aperçu</TabsTrigger>
                  <TabsTrigger value="screenshots">Captures d&apos;écran</TabsTrigger>
                  <TabsTrigger value="reviews">Avis</TabsTrigger>
                  <TabsTrigger value="support">Support</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-600">{extension.longDescription || extension.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Fonctionnalités</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Intégration transparente avec RestauPilot</li>
                      <li>Interface utilisateur intuitive</li>
                      <li>Mises à jour régulières et support technique</li>
                      <li>Documentation complète</li>
                      <li>Personnalisation avancée</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Informations techniques</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Version</p>
                        <p className="text-sm text-gray-600">{extension.version}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Dernière mise à jour</p>
                        <p className="text-sm text-gray-600">{extension.lastUpdated}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Compatibilité</p>
                        <p className="text-sm text-gray-600">{extension.compatibility}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Taille</p>
                        <p className="text-sm text-gray-600">2.4 MB</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="screenshots">
                  <div className="space-y-4">
                    {extension.screenshots && extension.screenshots.length > 0 ? (
                      extension.screenshots.map((screenshot, index) => (
                        <div key={index} className="rounded-lg overflow-hidden border">
                          <img
                            src={screenshot || "/placeholder.svg"}
                            alt={`${extension.name} screenshot ${index + 1}`}
                            className="w-full h-auto"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Aucune capture d&apos;écran disponible pour cette extension.
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Avis des utilisateurs</h3>
                        <p className="text-sm text-muted-foreground">{extension.reviews} avis au total</p>
                      </div>
                      <div className="flex items-center">
                        <div className="text-2xl font-bold mr-2">{extension.rating.toFixed(1)}</div>
                        {renderRatingStars(extension.rating)}
                      </div>
                    </div>

                    <Separator />

                    {/* Avis fictifs */}
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">Jean Dupont</div>
                            <div className="text-sm text-muted-foreground">Il y a 2 jours</div>
                          </div>
                          <div className="flex">{renderRatingStars(5)}</div>
                        </div>
                        <p className="mt-2 text-sm">
                          Excellente extension ! Facile à configurer et très utile pour notre restaurant. Nos clients
                          adorent pouvoir scanner le menu directement depuis leur téléphone.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">Marie Martin</div>
                            <div className="text-sm text-muted-foreground">Il y a 1 semaine</div>
                          </div>
                          <div className="flex">{renderRatingStars(4)}</div>
                        </div>
                        <p className="mt-2 text-sm">
                          Très bonne extension, mais j&apos;aurais aimé plus d&apos;options de personnalisation pour les
                          QR codes. Sinon, fonctionne parfaitement et s&apos;intègre bien avec le reste du système.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">Pierre Lefebvre</div>
                            <div className="text-sm text-muted-foreground">Il y a 2 semaines</div>
                          </div>
                          <div className="flex">{renderRatingStars(5)}</div>
                        </div>
                        <p className="mt-2 text-sm">
                          Indispensable pour notre restaurant ! Les statistiques de scan nous aident à comprendre
                          comment nos clients interagissent avec notre menu. Le support client est également très
                          réactif.
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Voir tous les avis
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="support">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Support technique</h3>
                      <p className="text-gray-600">
                        Pour toute question ou problème concernant cette extension, veuillez contacter l&apos;équipe de
                        support de {extension.developer}.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Documentation
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contacter le support
                      </Button>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">FAQ</h3>
                      <div className="space-y-2">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium">Comment installer cette extension ?</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Cliquez simplement sur le bouton &quot;Installer&quot; et suivez les instructions.
                            L&apos;extension sera automatiquement intégrée à votre RestauPilot.
                          </p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium">Puis-je personnaliser les QR codes ?</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Oui, vous pouvez personnaliser les couleurs, ajouter votre logo et choisir différents styles
                            de QR codes dans les paramètres de l&apos;extension.
                          </p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium">Cette extension fonctionne-t-elle hors ligne ?</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Les QR codes générés fonctionnent toujours, mais certaines fonctionnalités comme les
                            statistiques nécessitent une connexion internet.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              {extension.installed ? (
                <>
                  <div className="flex items-center justify-center bg-green-50 text-green-600 rounded-lg p-4 mb-4">
                    <Check className="h-5 w-5 mr-2" />
                    <span className="font-medium">Extension installée</span>
                  </div>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push(`/dashboard/${restaurantId}/extensions/settings/${extensionId}`)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={uninstallExtension}>
                      Désinstaller
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {installing ? (
                    <div className="space-y-4">
                      <div className="text-center mb-2">Installation en cours...</div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                          style={{ width: `${installProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Téléchargement...</span>
                        <span>{installProgress}%</span>
                      </div>
                      {installProgress >= 100 && (
                        <div className="flex items-center justify-center text-green-500">
                          <Check className="h-5 w-5 mr-2" />
                          <span>Installation terminée !</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button className="w-full" onClick={installExtension}>
                      <Download className="mr-2 h-4 w-4" />
                      Installer ({formatPrice(extension.price)})
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Informations</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Développeur</span>
                  <span>{extension.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span>{extension.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dernière mise à jour</span>
                  <span>{extension.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Compatibilité</span>
                  <span>{extension.compatibility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Catégorie</span>
                  <span>{extension.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Installations</span>
                  <span>1,245+</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Extensions similaires</h3>
              <div className="space-y-3">
                {extensions
                  .filter((ext) => ext.id !== extensionId)
                  .slice(0, 2)
                  .map((ext) => (
                    <div key={ext.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={ext.icon || "/placeholder.svg"}
                          alt={`${ext.name} icon`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{ext.name}</div>
                        <div className="flex items-center">
                          {renderRatingStars(ext.rating)}
                          <span className="text-xs text-muted-foreground ml-1">({ext.reviews})</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/dashboard/${restaurantId}/extensions/${ext.id}`)}
                      >
                        Voir
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
