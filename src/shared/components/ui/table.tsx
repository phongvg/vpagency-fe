import * as React from "react";

import { cn } from "@/shared/libs/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <table ref={ref} className={cn("min-w-full text-sm table-auto caption-bottom", className)} {...props} />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b-[2px] [&_tr]:border-black bg-[#FDFD96] text-[#1A1A1A] font-['Inter',_sans-serif] font-semibold text-[13px] uppercase tracking-[0.05em]", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0 font-['Inter',_'Roboto',_sans-serif] font-normal bg-[#F5F5F5] text-[#2D2D2D]", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("bg-[#FDFD96] border-t-[2px] border-black font-['Inter',_sans-serif] font-semibold text-[13px] text-[#1A1A1A] tracking-[0.05em]", className)} {...props} />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("data-[state=selected]:bg-[#fce0a6] hover:bg-black/[0.04] border-b border-black/10 transition-colors text-[14px] leading-relaxed even:bg-black/[0.02]", className)}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("px-4 h-12 text-left font-['Inter',_sans-serif] font-semibold align-middle whitespace-nowrap bg-[#ba5825] text-white drop-shadow-md [&>[role=checkbox]]:translate-y-[2px] border-r-[2px] border-black last:border-r-0 tracking-[0.05em]", className)}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("p-2 align-middle tabular-nums [&>[role=checkbox]]:translate-y-[2px]", className)} {...props} />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-muted-foreground text-sm", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
