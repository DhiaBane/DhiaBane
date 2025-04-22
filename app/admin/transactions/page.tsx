import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Download, Filter } from "lucide-react"

// Mock transaction data
const transactions = [
  {
    id: "1",
    reference: "TRX-001",
    amount: 125.5,
    status: "completed",
    date: "2025-04-15T10:30:00",
    customer: "Restaurant Le Gourmet",
    method: "card",
  },
  {
    id: "2",
    reference: "TRX-002",
    amount: 75.2,
    status: "completed",
    date: "2025-04-14T14:45:00",
    customer: "Bistro Parisien",
    method: "bank",
  },
  {
    id: "3",
    reference: "TRX-003",
    amount: 210.0,
    status: "pending",
    date: "2025-04-14T09:15:00",
    customer: "Café des Artistes",
    method: "card",
  },
  {
    id: "4",
    reference: "TRX-004",
    amount: 45.75,
    status: "failed",
    date: "2025-04-13T16:20:00",
    customer: "Brasserie du Coin",
    method: "card",
  },
  {
    id: "5",
    reference: "TRX-005",
    amount: 350.0,
    status: "completed",
    date: "2025-04-12T11:10:00",
    customer: "Restaurant La Mer",
    method: "bank",
  },
]

function TransactionsTableContent() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Référence</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Méthode</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.reference}</TableCell>
            <TableCell>{transaction.customer}</TableCell>
            <TableCell>
              {new Date(transaction.date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </TableCell>
            <TableCell>€{transaction.amount.toFixed(2)}</TableCell>
            <TableCell>
              <Badge variant="outline">{transaction.method === "card" ? "Carte" : "Virement"}</Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  transaction.status === "completed"
                    ? "success"
                    : transaction.status === "pending"
                      ? "warning"
                      : "destructive"
                }
              >
                {transaction.status === "completed"
                  ? "Complété"
                  : transaction.status === "pending"
                    ? "En attente"
                    : "Échoué"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                Détails
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function TransactionsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Suivez toutes les transactions financières de la plateforme.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des Transactions</CardTitle>
          <CardDescription>Liste des transactions récentes sur la plateforme.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TransactionsTableSkeleton />}>
            <TransactionsTableContent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

function TransactionsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[200px]" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
