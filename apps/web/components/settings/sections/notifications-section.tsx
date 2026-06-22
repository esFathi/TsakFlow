"use client"

import { useState } from "react"

import { SectionCard } from "@/components/settings/section-card"
import { ToggleSwitch } from "@/components/ui/toggle-switch"

interface NotifState {
  emailDigest: boolean
  taskAssigned: boolean
  taskStatusChanged: boolean
  projectUpdates: boolean
  mentions: boolean
  weeklyReport: boolean
}

const INITIAL: NotifState = {
  emailDigest: true,
  taskAssigned: true,
  taskStatusChanged: false,
  projectUpdates: true,
  mentions: true,
  weeklyReport: false,
}

export function NotificationsSection() {
  const [notifs, setNotifs] = useState<NotifState>(INITIAL)

  const toggle = (key: keyof NotifState) =>
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="flex flex-col gap-4">
      <SectionCard
        title="Email notifications"
        description="Control which emails TaskFlow sends to your inbox."
      >
        <div className="divide-y divide-border/50">
          <ToggleSwitch
            id="emailDigest"
            label="Daily digest"
            description="A summary of your tasks and activity every morning."
            checked={notifs.emailDigest}
            onChange={() => toggle("emailDigest")}
          />
          <ToggleSwitch
            id="weeklyReport"
            label="Weekly report"
            description="Project progress and team stats every Monday."
            checked={notifs.weeklyReport}
            onChange={() => toggle("weeklyReport")}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="In-app notifications"
        description="Notifications shown inside TaskFlow while you work."
      >
        <div className="divide-y divide-border/50">
          <ToggleSwitch
            id="taskAssigned"
            label="Task assigned to me"
            description="When someone assigns a task to you."
            checked={notifs.taskAssigned}
            onChange={() => toggle("taskAssigned")}
          />
          <ToggleSwitch
            id="taskStatusChanged"
            label="Task status changed"
            description="When a task you own or follow changes status."
            checked={notifs.taskStatusChanged}
            onChange={() => toggle("taskStatusChanged")}
          />
          <ToggleSwitch
            id="projectUpdates"
            label="Project updates"
            description="When a project you're part of is updated."
            checked={notifs.projectUpdates}
            onChange={() => toggle("projectUpdates")}
          />
          <ToggleSwitch
            id="mentions"
            label="Mentions"
            description="When someone @mentions you in a comment or description."
            checked={notifs.mentions}
            onChange={() => toggle("mentions")}
          />
        </div>
      </SectionCard>
    </div>
  )
}
