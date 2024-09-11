"use server"

import { ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient } from "./appwrite.actions"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"

const { DATABASE_ID, USER_COLLECTION_ID } = process.env

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient()

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    )

    return parseStringify(user.documents[0])
  } catch (error) {
    console.log(error)
  }
}

export const signIn = async ({ email, password }: signInProps) => {
  const sessionCookie = cookies()

  try {
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)

    sessionCookie.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    })

    const user = await getUserInfo({ userId: session.userId })

    return parseStringify(user)
  } catch (error) {
    console.error("Error", error)
  }
}

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email } = userData
  const sessionCookie = cookies()
  let newUserAccount

  try {
    const { account, database } = await createAdminClient()

    newUserAccount = await account.create(ID.unique(), email, password)

    if (!newUserAccount) throw new Error("Error creating user")

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        raycastKey: uuidv4(),
      }
    )

    const session = await account.createEmailPasswordSession(email, password)

    sessionCookie.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    })

    return parseStringify(newUser)
  } catch (error) {
    console.error("Error", error)
    throw error
  }
}

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient()
    const result = await account.get()

    const user = await getUserInfo({ userId: result.$id })

    return parseStringify(user)
  } catch (error) {
    console.log(error)
    return null
  }
}

export const logoutAccount = async () => {
  const sessionCookie = cookies()
  try {
    const { account } = await createSessionClient()

    sessionCookie.delete("appwrite-session")

    await account.deleteSession("current")
  } catch (error) {
    return null
  }
}

export const updateUserRemindersLeft = async (
  userId: string,
  remindersLeft: number
) => {
  try {
    const { database } = await createAdminClient()

    await database.updateDocument(DATABASE_ID!, USER_COLLECTION_ID!, userId, {
      remindersLeft,
    })

    revalidatePath("/home")
  } catch (error) {
    console.log(error)
  }
}

export const addUserReminders = async (userId: string, reminders: number) => {
  try {
    const { database } = await createAdminClient()

    await database.updateDocument(DATABASE_ID!, USER_COLLECTION_ID!, userId, {
      remindersLeft: reminders,
    })
  } catch (error) {
    console.log(error)
  }
}

export const getUserByRaycastKey = async (raycastKey: string) => {
  try {
    const { database } = await createAdminClient()

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("raycastKey", [raycastKey])]
    )

    return parseStringify(user.documents[0])
  } catch (error) {
    console.log(error)
  }
}
