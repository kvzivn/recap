import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import {
  Laptop,
  Lightbulb,
  MessageCircle,
  MessagesSquare,
  X,
} from "lucide-react"
import Link from "next/link"

const ExampleEmail = () => {
  return (
    <div className="flex flex-col gap-20 pt-24 pb-32 max-w-2xl mx-auto text-sm">
      <div className="flex items-center justify-between w-full">
        <Logo className="-ml-3" />
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <X className="w-8 h-8" strokeWidth={1.75} />
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <MessagesSquare className="w-5 h-5" />
          <h1 className="text-lg sm:text-xl font-bold pt-0.25">
            Benefits of Immigration
          </h1>
        </div>
        <div className="space-y-4">
          <p>
            Immigration offers numerous benefits, significantly impacting the
            economy and society.
          </p>
          <ul>
            <li>
              <strong>Economic growth:</strong> Immigrants entering the labor
              force increase the productive capacity of the economy, leading to
              a rise in GDP. Their participation in the workforce boosts overall
              economic activity.
            </li>
            <li>
              <strong>Cultural diversity:</strong> Immigration fosters cultural
              exchange, enriching societies with new perspectives, traditions,
              and ideas.
            </li>
            <li>
              <strong>Knowledge transfer:</strong> Migrants facilitate the
              exchange of skills, technologies, and best practices between
              countries.
            </li>
            <li>
              <strong>Addressing labor shortages:</strong> Migrants can fill
              gaps in the workforce, particularly in aging populations or
              sectors with skill shortages.
            </li>
          </ul>
        </div>
        <Link
          href="https://www.google.com/search?q=benefits+of+immigration"
          target="_blank"
        >
          <Button variant="link" className="px-0 pt-8">
            Read more
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Laptop className="w-5 h-5" />
          <h1 className="text-lg sm:text-xl font-bold pt-0.25">
            How to exit Vim
          </h1>
        </div>
        <div className="space-y-4">
          <p>Here are some straightforward methods to exit Vim:</p>
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
        </div>
        <Link
          href="https://www.google.com/search?q=how+to+exit+vim"
          target="_blank"
        >
          <Button variant="link" className="px-0 pt-8">
            Read more
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-5 h-5" />
          <h1 className="text-lg sm:text-xl font-bold pt-0.25">
            The components of Ikigai
          </h1>
        </div>
        <div className="space-y-4">
          <p>
            Ikigai is a Japanese concept that means &apos;a reason for
            being.&apos; It is the intersection of four fundamental elements
            that contribute to a fulfilling and meaningful life. These elements
            are:
          </p>
          <ul>
            <li>
              <strong>What you love:</strong> This represents your passions and
              interests, the activities that bring you joy and satisfaction.
            </li>
            <li>
              <strong>What you are good at:</strong> This encompasses your
              skills and talents, the things you excel at and can perform well.
            </li>
            <li>
              <strong>What you can get paid for:</strong> This involves your
              profession or vocation, the work that provides financial
              compensation and sustains your livelihood.
            </li>
            <li>
              <strong>What the world needs:</strong> This reflects the problems
              or needs in society that you can address, contributing to the
              greater good and making a positive impact.
            </li>
          </ul>
          <p>
            The convergence of these four elements forms the essence of ikigai,
            guiding individuals towards a balanced and purposeful life.
          </p>
        </div>
        <Link href="https://www.google.com/search?q=ikigai" target="_blank">
          <Button variant="link" className="px-0 pt-8">
            Read more
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ExampleEmail
