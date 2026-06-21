export type TaskStatus = "todo" | "in_progress" | "in_review" | "done" | "cancelled" | "blocked"
export type TaskPriority = "urgent" | "high" | "medium" | "low" | "none"

export interface Task {
  id: string
  projectId: string
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string | null
  reporterId: string
  dueDate: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
}
