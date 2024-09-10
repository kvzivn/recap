"use client"

import {
  BookOpen,
  Clapperboard,
  FileText,
  Lightbulb,
  Mic,
  TriangleAlert,
} from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion"
import { Reminder } from "@/lib/types/appwrite.types"
import DeleteButton from "@/components/DeleteButton"
import { useReminderContext } from "@/app/contexts/ReminderContext"

const ReminderList = ({ reminders }: { reminders: Reminder[] }) => {
  const { generating } = useReminderContext()

  const parseSummary = (summaryString: string) => {
    const jsonString = summaryString.replace(/```json\n|```/g, "")

    try {
      return JSON.parse(jsonString)
    } catch (error) {
      console.error("Error parsing summary JSON:", error)
      return {
        category: "error",
        summary: "Couldn't create summary. Please try a different prompt.",
      }
    }
  }

  const getIcon = (summaryString: string) => {
    const parsedSummary = parseSummary(summaryString)
    const category = parsedSummary.category

    switch (category) {
      case "book":
        return <BookOpen className="w-4 h-4" />
      case "article":
        return <FileText className="w-4 h-4" />
      case "video":
        return <Clapperboard className="w-4 h-4" />
      case "audio":
        return <Mic className="w-4 h-4" />
      case "error":
        return <TriangleAlert className="w-4 h-4" />
      default:
        return <Lightbulb className="w-4 h-4" />
    }
  }

  const getSummaryHtml = (summaryString: string) => {
    const parsedSummary = parseSummary(summaryString)
    return { __html: parsedSummary.summary }
  }

  return (
    <>
      <Accordion type="single" collapsible className="w-full px-2">
        {reminders.length > 0 && generating ? (
          <div className="h-[3.75rem]">
            <div
              className="
                relative
                w-full
                top-5
                isolate
                overflow-hidden
                rounded-md
                before:absolute before:inset-0
                before:-translate-x-full
                before:animate-[shimmer_2s_infinite]
                before:bg-gradient-to-r
                before:from-transparent before:via-stone-400/50 before:to-transparent
                dark:before:via-stone-700/40"
            >
              <div className="w-full h-5 bg-neutral-200/50 dark:bg-neutral-800/40 rounded-md" />
            </div>
          </div>
        ) : null}

        {reminders.map((reminder) => (
          <AccordionItem key={reminder.$id} value={reminder.$id}>
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                {getIcon(reminder.summary)}
                <div className="pt-0.25 font-mediumtext-sm">
                  {reminder.prompt}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div
                className="mt-1 space-y-4"
                dangerouslySetInnerHTML={getSummaryHtml(reminder.summary)}
              />
              <div className="mt-5 mb-3">
                <div className="flex gap-2">
                  <DeleteButton reminder={reminder} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export default ReminderList
