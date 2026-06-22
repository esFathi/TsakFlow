import { FolderOpen } from "lucide-react"

interface ProjectEmptyStateProps {
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function ProjectEmptyState({ hasActiveFilters, onClearFilters }: ProjectEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface-0 py-20 text-center shadow-xs">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
        <FolderOpen className="size-5 text-muted-foreground" />
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">
          {hasActiveFilters ? "No projects match your filters" : "No projects yet"}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {hasActiveFilters
            ? "Try adjusting or clearing your filters."
            : "Create your first project to get started."}
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
