"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AlertCircle, Search, Plus, Edit, Trash2, Gift, Star, Calendar, Phone, Mail, Filter } from "lucide-react"
import { customerApi } from "@/lib/api"
import type { Customer } from "@/lib/mock-data"
import { useForm } from "react-hook-form"

export default function CustomersPage() {
  const params = useParams<{ restaurantId: string }>()
  const restaurantId = params.restaurantId

  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isRewardDialogOpen, setIsRewardDialogOpen] = useState(false)
  const [rewardPoints, setRewardPoints] = useState(0)
  const [rewardReason, setRewardReason] = useState("")

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customerApi.getAll(restaurantId)
        setCustomers(data)
      } catch (error) {
        console.error("Erreur lors du chargement des clients:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [restaurantId])

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterValue === "all") return matchesSearch
    if (filterValue === "loyal" && customer.visits >= 5) return matchesSearch
    if (filterValue === "new" && customer.visits < 3) return matchesSearch
    if (filterValue === "inactive" && new Date(customer.lastVisit) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      return matchesSearch

    return false
  })

  const handleAddCustomer = async (data: Omit<Customer, "id">) => {
    try {
      const newCustomer = await customerApi.create(data)
      setCustomers([...customers, newCustomer])
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Erreur lors de l'ajout du client:", error)
    }
  }

  const handleEditCustomer = async (data: Partial<Customer>) => {
    if (!selectedCustomer) return

    try {
      const updatedCustomer = await customerApi.update(selectedCustomer.id, data)
      if (updatedCustomer) {
        setCustomers(customers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)))
      }
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Erreur lors de la modification du client:", error)
    }
  }

  const handleDeleteCustomer = async () => {
    if (!selectedCustomer) return

    try {
      await customerApi.delete(selectedCustomer.id)
      setCustomers(customers.filter((c) => c.id !== selectedCustomer.id))
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error("Erreur lors de la suppression du client:", error)
    }
  }

  const handleRewardPoints = async () => {
    if (!selectedCustomer) return

    try {
      const updatedCustomer = await customerApi.update(selectedCustomer.id, {
        loyaltyPoints: selectedCustomer.loyaltyPoints + rewardPoints,
      })

      if (updatedCustomer) {
        setCustomers(customers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)))
      }
      setIsRewardDialogOpen(false)
      setRewardPoints(0)
      setRewardReason("")
    } catch (error) {
      console.error("Erreur lors de l'attribution des points:", error)
    }
  }

  const getLoyaltyTier = (points: number) => {
    if (points >= 500) return { name: "Platine", color: "bg-slate-400" }
    if (points >= 200) return { name: "Or", color: "bg-yellow-400" }
    if (points >= 100) return { name: "Argent", color: "bg-gray-400" }
    return { name: "Bronze", color: "bg-amber-700" }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
          <CardDescription>Gérez vos clients et leur programme de fidélité</CardDescription>
          <div className="flex justify-between mt-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un client..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filtrer par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les clients</SelectItem>
                  <SelectItem value="loyal">Clients fidèles</SelectItem>
                  <SelectItem value="new">Nouveaux clients</SelectItem>
                  <SelectItem value="inactive">Clients inactifs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Chargement des clients...</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <AlertCircle className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucun client trouvé</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Fidélité</TableHead>
                  <TableHead>Visites</TableHead>
                  <TableHead>Dernière visite</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => {
                  const loyaltyTier = getLoyaltyTier(customer.loyaltyPoints)

                  return (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" /> {customer.email}
                          </span>
                          <span className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" /> {customer.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={loyaltyTier.color}>{loyaltyTier.name}</Badge>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {customer.loyaltyPoints} pts
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{customer.visits}</TableCell>
                      <TableCell>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(customer.lastVisit).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedCustomer(customer)
                              setIsRewardDialogOpen(true)
                            }}
                          >
                            <Gift className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedCustomer(customer)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedCustomer(customer)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialogue d'ajout de client */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau client</DialogTitle>
            <DialogDescription>
              Saisissez les informations du client pour l'ajouter à votre base de données.
            </DialogDescription>
          </DialogHeader>

          <CustomerForm
            onSubmit={handleAddCustomer}
            initialData={{
              name: "",
              email: "",
              phone: "",
              loyaltyPoints: 0,
              visits: 0,
              lastVisit: new Date().toISOString().split("T")[0],
              preferences: [],
              allergies: [],
              restaurantId,
            }}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialogue de modification de client */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier le client</DialogTitle>
            <DialogDescription>Modifiez les informations du client.</DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <CustomerForm
              onSubmit={handleEditCustomer}
              initialData={selectedCustomer}
              onCancel={() => setIsEditDialogOpen(false)}
              isEditing
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogue de suppression de client */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le client</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-4">
              <div className="border rounded p-4">
                <p>
                  <strong>Nom :</strong> {selectedCustomer.name}
                </p>
                <p>
                  <strong>Email :</strong> {selectedCustomer.email}
                </p>
                <p>
                  <strong>Points de fidélité :</strong> {selectedCustomer.loyaltyPoints}
                </p>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleDeleteCustomer}>
                  Supprimer
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogue d'attribution de points */}
      <Dialog open={isRewardDialogOpen} onOpenChange={setIsRewardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Attribuer des points de fidélité</DialogTitle>
            <DialogDescription>Ajoutez des points au compte fidélité du client.</DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-4">
              <div className="border rounded p-4">
                <p>
                  <strong>Client :</strong> {selectedCustomer.name}
                </p>
                <p>
                  <strong>Points actuels :</strong> {selectedCustomer.loyaltyPoints}
                </p>
                <p>
                  <strong>Niveau :</strong> {getLoyaltyTier(selectedCustomer.loyaltyPoints).name}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="points">Points à ajouter</Label>
                  <Input
                    id="points"
                    type="number"
                    min="0"
                    value={rewardPoints}
                    onChange={(e) => setRewardPoints(Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Raison (optionnel)</Label>
                  <Textarea
                    id="reason"
                    placeholder="Raison de l'attribution des points..."
                    value={rewardReason}
                    onChange={(e) => setRewardReason(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRewardDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleRewardPoints}>Attribuer les points</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Onglets d'analyse des clients */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="loyalty">Programme de fidélité</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total des clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers.length}</div>
                <p className="text-xs text-muted-foreground">
                  +
                  {
                    customers.filter((c) => new Date(c.lastVisit) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                      .length
                  }{" "}
                  actifs ce mois-ci
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Clients fidèles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers.filter((c) => c.visits >= 5).length}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((customers.filter((c) => c.visits >= 5).length / customers.length) * 100)}% du total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Points de fidélité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers.reduce((sum, c) => sum + c.loyaltyPoints, 0)}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(customers.reduce((sum, c) => sum + c.loyaltyPoints, 0) / customers.length)} points par
                  client en moyenne
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Programme de fidélité</CardTitle>
              <CardDescription>Gérez votre programme de fidélité et suivez les niveaux des clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Bronze</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{customers.filter((c) => c.loyaltyPoints < 100).length}</div>
                      <p className="text-xs text-muted-foreground">0-99 points</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Argent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {customers.filter((c) => c.loyaltyPoints >= 100 && c.loyaltyPoints < 200).length}
                      </div>
                      <p className="text-xs text-muted-foreground">100-199 points</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Or</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {customers.filter((c) => c.loyaltyPoints >= 200 && c.loyaltyPoints < 500).length}
                      </div>
                      <p className="text-xs text-muted-foreground">200-499 points</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Platine</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{customers.filter((c) => c.loyaltyPoints >= 500).length}</div>
                      <p className="text-xs text-muted-foreground">500+ points</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Avantages par niveau</h3>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Niveau</TableHead>
                          <TableHead>Points requis</TableHead>
                          <TableHead>Avantages</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Badge className="bg-amber-700">Bronze</Badge>
                          </TableCell>
                          <TableCell>0-99</TableCell>
                          <TableCell>
                            <ul className="list-disc list-inside text-sm">
                              <li>Accès au programme de fidélité</li>
                              <li>1 point par euro dépensé</li>
                            </ul>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Badge className="bg-gray-400">Argent</Badge>
                          </TableCell>
                          <TableCell>100-199</TableCell>
                          <TableCell>
                            <ul className="list-disc list-inside text-sm">
                              <li>Tous les avantages Bronze</li>
                              <li>5% de réduction sur l'addition</li>
                              <li>Dessert offert le jour de l'anniversaire</li>
                            </ul>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Badge className="bg-yellow-400">Or</Badge>
                          </TableCell>
                          <TableCell>200-499</TableCell>
                          <TableCell>
                            <ul className="list-disc list-inside text-sm">
                              <li>Tous les avantages Argent</li>
                              <li>10% de réduction sur l'addition</li>
                              <li>Priorité sur les réservations</li>
                              <li>1.2 points par euro dépensé</li>
                            </ul>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Badge className="bg-slate-400">Platine</Badge>
                          </TableCell>
                          <TableCell>500+</TableCell>
                          <TableCell>
                            <ul className="list-disc list-inside text-sm">
                              <li>Tous les avantages Or</li>
                              <li>15% de réduction sur l'addition</li>
                              <li>Accès aux événements exclusifs</li>
                              <li>1.5 points par euro dépensé</li>
                              <li>Bouteille de vin offerte tous les 1000 points</li>
                            </ul>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Segments de clientèle</CardTitle>
              <CardDescription>Analysez les différents segments de votre clientèle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Par fréquence de visite</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Nouveaux (1-2 visites)</span>
                      <span className="font-medium">{customers.filter((c) => c.visits <= 2).length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${(customers.filter((c) => c.visits <= 2).length / customers.length) * 100}%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span>Occasionnels (3-5 visites)</span>
                      <span className="font-medium">
                        {customers.filter((c) => c.visits > 2 && c.visits <= 5).length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{
                          width: `${(customers.filter((c) => c.visits > 2 && c.visits <= 5).length / customers.length) * 100}%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span>Réguliers (6-10 visites)</span>
                      <span className="font-medium">
                        {customers.filter((c) => c.visits > 5 && c.visits <= 10).length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-600 h-2.5 rounded-full"
                        style={{
                          width: `${(customers.filter((c) => c.visits > 5 && c.visits <= 10).length / customers.length) * 100}%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span>Fidèles (10+ visites)</span>
                      <span className="font-medium">{customers.filter((c) => c.visits > 10).length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-600 h-2.5 rounded-full"
                        style={{
                          width: `${(customers.filter((c) => c.visits > 10).length / customers.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Par activité récente</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Très actifs (dernière visite &lt; 30 jours)</span>
                      <span className="font-medium">
                        {
                          customers.filter((c) => {
                            const lastVisit = new Date(c.lastVisit)
                            const thirtyDaysAgo = new Date()
                            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                            return lastVisit >= thirtyDaysAgo
                          }).length
                        }
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${
                            (customers.filter((c) => {
                              const lastVisit = new Date(c.lastVisit)
                              const thirtyDaysAgo = new Date()
                              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                              return lastVisit >= thirtyDaysAgo
                            }).length /
                              customers.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span>Actifs (dernière visite 30-90 jours)</span>
                      <span className="font-medium">
                        {
                          customers.filter((c) => {
                            const lastVisit = new Date(c.lastVisit)
                            const thirtyDaysAgo = new Date()
                            const ninetyDaysAgo = new Date()
                            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                            ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
                            return lastVisit < thirtyDaysAgo && lastVisit >= ninetyDaysAgo
                          }).length
                        }
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{
                          width: `${
                            (customers.filter((c) => {
                              const lastVisit = new Date(c.lastVisit)
                              const thirtyDaysAgo = new Date()
                              const ninetyDaysAgo = new Date()
                              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                              ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
                              return lastVisit < thirtyDaysAgo && lastVisit >= ninetyDaysAgo
                            }).length /
                              customers.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span>En pause (dernière visite 90-180 jours)</span>
                      <span className="font-medium">
                        {
                          customers.filter((c) => {
                            const lastVisit = new Date(c.lastVisit)
                            const ninetyDaysAgo = new Date()
                            const oneEightyDaysAgo = new Date()
                            ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
                            oneEightyDaysAgo.setDate(oneEightyDaysAgo.getDate() - 180)
                            return lastVisit < ninetyDaysAgo && lastVisit >= oneEightyDaysAgo
                          }).length
                        }
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-600 h-2.5 rounded-full"
                        style={{
                          width: `${
                            (customers.filter((c) => {
                              const lastVisit = new Date(c.lastVisit)
                              const ninetyDaysAgo = new Date()
                              const oneEightyDaysAgo = new Date()
                              ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
                              oneEightyDaysAgo.setDate(oneEightyDaysAgo.getDate() - 180)
                              return lastVisit < ninetyDaysAgo && lastVisit >= oneEightyDaysAgo
                            }).length /
                              customers.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span>Inactifs (dernière visite {">"} 180 jours)</span>
                      <span className="font-medium">
                        {
                          customers.filter((c) => {
                            const lastVisit = new Date(c.lastVisit)
                            const oneEightyDaysAgo = new Date()
                            oneEightyDaysAgo.setDate(oneEightyDaysAgo.getDate() - 180)
                            return lastVisit < oneEightyDaysAgo
                          }).length
                        }
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-600 h-2.5 rounded-full"
                        style={{
                          width: `${
                            (customers.filter((c) => {
                              const lastVisit = new Date(c.lastVisit)
                              const oneEightyDaysAgo = new Date()
                              oneEightyDaysAgo.setDate(oneEightyDaysAgo.getDate() - 180)
                              return lastVisit < oneEightyDaysAgo
                            }).length /
                              customers.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences et allergies</CardTitle>
              <CardDescription>Analysez les préférences et allergies de vos clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Préférences courantes</h3>
                  <div className="space-y-4">
                    {["Table près de la fenêtre", "Table calme", "Menu végétarien", "Vin rouge", "Terrasse"].map(
                      (preference) => {
                        const count = customers.filter(
                          (c) => c.preferences && c.preferences.includes(preference),
                        ).length

                        return (
                          <div key={preference} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>{preference}</span>
                              <span className="font-medium">{count}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${(count / customers.length) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      },
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Allergies courantes</h3>
                  <div className="space-y-4">
                    {["Gluten", "Lactose", "Fruits de mer", "Arachides", "Œufs"].map((allergy) => {
                      const count = customers.filter((c) => c.allergies && c.allergies.includes(allergy)).length

                      return (
                        <div key={allergy} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>{allergy}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-red-600 h-2.5 rounded-full"
                              style={{ width: `${(count / customers.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
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

// Composant de formulaire pour l'ajout et la modification de clients
function CustomerForm({
  onSubmit,
  initialData,
  onCancel,
  isEditing = false,
}: {
  onSubmit: (data: any) => void
  initialData: any
  onCancel: () => void
  isEditing?: boolean
}) {
  const form = useForm({
    defaultValues: initialData,
  })

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du client" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@exemple.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="+33 6 12 34 56 78" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastVisit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dernière visite</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="loyaltyPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points de fidélité</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de visites</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Préférences</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Table près de la fenêtre", "Table calme", "Menu végétarien", "Vin rouge", "Terrasse"].map(
              (preference) => (
                <div key={preference} className="flex items-center space-x-2">
                  <Checkbox
                    id={`preference-${preference}`}
                    checked={initialData.preferences?.includes(preference)}
                    onCheckedChange={(checked) => {
                      const currentPreferences = form.getValues("preferences") || []
                      if (checked) {
                        form.setValue("preferences", [...currentPreferences, preference])
                      } else {
                        form.setValue(
                          "preferences",
                          currentPreferences.filter((p: string) => p !== preference),
                        )
                      }
                    }}
                  />
                  <label
                    htmlFor={`preference-${preference}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {preference}
                  </label>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Allergies</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Gluten", "Lactose", "Fruits de mer", "Arachides", "Œufs"].map((allergy) => (
              <div key={allergy} className="flex items-center space-x-2">
                <Checkbox
                  id={`allergy-${allergy}`}
                  checked={initialData.allergies?.includes(allergy)}
                  onCheckedChange={(checked) => {
                    const currentAllergies = form.getValues("allergies") || []
                    if (checked) {
                      form.setValue("allergies", [...currentAllergies, allergy])
                    } else {
                      form.setValue(
                        "allergies",
                        currentAllergies.filter((a: string) => a !== allergy),
                      )
                    }
                  }}
                />
                <label
                  htmlFor={`allergy-${allergy}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {allergy}
                </label>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">{isEditing ? "Mettre à jour" : "Ajouter"}</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
