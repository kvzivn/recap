import type { Metadata } from "next"
import localFont from "next/font/local"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import Hotjar from "@/components/Hotjar"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Recap",
  description: "Remember more.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`px-7 sm:px-0 ${geistSans.variable} ${geistMono.variable} font-sans tracking-wide bg-stone-100 text-primary`}
      >
        {children}
        <Toaster />
        <Hotjar />
      </body>
    </html>
  )
}
