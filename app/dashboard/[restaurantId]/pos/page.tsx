import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Check,
  CreditCard,
  Download,
  Link,
  Plus,
  RefreshCw,
  Settings,
  ShoppingCart,
  Smartphone,
  Zap,
} from "lucide-react"

export default function POSIntegrationPage({ params }: { params: { restaurantId: string } }) {
  const restaurantId = params.restaurantId

  // Données fictives pour les intégrations POS
  const posIntegrations = [
    {
      id: 1,
      name: "LightSpeed",
      status: "connected",
      lastSync: "2025-04-14T15:30:00",
      features: ["Commandes", "Inventaire", "Menu", "Paiements"],
    },
    {
      id: 2,
      name: "Square",
      status: "disconnected",
      lastSync: null,
      features: ["Commandes", "Paiements", "Clients"],
    },
    {
      id: 3,
      name: "Toast",
      status: "disconnected",
      lastSync: null,
      features: ["Commandes", "Menu", "Tables", "Paiements"],
    },
    {
      id: 4,
      name: "Clover",
      status: "disconnected",
      lastSync: null,
      features: ["Commandes", "Inventaire", "Paiements"],
    },
  ]

  // Données fictives pour l'historique de synchronisation
  const syncHistory = [
    { id: 1, date: "2025-04-14T15:30:00", status: "success", items: 243, duration: "1m 12s" },
    { id: 2, date: "2025-04-14T09:15:00", status: "success", items: 241, duration: "1m 05s" },
    { id: 3, date: "2025-04-13T18:45:00", status: "success", items: 238, duration: "1m 10s" },
    { id: 4, date: "2025-04-13T12:30:00", status: "error", items: 0, duration: "0m 15s" },
    { id: 5, date: "2025-04-12T19:20:00", status: "success", items: 235, duration: "1m 08s" },
  ]

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    if (!dateString) return "Jamais"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Intégration POS</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Synchroniser
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle intégration
          </Button>
        </div>
      </div>

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="sync">Synchronisation</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Systèmes POS disponibles</CardTitle>
              <CardDescription>
                Connectez votre système de point de vente pour synchroniser les commandes, l'inventaire et les paiements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière synchronisation</TableHead>
                    <TableHead>Fonctionnalités</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posIntegrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell className="font-medium">{integration.name}</TableCell>
                      <TableCell>
                        <Badge variant={integration.status === "connected" ? "default" : "outline"}>
                          {integration.status === "connected" ? "Connecté" : "Déconnecté"}
                        </Badge>
                      </TableCell>
                      <TableCell>{integration.lastSync ? formatDate(integration.lastSync) : "Jamais"}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.map((feature, index) => (
                            <Badge key={index} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant={integration.status === "connected" ? "outline" : "default"} size="sm">
                          {integration.status === "connected" ? (
                            <>
                              <Settings className="mr-2 h-4 w-4" />
                              Configurer
                            </>
                          ) : (
                            <>
                              <Link className="mr-2 h-4 w-4" />
                              Connecter
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5 text-blue-500" />
                  Commandes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Synchronisez les commandes entre RestauPilot et votre système POS
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Check className="mr-1 h-3 w-3" /> Actif
                </Badge>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-green-500" />
                  Paiements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Synchronisez les paiements et transactions financières</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  <Check className="mr-1 h-3 w-3" /> Actif
                </Badge>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Smartphone className="mr-2 h-5 w-5 text-purple-500" />
                  Application mobile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Connectez l'application mobile à votre système POS</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Badge variant="outline">Non configuré</Badge>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sync">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Synchronisation</CardTitle>
              <CardDescription>
                Configurez et surveillez la synchronisation entre RestauPilot et votre système POS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">Fréquence de synchronisation</Label>
                    <Select defaultValue="15">
                      <SelectTrigger id="sync-frequency">
                        <SelectValue placeholder="Sélectionnez une fréquence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Toutes les 5 minutes</SelectItem>
                        <SelectItem value="15">Toutes les 15 minutes</SelectItem>
                        <SelectItem value="30">Toutes les 30 minutes</SelectItem>
                        <SelectItem value="60">Toutes les heures</SelectItem>
                        <SelectItem value="manual">Synchronisation manuelle uniquement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sync-direction">Direction de synchronisation</Label>
                    <Select defaultValue="bidirectional">
                      <SelectTrigger id="sync-direction">
                        <SelectValue placeholder="Sélectionnez une direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pos-to-restaurpilot">POS vers RestauPilot uniquement</SelectItem>
                        <SelectItem value="restaurpilot-to-pos">RestauPilot vers POS uniquement</SelectItem>
                        <SelectItem value="bidirectional">Bidirectionnelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Éléments à synchroniser</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sync-orders" className="cursor-pointer">
                          Commandes
                        </Label>
                        <Switch id="sync-orders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sync-inventory" className="cursor-pointer">
                          Inventaire
                        </Label>
                        <Switch id="sync-inventory" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sync-menu" className="cursor-pointer">
                          Menu
                        </Label>
                        <Switch id="sync-menu" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sync-payments" className="cursor-pointer">
                          Paiements
                        </Label>
                        <Switch id="sync-payments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sync-customers" className="cursor-pointer">
                          Clients
                        </Label>
                        <Switch id="sync-customers" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Zap className="mr-2 h-4 w-4" />
                  Synchroniser maintenant
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historique de synchronisation</CardTitle>
              <CardDescription>Consultez l'historique des synchronisations récentes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Éléments synchronisés</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syncHistory.map((sync) => (
                    <TableRow key={sync.id}>
                      <TableCell>{formatDate(sync.date)}</TableCell>
                      <TableCell>
                        <Badge variant={sync.status === "success" ? "default" : "destructive"}>
                          {sync.status === "success" ? "Succès" : "Échec"}
                        </Badge>
                      </TableCell>
                      <TableCell>{sync.items}</TableCell>
                      <TableCell>{sync.duration}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Voir tout l'historique
              </Button>
              <Button variant="outline" size="sm">
                Exporter les logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'intégration POS</CardTitle>
              <CardDescription>
                Configurez les paramètres avancés pour l'intégration avec votre système POS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Paramètres généraux</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Clé API</Label>
                    <div className="flex">
                      <Input
                        id="api-key"
                        type="password"
                        value="••••••••••••••••"
                        readOnly
                        className="rounded-r-none"
                      />
                      <Button variant="secondary" className="rounded-l-none">
                        Copier
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">URL Webhook</Label>
                    <div className="flex">
                      <Input
                        id="webhook-url"
                        value="https://api.restaurpilot.com/webhooks/pos"
                        readOnly
                        className="rounded-r-none"
                      />
                      <Button variant="secondary" className="rounded-l-none">
                        Copier
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Comportement en cas d'erreur</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="retry-on-error">Réessayer en cas d'erreur</Label>
                      <p className="text-sm text-muted-foreground">
                        Tentatives automatiques de synchronisation en cas d'échec
                      </p>
                    </div>
                    <Switch id="retry-on-error" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-on-error">Notifier en cas d'erreur</Label>
                      <p className="text-sm text-muted-foreground">
                        Envoyer une notification en cas d'échec de synchronisation
                      </p>
                    </div>
                    <Switch id="notify-on-error" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gestion des conflits</h3>
                <div className="space-y-2">
                  <Label htmlFor="conflict-resolution">Résolution des conflits</Label>
                  <Select defaultValue="pos">
                    <SelectTrigger id="conflict-resolution">
                      <SelectValue placeholder="Sélectionnez une stratégie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pos">Priorité au système POS</SelectItem>
                      <SelectItem value="restaurpilot">Priorité à RestauPilot</SelectItem>
                      <SelectItem value="newest">Priorité à la modification la plus récente</SelectItem>
                      <SelectItem value="manual">Résolution manuelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Annuler</Button>
              <Button>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
