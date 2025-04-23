"use server"

import type {
  UserProfile,
  DietaryPreferences,
  NotificationSettings,
  PaymentMethod,
  PrivacySettings,
} from "@/types/profile"
import { SIMULATION_MODE, getCurrentUser } from "@/lib/auth"

// Simulated user profiles storage
const userProfiles: Record<string, UserProfile> = {}

/**
 * Fetch user profile
 */
export async function fetchUserProfile(): Promise<UserProfile> {
  try {
    // Get current user
    const currentUser = getCurrentUser()
    const phoneNumber = currentUser.phoneNumber

    if (SIMULATION_MODE) {
      // Check if profile exists
      if (!userProfiles[phoneNumber]) {
        // Create default profile
        userProfiles[phoneNumber] = {
          id: `user-${Date.now()}`,
          name: "Utilisateur RestoPilote",
          email: "",
          phoneNumber,
          avatarUrl: "",
          dietaryPreferences: {
            diet: "none",
            allergies: [],
            tastePreferences: [],
          },
          notificationSettings: {
            pushEnabled: true,
            emailEnabled: true,
            smsEnabled: true,
            orderUpdates: true,
            reservationReminders: true,
            specialOffers: false,
            friendActivity: true,
          },
          paymentMethods: [],
          privacySettings: {
            profileVisibility: "public",
            shareActivity: true,
            shareLocation: true,
            allowFriendRequests: true,
            allowTagging: true,
          },
        }
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return userProfiles[phoneNumber]
    }

    // Return a mock profile for now
    return {
      id: "user-123",
      name: "Utilisateur RestoPilote",
      email: "",
      phoneNumber: "+33612345678",
      avatarUrl: "",
      dietaryPreferences: {
        diet: "none",
        allergies: [],
        tastePreferences: [],
      },
      notificationSettings: {
        pushEnabled: true,
        emailEnabled: true,
        smsEnabled: true,
        orderUpdates: true,
        reservationReminders: true,
        specialOffers: false,
        friendActivity: true,
      },
      paymentMethods: [],
      privacySettings: {
        profileVisibility: "public",
        shareActivity: true,
        shareLocation: true,
        allowFriendRequests: true,
        allowTagging: true,
      },
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    throw new Error("Failed to fetch user profile")
  }
}

/**
 * Update user profile
 */
export async function updateProfile(data: {
  name: string
  email: string
  phoneNumber: string
  avatarUrl: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()
      const phoneNumber = currentUser.phoneNumber

      // Check if profile exists
      if (!userProfiles[phoneNumber]) {
        // Create default profile
        await fetchUserProfile()
      }

      // Update profile
      userProfiles[phoneNumber] = {
        ...userProfiles[phoneNumber],
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    // In production, this would update the user profile in the database
    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

/**
 * Update dietary preferences
 */
export async function updateDietaryPreferences(
  preferences: DietaryPreferences,
): Promise<{ success: boolean; error?: string }> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()
      const phoneNumber = currentUser.phoneNumber

      // Check if profile exists
      if (!userProfiles[phoneNumber]) {
        // Create default profile
        await fetchUserProfile()
      }

      // Update preferences
      userProfiles[phoneNumber] = {
        ...userProfiles[phoneNumber],
        dietaryPreferences: preferences,
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    // In production, this would update the dietary preferences in the database
    return { success: true }
  } catch (error) {
    console.error("Error updating dietary preferences:", error)
    return { success: false, error: "Failed to update dietary preferences" }
  }
}

/**
 * Update notification settings
 */
export async function updateNotificationSettings(
  settings: NotificationSettings,
): Promise<{ success: boolean; error?: string }> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()
      const phoneNumber = currentUser.phoneNumber

      // Check if profile exists
      if (!userProfiles[phoneNumber]) {
        // Create default profile
        await fetchUserProfile()
      }

      // Update settings
      userProfiles[phoneNumber] = {
        ...userProfiles[phoneNumber],
        notificationSettings: settings,
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    // In production, this would update the notification settings in the database
    return { success: true }
  } catch (error) {
    console.error("Error updating notification settings:", error)
    return { success: false, error: "Failed to update notification settings" }
  }
}

/**
 * Add payment method
 */
export async function addPaymentMethod(data: {
  cardNumber: string
  cardholderName: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}): Promise<{ success: boolean; paymentMethod?: PaymentMethod; error?: string }> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()
      const phoneNumber = currentUser.phoneNumber

      // Check if profile exists
      if (!userProfiles[phoneNumber]) {
        // Create default profile
        await fetchUserProfile()
      }

      // Create payment method
      const paymentMethod: PaymentMethod = {
        id: `pm-${Date.now()}`,
        cardNumber: data.cardNumber.replace(/\s/g, ""),
        cardholderName: data.cardholderName,
        expiryMonth: data.expiryMonth,
        expiryYear: data.expiryYear,
        isDefault: userProfiles[phoneNumber].paymentMethods.length === 0,
      }

      // Add payment method
      userProfiles[phoneNumber] = {
        ...userProfiles[phoneNumber],
        paymentMethods: [...userProfiles[phoneNumber].paymentMethods, paymentMethod],
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      return { success: true, paymentMethod }
    }

    // In production, this would add the payment method to the database
    return { success: true }
  } catch (error) {
    console.error("Error adding payment method:", error)
    return { success: false, error: "Failed to add payment method" }
  }
}

/**
 * Remove payment method
 */
export async function removePaymentMethod(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()
      const phoneNumber = currentUser.phoneNumber

      // Check if profile exists
      if (!userProfiles[phoneNumber]) {
        // Create default profile
        await fetchUserProfile()
      }

      // Remove payment method
      userProfiles[phoneNumber] = {
        ...userProfiles[phoneNumber],
        paymentMethods: userProfiles[phoneNumber].paymentMethods.filter((method) => method.id !== id),
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    // In production, this would remove the payment method from the database
    return { success: true }
  } catch (error) {
    console.error("Error removing payment method:", error)
    return { success: false, error: "Failed to remove payment method" }
  }
}

/**
 * Update privacy settings
 */
export async function updatePrivacySettings(settings: PrivacySettings): Promise<{ success: boolean; error?: string }> {
  try {
    if (SIMULATION_MODE) {
      // Get current user
      const currentUser = getCurrentUser()
      const phoneNumber = currentUser.phoneNumber

      // Check if profile exists
      if (!userProfiles[phoneNumber]) {
        // Create default profile
        await fetchUserProfile()
      }

      // Update settings
      userProfiles[phoneNumber] = {
        ...userProfiles[phoneNumber],
        privacySettings: settings,
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    // In production, this would update the privacy settings in the database
    return { success: true }
  } catch (error) {
    console.error("Error updating privacy settings:", error)
    return { success: false, error: "Failed to update privacy settings" }
  }
}
