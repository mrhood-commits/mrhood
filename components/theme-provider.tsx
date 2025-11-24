"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Detectar el tema del sistema y establecerlo como tema inicial
  useEffect(() => {
    // Verificar si el sistema está en modo oscuro
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

    // Establecer el tema basado en la preferencia del sistema
    const initialTheme = isDarkMode ? "dark" : "light"

    // Guardar la preferencia en localStorage
    localStorage.setItem("theme", initialTheme)

    // Aplicar la clase al elemento html
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem={false} {...props}>
      {children}
    </NextThemesProvider>
  )
}
