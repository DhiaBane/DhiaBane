"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, UserPlus } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Employee {
  id: number
  name: string
  role: string
  email: string
  phone: string
  avatar: string
  status: "actif" | "congé" | "absent"
}

export default function PersonnelPage() {
  const employees: Employee[] = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "Chef de cuisine",
      email: "jean.dupont@example.com",
      phone: "06 12 34 56 78",
      avatar: "/avatars/01.png",
      status: "actif",
    },
    {
      id: 2,
      name: "Marie Lefevre",
      role: "Serveuse",
      email: "marie.lefevre@example.com",
      phone: "06 23 45 67 89",
      avatar: "/avatars/02.png",
      status: "actif",
    },
    {
      id: 3,
      name: "Pierre Blanc",
      role: "Barman",
      email: "pierre.blanc@example.com",
      phone: "06 34 56 78 90",
      avatar: "/avatars/03.png",
      status: "congé",
    },
    {
      id: 4,
      name: "Sophie Martin",
      role: "Hôtesse d'accueil",
      email: "sophie.martin@example.com",
      phone: "06 45 67 89 01",
      avatar: "/avatars/04.png",
      status: "actif",
    },
    {
      id: 5,
      name: "Lucas Robert",
      role: "Commis de cuisine",
      email: "lucas.robert@example.com",
      phone: "06 56 78 90 12",
      avatar: "/avatars/05.png",
      status: "absent",
    },
  ]

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
          <h2 className="text-3xl font-bold tracking-tight">Gestion du personnel</h2>
          <div className="flex gap-2">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un employé
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="default" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Retour au tableau de bord
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="équipe" className="space-y-4">
          <TabsList>
            <TabsTrigger value="équipe">Équipe</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="congés">Congés</TabsTrigger>
            <TabsTrigger value="formations">Formations</TabsTrigger>
          </TabsList>

          <TabsContent value="équipe" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Membres de l'équipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {employees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between space-x-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            employee.status === "actif"
                              ? "bg-green-100 text-green-800"
                              : employee.status === "congé"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {employee.status}
                        </span>
                        <Button variant="outline" size="sm">
                          Voir profil
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planning" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Planning hebdomadaire</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Le planning hebdomadaire sera disponible prochainement.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="congés" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des congés</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">La gestion des congés sera disponible prochainement.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Formations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Le module de formations sera disponible prochainement.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
