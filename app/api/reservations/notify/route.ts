import { NextResponse } from "next/server"
import { reservationApi } from "@/lib/api"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.reservationId || !body.notificationType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const reservation = await reservationApi.getById(body.reservationId)

    if (!reservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }

    // Simuler l'envoi de notifications
    switch (body.notificationType) {
      case "confirmation":
        console.log(`Email sent to ${reservation.customerEmail} confirming reservation`)
        if (reservation.customerPhone) {
          console.log(`SMS sent to ${reservation.customerPhone} confirming reservation`)
        }
        break
      case "reminder":
        console.log(`Email reminder sent to ${reservation.customerEmail} for upcoming reservation`)
        if (reservation.customerPhone) {
          console.log(`SMS reminder sent to ${reservation.customerPhone} for upcoming reservation`)
        }
        break
      case "cancellation":
        console.log(`Email sent to ${reservation.customerEmail} about reservation cancellation`)
        if (reservation.customerPhone) {
          console.log(`SMS sent to ${reservation.customerPhone} about reservation cancellation`)
        }
        break
      default:
        return NextResponse.json({ error: "Invalid notification type" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
