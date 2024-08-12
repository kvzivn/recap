"use client"

import { TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteReminder } from "@/lib/actions/reminder.actions"
import { Reminder } from "@/types/appwrite.types"
import { toast } from "sonner"

interface ReminderItemProps {
  reminder: Reminder
  refreshReminders: () => void
}

const ReminderItem = ({ reminder, refreshReminders }: ReminderItemProps) => {
  const onDelete = async () => {
    try {
      await deleteReminder(reminder.$id)
      refreshReminders()
    } catch (error) {
      console.error(error)
      toast.error("Could not delete reminder")
    }
  }

  return (
    <div className="flex flex-col gap-4 pt-4 px-6 pb-6 bg-white rounded-xl border border-slate-100 shadow-md">
      <div className="flex items-center justify-between">
        <div className="max-w-64 text-foreground">{reminder.prompt}</div>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <TrashIcon className="w-4 h-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>

      <p className="text-sm text-gray-600">{reminder.summary}</p>
    </div>
  )
}

export default ReminderItem
