'use client'
import LanguageProvider from './LanguageProvider'
import ThemeProvider from './ThemeProvider'
import HtmlThemeClass from '@/components/layout/HtmlThemeClass'

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HtmlThemeClass />
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
