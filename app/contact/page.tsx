"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeftIcon, CheckCircleIcon, MailIcon, PhoneIcon, MapPinIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais",
      })

      // Réinitialiser le formulaire
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
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

      <h1 className="text-4xl font-bold mb-6">Contactez-nous</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-xl text-muted-foreground mb-8">
            Nous sommes là pour répondre à toutes vos questions. N'hésitez pas à nous contacter par téléphone, email ou
            en remplissant le formulaire ci-contre.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <PhoneIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Téléphone</h3>
                <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                <p className="text-sm text-muted-foreground">Du lundi au vendredi, 9h-18h</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MailIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-muted-foreground">contact@restopilote.com</p>
                <p className="text-sm text-muted-foreground">Nous répondons sous 24h</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPinIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Adresse</h3>
                <p className="text-muted-foreground">123 Avenue des Champs-Élysées</p>
                <p className="text-muted-foreground">75008 Paris, France</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                    <p className="text-muted-foreground mb-4">
                      Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>Envoyer un autre message</Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
              </CardContent>

              {!isSubmitted && (
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer"
                    )}
                  </Button>
                </CardFooter>
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
