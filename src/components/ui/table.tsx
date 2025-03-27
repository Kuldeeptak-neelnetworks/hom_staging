import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto overflow-y-auto pb-2">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-[0.8rem] text-[#323338]",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-4 text-left  bg-[#0f464a] align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 overflow-x-auto first:sticky first:left-0",
      className
    )}
    {...props}
  />
  // <th
  //   ref={ref}
  //   className={cn(
  //     "h-10 px-4 text-left bg-[#0f464a] align-middle font-medium text-muted-foreground",
  //     "overflow-x-auto [&:has([role=checkbox])]:pr-0",
  //     "[&:first-child]:sticky [&:first-child]:left-0 [&:first-child]:z-10 [&:first-child]:bg-[#0f464a]", // Ensures first column is sticky
  //     className
  //   )}
  //   {...props}
  // />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & { rowIndex?: number }
>(({ className, rowIndex, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-4 h-8 align-middle [&:has([role=checkbox])]:pr-0 first:sticky first:left-0 z-40",
      rowIndex !== undefined && rowIndex % 2 !== 0
        ? "bg-[#d3eae9]"
        : "bg-white",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-[0.8rem] text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
