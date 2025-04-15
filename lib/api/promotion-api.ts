import { v4 as uuidv4 } from "uuid"

// Types pour les promotions
export type PromotionType = "percentage" | "fixed" | "bogo" | "free_item" | "loyalty"
export type PromotionStatus = "active" | "scheduled" | "expired" | "draft"

export interface Promotion {
  id: string
  name: string
  description: string
  type: PromotionType
  value: number
  code?: string
  startDate: Date
  endDate: Date
  status: PromotionStatus
  conditions?: string
  applicableItems: "all" | "category" | "specific"
  categoryId?: string
  itemIds?: string[]
  minOrderValue?: number
  usageLimit?: number
  usageCount: number
  createdAt: Date
  restaurantId: string
}

// Données mockées pour les promotions
const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    name: "Happy Hour -20%",
    description: "Réduction de 20% sur toutes les boissons entre 17h et 19h",
    type: "percentage",
    value: 20,
    code: "HAPPY20",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-06-30"),
    status: "active",
    conditions: "Valable uniquement entre 17h et 19h",
    applicableItems: "category",
    categoryId: "boissons",
    usageCount: 145,
    createdAt: new Date("2025-03-15"),
    restaurantId: "1",
  },
  {
    id: "promo2",
    name: "Menu Déjeuner à 15€",
    description: "Menu complet entrée + plat + dessert pour 15€",
    type: "fixed",
    value: 15,
    startDate: new Date("2025-04-10"),
    endDate: new Date("2025-05-10"),
    status: "active",
    applicableItems: "specific",
    itemIds: ["menu-dejeuner"],
    usageCount: 78,
    createdAt: new Date("2025-04-05"),
    restaurantId: "1",
  },
  {
    id: "promo3",
    name: "1 Dessert Offert",
    description: "Un dessert offert pour tout achat d'un menu",
    type: "free_item",
    value: 0,
    code: "DESSERT",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-31"),
    status: "scheduled",
    applicableItems: "category",
    categoryId: "desserts",
    minOrderValue: 25,
    usageCount: 0,
    createdAt: new Date("2025-04-10"),
    restaurantId: "1",
  },
  {
    id: "promo4",
    name: "2 pour 1 sur les pizzas",
    description: "Achetez une pizza, la deuxième est offerte",
    type: "bogo",
    value: 100,
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-31"),
    status: "expired",
    applicableItems: "category",
    categoryId: "pizzas",
    usageCount: 210,
    createdAt: new Date("2025-02-15"),
    restaurantId: "1",
  },
  {
    id: "promo5",
    name: "Points fidélité x2",
    description: "Points de fidélité doublés le week-end",
    type: "loyalty",
    value: 2,
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-12-31"),
    status: "active",
    conditions: "Valable uniquement les samedis et dimanches",
    applicableItems: "all",
    usageCount: 95,
    createdAt: new Date("2025-03-20"),
    restaurantId: "1",
  },
]

// API pour la gestion des promotions
export const promotionApi = {
  // Récupérer toutes les promotions d'un restaurant
  getAll: async (restaurantId: string): Promise<Promotion[]> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Filtrer les promotions par restaurant
    return mockPromotions.filter((promotion) => promotion.restaurantId === restaurantId)
  },

  // Récupérer une promotion par son ID
  getById: async (promotionId: string): Promise<Promotion | undefined> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockPromotions.find((promotion) => promotion.id === promotionId)
  },

  // Mettre à jour une promotion
  update: async (promotionId: string, data: Partial<Promotion>): Promise<Promotion | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 700))

    const promotionIndex = mockPromotions.findIndex((promotion) => promotion.id === promotionId)

    if (promotionIndex === -1) {
      return null
    }

    // Mettre à jour la promotion
    const updatedPromotion = {
      ...mockPromotions[promotionIndex],
      ...data,
    }

    mockPromotions[promotionIndex] = updatedPromotion

    return updatedPromotion
  },

  // Créer une nouvelle promotion
  create: async (data: Omit<Promotion, "id" | "createdAt" | "usageCount">): Promise<Promotion> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newPromotion: Promotion = {
      id: uuidv4(),
      createdAt: new Date(),
      usageCount: 0,
      ...data,
    }

    mockPromotions.push(newPromotion)

    return newPromotion
  },

  // Supprimer une promotion
  delete: async (promotionId: string): Promise<boolean> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    const promotionIndex = mockPromotions.findIndex((promotion) => promotion.id === promotionId)

    if (promotionIndex === -1) {
      return false
    }

    mockPromotions.splice(promotionIndex, 1)

    return true
  },

  // Appliquer une promotion à une commande
  applyToOrder: async (
    promotionId: string,
    orderTotal: number,
    items: { id: string; categoryId: string; quantity: number; price: number }[],
  ): Promise<{ discountedTotal: number; discount: number; appliedPromotion: Promotion | null }> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 400))

    const promotion = mockPromotions.find((p) => p.id === promotionId)

    if (!promotion || promotion.status !== "active") {
      return { discountedTotal: orderTotal, discount: 0, appliedPromotion: null }
    }

    // Vérifier si la commande atteint le montant minimum requis
    if (promotion.minOrderValue && orderTotal < promotion.minOrderValue) {
      return { discountedTotal: orderTotal, discount: 0, appliedPromotion: null }
    }

    let discount = 0
    let discountedTotal = orderTotal

    // Calculer la remise en fonction du type de promotion
    switch (promotion.type) {
      case "percentage":
        // Appliquer le pourcentage de réduction
        if (promotion.applicableItems === "all") {
          discount = (orderTotal * promotion.value) / 100
        } else if (promotion.applicableItems === "category" && promotion.categoryId) {
          const categoryItems = items.filter((item) => item.categoryId === promotion.categoryId)
          const categoryTotal = categoryItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          discount = (categoryTotal * promotion.value) / 100
        } else if (promotion.applicableItems === "specific" && promotion.itemIds) {
          const specificItems = items.filter((item) => promotion.itemIds?.includes(item.id))
          const specificTotal = specificItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          discount = (specificTotal * promotion.value) / 100
        }
        break

      case "fixed":
        // Prix fixe (généralement pour un menu ou un ensemble)
        if (promotion.applicableItems === "specific" && promotion.itemIds) {
          const specificItems = items.filter((item) => promotion.itemIds?.includes(item.id))
          const specificTotal = specificItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          if (specificTotal > 0) {
            discount = specificTotal - promotion.value
            if (discount < 0) discount = 0 // Éviter les remises négatives
          }
        }
        break

      case "bogo":
        // Achetez-en 1, obtenez-en 1 (Buy One Get One)
        if (promotion.applicableItems === "category" && promotion.categoryId) {
          const categoryItems = items.filter((item) => item.categoryId === promotion.categoryId)
          // Trouver l'article le moins cher pour l'offrir
          if (categoryItems.length >= 2) {
            categoryItems.sort((a, b) => a.price - b.price)
            discount = categoryItems[0].price
          }
        } else if (promotion.applicableItems === "specific" && promotion.itemIds) {
          const specificItems = items.filter((item) => promotion.itemIds?.includes(item.id))
          if (specificItems.length >= 2) {
            specificItems.sort((a, b) => a.price - b.price)
            discount = specificItems[0].price
          }
        }
        break

      case "free_item":
        // Article gratuit (généralement un dessert ou une boisson)
        if (promotion.applicableItems === "category" && promotion.categoryId) {
          const categoryItems = items.filter((item) => item.categoryId === promotion.categoryId)
          if (categoryItems.length > 0) {
            // Offrir l'article le moins cher de la catégorie
            categoryItems.sort((a, b) => a.price - b.price)
            discount = categoryItems[0].price
          }
        } else if (promotion.applicableItems === "specific" && promotion.itemIds) {
          const specificItems = items.filter((item) => promotion.itemIds?.includes(item.id))
          if (specificItems.length > 0) {
            specificItems.sort((a, b) => a.price - b.price)
            discount = specificItems[0].price
          }
        }
        break

      case "loyalty":
        // Multiplicateur de points de fidélité (pas de remise directe)
        discount = 0
        break
    }

    // Calculer le total après remise
    discountedTotal = orderTotal - discount

    // Incrémenter le compteur d'utilisation
    const promotionIndex = mockPromotions.findIndex((p) => p.id === promotionId)
    if (promotionIndex !== -1) {
      mockPromotions[promotionIndex].usageCount += 1
    }

    return {
      discountedTotal,
      discount,
      appliedPromotion: promotion,
    }
  },

  // Vérifier la validité d'un code promo
  validateCode: async (
    code: string,
    restaurantId: string,
  ): Promise<{ valid: boolean; promotion: Promotion | null }> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    const promotion = mockPromotions.find(
      (p) => p.code === code && p.restaurantId === restaurantId && p.status === "active",
    )

    return {
      valid: !!promotion,
      promotion: promotion || null,
    }
  },
}
