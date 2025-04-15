import { NextResponse } from "next/server"
import { reservationApi } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const reservation = await reservationApi.getById(id)

    if (!reservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }

    return NextResponse.json(reservation)
  } catch (error) {
    console.error("Error fetching reservation:", error)
    return NextResponse.json({ error: "Failed to fetch reservation" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const body = await request.json()
    const updatedReservation = await reservationApi.update(id, body)

    if (!updatedReservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }

    // Si le statut a été mis à jour, simuler l'envoi d'un email de notification
    if (body.status) {
      console.log(`Email sent to ${updatedReservation.customerEmail} for status update: ${body.status}`)
    }

    return NextResponse.json(updatedReservation)
  } catch (error) {
    console.error("Error updating reservation:", error)
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const success = await reservationApi.delete(id)

    if (!success) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting reservation:", error)
    return NextResponse.json({ error: "Failed to delete reservation" }, { status: 500 })
  }
}
