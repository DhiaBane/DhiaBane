import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

// Ajouter cette définition si elle n'existe pas dans lib/mock-data.ts
const mockCustomers = [
  {
    id: "cust-001",
    restaurantId: "rest-001",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    loyaltyPoints: 250,
    visits: 12,
    lastVisit: "2025-04-10",
    preferences: ["Terrasse", "Vins"],
    allergies: ["Fruits de mer"],
    notes: "Client fidèle, préfère être placé près de la fenêtre",
  },
  {
    id: "cust-002",
    restaurantId: "rest-001",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    phone: "06 23 45 67 89",
    loyaltyPoints: 150,
    visits: 8,
    lastVisit: "2025-04-05",
    preferences: ["Table calme", "Desserts"],
    allergies: ["Gluten"],
    notes: "Anniversaire le 15 juin",
  },
  {
    id: "cust-003",
    restaurantId: "rest-001",
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    phone: "06 34 56 78 90",
    loyaltyPoints: 75,
    visits: 4,
    lastVisit: "2025-03-20",
    preferences: ["Viandes", "Vins rouges"],
    allergies: [],
    notes: "",
  },
  {
    id: "cust-004",
    restaurantId: "rest-001",
    name: "Sophie Leroy",
    email: "sophie.leroy@example.com",
    phone: "06 45 67 89 01",
    loyaltyPoints: 320,
    visits: 15,
    lastVisit: "2025-04-12",
    preferences: ["Poissons", "Vins blancs"],
    allergies: ["Noix"],
    notes: "VIP - Critique gastronomique",
  },
  {
    id: "cust-005",
    restaurantId: "rest-001",
    name: "Lucas Moreau",
    email: "lucas.moreau@example.com",
    phone: "06 56 78 90 12",
    loyaltyPoints: 50,
    visits: 2,
    lastVisit: "2025-02-15",
    preferences: [],
    allergies: ["Lactose"],
    notes: "Nouveau client",
  },
]

export default function CRMPage({ params }: { params: { restaurantId: string } }) {
  const { restaurantId } = params

  // Filtrer les clients pour ce restaurant
  const customers = mockCustomers.filter((customer) => customer.restaurantId === restaurantId)

  // Données pour les graphiques
  const loyaltyDistribution = [
    { name: "0-100 points", value: customers.filter((c) => c.loyaltyPoints < 100).length },
    { name: "100-200 points", value: customers.filter((c) => c.loyaltyPoints >= 100 && c.loyaltyPoints < 200).length },
    { name: "200+ points", value: customers.filter((c) => c.loyaltyPoints >= 200).length },
  ]

  const visitsDistribution = [
    { name: "1-3 visites", value: customers.filter((c) => c.visits >= 1 && c.visits <= 3).length },
    { name: "4-8 visites", value: customers.filter((c) => c.visits >= 4 && c.visits <= 8).length },
    { name: "9+ visites", value: customers.filter((c) => c.visits >= 9).length },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <DashboardShell restaurantId={restaurantId}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion de la Relation Client (CRM)</h1>
        <Button>Ajouter un client</Button>
      </div>

      <Tabs defaultValue="clients" className="mt-6">
        <TabsList>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
          <TabsTrigger value="campagnes">Campagnes</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Rechercher
              </Label>
              <Input id="search" placeholder="Rechercher un client par nom, email ou téléphone..." className="w-full" />
            </div>
            <Button variant="outline">Rechercher</Button>
            <Button variant="outline">Filtrer</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des clients</CardTitle>
              <CardDescription>Gérez vos clients et consultez leurs informations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Points fidélité</TableHead>
                    <TableHead>Visites</TableHead>
                    <TableHead>Dernière visite</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.loyaltyPoints}</TableCell>
                      <TableCell>{customer.visits}</TableCell>
                      <TableCell>{new Date(customer.lastVisit).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segmentation" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Segmentation par fidélité</CardTitle>
                <CardDescription>Répartition des clients selon leurs points de fidélité</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    segment1: {
                      label: "0-100 points",
                      color: "hsl(var(--chart-1))",
                    },
                    segment2: {
                      label: "100-200 points",
                      color: "hsl(var(--chart-2))",
                    },
                    segment3: {
                      label: "200+ points",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={loyaltyDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {loyaltyDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segmentation par visites</CardTitle>
                <CardDescription>Répartition des clients selon leur nombre de visites</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    segment1: {
                      label: "1-3 visites",
                      color: "hsl(var(--chart-1))",
                    },
                    segment2: {
                      label: "4-8 visites",
                      color: "hsl(var(--chart-2))",
                    },
                    segment3: {
                      label: "9+ visites",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={visitsDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {visitsDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Segments clients</CardTitle>
                <CardDescription>Définition des segments clients pour le marketing ciblé</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Segment</TableHead>
                      <TableHead>Critères</TableHead>
                      <TableHead>Nombre</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">VIP</TableCell>
                      <TableCell>{"Points fidélité >= 200"}</TableCell>
                      <TableCell>{customers.filter((c) => c.loyaltyPoints >= 200).length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Réguliers</TableCell>
                      <TableCell>{"Visites >= 5 (6 mois)"}</TableCell>
                      <TableCell>{customers.filter((c) => c.visits >= 5).length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Occasionnels</TableCell>
                      <TableCell>{"2-4 visites (6 mois)"}</TableCell>
                      <TableCell>{customers.filter((c) => c.visits >= 2 && c.visits <= 4).length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nouveaux</TableCell>
                      <TableCell>{"1 visite (3 mois)"}</TableCell>
                      <TableCell>{customers.filter((c) => c.visits === 1).length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Inactifs</TableCell>
                      <TableCell>{"Pas de visite (3 mois)"}</TableCell>
                      <TableCell>
                        {
                          customers.filter((c) => {
                            const lastVisit = new Date(c.lastVisit)
                            const threeMonthsAgo = new Date()
                            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
                            return lastVisit < threeMonthsAgo
                          }).length
                        }
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campagnes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campagnes marketing</CardTitle>
              <CardDescription>Gérez vos campagnes marketing ciblées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button>Nouvelle campagne</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date de début</TableHead>
                    <TableHead>Date de fin</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Promotion de printemps</TableCell>
                    <TableCell>Tous</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>01/04/2025</TableCell>
                    <TableCell>30/04/2025</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Réactivation clients inactifs</TableCell>
                    <TableCell>Inactifs</TableCell>
                    <TableCell>SMS</TableCell>
                    <TableCell>Planifiée</TableCell>
                    <TableCell>01/05/2025</TableCell>
                    <TableCell>15/05/2025</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Offre VIP</TableCell>
                    <TableCell>VIP</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Brouillon</TableCell>
                    <TableCell>15/05/2025</TableCell>
                    <TableCell>30/05/2025</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
