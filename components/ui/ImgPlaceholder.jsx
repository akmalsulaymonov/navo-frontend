'use client'
import { getImgId } from '@/lib/utils'
import { IMG_POOLS } from '@/lib/constants'

export default function ImgPlaceholder({ w, h, label = '', seed = '', category = '', style = {} }) {
  const pool = category || Object.keys(IMG_POOLS).find(k => label.toLowerCase().includes(k.toLowerCase())) || 'default'
  const photoId = getImgId(seed || label || 'news', pool)
  const imgH = typeof h === 'number' ? h : undefined
  // use 2× the display width for retina, capped sensibly
  const urlW = typeof w === 'number' ? Math.min(Math.max(w * 2, 200), 1200) : 900
  return (
    <img
      src={`https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${urlW}&q=80`}
      alt={label}
      onError={e => { e.currentTarget.style.background = '#e8eaf0'; e.currentTarget.removeAttribute('src') }}
      style={{
        width: w || '100%',
        height: imgH || (typeof h === 'string' ? h : 200),
        objectFit: 'cover', display: 'block', flexShrink: 0,
        ...style,
      }}
    />
  )
}
