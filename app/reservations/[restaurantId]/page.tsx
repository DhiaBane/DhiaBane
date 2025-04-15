"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format, addDays } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Info } from "lucide-react"
import { reservationApi } from "@/lib/api"
import type { Restaurant } from "@/lib/mock-data"

export default function OnlineReservationPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const router = useRouter()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [partySize, setPartySize] = useState<string>("2")
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reservationComplete, setReservationComplete] = useState(false)
  const [reservationId, setReservationId] = useState<string | null>(null)

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        // Dans une application réelle, vous feriez un appel API pour obtenir les détails du restaurant
        const restaurantData = {
          id: restaurantId,
          name: "Le Gourmet Français",
          address: "123 Rue de la Gastronomie, Paris",
          phone: "01 23 45 67 89",
          email: "contact@legourmetfrancais.fr",
          openingHours: {
            monday: { open: "11:30", close: "22:00" },
            tuesday: { open: "11:30", close: "22:00" },
            wednesday: { open: "11:30", close: "22:00" },
            thursday: { open: "11:30", close: "22:00" },
            friday: { open: "11:30", close: "23:00" },
            saturday: { open: "11:30", close: "23:00" },
            sunday: { open: "12:00", close: "21:00" },
          },
          image: "/placeholder.svg?height=400&width=600",
        }
        setRestaurant(restaurantData as Restaurant)
      } catch (error) {
        console.error("Error fetching restaurant:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurant()
  }, [restaurantId])

  useEffect(() => {
    if (selectedDate) {
      // Générer des créneaux horaires disponibles
      // Dans une application réelle, vous feriez un appel API pour obtenir les créneaux disponibles
      const dayOfWeek = selectedDate.getDay()
      const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
      const day = dayNames[dayOfWeek]

      if (restaurant?.openingHours && restaurant.openingHours[day as keyof typeof restaurant.openingHours]) {
        const hours = restaurant.openingHours[day as keyof typeof restaurant.openingHours]
        const openTime = hours.open.split(":").map(Number)
        const closeTime = hours.close.split(":").map(Number)

        const times: string[] = []
        let currentHour = openTime[0]
        let currentMinute = openTime[1]

        // Générer des créneaux de 30 minutes
        while (currentHour < closeTime[0] || (currentHour === closeTime[0] && currentMinute < closeTime[1] - 60)) {
          times.push(`${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`)

          currentMinute += 30
          if (currentMinute >= 60) {
            currentHour += 1
            currentMinute = 0
          }
        }

        setAvailableTimes(times)
        setSelectedTime(times.length > 0 ? times[0] : "")
      } else {
        setAvailableTimes([])
        setSelectedTime("")
      }
    }
  }, [selectedDate, restaurant])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handlePartySizeChange = (size: string) => {
    setPartySize(size)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNextStep = () => {
    setFormStep(2)
  }

  const handlePreviousStep = () => {
    setFormStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime) return

    setIsSubmitting(true)

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")

      const newReservation = await reservationApi.create({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        date: formattedDate,
        time: selectedTime,
        partySize: Number.parseInt(partySize),
        status: "pending",
        notes: formData.notes || undefined,
        restaurantId,
      })

      setReservationId(newReservation.id)
      setReservationComplete(true)

      // Dans une application réelle, vous enverriez un email ou un SMS de confirmation ici
    } catch (error) {
      console.error("Error creating reservation:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const disabledDays = {
    before: new Date(),
    after: addDays(new Date(), 30), // Limite les réservations à 30 jours à l'avance
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-[60vh]">
          <p>Chargement des informations du restaurant...</p>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-[60vh]">
          <p>Restaurant non trouvé</p>
        </div>
      </div>
    )
  }

  if (reservationComplete) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Réservation confirmée</CardTitle>
            <CardDescription>Votre réservation a été enregistrée avec succès</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Réservation enregistrée</AlertTitle>
              <AlertDescription className="text-green-700">
                Votre demande de réservation a été enregistrée avec succès. Vous recevrez une confirmation par email.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Détails de la réservation</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-sm text-muted-foreground">Restaurant:</div>
                  <div className="text-sm">{restaurant.name}</div>

                  <div className="text-sm text-muted-foreground">Date:</div>
                  <div className="text-sm">
                    {selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                  </div>

                  <div className="text-sm text-muted-foreground">Heure:</div>
                  <div className="text-sm">{selectedTime}</div>

                  <div className="text-sm text-muted-foreground">Nombre de personnes:</div>
                  <div className="text-sm">{partySize}</div>

                  <div className="text-sm text-muted-foreground">Nom:</div>
                  <div className="text-sm">{formData.customerName}</div>

                  <div className="text-sm text-muted-foreground">Numéro de réservation:</div>
                  <div className="text-sm font-medium">{reservationId}</div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-blue-800">
                      Un email de confirmation a été envoyé à {formData.customerEmail}. Si vous ne le recevez pas dans
                      les prochaines minutes, vérifiez votre dossier de spam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push(`/`)}>Retour à l'accueil</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Réservation en ligne</CardTitle>
          <CardDescription>{restaurant.name}</CardDescription>
        </CardHeader>
        <CardContent>
          {formStep === 1 ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="font-medium mb-2">Sélectionnez une date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={disabledDays}
                    className="rounded-md border"
                    locale={fr}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-2">Informations</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="partySize">Nombre de personnes</Label>
                      <Select value={partySize} onValueChange={handlePartySizeChange}>
                        <SelectTrigger id="partySize">
                          <SelectValue placeholder="Sélectionnez" />
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

                    <div>
                      <Label>Horaires disponibles</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {availableTimes.length > 0 ? (
                          availableTimes.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              onClick={() => handleTimeSelect(time)}
                              className="text-sm"
                            >
                              {time}
                            </Button>
                          ))
                        ) : (
                          <p className="col-span-3 text-sm text-muted-foreground">
                            Aucun horaire disponible pour cette date
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Votre réservation</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-muted-foreground">Date:</div>
                  <div className="text-sm">
                    {selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                  </div>

                  <div className="text-sm text-muted-foreground">Heure:</div>
                  <div className="text-sm">{selectedTime || "Non sélectionnée"}</div>

                  <div className="text-sm text-muted-foreground">Nombre de personnes:</div>
                  <div className="text-sm">{partySize}</div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Nom complet</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="customerPhone">Téléphone</Label>
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Demandes spéciales (allergies, occasion spéciale, etc.)</Label>
                  <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows={3} />
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Récapitulatif de votre réservation</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-muted-foreground">Restaurant:</div>
                  <div className="text-sm">{restaurant.name}</div>

                  <div className="text-sm text-muted-foreground">Date:</div>
                  <div className="text-sm">
                    {selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                  </div>

                  <div className="text-sm text-muted-foreground">Heure:</div>
                  <div className="text-sm">{selectedTime}</div>

                  <div className="text-sm text-muted-foreground">Nombre de personnes:</div>
                  <div className="text-sm">{partySize}</div>
                </div>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {formStep === 1 ? (
            <>
              <Button variant="outline" onClick={() => router.push(`/`)}>
                Annuler
              </Button>
              <Button onClick={handleNextStep} disabled={!selectedDate || !selectedTime}>
                Continuer
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handlePreviousStep}>
                Retour
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.customerName || !formData.customerEmail || !formData.customerPhone}
              >
                {isSubmitting ? "Traitement en cours..." : "Confirmer la réservation"}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
