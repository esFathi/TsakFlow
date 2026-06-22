import { TrendingUp, TrendingDown, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import type { DashboardStat } from "@/lib/mock/dashboard"

interface StatCardProps {
  stat: DashboardStat
  icon: React.ReactNode
}

function TrendIndicator({ value, label }: { value: number; label: string }) {
  if (value === 0) {
    return (
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <Minus className="size-3" />
        {label}
      </span>
    )
  }

  const isPositive = value > 0

  return (
    <span
      className={cn(
        "flex items-center gap-1 text-xs",
        isPositive ? "text-green-500" : "text-destructive",
      )}
    >
      {isPositive ? (
        <TrendingUp className="size-3" />
      ) : (
        <TrendingDown className="size-3" />
      )}
      {isPositive ? "+" : ""}
      {value}% {label}
    </span>
  )
}

export function StatCard({ stat, icon }: StatCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface-0 p-5 shadow-xs">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold tracking-tight text-foreground">
          {stat.value}
        </span>
        <TrendIndicator value={stat.trend} label={stat.trendLabel} />
      </div>
    </div>
  )
}
