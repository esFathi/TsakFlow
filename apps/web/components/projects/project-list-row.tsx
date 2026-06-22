import { Users, CalendarDays, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { PROJECT_STATUS } from "@/lib/design-tokens"
import { formatDueDate } from "@/lib/utils/date"
import type { ProjectWithMeta } from "@/lib/mock/projects"
import type { ProjectStatus } from "@/types/project"

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  const isComplete = pct === 100

  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-20 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", isComplete ? "bg-green-500" : "bg-primary")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-7 text-right text-xs text-muted-foreground">{pct}%</span>
    </div>
  )
}

interface ProjectListRowProps {
  project: ProjectWithMeta
}

export function ProjectListRow({ project }: ProjectListRowProps) {
  const statusToken = PROJECT_STATUS[project.status as ProjectStatus]
  const isInactive = project.status === "archived" || project.status === "completed"

  return (
    <tr className="group border-t border-border/50 transition-colors hover:bg-muted/40">
      {/* Name */}
      <td className="px-4 py-3">
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-sm font-medium",
              isInactive ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {project.name}
          </p>
          {project.description && (
            <p className="truncate text-xs text-muted-foreground">{project.description}</p>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
            statusToken.badge,
          )}
        >
          {statusToken.label}
        </span>
      </td>

      {/* Progress */}
      <td className="hidden px-4 py-3 md:table-cell">
        <ProgressBar done={project.doneTasks} total={project.taskCount} />
      </td>

      {/* Tasks */}
      <td className="hidden px-4 py-3 text-xs text-muted-foreground sm:table-cell">
        {project.doneTasks}/{project.taskCount}
      </td>

      {/* Members */}
      <td className="hidden px-4 py-3 lg:table-cell">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="size-3" />
          {project.memberCount}
        </span>
      </td>

      {/* Due date */}
      <td className="hidden px-4 py-3 lg:table-cell">
        {project.dueDate ? (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="size-3" />
            {formatDueDate(project.dueDate)}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground/40">—</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          className="rounded-md p-1 text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Actions for ${project.name}`}
        >
          <MoreHorizontal className="size-4" />
        </button>
      </td>
    </tr>
  )
}
