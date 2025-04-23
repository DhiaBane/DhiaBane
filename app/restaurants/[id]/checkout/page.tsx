"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftIcon, CreditCardIcon, HomeIcon, UtensilsIcon, ShoppingCartIcon } from "lucide-react"
import { GuestModeNotice } from "@/components/restaurant/guest-mode-notice"
import { CreateAccountPrompt } from "@/components/restaurant/create-account-prompt"
import { PaymentReceipt } from "@/components/restaurant/payment-receipt"

interface CheckoutPageProps {
  params: {
    id: string
  }
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isGuestMode] = useState(searchParams.get("mode") === "guest")
  const [orderType, setOrderType] = useState<"delivery" | "takeaway" | "table">("table")
  const [tableNumber, setTableNumber] = useState("")
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showAccountPrompt, setShowAccountPrompt] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)

  // Simuler un panier avec des articles
  const cart = [
    { id: "1", name: "Soupe à l'oignon", price: 9.5, quantity: 1 },
    { id: "3", name: "Steak frites", price: 18.5, quantity: 1 },
  ]

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handlePayment = () => {
    // Validation
    if (orderType === "table" && !tableNumber) {
      alert("Veuillez saisir votre numéro de table")
      return
    }

    if (orderType === "delivery" && !address) {
      alert("Veuillez saisir votre adresse de livraison")
      return
    }

    // En mode invité, afficher la modal de création de compte avant le paiement
    if (isGuestMode) {
      setShowAccountPrompt(true)
      return
    }

    // Sinon, procéder directement au paiement
    processPayment()
  }

  const processPayment = () => {
    setIsProcessing(true)

    // Simuler un délai de traitement
    setTimeout(() => {
      setIsProcessing(false)

      // Générer les données du reçu
      setReceiptData({
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString(),
        total: calculateTotal(),
        items: cart,
        orderType,
      })

      setShowReceipt(true)
    }, 1500)
  }

  const handleContinueAsGuest = () => {
    setShowAccountPrompt(false)
    processPayment()
  }

  const handleCreateAccount = () => {
    // Dans une application réelle, rediriger vers la page de création de compte
    // avec les informations de la commande en paramètres
    router.push("/auth/phone-login?redirect=/restaurants/" + params.id)
  }

  if (showReceipt && receiptData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PaymentReceipt
          receipt={receiptData}
          isGuestMode={isGuestMode}
          onCreateAccount={handleCreateAccount}
          onClose={() => {
            // Rediriger vers la page d'accueil
            router.push("/")
          }}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isGuestMode && <GuestModeNotice />}

      <div className="mb-6">
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href={`/restaurants/${params.id}/menu${isGuestMode ? "?mode=guest" : ""}`}>
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Retour au menu
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Finaliser votre commande</h1>
        <p className="text-muted-foreground mb-6">Restaurant: Le Bistrot Parisien</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Type de commande</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={orderType} onValueChange={(value) => setOrderType(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="table" className="flex items-center gap-2">
                    <UtensilsIcon className="h-4 w-4" />
                    Sur place
                  </TabsTrigger>
                  <TabsTrigger value="takeaway" className="flex items-center gap-2">
                    <ShoppingCartIcon className="h-4 w-4" />À emporter
                  </TabsTrigger>
                  <TabsTrigger value="delivery" className="flex items-center gap-2">
                    <HomeIcon className="h-4 w-4" />
                    Livraison
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="table" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="table-number">Numéro de table</Label>
                    <Input
                      id="table-number"
                      placeholder="Ex: 12"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="takeaway" className="mt-4">
                  <p className="text-muted-foreground">
                    Votre commande sera prête à être récupérée dans environ 20 minutes.
                  </p>
                </TabsContent>

                <TabsContent value="delivery" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="delivery-address">Adresse de livraison</Label>
                    <Input
                      id="delivery-address"
                      placeholder="Votre adresse complète"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Livraison estimée: 30-45 minutes</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Méthode de paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="card" id="payment-card" />
                  <Label htmlFor="payment-card" className="flex items-center">
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Carte bancaire
                  </Label>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 mt-4 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Numéro de carte</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-month">Mois</Label>
                        <Input id="expiry-month" placeholder="MM" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry-year">Année</Label>
                        <Input id="expiry-year" placeholder="AA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between py-1">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>{(item.price * item.quantity).toFixed(2)}€</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{calculateTotal().toFixed(2)}€</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <span className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Payer {calculateTotal().toFixed(2)}€
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <CreateAccountPrompt
        isOpen={showAccountPrompt}
        onClose={() => setShowAccountPrompt(false)}
        onCreateAccount={handleCreateAccount}
        onContinueAsGuest={handleContinueAsGuest}
      />
    </div>
  )
}
