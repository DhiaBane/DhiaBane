"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export interface FeatureProps {
  id: string
  name: string
  description: string
  implemented: boolean
  progress?: number
  url?: string
}

export function FeatureCard({ feature }: { feature: FeatureProps }) {
  const router = useRouter()

  const handleClick = () => {
    if (feature.url) {
      router.push(feature.url)
    }
  }

  return (
    <Card
      className={`transition-all duration-200 ${feature.url ? "hover:shadow-md cursor-pointer" : ""}`}
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{feature.name}</CardTitle>
          {feature.implemented ? (
            <Badge variant="default" className="bg-green-600">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Implémenté
            </Badge>
          ) : feature.progress && feature.progress > 0 ? (
            <Badge variant="outline" className="border-amber-500 text-amber-500">
              <Clock className="h-3.5 w-3.5 mr-1" />
              En cours
            </Badge>
          ) : (
            <Badge variant="outline" className="border-gray-400 text-gray-400">
              Planifié
            </Badge>
          )}
        </div>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!feature.implemented && feature.progress !== undefined && feature.progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progression</span>
              <span>{feature.progress}%</span>
            </div>
            <Progress value={feature.progress} className="h-2" />
          </div>
        )}
        {feature.url && (
          <div className="flex justify-end mt-2">
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
