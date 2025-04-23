"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon, CreditCardIcon, Loader2Icon, TrashIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addPaymentMethod, removePaymentMethod } from "@/actions/profile-actions"
import type { PaymentMethod } from "@/types/profile"

interface PaymentMethodsFormProps {
  paymentMethods: PaymentMethod[]
}

export default function PaymentMethodsForm({ paymentMethods }: PaymentMethodsFormProps) {
  const { toast } = useToast()
  const [methods, setMethods] = useState<PaymentMethod[]>(paymentMethods)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // New payment method form state
  const [cardNumber, setCardNumber] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")

  const handleAddPaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Basic validation
      if (!cardNumber || !cardholderName || !expiryMonth || !expiryYear || !cvv) {
        toast({
          title: "Champs manquants",
          description: "Veuillez remplir tous les champs",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const result = await addPaymentMethod({
        cardNumber,
        cardholderName,
        expiryMonth,
        expiryYear,
        cvv,
      })

      if (result.success) {
        toast({
          title: "Méthode de paiement ajoutée",
          description: "Votre nouvelle méthode de paiement a été ajoutée avec succès",
        })

        // Add the new payment method to the local state
        if (result.paymentMethod) {
          setMethods((prev) => [...prev, result.paymentMethod])
        }

        // Reset form and close dialog
        setCardNumber("")
        setCardholderName("")
        setExpiryMonth("")
        setExpiryYear("")
        setCvv("")
        setIsAddDialogOpen(false)
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de l'ajout de la méthode de paiement",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error adding payment method:", err)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la méthode de paiement",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemovePaymentMethod = async (id: string) => {
    try {
      const result = await removePaymentMethod(id)

      if (result.success) {
        toast({
          title: "Méthode de paiement supprimée",
          description: "Votre méthode de paiement a été supprimée avec succès",
        })

        // Remove the payment method from the local state
        setMethods((prev) => prev.filter((method) => method.id !== id))
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de la suppression de la méthode de paiement",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error removing payment method:", err)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la méthode de paiement",
        variant: "destructive",
      })
    }
  }

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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Méthodes de paiement</CardTitle>
          <CardDescription>Gérez vos méthodes de paiement pour les commandes et réservations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {methods.length === 0 ? (
            <div className="text-center py-6">
              <CreditCardIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-2 text-lg font-medium">Aucune méthode de paiement</h3>
              <p className="mt-1 text-sm text-muted-foreground">Vous n'avez pas encore ajouté de méthode de paiement</p>
            </div>
          ) : (
            <div className="space-y-4">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CreditCardIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {getCardType(method.cardNumber)} {maskCardNumber(method.cardNumber)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expire le {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePaymentMethod(method.id)}
                    aria-label="Supprimer cette méthode de paiement"
                  >
                    <TrashIcon className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="ml-auto flex items-center gap-2"
            variant="outline"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter une méthode de paiement
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter une méthode de paiement</DialogTitle>
            <DialogDescription>Ajoutez une nouvelle carte de crédit ou de débit</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddPaymentMethod}>
            <div className="space-y-4 py-4">
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
                  <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
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
                  <Select value={expiryYear} onValueChange={setExpiryYear} required>
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
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Ajout en cours...
                  </>
                ) : (
                  "Ajouter"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
