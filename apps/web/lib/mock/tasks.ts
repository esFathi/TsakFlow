import type { Task, TaskStatus, TaskPriority } from "@/types/task"

export interface TaskWithMeta extends Task {
  projectName: string
  assigneeName: string | null
}

const t = (
  partial: Omit<Task, "reporterId" | "completedAt" | "createdAt" | "updatedAt"> & {
    projectName: string
    assigneeName: string | null
  },
): TaskWithMeta => ({
  reporterId: "u0",
  completedAt: partial.status === "done" ? "2026-06-20T10:00:00Z" : null,
  createdAt: "2026-06-01T09:00:00Z",
  updatedAt: "2026-06-20T10:00:00Z",
  ...partial,
})

export const MOCK_TASKS: TaskWithMeta[] = [
  t({ id: "t01", projectId: "p1", projectName: "TaskFlow Web",    title: "Design new onboarding flow",          status: "in_progress", priority: "high",   assigneeId: "u1", assigneeName: "Alex Rivera",   dueDate: "2026-06-25", description: null }),
  t({ id: "t02", projectId: "p2", projectName: "Infrastructure",  title: "Set up CI/CD pipeline",               status: "todo",        priority: "urgent", assigneeId: "u2", assigneeName: "Sam Lee",       dueDate: "2026-06-23", description: null }),
  t({ id: "t03", projectId: "p3", projectName: "TaskFlow API",    title: "Write API documentation",             status: "in_review",   priority: "medium", assigneeId: "u3", assigneeName: "Jordan Kim",    dueDate: "2026-06-28", description: null }),
  t({ id: "t04", projectId: "p1", projectName: "TaskFlow Web",    title: "Fix auth token refresh bug",          status: "done",        priority: "urgent", assigneeId: "u1", assigneeName: "Alex Rivera",   dueDate: null,         description: null }),
  t({ id: "t05", projectId: "p1", projectName: "TaskFlow Web",    title: "Add dark mode support",               status: "todo",        priority: "low",    assigneeId: null, assigneeName: null,            dueDate: "2026-07-01", description: null }),
  t({ id: "t06", projectId: "p2", projectName: "Infrastructure",  title: "Migrate database to PostgreSQL 16",   status: "blocked",     priority: "urgent", assigneeId: "u2", assigneeName: "Sam Lee",       dueDate: "2026-06-22", description: null }),
  t({ id: "t07", projectId: "p3", projectName: "TaskFlow API",    title: "Implement rate limiting",             status: "in_progress", priority: "high",   assigneeId: "u3", assigneeName: "Jordan Kim",    dueDate: "2026-06-30", description: null }),
  t({ id: "t08", projectId: "p1", projectName: "TaskFlow Web",    title: "Refactor sidebar navigation",         status: "done",        priority: "medium", assigneeId: "u4", assigneeName: "Morgan Chen",   dueDate: null,         description: null }),
  t({ id: "t09", projectId: "p4", projectName: "Mobile App",      title: "Design splash screen",                status: "todo",        priority: "medium", assigneeId: "u4", assigneeName: "Morgan Chen",   dueDate: "2026-07-05", description: null }),
  t({ id: "t10", projectId: "p4", projectName: "Mobile App",      title: "Set up React Native project",         status: "in_progress", priority: "high",   assigneeId: "u1", assigneeName: "Alex Rivera",   dueDate: "2026-06-27", description: null }),
  t({ id: "t11", projectId: "p3", projectName: "TaskFlow API",    title: "Add WebSocket support",               status: "todo",        priority: "medium", assigneeId: null, assigneeName: null,            dueDate: "2026-07-10", description: null }),
  t({ id: "t12", projectId: "p2", projectName: "Infrastructure",  title: "Set up monitoring with Grafana",      status: "in_review",   priority: "low",    assigneeId: "u2", assigneeName: "Sam Lee",       dueDate: "2026-07-03", description: null }),
  t({ id: "t13", projectId: "p1", projectName: "TaskFlow Web",    title: "Write unit tests for auth flow",      status: "cancelled",   priority: "medium", assigneeId: "u3", assigneeName: "Jordan Kim",    dueDate: null,         description: null }),
  t({ id: "t14", projectId: "p4", projectName: "Mobile App",      title: "Implement push notifications",        status: "todo",        priority: "high",   assigneeId: "u4", assigneeName: "Morgan Chen",   dueDate: "2026-07-08", description: null }),
  t({ id: "t15", projectId: "p3", projectName: "TaskFlow API",    title: "Optimize slow database queries",      status: "blocked",     priority: "high",   assigneeId: "u1", assigneeName: "Alex Rivera",   dueDate: "2026-06-21", description: null }),
]
