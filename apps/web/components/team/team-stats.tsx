import { ROLE } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import type { TeamMember } from "@/lib/mock/team"
import type { UserRole } from "@/types/user"

interface TeamStatsProps {
  members: TeamMember[]
}

export function TeamStats({ members }: TeamStatsProps) {
  const byRole = (Object.keys(ROLE) as UserRole[]).map((role) => ({
    role,
    label: ROLE[role].label,
    badge: ROLE[role].badge,
    count: members.filter((m) => m.role === role).length,
  }))

  const activeCount  = members.filter((m) => m.status === "active").length
  const invitedCount = members.filter((m) => m.status === "invited").length

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface-0 px-5 py-3.5 shadow-xs">
      {/* Total */}
      <div className="flex items-baseline gap-1.5 pr-4 border-r border-border">
        <span className="text-2xl font-bold text-foreground">{members.length}</span>
        <span className="text-xs text-muted-foreground">members</span>
      </div>

      {/* By role */}
      <div className="flex flex-wrap items-center gap-2 px-4">
        {byRole.map(({ role, label, badge, count }) =>
          count > 0 ? (
            <span
              key={role}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                badge,
              )}
            >
              {count} {label}
            </span>
          ) : null,
        )}
      </div>

      {/* Active / invited */}
      <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-green-500" />
          {activeCount} active
        </span>
        {invitedCount > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-yellow-500" />
            {invitedCount} invited
          </span>
        )}
      </div>
    </div>
  )
}
