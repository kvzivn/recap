import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex items-center justify-between pt-3">
      <Button variant="link" asChild className="-ml-3">
        <Link href="https://kevinivan.com" target="_blank">
          made with ♡
        </Link>
      </Button>
      <Button className="pl-4">
        sign up now <ArrowRight className="h-4 w-4 ml-1.5" />
      </Button>
    </footer>
  )
}

export default Footer
