"use client"

import { createReminder } from "@/lib/actions/reminder.actions"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { createSummary } from "@/lib/actions/summary.actions"
import { toast } from "sonner"

type ReminderInputProps = {
  refreshReminders: () => void
}

const ReminderInput = ({ refreshReminders }: ReminderInputProps) => {
  const [prompt, setPrompt] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const addReminder = async () => {
    if (prompt.trim() !== "") {
      try {
        setLoading(true)
        const summary = await createSummary(prompt)
        const reminder = {
          prompt,
          summary: summary || "Summary not available",
        }
        await createReminder(reminder)
        refreshReminders()
      } catch (error) {
        console.error(error)
        toast.error("Could not create reminder")
      } finally {
        setPrompt("")
        setLoading(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addReminder()
    }
  }

  return (
    <div className="flex items-center gap-4 w-full p-2 border border-slate-100 bg-white rounded-xl shadow-md">
      <Input
        type="text"
        placeholder="Enter a reminder"
        value={prompt}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPrompt(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />
      <Button
        onClick={addReminder}
        size="icon"
        variant="ghost"
        disabled={!prompt.length}
      >
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <PaperPlaneIcon className="w-6 h-6" />
        )}
      </Button>
    </div>
  )
}

export default ReminderInput
