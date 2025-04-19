"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Trash2, MapPin, Phone, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Restaurant {
  id: string
  name: string
  address: string
  phone: string | null
  created_at: string
}

export default function DeleteRestaurantsClient() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [envInfo, setEnvInfo] = useState({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 10)}...`
      : "Non définie",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 5)}...`
      : "Non définie",
  })

  // Créer directement le client Supabase (méthode alternative)
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  // Charger les restaurants au chargement de la page
  useEffect(() => {
    fetchRestaurants()
  }, [])

  // Fonction pour récupérer les restaurants
  const fetchRestaurants = async () => {
    setIsLoading(true)
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
    } catch (error: any) {
      console.error("Erreur lors du chargement des restaurants:", error)
      setNotification({
        type: "error",
        message: `Erreur lors du chargement: ${error.message || "Erreur inconnue"}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour supprimer un restaurant
  const deleteRestaurant = async (id: string) => {
    setIsDeleting(id)
    try {
      const { error } = await supabase.from("restaurants").delete().eq("id", id)

      if (error) throw error

      // Mettre à jour la liste des restaurants
      setRestaurants((prev) => prev.filter((restaurant) => restaurant.id !== id))

      setNotification({
        type: "success",
        message: "Restaurant supprimé avec succès",
      })

      // Effacer la notification après 3 secondes
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error)
      setNotification({
        type: "error",
        message: `Erreur lors de la suppression: ${error.message || "Erreur inconnue"}`,
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Test de suppression des restaurants (Client alternatif)</h1>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
        >
          Retour au tableau de bord
        </Link>
      </div>

      {/* Informations de débogage */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 text-sm">
        <h3 className="font-semibold mb-2">Informations de débogage</h3>
        <p>
          <strong>URL Supabase:</strong> {envInfo.url}
        </p>
        <p>
          <strong>Clé API:</strong> {envInfo.key}
        </p>
        <p className="mt-2 text-blue-600">
          <strong>Note:</strong> Ce composant utilise createClient() directement au lieu de getSupabaseBrowserClient()
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`mb-6 p-4 rounded-md flex items-center ${
            notification.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="h-5 w-5 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2" />
          )}
          {notification.message}
        </div>
      )}

      {/* Liste des restaurants */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des restaurants</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>Aucun restaurant trouvé.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
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
                <button
                  onClick={() => deleteRestaurant(restaurant.id)}
                  disabled={isDeleting === restaurant.id}
                  className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors"
                  aria-label="Supprimer le restaurant"
                >
                  {isDeleting === restaurant.id ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
