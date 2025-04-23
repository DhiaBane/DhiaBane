"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusIcon, GiftIcon, HistoryIcon } from "lucide-react"
import GiftCardsList from "./gift-cards-list"
import SendGiftCardModal from "./send-gift-card-modal"
import { useGiftCards } from "@/hooks/use-gift-cards"

export default function GiftCardDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { receivedCards, sentCards, isLoading } = useGiftCards()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Vos cartes cadeaux</h2>
          <p className="text-muted-foreground">Envoyez et gérez vos cartes cadeaux</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Envoyer une carte cadeau
        </Button>
      </div>

      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="received" className="flex items-center gap-2">
            <GiftIcon className="h-4 w-4" />
            Reçues
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <HistoryIcon className="h-4 w-4" />
            Envoyées
          </TabsTrigger>
        </TabsList>
        <TabsContent value="received" className="mt-6">
          <GiftCardsList
            cards={receivedCards}
            type="received"
            isLoading={isLoading}
            emptyMessage="Vous n'avez pas encore reçu de cartes cadeaux"
          />
        </TabsContent>
        <TabsContent value="sent" className="mt-6">
          <GiftCardsList
            cards={sentCards}
            type="sent"
            isLoading={isLoading}
            emptyMessage="Vous n'avez pas encore envoyé de cartes cadeaux"
          />
        </TabsContent>
      </Tabs>

      <SendGiftCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
