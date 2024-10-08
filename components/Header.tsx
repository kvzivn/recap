"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { pricingCopy, landingCopy, howItWorksCopy } from "@/lib/copy"
import MobileMenu from "./MobileMenu"
import Checkout from "./Checkout"
import Logo from "./Logo"
import UserMenu from "./UserMenu"

const Header = ({ user }: { user?: User }) => {
  const [pricingVisible, setPricingVisible] = useState(false)
  const [howItWorksVisible, setHowItWorksVisible] = useState(false)
  const [content, setContent] = useState(landingCopy)
  const [isAnimating, setIsAnimating] = useState(false)

  const updateMainContent = (
    newContent: string,
    visible: boolean,
    isHowItWorks: boolean
  ) => {
    setIsAnimating(true)
    setPricingVisible(isHowItWorks ? false : visible)
    setHowItWorksVisible(isHowItWorks ? visible : false)
    setTimeout(() => {
      setContent(newContent)
      setIsAnimating(false)
    }, 350)
  }

  const showPricing = () => updateMainContent(pricingCopy, true, false)
  const resetContent = () => updateMainContent(landingCopy, false, false)
  const showHowItWorks = () => updateMainContent(howItWorksCopy, true, true)

  useEffect(() => {
    const mainElement = document.querySelector("main")
    if (mainElement) {
      const currentHeight = mainElement.offsetHeight
      mainElement.style.height = `${currentHeight}px`
      mainElement.innerHTML = content
      const newHeight = mainElement.scrollHeight
      mainElement.style.height = `${newHeight}px`
    }
  }, [content])

  return (
    <>
      <header className="relative flex items-center justify-between">
        <Logo resetContent={resetContent} className="-ml-3" />

        <div className="flex items-center gap-4 -mr-3">
          {user ? (
            <>
              <Checkout user={user} />
              <UserMenu user={user} />
            </>
          ) : (
            <div>
              <MobileMenu
                showHowItWorks={showHowItWorks}
                showPricing={showPricing}
              />
              <div className="hidden sm:flex items-center gap-4">
                <Button
                  variant="link"
                  className={cn(howItWorksVisible ? "underline" : "")}
                  onClick={showHowItWorks}
                >
                  How it works
                </Button>
                <Button
                  variant="link"
                  className={cn(pricingVisible ? "underline" : "")}
                  onClick={showPricing}
                >
                  Pricing
                </Button>
                <Button variant="link" asChild>
                  <Link href="/sign-in">Log in</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
      <style jsx global>{`
        main {
          transition: opacity 0.35s ease-in-out;
          opacity: ${isAnimating ? 0 : 1};
        }
      `}</style>
    </>
  )
}

export default Header
