"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CheckIcon, Loader2Icon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updateNotificationSettings } from "@/actions/profile-actions"
import type { NotificationSettings } from "@/types/profile"

interface NotificationSettingsFormProps {
  settings: NotificationSettings
}

export default function NotificationSettingsForm({ settings }: NotificationSettingsFormProps) {
  const { toast } = useToast()
  const [pushEnabled, setPushEnabled] = useState(settings.pushEnabled)
  const [emailEnabled, setEmailEnabled] = useState(settings.emailEnabled)
  const [smsEnabled, setSmsEnabled] = useState(settings.smsEnabled)
  const [orderUpdates, setOrderUpdates] = useState(settings.orderUpdates)
  const [reservationReminders, setReservationReminders] = useState(settings.reservationReminders)
  const [specialOffers, setSpecialOffers] = useState(settings.specialOffers)
  const [friendActivity, setFriendActivity] = useState(settings.friendActivity)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)

    try {
      const result = await updateNotificationSettings({
        pushEnabled,
        emailEnabled,
        smsEnabled,
        orderUpdates,
        reservationReminders,
        specialOffers,
        friendActivity,
      })

      if (result.success) {
        toast({
          title: "Paramètres mis à jour",
          description: "Vos paramètres de notification ont été mis à jour avec succès",
        })
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 3000)
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de la mise à jour des paramètres",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error updating notification settings:", err)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des paramètres",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres de notification</CardTitle>
        <CardDescription>Gérez comment et quand vous recevez des notifications</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Canaux de notification</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Notifications push</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications sur votre appareil</p>
                </div>
                <Switch id="push-notifications" checked={pushEnabled} onCheckedChange={setPushEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                </div>
                <Switch id="email-notifications" checked={emailEnabled} onCheckedChange={setEmailEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">Notifications par SMS</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications par SMS</p>
                </div>
                <Switch id="sms-notifications" checked={smsEnabled} onCheckedChange={setSmsEnabled} />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Types de notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="order-updates">Mises à jour des commandes</Label>
                  <p className="text-sm text-muted-foreground">
                    Statut de préparation, livraison et confirmation des commandes
                  </p>
                </div>
                <Switch id="order-updates" checked={orderUpdates} onCheckedChange={setOrderUpdates} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reservation-reminders">Rappels de réservation</Label>
                  <p className="text-sm text-muted-foreground">
                    Rappels pour vos réservations à venir et confirmations
                  </p>
                </div>
                <Switch
                  id="reservation-reminders"
                  checked={reservationReminders}
                  onCheckedChange={setReservationReminders}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="special-offers">Offres spéciales</Label>
                  <p className="text-sm text-muted-foreground">
                    Promotions, réductions et événements des restaurants que vous suivez
                  </p>
                </div>
                <Switch id="special-offers" checked={specialOffers} onCheckedChange={setSpecialOffers} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="friend-activity">Activité des amis</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications lorsque vos amis partagent des avis ou vous invitent
                  </p>
                </div>
                <Switch id="friend-activity" checked={friendActivity} onCheckedChange={setFriendActivity} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading || isSuccess} className="ml-auto">
            {isLoading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : isSuccess ? (
              <>
                <CheckIcon className="mr-2 h-4 w-4" />
                Enregistré
              </>
            ) : (
              "Enregistrer"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
