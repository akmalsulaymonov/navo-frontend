'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { C, IMG_POOLS } from '@/lib/constants'
import { NAVO_DATA, getFullAuthor } from '@/lib/data'
import { getImgId } from '@/lib/utils'
import { useT, useLanguage, CAT_DISPLAY } from '@/lib/i18n'
import { ARTICLE_TRANSLATIONS } from '@/lib/articleTranslations'
import ImgPlaceholder from '@/components/ui/ImgPlaceholder'
import ImageGallery from '@/components/ui/ImageGallery'
import NewsCard from '@/components/ui/NewsCard'
import AdBlock from '@/components/ui/AdBlock'
import SectionHeading from '@/components/ui/SectionHeading'
import CategoryPill from '@/components/ui/CategoryPill'
import TagPill from '@/components/ui/TagPill'

function buildGalleryImages(article) {
  const pool = article.category
  const suffixes = ['', '-b', '-c', '-d']
  return suffixes.map((s, i) => ({
    src: `https://images.unsplash.com/${getImgId(article.slug + s, pool)}?auto=format&fit=crop&w=1200&q=80`,
    caption: i === 0 && article.imageCaption ? article.imageCaption : null,
  }))
}

const shareButtons = [
  { label: 'Telegram', color: '#0088cc' },
  { label: 'Twitter', color: '#000' },
  { label: 'Facebook', color: '#1877f2' },
  { label: 'WhatsApp', color: '#25d366' },
]

export default function ArticleContent({ article }) {
  const router = useRouter()
  const t = useT()
  const { lang } = useLanguage()
  const catNames = CAT_DISPLAY[lang] || CAT_DISPLAY.en

  const trans = ARTICLE_TRANSLATIONS[article.slug]?.[lang]
  const displayTitle = trans?.title || article.title

  const [bookmarked, setBookmarked] = useState(false)

  const mostRead = NAVO_DATA.mostRead.map(id => NAVO_DATA.articles.find(a => a.id === id)).filter(Boolean)
  const related = NAVO_DATA.articles.filter(a => a.id !== article.id && (a.category === article.category || a.tags?.some(tag => article.tags?.includes(tag)))).slice(0, 3)
  const readAlso = related.length >= 2 ? related : NAVO_DATA.articles.filter(a => a.id !== article.id).slice(0, 3)
  const fullAuthor = getFullAuthor(article.author.name)

  const renderBody = (body) => body.slice(0, 3).map((block, i) => {
    if (block.type === 'p') return <p key={i} className="text-[17px] leading-[1.75] text-[#222] dark:text-gray-300 mb-6">{block.content}</p>
    if (block.type === 'quote') return (
      <blockquote key={i} className="my-8 px-7 py-5 border-l-4 border-primary bg-soft dark:bg-[#161b2e] rounded-r-md">
        <p className="text-[18px] font-medium text-[#333] dark:text-gray-200 leading-[1.65] italic mb-2.5">"{block.content}"</p>
        {block.attribution && <cite className="text-[13px] text-gray-500 dark:text-gray-400 not-italic font-semibold">— {block.attribution}</cite>}
      </blockquote>
    )
    return null
  })

  return (
    <div className="bg-white dark:bg-[#0d0f17]">
      <div className="max-w-content mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">

          <article className="min-w-0">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-5 flex-wrap">
              {[t('nav.home'), article.category, displayTitle.slice(0, 30) + '…'].map((crumb, i, arr) => (
                <span key={i} className="flex items-center gap-2">
                  <span onClick={() => i === 0 ? router.push('/') : i === 1 ? router.push(`/category/${article.category}`) : null}
                    className={`text-[13px] ${i === arr.length - 1 ? 'text-gray-500' : 'text-secondary cursor-pointer font-medium'}`}
                  >{i === 1 ? (catNames[article.category] || crumb) : crumb}</span>
                  {i < arr.length - 1 && <span className="text-gray-300 text-[13px]">›</span>}
                </span>
              ))}
            </nav>

            <CategoryPill cat={article.category} />
            <h1 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold text-gray-900 dark:text-white leading-tight mt-3.5 mb-4 tracking-tight">{displayTitle}</h1>
            {article.subtitle && (
              <p className="text-[18px] md:text-[20px] font-normal text-[#444] dark:text-gray-300 leading-snug mb-6 border-b border-gray-300 dark:border-gray-700 pb-6">{article.subtitle}</p>
            )}

            {/* Author + share */}
            <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div onClick={() => fullAuthor && router.push(`/author/${fullAuthor.slug}`)}
                  className={`flex items-center gap-3 ${fullAuthor ? 'cursor-pointer' : ''}`}>
                  {fullAuthor?.photoId
                    ? <img src={`https://images.unsplash.com/${fullAuthor.photoId}?auto=format&fit=crop&w=88&h=88&q=80`} alt={article.author.name} className="w-11 h-11 rounded-full object-cover object-top border-2 border-primary shrink-0" />
                    : <div className="w-11 h-11 rounded-full bg-soft border-2 border-primary flex items-center justify-center"><span className="text-[16px] font-bold text-primary">{article.author.name[0]}</span></div>
                  }
                  <div>
                    <div className="text-[14px] font-bold text-primary underline decoration-dotted underline-offset-[3px]">{article.author.name}</div>
                    <div className="text-[12px] text-gray-500">{article.author.role}</div>
                  </div>
                </div>
                <span className="text-gray-300">·</span>
                <span className="text-[13px] text-gray-500">{article.date}</span>
                <span className="text-gray-300">·</span>
                <span className="text-[13px] text-gray-500">{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {shareButtons.map(s => (
                  <button key={s.label}
                    className="text-[11px] font-bold border rounded px-2.5 py-1 cursor-pointer transition-all hover:text-white"
                    style={{ color: s.color, borderColor: s.color + '33' }}
                    onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = s.color }}
                  >{s.label}</button>
                ))}
                <button onClick={() => setBookmarked(b => !b)}
                  className="text-[11px] font-bold border rounded px-2.5 py-1 cursor-pointer transition-all"
                  style={{ background: bookmarked ? C.primary : 'none', borderColor: C.primary, color: bookmarked ? '#fff' : C.primary }}
                >{bookmarked ? t('article.saved') : t('article.save')}</button>
              </div>
            </div>

            <ImageGallery images={buildGalleryImages(article)} />

            {/* Body */}
            <div className="max-w-[680px]">
              {article.body ? renderBody(article.body) : (
                <p className="text-[17px] leading-[1.75] text-[#222]">Full article content appears here. The editorial team has produced a comprehensive investigation into this topic, drawing on sources across multiple continents and months of on-the-ground reporting.</p>
              )}
              <div className="my-8 flex justify-center">
                <AdBlock w={580} h={90} label="580×90 in-article" />
              </div>
              {(article.body || []).slice(3).map((block, i) => {
                if (block.type === 'p') return <p key={i} className="text-[17px] leading-[1.75] text-[#222] dark:text-gray-300 mb-6">{block.content}</p>
                if (block.type === 'quote') return (
                  <blockquote key={i} className="my-8 px-7 py-5 border-l-4 border-primary bg-soft dark:bg-[#161b2e] rounded-r-md">
                    <p className="text-[18px] font-medium text-[#333] dark:text-gray-200 leading-[1.65] italic mb-2.5">"{block.content}"</p>
                    {block.attribution && <cite className="text-[13px] text-gray-500 dark:text-gray-400 not-italic font-semibold">— {block.attribution}</cite>}
                  </blockquote>
                )
                return null
              })}
            </div>

            {article.tags && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-300 dark:border-gray-700">
                {article.tags.map(tag => <TagPill key={tag} tag={tag} onClick={() => router.push(`/search?q=${encodeURIComponent(tag)}`)} />)}
              </div>
            )}

            <div className="mt-12">
              <SectionHeading title={t('article.read_also')} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {readAlso.map(a => <NewsCard key={a.slug || a.id} article={a} size="sm" />)}
              </div>
            </div>

            {/* Video */}
            <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
              <h3 className="text-[22px] font-bold text-gray-900 dark:text-white mb-5">{t('article.watch')}</h3>
              <div className="relative w-full rounded-xl overflow-hidden shadow-md bg-black" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                  title={displayTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start space-y-8">
            <AdBlock w="100%" h={250} label="300×250" />
            <div>
              <SectionHeading title={t('article.most_read')} />
              {mostRead.slice(0, 4).map((a, i) => {
                const displayTitle = ARTICLE_TRANSLATIONS[a.slug]?.[lang]?.title || a.title
                return (
                  <div key={a.slug || a.id} onClick={() => router.push(`/article/${a.slug}`)}
                    className="group flex gap-2.5 mb-3.5 cursor-pointer">
                    <span className="text-[24px] font-extrabold text-gray-200 leading-none w-6 shrink-0">{i + 1}</span>
                    <div className="text-[13px] font-semibold leading-snug text-gray-900 group-hover:text-secondary transition-colors">{displayTitle}</div>
                  </div>
                )
              })}
            </div>
            <div>
              <SectionHeading title={`${t('article.more_in')} ${catNames[article.category] || article.category}`} />
              {NAVO_DATA.articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 4).map(a => (
                <NewsCard key={a.slug || a.id} article={a} horizontal />
              ))}
            </div>
            <AdBlock w="100%" h={400} label="300×400" />
          </aside>
        </div>
      </div>
    </div>
  )
}
