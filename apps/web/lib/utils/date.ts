export function formatDueDate(dueDate: string): string {
  const due = new Date(dueDate)
  const now = new Date()
  const diffDays = Math.ceil((due.setHours(0,0,0,0) - now.setHours(0,0,0,0)) / 86_400_000)

  if (diffDays < 0)  return "Overdue"
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays <= 7)  return `In ${diffDays} days`

  return due.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
