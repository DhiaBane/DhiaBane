"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, CopyIcon } from "lucide-react"
import { AuthCheck } from "@/components/auth/auth-check"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Promotion {
  id: string
  title: string
  restaurant: string
  image: string
  validUntil: string
  code: string
}

interface PromotionCardProps {
  promotion: Promotion
}

export function PromotionCard({ promotion }: PromotionCardProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(promotion.code)
    setCopied(true)
    toast({
      title: "Code copié !",
      description: "Le code a été copié dans le presse-papier",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img src={promotion.image || "/placeholder.svg"} alt={promotion.title} className="w-full h-48 object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="font-bold text-lg text-white">{promotion.title}</h3>
          <p className="text-sm text-white/90">{promotion.restaurant}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="h-3.5 w-3.5 mr-1" />
          <span>Valable jusqu'au {formatDate(promotion.validUntil)}</span>
        </div>

        <AuthCheck
          fallback={
            <div className="mt-3 p-3 bg-muted rounded-md text-center">
              <p className="text-sm font-medium">Créez un compte pour profiter de cette offre</p>
            </div>
          }
        >
          <div className="mt-3 p-3 bg-muted rounded-md flex justify-between items-center">
            <code className="font-mono text-sm font-bold">{promotion.code}</code>
            <Button variant="ghost" size="sm" onClick={copyCode}>
              {copied ? "Copié !" : <CopyIcon className="h-4 w-4" />}
            </Button>
          </div>
        </AuthCheck>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AuthCheck
          fallback={
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/phone-login">Créer un compte</Link>
            </Button>
          }
        >
          <Button asChild className="w-full">
            <Link href={`/restaurants?promotion=${promotion.id}`}>Utiliser maintenant</Link>
          </Button>
        </AuthCheck>
      </CardFooter>
    </Card>
  )
}
