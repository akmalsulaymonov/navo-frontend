'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { C } from '@/lib/constants'
import { NAVO_DATA } from '@/lib/data'
import { useT, useLanguage, CAT_DISPLAY } from '@/lib/i18n'
import { ARTICLE_TRANSLATIONS } from '@/lib/articleTranslations'
import ImgPlaceholder from '@/components/ui/ImgPlaceholder'
import NewsCard from '@/components/ui/NewsCard'
import AdBlock from '@/components/ui/AdBlock'
import SectionHeading from '@/components/ui/SectionHeading'
import CategoryPill from '@/components/ui/CategoryPill'
import AuthorAvatar from '@/components/ui/AuthorAvatar'

/* ── date helpers ─────────────────────────────────── */
function withinDays(dateStr, days) {
  const d = new Date(dateStr)
  return (Date.now() - d.getTime()) < days * 86_400_000
}

/* ── highlight matching text ──────────────────────── */
function Highlight({ text, query }) {
  if (!query || !text) return text
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${safe})`, 'gi'))
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background: 'rgba(50,63,144,0.13)', color: '#323F90', borderRadius: 3, padding: '0 2px' }}>{p}</mark>
      : p
  )
}

/* ── single result card ───────────────────────────── */
function ResultCard({ article, query, lang }) {
  const router = useRouter()
  const trans = ARTICLE_TRANSLATIONS[article.slug]?.[lang]
  const displayTitle   = trans?.title   || article.title
  const displayExcerpt = trans?.excerpt || article.excerpt

  return (
    <div
      onClick={() => router.push(`/article/${article.slug}`)}
      className="group flex gap-0 cursor-pointer bg-white dark:bg-[#161b2e] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 mb-3"
    >
      {/* thumbnail — fixed 96×96 square */}
      <div style={{ width: 96, minWidth: 96, height: 96, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <ImgPlaceholder
          w={96} h={96}
          label={article.title}
          seed={article.slug}
          category={article.category}
          style={{ width: 96, height: 96, objectFit: 'cover', display: 'block' }}
        />
        {/* subtle inner gradient for depth */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18))' }} />
      </div>

      {/* text body */}
      <div className="flex-1 min-w-0 flex flex-col justify-center px-3.5 py-2.5" style={{ gap: 4 }}>
        {/* top row: category + readtime */}
        <div className="flex items-center justify-between gap-2">
          <CategoryPill cat={article.category} small />
          <span className="text-[11px] text-gray-400 dark:text-gray-500 shrink-0">{article.readTime}</span>
        </div>

        {/* title */}
        <h3
          className="font-bold text-gray-900 dark:text-white group-hover:text-secondary dark:group-hover:text-secondary leading-snug transition-colors line-clamp-2"
          style={{ fontSize: 14, lineHeight: 1.4 }}
        >
          <Highlight text={displayTitle} query={query} />
        </h3>

        {/* meta row */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500">
          <AuthorAvatar name={article.author.name} size={14} style={{ border: 'none', flexShrink: 0 }} />
          <span className="truncate max-w-[120px]">{article.author.name}</span>
          <span className="text-gray-300 dark:text-gray-700">·</span>
          <span className="shrink-0">{article.date}</span>
        </div>
      </div>

      {/* right arrow hint */}
      <div className="flex items-center pr-3 pl-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>
  )
}

/* ── author result row ────────────────────────────── */
function AuthorRow({ author }) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/author/${author.slug}`)}
      className="group flex items-center gap-4 cursor-pointer bg-white dark:bg-[#161b2e] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 mb-3"
    >
      <img
        src={`https://images.unsplash.com/${author.photoId}?auto=format&fit=crop&w=80&h=80&q=80`}
        alt={author.name}
        className="w-11 h-11 rounded-full object-cover object-top border-2 border-primary shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold text-gray-900 dark:text-white group-hover:text-secondary transition-colors">{author.name}</div>
        <div className="text-[12px] text-gray-500 dark:text-gray-400">{author.role} · {author.location}</div>
      </div>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-600 group-hover:text-secondary transition-colors shrink-0">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </div>
  )
}

/* ══ main page ════════════════════════════════════════ */
export default function SearchContent() {
  const router      = useRouter()
  const t           = useT()
  const { lang }    = useLanguage()
  const catNames    = CAT_DISPLAY[lang] || CAT_DISPLAY.en
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery]         = useState(initialQuery)
  const [submitted, setSubmitted] = useState(!!initialQuery)
  const [catFilter, setCatFilter]     = useState('All')
  const [dateFilter, setDateFilter]   = useState('Any time')
  const [typeFilter, setTypeFilter]   = useState('All')
  const [suggestions, setSuggestions] = useState([])
  const [showSug, setShowSug]         = useState(false)

  const TRENDING = ['Tajikistan', 'Rogun Dam', 'Dushanbe', 'Pamir', 'Sughd', 'AI Regulation', 'Climate', 'Elections', 'NATO', 'Economy']
  const cats = ['All', ...NAVO_DATA.categories]

  const dateOptions = [
    { key: 'Any time',   label: t('search.anytime') },
    { key: 'Last 24h',   label: t('search.24h') },
    { key: 'Last week',  label: t('search.week') },
    { key: 'Last month', label: t('search.month') },
    { key: 'Last year',  label: t('search.year') },
  ]
  const typeOptions = [
    { key: 'All',           label: t('search.all') },
    { key: 'Articles',      label: t('search.articles') },
    { key: 'Video',         label: t('search.video') },
    { key: 'Photo reports', label: t('search.photo') },
  ]

  /* ── compute results ── */
  const q = query.trim().toLowerCase()

  const articleResults = (submitted && q && typeFilter !== 'Video' && typeFilter !== 'Photo reports')
    ? NAVO_DATA.articles.filter(a => {
        const tr = ARTICLE_TRANSLATIONS[a.slug]?.[lang]
        const hit =
          (tr?.title   || a.title  ).toLowerCase().includes(q) ||
          (tr?.excerpt || a.excerpt).toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags?.some(t => t.toLowerCase().includes(q))
        if (!hit) return false
        if (catFilter !== 'All' && a.category !== catFilter) return false
        if (dateFilter === 'Last 24h'   && !withinDays(a.date, 1))   return false
        if (dateFilter === 'Last week'  && !withinDays(a.date, 7))   return false
        if (dateFilter === 'Last month' && !withinDays(a.date, 30))  return false
        if (dateFilter === 'Last year'  && !withinDays(a.date, 365)) return false
        return true
      })
    : []

  const authorResults = (submitted && q && typeFilter !== 'Articles')
    ? NAVO_DATA.authors.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        a.specialization.toLowerCase().includes(q)
      )
    : []

  const total = articleResults.length + authorResults.length

  /* ── autocomplete ── */
  useEffect(() => {
    if (query.length > 1 && !submitted) {
      setSuggestions(NAVO_DATA.articles.filter(a => a.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5))
      setShowSug(true)
    } else {
      setShowSug(false)
    }
  }, [query, submitted])

  /* ── sync URL → state ── */
  useEffect(() => {
    const qFromUrl = searchParams.get('q') || ''
    if (qFromUrl && qFromUrl !== query) { setQuery(qFromUrl); setSubmitted(true) }
  }, [searchParams])

  const submit = (e) => {
    e?.preventDefault()
    if (!query.trim()) return
    setSubmitted(true); setShowSug(false)
    router.push(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false })
  }

  const go = (topic) => {
    setQuery(topic); setSubmitted(true); setShowSug(false)
    router.push(`/search?q=${encodeURIComponent(topic)}`, { scroll: false })
  }

  /* ── filter pill ── */
  const Pill = ({ active, label, onClick }) => (
    <button onClick={onClick}
      className={`text-[12px] border rounded-full px-3 py-1.5 cursor-pointer transition-all whitespace-nowrap
        ${active
          ? 'bg-primary text-white border-primary font-bold'
          : 'bg-transparent text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary'
        }`}
    >{label}</button>
  )

  const mostRead = NAVO_DATA.mostRead.map(id => NAVO_DATA.articles.find(a => a.id === id)).filter(Boolean).slice(0, 5)

  return (
    <div className="bg-white dark:bg-[#0d0f17] min-h-[70vh]">

      {/* ══ Banner ══ */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#1a1f4e 0%,#323F90 60%,#1486C8 100%)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '14px 14px' }} />
        <div className="max-w-[760px] mx-auto px-4 py-10 md:py-14 relative">
          <h1 className="text-[22px] md:text-[26px] font-extrabold text-white text-center mb-6 tracking-tight">
            {submitted && query
              ? <>{t('search.results_for')} &ldquo;<span className="text-[#7eb8e8]">{query}</span>&rdquo;</>
              : t('search.title')}
          </h1>

          <form onSubmit={submit} className="relative">
            <div className="relative flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="absolute left-4 pointer-events-none shrink-0 z-10">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                autoFocus
                value={query}
                onChange={e => { setQuery(e.target.value); setSubmitted(false) }}
                placeholder={t('search.placeholder')}
                className="w-full h-14 text-[16px] bg-white dark:bg-[#1a1f3c] rounded-xl pl-12 pr-28 outline-none text-gray-900 dark:text-white shadow-2xl transition-colors placeholder:text-gray-400 border-2 border-transparent focus:border-white/40"
              />
              <button type="submit"
                className="absolute right-2 h-10 text-[13px] font-bold bg-primary hover:bg-secondary text-white border-none rounded-lg px-5 cursor-pointer transition-colors"
              >{t('search.button')}</button>
            </div>

            {/* autocomplete */}
            {showSug && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-[200] mt-1 bg-white dark:bg-[#1a1f3c] border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                {suggestions.map(s => (
                  <div key={s.id}
                    onClick={() => { setQuery(s.title); setSubmitted(true); setShowSug(false); router.push(`/search?q=${encodeURIComponent(s.title)}`) }}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-700/60 last:border-b-0 hover:bg-gray-50 dark:hover:bg-[#1e2538] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <span className="text-[14px] text-gray-900 dark:text-gray-200 flex-1 truncate">{s.title}</span>
                    <CategoryPill cat={s.category} small />
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* ══ Body ══ */}
      <div className="max-w-content mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">

          {/* ── left: results ── */}
          <div className="min-w-0">

            {submitted && query.trim() ? (
              <>
                {/* filters */}
                <div className="bg-gray-50 dark:bg-[#161b2e] rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6 flex flex-col gap-4">
                  {/* type */}
                  <div className="flex items-start gap-3 flex-wrap">
                    <span className="text-[11px] font-bold tracking-[1.2px] uppercase text-gray-400 dark:text-gray-500 mt-1.5 w-10 shrink-0">{t('search.filter_type')}</span>
                    <div className="flex gap-1.5 flex-wrap">{typeOptions.map(o => <Pill key={o.key} active={typeFilter===o.key} label={o.label} onClick={() => setTypeFilter(o.key)} />)}</div>
                  </div>
                  {/* date */}
                  <div className="flex items-start gap-3 flex-wrap">
                    <span className="text-[11px] font-bold tracking-[1.2px] uppercase text-gray-400 dark:text-gray-500 mt-1.5 w-10 shrink-0">{t('search.filter_date')}</span>
                    <div className="flex gap-1.5 flex-wrap">{dateOptions.map(o => <Pill key={o.key} active={dateFilter===o.key} label={o.label} onClick={() => setDateFilter(o.key)} />)}</div>
                  </div>
                  {/* category */}
                  <div className="flex items-start gap-3 flex-wrap">
                    <span className="text-[11px] font-bold tracking-[1.2px] uppercase text-gray-400 dark:text-gray-500 mt-1.5 w-10 shrink-0">{t('search.filter_cat')}</span>
                    <div className="flex gap-1.5 flex-wrap">{cats.map(c => <Pill key={c} active={catFilter===c} label={c==='All' ? t('search.all') : catNames[c]||c} onClick={() => setCatFilter(c)} />)}</div>
                  </div>
                </div>

                {/* count */}
                {total > 0 && (
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-5">
                    {t('search.found')} <strong className="text-gray-900 dark:text-white">{total}</strong> {total===1 ? t('search.result') : t('search.results')} {t('search.for')} &ldquo;{query}&rdquo;
                  </p>
                )}

                {/* author results */}
                {authorResults.length > 0 && (
                  <div className="mb-6">
                    <div className="text-[11px] font-bold tracking-[1.2px] uppercase text-gray-400 dark:text-gray-500 mb-3">
                      Authors ({authorResults.length})
                    </div>
                    {authorResults.map(a => <AuthorRow key={a.slug} author={a} />)}
                  </div>
                )}

                {/* article results */}
                {articleResults.length > 0 ? (
                  <div>
                    {authorResults.length > 0 && (
                      <div className="text-[11px] font-bold tracking-[1.2px] uppercase text-gray-400 dark:text-gray-500 mb-3">
                        Articles ({articleResults.length})
                      </div>
                    )}
                    {articleResults.map(a => <ResultCard key={a.slug||a.id} article={a} query={query.trim()} lang={lang} />)}
                  </div>
                ) : total === 0 ? (
                  /* no results */
                  <div className="text-center py-16">
                    <div className="text-[52px] mb-4">🔍</div>
                    <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-2">{t('search.no_results')} &ldquo;{query}&rdquo;</h2>
                    <p className="text-[15px] text-gray-500 dark:text-gray-400 mb-8">{t('search.no_results_sub')}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {NAVO_DATA.categories.map(c => (
                        <button key={c} onClick={() => router.push(`/category/${c}`)}
                          className="text-[13px] font-semibold bg-gray-100 dark:bg-[#161b2e] text-primary border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all"
                        >{catNames[c]||c}</button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              /* ── empty state ── */
              <div>
                <SectionHeading title={t('search.trending')} />
                <div className="flex flex-wrap gap-2 mb-10">
                  {TRENDING.map(topic => (
                    <button key={topic} onClick={() => go(topic)}
                      className="flex items-center gap-1.5 text-[13px] font-medium bg-gray-100 dark:bg-[#161b2e] text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 cursor-pointer transition-all hover:bg-primary hover:text-white hover:border-primary"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                      {topic}
                    </button>
                  ))}
                </div>
                <SectionHeading title={t('search.most_read')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {NAVO_DATA.articles.slice(0, 6).map(a => <NewsCard key={a.slug||a.id} article={a} />)}
                </div>
              </div>
            )}
          </div>

          {/* ── sidebar ── */}
          <aside className="lg:sticky lg:top-28 lg:self-start space-y-8">
            <AdBlock w="100%" h={250} label="search-rectangle" />

            <div>
              <SectionHeading title={t('article.most_read')} />
              {mostRead.map((a, i) => {
                const tr = ARTICLE_TRANSLATIONS[a.slug]?.[lang]
                const title = tr?.title || a.title
                return (
                  <div key={a.id} onClick={() => router.push(`/article/${a.slug}`)}
                    className="group flex gap-2.5 mb-4 cursor-pointer">
                    <span className="text-[22px] font-extrabold text-gray-200 dark:text-gray-700 leading-none w-6 text-center shrink-0">{i+1}</span>
                    <div>
                      <div className="text-[13px] font-semibold leading-snug text-gray-900 dark:text-gray-200 group-hover:text-secondary transition-colors">{title}</div>
                      <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{a.readTime}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div>
              <SectionHeading title={t('search.trending')} />
              <div className="flex flex-wrap gap-2">
                {TRENDING.slice(0, 8).map(topic => (
                  <button key={topic} onClick={() => go(topic)}
                    className="text-[12px] font-medium bg-gray-100 dark:bg-[#161b2e] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 cursor-pointer transition-all hover:bg-primary hover:text-white hover:border-primary"
                  >{topic}</button>
                ))}
              </div>
            </div>

            <AdBlock w="100%" h={400} label="search-halfpage" />
          </aside>
        </div>
      </div>
    </div>
  )
}
