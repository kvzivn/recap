"use client"

import { deleteReminder } from "@/lib/actions/reminder.actions"
import { Loader2, Trash } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Reminder } from "@/lib/types/appwrite.types"

const DeleteButton = ({ reminder }: { reminder: Reminder }) => {
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
    <Button
      size="sm"
      variant="outline"
      onClick={onDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Trash className="w-4 h-4 mr-2" />
      )}
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  )
}

export default DeleteButton
