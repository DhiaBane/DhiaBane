"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import type { SharedBill } from "@/types/shared-bill"
import { Skeleton } from "@/components/ui/skeleton"
import SharedBillItem from "./shared-bill-item"

interface SharedBillsListProps {
  bills: SharedBill[]
  type: "sent" | "received"
  isLoading: boolean
  onViewDetails: (bill: SharedBill) => void
  emptyMessage: string
}

export default function SharedBillsList({ bills, type, isLoading, onViewDetails, emptyMessage }: SharedBillsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-10 w-20" />
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-10 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (bills.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
          <ReceiptIcon className="h-6 w-6 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium mb-2">{emptyMessage}</h3>
        {type === "sent" ? (
          <p className="text-muted-foreground">Partagez une addition avec vos amis pour la voir apparaître ici</p>
        ) : (
          <p className="text-muted-foreground">
            Vos amis n'ont pas encore partagé d'additions avec vous. Elles apparaîtront ici.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bills.map((bill) => (
        <SharedBillItem key={bill.id} bill={bill} type={type} onViewDetails={() => onViewDetails(bill)} />
      ))}
    </div>
  )
}

function ReceiptIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </svg>
  )
}
