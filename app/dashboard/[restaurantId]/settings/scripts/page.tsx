import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Code, Play, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ScriptsPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params

  // Exemples de scripts prédéfinis
  const predefinedScripts = [
    {
      name: "Calcul de TVA",
      description: "Calcule automatiquement la TVA pour chaque article du menu",
      code: `function calculerTVA(prixHT, tauxTVA = 0.2) {\n  return prixHT * tauxTVA;\n}\n\n// Exemple d'utilisation\nconst prixHT = 10;\nconst montantTVA = calculerTVA(prixHT);\nconsole.log(\`TVA: \${montantTVA}€\`);`,
      language: "javascript",
    },
    {
      name: "Calcul de remise",
      description: "Applique une remise en fonction du montant total de la commande",
      code: `function appliquerRemise(montantTotal) {\n  let tauxRemise = 0;\n  \n  if (montantTotal >= 100) {\n    tauxRemise = 0.1; // 10% pour les commandes de 100€ ou plus\n  } else if (montantTotal >= 50) {\n    tauxRemise = 0.05; // 5% pour les commandes entre 50€ et 99.99€\n  }\n  \n  const montantRemise = montantTotal * tauxRemise;\n  return montantTotal - montantRemise;\n}\n\n// Exemple d'utilisation\nconst total = 120;\nconst totalApresRemise = appliquerRemise(total);\nconsole.log(\`Total après remise: \${totalApresRemise}€\`);`,
      language: "javascript",
    },
    {
      name: "Calcul du temps d'attente",
      description: "Estime le temps d'attente en fonction du nombre de clients et de plats",
      code: `function estimerTempsAttente(nombreClients, nombrePlats) {\n  // Temps de base: 10 minutes\n  let tempsBase = 10;\n  \n  // Ajouter 5 minutes par client supplémentaire\n  const tempsClients = (nombreClients - 1) * 5;\n  \n  // Ajouter 3 minutes par plat supplémentaire\n  const tempsPlats = (nombrePlats - 1) * 3;\n  \n  return tempsBase + tempsClients + tempsPlats;\n}\n\n// Exemple d'utilisation\nconst clients = 4;\nconst plats = 6;\nconst tempsAttente = estimerTempsAttente(clients, plats);\nconsole.log(\`Temps d'attente estimé: \${tempsAttente} minutes\`);`,
      language: "javascript",
    },
  ]

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scripts personnalisés</h1>
          <p className="text-muted-foreground">
            Créez et gérez des scripts personnalisés pour automatiser des tâches spécifiques
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Play className="h-4 w-4" />
            Tester
          </Button>
          <Button className="gap-1">
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <Alert variant="warning" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          Les scripts personnalisés s&apos;exécutent dans un environnement sécurisé, mais peuvent affecter le
          fonctionnement de votre restaurant. Testez toujours vos scripts avant de les déployer.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor">Éditeur</TabsTrigger>
          <TabsTrigger value="library">Bibliothèque</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Éditeur de script</CardTitle>
              <CardDescription>
                Écrivez ou modifiez votre script JavaScript pour automatiser des tâches spécifiques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="script-name">Nom du script</Label>
                  <Input id="script-name" placeholder="ex: Calcul de remise fidélité" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="script-trigger">Déclencheur</Label>
                  <Select defaultValue="manual">
                    <SelectTrigger id="script-trigger">
                      <SelectValue placeholder="Sélectionnez un déclencheur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manuel (exécution à la demande)</SelectItem>
                      <SelectItem value="order-created">Création d&apos;une commande</SelectItem>
                      <SelectItem value="order-paid">Paiement d&apos;une commande</SelectItem>
                      <SelectItem value="reservation-created">Création d&apos;une réservation</SelectItem>
                      <SelectItem value="daily">Quotidien (à minuit)</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire (dimanche à minuit)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="script-description">Description</Label>
                <Textarea id="script-description" placeholder="Décrivez brièvement ce que fait ce script..." rows={2} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="script-code">Code JavaScript</Label>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Code className="h-3 w-3" />
                    <span>JavaScript ES6+</span>
                  </div>
                </div>
                <div className="relative">
                  <Textarea
                    id="script-code"
                    className="font-mono h-80 resize-none bg-muted/50 p-4"
                    placeholder="// Écrivez votre code JavaScript ici
function calculerRemise(montantTotal, niveauFidelite) {
  let pourcentageRemise = 0;
  
  switch(niveauFidelite) {
    case 'bronze':
      pourcentageRemise = 0.05; // 5%
      break;
    case 'argent':
      pourcentageRemise = 0.1; // 10%
      break;
    case 'or':
      pourcentageRemise = 0.15; // 15%
      break;
    case 'platine':
      pourcentageRemise = 0.2; // 20%
      break;
  }
  
  return montantTotal * (1 - pourcentageRemise);
}"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <Switch id="script-active" defaultChecked />
                <Label htmlFor="script-active">Activer ce script</Label>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Réinitialiser</Button>
                <Button>Enregistrer</Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Console de test</CardTitle>
              <CardDescription>Testez votre script et visualisez les résultats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 font-mono p-4 rounded-md h-40 overflow-y-auto">
                <p>{">"} Script chargé et prêt à être exécuté</p>
                <p>{">"} Cliquez sur le bouton &quot;Tester&quot; pour exécuter le script</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="gap-1">
                <Play className="h-4 w-4" />
                Exécuter le test
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {predefinedScripts.map((script, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{script.name}</CardTitle>
                  <CardDescription>{script.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 font-mono text-xs p-3 rounded-md h-40 overflow-y-auto">{script.code}</div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Aperçu
                  </Button>
                  <Button size="sm">Utiliser ce modèle</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des scripts</CardTitle>
              <CardDescription>Configurez les options globales pour tous vos scripts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer les scripts</Label>
                  <p className="text-sm text-muted-foreground">Activez ou désactivez tous les scripts personnalisés</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Journalisation</Label>
                  <p className="text-sm text-muted-foreground">
                    Enregistrez les résultats d&apos;exécution des scripts dans les journaux
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications d&apos;erreur</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des notifications en cas d&apos;erreur dans l&apos;exécution d&apos;un script
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode sécurisé</Label>
                  <p className="text-sm text-muted-foreground">
                    Limite les fonctionnalités disponibles pour les scripts (recommandé)
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">Délai d&apos;expiration (secondes)</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="timeout">
                    <SelectValue placeholder="Sélectionnez un délai" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 secondes</SelectItem>
                    <SelectItem value="10">10 secondes</SelectItem>
                    <SelectItem value="30">30 secondes</SelectItem>
                    <SelectItem value="60">60 secondes</SelectItem>
                    <SelectItem value="120">120 secondes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Enregistrer les paramètres</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
