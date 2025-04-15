import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Définition des types pour les fonctionnalités
type FeatureStatus = "implemented" | "in-progress" | "not-implemented"

interface Feature {
  name: string
  status: FeatureStatus
  route?: string
}

// Liste des fonctionnalités
const features: Feature[] = [
  { name: "Tableau de bord", status: "implemented", route: "/dashboard/1" },
  { name: "Tables", status: "implemented", route: "/dashboard/1/tables" },
  { name: "Menu", status: "implemented", route: "/dashboard/1/menu" },
  { name: "Inventaire", status: "implemented", route: "/dashboard/1/inventory" },
  { name: "Réservations", status: "implemented", route: "/dashboard/1/reservations" },
  { name: "Clients", status: "implemented", route: "/dashboard/1/customers" },
  { name: "Fidélité", status: "implemented", route: "/dashboard/1/loyalty" },
  { name: "Paiements", status: "implemented", route: "/dashboard/1/payments" },
  { name: "Factures", status: "implemented", route: "/dashboard/1/invoices" },
  { name: "Analytiques", status: "implemented", route: "/dashboard/1/analytics" },
  { name: "Rapports", status: "implemented", route: "/dashboard/1/reports" },
  { name: "Fournisseurs", status: "implemented", route: "/dashboard/1/suppliers" },
  { name: "Formation", status: "implemented", route: "/dashboard/1/training" },
  { name: "Scripts", status: "implemented", route: "/dashboard/1/settings/scripts" },
  { name: "Feedback", status: "implemented", route: "/dashboard/1/feedback" },
  { name: "Menu Digital", status: "implemented", route: "/dashboard/1/digital-menu" },
  { name: "Commandes en ligne", status: "implemented", route: "/dashboard/1/online-orders" },
  { name: "Livraison", status: "implemented", route: "/dashboard/1/delivery" },
  { name: "Événements", status: "implemented", route: "/dashboard/1/events" },
  { name: "Personnel", status: "implemented", route: "/dashboard/1/staff" },
  { name: "IA Insights", status: "implemented", route: "/dashboard/1/ai-insights" },
  { name: "Qualité", status: "implemented", route: "/dashboard/1/quality" },
  { name: "Marketing", status: "implemented", route: "/dashboard/1/marketing" },
  { name: "Paie", status: "implemented", route: "/dashboard/1/payroll" },
  { name: "Gestion de chaîne", status: "implemented", route: "/dashboard/chain" },
  { name: "Planification", status: "implemented", route: "/dashboard/1/scheduling" },
  { name: "Comptabilité", status: "implemented", route: "/dashboard/1/accounting" },
  { name: "CRM Avancé", status: "implemented", route: "/dashboard/1/crm" },
  { name: "Photos", status: "implemented", route: "/dashboard/1/photos" },
  { name: "Gestion des allergènes", status: "implemented", route: "/dashboard/1/allergens" },
  { name: "Intégration POS", status: "implemented", route: "/dashboard/1/pos" },
  { name: "Gestion des recettes", status: "implemented", route: "/dashboard/1/recipes" },
  { name: "Contrôle des coûts", status: "implemented", route: "/dashboard/1/cost-control" },
  { name: "Maintenance", status: "implemented", route: "/dashboard/1/maintenance" },
  { name: "Gestion des déchets", status: "implemented", route: "/dashboard/1/waste-management" },
  { name: "Conformité", status: "implemented", route: "/dashboard/1/compliance" },
  { name: "Intégrations", status: "implemented", route: "/dashboard/1/integrations" },
  // Nouvelles fonctionnalités avancées
  { name: "Mode hors-ligne robuste", status: "implemented", route: "/dashboard/1/offline" },
  { name: "IA avancée", status: "implemented", route: "/dashboard/1/ai-advanced" },
  { name: "Expérience client augmentée", status: "implemented", route: "/dashboard/1/customer-experience" },
  { name: "Tableau multi-établissements", status: "implemented", route: "/dashboard/multi-locations" },
  { name: "Outils de durabilité", status: "implemented", route: "/dashboard/1/sustainability" },
  { name: "Marketplace d'extensions", status: "not-implemented" },
  { name: "Gestion avancée des fournisseurs", status: "not-implemented" },
  { name: "Formation interactive", status: "not-implemented" },
  { name: "Analyse prédictive financière", status: "not-implemented" },
  { name: "Conformité réglementaire auto", status: "not-implemented" },
]

export default function HomePage() {
  // Filtrer les fonctionnalités par statut
  const implementedFeatures = features.filter((feature) => feature.status === "implemented")
  const inProgressFeatures = features.filter((feature) => feature.status === "in-progress")
  const notImplementedFeatures = features.filter((feature) => feature.status === "not-implemented")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl">RestauPilot</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button>S'inscrire</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  RestauPilot - Plateforme de gestion de restaurants
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Une solution complète pour gérer tous les aspects de votre restaurant ou chaîne de restaurants.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo">
                  <Button size="lg">Essayer la démo</Button>
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

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fonctionnalités implémentées
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Découvrez toutes les fonctionnalités disponibles dans RestauPilot
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl">
                {implementedFeatures.map((feature) => (
                  <Link
                    key={feature.name}
                    href={feature.route || "#"}
                    className={`${!feature.route ? "pointer-events-none" : ""}`}
                  >
                    <Card className="h-full bg-green-500 hover:bg-green-600 transition-colors text-white">
                      <CardContent className="flex items-center justify-center p-6">
                        <p className="text-center font-medium">{feature.name}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fonctionnalités en développement
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Ces fonctionnalités seront bientôt disponibles
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl">
                {inProgressFeatures.map((feature) => (
                  <Card key={feature.name} className="h-full bg-yellow-500 text-white">
                    <CardContent className="flex items-center justify-center p-6">
                      <p className="text-center font-medium">{feature.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fonctionnalités planifiées
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Ces fonctionnalités sont prévues pour les prochaines versions
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl">
                {notImplementedFeatures.map((feature) => (
                  <Card key={feature.name} className="h-full bg-red-500 text-white">
                    <CardContent className="flex items-center justify-center p-6">
                      <p className="text-center font-medium">{feature.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
          <p className="text-sm text-gray-500">© 2025 RestauPilot. Tous droits réservés.</p>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/about" className="text-gray-500 hover:underline underline-offset-4">
              À propos
            </Link>
            <Link href="/features" className="text-gray-500 hover:underline underline-offset-4">
              Fonctionnalités
            </Link>
            <Link href="/pricing" className="text-gray-500 hover:underline underline-offset-4">
              Tarifs
            </Link>
            <Link href="/contact" className="text-gray-500 hover:underline underline-offset-4">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:underline underline-offset-4">
              Confidentialité
            </Link>
            <Link href="/terms" className="text-gray-500 hover:underline underline-offset-4">
              Conditions
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
