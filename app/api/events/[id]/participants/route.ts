import { type NextRequest, NextResponse } from "next/server"
import { eventsApi } from "@/lib/api/events-api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const eventId = params.id

  try {
    const participants = await eventsApi.getParticipants(eventId)
    return NextResponse.json(participants)
  } catch (error) {
    console.error("Error fetching participants:", error)
    return NextResponse.json({ error: "Failed to fetch participants" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const eventId = params.id

  try {
    const data = await request.json()

    // Validation des données
    if (!data.name || !data.email || !data.phone || !data.numberOfGuests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const participant = await eventsApi.addParticipant(eventId, data)

    if (!participant) {
      return NextResponse.json({ error: "Event not found or capacity exceeded" }, { status: 400 })
    }

    return NextResponse.json(participant, { status: 201 })
  } catch (error) {
    console.error("Error adding participant:", error)
    return NextResponse.json({ error: "Failed to add participant" }, { status: 500 })
  }
}
