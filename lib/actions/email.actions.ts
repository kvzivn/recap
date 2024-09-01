"use server"

import { ID, Query } from "node-appwrite"
import {
  REMINDER_COLLECTION_ID,
  USER_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config"

export async function fetchUserIdsWithOldReminders() {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  try {
    const reminders = await databases.listDocuments(
      DATABASE_ID!,
      REMINDER_COLLECTION_ID!,
      [Query.lessThan("createdAt", sevenDaysAgo.toISOString())]
    )

    const userIds = Array.from(
      new Set(reminders.documents.map((reminder) => reminder.userId))
    )

    return userIds
  } catch (error) {
    console.error("Error fetching user IDs with old reminders:", error)
    throw error
  }
}

export async function scheduleEmail(userId: string) {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const reminders = await databases.listDocuments(
    DATABASE_ID!,
    REMINDER_COLLECTION_ID!,
    [
      Query.equal("userId", userId),
      Query.lessThan("createdAt", sevenDaysAgo.toISOString()),
      Query.orderAsc("createdAt"),
      Query.limit(3),
    ]
  )

  const user = await databases.listDocuments(
    DATABASE_ID!,
    USER_COLLECTION_ID!,
    [Query.equal("userId", [userId])]
  )

  const accountId = user.documents[0].$id

  if (reminders.documents.length === 0) {
    console.log("No reminders to send for user:", userId)
    return
  }

  const emailHTML = `
			<html>
				<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #463f3a;">
					<img src="https://your-server.com/images/logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; max-width: 200px;">

					${reminders.documents
            .map((reminder) => {
              const { summary, category } = JSON.parse(reminder.summary)
              const iconSrc = (() => {
                switch (category) {
                  case "book":
                    return "https://your-server.com/images/book-icon.png"
                  case "article":
                    return "https://your-server.com/images/file-text-icon.png"
                  case "video":
                    return "https://your-server.com/images/clapperboard-icon.png"
                  case "audio":
                    return "https://your-server.com/images/mic-icon.png"
                  case "error":
                    return "https://your-server.com/images/triangle-alert-icon.png"
                  default:
                    return "https://your-server.com/images/lightbulb-icon.png"
                }
              })()

              const formattedSummary = summary.replace(
                /<p>/g,
                '<p style="margin-bottom: 16px;">'
              )

              return `
							<div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
								<table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
									<tr>
										<td style="vertical-align: middle; width: 24px;">
											<img src="${iconSrc}" alt="${category} icon" style="width: 24px; height: 24px;">
										</td>
										<td style="vertical-align: middle; padding-left: 10px;">
											<h2 style="font-size: 20px; margin: 0;">${reminder.prompt}</h2>
										</td>
									</tr>
								</table>
								<div style="margin-top: 10px; line-height: 1.6;">
									${formattedSummary}
								</div>
								<p style="font-style: italic; margin-top: 10px;">Category: ${category}</p>
							</div>
						`
            })
            .join("")}

					<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

					<p style="font-size: 14px; color: #666; text-align: center;">
						This is your weekly knowledge recap. Keep learning and stay curious!
					</p>
				</body>
			</html>
		`

  try {
    await messaging.createEmail(
      ID.unique(),
      "Your Weekly Recap",
      emailHTML, // html goes here
      [], // topics (optional)
      [accountId], // users (optional)
      [], // targets (optional)
      [], // cc (optional)
      [], // bcc (optional)
      [], // attachments (optional)
      false, // draft (optional)
      true // html (optional)
    )

    console.log("Email sent successfully")

    // Update the reminders' last sent date in Appwrite
    // await updateReminderLastSentDate(reminders.documents)
  } catch (error) {
    console.error("Error sending email:", error)
  }
}

export async function sendEmail(userId: string) {
  const reminders = await databases.listDocuments(
    DATABASE_ID!,
    REMINDER_COLLECTION_ID!,
    [Query.equal("userId", userId)]
  )

  if (reminders.documents.length === 0) {
    console.log("No reminders to send for user:", userId)
    return
  }

  const emailHTML = `
			<html>
				<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 100px 20px 60px; color: #463f3a;">
					<img src="https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66d46933001424afed1d/view?project=66afd4ad0003766d66f5" alt="Logo" style="width: 30px; height: 30px; max-width: 100%; margin-bottom: 60px;">

					${reminders.documents
            .map((reminder) => {
              let summary = "Couldn't create a summary of this reminder."
              let category = "error"
              try {
                const parsedSummary = JSON.parse(reminder.summary)
                summary = parsedSummary.summary
                category = parsedSummary.category
              } catch (error) {
                console.error("Error parsing reminder summary:", error)
              }
              const iconSrc = (() => {
                switch (category) {
                  case "book":
                    return "https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66d46968000280bbfe1b/view?project=66afd4ad0003766d66f5"
                  case "article":
                    return "https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66d4696d001576444b7b/view?project=66afd4ad0003766d66f5"
                  case "video":
                    return "https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66d469610013c0d264ee/view?project=66afd4ad0003766d66f5"
                  case "audio":
                    return "https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66d4695a003470cd6a5f/view?project=66afd4ad0003766d66f5"
                  case "error":
                    return "https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66d469540007ebab0dda/view?project=66afd4ad0003766d66f5"
                  default:
                    return "https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66d4694c0004e3d9d0d3/view?project=66afd4ad0003766d66f5"
                }
              })()

              const formattedSummary = summary.replace(
                /<p>/g,
                '<p style="margin-bottom: 15px;">'
              )

              return `
							<div style="padding: 15px 0; margin-bottom: 20px;">
								<table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
									<tr>
										<td style="vertical-align: middle; width: 24px;">
											<img src="${iconSrc}" alt="${category} icon" style="width: 24px; height: 24px;">
										</td>
										<td style="vertical-align: middle; padding-left: 10px; padding-bottom: 4px;">
											<h2 style="font-size: 20px; margin: 0;">${reminder.prompt}</h2>
										</td>
									</tr>
								</table>
								<div style="margin-top: 10px; line-height: 1.6;">
									${formattedSummary}
								</div>
								<p style="margin-top: 10px;">
								  <a href="https://www.google.com/search?q=${encodeURIComponent(
                    reminder.prompt
                  )}" target="_blank" style="color: #463f3a; text-decoration: none;"><strong>Read more</strong></a>
								</p>
							</div>
						`
            })
            .join("")}

					<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

					<p style="font-size: 14px; color: #666; text-align: center;">
						We hope you enjoyed your weekly knowledge recap. Keep learning and stay curious.
					</p>
				</body>
			</html>
		`

  try {
    await messaging.createEmail(
      ID.unique(),
      "Your Weekly Recap",
      emailHTML, // html goes here
      [], // topics (optional)
      [userId], // users (optional)
      [], // targets (optional)
      [], // cc (optional)
      [], // bcc (optional)
      [], // attachments (optional)
      false, // draft (optional)
      true // html (optional)
    )
  } catch (error) {
    console.error("Error sending email:", error)
  }
}
