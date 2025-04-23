"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { HistoryIcon, SendIcon, ReceiptIcon } from "lucide-react"
import SharedBillsList from "./shared-bills-list"
import SharedBillDetailsModal from "./shared-bill-details-modal"
import { useSharedBills } from "@/hooks/use-shared-bills"
import type { SharedBill } from "@/types/shared-bill"

export default function SharedBillsHistory() {
  const [selectedBill, setSelectedBill] = useState<SharedBill | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const { sentBills, receivedBills, isLoading, refreshSharedBills } = useSharedBills()

  const handleViewDetails = (bill: SharedBill) => {
    setSelectedBill(bill)
    setIsDetailsModalOpen(true)
  }

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false)
    setSelectedBill(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Vos additions partagées</h2>
          <p className="text-muted-foreground">Consultez l'historique des additions que vous avez partagées</p>
        </div>
        <Button variant="outline" onClick={refreshSharedBills} disabled={isLoading} className="flex items-center gap-2">
          <HistoryIcon className="h-4 w-4" />
          Actualiser
        </Button>
      </div>

      <Tabs defaultValue="sent" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <SendIcon className="h-4 w-4" />
            Envoyées
          </TabsTrigger>
          <TabsTrigger value="received" className="flex items-center gap-2">
            <ReceiptIcon className="h-4 w-4" />
            Reçues
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sent" className="mt-6">
          <SharedBillsList
            bills={sentBills}
            type="sent"
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
            emptyMessage="Vous n'avez pas encore partagé d'additions"
          />
        </TabsContent>
        <TabsContent value="received" className="mt-6">
          <SharedBillsList
            bills={receivedBills}
            type="received"
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
            emptyMessage="Vous n'avez pas encore reçu d'additions partagées"
          />
        </TabsContent>
      </Tabs>

      {selectedBill && (
        <SharedBillDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetails}
          bill={selectedBill}
          type={selectedBill.sender.id === "current-user" ? "sent" : "received"}
        />
      )}
    </div>
  )
}
