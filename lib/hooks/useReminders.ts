"use client"

import { useState, useCallback, useEffect } from "react"
import { Models } from "node-appwrite"
import { getReminders } from "@/lib/actions/reminder.actions"

type Reminder = Models.Document

const useReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([])

  const fetchReminders = useCallback(async () => {
    try {
      const fetchedReminders = await getReminders()
      setReminders(fetchedReminders || [])
    } catch (error) {
      console.error(error)
      throw error
    }
  }, [])

  useEffect(() => {
    fetchReminders()
  }, [fetchReminders])

  const refreshReminders = () => {
    fetchReminders()
  }

  return { reminders, refreshReminders }
}

export default useReminders
