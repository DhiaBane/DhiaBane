"use server"

import { cookies } from "next/headers"
import { SIMULATION_MODE } from "@/lib/auth"

type AuthResult = {
  success: boolean
  error?: string
  isNewUser?: boolean
}

type LogoutResult = {
  success: boolean
  error?: string
}

type DeleteAccountResult = {
  success: boolean
  error?: string
}

type CreateProfileResult = {
  success: boolean
  error?: string
}

type ConnectSocialResult = {
  success: boolean
  error?: string
}

/**
 * Create user profile
 */
export async function createUserProfile(data: {
  phoneNumber: string
  name: string
  email?: string
  avatarUrl?: string
}): Promise<CreateProfileResult> {
  try {
    if (SIMULATION_MODE) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    return { success: false, error: "Simulation mode is disabled" }
  } catch (error) {
    console.error("Error creating user profile:", error)
    return { success: false, error: "Failed to create user profile" }
  }
}

/**
 * Verify phone number
 */
export async function verifyPhoneNumber(phoneNumber: string): Promise<AuthResult> {
  try {
    if (SIMULATION_MODE) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    return { success: false, error: "Simulation mode is disabled" }
  } catch (error) {
    console.error("Error verifying phone number:", error)
    return { success: false, error: "Failed to verify phone number" }
  }
}

/**
 * Verify code
 */
export async function verifyCode(phoneNumber: string, code: string): Promise<AuthResult> {
  try {
    if (SIMULATION_MODE) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock logic to determine if it's a new user
      const isNewUser = phoneNumber === "+33600000000" // Example condition

      return { success: true, isNewUser }
    }

    return { success: false, error: "Simulation mode is disabled" }
  } catch (error) {
    console.error("Error verifying code:", error)
    return { success: false, error: "Failed to verify code" }
  }
}

/**
 * Resend verification code
 */
export async function resendVerificationCode(phoneNumber: string): Promise<AuthResult> {
  try {
    if (SIMULATION_MODE) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      return { success: true }
    }

    return { success: false, error: "Simulation mode is disabled" }
  } catch (error) {
    console.error("Error resending verification code:", error)
    return { success: false, error: "Failed to resend verification code" }
  }
}

/**
 * Connect social account
 */
export async function connectSocialAccount(provider: string): Promise<ConnectSocialResult> {
  try {
    if (SIMULATION_MODE) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    }

    return { success: false, error: "Simulation mode is disabled" }
  } catch (error) {
    console.error("Error connecting social account:", error)
    return { success: false, error: "Failed to connect social account" }
  }
}

export async function logout(): Promise<LogoutResult> {
  try {
    cookies().delete("auth_token")
    return { success: true }
  } catch (error) {
    console.error("Error logging out:", error)
    return { success: false, error: "Failed to logout" }
  }
}

export async function deleteAccount(): Promise<DeleteAccountResult> {
  try {
    // In a real application, you would delete the user account from the database.
    cookies().delete("auth_token")
    return { success: true }
  } catch (error) {
    console.error("Error deleting account:", error)
    return { success: false, error: "Failed to delete account" }
  }
}
