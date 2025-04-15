"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useNetworkStatus } from "@/hooks/use-network-status"
import { OfflineIndicator } from "./offline-indicator"
import { WifiOff } from "lucide-react"

interface OfflineWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function OfflineWrapper({ children, fallback }: OfflineWrapperProps) {
  const networkStatus = useNetworkStatus()
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  // Afficher un message hors-ligne après un court délai
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (!networkStatus.online) {
      timer = setTimeout(() => {
        setShowOfflineMessage(true)
      }, 2000)
    } else {
      setShowOfflineMessage(false)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [networkStatus.online])

  return (
    <>
      {children}
      <OfflineIndicator />

      {showOfflineMessage && !fallback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md text-center">
            <WifiOff className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h3 className="text-xl font-bold mb-2">Mode hors-ligne</h3>
            <p className="mb-4">
              Vous êtes actuellement hors-ligne. Certaines fonctionnalités peuvent être limitées, mais vos modifications
              seront enregistrées et synchronisées lorsque vous serez à nouveau en ligne.
            </p>
            <button onClick={() => setShowOfflineMessage(false)} className="px-4 py-2 bg-primary text-white rounded-md">
              Continuer en mode hors-ligne
            </button>
          </div>
        </div>
      )}

      {!networkStatus.online && fallback ? fallback : null}
    </>
  )
}
