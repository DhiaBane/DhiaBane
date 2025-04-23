"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { PaymentMethod } from "@/types/profile"

interface NewPaymentMethodProps {
  onChange: (method: Partial<PaymentMethod>) => void
}

export default function NewPaymentMethod({ onChange }: NewPaymentMethodProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [saveCard, setSaveCard] = useState(false)

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  useEffect(() => {
    onChange({
      cardNumber: cardNumber.replace(/\s+/g, ""),
      cardholderName,
      expiryMonth,
      expiryYear,
      cvv,
      saveCard,
    })
  }, [cardNumber, cardholderName, expiryMonth, expiryYear, cvv, saveCard, onChange])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Numéro de carte</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          maxLength={19}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardholderName">Nom du titulaire</Label>
        <Input
          id="cardholderName"
          placeholder="Jean Dupont"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryMonth">Mois</Label>
          <Select value={expiryMonth} onValueChange={setExpiryMonth}>
            <SelectTrigger id="expiryMonth">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => {
                const month = (i + 1).toString().padStart(2, "0")
                return (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryYear">Année</Label>
          <Select value={expiryYear} onValueChange={setExpiryYear}>
            <SelectTrigger id="expiryYear">
              <SelectValue placeholder="AA" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => {
                const year = (new Date().getFullYear() + i).toString().slice(-2)
                return (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            maxLength={4}
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="saveCard" checked={saveCard} onCheckedChange={(checked) => setSaveCard(checked === true)} />
        <Label htmlFor="saveCard" className="text-sm font-normal">
          Enregistrer cette carte pour mes prochains paiements
        </Label>
      </div>
    </div>
  )
}
