"use client"

import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, PlusCircle, Trash2, Edit, Copy, BarChart4 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

// Types pour les promotions
type PromotionType = "percentage" | "fixed" | "bogo" | "free_item" | "loyalty"
type PromotionStatus = "active" | "scheduled" | "expired" | "draft"

interface Promotion {
  id: string
  name: string
  description: string
  type: PromotionType
  value: number
  code?: string
  startDate: Date
  endDate: Date
  status: PromotionStatus
  conditions?: string
  applicableItems: "all" | "category" | "specific"
  categoryId?: string
  itemIds?: string[]
  minOrderValue?: number
  usageLimit?: number
  usageCount: number
  createdAt: Date
}

// Données mockées pour les promotions
const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    name: "Happy Hour -20%",
    description: "Réduction de 20% sur toutes les boissons entre 17h et 19h",
    type: "percentage",
    value: 20,
    code: "HAPPY20",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-06-30"),
    status: "active",
    conditions: "Valable uniquement entre 17h et 19h",
    applicableItems: "category",
    categoryId: "boissons",
    usageCount: 145,
    createdAt: new Date("2025-03-15"),
  },
  {
    id: "promo2",
    name: "Menu Déjeuner à 15€",
    description: "Menu complet entrée + plat + dessert pour 15€",
    type: "fixed",
    value: 15,
    startDate: new Date("2025-04-10"),
    endDate: new Date("2025-05-10"),
    status: "active",
    applicableItems: "specific",
    itemIds: ["menu-dejeuner"],
    usageCount: 78,
    createdAt: new Date("2025-04-05"),
  },
  {
    id: "promo3",
    name: "1 Dessert Offert",
    description: "Un dessert offert pour tout achat d'un menu",
    type: "free_item",
    value: 0,
    code: "DESSERT",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-31"),
    status: "scheduled",
    applicableItems: "category",
    categoryId: "desserts",
    minOrderValue: 25,
    usageCount: 0,
    createdAt: new Date("2025-04-10"),
  },
  {
    id: "promo4",
    name: "2 pour 1 sur les pizzas",
    description: "Achetez une pizza, la deuxième est offerte",
    type: "bogo",
    value: 100,
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-31"),
    status: "expired",
    applicableItems: "category",
    categoryId: "pizzas",
    usageCount: 210,
    createdAt: new Date("2025-02-15"),
  },
  {
    id: "promo5",
    name: "Points fidélité x2",
    description: "Points de fidélité doublés le week-end",
    type: "loyalty",
    value: 2,
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-12-31"),
    status: "active",
    conditions: "Valable uniquement les samedis et dimanches",
    applicableItems: "all",
    usageCount: 95,
    createdAt: new Date("2025-03-20"),
  },
]

// Composant pour afficher une carte de promotion
function PromotionCard({ promotion }: { promotion: Promotion }) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    scheduled: "bg-blue-100 text-blue-800",
    expired: "bg-gray-100 text-gray-800",
    draft: "bg-yellow-100 text-yellow-800",
  }

  const typeLabels = {
    percentage: `${promotion.value}% de réduction`,
    fixed: `Prix fixe de ${promotion.value}€`,
    bogo: "Achetez-en 1, obtenez-en 1",
    free_item: "Article gratuit",
    loyalty: `Points de fidélité x${promotion.value}`,
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{promotion.name}</CardTitle>
            <CardDescription className="mt-1">{promotion.description}</CardDescription>
          </div>
          <div className={cn("px-2 py-1 rounded-full text-xs font-medium", statusColors[promotion.status])}>
            {promotion.status === "active"
              ? "Actif"
              : promotion.status === "scheduled"
                ? "Planifié"
                : promotion.status === "expired"
                  ? "Expiré"
                  : "Brouillon"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">{typeLabels[promotion.type]}</span>
          </div>
          {promotion.code && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Code:</span>
              <span className="font-medium">{promotion.code}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Période:</span>
            <span className="font-medium">
              {format(promotion.startDate, "dd/MM/yyyy", { locale: fr })} -{" "}
              {format(promotion.endDate, "dd/MM/yyyy", { locale: fr })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Utilisations:</span>
            <span className="font-medium">{promotion.usageCount}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <BarChart4 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// Composant pour le formulaire de création de promotion
function CreatePromotionForm() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(new Date().setMonth(new Date().getMonth() + 1)))
  const [promotionType, setPromotionType] = useState<PromotionType>("percentage")

  return (
    <form className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nom de la promotion</Label>
          <Input id="name" placeholder="ex: Happy Hour -20%" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" placeholder="Décrivez votre promotion" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="type">Type de promotion</Label>
          <Select defaultValue="percentage" onValueChange={(value) => setPromotionType(value as PromotionType)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Pourcentage de réduction</SelectItem>
              <SelectItem value="fixed">Prix fixe</SelectItem>
              <SelectItem value="bogo">Achetez-en 1, obtenez-en 1</SelectItem>
              <SelectItem value="free_item">Article gratuit</SelectItem>
              <SelectItem value="loyalty">Multiplicateur de points fidélité</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="value">
            {promotionType === "percentage"
              ? "Pourcentage de réduction"
              : promotionType === "fixed"
                ? "Prix fixe (€)"
                : promotionType === "loyalty"
                  ? "Multiplicateur de points"
                  : "Valeur"}
          </Label>
          <Input
            id="value"
            type="number"
            placeholder={
              promotionType === "percentage"
                ? "ex: 20"
                : promotionType === "fixed"
                  ? "ex: 15"
                  : promotionType === "loyalty"
                    ? "ex: 2"
                    : "0"
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="code">Code promo (optionnel)</Label>
          <Input id="code" placeholder="ex: HAPPY20" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Date de début</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: fr }) : "Sélectionnez une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label>Date de fin</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP", { locale: fr }) : "Sélectionnez une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="applicableItems">Applicable à</Label>
          <Select defaultValue="all">
            <SelectTrigger id="applicableItems">
              <SelectValue placeholder="Sélectionnez une option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les articles</SelectItem>
              <SelectItem value="category">Une catégorie spécifique</SelectItem>
              <SelectItem value="specific">Des articles spécifiques</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="minOrderValue">Valeur minimale de commande (optionnel)</Label>
          <Input id="minOrderValue" type="number" placeholder="ex: 25" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="conditions">Conditions spéciales (optionnel)</Label>
          <Input id="conditions" placeholder="ex: Valable uniquement le week-end" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="active" />
          <Label htmlFor="active">Activer immédiatement</Label>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Créer la promotion</Button>
      </div>
    </form>
  )
}

export default function PromotionsPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Promotions et Offres Spéciales</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvelle Promotion
        </Button>
      </div>

      <Tabs defaultValue="active" className="mt-6">
        <TabsList>
          <TabsTrigger value="active">Actives</TabsTrigger>
          <TabsTrigger value="scheduled">Planifiées</TabsTrigger>
          <TabsTrigger value="expired">Expirées</TabsTrigger>
          <TabsTrigger value="create">Créer</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockPromotions
              .filter((promo) => promo.status === "active")
              .map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockPromotions
              .filter((promo) => promo.status === "scheduled")
              .map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="expired" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockPromotions
              .filter((promo) => promo.status === "expired")
              .map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle promotion</CardTitle>
              <CardDescription>
                Configurez les détails de votre promotion pour attirer plus de clients et augmenter vos ventes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreatePromotionForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
