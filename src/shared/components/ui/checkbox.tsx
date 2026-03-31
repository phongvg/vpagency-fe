import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/shared/libs/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer h-5 w-5 shrink-0 rounded-none border-[3px] border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fce0a6]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[#22b14c] data-[state=checked]:text-white data-[state=checked]:border-black",
      "hover:bg-[#fce0a6] transition-all duration-150",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("grid place-content-center text-current")}
    >
      <Check className="h-4 w-4 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
