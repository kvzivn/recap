"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createReminder } from "@/lib/actions/reminder.actions"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { createSummary } from "@/lib/actions/ai.actions"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import Spinner from "./Spinner"
import { Mic, Clapperboard, FileText } from "lucide-react"
import { Card } from "./ui/card"
import { Reminder } from "@/lib/types/appwrite.types"
import { useReminderContext } from "@/lib/context/ReminderContext"
import { useEffect } from "react"
import { updateUserRemindersLeft } from "@/lib/actions/user.actions"
import { sendEmail } from "@/lib/actions/email.actions"
import { cn } from "@/lib/utils"

const ReminderInput = ({
  reminders,
  user,
}: {
  reminders: Reminder[]
  user: User
}) => {
  const { generating, setGenerating } = useReminderContext()

  useEffect(() => {
    if (navigator.userAgent.indexOf("iPhone") > -1) {
      document
        .querySelector('meta[name="viewport"]')
        ?.setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=1"
        )
    }
  }, [])

  const cardData = [
    {
      prompt: "lex fridman and donald trump",
      icon: Mic,
    },
    {
      prompt: "citizen snowden documentary",
      icon: Clapperboard,
    },
    {
      prompt: "why china didn't invent chatgpt",
      icon: FileText,
    },
  ]

  const formSchema = z.object({
    prompt: z.string().min(1),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setGenerating(true)

    if (data.prompt === "test email") {
      try {
        await sendEmail(user.userId)
      } catch (error) {
        console.error(error)
      } finally {
        setGenerating(false)
        form.setValue("prompt", "")
      }

      return
    }

    try {
      const summary = await createSummary(data.prompt)
      const reminder = {
        userId: user.userId,
        prompt: data.prompt,
        summary: summary || "Summary not available",
        timesShown: 0,
      }
      await createReminder(reminder)
      await updateUserRemindersLeft(
        user.$id,
        user.remindersLeft ? user.remindersLeft - 1 : 2
      )
    } catch (error) {
      console.error(error)
      toast.error("Could not create reminder")
      setGenerating(false)
    } finally {
      setTimeout(() => {
        form.setValue("prompt", "")
      }, 500)
    }
  }

  const handleCardClick = (prompt: string) => {
    form.setValue("prompt", prompt)
    form.setFocus("prompt")
  }

  return (
    <Form {...form}>
      {user.remindersLeft > 0 && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`group flex items-center gap-4 w-full pl-1 pr-2 py-1 border-2 border-input dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-900 ${
            user.remindersLeft > 0
              ? "hover:bg-white hover:border-stone-300 focus-within:border-stone-600 focus-within:bg-white focus-within:hover:border-stone-500 dark:hover:bg-neutral-900 dark:hover:border-neutral-600 dark:focus-within:border-neutral-400 dark:focus-within:bg-neutral-800 dark:focus-within:hover:border-neutral-400"
              : ""
          } transition-colors`}
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl>
                  <Input
                    placeholder="What would you like to remember better?"
                    className="border-none focus-visible:ring-0 text-sm dark:bg-neutral-900 dark:text-stone-200 dark:placeholder:text-neutral-100 dark:focus-visible:ring-0"
                    disabled={user.remindersLeft === 0}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            size="icon"
            variant="ghost"
            disabled={generating || !form.watch("prompt")}
          >
            {generating ? <Spinner /> : <PaperPlaneIcon className="w-5 h-5" />}
          </Button>
        </form>
      )}

      {reminders.length === 0 && (
        <div
          className={cn(
            "flex items-end mt-8 gap-4 space-y-4",
            user.remindersLeft > 0 ? "mt-8" : "mt-0"
          )}
        >
          {cardData.map((card, index) => (
            <Card
              key={index}
              className={`px-3 py-4 sm:p-5 w-full text-[3vw] sm:text-sm cursor-pointer hover:bg-white hover:border-stone-300 dark:hover:bg-neutral-800 dark:hover:border-neutral-600 transition-colors`}
              onClick={() => handleCardClick(card.prompt)}
            >
              <card.icon className="w-5 h-5 sm:w-4 sm:h-4 text-muted-foreground dark:text-neutral-300" />
              <p className="pl-1 sm:pl-0 mt-4 sm:mt-5">{card.prompt}</p>
            </Card>
          ))}
        </div>
      )}
    </Form>
  )
}

export default ReminderInput
