"use client"

import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal, Circle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { STATUS, PRIORITY } from "@/lib/design-tokens"
import { formatDueDate } from "@/lib/utils/date"
import { cn } from "@/lib/utils"
import { getInitials } from "@/store/slices/auth.slice"
import type { SortConfig, SortField } from "@/hooks/use-task-filters"
import type { TaskWithMeta } from "@/lib/mock/tasks"
import type { TaskStatus, TaskPriority } from "@/types/task"

// ─── SortIcon ──────────────────────────────────────────────────────────────────

function SortIcon({ field, sort }: { field: SortField; sort: SortConfig }) {
  if (sort.field !== field) return <ArrowUpDown className="size-3 opacity-40" />
  return sort.direction === "asc"
    ? <ArrowUp className="size-3 text-primary" />
    : <ArrowDown className="size-3 text-primary" />
}

// ─── SortableHeader ────────────────────────────────────────────────────────────

interface SortableHeaderProps {
  field: SortField
  label: string
  sort: SortConfig
  onToggle: (f: SortField) => void
  className?: string
}

function SortableHeader({ field, label, sort, onToggle, className }: SortableHeaderProps) {
  return (
    <th className={cn("px-3 py-2.5 text-left", className)}>
      <button
        type="button"
        onClick={() => onToggle(field)}
        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
        <SortIcon field={field} sort={sort} />
      </button>
    </th>
  )
}

// ─── AssigneeAvatar ────────────────────────────────────────────────────────────

function AssigneeAvatar({ name }: { name: string | null }) {
  if (!name) {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-border text-[9px] text-muted-foreground">
        —
      </span>
    )
  }
  return (
    <span
      title={name}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[9px] font-semibold text-primary"
    >
      {getInitials(name)}
    </span>
  )
}

// ─── TaskRow ───────────────────────────────────────────────────────────────────

function TaskRow({ task }: { task: TaskWithMeta }) {
  const isDone = task.status === "done" || task.status === "cancelled"
  const isOverdue =
    task.dueDate &&
    !isDone &&
    new Date(task.dueDate) < new Date()

  return (
    <tr className="group border-t border-border/50 transition-colors hover:bg-muted/40">
      {/* Title + project */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-2.5">
          <Circle
            className={cn("size-3 shrink-0", STATUS[task.status as TaskStatus].tw)}
            fill="currentColor"
          />
          <div className="min-w-0">
            <p
              className={cn(
                "truncate text-sm font-medium",
                isDone ? "text-muted-foreground line-through" : "text-foreground",
              )}
            >
              {task.title}
            </p>
            <p className="truncate text-xs text-muted-foreground">{task.projectName}</p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <Badge status={task.status as TaskStatus}>
          {STATUS[task.status as TaskStatus].label}
        </Badge>
      </td>

      {/* Priority */}
      <td className="hidden px-3 py-3 sm:table-cell">
        <Badge priority={task.priority as TaskPriority}>
          {PRIORITY[task.priority as TaskPriority].label}
        </Badge>
      </td>

      {/* Due date */}
      <td className="hidden px-3 py-3 md:table-cell">
        {task.dueDate && !isDone ? (
          <span className={cn("text-xs", isOverdue ? "text-destructive font-medium" : "text-muted-foreground")}>
            {formatDueDate(task.dueDate)}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground/40">—</span>
        )}
      </td>

      {/* Assignee */}
      <td className="hidden px-3 py-3 lg:table-cell">
        <AssigneeAvatar name={task.assigneeName} />
      </td>

      {/* Actions */}
      <td className="px-3 py-3 text-right">
        <button
          type="button"
          className="rounded-md p-1 text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Actions for ${task.title}`}
        >
          <MoreHorizontal className="size-4" />
        </button>
      </td>
    </tr>
  )
}

// ─── TaskTable ─────────────────────────────────────────────────────────────────

interface TaskTableProps {
  tasks: TaskWithMeta[]
  sort: SortConfig
  onToggleSort: (f: SortField) => void
}

export function TaskTable({ tasks, sort, onToggleSort }: TaskTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-0 shadow-xs">
      <table className="w-full">
        <thead className="bg-muted/30">
          <tr>
            <SortableHeader field="title"     label="Task"     sort={sort} onToggle={onToggleSort} className="w-full min-w-[200px]" />
            <SortableHeader field="status"    label="Status"   sort={sort} onToggle={onToggleSort} className="w-36" />
            <SortableHeader field="priority"  label="Priority" sort={sort} onToggle={onToggleSort} className="hidden w-28 sm:table-cell" />
            <SortableHeader field="dueDate"   label="Due"      sort={sort} onToggle={onToggleSort} className="hidden w-28 md:table-cell" />
            <th className="hidden w-16 px-3 py-2.5 text-left text-xs font-medium text-muted-foreground lg:table-cell">
              Assignee
            </th>
            <th className="w-10 px-3 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
