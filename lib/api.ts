import {
  type Table,
  type Reservation,
  type MenuItem,
  type Customer,
  type InventoryItem,
  mockTables,
  mockReservations,
  mockMenuItems,
  mockCustomers,
  mockInventory,
} from "@/lib/mock-data"
import { v4 as uuidv4 } from "uuid"

// API pour la gestion des tables
export const tableApi = {
  // Récupérer toutes les tables d'un restaurant
  getAll: async (restaurantId: string): Promise<Table[]> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filtrer les tables par restaurant
    return mockTables.filter((table) => table.restaurantId === restaurantId)
  },

  // Récupérer une table par son ID
  getById: async (tableId: string): Promise<Table | undefined> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockTables.find((table) => table.id === tableId)
  },

  // Mettre à jour une table
  update: async (tableId: string, data: Partial<Table>): Promise<Table | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 700))

    const tableIndex = mockTables.findIndex((table) => table.id === tableId)

    if (tableIndex === -1) {
      return null
    }

    // Mettre à jour la table
    const updatedTable = {
      ...mockTables[tableIndex],
      ...data,
    }

    mockTables[tableIndex] = updatedTable

    return updatedTable
  },

  // Créer une nouvelle table
  create: async (data: Omit<Table, "id">): Promise<Table> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newTable: Table = {
      id: uuidv4(),
      ...data,
    }

    mockTables.push(newTable)

    return newTable
  },

  // Supprimer une table
  delete: async (tableId: string): Promise<boolean> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    const tableIndex = mockTables.findIndex((table) => table.id === tableId)

    if (tableIndex === -1) {
      return false
    }

    mockTables.splice(tableIndex, 1)

    return true
  },
}

// API pour la gestion des réservations
export const reservationApi = {
  // Récupérer toutes les réservations d'un restaurant
  getAll: async (restaurantId: string): Promise<Reservation[]> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Filtrer les réservations par restaurant
    return mockReservations.filter((reservation) => reservation.restaurantId === restaurantId)
  },

  // Récupérer une réservation par son ID
  getById: async (reservationId: string): Promise<Reservation | undefined> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockReservations.find((reservation) => reservation.id === reservationId)
  },

  // Mettre à jour une réservation
  update: async (reservationId: string, data: Partial<Reservation>): Promise<Reservation | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 700))

    const reservationIndex = mockReservations.findIndex((reservation) => reservation.id === reservationId)

    if (reservationIndex === -1) {
      return null
    }

    // Mettre à jour la réservation
    const updatedReservation = {
      ...mockReservations[reservationIndex],
      ...data,
    }

    mockReservations[reservationIndex] = updatedReservation

    return updatedReservation
  },

  // Créer une nouvelle réservation
  create: async (data: Omit<Reservation, "id">): Promise<Reservation> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newReservation: Reservation = {
      id: uuidv4(),
      ...data,
    }

    mockReservations.push(newReservation)

    return newReservation
  },

  // Supprimer une réservation
  delete: async (reservationId: string): Promise<boolean> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    const reservationIndex = mockReservations.findIndex((reservation) => reservation.id === reservationId)

    if (reservationIndex === -1) {
      return false
    }

    mockReservations.splice(reservationIndex, 1)

    return true
  },
}

// API pour la gestion des articles du menu
export const menuItemApi = {
  // Récupérer tous les articles du menu d'un restaurant
  getAll: async (restaurantId: string): Promise<MenuItem[]> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Filtrer les articles par restaurant
    return mockMenuItems.filter((item) => item.restaurantId === restaurantId)
  },

  // Récupérer un article par son ID
  getById: async (itemId: string): Promise<MenuItem | undefined> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockMenuItems.find((item) => item.id === itemId)
  },

  // Mettre à jour un article
  update: async (itemId: string, data: Partial<MenuItem>): Promise<MenuItem | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 700))

    const itemIndex = mockMenuItems.findIndex((item) => item.id === itemId)

    if (itemIndex === -1) {
      return null
    }

    // Mettre à jour l'article
    const updatedItem = {
      ...mockMenuItems[itemIndex],
      ...data,
    }

    mockMenuItems[itemIndex] = updatedItem

    return updatedItem
  },

  // Créer un nouvel article
  create: async (data: Omit<MenuItem, "id">): Promise<MenuItem> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newItem: MenuItem = {
      id: uuidv4(),
      ...data,
    }

    mockMenuItems.push(newItem)

    return newItem
  },

  // Supprimer un article
  delete: async (itemId: string): Promise<boolean> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    const itemIndex = mockMenuItems.findIndex((item) => item.id === itemId)

    if (itemIndex === -1) {
      return false
    }

    mockMenuItems.splice(itemIndex, 1)

    return true
  },
}

// API pour la gestion des clients
export const customerApi = {
  // Récupérer tous les clients d'un restaurant
  getAll: async (restaurantId: string): Promise<Customer[]> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Filtrer les clients par restaurant
    return mockCustomers.filter((customer) => customer.restaurantId === restaurantId)
  },

  // Récupérer un client par son ID
  getById: async (customerId: string): Promise<Customer | undefined> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockCustomers.find((customer) => customer.id === customerId)
  },

  // Mettre à jour un client
  update: async (customerId: string, data: Partial<Customer>): Promise<Customer | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 700))

    const customerIndex = mockCustomers.findIndex((customer) => customer.id === customerId)

    if (customerIndex === -1) {
      return null
    }

    // Mettre à jour le client
    const updatedCustomer = {
      ...mockCustomers[customerIndex],
      ...data,
    }

    mockCustomers[customerIndex] = updatedCustomer

    return updatedCustomer
  },

  // Créer un nouveau client
  create: async (data: Omit<Customer, "id">): Promise<Customer> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newCustomer: Customer = {
      id: uuidv4(),
      ...data,
    }

    mockCustomers.push(newCustomer)

    return newCustomer
  },

  // Supprimer un client
  delete: async (customerId: string): Promise<boolean> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    const customerIndex = mockCustomers.findIndex((customer) => customer.id === customerId)

    if (customerIndex === -1) {
      return false
    }

    mockCustomers.splice(customerIndex, 1)

    return true
  },
}

// API pour la gestion de l'inventaire
export const inventoryApi = {
  // Récupérer tous les articles d'inventaire d'un restaurant
  getAll: async (restaurantId: string): Promise<InventoryItem[]> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Filtrer les articles par restaurant
    return mockInventory.filter((item) => item.restaurantId === restaurantId)
  },

  // Récupérer un article par son ID
  getById: async (itemId: string): Promise<InventoryItem | undefined> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockInventory.find((item) => item.id === itemId)
  },

  // Mettre à jour un article
  update: async (itemId: string, data: Partial<InventoryItem>): Promise<InventoryItem | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 700))

    const itemIndex = mockInventory.findIndex((item) => item.id === itemId)

    if (itemIndex === -1) {
      return null
    }

    // Mettre à jour l'article
    const updatedItem = {
      ...mockInventory[itemIndex],
      ...data,
    }

    mockInventory[itemIndex] = updatedItem

    return updatedItem
  },

  // Créer un nouvel article
  create: async (data: Omit<InventoryItem, "id">): Promise<InventoryItem> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newItem: InventoryItem = {
      id: uuidv4(),
      ...data,
    }

    mockInventory.push(newItem)

    return newItem
  },

  // Supprimer un article
  delete: async (itemId: string): Promise<boolean> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    const itemIndex = mockInventory.findIndex((item) => item.id === itemId)

    if (itemIndex === -1) {
      return false
    }

    mockInventory.splice(itemIndex, 1)

    return true
  },
}

// Types pour les commandes
export type OrderStatus = "pending" | "in_progress" | "ready" | "served" | "paid" | "cancelled"

export type OrderItem = {
  menuItemId: string
  quantity: number
  notes?: string
  modifiers?: string[]
}

export type Order = {
  id: string
  tableId: string
  items: OrderItem[]
  status: OrderStatus
  createdAt: string
  updatedAt: string
  total: number
  restaurantId: string
}

// Données mockées pour les commandes
const mockOrders: Order[] = [
  {
    id: "1",
    tableId: "1",
    items: [
      { menuItemId: "1", quantity: 2 },
      { menuItemId: "3", quantity: 2 },
    ],
    status: "paid",
    createdAt: "2025-04-14T14:30:00Z",
    updatedAt: "2025-04-14T14:32:00Z",
    total: 66.0,
    restaurantId: "1",
  },
  {
    id: "2",
    tableId: "2",
    items: [
      { menuItemId: "2", quantity: 1 },
      { menuItemId: "1", quantity: 1 },
    ],
    status: "paid",
    createdAt: "2025-04-14T13:45:00Z",
    updatedAt: "2025-04-14T13:45:00Z",
    total: 41.4,
    restaurantId: "1",
  },
  {
    id: "3",
    tableId: "3",
    items: [
      { menuItemId: "4", quantity: 2 },
      { menuItemId: "5", quantity: 2 },
    ],
    status: "in_progress",
    createdAt: "2025-04-14T12:30:00Z",
    updatedAt: "2025-04-14T12:35:00Z",
    total: 53.6,
    restaurantId: "1",
  },
]

// API pour la gestion des commandes
export const orderApi = {
  // Récupérer toutes les commandes d'un restaurant
  getAll: async (restaurantId: string): Promise<Order[]> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Filtrer les commandes par restaurant
    return mockOrders.filter((order) => order.restaurantId === restaurantId)
  },

  // Récupérer une commande par son ID
  getById: async (orderId: string): Promise<Order | undefined> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockOrders.find((order) => order.id === orderId)
  },

  // Mettre à jour une commande
  update: async (orderId: string, data: Partial<Order>): Promise<Order | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 700))

    const orderIndex = mockOrders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) {
      return null
    }

    // Mettre à jour la commande
    const updatedOrder = {
      ...mockOrders[orderIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    mockOrders[orderIndex] = updatedOrder

    return updatedOrder
  },

  // Créer une nouvelle commande
  create: async (data: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800))

    const now = new Date().toISOString()
    const newOrder: Order = {
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      ...data,
    }

    mockOrders.push(newOrder)

    return newOrder
  },

  // Supprimer une commande
  delete: async (orderId: string): Promise<boolean> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 600))

    const orderIndex = mockOrders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) {
      return false
    }

    mockOrders.splice(orderIndex, 1)

    return true
  },
}

// Exporter d'autres APIs au besoin
export const api = {
  tables: tableApi,
  reservations: reservationApi,
  menuItems: menuItemApi,
  customers: customerApi,
  inventory: inventoryApi,
  orders: orderApi,
  // Ajouter d'autres APIs ici
}
