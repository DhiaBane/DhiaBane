"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CheckIcon, Loader2Icon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updatePrivacySettings } from "@/actions/profile-actions"
import type { PrivacySettings } from "@/types/profile"

interface PrivacySettingsFormProps {
  settings: PrivacySettings
}

export default function PrivacySettingsForm({ settings }: PrivacySettingsFormProps) {
  const { toast } = useToast()
  const [profileVisibility, setProfileVisibility] = useState(settings.profileVisibility || "public")
  const [shareActivity, setShareActivity] = useState(settings.shareActivity)
  const [shareLocation, setShareLocation] = useState(settings.shareLocation)
  const [allowFriendRequests, setAllowFriendRequests] = useState(settings.allowFriendRequests)
  const [allowTagging, setAllowTagging] = useState(settings.allowTagging)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)

    try {
      const result = await updatePrivacySettings({
        profileVisibility,
        shareActivity,
        shareLocation,
        allowFriendRequests,
        allowTagging,
      })

      if (result.success) {
        toast({
          title: "Paramètres mis à jour",
          description: "Vos paramètres de confidentialité ont été mis à jour avec succès",
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
      console.error("Error updating privacy settings:", err)
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
        <CardTitle>Paramètres de confidentialité</CardTitle>
        <CardDescription>Gérez qui peut voir votre profil et vos activités</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Visibilité du profil</h3>
            <RadioGroup value={profileVisibility} onValueChange={setProfileVisibility}>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="public" id="profile-public" />
                <div>
                  <Label htmlFor="profile-public" className="font-medium">
                    Public
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Tout le monde peut voir votre profil et vos avis sur les restaurants
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="friends" id="profile-friends" />
                <div>
                  <Label htmlFor="profile-friends" className="font-medium">
                    Amis uniquement
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Seuls vos amis peuvent voir votre profil et vos avis sur les restaurants
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="private" id="profile-private" />
                <div>
                  <Label htmlFor="profile-private" className="font-medium">
                    Privé
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Votre profil est privé et vos avis sont publiés de manière anonyme
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Partage et interactions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="share-activity">Partager mon activité</Label>
                  <p className="text-sm text-muted-foreground">
                    Permettre à vos amis de voir vos visites et avis récents
                  </p>
                </div>
                <Switch id="share-activity" checked={shareActivity} onCheckedChange={setShareActivity} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="share-location">Partager ma localisation</Label>
                  <p className="text-sm text-muted-foreground">
                    Permettre à l'application d'utiliser votre localisation pour des recommandations
                  </p>
                </div>
                <Switch id="share-location" checked={shareLocation} onCheckedChange={setShareLocation} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-friend-requests">Autoriser les demandes d'amis</Label>
                  <p className="text-sm text-muted-foreground">
                    Permettre aux autres utilisateurs de vous envoyer des demandes d'amis
                  </p>
                </div>
                <Switch
                  id="allow-friend-requests"
                  checked={allowFriendRequests}
                  onCheckedChange={setAllowFriendRequests}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-tagging">Autoriser les identifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Permettre à vos amis de vous identifier dans les photos et avis
                  </p>
                </div>
                <Switch id="allow-tagging" checked={allowTagging} onCheckedChange={setAllowTagging} />
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
