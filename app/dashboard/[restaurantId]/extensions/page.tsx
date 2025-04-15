"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Download,
  Check,
  Search,
  Tag,
  Clock,
  Filter,
  ShoppingCart,
  CreditCard,
  Calendar,
  Users,
  BarChart2,
  Utensils,
  Truck,
  Package,
  MessageSquare,
  Zap,
  Shield,
  Percent,
  Globe,
} from "lucide-react"

// Types pour les extensions
interface Extension {
  id: string
  name: string
  developer: string
  description: string
  longDescription?: string
  icon: string
  category: ExtensionCategory
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

type ExtensionCategory =
  | "Tous"
  | "Commandes"
  | "Paiement"
  | "Réservations"
  | "Marketing"
  | "Analytique"
  | "Menu"
  | "Livraison"
  | "Inventaire"
  | "Communication"
  | "Productivité"
  | "Sécurité"
  | "Fidélité"
  | "International"

// Données fictives pour la démo
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
    id: "loyalty-plus",
    name: "Loyalty Plus",
    developer: "FidelityApps",
    description: "Programme de fidélité avancé avec points et récompenses",
    longDescription:
      "Fidélisez vos clients avec un système de points complet. Les clients accumulent des points à chaque achat et peuvent les échanger contre des récompenses. Personnalisez les règles d'accumulation, créez des offres spéciales et envoyez des notifications automatiques. Inclut des rapports détaillés sur l'engagement client et le ROI de votre programme.",
    icon: "/steadfast-companions.png",
    category: "Fidélité",
    price: 29.99,
    rating: 4.6,
    reviews: 89,
    popular: true,
    tags: ["fidélité", "points", "récompenses"],
    lastUpdated: "02/04/2025",
    version: "1.8.0",
    compatibility: "RestauPilot v2.5+",
  },
  {
    id: "inventory-pro",
    name: "Inventory Pro",
    developer: "RestauSolutions",
    description: "Gestion avancée des stocks avec prévisions et alertes",
    longDescription:
      "Optimisez votre gestion des stocks avec des fonctionnalités avancées comme les prévisions basées sur l'IA, les alertes de niveau bas, le suivi des dates de péremption et les rapports de gaspillage. Synchronisez automatiquement vos niveaux de stock avec vos ventes et commandes fournisseurs. Réduisez le gaspillage et ne manquez plus jamais d'ingrédients essentiels.",
    icon: "/warehouse-shelves.png",
    category: "Inventaire",
    price: 49.99,
    rating: 4.7,
    reviews: 124,
    tags: ["inventaire", "stocks", "prévisions"],
    lastUpdated: "28/03/2025",
    version: "3.2.0",
    compatibility: "RestauPilot v3.0+",
  },
  {
    id: "table-wait",
    name: "TableWait",
    developer: "DineFlow",
    description: "Gestion de file d'attente et notifications SMS pour les clients",
    longDescription:
      "Gérez efficacement les files d'attente pendant les heures de pointe. Les clients peuvent s'inscrire sur une liste d'attente virtuelle et recevoir des SMS lorsque leur table est prête. Estimez et communiquez les temps d'attente, permettez aux clients de confirmer leur arrivée, et analysez les données pour optimiser votre capacité d'accueil.",
    icon: "/placeholder.svg?height=80&width=80&query=Wait",
    category: "Réservations",
    price: 39.99,
    rating: 4.5,
    reviews: 76,
    new: true,
    tags: ["file d'attente", "SMS", "réservations"],
    lastUpdated: "10/04/2025",
    version: "1.0.2",
    compatibility: "RestauPilot v3.0+",
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
  },
  {
    id: "multi-language-menu",
    name: "Multi-Language Menu",
    developer: "GlobalEats",
    description: "Affichez vos menus en plusieurs langues",
    longDescription:
      "Élargissez votre clientèle en proposant des menus dans plusieurs langues. Cette extension traduit automatiquement vos menus dans plus de 20 langues, avec la possibilité d'éditer manuellement les traductions pour plus de précision. Idéal pour les restaurants dans les zones touristiques ou les établissements souhaitant attirer une clientèle internationale.",
    icon: "/placeholder.svg?height=80&width=80&query=Language",
    category: "International",
    price: 24.99,
    rating: 4.4,
    reviews: 68,
    tags: ["langues", "traduction", "international"],
    lastUpdated: "20/03/2025",
    version: "1.5.3",
    compatibility: "RestauPilot v2.5+",
  },
  {
    id: "staff-scheduler",
    name: "Staff Scheduler Pro",
    developer: "WorkFlow",
    description: "Planification avancée des horaires du personnel",
    longDescription:
      "Simplifiez la gestion des horaires de votre personnel avec cette extension complète. Créez des plannings optimisés en fonction de l'affluence prévue, gérez les demandes de congés, suivez les heures travaillées et calculez automatiquement les coûts de main-d'œuvre. Les employés peuvent consulter leurs horaires et faire des demandes de changement directement via l'application.",
    icon: "/placeholder.svg?height=80&width=80&query=Schedule",
    category: "Productivité",
    price: 34.99,
    rating: 4.6,
    reviews: 93,
    tags: ["personnel", "planning", "horaires"],
    lastUpdated: "01/04/2025",
    version: "2.4.0",
    compatibility: "RestauPilot v2.5+",
  },
  {
    id: "social-media-connector",
    name: "Social Media Connector",
    developer: "SocialEats",
    description: "Partagez automatiquement sur les réseaux sociaux",
    longDescription:
      "Boostez votre présence sur les réseaux sociaux en automatisant vos publications. Partagez automatiquement vos nouveaux plats, promotions et événements sur Facebook, Instagram, Twitter et LinkedIn. Planifiez vos publications à l'avance et analysez leur performance pour optimiser votre stratégie marketing.",
    icon: "/placeholder.svg?height=80&width=80&query=Social",
    category: "Marketing",
    price: 19.99,
    rating: 4.3,
    reviews: 57,
    tags: ["réseaux sociaux", "marketing", "automatisation"],
    lastUpdated: "25/03/2025",
    version: "1.7.1",
    compatibility: "RestauPilot v2.5+",
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
  {
    id: "delivery-tracker",
    name: "Delivery Tracker",
    developer: "DeliverEase",
    description: "Suivi en temps réel des livraisons pour vous et vos clients",
    longDescription:
      "Améliorez votre service de livraison avec un suivi en temps réel. Vos clients peuvent suivre leur commande de la préparation à la livraison, tandis que vous gardez une vue d'ensemble sur toutes les livraisons en cours. Inclut des estimations de temps précises, des notifications automatiques et des analyses de performance pour optimiser vos délais de livraison.",
    icon: "/placeholder.svg?height=80&width=80&query=Delivery",
    category: "Livraison",
    price: 44.99,
    rating: 4.5,
    reviews: 83,
    tags: ["livraison", "suivi", "temps réel"],
    lastUpdated: "03/04/2025",
    version: "1.9.2",
    compatibility: "RestauPilot v2.5+",
  },
  {
    id: "customer-feedback",
    name: "Customer Feedback Pro",
    developer: "FeedbackLoop",
    description: "Collectez et analysez les retours clients",
    longDescription:
      "Recueillez facilement les avis de vos clients via différents canaux : QR codes sur table, emails post-visite, ou SMS. Analysez les commentaires grâce à l'IA pour identifier les tendances et points d'amélioration. Répondez directement aux avis depuis la plateforme et transformez les critiques en opportunités d'amélioration.",
    icon: "/placeholder.svg?height=80&width=80&query=Feedback",
    category: "Communication",
    price: 39.99,
    rating: 4.8,
    reviews: 74,
    tags: ["avis", "feedback", "satisfaction"],
    lastUpdated: "30/03/2025",
    version: "2.2.0",
    compatibility: "RestauPilot v3.0+",
  },
  {
    id: "menu-engineering",
    name: "Menu Engineering",
    developer: "ProfitPlate",
    description: "Optimisez votre menu pour maximiser les profits",
    longDescription:
      "Analysez la performance de chaque plat en termes de popularité et de rentabilité. Identifiez vos plats stars, vos vaches à lait, vos énigmes et vos poids morts. Recevez des recommandations pour repositionner vos plats, ajuster les prix et mettre en avant les articles les plus rentables. Testez différentes versions de menus et mesurez leur impact sur vos ventes.",
    icon: "/placeholder.svg?height=80&width=80&query=MenuOpt",
    category: "Menu",
    price: 59.99,
    rating: 4.9,
    reviews: 48,
    featured: true,
    tags: ["menu", "rentabilité", "optimisation"],
    lastUpdated: "12/04/2025",
    version: "1.4.0",
    compatibility: "RestauPilot v3.0+",
  },
  {
    id: "security-plus",
    name: "Security Plus",
    developer: "SecureDine",
    description: "Protection avancée des données et conformité RGPD",
    longDescription:
      "Renforcez la sécurité de vos données avec cette extension complète. Protégez les informations sensibles de vos clients avec un chiffrement de niveau bancaire, des sauvegardes automatiques et des contrôles d'accès granulaires. Assurez votre conformité au RGPD avec des outils de gestion du consentement et des rapports d'audit. Inclut une protection contre les fraudes pour les paiements en ligne.",
    icon: "/placeholder.svg?height=80&width=80&query=Security",
    category: "Sécurité",
    price: 69.99,
    rating: 4.7,
    reviews: 36,
    tags: ["sécurité", "RGPD", "protection"],
    lastUpdated: "07/04/2025",
    version: "2.5.1",
    compatibility: "RestauPilot v2.5+",
  },
  {
    id: "happy-hour-manager",
    name: "Happy Hour Manager",
    developer: "PromoTime",
    description: "Gérez facilement vos happy hours et promotions temporelles",
    longDescription:
      "Créez et gérez des promotions basées sur des plages horaires spécifiques. Configurez des réductions automatiques pendant vos happy hours, définissez des menus spéciaux pour le brunch ou le déjeuner, et programmez des offres limitées dans le temps. Les prix s'ajustent automatiquement dans votre système de caisse et sur vos menus numériques pendant les périodes définies.",
    icon: "/placeholder.svg?height=80&width=80&query=HappyHour",
    category: "Marketing",
    price: 24.99,
    rating: 4.4,
    reviews: 62,
    tags: ["happy hour", "promotions", "prix"],
    lastUpdated: "22/03/2025",
    version: "1.6.2",
    compatibility: "RestauPilot v2.5+",
  },
  {
    id: "allergen-tracker",
    name: "Allergen Tracker",
    developer: "SafePlate",
    description: "Gestion complète des allergènes et régimes spéciaux",
    longDescription:
      "Assurez la sécurité de vos clients en gérant efficacement les informations sur les allergènes. Étiquetez chaque ingrédient et plat avec les allergènes correspondants, permettez aux clients de filtrer le menu selon leurs restrictions alimentaires, et assurez la traçabilité des ingrédients. Inclut des alertes automatiques en cuisine pour les commandes avec restrictions alimentaires.",
    icon: "/placeholder.svg?height=80&width=80&query=Allergen",
    category: "Menu",
    price: 34.99,
    rating: 4.8,
    reviews: 91,
    popular: true,
    tags: ["allergènes", "sécurité", "régimes"],
    lastUpdated: "05/04/2025",
    version: "2.3.0",
    compatibility: "RestauPilot v3.0+",
  },
  {
    id: "table-turn-optimizer",
    name: "Table Turn Optimizer",
    developer: "RevenuePlus",
    description: "Maximisez votre capacité d'accueil et vos revenus",
    longDescription:
      "Optimisez la rotation des tables pour augmenter votre chiffre d'affaires. Cette extension analyse vos données historiques pour prédire les durées de repas, suggère des configurations de tables optimales selon les périodes, et vous aide à planifier vos réservations pour maximiser l'utilisation de votre espace. Inclut des rapports détaillés sur les performances et des recommandations d'amélioration.",
    icon: "/placeholder.svg?height=80&width=80&query=TableTurn",
    category: "Analytique",
    price: 49.99,
    rating: 4.6,
    reviews: 53,
    tags: ["rotation", "tables", "optimisation"],
    lastUpdated: "01/04/2025",
    version: "1.3.1",
    compatibility: "RestauPilot v2.5+",
  },
]

// Fonction pour obtenir l'icône de la catégorie
function getCategoryIcon(category: ExtensionCategory) {
  switch (category) {
    case "Commandes":
      return <ShoppingCart className="h-5 w-5" />
    case "Paiement":
      return <CreditCard className="h-5 w-5" />
    case "Réservations":
      return <Calendar className="h-5 w-5" />
    case "Marketing":
      return <Percent className="h-5 w-5" />
    case "Analytique":
      return <BarChart2 className="h-5 w-5" />
    case "Menu":
      return <Utensils className="h-5 w-5" />
    case "Livraison":
      return <Truck className="h-5 w-5" />
    case "Inventaire":
      return <Package className="h-5 w-5" />
    case "Communication":
      return <MessageSquare className="h-5 w-5" />
    case "Productivité":
      return <Zap className="h-5 w-5" />
    case "Sécurité":
      return <Shield className="h-5 w-5" />
    case "Fidélité":
      return <Users className="h-5 w-5" />
    case "International":
      return <Globe className="h-5 w-5" />
    default:
      return <Tag className="h-5 w-5" />
  }
}

export default function ExtensionsPage() {
  const params = useParams()
  const restaurantId = params?.restaurantId as string
  const [activeTab, setActiveTab] = useState<ExtensionCategory>("Tous")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showInstallDialog, setShowInstallDialog] = useState(false)
  const [installProgress, setInstallProgress] = useState(0)
  const [installingExtension, setInstallingExtension] = useState<Extension | null>(null)

  // Filtrer les extensions en fonction du terme de recherche et de l'onglet actif
  const filteredExtensions = extensions.filter((extension) => {
    const matchesSearch =
      extension.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      extension.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      extension.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    if (activeTab === "Tous") {
      return matchesSearch
    } else if (activeTab === extension.category) {
      return matchesSearch
    }
    return false
  })

  // Fonction pour ouvrir la boîte de dialogue de détails
  const openDetailsDialog = (extension: Extension) => {
    setSelectedExtension(extension)
    setShowDetailsDialog(true)
  }

  // Fonction pour simuler l'installation d'une extension
  const installExtension = (extension: Extension) => {
    setInstallingExtension(extension)
    setInstallProgress(0)
    setShowInstallDialog(true)

    const interval = setInterval(() => {
      setInstallProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShowInstallDialog(false)
            // Marquer l'extension comme installée
            extensions.forEach((ext) => {
              if (ext.id === extension.id) {
                ext.installed = true
              }
            })
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // Fonction pour désinstaller une extension
  const uninstallExtension = (extension: Extension) => {
    if (confirm(`Êtes-vous sûr de vouloir désinstaller l'extension "${extension.name}" ?`)) {
      // Marquer l'extension comme non installée
      extensions.forEach((ext) => {
        if (ext.id === extension.id) {
          ext.installed = false
        }
      })
    }
  }

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

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace d&apos;extensions</h1>
          <p className="text-muted-foreground">Découvrez et installez des extensions pour enrichir votre RestauPilot</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Rechercher une extension..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Extensions mises en avant */}
      {searchTerm === "" && activeTab === "Tous" && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Extensions recommandées</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {extensions
              .filter((ext) => ext.featured)
              .map((extension) => (
                <Card key={extension.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={extension.icon || "/placeholder.svg"}
                          alt={`${extension.name} icon`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{extension.name}</CardTitle>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <span>{extension.developer}</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            {getCategoryIcon(extension.category)}
                            <span className="ml-1">{extension.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {renderRatingStars(extension.rating)}
                          <span className="text-sm text-muted-foreground ml-1">({extension.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-600">{extension.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {extension.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="font-medium">{formatPrice(extension.price)}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openDetailsDialog(extension)}>
                        Détails
                      </Button>
                      {extension.installed ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => uninstallExtension(extension)}
                        >
                          Désinstaller
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => installExtension(extension)}>
                          <Download className="mr-2 h-4 w-4" />
                          Installer
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ExtensionCategory)} className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="Tous" className="mr-1 mb-1">
            Tous
          </TabsTrigger>
          <TabsTrigger value="Commandes" className="mr-1 mb-1">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Commandes
          </TabsTrigger>
          <TabsTrigger value="Paiement" className="mr-1 mb-1">
            <CreditCard className="h-4 w-4 mr-1" />
            Paiement
          </TabsTrigger>
          <TabsTrigger value="Réservations" className="mr-1 mb-1">
            <Calendar className="h-4 w-4 mr-1" />
            Réservations
          </TabsTrigger>
          <TabsTrigger value="Menu" className="mr-1 mb-1">
            <Utensils className="h-4 w-4 mr-1" />
            Menu
          </TabsTrigger>
          <TabsTrigger value="Livraison" className="mr-1 mb-1">
            <Truck className="h-4 w-4 mr-1" />
            Livraison
          </TabsTrigger>
          <TabsTrigger value="Inventaire" className="mr-1 mb-1">
            <Package className="h-4 w-4 mr-1" />
            Inventaire
          </TabsTrigger>
          <TabsTrigger value="Marketing" className="mr-1 mb-1">
            <Percent className="h-4 w-4 mr-1" />
            Marketing
          </TabsTrigger>
          <TabsTrigger value="Analytique" className="mr-1 mb-1">
            <BarChart2 className="h-4 w-4 mr-1" />
            Analytique
          </TabsTrigger>
          <TabsTrigger value="Communication" className="mr-1 mb-1">
            <MessageSquare className="h-4 w-4 mr-1" />
            Communication
          </TabsTrigger>
          <TabsTrigger value="Productivité" className="mr-1 mb-1">
            <Zap className="h-4 w-4 mr-1" />
            Productivité
          </TabsTrigger>
          <TabsTrigger value="Sécurité" className="mr-1 mb-1">
            <Shield className="h-4 w-4 mr-1" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="Fidélité" className="mr-1 mb-1">
            <Users className="h-4 w-4 mr-1" />
            Fidélité
          </TabsTrigger>
          <TabsTrigger value="International" className="mr-1 mb-1">
            <Globe className="h-4 w-4 mr-1" />
            International
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExtensions.map((extension) => (
              <Card key={extension.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img
                        src={extension.icon || "/placeholder.svg"}
                        alt={`${extension.name} icon`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{extension.name}</CardTitle>
                        {extension.new && <Badge className="bg-purple-500">Nouveau</Badge>}
                        {extension.popular && <Badge className="bg-blue-500">Populaire</Badge>}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <span>{extension.developer}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          {getCategoryIcon(extension.category)}
                          <span className="ml-1">{extension.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {renderRatingStars(extension.rating)}
                        <span className="text-sm text-muted-foreground ml-1">({extension.reviews})</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600">{extension.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {extension.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Mis à jour le {extension.lastUpdated}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="font-medium">{formatPrice(extension.price)}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openDetailsDialog(extension)}>
                      Détails
                    </Button>
                    {extension.installed ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => uninstallExtension(extension)}
                      >
                        Désinstaller
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => installExtension(extension)}>
                        <Download className="mr-2 h-4 w-4" />
                        Installer
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredExtensions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Tag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900">Aucune extension trouvée</h3>
              <p className="text-gray-500 mt-2">
                Aucune extension ne correspond à votre recherche. Essayez d&apos;autres termes ou catégories.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Boîte de dialogue de détails */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedExtension && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center text-xl">
                  <div className="w-8 h-8 mr-2 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={selectedExtension.icon || "/placeholder.svg"}
                      alt={`${selectedExtension.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {selectedExtension.name}
                </DialogTitle>
                <DialogDescription>
                  <div className="flex items-center mt-1">
                    <span className="text-sm">{selectedExtension.developer}</span>
                    <span className="mx-2">•</span>
                    <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200">
                      <div className="flex items-center">
                        {getCategoryIcon(selectedExtension.category)}
                        <span className="ml-1">{selectedExtension.category}</span>
                      </div>
                    </Badge>
                    <span className="mx-2">•</span>
                    <span className="text-sm">Version {selectedExtension.version}</span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {renderRatingStars(selectedExtension.rating)}
                    <span className="text-sm font-medium">{selectedExtension.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">({selectedExtension.reviews} avis)</span>
                  </div>
                  <div className="font-medium text-lg">{formatPrice(selectedExtension.price)}</div>
                </div>

                {selectedExtension.screenshots && selectedExtension.screenshots.length > 0 && (
                  <div className="overflow-x-auto pb-2">
                    <div className="flex gap-2">
                      {selectedExtension.screenshots.map((screenshot, index) => (
                        <img
                          key={index}
                          src={screenshot || "/placeholder.svg"}
                          alt={`${selectedExtension.name} screenshot ${index + 1}`}
                          className="h-48 rounded-md object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-gray-600">
                    {selectedExtension.longDescription || selectedExtension.description}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Informations</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Développeur</span>
                        <span>{selectedExtension.developer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Version</span>
                        <span>{selectedExtension.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dernière mise à jour</span>
                        <span>{selectedExtension.lastUpdated}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Compatibilité</span>
                        <span>{selectedExtension.compatibility}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedExtension.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                {selectedExtension.installed ? (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      uninstallExtension(selectedExtension)
                      setShowDetailsDialog(false)
                    }}
                  >
                    Désinstaller
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setShowDetailsDialog(false)
                      installExtension(selectedExtension)
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Installer ({formatPrice(selectedExtension.price)})
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Boîte de dialogue d'installation */}
      <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
        <DialogContent className="sm:max-w-[425px]">
          {installingExtension && (
            <>
              <DialogHeader>
                <DialogTitle>Installation en cours</DialogTitle>
                <DialogDescription>Installation de l&apos;extension {installingExtension.name}...</DialogDescription>
              </DialogHeader>
              <div className="py-6">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                    style={{ width: `${installProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>Téléchargement...</span>
                  <span>{installProgress}%</span>
                </div>
              </div>
              {installProgress >= 100 && (
                <div className="flex items-center justify-center text-green-500">
                  <Check className="h-6 w-6 mr-2" />
                  <span>Installation terminée avec succès !</span>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
