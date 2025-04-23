"use client"

import { useState, useEffect } from "react"
import type { UserProfile } from "@/types/profile"
import { fetchUserProfile } from "@/actions/profile-actions"

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
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
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchUserProfile()
        setProfile(data)
      } catch (err) {
        console.error("Error loading profile:", err)
        setError("Impossible de charger le profil")
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  const refreshProfile = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchUserProfile()
      setProfile(data)
    } catch (err) {
      console.error("Error refreshing profile:", err)
      setError("Impossible de rafraîchir le profil")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    profile,
    isLoading,
    error,
    refreshProfile,
  }
}
