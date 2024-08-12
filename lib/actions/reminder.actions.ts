"use server"

import { ID } from "node-appwrite"

import {
  REMINDER_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config"

export const createReminder = async (reminder: CreateReminderParams) => {
  try {
    console.log("Creating a new reminder...")
    const newReminder = await databases.createDocument(
      DATABASE_ID!,
      REMINDER_COLLECTION_ID!,
      ID.unique(),
      reminder
    )

    if (!newReminder) {
      throw new Error("Failed to create a new reminder")
    }
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
  } catch (error) {
    console.error("An error occurred while deleting the reminder:", error)
    throw error
  }
}

export const getReminders = async () => {
  try {
    const reminders = await databases.listDocuments(
      DATABASE_ID!,
      REMINDER_COLLECTION_ID!
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
