import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 sm:h-10 w-full rounded-md border border-input dark:border-neutral-700/60 bg-neutral-50 dark:bg-neutral-800/40 px-4 py-2 sm:px-3 text-[16px] sm:text-sm ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground group-hover:enabled:bg-white hover:enabled:bg-white focus-visible:bg-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:group-hover:enabled:bg-neutral-900 dark:hover:enabled:bg-neutral-800/80 dark:focus-visible:bg-neutral-800",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
