'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { C } from '@/lib/constants'
import { NAVO_DATA } from '@/lib/data'
import { getImgId } from '@/lib/utils'
import NewsCard from '@/components/ui/NewsCard'
import AdBlock from '@/components/ui/AdBlock'
import SectionHeading from '@/components/ui/SectionHeading'
import CategoryPill from '@/components/ui/CategoryPill'

export default function AuthorContent({ author }) {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('All')
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 80)
    return () => clearTimeout(t)
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

  const statItems = [
    { value: author.articles || author.articleCount || allArticles.length * 12, label: 'Articles Published' },
    { value: (author.yearsActive || 5) + ' yrs', label: 'At NAVO' },
    { value: (author.categories || []).length || Math.max(cats.length - 1, 3), label: 'Topics Covered' },
  ]

  return (
    <div style={{ background: C.bg }}>
      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(135deg, #1a1f4e 0%, #323F90 60%, #1486C8 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '14px 14px' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 0', display: 'flex', gap: 48, alignItems: 'flex-end', position: 'relative' }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0, transform: headerVisible ? 'translateY(0)' : 'translateY(30px)', opacity: headerVisible ? 1 : 0, transition: 'all 0.5s cubic-bezier(.22,1,.36,1)' }}>
            <div style={{ width: 160, height: 160, borderRadius: '50%', border: '4px solid rgba(255,255,255,0.9)', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.3)', background: '#e8eaf0' }}>
              <img src={`https://images.unsplash.com/${author.photoId}?auto=format&fit=crop&w=320&h=320&q=80`} alt={author.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          </div>

          {/* Info */}
          <div style={{ flex: 1, paddingBottom: 36, transform: headerVisible ? 'translateY(0)' : 'translateY(20px)', opacity: headerVisible ? 1 : 0, transition: 'all 0.5s cubic-bezier(.22,1,.36,1) 0.1s' }}>
            <div style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 10, background: 'rgba(255,255,255,0.12)', borderRadius: 3, padding: '4px 10px' }}>{author.role}</div>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 42, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.8px', lineHeight: 1.1 }}>{author.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{author.specialization}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {author.location}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {author.social?.twitter && (
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 4, padding: '5px 12px', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >𝕏 {author.social.twitter}</div>
              )}
              {author.social?.linkedin && (
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 4, padding: '5px 12px', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >in LinkedIn</div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 2, paddingBottom: 0, flexShrink: 0, transform: headerVisible ? 'translateY(0)' : 'translateY(20px)', opacity: headerVisible ? 1 : 0, transition: 'all 0.5s cubic-bezier(.22,1,.36,1) 0.2s' }}>
            {statItems.map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: i === 0 ? '8px 0 0 0' : i === statItems.length - 1 ? '0 8px 0 0' : 0, padding: '20px 28px', textAlign: 'center', minWidth: 110 }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 30, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: 2, marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 2 }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: activeFilter === cat ? 700 : 500, background: activeFilter === cat ? 'rgba(255,255,255,0.15)' : 'transparent', border: 'none', borderBottom: activeFilter === cat ? '3px solid #fff' : '3px solid transparent', color: activeFilter === cat ? '#fff' : 'rgba(255,255,255,0.6)', padding: '12px 18px', cursor: 'pointer', transition: 'all 0.15s', borderRadius: '4px 4px 0 0' }}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48 }}>
          <div>
            {/* Bio */}
            <div style={{ background: C.bgSoft, borderRadius: 8, padding: '24px 28px', marginBottom: 40, borderLeft: `4px solid ${C.primary}`, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" style={{ flexShrink: 0, marginTop: 3 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, color: '#444', lineHeight: 1.75, margin: 0 }}>{author.bio}</p>
            </div>

            {/* Hero article */}
            {heroArticle && (
              <div style={{ marginBottom: 40 }}>
                <SectionHeading title="Featured Story" />
                <div onClick={() => router.push(`/article/${heroArticle.slug}`)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 10, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', transition: 'box-shadow 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.18)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ position: 'relative' }}>
                    <img src={`https://images.unsplash.com/${getImgId(heroArticle.slug, heroArticle.category)}?auto=format&fit=crop&w=700&q=80`} alt={heroArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 280, display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.3))' }} />
                  </div>
                  <div style={{ padding: '32px 28px', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <CategoryPill cat={heroArticle.category} />
                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1.3, margin: '14px 0 12px', letterSpacing: '-0.3px' }}>{heroArticle.title}</h2>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: C.textSecondary, lineHeight: 1.65, marginBottom: 20 }}>{heroArticle.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>{heroArticle.date}</span>
                      <span style={{ color: C.neutral }}>·</span>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.secondary, fontWeight: 600 }}>{heroArticle.readTime}</span>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700, color: C.primary }}>
                      Read article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid */}
            {gridArticles.length > 0 && (
              <div>
                <SectionHeading title={`All ${activeFilter === 'All' ? '' : activeFilter + ' '}Articles (${filtered.length})`} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                  {gridArticles.map((a, i) => (
                    <span key={a.slug || a.id} style={{ display: 'contents' }}>
                      {i === 6 && (
                        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
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
          <aside style={{ position: 'sticky', top: 112, alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ background: C.bgSoft, borderRadius: 8, padding: 20, border: `1px solid ${C.neutral}` }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: C.textSecondary, marginBottom: 14 }}>About the Author</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                <img src={`https://images.unsplash.com/${author.photoId}?auto=format&fit=crop&w=80&h=80&q=80`} alt={author.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${C.primary}` }} />
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700, color: C.textPrimary }}>{author.name}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>{author.role}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[['📰', author.articles || 100, 'Articles'], ['📍', author.location?.split(',')[0] || 'Europe', 'Based in'], ['✍️', author.yearsActive || 5, 'Years at NAVO'], ['🏆', (author.categories || []).length || 3, 'Topics']].map(([icon, val, lbl]) => (
                  <div key={lbl} style={{ background: '#fff', borderRadius: 6, padding: '10px 12px', textAlign: 'center', border: `1px solid ${C.neutral}` }}>
                    <div style={{ fontSize: 16, marginBottom: 3 }}>{icon}</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700, color: C.textPrimary }}>{val}</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: C.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <AdBlock w="100%" h={250} label="author-sidebar-rectangle" />

            <div>
              <SectionHeading title="Most Read" />
              {mostRead.map((a, i) => (
                <div key={a.slug || a.id} onClick={() => router.push(`/article/${a.slug}`)} style={{ display: 'flex', gap: 10, marginBottom: 14, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.querySelector('.ar-title').style.color = C.secondary}
                  onMouseLeave={e => e.currentTarget.querySelector('.ar-title').style.color = C.textPrimary}
                >
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#e8eaf0', fontFamily: 'Montserrat, sans-serif', lineHeight: 1, width: 22, flexShrink: 0 }}>{i + 1}</span>
                  <div className="ar-title" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: C.textPrimary, transition: 'color 0.15s' }}>{a.title}</div>
                </div>
              ))}
            </div>

            <AdBlock w="100%" h={400} label="author-sidebar-halfpage" />
          </aside>
        </div>
      </div>
    </div>
  )
}
