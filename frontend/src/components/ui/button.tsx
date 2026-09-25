import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-sm hover:bg-blue-500 active:bg-blue-700 border border-blue-500/40",
        cyber:
          "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 border border-blue-400/40",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-500 active:bg-red-700 border border-red-500/50 shadow-red-900/30",
        containment:
          "bg-red-950/80 text-red-300 hover:bg-red-900/90 border border-red-600/70 hover:border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)]",
        outline:
          "border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800/60 hover:text-white hover:border-slate-600",
        secondary:
          "bg-slate-800 text-slate-200 hover:bg-slate-700/80 border border-slate-700/60",
        ghost:
          "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40",
      },
      size: {
        default: "h-8 px-3.5 py-1.5",
        sm: "h-7 px-2.5 text-[11px]",
        lg: "h-10 px-5 text-sm",
        icon: "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
