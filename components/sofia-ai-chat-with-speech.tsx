"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, AlertCircle, Mic, MicOff, Send, Volume2, Repeat, Pause, Play, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { VoiceCommandsHelp } from "@/components/voice-commands-help"

// Import utilities
import { cleanTextForSpeech } from "@/utils/clean-text-for-speech"
import { detectVoiceCommand, getSofiaVoiceCommands, cleanTextFromCommands } from "@/utils/voice-commands"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis"

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

export default function SofiaAIChatWithSpeech() {
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

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastAssistantMessageRef = useRef<string>("")
  const commandTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Use speech hooks directly
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    error: speechRecognitionError,
  } = useSpeechRecognition()

  const {
    speak,
    stop: stopSpeaking,
    pause: pauseSpeaking,
    resume: resumeSpeaking,
    isSpeaking,
    isPaused,
    browserSupportsSpeechSynthesis,
    error: speechSynthesisError,
  } = useSpeechSynthesis()

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

  const repeatLastMessage = useCallback(() => {
    if (lastAssistantMessageRef.current && browserSupportsSpeechSynthesis) {
      const cleanedText = cleanTextForSpeech(lastAssistantMessageRef.current)
      speak(cleanedText)
    }
  }, [browserSupportsSpeechSynthesis, speak])

  const pauseResumeAudio = useCallback(() => {
    if (isSpeaking) {
      if (isPaused) {
        resumeSpeaking()
      } else {
        pauseSpeaking()
      }
    }
  }, [isSpeaking, isPaused, resumeSpeaking, pauseSpeaking])

  // Fonction pour soumettre le formulaire
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim()) return

      // Arrêter la synthèse vocale en cours si une nouvelle requête est envoyée
      if (isSpeaking) {
        stopSpeaking()
      }

      const userMessage: Message = { role: "user", content: input }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      resetTranscript()
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
    [input, isSpeaking, stopSpeaking, resetTranscript],
  )

  // Ajout de commandes vocales spécifiques au domaine de la restauration
  const addRestaurantCommands = useCallback(() => {
    const newRestaurantCommands: VoiceCommand[] = [
      {
        name: "daily-report",
        patterns: ["rapport journalier", "rapport du jour", "bilan journalier"],
        action: () => {
          setInput("Peux-tu me faire un rapport journalier de notre activité ?")
          handleFormSubmit(new Event("submit") as unknown as React.FormEvent)
        },
        feedback: "Je vais générer un rapport journalier.",
      },
      {
        name: "profit-analysis",
        patterns: ["analyse des marges", "plats les moins rentables", "marges faibles"],
        action: () => {
          setInput("Quels plats ont généré le moins de marge cette semaine ?")
          handleFormSubmit(new Event("submit") as unknown as React.FormEvent)
        },
        feedback: "Je vais analyser les marges des plats.",
      },
      {
        name: "anomaly-detection",
        patterns: ["détection d'anomalies", "problèmes détectés", "baisse de performance"],
        action: () => {
          setInput("As-tu détecté une baisse de performance ou une anomalie récemment ?")
          handleFormSubmit(new Event("submit") as unknown as React.FormEvent)
        },
        feedback: "Je vais rechercher des anomalies.",
      },
    ]
    setCustomCommands(newRestaurantCommands)
  }, [handleFormSubmit])

  // Définir les commandes vocales
  const voiceCommands = getSofiaVoiceCommands({
    stopListening,
    repeatLastMessage,
    clearMessages,
    pauseResumeAudio,
    stopAudio: stopSpeaking,
  }).concat(customCommands)

  // Initialisation des commandes spécifiques à la restauration
  useEffect(() => {
    addRestaurantCommands()
  }, [addRestaurantCommands])

  // Défilement automatique vers le bas lorsque les messages changent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Traiter les commandes vocales lorsque la transcription change
  useEffect(() => {
    if (transcript && isListening) {
      const command = detectVoiceCommand(transcript, voiceCommands)

      if (command) {
        // Exécuter la commande
        command.action()

        // Afficher le feedback
        if (command.feedback) {
          setCommandFeedback(command.feedback)

          // Effacer le feedback après 3 secondes
          if (commandTimeoutRef.current) {
            clearTimeout(commandTimeoutRef.current)
          }

          commandTimeoutRef.current = setTimeout(() => {
            setCommandFeedback(null)
          }, 3000)
        }

        // Réinitialiser la transcription
        resetTranscript()
        return
      }

      // Si ce n'est pas une commande, mettre à jour l'input
      setInput(transcript)
    }
  }, [transcript, isListening, voiceCommands, resetTranscript])

  // Envoyer automatiquement le message après la transcription si autoSend est activé
  useEffect(() => {
    if (!isListening && transcript && autoSend) {
      // Vérifier si le transcript contient une commande
      const command = detectVoiceCommand(transcript, voiceCommands)

      // Si c'est une commande, ne pas envoyer automatiquement
      if (command) return

      // Nettoyer le texte des commandes potentielles
      const cleanedText = cleanTextFromCommands(transcript, voiceCommands)

      // Si le texte nettoyé est vide, ne pas envoyer
      if (!cleanedText.trim()) return

      const timer = setTimeout(() => {
        // Utiliser le texte nettoyé pour l'envoi
        setInput(cleanedText)
        document.getElementById("submit-button")?.click()
      }, 1000) // Délai d'une seconde avant l'envoi automatique

      return () => clearTimeout(timer)
    }
  }, [isListening, transcript, autoSend, voiceCommands])

  // Lire automatiquement la réponse de l'IA si autoSpeak est activé
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.role === "assistant" && autoSpeak && browserSupportsSpeechSynthesis) {
      // Stocker le dernier message de l'assistant pour le bouton "Répéter"
      lastAssistantMessageRef.current = lastMessage.content

      // Nettoyer le texte markdown avant la synthèse vocale
      const cleanedText = cleanTextForSpeech(lastMessage.content)
      speak(cleanedText)
    }
  }, [messages, autoSpeak, browserSupportsSpeechSynthesis, speak])

  // Afficher l'erreur de reconnaissance vocale ou de synthèse vocale
  useEffect(() => {
    if (speechRecognitionError) {
      setError(speechRecognitionError)
    } else if (speechSynthesisError) {
      setError(speechSynthesisError)
    }
  }, [speechRecognitionError, speechSynthesisError])

  // Nettoyer les timeouts lors du démontage
  useEffect(() => {
    return () => {
      if (commandTimeoutRef.current) {
        clearTimeout(commandTimeoutRef.current)
      }
    }
  }, [])

  const handleVoiceButtonClick = useCallback(() => {
    if (isListening) {
      setAutoSend(false)
      stopListening()
    } else {
      // Arrêter la synthèse vocale en cours avant de commencer l'écoute
      if (isSpeaking) {
        stopSpeaking()
      }
      startListening()
      setAutoSend(true)
    }
  }, [isListening, stopListening, isSpeaking, stopSpeaking, startListening])

  const toggleSpeaking = useCallback(() => {
    if (isSpeaking) {
      if (isPaused) {
        resumeSpeaking()
      } else {
        pauseSpeaking()
      }
    } else {
      // Si aucune synthèse vocale n'est en cours, répéter le dernier message
      repeatLastMessage()
    }
  }, [isSpeaking, isPaused, resumeSpeaking, pauseSpeaking, repeatLastMessage])

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
            {isSpeaking && (
              <Badge variant="outline" className="ml-2 animate-pulse">
                <Volume2 className="h-3 w-3 mr-1" />
                En train de parler
              </Badge>
            )}
            {commandFeedback && (
              <Badge variant="secondary" className="ml-2">
                {commandFeedback}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4">
            <VoiceCommandsHelp />
            {browserSupportsSpeechRecognition && (
              <div className="flex items-center gap-2">
                <Label htmlFor="continuous-listening" className="text-sm font-normal">
                  Écoute continue
                </Label>
                <Switch
                  id="continuous-listening"
                  checked={continuousListening}
                  onCheckedChange={setContinuousListening}
                />
              </div>
            )}
            {browserSupportsSpeechRecognition && (
              <div className="flex items-center gap-2">
                <Label htmlFor="auto-send" className="text-sm font-normal">
                  Envoi auto
                </Label>
                <Switch id="auto-send" checked={autoSend} onCheckedChange={setAutoSend} />
              </div>
            )}
            {browserSupportsSpeechSynthesis && (
              <div className="flex items-center gap-2">
                <Label htmlFor="auto-speak" className="text-sm font-normal">
                  Lecture auto
                </Label>
                <Switch id="auto-speak" checked={autoSpeak} onCheckedChange={setAutoSpeak} />
              </div>
            )}
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
                      {browserSupportsSpeechSynthesis && message.role === "assistant" && (
                        <div className="flex mt-2 gap-1 justify-end">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => {
                                    stopSpeaking()
                                    const cleanedText = cleanTextForSpeech(message.content)
                                    speak(cleanedText)
                                  }}
                                >
                                  <Repeat className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Relire ce message</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
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
              placeholder={isListening ? "Parlez maintenant... (essayez 'Sofia, aide-moi')" : "Tapez votre message..."}
              value={continuousListening ? transcript : input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className={`flex-grow pr-10 ${isListening ? "border-primary animate-pulse" : ""}`}
            />
            {isListening && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              </div>
            )}
          </div>

          {browserSupportsSpeechSynthesis && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={isSpeaking ? toggleSpeaking : repeatLastMessage}
                    disabled={isLoading || (!isSpeaking && !lastAssistantMessageRef.current)}
                  >
                    {isSpeaking ? (
                      isPaused ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <Pause className="h-4 w-4" />
                      )
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isSpeaking ? (isPaused ? "Reprendre la lecture" : "Mettre en pause") : "Lire la dernière réponse"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

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

          {browserSupportsSpeechRecognition && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={isListening ? "destructive" : "outline"}
                    size="icon"
                    onClick={handleVoiceButtonClick}
                    disabled={isLoading}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isListening ? "Arrêter l'écoute" : "Parler à Sofia"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <Button id="submit-button" type="submit" disabled={isLoading || (!input.trim() && !isListening)}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
