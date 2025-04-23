import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarIcon, MapPinIcon } from "lucide-react"
import { AuthCheck } from "@/components/auth/auth-check"

interface Restaurant {
  id: string
  name: string
  image: string
  rating: number
  cuisine: string
  address: string
  distance: string
  isPartner: boolean
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} className="w-full h-48 object-cover" />
        {restaurant.isPartner && <Badge className="absolute top-2 right-2 bg-primary">Partenaire</Badge>}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{restaurant.name}</h3>
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <MapPinIcon className="h-3.5 w-3.5 mr-1" />
          <span>{restaurant.address}</span>
          <span className="mx-1">•</span>
          <span>{restaurant.distance}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <AuthCheck
          fallback={
            <Button asChild variant="outline" className="w-full">
              <Link href={`/restaurants/${restaurant.id}`}>Voir le menu</Link>
            </Button>
          }
        >
          <>
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/restaurants/${restaurant.id}`}>Voir le menu</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href={`/restaurants/${restaurant.id}/order`}>Commander</Link>
            </Button>
          </>
        </AuthCheck>
      </CardFooter>
    </Card>
  )
}
