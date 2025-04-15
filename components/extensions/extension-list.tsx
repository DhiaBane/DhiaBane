"use client"

import type { Extension, ExtensionCategory } from "@/types/extensions"
import { ExtensionCard } from "./extension-card"

interface ExtensionListProps {
  extensions: Extension[]
  category: ExtensionCategory
  searchTerm: string
  onInstall: (extension: Extension) => void
  onUninstall: (extension: Extension) => void
}

export function ExtensionList({ extensions, category, searchTerm, onInstall, onUninstall }: ExtensionListProps) {
  // Filtrer les extensions en fonction du terme de recherche et de la catégorie
  const filteredExtensions = extensions.filter((extension) => {
    const matchesSearch =
      extension.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      extension.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      extension.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    if (category === "Tous") {
      return matchesSearch
    } else {
      return matchesSearch && extension.category === category
    }
  })

  if (filteredExtensions.length === 0) {
    return (
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
          Aucune extension ne correspond à votre recherche. Essayez d&apos;autres termes ou catégories.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredExtensions.map((extension) => (
        <ExtensionCard key={extension.id} extension={extension} onInstall={onInstall} onUninstall={onUninstall} />
      ))}
    </div>
  )
}
