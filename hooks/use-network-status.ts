"use client"

import { useState, useEffect } from "react"

export interface NetworkStatus {
  online: boolean
  lastChanged: Date | null
  type: string | null
  downlink: number | null
  rtt: number | null
  effectiveType: string | null
}

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    online: typeof navigator !== "undefined" ? navigator.onLine : true,
    lastChanged: null,
    type: null,
    downlink: null,
    rtt: null,
    effectiveType: null,
  })

  useEffect(() => {
    // Fonction pour mettre à jour le statut
    const updateNetworkStatus = () => {
      const connection =
        "connection" in navigator && (navigator as any).connection ? (navigator as any).connection : null

      setStatus({
        online: navigator.onLine,
        lastChanged: new Date(),
        type: connection ? connection.type : null,
        downlink: connection ? connection.downlink : null,
        rtt: connection ? connection.rtt : null,
        effectiveType: connection ? connection.effectiveType : null,
      })
    }

    // Initialiser le statut
    updateNetworkStatus()

    // Ajouter les écouteurs d'événements
    window.addEventListener("online", updateNetworkStatus)
    window.addEventListener("offline", updateNetworkStatus)

    // Si l'API Network Information est disponible, écouter les changements
    if ("connection" in navigator && (navigator as any).connection) {
      ;(navigator as any).connection.addEventListener("change", updateNetworkStatus)
    }

    // Nettoyer les écouteurs d'événements
    return () => {
      window.removeEventListener("online", updateNetworkStatus)
      window.removeEventListener("offline", updateNetworkStatus)

      if ("connection" in navigator && (navigator as any).connection) {
        ;(navigator as any).connection.removeEventListener("change", updateNetworkStatus)
      }
    }
  }, [])

  return status
}
