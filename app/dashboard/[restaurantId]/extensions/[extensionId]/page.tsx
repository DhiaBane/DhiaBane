"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Extension } from "@/types/extensions"
import { extensionService } from "@/lib/services/extension-service"
import { ExtensionDetails } from "@/components/extensions/extension-details"

export default function ExtensionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params?.restaurantId as string
  const extensionId = params?.extensionId as string

  const [extension, setExtension] = useState<Extension | null>(null)
  const [loading, setLoading] = useState(true)

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

  const handleInstall = async (extension: Extension) => {
    try {
      const updatedExtension = await extensionService.installExtension(extension.id)
      if (updatedExtension) {
        setExtension(updatedExtension)
      }
    } catch (error) {
      console.error("Erreur lors de l'installation de l'extension:", error)
    }
  }

  const handleUninstall = async (extension: Extension) => {
    if (confirm(`Êtes-vous sûr de vouloir désinstaller l'extension "${extension.name}" ?`)) {
      try {
        const updatedExtension = await extensionService.uninstallExtension(extension.id)
        if (updatedExtension) {
          setExtension(updatedExtension)
        }
      } catch (error) {
        console.error("Erreur lors de la désinstallation de l'extension:", error)
      }
    }
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2"
          onClick={() => router.push(`/dashboard/${restaurantId}/extensions`)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{loading ? "Chargement..." : extension?.name}</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : extension ? (
        <ExtensionDetails extension={extension} onInstall={handleInstall} onUninstall={handleUninstall} />
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
