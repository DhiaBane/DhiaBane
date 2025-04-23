export interface DietaryPreferences {
  diet: string
  allergies: string[]
  tastePreferences: string[]
}

export interface NotificationSettings {
  pushEnabled: boolean
  emailEnabled: boolean
  smsEnabled: boolean
  orderUpdates: boolean
  reservationReminders: boolean
  specialOffers: boolean
  friendActivity: boolean
}

export interface PaymentMethod {
  id: string
  cardNumber: string
  cardholderName: string
  expiryMonth: string
  expiryYear: string
  isDefault?: boolean
}

export interface PrivacySettings {
  profileVisibility: "public" | "friends" | "private"
  shareActivity: boolean
  shareLocation: boolean
  allowFriendRequests: boolean
  allowTagging: boolean
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phoneNumber: string
  avatarUrl: string
  dietaryPreferences: DietaryPreferences
  notificationSettings: NotificationSettings
  paymentMethods: PaymentMethod[]
  privacySettings: PrivacySettings
}
