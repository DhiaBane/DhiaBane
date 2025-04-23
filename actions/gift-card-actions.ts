"use server"

import type { GiftCard } from "@/types/gift-card"
import { SIMULATION_MODE, getCurrentUser } from "@/lib/auth"

// Types
interface SendGiftCardParams {
  recipientId: string
  recipientPhone: string
  amount: number
  title: string
  message?: string
  design?: string
}

interface SendGiftCardResult {
  success: boolean
  giftCardId?: string
  error?: string
}

interface FetchGiftCardsResult {
  received: GiftCard[]
  sent: GiftCard[]
}

// Simulated gift cards storage
const giftCards: Record<string, GiftCard> = {}

/**
 * Generate a random gift card code
 */
function generateGiftCardCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) {
      code += "-"
    }
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

/**
 * Send a gift card to a recipient
 */
export async function sendGiftCard(params: SendGiftCardParams): Promise<SendGiftCardResult> {
  try {
    const { recipientId, recipientPhone, amount, title, message, design = "default" } = params

    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()

      // Generate gift card ID
      const giftCardId = `gc-${Date.now()}-${Math.floor(Math.random() * 1000)}`

      // Create expiry date (1 year from now)
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 1)

      // Create gift card
      const giftCard: GiftCard = {
        id: giftCardId,
        code: generateGiftCardCode(),
        amount,
        title,
        message: message || "",
        design: design || "default",
        status: "active",
        createdAt: new Date().toISOString(),
        expiryDate: expiryDate.toISOString(),
        sender: {
          id: "current-user",
          name: "Vous",
          phoneNumber: currentUser.phoneNumber,
          avatarUrl: "/placeholder.svg",
        },
        recipient: {
          id: recipientId,
          name: recipientId === "new-user" ? `Utilisateur (${recipientPhone})` : `Ami ${recipientId}`,
          phoneNumber: recipientPhone,
          avatarUrl: "/placeholder.svg",
        },
      }

      // Store gift card
      giftCards[giftCardId] = giftCard

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      return { success: true, giftCardId }
    }

    // In production, this would create a gift card in the database
    return { success: true }
  } catch (error) {
    console.error("Error sending gift card:", error)
    return {
      success: false,
      error: "Une erreur est survenue lors de l'envoi de la carte cadeau. Veuillez réessayer.",
    }
  }
}

/**
 * Fetch gift cards for the current user
 */
export async function fetchGiftCards(): Promise<FetchGiftCardsResult> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate mock data if no gift cards exist
      if (Object.keys(giftCards).length === 0) {
        // Create sample received gift cards
        const receivedCards: GiftCard[] = [
          {
            id: "gc-received-1",
            code: "ABCD-1234-EFGH",
            amount: 50,
            title: "Joyeux Anniversaire !",
            message: "Profite bien de ton anniversaire avec un bon repas !",
            design: "birthday",
            status: "active",
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            expiryDate: new Date(Date.now() + 358 * 24 * 60 * 60 * 1000).toISOString(), // 358 days from now
            sender: {
              id: "1",
              name: "Sophie Martin",
              phoneNumber: "+33612345678",
              avatarUrl: "/contemplative-artist.png",
            },
            recipient: {
              id: "current-user",
              name: "Vous",
              phoneNumber: currentUser.phoneNumber,
              avatarUrl: "/placeholder.svg",
            },
          },
          {
            id: "gc-received-2",
            code: "WXYZ-9876-MNOP",
            amount: 100,
            title: "Merci pour ton aide !",
            message: "Un petit merci pour ton aide sur le projet. Régale-toi !",
            design: "thankyou",
            status: "active",
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
            expiryDate: new Date(Date.now() + 351 * 24 * 60 * 60 * 1000).toISOString(), // 351 days from now
            sender: {
              id: "2",
              name: "Thomas Dubois",
              phoneNumber: "+33623456789",
              avatarUrl: "/contemplative-man.png",
            },
            recipient: {
              id: "current-user",
              name: "Vous",
              phoneNumber: currentUser.phoneNumber,
              avatarUrl: "/placeholder.svg",
            },
          },
        ]

        // Create sample sent gift cards
        const sentCards: GiftCard[] = [
          {
            id: "gc-sent-1",
            code: "QRST-5678-UVWX",
            amount: 75,
            title: "Félicitations pour ta promotion !",
            message: "Bravo pour ta promotion ! Voici de quoi fêter ça dans un bon restaurant.",
            design: "congratulations",
            status: "active",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
            expiryDate: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000).toISOString(), // 360 days from now
            sender: {
              id: "current-user",
              name: "Vous",
              phoneNumber: currentUser.phoneNumber,
              avatarUrl: "/placeholder.svg",
            },
            recipient: {
              id: "3",
              name: "Emma Bernard",
              phoneNumber: "+33634567890",
              avatarUrl: "/thoughtful-reader.png",
            },
          },
        ]

        // Store gift cards
        receivedCards.forEach((card) => {
          giftCards[card.id] = card
        })

        sentCards.forEach((card) => {
          giftCards[card.id] = card
        })
      }

      // Filter gift cards for current user
      const received = Object.values(giftCards).filter((card) => card.recipient.phoneNumber === currentUser.phoneNumber)

      const sent = Object.values(giftCards).filter((card) => card.sender.phoneNumber === currentUser.phoneNumber)

      return { received, sent }
    }

    // In production, this would fetch gift cards from the database
    return { received: [], sent: [] }
  } catch (error) {
    console.error("Error fetching gift cards:", error)
    throw new Error("Une erreur est survenue lors du chargement des cartes cadeaux")
  }
}

/**
 * Redeem a gift card
 */
export async function redeemGiftCard(giftCardId: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()

      // Check if gift card exists
      const giftCard = giftCards[giftCardId]
      if (!giftCard) {
        return {
          success: false,
          error: "Carte cadeau introuvable",
        }
      }

      // Check if gift card belongs to current user
      if (giftCard.recipient.phoneNumber !== currentUser.phoneNumber) {
        return {
          success: false,
          error: "Cette carte cadeau ne vous appartient pas",
        }
      }

      // Check if gift card is active
      if (giftCard.status !== "active") {
        return {
          success: false,
          error: `Cette carte cadeau est ${giftCard.status === "redeemed" ? "déjà utilisée" : "expirée"}`,
        }
      }

      // Update gift card status
      giftCards[giftCardId] = {
        ...giftCard,
        status: "redeemed",
        redeemedAt: new Date().toISOString(),
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    // In production, this would redeem a gift card in the database
    return { success: true }
  } catch (error) {
    console.error("Error redeeming gift card:", error)
    return {
      success: false,
      error: "Une erreur est survenue lors de l'utilisation de la carte cadeau",
    }
  }
}
