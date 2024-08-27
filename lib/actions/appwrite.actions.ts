"use server"

import { Client, Account, Databases, Users } from "node-appwrite"
import { cookies } from "next/headers"

const { NEXT_PUBLIC_ENDPOINT, NEXT_PUBLIC_PROJECT_ID, API_KEY } = process.env

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
    .setProject(NEXT_PUBLIC_PROJECT_ID!)

  const session = cookies().get("appwrite-session")

  if (!session || !session.value) {
    throw new Error("No session")
  }

  client.setSession(session.value)

  return {
    get account() {
      return new Account(client)
    },
  }
}

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
    .setProject(NEXT_PUBLIC_PROJECT_ID!)
    .setKey(API_KEY!)

  return {
    get account() {
      return new Account(client)
    },
    get database() {
      return new Databases(client)
    },
    get user() {
      return new Users(client)
    },
  }
}
