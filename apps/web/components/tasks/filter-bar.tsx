"use client"

import { Search, X } from "lucide-react"

import { FilterDropdown, FilterOption } from "@/components/ui/filter-dropdown"
import { STATUS, PRIORITY } from "@/lib/design-tokens"
import type { TaskFilters } from "@/hooks/use-task-filters"
import type { TaskStatus, TaskPriority } from "@/types/task"

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
    <div className="flex flex-wrap items-center gap-2">
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

      <span className="ml-auto text-xs text-muted-foreground">
        {hasActiveFilters ? `${filteredCount} of ${totalCount}` : totalCount} tasks
      </span>
    </div>
  )
}
