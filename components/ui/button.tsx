import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-[colors,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground dark:bg-stone-200 dark:text-stone-900 hover:shadow-[0_0_1.5rem_rgba(70,63,58,0.35)] dark:hover:shadow-[0_0_1.25rem_rgba(255,255,255,0.25)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input dark:border-stone-700 bg-neutral-50 dark:bg-stone-800 hover:bg-white hover:dark:bg-stone-700/60 hover:text-accent-foreground dark:hover:text-stone-200",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent dark:hover:bg-stone-700 hover:text-accent-foreground dark:hover:text-stone-200",
        link: "font-medium underline-offset-8 hover:underline",
      },
      size: {
        default: "h-9 px-3 text-[0.925rem]",
        sm: "h-8 px-3 text-sm",
        lg: "h-11 px-8 text-[0.95rem]",
        icon: "h-10 w-10",
        iconLink: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
