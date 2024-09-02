import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { BookOpen, Clapperboard, FileText, X } from "lucide-react"
import Link from "next/link"

const ExampleEmail = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-20 pt-24 pb-32 max-w-2xl mx-auto text-sm">
      <div className="flex items-center justify-between w-full">
        <Logo className="-ml-3" />
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <X className="w-8 h-8" strokeWidth={1.75} />
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-1">
          <FileText className="w-5 h-5" />
          <Button variant="link" asChild>
            <Link
              href="https://www.nytimes.com/2023/02/17/business/china-chatgpt-microsoft-openai.html"
              target="_blank"
            >
              <h1 className="text-xl font-bold pt-0.25">
                Why China didn&apos;t invent ChatGPT
              </h1>
            </Link>
          </Button>
        </div>
        <div className="space-y-4">
          <p>
            The article explores the reasons why China did not invent a
            technology like ChatGPT. It highlights several key factors:
          </p>{" "}
          <ul>
            {" "}
            <li>
              <strong>Regulatory Environment:</strong> China&apos;s strict
              internet regulations and censorship policies stifle innovation in
              AI and natural language processing. Developers face significant
              constraints that limit their ability to create open-ended AI
              systems.
            </li>{" "}
            <li>
              <strong>Focus on Applied AI:</strong> Chinese tech companies and
              researchers often prioritize applied AI technologies that have
              immediate commercial applications, such as facial recognition and
              fintech, over more experimental AI like ChatGPT.
            </li>{" "}
            <li>
              <strong>Research and Development:</strong> While China invests
              heavily in AI, much of the funding goes towards areas with clear
              government and commercial interests. Basic research, which is
              crucial for breakthroughs like ChatGPT, receives less attention.
            </li>{" "}
            <li>
              <strong>Talent and Collaboration:</strong> The article notes that
              the most significant AI advancements often come from collaborative
              efforts across borders. China&apos;s geopolitical stance and
              restrictions on academic freedom hinder such collaborations.
            </li>{" "}
          </ul>{" "}
          <p>
            In summary, the combination of regulatory constraints, a focus on
            applied AI, targeted R&D funding, and limited international
            collaboration has prevented China from developing a technology like
            ChatGPT.
          </p>
        </div>
        <Link
          href="https://www.google.com/search?q=Why+China+didn%27t+invent+ChatGPT"
          target="_blank"
        >
          <Button variant="link" className="px-0 pt-8">
            Read more
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Clapperboard className="w-5 h-5" />
          <h1 className="text-xl font-bold pt-0.25">Citizenfour</h1>
        </div>
        <div className="space-y-4">
          <p>
            Citizenfour is a documentary directed by Laura Poitras that
            chronicles the events surrounding Edward Snowden&apos;s disclosure
            of classified NSA documents. The film provides an in-depth look at
            Snowden&apos;s motivations, the risks he took, and the impact of his
            revelations on global privacy and surveillance.
          </p>
          <p>
            The documentary begins with Poitras receiving encrypted emails from
            Snowden, who uses the alias &apos;Citizenfour.&apos; It then follows
            her journey to Hong Kong, where she meets Snowden along with
            journalists Glenn Greenwald and Ewen MacAskill. The film captures
            the tense moments as Snowden reveals the extent of the NSA&apos;s
            surveillance programs, including the collection of phone records and
            internet data from millions of people worldwide.
          </p>
          <p>
            Key themes include the ethical implications of mass surveillance,
            the role of whistleblowers in society, and the balance between
            national security and individual privacy. The documentary also
            highlights the personal sacrifices Snowden made, including leaving
            his family and living in exile.
          </p>
          <p>
            It&apos;s a compelling and thought-provoking film that raises
            important questions about government transparency and the right to
            privacy in the digital age.
          </p>
        </div>
        <Link
          href="https://www.google.com/search?q=Citizenfour"
          target="_blank"
        >
          <Button variant="link" className="px-0 pt-8">
            Read more
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5" />
          <h1 className="text-xl font-bold pt-0.25">Brave New World</h1>
        </div>
        <div className="space-y-4">
          <p>
            Brave New World is a dystopian novel by Aldous Huxley, set in a
            futuristic society where technological advancements have created a
            seemingly perfect world. The story explores themes of control,
            freedom, and the impact of technology on human relationships.
          </p>
          <p>
            The society in the novel is characterized by the use of genetic
            engineering, conditioning, and a drug called &apos;soma&apos; to
            maintain order and happiness. People are divided into castes, with
            Alphas at the top and Epsilons at the bottom, each conditioned to
            accept their roles without question.
          </p>
          <p>
            The protagonist, Bernard Marx, feels out of place in this society
            and becomes increasingly disillusioned. He befriends John, a
            &apos;savage&apos; raised outside the controlled environment, who
            challenges the norms of the World State. John&apos;s presence and
            his subsequent actions highlight the dehumanizing aspects of the
            society and ultimately lead to tragic consequences.
          </p>
          <p>
            Huxley&apos;s novel serves as a cautionary tale about the dangers of
            losing individuality and freedom in the pursuit of technological and
            societal perfection.
          </p>
        </div>
        <Link
          href="https://www.google.com/search?q=Brave+New+World"
          target="_blank"
        >
          <Button variant="link" className="px-0 pt-8">
            Read more
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ExampleEmail
