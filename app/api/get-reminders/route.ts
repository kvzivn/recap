import { NextRequest, NextResponse } from "next/server"
import { getUserByRaycastKey } from "@/lib/actions/user.actions"
import { getReminders } from "@/lib/actions/reminder.actions"

export async function GET(req: NextRequest) {
  try {
    const raycastKey = req.headers.get("Authorization")?.split("Bearer ")[1]
    if (!raycastKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await getUserByRaycastKey(raycastKey)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const reminders = await getReminders({ userId: user.userId })

    return NextResponse.json({ reminders }, { status: 200 })
  } catch (error) {
    console.error("Error fetching reminders:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
