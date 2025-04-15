"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Download } from "lucide-react"
import type { Extension } from "@/types/extensions"
import { Progress } from "@/components/ui/progress"
import { ExtensionStatusBadge } from "./extension-status-badge"

interface ExtensionCardProps {
  extension: Extension
  featured?: boolean
  onInstall: (extension: Extension) => void
  onUninstall: (extension: Extension) => void
}

export function ExtensionCard({ extension, featured = false, onInstall, onUninstall }: ExtensionCardProps) {
  const router = useRouter()
  const [installing, setInstalling] = useState(false)
  const [progress, setProgress] = useState(0)

  // Fonction pour afficher les étoiles de notation
  const renderRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <Star
            className="absolute top-0 left-0 h-4 w-4 fill-yellow-400 text-yellow-400 overflow-hidden"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>,
      )
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return <div className="flex">{stars}</div>
  }

  // Fonction pour formater le prix
  const formatPrice = (price: number | "Gratuit"): string => {
    if (price === "Gratuit") return "Gratuit"
    return `${price.toFixed(2)} €`
  }

  // Fonction pour simuler l'installation
  const handleInstall = () => {
    setInstalling(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setInstalling(false)
            onInstall(extension)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <Card className={featured ? "border-blue-200 bg-blue-50/30" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={extension.icon || "/placeholder.svg"}
              alt={`${extension.name} icon`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{extension.name}</CardTitle>
              <div className="flex gap-1">
                {extension.new && <Badge className="bg-purple-500">Nouveau</Badge>}
                {extension.popular && <Badge className="bg-blue-500">Populaire</Badge>}
                {featured && <Badge className="bg-green-500">Recommandé</Badge>}
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <span>{extension.developer}</span>
              <span className="mx-2">•</span>
              <span>{extension.category}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {renderRatingStars(extension.rating)}
              <span className="text-sm text-muted-foreground ml-1">({extension.reviews})</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600">{extension.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {extension.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {tag}
            </Badge>
          ))}
          <ExtensionStatusBadge status={extension.status} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="font-medium">{formatPrice(extension.price)}</div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/${extension.restaurantId}/extensions/${extension.id}`)}
          >
            Détails
          </Button>
          {installing ? (
            <div className="w-28">
              <Progress value={progress} className="h-2 w-full" />
            </div>
          ) : extension.installed ? (
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => onUninstall(extension)}
            >
              Désinstaller
            </Button>
          ) : (
            <Button size="sm" onClick={handleInstall}>
              <Download className="mr-2 h-4 w-4" />
              Installer
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
