import * as React from "react";

import { cn } from "@/shared/libs/utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon, ...props }, ref) => {
  return (
    <div className='relative'>
      {icon && <div className='top-1/2 left-3 absolute -translate-y-1/2 transform'>{icon}</div>}
      <input
        type={type}
        className={cn(
          "block bg-transparent disabled:opacity-50 p-[10px] border border-border outline-none w-full font-semibold placeholder:text-white/50 appearance-none disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
