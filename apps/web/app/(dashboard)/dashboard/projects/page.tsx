"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectsFilterBar } from "@/components/projects/projects-filter-bar"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectListRow } from "@/components/projects/project-list-row"
import { ProjectEmptyState } from "@/components/projects/project-empty-state"
import { useProjectFilters } from "@/hooks/use-project-filters"
import { MOCK_PROJECTS } from "@/lib/mock/projects"

export default function ProjectsPage() {
  const {
    filters,
    sort,
    view,
    filtered,
    hasActiveFilters,
    setSearch,
    toggleStatus,
    toggleSort,
    setView,
    clearFilters,
  } = useProjectFilters(MOCK_PROJECTS)

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Projects</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Track progress and manage your team&apos;s projects.
          </p>
        </div>
        <Button size="sm" className="shrink-0">
          <Plus className="size-3.5" />
          New Project
        </Button>
      </div>

      {/* Filter bar */}
      <ProjectsFilterBar
        filters={filters}
        sort={sort}
        view={view}
        hasActiveFilters={hasActiveFilters}
        totalCount={MOCK_PROJECTS.length}
        filteredCount={filtered.length}
        onSearchChange={setSearch}
        onStatusToggle={toggleStatus}
        onSortChange={toggleSort}
        onViewChange={setView}
        onClearFilters={clearFilters}
      />

      {/* Content */}
      {filtered.length === 0 ? (
        <ProjectEmptyState
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-surface-0 shadow-xs">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Project</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground md:table-cell">Progress</th>
                <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground sm:table-cell">Tasks</th>
                <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground lg:table-cell">Members</th>
                <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground lg:table-cell">Due</th>
                <th className="w-10 px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <ProjectListRow key={project.id} project={project} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
