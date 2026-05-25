'use client'
import { useState, createContext, useContext, useEffect } from 'react'

export const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })
export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('navo-theme')
      if (saved === 'dark') setTheme('dark')
    } catch {}
  }, [])

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      try { localStorage.setItem('navo-theme', next) } catch {}
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
