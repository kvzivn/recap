"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { landingCopy } from "@/lib/copy"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { cn } from "@/lib/utils"

const Landing = () => {
  const router = useRouter()
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const loggedIn = await getLoggedInUser()
      if (loggedIn) {
        router.push("/home")
      } else {
        setShowPage(true)
      }
    }

    checkSession()
  }, [router])

  return (
    <div
      className={cn(
        "flex flex-col justify-center h-screen max-w-[35rem] -mt-4 mx-auto space-y-12 opacity-0",
        showPage && "animate-fadeIn"
      )}
    >
      <Header />

      <main
        className="flex flex-col justify-center space-y-6 text-neutral-600 leading-loose"
        dangerouslySetInnerHTML={{ __html: landingCopy }}
      />

      <Separator className="-mt-2" />

      <Footer />
    </div>
  )
}

export default Landing
