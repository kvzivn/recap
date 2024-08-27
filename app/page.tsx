import { Separator } from "@/components/ui/separator"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const Landing = () => {
  return (
    <div className="flex flex-col justify-start sm:justify-center h-screen max-w-[35rem] mt-24 sm:-mt-12 mx-auto space-y-12">
      <Header />

      <main className="flex flex-col justify-center space-y-6 text-neutral-600 leading-loose">
        <p>remember more and retain what matters.</p>
        <p>
          transform books, articles or podcasts into lasting wisdom through the
          power of spaced repetition. reminders are sent to your inbox or phone.
        </p>
        <p>focused on simplicity and ease-of-use.</p>
      </main>

      <Separator />

      <Footer />
    </div>
  )
}

export default Landing
