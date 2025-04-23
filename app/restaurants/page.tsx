import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { RestaurantCard } from "@/components/restaurant/restaurant-card"
import { SearchIcon, FilterIcon, ArrowLeftIcon } from "lucide-react"

export default function RestaurantsPage() {
  // Dans une application réelle, ces données viendraient d'une API
  const restaurants = [
    {
      id: "1",
      name: "Le Bistrot Parisien",
      image: "/cozy-italian-corner.png",
      rating: 4.7,
      cuisine: "Française",
      address: "15 Rue de la Paix, Paris",
      distance: "0.5 km",
      isPartner: true,
    },
    {
      id: "2",
      name: "Sushi Sakura",
      image: "/bustling-sushi-bar.png",
      rating: 4.5,
      cuisine: "Japonaise",
      address: "8 Avenue des Champs-Élysées, Paris",
      distance: "0.8 km",
      isPartner: true,
    },
    {
      id: "3",
      name: "La Trattoria",
      image: "/cozy-italian-corner.png",
      rating: 4.3,
      cuisine: "Italienne",
      address: "22 Rue du Faubourg Saint-Antoine, Paris",
      distance: "1.2 km",
      isPartner: false,
    },
    {
      id: "4",
      name: "Le Petit Café",
      image: "/Parisian-Cafe-Scene.png",
      rating: 4.8,
      cuisine: "Café",
      address: "5 Rue de Rivoli, Paris",
      distance: "1.5 km",
      isPartner: true,
    },
    {
      id: "5",
      name: "Brasserie du Louvre",
      image: "/Parisian-Evening-Brasserie.png",
      rating: 4.6,
      cuisine: "Française",
      address: "10 Place du Louvre, Paris",
      distance: "2.0 km",
      isPartner: true,
    },
    {
      id: "6",
      name: "Le Comptoir",
      image: "/placeholder.svg?height=200&width=300&query=bistro+paris",
      rating: 4.4,
      cuisine: "Bistro",
      address: "30 Rue Saint-Germain, Paris",
      distance: "2.2 km",
      isPartner: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-6">Restaurants</h1>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un restaurant..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  )
}
