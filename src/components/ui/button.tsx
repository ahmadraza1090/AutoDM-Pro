import * as React from "react"
import { cn } from "@/src/lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'soft', size?: 'default' | 'sm' | 'lg' | 'icon' }>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow shadow-indigo-600/20": variant === "default",
            "border border-gray-200/80 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900": variant === "outline",
            "bg-indigo-50 text-indigo-600 hover:bg-indigo-100": variant === "soft",
            "hover:bg-gray-100 hover:text-gray-900": variant === "ghost",
            "h-9 px-4 py-2": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-10 rounded-md px-8": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
