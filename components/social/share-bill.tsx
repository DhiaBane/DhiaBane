"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import FriendSelector from "./friend-selector"
import { ArrowRightIcon, DivideIcon, PercentIcon, SplitSquareVerticalIcon } from "lucide-react"

interface Friend {
  id: string
  name: string
  phoneNumber: string
  avatarUrl?: string
}

interface ShareBillProps {
  totalAmount: number
  onShare: (shares: BillShare[]) => void
  onCancel: () => void
}

interface BillShare {
  friend: Friend
  amount: number
  percentage: number
}

export default function ShareBill({ totalAmount, onShare, onCancel }: ShareBillProps) {
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([])
  const [splitMethod, setSplitMethod] = useState<"equal" | "custom" | "percentage">("equal")
  const [shares, setShares] = useState<BillShare[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // Handle friend selection
  const handleFriendsSelected = (friends: Friend[]) => {
    setSelectedFriends(friends)

    // Reset shares when friends change
    const newShares = friends.map((friend) => {
      const equalShare = friends.length > 0 ? totalAmount / (friends.length + 1) : 0
      const percentage = friends.length > 0 ? 100 / (friends.length + 1) : 0

      return {
        friend,
        amount: equalShare,
        percentage,
      }
    })

    setShares(newShares)
  }

  // Update share amount for a friend
  const updateShareAmount = (friendId: string, amount: number) => {
    setShares((prev) => {
      const newShares = [...prev]
      const index = newShares.findIndex((share) => share.friend.id === friendId)

      if (index !== -1) {
        newShares[index] = {
          ...newShares[index],
          amount,
          percentage: (amount / totalAmount) * 100,
        }
      }

      return newShares
    })
  }

  // Update share percentage for a friend
  const updateSharePercentage = (friendId: string, percentage: number) => {
    setShares((prev) => {
      const newShares = [...prev]
      const index = newShares.findIndex((share) => share.friend.id === friendId)

      if (index !== -1) {
        newShares[index] = {
          ...newShares[index],
          percentage,
          amount: (percentage / 100) * totalAmount,
        }
      }

      return newShares
    })
  }

  // Calculate remaining amount (what you pay)
  const calculateRemainingAmount = () => {
    const totalShared = shares.reduce((sum, share) => sum + share.amount, 0)
    return Math.max(0, totalAmount - totalShared)
  }

  // Calculate remaining percentage
  const calculateRemainingPercentage = () => {
    const totalPercentage = shares.reduce((sum, share) => sum + share.percentage, 0)
    return Math.max(0, 100 - totalPercentage)
  }

  // Handle equal split
  const handleEqualSplit = () => {
    const equalShare = totalAmount / (selectedFriends.length + 1)
    const equalPercentage = 100 / (selectedFriends.length + 1)

    const newShares = selectedFriends.map((friend) => ({
      friend,
      amount: equalShare,
      percentage: equalPercentage,
    }))

    setShares(newShares)
  }

  // Handle share submission
  const handleSubmit = async () => {
    setIsProcessing(true)

    try {
      // In a real app, this would send the shares to an API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onShare(shares)
    } catch (error) {
      console.error("Error sharing bill:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Partager l'addition</CardTitle>
        <CardDescription>Total: {totalAmount.toFixed(2)}€</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Avec qui souhaitez-vous partager ?</Label>
          <FriendSelector onSelect={handleFriendsSelected} maxSelections={10} />
        </div>

        {selectedFriends.length > 0 && (
          <Tabs defaultValue="equal" onValueChange={(value) => setSplitMethod(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="equal" className="flex items-center">
                <DivideIcon className="h-4 w-4 mr-2" />
                Égal
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex items-center">
                <SplitSquareVerticalIcon className="h-4 w-4 mr-2" />
                Montant
              </TabsTrigger>
              <TabsTrigger value="percentage" className="flex items-center">
                <PercentIcon className="h-4 w-4 mr-2" />
                Pourcentage
              </TabsTrigger>
            </TabsList>

            <TabsContent value="equal" className="space-y-4 pt-4">
              <p className="text-sm text-gray-500">
                Chaque personne paie une part égale de {(totalAmount / (selectedFriends.length + 1)).toFixed(2)}€
              </p>

              <div className="space-y-3">
                {selectedFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={friend.avatarUrl || "/placeholder.svg"} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{friend.name}</span>
                    </div>
                    <span className="font-medium">{(totalAmount / (selectedFriends.length + 1)).toFixed(2)}€</span>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 bg-primary/10">
                      <AvatarFallback>Vous</AvatarFallback>
                    </Avatar>
                    <span>Vous</span>
                  </div>
                  <span className="font-medium">{(totalAmount / (selectedFriends.length + 1)).toFixed(2)}€</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4 pt-4">
              <div className="space-y-3">
                {shares.map((share) => (
                  <div key={share.friend.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={share.friend.avatarUrl || "/placeholder.svg"} alt={share.friend.name} />
                          <AvatarFallback>{share.friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{share.friend.name}</span>
                      </div>
                      <div className="w-24">
                        <Input
                          type="number"
                          min="0"
                          max={totalAmount}
                          step="0.01"
                          value={share.amount.toFixed(2)}
                          onChange={(e) => updateShareAmount(share.friend.id, Number.parseFloat(e.target.value) || 0)}
                          className="text-right"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 bg-primary/10">
                      <AvatarFallback>Vous</AvatarFallback>
                    </Avatar>
                    <span>Vous</span>
                  </div>
                  <span className="font-medium w-24 text-right">{calculateRemainingAmount().toFixed(2)}€</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="percentage" className="space-y-4 pt-4">
              <div className="space-y-4">
                {shares.map((share) => (
                  <div key={share.friend.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={share.friend.avatarUrl || "/placeholder.svg"} alt={share.friend.name} />
                          <AvatarFallback>{share.friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{share.friend.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-12 text-right">{share.percentage.toFixed(0)}%</span>
                        <span className="text-sm w-16 text-right">{share.amount.toFixed(2)}€</span>
                      </div>
                    </div>
                    <Slider
                      value={[share.percentage]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(values) => updateSharePercentage(share.friend.id, values[0])}
                    />
                  </div>
                ))}

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2 bg-primary/10">
                        <AvatarFallback>Vous</AvatarFallback>
                      </Avatar>
                      <span>Vous</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-12 text-right">{calculateRemainingPercentage().toFixed(0)}%</span>
                      <span className="text-sm w-16 text-right">{calculateRemainingAmount().toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={handleSubmit} disabled={isProcessing || selectedFriends.length === 0}>
          {isProcessing ? (
            <span className="flex items-center">
              <span className="mr-2">Envoi en cours</span>
              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            </span>
          ) : (
            <span className="flex items-center">
              <span className="mr-2">Partager</span>
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
