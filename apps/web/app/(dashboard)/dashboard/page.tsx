import type { Metadata } from "next"
import {
  ClipboardList,
  Timer,
  CheckCircle2,
  FolderKanban,
} from "lucide-react"

import { DashboardGreeting } from "@/components/dashboard/greeting"
import { StatCard } from "@/components/dashboard/stat-card"
import { RecentTasks } from "@/components/dashboard/recent-tasks"
import { ActiveProjects } from "@/components/dashboard/active-projects"
import {
  DASHBOARD_STATS,
  RECENT_TASKS,
  ACTIVE_PROJECTS,
} from "@/lib/mock/dashboard"
import type { DashboardStat } from "@/lib/mock/dashboard"

export const metadata: Metadata = { title: "Dashboard" }

const STAT_ICONS: Record<string, React.ReactNode> = {
  total:     <ClipboardList className="size-4" />,
  progress:  <Timer className="size-4" />,
  completed: <CheckCircle2 className="size-4" />,
  projects:  <FolderKanban className="size-4" />,
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardGreeting />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat: DashboardStat) => (
          <StatCard key={stat.id} stat={stat} icon={STAT_ICONS[stat.id]} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RecentTasks tasks={RECENT_TASKS} />
        </div>
        <div className="xl:col-span-2">
          <ActiveProjects projects={ACTIVE_PROJECTS} />
        </div>
      </div>
    </div>
  )
}
