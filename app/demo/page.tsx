import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BarChart3, Calendar, ChefHat, ClipboardList, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Démo | RestauPilot",
  description: "Découvrez les fonctionnalités de RestauPilot",
}

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            <span className="text-xl font-bold">RestauPilot</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Se connecter</Button>
            </Link>
            <Link href="/register">
              <Button>S&apos;inscrire</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-muted/50 to-background py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Découvrez RestauPilot</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Explorez notre plateforme complète de gestion de restaurants. Naviguez à travers les différentes
                fonctionnalités et découvrez comment RestauPilot peut transformer votre établissement.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="#features">
                  <Button size="lg" className="gap-2">
                    Explorer les fonctionnalités
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg">
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">Fonctionnalités principales</h2>

            <Tabs defaultValue="dashboard" className="mx-auto max-w-4xl">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
                <TabsTrigger value="tables">Tables</TabsTrigger>
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="reservations">Réservations</TabsTrigger>
                <TabsTrigger value="customers">Clients</TabsTrigger>
                <TabsTrigger value="analytics">Analyses</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Tableau de bord
                    </CardTitle>
                    <CardDescription>Vue d&apos;ensemble de votre restaurant en temps réel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                      <p className="text-muted-foreground">Aperçu du tableau de bord</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Suivez les performances de votre restaurant, les réservations du jour, les commandes en cours et
                      les statistiques clés en un coup d&apos;œil.
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="tables" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gestion des tables
                    </CardTitle>
                    <CardDescription>Organisation optimale de votre espace</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                      <p className="text-muted-foreground">Aperçu de la gestion des tables</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Gérez facilement la disposition de vos tables, leur statut en temps réel et optimisez le placement
                      des clients pour maximiser votre capacité.
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="menu" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5" />
                      Gestion du menu
                    </CardTitle>
                    <CardDescription>Créez et modifiez vos menus facilement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                      <p className="text-muted-foreground">Aperçu de la gestion du menu</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Créez des menus attrayants, gérez les catégories, les prix et les disponibilités. Mettez à jour
                      votre carte en temps réel et synchronisez-la avec votre menu digital.
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="reservations" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Réservations
                    </CardTitle>
                    <CardDescription>Gérez efficacement vos réservations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                      <p className="text-muted-foreground">Aperçu du système de réservations</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Acceptez les réservations en ligne, gérez votre calendrier, envoyez des confirmations automatiques
                      et optimisez l&apos;occupation de votre établissement.
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="customers" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gestion des clients
                    </CardTitle>
                    <CardDescription>Fidélisez votre clientèle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                      <p className="text-muted-foreground">Aperçu de la gestion des clients</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Créez une base de données clients, suivez leurs préférences, gérez un programme de fidélité et
                      lancez des campagnes marketing ciblées.
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Analyses et rapports
                    </CardTitle>
                    <CardDescription>Prenez des décisions basées sur les données</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                      <p className="text-muted-foreground">Aperçu des analyses et rapports</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Accédez à des rapports détaillés sur vos ventes, la fréquentation, les performances des plats et
                      bien plus. Utilisez l&apos;IA pour prédire les tendances futures.
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold">Prêt à transformer votre restaurant?</h2>
              <p className="mt-4 text-muted-foreground">
                Rejoignez des milliers de restaurateurs qui utilisent RestauPilot pour optimiser leur gestion
                quotidienne.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gap-2">
                    Commencer gratuitement
                    <ArrowRight className="h-4 w-4" />
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
