import { cn } from "@/lib/utils"

interface ToggleSwitchProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label: string
  description?: string
}

export function ToggleSwitch({
  id,
  checked,
  onChange,
  disabled = false,
  label,
  description,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium cursor-pointer",
            disabled ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-primary" : "bg-muted-foreground/30",
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </button>
    </div>
  )
}
