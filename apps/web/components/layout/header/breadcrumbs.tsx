"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  projects:  "Projects",
  tasks:     "Tasks",
  team:      "Team",
  settings:  "Settings",
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length <= 1) return null

  const crumbs = segments.map((seg, i) => ({
    label: SEGMENT_LABELS[seg] ?? seg,
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }))

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1">
      {crumbs.map(({ label, href, isLast }) => (
        <span key={href} className="flex items-center gap-1">
          {!isLast ? (
            <>
              <Link
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
              <ChevronRight className="size-3.5 text-muted-foreground/40" />
            </>
          ) : (
            <span className={cn("text-sm font-medium text-foreground")}>
              {label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
