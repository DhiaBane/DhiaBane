"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, MessageSquare, Gift, Brain, CreditCard, ShieldCheck } from "lucide-react"

// Mock modules data
const modules = [
  {
    id: "loyalty",
    name: "Programme de Fidélité",
    description: "Système de points et récompenses pour les clients fidèles",
    icon: Gift,
    enabled: true,
    category: "marketing",
  },
  {
    id: "ai-recommendations",
    name: "Recommandations IA",
    description: "Suggestions de plats basées sur les préférences des clients",
    icon: Brain,
    enabled: true,
    category: "ai",
  },
  {
    id: "messaging",
    name: "Messagerie Client",
    description: "Communication directe avec les clients via l'application",
    icon: MessageSquare,
    enabled: false,
    category: "communication",
  },
  {
    id: "advanced-analytics",
    name: "Analytiques Avancées",
    description: "Rapports détaillés et prévisions pour les restaurants",
    icon: Settings,
    enabled: true,
    category: "analytics",
  },
  {
    id: "payment-processing",
    name: "Traitement des Paiements",
    description: "Intégration avec les principaux processeurs de paiement",
    icon: CreditCard,
    enabled: true,
    category: "finance",
  },
  {
    id: "security-audit",
    name: "Audit de Sécurité",
    description: "Vérifications de sécurité automatisées pour les restaurants",
    icon: ShieldCheck,
    enabled: false,
    category: "security",
  },
]

export default function ModulesPage() {
  const [activeModules, setActiveModules] = useState(
    modules.reduce(
      (acc, module) => {
        acc[module.id] = module.enabled
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const handleToggleModule = (moduleId: string) => {
    setActiveModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  const categories = Array.from(new Set(modules.map((m) => m.category)))

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestion des Modules</h1>
        <p className="text-muted-foreground">
          Activez ou désactivez les modules pour toutes les applications connectées.
        </p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card key={module.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="rounded-full bg-blue-100 p-2">
                        <module.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                    </div>
                    <Badge variant={activeModules[module.id] ? "default" : "outline"}>
                      {activeModules[module.id] ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`module-${module.id}`} className="cursor-pointer">
                      {activeModules[module.id] ? "Désactiver" : "Activer"} le module
                    </Label>
                    <Switch
                      id={`module-${module.id}`}
                      checked={activeModules[module.id]}
                      onCheckedChange={() => handleToggleModule(module.id)}
                    />
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Configurer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modules
                .filter((m) => m.category === category)
                .map((module) => (
                  <Card key={module.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="rounded-full bg-blue-100 p-2">
                            <module.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <CardTitle className="text-lg">{module.name}</CardTitle>
                        </div>
                        <Badge variant={activeModules[module.id] ? "default" : "outline"}>
                          {activeModules[module.id] ? "Actif" : "Inactif"}
                        </Badge>
                      </div>
                      <CardDescription className="mt-2">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`module-cat-${module.id}`} className="cursor-pointer">
                          {activeModules[module.id] ? "Désactiver" : "Activer"} le module
                        </Label>
                        <Switch
                          id={`module-cat-${module.id}`}
                          checked={activeModules[module.id]}
                          onCheckedChange={() => handleToggleModule(module.id)}
                        />
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          Configurer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
