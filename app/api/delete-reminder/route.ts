import { deleteReminder } from "@/lib/actions/reminder.actions"
import { getUserByRaycastKey } from "@/lib/actions/user.actions"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const raycastKey = req.headers.get("Authorization")?.split("Bearer ")[1]
    if (!raycastKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await getUserByRaycastKey(raycastKey)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: "Reminder ID is required" },
        { status: 400 }
      )
    }

    const deletedReminder = await deleteReminder(id)

    return NextResponse.json({ success: true, deletedReminder })
  } catch (error) {
    console.error("Error deleting reminder:", error)
    return NextResponse.json(
      { error: "Failed to delete reminder" },
      { status: 500 }
    )
  }
}
