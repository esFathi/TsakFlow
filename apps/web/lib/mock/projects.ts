import type { Project, ProjectStatus } from "@/types/project"

export interface ProjectMember {
  id: string
  name: string
}

export interface ProjectWithMeta extends Project {
  doneTasks: number
  dueDate: string | null
  members: ProjectMember[]
  tags: string[]
}

const p = (
  partial: Omit<Project, "organizationId" | "ownerId" | "createdAt" | "updatedAt"> & {
    doneTasks: number
    dueDate: string | null
    members: ProjectMember[]
    tags: string[]
  },
): ProjectWithMeta => ({
  organizationId: "org1",
  ownerId: "u1",
  createdAt: "2026-05-01T09:00:00Z",
  updatedAt: "2026-06-20T10:00:00Z",
  ...partial,
})

export const MOCK_PROJECTS: ProjectWithMeta[] = [
  p({
    id: "p1",
    name: "TaskFlow Web",
    description: "Next.js frontend for the TaskFlow platform — dashboard, tasks, and team management.",
    status: "active",
    taskCount: 12,
    doneTasks: 7,
    memberCount: 4,
    dueDate: "2026-07-15",
    members: [
      { id: "u1", name: "Alex Rivera" },
      { id: "u2", name: "Sam Lee" },
      { id: "u3", name: "Jordan Kim" },
      { id: "u4", name: "Morgan Chen" },
    ],
    tags: ["frontend", "react", "design"],
  }),
  p({
    id: "p2",
    name: "TaskFlow API",
    description: "REST & WebSocket API built with NestJS. Handles auth, tasks, projects, and real-time updates.",
    status: "active",
    taskCount: 8,
    doneTasks: 3,
    memberCount: 3,
    dueDate: "2026-07-30",
    members: [
      { id: "u1", name: "Alex Rivera" },
      { id: "u3", name: "Jordan Kim" },
      { id: "u5", name: "Casey Park" },
    ],
    tags: ["backend", "nestjs", "api"],
  }),
  p({
    id: "p3",
    name: "Infrastructure",
    description: "CI/CD pipelines, Docker setup, monitoring with Grafana, and PostgreSQL migration.",
    status: "on_hold",
    taskCount: 6,
    doneTasks: 2,
    memberCount: 2,
    dueDate: "2026-08-10",
    members: [
      { id: "u2", name: "Sam Lee" },
      { id: "u5", name: "Casey Park" },
    ],
    tags: ["devops", "docker", "ci-cd"],
  }),
  p({
    id: "p4",
    name: "Mobile App",
    description: "React Native app for iOS and Android. Mirrors web features with native UX patterns.",
    status: "active",
    taskCount: 10,
    doneTasks: 2,
    memberCount: 3,
    dueDate: "2026-09-01",
    members: [
      { id: "u1", name: "Alex Rivera" },
      { id: "u4", name: "Morgan Chen" },
      { id: "u6", name: "Riley Torres" },
    ],
    tags: ["mobile", "react-native", "ios", "android"],
  }),
  p({
    id: "p5",
    name: "Design System",
    description: "Shared component library, Figma tokens, and Storybook documentation for all TaskFlow products.",
    status: "completed",
    taskCount: 15,
    doneTasks: 15,
    memberCount: 2,
    dueDate: null,
    members: [
      { id: "u4", name: "Morgan Chen" },
      { id: "u6", name: "Riley Torres" },
    ],
    tags: ["design", "storybook", "tokens"],
  }),
  p({
    id: "p6",
    name: "Analytics Dashboard",
    description: "Internal analytics tool for tracking usage metrics, error rates, and performance across services.",
    status: "archived",
    taskCount: 9,
    doneTasks: 9,
    memberCount: 2,
    dueDate: null,
    members: [
      { id: "u3", name: "Jordan Kim" },
      { id: "u5", name: "Casey Park" },
    ],
    tags: ["analytics", "internal"],
  }),
]
