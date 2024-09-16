import { Reminder } from "../types/appwrite.types"

export function generateRecapEmail(reminders: Reminder[]) {
  return `
    <html>
      <body style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 100px 20px 60px; color: #463f3a;">
        <img src="https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66e84e320024dc6e2d5c/view?project=66afd4ad0003766d66f5&project=66afd4ad0003766d66f5&mode=admin" alt="Logo" style="width: 30px; height: 30px; max-width: 100%; margin-bottom: 60px;">
        ${reminders
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
                  return "📖"
                case "article":
                  return "📝"
                case "video":
                  return "🎬"
                case "audio":
                  return "🎧"
                case "error":
                  return "⚠️"
                default:
                  return "💡"
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
                    <td style="vertical-align: middle; padding-left: 10px; padding-bottom: 4px;">
                      <h2 style="font-size: 18px; margin: 0;">
                        <span style="font-size: 20px; margin-right: 6px;">${iconSrc}</span>
                      ${reminder.prompt}
                      </h2>
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 10px; line-height: 1.6;">
                  ${formattedSummary}
                </div>
                <p style="margin-top: 10px;">
                  <a href="https://www.google.com/search?q=${encodeURIComponent(
                    reminder.prompt
                  )}" target="_blank" style="color: #463f3a;"><strong>Read more</strong></a>
                </p>
              </div>
            `
          })
          .join("")}
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0 50px;">
        <p style="font-size: 14px; color: #666; text-align: center;">
          We hope you enjoyed this week&apos;s knowledge recap. Keep learning and stay curious.
        </p>
      </body>
    </html>
  `
}
