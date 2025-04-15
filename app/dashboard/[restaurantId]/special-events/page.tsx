"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addHours } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, PlusCircle, Trash2, Edit, Copy, Users, Euro, CalendarDays, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Types pour les événements spéciaux
type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled" | "draft"
type EventType = "tasting" | "cooking_class" | "theme_night" | "live_music" | "private_party" | "other"

interface SpecialEvent {
  id: string
  name: string
  description: string
  type: EventType
  status: EventStatus
  startDate: Date
  endDate: Date
  capacity: number
  registeredGuests: number
  price: number
  location: string
  imageUrl?: string
  host?: string
  hostImage?: string
  tags: string[]
  createdAt: Date
  restaurantId: string
}

// Données mockées pour les événements
const mockEvents: SpecialEvent[] = [
  {
    id: "event1",
    name: "Soirée Dégustation de Vins",
    description:
      "Découvrez notre sélection de vins fins accompagnés de tapas. Un sommelier professionnel vous guidera à travers les différentes saveurs et arômes.",
    type: "tasting",
    status: "upcoming",
    startDate: new Date("2025-05-15T19:00:00"),
    endDate: new Date("2025-05-15T22:00:00"),
    capacity: 30,
    registeredGuests: 22,
    price: 45,
    location: "Salle principale",
    imageUrl: "/elegant-wine-gathering.png",
    host: "Jean Dupont",
    hostImage: "/wine-expert.png",
    tags: ["vin", "dégustation", "gastronomie"],
    createdAt: new Date("2025-04-01"),
    restaurantId: "1",
  },
  {
    id: "event2",
    name: "Cours de Cuisine Italienne",
    description:
      "Apprenez à préparer des pâtes fraîches et des sauces authentiques avec notre chef italien. Tous les ingrédients sont fournis et vous dégusterez vos créations.",
    type: "cooking_class",
    status: "upcoming",
    startDate: new Date("2025-05-20T18:00:00"),
    endDate: new Date("2025-05-20T21:00:00"),
    capacity: 15,
    registeredGuests: 12,
    price: 75,
    location: "Cuisine ouverte",
    imageUrl: "/pasta-making-fun.png",
    host: "Marco Rossi",
    hostImage: "/diverse-culinary-artist.png",
    tags: ["cuisine", "italien", "pâtes"],
    createdAt: new Date("2025-04-05"),
    restaurantId: "1",
  },
  {
    id: "event3",
    name: "Soirée Jazz & Cocktails",
    description:
      "Une soirée élégante avec un trio de jazz live et une carte de cocktails spéciaux créés pour l'occasion.",
    type: "live_music",
    status: "upcoming",
    startDate: new Date("2025-05-25T20:00:00"),
    endDate: new Date("2025-05-25T23:30:00"),
    capacity: 50,
    registeredGuests: 35,
    price: 25,
    location: "Bar & Lounge",
    imageUrl: "/smoky-jazz-lounge.png",
    tags: ["jazz", "musique", "cocktails"],
    createdAt: new Date("2025-04-10"),
    restaurantId: "1",
  },
  {
    id: "event4",
    name: "Dîner Gastronomique 5 Services",
    description:
      "Un menu dégustation exceptionnel en 5 services mettant en valeur les produits locaux de saison. Accord mets et vins inclus.",
    type: "theme_night",
    status: "completed",
    startDate: new Date("2025-04-10T19:30:00"),
    endDate: new Date("2025-04-10T23:00:00"),
    capacity: 40,
    registeredGuests: 38,
    price: 120,
    location: "Salle principale",
    imageUrl: "/elegant-dining-experience.png",
    tags: ["gastronomie", "menu dégustation", "produits locaux"],
    createdAt: new Date("2025-03-15"),
    restaurantId: "1",
  },
  {
    id: "event5",
    name: "Brunch Méditerranéen",
    description:
      "Un brunch aux saveurs méditerranéennes avec buffet à volonté, boissons fraîches et ambiance détendue.",
    type: "theme_night",
    status: "draft",
    startDate: new Date("2025-06-01T10:30:00"),
    endDate: new Date("2025-06-01T14:00:00"),
    capacity: 60,
    registeredGuests: 0,
    price: 35,
    location: "Terrasse",
    imageUrl: "/sunny-mediterranean-spread.png",
    tags: ["brunch", "méditerranéen", "buffet"],
    createdAt: new Date("2025-04-15"),
    restaurantId: "1",
  },
]

// Composant pour afficher une carte d'événement
function EventCard({ event }: { event: SpecialEvent }) {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
    draft: "bg-yellow-100 text-yellow-800",
  }

  const typeLabels = {
    tasting: "Dégustation",
    cooking_class: "Cours de cuisine",
    theme_night: "Soirée à thème",
    live_music: "Musique live",
    private_party: "Événement privé",
    other: "Autre",
  }

  const capacityPercentage = (event.registeredGuests / event.capacity) * 100

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <img
          src={event.imageUrl || "/placeholder.svg?height=300&width=500&query=restaurant%20event"}
          alt={event.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={cn(statusColors[event.status])}>
            {event.status === "upcoming"
              ? "À venir"
              : event.status === "ongoing"
                ? "En cours"
                : event.status === "completed"
                  ? "Terminé"
                  : event.status === "cancelled"
                    ? "Annulé"
                    : "Brouillon"}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{event.name}</CardTitle>
            <CardDescription className="mt-1">
              <Badge variant="outline" className="mr-1">
                {typeLabels[event.type]}
              </Badge>
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="mr-1">
                  {tag}
                </Badge>
              ))}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              {format(event.startDate, "dd MMMM yyyy", { locale: fr })} • {format(event.startDate, "HH:mm")} -{" "}
              {format(event.endDate, "HH:mm")}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              {event.registeredGuests} / {event.capacity} participants
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Euro className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{event.price} € par personne</span>
          </div>
          {event.host && (
            <div className="flex items-center text-sm mt-2">
              <span className="text-muted-foreground mr-2">Animé par:</span>
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={event.hostImage || "/placeholder.svg"} alt={event.host} />
                  <AvatarFallback>{event.host.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{event.host}</span>
              </div>
            </div>
          )}
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Réservations</span>
              <span>
                {event.registeredGuests}/{event.capacity}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={cn("h-2 rounded-full", {
                  "bg-green-500": capacityPercentage < 80,
                  "bg-yellow-500": capacityPercentage >= 80 && capacityPercentage < 95,
                  "bg-red-500": capacityPercentage >= 95,
                })}
                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
              ></div>
            </div>
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
          <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// Composant pour le formulaire de création d'événement
function CreateEventForm() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(addHours(new Date(), 3))
  const [eventType, setEventType] = useState<EventType>("tasting")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <form className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nom de l'événement</Label>
          <Input id="name" placeholder="ex: Soirée Dégustation de Vins" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Décrivez votre événement" rows={4} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="type">Type d'événement</Label>
          <Select defaultValue="tasting" onValueChange={(value) => setEventType(value as EventType)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tasting">Dégustation</SelectItem>
              <SelectItem value="cooking_class">Cours de cuisine</SelectItem>
              <SelectItem value="theme_night">Soirée à thème</SelectItem>
              <SelectItem value="live_music">Musique live</SelectItem>
              <SelectItem value="private_party">Événement privé</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Date et heure de début</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP HH:mm", { locale: fr }) : "Sélectionnez une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                <div className="p-3 border-t border-border">
                  <Label htmlFor="startTime">Heure</Label>
                  <Input
                    id="startTime"
                    type="time"
                    className="mt-1"
                    defaultValue={startDate ? format(startDate, "HH:mm") : "19:00"}
                    onChange={(e) => {
                      if (startDate && e.target.value) {
                        const [hours, minutes] = e.target.value.split(":").map(Number)
                        const newDate = new Date(startDate)
                        newDate.setHours(hours, minutes)
                        setStartDate(newDate)
                      }
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label>Date et heure de fin</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP HH:mm", { locale: fr }) : "Sélectionnez une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                <div className="p-3 border-t border-border">
                  <Label htmlFor="endTime">Heure</Label>
                  <Input
                    id="endTime"
                    type="time"
                    className="mt-1"
                    defaultValue={endDate ? format(endDate, "HH:mm") : "22:00"}
                    onChange={(e) => {
                      if (endDate && e.target.value) {
                        const [hours, minutes] = e.target.value.split(":").map(Number)
                        const newDate = new Date(endDate)
                        newDate.setHours(hours, minutes)
                        setEndDate(newDate)
                      }
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="capacity">Capacité maximale</Label>
            <Input id="capacity" type="number" placeholder="ex: 30" min="1" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Prix par personne (€)</Label>
            <Input id="price" type="number" placeholder="ex: 45" min="0" step="0.01" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Lieu</Label>
          <Select defaultValue="main">
            <SelectTrigger id="location">
              <SelectValue placeholder="Sélectionnez un lieu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Salle principale</SelectItem>
              <SelectItem value="terrace">Terrasse</SelectItem>
              <SelectItem value="bar">Bar & Lounge</SelectItem>
              <SelectItem value="kitchen">Cuisine ouverte</SelectItem>
              <SelectItem value="private">Salle privée</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="host">Animateur / Hôte (optionnel)</Label>
          <Input id="host" placeholder="ex: Jean Dupont" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="imageUrl">Image de l'événement (URL)</Label>
          <Input id="imageUrl" placeholder="URL de l'image" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="ex: vin, dégustation"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
            />
            <Button type="button" onClick={handleAddTag} variant="outline">
              Ajouter
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    className="ml-1 rounded-full hover:bg-secondary"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="active" />
          <Label htmlFor="active">Publier immédiatement</Label>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Créer l'événement</Button>
      </div>
    </form>
  )
}

export default function SpecialEventsPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Événements Spéciaux</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvel Événement
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="mt-6">
        <TabsList>
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
          <TabsTrigger value="completed">Terminés</TabsTrigger>
          <TabsTrigger value="draft">Brouillons</TabsTrigger>
          <TabsTrigger value="create">Créer</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockEvents
              .filter((event) => event.status === "upcoming" || event.status === "ongoing")
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockEvents
              .filter((event) => event.status === "completed" || event.status === "cancelled")
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockEvents
              .filter((event) => event.status === "draft")
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créer un nouvel événement</CardTitle>
              <CardDescription>
                Configurez les détails de votre événement spécial pour attirer plus de clients et créer une expérience
                mémorable.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateEventForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
