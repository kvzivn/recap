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
import { useReminderContext } from "@/app/contexts/ReminderContext"
import { useEffect, useState } from "react"

const ReminderInput = ({
  reminders,
  userId,
}: {
  reminders: Reminder[]
  userId: string
}) => {
  const { generating, setGenerating } = useReminderContext()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
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

    try {
      const summary = await createSummary(data.prompt)
      const reminder = {
        userId,
        prompt: data.prompt,
        summary: summary || "Summary not available",
        timesShown: 0,
      }
      await createReminder(reminder)
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="group flex items-center gap-4 w-full pl-1 pr-2 py-1 border-2 border-input rounded-lg bg-neutral-50 hover:bg-white hover:border-stone-300 focus-within:border-stone-500 focus-within:bg-white focus-within:hover:border-stone-500 transition-colors"
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder={
                    isMobile
                      ? "What do you want to remember better?"
                      : "What would you like to remember better?"
                  }
                  className="border-none focus-visible:ring-0 text-base sm:text-sm"
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

      {reminders.length === 0 && (
        <div className="flex items-end mt-8 gap-4 space-y-4">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className={`px-3 py-4 sm:p-5 w-full text-sm cursor-pointer hover:bg-white hover:border-stone-300 transition-colors`}
              onClick={() => handleCardClick(card.prompt)}
            >
              <card.icon className="w-5 h-5 sm:w-4 sm:h-4 text-muted-foreground" />
              <p className="pl-1 sm:pl-0 mt-4 sm:mt-5">{card.prompt}</p>
            </Card>
          ))}
        </div>
      )}
    </Form>
  )
}

export default ReminderInput
