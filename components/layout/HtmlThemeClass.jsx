'use client'
import { useEffect } from 'react'
import { useTheme } from '@/lib/ThemeProvider'

export default function HtmlThemeClass() {
  const { theme } = useTheme()
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  return null
}
