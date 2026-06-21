"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { STATUS, PRIORITY, ROLE, type StatusKey, type PriorityKey } from "@/lib/design-tokens"
import { badgeVariants } from "@/lib/variants"
import {
  Circle, CircleDot, Eye, CheckCircle2, XCircle, Ban,
  AlertCircle, ChevronUp, Minus, ChevronDown,
  LayoutDashboard, FolderKanban, ListTodo, Users, Bell, Settings,
  Plus, Search, Moon, Sun,
} from "lucide-react"

const statusIcons: Record<StatusKey, React.ReactNode> = {
  todo:        <Circle size={14} />,
  in_progress: <CircleDot size={14} />,
  in_review:   <Eye size={14} />,
  done:        <CheckCircle2 size={14} />,
  cancelled:   <XCircle size={14} />,
  blocked:     <Ban size={14} />,
}

const priorityIcons: Record<PriorityKey, React.ReactNode> = {
  urgent: <AlertCircle size={14} />,
  high:   <ChevronUp size={14} />,
  medium: <Minus size={14} />,
  low:    <ChevronDown size={14} />,
  none:   <Minus size={14} className="opacity-30" />,
}

const navItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { icon: <FolderKanban size={18} />,   label: "Projects"  },
  { icon: <ListTodo size={18} />,       label: "Tasks"     },
  { icon: <Users size={18} />,          label: "Team"      },
  { icon: <Bell size={18} />,           label: "Inbox"     },
  { icon: <Settings size={18} />,       label: "Settings"  },
]

export default function DesignSystemPreview() {
  const [dark, setDark] = useState(false)
  const [active, setActive] = useState("Tasks")

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">

        {/* ── Top bar ── */}
        <header className="h-12 border-b border-border flex items-center px-6 gap-4 shrink-0">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            TaskFlow <span className="text-muted-foreground font-normal">/ Design System</span>
          </span>
          <div className="flex-1" />
          <button
            onClick={() => setDark(d => !d)}
            className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </header>

        <div className="flex flex-1 overflow-hidden">

          {/* ── Sidebar preview ── */}
          <aside className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col py-3 shrink-0">
            <div className="px-3 mb-4">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-sidebar-accent">
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary-foreground">T</span>
                </div>
                <span className="text-sm font-medium text-sidebar-foreground">TaskFlow Inc.</span>
              </div>
            </div>

            <div className="px-3 mb-3">
              <div className="flex items-center gap-2 h-8 px-2 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
                <Search size={13} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Search...</span>
                <span className="ml-auto text-[10px] text-muted-foreground font-mono bg-sidebar-border px-1 rounded">⌘K</span>
              </div>
            </div>

            <nav className="flex-1 px-3 space-y-0.5">
              {navItems.map(item => (
                <button
                  key={item.label}
                  onClick={() => setActive(item.label)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors text-left",
                    active === item.label
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="px-3 mt-3 pt-3 border-t border-sidebar-border">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-sidebar-accent/50 cursor-pointer transition-colors">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary-foreground">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-sidebar-foreground truncate">Ali Rezaei</p>
                  <p className="text-[10px] text-muted-foreground truncate">Admin</p>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 overflow-y-auto p-8 space-y-12">

            {/* Brand Colors */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Brand Colors</h2>
              <div className="flex gap-1.5 flex-wrap">
                {(["50","100","200","300","400","500","600","700","800","900"] as const).map(shade => (
                  <div key={shade} className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-lg shadow-sm border border-border/50"
                      style={{ background: `var(--brand-${shade})` }}
                    />
                    <span className="text-[10px] text-muted-foreground">{shade}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Status badges */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Task Status</h2>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(STATUS) as StatusKey[]).map(key => (
                  <span key={key} className={cn(badgeVariants({ status: key }))}>
                    {statusIcons[key]}
                    {STATUS[key].label}
                  </span>
                ))}
              </div>
            </section>

            {/* Priority badges */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Priority</h2>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(PRIORITY) as PriorityKey[]).map(key => (
                  <span key={key} className={cn(badgeVariants({ priority: key }))}>
                    {priorityIcons[key]}
                    {PRIORITY[key].label}
                  </span>
                ))}
              </div>
            </section>

            {/* Roles */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Roles</h2>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(ROLE) as (keyof typeof ROLE)[]).map(key => (
                  <span key={key} className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", ROLE[key].badge)}>
                    {ROLE[key].label}
                  </span>
                ))}
              </div>
            </section>

            {/* Buttons */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Buttons</h2>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors active:scale-[0.98]">
                  <Plus size={16} /> New Task
                </button>
                <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors">
                  Delete
                </button>
                <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  Secondary
                </button>
                <button className="inline-flex items-center h-9 w-9 justify-center rounded-lg text-sm hover:bg-muted text-muted-foreground transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </section>

            {/* Inputs */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Inputs</h2>
              <div className="flex flex-col gap-3 max-w-sm">
                <input
                  className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                  placeholder="Task title..."
                />
                <input
                  className="h-9 w-full rounded-lg border border-destructive bg-transparent px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive transition-colors"
                  placeholder="Error state"
                />
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="h-9 w-full rounded-lg border border-input bg-transparent pl-8 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                    placeholder="Search tasks..."
                  />
                </div>
              </div>
            </section>

            {/* Surfaces */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Surfaces</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(["surface-0","surface-1","surface-2","surface-3"] as const).map(s => (
                  <div
                    key={s}
                    className="p-4 rounded-xl border border-border space-y-1"
                    style={{ background: `var(--${s})` }}
                  >
                    <p className="text-[10px] font-mono text-muted-foreground">--{s}</p>
                    <p className="text-sm font-medium">Card</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Task row */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Task Row</h2>
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                {[
                  { title: "Setup authentication flow",    status: "in_progress" as StatusKey, priority: "high" as PriorityKey,   assignee: "AR", due: "Jun 24" },
                  { title: "Design dashboard components",   status: "in_review"   as StatusKey, priority: "medium" as PriorityKey, assignee: "MK", due: "Jun 25" },
                  { title: "Write API documentation",       status: "todo"        as StatusKey, priority: "low" as PriorityKey,    assignee: "SR", due: "Jun 28" },
                  { title: "Fix mobile navigation bug",     status: "blocked"     as StatusKey, priority: "urgent" as PriorityKey, assignee: "AR", due: "Jun 22" },
                  { title: "Deploy to staging environment", status: "done"        as StatusKey, priority: "high" as PriorityKey,   assignee: "MK", due: "Jun 20" },
                ].map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <span className={cn(badgeVariants({ status: task.status }))}>
                      {statusIcons[task.status]}
                    </span>
                    <span className={cn(
                      "text-sm flex-1 truncate",
                      task.status === "done" ? "line-through text-muted-foreground" : "text-foreground"
                    )}>
                      {task.title}
                    </span>
                    <span className={cn(badgeVariants({ priority: task.priority }), "hidden sm:inline-flex")}>
                      {priorityIcons[task.priority]}
                      {PRIORITY[task.priority].label}
                    </span>
                    <span className="text-xs text-muted-foreground hidden md:block w-14 text-right">{task.due}</span>
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-primary">{task.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Typography */}
            <section className="space-y-4 pb-8">
              <h2 className="text-lg font-semibold">Typography</h2>
              <div className="space-y-2">
                <p className="text-3xl font-bold tracking-tight">Heading 3xl Bold</p>
                <p className="text-2xl font-bold tracking-tight">Heading 2xl Bold</p>
                <p className="text-xl font-semibold">Heading xl Semibold</p>
                <p className="text-lg font-semibold">Heading lg Semibold</p>
                <p className="text-base font-medium">Body base medium</p>
                <p className="text-sm text-muted-foreground">Body sm muted — supporting text and descriptions</p>
                <p className="text-xs font-mono text-muted-foreground">Mono xs — timestamps · IDs · metadata</p>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  )
}
