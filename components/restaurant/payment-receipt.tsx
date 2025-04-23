"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircleIcon, DownloadIcon, HomeIcon, UtensilsIcon, ShoppingCartIcon, UserPlusIcon } from "lucide-react"
import { AuthCheck } from "@/components/auth/auth-check"
import { useToast } from "@/hooks/use-toast"

interface PaymentReceiptProps {
  receipt: {
    orderId: string
    date: string
    total: number
    items: Array<{
      name: string
      price: number
      quantity: number
    }>
    orderType: "delivery" | "takeaway" | "table"
  }
  isGuestMode?: boolean
  onCreateAccount?: () => void
  onClose: () => void
}

export function PaymentReceipt({ receipt, isGuestMode = false, onCreateAccount, onClose }: PaymentReceiptProps) {
  const { toast } = useToast()
  const [accountCreated, setAccountCreated] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const handleDownload = () => {
    // Dans une application réelle, cela générerait un PDF
    toast({
      title: "Téléchargement du reçu",
      description: "Le reçu a été téléchargé avec succès",
    })
  }

  const handleCreateAccount = () => {
    if (onCreateAccount) {
      onCreateAccount()
    } else {
      // Simuler la création de compte
      localStorage.setItem("auth_token", "demo_token")
      setAccountCreated(true)
      toast({
        title: "Compte créé",
        description: "Votre compte a été créé avec succès",
      })
    }
  }

  const getOrderTypeIcon = () => {
    switch (receipt.orderType) {
      case "delivery":
        return <HomeIcon className="h-5 w-5" />
      case "takeaway":
        return <ShoppingCartIcon className="h-5 w-5" />
      case "table":
        return <UtensilsIcon className="h-5 w-5" />
    }
  }

  const getOrderTypeText = () => {
    switch (receipt.orderType) {
      case "delivery":
        return "Livraison à domicile"
      case "takeaway":
        return "À emporter"
      case "table":
        return "Sur place"
    }
  }

  const getOrderMessage = () => {
    switch (receipt.orderType) {
      case "delivery":
        return "Votre commande sera livrée dans environ 30-45 minutes."
      case "takeaway":
        return "Vous recevrez une notification lorsque votre commande sera prête à être récupérée."
      case "table":
        return "Un serveur vous apportera votre commande à table."
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <CardTitle className="text-2xl">Commande confirmée !</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertTitle className="flex items-center">
            {getOrderTypeIcon()}
            <span className="ml-2">{getOrderTypeText()}</span>
          </AlertTitle>
          <AlertDescription>{getOrderMessage()}</AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Détails de la commande</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Numéro de commande:</span>
              <span className="font-mono">{receipt.orderId}</span>
              <span className="text-muted-foreground">Date:</span>
              <span>{formatDate(receipt.date)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Articles</h3>
            {receipt.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>{(item.price * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{receipt.total.toFixed(2)}€</span>
              </div>
            </div>
          </div>
        </div>

        {isGuestMode && !accountCreated ? (
          <div className="mt-6 p-4 bg-primary/5 rounded-md">
            <div className="flex items-start gap-3">
              <UserPlusIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">Créez un compte pour profiter d'avantages exclusifs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Créez un compte pour suivre vos commandes, bénéficier de promotions et gagner des points de fidélité.
                </p>
                <Button onClick={handleCreateAccount}>Créer un compte</Button>
              </div>
            </div>
          </div>
        ) : (
          <AuthCheck
            fallback={
              <div className="mt-6 p-4 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Créez un compte pour profiter d'avantages exclusifs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Créez un compte pour suivre vos commandes, bénéficier de promotions et gagner des points de fidélité.
                </p>
                {accountCreated ? (
                  <div className="text-green-600 flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Compte créé avec succès !
                  </div>
                ) : (
                  <Button onClick={handleCreateAccount}>Créer un compte</Button>
                )}
              </div>
            }
          >
            <div className="mt-6 p-4 bg-primary/5 rounded-md">
              <h3 className="font-medium mb-2">Merci pour votre commande !</h3>
              <p className="text-sm text-muted-foreground">
                Vous pouvez suivre l'état de votre commande dans la section "Commandes" de votre profil.
              </p>
            </div>
          </AuthCheck>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleDownload}>
          <DownloadIcon className="h-4 w-4 mr-2" />
          Télécharger le reçu
        </Button>
        <Button onClick={onClose}>Terminer</Button>
      </CardFooter>
    </Card>
  )
}
