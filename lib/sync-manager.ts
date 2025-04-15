// Gestionnaire de synchronisation
import { getOfflineData, updateSyncStatus, clearSyncedItems, type OfflineItem } from "./offline-storage"

// Interface pour les options de synchronisation
interface SyncOptions {
  onProgress?: (processed: number, total: number) => void
  onComplete?: (success: number, failed: number) => void
  onError?: (error: Error) => void
  batchSize?: number
}

// Classe pour gérer la synchronisation
export class SyncManager {
  private isSyncing = false
  private apiBaseUrl: string

  constructor(apiBaseUrl = "/api") {
    this.apiBaseUrl = apiBaseUrl
  }

  // Vérifier si une synchronisation est en cours
  public get syncing(): boolean {
    return this.isSyncing
  }

  // Synchroniser les données hors-ligne
  public async syncOfflineData(options: SyncOptions = {}): Promise<boolean> {
    if (this.isSyncing) {
      return false
    }

    try {
      this.isSyncing = true
      const offlineData = getOfflineData()
      const pendingItems = offlineData.filter((item) => item.syncStatus === "pending")

      if (pendingItems.length === 0) {
        if (options.onComplete) {
          options.onComplete(0, 0)
        }
        return true
      }

      const batchSize = options.batchSize || 10
      let processed = 0
      let success = 0
      let failed = 0

      // Traiter par lots
      for (let i = 0; i < pendingItems.length; i += batchSize) {
        const batch = pendingItems.slice(i, i + batchSize)

        // Traiter chaque élément du lot
        const results = await Promise.allSettled(batch.map((item) => this.syncItem(item)))

        // Mettre à jour les compteurs
        results.forEach((result, index) => {
          const item = batch[index]
          if (result.status === "fulfilled" && result.value) {
            updateSyncStatus(item.id, "synced")
            success++
          } else {
            updateSyncStatus(item.id, "failed")
            failed++
          }
          processed++

          if (options.onProgress) {
            options.onProgress(processed, pendingItems.length)
          }
        })
      }

      // Nettoyer les éléments synchronisés
      clearSyncedItems()

      if (options.onComplete) {
        options.onComplete(success, failed)
      }

      return failed === 0
    } catch (error) {
      if (options.onError && error instanceof Error) {
        options.onError(error)
      }
      return false
    } finally {
      this.isSyncing = false
    }
  }

  // Synchroniser un élément individuel
  private async syncItem(item: OfflineItem): Promise<boolean> {
    try {
      const endpoint = `${this.apiBaseUrl}/${item.entityType}`
      let url = endpoint
      let method = "POST"

      // Déterminer la méthode HTTP en fonction de l'action
      switch (item.action) {
        case "create":
          method = "POST"
          break
        case "update":
          method = "PUT"
          url = `${endpoint}/${item.id}`
          break
        case "delete":
          method = "DELETE"
          url = `${endpoint}/${item.id}`
          break
      }

      // Effectuer la requête
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: item.action !== "delete" ? JSON.stringify(item.data) : undefined,
      })

      return response.ok
    } catch (error) {
      console.error(`Erreur lors de la synchronisation de l'élément ${item.id}:`, error)
      return false
    }
  }
}

// Exporter une instance par défaut
export const defaultSyncManager = new SyncManager()
