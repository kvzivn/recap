import { Reminder } from "../types/appwrite.types"

export function generateRecapEmail(reminders: Reminder[]) {
  return `
    <html>
      <body style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 100px 20px 60px; color: #463f3a;">
        <img src="https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66e84e320024dc6e2d5c/view?project=66afd4ad0003766d66f5&project=66afd4ad0003766d66f5&mode=admin" alt="Recap" style="width: 50px; height: 50px; max-width: 100%; margin-bottom: 60px;">
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
                    <td style="vertical-align: middle; padding-bottom: 4px;">
                      <h2 style="color: #141414; font-size: 16px; margin: 0;">
                        <span style="font-size: 18px; margin-right: 6px;">${iconSrc}</span>
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
        <hr style="border: none; border-top: 1px solid #ddd; margin: 50px 0">
        <div style="text-align: center; padding-bottom: 80px;">
          <div style="background-color: #f5f5f5; border-radius: 16px; margin-bottom: 40px; padding: 24px;">
            <div>
              <img src="https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66e84e320024dc6e2d5c/view?project=66afd4ad0003766d66f5&mode=admin" alt="Recap" style="max-width: 100%; width: 50px; height: 50px;" />
              <p style="font-family: Inter, sans-serif; font-size: 14px; line-height: 1.5; padding-left: 24px; padding-right: 24px;">
                Built with <img data-emoji="❤️" style="height: 1.2em; width: 1.2em; vertical-align: middle;" alt="❤️" aria-label="❤️" draggable="false" src="https://fonts.gstatic.com/s/e/notoemoji/15.1/2764_fe0f/72.png" loading="lazy" /> by <a style="color: #414141; font-weight: 600; text-decoration: underline;" href="https://kevinivan.com" target="_blank">Kevin Ivan</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}
