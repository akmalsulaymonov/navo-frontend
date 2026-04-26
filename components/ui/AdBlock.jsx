import { getAdItem } from '@/lib/utils'

export default function AdBlock({ w = '100%', h = 250, label = '' }) {
  const { ad, format, numH } = getAdItem(w, h, label)
  return (
    <div style={{ width: w, height: numH, position: 'relative', overflow: 'hidden', borderRadius: 4, flexShrink: 0 }}>
      <img
        src={`https://images.unsplash.com/${ad.photo}?auto=format&fit=crop&w=900&q=75`}
        alt="advertisement"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: ad.overlay }} />
      <div style={{
        position: 'absolute', top: 6, right: 6,
        background: 'rgba(0,0,0,0.45)', color: '#fff',
        fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 600,
        letterSpacing: 1, padding: '2px 6px', borderRadius: 2, textTransform: 'uppercase',
      }}>Ad</div>
      {format === 'leaderboard' || format === 'infeed' ? (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 22, fontWeight: 800, color: ad.text, letterSpacing: 2 }}>{ad.brand}</div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{ad.tagline}</div>
          </div>
          <button style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700, background: '#fff', color: '#1A1A1A', border: 'none', borderRadius: 3, padding: '8px 20px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Learn More</button>
        </div>
      ) : (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: numH >= 500 ? '28px 24px' : '16px 18px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
        }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: numH >= 400 ? 24 : 16, fontWeight: 800, color: ad.text, letterSpacing: 1.5 }}>{ad.brand}</div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: numH >= 400 ? 14 : 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{ad.tagline}</div>
          {numH >= 300 && (
            <button style={{ marginTop: 14, fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700, background: '#fff', color: '#1A1A1A', border: 'none', borderRadius: 3, padding: '8px 20px', cursor: 'pointer' }}>Learn More</button>
          )}
        </div>
      )}
    </div>
  )
}
