"use client"

import { useState, useEffect } from "react"

export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Vérifier au chargement initial
    checkIsMobile()

    // Ajouter un écouteur d'événement pour les changements de taille
    window.addEventListener("resize", checkIsMobile)

    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [breakpoint])

  return isMobile
}
