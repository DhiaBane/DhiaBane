import { type NextRequest, NextResponse } from "next/server"
import { promotionApi } from "@/lib/api/promotion-api"

export async function POST(request: NextRequest) {
  try {
    const { code, restaurantId } = await request.json()

    if (!code || !restaurantId) {
      return NextResponse.json({ error: "Code and restaurant ID are required" }, { status: 400 })
    }

    const result = await promotionApi.validateCode(code, restaurantId)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error validating promotion code:", error)
    return NextResponse.json({ error: "Failed to validate promotion code" }, { status: 500 })
  }
}
