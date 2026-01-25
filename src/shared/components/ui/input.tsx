import * as React from "react";

import { cn } from "@/shared/libs/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn("block w-full p-[10px] font-semibold appearance-none bg-transparent border-border border outline-none", className)}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
