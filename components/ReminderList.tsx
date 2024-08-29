"use client"

import {
  BookOpen,
  Clapperboard,
  FileText,
  Lightbulb,
  Mic,
  RefreshCcw,
  TriangleAlert,
} from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion"
import { Reminder } from "@/lib/types/appwrite.types"
import { Button } from "./ui/button"
import DeleteButton from "@/components/DeleteButton"
import { useReminderContext } from "@/app/contexts/ReminderContext"

const ReminderList = ({ reminders }: { reminders: Reminder[] }) => {
  const { generating } = useReminderContext()

  const getIcon = (summaryString: string) => {
    let parsedSummary
    try {
      parsedSummary = JSON.parse(summaryString)
    } catch (error) {
      console.error("Error parsing summary JSON:", error)
      parsedSummary = { category: "error", summary: "Invalid summary format" }
    }
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
    try {
      const parsedSummary = JSON.parse(summaryString)
      return { __html: parsedSummary.summary }
    } catch (error) {
      console.error("Error parsing summary JSON:", error)
      return {
        __html: "couldn't create a summary. please try a different prompt.",
      }
    }
  }

  return (
    <>
      <Accordion type="single" collapsible className="w-full mt-10 px-2">
        {generating ? (
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
                before:from-transparent before:via-stone-400/50 before:to-transparent"
            >
              <div className="w-full h-5 bg-neutral-200/50 rounded-md" />
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
                  <Button size="sm" variant="outline">
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    re-generate
                  </Button>
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
