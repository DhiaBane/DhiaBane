"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { ExtensionCategories } from "@/components/extensions/extension-categories"
import { ExtensionSearch } from "@/components/extensions/extension-search"
import { FeaturedExtensions } from "@/components/extensions/featured-extensions"
import { ExtensionStatusFilter } from "@/components/extensions/extension-status-filter"
import type { Extension, ExtensionCategory, ExtensionStatus } from "@/types/extensions"
import { extensionService } from "@/lib/services/extension-service"
import { ExtensionCard } from "@/components/extensions/extension-card"

export default function ExtensionsPage() {
  const params = useParams()
  const restaurantId = params?.restaurantId as string

  const [extensions, setExtensions] = useState<Extension[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<ExtensionCategory>("Tous")
  const [activeStatus, setActiveStatus] = useState<ExtensionStatus | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        setLoading(true)
        const data = await extensionService.getAllExtensions(restaurantId)
        setExtensions(data)
      } catch (error) {
        console.error("Erreur lors du chargement des extensions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExtensions()
  }, [restaurantId])

  const handleInstall = async (extension: Extension) => {
    try {
      const updatedExtension = await extensionService.installExtension(extension.id)
      if (updatedExtension) {
        setExtensions(extensions.map((ext) => (ext.id === updatedExtension.id ? updatedExtension : ext)))
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
          setExtensions(extensions.map((ext) => (ext.id === updatedExtension.id ? updatedExtension : ext)))
        }
      } catch (error) {
        console.error("Erreur lors de la désinstallation de l'extension:", error)
      }
    }
  }

  // Filtrer les extensions en fonction de la catégorie, du statut et du terme de recherche
  const filteredExtensions = extensions.filter((extension) => {
    const matchesSearch =
      extension.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      extension.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      extension.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = activeCategory === "Tous" || extension.category === activeCategory
    const matchesStatus = activeStatus === null || extension.status === activeStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace d&apos;extensions</h1>
          <p className="text-muted-foreground">Découvrez et installez des extensions pour enrichir votre RestauPilot</p>
        </div>
        <ExtensionSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {searchTerm === "" && activeCategory === "Tous" && activeStatus === null && (
            <FeaturedExtensions extensions={extensions} onInstall={handleInstall} onUninstall={handleUninstall} />
          )}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">Filtrer par catégorie</h2>
              <ExtensionCategories activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">Filtrer par statut</h2>
              <ExtensionStatusFilter activeStatus={activeStatus} onStatusChange={setActiveStatus} />
            </div>
          </div>

          {filteredExtensions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExtensions.map((extension) => (
                <ExtensionCard
                  key={extension.id}
                  extension={extension}
                  onInstall={handleInstall}
                  onUninstall={handleUninstall}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-16 w-16 text-gray-300 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Aucune extension trouvée</h3>
              <p className="text-gray-500 mt-2">
                Aucune extension ne correspond à vos critères. Essayez d&apos;autres filtres ou termes de recherche.
              </p>
            </div>
          )}
        </>
      )}
    </DashboardShell>
  )
}
