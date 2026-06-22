import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/lib/variants"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, status, priority, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, status, priority }), className)}
      {...props}
    />
  )
}
