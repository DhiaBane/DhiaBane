"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { PlusCircle, MapPin, Phone, Loader2 } from "lucide-react"

// Interface pour le type Restaurant
interface Restaurant {
  id: string
  name: string
  address: string
  phone: string | null
  created_at: string
}

export default function RestaurantsManager() {
  // États pour les champs du formulaire
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")

  // État pour la liste des restaurants
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  // États pour le chargement et les erreurs
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Utiliser le client Supabase configuré dans le projet
  const supabase = getSupabaseBrowserClient()

  // Charger les restaurants au chargement de la page
  useEffect(() => {
    fetchRestaurants()
  }, [])

  // Fonction pour récupérer les restaurants depuis Supabase
  const fetchRestaurants = async () => {
    setIsFetching(true)
    setError(null)

    try {
      // Vérifier si les variables d'environnement sont définies
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Les variables d'environnement Supabase ne sont pas configurées correctement")
      }

      const { data, error } = await supabase
        .from("restaurants")
        .select("id, name, address, phone, created_at")
        .order("created_at", { ascending: false })

      if (error) throw error

      setRestaurants(data || [])
    } catch (err: any) {
      console.error("Erreur lors du chargement des restaurants:", err)
      setError(`Erreur de chargement: ${err.message || "Erreur inconnue"}`)
    } finally {
      setIsFetching(false)
    }
  }

  // Fonction pour ajouter un restaurant
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !address || !phone) return

    setIsLoading(true)
    setError(null)

    try {
      // Récupérer l'ID de la première entreprise (pour la démo)
      const { data: companies, error: companiesError } = await supabase.from("companies").select("id").limit(1)

      if (companiesError) throw companiesError

      if (!companies || companies.length === 0) {
        throw new Error("Aucune entreprise trouvée. Veuillez d'abord créer une entreprise.")
      }

      // Ajouter le restaurant
      const { error } = await supabase.from("restaurants").insert({
        name,
        address,
        phone,
        company_id: companies[0].id,
        status: "active",
      })

      if (error) throw error

      // Réinitialiser le formulaire
      setName("")
      setAddress("")
      setPhone("")

      // Recharger la liste
      fetchRestaurants()
    } catch (err: any) {
      console.error("Erreur lors de l'ajout du restaurant:", err)
      setError(`Erreur d'ajout: ${err.message || "Erreur inconnue"}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Vérifier si tous les champs sont remplis
  const isFormValid = name.trim() !== "" && address.trim() !== "" && phone.trim() !== ""

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Gestion des Restaurants</h1>

      {/* Informations de débogage */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Informations de débogage</h3>
        <p className="text-sm">
          <strong>URL Supabase:</strong>{" "}
          {process.env.NEXT_PUBLIC_SUPABASE_URL
            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 15)}...`
            : "Non définie"}
        </p>
        <p className="text-sm">
          <strong>Clé API:</strong>{" "}
          {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 5)}...`
            : "Non définie"}
        </p>
      </div>

      {/* Carte pour le formulaire */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PlusCircle className="mr-2 h-5 w-5" />
          Ajouter un restaurant
        </h2>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du restaurant *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Le Bistrot Parisien"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse *
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="123 rue de Paris, 75001 Paris"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone *
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="01 23 45 67 89"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium flex items-center justify-center ${
              isFormValid && !isLoading ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Ajout en cours...
              </>
            ) : (
              "Ajouter le restaurant"
            )}
          </button>
        </form>
      </div>

      {/* Liste des restaurants */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Restaurants existants</h2>

        {isFetching ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>Aucun restaurant trouvé.</p>
            <p className="text-sm mt-2">Ajoutez votre premier restaurant en utilisant le formulaire ci-dessus.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-bold text-lg">{restaurant.name}</h3>
                <div className="flex items-start mt-2 text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center mt-2 text-gray-600">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{restaurant.phone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
