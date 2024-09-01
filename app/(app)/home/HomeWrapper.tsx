"use client"

import { useEffect } from "react"
import { useReminderContext } from "@/app/contexts/ReminderContext"
import ReminderInput from "@/components/ReminderInput"
import ReminderList from "@/components/ReminderList"
import { Reminder } from "@/lib/types/appwrite.types"
import { Button } from "@/components/ui/button"
import { sendEmail } from "@/lib/actions/email.actions"

const HomeWrapper = ({
  initialReminders,
  userId,
}: {
  initialReminders: Reminder[]
  userId: string
}) => {
  const { setGenerating } = useReminderContext()

  useEffect(() => {
    setGenerating(false)
  }, [initialReminders, setGenerating])

  return (
    <div>
      <ReminderInput reminders={initialReminders} userId={userId} />
      <ReminderList reminders={initialReminders} />
      <Button onClick={() => sendEmail(userId)} className="mt-12">
        Send email
      </Button>
    </div>
  )
}

export default HomeWrapper
