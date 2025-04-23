"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { SendIcon } from "lucide-react"
import FriendSelector from "@/components/social/friend-selector"
import { useToast } from "@/hooks/use-toast"
import { sendGiftCard } from "@/actions/gift-card-actions"
import { formatCurrency } from "@/lib/utils"

interface Friend {
  id: string
  name: string
  phoneNumber: string
  avatarUrl?: string
}

interface SendGiftCardModalProps {
  isOpen: boolean
  onClose: () => void
}

const PREDEFINED_AMOUNTS = [25, 50, 75, 100, 150, 200]

const CARD_DESIGNS = [
  { id: "default", name: "Classique", color: "from-blue-500 to-purple-500" },
  { id: "birthday", name: "Anniversaire", color: "from-pink-500 to-purple-500" },
  { id: "christmas", name: "Noël", color: "from-red-500 to-green-500" },
  { id: "anniversary", name: "Anniversaire de mariage", color: "from-yellow-400 to-orange-500" },
  { id: "congratulations", name: "Félicitations", color: "from-blue-400 to-indigo-500" },
  { id: "thankyou", name: "Merci", color: "from-green-400 to-teal-500" },
]

export default function SendGiftCardModal({ isOpen, onClose }: SendGiftCardModalProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([])
  const [amount, setAmount] = useState<number>(50)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("Carte Cadeau RestoPilote")
  const [design, setDesign] = useState("default")
  const [isLoading, setIsLoading] = useState(false)

  const resetForm = () => {
    setStep(1)
    setSelectedFriends([])
    setAmount(50)
    setCustomAmount("")
    setMessage("")
    setTitle("Carte Cadeau RestoPilote")
    setDesign("default")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleFriendsSelected = (friends: Friend[]) => {
    setSelectedFriends(friends)
  }

  const handleAmountChange = (value: number) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") {
      setCustomAmount("")
      return
    }

    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      setCustomAmount(value)
      setAmount(numValue)
    }
  }

  const handleNextStep = () => {
    if (step === 1 && selectedFriends.length === 0) {
      toast({
        title: "Sélectionnez un destinataire",
        description: "Veuillez sélectionner au moins un destinataire pour la carte cadeau",
        variant: "destructive",
      })
      return
    }

    if (step === 2 && amount <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez sélectionner un montant valide pour la carte cadeau",
        variant: "destructive",
      })
      return
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSendGiftCard()
    }
  }

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSendGiftCard = async () => {
    if (selectedFriends.length === 0) {
      toast({
        title: "Sélectionnez un destinataire",
        description: "Veuillez sélectionner au moins un destinataire pour la carte cadeau",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Send gift card to each selected friend
      for (const friend of selectedFriends) {
        await sendGiftCard({
          recipientId: friend.id,
          recipientPhone: friend.phoneNumber,
          amount,
          title,
          message,
          design,
        })
      }

      toast({
        title: "Carte cadeau envoyée !",
        description: `Votre carte cadeau a été envoyée avec succès à ${
          selectedFriends.length > 1 ? `${selectedFriends.length} personnes` : selectedFriends[0].name
        }`,
      })

      handleClose()
    } catch (error) {
      console.error("Error sending gift card:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de la carte cadeau",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Envoyer une carte cadeau</DialogTitle>
          <DialogDescription>Offrez une expérience restaurant à vos proches</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Step indicator */}
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex flex-col items-center ${
                  stepNumber < step ? "text-primary" : stepNumber === step ? "text-primary" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    stepNumber < step
                      ? "bg-primary text-white"
                      : stepNumber === step
                        ? "border-2 border-primary text-primary"
                        : "border-2 border-gray-200"
                  }`}
                >
                  {stepNumber < step ? <CheckIcon className="h-5 w-5" /> : stepNumber}
                </div>
                <span className="text-xs">
                  {stepNumber === 1 ? "Destinataire" : stepNumber === 2 ? "Montant" : "Personnalisation"}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1: Select recipient */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>À qui souhaitez-vous envoyer une carte cadeau ?</Label>
                <FriendSelector onSelect={handleFriendsSelected} maxSelections={5} />
              </div>
            </div>
          )}

          {/* Step 2: Select amount */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Choisissez un montant</Label>
                <div className="grid grid-cols-3 gap-2">
                  {PREDEFINED_AMOUNTS.map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant={amount === value && !customAmount ? "default" : "outline"}
                      className="h-12"
                      onClick={() => handleAmountChange(value)}
                    >
                      {formatCurrency(value)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ou entrez un montant personnalisé</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">€</span>
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Montant personnalisé"
                    className="pl-8"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Personalize */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Titre de la carte cadeau</Label>
                <Input
                  type="text"
                  placeholder="Titre de la carte cadeau"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <Label>Choisissez un design</Label>
                <RadioGroup value={design} onValueChange={setDesign} className="grid grid-cols-2 gap-2">
                  {CARD_DESIGNS.map((cardDesign) => (
                    <div key={cardDesign.id}>
                      <RadioGroupItem value={cardDesign.id} id={`design-${cardDesign.id}`} className="peer sr-only" />
                      <Label
                        htmlFor={`design-${cardDesign.id}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className={`w-full h-12 rounded-md bg-gradient-to-r ${cardDesign.color} mb-2`}></div>
                        <span className="text-sm">{cardDesign.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Message personnalisé (optionnel)</Label>
                <Textarea
                  placeholder="Écrivez un message personnalisé..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground text-right">{message.length}/200 caractères</p>
              </div>

              <div className="pt-2">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Récapitulatif</p>
                        <p className="text-sm text-muted-foreground">{selectedFriends.length} destinataire(s)</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatCurrency(amount)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handlePreviousStep}>
                Retour
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={handleClose}>
                Annuler
              </Button>
            )}
            <Button type="button" onClick={handleNextStep} disabled={isLoading} className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Envoi en cours...
                </>
              ) : step === 3 ? (
                <>
                  <SendIcon className="h-4 w-4" />
                  Envoyer
                </>
              ) : (
                "Suivant"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
