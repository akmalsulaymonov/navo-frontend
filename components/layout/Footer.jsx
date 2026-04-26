'use client'
import { useRouter } from 'next/navigation'
import { NAVO_DATA } from '@/lib/data'

export default function Footer() {
  const router = useRouter()
  const cats = NAVO_DATA.categories.slice(0, 5)

  const linkStyle = {
    display: 'block', fontSize: 14, fontWeight: 400,
    color: '#999', marginBottom: 10, cursor: 'pointer',
    textDecoration: 'none', transition: 'color 0.15s',
    background: 'none', border: 'none', textAlign: 'left', padding: 0,
    fontFamily: 'Montserrat, sans-serif',
  }

  const socials = [
    { label: 'T', name: 'Telegram' },
    { label: 'tw', name: 'Twitter/X' },
    { label: 'f', name: 'Facebook' },
    { label: 'in', name: 'LinkedIn' },
    { label: 'yt', name: 'YouTube' },
  ]

  return (
    <footer style={{ background: '#1A1A1A', color: '#fff', fontFamily: 'Montserrat, sans-serif', marginTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 12 }}>NAVO</div>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, maxWidth: 280 }}>
              Independent journalism. Verified facts. Global perspective. NAVO covers the stories that shape our world.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {socials.map(s => (
                <div key={s.name} style={{ width: 36, height: 36, borderRadius: '50%', background: '#2a2a2a', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#999', fontSize: 14, transition: 'all 0.15s' }} title={s.name}
                  onMouseEnter={e => { e.currentTarget.style.background = '#323F90'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#323F90' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#2a2a2a'; e.currentTarget.style.color = '#999'; e.currentTarget.style.borderColor = '#333' }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#666', marginBottom: 16 }}>Sections</div>
            {cats.map(c => (
              <button key={c} style={linkStyle} onClick={() => router.push(`/category/${c}`)}
                onMouseEnter={e => e.currentTarget.style.color = '#1486C8'}
                onMouseLeave={e => e.currentTarget.style.color = '#999'}
              >{c}</button>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#666', marginBottom: 16 }}>Company</div>
            {['About NAVO', 'Editorial Policy', 'Our Team', 'Advertising', 'Contacts'].map(l => (
              <button key={l} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = '#1486C8'}
                onMouseLeave={e => e.currentTarget.style.color = '#999'}
              >{l}</button>
            ))}
          </div>

          {/* Legal + Newsletter */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#666', marginBottom: 16 }}>Legal</div>
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'GDPR'].map(l => (
              <button key={l} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = '#1486C8'}
                onMouseLeave={e => e.currentTarget.style.color = '#999'}
              >{l}</button>
            ))}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#666', marginBottom: 10 }}>Newsletter</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input placeholder="your@email.com" style={{ flex: 1, padding: '8px 12px', background: '#2a2a2a', border: '1px solid #333', borderRadius: 4, color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: 13, outline: 'none', minWidth: 0 }} />
                <button style={{ background: '#323F90', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 14px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#555' }}>© 2026 NAVO Information Agency. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <button key={l} style={{ ...linkStyle, marginBottom: 0, fontSize: 13 }}
                onMouseEnter={e => e.currentTarget.style.color = '#1486C8'}
                onMouseLeave={e => e.currentTarget.style.color = '#999'}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
