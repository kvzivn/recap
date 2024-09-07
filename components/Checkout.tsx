"use client"

import { loadStripe } from "@stripe/stripe-js"
import { checkoutCredits } from "@/lib/actions/transactions.actions"
import { useEffect } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { useSearchParams } from "next/navigation"

const Checkout = ({ user }: { user: User }) => {
  const searchParams = useSearchParams()
  const remindersLeft = user?.remindersLeft === 0 ? 0 : user?.remindersLeft || 3

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }, [])

  useEffect(() => {
    if (searchParams.get("paymentSuccess") === "true") {
      setTimeout(() => {
        toast.success("10 reminders added to your account.")
      })
    }

    if (searchParams.get("paymentCancelled") === "true") {
      setTimeout(() => {
        toast.error("Order cancelled.")
      })
    }
  }, [searchParams])

  const onCheckout = async () => {
    const transaction = {
      buyerId: user.$id,
    }

    await checkoutCredits(transaction)
  }

  return (
    <Button variant="link" onClick={onCheckout}>
      {remindersLeft} reminder{remindersLeft === 1 ? "" : "s"} available
    </Button>
  )
}

export default Checkout
