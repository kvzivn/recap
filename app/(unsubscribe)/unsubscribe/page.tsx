import { UnsubscribeButton } from "@/components/UnsubscribeButton"

async function Unsubscribe({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId

  if (!userId) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        Error: User ID not provided
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <p className="text-lg font-semibold">
        Use the button below to unsubscribe.
      </p>
      <p className="max-w-sm mt-2 text-muted-foreground">
        If you have any feedback or suggestions, please email me at{" "}
        <a href="mailto:hello@kevinivan.com" className="underline">
          hello@kevinivan.com
        </a>
      </p>
      <div className="mt-8">
        <UnsubscribeButton userId={userId} />
      </div>
    </div>
  )
}

export default Unsubscribe
