// Modèles de prédiction avancés pour RestauPilot
// Ces modèles utilisent des algorithmes d'apprentissage automatique pour générer des prédictions

export interface PredictionModel {
  id: string
  name: string
  description: string
  accuracy: number
  lastTrained: Date
  category: "sales" | "inventory" | "staffing" | "customer" | "menu"
  features: string[]
}

export interface PredictionResult<T> {
  prediction: T
  confidence: number
  factors: {
    name: string
    impact: number // -1 to 1, negative means negative impact
  }[]
  alternatives?: T[]
  timestamp: Date
  modelId: string
}

// Modèles disponibles dans le système
export const availablePredictionModels: PredictionModel[] = [
  {
    id: "sales-forecast-v2",
    name: "Prévision des ventes V2",
    description:
      "Modèle avancé de prévision des ventes basé sur l'historique, la météo, les événements locaux et les tendances saisonnières",
    accuracy: 0.94,
    lastTrained: new Date("2025-04-01"),
    category: "sales",
    features: [
      "historique des ventes",
      "météo",
      "événements locaux",
      "tendances saisonnières",
      "jours fériés",
      "promotions",
    ],
  },
  {
    id: "inventory-optimizer-v3",
    name: "Optimiseur d'inventaire V3",
    description: "Prévoit les besoins en inventaire et optimise les commandes pour réduire le gaspillage",
    accuracy: 0.91,
    lastTrained: new Date("2025-03-28"),
    category: "inventory",
    features: [
      "historique des ventes",
      "durée de conservation",
      "saisonnalité des ingrédients",
      "prix des fournisseurs",
      "recettes",
    ],
  },
  {
    id: "staff-scheduler-v2",
    name: "Planificateur de personnel V2",
    description: "Optimise les horaires du personnel en fonction de l'affluence prévue",
    accuracy: 0.89,
    lastTrained: new Date("2025-04-05"),
    category: "staffing",
    features: [
      "historique d'affluence",
      "réservations",
      "événements spéciaux",
      "compétences du personnel",
      "préférences horaires",
    ],
  },
  {
    id: "customer-segmentation-v3",
    name: "Segmentation client V3",
    description: "Segmente les clients en fonction de leurs habitudes et préférences",
    accuracy: 0.92,
    lastTrained: new Date("2025-03-30"),
    category: "customer",
    features: [
      "historique des commandes",
      "fréquence des visites",
      "montant dépensé",
      "préférences culinaires",
      "feedback",
    ],
  },
  {
    id: "menu-optimizer-v2",
    name: "Optimiseur de menu V2",
    description: "Recommande des modifications de menu pour maximiser les ventes et la rentabilité",
    accuracy: 0.88,
    lastTrained: new Date("2025-04-03"),
    category: "menu",
    features: [
      "popularité des plats",
      "rentabilité",
      "tendances culinaires",
      "ingrédients de saison",
      "feedback client",
    ],
  },
]

// Fonctions de prédiction simulées
export async function generateSalesForecast(restaurantId: string, days: number): Promise<PredictionResult<number[]>> {
  // Simulation d'une prédiction de ventes
  const predictions = Array.from({ length: days }, (_, i) => {
    // Base value plus weekend boost and random variation
    const isWeekend = i % 7 === 5 || i % 7 === 6
    const baseValue = 1500 + (isWeekend ? 800 : 0)
    const randomVariation = Math.random() * 300 - 150
    return Math.round(baseValue + randomVariation)
  })

  return {
    prediction: predictions,
    confidence: 0.94,
    factors: [
      { name: "Saisonnalité", impact: 0.4 },
      { name: "Météo prévue", impact: 0.3 },
      { name: "Événements locaux", impact: 0.2 },
      { name: "Tendance historique", impact: 0.7 },
      { name: "Promotions en cours", impact: 0.5 },
    ],
    timestamp: new Date(),
    modelId: "sales-forecast-v2",
  }
}

export async function predictInventoryNeeds(
  restaurantId: string,
  ingredientIds: string[],
): Promise<PredictionResult<Record<string, number>>> {
  // Simulation de prédiction des besoins en inventaire
  const predictions: Record<string, number> = {}

  ingredientIds.forEach((id) => {
    predictions[id] = Math.round(10 + Math.random() * 40)
  })

  return {
    prediction: predictions,
    confidence: 0.91,
    factors: [
      { name: "Prévisions de ventes", impact: 0.8 },
      { name: "Saisonnalité", impact: 0.3 },
      { name: "Tendances récentes", impact: 0.6 },
      { name: "Événements spéciaux", impact: 0.4 },
    ],
    timestamp: new Date(),
    modelId: "inventory-optimizer-v3",
  }
}

export async function optimizeStaffSchedule(
  restaurantId: string,
  date: Date,
): Promise<PredictionResult<Record<string, number>>> {
  // Simulation d'optimisation des horaires du personnel
  const dayOfWeek = date.getDay()
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6

  const staffNeeds = {
    morning: isWeekend ? 4 : 3,
    lunch: isWeekend ? 7 : 5,
    afternoon: isWeekend ? 5 : 3,
    dinner: isWeekend ? 8 : 6,
    closing: isWeekend ? 4 : 3,
  }

  return {
    prediction: staffNeeds,
    confidence: 0.89,
    factors: [
      { name: "Prévisions d'affluence", impact: 0.9 },
      { name: "Jour de la semaine", impact: 0.7 },
      { name: "Réservations", impact: 0.6 },
      { name: "Événements spéciaux", impact: 0.4 },
    ],
    timestamp: new Date(),
    modelId: "staff-scheduler-v2",
  }
}

export async function getCustomerInsights(
  restaurantId: string,
  customerId: string,
): Promise<
  PredictionResult<{
    segment: string
    churnRisk: number
    lifetimeValue: number
    recommendedActions: string[]
  }>
> {
  // Simulation d'insights client
  const segments = ["Fidèle régulier", "Occasionnel", "Nouveau client", "Client événement", "Client affaires"]
  const segment = segments[Math.floor(Math.random() * segments.length)]

  const churnRisk = Math.random() * 0.5 // 0-0.5 range
  const lifetimeValue = Math.round(500 + Math.random() * 1500)

  const possibleActions = [
    "Envoyer une offre personnalisée",
    "Inviter à un événement spécial",
    "Proposer une dégustation",
    "Offrir un dessert gratuit",
    "Envoyer un sondage de satisfaction",
    "Proposer le programme de fidélité",
    "Offrir une réduction sur la prochaine visite",
  ]

  const recommendedActions = Array.from(
    { length: 2 + Math.floor(Math.random() * 3) },
    () => possibleActions[Math.floor(Math.random() * possibleActions.length)],
  )

  return {
    prediction: {
      segment,
      churnRisk,
      lifetimeValue,
      recommendedActions: [...new Set(recommendedActions)], // Remove duplicates
    },
    confidence: 0.92,
    factors: [
      { name: "Fréquence des visites", impact: 0.8 },
      { name: "Montant moyen dépensé", impact: 0.7 },
      { name: "Feedback récent", impact: 0.5 },
      { name: "Temps depuis la dernière visite", impact: 0.6 },
    ],
    timestamp: new Date(),
    modelId: "customer-segmentation-v3",
  }
}

export async function getMenuRecommendations(restaurantId: string): Promise<
  PredictionResult<{
    itemsToPromote: string[]
    itemsToReposition: string[]
    newItemSuggestions: string[]
    pricingRecommendations: Record<string, number>
  }>
> {
  // Simulation de recommandations pour le menu
  return {
    prediction: {
      itemsToPromote: ["Risotto aux champignons", "Tartare de saumon", "Mousse au chocolat"],
      itemsToReposition: ["Salade César", "Pâtes Carbonara"],
      newItemSuggestions: ["Bowl végétarien", "Burger plant-based", "Dessert sans gluten"],
      pricingRecommendations: {
        "Steak frites": 24.5,
        "Salade Niçoise": 18.9,
        Tiramisu: 9.5,
      },
    },
    confidence: 0.88,
    factors: [
      { name: "Popularité des plats", impact: 0.9 },
      { name: "Rentabilité", impact: 0.8 },
      { name: "Tendances du marché", impact: 0.6 },
      { name: "Feedback client", impact: 0.7 },
      { name: "Saisonnalité", impact: 0.5 },
    ],
    timestamp: new Date(),
    modelId: "menu-optimizer-v2",
  }
}
