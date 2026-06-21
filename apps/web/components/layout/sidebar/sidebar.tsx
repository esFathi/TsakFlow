"use client"

import Link from "next/link"
import {
  LayoutDashboard, FolderKanban, ListTodo,
  Users, Settings, PanelLeftClose, PanelLeftOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/hooks/use-app-dispatch"
import { toggleSidebar } from "@/store/slices/ui.slice"
import { NAV_GROUPS } from "@/config/navigation"
import { NavItem } from "./nav-item"

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard />,
  FolderKanban:    <FolderKanban />,
  ListTodo:        <ListTodo />,
  Users:           <Users />,
  Settings:        <Settings />,
}

export function Sidebar() {
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector(s => s.ui.sidebarCollapsed)

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "group/sidebar flex h-full flex-col bg-sidebar border-r border-sidebar-border",
        "transition-[width] duration-200 ease-in-out shrink-0",
        collapsed ? "w-[56px]" : "w-[220px]"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex h-12 items-center border-b border-sidebar-border px-3 shrink-0",
        collapsed ? "justify-center" : "gap-2.5"
      )}>
        <Link
          href="/dashboard"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary"
        >
          <span className="text-xs font-bold text-primary-foreground select-none">TF</span>
        </Link>
        {!collapsed && (
          <span className="text-sm font-semibold text-sidebar-foreground truncate">
            TaskFlow
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden px-2 py-3">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-0.5">
            {group.label && !collapsed && (
              <p className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {group.label}
              </p>
            )}
            {group.items.map(item => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={ICON_MAP[item.icon]}
                label={item.label}
                collapsed={collapsed}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border px-2 py-2 shrink-0">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm",
            "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
            "transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
            collapsed && "justify-center px-2"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed
            ? <PanelLeftOpen className="size-[18px] shrink-0" />
            : <><PanelLeftClose className="size-[18px] shrink-0" /><span>Collapse</span></>
          }
        </button>
      </div>
    </aside>
  )
}
