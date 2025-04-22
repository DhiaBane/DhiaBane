"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Globe, Mail, Database, Cloud, CreditCard, Smartphone } from "lucide-react"

export default function SettingsPage() {
  const [platformName, setPlatformName] = useState("RestoPilote")
  const [language, setLanguage] = useState("fr")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Configurez les paramètres de la plateforme RestoPilote.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres Généraux</CardTitle>
              <CardDescription>Configurez les paramètres généraux de la plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Nom de la Plateforme</Label>
                <Input id="platform-name" value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Langue par Défaut</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">Anglais</SelectItem>
                    <SelectItem value="es">Espagnol</SelectItem>
                    <SelectItem value="de">Allemand</SelectItem>
                    <SelectItem value="it">Italien</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Fuseau Horaire</Label>
                <Select defaultValue="europe-paris">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Sélectionner un fuseau horaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-paris">Europe/Paris</SelectItem>
                    <SelectItem value="europe-london">Europe/London</SelectItem>
                    <SelectItem value="america-new_york">America/New_York</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                    <SelectItem value="australia-sydney">Australia/Sydney</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Devise par Défaut</Label>
                <Select defaultValue="eur">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Sélectionner une devise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="usd">Dollar US ($)</SelectItem>
                    <SelectItem value="gbp">Livre Sterling (£)</SelectItem>
                    <SelectItem value="jpy">Yen Japonais (¥)</SelectItem>
                    <SelectItem value="cad">Dollar Canadien (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personnalisation</CardTitle>
              <CardDescription>Personnalisez l'apparence de la plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-400">RP</span>
                  </div>
                  <Button variant="outline">Changer</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Thème</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Sélectionner un thème" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Clair</SelectItem>
                    <SelectItem value="dark">Sombre</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-css">CSS Personnalisé</Label>
                <Textarea id="custom-css" placeholder="Entrez votre CSS personnalisé ici..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Notification</CardTitle>
              <CardDescription>Configurez les notifications de la plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notifications par Email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Notifications Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications push sur l'application mobile
                  </p>
                </div>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-template">Modèle d'Email</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="email-template">
                    <SelectValue placeholder="Sélectionner un modèle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Par défaut</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="branded">Personnalisé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Fréquence des Notifications</Label>
                <Select defaultValue="realtime">
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Sélectionner une fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Temps réel</SelectItem>
                    <SelectItem value="hourly">Toutes les heures</SelectItem>
                    <SelectItem value="daily">Quotidien</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Services Connectés</CardTitle>
              <CardDescription>Gérez les services connectés à la plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Base de Données</p>
                      <p className="text-sm text-gray-500">Supabase</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-500">
                    Connecté
                  </Badge>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Configurer
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Service d'Email</p>
                      <p className="text-sm text-gray-500">SendGrid</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-500">
                    Connecté
                  </Badge>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Configurer
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Cloud className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Stockage</p>
                      <p className="text-sm text-gray-500">Vercel Blob</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-500">
                    Connecté
                  </Badge>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Configurer
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Notifications Push</p>
                      <p className="text-sm text-gray-500">Firebase</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-yellow-500">
                    Non Configuré
                  </Badge>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm">Connecter</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Globe className="mr-2 h-4 w-4" />
                Ajouter un Service
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations de Facturation</CardTitle>
              <CardDescription>Gérez vos informations de facturation et vos abonnements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Plan Actuel</p>
                    <p className="text-sm text-gray-500">Plan Entreprise</p>
                  </div>
                  <Badge>Actif</Badge>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Prochain renouvellement: 15 mai 2025</p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Changer de Plan
                  </Button>
                  <Button variant="outline" size="sm">
                    Annuler
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Méthode de Paiement</p>
                      <p className="text-sm text-gray-500">Visa se terminant par 4242</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Historique de Facturation</p>
                    <p className="text-sm text-gray-500">Consultez vos factures précédentes</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Facture #{2025040 + i}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(2025, 3 - i, 15).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">€499.00</span>
                          <Button variant="ghost" size="sm">
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
