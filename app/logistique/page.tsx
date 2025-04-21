"use client"

import { AppFeaturesLayout } from "@/components/app-features-layout"
import { logistiqueFeatures } from "@/data/features-data"

export default function LogistiquePage() {
  return (
    <AppFeaturesLayout
      title="Application Logistique"
      description="Optimisez vos livraisons et suivez votre flotte en temps réel"
      features={logistiqueFeatures}
      icon="🚚"
    />
  )
}
