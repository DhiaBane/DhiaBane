"use client"

import { AppFeaturesLayout } from "@/components/app-features-layout"
import { fournisseurFeatures } from "@/data/features-data"

export default function FournisseurPage() {
  return (
    <AppFeaturesLayout
      title="Application Fournisseurs"
      description="Plateforme dédiée aux fournisseurs pour gérer les commandes et le catalogue"
      features={fournisseurFeatures}
      icon="🏭"
    />
  )
}
