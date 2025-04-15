import { type NextRequest, NextResponse } from "next/server"
import { promotionApi } from "@/lib/api/promotion-api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const restaurantId = searchParams.get("restaurantId")

  if (!restaurantId) {
    return NextResponse.json({ error: "Restaurant ID is required" }, { status: 400 })
  }

  try {
    const promotions = await promotionApi.getAll(restaurantId)
    return NextResponse.json(promotions)
  } catch (error) {
    console.error("Error fetching promotions:", error)
    return NextResponse.json({ error: "Failed to fetch promotions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.restaurantId) {
      return NextResponse.json({ error: "Restaurant ID is required" }, { status: 400 })
    }

    // Validation des données
    if (!data.name || !data.type || !data.startDate || !data.endDate || !data.applicableItems) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const promotion = await promotionApi.create(data)
    return NextResponse.json(promotion, { status: 201 })
  } catch (error) {
    console.error("Error creating promotion:", error)
    return NextResponse.json({ error: "Failed to create promotion" }, { status: 500 })
  }
}
