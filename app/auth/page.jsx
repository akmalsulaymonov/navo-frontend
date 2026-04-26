'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { C } from '@/lib/constants'

const socials = [
  { name: 'Google', color: '#EA4335', icon: 'G' },
  { name: 'Facebook', color: '#1877F2', icon: 'f' },
  { name: 'Apple', color: '#000', icon: '⌘' },
  { name: 'Telegram', color: '#0088CC', icon: '✈' },
]

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']
const strengthColors = ['', '#E53935', '#FF9800', '#FFC107', '#43A047']

function calcStrength(p) {
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
}

export default function AuthPage() {
  const router = useRouter()
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [strength, setStrength] = useState(0)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1200)
  }

  const inputStyle = {
    width: '100%', height: 44, fontFamily: 'Montserrat, sans-serif', fontSize: 14,
    border: `1px solid ${C.neutral}`, borderRadius: 6, padding: '0 14px', outline: 'none',
    boxSizing: 'border-box', color: C.textPrimary, transition: 'border-color 0.15s',
  }

  if (done) return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bgSoft }}>
      <div style={{ textAlign: 'center', padding: 48 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <span style={{ fontSize: 32 }}>✓</span>
        </div>
        <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 26, fontWeight: 800, color: C.textPrimary, marginBottom: 10 }}>
          {tab === 'login' ? 'Welcome back!' : 'Account created!'}
        </h2>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, color: C.textSecondary, marginBottom: 28 }}>
          {tab === 'login' ? "You're now logged in to NAVO." : 'Your NAVO account is ready.'}
        </p>
        <button onClick={() => router.push('/')} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 700, background: C.primary, color: '#fff', border: 'none', borderRadius: 6, padding: '13px 32px', cursor: 'pointer' }}>Go to Homepage</button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '80vh', background: C.bgSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span onClick={() => router.push('/')} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 28, fontWeight: 800, color: C.primary, cursor: 'pointer', letterSpacing: '-0.5px' }}>NAVO</span>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: C.textSecondary, marginTop: 6 }}>Independent journalism you can trust</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${C.neutral}` }}>
            {['login', 'register'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: tab === t ? 700 : 500, background: tab === t ? '#fff' : C.bgSoft, color: tab === t ? C.primary : C.textSecondary, border: 'none', borderBottom: tab === t ? `3px solid ${C.primary}` : '3px solid transparent', padding: '16px', cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize' }}>{t === 'login' ? 'Log In' : 'Register'}</button>
            ))}
          </div>

          <div style={{ padding: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              {socials.map(s => (
                <button key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, background: '#fff', color: C.textPrimary, border: `1px solid ${C.neutral}`, borderRadius: 6, padding: '10px 8px', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.neutral; e.currentTarget.style.color = C.textPrimary }}
                >
                  <span style={{ fontWeight: 800, fontSize: 15, color: s.color }}>{s.icon}</span>
                  {s.name}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: C.neutral }} />
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>or continue with email</span>
              <div style={{ flex: 1, height: 1, background: C.neutral }} />
            </div>

            <form onSubmit={handleSubmit}>
              {tab === 'register' && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, color: C.textPrimary, display: 'block', marginBottom: 6 }}>Full name</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Elena Marchetti" required={tab === 'register'} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.neutral} />
                </div>
              )}

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, color: C.textPrimary, display: 'block', marginBottom: 6 }}>Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.neutral} />
              </div>

              <div style={{ marginBottom: tab === 'register' ? 8 : 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, color: C.textPrimary }}>Password</label>
                  {tab === 'login' && <button type="button" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.secondary, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Forgot?</button>}
                </div>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => { setPassword(e.target.value); setStrength(calcStrength(e.target.value)) }}
                    placeholder="••••••••" required style={{ ...inputStyle, padding: '0 44px 0 14px' }}
                    onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.neutral} />
                  <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.textSecondary, fontSize: 14 }}>{showPass ? '🙈' : '👁'}</button>
                </div>
              </div>

              {tab === 'register' && password && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                    {[1, 2, 3, 4].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength ? strengthColors[strength] : '#e0e0e0', transition: 'background 0.3s' }} />)}
                  </div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: strengthColors[strength], fontWeight: 600 }}>{strengthLabels[strength]}</span>
                </div>
              )}

              <button type="submit" disabled={loading} style={{ width: '100%', height: 48, fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 700, background: loading ? '#8a95c4' : C.primary, color: '#fff', border: 'none', borderRadius: 6, cursor: loading ? 'wait' : 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#2a3478' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = C.primary }}
              >{loading ? 'Please wait…' : tab === 'login' ? 'Log In to NAVO' : 'Create Account'}</button>
            </form>

            {tab === 'register' && (
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
                By registering you agree to our <span style={{ color: C.secondary, cursor: 'pointer' }}>Terms of Use</span> and <span style={{ color: C.secondary, cursor: 'pointer' }}>Privacy Policy</span>
              </p>
            )}
          </div>
        </div>

        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.textSecondary, textAlign: 'center', marginTop: 20 }}>
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setTab(tab === 'login' ? 'register' : 'login')} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700, color: C.secondary, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {tab === 'login' ? 'Register' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  )
}
