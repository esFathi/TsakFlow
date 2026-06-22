import { Users } from "lucide-react"

interface TeamEmptyStateProps {
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function TeamEmptyState({ hasActiveFilters, onClearFilters }: TeamEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface-0 py-20 text-center shadow-xs">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
        <Users className="size-5 text-muted-foreground" />
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">
          {hasActiveFilters ? "No members match your filters" : "No team members yet"}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {hasActiveFilters
            ? "Try adjusting or clearing your filters."
            : "Invite your first teammate to get started."}
        </p>
      </div>
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="text-xs text-primary hover:underline focus-visible:outline-none"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
