import type { Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard" }

export default function DashboardPage() {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Welcome back — here's what's happening.</p>
    </div>
  )
}
