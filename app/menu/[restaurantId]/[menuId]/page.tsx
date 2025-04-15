"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"

// Types pour les menus numériques (identiques à ceux de digital-menu/page.tsx)
interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  allergens?: string[]
  dietary?: string[]
  isAvailable: boolean
  isPopular?: boolean
  isNew?: boolean
  categoryId: string
}

interface MenuCategory {
  id: string
  name: string
  description?: string
  order: number
  items: MenuItem[]
}

interface DigitalMenu {
  id: string
  restaurantId: string
  name: string
  description?: string
  isActive: boolean
  isDefault?: boolean
  categories: MenuCategory[]
  theme: "light" | "dark" | "custom"
  primaryColor?: string
  secondaryColor?: string
  fontFamily?: string
  showPrices: boolean
  showImages: boolean
  showAllergens: boolean
  showDietary: boolean
  qrCodeUrl?: string
  publicUrl?: string
  lastUpdated: string
}

// Données fictives pour les menus numériques (identiques à celles de digital-menu/page.tsx)
const mockMenus: DigitalMenu[] = [
  {
    id: "menu-001",
    restaurantId: "rest-001",
    name: "Menu Principal",
    description: "Notre menu complet avec tous nos plats",
    isActive: true,
    isDefault: true,
    categories: [
      {
        id: "cat-001",
        name: "Entrées",
        description: "Pour commencer votre repas",
        order: 1,
        items: [
          {
            id: "item-001",
            name: "Salade César",
            description: "Laitue romaine, parmesan, croûtons, sauce César maison",
            price: 9.5,
            image: "/placeholder.svg?height=120&width=200",
            allergens: ["gluten", "lait", "œufs"],
            dietary: ["végétarien"],
            isAvailable: true,
            isPopular: true,
            categoryId: "cat-001",
          },
          {
            id: "item-002",
            name: "Soupe à l'oignon",
            description: "Soupe à l'oignon gratinée au fromage",
            price: 8.0,
            allergens: ["gluten", "lait"],
            dietary: ["végétarien"],
            isAvailable: true,
            categoryId: "cat-001",
          },
          {
            id: "item-003",
            name: "Foie gras maison",
            description: "Foie gras mi-cuit, chutney de figues et pain toasté",
            price: 15.0,
            allergens: ["gluten"],
            isAvailable: true,
            categoryId: "cat-001",
          },
        ],
      },
      {
        id: "cat-002",
        name: "Plats",
        description: "Nos spécialités",
        order: 2,
        items: [
          {
            id: "item-004",
            name: "Entrecôte grillée",
            description: "Entrecôte de bœuf grillée, sauce au poivre, frites maison",
            price: 24.0,
            image: "/placeholder.svg?height=120&width=200",
            isAvailable: true,
            isPopular: true,
            categoryId: "cat-002",
          },
          {
            id: "item-005",
            name: "Filet de saumon",
            description: "Filet de saumon grillé, riz basmati et légumes de saison",
            price: 22.0,
            allergens: ["poisson"],
            isAvailable: true,
            categoryId: "cat-002",
          },
          {
            id: "item-006",
            name: "Risotto aux champignons",
            description: "Risotto crémeux aux champignons et parmesan",
            price: 18.0,
            allergens: ["lait"],
            dietary: ["végétarien"],
            isAvailable: true,
            categoryId: "cat-002",
          },
          {
            id: "item-007",
            name: "Magret de canard",
            description: "Magret de canard, sauce à l'orange, purée de patates douces",
            price: 26.0,
            isAvailable: false,
            categoryId: "cat-002",
          },
        ],
      },
      {
        id: "cat-003",
        name: "Desserts",
        order: 3,
        items: [
          {
            id: "item-008",
            name: "Crème brûlée",
            description: "Crème brûlée à la vanille",
            price: 7.5,
            allergens: ["lait", "œufs"],
            dietary: ["végétarien"],
            isAvailable: true,
            isPopular: true,
            categoryId: "cat-003",
          },
          {
            id: "item-009",
            name: "Tarte Tatin",
            description: "Tarte Tatin aux pommes et sa boule de glace vanille",
            price: 8.0,
            image: "/placeholder.svg?height=120&width=200",
            allergens: ["gluten", "lait", "œufs"],
            dietary: ["végétarien"],
            isAvailable: true,
            categoryId: "cat-003",
          },
          {
            id: "item-010",
            name: "Mousse au chocolat",
            description: "Mousse au chocolat noir intense",
            price: 7.0,
            allergens: ["lait", "œufs"],
            dietary: ["végétarien"],
            isAvailable: true,
            categoryId: "cat-003",
          },
        ],
      },
      {
        id: "cat-004",
        name: "Boissons",
        order: 4,
        items: [
          {
            id: "item-011",
            name: "Vin rouge (verre)",
            description: "Bordeaux Supérieur",
            price: 6.0,
            isAvailable: true,
            categoryId: "cat-004",
          },
          {
            id: "item-012",
            name: "Vin blanc (verre)",
            description: "Chablis",
            price: 6.0,
            isAvailable: true,
            categoryId: "cat-004",
          },
          {
            id: "item-013",
            name: "Eau minérale",
            description: "Bouteille 75cl",
            price: 4.0,
            isAvailable: true,
            categoryId: "cat-004",
          },
        ],
      },
    ],
    theme: "light",
    primaryColor: "#4a6da7",
    fontFamily: "Poppins",
    showPrices: true,
    showImages: true,
    showAllergens: true,
    showDietary: true,
    qrCodeUrl: "/placeholder.svg?height=200&width=200",
    publicUrl: "https://menu.example.com/rest-001/menu-001",
    lastUpdated: "2025-04-10T14:30:00Z",
  },
  {
    id: "menu-002",
    restaurantId: "rest-001",
    name: "Menu du Midi",
    description: "Formules du midi en semaine",
    isActive: true,
    categories: [
      {
        id: "cat-005",
        name: "Formules",
        order: 1,
        items: [
          {
            id: "item-014",
            name: "Formule Express",
            description: "Plat du jour + café",
            price: 15.0,
            isAvailable: true,
            categoryId: "cat-005",
          },
          {
            id: "item-015",
            name: "Formule Complète",
            description: "Entrée + plat ou plat + dessert",
            price: 19.0,
            isAvailable: true,
            isPopular: true,
            categoryId: "cat-005",
          },
          {
            id: "item-016",
            name: "Formule Gourmande",
            description: "Entrée + plat + dessert",
            price: 24.0,
            isAvailable: true,
            categoryId: "cat-005",
          },
        ],
      },
      {
        id: "cat-006",
        name: "Plats du jour",
        order: 2,
        items: [
          {
            id: "item-017",
            name: "Lundi: Blanquette de veau",
            description: "Blanquette de veau traditionnelle et riz pilaf",
            price: 16.0,
            isAvailable: true,
            categoryId: "cat-006",
          },
          {
            id: "item-018",
            name: "Mardi: Dos de cabillaud",
            description: "Dos de cabillaud, sauce vierge et légumes de saison",
            price: 16.0,
            allergens: ["poisson"],
            isAvailable: true,
            categoryId: "cat-006",
          },
          {
            id: "item-019",
            name: "Mercredi: Suprême de volaille",
            description: "Suprême de volaille fermière, jus corsé et purée maison",
            price: 16.0,
            isAvailable: true,
            categoryId: "cat-006",
          },
          {
            id: "item-020",
            name: "Jeudi: Lasagnes végétariennes",
            description: "Lasagnes aux légumes grillés et ricotta",
            price: 16.0,
            allergens: ["gluten", "lait"],
            dietary: ["végétarien"],
            isAvailable: true,
            categoryId: "cat-006",
          },
          {
            id: "item-021",
            name: "Vendredi: Fish & Chips",
            description: "Fish & Chips, sauce tartare maison",
            price: 16.0,
            allergens: ["gluten", "poisson", "œufs"],
            isAvailable: true,
            categoryId: "cat-006",
          },
        ],
      },
    ],
    theme: "light",
    primaryColor: "#4a6da7",
    fontFamily: "Poppins",
    showPrices: true,
    showImages: false,
    showAllergens: true,
    showDietary: true,
    qrCodeUrl: "/placeholder.svg?height=200&width=200",
    publicUrl: "https://menu.example.com/rest-001/menu-002",
    lastUpdated: "2025-04-08T10:15:00Z",
  },
  {
    id: "menu-003",
    restaurantId: "rest-001",
    name: "Carte des Vins",
    description: "Notre sélection de vins",
    isActive: false,
    categories: [
      {
        id: "cat-007",
        name: "Vins Rouges",
        order: 1,
        items: [
          {
            id: "item-022",
            name: "Bordeaux - Château Margaux 2018",
            description: "Grand cru classé, arômes de fruits noirs et d'épices",
            price: 120.0,
            isAvailable: true,
            categoryId: "cat-007",
          },
          {
            id: "item-023",
            name: "Bourgogne - Gevrey-Chambertin 2019",
            description: "Arômes de fruits rouges, tanins soyeux",
            price: 85.0,
            isAvailable: true,
            categoryId: "cat-007",
          },
        ],
      },
      {
        id: "cat-008",
        name: "Vins Blancs",
        order: 2,
        items: [
          {
            id: "item-024",
            name: "Chablis Premier Cru 2020",
            description: "Minéral et frais, notes d'agrumes",
            price: 65.0,
            isAvailable: true,
            categoryId: "cat-008",
          },
          {
            id: "item-025",
            name: "Sancerre 2021",
            description: "Vif et fruité, arômes de fruits exotiques",
            price: 55.0,
            isAvailable: true,
            categoryId: "cat-008",
          },
        ],
      },
    ],
    theme: "dark",
    primaryColor: "#8c1c13",
    fontFamily: "Playfair Display",
    showPrices: true,
    showImages: false,
    showAllergens: false,
    showDietary: false,
    qrCodeUrl: "/placeholder.svg?height=200&width=200",
    publicUrl: "https://menu.example.com/rest-001/menu-003",
    lastUpdated: "2025-03-15T16:45:00Z",
  },
]

// Type pour les éléments du panier
interface CartItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
}

export default function MenuPage() {
  const params = useParams<{ restaurantId: string; menuId: string }>()
  const { restaurantId, menuId } = params

  const [menu, setMenu] = useState<DigitalMenu | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showCart, setShowCart] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState<string[]>([])
  const [selectedAllergensFilters, setSelectedAllergensFilters] = useState<string[]>([])

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // Simuler un appel API
        await new Promise((resolve) => setTimeout(resolve, 500))
        const foundMenu = mockMenus.find((m) => m.id === menuId && m.restaurantId === restaurantId)
        if (foundMenu) {
          setMenu(foundMenu)
          if (foundMenu.categories.length > 0) {
            setActiveCategory(foundMenu.categories[0].id)
          }
        }
      } catch (error) {
        console.error("Error fetching menu:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [restaurantId, menuId])

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.menuItemId === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.menuItemId === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [
          ...prevCart,
          {
            id: `cart-${Date.now()}`,
            menuItemId: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
          },
        ]
      }
    })
  }

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === cartItemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.id !== cartItemId)
      }
    })
  }

  const handleClearCart = () => {
    setCart([])
  }

  const toggleDietaryFilter = (filter: string) => {
    setSelectedDietaryFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const toggleAllergenFilter = (allergen: string) => {
    setSelectedAllergensFilters((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen],
    )
  }

  const filteredItems = (categoryId: string) => {
    if (!menu) return []

    const category = menu.categories.find((c) => c.id === categoryId)
    if (!category) return []

    return category.items.filter((item) => {
      // Filtrer par disponibilité
      if (!item.isAvailable) return false

      // Filtrer par recherche
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Filtrer par régime alimentaire
      const matchesDietary =
        selectedDietaryFilters.length === 0 ||
        (item.dietary && selectedDietaryFilters.every((filter) => item.dietary?.includes(filter)))

      // Filtrer par allergènes (exclure les plats contenant les allergènes sélectionnés)
      const matchesAllergens =
        selectedAllergensFilters.length === 0 ||
        !item.allergens ||
        !selectedAllergensFilters.some((allergen) => item.allergens?.includes(allergen))

      return matchesSearch && matchesDietary && matchesAllergens
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price)
  }

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement du menu...</p>
      </div>
    )
  }

  if (!menu) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Menu non trouvé</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: menu.theme === "light" ? "#ffffff" : "#1a1a1a",
        color: menu.theme === "light" ? "#1a1a1a" : "#ffffff",
        fontFamily: menu.fontFamily || "Poppins",
      }}
    >
      <header
        className="sticky top-0 z-10 p-4 shadow-sm"
        style={{
          backgroundColor: menu.theme === "light" ? "#ffffff" : "#1a1a1a",
          borderBottom: `1px solid ${menu.primaryColor}33`,
        }}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{menu.name}</h1>
              {menu.description && <p className="text-sm text-muted-foreground">{menu.description}</p>}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => setShowCart(!showCart)}
              style={{
                borderColor: menu.primaryColor,
                color: menu.primaryColor,
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalCartItems() > 0 && (
                <span
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: menu.primaryColor }}
                >
                  {getTotalCartItems()}
                </span>
              )}
            </Button>
          </div>

          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un plat..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  backgroundColor: menu.theme === "light" ? "#f9f9f9" : "#2a2a2a",
                  borderColor: menu.theme === "light" ? "#e5e5e5" : "#3a3a3a",
                }}
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {menu.showDietary && (
              <>
                <Badge
                  variant={selectedDietaryFilters.includes("végétarien") ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleDietaryFilter("végétarien")}
                  style={{
                    backgroundColor: selectedDietaryFilters.includes("végétarien") ? menu.primaryColor : "transparent",
                    borderColor: menu.primaryColor,
                    color: selectedDietaryFilters.includes("végétarien")
                      ? "#ffffff"
                      : menu.theme === "light"
                        ? "#1a1a1a"
                        : "#ffffff",
                  }}
                >
                  Végétarien
                </Badge>
                <Badge
                  variant={selectedDietaryFilters.includes("végétalien") ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleDietaryFilter("végétalien")}
                  style={{
                    backgroundColor: selectedDietaryFilters.includes("végétalien") ? menu.primaryColor : "transparent",
                    borderColor: menu.primaryColor,
                    color: selectedDietaryFilters.includes("végétalien")
                      ? "#ffffff"
                      : menu.theme === "light"
                        ? "#1a1a1a"
                        : "#ffffff",
                  }}
                >
                  Végétalien
                </Badge>
                <Badge
                  variant={selectedDietaryFilters.includes("sans gluten") ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleDietaryFilter("sans gluten")}
                  style={{
                    backgroundColor: selectedDietaryFilters.includes("sans gluten") ? menu.primaryColor : "transparent",
                    borderColor: menu.primaryColor,
                    color: selectedDietaryFilters.includes("sans gluten")
                      ? "#ffffff"
                      : menu.theme === "light"
                        ? "#1a1a1a"
                        : "#ffffff",
                  }}
                >
                  Sans gluten
                </Badge>
              </>
            )}
          </div>

          {menu.showAllergens && (
            <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
              <Badge
                variant={selectedAllergensFilters.includes("gluten") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleAllergenFilter("gluten")}
                style={{
                  backgroundColor: selectedAllergensFilters.includes("gluten") ? "#ef4444" : "transparent",
                  borderColor: "#ef4444",
                  color: selectedAllergensFilters.includes("gluten")
                    ? "#ffffff"
                    : menu.theme === "light"
                      ? "#1a1a1a"
                      : "#ffffff",
                }}
              >
                Sans gluten
              </Badge>
              <Badge
                variant={selectedAllergensFilters.includes("lait") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleAllergenFilter("lait")}
                style={{
                  backgroundColor: selectedAllergensFilters.includes("lait") ? "#ef4444" : "transparent",
                  borderColor: "#ef4444",
                  color: selectedAllergensFilters.includes("lait")
                    ? "#ffffff"
                    : menu.theme === "light"
                      ? "#1a1a1a"
                      : "#ffffff",
                }}
              >
                Sans lactose
              </Badge>
              <Badge
                variant={selectedAllergensFilters.includes("œufs") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleAllergenFilter("œufs")}
                style={{
                  backgroundColor: selectedAllergensFilters.includes("œufs") ? "#ef4444" : "transparent",
                  borderColor: "#ef4444",
                  color: selectedAllergensFilters.includes("œufs")
                    ? "#ffffff"
                    : menu.theme === "light"
                      ? "#1a1a1a"
                      : "#ffffff",
                }}
              >
                Sans œufs
              </Badge>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Tabs value={activeCategory || ""} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            {menu.categories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-4 py-2"
                  style={{
                    color: activeCategory === category.id ? menu.primaryColor : "inherit",
                    borderColor: menu.primaryColor,
                  }}
                >
                  {category.name}
                </TabsTrigger>
              ))}
          </TabsList>

          {menu.categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              {category.description && <p className="text-sm text-muted-foreground mb-4">{category.description}</p>}

              <div className="space-y-6">
                {filteredItems(category.id).length > 0 ? (
                  filteredItems(category.id).map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden"
                      style={{
                        backgroundColor: menu.theme === "light" ? "#ffffff" : "#2a2a2a",
                        borderColor: menu.theme === "light" ? "#e5e5e5" : "#3a3a3a",
                      }}
                    >
                      <CardContent className="p-0">
                        <div className="flex">
                          {menu.showImages && item.image && (
                            <div className="w-1/3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className={`p-4 ${menu.showImages && item.image ? "w-2/3" : "w-full"}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>

                                <div className="flex flex-wrap gap-1 mt-2">
                                  {item.isPopular && (
                                    <Badge
                                      style={{
                                        backgroundColor: "#eab308",
                                        color: "#ffffff",
                                      }}
                                    >
                                      Populaire
                                    </Badge>
                                  )}
                                  {item.isNew && (
                                    <Badge
                                      style={{
                                        backgroundColor: "#22c55e",
                                        color: "#ffffff",
                                      }}
                                    >
                                      Nouveau
                                    </Badge>
                                  )}
                                  {menu.showDietary && item.dietary && item.dietary.length > 0 && (
                                    <>
                                      {item.dietary.map((diet) => (
                                        <Badge
                                          key={diet}
                                          variant="outline"
                                          style={{
                                            borderColor: menu.primaryColor,
                                            color: menu.theme === "light" ? "#1a1a1a" : "#ffffff",
                                          }}
                                        >
                                          {diet}
                                        </Badge>
                                      ))}
                                    </>
                                  )}
                                </div>

                                {menu.showAllergens && item.allergens && item.allergens.length > 0 && (
                                  <div className="flex items-center gap-1 mt-2">
                                    <Info className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      Contient: {item.allergens.join(", ")}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                {menu.showPrices && <div className="font-medium">{formatPrice(item.price)}</div>}
                                <Button
                                  size="sm"
                                  onClick={() => handleAddToCart(item)}
                                  style={{
                                    backgroundColor: menu.primaryColor,
                                    color: "#ffffff",
                                  }}
                                >
                                  Ajouter
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucun plat ne correspond à vos critères.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setShowCart(false)}>
          <div
            className="w-full max-w-md h-full overflow-auto p-6"
            style={{
              backgroundColor: menu.theme === "light" ? "#ffffff" : "#1a1a1a",
              color: menu.theme === "light" ? "#1a1a1a" : "#ffffff",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Votre commande</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatPrice(item.price)} x {item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleAddToCart({ id: item.menuItemId } as MenuItem)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(getTotalCartPrice())}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full"
                    style={{
                      backgroundColor: menu.primaryColor,
                      color: "#ffffff",
                    }}
                  >
                    Commander
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleClearCart}>
                    Vider le panier
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Votre panier est vide</p>
                <Button variant="outline" className="mt-4" onClick={() => setShowCart(false)}>
                  Parcourir le menu
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
