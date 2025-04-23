"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, CheckIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { verifyCode, resendVerificationCode } from "@/actions/auth-actions"

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countdown, setCountdown] = useState(30)
  const router = useRouter()

  useEffect(() => {
    // Get phone number from session storage
    const storedNumber = sessionStorage.getItem("phoneNumber")
    if (!storedNumber) {
      router.push("/auth/phone-login")
      return
    }
    setPhoneNumber(storedNumber)

    // Start countdown for resend button
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (value && /^\d+$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Auto-focus next input
      if (index < 5 && value) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        if (nextInput) {
          nextInput.focus()
        }
      }
    } else if (value === "") {
      const newCode = [...code]
      newCode[index] = ""
      setCode(newCode)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const fullCode = code.join("")
    if (fullCode.length !== 6) {
      setError("Veuillez entrer le code complet à 6 chiffres")
      setIsLoading(false)
      return
    }

    try {
      const result = await verifyCode(phoneNumber, fullCode)

      if (result.success) {
        if (result.isNewUser) {
          router.push("/auth/create-profile")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError(result.error || "Code incorrect. Veuillez réessayer.")
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (countdown > 0) return

    try {
      await resendVerificationCode(phoneNumber)
      setCountdown(30)
      setError("")
    } catch (err) {
      setError("Impossible d'envoyer un nouveau code. Veuillez réessayer.")
      console.error(err)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Vérification</CardTitle>
          <CardDescription className="text-center">
            Nous avons envoyé un code à 6 chiffres au {formatPhoneNumberForDisplay(phoneNumber)}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className="h-12 w-12 text-center text-xl"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div className="text-center">
              <button
                type="button"
                className={`text-sm ${countdown > 0 ? "text-gray-400" : "text-primary hover:underline"}`}
                onClick={handleResendCode}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Renvoyer le code (${countdown}s)` : "Renvoyer le code"}
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Vérification</span>
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Vérifier</span>
                  <CheckIcon className="h-4 w-4" />
                </span>
              )}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/auth/phone-login")}>
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

function formatPhoneNumberForDisplay(phoneNumber: string) {
  // Format for display: +33 6 12 34 56 78
  if (!phoneNumber) return ""

  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "")

  // Check if it starts with country code
  if (cleaned.startsWith("33")) {
    const countryCode = "+33"
    const rest = cleaned.substring(2)

    // Format the rest of the number in groups of 2
    let formatted = ""
    for (let i = 0; i < rest.length; i += 2) {
      formatted += rest.substring(i, i + 2) + " "
    }

    return countryCode + " " + formatted.trim()
  }

  return phoneNumber
}
