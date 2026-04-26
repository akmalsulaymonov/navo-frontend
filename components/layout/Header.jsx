'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { C } from '@/lib/constants'
import { NAVO_DATA } from '@/lib/data'
import BreakingTicker from './BreakingTicker'

const LANG_LABELS = { en: 'EN', ru: 'RU', tj: 'TJ' }
const LANG_NAMES  = { en: 'English', ru: 'Русский', tj: 'Тоҷикӣ' }

function LangSwitcher() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const close = (e) => { if (!e.target.closest('[data-lang-switcher]')) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div data-lang-switcher="" style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700,
          background: 'none', border: `1px solid ${open ? '#323F90' : '#CCCCCC'}`,
          color: open ? '#323F90' : '#1A1A1A',
          borderRadius: 4, padding: '6px 10px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.15s', letterSpacing: 0.5,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#323F90'; e.currentTarget.style.color = '#323F90' }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.borderColor = '#CCCCCC'; e.currentTarget.style.color = '#1A1A1A' } }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        {LANG_LABELS[lang]}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 500, background: '#fff', border: '1px solid #CCCCCC', borderRadius: 6, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: 130 }}>
          {Object.entries(LANG_NAMES).map(([code, name]) => (
            <button key={code} onClick={() => { setLang(code); setOpen(false) }} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px',
              background: lang === code ? '#F7F8FA' : '#fff', border: 'none', cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: lang === code ? '#323F90' : '#1A1A1A',
              fontWeight: lang === code ? 700 : 400, textAlign: 'left', transition: 'background 0.1s',
              borderLeft: lang === code ? '3px solid #323F90' : '3px solid transparent',
            }}
              onMouseEnter={e => { if (lang !== code) e.currentTarget.style.background = '#F7F8FA' }}
              onMouseLeave={e => { if (lang !== code) e.currentTarget.style.background = '#fff' }}
            >
              <span style={{ fontWeight: 800, fontSize: 11, letterSpacing: 0.5, color: '#666', minWidth: 22 }}>{LANG_LABELS[code]}</span>
              {name}
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
  const router = useRouter()
  const pathname = usePathname()

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
    }
  }

  const isActiveCategory = (cat) => pathname === `/category/${cat}`

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 1000, background: '#fff',
      borderBottom: scrolled ? '1px solid #CCCCCC' : '1px solid transparent',
      boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.07)' : 'none',
      transition: 'all 0.25s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>
        {/* Logo */}
        <span
          onClick={() => router.push('/')}
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 22, color: '#323F90', letterSpacing: '-0.5px', cursor: 'pointer', flexShrink: 0 }}
        >NAVO</span>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {NAVO_DATA.categories.map(cat => (
            <button
              key={cat}
              onClick={() => router.push(`/category/${cat}`)}
              style={{
                background: isActiveCategory(cat) ? 'rgba(50,63,144,0.08)' : 'none',
                border: 'none', cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif', fontSize: 13,
                fontWeight: isActiveCategory(cat) ? 700 : 500,
                color: isActiveCategory(cat) ? '#323F90' : '#1A1A1A',
                padding: '6px 12px', borderRadius: 20,
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!isActiveCategory(cat)) { e.currentTarget.style.color = '#1486C8'; e.currentTarget.style.background = 'rgba(20,134,200,0.07)' } }}
              onMouseLeave={e => { if (!isActiveCategory(cat)) { e.currentTarget.style.color = '#1A1A1A'; e.currentTarget.style.background = 'none' } }}
            >{cat}</button>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {searchOpen ? (
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search NAVO…"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, border: '1px solid #323F90', borderRadius: 4, padding: '6px 12px', outline: 'none', width: 180, color: '#1A1A1A' }}
              />
              <button type="button" onClick={() => setSearchOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 6, color: '#666', fontSize: 18 }}>✕</button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: '#1A1A1A', display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => e.currentTarget.style.color = '#1486C8'}
              onMouseLeave={e => e.currentTarget.style.color = '#1A1A1A'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          )}

          <LangSwitcher />

          <div style={{ width: 1, height: 20, background: '#CCCCCC', flexShrink: 0 }} />

          <button onClick={() => router.push('/auth')} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500, background: 'none', border: '1px solid #CCCCCC', color: '#1A1A1A', borderRadius: 4, padding: '7px 14px', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1486C8'; e.currentTarget.style.color = '#1486C8' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#CCCCCC'; e.currentTarget.style.color = '#1A1A1A' }}
          >Log in</button>

          <button onClick={() => router.push('/auth')} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, background: '#323F90', border: 'none', color: '#fff', borderRadius: 4, padding: '7px 14px', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#2a3478'}
            onMouseLeave={e => e.currentTarget.style.background = '#323F90'}
          >Register</button>
        </div>
      </div>

      <BreakingTicker />
    </header>
  )
}
