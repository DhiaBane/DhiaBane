"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useNetworkStatus } from "@/hooks/use-network-status"
import { useOfflineStorage, type OfflineItem } from "@/lib/offline-storage"
import { defaultSyncManager } from "@/lib/sync-manager"
import { Progress } from "@/components/ui/progress"
import { OfflineWrapper } from "@/components/ui/offline-wrapper"
import { Wifi, WifiOff, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function OfflinePage({ params }: { params: { restaurantId: string } }) {
  const networkStatus = useNetworkStatus()
  const { offlineData, updateStatus, clearSynced, addItem } = useOfflineStorage()
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("status")
  const [testItems, setTestItems] = useState<OfflineItem[]>([])

  // Filtrer les données par statut
  const pendingItems = offlineData.filter((item) => item.syncStatus === "pending")
  const syncedItems = offlineData.filter((item) => item.syncStatus === "synced")
  const failedItems = offlineData.filter((item) => item.syncStatus === "failed")

  // Gérer la synchronisation
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
          // Mise à jour automatique via le hook useOfflineStorage
        },
      })
    } finally {
      setIsSyncing(false)
      setSyncProgress(0)
    }
  }

  // Ajouter un élément de test
  const addTestItem = useCallback(() => {
    const newItem = {
      id: `test-${Date.now()}`,
      data: { name: `Test Item ${Math.floor(Math.random() * 1000)}` },
      entityType: "test-items",
      action: "create" as const,
    }

    addItem(newItem)

    // Ajouter à la liste locale pour l'affichage immédiat
    setTestItems((prevItems) => [
      ...prevItems,
      {
        ...newItem,
        timestamp: Date.now(),
        syncStatus: "pending",
      },
    ])
  }, [addItem, setTestItems])

  // Formater la date
  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), "dd MMM yyyy HH:mm:ss", { locale: fr })
  }

  // Obtenir la couleur du badge en fonction du statut
  const getBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "synced":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Obtenir l'icône en fonction du statut
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "synced":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <OfflineWrapper>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Mode hors-ligne robuste</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Statut réseau</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {networkStatus.online ? (
                  <>
                    <Wifi className="h-5 w-5 text-green-500" />
                    <span>En ligne</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-5 w-5 text-red-500" />
                    <span>Hors-ligne</span>
                  </>
                )}
              </div>
              {networkStatus.effectiveType && (
                <p className="text-sm text-gray-500 mt-2">Type de connexion: {networkStatus.effectiveType}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Données en attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingItems.length}</div>
              <p className="text-sm text-gray-500">Éléments à synchroniser</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSync}
                disabled={!networkStatus.online || pendingItems.length === 0 || isSyncing}
                size="sm"
                className="w-full"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Synchronisation...
                  </>
                ) : (
                  "Synchroniser maintenant"
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Statut synchronisation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Réussis:</span>
                  <Badge variant="outline" className="bg-green-100">
                    {syncedItems.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Échoués:</span>
                  <Badge variant="outline" className="bg-red-100">
                    {failedItems.length}
                  </Badge>
                </div>
              </div>

              {isSyncing && (
                <div className="mt-4">
                  <Progress value={syncProgress} className="h-2" />
                  <p className="text-xs text-center mt-1">{syncProgress}%</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="status">Statut</TabsTrigger>
            <TabsTrigger value="data">Données</TabsTrigger>
            <TabsTrigger value="test">Test</TabsTrigger>
          </TabsList>

          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle>Fonctionnement du mode hors-ligne</CardTitle>
                <CardDescription>Comment RestauPilot gère les opérations sans connexion internet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Stockage local</h3>
                  <p>
                    Toutes les modifications effectuées en mode hors-ligne sont stockées localement dans le navigateur
                    et seront synchronisées automatiquement lorsque la connexion sera rétablie.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Synchronisation intelligente</h3>
                  <p>
                    Le système tente de synchroniser les données dès que la connexion est rétablie. En cas d'échec, les
                    tentatives sont répétées avec une stratégie de backoff exponentiel.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Résolution de conflits</h3>
                  <p>
                    En cas de conflit entre les données locales et distantes, le système utilise des stratégies de
                    résolution basées sur les horodatages et les règles métier.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Fonctionnalités disponibles hors-ligne</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Consultation des menus et inventaires</li>
                    <li>Prise de commandes</li>
                    <li>Gestion des tables</li>
                    <li>Modification des réservations</li>
                    <li>Ajout de clients</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Données en attente de synchronisation</CardTitle>
                <CardDescription>Liste des éléments stockés localement</CardDescription>
              </CardHeader>
              <CardContent>
                {offlineData.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">Aucune donnée en attente de synchronisation</p>
                ) : (
                  <div className="space-y-4">
                    {offlineData.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.syncStatus)}
                            <span className="font-medium">{item.entityType}</span>
                          </div>
                          <Badge className={getBadgeColor(item.syncStatus)}>{item.syncStatus}</Badge>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">ID: {item.id}</div>
                        <div className="text-sm text-gray-500 mb-2">Action: {item.action}</div>
                        <div className="text-sm text-gray-500">Date: {formatDate(item.timestamp)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={clearSynced} disabled={syncedItems.length === 0}>
                  Nettoyer les éléments synchronisés
                </Button>
                <Button onClick={handleSync} disabled={!networkStatus.online || pendingItems.length === 0 || isSyncing}>
                  {isSyncing ? "Synchronisation..." : "Synchroniser"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="test">
            <Card>
              <CardHeader>
                <CardTitle>Tester le mode hors-ligne</CardTitle>
                <CardDescription>Créez des éléments de test pour vérifier la synchronisation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm">Pour tester le mode hors-ligne, suivez ces étapes:</p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                      <li>Désactivez votre connexion internet (mode avion ou déconnexion réseau)</li>
                      <li>Créez quelques éléments de test en cliquant sur le bouton ci-dessous</li>
                      <li>Réactivez votre connexion internet</li>
                      <li>Observez la synchronisation automatique ou cliquez sur "Synchroniser"</li>
                    </ol>
                  </div>

                  <Button onClick={addTestItem}>Ajouter un élément de test</Button>

                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Éléments de test créés</h3>
                    {testItems.length === 0 ? (
                      <p className="text-center py-4 text-gray-500">Aucun élément de test créé</p>
                    ) : (
                      <div className="space-y-2">
                        {testItems.map((item) => (
                          <div key={item.id} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span>{item.data.name}</span>
                              <Badge className={getBadgeColor(item.syncStatus)}>{item.syncStatus}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OfflineWrapper>
  )
}
