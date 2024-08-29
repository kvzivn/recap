"use server"

import { ID, Query } from "node-appwrite"

import {
  REMINDER_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config"
import { revalidatePath } from "next/cache"

export const createReminder = async (reminder: CreateReminderParams) => {
  try {
    const newReminder = await databases.createDocument(
      DATABASE_ID!,
      REMINDER_COLLECTION_ID!,
      ID.unique(),
      reminder
    )

    if (!newReminder) {
      throw new Error("Failed to create a new reminder")
    }

    revalidatePath("/home")
  } catch (error) {
    console.error("An error occurred while creating a new reminder:", error)
    throw error
  }
}

export const deleteReminder = async (reminderId: string) => {
  try {
    const deletedReminder = await databases.deleteDocument(
      DATABASE_ID!,
      REMINDER_COLLECTION_ID!,
      reminderId
    )

    if (!deletedReminder) {
      throw new Error("Failed to delete the reminder")
    }

    revalidatePath("/home")
  } catch (error) {
    console.error("An error occurred while deleting the reminder:", error)
    throw error
  }
}

export const getReminders = async ({ userId }: { userId: string }) => {
  try {
    const reminders = await databases.listDocuments(
      DATABASE_ID!,
      REMINDER_COLLECTION_ID!,
      [Query.equal("userId", [userId]), Query.orderDesc("$createdAt")]
    )

    return reminders.documents
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent reminders:",
      error
    )
    throw error
  }
}
