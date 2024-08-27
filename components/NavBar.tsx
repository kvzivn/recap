"use client"

import { Button } from "@/components/ui/button"
import { logoutAccount } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation"

export default function NavBar() {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAccount()
    router.push("/")
  }

  return (
    <nav className="flex justify-between items-center p-4">
      <div>Recap</div>
      <Button onClick={handleLogout}>Log out</Button>
    </nav>
  )
}
