import type { UserRole } from "./user"

export interface Organization {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  createdAt: string
}

export interface Membership {
  userId: string
  organizationId: string
  role: UserRole
  joinedAt: string
}
