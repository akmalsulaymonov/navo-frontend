import { NAVO_DATA } from '@/lib/data'

export default function AuthorAvatar({ name, size = 28, style = {} }) {
  const author = NAVO_DATA.authors.find(a => a.name === name)
  const initials = name ? name[0] : '?'
  const baseStyle = { width: size, height: size, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, border: '2px solid #323F90', ...style }

  if (author?.photoId) {
    return (
      <img
        src={`https://images.unsplash.com/${author.photoId}?auto=format&fit=crop&w=${size * 2}&h=${size * 2}&q=80`}
        alt={name}
        style={baseStyle}
      />
    )
  }
  return (
    <div style={{ ...baseStyle, background: '#F7F8FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.4, fontWeight: 700, color: '#323F90' }}>{initials}</span>
    </div>
  )
}
