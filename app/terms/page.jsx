'use client'
import { useLanguage } from '@/lib/i18n'
import LegalPage, { LegalSection } from '@/components/ui/LegalPage'

const CONTENT = {
  en: {
    tag: 'Legal', title: 'Terms of Use',
    updated: 'Last updated: 1 March 2026',
    sections: [
      { title: '1. Acceptance', body: 'By accessing or using navo.news (the "Site") and any services offered by NAVO Information Agency S.A. ("NAVO"), you agree to be bound by these Terms of Use. If you do not agree, please do not use our Site or services.' },
      { title: '2. Who Can Use Our Services', body: 'You must be at least 16 years old to use our Site. By using the Site, you confirm that you meet this age requirement. If you are under 18, you should review these Terms with a parent or guardian before using our services.' },
      { title: '3. Permitted Use', body: 'You may access and read content on the Site for personal, non-commercial use. You may share links to our articles. You may not reproduce, copy, republish, or redistribute our editorial content without written permission. You may not use automated tools to scrape or harvest content from the Site without a written licence from NAVO.' },
      { title: '4. Intellectual Property', body: 'All editorial content, photographs, videos, graphics, logos, and trademarks on the Site are owned by NAVO or its licensors and are protected by copyright, trademark, and other applicable laws. The NAVO name and logo are registered trademarks. Nothing in these Terms grants you any right to use our intellectual property other than as described in section 3.' },
      { title: '5. User Accounts & Subscriptions', body: 'If you create an account, you are responsible for maintaining the confidentiality of your credentials and for all activities under your account. NAVO subscriptions are personal and may not be shared. We reserve the right to suspend or terminate accounts that violate these Terms.' },
      { title: '6. User-Generated Content', body: 'If you post comments or other content on our Site, you grant NAVO a non-exclusive, royalty-free, worldwide licence to use, display, and reproduce that content. You retain ownership. You agree that your content will not be defamatory, harassing, infringing, or otherwise unlawful. We reserve the right to remove content that violates our community standards.' },
      { title: '7. Third-Party Links', body: 'Our Site may contain links to third-party websites. These links are provided for convenience only. NAVO does not endorse and is not responsible for the content, privacy practices, or accuracy of third-party sites.' },
      { title: '8. Disclaimer', body: 'The content on this Site is provided for informational purposes only and does not constitute legal, financial, medical, or professional advice. While we make every effort to ensure accuracy, NAVO makes no warranties about the completeness, reliability, or accuracy of information on the Site.' },
      { title: '9. Limitation of Liability', body: 'To the maximum extent permitted by applicable law, NAVO is not liable for any indirect, incidental, special, or consequential damages arising from your use of the Site. Our total liability shall not exceed the amount you paid for the service in the 12 months preceding the claim.' },
      { title: '10. Governing Law', body: 'These Terms are governed by Belgian law. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Brussels, Belgium, without prejudice to any mandatory consumer protection provisions of your country of residence.' },
      { title: '11. Changes', body: 'We may update these Terms from time to time. When we do, we will update the "last updated" date at the top and notify registered users by email. Continued use of the Site after changes constitutes acceptance of the revised Terms.' },
    ],
  },
  ru: {
    tag: 'Правовая информация', title: 'Условия использования',
    updated: 'Последнее обновление: 1 марта 2026 г.',
    sections: [
      { title: '1. Принятие условий', body: 'Используя сайт navo.news («Сайт») и любые услуги NAVO Information Agency S.A. («NAVO»), вы соглашаетесь с настоящими Условиями использования. Если вы не согласны, пожалуйста, не пользуйтесь нашим Сайтом или услугами.' },
      { title: '2. Кто может пользоваться нашими услугами', body: 'Для использования Сайта вам должно быть не менее 16 лет. Используя Сайт, вы подтверждаете, что соответствуете этому возрастному требованию. Если вам нет 18 лет, вы должны ознакомиться с настоящими Условиями с родителем или опекуном.' },
      { title: '3. Разрешённое использование', body: 'Вы можете получать доступ к контенту на Сайте и читать его в личных, некоммерческих целях. Вы можете делиться ссылками на наши статьи. Вы не можете воспроизводить, копировать, повторно публиковать или распространять наш редакционный контент без письменного разрешения. Вы не можете использовать автоматизированные инструменты для скрейпинга или сбора данных с Сайта без письменной лицензии NAVO.' },
      { title: '4. Интеллектуальная собственность', body: 'Весь редакционный контент, фотографии, видео, графика, логотипы и товарные знаки на Сайте принадлежат NAVO или его лицензиарам и защищены законодательством об авторском праве, товарных знаках и иными применимыми законами. Наименование и логотип NAVO являются зарегистрированными товарными знаками.' },
      { title: '5. Пользовательские аккаунты и подписки', body: 'Если вы создаёте аккаунт, вы несёте ответственность за сохранность своих учётных данных и за все действия в рамках вашего аккаунта. Подписки NAVO являются персональными и не могут быть переданы другим лицам. Мы оставляем за собой право приостанавливать или прекращать аккаунты, нарушающие настоящие Условия.' },
      { title: '6. Контент, создаваемый пользователями', body: 'Если вы публикуете комментарии или иной контент на нашем Сайте, вы предоставляете NAVO неисключительную, безвозмездную, всемирную лицензию на использование, показ и воспроизведение этого контента. Право собственности остаётся за вами. Вы соглашаетесь, что ваш контент не будет носить клеветнического, преследовательского, нарушающего права или иного незаконного характера.' },
      { title: '7. Ссылки на третьи лица', body: 'Наш Сайт может содержать ссылки на сайты третьих лиц. Эти ссылки предоставляются только для удобства. NAVO не одобряет и не несёт ответственности за контент, практику конфиденциальности или точность сторонних сайтов.' },
      { title: '8. Отказ от ответственности', body: 'Контент на данном Сайте предоставляется исключительно в информационных целях и не является юридической, финансовой, медицинской или профессиональной консультацией. NAVO не даёт гарантий относительно полноты, надёжности или точности информации на Сайте.' },
      { title: '9. Ограничение ответственности', body: 'В максимальной степени, допустимой применимым законодательством, NAVO не несёт ответственности за любой косвенный, случайный, специальный или последующий ущерб, возникший в результате использования Сайта.' },
      { title: '10. Применимое право', body: 'Настоящие Условия регулируются законодательством Бельгии. Все споры, вытекающие из настоящих Условий, подлежат исключительной юрисдикции судов Брюсселя, Бельгия.' },
      { title: '11. Изменения', body: 'Мы можем периодически обновлять настоящие Условия. Продолжение использования Сайта после внесения изменений означает принятие обновлённых Условий.' },
    ],
  },
  tj: {
    tag: 'Иттилооти ҳуқуқӣ', title: 'Шартҳои истифода',
    updated: 'Охирин навсозӣ: 1 марти 2026',
    sections: [
      { title: '1. Қабул', body: 'Бо истифода аз сайти navo.news («Сайт») ва ҳама гуна хадамоти NAVO Information Agency S.A. («NAVO»), шумо розӣ мешавед, ки ба Шартҳои истифодаи мазкур пайравӣ кунед. Агар розӣ набошед, лутфан аз Сайт ё хадамоти мо истифода накунед.' },
      { title: '2. Кӣ метавонад аз хадамоти мо истифода барад', body: 'Барои истифодаи Сайт бояд ҳадди ақалл 16-сола бошед. Бо истифода аз Сайт, шумо тасдиқ мекунед, ки ин талаботи синусолагиро иҷро мекунед.' },
      { title: '3. Истифодаи иҷозатдодашуда', body: 'Шумо метавонед ба мӯҳтавои Сайт дастрасӣ пайдо кунед ва онро барои мақсадҳои шахсӣ ва ғайритиҷоратӣ бихонед. Шумо метавонед пайвандҳоро ба мақолаҳои мо мубодила кунед. Шумо наметавонед мӯҳтавои таҳририяи моро бидуни иҷозати хаттӣ такроран нашр кунед.' },
      { title: '4. Моликияти зеҳнӣ', body: 'Ҳамаи мӯҳтавои таҳририя, аксҳо, видеоҳо, графика, логотипҳо ва аломатҳои тиҷоратии Сайт ба NAVO ё иҷозатдиҳандагони он тааллуқ доранд ва тибқи қонунҳои мувофиқ ҳимоя мешаванд.' },
      { title: '5. Аккаунтҳои корбарӣ ва обунаҳо', body: 'Агар аккаунт созед, шумо масъули нигоҳ доштани маҳрамонагии маълумоти воридшавии худ мебошед. Обунаҳои NAVO шахсӣ мебошанд ва наметавонанд бо дигарон мубодила карда шаванд.' },
      { title: '6. Мӯҳтавои тавлидшуда аз ҷониби корбар', body: 'Агар шарҳ ё мӯҳтавои дигаре дар Сайти мо нашр кунед, ба NAVO иҷозати ғайриинҳисорӣ ва ройгон медиҳед, ки онро истифода, намоиш ва такроран нашр кунад.' },
      { title: '7. Пайвандҳо ба ашхоси сеюм', body: 'Сайти мо метавонад пайвандҳоро ба сайтҳои ашхоси сеюм дошта бошад. NAVO барои мӯҳтаво, амалияи махфият ё дақиқии сайтҳои берунӣ масъул нест.' },
      { title: '8. Даъвои масъулиятнопазирӣ', body: 'Мӯҳтавои ин Сайт танҳо барои мақсадҳои иттилоотӣ пешниҳод карда мешавад ва маслиҳати ҳуқуқӣ, молиявӣ, тиббӣ ё касбиро ташкил намедиҳад.' },
      { title: '9. Маҳдудияти масъулият', body: 'Дар ҳадди аксар, ки қонуни татбиқшаванда иҷозат медиҳад, NAVO барои ягон зарари ғайримустақим, тасодуфӣ, махсус ё оқибатӣ, ки аз истифодаи Сайт бармеояд, масъул нест.' },
      { title: '10. Қонуни идоракунанда', body: 'Ин Шартҳо тибқи қонуни Белгия идора карда мешаванд. Ҳамаи баҳсҳои ба вуҷудомада ба юрисдиксияи дарбасти судҳои Брюссел, Белгия тобеъ мебошанд.' },
      { title: '11. Тағйирот', body: 'Мо метавонем ин Шартҳоро даврӣ навсозем. Идомаи истифода аз Сайт пас аз тағйирот қабули Шартҳои навшударо маънӣ дорад.' },
    ],
  },
}

export default function TermsPage() {
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
