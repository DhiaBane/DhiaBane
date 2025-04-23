import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StarIcon, MapPinIcon, ClockIcon, PhoneIcon, ArrowLeftIcon } from "lucide-react"
import { MenuViewer } from "@/components/restaurant/menu-viewer"
import { AuthCheck } from "@/components/auth/auth-check"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  // Dans une application réelle, ces données viendraient d'une API
  const restaurant = {
    id: params.id,
    name: "Le Bistrot Parisien",
    image: "/placeholder.svg?height=400&width=800&query=restaurant+interior",
    rating: 4.7,
    cuisine: "Française",
    address: "15 Rue de la Paix, Paris",
    phone: "+33 1 23 45 67 89",
    hours: "Lun-Dim: 11h00-23h00",
    description:
      "Un bistrot traditionnel français proposant des plats authentiques dans une ambiance chaleureuse et conviviale. Notre chef utilise des produits frais et locaux pour vous offrir une expérience gastronomique inoubliable.",
    isPartner: true,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href="/restaurants">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Retour aux restaurants
          </Link>
        </Button>

        <div className="relative rounded-lg overflow-hidden mb-6">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-64 md:h-80 object-cover"
          />
          {restaurant.isPartner && <Badge className="absolute top-4 right-4 bg-primary">Partenaire</Badge>}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="mr-2">
                {restaurant.cuisine}
              </Badge>
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{restaurant.rating}</span>
              </div>
            </div>
          </div>

          <AuthCheck
            fallback={
              <Button asChild>
                <Link href="/auth/phone-login">Créer un compte pour commander</Link>
              </Button>
            }
          >
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={`/restaurants/${restaurant.id}/reservation`}>Réserver</Link>
              </Button>
              <Button asChild>
                <Link href={`/restaurants/${restaurant.id}/order`}>Commander</Link>
              </Button>
            </div>
          </AuthCheck>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{restaurant.hours}</span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{restaurant.phone}</span>
            </div>
          </CardContent>
        </Card>

        <p className="text-muted-foreground mb-8">{restaurant.description}</p>
      </div>

      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="reviews">Avis</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="mt-6">
          <MenuViewer restaurantId={restaurant.id} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Les avis seront bientôt disponibles</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
