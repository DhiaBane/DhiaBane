"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Bell, Send, Search, AlertTriangle, CheckCircle, Info, HelpCircle } from "lucide-react"

// Mock messages data
const messages = [
  {
    id: "1",
    title: "Problème de connexion",
    content: "Plusieurs utilisateurs signalent des problèmes de connexion à l'application restaurant.",
    sender: "support@restopilote.com",
    date: "2025-04-15T10:30:00",
    type: "alert",
    read: false,
  },
  {
    id: "2",
    title: "Mise à jour système",
    content: "Une mise à jour du système est prévue pour le 20 avril à 03:00. Durée estimée: 2 heures.",
    sender: "system@restopilote.com",
    date: "2025-04-14T14:45:00",
    type: "info",
    read: true,
  },
  {
    id: "3",
    title: "Nouveau restaurant inscrit",
    content: 'Le restaurant "La Belle Époque" vient de s\'inscrire sur la plateforme.',
    sender: "notifications@restopilote.com",
    date: "2025-04-14T09:15:00",
    type: "success",
    read: false,
  },
  {
    id: "4",
    title: "Demande d'assistance",
    content: 'Le restaurant "Chez Michel" a besoin d\'aide pour configurer son menu.',
    sender: "support@restopilote.com",
    date: "2025-04-13T16:20:00",
    type: "question",
    read: true,
  },
  {
    id: "5",
    title: "Erreur de paiement",
    content: "Des erreurs de paiement ont été détectées pour certaines transactions.",
    sender: "payments@restopilote.com",
    date: "2025-04-12T11:10:00",
    type: "alert",
    read: true,
  },
]

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMessages = messages.filter((message) => {
    if (activeTab !== "all" && message.type !== activeTab) {
      return false
    }

    if (searchQuery) {
      return (
        message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.sender.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return true
  })

  const getIconForType = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "question":
        return <HelpCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Centre de Messages</h1>
        <p className="text-muted-foreground">Gérez les messages et les alertes de la plateforme.</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Rechercher des messages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Nouveau Message
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            Tous
            <Badge variant="outline" className="ml-2">
              {messages.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="alert">
            Alertes
            <Badge variant="outline" className="ml-2">
              {messages.filter((m) => m.type === "alert").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="info">
            Informations
            <Badge variant="outline" className="ml-2">
              {messages.filter((m) => m.type === "info").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="success">
            Succès
            <Badge variant="outline" className="ml-2">
              {messages.filter((m) => m.type === "success").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="question">
            Questions
            <Badge variant="outline" className="ml-2">
              {messages.filter((m) => m.type === "question").length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                {activeTab === "all" ? "Tous les messages et notifications" : `Messages de type ${activeTab}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-4 rounded-lg border p-4 ${
                        message.read ? "bg-white" : "bg-blue-50"
                      }`}
                    >
                      <div className="mt-0.5">{getIconForType(message.type)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{message.title}</p>
                          <div className="flex items-center space-x-2">
                            {!message.read && (
                              <Badge variant="default" className="text-xs">
                                Nouveau
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              {new Date(message.date).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{message.content}</p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-gray-500">{message.sender}</span>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              Marquer comme lu
                            </Button>
                            <Button size="sm">
                              <Send className="mr-2 h-3 w-3" />
                              Répondre
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Bell className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium">Aucun message trouvé</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {searchQuery
                        ? "Aucun message ne correspond à votre recherche"
                        : "Vous n'avez pas de messages dans cette catégorie"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
