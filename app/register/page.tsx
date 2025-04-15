import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Inscription | RestauPilot",
  description: "Créez votre compte RestauPilot",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">RestauPilot</h1>
          <p className="mt-2 text-sm text-gray-600">La plateforme complète de gestion de restaurants</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Créer un compte</CardTitle>
            <CardDescription>Commencez à gérer votre restaurant efficacement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="exemple@restaurant.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurantType">Type d&apos;établissement</Label>
              <Select>
                <SelectTrigger id="restaurantType">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant traditionnel</SelectItem>
                  <SelectItem value="fastfood">Fast-food</SelectItem>
                  <SelectItem value="cafe">Café</SelectItem>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="bakery">Boulangerie</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm font-normal">
                J&apos;accepte les{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  conditions d&apos;utilisation
                </Link>{" "}
                et la{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  politique de confidentialité
                </Link>
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" size="lg">
              S&apos;inscrire
            </Button>
            <div className="text-center text-sm">
              Déjà un compte?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Se connecter
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
