import { getReminders } from "@/lib/actions/reminder.actions"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { Reminder } from "@/lib/types/appwrite.types"
import { ReminderProvider } from "@/app/contexts/ReminderContext"
import HomeWrapper from "./HomeWrapper"

const Home = async () => {
  const user = await getLoggedInUser()
  const reminders = (await getReminders({ userId: user.userId })) as Reminder[]

  return (
    <ReminderProvider>
      <HomeWrapper initialReminders={reminders} userId={user.userId} />
    </ReminderProvider>
  )
}

export default Home
