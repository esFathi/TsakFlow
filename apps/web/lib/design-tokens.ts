// Design token constants — use these for logic (badges, icons, etc.)
// CSS variables drive actual colors; keep these in sync with globals.css

export const STATUS = {
  todo:        { label: "To Do",      color: "var(--status-todo)",        tw: "text-slate-400" },
  in_progress: { label: "In Progress", color: "var(--status-in-progress)", tw: "text-indigo-400" },
  in_review:   { label: "In Review",  color: "var(--status-in-review)",   tw: "text-purple-400" },
  done:        { label: "Done",       color: "var(--status-done)",        tw: "text-green-400" },
  cancelled:   { label: "Cancelled",  color: "var(--status-cancelled)",   tw: "text-zinc-400" },
  blocked:     { label: "Blocked",    color: "var(--status-blocked)",     tw: "text-red-400" },
} as const

export type StatusKey = keyof typeof STATUS

export const PRIORITY = {
  urgent: { label: "Urgent", color: "var(--priority-urgent)", tw: "text-red-400" },
  high:   { label: "High",   color: "var(--priority-high)",   tw: "text-orange-400" },
  medium: { label: "Medium", color: "var(--priority-medium)", tw: "text-yellow-400" },
  low:    { label: "Low",    color: "var(--priority-low)",    tw: "text-slate-400" },
  none:   { label: "None",   color: "var(--priority-none)",   tw: "text-zinc-600" },
} as const

export type PriorityKey = keyof typeof PRIORITY

export const ROLE = {
  admin:   { label: "Admin",   badge: "bg-red-500/10 text-red-400 border-red-500/20" },
  manager: { label: "Manager", badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  member:  { label: "Member",  badge: "bg-green-500/10 text-green-400 border-green-500/20" },
  viewer:  { label: "Viewer",  badge: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
} as const

export type RoleKey = keyof typeof ROLE
