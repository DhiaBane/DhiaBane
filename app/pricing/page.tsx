import Link from "next/link"
import type { Metadata } from "next"
import { Check, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Tarifs | RestauPilot",
  description: "Plans et tarifs de RestauPilot",
}

export default function PricingPage() {
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
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Tarifs simples et transparents</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Choisissez le plan qui correspond le mieux aux besoins de votre établissement. Tous nos plans incluent
                une période d&apos;essai gratuite de 14 jours.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Plan Essentiel */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">Essentiel</CardTitle>
                  <CardDescription>Pour les petits établissements</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">29€</span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>1 établissement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Gestion des tables</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Gestion des menus</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Réservations de base</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Gestion des commandes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Support par email</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?plan=essential" className="w-full">
                    <Button className="w-full">Commencer l&apos;essai gratuit</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Plan Professionnel */}
              <Card className="flex flex-col border-primary">
                <CardHeader>
                  <div className="text-center mb-4 -mt-2">
                    <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">POPULAIRE</span>
                  </div>
                  <CardTitle className="text-xl">Professionnel</CardTitle>
                  <CardDescription>Pour les restaurants établis</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">79€</span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Jusqu&apos;à 3 établissements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Toutes les fonctionnalités Essentielles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Gestion des stocks avancée</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Programme de fidélité</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Analyses et rapports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Intégration de paiement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Support prioritaire</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?plan=professional" className="w-full">
                    <Button className="w-full">Commencer l&apos;essai gratuit</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Plan Entreprise */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">Entreprise</CardTitle>
                  <CardDescription>Pour les chaînes de restaurants</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">199€</span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Établissements illimités</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Toutes les fonctionnalités Professionnelles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Gestion multi-établissements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>API complète</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Intégrations personnalisées</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Analyses avancées avec IA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Gestionnaire de compte dédié</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?plan=enterprise" className="w-full">
                    <Button className="w-full">Commencer l&apos;essai gratuit</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Vous avez besoin d&apos;une solution sur mesure?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contactez notre équipe commerciale pour discuter de vos besoins spécifiques et obtenir une offre
                personnalisée.
              </p>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-12">Questions fréquentes</h2>
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold text-lg mb-2">Puis-je changer de plan à tout moment?</h3>
                <p className="text-muted-foreground">
                  Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les changements prennent effet
                  à la prochaine période de facturation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Comment fonctionne la période d&apos;essai?</h3>
                <p className="text-muted-foreground">
                  Tous nos plans incluent une période d&apos;essai gratuite de 14 jours. Aucune carte de crédit
                  n&apos;est requise pour commencer.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Y a-t-il des frais cachés?</h3>
                <p className="text-muted-foreground">
                  Non, nos tarifs sont transparents. Vous ne payez que pour le plan que vous choisissez, sans frais
                  supplémentaires.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Puis-je annuler à tout moment?</h3>
                <p className="text-muted-foreground">
                  Oui, vous pouvez annuler votre abonnement à tout moment. Votre accès restera actif jusqu&apos;à la fin
                  de la période de facturation en cours.
                </p>
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
