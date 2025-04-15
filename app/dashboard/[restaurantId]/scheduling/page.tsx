import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { mockStaff } from "@/lib/mock-data"
import { CalendarIcon, Download, FileText, Printer } from "lucide-react"

// Types pour la planification
interface Shift {
  id: string
  employeeId: string
  employeeName: string
  role: string
  date: string
  startTime: string
  endTime: string
  status: "scheduled" | "confirmed" | "in-progress" | "completed" | "absent"
}

interface ShiftTemplate {
  id: string
  name: string
  description: string
  shifts: {
    role: string
    dayOfWeek: number
    startTime: string
    endTime: string
    requiredStaff: number
  }[]
}

// Données fictives pour les plannings
const shifts: Shift[] = [
  {
    id: "shift1",
    employeeId: "staff1",
    employeeName: "Alexandre Martin",
    role: "manager",
    date: "2025-04-14",
    startTime: "09:00",
    endTime: "18:00",
    status: "scheduled",
  },
  {
    id: "shift2",
    employeeId: "staff2",
    employeeName: "Sophie Dubois",
    role: "chef",
    date: "2025-04-14",
    startTime: "14:00",
    endTime: "23:00",
    status: "scheduled",
  },
  {
    id: "shift3",
    employeeId: "staff3",
    employeeName: "Thomas Leroy",
    role: "server",
    date: "2025-04-14",
    startTime: "18:00",
    endTime: "23:00",
    status: "scheduled",
  },
  {
    id: "shift4",
    employeeId: "staff4",
    employeeName: "Julie Moreau",
    role: "bartender",
    date: "2025-04-14",
    startTime: "17:00",
    endTime: "01:00",
    status: "scheduled",
  },
  {
    id: "shift5",
    employeeId: "staff5",
    employeeName: "Nicolas Bernard",
    role: "kitchen_staff",
    date: "2025-04-14",
    startTime: "10:00",
    endTime: "18:00",
    status: "scheduled",
  },
]

// Modèles de planning
const shiftTemplates: ShiftTemplate[] = [
  {
    id: "template1",
    name: "Semaine standard",
    description: "Planning standard pour une semaine normale",
    shifts: [
      { role: "manager", dayOfWeek: 1, startTime: "09:00", endTime: "18:00", requiredStaff: 1 },
      { role: "manager", dayOfWeek: 2, startTime: "09:00", endTime: "18:00", requiredStaff: 1 },
      { role: "manager", dayOfWeek: 3, startTime: "09:00", endTime: "18:00", requiredStaff: 1 },
      { role: "manager", dayOfWeek: 4, startTime: "09:00", endTime: "18:00", requiredStaff: 1 },
      { role: "manager", dayOfWeek: 5, startTime: "09:00", endTime: "18:00", requiredStaff: 1 },
      { role: "chef", dayOfWeek: 2, startTime: "14:00", endTime: "23:00", requiredStaff: 1 },
      { role: "chef", dayOfWeek: 3, startTime: "14:00", endTime: "23:00", requiredStaff: 1 },
      { role: "chef", dayOfWeek: 4, startTime: "14:00", endTime: "23:00", requiredStaff: 1 },
      { role: "chef", dayOfWeek: 5, startTime: "14:00", endTime: "23:00", requiredStaff: 1 },
      { role: "chef", dayOfWeek: 6, startTime: "14:00", endTime: "23:00", requiredStaff: 1 },
      { role: "server", dayOfWeek: 3, startTime: "18:00", endTime: "23:00", requiredStaff: 2 },
      { role: "server", dayOfWeek: 4, startTime: "18:00", endTime: "23:00", requiredStaff: 2 },
      { role: "server", dayOfWeek: 5, startTime: "18:00", endTime: "23:00", requiredStaff: 3 },
      { role: "server", dayOfWeek: 6, startTime: "18:00", endTime: "23:00", requiredStaff: 3 },
      { role: "server", dayOfWeek: 0, startTime: "18:00", endTime: "23:00", requiredStaff: 2 },
      { role: "bartender", dayOfWeek: 3, startTime: "17:00", endTime: "01:00", requiredStaff: 1 },
      { role: "bartender", dayOfWeek: 4, startTime: "17:00", endTime: "01:00", requiredStaff: 1 },
      { role: "bartender", dayOfWeek: 5, startTime: "17:00", endTime: "01:00", requiredStaff: 2 },
      { role: "bartender", dayOfWeek: 6, startTime: "17:00", endTime: "01:00", requiredStaff: 2 },
      { role: "kitchen_staff", dayOfWeek: 1, startTime: "10:00", endTime: "18:00", requiredStaff: 1 },
      { role: "kitchen_staff", dayOfWeek: 2, startTime: "10:00", endTime: "18:00", requiredStaff: 1 },
      { role: "kitchen_staff", dayOfWeek: 3, startTime: "10:00", endTime: "18:00", requiredStaff: 1 },
      { role: "kitchen_staff", dayOfWeek: 4, startTime: "10:00", endTime: "18:00", requiredStaff: 1 },
      { role: "kitchen_staff", dayOfWeek: 5, startTime: "10:00", endTime: "18:00", requiredStaff: 2 },
    ],
  },
  {
    id: "template2",
    name: "Semaine chargée",
    description: "Planning pour les périodes de forte affluence",
    shifts: [
      { role: "manager", dayOfWeek: 1, startTime: "09:00", endTime: "18:00", requiredStaff: 1 },
      { role: "manager", dayOfWeek: 2, startTime: "09:00", endTime: "18:00", requiredStaff: 1 },
      { role: "manager", dayOfWeek: 3, startTime: "09:00", endTime: "18:00", requiredStaff: 1 },
      { role: "manager", dayOfWeek: 4, startTime: "09:00", endTime: "18:00", requiredStaff: 1 },
      { role: "manager", dayOfWeek: 5, startTime: "09:00", endTime: "18:00", requiredStaff: 1 },
      { role: "chef", dayOfWeek: 1, startTime: "14:00", endTime: "23:00", requiredStaff: 1 },
      { role: "chef", dayOfWeek: 2, startTime: "14:00", endTime: "23:00", requiredStaff: 1 },
      { role: "chef", dayOfWeek: 3, startTime: "14:00", endTime: "23:00", requiredStaff: 1 },
      { role: "chef", dayOfWeek: 4, startTime: "14:00", endTime: "23:00", requiredStaff: 1 },
      { role: "chef", dayOfWeek: 5, startTime: "14:00", endTime: "23:00", requiredStaff: 2 },
      { role: "chef", dayOfWeek: 6, startTime: "14:00", endTime: "23:00", requiredStaff: 2 },
      { role: "chef", dayOfWeek: 0, startTime: "14:00", endTime: "23:00", requiredStaff: 1 },
      { role: "server", dayOfWeek: 1, startTime: "18:00", endTime: "23:00", requiredStaff: 2 },
      { role: "server", dayOfWeek: 2, startTime: "18:00", endTime: "23:00", requiredStaff: 2 },
      { role: "server", dayOfWeek: 3, startTime: "18:00", endTime: "23:00", requiredStaff: 3 },
      { role: "server", dayOfWeek: 4, startTime: "18:00", endTime: "23:00", requiredStaff: 3 },
      { role: "server", dayOfWeek: 5, startTime: "18:00", endTime: "23:00", requiredStaff: 4 },
      { role: "server", dayOfWeek: 6, startTime: "18:00", endTime: "23:00", requiredStaff: 4 },
      { role: "server", dayOfWeek: 0, startTime: "18:00", endTime: "23:00", requiredStaff: 3 },
      { role: "bartender", dayOfWeek: 3, startTime: "17:00", endTime: "01:00", requiredStaff: 1 },
      { role: "bartender", dayOfWeek: 4, startTime: "17:00", endTime: "01:00", requiredStaff: 2 },
      { role: "bartender", dayOfWeek: 5, startTime: "17:00", endTime: "01:00", requiredStaff: 2 },
      { role: "bartender", dayOfWeek: 6, startTime: "17:00", endTime: "01:00", requiredStaff: 2 },
      { role: "bartender", dayOfWeek: 0, startTime: "17:00", endTime: "01:00", requiredStaff: 1 },
      { role: "kitchen_staff", dayOfWeek: 1, startTime: "10:00", endTime: "18:00", requiredStaff: 1 },
      { role: "kitchen_staff", dayOfWeek: 2, startTime: "10:00", endTime: "18:00", requiredStaff: 1 },
      { role: "kitchen_staff", dayOfWeek: 3, startTime: "10:00", endTime: "18:00", requiredStaff: 2 },
      { role: "kitchen_staff", dayOfWeek: 4, startTime: "10:00", endTime: "18:00", requiredStaff: 2 },
      { role: "kitchen_staff", dayOfWeek: 5, startTime: "10:00", endTime: "18:00", requiredStaff: 2 },
      { role: "kitchen_staff", dayOfWeek: 6, startTime: "10:00", endTime: "18:00", requiredStaff: 2 },
      { role: "kitchen_staff", dayOfWeek: 0, startTime: "10:00", endTime: "18:00", requiredStaff: 1 },
    ],
  },
]

export default function SchedulingPage({ params }: { params: { restaurantId: string } }) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Planification du Personnel</h2>
        <div className="flex items-center gap-2">
          <DatePickerWithRange />
        </div>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="weekly">Planning hebdomadaire</TabsTrigger>
          <TabsTrigger value="daily">Planning journalier</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
          <TabsTrigger value="ai">Optimisation IA</TabsTrigger>
        </TabsList>

        {/* Planning hebdomadaire */}
        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Planning de la semaine du 14 avril 2025</CardTitle>
                <CardDescription>Vue hebdomadaire des plannings du personnel</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Semaine précédente
                </Button>
                <Button variant="outline" size="sm">
                  Semaine suivante
                </Button>
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 text-left">Employé</th>
                      <th className="border p-2 text-center">Lundi 14/04</th>
                      <th className="border p-2 text-center">Mardi 15/04</th>
                      <th className="border p-2 text-center">Mercredi 16/04</th>
                      <th className="border p-2 text-center">Jeudi 17/04</th>
                      <th className="border p-2 text-center">Vendredi 18/04</th>
                      <th className="border p-2 text-center">Samedi 19/04</th>
                      <th className="border p-2 text-center">Dimanche 20/04</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStaff.map((staff) => (
                      <tr key={staff.id}>
                        <td className="border p-2">
                          <div className="font-medium">{staff.name}</div>
                          <div className="text-xs text-gray-500">
                            {staff.role === "manager"
                              ? "Manager"
                              : staff.role === "chef"
                                ? "Chef"
                                : staff.role === "server"
                                  ? "Serveur"
                                  : staff.role === "bartender"
                                    ? "Barman"
                                    : "Cuisine"}
                          </div>
                        </td>
                        {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                          const hasShift = staff.schedule.some((s) => {
                            const dayMap: Record<string, number> = {
                              Lundi: 0,
                              Mardi: 1,
                              Mercredi: 2,
                              Jeudi: 3,
                              Vendredi: 4,
                              Samedi: 5,
                              Dimanche: 6,
                            }
                            return dayMap[s.day] === day
                          })

                          const shift = staff.schedule.find((s) => {
                            const dayMap: Record<string, number> = {
                              Lundi: 0,
                              Mardi: 1,
                              Mercredi: 2,
                              Jeudi: 3,
                              Vendredi: 4,
                              Samedi: 5,
                              Dimanche: 6,
                            }
                            return dayMap[s.day] === day
                          })

                          return (
                            <td
                              key={day}
                              className={`border p-2 text-center ${hasShift ? "bg-green-50" : "bg-gray-50"}`}
                            >
                              {hasShift && shift ? (
                                <div>
                                  <div className="font-medium">
                                    {shift.start} - {shift.end}
                                  </div>
                                  <div className="text-xs text-gray-500">8h</div>
                                </div>
                              ) : (
                                <div className="text-xs text-gray-400">-</div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Appliquer un modèle</Button>
              <div className="flex gap-2">
                <Button variant="outline">Réinitialiser</Button>
                <Button>Enregistrer les modifications</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Planning journalier */}
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Planning du Lundi 14 avril 2025</CardTitle>
                <CardDescription>Détail des shifts pour la journée</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Jour précédent
                </Button>
                <Button variant="outline" size="sm">
                  Jour suivant
                </Button>
                <Button variant="outline" size="icon">
                  <CalendarIcon className="h-4 w-4" />
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
                    <TableHead>Rôle</TableHead>
                    <TableHead>Début</TableHead>
                    <TableHead>Fin</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shifts.map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell>
                        <div className="font-medium">{shift.employeeName}</div>
                      </TableCell>
                      <TableCell>
                        <div className="capitalize">
                          {shift.role === "manager"
                            ? "Manager"
                            : shift.role === "chef"
                              ? "Chef"
                              : shift.role === "server"
                                ? "Serveur"
                                : shift.role === "bartender"
                                  ? "Barman"
                                  : "Cuisine"}
                        </div>
                      </TableCell>
                      <TableCell>{shift.startTime}</TableCell>
                      <TableCell>{shift.endTime}</TableCell>
                      <TableCell>
                        {(() => {
                          const start = new Date(`2025-04-14T${shift.startTime}:00`)
                          const end = new Date(`2025-04-14T${shift.endTime}:00`)
                          const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
                          return `${diff}h`
                        })()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            shift.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : shift.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : shift.status === "in-progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : shift.status === "completed"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-red-100 text-red-800"
                          }`}
                        >
                          {shift.status === "scheduled"
                            ? "Planifié"
                            : shift.status === "confirmed"
                              ? "Confirmé"
                              : shift.status === "in-progress"
                                ? "En cours"
                                : shift.status === "completed"
                                  ? "Terminé"
                                  : "Absent"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
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
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Ajouter un shift</Button>
              <Button>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Modèles de planning */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modèles de planning</CardTitle>
              <CardDescription>Gérez vos modèles de planning prédéfinis</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Nombre de shifts</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shiftTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>{template.description}</TableCell>
                      <TableCell>{template.shifts.length}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
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
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </Button>
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
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Créer un nouveau modèle</Button>
              <Button>Appliquer le modèle sélectionné</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Optimisation IA */}
        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimisation des plannings par IA</CardTitle>
              <CardDescription>
                Utilisez l'intelligence artificielle pour optimiser vos plannings en fonction de différents critères
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Critères d'optimisation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="cost" className="h-4 w-4 rounded border-gray-300" checked />
                        <label
                          htmlFor="cost"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Réduction des coûts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="workload" className="h-4 w-4 rounded border-gray-300" checked />
                        <label
                          htmlFor="workload"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Équilibrage de la charge de travail
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="preferences" className="h-4 w-4 rounded border-gray-300" checked />
                        <label
                          htmlFor="preferences"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Préférences des employés
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="skills" className="h-4 w-4 rounded border-gray-300" checked />
                        <label
                          htmlFor="skills"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Compétences requises
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="forecast" className="h-4 w-4 rounded border-gray-300" />
                        <label
                          htmlFor="forecast"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Prévisions d'affluence
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Période à optimiser</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="start-date" className="text-sm font-medium">
                            Date de début
                          </label>
                          <Input type="date" id="start-date" defaultValue="2025-04-14" />
                        </div>
                        <div>
                          <label htmlFor="end-date" className="text-sm font-medium">
                            Date de fin
                          </label>
                          <Input type="date" id="end-date" defaultValue="2025-04-20" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="optimization-level" className="text-sm font-medium">
                          Niveau d'optimisation
                        </label>
                        <select
                          id="optimization-level"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option>Standard</option>
                          <option>Avancé</option>
                          <option>Maximum</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Résultats de l'optimisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-gray-50 p-4">
                    <div className="text-center text-gray-500">
                      Cliquez sur "Optimiser le planning" pour générer des recommandations basées sur l'IA
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Réinitialiser</Button>
              <Button>Optimiser le planning</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
