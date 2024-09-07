"use server"

import { redirect } from "next/navigation"
import Stripe from "stripe"
import { addUserReminders } from "./user.actions"
import {
  DATABASE_ID,
  databases,
  TRANSACTION_COLLECTION_ID,
  USER_COLLECTION_ID,
} from "../appwrite.config"
import { ID } from "node-appwrite"

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 299,
          product_data: {
            name: "10 Recap reminders",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/home?paymentSuccess=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/home?paymentCancelled=true`,
  })

  redirect(session.url!)
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    const newTransaction = await databases.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      transaction
    )

    if (!newTransaction) {
      throw new Error("Failed to create a new transaction")
    }

    const user = await databases.getDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      transaction.buyerId
    )

    const remindersLeft = user.remindersLeft || 0

    await addUserReminders(transaction.buyerId, remindersLeft + 10)

    return JSON.parse(JSON.stringify(newTransaction))
  } catch (error) {
    console.log(error)
    throw error
  }
}
