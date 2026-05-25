'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { NAVO_DATA } from '@/lib/data'
import { getImgId } from '@/lib/utils'
import { useT, useLanguage, CAT_DISPLAY, SUBCATS_DISPLAY } from '@/lib/i18n'
import ImgPlaceholder from '@/components/ui/ImgPlaceholder'
import NewsCard from '@/components/ui/NewsCard'
import CategoryPill from '@/components/ui/CategoryPill'

const SUBCATS = {
  Politics: ['Parliament', 'Elections', 'Government', 'Parties', 'International'],
  Economy: ['Markets', 'Banking', 'Trade', 'Energy', 'Labour'],
  Technology: ['AI', 'Cybersecurity', 'Startups', 'Policy', 'Science'],
  World: ['Europe', 'Asia', 'Americas', 'Middle East', 'Africa'],
  Sport: ['Football', 'Athletics', 'Tennis', 'Olympics', 'Esports'],
  Culture: ['Film', 'Music', 'Literature', 'Art', 'Society'],
  Investigations: ['Finance', 'Power', 'Environment', 'Health', 'Justice'],
  Regions: ['Dushanbe', 'Sughd', 'Khatlon', 'GBAO', 'RRS'],
}

function FeaturedCard({ article, category, activeTab, isMain }) {
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/article/${article.slug}`)}
      className="group relative rounded-lg overflow-hidden cursor-pointer"
      style={{ minHeight: isMain ? 380 : 180 }}
    >
      <ImgPlaceholder h="100%" label={article.title} seed={article.slug} category={category} style={{ position: 'absolute', inset: 0, height: '100%' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ padding: isMain ? '28px' : '20px' }}>
        <CategoryPill cat={activeTab !== 'All' ? activeTab : article.category} small />
        <h2 className="font-bold text-white leading-snug mt-2 mb-2 group-hover:underline decoration-white/50 line-clamp-3"
          style={{ fontSize: isMain ? 24 : 17 }}>{article.title}</h2>
        <div className="text-[12px] text-white/65">{article.author.name} · {article.date}</div>
      </div>
    </div>
  )
}

export default function CategoryPage() {
  const { slug: category } = useParams()
  const t = useT()
  const { lang } = useLanguage()
  const catNames = CAT_DISPLAY[lang] || CAT_DISPLAY.en
  const subcatNames = SUBCATS_DISPLAY[lang] || SUBCATS_DISPLAY.en
  const [activeTab, setActiveTab] = useState('All')
  const [sort, setSort] = useState('latest')
  const [page, setPage] = useState(1)

  const tabs = ['All', ...(SUBCATS[category] || [])]
  const catArticles = NAVO_DATA.articles.filter(a => a.category === category)
  const allArticles = catArticles.length >= 3 ? catArticles : NAVO_DATA.articles.slice(0, 9)
  const featured = allArticles.slice(0, 2)
  const gridArticles = allArticles.slice(2)
  const displayCatName = catNames[category] || category

  // Banner image: pick a deterministic hero image from the category pool
  const bannerImgId = getImgId(category + '-banner', category)
  const bannerImgUrl = `https://images.unsplash.com/${bannerImgId}?auto=format&fit=crop&w=1600&q=80`

  const sortOptions = [
    { key: 'latest', label: t('cat_page.latest') },
    { key: 'popular', label: t('cat_page.popular') },
  ]

  return (
    <div className="bg-white dark:bg-[#0d0f17]">
      {/* Banner */}
      <div
        className="relative text-white py-10 md:py-16 overflow-hidden"
        style={{
          backgroundImage: `url(${bannerImgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.55) 100%)' }} />

        <div className="max-w-content mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-[11px] font-bold tracking-[2px] uppercase opacity-60 mb-2">{t('cat_page.section')}</div>
              <h1 className="text-[36px] md:text-[48px] font-extrabold m-0 tracking-tight drop-shadow-lg">{displayCatName}</h1>
              <p className="text-[15px] md:text-[16px] opacity-80 mt-3 max-w-[480px] leading-relaxed drop-shadow">
                {t('cat_page.coverage')} {displayCatName.toLowerCase()} {t('cat_page.coverage2')}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-[32px] font-extrabold opacity-90 drop-shadow">{allArticles.length * 12}+</div>
              <div className="text-[13px] opacity-60">{t('cat_page.articles_published')}</div>
            </div>
          </div>
          {/* Sub-category tabs */}
          <div className="flex gap-1 mt-8 flex-wrap">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`text-[13px] px-4 py-2 cursor-pointer border-none rounded-t transition-all
                  ${activeTab === tab
                    ? 'font-bold bg-white/20 border-b-2 border-white'
                    : 'font-medium bg-transparent border-b-2 border-transparent opacity-75 hover:opacity-100'
                  } text-white`}
              >{subcatNames[tab] || tab}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 md:px-6 py-8 md:py-10">
        {/* Sort bar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <span className="text-[14px] text-gray-500 dark:text-gray-400">
            {t('cat_page.showing')} <strong className="text-gray-900 dark:text-white">{allArticles.length}</strong> {t('cat_page.articles_count')}{activeTab !== 'All' ? ` ${t('cat_page.in')} ${subcatNames[activeTab] || activeTab}` : ''}
          </span>
          <div className="flex gap-2 items-center">
            <span className="text-[13px] text-gray-500 dark:text-gray-400">{t('cat_page.sort')}</span>
            {sortOptions.map(({ key, label }) => (
              <button key={key} onClick={() => setSort(key)}
                className={`text-[13px] border rounded px-3.5 py-1.5 cursor-pointer transition-all capitalize
                  ${sort === key
                    ? 'font-bold bg-primary text-white border-primary'
                    : 'font-normal bg-transparent text-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                  }`}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className={`grid gap-6 mb-12 ${featured.length > 1 ? 'grid-cols-1 md:grid-cols-[2fr_1fr]' : 'grid-cols-1'}`}>
            {featured.map((a, i) => <FeaturedCard key={a.slug || a.id} article={a} category={category} activeTab={activeTab} isMain={i === 0} />)}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {(gridArticles.length > 0 ? gridArticles : allArticles).slice(0, page * 9).map(a => (
            <NewsCard key={a.slug || a.id} article={a} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-12">
          {[1, 2, 3, '…', 12].map((p, i) => (
            <button key={i} onClick={() => typeof p === 'number' && setPage(p)}
              className={`text-[14px] border rounded w-10 h-10 cursor-pointer transition-all
                ${p === page
                  ? 'font-bold bg-primary text-white border-primary'
                  : 'font-normal bg-transparent text-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary'
                }`}
            >{p}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
