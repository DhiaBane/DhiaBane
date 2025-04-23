"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { SharedBill } from "@/types/shared-bill"
import { formatDate, formatCurrency } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, CheckIcon, CreditCardIcon, MapPinIcon, ReceiptIcon, ThumbsDownIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { acceptSharedBill, declineSharedBill, remindSharedBill } from "@/actions/shared-bill-actions"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

interface SharedBillDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  bill: SharedBill
  type: "sent" | "received"
}

export default function SharedBillDetailsModal({ isOpen, onClose, bill, type }: SharedBillDetailsModalProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const getStatusBadge = () => {
    switch (bill.status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">En attente</Badge>
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Payé</Badge>
      case "declined":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Refusé</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Expiré</Badge>
      default:
        return null
    }
  }

  const person = type === "received" ? bill.sender : bill.recipient

  // Calculate your share
  const yourShare =
    type === "received"
      ? bill.shares.find((share) => share.person.id === "current-user")?.amount || 0
      : bill.totalAmount - bill.shares.reduce((sum, share) => sum + share.amount, 0)

  const handleAccept = async () => {
    if (type !== "received" || bill.status !== "pending") return

    setIsLoading(true)
    try {
      const result = await acceptSharedBill(bill.id)
      if (result.success) {
        toast({
          title: "Addition acceptée",
          description: "Vous avez accepté de payer votre part de l'addition",
        })
        onClose()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de l'acceptation de l'addition",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error accepting shared bill:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'acceptation de l'addition",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecline = async () => {
    if (type !== "received" || bill.status !== "pending") return

    setIsLoading(true)
    try {
      const result = await declineSharedBill(bill.id)
      if (result.success) {
        toast({
          title: "Addition refusée",
          description: "Vous avez refusé de payer votre part de l'addition",
        })
        onClose()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors du refus de l'addition",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error declining shared bill:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du refus de l'addition",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemind = async () => {
    if (type !== "sent" || bill.status !== "pending") return

    setIsLoading(true)
    try {
      const result = await remindSharedBill(bill.id)
      if (result.success) {
        toast({
          title: "Rappel envoyé",
          description: "Un rappel a été envoyé au destinataire",
        })
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de l'envoi du rappel",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending reminder:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du rappel",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePay = () => {
    // Close the modal
    onClose()

    // Navigate to payment page with bill details
    router.push(`/payment?billId=${bill.id}&type=shared-bill&amount=${yourShare}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Détails de l'addition partagée</DialogTitle>
          <DialogDescription>
            {type === "received" ? "Addition partagée avec vous" : "Addition que vous avez partagée"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{bill.restaurantName}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPinIcon className="h-4 w-4 mr-1.5" />
              {bill.restaurantAddress || "Adresse non disponible"}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4 mr-1.5" />
              {formatDate(bill.date)}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Statut</span>
            <span>{getStatusBadge()}</span>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Total de l'addition</span>
              <span className="font-semibold">{formatCurrency(bill.totalAmount)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm font-medium">Votre part</span>
              <span className="font-semibold">{formatCurrency(yourShare)}</span>
            </div>

            {bill.tip > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dont pourboire</span>
                <span className="text-sm text-muted-foreground">{formatCurrency(bill.tip)}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Participants</h4>
            <div className="space-y-2">
              {/* Sender (always included) */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={bill.sender.avatarUrl || "/placeholder.svg"} alt={bill.sender.name} />
                    <AvatarFallback>{bill.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">
                    {bill.sender.id === "current-user" ? "Vous" : bill.sender.name}{" "}
                    {bill.sender.id === "current-user" && "(créateur)"}
                  </span>
                </div>
                <span className="text-sm">
                  {formatCurrency(bill.totalAmount - bill.shares.reduce((sum, share) => sum + share.amount, 0))}
                </span>
              </div>

              {/* Other participants */}
              {bill.shares.map((share) => (
                <div key={share.person.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={share.person.avatarUrl || "/placeholder.svg"} alt={share.person.name} />
                      <AvatarFallback>{share.person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{share.person.id === "current-user" ? "Vous" : share.person.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">{formatCurrency(share.amount)}</span>
                    {share.status && (
                      <div className="ml-2">
                        {share.status === "paid" && <CheckIcon className="h-4 w-4 text-green-500" />}
                        {share.status === "declined" && <XIcon className="h-4 w-4 text-red-500" />}
                        {share.status === "pending" && (
                          <div className="h-4 w-4 rounded-full border-2 border-yellow-500"></div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {bill.note && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Note</h4>
                <p className="text-sm text-muted-foreground">{bill.note}</p>
              </div>
            </>
          )}

          {bill.receiptImageUrl && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Reçu</h4>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-xs h-40 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={bill.receiptImageUrl || "/placeholder.svg"}
                      alt="Reçu"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute bottom-2 right-2"
                      onClick={() => window.open(bill.receiptImageUrl, "_blank")}
                    >
                      <ReceiptIcon className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-2">
            {type === "received" && bill.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  disabled={isLoading}
                  className="flex items-center gap-1"
                >
                  <ThumbsDownIcon className="h-4 w-4" />
                  Refuser
                </Button>
                <Button onClick={handlePay} disabled={isLoading} className="flex items-center gap-1">
                  <CreditCardIcon className="h-4 w-4" />
                  Payer
                </Button>
              </>
            )}
            {type === "sent" && bill.status === "pending" && (
              <Button variant="outline" onClick={handleRemind} disabled={isLoading} className="flex items-center gap-1">
                <ReceiptIcon className="h-4 w-4" />
                Rappeler
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
