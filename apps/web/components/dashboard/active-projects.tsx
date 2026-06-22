import Link from "next/link"
import { ArrowRight, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ActiveProject } from "@/lib/mock/dashboard"
import type { ProjectStatus } from "@/types/project"

const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  active:    "Active",
  on_hold:   "On Hold",
  completed: "Completed",
  archived:  "Archived",
}

const PROJECT_STATUS_VARIANT: Record<
  ProjectStatus,
  "default" | "secondary" | "destructive" | "outline" | "ghost"
> = {
  active:    "default",
  on_hold:   "outline",
  completed: "secondary",
  archived:  "ghost",
}

interface ProgressBarProps {
  done: number
  total: number
}

function ProgressBar({ done, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <span className="w-8 text-right text-xs text-muted-foreground">{pct}%</span>
    </div>
  )
}

interface ProjectCardProps {
  project: ActiveProject
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/60 bg-surface-1 p-4 transition-colors hover:border-border">
      <div className="flex items-start justify-between gap-2">
        <p className="truncate text-sm font-medium text-foreground">{project.name}</p>
        <Badge variant={PROJECT_STATUS_VARIANT[project.status as ProjectStatus]}>
          {PROJECT_STATUS_LABEL[project.status as ProjectStatus]}
        </Badge>
      </div>

      <ProgressBar done={project.doneTasks} total={project.totalTasks} />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {project.doneTasks}/{project.totalTasks} tasks
        </span>
        <span className="flex items-center gap-1">
          <Users className="size-3" />
          {project.memberCount}
        </span>
      </div>
    </div>
  )
}

interface ActiveProjectsProps {
  projects: ActiveProject[]
}

export function ActiveProjects({ projects }: ActiveProjectsProps) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-border bg-surface-0 p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Active Projects</h2>
        <Link
          href="/dashboard/projects"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View all
          <ArrowRight className="size-3" />
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No active projects.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}
