import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ChefHat,
  ArrowRight,
  BarChart3,
  Calendar,
  CreditCard,
  Database,
  Layers,
  MessageSquare,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Fonctionnalités | RestauPilot",
  description: "Découvrez toutes les fonctionnalités de RestauPilot, la plateforme complète de gestion de restaurants.",
}

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            <span className="text-xl font-bold">RestauPilot</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="text-sm font-medium hover:underline">Se connecter</button>
            </Link>
            <Link href="/register">
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                S&apos;inscrire
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-muted/50 to-background py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Toutes les fonctionnalités dont votre restaurant a besoin
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                RestauPilot offre une suite complète d&apos;outils pour gérer efficacement tous les aspects de votre
                établissement, de la salle à la cuisine, en passant par les stocks et le marketing.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/demo">
                  <Button size="lg">
                    Essayer la démo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg">
                    Voir les tarifs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Gestion des opérations</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Simplifiez la gestion quotidienne de votre restaurant avec nos outils intuitifs et puissants.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    <CardTitle>Gestion des commandes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Prenez les commandes rapidement, transmettez-les instantanément à la cuisine et suivez leur
                    progression en temps réel. Gérez facilement les modifications et les demandes spéciales.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <CardTitle>Réservations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Système de réservation en ligne intégré avec confirmation automatique, rappels par SMS et gestion
                    optimisée des tables pour maximiser votre capacité d&apos;accueil.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <CardTitle>Gestion des stocks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Suivez vos niveaux de stock en temps réel, recevez des alertes lorsque les produits sont presque
                    épuisés et générez automatiquement des bons de commande pour vos fournisseurs.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle>Gestion du personnel</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Planifiez les horaires de travail, suivez les heures effectuées, gérez les congés et évaluez les
                    performances de votre équipe. Incluant un portail employé pour faciliter la communication.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    <CardTitle>Gestion des menus</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Créez et modifiez facilement vos menus, gérez les prix et les disponibilités, et proposez des menus
                    numériques accessibles via QR code pour une expérience client moderne.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <CardTitle>Paiements et facturation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Acceptez tous types de paiements, divisez facilement les additions, émettez des factures
                    professionnelles et gérez la comptabilité de votre établissement en toute simplicité.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Marketing et fidélisation</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Attirez de nouveaux clients et fidélisez votre clientèle existante avec nos outils marketing intégrés.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle>Programme de fidélité</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <CardDescription className="text-base">
                    Créez un programme de fidélité personnalisé avec points, récompenses et offres spéciales. Suivez
                    l&apos;engagement des clients et adaptez vos offres en fonction de leurs préférences.
                  </CardDescription>
                  <div className="flex justify-center">
                    <Image
                      src="/placeholder.svg?height=200&width=350"
                      width={350}
                      height={200}
                      alt="Programme de fidélité"
                      className="rounded-lg object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <CardTitle>Campagnes marketing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Envoyez des campagnes email et SMS ciblées, créez des offres promotionnelles et mesurez leur
                    efficacité. Segmentez votre audience pour des communications personnalisées.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <CardTitle>Avis et réputation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Collectez et gérez les avis clients, répondez facilement aux commentaires sur les plateformes
                    d&apos;avis et analysez votre réputation en ligne pour l&apos;améliorer continuellement.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Analyses et intelligence</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Prenez des décisions éclairées grâce à des données détaillées et des insights basés sur l&apos;IA.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex justify-center md:order-last">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  width={500}
                  height={400}
                  alt="Tableau de bord analytique"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Tableau de bord complet</h3>
                  <p className="text-muted-foreground">
                    Visualisez toutes vos données clés en un coup d&apos;œil : chiffre d&apos;affaires, nombre de
                    clients, taux d&apos;occupation, plats les plus vendus, et bien plus encore.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Prévisions basées sur l&apos;IA</h3>
                  <p className="text-muted-foreground">
                    Anticipez la demande, optimisez vos stocks et planifiez vos ressources grâce à nos algorithmes de
                    prévision avancés qui analysent vos données historiques et les tendances du marché.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Rapports personnalisables</h3>
                  <p className="text-muted-foreground">
                    Créez des rapports sur mesure pour analyser précisément les aspects qui vous intéressent.
                    Exportez-les facilement ou programmez leur envoi automatique à votre équipe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre restaurant ?</h2>
              <p className="text-lg mb-10 text-primary-foreground/90">
                Rejoignez les milliers de restaurateurs qui font confiance à RestauPilot pour optimiser leurs opérations
                et développer leur activité.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            <span className="font-semibold">RestauPilot</span>
            <span className="text-sm text-muted-foreground">© 2025</span>
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">
              À propos
            </Link>
            <Link href="/features" className="hover:underline">
              Fonctionnalités
            </Link>
            <Link href="/pricing" className="hover:underline">
              Tarifs
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/terms" className="hover:underline">
              Conditions
            </Link>
            <Link href="/privacy" className="hover:underline">
              Confidentialité
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
