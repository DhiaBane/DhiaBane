"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import type { GiftCard } from "@/types/gift-card"
import { Skeleton } from "@/components/ui/skeleton"
import GiftCardItem from "./gift-card-item"

interface GiftCardsListProps {
  cards: GiftCard[]
  type: "received" | "sent"
  isLoading: boolean
  emptyMessage: string
}

export default function GiftCardsList({ cards, type, isLoading, emptyMessage }: GiftCardsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-stretch">
                <div className="w-1/3 bg-gray-100">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="p-4 flex-1 space-y-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
          <GiftIcon className="h-6 w-6 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium mb-2">{emptyMessage}</h3>
        {type === "received" ? (
          <p className="text-muted-foreground">Partagez votre profil avec vos amis pour recevoir des cartes cadeaux</p>
        ) : (
          <p className="text-muted-foreground">Envoyez une carte cadeau à vos amis pour leur faire plaisir</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <GiftCardItem key={card.id} card={card} type={type} />
      ))}
    </div>
  )
}

function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}
