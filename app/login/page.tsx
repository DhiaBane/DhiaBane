import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export const metadata: Metadata = {
  title: "Login | RestauPilot",
  description: "Login to your RestauPilot account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">RestauPilot</h1>
          <p className="mt-2 text-sm text-gray-600">La plateforme complète de gestion de restaurants</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Connexion</CardTitle>
            <CardDescription>Entrez vos identifiants pour accéder à votre compte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="exemple@restaurant.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Mot de passe oublié?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">
                Se souvenir de moi
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" size="lg">
              Se connecter
            </Button>
            <div className="text-center text-sm">
              Pas encore de compte?{" "}
              <Link href="/register" className="text-primary hover:underline">
                S&apos;inscrire
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center">
          <Link href="/demo" className="text-sm text-gray-600 hover:text-primary">
            Essayer la démo sans inscription
          </Link>
        </div>
      </div>
    </div>
  )
}
