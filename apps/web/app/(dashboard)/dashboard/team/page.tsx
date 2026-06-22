"use client"

import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TeamStats } from "@/components/team/team-stats"
import { TeamFilterBar } from "@/components/team/team-filter-bar"
import { TeamMemberCard } from "@/components/team/team-member-card"
import { TeamMemberRow } from "@/components/team/team-member-row"
import { TeamEmptyState } from "@/components/team/team-empty-state"
import { useTeamFilters } from "@/hooks/use-team-filters"
import { MOCK_TEAM } from "@/lib/mock/team"

export default function TeamPage() {
  const {
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
  } = useTeamFilters(MOCK_TEAM)

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Team</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage members, roles, and project assignments.
          </p>
        </div>
        <Button size="sm" className="shrink-0">
          <UserPlus className="size-3.5" />
          Invite member
        </Button>
      </div>

      {/* Stats summary */}
      <TeamStats members={MOCK_TEAM} />

      {/* Filter bar */}
      <TeamFilterBar
        filters={filters}
        sort={sort}
        view={view}
        hasActiveFilters={hasActiveFilters}
        totalCount={MOCK_TEAM.length}
        filteredCount={filtered.length}
        onSearchChange={setSearch}
        onRoleToggle={toggleRole}
        onSortChange={toggleSort}
        onViewChange={setView}
        onClearFilters={clearFilters}
      />

      {/* Content */}
      {filtered.length === 0 ? (
        <TeamEmptyState
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-surface-0 shadow-xs">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Member</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Role</th>
                <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground sm:table-cell">Status</th>
                <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground md:table-cell">Projects</th>
                <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground lg:table-cell">Tasks</th>
                <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground lg:table-cell">Joined</th>
                <th className="w-10 px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <TeamMemberRow key={member.id} member={member} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
