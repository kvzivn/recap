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

export async function scheduleEmail(userId?: string, userDocumentId?: string) {
  if (!userId || !userDocumentId) {
    console.log("No user provided for scheduling emails")
    return
  }

  const now = new Date()

  const reminders = await databases.listDocuments(
    DATABASE_ID!,
    REMINDER_COLLECTION_ID!,
    [Query.equal("userId", userId), Query.orderAsc("$createdAt")]
  )

  console.log("Found", reminders.documents.length, "reminders for user", userId)

  const remindersToSend: Reminder[] = (reminders.documents as Reminder[])
    .filter((doc): doc is Reminder => {
      if (
        typeof doc.$createdAt !== "string" ||
        typeof doc.timesShown !== "number"
      ) {
        console.warn("Invalid reminder document:", doc)
        return false
      }
      return true
    })
    .filter((reminder) => {
      const timesShown = reminder.timesShown || 0
      const creationDate = new Date(reminder.$createdAt)
      const nextReminderDate = new Date(creationDate)

      if (timesShown > 0) {
        nextReminderDate.setHours(0, 0, 0, 0)
        nextReminderDate.setDate(
          nextReminderDate.getDate() + getSpacedInterval(timesShown)
        )
      }

      return nextReminderDate <= now
    })
    .sort((a, b) => a.timesShown - b.timesShown)
    .slice(0, 3)

  if (remindersToSend.length === 0) {
    console.log("No reminders to send for user:", userId)
    return
  } else {
    console.log(
      `Generating email for ${userId} with ${remindersToSend.length} reminders`
    )
  }

  let emailHTML: string

  try {
    emailHTML = generateRecapEmail(remindersToSend, userDocumentId)
  } catch (error) {
    console.error("Error generating email HTML:", error)
    throw new Error("Failed to generate email content")
  }

  try {
    const emailResult = await messaging.createEmail(
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

    if (!emailResult) {
      throw new Error("Email creation failed")
    }

    for (const reminder of remindersToSend) {
      try {
        await databases.updateDocument(
          DATABASE_ID!,
          REMINDER_COLLECTION_ID!,
          reminder.$id,
          { timesShown: (reminder.timesShown || 0) + 1 }
        )
      } catch (updateError) {
        console.error(`Error updating reminder ${reminder.$id}:`, updateError)
      }
    }
  } catch (error) {
    console.error("Error in email creation or reminder updates:", error)
    throw new Error("Failed to process email and reminders")
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

  const emailHTML = generateRecapEmail(remindersToSend, userId)

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
