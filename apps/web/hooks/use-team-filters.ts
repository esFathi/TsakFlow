"use client"

import { useState, useMemo, useCallback } from "react"

import type { UserRole } from "@/types/user"
import type { TeamMember } from "@/lib/mock/team"
import { useDebounce } from "./use-debounce"

export type TeamView = "grid" | "list"
export type TeamSortField = "name" | "role" | "joinedAt" | "taskCount"

export interface TeamFilters {
  search: string
  roles: UserRole[]
}

export interface TeamSortConfig {
  field: TeamSortField
  direction: "asc" | "desc"
}

const DEFAULT_FILTERS: TeamFilters = { search: "", roles: [] }
const DEFAULT_SORT: TeamSortConfig = { field: "joinedAt", direction: "asc" }

const ROLE_ORDER: Record<UserRole, number> = {
  admin: 0, manager: 1, member: 2, viewer: 3,
}

export function useTeamFilters(members: TeamMember[]) {
  const [filters, setFilters] = useState<TeamFilters>(DEFAULT_FILTERS)
  const [sort, setSortState] = useState<TeamSortConfig>(DEFAULT_SORT)
  const [view, setView] = useState<TeamView>("grid")

  const debouncedSearch = useDebounce(filters.search, 250)

  const filtered = useMemo(() => {
    let result = [...members]

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q),
      )
    }

    if (filters.roles.length > 0) {
      result = result.filter((m) => filters.roles.includes(m.role))
    }

    result.sort((a, b) => {
      let cmp = 0
      switch (sort.field) {
        case "name":
          cmp = a.name.localeCompare(b.name)
          break
        case "role":
          cmp = ROLE_ORDER[a.role] - ROLE_ORDER[b.role]
          break
        case "taskCount":
          cmp = a.taskCount - b.taskCount
          break
        case "joinedAt":
          cmp = new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime()
          break
      }
      return sort.direction === "asc" ? cmp : -cmp
    })

    return result
  }, [members, debouncedSearch, filters.roles, sort])

  const toggleSort = useCallback((field: TeamSortField) => {
    setSortState((prev) =>
      prev.field === field
        ? { field, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { field, direction: "asc" },
    )
  }, [])

  const toggleRole = useCallback((role: UserRole) => {
    setFilters((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }))
  }, [])

  const setSearch = useCallback(
    (search: string) => setFilters((prev) => ({ ...prev, search })),
    [],
  )

  const clearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  const hasActiveFilters = filters.search !== "" || filters.roles.length > 0

  return {
    filters,
    sort,
    view,
    filtered,
    hasActiveFilters,
    setSearch,
    toggleRole,
    toggleSort,
    setView,
    clearFilters,
  }
}
