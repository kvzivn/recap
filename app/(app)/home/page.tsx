import { getReminders } from "@/lib/actions/reminder.actions"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { Reminder } from "@/lib/types/appwrite.types"
import { ReminderProvider } from "@/lib/context/ReminderContext"
import HomeWrapper from "./HomeWrapper"

const Home = async () => {
  const user = await getLoggedInUser()
  const reminders = (await getReminders({ userId: user.userId })) as Reminder[]

  return (
    <ReminderProvider>
      <HomeWrapper initialReminders={reminders} user={user} />
    </ReminderProvider>
  )
}

export default Home
