"use client"

import { useState, useEffect, useCallback } from "react"

interface SpeechSynthesisHook {
  speak: (text: string) => void
  stop: () => void
  pause: () => void
  resume: () => void
  isSpeaking: boolean
  isPaused: boolean
  browserSupportsSpeechSynthesis: boolean
  error: string | null
}

export function useSpeechSynthesis(): SpeechSynthesisHook {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  // Vérifier si le navigateur prend en charge la synthèse vocale
  const browserSupportsSpeechSynthesis = typeof window !== "undefined" && "speechSynthesis" in window

  // Nettoyer la synthèse vocale lors du démontage
  useEffect(() => {
    return () => {
      if (browserSupportsSpeechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [browserSupportsSpeechSynthesis])

  // Fonction pour parler
  const speak = useCallback(
    (text: string) => {
      if (!browserSupportsSpeechSynthesis) {
        setError("Votre navigateur ne prend pas en charge la synthèse vocale.")
        return
      }

      try {
        // Arrêter toute synthèse vocale en cours
        window.speechSynthesis.cancel()

        // Créer une nouvelle instance d'énoncé
        const newUtterance = new SpeechSynthesisUtterance(text)

        // Configurer la voix (français si disponible)
        const voices = window.speechSynthesis.getVoices()
        const frenchVoice = voices.find((voice) => voice.lang.includes("fr"))
        if (frenchVoice) {
          newUtterance.voice = frenchVoice
        }

        // Configurer les propriétés de l'énoncé
        newUtterance.rate = 1.0
        newUtterance.pitch = 1.0
        newUtterance.volume = 1.0
        newUtterance.lang = "fr-FR"

        // Gérer les événements
        newUtterance.onstart = () => {
          setIsSpeaking(true)
          setIsPaused(false)
        }

        newUtterance.onend = () => {
          setIsSpeaking(false)
          setIsPaused(false)
          setUtterance(null)
        }

        newUtterance.onerror = (event) => {
          setError(`Erreur de synthèse vocale: ${event.error}`)
          setIsSpeaking(false)
          setIsPaused(false)
          setUtterance(null)
        }

        // Stocker l'énoncé pour pouvoir le manipuler plus tard
        setUtterance(newUtterance)

        // Démarrer la synthèse vocale
        window.speechSynthesis.speak(newUtterance)
      } catch (err) {
        setError("Erreur lors de l'initialisation de la synthèse vocale.")
        console.error("Erreur d'initialisation de la synthèse vocale:", err)
      }
    },
    [browserSupportsSpeechSynthesis],
  )

  // Fonction pour arrêter la synthèse vocale
  const stop = useCallback(() => {
    if (!browserSupportsSpeechSynthesis) return

    try {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setIsPaused(false)
      setUtterance(null)
    } catch (err) {
      setError("Erreur lors de l'arrêt de la synthèse vocale.")
      console.error("Erreur d'arrêt de la synthèse vocale:", err)
    }
  }, [browserSupportsSpeechSynthesis])

  // Fonction pour mettre en pause la synthèse vocale
  const pause = useCallback(() => {
    if (!browserSupportsSpeechSynthesis || !isSpeaking) return

    try {
      window.speechSynthesis.pause()
      setIsPaused(true)
    } catch (err) {
      setError("Erreur lors de la mise en pause de la synthèse vocale.")
      console.error("Erreur de mise en pause de la synthèse vocale:", err)
    }
  }, [browserSupportsSpeechSynthesis, isSpeaking])

  // Fonction pour reprendre la synthèse vocale
  const resume = useCallback(() => {
    if (!browserSupportsSpeechSynthesis || !isPaused) return

    try {
      window.speechSynthesis.resume()
      setIsPaused(false)
    } catch (err) {
      setError("Erreur lors de la reprise de la synthèse vocale.")
      console.error("Erreur de reprise de la synthèse vocale:", err)
    }
  }, [browserSupportsSpeechSynthesis, isPaused])

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    browserSupportsSpeechSynthesis,
    error,
  }
}
