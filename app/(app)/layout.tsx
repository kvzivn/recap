import Header from "@/components/Header"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = await getLoggedInUser()

  if (!loggedIn) redirect("/sign-in")

  return (
    <div className="grid place-items-center min-h-full max-w-[35rem] mx-auto opacity-0 animate-fadeIn">
      <div className="flex flex-col w-full min-h-[26rem] space-y-12 my-16">
        <Header loggedIn={loggedIn} />
        {children}
      </div>
    </div>
  )
}
