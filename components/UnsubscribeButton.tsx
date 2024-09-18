"use client"

import { useState } from "react"
import { updateIsUnsubscribed } from "@/lib/actions/user.actions"
import { Button } from "./ui/button"

export function UnsubscribeButton({ userId }: { userId: string }) {
  const [unsubscribed, setUnsubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const unsubscribe = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await updateIsUnsubscribed(userId, true)
      setUnsubscribed(true)
    } catch (err) {
      setError("Failed to update subscription status. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (error) return <div>Error: {error}</div>

  if (unsubscribed) return <div>Successfully unsubscribed!</div>

  return (
    <Button onClick={unsubscribe} disabled={isLoading}>
      {isLoading ? "Unsubscribing..." : "Unsubscribe"}
    </Button>
  )
}
