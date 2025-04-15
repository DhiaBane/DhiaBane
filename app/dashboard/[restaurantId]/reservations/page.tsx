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
import { Calendar } from "@/components/ui/calendar"
import type { Reservation, Table } from "@/lib/mock-data"
import { reservationApi, tableApi } from "@/lib/api"

export default function ReservationsPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    date: "",
    time: "",
    partySize: "",
    tableId: "",
    status: "pending" as Reservation["status"],
    notes: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservationsData, tablesData] = await Promise.all([
          reservationApi.getAll(restaurantId),
          tableApi.getAll(restaurantId),
        ])

        setReservations(reservationsData)
        setTables(tablesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [restaurantId])

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setFormData({
      customerName: reservation.customerName,
      customerEmail: reservation.customerEmail,
      customerPhone: reservation.customerPhone,
      date: reservation.date,
      time: reservation.time,
      partySize: reservation.partySize.toString(),
      tableId: reservation.tableId || "",
      status: reservation.status,
      notes: reservation.notes || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleNewReservation = () => {
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`

    setFormData({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      date: formattedDate,
      time: "19:00",
      partySize: "2",
      tableId: "",
      status: "pending",
      notes: "",
    })
    setIsNewDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!selectedReservation) return

    try {
      const updatedReservation = await reservationApi.update(selectedReservation.id, {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        date: formData.date,
        time: formData.time,
        partySize: Number.parseInt(formData.partySize),
        tableId: formData.tableId || undefined,
        status: formData.status,
        notes: formData.notes || undefined,
      })

      if (updatedReservation) {
        setReservations(
          reservations.map((reservation) =>
            reservation.id === selectedReservation.id
              ? {
                  ...reservation,
                  customerName: formData.customerName,
                  customerEmail: formData.customerEmail,
                  customerPhone: formData.customerPhone,
                  date: formData.date,
                  time: formData.time,
                  partySize: Number.parseInt(formData.partySize),
                  tableId: formData.tableId || undefined,
                  status: formData.status,
                  notes: formData.notes || undefined,
                }
              : reservation,
          ),
        )
      }

      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating reservation:", error)
    }
  }

  const handleSaveNew = async () => {
    try {
      const newReservation = await reservationApi.create({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        date: formData.date,
        time: formData.time,
        partySize: Number.parseInt(formData.partySize),
        tableId: formData.tableId || undefined,
        status: formData.status,
        notes: formData.notes || undefined,
        restaurantId,
      })

      setReservations([...reservations, newReservation])
      setIsNewDialogOpen(false)
    } catch (error) {
      console.error("Error creating reservation:", error)
    }
  }

  const handleStatusChange = async (reservationId: string, newStatus: Reservation["status"]) => {
    try {
      const updatedReservation = await reservationApi.update(reservationId, { status: newStatus })
      if (updatedReservation) {
        setReservations(
          reservations.map((reservation) =>
            reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation,
          ),
        )
      }
    } catch (error) {
      console.error("Error updating reservation status:", error)
    }
  }

  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmée</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">En attente</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Annulée</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Terminée</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  const getTableById = (id?: string) => {
    if (!id) return null
    return tables.find((table) => table.id === id)
  }

  const getReservationsForDate = (date: string) => {
    return reservations.filter((reservation) => reservation.date === date)
  }

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number)
    return new Date(year, month - 1, day).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const formatSelectedDate = (date: Date | undefined) => {
    if (!date) return ""
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des réservations</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des réservations</h1>
        <Button onClick={handleNewReservation}>Nouvelle réservation</Button>
      </div>

      <Tabs defaultValue="calendar" className="mt-6">
        <TabsList>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="list">Liste</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Calendrier</CardTitle>
                <CardDescription>Sélectionnez une date pour voir les réservations</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  Réservations du {selectedDate ? formatDate(formatSelectedDate(selectedDate)) : ""}
                </CardTitle>
                <CardDescription>
                  {getReservationsForDate(formatSelectedDate(selectedDate)).length} réservation(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getReservationsForDate(formatSelectedDate(selectedDate)).length === 0 ? (
                    <p className="text-center py-4 text-muted-foreground">Aucune réservation pour cette date</p>
                  ) : (
                    getReservationsForDate(formatSelectedDate(selectedDate))
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((reservation) => (
                        <div key={reservation.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <div className="font-medium">
                              {reservation.time} - {reservation.customerName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {reservation.partySize} personnes •
                              {reservation.tableId
                                ? ` Table ${getTableById(reservation.tableId)?.number || "?"} • `
                                : " "}
                              {getStatusBadge(reservation.status)}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleEditReservation(reservation)}>
                            Détails
                          </Button>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmées</TabsTrigger>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="cancelled">Annulées</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reservations.map((reservation) => (
                  <Card key={reservation.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{reservation.customerName}</CardTitle>
                        {getStatusBadge(reservation.status)}
                      </div>
                      <CardDescription>
                        {formatDate(reservation.date)} à {reservation.time}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground w-20">Personnes:</span>
                          <span className="text-sm">{reservation.partySize}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground w-20">Table:</span>
                          <span className="text-sm">
                            {reservation.tableId
                              ? `Table ${getTableById(reservation.tableId)?.number || "?"}`
                              : "Non assignée"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground w-20">Contact:</span>
                          <span className="text-sm">{reservation.customerPhone}</span>
                        </div>
                        {reservation.notes && (
                          <div className="flex items-start">
                            <span className="text-sm text-muted-foreground w-20">Notes:</span>
                            <span className="text-sm">{reservation.notes}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => handleEditReservation(reservation)}>
                        Modifier
                      </Button>
                      <Select
                        value={reservation.status}
                        onValueChange={(value) => handleStatusChange(reservation.id, value as Reservation["status"])}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Changer statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confirmée</SelectItem>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="cancelled">Annulée</SelectItem>
                          <SelectItem value="completed">Terminée</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {reservations.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Aucune réservation</p>
                </div>
              )}
            </TabsContent>

            {["confirmed", "pending", "cancelled", "completed"].map((status) => (
              <TabsContent key={status} value={status} className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {reservations
                    .filter((reservation) => reservation.status === status)
                    .map((reservation) => (
                      <Card key={reservation.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle>{reservation.customerName}</CardTitle>
                            {getStatusBadge(reservation.status)}
                          </div>
                          <CardDescription>
                            {formatDate(reservation.date)} à {reservation.time}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <span className="text-sm text-muted-foreground w-20">Personnes:</span>
                              <span className="text-sm">{reservation.partySize}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-muted-foreground w-20">Table:</span>
                              <span className="text-sm">
                                {reservation.tableId
                                  ? `Table ${getTableById(reservation.tableId)?.number || "?"}`
                                  : "Non assignée"}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-muted-foreground w-20">Contact:</span>
                              <span className="text-sm">{reservation.customerPhone}</span>
                            </div>
                            {reservation.notes && (
                              <div className="flex items-start">
                                <span className="text-sm text-muted-foreground w-20">Notes:</span>
                                <span className="text-sm">{reservation.notes}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm" onClick={() => handleEditReservation(reservation)}>
                            Modifier
                          </Button>
                          <Select
                            value={reservation.status}
                            onValueChange={(value) =>
                              handleStatusChange(reservation.id, value as Reservation["status"])
                            }
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Changer statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirmed">Confirmée</SelectItem>
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="cancelled">Annulée</SelectItem>
                              <SelectItem value="completed">Terminée</SelectItem>
                            </SelectContent>
                          </Select>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                {reservations.filter((reservation) => reservation.status === status).length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucune réservation avec ce statut</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Dialog pour modifier une réservation */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier la réservation</DialogTitle>
            <DialogDescription>Modifiez les informations de la réservation ici.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">
                Nom
              </Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerEmail" className="text-right">
                Email
              </Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerPhone" className="text-right">
                Téléphone
              </Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Heure
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="partySize" className="text-right">
                Personnes
              </Label>
              <Select
                value={formData.partySize}
                onValueChange={(value) => setFormData({ ...formData, partySize: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Nombre de personnes" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} {size > 1 ? "personnes" : "personne"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tableId" className="text-right">
                Table
              </Label>
              <Select value={formData.tableId} onValueChange={(value) => setFormData({ ...formData, tableId: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une table" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Non assignée</SelectItem>
                  {tables.map((table) => (
                    <SelectItem key={table.id} value={table.id}>
                      Table {table.number} ({table.capacity} pers.)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as Reservation["status"] })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmée</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                  <SelectItem value="completed">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="col-span-3"
              />
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

      {/* Dialog pour ajouter une nouvelle réservation */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvelle réservation</DialogTitle>
            <DialogDescription>Entrez les informations de la nouvelle réservation.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-customerName" className="text-right">
                Nom
              </Label>
              <Input
                id="new-customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-customerEmail" className="text-right">
                Email
              </Label>
              <Input
                id="new-customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-customerPhone" className="text-right">
                Téléphone
              </Label>
              <Input
                id="new-customerPhone"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-date" className="text-right">
                Date
              </Label>
              <Input
                id="new-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-time" className="text-right">
                Heure
              </Label>
              <Input
                id="new-time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-partySize" className="text-right">
                Personnes
              </Label>
              <Select
                value={formData.partySize}
                onValueChange={(value) => setFormData({ ...formData, partySize: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Nombre de personnes" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} {size > 1 ? "personnes" : "personne"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-tableId" className="text-right">
                Table
              </Label>
              <Select value={formData.tableId} onValueChange={(value) => setFormData({ ...formData, tableId: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une table" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Non assignée</SelectItem>
                  {tables.map((table) => (
                    <SelectItem key={table.id} value={table.id}>
                      Table {table.number} ({table.capacity} pers.)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-status" className="text-right">
                Statut
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as Reservation["status"] })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmée</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                  <SelectItem value="completed">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="new-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveNew}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
