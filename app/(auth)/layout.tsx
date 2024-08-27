export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="w-64 mx-auto">{children}</div>
    </section>
  )
}
