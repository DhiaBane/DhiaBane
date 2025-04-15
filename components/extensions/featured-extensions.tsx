"use client"

import type { Extension } from "@/types/extensions"
import { ExtensionCard } from "./extension-card"

interface FeaturedExtensionsProps {
  extensions: Extension[]
  onInstall: (extension: Extension) => void
  onUninstall: (extension: Extension) => void
}

export function FeaturedExtensions({ extensions, onInstall, onUninstall }: FeaturedExtensionsProps) {
  const featuredExtensions = extensions.filter((ext) => ext.featured)

  if (featuredExtensions.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Extensions recommandées</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredExtensions.map((extension) => (
          <ExtensionCard
            key={extension.id}
            extension={extension}
            featured={true}
            onInstall={onInstall}
            onUninstall={onUninstall}
          />
        ))}
      </div>
    </div>
  )
}
