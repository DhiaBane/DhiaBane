"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp, Edit, Eye, ImageIcon, Plus, QrCode, Smartphone, Trash } from "lucide-react"

// Types pour les menus numériques
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

// Données fictives pour les menus numériques
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

export default function DigitalMenuPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [menus, setMenus] = useState<DigitalMenu[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMenu, setSelectedMenu] = useState<DigitalMenu | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)
  const [isQrCodeDialogOpen, setIsQrCodeDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [isNewMenu, setIsNewMenu] = useState(false)
  const [isNewCategory, setIsNewCategory] = useState(false)
  const [isNewItem, setIsNewItem] = useState(false)
  const [menuFormData, setMenuFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    isDefault: false,
    theme: "light" as DigitalMenu["theme"],
    primaryColor: "#4a6da7",
    secondaryColor: "",
    fontFamily: "Poppins",
    showPrices: true,
    showImages: true,
    showAllergens: true,
    showDietary: true,
  })
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    order: 0,
  })
  const [itemFormData, setItemFormData] = useState({
    name: "",
    description: "",
    price: "",
    allergens: [] as string[],
    dietary: [] as string[],
    isAvailable: true,
    isPopular: false,
    isNew: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simuler un appel API
        await new Promise((resolve) => setTimeout(resolve, 500))
        setMenus(mockMenus.filter((menu) => menu.restaurantId === restaurantId))
      } catch (error) {
        console.error("Error fetching digital menus:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [restaurantId])

  const handleEditMenu = (menu: DigitalMenu) => {
    setSelectedMenu(menu)
    setMenuFormData({
      name: menu.name,
      description: menu.description || "",
      isActive: menu.isActive,
      isDefault: menu.isDefault || false,
      theme: menu.theme,
      primaryColor: menu.primaryColor || "#4a6da7",
      secondaryColor: menu.secondaryColor || "",
      fontFamily: menu.fontFamily || "Poppins",
      showPrices: menu.showPrices,
      showImages: menu.showImages,
      showAllergens: menu.showAllergens,
      showDietary: menu.showDietary,
    })
    setIsNewMenu(false)
    setIsMenuDialogOpen(true)
  }

  const handleNewMenu = () => {
    setMenuFormData({
      name: "",
      description: "",
      isActive: true,
      isDefault: false,
      theme: "light",
      primaryColor: "#4a6da7",
      secondaryColor: "",
      fontFamily: "Poppins",
      showPrices: true,
      showImages: true,
      showAllergens: true,
      showDietary: true,
    })
    setIsNewMenu(true)
    setIsMenuDialogOpen(true)
  }

  const handleSaveMenu = async () => {
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (isNewMenu) {
        const newMenu: DigitalMenu = {
          id: `menu-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
          restaurantId,
          name: menuFormData.name,
          description: menuFormData.description || undefined,
          isActive: menuFormData.isActive,
          isDefault: menuFormData.isDefault,
          categories: [],
          theme: menuFormData.theme,
          primaryColor: menuFormData.primaryColor,
          secondaryColor: menuFormData.secondaryColor || undefined,
          fontFamily: menuFormData.fontFamily,
          showPrices: menuFormData.showPrices,
          showImages: menuFormData.showImages,
          showAllergens: menuFormData.showAllergens,
          showDietary: menuFormData.showDietary,
          qrCodeUrl: "/placeholder.svg?height=200&width=200",
          publicUrl: `https://menu.example.com/${restaurantId}/menu-new`,
          lastUpdated: new Date().toISOString(),
        }

        setMenus([...menus, newMenu])
      } else if (selectedMenu) {
        const updatedMenu: DigitalMenu = {
          ...selectedMenu,
          name: menuFormData.name,
          description: menuFormData.description || undefined,
          isActive: menuFormData.isActive,
          isDefault: menuFormData.isDefault,
          theme: menuFormData.theme,
          primaryColor: menuFormData.primaryColor,
          secondaryColor: menuFormData.secondaryColor || undefined,
          fontFamily: menuFormData.fontFamily,
          showPrices: menuFormData.showPrices,
          showImages: menuFormData.showImages,
          showAllergens: menuFormData.showAllergens,
          showDietary: menuFormData.showDietary,
          lastUpdated: new Date().toISOString(),
        }

        // Si ce menu est défini comme par défaut, mettre à jour les autres menus
        if (menuFormData.isDefault) {
          setMenus(
            menus.map((menu) =>
              menu.id === selectedMenu.id
                ? updatedMenu
                : {
                    ...menu,
                    isDefault: false,
                  },
            ),
          )
        } else {
          setMenus(menus.map((menu) => (menu.id === selectedMenu.id ? updatedMenu : menu)))
        }
      }

      setIsMenuDialogOpen(false)
    } catch (error) {
      console.error("Error saving menu:", error)
    }
  }

  const handleEditCategory = (menu: DigitalMenu, category: MenuCategory) => {
    setSelectedMenu(menu)
    setSelectedCategory(category)
    setCategoryFormData({
      name: category.name,
      description: category.description || "",
      order: category.order,
    })
    setIsNewCategory(false)
    setIsCategoryDialogOpen(true)
  }

  const handleNewCategory = (menu: DigitalMenu) => {
    setSelectedMenu(menu)
    setCategoryFormData({
      name: "",
      description: "",
      order: menu.categories.length + 1,
    })
    setIsNewCategory(true)
    setIsCategoryDialogOpen(true)
  }

  const handleSaveCategory = async () => {
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (!selectedMenu) return

      if (isNewCategory) {
        const newCategory: MenuCategory = {
          id: `cat-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
          name: categoryFormData.name,
          description: categoryFormData.description || undefined,
          order: categoryFormData.order,
          items: [],
        }

        const updatedMenu: DigitalMenu = {
          ...selectedMenu,
          categories: [...selectedMenu.categories, newCategory],
          lastUpdated: new Date().toISOString(),
        }

        setMenus(menus.map((menu) => (menu.id === selectedMenu.id ? updatedMenu : menu)))
      } else if (selectedCategory) {
        const updatedCategory: MenuCategory = {
          ...selectedCategory,
          name: categoryFormData.name,
          description: categoryFormData.description || undefined,
          order: categoryFormData.order,
        }

        const updatedMenu: DigitalMenu = {
          ...selectedMenu,
          categories: selectedMenu.categories.map((category) =>
            category.id === selectedCategory.id ? updatedCategory : category,
          ),
          lastUpdated: new Date().toISOString(),
        }

        setMenus(menus.map((menu) => (menu.id === selectedMenu.id ? updatedMenu : menu)))
      }

      setIsCategoryDialogOpen(false)
    } catch (error) {
      console.error("Error saving category:", error)
    }
  }

  const handleEditItem = (menu: DigitalMenu, category: MenuCategory, item: MenuItem) => {
    setSelectedMenu(menu)
    setSelectedCategory(category)
    setSelectedItem(item)
    setItemFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      allergens: item.allergens || [],
      dietary: item.dietary || [],
      isAvailable: item.isAvailable,
      isPopular: item.isPopular || false,
      isNew: item.isNew || false,
    })
    setIsNewItem(false)
    setIsItemDialogOpen(true)
  }

  const handleNewItem = (menu: DigitalMenu, category: MenuCategory) => {
    setSelectedMenu(menu)
    setSelectedCategory(category)
    setItemFormData({
      name: "",
      description: "",
      price: "",
      allergens: [],
      dietary: [],
      isAvailable: true,
      isPopular: false,
      isNew: false,
    })
    setIsNewItem(true)
    setIsItemDialogOpen(true)
  }

  const handleSaveItem = async () => {
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (!selectedMenu || !selectedCategory) return

      if (isNewItem) {
        const newItem: MenuItem = {
          id: `item-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
          name: itemFormData.name,
          description: itemFormData.description,
          price: Number.parseFloat(itemFormData.price),
          allergens: itemFormData.allergens.length > 0 ? itemFormData.allergens : undefined,
          dietary: itemFormData.dietary.length > 0 ? itemFormData.dietary : undefined,
          isAvailable: itemFormData.isAvailable,
          isPopular: itemFormData.isPopular || undefined,
          isNew: itemFormData.isNew || undefined,
          categoryId: selectedCategory.id,
        }

        const updatedCategory: MenuCategory = {
          ...selectedCategory,
          items: [...selectedCategory.items, newItem],
        }

        const updatedMenu: DigitalMenu = {
          ...selectedMenu,
          categories: selectedMenu.categories.map((category) =>
            category.id === selectedCategory.id ? updatedCategory : category,
          ),
          lastUpdated: new Date().toISOString(),
        }

        setMenus(menus.map((menu) => (menu.id === selectedMenu.id ? updatedMenu : menu)))
      } else if (selectedItem) {
        const updatedItem: MenuItem = {
          ...selectedItem,
          name: itemFormData.name,
          description: itemFormData.description,
          price: Number.parseFloat(itemFormData.price),
          allergens: itemFormData.allergens.length > 0 ? itemFormData.allergens : undefined,
          dietary: itemFormData.dietary.length > 0 ? itemFormData.dietary : undefined,
          isAvailable: itemFormData.isAvailable,
          isPopular: itemFormData.isPopular || undefined,
          isNew: itemFormData.isNew || undefined,
        }

        const updatedCategory: MenuCategory = {
          ...selectedCategory,
          items: selectedCategory.items.map((item) => (item.id === selectedItem.id ? updatedItem : item)),
        }

        const updatedMenu: DigitalMenu = {
          ...selectedMenu,
          categories: selectedMenu.categories.map((category) =>
            category.id === selectedCategory.id ? updatedCategory : category,
          ),
          lastUpdated: new Date().toISOString(),
        }

        setMenus(menus.map((menu) => (menu.id === selectedMenu.id ? updatedMenu : menu)))
      }

      setIsItemDialogOpen(false)
    } catch (error) {
      console.error("Error saving item:", error)
    }
  }

  const handleShowQrCode = (menu: DigitalMenu) => {
    setSelectedMenu(menu)
    setIsQrCodeDialogOpen(true)
  }

  const handleShowPreview = (menu: DigitalMenu) => {
    setSelectedMenu(menu)
    setIsPreviewDialogOpen(true)
  }

  const handleMoveCategory = (menu: DigitalMenu, categoryId: string, direction: "up" | "down") => {
    const categoryIndex = menu.categories.findIndex((category) => category.id === categoryId)
    if (
      (direction === "up" && categoryIndex === 0) ||
      (direction === "down" && categoryIndex === menu.categories.length - 1)
    ) {
      return
    }

    const newCategories = [...menu.categories]
    const targetIndex = direction === "up" ? categoryIndex - 1 : categoryIndex + 1
    const categoryToMove = newCategories[categoryIndex]
    const categoryToSwap = newCategories[targetIndex]

    // Swap order values
    const tempOrder = categoryToMove.order
    categoryToMove.order = categoryToSwap.order
    categoryToSwap.order = tempOrder

    // Swap positions in array
    newCategories[categoryIndex] = categoryToSwap
    newCategories[targetIndex] = categoryToMove

    const updatedMenu: DigitalMenu = {
      ...menu,
      categories: newCategories,
      lastUpdated: new Date().toISOString(),
    }

    setMenus(menus.map((m) => (m.id === menu.id ? updatedMenu : m)))
  }

  const handleDeleteCategory = async (menu: DigitalMenu, categoryId: string) => {
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedMenu: DigitalMenu = {
        ...menu,
        categories: menu.categories.filter((category) => category.id !== categoryId),
        lastUpdated: new Date().toISOString(),
      }

      setMenus(menus.map((m) => (m.id === menu.id ? updatedMenu : m)))
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  const handleDeleteItem = async (menu: DigitalMenu, categoryId: string, itemId: string) => {
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const category = menu.categories.find((c) => c.id === categoryId)
      if (!category) return

      const updatedCategory: MenuCategory = {
        ...category,
        items: category.items.filter((item) => item.id !== itemId),
      }

      const updatedMenu: DigitalMenu = {
        ...menu,
        categories: menu.categories.map((c) => (c.id === categoryId ? updatedCategory : c)),
        lastUpdated: new Date().toISOString(),
      }

      setMenus(menus.map((m) => (m.id === menu.id ? updatedMenu : m)))
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  const handleToggleItemAvailability = async (menu: DigitalMenu, categoryId: string, itemId: string) => {
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const category = menu.categories.find((c) => c.id === categoryId)
      if (!category) return

      const item = category.items.find((i) => i.id === itemId)
      if (!item) return

      const updatedItem: MenuItem = {
        ...item,
        isAvailable: !item.isAvailable,
      }

      const updatedCategory: MenuCategory = {
        ...category,
        items: category.items.map((i) => (i.id === itemId ? updatedItem : i)),
      }

      const updatedMenu: DigitalMenu = {
        ...menu,
        categories: menu.categories.map((c) => (c.id === categoryId ? updatedCategory : c)),
        lastUpdated: new Date().toISOString(),
      }

      setMenus(menus.map((m) => (m.id === menu.id ? updatedMenu : m)))
    } catch (error) {
      console.error("Error toggling item availability:", error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Menus numériques</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Menus numériques</h1>
        <Button onClick={handleNewMenu}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau menu
        </Button>
      </div>

      <div className="grid gap-6 mt-6">
        {menus.map((menu) => (
          <Card key={menu.id} className={menu.isActive ? "" : "opacity-70"}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle>{menu.name}</CardTitle>
                  {menu.isDefault && <Badge className="bg-blue-500">Par défaut</Badge>}
                  {!menu.isActive && <Badge variant="outline">Inactif</Badge>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleShowQrCode(menu)}>
                    <QrCode className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleShowPreview(menu)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleEditMenu(menu)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                {menu.description}
                <div className="mt-1 text-xs">Dernière mise à jour: {formatDate(menu.lastUpdated)}</div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-muted/50">
                    {menu.theme === "light"
                      ? "Thème clair"
                      : menu.theme === "dark"
                        ? "Thème sombre"
                        : "Thème personnalisé"}
                  </Badge>
                  {menu.showPrices && (
                    <Badge variant="outline" className="bg-muted/50">
                      Prix affichés
                    </Badge>
                  )}
                  {menu.showImages && (
                    <Badge variant="outline" className="bg-muted/50">
                      Images affichées
                    </Badge>
                  )}
                  {menu.showAllergens && (
                    <Badge variant="outline" className="bg-muted/50">
                      Allergènes affichés
                    </Badge>
                  )}
                  {menu.showDietary && (
                    <Badge variant="outline" className="bg-muted/50">
                      Régimes alimentaires affichés
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Catégories</h3>
                    <Button variant="outline" size="sm" onClick={() => handleNewCategory(menu)}>
                      <Plus className="mr-2 h-3 w-3" />
                      Ajouter une catégorie
                    </Button>
                  </div>

                  {menu.categories.length > 0 ? (
                    <div className="space-y-4">
                      {menu.categories
                        .sort((a, b) => a.order - b.order)
                        .map((category) => (
                          <div key={category.id} className="border rounded-md">
                            <div className="flex items-center justify-between p-4 border-b">
                              <div>
                                <h4 className="font-medium">{category.name}</h4>
                                {category.description && (
                                  <p className="text-sm text-muted-foreground">{category.description}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleMoveCategory(menu, category.id, "up")}
                                    disabled={category.order === 1}
                                  >
                                    <ChevronUp className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleMoveCategory(menu, category.id, "down")}
                                    disabled={category.order === menu.categories.length}
                                  >
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleEditCategory(menu, category)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteCategory(menu, category.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="p-4">
                              {category.items.length > 0 ? (
                                <div className="space-y-2">
                                  {category.items.map((item) => (
                                    <div
                                      key={item.id}
                                      className={`flex items-center justify-between p-2 rounded-md ${
                                        !item.isAvailable ? "bg-muted/50" : "hover:bg-muted/30"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <Switch
                                          checked={item.isAvailable}
                                          onCheckedChange={() =>
                                            handleToggleItemAvailability(menu, category.id, item.id)
                                          }
                                        />
                                        <div>
                                          <div className="font-medium flex items-center gap-2">
                                            {item.name}
                                            {item.isPopular && (
                                              <Badge className="bg-yellow-500 text-xs">Populaire</Badge>
                                            )}
                                            {item.isNew && <Badge className="bg-green-500 text-xs">Nouveau</Badge>}
                                          </div>
                                          <div className="text-sm text-muted-foreground line-clamp-1">
                                            {item.description}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <div className="font-medium">{formatPrice(item.price)}</div>
                                        <div className="flex gap-1">
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => handleEditItem(menu, category, item)}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => handleDeleteItem(menu, category.id, item.id)}
                                          >
                                            <Trash className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4 text-muted-foreground">
                                  Aucun plat dans cette catégorie
                                </div>
                              )}
                              <div className="mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => handleNewItem(menu, category)}
                                >
                                  <Plus className="mr-2 h-3 w-3" />
                                  Ajouter un plat
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border rounded-md">
                      <p className="text-muted-foreground">Aucune catégorie dans ce menu</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => handleNewCategory(menu)}>
                        <Plus className="mr-2 h-3 w-3" />
                        Ajouter une catégorie
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {menus.length === 0 && (
          <div className="text-center py-10 border rounded-md">
            <p className="text-muted-foreground">Aucun menu numérique</p>
            <Button className="mt-4" onClick={handleNewMenu}>
              <Plus className="mr-2 h-4 w-4" />
              Créer votre premier menu
            </Button>
          </div>
        )}
      </div>

      {/* Dialog pour éditer/créer un menu */}
      <Dialog open={isMenuDialogOpen} onOpenChange={setIsMenuDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isNewMenu ? "Créer un nouveau menu" : "Modifier le menu"}</DialogTitle>
            <DialogDescription>
              {isNewMenu
                ? "Créez un nouveau menu numérique pour votre restaurant."
                : "Modifiez les informations et les paramètres de votre menu."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="menu-name" className="text-right">
                Nom
              </Label>
              <Input
                id="menu-name"
                value={menuFormData.name}
                onChange={(e) => setMenuFormData({ ...menuFormData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="menu-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="menu-description"
                value={menuFormData.description}
                onChange={(e) => setMenuFormData({ ...menuFormData, description: e.target.value })}
                className="col-span-3"
              />
            </div>

            <Separator />
            <h3 className="font-medium">Paramètres du menu</h3>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="menu-theme" className="text-right">
                Thème
              </Label>
              <Select
                value={menuFormData.theme}
                onValueChange={(value) => setMenuFormData({ ...menuFormData, theme: value as DigitalMenu["theme"] })}
              >
                <SelectTrigger id="menu-theme" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un thème" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Clair</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="custom">Personnalisé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="menu-primary-color" className="text-right">
                Couleur principale
              </Label>
              <div className="col-span-3 flex gap-2">
                <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: menuFormData.primaryColor }} />
                <Input
                  id="menu-primary-color"
                  type="text"
                  value={menuFormData.primaryColor}
                  onChange={(e) => setMenuFormData({ ...menuFormData, primaryColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="menu-font" className="text-right">
                Police
              </Label>
              <Select
                value={menuFormData.fontFamily}
                onValueChange={(value) => setMenuFormData({ ...menuFormData, fontFamily: value })}
              >
                <SelectTrigger id="menu-font" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une police" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Poppins">Poppins</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                  <SelectItem value="Montserrat">Montserrat</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />
            <h3 className="font-medium">Options d'affichage</h3>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-prices">Afficher les prix</Label>
                  <Switch
                    id="show-prices"
                    checked={menuFormData.showPrices}
                    onCheckedChange={(checked) => setMenuFormData({ ...menuFormData, showPrices: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-images">Afficher les images</Label>
                  <Switch
                    id="show-images"
                    checked={menuFormData.showImages}
                    onCheckedChange={(checked) => setMenuFormData({ ...menuFormData, showImages: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-allergens">Afficher les allergènes</Label>
                  <Switch
                    id="show-allergens"
                    checked={menuFormData.showAllergens}
                    onCheckedChange={(checked) => setMenuFormData({ ...menuFormData, showAllergens: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-dietary">Afficher les régimes alimentaires</Label>
                  <Switch
                    id="show-dietary"
                    checked={menuFormData.showDietary}
                    onCheckedChange={(checked) => setMenuFormData({ ...menuFormData, showDietary: checked })}
                  />
                </div>
              </div>
            </div>

            <Separator />
            <h3 className="font-medium">Statut</h3>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is-active">Menu actif</Label>
                  <Switch
                    id="is-active"
                    checked={menuFormData.isActive}
                    onCheckedChange={(checked) => setMenuFormData({ ...menuFormData, isActive: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is-default">Menu par défaut</Label>
                  <Switch
                    id="is-default"
                    checked={menuFormData.isDefault}
                    onCheckedChange={(checked) => setMenuFormData({ ...menuFormData, isDefault: checked })}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMenuDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveMenu}>{isNewMenu ? "Créer" : "Enregistrer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour éditer/créer une catégorie */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isNewCategory ? "Ajouter une catégorie" : "Modifier la catégorie"}</DialogTitle>
            <DialogDescription>
              {isNewCategory
                ? "Ajoutez une nouvelle catégorie à votre menu."
                : "Modifiez les informations de la catégorie."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-name" className="text-right">
                Nom
              </Label>
              <Input
                id="category-name"
                value={categoryFormData.name}
                onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="category-description"
                value={categoryFormData.description}
                onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-order" className="text-right">
                Ordre
              </Label>
              <Input
                id="category-order"
                type="number"
                value={categoryFormData.order}
                onChange={(e) =>
                  setCategoryFormData({ ...categoryFormData, order: Number.parseInt(e.target.value) || 0 })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveCategory}>{isNewCategory ? "Ajouter" : "Enregistrer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour éditer/créer un plat */}
      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isNewItem ? "Ajouter un plat" : "Modifier le plat"}</DialogTitle>
            <DialogDescription>
              {isNewItem ? "Ajoutez un nouveau plat à votre menu." : "Modifiez les informations du plat."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-name" className="text-right">
                Nom
              </Label>
              <Input
                id="item-name"
                value={itemFormData.name}
                onChange={(e) => setItemFormData({ ...itemFormData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="item-description"
                value={itemFormData.description}
                onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-price" className="text-right">
                Prix (€)
              </Label>
              <Input
                id="item-price"
                type="number"
                step="0.01"
                value={itemFormData.price}
                onChange={(e) => setItemFormData({ ...itemFormData, price: e.target.value })}
                className="col-span-3"
              />
            </div>

            <Separator />
            <h3 className="font-medium">Allergènes et régimes alimentaires</h3>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Allergènes</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {["gluten", "lait", "œufs", "poisson", "fruits à coque", "soja", "crustacés", "céleri"].map(
                  (allergen) => (
                    <Badge
                      key={allergen}
                      variant={itemFormData.allergens.includes(allergen) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        if (itemFormData.allergens.includes(allergen)) {
                          setItemFormData({
                            ...itemFormData,
                            allergens: itemFormData.allergens.filter((a) => a !== allergen),
                          })
                        } else {
                          setItemFormData({
                            ...itemFormData,
                            allergens: [...itemFormData.allergens, allergen],
                          })
                        }
                      }}
                    >
                      {allergen}
                    </Badge>
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Régimes</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {["végétarien", "végétalien", "sans gluten", "sans lactose", "halal", "casher"].map((diet) => (
                  <Badge
                    key={diet}
                    variant={itemFormData.dietary.includes(diet) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (itemFormData.dietary.includes(diet)) {
                        setItemFormData({
                          ...itemFormData,
                          dietary: itemFormData.dietary.filter((d) => d !== diet),
                        })
                      } else {
                        setItemFormData({
                          ...itemFormData,
                          dietary: [...itemFormData.dietary, diet],
                        })
                      }
                    }}
                  >
                    {diet}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />
            <h3 className="font-medium">Options</h3>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is-available">Disponible</Label>
                  <Switch
                    id="is-available"
                    checked={itemFormData.isAvailable}
                    onCheckedChange={(checked) => setItemFormData({ ...itemFormData, isAvailable: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is-popular">Populaire</Label>
                  <Switch
                    id="is-popular"
                    checked={itemFormData.isPopular}
                    onCheckedChange={(checked) => setItemFormData({ ...itemFormData, isPopular: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is-new">Nouveau</Label>
                  <Switch
                    id="is-new"
                    checked={itemFormData.isNew}
                    onCheckedChange={(checked) => setItemFormData({ ...itemFormData, isNew: checked })}
                  />
                </div>
              </div>
            </div>

            <Separator />
            <h3 className="font-medium">Image</h3>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Image du plat</Label>
              <div className="col-span-3">
                <Button variant="outline" className="w-full">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Ajouter une image
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsItemDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveItem}>{isNewItem ? "Ajouter" : "Enregistrer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour afficher le QR code */}
      <Dialog open={isQrCodeDialogOpen} onOpenChange={setIsQrCodeDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>QR Code du menu</DialogTitle>
            <DialogDescription>
              Scannez ce QR code pour accéder au menu numérique ou téléchargez-le pour l'imprimer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            {selectedMenu && (
              <>
                <div className="border p-4 rounded-md bg-white">
                  <img
                    src={selectedMenu.qrCodeUrl || "/placeholder.svg"}
                    alt="QR Code"
                    className="w-[200px] h-[200px]"
                  />
                </div>
                <p className="mt-4 text-sm text-center text-muted-foreground">URL: {selectedMenu.publicUrl}</p>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQrCodeDialogOpen(false)}>
              Fermer
            </Button>
            <Button>Télécharger</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour prévisualiser le menu */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prévisualisation du menu</DialogTitle>
            <DialogDescription>Voici comment votre menu apparaîtra sur les appareils mobiles.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            {selectedMenu && (
              <div
                className="border rounded-[32px] p-4 w-[375px] h-[667px] overflow-y-auto"
                style={{
                  backgroundColor: selectedMenu.theme === "light" ? "#ffffff" : "#1a1a1a",
                  color: selectedMenu.theme === "light" ? "#1a1a1a" : "#ffffff",
                  fontFamily: selectedMenu.fontFamily || "Poppins",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{selectedMenu.name}</h2>
                  <Smartphone className="h-5 w-5" />
                </div>
                {selectedMenu.description && (
                  <p className="text-sm mb-6 text-muted-foreground">{selectedMenu.description}</p>
                )}

                {selectedMenu.categories
                  .sort((a, b) => a.order - b.order)
                  .map((category) => (
                    <div key={category.id} className="mb-8">
                      <h3
                        className="text-lg font-semibold mb-2 pb-2 border-b"
                        style={{ borderColor: selectedMenu.primaryColor }}
                      >
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-sm mb-4 text-muted-foreground">{category.description}</p>
                      )}

                      <div className="space-y-4">
                        {category.items
                          .filter((item) => item.isAvailable)
                          .map((item) => (
                            <div key={item.id} className="flex gap-3">
                              {selectedMenu.showImages && item.image && (
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <div className="font-medium flex items-center gap-1">
                                    {item.name}
                                    {item.isPopular && (
                                      <span
                                        className="text-xs px-1 rounded"
                                        style={{ backgroundColor: selectedMenu.primaryColor, color: "#ffffff" }}
                                      >
                                        Populaire
                                      </span>
                                    )}
                                    {item.isNew && (
                                      <span
                                        className="text-xs px-1 rounded ml-1"
                                        style={{ backgroundColor: "#22c55e", color: "#ffffff" }}
                                      >
                                        Nouveau
                                      </span>
                                    )}
                                  </div>
                                  {selectedMenu.showPrices && (
                                    <div className="font-medium">{formatPrice(item.price)}</div>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                {selectedMenu.showAllergens && item.allergens && item.allergens.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {item.allergens.map((allergen) => (
                                      <span
                                        key={allergen}
                                        className="text-xs px-1 rounded bg-muted text-muted-foreground"
                                      >
                                        {allergen}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {selectedMenu.showDietary && item.dietary && item.dietary.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {item.dietary.map((diet) => (
                                      <span
                                        key={diet}
                                        className="text-xs px-1 rounded"
                                        style={{
                                          backgroundColor: selectedMenu.primaryColor + "33",
                                          color: selectedMenu.theme === "light" ? "#1a1a1a" : "#ffffff",
                                        }}
                                      >
                                        {diet}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
