"use server"

import { ID, Query } from "node-appwrite"
import {
  REMINDER_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config"
import { generateWeeklyRecapEmail } from "../emails/weeklyRecapTemplate"

export async function fetchUserIdsWithOldReminders() {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  try {
    const reminders = await databases.listDocuments(
      DATABASE_ID!,
      REMINDER_COLLECTION_ID!,
      [Query.lessThan("createdAt", sevenDaysAgo.toISOString())]
    )

    const userIds = Array.from(
      new Set(reminders.documents.map((reminder) => reminder.userId))
    )

    return userIds
  } catch (error) {
    console.error("Error fetching user IDs with old reminders:", error)
    throw error
  }
}

export async function scheduleEmail(userId: string) {
  const now = new Date()

  const reminders = await databases.listDocuments(
    DATABASE_ID!,
    REMINDER_COLLECTION_ID!,
    [Query.equal("userId", userId), Query.orderAsc("createdAt"), Query.limit(5)]
  )

  const remindersToSend = reminders.documents.filter((reminder) => {
    const timesShown = reminder.timesShown || 0
    const nextReminderDate = new Date(reminder.createdAt)
    nextReminderDate.setDate(
      nextReminderDate.getDate() + Math.pow(2, timesShown) * 7
    )
    return nextReminderDate <= now
  })

  if (remindersToSend.length === 0) {
    console.log("No reminders to send for user:", userId)
    return
  }

  const emailHTML = generateWeeklyRecapEmail(remindersToSend)

  try {
    await messaging.createEmail(
      ID.unique(),
      "Your weekly recap",
      emailHTML, // html goes here
      [], // topics (optional)
      [userId], // users (optional)
      [], // targets (optional)
      [], // cc (optional)
      [], // bcc (optional)
      [], // attachments (optional)
      false, // draft (optional)
      true // html (optional)
    )

    // Update timesShown for each reminder
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
