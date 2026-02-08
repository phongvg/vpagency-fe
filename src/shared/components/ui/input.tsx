import * as React from "react";

import { cn } from "@/shared/libs/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "block bg-transparent disabled:opacity-50 p-[10px] border border-border outline-none w-full font-semibold placeholder:text-white/50 appearance-none disabled:cursor-not-allowed",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
