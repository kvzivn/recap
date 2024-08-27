import ReminderForm from "@/components/ReminderForm"
import ReminderList from "@/components/ReminderList"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 -mt-16 max-w-md min-h-screen mx-auto">
      <h2 className="mb-4 text-xl text-slate-700">
        What would you like to remember more?
      </h2>

      <ReminderForm />
      <ReminderList />
    </div>
  )
}

export default Home
