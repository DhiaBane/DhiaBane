"use client"

import { AppFeaturesLayout } from "@/components/app-features-layout"
import { restaurateurFeatures } from "@/data/features-data"

export default function RestaurateurPage() {
  return (
    <AppFeaturesLayout
      title="Application Restaurateur"
      description="Gérez efficacement votre établissement avec nos outils dédiés aux restaurateurs"
      features={restaurateurFeatures}
      icon="🍽️"
    />
  )
}
