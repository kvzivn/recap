"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createReminder } from "@/lib/actions/reminder.actions"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { createSummary } from "@/lib/actions/summary.actions"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import Spinner from "./Spinner"
import { Mic, Clapperboard, FileText } from "lucide-react"
import { Card } from "./ui/card"
import { Reminder } from "@/lib/types/appwrite.types"

const ReminderInput = ({ reminders }: { reminders: Reminder[] }) => {
  const [loading, setLoading] = useState(false)

  const formSchema = z.object({
    prompt: z.string().min(1),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)

    try {
      const summary = await createSummary(data.prompt)
      const reminder = {
        prompt: data.prompt,
        summary: summary || "Summary not available",
      }
      await createReminder(reminder)
    } catch (error) {
      console.error(error)
      toast.error("Could not create reminder")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="group flex items-center gap-4 w-full pl-1 pr-2 py-1 border-2 border-input rounded-lg bg-neutral-50 hover:bg-white hover:border-stone-300 focus-within:border-stone-500 focus-within:bg-white focus-within:hover:border-stone-500"
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder="what would you like to remember better?"
                  className="border-none focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          size="icon"
          variant="ghost"
          disabled={loading || !form.watch("prompt")}
        >
          {loading ? <Spinner /> : <PaperPlaneIcon className="w-5 h-5" />}
        </Button>
      </form>

      {reminders.length === 0 && (
        <div className="flex items-end mt-8 gap-4 space-y-4">
          <Card
            className={`p-4 text-sm w-full h-28 cursor-pointer hover:bg-white hover:border-stone-300 transition-colors ${
              form.watch("prompt") === "lex fridman and perplexity ceo"
                ? "border-stone-500 hover:border-stone-500"
                : ""
            }`}
            onClick={() =>
              form.setValue("prompt", "lex fridman and perplexity ceo")
            }
          >
            <Mic className="w-4 h-4 text-muted-foreground" />
            <p className="mt-5">lex fridman and perplexity ceo</p>
          </Card>
          <Card
            className={`p-4 text-sm w-full h-28 cursor-pointer hover:bg-white hover:border-stone-300 transition-colors ${
              form.watch("prompt") === "citizen snowden documentary"
                ? "border-stone-500 hover:border-stone-500"
                : ""
            }`}
            onClick={() =>
              form.setValue("prompt", "citizen snowden documentary")
            }
          >
            <Clapperboard className="w-4 h-4 text-muted-foreground" />
            <p className="mt-5">citizen snowden documentary</p>
          </Card>
          <Card
            className={`p-4 text-sm w-full h-28 cursor-pointer hover:bg-white hover:border-stone-300 transition-colors ${
              form.watch("prompt") === "why china didn't invent chatgpt"
                ? "border-stone-500 hover:border-stone-500"
                : ""
            }`}
            onClick={() =>
              form.setValue("prompt", "why china didn't invent chatgpt")
            }
          >
            <FileText className="w-4 h-4 text-muted-foreground" />
            <p className="mt-5">why china didn&apos;t invent chatgpt</p>
          </Card>
        </div>
      )}
    </Form>
  )
}

export default ReminderInput
