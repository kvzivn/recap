"use client"

import ReminderItem from "@/components/ReminderItem"
import { Separator } from "@/components/ui/separator"
import ReminderInput from "@/components/ReminderInput"
import useReminders from "@/lib/hooks/useReminders"

const Home = () => {
  const { reminders, refreshReminders } = useReminders()

  return (
    <div className="flex flex-col items-center justify-center gap-8 -mt-16 max-w-md min-h-screen mx-auto">
      <h2 className="mb-4 text-xl text-slate-700">
        What would you like to remember more?
      </h2>

      <ReminderInput refreshReminders={refreshReminders} />

      {reminders && reminders?.length > 0 && <Separator className="bg-white" />}

      <div className="w-full space-y-2">
        {reminders &&
          reminders.length > 0 &&
          reminders?.map((reminder: any) => (
            <ReminderItem
              key={reminder.$id}
              reminder={reminder}
              refreshReminders={refreshReminders}
            />
          ))}
      </div>
    </div>
  )
}

export default Home
