"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Home, Menu, Search, Settings, Users } from "lucide-react"

export default function MobileAppPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [restaurantId, setRestaurantId] = useState("rest-001")
  const [activeTab, setActiveTab] = useState("tables")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simuler une connexion réussie
    if (username && password) {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">RestauPilot Mobile</CardTitle>
            <CardDescription>Connectez-vous pour accéder à l'application</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-sm font-medium">Le Gourmet Français</h1>
              <p className="text-xs text-muted-foreground">Serveur: {username}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsContent value="tables" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-base">Table 1</CardTitle>
                  <CardDescription className="text-xs">4 personnes</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <Badge className="bg-green-500">Disponible</Badge>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-base">Table 2</CardTitle>
                  <CardDescription className="text-xs">2 personnes</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <Badge className="bg-yellow-500">Commande en cours</Badge>
                  <div className="mt-2 text-xs">
                    <p>Arrivée: 19:30</p>
                    <p>Temps écoulé: 45 min</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-base">Table 3</CardTitle>
                  <CardDescription className="text-xs">6 personnes</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <Badge className="bg-blue-500">En attente de paiement</Badge>
                  <div className="mt-2 text-xs">
                    <p>Total: 187,50 €</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-base">Table 4</CardTitle>
                  <CardDescription className="text-xs">2 personnes</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <Badge className="bg-purple-500">Réservée</Badge>
                  <div className="mt-2 text-xs">
                    <p>20:00 - Dupont</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-base">Table 5</CardTitle>
                  <CardDescription className="text-xs">4 personnes</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <Badge className="bg-green-500">Disponible</Badge>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-base">Table 6</CardTitle>
                  <CardDescription className="text-xs">8 personnes</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <Badge className="bg-red-500">Maintenance</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader className="p-3 pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Table 2</CardTitle>
                    <Badge className="bg-yellow-500">En cours</Badge>
                  </div>
                  <CardDescription className="text-xs">Commande #1234 - 19:30</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>1x Salade César</span>
                      <span>12,50 €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>2x Entrecôte</span>
                      <span>52,00 €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>1x Saumon grillé</span>
                      <span>18,90 €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>3x Verre de vin</span>
                      <span>18,00 €</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-between">
                  <div className="text-sm font-medium">Total: 101,40 €</div>
                  <Button size="sm">Détails</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-3 pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Table 3</CardTitle>
                    <Badge className="bg-blue-500">Paiement</Badge>
                  </div>
                  <CardDescription className="text-xs">Commande #1235 - 20:15</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>2x Foie gras</span>
                      <span>36,00 €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>1x Côte de bœuf (2 pers.)</span>
                      <span>65,00 €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>1x Plateau de fromages</span>
                      <span>14,50 €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>1x Bouteille Bordeaux</span>
                      <span>45,00 €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>2x Dessert du jour</span>
                      <span>18,00 €</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-between">
                  <div className="text-sm font-medium">Total: 187,50 €</div>
                  <Button size="sm">Encaisser</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="menu" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Input placeholder="Rechercher un plat..." className="flex-1" />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <Tabs defaultValue="starters">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="starters">Entrées</TabsTrigger>
                <TabsTrigger value="mains">Plats</TabsTrigger>
                <TabsTrigger value="desserts">Desserts</TabsTrigger>
                <TabsTrigger value="drinks">Boissons</TabsTrigger>
              </TabsList>

              <TabsContent value="starters" className="space-y-2">
                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-base">Salade César</CardTitle>
                    <CardDescription className="text-xs">
                      Laitue romaine, parmesan, croûtons, sauce César
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">12,50 €</div>
                      <Badge className="bg-green-500">Disponible</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-base">Foie gras maison</CardTitle>
                    <CardDescription className="text-xs">
                      Foie gras de canard, chutney de figues, pain brioché
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">18,00 €</div>
                      <Badge className="bg-green-500">Disponible</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mains" className="space-y-2">
                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-base">Entrecôte</CardTitle>
                    <CardDescription className="text-xs">
                      Entrecôte de bœuf, sauce au poivre, frites maison
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">26,00 €</div>
                      <Badge className="bg-green-500">Disponible</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-base">Saumon grillé</CardTitle>
                    <CardDescription className="text-xs">
                      Filet de saumon, légumes de saison, sauce hollandaise
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">18,90 €</div>
                      <Badge className="bg-green-500">Disponible</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="desserts" className="space-y-2">
                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-base">Crème brûlée</CardTitle>
                    <CardDescription className="text-xs">Crème brûlée à la vanille de Madagascar</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">8,50 €</div>
                      <Badge className="bg-green-500">Disponible</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-base">Tarte Tatin</CardTitle>
                    <CardDescription className="text-xs">Tarte aux pommes caramélisées, glace vanille</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">9,00 €</div>
                      <Badge className="bg-green-500">Disponible</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="drinks" className="space-y-2">
                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-base">Verre de vin</CardTitle>
                    <CardDescription className="text-xs">Sélection du sommelier (rouge, blanc, rosé)</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">6,00 €</div>
                      <Badge className="bg-green-500">Disponible</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-base">Bouteille Bordeaux</CardTitle>
                    <CardDescription className="text-xs">Château Margaux 2018</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">45,00 €</div>
                      <Badge className="bg-green-500">Disponible</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="reservations" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader className="p-3 pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Aujourd'hui</CardTitle>
                    <Badge className="bg-blue-500">8 réservations</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">19:00 - Dupont</div>
                        <div className="text-xs text-muted-foreground">4 personnes - Table 2</div>
                      </div>
                      <Badge className="bg-green-500">Confirmée</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">19:30 - Martin</div>
                        <div className="text-xs text-muted-foreground">2 personnes - Table 4</div>
                      </div>
                      <Badge className="bg-green-500">Confirmée</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">20:00 - Leroy</div>
                        <div className="text-xs text-muted-foreground">6 personnes - Table 6</div>
                      </div>
                      <Badge className="bg-yellow-500">En attente</Badge>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-end">
                  <Button size="sm">Voir tout</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-3 pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Demain</CardTitle>
                    <Badge className="bg-blue-500">5 réservations</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">12:30 - Dubois</div>
                        <div className="text-xs text-muted-foreground">3 personnes - Table 3</div>
                      </div>
                      <Badge className="bg-green-500">Confirmée</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">20:00 - Moreau</div>
                        <div className="text-xs text-muted-foreground">2 personnes - Table 1</div>
                      </div>
                      <Badge className="bg-green-500">Confirmée</Badge>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-end">
                  <Button size="sm">Voir tout</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 z-10 bg-white border-t">
        <div className="grid grid-cols-4">
          <Button
            variant="ghost"
            className={`flex flex-col items-center justify-center rounded-none h-16 ${
              activeTab === "tables" ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveTab("tables")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Tables</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center justify-center rounded-none h-16 ${
              activeTab === "orders" ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <Clock className="h-5 w-5" />
            <span className="text-xs mt-1">Commandes</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center justify-center rounded-none h-16 ${
              activeTab === "menu" ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveTab("menu")}
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-1">Menu</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center justify-center rounded-none h-16 ${
              activeTab === "reservations" ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveTab("reservations")}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Réservations</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
