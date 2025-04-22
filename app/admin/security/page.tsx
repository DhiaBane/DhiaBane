"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, UserPlus, Key, Lock, Eye, Search, RefreshCw, AlertTriangle } from "lucide-react"

// Mock roles data
const roles = [
  {
    id: "super_admin",
    name: "Super Admin",
    description: "Accès complet à toutes les fonctionnalités de la plateforme",
    permissions: ["all"],
  },
  {
    id: "admin",
    name: "Admin",
    description: "Accès à la plupart des fonctionnalités administratives",
    permissions: ["read:all", "write:most", "delete:some"],
  },
  {
    id: "manager",
    name: "Manager",
    description: "Gestion des restaurants et du personnel",
    permissions: ["read:most", "write:some", "delete:none"],
  },
  {
    id: "staff",
    name: "Personnel",
    description: "Accès limité aux fonctionnalités de service",
    permissions: ["read:some", "write:minimal", "delete:none"],
  },
  {
    id: "customer",
    name: "Client",
    description: "Accès uniquement aux fonctionnalités client",
    permissions: ["read:minimal", "write:none", "delete:none"],
  },
]

// Mock users data
const users = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "super_admin",
    lastLogin: "2025-04-15T10:30:00",
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    role: "admin",
    lastLogin: "2025-04-14T14:45:00",
  },
  {
    id: "3",
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    role: "manager",
    lastLogin: "2025-04-14T09:15:00",
  },
  {
    id: "4",
    name: "Sophie Lefebvre",
    email: "sophie.lefebvre@example.com",
    role: "staff",
    lastLogin: "2025-04-13T16:20:00",
  },
  {
    id: "5",
    name: "Thomas Bernard",
    email: "thomas.bernard@example.com",
    role: "customer",
    lastLogin: "2025-04-12T11:10:00",
  },
]

export default function SecurityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter((user) => {
    if (searchQuery) {
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return true
  })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sécurité</h1>
        <p className="text-muted-foreground">Gestion des rôles et des accès à la plateforme.</p>
      </div>

      <Tabs defaultValue="roles">
        <TabsList>
          <TabsTrigger value="roles">Rôles</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="audit">Journal d'audit</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Rôles</CardTitle>
              <CardDescription>Définissez les rôles et les permissions pour les utilisateurs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-start space-x-4 rounded-lg border p-4">
                    <div className="mt-0.5">
                      <Shield className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{role.name}</p>
                        <Badge variant="outline">{role.id}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{role.description}</p>
                      <div className="pt-2">
                        <p className="text-xs font-medium text-gray-500">Permissions:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {role.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-end pt-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un Rôle
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attribution des Rôles</CardTitle>
              <CardDescription>Gérez les rôles des utilisateurs sur la plateforme.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Rechercher des utilisateurs..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Dernière Connexion</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Select defaultValue={user.role}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Sélectionner un rôle" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {new Date(user.lastLogin).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Key className="mr-2 h-4 w-4" />
                          Réinitialiser
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Journal d'Audit</CardTitle>
              <CardDescription>Historique des actions de sécurité sur la plateforme.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Actualiser
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Exporter
                </Button>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start space-x-4 rounded-lg border p-4">
                    <div className="mt-0.5">
                      {i % 3 === 0 ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Lock className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {i % 3 === 0 ? "Tentative de connexion échouée" : "Modification des permissions"}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(Date.now() - i * 3600000).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {i % 3 === 0
                          ? "Tentative de connexion échouée pour l'utilisateur user" + i + "@example.com"
                          : "Modification des permissions pour le rôle 'manager'"}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gray-500">Par: {i % 2 === 0 ? "Jean Dupont" : "Système"}</span>
                        <Button variant="ghost" size="sm">
                          Détails
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
