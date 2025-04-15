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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { InventoryItem } from "@/lib/mock-data"
import { inventoryApi } from "@/lib/api"

export default function InventoryPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    minQuantity: "",
    price: "",
    supplier: "",
    category: "",
  })

  const categories = [
    "Viandes",
    "Poissons",
    "Légumes",
    "Fruits",
    "Produits laitiers",
    "Épicerie",
    "Boissons",
    "Pâtes",
    "Condiments",
  ]
  const units = ["kg", "g", "L", "ml", "unité", "bouteille", "boîte", "sachet", "portion"]

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const data = await inventoryApi.getAll(restaurantId)
        setInventoryItems(data)
      } catch (error) {
        console.error("Error fetching inventory items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInventoryItems()
  }, [restaurantId])

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item)
    setFormData({
      name: item.name,
      quantity: item.quantity.toString(),
      unit: item.unit,
      minQuantity: item.minQuantity.toString(),
      price: item.price.toString(),
      supplier: item.supplier,
      category: item.category,
    })
    setIsEditDialogOpen(true)
  }

  const handleNewItem = () => {
    setFormData({
      name: "",
      quantity: "",
      unit: "",
      minQuantity: "",
      price: "",
      supplier: "",
      category: "",
    })
    setIsNewDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!selectedItem) return

    try {
      const updatedItem = await inventoryApi.update(selectedItem.id, {
        name: formData.name,
        quantity: Number.parseFloat(formData.quantity),
        unit: formData.unit,
        minQuantity: Number.parseFloat(formData.minQuantity),
        price: Number.parseFloat(formData.price),
        supplier: formData.supplier,
        category: formData.category,
      })

      if (updatedItem) {
        setInventoryItems(
          inventoryItems.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  name: formData.name,
                  quantity: Number.parseFloat(formData.quantity),
                  unit: formData.unit,
                  minQuantity: Number.parseFloat(formData.minQuantity),
                  price: Number.parseFloat(formData.price),
                  supplier: formData.supplier,
                  category: formData.category,
                }
              : item,
          ),
        )
      }

      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating inventory item:", error)
    }
  }

  const handleSaveNew = async () => {
    try {
      const newItem = await inventoryApi.create({
        name: formData.name,
        quantity: Number.parseFloat(formData.quantity),
        unit: formData.unit,
        minQuantity: Number.parseFloat(formData.minQuantity),
        price: Number.parseFloat(formData.price),
        supplier: formData.supplier,
        category: formData.category,
        restaurantId,
      })

      setInventoryItems([...inventoryItems, newItem])
      setIsNewDialogOpen(false)
    } catch (error) {
      console.error("Error creating inventory item:", error)
    }
  }

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity <= 0) {
      return { label: "Rupture", color: "bg-red-500" }
    } else if (item.quantity < item.minQuantity) {
      return { label: "Faible", color: "bg-yellow-500" }
    } else {
      return { label: "OK", color: "bg-green-500" }
    }
  }

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gestion de l'inventaire</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion de l'inventaire</h1>
        <Button onClick={handleNewItem}>Ajouter un article</Button>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="low">Stock faible</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inventoryItems.map((item) => {
              const stockStatus = getStockStatus(item)
              return (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{item.name}</CardTitle>
                      <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
                    </div>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Quantité:</span>
                        <span className="font-medium">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Min. requis:</span>
                        <span>
                          {item.minQuantity} {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Prix:</span>
                        <span>
                          {item.price.toFixed(2)} € / {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fournisseur:</span>
                        <span>{item.supplier}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" onClick={() => handleEditItem(item)} className="w-full">
                      Modifier
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="low" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inventoryItems
              .filter((item) => item.quantity < item.minQuantity)
              .map((item) => {
                const stockStatus = getStockStatus(item)
                return (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{item.name}</CardTitle>
                        <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
                      </div>
                      <CardDescription>{item.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Quantité:</span>
                          <span className="font-medium">
                            {item.quantity} {item.unit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Min. requis:</span>
                          <span>
                            {item.minQuantity} {item.unit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Prix:</span>
                          <span>
                            {item.price.toFixed(2)} € / {item.unit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Fournisseur:</span>
                          <span>{item.supplier}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" onClick={() => handleEditItem(item)} className="w-full">
                        Modifier
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
          </div>
          {inventoryItems.filter((item) => item.quantity < item.minQuantity).length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Tous les stocks sont à un niveau correct</p>
            </div>
          )}
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inventoryItems
                .filter((item) => item.category === category)
                .map((item) => {
                  const stockStatus = getStockStatus(item)
                  return (
                    <Card key={item.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle>{item.name}</CardTitle>
                          <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
                        </div>
                        <CardDescription>{item.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Quantité:</span>
                            <span className="font-medium">
                              {item.quantity} {item.unit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Min. requis:</span>
                            <span>
                              {item.minQuantity} {item.unit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Prix:</span>
                            <span>
                              {item.price.toFixed(2)} € / {item.unit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Fournisseur:</span>
                            <span>{item.supplier}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" onClick={() => handleEditItem(item)} className="w-full">
                          Modifier
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
            </div>
            {inventoryItems.filter((item) => item.category === category).length === 0 && (
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
              <Label htmlFor="quantity" className="text-right">
                Quantité
              </Label>
              <Input
                id="quantity"
                type="number"
                step="0.01"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Unité
              </Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une unité" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minQuantity" className="text-right">
                Quantité min.
              </Label>
              <Input
                id="minQuantity"
                type="number"
                step="0.01"
                value={formData.minQuantity}
                onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
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
              <Label htmlFor="supplier" className="text-right">
                Fournisseur
              </Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
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
              <Label htmlFor="new-quantity" className="text-right">
                Quantité
              </Label>
              <Input
                id="new-quantity"
                type="number"
                step="0.01"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-unit" className="text-right">
                Unité
              </Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une unité" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-minQuantity" className="text-right">
                Quantité min.
              </Label>
              <Input
                id="new-minQuantity"
                type="number"
                step="0.01"
                value={formData.minQuantity}
                onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
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
              <Label htmlFor="new-supplier" className="text-right">
                Fournisseur
              </Label>
              <Input
                id="new-supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
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
