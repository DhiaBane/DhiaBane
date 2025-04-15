"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, Trash } from "lucide-react"
import type { Extension } from "@/types/extensions"
import { extensionService } from "@/lib/services/extension-service"

export default function ExtensionSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params?.restaurantId as string
  const extensionId = params?.extensionId as string

  const [extension, setExtension] = useState<Extension | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("general")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchExtension = async () => {
      try {
        setLoading(true)
        const data = await extensionService.getExtensionById(extensionId)
        if (data) {
          setExtension(data)
        } else {
          // Rediriger vers la page des extensions si l'extension n'est pas trouvée
          router.push(`/dashboard/${restaurantId}/extensions`)
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'extension:", error)
        router.push(`/dashboard/${restaurantId}/extensions`)
      } finally {
        setLoading(false)
      }
    }

    fetchExtension()
  }, [extensionId, restaurantId, router])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleUninstall = async () => {
    if (!extension) return

    if (confirm(`Êtes-vous sûr de vouloir désinstaller l'extension "${extension.name}" ?`)) {
      try {
        await extensionService.uninstallExtension(extension.id)
        router.push(`/dashboard/${restaurantId}/extensions`)
      } catch (error) {
        console.error("Erreur lors de la désinstallation de l'extension:", error)
      }
    }
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={() => router.push(`/dashboard/${restaurantId}/extensions/${extensionId}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {loading ? "Chargement..." : `Paramètres: ${extension?.name}`}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUninstall} className="text-red-500">
            <Trash className="h-4 w-4 mr-2" />
            Désinstaller
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : extension ? (
        <>
          {saved && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md mb-4">
              Paramètres enregistrés avec succès !
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="appearance">Apparence</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="advanced">Avancé</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres généraux</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="extension-name">Nom de l&apos;extension</Label>
                    <Input id="extension-name" defaultValue={extension.name} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="extension-description">Description</Label>
                    <Input id="extension-description" defaultValue={extension.description} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="extension-enabled" defaultChecked />
                    <Label htmlFor="extension-enabled">Activer l&apos;extension</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Apparence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="primary-color">Couleur principale</Label>
                    <div className="flex gap-2">
                      <Input id="primary-color" type="color" defaultValue="#3b82f6" className="w-16 h-10" />
                      <Input id="primary-color-hex" defaultValue="#3b82f6" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="logo-position">Position du logo</Label>
                    <select id="logo-position" className="w-full p-2 border rounded-md">
                      <option value="left">Gauche</option>
                      <option value="center">Centre</option>
                      <option value="right">Droite</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="show-branding" defaultChecked />
                    <Label htmlFor="show-branding">Afficher le branding</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Permissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Accès aux données clients</h3>
                      <p className="text-sm text-muted-foreground">
                        Autoriser l&apos;extension à accéder aux données clients
                      </p>
                    </div>
                    <Switch id="customer-data-access" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Accès aux données de vente</h3>
                      <p className="text-sm text-muted-foreground">
                        Autoriser l&apos;extension à accéder aux données de vente
                      </p>
                    </div>
                    <Switch id="sales-data-access" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Accès aux données d&apos;inventaire</h3>
                      <p className="text-sm text-muted-foreground">
                        Autoriser l&apos;extension à accéder aux données d&apos;inventaire
                      </p>
                    </div>
                    <Switch id="inventory-data-access" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres avancés</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">Clé API</Label>
                    <Input
                      id="api-key"
                      defaultValue="sk_live_51KjLmHGjk8XYZ123456789abcdefghijklmnopqrstuvwxyz"
                      type="password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="webhook-url">URL Webhook</Label>
                    <Input id="webhook-url" defaultValue="https://api.example.com/webhooks/restau-pilot" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cache-duration">Durée du cache (minutes)</Label>
                    <Input id="cache-duration" type="number" defaultValue="15" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="debug-mode" />
                    <Label htmlFor="debug-mode">Mode debug</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Extension non trouvée</h2>
          <p className="mt-2 text-muted-foreground">
            L&apos;extension que vous recherchez n&apos;existe pas ou a été supprimée.
          </p>
          <Button className="mt-4" onClick={() => router.push(`/dashboard/${restaurantId}/extensions`)}>
            Retour au marketplace
          </Button>
        </div>
      )}
    </DashboardShell>
  )
}
