"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  Download,
  Star,
  StarHalf,
  Calendar,
  DollarSign,
  Truck,
  FileText,
  Edit,
  Trash2,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  UserCircle,
} from "lucide-react"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Progress } from "@/components/ui/progress"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types pour les fournisseurs
type Supplier = {
  id: string
  name: string
  contactName: string
  email: string
  phone: string
  address: string
  category: string
  rating: number
  status: "active" | "inactive" | "pending"
  lastOrder: string
  totalSpent: number
  paymentTerms: string
  notes?: string
  website?: string
}

type Product = {
  id: string
  name: string
  category: string
  unit: string
  price: number
  minOrderQuantity: number
  leadTime: number
  supplierId: string
}

type Order = {
  id: string
  supplierId: string
  date: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  total: number
  items: {
    productId: string
    quantity: number
    price: number
  }[]
  paymentStatus: "unpaid" | "partial" | "paid"
  deliveryDate?: string
  notes?: string
}

// Types pour l'analyse des fournisseurs
type SupplierPerformance = {
  supplierId: string
  supplierName: string
  onTimeDelivery: number
  qualityScore: number
  priceCompetitiveness: number
  responseTime: number
  relationshipScore: number
}

type ForecastItem = {
  productId: string
  productName: string
  currentStock: number
  minimumStock: number
  suggestedOrder: number
  supplierName: string
  supplierId: string
  urgency: "low" | "medium" | "high"
  estimatedDepleteDate: string
}

type PriceComparison = {
  productName: string
  suppliers: {
    name: string
    price: number
    deliveryTime: number
    minOrder: number
  }[]
}

// Données mockées pour les fournisseurs
const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Boucherie Centrale",
    contactName: "Jean Dupont",
    email: "contact@boucherie-centrale.com",
    phone: "+33 1 23 45 67 89",
    address: "15 Rue de la Viande, 75001 Paris",
    category: "Viandes",
    rating: 4.5,
    status: "active",
    lastOrder: "2025-04-10",
    totalSpent: 12500,
    paymentTerms: "Net 30",
    notes: "Fournisseur de viande de qualité supérieure",
    website: "https://boucherie-centrale.com",
  },
  {
    id: "2",
    name: "Primeur du Marché",
    contactName: "Marie Martin",
    email: "info@primeur-marche.com",
    phone: "+33 1 98 76 54 32",
    address: "8 Avenue des Légumes, 75002 Paris",
    category: "Légumes",
    rating: 4.0,
    status: "active",
    lastOrder: "2025-04-12",
    totalSpent: 8750,
    paymentTerms: "Net 15",
    notes: "Produits bio et locaux",
    website: "https://primeur-marche.com",
  },
  {
    id: "3",
    name: "Laiterie Parisienne",
    contactName: "Pierre Lefebvre",
    email: "contact@laiterie-parisienne.com",
    phone: "+33 1 45 67 89 01",
    address: "22 Rue du Lait, 75003 Paris",
    category: "Produits laitiers",
    rating: 3.5,
    status: "active",
    lastOrder: "2025-04-08",
    totalSpent: 6200,
    paymentTerms: "Net 30",
    website: "https://laiterie-parisienne.com",
  },
  {
    id: "4",
    name: "Pastificio Italiano",
    contactName: "Luigi Romano",
    email: "info@pastificio-italiano.com",
    phone: "+33 1 23 45 67 89",
    address: "5 Rue de l'Italie, 75004 Paris",
    category: "Pâtes",
    rating: 5.0,
    status: "active",
    lastOrder: "2025-04-05",
    totalSpent: 4800,
    paymentTerms: "Net 15",
    notes: "Pâtes fraîches artisanales",
    website: "https://pastificio-italiano.com",
  },
  {
    id: "5",
    name: "Vins & Spiritueux",
    contactName: "Sophie Bernard",
    email: "contact@vins-spiritueux.com",
    phone: "+33 1 34 56 78 90",
    address: "12 Boulevard des Vins, 75005 Paris",
    category: "Boissons",
    rating: 4.8,
    status: "active",
    lastOrder: "2025-04-01",
    totalSpent: 15600,
    paymentTerms: "Net 45",
    notes: "Grand choix de vins français et internationaux",
    website: "https://vins-spiritueux.com",
  },
  {
    id: "6",
    name: "Épices du Monde",
    contactName: "Ahmed Khalil",
    email: "info@epices-monde.com",
    phone: "+33 1 87 65 43 21",
    address: "3 Rue des Épices, 75006 Paris",
    category: "Épices",
    rating: 4.2,
    status: "inactive",
    lastOrder: "2025-03-15",
    totalSpent: 2300,
    paymentTerms: "Net 30",
    notes: "Épices rares et de qualité",
    website: "https://epices-monde.com",
  },
]

// Données mockées pour les produits
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Entrecôte",
    category: "Viandes",
    unit: "kg",
    price: 22.5,
    minOrderQuantity: 5,
    leadTime: 2,
    supplierId: "1",
  },
  {
    id: "2",
    name: "Filet de bœuf",
    category: "Viandes",
    unit: "kg",
    price: 35.0,
    minOrderQuantity: 3,
    leadTime: 2,
    supplierId: "1",
  },
  {
    id: "3",
    name: "Côtes d'agneau",
    category: "Viandes",
    unit: "kg",
    price: 28.5,
    minOrderQuantity: 4,
    leadTime: 2,
    supplierId: "1",
  },
  {
    id: "4",
    name: "Pommes de terre",
    category: "Légumes",
    unit: "kg",
    price: 1.8,
    minOrderQuantity: 10,
    leadTime: 1,
    supplierId: "2",
  },
  {
    id: "5",
    name: "Carottes bio",
    category: "Légumes",
    unit: "kg",
    price: 2.5,
    minOrderQuantity: 5,
    leadTime: 1,
    supplierId: "2",
  },
  {
    id: "6",
    name: "Crème fraîche",
    category: "Produits laitiers",
    unit: "L",
    price: 3.2,
    minOrderQuantity: 5,
    leadTime: 1,
    supplierId: "3",
  },
  {
    id: "7",
    name: "Pâtes fraîches",
    category: "Pâtes",
    unit: "kg",
    price: 4.5,
    minOrderQuantity: 5,
    leadTime: 3,
    supplierId: "4",
  },
  {
    id: "8",
    name: "Vin rouge Bordeaux",
    category: "Boissons",
    unit: "bouteille",
    price: 12.5,
    minOrderQuantity: 6,
    leadTime: 5,
    supplierId: "5",
  },
  {
    id: "9",
    name: "Poivre noir",
    category: "Épices",
    unit: "kg",
    price: 25.0,
    minOrderQuantity: 1,
    leadTime: 7,
    supplierId: "6",
  },
]

// Données mockées pour les commandes
const mockOrders: Order[] = [
  {
    id: "1",
    supplierId: "1",
    date: "2025-04-10",
    status: "delivered",
    total: 1250.0,
    items: [
      { productId: "1", quantity: 25, price: 22.5 },
      { productId: "2", quantity: 15, price: 35.0 },
    ],
    paymentStatus: "paid",
    deliveryDate: "2025-04-12",
    notes: "Livraison complète et à l'heure",
  },
  {
    id: "2",
    supplierId: "2",
    date: "2025-04-12",
    status: "delivered",
    total: 875.0,
    items: [
      { productId: "4", quantity: 50, price: 1.8 },
      { productId: "5", quantity: 30, price: 2.5 },
    ],
    paymentStatus: "paid",
    deliveryDate: "2025-04-13",
  },
  {
    id: "3",
    supplierId: "3",
    date: "2025-04-08",
    status: "delivered",
    total: 320.0,
    items: [{ productId: "6", quantity: 100, price: 3.2 }],
    paymentStatus: "paid",
    deliveryDate: "2025-04-09",
  },
  {
    id: "4",
    supplierId: "4",
    date: "2025-04-05",
    status: "delivered",
    total: 450.0,
    items: [{ productId: "7", quantity: 100, price: 4.5 }],
    paymentStatus: "paid",
    deliveryDate: "2025-04-08",
  },
  {
    id: "5",
    supplierId: "5",
    date: "2025-04-01",
    status: "delivered",
    total: 1500.0,
    items: [{ productId: "8", quantity: 120, price: 12.5 }],
    paymentStatus: "paid",
    deliveryDate: "2025-04-06",
  },
  {
    id: "6",
    supplierId: "1",
    date: "2025-04-14",
    status: "pending",
    total: 675.0,
    items: [
      { productId: "1", quantity: 15, price: 22.5 },
      { productId: "3", quantity: 10, price: 28.5 },
    ],
    paymentStatus: "unpaid",
  },
]

// Données mockées pour l'analyse des fournisseurs
const mockSupplierPerformance: SupplierPerformance[] = [
  {
    supplierId: "1",
    supplierName: "Boucherie Centrale",
    onTimeDelivery: 92,
    qualityScore: 88,
    priceCompetitiveness: 75,
    responseTime: 95,
    relationshipScore: 90,
  },
  {
    supplierId: "2",
    supplierName: "Primeur du Marché",
    onTimeDelivery: 85,
    qualityScore: 95,
    priceCompetitiveness: 82,
    responseTime: 88,
    relationshipScore: 85,
  },
  {
    supplierId: "3",
    supplierName: "Laiterie Parisienne",
    onTimeDelivery: 78,
    qualityScore: 82,
    priceCompetitiveness: 90,
    responseTime: 75,
    relationshipScore: 80,
  },
  {
    supplierId: "4",
    supplierName: "Pastificio Italiano",
    onTimeDelivery: 98,
    qualityScore: 96,
    priceCompetitiveness: 65,
    responseTime: 92,
    relationshipScore: 95,
  },
  {
    supplierId: "5",
    supplierName: "Vins & Spiritueux",
    onTimeDelivery: 90,
    qualityScore: 90,
    priceCompetitiveness: 70,
    responseTime: 85,
    relationshipScore: 88,
  },
  {
    supplierId: "6",
    supplierName: "Épices du Monde",
    onTimeDelivery: 75,
    qualityScore: 92,
    priceCompetitiveness: 85,
    responseTime: 70,
    relationshipScore: 75,
  },
]

// Données mockées pour les prévisions d'approvisionnement
const mockForecastItems: ForecastItem[] = [
  {
    productId: "1",
    productName: "Entrecôte",
    currentStock: 12,
    minimumStock: 10,
    suggestedOrder: 15,
    supplierName: "Boucherie Centrale",
    supplierId: "1",
    urgency: "medium",
    estimatedDepleteDate: "2025-04-18",
  },
  {
    productId: "4",
    productName: "Pommes de terre",
    currentStock: 8,
    minimumStock: 15,
    suggestedOrder: 25,
    supplierName: "Primeur du Marché",
    supplierId: "2",
    urgency: "high",
    estimatedDepleteDate: "2025-04-16",
  },
  {
    productId: "6",
    productName: "Crème fraîche",
    currentStock: 7,
    minimumStock: 5,
    suggestedOrder: 10,
    supplierName: "Laiterie Parisienne",
    supplierId: "3",
    urgency: "low",
    estimatedDepleteDate: "2025-04-20",
  },
  {
    productId: "8",
    productName: "Vin rouge Bordeaux",
    currentStock: 24,
    minimumStock: 18,
    suggestedOrder: 12,
    supplierName: "Vins & Spiritueux",
    supplierId: "5",
    urgency: "low",
    estimatedDepleteDate: "2025-04-25",
  },
  {
    productId: "9",
    productName: "Poivre noir",
    currentStock: 2,
    minimumStock: 3,
    suggestedOrder: 5,
    supplierName: "Épices du Monde",
    supplierId: "6",
    urgency: "high",
    estimatedDepleteDate: "2025-04-15",
  },
]

// Données mockées pour la comparaison des prix
const mockPriceComparisons: PriceComparison[] = [
  {
    productName: "Viande hachée (kg)",
    suppliers: [
      { name: "Boucherie Centrale", price: 12.5, deliveryTime: 2, minOrder: 5 },
      { name: "Viandes Premium", price: 14.8, deliveryTime: 1, minOrder: 3 },
      { name: "Grossiste Viandes", price: 11.2, deliveryTime: 3, minOrder: 10 },
    ],
  },
  {
    productName: "Tomates (kg)",
    suppliers: [
      { name: "Primeur du Marché", price: 2.8, deliveryTime: 1, minOrder: 5 },
      { name: "Légumes Bio", price: 3.5, deliveryTime: 1, minOrder: 3 },
      { name: "Grossiste Légumes", price: 2.2, deliveryTime: 2, minOrder: 15 },
    ],
  },
  {
    productName: "Huile d'olive (L)",
    suppliers: [
      { name: "Épicerie Fine", price: 15.5, deliveryTime: 3, minOrder: 2 },
      { name: "Importateur Direct", price: 12.8, deliveryTime: 5, minOrder: 5 },
      { name: "Grossiste Épicerie", price: 10.5, deliveryTime: 4, minOrder: 10 },
    ],
  },
]

// Données pour le graphique d'historique des prix
const priceHistoryData = [
  { month: "Avr", "Viande hachée": 12.5, Tomates: 2.8, "Huile d'olive": 15.5 },
  { month: "Mai", "Viande hachée": 12.8, Tomates: 2.5, "Huile d'olive": 15.5 },
  { month: "Juin", "Viande hachée": 13.2, Tomates: 2.2, "Huile d'olive": 16.0 },
  { month: "Juil", "Viande hachée": 13.5, Tomates: 1.8, "Huile d'olive": 16.0 },
  { month: "Août", "Viande hachée": 13.5, Tomates: 1.5, "Huile d'olive": 16.5 },
  { month: "Sept", "Viande hachée": 13.2, Tomates: 1.9, "Huile d'olive": 16.5 },
  { month: "Oct", "Viande hachée": 12.8, Tomates: 2.2, "Huile d'olive": 16.0 },
  { month: "Nov", "Viande hachée": 12.5, Tomates: 2.5, "Huile d'olive": 15.5 },
  { month: "Déc", "Viande hachée": 12.2, Tomates: 2.8, "Huile d'olive": 15.0 },
  { month: "Jan", "Viande hachée": 12.0, Tomates: 3.0, "Huile d'olive": 14.5 },
  { month: "Fév", "Viande hachée": 12.2, Tomates: 3.2, "Huile d'olive": 14.5 },
  { month: "Mar", "Viande hachée": 12.5, Tomates: 3.0, "Huile d'olive": 15.0 },
]

// Fonction pour afficher les étoiles de notation
function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
      {Array(5 - fullStars - (hasHalfStar ? 1 : 0))
        .fill(0)
        .map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />
        ))}
      <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  )
}

// Composant pour le statut du fournisseur
function SupplierStatusBadge({ status }: { status: Supplier["status"] }) {
  const statusConfig = {
    active: { label: "Actif", className: "bg-green-100 text-green-800" },
    inactive: { label: "Inactif", className: "bg-red-100 text-red-800" },
    pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
  }

  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

// Composant pour le statut de la commande
function OrderStatusBadge({ status }: { status: Order["status"] }) {
  const statusConfig = {
    pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
    confirmed: { label: "Confirmée", className: "bg-blue-100 text-blue-800" },
    shipped: { label: "Expédiée", className: "bg-purple-100 text-purple-800" },
    delivered: { label: "Livrée", className: "bg-green-100 text-green-800" },
    cancelled: { label: "Annulée", className: "bg-red-100 text-red-800" },
  }

  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

// Composant pour le statut de paiement
function PaymentStatusBadge({ status }: { status: Order["paymentStatus"] }) {
  const statusConfig = {
    unpaid: { label: "Non payé", className: "bg-red-100 text-red-800" },
    partial: { label: "Partiel", className: "bg-yellow-100 text-yellow-800" },
    paid: { label: "Payé", className: "bg-green-100 text-green-800" },
  }

  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

// Composant pour le formulaire d'ajout/modification de fournisseur
function SupplierForm({
  supplier,
  onSubmit,
  onCancel,
}: {
  supplier?: Supplier
  onSubmit: (data: Partial<Supplier>) => void
  onCancel: () => void
}) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom du fournisseur</Label>
          <Input id="name" defaultValue={supplier?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactName">Nom du contact</Label>
          <Input id="contactName" defaultValue={supplier?.contactName} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={supplier?.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" defaultValue={supplier?.phone} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input id="address" defaultValue={supplier?.address} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select defaultValue={supplier?.category}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Viandes">Viandes</SelectItem>
              <SelectItem value="Légumes">Légumes</SelectItem>
              <SelectItem value="Produits laitiers">Produits laitiers</SelectItem>
              <SelectItem value="Pâtes">Pâtes</SelectItem>
              <SelectItem value="Boissons">Boissons</SelectItem>
              <SelectItem value="Épices">Épices</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select defaultValue={supplier?.status}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="paymentTerms">Conditions de paiement</Label>
          <Select defaultValue={supplier?.paymentTerms}>
            <SelectTrigger id="paymentTerms">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Net 15">Net 15</SelectItem>
              <SelectItem value="Net 30">Net 30</SelectItem>
              <SelectItem value="Net 45">Net 45</SelectItem>
              <SelectItem value="Net 60">Net 60</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Site web</Label>
          <Input id="website" defaultValue={supplier?.website} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" defaultValue={supplier?.notes} />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSubmit({})}>Enregistrer</Button>
      </DialogFooter>
    </div>
  )
}

// Composant pour le formulaire d'ajout/modification de produit
function ProductForm({
  product,
  supplierId,
  onSubmit,
  onCancel,
}: {
  product?: Product
  supplierId: string
  onSubmit: (data: Partial<Product>) => void
  onCancel: () => void
}) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom du produit</Label>
          <Input id="name" defaultValue={product?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select defaultValue={product?.category}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Viandes">Viandes</SelectItem>
              <SelectItem value="Légumes">Légumes</SelectItem>
              <SelectItem value="Produits laitiers">Produits laitiers</SelectItem>
              <SelectItem value="Pâtes">Pâtes</SelectItem>
              <SelectItem value="Boissons">Boissons</SelectItem>
              <SelectItem value="Épices">Épices</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Prix unitaire (€)</Label>
          <Input id="price" type="number" step="0.01" defaultValue={product?.price} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unité</Label>
          <Select defaultValue={product?.unit}>
            <SelectTrigger id="unit">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilogramme (kg)</SelectItem>
              <SelectItem value="g">Gramme (g)</SelectItem>
              <SelectItem value="L">Litre (L)</SelectItem>
              <SelectItem value="ml">Millilitre (ml)</SelectItem>
              <SelectItem value="unité">Unité</SelectItem>
              <SelectItem value="bouteille">Bouteille</SelectItem>
              <SelectItem value="carton">Carton</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="minOrderQuantity">Quantité min.</Label>
          <Input id="minOrderQuantity" type="number" defaultValue={product?.minOrderQuantity} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="leadTime">Délai de livraison (jours)</Label>
        <Input id="leadTime" type="number" defaultValue={product?.leadTime} />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSubmit({})}>Enregistrer</Button>
      </DialogFooter>
    </div>
  )
}

// Composant pour le formulaire de commande
function OrderForm({
  order,
  supplierId,
  products,
  onSubmit,
  onCancel,
}: {
  order?: Order
  supplierId: string
  products: Product[]
  onSubmit: (data: Partial<Order>) => void
  onCancel: () => void
}) {
  const [items, setItems] = useState(order?.items || [{ productId: "", quantity: 1, price: 0 }])

  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1, price: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }

    // Si le produit change, mettre à jour le prix
    if (field === "productId") {
      const product = products.find((p) => p.id === value)
      if (product) {
        newItems[index].price = product.price
      }
    }

    setItems(newItems)
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date de commande</Label>
          <Input id="date" type="date" defaultValue={order?.date || new Date().toISOString().split("T")[0]} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select defaultValue={order?.status || "pending"}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="confirmed">Confirmée</SelectItem>
              <SelectItem value="shipped">Expédiée</SelectItem>
              <SelectItem value="delivered">Livrée</SelectItem>
              <SelectItem value="cancelled">Annulée</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Articles</Label>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="mr-1 h-4 w-4" /> Ajouter un article
          </Button>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-5 space-y-2">
              <Label htmlFor={`product-${index}`}>Produit</Label>
              <Select value={item.productId} onValueChange={(value) => updateItem(index, "productId", value)}>
                <SelectTrigger id={`product-${index}`}>
                  <SelectValue placeholder="Sélectionner un produit" />
                </SelectTrigger>
                <SelectContent>
                  {products
                    .filter((p) => p.supplierId === supplierId)
                    .map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} ({product.price.toFixed(2)} €/{product.unit})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor={`quantity-${index}`}>Quantité</Label>
              <Input
                id={`quantity-${index}`}
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="col-span-3 space-y-2">
              <Label htmlFor={`price-${index}`}>Prix unitaire (€)</Label>
              <Input
                id={`price-${index}`}
                type="number"
                step="0.01"
                value={item.price}
                onChange={(e) => updateItem(index, "price", Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-end text-sm font-medium">Total: {calculateTotal().toFixed(2)} €</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="paymentStatus">Statut de paiement</Label>
          <Select defaultValue={order?.paymentStatus || "unpaid"}>
            <SelectTrigger id="paymentStatus">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unpaid">Non payé</SelectItem>
              <SelectItem value="partial">Partiel</SelectItem>
              <SelectItem value="paid">Payé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliveryDate">Date de livraison prévue</Label>
          <Input id="deliveryDate" type="date" defaultValue={order?.deliveryDate} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" defaultValue={order?.notes} />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSubmit({ items, total: calculateTotal() })}>
          {order ? "Mettre à jour" : "Créer la commande"}
        </Button>
      </DialogFooter>
    </div>
  )
}

// Composant pour l'évaluation des fournisseurs
function SupplierEvaluation() {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("all")

  const filteredData =
    selectedSupplier === "all"
      ? mockSupplierPerformance
      : mockSupplierPerformance.filter((s) => s.supplierId === selectedSupplier)

  const radarData = filteredData.map((supplier) => ({
    supplierName: supplier.supplierName,
    "Livraison à temps": supplier.onTimeDelivery,
    Qualité: supplier.qualityScore,
    "Compétitivité des prix": supplier.priceCompetitiveness,
    "Temps de réponse": supplier.responseTime,
    Relation: supplier.relationshipScore,
  }))

  const barData = mockSupplierPerformance.map((supplier) => ({
    name: supplier.supplierName,
    "Score global":
      (supplier.onTimeDelivery +
        supplier.qualityScore +
        supplier.priceCompetitiveness +
        supplier.responseTime +
        supplier.relationshipScore) /
      5,
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Évaluation comparative des fournisseurs</h3>
        <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tous les fournisseurs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les fournisseurs</SelectItem>
            {mockSupplierPerformance.map((supplier) => (
              <SelectItem key={supplier.supplierId} value={supplier.supplierId}>
                {supplier.supplierName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Performance globale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}/100`, "Score"]} />
                  <Bar dataKey="Score global" fill="#8884d8">
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Analyse détaillée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData[0] ? [radarData[0]] : []}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="supplierName" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Livraison à temps"
                    dataKey="Livraison à temps"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar name="Qualité" dataKey="Qualité" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Radar
                    name="Compétitivité des prix"
                    dataKey="Compétitivité des prix"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Temps de réponse"
                    dataKey="Temps de réponse"
                    stroke="#ff8042"
                    fill="#ff8042"
                    fillOpacity={0.6}
                  />
                  <Radar name="Relation" dataKey="Relation" stroke="#0088fe" fill="#0088fe" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Recommandations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedSupplier === "all" ? (
                <div className="text-center text-muted-foreground">
                  Sélectionnez un fournisseur pour voir des recommandations spécifiques
                </div>
              ) : (
                <>
                  {selectedSupplier === "1" && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Négocier de meilleurs prix</span>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Priorité moyenne
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          La compétitivité des prix est le point faible de ce fournisseur. Envisagez de négocier des
                          remises sur volume ou des conditions de paiement plus favorables.
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Maintenir la relation</span>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Priorité basse
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ce fournisseur offre une excellente qualité et livraison à temps. Continuez à entretenir cette
                          relation commerciale.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedSupplier === "2" && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Améliorer la ponctualité des livraisons</span>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Priorité moyenne
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Discutez avec ce fournisseur pour améliorer la ponctualité des livraisons, qui est légèrement
                          en dessous de la moyenne.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedSupplier === "3" && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Améliorer le temps de réponse</span>
                          <Badge variant="outline" className="bg-red-100 text-red-800">
                            Priorité haute
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Le temps de réponse de ce fournisseur est problématique. Envisagez de mettre en place un
                          système de communication plus efficace ou de chercher des alternatives.
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Améliorer la ponctualité des livraisons</span>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Priorité moyenne
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Les livraisons sont souvent en retard. Établissez un calendrier de livraison plus strict.
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Composant pour les prévisions d'approvisionnement
function SupplyForecast() {
  const getUrgencyColor = (urgency: ForecastItem["urgency"]) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return ""
    }
  }

  const getProgressColor = (current: number, min: number) => {
    const ratio = current / min
    if (ratio < 0.5) return "bg-red-600"
    if (ratio < 1) return "bg-yellow-600"
    return "bg-green-600"
  }

  const getProgressValue = (current: number, min: number) => {
    const ratio = (current / min) * 100
    return Math.min(ratio, 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Prévisions automatiques des besoins en approvisionnement</h3>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Exporter
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Produits à commander</CardTitle>
          <CardDescription>
            Basé sur les niveaux de stock actuels, l'historique des ventes et les délais de livraison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Stock actuel</TableHead>
                <TableHead>Stock minimum</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Commande suggérée</TableHead>
                <TableHead>Urgence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockForecastItems.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell>{item.currentStock}</TableCell>
                  <TableCell>{item.minimumStock}</TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Progress
                        value={getProgressValue(item.currentStock, item.minimumStock)}
                        className={getProgressColor(item.currentStock, item.minimumStock)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{item.supplierName}</TableCell>
                  <TableCell>{item.suggestedOrder}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getUrgencyColor(item.urgency)}>
                      {item.urgency === "high" ? "Haute" : item.urgency === "medium" ? "Moyenne" : "Basse"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Prévision de consommation</CardTitle>
            <CardDescription>Basée sur l'historique des 12 derniers mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Viande hachée" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Tomates" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Huile d'olive" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Analyse saisonnière</CardTitle>
            <CardDescription>Impact des saisons sur les prix et la disponibilité</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Produits à surveiller ce trimestre</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Tomates</span>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        +15% attendu
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">Fin de saison</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Asperges</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        -20% attendu
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">Début de saison</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Huile d'olive</span>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        +5% attendu
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">Fluctuation saisonnière</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recommandations</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Anticiper les commandes de tomates avant la hausse des prix</li>
                  <li>• Profiter de la baisse des prix des asperges pour les mettre en avant</li>
                  <li>• Envisager des alternatives à l'huile d'olive pour certaines préparations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Composant pour la comparaison des prix
function PriceComparison() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Comparaison des prix entre fournisseurs</h3>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Analyse comparative des prix</CardTitle>
          <CardDescription>
            Comparez les prix, délais de livraison et quantités minimales entre fournisseurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockPriceComparisons.map((comparison, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-medium">{comparison.productName}</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fournisseur</TableHead>
                      <TableHead>Prix (€)</TableHead>
                      <TableHead>Délai (jours)</TableHead>
                      <TableHead>Commande min.</TableHead>
                      <TableHead>Coût total min.</TableHead>
                      <TableHead>Recommandation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparison.suppliers.map((supplier, supplierIndex) => {
                      const totalMinCost = supplier.price * supplier.minOrder
                      const isLowestPrice = comparison.suppliers.every(
                        (s) => s === supplier || s.price >= supplier.price,
                      )
                      const isLowestTotalCost = comparison.suppliers.every(
                        (s) => s === supplier || s.price * s.minOrder >= totalMinCost,
                      )
                      const isFastestDelivery = comparison.suppliers.every(
                        (s) => s === supplier || s.deliveryTime >= supplier.deliveryTime,
                      )

                      let recommendation = ""
                      if (isLowestTotalCost) recommendation = "Meilleur rapport qualité-prix"
                      else if (isLowestPrice) recommendation = "Prix unitaire le plus bas"
                      else if (isFastestDelivery) recommendation = "Livraison la plus rapide"

                      return (
                        <TableRow key={supplierIndex}>
                          <TableCell>{supplier.name}</TableCell>
                          <TableCell className={isLowestPrice ? "font-bold text-green-600" : ""}>
                            {supplier.price.toFixed(2)}
                          </TableCell>
                          <TableCell className={isFastestDelivery ? "font-bold text-green-600" : ""}>
                            {supplier.deliveryTime}
                          </TableCell>
                          <TableCell>{supplier.minOrder}</TableCell>
                          <TableCell className={isLowestTotalCost ? "font-bold text-green-600" : ""}>
                            {totalMinCost.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {recommendation && (
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                {recommendation}
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
                {index < mockPriceComparisons.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Évolution des prix sur 12 mois</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Viande hachée" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Tomates" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Huile d'olive" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Modifier le composant principal pour ajouter les nouveaux onglets
export default function SuppliersPage() {
  const params = useParams<{ restaurantId: string }>()
  const restaurantId = params.restaurantId
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("suppliers")
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false)
  const [mainTab, setMainTab] = useState("list")

  // Filtrer les fournisseurs en fonction des critères de recherche
  const filteredSuppliers = mockSuppliers.filter((supplier) => {
    const matchesSearch =
      searchTerm === "" ||
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === null || supplier.category === selectedCategory
    const matchesStatus = selectedStatus === null || supplier.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Obtenir les produits du fournisseur sélectionné
  const supplierProducts = selectedSupplier
    ? mockProducts.filter((product) => product.supplierId === selectedSupplier.id)
    : []

  // Obtenir les commandes du fournisseur sélectionné
  const supplierOrders = selectedSupplier ? mockOrders.filter((order) => order.supplierId === selectedSupplier.id) : []

  // Gérer la soumission du formulaire de fournisseur
  const handleSupplierSubmit = (data: Partial<Supplier>) => {
    console.log("Supplier data submitted:", data)
    setIsAddSupplierOpen(false)
  }

  // Gérer la soumission du formulaire de produit
  const handleProductSubmit = (data: Partial<Product>) => {
    console.log("Product data submitted:", data)
    setIsAddProductOpen(false)
  }

  // Gérer la soumission du formulaire de commande
  const handleOrderSubmit = (data: Partial<Order>) => {
    console.log("Order data submitted:", data)
    setIsAddOrderOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des fournisseurs</h1>
        <div className="flex items-center gap-2">
          <Dialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Ajouter un fournisseur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau fournisseur</DialogTitle>
                <DialogDescription>Remplissez les informations du fournisseur ci-dessous.</DialogDescription>
              </DialogHeader>
              <SupplierForm onSubmit={handleSupplierSubmit} onCancel={() => setIsAddSupplierOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={mainTab} onValueChange={setMainTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="list">Liste des fournisseurs</TabsTrigger>
          <TabsTrigger value="evaluation">Évaluation comparative</TabsTrigger>
          <TabsTrigger value="forecast">Prévisions d'approvisionnement</TabsTrigger>
          <TabsTrigger value="prices">Comparaison des prix</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-2/3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Liste des fournisseurs</CardTitle>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" /> Filtrer
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Filtrer par catégorie</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                            Toutes les catégories
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedCategory("Viandes")}>Viandes</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedCategory("Légumes")}>Légumes</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedCategory("Produits laitiers")}>
                            Produits laitiers
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedCategory("Pâtes")}>Pâtes</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedCategory("Boissons")}>Boissons</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedCategory("Épices")}>Épices</DropdownMenuItem>
                          <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setSelectedStatus(null)}>Tous les statuts</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedStatus("active")}>Actif</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedStatus("inactive")}>Inactif</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedStatus("pending")}>En attente</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Exporter
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un fournisseur..."
                      className="h-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Évaluation</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Dernière commande</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSuppliers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">
                            Aucun fournisseur trouvé
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredSuppliers.map((supplier) => (
                          <TableRow
                            key={supplier.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedSupplier(supplier)}
                          >
                            <TableCell className="font-medium">{supplier.name}</TableCell>
                            <TableCell>{supplier.category}</TableCell>
                            <TableCell>
                              <RatingStars rating={supplier.rating} />
                            </TableCell>
                            <TableCell>
                              <SupplierStatusBadge status={supplier.status} />
                            </TableCell>
                            <TableCell>{supplier.lastOrder}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-1/3">
              {selectedSupplier ? (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{selectedSupplier.name}</CardTitle>
                      <SupplierStatusBadge status={selectedSupplier.status} />
                    </div>
                    <CardDescription>{selectedSupplier.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="suppliers">Détails</TabsTrigger>
                        <TabsTrigger value="products">Produits</TabsTrigger>
                        <TabsTrigger value="orders">Commandes</TabsTrigger>
                      </TabsList>
                      <TabsContent value="suppliers" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <UserCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedSupplier.contactName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedSupplier.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedSupplier.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedSupplier.address}</span>
                          </div>
                          {selectedSupplier.website && (
                            <div className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={selectedSupplier.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {selectedSupplier.website}
                              </a>
                            </div>
                          )}
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Dernière commande</span>
                            </div>
                            <span className="text-sm font-medium">{selectedSupplier.lastOrder}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Total dépensé</span>
                            </div>
                            <span className="text-sm font-medium">{selectedSupplier.totalSpent.toFixed(2)} €</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Conditions de paiement</span>
                            </div>
                            <span className="text-sm font-medium">{selectedSupplier.paymentTerms}</span>
                          </div>
                        </div>
                        {selectedSupplier.notes && (
                          <>
                            <Separator />
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Notes</h4>
                              <p className="text-sm text-muted-foreground">{selectedSupplier.notes}</p>
                            </div>
                          </>
                        )}
                      </TabsContent>
                      <TabsContent value="products" className="pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium">Produits ({supplierProducts.length})</h4>
                          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <Plus className="mr-2 h-3 w-3" /> Ajouter
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                                <DialogDescription>
                                  Remplissez les informations du produit ci-dessous.
                                </DialogDescription>
                              </DialogHeader>
                              <ProductForm
                                supplierId={selectedSupplier.id}
                                onSubmit={handleProductSubmit}
                                onCancel={() => setIsAddProductOpen(false)}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                        {supplierProducts.length === 0 ? (
                          <div className="text-center py-4 text-muted-foreground">
                            Aucun produit disponible pour ce fournisseur
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {supplierProducts.map((product) => (
                              <Card key={product.id}>
                                <CardContent className="p-3">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-medium">{product.name}</h4>
                                      <p className="text-sm text-muted-foreground">{product.category}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">
                                        {product.price.toFixed(2)} €/{product.unit}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Min: {product.minOrderQuantity} {product.unit} | Délai: {product.leadTime} jours
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="orders" className="pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium">Commandes ({supplierOrders.length})</h4>
                          <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <Plus className="mr-2 h-3 w-3" /> Commander
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[700px]">
                              <DialogHeader>
                                <DialogTitle>Créer une nouvelle commande</DialogTitle>
                                <DialogDescription>Remplissez les détails de la commande ci-dessous.</DialogDescription>
                              </DialogHeader>
                              <OrderForm
                                supplierId={selectedSupplier.id}
                                products={mockProducts}
                                onSubmit={handleOrderSubmit}
                                onCancel={() => setIsAddOrderOpen(false)}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                        {supplierOrders.length === 0 ? (
                          <div className="text-center py-4 text-muted-foreground">
                            Aucune commande pour ce fournisseur
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {supplierOrders.map((order) => (
                              <Card key={order.id}>
                                <CardContent className="p-3">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-medium">Commande #{order.id}</h4>
                                        <OrderStatusBadge status={order.status} />
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {order.date} | {order.items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                                        articles
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">{order.total.toFixed(2)} €</p>
                                      <PaymentStatusBadge status={order.paymentStatus} />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
                      Retour à la liste
                    </Button>
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" /> Modifier
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="rounded-full bg-muted p-3">
                        <Truck className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">Aucun fournisseur sélectionné</h3>
                      <p className="text-sm text-muted-foreground">
                        Sélectionnez un fournisseur dans la liste pour voir ses détails, produits et commandes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="evaluation">
          <SupplierEvaluation />
        </TabsContent>

        <TabsContent value="forecast">
          <SupplyForecast />
        </TabsContent>

        <TabsContent value="prices">
          <PriceComparison />
        </TabsContent>
      </Tabs>
    </div>
  )
}
