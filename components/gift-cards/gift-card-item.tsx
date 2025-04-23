"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { GiftCard } from "@/types/gift-card"
import { formatDate, formatCurrency } from "@/lib/utils"
import { CheckIcon, CopyIcon, GiftIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import GiftCardDetailsModal from "./gift-card-details-modal"

interface GiftCardItemProps {
  card: GiftCard
  type: "received" | "sent"
}

export default function GiftCardItem({ card, type }: GiftCardItemProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(card.code)
    setCopied(true)
    toast({
      title: "Code copié !",
      description: "Le code a été copié dans le presse-papier",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusBadge = () => {
    switch (card.status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>
      case "redeemed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Utilisé</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Expiré</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">En attente</Badge>
      default:
        return null
    }
  }

  const getCardBackground = () => {
    switch (card.design) {
      case "birthday":
        return "bg-gradient-to-r from-pink-500 to-purple-500"
      case "christmas":
        return "bg-gradient-to-r from-red-500 to-green-500"
      case "anniversary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500"
      case "congratulations":
        return "bg-gradient-to-r from-blue-400 to-indigo-500"
      case "thankyou":
        return "bg-gradient-to-r from-green-400 to-teal-500"
      default:
        return "bg-gradient-to-r from-blue-500 to-purple-500"
    }
  }

  const person = type === "received" ? card.sender : card.recipient

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className={`${getCardBackground()} p-6 text-white md:w-1/3 flex flex-col justify-between`}>
              <div className="flex justify-between items-start">
                <GiftIcon className="h-8 w-8" />
                <div className="text-right">
                  <p className="text-xs opacity-80">RestoPilote</p>
                  <p className="text-sm font-medium">Carte Cadeau</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{formatCurrency(card.amount)}</p>
                <p className="text-sm opacity-80">Valable jusqu'au {formatDate(card.expiryDate)}</p>
              </div>
            </div>
            <div className="p-4 flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{card.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {type === "received" ? "De" : "Pour"} : {person.name}
                  </p>
                  <p className="text-sm mt-1">Créée le {formatDate(card.createdAt)}</p>
                </div>
                <div>{getStatusBadge()}</div>
              </div>

              {card.message && <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm italic">"{card.message}"</div>}

              <div className="flex justify-between items-center mt-4">
                {type === "received" && card.status === "active" && (
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center max-w-[180px]">
                      <input
                        type="text"
                        value={card.code}
                        readOnly
                        className="pr-10 h-8 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button variant="ghost" size="icon" className="absolute right-0 h-8 w-8" onClick={copyCode}>
                        {copied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
                        <span className="sr-only">Copier le code</span>
                      </Button>
                    </div>
                  </div>
                )}
                <Button variant="outline" className="ml-auto" onClick={() => setShowDetails(true)}>
                  Détails
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <GiftCardDetailsModal isOpen={showDetails} onClose={() => setShowDetails(false)} card={card} type={type} />
    </>
  )
}
