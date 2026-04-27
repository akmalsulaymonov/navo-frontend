'use client'
import { useState } from 'react'
import { LanguageContext } from './i18n'

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ru')
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
