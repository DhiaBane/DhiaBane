"use client"

import { useState, useEffect } from "react"
import type { SharedBill } from "@/types/shared-bill"
import { fetchSharedBills } from "@/actions/shared-bill-actions"

export function useSharedBills() {
  const [sentBills, setSentBills] = useState<SharedBill[]>([])
  const [receivedBills, setReceivedBills] = useState<SharedBill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSharedBills = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { sent, received } = await fetchSharedBills()
        setSentBills(sent)
        setReceivedBills(received)
      } catch (err) {
        console.error("Error loading shared bills:", err)
        setError("Impossible de charger les additions partagées")
      } finally {
        setIsLoading(false)
      }
    }

    loadSharedBills()
  }, [])

  const refreshSharedBills = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { sent, received } = await fetchSharedBills()
      setSentBills(sent)
      setReceivedBills(received)
    } catch (err) {
      console.error("Error refreshing shared bills:", err)
      setError("Impossible de rafraîchir les additions partagées")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    sentBills,
    receivedBills,
    isLoading,
    error,
    refreshSharedBills,
  }
}
