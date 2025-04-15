import { v4 as uuidv4 } from "uuid"

// Types pour les événements spéciaux
export type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled" | "draft"
export type EventType = "tasting" | "cooking_class" | "theme_night" | "live_music" | "private_party" | "other"

export interface SpecialEvent {
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
export interface Participant {
  id: string
  eventId: string
  name: string
  email: string
  phone: string
  numberOfGuests: number
  specialRequests?: string
  status: "confirmed" | "pending" | "cancelled"
  createdAt: Date
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
    imageUrl: "/placeholder.svg?height=300&width=500&query=gourmet%20dinner",
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
    imageUrl: "/placeholder.svg?height=300&width=500&query=mediterranean%20brunch",
    tags: ["brunch", "méditerranéen", "buffet"],
    createdAt: new Date("2025-04-15"),
    restaurantId: "1",
  },
]

// Données mockées pour les participants
const mockParticipants: Participant[] = [
  {
    id: "p1",
    eventId: "event1",
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
    eventId: "event1",
    name: "Thomas Dubois",
    email: "thomas.dubois@email.com",
    phone: "07 23 45 67 89",
    numberOfGuests: 1,
    status: "confirmed",
    createdAt: new Date("2025-04-07"),
  },
  {
    id: "p3",
    eventId: "event1",
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
    eventId: "event1",
    name: "Antoine Moreau",
    email: "antoine.moreau@email.com",
    phone: "07 45 67 89 01",
    numberOfGuests: 2,
    status: "pending",
    createdAt: new Date("2025-04-12"),
  },
  {
    id: "p5",
    eventId: "event1",
    name: "Julie Petit",
    email: "julie.petit@email.com",
    phone: "06 56 78 90 12",
    numberOfGuests: 1,
    status: "cancelled",
    createdAt: new Date("2025-04-08"),
  },
  {
    id: "p6",
    eventId: "event2",
    name: "Pierre Durand",
    email: "pierre.durand@email.com",
    phone: "07 67 89 01 23",
    numberOfGuests: 2,
    status: "confirmed",
    createdAt: new Date("2025-04-06"),
  },
  {
    id: "p7",
    eventId: "event2",
    name: "Marie Lambert",
    email: "marie.lambert@email.com",
    phone: "06 78 90 12 34",
    numberOfGuests: 1,
    specialRequests: "Végétarienne",
    status: "confirmed",
    createdAt: new Date("2025-04-09"),
  },
]

// API pour la gestion des événements spéciaux
export const eventsApi = {
  // Récupérer tous les événements d'un restaurant
  getAll: async (restaurantId: string): Promise<SpecialEvent[]> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Filtrer les événements par restaurant
    return mockEvents.filter((event) => event.restaurantId === restaurantId)
  },

  // Récupérer un événement par son ID
  getById: async (eventId: string): Promise<SpecialEvent | undefined> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockEvents.find((event) => event.id === eventId)
  },

  // Mettre à jour un événement
  update: async (eventId: string, data: Partial<SpecialEvent>): Promise<SpecialEvent | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 700))

    const eventIndex = mockEvents.findIndex((event) => event.id === eventId)

    if (eventIndex === -1) {
      return null
    }

    // Mettre à jour l'événement
    const updatedEvent = {
      ...mockEvents[eventIndex],
      ...data,
    }

    mockEvents[eventIndex] = updatedEvent

    return updatedEvent
  },

  // Créer un nouvel événement
  create: async (data: Omit<SpecialEvent, "id" | "createdAt" | "registeredGuests">): Promise<SpecialEvent> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newEvent: SpecialEvent = {
      id: uuidv4(),
      createdAt: new Date(),
      registeredGuests: 0,
      ...data,
    }

    mockEvents.push(newEvent)

    return newEvent
  },

  // Supprimer un événement
  delete: async (eventId: string): Promise<boolean> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    const eventIndex = mockEvents.findIndex((event) => event.id === eventId)

    if (eventIndex === -1) {
      return false
    }

    mockEvents.splice(eventIndex, 1)

    // Supprimer également tous les participants associés
    const participantsToRemove = mockParticipants.filter((p) => p.eventId === eventId)
    participantsToRemove.forEach((p) => {
      const index = mockParticipants.findIndex((participant) => participant.id === p.id)
      if (index !== -1) {
        mockParticipants.splice(index, 1)
      }
    })

    return true
  },

  // Récupérer tous les participants d'un événement
  getParticipants: async (eventId: string): Promise<Participant[]> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 400))

    return mockParticipants.filter((participant) => participant.eventId === eventId)
  },

  // Ajouter un participant à un événement
  addParticipant: async (
    eventId: string,
    data: Omit<Participant, "id" | "eventId" | "createdAt">,
  ): Promise<Participant | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500))

    const event = mockEvents.find((e) => e.id === eventId)

    if (!event) {
      return null
    }

    // Vérifier si l'événement a encore de la place
    const currentParticipants = mockParticipants.filter((p) => p.eventId === eventId && p.status !== "cancelled")
    const totalGuests = currentParticipants.reduce((sum, p) => sum + p.numberOfGuests, 0)

    if (totalGuests + data.numberOfGuests > event.capacity) {
      return null // Capacité dépassée
    }

    // Créer le nouveau participant
    const newParticipant: Participant = {
      id: uuidv4(),
      eventId,
      createdAt: new Date(),
      ...data,
    }

    mockParticipants.push(newParticipant)

    // Mettre à jour le nombre de participants enregistrés
    const eventIndex = mockEvents.findIndex((e) => e.id === eventId)
    if (eventIndex !== -1) {
      mockEvents[eventIndex].registeredGuests = totalGuests + data.numberOfGuests
    }

    return newParticipant
  },

  // Mettre à jour un participant
  updateParticipant: async (participantId: string, data: Partial<Participant>): Promise<Participant | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500))

    const participantIndex = mockParticipants.findIndex((p) => p.id === participantId)

    if (participantIndex === -1) {
      return null
    }

    const oldParticipant = mockParticipants[participantIndex]

    // Mettre à jour le participant
    const updatedParticipant = {
      ...oldParticipant,
      ...data,
    }

    mockParticipants[participantIndex] = updatedParticipant

    // Si le nombre d'invités a changé, mettre à jour le compteur de l'événement
    if (data.numberOfGuests !== undefined && data.numberOfGuests !== oldParticipant.numberOfGuests) {
      const eventIndex = mockEvents.findIndex((e) => e.id === oldParticipant.eventId)
      if (eventIndex !== -1) {
        const diff = data.numberOfGuests - oldParticipant.numberOfGuests
        mockEvents[eventIndex].registeredGuests += diff
      }
    }

    return updatedParticipant
  },

  // Supprimer un participant
  deleteParticipant: async (participantId: string): Promise<boolean> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 400))

    const participantIndex = mockParticipants.findIndex((p) => p.id === participantId)

    if (participantIndex === -1) {
      return false
    }

    const participant = mockParticipants[participantIndex]

    // Mettre à jour le compteur de l'événement
    const eventIndex = mockEvents.findIndex((e) => e.id === participant.eventId)
    if (eventIndex !== -1 && participant.status !== "cancelled") {
      mockEvents[eventIndex].registeredGuests -= participant.numberOfGuests
    }

    mockParticipants.splice(participantIndex, 1)

    return true
  },
}
