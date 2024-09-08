"use server"

import { ID, Query } from "node-appwrite"
import {
  REMINDER_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config"
import { generateRecapEmail } from "../emails/recapTemplate"
import { Reminder } from "../types/appwrite.types"

export async function scheduleEmail(userId: string) {
  const now = new Date()

  const reminders = await databases.listDocuments(
    DATABASE_ID!,
    REMINDER_COLLECTION_ID!,
    [
      Query.equal("userId", userId),
      Query.orderAsc("$createdAt"),
      Query.limit(5),
    ]
  )

  const remindersToSend: Reminder[] = (
    reminders.documents as Reminder[]
  ).filter((reminder) => {
    const timesShown = reminder.timesShown || 0
    const nextReminderDate = new Date(reminder.createdAt)
    nextReminderDate.setDate(
      nextReminderDate.getDate() + getSpacedInterval(timesShown)
    )
    return nextReminderDate <= now
  })

  if (remindersToSend.length === 0) {
    console.log("No reminders to send for user:", userId)
    return
  }

  const emailHTML = generateRecapEmail(remindersToSend)

  try {
    await messaging.createEmail(
      ID.unique(),
      "Your personal reminders",
      emailHTML,
      [],
      [userId],
      [],
      [],
      [],
      [],
      false,
      true
    )

    for (const reminder of remindersToSend) {
      await databases.updateDocument(
        DATABASE_ID!,
        REMINDER_COLLECTION_ID!,
        reminder.$id,
        { timesShown: (reminder.timesShown || 0) + 1 }
      )
    }
  } catch (error) {
    console.error("Error sending email:", error)
  }
}

function getSpacedInterval(timesShown: number): number {
  const intervals = [1, 5, 14, 30, 90, 180, 365]
  return timesShown < intervals.length ? intervals[timesShown] : 365
}

export async function sendEmail(userId: string) {
  const reminders = await databases.listDocuments(
    DATABASE_ID!,
    REMINDER_COLLECTION_ID!,
    [
      Query.equal("userId", userId),
      Query.orderAsc("$createdAt"),
      Query.limit(5),
    ]
  )

  const remindersToSend: Reminder[] = reminders.documents as Reminder[]

  const emailHTML = generateRecapEmail(remindersToSend)

  try {
    await messaging.createEmail(
      ID.unique(),
      "Your personal reminders",
      emailHTML,
      [],
      [userId],
      [],
      [],
      [],
      [],
      false,
      true
    )
  } catch (error) {
    console.error("Error sending email:", error)
  }
}
