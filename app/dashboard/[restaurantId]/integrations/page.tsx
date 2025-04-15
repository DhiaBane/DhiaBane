"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import {
  PuzzleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusCircleIcon,
  RefreshCwIcon,
  SearchIcon,
  ShoppingCartIcon,
  TruckIcon,
  CreditCardIcon,
  CalendarIcon,
  MessageSquareIcon,
  BarChartIcon,
  DatabaseIcon,
  CloudIcon,
  SmartphoneIcon,
  MailIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// Types pour les intégrations
type IntegrationStatus = "connecté" | "déconnecté" | "en attente" | "erreur"
type IntegrationCategory =
  | "commandes"
  | "livraison"
  | "paiement"
  | "réservation"
  | "marketing"
  | "analytique"
  | "inventaire"
  | "cloud"
  | "pos"
  | "communication"

interface Integration {
  id: string
  name: string
  description: string
  logo: string
  category: IntegrationCategory
  status: IntegrationStatus
  connectedSince?: Date
  lastSync?: Date
  features: string[]
  popular?: boolean
  new?: boolean
}

// Données fictives pour la démo
const integrations: Integration[] = [
  {
    id: "uber-eats",
    name: "Uber Eats",
    description: "Recevez et gérez les commandes Uber Eats directement dans RestauPilot",
    logo: "/urban-exploration.png",
    category: "commandes",
    status: "connecté",
    connectedSince: new Date(2025, 1, 15),
    lastSync: new Date(2025, 3, 15, 14, 30),
    features: ["Synchronisation des menus", "Gestion des commandes", "Rapports de ventes"],
    popular: true,
  },
  {
    id: "deliveroo",
    name: "Deliveroo",
    description: "Intégrez les commandes Deliveroo à votre flux de travail",
    logo: "/abstract-geometric-shapes.png",
    category: "commandes",
    status: "déconnecté",
    features: ["Synchronisation des menus", "Gestion des commandes", "Rapports de ventes"],
    popular: true,
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Traitement des paiements en ligne sécurisé",
    logo: "/stylized-letter-st.png",
    category: "paiement",
    status: "connecté",
    connectedSince: new Date(2024, 11, 10),
    lastSync: new Date(2025, 3, 15, 15, 45),
    features: ["Paiements en ligne", "Abonnements", "Rapports financiers"],
    popular: true,
  },
  {
    id: "opentable",
    name: "OpenTable",
    description: "Synchronisez vos réservations OpenTable avec RestauPilot",
    logo: "/Overtime-Clock.png",
    category: "réservation",
    status: "connecté",
    connectedSince: new Date(2025, 0, 5),
    lastSync: new Date(2025, 3, 15, 16, 20),
    features: ["Synchronisation des réservations", "Gestion des tables", "Profils clients"],
    popular: true,
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Automatisez vos campagnes marketing par email",
    logo: "/microphone-crowd.png",
    category: "marketing",
    status: "déconnecté",
    features: ["Campagnes email", "Segmentation clients", "Automatisations"],
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Analysez le trafic de votre site web et application mobile",
    logo: "/placeholder.svg?height=40&width=40&query=GA",
    category: "analytique",
    status: "connecté",
    connectedSince: new Date(2025, 2, 1),
    lastSync: new Date(2025, 3, 15, 12, 10),
    features: ["Suivi du trafic", "Comportement utilisateur", "Conversion"],
  },
  {
    id: "square",
    name: "Square POS",
    description: "Intégrez votre système de point de vente Square",
    logo: "/placeholder.svg?height=40&width=40&query=SQ",
    category: "pos",
    status: "en attente",
    features: ["Synchronisation des ventes", "Gestion des stocks", "Rapports"],
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "Envoyez des SMS et notifications automatiques",
    logo: "/placeholder.svg?height=40&width=40&query=TW",
    category: "communication",
    status: "déconnecté",
    features: ["SMS automatiques", "Notifications", "Confirmations"],
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Synchronisez vos données financières avec QuickBooks",
    logo: "/placeholder.svg?height=40&width=40&query=QB",
    category: "analytique",
    status: "erreur",
    connectedSince: new Date(2025, 0, 20),
    lastSync: new Date(2025, 3, 10, 9, 15),
    features: ["Synchronisation comptable", "Factures", "Rapports financiers"],
  },
  {
    id: "doordash",
    name: "DoorDash",
    description: "Gérez vos commandes DoorDash dans RestauPilot",
    logo: "/placeholder.svg?height=40&width=40&query=DD",
    category: "livraison",
    status: "déconnecté",
    features: ["Synchronisation des menus", "Gestion des commandes", "Suivi des livraisons"],
    popular: true,
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Intégrez votre boutique en ligne Shopify",
    logo: "/placeholder.svg?height=40&width=40&query=SH",
    category: "commandes",
    status: "déconnecté",
    features: ["Synchronisation des produits", "Gestion des commandes", "Inventaire"],
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    description: "Stockage cloud sécurisé pour vos données",
    logo: "/placeholder.svg?height=40&width=40&query=AWS",
    category: "cloud",
    status: "connecté",
    connectedSince: new Date(2024, 10, 5),
    lastSync: new Date(2025, 3, 15, 18, 0),
    features: ["Stockage de données", "Sauvegarde automatique", "Sécurité"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Gérez vos relations clients et marketing",
    logo: "/placeholder.svg?height=40&width=40&query=HS",
    category: "marketing",
    status: "déconnecté",
    features: ["CRM", "Marketing automation", "Service client"],
  },
  {
    id: "xero",
    name: "Xero",
    description: "Logiciel de comptabilité en ligne",
    logo: "/placeholder.svg?height=40&width=40&query=XE",
    category: "analytique",
    status: "déconnecté",
    features: ["Comptabilité", "Facturation", "Rapports financiers"],
  },
  {
    id: "slack",
    name: "Slack",
    description: "Recevez des notifications et alertes dans Slack",
    logo: "/placeholder.svg?height=40&width=40&query=SL",
    category: "communication",
    status: "connecté",
    connectedSince: new Date(2025, 2, 10),
    lastSync: new Date(2025, 3, 15, 17, 30),
    features: ["Notifications", "Alertes", "Rapports automatiques"],
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Stockez et partagez vos documents",
    logo: "/placeholder.svg?height=40&width=40&query=GD",
    category: "cloud",
    status: "déconnecté",
    features: ["Stockage de documents", "Partage", "Collaboration"],
  },
  {
    id: "toast",
    name: "Toast POS",
    description: "Intégrez votre système Toast POS",
    logo: "/placeholder.svg?height=40&width=40&query=TP",
    category: "pos",
    status: "déconnecté",
    features: ["Synchronisation des ventes", "Gestion des stocks", "Rapports"],
  },
  {
    id: "clover",
    name: "Clover",
    description: "Connectez votre système Clover POS",
    logo: "/placeholder.svg?height=40&width=40&query=CL",
    category: "pos",
    status: "déconnecté",
    features: ["Terminal de paiement", "Gestion des stocks", "Rapports"],
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Acceptez les paiements via PayPal",
    logo: "/placeholder.svg?height=40&width=40&query=PP",
    category: "paiement",
    status: "déconnecté",
    features: ["Paiements en ligne", "Facturation", "Protection acheteur/vendeur"],
  },
  {
    id: "resy",
    name: "Resy",
    description: "Synchronisez vos réservations Resy",
    logo: "/placeholder.svg?height=40&width=40&query=RS",
    category: "réservation",
    status: "déconnecté",
    features: ["Gestion des réservations", "Profils clients", "Paiements anticipés"],
    new: true,
  },
]

// Fonction pour obtenir l'icône de la catégorie
function getCategoryIcon(category: IntegrationCategory) {
  switch (category) {
    case "commandes":
      return <ShoppingCartIcon className="h-5 w-5" />
    case "livraison":
      return <TruckIcon className="h-5 w-5" />
    case "paiement":
      return <CreditCardIcon className="h-5 w-5" />
    case "réservation":
      return <CalendarIcon className="h-5 w-5" />
    case "marketing":
      return <MailIcon className="h-5 w-5" />
    case "analytique":
      return <BarChartIcon className="h-5 w-5" />
    case "inventaire":
      return <DatabaseIcon className="h-5 w-5" />
    case "cloud":
      return <CloudIcon className="h-5 w-5" />
    case "pos":
      return <SmartphoneIcon className="h-5 w-5" />
    case "communication":
      return <MessageSquareIcon className="h-5 w-5" />
    default:
      return <PuzzleIcon className="h-5 w-5" />
  }
}

// Fonction pour obtenir la couleur du statut
function getStatusColor(status: IntegrationStatus): string {
  switch (status) {
    case "connecté":
      return "bg-green-500"
    case "déconnecté":
      return "bg-gray-500"
    case "en attente":
      return "bg-yellow-500"
    case "erreur":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

// Fonction pour obtenir l'icône du statut
function getStatusIcon(status: IntegrationStatus) {
  switch (status) {
    case "connecté":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />
    case "déconnecté":
      return <XCircleIcon className="h-5 w-5 text-gray-500" />
    case "en attente":
      return <RefreshCwIcon className="h-5 w-5 text-yellow-500" />
    case "erreur":
      return <XCircleIcon className="h-5 w-5 text-red-500" />
    default:
      return null
  }
}

// Fonction pour formater la date
function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// Fonction pour formater l'heure
function formatTime(date: Date): string {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function IntegrationsPage() {
  const params = useParams()
  const restaurantId = params?.restaurantId as string
  const [activeTab, setActiveTab] = useState("toutes")
  const [searchTerm, setSearchTerm] = useState("")
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  // Filtrer les intégrations en fonction du terme de recherche et de l'onglet actif
  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "toutes") {
      return matchesSearch
    } else if (activeTab === "connectées") {
      return matchesSearch && integration.status === "connecté"
    } else if (activeTab === "populaires") {
      return matchesSearch && integration.popular
    } else if (activeTab === "nouvelles") {
      return matchesSearch && integration.new
    } else {
      return matchesSearch && integration.category === activeTab
    }
  })

  // Fonction pour ouvrir la boîte de dialogue de connexion
  const openConnectDialog = (integration: Integration) => {
    setSelectedIntegration(integration)
    setShowConnectDialog(true)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Intégrations</h1>
        <div className="flex gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Rechercher une intégration..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="toutes" className="mr-1 mb-1">
            Toutes
          </TabsTrigger>
          <TabsTrigger value="connectées" className="mr-1 mb-1">
            Connectées
          </TabsTrigger>
          <TabsTrigger value="populaires" className="mr-1 mb-1">
            Populaires
          </TabsTrigger>
          <TabsTrigger value="nouvelles" className="mr-1 mb-1">
            Nouvelles
          </TabsTrigger>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <TabsTrigger value="commandes" className="mr-1 mb-1">
            Commandes
          </TabsTrigger>
          <TabsTrigger value="livraison" className="mr-1 mb-1">
            Livraison
          </TabsTrigger>
          <TabsTrigger value="paiement" className="mr-1 mb-1">
            Paiement
          </TabsTrigger>
          <TabsTrigger value="réservation" className="mr-1 mb-1">
            Réservation
          </TabsTrigger>
          <TabsTrigger value="marketing" className="mr-1 mb-1">
            Marketing
          </TabsTrigger>
          <TabsTrigger value="analytique" className="mr-1 mb-1">
            Analytique
          </TabsTrigger>
          <TabsTrigger value="pos" className="mr-1 mb-1">
            POS
          </TabsTrigger>
          <TabsTrigger value="communication" className="mr-1 mb-1">
            Communication
          </TabsTrigger>
          <TabsTrigger value="cloud" className="mr-1 mb-1">
            Cloud
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-10 h-10 mr-3 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={integration.logo || "/placeholder.svg"}
                          alt={`${integration.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          {integration.name}
                          {integration.popular && <Badge className="ml-2 bg-blue-500">Populaire</Badge>}
                          {integration.new && <Badge className="ml-2 bg-purple-500">Nouveau</Badge>}
                        </CardTitle>
                        <div className="flex items-center mt-1">
                          <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200">
                            <div className="flex items-center">
                              {getCategoryIcon(integration.category)}
                              <span className="ml-1">{integration.category}</span>
                            </div>
                          </Badge>
                          <Badge className={`ml-2 ${getStatusColor(integration.status)}`}>{integration.status}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500 mb-3">{integration.description}</p>

                  {integration.status === "connecté" && integration.lastSync && (
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <RefreshCwIcon className="h-3 w-3 mr-1" />
                      <span>
                        Dernière synchronisation: {formatDate(integration.lastSync)} à{" "}
                        {formatTime(integration.lastSync)}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mt-2">
                    {integration.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  {integration.status === "connecté" ? (
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm">
                        <RefreshCwIcon className="mr-2 h-4 w-4" />
                        Synchroniser
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                        Déconnecter
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full" size="sm" onClick={() => openConnectDialog(integration)}>
                      <PlusCircleIcon className="mr-2 h-4 w-4" />
                      Connecter
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredIntegrations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <PuzzleIcon className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900">Aucune intégration trouvée</h3>
              <p className="text-gray-500 mt-2">
                Aucune intégration ne correspond à votre recherche. Essayez d'autres termes ou catégories.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Boîte de dialogue de connexion */}
      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="sm:max-w-[525px]">
          {selectedIntegration && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <div className="w-8 h-8 mr-2 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={selectedIntegration.logo || "/placeholder.svg"}
                      alt={`${selectedIntegration.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  Connecter {selectedIntegration.name}
                </DialogTitle>
                <DialogDescription>
                  Configurez l'intégration avec {selectedIntegration.name} pour votre restaurant.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {selectedIntegration.category === "commandes" && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="api-key" className="text-right">
                        Clé API
                      </Label>
                      <Input id="api-key" className="col-span-3" placeholder="Entrez votre clé API" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="api-secret" className="text-right">
                        Secret API
                      </Label>
                      <Input
                        id="api-secret"
                        type="password"
                        className="col-span-3"
                        placeholder="Entrez votre secret API"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="restaurant-id" className="text-right">
                        ID Restaurant
                      </Label>
                      <Input
                        id="restaurant-id"
                        className="col-span-3"
                        placeholder="ID de votre restaurant sur la plateforme"
                      />
                    </div>
                  </>
                )}

                {selectedIntegration.category === "paiement" && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="publishable-key" className="text-right">
                        Clé publique
                      </Label>
                      <Input id="publishable-key" className="col-span-3" placeholder="Entrez votre clé publique" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="secret-key" className="text-right">
                        Clé secrète
                      </Label>
                      <Input
                        id="secret-key"
                        type="password"
                        className="col-span-3"
                        placeholder="Entrez votre clé secrète"
                      />
                    </div>
                  </>
                )}

                {selectedIntegration.category === "réservation" && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="api-token" className="text-right">
                        Token API
                      </Label>
                      <Input id="api-token" className="col-span-3" placeholder="Entrez votre token API" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="venue-id" className="text-right">
                        ID Établissement
                      </Label>
                      <Input id="venue-id" className="col-span-3" placeholder="ID de votre établissement" />
                    </div>
                  </>
                )}

                {/* Options génériques pour les autres catégories */}
                {!["commandes", "paiement", "réservation"].includes(selectedIntegration.category) && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="api-key" className="text-right">
                        Clé API
                      </Label>
                      <Input id="api-key" className="col-span-3" placeholder="Entrez votre clé API" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="api-secret" className="text-right">
                        Secret API
                      </Label>
                      <Input
                        id="api-secret"
                        type="password"
                        className="col-span-3"
                        placeholder="Entrez votre secret API"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sync-frequency" className="text-right">
                    Fréquence de sync
                  </Label>
                  <select
                    id="sync-frequency"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="5">Toutes les 5 minutes</option>
                    <option value="15">Toutes les 15 minutes</option>
                    <option value="30">Toutes les 30 minutes</option>
                    <option value="60">Toutes les heures</option>
                    <option value="360">Toutes les 6 heures</option>
                    <option value="720">Toutes les 12 heures</option>
                    <option value="1440">Une fois par jour</option>
                  </select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="auto-sync" className="text-right">
                    Synchronisation auto
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch id="auto-sync" defaultChecked />
                    <Label htmlFor="auto-sync">Activer</Label>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notifications" className="text-right">
                    Notifications
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch id="notifications" defaultChecked />
                    <Label htmlFor="notifications">Activer</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConnectDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setShowConnectDialog(false)}>Connecter</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
