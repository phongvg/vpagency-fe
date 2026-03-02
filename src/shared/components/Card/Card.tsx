import { cn } from "@/shared/libs/utils";
import React from "react";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative shadow border border-[rgba(103,206,255,0.25)] bg-[rgba(30,45,55,0.60)] backdrop-blur-lg", className)} {...props} />
));

Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-2 py-1 border-b border-[rgba(103,206,255,0.15)]", className)} {...props} />
));

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-[7px] font-semibold uppercase", className)} {...props}>
    {props.children}
    <div className='flex-1 hud-line' />
  </div>
));

CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 uppercase", className)} {...props} />
));

CardContent.displayName = "CardContent";

export { Card, CardContent, CardHeader, CardTitle };
