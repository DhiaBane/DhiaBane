"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, AlertCircle, Send, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { VoiceCommandsHelp } from "@/components/voice-commands-help"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface VoiceCommand {
  name: string
  patterns: string[]
  action: () => void
  feedback?: string
}

export default function SofiaAIChat() {
  // State
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Bonjour, je suis Sofia, votre assistante IA exclusive pour les restaurateurs. Je peux vous aider avec des rapports d'activité, l'analyse des performances et la détection d'anomalies. Comment puis-je vous aider aujourd'hui?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [autoSend, setAutoSend] = useState(true)
  const [autoSpeak, setAutoSpeak] = useState(true)
  const [continuousListening, setContinuousListening] = useState(true)
  const [commandFeedback, setCommandFeedback] = useState<string | null>(null)
  const [customCommands, setCustomCommands] = useState<VoiceCommand[]>([])
  const [mounted, setMounted] = useState(false)

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastAssistantMessageRef = useRef<string>("")
  const commandTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if we're in the browser
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fonctions pour les commandes vocales
  const clearMessages = useCallback(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "Bonjour, je suis Sofia, votre assistante IA exclusive pour les restaurateurs. Je peux vous aider avec des rapports d'activité, l'analyse des performances et la détection d'anomalies. Comment puis-je vous aider aujourd'hui?",
      },
    ])
  }, [])

  // Fonction pour soumettre le formulaire
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim()) return

      const userMessage: Message = { role: "user", content: input }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)
      setError(null)

      try {
        // Simulation de réponse pour éviter les erreurs d'API
        setTimeout(() => {
          const responses = [
            "D'après mes analyses, votre restaurant a servi 120 clients aujourd'hui, avec un panier moyen de 32€. Les plats les plus vendus étaient la salade César et le steak frites. Votre chiffre d'affaires du jour est de 3840€, soit une augmentation de 15% par rapport à la même journée la semaine dernière.",
            "Les plats ayant généré le moins de marge cette semaine sont le risotto aux champignons (22% de marge) et la tarte aux pommes (25% de marge). Je vous suggère de revoir leur prix de vente ou d'optimiser leur coût de production.",
            "J'ai détecté une baisse de fréquentation de 8% le mardi soir par rapport au mois dernier. Cette tendance pourrait être liée à l'ouverture récente d'un nouveau restaurant dans le quartier. Je vous suggère de proposer une promotion spéciale pour les mardis soir.",
            "Voici les tendances de fréquentation ce mois-ci : +12% le week-end, -5% en semaine, avec un pic d'affluence le vendredi soir. Les réservations en ligne ont augmenté de 20% par rapport au mois précédent.",
          ]

          const randomResponse = responses[Math.floor(Math.random() * responses.length)]

          setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
          setIsLoading(false)
        }, 1500)
      } catch (error) {
        console.error("Error in Sofia AI chat:", error)
        setError(error instanceof Error ? error.message : "Une erreur inconnue s'est produite")
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Désolé, une erreur s'est produite. Veuillez réessayer avec un message plus court.`,
          },
        ])
        setIsLoading(false)
      }
    },
    [input],
  )

  // Défilement automatique vers le bas lorsque les messages changent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Nettoyer les timeouts lors du démontage
  useEffect(() => {
    return () => {
      if (commandTimeoutRef.current) {
        clearTimeout(commandTimeoutRef.current)
      }
    }
  }, [])

  // If not mounted yet, show a loading state
  if (!mounted) {
    return (
      <Card className="w-full h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <span>Sofia AI - Assistant Restaurateur</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Chargement de Sofia AI...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/abstract-ai-network.png" alt="Sofia" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <span>Sofia AI - Assistant Restaurateur</span>
          </div>
          <div className="flex items-center gap-4">
            <VoiceCommandsHelp />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        {error && (
          <Alert variant="destructive" className="mx-4 mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <ScrollArea className="h-[calc(600px-8rem)] px-4">
          <div className="space-y-4 pt-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="relative">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-2">
        <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
          <div className="relative flex-grow">
            <Input
              placeholder="Tapez votre message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-grow pr-10"
            />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={clearMessages}
                  disabled={isLoading || messages.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Effacer la conversation</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button id="submit-button" type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
