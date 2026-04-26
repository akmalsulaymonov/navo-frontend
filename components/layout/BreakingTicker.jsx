'use client'
import { useState, useEffect } from 'react'
import { NAVO_DATA } from '@/lib/data'

export default function BreakingTicker() {
  const [active, setActive] = useState(0)
  const items = NAVO_DATA.breaking

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % items.length), 5000)
    return () => clearInterval(t)
  }, [items.length])

  return (
    <div style={{ background: '#E53935', color: '#fff', display: 'flex', alignItems: 'center', height: 36, overflow: 'hidden' }}>
      <div style={{
        fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 11,
        letterSpacing: 1.2, padding: '0 16px', whiteSpace: 'nowrap',
        borderRight: '1px solid rgba(255,255,255,0.3)', height: '100%',
        display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.15)',
        textTransform: 'uppercase',
      }}>Breaking</div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 20px' }}>
        <div style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500,
          transition: 'opacity 0.4s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{items[active]}</div>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '0 16px' }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            width: 6, height: 6, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: i === active ? '#fff' : 'rgba(255,255,255,0.4)', padding: 0,
          }} />
        ))}
      </div>
    </div>
  )
}
