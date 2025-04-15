"use client"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  CalendarDays,
  MapPin,
  Users,
  Euro,
  Clock,
  ArrowLeft,
  Edit,
  Trash2,
  Copy,
  Share2,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Types pour les événements spéciaux (repris de la page précédente)
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

// Type pour les participants
interface Participant {
  id: string
  name: string
  email: string
  phone: string
  numberOfGuests: number
  specialRequests?: string
  status: "confirmed" | "pending" | "cancelled"
  createdAt: Date
}

// Données mockées pour un événement spécifique
const mockEvent: SpecialEvent = {
  id: "event1",
  name: "Soirée Dégustation de Vins",
  description:
    "Découvrez notre sélection de vins fins accompagnés de tapas. Un sommelier professionnel vous guidera à travers les différentes saveurs et arômes. Vous apprendrez les bases de la dégustation et comment associer les vins avec différents plats. Une expérience conviviale et enrichissante pour les amateurs comme pour les connaisseurs.",
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
}

// Données mockées pour les participants
const mockParticipants: Participant[] = [
  {
    id: "p1",
    name: "Sophie Martin",
    email: "sophie.martin@email.com",
    phone: "06 12 34 56 78",
    numberOfGuests: 2,
    specialRequests: "Allergie aux fruits à coque",
    status: "confirmed",
    createdAt: new Date("2025-04-05"),
  },
  {
    id: "p2",
    name: "Thomas Dubois",
    email: "thomas.dubois@email.com",
    phone: "07 23 45 67 89",
    numberOfGuests: 1,
    status: "confirmed",
    createdAt: new Date("2025-04-07"),
  },
  {
    id: "p3",
    name: "Camille Leroy",
    email: "camille.leroy@email.com",
    phone: "06 34 56 78 90",
    numberOfGuests: 4,
    specialRequests: "Table près de la fenêtre si possible",
    status: "confirmed",
    createdAt: new Date("2025-04-10"),
  },
  {
    id: "p4",
    name: "Antoine Moreau",
    email: "antoine.moreau@email.com",
    phone: "07 45 67 89 01",
    numberOfGuests: 2,
    status: "pending",
    createdAt: new Date("2025-04-12"),
  },
  {
    id: "p5",
    name: "Julie Petit",
    email: "julie.petit@email.com",
    phone: "06 56 78 90 12",
    numberOfGuests: 1,
    status: "cancelled",
    createdAt: new Date("2025-04-08"),
  },
]

// Composant pour afficher les détails d'un événement
function EventDetails({ event }: { event: SpecialEvent }) {
  const typeLabels = {
    tasting: "Dégustation",
    cooking_class: "Cours de cuisine",
    theme_night: "Soirée à thème",
    live_music: "Musique live",
    private_party: "Événement privé",
    other: "Autre",
  }

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
    draft: "bg-yellow-100 text-yellow-800",
  }

  const capacityPercentage = (event.registeredGuests / event.capacity) * 100

  return (
    <div className="space-y-6">
      <div className="relative h-64 w-full rounded-xl overflow-hidden">
        <img
          src={event.imageUrl || "/placeholder.svg?height=300&width=500&query=restaurant%20event"}
          alt={event.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className={cn(statusColors[event.status], "text-sm px-3 py-1")}>
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

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-3xl font-bold">{event.name}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{typeLabels[event.type]}</Badge>
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="prose max-w-none">
            <p>{event.description}</p>
          </div>

          {event.host && (
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={event.hostImage || "/placeholder.svg"} alt={event.host} />
                <AvatarFallback>{event.host.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{event.host}</p>
                <p className="text-sm text-muted-foreground">Animateur de l'événement</p>
              </div>
            </div>
          )}
        </div>

        <Card className="w-full md:w-80 h-fit">
          <CardHeader>
            <CardTitle>Détails de l'événement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium">{format(event.startDate, "dd MMMM yyyy", { locale: fr })}</p>
                <p className="text-sm text-muted-foreground">
                  {format(event.startDate, "HH:mm")} - {format(event.endDate, "HH:mm")}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium">{event.location}</p>
                <p className="text-sm text-muted-foreground">Emplacement</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {event.registeredGuests} / {event.capacity} participants
                </p>
                <div className="w-full mt-1">
                  <Progress value={capacityPercentage} className="h-2" />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Euro className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium">{event.price} € par personne</p>
                <p className="text-sm text-muted-foreground">Tarif</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {Math.round((event.endDate.getTime() - event.startDate.getTime()) / 3600000)} heures
                </p>
                <p className="text-sm text-muted-foreground">Durée</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full">
              <Edit className="mr-2 h-4 w-4" />
              Modifier l'événement
            </Button>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
              <Button variant="outline" className="flex-1">
                <Copy className="mr-2 h-4 w-4" />
                Dupliquer
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Composant pour afficher la liste des participants
function ParticipantsList({ participants }: { participants: Participant[] }) {
  const statusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Confirmé
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            En attente
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Annulé
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Liste des participants</h3>
          <p className="text-sm text-muted-foreground">
            {participants.filter((p) => p.status === "confirmed").length} confirmés,{" "}
            {participants.filter((p) => p.status === "pending").length} en attente,{" "}
            {participants.filter((p) => p.status === "cancelled").length} annulés
          </p>
        </div>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Ajouter un participant
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Invités</TableHead>
              <TableHead>Demandes spéciales</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">{participant.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-sm">{participant.email}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-sm">{participant.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{participant.numberOfGuests}</TableCell>
                <TableCell>
                  {participant.specialRequests ? (
                    <span className="text-sm">{participant.specialRequests}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Aucune</span>
                  )}
                </TableCell>
                <TableCell>{statusBadge(participant.status)}</TableCell>
                <TableCell>{format(participant.createdAt, "dd/MM/yyyy", { locale: fr })}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

// Composant pour ajouter un nouveau participant
function AddParticipantForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un participant</CardTitle>
        <CardDescription>Enregistrez un nouveau participant pour cet événement</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" placeholder="ex: Sophie Martin" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="ex: sophie.martin@email.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" placeholder="ex: 06 12 34 56 78" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="guests">Nombre d'invités</Label>
              <Input id="guests" type="number" min="1" defaultValue="1" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="requests">Demandes spéciales (optionnel)</Label>
            <Textarea id="requests" placeholder="ex: Allergies, préférences alimentaires, etc." />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Ajouter le participant</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default function EventDetailsPage({ params }: { params: { restaurantId: string; eventId: string } }) {
  const { restaurantId, eventId } = params
  const router = useRouter()
  const event = mockEvent // Dans une application réelle, on récupérerait l'événement par son ID
  const participants = mockParticipants

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Détails de l'événement</h1>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="add">Ajouter un participant</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <EventDetails event={event} />
        </TabsContent>
        <TabsContent value="participants">
          <ParticipantsList participants={participants} />
        </TabsContent>
        <TabsContent value="add">
          <AddParticipantForm />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
