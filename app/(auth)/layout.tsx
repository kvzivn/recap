import { getLoggedInUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = await getLoggedInUser()

  if (loggedIn) redirect("/home")

  return (
    <section className="-mt-16 sm:mt-0 w-full h-screen flex justify-center items-center">
      <div className="w-[21.5rem] sm:w-64 mx-auto">{children}</div>
    </section>
  )
}
