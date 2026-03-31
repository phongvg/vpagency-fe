import { cn } from "@/shared/libs/utils";
import React from "react";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative shadow-lg border-[3px] border-black rounded-xl mario-border overflow-hidden bg-[#F5F5F5]", className)}
    {...props}
  />
));

Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-3 py-2 border-b-[3px] border-black bg-[#ba5825] text-white", className)} {...props} />
));

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-[7px] font-['Inter',_sans-serif] font-semibold uppercase drop-shadow-sm text-sm text-white tracking-[0.05em]", className)} {...props}>
    {props.children}
  </div>
));

CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 text-[14px] leading-relaxed text-black font-['Inter',_sans-serif]", className)} {...props} />
));

CardContent.displayName = "CardContent";

export { Card, CardContent, CardHeader, CardTitle };
