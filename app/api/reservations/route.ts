import { NextResponse } from "next/server"
import { reservationApi } from "@/lib/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const restaurantId = searchParams.get("restaurantId")

  if (!restaurantId) {
    return NextResponse.json({ error: "Restaurant ID is required" }, { status: 400 })
  }

  try {
    const reservations = await reservationApi.getAll(restaurantId)
    return NextResponse.json(reservations)
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation de base
    if (!body.customerName || !body.date || !body.time || !body.partySize || !body.restaurantId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newReservation = await reservationApi.create(body)

    // Simuler l'envoi d'un email de confirmation
    console.log(`Email sent to ${body.customerEmail} for reservation confirmation`)

    return NextResponse.json(newReservation, { status: 201 })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}
