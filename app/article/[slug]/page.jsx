import { notFound } from 'next/navigation'
import { NAVO_DATA } from '@/lib/data'
import ArticleContent from './_ArticleContent'

export function generateStaticParams() {
  return NAVO_DATA.articles.map(a => ({ slug: a.slug }))
}

export default function ArticlePage({ params }) {
  const article = NAVO_DATA.articles.find(a => a.slug === params.slug)
  if (!article) notFound()
  return <ArticleContent article={article} />
}
