"use client"

import { Search, X, LayoutGrid, List } from "lucide-react"

import { FilterDropdown, FilterOption } from "@/components/ui/filter-dropdown"
import { PROJECT_STATUS } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import type { ProjectFilters, ProjectSortField, ProjectSortConfig, ProjectView } from "@/hooks/use-project-filters"
import type { ProjectStatus } from "@/types/project"

const SORT_OPTIONS: { value: ProjectSortField; label: string }[] = [
  { value: "createdAt", label: "Date created" },
  { value: "name",      label: "Name (A–Z)"   },
  { value: "status",    label: "Status"        },
  { value: "dueDate",   label: "Due date"      },
  { value: "taskCount", label: "Task count"    },
]

interface ProjectsFilterBarProps {
  filters: ProjectFilters
  sort: ProjectSortConfig
  view: ProjectView
  hasActiveFilters: boolean
  totalCount: number
  filteredCount: number
  onSearchChange: (v: string) => void
  onStatusToggle: (s: ProjectStatus) => void
  onSortChange: (f: ProjectSortField) => void
  onViewChange: (v: ProjectView) => void
  onClearFilters: () => void
}

export function ProjectsFilterBar({
  filters,
  sort,
  view,
  hasActiveFilters,
  totalCount,
  filteredCount,
  onSearchChange,
  onStatusToggle,
  onSortChange,
  onViewChange,
  onClearFilters,
}: ProjectsFilterBarProps) {
  const allStatuses = Object.entries(PROJECT_STATUS) as [
    ProjectStatus,
    (typeof PROJECT_STATUS)[ProjectStatus],
  ][]

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search */}
      <div className="relative min-w-[200px] flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search projects…"
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

      {/* Sort */}
      <select
        value={sort.field}
        onChange={(e) => onSortChange(e.target.value as ProjectSortField)}
        className="h-8 rounded-lg border border-border bg-transparent px-2.5 text-xs text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Sort projects"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Clear */}
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
      <span className="text-xs text-muted-foreground">
        {hasActiveFilters ? `${filteredCount} of ${totalCount}` : totalCount} projects
      </span>

      {/* View toggle */}
      <div className="ml-auto flex items-center rounded-lg border border-border p-0.5">
        {(["grid", "list"] as ProjectView[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onViewChange(v)}
            aria-label={`${v} view`}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              view === v
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {v === "grid" ? <LayoutGrid className="size-3.5" /> : <List className="size-3.5" />}
          </button>
        ))}
      </div>
    </div>
  )
}
