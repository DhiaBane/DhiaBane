"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { SharedBill } from "@/types/shared-bill"
import { formatDate, formatCurrency } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, CreditCardIcon, EyeIcon, UsersIcon } from "lucide-react"

interface SharedBillItemProps {
  bill: SharedBill
  type: "sent" | "received"
  onViewDetails: () => void
}

export default function SharedBillItem({ bill, type, onViewDetails }: SharedBillItemProps) {
  const getStatusBadge = () => {
    switch (bill.status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">En attente</Badge>
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Payé</Badge>
      case "declined":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Refusé</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Expiré</Badge>
      default:
        return null
    }
  }

  const person = type === "received" ? bill.sender : bill.recipient

  // Calculate total participants (including sender)
  const totalParticipants = bill.shares.length + 1

  // Calculate your share
  const yourShare =
    type === "received"
      ? bill.shares.find((share) => share.person.id === "current-user")?.amount || 0
      : bill.totalAmount - bill.shares.reduce((sum, share) => sum + share.amount, 0)

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{bill.restaurantName}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <CalendarIcon className="h-3.5 w-3.5 mr-1" />
              {formatDate(bill.date)}
            </div>
          </div>
          <div>{getStatusBadge()}</div>
        </div>

        <div className="flex items-center mt-4 text-sm">
          <UsersIcon className="h-4 w-4 mr-1.5 text-muted-foreground" />
          <span>
            {totalParticipants} participant{totalParticipants > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={person.avatarUrl || "/placeholder.svg"} alt={person.name} />
              <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {type === "received" ? "Partagé par" : "Partagé avec"} {person.name}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <CreditCardIcon className="h-3.5 w-3.5 mr-1" />
                Votre part: {formatCurrency(yourShare)}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onViewDetails} className="flex items-center gap-1">
            <EyeIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Détails</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
