"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Logo from "@/public/logo.svg"
import { useState } from "react"
import { cn } from "@/lib/utils"

const Header = () => {
  const [pricingVisible, setPricingVisible] = useState(false)

  const showPricing = () => {
    setPricingVisible(true)
    const mainElement = document.querySelector("main")
    if (mainElement) {
      const originalHeight = mainElement.offsetHeight
      mainElement.innerHTML =
        "<p>free: 3 reminders per month.</p><p>basic: 10 reminders for $2.99/month.</p><p>genius: 25 reminders for $4.99/month.</p>"
      mainElement.style.height = `${originalHeight}px`
    }
  }

  const hidePricing = () => {
    setPricingVisible(false)
    const mainElement = document.querySelector("main")
    if (mainElement) {
      mainElement.innerHTML =
        "<p>remember more and retain what matters.</p><p>transform books, articles or podcasts into lasting wisdom through the power of spaced repetition. reminders are sent to your inbox or phone.</p><p>focused on simplicity and ease-of-use.</p>"
    }
  }

  return (
    <header className="flex items-center justify-between">
      <Button variant="link" onClick={hidePricing} className="-ml-3">
        <Image priority alt="logo" src={Logo} className="h-7 w-7" />
      </Button>
      <div className="flex items-center gap-12 sm:gap-8 -mr-3">
        <Button
          variant="link"
          className={cn(pricingVisible ? "underline" : "")}
          onClick={showPricing}
        >
          pricing
        </Button>
        <Button variant="link" asChild>
          <Link href="/sign-in">log in</Link>
        </Button>
      </div>
    </header>
  )
}

export default Header
