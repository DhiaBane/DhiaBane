import type { Person } from "@/types/gift-card"

export interface ShareDetail {
  person: Person
  amount: number
  status?: "pending" | "paid" | "declined"
}

export interface SharedBill {
  id: string
  restaurantName: string
  restaurantAddress?: string
  date: string
  totalAmount: number
  tip: number
  status: "pending" | "paid" | "declined" | "expired"
  note?: string
  receiptImageUrl?: string
  sender: Person
  recipient: Person
  shares: ShareDetail[]
}
