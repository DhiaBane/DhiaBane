import type React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRightIcon,
  UtensilsIcon,
  MapPinIcon,
  StarIcon,
  TruckIcon,
  CalendarIcon,
  InfoIcon,
  PhoneIcon,
} from "lucide-react"
import { RestaurantCard } from "@/components/restaurant/restaurant-card"
import { PromotionCard } from "@/components/restaurant/promotion-card"
import { QrCodeScanner } from "@/components/restaurant/qr-code-scanner"
import { AuthCheck } from "@/components/auth/auth-check"
import { NavigationPad } from "@/components/ui/navigation-pad"
import { RestaurantCarousel } from "@/components/restaurant/restaurant-carousel"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-4">
      {/* Featured Restaurants Carousel */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Restaurants en vedette</h2>
        <RestaurantCarousel />
      </section>

      {/* Welcome Alert for New Users */}
      <Alert className="mb-8">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Bienvenue sur RestoPilote</AlertTitle>
        <AlertDescription>
          Découvrez les meilleurs restaurants, commandez en ligne ou scannez un QR code en restaurant pour commander
          directement à table.
        </AlertDescription>
      </Alert>

      {/* Hero Section */}
      <section className="py-6 md:py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Découvrez les meilleurs restaurants</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Commandez, réservez et profitez d'offres exclusives dans vos restaurants préférés
        </p>

        <AuthCheck
          fallback={
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/auth/phone-login">
                  <UtensilsIcon className="h-5 w-5" />
                  Créer un compte
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/restaurants">
                  <MapPinIcon className="h-5 w-5" />
                  Explorer les restaurants
                </Link>
              </Button>
            </div>
          }
        >
          <div className="flex flex-wrap justify-center gap-4">
            <QrCodeScanner />
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/restaurants">
                <MapPinIcon className="h-5 w-5" />
                Explorer les restaurants
              </Link>
            </Button>
          </div>
        </AuthCheck>
      </section>

      {/* Tabs Section */}
      <section className="py-6">
        <Tabs defaultValue="nearby" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="nearby" className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />À proximité
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center gap-2">
              <StarIcon className="h-4 w-4" />
              Populaires
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex items-center gap-2">
              <TruckIcon className="h-4 w-4" />
              Promotions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nearby" className="mt-6">
            <Suspense fallback={<RestaurantsSkeleton />}>
              <NearbyRestaurants />
            </Suspense>
          </TabsContent>

          <TabsContent value="popular" className="mt-6">
            <Suspense fallback={<RestaurantsSkeleton />}>
              <PopularRestaurants />
            </Suspense>
          </TabsContent>

          <TabsContent value="promotions" className="mt-6">
            <Suspense fallback={<PromotionsSkeleton />}>
              <RestaurantPromotions />
            </Suspense>
          </TabsContent>
        </Tabs>
      </section>

      {/* Order Options Section */}
      <section className="py-8 bg-primary/5 rounded-xl my-8">
        <h2 className="text-3xl font-bold text-center mb-8">Comment souhaitez-vous commander ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <OrderOptionCard
            icon={<TruckIcon className="h-10 w-10" />}
            title="Livraison"
            description="Faites-vous livrer vos plats préférés directement chez vous"
            href="/delivery"
          />
          <OrderOptionCard
            icon={<UtensilsIcon className="h-10 w-10" />}
            title="À emporter"
            description="Commandez et récupérez votre repas au restaurant"
            href="/takeaway"
          />
          <OrderOptionCard
            icon={<CalendarIcon className="h-10 w-10" />}
            title="Réservation"
            description="Réservez une table dans votre restaurant préféré"
            href="/reservation"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Besoin d'aide ?</h2>
            <p className="text-muted-foreground mb-6">
              Notre équipe est disponible pour répondre à toutes vos questions concernant les commandes, les
              réservations ou l'utilisation de l'application.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3 text-primary" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <InfoIcon className="h-5 w-5 mr-3 text-primary" />
                <Link href="/contact" className="text-primary hover:underline">
                  Contactez-nous
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-medium mb-4">Liens rapides</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/about" className="text-sm hover:underline">
                À propos
              </Link>
              <Link href="/faq" className="text-sm hover:underline">
                FAQ
              </Link>
              <Link href="/mentions" className="text-sm hover:underline">
                Mentions légales
              </Link>
              <Link href="/privacy" className="text-sm hover:underline">
                Confidentialité
              </Link>
              <Link href="/terms" className="text-sm hover:underline">
                Conditions d'utilisation
              </Link>
              <Link href="/partners" className="text-sm hover:underline">
                Devenir partenaire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Pad (Mobile) */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <NavigationPad />
      </div>
    </div>
  )
}

function NearbyRestaurants() {
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
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
      <div className="col-span-full text-center mt-4">
        <Button asChild variant="outline">
          <Link href="/restaurants" className="flex items-center gap-2">
            Voir plus de restaurants
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function PopularRestaurants() {
  // Dans une application réelle, ces données viendraient d'une API
  const restaurants = [
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
      image: "/parisian-cafe-corner.png",
      rating: 4.4,
      cuisine: "Bistro",
      address: "30 Rue Saint-Germain, Paris",
      distance: "2.2 km",
      isPartner: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
      <div className="col-span-full text-center mt-4">
        <Button asChild variant="outline">
          <Link href="/restaurants" className="flex items-center gap-2">
            Voir plus de restaurants
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function RestaurantPromotions() {
  // Dans une application réelle, ces données viendraient d'une API
  const promotions = [
    {
      id: "1",
      title: "Happy Hour - 2 cocktails pour le prix d'1",
      restaurant: "Le Bistrot Parisien",
      image: "/vibrant-cocktail-collection.png",
      validUntil: "2025-05-30",
      code: "HAPPY2FOR1",
    },
    {
      id: "2",
      title: "Menu déjeuner à -30%",
      restaurant: "Sushi Sakura",
      image: "/colorful-sushi-feast.png",
      validUntil: "2025-05-15",
      code: "LUNCH30",
    },
    {
      id: "3",
      title: "Pizza gratuite pour 2 achetées",
      restaurant: "La Trattoria",
      image: "/classic-pepperoni-pizza.png",
      validUntil: "2025-06-01",
      code: "PIZZA3FOR2",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promotions.map((promotion) => (
        <PromotionCard key={promotion.id} promotion={promotion} />
      ))}
      <div className="col-span-full text-center mt-4">
        <Button asChild variant="outline">
          <Link href="/promotions" className="flex items-center gap-2">
            Voir toutes les promotions
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function RestaurantsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <CardContent className="p-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function PromotionsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <CardContent className="p-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function OrderOptionCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <AuthCheck
          fallback={
            <Button asChild variant="outline" className="mt-auto">
              <Link href="/auth/phone-login">Créer un compte</Link>
            </Button>
          }
        >
          <Button asChild className="mt-auto">
            <Link href={href}>Commander</Link>
          </Button>
        </AuthCheck>
      </CardContent>
    </Card>
  )
}
