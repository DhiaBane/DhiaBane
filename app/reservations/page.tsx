"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import TeamSwitcher from "@/components/team-switcher"
import { Search } from "@/components/search"

export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [reservations] = useState([
    { id: 1, name: "Dupont", guests: 4, time: "19:00", table: "12", status: "confirmée" },
    { id: 2, name: "Martin", guests: 2, time: "20:30", table: "5", status: "confirmée" },
    { id: 3, name: "Bernard", guests: 6, time: "19:30", table: "8", status: "en attente" },
    { id: 4, name: "Thomas", guests: 3, time: "21:00", table: "3", status: "confirmée" },
  ])

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
          <h2 className="text-3xl font-bold tracking-tight">Réservations</h2>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Retour au tableau de bord
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Réservations du jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
                  <div>Client</div>
                  <div>Personnes</div>
                  <div>Heure</div>
                  <div>Table</div>
                  <div>Statut</div>
                  <div className="text-right">Actions</div>
                </div>
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="grid grid-cols-6 border-t p-3 text-sm">
                    <div className="font-medium">{reservation.name}</div>
                    <div>{reservation.guests}</div>
                    <div>{reservation.time}</div>
                    <div>{reservation.table}</div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          reservation.status === "confirmée"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        Annuler
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
