"use client"

// Gestionnaire de stockage hors-ligne
import { useState, useEffect } from "react"

// Types pour le stockage hors-ligne
export interface OfflineItem {
  id: string
  data: any
  timestamp: number
  syncStatus: "pending" | "synced" | "failed"
  entityType: string
  action: "create" | "update" | "delete"
}

// Clé pour le stockage local
const OFFLINE_STORAGE_KEY = "restau_pilot_offline_data"

// Fonction pour sauvegarder des données en mode hors-ligne
export const saveOfflineData = (item: Omit<OfflineItem, "timestamp" | "syncStatus">) => {
  try {
    // Récupérer les données existantes
    const existingData = localStorage.getItem(OFFLINE_STORAGE_KEY)
    const offlineData: OfflineItem[] = existingData ? JSON.parse(existingData) : []

    // Ajouter le nouvel élément
    const newItem: OfflineItem = {
      ...item,
      timestamp: Date.now(),
      syncStatus: "pending",
    }

    // Sauvegarder les données mises à jour
    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify([...offlineData, newItem]))

    return true
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des données hors-ligne:", error)
    return false
  }
}

// Fonction pour récupérer les données hors-ligne
export const getOfflineData = (): OfflineItem[] => {
  try {
    const data = localStorage.getItem(OFFLINE_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Erreur lors de la récupération des données hors-ligne:", error)
    return []
  }
}

// Fonction pour mettre à jour le statut de synchronisation
export const updateSyncStatus = (id: string, status: "synced" | "failed") => {
  try {
    const offlineData = getOfflineData()
    const updatedData = offlineData.map((item) => (item.id === id ? { ...item, syncStatus: status } : item))

    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(updatedData))
    return true
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de synchronisation:", error)
    return false
  }
}

// Fonction pour supprimer les éléments synchronisés
export const clearSyncedItems = () => {
  try {
    const offlineData = getOfflineData()
    const pendingData = offlineData.filter((item) => item.syncStatus !== "synced")

    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(pendingData))
    return true
  } catch (error) {
    console.error("Erreur lors de la suppression des éléments synchronisés:", error)
    return false
  }
}

// Hook pour utiliser le stockage hors-ligne
export const useOfflineStorage = () => {
  const [offlineData, setOfflineData] = useState<OfflineItem[]>([])

  // Charger les données au montage du composant
  useEffect(() => {
    setOfflineData(getOfflineData())
  }, [])

  // Fonction pour ajouter un élément
  const addItem = (item: Omit<OfflineItem, "timestamp" | "syncStatus">) => {
    const success = saveOfflineData(item)
    if (success) {
      setOfflineData(getOfflineData())
    }
    return success
  }

  // Fonction pour mettre à jour le statut
  const updateStatus = (id: string, status: "synced" | "failed") => {
    const success = updateSyncStatus(id, status)
    if (success) {
      setOfflineData(getOfflineData())
    }
    return success
  }

  // Fonction pour nettoyer les éléments synchronisés
  const clearSynced = () => {
    const success = clearSyncedItems()
    if (success) {
      setOfflineData(getOfflineData())
    }
    return success
  }

  return {
    offlineData,
    addItem,
    updateStatus,
    clearSynced,
  }
}
