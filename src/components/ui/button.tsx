
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-extrabold ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-95 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-blue-400 to-blue-600 text-primary-foreground shadow-lg border-b-4 border-blue-800 hover:from-blue-500 hover:to-blue-700",
        destructive:
          "bg-gradient-to-b from-red-500 to-red-700 text-destructive-foreground shadow-lg border-b-4 border-red-900 hover:from-red-600 hover:to-red-800",
        outline:
          "border-2 border-blue-300 bg-white text-blue-500 shadow-sm hover:bg-blue-50 hover:border-blue-400",
        secondary:
          "bg-yellow-400 text-yellow-900 shadow-md border-b-4 border-yellow-600 hover:bg-yellow-500",
        ghost: "hover:bg-blue-100 hover:text-blue-700",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-full px-4",
        lg: "h-14 rounded-full px-10 text-lg",
        icon: "h-12 w-12",
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
