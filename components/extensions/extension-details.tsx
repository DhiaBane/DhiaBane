"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Star, Download, Check, Settings, ExternalLink, MessageSquare } from "lucide-react"
import type { Extension } from "@/types/extensions"
import { ExtensionStatusBadge } from "./extension-status-badge"

interface ExtensionDetailsProps {
  extension: Extension
  onInstall: (extension: Extension) => void
  onUninstall: (extension: Extension) => void
}

export function ExtensionDetails({ extension, onInstall, onUninstall }: ExtensionDetailsProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [installing, setInstalling] = useState(false)
  const [progress, setProgress] = useState(0)

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

  // Fonction pour formater le prix
  const formatPrice = (price: number | "Gratuit"): string => {
    if (price === "Gratuit") return "Gratuit"
    return `${price.toFixed(2)} €`
  }

  // Fonction pour simuler l'installation
  const handleInstall = () => {
    setInstalling(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setInstalling(false)
            onInstall(extension)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
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
                  <ExtensionStatusBadge status={extension.status} />
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
                        Indispensable pour notre restaurant ! Les statistiques de scan nous aident à comprendre comment
                        nos clients interagissent avec notre menu. Le support client est également très réactif.
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
                    onClick={() =>
                      router.push(`/dashboard/${extension.restaurantId}/extensions/settings/${extension.id}`)
                    }
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                  <Button variant="destructive" className="w-full" onClick={() => onUninstall(extension)}>
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
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Téléchargement...</span>
                      <span>{progress}%</span>
                    </div>
                    {progress >= 100 && (
                      <div className="flex items-center justify-center text-green-500">
                        <Check className="h-5 w-5 mr-2" />
                        <span>Installation terminée !</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button className="w-full" onClick={handleInstall}>
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
                <span className="text-muted-foreground">Statut</span>
                <ExtensionStatusBadge status={extension.status} className="ml-auto" />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Installations</span>
                <span>1,245+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
