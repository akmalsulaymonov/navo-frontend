'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { C } from '@/lib/constants'
import { NAVO_DATA } from '@/lib/data'
import { useT, useLanguage, CAT_DISPLAY } from '@/lib/i18n'
import ImgPlaceholder from '@/components/ui/ImgPlaceholder'
import NewsCard from '@/components/ui/NewsCard'
import SectionHeading from '@/components/ui/SectionHeading'
import CategoryPill from '@/components/ui/CategoryPill'

export default function SearchContent() {
  const router = useRouter()
  const t = useT()
  const { lang } = useLanguage()
  const catNames = CAT_DISPLAY[lang] || CAT_DISPLAY.en
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [submitted, setSubmitted] = useState(!!initialQuery)
  const [typeFilter, setTypeFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('Any time')
  const [catFilter, setCatFilter] = useState('All')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const types = [
    { key: 'All', label: t('search.all') },
    { key: 'Articles', label: t('search.articles') },
    { key: 'Video', label: t('search.video') },
    { key: 'Photo reports', label: t('search.photo') },
  ]
  const dates = [
    { key: 'Any time', label: t('search.anytime') },
    { key: 'Last 24h', label: t('search.24h') },
    { key: 'Last week', label: t('search.week') },
    { key: 'Last month', label: t('search.month') },
    { key: 'Last year', label: t('search.year') },
  ]
  const cats = ['All', ...NAVO_DATA.categories]

  const results = submitted && query.trim()
    ? NAVO_DATA.articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase()) ||
        a.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
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
        ? <mark key={i} className="bg-primary/15 text-primary rounded-sm px-0.5">{p}</mark>
        : p
    )
  }

  const FilterBtn = ({ active, label, onClick }) => (
    <button onClick={onClick}
      className={`text-[13px] border rounded px-3 py-1.5 cursor-pointer transition-all ${active ? 'bg-primary text-white border-primary font-semibold' : 'bg-transparent text-gray-900 border-gray-300 hover:border-primary hover:text-primary'}`}
    >{label}</button>
  )

  const resultCount = results.length
  const resultWord = resultCount === 1 ? t('search.result') : t('search.results')

  return (
    <div className="bg-white min-h-[70vh]">
      {/* Search header */}
      <div className="bg-soft border-b border-gray-200 px-4 py-10 md:py-12">
        <div className="max-w-[720px] mx-auto">
          <h1 className="text-[24px] md:text-[32px] font-extrabold text-gray-900 mb-6 tracking-tight text-center">
            {submitted && query
              ? <>{t('search.results_for')} "<span className="text-primary">{query}</span>"</>
              : t('search.title')}
          </h1>
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input autoFocus value={query}
                onChange={e => { setQuery(e.target.value); setSubmitted(false) }}
                placeholder={t('search.placeholder')}
                className="w-full h-14 text-[17px] border-2 border-primary rounded px-5 pr-28 outline-none text-gray-900 shadow-[0_4px_16px_rgba(50,63,144,0.12)]"
              />
              <button type="submit"
                className="absolute right-1.5 top-1.5 h-11 text-[14px] font-bold bg-primary text-white border-none rounded px-6 cursor-pointer"
              >{t('search.button')}</button>
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-[100] bg-white border border-gray-200 rounded-b-md shadow-xl overflow-hidden">
                {suggestions.map(s => (
                  <div key={s.id} onClick={() => { setQuery(s.title); setSubmitted(true); setShowSuggestions(false) }}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-soft hover:bg-soft transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <span className="text-[14px] text-gray-900">{s.title.slice(0, 60)}…</span>
                    <CategoryPill cat={s.category} small />
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 md:px-6 py-8">
        {/* Filters */}
        {submitted && (
          <div className="flex gap-6 mb-8 flex-wrap items-start">
            <div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-2">{t('search.filter_type')}</div>
              <div className="flex gap-1.5 flex-wrap">
                {types.map(({ key, label }) => <FilterBtn key={key} active={typeFilter === key} label={label} onClick={() => setTypeFilter(key)} />)}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-2">{t('search.filter_date')}</div>
              <div className="flex gap-1.5 flex-wrap">
                {dates.map(({ key, label }) => <FilterBtn key={key} active={dateFilter === key} label={label} onClick={() => setDateFilter(key)} />)}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-2">{t('search.filter_cat')}</div>
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                className="text-[13px] text-gray-900 border border-gray-300 rounded px-3 py-[7px] bg-white cursor-pointer outline-none"
              >
                {cats.map(c => <option key={c} value={c}>{c === 'All' ? t('search.all') : catNames[c] || c}</option>)}
              </select>
            </div>
          </div>
        )}

        {submitted ? (
          results.length > 0 ? (
            <div>
              <p className="text-[14px] text-gray-500 mb-7">
                {t('search.found')} <strong className="text-gray-900">{resultCount}</strong> {resultWord} {t('search.for')} "{query}"
              </p>
              <div className="flex flex-col gap-6">
                {results.map(a => (
                  <div key={a.slug || a.id} onClick={() => router.push(`/article/${a.slug}`)}
                    className="group flex flex-col sm:flex-row gap-5 cursor-pointer py-5 border-b border-soft"
                  >
                    <ImgPlaceholder w={140} h={90} label={a.title} seed={a.slug} category={a.category} style={{ borderRadius: 4, flexShrink: 0, width: '100%', maxWidth: 140 }} />
                    <div className="flex-1">
                      <CategoryPill cat={a.category} small />
                      <h3 className="text-[18px] font-bold text-gray-900 group-hover:text-secondary leading-snug my-2 transition-colors">{highlight(a.title)}</h3>
                      <p className="text-[14px] text-gray-500 leading-relaxed mb-2.5">{highlight(a.excerpt)}</p>
                      <div className="text-[12px] text-gray-500">{a.author.name} · {a.date} · {a.readTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-[48px] mb-4">🔍</div>
              <h2 className="text-[24px] font-bold text-gray-900 mb-3">{t('search.no_results')} "{query}"</h2>
              <p className="text-[16px] text-gray-500 mb-8">{t('search.no_results_sub')}</p>
              <div className="flex justify-center gap-2.5 flex-wrap">
                {NAVO_DATA.categories.map(c => (
                  <button key={c} onClick={() => router.push(`/category/${c}`)}
                    className="text-[14px] font-semibold bg-soft text-primary border border-gray-200 rounded-full px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all"
                  >{catNames[c] || c}</button>
                ))}
              </div>
            </div>
          )
        ) : (
          <div>
            <SectionHeading title={t('search.trending')} />
            <div className="flex flex-wrap gap-2.5 mb-12">
              {['Geopolitics', 'AI Regulation', 'Climate', 'Economy', 'Elections', 'Ukraine', 'NATO', 'Digital Currency', 'Semiconductors', 'Youth Unemployment'].map(topic => (
                <button key={topic} onClick={() => { setQuery(topic); setSubmitted(true) }}
                  className="text-[14px] font-medium bg-soft text-gray-900 border border-gray-200 rounded-full px-4 py-2 cursor-pointer transition-all hover:bg-primary hover:text-white hover:border-primary"
                >{topic}</button>
              ))}
            </div>
            <SectionHeading title={t('search.most_read')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {NAVO_DATA.articles.slice(0, 6).map(a => <NewsCard key={a.slug || a.id} article={a} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
