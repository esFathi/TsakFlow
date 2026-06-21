import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:     "bg-primary/10 text-primary border-primary/20",
        secondary:   "bg-secondary text-secondary-foreground border-transparent",
        destructive: "bg-destructive/10 text-destructive border-destructive/20",
        outline:     "bg-transparent text-foreground border-border",
        ghost:       "bg-transparent text-muted-foreground border-transparent",
      },
      status: {
        todo:        "bg-slate-500/10    text-slate-400    border-slate-500/20",
        in_progress: "bg-indigo-500/10  text-indigo-400   border-indigo-500/20",
        in_review:   "bg-purple-500/10  text-purple-400   border-purple-500/20",
        done:        "bg-green-500/10   text-green-400    border-green-500/20",
        cancelled:   "bg-zinc-500/10    text-zinc-400     border-zinc-500/20",
        blocked:     "bg-red-500/10     text-red-400      border-red-500/20",
      },
      priority: {
        urgent: "bg-red-500/10    text-red-400    border-red-500/20",
        high:   "bg-orange-500/10 text-orange-400 border-orange-500/20",
        medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        low:    "bg-slate-500/10  text-slate-400  border-slate-500/20",
        none:   "bg-zinc-500/10   text-zinc-500   border-zinc-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]",
        destructive: "bg-destructive text-white shadow-sm hover:bg-destructive/90 active:scale-[0.98]",
        outline:     "border border-border bg-transparent hover:bg-muted hover:text-foreground",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:       "hover:bg-muted hover:text-foreground",
        link:        "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-7 px-2.5 text-xs",
        default: "h-9 px-4 py-2",
        lg:      "h-11 px-6 text-base",
        icon:    "h-9 w-9",
        "icon-sm": "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const inputVariants = cva(
  "flex w-full rounded-lg border bg-transparent text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm:      "h-7 px-2.5 py-1 text-xs",
        default: "h-9 px-3 py-2",
        lg:      "h-11 px-4 py-3",
      },
      state: {
        default: "border-input",
        error:   "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
      },
    },
    defaultVariants: {
      size: "default",
      state: "default",
    },
  }
)
