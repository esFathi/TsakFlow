"use client"

import { Search, X, LayoutGrid, List } from "lucide-react"

import { FilterDropdown, FilterOption } from "@/components/ui/filter-dropdown"
import { ROLE } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import type { TeamFilters, TeamSortField, TeamSortConfig, TeamView } from "@/hooks/use-team-filters"
import type { UserRole } from "@/types/user"

const SORT_OPTIONS: { value: TeamSortField; label: string }[] = [
  { value: "joinedAt",  label: "Date joined"  },
  { value: "name",      label: "Name (A–Z)"   },
  { value: "role",      label: "Role"          },
  { value: "taskCount", label: "Task count"    },
]

interface TeamFilterBarProps {
  filters: TeamFilters
  sort: TeamSortConfig
  view: TeamView
  hasActiveFilters: boolean
  totalCount: number
  filteredCount: number
  onSearchChange: (v: string) => void
  onRoleToggle: (r: UserRole) => void
  onSortChange: (f: TeamSortField) => void
  onViewChange: (v: TeamView) => void
  onClearFilters: () => void
}

export function TeamFilterBar({
  filters,
  sort,
  view,
  hasActiveFilters,
  totalCount,
  filteredCount,
  onSearchChange,
  onRoleToggle,
  onSortChange,
  onViewChange,
  onClearFilters,
}: TeamFilterBarProps) {
  const allRoles = Object.entries(ROLE) as [UserRole, (typeof ROLE)[UserRole]][]

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search */}
      <div className="relative min-w-[200px] flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search members…"
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 w-full rounded-lg border border-border bg-transparent pl-8 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* Role filter */}
      <FilterDropdown label="Role" active={filters.roles.length > 0}>
        {allRoles.map(([key, token]) => (
          <FilterOption
            key={key}
            label={token.label}
            checked={filters.roles.includes(key)}
            onToggle={() => onRoleToggle(key)}
          />
        ))}
      </FilterDropdown>

      {/* Sort */}
      <select
        value={sort.field}
        onChange={(e) => onSortChange(e.target.value as TeamSortField)}
        className="h-8 rounded-lg border border-border bg-transparent px-2.5 text-xs text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Sort members"
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
        {hasActiveFilters ? `${filteredCount} of ${totalCount}` : totalCount} members
      </span>

      {/* View toggle */}
      <div className="ml-auto flex items-center rounded-lg border border-border p-0.5">
        {(["grid", "list"] as TeamView[]).map((v) => (
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
