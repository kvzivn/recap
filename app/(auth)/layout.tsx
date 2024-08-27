export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="-mt-16 sm:mt-0 w-full h-screen flex justify-center items-center">
      <div className="w-72 sm:w-64 mx-auto">{children}</div>
    </section>
  )
}
