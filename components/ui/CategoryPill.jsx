import { C } from '@/lib/constants'

export default function CategoryPill({ cat, small }) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: small ? 10 : 11, fontWeight: 700,
      letterSpacing: 1, textTransform: 'uppercase',
      color: C.primary, background: 'rgba(50,63,144,0.08)',
      borderRadius: 3, padding: small ? '2px 7px' : '3px 9px',
    }}>{cat}</span>
  )
}
