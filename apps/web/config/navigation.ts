import type { UserRole } from "@/types/user"

export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: string
  allowedRoles?: UserRole[]
}

export interface NavGroup {
  label?: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { label: "Dashboard", href: "/dashboard",         icon: "LayoutDashboard" },
      { label: "Projects",  href: "/dashboard/projects", icon: "FolderKanban"   },
      { label: "Tasks",     href: "/dashboard/tasks",    icon: "ListTodo"       },
      { label: "Team",      href: "/dashboard/team",     icon: "Users", allowedRoles: ["admin", "manager"] },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
    ],
  },
]

export const ROUTES = {
  home:      "/",
  login:     "/login",
  register:  "/register",
  dashboard: "/dashboard",
  projects:  "/dashboard/projects",
  tasks:     "/dashboard/tasks",
  team:      "/dashboard/team",
  settings:  "/dashboard/settings",
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
