// NAVO Homepage
const HeroSideCard = ({ a, navigate }) => {
  const [h, setH] = React.useState(false);
  return (
    <div onClick={() => navigate('article', a)}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ flex: 1, position: 'relative', cursor: 'pointer', minHeight: 150 }}
    >
      <ImgPlaceholder h="100%" label={a.title} seed={a.slug} category={a.category} style={{ position: 'absolute', inset: 0, height: '100%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px' }}>
        <CategoryPill cat={a.category} small />
        <div style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600,
          color: '#fff', lineHeight: 1.35, marginTop: 6,
          textDecoration: h ? 'underline' : 'none',
          textDecorationColor: 'rgba(255,255,255,0.5)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{a.title}</div>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{a.date}</div>
      </div>
    </div>
  );
};

const HomePage = ({ navigate }) => {
  const articles = NAVO_DATA.articles;
  const hero = articles[0];
  const heroSide = articles.slice(1, 4);
  const feedArticles = articles.slice(4);
  const mostRead = NAVO_DATA.mostRead.map(id => articles.find(a => a.id === id));
  const latest = NAVO_DATA.latest.map(id => articles.find(a => a.id === id));

  const [heroHovered, setHeroHovered] = React.useState(false);
  const [loadedCount, setLoadedCount] = React.useState(6);

  const catBlocks = [
    { name: 'Politics', articles: articles.filter(a => a.category === 'Politics' || a.id <= 3) },
    { name: 'Economy', articles: articles.filter(a => a.category === 'Economy') },
    { name: 'Technology', articles: articles.filter(a => a.category === 'Technology') },
  ];

  return (
    <div style={{ background: C.bg }}>
      {/* Top Ad Banner */}
      <div style={{ background: C.bgSoft, borderBottom: `1px solid ${C.neutral}`, display: 'flex', justifyContent: 'center', padding: '12px 24px' }}>
        <AdBlock w={728} h={90} label="728×90 leaderboard" />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>

        {/* HERO SECTION */}
        <section style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 2, marginBottom: 48, borderRadius: 8, overflow: 'hidden' }}>
          {/* Hero main */}
          <div
            onClick={() => navigate('article', hero)}
            onMouseEnter={() => setHeroHovered(true)}
            onMouseLeave={() => setHeroHovered(false)}
            style={{ position: 'relative', cursor: 'pointer', minHeight: 480 }}
          >
            <ImgPlaceholder h={480} label={hero.title} seed={hero.slug} category="hero" style={{ width: '100%' }} />
            {/* Overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
            }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 32px' }}>
              <CategoryPill cat={hero.category} />
              <h1 style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: 32, fontWeight: 700,
                color: '#fff', lineHeight: 1.25, margin: '10px 0 12px',
                letterSpacing: '-0.5px',
                textDecoration: heroHovered ? 'underline' : 'none',
                textDecorationColor: 'rgba(255,255,255,0.5)',
                transition: 'text-decoration 0.15s',
              }}>{hero.title}</h1>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, margin: '0 0 14px', maxWidth: 560 }}>{hero.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {(() => { const a = window.getFullAuthor(hero.author.name); return a?.photoId
                  ? <img src={`https://images.unsplash.com/${a.photoId}?auto=format&fit=crop&w=60&h=60&q=80`} alt={hero.author.name} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid rgba(255,255,255,0.7)' }} />
                  : <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{hero.author.name[0]}</span></div>;
                })()}
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{hero.author.name}</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>·</span>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{hero.date}</span>
              </div>
            </div>
          </div>

          {/* Hero sidebar cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {heroSide.map((a) => (
              <HeroSideCard key={a.slug || a.id} a={a} navigate={navigate} />
            ))}
          </div>
        </section>

        {/* Main content + Sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40 }}>
          <div>
            {/* News Feed — exactly 9 items, 1 ad after item 6 */}
            <SectionHeading title="Latest News" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 48 }}>
              {articles.slice(0, 6).map(a => (
                <NewsCard key={a.slug || a.id} article={a} navigate={navigate} />
              ))}
              {/* Full-width ad after row 2 */}
              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
                <AdBlock w={728} h={90} label="latest-news-infeed" />
              </div>
              {articles.slice(6, 9).map(a => (
                <NewsCard key={a.slug || a.id} article={a} navigate={navigate} />
              ))}
            </div>

            {/* Category Blocks */}
            {catBlocks.map(block => (
              <section key={block.name} style={{ marginBottom: 48 }}>
                <SectionHeading title={block.name} action="View all" onAction={() => navigate('category', block.name)} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  {(block.articles.length >= 3 ? block.articles.slice(0, 3) : articles.slice(0, 3)).map(a => (
                    <NewsCard key={a.slug || a.id} article={a} navigate={navigate} size="sm" />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside style={{ position: 'sticky', top: 112, alignSelf: 'start' }}>
            <AdBlock w="100%" h={250} label="300×250 display" />

            <div style={{ marginTop: 32 }}>
              <SectionHeading title="Most Read" />
              {mostRead.filter(Boolean).map((a, i) => (
                <div key={a.slug || a.id} onClick={() => navigate('article', a)} style={{ display: 'flex', gap: 12, marginBottom: 16, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.querySelector('.mr-title').style.color = C.secondary}
                  onMouseLeave={e => e.currentTarget.querySelector('.mr-title').style.color = C.textPrimary}
                >
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 28, fontWeight: 800, color: '#e8eaf0', lineHeight: 1, flexShrink: 0, width: 28, textAlign: 'center' }}>{i + 1}</span>
                  <div>
                    <div className="mr-title" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600, color: C.textPrimary, lineHeight: 1.4, transition: 'color 0.15s' }}>{a.title}</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary, marginTop: 4 }}>{a.readTime}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <SectionHeading title="Latest" />
              {latest.filter(Boolean).map(a => (
                <NewsCard key={a.slug || a.id} article={a} navigate={navigate} horizontal />
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <AdBlock w="100%" h={600} label="300×600 display" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

window.HomePage = HomePage;
