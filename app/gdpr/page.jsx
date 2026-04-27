'use client'
import { useLanguage } from '@/lib/i18n'
import { useRouter } from 'next/navigation'
import LegalPage, { LegalSection } from '@/components/ui/LegalPage'

const CONTENT = {
  en: {
    tag: 'Legal', title: 'GDPR & Data Subject Rights',
    updated: 'Last updated: 1 March 2026',
    rights_title: 'Your Rights at a Glance',
    rights: [
      { icon: '📋', title: 'Right of Access', desc: 'Request a copy of all personal data we hold about you.' },
      { icon: '✏️', title: 'Right to Rectification', desc: 'Ask us to correct inaccurate or incomplete data.' },
      { icon: '🗑️', title: 'Right to Erasure', desc: 'Request deletion of your data in certain circumstances ("right to be forgotten").' },
      { icon: '⏸️', title: 'Right to Restriction', desc: 'Ask us to restrict processing of your data while a complaint is being resolved.' },
      { icon: '📤', title: 'Right to Portability', desc: 'Receive your data in a structured, machine-readable format.' },
      { icon: '✋', title: 'Right to Object', desc: 'Object to processing based on legitimate interests or for direct marketing.' },
    ],
    sections: [
      { title: 'Who This Policy Applies To', body: 'This page applies to individuals in the European Economic Area (EEA), United Kingdom, and Switzerland whose personal data is processed by NAVO Information Agency S.A. The General Data Protection Regulation (GDPR) grants you specific rights regarding your personal data, which we are committed to upholding.' },
      { title: 'Our Legal Bases for Processing', body: 'We process your personal data under the following legal bases: Consent — for newsletter subscriptions, analytics cookies, and marketing communications; Contract — for delivering paid subscriptions and account services; Legal obligation — for tax, financial, and anti-fraud compliance; Legitimate interests — for site security, editorial improvement, and fraud prevention, where these interests are not overridden by your fundamental rights.' },
      { title: 'Data Retention Periods', body: 'Active subscription accounts: retained for the subscription period plus 3 years for legal and tax purposes. Cancelled accounts: anonymised after 90 days. Newsletter addresses: retained until you unsubscribe, then deleted within 30 days. Comments: retained indefinitely as part of the published editorial record (unless you request deletion). Server logs: 90 days. Analytics data: 26 months in aggregated form, then deleted.' },
      { title: 'International Data Transfers', body: 'NAVO is headquartered in Belgium within the EEA. We use a small number of sub-processors in the United States and other countries. All cross-border transfers are covered by Standard Contractual Clauses (SCCs) approved by the European Commission, supplemented by Transfer Impact Assessments where required. A full list of sub-processors and applicable transfer mechanisms is available on request from dpo@navo.news.' },
      { title: 'Automated Decision-Making', body: 'NAVO does not use automated decision-making or profiling that produces legal or similarly significant effects on individuals. Our personalisation features (article recommendations) are based on aggregated, pseudonymous data and do not involve individual-level profiling.' },
      { title: 'How to Exercise Your Rights', body: 'To exercise any of your GDPR rights, please contact our Data Protection Officer at dpo@navo.news or by post at: NAVO Information Agency S.A., Data Protection Officer, Rue de la Loi 200, 1049 Brussels, Belgium. We will acknowledge your request within 72 hours and respond substantively within 30 days. In complex cases, we may extend this period by a further 60 days, but will notify you within the initial 30-day window.' },
      { title: 'Right to Lodge a Complaint', body: 'If you are not satisfied with our response, you have the right to lodge a complaint with your national data protection authority. In Belgium, this is the Data Protection Authority (GBA / APD) at gegevensbeschermingsautoriteit.be. In other EEA countries, the relevant national authority has competence. In the UK, the supervisory authority is the ICO (ico.org.uk).' },
    ],
    dpo_title: 'Data Protection Officer',
    dpo_name: 'Marta Kowalski',
    dpo_email: 'dpo@navo.news',
    dpo_desc: 'Our DPO is your primary point of contact for all data protection matters. All requests are treated as strictly confidential.',
    request_btn: 'Submit a Data Request',
  },
  ru: {
    tag: 'Правовая информация', title: 'GDPR и права субъектов данных',
    updated: 'Последнее обновление: 1 марта 2026 г.',
    rights_title: 'Ваши права вкратце',
    rights: [
      { icon: '📋', title: 'Право на доступ', desc: 'Запросить копию всех хранящихся у нас персональных данных о вас.' },
      { icon: '✏️', title: 'Право на исправление', desc: 'Попросить нас исправить неточные или неполные данные.' },
      { icon: '🗑️', title: 'Право на удаление', desc: 'Запросить удаление ваших данных при определённых обстоятельствах («право быть забытым»).' },
      { icon: '⏸️', title: 'Право на ограничение', desc: 'Попросить нас ограничить обработку ваших данных на время рассмотрения жалобы.' },
      { icon: '📤', title: 'Право на переносимость', desc: 'Получить ваши данные в структурированном, машиночитаемом формате.' },
      { icon: '✋', title: 'Право на возражение', desc: 'Возразить против обработки на основе законных интересов или для прямого маркетинга.' },
    ],
    sections: [
      { title: 'На кого распространяется эта политика', body: 'Эта страница распространяется на физических лиц в Европейской экономической зоне (ЕЭП), Великобритании и Швейцарии, чьи персональные данные обрабатываются NAVO Information Agency S.A. Общий регламент по защите данных (GDPR) предоставляет вам определённые права в отношении ваших персональных данных.' },
      { title: 'Наши правовые основания для обработки', body: 'Мы обрабатываем ваши персональные данные на следующих правовых основаниях: Согласие — для подписки на рассылки, аналитических файлов cookie и маркетинговых коммуникаций; Договор — для предоставления платных подписок и услуг аккаунта; Юридическое обязательство — для соблюдения налоговых, финансовых и антифрод-требований; Законные интересы — для обеспечения безопасности сайта и редакционного улучшения.' },
      { title: 'Сроки хранения данных', body: 'Активные аккаунты подписки: хранятся в течение срока подписки плюс 3 года. Отменённые аккаунты: анонимизируются через 90 дней. Адреса рассылок: хранятся до отписки, затем удаляются в течение 30 дней. Комментарии: хранятся бессрочно (если вы не запросите удаление). Журналы сервера: 90 дней.' },
      { title: 'Международные передачи данных', body: 'NAVO имеет штаб-квартиру в Бельгии в пределах ЕЭП. Мы используем небольшое число субобработчиков в США и других странах. Все трансграничные передачи данных осуществляются в соответствии со Стандартными договорными положениями, утверждёнными Европейской комиссией.' },
      { title: 'Автоматизированное принятие решений', body: 'NAVO не использует автоматизированное принятие решений или профилирование, которое оказывает юридически значимые или аналогичные последствия для физических лиц.' },
      { title: 'Как реализовать свои права', body: 'Для реализации любого из ваших прав по GDPR, пожалуйста, свяжитесь с нашим инспектором по защите данных по адресу dpo@navo.news. Мы подтвердим получение вашего запроса в течение 72 часов и дадим содержательный ответ в течение 30 дней.' },
      { title: 'Право на подачу жалобы', body: 'Если вы не удовлетворены нашим ответом, вы имеете право подать жалобу в свой национальный орган по защите данных. В Бельгии это Орган по защите данных (GBA / APD) на gegevensbeschermingsautoriteit.be.' },
    ],
    dpo_title: 'Инспектор по защите данных',
    dpo_name: 'Марта Ковальски',
    dpo_email: 'dpo@navo.news',
    dpo_desc: 'Наш инспектор по защите данных — ваш основной контакт по всем вопросам защиты данных. Все запросы рассматриваются строго конфиденциально.',
    request_btn: 'Подать запрос о данных',
  },
  tj: {
    tag: 'Иттилооти ҳуқуқӣ', title: 'GDPR ва ҳуқуқҳои субъектҳои маълумот',
    updated: 'Охирин навсозӣ: 1 марти 2026',
    rights_title: 'Ҳуқуқҳои шумо ба таври хулоса',
    rights: [
      { icon: '📋', title: 'Ҳуқуқи дастрасӣ', desc: 'Нусхаи ҳамаи маълумоти шахсии нигоҳдоштаи моро дархост кунед.' },
      { icon: '✏️', title: 'Ҳуқуқи ислоҳ', desc: 'Аз мо бихоҳед, ки маълумоти нодурустро ислоҳ кунем.' },
      { icon: '🗑️', title: 'Ҳуқуқи нест кардан', desc: 'Нест кардани маълумоти шуморо дар шароитҳои муайян дархост кунед.' },
      { icon: '⏸️', title: 'Ҳуқуқи маҳдудият', desc: 'Маҳдуд кардани коркарди маълумоти шуморо ҳангоми ҳалли шикоят дархост кунед.' },
      { icon: '📤', title: 'Ҳуқуқи интиқолпазирӣ', desc: 'Маълумоти худро дар шакли сохторӣ, мошинхонданда қабул кунед.' },
      { icon: '✋', title: 'Ҳуқуқи эътироз', desc: 'Ба коркарди асосёфта бар манфиатҳои қонунӣ ё маркетинги мустақим эътироз кунед.' },
    ],
    sections: [
      { title: 'Ин сиёсат ба кӣ татбиқ мешавад', body: 'Ин саҳифа ба шахсоне дар Минтақаи Иқтисодии Аврупо (МИА), Британияи Кабир ва Швейтсария татбиқ мешавад, ки маълумоти шахсии онҳо аз ҷониби NAVO Information Agency S.A. коркард мешавад.' },
      { title: 'Асосҳои ҳуқуқии мо барои коркард', body: 'Мо маълумоти шахсии шуморо бар асоси инҳо коркард мекунем: Розигӣ — барои обунаи хабарнома ва кукиҳои таҳлилӣ; Шартнома — барои расонидани обунаҳои пулакӣ; Ӯҳдадории ҳуқуқӣ; Манфиатҳои қонунӣ — барои амнияти сайт ва беҳтар кардани таҳририя.' },
      { title: 'Мӯҳлатҳои нигоҳдории маълумот', body: 'Аккаунтҳои фаъоли обуна: давоми обуна плюс 3 сол. Аккаунтҳои бекоршуда: пас аз 90 рӯз номаълумсозӣ мешаванд. Суроғаҳои хабарнома: то лағви обуна, сипас дар давоми 30 рӯз ҳазф мешаванд. Шарҳҳо: барои ҳамеша нигоҳ дошта мешаванд.' },
      { title: 'Интиқолоти байналмилалии маълумот', body: 'NAVO дар Белгия дар дохили МИА ҷойгир аст. Ҳамаи интиқолоти байнисарҳадӣ бо истифода аз Бандҳои стандартии шартномавии тасдиқкардаи Комиссияи Аврупо таъмин карда мешаванд.' },
      { title: 'Қарорсозии автоматӣ', body: 'NAVO аз қарорсозии автоматӣ ё профилсозие, ки ба афрод таъсири ҳуқуқан муҳим дорад, истифода намекунад.' },
      { title: 'Чӣ гуна ҳуқуқҳои худро истифода бурдан мумкин аст', body: 'Барои истифодаи ҳар гуна ҳуқуқҳои GDPR-и шумо, лутфан ба Масъули ҳифзи маълумоти мо ба dpo@navo.news муроҷиат кунед. Мо дархости шуморо дар давоми 72 соат тасдиқ мекунем ва дар давоми 30 рӯз ҷавоб медиҳем.' },
      { title: 'Ҳуқуқи шикоят', body: 'Агар аз посухи мо қаноатманд набошед, шумо ҳуқуқ доред, ки ба мақомоти миллии ҳифзи маълумоти худ шикоят кунед.' },
    ],
    dpo_title: 'Масъули ҳифзи маълумот',
    dpo_name: 'Марта Ковальски',
    dpo_email: 'dpo@navo.news',
    dpo_desc: 'Масъули ҳифзи маълумоти мо нуқтаи тамоси асосии шумо барои ҳамаи масъалаҳои ҳифзи маълумот аст.',
    request_btn: 'Дархости маълумот пешниҳод кунед',
  },
}

export default function GdprPage() {
  const { lang } = useLanguage()
  const router = useRouter()
  const c = CONTENT[lang] || CONTENT.en

  return (
    <LegalPage tag={c.tag} title={c.title} updated={c.updated}>
      {/* Rights cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-2">
        {c.rights.map((r, i) => (
          <div key={i} className="bg-soft border border-gray-200 rounded-xl p-5">
            <div className="text-[24px] mb-2">{r.icon}</div>
            <div className="text-[14px] font-bold text-gray-900 mb-1">{r.title}</div>
            <div className="text-[12px] text-gray-500 leading-relaxed">{r.desc}</div>
          </div>
        ))}
      </div>

      {c.sections.map((s, i) => (
        <LegalSection key={i} title={s.title}><p>{s.body}</p></LegalSection>
      ))}

      {/* DPO card */}
      <div className="bg-primary rounded-xl p-7 text-white mt-4">
        <h3 className="text-[17px] font-bold mb-1">{c.dpo_title}: {c.dpo_name}</h3>
        <p className="text-[14px] text-white/70 mb-4">{c.dpo_desc}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={`mailto:${c.dpo_email}`} className="text-[14px] font-semibold bg-white/15 border border-white/25 text-white rounded px-4 py-2 no-underline hover:bg-white/25 transition-all">{c.dpo_email}</a>
          <button onClick={() => router.push('/contacts')} className="text-[14px] font-semibold bg-white text-primary border-none rounded px-4 py-2 cursor-pointer hover:bg-white/90 transition-all">{c.request_btn}</button>
        </div>
      </div>
    </LegalPage>
  )
}
