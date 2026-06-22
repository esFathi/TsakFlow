"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, Loader2, Eye, EyeOff, TriangleAlert } from "lucide-react"

import { SectionCard } from "@/components/settings/section-card"
import { FormField } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { passwordSchema, type PasswordFormData } from "@/lib/validations/settings"

// ─── ChangePasswordForm ───────────────────────────────────────────────────────

function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PasswordFormData>({ resolver: zodResolver(passwordSchema) })

  const onSubmit = async (_data: PasswordFormData) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setIsLoading(false)
    setSaved(true)
    reset()
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Current password" htmlFor="current" error={errors.current?.message} required>
          <div className="relative">
            <Input
              id="current"
              type={showCurrent ? "text" : "password"}
              placeholder="••••••••"
              state={errors.current ? "error" : "default"}
              className="pr-10"
              autoComplete="current-password"
              {...register("current")}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowCurrent((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none"
            >
              {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </FormField>

        <FormField label="New password" htmlFor="next" error={errors.next?.message} required>
          <div className="relative">
            <Input
              id="next"
              type={showNext ? "text" : "password"}
              placeholder="••••••••"
              state={errors.next ? "error" : "default"}
              className="pr-10"
              autoComplete="new-password"
              {...register("next")}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowNext((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none"
            >
              {showNext ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </FormField>
      </div>

      <FormField label="Confirm new password" htmlFor="confirm" error={errors.confirm?.message} required>
        <Input
          id="confirm"
          type="password"
          placeholder="••••••••"
          state={errors.confirm ? "error" : "default"}
          className="max-w-sm"
          autoComplete="new-password"
          {...register("confirm")}
        />
      </FormField>

      <div className="flex items-center gap-3">
        <Button type="submit" size="sm" disabled={isLoading || !isDirty}>
          {isLoading ? (
            <><Loader2 className="animate-spin" />Updating…</>
          ) : (
            "Update password"
          )}
        </Button>
        {saved && (
          <span className="flex items-center gap-1 text-xs text-green-500">
            <CheckCircle2 className="size-3.5" />
            Password updated
          </span>
        )}
      </div>
    </form>
  )
}

// ─── DangerZone ───────────────────────────────────────────────────────────────

function DangerZone() {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3 rounded-lg bg-destructive/5 p-4">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
        <div>
          <p className="text-sm font-medium text-foreground">Delete account</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>
      </div>
      {!confirmed ? (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="w-fit"
          onClick={() => setConfirmed(true)}
        >
          Delete my account
        </Button>
      ) : (
        <div className="flex items-center gap-3">
          <Button type="button" variant="destructive" size="sm">
            Yes, delete permanently
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setConfirmed(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  )
}

// ─── AccountSection ───────────────────────────────────────────────────────────

export function AccountSection() {
  return (
    <div className="flex flex-col gap-4">
      <SectionCard title="Change password" description="Choose a strong password you don't use elsewhere.">
        <ChangePasswordForm />
      </SectionCard>

      <SectionCard title="Danger zone" danger>
        <DangerZone />
      </SectionCard>
    </div>
  )
}
