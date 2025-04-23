"use server"

import type { SharedBill } from "@/types/shared-bill"
import { SIMULATION_MODE, getCurrentUser } from "@/lib/auth"

// Types
interface FetchSharedBillsResult {
  sent: SharedBill[]
  received: SharedBill[]
}

interface ActionResult {
  success: boolean
  error?: string
}

// Simulated shared bills storage
const sharedBills: Record<string, SharedBill> = {}

/**
 * Fetch shared bills for the current user
 */
export async function fetchSharedBills(): Promise<FetchSharedBillsResult> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate mock data if no shared bills exist
      if (Object.keys(sharedBills).length === 0) {
        // Create sample shared bills
        const mockSharedBills: SharedBill[] = [
          {
            id: "sb-1",
            restaurantName: "Le Bistrot Parisien",
            restaurantAddress: "15 Rue de la Paix, 75002 Paris",
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
            totalAmount: 120.5,
            tip: 10,
            status: "pending",
            note: "Dîner d'anniversaire de Sophie",
            sender: {
              id: "current-user",
              name: "Vous",
              phoneNumber: currentUser.phoneNumber,
              avatarUrl: "/placeholder.svg",
            },
            recipient: {
              id: "1",
              name: "Sophie Martin",
              phoneNumber: "+33612345678",
              avatarUrl: "/contemplative-artist.png",
            },
            shares: [
              {
                person: {
                  id: "1",
                  name: "Sophie Martin",
                  phoneNumber: "+33612345678",
                  avatarUrl: "/contemplative-artist.png",
                },
                amount: 40.5,
                status: "pending",
              },
              {
                person: {
                  id: "2",
                  name: "Thomas Dubois",
                  phoneNumber: "+33623456789",
                  avatarUrl: "/contemplative-man.png",
                },
                amount: 40,
                status: "paid",
              },
            ],
          },
          {
            id: "sb-2",
            restaurantName: "Sushi Sakura",
            restaurantAddress: "8 Avenue des Champs-Élysées, 75008 Paris",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            totalAmount: 85.75,
            tip: 5,
            status: "paid",
            receiptImageUrl: "/cafe-lunch-receipt.png",
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
            shares: [
              {
                person: {
                  id: "3",
                  name: "Emma Bernard",
                  phoneNumber: "+33634567890",
                  avatarUrl: "/thoughtful-reader.png",
                },
                amount: 42.5,
                status: "paid",
              },
            ],
          },
          {
            id: "sb-3",
            restaurantName: "La Trattoria",
            restaurantAddress: "22 Rue du Faubourg Saint-Antoine, 75012 Paris",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            totalAmount: 95.3,
            tip: 0,
            status: "pending",
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
            shares: [
              {
                person: {
                  id: "current-user",
                  name: "Vous",
                  phoneNumber: currentUser.phoneNumber,
                  avatarUrl: "/placeholder.svg",
                },
                amount: 47.65,
                status: "pending",
              },
            ],
          },
          {
            id: "sb-4",
            restaurantName: "Le Petit Café",
            restaurantAddress: "5 Rue de Rivoli, 75001 Paris",
            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
            totalAmount: 35.2,
            tip: 3,
            status: "paid",
            receiptImageUrl: "/cafe-order-receipt.png",
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
            shares: [
              {
                person: {
                  id: "current-user",
                  name: "Vous",
                  phoneNumber: currentUser.phoneNumber,
                  avatarUrl: "/placeholder.svg",
                },
                amount: 17.6,
                status: "paid",
              },
            ],
          },
        ]

        // Store shared bills
        mockSharedBills.forEach((bill) => {
          sharedBills[bill.id] = bill
        })
      }

      // Filter shared bills for current user
      const sent = Object.values(sharedBills).filter((bill) => bill.sender.phoneNumber === currentUser.phoneNumber)
      const received = Object.values(sharedBills).filter(
        (bill) =>
          bill.recipient.phoneNumber === currentUser.phoneNumber ||
          bill.shares.some((share) => share.person.phoneNumber === currentUser.phoneNumber),
      )

      return { sent, received }
    }

    // In production, this would fetch shared bills from the database
    return { sent: [], received: [] }
  } catch (error) {
    console.error("Error fetching shared bills:", error)
    throw new Error("Une erreur est survenue lors du chargement des additions partagées")
  }
}

/**
 * Accept a shared bill
 */
export async function acceptSharedBill(billId: string): Promise<ActionResult> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()

      // Check if bill exists
      const bill = sharedBills[billId]
      if (!bill) {
        return {
          success: false,
          error: "Addition partagée introuvable",
        }
      }

      // Check if bill is for current user
      const userShare = bill.shares.find((share) => share.person.phoneNumber === currentUser.phoneNumber)
      if (!userShare) {
        return {
          success: false,
          error: "Cette addition partagée ne vous concerne pas",
        }
      }

      // Check if bill is pending
      if (bill.status !== "pending") {
        return {
          success: false,
          error: "Cette addition partagée n'est plus en attente",
        }
      }

      // Update share status
      userShare.status = "paid"

      // Check if all shares are paid
      const allPaid = bill.shares.every((share) => share.status === "paid")
      if (allPaid) {
        bill.status = "paid"
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    // In production, this would update the shared bill in the database
    return { success: true }
  } catch (error) {
    console.error("Error accepting shared bill:", error)
    return {
      success: false,
      error: "Une erreur est survenue lors de l'acceptation de l'addition partagée",
    }
  }
}

/**
 * Decline a shared bill
 */
export async function declineSharedBill(billId: string): Promise<ActionResult> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()

      // Check if bill exists
      const bill = sharedBills[billId]
      if (!bill) {
        return {
          success: false,
          error: "Addition partagée introuvable",
        }
      }

      // Check if bill is for current user
      const userShare = bill.shares.find((share) => share.person.phoneNumber === currentUser.phoneNumber)
      if (!userShare) {
        return {
          success: false,
          error: "Cette addition partagée ne vous concerne pas",
        }
      }

      // Check if bill is pending
      if (bill.status !== "pending") {
        return {
          success: false,
          error: "Cette addition partagée n'est plus en attente",
        }
      }

      // Update share status
      userShare.status = "declined"

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    // In production, this would update the shared bill in the database
    return { success: true }
  } catch (error) {
    console.error("Error declining shared bill:", error)
    return {
      success: false,
      error: "Une erreur est survenue lors du refus de l'addition partagée",
    }
  }
}

/**
 * Send a reminder for a shared bill
 */
export async function remindSharedBill(billId: string): Promise<ActionResult> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()

      // Check if bill exists
      const bill = sharedBills[billId]
      if (!bill) {
        return {
          success: false,
          error: "Addition partagée introuvable",
        }
      }

      // Check if bill is from current user
      if (bill.sender.phoneNumber !== currentUser.phoneNumber) {
        return {
          success: false,
          error: "Vous ne pouvez pas envoyer de rappel pour cette addition partagée",
        }
      }

      // Check if bill is pending
      if (bill.status !== "pending") {
        return {
          success: false,
          error: "Cette addition partagée n'est plus en attente",
        }
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    // In production, this would send a reminder for the shared bill
    return { success: true }
  } catch (error) {
    console.error("Error sending reminder for shared bill:", error)
    return {
      success: false,
      error: "Une erreur est survenue lors de l'envoi du rappel",
    }
  }
}
