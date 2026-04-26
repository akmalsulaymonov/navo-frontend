'use client'
import { C } from '@/lib/constants'

export default function TagPill({ tag, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-block',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 12, fontWeight: 500,
        color: '#555', background: C.bgSoft,
        border: '1px solid #e5e5e5',
        borderRadius: 20, padding: '4px 12px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.borderColor = C.secondary; e.currentTarget.style.color = C.secondary } }}
      onMouseLeave={e => { if (onClick) { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.color = '#555' } }}
    >#{tag}</span>
  )
}
