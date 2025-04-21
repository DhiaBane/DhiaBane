"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeatureCard, type FeatureProps } from "@/components/feature-card"
import { ChevronLeft } from "lucide-react"

interface AppFeaturesLayoutProps {
  title: string
  description: string
  features: FeatureProps[]
  icon: string
}

export function AppFeaturesLayout({ title, description, features, icon }: AppFeaturesLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Retour
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            {icon} {title}
          </h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  )
}
