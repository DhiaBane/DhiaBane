"use client"

import { AppFeaturesLayout } from "@/components/app-features-layout"
import { clientFeatures } from "@/data/features-data"

export default function ClientPage() {
  return (
    <AppFeaturesLayout
      title="Application Client"
      description="Améliorez l'expérience client avec notre application mobile dédiée"
      features={clientFeatures}
      icon="📱"
    />
  )
}
