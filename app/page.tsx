import { Separator } from "@/components/ui/separator"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { landingCopy } from "@/lib/constants"

const Landing = () => {
  return (
    <div className="flex flex-col justify-start sm:justify-center h-screen max-w-[35rem] -mt-4 mx-auto space-y-12">
      <Header loggedIn={false} />

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
