import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 lg:px-8">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Bienvenue sur RestoPilote</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Une plateforme intelligente pour restaurateurs, staff, clients, fournisseurs et logisticiens.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700"
          >
            Accéder au tableau de bord
          </Link>
          <Link
            href="/developpement"
            className="rounded-md bg-gray-800 px-6 py-3 text-lg font-semibold text-white hover:bg-gray-900"
          >
            🧠 Accès Développement
          </Link>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/diagnostic-results"
            className="rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white hover:bg-green-700"
          >
            🔍 Résultats du diagnostic
          </Link>
          <Link
            href="/statistiques"
            className="rounded-md bg-amber-600 px-6 py-3 text-lg font-semibold text-white hover:bg-amber-700"
          >
            📊 Statistiques avancées
          </Link>
          <Link
            href="/comptabilite"
            className="rounded-md bg-purple-600 px-6 py-3 text-lg font-semibold text-white hover:bg-purple-700"
          >
            💰 Comptabilité
          </Link>
        </div>
      </div>

      <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/restaurateur" className="block">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">🍽️ Application Restaurateur</h2>
            <p className="text-gray-600">Gestion intelligente des opérations, stocks, employés et comptabilité.</p>
          </div>
        </Link>

        <Link href="/staff" className="block">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">👨‍🍳 Application Staff</h2>
            <p className="text-gray-600">Planning, pointage, messagerie et notifications pour le personnel.</p>
          </div>
        </Link>

        <Link href="/client" className="block">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">📱 Application Client</h2>
            <p className="text-gray-600">Commande via QR code, paiement en ligne, fidélité, suivi live.</p>
          </div>
        </Link>

        <Link href="/fournisseur" className="block">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">🏭 Application Fournisseurs</h2>
            <p className="text-gray-600">Marketplace, gestion des commandes et catalogue de produits.</p>
          </div>
        </Link>

        <Link href="/logistique" className="block">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">🚚 Application Logistique</h2>
            <p className="text-gray-600">Suivi des livraisons, optimisation des tournées et traçabilité.</p>
          </div>
        </Link>

        <Link href="/marketing" className="block">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">🎯 Marketing et Fidélité</h2>
            <p className="text-gray-600">Campagnes, promotions et programme de fidélité clients.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
