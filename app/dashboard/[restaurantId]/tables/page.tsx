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
import type { Table } from "@/lib/mock-data"
import { tableApi } from "@/lib/api"

export default function TablesPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    number: "",
    capacity: "",
    status: "available",
  })

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await tableApi.getAll(restaurantId)
        setTables(data)
      } catch (error) {
        console.error("Error fetching tables:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTables()
  }, [restaurantId])

  const handleStatusChange = async (tableId: string, newStatus: Table["status"]) => {
    try {
      const updatedTable = await tableApi.update(tableId, { status: newStatus })
      if (updatedTable) {
        setTables(tables.map((table) => (table.id === tableId ? { ...table, status: newStatus } : table)))
      }
    } catch (error) {
      console.error("Error updating table status:", error)
    }
  }

  const handleEditTable = (table: Table) => {
    setSelectedTable(table)
    setFormData({
      number: table.number.toString(),
      capacity: table.capacity.toString(),
      status: table.status,
    })
    setIsEditDialogOpen(true)
  }

  const handleNewTable = () => {
    setFormData({
      number: "",
      capacity: "",
      status: "available",
    })
    setIsNewDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!selectedTable) return

    try {
      const updatedTable = await tableApi.update(selectedTable.id, {
        number: Number.parseInt(formData.number),
        capacity: Number.parseInt(formData.capacity),
        status: formData.status as Table["status"],
      })

      if (updatedTable) {
        setTables(
          tables.map((table) =>
            table.id === selectedTable.id
              ? {
                  ...table,
                  number: Number.parseInt(formData.number),
                  capacity: Number.parseInt(formData.capacity),
                  status: formData.status as Table["status"],
                }
              : table,
          ),
        )
      }

      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating table:", error)
    }
  }

  const handleSaveNew = async () => {
    try {
      const newTable = await tableApi.create({
        number: Number.parseInt(formData.number),
        capacity: Number.parseInt(formData.capacity),
        status: formData.status as Table["status"],
        restaurantId,
      })

      setTables([...tables, newTable])
      setIsNewDialogOpen(false)
    } catch (error) {
      console.error("Error creating table:", error)
    }
  }

  const getStatusColor = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "occupied":
        return "bg-red-500"
      case "reserved":
        return "bg-blue-500"
      case "maintenance":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Disponible</Badge>
      case "occupied":
        return <Badge className="bg-red-500">Occupée</Badge>
      case "reserved":
        return <Badge className="bg-blue-500">Réservée</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des tables</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des tables</h1>
        <Button onClick={handleNewTable}>Ajouter une table</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {tables.map((table) => (
          <Card key={table.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Table {table.number}</CardTitle>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(table.status)}`}></div>
              </div>
              <CardDescription>Capacité: {table.capacity} personnes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span>Statut:</span>
                {getStatusBadge(table.status)}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleEditTable(table)}>
                Modifier
              </Button>
              <Select
                defaultValue={table.status}
                onValueChange={(value) => handleStatusChange(table.id, value as Table["status"])}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Changer statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="occupied">Occupée</SelectItem>
                  <SelectItem value="reserved">Réservée</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Dialog pour modifier une table */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la table</DialogTitle>
            <DialogDescription>Modifiez les informations de la table ici.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Numéro
              </Label>
              <Input
                id="number"
                type="number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacité
              </Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="occupied">Occupée</SelectItem>
                  <SelectItem value="reserved">Réservée</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
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

      {/* Dialog pour ajouter une nouvelle table */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle table</DialogTitle>
            <DialogDescription>Entrez les informations de la nouvelle table.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-number" className="text-right">
                Numéro
              </Label>
              <Input
                id="new-number"
                type="number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-capacity" className="text-right">
                Capacité
              </Label>
              <Input
                id="new-capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-status" className="text-right">
                Statut
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="occupied">Occupée</SelectItem>
                  <SelectItem value="reserved">Réservée</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
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
