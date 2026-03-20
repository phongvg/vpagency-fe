import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/shared/libs/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex items-end gap-2 pt-1 pr-1 pb-1",
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        // Base: Stone Block / Brick look
        "inline-flex justify-center items-center px-4 py-2 font-roboto text-[12px] uppercase whitespace-nowrap",
        "border-[3px] border-black rounded-none",
        "bg-[#c84c0c] text-white/80",
        "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]",
        "transition-all duration-150 cursor-pointer",
        "disabled:opacity-50 disabled:pointer-events-none",
        // Hover: Mario Jump bounce
        "hover:-translate-y-1 hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,0.8)] hover:brightness-110",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fce0a6] focus-visible:ring-offset-1",
        // Active State: Warp Pipe Green, pressed down
        "data-[state=active]:bg-[#22b14c] data-[state=active]:text-white",
        "data-[state=active]:translate-y-[2px] data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]",
        "data-[state=active]:border-[3px] data-[state=active]:border-black",
        // Inset shadow for the active "pipe" sheen
        "data-[state=active]:[box-shadow:inset_3px_3px_0px_0px_rgba(255,255,255,0.5),inset_-3px_-3px_0px_0px_rgba(0,0,0,0.3),2px_2px_0px_0px_rgba(0,0,0,0.8)]",
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fce0a6] focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };

