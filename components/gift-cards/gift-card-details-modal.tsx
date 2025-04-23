"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { GiftCard } from "@/types/gift-card"
import { formatDate, formatCurrency } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckIcon, CopyIcon, GiftIcon, SendIcon, ShoppingBagIcon } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import QRCode from "react-qr-code"

interface GiftCardDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  card: GiftCard
  type: "received" | "sent"
}

export default function GiftCardDetailsModal({ isOpen, onClose, card, type }: GiftCardDetailsModalProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Détails de la carte cadeau</DialogTitle>
          <DialogDescription>{type === "received" ? "Carte cadeau reçue" : "Carte cadeau envoyée"}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className={`${getCardBackground()} p-6 text-white rounded-lg`}>
            <div className="flex justify-between items-start">
              <GiftIcon className="h-8 w-8" />
              <div className="text-right">
                <p className="text-xs opacity-80">RestoPilote</p>
                <p className="text-sm font-medium">Carte Cadeau</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="text-3xl font-bold mt-2">{formatCurrency(card.amount)}</p>
              <p className="text-sm opacity-80 mt-1">Valable jusqu'au {formatDate(card.expiryDate)}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Statut</span>
              <span>{getStatusBadge()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{type === "received" ? "Envoyée par" : "Envoyée à"}</span>
              <div className="flex items-center">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarImage src={person.avatarUrl || "/placeholder.svg"} alt={person.name} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{person.name}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Date de création</span>
              <span>{formatDate(card.createdAt)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Date d'expiration</span>
              <span>{formatDate(card.expiryDate)}</span>
            </div>

            {card.redeemedAt && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Utilisée le</span>
                <span>{formatDate(card.redeemedAt)}</span>
              </div>
            )}

            {card.message && (
              <div className="pt-2">
                <span className="text-sm text-muted-foreground">Message</span>
                <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm italic">"{card.message}"</div>
              </div>
            )}
          </div>

          {type === "received" && card.status === "active" && (
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Code</span>
                <div className="flex items-center gap-2">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {card.code}
                  </code>
                  <Button variant="outline" size="sm" onClick={copyCode}>
                    {copied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
                    <span className="sr-only">Copier le code</span>
                  </Button>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <div className="p-2 bg-white rounded-lg">
                  <QRCode value={card.code} size={150} />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            {type === "received" && card.status === "active" && (
              <Button className="flex items-center gap-2">
                <ShoppingBagIcon className="h-4 w-4" />
                Utiliser
              </Button>
            )}
            {type === "sent" && card.status === "active" && (
              <Button variant="outline" className="flex items-center gap-2">
                <SendIcon className="h-4 w-4" />
                Renvoyer
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
