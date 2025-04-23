export interface Person {
  id: string
  name: string
  phoneNumber: string
  avatarUrl?: string
}

export interface GiftCard {
  id: string
  code: string
  amount: number
  title: string
  message: string
  design: string
  status: "active" | "redeemed" | "expired" | "pending"
  createdAt: string
  expiryDate: string
  redeemedAt?: string
  sender: Person
  recipient: Person
}
