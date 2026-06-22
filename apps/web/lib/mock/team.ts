import type { UserRole } from "@/types/user"

export type MemberStatus = "active" | "inactive" | "invited"

export interface TeamMember {
  id: string
  name: string
  email: string
  role: UserRole
  status: MemberStatus
  avatarUrl: string | null
  taskCount: number
  joinedAt: string
  projects: { id: string; name: string }[]
}

const m = (partial: TeamMember): TeamMember => partial

export const MOCK_TEAM: TeamMember[] = [
  m({
    id: "u1",
    name: "Alex Rivera",
    email: "alex@taskflow.io",
    role: "admin",
    status: "active",
    avatarUrl: null,
    taskCount: 8,
    joinedAt: "2026-01-10T00:00:00Z",
    projects: [
      { id: "p1", name: "TaskFlow Web" },
      { id: "p2", name: "TaskFlow API" },
      { id: "p4", name: "Mobile App" },
    ],
  }),
  m({
    id: "u2",
    name: "Sam Lee",
    email: "sam@taskflow.io",
    role: "manager",
    status: "active",
    avatarUrl: null,
    taskCount: 5,
    joinedAt: "2026-01-15T00:00:00Z",
    projects: [
      { id: "p2", name: "TaskFlow API" },
      { id: "p3", name: "Infrastructure" },
    ],
  }),
  m({
    id: "u3",
    name: "Jordan Kim",
    email: "jordan@taskflow.io",
    role: "manager",
    status: "active",
    avatarUrl: null,
    taskCount: 6,
    joinedAt: "2026-02-01T00:00:00Z",
    projects: [
      { id: "p1", name: "TaskFlow Web" },
      { id: "p3", name: "Infrastructure" },
    ],
  }),
  m({
    id: "u4",
    name: "Morgan Chen",
    email: "morgan@taskflow.io",
    role: "member",
    status: "active",
    avatarUrl: null,
    taskCount: 4,
    joinedAt: "2026-02-14T00:00:00Z",
    projects: [
      { id: "p1", name: "TaskFlow Web" },
      { id: "p4", name: "Mobile App" },
    ],
  }),
  m({
    id: "u5",
    name: "Casey Park",
    email: "casey@taskflow.io",
    role: "member",
    status: "inactive",
    avatarUrl: null,
    taskCount: 2,
    joinedAt: "2026-03-05T00:00:00Z",
    projects: [
      { id: "p2", name: "TaskFlow API" },
      { id: "p3", name: "Infrastructure" },
    ],
  }),
  m({
    id: "u6",
    name: "Riley Torres",
    email: "riley@taskflow.io",
    role: "member",
    status: "active",
    avatarUrl: null,
    taskCount: 3,
    joinedAt: "2026-03-20T00:00:00Z",
    projects: [{ id: "p4", name: "Mobile App" }],
  }),
  m({
    id: "u7",
    name: "Drew Walsh",
    email: "drew@taskflow.io",
    role: "viewer",
    status: "invited",
    avatarUrl: null,
    taskCount: 0,
    joinedAt: "2026-06-18T00:00:00Z",
    projects: [],
  }),
]
