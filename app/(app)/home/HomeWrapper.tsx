"use client"

import { useEffect } from "react"
import { useReminderContext } from "@/app/contexts/ReminderContext"
import ReminderInput from "@/components/ReminderInput"
import ReminderList from "@/components/ReminderList"
import { Reminder } from "@/lib/types/appwrite.types"

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
    </div>
  )
}

export default HomeWrapper
