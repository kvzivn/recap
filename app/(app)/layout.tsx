import Header from "@/components/Header"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getLoggedInUser()

  if (!user) redirect("/sign-in")

  return (
    <div className="grid place-items-center min-h-full max-w-[35rem] mx-auto opacity-0 animate-fadeIn">
      <div className="flex flex-col w-full min-h-[26rem] space-y-12 my-16">
        <Header user={user} />
        {children}
      </div>
    </div>
  )
}
