"use client"

import { useMobileMenu } from "@/lib/context/MobileMenuContext"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-sans",
})

const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-mono",
})

const Body = ({ children }: { children: React.ReactNode }) => {
  const { isMobileMenuOpen } = useMobileMenu()

  return (
    <body
      className={`px-7 sm:px-0 ${geistSans.variable} ${
        geistMono.variable
      } font-sans tracking-wide bg-neutral-100 text-primary dark:bg-neutral-900 dark:text-neutral-100 bg-[url('/stars.png')] bg-[0_0] bg-[length:1440px] ${
        isMobileMenuOpen ? "bg-none" : ""
      }`}
    >
      <div
        className={cn(
          "absolute pointer-events-none inset-x-0 h-[24rem] bg-gradient-to-b from-[#afaca935] dark:from-[#edce8b25] to-transparent transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-0" : "opacity-40"
        )}
      />
      {children}
    </body>
  )
}

export default Body
