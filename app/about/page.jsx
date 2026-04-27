'use client'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'

const CONTENT = {
  en: {
    tag: 'About NAVO',
    hero_title: 'Independent Journalism at the Heart of Global Events',
    hero_desc: 'NAVO is an international news organisation committed to rigorous, independent journalism that serves the public interest — without fear or favour.',
    mission_title: 'Our Mission',
    mission_body: 'In an era of information abundance and trust deficit, NAVO exists to provide the kind of journalism that matters: deeply reported, carefully verified, and written for readers who want to understand the world, not just skim it. We cover the stories that shape global events — from geopolitics and economics to culture and technology — with the rigour that complex subjects demand and the clarity that readers deserve.',
    values_title: 'What We Stand For',
    values: [
      { icon: '⚖️', title: 'Independence', desc: 'We accept no advertising that compromises our editorial judgement. Our journalism is funded by readers and institutional supporters who share our commitment to independent reporting.' },
      { icon: '✓', title: 'Accuracy', desc: 'Every factual claim in our reporting is verified against primary sources. We correct errors promptly and transparently, with full explanations of what went wrong and why.' },
      { icon: '🔍', title: 'Transparency', desc: 'We name our sources wherever possible. When we cannot, we explain why. We disclose conflicts of interest and are fully accountable for everything we publish.' },
      { icon: '🤝', title: 'Fairness', desc: 'We give subjects of our reporting the opportunity to respond before publication. We distinguish clearly between news and opinion, between fact and interpretation.' },
    ],
    history_title: 'Our History',
    history_body: 'NAVO was founded in 2012 by a group of experienced international correspondents who believed that the contraction of traditional newsrooms was creating dangerous blind spots in global coverage. Starting with a team of eight journalists in Brussels, we have grown into a newsroom of more than 140 people across 12 cities on four continents. In that time we have published more than 38,000 articles, broken dozens of major investigative stories, and built a global readership that trusts us for accuracy and depth.',
    timeline: [
      { year: '2012', event: 'NAVO founded in Brussels with 8 journalists' },
      { year: '2015', event: 'Opened London and Washington bureaux' },
      { year: '2018', event: 'Launched investigative desk; first major offshore investigation' },
      { year: '2020', event: 'Expanded to Singapore and Nairobi' },
      { year: '2023', event: 'Won European Press Prize for investigative journalism' },
      { year: '2026', event: '18 million monthly readers across 140+ countries' },
    ],
    stats: [
      { value: '12+', label: 'Years of reporting' },
      { value: '140+', label: 'Journalists & staff' },
      { value: '38,000+', label: 'Articles published' },
      { value: '18M', label: 'Monthly readers' },
    ],
    offices_title: 'Our Offices',
    offices: [
      { city: 'Brussels', role: 'Headquarters & EU Affairs' },
      { city: 'London', role: 'UK & Finance Desk' },
      { city: 'Washington D.C.', role: 'Americas Bureau' },
      { city: 'Berlin', role: 'Central Europe Desk' },
      { city: 'Singapore', role: 'Asia-Pacific Bureau' },
      { city: 'Nairobi', role: 'Africa Correspondent Hub' },
    ],
    awards_title: 'Awards & Recognition',
    awards: [
      { year: '2023', award: 'European Press Prize — Investigative Journalism' },
      { year: '2022', award: 'Foreign Press Association — Digital Innovation Award' },
      { year: '2021', award: 'FT Journalist of the Year — Priya Sharma' },
      { year: '2020', award: 'Data Journalism Awards — Global Category Winner' },
    ],
    join_title: 'Work With Us',
    join_body: 'We are always looking for talented journalists, researchers, and technologists. If you share our commitment to independent, rigorous journalism, we want to hear from you.',
    join_btn: 'View Open Positions',
  },
  ru: {
    tag: 'О NAVO',
    hero_title: 'Независимая журналистика в центре мировых событий',
    hero_desc: 'NAVO — международное новостное издание, приверженное строгой независимой журналистике в общественных интересах — без страха и лицеприятия.',
    mission_title: 'Наша миссия',
    mission_body: 'В эпоху информационного изобилия и дефицита доверия NAVO существует, чтобы предоставлять журналистику, которая имеет значение: глубоко исследованную, тщательно проверенную и написанную для читателей, которые хотят понять мир, а не просто просматривать его. Мы освещаем события, формирующие глобальную повестку — от геополитики и экономики до культуры и технологий — с той строгостью, которой требуют сложные темы, и с той ясностью, которой заслуживают читатели.',
    values_title: 'Наши принципы',
    values: [
      { icon: '⚖️', title: 'Независимость', desc: 'Мы не принимаем рекламу, которая могла бы поставить под угрозу нашу редакционную независимость. Наша журналистика финансируется читателями и институциональными партнёрами, разделяющими наши ценности.' },
      { icon: '✓', title: 'Точность', desc: 'Каждое фактическое утверждение в наших материалах проверяется по первичным источникам. Ошибки исправляются оперативно и прозрачно, с полным объяснением произошедшего.' },
      { icon: '🔍', title: 'Прозрачность', desc: 'Мы называем наши источники везде, где это возможно. Когда это невозможно — объясняем почему. Мы раскрываем конфликты интересов и несём полную ответственность за публикуемое.' },
      { icon: '🤝', title: 'Справедливость', desc: 'Мы даём героям наших публикаций возможность ответить до выхода материала. Мы чётко разграничиваем новости и мнения, факты и интерпретации.' },
    ],
    history_title: 'Наша история',
    history_body: 'NAVO было основано в 2012 году группой опытных международных корреспондентов, убеждённых, что сокращение традиционных редакций создаёт опасные пробелы в глобальном освещении событий. Начав с команды из восьми журналистов в Брюсселе, мы выросли в редакцию с более чем 140 сотрудниками в 12 городах на четырёх континентах. За это время мы опубликовали более 38 000 материалов, провели десятки крупных расследований и создали глобальную читательскую аудиторию, которая доверяет нам за точность и глубину.',
    timeline: [
      { year: '2012', event: 'Основание NAVO в Брюсселе: 8 журналистов' },
      { year: '2015', event: 'Открыты бюро в Лондоне и Вашингтоне' },
      { year: '2018', event: 'Запуск отдела расследований; первое крупное офшорное расследование' },
      { year: '2020', event: 'Расширение в Сингапур и Найроби' },
      { year: '2023', event: 'Победа в European Press Prize за расследовательскую журналистику' },
      { year: '2026', event: '18 млн читателей в месяц в более чем 140 странах' },
    ],
    stats: [
      { value: '12+', label: 'Лет репортажной работы' },
      { value: '140+', label: 'Журналистов и сотрудников' },
      { value: '38 000+', label: 'Опубликованных материалов' },
      { value: '18 млн', label: 'Читателей в месяц' },
    ],
    offices_title: 'Наши офисы',
    offices: [
      { city: 'Брюссель', role: 'Штаб-квартира & Дела ЕС' },
      { city: 'Лондон', role: 'Отдел Великобритании & Финансов' },
      { city: 'Вашингтон', role: 'Американское бюро' },
      { city: 'Берлин', role: 'Отдел Центральной Европы' },
      { city: 'Сингапур', role: 'Бюро Азиатско-Тихоокеанского региона' },
      { city: 'Найроби', role: 'Африканский корреспондентский узел' },
    ],
    awards_title: 'Награды и признание',
    awards: [
      { year: '2023', award: 'European Press Prize — Расследовательская журналистика' },
      { year: '2022', award: 'Foreign Press Association — Цифровые инновации' },
      { year: '2021', award: 'Журналист года FT — Прия Шарма' },
      { year: '2020', award: 'Data Journalism Awards — Глобальная категория' },
    ],
    join_title: 'Работайте с нами',
    join_body: 'Мы всегда ищем талантливых журналистов, исследователей и технологов. Если вы разделяете нашу приверженность независимой строгой журналистике, мы хотим услышать вас.',
    join_btn: 'Открытые вакансии',
  },
  tj: {
    tag: 'Дар бораи NAVO',
    hero_title: 'Журналистикаи мустақил дар маркази рӯйдодҳои ҷаҳонӣ',
    hero_desc: 'NAVO як созмони хабарии байналмилалӣ аст, ки ба журналистикаи қатъӣ ва мустақил дар манфиатҳои ҷомеа — бе тарс ва хаста — содиқ аст.',
    mission_title: 'Рисолати мо',
    mission_body: 'Дар замони фаровонии иттилоот ва норасоии эътимод, NAVO барои пешкаш кардани журналистикаи арзанда мавҷуд аст: амиқ таҳқиқшуда, бодиққат тасдиқшуда ва барои хонандагоне навишташуда, ки мехоҳанд ҷаҳонро дарк кунанд. Мо рӯйдодҳоеро пӯшиш медиҳем, ки барномарезии ҷаҳониро шакл медиҳанд.',
    values_title: 'Принсипҳои мо',
    values: [
      { icon: '⚖️', title: 'Истиқлолият', desc: 'Мо ягон рекламаеро қабул намекунем, ки ҳукми таҳририяи моро ба хавф мегузорад. Журналистикаи мо аз ҷониби хонандагон маблағгузорӣ мешавад.' },
      { icon: '✓', title: 'Дақиқӣ', desc: 'Ҳар як иддаои воқеӣ дар гузоришоти мо аз рӯи манбаъҳои аввалия тасдиқ мешавад. Хатоҳо фавран ва шаффофона ислоҳ мегарданд.' },
      { icon: '🔍', title: 'Шаффофият', desc: 'Мо манбаъҳои хешро дар ҳар куҷое, ки имкон дошта бошад, мешиносонем. Ҳангоме ки наметавонем ин корро бикунем, сабабашро шарҳ медиҳем.' },
      { icon: '🤝', title: 'Адолат', desc: 'Мо ба субъектҳои гузоришоти мо имконият медиҳем, ки пеш аз нашр ҷавоб диҳанд. Мо байни хабар ва назар фарқ мегузорем.' },
    ],
    history_title: 'Таърихи мо',
    history_body: 'NAVO соли 2012 аз ҷониби гурӯҳе аз мухбирони баидалмиллал таъсис дода шуд. Аз ҳашт журналист дар Брюссел оғоз карда, мо ба таҳририяе бо зиёда аз 140 нафар дар 12 шаҳр дар чор қитъа табдил ёфтем. Дар ин муддат мо зиёда аз 38 000 мақола нашр кардем ва аудиторияи ҷаҳонии хонандагон ба мо эътимод доранд.',
    timeline: [
      { year: '2012', event: 'NAVO дар Брюссел бо 8 журналист таъсис ёфт' },
      { year: '2015', event: 'Дафтарҳои Лондон ва Вашингтон кушода шуданд' },
      { year: '2018', event: 'Бахши таҳқиқот оғоз ёфт; аввалин таҳқиқоти офшорӣ' },
      { year: '2020', event: 'Тавсеъа ба Сингапур ва Найробӣ' },
      { year: '2023', event: 'Ғолиби European Press Prize дар журналистикаи таҳқиқотӣ' },
      { year: '2026', event: '18 миллион хонандаи моҳона дар зиёда аз 140 кишвар' },
    ],
    stats: [
      { value: '12+', label: 'Соли кори хабарнигорӣ' },
      { value: '140+', label: 'Журналист ва кормандон' },
      { value: '38 000+', label: 'Мақолаҳои нашршуда' },
      { value: '18M', label: 'Хонандагони моҳона' },
    ],
    offices_title: 'Дафтарҳои мо',
    offices: [
      { city: 'Брюссел', role: 'Қароргоҳ & Корҳои ИА' },
      { city: 'Лондон', role: 'Бюрои Британия & Молия' },
      { city: 'Вашингтон', role: 'Бюрои Амрико' },
      { city: 'Берлин', role: 'Бюрои Аврупои Марказӣ' },
      { city: 'Сингапур', role: 'Бюрои Осиё-Уқёнус' },
      { city: 'Найробӣ', role: 'Маркази мухбирони Африқо' },
    ],
    awards_title: 'Ҷоизаҳо ва эътироф',
    awards: [
      { year: '2023', award: 'European Press Prize — Журналистикаи таҳқиқотӣ' },
      { year: '2022', award: 'Foreign Press Association — Навоварии рақамӣ' },
      { year: '2021', award: 'Журналисти соли FT — Прия Шарма' },
      { year: '2020', award: 'Data Journalism Awards — Категорияи ҷаҳонӣ' },
    ],
    join_title: 'Бо мо кор кунед',
    join_body: 'Мо ҳамеша журналистон, муҳаққиқон ва технологҳои боистеъдодро меҷӯем. Агар ба журналистикаи мустақил ва қатъӣ содиқ бошед, мехоҳем аз шумо бишнавем.',
    join_btn: 'Вазифаҳои кушода',
  },
}

export default function AboutPage() {
  const { lang } = useLanguage()
  const router = useRouter()
  const c = CONTENT[lang] || CONTENT.en

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1486C8 100%)', minHeight: 420 }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80" alt="Newsroom" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-content mx-auto px-4 md:px-6 py-20 md:py-28 text-white">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase bg-white/15 border border-white/25 rounded px-3 py-1 mb-5">{c.tag}</div>
          <h1 className="text-[34px] md:text-[52px] font-extrabold leading-tight mb-5 max-w-[700px] tracking-tight">{c.hero_title}</h1>
          <p className="text-[17px] md:text-[19px] text-white/75 max-w-[560px] leading-relaxed">{c.hero_desc}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-primary text-white">
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {c.stats.map((s, i) => (
              <div key={i} className="py-6 md:py-8 px-4 text-center border-r border-white/15 last:border-r-0">
                <div className="text-[28px] md:text-[36px] font-extrabold">{s.value}</div>
                <div className="text-[12px] text-white/60 mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 md:px-6 py-14 md:py-20">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="text-[11px] font-bold tracking-[2px] uppercase text-primary mb-3">{c.mission_title}</div>
            <p className="text-[17px] md:text-[19px] text-gray-700 leading-relaxed">{c.mission_body}</p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80" alt="Journalism" className="w-full h-[300px] md:h-[380px] object-cover" />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 mb-10 text-center">{c.values_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {c.values.map((v, i) => (
              <div key={i} className="bg-soft rounded-xl p-7 border border-gray-200">
                <div className="text-[28px] mb-4">{v.icon}</div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 mb-5">{c.history_title}</h2>
            <p className="text-[16px] text-gray-600 leading-relaxed mb-8">{c.history_body}</p>
          </div>
          <div className="space-y-0">
            {c.timeline.map((item, i) => (
              <div key={i} className="flex gap-5 pb-6 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white text-[12px] font-bold flex items-center justify-center shrink-0">{item.year.slice(2)}</div>
                  {i < c.timeline.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-2" />}
                </div>
                <div className="pt-2">
                  <div className="text-[13px] font-bold text-primary mb-0.5">{item.year}</div>
                  <div className="text-[15px] text-gray-700">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offices */}
        <div className="mb-20">
          <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 mb-8 text-center">{c.offices_title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {c.offices.map((o, i) => (
              <div key={i} className="bg-soft rounded-lg p-5 border border-gray-200 text-center">
                <div className="text-[32px] mb-2">📍</div>
                <div className="text-[16px] font-bold text-gray-900">{o.city}</div>
                <div className="text-[13px] text-gray-500 mt-1">{o.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-20">
          <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 mb-8">{c.awards_title}</h2>
          <div className="space-y-3">
            {c.awards.map((a, i) => (
              <div key={i} className="flex gap-5 items-center py-4 border-b border-gray-100">
                <span className="text-[13px] font-bold text-primary bg-primary/10 rounded px-2.5 py-1 shrink-0">{a.year}</span>
                <span className="text-[15px] text-gray-800">{a.award}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="bg-primary rounded-2xl p-10 md:p-14 text-white text-center">
          <h2 className="text-[26px] md:text-[34px] font-extrabold mb-4">{c.join_title}</h2>
          <p className="text-[16px] text-white/75 max-w-[480px] mx-auto mb-7 leading-relaxed">{c.join_body}</p>
          <button onClick={() => router.push('/contacts')} className="bg-white text-primary font-bold text-[15px] border-none rounded-lg px-8 py-3.5 cursor-pointer hover:bg-white/90 transition-all">
            {c.join_btn}
          </button>
        </div>
      </div>
    </div>
  )
}
