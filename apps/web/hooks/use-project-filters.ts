"use client"

import { useState, useMemo, useCallback } from "react"

import type { ProjectStatus } from "@/types/project"
import type { ProjectWithMeta } from "@/lib/mock/projects"
import { useDebounce } from "./use-debounce"

export type ProjectView = "grid" | "list"
export type ProjectSortField = "name" | "status" | "dueDate" | "taskCount" | "createdAt"

export interface ProjectFilters {
  search: string
  statuses: ProjectStatus[]
}

export interface ProjectSortConfig {
  field: ProjectSortField
  direction: "asc" | "desc"
}

const DEFAULT_FILTERS: ProjectFilters = { search: "", statuses: [] }
const DEFAULT_SORT: ProjectSortConfig = { field: "createdAt", direction: "desc" }

const STATUS_ORDER: Record<ProjectStatus, number> = {
  active: 0, on_hold: 1, completed: 2, archived: 3,
}

export function useProjectFilters(projects: ProjectWithMeta[]) {
  const [filters, setFilters] = useState<ProjectFilters>(DEFAULT_FILTERS)
  const [sort, setSortState] = useState<ProjectSortConfig>(DEFAULT_SORT)
  const [view, setView] = useState<ProjectView>("grid")

  const debouncedSearch = useDebounce(filters.search, 250)

  const filtered = useMemo(() => {
    let result = [...projects]

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)),
      )
    }

    if (filters.statuses.length > 0) {
      result = result.filter((p) => filters.statuses.includes(p.status))
    }

    result.sort((a, b) => {
      let cmp = 0
      switch (sort.field) {
        case "name":
          cmp = a.name.localeCompare(b.name)
          break
        case "status":
          cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
          break
        case "taskCount":
          cmp = a.taskCount - b.taskCount
          break
        case "dueDate":
          if (!a.dueDate && !b.dueDate) { cmp = 0; break }
          if (!a.dueDate) { cmp = 1; break }
          if (!b.dueDate) { cmp = -1; break }
          cmp = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          break
        case "createdAt":
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }
      return sort.direction === "asc" ? cmp : -cmp
    })

    return result
  }, [projects, debouncedSearch, filters.statuses, sort])

  const toggleSort = useCallback((field: ProjectSortField) => {
    setSortState((prev) =>
      prev.field === field
        ? { field, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { field, direction: "asc" },
    )
  }, [])

  const toggleStatus = useCallback((status: ProjectStatus) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }))
  }, [])

  const setSearch = useCallback(
    (search: string) => setFilters((prev) => ({ ...prev, search })),
    [],
  )

  const clearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  const hasActiveFilters = filters.search !== "" || filters.statuses.length > 0

  return {
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
  }
}
