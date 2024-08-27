import NavBar from "../../components/NavBar"
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
    <main>
      <NavBar />
      {children}
      <footer>footer</footer>
    </main>
  )
}
