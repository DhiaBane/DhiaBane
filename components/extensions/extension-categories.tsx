"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  CreditCard,
  Calendar,
  BarChart2,
  Utensils,
  Truck,
  Package,
  MessageSquare,
  Zap,
  Shield,
  Users,
  Globe,
  Tag,
  Percent,
} from "lucide-react"
import type { ExtensionCategory } from "@/types/extensions"

interface ExtensionCategoriesProps {
  activeCategory: ExtensionCategory
  onCategoryChange: (category: ExtensionCategory) => void
}

export function ExtensionCategories({ activeCategory, onCategoryChange }: ExtensionCategoriesProps) {
  const categories: { value: ExtensionCategory; label: string; icon: React.ReactNode }[] = [
    { value: "Tous", label: "Tous", icon: <Tag className="h-4 w-4 mr-1" /> },
    { value: "Commandes", label: "Commandes", icon: <ShoppingCart className="h-4 w-4 mr-1" /> },
    { value: "Paiement", label: "Paiement", icon: <CreditCard className="h-4 w-4 mr-1" /> },
    { value: "Réservations", label: "Réservations", icon: <Calendar className="h-4 w-4 mr-1" /> },
    { value: "Marketing", label: "Marketing", icon: <Percent className="h-4 w-4 mr-1" /> },
    { value: "Analytique", label: "Analytique", icon: <BarChart2 className="h-4 w-4 mr-1" /> },
    { value: "Menu", label: "Menu", icon: <Utensils className="h-4 w-4 mr-1" /> },
    { value: "Livraison", label: "Livraison", icon: <Truck className="h-4 w-4 mr-1" /> },
    { value: "Inventaire", label: "Inventaire", icon: <Package className="h-4 w-4 mr-1" /> },
    { value: "Communication", label: "Communication", icon: <MessageSquare className="h-4 w-4 mr-1" /> },
    { value: "Productivité", label: "Productivité", icon: <Zap className="h-4 w-4 mr-1" /> },
    { value: "Sécurité", label: "Sécurité", icon: <Shield className="h-4 w-4 mr-1" /> },
    { value: "Fidélité", label: "Fidélité", icon: <Users className="h-4 w-4 mr-1" /> },
    { value: "International", label: "International", icon: <Globe className="h-4 w-4 mr-1" /> },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={activeCategory === category.value ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.value)}
          className="flex items-center"
        >
          {category.icon}
          {category.label}
        </Button>
      ))}
    </div>
  )
}
