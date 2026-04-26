// NAVO Category Page
const FeaturedCard = ({ a, navigate, category, activeTab, isMain }) => {
  const [h, setH] = React.useState(false);
  return (
    <div onClick={() => navigate('article', a)}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', minHeight: isMain ? 380 : 180 }}
    >
      <ImgPlaceholder h="100%" label={a.title} seed={a.slug} category={category} style={{ position: 'absolute', inset: 0, height: '100%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMain ? '28px 28px' : '20px 20px' }}>
        <CategoryPill cat={activeTab !== 'All' ? activeTab : a.category} small />
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: isMain ? 24 : 17, fontWeight: 700,
          color: '#fff', lineHeight: 1.3, margin: '8px 0 8px',
          textDecoration: h ? 'underline' : 'none', textDecorationColor: 'rgba(255,255,255,0.5)',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{a.title}</h2>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{a.author.name} · {a.date}</div>
      </div>
    </div>
  );
};

const CategoryPage = ({ category, navigate }) => {
  const [activeTab, setActiveTab] = React.useState('All');
  const [sort, setSort] = React.useState('latest');
  const [page, setPage] = React.useState(1);

  const subcats = { Politics: ['Parliament', 'Elections', 'Government', 'Parties', 'International'], Economy: ['Markets', 'Banking', 'Trade', 'Energy', 'Labour'], Technology: ['AI', 'Cybersecurity', 'Startups', 'Policy', 'Science'], World: ['Europe', 'Asia', 'Americas', 'Middle East', 'Africa'], Sport: ['Football', 'Athletics', 'Tennis', 'Olympics', 'Esports'], Culture: ['Film', 'Music', 'Literature', 'Art', 'Society'], Investigations: ['Finance', 'Power', 'Environment', 'Health', 'Justice'], Regions: ['Eastern Europe', 'Balkans', 'Caucasus', 'Central Asia', 'Nordic'] };
  const tabs = ['All', ...(subcats[category] || [])];

  const catArticles = NAVO_DATA.articles.filter(a => a.category === category);
  const allArticles = catArticles.length >= 3 ? catArticles : NAVO_DATA.articles.slice(0, 9);
  const featured = allArticles.slice(0, 2);
  const gridArticles = allArticles.slice(2);

  const catColors = { Politics: '#8B0000', Economy: '#006400', Technology: '#00008B', World: '#4B0082', Sport: '#8B4500', Culture: '#8B006B', Investigations: '#8B3500', Regions: '#005E8B' };
  const bannerColor = catColors[category] || C.primary;

  return (
    <div style={{ background: C.bg }}>
      {/* Banner */}
      <div style={{ background: bannerColor, color: '#fff', padding: '48px 0 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.6, marginBottom: 8 }}>Section</div>
              <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 48, fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>{category}</h1>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, opacity: 0.75, margin: '12px 0 0', maxWidth: 480, lineHeight: 1.6 }}>
                Comprehensive coverage of {category.toLowerCase()} from our team of expert correspondents worldwide.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 32, fontWeight: 800, opacity: 0.9 }}>{allArticles.length * 12}+</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, opacity: 0.6 }}>Articles published</div>
            </div>
          </div>

          {/* Subcategory tabs */}
          <div style={{ display: 'flex', gap: 4, marginTop: 32, flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: activeTab === t ? 700 : 500,
                background: activeTab === t ? 'rgba(255,255,255,0.18)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === t ? '2px solid #fff' : '2px solid transparent',
                color: '#fff', padding: '8px 16px', cursor: 'pointer',
                borderRadius: '4px 4px 0 0', transition: 'all 0.15s',
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        {/* Sort + count bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: C.textSecondary }}>
            Showing <strong style={{ color: C.textPrimary }}>{allArticles.length}</strong> articles{activeTab !== 'All' ? ` in ${activeTab}` : ''}
          </span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.textSecondary }}>Sort:</span>
            {['latest', 'popular'].map(s => (
              <button key={s} onClick={() => setSort(s)} style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: sort === s ? 700 : 400,
                background: sort === s ? C.primary : 'none',
                color: sort === s ? '#fff' : C.textPrimary,
                border: `1px solid ${sort === s ? C.primary : C.neutral}`,
                borderRadius: 4, padding: '6px 14px', cursor: 'pointer', transition: 'all 0.15s',
                textTransform: 'capitalize',
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Featured 1–2 articles */}
        {featured.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: featured.length > 1 ? '2fr 1fr' : '1fr', gap: 24, marginBottom: 48 }}>
            {featured.map((a, i) => (
              <FeaturedCard key={a.slug || a.id} a={a} navigate={navigate} category={category} activeTab={activeTab} isMain={i === 0} />
            ))}
          </div>
        )}

        {/* 3-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {(gridArticles.length > 0 ? gridArticles : allArticles).slice(0, page * 9).map(a => (
            <NewsCard key={a.slug || a.id} article={a} navigate={navigate} />
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
          {[1, 2, 3, '…', 12].map((p, i) => (
            <button key={i} onClick={() => typeof p === 'number' && setPage(p)} style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: p === page ? 700 : 400,
              background: p === page ? C.primary : 'none',
              color: p === page ? '#fff' : C.textPrimary,
              border: `1px solid ${p === page ? C.primary : C.neutral}`,
              borderRadius: 4, width: 40, height: 40, cursor: 'pointer', transition: 'all 0.15s',
            }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

window.CategoryPage = CategoryPage;
