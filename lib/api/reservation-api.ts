import type { Reservation } from "@/lib/mock-data"

// Simuler une base de données avec un tableau
let reservations: Reservation[] = [
  {
    id: "res-001",
    restaurantId: "rest-001",
    customerName: "Jean Dupont",
    customerEmail: "jean.dupont@example.com",
    customerPhone: "06 12 34 56 78",
    date: "2025-04-15",
    time: "19:30",
    partySize: 4,
    tableId: "table-001",
    status: "confirmed",
    notes: "Anniversaire",
  },
  {
    id: "res-002",
    restaurantId: "rest-001",
    customerName: "Marie Martin",
    customerEmail: "marie.martin@example.com",
    customerPhone: "06 98 76 54 32",
    date: "2025-04-15",
    time: "20:00",
    partySize: 2,
    tableId: "table-003",
    status: "pending",
  },
  {
    id: "res-003",
    restaurantId: "rest-001",
    customerName: "Pierre Durand",
    customerEmail: "pierre.durand@example.com",
    customerPhone: "07 11 22 33 44",
    date: "2025-04-16",
    time: "12:30",
    partySize: 6,
    tableId: "table-005",
    status: "cancelled",
    notes: "Annulé par le client",
  },
  {
    id: "res-004",
    restaurantId: "rest-001",
    customerName: "Sophie Leroy",
    customerEmail: "sophie.leroy@example.com",
    customerPhone: "06 55 44 33 22",
    date: "2025-04-14",
    time: "19:00",
    partySize: 3,
    tableId: "table-002",
    status: "completed",
  },
  {
    id: "res-005",
    restaurantId: "rest-001",
    customerName: "Lucas Moreau",
    customerEmail: "lucas.moreau@example.com",
    customerPhone: "07 99 88 77 66",
    date: "2025-04-17",
    time: "20:30",
    partySize: 2,
    status: "pending",
  },
]

// Simuler des délais d'API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const reservationApi = {
  getAll: async (restaurantId: string): Promise<Reservation[]> => {
    await delay(500)
    return reservations.filter((reservation) => reservation.restaurantId === restaurantId)
  },

  getById: async (id: string): Promise<Reservation | undefined> => {
    await delay(300)
    return reservations.find((reservation) => reservation.id === id)
  },

  create: async (data: Omit<Reservation, "id">): Promise<Reservation> => {
    await delay(700)
    const newReservation: Reservation = {
      id: `res-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      ...data,
    }
    reservations.push(newReservation)
    return newReservation
  },

  update: async (id: string, data: Partial<Reservation>): Promise<Reservation | undefined> => {
    await delay(500)
    const index = reservations.findIndex((reservation) => reservation.id === id)
    if (index !== -1) {
      reservations[index] = { ...reservations[index], ...data }
      return reservations[index]
    }
    return undefined
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(400)
    const initialLength = reservations.length
    reservations = reservations.filter((reservation) => reservation.id !== id)
    return initialLength > reservations.length
  },
}
