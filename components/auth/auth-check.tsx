"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthCheckProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

export function AuthCheck({ children, fallback }: AuthCheckProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Dans une application réelle, nous vérifierions l'authentification via une API
    // Pour cette démo, nous simulons l'authentification avec le localStorage

    // Vérifier si nous sommes côté client
    if (typeof window !== "undefined") {
      // Simuler une vérification d'authentification
      const checkAuth = () => {
        // Vérifier si un token existe dans localStorage
        const token = localStorage.getItem("auth_token")
        setIsAuthenticated(!!token)
      }

      checkAuth()

      // Écouter les changements d'authentification
      window.addEventListener("storage", checkAuth)

      return () => {
        window.removeEventListener("storage", checkAuth)
      }
    }
  }, [])

  // Afficher un état de chargement si l'authentification n'est pas encore vérifiée
  if (isAuthenticated === null) {
    return null
  }

  // Afficher le contenu approprié en fonction de l'état d'authentification
  return isAuthenticated ? <>{children}</> : <>{fallback}</>
}
