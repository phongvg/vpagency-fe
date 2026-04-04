import * as React from "react";

import { cn } from "@/shared/libs/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex bg-transparent disabled:opacity-50 px-3 py-2 border border-border outline-none w-full min-h-[60px] disabled:cursor-not-allowed",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
