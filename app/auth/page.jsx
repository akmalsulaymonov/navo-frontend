'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { C } from '@/lib/constants'
import { useT } from '@/lib/i18n'

const socials = [
  { name: 'Google', color: '#EA4335', icon: 'G' },
  { name: 'Facebook', color: '#1877F2', icon: 'f' },
  { name: 'Apple', color: '#000', icon: '⌘' },
  { name: 'Telegram', color: '#0088CC', icon: '✈' },
]

const strengthColors = ['', '#E53935', '#FF9800', '#FFC107', '#43A047']
const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

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
  const t = useT()
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

  if (done) return (
    <div className="min-h-[70vh] flex items-center justify-center bg-soft px-4">
      <div className="text-center py-12 px-6 max-w-sm w-full">
        <div className="w-[72px] h-[72px] rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-5">
          <span className="text-[32px]">✓</span>
        </div>
        <h2 className="text-[26px] font-extrabold text-gray-900 mb-2.5">
          {tab === 'login' ? t('auth.success_login_title') : t('auth.success_register_title')}
        </h2>
        <p className="text-[15px] text-gray-500 mb-7">
          {tab === 'login' ? t('auth.success_login_sub') : t('auth.success_register_sub')}
        </p>
        <button onClick={() => router.push('/')}
          className="text-[15px] font-bold bg-primary text-white border-none rounded px-8 py-3.5 cursor-pointer"
        >{t('auth.go_home')}</button>
      </div>
    </div>
  )

  return (
    <div className="min-h-[80vh] bg-soft flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[440px]">
        {/* Brand */}
        <div className="text-center mb-8">
          <span onClick={() => router.push('/')}
            className="text-[28px] font-extrabold text-primary cursor-pointer tracking-tight"
          >NAVO</span>
          <p className="text-[14px] text-gray-500 mt-1.5">{t('auth.tagline')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-gray-200">
            {['login', 'register'].map(tabKey => (
              <button key={tabKey} onClick={() => setTab(tabKey)}
                className={`text-[14px] py-4 cursor-pointer border-none transition-all ${tab === tabKey ? 'font-bold bg-white text-primary border-b-[3px] border-primary' : 'font-medium bg-soft text-gray-500 border-b-[3px] border-transparent'}`}
              >{tabKey === 'login' ? t('auth.login') : t('auth.register')}</button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {/* Socials */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {socials.map(s => (
                <button key={s.name}
                  className="flex items-center justify-center gap-2 text-[13px] font-semibold bg-white text-gray-900 border border-gray-300 rounded px-2 py-2.5 cursor-pointer transition-all"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#CCCCCC'; e.currentTarget.style.color = '#1A1A1A' }}
                >
                  <span className="font-extrabold text-[15px]" style={{ color: s.color }}>{s.icon}</span>
                  {s.name}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[12px] text-gray-500">{t('auth.or_email')}</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div>
                  <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">{t('auth.fullname')}</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder={t('auth.name_ph')} required={tab === 'register'}
                    className="w-full h-11 border border-gray-300 rounded px-3.5 outline-none text-[14px] text-gray-900 transition-colors focus:border-primary" />
                </div>
              )}

              <div>
                <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">{t('auth.email')}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('auth.email_ph')} required
                  className="w-full h-11 border border-gray-300 rounded px-3.5 outline-none text-[14px] text-gray-900 transition-colors focus:border-primary" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-[13px] font-semibold text-gray-900">{t('auth.password')}</label>
                  {tab === 'login' && <button type="button" className="text-[13px] text-secondary bg-transparent border-none cursor-pointer p-0">{t('auth.forgot')}</button>}
                </div>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => { setPassword(e.target.value); setStrength(calcStrength(e.target.value)) }}
                    placeholder="••••••••" required
                    className="w-full h-11 border border-gray-300 rounded pl-3.5 pr-11 outline-none text-[14px] text-gray-900 transition-colors focus:border-primary" />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 text-[14px]">
                    {showPass ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              {tab === 'register' && password && (
                <div>
                  <div className="flex gap-1 mb-1.5">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex-1 h-1 rounded-sm transition-all duration-300"
                        style={{ background: i <= strength ? strengthColors[strength] : '#e0e0e0' }} />
                    ))}
                  </div>
                  <span className="text-[12px] font-semibold" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full h-12 text-[15px] font-bold text-white border-none rounded cursor-pointer transition-colors hover:opacity-90 disabled:opacity-60 disabled:cursor-wait"
                style={{ background: loading ? '#8a95c4' : C.primary }}
              >{loading ? t('auth.loading') : tab === 'login' ? t('auth.login_btn') : t('auth.register_btn')}</button>
            </form>

            {tab === 'register' && (
              <p className="text-[12px] text-gray-500 text-center mt-4 leading-relaxed">
                {t('auth.terms')} <span className="text-secondary cursor-pointer">{t('auth.terms_link')}</span> {t('auth.and')} <span className="text-secondary cursor-pointer">{t('auth.privacy_link')}</span>
              </p>
            )}
          </div>
        </div>

        <p className="text-[13px] text-gray-500 text-center mt-5">
          {tab === 'login' ? t('auth.no_account') : t('auth.have_account')}{' '}
          <button onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
            className="text-[13px] font-bold text-secondary bg-transparent border-none cursor-pointer p-0"
          >{tab === 'login' ? t('auth.register') : t('auth.login')}</button>
        </p>
      </div>
    </div>
  )
}
