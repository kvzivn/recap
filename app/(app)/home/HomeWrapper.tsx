"use client"

import { useEffect } from "react"
import { useReminderContext } from "@/lib/context/ReminderContext"
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
    <div className="space-y-10">
      <ReminderInput reminders={initialReminders} user={user} />
      <ReminderList reminders={initialReminders} />
    </div>
  )
}

export default HomeWrapper
