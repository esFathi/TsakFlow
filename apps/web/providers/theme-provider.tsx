"use client"

import { useEffect } from "react"
import { useAppSelector } from "@/hooks/use-app-dispatch"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector(s => s.ui.theme)

  useEffect(() => {
    const root = document.documentElement
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = theme === "dark" || (theme === "system" && prefersDark)
    root.classList.toggle("dark", isDark)
  }, [theme])

  return <>{children}</>
}
