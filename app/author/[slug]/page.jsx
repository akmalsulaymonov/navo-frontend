import { notFound } from 'next/navigation'
import { NAVO_DATA } from '@/lib/data'
import AuthorContent from './_AuthorContent'

export function generateStaticParams() {
  return NAVO_DATA.authors.map(a => ({ slug: a.slug }))
}

export default function AuthorPage({ params }) {
  const author = NAVO_DATA.authors.find(a => a.slug === params.slug)
  if (!author) notFound()
  return <AuthorContent author={author} />
}
