import { C } from '@/lib/constants'

export default function SectionHeading({ title, action, onAction }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderTop: `3px solid ${C.primary}`, paddingTop: 14, marginBottom: 24,
    }}>
      <h2 style={{
        fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 700,
        color: C.textPrimary, margin: 0, letterSpacing: '-0.3px',
      }}>{title}</h2>
      {action && (
        <button onClick={onAction} style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600,
          color: C.secondary, background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, transition: 'opacity 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >{action} →</button>
      )}
    </div>
  )
}
