import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { mockStaff } from "@/lib/mock-data"
import { CalendarIcon, Download, FileText, Printer, Search, Upload } from "lucide-react"

// Types pour la gestion de la paie
interface PayrollPeriod {
  id: string
  month: string
  year: number
  status: "draft" | "processing" | "completed" | "paid"
  totalGross: number
  totalNet: number
  totalTaxes: number
  employeeCount: number
}

interface PaySlip {
  id: string
  employeeId: string
  employeeName: string
  period: string
  grossSalary: number
  netSalary: number
  taxes: number
  hoursWorked: number
  overtimeHours: number
  bonuses: number
  deductions: number
}

interface WorkHours {
  id: string
  employeeId: string
  employeeName: string
  date: string
  hoursWorked: number
  overtimeHours: number
  approved: boolean
}

// Données fictives pour la paie
const payrollPeriods: PayrollPeriod[] = [
  {
    id: "payroll1",
    month: "Avril",
    year: 2025,
    status: "draft",
    totalGross: 12500,
    totalNet: 9750,
    totalTaxes: 2750,
    employeeCount: 5,
  },
  {
    id: "payroll2",
    month: "Mars",
    year: 2025,
    status: "paid",
    totalGross: 12500,
    totalNet: 9750,
    totalTaxes: 2750,
    employeeCount: 5,
  },
  {
    id: "payroll3",
    month: "Février",
    year: 2025,
    status: "paid",
    totalGross: 12500,
    totalNet: 9750,
    totalTaxes: 2750,
    employeeCount: 5,
  },
]

// Génération de fiches de paie fictives basées sur les données du personnel
const paySlips: PaySlip[] = mockStaff.map((staff) => {
  const hoursWorked = staff.schedule.length * 8
  const grossSalary = staff.hourlyRate * hoursWorked
  const taxes = grossSalary * 0.22
  const netSalary = grossSalary - taxes

  return {
    id: `payslip-${staff.id}-apr2025`,
    employeeId: staff.id,
    employeeName: staff.name,
    period: "Avril 2025",
    grossSalary,
    netSalary,
    taxes,
    hoursWorked,
    overtimeHours: 0,
    bonuses: 0,
    deductions: 0,
  }
})

// Données fictives pour les heures travaillées
const workHours: WorkHours[] = mockStaff.flatMap((staff) => {
  return [
    {
      id: `hours-${staff.id}-0410`,
      employeeId: staff.id,
      employeeName: staff.name,
      date: "2025-04-10",
      hoursWorked: 8,
      overtimeHours: 0,
      approved: true,
    },
    {
      id: `hours-${staff.id}-0411`,
      employeeId: staff.id,
      employeeName: staff.name,
      date: "2025-04-11",
      hoursWorked: 8,
      overtimeHours: staff.id === "staff3" ? 2 : 0,
      approved: staff.id !== "staff5",
    },
  ]
})

export default function PayrollPage({ params }: { params: { restaurantId: string } }) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion de la Paie</h2>
        <div className="flex items-center gap-2">
          <DatePickerWithRange />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="payslips">Fiches de paie</TabsTrigger>
          <TabsTrigger value="hours">Heures travaillées</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
          <TabsTrigger value="declarations">Déclarations</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Brut (Avril)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 500 €</div>
                <p className="text-xs text-muted-foreground">+2.5% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Net (Avril)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9 750 €</div>
                <p className="text-xs text-muted-foreground">+2.5% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Charges Sociales (Avril)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 750 €</div>
                <p className="text-xs text-muted-foreground">+2.5% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heures Travaillées (Avril)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">840 h</div>
                <p className="text-xs text-muted-foreground">+10h par rapport au mois dernier</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Périodes de paie</CardTitle>
              <CardDescription>Gérez les périodes de paie et leur statut</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Période</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Total Brut</TableHead>
                    <TableHead className="text-right">Total Net</TableHead>
                    <TableHead className="text-right">Charges</TableHead>
                    <TableHead className="text-right">Employés</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollPeriods.map((period) => (
                    <TableRow key={period.id}>
                      <TableCell>
                        {period.month} {period.year}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            period.status === "draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : period.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : period.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {period.status === "draft"
                            ? "Brouillon"
                            : period.status === "processing"
                              ? "En traitement"
                              : period.status === "completed"
                                ? "Terminé"
                                : "Payé"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{period.totalGross.toLocaleString()} €</TableCell>
                      <TableCell className="text-right">{period.totalNet.toLocaleString()} €</TableCell>
                      <TableCell className="text-right">{period.totalTaxes.toLocaleString()} €</TableCell>
                      <TableCell className="text-right">{period.employeeCount}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Nouvelle période</Button>
              <Button>Calculer la paie</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Fiches de paie */}
        <TabsContent value="payslips" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Fiches de paie - Avril 2025</CardTitle>
                <CardDescription>Gérez et distribuez les fiches de paie</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Rechercher..." className="w-[200px] pl-8 md:w-[300px]" />
                </div>
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employé</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead className="text-right">Brut</TableHead>
                    <TableHead className="text-right">Net</TableHead>
                    <TableHead className="text-right">Charges</TableHead>
                    <TableHead className="text-right">Heures</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paySlips.map((slip) => (
                    <TableRow key={slip.id}>
                      <TableCell>{slip.employeeName}</TableCell>
                      <TableCell>{slip.period}</TableCell>
                      <TableCell className="text-right">{slip.grossSalary.toFixed(2)} €</TableCell>
                      <TableCell className="text-right">{slip.netSalary.toFixed(2)} €</TableCell>
                      <TableCell className="text-right">{slip.taxes.toFixed(2)} €</TableCell>
                      <TableCell className="text-right">
                        {slip.hoursWorked}h{slip.overtimeHours > 0 && ` (+${slip.overtimeHours}h suppl.)`}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Générer toutes les fiches</Button>
              <Button>Envoyer par email</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Heures travaillées */}
        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Heures travaillées - Avril 2025</CardTitle>
                <CardDescription>Suivez et validez les heures travaillées</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Rechercher..." className="w-[200px] pl-8 md:w-[300px]" />
                </div>
                <Button variant="outline" size="icon">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employé</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Heures</TableHead>
                    <TableHead className="text-right">Heures Suppl.</TableHead>
                    <TableHead className="text-right">Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workHours.map((hours) => (
                    <TableRow key={hours.id}>
                      <TableCell>{hours.employeeName}</TableCell>
                      <TableCell>{hours.date}</TableCell>
                      <TableCell className="text-right">{hours.hoursWorked}h</TableCell>
                      <TableCell className="text-right">{hours.overtimeHours}h</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            hours.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {hours.approved ? "Approuvé" : "En attente"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        {!hours.approved && (
                          <Button variant="ghost" size="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Importer des heures</Button>
              <Button>Approuver toutes les heures</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Rapports */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports de paie</CardTitle>
              <CardDescription>Générez et consultez les rapports financiers liés à la paie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Coûts salariaux par département</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <div className="flex justify-between py-1">
                        <span>Cuisine</span>
                        <span className="font-medium">5 250 €</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Service</span>
                        <span className="font-medium">3 750 €</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Bar</span>
                        <span className="font-medium">2 250 €</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Management</span>
                        <span className="font-medium">1 250 €</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      Voir le rapport détaillé
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Évolution des coûts salariaux</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <div className="flex justify-between py-1">
                        <span>Janvier 2025</span>
                        <span className="font-medium">11 800 €</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Février 2025</span>
                        <span className="font-medium">12 100 €</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Mars 2025</span>
                        <span className="font-medium">12 200 €</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Avril 2025</span>
                        <span className="font-medium">12 500 €</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      Voir le rapport détaillé
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Heures supplémentaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <div className="flex justify-between py-1">
                        <span>Janvier 2025</span>
                        <span className="font-medium">24h</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Février 2025</span>
                        <span className="font-medium">18h</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Mars 2025</span>
                        <span className="font-medium">22h</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Avril 2025</span>
                        <span className="font-medium">16h</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      Voir le rapport détaillé
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exporter tous les rapports</Button>
              <Button>Générer un nouveau rapport</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Déclarations */}
        <TabsContent value="declarations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Déclarations sociales</CardTitle>
              <CardDescription>Gérez vos déclarations sociales et fiscales</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Date limite</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead className="text-right">Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>URSSAF</TableCell>
                    <TableCell>Mars 2025</TableCell>
                    <TableCell>15/04/2025</TableCell>
                    <TableCell className="text-right">2 750 €</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Payé
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Retraite</TableCell>
                    <TableCell>Mars 2025</TableCell>
                    <TableCell>15/04/2025</TableCell>
                    <TableCell className="text-right">1 250 €</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Payé
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Prévoyance</TableCell>
                    <TableCell>Mars 2025</TableCell>
                    <TableCell>15/04/2025</TableCell>
                    <TableCell className="text-right">750 €</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Payé
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>URSSAF</TableCell>
                    <TableCell>Avril 2025</TableCell>
                    <TableCell>15/05/2025</TableCell>
                    <TableCell className="text-right">2 750 €</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        À payer
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Calendrier des échéances</Button>
              <Button>Préparer les déclarations</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
