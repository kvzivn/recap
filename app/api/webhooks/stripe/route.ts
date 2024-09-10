import { createTransaction } from "@/lib/actions/transactions.actions"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json(
      { message: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
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
