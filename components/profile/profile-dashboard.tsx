"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { UserIcon, UtensilsIcon, BellIcon, CreditCardIcon, ShieldIcon } from "lucide-react"
import PersonalInfoForm from "./personal-info-form"
import DietaryPreferencesForm from "./dietary-preferences-form"
import NotificationSettingsForm from "./notification-settings-form"
import PaymentMethodsForm from "./payment-methods-form"
import PrivacySettingsForm from "./privacy-settings-form"
import AccountSettingsForm from "./account-settings-form"
import { useProfile } from "@/hooks/use-profile"

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("personal-info")
  const { profile, isLoading } = useProfile()

  if (isLoading) {
    return <ProfileSkeleton />
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal-info" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
          <TabsTrigger value="personal-info" className="flex flex-col py-2 h-auto">
            <UserIcon className="h-4 w-4 mb-1" />
            <span className="text-xs">Informations</span>
          </TabsTrigger>
          <TabsTrigger value="dietary" className="flex flex-col py-2 h-auto">
            <UtensilsIcon className="h-4 w-4 mb-1" />
            <span className="text-xs">Préférences</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-col py-2 h-auto">
            <BellIcon className="h-4 w-4 mb-1" />
            <span className="text-xs">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex flex-col py-2 h-auto">
            <CreditCardIcon className="h-4 w-4 mb-1" />
            <span className="text-xs">Paiement</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex flex-col py-2 h-auto">
            <ShieldIcon className="h-4 w-4 mb-1" />
            <span className="text-xs">Confidentialité</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex flex-col py-2 h-auto">
            <SettingsIcon className="h-4 w-4 mb-1" />
            <span className="text-xs">Compte</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="personal-info">
            <PersonalInfoForm profile={profile} />
          </TabsContent>
          <TabsContent value="dietary">
            <DietaryPreferencesForm preferences={profile.dietaryPreferences} />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettingsForm settings={profile.notificationSettings} />
          </TabsContent>
          <TabsContent value="payment">
            <PaymentMethodsForm paymentMethods={profile.paymentMethods} />
          </TabsContent>
          <TabsContent value="privacy">
            <PrivacySettingsForm settings={profile.privacySettings} />
          </TabsContent>
          <TabsContent value="account">
            <AccountSettingsForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-12 bg-gray-200 rounded animate-pulse" />
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse mt-4" />
        </div>
      </Card>
    </div>
  )
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
