"use client"

import { useState, useEffect } from "react"
import type { GiftCard } from "@/types/gift-card"
import { fetchGiftCards } from "@/actions/gift-card-actions"

export function useGiftCards() {
  const [receivedCards, setReceivedCards] = useState<GiftCard[]>([])
  const [sentCards, setSentCards] = useState<GiftCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGiftCards = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { received, sent } = await fetchGiftCards()
        setReceivedCards(received)
        setSentCards(sent)
      } catch (err) {
        console.error("Error loading gift cards:", err)
        setError("Impossible de charger les cartes cadeaux")
      } finally {
        setIsLoading(false)
      }
    }

    loadGiftCards()
  }, [])

  const refreshGiftCards = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { received, sent } = await fetchGiftCards()
      setReceivedCards(received)
      setSentCards(sent)
    } catch (err) {
      console.error("Error refreshing gift cards:", err)
      setError("Impossible de rafraîchir les cartes cadeaux")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    receivedCards,
    sentCards,
    isLoading,
    error,
    refreshGiftCards,
  }
}
