"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import the SofiaAIChat component with SSR disabled
const SofiaAIChat = dynamic(() => import("@/components/sofia-ai-chat"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="animate-pulse flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <div className="text-lg font-medium">Chargement de Sofia AI...</div>
      </div>
    </div>
  ),
})

// Dynamically import the SofiaAIChatWithSpeech component with SSR disabled
const SofiaAIChatWithSpeech = dynamic(() => import("@/components/sofia-ai-chat-with-speech"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="animate-pulse flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <div className="text-lg font-medium">Chargement de Sofia AI avec reconnaissance vocale...</div>
        <div className="text-sm text-gray-500 mt-2">Préparation des fonctionnalités vocales...</div>
      </div>
    </div>
  ),
})

export function SofiaAIChatClient() {
  const [mounted, setMounted] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)

    // Check if speech recognition is supported
    const checkSpeechSupport = async () => {
      try {
        // Check if we're in a browser environment
        if (typeof window !== "undefined") {
          // Check if SpeechRecognition is available
          const speechSupport = !!(window.SpeechRecognition || window.webkitSpeechRecognition)
          setSpeechSupported(speechSupport)
        }
      } catch (error) {
        console.error("Error checking speech support:", error)
        setSpeechSupported(false)
      } finally {
        setLoading(false)
      }
    }

    checkSpeechSupport()
  }, [])

  if (!mounted || loading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="animate-pulse flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <div className="text-lg font-medium">Initialisation de Sofia AI...</div>
        </div>
      </div>
    )
  }

  // Use the appropriate component based on speech support
  return speechSupported ? <SofiaAIChatWithSpeech /> : <SofiaAIChat />
}
