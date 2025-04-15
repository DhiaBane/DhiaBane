"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Calendar, ChefHat, Clock, Home, MessageSquare, Settings, ShoppingBag, Users } from "lucide-react"

export default function MobileAppPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">RestauPilot Mobile</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="ml-2">
              Manager
            </Badge>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Tabs defaultValue="dashboard" className="space-y-4" onValueChange={setActiveTab}>
          <TabsContent value="dashboard" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Tableau de bord</CardTitle>
                <CardDescription>Vue d'ensemble de votre restaurant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Chiffre du jour</div>
                    <div className="mt-1 text-2xl font-bold">1,250 €</div>
                    <div className="mt-1 text-xs text-muted-foreground">+12% vs hier</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Clients</div>
                    <div className="mt-1 text-2xl font-bold">48</div>
                    <div className="mt-1 text-xs text-muted-foreground">8 en attente</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Réservations</div>
                    <div className="mt-1 text-2xl font-bold">12</div>
                    <div className="mt-1 text-xs text-muted-foreground">3 nouvelles</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Commandes</div>
                    <div className="mt-1 text-2xl font-bold">24</div>
                    <div className="mt-1 text-xs text-muted-foreground">5 en préparation</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Alertes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 rounded-lg border p-3">
                    <div className="rounded-full bg-red-100 p-1">
                      <ShoppingBag className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Stock faible: Entrecôte</p>
                      <p className="text-xs text-muted-foreground">Reste 2 portions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Commander
                    </Button>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg border p-3">
                    <div className="rounded-full bg-amber-100 p-1">
                      <Users className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Réservation groupe</p>
                      <p className="text-xs text-muted-foreground">12 personnes à 20h00</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Voir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-blue-100 p-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm">Nouvelle réservation pour 4 personnes</p>
                      <p className="text-xs text-muted-foreground">Il y a 10 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-green-100 p-1">
                      <ShoppingBag className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm">Commande #1234 terminée</p>
                      <p className="text-xs text-muted-foreground">Il y a 25 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-purple-100 p-1">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm">Nouvel avis client (4.5★)</p>
                      <p className="text-xs text-muted-foreground">Il y a 45 minutes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Voir toute l'activité
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Commandes en cours</CardTitle>
                <CardDescription>Gérez les commandes en temps réel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-amber-100 p-1">
                        <ChefHat className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Table 5 - Commande #1238</p>
                        <p className="text-xs text-muted-foreground">2 entrées, 4 plats, 4 desserts</p>
                      </div>
                    </div>
                    <Badge>En préparation</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-green-100 p-1">
                        <ChefHat className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Table 3 - Commande #1237</p>
                        <p className="text-xs text-muted-foreground">3 entrées, 3 plats</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Prêt à servir</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-blue-100 p-1">
                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Livraison - Commande #1236</p>
                        <p className="text-xs text-muted-foreground">2 plats, 1 dessert</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-500">En attente</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Voir toutes les commandes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nouvelles commandes</CardTitle>
                <CardDescription>Commandes à traiter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Table 8 - 2 personnes</p>
                      <Badge>Nouvelle</Badge>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>1x Salade Niçoise</span>
                        <span>12.50 €</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>1x Steak Frites</span>
                        <span>24.00 €</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>2x Verre de vin</span>
                        <span>16.00 €</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button size="sm">Accepter</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Réservations du jour</CardTitle>
                <CardDescription>Gérez les réservations en temps réel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-green-100 p-1">
                        <Clock className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Dupont - 4 personnes</p>
                        <p className="text-xs text-muted-foreground">19:30 - Table 7</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Confirmée</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-amber-100 p-1">
                        <Clock className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Martin - 2 personnes</p>
                        <p className="text-xs text-muted-foreground">20:00 - Table 3</p>
                      </div>
                    </div>
                    <Badge>En attente</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-purple-100 p-1">
                        <Users className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Entreprise ABC - 8 personnes</p>
                        <p className="text-xs text-muted-foreground">21:00 - Tables 10-11</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Confirmée</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Voir toutes les réservations
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nouvelle réservation</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom
                    </label>
                    <Input id="name" placeholder="Nom du client" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="guests" className="text-sm font-medium">
                      Nombre de personnes
                    </label>
                    <Input id="guests" type="number" min="1" placeholder="2" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Date et heure
                    </label>
                    <Input id="date" type="datetime-local" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      Notes
                    </label>
                    <Input id="notes" placeholder="Informations supplémentaires" />
                  </div>
                  <Button className="w-full">Créer réservation</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performances du jour</CardTitle>
                <CardDescription>Statistiques en temps réel</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">Graphique des ventes par heure</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Top produits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <div className="ml-4 space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">Steak Frites</p>
                        <p className="text-sm text-muted-foreground">12 vendus</p>
                      </div>
                      <div className="ml-auto font-medium">24%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div className="ml-4 space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">Tiramisu</p>
                        <p className="text-sm text-muted-foreground">8 vendus</p>
                      </div>
                      <div className="ml-auto font-medium">16%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div className="ml-4 space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">Salade Niçoise</p>
                        <p className="text-sm text-muted-foreground">6 vendus</p>
                      </div>
                      <div className="ml-auto font-medium">12%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Prévisions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Chiffre d'affaires</p>
                        <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                      </div>
                      <div className="text-sm font-medium">2,450 €</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Clients</p>
                        <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                      </div>
                      <div className="text-sm font-medium">85</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Panier moyen</p>
                        <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                      </div>
                      <div className="text-sm font-medium">48.50 €</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de l'application</CardTitle>
                <CardDescription>Gérez vos préférences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Notifications</p>
                    <p className="text-xs text-muted-foreground">Recevoir des alertes</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Configurer
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Synchronisation</p>
                    <p className="text-xs text-muted-foreground">Dernière: il y a 5 min</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Synchroniser
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Thème</p>
                    <p className="text-xs text-muted-foreground">Clair/Sombre</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Changer
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Déconnexion
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>À propos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  RestauPilot Mobile v1.0.0
                  <br />© 2025 RestauPilot. Tous droits réservés.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 z-10 bg-white border-t">
        <nav className="flex justify-around p-2">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            size="icon"
            onClick={() => setActiveTab("dashboard")}
            className="flex flex-col items-center py-2"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Accueil</span>
          </Button>
          <Button
            variant={activeTab === "orders" ? "default" : "ghost"}
            size="icon"
            onClick={() => setActiveTab("orders")}
            className="flex flex-col items-center py-2"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">Commandes</span>
          </Button>
          <Button
            variant={activeTab === "reservations" ? "default" : "ghost"}
            size="icon"
            onClick={() => setActiveTab("reservations")}
            className="flex flex-col items-center py-2"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Réservations</span>
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "ghost"}
            size="icon"
            onClick={() => setActiveTab("analytics")}
            className="flex flex-col items-center py-2"
          >
            <BarChart className="h-5 w-5" />
            <span className="text-xs mt-1">Analyses</span>
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            size="icon"
            onClick={() => setActiveTab("settings")}
            className="flex flex-col items-center py-2"
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Paramètres</span>
          </Button>
        </nav>
      </div>
    </div>
  )
}
