"use client"

import { TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteReminder } from "@/lib/actions/reminder.actions"
import { Reminder } from "@/lib/types/appwrite.types"
import { toast } from "sonner"
import { useState } from "react"

interface ReminderItemProps {
  reminder: Reminder
}

const ReminderItem = ({ reminder }: ReminderItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const onDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteReminder(reminder.$id)
    } catch (error) {
      console.error(error)
      toast.error("Could not delete reminder")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 pt-4 px-6 pb-6 bg-white rounded-xl border border-slate-100 shadow-md">
      <div className="flex items-center justify-between">
        <div className="max-w-64 text-foreground">{reminder.prompt}</div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          disabled={isDeleting}
        >
          <TrashIcon className="w-4 h-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>

      <p className="text-sm text-gray-600">{reminder.summary}</p>
    </div>
  )
}

export default ReminderItem
