export type ExtensionCategory =
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

export type ExtensionStatus = "completed" | "beta" | "alpha" | "development"

export interface Extension {
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
  status: ExtensionStatus
  tags: string[]
  lastUpdated: string
  version: string
  compatibility: string
  screenshots?: string[]
  restaurantId: string
}
