import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex items-center justify-between pt-3">
      <Button className="pl-4" asChild>
        <Link href="/sign-up">
          Sign up now <ArrowRight className="h-4 w-4 ml-1.5" />
        </Link>
      </Button>
      <Button variant="link" asChild className="-ml-3">
        <Link href="https://kevinivan.com" target="_blank">
          Made with ♡
        </Link>
      </Button>
    </footer>
  )
}

export default Footer
