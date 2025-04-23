"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeftIcon, SearchIcon } from "lucide-react"

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqItems = [
    {
      question: "Comment créer un compte sur RestoPilote ?",
      answer:
        "Pour créer un compte sur RestoPilote, téléchargez l'application ou visitez notre site web, puis cliquez sur 'Créer un compte'. Vous devrez fournir votre numéro de téléphone pour recevoir un code de vérification, puis compléter votre profil avec votre nom et votre email (optionnel).",
      category: "compte",
    },
    {
      question: "Comment scanner un QR code dans un restaurant ?",
      answer:
        "Pour scanner un QR code dans un restaurant, ouvrez l'application RestoPilote et appuyez sur le bouton 'Scanner un QR code' sur la page d'accueil. Pointez votre caméra vers le QR code affiché sur votre table ou à l'entrée du restaurant. Vous serez automatiquement dirigé vers le menu du restaurant.",
      category: "commande",
    },
    {
      question: "Puis-je commander sans créer de compte ?",
      answer:
        "Oui, vous pouvez commander sans créer de compte en utilisant le mode invité. Lorsque vous scannez un QR code dans un restaurant, vous pouvez consulter le menu, commander et payer sans vous connecter. Cependant, pour bénéficier des promotions, suivre vos commandes et gagner des points de fidélité, nous vous recommandons de créer un compte.",
      category: "commande",
    },
    {
      question: "Comment partager l'addition avec mes amis ?",
      answer:
        "Pour partager l'addition avec vos amis, accédez à votre commande dans l'application, puis appuyez sur 'Partager l'addition'. Vous pourrez sélectionner les amis avec qui partager et choisir comment répartir le montant (parts égales, montants personnalisés ou pourcentages).",
      category: "paiement",
    },
    {
      question: "Comment utiliser une carte cadeau ?",
      answer:
        "Pour utiliser une carte cadeau, accédez à la section 'Cartes cadeaux' dans votre profil. Sélectionnez la carte que vous souhaitez utiliser, puis présentez-la lors du paiement en restaurant ou saisissez le code lors d'une commande en ligne.",
      category: "paiement",
    },
    {
      question: "Comment devenir un restaurant partenaire ?",
      answer:
        "Pour devenir un restaurant partenaire, visitez la section 'Devenir partenaire' sur notre site web ou contactez notre équipe commerciale. Nous vous guiderons à travers le processus d'intégration et vous fournirons tous les outils nécessaires pour gérer efficacement votre établissement sur notre plateforme.",
      category: "partenaire",
    },
    {
      question: "Comment modifier mes informations personnelles ?",
      answer:
        "Pour modifier vos informations personnelles, accédez à votre profil en appuyant sur l'icône de profil en haut à droite de l'écran. Sélectionnez 'Modifier le profil' et mettez à jour vos informations selon vos besoins.",
      category: "compte",
    },
    {
      question: "Comment contacter le service client ?",
      answer:
        "Vous pouvez contacter notre service client par téléphone au +33 1 23 45 67 89, par email à support@restopilote.com, ou en utilisant le formulaire de contact disponible sur notre site web dans la section 'Contact'.",
      category: "autre",
    },
  ]

  const filteredFaqItems = searchQuery
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqItems

  const categories = [
    { id: "all", name: "Toutes les questions" },
    { id: "compte", name: "Compte" },
    { id: "commande", name: "Commande" },
    { id: "paiement", name: "Paiement" },
    { id: "partenaire", name: "Partenaire" },
    { id: "autre", name: "Autre" },
  ]

  const [activeCategory, setActiveCategory] = useState("all")

  const categoryFilteredFaqItems =
    activeCategory === "all" ? filteredFaqItems : filteredFaqItems.filter((item) => item.category === activeCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" size="sm" className="mb-6">
        <Link href="/">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
      </Button>

      <h1 className="text-4xl font-bold mb-6">Foire aux questions</h1>

      <div className="max-w-3xl mx-auto">
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher une question..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {categoryFilteredFaqItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                Aucune question ne correspond à votre recherche. Essayez avec d'autres termes ou
                <Link href="/contact" className="text-primary hover:underline ml-1">
                  contactez-nous
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {categoryFilteredFaqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-medium py-4">{item.question}</AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Vous n'avez pas trouvé la réponse à votre question ?</p>
          <Button asChild>
            <Link href="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
