'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { C } from '@/lib/constants'
import { NAVO_DATA } from '@/lib/data'
import ImgPlaceholder from '@/components/ui/ImgPlaceholder'
import NewsCard from '@/components/ui/NewsCard'
import SectionHeading from '@/components/ui/SectionHeading'
import CategoryPill from '@/components/ui/CategoryPill'

export default function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [submitted, setSubmitted] = useState(!!initialQuery)
  const [typeFilter, setTypeFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('Any time')
  const [catFilter, setCatFilter] = useState('All')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const types = ['All', 'Articles', 'Video', 'Photo reports']
  const dates = ['Any time', 'Last 24h', 'Last week', 'Last month', 'Last year']
  const cats = ['All', ...NAVO_DATA.categories]

  const results = submitted && query.trim()
    ? NAVO_DATA.articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase()) ||
        a.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).filter(a => catFilter === 'All' || a.category === catFilter)
    : []

  useEffect(() => {
    if (query.length > 1 && !submitted) {
      const s = NAVO_DATA.articles.filter(a => a.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
      setSuggestions(s)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [query, submitted])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setShowSuggestions(false)
    router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false })
  }

  const highlight = (text) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((p, i) =>
      p.toLowerCase() === query.toLowerCase()
        ? <mark key={i} style={{ background: 'rgba(50,63,144,0.15)', color: C.primary, borderRadius: 2, padding: '0 2px' }}>{p}</mark>
        : p
    )
  }

  const filterBtn = (active, label, onClick) => (
    <button onClick={onClick} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, background: active ? C.primary : 'none', color: active ? '#fff' : C.textPrimary, border: `1px solid ${active ? C.primary : C.neutral}`, borderRadius: 4, padding: '6px 12px', cursor: 'pointer', transition: 'all 0.15s', fontWeight: active ? 600 : 400 }}>{label}</button>
  )

  return (
    <div style={{ background: C.bg, minHeight: '70vh' }}>
      <div style={{ background: C.bgSoft, borderBottom: `1px solid ${C.neutral}`, padding: '48px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 32, fontWeight: 800, color: C.textPrimary, marginBottom: 24, letterSpacing: '-0.5px', textAlign: 'center' }}>
            {submitted && query ? <>Results for "<span style={{ color: C.primary }}>{query}</span>"</> : 'Search NAVO'}
          </h1>
          <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <input
                autoFocus
                value={query}
                onChange={e => { setQuery(e.target.value); setSubmitted(false) }}
                placeholder="Search articles, topics, people…"
                style={{ width: '100%', height: 56, fontFamily: 'Montserrat, sans-serif', fontSize: 17, border: `2px solid ${C.primary}`, borderRadius: 6, padding: '0 120px 0 20px', outline: 'none', color: C.textPrimary, boxSizing: 'border-box', boxShadow: '0 4px 16px rgba(50,63,144,0.12)' }}
              />
              <button type="submit" style={{ position: 'absolute', right: 6, top: 6, height: 44, fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700, background: C.primary, color: '#fff', border: 'none', borderRadius: 4, padding: '0 24px', cursor: 'pointer' }}>Search</button>
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, background: '#fff', border: `1px solid ${C.neutral}`, borderRadius: '0 0 6px 6px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                {suggestions.map(s => (
                  <div key={s.id} onClick={() => { setQuery(s.title); setSubmitted(true); setShowSuggestions(false) }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer', borderBottom: `1px solid ${C.bgSoft}`, transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = C.bgSoft}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: C.textPrimary }}>{s.title.slice(0, 60)}…</span>
                    <CategoryPill cat={s.category} small />
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        {submitted && (
          <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.textSecondary, marginBottom: 8 }}>Type</div>
              <div style={{ display: 'flex', gap: 6 }}>{types.map(t => filterBtn(typeFilter === t, t, () => setTypeFilter(t)))}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.textSecondary, marginBottom: 8 }}>Date</div>
              <div style={{ display: 'flex', gap: 6 }}>{dates.map(d => filterBtn(dateFilter === d, d, () => setDateFilter(d)))}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.textSecondary, marginBottom: 8 }}>Category</div>
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.textPrimary, border: `1px solid ${C.neutral}`, borderRadius: 4, padding: '7px 12px', background: '#fff', cursor: 'pointer', outline: 'none' }}>
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}

        {submitted ? (
          results.length > 0 ? (
            <div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: C.textSecondary, marginBottom: 28 }}>Found <strong style={{ color: C.textPrimary }}>{results.length}</strong> result{results.length !== 1 ? 's' : ''} for "{query}"</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {results.map(a => (
                  <div key={a.slug || a.id} onClick={() => router.push(`/article/${a.slug}`)} style={{ display: 'flex', gap: 20, cursor: 'pointer', padding: '20px 0', borderBottom: `1px solid ${C.bgSoft}` }}
                    onMouseEnter={e => e.currentTarget.querySelector('.res-title').style.color = C.secondary}
                    onMouseLeave={e => e.currentTarget.querySelector('.res-title').style.color = C.textPrimary}
                  >
                    <ImgPlaceholder w={140} h={90} label={a.title} seed={a.slug} category={a.category} style={{ borderRadius: 4, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <CategoryPill cat={a.category} small />
                      <h3 className="res-title" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 700, color: C.textPrimary, lineHeight: 1.3, margin: '8px 0', transition: 'color 0.15s' }}>{highlight(a.title)}</h3>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: C.textSecondary, lineHeight: 1.6, margin: '0 0 10px' }}>{highlight(a.excerpt)}</p>
                      <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>{a.author.name} · {a.date} · {a.readTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 24, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>No results for "{query}"</h2>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, color: C.textSecondary, marginBottom: 32 }}>Try different keywords or browse our sections</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                {NAVO_DATA.categories.map(c => (
                  <button key={c} onClick={() => router.push(`/category/${c}`)} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600, background: C.bgSoft, color: C.primary, border: `1px solid ${C.neutral}`, borderRadius: 20, padding: '8px 18px', cursor: 'pointer' }}>{c}</button>
                ))}
              </div>
            </div>
          )
        ) : (
          <div>
            <SectionHeading title="Trending Topics" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
              {['Geopolitics', 'AI Regulation', 'Climate', 'Economy', 'Elections', 'Ukraine', 'NATO', 'Digital Currency', 'Semiconductors', 'Youth Unemployment'].map(t => (
                <button key={t} onClick={() => { setQuery(t); setSubmitted(true) }} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 500, background: C.bgSoft, color: C.textPrimary, border: `1px solid ${C.neutral}`, borderRadius: 20, padding: '9px 18px', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = C.primary }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.bgSoft; e.currentTarget.style.color = C.textPrimary; e.currentTarget.style.borderColor = C.neutral }}
                >{t}</button>
              ))}
            </div>
            <SectionHeading title="Most Read This Week" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {NAVO_DATA.articles.slice(0, 6).map(a => <NewsCard key={a.slug || a.id} article={a} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
