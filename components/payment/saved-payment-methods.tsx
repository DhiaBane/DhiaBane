"use client"

import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCardIcon, Loader2Icon } from "lucide-react"
import type { PaymentMethod } from "@/types/profile"

interface SavedPaymentMethodsProps {
  paymentMethods: PaymentMethod[]
  selectedMethodId: string | null
  onSelect: (methodId: string) => void
  isLoading: boolean
}

export default function SavedPaymentMethods({
  paymentMethods,
  selectedMethodId,
  onSelect,
  isLoading,
}: SavedPaymentMethodsProps) {
  // Get card type based on first digits
  const getCardType = (number: string) => {
    const re = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
    }

    if (re.visa.test(number)) return "Visa"
    if (re.mastercard.test(number)) return "Mastercard"
    if (re.amex.test(number)) return "American Express"
    return "Carte"
  }

  // Mask card number for display
  const maskCardNumber = (number: string) => {
    return `•••• •••• •••• ${number.slice(-4)}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2Icon className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  if (paymentMethods.length === 0) {
    return (
      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          Vous n'avez pas encore enregistré de méthode de paiement. Veuillez utiliser une nouvelle carte.
        </p>
      </Card>
    )
  }

  return (
    <RadioGroup value={selectedMethodId || ""} onValueChange={onSelect}>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-start space-x-2">
            <RadioGroupItem value={method.id} id={`card-${method.id}`} />
            <div className="grid gap-1">
              <Label htmlFor={`card-${method.id}`} className="font-medium flex items-center">
                <CreditCardIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                {getCardType(method.cardNumber)} {maskCardNumber(method.cardNumber)}
              </Label>
              <p className="text-sm text-muted-foreground">
                Expire le {method.expiryMonth}/{method.expiryYear}
              </p>
            </div>
          </div>
        ))}
      </div>
    </RadioGroup>
  )
}
