import { type NextRequest, NextResponse } from "next/server"
import { promotionApi } from "@/lib/api/promotion-api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const promotion = await promotionApi.getById(id)

    if (!promotion) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 })
    }

    return NextResponse.json(promotion)
  } catch (error) {
    console.error("Error fetching promotion:", error)
    return NextResponse.json({ error: "Failed to fetch promotion" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const data = await request.json()
    const promotion = await promotionApi.update(id, data)

    if (!promotion) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 })
    }

    return NextResponse.json(promotion)
  } catch (error) {
    console.error("Error updating promotion:", error)
    return NextResponse.json({ error: "Failed to update promotion" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const success = await promotionApi.delete(id)

    if (!success) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting promotion:", error)
    return NextResponse.json({ error: "Failed to delete promotion" }, { status: 500 })
  }
}
