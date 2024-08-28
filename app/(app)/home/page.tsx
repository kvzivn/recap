import ReminderInput from "@/components/ReminderInput"
import ReminderList from "@/components/ReminderList"
import { getReminders } from "@/lib/actions/reminder.actions"
import { Reminder } from "@/lib/types/appwrite.types"

const Home = async () => {
  const reminders = (await getReminders()) as Reminder[]

  // const reminders = [
  //   {
  //     $id: "1",
  //     prompt: "lex fridman and perplexity ceo",
  //     summary:
  //       "<p>This interview features Lex Fridman and Aravind Srinivas, the CEO of Perplexity, an AI-powered search engine. They delve into the revolutionary potential of AI in transforming how we access and process information.</p><p>Key points discussed include:</p><ul><li>The limitations of traditional search engines and how AI can overcome them</li><li>Perplexity's approach to combining search and language models for more intuitive results</li><li>The ethical considerations of AI in information retrieval and distribution</li><li>The future of human-AI interaction in daily information seeking</li><li>The potential impact of advanced AI on education, research, and decision-making processes</li></ul><p>The conversation provides insights into the cutting-edge developments in AI-driven search technology and its implications for the future of knowledge access and information processing.</p>",
  //     category: "audio",
  //   },
  //   {
  //     $id: "2",
  //     prompt: "waking up by sam harris",
  //     summary:
  //       "<p>'Waking Up' by Sam Harris is a profound exploration of meditation and consciousness, bridging the gap between scientific skepticism and spiritual insight. Harris, a neuroscientist and philosopher, offers a rational approach to understanding the nature of the mind and the benefits of mindfulness practices.</p><p>The book is structured into three main parts:</p><ul><li>An examination of the illusion of the self from both scientific and contemplative perspectives</li><li>Practical guidance on meditation techniques and mindfulness exercises</li><li>Reflections on the nature of consciousness and its implications for our understanding of reality</li></ul><p>Harris challenges readers to question their assumptions about the nature of experience and provides tools for cultivating greater awareness in daily life. He argues that the benefits of meditation extend beyond stress reduction, potentially leading to profound insights about the nature of consciousness itself.</p><p>Throughout the book, Harris weaves personal anecdotes with scientific research and philosophical arguments, creating a compelling case for the importance of meditation in the modern world. 'Waking Up' serves as both an introduction to meditation for skeptics and a deeper exploration of consciousness for experienced practitioners.</p>",
  //     category: "book",
  //   },
  //   {
  //     $id: "3",
  //     prompt: "why china didn't invent chatgpt",
  //     summary:
  //       "<p>This article analyzes the factors contributing to the development of ChatGPT in the West rather than in China, despite China's significant investments in AI technology. The piece explores several key areas that influenced this outcome:</p><ul><li>Research Focus: Western AI research emphasized large language models and generative AI, while China focused more on computer vision and speech recognition.</li><li>Data Availability: The abundance of English language data on the internet provided a rich training ground for models like ChatGPT, whereas Chinese language data was more limited and controlled.</li><li>Regulatory Environment: Less restrictive data privacy laws in the US allowed for more extensive data collection and use in AI training.</li><li>Corporate Culture: The competitive and open nature of Western tech companies fostered rapid innovation, contrasting with more hierarchical structures in Chinese firms.</li><li>Global Collaboration: Western researchers benefited from international collaboration and open-source contributions, while Chinese AI development was more insular.</li><li>Computing Power: Access to advanced chip technology gave Western companies an edge in training large AI models.</li></ul><p>The article concludes by discussing the implications of this AI development gap for global technological competition and the potential for future advancements in both regions. It highlights the complex interplay of technological, cultural, and political factors in shaping the landscape of AI innovation.</p>",
  //     category: "article",
  //   },
  // ]

  return (
    <div>
      <ReminderInput reminders={reminders} />
      <ReminderList reminders={reminders} />
    </div>
  )
}

export default Home
