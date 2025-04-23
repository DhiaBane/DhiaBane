"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusIcon, MinusIcon, TrashIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderFormProps {
  restaurantId: string
  orderType: "delivery" | "takeaway" | "table"
  onSubmit: (orderDetails: any) => void
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export function OrderForm({ restaurantId, orderType, onSubmit }: OrderFormProps) {
  const { toast } = useToast()
  const [cart, setCart] = useState<CartItem[]>([
    { id: "1", name: "Soupe à l'oignon", price: 9.5, quantity: 1 },
    { id: "3", name: "Steak frites", price: 18.5, quantity: 1 },
  ])
  const [address, setAddress] = useState("")
  const [tableNumber, setTableNumber] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")

  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
    )
  }

  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (cart.length === 0) {
      toast({
        title: "Panier vide",
        description: "Veuillez ajouter des articles à votre commande",
        variant: "destructive",
      })
      return
    }

    if (orderType === "delivery" && !address) {
      toast({
        title: "Adresse requise",
        description: "Veuillez saisir une adresse de livraison",
        variant: "destructive",
      })
      return
    }

    if (orderType === "table" && !tableNumber) {
      toast({
        title: "Numéro de table requis",
        description: "Veuillez saisir votre numéro de table",
        variant: "destructive",
      })
      return
    }

    onSubmit({
      items: cart,
      total: calculateTotal(),
      orderType,
      address: orderType === "delivery" ? address : undefined,
      tableNumber: orderType === "table" ? tableNumber : undefined,
      specialInstructions,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Votre commande</CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">Votre panier est vide</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.price.toFixed(2)}€</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{calculateTotal().toFixed(2)}€</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Détails de la commande</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderType === "delivery" && (
              <div className="space-y-2">
                <Label htmlFor="address">Adresse de livraison</Label>
                <Textarea
                  id="address"
                  placeholder="Saisissez votre adresse complète"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            )}

            {orderType === "table" && (
              <div className="space-y-2">
                <Label htmlFor="table">Numéro de table</Label>
                <Input
                  id="table"
                  placeholder="Ex: 12"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions spéciales (optionnel)</Label>
              <Textarea
                id="instructions"
                placeholder="Allergies, préférences, etc."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Continuer vers le paiement
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
