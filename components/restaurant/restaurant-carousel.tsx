"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, MapPinIcon } from "lucide-react"

interface Restaurant {
  id: string
  name: string
  image: string
  rating: number
  cuisine: string
  address: string
  isPartner: boolean
}

export function RestaurantCarousel() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simuler le chargement des données
    const fetchRestaurants = async () => {
      setIsLoading(true)
      try {
        // Dans une application réelle, ces données viendraient d'une API
        // Ici, nous simulons un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Uniquement les restaurants partenaires
        const featuredRestaurants: Restaurant[] = [
          {
            id: "1",
            name: "Le Bistrot Parisien",
            image: "/cozy-italian-corner.png",
            rating: 4.7,
            cuisine: "Française",
            address: "15 Rue de la Paix, Paris",
            isPartner: true,
          },
          {
            id: "2",
            name: "Sushi Sakura",
            image: "/bustling-sushi-bar.png",
            rating: 4.5,
            cuisine: "Japonaise",
            address: "8 Avenue des Champs-Élysées, Paris",
            isPartner: true,
          },
          {
            id: "4",
            name: "Le Petit Café",
            image: "/Parisian-Cafe-Scene.png",
            rating: 4.8,
            cuisine: "Café",
            address: "5 Rue de Rivoli, Paris",
            isPartner: true,
          },
          {
            id: "5",
            name: "Brasserie du Louvre",
            image: "/Parisian-Evening-Brasserie.png",
            rating: 4.6,
            cuisine: "Française",
            address: "10 Place du Louvre, Paris",
            isPartner: true,
          },
          {
            id: "7",
            name: "L'Atelier Gourmand",
            image: "/Parisian-Bistro-Evening.png",
            rating: 4.9,
            cuisine: "Gastronomique",
            address: "3 Rue du Faubourg Saint-Honoré, Paris",
            isPartner: true,
          },
        ]

        setRestaurants(featuredRestaurants)
      } catch (error) {
        console.error("Error fetching restaurants:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  // Effet pour l'auto-scroll
  useEffect(() => {
    if (!carouselRef.current || restaurants.length === 0) return

    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current

        // Si on est à la fin, revenir au début
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          // Sinon, continuer à scroller
          carouselRef.current.scrollTo({
            left: scrollLeft + 300,
            behavior: "smooth",
          })
        }
      }
    }, 5000)

    return () => clearInterval(scrollInterval)
  }, [restaurants])

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-shrink-0 w-[280px]">
            <Card className="overflow-hidden">
              <div className="h-40 bg-gray-200 animate-pulse" />
              <CardContent className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={carouselRef} className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x snap-mandatory">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="flex-shrink-0 w-[280px] snap-start">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md h-full">
              <div className="relative">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover"
                />
                {restaurant.isPartner && <Badge className="absolute top-2 right-2 bg-primary">Partenaire</Badge>}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{restaurant.name}</h3>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <MapPinIcon className="h-3 w-3 mr-1" />
                  <span>{restaurant.address}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  )
}
