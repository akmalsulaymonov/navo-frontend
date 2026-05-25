'use client'
import { useLanguage, CAT_DISPLAY } from '@/lib/i18n'

const CAT_COLORS = {
  Politics:       { text: '#7B1C1C', bg: 'rgba(139,28,28,0.09)',  dot: '#C0392B' },
  Economy:        { text: '#1A5C2A', bg: 'rgba(27,94,32,0.09)',   dot: '#27AE60' },
  World:          { text: '#0D3B7A', bg: 'rgba(13,71,161,0.09)',  dot: '#1565C0' },
  Technology:     { text: '#4A1472', bg: 'rgba(74,20,140,0.09)',  dot: '#7B1FA2' },
  Sport:          { text: '#7D2E00', bg: 'rgba(230,81,0,0.09)',   dot: '#E65100' },
  Culture:        { text: '#880E4F', bg: 'rgba(173,20,87,0.09)',  dot: '#AD1457' },
  Investigations: { text: '#263238', bg: 'rgba(55,71,79,0.09)',   dot: '#455A64' },
  Regions:        { text: '#004D40', bg: 'rgba(0,105,92,0.09)',   dot: '#00897B' },
}
const DEFAULT_COLOR = { text: '#1E2A7A', bg: 'rgba(50,63,144,0.09)', dot: '#323F90' }

export default function CategoryPill({ cat, small, overlay }) {
  const { lang } = useLanguage()
  const { text, bg, dot } = CAT_COLORS[cat] || DEFAULT_COLOR
  const displayName = CAT_DISPLAY[lang]?.[cat] || cat

  // overlay mode: used on dark image backgrounds (hero, side cards)
  const overlayStyle = {
    color: '#fff',
    background: 'rgba(255,255,255,0.18)',
    boxShadow: '0 1px 6px rgba(0,0,0,0.18)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    border: '1px solid rgba(255,255,255,0.28)',
  }

  return (
    <span
      className="inline-flex items-center font-bold uppercase tracking-wide whitespace-nowrap"
      style={{
        gap: small ? 4 : 5,
        fontSize: small ? 10 : 11,
        letterSpacing: 0.8,
        borderRadius: 3,
        padding: small ? '2px 6px' : '3px 8px',
        ...(overlay
          ? overlayStyle
          : { color: text, background: bg, boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }
        ),
      }}
    >
      <span style={{
        width: small ? 5 : 6,
        height: small ? 5 : 6,
        borderRadius: '50%',
        background: overlay ? 'rgba(255,255,255,0.85)' : dot,
        flexShrink: 0,
        display: 'inline-block',
      }} />
      {displayName}
    </span>
  )
}
