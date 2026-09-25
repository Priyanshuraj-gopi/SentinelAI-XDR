import * as React from "react";
import { cn } from "@/lib/utils";

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-lg border border-slate-800/80 bg-[#090d18]">
      <table ref={ref} className={cn("w-full caption-bottom text-xs text-left", className)} {...props} />
    </div>
  )
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("bg-[#0e1526] border-b border-slate-800/90 select-none", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0 divide-y divide-slate-800/50", className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "transition-colors hover:bg-slate-800/40 data-[state=selected]:bg-blue-950/40 cursor-pointer",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-9 px-3.5 text-left font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400",
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("px-3.5 py-2.5 align-middle font-mono text-slate-300", className)} {...props} />
  )
);
TableCell.displayName = "TableCell";
