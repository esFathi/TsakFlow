import { cn } from "@/lib/utils"

interface SectionCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  danger?: boolean
}

export function SectionCard({
  title,
  description,
  children,
  className,
  danger = false,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-xl border bg-surface-0 p-6 shadow-xs",
        danger ? "border-destructive/30" : "border-border",
        className,
      )}
    >
      <div className="flex flex-col gap-0.5">
        <h2
          className={cn(
            "text-sm font-semibold",
            danger ? "text-destructive" : "text-foreground",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="border-t border-border/50 pt-1">{children}</div>
    </div>
  )
}
