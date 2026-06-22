"use client"

import { useRef, useEffect, useState } from "react"
import { Search, ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { STATUS, PRIORITY } from "@/lib/design-tokens"
import type { TaskFilters } from "@/hooks/use-task-filters"
import type { TaskStatus, TaskPriority } from "@/types/task"

// ─── FilterDropdown ────────────────────────────────────────────────────────────

interface FilterDropdownProps {
  label: string
  active: boolean
  children: React.ReactNode
}

function FilterDropdown({ label, active, children }: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          active
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-border bg-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground",
        )}
      >
        {label}
        {active && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            ✓
          </span>
        )}
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1.5 min-w-[160px] rounded-xl border border-border bg-surface-0 p-1.5 shadow-md">
          {children}
        </div>
      )}
    </div>
  )
}

// ─── FilterOption ──────────────────────────────────────────────────────────────

interface FilterOptionProps {
  label: string
  checked: boolean
  onToggle: () => void
  colorClass?: string
}

function FilterOption({ label, checked, onToggle, colorClass }: FilterOptionProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-muted",
        checked ? "text-foreground" : "text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-colors",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-transparent",
        )}
      >
        {checked && (
          <svg viewBox="0 0 8 8" className="size-2.5 fill-current">
            <path d="M1 4l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {colorClass && <span className={cn("size-2 shrink-0 rounded-full bg-current", colorClass)} />}
      {label}
    </button>
  )
}

// ─── FilterBar ─────────────────────────────────────────────────────────────────

interface FilterBarProps {
  filters: TaskFilters
  hasActiveFilters: boolean
  totalCount: number
  filteredCount: number
  onSearchChange: (v: string) => void
  onStatusToggle: (s: TaskStatus) => void
  onPriorityToggle: (p: TaskPriority) => void
  onClearFilters: () => void
}

export function FilterBar({
  filters,
  hasActiveFilters,
  totalCount,
  filteredCount,
  onSearchChange,
  onStatusToggle,
  onPriorityToggle,
  onClearFilters,
}: FilterBarProps) {
  const allStatuses = Object.entries(STATUS) as [TaskStatus, (typeof STATUS)[TaskStatus]][]
  const allPriorities = Object.entries(PRIORITY) as [TaskPriority, (typeof PRIORITY)[TaskPriority]][]

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search tasks…"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-8 w-full rounded-lg border border-border bg-transparent pl-8 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Status filter */}
        <FilterDropdown label="Status" active={filters.statuses.length > 0}>
          {allStatuses.map(([key, token]) => (
            <FilterOption
              key={key}
              label={token.label}
              checked={filters.statuses.includes(key)}
              onToggle={() => onStatusToggle(key)}
              colorClass={token.tw}
            />
          ))}
        </FilterDropdown>

        {/* Priority filter */}
        <FilterDropdown label="Priority" active={filters.priorities.length > 0}>
          {allPriorities.map(([key, token]) => (
            <FilterOption
              key={key}
              label={token.label}
              checked={filters.priorities.includes(key)}
              onToggle={() => onPriorityToggle(key)}
              colorClass={token.tw}
            />
          ))}
        </FilterDropdown>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3" />
            Clear
          </button>
        )}

        {/* Count */}
        <span className="ml-auto text-xs text-muted-foreground">
          {hasActiveFilters ? `${filteredCount} of ${totalCount}` : `${totalCount}`} tasks
        </span>
      </div>
    </div>
  )
}
