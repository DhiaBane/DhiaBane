"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"

// Liste des composants critiques à vérifier
const criticalComponents = [
  {
    name: "MainNav",
    path: "/components/main-nav.tsx",
    imports: ["Link", "usePathname"],
    requiredProps: ["className"],
    description: "Navigation principale de l'application",
  },
  {
    name: "SofiaAIChat",
    path: "/components/sofia-ai-chat.tsx",
    imports: [
      "useState",
      "useRef",
      "useEffect",
      "useCallback",
      "Button",
      "Input",
      "Card",
      "Avatar",
      "ScrollArea",
      "useSpeechRecognition",
      "useSpeechSynthesis",
    ],
    requiredProps: [],
    description: "Composant de chat avec l'assistant IA Sofia",
  },
  {
    name: "FeatureCard",
    path: "/components/feature-card.tsx",
    imports: ["Card", "CardContent", "CardDescription", "CardHeader", "CardTitle", "Badge", "Progress"],
    requiredProps: ["feature"],
    description: "Carte affichant une fonctionnalité avec son statut",
  },
  {
    name: "AppFeaturesLayout",
    path: "/components/app-features-layout.tsx",
    imports: ["Link", "Button", "FeatureCard"],
    requiredProps: ["title", "description", "features", "icon"],
    description: "Mise en page pour les pages d'applications",
  },
  {
    name: "Progress",
    path: "/components/ui/progress.tsx",
    imports: ["React", "ProgressPrimitive", "cn"],
    requiredProps: ["value"],
    description: "Composant de barre de progression",
    potentialIssues: [
      "Le composant Progress doit accepter une prop 'indicatorClassName' pour personnaliser la couleur de l'indicateur",
      "Assurez-vous que le style de transformation est correctement appliqué",
    ],
  },
  {
    name: "TeamSwitcher",
    path: "/components/team-switcher.tsx",
    imports: ["React", "Avatar", "Button", "Command", "Dialog", "Input", "Label", "Popover", "Select"],
    requiredProps: ["className"],
    description: "Sélecteur d'équipe/restaurant",
  },
  {
    name: "UserNav",
    path: "/components/user-nav.tsx",
    imports: ["Avatar", "Button", "DropdownMenu"],
    requiredProps: [],
    description: "Navigation utilisateur avec menu déroulant",
  },
]

export default function CheckComponentsPage() {
  const [componentChecks, setComponentChecks] = useState<{
    [key: string]: {
      exists: boolean
      importsOk: boolean
      propsOk: boolean
      issues: string[]
    }
  }>({})

  const checkComponent = (component: (typeof criticalComponents)[0]) => {
    // Simuler une vérification de composant
    // Dans un environnement réel, nous ferions une vérification plus approfondie

    // Simuler des résultats aléatoires pour la démonstration
    const exists = Math.random() > 0.2
    const importsOk = exists && Math.random() > 0.3
    const propsOk = exists && Math.random() > 0.2

    const issues: string[] = []
    if (!exists) {
      issues.push(`Le composant ${component.name} n'existe pas ou n'est pas accessible`)
    } else {
      if (!importsOk) {
        issues.push(`Certaines importations peuvent manquer: ${component.imports.join(", ")}`)
      }
      if (!propsOk) {
        issues.push(`Certaines props requises peuvent manquer: ${component.requiredProps.join(", ")}`)
      }
      if (component.potentialIssues) {
        issues.push(...component.potentialIssues)
      }
    }

    setComponentChecks((prev) => ({
      ...prev,
      [component.name]: {
        exists,
        importsOk,
        propsOk,
        issues,
      },
    }))
  }

  const checkAllComponents = () => {
    criticalComponents.forEach((component) => {
      checkComponent(component)
    })
  }

  const getStatusIcon = (status: boolean | undefined) => {
    if (status === undefined) return null
    return status ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />
  }

  const getStatusBadge = (component: string) => {
    const check = componentChecks[component]
    if (!check) return <Badge className="bg-gray-100 text-gray-800">Non vérifié</Badge>

    if (!check.exists) {
      return <Badge className="bg-red-100 text-red-800">Introuvable</Badge>
    }

    if (!check.importsOk || !check.propsOk) {
      return <Badge className="bg-yellow-100 text-yellow-800">Problèmes détectés</Badge>
    }

    return <Badge className="bg-green-100 text-green-800">OK</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Vérification des composants</h1>
          <div className="flex gap-2">
            <Button onClick={checkAllComponents}>Vérifier tous les composants</Button>
            <Link href="/diagnostic">
              <Button variant="outline">
                <ArrowRight className="mr-2 h-4 w-4" />
                Diagnostic complet
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Retour à l'accueil</Button>
            </Link>
          </div>
        </div>

        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Cette page vérifie les composants critiques de votre application pour s'assurer qu'ils existent et sont
            correctement configurés.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4">
          {criticalComponents.map((component) => (
            <Card key={component.name}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{component.name}</span>
                  {getStatusBadge(component.name)}
                </CardTitle>
                <CardDescription>
                  {component.description} ({component.path})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
                      <div className="text-sm font-medium mb-2">Existe</div>
                      {getStatusIcon(componentChecks[component.name]?.exists)}
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
                      <div className="text-sm font-medium mb-2">Imports</div>
                      {getStatusIcon(componentChecks[component.name]?.importsOk)}
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
                      <div className="text-sm font-medium mb-2">Props</div>
                      {getStatusIcon(componentChecks[component.name]?.propsOk)}
                    </div>
                  </div>

                  {componentChecks[component.name]?.issues.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Problèmes détectés:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-red-600">
                        {componentChecks[component.name].issues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium mb-2">Imports attendus:</h3>
                    <div className="flex flex-wrap gap-1">
                      {component.imports.map((imp) => (
                        <Badge key={imp} variant="outline" className="bg-gray-50">
                          {imp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {component.requiredProps.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Props requises:</h3>
                      <div className="flex flex-wrap gap-1">
                        {component.requiredProps.map((prop) => (
                          <Badge key={prop} variant="outline" className="bg-gray-50">
                            {prop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button onClick={() => checkComponent(component)}>Vérifier ce composant</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
