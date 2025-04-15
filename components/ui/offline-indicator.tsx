"use client"

import { useNetworkStatus } from "@/hooks/use-network-status"
import { Wifi, WifiOff, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { defaultSyncManager } from "@/lib/sync-manager"
import { getOfflineData } from "@/lib/offline-storage"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function OfflineIndicator() {
  const networkStatus = useNetworkStatus()
  const [pendingItems, setPendingItems] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  // Mettre à jour le nombre d'éléments en attente
  useEffect(() => {
    const updatePendingCount = () => {
      const offlineData = getOfflineData()
      const pending = offlineData.filter((item) => item.syncStatus === "pending").length
      setPendingItems(pending)
    }

    // Vérifier au chargement
    updatePendingCount()

    // Vérifier périodiquement
    const interval = setInterval(updatePendingCount, 5000)

    return () => clearInterval(interval)
  }, [])

  // Synchroniser les données lorsque la connexion est rétablie
  useEffect(() => {
    if (networkStatus.online && pendingItems > 0 && !isSyncing) {
      handleSync()
    }
  }, [networkStatus.online, pendingItems])

  // Gérer la synchronisation manuelle
  const handleSync = async () => {
    if (isSyncing || !networkStatus.online) return

    setIsSyncing(true)
    setSyncProgress(0)

    try {
      await defaultSyncManager.syncOfflineData({
        onProgress: (processed, total) => {
          setSyncProgress(Math.floor((processed / total) * 100))
        },
        onComplete: (success, failed) => {
          setToastMessage(`Synchronisation terminée: ${success} réussis, ${failed} échoués`)
          setShowToast(true)
          setTimeout(() => setShowToast(false), 3000)
          setPendingItems(failed)
        },
        onError: (error) => {
          setToastMessage(`Erreur de synchronisation: ${error.message}`)
          setShowToast(true)
          setTimeout(() => setShowToast(false), 3000)
        },
      })
    } finally {
      setIsSyncing(false)
    }
  }

  // Si en ligne et pas d'éléments en attente, ne rien afficher
  if (networkStatus.online && pendingItems === 0 && !isSyncing) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 p-3 rounded-lg shadow-lg bg-white dark:bg-gray-800">
              {networkStatus.online ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}

              {pendingItems > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{pendingItems} en attente</span>

                  {networkStatus.online && !isSyncing && (
                    <Button variant="outline" size="sm" onClick={handleSync} className="h-7 px-2">
                      Synchroniser
                    </Button>
                  )}
                </div>
              )}

              {isSyncing && (
                <div className="flex flex-col gap-1 w-32">
                  <span className="text-xs">Synchronisation...</span>
                  <Progress value={syncProgress} className="h-2" />
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {networkStatus.online
              ? `Connecté - ${networkStatus.effectiveType || "Connexion"}`
              : "Mode hors-ligne - Les modifications seront synchronisées lorsque vous serez en ligne"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {showToast && (
        <div className="absolute bottom-16 right-0 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
