"use server"

import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const createSummary = async (prompt: string) => {
  try {
    const { text: summary } = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are a memory coach that will help me remember things better.",
      prompt: `Summarize this in a few sentences and highlight any key concepts:\n${prompt}`,
    })

    if (!summary) {
      throw new Error("Failed to create a new summary")
    }

    return summary
  } catch (error) {
    console.error("An error occurred while creating a summary:", error)
    throw error
  }
}
