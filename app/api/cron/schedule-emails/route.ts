import { scheduleEmail } from "@/lib/actions/email.actions"
import { getLoggedInUser } from "@/lib/actions/user.actions"

export const dynamic = "force-dynamic"

export async function GET() {
  const user = await getLoggedInUser()
  await scheduleEmail(user.$id)
}
