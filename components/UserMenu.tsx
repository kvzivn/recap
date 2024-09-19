"use client"

import { useRouter } from "next/navigation"
import { LogOut, Ellipsis, KeyRound } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { logoutAccount } from "@/lib/actions/user.actions"
import { toast } from "sonner"

const UserMenu = ({ user }: { user: User }) => {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAccount()
    router.push("/")
  }

  const handleCopyToken = () => {
    try {
      navigator.clipboard.writeText(user.raycastKey)
      toast.success("Copied Raycast token to clipboard")
    } catch (error) {
      console.error("Failed to copy token to clipboard", error)
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleCopyToken}>
            <KeyRound className="mr-2 h-4 w-4" />
            <span>Copy Raycast token</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
