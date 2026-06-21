export type UserRole = "admin" | "manager" | "member" | "viewer"

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  role: UserRole
  createdAt: string
}
