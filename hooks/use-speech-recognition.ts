"use client"

import { useState, useEffect, useCallback } from "react"

interface SpeechRecognitionHook {
  isListening: boolean
  transcript: string
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
  browserSupportsSpeechRecognition: boolean
  error: string | null
}

// Définition du type pour l'API SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: {
    isFinal: boolean
    [index: number]: {
      [index: number]: {
        transcript: string
      }
    }
  }
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

// Définition du type pour l'API SpeechRecognition
interface SpeechRecognitionAPI extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onerror: (event: SpeechRecognitionErrorEvent) => void
  onresult: (event: SpeechRecognitionEvent) => void
  onend: (event: Event) => void
}

// Vérifier si le navigateur prend en charge la reconnaissance vocale
const SpeechRecognition = (window.SpeechRecognition || window.webkitSpeechRecognition || null) as unknown as {
  new (): SpeechRecognitionAPI
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [recognition, setRecognition] = useState<SpeechRecognitionAPI | null>(null)

  // Vérifier si le navigateur prend en charge la reconnaissance vocale
  const browserSupportsSpeechRecognition = typeof SpeechRecognition !== "undefined" && SpeechRecognition !== null

  // Initialiser la reconnaissance vocale
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setError("Votre navigateur ne prend pas en charge la reconnaissance vocale.")
      return
    }

    try {
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = "fr-FR"

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let currentTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript
        }
        setTranscript(currentTranscript)
      }

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === "no-speech") {
          // Ignorer cette erreur spécifique car elle est fréquente et non critique
          return
        }
        setError(`Erreur de reconnaissance vocale: ${event.error}`)
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    } catch (err) {
      setError("Erreur lors de l'initialisation de la reconnaissance vocale.")
      console.error("Erreur d'initialisation de la reconnaissance vocale:", err)
    }

    return () => {
      if (recognition) {
        try {
          recognition.abort()
        } catch (err) {
          console.error("Erreur lors de l'arrêt de la reconnaissance vocale:", err)
        }
      }
    }
  }, [browserSupportsSpeechRecognition])

  // Démarrer l'écoute
  const startListening = useCallback(() => {
    if (!recognition) return

    setError(null)
    try {
      recognition.start()
      setIsListening(true)
    } catch (err) {
      setError("Erreur lors du démarrage de la reconnaissance vocale.")
      console.error("Erreur de démarrage de la reconnaissance vocale:", err)
    }
  }, [recognition])

  // Arrêter l'écoute
  const stopListening = useCallback(() => {
    if (!recognition) return

    try {
      recognition.stop()
      setIsListening(false)
    } catch (err) {
      setError("Erreur lors de l'arrêt de la reconnaissance vocale.")
      console.error("Erreur d'arrêt de la reconnaissance vocale:", err)
    }
  }, [recognition])

  // Réinitialiser la transcription
  const resetTranscript = useCallback(() => {
    setTranscript("")
  }, [])

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    error,
  }
}
