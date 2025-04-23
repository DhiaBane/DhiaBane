"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeftIcon, CheckIcon, UtensilsIcon, BarChartIcon, UsersIcon, BellIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PartnersPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "Demande envoyée",
        description: "Nous vous contacterons dans les plus brefs délais",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" size="sm" className="mb-6">
        <Link href="/">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
      </Button>

      <h1 className="text-4xl font-bold mb-6">Devenir partenaire RestoPilote</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <p className="text-xl text-muted-foreground mb-8">
            Rejoignez notre réseau de restaurants partenaires et bénéficiez d'une solution complète pour gérer votre
            établissement et augmenter votre visibilité.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <UtensilsIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Gestion simplifiée</h3>
                <p className="text-muted-foreground">
                  Gérez vos réservations, commandes et paiements depuis une seule interface intuitive.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BarChartIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Analyses détaillées</h3>
                <p className="text-muted-foreground">
                  Accédez à des statistiques et rapports pour optimiser votre activité et augmenter votre chiffre
                  d'affaires.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Visibilité accrue</h3>
                <p className="text-muted-foreground">
                  Attirez de nouveaux clients grâce à notre plateforme et fidélisez votre clientèle existante.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BellIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Notifications en temps réel</h3>
                <p className="text-muted-foreground">
                  Recevez des alertes instantanées pour les nouvelles commandes, réservations et avis clients.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-4">
                    <CheckIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Demande envoyée !</h3>
                  <p className="text-muted-foreground mb-6">
                    Merci pour votre intérêt ! Notre équipe commerciale vous contactera dans les 48 heures pour discuter
                    des détails et répondre à vos questions.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Envoyer une autre demande</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">Demande d'information</h2>

                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Nom du restaurant</Label>
                    <Input
                      id="restaurantName"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Nom du propriétaire / gérant</Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse du restaurant</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (optionnel)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Questions ou informations supplémentaires..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer ma demande"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center py-12 bg-primary/5 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Rejoignez plus de 500 restaurants partenaires qui utilisent RestoPilote pour développer leur activité.
        </p>
        <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
          <div className="w-32 h-16 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500 font-medium">Restaurant A</span>
          </div>
          <div className="w-32 h-16 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500 font-medium">Restaurant B</span>
          </div>
          <div className="w-32 h-16 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500 font-medium">Restaurant C</span>
          </div>
          <div className="w-32 h-16 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500 font-medium">Restaurant D</span>
          </div>
          <div className="w-32 h-16 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500 font-medium">Restaurant E</span>
          </div>
          <div className="w-32 h-16 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500 font-medium">Restaurant F</span>
          </div>
        </div>
      </div>
    </div>
  )
}
