"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, FileCode, FolderOpen } from "lucide-react"
import Link from "next/link"

// Liste des problèmes courants et leurs solutions
const commonIssues = [
  {
    id: "missing-page",
    title: "Pages manquantes",
    description: "Certaines pages référencées dans la navigation n'existent pas",
    solution: `Créez les fichiers page.tsx manquants dans les dossiers correspondants. Par exemple:
    
\`\`\`tsx
// app/route-name/page.tsx
export default function RoutePage() {
  return (
    <div>
      <h1>Contenu de la page</h1>
    </div>
  )
}
\`\`\``,
    affectedRoutes: ["/reservations", "/menu", "/commandes", "/inventaire", "/personnel"],
  },
  {
    id: "missing-loading",
    title: "Pages de chargement manquantes",
    description: "Certaines pages n'ont pas de composant de chargement",
    solution: `Créez les fichiers loading.tsx dans les dossiers correspondants:
    
\`\`\`tsx
// app/route-name/loading.tsx
export default function Loading() {
  return null
}
\`\`\``,
    affectedRoutes: ["/reservations", "/menu", "/commandes", "/inventaire", "/personnel"],
  },
  {
    id: "component-errors",
    title: "Erreurs de composants",
    description: "Certains composants utilisés dans les pages peuvent causer des erreurs",
    solution: `Vérifiez que tous les composants importés existent et que les props sont correctes:
    
\`\`\`tsx
// Exemple de correction d'import
import { ComponentName } from "@/components/component-name"

// Exemple de correction de props
<ComponentName prop1="value1" prop2="value2" />
\`\`\``,
    affectedComponents: ["Progress", "SofiaAIChat", "TeamSwitcher", "UserNav"],
  },
  {
    id: "navigation-errors",
    title: "Erreurs de navigation",
    description: "Les liens dans la navigation peuvent pointer vers des routes incorrectes",
    solution: `Vérifiez et corrigez les liens dans les composants de navigation:
    
\`\`\`tsx
// components/main-nav.tsx
<Link href="/correct-route">Lien</Link>
\`\`\``,
    affectedComponents: ["MainNav", "AppFeaturesLayout"],
  },
]

// Structure de dossiers recommandée
const folderStructure = [
  {
    name: "app",
    type: "folder",
    children: [
      { name: "page.tsx", type: "file" },
      { name: "layout.tsx", type: "file" },
      { name: "loading.tsx", type: "file" },
      { name: "not-found.tsx", type: "file" },
      {
        name: "dashboard",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "reservations",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "menu",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "commandes",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "inventaire",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "personnel",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "restaurateur",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
          {
            name: "sofia",
            type: "folder",
            children: [
              { name: "page.tsx", type: "file" },
              { name: "loading.tsx", type: "file" },
            ],
          },
        ],
      },
      {
        name: "staff",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "client",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "fournisseur",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "logistique",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "developpement",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "loading.tsx", type: "file" },
        ],
      },
      {
        name: "sofia",
        type: "folder",
        children: [{ name: "page.tsx", type: "file" }],
      },
    ],
  },
  {
    name: "components",
    type: "folder",
    children: [
      { name: "main-nav.tsx", type: "file" },
      { name: "sofia-ai-chat.tsx", type: "file" },
      { name: "feature-card.tsx", type: "file" },
      { name: "app-features-layout.tsx", type: "file" },
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "progress.tsx", type: "file" },
          { name: "button.tsx", type: "file" },
          { name: "card.tsx", type: "file" },
          // Autres composants UI
        ],
      },
    ],
  },
]

// Fonction récursive pour afficher la structure de dossiers
const FolderTree = ({ item, depth = 0 }: { item: any; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(depth < 1)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="ml-4">
      <div className="flex items-center">
        {item.type === "folder" ? (
          <button onClick={toggleOpen} className="flex items-center text-sm hover:text-primary focus:outline-none">
            <FolderOpen className="h-4 w-4 mr-1" />
            {item.name}
          </button>
        ) : (
          <div className="flex items-center text-sm text-gray-600">
            <FileCode className="h-4 w-4 mr-1" />
            {item.name}
          </div>
        )}
      </div>
      {isOpen && item.children && (
        <div className="border-l border-gray-200 pl-2 mt-1">
          {item.children.map((child: any, index: number) => (
            <FolderTree key={index} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function FixRoutesPage() {
  const [fixedIssues, setFixedIssues] = useState<string[]>([])

  const markIssueAsFixed = (issueId: string) => {
    setFixedIssues((prev) => [...prev, issueId])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Correction des routes</h1>
          <div className="flex gap-2">
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

        <Tabs defaultValue="issues" className="space-y-4">
          <TabsList>
            <TabsTrigger value="issues">Problèmes courants</TabsTrigger>
            <TabsTrigger value="structure">Structure recommandée</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="space-y-4">
            <Alert>
              <AlertDescription>
                Cette page vous aide à identifier et corriger les problèmes courants avec les routes de votre
                application. Marquez les problèmes comme résolus une fois que vous les avez corrigés.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4">
              {commonIssues.map((issue) => (
                <Card key={issue.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{issue.title}</span>
                      {fixedIssues.includes(issue.id) ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Résolu
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">À résoudre</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{issue.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Solution:</h3>
                        <pre className="whitespace-pre-wrap text-xs p-3 bg-gray-100 rounded">{issue.solution}</pre>
                      </div>

                      {issue.affectedRoutes && (
                        <div>
                          <h3 className="font-semibold mb-2">Routes affectées:</h3>
                          <ul className="list-disc pl-5">
                            {issue.affectedRoutes.map((route) => (
                              <li key={route}>{route}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {issue.affectedComponents && (
                        <div>
                          <h3 className="font-semibold mb-2">Composants affectés:</h3>
                          <ul className="list-disc pl-5">
                            {issue.affectedComponents.map((component) => (
                              <li key={component}>{component}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Button onClick={() => markIssueAsFixed(issue.id)} disabled={fixedIssues.includes(issue.id)}>
                        {fixedIssues.includes(issue.id) ? "Problème résolu" : "Marquer comme résolu"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="structure" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Structure de dossiers recommandée</CardTitle>
                <CardDescription>
                  Voici la structure de dossiers recommandée pour votre application Next.js. Assurez-vous que tous les
                  fichiers nécessaires existent.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md">
                  {folderStructure.map((item, index) => (
                    <FolderTree key={index} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Templates pour les fichiers manquants</CardTitle>
                <CardDescription>
                  Utilisez ces templates pour créer rapidement les fichiers manquants dans votre application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Template pour page.tsx</h3>
                    <pre className="whitespace-pre-wrap text-xs p-3 bg-gray-100 rounded">
                      {`"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from 'lucide-react'
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"

export default function PageName() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Titre de la page</h2>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Retour au tableau de bord
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Contenu de la page</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Contenu de la page ici...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Template pour loading.tsx</h3>
                    <pre className="whitespace-pre-wrap text-xs p-3 bg-gray-100 rounded">
                      {`export default function Loading() {
  return null
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Template pour not-found.tsx</h3>
                    <pre className="whitespace-pre-wrap text-xs p-3 bg-gray-100 rounded">
                      {`import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">Page non trouvée</h2>
      <p className="mt-2 text-gray-600 max-w-md">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  )
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
