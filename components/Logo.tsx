"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import LogoSvg from "@/public/logo.svg"
import { useRouter, usePathname } from "next/navigation"

const Logo = ({
  resetContent,
  showMobileMenu,
  setShowMobileMenu,
  className,
}: {
  resetContent?: () => void
  className?: string
  showMobileMenu?: boolean
  setShowMobileMenu?: (showMobileMenu: boolean) => void
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isSpinning, setIsSpinning] = useState(false)
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const triggerSpin = () => {
    if (showMobileMenu && setShowMobileMenu) {
      setShowMobileMenu(!showMobileMenu)
    }
    if (!isSpinning) {
      setIsSpinning(true)
      spinTimeoutRef.current = setTimeout(() => {
        setIsSpinning(false)
      }, 1500)
    }
  }

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current)
      }
    }
  }, [])

  return (
    <Button
      variant="link"
      onClick={() => {
        resetContent
          ? resetContent()
          : router.push(
              pathname === "/" ||
                pathname === "/sign-in" ||
                pathname === "/sign-up"
                ? "/"
                : "/home"
            )
        triggerSpin()
      }}
      onMouseEnter={triggerSpin}
      className={className}
    >
      <Image
        priority
        alt="logo"
        src={LogoSvg}
        className={`h-7 w-7 ${
          isSpinning ? "animate-[spin_1.5s_ease-in-out]" : "animate-slow-spin"
        }`}
      />
    </Button>
  )
}

export default Logo
