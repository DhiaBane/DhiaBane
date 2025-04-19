"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

// Création du client Supabase avec les variables d'environnement
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function RestaurantPage() {
  // États pour le formulaire
  const [nom, setNom] = useState("")
  const [adresse, setAdresse] = useState("")
  const [telephone, setTelephone] = useState("")

  // États pour les données et le chargement
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debug, setDebug] = useState<any>({})

  // Charger les restaurants au lancement
  useEffect(() => {
    // Informations de débogage
    setDebug({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 10)}...`
        : "Non définie",
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 5)}...`
        : "Non définie",
    })

    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.from("restaurants").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setRestaurants(data || [])
    } catch (err: any) {
      console.error("Erreur lors du chargement des restaurants:", err)
      setError(`Erreur de chargement: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!nom || !adresse || !telephone) return

    setLoading(true)
    setError(null)

    try {
      // Récupérer l'ID de la première entreprise (obligatoire pour la table restaurants)
      const { data: companies, error: companiesError } = await supabase.from("companies").select("id").limit(1)

      if (companiesError) throw companiesError

      if (!companies || companies.length === 0) {
        throw new Error("Aucune entreprise trouvée. Veuillez d'abord créer une entreprise.")
      }

      // Insérer le restaurant avec les noms de colonnes corrects
      const { error } = await supabase.from("restaurants").insert({
        name: nom, // Nom de colonne correct: "name" au lieu de "nom"
        address: adresse, // Nom de colonne correct: "address" au lieu de "adresse"
        phone: telephone, // Nom de colonne correct: "phone" au lieu de "telephone"
        company_id: companies[0].id, // Champ obligatoire
        status: "active", // Valeur par défaut pour le statut
      })

      if (error) throw error

      // Réinitialiser le formulaire et recharger les données
      setNom("")
      setAdresse("")
      setTelephone("")
      fetchRestaurants()
    } catch (err: any) {
      console.error("Erreur lors de l'ajout du restaurant:", err)
      setError(`Erreur d'ajout: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🍽️ Ajouter un restaurant</h1>

      {/* Informations de débogage */}
      <div className="bg-gray-100 p-3 rounded mb-4 text-xs">
        <p>
          <strong>URL Supabase:</strong> {debug.supabaseUrl}
        </p>
        <p>
          <strong>Clé API:</strong> {debug.supabaseKey}
        </p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">{error}</div>}

      <div className="space-y-3">
        <input
          className="w-full border rounded px-4 py-2"
          placeholder="Nom du restaurant"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          className="w-full border rounded px-4 py-2"
          placeholder="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
        />
        <input
          className="w-full border rounded px-4 py-2"
          placeholder="Téléphone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={!nom || !adresse || !telephone || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 w-full"
        >
          {loading ? "Ajout en cours..." : "Ajouter le restaurant"}
        </button>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-3">📋 Liste des restaurants</h2>

      {loading && restaurants.length === 0 ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {restaurants.map((resto) => (
            <div key={resto.id} className="border p-3 rounded shadow-sm">
              <p>
                <strong>🍴 {resto.name}</strong>
              </p>
              <p>📍 {resto.address}</p>
              <p>📞 {resto.phone}</p>
            </div>
          ))}
          {restaurants.length === 0 && <p>Aucun restaurant pour le moment.</p>}
        </div>
      )}
    </div>
  )
}
