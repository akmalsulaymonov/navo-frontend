'use client'
import { useRouter } from 'next/navigation'
import { NAVO_DATA } from '@/lib/data'
import { useT, CAT_DISPLAY, useLanguage } from '@/lib/i18n'

export default function Footer() {
  const router = useRouter()
  const t = useT()
  const { lang } = useLanguage()
  const catNames = CAT_DISPLAY[lang] || CAT_DISPLAY.en
  const cats = NAVO_DATA.categories.slice(0, 5)

  const socials = [
    { label: 'T', name: 'Telegram' },
    { label: 'tw', name: 'Twitter/X' },
    { label: 'f', name: 'Facebook' },
    { label: 'in', name: 'LinkedIn' },
    { label: 'yt', name: 'YouTube' },
  ]

  return (
    <footer className="bg-[#1A1A1A] text-white mt-20">
      <div className="max-w-content mx-auto px-4 md:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-[28px] font-extrabold tracking-tight mb-3">NAVO</div>
            <p className="text-[14px] text-[#666] leading-[1.7] max-w-[280px]">{t('footer.desc')}</p>
            <div className="flex gap-3 mt-5">
              {socials.map(s => (
                <div key={s.name} title={s.name}
                  className="w-9 h-9 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center cursor-pointer text-[#999] transition-all hover:bg-primary hover:text-white hover:border-primary"
                >
                  <span className="text-[11px] font-bold uppercase">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#666] mb-4">{t('footer.sections')}</div>
            {cats.map(c => (
              <button key={c} onClick={() => router.push(`/category/${c}`)}
                className="block text-[14px] text-[#999] mb-2.5 cursor-pointer bg-transparent border-none text-left p-0 transition-colors hover:text-secondary"
              >{catNames[c] || c}</button>
            ))}
          </div>

          <div>
            <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#666] mb-4">{t('footer.company')}</div>
            {[t('footer.about'), t('footer.editorial'), t('footer.team'), t('footer.advertising'), t('footer.contacts')].map(l => (
              <button key={l} className="block text-[14px] text-[#999] mb-2.5 cursor-pointer bg-transparent border-none text-left p-0 transition-colors hover:text-secondary">{l}</button>
            ))}
          </div>

          <div>
            <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#666] mb-4">{t('footer.legal')}</div>
            {[t('footer.privacy'), t('footer.terms'), t('footer.cookies'), t('footer.gdpr')].map(l => (
              <button key={l} className="block text-[14px] text-[#999] mb-2.5 cursor-pointer bg-transparent border-none text-left p-0 transition-colors hover:text-secondary">{l}</button>
            ))}
            <div className="mt-5">
              <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#666] mb-2.5">{t('footer.newsletter')}</div>
              <div className="flex gap-2">
                <input placeholder={t('footer.email_ph')}
                  className="flex-1 min-w-0 px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white text-[13px] outline-none"
                />
                <button className="bg-primary text-white border-none rounded px-3.5 py-2 cursor-pointer text-[12px] font-semibold whitespace-nowrap">{t('footer.subscribe')}</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[13px] text-[#555]">{t('footer.copyright')}</span>
          <div className="flex gap-5">
            {[t('footer.privacy_s'), t('footer.terms_s'), t('footer.cookies_s')].map(l => (
              <button key={l} className="text-[13px] text-[#999] cursor-pointer bg-transparent border-none p-0 transition-colors hover:text-secondary">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
