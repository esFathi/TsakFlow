import type { TaskStatus, TaskPriority } from "@/types/task"
import type { ProjectStatus } from "@/types/project"

export interface DashboardStat {
  id: string
  label: string
  value: number
  trend: number // percentage change, positive or negative
  trendLabel: string
}

export interface RecentTask {
  id: string
  title: string
  projectName: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string | null
}

export interface ActiveProject {
  id: string
  name: string
  status: ProjectStatus
  totalTasks: number
  doneTasks: number
  memberCount: number
}

export const DASHBOARD_STATS: DashboardStat[] = [
  { id: "total",      label: "Total Tasks",      value: 24, trend: 12,  trendLabel: "vs last week" },
  { id: "progress",   label: "In Progress",       value: 8,  trend: -2,  trendLabel: "vs last week" },
  { id: "completed",  label: "Completed",         value: 5,  trend: 25,  trendLabel: "this week"    },
  { id: "projects",   label: "Active Projects",   value: 3,  trend: 0,   trendLabel: "unchanged"    },
]

export const RECENT_TASKS: RecentTask[] = [
  {
    id: "t1",
    title: "Design new onboarding flow",
    projectName: "TaskFlow Web",
    status: "in_progress",
    priority: "high",
    dueDate: "2026-06-25",
  },
  {
    id: "t2",
    title: "Set up CI/CD pipeline",
    projectName: "Infrastructure",
    status: "todo",
    priority: "urgent",
    dueDate: "2026-06-23",
  },
  {
    id: "t3",
    title: "Write API documentation",
    projectName: "TaskFlow API",
    status: "in_review",
    priority: "medium",
    dueDate: "2026-06-28",
  },
  {
    id: "t4",
    title: "Fix auth token refresh bug",
    projectName: "TaskFlow Web",
    status: "done",
    priority: "urgent",
    dueDate: null,
  },
  {
    id: "t5",
    title: "Add dark mode support",
    projectName: "TaskFlow Web",
    status: "todo",
    priority: "low",
    dueDate: "2026-07-01",
  },
]

export const ACTIVE_PROJECTS: ActiveProject[] = [
  {
    id: "p1",
    name: "TaskFlow Web",
    status: "active",
    totalTasks: 12,
    doneTasks: 5,
    memberCount: 4,
  },
  {
    id: "p2",
    name: "TaskFlow API",
    status: "active",
    totalTasks: 8,
    doneTasks: 3,
    memberCount: 3,
  },
  {
    id: "p3",
    name: "Infrastructure",
    status: "on_hold",
    totalTasks: 4,
    doneTasks: 1,
    memberCount: 2,
  },
]
