import { ClipboardList } from "lucide-react"

interface EmptyStateProps {
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function EmptyState({ hasActiveFilters, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface-0 py-16 text-center shadow-xs">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
        <ClipboardList className="size-5 text-muted-foreground" />
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">
          {hasActiveFilters ? "No tasks match your filters" : "No tasks yet"}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {hasActiveFilters
            ? "Try adjusting or clearing your filters."
            : "Create your first task to get started."}
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
