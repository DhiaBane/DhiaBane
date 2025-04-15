"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import type { MenuItem } from "@/lib/mock-data"
import { menuItemApi } from "@/lib/api"

export default function MenuPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: true,
    allergens: [] as string[],
  })

  const categories = ["Entrées", "Plats", "Desserts", "Boissons", "Accompagnements"]
  const allergenOptions = [
    "gluten",
    "lactose",
    "œufs",
    "fruits à coque",
    "poisson",
    "crustacés",
    "soja",
    "arachides",
    "céleri",
    "moutarde",
    "sésame",
    "sulfites",
  ]

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data = await menuItemApi.getAll(restaurantId)
        setMenuItems(data)
      } catch (error) {
        console.error("Error fetching menu items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [restaurantId])

  const handleEditItem = (item: MenuItem) => {
    setSelectedItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      available: item.available,
      allergens: [...item.allergens],
    })
    setIsEditDialogOpen(true)
  }

  const handleNewItem = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      available: true,
      allergens: [],
    })
    setIsNewDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!selectedItem) return

    try {
      const updatedItem = await menuItemApi.update(selectedItem.id, {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        available: formData.available,
        allergens: formData.allergens,
      })

      if (updatedItem) {
        setMenuItems(
          menuItems.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  name: formData.name,
                  description: formData.description,
                  price: Number.parseFloat(formData.price),
                  category: formData.category,
                  available: formData.available,
                  allergens: formData.allergens,
                }
              : item,
          ),
        )
      }

      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating menu item:", error)
    }
  }

  const handleSaveNew = async () => {
    try {
      const newItem = await menuItemApi.create({
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        available: formData.available,
        allergens: formData.allergens,
        image: "/placeholder.svg?height=200&width=300",
        restaurantId,
      })

      setMenuItems([...menuItems, newItem])
      setIsNewDialogOpen(false)
    } catch (error) {
      console.error("Error creating menu item:", error)
    }
  }

  const toggleItemAvailability = async (itemId: string, available: boolean) => {
    try {
      const updatedItem = await menuItemApi.update(itemId, { available })
      if (updatedItem) {
        setMenuItems(menuItems.map((item) => (item.id === itemId ? { ...item, available } : item)))
      }
    } catch (error) {
      console.error("Error updating item availability:", error)
    }
  }

  const handleAllergenToggle = (allergen: string) => {
    if (formData.allergens.includes(allergen)) {
      setFormData({
        ...formData,
        allergens: formData.allergens.filter((a) => a !== allergen),
      })
    } else {
      setFormData({
        ...formData,
        allergens: [...formData.allergens, allergen],
      })
    }
  }

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gestion du menu</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion du menu</h1>
        <Button onClick={handleNewItem}>Ajouter un article</Button>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{item.name}</CardTitle>
                    {item.available ? (
                      <Badge className="bg-green-500">Disponible</Badge>
                    ) : (
                      <Badge variant="outline">Indisponible</Badge>
                    )}
                  </div>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-20 overflow-hidden text-sm text-muted-foreground">{item.description}</div>
                  <div className="mt-2">
                    <p className="font-bold">{item.price.toFixed(2)} €</p>
                    {item.allergens.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.allergens.map((allergen) => (
                          <Badge key={allergen} variant="outline" className="text-xs">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditItem(item)}>
                    Modifier
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={item.available}
                      onCheckedChange={(checked) => toggleItemAvailability(item.id, checked)}
                    />
                    <Label>Disponible</Label>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{item.name}</CardTitle>
                        {item.available ? (
                          <Badge className="bg-green-500">Disponible</Badge>
                        ) : (
                          <Badge variant="outline">Indisponible</Badge>
                        )}
                      </div>
                      <CardDescription>{item.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 overflow-hidden text-sm text-muted-foreground">{item.description}</div>
                      <div className="mt-2">
                        <p className="font-bold">{item.price.toFixed(2)} €</p>
                        {item.allergens.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.allergens.map((allergen) => (
                              <Badge key={allergen} variant="outline" className="text-xs">
                                {allergen}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => handleEditItem(item)}>
                        Modifier
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={item.available}
                          onCheckedChange={(checked) => toggleItemAvailability(item.id, checked)}
                        />
                        <Label>Disponible</Label>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            {menuItems.filter((item) => item.category === category).length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Aucun article dans cette catégorie</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Dialog pour modifier un article */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier l'article</DialogTitle>
            <DialogDescription>Modifiez les informations de l'article ici.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Prix (€)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Catégorie
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Disponible</Label>
              <div className="col-span-3">
                <Switch
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label className="text-right pt-2">Allergènes</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {allergenOptions.map((allergen) => (
                  <Badge
                    key={allergen}
                    variant={formData.allergens.includes(allergen) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleAllergenToggle(allergen)}
                  >
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveEdit}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour ajouter un nouvel article */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel article</DialogTitle>
            <DialogDescription>Entrez les informations du nouvel article.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">
                Nom
              </Label>
              <Input
                id="new-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="new-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-price" className="text-right">
                Prix (€)
              </Label>
              <Input
                id="new-price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-category" className="text-right">
                Catégorie
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Disponible</Label>
              <div className="col-span-3">
                <Switch
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label className="text-right pt-2">Allergènes</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {allergenOptions.map((allergen) => (
                  <Badge
                    key={allergen}
                    variant={formData.allergens.includes(allergen) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleAllergenToggle(allergen)}
                  >
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveNew}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
