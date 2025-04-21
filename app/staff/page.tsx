"use client"

import { AppFeaturesLayout } from "@/components/app-features-layout"
import { staffFeatures } from "@/data/features-data"

export default function StaffPage() {
  return (
    <AppFeaturesLayout
      title="Application Staff"
      description="Outils pour le personnel de restaurant : planning, pointage et communication"
      features={staffFeatures}
      icon="👨‍🍳"
    />
  )
}
