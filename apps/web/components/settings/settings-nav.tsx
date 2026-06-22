import { User, Palette, Bell, Shield } from "lucide-react"

import { cn } from "@/lib/utils"

export const SETTINGS_TABS = [
  { id: "profile",       label: "Profile",       icon: User    },
  { id: "appearance",    label: "Appearance",    icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell    },
  { id: "account",       label: "Account",       icon: Shield  },
] as const

export type SettingsTabId = (typeof SETTINGS_TABS)[number]["id"]

interface SettingsNavProps {
  active: SettingsTabId
  onChange: (tab: SettingsTabId) => void
}

export function SettingsNav({ active, onChange }: SettingsNavProps) {
  return (
    <nav className="flex flex-row gap-1 lg:flex-col" aria-label="Settings navigation">
      {SETTINGS_TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active === id
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Icon className="size-4 shrink-0" />
          {label}
        </button>
      ))}
    </nav>
  )
}
