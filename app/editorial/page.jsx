'use client'
import { useLanguage } from '@/lib/i18n'
import { useRouter } from 'next/navigation'

const CONTENT = {
  en: {
    tag: 'Editorial Policy',
    title: 'How We Report, Verify, and Publish',
    desc: 'Our editorial standards are not guidelines — they are non-negotiable commitments to every reader who trusts us with their attention.',
    sections: [
      {
        icon: '🎯',
        title: 'Accuracy & Verification',
        body: 'Every factual claim published by NAVO must be verifiable from at least one primary source — an official document, a named eyewitness, an on-record statement, or original data. Where we rely on a single source, we say so. Where there is meaningful dispute about a fact, we present the competing versions and assess the evidence. We do not publish claims that cannot be verified, even if they are widely believed.',
        items: ['Primary source verification required for all factual claims', 'Competing factual claims are assessed, not ignored', 'Numeric claims verified against original datasets', 'Pre-publication review by at least one senior editor'],
      },
      {
        icon: '🔒',
        title: 'Editorial Independence',
        body: "NAVO's editorial judgements are made without reference to commercial, political, or institutional interests. Our ownership structure is designed to prevent interference: no single shareholder holds more than 12% of voting rights, and editorial decisions are legally insulated from board influence. We accept no sponsored content, advertorial, or paid placement of any kind.",
        items: ['No advertiser influence on editorial decisions', 'Firewall between commercial and editorial teams', 'Ownership structure prevents controlling interest', 'Annual independence audit published publicly'],
      },
      {
        icon: '👤',
        title: 'Source Policy',
        body: "We name our sources wherever possible. Anonymous sourcing is used only when: the information is of significant public interest; the source faces genuine risk if identified; and the information cannot be obtained on the record. When we grant anonymity, we describe the source's general role and explain why anonymity was granted. We do not use anonymous sources to carry attacks on third parties.",
        items: ['Named sources always preferred', 'Anonymous sources require editorial sign-off', 'Source\'s general identity always described', 'No anonymous attacks on third parties'],
      },
      {
        icon: '✏️',
        title: 'Corrections Policy',
        body: 'When we make factual errors, we correct them promptly, prominently, and transparently. Corrections are published on the article itself, identified clearly as corrections, and logged in our public corrections register. We do not silently edit published articles. When a correction changes the substance of a story, we notify readers of the original error and what was wrong.',
        items: ['Corrections published on original article', 'No silent edits to published pieces', 'Public corrections register maintained', 'Readers notified of substantive corrections'],
      },
      {
        icon: '🤖',
        title: 'AI & Technology Policy',
        body: 'NAVO uses AI tools as editorial aids — for transcription, translation assistance, and data analysis — but all published content is written, edited, and verified by human journalists. We do not use AI to generate news content. Where AI tools assist in data analysis or document review for investigative work, this is disclosed in the methodology note.',
        items: ['No AI-generated news content', 'AI tools disclosed when used in investigations', 'All published text written by human journalists', 'AI transcription reviewed and corrected by editors'],
      },
      {
        icon: '⚠️',
        title: 'Conflicts of Interest',
        body: "All NAVO journalists disclose potential conflicts of interest to their editors. Staff members do not cover organisations in which they or their immediate family hold financial interests. Political donations and affiliations are disclosed. Where we cover companies or individuals with which NAVO has a business relationship, this is disclosed in the article.",
        items: ['Annual conflict disclosure by all editorial staff', 'No coverage of entities with financial conflicts', 'Political affiliations disclosed publicly', 'Business relationships disclosed in relevant articles'],
      },
    ],
    complaints_title: 'Complaints & Feedback',
    complaints_body: 'If you believe we have made an error, misrepresented a fact, or acted contrary to our editorial standards, we want to hear from you. Our editorial standards team reviews all substantive complaints within five business days.',
    complaints_btn: 'Submit a Complaint',
  },
  ru: {
    tag: 'Редакционная политика',
    title: 'Как мы ведём репортажи, проверяем и публикуем',
    desc: 'Наши редакционные стандарты — это не рекомендации, а неотъемлемые обязательства перед каждым читателем, доверяющим нам своё внимание.',
    sections: [
      {
        icon: '🎯',
        title: 'Точность и проверка',
        body: 'Каждое фактическое утверждение, опубликованное NAVO, должно быть верифицировано хотя бы по одному первичному источнику — официальному документу, поимённому очевидцу, заявлению для протокола или оригинальным данным. Там, где мы опираемся на единственный источник, мы об этом говорим. Там, где вокруг факта ведётся содержательный спор, мы представляем конкурирующие версии и оцениваем доказательства.',
        items: ['Проверка по первичным источникам обязательна для всех фактических утверждений', 'Конкурирующие фактические заявления оцениваются, а не игнорируются', 'Числовые данные проверяются по оригинальным массивам', 'Предпубликационная проверка как минимум одним старшим редактором'],
      },
      {
        icon: '🔒',
        title: 'Редакционная независимость',
        body: 'Редакционные решения NAVO принимаются без учёта коммерческих, политических или институциональных интересов. Структура собственности разработана для предотвращения вмешательства: ни один акционер не владеет более чем 12% прав голоса, а редакционные решения юридически защищены от влияния совета директоров.',
        items: ['Рекламодатели не влияют на редакционные решения', 'Брандмауэр между коммерческим и редакционным подразделениями', 'Структура собственности исключает контрольный пакет', 'Ежегодный аудит независимости публикуется'],
      },
      {
        icon: '👤',
        title: 'Политика источников',
        body: 'Мы называем наши источники везде, где это возможно. Анонимные источники используются только тогда, когда информация представляет значительный общественный интерес; источник подвергается реальному риску при идентификации; и информацию невозможно получить официально.',
        items: ['Поимённые источники всегда предпочтительны', 'Анонимные источники требуют санкции редактора', 'Общая роль источника всегда описывается', 'Анонимные атаки на третьих лиц запрещены'],
      },
      {
        icon: '✏️',
        title: 'Политика исправлений',
        body: 'Когда мы допускаем фактические ошибки, мы исправляем их оперативно, заметно и прозрачно. Исправления публикуются непосредственно в статье, чётко обозначаются как исправления и регистрируются в нашем публичном реестре исправлений. Мы не редактируем опубликованные статьи незаметно.',
        items: ['Исправления публикуются в исходной статье', 'Скрытое редактирование опубликованных материалов запрещено', 'Ведётся публичный реестр исправлений', 'Читатели уведомляются о существенных исправлениях'],
      },
      {
        icon: '🤖',
        title: 'Политика ИИ и технологий',
        body: 'NAVO использует инструменты ИИ в качестве редакционных помощников — для транскрипции, помощи в переводе и анализа данных — но весь публикуемый контент пишется, редактируется и проверяется журналистами-людьми. Мы не используем ИИ для создания новостного контента.',
        items: ['Отсутствие контента, сгенерированного ИИ', 'Использование инструментов ИИ в расследованиях раскрывается', 'Весь публикуемый текст написан журналистами-людьми', 'Транскрипция ИИ проверяется и корректируется редакторами'],
      },
      {
        icon: '⚠️',
        title: 'Конфликты интересов',
        body: 'Все журналисты NAVO раскрывают потенциальные конфликты интересов перед своими редакторами. Сотрудники не освещают организации, в которых они или их ближайшие родственники имеют финансовые интересы. Политические пожертвования и аффилиации раскрываются.',
        items: ['Ежегодное раскрытие конфликтов всеми редакционными сотрудниками', 'Запрет на освещение структур с финансовыми конфликтами', 'Политические аффилиации раскрываются публично', 'Деловые отношения раскрываются в соответствующих статьях'],
      },
    ],
    complaints_title: 'Жалобы и обратная связь',
    complaints_body: 'Если вы считаете, что мы допустили ошибку, исказили факт или действовали вопреки нашим редакционным стандартам, мы хотим услышать вас. Наша команда по редакционным стандартам рассматривает все содержательные жалобы в течение пяти рабочих дней.',
    complaints_btn: 'Подать жалобу',
  },
  tj: {
    tag: 'Сиёсати таҳририя',
    title: 'Чӣ гуна гузориш медиҳем, тасдиқ ва нашр мекунем',
    desc: 'Меъёрҳои таҳририяи мо дастурамал нестанд — инҳо ӯҳдадориҳои ғайриқобили гуфтушуниде мебошанд пеши ҳар хонандае, ки ба мо эътимод мекунад.',
    sections: [
      {
        icon: '🎯',
        title: 'Дақиқӣ ва тасдиқ',
        body: 'Ҳар як иддаои воқеии нашршудаи NAVO бояд ҳадди ақалл аз як манбаи аввалия тасдиқшаванда бошад. Дар ҷое ки мо ба як манбаи ягона такя мекунем, ин масъаларо зикр мекунем.',
        items: ['Тасдиқи манбаи аввалия барои ҳамаи иддаоҳои воқеӣ лозим аст', 'Иддаоҳои рақобатии воқеӣ баҳо дода мешаванд', 'Иддаоҳои рақамӣ бо маҷмӯаи маълумоти аслӣ тасдиқ мешаванд', 'Баррасии пеш аз нашр аз ҷониби муҳаррири арша'],
      },
      {
        icon: '🔒',
        title: 'Истиқлолияти таҳририя',
        body: 'Қарорҳои таҳририяи NAVO бидуни назардошти манфиатҳои тиҷоратӣ, сиёсӣ ё ниҳодӣ қабул мешаванд. Сохтори моликият барои пешгирии дахолат тарроҳӣ шудааст.',
        items: ['Таъсири реклама бар қарорҳои таҳририя вуҷуд надорад', 'Девори байни бахши тиҷоратӣ ва таҳририя мавҷуд аст', 'Сохтори моликият пешгирии манфиати назорат мекунад', 'Аудити солонаи истиқлолият ба таври ошкор нашр мешавад'],
      },
      {
        icon: '👤',
        title: 'Сиёсати манбаъ',
        body: 'Мо манбаъҳои худро дар ҳар куҷое, ки имкон дошта бошад, мешиносонем. Манбаъҳои номаълум танҳо дар ҳолате истифода мешаванд, ки иттилоот аз аҳамияти ҷомеавии назаррас бошад.',
        items: ['Манбаъҳои бонном ҳамеша бартарӣ доранд', 'Манбаъҳои номаълум мувофиқати муҳаррирро талаб мекунанд', 'Нақши умумии манбаъ ҳамеша тавсиф мешавад', 'Ҳуҷумҳои номаълум ба ашхоси сеюм иҷозат дода намешаванд'],
      },
      {
        icon: '✏️',
        title: 'Сиёсати ислоҳот',
        body: 'Ҳангоми хато, онҳоро фавран, ошкоро ва шаффофона ислоҳ мекунем. Ислоҳот мустақиман дар мақола нашр мешаванд ва дар реестри ислоҳоти ошкории мо сабт мегарданд.',
        items: ['Ислоҳот дар мақолаи асл нашр мешаванд', 'Таҳрири пинҳонии мақолаҳои нашршуда иҷозат дода намешавад', 'Реестри ислоҳоти ошкорӣ нигоҳ дошта мешавад', 'Хонандагон аз ислоҳоти асосӣ огоҳ карда мешаванд'],
      },
      {
        icon: '🤖',
        title: 'Сиёсати ИЗ ва технология',
        body: 'NAVO асбобҳои ИЗ-ро ҳамчун кӯмакчиёни таҳририя истифода мебарад, аммо ҳамаи мӯҳтавои нашршуда аз ҷониби журналистони инсонӣ навишта, таҳрир ва тасдиқ мешавад.',
        items: ['Мӯҳтавои тавлидшуда аз ҷониби ИЗ вуҷуд надорад', 'Истифодаи асбобҳои ИЗ дар таҳқиқот ошкор мешавад', 'Ҳамаи матни нашршуда аз ҷониби журналистони инсонӣ навишта шудааст', 'Транскрипсияи ИЗ аз ҷониби муҳаррирон баррасӣ мешавад'],
      },
      {
        icon: '⚠️',
        title: 'Манофеи зиддиятнок',
        body: 'Ҳамаи журналистони NAVO манофеи эҳтимолии зиддиятнокро ба муҳаррирони худ ошкор мекунанд. Кормандон созмонҳоеро, ки дар онҳо манфиати молиявӣ доранд, пӯшиш намедиҳанд.',
        items: ['Ошкорсозии солонаи зиддиятнокӣ аз ҷониби ҳамаи кормандон', 'Пӯшиши ниҳодҳо бо зиддиятнокии молиявӣ манъ аст', 'Иштироки сиёсӣ ба таври ошкорӣ изҳор мешавад', 'Муносибатҳои тиҷоратӣ дар мақолаҳои марбута ошкор мешаванд'],
      },
    ],
    complaints_title: 'Шикоятҳо ва бозхӯрд',
    complaints_body: 'Агар фикр кунед, ки мо хато кардем ё бар хилофи меъёрҳои таҳририяи мо амал кардем, мехоҳем аз шумо бишнавем. Дар давоми панҷ рӯзи корӣ посух мегирем.',
    complaints_btn: 'Шикоят пешниҳод кунед',
  },
}

export default function EditorialPage() {
  const { lang } = useLanguage()
  const router = useRouter()
  const c = CONTENT[lang] || CONTENT.en

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative bg-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80" alt="Editorial" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="relative max-w-content mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase bg-white/15 border border-white/25 rounded px-3 py-1 mb-5">{c.tag}</div>
          <h1 className="text-[30px] md:text-[46px] font-extrabold leading-tight mb-4 max-w-[640px] tracking-tight">{c.title}</h1>
          <p className="text-[16px] md:text-[18px] text-white/65 max-w-[520px] leading-relaxed">{c.desc}</p>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="space-y-14">
          {c.sections.map((s, i) => (
            <div key={i} className="border-b border-gray-100 pb-14 last:border-b-0">
              <div className="flex gap-5 items-start mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-[22px] shrink-0">{s.icon}</div>
                <h2 className="text-[22px] md:text-[26px] font-bold text-gray-900 leading-tight pt-1">{s.title}</h2>
              </div>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">{s.body}</p>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[14px] text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Complaints CTA */}
        <div className="mt-14 bg-soft rounded-xl p-8 md:p-10 border border-gray-200">
          <h2 className="text-[22px] font-bold text-gray-900 mb-3">{c.complaints_title}</h2>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-5">{c.complaints_body}</p>
          <button onClick={() => router.push('/contacts')} className="bg-primary text-white font-semibold text-[14px] border-none rounded-lg px-6 py-2.5 cursor-pointer hover:bg-primary/90 transition-colors">
            {c.complaints_btn}
          </button>
        </div>
      </div>
    </div>
  )
}
