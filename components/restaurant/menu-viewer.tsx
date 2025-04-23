"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusIcon } from "lucide-react"
import { AuthCheck } from "@/components/auth/auth-check"
import { useToast } from "@/hooks/use-toast"

interface MenuViewerProps {
  restaurantId: string
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export function MenuViewer({ restaurantId }: MenuViewerProps) {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("starters")

  // Dans une application réelle, ces données viendraient d'une API
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
    toast({
      title: "Ajouté au panier",
      description: `${item.name} a été ajouté à votre commande`,
    })
  }

  return (
    <div>
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
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
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-24 h-24 object-cover" />
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="font-bold">{item.price.toFixed(2)}€</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 flex-1">{item.description}</p>
                      <AuthCheck fallback={<div className="h-8"></div>}>
                        <div className="flex justify-end mt-2">
                          <Button size="sm" variant="outline" className="h-8" onClick={() => handleAddToCart(item)}>
                            <PlusIcon className="h-4 w-4 mr-1" />
                            Ajouter
                          </Button>
                        </div>
                      </AuthCheck>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
