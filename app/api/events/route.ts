import { type NextRequest, NextResponse } from "next/server"
import { eventsApi } from "@/lib/api/events-api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const restaurantId = searchParams.get("restaurantId")

  if (!restaurantId) {
    return NextResponse.json({ error: "Restaurant ID is required" }, { status: 400 })
  }

  try {
    const events = await eventsApi.getAll(restaurantId)
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.restaurantId) {
      return NextResponse.json({ error: "Restaurant ID is required" }, { status: 400 })
    }

    // Validation des données
    if (!data.name || !data.type || !data.startDate || !data.endDate || !data.capacity || !data.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const event = await eventsApi.create(data)
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
