import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { Button, buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/libs/utils";

import { vi } from "date-fns/locale";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      locale={vi}
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar mario-border bg-[#5c94fc] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] p-4 [--cell-size:2rem] font-['Inter',_sans-serif]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex md:flex-row flex-col gap-4", defaultClassNames.months),
        month: cn("flex flex-col gap-4 w-full", defaultClassNames.month),
        nav: cn("top-0 absolute inset-x-0 flex justify-between items-center gap-1 w-full", defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn("flex justify-center items-center px-[--cell-size] w-full h-[--cell-size]", defaultClassNames.month_caption),
        dropdowns: cn("flex justify-center items-center gap-1.5 w-full h-[--cell-size] font-bold text-[14px]", defaultClassNames.dropdowns),
        dropdown_root: cn(
          "relative border-[3px] border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] has-focus:bg-[#fce0a6] rounded-none",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute inset-0 bg-popover opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "font-bold uppercase select-none drop-shadow-md",
          captionLayout === "label"
            ? "text-xs"
            : "[&>svg]:text-white flex h-8 items-center gap-1 rounded-none pl-2 pr-1 text-[10px] [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn("flex-1 rounded-none font-semibold text-[11px] text-[#fce0a6] select-none uppercase drop-shadow-sm", defaultClassNames.weekday),
        week: cn("flex mt-2 w-full", defaultClassNames.week),
        week_number_header: cn("w-[--cell-size] select-none", defaultClassNames.week_number_header),
        week_number: cn("text-[0.8rem] text-muted-foreground select-none", defaultClassNames.week_number),
        day: cn("group/day relative p-0 w-full h-full aspect-square text-center select-none", defaultClassNames.day),
        range_start: cn("bg-[#f83800] rounded-none", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-[#f83800] rounded-none", defaultClassNames.range_end),
        today: cn("bg-white rounded-none data-[selected=true]:rounded-none text-black font-bold data-[selected=true]:text-white", defaultClassNames.today),
        outside: cn("text-white/50 aria-selected:text-white/50", defaultClassNames.outside),
        disabled: cn("opacity-50 text-white/50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot='calendar' ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("size-4 drop-shadow-md", className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={cn("size-4 drop-shadow-md", className)} {...props} />;
          }

          return <ChevronDownIcon className={cn("size-4 drop-shadow-md", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className='flex justify-center items-center size-[--cell-size] text-center font-bold'>{children}</div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant='ghost'
      size='icon'
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:relative flex flex-col gap-1 data-[range-end=true]:bg-primary data-[range-middle=true]:bg-accent data-[range-start=true]:bg-primary data-[selected-single=true]:bg-primary [&>span]:opacity-70 group-data-[focused=true]/day:border-ring data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 w-full min-w-[--cell-size] h-auto aspect-square font-normal data-[range-end=true]:text-primary-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground [&>span]:text-xs leading-none data-[range-middle=true]:text-accent-foreground",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
