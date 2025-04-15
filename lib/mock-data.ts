export interface StaffMember {
  id: string
  name: string
  role: string
  hourlyRate: number
  hoursPerWeek: number
  schedule: { day: string; start: string; end: string }[]
}

export interface FinancialData {
  dailyRevenue: { date: string; revenue: number }[]
  monthlySummary: {
    revenue: number
    expenses: number
    profit: number
    averageOrderValue: number
    topSellingItems: { id: string; name: string; quantity: number; revenue: number }[]
  }
}

export interface Table {
  id: string
  restaurantId: string
  number: number
  capacity: number
  status: "available" | "occupied" | "reserved" | "cleaning"
  currentOrderId?: string
}

export interface Order {
  id: string
  restaurantId: string
  tableId?: string
  customerId: string
  items: { id: string; name: string; quantity: number; price: number }[]
  status: "pending" | "preparing" | "served" | "completed" | "cancelled"
  total: number
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: string
  restaurantId: string
  name: string
  email: string
  phone: string
  loyaltyPoints: number
  visits: number
  lastVisit: string
  preferences: string[]
  allergies: string[]
}

export interface Reservation {
  id: string
  restaurantId: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  date: string
  time: string
  partySize: number
  tableId?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes?: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  allergens?: string[]
  available: boolean
  category: string
  restaurantId: string
}

export interface InventoryItem {
  id: string
  name: string
  quantity: number
  unit: string
  minQuantity: number
  price: number
  supplier: string
  category: string
  restaurantId: string
}

export interface Restaurant {
  id: string
  name: string
  address: string
  phone: string
  email: string
  openingHours: {
    monday: { open: string; close: string }
    tuesday: { open: string; close: string }
    wednesday: { open: string; close: string }
    thursday: { open: string; close: string }
    friday: { open: string; close: string }
    saturday: { open: string; close: string }
    sunday: { open: string; close: string }
  }
  image: string
}

export const mockStaff: StaffMember[] = [
  {
    id: "staff1",
    name: "Alexandre Martin",
    role: "manager",
    hourlyRate: 25,
    hoursPerWeek: 40,
    schedule: [
      { day: "Lundi", start: "09:00", end: "17:00" },
      { day: "Mardi", start: "09:00", end: "17:00" },
      { day: "Mercredi", start: "09:00", end: "17:00" },
      { day: "Jeudi", start: "09:00", end: "17:00" },
      { day: "Vendredi", start: "09:00", end: "17:00" },
    ],
  },
  {
    id: "staff2",
    name: "Sophie Dubois",
    role: "chef",
    hourlyRate: 22,
    hoursPerWeek: 45,
    schedule: [
      { day: "Mardi", start: "14:00", end: "23:00" },
      { day: "Mercredi", start: "14:00", end: "23:00" },
      { day: "Jeudi", start: "14:00", end: "23:00" },
      { day: "Vendredi", start: "14:00", end: "23:00" },
      { day: "Samedi", start: "14:00", end: "23:00" },
    ],
  },
  {
    id: "staff3",
    name: "Thomas Leroy",
    role: "server",
    hourlyRate: 14,
    hoursPerWeek: 35,
    schedule: [
      { day: "Mercredi", start: "18:00", end: "23:00" },
      { day: "Jeudi", start: "18:00", end: "23:00" },
      { day: "Vendredi", start: "18:00", end: "23:00" },
      { day: "Samedi", start: "18:00", end: "23:00" },
      { day: "Dimanche", start: "18:00", end: "23:00" },
    ],
  },
  {
    id: "staff4",
    name: "Julie Moreau",
    role: "bartender",
    hourlyRate: 13,
    hoursPerWeek: 30,
    schedule: [
      { day: "Mercredi", start: "17:00", end: "01:00" },
      { day: "Jeudi", start: "17:00", end: "01:00" },
      { day: "Vendredi", start: "17:00", end: "02:00" },
      { day: "Samedi", start: "17:00", end: "02:00" },
    ],
  },
  {
    id: "staff5",
    name: "Nicolas Bernard",
    role: "kitchen_staff",
    hourlyRate: 16,
    hoursPerWeek: 40,
    schedule: [
      { day: "Lundi", start: "10:00", end: "18:00" },
      { day: "Mardi", start: "10:00", end: "18:00" },
      { day: "Mercredi", start: "10:00", end: "18:00" },
      { day: "Jeudi", start: "10:00", end: "18:00" },
      { day: "Vendredi", start: "10:00", end: "18:00" },
    ],
  },
]

export const mockFinancialData: FinancialData = {
  dailyRevenue: [
    { date: "2025-04-07", revenue: 1250.75 },
    { date: "2025-04-08", revenue: 1345.2 },
    { date: "2025-04-09", revenue: 1190.5 },
    { date: "2025-04-10", revenue: 1420.3 },
    { date: "2025-04-11", revenue: 1780.9 },
    { date: "2025-04-12", revenue: 2150.4 },
    { date: "2025-04-13", revenue: 1890.6 },
  ],
  monthlySummary: {
    revenue: 35800.5,
    expenses: 22450.75,
    profit: 13349.75,
    averageOrderValue: 42.35,
    topSellingItems: [
      { id: "item1", name: "Entrecôte grillée", quantity: 145, revenue: 4350.0 },
      { id: "item2", name: "Saumon en croûte", quantity: 120, revenue: 3240.0 },
      { id: "item3", name: "Tiramisu maison", quantity: 180, revenue: 1620.0 },
      { id: "item4", name: "Cocktail signature", quantity: 210, revenue: 2100.0 },
    ],
  },
}

export const mockTables: Table[] = [
  { id: "table1", restaurantId: "1", number: 1, capacity: 2, status: "available" },
  { id: "table2", restaurantId: "1", number: 2, capacity: 2, status: "occupied", currentOrderId: "order1" },
  { id: "table3", restaurantId: "1", number: 3, capacity: 4, status: "reserved" },
  { id: "table4", restaurantId: "1", number: 4, capacity: 4, status: "available" },
  { id: "table5", restaurantId: "1", number: 5, capacity: 6, status: "occupied", currentOrderId: "order2" },
  { id: "table6", restaurantId: "1", number: 6, capacity: 6, status: "cleaning" },
  { id: "table7", restaurantId: "1", number: 7, capacity: 8, status: "available" },
  { id: "table8", restaurantId: "1", number: 8, capacity: 8, status: "reserved" },
]

export const mockOrders: Order[] = [
  {
    id: "order1",
    restaurantId: "1",
    tableId: "table2",
    customerId: "customer1",
    items: [
      { id: "item1", name: "Entrecôte grillée", quantity: 1, price: 30.0 },
      { id: "item4", name: "Cocktail signature", quantity: 2, price: 10.0 },
    ],
    status: "preparing",
    total: 50.0,
    createdAt: "2025-04-13T18:30:00Z",
    updatedAt: "2025-04-13T18:35:00Z",
  },
  {
    id: "order2",
    restaurantId: "1",
    tableId: "table5",
    customerId: "customer2",
    items: [
      { id: "item2", name: "Saumon en croûte", quantity: 2, price: 27.0 },
      { id: "item3", name: "Tiramisu maison", quantity: 2, price: 9.0 },
      { id: "item4", name: "Cocktail signature", quantity: 2, price: 10.0 },
    ],
    status: "served",
    total: 92.0,
    createdAt: "2025-04-13T19:15:00Z",
    updatedAt: "2025-04-13T19:45:00Z",
  },
  {
    id: "order3",
    restaurantId: "1",
    customerId: "customer3",
    items: [
      { id: "item1", name: "Entrecôte grillée", quantity: 1, price: 30.0 },
      { id: "item3", name: "Tiramisu maison", quantity: 1, price: 9.0 },
    ],
    status: "pending",
    total: 39.0,
    createdAt: "2025-04-13T20:00:00Z",
    updatedAt: "2025-04-13T20:00:00Z",
  },
]

export const mockCustomers: Customer[] = [
  {
    id: "customer1",
    restaurantId: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33612345678",
    loyaltyPoints: 120,
    visits: 8,
    lastVisit: "2025-04-10",
    preferences: ["Viande", "Vin rouge"],
    allergies: [],
  },
  {
    id: "customer2",
    restaurantId: "1",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    phone: "+33623456789",
    loyaltyPoints: 85,
    visits: 5,
    lastVisit: "2025-04-13",
    preferences: ["Poisson", "Vin blanc"],
    allergies: ["Fruits à coque"],
  },
  {
    id: "customer3",
    restaurantId: "1",
    name: "Pierre Lefevre",
    email: "pierre.lefevre@example.com",
    phone: "+33634567890",
    loyaltyPoints: 45,
    visits: 3,
    lastVisit: "2025-04-13",
    preferences: ["Desserts", "Cocktails"],
    allergies: ["Lactose"],
  },
]

export const mockReservations: Reservation[] = [
  {
    id: "reservation1",
    restaurantId: "1",
    customerName: "Jean Dupont",
    customerEmail: "jean.dupont@example.com",
    customerPhone: "+33612345678",
    date: "2025-04-15",
    time: "19:30",
    partySize: 4,
    tableId: "table3",
    status: "confirmed",
    notes: "Anniversaire",
  },
  {
    id: "reservation2",
    restaurantId: "1",
    customerName: "Marie Martin",
    customerEmail: "marie.martin@example.com",
    customerPhone: "+33623456789",
    date: "2025-04-16",
    time: "20:00",
    partySize: 2,
    tableId: "table4",
    status: "pending",
  },
]

export const mockMenuItems: MenuItem[] = [
  {
    id: "item1",
    name: "Entrecôte grillée",
    description: "Entrecôte de bœuf grillée, sauce au poivre, frites maison",
    price: 30.0,
    image: "/placeholder.svg?height=120&width=200",
    allergens: ["gluten"],
    available: true,
    category: "Plats",
    restaurantId: "1",
  },
  {
    id: "item2",
    name: "Saumon en croûte",
    description: "Filet de saumon en croûte d'herbes, sauce au beurre blanc, légumes de saison",
    price: 27.0,
    image: "/placeholder.svg?height=120&width=200",
    allergens: ["poisson", "gluten"],
    available: true,
    category: "Plats",
    restaurantId: "1",
  },
  {
    id: "item3",
    name: "Tiramisu maison",
    description: "Tiramisu traditionnel à la mascarpone et au café",
    price: 9.0,
    image: "/placeholder.svg?height=120&width=200",
    allergens: ["lait", "gluten"],
    available: true,
    category: "Desserts",
    restaurantId: "1",
  },
  {
    id: "item4",
    name: "Cocktail signature",
    description: "Cocktail maison à base de gin, citron vert et concombre",
    price: 10.0,
    image: "/placeholder.svg?height=120&width=200",
    allergens: [],
    available: true,
    category: "Boissons",
    restaurantId: "1",
  },
]

export const mockInventory: InventoryItem[] = [
  {
    id: "inv1",
    name: "Entrecôte",
    quantity: 10,
    unit: "kg",
    minQuantity: 5,
    price: 25.0,
    supplier: "Boucherie Centrale",
    category: "Viandes",
    restaurantId: "1",
  },
  {
    id: "inv2",
    name: "Saumon",
    quantity: 15,
    unit: "kg",
    minQuantity: 10,
    price: 20.0,
    supplier: "Poissonnerie du Marché",
    category: "Poissons",
    restaurantId: "1",
  },
  {
    id: "inv3",
    name: "Mascarpone",
    quantity: 20,
    unit: "kg",
    minQuantity: 10,
    price: 12.0,
    supplier: "Laiterie Parisienne",
    category: "Produits laitiers",
    restaurantId: "1",
  },
  {
    id: "inv4",
    name: "Gin",
    quantity: 10,
    unit: "bouteille",
    minQuantity: 5,
    price: 20.0,
    supplier: "Cave à vins",
    category: "Boissons",
    restaurantId: "1",
  },
]

export const mockRestaurant: Restaurant = {
  id: "1",
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
