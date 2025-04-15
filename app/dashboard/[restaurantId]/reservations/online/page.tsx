"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { reservationApi } from "@/lib/api"
import type { Reservation } from "@/lib/mock-data"

export default function OnlineReservationsPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [onlineReservationsEnabled, setOnlineReservationsEnabled] = useState(true)
  const [maxDaysInAdvance, setMaxDaysInAdvance] = useState("30")
  const [maxPartySize, setMaxPartySize] = useState("20")
  const [timeSlotInterval, setTimeSlotInterval] = useState("30")
  const [autoConfirm, setAutoConfirm] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState(
    "Merci pour votre réservation ! Nous avons bien reçu votre demande et vous confirmons votre réservation. Nous avons hâte de vous accueillir.",
  )
  const [pendingMessage, setPendingMessage] = useState(
    "Merci pour votre réservation ! Nous avons bien reçu votre demande et nous la traiterons dans les plus brefs délais. Vous recevrez une confirmation par email.",
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Filtrer pour n'obtenir que les réservations en ligne
        const reservationsData = await reservationApi.getAll(restaurantId)
        // Dans une application réelle, vous auriez un champ pour identifier les réservations en ligne
        // Ici, nous simulons en prenant les réservations avec un email
        const onlineReservations = reservationsData.filter((r) => r.customerEmail)

        setReservations(onlineReservations)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [restaurantId])

  const handleSaveSettings = () => {
    // Dans une application réelle, vous enregistreriez ces paramètres via une API
    console.log("Saving online reservation settings:", {
      onlineReservationsEnabled,
      maxDaysInAdvance,
      maxPartySize,
      timeSlotInterval,
      autoConfirm,
      confirmationMessage,
      pendingMessage,
    })

    // Simuler un succès
    alert("Paramètres enregistrés avec succès")
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

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Réservations en ligne</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Réservations en ligne</h1>
      </div>

      <Tabs defaultValue="reservations" className="mt-6">
        <TabsList>
          <TabsTrigger value="reservations">Réservations</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
          <TabsTrigger value="widget">Widget</TabsTrigger>
        </TabsList>

        <TabsContent value="reservations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Réservations en ligne récentes</CardTitle>
              <CardDescription>
                Gérez les réservations effectuées via votre site web ou le widget de réservation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservations.length === 0 ? (
                  <p className="text-center py-10 text-muted-foreground">Aucune réservation en ligne pour le moment</p>
                ) : (
                  reservations.map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <div className="font-medium">{reservation.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {format(parseISO(reservation.date), "d MMMM yyyy", { locale: fr })} à {reservation.time} •
                          {reservation.partySize} personnes •{getStatusBadge(reservation.status)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {reservation.customerEmail} • {reservation.customerPhone}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
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
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des réservations en ligne</CardTitle>
              <CardDescription>Configurez les options pour les réservations en ligne</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Activer les réservations en ligne</h3>
                  <p className="text-sm text-muted-foreground">
                    Permettre aux clients de réserver en ligne via votre site web
                  </p>
                </div>
                <Switch checked={onlineReservationsEnabled} onCheckedChange={setOnlineReservationsEnabled} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="maxDaysInAdvance">Jours maximum à l'avance</Label>
                  <Select value={maxDaysInAdvance} onValueChange={setMaxDaysInAdvance}>
                    <SelectTrigger id="maxDaysInAdvance">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 jours</SelectItem>
                      <SelectItem value="14">14 jours</SelectItem>
                      <SelectItem value="30">30 jours</SelectItem>
                      <SelectItem value="60">60 jours</SelectItem>
                      <SelectItem value="90">90 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maxPartySize">Taille maximum du groupe</Label>
                  <Select value={maxPartySize} onValueChange={setMaxPartySize}>
                    <SelectTrigger id="maxPartySize">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 personnes</SelectItem>
                      <SelectItem value="15">15 personnes</SelectItem>
                      <SelectItem value="20">20 personnes</SelectItem>
                      <SelectItem value="30">30 personnes</SelectItem>
                      <SelectItem value="50">50 personnes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeSlotInterval">Intervalle des créneaux horaires</Label>
                  <Select value={timeSlotInterval} onValueChange={setTimeSlotInterval}>
                    <SelectTrigger id="timeSlotInterval">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 heure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="autoConfirm" checked={autoConfirm} onCheckedChange={setAutoConfirm} />
                  <Label htmlFor="autoConfirm">Confirmation automatique</Label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="confirmationMessage">Message de confirmation</Label>
                  <Textarea
                    id="confirmationMessage"
                    value={confirmationMessage}
                    onChange={(e) => setConfirmationMessage(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Ce message sera envoyé aux clients lorsque leur réservation est confirmée
                  </p>
                </div>

                <div>
                  <Label htmlFor="pendingMessage">Message d'attente</Label>
                  <Textarea
                    id="pendingMessage"
                    value={pendingMessage}
                    onChange={(e) => setPendingMessage(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Ce message sera envoyé aux clients lorsque leur réservation est en attente de confirmation
                  </p>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end">
              <Button onClick={handleSaveSettings}>Enregistrer les paramètres</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="widget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Widget de réservation</CardTitle>
              <CardDescription>Intégrez le widget de réservation sur votre site web</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Code d'intégration</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    {`<script src="https://restau-pilot.com/widget/${restaurantId}.js"></script>
<div id="restau-pilot-reservation-widget"></div>`}
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Copiez ce code et collez-le sur votre site web où vous souhaitez afficher le widget de réservation
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Aperçu du widget</h3>
                <div className="border rounded-md p-4 bg-card">
                  <div className="w-full max-w-md mx-auto">
                    <div className="text-xl font-bold mb-4">Réserver une table</div>
                    <div className="grid gap-4">
                      <div>
                        <Label>Date</Label>
                        <Input type="date" className="mt-1" />
                      </div>
                      <div>
                        <Label>Heure</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une heure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="18:00">18:00</SelectItem>
                            <SelectItem value="18:30">18:30</SelectItem>
                            <SelectItem value="19:00">19:00</SelectItem>
                            <SelectItem value="19:30">19:30</SelectItem>
                            <SelectItem value="20:00">20:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Nombre de personnes</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 personne</SelectItem>
                            <SelectItem value="2">2 personnes</SelectItem>
                            <SelectItem value="3">3 personnes</SelectItem>
                            <SelectItem value="4">4 personnes</SelectItem>
                            <SelectItem value="5">5 personnes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="mt-2">Rechercher une table</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Personnalisation</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="widgetTitle">Titre du widget</Label>
                    <Input id="widgetTitle" defaultValue="Réserver une table" />
                  </div>
                  <div>
                    <Label htmlFor="widgetButtonText">Texte du bouton</Label>
                    <Input id="widgetButtonText" defaultValue="Rechercher une table" />
                  </div>
                  <div>
                    <Label htmlFor="widgetPrimaryColor">Couleur principale</Label>
                    <Input id="widgetPrimaryColor" type="color" defaultValue="#000000" />
                  </div>
                  <div>
                    <Label htmlFor="widgetTextColor">Couleur du texte</Label>
                    <Input id="widgetTextColor" type="color" defaultValue="#ffffff" />
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end">
              <Button>Enregistrer les personnalisations</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
