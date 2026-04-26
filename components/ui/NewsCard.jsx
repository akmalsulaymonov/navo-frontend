'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { C } from '@/lib/constants'
import ImgPlaceholder from './ImgPlaceholder'
import CategoryPill from './CategoryPill'
import AuthorAvatar from './AuthorAvatar'

export default function NewsCard({ article, size = 'md', horizontal }) {
  const [hovered, setHovered] = useState(false)
  const router = useRouter()
  const imgH = size === 'lg' ? 260 : size === 'sm' ? 140 : 200

  if (horizontal) {
    return (
      <div
        onClick={() => router.push(`/article/${article.slug}`)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: 'flex', gap: 16, cursor: 'pointer', paddingBottom: 16, borderBottom: `1px solid ${C.neutral}`, marginBottom: 16 }}
      >
        <ImgPlaceholder w={110} h={80} label={article.title} seed={article.slug || String(article.id)} category={article.category} style={{ borderRadius: 4, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <CategoryPill cat={article.category} small />
          <div style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600,
            color: hovered ? C.secondary : C.textPrimary,
            lineHeight: 1.4, marginTop: 6, transition: 'color 0.15s',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{article.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <AuthorAvatar name={article.author.name} size={18} style={{ border: 'none' }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>{article.date}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => router.push(`/article/${article.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer', background: '#fff', borderRadius: 6, overflow: 'hidden',
        boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column',
      }}
    >
      <ImgPlaceholder h={imgH} label={article.title} seed={article.slug || String(article.id)} category={article.category} />
      <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CategoryPill cat={article.category} />
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: size === 'lg' ? 20 : size === 'sm' ? 15 : 17,
          fontWeight: 600, lineHeight: 1.4,
          color: hovered ? C.secondary : C.textPrimary,
          margin: '10px 0 8px', transition: 'color 0.15s',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{article.title}</div>
        {size !== 'sm' && (
          <div style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: C.textSecondary,
            lineHeight: 1.6, flex: 1,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{article.excerpt}</div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.bgSoft}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <AuthorAvatar name={article.author.name} size={24} style={{ border: 'none' }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500, color: C.textPrimary }}>{article.author.name}</span>
          </div>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>{article.date}</span>
        </div>
      </div>
    </div>
  )
}
