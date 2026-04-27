'use client'
import { useRouter } from 'next/navigation'
import { NAVO_DATA, getFullAuthor } from '@/lib/data'
import { useT, useLanguage, CAT_DISPLAY } from '@/lib/i18n'
import { ARTICLE_TRANSLATIONS } from '@/lib/articleTranslations'
import ImgPlaceholder from '@/components/ui/ImgPlaceholder'
import NewsCard from '@/components/ui/NewsCard'
import AdBlock from '@/components/ui/AdBlock'
import SectionHeading from '@/components/ui/SectionHeading'
import CategoryPill from '@/components/ui/CategoryPill'

function HeroSideCard({ article }) {
  const router = useRouter()
  const { lang } = useLanguage()
  const trans = ARTICLE_TRANSLATIONS[article.slug]?.[lang]
  const displayTitle = trans?.title || article.title
  return (
    <div onClick={() => router.push(`/article/${article.slug}`)}
      className="group relative cursor-pointer flex-1 min-h-[150px]"
    >
      <ImgPlaceholder h="100%" label={article.title} seed={article.slug} category={article.category} style={{ position: 'absolute', inset: 0, height: '100%' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <CategoryPill cat={article.category} small />
        <div className="text-[14px] font-semibold text-white leading-snug mt-1.5 group-hover:underline decoration-white/50 line-clamp-2">{displayTitle}</div>
        <div className="text-[11px] text-white/60 mt-1">{article.date}</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const router = useRouter()
  const t = useT()
  const { lang } = useLanguage()
  const catNames = CAT_DISPLAY[lang] || CAT_DISPLAY.en

  const articles = NAVO_DATA.articles
  const hero = articles[0]
  const heroSide = articles.slice(1, 4)
  const mostRead = NAVO_DATA.mostRead.map(id => articles.find(a => a.id === id)).filter(Boolean)
  const latest = NAVO_DATA.latest.map(id => articles.find(a => a.id === id)).filter(Boolean)

  const catBlocks = [
    { name: 'Politics', articles: articles.filter(a => a.category === 'Politics') },
    { name: 'Economy',  articles: articles.filter(a => a.category === 'Economy') },
    { name: 'Technology', articles: articles.filter(a => a.category === 'Technology') },
  ]

  const heroAuthor = getFullAuthor(hero.author.name)
  const heroTrans = ARTICLE_TRANSLATIONS[hero.slug]?.[lang]
  const heroTitle = heroTrans?.title || hero.title
  const heroExcerpt = heroTrans?.excerpt || hero.excerpt

  return (
    <div className="bg-white">
      {/* Top Ad */}
      <div className="bg-soft border-b border-gray-200 hidden md:flex justify-center px-6 py-3">
        <AdBlock w={728} h={90} label="728×90 leaderboard" />
      </div>

      <div className="max-w-content mx-auto px-4 md:px-6 py-6 md:py-8">

        {/* Hero */}
        <section className="mb-10 md:mb-12 rounded-lg overflow-hidden">
          <div className="group relative cursor-pointer min-h-[280px] md:min-h-[420px] lg:min-h-[480px]"
            onClick={() => router.push(`/article/${hero.slug}`)}>
            <ImgPlaceholder h={480} label={hero.title} seed={hero.slug} category="hero" style={{ width: '100%', minHeight: 280 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <CategoryPill cat={hero.category} />
              <h1 className="text-[22px] md:text-[28px] lg:text-[32px] font-bold text-white leading-tight mt-2.5 mb-3 tracking-tight group-hover:underline decoration-white/50">{heroTitle}</h1>
              <p className="hidden md:block text-[15px] text-white/80 leading-relaxed mb-3.5 max-w-[560px] line-clamp-2">{heroExcerpt}</p>
              <div className="flex items-center gap-3">
                {heroAuthor?.photoId
                  ? <img src={`https://images.unsplash.com/${heroAuthor.photoId}?auto=format&fit=crop&w=60&h=60&q=80`} alt={hero.author.name} className="w-7 h-7 rounded-full object-cover object-top border-2 border-white/70" />
                  : <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"><span className="text-white text-xs font-bold">{hero.author.name[0]}</span></div>
                }
                <span className="text-[13px] text-white/75 font-medium">{hero.author.name}</span>
                <span className="text-white/40">·</span>
                <span className="text-[13px] text-white/60">{hero.date}</span>
              </div>
            </div>
          </div>

          {/* Side cards */}
          <div className="grid grid-cols-3 gap-0.5 mt-0.5" style={{ minHeight: 180 }}>
            {heroSide.map(a => <HeroSideCard key={a.slug || a.id} article={a} />)}
          </div>
        </section>

        {/* Main + Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8 xl:gap-10">
          <div>
            <SectionHeading title={t('home.latest_news')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {articles.slice(0, 6).map(a => <NewsCard key={a.slug || a.id} article={a} />)}
              <div className="col-span-full flex justify-center my-2">
                <AdBlock w={728} h={90} label="latest-news-infeed" />
              </div>
              {articles.slice(6, 9).map(a => <NewsCard key={a.slug || a.id} article={a} />)}
            </div>

            {catBlocks.map(block => (
              <section key={block.name} className="mb-12">
                <SectionHeading
                  title={catNames[block.name] || block.name}
                  action={t('home.view_all')}
                  onAction={() => router.push(`/category/${block.name}`)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(block.articles.length >= 3 ? block.articles.slice(0, 3) : articles.slice(0, 3)).map(a => (
                    <NewsCard key={a.slug || a.id} article={a} size="sm" />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="xl:sticky xl:top-28 xl:self-start space-y-8">
            <AdBlock w="100%" h={250} label="300×250 display" />
            <div>
              <SectionHeading title={t('home.most_read')} />
              {mostRead.filter(Boolean).map((a, i) => {
                const displayTitle = ARTICLE_TRANSLATIONS[a.slug]?.[lang]?.title || a.title
                return (
                  <div key={a.slug || a.id} onClick={() => router.push(`/article/${a.slug}`)}
                    className="group flex gap-3 mb-4 cursor-pointer">
                    <span className="text-[28px] font-extrabold text-gray-200 leading-none shrink-0 w-7 text-center">{i + 1}</span>
                    <div>
                      <div className="text-[14px] font-semibold text-gray-900 group-hover:text-secondary leading-snug transition-colors">{displayTitle}</div>
                      <div className="text-[12px] text-gray-500 mt-1">{a.readTime}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div>
              <SectionHeading title={t('home.latest')} />
              {latest.filter(Boolean).map(a => <NewsCard key={a.slug || a.id} article={a} horizontal />)}
            </div>
            <AdBlock w="100%" h={600} label="300×600 display" />
          </aside>
        </div>
      </div>
    </div>
  )
}
