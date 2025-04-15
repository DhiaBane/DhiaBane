import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Download,
  FileText,
  Plus,
  ArrowUpRight,
  DollarSign,
  Building2,
  CreditCard,
  Receipt,
  Banknote,
  BarChart3,
  PieChartIcon,
  Wallet,
  Building,
  Calculator,
  ShieldCheck,
  Users,
  Percent,
  ArrowDownRight,
  Euro,
  Coins,
  HardDrive,
  Briefcase,
  FileSearch,
  UserCheck,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Données fictives pour les transactions
const transactions = [
  {
    id: "INV001",
    date: "2025-04-01",
    description: "Paiement fournisseur - Viandes Premium",
    category: "Dépense",
    amount: -1250.0,
    status: "Complété",
  },
  {
    id: "REV001",
    date: "2025-04-01",
    description: "Recettes du jour",
    category: "Revenu",
    amount: 3450.75,
    status: "Complété",
  },
  {
    id: "INV002",
    date: "2025-04-02",
    description: "Paiement fournisseur - Légumes Bio",
    category: "Dépense",
    amount: -780.5,
    status: "Complété",
  },
  {
    id: "SAL001",
    date: "2025-04-03",
    description: "Salaires - Semaine 13",
    category: "Dépense",
    amount: -4200.0,
    status: "Complété",
  },
  {
    id: "REV002",
    date: "2025-04-03",
    description: "Recettes du jour",
    category: "Revenu",
    amount: 2980.25,
    status: "Complété",
  },
  {
    id: "UTIL001",
    date: "2025-04-05",
    description: "Facture d'électricité",
    category: "Dépense",
    amount: -425.3,
    status: "En attente",
  },
]

// Données fictives pour les graphiques
const monthlyData = [
  { name: "Jan", revenus: 42000, depenses: 28000, profit: 14000 },
  { name: "Fév", revenus: 38000, depenses: 26000, profit: 12000 },
  { name: "Mar", revenus: 45000, depenses: 29000, profit: 16000 },
  { name: "Avr", revenus: 50000, depenses: 32000, profit: 18000 },
  { name: "Mai", revenus: 55000, depenses: 34000, profit: 21000 },
  { name: "Juin", revenus: 58000, depenses: 36000, profit: 22000 },
]

const expenseCategories = [
  { name: "Nourriture", value: 45 },
  { name: "Boissons", value: 20 },
  { name: "Personnel", value: 25 },
  { name: "Loyer", value: 5 },
  { name: "Utilities", value: 3 },
  { name: "Autres", value: 2 },
]

// Données pour les prévisions de trésorerie
const cashFlowForecast = [
  { name: "Avr", entrees: 58000, sorties: 36000, solde: 22000 },
  { name: "Mai", entrees: 62000, sorties: 38000, solde: 24000 },
  { name: "Juin", entrees: 65000, sorties: 40000, solde: 25000 },
  { name: "Juil", entrees: 70000, sorties: 42000, solde: 28000 },
  { name: "Août", entrees: 68000, sorties: 41000, solde: 27000 },
  { name: "Sept", entrees: 64000, sorties: 39000, solde: 25000 },
]

// Données pour les rapports automatisés
const automatedReports = [
  {
    id: "REP001",
    name: "Rapport mensuel de performance",
    frequency: "Mensuel",
    lastGenerated: "01/04/2025",
    nextGeneration: "01/05/2025",
    status: "Actif",
    recipients: ["direction@restaurant.com", "comptabilite@restaurant.com"],
  },
  {
    id: "REP002",
    name: "Analyse des coûts par catégorie",
    frequency: "Hebdomadaire",
    lastGenerated: "07/04/2025",
    nextGeneration: "14/04/2025",
    status: "Actif",
    recipients: ["direction@restaurant.com"],
  },
  {
    id: "REP003",
    name: "Rapport de TVA",
    frequency: "Trimestriel",
    lastGenerated: "31/03/2025",
    nextGeneration: "30/06/2025",
    status: "Actif",
    recipients: ["comptabilite@restaurant.com", "fiscal@restaurant.com"],
  },
  {
    id: "REP004",
    name: "Analyse des marges par produit",
    frequency: "Mensuel",
    lastGenerated: "01/04/2025",
    nextGeneration: "01/05/2025",
    status: "Actif",
    recipients: ["direction@restaurant.com", "chef@restaurant.com"],
  },
]

// Données pour l'intégration fiscale
const taxIntegrations = [
  {
    name: "Système fiscal national",
    status: "Connecté",
    lastSync: "10/04/2025 14:30",
    nextFiling: "30/04/2025",
    filingType: "TVA mensuelle",
  },
  {
    name: "Portail des impôts locaux",
    status: "Connecté",
    lastSync: "05/04/2025 09:15",
    nextFiling: "15/05/2025",
    filingType: "Taxe locale",
  },
  {
    name: "Système de cotisations sociales",
    status: "Connecté",
    lastSync: "08/04/2025 11:45",
    nextFiling: "15/04/2025",
    filingType: "Cotisations mensuelles",
  },
]

// Données pour les alertes fiscales
const taxAlerts = [
  {
    type: "Échéance",
    message: "Déclaration de TVA à soumettre dans 5 jours",
    date: "25/04/2025",
    priority: "Haute",
  },
  {
    type: "Modification",
    message: "Nouveau taux de TVA applicable aux boissons non-alcoolisées",
    date: "01/05/2025",
    priority: "Moyenne",
  },
  {
    type: "Rappel",
    message: "Préparer les documents pour l'acompte d'impôt sur les sociétés",
    date: "10/05/2025",
    priority: "Basse",
  },
]

// Données pour les scénarios de trésorerie
const cashFlowScenarios = [
  {
    name: "Optimiste",
    data: [
      { month: "Avr", value: 22000 },
      { month: "Mai", value: 26000 },
      { month: "Juin", value: 29000 },
      { month: "Juil", value: 32000 },
      { month: "Août", value: 35000 },
      { month: "Sept", value: 38000 },
    ],
  },
  {
    name: "Réaliste",
    data: [
      { month: "Avr", value: 22000 },
      { month: "Mai", value: 24000 },
      { month: "Juin", value: 25000 },
      { month: "Juil", value: 28000 },
      { month: "Août", value: 27000 },
      { month: "Sept", value: 25000 },
    ],
  },
  {
    name: "Pessimiste",
    data: [
      { month: "Avr", value: 22000 },
      { month: "Mai", value: 20000 },
      { month: "Juin", value: 18000 },
      { month: "Juil", value: 16000 },
      { month: "Août", value: 15000 },
      { month: "Sept", value: 14000 },
    ],
  },
]

// Données pour la comptabilité analytique
const dishCostAnalysis = [
  {
    id: "DISH001",
    name: "Entrecôte grillée",
    ingredients: 18.5,
    labor: 6.2,
    overhead: 3.8,
    totalCost: 28.5,
    sellingPrice: 30.0,
    margin: 1.5,
    marginPercent: 5.0,
    popularity: 145,
  },
  {
    id: "DISH002",
    name: "Saumon en croûte",
    ingredients: 15.8,
    labor: 5.4,
    overhead: 3.8,
    totalCost: 25.0,
    sellingPrice: 27.0,
    margin: 2.0,
    marginPercent: 7.4,
    popularity: 120,
  },
  {
    id: "DISH003",
    name: "Risotto aux champignons",
    ingredients: 8.2,
    labor: 4.8,
    overhead: 3.8,
    totalCost: 16.8,
    sellingPrice: 22.0,
    margin: 5.2,
    marginPercent: 23.6,
    popularity: 95,
  },
  {
    id: "DISH004",
    name: "Tiramisu maison",
    ingredients: 3.5,
    labor: 2.7,
    overhead: 1.8,
    totalCost: 8.0,
    sellingPrice: 9.0,
    margin: 1.0,
    marginPercent: 11.1,
    popularity: 180,
  },
  {
    id: "DISH005",
    name: "Cocktail signature",
    ingredients: 4.2,
    labor: 1.8,
    overhead: 1.0,
    totalCost: 7.0,
    sellingPrice: 10.0,
    margin: 3.0,
    marginPercent: 30.0,
    popularity: 210,
  },
]

const servicePerformance = [
  {
    service: "Midi",
    revenue: 22500,
    customers: 450,
    avgTicket: 50.0,
    foodCost: 7875,
    laborCost: 4500,
    profit: 10125,
    profitMargin: 45.0,
  },
  {
    service: "Soir",
    revenue: 35500,
    customers: 355,
    avgTicket: 100.0,
    foodCost: 12425,
    laborCost: 7100,
    profit: 15975,
    profitMargin: 45.0,
  },
  {
    service: "Brunch (weekend)",
    revenue: 12800,
    customers: 320,
    avgTicket: 40.0,
    foodCost: 4480,
    laborCost: 2560,
    profit: 5760,
    profitMargin: 45.0,
  },
]

const restaurantComparison = [
  {
    id: "REST001",
    name: "Le Gourmet Français - Paris",
    revenue: 58000,
    costs: 36000,
    profit: 22000,
    profitMargin: 37.9,
    avgTicket: 42.35,
    customers: 1368,
    staffCost: 14500,
  },
  {
    id: "REST002",
    name: "Le Gourmet Français - Lyon",
    revenue: 42000,
    costs: 27300,
    profit: 14700,
    profitMargin: 35.0,
    avgTicket: 38.2,
    customers: 1099,
    staffCost: 10500,
  },
  {
    id: "REST003",
    name: "Le Gourmet Français - Marseille",
    revenue: 45000,
    costs: 29250,
    profit: 15750,
    profitMargin: 35.0,
    avgTicket: 40.1,
    customers: 1122,
    staffCost: 11250,
  },
]

// Données pour l'intégration bancaire
const bankAccounts = [
  {
    id: "BANK001",
    name: "Compte principal",
    bank: "Crédit Agricole",
    accountNumber: "FR76 XXXX XXXX XXXX 1234",
    balance: 45280.5,
    lastSync: "14/04/2025 08:30",
    status: "Synchronisé",
  },
  {
    id: "BANK002",
    name: "Compte épargne",
    bank: "Crédit Agricole",
    accountNumber: "FR76 XXXX XXXX XXXX 5678",
    balance: 120000.0,
    lastSync: "14/04/2025 08:30",
    status: "Synchronisé",
  },
  {
    id: "BANK003",
    name: "Compte carte",
    bank: "Société Générale",
    accountNumber: "FR76 XXXX XXXX XXXX 9012",
    balance: 8750.25,
    lastSync: "13/04/2025 18:45",
    status: "Synchronisé",
  },
]

const pendingPayments = [
  {
    id: "PAY001",
    supplier: "Viandes Premium",
    amount: 2450.8,
    dueDate: "20/04/2025",
    status: "À payer",
    invoice: "INV-2025-042",
  },
  {
    id: "PAY002",
    supplier: "Légumes Bio",
    amount: 1280.5,
    dueDate: "22/04/2025",
    status: "À payer",
    invoice: "F-2025-128",
  },
  {
    id: "PAY003",
    supplier: "Vins et Spiritueux",
    amount: 3750.0,
    dueDate: "25/04/2025",
    status: "À payer",
    invoice: "FAC-2025-089",
  },
  {
    id: "PAY004",
    supplier: "Maintenance Cuisine",
    amount: 580.0,
    dueDate: "18/04/2025",
    status: "À payer",
    invoice: "M-2025-045",
  },
]

const bankReconciliation = [
  {
    id: "TRANS001",
    date: "12/04/2025",
    description: "Paiement CB - Table 5",
    amount: 128.5,
    status: "Rapproché",
    bankRef: "CB-12042025-T5",
  },
  {
    id: "TRANS002",
    date: "12/04/2025",
    description: "Paiement CB - Table 8",
    amount: 95.2,
    status: "Rapproché",
    bankRef: "CB-12042025-T8",
  },
  {
    id: "TRANS003",
    date: "13/04/2025",
    description: "Paiement Fournisseur - Légumes Bio",
    amount: -780.5,
    status: "À rapprocher",
    bankRef: "",
  },
  {
    id: "TRANS004",
    date: "13/04/2025",
    description: "Recettes du jour",
    amount: 2980.25,
    status: "À rapprocher",
    bankRef: "",
  },
  {
    id: "TRANS005",
    date: "14/04/2025",
    description: "Prélèvement EDF",
    amount: -425.3,
    status: "À rapprocher",
    bankRef: "",
  },
]

// Données pour la gestion des immobilisations
const assets = [
  {
    id: "ASSET001",
    name: "Four professionnel",
    category: "Équipement cuisine",
    purchaseDate: "15/06/2023",
    purchaseValue: 12500.0,
    currentValue: 10000.0,
    depreciationRate: 20,
    depreciationMethod: "Linéaire",
    lifespan: 5,
    location: "Cuisine principale",
  },
  {
    id: "ASSET002",
    name: "Lave-vaisselle industriel",
    category: "Équipement cuisine",
    purchaseDate: "10/03/2024",
    purchaseValue: 8200.0,
    currentValue: 7790.0,
    depreciationRate: 20,
    depreciationMethod: "Linéaire",
    lifespan: 5,
    location: "Plonge",
  },
  {
    id: "ASSET003",
    name: "Mobilier salle",
    category: "Mobilier",
    purchaseDate: "05/01/2023",
    purchaseValue: 15000.0,
    currentValue: 11250.0,
    depreciationRate: 10,
    depreciationMethod: "Linéaire",
    lifespan: 10,
    location: "Salle principale",
  },
  {
    id: "ASSET004",
    name: "Système de caisse",
    category: "Informatique",
    purchaseDate: "20/11/2023",
    purchaseValue: 4500.0,
    currentValue: 3750.0,
    depreciationRate: 33.33,
    depreciationMethod: "Linéaire",
    lifespan: 3,
    location: "Comptoir",
  },
  {
    id: "ASSET005",
    name: "Chambre froide",
    category: "Équipement cuisine",
    purchaseDate: "08/09/2022",
    purchaseValue: 18000.0,
    currentValue: 12600.0,
    depreciationRate: 20,
    depreciationMethod: "Linéaire",
    lifespan: 5,
    location: "Réserve",
  },
]

const depreciationSchedule = [
  {
    year: 2023,
    totalDepreciation: 8450.0,
    assetValueStart: 58200.0,
    assetValueEnd: 49750.0,
  },
  {
    year: 2024,
    totalDepreciation: 9950.0,
    assetValueStart: 49750.0,
    assetValueEnd: 39800.0,
  },
  {
    year: 2025,
    totalDepreciation: 9950.0,
    assetValueStart: 39800.0,
    assetValueEnd: 29850.0,
  },
  {
    year: 2026,
    totalDepreciation: 9950.0,
    assetValueStart: 29850.0,
    assetValueEnd: 19900.0,
  },
  {
    year: 2027,
    totalDepreciation: 8450.0,
    assetValueStart: 19900.0,
    assetValueEnd: 11450.0,
  },
]

const plannedInvestments = [
  {
    id: "INV001",
    name: "Rénovation terrasse",
    category: "Aménagement",
    plannedDate: "Q3 2025",
    estimatedCost: 25000.0,
    status: "Planifié",
    roi: 18,
    paybackPeriod: 24,
  },
  {
    id: "INV002",
    name: "Nouveau système de ventilation",
    category: "Équipement cuisine",
    plannedDate: "Q4 2025",
    estimatedCost: 12000.0,
    status: "À l'étude",
    roi: 15,
    paybackPeriod: 30,
  },
  {
    id: "INV003",
    name: "Équipement audio-visuel",
    category: "Équipement salle",
    plannedDate: "Q2 2025",
    estimatedCost: 8500.0,
    status: "Approuvé",
    roi: 22,
    paybackPeriod: 18,
  },
]

// Données pour la comptabilité multi-devises
const currencyAccounts = [
  {
    id: "CURR001",
    currency: "EUR",
    balance: 45280.5,
    lastTransaction: "14/04/2025",
    exchangeRate: 1.0,
    valueInEUR: 45280.5,
  },
  {
    id: "CURR002",
    currency: "USD",
    balance: 12500.0,
    lastTransaction: "10/04/2025",
    exchangeRate: 0.92,
    valueInEUR: 11500.0,
  },
  {
    id: "CURR003",
    currency: "GBP",
    balance: 8200.0,
    lastTransaction: "08/04/2025",
    exchangeRate: 1.17,
    valueInEUR: 9594.0,
  },
]

const exchangeRateHistory = [
  { date: "01/01/2025", USD: 0.9, GBP: 1.15, CHF: 0.95 },
  { date: "01/02/2025", USD: 0.91, GBP: 1.16, CHF: 0.96 },
  { date: "01/03/2025", USD: 0.92, GBP: 1.17, CHF: 0.97 },
  { date: "01/04/2025", USD: 0.92, GBP: 1.17, CHF: 0.97 },
]

const foreignTransactions = [
  {
    id: "FT001",
    date: "05/04/2025",
    description: "Achat vins italiens",
    originalAmount: 2500.0,
    originalCurrency: "EUR",
    convertedAmount: 2500.0,
    exchangeRate: 1.0,
  },
  {
    id: "FT002",
    date: "08/04/2025",
    description: "Achat spiritueux écossais",
    originalAmount: 1800.0,
    originalCurrency: "GBP",
    convertedAmount: 2106.0,
    exchangeRate: 1.17,
  },
  {
    id: "FT003",
    date: "10/04/2025",
    description: "Achat équipement américain",
    originalAmount: 3500.0,
    originalCurrency: "USD",
    convertedAmount: 3220.0,
    exchangeRate: 0.92,
  },
]

// Couleurs pour les graphiques
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function AccountingPage({ params }: { params: { restaurantId: string } }) {
  return (
    <DashboardShell
      title="Comptabilité"
      subtitle="Gérez vos finances, suivez vos revenus et dépenses"
      restaurantId={params.restaurantId}
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
          <TabsTrigger value="cashflow">Trésorerie</TabsTrigger>
          <TabsTrigger value="automated">Rapports Auto</TabsTrigger>
          <TabsTrigger value="tax-integration">Intégration Fiscale</TabsTrigger>
          <TabsTrigger value="analytics">Analytique</TabsTrigger>
          <TabsTrigger value="banking">Banque</TabsTrigger>
          <TabsTrigger value="assets">Immobilisations</TabsTrigger>
          <TabsTrigger value="multi-currency">Multi-devises</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
          <TabsTrigger value="payroll">Paie</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenus (mois)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">58,000 €</div>
                <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dépenses (mois)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36,000 €</div>
                <p className="text-xs text-muted-foreground">+8% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profit (mois)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">22,000 €</div>
                <p className="text-xs text-muted-foreground">+20% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Marge bénéficiaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">37.9%</div>
                <p className="text-xs text-muted-foreground">+2.4% par rapport au mois dernier</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenus vs Dépenses</CardTitle>
                <CardDescription>Aperçu financier des 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    revenus: {
                      label: "Revenus",
                      color: "hsl(var(--chart-1))",
                    },
                    depenses: {
                      label: "Dépenses",
                      color: "hsl(var(--chart-2))",
                    },
                    profit: {
                      label: "Profit",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="revenus" fill="var(--color-revenus)" />
                      <Bar dataKey="depenses" fill="var(--color-depenses)" />
                      <Bar dataKey="profit" fill="var(--color-profit)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Répartition des dépenses</CardTitle>
                <CardDescription>Catégories principales de dépenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category) => (
                    <div className="grid grid-cols-3 items-center gap-4" key={category.name}>
                      <div className="col-span-1 font-medium">{category.name}</div>
                      <div className="col-span-1 flex items-center gap-2">
                        <div
                          className="h-2 rounded"
                          style={{
                            width: `${category.value}%`,
                            backgroundColor: "hsl(var(--primary))",
                          }}
                        />
                        <span className="text-sm text-muted-foreground">{category.value}%</span>
                      </div>
                      <div className="col-span-1 text-right text-sm">{Math.round(category.value * 360)}€</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center">
              <div>
                <CardTitle>Transactions récentes</CardTitle>
                <CardDescription>Les 5 dernières transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                <FileText className="mr-2 h-4 w-4" />
                Voir tout
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 5).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className={`text-right ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                        {transaction.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            transaction.status === "Complété"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenu des autres onglets existants omis pour la brièveté */}

        {/* Nouvel onglet pour la comptabilité analytique */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Comptabilité analytique avancée</CardTitle>
                  <CardDescription>Analyse détaillée des coûts et de la rentabilité</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                  <Button size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Nouvelle analyse
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Marge moyenne par plat</CardTitle>
                    <PieChartIcon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15.4%</div>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      +2.1% par rapport au mois précédent
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Coût moyen des ingrédients</CardTitle>
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">10.04€</div>
                    <div className="flex items-center text-xs text-red-600">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      +0.8% par rapport au mois précédent
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Rentabilité par service</CardTitle>
                    <Building className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45.0%</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      Stable par rapport au mois précédent
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Analyse des coûts par plat</CardTitle>
                  <CardDescription>Répartition détaillée des coûts et marges par plat</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plat</TableHead>
                        <TableHead>Ingrédients</TableHead>
                        <TableHead>Main d'œuvre</TableHead>
                        <TableHead>Frais généraux</TableHead>
                        <TableHead>Coût total</TableHead>
                        <TableHead>Prix de vente</TableHead>
                        <TableHead>Marge</TableHead>
                        <TableHead>Marge %</TableHead>
                        <TableHead>Popularité</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dishCostAnalysis.map((dish) => (
                        <TableRow key={dish.id}>
                          <TableCell className="font-medium">{dish.name}</TableCell>
                          <TableCell>{dish.ingredients.toFixed(2)}€</TableCell>
                          <TableCell>{dish.labor.toFixed(2)}€</TableCell>
                          <TableCell>{dish.overhead.toFixed(2)}€</TableCell>
                          <TableCell>{dish.totalCost.toFixed(2)}€</TableCell>
                          <TableCell>{dish.sellingPrice.toFixed(2)}€</TableCell>
                          <TableCell className={dish.margin > 0 ? "text-green-500" : "text-red-500"}>
                            {dish.margin.toFixed(2)}€
                          </TableCell>
                          <TableCell className={dish.marginPercent > 0 ? "text-green-500" : "text-red-500"}>
                            {dish.marginPercent.toFixed(1)}%
                          </TableCell>
                          <TableCell>{dish.popularity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Comparaison des services</CardTitle>
                    <CardDescription>Analyse comparative des performances par service</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Chiffre d'affaires</TableHead>
                          <TableHead>Clients</TableHead>
                          <TableHead>Ticket moyen</TableHead>
                          <TableHead>Coût nourriture</TableHead>
                          <TableHead>Coût personnel</TableHead>
                          <TableHead>Profit</TableHead>
                          <TableHead>Marge %</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {servicePerformance.map((service) => (
                          <TableRow key={service.service}>
                            <TableCell className="font-medium">{service.service}</TableCell>
                            <TableCell>{service.revenue.toLocaleString()}€</TableCell>
                            <TableCell>{service.customers}</TableCell>
                            <TableCell>{service.avgTicket.toFixed(2)}€</TableCell>
                            <TableCell>{service.foodCost.toLocaleString()}€</TableCell>
                            <TableCell>{service.laborCost.toLocaleString()}€</TableCell>
                            <TableCell>{service.profit.toLocaleString()}€</TableCell>
                            <TableCell>{service.profitMargin.toFixed(1)}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analyse multi-établissements</CardTitle>
                    <CardDescription>Comparaison des performances entre restaurants</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={restaurantComparison}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis angle={30} domain={[0, 60000]} />
                          <Radar
                            name="Chiffre d'affaires"
                            dataKey="revenue"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                          />
                          <Radar name="Coûts" dataKey="costs" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                          <Radar name="Profit" dataKey="profit" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Restaurant</TableHead>
                            <TableHead>CA</TableHead>
                            <TableHead>Profit</TableHead>
                            <TableHead>Marge %</TableHead>
                            <TableHead>Ticket moyen</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {restaurantComparison.map((restaurant) => (
                            <TableRow key={restaurant.id}>
                              <TableCell className="font-medium">{restaurant.name}</TableCell>
                              <TableCell>{restaurant.revenue.toLocaleString()}€</TableCell>
                              <TableCell>{restaurant.profit.toLocaleString()}€</TableCell>
                              <TableCell>{restaurant.profitMargin.toFixed(1)}%</TableCell>
                              <TableCell>{restaurant.avgTicket.toFixed(2)}€</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nouvel onglet pour l'intégration bancaire */}
        <TabsContent value="banking" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Intégration avec les systèmes bancaires</CardTitle>
                  <CardDescription>Synchronisation et gestion des comptes bancaires</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Synchroniser
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un compte
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Solde total</CardTitle>
                    <Banknote className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">174,030.75€</div>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      +5.2% par rapport au mois précédent
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Paiements en attente</CardTitle>
                    <Receipt className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8,061.30€</div>
                    <p className="text-xs text-muted-foreground">4 paiements à effectuer</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Transactions à rapprocher</CardTitle>
                    <Calculator className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Dernière synchronisation: 14/04/2025 08:30</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Comptes bancaires</CardTitle>
                  <CardDescription>État et solde de vos comptes bancaires</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom du compte</TableHead>
                        <TableHead>Banque</TableHead>
                        <TableHead>Numéro de compte</TableHead>
                        <TableHead className="text-right">Solde</TableHead>
                        <TableHead>Dernière synchro</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bankAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">{account.name}</TableCell>
                          <TableCell>{account.bank}</TableCell>
                          <TableCell>{account.accountNumber}</TableCell>
                          <TableCell className="text-right">
                            {account.balance.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                          </TableCell>
                          <TableCell>{account.lastSync}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              {account.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Détails
                            </Button>
                            <Button variant="ghost" size="sm">
                              Transactions
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Paiements fournisseurs en attente</CardTitle>
                    <CardDescription>Factures à payer et paiements programmés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fournisseur</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Échéance</TableHead>
                          <TableHead>Facture</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.supplier}</TableCell>
                            <TableCell>
                              {payment.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                            </TableCell>
                            <TableCell>{payment.dueDate}</TableCell>
                            <TableCell>{payment.invoice}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                                {payment.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Payer
                              </Button>
                              <Button variant="ghost" size="sm">
                                Détails
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Réconciliation bancaire</CardTitle>
                    <CardDescription>Rapprochement des transactions avec les relevés bancaires</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Montant</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Réf. bancaire</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bankReconciliation.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell className="font-medium">{transaction.description}</TableCell>
                            <TableCell
                              className={`text-right ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}
                            >
                              {transaction.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  transaction.status === "Rapproché"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {transaction.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{transaction.bankRef || "-"}</TableCell>
                            <TableCell className="text-right">
                              {transaction.status === "À rapprocher" ? (
                                <Button variant="ghost" size="sm">
                                  Rapprocher
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm">
                                  Détails
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nouvel onglet pour la gestion des immobilisations */}
        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestion des immobilisations</CardTitle>
                  <CardDescription>Suivi et amortissement des actifs immobilisés</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvel actif
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Valeur totale des actifs</CardTitle>
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,390.00€</div>
                    <div className="flex items-center text-xs text-red-600">
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                      -18.2% par rapport à l'achat
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Amortissement annuel</CardTitle>
                    <Calculator className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">9,950.00€</div>
                    <p className="text-xs text-muted-foreground">Exercice 2025</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Investissements prévus</CardTitle>
                    <HardDrive className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,500.00€</div>
                    <p className="text-xs text-muted-foreground">3 projets planifiés</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Registre des immobilisations</CardTitle>
                  <CardDescription>Inventaire complet des actifs immobilisés</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Actif</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Date d'achat</TableHead>
                        <TableHead>Valeur d'achat</TableHead>
                        <TableHead>Valeur actuelle</TableHead>
                        <TableHead>Taux d'amort.</TableHead>
                        <TableHead>Méthode</TableHead>
                        <TableHead>Durée de vie</TableHead>
                        <TableHead>Localisation</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{asset.category}</TableCell>
                          <TableCell>{asset.purchaseDate}</TableCell>
                          <TableCell>
                            {asset.purchaseValue.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                          </TableCell>
                          <TableCell>
                            {asset.currentValue.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                          </TableCell>
                          <TableCell>{asset.depreciationRate}%</TableCell>
                          <TableCell>{asset.depreciationMethod}</TableCell>
                          <TableCell>{asset.lifespan} ans</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tableau d'amortissement</CardTitle>
                    <CardDescription>Prévisions d'amortissement sur les prochaines années</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={depreciationSchedule}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="totalDepreciation" name="Amortissement annuel" fill="#8884d8" />
                          <Bar dataKey="assetValueEnd" name="Valeur résiduelle" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Année</TableHead>
                            <TableHead>Amortissement</TableHead>
                            <TableHead>Valeur début</TableHead>
                            <TableHead>Valeur fin</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {depreciationSchedule.map((schedule) => (
                            <TableRow key={schedule.year}>
                              <TableCell className="font-medium">{schedule.year}</TableCell>
                              <TableCell>
                                {schedule.totalDepreciation.toLocaleString("fr-FR", {
                                  style: "currency",
                                  currency: "EUR",
                                })}
                              </TableCell>
                              <TableCell>
                                {schedule.assetValueStart.toLocaleString("fr-FR", {
                                  style: "currency",
                                  currency: "EUR",
                                })}
                              </TableCell>
                              <TableCell>
                                {schedule.assetValueEnd.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investissements planifiés</CardTitle>
                    <CardDescription>Projets d'investissement à venir</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Projet</TableHead>
                          <TableHead>Catégorie</TableHead>
                          <TableHead>Date prévue</TableHead>
                          <TableHead>Coût estimé</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>ROI estimé</TableHead>
                          <TableHead>Délai de récupération</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {plannedInvestments.map((investment) => (
                          <TableRow key={investment.id}>
                            <TableCell className="font-medium">{investment.name}</TableCell>
                            <TableCell>{investment.category}</TableCell>
                            <TableCell>{investment.plannedDate}</TableCell>
                            <TableCell>
                              {investment.estimatedCost.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  investment.status === "Planifié"
                                    ? "bg-blue-100 text-blue-800"
                                    : investment.status === "Approuvé"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {investment.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{investment.roi}%</TableCell>
                            <TableCell>{investment.paybackPeriod} mois</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Détails
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nouvel onglet pour la comptabilité multi-devises */}
        <TabsContent value="multi-currency" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Comptabilité multi-devises</CardTitle>
                  <CardDescription>Gestion des transactions en différentes devises</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Euro className="mr-2 h-4 w-4" />
                    Taux de change
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvelle transaction
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Solde total (EUR)</CardTitle>
                    <Coins className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">66,374.50€</div>
                    <p className="text-xs text-muted-foreground">Équivalent en EUR de tous les comptes</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Devises actives</CardTitle>
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">EUR, USD, GBP</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Écarts de change</CardTitle>
                    <Percent className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+420.50€</div>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      Gain sur le mois en cours
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Comptes par devise</CardTitle>
                  <CardDescription>État des soldes dans chaque devise</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Devise</TableHead>
                        <TableHead className="text-right">Solde</TableHead>
                        <TableHead>Dernière transaction</TableHead>
                        <TableHead>Taux de change</TableHead>
                        <TableHead className="text-right">Valeur en EUR</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currencyAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">{account.currency}</TableCell>
                          <TableCell className="text-right">
                            {account.balance.toLocaleString()} {account.currency}
                          </TableCell>
                          <TableCell>{account.lastTransaction}</TableCell>
                          <TableCell>{account.exchangeRate}</TableCell>
                          <TableCell className="text-right">
                            {account.valueInEUR.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Détails
                            </Button>
                            <Button variant="ghost" size="sm">
                              Transactions
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Historique des taux de change</CardTitle>
                    <CardDescription>Évolution des taux de change par rapport à l'EUR</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" allowDuplicatedCategory={false} />
                          <YAxis domain={[0.8, 1.2]} />
                          <Tooltip />
                          <Legend />
                          <Line
                            dataKey="USD"
                            data={exchangeRateHistory}
                            name="EUR/USD"
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            dataKey="GBP"
                            data={exchangeRateHistory}
                            name="EUR/GBP"
                            stroke="#82ca9d"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            dataKey="CHF"
                            data={exchangeRateHistory}
                            name="EUR/CHF"
                            stroke="#ffc658"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>EUR/USD</TableHead>
                            <TableHead>EUR/GBP</TableHead>
                            <TableHead>EUR/CHF</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {exchangeRateHistory.map((rate) => (
                            <TableRow key={rate.date}>
                              <TableCell className="font-medium">{rate.date}</TableCell>
                              <TableCell>{rate.USD}</TableCell>
                              <TableCell>{rate.GBP}</TableCell>
                              <TableCell>{rate.CHF}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transactions en devises étrangères</CardTitle>
                    <CardDescription>Transactions récentes avec conversion de devises</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Montant original</TableHead>
                          <TableHead>Devise</TableHead>
                          <TableHead>Taux</TableHead>
                          <TableHead className="text-right">Montant EUR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {foreignTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell className="font-medium">{transaction.description}</TableCell>
                            <TableCell>
                              {transaction.originalAmount.toLocaleString()} {transaction.originalCurrency}
                            </TableCell>
                            <TableCell>{transaction.originalCurrency}</TableCell>
                            <TableCell>{transaction.exchangeRate}</TableCell>
                            <TableCell className="text-right">
                              {transaction.convertedAmount.toLocaleString("fr-FR", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglets supplémentaires à implémenter */}
        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestion budgétaire complète</CardTitle>
                  <CardDescription>Planification et suivi des budgets</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau budget
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Module en cours de développement</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    La gestion budgétaire complète sera disponible dans la prochaine mise à jour.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Être notifié à la sortie
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Audit et conformité</CardTitle>
                  <CardDescription>Suivi des modifications et préparation aux audits</CardDescription>
                </div>
                <Button size="sm">
                  <FileSearch className="mr-2 h-4 w-4" />
                  Générer rapport d'audit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Module en cours de développement</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les fonctionnalités d'audit et conformité seront disponibles dans la prochaine mise à jour.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Être notifié à la sortie
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Intégration avec la paie</CardTitle>
                  <CardDescription>Gestion des salaires et déclarations sociales</CardDescription>
                </div>
                <Button size="sm">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Préparer la paie
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Module en cours de développement</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    L'intégration avec la paie sera disponible dans la prochaine mise à jour.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Être notifié à la sortie
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
