"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { format, subDays } from "date-fns"
import { fr } from "date-fns/locale/fr"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { DashboardShell } from "@/components/ui/dashboard-shell"

// Types pour les avis
interface Review {
  id: string
  restaurantId: string
  customerName: string
  customerAvatar?: string
  rating: number
  comment: string
  date: string
  source: "direct" | "google" | "tripadvisor" | "facebook" | "other"
  status: "published" | "pending" | "rejected"
  response?: string
  tags?: string[]
}

// Types pour les enquêtes
interface Survey {
  id: string
  restaurantId: string
  title: string
  description: string
  status: "active" | "draft" | "completed" | "archived"
  startDate: string
  endDate?: string
  questions: SurveyQuestion[]
  responses: number
  completionRate: number
}

interface SurveyQuestion {
  id: string
  type: "rating" | "text" | "multiple" | "single" | "boolean"
  question: string
  options?: string[]
  required: boolean
}

// Données fictives pour les avis
const mockReviews: Review[] = [
  {
    id: "rev-001",
    restaurantId: "rest-001",
    customerName: "Jean Dupont",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "Excellent repas, service impeccable et ambiance chaleureuse. Je recommande vivement ce restaurant pour un dîner en famille ou entre amis.",
    date: "2025-04-10",
    source: "direct",
    status: "published",
    tags: ["service", "nourriture", "ambiance"],
  },
  {
    id: "rev-002",
    restaurantId: "rest-001",
    customerName: "Marie Martin",
    rating: 4,
    comment:
      "Très bon restaurant, plats savoureux et bien présentés. Seul bémol, l'attente un peu longue entre les plats.",
    date: "2025-04-08",
    source: "google",
    status: "published",
    response:
      "Merci pour votre avis Marie ! Nous prenons note de votre remarque concernant le temps d'attente et travaillons à améliorer ce point.",
    tags: ["nourriture", "présentation", "temps d'attente"],
  },
  {
    id: "rev-003",
    restaurantId: "rest-001",
    customerName: "Pierre Durand",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 2,
    comment: "Déçu par mon expérience. Les plats étaient tièdes et le service peu attentionné.",
    date: "2025-04-05",
    source: "tripadvisor",
    status: "published",
    response:
      "Nous sommes désolés de votre mauvaise expérience Pierre. Nous aimerions en savoir plus et vous offrir une compensation. N'hésitez pas à nous contacter directement.",
    tags: ["nourriture", "service", "température"],
  },
  {
    id: "rev-004",
    restaurantId: "rest-001",
    customerName: "Sophie Leroy",
    rating: 5,
    comment:
      "Une découverte culinaire exceptionnelle ! Le chef propose des associations de saveurs surprenantes et délicieuses.",
    date: "2025-04-03",
    source: "facebook",
    status: "published",
    tags: ["nourriture", "créativité", "saveurs"],
  },
  {
    id: "rev-005",
    restaurantId: "rest-001",
    customerName: "Lucas Moreau",
    rating: 3,
    comment: "Restaurant correct mais sans plus. Les prix sont un peu élevés par rapport à la qualité proposée.",
    date: "2025-04-01",
    source: "google",
    status: "pending",
    tags: ["prix", "rapport qualité-prix"],
  },
]

// Données fictives pour les enquêtes
const mockSurveys: Survey[] = [
  {
    id: "surv-001",
    restaurantId: "rest-001",
    title: "Satisfaction client - Avril 2025",
    description: "Enquête mensuelle sur la satisfaction de nos clients",
    status: "active",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    questions: [
      {
        id: "q1",
        type: "rating",
        question: "Comment évaluez-vous la qualité de nos plats ?",
        required: true,
      },
      {
        id: "q2",
        type: "rating",
        question: "Comment évaluez-vous notre service ?",
        required: true,
      },
      {
        id: "q3",
        type: "rating",
        question: "Comment évaluez-vous le rapport qualité-prix ?",
        required: true,
      },
      {
        id: "q4",
        type: "text",
        question: "Avez-vous des suggestions pour améliorer notre service ?",
        required: false,
      },
      {
        id: "q5",
        type: "multiple",
        question: "Quels aspects de notre restaurant préférez-vous ?",
        options: ["Nourriture", "Service", "Ambiance", "Prix", "Emplacement"],
        required: false,
      },
    ],
    responses: 45,
    completionRate: 78,
  },
  {
    id: "surv-002",
    restaurantId: "rest-001",
    title: "Nouveaux plats - Test",
    description: "Recueillir les avis sur nos nouveaux plats de printemps",
    status: "draft",
    startDate: "2025-04-15",
    questions: [
      {
        id: "q1",
        type: "rating",
        question: "Comment évaluez-vous notre nouveau plat signature ?",
        required: true,
      },
      {
        id: "q2",
        type: "single",
        question: "Quel plat avez-vous préféré parmi notre nouvelle sélection ?",
        options: ["Risotto aux asperges", "Tartare de dorade", "Suprême de volaille", "Tarte fine aux légumes"],
        required: true,
      },
      {
        id: "q3",
        type: "boolean",
        question: "Recommanderiez-vous nos nouveaux plats à vos amis ?",
        required: true,
      },
      {
        id: "q4",
        type: "text",
        question: "Avez-vous des suggestions d'amélioration pour nos nouveaux plats ?",
        required: false,
      },
    ],
    responses: 0,
    completionRate: 0,
  },
  {
    id: "surv-003",
    restaurantId: "rest-001",
    title: "Expérience client - Mars 2025",
    description: "Enquête mensuelle sur l'expérience client",
    status: "completed",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    questions: [
      {
        id: "q1",
        type: "rating",
        question: "Comment évaluez-vous votre expérience globale ?",
        required: true,
      },
      {
        id: "q2",
        type: "rating",
        question: "Comment évaluez-vous l'accueil et le service ?",
        required: true,
      },
      {
        id: "q3",
        type: "rating",
        question: "Comment évaluez-vous la qualité des plats ?",
        required: true,
      },
      {
        id: "q4",
        type: "rating",
        question: "Comment évaluez-vous le cadre et l'ambiance ?",
        required: true,
      },
      {
        id: "q5",
        type: "text",
        question: "Avez-vous des commentaires ou suggestions ?",
        required: false,
      },
    ],
    responses: 87,
    completionRate: 92,
  },
]

// Données pour les graphiques
const ratingDistributionData = [
  { name: "5 étoiles", value: 45 },
  { name: "4 étoiles", value: 30 },
  { name: "3 étoiles", value: 15 },
  { name: "2 étoiles", value: 7 },
  { name: "1 étoile", value: 3 },
]

const ratingTrendData = [
  { name: "Jan", rating: 4.2 },
  { name: "Fév", rating: 4.3 },
  { name: "Mar", rating: 4.1 },
  { name: "Avr", rating: 4.4 },
  { name: "Mai", rating: 4.5 },
  { name: "Juin", rating: 4.6 },
  { name: "Juil", rating: 4.7 },
  { name: "Août", rating: 4.8 },
  { name: "Sep", rating: 4.6 },
  { name: "Oct", rating: 4.5 },
  { name: "Nov", rating: 4.7 },
  { name: "Déc", rating: 4.8 },
]

const categoryScoresData = [
  { name: "Nourriture", score: 4.7 },
  { name: "Service", score: 4.5 },
  { name: "Ambiance", score: 4.6 },
  { name: "Propreté", score: 4.8 },
  { name: "Rapport Q/P", score: 4.2 },
]

export default function FeedbackPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params
  const [reviews, setReviews] = useState<Review[]>([])
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [sourceFilter, setSourceFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simuler un appel API
        await new Promise((resolve) => setTimeout(resolve, 500))
        setReviews(mockReviews.filter((review) => review.restaurantId === restaurantId))
        setSurveys(mockSurveys.filter((survey) => survey.restaurantId === restaurantId))
      } catch (error) {
        console.error("Error fetching feedback data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [restaurantId])

  // Filtrer les avis
  const filteredReviews = reviews.filter((review) => {
    const matchesSource = sourceFilter === "all" || review.source === sourceFilter
    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "5" && review.rating === 5) ||
      (ratingFilter === "4" && review.rating === 4) ||
      (ratingFilter === "3" && review.rating === 3) ||
      (ratingFilter === "2" && review.rating === 2) ||
      (ratingFilter === "1" && review.rating === 1)
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const reviewDate = new Date(review.date)
    const matchesDate =
      (!dateRange.from || reviewDate >= dateRange.from) && (!dateRange.to || reviewDate <= dateRange.to)

    return matchesSource && matchesRating && matchesStatus && matchesDate
  })

  const getSourceBadge = (source: Review["source"]) => {
    switch (source) {
      case "direct":
        return <Badge className="bg-green-500">Site web</Badge>
      case "google":
        return <Badge className="bg-blue-500">Google</Badge>
      case "tripadvisor":
        return <Badge className="bg-green-700">TripAdvisor</Badge>
      case "facebook":
        return <Badge className="bg-blue-700">Facebook</Badge>
      case "other":
        return <Badge className="bg-gray-500">Autre</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  const getStatusBadge = (status: Review["status"]) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Publié</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">En attente</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejeté</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  const getSurveyStatusBadge = (status: Survey["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "draft":
        return <Badge className="bg-gray-500">Brouillon</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Terminée</Badge>
      case "archived":
        return <Badge className="bg-yellow-500">Archivée</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-4 w-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 15.585l-7.07 3.715 1.35-7.865L.36 7.13l7.91-1.15L10 0l1.73 5.98 7.91 1.15-5.92 5.305 1.35 7.865z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    )
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  // Sidebar items
  const sidebarItems = [
    {
      href: `/dashboard/${restaurantId}`,
      title: "Tableau de bord",
    },
    {
      href: `/dashboard/${restaurantId}/tables`,
      title: "Tables",
    },
    {
      href: `/dashboard/${restaurantId}/orders`,
      title: "Commandes",
    },
    {
      href: `/dashboard/${restaurantId}/menu`,
      title: "Menu",
    },
    {
      href: `/dashboard/${restaurantId}/inventory`,
      title: "Inventaire",
    },
    {
      href: `/dashboard/${restaurantId}/staff`,
      title: "Personnel",
    },
    {
      href: `/dashboard/${restaurantId}/reservations`,
      title: "Réservations",
    },
    {
      href: `/dashboard/${restaurantId}/customers`,
      title: "Clients",
    },
    {
      href: `/dashboard/${restaurantId}/analytics`,
      title: "Analyses",
    },
    {
      href: `/dashboard/${restaurantId}/settings`,
      title: "Paramètres",
    },
  ]

  if (loading) {
    return (
      <DashboardShell restaurantId={restaurantId}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Avis et feedback</h1>
        </div>
        <div className="mt-6">Chargement...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Avis et feedback</h1>
        <Button>Créer une enquête</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold">{calculateAverageRating()}</div>
              <div className="ml-2">{renderStars(Number(calculateAverageRating()))}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Sur {reviews.length} avis</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avis récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {reviews.filter((r) => new Date(r.date) >= subDays(new Date(), 30)).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ces 30 derniers jours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux de réponse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round((reviews.filter((r) => r.response).length / reviews.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {reviews.filter((r) => r.response).length} réponses sur {reviews.length} avis
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Enquêtes actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{surveys.filter((s) => s.status === "active").length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {surveys.filter((s) => s.status === "completed").length} enquêtes terminées
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reviews" className="mt-6">
        <TabsList>
          <TabsTrigger value="reviews">Avis clients</TabsTrigger>
          <TabsTrigger value="surveys">Enquêtes</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <DatePickerWithRange value={dateRange} onChange={setDateRange} className="w-full md:w-auto" />
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sources</SelectItem>
                  <SelectItem value="direct">Site web</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="tripadvisor">TripAdvisor</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Note" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les notes</SelectItem>
                  <SelectItem value="5">5 étoiles</SelectItem>
                  <SelectItem value="4">4 étoiles</SelectItem>
                  <SelectItem value="3">3 étoiles</SelectItem>
                  <SelectItem value="2">2 étoiles</SelectItem>
                  <SelectItem value="1">1 étoile</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="published">Publiés</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="rejected">Rejetés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.customerAvatar || "/placeholder.svg"} alt={review.customerName} />
                          <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.customerName}</div>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(review.date), "d MMMM yyyy", { locale: fr })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-auto">
                        {getSourceBadge(review.source)}
                        {getStatusBadge(review.status)}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm">{review.comment}</p>
                      {review.tags && review.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {review.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {review.response && (
                      <div className="mt-4 bg-muted p-3 rounded-md">
                        <div className="font-medium text-sm">Votre réponse:</div>
                        <p className="text-sm mt-1">{review.response}</p>
                      </div>
                    )}
                    {!review.response && (
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          Répondre
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Aucun avis ne correspond à vos critères de recherche.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="surveys" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Enquêtes de satisfaction</h2>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actives</SelectItem>
                <SelectItem value="draft">Brouillons</SelectItem>
                <SelectItem value="completed">Terminées</SelectItem>
                <SelectItem value="archived">Archivées</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map((survey) => (
              <Card key={survey.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{survey.title}</CardTitle>
                    {getSurveyStatusBadge(survey.status)}
                  </div>
                  <CardDescription>{survey.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Période: </span>
                      {format(new Date(survey.startDate), "d MMM yyyy", { locale: fr })}
                      {survey.endDate && ` - ${format(new Date(survey.endDate), "d MMM yyyy", { locale: fr })}`}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Questions: </span>
                      {survey.questions.length}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Réponses: </span>
                      {survey.responses}
                    </div>
                    {survey.status !== "draft" && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Taux de complétion:</span>
                          <span>{survey.completionRate}%</span>
                        </div>
                        <Progress value={survey.completionRate} className="h-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    {survey.status === "draft" ? "Modifier" : "Voir les résultats"}
                  </Button>
                  {survey.status === "draft" && <Button size="sm">Publier</Button>}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribution des notes</CardTitle>
                <CardDescription>Répartition des avis par nombre d'étoiles</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Nombre d'avis",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={ratingDistributionData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évolution des notes</CardTitle>
                <CardDescription>Note moyenne par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    rating: {
                      label: "Note moyenne",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={ratingTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="rating" fill="var(--color-rating)" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Scores par catégorie</CardTitle>
              <CardDescription>Évaluation moyenne par aspect du service</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "Score moyen",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={categoryScoresData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="var(--color-score)" radius={[0, 4, 4, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                  <CardTitle className="text-base">Sources des avis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Google</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">Site web</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">TripAdvisor</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <Progress value={18} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">Facebook</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <LineChart className="h-4 w-4 mr-2 text-muted-foreground" />
                  <CardTitle className="text-base">Tendances des commentaires</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Service</span>
                    <Badge className="bg-green-500">+12%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Nourriture</span>
                    <Badge className="bg-green-500">+8%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Ambiance</span>
                    <Badge className="bg-green-500">+5%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Propreté</span>
                    <Badge className="bg-gray-500">0%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Prix</span>
                    <Badge className="bg-red-500">-3%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <PieChart className="h-4 w-4 mr-2 text-muted-foreground" />
                  <CardTitle className="text-base">Mots-clés fréquents</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-500 text-xs py-1 px-2">délicieux (24)</Badge>
                  <Badge className="bg-blue-500 text-xs py-1 px-2">service (18)</Badge>
                  <Badge className="bg-blue-500 text-xs py-1 px-2">ambiance (15)</Badge>
                  <Badge className="bg-blue-500 text-xs py-1 px-2">qualité (12)</Badge>
                  <Badge className="bg-blue-500 text-xs py-1 px-2">savoureux (10)</Badge>
                  <Badge className="bg-blue-500 text-xs py-1 px-2">accueil (9)</Badge>
                  <Badge className="bg-blue-500 text-xs py-1 px-2">prix (8)</Badge>
                  <Badge className="bg-blue-500 text-xs py-1 px-2">attente (7)</Badge>
                  <Badge className="bg-blue-500 text-xs py-1 px-2">présentation (6)</Badge>
                  <Badge className="bg-blue-500 text-xs py-1 px-2">cadre (5)</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
