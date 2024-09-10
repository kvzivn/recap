import { createTransaction } from "@/lib/actions/transactions.actions"
import { NextResponse } from "next/server"
import stripe from "stripe"

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature") as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_LIVE!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err })
  }

  const eventType = event.type

  if (eventType === "checkout.session.completed") {
    const { id, metadata } = event.data.object

    const transaction = {
      stripeId: id,
      buyerId: metadata?.buyerId || "",
    }

    const newTransaction = await createTransaction(transaction)

    return NextResponse.json({ message: "OK", transaction: newTransaction })
  }

  return new Response("", { status: 200 })
}
