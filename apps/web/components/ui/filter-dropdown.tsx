"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface FilterDropdownProps {
  label: string
  active: boolean
  children: React.ReactNode
}

export function FilterDropdown({ label, active, children }: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          active
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-border bg-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground",
        )}
      >
        {label}
        {active && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            ✓
          </span>
        )}
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1.5 min-w-[160px] rounded-xl border border-border bg-surface-0 p-1.5 shadow-md">
          {children}
        </div>
      )}
    </div>
  )
}

interface FilterOptionProps {
  label: string
  checked: boolean
  onToggle: () => void
  colorClass?: string
}

export function FilterOption({ label, checked, onToggle, colorClass }: FilterOptionProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-muted",
        checked ? "text-foreground" : "text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-colors",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-transparent",
        )}
      >
        {checked && (
          <svg viewBox="0 0 8 8" className="size-2.5 fill-current">
            <path
              d="M1 4l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {colorClass && (
        <span className={cn("size-2 shrink-0 rounded-full bg-current", colorClass)} />
      )}
      {label}
    </button>
  )
}
