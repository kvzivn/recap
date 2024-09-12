import type { Metadata } from "next"
import localFont from "next/font/local"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import Hotjar from "@/components/Hotjar"
import { ThemeProvider } from "next-themes"
import ScreenSizeIndicator from "@/components/ScreenSizeIndicator"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
})

const siteConfig = {
  name: "Recap",
  url: "https://getrecap.xyz",
  ogImage:
    "https://cloud.appwrite.io/v1/storage/buckets/66d34fc900328b55d6ae/files/66d9ae3f002ebc01e3c6/view?project=66afd4ad0003766d66f5&project=66afd4ad0003766d66f5&mode=admin",
  description:
    "Recap helps you remember more and retain what matters. Focused on simplicity and ease-of-use.",
}

export const metadata: Metadata = {
  title: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  authors: [
    {
      name: "Kevin Ivan",
      url: "https://kevinivan.com",
    },
  ],
  creator: "Kevin Ivan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@kevzivan",
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/icons/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/icons/android-chrome-512x512.png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`px-7 sm:px-0 ${geistSans.variable} ${geistMono.variable} font-sans tracking-wide bg-neutral-100 text-primary dark:bg-neutral-900 dark:text-neutral-100`}
      >
        <div className="absolute pointer-events-none inset-x-0 h-[24rem] bg-gradient-to-b from-[#afaca935] dark:from-[#edce8b25] to-transparent opacity-40" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Hotjar />
          <ScreenSizeIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
