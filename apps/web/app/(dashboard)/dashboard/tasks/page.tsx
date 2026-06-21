import type { Metadata } from "next"
export const metadata: Metadata = { title: "Tasks" }
export default function TasksPage() {
  return <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
}
