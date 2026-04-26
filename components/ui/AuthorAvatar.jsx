import { NAVO_DATA } from '@/lib/data'
import { C } from '@/lib/constants'

export default function AuthorAvatar({ name, size = 28, style = {} }) {
  const author = NAVO_DATA.authors.find(a => a.name === name)
  const initials = name ? name[0] : '?'
  if (author?.photoId) {
    return (
      <img
        src={`https://images.unsplash.com/${author.photoId}?auto=format&fit=crop&w=${size * 2}&h=${size * 2}&q=80`}
        alt={name}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, border: `2px solid ${C.primary}`, ...style }}
      />
    )
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: C.bgSoft, border: `2px solid ${C.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...style }}>
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: size * 0.4, fontWeight: 700, color: C.primary }}>{initials}</span>
    </div>
  )
}
