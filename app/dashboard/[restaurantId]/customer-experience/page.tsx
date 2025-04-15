"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Users, Gift, QrCode, MessageSquare, Bell, RefreshCw, Smartphone } from "lucide-react"

export default function CustomerExperiencePage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [activeTab, setActiveTab] = useState("personalization")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Sparkles className="mr-2 h-8 w-8 text-primary" />
              Expérience Client Augmentée
            </h1>
            <p className="text-muted-foreground">
              Outils avancés pour personnaliser et améliorer l'expérience de vos clients
            </p>
          </div>
          <Button onClick={() => setIsLoading((prev) => !prev)} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Actualisation..." : "Actualiser"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personalization">
              <Users className="mr-2 h-4 w-4" />
              Personnalisation
            </TabsTrigger>
            <TabsTrigger value="loyalty">
              <Gift className="mr-2 h-4 w-4" />
              Fidélité avancée
            </TabsTrigger>
            <TabsTrigger value="digital">
              <QrCode className="mr-2 h-4 w-4" />
              Expérience digitale
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <MessageSquare className="mr-2 h-4 w-4" />
              Feedback en temps réel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personalization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personnalisation client</CardTitle>
                <CardDescription>
                  Créez des expériences sur mesure pour chaque client en fonction de ses préférences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Préférences automatiques</h3>
                    <p className="text-sm text-muted-foreground">
                      Le système détecte automatiquement les préférences des clients en fonction de leurs commandes
                      précédentes
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-detect">Détection automatique</Label>
                          <Switch id="auto-detect" defaultChecked />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Analyse les commandes passées pour identifier les préférences
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="suggest-items">Suggestions personnalisées</Label>
                          <Switch id="suggest-items" defaultChecked />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Suggère des plats en fonction des préférences détectées
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="special-occasions">Occasions spéciales</Label>
                          <Switch id="special-occasions" defaultChecked />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Détecte et enregistre les occasions spéciales (anniversaires, etc.)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="dietary-prefs">Préférences alimentaires</Label>
                          <Switch id="dietary-prefs" defaultChecked />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Enregistre les restrictions et préférences alimentaires
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Personnalisation de l'accueil</h3>
                    <p className="text-sm text-muted-foreground">
                      Personnalisez l'accueil de vos clients fidèles pour une expérience VIP
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Message d'accueil</Label>
                        <Textarea
                          placeholder="Bonjour [prénom], ravi de vous revoir ! Votre table préférée vous attend."
                          className="resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Critères d'éligibilité</Label>
                        <Select defaultValue="visits">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un critère" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="visits">Nombre de visites (5+)</SelectItem>
                            <SelectItem value="spending">Dépenses totales (500€+)</SelectItem>
                            <SelectItem value="vip">Statut VIP</SelectItem>
                            <SelectItem value="all">Tous les clients</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="staff-notification">Notification au personnel</Label>
                      <Switch id="staff-notification" defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Notifie le personnel de l'arrivée d'un client fidèle avec ses préférences
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  La personnalisation augmente la fidélité client de 25% en moyenne
                </p>
                <Button>Enregistrer les paramètres</Button>
              </CardFooter>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Segments clients</CardTitle>
                  <CardDescription>Groupes de clients avec des préférences similaires</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Amateurs de vin</h3>
                        <Badge>124 clients</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Clients qui commandent régulièrement du vin avec leur repas
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          Gérer
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Végétariens</h3>
                        <Badge>87 clients</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Clients qui préfèrent les options végétariennes
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          Gérer
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Clients du weekend</h3>
                        <Badge>215 clients</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Clients qui viennent principalement le weekend
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          Gérer
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Clients business</h3>
                        <Badge>68 clients</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Clients qui viennent pour des repas d'affaires
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          Gérer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Créer un nouveau segment
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campagnes personnalisées</CardTitle>
                  <CardDescription>Créez des offres ciblées pour vos segments clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Soirée dégustation de vin</h3>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pour le segment "Amateurs de vin" - 15% de réduction
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Menu végétarien spécial</h3>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pour le segment "Végétariens" - Nouveau menu dégustation
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Brunch du dimanche</h3>
                        <Badge className="bg-yellow-500">Planifiée</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pour le segment "Clients du weekend" - Lancement le 20/05
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Formule déjeuner express</h3>
                        <Badge className="bg-red-500">Terminée</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pour le segment "Clients business" - 22% de conversion
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          Voir rapport
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Créer une nouvelle campagne</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Programme de fidélité avancé</CardTitle>
                <CardDescription>
                  Configurez un programme de fidélité multi-niveaux avec des récompenses personnalisées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Niveau Bronze</h3>
                        <Badge variant="outline">0-500 points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Niveau d'entrée pour tous les nouveaux clients</p>
                      <div className="space-y-1 mt-4">
                        <p className="text-sm">Avantages:</p>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li>5% de réduction sur l'addition</li>
                          <li>Cadeau d'anniversaire</li>
                          <li>1 point par euro dépensé</li>
                        </ul>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        Modifier
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Niveau Argent</h3>
                        <Badge variant="outline">501-1500 points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Pour les clients réguliers</p>
                      <div className="space-y-1 mt-4">
                        <p className="text-sm">Avantages:</p>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li>10% de réduction sur l'addition</li>
                          <li>Accès prioritaire aux réservations</li>
                          <li>1,5 points par euro dépensé</li>
                          <li>Dessert offert à chaque visite</li>
                        </ul>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        Modifier
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Niveau Or</h3>
                        <Badge variant="outline">1501+ points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Pour les clients VIP</p>
                      <div className="space-y-1 mt-4">
                        <p className="text-sm">Avantages:</p>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li>15% de réduction sur l'addition</li>
                          <li>Table préférée garantie</li>
                          <li>2 points par euro dépensé</li>
                          <li>Apéritif offert à chaque visite</li>
                          <li>Invitations aux événements exclusifs</li>
                        </ul>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        Modifier
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Paramètres du programme</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Nom du programme</Label>
                        <Input defaultValue="Club Gourmet" />
                      </div>
                      <div className="space-y-2">
                        <Label>Durée de validité des points</Label>
                        <Select defaultValue="12">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une durée" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 mois</SelectItem>
                            <SelectItem value="12">12 mois</SelectItem>
                            <SelectItem value="24">24 mois</SelectItem>
                            <SelectItem value="0">Pas d'expiration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Taux de conversion</Label>
                        <Input defaultValue="1€ = 1 point" />
                      </div>
                      <div className="space-y-2">
                        <Label>Valeur des points</Label>
                        <Input defaultValue="100 points = 5€ de réduction" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Label htmlFor="auto-enroll">Inscription automatique</Label>
                      <Switch id="auto-enroll" defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Inscrire automatiquement les nouveaux clients au programme de fidélité
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Récompenses personnalisées</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-medium">Dégustation de vin privée</p>
                          <p className="text-sm text-muted-foreground">1000 points</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-medium">Cours de cuisine avec le chef</p>
                          <p className="text-sm text-muted-foreground">2500 points</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-medium">Dîner pour deux offert</p>
                          <p className="text-sm text-muted-foreground">5000 points</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Ajouter une récompense
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">Dernière modification: 10/04/2025</p>
                <Button>Enregistrer les modifications</Button>
              </CardFooter>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques du programme</CardTitle>
                  <CardDescription>Performance de votre programme de fidélité</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Membres actifs</p>
                        <p className="text-2xl font-bold">487</p>
                        <p className="text-xs text-green-500">+12% ce mois</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Points émis</p>
                        <p className="text-2xl font-bold">24,568</p>
                        <p className="text-xs text-green-500">+8% ce mois</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Points échangés</p>
                        <p className="text-2xl font-bold">12,345</p>
                        <p className="text-xs text-green-500">+15% ce mois</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Taux d'échange</p>
                        <p className="text-2xl font-bold">50.2%</p>
                        <p className="text-xs text-green-500">+3% ce mois</p>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg space-y-2">
                      <h3 className="font-medium">Répartition des membres</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Bronze</p>
                          <p className="text-sm font-medium">312 (64%)</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Argent</p>
                          <p className="text-sm font-medium">142 (29%)</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Or</p>
                          <p className="text-sm font-medium">33 (7%)</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg space-y-2">
                      <h3 className="font-medium">Récompenses les plus populaires</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Dessert offert</p>
                          <p className="text-sm font-medium">215 échanges</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Réduction de 10%</p>
                          <p className="text-sm font-medium">187 échanges</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Apéritif offert</p>
                          <p className="text-sm font-medium">124 échanges</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir le rapport complet
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication avec les membres</CardTitle>
                  <CardDescription>Gérez les communications avec vos membres fidélité</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg space-y-2">
                      <h3 className="font-medium">Notifications automatiques</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Bienvenue au programme</p>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Changement de niveau</p>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Points sur le point d'expirer</p>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Rappel d'anniversaire</p>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Offres spéciales membres</p>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg space-y-2">
                      <h3 className="font-medium">Campagnes programmées</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Double points weekend</p>
                            <p className="text-xs text-muted-foreground">Tous les membres - 18-19/05</p>
                          </div>
                          <Badge className="bg-yellow-500">Planifiée</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Réactivation membres inactifs</p>
                            <p className="text-xs text-muted-foreground">Membres inactifs - 20/05</p>
                          </div>
                          <Badge className="bg-yellow-500">Planifiée</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Événement membres Or</p>
                            <p className="text-xs text-muted-foreground">Membres Or - 25/05</p>
                          </div>
                          <Badge className="bg-yellow-500">Planifiée</Badge>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Créer une nouvelle campagne</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="digital" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expérience digitale client</CardTitle>
                <CardDescription>
                  Outils digitaux pour améliorer l'expérience client avant, pendant et après le repas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center">
                        <QrCode className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">Menu digital interactif</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Menu accessible par QR code avec photos, descriptions détaillées et filtres
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge className="bg-green-500">Actif</Badge>
                        <Button variant="outline" size="sm">
                          Configurer
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center">
                        <Smartphone className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">Application mobile</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Application dédiée pour réservations, commandes et programme de fidélité
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge className="bg-green-500">Actif</Badge>
                        <Button variant="outline" size="sm">
                          Configurer
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">Notifications personnalisées</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Notifications push et emails personnalisés selon les préférences client
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge className="bg-green-500">Actif</Badge>
                        <Button variant="outline" size="sm">
                          Configurer
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Configuration du menu digital</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Style du menu</Label>
                        <Select defaultValue="modern">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="classic">Classique</SelectItem>
                            <SelectItem value="modern">Moderne</SelectItem>
                            <SelectItem value="minimal">Minimaliste</SelectItem>
                            <SelectItem value="elegant">Élégant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Langue par défaut</Label>
                        <Select defaultValue="fr">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une langue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">Anglais</SelectItem>
                            <SelectItem value="es">Espagnol</SelectItem>
                            <SelectItem value="de">Allemand</SelectItem>
                            <SelectItem value="it">Italien</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-allergens">Afficher les allergènes</Label>
                          <Switch id="show-allergens" defaultChecked />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Affiche les informations sur les allergènes pour chaque plat
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-calories">Afficher les calories</Label>
                          <Switch id="show-calories" defaultChecked />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Affiche les informations nutritionnelles pour chaque plat
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-reviews">Afficher les avis</Label>
                          <Switch id="show-reviews" defaultChecked />
                        </div>
                        <p className="text-xs text-muted-foreground">Affiche les avis clients pour chaque plat</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-recommendations">Recommandations personnalisées</Label>
                          <Switch id="show-recommendations" defaultChecked />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Affiche des recommandations basées sur l'historique du client
                        </p>
                      </div>
                    </div>
                    <Button className="w-full mt-2">Enregistrer les paramètres</Button>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Intégration avec les réseaux sociaux</h3>
                    <p className="text-sm text-muted-foreground">
                      Connectez votre expérience digitale avec les réseaux sociaux pour plus d'engagement
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="instagram-integration">Intégration Instagram</Label>
                        <Switch id="instagram-integration" defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Permet aux clients de partager facilement leur expérience sur Instagram
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="facebook-integration">Intégration Facebook</Label>
                        <Switch id="facebook-integration" defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Permet aux clients de partager facilement leur expérience sur Facebook
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tiktok-integration">Intégration TikTok</Label>
                        <Switch id="tiktok-integration" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Permet aux clients de créer facilement des vidéos TikTok dans votre restaurant
                      </p>
                    </div>

                    <Button variant="outline" className="w-full mt-2">
                      Configurer les intégrations
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  L'expérience digitale peut augmenter l'engagement client de 40%
                </p>
                <Button>Aperçu du menu digital</Button>
              </CardFooter>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques d'utilisation</CardTitle>
                  <CardDescription>Mesures d'utilisation des outils digitaux</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Scans de QR code</p>
                        <p className="text-2xl font-bold">1,245</p>
                        <p className="text-xs text-green-500">+18% ce mois</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Utilisateurs app</p>
                        <p className="text-2xl font-bold">387</p>
                        <p className="text-xs text-green-500">+12% ce mois</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Partages sociaux</p>
                        <p className="text-2xl font-bold">215</p>
                        <p className="text-xs text-green-500">+25% ce mois</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Commandes digitales</p>
                        <p className="text-2xl font-bold">568</p>
                        <p className="text-xs text-green-500">+15% ce mois</p>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg space-y-2">
                      <h3 className="font-medium">Pages les plus visitées</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Menu principal</p>
                          <p className="text-sm font-medium">42%</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Réservations</p>
                          <p className="text-sm font-medium">28%</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Programme de fidélité</p>
                          <p className="text-sm font-medium">15%</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Événements</p>
                          <p className="text-sm font-medium">10%</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">À propos</p>
                          <p className="text-sm font-medium">5%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir le rapport complet
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Réalité augmentée</CardTitle>
                  <CardDescription>Expériences de réalité augmentée pour vos clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg space-y-2">
                      <h3 className="font-medium">Fonctionnalités AR</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Visualisation des plats en 3D</p>
                            <p className="text-xs text-muted-foreground">Voir les plats en 3D avant de commander</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Visite virtuelle du restaurant</p>
                            <p className="text-xs text-muted-foreground">Explorer le restaurant en réalité augmentée</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Filtres photo personnalisés</p>
                            <p className="text-xs text-muted-foreground">Filtres AR pour les photos des clients</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Jeux AR interactifs</p>
                            <p className="text-xs text-muted-foreground">Jeux en réalité augmentée pendant l'attente</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg space-y-2">
                      <h3 className="font-medium">Statistiques d'utilisation AR</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Visualisations de plats</p>
                          <p className="text-sm font-medium">324 ce mois</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Visites virtuelles</p>
                          <p className="text-sm font-medium">156 ce mois</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Photos avec filtres</p>
                          <p className="text-sm font-medium">215 ce mois</p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Gérer les expériences AR</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Feedback en temps réel</CardTitle>
                <CardDescription>Collectez et analysez les retours clients pendant leur expérience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg space-y-2">
                      <h3 className="font-medium">Méthodes de collecte</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">QR code sur table</p>
                            <p className="text-xs text-muted-foreground">Feedback via QR code sur la table</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Notification dans l'app</p>
                            <p className="text-xs text-muted-foreground">Demande de feedback via l'application</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">SMS après repas</p>
                            <p className="text-xs text-muted-foreground">Envoi d'un SMS après le repas</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Tablette à la sortie</p>
                            <p className="text-xs text-muted-foreground">Tablette pour feedback à la sortie</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg space-y-2">
                      <h3 className="font-medium">Paramètres de feedback</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Moment de la demande</Label>
                          <Select defaultValue="during">
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un moment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="during">Pendant le repas</SelectItem>
                              <SelectItem value="end">À la fin du repas</SelectItem>
                              <SelectItem value="after">Après le départ (30 min)</SelectItem>
                              <SelectItem value="next-day">Le lendemain</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Format du feedback</Label>
                          <Select defaultValue="quick">
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="quick">Rapide (émojis)</SelectItem>
                              <SelectItem value="short">Court (5 questions)</SelectItem>
                              <SelectItem value="detailed">Détaillé (10+ questions)</SelectItem>
                              <SelectItem value="adaptive">Adaptatif (selon le client)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="incentivize">Incitation au feedback</Label>
                          <Switch id="incentivize" defaultChecked />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Offrir des points de fidélité pour les feedbacks complets
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Alertes en temps réel</h3>
                    <p className="text-sm text-muted-foreground">
                      Configurez des alertes pour réagir immédiatement aux feedbacks négatifs
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Alerte feedback négatif</p>
                          <p className="text-xs text-muted-foreground">Notification immédiate pour les notes ≤ 2/5</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="space-y-2">
                        <Label>Destinataires des alertes</Label>
                        <Select defaultValue="manager">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner les destinataires" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manager">Manager uniquement</SelectItem>
                            <SelectItem value="staff">Personnel concerné</SelectItem>
                            <SelectItem value="all">Toute l'équipe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Méthode d'alerte</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une méthode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="app">Notification dans l'app</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="all">Toutes les méthodes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Message de réponse automatique</Label>
                        <Textarea
                          placeholder="Nous sommes désolés de votre expérience. Un responsable va vous contacter rapidement pour résoudre ce problème."
                          className="resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-medium">Tableau de bord en temps réel</h3>
                    <p className="text-sm text-muted-foreground">
                      Visualisez les feedbacks clients en temps réel pendant le service
                    </p>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Score moyen aujourd'hui</p>
                        <p className="text-2xl font-bold">4.7/5</p>
                        <p className="text-xs text-green-500">+0.2 vs hier</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Feedbacks reçus</p>
                        <p className="text-2xl font-bold">28</p>
                        <p className="text-xs text-muted-foreground">sur 42 clients</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Problèmes résolus</p>
                        <p className="text-2xl font-bold">3/3</p>
                        <p className="text-xs text-green-500">100% résolution</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Ouvrir le tableau de bord en temps réel
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  La résolution rapide des problèmes augmente la fidélité client de 95%
                </p>
                <Button>Enregistrer les paramètres</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
