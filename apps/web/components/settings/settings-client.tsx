"use client"

import { useState } from "react"

import { SettingsNav, type SettingsTabId } from "./settings-nav"
import { ProfileSection } from "./sections/profile-section"
import { AppearanceSection } from "./sections/appearance-section"
import { NotificationsSection } from "./sections/notifications-section"
import { AccountSection } from "./sections/account-section"

const SECTION_MAP: Record<SettingsTabId, React.ReactNode> = {
  profile:       <ProfileSection />,
  appearance:    <AppearanceSection />,
  notifications: <NotificationsSection />,
  account:       <AccountSection />,
}

export function SettingsClient() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("profile")

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Manage your account preferences and configuration.
        </p>
      </div>

      {/* Layout: nav left, content right */}
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
        <aside className="w-full shrink-0 lg:w-44">
          <SettingsNav active={activeTab} onChange={setActiveTab} />
        </aside>
        <div className="min-w-0 flex-1">{SECTION_MAP[activeTab]}</div>
      </div>
    </div>
  )
}
