"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, Download, Filter, RefreshCw, Mail, Gift, Users, Star, MessageSquare, Bell } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Composant pour les campagnes marketing
const MarketingCampaign = ({
  title,
  description,
  status,
  startDate,
  endDate,
  budget,
  spent,
  reach,
}: {
  title: string
  description: string
  status: "active" | "scheduled" | "completed" | "draft"
  startDate: string
  endDate: string
  budget: string
  spent: string
  reach: number
}) => {
  const statusColor =
    status === "active"
      ? "bg-green-100 text-green-800"
      : status === "scheduled"
        ? "bg-blue-100 text-blue-800"
        : status === "completed"
          ? "bg-gray-100 text-gray-800"
          : "bg-yellow-100 text-yellow-800"

  const progress =
    status === "active"
      ? Math.floor(
          (Number.parseInt(spent.replace(/[^0-9]/g, "")) / Number.parseInt(budget.replace(/[^0-9]/g, ""))) * 100,
        )
      : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge className={statusColor}>{status}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Période</div>
            <div className="font-medium">
              {startDate} - {endDate}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Budget</div>
            <div className="font-medium">
              {spent} / {budget}
            </div>
          </div>
        </div>
        {status === "active" && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression du budget</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-1">Portée estimée</div>
          <div className="font-medium">{reach.toLocaleString()} personnes</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Modifier
        </Button>
        <Button size="sm">Voir les détails</Button>
      </CardFooter>
    </Card>
  )
}

// Composant pour les clients fidèles
const LoyalCustomer = ({
  name,
  email,
  points,
  visits,
  lastVisit,
  status,
  avatar,
}: {
  name: string
  email: string
  points: number
  visits: number
  lastVisit: string
  status: "actif" | "inactif"
  avatar: string
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{email}</div>
        </div>
      </div>
      <div className="text-center">
        <div className="font-medium">{points}</div>
        <div className="text-sm text-muted-foreground">points</div>
      </div>
      <div className="text-center">
        <div className="font-medium">{visits}</div>
        <div className="text-sm text-muted-foreground">visites</div>
      </div>
      <div>{lastVisit}</div>
      <Badge className={status === "actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
        {status}
      </Badge>
      <Button variant="outline" size="sm">
        Voir
      </Button>
    </div>
  )
}

export default function MarketingPage() {
  const [exportFormat, setExportFormat] = useState<string>("pdf")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleExport = () => {
    setIsLoading(true)
    // Simuler un export
    setTimeout(() => {
      setIsLoading(false)
      alert(`Rapport exporté en format ${exportFormat.toUpperCase()}`)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Marketing et Fidélité</h2>
          <div className="flex items-center gap-2">
            <CalendarDateRangePicker />
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Exportation...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </>
              )}
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Retour au tableau de bord
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients fidèles</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-green-500">+5.2% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points distribués</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,567</div>
              <p className="text-xs text-green-500">+12.3% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campagnes actives</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Sur 8 campagnes totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux d'engagement</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <p className="text-xs text-green-500">+3.7% par rapport au mois dernier</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campagnes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campagnes">Campagnes</TabsTrigger>
            <TabsTrigger value="fidelite">Programme de fidélité</TabsTrigger>
            <TabsTrigger value="clients">Clients fidèles</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="campagnes" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Campagnes marketing</h3>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Nouvelle campagne
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <MarketingCampaign
                title="Promotion de printemps"
                description="Offres spéciales sur les plats de saison"
                status="active"
                startDate="01/04/2025"
                endDate="30/04/2025"
                budget="1,500 €"
                spent="750 €"
                reach={5000}
              />
              <MarketingCampaign
                title="Happy Hour Extended"
                description="Happy hour prolongé tous les jeudis"
                status="active"
                startDate="01/04/2025"
                endDate="31/05/2025"
                budget="800 €"
                spent="320 €"
                reach={3500}
              />
              <MarketingCampaign
                title="Menu dégustation été"
                description="Lancement du nouveau menu dégustation d'été"
                status="scheduled"
                startDate="01/06/2025"
                endDate="31/08/2025"
                budget="2,000 €"
                spent="0 €"
                reach={7500}
              />
              <MarketingCampaign
                title="Saint-Valentin"
                description="Menu spécial pour la Saint-Valentin"
                status="completed"
                startDate="10/02/2025"
                endDate="14/02/2025"
                budget="1,200 €"
                spent="1,150 €"
                reach={4200}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performances des campagnes</CardTitle>
                <CardDescription>Analyse des performances des campagnes marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campagne</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Portée</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead>ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Promotion de printemps</TableCell>
                      <TableCell>01/04/2025 - 30/04/2025</TableCell>
                      <TableCell>1,500 €</TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell>245 (4.9%)</TableCell>
                      <TableCell className="text-green-500">+32%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Happy Hour Extended</TableCell>
                      <TableCell>01/04/2025 - 31/05/2025</TableCell>
                      <TableCell>800 €</TableCell>
                      <TableCell>3,500</TableCell>
                      <TableCell>187 (5.3%)</TableCell>
                      <TableCell className="text-green-500">+28%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Saint-Valentin</TableCell>
                      <TableCell>10/02/2025 - 14/02/2025</TableCell>
                      <TableCell>1,200 €</TableCell>
                      <TableCell>4,200</TableCell>
                      <TableCell>312 (7.4%)</TableCell>
                      <TableCell className="text-green-500">+45%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nouvel An</TableCell>
                      <TableCell>15/12/2024 - 01/01/2025</TableCell>
                      <TableCell>1,800 €</TableCell>
                      <TableCell>6,500</TableCell>
                      <TableCell>378 (5.8%)</TableCell>
                      <TableCell className="text-green-500">+38%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fidelite" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Programme de fidélité</CardTitle>
                <CardDescription>Gérez votre programme de fidélité</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Statistiques du programme</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div className="font-medium">Clients inscrits</div>
                            <div className="text-xl font-bold">1,245</div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div className="font-medium">Points distribués (total)</div>
                            <div className="text-xl font-bold">124,567</div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div className="font-medium">Points utilisés (total)</div>
                            <div className="text-xl font-bold">87,345</div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div className="font-medium">Taux d'utilisation</div>
                            <div className="text-xl font-bold">70.1%</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Règles du programme</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">1€ dépensé = 1 point</div>
                              <div className="text-sm text-muted-foreground">Règle d'acquisition de points</div>
                            </div>
                            <Button variant="outline" size="sm">
                              Modifier
                            </Button>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <div className="font-medium">Récompenses disponibles</div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div>Dessert offert</div>
                                  <div className="text-sm text-muted-foreground">100 points</div>
                                </div>
                                <Button variant="outline" size="sm">
                                  Modifier
                                </Button>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <div>Réduction de 10%</div>
                                  <div className="text-sm text-muted-foreground">200 points</div>
                                </div>
                                <Button variant="outline" size="sm">
                                  Modifier
                                </Button>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <div>Repas pour 2 à -50%</div>
                                  <div className="text-sm text-muted-foreground">500 points</div>
                                </div>
                                <Button variant="outline" size="sm">
                                  Modifier
                                </Button>
                              </div>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Gift className="mr-2 h-4 w-4" />
                            Ajouter une récompense
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Historique des récompenses</CardTitle>
                      <CardDescription>Récompenses récemment utilisées</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Récompense</TableHead>
                            <TableHead>Points utilisés</TableHead>
                            <TableHead>Valeur</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>15/04/2025</TableCell>
                            <TableCell>Jean Dupont</TableCell>
                            <TableCell>Dessert offert</TableCell>
                            <TableCell>100</TableCell>
                            <TableCell>8.50 €</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>14/04/2025</TableCell>
                            <TableCell>Marie Lefevre</TableCell>
                            <TableCell>Réduction de 10%</TableCell>
                            <TableCell>200</TableCell>
                            <TableCell>12.45 €</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>12/04/2025</TableCell>
                            <TableCell>Pierre Blanc</TableCell>
                            <TableCell>Repas pour 2 à -50%</TableCell>
                            <TableCell>500</TableCell>
                            <TableCell>45.75 €</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>10/04/2025</TableCell>
                            <TableCell>Sophie Martin</TableCell>
                            <TableCell>Dessert offert</TableCell>
                            <TableCell>100</TableCell>
                            <TableCell>7.90 €</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Clients fidèles</CardTitle>
                <CardDescription>Gérez vos clients fidèles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Input placeholder="Rechercher un client..." className="max-w-sm" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actifs</SelectItem>
                      <SelectItem value="inactive">Inactifs</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                </div>

                <div className="border rounded-md">
                  <div className="grid grid-cols-6 p-4 bg-muted font-medium">
                    <div>Client</div>
                    <div>Points</div>
                    <div>Visites</div>
                    <div>Dernière visite</div>
                    <div>Statut</div>
                    <div></div>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <LoyalCustomer
                      name="Jean Dupont"
                      email="jean.dupont@example.com"
                      points={450}
                      visits={12}
                      lastVisit="15/04/2025"
                      status="actif"
                      avatar="/avatars/01.png"
                    />
                    <LoyalCustomer
                      name="Marie Lefevre"
                      email="marie.lefevre@example.com"
                      points={320}
                      visits={8}
                      lastVisit="14/04/2025"
                      status="actif"
                      avatar="/avatars/02.png"
                    />
                    <LoyalCustomer
                      name="Pierre Blanc"
                      email="pierre.blanc@example.com"
                      points={780}
                      visits={24}
                      lastVisit="12/04/2025"
                      status="actif"
                      avatar="/avatars/03.png"
                    />
                    <LoyalCustomer
                      name="Sophie Martin"
                      email="sophie.martin@example.com"
                      points={150}
                      visits={5}
                      lastVisit="10/04/2025"
                      status="actif"
                      avatar="/avatars/04.png"
                    />
                    <LoyalCustomer
                      name="Lucas Robert"
                      email="lucas.robert@example.com"
                      points={90}
                      visits={3}
                      lastVisit="28/03/2025"
                      status="inactif"
                      avatar="/avatars/05.png"
                    />
                  </ScrollArea>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Affichage de 5 clients sur 1,245</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="promotions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Promotions</CardTitle>
                <CardDescription>Gérez vos offres promotionnelles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Promotions actives</h3>
                  <Button>
                    <Gift className="mr-2 h-4 w-4" />
                    Nouvelle promotion
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Happy Hour",
                      description: "Boissons à -50% de 17h à 19h",
                      startDate: "01/04/2025",
                      endDate: "Permanent",
                      discount: "50%",
                      conditions: "Uniquement sur les boissons, du lundi au vendredi",
                      status: "active",
                    },
                    {
                      title: "Menu du jour",
                      description: "Entrée + Plat + Dessert à prix réduit",
                      startDate: "01/01/2025",
                      endDate: "Permanent",
                      discount: "15%",
                      conditions: "Uniquement le midi, du lundi au vendredi",
                      status: "active",
                    },
                    {
                      title: "Anniversaire",
                      description: "Dessert offert pour votre anniversaire",
                      startDate: "01/01/2025",
                      endDate: "Permanent",
                      discount: "100%",
                      conditions: "Sur présentation d'une pièce d'identité, le jour de l'anniversaire",
                      status: "active",
                    },
                    {
                      title: "Promotion de printemps",
                      description: "Réduction sur les plats de saison",
                      startDate: "01/04/2025",
                      endDate: "30/04/2025",
                      discount: "20%",
                      conditions: "Uniquement sur les plats marqués d'une étoile",
                      status: "active",
                    },
                  ].map((promo, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{promo.title}</CardTitle>
                          <Badge className="bg-green-100 text-green-800">Actif</Badge>
                        </div>
                        <CardDescription>{promo.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Période</div>
                            <div className="font-medium">
                              {promo.startDate} - {promo.endDate}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Réduction</div>
                            <div className="font-medium">{promo.discount}</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm text-muted-foreground mb-1">Conditions</div>
                          <div className="font-medium">{promo.conditions}</div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          Désactiver
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Gérez vos notifications marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Paramètres de notification</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Notifications par email</div>
                          <div className="text-sm text-muted-foreground">
                            Envoi d'emails pour les promotions et événements
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Notifications push</div>
                          <div className="text-sm text-muted-foreground">
                            Envoi de notifications push via l'application mobile
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">SMS</div>
                          <div className="text-sm text-muted-foreground">Envoi de SMS pour les offres spéciales</div>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Rappels d'anniversaire</div>
                          <div className="text-sm text-muted-foreground">
                            Envoi automatique d'une offre pour l'anniversaire des clients
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Modèles de notification</h3>
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Email de bienvenue</CardTitle>
                          <CardDescription>Envoyé aux nouveaux clients inscrits</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="font-medium">Sujet: Bienvenue chez RestoPilote !</div>
                            <div className="text-sm text-muted-foreground">
                              Contenu: Bienvenue dans notre programme de fidélité ! Nous sommes ravis de vous compter
                              parmi nos clients privilégiés. Voici votre code de bienvenue pour obtenir 10% de réduction
                              sur votre prochaine visite...
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Notification de promotion</CardTitle>
                          <CardDescription>Envoyée lors du lancement d'une nouvelle promotion</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="font-medium">Sujet: Nouvelle promotion exclusive !</div>
                            <div className="text-sm text-muted-foreground">
                              Contenu: Découvrez notre nouvelle promotion exclusive réservée à nos clients fidèles !
                              Profitez de [PROMOTION] du [DATE_DEBUT] au [DATE_FIN]...
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Rappel d'anniversaire</CardTitle>
                          <CardDescription>Envoyé le jour de l'anniversaire du client</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="font-medium">Sujet: Joyeux anniversaire [PRENOM] !</div>
                            <div className="text-sm text-muted-foreground">
                              Contenu: Toute l'équipe de RestoPilote vous souhaite un joyeux anniversaire ! Pour
                              célébrer cette occasion spéciale, nous vous offrons un dessert gratuit lors de votre
                              prochaine visite...
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Planification des notifications</h3>
                    <Card>
                      <CardHeader>
                        <CardTitle>Notifications planifiées</CardTitle>
                        <CardDescription>Notifications programmées à venir</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Sujet</TableHead>
                              <TableHead>Audience</TableHead>
                              <TableHead>Statut</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>20/04/2025</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Promotion de printemps</TableCell>
                              <TableCell>Tous les clients (1,245)</TableCell>
                              <TableCell>
                                <Badge className="bg-yellow-100 text-yellow-800">Planifiée</Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  Modifier
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>25/04/2025</TableCell>
                              <TableCell>Push</TableCell>
                              <TableCell>Happy Hour spécial</TableCell>
                              <TableCell>Clients actifs (980)</TableCell>
                              <TableCell>
                                <Badge className="bg-yellow-100 text-yellow-800">Planifiée</Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  Modifier
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>01/05/2025</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Menu du mois de mai</TableCell>
                              <TableCell>Tous les clients (1,245)</TableCell>
                              <TableCell>
                                <Badge className="bg-yellow-100 text-yellow-800">Planifiée</Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  Modifier
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter>
                        <Button>
                          <Bell className="mr-2 h-4 w-4" />
                          Planifier une notification
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
