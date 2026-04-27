'use client'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n'

const CONTENT = {
  en: {
    tag: 'Contact Us',
    title: 'Get in Touch',
    desc: 'Whether you have a news tip, a press enquiry, or feedback on our journalism — we want to hear from you.',
    form_title: 'Send Us a Message',
    name_label: 'Your name',
    name_ph: 'Elena Marchetti',
    email_label: 'Email address',
    email_ph: 'you@example.com',
    subject_label: 'Subject',
    subject_opts: ['General enquiry', 'News tip', 'Press & media', 'Corrections', 'Advertising', 'Technical issue'],
    message_label: 'Message',
    message_ph: 'Tell us what\'s on your mind…',
    send_btn: 'Send Message',
    sending: 'Sending…',
    success_title: 'Message sent!',
    success_body: 'Thank you for reaching out. Our team will respond within 2 business days.',
    offices_title: 'Our Offices',
    offices: [
      { city: 'Brussels', country: 'Belgium', role: 'Global Headquarters', address: 'Rue de la Loi 200, 1049 Brussels', phone: '+32 2 555 0100', email: 'brussels@navo.news' },
      { city: 'London', country: 'United Kingdom', role: 'UK & Finance Desk', address: '1 Canada Square, Canary Wharf, E14 5AB', phone: '+44 20 7946 0200', email: 'london@navo.news' },
      { city: 'Washington D.C.', country: 'United States', role: 'Americas Bureau', address: '1100 K Street NW, Suite 400, DC 20005', phone: '+1 202 555 0180', email: 'dc@navo.news' },
    ],
    contacts_title: 'Editorial Contacts',
    contacts: [
      { role: 'General Editorial', email: 'editorial@navo.news' },
      { role: 'News Tips (secure)', email: 'tips@navo.news' },
      { role: 'Press & Media', email: 'press@navo.news' },
      { role: 'Corrections', email: 'corrections@navo.news' },
      { role: 'Data Protection Officer', email: 'dpo@navo.news' },
    ],
    tips_title: 'Submit a News Tip',
    tips_body: 'Have information about a matter of public interest? Our investigative team reviews all tips confidentially. For sensitive disclosures, use our SecureDrop link.',
    tips_btn: 'Use SecureDrop',
  },
  ru: {
    tag: 'Свяжитесь с нами',
    title: 'Напишите нам',
    desc: 'Будь то информация о событии, запрос для прессы или отзыв о нашей работе — мы хотим услышать вас.',
    form_title: 'Отправьте нам сообщение',
    name_label: 'Ваше имя',
    name_ph: 'Иван Иванов',
    email_label: 'Электронная почта',
    email_ph: 'вы@example.com',
    subject_label: 'Тема',
    subject_opts: ['Общий запрос', 'Информация о событии', 'Пресса и СМИ', 'Исправления', 'Реклама', 'Технический вопрос'],
    message_label: 'Сообщение',
    message_ph: 'Напишите, что вас интересует…',
    send_btn: 'Отправить',
    sending: 'Отправка…',
    success_title: 'Сообщение отправлено!',
    success_body: 'Спасибо, что написали нам. Наша команда ответит в течение 2 рабочих дней.',
    offices_title: 'Наши офисы',
    offices: [
      { city: 'Брюссель', country: 'Бельгия', role: 'Глобальная штаб-квартира', address: 'Rue de la Loi 200, 1049 Brussels', phone: '+32 2 555 0100', email: 'brussels@navo.news' },
      { city: 'Лондон', country: 'Великобритания', role: 'Отдел Великобритании & Финансов', address: '1 Canada Square, Canary Wharf, E14 5AB', phone: '+44 20 7946 0200', email: 'london@navo.news' },
      { city: 'Вашингтон', country: 'США', role: 'Американское бюро', address: '1100 K Street NW, Suite 400, DC 20005', phone: '+1 202 555 0180', email: 'dc@navo.news' },
    ],
    contacts_title: 'Редакционные контакты',
    contacts: [
      { role: 'Общая редакция', email: 'editorial@navo.news' },
      { role: 'Информация о событии (защищено)', email: 'tips@navo.news' },
      { role: 'Пресса и СМИ', email: 'press@navo.news' },
      { role: 'Исправления', email: 'corrections@navo.news' },
      { role: 'Офицер по защите данных', email: 'dpo@navo.news' },
    ],
    tips_title: 'Отправить информацию о событии',
    tips_body: 'Есть информация о деле, представляющем общественный интерес? Наша следственная группа конфиденциально рассматривает все сообщения. Для конфиденциальных раскрытий используйте наш SecureDrop.',
    tips_btn: 'Использовать SecureDrop',
  },
  tj: {
    tag: 'Бо мо тамос гиред',
    title: 'Бо мо муошират кунед',
    desc: 'Хоҳ маслиҳати хабарӣ, хоҳ дархости матбуот, хоҳ бозхӯрд — мехоҳем аз шумо бишнавем.',
    form_title: 'Паёме фиристед',
    name_label: 'Номи шумо',
    name_ph: 'Алишер Назаров',
    email_label: 'Суроғаи почтаи электронӣ',
    email_ph: 'шумо@example.com',
    subject_label: 'Мавзӯъ',
    subject_opts: ['Дархости умумӣ', 'Маслиҳати хабарӣ', 'Матбуот ва ВАО', 'Ислоҳот', 'Реклама', 'Мушкили техникӣ'],
    message_label: 'Паём',
    message_ph: 'Чӣ фикр доред, бинависед…',
    send_btn: 'Фиристодан',
    sending: 'Фиристода шуд…',
    success_title: 'Паём фиристода шуд!',
    success_body: 'Ташаккур барои тамос. Гурӯҳи мо дар давоми 2 рӯзи корӣ ҷавоб хоҳад дод.',
    offices_title: 'Дафтарҳои мо',
    offices: [
      { city: 'Брюссел', country: 'Белгия', role: 'Қароргоҳи ҷаҳонӣ', address: 'Rue de la Loi 200, 1049 Brussels', phone: '+32 2 555 0100', email: 'brussels@navo.news' },
      { city: 'Лондон', country: 'Британияи Кабир', role: 'Бюрои Британия & Молия', address: '1 Canada Square, Canary Wharf, E14 5AB', phone: '+44 20 7946 0200', email: 'london@navo.news' },
      { city: 'Вашингтон', country: 'Иёлоти Муттаҳида', role: 'Бюрои Амрико', address: '1100 K Street NW, Suite 400, DC 20005', phone: '+1 202 555 0180', email: 'dc@navo.news' },
    ],
    contacts_title: 'Тамосҳои таҳририя',
    contacts: [
      { role: 'Таҳририяи умумӣ', email: 'editorial@navo.news' },
      { role: 'Маслиҳатҳои хабарӣ (бехатар)', email: 'tips@navo.news' },
      { role: 'Матбуот ва ВАО', email: 'press@navo.news' },
      { role: 'Ислоҳот', email: 'corrections@navo.news' },
      { role: 'Масъули ҳифзи маълумот', email: 'dpo@navo.news' },
    ],
    tips_title: 'Маслиҳати хабарӣ пешниҳод кунед',
    tips_body: 'Оё иттилооте дар бораи масъалаи манфиати ҷомеа доред? Гурӯҳи таҳқиқотии мо ҳамаи маслиҳатҳоро маҳрамона баррасӣ мекунад.',
    tips_btn: 'Истифодаи SecureDrop',
  },
}

export default function ContactsPage() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] || CONTENT.en
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1200)
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-soft border-b border-gray-200 py-14 md:py-20">
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase text-primary bg-primary/10 rounded px-3 py-1 mb-4">{c.tag}</div>
          <h1 className="text-[32px] md:text-[48px] font-extrabold text-gray-900 mb-4 tracking-tight">{c.title}</h1>
          <p className="text-[17px] text-gray-500 max-w-[520px] leading-relaxed">{c.desc}</p>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
          {/* Contact form */}
          <div>
            <h2 className="text-[22px] font-bold text-gray-900 mb-7">{c.form_title}</h2>
            {done ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center">
                <div className="text-[48px] mb-4">✓</div>
                <h3 className="text-[20px] font-bold text-gray-900 mb-2">{c.success_title}</h3>
                <p className="text-[15px] text-gray-500">{c.success_body}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">{c.name_label}</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={c.name_ph} required
                      className="w-full h-11 border border-gray-300 rounded-lg px-3.5 outline-none text-[14px] text-gray-900 focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">{c.email_label}</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder={c.email_ph} required
                      className="w-full h-11 border border-gray-300 rounded-lg px-3.5 outline-none text-[14px] text-gray-900 focus:border-primary transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">{c.subject_label}</label>
                  <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required
                    className="w-full h-11 border border-gray-300 rounded-lg px-3.5 outline-none text-[14px] text-gray-900 bg-white focus:border-primary transition-colors cursor-pointer">
                    <option value="">—</option>
                    {c.subject_opts.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">{c.message_label}</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder={c.message_ph} required
                    className="w-full min-h-[160px] border border-gray-300 rounded-lg px-3.5 py-3 outline-none text-[14px] text-gray-900 resize-y focus:border-primary transition-colors" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full h-12 text-[15px] font-bold text-white bg-primary border-none rounded-lg cursor-pointer hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-wait">
                  {loading ? c.sending : c.send_btn}
                </button>
              </form>
            )}

            {/* News Tips */}
            <div className="mt-10 bg-[#0f172a] rounded-xl p-7 text-white">
              <h3 className="text-[17px] font-bold mb-2">{c.tips_title}</h3>
              <p className="text-[14px] text-white/65 leading-relaxed mb-4">{c.tips_body}</p>
              <button className="text-[13px] font-semibold bg-white/15 border border-white/25 text-white rounded px-4 py-2 cursor-pointer hover:bg-white/25 transition-all">
                {c.tips_btn}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Offices */}
            <div>
              <h2 className="text-[18px] font-bold text-gray-900 mb-5">{c.offices_title}</h2>
              <div className="space-y-5">
                {c.offices.map((o, i) => (
                  <div key={i} className="bg-soft rounded-xl p-5 border border-gray-200">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-[22px]">📍</div>
                      <div>
                        <div className="text-[15px] font-bold text-gray-900">{o.city}</div>
                        <div className="text-[12px] text-gray-500">{o.country} · {o.role}</div>
                      </div>
                    </div>
                    <div className="text-[13px] text-gray-600 space-y-1">
                      <div>{o.address}</div>
                      <div>{o.phone}</div>
                      <div className="text-secondary">{o.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial contacts */}
            <div>
              <h2 className="text-[18px] font-bold text-gray-900 mb-5">{c.contacts_title}</h2>
              <div className="space-y-3">
                {c.contacts.map((ct, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-[14px] text-gray-700">{ct.role}</span>
                    <span className="text-[13px] text-secondary font-medium">{ct.email}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
