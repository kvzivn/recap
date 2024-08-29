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
        "You are an AI assistant specialized in creating concise, informative summaries of various media types including articles, books, podcasts, and videos. Your summaries should be confident and avoid hedging language like 'likely' or 'possibly' when describing content. Do not hallucinate.Format your summaries using simple HTML for structure, focusing on paragraph breaks (<p>) and bullet lists (<ul> and <li>) where appropriate. Provide summaries in the following JSON format: 'summary': 'HTML-formatted summary text', 'category': 'article|book|audio|video|unknown' Your summaries should be comprehensive yet concise, typically ranging from 100 to 200 words. Capture the main ideas, key points, and significant details of the content. Use clear, engaging language that informs the reader about the essence of the media without requiring them to consult the original source. Remember: 1. Use confident language. 2. Include HTML formatting for readability. 3. Categorize the media type accurately. 4. Aim for 100-200 words in the summary. 5. Focus on main ideas and key points. 6. Be objective and informative.",
      prompt: `Summarize this:\n${prompt}`,
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
