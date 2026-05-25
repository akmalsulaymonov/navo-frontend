'use client'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'
import { ARTICLE_TRANSLATIONS } from '@/lib/articleTranslations'
import ImgPlaceholder from './ImgPlaceholder'
import CategoryPill from './CategoryPill'
import AuthorAvatar from './AuthorAvatar'

export default function NewsCard({ article, size = 'md', horizontal }) {
  const router = useRouter()
  const { lang } = useLanguage()
  const trans = ARTICLE_TRANSLATIONS[article.slug]?.[lang]
  const displayTitle = trans?.title || article.title
  const displayExcerpt = trans?.excerpt || article.excerpt
  const imgH = size === 'lg' ? 260 : size === 'sm' ? 140 : 200

  if (horizontal) {
    return (
      <div
        onClick={() => router.push(`/article/${article.slug}`)}
        className="group flex gap-4 cursor-pointer pb-4 border-b border-gray-200 dark:border-gray-700 mb-4"
      >
        <ImgPlaceholder w={110} h={80} label={article.title} seed={article.slug || String(article.id)} category={article.category} style={{ borderRadius: 4, flexShrink: 0 }} />
        <div className="flex-1 min-w-0">
          <CategoryPill cat={article.category} small />
          <div className="text-[14px] font-semibold text-gray-900 dark:text-gray-100 group-hover:text-secondary leading-snug mt-1.5 transition-colors line-clamp-2">{displayTitle}</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <AuthorAvatar name={article.author.name} size={18} style={{ border: 'none' }} />
            <span className="text-[12px] text-gray-500 dark:text-gray-400">{article.date}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => router.push(`/article/${article.slug}`)}
      className="group cursor-pointer bg-white dark:bg-[#161b2e] rounded-md overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
    >
      <ImgPlaceholder h={imgH} label={article.title} seed={article.slug || String(article.id)} category={article.category} />
      <div className="p-4 pb-5 flex-1 flex flex-col">
        <CategoryPill cat={article.category} />
        <div
          className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-secondary mt-2.5 mb-2 transition-colors line-clamp-3"
          style={{ fontSize: size === 'lg' ? 20 : size === 'sm' ? 15 : 17, lineHeight: 1.4 }}
        >{displayTitle}</div>
        {size !== 'sm' && (
          <div className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed flex-1 line-clamp-2">{displayExcerpt}</div>
        )}
        <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-soft dark:border-gray-700">
          <div className="flex items-center gap-1.5">
            <AuthorAvatar name={article.author.name} size={24} style={{ border: 'none' }} />
            <span className="text-[13px] font-medium text-gray-900 dark:text-gray-300">{article.author.name}</span>
          </div>
          <span className="text-[12px] text-gray-500 dark:text-gray-500">{article.date}</span>
        </div>
      </div>
    </div>
  )
}
