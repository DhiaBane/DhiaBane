import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Store, Users, Trash2, Wrench } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">RestauPilot</h1>
            <p className="text-xl md:text-2xl mb-8">La plateforme complète de gestion pour vos restaurants</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link href="/login">Se connecter</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                <Link href="/register">Créer un compte</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion d'entreprise</h3>
              <p className="text-gray-600">
                Gérez plusieurs entreprises et restaurants depuis une interface centralisée.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion de restaurants</h3>
              <p className="text-gray-600">Contrôlez vos menus, tables, commandes et réservations en temps réel.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion du personnel</h3>
              <p className="text-gray-600">Gérez votre équipe, les horaires et les performances de manière efficace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dev Section */}
      <section className="py-8 bg-gray-100 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Wrench className="h-5 w-5 mr-2" />
              Section Développement
            </h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/restaurants/delete-test"
                className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
              >
                <Trash2 className="h-5 w-5 mr-2 text-red-500" />
                <span>Tester Suppression Restaurant</span>
              </Link>
              <Link
                href="/test-supabase-direct"
                className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
              >
                <Trash2 className="h-5 w-5 mr-2 text-orange-500" />
                <span>Test Direct Supabase</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
              >
                <Store className="h-5 w-5 mr-2 text-blue-500" />
                <span>Accéder au tableau de bord</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à optimiser la gestion de vos restaurants ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de restaurateurs qui font confiance à RestauPilot pour leur gestion quotidienne.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
            <Link href="/register">
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-gray-300 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-white">RestauPilot</h2>
              <p className="text-sm">© 2025 RestauPilot. Tous droits réservés.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/login" className="hover:text-white">
                Se connecter
              </Link>
              <Link href="/register" className="hover:text-white">
                S'inscrire
              </Link>
              <Link href="/dashboard" className="hover:text-white">
                Tableau de bord
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
