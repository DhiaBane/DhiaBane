"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CameraIcon, CheckIcon, Loader2Icon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updateProfile } from "@/actions/profile-actions"
import type { UserProfile } from "@/types/profile"

interface PersonalInfoFormProps {
  profile: UserProfile
}

export default function PersonalInfoForm({ profile }: PersonalInfoFormProps) {
  const { toast } = useToast()
  const [name, setName] = useState(profile.name || "")
  const [email, setEmail] = useState(profile.email || "")
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || "")
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "L'image ne doit pas dépasser 5 Mo",
        variant: "destructive",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Format non supporté",
        description: "Veuillez sélectionner une image",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, you would upload to a storage service
      // For demo purposes, we'll use a local URL
      const localUrl = URL.createObjectURL(file)
      setAvatarUrl(localUrl)
    } catch (err) {
      console.error("Error uploading avatar:", err)
      toast({
        title: "Erreur",
        description: "Impossible de télécharger l'image",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)

    try {
      const result = await updateProfile({
        name,
        email,
        phoneNumber,
        avatarUrl,
      })

      if (result.success) {
        toast({
          title: "Profil mis à jour",
          description: "Vos informations personnelles ont été mises à jour avec succès",
        })
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 3000)
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de la mise à jour du profil",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error updating profile:", err)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl || "/placeholder.svg"} alt="Avatar" />
                <AvatarFallback className="text-2xl">{name ? name.charAt(0).toUpperCase() : "?"}</AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer"
              >
                <CameraIcon className="h-4 w-4" />
                <span className="sr-only">Télécharger une photo</span>
              </label>
              <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p className="text-sm text-muted-foreground">
              Utilisé pour les communications et la récupération de compte
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled
            />
            <p className="text-sm text-muted-foreground">
              Le numéro de téléphone ne peut pas être modifié car il est utilisé comme identifiant principal
            </p>
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
