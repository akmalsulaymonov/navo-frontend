'use client'
import { useLanguage } from '@/lib/i18n'
import LegalPage, { LegalSection } from '@/components/ui/LegalPage'

const CONTENT = {
  en: {
    tag: 'Legal', title: 'Privacy Policy',
    updated: 'Last updated: 1 March 2026',
    sections: [
      { title: '1. Who We Are', body: 'NAVO Information Agency S.A. ("NAVO", "we", "us") is registered in Belgium (BE 0123.456.789) with its registered office at Rue de la Loi 200, 1049 Brussels. We are the data controller for the personal data processed in connection with your use of our website and services at navo.news.' },
      { title: '2. What Data We Collect', body: 'We collect data you provide directly (name, email address, subscription preferences, comments); data collected automatically when you visit our site (IP address, browser type, pages visited, time on site, referring URL); and data from third-party sources (social login providers, analytics partners). We do not sell your data. We do not use your data for profiling or automated decision-making that produces legal or similarly significant effects.' },
      { title: '3. Why We Process Your Data', body: 'We process your data to: deliver the news content and services you request; manage your subscription and account; send newsletters you have subscribed to; improve our website and editorial offering; comply with legal obligations; and detect and prevent fraud or abuse of our services. Our legal bases are your consent (for marketing communications and analytics cookies), contract (to deliver subscriptions you have purchased), legal obligation, and legitimate interests (for security and editorial improvement).' },
      { title: '4. Cookies', body: 'We use strictly necessary cookies (which cannot be turned off), functional cookies (to remember your language and preferences), analytics cookies (to understand how readers use our site, with your consent), and in limited cases marketing cookies (for subscriber acquisition campaigns, with your consent). You can manage your cookie preferences at any time via the Cookie Settings link in the footer.' },
      { title: '5. How Long We Keep Your Data', body: 'Subscription and account data: for the duration of your subscription plus 3 years. Newsletter addresses: until you unsubscribe. Comments: indefinitely (they form part of the published record). Server logs: 90 days. Analytics data: 26 months in aggregated form.' },
      { title: '6. Who We Share Data With', body: 'We share data with: service providers who process data on our behalf (email delivery, payment processing, cloud hosting) under strict data processing agreements; regulatory bodies when legally required; and in the event of a merger or acquisition, prospective buyers under appropriate confidentiality arrangements. We do not share your personal data with advertisers.' },
      { title: '7. Your Rights', body: 'Under GDPR you have the right to: access the personal data we hold about you; correct inaccurate data; request erasure (in certain circumstances); restrict or object to processing; data portability; and withdraw consent at any time. To exercise these rights, contact our Data Protection Officer at dpo@navo.news. You also have the right to lodge a complaint with your national data protection authority.' },
      { title: '8. International Transfers', body: 'Where we transfer personal data outside the European Economic Area, we ensure appropriate safeguards are in place — including Standard Contractual Clauses approved by the European Commission. A list of our sub-processors and the transfer mechanisms used is available on request.' },
      { title: '9. Contact', body: 'Data Protection Officer: Marta Kowalski. Email: dpo@navo.news. Post: NAVO Information Agency, Data Protection Officer, Rue de la Loi 200, 1049 Brussels, Belgium.' },
    ],
  },
  ru: {
    tag: 'Правовая информация', title: 'Политика конфиденциальности',
    updated: 'Последнее обновление: 1 марта 2026 г.',
    sections: [
      { title: '1. Кто мы', body: 'NAVO Information Agency S.A. («NAVO», «мы», «нас») зарегистрирована в Бельгии (BE 0123.456.789) с юридическим адресом по адресу Rue de la Loi 200, 1049 Bruxelles. Мы являемся оператором персональных данных, обрабатываемых в связи с использованием вами нашего сайта и сервисов на navo.news.' },
      { title: '2. Какие данные мы собираем', body: 'Мы собираем данные, которые вы предоставляете напрямую (имя, адрес электронной почты, параметры подписки, комментарии); данные, собираемые автоматически при посещении нашего сайта (IP-адрес, тип браузера, посещённые страницы, время на сайте, реферальный URL); и данные из сторонних источников (провайдеры социального входа, аналитические партнёры). Мы не продаём ваши данные.' },
      { title: '3. Для чего мы обрабатываем ваши данные', body: 'Мы обрабатываем ваши данные для: предоставления запрошенного вами новостного контента и сервисов; управления вашей подпиской и аккаунтом; рассылки подписанных вами новостных писем; улучшения нашего сайта и редакционного предложения; соблюдения юридических обязательств; а также выявления и предотвращения мошенничества.' },
      { title: '4. Файлы cookie', body: 'Мы используем строго необходимые файлы cookie (которые нельзя отключить), функциональные файлы cookie (для запоминания вашего языка и предпочтений), аналитические файлы cookie (с вашего согласия) и в ограниченных случаях маркетинговые файлы cookie (с вашего согласия). Вы можете управлять настройками файлов cookie в любое время через ссылку «Настройки cookies» в нижнем колонтитуле.' },
      { title: '5. Как долго мы храним ваши данные', body: 'Данные подписки и аккаунта: в течение срока подписки плюс 3 года. Адреса рассылок: до отписки. Комментарии: бессрочно (они являются частью опубликованных материалов). Журналы сервера: 90 дней. Аналитические данные: 26 месяцев в агрегированном виде.' },
      { title: '6. С кем мы делимся данными', body: 'Мы делимся данными с: провайдерами услуг, обрабатывающими данные от нашего имени (доставка email, обработка платежей, облачный хостинг) на основании строгих соглашений об обработке данных; регуляторными органами при наличии законодательного требования; и потенциальными покупателями в случае слияния или поглощения. Мы не передаём ваши личные данные рекламодателям.' },
      { title: '7. Ваши права', body: 'В соответствии с GDPR вы имеете право: получить доступ к хранящимся у нас персональным данным; исправить неточные данные; запросить удаление (при определённых обстоятельствах); ограничить обработку или возразить против неё; портативность данных; и отозвать согласие в любое время. Для реализации этих прав обратитесь к нашему инспектору по защите данных: dpo@navo.news.' },
      { title: '8. Международные передачи', body: 'При передаче персональных данных за пределы ЕЭП мы обеспечиваем наличие соответствующих гарантий, включая Стандартные договорные положения, одобренные Европейской комиссией.' },
      { title: '9. Контакт', body: 'Инспектор по защите данных: Марта Ковальски. Email: dpo@navo.news. Адрес: NAVO Information Agency, Data Protection Officer, Rue de la Loi 200, 1049 Brussels, Belgium.' },
    ],
  },
  tj: {
    tag: 'Иттилооти ҳуқуқӣ', title: 'Сиёсати махфият',
    updated: 'Охирин навсозӣ: 1 марти 2026',
    sections: [
      { title: '1. Кӣ ҳастем', body: 'NAVO Information Agency S.A. («NAVO», «мо») дар Белгия (BE 0123.456.789) бо суроғаи қонунӣ Rue de la Loi 200, 1049 Brussels ба қайд гирифта шудааст. Мо оператори маълумоти шахсии коршударо дар робита бо истифодаи шумо аз сайт ва хадамоти мо дар navo.news мебошем.' },
      { title: '2. Чӣ маълумот ҷамъ мекунем', body: 'Мо маълумотеро ҷамъ мекунем, ки шумо мустақиман пешниҳод мекунед (ном, суроғаи почтаи электронӣ, афзалиятҳои обуна, шарҳҳо); маълумотеро, ки ба таври автоматӣ ҳангоми боздиди сайти мо ҷамъ оварда мешавад; ва маълумот аз манбаъҳои берунӣ. Мо маълумоти шуморо намефурӯшем.' },
      { title: '3. Чаро маълумоти шуморо коркард мекунем', body: 'Мо маълумоти шуморо коркард мекунем барои: расонидани мӯҳтавои хабарӣ ва хадамоте, ки шумо дархост мекунед; идоракунии обуна ва аккаунти шумо; фиристодани хабарномаҳо; беҳтар кардани сайт; риояи ӯҳдадориҳои қонунӣ; ва ошкор кардан ва пешгирии табаҳкорӣ.' },
      { title: '4. Кукиҳо', body: 'Мо кукиҳои зарурии қатъӣ (ки хомӯш карда намешаванд), кукиҳои функсионалӣ (барои дар хотир нигоҳ доштани забон ва афзалиятҳо), кукиҳои таҳлилӣ (бо розигии шумо) ва дар ҳолатҳои маҳдуд кукиҳои маркетингӣ (бо розигии шумо) истифода мебарем.' },
      { title: '5. Чӣ қадар маълумоти шуморо нигоҳ медорем', body: 'Маълумоти обуна ва аккаунт: давоми обуна плюс 3 сол. Суроғаҳои хабарнома: то лағви обуна. Шарҳҳо: барои ҳамеша. Журналҳои сервер: 90 рӯз. Маълумоти таҳлилӣ: 26 моҳ.' },
      { title: '6. Бо кӣ маълумот мубодила мекунем', body: 'Мо маълумотро бо: провайдерони хадамот (расонидани email, коркарди пардохт, мезбонии абрӣ) тибқи созишномаҳои строги коркарди маълумот мубодила мекунем. Мо маълумоти шахсии шуморо ба таблиғгарон намедиҳем.' },
      { title: '7. Ҳуқуқҳои шумо', body: 'Тибқи GDPR шумо ҳақ доред: ба маълумоти шахсии нигоҳдоштаи мо дастрасӣ пайдо кунед; маълумоти нодурустро ислоҳ кунед; дархости нест кардан кунед; коркардро маҳдуд кунед ё эътироз кунед; ва розигиро дар ҳар вақт бозгиред. Барои истифодаи ин ҳуқуқҳо ба dpo@navo.news муроҷиат кунед.' },
      { title: '8. Интиқолоти байналмилалӣ', body: 'Ҳангоми интиқоли маълумоти шахсӣ берун аз ЗИА, мо таъмин мекунем, ки кафолатҳои мувофиқ, аз ҷумла Банди стандартии шартномавие, ки Комиссияи Аврупо тасдиқ кардааст, мавҷуд бошанд.' },
      { title: '9. Тамос', body: 'Масъули ҳифзи маълумот: Марта Ковальски. Почтаи электронӣ: dpo@navo.news. Суроға: NAVO Information Agency, Rue de la Loi 200, 1049 Brussels, Belgium.' },
    ],
  },
}

export default function PrivacyPage() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] || CONTENT.en
  return (
    <LegalPage tag={c.tag} title={c.title} updated={c.updated}>
      {c.sections.map((s, i) => (
        <LegalSection key={i} title={s.title}><p>{s.body}</p></LegalSection>
      ))}
    </LegalPage>
  )
}
