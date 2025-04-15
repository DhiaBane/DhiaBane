import { type NextRequest, NextResponse } from "next/server"
import { eventsApi } from "@/lib/api/events-api"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const participantId = params.id

  try {
    const data = await request.json()
    const participant = await eventsApi.updateParticipant(participantId, data)

    if (!participant) {
      return NextResponse.json({ error: "Participant not found" }, { status: 404 })
    }

    return NextResponse.json(participant)
  } catch (error) {
    console.error("Error updating participant:", error)
    return NextResponse.json({ error: "Failed to update participant" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const participantId = params.id

  try {
    const success = await eventsApi.deleteParticipant(participantId)

    if (!success) {
      return NextResponse.json({ error: "Participant not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting participant:", error)
    return NextResponse.json({ error: "Failed to delete participant" }, { status: 500 })
  }
}
