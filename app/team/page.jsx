'use client'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'
import { NAVO_DATA } from '@/lib/data'

const CONTENT = {
  en: {
    tag: 'The Team',
    title: 'The People Behind NAVO',
    desc: 'Our newsroom is built on the expertise of correspondents, editors, and analysts who have spent careers earning trust in the most complex stories of our time.',
    meet: 'Meet the Team',
    articles: 'Articles',
    years: 'Years at NAVO',
    read_more: 'View Profile',
    dept_title: 'By the Numbers',
    depts: [
      { icon: '✍️', label: 'Journalists', value: '62' },
      { icon: '🔍', label: 'Investigators', value: '14' },
      { icon: '📊', label: 'Data Analysts', value: '11' },
      { icon: '📸', label: 'Photojournalists', value: '18' },
      { icon: '🎙️', label: 'Video Reporters', value: '9' },
      { icon: '🌐', label: 'Countries covered', value: '140+' },
    ],
    values_title: 'How We Work',
    values: [
      { title: 'Collaborative', desc: 'Our international investigations involve teams across multiple bureaux working together for months at a time.' },
      { title: 'Rigorous', desc: 'Every published claim goes through at least two levels of editorial review before publication.' },
      { title: 'Accountable', desc: 'We hold ourselves to the same standards of transparency we expect from those we cover.' },
    ],
  },
  ru: {
    tag: 'Команда',
    title: 'Люди, стоящие за NAVO',
    desc: 'Наша редакция строится на опыте корреспондентов, редакторов и аналитиков, которые посвятили карьеры тому, чтобы освещать самые сложные истории нашего времени.',
    meet: 'Познакомьтесь с командой',
    articles: 'Материалов',
    years: 'Лет в NAVO',
    read_more: 'Смотреть профиль',
    dept_title: 'В цифрах',
    depts: [
      { icon: '✍️', label: 'Журналистов', value: '62' },
      { icon: '🔍', label: 'Расследователей', value: '14' },
      { icon: '📊', label: 'Дата-аналитиков', value: '11' },
      { icon: '📸', label: 'Фотожурналистов', value: '18' },
      { icon: '🎙️', label: 'Видеорепортёров', value: '9' },
      { icon: '🌐', label: 'Охваченных стран', value: '140+' },
    ],
    values_title: 'Как мы работаем',
    values: [
      { title: 'Командная работа', desc: 'Наши международные расследования включают команды из нескольких бюро, работающие вместе на протяжении нескольких месяцев.' },
      { title: 'Строгость', desc: 'Каждое опубликованное утверждение проходит как минимум два уровня редакционной проверки перед публикацией.' },
      { title: 'Ответственность', desc: 'Мы придерживаемся тех же стандартов прозрачности, которых ожидаем от тех, кого освещаем.' },
    ],
  },
  tj: {
    tag: 'Гурӯҳи мо',
    title: 'Одамони паси NAVO',
    desc: 'Таҳририяи мо аз мутахассисони мухбирон, муҳаррирон ва таҳлилгарон иборат аст, ки тамоми касбу кори худро ба пӯшиши мураккабтарин ҳикояҳои замон бахшидаанд.',
    meet: 'Бо гурӯҳ шинос шавед',
    articles: 'Мақола',
    years: 'Соли дар NAVO',
    read_more: 'Профилро бинед',
    dept_title: 'Дар рақамҳо',
    depts: [
      { icon: '✍️', label: 'Журналистон', value: '62' },
      { icon: '🔍', label: 'Муҳаққиқон', value: '14' },
      { icon: '📊', label: 'Таҳлилгарони маълумот', value: '11' },
      { icon: '📸', label: 'Фотожурналистон', value: '18' },
      { icon: '🎙️', label: 'Хабарнигорони видео', value: '9' },
      { icon: '🌐', label: 'Кишварҳои пӯшишшуда', value: '140+' },
    ],
    values_title: 'Чӣ тавр кор мекунем',
    values: [
      { title: 'Ҳамкорӣ', desc: 'Таҳқиқоти байналмилалии мо гурӯҳҳоро аз бюроҳои гуногун барои моҳҳо якҷоя кор кардан дар бар мегирад.' },
      { title: 'Қатъиятнокӣ', desc: 'Ҳар як иддаои нашршуда пеш аз нашр ҳадди ақалл ду сатҳи баррасии таҳририяро мегузарад.' },
      { title: 'Масъулият', desc: 'Мо ба ҳамон меъёрҳои шаффофияте пайравӣ мекунем, ки аз онҳое, ки пӯшиш медиҳем, интизор дорем.' },
    ],
  },
}

export default function TeamPage() {
  const { lang } = useLanguage()
  const router = useRouter()
  const c = CONTENT[lang] || CONTENT.en
  const authors = NAVO_DATA.authors

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-soft border-b border-gray-200 py-14 md:py-20">
        <div className="max-w-content mx-auto px-4 md:px-6 text-center">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase text-primary bg-primary/10 rounded px-3 py-1 mb-4">{c.tag}</div>
          <h1 className="text-[32px] md:text-[48px] font-extrabold text-gray-900 mb-4 tracking-tight">{c.title}</h1>
          <p className="text-[17px] text-gray-500 max-w-[600px] mx-auto leading-relaxed">{c.desc}</p>
        </div>
      </div>

      {/* Department stats */}
      <div className="border-b border-gray-100">
        <div className="max-w-content mx-auto px-4 md:px-6 py-10">
          <h2 className="text-[13px] font-bold tracking-[1.5px] uppercase text-gray-400 mb-6 text-center">{c.dept_title}</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {c.depts.map((d, i) => (
              <div key={i} className="text-center">
                <div className="text-[24px] mb-1">{d.icon}</div>
                <div className="text-[22px] font-extrabold text-primary">{d.value}</div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wide">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team grid */}
      <div className="max-w-content mx-auto px-4 md:px-6 py-14">
        <h2 className="text-[26px] md:text-[32px] font-extrabold text-gray-900 mb-10">{c.meet}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map(author => (
            <div key={author.slug}
              onClick={() => router.push(`/author/${author.slug}`)}
              className="group cursor-pointer bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <img
                  src={`https://images.unsplash.com/${author.photoId}?auto=format&fit=crop&w=500&h=350&q=80`}
                  alt={author.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  {author.categories?.map(cat => (
                    <span key={cat} className="inline-block text-[10px] font-bold text-white bg-white/20 border border-white/30 rounded px-2 py-0.5 mr-1">{cat}</span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-[18px] font-bold text-gray-900 group-hover:text-primary transition-colors">{author.name}</h3>
                <div className="text-[13px] text-secondary font-medium mb-3">{author.role}</div>
                <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3 mb-4">{author.bio}</p>
                <div className="flex gap-4 pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-[16px] font-bold text-gray-900">{author.articles}</div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wide">{c.articles}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[16px] font-bold text-gray-900">{author.yearsActive}</div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wide">{c.years}</div>
                  </div>
                  <div className="ml-auto flex items-end">
                    <span className="text-[13px] font-semibold text-primary group-hover:underline">{c.read_more} →</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mt-20 bg-soft rounded-2xl p-10 md:p-14">
          <h2 className="text-[26px] md:text-[32px] font-extrabold text-gray-900 mb-8 text-center">{c.values_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.values.map((v, i) => (
              <div key={i} className="text-center">
                <h3 className="text-[17px] font-bold text-primary mb-2">{v.title}</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
