import Link from "next/link"
import type { Metadata } from "next"
import { ChefHat } from "lucide-react"

export const metadata: Metadata = {
  title: "Conditions d'Utilisation | RestauPilot",
  description: "Conditions d'utilisation de RestauPilot",
}

export default function TermsPage() {
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

      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Conditions d&apos;Utilisation</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg mb-6">Dernière mise à jour : 14 avril 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptation des conditions</h2>
            <p>
              En accédant ou en utilisant la plateforme RestauPilot, vous acceptez d&apos;être lié par ces Conditions
              d&apos;Utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser notre service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description du service</h2>
            <p>
              RestauPilot est une plateforme de gestion de restaurants qui offre divers outils pour la gestion des
              tables, des commandes, des menus, des stocks, du personnel, des paiements, et plus encore. Nous nous
              réservons le droit de modifier, suspendre ou interrompre tout aspect du service à tout moment.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Inscription et compte</h2>
            <p>
              Pour utiliser certaines fonctionnalités de RestauPilot, vous devez créer un compte. Vous êtes responsable
              de maintenir la confidentialité de vos informations de compte et de toutes les activités qui se produisent
              sous votre compte.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Abonnements et paiements</h2>
            <p>
              RestauPilot propose différentes formules d&apos;abonnement. En souscrivant à un abonnement, vous acceptez
              de payer les frais applicables. Les abonnements se renouvellent automatiquement sauf si vous les annulez
              avant la date de renouvellement.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Propriété intellectuelle</h2>
            <p>
              Tout le contenu disponible sur RestauPilot, y compris mais sans s&apos;y limiter, le texte, les
              graphiques, les logos, les icônes, les images, les clips audio, les téléchargements numériques et les
              compilations de données, est la propriété de RestauPilot ou de ses fournisseurs de contenu et est protégé
              par les lois sur la propriété intellectuelle.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Utilisation acceptable</h2>
            <p>Vous acceptez de ne pas utiliser RestauPilot pour :</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Violer toute loi applicable</li>
              <li>Enfreindre les droits de propriété intellectuelle</li>
              <li>Transmettre tout matériel illégal, menaçant, diffamatoire ou autrement répréhensible</li>
              <li>Interférer avec le fonctionnement normal de la plateforme</li>
              <li>Tenter d&apos;accéder sans autorisation à des parties de la plateforme</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation de responsabilité</h2>
            <p>
              RestauPilot et ses affiliés ne seront pas responsables des dommages indirects, accessoires, spéciaux,
              consécutifs ou punitifs, y compris la perte de profits, de données ou d&apos;utilisation, résultant de ou
              liés à l&apos;utilisation ou à l&apos;impossibilité d&apos;utiliser le service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Indemnisation</h2>
            <p>
              Vous acceptez d&apos;indemniser et de dégager de toute responsabilité RestauPilot et ses dirigeants,
              administrateurs, employés et agents contre toute réclamation, responsabilité, dommage, perte et dépense
              résultant de votre violation de ces Conditions d&apos;Utilisation.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modifications des conditions</h2>
            <p>
              Nous pouvons modifier ces Conditions d&apos;Utilisation à tout moment. Les modifications entreront en
              vigueur dès leur publication sur la plateforme. Votre utilisation continue de RestauPilot après la
              publication des modifications constitue votre acceptation des nouvelles conditions.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Loi applicable</h2>
            <p>
              Ces Conditions d&apos;Utilisation sont régies par les lois de la France, sans égard à ses principes de
              conflits de lois.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact</h2>
            <p>Si vous avez des questions concernant ces Conditions d&apos;Utilisation, veuillez nous contacter à :</p>
            <p className="mt-2">
              <strong>Email :</strong> legal@restaupilot.com
              <br />
              <strong>Adresse :</strong> 123 Avenue de la Gastronomie, 75001 Paris, France
            </p>
          </div>
        </div>
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
