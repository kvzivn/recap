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
        <div className="flex items-center gap-3">
          <Clapperboard className="w-5 h-5" />
          <h1 className="text-lg sm:text-xl font-bold pt-0.25">
            Jennifer Doudna on CRISPR ethics
          </h1>
        </div>
        <div className="space-y-4">
          <p>
            Jennifer Doudna, a pioneering scientist in the field of CRISPR gene
            editing, has significantly contributed to both scientific
            advancements and the ethical discourse surrounding genome editing.
            Her work with the CRISPR-Cas9 tool has the potential to cure
            diseases and fundamentally alter the human race.
          </p>
          <p>
            In addition to her scientific achievements, Doudna is a prominent
            voice in the public discussion about the ethical implications of
            genome editing. She emphasizes the relatively low barrier to entry
            for CRISPR-Cas9 experimentation, which raises concerns about its
            misuse and the need for stringent ethical guidelines.
          </p>
          <ul>
            <li>Potential to cure diseases and change human biology</li>
            <li>Low barrier to entry for CRISPR-Cas9 experimentation</li>
            <li>Importance of public discussion and ethical guidelines</li>
            <li>Concerns about misuse and long-term implications</li>
          </ul>
          <p>
            Doudna advocates for responsible use of gene-editing technologies,
            highlighting the necessity for global cooperation and regulation to
            ensure ethical standards are maintained.
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
          <FileText className="w-5 h-5" />
          <h1 className="text-lg sm:text-xl font-bold pt-0.25">
            How to exit Vim
          </h1>
        </div>
        <div className="space-y-4">
          <p>
            Exiting Vim, a popular text editor, can be challenging for new
            users. Here are some straightforward methods to exit Vim:
          </p>
          <ul>
            <li>
              Press the <strong>Escape</strong> key to ensure you are in command
              mode.
            </li>
            <li>
              Type <strong>:</strong> to enter command mode, then type{" "}
              <strong>q</strong> and press <strong>Enter</strong> to quit.
            </li>
            <li>
              If you want to save your changes before quitting, type{" "}
              <strong>:wq</strong> and press <strong>Enter</strong>.
            </li>
            <li>
              Alternatively, you can press <strong>Shift + ZZ</strong> to save
              and exit.
            </li>
          </ul>
          <p>
            For more advanced Vim tips, follow experts like hakluke and
            tomnomnom on Twitter.
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
          <BookOpen className="w-5 h-5" />
          <h1 className="text-lg sm:text-xl font-bold pt-0.25">
            Brave New World
          </h1>
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
