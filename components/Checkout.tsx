"use client"

import { loadStripe } from "@stripe/stripe-js"
import { checkoutCredits } from "@/lib/actions/transactions.actions"
import { useEffect } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"

const Checkout = ({ user }: { user: User }) => {
  const remindersLeft = user?.remindersLeft === 0 ? 0 : user?.remindersLeft || 3

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }, [])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)

    if (query.get("success")) {
      toast.success("10 reminders added to your account.")
    }

    if (query.get("canceled")) {
      toast.error("Order cancelled.")
    }
  }, [])

  const onCheckout = async () => {
    const transaction = {
      buyerId: user.$id,
    }

    await checkoutCredits(transaction)
  }

  return (
    <form action={onCheckout} method="POST">
      <Button variant="link" type="submit">
        {remindersLeft} reminder{remindersLeft === 1 ? "" : "s"} available
      </Button>
    </form>
  )
}

export default Checkout
