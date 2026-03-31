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
          "block bg-white disabled:opacity-50 h-9 px-3 py-0 border-[3px] border-black rounded-none outline-none w-full font-['Inter',_sans-serif] text-[14px] tracking-[0.05em] placeholder:text-black/40 placeholder:italic placeholder:font-normal appearance-none disabled:cursor-not-allowed text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all",
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
