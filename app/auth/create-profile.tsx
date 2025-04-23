"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CameraIcon, ArrowRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { createUserProfile } from "@/actions/auth-actions"

export default function CreateProfile() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Get phone number from session storage
    const storedNumber = sessionStorage.getItem("phoneNumber")
    if (!storedNumber) {
      router.push("/auth/phone-login")
      return
    }
    setPhoneNumber(storedNumber)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await createUserProfile({
        phoneNumber,
        name,
        email: email || undefined, // Make email optional
        avatarUrl: avatarUrl || undefined, // Make avatar optional
      })

      if (result.success) {
        // Clear session storage
        sessionStorage.removeItem("phoneNumber")

        // Redirect to social connections page
        router.push("/auth/social-connections")
      } else {
        setError(result.error || "Une erreur est survenue. Veuillez réessayer.")
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image est trop volumineuse. Taille maximum: 5MB")
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image")
      return
    }

    try {
      // In a real app, you would upload to a storage service
      // For demo purposes, we'll use a local URL
      const localUrl = URL.createObjectURL(file)
      setAvatarUrl(localUrl)
      setError("")
    } catch (err) {
      setError("Erreur lors du téléchargement de l'image")
      console.error(err)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Créer votre profil</CardTitle>
          <CardDescription className="text-center">
            Ajoutez vos informations pour personnaliser votre expérience
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-6">
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
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center">
                Email <span className="text-sm text-gray-500 ml-2">(optionnel)</span>
              </label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading || !name}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Création en cours</span>
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Continuer</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
