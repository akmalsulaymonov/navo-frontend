'use client'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import LegalPage, { LegalSection } from '@/components/ui/LegalPage'

const CONTENT = {
  en: {
    tag: 'Legal', title: 'Cookie Policy',
    updated: 'Last updated: 1 March 2026',
    pref_title: 'Your Cookie Preferences',
    pref_desc: 'You can control which cookies we set below. Strictly necessary cookies cannot be disabled.',
    save_btn: 'Save preferences',
    saved: 'Preferences saved',
    cats: [
      { key: 'necessary', label: 'Strictly Necessary', locked: true, desc: 'Essential for the website to function. Cannot be disabled.' },
      { key: 'functional', label: 'Functional', locked: false, desc: 'Remember your language preference, reading history, and font size settings.' },
      { key: 'analytics', label: 'Analytics', locked: false, desc: 'Help us understand how readers use our site using anonymised data.' },
      { key: 'marketing', label: 'Marketing', locked: false, desc: 'Used for subscriber acquisition campaigns. No cross-site tracking.' },
    ],
    sections: [
      { title: 'What Are Cookies?', body: 'Cookies are small text files placed on your device when you visit a website. They allow the website to recognise your device on future visits and store information about your preferences and browsing behaviour. Cookies are widely used to make websites work more efficiently and to provide information to site owners.' },
      { title: 'Strictly Necessary Cookies', body: 'These cookies are essential for the website to function correctly. They include cookies that enable you to log in to secure areas, maintain your session, and remember items in your reading list. These cookies cannot be switched off in our systems. You can configure your browser to block these cookies, but this will prevent certain parts of the site from working.' },
      { title: 'Functional Cookies', body: 'These cookies allow the website to provide enhanced functionality and personalisation. They remember your language preference, your chosen text size, and whether you have dismissed certain notifications. If you disable these cookies, some or all of these services may not function properly.' },
      { title: 'Analytics Cookies', body: 'We use analytics cookies (via a self-hosted instance of Matomo) to understand how visitors interact with our Site — which articles are most read, how long readers spend on each page, and where they arrive from. The data is aggregated and anonymous. We do not use Google Analytics or any other third-party analytics service that shares data with advertisers.' },
      { title: 'Marketing Cookies', body: 'In limited circumstances, we use cookies to support subscriber acquisition campaigns — for example, to avoid showing the same subscription prompt repeatedly to users who have already seen it. We do not use cookies to build advertising profiles or to track you across other websites.' },
      { title: 'Third-Party Cookies', body: 'Some embedded content on our Site (video players, social media share buttons) may set their own cookies. We label all embedded third-party content clearly. You can block third-party cookies in your browser settings without affecting our first-party cookies.' },
      { title: 'How to Manage Cookies', body: 'You can manage your cookie preferences at any time using the preference panel above. You can also control cookies through your browser settings: most browsers allow you to block all cookies, block third-party cookies only, or delete cookies when you close your browser. Please note that blocking certain cookies may affect the functionality of our Site.' },
    ],
  },
  ru: {
    tag: 'Правовая информация', title: 'Политика cookies',
    updated: 'Последнее обновление: 1 марта 2026 г.',
    pref_title: 'Ваши настройки cookies',
    pref_desc: 'Вы можете управлять тем, какие файлы cookie мы устанавливаем. Строго необходимые файлы cookie не могут быть отключены.',
    save_btn: 'Сохранить настройки',
    saved: 'Настройки сохранены',
    cats: [
      { key: 'necessary', label: 'Строго необходимые', locked: true, desc: 'Необходимы для работы сайта. Не могут быть отключены.' },
      { key: 'functional', label: 'Функциональные', locked: false, desc: 'Запоминают ваш языковой предпочтение, историю чтения и настройки размера шрифта.' },
      { key: 'analytics', label: 'Аналитические', locked: false, desc: 'Помогают нам понять, как читатели используют наш сайт, с использованием анонимных данных.' },
      { key: 'marketing', label: 'Маркетинговые', locked: false, desc: 'Используются для кампаний по привлечению подписчиков. Межсайтовое отслеживание отсутствует.' },
    ],
    sections: [
      { title: 'Что такое cookies?', body: 'Файлы cookie — это небольшие текстовые файлы, размещаемые на вашем устройстве при посещении веб-сайта. Они позволяют сайту распознавать ваше устройство при будущих посещениях и хранить информацию о ваших предпочтениях и поведении при просмотре.' },
      { title: 'Строго необходимые cookies', body: 'Эти файлы cookie необходимы для корректной работы сайта. Они включают файлы cookie, позволяющие входить в защищённые разделы, поддерживать сеанс и запоминать элементы в вашем списке чтения. Эти файлы cookie не могут быть отключены в наших системах.' },
      { title: 'Функциональные cookies', body: 'Эти файлы cookie позволяют сайту обеспечивать расширенную функциональность и персонализацию. Они запоминают ваше языковое предпочтение, выбранный размер текста и факт закрытия вами определённых уведомлений.' },
      { title: 'Аналитические cookies', body: 'Мы используем аналитические файлы cookie (через самостоятельно размещённый экземпляр Matomo) для понимания того, как посетители взаимодействуют с нашим Сайтом. Данные агрегируются и являются анонимными. Мы не используем Google Analytics.' },
      { title: 'Маркетинговые cookies', body: 'В ограниченных случаях мы используем файлы cookie для поддержки кампаний по привлечению подписчиков. Мы не используем файлы cookie для создания рекламных профилей или отслеживания вас на других сайтах.' },
      { title: 'Сторонние cookies', body: 'Некоторые встроенные материалы на нашем Сайте (видеоплееры, кнопки репоста в социальных сетях) могут устанавливать собственные файлы cookie. Вы можете заблокировать сторонние файлы cookie в настройках браузера.' },
      { title: 'Как управлять cookies', body: 'Вы можете управлять своими настройками файлов cookie в любое время с помощью панели предпочтений выше. Вы также можете управлять файлами cookie через настройки браузера.' },
    ],
  },
  tj: {
    tag: 'Иттилооти ҳуқуқӣ', title: 'Сиёсати cookies',
    updated: 'Охирин навсозӣ: 1 марти 2026',
    pref_title: 'Афзалиятҳои cookies-и шумо',
    pref_desc: 'Шумо метавонед идора кунед, ки кадом кукиҳоро танзим мекунем. Кукиҳои зарурии қатъӣ хомӯш карда намешаванд.',
    save_btn: 'Афзалиятҳоро захира кунед',
    saved: 'Афзалиятҳо захира шуданд',
    cats: [
      { key: 'necessary', label: 'Зарурии қатъӣ', locked: true, desc: 'Барои кори сайт зарур аст. Хомӯш карда намешавад.' },
      { key: 'functional', label: 'Функсионалӣ', locked: false, desc: 'Афзалияти забон, таърихи хондан ва танзимоти андозаи матнро дар хотир нигоҳ медоранд.' },
      { key: 'analytics', label: 'Таҳлилӣ', locked: false, desc: 'Ба мо кӯмак мекунанд дарк кунем, ки хонандагон чӣ гуна аз сайти мо истифода мебаранд.' },
      { key: 'marketing', label: 'Маркетингӣ', locked: false, desc: 'Барои маъракаҳои ҷалби обунашудагон истифода мешаванд. Ягон пайгирии байнисайтӣ вуҷуд надорад.' },
    ],
    sections: [
      { title: 'Кукиҳо чист?', body: 'Кукиҳо файлҳои матнии хурде мебошанд, ки ҳангоми боздиди сайт дар дастгоҳи шумо гузошта мешаванд. Онҳо ба сайт имкон медиҳанд, ки дастгоҳи шуморо дар боздидҳои оянда муайян кунад ва иттилоотро дар бораи афзалиятҳои шумо нигоҳ дорад.' },
      { title: 'Кукиҳои зарурии қатъӣ', body: 'Ин кукиҳо барои кори дурусти сайт зарур мебошанд. Онҳо дар системаҳои мо хомӯш карда намешаванд.' },
      { title: 'Кукиҳои функсионалӣ', body: 'Ин кукиҳо ба сайт имкон медиҳанд, ки функсионалии беҳтар ва шахсисозиро таъмин кунад. Онҳо афзалияти забони шумо, андозаи матни интихобшуда ва ғайраро дар хотир нигоҳ медоранд.' },
      { title: 'Кукиҳои таҳлилӣ', body: 'Мо кукиҳои таҳлилиро барои дарки он ки боздидкунандагон чӣ гуна бо Сайти мо муошират мекунанд, истифода мебарем. Маълумот ҷамъбаст ва номаълум аст. Мо Google Analytics-ро истифода намебарем.' },
      { title: 'Кукиҳои маркетингӣ', body: 'Дар ҳолатҳои маҳдуд, мо аз кукиҳо барои дастгирии маъракаҳои ҷалби обунашудагон истифода мебарем. Мо аз кукиҳо барои сохтани профилҳои рекламавӣ истифода намекунем.' },
      { title: 'Кукиҳои ашхоси сеюм', body: 'Баъзе мӯҳтавои дармонтаждашуда дар Сайти мо метавонад кукиҳои худро танзим кунад. Шумо метавонед кукиҳои ашхоси сеюмро дар танзимоти браузер манъ кунед.' },
      { title: 'Чӣ гуна кукиҳоро идора кардан мумкин аст', body: 'Шумо метавонед дар ҳар вақт афзалиятҳои кукии худро бо истифода аз панели болоӣ идора кунед. Инчунин, шумо метавонед кукиҳоро тавассути танзимоти браузер идора кунед.' },
    ],
  },
}

export default function CookiesPage() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] || CONTENT.en
  const [prefs, setPrefs] = useState({ necessary: true, functional: true, analytics: false, marketing: false })
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <LegalPage tag={c.tag} title={c.title} updated={c.updated}>
      {/* Cookie preference panel */}
      <div className="bg-soft border border-gray-200 rounded-xl p-6 mb-2">
        <h2 className="text-[17px] font-bold text-gray-900 mb-1">{c.pref_title}</h2>
        <p className="text-[14px] text-gray-500 mb-5">{c.pref_desc}</p>
        <div className="space-y-3">
          {c.cats.map(cat => (
            <div key={cat.key} className="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-100">
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-gray-900 mb-0.5">{cat.label}</div>
                <div className="text-[13px] text-gray-500">{cat.desc}</div>
              </div>
              <div className="shrink-0">
                {cat.locked
                  ? <div className="w-11 h-6 bg-primary rounded-full flex items-center px-1 justify-end opacity-50 cursor-not-allowed"><div className="w-4 h-4 bg-white rounded-full" /></div>
                  : <button onClick={() => setPrefs(p => ({ ...p, [cat.key]: !p[cat.key] }))}
                      className={`w-11 h-6 rounded-full flex items-center px-1 transition-all cursor-pointer border-none ${prefs[cat.key] ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}>
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </button>
                }
              </div>
            </div>
          ))}
        </div>
        <button onClick={save}
          className="mt-5 bg-primary text-white text-[14px] font-semibold border-none rounded-lg px-6 py-2.5 cursor-pointer hover:bg-primary/90 transition-colors">
          {saved ? c.saved : c.save_btn}
        </button>
      </div>

      {c.sections.map((s, i) => (
        <LegalSection key={i} title={s.title}><p>{s.body}</p></LegalSection>
      ))}
    </LegalPage>
  )
}
