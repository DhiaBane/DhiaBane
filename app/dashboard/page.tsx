import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCardIcon, GiftIcon, HistoryIcon, UserIcon, UtensilsIcon, PlusIcon, ArrowRightIcon } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Additions partagées"
          description="2 en attente"
          icon={<HistoryIcon className="h-5 w-5" />}
          href="/shared-bills"
        />
        <DashboardCard
          title="Cartes cadeaux"
          description="3 actives"
          icon={<GiftIcon className="h-5 w-5" />}
          href="/gift-cards"
        />
        <DashboardCard
          title="Profil"
          description="Gérer vos informations"
          icon={<UserIcon className="h-5 w-5" />}
          href="/profile"
        />
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <HistoryIcon className="h-4 w-4" />
            Activité récente
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <UtensilsIcon className="h-4 w-4" />À venir
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Vos dernières actions sur RestoPilote</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  title="Addition partagée"
                  description="La Trattoria - 47,65€"
                  date="Il y a 2 jours"
                  icon={<HistoryIcon className="h-5 w-5" />}
                />
                <ActivityItem
                  title="Carte cadeau reçue"
                  description="Merci pour ton aide ! - 100€"
                  date="Il y a 14 jours"
                  icon={<GiftIcon className="h-5 w-5" />}
                />
                <ActivityItem
                  title="Paiement effectué"
                  description="Le Petit Café - 17,60€"
                  date="Il y a 14 jours"
                  icon={<CreditCardIcon className="h-5 w-5" />}
                />
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <Link href="/shared-bills" className="flex items-center gap-2">
                    Voir tout l'historique
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Événements à venir</CardTitle>
              <CardDescription>Vos prochains rendez-vous</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Vous n'avez pas d'événements à venir</p>
                <Button variant="outline" className="flex items-center gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Ajouter un événement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DashboardCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            <div className="text-primary">{icon}</div>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" asChild className="w-full justify-between">
            <Link href={href}>
              <span>Accéder</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityItem({
  title,
  description,
  date,
  icon,
}: {
  title: string
  description: string
  date: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="bg-primary/10 p-2 rounded-full">
        <div className="text-primary">{icon}</div>
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-xs text-muted-foreground">{date}</div>
    </div>
  )
}
