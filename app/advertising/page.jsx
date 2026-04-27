'use client'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { useRouter } from 'next/navigation'

const CONTENT = {
  en: {
    tag: 'Advertising & Partnerships',
    title: 'Reach an Audience That Pays Attention',
    desc: 'NAVO readers are decision-makers, analysts, and engaged citizens who read deeply and act on what they learn. Our audience is built on trust — yours can be too.',
    stats: [
      { value: '18M', label: 'Monthly readers' },
      { value: '6.4 min', label: 'Avg. time on site' },
      { value: '62%', label: 'Graduate degree+' },
      { value: '41', label: 'Avg. reader age' },
    ],
    formats_title: 'Ad Formats',
    formats: [
      { icon: '🖥️', title: 'Display Advertising', desc: 'Premium placements including leaderboards (728×90), half-pages (300×600), and in-article rectangles (580×90). All formats are non-intrusive and viewability-guaranteed.', sizes: ['728×90 Leaderboard', '300×250 Rectangle', '300×600 Half Page', '580×90 In-article'] },
      { icon: '📰', title: 'Sponsored Content', desc: 'Long-form native articles produced by our branded content studio in collaboration with your team. Clearly labelled as sponsored. Distributed across NAVO\'s homepage and newsletter.', sizes: ['Branded article', 'Video feature', 'Interactive explainer', 'Data report'] },
      { icon: '📬', title: 'Newsletter Sponsorship', desc: 'Dedicated placement in NAVO\'s Morning Briefing (280,000 subscribers) and Sector newsletters (Economics, Technology, World). High-intent, engaged audience.', sizes: ['Morning Briefing', 'Economics Brief', 'Technology Pulse', 'World Dispatch'] },
      { icon: '🎯', title: 'Audience Targeting', desc: 'Target by section interest (Technology, Economy, World), by geography (country or city), or by contextual keyword. First-party data only — no third-party tracking.', sizes: ['Section targeting', 'Geographic targeting', 'Contextual targeting', 'Custom audiences'] },
    ],
    audience_title: 'Our Audience',
    audience: [
      { label: 'C-suite & Senior Management', pct: 34 },
      { label: 'Policy & Government', pct: 22 },
      { label: 'Finance & Economics', pct: 19 },
      { label: 'Academia & Research', pct: 14 },
      { label: 'Technology & Engineering', pct: 11 },
    ],
    geo_title: 'Geographic Reach',
    geos: [
      { region: 'Europe', pct: 48 },
      { region: 'North America', pct: 27 },
      { region: 'Asia-Pacific', pct: 14 },
      { region: 'Rest of World', pct: 11 },
    ],
    form_title: 'Request a Media Kit',
    name_ph: 'Your name',
    company_ph: 'Company',
    email_ph: 'you@company.com',
    budget_opts: ['Under €5,000/month', '€5,000–20,000/month', '€20,000–50,000/month', 'Over €50,000/month'],
    budget_label: 'Monthly budget',
    send_btn: 'Request Media Kit',
    success_title: 'Request received!',
    success_body: 'Our advertising team will send your media kit within one business day.',
  },
  ru: {
    tag: 'Реклама и партнёрство',
    title: 'Достигните аудитории, которая читает внимательно',
    desc: 'Читатели NAVO — это лица, принимающие решения, аналитики и вовлечённые граждане, которые читают глубоко и действуют исходя из полученной информации.',
    stats: [
      { value: '18 млн', label: 'Читателей в месяц' },
      { value: '6,4 мин', label: 'Ср. время на сайте' },
      { value: '62%', label: 'С высшим образованием' },
      { value: '41', label: 'Средний возраст читателя' },
    ],
    formats_title: 'Форматы рекламы',
    formats: [
      { icon: '🖥️', title: 'Дисплейная реклама', desc: 'Премиальные размещения, включая лидерборды (728×90), полустраницы (300×600) и прямоугольники внутри статей (580×90). Все форматы ненавязчивы и с гарантией видимости.', sizes: ['728×90 Лидерборд', '300×250 Прямоугольник', '300×600 Полустраница', '580×90 Внутри статьи'] },
      { icon: '📰', title: 'Спонсируемый контент', desc: 'Лонгриды, подготовленные нашей студией брендового контента совместно с вашей командой. Чётко помечены как спонсируемые. Распространяются на главной странице NAVO и в рассылках.', sizes: ['Брендовая статья', 'Видеосюжет', 'Интерактивный объяснитель', 'Отчёт на основе данных'] },
      { icon: '📬', title: 'Спонсорство рассылки', desc: 'Выделенное размещение в утреннем брифинге NAVO (280 000 подписчиков) и отраслевых рассылках (Экономика, Технологии, Мир). Высокововлечённая аудитория.', sizes: ['Утренний брифинг', 'Экономический брифинг', 'Технологический пульс', 'Мировой дайджест'] },
      { icon: '🎯', title: 'Таргетирование аудитории', desc: 'Таргетирование по интересу к разделу (Технологии, Экономика, Мир), по географии (страна или город) или по контекстному ключевому слову. Только первичные данные.', sizes: ['Таргетирование по разделу', 'Геотаргетинг', 'Контекстный таргетинг', 'Кастомные аудитории'] },
    ],
    audience_title: 'Наша аудитория',
    audience: [
      { label: 'Топ-менеджмент', pct: 34 },
      { label: 'Политика и государство', pct: 22 },
      { label: 'Финансы и экономика', pct: 19 },
      { label: 'Наука и исследования', pct: 14 },
      { label: 'Технологии и инжиниринг', pct: 11 },
    ],
    geo_title: 'Географический охват',
    geos: [
      { region: 'Европа', pct: 48 },
      { region: 'Северная Америка', pct: 27 },
      { region: 'Азиатско-Тихоокеанский регион', pct: 14 },
      { region: 'Остальной мир', pct: 11 },
    ],
    form_title: 'Запросить медиакит',
    name_ph: 'Ваше имя',
    company_ph: 'Компания',
    email_ph: 'вы@компания.com',
    budget_opts: ['До €5 000/месяц', '€5 000–20 000/месяц', '€20 000–50 000/месяц', 'Более €50 000/месяц'],
    budget_label: 'Ежемесячный бюджет',
    send_btn: 'Запросить медиакит',
    success_title: 'Запрос получен!',
    success_body: 'Наша команда по рекламе отправит медиакит в течение одного рабочего дня.',
  },
  tj: {
    tag: 'Реклама ва шарикӣ',
    title: 'Ба аудиторияе расед, ки бодиққат мехонад',
    desc: 'Хонандагони NAVO қарорсозон, таҳлилгарон ва шаҳрвандони фаъол мебошанд, ки амиқ мехонанд ва бар асоси он амал мекунанд.',
    stats: [
      { value: '18M', label: 'Хонандагони моҳона' },
      { value: '6.4 дақ', label: 'Вақти миёна дар сайт' },
      { value: '62%', label: 'Дорои таҳсилоти олӣ' },
      { value: '41', label: 'Синни миёнаи хонанда' },
    ],
    formats_title: 'Форматҳои рекламавӣ',
    formats: [
      { icon: '🖥️', title: 'Рекламаи намоишӣ', desc: 'Ҷойгузориҳои барҷаста, аз ҷумла лидербордҳо (728×90), нимсаҳифаҳо (300×600) ва мустатилҳои дохили мақола (580×90).', sizes: ['728×90 Лидерборд', '300×250 Мустатил', '300×600 Нимсаҳифа', '580×90 Дохили мақола'] },
      { icon: '📰', title: 'Мӯҳтавои спонсорӣ', desc: 'Мақолаҳои брендӣ, ки аз ҷониби студияи мӯҳтавои брендии мо дар якҷоягӣ бо гурӯҳи шумо тайёр карда шудаанд.', sizes: ['Мақолаи брендӣ', 'Видео', 'Шарҳи интерактивӣ', 'Гузориши маълумот'] },
      { icon: '📬', title: 'Спонсории хабарнома', desc: 'Ҷойгузории вижа дар Брифинги субҳонаи NAVO (280 000 обунашуда) ва хабарномаҳои соҳавӣ.', sizes: ['Брифинги субҳона', 'Брифинги иқтисодӣ', 'Набзи технология', 'Дайджести ҷаҳонӣ'] },
      { icon: '🎯', title: 'Ҳадафгирии аудитория', desc: 'Ҳадафгирӣ аз рӯи таваҷҷӯҳ ба бахш, ҷуғрофиё ё калимаи мафҳумӣ. Танҳо маълумоти аввалия.', sizes: ['Ҳадафгирии бахш', 'Ҳадафгирии ҷуғрофӣ', 'Ҳадафгирии мафҳумӣ', 'Аудиторияи фармоишӣ'] },
    ],
    audience_title: 'Аудиторияи мо',
    audience: [
      { label: 'Менеҷменти арша', pct: 34 },
      { label: 'Сиёсат ва давлат', pct: 22 },
      { label: 'Молия ва иқтисод', pct: 19 },
      { label: 'Илм ва таҳқиқот', pct: 14 },
      { label: 'Технология ва муҳандисӣ', pct: 11 },
    ],
    geo_title: 'Пӯшиши ҷуғрофӣ',
    geos: [
      { region: 'Аврупо', pct: 48 },
      { region: 'Амрикои Шимолӣ', pct: 27 },
      { region: 'Осиё-Уқёнус', pct: 14 },
      { region: 'Боқии ҷаҳон', pct: 11 },
    ],
    form_title: 'Медиакитро дархост кунед',
    name_ph: 'Номи шумо',
    company_ph: 'Ширкат',
    email_ph: 'шумо@ширкат.com',
    budget_opts: ['То €5 000/моҳ', '€5 000–20 000/моҳ', '€20 000–50 000/моҳ', 'Зиёда аз €50 000/моҳ'],
    budget_label: 'Буҷети моҳона',
    send_btn: 'Медиакитро дархост кунед',
    success_title: 'Дархост қабул шуд!',
    success_body: 'Гурӯҳи рекламаи мо медиакитро дар давоми як рӯзи корӣ мефиристад.',
  },
}

export default function AdvertisingPage() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] || CONTENT.en
  const [form, setForm] = useState({ name: '', company: '', email: '', budget: '' })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1000)
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #323F90 60%, #1486C8 100%)', minHeight: 380 }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80" alt="Analytics" className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="relative max-w-content mx-auto px-4 md:px-6 py-16 md:py-24 text-white">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase bg-white/15 border border-white/25 rounded px-3 py-1 mb-5">{c.tag}</div>
          <h1 className="text-[30px] md:text-[48px] font-extrabold leading-tight mb-5 max-w-[640px] tracking-tight">{c.title}</h1>
          <p className="text-[16px] md:text-[18px] text-white/70 max-w-[520px] leading-relaxed">{c.desc}</p>
        </div>
        {/* Stats bar */}
        <div className="relative border-t border-white/15">
          <div className="max-w-content mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {c.stats.map((s, i) => (
                <div key={i} className="text-white text-center py-5 border-r border-white/15 last:border-r-0">
                  <div className="text-[26px] md:text-[32px] font-extrabold">{s.value}</div>
                  <div className="text-[12px] text-white/55 mt-1 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 md:px-6 py-14 md:py-20">
        {/* Ad formats */}
        <h2 className="text-[26px] md:text-[34px] font-extrabold text-gray-900 mb-10">{c.formats_title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {c.formats.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-7 hover:border-primary hover:shadow-md transition-all">
              <div className="text-[28px] mb-4">{f.icon}</div>
              <h3 className="text-[18px] font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-4">{f.desc}</p>
              <div className="flex flex-wrap gap-2">
                {f.sizes.map(size => (
                  <span key={size} className="text-[12px] bg-soft text-gray-700 border border-gray-200 rounded px-2.5 py-1">{size}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Audience + Geo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-6">{c.audience_title}</h2>
            <div className="space-y-4">
              {c.audience.map((a, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[14px] mb-1.5">
                    <span className="text-gray-700">{a.label}</span>
                    <span className="font-bold text-primary">{a.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${a.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-6">{c.geo_title}</h2>
            <div className="space-y-4">
              {c.geos.map((g, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[14px] mb-1.5">
                    <span className="text-gray-700">{g.region}</span>
                    <span className="font-bold text-secondary">{g.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${g.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Request form */}
        <div className="max-w-[560px] bg-soft rounded-2xl p-8 md:p-10 border border-gray-200">
          <h2 className="text-[22px] font-bold text-gray-900 mb-6">{c.form_title}</h2>
          {done ? (
            <div className="text-center py-6">
              <div className="text-[48px] mb-3">✓</div>
              <h3 className="text-[18px] font-bold text-gray-900 mb-1">{c.success_title}</h3>
              <p className="text-[14px] text-gray-500">{c.success_body}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={c.name_ph} required
                className="w-full h-11 border border-gray-300 rounded-lg px-3.5 outline-none text-[14px] bg-white text-gray-900 focus:border-primary transition-colors" />
              <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder={c.company_ph} required
                className="w-full h-11 border border-gray-300 rounded-lg px-3.5 outline-none text-[14px] bg-white text-gray-900 focus:border-primary transition-colors" />
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder={c.email_ph} required
                className="w-full h-11 border border-gray-300 rounded-lg px-3.5 outline-none text-[14px] bg-white text-gray-900 focus:border-primary transition-colors" />
              <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} required
                className="w-full h-11 border border-gray-300 rounded-lg px-3.5 outline-none text-[14px] bg-white text-gray-900 focus:border-primary transition-colors cursor-pointer">
                <option value="">{c.budget_label}</option>
                {c.budget_opts.map(o => <option key={o}>{o}</option>)}
              </select>
              <button type="submit" disabled={loading}
                className="w-full h-12 text-[15px] font-bold text-white bg-primary border-none rounded-lg cursor-pointer hover:bg-primary/90 transition-colors disabled:opacity-60">
                {c.send_btn}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
