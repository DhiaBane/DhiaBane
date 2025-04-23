"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { ReceiptIcon, InfoIcon } from "lucide-react"

interface PaymentSummaryProps {
  amount: number
  reference: string
  type: string
}

export default function PaymentSummary({ amount, reference, type }: PaymentSummaryProps) {
  const getPaymentTypeLabel = () => {
    switch (type) {
      case "shared-bill":
        return "Addition partagée"
      case "gift-card":
        return "Carte cadeau"
      case "reservation":
        return "Réservation"
      default:
        return "Paiement"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <ReceiptIcon className="h-5 w-5 mr-2" />
          Récapitulatif
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type</span>
            <span>{getPaymentTypeLabel()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Référence</span>
            <span className="font-mono text-sm">{reference}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sous-total</span>
            <span>{formatCurrency(amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frais de service</span>
            <span>{formatCurrency(0)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>{formatCurrency(amount)}</span>
        </div>

        <div className="bg-muted/50 p-3 rounded-md flex items-start mt-4">
          <InfoIcon className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            En procédant au paiement, vous acceptez nos conditions générales et notre politique de confidentialité.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
