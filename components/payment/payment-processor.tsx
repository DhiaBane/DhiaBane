"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import { processPayment } from "@/actions/payment-actions"
import { CreditCardIcon, CheckCircleIcon, AlertCircleIcon, ArrowLeftIcon, LockIcon } from "lucide-react"
import SavedPaymentMethods from "./saved-payment-methods"
import NewPaymentMethod from "./new-payment-method"
import PaymentSummary from "./payment-summary"
import { useProfile } from "@/hooks/use-profile"
import type { PaymentMethod } from "@/types/profile"

interface PaymentProcessorProps {
  billId: string
  type: string
  amount: number
  reference: string
}

type PaymentOption = "saved" | "new"

export function PaymentProcessor({ billId, type, amount, reference }: PaymentProcessorProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { profile, isLoading: isProfileLoading } = useProfile()

  const [paymentOption, setPaymentOption] = useState<PaymentOption>("saved")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [newPaymentMethod, setNewPaymentMethod] = useState<Partial<PaymentMethod> | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId)
  }

  const handleNewPaymentMethodChange = (method: Partial<PaymentMethod>) => {
    setNewPaymentMethod(method)
  }

  const handlePaymentOptionChange = (value: PaymentOption) => {
    setPaymentOption(value)
    setSelectedPaymentMethod(null)
  }

  const handleCancel = () => {
    router.push("/shared-bills")
  }

  const handlePayment = async () => {
    // Validate payment method selection
    if (paymentOption === "saved" && !selectedPaymentMethod) {
      toast({
        title: "Méthode de paiement requise",
        description: "Veuillez sélectionner une méthode de paiement",
        variant: "destructive",
      })
      return
    }

    if (paymentOption === "new" && !newPaymentMethod?.cardNumber) {
      toast({
        title: "Informations de carte requises",
        description: "Veuillez saisir les informations de votre carte",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      const result = await processPayment({
        billId,
        type,
        amount,
        reference,
        paymentMethodId: paymentOption === "saved" ? selectedPaymentMethod : undefined,
        newPaymentMethod: paymentOption === "new" ? newPaymentMethod : undefined,
        savePaymentMethod: paymentOption === "new" && newPaymentMethod?.saveCard,
      })

      if (result.success) {
        setPaymentStatus("success")
        toast({
          title: "Paiement réussi",
          description: "Votre paiement a été traité avec succès",
        })
      } else {
        setPaymentStatus("error")
        setErrorMessage(result.error || "Une erreur est survenue lors du traitement du paiement")
        toast({
          title: "Échec du paiement",
          description: result.error || "Une erreur est survenue lors du traitement du paiement",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("error")
      setErrorMessage("Une erreur inattendue est survenue. Veuillez réessayer.")
      toast({
        title: "Erreur de paiement",
        description: "Une erreur inattendue est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReturnToSharedBills = () => {
    router.push("/shared-bills")
  }

  // Show success message
  if (paymentStatus === "success") {
    return (
      <Card>
        <CardContent className="pt-6 pb-4 flex flex-col items-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-center mb-2">Paiement réussi</h2>
          <p className="text-center text-muted-foreground mb-6">
            Votre paiement de {formatCurrency(amount)} a été traité avec succès.
            <br />
            Référence de transaction: {reference}
          </p>
          <Button onClick={handleReturnToSharedBills}>Retour à mes additions partagées</Button>
        </CardContent>
      </Card>
    )
  }

  // Show error message
  if (paymentStatus === "error") {
    return (
      <Card>
        <CardContent className="pt-6 pb-4 flex flex-col items-center">
          <AlertCircleIcon className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-center mb-2">Échec du paiement</h2>
          <p className="text-center text-muted-foreground mb-2">Nous n'avons pas pu traiter votre paiement.</p>
          {errorMessage && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
            <Button onClick={() => setPaymentStatus("idle")}>Réessayer</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Main payment form
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Méthode de paiement</CardTitle>
            <CardDescription>Choisissez comment vous souhaitez payer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={paymentOption} onValueChange={(v) => handlePaymentOptionChange(v as PaymentOption)}>
              <div className="flex items-start space-x-2 mb-4">
                <RadioGroupItem
                  value="saved"
                  id="payment-saved"
                  disabled={isProfileLoading || profile.paymentMethods.length === 0}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="payment-saved" className="font-medium">
                    Utiliser une carte enregistrée
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Sélectionnez une de vos méthodes de paiement enregistrées
                  </p>
                </div>
              </div>

              {paymentOption === "saved" && (
                <div className="ml-6 mb-4">
                  <SavedPaymentMethods
                    paymentMethods={profile.paymentMethods}
                    selectedMethodId={selectedPaymentMethod}
                    onSelect={handlePaymentMethodSelect}
                    isLoading={isProfileLoading}
                  />
                </div>
              )}

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="new" id="payment-new" />
                <div className="grid gap-1.5">
                  <Label htmlFor="payment-new" className="font-medium">
                    Utiliser une nouvelle carte
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Entrez les informations de votre carte de crédit ou débit
                  </p>
                </div>
              </div>
            </RadioGroup>

            {paymentOption === "new" && (
              <div className="ml-6">
                <NewPaymentMethod onChange={handleNewPaymentMethodChange} />
              </div>
            )}

            <div className="flex items-center pt-4">
              <LockIcon className="h-4 w-4 text-muted-foreground mr-2" />
              <p className="text-sm text-muted-foreground">Vos informations de paiement sont sécurisées et chiffrées</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancel}>
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing || (paymentOption === "saved" && !selectedPaymentMethod)}
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                  Traitement...
                </>
              ) : (
                <>
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Payer {formatCurrency(amount)}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <PaymentSummary amount={amount} reference={reference} type={type} />
      </div>
    </div>
  )
}
