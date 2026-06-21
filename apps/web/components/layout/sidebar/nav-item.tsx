"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  collapsed?: boolean
}

export function NavItem({ href, icon, label, collapsed }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-all duration-150 outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground/65 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <span className="shrink-0 [&_svg]:size-[18px]">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  )
}
