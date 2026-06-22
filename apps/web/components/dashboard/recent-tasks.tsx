import Link from "next/link"
import { ArrowRight, Circle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { STATUS, PRIORITY } from "@/lib/design-tokens"
import { formatDueDate } from "@/lib/utils/date"
import { cn } from "@/lib/utils"
import type { RecentTask } from "@/lib/mock/dashboard"
import type { TaskStatus, TaskPriority } from "@/types/task"

interface TaskRowProps {
  task: RecentTask
}

function TaskRow({ task }: TaskRowProps) {
  const isDone = task.status === "done" || task.status === "cancelled"

  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/50">
      <Circle
        className={cn("size-3.5 shrink-0", STATUS[task.status as TaskStatus].tw)}
        fill="currentColor"
      />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm font-medium",
            isDone ? "text-muted-foreground line-through" : "text-foreground",
          )}
        >
          {task.title}
        </p>
        <p className="text-xs text-muted-foreground">{task.projectName}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Badge status={task.status as TaskStatus}>
          {STATUS[task.status as TaskStatus].label}
        </Badge>
        <Badge priority={task.priority as TaskPriority} className="hidden sm:inline-flex">
          {PRIORITY[task.priority as TaskPriority].label}
        </Badge>
        {task.dueDate && !isDone && (
          <span
            className={cn(
              "hidden text-xs lg:block",
              new Date(task.dueDate) < new Date()
                ? "text-destructive"
                : "text-muted-foreground",
            )}
          >
            {formatDueDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  )
}

interface RecentTasksProps {
  tasks: RecentTask[]
}

export function RecentTasks({ tasks }: RecentTasksProps) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-border bg-surface-0 p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Recent Tasks</h2>
        <Link
          href="/dashboard/tasks"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View all
          <ArrowRight className="size-3" />
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No tasks yet.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-border/50">
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  )
}
