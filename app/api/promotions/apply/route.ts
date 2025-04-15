import { type NextRequest, NextResponse } from "next/server"
import { promotionApi } from "@/lib/api/promotion-api"

export async function POST(request: NextRequest) {
  try {
    const { promotionId, orderTotal, items } = await request.json()

    if (!promotionId || orderTotal === undefined || !items) {
      return NextResponse.json({ error: "Promotion ID, order total, and items are required" }, { status: 400 })
    }

    const result = await promotionApi.applyToOrder(promotionId, orderTotal, items)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error applying promotion:", error)
    return NextResponse.json({ error: "Failed to apply promotion" }, { status: 500 })
  }
}
