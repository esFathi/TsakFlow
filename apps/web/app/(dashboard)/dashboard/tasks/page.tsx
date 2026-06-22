"use client"

import type { Metadata } from "next"
import { Plus } from "lucide-react"

import { FilterBar } from "@/components/tasks/filter-bar"
import { TaskTable } from "@/components/tasks/task-table"
import { EmptyState } from "@/components/tasks/empty-state"
import { Button } from "@/components/ui/button"
import { useTaskFilters } from "@/hooks/use-task-filters"
import { MOCK_TASKS } from "@/lib/mock/tasks"

export default function TasksPage() {
  const {
    filters,
    sort,
    filtered,
    hasActiveFilters,
    toggleSort,
    toggleStatus,
    togglePriority,
    setSearch,
    clearFilters,
  } = useTaskFilters(MOCK_TASKS)

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Tasks</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage and track all your tasks across projects.
          </p>
        </div>
        <Button size="sm" className="shrink-0">
          <Plus className="size-3.5" />
          New Task
        </Button>
      </div>

      {/* Filter bar */}
      <FilterBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        totalCount={MOCK_TASKS.length}
        filteredCount={filtered.length}
        onSearchChange={setSearch}
        onStatusToggle={toggleStatus}
        onPriorityToggle={togglePriority}
        onClearFilters={clearFilters}
      />

      {/* Task list */}
      {filtered.length === 0 ? (
        <EmptyState
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      ) : (
        <TaskTable
          tasks={filtered}
          sort={sort}
          onToggleSort={toggleSort}
        />
      )}
    </div>
  )
}
