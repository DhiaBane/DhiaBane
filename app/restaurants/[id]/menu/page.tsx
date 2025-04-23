"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StarIcon, MapPinIcon, ClockIcon, PhoneIcon, ArrowLeftIcon, ShoppingCartIcon, PlusIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { GuestModeNotice } from "@/components/restaurant/guest-mode-notice"

interface MenuPageProps {
  params: {
    id: string
  }
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export default function MenuPage({ params }: MenuPageProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("starters")
  const [cart, setCart] = useState<(MenuItem & { quantity: number })[]>([])
  const [isGuestMode] = useState(searchParams.get("mode") === "guest")

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
    isPartner: true,
  }

  const menuCategories = [
    { id: "starters", name: "Entrées" },
    { id: "mains", name: "Plats" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Boissons" },
  ]

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Soupe à l'oignon",
      description: "Soupe à l'oignon traditionnelle gratinée au fromage",
      price: 9.5,
      image: "/placeholder.svg?height=100&width=100&query=onion+soup",
      category: "starters",
    },
    {
      id: "2",
      name: "Salade de chèvre chaud",
      description: "Salade verte, toasts de chèvre chaud, noix et miel",
      price: 11.0,
      image: "/placeholder.svg?height=100&width=100&query=goat+cheese+salad",
      category: "starters",
    },
    {
      id: "3",
      name: "Steak frites",
      description: "Steak de bœuf grillé, frites maison et sauce au poivre",
      price: 18.5,
      image: "/placeholder.svg?height=100&width=100&query=steak+frites",
      category: "mains",
    },
    {
      id: "4",
      name: "Coq au vin",
      description: "Poulet mijoté au vin rouge avec champignons et lardons",
      price: 16.0,
      image: "/placeholder.svg?height=100&width=100&query=coq+au+vin",
      category: "mains",
    },
    {
      id: "5",
      name: "Crème brûlée",
      description: "Crème à la vanille caramélisée",
      price: 7.5,
      image: "/placeholder.svg?height=100&width=100&query=creme+brulee",
      category: "desserts",
    },
    {
      id: "6",
      name: "Tarte Tatin",
      description: "Tarte aux pommes caramélisées servie tiède avec crème fraîche",
      price: 8.0,
      image: "/placeholder.svg?height=100&width=100&query=tarte+tatin",
      category: "desserts",
    },
    {
      id: "7",
      name: "Vin rouge (verre)",
      description: "Bordeaux Supérieur",
      price: 6.5,
      image: "/placeholder.svg?height=100&width=100&query=red+wine",
      category: "drinks",
    },
    {
      id: "8",
      name: "Eau minérale",
      description: "Bouteille 75cl",
      price: 4.0,
      image: "/placeholder.svg?height=100&width=100&query=mineral+water",
      category: "drinks",
    },
  ]

  const filteredItems = menuItems.filter((item) => item.category === selectedCategory)

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })

    toast({
      title: "Ajouté au panier",
      description: `${item.name} a été ajouté à votre commande`,
    })
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    if (isGuestMode) {
      router.push(`/restaurants/${params.id}/checkout?mode=guest`)
    } else {
      router.push(`/restaurants/${params.id}/checkout`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isGuestMode && <GuestModeNotice />}

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
            className="w-full h-48 md:h-64 object-cover"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="w-full grid grid-cols-4">
                  {menuCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={selectedCategory} className="mt-6">
                  <div className="space-y-4">
                    {filteredItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-24 h-24 object-cover"
                            />
                            <div className="p-4 flex-1 flex flex-col">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{item.name}</h3>
                                <span className="font-bold">{item.price.toFixed(2)}€</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 flex-1">{item.description}</p>
                              <div className="flex justify-end mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8"
                                  onClick={() => handleAddToCart(item)}
                                >
                                  <PlusIcon className="h-4 w-4 mr-1" />
                                  Ajouter
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Votre commande</span>
                <Badge variant="outline">{getTotalItems()} articles</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-6">
                  <ShoppingCartIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-2" />
                  <p className="text-muted-foreground">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.quantity}x</span> {item.name}
                      </div>
                      <span>{(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{getTotalPrice().toFixed(2)}€</span>
                    </div>
                  </div>

                  <Button className="w-full" disabled={cart.length === 0} onClick={handleCheckout}>
                    Commander
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
