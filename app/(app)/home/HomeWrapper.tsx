"use client"

import { useEffect } from "react"
import { useReminderContext } from "@/app/contexts/ReminderContext"
import ReminderInput from "@/components/ReminderInput"
import ReminderList from "@/components/ReminderList"
import { Reminder } from "@/lib/types/appwrite.types"

const HomeWrapper = ({
  initialReminders,
  user,
}: {
  initialReminders: Reminder[]
  user: User
}) => {
  const { setGenerating } = useReminderContext()

  useEffect(() => {
    setGenerating(false)
  }, [initialReminders, setGenerating])

  return (
    <div>
      <ReminderInput reminders={initialReminders} user={user} />
      <ReminderList reminders={initialReminders} />
    </div>
  )
}

export default HomeWrapper
