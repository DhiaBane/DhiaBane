"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const supabase = getSupabaseClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        throw signInError
      }

      // Get the current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Échec de l'authentification")
      }

      // Check if user has super_admin role
      const { data: userData, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single()

      if (roleError) {
        throw roleError
      }

      if (userData?.role === "super_admin") {
        router.push("/admin")
      } else {
        router.push("/unauthorized")
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la connexion.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center">
              <div className="rounded-md bg-blue-600 p-2">
                <span className="text-xl font-bold text-white">RP</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-center">RestoPilote Admin</CardTitle>
            <CardDescription className="text-center">Connectez-vous à votre compte administrateur</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                    Mot de passe oublié?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-center text-gray-500">
              En vous connectant, vous acceptez nos{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Conditions d'utilisation
              </Link>{" "}
              et notre{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Politique de confidentialité
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
