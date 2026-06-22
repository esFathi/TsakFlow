"use client"

import { useState, useMemo, useCallback } from "react"

import type { TaskStatus, TaskPriority } from "@/types/task"
import type { TaskWithMeta } from "@/lib/mock/tasks"
import { useDebounce } from "./use-debounce"

export interface TaskFilters {
  search: string
  statuses: TaskStatus[]
  priorities: TaskPriority[]
}

export type SortField = "title" | "status" | "priority" | "dueDate" | "createdAt"
export type SortDirection = "asc" | "desc"

export interface SortConfig {
  field: SortField
  direction: SortDirection
}

const DEFAULT_FILTERS: TaskFilters = { search: "", statuses: [], priorities: [] }
const DEFAULT_SORT: SortConfig = { field: "createdAt", direction: "desc" }

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  urgent: 0, high: 1, medium: 2, low: 3, none: 4,
}

const STATUS_ORDER: Record<TaskStatus, number> = {
  blocked: 0, in_progress: 1, in_review: 2, todo: 3, done: 4, cancelled: 5,
}

export function useTaskFilters(tasks: TaskWithMeta[]) {
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortConfig>(DEFAULT_SORT)

  const debouncedSearch = useDebounce(filters.search, 250)

  const filtered = useMemo(() => {
    let result = [...tasks]

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.projectName.toLowerCase().includes(q),
      )
    }

    if (filters.statuses.length > 0) {
      result = result.filter((t) => filters.statuses.includes(t.status))
    }

    if (filters.priorities.length > 0) {
      result = result.filter((t) => filters.priorities.includes(t.priority))
    }

    result.sort((a, b) => {
      let cmp = 0
      switch (sort.field) {
        case "title":
          cmp = a.title.localeCompare(b.title)
          break
        case "status":
          cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
          break
        case "priority":
          cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
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
  }, [tasks, debouncedSearch, filters.statuses, filters.priorities, sort])

  const toggleSort = useCallback((field: SortField) => {
    setSort((prev) =>
      prev.field === field
        ? { field, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { field, direction: "asc" },
    )
  }, [])

  const toggleStatus = useCallback((status: TaskStatus) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }))
  }, [])

  const togglePriority = useCallback((priority: TaskPriority) => {
    setFilters((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter((p) => p !== priority)
        : [...prev.priorities, priority],
    }))
  }, [])

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }, [])

  const clearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  const hasActiveFilters =
    filters.search !== "" ||
    filters.statuses.length > 0 ||
    filters.priorities.length > 0

  return {
    filters,
    sort,
    filtered,
    hasActiveFilters,
    toggleSort,
    toggleStatus,
    togglePriority,
    setSearch,
    clearFilters,
  }
}
