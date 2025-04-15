import type { Extension, ExtensionStatus } from "@/types/extensions"

// Données fictives pour la démo
const mockExtensions: Extension[] = [
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
    status: "completed",
    tags: ["menu", "digital", "sans contact"],
    lastUpdated: "15/03/2025",
    version: "2.3.1",
    compatibility: "RestauPilot v3.0+",
    screenshots: ["/qr-code-menu-example.png", "/qr-code-growth.png"],
    restaurantId: "1",
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
    status: "completed",
    tags: ["fidélité", "points", "récompenses"],
    lastUpdated: "02/04/2025",
    version: "1.8.0",
    compatibility: "RestauPilot v2.5+",
    restaurantId: "1",
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
    status: "beta",
    tags: ["inventaire", "stocks", "prévisions"],
    lastUpdated: "28/03/2025",
    version: "3.2.0",
    compatibility: "RestauPilot v3.0+",
    restaurantId: "1",
  },
  {
    id: "table-wait",
    name: "TableWait",
    developer: "DineFlow",
    description: "Gestion de file d'attente et notifications SMS pour les clients",
    longDescription:
      "Gérez efficacement les files d'attente pendant les heures de pointe. Les clients peuvent s'inscrire sur une liste d'attente virtuelle et recevoir des SMS lorsque leur table est prête. Estimez et communiquez les temps d'attente, permettez aux clients de confirmer leur arrivée, et analysez les données pour optimiser votre capacité d'accueil.",
    icon: "/person-at-bus-stop.png",
    category: "Réservations",
    price: 39.99,
    rating: 4.5,
    reviews: 76,
    new: true,
    status: "alpha",
    tags: ["file d'attente", "SMS", "réservations"],
    lastUpdated: "10/04/2025",
    version: "1.0.2",
    compatibility: "RestauPilot v3.0+",
    restaurantId: "1",
  },
  {
    id: "analytics-ai",
    name: "Analytics AI",
    developer: "DataDish",
    description: "Analyses prédictives et insights basés sur l'IA",
    longDescription:
      "Exploitez la puissance de l'intelligence artificielle pour analyser vos données et obtenir des insights précieux. Prédisez les tendances de vente, identifiez les opportunités d'upselling, optimisez vos prix et horaires d'ouverture. Recevez des recommandations personnalisées pour augmenter votre rentabilité et améliorer l'expérience client.",
    icon: "/abstract-ai-network.png",
    category: "Analytique",
    price: 79.99,
    rating: 4.9,
    reviews: 42,
    featured: true,
    status: "completed",
    tags: ["IA", "prédictions", "insights"],
    lastUpdated: "05/04/2025",
    version: "2.1.0",
    compatibility: "RestauPilot v3.0+",
    screenshots: ["/ai-analytics-overview.png", "/future-trends-forecast.png", "/intelligent-suggestions.png"],
    restaurantId: "1",
  },
  {
    id: "multi-language-menu",
    name: "Multi-Language Menu",
    developer: "GlobalEats",
    description: "Affichez vos menus en plusieurs langues",
    longDescription:
      "Élargissez votre clientèle en proposant des menus dans plusieurs langues. Cette extension traduit automatiquement vos menus dans plus de 20 langues, avec la possibilité d'éditer manuellement les traductions pour plus de précision. Idéal pour les restaurants dans les zones touristiques ou les établissements souhaitant attirer une clientèle internationale.",
    icon: "/linguistic-diversity.png",
    category: "International",
    price: 24.99,
    rating: 4.4,
    reviews: 68,
    status: "beta",
    tags: ["langues", "traduction", "international"],
    lastUpdated: "20/03/2025",
    version: "1.5.3",
    compatibility: "RestauPilot v2.5+",
    restaurantId: "1",
  },
  {
    id: "staff-scheduler",
    name: "Staff Scheduler Pro",
    developer: "WorkFlow",
    description: "Planification avancée des horaires du personnel",
    longDescription:
      "Simplifiez la gestion des horaires de votre personnel avec cette extension complète. Créez des plannings optimisés en fonction de l'affluence prévue, gérez les demandes de congés, suivez les heures travaillées et calculez automatiquement les coûts de main-d'œuvre. Les employés peuvent consulter leurs horaires et faire des demandes de changement directement via l'application.",
    icon: "/daily-planner-flatlay.png",
    category: "Productivité",
    price: 34.99,
    rating: 4.6,
    reviews: 93,
    status: "completed",
    tags: ["personnel", "planning", "horaires"],
    lastUpdated: "01/04/2025",
    version: "2.4.0",
    compatibility: "RestauPilot v2.5+",
    restaurantId: "1",
  },
  {
    id: "social-media-connector",
    name: "Social Media Connector",
    developer: "SocialEats",
    description: "Partagez automatiquement sur les réseaux sociaux",
    longDescription:
      "Boostez votre présence sur les réseaux sociaux en automatisant vos publications. Partagez automatiquement vos nouveaux plats, promotions et événements sur Facebook, Instagram, Twitter et LinkedIn. Planifiez vos publications à l'avance et analysez leur performance pour optimiser votre stratégie marketing.",
    icon: "/diverse-friends-laughing.png",
    category: "Marketing",
    price: 19.99,
    rating: 4.3,
    reviews: 57,
    status: "development",
    tags: ["réseaux sociaux", "marketing", "automatisation"],
    lastUpdated: "25/03/2025",
    version: "1.7.1",
    compatibility: "RestauPilot v2.5+",
    restaurantId: "1",
  },
  {
    id: "payment-split",
    name: "Payment Splitter",
    developer: "PayEase",
    description: "Permettez aux clients de diviser facilement l'addition",
    longDescription:
      "Offrez à vos clients la possibilité de diviser facilement l'addition de différentes façons : parts égales, articles spécifiques, ou montants personnalisés. Compatible avec tous les principaux systèmes de paiement, cette extension simplifie le processus de règlement pour les groupes et améliore l'expérience client tout en réduisant le temps de traitement pour votre personnel.",
    icon: "/fractured-earth.png",
    category: "Paiement",
    price: 29.99,
    rating: 4.7,
    reviews: 112,
    popular: true,
    status: "completed",
    tags: ["paiement", "addition", "groupes"],
    lastUpdated: "08/04/2025",
    version: "2.0.1",
    compatibility: "RestauPilot v3.0+",
    restaurantId: "1",
  },
  {
    id: "delivery-tracker",
    name: "Delivery Tracker",
    developer: "DeliverEase",
    description: "Suivi en temps réel des livraisons pour vous et vos clients",
    longDescription:
      "Améliorez votre service de livraison avec un suivi en temps réel. Vos clients peuvent suivre leur commande de la préparation à la livraison, tandis que vous gardez une vue d'ensemble sur toutes les livraisons en cours. Inclut des estimations de temps précises, des notifications automatiques et des analyses de performance pour optimiser vos délais de livraison.",
    icon: "/diverse-delivery-network.png",
    category: "Livraison",
    price: 44.99,
    rating: 4.5,
    reviews: 83,
    status: "beta",
    tags: ["livraison", "suivi", "temps réel"],
    lastUpdated: "03/04/2025",
    version: "1.9.2",
    compatibility: "RestauPilot v2.5+",
    restaurantId: "1",
  },
]

class ExtensionService {
  private extensions: Extension[] = [...mockExtensions]

  // Récupérer toutes les extensions
  async getAllExtensions(restaurantId: string): Promise<Extension[]> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500))
    return this.extensions.filter((ext) => ext.restaurantId === restaurantId)
  }

  // Récupérer une extension par son ID
  async getExtensionById(id: string): Promise<Extension | undefined> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.extensions.find((ext) => ext.id === id)
  }

  // Installer une extension
  async installExtension(id: string): Promise<Extension | undefined> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800))

    const extensionIndex = this.extensions.findIndex((ext) => ext.id === id)
    if (extensionIndex === -1) return undefined

    this.extensions[extensionIndex] = {
      ...this.extensions[extensionIndex],
      installed: true,
    }

    return this.extensions[extensionIndex]
  }

  // Désinstaller une extension
  async uninstallExtension(id: string): Promise<Extension | undefined> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    const extensionIndex = this.extensions.findIndex((ext) => ext.id === id)
    if (extensionIndex === -1) return undefined

    this.extensions[extensionIndex] = {
      ...this.extensions[extensionIndex],
      installed: false,
    }

    return this.extensions[extensionIndex]
  }

  // Rechercher des extensions
  async searchExtensions(query: string, restaurantId: string): Promise<Extension[]> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 400))

    const lowercaseQuery = query.toLowerCase()
    return this.extensions.filter(
      (ext) =>
        ext.restaurantId === restaurantId &&
        (ext.name.toLowerCase().includes(lowercaseQuery) ||
          ext.description.toLowerCase().includes(lowercaseQuery) ||
          ext.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))),
    )
  }

  // Filtrer les extensions par catégorie
  async filterByCategory(category: string, restaurantId: string): Promise<Extension[]> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (category === "Tous") {
      return this.extensions.filter((ext) => ext.restaurantId === restaurantId)
    }

    return this.extensions.filter((ext) => ext.restaurantId === restaurantId && ext.category === category)
  }

  // Filtrer les extensions par statut
  async filterByStatus(status: ExtensionStatus, restaurantId: string): Promise<Extension[]> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return this.extensions.filter((ext) => ext.restaurantId === restaurantId && ext.status === status)
  }
}

export const extensionService = new ExtensionService()
