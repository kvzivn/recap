import { getReminders } from "@/lib/actions/reminder.actions"
import ReminderItem from "./ReminderItem"
import { Separator } from "./ui/separator"

const ReminderList = async () => {
  const reminders = await getReminders()

  return (
    <>
      {reminders?.length > 0 && <Separator className="bg-white" />}

      <div className="w-full space-y-2">
        {reminders?.map((reminder: any) => (
          <ReminderItem key={reminder.$id} reminder={reminder} />
        ))}
      </div>
    </>
  )
}

export default ReminderList
