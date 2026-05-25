'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { NAVO_DATA } from '@/lib/data'
import { useLanguage, useT, CAT_DISPLAY } from '@/lib/i18n'
import { useTheme } from '@/lib/ThemeProvider'
import BreakingTicker from './BreakingTicker'

const LANG_LABELS = { en: 'EN', ru: 'РУ', tj: 'ТҶ' }
const LANG_NAMES  = { en: 'English', ru: 'Русский', tj: 'Тоҷикӣ' }

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function LangSwitcher() {
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useLanguage()

  useEffect(() => {
    const close = (e) => { if (!e.target.closest('[data-lang-switcher]')) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div data-lang-switcher="" className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 text-[12px] font-bold border rounded px-2.5 py-1.5 cursor-pointer transition-all bg-transparent
          ${open
            ? 'border-primary text-primary dark:text-primary'
            : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 hover:border-primary hover:text-primary'
          }`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        {LANG_LABELS[lang]}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 right-0 z-50 bg-white dark:bg-[#161b2e] border border-gray-300 dark:border-gray-600 rounded-md shadow-xl overflow-hidden min-w-[130px]">
          {Object.entries(LANG_NAMES).map(([code, name]) => (
            <button key={code} onClick={() => { setLang(code); setOpen(false) }}
              className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left text-[13px] cursor-pointer transition-colors border-none"
              style={{
                background: lang === code ? (document.documentElement.classList.contains('dark') ? '#1e2538' : '#F7F8FA') : 'transparent',
                color: lang === code ? '#323F90' : undefined,
                fontWeight: lang === code ? 700 : 400,
                borderLeft: lang === code ? '3px solid #323F90' : '3px solid transparent',
              }}
            >
              <span className="text-[11px] font-bold tracking-wide text-gray-500 min-w-[22px]">{LANG_LABELS[code]}</span>
              <span className="dark:text-gray-200">{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { lang } = useLanguage()
  const t = useT()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
      setMobileOpen(false)
    }
  }

  const isActive = (cat) => pathname === `/category/${cat}`
  const catNames = CAT_DISPLAY[lang] || CAT_DISPLAY.en

  return (
    <header className={`sticky top-0 z-[1000] bg-white dark:bg-[#0d0f17] transition-all duration-300
      ${scrolled ? 'border-b border-gray-300 dark:border-gray-700 shadow-sm dark:shadow-gray-900/60' : 'border-b border-transparent'}`}>
      <div className="max-w-content mx-auto px-4 md:px-6 flex items-center h-16 gap-4">

        <span onClick={() => { router.push('/'); setMobileOpen(false) }}
          className="cursor-pointer shrink-0 flex items-center"
        >
          <img src="/logo.png" alt="NAVO" className="h-8 md:h-9 w-auto object-contain dark:brightness-0 dark:invert" />
        </span>

        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center flex-wrap overflow-hidden">
          {NAVO_DATA.categories.map(cat => (
            <button key={cat} onClick={() => router.push(`/category/${cat}`)}
              className={`text-[13px] px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer border-none
                ${isActive(cat)
                  ? 'bg-primary/10 font-bold text-primary'
                  : 'font-medium text-gray-900 dark:text-gray-300 hover:text-secondary hover:bg-secondary/10'
                }`}
            >{catNames[cat] || cat}</button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto lg:ml-0">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-1.5">
              <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('nav.search_placeholder')}
                className="text-[13px] border border-primary rounded px-3 py-1.5 outline-none w-44 text-gray-900 dark:text-white dark:bg-[#161b2e] dark:border-primary/70"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="bg-transparent border-none cursor-pointer text-gray-400 text-lg leading-none hover:text-gray-700 dark:hover:text-gray-200">✕</button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="bg-transparent border-none cursor-pointer p-1.5 text-gray-900 dark:text-gray-300 flex items-center hover:text-secondary transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          )}
          <LangSwitcher />
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="bg-transparent border-none cursor-pointer p-1.5 text-gray-700 dark:text-yellow-300 flex items-center hover:text-secondary dark:hover:text-yellow-200 transition-colors"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-1 ml-auto">
          <button onClick={() => setSearchOpen(s => !s)} className="bg-transparent border-none cursor-pointer p-2 text-gray-900 dark:text-gray-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button onClick={toggleTheme} className="bg-transparent border-none cursor-pointer p-2 text-gray-700 dark:text-yellow-300">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={() => setMobileOpen(o => !o)} className="bg-transparent border-none cursor-pointer p-2 text-gray-900 dark:text-gray-300">
            {mobileOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            }
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden px-4 pb-3 border-b border-gray-100 dark:border-gray-700 dark:bg-[#0d0f17]">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('nav.search_placeholder')}
              className="flex-1 text-sm border border-primary rounded px-3 py-2 outline-none text-gray-900 dark:text-white dark:bg-[#161b2e] dark:border-primary/70"
            />
            <button type="submit" className="bg-primary text-white text-sm font-semibold border-none rounded px-4 py-2 cursor-pointer">{t('search.button')}</button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0d0f17] border-t border-gray-100 dark:border-gray-700 shadow-lg">
          <div className="px-4 py-3 grid grid-cols-2 gap-1">
            {NAVO_DATA.categories.map(cat => (
              <button key={cat} onClick={() => { router.push(`/category/${cat}`); setMobileOpen(false) }}
                className={`text-left text-[14px] font-medium px-3 py-2.5 rounded cursor-pointer border-none transition-all
                  ${isActive(cat) ? 'bg-primary/10 text-primary font-bold' : 'text-gray-900 dark:text-gray-300 hover:bg-soft dark:hover:bg-[#161b2e]'}`}
              >{catNames[cat] || cat}</button>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <LangSwitcher />
          </div>
        </div>
      )}

      <BreakingTicker />
    </header>
  )
}
