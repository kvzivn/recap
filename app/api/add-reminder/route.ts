import { NextRequest, NextResponse } from "next/server"
import { createSummary } from "@/lib/actions/ai.actions"
import {
  getUserByRaycastKey,
  updateUserRemindersLeft,
} from "@/lib/actions/user.actions"
import { createReminder } from "@/lib/actions/reminder.actions"

export async function POST(req: NextRequest) {
  try {
    const raycastKey = req.headers.get("Authorization")?.split("Bearer ")[1]
    if (!raycastKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { prompt } = await req.json()
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const user = await getUserByRaycastKey(raycastKey)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.remindersLeft <= 0) {
      return NextResponse.json({ error: "No reminders left" }, { status: 403 })
    }

    const summary = await createSummary(prompt)

    const reminder = {
      userId: user.userId,
      prompt,
      summary: summary || "Summary not available",
      timesShown: 0,
    }

    await createReminder(reminder)
    await updateUserRemindersLeft(user.$id, user.remindersLeft - 1)

    return NextResponse.json(
      { message: "Reminder created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating reminder:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
