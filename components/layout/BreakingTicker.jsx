'use client'
import { useState, useEffect } from 'react'
import { useLanguage, useT, BREAKING_ITEMS } from '@/lib/i18n'

export default function BreakingTicker() {
  const [active, setActive] = useState(0)
  const { lang } = useLanguage()
  const t = useT()
  const items = BREAKING_ITEMS[lang] || BREAKING_ITEMS.en

  useEffect(() => { setActive(0) }, [lang])

  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % items.length), 5000)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <div className="bg-breaking text-white flex items-center h-9 overflow-hidden">
      <div className="font-bold text-[11px] tracking-widest px-4 shrink-0 border-r border-white/30 h-full flex items-center bg-black/15 uppercase">
        {t('breaking')}
      </div>
      <div className="flex-1 overflow-hidden px-5 min-w-0">
        <div className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {items[active]}
        </div>
      </div>
      <div className="flex gap-1.5 px-4 shrink-0">
        {items.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`w-1.5 h-1.5 rounded-full border-none cursor-pointer p-0 transition-all ${i === active ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}
