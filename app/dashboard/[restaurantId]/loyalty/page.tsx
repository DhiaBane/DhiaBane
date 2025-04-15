"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { Label } from "@/components/ui/label"

import { CardFooter } from "@/components/ui/card"

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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Search, Plus, Edit, Trash2, Gift, Star, Tag, Filter, Award, Percent, Clock } from "lucide-react"
import { customerApi } from "@/lib/api"
import type { Customer } from "@/lib/mock-data"
import { useForm } from "react-hook-form"

// Type pour les récompenses
type Reward = {
  id: string
  name: string
  description: string
  pointsCost: number
  type: "discount" | "free_item" | "experience" | "other"
  active: boolean
}

// Données mockées pour les récompenses
const mockRewards: Reward[] = [
  {
    id: "1",
    name: "Réduction de 10%",
    description: "Obtenez une réduction de 10% sur votre prochaine addition",
    pointsCost: 50,
    type: "discount",
    active: true,
  },
  {
    id: "2",
    name: "Dessert offert",
    description: "Un dessert au choix offert",
    pointsCost: 75,
    type: "free_item",
    active: true,
  },
  {
    id: "3",
    name: "Bouteille de vin",
    description: "Une bouteille de vin sélectionnée par notre sommelier",
    pointsCost: 150,
    type: "free_item",
    active: true,
  },
  {
    id: "4",
    name: "Dîner pour 2 à -50%",
    description: "50% de réduction sur un dîner pour 2 personnes",
    pointsCost: 200,
    type: "discount",
    active: true,
  },
  {
    id: "5",
    name: "Cours de cuisine",
    description: "Participez à un cours de cuisine avec notre chef",
    pointsCost: 500,
    type: "experience",
    active: true,
  },
  {
    id: "6",
    name: "Dîner privé",
    description: "Dîner privé pour 4 personnes avec menu dégustation",
    pointsCost: 1000,
    type: "experience",
    active: false,
  },
]

// Type pour les transactions de points
type PointTransaction = {
  id: string
  customerId: string
  customerName: string
  points: number
  type: "earn" | "redeem" | "adjust" | "expire"
  description: string
  date: string
}

// Données mockées pour les transactions de points
const mockPointTransactions: PointTransaction[] = [
  {
    id: "1",
    customerId: "1",
    customerName: "Sophie Bernard",
    points: 25,
    type: "earn",
    description: "Dîner - Addition de 125€",
    date: "2025-04-10T19:30:00Z",
  },
  {
    id: "2",
    customerId: "1",
    customerName: "Sophie Bernard",
    points: -75,
    type: "redeem",
    description: "Dessert offert",
    date: "2025-04-10T21:15:00Z",
  },
  {
    id: "3",
    customerId: "2",
    customerName: "Thomas Petit",
    points: 15,
    type: "earn",
    description: "Déjeuner - Addition de 75€",
    date: "2025-04-12T13:45:00Z",
  },
  {
    id: "4",
    customerId: "1",
    customerName: "Sophie Bernard",
    points: 30,
    type: "earn",
    description: "Dîner - Addition de 150€",
    date: "2025-04-14T20:00:00Z",
  },
  {
    id: "5",
    customerId: "3",
    customerName: "Julie Moreau",
    points: 40,
    type: "earn",
    description: "Dîner - Addition de 200€",
    date: "2025-04-14T19:00:00Z",
  },
  {
    id: "6",
    customerId: "3",
    customerName: "Julie Moreau",
    points: 20,
    type: "adjust",
    description: "Bonus pour anniversaire",
    date: "2025-04-14T19:30:00Z",
  },
]

export default function LoyaltyPage() {
  const params = useParams<{ restaurantId: string }>()
  const restaurantId = params.restaurantId

  const [customers, setCustomers] = useState<Customer[]>([])
  const [rewards, setRewards] = useState<Reward[]>(mockRewards)
  const [transactions, setTransactions] = useState<PointTransaction[]>(mockPointTransactions)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all")
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [isAddRewardDialogOpen, setIsAddRewardDialogOpen] = useState(false)
  const [isEditRewardDialogOpen, setIsEditRewardDialogOpen] = useState(false)
  const [isDeleteRewardDialogOpen, setIsDeleteRewardDialogOpen] = useState(false)
  const [isRedeemDialogOpen, setIsRedeemDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

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

  const filteredRewards = rewards.filter((reward) => {
    const matchesSearch =
      reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterValue === "all") return matchesSearch
    if (filterValue === "active" && reward.active) return matchesSearch
    if (filterValue === "inactive" && !reward.active) return matchesSearch
    if (filterValue === "discount" && reward.type === "discount") return matchesSearch
    if (filterValue === "free_item" && reward.type === "free_item") return matchesSearch
    if (filterValue === "experience" && reward.type === "experience") return matchesSearch

    return false
  })

  const handleAddReward = (data: Omit<Reward, "id">) => {
    const newReward = {
      ...data,
      id: `reward-${Date.now()}`,
    }
    setRewards([...rewards, newReward])
    setIsAddRewardDialogOpen(false)
  }

  const handleEditReward = (data: Partial<Reward>) => {
    if (!selectedReward) return

    const updatedReward = {
      ...selectedReward,
      ...data,
    }

    setRewards(rewards.map((r) => (r.id === selectedReward.id ? updatedReward : r)))
    setIsEditRewardDialogOpen(false)
  }

  const handleDeleteReward = () => {
    if (!selectedReward) return

    setRewards(rewards.filter((r) => r.id !== selectedReward.id))
    setIsDeleteRewardDialogOpen(false)
  }

  const handleRedeemReward = () => {
    if (!selectedReward || !selectedCustomer) return

    // Vérifier si le client a assez de points
    if (selectedCustomer.loyaltyPoints < selectedReward.pointsCost) {
      alert("Le client n'a pas assez de points pour cette récompense.")
      return
    }

    // Mettre à jour les points du client
    const updatedCustomer = {
      ...selectedCustomer,
      loyaltyPoints: selectedCustomer.loyaltyPoints - selectedReward.pointsCost,
    }

    setCustomers(customers.map((c) => (c.id === selectedCustomer.id ? updatedCustomer : c)))

    // Ajouter une transaction
    const newTransaction: PointTransaction = {
      id: `transaction-${Date.now()}`,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      points: -selectedReward.pointsCost,
      type: "redeem",
      description: `Échange pour: ${selectedReward.name}`,
      date: new Date().toISOString(),
    }

    setTransactions([newTransaction, ...transactions])
    setIsRedeemDialogOpen(false)
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Percent className="h-5 w-5 text-green-500" />
      case "free_item":
        return <Gift className="h-5 w-5 text-purple-500" />
      case "experience":
        return <Award className="h-5 w-5 text-blue-500" />
      default:
        return <Tag className="h-5 w-5 text-gray-500" />
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earn":
        return <Plus className="h-5 w-5 text-green-500" />
      case "redeem":
        return <Minus className="h-5 w-5 text-red-500" />
      case "adjust":
        return <Edit className="h-5 w-5 text-blue-500" />
      case "expire":
        return <Clock className="h-5 w-5 text-gray-500" />
      default:
        return <Tag className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Programme de Fidélité</h1>
      </div>

      <Tabs defaultValue="rewards" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rewards">Récompenses</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Récompenses disponibles</h2>
            </div>
            <Button onClick={() => setIsAddRewardDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter une récompense
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div className="space-y-1">
                  <CardTitle>Catalogue de récompenses</CardTitle>
                  <CardDescription>
                    Gérez les récompenses que vos clients peuvent obtenir avec leurs points de fidélité
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher une récompense..."
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
                        <SelectItem value="all">Toutes</SelectItem>
                        <SelectItem value="active">Actives</SelectItem>
                        <SelectItem value="inactive">Inactives</SelectItem>
                        <SelectItem value="discount">Réductions</SelectItem>
                        <SelectItem value="free_item">Produits offerts</SelectItem>
                        <SelectItem value="experience">Expériences</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p>Chargement des récompenses...</p>
                </div>
              ) : filteredRewards.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucune récompense trouvée</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRewards.map((reward) => (
                    <Card key={reward.id} className={!reward.active ? "opacity-60" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {getRewardIcon(reward.type)}
                            <CardTitle className="text-lg">{reward.name}</CardTitle>
                          </div>
                          {!reward.active && (
                            <Badge variant="outline" className="text-gray-500">
                              Inactive
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-bold">{reward.pointsCost} points</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setSelectedReward(reward)
                                setIsEditRewardDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setSelectedReward(reward)
                                setIsDeleteRewardDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          disabled={!reward.active}
                          onClick={() => {
                            setSelectedReward(reward)
                            setIsRedeemDialogOpen(true)
                          }}
                        >
                          Échanger
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div className="space-y-1">
                  <CardTitle>Historique des transactions</CardTitle>
                  <CardDescription>Suivez toutes les transactions de points de fidélité</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Rechercher un client..." className="pl-8" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filtrer par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes</SelectItem>
                        <SelectItem value="earn">Gains</SelectItem>
                        <SelectItem value="redeem">Échanges</SelectItem>
                        <SelectItem value="adjust">Ajustements</SelectItem>
                        <SelectItem value="expire">Expirations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}{" "}
                        {new Date(transaction.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </TableCell>
                      <TableCell>{transaction.customerName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {transaction.type === "earn" && <Badge className="bg-green-500">Gain</Badge>}
                          {transaction.type === "redeem" && <Badge className="bg-red-500">Échange</Badge>}
                          {transaction.type === "adjust" && <Badge className="bg-blue-500">Ajustement</Badge>}
                          {transaction.type === "expire" && <Badge className="bg-gray-500">Expiration</Badge>}
                        </div>
                      </TableCell>
                      <TableCell
                        className={transaction.points > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}
                      >
                        {transaction.points > 0 ? `+${transaction.points}` : transaction.points}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total des points attribués</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {transactions.filter((t) => t.points > 0).reduce((sum, t) => sum + t.points, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sur {transactions.filter((t) => t.points > 0).length} transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total des points échangés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.abs(transactions.filter((t) => t.points < 0).reduce((sum, t) => sum + t.points, 0))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sur {transactions.filter((t) => t.points < 0).length} transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Points disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers.reduce((sum, c) => sum + c.loyaltyPoints, 0)}</div>
                <p className="text-xs text-muted-foreground">Répartis sur {customers.length} clients</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Répartition des niveaux de fidélité</CardTitle>
              <CardDescription>Analyse des niveaux de fidélité de vos clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-700">Bronze</Badge>
                        <CardTitle className="text-sm font-medium">0-99 points</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{customers.filter((c) => c.loyaltyPoints < 100).length}</div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((customers.filter((c) => c.loyaltyPoints < 100).length / customers.length) * 100)}%
                        des clients
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gray-400">Argent</Badge>
                        <CardTitle className="text-sm font-medium">100-199 points</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {customers.filter((c) => c.loyaltyPoints >= 100 && c.loyaltyPoints < 200).length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(
                          (customers.filter((c) => c.loyaltyPoints >= 100 && c.loyaltyPoints < 200).length /
                            customers.length) *
                            100,
                        )}
                        % des clients
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-400">Or</Badge>
                        <CardTitle className="text-sm font-medium">200-499 points</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {customers.filter((c) => c.loyaltyPoints >= 200 && c.loyaltyPoints < 500).length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(
                          (customers.filter((c) => c.loyaltyPoints >= 200 && c.loyaltyPoints < 500).length /
                            customers.length) *
                            100,
                        )}
                        % des clients
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-slate-400">Platine</Badge>
                        <CardTitle className="text-sm font-medium">500+ points</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{customers.filter((c) => c.loyaltyPoints >= 500).length}</div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((customers.filter((c) => c.loyaltyPoints >= 500).length / customers.length) * 100)}%
                        des clients
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Récompenses les plus populaires</h3>

                  <div className="space-y-2">
                    {rewards
                      .filter((r) => r.active)
                      .sort((a, b) => {
                        const aCount = transactions.filter((t) => t.description.includes(a.name)).length
                        const bCount = transactions.filter((t) => t.description.includes(b.name)).length
                        return bCount - aCount
                      })
                      .slice(0, 5)
                      .map((reward, index) => {
                        const count = transactions.filter((t) => t.description.includes(reward.name)).length
                        const maxCount = Math.max(
                          ...rewards.map((r) => transactions.filter((t) => t.description.includes(r.name)).length),
                        )

                        return (
                          <div key={reward.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{index + 1}.</span>
                                {getRewardIcon(reward.type)}
                                <span>{reward.name}</span>
                              </div>
                              <span className="font-medium">{count} échanges</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${(count / maxCount) * 100}%` }}
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

      {/* Dialogue d'ajout de récompense */}
      <Dialog open={isAddRewardDialogOpen} onOpenChange={setIsAddRewardDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle récompense</DialogTitle>
            <DialogDescription>Créez une nouvelle récompense pour votre programme de fidélité.</DialogDescription>
          </DialogHeader>

          <RewardForm
            onSubmit={handleAddReward}
            initialData={{
              name: "",
              description: "",
              pointsCost: 50,
              type: "discount",
              active: true,
            }}
            onCancel={() => setIsAddRewardDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialogue de modification de récompense */}
      <Dialog open={isEditRewardDialogOpen} onOpenChange={setIsEditRewardDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier la récompense</DialogTitle>
            <DialogDescription>Modifiez les détails de cette récompense.</DialogDescription>
          </DialogHeader>

          {selectedReward && (
            <RewardForm
              onSubmit={handleEditReward}
              initialData={selectedReward}
              onCancel={() => setIsEditRewardDialogOpen(false)}
              isEditing
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogue de suppression de récompense */}
      <Dialog open={isDeleteRewardDialogOpen} onOpenChange={setIsDeleteRewardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer la récompense</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette récompense ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>

          {selectedReward && (
            <div className="space-y-4">
              <div className="border rounded p-4">
                <p>
                  <strong>Nom :</strong> {selectedReward.name}
                </p>
                <p>
                  <strong>Description :</strong> {selectedReward.description}
                </p>
                <p>
                  <strong>Coût en points :</strong> {selectedReward.pointsCost}
                </p>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteRewardDialogOpen(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleDeleteReward}>
                  Supprimer
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogue d'échange de récompense */}
      <Dialog open={isRedeemDialogOpen} onOpenChange={setIsRedeemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Échanger une récompense</DialogTitle>
            <DialogDescription>Sélectionnez un client pour échanger cette récompense.</DialogDescription>
          </DialogHeader>

          {selectedReward && (
            <div className="space-y-4">
              <div className="border rounded p-4">
                <p>
                  <strong>Récompense :</strong> {selectedReward.name}
                </p>
                <p>
                  <strong>Description :</strong> {selectedReward.description}
                </p>
                <p>
                  <strong>Coût en points :</strong> {selectedReward.pointsCost}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer">Sélectionner un client</Label>
                <Select
                  onValueChange={(value) => {
                    const customer = customers.find((c) => c.id === value)
                    if (customer) setSelectedCustomer(customer)
                  }}
                >
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers
                      .filter((c) => c.loyaltyPoints >= selectedReward.pointsCost)
                      .map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} ({customer.loyaltyPoints} points)
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                {customers.filter((c) => c.loyaltyPoints >= selectedReward.pointsCost).length === 0 && (
                  <p className="text-sm text-red-500">Aucun client n'a assez de points pour cette récompense.</p>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRedeemDialogOpen(false)}>
                  Annuler
                </Button>
                <Button
                  onClick={handleRedeemReward}
                  disabled={!selectedCustomer || selectedCustomer.loyaltyPoints < selectedReward.pointsCost}
                >
                  Échanger
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Composant de formulaire pour l'ajout et la modification de récompenses
function RewardForm({
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
    onSubmit({
      ...data,
      pointsCost: Number.parseInt(data.pointsCost.toString()),
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la récompense</FormLabel>
              <FormControl>
                <Input placeholder="Nom de la récompense" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description de la récompense" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pointsCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coût en points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de récompense</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="discount">Réduction</SelectItem>
                    <SelectItem value="free_item">Produit offert</SelectItem>
                    <SelectItem value="experience">Expérience</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Récompense active</FormLabel>
                <FormDescription>
                  Les récompenses inactives ne peuvent pas être échangées par les clients.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

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

// Composant manquant
function Minus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
