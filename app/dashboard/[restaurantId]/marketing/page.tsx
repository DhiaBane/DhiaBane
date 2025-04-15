"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Percent, Share2, Users } from "lucide-react"

// Types pour les promotions
interface Promotion {
  id: string
  restaurantId: string
  title: string
  description: string
  type: "discount" | "bogo" | "special" | "loyalty"
  value: number
  code?: string
  startDate: string
  endDate: string
  isActive: boolean
  usageLimit?: number
  usageCount: number
  targetAudience?: "all" | "new" | "returning" | "vip"
  conditions?: string
}

// Types pour les campagnes marketing
interface Campaign {
  id: string
  restaurantId: string
  title: string
  description: string
  type: "email" | "sms" | "social" | "push"
  status: "draft" | "scheduled" | "active" | "completed" | "cancelled"
  scheduledDate?: string
  sentDate?: string
  audience: "all" | "new" | "returning" | "vip" | "custom"
  audienceSize: number
  openRate?: number
  clickRate?: number
  content: string
  promotionId?: string
}

// Données fictives pour les promotions
const mockPromotions: Promotion[] = [
  {
    id: "promo-001",
    restaurantId: "rest-001",
    title: "Happy Hour -30%",
    description: "30% de réduction sur toutes les boissons de 17h à 19h",
    type: "discount",
    value: 30,
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    isActive: true,
    usageLimit: 0,
    usageCount: 145,
    targetAudience: "all",
    conditions: "Valable uniquement de 17h à 19h, du lundi au vendredi",
  },
  {
    id: "promo-002",
    restaurantId: "rest-001",
    title: "Menu Déjeuner à 15€",
    description: "Entrée + Plat + Café pour 15€ le midi",
    type: "special",
    value: 15,
    startDate: "2025-04-01",
    endDate: "2025-05-31",
    isActive: true,
    usageLimit: 0,
    usageCount: 78,
    targetAudience: "all",
    conditions: "Valable uniquement le midi, du lundi au vendredi",
  },
  {
    id: "promo-003",
    restaurantId: "rest-001",
    title: "1 Dessert Offert",
    description: "Un dessert offert pour tout menu acheté",
    type: "bogo",
    value: 100,
    code: "DESSERT2025",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    isActive: false,
    usageLimit: 200,
    usageCount: 0,
    targetAudience: "all",
  },
]

// Données fictives pour les campagnes
const mockCampaigns: Campaign[] = [
  {
    id: "camp-001",
    restaurantId: "rest-001",
    title: "Newsletter Avril 2025",
    description: "Newsletter mensuelle avec les événements et promotions",
    type: "email",
    status: "completed",
    sentDate: "2025-04-05",
    audience: "all",
    audienceSize: 1250,
    openRate: 32.5,
    clickRate: 8.7,
    content: "Contenu de la newsletter d'avril avec les événements et promotions du mois",
  },
  {
    id: "camp-002",
    restaurantId: "rest-001",
    title: "Promotion Happy Hour",
    description: "Campagne pour promouvoir notre happy hour",
    type: "email",
    status: "active",
    sentDate: "2025-04-10",
    audience: "all",
    audienceSize: 1250,
    openRate: 28.2,
    clickRate: 12.4,
    content: "Venez profiter de notre happy hour avec 30% de réduction sur toutes les boissons de 17h à 19h",
    promotionId: "promo-001",
  },
  {
    id: "camp-003",
    restaurantId: "rest-001",
    title: "Annonce Menu Printemps",
    description: "Lancement de notre nouveau menu de printemps",
    type: "social",
    status: "scheduled",
    scheduledDate: "2025-04-20",
    audience: "all",
    audienceSize: 2500,
    content: "Découvrez notre nouveau menu de printemps avec des produits frais et de saison",
  },
]

export default function MarketingPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [isEditPromotionDialogOpen, setIsEditPromotionDialogOpen] = useState(false)
  const [isNewPromotionDialogOpen, setIsNewPromotionDialogOpen] = useState(false)
  const [isEditCampaignDialogOpen, setIsEditCampaignDialogOpen] = useState(false)
  const [isNewCampaignDialogOpen, setIsNewCampaignDialogOpen] = useState(false)
  const [promotionFormData, setPromotionFormData] = useState({
    title: "",
    description: "",
    type: "discount" as Promotion["type"],
    value: "",
    code: "",
    startDate: "",
    endDate: "",
    isActive: true,
    usageLimit: "",
    targetAudience: "all" as Promotion["targetAudience"],
    conditions: "",
  })
  const [campaignFormData, setCampaignFormData] = useState({
    title: "",
    description: "",
    type: "email" as Campaign["type"],
    status: "draft" as Campaign["status"],
    scheduledDate: "",
    audience: "all" as Campaign["audience"],
    content: "",
    promotionId: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simuler un appel API
        await new Promise((resolve) => setTimeout(resolve, 500))
        setPromotions(mockPromotions.filter((promo) => promo.restaurantId === restaurantId))
        setCampaigns(mockCampaigns.filter((campaign) => campaign.restaurantId === restaurantId))
      } catch (error) {
        console.error("Error fetching marketing data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [restaurantId])

  const handleEditPromotion = (promotion: Promotion) => {
    setSelectedPromotion(promotion)
    setPromotionFormData({
      title: promotion.title,
      description: promotion.description,
      type: promotion.type,
      value: promotion.value.toString(),
      code: promotion.code || "",
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      isActive: promotion.isActive,
      usageLimit: promotion.usageLimit?.toString() || "",
      targetAudience: promotion.targetAudience || "all",
      conditions: promotion.conditions || "",
    })
    setIsEditPromotionDialogOpen(true)
  }

  const handleNewPromotion = () => {
    const today = new Date()
    const nextMonth = new Date(today)
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    const formattedStartDate = format(today, "yyyy-MM-dd")
    const formattedEndDate = format(nextMonth, "yyyy-MM-dd")

    setPromotionFormData({
      title: "",
      description: "",
      type: "discount",
      value: "10",
      code: "",
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      isActive: true,
      usageLimit: "",
      targetAudience: "all",
      conditions: "",
    })
    setIsNewPromotionDialogOpen(true)
  }

  const handleSavePromotion = async () => {
    if (!selectedPromotion) return

    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedPromotion: Promotion = {
        ...selectedPromotion,
        title: promotionFormData.title,
        description: promotionFormData.description,
        type: promotionFormData.type,
        value: Number.parseFloat(promotionFormData.value),
        code: promotionFormData.code || undefined,
        startDate: promotionFormData.startDate,
        endDate: promotionFormData.endDate,
        isActive: promotionFormData.isActive,
        usageLimit: promotionFormData.usageLimit ? Number.parseInt(promotionFormData.usageLimit) : undefined,
        targetAudience: promotionFormData.targetAudience,
        conditions: promotionFormData.conditions || undefined,
      }

      setPromotions(promotions.map((promo) => (promo.id === selectedPromotion.id ? updatedPromotion : promo)))
      setIsEditPromotionDialogOpen(false)
    } catch (error) {
      console.error("Error updating promotion:", error)
    }
  }

  const handleCreatePromotion = async () => {
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newPromotion: Promotion = {
        id: `promo-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        restaurantId,
        title: promotionFormData.title,
        description: promotionFormData.description,
        type: promotionFormData.type,
        value: Number.parseFloat(promotionFormData.value),
        code: promotionFormData.code || undefined,
        startDate: promotionFormData.startDate,
        endDate: promotionFormData.endDate,
        isActive: promotionFormData.isActive,
        usageLimit: promotionFormData.usageLimit ? Number.parseInt(promotionFormData.usageLimit) : undefined,
        usageCount: 0,
        targetAudience: promotionFormData.targetAudience,
        conditions: promotionFormData.conditions || undefined,
      }

      setPromotions([...promotions, newPromotion])
      setIsNewPromotionDialogOpen(false)
    } catch (error) {
      console.error("Error creating promotion:", error)
    }
  }

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setCampaignFormData({
      title: campaign.title,
      description: campaign.description,
      type: campaign.type,
      status: campaign.status,
      scheduledDate: campaign.scheduledDate || "",
      audience: campaign.audience,
      content: campaign.content,
      promotionId: campaign.promotionId || "",
    })
    setIsEditCampaignDialogOpen(true)
  }

  const handleNewCampaign = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const formattedDate = format(tomorrow, "yyyy-MM-dd")

    setCampaignFormData({
      title: "",
      description: "",
      type: "email",
      status: "draft",
      scheduledDate: formattedDate,
      audience: "all",
      content: "",
      promotionId: "",
    })
    setIsNewCampaignDialogOpen(true)
  }

  const handleSaveCampaign = async () => {
    if (!selectedCampaign) return

    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedCampaign: Campaign = {
        ...selectedCampaign,
        title: campaignFormData.title,
        description: campaignFormData.description,
        type: campaignFormData.type,
        status: campaignFormData.status,
        scheduledDate: campaignFormData.scheduledDate || undefined,
        audience: campaignFormData.audience,
        content: campaignFormData.content,
        promotionId: campaignFormData.promotionId || undefined,
      }

      setCampaigns(campaigns.map((campaign) => (campaign.id === selectedCampaign.id ? updatedCampaign : campaign)))
      setIsEditCampaignDialogOpen(false)
    } catch (error) {
      console.error("Error updating campaign:", error)
    }
  }

  const handleCreateCampaign = async () => {
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newCampaign: Campaign = {
        id: `camp-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        restaurantId,
        title: campaignFormData.title,
        description: campaignFormData.description,
        type: campaignFormData.type,
        status: campaignFormData.status,
        scheduledDate: campaignFormData.scheduledDate || undefined,
        audience: campaignFormData.audience,
        audienceSize: 1250, // Valeur fictive
        content: campaignFormData.content,
        promotionId: campaignFormData.promotionId || undefined,
      }

      setCampaigns([...campaigns, newCampaign])
      setIsNewCampaignDialogOpen(false)
    } catch (error) {
      console.error("Error creating campaign:", error)
    }
  }

  const getPromotionTypeBadge = (type: Promotion["type"]) => {
    switch (type) {
      case "discount":
        return <Badge className="bg-green-500">Réduction</Badge>
      case "bogo":
        return <Badge className="bg-blue-500">1 acheté, 1 offert</Badge>
      case "special":
        return <Badge className="bg-purple-500">Offre spéciale</Badge>
      case "loyalty":
        return <Badge className="bg-yellow-500">Fidélité</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  const getCampaignTypeBadge = (type: Campaign["type"]) => {
    switch (type) {
      case "email":
        return <Badge className="bg-blue-500">Email</Badge>
      case "sms":
        return <Badge className="bg-green-500">SMS</Badge>
      case "social":
        return <Badge className="bg-purple-500">Réseaux sociaux</Badge>
      case "push":
        return <Badge className="bg-yellow-500">Notification push</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  const getCampaignStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "draft":
        return <Badge className="bg-gray-500">Brouillon</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500">Programmée</Badge>
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "completed":
        return <Badge className="bg-purple-500">Terminée</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Annulée</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Marketing et promotions</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Marketing et promotions</h1>
      </div>

      <Tabs defaultValue="promotions" className="mt-6">
        <TabsList>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
        </TabsList>

        <TabsContent value="promotions" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleNewPromotion}>Nouvelle promotion</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promotion) => (
              <Card key={promotion.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{promotion.title}</CardTitle>
                    {getPromotionTypeBadge(promotion.type)}
                  </div>
                  <CardDescription>
                    {format(parseISO(promotion.startDate), "d MMM yyyy", { locale: fr })} -
                    {format(parseISO(promotion.endDate), "d MMM yyyy", { locale: fr })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">{promotion.description}</div>
                    <div className="flex items-center">
                      <Percent className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {promotion.type === "discount" && `${promotion.value}% de réduction`}
                        {promotion.type === "bogo" && `${promotion.value}% offert`}
                        {promotion.type === "special" && `Offre à ${promotion.value}€`}
                        {promotion.type === "loyalty" && `${promotion.value} points bonus`}
                      </span>
                    </div>
                    {promotion.code && (
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Code: {promotion.code}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {promotion.targetAudience === "all" && "Tous les clients"}
                        {promotion.targetAudience === "new" && "Nouveaux clients"}
                        {promotion.targetAudience === "returning" && "Clients fidèles"}
                        {promotion.targetAudience === "vip" && "Clients VIP"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center">
                    <Switch checked={promotion.isActive} disabled className="mr-2" />
                    <span className="text-sm">{promotion.isActive ? "Active" : "Inactive"}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleEditPromotion(promotion)}>
                    Modifier
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {promotions.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Aucune promotion</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleNewCampaign}>Nouvelle campagne</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{campaign.title}</CardTitle>
                    {getCampaignTypeBadge(campaign.type)}
                  </div>
                  <CardDescription>
                    {campaign.scheduledDate &&
                      `Programmée: ${format(parseISO(campaign.scheduledDate), "d MMM yyyy", { locale: fr })}`}
                    {campaign.sentDate &&
                      `Envoyée: ${format(parseISO(campaign.sentDate), "d MMM yyyy", { locale: fr })}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{campaign.description}</span>
                      {getCampaignStatusBadge(campaign.status)}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {campaign.audience === "all" && "Tous les clients"}
                        {campaign.audience === "new" && "Nouveaux clients"}
                        {campaign.audience === "returning" && "Clients fidèles"}
                        {campaign.audience === "vip" && "Clients VIP"}
                        {campaign.audience === "custom" && "Sélection personnalisée"}
                        {" - "}
                        {campaign.audienceSize} destinataires
                      </span>
                    </div>
                    {campaign.openRate !== undefined && campaign.clickRate !== undefined && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Ouverture:</span> {campaign.openRate}%
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Clics:</span> {campaign.clickRate}%
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => handleEditCampaign(campaign)}>
                    Détails
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {campaigns.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Aucune campagne</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Réseaux sociaux</CardTitle>
              <CardDescription>Gérez vos comptes de réseaux sociaux et planifiez vos publications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <CardTitle className="text-base">Facebook</CardTitle>
                    </div>
                    <CardDescription>Connecté en tant que Restaurant Le Gourmet</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Abonnés:</span>
                        <span className="font-medium">1,245</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Engagement:</span>
                        <span className="font-medium">3.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Publications:</span>
                        <span className="font-medium">12 ce mois-ci</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Créer une publication
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                      <CardTitle className="text-base">Instagram</CardTitle>
                    </div>
                    <CardDescription>Connecté en tant que @legourmet_restaurant</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Abonnés:</span>
                        <span className="font-medium">2,567</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Engagement:</span>
                        <span className="font-medium">4.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Publications:</span>
                        <span className="font-medium">8 ce mois-ci</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Créer une publication
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Publications programmées</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <div className="font-medium">Nouveau menu de printemps</div>
                      <div className="text-sm text-muted-foreground">
                        Programmée pour le 20 avril 2025 à 12:00 • Instagram, Facebook
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <div className="font-medium">Happy Hour -30%</div>
                      <div className="text-sm text-muted-foreground">
                        Programmée pour le 25 avril 2025 à 16:00 • Instagram, Facebook
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Planifier une publication</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog pour modifier une promotion */}
      <Dialog open={isEditPromotionDialogOpen} onOpenChange={setIsEditPromotionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier la promotion</DialogTitle>
            <DialogDescription>Modifiez les informations de la promotion ici.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titre
              </Label>
              <Input
                id="title"
                value={promotionFormData.title}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={promotionFormData.description}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={promotionFormData.type}
                onValueChange={(value) =>
                  setPromotionFormData({ ...promotionFormData, type: value as Promotion["type"] })
                }
              >
                <SelectTrigger id="type" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Réduction</SelectItem>
                  <SelectItem value="bogo">1 acheté, 1 offert</SelectItem>
                  <SelectItem value="special">Offre spéciale</SelectItem>
                  <SelectItem value="loyalty">Fidélité</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Valeur
              </Label>
              <Input
                id="value"
                type="number"
                value={promotionFormData.value}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, value: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                value={promotionFormData.code}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, code: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Date de début
              </Label>
              <Input
                id="startDate"
                type="date"
                value={promotionFormData.startDate}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, startDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                Date de fin
              </Label>
              <Input
                id="endDate"
                type="date"
                value={promotionFormData.endDate}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, endDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="targetAudience" className="text-right">
                Cible
              </Label>
              <Select
                value={promotionFormData.targetAudience}
                onValueChange={(value) =>
                  setPromotionFormData({ ...promotionFormData, targetAudience: value as Promotion["targetAudience"] })
                }
              >
                <SelectTrigger id="targetAudience" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une cible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les clients</SelectItem>
                  <SelectItem value="new">Nouveaux clients</SelectItem>
                  <SelectItem value="returning">Clients fidèles</SelectItem>
                  <SelectItem value="vip">Clients VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="usageLimit" className="text-right">
                Limite d'utilisation
              </Label>
              <Input
                id="usageLimit"
                type="number"
                value={promotionFormData.usageLimit}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, usageLimit: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="conditions" className="text-right">
                Conditions
              </Label>
              <Textarea
                id="conditions"
                value={promotionFormData.conditions}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, conditions: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                Active
              </Label>
              <div className="col-span-3 flex items-center">
                <Switch
                  id="isActive"
                  checked={promotionFormData.isActive}
                  onCheckedChange={(checked) => setPromotionFormData({ ...promotionFormData, isActive: checked })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPromotionDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSavePromotion}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour créer une nouvelle promotion */}
      <Dialog open={isNewPromotionDialogOpen} onOpenChange={setIsNewPromotionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvelle promotion</DialogTitle>
            <DialogDescription>Créez une nouvelle promotion pour votre restaurant.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-title" className="text-right">
                Titre
              </Label>
              <Input
                id="new-title"
                value={promotionFormData.title}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="new-description"
                value={promotionFormData.description}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-type" className="text-right">
                Type
              </Label>
              <Select
                value={promotionFormData.type}
                onValueChange={(value) =>
                  setPromotionFormData({ ...promotionFormData, type: value as Promotion["type"] })
                }
              >
                <SelectTrigger id="new-type" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Réduction</SelectItem>
                  <SelectItem value="bogo">1 acheté, 1 offert</SelectItem>
                  <SelectItem value="special">Offre spéciale</SelectItem>
                  <SelectItem value="loyalty">Fidélité</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-value" className="text-right">
                Valeur
              </Label>
              <Input
                id="new-value"
                type="number"
                value={promotionFormData.value}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, value: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-startDate" className="text-right">
                Date de début
              </Label>
              <Input
                id="new-startDate"
                type="date"
                value={promotionFormData.startDate}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, startDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-endDate" className="text-right">
                Date de fin
              </Label>
              <Input
                id="new-endDate"
                type="date"
                value={promotionFormData.endDate}
                onChange={(e) => setPromotionFormData({ ...promotionFormData, endDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-targetAudience" className="text-right">
                Cible
              </Label>
              <Select
                value={promotionFormData.targetAudience}
                onValueChange={(value) =>
                  setPromotionFormData({ ...promotionFormData, targetAudience: value as Promotion["targetAudience"] })
                }
              >
                <SelectTrigger id="new-targetAudience" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une cible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les clients</SelectItem>
                  <SelectItem value="new">Nouveaux clients</SelectItem>
                  <SelectItem value="returning">Clients fidèles</SelectItem>
                  <SelectItem value="vip">Clients VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPromotionDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreatePromotion}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier une campagne */}
      <Dialog open={isEditCampaignDialogOpen} onOpenChange={setIsEditCampaignDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier la campagne</DialogTitle>
            <DialogDescription>Modifiez les informations de la campagne ici.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-title" className="text-right">
                Titre
              </Label>
              <Input
                id="campaign-title"
                value={campaignFormData.title}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="campaign-description"
                value={campaignFormData.description}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-type" className="text-right">
                Type
              </Label>
              <Select
                value={campaignFormData.type}
                onValueChange={(value) => setCampaignFormData({ ...campaignFormData, type: value as Campaign["type"] })}
              >
                <SelectTrigger id="campaign-type" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="social">Réseaux sociaux</SelectItem>
                  <SelectItem value="push">Notification push</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-status" className="text-right">
                Statut
              </Label>
              <Select
                value={campaignFormData.status}
                onValueChange={(value) =>
                  setCampaignFormData({ ...campaignFormData, status: value as Campaign["status"] })
                }
              >
                <SelectTrigger id="campaign-status" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="scheduled">Programmée</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Terminée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-scheduledDate" className="text-right">
                Date programmée
              </Label>
              <Input
                id="campaign-scheduledDate"
                type="date"
                value={campaignFormData.scheduledDate}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, scheduledDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-audience" className="text-right">
                Audience
              </Label>
              <Select
                value={campaignFormData.audience}
                onValueChange={(value) =>
                  setCampaignFormData({ ...campaignFormData, audience: value as Campaign["audience"] })
                }
              >
                <SelectTrigger id="campaign-audience" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les clients</SelectItem>
                  <SelectItem value="new">Nouveaux clients</SelectItem>
                  <SelectItem value="returning">Clients fidèles</SelectItem>
                  <SelectItem value="vip">Clients VIP</SelectItem>
                  <SelectItem value="custom">Sélection personnalisée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-content" className="text-right">
                Contenu
              </Label>
              <Textarea
                id="campaign-content"
                value={campaignFormData.content}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, content: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-promotionId" className="text-right">
                Promotion associée
              </Label>
              <Input
                id="campaign-promotionId"
                value={campaignFormData.promotionId}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, promotionId: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCampaignDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveCampaign}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour créer une nouvelle campagne */}
      <Dialog open={isNewCampaignDialogOpen} onOpenChange={setIsNewCampaignDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvelle campagne</DialogTitle>
            <DialogDescription>Créez une nouvelle campagne pour votre restaurant.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-campaign-title" className="text-right">
                Titre
              </Label>
              <Input
                id="new-campaign-title"
                value={campaignFormData.title}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-campaign-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="new-campaign-description"
                value={campaignFormData.description}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-campaign-type" className="text-right">
                Type
              </Label>
              <Select
                value={campaignFormData.type}
                onValueChange={(value) => setCampaignFormData({ ...campaignFormData, type: value as Campaign["type"] })}
              >
                <SelectTrigger id="new-campaign-type" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="social">Réseaux sociaux</SelectItem>
                  <SelectItem value="push">Notification push</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-campaign-status" className="text-right">
                Statut
              </Label>
              <Select
                value={campaignFormData.status}
                onValueChange={(value) =>
                  setCampaignFormData({ ...campaignFormData, status: value as Campaign["status"] })
                }
              >
                <SelectTrigger id="new-campaign-status" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="scheduled">Programmée</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Terminée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-campaign-scheduledDate" className="text-right">
                Date programmée
              </Label>
              <Input
                id="new-campaign-scheduledDate"
                type="date"
                value={campaignFormData.scheduledDate}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, scheduledDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-campaign-audience" className="text-right">
                Audience
              </Label>
              <Select
                value={campaignFormData.audience}
                onValueChange={(value) =>
                  setCampaignFormData({ ...campaignFormData, audience: value as Campaign["audience"] })
                }
              >
                <SelectTrigger id="new-campaign-audience" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les clients</SelectItem>
                  <SelectItem value="new">Nouveaux clients</SelectItem>
                  <SelectItem value="returning">Clients fidèles</SelectItem>
                  <SelectItem value="vip">Clients VIP</SelectItem>
                  <SelectItem value="custom">Sélection personnalisée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-campaign-content" className="text-right">
                Contenu
              </Label>
              <Textarea
                id="new-campaign-content"
                value={campaignFormData.content}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, content: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-campaign-promotionId" className="text-right">
                Promotion associée
              </Label>
              <Input
                id="new-campaign-promotionId"
                value={campaignFormData.promotionId}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, promotionId: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCampaignDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateCampaign}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
