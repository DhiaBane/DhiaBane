import Link from "next/link"
import type { Metadata } from "next"
import { ChefHat } from "lucide-react"

export const metadata: Metadata = {
  title: "Politique de Confidentialité | RestauPilot",
  description: "Politique de confidentialité de RestauPilot",
}

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg mb-6">Dernière mise à jour : 14 avril 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Chez RestauPilot, nous prenons la protection de vos données personnelles très au sérieux. Cette politique
              de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations
              lorsque vous utilisez notre plateforme de gestion de restaurants.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Informations que nous collectons</h2>
            <p>Nous collectons différents types d&apos;informations pour fournir et améliorer nos services :</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Informations de compte : nom, adresse e-mail, mot de passe, etc.</li>
              <li>Informations sur votre restaurant : nom, adresse, type de cuisine, etc.</li>
              <li>Données d&apos;utilisation : comment vous interagissez avec notre plateforme</li>
              <li>Informations sur les transactions : détails des paiements, historique des factures</li>
              <li>Données clients : informations sur vos clients (avec leur consentement)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Comment nous utilisons vos informations</h2>
            <p>Nous utilisons vos informations pour :</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Fournir, maintenir et améliorer nos services</li>
              <li>Traiter les transactions et envoyer les factures</li>
              <li>Communiquer avec vous concernant votre compte</li>
              <li>Vous envoyer des mises à jour et des informations marketing (avec votre consentement)</li>
              <li>Analyser l&apos;utilisation de notre plateforme pour l&apos;améliorer</li>
              <li>Détecter et prévenir les fraudes</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Partage des informations</h2>
            <p>Nous ne vendons pas vos données personnelles. Nous pouvons partager vos informations avec :</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Des prestataires de services qui nous aident à exploiter notre plateforme</li>
              <li>Des partenaires de paiement pour traiter les transactions</li>
              <li>Des autorités légales si la loi l&apos;exige</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données
              contre tout accès non autorisé, toute divulgation, altération ou destruction.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Vos droits</h2>
            <p>
              Selon votre lieu de résidence, vous pouvez avoir certains droits concernant vos données personnelles,
              notamment :
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données inexactes</li>
              <li>Supprimer vos données</li>
              <li>Limiter ou vous opposer au traitement de vos données</li>
              <li>Portabilité des données</li>
              <li>Retirer votre consentement</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de
              tout changement important par e-mail ou par une notification sur notre plateforme.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Nous contacter</h2>
            <p>Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à :</p>
            <p className="mt-2">
              <strong>Email :</strong> privacy@restaupilot.com
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
