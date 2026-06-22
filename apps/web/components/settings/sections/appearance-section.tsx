"use client"

import { Sun, Moon, Monitor, Check } from "lucide-react"

import { SectionCard } from "@/components/settings/section-card"
import { useAppDispatch, useAppSelector } from "@/hooks/use-app-dispatch"
import { setTheme } from "@/store/slices/ui.slice"
import { cn } from "@/lib/utils"

const THEMES = [
  { value: "light",  label: "Light",  icon: Sun,     description: "Clean white interface" },
  { value: "dark",   label: "Dark",   icon: Moon,    description: "Easy on the eyes"      },
  { value: "system", label: "System", icon: Monitor, description: "Follows your OS setting" },
] as const

type ThemeValue = "light" | "dark" | "system"

export function AppearanceSection() {
  const dispatch = useAppDispatch()
  const current = useAppSelector((s) => s.ui.theme) as ThemeValue

  return (
    <SectionCard
      title="Appearance"
      description="Choose how TaskFlow looks on your device."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {THEMES.map(({ value, label, icon: Icon, description }) => {
          const active = current === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => dispatch(setTheme(value))}
              className={cn(
                "relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40 hover:bg-muted/50",
              )}
            >
              {active && (
                <span className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                  <Check className="size-2.5 text-primary-foreground" />
                </span>
              )}
              <Icon
                className={cn(
                  "size-5",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              />
              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    active ? "text-primary" : "text-foreground",
                  )}
                >
                  {label}
                </p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </SectionCard>
  )
}
