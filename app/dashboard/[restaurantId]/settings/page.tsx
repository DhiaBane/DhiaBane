import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Clock, CreditCard, Globe, Mail, MapPin, Phone, Save, Shield } from "lucide-react"

export default function SettingsPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">Gérez les paramètres de votre restaurant</p>
        </div>
        <Button className="gap-1">
          <Save className="h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations du restaurant</CardTitle>
              <CardDescription>
                Ces informations seront affichées publiquement sur votre profil et votre menu en ligne.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Nom du restaurant</Label>
                  <Input id="restaurant-name" defaultValue="Le Gourmet Français" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-type">Type de cuisine</Label>
                  <Select defaultValue="french">
                    <SelectTrigger id="restaurant-type">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="french">Française</SelectItem>
                      <SelectItem value="italian">Italienne</SelectItem>
                      <SelectItem value="japanese">Japonaise</SelectItem>
                      <SelectItem value="mexican">Mexicaine</SelectItem>
                      <SelectItem value="indian">Indienne</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="restaurant-description">Description</Label>
                <Textarea
                  id="restaurant-description"
                  rows={4}
                  defaultValue="Restaurant traditionnel français proposant une cuisine raffinée à base de produits frais et locaux. Ambiance chaleureuse et service attentionné."
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-phone">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      Téléphone
                    </div>
                  </Label>
                  <Input id="restaurant-phone" defaultValue="01 23 45 67 89" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-email">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </Label>
                  <Input id="restaurant-email" type="email" defaultValue="contact@legourmet.fr" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="restaurant-address">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Adresse
                  </div>
                </Label>
                <Input id="restaurant-address" defaultValue="15 rue de la Gastronomie, 75001 Paris" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="restaurant-website">
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    Site web
                  </div>
                </Label>
                <Input id="restaurant-website" type="url" defaultValue="https://www.legourmetfrancais.fr" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horaires d&apos;ouverture</CardTitle>
              <CardDescription>
                Définissez les horaires d&apos;ouverture de votre restaurant pour chaque jour de la semaine.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day, index) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24 font-medium">{day}</div>
                  <div className="flex items-center gap-2">
                    <Switch id={`open-${index}`} defaultChecked={index < 6} />
                    <Label htmlFor={`open-${index}`} className="text-sm">
                      {index < 6 ? "Ouvert" : "Fermé"}
                    </Label>
                  </div>
                  {index < 6 && (
                    <div className="flex flex-1 items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Select defaultValue={index < 5 ? "12:00" : "19:00"}>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Heure" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => (
                              <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                                {`${i.toString().padStart(2, "0")}:00`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>-</span>
                        <Select defaultValue={index < 5 ? "14:30" : "23:00"}>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Heure" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => (
                              <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                                {`${i.toString().padStart(2, "0")}:00`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {index < 5 && (
                        <>
                          <Separator orientation="vertical" className="h-6" />
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <Select defaultValue="19:00">
                              <SelectTrigger className="w-24">
                                <SelectValue placeholder="Heure" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }).map((_, i) => (
                                  <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                                    {`${i.toString().padStart(2, "0")}:00`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span>-</span>
                            <Select defaultValue="23:00">
                              <SelectTrigger className="w-24">
                                <SelectValue placeholder="Heure" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }).map((_, i) => (
                                  <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                                    {`${i.toString().padStart(2, "0")}:00`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline">Appliquer à tous les jours</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profil du propriétaire</CardTitle>
              <CardDescription>Ces informations sont utilisées pour vous identifier et vous contacter.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="owner-firstname">Prénom</Label>
                  <Input id="owner-firstname" defaultValue="Jean" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-lastname">Nom</Label>
                  <Input id="owner-lastname" defaultValue="Dupont" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="owner-email">Email</Label>
                  <Input id="owner-email" type="email" defaultValue="jean.dupont@legourmet.fr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-phone">Téléphone</Label>
                  <Input id="owner-phone" defaultValue="06 12 34 56 78" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>Gérez votre mot de passe et les paramètres de sécurité de votre compte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Authentification à deux facteurs</span>
                </div>
                <Button variant="outline" size="sm">
                  Configurer
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Mettre à jour le mot de passe</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de facturation</CardTitle>
              <CardDescription>Ces informations sont utilisées pour la facturation et les reçus.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nom de l&apos;entreprise</Label>
                <Input id="company-name" defaultValue="Le Gourmet SARL" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Numéro SIRET</Label>
                  <Input id="tax-id" defaultValue="123 456 789 00012" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vat-number">Numéro de TVA</Label>
                  <Input id="vat-number" defaultValue="FR 12 345678900" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billing-address">Adresse de facturation</Label>
                <Input id="billing-address" defaultValue="15 rue de la Gastronomie, 75001 Paris" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Méthode de paiement</CardTitle>
              <CardDescription>Gérez vos méthodes de paiement pour votre abonnement RestauPilot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <p className="font-medium">Visa se terminant par 4242</p>
                      <p className="text-sm text-muted-foreground">Expire le 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border p-4">
                <div>
                  <p className="font-medium">Plan actuel: Premium</p>
                  <p className="text-sm text-muted-foreground">89,99 € / mois</p>
                </div>
                <Button variant="outline" size="sm">
                  Changer de plan
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Historique des factures</Button>
              <Button variant="destructive">Annuler l&apos;abonnement</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>Choisissez comment et quand vous souhaitez être notifié.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications par email</h3>
                {[
                  "Nouvelles réservations",
                  "Annulations de réservations",
                  "Nouvelles commandes en ligne",
                  "Rapports quotidiens",
                  "Rapports hebdomadaires",
                  "Mises à jour du système",
                  "Conseils et astuces",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <Label htmlFor={`email-${item}`} className="flex-1">
                      {item}
                    </Label>
                    <Switch id={`email-${item}`} defaultChecked={item !== "Conseils et astuces"} />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications par SMS</h3>
                {[
                  "Nouvelles réservations",
                  "Annulations de réservations",
                  "Nouvelles commandes en ligne",
                  "Alertes de stock",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <Label htmlFor={`sms-${item}`} className="flex-1">
                      {item}
                    </Label>
                    <Switch
                      id={`sms-${item}`}
                      defaultChecked={item === "Nouvelles réservations" || item === "Nouvelles commandes en ligne"}
                    />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications push</h3>
                {[
                  "Nouvelles réservations",
                  "Annulations de réservations",
                  "Nouvelles commandes en ligne",
                  "Alertes de stock",
                  "Avis clients",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <Label htmlFor={`push-${item}`} className="flex-1">
                      {item}
                    </Label>
                    <Switch
                      id={`push-${item}`}
                      defaultChecked={
                        item === "Nouvelles réservations" ||
                        item === "Nouvelles commandes en ligne" ||
                        item === "Avis clients"
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Désactiver toutes les notifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres avancés</CardTitle>
              <CardDescription>
                Ces paramètres sont destinés aux utilisateurs avancés et peuvent affecter le fonctionnement de votre
                compte.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Intégrations</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">API RestauPilot</p>
                      <p className="text-sm text-muted-foreground">Intégrez vos systèmes existants avec RestauPilot</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurer
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Système de caisse</p>
                      <p className="text-sm text-muted-foreground">Connectez votre système de caisse à RestauPilot</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Connecter
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Comptabilité</p>
                      <p className="text-sm text-muted-foreground">
                        Synchronisez vos données avec votre logiciel de comptabilité
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Connecter
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Exportation de données</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Exportez toutes vos données dans un format compatible avec d&apos;autres systèmes.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Exporter en CSV</Button>
                    <Button variant="outline">Exporter en JSON</Button>
                    <Button variant="outline">Exporter en Excel</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Langue et région</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue</Label>
                    <Select defaultValue="fr">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Sélectionnez une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="it">Italiano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select defaultValue="europe-paris">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                        <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                        <SelectItem value="america-new_york">America/New_York (GMT-5)</SelectItem>
                        <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Réinitialiser tous les paramètres</Button>
              <Button variant="destructive">Supprimer le compte</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
