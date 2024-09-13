import { scheduleEmail } from "@/lib/actions/email.actions"
import {
  databases,
  DATABASE_ID,
  USER_COLLECTION_ID,
} from "@/lib/appwrite.config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const users = await databases.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!
    )

    for (const user of users.documents) {
      await scheduleEmail(user.userId)
    }

    return new Response(
      `Emails for ${users.documents.length ?? 0} users scheduled successfully`,
      { status: 200 }
    )
  } catch (error) {
    console.error("Error scheduling emails:", error)
    return new Response("Error scheduling emails", { status: 500 })
  }
}
