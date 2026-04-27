'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { C } from '@/lib/constants'
import { NAVO_DATA } from '@/lib/data'
import { getImgId } from '@/lib/utils'
import { useT, useLanguage } from '@/lib/i18n'
import { ARTICLE_TRANSLATIONS } from '@/lib/articleTranslations'
import NewsCard from '@/components/ui/NewsCard'
import AdBlock from '@/components/ui/AdBlock'
import SectionHeading from '@/components/ui/SectionHeading'
import CategoryPill from '@/components/ui/CategoryPill'

export default function AuthorContent({ author }) {
  const router = useRouter()
  const t = useT()
  const { lang } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('All')
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const authorArticles = NAVO_DATA.articles.filter(a => a.author.name === author.name)
  const allArticles = authorArticles.length >= 10
    ? authorArticles
    : [...authorArticles, ...NAVO_DATA.articles.filter(a => !authorArticles.includes(a)).slice(0, 10 - authorArticles.length)]

  const cats = ['All', ...new Set(allArticles.map(a => a.category))]
  const filtered = activeFilter === 'All' ? allArticles : allArticles.filter(a => a.category === activeFilter)
  const heroArticle = filtered[0]
  const gridArticles = filtered.slice(1)
  const mostRead = NAVO_DATA.mostRead.map(id => NAVO_DATA.articles.find(a => a.id === id)).filter(Boolean).slice(0, 4)

  const heroTrans = heroArticle ? ARTICLE_TRANSLATIONS[heroArticle.slug]?.[lang] : null
  const heroDisplayTitle = heroTrans?.title || heroArticle?.title
  const heroDisplayExcerpt = heroTrans?.excerpt || heroArticle?.excerpt

  const statItems = [
    { value: author.articles || allArticles.length * 12, label: t('author.articles') },
    { value: (author.yearsActive || 5) + ' yrs', label: t('author.years') },
    { value: (author.categories || []).length || Math.max(cats.length - 1, 3), label: t('author.topics') },
  ]

  const allArticlesLabel = activeFilter === 'All'
    ? `${t('author.all_articles')} (${filtered.length})`
    : `${t('author.all_articles')} — ${activeFilter} (${filtered.length})`

  return (
    <div className="bg-white">
      {/* Hero banner */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1f4e 0%, #323F90 60%, #1486C8 100%)' }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '14px 14px' }} />
        <div className="max-w-content mx-auto px-4 md:px-6 pt-10 md:pt-14 flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-end relative">

          {/* Avatar */}
          <div className="shrink-0 transition-all duration-500" style={{ transform: headerVisible ? 'translateY(0)' : 'translateY(30px)', opacity: headerVisible ? 1 : 0 }}>
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-white/90 overflow-hidden shadow-2xl bg-[#e8eaf0]">
              <img src={`https://images.unsplash.com/${author.photoId}?auto=format&fit=crop&w=320&h=320&q=80`} alt={author.name} className="w-full h-full object-cover object-top" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pb-0 md:pb-9 text-center md:text-left transition-all duration-500 delay-100" style={{ transform: headerVisible ? 'translateY(0)' : 'translateY(20px)', opacity: headerVisible ? 1 : 0 }}>
            <div className="inline-block text-[10px] font-bold tracking-[2px] uppercase text-white/70 mb-2.5 bg-white/12 rounded px-2.5 py-1">{author.role}</div>
            <h1 className="text-[30px] md:text-[42px] font-extrabold text-white m-0 mb-2 tracking-tight leading-tight">{author.name}</h1>
            <div className="flex items-center gap-4 mb-4 flex-wrap justify-center md:justify-start">
              <span className="text-[15px] text-white/75 font-medium">{author.specialization}</span>
              <span className="text-white/30">·</span>
              <span className="text-[14px] text-white/60 flex items-center gap-1">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {author.location}
              </span>
            </div>
            <div className="flex gap-2.5 flex-wrap justify-center md:justify-start">
              {author.social?.twitter && (
                <div className="text-[12px] font-semibold text-white bg-white/15 border border-white/25 rounded px-3 py-1.5 cursor-pointer transition-all hover:bg-white/25">
                  𝕏 {author.social.twitter}
                </div>
              )}
              {author.social?.linkedin && (
                <div className="text-[12px] font-semibold text-white bg-white/15 border border-white/25 rounded px-3 py-1.5 cursor-pointer transition-all hover:bg-white/25">
                  in LinkedIn
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex shrink-0 transition-all duration-500 delay-200" style={{ transform: headerVisible ? 'translateY(0)' : 'translateY(20px)', opacity: headerVisible ? 1 : 0 }}>
            {statItems.map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur border border-white/18 px-5 md:px-7 py-5 text-center min-w-[80px] md:min-w-[110px]"
                style={{ borderRadius: i === 0 ? '8px 0 0 0' : i === statItems.length - 1 ? '0 8px 0 0' : 0 }}>
                <div className="text-[22px] md:text-[30px] font-extrabold text-white leading-none">{s.value}</div>
                <div className="text-[10px] text-white/60 mt-1.5 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="flex gap-0.5 mt-8 border-t border-white/12 pt-0.5 flex-wrap">
            {cats.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className={`text-[13px] px-4 py-3 cursor-pointer border-none rounded-t transition-all ${activeFilter === cat ? 'font-bold bg-white/15 border-b-[3px] border-white text-white' : 'font-medium bg-transparent border-b-[3px] border-transparent text-white/60 hover:text-white/90'}`}
              >{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          <div>
            {/* Bio */}
            <div className="bg-soft rounded-lg px-6 py-5 mb-10 border-l-4 border-primary flex gap-4 items-start">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" className="shrink-0 mt-0.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <p className="text-[15px] text-[#444] leading-[1.75] m-0">{author.bio}</p>
            </div>

            {/* Featured article */}
            {heroArticle && (
              <div className="mb-10">
                <SectionHeading title={t('author.featured_story')} />
                <div onClick={() => router.push(`/article/${heroArticle.slug}`)}
                  className="group grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
                  <div className="relative min-h-[200px] md:min-h-[280px]">
                    <img src={`https://images.unsplash.com/${getImgId(heroArticle.slug, heroArticle.category)}?auto=format&fit=crop&w=700&q=80`} alt={heroArticle.title} className="w-full h-full object-cover block min-h-[200px]" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.3))' }} />
                  </div>
                  <div className="p-6 md:p-8 bg-white flex flex-col justify-center">
                    <CategoryPill cat={heroArticle.category} />
                    <h2 className="text-[20px] md:text-[22px] font-bold text-gray-900 leading-snug mt-3.5 mb-3 tracking-tight">{heroDisplayTitle}</h2>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-5">{heroDisplayExcerpt}</p>
                    <div className="flex items-center gap-2 mt-auto text-[12px] text-gray-500">
                      <span>{heroArticle.date}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-secondary font-semibold">{heroArticle.readTime}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 mt-5 text-[13px] font-bold text-primary">
                      {t('author.read_article')}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Article grid */}
            {gridArticles.length > 0 && (
              <div>
                <SectionHeading title={allArticlesLabel} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridArticles.map((a, i) => (
                    <span key={a.slug || a.id} style={{ display: 'contents' }}>
                      {i === 6 && (
                        <div className="col-span-full flex justify-center my-2">
                          <AdBlock w={728} h={90} label="author-page-infeed" />
                        </div>
                      )}
                      <NewsCard article={a} />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start space-y-8">
            <div className="bg-soft rounded-lg p-5 border border-gray-200">
              <div className="text-[11px] font-bold tracking-[1.2px] uppercase text-gray-500 mb-3.5">{t('author.about')}</div>
              <div className="flex gap-3 items-center mb-3.5">
                <img src={`https://images.unsplash.com/${author.photoId}?auto=format&fit=crop&w=80&h=80&q=80`} alt={author.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary" />
                <div>
                  <div className="text-[14px] font-bold text-gray-900">{author.name}</div>
                  <div className="text-[12px] text-gray-500">{author.role}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  ['📰', author.articles || 100, t('author.articles')],
                  ['📍', author.location?.split(',')[0] || 'Europe', t('author.based_in')],
                  ['✍️', author.yearsActive || 5, t('author.years')],
                  ['🏆', (author.categories || []).length || 3, t('author.topics')],
                ].map(([icon, val, lbl]) => (
                  <div key={lbl} className="bg-white rounded-md p-3 text-center border border-gray-200">
                    <div className="text-base mb-0.5">{icon}</div>
                    <div className="text-[14px] font-bold text-gray-900">{val}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <AdBlock w="100%" h={250} label="author-sidebar-rectangle" />

            <div>
              <SectionHeading title={t('author.most_read')} />
              {mostRead.map((a, i) => {
                const displayTitle = ARTICLE_TRANSLATIONS[a.slug]?.[lang]?.title || a.title
                return (
                  <div key={a.slug || a.id} onClick={() => router.push(`/article/${a.slug}`)}
                    className="group flex gap-2.5 mb-3.5 cursor-pointer">
                    <span className="text-[22px] font-extrabold text-gray-200 leading-none w-5 shrink-0">{i + 1}</span>
                    <div className="text-[13px] font-semibold leading-snug text-gray-900 group-hover:text-secondary transition-colors">{displayTitle}</div>
                  </div>
                )
              })}
            </div>

            <AdBlock w="100%" h={400} label="author-sidebar-halfpage" />
          </aside>
        </div>
      </div>
    </div>
  )
}
