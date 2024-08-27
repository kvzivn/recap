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
import { Form, FormControl, FormField } from "./ui/form"
import Spinner from "./Spinner"

const ReminderForm = () => {
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
        className="flex items-center gap-4 w-full p-2 border border-slate-100 bg-white rounded-xl shadow-md"
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder="Enter a reminder"
                  className="h-10 w-full px-3 py-2 bg-transparent text-lg ring-offset-background"
                  {...field}
                />
              </FormControl>
            </div>
          )}
        />
        <Button size="icon" variant="ghost">
          {loading ? <Spinner /> : <PaperPlaneIcon className="w-6 h-6" />}
        </Button>
      </form>
    </Form>
  )
}

export default ReminderForm
