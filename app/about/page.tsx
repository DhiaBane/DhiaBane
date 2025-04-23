import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeftIcon, UtensilsIcon, UsersIcon, StarIcon, ShieldIcon } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" size="sm" className="mb-6">
        <Link href="/">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
      </Button>

      <h1 className="text-4xl font-bold mb-6">À propos de RestoPilote</h1>

      <div className="prose max-w-none mb-12">
        <p className="text-xl text-muted-foreground mb-8">
          RestoPilote est une plateforme innovante qui révolutionne l'expérience de restauration, en connectant les
          clients aux restaurants et en simplifiant la gestion des établissements.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Notre mission</h2>
        <p>
          Chez RestoPilote, notre mission est de transformer l'expérience de restauration en la rendant plus fluide,
          plus agréable et plus personnalisée. Nous voulons aider les restaurants à se concentrer sur ce qu'ils font de
          mieux - créer des expériences culinaires exceptionnelles - tout en leur fournissant les outils nécessaires
          pour gérer efficacement leur activité.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Notre histoire</h2>
        <p>
          Fondée en 2023, RestoPilote est née de la passion de ses fondateurs pour la gastronomie et la technologie.
          Après avoir constaté les défis auxquels sont confrontés les restaurateurs et les clients, nous avons décidé de
          créer une solution qui répond aux besoins des deux parties.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Nos valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <UtensilsIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Excellence culinaire</h3>
                  <p className="text-muted-foreground">
                    Nous valorisons la qualité et l'authenticité des expériences gastronomiques.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Communauté</h3>
                  <p className="text-muted-foreground">
                    Nous créons des liens entre les restaurants et leurs clients pour bâtir une communauté forte.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <StarIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    Nous repoussons constamment les limites pour améliorer l'expérience utilisateur.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShieldIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Confiance</h3>
                  <p className="text-muted-foreground">
                    Nous bâtissons des relations de confiance avec nos partenaires et utilisateurs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center py-12 bg-primary/5 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Rejoignez l'aventure RestoPilote</h2>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Que vous soyez un restaurant cherchant à améliorer votre gestion ou un client à la recherche d'expériences
          culinaires exceptionnelles, RestoPilote est fait pour vous.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/phone-login">Créer un compte</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/partners">Devenir partenaire</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
