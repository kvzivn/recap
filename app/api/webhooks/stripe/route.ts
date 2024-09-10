import { createTransaction } from "@/lib/actions/transactions.actions"
import { NextResponse } from "next/server"
import stripe from "stripe"

export async function POST(request: Request) {
  console.log("Webhook received")

  const body = await request.text()
  console.log("Raw body:", body.substring(0, 100) + "...") // Log first 100 chars

  const sig = request.headers.get("stripe-signature") as string
  console.log("Stripe signature:", sig)

  const endpointSecret =
    process.env.NODE_ENV === "production"
      ? process.env.STRIPE_LIVE_WEBHOOK_SECRET!
      : process.env.STRIPE_TEST_WEBHOOK_SECRET!
  console.log("Using endpoint secret:", endpointSecret.substring(0, 5) + "...") // First 5 chars for safety
  console.log("NODE_ENV:", process.env.NODE_ENV)

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    console.log("Event constructed successfully:", event.type)
  } catch (err) {
    console.error("Webhook error:", err)
    return NextResponse.json(
      { message: "Webhook error", error: err },
      { status: 400 }
    )
  }

  const eventType = event.type

  if (eventType === "checkout.session.completed") {
    console.log("Checkout session completed")
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
