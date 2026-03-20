import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/libs/utils";

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:size-4 font-bold uppercase whitespace-nowrap transition-transform active:translate-y-[2px] active:shadow-[0_0px_0_rgba(0,0,0,1)] [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg]:shrink-0 drop-shadow-[0_4px_0_rgba(0,0,0,0.8)]",
  {
    variants: {
      variant: {
        default: "mario-border bg-[#22b14c] text-white hover:brightness-110",
        destructive: "mario-border bg-[#e52521] text-white hover:brightness-110",
        outline: "mario-border bg-white text-black hover:bg-[#fce0a6] hover:text-[#e52521]",
        secondary: "mario-border bg-[#fce0a6] text-[#e52521] hover:brightness-110",
        ghost: "hover:bg-[#437de3] hover:text-white rounded-none active:translate-y-0 active:shadow-none drop-shadow-none",
        link: "text-[#fce0a6] underline-offset-4 hover:underline drop-shadow-none active:translate-y-0 active:shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2 text-xs",
        sm: "h-8 px-3 text-[10px]",
        lg: "h-10 px-8 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
