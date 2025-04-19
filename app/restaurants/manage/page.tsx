"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface Restaurant {
  id: string
  name: string
  address: string
  phone: string | null
  created_at: string
}

export default function ManageRestaurantsPage() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = getSupabaseBrowserClient()

  // Charger les restaurants existants
  const fetchRestaurants = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("restaurants")
        .select("id, name, address, phone, created_at")
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setRestaurants(data || [])
    } catch (error: any) {
      console.error("Erreur lors du chargement des restaurants:", error.message)
      toast({
        title: "Erreur",
        description: "Impossible de charger les restaurants. " + error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Récupérer l'ID de la première entreprise (pour la démo)
      const { data: companies } = await supabase.from("companies").select("id").limit(1)

      if (!companies || companies.length === 0) {
        throw new Error("Aucune entreprise trouvée. Veuillez d'abord créer une entreprise.")
      }

      const companyId = companies[0].id

      // Insérer le nouveau restaurant
      const { data, error } = await supabase
        .from("restaurants")
        .insert({
          name,
          address,
          phone,
          company_id: companyId,
          status: "active",
        })
        .select()

      if (error) {
        throw error
      }

      toast({
        title: "Restaurant ajouté",
        description: `Le restaurant "${name}" a été ajouté avec succès.`,
      })

      // Réinitialiser le formulaire
      setName("")
      setAddress("")
      setPhone("")

      // Recharger la liste des restaurants
      fetchRestaurants()
    } catch (error: any) {
      console.error("Erreur lors de l'ajout du restaurant:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le restaurant. " + error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestion des Restaurants</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Formulaire d'ajout */}
        <Card>
          <CardHeader>
            <CardTitle>Ajouter un restaurant</CardTitle>
            <CardDescription>Remplissez le formulaire pour ajouter un nouveau restaurant</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du restaurant</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Le Bistrot Parisien"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 rue de Paris, 75001 Paris"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01 23 45 67 89"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ajout en cours...
                  </>
                ) : (
                  "Ajouter le restaurant"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Liste des restaurants */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Restaurants existants</h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : restaurants.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                Aucun restaurant trouvé. Ajoutez votre premier restaurant !
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id}>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{restaurant.address}</p>
                    {restaurant.phone && <p className="text-sm mt-1">📞 {restaurant.phone}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
