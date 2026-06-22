import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ROLE } from "@/lib/design-tokens"
import { getInitials } from "@/store/slices/auth.slice"
import type { TeamMember, MemberStatus } from "@/lib/mock/team"
import type { UserRole } from "@/types/user"

const STATUS_DOT: Record<MemberStatus, string> = {
  active:   "bg-green-500",
  inactive: "bg-zinc-400",
  invited:  "bg-yellow-500",
}

const STATUS_LABEL: Record<MemberStatus, string> = {
  active:   "Active",
  inactive: "Inactive",
  invited:  "Invited",
}

interface TeamMemberRowProps {
  member: TeamMember
}

export function TeamMemberRow({ member }: TeamMemberRowProps) {
  const roleToken = ROLE[member.role as UserRole]

  return (
    <tr className={cn(
      "group border-t border-border/50 transition-colors hover:bg-muted/40",
      member.status === "invited" && "opacity-70",
    )}>
      {/* Avatar + name + email */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-xs font-semibold text-primary">
              {getInitials(member.name)}
            </span>
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-surface-0",
                STATUS_DOT[member.status],
              )}
              title={STATUS_LABEL[member.status]}
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
            <p className="truncate text-xs text-muted-foreground">{member.email}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-4 py-3">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
            roleToken.badge,
          )}
        >
          {roleToken.label}
        </span>
      </td>

      {/* Status */}
      <td className="hidden px-4 py-3 sm:table-cell">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className={cn("size-1.5 rounded-full", STATUS_DOT[member.status])} />
          {STATUS_LABEL[member.status]}
        </span>
      </td>

      {/* Projects */}
      <td className="hidden px-4 py-3 text-xs text-muted-foreground md:table-cell">
        {member.projects.length > 0
          ? member.projects.map((p) => p.name).join(", ")
          : <span className="text-muted-foreground/40">—</span>}
      </td>

      {/* Tasks */}
      <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">
        {member.taskCount}
      </td>

      {/* Joined */}
      <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">
        {new Date(member.joinedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          className="rounded-md p-1 text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Actions for ${member.name}`}
        >
          <MoreHorizontal className="size-4" />
        </button>
      </td>
    </tr>
  )
}
