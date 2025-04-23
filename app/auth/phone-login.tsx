"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneIcon, ArrowRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { verifyPhoneNumber } from "@/actions/auth-actions"

export default function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Format phone number (remove spaces, add country code if missing)
      const formattedNumber = formatPhoneNumber(phoneNumber)

      // Send verification code
      const result = await verifyPhoneNumber(formattedNumber)

      if (result.success) {
        // Store phone number in session storage for verification page
        sessionStorage.setItem("phoneNumber", formattedNumber)
        router.push("/auth/verify")
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

  const formatPhoneNumber = (number: string) => {
    // Remove all non-digit characters
    let cleaned = number.replace(/\D/g, "")

    // Add French country code if missing
    if (!cleaned.startsWith("33") && cleaned.startsWith("0")) {
      cleaned = "33" + cleaned.substring(1)
    } else if (!cleaned.startsWith("33") && !cleaned.startsWith("0")) {
      cleaned = "33" + cleaned
    }

    return cleaned
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
          <CardDescription className="text-center">
            Entrez votre numéro de téléphone pour vous connecter ou créer un compte
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-primary">
                <div className="flex items-center justify-center px-3 py-2 bg-gray-100 border-r">
                  <PhoneIcon className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  type="tel"
                  placeholder="Numéro de téléphone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 border-0 focus-visible:ring-0"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Envoi en cours</span>
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
