import { Models } from "node-appwrite"

export interface Reminder extends Models.Document {
  prompt: string
  summary: string
}
