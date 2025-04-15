"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Book, Calendar, CheckCircle, Clock, FileText, GraduationCap, Play, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types for our training data
type TrainingModule = {
  id: string
  title: string
  description: string
  duration: string
  category: string
  level: "Débutant" | "Intermédiaire" | "Avancé"
  progress: number
  completed: boolean
  thumbnail: string
}

type TrainingSession = {
  id: string
  title: string
  date: string
  time: string
  duration: string
  trainer: string
  participants: number
  maxParticipants: number
  location: string
  status: "Planifiée" | "En cours" | "Terminée" | "Annulée"
}

type TrainingResource = {
  id: string
  title: string
  type: "PDF" | "Vidéo" | "Quiz" | "Checklist"
  category: string
  dateAdded: string
  size?: string
  duration?: string
  downloadUrl?: string
}

type EmployeeTraining = {
  id: string
  name: string
  position: string
  avatar: string
  completedModules: number
  totalModules: number
  lastActivity: string
  certifications: string[]
}

// Mock data
const trainingModules: TrainingModule[] = [
  {
    id: "1",
    title: "Accueil et service client",
    description: "Apprenez les bases de l'accueil client et du service de qualité",
    duration: "2h 30min",
    category: "Service",
    level: "Débutant",
    progress: 100,
    completed: true,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "2",
    title: "Hygiène et sécurité alimentaire",
    description: "Formation obligatoire sur les normes HACCP et la sécurité alimentaire",
    duration: "4h 15min",
    category: "Cuisine",
    level: "Intermédiaire",
    progress: 75,
    completed: false,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "3",
    title: "Gestion des stocks et inventaire",
    description: "Optimisez la gestion de vos stocks et réduisez le gaspillage",
    duration: "3h 45min",
    category: "Administration",
    level: "Avancé",
    progress: 30,
    completed: false,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "4",
    title: "Techniques de vente additionnelle",
    description: "Augmentez votre chiffre d'affaires grâce aux techniques de vente croisée",
    duration: "1h 45min",
    category: "Service",
    level: "Intermédiaire",
    progress: 0,
    completed: false,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "5",
    title: "Gestion des conflits clients",
    description: "Apprenez à gérer les situations difficiles avec les clients",
    duration: "2h 00min",
    category: "Service",
    level: "Avancé",
    progress: 50,
    completed: false,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "6",
    title: "Bases de la cuisine française",
    description: "Les fondamentaux de la cuisine française traditionnelle",
    duration: "5h 30min",
    category: "Cuisine",
    level: "Débutant",
    progress: 10,
    completed: false,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

const trainingSessions: TrainingSession[] = [
  {
    id: "1",
    title: "Formation service en salle",
    date: "15 avril 2025",
    time: "09:00",
    duration: "3h",
    trainer: "Marie Dupont",
    participants: 8,
    maxParticipants: 12,
    location: "Salle de formation principale",
    status: "Planifiée",
  },
  {
    id: "2",
    title: "Atelier cocktails et mixologie",
    date: "18 avril 2025",
    time: "14:30",
    duration: "2h",
    trainer: "Jean Martin",
    participants: 6,
    maxParticipants: 8,
    location: "Bar principal",
    status: "Planifiée",
  },
  {
    id: "3",
    title: "Formation sécurité incendie",
    date: "10 avril 2025",
    time: "10:00",
    duration: "1h30",
    trainer: "Pierre Legrand",
    participants: 15,
    maxParticipants: 15,
    location: "Extérieur + salle de conférence",
    status: "Terminée",
  },
  {
    id: "4",
    title: "Certification hygiène HACCP",
    date: "25 avril 2025",
    time: "09:00",
    duration: "6h",
    trainer: "Sophie Moreau",
    participants: 4,
    maxParticipants: 10,
    location: "Salle de formation principale",
    status: "Planifiée",
  },
]

const trainingResources: TrainingResource[] = [
  {
    id: "1",
    title: "Guide d'hygiène en cuisine",
    type: "PDF",
    category: "Cuisine",
    dateAdded: "05/03/2025",
    size: "2.4 MB",
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Techniques de dressage des assiettes",
    type: "Vidéo",
    category: "Cuisine",
    dateAdded: "12/03/2025",
    duration: "18 min",
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Quiz sur le service client",
    type: "Quiz",
    category: "Service",
    dateAdded: "20/03/2025",
    duration: "10 min",
    downloadUrl: "#",
  },
  {
    id: "4",
    title: "Checklist d'ouverture du restaurant",
    type: "Checklist",
    category: "Administration",
    dateAdded: "01/04/2025",
    size: "0.5 MB",
    downloadUrl: "#",
  },
  {
    id: "5",
    title: "Réglementation allergènes",
    type: "PDF",
    category: "Cuisine",
    dateAdded: "08/04/2025",
    size: "3.1 MB",
    downloadUrl: "#",
  },
]

const employeeTrainings: EmployeeTraining[] = [
  {
    id: "1",
    name: "Thomas Bernard",
    position: "Chef de rang",
    avatar: "/placeholder.svg?height=40&width=40",
    completedModules: 8,
    totalModules: 10,
    lastActivity: "12/04/2025",
    certifications: ["Service client", "Vente additionnelle"],
  },
  {
    id: "2",
    name: "Lucie Petit",
    position: "Serveuse",
    avatar: "/placeholder.svg?height=40&width=40",
    completedModules: 5,
    totalModules: 8,
    lastActivity: "10/04/2025",
    certifications: ["Service client"],
  },
  {
    id: "3",
    name: "Marc Dubois",
    position: "Commis de cuisine",
    avatar: "/placeholder.svg?height=40&width=40",
    completedModules: 6,
    totalModules: 12,
    lastActivity: "08/04/2025",
    certifications: ["HACCP", "Sécurité"],
  },
  {
    id: "4",
    name: "Émilie Laurent",
    position: "Responsable de salle",
    avatar: "/placeholder.svg?height=40&width=40",
    completedModules: 12,
    totalModules: 15,
    lastActivity: "13/04/2025",
    certifications: ["Management", "Service client", "Gestion des conflits"],
  },
  {
    id: "5",
    name: "Antoine Moreau",
    position: "Barman",
    avatar: "/placeholder.svg?height=40&width=40",
    completedModules: 7,
    totalModules: 9,
    lastActivity: "11/04/2025",
    certifications: ["Mixologie", "Service client"],
  },
]

export default function TrainingPage() {
  const params = useParams<{ restaurantId: string }>()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  // Filter training modules based on search and filters
  const filteredModules = trainingModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || module.category === categoryFilter
    const matchesLevel = levelFilter === "all" || module.level === levelFilter

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Formation et développement</h1>
          <p className="text-muted-foreground">
            Gérez les formations, suivez les progrès et développez les compétences de votre équipe
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Planifier une formation
        </Button>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="modules">
            <Book className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Modules de formation</span>
            <span className="inline md:hidden">Modules</span>
          </TabsTrigger>
          <TabsTrigger value="sessions">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Sessions programmées</span>
            <span className="inline md:hidden">Sessions</span>
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Ressources pédagogiques</span>
            <span className="inline md:hidden">Ressources</span>
          </TabsTrigger>
          <TabsTrigger value="employees">
            <GraduationCap className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Suivi des employés</span>
            <span className="inline md:hidden">Employés</span>
          </TabsTrigger>
        </TabsList>

        {/* Modules de formation */}
        <TabsContent value="modules" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un module de formation..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Cuisine">Cuisine</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les niveaux</SelectItem>
                  <SelectItem value="Débutant">Débutant</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="Avancé">Avancé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.length > 0 ? (
              filteredModules.map((module) => (
                <Card key={module.id} className="overflow-hidden">
                  <div className="relative h-[120px] w-full">
                    <img
                      src={module.thumbnail || "/placeholder.svg"}
                      alt={module.title}
                      className="object-cover w-full h-full"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={
                        module.level === "Débutant"
                          ? "default"
                          : module.level === "Intermédiaire"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {module.level}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      {module.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                    <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        {module.duration}
                      </span>
                      <span className="text-muted-foreground">{module.progress}% complété</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={module.completed ? "outline" : "default"}>
                      {module.completed ? "Revoir" : module.progress > 0 ? "Continuer" : "Commencer"}
                      {!module.completed && <Play className="ml-2 h-4 w-4" />}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">Aucun module de formation ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Sessions programmées */}
        <TabsContent value="sessions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Sessions de formation à venir</h2>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="scheduled">Planifiées</SelectItem>
                <SelectItem value="completed">Terminées</SelectItem>
                <SelectItem value="cancelled">Annulées</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {trainingSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{session.title}</h3>
                        <Badge
                          variant={
                            session.status === "Planifiée"
                              ? "default"
                              : session.status === "En cours"
                                ? "secondary"
                                : session.status === "Terminée"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {session.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">Formateur: {session.trainer}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {session.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {session.time} ({session.duration})
                        </span>
                      </div>
                      <p className="text-sm">{session.location}</p>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Participants</p>
                        <p className="font-medium">
                          {session.participants}/{session.maxParticipants}
                        </p>
                        <Progress
                          value={(session.participants / session.maxParticipants) * 100}
                          className="h-2 mt-1 w-[120px] ml-auto"
                        />
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0 md:justify-end">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                        {session.status === "Planifiée" && <Button size="sm">S'inscrire</Button>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Ressources pédagogiques */}
        <TabsContent value="resources" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher une ressource..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Type de ressource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="video">Vidéo</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="checklist">Checklist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white rounded-lg border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b">
              <div className="col-span-5 md:col-span-6">Titre</div>
              <div className="col-span-3 md:col-span-2">Type</div>
              <div className="hidden md:block md:col-span-2">Catégorie</div>
              <div className="col-span-2 md:col-span-1">Date</div>
              <div className="col-span-2 md:col-span-1">Action</div>
            </div>
            {trainingResources.map((resource) => (
              <div
                key={resource.id}
                className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-muted/50"
              >
                <div className="col-span-5 md:col-span-6 font-medium">{resource.title}</div>
                <div className="col-span-3 md:col-span-2">
                  <Badge variant="outline">{resource.type}</Badge>
                </div>
                <div className="hidden md:block md:col-span-2 text-muted-foreground">{resource.category}</div>
                <div className="col-span-2 md:col-span-1 text-muted-foreground text-sm">{resource.dateAdded}</div>
                <div className="col-span-2 md:col-span-1">
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">Télécharger</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Suivi des employés */}
        <TabsContent value="employees" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Progression des formations par employé</h2>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Exporter le rapport
            </Button>
          </div>

          <div className="space-y-4">
            {employeeTrainings.map((employee) => (
              <Card key={employee.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.position}</p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col md:flex-row justify-between gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Progression globale</p>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={(employee.completedModules / employee.totalModules) * 100}
                              className="h-2 w-full md:w-[200px]"
                            />
                            <span className="text-sm font-medium">
                              {Math.round((employee.completedModules / employee.totalModules) * 100)}%
                            </span>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Dernière activité: </span>
                          <span>{employee.lastActivity}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                        <div className="flex flex-wrap gap-2">
                          {employee.certifications.map((cert, index) => (
                            <Badge key={index} variant="secondary">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
