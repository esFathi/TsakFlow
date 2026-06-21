export type ProjectStatus = "active" | "on_hold" | "completed" | "archived"

export interface Project {
  id: string
  organizationId: string
  name: string
  description: string | null
  status: ProjectStatus
  ownerId: string
  memberCount: number
  taskCount: number
  createdAt: string
  updatedAt: string
}
