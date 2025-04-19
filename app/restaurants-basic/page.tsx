"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

// Connexion à Supabase via .env.local
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function RestaurantPage() {
  const [nom, setNom] = useState("")
  const [adresse, setAdresse] = useState("")
  const [telephone, setTelephone] = useState("")
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      const { data, error } = await supabase.from("restaurants").select("*")
      if (error) throw error
      setRestaurants(data || [])
    } catch (err: any) {
      console.error("Erreur lors du chargement des restaurants:", err)
      setError("Impossible de charger les restaurants: " + err.message)
    }
  }

  const ajouterRestaurant = async () => {
    if (!nom || !adresse || !telephone) return

    setLoading(true)
    setError(null)

    try {
      // Récupérer l'ID de la première entreprise (pour la démo)
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
      setError("Impossible d'ajouter le restaurant: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Ajouter un restaurant</h1>

      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="text"
        placeholder="Adresse"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="text"
        placeholder="Téléphone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <button
        onClick={ajouterRestaurant}
        disabled={!nom || !adresse || !telephone || loading}
        style={{
          background: !nom || !adresse || !telephone || loading ? "#93c5fd" : "#2563eb",
          color: "white",
          padding: 10,
          width: "100%",
          marginBottom: 10,
          borderRadius: 4,
          cursor: !nom || !adresse || !telephone || loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Ajout en cours..." : "Ajouter"}
      </button>

      {error && (
        <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: 10, borderRadius: 4, marginBottom: 20 }}>
          {error}
        </div>
      )}

      <h2 style={{ fontSize: 20, marginBottom: 10, marginTop: 20 }}>Restaurants</h2>
      {restaurants.length === 0 && <p>Aucun restaurant trouvé.</p>}
      {restaurants.map((resto) => (
        <div
          key={resto.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: 10,
            marginBottom: 10,
          }}
        >
          <strong>{resto.name}</strong>
          <div>{resto.address}</div>
          <div>{resto.phone}</div>
        </div>
      ))}
    </div>
  )
}
