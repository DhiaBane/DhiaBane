"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftIcon, ShoppingCartIcon, HomeIcon, UtensilsIcon } from "lucide-react"
import { OrderForm } from "@/components/restaurant/order-form"
import { PaymentReceipt } from "@/components/restaurant/payment-receipt"

interface OrderPageProps {
  params: {
    id: string
  }
}

type OrderStep = "menu" | "details" | "payment" | "confirmation"

export default function OrderPage({ params }: OrderPageProps) {
  const [orderStep, setOrderStep] = useState<OrderStep>("menu")
  const [orderType, setOrderType] = useState<"delivery" | "takeaway" | "table">("delivery")
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [receiptData, setReceiptData] = useState<any>(null)

  const handleOrderTypeChange = (type: "delivery" | "takeaway" | "table") => {
    setOrderType(type)
  }

  const handleOrderSubmit = (details: any) => {
    setOrderDetails(details)
    setOrderStep("payment")
  }

  const handlePaymentComplete = (receipt: any) => {
    setReceiptData(receipt)
    setOrderStep("confirmation")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href={`/restaurants/${params.id}`}>
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Retour au restaurant
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Commander</h1>
        <p className="text-muted-foreground mb-6">Restaurant: Le Bistrot Parisien</p>

        {orderStep === "menu" && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Comment souhaitez-vous commander ?</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={orderType} onValueChange={(value) => handleOrderTypeChange(value as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="delivery" className="flex items-center gap-2">
                      <HomeIcon className="h-4 w-4" />
                      Livraison
                    </TabsTrigger>
                    <TabsTrigger value="takeaway" className="flex items-center gap-2">
                      <ShoppingCartIcon className="h-4 w-4" />À emporter
                    </TabsTrigger>
                    <TabsTrigger value="table" className="flex items-center gap-2">
                      <UtensilsIcon className="h-4 w-4" />
                      Sur place
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            <OrderForm restaurantId={params.id} orderType={orderType} onSubmit={handleOrderSubmit} />
          </>
        )}

        {orderStep === "payment" && orderDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-medium mb-2">Récapitulatif de la commande</h3>
                  <div className="space-y-2">
                    {orderDetails.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)}€</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{orderDetails.total.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simuler un formulaire de paiement */}
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground">
                    Pour cette démo, le paiement est simulé. Cliquez sur le bouton ci-dessous pour "payer".
                  </p>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        // Simuler un paiement réussi
                        setTimeout(() => {
                          handlePaymentComplete({
                            orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
                            date: new Date().toISOString(),
                            total: orderDetails.total,
                            items: orderDetails.items,
                            orderType: orderType,
                          })
                        }, 1500)
                      }}
                    >
                      Payer {orderDetails.total.toFixed(2)}€
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setOrderStep("menu")}>
                Retour
              </Button>
            </CardFooter>
          </Card>
        )}

        {orderStep === "confirmation" && receiptData && (
          <PaymentReceipt
            receipt={receiptData}
            onClose={() => {
              // Rediriger vers la page d'accueil
              window.location.href = "/"
            }}
          />
        )}
      </div>
    </div>
  )
}
